---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#errors
---

# Error types

The JSON-RPC `Error` object, standard JSON-RPC error codes, and the MCP-specific codes `HEADER_MISMATCH` (-32020), `MISSING_REQUIRED_CLIENT_CAPABILITY` (-32021), and `UNSUPPORTED_PROTOCOL_VERSION` (-32022), from `@category Errors`.

## Signature / Usage

```ts
export interface Error {
  /** The error type that occurred. */
  code: number;
  /** A short description of the error. The message SHOULD be limited to a concise single sentence. */
  message: string;
  /** Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.). */
  data?: unknown;
}

// Standard JSON-RPC error codes
export const PARSE_ERROR = -32700;
export const INVALID_REQUEST = -32600;
export const METHOD_NOT_FOUND = -32601;
export const INVALID_PARAMS = -32602;
export const INTERNAL_ERROR = -32603;

export interface ParseError extends Error {
  code: typeof PARSE_ERROR;
}

export interface InvalidRequestError extends Error {
  code: typeof INVALID_REQUEST;
}

/**
 * A JSON-RPC error indicating that the requested method does not exist or is not available.
 *
 * In MCP, a server returns this error when a client invokes a method the server does not implement — either a genuinely unknown method, or one gated behind a server capability the server did not advertise (e.g., calling `prompts/list` when the `prompts` capability was not advertised).
 *
 * A request that requires a client capability the client did not declare is signalled instead by {@link MissingRequiredClientCapabilityError} (`-32021`).
 */
export interface MethodNotFoundError extends Error {
  code: typeof METHOD_NOT_FOUND;
}

/**
 * A JSON-RPC error indicating that the method parameters are invalid or malformed.
 *
 * In MCP, this error is returned in various contexts when request parameters fail validation:
 *
 * - **Tools**: Unknown tool name or invalid tool arguments
 * - **Prompts**: Unknown prompt name or missing required arguments
 * - **Pagination**: Invalid or expired cursor values
 * - **Logging**: Invalid log level
 * - **Elicitation**: Server requests an elicitation mode not declared in client capabilities
 * - **Sampling**: Missing tool result or tool results mixed with other content
 */
export interface InvalidParamsError extends Error {
  code: typeof INVALID_PARAMS;
}

export interface InternalError extends Error {
  code: typeof INTERNAL_ERROR;
}

/*
 * MCP error codes.
 *
 * JSON-RPC 2.0 reserves `-32000` to `-32099` for implementation-defined
 * server errors. MCP partitions that range:
 *
 * - `-32000` to `-32019`: implementation-defined. Existing SDKs and
 *   implementations use codes here for their own purposes; the specification
 *   will never define codes in this sub-range, and receivers must not assign
 *   cross-implementation semantics to them.
 * - `-32020` to `-32099`: reserved for error codes defined by the MCP
 *   specification. Every code allocated here is recorded in this file.
 *   Codes are allocated sequentially starting at `-32020` and proceeding
 *   toward `-32099`.
 *
 * Codes defined by earlier protocol versions remain reserved and are never
 * reused: `-32002` (resource not found, 2025-11-25 and earlier; replaced by
 * `-32602`) and `-32042` (URL elicitation required, 2025-11-25 only).
 */

export const HEADER_MISMATCH = -32020;
export const MISSING_REQUIRED_CLIENT_CAPABILITY = -32021;
export const UNSUPPORTED_PROTOCOL_VERSION = -32022;

/**
 * Returned when a server rejects a request because the values in the HTTP
 * headers do not match the corresponding values in the request body, or
 * because required headers are missing or malformed. For HTTP, the response
 * status code MUST be `400 Bad Request`.
 */
export interface HeaderMismatchError extends Omit<
  JSONRPCErrorResponse,
  "error"
> {
  error: Error & {
    code: typeof HEADER_MISMATCH;
  };
}

/**
 * Returned when the request's protocol version is unknown to the server or
 * unsupported (e.g., a known experimental or draft version the server has
 * chosen not to implement). For HTTP, the response status code MUST be
 * `400 Bad Request`.
 */
export interface UnsupportedProtocolVersionError extends Omit<
  JSONRPCErrorResponse,
  "error"
> {
  error: Error & {
    code: typeof UNSUPPORTED_PROTOCOL_VERSION;
    data: {
      /**
       * Protocol versions the server supports. The client should choose a
       * mutually supported version from this list and retry.
       */
      supported: string[];
      /**
       * The protocol version that was requested by the client.
       */
      requested: string;
    };
  };
}

/**
 * Returned when processing a request requires a capability the client did not
 * declare in `clientCapabilities`. For HTTP, the response status code MUST be
 * `400 Bad Request`.
 */
export interface MissingRequiredClientCapabilityError extends Omit<
  JSONRPCErrorResponse,
  "error"
> {
  error: Error & {
    code: typeof MISSING_REQUIRED_CLIENT_CAPABILITY;
    data: {
      /**
       * The capabilities the server requires from the client to process this request.
       */
      requiredCapabilities: ClientCapabilities;
    };
  };
}
```

Example (`examples/UnsupportedProtocolVersionError/unsupported-version.json`):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32022,
    "message": "Unsupported protocol version",
    "data": {
      "supported": [
        "2026-07-28",
        "2025-11-25"
      ],
      "requested": "1900-01-01"
    }
  }
}
```

## Options / Props

| Code | Constant | Type | Description |
|------|----------|------|-------------|
| -32700 | `PARSE_ERROR` | `ParseError` | Invalid JSON received |
| -32600 | `INVALID_REQUEST` | `InvalidRequestError` | Not a valid request object |
| -32601 | `METHOD_NOT_FOUND` | `MethodNotFoundError` | Method not implemented or capability not advertised |
| -32602 | `INVALID_PARAMS` | `InvalidParamsError` | Invalid or malformed params (unknown tool / prompt, bad cursor, etc.) |
| -32603 | `INTERNAL_ERROR` | `InternalError` | Unexpected receiver error |
| -32020 | `HEADER_MISMATCH` | `HeaderMismatchError` | HTTP headers mismatch body or missing / malformed; HTTP `400 Bad Request` |
| -32021 | `MISSING_REQUIRED_CLIENT_CAPABILITY` | `MissingRequiredClientCapabilityError` | Required client capability not declared; `data.requiredCapabilities`; HTTP `400` |
| -32022 | `UNSUPPORTED_PROTOCOL_VERSION` | `UnsupportedProtocolVersionError` | Protocol version unsupported; `data.supported`, `data.requested`; HTTP `400` |

## Notes

- Replaced in 2026-07-28: resource not found `-32002` is replaced by `-32602`; `-32002` and `-32042` (URL elicitation required) remain reserved and are never reused.
- Added in 2026-07-28: codes `-32020` to `-32099` are reserved for MCP spec-defined errors; `-32000` to `-32019` are implementation-defined and the specification will never define codes there.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. Short JSDoc blocks for `ParseError`, `InvalidRequestError`, `InternalError`, and the code constants are collapsed; `@example` / `{@includeCode}` directives omitted.

## Related

- [JSON-RPC types](./json-rpc.md)
- [Common Types](./common-types.md)
- [server/discover types](./discover-types.md)
