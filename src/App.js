import React, { useState, useEffect } from 'react';
import './App.css';

const synonymPairs = [
  { word1: 'happy', word2: 'joyful' },
  { word1: 'clean', word2: 'neat' },
  { word1: 'big', word2: 'large' },
  { word1: 'smart', word2: 'clever' },
  { word1: 'fast', word2: 'quick' },
  { word1: 'sad', word2: 'unhappy' },
  { word1: 'angry', word2: 'mad' },
  { word1: 'beautiful', word2: 'pretty' },
  { word1: 'difficult', word2: 'challenging' },
  { word1: 'strong', word2: 'powerful' },
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const SynonymConstellationGame = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [matches, setMatches] = useState([]);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [stars, setStars] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [incorrectWord, setIncorrectWord] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // Audio elements
  const correctSound = new Audio('/sounds/correct.mp3');
  const incorrectSound = new Audio('/sounds/incorrect.mp3');
  const completeSound = new Audio('/sounds/complete.mp3');
  const loseSound = new Audio('/sounds/lose.mp3');

  useEffect(() => {
    // Load high scores from localStorage when component mounts
    const savedScores = localStorage.getItem('synonymGameHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
    // Initialize the game
    const selectedPairs = shuffleArray(synonymPairs).slice(0, 5);
    setShuffledWords(shuffleArray(selectedPairs.flatMap(pair => [pair.word1, pair.word2])));
  }, []);

  const checkHighScore = (timeLeft) => {
    // Only check for high score if the player won the game
    if (timeLeft === 0 || stars < 5) return false;
    const score = timeLeft;
    const lowestScore = highScores.length < 5 ? -1 : Math.min(...highScores.map(s => s.score));
    return highScores.length < 5 || score > lowestScore;
  };

  const addHighScore = (name, timeLeft) => {
    const newScore = { name, score: timeLeft, date: new Date().toLocaleDateString() };
    const newScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    setHighScores(newScores);
    localStorage.setItem('synonymGameHighScores', JSON.stringify(newScores));
    setShowNameInput(false);
    setPlayerName('');
  };

  useEffect(() => {
    if (!gameOver) {
      if (stars === 5 || shuffledWords.length === 0) {
        setGameOver(true);
        if (soundEnabled) completeSound.play();
        // Only check for high score if player won with time remaining
        if (timer > 0 && checkHighScore(timer)) {
          setShowNameInput(true);
        }
      } else if (timer > 0) {
        const countdown = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(countdown);
      } else {
        setGameOver(true);
        if (soundEnabled) loseSound.play();
      }
    }
  }, [timer, shuffledWords, stars, gameOver, soundEnabled]);

  const playSound = (sound) => {
    if (soundEnabled) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  const handleWordClick = (word) => {
    if (selectedWords.length === 0) {
      setSelectedWords([word]);
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
        playSound(correctSound);
      } else {
        setIncorrectWord(word);
        setTimeout(() => setIncorrectWord(null), 500);
        playSound(incorrectSound);
      }
      setSelectedWords([]);
    }
  };

  const resetGame = () => {
    setSelectedWords([]);
    setMatches([]);
    setTimer(60);
    setGameOver(false);
    setStars(0);
    setShowNameInput(false);
    setPlayerName('');
    const selectedPairs = shuffleArray(synonymPairs).slice(0, 5);
    setShuffledWords(shuffleArray(selectedPairs.flatMap(pair => [pair.word1, pair.word2])));
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="game-container">
      <div className="constellation-game">
        <button 
          className="audio-control" 
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? "Mute sounds" : "Unmute sounds"}
        >
          {soundEnabled ? "🔊" : "🔈"}
        </button>
        <h1 style={{ color: '#FF69B4', fontSize: '3rem' }}>Synonym Constellation Game ⭐</h1>
        <p>Find all the synonym pairs to light up the constellation!</p>
        <div className="timer" style={{ fontSize: '4rem', color: '#FF4500' }}>⏰ Time Left: {timer}s</div>
        <div className="stars" style={{ fontSize: '2rem', margin: '10px 0' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: i < stars ? 'gold' : '#ddd' }}>{i < stars ? '⭐' : '☆'}</span>
          ))}
        </div>
        <div className="words-container">
          {shuffledWords && shuffledWords.map((word, index) => (
            <button
              key={index}
              className={`word-button ${matches.includes(word) ? 'matched' : ''} 
                        ${selectedWords.includes(word) ? 'selected' : ''} 
                        ${incorrectWord === word ? 'shake' : ''}`}
              onClick={() => handleWordClick(word)}
              onMouseEnter={() => speakWord(word)}
              onMouseLeave={stopSpeaking}
              disabled={matches.includes(word) || gameOver}
              style={{
                backgroundColor: selectedWords.includes(word) ? '#FFD700' : '#ADD8E6',
                color: '#000080',
                fontSize: '1.5rem',
                margin: '5px',
                padding: '10px 20px',
                borderRadius: '10px',
                border: '2px solid #000',
                cursor: 'pointer'
              }}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Matched words section */}
        {matches.length > 0 && (
          <div className="matched-words-container">
            <div className="matched-words-title">Matched Synonyms:</div>
            {matches.reduce((pairs, word, index) => {
              if (index % 2 === 0) {
                pairs.push(
                  <div key={index} className="matched-word-pair">
                    {word} = {matches[index + 1]}
                  </div>
                );
              }
              return pairs;
            }, [])}
          </div>
        )}
        {gameOver && !showNameInput && (
          <div className="game-over" style={{ backgroundColor: '#FFD700', padding: '20px', borderRadius: '15px', textAlign: 'center', marginTop: '20px' }}>
            <h2 style={{ fontSize: '3.5rem', color: '#FF1493' }}>
              {stars === 5 || shuffledWords.length === 0 ? '🎉 Congratulations! You Win! 🎉' : 'Try Again!'}
            </h2>
            <button onClick={resetGame} style={{ fontSize: '2rem', padding: '10px 30px', marginTop: '10px', backgroundColor: '#32CD32', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Play Again
            </button>
          </div>
        )}
        {showNameInput && (
          <div className="high-score-input" style={{ backgroundColor: '#FFD700', padding: '20px', borderRadius: '15px', textAlign: 'center', marginTop: '20px' }}>
            <h3 style={{ color: '#FF1493', marginBottom: '10px' }}>🏆 New High Score! 🏆</h3>
            <p>You completed the game with {timer} seconds left!</p>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              style={{
                padding: '8px',
                fontSize: '1.2rem',
                marginRight: '10px',
                borderRadius: '4px',
                border: '2px solid #FF1493'
              }}
            />
            <button
              onClick={() => addHighScore(playerName, timer)}
              style={{
                padding: '8px 16px',
                fontSize: '1.2rem',
                backgroundColor: '#32CD32',
                color: '#FFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit Score
            </button>
          </div>
        )}
      </div>
      <div className="high-scores-panel">
        <h2>🏆 High Scores</h2>
        {highScores.length > 0 ? (
          <div className="scores-list">
            {highScores.map((score, index) => (
              <div key={index} className="score-item">
                <span className="rank">#{index + 1}</span>
                <span className="name">{score.name}</span>
                <span className="score">{score.score}s left</span>
                <span className="date">{score.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No high scores yet!</p>
        )}
      </div>
    </div>
  );
};

export default SynonymConstellationGame;