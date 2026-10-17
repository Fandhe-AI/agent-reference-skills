# Text-to-Speech

Text-to-speech output and voice message transcription (STT) across all messaging platforms, with eleven TTS providers, custom command providers and Python plugin providers.

## Signature / Usage

```yaml
# ~/.hermes/config.yaml
tts:
  provider: "edge"              # edge | elevenlabs | openai | minimax | mistral | gemini | xai | deepinfra | neutts | kittentts | piper | nous
  speed: 1.0                    # global multiplier; provider-specific speed overrides
  edge:
    voice: "en-US-AriaNeural"
  openai:
    model: "gpt-4o-mini-tts"
    voice: "alloy"
    speed: 1.0                  # 0.25 - 4.0
stt:
  provider: "local"             # local | groq | openai | mistral | xai | elevenlabs | deepinfra | local_command
  local:
    model: "base"
```

## TTS providers

| Provider | Quality | Cost | API Key |
|----------|---------|------|---------|
| Edge TTS (default) | Good | Free | None |
| ElevenLabs | Excellent | Paid | `ELEVENLABS_API_KEY` |
| OpenAI TTS | Good | Paid | `VOICE_TOOLS_OPENAI_KEY` |
| MiniMax TTS | Excellent | Paid | `MINIMAX_API_KEY` or `MINIMAX_CN_API_KEY` |
| Mistral (Voxtral TTS) | Excellent | Paid | `MISTRAL_API_KEY` |
| Google Gemini TTS | Excellent | Free tier | `GEMINI_API_KEY` |
| xAI TTS | Excellent | Paid | `XAI_API_KEY` |
| DeepInfra TTS | Good | Paid | `DEEPINFRA_API_KEY` |
| NeuTTS / KittenTTS / Piper | Good | Free (local) | None |

## Platform delivery

| Platform | Delivery | Format |
|----------|----------|--------|
| Telegram | Voice bubble | Opus `.ogg` |
| Discord | Voice bubble, falls back to file | Opus/MP3 |
| WhatsApp | Audio attachment | MP3 |
| CLI | Saved to `~/.hermes/audio_cache/` | MP3 |

## Custom command providers

```yaml
tts:
  provider: voxcpm
  providers:
    voxcpm:
      type: command
      command: "voxcpm --ref ~/voice.wav --text-file {input_path} --out {output_path}"
      output_format: mp3
      timeout: 180
      voice_compatible: true
```

| Placeholder | Meaning |
|---|---|
| `{input_path}` / `{text_path}` | Temp UTF-8 text file |
| `{output_path}` | Path the command writes audio to |
| `{format}` | Output format |
| `{voice}` / `{model}` / `{speed}` | Provider values |

STT command providers use `stt.providers.<name>` with `type: command` and placeholders `{input_path}`, `{output_path}`, `{output_dir}`, `{format}` (`txt`/`json`/`srt`/`vtt`), `{language}`, `{model}`.

## Python plugin providers

```python
from agent.tts_provider import TTSProvider

class MyTTSProvider(TTSProvider):
    @property
    def name(self) -> str:
        return "my-tts"
    @property
    def display_name(self) -> str:
        return "My Custom TTS"
    def is_available(self) -> bool:
        import os
        return bool(os.environ.get("MY_TTS_API_KEY"))
    def synthesize(self, text, output_path, *, voice=None, model=None,
                   speed=None, format="mp3", **extra) -> str:
        ...
        return output_path

def register(ctx):
    ctx.register_tts_provider(MyTTSProvider())
```

Optional hooks: `list_voices()`, `list_models()`, `get_setup_schema()`, `stream()` with `streams_pcm` and `stream_sample_rate`, `voice_compatible`, `warm()` / `release()`. STT equivalent: subclass `TranscriptionProvider` in `agent.transcription_provider`, register with `ctx.register_transcription_provider()`, `transcribe()` returns `{"success", "transcript", "provider", "error"}`.

## Options / Props

