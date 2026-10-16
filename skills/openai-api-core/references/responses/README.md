# Responses

| Name | Description | Path |
| --- | --- | --- |
| Background mode | Run long-running reasoning-model tasks asynchronously without client-side timeout concerns; poll or stream the response until completion. | [background.md](./background.md) |
| Compaction | Reduces context size in long-running Responses API interactions while preserving state needed for subsequent turns, via server-side auto-compaction or a standalone stateless endpoint. | [compaction.md](./compaction.md) |
| Conversation state | Manage multi-turn conversation state with the Responses API, either manually, via the Conversations API, or by chaining `previous_response_id`. | [conversation-state.md](./conversation-state.md) |
| API deployment checklist | Checklist of high-value, commonly underused Responses API design choices that improve deployment quality, speed, cost, and reliability. | [deployment-checklist.md](./deployment-checklist.md) |
| Prompt cache diagnostics | Explains why a Responses API request reused fewer cached tokens than expected by comparing it with an earlier response. Available for GPT-5.6 and later supported models. | [prompt-caching-diagnostics.md](./prompt-caching-diagnostics.md) |
| Prompt caching | Automatic caching of repeated prompt prefixes to reduce latency and cost; supports explicit cache breakpoints on GPT-5.6+ models. | [prompt-caching.md](./prompt-caching.md) |
| Reasoning best practices | Guidance on choosing between reasoning (o-series) models and GPT models, and how to prompt reasoning models effectively. | [reasoning-best-practices.md](./reasoning-best-practices.md) |
| Reasoning models | Reasoning models (e.g. GPT-6 Astra) use internal reasoning tokens before producing a response, improving planning, tool use, and multi-step tasks. Work best via the Responses API. | [reasoning.md](./reasoning.md) |
| Multi-agent | Beta Responses API feature that lets a model spawn and coordinate subagents in parallel, synthesizing their work into a final response. Available with GPT-6.1 Sol and all GPT-5.6 models via raw `POST /v1/responses` requests (not the separate Agents SDK). | [responses-multi-agent.md](./responses-multi-agent.md) |
| Text generation | Generate text from a prompt using the Responses API — the recommended entry point for model requests (code, JSON, prose, etc.). | [text.md](./text.md) |
