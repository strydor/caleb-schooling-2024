import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { getUrl } from '@aws-amplify/storage';
import { listHighScores } from './graphql/queries';
import { createHighScore, deleteHighScore } from './graphql/mutations';
import { listSynonymPairs } from './graphql/queries';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);
const client = generateClient();

function SynonymConstellationGame() {
  const [selectedWords, setSelectedWords] = useState([]);
  const [matches, setMatches] = useState([]);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [stars, setStars] = useState(0);
  const [incorrectWord, setIncorrectWord] = useState(null);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [highScores, setHighScores] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [audioUrls, setAudioUrls] = useState({});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [synonymPairs, setSynonymPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    fetchSynonymPairs();
  }, []);

  const fetchSynonymPairs = async () => {
    try {
      console.log('Fetching synonym pairs...');
      const result = await client.graphql({
        query: listSynonymPairs
      });
      console.log('Fetched result:', result);
      const pairs = result.data.listSynonymPairs.items;
      console.log('Fetched pairs:', pairs);
      setSynonymPairs(pairs);
      
      // Initialize game with fetched pairs
      if (pairs.length >= 5) {
        // Create a map to track words that are already used
        const usedWords = new Set();
        const selectedPairs = [];
        
        // Shuffle pairs first
        const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);
        
        // Select pairs ensuring no word is used more than once
        for (const pair of shuffledPairs) {
          if (selectedPairs.length >= 5) break;
          
          // Skip if either word is already used
          if (usedWords.has(pair.word1) || usedWords.has(pair.word2)) {
            continue;
          }
          
          // Add pair and mark both words as used
          selectedPairs.push(pair);
          usedWords.add(pair.word1);
          usedWords.add(pair.word2);
        }
        
        const words = selectedPairs.flatMap(pair => [pair.word1, pair.word2]);
        setShuffledWords(words.sort(() => Math.random() - 0.5));
      } else {
        console.log('Not enough pairs found in database:', pairs.length);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching synonym pairs:', error);
      setLoading(false);
    }
  };

  // Function to fetch high scores
  const fetchHighScores = async () => {
    try {
      const result = await client.graphql({
        query: listHighScores,
        variables: {
          limit: 10,
          sort: { field: 'score', direction: 'DESC' }
        }
      });
      
      // Sort scores by highest time remaining (fastest completion)
      const sortedScores = result.data.listHighScores.items
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      
      setHighScores(sortedScores);
    } catch (error) {
      console.error('Error fetching high scores:', error);
    }
  };

  useEffect(() => {
    // Load high scores from AppSync when component mounts
    fetchHighScores();
  }, []);

  useEffect(() => {
    // Initialize audio URLs
    const loadAudioFiles = async () => {
      try {
        const sounds = {
          match: '/sounds/correct.mp3',
          incorrect: '/sounds/incorrect.mp3',
          select: '/sounds/select.mp3',
          start: '/sounds/start.mp3',
          win: '/sounds/complete.mp3',
          lose: '/sounds/lose.mp3'
        };
        
        // Preload all audio files
        Object.values(sounds).forEach(soundPath => {
          const audio = new Audio(soundPath);
          audio.preload = 'auto';
        });
        
        setAudioUrls(sounds);
      } catch (error) {
        console.error('Error loading audio files:', error);
      }
    };

    loadAudioFiles();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Ctrl+Shift+A
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setIsAdmin(prevState => !prevState);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetGame = () => {
    setSelectedWords([]);
    setMatches([]);
    setTimer(60);
    setGameOver(false);
    setStars(0);
    setIncorrectWord(null);
    setShowNameInput(false);
    setPlayerName('');
    setGameStarted(false);
    
    // Re-shuffle words
    if (synonymPairs.length >= 5) {
      // Create a map to track words that are already used
      const usedWords = new Set();
      const selectedPairs = [];
      
      // Shuffle pairs first
      const shuffledPairs = [...synonymPairs].sort(() => Math.random() - 0.5);
      
      // Select pairs ensuring no word is used more than once
      for (const pair of shuffledPairs) {
        if (selectedPairs.length >= 5) break;
        
        // Skip if either word is already used
        if (usedWords.has(pair.word1) || usedWords.has(pair.word2)) {
          continue;
        }
        
        // Add pair and mark both words as used
        selectedPairs.push(pair);
        usedWords.add(pair.word1);
        usedWords.add(pair.word2);
      }
      
      const words = selectedPairs.flatMap(pair => [pair.word1, pair.word2]);
      setShuffledWords(words.sort(() => Math.random() - 0.5));
    }
  };

  const handleWordClick = (word) => {
    if (selectedWords.length === 0) {
      setSelectedWords([word]);
      playSound('select');
    } else if (selectedWords.length === 1) {
      const [firstWord] = selectedWords;
      const isMatch = synonymPairs.some(
        (pair) =>
          (pair.word1 === firstWord && pair.word2 === word) ||
          (pair.word1 === word && pair.word2 === firstWord)
      );

      if (isMatch) {
        setMatches([...matches, firstWord, word]);
        setStars(stars + 1);
        setShuffledWords(prevWords => prevWords.filter(w => w !== firstWord && w !== word));
        playSound('match');
      } else {
        setIncorrectWord(word);
        setTimeout(() => setIncorrectWord(null), 500);
        playSound('incorrect');
      }
      setSelectedWords([]);
    }
  };

  const startGame = () => {
    resetGame();
    setGameStarted(true);
    playSound('start');
  };

  useEffect(() => {
    if (!gameOver && gameStarted && timer > 0) {
      const timerId = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(timerId);
            setGameOver(true);
            playSound('lose');
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameOver && stars === 5) {
      setGameOver(true);
      playSound('win');
      if (timer > 0 && checkHighScore(timer)) {
        setShowNameInput(true);
      }
    }
  }, [stars, gameOver, timer]);

  const checkHighScore = (finalTime) => {
    if (highScores.length < 10) return true;
    return finalTime > highScores[highScores.length - 1]?.score || false;
  };

  const submitHighScore = async (playerName) => {
    try {
      const date = new Date().toISOString();
      const result = await client.graphql({
        query: createHighScore,
        variables: {
          input: {
            name: playerName,
            score: timer,
            date: date
          }
        }
      });
      
      // Update high scores immediately
      await fetchHighScores();
      setShowNameInput(false);
    } catch (error) {
      console.error('Error submitting high score:', error);
    }
  };

  const clearHighScores = async () => {
    try {
      // Delete each high score
      for (const score of highScores) {
        await client.graphql({
          query: deleteHighScore,
          variables: {
            input: {
              id: score.id
            }
          }
        });
      }
      // Refresh high scores
      await fetchHighScores();
    } catch (error) {
      console.error('Error clearing high scores:', error);
    }
  };

  const playSound = (soundType) => {
    if (soundEnabled && audioUrls[soundType]) {
      const audio = new Audio(audioUrls[soundType]);
      audio.play().catch(err => {
        console.error(`Error playing ${soundType} sound:`, err);
      });
    }
  };

  const speakWord = (word) => {
    if (!soundEnabled) return; // Don't speak if sound is disabled
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8; // Slightly slower rate for clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="game-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="game-main">
            <div className="game-header">
              <button 
                className="sound-toggle" 
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Sound On" : "Sound Off"}
              >
                {soundEnabled ? '🔊' : '🔈'}
              </button>
              <button
                className="reset-button"
                onClick={resetGame}
                title="Reset Game"
              >
                🔄 Reset
              </button>
              {isAdmin && (
                <button
                  className="clear-scores-button"
                  onClick={clearHighScores}
                  title="Clear High Scores"
                >
                  🗑️ Clear Scores
                </button>
              )}
            </div>
            <h1 className="game-title">
              <span className="title-star left">⭐</span>
              <span className="title-text">Synonym Constellation</span>
              <span className="title-star right">⭐</span>
            </h1>
            <div className="stars-container">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`progress-star ${index < stars ? 'achieved' : ''}`}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            
            <div className="game-board">
              {!gameStarted ? (
                <div className="start-screen">
                  <h2>Welcome to Synonym Constellation!</h2>
                  <p>Match 5 pairs of synonyms before time runs out.</p>
                  <button 
                    className="start-button"
                    onClick={startGame}
                  >
                    Play Game
                  </button>
                </div>
              ) : (
                <>
                  {shuffledWords.map((word, index) => (
                    <button
                      key={index}
                      className={`word-button ${selectedWords.includes(word) ? 'selected' : ''} ${
                        incorrectWord === word ? 'incorrect' : ''
                      } ${matches.includes(word) ? 'matched' : ''}`}
                      onClick={() => handleWordClick(word)}
                      disabled={matches.includes(word) || gameOver}
                      onMouseEnter={() => speakWord(word)}
                      onMouseLeave={stopSpeaking}
                    >
                      {word}
                    </button>
                  ))}
                </>
              )}
            </div>

            {gameOver && (
              <div className="game-over">
                <h2>{stars === 5 ? '🎉 You Won! 🎉' : '😢 Game Over'}</h2>
                <button onClick={resetGame}>Play Again</button>
              </div>
            )}

            <div className="completed-pairs">
              <h2>Completed Pairs</h2>
              <div className="completed-words">
                {matches.reduce((pairs, word, index, array) => {
                  if (index % 2 === 0) {
                    pairs.push(
                      <div key={index/2} className="completed-pair">
                        <span className="completed-word">{word}</span>
                        <span className="pair-separator">⟷</span>
                        <span className="completed-word">{array[index + 1]}</span>
                      </div>
                    );
                  }
                  return pairs;
                }, [])}
              </div>
            </div>
          </div>

          <div className="game-sidebar">
            <div className="timer">
              ⏱️ {timer}s
            </div>
            <div className="high-scores">
              <h2>High Scores 🏆</h2>
              {highScores.map((score, index) => (
                <div key={index} className="score-item">
                  <span>{score.name}</span>
                  <span>{score.score}s</span>
                </div>
              ))}
            </div>
          </div>

          {showNameInput && (
            <div className="name-input-modal">
              <div className="modal-content">
                <h2>New High Score! 🎉</h2>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={15}
                />
                <button onClick={() => submitHighScore(playerName)}>Save Score</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SynonymConstellationGame;