# Voice Mode

Enable hands-free voice interaction in the CLI using push-to-talk recording with STT and TTS providers.

```bash
# Install the voice extra through PM (CLI audio + local Faster-Whisper STT where supported)
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['voice'], explicit=True)"

# Install system audio dependencies (macOS)
brew install portaudio ffmpeg opus

# Install system audio dependencies (Linux)
sudo apt install portaudio19-dev ffmpeg libopus0
```

```yaml
# ~/.hermes/config.yaml
voice:
  record_key: "ctrl+b"         # Push-to-talk key
  silence_threshold: 200       # RMS level for speech detection
  silence_duration: 3.0        # Seconds of silence before auto-stop
  auto_tts: false              # Spoken replies toggle

stt:
  provider: "groq"             # local | groq | openai | mistral | xai | elevenlabs | deepinfra
  # local uses faster-whisper (free, CPU-based)

tts:
  provider: "edge"             # edge (free) | elevenlabs | openai | neutts | minimax | mistral | gemini | xai | kittentts | piper
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
- Python dependencies are installed through PM (`pm.sync_venv([...], explicit=True)`), not `pip install`. After a dependency change, reactivate the checkout and restart Hermes. Extras: `voice`, `messaging`, `tts-premium`; the `all` extra does not include these.
- Local Faster-Whisper is excluded on native Windows ARM64 and Intel macOS; use a cloud or command-based STT provider there.
- NeuTTS: the declared `neutts` dependency requires Python below 3.14 while the Hermes runtime requires Python 3.14, so requesting this extra does not install NeuTTS there; choose a compatible provider. KittenTTS is unavailable on Intel macOS and Windows ARM64 (no `onnxruntime` / PyTorch wheels); a Python 3.14 constraint for KittenTTS is not stated in the source docs.
- Edge TTS supports 322 voices across 74 languages and requires no API key.
- Discord voice channels require the Opus codec: `brew install opus` (macOS) or `sudo apt install libopus0` (Linux).
