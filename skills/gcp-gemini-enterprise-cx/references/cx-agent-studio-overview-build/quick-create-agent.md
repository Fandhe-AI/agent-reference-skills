---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/create-agent
---

# Create a Weather Agent Application

Quickstart that builds an agent application with a root agent, a Weather agent and a Farewell agent, a mocked Python weather tool, a variable, an explicit `end_session` instruction and an after-LLM callback.

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

### Variable update tool

`set_variable` (in this tool) and `CallbackContext`, `LlmResponse`, `Part` and `Optional` (in the callback below) are used without being defined or imported: the [Callbacks](./callback.md) page says only that "In your Python callback code, you have access to certain classes and functions that help you write the code", the [Variables](./variable.md) page documents updating a variable with `context.state[...]`, and where `set_variable` comes from is not stated in the official docs, so the examples assume the CX Agent Studio Python runtime provides these names.

```python
from typing import Optional

def update_username(username: str) -> Optional[str]:
  """Updates the current user's name"""
  set_variable("username", username)
```

### Instruction sentence referencing the variable

```text
If provided, the current user is {username},
and you should address them with this name.
You can use {@TOOL: update_username} to update the user's name if they provide
it.
```

### Farewell agent instructions

```text
After providing the goodbye message and confirming the user has no more
questions, execute the tool {@TOOL: end_session}(reason="success").
```

### After-LLM callback appending a static message

```python
SURVEY_MESSAGE = "Click here to take our post call survey."

def after_model_callback(
    callback_context: CallbackContext,
    llm_response: LlmResponse
) -> Optional[LlmResponse]:
  for index, part in enumerate(llm_response.content.parts):
    if part.has_function_call('end_session'):
      return LlmResponse.from_parts(parts=[
        *llm_response.content.parts,
        Part.from_text(SURVEY_MESSAGE)

    ])
  return None
```

## Notes

- The tool has a mocked response; a real weather application would access an external server.
- Instruction reference syntax: `{@AGENT: Agent name}` for agents, `{@TOOL: tool_name}` for tools, `{variable_name}` for variables. The source's Farewell agent instruction is "You are the Farewell Agent. Your ONLY task is to provide a polite goodbye message."
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
