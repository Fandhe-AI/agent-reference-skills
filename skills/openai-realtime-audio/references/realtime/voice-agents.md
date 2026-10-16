# Voice agents

Build speech-to-speech agents with the OpenAI Agents SDK: choose an architecture, then design the rest of the agent workflow the same way you would for a text agent.

## Signature / Usage

```text
TypeScript: RealtimeAgent + RealtimeSession (browser-based voice assistants)
Python:     VoicePipeline (extend an existing text agent into a voice workflow)

# Python chained pipeline (guides/voice-agents)
pipeline = VoicePipeline(workflow=SingleAgentVoiceWorkflow(agent))
audio_input = AudioInput(buffer=np.zeros(24000 * 3, dtype=np.int16))
result = await pipeline.run(audio_input)
async for event in result.stream():
    if event.type == "voice_stream_event_audio":
        print("Received audio bytes", len(event.data))
```

## Options / Props

| Architecture | Use when | Notes |
|------|-------------|------|
| GPT-Live | Full-duplex conversations with a separate backend | Keep your existing text workflow and choose its backend independently while the conversation continues |
| Realtime API | Speech, reasoning, and tool use in one session | Use one model to interpret audio, decide what to do, and respond in speech |
| Chained voice pipeline | Control over each speech and text stage | Inspect or transform intermediate text and replace each component independently |

| Building block | Purpose |
|------|-------------|
| Tools | External capabilities the agent can call |
| Orchestration | Workflow/branching logic |
| Guardrails | Safety checks |
| Observability | Monitoring agent behavior |

## Notes

- Choose the audio architecture first, then design the rest of the agent workflow as you would for a text agent.
- Full duplex: GPT-Live can listen and speak at the same time; the live model handles the spoken interaction and delegates reasoning and tool use to a separate backend. Delegation modes: Client delegation (connect your own agent or workflow; your application runs the work and returns results to GPT-Live) and Responses delegation (an OpenAI-hosted Responses model does backend reasoning and tool use; your application still runs custom functions). See [GPT-Live overview](../live/overview.md) and [GPT-Live delegation](../live/delegation.md).
- The complete Realtime starter (`RealtimeAgent` / `RealtimeSession`) now lives in the Realtime API getting-started guide; this guide only points to it.
- "Evaluate your voice agent": (1) choose representative scenarios with expected outcomes, tool calls, and permissions; (2) save the audio, events, tool results, and application state needed to verify each outcome; (3) repeat scenarios and compare task completion, audible response latency, interruptions, and unwanted silence. For GPT-Live, measure independently: Task and tool outcomes, Conversational timing, Speech and language, Session reliability. Crawl / Walk / Run stages: synthetic speech, replayed human recordings, independent simulated caller.
- The TypeScript `RealtimeAgent`/`RealtimeSession` helpers and Python `VoicePipeline` live in the OpenAI Agents SDK (openai.github.io), layered on top of the raw Realtime API events documented in [Conversations](./conversations.md).
- For low-level control of the same session (raw client/server events), see [WebRTC](./webrtc.md) or [WebSocket](./websocket.md).

## Related

- [Overview](./overview.md)
- [GPT-Live overview](../live/overview.md)
- [GPT-Live delegation](../live/delegation.md)
- [Conversations](./conversations.md)
- [Using realtime models (prompting)](./models-prompting.md)
- [Tools and MCP](./tools-mcp.md)
