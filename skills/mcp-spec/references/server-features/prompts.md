---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/prompts
---

# Prompts

Servers expose prompt templates to clients via `prompts/list` and `prompts/get`. Prompts are user-controlled: exposed so the user can explicitly select them (for example as slash commands).

## Signature / Usage

Capability declaration (in the `DiscoverResult`):

```json
{
  "capabilities": {
    "prompts": {
      "listChanged": true
    }
  }
}
```

`prompts/get` request and response:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "prompts/get",
  "params": {
    "name": "code_review",
    "arguments": {
      "code": "def hello():\n    print('world')"
    }
  }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "resultType": "complete",
    "description": "Code review prompt",
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "Please review this Python code:\ndef hello():\n    print('world')"
        }
      }
    ]
  }
}
```

`prompts/list` (supports pagination and caching):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "prompts/list",
  "params": { "cursor": "optional-cursor-value" }
}
```

Response prompts entry:

```json
{
  "name": "code_review",
  "title": "Request Code Review",
  "description": "Asks the LLM to analyze code quality and suggest improvements",
  "arguments": [
    { "name": "code", "description": "The code to review", "required": true }
  ],
  "icons": [
    { "src": "https://example.com/review-icon.svg", "mimeType": "image/svg+xml", "sizes": ["any"] }
  ]
}
```

## Options / Props

Prompt:

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Unique identifier for the prompt |
| `title` | string (optional) | Human-readable name for display |
| `description` | string (optional) | Human-readable description |
| `icons` | array (optional) | Icons for display in user interfaces |
| `arguments` | array (optional) | List of arguments for customization |

PromptMessage:

| Name | Type | Description |
|------|------|-------------|
| `role` | `"user"` or `"assistant"` | The speaker |
| `content` | object | Text (`type: "text"`), image (`"image"`, base64 `data` + `mimeType`), audio (`"audio"`), resource link (`"resource_link"`), or embedded resource (`"resource"`) |

## Notes

- Servers that support prompts **MUST** declare the `prompts` capability. `listChanged` indicates whether the server will emit notifications when the list changes.
- `prompts/list` results **MAY** be empty and **MAY** change over time, but **MUST NOT** vary per-connection or as a side effect of other requests. The set **MAY** vary by the authorization presented on the request.
- Every request **MUST** include the required `_meta` fields (`io.modelcontextprotocol/protocolVersion`, `clientInfo`, `clientCapabilities`); the examples omit them for brevity.
- Servers **MAY** respond to `prompts/get` with an `InputRequiredResult` (multi round-trip requests). On retry, clients include `inputResponses` and, if provided, `requestState`.
- `notifications/prompts/list_changed` (`{"jsonrpc":"2.0","method":"notifications/prompts/list_changed"}`) is sent to clients that opened a `subscriptions/listen` stream with `promptsListChanged: true`.
- Image and audio data **MUST** be base64-encoded and include a valid MIME type. All content types support optional annotations (`audience`, `priority`, `lastModified`).
- Embedded resources **MUST** include a valid resource URI, the appropriate MIME type, and either text content or base64-encoded blob data.
- Errors: invalid prompt name `-32602`, missing required arguments `-32602`, internal errors `-32603` (servers **SHOULD** return these).
- Implementations **MUST** carefully validate all prompt inputs and outputs to prevent injection attacks or unauthorized access to resources.
- Replaced in 2026-07-28: the list-changed notification is delivered through `subscriptions/listen` (`promptsListChanged`); results carry required `resultType` and cache hints (`ttlMs` / `cacheScope`).
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/prompts.mdx`).

## Related

- [Completion](./completion.md)
- [Pagination](./pagination.md)
- [Caching](./caching.md)
- [Resources](./resources.md)
