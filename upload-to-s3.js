const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS
AWS.config.update({
    region: 'ap-southeast-1'
});

const s3 = new AWS.S3();
const BUCKET_NAME = 'school-project-public-2024';

async function uploadFile(filePath, s3Key) {
    try {
        const fileContent = fs.readFileSync(filePath);
        const params = {
            Bucket: BUCKET_NAME,
            Key: s3Key,
            Body: fileContent,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        };

        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
    } catch (err) {
        console.error("Error uploading file:", err);
    }
}

// Upload existing files first
const soundsDir = path.join(__dirname, 'public', 'sounds');
const existingFiles = ['correct.mp3', 'incorrect.mp3', 'complete.mp3', 'lose.mp3'];

async function uploadAll() {
    for (const file of existingFiles) {
        const filePath = path.join(soundsDir, file);
        const s3Key = `sounds/${file}`;
        await uploadFile(filePath, s3Key);
    }
}

uploadAll();
