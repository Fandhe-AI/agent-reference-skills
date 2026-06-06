# Voice Mode

Enable hands-free voice interaction in the CLI using push-to-talk recording with STT and TTS providers.

```bash
# Install local STT provider (no API key required)
pip install faster-whisper

# Install system audio dependencies (macOS)
brew install portaudio ffmpeg

# Install system audio dependencies (Linux)
sudo apt install portaudio19-dev ffmpeg
```

```yaml
# ~/.hermes/config.yaml
voice:
  record_key: "ctrl+b"         # Push-to-talk key
  silence_threshold: 200       # RMS level for speech detection
  silence_duration: 3.0        # Seconds of silence before auto-stop
  auto_tts: false              # Spoken replies toggle

stt:
  provider: "groq"             # local | groq | openai
  # local uses faster-whisper (free, CPU-based)

tts:
  provider: "edge"             # edge (free) | elevenlabs | openai | neutts
  edge:
    voice: "en-US-AriaNeural"
```

```bash
# ~/.hermes/.env
GROQ_API_KEY=gsk_...
```

```
# In-session slash commands
/voice on        # Enable microphone input
/voice tts       # Toggle spoken replies
/voice status    # Show current voice state
/voice off       # Disable voice mode
```

## Notes

- Press `Ctrl+B` (configurable) to start recording; two beeps signal when recording stops after 3 seconds of silence.
- STT fallback chain: `local` → `groq` → `openai` if the requested provider is unavailable.
- Edge TTS supports 322 voices across 74 languages and requires no API key.
- Discord voice channels require the Opus codec: `brew install opus` (macOS) or `sudo apt install libopus0` (Linux).
