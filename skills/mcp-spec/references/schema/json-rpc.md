---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#json-rpc
---

# JSON-RPC types

JSON-RPC 2.0 message envelopes (`JSONRPCRequest`, `JSONRPCNotification`, `JSONRPCResultResponse`, `JSONRPCErrorResponse`) and the base `Request` / `Notification` / `Result` shapes they extend, from `@category JSON-RPC` in `schema.ts`.

## Signature / Usage

```ts
export const LATEST_PROTOCOL_VERSION = "2026-07-28";
export const JSONRPC_VERSION = "2.0";

/**
 * Refers to any valid JSON-RPC object that can be decoded off the wire, or encoded to be sent.
 *
 * @category JSON-RPC
 */
export type JSONRPCMessage =
  JSONRPCRequest | JSONRPCNotification | JSONRPCResponse;

/** @internal */
export interface Request {
  method: string;
  params?: { [key: string]: any };
}

/** @internal */
export interface Notification {
  method: string;
  params?: { [key: string]: any };
}

/**
 * Common result fields.
 *
 * @category Common Types
 */
export interface Result {
  _meta?: ResultMetaObject;
  /**
   * Indicates the type of the result, which allows the client to determine
   * how to parse the result object.
   *
   * Servers implementing this protocol version MUST include this field.
   * For backward compatibility, when a client receives a result from a
   * server implementing an earlier protocol version (which does not include
   * `resultType`), the client MUST treat the absent field as `"complete"`.
   */
  resultType: ResultType;
  [key: string]: unknown;
}

/**
 * A request that expects a response.
 *
 * @category JSON-RPC
 */
export interface JSONRPCRequest extends Request {
  jsonrpc: typeof JSONRPC_VERSION;
  id: RequestId;
}

/**
 * A notification which does not expect a response.
 *
 * @category JSON-RPC
 */
export interface JSONRPCNotification extends Notification {
  jsonrpc: typeof JSONRPC_VERSION;
}

/**
 * A successful (non-error) response to a request.
 *
 * @category JSON-RPC
 */
export interface JSONRPCResultResponse {
  jsonrpc: typeof JSONRPC_VERSION;
  id: RequestId;
  result: Result;
}

/**
 * A response to a request that indicates an error occurred.
 *
 * @category JSON-RPC
 */
export interface JSONRPCErrorResponse {
  jsonrpc: typeof JSONRPC_VERSION;
  id?: RequestId;
  error: Error;
}

/**
 * A response to a request, containing either the result or error.
 *
 * @category JSON-RPC
 */
export type JSONRPCResponse = JSONRPCResultResponse | JSONRPCErrorResponse;
```

Example request envelope (from `examples/CallToolRequest/call-tool-request.json`):

```json
{
  "jsonrpc": "2.0",
  "id": "call-tool-example",
  "method": "tools/call",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    },
    "name": "get_weather",
    "arguments": {
      "location": "New York"
    }
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jsonrpc` | `"2.0"` | yes | Constant `JSONRPC_VERSION` on every envelope |
| `id` | `RequestId` (`string \| number`) | yes (request, result response); optional on error response | Request correlation ID |
| `method` | `string` | yes (request, notification) | Method name |
| `params` | `{ [key: string]: any }` | no at base level | Method parameters |
| `result` | `Result` | yes (result response) | Successful result |
| `error` | `Error` | yes (error response) | Error object |
| `resultType` | `ResultType` | yes (on `Result`) | `"complete"` or `"input_required"` or another string |

## Notes

- Replaced in 2026-07-28: `RequestParams._meta` is now required and carries `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` on every request (see Common Types), instead of a one-time `initialize` handshake.
- `Result.resultType` is required for servers implementing 2026-07-28; clients MUST treat an absent field from an earlier-version server as `"complete"`.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` JSDoc directives are omitted; JSON examples come from `schema/2026-07-28/examples/`.

## Related

- [Common Types](./common-types.md)
- [Error types](./errors.md)
- [Multi Round-Trip types](./mrtr-types.md)
