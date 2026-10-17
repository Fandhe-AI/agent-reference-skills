---
source: https://ai.google.dev/gemini-api/docs/live-api/tools
---

# Tool use with Live API

Define function declarations and Google Search in the Live API session configuration, handle tool calls manually, and optionally run functions asynchronously.

## Signature / Usage

Function calling (Python):

```python
import asyncio
import wave
from google import genai
from google.genai import types

client = genai.Client()

model = "gemini-3.8-live"

# Simple function definitions
turn_on_the_lights = {"name": "turn_on_the_lights"}
turn_off_the_lights = {"name": "turn_off_the_lights"}

tools = [{"function_declarations": [turn_on_the_lights, turn_off_the_lights]}]
config = {"response_modalities": ["AUDIO"], "tools": tools}

async def main():
    async with client.aio.live.connect(model=model, config=config) as session:
        prompt = "Turn on the lights please"
        await session.send_client_content(turns={"parts": [{"text": prompt}]})

        wf = wave.open("audio.wav", "wb")
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)  # Output is 24kHz

        async for response in session.receive():
            if response.data is not None:
                wf.writeframes(response.data)
            elif response.tool_call:
                print("The tool was called")
                function_responses = []
                for fc in response.tool_call.function_calls:
                    function_response = types.FunctionResponse(
                        id=fc.id,
                        name=fc.name,
                        response={ "result": "ok" } # simple, hard-coded function response
                    )
                    function_responses.append(function_response)

                await session.send_tool_response(function_responses=function_responses)

        wf.close()

if __name__ == "__main__":
    asyncio.run(main())
```

JavaScript (declarations and tool response):

```javascript
// Simple function definitions
const turn_on_the_lights = { name: "turn_on_the_lights" } // , description: '...', parameters: { ... }
const turn_off_the_lights = { name: "turn_off_the_lights" }

const tools = [{ functionDeclarations: [turn_on_the_lights, turn_off_the_lights] }]

const config = {
  responseModalities: [Modality.AUDIO],
  tools: tools
}

// after receiving turn.toolCall:
functionResponses.push({
  id: fc.id,
  name: fc.name,
  response: { result: "ok" } // simple, hard-coded function response
});
session.sendToolResponse({ functionResponses: functionResponses });
```

Asynchronous function calling (`behavior` on the declaration, `scheduling` on the response):

```python
# Non-blocking function definitions
turn_on_the_lights = {"name": "turn_on_the_lights", "behavior": "NON_BLOCKING"} # turn_on_the_lights will run asynchronously
turn_off_the_lights = {"name": "turn_off_the_lights"} # turn_off_the_lights will still pause all interactions with the model

# for a non-blocking function definition, apply scheduling in the function response:
function_response = types.FunctionResponse(
    id=fc.id,
    name=fc.name,
    response={"result": "ok"},
    scheduling="INTERRUPT" # Can also be WHEN_IDLE or SILENT
)
```

```javascript
import { GoogleGenAI, Modality, Behavior, FunctionResponseScheduling } from '@google/genai';

// Non-blocking function definitions
const turn_on_the_lights = {name: "turn_on_the_lights", behavior: Behavior.NON_BLOCKING}

// for a non-blocking function definition, apply scheduling in the function response:
const functionResponse = {
  id: fc.id,
  name: fc.name,
  response: { result: "ok" },
  scheduling: FunctionResponseScheduling.INTERRUPT  // Can also be WHEN_IDLE or SILENT
}
```

Grounding with Google Search and combining tools:

```python
tools = [{'google_search': {}}]
config = {"response_modalities": ["AUDIO"], "tools": tools}

tools = [
    {"google_search": {}},
    {"function_declarations": [turn_on_the_lights, turn_off_the_lights]},
]

config = {"response_modalities": ["AUDIO"], "tools": tools}
```

```javascript
const tools = [{ googleSearch: {} }]

const tools = [
  { googleSearch: {} },
  { functionDeclarations: [turn_on_the_lights, turn_off_the_lights] }
]
```

## Options / Props

Supported tools (verbatim table):

| Tool | Gemini 3.1 Flash Live Preview | Gemini 2.5 Flash Live Preview |
|---|---|---|
| Search | Supported | Supported |
| Function calling | Supported (synchronous only) | Supported (synchronous and asynchronous) |
| Google Maps | Not supported | Not supported |
| Code execution | Not supported | Not supported |
| URL context | Not supported | Not supported |

Scheduling values for a `NON_BLOCKING` function response:

| Value | Behavior |
|-------|----------|
| `INTERRUPT` | Interrupt what it's doing and tell you about the response right away |
| `WHEN_IDLE` | Wait until it's finished with what it's currently doing |
| `SILENT` | Do nothing and use that knowledge later on in the discussion |

## Notes

- Dedented the `FunctionResponse` snippet (the source indents it inside an omitted loop over `fc`).
- Unlike the `generateContent` API, the Live API doesn't support automatic tool response handling; you must handle tool responses manually in client code (`session.send_tool_response` / `sendToolResponse`).
- Function calling executes sequentially by default (pauses until each result is available). Asynchronous function calling is not yet supported in Gemini 3.1 Flash Live; the model won't start responding until you've sent the tool response.
- The official guide nests `scheduling` inside `response`; per the FunctionResponse API reference it is a top-level field, so the examples place it next to `id` / `name` / `response`.
- From a single prompt, the model can generate multiple function calls and the code necessary to chain their outputs; this code executes in a sandbox, generating subsequent `BidiGenerateContentToolCall` messages.
- The model may generate and execute Python code to use Search (`executable_code` / `code_execution_result` parts).
- The source's tool table lists Gemini 3.1 Flash Live Preview and Gemini 2.5 Flash Live Preview, while the examples use `gemini-3.8-live`; the capabilities page documents async function calling and scheduling (`SILENT`, `WHEN_IDLE`, `INTERRUPT`; the capabilities page spells the last one `INTERRUPTED`, which is not a valid enum value) for Gemini 3.8 Live.
- Availability: Live API is v1beta only. Tool concepts here relate to the anthropic-api-tools-mcp and openai-agents skills (built-in tools / MCP), which are different APIs.

## Related

- [Live API capabilities guide](./capabilities.md)
- [Get started with Live API (GenAI SDK)](./get-started-sdk.md)
- [Session management with Live API](./session-management.md)
