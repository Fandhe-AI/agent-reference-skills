---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#listresourcesrequest
---

# resources/* types

Schema types for `resources/list`, `resources/templates/list`, `resources/read`, `notifications/resources/list_changed`, and `notifications/resources/updated`: `Resource`, `ResourceTemplate`, and result types.

## Signature / Usage

```ts
export interface ListResourcesRequest extends PaginatedRequest {
  method: "resources/list";
}

export interface ListResourcesResult extends PaginatedResult, CacheableResult {
  resources: Resource[];
}

export interface ListResourceTemplatesRequest extends PaginatedRequest {
  method: "resources/templates/list";
}

export interface ListResourceTemplatesResult
  extends PaginatedResult, CacheableResult {
  resourceTemplates: ResourceTemplate[];
}

/** @internal */
export interface ResourceRequestParams extends RequestParams {
  /**
   * The URI of the resource. The URI can use any protocol; it is up to the server how to interpret it.
   *
   * @format uri
   */
  uri: string;
}

export interface ReadResourceRequestParams
  extends ResourceRequestParams, InputResponseRequestParams {}

/** Sent from the client to the server, to read a specific resource URI. */
export interface ReadResourceRequest extends JSONRPCRequest {
  method: "resources/read";
  params: ReadResourceRequestParams;
}

export interface ReadResourceResult extends CacheableResult {
  contents: (TextResourceContents | BlobResourceContents)[];
}

export interface ReadResourceResultResponse extends JSONRPCResultResponse {
  result: ReadResourceResult | InputRequiredResult;
}

/**
 * An optional notification from the server to the client, informing it that the list of resources it can read from has changed. This is only delivered on a {@link SubscriptionsListenRequest | subscriptions/listen} stream when the client requested it via the `resourcesListChanged` filter field.
 */
export interface ResourceListChangedNotification extends JSONRPCNotification {
  method: "notifications/resources/list_changed";
  params?: NotificationParams;
}

export interface ResourceUpdatedNotificationParams extends NotificationParams {
  /**
   * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
   *
   * @format uri
   */
  uri: string;
}

/**
 * A notification from the server to the client, informing it that a resource has changed and may need to be read again. This is only sent for resources the client opted in to via the `resourceSubscriptions` field of a {@link SubscriptionsListenRequest | subscriptions/listen} request.
 */
export interface ResourceUpdatedNotification extends JSONRPCNotification {
  method: "notifications/resources/updated";
  params: ResourceUpdatedNotificationParams;
}

/** A known resource that the server is capable of reading. */
export interface Resource extends BaseMetadata, Icons {
  /** The URI of this resource. @format uri */
  uri: string;

  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description?: string;

  /** The MIME type of this resource, if known. */
  mimeType?: string;

  /** Optional annotations for the client. */
  annotations?: Annotations;

  /**
   * The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.
   *
   * This can be used by Hosts to display file sizes and estimate context window usage.
   */
  size?: number;

  _meta?: MetaObject;
}

/** A template description for resources available on the server. */
export interface ResourceTemplate extends BaseMetadata, Icons {
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   *
   * @format uri-template
   */
  uriTemplate: string;

  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description?: string;

  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType?: string;

  /** Optional annotations for the client. */
  annotations?: Annotations;

  _meta?: MetaObject;
}
```

Request (`examples/ReadResourceRequest/read-resource-request.json`):

```json
{
  "jsonrpc": "2.0",
  "id": "read-resource-example",
  "method": "resources/read",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    },
    "uri": "file:///project/src/main.rs"
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Resource.uri` | `string` (uri) | yes | Resource URI |
| `Resource.mimeType` | `string` | no | MIME type if known |
| `Resource.size` | `number` | no | Raw size in bytes |
| `ResourceTemplate.uriTemplate` | `string` (uri-template, RFC 6570) | yes | Template for constructing URIs |
| `ReadResourceResult.contents` | `(TextResourceContents \| BlobResourceContents)[]` | yes | Contents read |
| `ListResourcesResult.resources` | `Resource[]` | yes | Resources |
| `ListResourceTemplatesResult.resourceTemplates` | `ResourceTemplate[]` | yes | Templates |

## Notes

- Removed in 2026-07-28: `resources/subscribe` and `resources/unsubscribe` are replaced by the `resourceSubscriptions` field of `subscriptions/listen`.
- Replaced in 2026-07-28: resource not found `-32002` becomes `-32602` (see Error types).
- Replaced in 2026-07-28: list and read results are `CacheableResult` (`ttlMs` / `cacheScope` required) with a required `resultType`.
- `TextResourceContents` / `BlobResourceContents` are documented in the Content types page.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. Some JSDoc blocks collapsed; `@example` / `{@includeCode}` directives omitted.

## Related

- [Content types](./content.md)
- [subscriptions/listen types](./subscriptions-types.md)
- [Error types](./errors.md)
