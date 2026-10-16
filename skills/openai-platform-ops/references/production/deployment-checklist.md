# API Deployment Checklist

Checklist of Responses API production levers, each tagged with its expected impact on quality, cost, latency, or reliability.

| Lever | Expected impact |
|-------|------------------|
| Use the Responses API | Quality, cost, latency, reliability |
| Choose a model for the workload | Quality, cost, latency |
| Set up `reasoning.effort` | Quality, cost, latency |
| Change reasoning effort mid-conversation | Quality, cost, latency |
| Set up `text.verbosity` | Quality, cost, latency |
| Set up the assistant `phase` parameter | Quality, cost |
| Use `tool_search` | Cost, latency |
| Use Programmatic Tool Calling | Quality, cost, latency |
| Use Multi-agent for parallel work | Quality, cost, latency |
| Use async tool calling | Latency |
| Leverage built-in tools | Quality |
| Leverage compaction | Cost |
| Optimize prompt caching | Latency, cost |
| Use `reasoning.encrypted_content` | Quality, latency |
| Set image detail intentionally | Quality, cost, latency |
| Send a safety identifier | Safety, reliability |
| Handle misalignment monitoring | Safety, reliability |
| Handle rapid traffic increases and model overload | Reliability |
| Use `background=True` | Task continuity |
| Use WebSocket mode | Latency |
| Use mid-turn steering | Quality |

## Key items

- **Use the Responses API** — start with the Responses API (`/api/docs/guides/migrate-to-responses`), OpenAI's flagship API for the newest model behavior, built-in tools, stateful workflows, and agent features.
- **Choose a model for the workload** — evaluate the GPT-6 family: `gpt-6-astra` for the highest capability, `gpt-6.1-sol` for complex coding and professional work at a lower cost than Astra, `gpt-6-luna` for efficient, repeatable work. Choose the model that performs well on representative tasks rather than routing every request to the most capable model. When migrating, preserve the current model's workload role and effective reasoning effort where supported, then run representative evals comparing task success, latency, input/output/reasoning/cache-write tokens, and cost per successful task.
  - Tool calling: GPT-6 Astra and GPT-6.1 Sol require Responses for tool calling; GPT-6 Sol and GPT-6 Luna support function calling in Chat Completions only with `reasoning_effort: "none"`.
  - When reasoning effort is not `none`, remove `temperature`, `top_p`, and `top_logprobs`; also remove `logprobs` from Chat Completions requests and `message.output_text.logprobs` from the Responses `include` array.
  - Check data residency eligibility before selecting a model or processing tier.
