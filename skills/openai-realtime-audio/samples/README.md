# samples

| Name | Description | Path |
| --- | --- | --- |
| Client secret (ephemeral key) issuance | Mint a short-lived `ek_*` token on your backend so a browser or mobile client can connect to the Realtime API without exposing your standard API key. | [client-secret-issuance.md](./client-secret-issuance.md) |
| File-based speech-to-text transcription | Transcribe a pre-recorded audio file with the (non-realtime) transcriptions endpoint. | [file-transcription.md](./file-transcription.md) |
| Realtime speech-to-text transcription | Stream microphone audio to the Realtime API over WebSocket and receive incremental transcript deltas as speech arrives. | [realtime-transcription-stream.md](./realtime-transcription-stream.md) |
| Text-to-speech synthesis | Convert written text into spoken audio with the speech endpoint (non-realtime, one-shot synthesis). | [text-to-speech-synthesis.md](./text-to-speech-synthesis.md) |
| Basic voice agent configuration | Configure a speech-to-speech Realtime session with instructions, an output voice, and a callable function tool, then handle the resulting function call over the data channel / WebSocket. | [voice-agent-basic.md](./voice-agent-basic.md) |
| WebRTC browser session | Connect a browser to the Realtime API over WebRTC using an ephemeral key, stream microphone audio in, and play model audio out. | [webrtc-browser-session.md](./webrtc-browser-session.md) |
| WebSocket server connection | Connect a trusted backend server directly to the Realtime API over WebSocket using a standard API key. | [websocket-server-connection.md](./websocket-server-connection.md) |
</content>
