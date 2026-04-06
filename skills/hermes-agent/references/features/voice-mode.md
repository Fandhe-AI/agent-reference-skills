# Voice Mode

Hermes supports hands-free voice interaction in the CLI and through gateway platforms (Telegram, Discord). Both STT and TTS are pluggable with local or cloud providers.

## CLI Voice Interaction

Activate recording with **Ctrl+B** (configurable). A beep signals the start. The system uses a two-stage silence detection algorithm:

1. Confirm speech is above the noise threshold for 0.3 seconds.
2. Wait 3 seconds of silence before stopping.

Two beeps signal recording completion. The agent can reply with text or spoken audio.

**CLI commands:**

| Command | Description |
|---------|-------------|
| `/voice` | Toggle voice on/off |
| `/voice on` | Enable voice mode |
| `/voice off` | Disable voice mode |
| `/voice tts` | Toggle text-to-speech output |
| `/voice status` | Show current voice state |

## Speech-to-Text (STT) Providers

| Provider | Model Options | Speed | Cost | API Key |
|----------|--------------|-------|------|---------|
| Local (faster-whisper) | base / small / large-v3 | CPU-dependent | Free | None |
| Groq | whisper-large-v3-turbo | ~0.5 s | Free tier | Required |
| OpenAI | whisper-1 | ~1 s | Paid | Required |

Local processing: `pip install faster-whisper` (~150 MB model download). The system falls back automatically through available providers.

## Text-to-Speech (TTS) Providers

| Provider | Quality | Cost | Latency | API Key |
|----------|---------|------|---------|---------|
| Edge TTS | Good | Free | ~1 s | No |
| ElevenLabs | Excellent | Paid | ~2 s | Yes |
| OpenAI TTS | Good | Paid | ~1.5 s | Yes |
| NeuTTS | Good | Free | CPU-dependent | No |

Streaming TTS delivers responses sentence-by-sentence rather than waiting for full completion.

## Gateway Voice (Telegram & Discord Text)

Voice bubbles are sent inline with text responses. Commands (`/voice on`, `/voice tts`, etc.) persist across restarts.

## Discord Voice Channels

The bot joins voice channels for real-time conversation.

**Required permissions:** Connect + Speak (permissions integer `274881432640`)

**Required gateway intents:** Presence, Server Members, Message Content

**Opus codec:** `brew install opus` (macOS) or `sudo apt install libopus0` (Linux)

**Commands (issued in a text channel):**

| Command | Description |
|---------|-------------|
| `/voice join` | Bot enters your current voice channel |
| `/voice leave` | Bot disconnects from voice |
| `/voice status` | Show connection state |

**How it works:** The bot listens to each user independently, detects silence (1.5 s after 0.5 s of speech), transcribes via STT, processes through the agent pipeline, and replies via TTS. The listener is paused during TTS playback to prevent audio echo.

**Access control:** Discord voice is restricted to users listed in `DISCORD_ALLOWED_USERS`.

## Configuration

```yaml
# ~/.hermes/config.yaml
voice:
  record_key: "ctrl+b"
  silence_threshold: 200   # RMS level
  silence_duration: 3.0    # seconds
  auto_tts: false
```

```bash
# ~/.hermes/.env
GROQ_API_KEY=...
ELEVENLABS_API_KEY=...
DISCORD_BOT_TOKEN=...
DISCORD_ALLOWED_USERS=user-id
DISCORD_REQUIRE_MENTION=false
DISCORD_FREE_RESPONSE_CHANNELS=123456789,987654321
```

## System Dependencies

| Package Group | Dependencies |
|---------------|-------------|
| voice (Python) | sounddevice, numpy |
| messaging | discord.py[voice], python-telegram-bot |
| tts-premium | elevenlabs |
| system | PortAudio, ffmpeg, Opus, espeak-ng (NeuTTS) |

## Quality Features

- **Hallucination filter**: Removes 26 known phantom transcription phrases produced from silence.
- **Real-time level display**: Shows microphone input as `● [▁▂▃▅▇▇▅▂] ❯`
- **Continuous mode**: Recording auto-restarts after agent responses without requiring another key press.

## Related

- [Personality](./personality.md)
- [Tools](./tools.md)
