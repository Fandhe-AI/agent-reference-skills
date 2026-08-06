# API Deployment Checklist

Checklist of Responses API production levers, each tagged with its expected impact on quality, cost, latency, or reliability.

| Lever | Expected impact |
|-------|------------------|
| Use the Responses API | Quality, cost, latency, reliability |
| Choose a GPT-5.6 model | Quality, cost, latency |
| Set up `reasoning.effort` | Quality, cost, latency |
| Set up `text.verbosity` | Quality, cost, latency |
| Set up the assistant `phase` parameter | Quality, cost |
| Use `tool_search` | Cost, latency |
| Use Programmatic Tool Calling | Quality, cost, latency |
| Use Multi-agent for parallel work | Quality, cost, latency |
| Leverage built-in tools | Quality |
| Leverage compaction | Cost |
| Use `prompt_cache_key` | Latency, cost |
| Use `reasoning.encrypted_content` | Quality, latency |
| Set image detail intentionally | Quality, cost, latency |
| Send a safety identifier | Safety, reliability |
| Use `background=True` | Resumability |
| Use WebSocket mode | Latency |

## Key items

- **Use the Responses API** — start with the Responses API (`/api/docs/guides/migrate-to-responses`), OpenAI's flagship API for the newest model behavior, built-in tools, stateful workflows, and agent features.
- **Choose a GPT-5.6 model for the workload** — `gpt-5.6`/`gpt-5.6-sol` for frontier capability, `gpt-5.6-terra` for strong performance at lower price, `gpt-5.6-luna` for efficient high-volume workloads. When migrating, preserve the current model's role/effective reasoning effort first, then run representative evals comparing task success, latency, token usage, and cost per successful task.
- **`reasoning.effort`** — values `none`/`low`/`medium`/`high`/`xhigh`/`max` (default `medium`) for GPT-5.6. Use `low` for extraction/routing/classification/simple rewrites; `medium`/`high` for diagnosis/comparison/planning/code reasoning; `xhigh`/`max` only when evals justify the added latency/cost. `reasoning.mode: "pro"` can further improve reliability at the cost of latency/tokens.
- **`text.verbosity`** — controls output length independent of content; `low` for compact answers, `medium`/`high` for richer structured explanation (notably for coding tasks). Prefer `verbosity` over ad hoc "be concise" instructions.
- **Assistant `phase` parameter** — label on assistant messages (`"commentary"` vs `"final_answer"`) distinguishing progress updates from the completed response; resend it on `gpt-5.3-codex`+ follow-up requests to reduce early stopping in long tool-heavy workflows.
- **`tool_search`** — add `{"type": "tool_search"}` and mark expensive tool defs `defer_loading: true` so the model loads only the tools it needs at runtime, saving tokens and preserving cache performance. Hosted tool search is simpler; client-executed tool search suits per-tenant/permission-based tool availability. Group tools into namespaces (~10 functions each) with short, discriminative descriptions.
- **Programmatic Tool Calling** — lets GPT-5.6 write JS that calls eligible tools and reduces intermediate results in a hosted runtime; opt tools in via `allowed_callers: ["programmatic"]` or `["direct", "programmatic"]`. Keep calls direct when each result changes the model's next decision, needs approval, or must preserve citations.
- **Multi-agent** (beta) — root agent delegates independent workstreams to subagents in parallel; enable with `multi_agent.enabled: true` (`responses_multi_agent=v1` beta header/flag). Default `max_concurrent_subagents` is 3. Not compatible with `/responses/compact`, `reasoning.summary`, or `max_tool_calls`.
- **Built-in tools** — web search, file search, code interpreter, shell, computer use, image generation, MCP/connectors, skills, apply patch. Prefer built-in tools where they fit — they're in-distribution for post-training, giving better tool selection and fewer failures than custom equivalents.
- **Compaction** — `client.responses.compact()` or server-side `context_management`/`compact_threshold` (with `previous_response_id`) reduces context size while preserving state across long-running turns. Never edit compacted output; pass it through as-is.
- **`prompt_cache_key`** — set consistently for requests sharing a stable prefix; keep per-key traffic around 15 requests/minute, partition higher volume across more keys. GPT-5.6+ supports explicit cache breakpoints (`prompt_cache_breakpoint`, `prompt_cache_options.mode: "explicit"`) in addition to implicit caching; cache writes cost 1.25x the uncached input token rate on GPT-5.6+.
- **`reasoning.encrypted_content`** — `reasoning.context: "all_turns"` when goals/assumptions stay stable across turns, `"current_turn"` when prior reasoning is stale. Enables stateless reasoning handoff (e.g. under Zero Data Retention) via each reasoning item's `encrypted_content`, sent back unmodified next turn.
- **Image `detail`** — on GPT-5.6, omitted/`"auto"` behaves like `"original"` (no resize), which can raise token cost/latency for large images. Choose `low`/`high`/`original` deliberately per task.
- **Safety identifier** — see [Safety best practices](./safety-best-practices.md).
- **`background=True`** — for long-running requests; returns a job ID to poll (`queued`/`in_progress`/done) instead of holding the client connection open. Combinable with `stream=True`.
- **WebSocket mode** — persistent connection for long-running, tool-call-heavy workflows; continue via `response.create` events with `previous_response_id` on the same socket instead of new HTTP requests (~40% faster end-to-end for 20+ tool calls). One in-flight response per connection; 60-minute connection cap; compatible with ZDR (in-memory only).

## Related

- [Production best practices](./production-best-practices.md)
- [Latency optimization](./latency-optimization.md)
- [Fast mode](./fast-mode.md)
- [Safety best practices](./safety-best-practices.md)
