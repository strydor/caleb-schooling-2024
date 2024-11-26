$sounds = @{
    "https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3" = "public/sounds/start.mp3"
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c011c7662.mp3" = "public/sounds/select.mp3"
}

foreach ($url in $sounds.Keys) {
    $output = $sounds[$url]
    Write-Host "Downloading $url to $output"
    Invoke-WebRequest -Uri $url -OutFile $output
}

# Upload to S3
aws s3 cp public/sounds/start.mp3 s3://school-project-public-2024/sounds/start.mp3
aws s3 cp public/sounds/select.mp3 s3://school-project-public-2024/sounds/select.mp3
