---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#common-types
---

# Common Types

Shared building blocks from `@category Common Types`: JSON value types, `_meta` objects (request / notification / result), IDs, cursors, params bases, pagination, `CacheableResult`, `Icon`, `Annotations`, `Role`, and `Implementation`.

## Signature / Usage

```ts
export type JSONValue =
  string | number | boolean | null | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];

/**
 * Represents the contents of a `_meta` field, which clients and servers use to attach additional metadata to their interactions.
 *
 * Certain key names are reserved by MCP for protocol-level metadata; implementations MUST NOT make assumptions about values at these keys. Additionally, specific schema definitions may reserve particular names for purpose-specific metadata, as declared in those definitions.
 *
 * Valid keys have two segments:
 *
 * **Prefix:**
 * - Optional — if specified, MUST be a series of _labels_ separated by dots (`.`), followed by a slash (`/`).
 * - Labels MUST start with a letter and end with a letter or digit. Interior characters may be letters, digits, or hyphens (`-`).
 * - Implementations SHOULD use reverse DNS notation (e.g., `com.example/` rather than `example.com/`).
 * - Any prefix where the second label is `modelcontextprotocol` or `mcp` is **reserved** for MCP use. For example: `io.modelcontextprotocol/`, `dev.mcp/`, `org.modelcontextprotocol.api/`, and `com.mcp.tools/` are all reserved. However, `com.example.mcp/` is NOT reserved, as the second label is `example`.
 *
 * **Name:**
 * - Unless empty, MUST start and end with an alphanumeric character (`[a-z0-9A-Z]`).
 * - Interior characters may be alphanumeric, hyphens (`-`), underscores (`_`), or dots (`.`).
 */
export type MetaObject = Record<string, unknown>;

export interface RequestMetaObject extends MetaObject {
  /**
   * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by {@link ProgressNotification | notifications/progress}). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
   */
  progressToken?: ProgressToken;
  /**
   * The MCP Protocol Version being used for this request. Required.
   *
   * For the HTTP transport, this value MUST match the `MCP-Protocol-Version`
   * header; otherwise the server MUST return a `400 Bad Request`. If the
   * server does not support the requested version, it MUST return an
   * {@link UnsupportedProtocolVersionError}.
   */
  "io.modelcontextprotocol/protocolVersion": string;
  /**
   * Identifies the client software making the request. Clients SHOULD
   * include this field on every request unless specifically configured not
   * to do so.
   * (...)
   * The value is self-reported by the client and is not verified by the
   * protocol. It is intended for display, logging, and debugging. Servers
   * SHOULD NOT use it to change their behavior, and SHOULD NOT rely on it for
   * security decisions.
   */
  "io.modelcontextprotocol/clientInfo"?: Implementation;
  /**
   * The client's capabilities for this specific request. Required.
   *
   * Capabilities are declared per-request rather than once at initialization;
   * an empty object means the client supports no optional capabilities.
   * Servers MUST NOT infer capabilities from prior requests.
   */
  "io.modelcontextprotocol/clientCapabilities": ClientCapabilities;
  /**
   * The desired log level for this request. Optional.
   *
   * If absent, the server MUST NOT send any {@link LoggingMessageNotification | notifications/message}
   * notifications for this request. The client opts in to log messages by
   * explicitly setting a level. Replaces the former `logging/setLevel` RPC.
   *
   * @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
   */
  "io.modelcontextprotocol/logLevel"?: LoggingLevel;
}

export interface NotificationMetaObject extends MetaObject {
  /**
   * Identifies the subscription stream a notification was delivered on. The
   * server MUST include this key on every notification delivered via a
   * {@link SubscriptionsListenRequest | subscriptions/listen} stream, so the
   * client can correlate the notification with the originating subscription.
   * The key is absent on notifications not delivered via a subscription
   * stream (e.g. progress notifications for an in-flight request), which is
   * why it is optional here.
   *
   * The value is the JSON-RPC ID of the `subscriptions/listen` request that
   * opened the stream.
   */
  "io.modelcontextprotocol/subscriptionId"?: RequestId;
}

export interface ResultMetaObject extends MetaObject {
  /**
   * Identifies the server software producing the response. Servers SHOULD
   * include this field on every response unless specifically configured not
   * to do so.
   * (...)
   * The value is self-reported by the server and is not verified by the
   * protocol. It is intended for display, logging, and debugging. Clients
   * SHOULD NOT use it to change their behavior, and SHOULD NOT rely on it for
   * security decisions.
   */
  "io.modelcontextprotocol/serverInfo"?: Implementation;
}

export type ProgressToken = string | number;
export type Cursor = string;
export type RequestId = string | number;

export interface RequestParams {
  _meta: RequestMetaObject;
}

export interface NotificationParams {
  _meta?: NotificationMetaObject;
}

/**
 * Indicates the type of a {@link Result} object, allowing the client to
 * determine how to parse the response.
 *
 * complete - the request completed successfully and the result contains the final content.
 * input_required - the request requires additional input and the result contains an {@link InputRequiredResult} object with instructions for the client to provide additional input before retrying the original request.
 */
export type ResultType = "complete" | "input_required" | string;

/** A result that indicates success but carries no data. */
export type EmptyResult = Result;

export interface PaginatedRequestParams extends RequestParams {
  /**
   * An opaque token representing the current pagination position.
   * If provided, the server should return results starting after this cursor.
   */
  cursor?: Cursor;
}

/** @internal */
export interface PaginatedResult extends Result {
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor?: Cursor;
}

/**
 * A result that supports a time-to-live (TTL) hint for client-side caching.
 *
 * @internal
 */
export interface CacheableResult extends Result {
  /**
   * A hint from the server indicating how long (in milliseconds) the
   * client MAY cache this response before re-fetching. Semantics are
   * analogous to HTTP Cache-Control max-age.
   *
   * - If 0, The response SHOULD be considered immediately stale,
   *   The client MAY re-fetch every time the result is needed.
   * - If positive, the client SHOULD consider the result fresh for this many
   *   milliseconds after receiving the response.
   *
   * @minimum 0
   */
  ttlMs: number;

  /**
   * Indicates the intended scope of the cached response, analogous to HTTP
   * `Cache-Control: public` vs `Cache-Control: private`.
   *
   * - `"public"`: The response does not contain user-specific data. Any
   *   client or intermediary (e.g., shared gateway, caching proxy) MAY cache
   *   the response and serve it across authorization contexts.
   * - `"private"`: The response MAY be cached and reused only within the
   *   same authorization context. Caches MUST NOT be shared across
   *   authorization contexts (e.g., a different access token requires a
   *   different cache).
   */
  cacheScope: "public" | "private";
}

/** An optionally-sized icon that can be displayed in a user interface. */
export interface Icon {
  /** A standard URI pointing to an icon resource. May be an HTTP/HTTPS URL or a `data:` URI with Base64-encoded image data. (...) @format uri */
  src: string;
  /** Optional MIME type override if the source MIME type is missing or generic. */
  mimeType?: string;
  /** Optional array of strings that specify sizes at which the icon can be used. Each string should be in WxH format (e.g., `"48x48"`) or `"any"` for scalable formats like SVG. */
  sizes?: string[];
  /** Optional specifier for the theme this icon is designed for. `"light"` ... `"dark"` ... */
  theme?: "light" | "dark";
}

/** @internal */
export interface Icons {
  icons?: Icon[];
}

/** @internal */
export interface BaseMetadata {
  /** Intended for programmatic or logical use, but used as a display name in past specs or fallback (if title isn't present). */
  name: string;
  /** Intended for UI and end-user contexts — optimized to be human-readable and easily understood, even by those unfamiliar with domain-specific terminology. */
  title?: string;
}

/**
 * Describes the MCP implementation.
 *
 * @category `server/discover`
 */
export interface Implementation extends BaseMetadata, Icons {
  /** The version of this implementation. */
  version: string;
  /** An optional human-readable description of what this implementation does. */
  description?: string;
  /** An optional URL of the website for this implementation. @format uri */
  websiteUrl?: string;
}

export type Role = "user" | "assistant";

export interface Annotations {
  /** Describes who the intended audience of this object or data is. */
  audience?: Role[];
  /**
   * Describes how important this data is for operating the server.
   *
   * A value of 1 means "most important," and indicates that the data is
   * effectively required, while 0 means "least important," and indicates that
   * the data is entirely optional.
   *
   * @minimum 0
   * @maximum 1
   */
  priority?: number;
  /** The moment the resource was last modified, as an ISO 8601 formatted string. */
  lastModified?: string;
}
```

