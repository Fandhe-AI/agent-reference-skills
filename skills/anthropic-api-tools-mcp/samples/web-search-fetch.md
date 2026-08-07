<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool / last verified: 2026-08-07 -->

# Web Search and Web Fetch Server Tools

Give Claude direct access to current web content: `web_search` finds pages with cited sources, `web_fetch` retrieves full content from a URL already present in the conversation.

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": "Find recent articles about quantum computing and analyze the most relevant one in detail",
        }
    ],
    tools=[
        {"type": "web_search_20250305", "name": "web_search", "max_uses": 3},
        {
            "type": "web_fetch_20250910",
            "name": "web_fetch",
            "max_uses": 5,
            "citations": {"enabled": True},
        },
    ],
)
print(response)
```

## Notes

- Combined search+fetch: when the user names a resource without a URL, Claude searches first, then fetches the matching result.
- `web_search` citations are always enabled; `web_fetch` citations are off by default — set `citations.enabled: true` to turn them on.
- `web_fetch` can only retrieve URLs that already appeared in the conversation (user text, client tool results, or prior search/fetch results) — it cannot fetch arbitrary URLs Claude invents, which limits data-exfiltration risk.
- `max_uses` caps the number of calls per request for each tool; `allowed_domains`/`blocked_domains` (mutually exclusive) restrict which hosts either tool may touch.
- `web_search` is billed per search ($10 / 1,000); `web_fetch` has no additional charge beyond standard token costs.
