# responses

| Name | Description | Path |
| --- | --- | --- |
| Text generation | Generate text from a prompt via `responses.create`; message roles and prompt engineering basics | [text.md](./text.md) |
| Conversation state | Multi-turn state via manual replay, the Conversations API, or `previous_response_id` | [conversation-state.md](./conversation-state.md) |
| Prompt caching | Automatic and explicit prompt-prefix caching for latency/cost reduction | [prompt-caching.md](./prompt-caching.md) |
| Reasoning models | `reasoning.effort` / `mode` / `context` / `summary`, context window management, `phase` | [reasoning.md](./reasoning.md) |
| Reasoning best practices | When to use reasoning vs GPT models; effective prompting for reasoning models | [reasoning-best-practices.md](./reasoning-best-practices.md) |
| Background mode | Run long tasks asynchronously with `background: true`, polling, and streaming resume | [background.md](./background.md) |
| Multi-agent | Beta feature to spawn/coordinate subagents within a single Responses request | [responses-multi-agent.md](./responses-multi-agent.md) |
| Compaction | Server-side auto-compaction and the standalone `/responses/compact` endpoint | [compaction.md](./compaction.md) |
