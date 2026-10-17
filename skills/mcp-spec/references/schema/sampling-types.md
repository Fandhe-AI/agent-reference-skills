---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#createmessagerequest
---

# sampling/createMessage types

Schema types for `sampling/createMessage` (server-to-client LLM sampling): `CreateMessageRequestParams`, `CreateMessageResult`, `SamplingMessage`, `ModelPreferences`, `ModelHint`, `ToolChoice`, `ToolUseContent`, `ToolResultContent`. The whole category is Deprecated as of 2026-07-28 (SEP-2577).

## Signature / Usage

```ts
/**
 * @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
 * Remains in the specification for at least twelve months; see the
 * deprecated features registry.
 */
export interface CreateMessageRequestParams {
  messages: SamplingMessage[];
  /** The server's preferences for which model to select. The client MAY ignore these preferences. */
  modelPreferences?: ModelPreferences;
  /** An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt. */
  systemPrompt?: string;
  /**
   * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt.
   * The client MAY ignore this request.
   *
   * Default is `"none"`. The values `"thisServer"` and `"allServers"` are deprecated (SEP-2596): servers SHOULD
   * omit this field or use `"none"`, and SHOULD only use the deprecated values if the client declares
   * {@link ClientCapabilities.sampling.context}.
   *
   * @deprecated The `"thisServer"` and `"allServers"` values are deprecated as of protocol version 2025-11-25
   * (SEP-2596) and will be removed no later than the Sampling feature itself (SEP-2577). Omit this field or use `"none"`.
   */
  includeContext?: "none" | "thisServer" | "allServers";
  temperature?: number;
  /**
   * The requested maximum number of tokens to sample (to prevent runaway completions).
   *
   * The client MAY choose to sample fewer tokens than the requested maximum.
   */
  maxTokens: number;
  stopSequences?: string[];
  /** Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific. */
  metadata?: JSONObject;
  /**
   * Tools that the model may use during generation.
   * The client MUST return an error if this field is provided but {@link ClientCapabilities.sampling.tools} is not declared.
   */
  tools?: Tool[];
  /**
   * Controls how the model uses tools.
   * The client MUST return an error if this field is provided but {@link ClientCapabilities.sampling.tools} is not declared.
   * Default is `{ mode: "auto" }`.
   */
  toolChoice?: ToolChoice;
}

/** Controls tool selection behavior for sampling requests. */
export interface ToolChoice {
  /**
   * Controls the tool use ability of the model:
   * - `"auto"`: Model decides whether to use tools (default)
   * - `"required"`: Model MUST use at least one tool before completing
   * - `"none"`: Model MUST NOT use any tools
   */
  mode?: "auto" | "required" | "none";
}

/**
 * A request from the server to sample an LLM via the client. The client has full discretion over which model to select. The client should also inform the user before beginning sampling, to allow them to inspect the request (human in the loop) and decide whether to approve it.
 */
export interface CreateMessageRequest {
  method: "sampling/createMessage";
  params: CreateMessageRequestParams;
}

/**
 * The result returned by the client for a {@link CreateMessageRequest | sampling/createMessage} request.
 * The client should inform the user before returning the sampled message, to allow them
 * to inspect the response (human in the loop) and decide whether to allow the server to see it.
 */
export interface CreateMessageResult extends SamplingMessage {
  /** The name of the model that generated the message. */
  model: string;

  /**
   * The reason why sampling stopped, if known.
   *
   * Standard values:
   * - `"endTurn"`: Natural end of the assistant's turn
   * - `"stopSequence"`: A stop sequence was encountered
   * - `"maxTokens"`: Maximum token limit was reached
   * - `"toolUse"`: The model wants to use one or more tools
   *
   * This field is an open string to allow for provider-specific stop reasons.
   */
  stopReason?: "endTurn" | "stopSequence" | "maxTokens" | "toolUse" | string;
}

/** Describes a message issued to or received from an LLM API. */
export interface SamplingMessage {
  role: Role;
  content: SamplingMessageContentBlock | SamplingMessageContentBlock[];
  _meta?: MetaObject;
}

export type SamplingMessageContentBlock =
  | TextContent
  | ImageContent
  | AudioContent
  | ToolUseContent
  | ToolResultContent;

/** A request from the assistant to call a tool. */
export interface ToolUseContent {
  type: "tool_use";
  /**
   * A unique identifier for this tool use.
   *
   * This ID is used to match tool results to their corresponding tool uses.
   */
  id: string;
  /** The name of the tool to call. */
  name: string;
  /** The arguments to pass to the tool, conforming to the tool's input schema. */
  input: { [key: string]: unknown };
  /**
   * Optional metadata about the tool use. Clients SHOULD preserve this field when
   * including tool uses in subsequent sampling requests to enable caching optimizations.
   */
  _meta?: MetaObject;
}

/** The result of a tool use, provided by the user back to the assistant. */
export interface ToolResultContent {
  type: "tool_result";
  /**
   * The ID of the tool use this result corresponds to.
   *
   * This MUST match the ID from a previous {@link ToolUseContent}.
   */
  toolUseId: string;
  /**
   * The unstructured result content of the tool use.
   *
   * This has the same format as {@link CallToolResult.content} and can include text, images,
   * audio, resource links, and embedded resources.
   */
  content: ContentBlock[];
  /**
   * An optional structured result value.
   *
   * This can be any JSON value (object, array, string, number, boolean, or null).
   * If the tool defined an {@link Tool.outputSchema}, this SHOULD conform to that schema.
   */
  structuredContent?: unknown;
  /**
   * Whether the tool use resulted in an error.
   *
   * If true, the content typically describes the error that occurred.
   * Default: false
   */
  isError?: boolean;
  /**
   * Optional metadata about the tool result. Clients SHOULD preserve this field when
   * including tool results in subsequent sampling requests to enable caching optimizations.
   */
  _meta?: MetaObject;
}

/**
 * The server's preferences for model selection, requested of the client during sampling.
 *
 * These preferences are always advisory. The client MAY ignore them. It is also
 * up to the client to decide how to interpret these preferences and how to
 * balance them against other considerations.
 */
export interface ModelPreferences {
  /**
   * Optional hints to use for model selection.
   *
   * If multiple hints are specified, the client MUST evaluate them in order
   * (such that the first match is taken).
   *
   * The client SHOULD prioritize these hints over the numeric priorities, but
   * MAY still use the priorities to select from ambiguous matches.
   */
  hints?: ModelHint[];
  /** How much to prioritize cost when selecting a model. 0 = not important, 1 = most important. @minimum 0 @maximum 1 */
  costPriority?: number;
  /** How much to prioritize sampling speed (latency). 0 = not important, 1 = most important. @minimum 0 @maximum 1 */
  speedPriority?: number;
  /** How much to prioritize intelligence and capabilities. 0 = not important, 1 = most important. @minimum 0 @maximum 1 */
  intelligencePriority?: number;
}

/**
 * Hints to use for model selection.
 *
 * Keys not declared here are currently left unspecified by the spec and are up
 * to the client to interpret.
 */
export interface ModelHint {
  /**
   * A hint for a model name.
   *
   * The client SHOULD treat this as a substring of a model name; for example:
   *  - `claude-3-5-sonnet` should match `claude-3-5-sonnet-20241022`
   *  - `sonnet` should match `claude-3-5-sonnet-20241022`, `claude-3-sonnet-20240229`, etc.
   *  - `claude` should match any Claude model
   *
   * The client MAY also map the string to a different provider's model name or a different model family, as long as it fills a similar niche; for example:
   *  - `gemini-1.5-flash` could match `claude-3-haiku-20240307`
   */
  name?: string;
}
```

