---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#listpromptsrequest
---

# prompts/* types

Schema types for `prompts/list`, `prompts/get`, and `notifications/prompts/list_changed`: `Prompt`, `PromptArgument`, `PromptMessage`, `GetPromptResult`.

## Signature / Usage

```ts
export interface ListPromptsRequest extends PaginatedRequest {
  method: "prompts/list";
}

export interface ListPromptsResult extends PaginatedResult, CacheableResult {
  prompts: Prompt[];
}

export interface GetPromptRequestParams extends InputResponseRequestParams {
  /** The name of the prompt or prompt template. */
  name: string;
  /** Arguments to use for templating the prompt. */
  arguments?: { [key: string]: string };
}

/** Used by the client to get a prompt provided by the server. */
export interface GetPromptRequest extends JSONRPCRequest {
  method: "prompts/get";
  params: GetPromptRequestParams;
}

export interface GetPromptResult extends Result {
  /** An optional description for the prompt. */
  description?: string;
  messages: PromptMessage[];
}

export interface GetPromptResultResponse extends JSONRPCResultResponse {
  result: GetPromptResult | InputRequiredResult;
}

/** A prompt or prompt template that the server offers. */
export interface Prompt extends BaseMetadata, Icons {
  /** An optional description of what this prompt provides */
  description?: string;
  /** A list of arguments to use for templating the prompt. */
  arguments?: PromptArgument[];
  _meta?: MetaObject;
}

/** Describes an argument that a prompt can accept. */
export interface PromptArgument extends BaseMetadata {
  /** A human-readable description of the argument. */
  description?: string;
  /** Whether this argument must be provided. */
  required?: boolean;
}

/**
 * Describes a message returned as part of a prompt.
 *
 * This is similar to {@link SamplingMessage}, but also supports the embedding of
 * resources from the MCP server.
 */
export interface PromptMessage {
  role: Role;
  content: ContentBlock;
}

/**
 * An optional notification from the server to the client, informing it that the list of prompts it offers has changed. This is only delivered on a {@link SubscriptionsListenRequest | subscriptions/listen} stream when the client requested it via the `promptsListChanged` filter field.
 */
export interface PromptListChangedNotification extends JSONRPCNotification {
  method: "notifications/prompts/list_changed";
  params?: NotificationParams;
}
```

Request (`examples/GetPromptRequest/get-prompt-request.json`):

```json
{
  "jsonrpc": "2.0",
  "id": "get-prompt-example",
  "method": "prompts/get",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    },
    "name": "code_review",
    "arguments": {
      "code": "def hello():\n    print('world')"
    }
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Prompt.name` | `string` | yes | Prompt identifier |
| `Prompt.arguments` | `PromptArgument[]` | no | Templating arguments |
| `PromptArgument.required` | `boolean` | no | Whether the argument must be provided |
| `GetPromptRequestParams.name` | `string` | yes | Prompt to get |
| `GetPromptRequestParams.arguments` | `{ [key: string]: string }` | no | Argument values (strings) |
| `GetPromptResult.messages` | `PromptMessage[]` | yes | Resulting messages |

## Notes

- Replaced in 2026-07-28: `prompts/list` results are `CacheableResult` (`ttlMs` / `cacheScope` required); `prompts/get` results may be `InputRequiredResult` (MRTR).
- `notifications/prompts/list_changed` is delivered only on a `subscriptions/listen` stream with `promptsListChanged`.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives omitted.

## Related

- [Content types](./content.md)
- [completion/complete types](./completion-types.md)
- [Multi Round-Trip types](./mrtr-types.md)
