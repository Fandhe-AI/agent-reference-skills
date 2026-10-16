---
source: https://ai.google.dev/gemini-api/docs/generate-content/tool-combination
---

# Combine built-in tools and function calling (generateContent)

Gemini 3 models can combine built-in tools (such as `google_search`) with function calling (custom tools) in a single generation by preserving and exposing the context history of tool calls (tool context circulation).

## Signature / Usage

```python
from google import genai
from google.genai import types

client = genai.Client()

getWeather = {
    "name": "getWeather",
    "description": "Gets the weather for a requested city.",
    "parameters": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "The city and state, e.g. Utqiaġvik, Alaska",
            },
        },
        "required": ["city"],
    },
}

# Turn 1: Initial request with Google Search (built-in) and getWeather (custom) tools enabled
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="What is the northernmost city in the United States? What's the weather like there today?",
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                google_search=types.GoogleSearch(),  # Built-in tool
                function_declarations=[getWeather],  # Custom tool
            ),
        ],
        tool_config=types.ToolConfig(
            include_server_side_tool_invocations=True
        )
    ),
)
```

```javascript
const tools = [
  { googleSearch: {} },
  { functionDeclarations: [getWeather] }
];
// This flag needs to be enabled for built-in tool context circulation and tool combination
const toolConfig = { includeServerSideToolInvocations: true };
```

Example request structure (REST) returning all parts with `id`, `toolType`, `thoughtSignature`:

```json
{
  "model": "models/gemini-3.8-flash",
  "contents": [{
    "parts": [{
      "text": "What is the northernmost city in the United States? What's the weather like there today?"
    }],
    "role": "user"
  }, {
    "parts": [{
      "thoughtSignature": "...",
      "toolCall": {
        "toolType": "GOOGLE_SEARCH_WEB",
        "args": {
          "queries": ["northernmost city in the United States"]
        },
        "id": "a7b3k9p2"
      }
    }, {
      "thoughtSignature": "...",
      "toolResponse": {
        "toolType": "GOOGLE_SEARCH_WEB",
        "response": {
          "search_suggestions": "..."
        },
        "id": "a7b3k9p2"
      }
    }, {
      "functionCall": {
        "name": "getWeather",
        "args": {
          "city": "Utqiaġvik, Alaska"
        },
        "id": "m4q8z1v6"
      },
      "thoughtSignature": "..."
    }],
    "role": "model"
  }, {
    "parts": [{
      "functionResponse": {
        "name": "getWeather",
        "response": {
          "response": "Very cold. 22 degrees Fahrenheit."
        },
        "id": "m4q8z1v6"
      }
    }],
    "role": "user"
  }],
  "tools": [{
    "functionDeclarations": [{
      "name": "getWeather"
    }]
  }, {
    "googleSearch": {
    }
  }, {
    "codeExecution": {
    }
  }],
  "toolConfig": {
    "includeServerSideToolInvocations": true
  }
}
```

## Options / Props

Critical fields in returned parts:

| Field | Description |
| --- | --- |
| `id` | Maps a call to its response; set on all function call responses; found in `toolCall`, `toolResponse`, `functionCall`, `functionResponse`, `executableCode`, `codeExecutionResult` |
| `tool_type` | Identifies the built-in tool (e.g. `URL_CONTEXT`) or function name; in `toolCall` and `toolResponse` |
| `thought_signature` | Encrypted context in each part returned by the API; if not returned for all parts every turn, the model errors |

Tool-specific data:

| Tool | User visible tool call args | User visible tool response |
| --- | --- | --- |
| GOOGLE_SEARCH | `queries` | `search_suggestions` |
| GOOGLE_MAPS | `queries` | `places`, `google_maps_widget_context_token` |
| URL_CONTEXT | `urls` | `url_metadata` (`retrieved_url`, `url_retrieval_status`) |
| FILE_SEARCH | None | None |

Supported tools:

| Tool | Execution side | Context circulation |
| --- | --- | --- |
| Google Search | Server-side | Supported |
| Google Maps | Server-side | Supported |
| URL Context | Server-side | Supported |
| File Search | Server-side | Supported |
| Code Execution | Server-side | Supported (built in, `executableCode` and `codeExecutionResult` parts) |
| Computer Use | Client-side | Supported (built in, `functionCall` and `functionResponse` parts) |
| Custom functions | Client-side | Supported (built in, `functionCall` and `functionResponse` parts) |

## Notes

- API surface: generateContent. Source warning: "Built-in and custom tools combinations are in Preview and supported for Gemini 3 models only."
- You must set `include_server_side_tool_invocations` (`includeServerSideToolInvocations`) to `true`; include `function_declarations` together with the built-in tools to trigger the combination. Without `function_declarations` the circulation still applies to built-in tools as long as the flag is set.
- Return all parts, including all fields, to the model on each turn.
- Pricing: `toolCall` and `toolResponse` parts in requests count toward `prompt_token_count` (requests only); Google Search is an exception and is not double-charged.
- Limitations: defaults to `VALIDATED` mode (`AUTO` not supported) when the flag is enabled; `google_search` relies on location and time, so conflicting information in `system_instruction` or function descriptions may break the combination.
- Distinct from Anthropic tool use (anthropic-api-tools-mcp skill) and OpenAI Agents SDK built-in tools (openai-agents skill).

## Related

- [Function calling (generateContent)](./function-calling.md)
- [Built-in tools (generateContent)](./grounding-tools.md)
