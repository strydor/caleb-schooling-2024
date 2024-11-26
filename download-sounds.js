const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const sounds = {
    'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3': 'public/sounds/start.mp3',
    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c011c7662.mp3': 'public/sounds/select.mp3'
};

function downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${outputPath}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => {});
            reject(err);
        });
    });
}

async function uploadToS3(filePath) {
    return new Promise((resolve, reject) => {
        const s3Path = `s3://school-project-public-2024/sounds/${path.basename(filePath)}`;
        exec(`aws s3 cp ${filePath} ${s3Path}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error uploading ${filePath}:`, stderr);
                reject(error);
            } else {
                console.log(`Uploaded ${filePath} to S3`);
                resolve();
            }
        });
    });
}

async function main() {
    try {
        for (const [url, outputPath] of Object.entries(sounds)) {
            await downloadFile(url, outputPath);
            await uploadToS3(outputPath);
        }
        console.log('All files downloaded and uploaded successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
