# samples

| Name | Description | Path |
| --- | --- | --- |
| WebRTC browser session | Connect a browser to the Realtime API over WebRTC using an ephemeral key, streaming mic in / model audio out | [webrtc-browser-session.md](./webrtc-browser-session.md) |
| WebSocket server connection | Connect a trusted backend server directly to the Realtime API over WebSocket using a standard API key | [websocket-server-connection.md](./websocket-server-connection.md) |
| Client secret (ephemeral key) issuance | Mint a short-lived `ek_*` token on your backend for browser/mobile clients to connect without exposing the standard API key | [client-secret-issuance.md](./client-secret-issuance.md) |
| Realtime speech-to-text transcription | Stream microphone audio over WebSocket and receive incremental transcript deltas | [realtime-transcription-stream.md](./realtime-transcription-stream.md) |
| File-based speech-to-text transcription | Transcribe a pre-recorded audio file with the (non-realtime) transcriptions endpoint | [file-transcription.md](./file-transcription.md) |
| Text-to-speech synthesis | Convert written text into spoken audio with the (non-realtime) speech endpoint | [text-to-speech-synthesis.md](./text-to-speech-synthesis.md) |
| Basic voice agent configuration | Configure a speech-to-speech Realtime session with instructions, output voice, and a callable function tool | [voice-agent-basic.md](./voice-agent-basic.md) |
