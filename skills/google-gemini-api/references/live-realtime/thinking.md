---
source: https://ai.google.dev/gemini-api/docs/live-api/thinking
---

# Thinking in the Live API

Thinking in the Live API (`gemini-3.8-live-extended-thinking`) adds background reasoning to real-time voice sessions: the model plans and calls asynchronous tools in the background while speaking conversational fillers.

## Signature / Usage

Configure thinking and a non-blocking function (Python):

```python
import asyncio
from google import genai
from google.genai import types

client = genai.Client()
model = "gemini-3.8-live-extended-thinking"

# Define non-blocking function declaration
search_flights = types.FunctionDeclaration(
    name="search_flights",
    description="Searches for available flights to a destination.",
    behavior="NON_BLOCKING",
    parameters={
        "type": "OBJECT",
        "properties": {
            "destination": {"type": "STRING"}
        },
        "required": ["destination"]
    }
)

config = types.LiveConnectConfig(
    response_modalities=["AUDIO"],
    thinking_config=types.ThinkingConfig(
        thinking_level="low"
    ),
    tools=[types.Tool(function_declarations=[search_flights])]
)

async def main():
    async with client.aio.live.connect(model=model, config=config) as session:
        print("Session connected with Thinking")

        idle = False
        while not idle:
            async for message in session.receive():
                # Inspect interaction status for server lifecycle tracking
                status = getattr(message, "interaction_status", None)
                if status:
                    print(f"Interaction status: {status}")

                # Handle asynchronous tool call
                if message.tool_call:
                    for call in message.tool_call.function_calls:
                        print(f"Executing tool: {call.name}")
                        # Simulate function execution
                        response = types.FunctionResponse(
                            id=call.id,
                            name=call.name,
                            response={"result": "Flight DL 145 ($145)"}
                        )
                        await session.send_tool_response(
                            function_responses=[response]
                        )

                # Status is IDLE when reasoning and all turns are complete
                if status == "IDLE":
                    print("Session is idle and ready for user input.")
                    idle = True
```

JavaScript (status tracking and config):

```javascript
const config = {
  responseModalities: [Modality.AUDIO],
  thinkingConfig: {
    thinkingLevel: 'low',
  },
  tools: [{ functionDeclarations: [searchFlights] }],
};

if (message.interactionStatus === 'IDLE') {
  // Ready for user input
  setUiState('listening');
} else if (message.interactionStatus === 'IN_PROGRESS') {
  // Reasoning or executing tools
  setUiState('thinking');
}
```

Setup message for Gemini 3.8 Live Extended Thinking (WebSocket):

```json
{
  "setup": {
    "model": "models/gemini-3.8-live-extended-thinking",
    "generationConfig": {
      "responseModalities": ["AUDIO"],
      "speechConfig": {
        "voiceConfig": {
          "prebuiltVoiceConfig": {
            "voiceName": "Puck"
          }
        }
      },
      "thinkingConfig": {
        "thinkingLevel": "LOW"
      }
    },
    "tools": [{
      "functionDeclarations": [{
        "name": "searchFlights",
        "description": "Searches for flights between cities.",
        "behavior": "NON_BLOCKING",
        "parameters": {
          "type": "OBJECT",
          "properties": {
            "destination": { "type": "STRING" }
          },
          "required": ["destination"]
        }
      }]
    }]
  }
}
```

Upgrading from Gemini 3.1 Flash Live to `gemini-3.8-live` (omit `thinking_level` / `thinking_config`):

```json
{
  "setup": {
    "model": "models/gemini-3.8-live"
  }
}
```

## Options / Props

| Feature | Gemini 3.8 Live | Gemini 3.8 Live Extended Thinking |
|---|---|---|
| Primary use cases | Low-latency voice agents, direct commands, fast tools | Multi-step problem solving, complex planning, multi-tool workflows |
| Model endpoint | `gemini-3.8-live` | `gemini-3.8-live-extended-thinking` |
| Reasoning architecture | Interleaved reasoning with fixed latency profile (`thinking_level` not supported) | Configurable background reasoning (`thinking_level`: `low`, `medium`, `high`; `MINIMAL` not supported) |
| Turn boundaries | `turnComplete: true` closes the turn and returns to idle | `turnComplete: true` finishes an utterance; `interaction_status` controls session lifecycle |
| Conversational fillers | Model waits for tool execution before speaking | Model streams intermediate conversational fillers while processing |
| Tool execution | Supports synchronous (`BLOCKING`) and asynchronous (`NON_BLOCKING`) tools | Requires asynchronous (`NON_BLOCKING`) tool declarations |

## Notes

- Server emits `interaction_status: "IN_PROGRESS"` during background processing and `"IDLE"` when the overall task completes. In Thinking sessions track `interaction_status` instead of `turnComplete`; only return to idle when it is `IDLE`.
- The source uses a single `async for` over `session.receive()`, which the Python SDK ends at the first `turn_complete` (fillers also carry `turn_complete=true` with `IN_PROGRESS`); the example wraps it in an outer loop until `interaction_status` is `IDLE`.
- Synchronous blocking tools return an error with the Thinking model; set `"behavior": "NON_BLOCKING"` on all function declarations.
- Extended Thinking response flow: spoken filler (`turnComplete: true`, `interactionStatus: "IN_PROGRESS"`), asynchronous tool call (still `IN_PROGRESS`), client tool response, final response (`turnComplete: true`, `interactionStatus: "IDLE"`).
- Upgrading from `gemini-3.1-flash-live-preview` to `gemini-3.8-live`: update the model string and omit `thinking_level` / `thinking_config`; turn lifecycle and `turnComplete` signals remain identical.
- Use `gemini-3.8-live` for conversational assistants, fast tool execution, and simple client logic; use `gemini-3.8-live-extended-thinking` for multi-step diagnostics, coordinated data retrieval, STEM and code tutoring, and masking tool latency.
- The source's protocol comparison section shows the WebSocket URL `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=$API_KEY` (`v1alpha`), whereas the WebSocket get-started guide uses `v1beta`; both are transcribed as in the sources.
- Availability: Live API is v1beta only (per this skill's api-versions page). Distinct from thinking in the generateContent / Interactions API (see interactions-core/thinking).

## Related

- [Live API capabilities guide](./capabilities.md)
- [Tool use with Live API](./tool-use.md)
- [Session management with Live API](./session-management.md)