Several long JSDoc blocks are abridged above (marked `(...)` or collapsed to one line); the full text is in `schema.ts` at tag `2026-07-28`.

## Options / Props

`_meta` reserved keys defined in this schema:

| Key | Type | Applies to | Description |
|-----|------|-----------|-------------|
| `progressToken` | `ProgressToken` | request `_meta` | Opt in to `notifications/progress` for this request |
| `io.modelcontextprotocol/protocolVersion` | `string` | request `_meta` (required) | Protocol version for this request; MUST match `MCP-Protocol-Version` header on HTTP |
| `io.modelcontextprotocol/clientInfo` | `Implementation` | request `_meta` (optional) | Self-reported client identity; not for security decisions |
| `io.modelcontextprotocol/clientCapabilities` | `ClientCapabilities` | request `_meta` (required) | Per-request capabilities; servers MUST NOT infer from earlier requests |
| `io.modelcontextprotocol/logLevel` | `LoggingLevel` | request `_meta` (optional, deprecated) | Opt in to `notifications/message` |
| `io.modelcontextprotocol/subscriptionId` | `RequestId` | notification `_meta` (optional) | ID of the `subscriptions/listen` request whose stream carried the notification |
| `io.modelcontextprotocol/serverInfo` | `Implementation` | result `_meta` (optional) | Self-reported server identity |

## Notes

- Replaced in 2026-07-28: capabilities and protocol version move from the `initialize` handshake to per-request `_meta`.
- Removed in 2026-07-28: `logging/setLevel` is replaced by `io.modelcontextprotocol/logLevel`; the key is itself Deprecated in 2026-07-28 (SEP-2577; earliest removal: first revision on or after 2027-07-28).
- `CacheableResult` makes `ttlMs` and `cacheScope` required on `server/discover`, list results, and `resources/read` results.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives omitted.

## Related

- [JSON-RPC types](./json-rpc.md)
- [Error types](./errors.md)
- [server/discover types](./discover-types.md)
- [subscriptions/listen types](./subscriptions-types.md)
