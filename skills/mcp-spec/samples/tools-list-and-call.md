---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#listtoolsrequest
---

# tools/list and tools/call

Client lists tools, then invokes one with `tools/call`.

`tools/list` request:

```json
{
  "jsonrpc": "2.0",
  "id": "list-tools-example",
  "method": "tools/list",
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

`tools/list` response:

```json
{
  "jsonrpc": "2.0",
  "id": "list-tools-example",
  "result": {
    "resultType": "complete",
    "tools": [
      {
        "name": "get_weather",
        "title": "Weather Information Provider",
        "description": "Get current weather information for a location",
        "inputSchema": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City name or zip code"
            }
          },
          "required": ["location"]
        },
        "icons": [
          {
            "src": "https://example.com/weather-icon.png",
            "mimeType": "image/png",
            "sizes": ["48x48"]
          }
        ]
      }
    ],
    "nextCursor": "next-page-cursor",
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

`tools/call` request:

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

`tools/call` response:

```json
{
  "jsonrpc": "2.0",
  "id": "call-tool-example",
  "result": {
    "resultType": "complete",
    "content": [
      {
        "type": "text",
        "text": "Current weather in New York:\nTemperature: 72°F\nConditions: Partly cloudy"
      }
    ],
    "isError": false
  }
}
```

## Notes

- Examples are reproduced from `schema/2026-07-28/examples/` (tag `2026-07-28`).
- `nextCursor` is the pagination cursor; the list result also carries `ttlMs` / `cacheScope`.
- Each request repeats the version and capability `_meta`; there is no `initialize` handshake in 2026-07-28.
