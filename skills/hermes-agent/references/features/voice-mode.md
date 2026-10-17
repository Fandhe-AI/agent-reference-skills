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
| Groq | whisper-large-v3-turbo | ~0.5 s | Free tier | `GROQ_API_KEY` |
| OpenAI | whisper-1 / gpt-4o-mini-transcribe | ~1 s | Paid | `OPENAI_API_KEY` |
| Mistral | voxtral-mini | — | Paid | Required |
| xAI | Grok STT | — | Paid | `XAI_API_KEY` |

Local processing uses Faster-Whisper, which PM prepares on supported targets (the `voice` extra; no STT API key needed; ~150 MB model download for `base`). It is excluded on native Windows ARM64 and Intel macOS, where a cloud or command-based STT provider is needed. Also available: ElevenLabs, DeepInfra, and `stt.streaming: true` live transcription (openai with `gpt-live-transcribe`, xai, elevenlabs). Automatic fallback order: local, groq, openai.

## Text-to-Speech (TTS) Providers

| Provider | Quality | Cost | Latency | API Key |
|----------|---------|------|---------|---------|
| Edge TTS | Good | Free | ~1 s | No |
| ElevenLabs | Excellent | Paid | ~2 s | Yes |
| OpenAI TTS | Good | Paid | ~1.5 s | Yes |
| NeuTTS | Good | Free | CPU-dependent | No |
| Minimax | Good | Paid | — | Yes |

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

## Requirements

Use `hermes tools` to configure voice providers. Missing built-in feature requirements go through PM, subject to `security.allow_lazy_installs`; restart Hermes if the dependency environment changes. A bundled app includes its supported engine dependencies; Docker includes a curated subset and disables on-demand installs. Do not use pip against a signed payload or system Python.

| Extra | Packages | Required For |
|-------|----------|--------------|
| `voice` | `sounddevice`, `numpy`, Faster-Whisper where supported | CLI audio and optional local STT |
| `messaging` | `discord.py[voice]`, `python-telegram-bot`, `aiohttp` | Discord and Telegram bots |
| `tts-premium` | `elevenlabs` | ElevenLabs TTS provider |

`audio-io` contains the microphone/playback dependencies without local STT. The `all` extra does not mean every voice or wake engine. NeuTTS is a separate optional runtime that downloads models on first use; KittenTTS is unavailable on Python 3.14 (v0.22.0) and NeuTTS needs Python below 3.14, so neither installs into the 3.14 managed runtime. System packages: PortAudio, ffmpeg, Opus, espeak-ng (NeuTTS).

## Prerequisites

Hermes installed via the install script, an LLM provider configured (`hermes model`), and a working text chat. A paid Nous Portal subscription supplies the LLM and OpenAI TTS via the Tool Gateway (`hermes setup --portal`).

## Further features

- Say "stop" (strict whole-utterance match; `voice.stop_phrases`, `[]` disables) to end a voice chat; typing a bare stop phrase during a voice chat does the same.
- Barge-in: interrupt the agent at any point (`voice.barge_in`, `voice.barge_in_threshold_multiplier` default 3.0, `voice.barge_in_grace_seconds` default 0.5).
- Desktop: client-direct voice with a remote gateway (`voice.client_direct: false` forces the relay) and a GPT-Live full-duplex mode (`voice.voice_chat_mode: gpt-live`, OpenAI `gpt-live-1`, billed by OpenAI per minute of session time).
- `auxiliary.voice_chat` runs spoken turns on a separate (usually faster) model with reasoning off by default.
- Wake word ("hey hermes") is documented on the Wake Word feature page; TTS providers on the TTS feature page.

## Quality Features

- **Hallucination filter**: Removes 26 known phantom transcription phrases produced from silence.
- **Real-time level display**: Shows microphone input as `● [▁▂▃▅▇▇▅▂] ❯`
- **Continuous mode**: Recording auto-restarts after agent responses without requiring another key press.

## Related

- [Personality](./personality.md)
- [Tools](./tools.md)
