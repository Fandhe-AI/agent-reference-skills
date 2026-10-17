---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic#responses
---

# Responses and Error Codes

Responses are sent in reply to requests, containing either the result or error of the operation. Every result carries a required `resultType`.

## Signature / Usage

Result response:

```typescript
{
  jsonrpc: "2.0";
  id: string | number;
  result: {
    resultType: string;
    [key: string]: unknown;
  };
}
```

Error response:

```typescript
{
  jsonrpc: "2.0";
  id?: string | number;
  error: {
    code: number;
    message: string;
    data?: unknown;
  }
}
```

Example (`UnsupportedProtocolVersion`, from the versioning page):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32022,
    "message": "Unsupported protocol version",
    "data": {
      "supported": ["2026-07-28", "2025-11-25"],
      "requested": "1900-01-01"
    }
  }
}
```

## Options / Props

`resultType` values:

| Value | Meaning |
| --- | --- |
| `"complete"` | The request completed successfully and the result contains the final content. |
| `"input_required"` | The request is incomplete and more information is needed. The result contains an `InputRequiredResult` object (see the MRTR pattern). |

MCP-defined error codes:

| Code | Name |
| --- | --- |
| `-32020` | `HeaderMismatch` |
| `-32021` | `MissingRequiredClientCapability` |
| `-32022` | `UnsupportedProtocolVersion` |

## Notes

- Result responses **MUST** include the same ID as the request, and **MUST** include a `result` field that **MAY** follow any JSON object structure and **MUST** include `resultType`.
- Extensions **MAY** add additional `ResultType` values; the supported set **MUST** be the core set plus values of supported extensions advertised via capabilities. A `resultType` unrecognized by the client **MUST** be considered invalid.
- For backward compatibility with servers implementing earlier protocol versions (no `resultType`), clients **MUST** treat an absent `resultType` as `"complete"`.
- Error responses **MUST** include the same ID as the request (except where the ID could not be read due to a malformed request), **MUST** include an `error` with integer `code` and `message`, and **MAY** include `data` of any type.
- MCP uses the standard JSON-RPC 2.0 codes (`-32700`, `-32600` to `-32603`) for general protocol failures.
- `-32000` to `-32019` is legacy: new codes **MUST NOT** be allocated there and new implementations **SHOULD NOT** use them. Apart from `-32002`, receivers **MUST NOT** assume any specific meaning.
- `-32020` to `-32099` is reserved for the MCP specification: implementations **MUST NOT** emit any code from this sub-range not defined by the specification and **MUST** use defined codes only with their specified meanings.
- Codes from earlier versions remain reserved; implementations of this version **MUST NOT** emit `-32002` (resource not found, 2025-11-25 and earlier; replaced by `-32602`; clients **SHOULD** still accept it from servers implementing earlier versions) or `-32042` (URL elicitation required, 2025-11-25 only).
- Purely local errors (e.g. an SDK request timeout) are not assigned codes; implementations surfacing them in JSON-RPC-shaped structures should ensure they cannot be mistaken for errors received from the peer.
- New error codes for purposes not defined by the specification **SHOULD** be allocated outside `-32768` to `-32000`.
- Replaced in 2026-07-28: resource not found code `-32002` is now `-32602` (Invalid Params).
- Added in 2026-07-28: required `resultType` on all results.

## Related

- [Messages](./messages.md)
- [_meta](./meta-field.md)
- [Protocol Version Negotiation](./protocol-version-negotiation.md)