Request (`examples/CreateMessageRequest/sampling-request.json`):

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What is the capital of France?"
        }
      }
    ],
    "modelPreferences": {
      "hints": [
        {
          "name": "claude-3-sonnet"
        }
      ],
      "intelligencePriority": 0.8,
      "speedPriority": 0.5
    },
    "systemPrompt": "You are a helpful assistant.",
    "maxTokens": 100
  }
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messages` | `SamplingMessage[]` | yes | Conversation to sample from |
| `maxTokens` | `number` | yes | Requested maximum tokens |
| `modelPreferences` | `ModelPreferences` | no | Advisory preferences |
| `systemPrompt` | `string` | no | Client MAY modify or omit |
| `includeContext` | `"none" \| "thisServer" \| "allServers"` | no | `thisServer` / `allServers` deprecated (SEP-2596) |
| `tools` / `toolChoice` | `Tool[]` / `ToolChoice` | no | Require client `sampling.tools` capability, else client MUST return an error |
| `stopReason` (result) | `"endTurn" \| "stopSequence" \| "maxTokens" \| "toolUse" \| string` | no | Open string |

## Notes

- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Sampling (SEP-2577), including `ClientCapabilities.sampling` and all types on this page. `includeContext: "thisServer"` / `"allServers"` have been deprecated since 2025-11-25 (SEP-2596).
- Replaced in 2026-07-28: server-initiated requests such as `sampling/createMessage` are carried by MRTR `inputRequests` inside an `InputRequiredResult`; `CreateMessageRequest` does not extend `JSONRPCRequest` here (no `jsonrpc` / `id`).
- `ToolUseContent` and `ToolResultContent` carry `@category sampling/createMessage` in `schema.ts` even though they are `Content`-like.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. Some one-line JSDoc comments are collapsed; `@example` / `{@includeCode}` directives omitted.

## Related

- [Multi Round-Trip types](./mrtr-types.md)
- [Content types](./content.md)
- [tools/* types](./tools-types.md)
