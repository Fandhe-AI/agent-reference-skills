---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#custom-headers-from-tool-parameters
---

# Custom Headers from Tool Parameters (x-mcp-header)

Servers MAY mark tool parameters with an `x-mcp-header` extension property in the tool's `inputSchema`; clients MUST then mirror the values into `Mcp-Param-{name}` HTTP headers.

## Signature / Usage

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

Resulting request header: `Mcp-Param-Region: us-west1`.

## Options / Props

Constraints on `x-mcp-header` values:

| Constraint | Requirement |
| --- | --- |
| Non-empty | **MUST NOT** be empty |
| Syntax | **MUST** match HTTP field-name token syntax (`1*tchar`, RFC 9110 Section 5.1) |
| Characters | **MUST NOT** contain control characters, including CR or LF |
| Uniqueness | **MUST** be case-insensitively unique among all `x-mcp-header` values in the `inputSchema` |
| Types | **MUST** only be applied to primitive types (integer, string, boolean); `number` is not permitted; integers **MUST** be within -2^53+1 to 2^53-1 |
| Reachability | **MUST** only be applied to properties statically reachable from the schema root via `properties` keys only (not through `items`, `oneOf`/`anyOf`/`allOf`/`not`, `if`/`then`/`else`, or `$ref`) |

Value encoding type conversion: `string` as-is; `integer` decimal string (`42`, `-7`); `boolean` lowercase `"true"` / `"false"`.

| Original Value | Reason | Encoded Header Value |
| --- | --- | --- |
| `"us-west1"` | Plain ASCII | `Mcp-Param-Region: us-west1` |
| `"Hello, 世界"` | Contains non-ASCII | `Mcp-Param-Greeting: =?base64?SGVsbG8sIOS4lueVjA==?=` |
| `" padded "` | Leading/trailing spaces | `Mcp-Param-Text: =?base64?IHBhZGRlZCA=?=` |
| `"line1\nline2"` | Contains newline | `Mcp-Param-Text: =?base64?bGluZTEKbGluZTI=?=` |
| `"=?base64?literal?="` | Matches sentinel pattern | `Mcp-Param-Val: =?base64?PT9iYXNlNjQ/bGl0ZXJhbD89?=` |

Client/server behavior by scenario:

| Scenario | Client Behavior | Server Behavior |
| --- | --- | --- |
| Parameter value provided | Client MUST include the header | Server MUST validate header matches body |
| Parameter value is `null` | Client MUST omit the header | Server MUST NOT expect the header |
| Parameter not in arguments | Client MUST omit the header | Server MUST NOT expect the header |
| Client omits header but value is in body | Non-conforming client | Server MUST reject the request |

## Notes

- Use of `x-mcp-header` is optional for servers, but clients **MUST** support it.
- Header extraction reads the instance value at the exact property path of the annotated property; if absent, the header is omitted.
- Clients using Streamable HTTP **MUST** reject tool definitions that violate the constraints, by excluding the invalid tool from the `tools/list` result, and **SHOULD** log a warning with the tool name and reason. Clients using other transports (e.g. stdio) **MAY** ignore `x-mcp-header` entirely.
- Value encoding: values that cannot be safely represented as plain ASCII (visible ASCII 0x21-0x7E, space, tab; e.g. non-ASCII, control characters, leading/trailing whitespace) **MUST** use Base64 of the UTF-8 representation: `Mcp-Param-{Name}: =?base64?{Base64EncodedValue}?=`. The prefix and suffix are case-sensitive (lowercase). Clients **MUST** also Base64-encode any plain-ASCII value that matches the sentinel pattern. The same rule applies to `Mcp-Name`.
- Client behavior for `tools/call`: extract standard header values from the body, append `Mcp-Method` and (if applicable) `Mcp-Name`, extract `x-mcp-header` values, encode them, append `Mcp-Param-{Name}` headers. On a `HeaderMismatch` rejection due to missing or mismatched `Mcp-Param-*` headers, the client **SHOULD** call `tools/list` to check for `inputSchema` changes and retry.
- Server behavior: intermediaries that do not recognize an `Mcp-Param-{Name}` header **MUST** forward it and otherwise ignore it. Servers **MUST** reject requests with a recognized `Mcp-Param-{Name}` header containing invalid characters, and **MUST** validate decoded values against the body, rejecting with `400 Bad Request` and JSON-RPC error `-32020` (`HeaderMismatch`).

## Related

- [Streamable HTTP](./streamable-http.md)
- [Request Metadata Headers](./http-request-headers.md)
- [Server Validation](./server-validation.md)
