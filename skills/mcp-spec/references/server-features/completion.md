---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/completion
---

# Completion

Servers offer autocompletion suggestions for the arguments of prompts and resource templates via `completion/complete`, similar to IDE code completion.

## Signature / Usage

Capability declaration:

```json
{
  "capabilities": {
    "completions": {}
  }
}
```

Request and response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "completion/complete",
  "params": {
    "ref": { "type": "ref/prompt", "name": "code_review" },
    "argument": { "name": "language", "value": "py" }
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "completion": {
      "values": ["python", "pytorch", "pyside"],
      "total": 10,
      "hasMore": true
    }
  }
}
```

With previously resolved arguments in `context`:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "completion/complete",
  "params": {
    "ref": { "type": "ref/prompt", "name": "code_review" },
    "argument": { "name": "framework", "value": "fla" },
    "context": { "arguments": { "language": "python" } }
  }
}
```

## Options / Props

Reference types:

| Type | Description | Example |
|------|-------------|---------|
| `ref/prompt` | References a prompt by name | `{"type": "ref/prompt", "name": "code_review"}` |
| `ref/resource` | References a resource URI or URI template | `{"type": "ref/resource", "uri": "file:///{path}"}` |

CompleteRequest params:

| Name | Type | Description |
|------|------|-------------|
| `ref` | `PromptReference` or `ResourceTemplateReference` | What is being completed |
| `argument` | object | `name` (argument name) and `value` (current value) |
| `context` | object | `arguments`: mapping of already-resolved argument names to values |

CompleteResult `completion`: `values` (array, max 100), `total` (optional total matches), `hasMore` (additional results flag).

## Notes

- Servers that support completions **MUST** declare the `completions` capability.
- Results are ranked by relevance, maximum 100 items per response.
- Errors (**SHOULD**): method not found `-32601` (capability not supported), invalid prompt name `-32602`, missing required arguments `-32602`, internal errors `-32603`.
- Servers **SHOULD** return suggestions sorted by relevance, implement fuzzy matching where appropriate, rate limit requests, and validate all inputs. Clients **SHOULD** debounce rapid requests, cache results where appropriate, and handle missing or partial results gracefully.
- Implementations **MUST** validate all completion inputs, implement appropriate rate limiting, control access to sensitive suggestions, and prevent completion-based information disclosure.
- Every request **MUST** include the required `_meta` fields; the examples omit them for brevity.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/utilities/completion.mdx`).

## Related

- [Prompts](./prompts.md)
- [Resource Templates](./resource-templates.md)
