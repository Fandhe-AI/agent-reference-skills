# Streaming TTS Internals

Hermes streams TTS audio as it arrives from the provider (voice mode, dashboard speak-stream WebSocket, gateway platform adapters that opt in) so replies start speaking after the first clause.

## Signature / Usage

```yaml
tts:
  provider: gemini
  streaming:
    provider: gemini      # or "auto"
    min_len: 20           # shortest first sentence (chars) spoken on its own; CJK setups use ~6
  gemini:
    model: gemini-2.5-flash-preview-tts
    voice: Kore
```

Adding a streaming provider:

1. Subclass `StreamingTTSProvider` in `tools/tts_streaming.py`
2. Set `sample_rate` (and `channels` / `sample_width` if not int16 mono)
3. Implement `available()` (pure probe, never install anything) and `stream(self, text) -> Iterator[bytes]` yielding raw PCM chunks
4. Decorate with `@register("yourname")`
5. Add tests in `tests/tools/test_tts_streaming.py`

## Options / Props

| Provider | Transport | Chunked PCM | Credentials |
|----------|-----------|-------------|-------------|
| elevenlabs | chunked HTTP (`pcm_24000`) | yes | `ELEVENLABS_API_KEY` / `tts.elevenlabs` |
| openai | chunked HTTP (`with_streaming_response`, `pcm`) | yes | `tts.openai.api_key` -> env -> managed gateway |
| gemini | SSE (`streamGenerateContent?alt=sse`) | yes | `GEMINI_API_KEY` / `GOOGLE_API_KEY` |
| xai | WebSocket (`wss://api.x.ai/v1/tts`) | yes | `XAI_API_KEY` preferred, else xAI OAuth |
| edge, piper, kitten, neutts, mistral, minimax, deepinfra, ... | - | no (per-sentence sync fallback) | as usual |
| plugin `TTSProvider` with `streams_pcm` | plugin's `stream(format="pcm")` | yes, at its `stream_sample_rate` | plugin's own |

Gateway adapter seam (override on `BasePlatformAdapter`): `supports_streaming_tts(chat_id, audio_format) -> bool`, `begin_streaming_tts`, `write_streaming_tts`, `finish_streaming_tts`, `abort_streaming_tts`. All default to unsupported/no-op.

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/streaming-tts (pinned to v0.22.2)
- Pipeline: LLM text deltas -> `tools.tts_streaming.SentenceChunker` (strips `<think>` blocks even when split across deltas, flushes complete sentences) -> registered `StreamingTTSProvider` (raw PCM, int16 mono at the declared `sample_rate`) -> audio sink (`sounddevice.OutputStream` via `tools.tts_tool_speaker.stream_tts_to_speaker`, or the adapter's `write_streaming_tts` through `gateway/streaming_tts_consumer.py`).
- Providers without a chunked API still get per-sentence playback via the sync `text_to_speech_tool` path. All spoken text goes through `tools.tts_text_normalize.prepare_spoken_text`.
- By default the dispatcher streams with the configured `tts.provider` when it has a chunked API; `tts.streaming.provider` pins a provider (`elevenlabs`, `gemini`, `openai`, `xai`) or `auto` walks `elevenlabs -> gemini -> openai -> xai` and takes the first with resolvable credentials.
- Credentials resolve through `resolve_provider_secret()` (config > env/.env > credential pool). Streamed bodies are capped at 16 MiB per sentence.
- Plugin providers (`ctx.register_tts_provider()`) set `streams_pcm = True` and a positive `stream_sample_rate`; adapted by `tools.tts_streaming._PluginPCMStreamer`. The speaker pipeline prefetches up to three sentences, so a plugin's `stream()` must tolerate concurrent calls.
- When streaming audio completes, the whole-file auto-TTS reply is suppressed; if streaming fails before any audio was audible, the gateway falls back to the whole-file voice reply.

## Related

- [Gateway Internals](./gateway-internals.md)
- [Tools Runtime](./tools-runtime.md)
