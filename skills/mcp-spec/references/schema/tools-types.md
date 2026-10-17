---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#listtoolsrequest
---

# tools/* types

Schema types for `tools/list`, `tools/call`, and `notifications/tools/list_changed`: `Tool`, `ToolAnnotations`, `CallToolRequestParams`, `CallToolResult`, and the list result types.

## Signature / Usage

```ts
export interface ListToolsRequest extends PaginatedRequest {
  method: "tools/list";
}

export interface ListToolsResult extends PaginatedResult, CacheableResult {
  tools: Tool[];
}

export interface ListToolsResultResponse extends JSONRPCResultResponse {
  result: ListToolsResult;
}

export interface CallToolRequestParams extends InputResponseRequestParams {
  /** The name of the tool. */
  name: string;
  /** Arguments to use for the tool call. */
  arguments?: { [key: string]: unknown };
}

/** Used by the client to invoke a tool provided by the server. */
export interface CallToolRequest extends JSONRPCRequest {
  method: "tools/call";
  params: CallToolRequestParams;
}

export interface CallToolResult extends Result {
  /** A list of content objects that represent the unstructured result of the tool call. */
  content: ContentBlock[];

  /**
   * An optional JSON value that represents the structured result of the tool call.
   *
   * This can be any JSON value (object, array, string, number, boolean, or null)
   * that conforms to the tool's outputSchema if one is defined.
   */
  structuredContent?: unknown;

  /**
   * Whether the tool call ended in an error.
   *
   * If not set, this is assumed to be false (the call was successful).
   *
   * Any errors that originate from the tool SHOULD be reported inside the result
   * object, with `isError` set to true, _not_ as an MCP protocol-level error
   * response. Otherwise, the LLM would not be able to see that an error occurred
   * and self-correct.
   *
   * However, any errors in _finding_ the tool, an error indicating that the
   * server does not support tool calls, or any other exceptional conditions,
   * should be reported as an MCP error response.
   */
  isError?: boolean;
}

export interface CallToolResultResponse extends JSONRPCResultResponse {
  result: CallToolResult | InputRequiredResult;
}

/**
 * An optional notification from the server to the client, informing it that the list of tools it offers has changed. This is only delivered on a {@link SubscriptionsListenRequest | subscriptions/listen} stream when the client requested it via the `toolsListChanged` filter field.
 */
export interface ToolListChangedNotification extends JSONRPCNotification {
  method: "notifications/tools/list_changed";
  params?: NotificationParams;
}

/**
 * Additional properties describing a {@link Tool} to clients.
 *
 * NOTE: all properties in `ToolAnnotations` are **hints**.
 * They are not guaranteed to provide a faithful description of
 * tool behavior (including descriptive properties like `title`).
 *
 * Clients should never make tool use decisions based on `ToolAnnotations`
 * received from untrusted servers.
 */
export interface ToolAnnotations {
  /** A human-readable title for the tool. */
  title?: string;
  /** If true, the tool does not modify its environment. Default: false */
  readOnlyHint?: boolean;
  /**
   * If true, the tool may perform destructive updates to its environment.
   * If false, the tool performs only additive updates.
   * (This property is meaningful only when `readOnlyHint == false`)
   * Default: true
   */
  destructiveHint?: boolean;
  /**
   * If true, calling the tool repeatedly with the same arguments
   * will have no additional effect on its environment.
   * (This property is meaningful only when `readOnlyHint == false`)
   * Default: false
   */
  idempotentHint?: boolean;
  /**
   * If true, this tool may interact with an "open world" of external
   * entities. If false, the tool's domain of interaction is closed.
   * For example, the world of a web search tool is open, whereas that
   * of a memory tool is not.
   * Default: true
   */
  openWorldHint?: boolean;
}

/** Definition for a tool the client can call. */
export interface Tool extends BaseMetadata, Icons {
  /**
   * A human-readable description of the tool.
   *
   * This can be used by clients to improve the LLM's understanding of available tools. It can be thought of like a "hint" to the model.
   */
  description?: string;

  /**
   * A JSON Schema object defining the expected parameters for the tool.
   *
   * Tool arguments are always JSON objects, so `type: "object"` is required at the root.
   * Beyond that, any JSON Schema 2020-12 keyword may appear alongside `type` — including
   * composition keywords (`oneOf`, `anyOf`, `allOf`, `not`), conditional keywords
   * (`if`/`then`/`else`), reference keywords (`$ref`, `$defs`, `$anchor`), and any other
   * standard validation or annotation keywords.
   *
   * Property schemas may carry an `x-mcp-header` annotation to mirror the
   * argument value into an HTTP header on the Streamable HTTP transport. See
   * the Streamable HTTP transport specification for the validity and
   * extraction rules.
   *
   * Defaults to JSON Schema 2020-12 when no explicit `$schema` is provided.
   */
  inputSchema: { $schema?: string; type: "object"; [key: string]: unknown };

  /**
   * An optional JSON Schema object defining the structure of the tool's output returned in
   * the structuredContent field of a {@link CallToolResult}. This can be any valid JSON Schema 2020-12.
   *
   * Defaults to JSON Schema 2020-12 when no explicit `$schema` is provided.
   */
  outputSchema?: { $schema?: string; [key: string]: unknown };

  /**
   * Optional additional tool information.
   *
   * Display name precedence order is: `title`, `annotations.title`, then `name`.
   */
  annotations?: ToolAnnotations;

  _meta?: MetaObject;
}
```

Request (`examples/CallToolRequest/call-tool-request.json`):

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
| `Tool.name` | `string` | yes | Programmatic tool name |
| `Tool.inputSchema` | `{ $schema?; type: "object"; ... }` | yes | JSON Schema 2020-12 by default; `x-mcp-header` allowed on properties |
| `Tool.outputSchema` | JSON Schema | no | Schema of `structuredContent` |
| `Tool.annotations` | `ToolAnnotations` | no | Hints only |
| `CallToolRequestParams.name` | `string` | yes | Tool to call |
| `CallToolRequestParams.arguments` | `{ [key: string]: unknown }` | no | Tool arguments |
| `CallToolResult.content` | `ContentBlock[]` | yes | Unstructured result |
| `CallToolResult.structuredContent` | `unknown` | no | Structured result |
| `CallToolResult.isError` | `boolean` | no | Tool-level error flag |

## Notes

- Replaced in 2026-07-28: `tools/list` results are `CacheableResult`, so `ttlMs` and `cacheScope` are required; every result also carries a required `resultType`.
- `CallToolResultResponse.result` may be an `InputRequiredResult` (MRTR), replacing server-initiated requests during a tool call; `CallToolRequestParams` carries `inputResponses` / `requestState` via `InputResponseRequestParams`.
- `notifications/tools/list_changed` is delivered only on a `subscriptions/listen` stream with `toolsListChanged`.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives omitted.

## Related

- [Content types](./content.md)
- [Multi Round-Trip types](./mrtr-types.md)
- [subscriptions/listen types](./subscriptions-types.md)
