# Web Search (Agents API)

Built-in `web_search` tool for Agents API sessions: lets the agent look up information to answer a question or complete a task.

## Signature / Usage

```json
{
  "agent": {
    "model": "gpt-6-astra",
    "reasoning": { "effort": "low" },
    "tools": [{ "type": "web_search", "mode": "live" }]
  },
  "environment": { "type": "none" },
  "input": "Search NASA's website for why Mars looks red. Explain it in two sentences and include a source link.",
  "stream": true
}
```

Send as the body of `POST /v1/agents/sessions`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mode` | `live` (default) \| `cached` \| `disabled` | `live` accesses the live internet; `cached` searches saved web content; `disabled` turns the tool off |
| `context_size` | `low` \| `medium` \| `high` | How much search information the model receives; omitted uses `medium` |
| `allowed_domains` | string[] | Sites search may include; up to 100 domain names (e.g. `["python.org", "docs.python.org"]`); omitted applies no filter |
| `location` | object | `country`, `region`, `city`, `timezone` to tailor results; omitted supplies no location (local searches may be less relevant) |

## Notes

- If `web_search` is left out of `agent.tools`, built-in web search is off; asking for a search in the prompt does not turn it on.
- Field names differ from the Responses API `web_search` tool (`search_context_size`, `filters.allowed_domains`, `user_location`, `external_web_access`) covered in this skill's `tools` category.
- The source shows a recorded run (September 10, 2026); answers may vary.
- Source: https://developers.openai.com/api/docs/guides/agents-api/tools/web-search (fetched 2026-10).

## Related

- [Configuring Agents](./configuration.md)
- [MCP Connections](./mcp-connections.md)
