<!-- source: https://platform.claude.com/docs/en/build-with-claude/token-counting / last verified: 2026-08-07 -->

# Token Counting

Estimate the input token cost of a request with `messages.count_tokens` before sending it, without being billed for the count itself.

```python
client = anthropic.Anthropic()

response = client.messages.count_tokens(
    model="claude-opus-5",
    system="You are a scientist",
    messages=[{"role": "user", "content": "Hello, Claude"}],
)

print(response.json())
```

```typescript
const client = new Anthropic();

const response = await client.messages.countTokens({
  model: "claude-opus-5",
  system: "You are a scientist",
  messages: [
    {
      role: "user",
      content: "Hello, Claude"
    }
  ]
});

console.log(response);
```

```json
{ "input_tokens": 14 }
```

## Notes

- `count_tokens` accepts the same request shape as `messages.create` (system, tools, images, PDFs, thinking config) and returns only `{"input_tokens": N}` — it does not call the model or produce a response.
- Counts are estimates and may differ slightly from actual billed usage; system-added tokens are included in the count but not billed to you.
- Claude 4.7 and later models (and Claude Mythos Preview) use a newer tokenizer that produces roughly 30% more tokens for the same text — always recount against the specific `model` you plan to use rather than reusing counts from an older model.
- Token counting does not apply prompt caching logic even if `cache_control` blocks are present in the request; caching discounts only take effect on actual `messages.create` calls.
- Token counting is free but rate-limited separately from message creation (2,000-8,000 requests per minute depending on usage tier).
- Example from the Claude API (platform.claude.com) `build-with-claude/token-counting` page.
