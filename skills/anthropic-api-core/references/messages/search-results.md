<!-- source: https://platform.claude.com/docs/en/build-with-claude/search-results / last verified: 2026-08-07 -->

# Search results

Enable natural citations for RAG applications by providing search results with source attribution, as first-class `search_result` content blocks (same citation mechanism as web search).

## Signature / Usage

```json
{
  "type": "search_result",
  "source": "https://example.com/article",
  "title": "Article Title",
  "content": [{"type": "text", "text": "The actual content of the search result..."}],
  "citations": {"enabled": true}
}
```

Two ways to provide search results: (1) **from a custom tool call** — your tool's `tool_result` returns `search_result` blocks so retrieval happens at runtime, or (2) **as top-level content** — embed `search_result` blocks directly in a `user` message for pre-fetched/cached content. Both methods can be combined in one conversation. No beta header required; standard Messages API.

## Options / Props

| Field | Required | Type | Description |
|---|---|---|---|
| `type` | yes | `"search_result"` | |
| `source` | yes | string | Stable identifier: URL or e.g. `kb://article-1234` |
| `title` | yes | string | Descriptive title |
| `content` | yes | array of `{type: "text", text: string}` | Text only — no images/media |
| `citations.enabled` | no | boolean | Default `false`; must be uniform across all `search_result` blocks in a request |
| `cache_control` | no | object | e.g. `{"type": "ephemeral"}`, sits alongside `citations` |

**Citation object** (`type: "search_result_location"`) on response text blocks: `source`, `title`, `cited_text` (concatenated cited blocks, not counted as output tokens), `search_result_index` (0-based, across all `search_result` blocks in request order), `start_block_index`/`end_block_index` (exclusive end, slice into the result's `content` array).

## Notes

- The text block is the minimal citable unit — split `content` into smaller blocks for finer-grained citation boundaries (same model as citations' custom content documents).
- `search_result` blocks may only appear in `user` messages (including inside `tool_result`); assistant messages with them are rejected.
- In `tool_result` arrays, block types cannot mix: if any block is `search_result`, all blocks in that `tool_result` must be `search_result` (put supporting text inside a result's own `content` array instead).
- Citations are all-or-nothing across a request — mixing enabled/disabled `search_result` blocks errors. When the web search tool is also enabled in the same request, citations must be enabled on all `search_result` blocks.
- Available on Claude API, Amazon Bedrock, Google Cloud. All active models support it except Claude Haiku 3.
- Error handling: return `{"type": "text", "text": "No results found."}` instead of raising, so Claude explains the empty result and the conversation continues.
- ZDR eligibility follows the general API-and-data-retention policy.

## Related

- [Citations](./citations.md)
- [Multilingual support](./multilingual-support.md)

Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照（web search tool との併用を含む）。
