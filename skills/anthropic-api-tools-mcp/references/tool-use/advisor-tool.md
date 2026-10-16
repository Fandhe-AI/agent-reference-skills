<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool / last verified: 2026-08-07 -->

# Advisor tool

Beta server tool: pairs a faster/cheaper executor model with a higher-intelligence advisor model that reads the full transcript mid-generation and returns strategic guidance, all within one `/v1/messages` request.

## Signature / Usage

```json
{
  "type": "advisor_20260301",
  "name": "advisor",
  "model": "claude-opus-5-5",
  "max_uses": 5,
  "max_tokens": 2048,
  "caching": {"type": "ephemeral", "ttl": "5m"}
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| type | string | Must be `"advisor_20260301"` |
| name | string | Required; must be `"advisor"` |
| model | string | Required; advisor model ID, billed at that model's rates |
| max_uses | integer (optional) | Per-request cap on advisor calls; default unlimited; excess returns `max_uses_exceeded` error and executor continues unadvised |
| max_tokens | integer (optional) | Caps advisor output (thinking+text) per call; min 1024; default is the advisor model's own output cap |
| caching | object \| null (optional) | Default `null` (off). `{"type": "ephemeral", "ttl": "5m" \| "1h"}`; on/off switch for advisor-side transcript caching across calls, not a breakpoint marker |

## Notes

- Beta header required (see Compatibility). Flow: executor emits `server_tool_use` (`name: "advisor"`, always empty `input`) → Anthropic runs a separate advisor inference server-side with its own system prompt and the executor's full transcript as context → result returns as `advisor_tool_result` → executor continues. The advisor itself has no tools, no context management, and its thinking blocks are dropped before returning — only advice text reaches the executor.
- Result variants (discriminated union on `advisor_tool_result.content.type`): `advisor_result` (`text`, plaintext — returned by every advisor model in the compatibility table not listed next, e.g. Opus 4.8) or `advisor_redacted_result` (`encrypted_content`, opaque; decrypted server-side into the executor's prompt on the next turn). Advisors returning the encrypted `advisor_redacted_result`: Sonnet 5.5, Fable 5.1, Mythos 5.1, Opus 5.5, Opus 5, Fable 5, Mythos 5, Haiku 5.5. Sonnet 5.5, Fable 5.1, Mythos 5.1, Opus 5.5, Opus 5, Fable 5, and Mythos 5 executors pair only with advisors that return the encrypted form, so the advice text is not readable in the response on those executors; use a plaintext advisor such as `claude-opus-4-8` where the executor's row lists one. Round-trip either variant verbatim on later turns; branch on `content.type` if you switch advisor models mid-conversation.
- Error results (request still succeeds, executor continues unadvised): `max_uses_exceeded`, `too_many_requests`, `overloaded`, `prompt_too_long`, `execution_time_exceeded`, `model_not_found`, `unavailable`. Advisor rate limits share the same per-model bucket as direct calls to that model — a limited advisor surfaces as `too_many_requests` in the tool result, while a limited executor fails the whole request with HTTP 429.
- Billing: advisor sub-inference is billed separately at the advisor model's rates, reported per-call in `usage.iterations[]` (entries typed `"message"` for executor, `"advisor_message"` for advisor); top-level `usage` totals reflect executor tokens only. Top-level `max_tokens` bounds executor output only, not the advisor (use the tool's own `max_tokens`); advisor tokens don't draw from an executor task budget. Priority Tier applies per-model independently.
- Two independent caching layers: executor-side (the `advisor_tool_result` block caches like any other content block) and advisor-side (`caching` on the tool definition, caching the advisor's own growing transcript across calls — breaks even around 3 advisor calls per conversation, keep the setting constant for the whole conversation to avoid cache misses). `clear_thinking` with `keep` != `"all"` degrades advisor-side cache hit rate (cost only, not quality) — set `keep: "all"` to avoid it.
- Model compatibility: the executor (top-level `model`) and advisor (tool `model`) must form a valid pair. The advisor must be Claude Sonnet 4.6 or more capable, and at least as capable as the executor; equal-capability models (e.g. Opus 4.7 and Opus 4.8) can advise each other. An invalid pair returns `400 invalid_request_error`. Executor to advisors (from the official table):
  - Haiku 4.5: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5.5, Sonnet 5, Sonnet 4.6, Haiku 5.5
  - Haiku 5.5: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Sonnet 5.5, Sonnet 5, Haiku 5.5
  - Sonnet 4.6: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5.5, Sonnet 5, Sonnet 4.6, Haiku 5.5
  - Sonnet 5: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Sonnet 5.5, Sonnet 5, Haiku 5.5
  - Sonnet 5.5: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Sonnet 5.5
  - Opus 4.6: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5.5, Sonnet 5, Haiku 5.5
  - Opus 4.7: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Sonnet 5.5
  - Opus 4.8: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5, Opus 4.8, Opus 4.7, Sonnet 5.5
  - Opus 5, Opus 5.5, Fable 5, Mythos 5: Mythos 5.1, Fable 5.1, Mythos 5, Fable 5, Opus 5.5, Opus 5
  - Fable 5.1, Mythos 5.1: Mythos 5.1, Fable 5.1
- Resuming a paused turn: a response can end with `stop_reason: "pause_turn"` while an advisor call is pending (the response has the advisor `server_tool_use` with no `advisor_tool_result`). Append that assistant message unchanged, keeping the `server_tool_use` block, and send again with the same advisor tool and beta header; no user message or `tool_result` is needed. A resumed turn can pause again. Omitting the advisor tool from the resume request returns 400 `invalid_request_error`.
- Under-calling executors: for a Haiku executor that has not called the advisor in its first assistant turn, append a short reminder as an extra user message before the second assistant turn (raised pass rates by roughly 7 points on Haiku 4.5 in Anthropic's evaluation); do not apply it to Opus executors (it slightly lowered pass rates there). To force a consult, `tool_choice` `{"type": "tool", "name": "advisor"}` is subject to the forced tool use constraints (not with manual extended thinking); Opus 5.5, Sonnet 5.5, Fable 5.1, and Mythos 5.1 executors reject `tool_choice` `tool` and `any`, so use the prompt nudge instead.
- Platform availability: beta on the Claude API and Claude Platform on AWS; not available on Amazon Bedrock, Google Cloud, or Microsoft Foundry.
- Advisor on Claude Managed Agents: configured on the agent, not as a tool definition. Set `"advisor": {"type": "enabled", "model": ...}` in the agent's `multiagent` block. No `max_uses`, `max_tokens`, or `caching` options; advice arrives as thread events on the session's event stream rather than `advisor_tool_result` blocks. See the anthropic-managed-agents skill.
- Composes with other server/client tools in the same `tools` array.
- Also accepts generic tool-definition properties: `cache_control`, `allowed_callers`, `defer_loading`, `strict`.
- Messages API general mechanics: see anthropic-api-core skill.

## Related

- [server-tools](./server-tools.md)
- [tool-use-with-prompt-caching](./tool-use-with-prompt-caching.md)
- [tool-combinations](./tool-combinations.md)
