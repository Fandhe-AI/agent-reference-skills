---
source: https://modelcontextprotocol.io/docs/2026-07-28/learn/client-concepts
---

# Understanding MCP Clients

Learning-guide explanation of client features offered to servers: elicitation, roots (deprecated) and sampling (deprecated), delivered via Multi Round-Trip Requests.

## Signature / Usage

Elicitation request delivered inside `InputRequiredResult.inputRequests`:

```typescript
{
  method: "elicitation/create",
  params: {
    mode: "form",
    message: "Please confirm your Barcelona vacation booking details:",
    requestedSchema: {
      type: "object",
      properties: {
        confirmBooking: {
          type: "boolean",
          description: "Confirm the booking (Flights + Hotel = $3,000)"
        },
        seatPreference: {
          type: "string",
          enum: ["window", "aisle", "no preference"],
          description: "Preferred seat type for flights"
        }
      },
      required: ["confirmBooking"]
    }
  }
}
```

(Abridged from the source example.)

Root structure:

```json
{
  "uri": "file:///Users/agent/travel-planning",
  "name": "Travel Planning Workspace"
}
```

Sampling request parameters:

```typescript
{
  messages: [
    { role: "user", content: { type: "text", text: "Analyze these flight options and recommend the best choice: ..." } }
  ],
  modelPreferences: {
    hints: [{ name: "claude-sonnet-4-20250514" }],
    costPriority: 0.3,
    speedPriority: 0.2,
    intelligencePriority: 0.9
  },
  systemPrompt: "You are a travel expert helping users find the best flights based on their preferences",
  maxTokens: 1500
}
```

(Abridged from the source example.)

## Options / Props

| Feature | Explanation | Status |
|---------|-------------|--------|
| Elicitation | Servers request specific information from users; modes: form (client builds a form from a schema) and URL (user opens a URL out of band; data never passes through the client) | Active |
| Roots | Clients specify which directories servers should focus on (`file://` URIs); advisory, not a security boundary | Deprecated as of `2026-07-28` |
| Sampling | Servers request LLM completions through the client | Deprecated as of `2026-07-28` |

## Notes

- Elicitation follows the Multi Round-Trip Requests (MRTR) pattern: the server answers a request such as `tools/call` with an `InputRequiredResult` whose `inputRequests` carries `elicitation/create` requests; the client gathers input and retries the original request with `inputResponses`, echoing back any `requestState`.
- Servers must not use form mode for sensitive information (passwords, API keys, access tokens, payment credentials); use URL mode. Clients show the full URL and gather explicit consent before opening it, and never fetch it automatically.
- Sampling follows the same MRTR flow with `sampling/createMessage`. Tool use during sampling uses a `tools` array and optional `toolChoice`; clients declare support via the `sampling.tools` capability.
- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Roots (use tool parameters, resource URIs or server configuration) and Sampling (integrate with LLM provider APIs directly).
- Roots: servers "SHOULD respect root boundaries" (not MUST enforce); actual security must be enforced at the OS level.
- Replaced in 2026-07-28: server-initiated `roots/list`, `sampling/createMessage`, `elicitation/create` requests by MRTR.

## Related

- [Understanding MCP Servers](./concepts-server.md)
- [Deprecated Features](./deprecated-features.md)
- [Architecture Overview (concepts)](./concepts-architecture.md)
