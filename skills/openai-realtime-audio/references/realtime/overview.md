# Realtime and audio

Overview of the OpenAI Realtime API: choosing a session type (voice-agent, translation, transcription) and a transport (WebRTC, WebSocket, SIP).

## Signature / Usage

```text
Voice-agent session   -> /v1/realtime               (conversation + response lifecycle)
Translation session   -> /v1/realtime/translations   (continuous streaming interpreter)
Transcription session -> /v1/realtime (type: "transcription")
```

## Options / Props

| Session type | Use when | Endpoint / pattern |
|------|-------------|------|
| Voice-agent | Model should respond to the user, call tools, manage conversation state | Conversation session on `/v1/realtime` |
| Translation | App should continuously translate speech as it arrives | Continuous session on `/v1/realtime/translations` |
| Transcription | App needs streaming transcript deltas without spoken responses | Transcription session that emits transcript deltas |

| Transport | Use when |
|------|-------------|
| WebRTC | Browser/mobile clients that capture or play audio directly |
| WebSocket | Server already receives raw audio from a media pipeline, call system, or worker |
| SIP | Telephony voice agents |

## Notes

- Realtime 2 models (`gpt-realtime-2.1`) add reasoning to speech-to-speech workflows; start `reasoning.effort` at `low` for most production voice agents.
- Realtime API Beta (`OpenAI-Beta: realtime=v1`) was deprecated and removed from the API on May 12, 2026 (changelog May 12, 2026; deprecations "2025-09-15: Realtime API Beta"). Migrate to the GA interface.
- Beta to GA migration (guides/realtime): remove the `OpenAI-Beta: realtime=v1` header; use `POST /v1/realtime/client_secrets` to create ephemeral credentials for browser or mobile clients; use `/v1/realtime/calls` when establishing WebRTC sessions; set `session.type`, move output audio configuration under `session.audio.output`, and use the newer response event names `response.output_text.delta`, `response.output_audio.delta`, and `response.output_audio_transcript.delta`.
- The current "Getting started with the Realtime API" guide starts with the Agents SDK in a browser: `RealtimeAgent` / `RealtimeSession` from `@openai/agents/realtime` with `model: "gpt-realtime-2.1"` and an ephemeral key from your server.
- The "Audio and voice" hub (guides/audio) tells new conversational voice applications to start with GPT-Live (see [GPT-Live overview](../live/overview.md)) and to use the Realtime API "when you need its session and tool model". Sharing a transport does not make GPT-Live and Realtime handshakes, credentials, or event formats interchangeable.
- Model deprecations (deprecations "2026-07-20"): `gpt-realtime` and `gpt-4o-realtime` -> `gpt-realtime-2.1`; `gpt-realtime-mini` and `gpt-4o-mini-realtime` -> `gpt-realtime-2.1-mini`; all removed Jan 20, 2027.
- If your app identifies individual end users, send a stable, privacy-preserving `OpenAI-Safety-Identifier` header on the request that creates the session or client secret.
- This is the OpenAI Realtime API (developers.openai.com) — distinct from Supabase Realtime, which is an unrelated pub/sub product.

## Related

- [WebRTC connection](./webrtc.md)
- [WebSocket connection](./websocket.md)
- [SIP connection](./sip.md)
- [Voice agents](./voice-agents.md)
- [GPT-Live overview](../live/overview.md)
