---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/create-agent
---

# Create a Weather Agent Application

Quickstart that builds an agent application with a root agent, a Weather agent and a Farewell agent, a mocked Python weather tool, an explicit `end_session` instruction and an after-LLM callback.

## Signature / Usage

### Weather tool (Python code tool)

```python
def get_weather(city: str) -> dict:
  """Retrieves the current weather report for a specified city.

  Args:
    city (str): The name of the city.

  Returns:
    dict: A dictionary containing the weather information.
          Includes a 'status' key ('success' or 'error').
          If 'success', includes a 'report' key with weather details.
          If 'error', includes an 'error_message' key.
  """
  city_normalized = city.lower().replace(" ", "")

  mock_weather_db = {
    "newyork": {"status": "success",
      "report": "The weather in New York is sunny and 25°C."},
    "london": {"status": "success",
      "report": "It's cloudy in London and  15°C."},
    "tokyo": {"status": "success",
      "report": "Tokyo is experiencing light rain and 18°C."},
  }
  if city_normalized in mock_weather_db:
    return mock_weather_db[city_normalized]
  else:
    return {"status": "error",
      "error_message": f"No weather information for '{city}'."}
```

### Root agent instructions

```text
You are a helpful weather application.
Your job is to greet the user and delegate to other sub-agents as needed.
When greeting the user, describe how you can help them.
When the user asks for the weather, delegate to {@AGENT: Weather agent}.
When the user is ending the conversation,
delegate to {@AGENT: Farewell agent}.
Handle only weather requests, greetings, and farewells.
```

### Weather agent instructions

```text
You are a helpful weather agent.
When the user asks for the weather in a specific city,
use {@TOOL: get_weather} to find the information.
If the tool returns an error, inform the user politely.
If the tool is successful, present the weather report clearly.
```

### Farewell agent instructions

```text
After providing the goodbye message and confirming the user has no more
questions, execute the tool {@TOOL: end_session}(reason="success").
```

### After-LLM callback appending a static message

`CallbackContext`, `LlmResponse`, `Part` and `Optional` are used without being defined or imported: the [Callbacks](./callback.md) page says only that "In your Python callback code, you have access to certain classes and functions that help you write the code", so the callback example assumes the CX Agent Studio Python runtime provides these names.

Adapted (not in the official docs): the callback returns `None` (keeps the model response) when `llm_response.content` is missing or has no parts, instead of iterating `llm_response.content.parts` unconditionally.

```python
SURVEY_MESSAGE = "Click here to take our post call survey."

def after_model_callback(
    callback_context: CallbackContext,
    llm_response: LlmResponse
) -> Optional[LlmResponse]:
  if llm_response.content is None or not llm_response.content.parts:
    return None
  for index, part in enumerate(llm_response.content.parts):
    if part.has_function_call('end_session'):
      return LlmResponse.from_parts(parts=[
        *llm_response.content.parts,
        Part.from_text(SURVEY_MESSAGE)

    ])
  return None
```

## Notes

- Adapted from the official docs: the source's "Use variables" step creates a `username` variable, adds an `update_username` Python tool that stores the name the user types in the session state, and references it as `{username}` in the root agent's instructions. It was left out because user-typed text then reaches the model (for a `{variable_name}` dynamic variable, "its value is appended to the conversation history as `<state_update>variable_name: value</state_update>`", Modular components page). To show the user's name, insert it in your app's own UI at display time; on channels you cannot control, greet without the name.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/modular-components (dynamic variable behavior; retrieved 2026-11-21)
- Adapted from the official docs: the callback iterates `enumerate(llm_response.content.parts)` without checking that `content` and `parts` are set. In ADK, `LlmResponse.content` is `types.Content | None` (`google-adk` 2.15.0 `llm_response.py`) and `Content.parts` is optional (`google-genai` 3.6.1 `types.py`); this is an analogy not confirmed for the CX Agent Studio runtime, so the guard is defensive. The page returns `None` first, which keeps the model response as the `after_model_callback` sample on the callbacks page describes.
- The tool has a mocked response; a real weather application would access an external server.
- Instruction reference syntax: `{@AGENT: Agent name}` for agents, `{@TOOL: tool_name}` for tools, `{variable_name}` for variables (not used on this page; see [variable.md](./variable.md)). The source's Farewell agent instruction is "You are the Farewell Agent. Your ONLY task is to provide a polite goodbye message."
- Agent roles: the root agent greets and delegates; the Weather agent answers weather questions; the Farewell agent completes the conversation. Descriptions used: "Handles simple greetings and delegates to other agents", "Handles any weather related questions from the user", "Handles user farewells and goodbyes".
- If this is the first agent application for the project, creation may take 1-2 minutes.
- By default each agent uses the `end_session` system tool; the quickstart removes it from the root and weather agents so only the farewell agent ends the session.
- Test in the simulator (Preview agent bar); the **Structure** button in the instructions panel reformats instructions into XML. Deployment options are described on the deploy pages.
- The source also shows Console click-paths (create the application, agents, tools, variables, callbacks).
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/create-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [quick-setup.md](./quick-setup.md)
- [agent.md](./agent.md)
- [instruction.md](./instruction.md)
- [variable.md](./variable.md)
- [callback.md](./callback.md)