Selected provider config keys under `tts.*`:

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `elevenlabs.voice_id` / `elevenlabs.model_id` | string | — | ElevenLabs voice and model |
| `openai.base_url` | string | — | Override for OpenAI-compatible TTS endpoints |
| `openai.pcm_sample_rate` | number | — | Streaming PCM rate expected from the endpoint |
| `openai.language` | string | — | Sent as `lang_code`; only for compatible servers such as Kokoro |
| `openai.consent_attestation` | string | — | Required by some OpenAI-compatible servers for cloned voices |
| `minimax.region` | string | — | `global` or `cn` |
| `minimax.model` | string | — | `speech-02-hd`, `speech-02-turbo` |
| `minimax.voice_id` / `speed` / `vol` / `pitch` | string / number | — | Voice and prosody settings |
| `mistral.model` | string | — | `voxtral-mini-tts-2603` |
| `gemini.model` | string | — | `gemini-2.5-flash-preview-tts` or `gemini-3.1-flash-tts-preview` |
| `gemini.voice` / `audio_tags` / `persona_prompt_file` | string / boolean | — | Voice, audio-tag insertion, persona direction file |
| `xai.voice_id` / `language` / `auto_speech_tags` / `text_normalization` / `sample_rate` | mixed | — | xAI voice settings |
| `xai.speed` | number | — | 0.7-1.5 |
| `kittentts.model` / `voice` / `speed` | string / number | — | KittenTTS settings |
| `piper.voice` | string | — | Voice name or absolute `.onnx` path |
| `piper.voices_dir` / `use_cuda` / `length_scale` / `noise_scale` / `noise_w_scale` / `volume` / `normalize_audio` | mixed | — | Piper advanced knobs |
| `streaming.min_len` | number | `20` | Streaming TTS: shortest first sentence (chars) spoken on its own |
| `keep_warm_seconds` | number | `60` | Warm-engine retention |
| `<provider>.max_text_length` | number | — | Per-provider input cap |

Command providers (`tts.providers.<name>`, `type: command`) optional keys:

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `timeout` | number | `120` | Idle seconds |
| `output_format` | string | `mp3` | Also `wav`, `ogg`, `flac`, `m4a`, `aac`, `amr`, `opus` |
| `voice_compatible` | boolean | `false` | Convert to Opus/OGG for Telegram voice bubble |
| `max_text_length` | number | `5000` | Max input characters per invocation |
| `voice` / `model` | string | — | Passed as placeholder values only |
| `env_passthrough` | list | — | Environment passthrough |
| `warm_command` / `release_command` | string | — | Run when speech output is toggled on / last lease released |

STT command providers (`stt.providers.<name>`, `type: command`) keys:

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `timeout` | number | `300` | Idle seconds |
| `format` | string | `txt` | `txt` / `json` / `srt` / `vtt` |
| `language` / `model` / `normalize` | — | — | Passed through to the command |

## Notes

- Long replies are split into sentence-aware chunks per provider cap (Edge 5000, OpenAI 4096, xAI 15000, MiniMax 10000, Mistral 4000, Gemini 32000, NeuTTS/KittenTTS 2000, Piper 5000; ElevenLabs by model, e.g. `eleven_flash_v2_5` 40000, `eleven_multilingual_v2` 10000, `eleven_v3` 5000).
- Telegram voice bubbles need Opus/OGG: OpenAI, ElevenLabs and Mistral produce Opus natively; Edge, MiniMax, Gemini, xAI, NeuTTS, KittenTTS and Piper need ffmpeg.
- MiniMax region selects endpoint and credential together; a region never borrows the other region's key. KittenTTS is unavailable on Intel macOS and Windows ARM64.
- Built-in provider names always win over `tts.providers.<name>`; command providers win over same-name plugins. Command providers run with Hermes secrets scrubbed from the child environment; the command template is trusted local input.
- Speech toggles (`/voice tts`, Desktop **Read replies aloud**) hold leases that warm and later unload local engines (Piper, KittenTTS); Desktop uses `POST /api/audio/tts-lease` with `{"lease": "<name>", "active": true|false}`.
- STT: local Whisper (default; models `tiny`/`base`/`small`/`medium`/`large-v3`/`turbo`), Groq (`GROQ_API_KEY`), OpenAI (`VOICE_TOOLS_OPENAI_KEY` or `OPENAI_API_KEY`; `whisper-1`, `gpt-4o-mini-transcribe`, `gpt-4o-transcribe`, `gpt-transcribe`), Mistral (`voxtral-mini-latest`), xAI (`grok-voice-transcribe-2.0`). `HERMES_LOCAL_STT_COMMAND` runs a local CLI tokenized into argv without a shell. An explicit `stt.provider` is honored strictly (no silent fallback); with none selected, Hermes auto-detects.
- Voice messages on Telegram, Discord, WhatsApp, Slack and Signal are transcribed automatically and injected as text.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/tts (pinned to v0.22.2)

## Related

- [Voice Mode](./voice-mode.md)
- [Wake Word](./wake-word.md)
- [Tool Gateway](./tool-gateway.md)
