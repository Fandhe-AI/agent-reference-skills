---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/tools#tool
---

# Tool Definition (Tool data type)

A tool definition: `name`, optional `title`, `description`, optional `icons`, `inputSchema`, optional `outputSchema`, and optional `annotations`.

## Signature / Usage

Tool with `x-mcp-header`:

```json
{
  "name": "execute_sql",
  "description": "Execute SQL on Google Cloud Spanner",
  "inputSchema": {
    "type": "object",
    "properties": {
      "region": {
        "type": "string",
        "description": "The region to execute the query in",
        "x-mcp-header": "Region"
      },
      "query": {
        "type": "string",
        "description": "The SQL query to execute"
      }
    },
    "required": ["region", "query"]
  }
}
```

Tool with no parameters:

```json
{
  "name": "get_current_time",
  "description": "Returns the current server time",
  "inputSchema": {
    "type": "object",
    "additionalProperties": false
  }
}
```

Tool with explicit draft-07 schema:

```json
{
  "name": "calculate_sum",
  "description": "Add two numbers",
  "inputSchema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "a": { "type": "number" },
      "b": { "type": "number" }
    },
    "required": ["a", "b"]
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Unique identifier for the tool |
| `title` | string (optional) | Human-readable name for display |
| `description` | string | Human-readable description of functionality |
| `icons` | array (optional) | Icons for display in user interfaces |
| `inputSchema` | JSON Schema object | Expected parameters. Defaults to 2020-12 if no `$schema`. **MUST** be a valid JSON Schema object (not `null`). |
| `outputSchema` | JSON Schema (optional) | Expected output structure. Defaults to 2020-12 if no `$schema`. |
| `annotations` | object (optional) | Properties describing tool behavior |

## Notes

- For tools with no parameters: `{ "type": "object", "additionalProperties": false }` is **Recommended** (accepts only empty objects); `{ "type": "object" }` accepts any object.
- Clients **MUST** consider tool annotations untrusted unless they come from trusted servers.
- Tool names: **SHOULD** be 1 to 128 characters (inclusive), case-sensitive, using only A-Z, a-z, 0-9, underscore, hyphen, and dot; **SHOULD NOT** contain spaces, commas, or other special characters; **SHOULD** be unique within a server. Valid examples: `getUser`, `DATA_EXPORT_v2`, `admin.tools.list`.
- Name uniqueness is scoped to a single server. Aggregating clients or proxies **SHOULD** implement a disambiguation strategy such as prefixing with a server identifier; the server `name` from `serverInfo` **SHOULD NOT** be relied upon for disambiguation.
- `x-mcp-header`: a property-level annotation that mirrors the parameter value into an HTTP header `Mcp-Param-{name}` under the Streamable HTTP transport (e.g. `"region": "us-west1"` becomes `Mcp-Param-Region: us-west1`). Constraints: **MUST NOT** be empty; **MUST** match HTTP field-name token syntax (`1*tchar`, RFC 9110 Section 5.1); **MUST NOT** contain control characters (CR/LF); **MUST** be case-insensitively unique among all `x-mcp-header` values in the `inputSchema`; **MUST** only be applied to primitive types (integer, string, boolean), not `number`, with integers within -2^53+1 to 2^53-1; **MUST** only be applied to properties statically reachable from the schema root.
- Clients using Streamable HTTP **MUST** reject (exclude from the `tools/list` result) tool definitions violating these constraints and **SHOULD** log a warning with the tool name and reason. Clients using other transports (e.g. stdio) **MAY** ignore `x-mcp-header` entirely.
- Server developers **SHOULD NOT** mark sensitive parameters (passwords, API keys, tokens, PII) with `x-mcp-header`, since header values are visible to network intermediaries.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/tools.mdx`, Data Types: Tool, Tool Names, x-mcp-header, Schema Examples).

## Related

- [Tools](./tools.md)
- [Tool Result and Input Required Results](./tool-result.md)
