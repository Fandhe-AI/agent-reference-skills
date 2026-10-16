---
source: https://ai.google.dev/gemini-api/docs/generate-content/function-calling
---

# Function calling (generateContent)

Function calling connects models to external tools and APIs: the model decides when to call a function and returns the name, arguments, and a unique `id`; your application executes it and sends the result back.

## Signature / Usage

Step 1: function declaration (JSON subset of OpenAPI schema).

```python
set_light_values_declaration = {
    "name": "set_light_values",
    "description": "Sets the brightness and color temperature of a light.",
    "parameters": {
        "type": "object",
        "properties": {
            "brightness": {
                "type": "integer",
                "description": "Light level from 0 to 100. Zero is off and 100 is full brightness",
            },
            "color_temp": {
                "type": "string",
                "enum": ["daylight", "cool", "warm"],
                "description": "Color temperature of the light fixture, which can be `daylight`, `cool` or `warm`.",
            },
        },
        "required": ["brightness", "color_temp"],
    },
}
```

Step 2: call the model with function declarations.

```python
from google.genai import types

client = genai.Client()
tools = types.Tool(function_declarations=[set_light_values_declaration])
config = types.GenerateContentConfig(tools=[tools])

contents = [
    types.Content(
        role="user", parts=[types.Part(text="Turn the lights down to a romantic level")]
    )
]

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=contents,
    config=config,
)

print(response.candidates[0].content.parts[0].function_call)
```

Step 3 and 4: execute, then return the result with the matching `id`.

```python
tool_call = response.candidates[0].content.parts[0].function_call

if tool_call.name == "set_light_values":
    result = set_light_values(**tool_call.args)
    print(f"Function execution result: {result}")

function_response_part = types.Part.from_function_response(
    name=tool_call.name,
    response={"result": result},
    id=tool_call.id,
)

contents.append(response.candidates[0].content) # Append the content from the model's response.
contents.append(types.Content(role="user", parts=[function_response_part])) # Append the function response

final_response = client.models.generate_content(
    model="gemini-3.8-flash",
    config=config,
    contents=contents,
)

print(final_response.text)
```

Function calling mode:

```python
tool_config = types.ToolConfig(
    function_calling_config=types.FunctionCallingConfig(
        mode="ANY", allowed_function_names=["get_current_temperature"]
    )
)

config = types.GenerateContentConfig(
    tools=[tools],  # not defined here.
    tool_config=tool_config,
)
```

```javascript
import { FunctionCallingConfigMode } from '@google/genai';

const toolConfig = {
  functionCallingConfig: {
    mode: FunctionCallingConfigMode.ANY,
    allowedFunctionNames: ['get_current_temperature']
  }
};
```

Automatic function calling (Python only):

```python
def get_current_temperature(location: str) -> dict:
    """Gets the current temperature for a given location.

    Args:
        location: The city and state, e.g. San Francisco, CA

    Returns:
        A dictionary containing the temperature and unit.
    """
    # ... (implementation) ...
    return {"temperature": 25, "unit": "Celsius"}

client = genai.Client()
config = types.GenerateContentConfig(
    tools=[get_current_temperature]
)  # Pass the function itself

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="What's the temperature in Boston?",
    config=config,
)

print(response.text)  # The SDK handles the function call and returns the final text
```

Disable it with `automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True)`.

MCP tools (SDK built-in, Python / JavaScript):

```javascript
import { GoogleGenAI, FunctionCallingConfigMode , mcpToTool} from '@google/genai';

const response = await ai.models.generateContent({
  model: "gemini-3.8-flash",
  contents: `What is the weather in London in ${new Date().toLocaleDateString()}?`,
  config: {
    tools: [mcpToTool(client)],  // uses the session, will automatically call the tool
  },
});
```

## Options / Props

Function declaration fields:

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | Unique function name; no spaces or special characters (underscores or camelCase) |
| `description` | string | Clear, detailed explanation of purpose; crucial for the model to choose the function |
| `parameters` | object | Input parameters: `type` (e.g. `object`), `properties`, `required` |
| `properties.<p>.type` | string | `string`, `integer`, `boolean`, `array`, ... |
| `properties.<p>.description` | string | Purpose and format of the parameter |
| `properties.<p>.enum` | array | Optional fixed value set |

`function_calling_config.mode`:

| Mode | Behavior |
| --- | --- |
| `VALIDATED` | Default for tool combination (built-in tools or structured outputs also enabled). Constrained to predict function calls or natural language and ensures schema adherence; reduces malformed calls versus `AUTO` |
| `AUTO` | Default when only `function_declarations` are enabled. Model decides between text and a function call |
| `ANY` | Always predicts a function call with schema adherence; `allowed_function_names` restricts the set |
| `NONE` | Prohibited from making function calls; equivalent to sending no declarations |

Supported models (function calling, parallel, compositional all supported): Gemini 4 Argon, 3.8 Flash, 3.6 Flash, 3.5 Flash-Lite, 3.1 Pro Preview, 3.1 Flash-Lite, 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite.

## Notes

- API surface: generateContent. Sections on this page also cover parallel function calling, compositional function calling, multi-tool use (combine built-in tools), multimodal function responses, function calling with structured output (Gemini 3 series), and MCP.
- Always map function IDs: Gemini 3 returns a unique `id` with every `functionCall`; include the exact `id` in the `functionResponse`. For parallel calls, results need not be returned in the same order; the API maps by `id`.
- Thought signatures: the SDKs handle them automatically; if you edit history manually, send `thought_signature` back in its original `Part`, never merge a signed part with an unsigned one or combine two signed parts. Mandatory for function calling in Gemini 3 and later (see the thought-signatures page).
- Python-only: automatic function calling and `FunctionDeclaration.from_callable(client=client, callable=...)`. The SDK sends the entire docstring as the top-level function description. Allowed types: `int | float | bool | str | list | pydantic.BaseModel`; `dict[str: int]` is not well supported.
- Built-in MCP support is experimental in the SDKs: only tools are supported (not resources or prompts), only Python and JavaScript/TypeScript SDKs, and breaking changes might occur. Python passes a `ClientSession` in `tools`; JavaScript wraps the client with `mcpToTool`.
- Best practices from the source: keep the active tool set to a maximum of 10-20; use temperature 0 for deterministic calls; validate consequential calls with the user; check `finishReason`. Gemini 3.1 Pro Preview has a separate endpoint `gemini-3.1-pro-preview-customtools` for a mix of bash and custom tools.
- If a prompt requires structured text before a tool call, the call may fail with `Malformed_Function_Call`; the preferred workaround is an `update()` function call for pre-tool notes.
- Limitations: do not assume `functionCall` is the last part when combined with built-in tools (parts may include `toolCall` / `toolResponse`); only a subset of OpenAPI schema is supported; `ANY` mode may reject very large or deeply nested schemas.
- Distinct from OpenAI function calling in the Responses API (openai-api-core skill), Anthropic tool use (anthropic-api-tools-mcp skill) and Agents SDK tools / MCP (openai-agents skill). The MCP here is the SDK consuming a local MCP server.

## Related

- [Thought signatures (generateContent)](./thought-signatures.md)
- [Combine built-in tools and function calling (generateContent)](./tool-combination.md)
- [Structured outputs (generateContent)](./structured-output.md)
