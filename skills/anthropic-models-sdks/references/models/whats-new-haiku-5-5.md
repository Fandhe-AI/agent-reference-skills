<!-- source: https://platform.claude.com/docs/en/models/haiku-5-5/whats-new-haiku-5-5 / last verified: 2026-10-17 -->

# What's new in Claude Haiku 5.5

Overview of new capabilities, breaking changes, and behavior changes in Claude Haiku 5.5, built for high-volume, latency-sensitive work such as classification, routing, extraction, and subagent tasks.

## Signature / Usage

Haiku 5.5 supports adaptive thinking with the `effort` parameter, a 1M token context window, and up to 128k output tokens (Haiku 4.5: 200k and 64k). The model ID is `claude-haiku-5-5`.

```json
{
  "model": "claude-haiku-5-5",
  "max_tokens": 16000,
  "thinking": { "type": "adaptive" },
  "output_config": { "effort": "medium" },
  "messages": [{ "role": "user", "content": "..." }]
}
```

### Summary of changes from Claude Haiku 4.5

| Change | Type | Action needed |
| --- | --- | --- |
| Adaptive thinking and effort | New | Optional: set `effort` to trade quality against speed and cost |
| Larger context window and output | New | None; thinking tokens count toward `max_tokens`. Long prompts billed at higher prices |
| Browser use tool | New | None; Claude API and Google Cloud |
| Safety classifiers can decline a request | New | Handle `stop_reason: "refusal"`; server-side fallback isn't available |
| Manual extended thinking returns an error | Breaking | Replace `budget_tokens` with adaptive thinking |
| Sampling parameters can return an error | Breaking | Omit `temperature`, `top_p`, `top_k` |
| Assistant message prefill returns an error | Breaking | End `messages` with a user turn |
| `computer_20250124` returns an error on Claude API, Google Cloud, Amazon Bedrock | Breaking | `computer_toolset_20260801` on Claude API / Google Cloud; `computer_20251124` on Bedrock |
| Structured outputs aren't available on Amazon Bedrock | Breaking | Describe the format in the prompt or use a tool without `strict`; validate in code |
| Changing earlier turns invalidates thinking blocks | Breaking | Keep conversations append-only |
| Responses can begin with thinking blocks | Changed | Select content blocks by `type` |
| Thinking text is omitted by default | Changed | Set `thinking.display` to `"summarized"` to receive summaries |
| Same text counts as more tokens | Changed | Recount prompts; revisit `max_tokens` and cost |
| Replaying thinking blocks across accounts | Changed | Replay each conversation through the account that produced it |
| Earlier thinking blocks stay in context | Changed | Expect more input tokens; use thinking block clearing |
| Shorter prompts can be cached | Changed | None; minimum cacheable prompt is 512 tokens (4,096 on Haiku 4.5) |
| Context awareness tags aren't injected | Changed | Use task budgets (beta) for an explicit agentic-loop budget |

## Notes

- Same newer tokenizer as Claude 4.7 and later: roughly 30% more tokens than on Haiku 4.5 for the same text.
- Adaptive thinking is on by default; `thinking: {"type": "disabled"}` is still accepted at `high` effort or below, but `effort` is the recommended lever.
- Thinking blocks work only in the account that produced them or a linked account.
- Haiku 5.5 keeps thinking blocks from all earlier assistant turns in context (counted as input tokens); Haiku 4.5 kept only the latest turn's.

## Related

- [Models overview](./overview.md)
- [Claude Haiku 5.5 migration guide](./migration-haiku-5-5.md)
- [Choosing a model](./choosing-a-model.md)
