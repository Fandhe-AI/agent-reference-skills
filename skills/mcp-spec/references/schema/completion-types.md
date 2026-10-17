---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#completerequest
---

# completion/complete types

Schema types for `completion/complete`: `CompleteRequestParams`, `CompleteResult`, `PromptReference`, `ResourceTemplateReference`.

## Signature / Usage

```ts
export interface CompleteRequestParams extends RequestParams {
  ref: PromptReference | ResourceTemplateReference;
  /** The argument's information */
  argument: {
    /** The name of the argument */
    name: string;
    /** The value of the argument to use for completion matching. */
    value: string;
  };

  /** Additional, optional context for completions */
  context?: {
    /** Previously-resolved variables in a URI template or prompt. */
    arguments?: { [key: string]: string };
  };
}

/** A request from the client to the server, to ask for completion options. */
export interface CompleteRequest extends JSONRPCRequest {
  method: "completion/complete";
  params: CompleteRequestParams;
}

export interface CompleteResult extends Result {
  completion: {
    /**
     * An array of completion values. Must not exceed 100 items.
     *
     * @maxItems 100
     */
    values: string[];
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total?: number;
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore?: boolean;
  };
}

export interface CompleteResultResponse extends JSONRPCResultResponse {
  result: CompleteResult;
}

/** A reference to a resource or resource template definition. */
export interface ResourceTemplateReference {
  type: "ref/resource";
  /**
   * The URI or URI template of the resource.
   *
   * @format uri-template
   */
  uri: string;
}

/** Identifies a prompt. */
export interface PromptReference extends BaseMetadata {
  type: "ref/prompt";
}
```

Request (`examples/CompleteRequest/completion-request.json`):

```json
{
  "jsonrpc": "2.0",
  "id": "completion-example",
  "method": "completion/complete",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    },
    "ref": {
      "type": "ref/prompt",
      "name": "code_review"
    },
    "argument": {
      "name": "language",
      "value": "py"
    }
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ref` | `PromptReference \| ResourceTemplateReference` | yes | Target of the completion |
| `argument.name` | `string` | yes | Argument name |
| `argument.value` | `string` | yes | Value to match |
| `context.arguments` | `{ [key: string]: string }` | no | Previously-resolved variables |
| `completion.values` | `string[]` | yes | At most 100 items |
| `completion.total` | `number` | no | Total options available |
| `completion.hasMore` | `boolean` | no | More options exist |

## Notes

- Servers advertise support through `ServerCapabilities.completions`.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives omitted.

## Related

- [prompts/* types](./prompts-types.md)
- [resources/* types](./resources-types.md)
- [server/discover types](./discover-types.md)
