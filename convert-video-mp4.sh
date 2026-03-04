#!/bin/bash
# Convert droneview.mov to MP4 for mobile compatibility (Android often doesn't support .mov)
# Run: brew install ffmpeg (if needed), then: ./convert-video-mp4.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v ffmpeg &>/dev/null; then
  echo "FFmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

echo "Converting 100plots/droneview.mov to MP4..."
ffmpeg -i 100plots/droneview.mov -c copy -movflags +faststart 100plots/droneview.mp4 -y

if [ -d "web/public/100plots" ]; then
  echo "Copying to web/public/100plots/..."
  cp 100plots/droneview.mp4 web/public/100plots/
fi

echo "Done! droneview.mp4 created for mobile compatibility."
