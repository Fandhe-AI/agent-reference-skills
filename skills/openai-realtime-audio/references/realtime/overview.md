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
- GA migration from beta: drop the `OpenAI-Beta: realtime=v1` header, use `POST /v1/realtime/client_secrets` for ephemeral credentials, use `/v1/realtime/calls` for WebRTC, and move output audio config under `session.audio.output`.
- If your app identifies individual end users, send a stable, privacy-preserving `OpenAI-Safety-Identifier` header on the request that creates the session or client secret.
- This is the OpenAI Realtime API (developers.openai.com) — distinct from Supabase Realtime, which is an unrelated pub/sub product.

## Related

- [WebRTC connection](./webrtc.md)
- [WebSocket connection](./websocket.md)
- [SIP connection](./sip.md)
- [Voice agents](./voice-agents.md)
