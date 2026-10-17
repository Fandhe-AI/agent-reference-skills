---
source: https://ai.google.dev/gemini-api/docs/function-calling
---

# Function calling (incl. Remote MCP)

Function calling lets the model decide when to call your functions and supply the arguments; your application executes the function and sends the result back. Use cases: take actions, augment knowledge, extend capabilities. The same page documents Remote MCP (`mcp_server` tool) in the Interactions API.

## Signature / Usage

Four steps: define a function declaration, call the model with declarations, execute the function (your responsibility), send the result back.

```python
set_light_values_declaration = {
    "type": "function",
    "name": "set_light_values",
    "description": "Sets the brightness and color temperature of a light.",
    "parameters": {
        "type": "object",
        "properties": {
            "brightness": {
                "type": "integer",
                "description": "Light level from 0 to 100",
            },
            "color_temp": {
                "type": "string",
                "enum": ["daylight", "cool", "warm"],
                "description": "Color temperature",
            },
        },
        "required": ["brightness", "color_temp"],
    },
}

def set_light_values(brightness: int, color_temp: str) -> dict:
    """Set the brightness and color temperature of a room light."""
    return {"brightness": brightness, "colorTemperature": color_temp}

from google import genai
import json

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Turn the lights down to a romantic level",
    tools=[set_light_values_declaration],
)

fc_step = next(s for s in interaction.steps if s.type == "function_call")
if fc_step.name == "set_light_values":
    result = set_light_values(**fc_step.arguments)
```

Send the result back (Step 4):

```python
final_interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {
            "type": "function_result",
            "name": fc_step.name,
            "call_id": fc_step.id,
            "result": [{"type": "text", "text": json.dumps(result)}],
        }
    ],
    tools=[set_light_values_declaration],
    previous_interaction_id=interaction.id,
)

print(final_interaction.output_text)
```

```javascript
const setLightValuesTool = {
  type: 'function',
  name: 'set_light_values',
  description: 'Sets the brightness and color temperature of a light.',
  parameters: {
    type: 'object',
    properties: {
      brightness: { type: 'number', description: 'Light level from 0 to 100' },
      color_temp: { type: 'string', enum: ['daylight', 'cool', 'warm'] },
    },
    required: ['brightness', 'color_temp'],
  },
};

function setLightValues(brightness, color_temp) {
  return { brightness: brightness, colorTemperature: color_temp };
}

const interaction = await client.interactions.create({
  model: 'gemini-3.8-flash',
  input: 'Turn the lights down to a romantic level',
  tools: [setLightValuesTool],
});

const fcStep = interaction.steps.find(s => s.type === 'function_call');

let result;
if (fcStep.name === 'set_light_values') {
  result = setLightValues(fcStep.arguments.brightness, fcStep.arguments.color_temp);
  console.log(`Function execution result: ${JSON.stringify(result)}`);
}

const finalInteraction = await client.interactions.create({
  model: 'gemini-3.8-flash',
  input: [{
    type: 'function_result',
    name: fcStep.name,
    call_id: fcStep.id,
    result: [{ type: 'text', text: JSON.stringify(result) }]
  }],
  tools: [setLightValuesTool],
  previous_interaction_id: interaction.id,
});

console.log(finalInteraction.output_text);
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "previous_interaction_id": "INTERACTION_ID",
    "input": [
      {
        "type": "function_result",
        "name": "get_image",
        "call_id": "call_123",
        "result": [
          {"type": "text", "text": "instrument.jpg"},
          {
            "type": "image",
            "mime_type": "image/jpeg",
            "data": "BASE64_IMAGE_DATA"
          }
        ]
      }
    ]
  }'
```

Stateless mode (`store=False`, client keeps history):

```python
history = [
    {
        "type": "user_input",
        "content": [{"type": "text", "text": "Turn the lights down to a romantic level"}]
    }
]

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    store=False,
    input=history,
    tools=[set_light_values_declaration],
)

for step in interaction.steps:
    history.append(step.model_dump())

fc_step = next(s for s in interaction.steps if s.type == "function_call")
if fc_step.name == "set_light_values":
    result = set_light_values(**fc_step.arguments)

history.append({
    "type": "function_result",
    "name": fc_step.name,
    "call_id": fc_step.id,
    "result": [{"type": "text", "text": json.dumps(result)}],
})

final_interaction = client.interactions.create(
    model="gemini-3.8-flash",
    store=False,
    input=history,
    tools=[set_light_values_declaration],
)
```

Parallel calls and function calling modes:

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Turn this place into a party!",
    tools=[power_disco_ball, start_music, dim_lights],
    generation_config={"tool_choice": "any"},
)
```

```python
generation_config = {
    "tool_choice": {
        "allowed_tools": {
            "mode": "any",
            "tools": ["get_current_temperature"]
        }
    }
}
```

Combine built-in tools with function calling (Gemini 3 models; pass `previous_interaction_id` to circulate built-in tool context):

```python
get_weather = {
    "type": "function",
    "name": "get_weather",
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

tools = [
    {"type": "google_search"},
    get_weather
]

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="What is the northernmost city in the United States? What's the weather like there today?",
    tools=tools
)
```

Remote MCP:

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Check the weather in San Francisco.",
    tools=[
        {
            "type": "mcp_server",
            "name": "weather",
            "url": "https://gemini-api-demos.uc.r.appspot.com/mcp",
        }
    ]
)
```

