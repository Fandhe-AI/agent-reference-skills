# Getting started with GPT-Live

GPT-Live handles a spoken conversation while a backend agent looks up information, uses tools, and completes tasks. It listens while speaking (full duplex); sending work to the backend is called delegation.

## Signature / Usage

Session creation (server side, WebRTC transport; from the quickstart):

```javascript
const result = await client.live.create({
  session: {
    model: "gpt-live-1",
    instructions:
      "Be concise. Delegate requests needing current information to the backend, which can search the web.",
    delegation: {
      type: "responses",
      responses: {
        model: "gpt-5.6-terra",
        instructions:
          "Use web search when current facts are needed. Return concise, grounded results for a spoken conversation.",
        tools: [{ type: "web_search" }],
        tool_choice: "auto",
      },
    },
  },
  transport: { type: "webrtc", sdp: request.body.sdp },
});
```

## Options / Props

Model (`gpt-live-1`):

| Item | Value |
|------|-------|
| Model ID / default snapshot | `gpt-live-1` |
| Input modalities | audio, text (image, video unsupported) |
| Output modalities | audio, text |
| Knowledge cutoff | Jul 31, 2025 |
| Supported features | streaming, function_calling |
| Unsupported features | structured_outputs, fine_tuning, predicted_outputs |
| Endpoint | `v1/live/sessions` (Chat Completions, Responses, Realtime, Realtime translation / transcription, Assistants, Batch, Embeddings, Images, Videos, Speech, Transcription, Moderation, Completions are not supported) |
| Pricing | $0.05 per minute, billed per second (not rounded up to a whole minute); backend model and tool usage billed separately |

Rate limits are measured in concurrent sessions (Free tier unsupported):

| Tier | Concurrent sessions |
|------|---------------------|
| Build | 50 |
| Launch | 300 |
| Grow | 500 |

Connection choices:

| Connection | Use |
|------------|-----|
| WebRTC | Recommended for browser, mobile, and server audio; audio on media tracks, JSON events on a data channel |
| WebSockets | Supported alternative; one connection carries audio and control events |
| Telephony and SIP | Connect phone calls |
| Sideband (server-side WebSocket) | Monitor or control an existing session; audio stays on the primary connection |

## Notes

- GPT-Live handles conversation (short prompt for style and when to delegate); the backend handles delegated tasks (detailed instructions, business rules, tool workflows).
- Responses delegation: OpenAI runs the backend model. Client delegation: connect any model, agent harness, or service your application runs. Choose the mode at session creation; to change modes, start a new session.
- Your application checks permissions, obtains confirmations, runs functions that access your systems, and saves task progress. Backend work can continue when the caller interrupts; your application decides whether to finish or cancel.
- Requires a microphone, a browser page on HTTPS or localhost, and a trusted server holding the project API key (keep the key on the server).
- First-session steps: write a short conversation prompt; connect microphone, playback, and event channel; wait for `session.started`; end the conversation and close the session to collect final usage.
- Sample apps: OpenAI Live Console (`openai/openai-live-console`, local sample); Switchboard OpenAI Live Toolkit (third-party React Native SDK for iOS).
- Partner integrations: LiveKit, Twilio, Telnyx, Bandwidth, Daily/Pipecat.
- Distinct from the Realtime API (`/v1/realtime`); `gpt-live-1` does not support that endpoint.

## Related

- [WebRTC](./webrtc.md)
- [WebSockets](./websocket.md)
- [SIP](./sip.md)
- [Server-side controls](./server-controls.md)
- [Sessions](./sessions.md)
- [Delegation](./delegation.md)
- [Prompting](./prompting.md)
- [Migration](./migration.md)
- [Costs](./costs.md)
- [Partner integrations](./partner-integrations.md)
