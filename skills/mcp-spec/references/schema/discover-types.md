---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#discoverrequest
---

# server/discover types

`DiscoverRequest` / `DiscoverResult` / `DiscoverResultResponse`, plus `ClientCapabilities`, `ServerCapabilities`, and `Implementation` (`@category server/discover`).

## Signature / Usage

```ts
/**
 * A request from the client asking the server to advertise its supported
 * protocol versions, capabilities, and other metadata. Servers **MUST**
 * implement `server/discover`. Clients **MAY** call it but are not required
 * to — version negotiation can also happen inline via per-request `_meta`.
 */
export interface DiscoverRequest extends JSONRPCRequest {
  method: "server/discover";
  params: RequestParams;
}

export interface DiscoverResult extends CacheableResult {
  /**
   * MCP Protocol Versions this server supports. The client should choose a
   * version from this list for use in subsequent requests.
   */
  supportedVersions: string[];
  /** The capabilities of the server. */
  capabilities: ServerCapabilities;
  /**
   * Natural-language guidance describing the server and its features.
   *
   * This can be used by clients to improve an LLM's understanding of
   * available tools (e.g., by including it in a system prompt). It should
   * focus on information that helps the model use the server effectively
   * and should not duplicate information already in tool descriptions.
   */
  instructions?: string;
}

export interface DiscoverResultResponse extends JSONRPCResultResponse {
  result: DiscoverResult;
}

/**
 * Capabilities a client may support. Known capabilities are defined here, in this schema, but this is not a closed set: any client can define its own, additional capabilities.
 */
export interface ClientCapabilities {
  /** Experimental, non-standard capabilities that the client supports. */
  experimental?: { [key: string]: JSONObject };
  /** Present if the client supports listing roots. @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577). */
  roots?: {};
  /** Present if the client supports sampling from an LLM. @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577). */
  sampling?: {
    /**
     * Whether the client supports context inclusion via `includeContext` parameter.
     * If not declared, servers SHOULD only use `includeContext: "none"` (or omit it).
     */
    context?: JSONObject;
    /** Whether the client supports tool use via `tools` and `toolChoice` parameters. */
    tools?: JSONObject;
  };
  /** Present if the client supports elicitation from the server. */
  elicitation?: {
    form?: JSONObject;
    url?: JSONObject;
  };
  /**
   * Optional MCP extensions that the client supports. Keys are extension identifiers
   * (e.g., "io.modelcontextprotocol/oauth-client-credentials"), and values are
   * per-extension settings objects. An empty object indicates support with no settings.
   *
   * Keys MUST follow the {@link MetaObject | `_meta` key naming rules}, with a
   * mandatory prefix.
   */
  extensions?: { [key: string]: JSONObject };
}

/**
 * Capabilities that a server may support. Known capabilities are defined here, in this schema, but this is not a closed set: any server can define its own, additional capabilities.
 */
export interface ServerCapabilities {
  /** Experimental, non-standard capabilities that the server supports. */
  experimental?: { [key: string]: JSONObject };
  /** Present if the server supports sending log messages to the client. @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577). */
  logging?: JSONObject;
  /** Present if the server supports argument autocompletion suggestions. */
  completions?: JSONObject;
  /** Present if the server offers any prompt templates. */
  prompts?: {
    /** Whether this server supports notifications for changes to the prompt list. */
    listChanged?: boolean;
  };
  /** Present if the server offers any resources to read. */
  resources?: {
    /** Whether this server supports subscribing to resource updates. */
    subscribe?: boolean;
    /** Whether this server supports notifications for changes to the resource list. */
    listChanged?: boolean;
  };
  /** Present if the server offers any tools to call. */
  tools?: {
    /** Whether this server supports notifications for changes to the tool list. */
    listChanged?: boolean;
  };
  /**
   * Optional MCP extensions that the server supports. Keys are extension identifiers
   * (e.g., "io.modelcontextprotocol/tasks"), and values are per-extension settings
   * objects. An empty object indicates support with no settings.
   *
   * Keys MUST follow the {@link MetaObject | `_meta` key naming rules}, with a
   * mandatory prefix.
   */
  extensions?: { [key: string]: JSONObject };
}

/** Describes the MCP implementation. */
export interface Implementation extends BaseMetadata, Icons {
  /** The version of this implementation. */
  version: string;
  /** An optional human-readable description of what this implementation does. */
  description?: string;
  /** An optional URL of the website for this implementation. @format uri */
  websiteUrl?: string;
}
```

Request (`examples/DiscoverRequest/server-discover-request.json`):

```json
{
  "jsonrpc": "2.0",
  "id": "discover-1",
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

Response (`examples/DiscoverResultResponse/discover-result-response.json`):

```json
{
  "jsonrpc": "2.0",
  "id": "discover-1",
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": {
      "tools": {},
      "resources": {}
    },
    "_meta": {
      "io.modelcontextprotocol/serverInfo": {
        "name": "ExampleServer",
        "version": "1.0.0"
      }
    },
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `supportedVersions` | `string[]` | yes | Protocol versions the server supports |
| `capabilities` | `ServerCapabilities` | yes | Server capabilities |
| `instructions` | `string` | no | Natural-language guidance for clients / LLMs |
| `ttlMs` | `number` | yes | Cache TTL hint (from `CacheableResult`) |
| `cacheScope` | `"public" \| "private"` | yes | Cache scope (from `CacheableResult`) |

## Notes

- Added in 2026-07-28: `server/discover` is new and servers MUST implement it; it supersedes the capability exchange that `initialize` performed in 2025-11-25.
- Removed in 2026-07-28: `initialize`, `notifications/initialized`, and `ping`.
- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): `ClientCapabilities.roots`, `ClientCapabilities.sampling`, `ServerCapabilities.logging`.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. Several JSDoc blocks are collapsed to one line; `@example` / `{@includeCode}` directives omitted.

## Related

- [Common Types](./common-types.md)
- [Error types](./errors.md)
- [tools/* types](./tools-types.md)
