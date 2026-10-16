---
source: https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts
---

# Understanding MCP Servers

Learning-guide explanation of the three server building blocks (tools, resources, prompts), their protocol operations, and who controls each.

## Signature / Usage

Example tool definition:

```typescript
{
  name: "searchFlights",
  description: "Search for available flights",
  inputSchema: {
    type: "object",
    properties: {
      origin: { type: "string", description: "Departure city" },
      destination: { type: "string", description: "Arrival city" },
      date: { type: "string", format: "date", description: "Travel date" }
    },
    required: ["origin", "destination", "date"]
  }
}
```

Resource template example:

```json
{
  "uriTemplate": "weather://forecast/{city}/{date}",
  "name": "weather-forecast",
  "title": "Weather Forecast",
  "description": "Get weather forecast for any city and date",
  "mimeType": "application/json"
}
```

Prompt example:

```json
{
  "name": "plan-vacation",
  "title": "Plan a vacation",
  "description": "Guide through vacation planning process",
  "arguments": [
    { "name": "destination", "type": "string", "required": true },
    { "name": "duration", "type": "number", "description": "days" },
    { "name": "budget", "type": "number", "required": false },
    { "name": "interests", "type": "array", "items": { "type": "string" } }
  ]
}
```

## Options / Props

| Feature | Explanation | Who controls it |
|---------|-------------|-----------------|
| Tools | Functions the LLM can actively call, deciding when to use them based on user requests | Model |
| Resources | Passive, read-only data sources for context (file contents, database schemas, API documentation) | Application |
| Prompts | Pre-built instruction templates that tell the model to work with specific tools and resources | User |

Protocol operations:

| Method | Purpose | Returns |
|--------|---------|---------|
| `tools/list` | Discover available tools | Array of tool definitions with schemas |
| `tools/call` | Execute a specific tool | Tool execution result |
| `resources/list` | List available direct resources | Array of resource descriptors |
| `resources/templates/list` | Discover resource templates | Array of resource template definitions |
| `resources/read` | Retrieve resource contents | Resource data with metadata |
| `subscriptions/listen` | Monitor resource changes | Stream of update notifications |
| `prompts/list` | Discover available prompts | Array of prompt descriptors |
| `prompts/get` | Retrieve prompt details | Full prompt definition with arguments |

## Notes

- Tools are schema-defined interfaces using JSON Schema for validation; they may require user consent, and MCP emphasizes human oversight (tool visibility in UI, approval dialogs, permission settings, activity logs).
- Each resource has a unique URI (e.g. `file:///path/to/document.md`) and declares its MIME type. Two discovery patterns: direct resources (fixed URIs) and resource templates (parameterized URIs). Dynamic resources and prompts support parameter completion.
- To watch resources for changes, send `subscriptions/listen` with the URIs in the `resourceSubscriptions` filter; the server delivers `notifications/resources/updated` on the resulting stream.
- Prompts are user-controlled and require explicit invocation (slash commands, command palettes, buttons, context menus).
- Replaced in 2026-07-28: `resources/subscribe` / `resources/unsubscribe` by `subscriptions/listen`.
- The multi-server travel-planning example in the source (prompt, resources, tools across Travel, Weather, Calendar/Email servers) is illustrative.

## Related

- [Understanding MCP Clients](./concepts-client.md)
- [Architecture Overview (concepts)](./concepts-architecture.md)
