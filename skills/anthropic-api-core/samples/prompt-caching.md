<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching / last verified: 2026-08-07 -->

# Prompt Caching

Mark a large, reused system prompt with `cache_control: {"type": "ephemeral"}` so subsequent requests within the cache lifetime read from cache instead of reprocessing the full prefix.

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    cache_control={"type": "ephemeral"},
    system="You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
    messages=[
        {
            "role": "user",
            "content": "Analyze the major themes in 'Pride and Prejudice'.",
        }
    ],
)
print(response.usage.model_dump_json())
```

```typescript
const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 1024,
  cache_control: { type: "ephemeral" },
  system:
    "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.",
  messages: [
    {
      role: "user",
      content: "Analyze the major themes in 'Pride and Prejudice'."
    }
  ]
});
console.log(response.usage);
```

## Notes

- With automatic caching, the system caches all content up to and including the last cacheable block; a follow-up request with the same prefix reuses the cache automatically — no need to repeat `cache_control` on every call once the prefix is stable.
- `cache_control` can also be placed on individual `system` array blocks, on `tools`, or on message content blocks for finer-grained cache boundaries (see the `references/messages/batch-processing.md` and `references/messages/pdf-support.md` pages in this skill for multi-block examples).
- On the first request, `usage.cache_creation_input_tokens` reflects the cached prefix and `cache_read_input_tokens` is 0; on a cache hit, `cache_creation_input_tokens` is 0 and `cache_read_input_tokens` reflects the reused prefix. `input_tokens` always reports only the uncached portion (typically just the new user message).
- The default cache lifetime is ephemeral (5 minutes); a request outside that window creates a fresh cache entry instead of hitting the existing one.
- Example from the Claude API (platform.claude.com) `build-with-claude/prompt-caching` page.
