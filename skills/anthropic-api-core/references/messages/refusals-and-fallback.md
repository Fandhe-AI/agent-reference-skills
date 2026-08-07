<!-- source: https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback / last verified: 2026-08-07 -->

# Refusals and fallback

Claude Fable 5 and Claude Opus 5 include safety classifiers that can decline a request as a normal HTTP 200 response (`stop_reason: "refusal"`, not an error). Retry the same request on another model to usually still get an answer.

## Signature / Usage

```json
{
  "content": [],
  "stop_reason": "refusal",
  "stop_details": {"type": "refusal", "category": "cyber", "explanation": "This request was declined because it could enable cyber harm."},
  "usage": {"input_tokens": 412, "output_tokens": 0}
}
```

**Server-side fallback (beta, Claude API only):** one request, one response — the API retries internally.

```json
{"model": "claude-fable-5", "max_tokens": 1024, "fallbacks": "default", "messages": [...]}
```

with header `anthropic-beta: server-side-fallback-2026-07-01`. `fallbacks` can also be an array of up to 3 model names instead of `"default"`.

**Client-side (SDK middleware):** configure a fallback model list once on the client; `client.beta.messages` calls retry automatically on any platform, and also applies fallback credit.

**Manual retry (raw HTTP / custom logic):** detect `stop_reason == "refusal"`, resend the same body with `model` set to a fallback (e.g. `claude-opus-4-8`); see Fallback credit to avoid double-paying the cache-write cost.

## Options / Props

| `stop_details.category` | Meaning |
|---|---|
| `cyber` | Could enable cyber harm (malware/exploits); benign security work can also trigger it |
| `bio` | Could enable biological harm |
| `frontier_llm` | Could assist competing AI model development (Anthropic commercial terms) |
| `reasoning_extraction` | Asks the model to reproduce internal reasoning in response text — use adaptive thinking instead |
| `general_harms` | Determined harmful area; benign work can also trigger it |

`category`/`explanation` are `null` (a normal, permanent value) when the refusal doesn't map to a named category. `stop_details` is `null` for every other `stop_reason`.

## Notes

- **Billing:** a pre-output refusal is not billed (tokens shown in `usage` but not charged); a mid-stream refusal bills input + streamed output at normal rates. Rate limits are still consumed either way.
- **Response shape (server-side fallback):** top-level `model` reports the model that actually answered; a `fallback` content block marks each handoff point (`{"type": "fallback", "from": {"model": ...}, "to": {"model": ...}}`); `usage.iterations` records every attempt (`message` = declined, `fallback_message` = served).
- **Echoing the turn back:** keep `fallback` blocks exactly in place (position validates surrounding thinking blocks); keep `text` and everything after the final `fallback` block; drop `thinking`/`redacted_thinking`/`connector_text` and unmatched client `tool_use` before the final `fallback` block; keep `server_tool_use` before it only if paired with its result.
- **Streaming:** pre-output decline delays `message_start` until the fallback model responds (TTFB includes the declined attempt); mid-output decline closes the open block, inserts an empty `fallback` content_block_start/stop pair, and only the partial `text` is passed to the fallback model as context.
- **Sticky routing:** after a fallback, the API remembers (content-hash of prefix + serving model, ~1h, org-scoped, best-effort) which model served a conversation and routes future turns there directly, skipping the declining model — such turns carry no `fallback` block but do have a `fallback_message` iteration entry.
- **Server-side fallback billing:** only the serving attempt is billed; a declined-before-output attempt appears in `usage.iterations` but isn't charged. Each attempt consumes its own model's rate limit — if the fallback model is rate-limited/overloaded, the fallback is skipped and the refusal is returned (`stop_details.recommended_model` may hint an alternative).
- **Message Batches:** refusals come back as `result.type: "succeeded"` with `stop_reason: "refusal"`; batch refusals never mint fallback credit tokens; `fallbacks` param is not supported in batches (per-item errored result) — retry manually by resubmitting refused items.
- **Common pitfalls:** retry on a *different* model, not the same one; budget retries per-request not per-turn (sub-agents can each refuse independently); `fallbacks` does not propagate into sub-agent/tool-internal model calls — configure those separately; instrument refusals as their own signal (HTTP 200, invisible to error-rate monitoring) — compare refusal count vs `fallback_message` count; branch on `stop_reason == "refusal"`, not on `content` or nullable `stop_details` fields.
- Not available on Message Batches API (server-side `fallbacks`); not on Amazon Bedrock/Google Cloud/Microsoft Foundry for server-side fallback specifically (use client-side SDK middleware there instead).

## Related

- [Fallback credit](./fallback-credit.md)
- [Handling stop reasons](./handling-stop-reasons.md)
- [Batch processing](./batch-processing.md)
