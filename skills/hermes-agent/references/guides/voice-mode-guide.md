# Voice Mode with Hermes Agent

Guide for enabling and configuring voice interaction in Hermes, covering CLI microphone input, messaging platform voice replies, and Discord voice channel integration.

## Three Voice Modes

| Mode | Purpose | Platform |
|------|---------|----------|
| Interactive microphone loop | Hands-free use while coding or researching | CLI |
| Voice replies in chat | Spoken responses alongside messaging | Telegram, Discord |
| Live voice channel bot | Group or personal live conversation in a voice channel | Discord VC |

## Signature / Usage

### Installation

```bash
# CLI voice input/output
pip install "hermes-agent[voice]"

# Messaging platform support
pip install "hermes-agent[messaging]"

# Premium TTS providers
pip install "hermes-agent[tts-premium]"

# All features
pip install "hermes-agent[all]"
```

**System dependencies:**

| Package | Purpose |
|---------|---------|
| `portaudio` | Microphone input and playback |
| `ffmpeg` | Audio conversion |
| `opus` | Discord voice codec support |
| `espeak-ng` | Phonemizer backend for TTS |

macOS: install via Homebrew. Ubuntu/Debian: install via apt.

### Core Configuration

```yaml
voice:
  record_key: "ctrl+b"
  max_recording_seconds: 120
  auto_tts: false
  silence_threshold: 200
  silence_duration: 3.0
stt:
  provider: "local"
  local:
    model: "base"
tts:
  provider: "edge"
  edge:
    voice: "en-US-AriaNeural"
```

## Options / Props

### STT/TTS Provider Selection

| Use Case | STT | TTS |
|----------|-----|-----|
| Recommended baseline | `local` | `edge` (free, reliable) |
| Speed-focused | `local` base model or Groq | `edge` |
| Premium quality | `large-v3` Whisper | ElevenLabs |
| Zero-cost | `local` | `edge` |

### Voice Configuration Keys

| Key | Description |
|-----|-------------|
| `voice.record_key` | Hotkey to start/stop recording (default: `ctrl+b`) |
| `voice.max_recording_seconds` | Maximum recording duration |
| `voice.auto_tts` | Automatically speak all responses |
| `voice.silence_threshold` | Microphone sensitivity; higher = less sensitive |
| `voice.silence_duration` | Seconds of silence before recording stops |
| `stt.provider` | Speech-to-text backend (`local`, `groq`, etc.) |
| `stt.local.model` | Whisper model size (`base`, `large-v3`, etc.) |
| `tts.provider` | Text-to-speech backend (`edge`, `elevenlabs`, etc.) |
| `tts.edge.voice` | Edge TTS voice name |

## Notes

### CLI Voice Workflow

Press record hotkey (default `Ctrl+B`) → speak → silence auto-stops recording → transcription runs → agent responds with spoken output.

Useful for debugging, research, and accessibility scenarios.

Tuning tips:
- Increase `silence_threshold` if background noise triggers early stops
- Increase `silence_duration` if you pause between sentences
- Rebind `record_key` to avoid terminal conflicts

### Messaging Platform Setup

Start the gateway: `hermes gateway`

Enable voice in chat with `/voice on` or `/voice tts`.

Voice modes:
- `off` — text only
- `voice_only` — speak only on voice input
- `all` — always speak

### Discord Voice Channel Setup

Required bot permissions: Connect, Speak, Voice Activity.
Required privileged intents: Presence, Server Members, Message Content.

```
/voice join    # Join the current voice channel
/voice leave   # Leave the voice channel
/voice status  # Check current voice state
```

When joined, Hermes listens to user speech, transcribes it, runs the agent pipeline, and speaks replies back.

### Recommended Onboarding Path

1. Verify text-mode Hermes works
2. Install voice extras
3. Test CLI mode with local STT + Edge TTS
4. Enable chat voice replies
5. Attempt Discord VC only after the above succeeds

This progression keeps the debugging surface small.

### Troubleshooting

| Issue | Solutions |
|-------|-----------|
| No audio device | Install `portaudio` |
| Bot silent in voice channel | Check user ID allowlist, permissions, intents |
| Transcribes but no speech output | Verify TTS config, API quotas, `ffmpeg` installation |
| Poor transcription quality | Quieter environment, raise `silence_threshold`, use larger model |
| Server-only failures | Bot likely requires `@mention` by default |

## Related

- [Voice Mode Feature Reference](../features/voice-mode.md)
- [Personality](../features/personality.md)
- [Configuration](../configuration/configuration.md)
