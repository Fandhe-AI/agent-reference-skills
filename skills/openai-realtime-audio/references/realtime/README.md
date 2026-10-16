# realtime

OpenAI Realtime API (developers.openai.com) — low-latency speech-to-speech, translation, and transcription sessions over WebRTC / WebSocket / SIP. Distinct from Supabase Realtime (an unrelated database pub/sub product); do not confuse the two when searching for "Realtime".

| Name | Description | Path |
|------|-------------|------|
| Client secrets (ephemeral keys) | `POST /v1/realtime/client_secrets` mints a short-lived… | [client-secrets.md](./client-secrets.md) |
| Realtime conversations | Manage the Realtime speech-to-speech session lifecycle… | [conversations.md](./conversations.md) |
| Managing Realtime API costs | How Realtime API billing works (per-Response tokens… | [costs.md](./costs.md) |
| Using realtime models | Prompting guidance for realtime speech-to-speech models… | [models-prompting.md](./models-prompting.md) |
| Realtime and audio | Overview of the OpenAI Realtime API: choosing a session… | [overview.md](./overview.md) |
| Server-side controls | Keep tool use, business logic, and instructions on… | [server-controls.md](./server-controls.md) |
| Realtime API with SIP | Connect phone calls to the Realtime API via SIP… | [sip.md](./sip.md) |
| Realtime with tools | Attach function tools, remote MCP servers, or built-in… | [tools-mcp.md](./tools-mcp.md) |
| Realtime transcription | Stream live transcript deltas from a microphone, call… | [transcription.md](./transcription.md) |
| Realtime translation | Stream source audio into a dedicated translation… | [translation.md](./translation.md) |
| Voice activity detection (VAD) | Automatic detection of when the user starts/stops… | [vad.md](./vad.md) |
| Voice agents | Build speech-to-speech agents with the OpenAI Agents… | [voice-agents.md](./voice-agents.md) |
| WebRTC with WARP | Use WebRTC Abridged Roundtrip Protocol (WARP) to reduce… | [webrtc-warp.md](./webrtc-warp.md) |
| Realtime API with WebRTC | Connect browser/mobile clients to the Realtime API over… | [webrtc.md](./webrtc.md) |
| Realtime API with WebSocket | Connect to the Realtime API over a raw WebSocket, for… | [websocket.md](./websocket.md) |
