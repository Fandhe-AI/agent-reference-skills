---
source: https://modelcontextprotocol.io/specification/2026-07-28/client/sampling#sampling-with-tools
---

# Sampling with Tools

Servers can request that the client's LLM use tools during sampling by providing a `tools` array and optional `toolChoice` in a `sampling/createMessage` request. Tool definitions are scoped to the sampling request and do not need to correspond to registered tools.

## Signature / Usage

Clients **MUST** declare support via the `sampling.tools` capability to receive tool-enabled sampling requests. Servers **MUST NOT** send tool-enabled sampling requests to clients that have not declared it.

```json
{
  "_meta": {
    "io.modelcontextprotocol/clientCapabilities": {
      "sampling": {
        "tools": {}
      }
    }
  }
}
```

Input request (Server -> Client, delivered inside `InputRequiredResult.inputRequests`):

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What's the weather like in Paris and London?"
        }
      }
    ],
    "tools": [
      {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "inputSchema": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string",
              "description": "City name"
            }
          },
          "required": ["city"]
        }
      }
    ],
    "toolChoice": {
      "mode": "auto"
    },
    "maxTokens": 1000
  }
}
```

Client result (Client -> Server, returned inside `inputResponses` on the retried request):

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "call_abc123",
      "name": "get_weather",
      "input": {
        "city": "Paris"
      }
    },
    {
      "type": "tool_use",
      "id": "call_def456",
      "name": "get_weather",
      "input": {
        "city": "London"
      }
    }
  ],
  "model": "claude-3-sonnet-20240307",
  "stopReason": "toolUse"
}
```

Multi-turn tool loop: after receiving tool use requests, the server typically (1) executes the requested tool uses, (2) sends a new sampling request with the tool results appended, (3) receives the LLM's response (which might contain new tool uses), and (4) repeats as many times as needed. The server might cap the maximum number of iterations, and e.g. pass `toolChoice: {mode: "none"}` on the last iteration to force a final result.

Follow-up input request (Server -> Client) with tool results (abridged to the tool-result turn):

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "toolUseId": "call_abc123",
      "content": [
        {
          "type": "text",
          "text": "Weather in Paris: 18°C, partly cloudy"
        }
      ]
    },
    {
      "type": "tool_result",
      "toolUseId": "call_def456",
      "content": [
        {
          "type": "text",
          "text": "Weather in London: 15°C, rainy"
        }
      ]
    }
  ]
}
```

The follow-up request's `messages` carry the original user message, the assistant message with the `tool_use` blocks, and then this user message, together with the same `tools` and `maxTokens`. The final client result has `stopReason: "endTurn"` with a text content block.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tools` | array | Tool definitions scoped to this sampling request (`name`, `description`, `inputSchema`) |
| `toolChoice.mode` | `"auto"` / `"required"` / `"none"` | `auto`: model decides whether to use tools (default). `required`: model **MUST** use at least one tool before completing. `none`: model **MUST NOT** use any tools |
| `tool_use` content | object | `type`, `id`, `name`, `input` (in an assistant message / `CreateMessageResult`) |
| `tool_result` content | object | `type`, `toolUseId`, `content` (in a user message) |

## Notes

- Message content constraints: a user message containing tool results (`type: "tool_result"`) **MUST** contain ONLY tool results. Mixing tool results with text, image, or audio content in the same message is not allowed (compatibility with provider APIs that use dedicated roles for tool results, e.g. OpenAI's "tool" role and Gemini's "function" role). A single tool result or multiple tool results in one message are valid.
- Tool use and result balance: every assistant message containing `ToolUseContent` blocks **MUST** be followed by a user message consisting entirely of `ToolResultContent` blocks, with each tool use (`id: $id`) matched by a tool result (`toolUseId: $id`), before any other message. A sequence where one tool use has no matching result is invalid.
- Message roles: MCP uses two roles, "user" and "assistant". Tool use requests are sent in `CreateMessageResult` with the "assistant" role; tool results are sent back in messages with the "user" role.
- Parallel tool use: models may make multiple tool use requests in parallel (an array of `ToolUseContent`). Implementations wrapping providers that support disabling parallel tool use **MAY** expose this as an extension, but it is not part of the core MCP specification.
- Security: servers **MUST** ensure that when replying to `stopReason: "toolUse"`, each `ToolUseContent` item is answered with a `ToolResultContent` item with a matching `toolUseId`, and that the user message contains only tool results. Both parties **SHOULD** implement iteration limits for tool loops.
- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Sampling as a whole, including tool-enabled sampling, is deprecated (SEP-2577). See the Sampling page.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/client/sampling.mdx`, sections Tools in Sampling, Sampling with Tools, Multi-turn Tool Loop, Message Content Constraints, Cross-API Compatibility).

## Related

- [Sampling (Deprecated)](./sampling.md)
- [Multi Round-Trip Requests (MRTR)](../patterns/mrtr.md)
- [Deprecated Features](../overview/deprecated-features.md)
