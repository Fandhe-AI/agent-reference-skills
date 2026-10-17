---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/tools#tool-result
---

# Tool Result and Input Required Results

A `tools/call` result carries structured or unstructured content, or an `InputRequiredResult` when the server needs more input (multi round-trip requests).

## Signature / Usage

Structured result for a tool with `outputSchema`:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "resultType": "complete",
    "content": [
      {
        "type": "text",
        "text": "{\"temperature\": 22.5, \"conditions\": \"Partly cloudy\", \"humidity\": 65}"
      }
    ],
    "structuredContent": {
      "temperature": 22.5,
      "conditions": "Partly cloudy",
      "humidity": 65
    }
  }
}
```

Input required response:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "resultType": "input_required",
    "inputRequests": {
      "github_login": {
        "method": "elicitation/create",
        "params": {
          "mode": "form",
          "message": "Please provide your GitHub username",
          "requestedSchema": {
            "type": "object",
            "properties": { "name": { "type": "string" } },
            "required": ["name"]
          }
        }
      }
    },
    "requestState": "eyJsb2NhdGlvbiI6Ik5ldyBZb3JrIn0..."
  }
}
```

Retry with input responses (note the different JSON-RPC `id`):

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": { "location": "New York" },
    "inputResponses": {
      "github_login": { "action": "accept", "content": { "name": "octocat" } }
    },
    "requestState": "eyJsb2NhdGlvbiI6Ik5ldyBZb3JrIn0..."
  }
}
```

## Options / Props

Unstructured content types (in `content`):

| Type | Shape | Description |
|------|-------|-------------|
| `text` | `{ "type": "text", "text": "..." }` | Plain text |
| `image` | `{ "type": "image", "data": "<base64>", "mimeType": "image/png" }` | Image (may carry `annotations`) |
| `audio` | `{ "type": "audio", "data": "<base64>", "mimeType": "audio/wav" }` | Audio |
| `resource_link` | `{ "type": "resource_link", "uri", "name", "description", "mimeType" }` | Link to a resource; not guaranteed to appear in `resources/list` |
| `resource` | `{ "type": "resource", "resource": { "uri", "mimeType", "text" / "blob" }, "annotations" }` | Embedded resource |

## Notes

- All content types support optional annotations (`audience`, `priority`, `lastModified`), the same format used by resources and prompts.
- Structured content is returned as a JSON value in `structuredContent` (any JSON value conforming to `outputSchema` if defined). For backwards compatibility, a tool returning structured content SHOULD also return the serialized JSON in a TextContent block. `structuredContent` is unrelated to LLM "structured outputs".
- Output schema: if provided, servers **MUST** provide structured results that conform to it; clients **SHOULD** validate structured results against it.
- Servers that use embedded resources **SHOULD** implement the `resources` capability.
- Servers **MAY** respond to `tools/call` with an `InputRequiredResult`. When retrying, clients include `inputResponses` and, if provided by the server, `requestState`. The JSON-RPC `id` **MUST** be different between the initial request and the retry.
- Replaced in 2026-07-28: server-initiated requests (sampling / elicitation / roots) are replaced by multi round-trip requests (`resultType: "input_required"`); all results carry a required `resultType`.
- schema.ts defines `annotations` on `EmbeddedResource` itself (sibling of `type` / `resource`); the prose example in tools.mdx nests it inside `resource`, which does not match the schema (`ResourceContents` has no `annotations`).
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/tools.mdx`, Input Required Tool Results and Tool Result).

## Related

- [Tools](./tools.md)
- [Tool Definition](./tool-definition.md)
- [Stateful Tools and Tool Error Handling](./tool-errors-and-state.md)
