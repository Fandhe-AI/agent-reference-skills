# realtime

OpenAI Realtime API (developers.openai.com) — low-latency speech-to-speech, translation, and transcription sessions over WebRTC / WebSocket / SIP. Distinct from Supabase Realtime (an unrelated database pub/sub product); do not confuse the two when searching for "Realtime".

| Name | Description | Path |
|------|-------------|------|
| Overview | Choosing a session type (voice-agent/translation/transcription) and a transport | [overview.md](./overview.md) |
| WebRTC connection | Browser/mobile connection via ephemeral key or unified `/v1/realtime/calls` interface | [webrtc.md](./webrtc.md) |
| WebSocket connection | Server-to-server connection with manual audio buffer management | [websocket.md](./websocket.md) |
| SIP connection | Telephony voice agents via SIP trunking | [sip.md](./sip.md) |
| Conversations | Session/conversation/response lifecycle, client and server events, text/audio/image/function-calling | [conversations.md](./conversations.md) |
| Voice activity detection (VAD) | `server_vad` / `semantic_vad` turn detection configuration | [vad.md](./vad.md) |
| Transcription | Streaming transcript deltas from live audio without a spoken response | [transcription.md](./transcription.md) |
| Translation | Continuous live speech translation session | [translation.md](./translation.md) |
| Tools and MCP | Function tools, remote MCP servers, and built-in connectors in a Realtime session | [tools-mcp.md](./tools-mcp.md) |
| Server-side controls | Sideband WebSocket to keep tool logic and instructions server-side (WebRTC + SIP) | [server-controls.md](./server-controls.md) |
| Managing costs | Token/duration billing model and cost-optimization strategies | [costs.md](./costs.md) |
| Voice agents | Building speech-to-speech agents with the OpenAI Agents SDK | [voice-agents.md](./voice-agents.md) |
| Using realtime models | Prompting guidance for realtime models (reasoning effort, preambles, tool policy) | [models-prompting.md](./models-prompting.md) |
| Client secrets (ephemeral keys) | `POST /v1/realtime/client_secrets` for short-lived client credentials | [client-secrets.md](./client-secrets.md) |
