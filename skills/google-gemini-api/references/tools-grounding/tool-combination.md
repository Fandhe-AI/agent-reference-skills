---
source: https://ai.google.dev/gemini-api/docs/tool-combination
---

# Combine built-in tools and function calling

Preview. Gemini can combine built-in tools (such as `google_search`) and function calling (custom tools) in a single interaction by preserving and exposing the context history of tool calls. Supported for Gemini 4 and Gemini 3 models.

## Signature / Usage

```python
# This will only work for SDK newer than 2.0.0
from google import genai

client = genai.Client()

getWeather = {
    "type": "function",
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

# The Interactions API manages context automatically across tool calls.
# The model will first use Google Search, then call getWeather.
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="What is the northernmost city in the United States? What's the weather like there today?",
    tools=[
        {"type": "google_search"},
        getWeather,
    ],
)

# Process steps: the interaction contains search results and a function call
for step in interaction.steps:
    if step.type == "function_call":
        print(f"Function call: {step.name} with args: {step.arguments}")
        # In a real application, you would execute the function here
        # and provide the result back to the model.
```

```javascript
// This will only work for SDK newer than 2.0.0
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({});

const getWeather = {
    type: "function",
    name: "getWeather",
    description: "Get the weather in a given location",
    parameters: {
        type: "object",
        properties: {
            location: {
                type: "string",
                description: "The city and state, e.g. San Francisco, CA"
            }
        },
        required: ["location"]
    }
};

const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: "What is the northernmost city in the United States? What's the weather like there today?",
    tools: [
        { type: "google_search" },
        getWeather,
    ],
});
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
  "model": "gemini-3.8-flash",
  "input": "What is the northernmost city in the United States? What'\''s the weather like there today?",
  "tools": [
    { "type": "google_search" },
    {
      "type": "function",
      "name": "getWeather",
      "description": "Get the weather in a given location",
      "parameters": {
          "type": "object",
          "properties": {
              "location": {
                  "type": "string",
                  "description": "The city and state, e.g. San Francisco, CA"
              }
          },
          "required": ["location"]
      }
    }
  ]
}'
```

## Options / Props

Critical fields in returned steps:

| Name | Type | Description |
|------|------|-------------|
| `id` | field | Found on `function_call` steps. A unique identifier that maps a call to its result: in the Interactions API, set the `function_result` step's `call_id` to the originating `function_call.id` |
| `signature` | field | Found on `thought` steps, as well as all tool call and result steps for Gemini 3+ models. Encrypted context enabling tool context circulation across interactions |

Tool-specific data:

| Tool | User visible tool call args (if any) | User visible tool response (if any) |
|---|---|---|
| google_search | `queries` | `search_suggestions` |
| google_maps | `queries` | `places` `google_maps_widget_context_token` |
| url_context | `urls` URLs to be browsed | `status`: Browse status `retrieved_url`: URLs browsed |
| file_search | None | None |

Supported tools:

| Tool | Execution side | Context Circulation Support |
|---|---|---|
| Google Search | Server-side | Supported |
| Google Maps | Server-side | Supported |
| URL Context | Server-side | Supported |
| File Search | Server-side | Supported |
| Code Execution | Server-side | Supported (built in, uses `code_execution` and `code_execution_result` steps) |
| Computer Use | Client-side | Supported (built in, uses `function_call` and `function_response` steps) |
| Custom functions | Client-side | Supported (built in, uses `function_call` and `function_response` steps) |

## Notes

- Enable combination by including your custom `function` tools (`{"type": "function", ...}` entries in `tools`) together with the built-in tools you want to use. The source wording says `function_declarations`, which is generateContent terminology.
- In the Interactions API the step types are `function_result` (not `function_response`) and `code_execution_call` / `code_execution_result`; the tables above keep the source wording (`function_response`, `code_execution`). Usage is reported in `usage.total_input_tokens` / `total_tool_use_tokens`; the source's `prompt_token_count` below is generateContent terminology.
- Source difference: the source says `id` is found on both `function_call` and `function_response` steps (generateContent wording); in the Interactions API the result step is `function_result` and it references the call through `call_id` (= `function_call.id`), as in function-calling and computer-use.
- Gemini 3 models use tool context circulation to preserve built-in tool context and share it with custom tools in the same interaction. The API returns separate steps for built-in tool calls (managed automatically) and `function_call` steps for your custom functions.
- Stateful mode (recommended): with `previous_interaction_id`, the server handles `id` and `signature` automatically. Stateless mode: pass both the `function_call` step's `id` and `signature` back in subsequent requests; official SDKs do this if you pass the full response object back to history.
- Tokens: built-in tool call parts in requests count towards `prompt_token_count` (requests only, not responses). Google Search is an exception: it has query-level pricing, so tokens are not double-charged.
- Limitations: default to `validated` mode (`auto` mode is not supported) when tool context circulation is enabled. Built-in tools such as `google_search` rely on location and current time, so conflicting location/time information in `system_instruction` or `function_declaration.description` may break combination.
- API surface: Interactions API; a generateContent version of this page exists under `generate-content/` (tool-combination). Docs fetched 2026-10-16.

## Related

- [tools-overview](./tools-overview.md)
- [function-calling](./function-calling.md)
- [google-search](./google-search.md)
- [maps-grounding](./maps-grounding.md)
- [url-context](./url-context.md)
- [file-search](./file-search.md)
