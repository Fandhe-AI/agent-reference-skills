# Voice agents

Build speech-to-speech agents with the OpenAI Agents SDK: choose an architecture, then design the rest of the agent workflow the same way you would for a text agent.

## Signature / Usage

```text
TypeScript: RealtimeAgent + RealtimeSession (browser-based voice assistants)
Python:     VoicePipeline (extend an existing text agent into a voice workflow)
```

## Options / Props

| Architecture | Use when | Notes |
|------|-------------|------|
| Speech-to-speech (live audio) | Natural, low-latency conversations; barge-in and real-time tool use | Model handles live audio input/output directly via a Realtime session |
| Chained voice pipeline | Predictable workflows, or extending an existing text agent | Explicit transcription -> reasoning -> speech-synthesis stages |

| Building block | Purpose |
|------|-------------|
| Tools | External capabilities the agent can call |
| Orchestration | Workflow/branching logic |
| Guardrails | Safety checks |
| Observability | Monitoring agent behavior |

## Notes

- Choose the audio architecture first, then design the rest of the agent workflow as you would for a text agent.
- The TypeScript `RealtimeAgent`/`RealtimeSession` helpers and Python `VoicePipeline` live in the OpenAI Agents SDK (openai.github.io), layered on top of the raw Realtime API events documented in [Conversations](./conversations.md).
- For low-level control of the same session (raw client/server events), see [WebRTC](./webrtc.md) or [WebSocket](./websocket.md).

## Related

- [Overview](./overview.md)
- [Conversations](./conversations.md)
- [Using realtime models (prompting)](./models-prompting.md)
- [Tools and MCP](./tools-mcp.md)
