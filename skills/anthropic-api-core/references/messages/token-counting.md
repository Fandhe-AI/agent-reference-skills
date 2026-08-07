<!-- source: https://platform.claude.com/docs/en/build-with-claude/token-counting / last verified: 2026-08-07 -->

# Token counting

Count the tokens in a message before sending it to Claude, via the `count_tokens` endpoint, for rate-limit/cost management, model routing, and prompt-length fitting.

## Signature / Usage

```python
response = client.messages.count_tokens(
    model="claude-opus-5",
    system="You are a scientist",
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
print(response.json())  # {"input_tokens": 14}
```

```bash
curl https://api.anthropic.com/v1/messages/count_tokens \
  -H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5", "messages": [{"role": "user", "content": "Hello, Claude"}]}'
```

Accepts the same input shape as `messages.create` (system prompt, `tools`, images, PDFs, `thinking`) and returns `{"input_tokens": N}`.

## Options / Props

| Input | Notes |
|---|---|
| `tools` | Server tool token counts only apply to the first sampling call |
| `thinking` | Thinking blocks from **previous** assistant turns don't count toward input tokens; **current**-turn thinking does |
| `messages[].content[].type: "document"` (PDF) | Same limitations as PDF support |

## Notes

- Count is an **estimate**; actual billed input tokens may differ slightly. System-added tokens (for internal optimizations) are included in the count but not billed.
- **Tokenizer change:** Claude 4.7+ models and Claude Mythos Preview (including Claude Fable 5 / Claude Mythos 5) use a newer tokenizer producing ~30% more tokens than earlier models for the same text — always recount against the target model rather than reusing counts from an older model.
- Free to use, but rate-limited separately from message creation (does not share limits with `messages.create`). RPM by usage tier: Start 2,000, Build 4,000, Scale 8,000.
- Does not use prompt caching logic, even if `cache_control` blocks are included — caching only applies during actual message creation.
- Supported on all active models. Available on Claude API, Claude Platform on AWS, Amazon Bedrock, Google Cloud, Microsoft Foundry; ZDR eligible (excluding Covered Models).

## Related

- [Vision coordinates](./vision-coordinates.md)
- [PDF support](./pdf-support.md)
- [Working with messages](./working-with-messages.md)
