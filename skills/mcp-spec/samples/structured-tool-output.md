---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/tools
---

# Structured Tool Output

Tool declares an `outputSchema` and returns `structuredContent` alongside serialized text content.

Tool definition:

```json
{
  "name": "get_weather_data",
  "title": "Weather Data Retriever",
  "description": "Get current weather data for a location",
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
  "outputSchema": {
    "type": "object",
    "properties": {
      "temperature": {
        "type": "number",
        "description": "Temperature in celsius"
      },
      "conditions": {
        "type": "string",
        "description": "Weather conditions description"
      },
      "humidity": {
        "type": "number",
        "description": "Humidity percentage"
      }
    },
    "required": ["temperature", "conditions", "humidity"]
  }
}
```

Result:

```json
{
  "resultType": "complete",
  "content": [
    {
      "type": "text",
      "text": "{\"temperature\": 22.5, \"conditions\": \"Partly cloudy\", \"humidity\": 65}"
    }
  ],
  "structuredContent": {
    "temperature": 22.5,
    "conditions": "Partly cloudy",
    "humidity": 65
  }
}
```

## Notes

- Examples are reproduced from `schema/2026-07-28/examples/Tool/` and `CallToolResult/` (tag `2026-07-28`).
- The text `content` block duplicates the structured payload as a JSON string, as in the official example.
