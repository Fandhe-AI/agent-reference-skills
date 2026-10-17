---
source: https://ai.google.dev/gemini-api/docs/live-api
---

# Gemini Live API overview

The Live API enables low-latency, real-time voice and vision interactions with Gemini. It processes continuous streams of audio, images, and text to deliver immediate, human-like spoken responses.

## Signature / Usage

Technical specifications (verbatim from the source table):

```text
| Category | Details |
|---|---|
| Input modalities | Audio (raw 16-bit PCM audio, 16kHz, little-endian), images (JPEG <= 1FPS), text |
| Output modalities | Audio (raw 16-bit PCM audio, 24kHz, little-endian) |
| Protocol | Stateful WebSocket connection (WSS) |
```

## Options / Props

Key features listed on the page:

| Feature | Description |
|---------|-------------|
| Multilingual support | Converse in 70 supported languages. |
| Barge-in | Users can interrupt the model at any time for responsive interactions. |
| Tool use | Integrates tools like function calling and Google Search for dynamic interactions. |
| Audio transcriptions | Provides text transcripts of both user input and model output. |
| Proactive audio | Lets you control when the model responds and in what contexts. |
| Affective dialog | Adapts response style and tone to match the user's input expression. |
| Live Transcription | Real-time, continuous speech-to-text streaming with automatic language detection and custom vocabulary. |
| Live Translation | Real-time voice-to-voice translation in 70+ languages. |

Implementation approaches:

| Approach | Description |
|----------|-------------|
| Server-to-server | Your backend connects to the Live API using WebSockets. Typically, your client sends stream data (audio, video, text) to your server, which then forwards it to the Live API. |
| Client-to-server | Your frontend code connects directly to the Live API using WebSockets to stream data, bypassing your backend. |

Get-started guides: GenAI SDK tutorial (server-to-server, Python backend), WebSocket tutorial (client-to-server, JavaScript frontend with ephemeral tokens), ADK tutorial (Agent Development Kit streaming, `https://google.github.io/adk-docs/streaming/`).

## Notes

- Client-to-server generally offers better performance for streaming audio and video, since it bypasses the need to send the stream to your backend first. For production, the source recommends ephemeral tokens instead of standard API keys.
- Partner integrations listed in the source (WebRTC or WebSockets): LiveKit, Pipecat by Daily, Fishjam by Software Mansion, Vision Agents by Stream, Voximplant, Agora, Firebase AI SDK (Firebase AI Logic is out of scope for this skill).
- Availability: Live API is v1beta only (per the `api-versions` page of this skill's migration category).
- Distinct from the OpenAI Realtime API: for Realtime API WebRTC/WebSocket/SIP see the openai-realtime-audio skill. This page covers only the Gemini Live API.

## Related

- [Get started with Live API (GenAI SDK)](./get-started-sdk.md)
- [Get started with Live API (WebSockets)](./get-started-websocket.md)
- [Live API capabilities guide](./capabilities.md)
- [Ephemeral tokens](./ephemeral-tokens.md)
