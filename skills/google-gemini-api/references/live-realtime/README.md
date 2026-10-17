# live-realtime

| Name | Description | Path |
|------|-------------|------|
| Best practices | Guidance for system instructions, tool definitions, prompts, language, streaming, context and session management, and billing in the Live API. | [best-practices.md](./best-practices.md) |
| Live API capabilities guide | Live API capabilities and configuration: model comparison, audio formats, transcription, voice, thinking, VAD, and limitations. | [capabilities.md](./capabilities.md) |
| Ephemeral tokens | Short-lived authentication tokens for accessing the Live API over WebSockets from a client device, reducing API key exposure. | [ephemeral-tokens.md](./ephemeral-tokens.md) |
| Get started with Live API (GenAI SDK) | Integrate with the Live API on your server using the Google GenAI SDK (`google-genai`), a high-level async interface over WebSockets. | [get-started-sdk.md](./get-started-sdk.md) |
| Get started with Live API (WebSockets) | Integrate directly with the Live API using raw WebSockets, managing the connection and exchanging JSON messages. | [get-started-websocket.md](./get-started-websocket.md) |
| Live transcription | Low-latency, real-time speech-to-text over the Live API with `gemini-3.5-transcribe-live`, including interim and final transcripts. | [live-transcribe.md](./live-transcribe.md) |
| Live translation | Real-time, low-latency speech-to-speech translation between 70+ languages through the Live API (`gemini-3.5-live-translate-preview`). | [live-translate.md](./live-translate.md) |
| Live API overview | The Live API enables low-latency, real-time voice and vision interactions with Gemini, processing continuous audio, image, and text streams. | [overview.md](./overview.md) |
| Real-time music generation (Lyria RealTime) | Lyria RealTime is an experimental, real-time streaming instrumental music generation model over a persistent bidirectional WebSocket. | [realtime-music-generation.md](./realtime-music-generation.md) |
| Session management with Live API | Strategies for session time limits and early termination: context window compression, session resumption, GoAway, and generation-complete signals. | [session-management.md](./session-management.md) |
| Thinking in the Live API | Thinking in the Live API (`gemini-3.8-live-extended-thinking`) adds background reasoning and asynchronous tool calls during spoken responses. | [thinking.md](./thinking.md) |
| Tool use with Live API | Define function declarations and Google Search in the Live API session configuration, handle tool calls manually, and optionally run them asynchronously. | [tool-use.md](./tool-use.md) |