```javascript
const interaction = await client.interactions.create({
    model: 'gemini-3.8-flash',
    input: 'Check the weather in San Francisco.',
    tools: [
        {
            type: 'mcp_server',
            name: 'weather',
            url: 'https://gemini-api-demos.uc.r.appspot.com/mcp'
        }
    ]
});
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "model": "gemini-3.8-flash",
    "input": "Check the weather in San Francisco.",
    "tools": [
        {
            "type": "mcp_server",
            "name": "weather",
            "url": "https://gemini-api-demos.uc.r.appspot.com/mcp"
        }
    ]
}'
```

Streaming tool calls (REST):

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "model": "gemini-3.8-flash",
    "input": "What is the weather in Paris?",
    "tools": [{
        "type": "function",
        "name": "get_weather",
        "description": "Gets the weather for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "The city and state"}
            },
            "required": ["location"]
        }
    }],
    "stream": true
}'
```

## Options / Props

Function declaration (passed as a tool):

| Name | Type | Description |
|------|------|-------------|
| `type` | string | Must be `"function"` for custom functions |
| `name` | string | Unique function name (use underscores or camelCase) |
| `description` | string | Clear explanation of the function's purpose |
| `parameters` | object | Input parameters the function expects (`type`, `properties`, `required`) |

Function calling modes (`tool_choice` in `generation_config`):

| Mode | Description |
|------|-------------|
| `auto` (Default) | Model decides whether to call a function or respond directly |
| `any` | Model is constrained to always predict a function call |
| `none` | Model is prohibited from making function calls |
| `validated` | Model ensures function schema adherence |

Remote MCP tool fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | Must be `"mcp_server"`. |
| `name` | `string` | No | A display name for the MCP server. |
| `url` | `string` | No | The full URL for the MCP server endpoint. |
| `headers` | `object` | No | Key-value pairs sent as HTTP headers with every request to the server (for example, authentication tokens). |
| `allowed_tools` | `array` | No | Restrict which tools from the server the agent may call. |

## Notes

- `import json` was added to the first Python block; the source imports it in a later section. The JS declaration and execution snippets are copied from the source's earlier steps.
- When built-in tools are combined with function calling (tool context circulation), the mode defaults to `validated` and `auto` is not supported (see tool-combination). The modes table below keeps the source text verbatim.
- The model does not execute the function; extract the name and args and execute in your application. The process can repeat over turns; the model supports parallel function calling (multiple independent functions in one turn) and compositional function calling (in sequence).
- Stateless mode: set `store=false` and pass the full history in `input` each request: the initial `user_input` step, all model-generated steps from Turn 1 (including `thought` and `function_call` steps) exactly as received, and the `function_result` step.
- Thinking models: Gemini 3 series models use an internal thinking process; the SDKs automatically handle thought signatures.
- Multimodal function responses (Gemini 3 series): include content blocks in the `result` field of the `function_result` step; each block must specify its `type` (e.g. `"text"`, `"image"`).
- Function calling with structured output: Gemini 3 series models can combine function calling with structured output.
- Remote MCP constraints: only Streamable HTTP servers work; SSE servers are not supported. MCP server names should not include the `-` character; use `snake_case`.
- Streaming: function calls arrive as a sequence of `step.delta` events; tool arguments can stream as partial `arguments`. Aggregate the deltas to rebuild complete tool calls before executing them.
- Best practices from the source: clear descriptions; descriptive names without spaces or special characters; strong typing (integer, string, enum); keep the active set to 10-20 tools maximum; validate calls before executing; robust error handling; appropriate authentication for external APIs.
- If the prompt requires structured pre-tool text (XML, YAML, JSON) right before a tool call, the call may occasionally fail with `Malformed_Function_Call`. Preferred workaround: have the model put notes in a dedicated `update()` function call; alternatives: use Markdown headers instead of structured text, or do not require text before tool calls.
- Limitations: only a subset of the OpenAPI schema is supported; for `any` mode the API may reject very large or deeply nested schemas; supported parameter types in Python are limited.
- Migration (May 2026 breaking changes): the request structure is unchanged, but the response replaces the flat `outputs` content with structured `steps`; find `function_call` steps in the `steps` array (legacy code read `interaction.outputs` with `output.type == "function_call"`). Server-side tools now yield tool-specific steps (e.g. `google_search_call`, `google_search_result`).
- Remote MCP here is the consuming side (Gemini API connects to your MCP server); distinct from `anthropic-api-tools-mcp` (Claude API tool use / MCP connector) and `openai-agents` (OpenAI built-in tools / MCP).
- API version (api-versions table): function calling is available in v1 and v1beta; the MCP Servers Tool is v1beta only.
- API surface: Interactions API (`client.interactions.create`, v1beta in the examples); the generateContent version is under `generate-content/`. Docs fetched 2026-10-16.

## Related

- [tools-overview](./tools-overview.md)
- [tool-combination](./tool-combination.md)
- [computer-use](./computer-use.md)