- **`reasoning.effort`** — GPT-6 Astra, GPT-6.1 Sol, GPT-6 Sol and GPT-6 Luna support `low`/`medium`/`high`/`xhigh`/`max`; `none` is supported only on GPT-6 Sol and GPT-6 Luna (not Astra / 6.1 Sol). Use `low` for extraction/routing/classification/routine rewrites; `medium`/`high` for diagnosis/comparison/planning/code reasoning; `xhigh`/`max` only when evals justify the added latency/cost. When migrating from `minimal`, or from `none` to GPT-6 Astra / GPT-6.1 Sol, start with `low` and compare. `reasoning.mode: "pro"` (independent of effort) can further improve reliability at the cost of latency/tokens.
- **Change reasoning effort mid-conversation** — for GPT-6 models in standard single-agent mode, add a `configuration_update` input item before the next user message to change effort between responses. Leave request-level `reasoning.effort` unchanged so the original prefix stays cacheable. The update applies to the next response until another overrides it. Not compatible with automatic compaction or truncation; `/responses/compact` rejects histories containing them. To compact, include a `compaction_trigger` item and add a fresh update afterward.
- **`text.verbosity`** — controls output length independent of content; `low` for compact answers, `medium`/`high` for richer structured explanation (notably for coding tasks). Prefer `verbosity` over ad hoc "be concise" instructions.
- **Assistant `phase` parameter** — label on assistant messages (`"commentary"` vs `"final_answer"`) distinguishing progress updates from the completed response; resend it on `gpt-5.3-codex`+ follow-up requests to reduce early stopping in long tool-heavy workflows.
- **`tool_search`** — add `{"type": "tool_search"}` and mark expensive tool defs `defer_loading: true` so the model loads only the tools it needs at runtime, saving tokens and preserving cache performance. Hosted tool search is simpler; client-executed tool search suits per-tenant/permission-based tool availability. Group tools into namespaces (~10 functions each) with short, discriminative descriptions.
- **Programmatic Tool Calling** — lets GPT-5.6 write JS that calls eligible tools and reduces intermediate results in a hosted runtime; opt tools in via `allowed_callers: ["programmatic"]` or `["direct", "programmatic"]`. Keep calls direct when each result changes the model's next decision, needs approval, or must preserve citations.
- **Multi-agent** (beta) — root agent delegates independent workstreams to subagents in parallel; enable with `multi_agent.enabled: true`. For HTTP use the beta Responses SDK (`client.beta.responses`) and pass `responses_multi_agent=v1` in `betas`; for raw HTTP or WebSocket send `OpenAI-Beta: responses_multi_agent=v1`. Item schemas can change during beta. Default `max_concurrent_subagents` is 3. Not compatible with `/responses/compact`, `reasoning.summary`, or `max_tool_calls`; the server automatically compacts the root context and every subagent context. WebSocket mode can reduce continuation overhead for tool-heavy workflows.
- **Async tool calling** — on GPT-6 models, set `async: true` on a function or custom tool when the model can keep working while your application runs it. Your app still executes and tracks the call and returns the result in a later Responses request with the original `call_id`. Does not apply to built-in tools or programmatic tool calls. In Multi-agent mode, do not combine async tools with parallel tool calls.
- **Built-in tools** — web search, file search, code interpreter, shell, computer use, image generation, MCP/connectors, skills, apply patch. Prefer built-in tools where they fit — they're in-distribution for post-training, giving better tool selection and fewer failures than custom equivalents.
- **Compaction** — `client.responses.compact()` or server-side `context_management`/`compact_threshold` (with `previous_response_id`) reduces context size while preserving state across long-running turns. Never edit compacted output; pass it through as-is.
- **Optimize prompt caching** — put stable instructions/examples first and dynamic content last; keep tool definitions and ordering stable. Implicit caching remains the default; GPT-5.6 introduced explicit caching, and GPT-5.6 and later families support explicit cache breakpoints (`prompt_cache_breakpoint`) and request-wide policy (`prompt_cache_options.mode: "explicit"` = only your breakpoints, no implicit one). When migrating from GPT-5.5 or earlier, replace `prompt_cache_retention` with `prompt_cache_options.ttl: "30m"`. Cache writes cost 1.25x the uncached input token rate on GPT-5.6 and later; log `cached_tokens` and `cache_write_tokens`. Use a stable `prompt_cache_key` for requests sharing a prefix on models before GPT-5.6 (distribute busy groups across more keys); on GPT-5.6+ it is optional and mainly gives separate cache accounting per customer/user/workspace and prevents cross-customer cache-hit probing.
- **`reasoning.encrypted_content`** — `reasoning.context: "all_turns"` when goals/assumptions stay stable across turns, `"current_turn"` when prior reasoning is stale. Enables stateless reasoning handoff (e.g. under Zero Data Retention) via each reasoning item's `encrypted_content`, sent back unmodified next turn.
- **Image `detail`** — defaults to `auto`, and sizing behavior depends on the model; large images can use more input tokens and add latency. Check the model sizing table and measure worst-case image tokens/latency before deployment. Resize, use `low` when fine detail is unimportant, `high` for standard high-fidelity understanding, `original` (where supported) for large/dense/coordinate-sensitive/OCR/localization/inspection tasks.
- **Safety identifier** — see [Safety best practices](./safety-best-practices.md).
- **Misalignment monitoring** — for GPT-6 Astra agent workflows, a request may return `403` with `misalignment_policy_violation`: stop dispatching actions for that conversation, do not automatically retry the blocked workflow, handle errors during streaming too, and review actions that may already have run. Subscribe to `safety.alert.created` for project alerts (the webhook does not replace request error handling). See [Misalignment monitoring](./misalignment-monitoring.md).
- **Rapid traffic increases and model overload** — check the HTTP status and `error.code` first. `429` with `slow_down`: follow `Retry-After` when present, reduce traffic, then ramp gradually. `503` with `server_is_overloaded`: follow `Retry-After` when present, then retry; if the header is missing, use exponential backoff with jitter and bound retries. Billing, spend, and quota errors require action before retrying; not every `429` is a temporary rate limit.
- **`background=True`** — for long-running requests; returns a job ID to poll (`queued`/`in_progress`/done) instead of holding the client connection open. Combinable with `stream=True`.
- **WebSocket mode** — persistent connection for long-running, tool-call-heavy workflows; continue via `response.create` events with `previous_response_id` on the same socket instead of new HTTP requests (up to roughly 40% faster end-to-end for 20+ tool calls). Use different `stream_id` values for parallel conversations on one connection and route interleaved events by `stream_id`; a connection supports up to 16 active responses, requests on the same stream run in order; 60-minute connection cap; compatible with ZDR (in-memory only).
- **Mid-turn steering** — if users may add requirements while a GPT-6 model is working, use a WebSocket connection and send `response.steer` with the active response ID in `previous_response_id` and the new user input. Keep reading events; `response.steer.accepted` means the update is queued. Steering does not change output already sent or undo tools that have started.

## Related

- [Production best practices](./production-best-practices.md)
- [Latency optimization](./latency-optimization.md)
- [Fast mode](./fast-mode.md)
- [Safety best practices](./safety-best-practices.md)
- [Misalignment monitoring](./misalignment-monitoring.md)
