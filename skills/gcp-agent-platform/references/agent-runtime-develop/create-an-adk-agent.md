---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent
---

# Develop an ADK agent for Agent Runtime

Use the `AdkApp` class of the Agent Platform SDK for Python to create ADK agents that return exchange rates and manage stateful interactions: define the model, add tools, and manage sessions and memories. `AdkApp` uses in-memory sessions and memory when running locally and cloud-based managed sessions and Agent Platform Memory Bank after deployment to Agent Runtime.

## Signature / Usage

### Define the model and optional settings

Adapted (not in the official docs): the model ID `gemini-2.0-flash` is replaced with `gemini-3.5-flash` (the model the Agent Runtime ADK quickstart uses), because the Agent Platform model versions page lists `gemini-2.0-flash` under "Retired models" with retirement date June 1, 2026.

```python
model = "gemini-3.5-flash"
```

Adapted (not in the official docs): the threshold `types.HarmBlockThreshold.OFF` is replaced with `types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE`, so the example keeps the dangerous-content filter on for the agent it configures; `BLOCK_MEDIUM_AND_ABOVE` is a member of `HarmBlockThreshold` in google-genai 3.6.1.

```python
from google.genai import types

safety_settings = [
    types.SafetySetting(
        category=types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold=types.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    ),
]
```

```python
from google.genai import types

generate_content_config = types.GenerateContentConfig(
   safety_settings=safety_settings,
   temperature=0.28,
   max_output_tokens=1000,
   top_p=0.95,
)
```

### Create the app and test locally

```python
from google.adk.agents import Agent
from vertexai.agent_engines import AdkApp

agent = Agent(
   model=model,                                      # Required.
   name='currency_exchange_agent',                   # Required.
   generate_content_config=generate_content_config,  # Optional.
)
app = AdkApp(agent=agent)
```

```python
async for event in app.async_stream_query(
   user_id="USER_ID",  # Required
   message="What is the exchange rate from US dollars to Swedish currency?",
):
   print(event)
```

### Define and use a tool

Adapted (not in the official docs): added `timeout=10` to `requests.get` and `response.raise_for_status()` before `response.json()`, so a hung or failing exchange-rate service fails the tool call instead of blocking it or passing an error body to the model as rate data. Also, `currency_date` is checked to be `latest` or a `YYYY-MM-DD` date (`datetime.datetime.strptime(currency_date, "%Y-%m-%d")` raises `ValueError` otherwise) and the parsed date, normalized with `.date().isoformat()` (for example `2023-1-5` becomes `2023-01-05`), is what goes in the URL path, so a model-supplied value cannot point the request at another path or query and the request always uses the `YYYY-MM-DD` form.
```python
def get_exchange_rate(
    currency_from: str = "USD",
    currency_to: str = "EUR",
    currency_date: str = "latest",
):
    """Retrieves the exchange rate between two currencies on a specified date.

    Uses the Frankfurter API (https://api.frankfurter.app/) to obtain
    exchange rate data.

    Args:
        currency_from: The base currency (3-letter currency code).
            Defaults to "USD" (US Dollar).
        currency_to: The target currency (3-letter currency code).
            Defaults to "EUR" (Euro).
        currency_date: The date for which to retrieve the exchange rate.
            Defaults to "latest" for the most recent exchange rate data.
            Can be specified in YYYY-MM-DD format for historical rates.

    Returns:
        dict: A dictionary containing the exchange rate information.
            Example: {"amount": 1.0, "base": "USD", "date": "2023-11-24",
                "rates": {"EUR": 0.95534}}
    """
    import datetime
    import requests

    if currency_date != "latest":
        currency_date = datetime.datetime.strptime(
            currency_date, "%Y-%m-%d"
        ).date().isoformat()
    response = requests.get(
        f"https://api.frankfurter.app/{currency_date}",
        params={"from": currency_from, "to": currency_to},
        timeout=10,
    )
    response.raise_for_status()
    return response.json()
```

Adapted (not in the official docs): added `generate_content_config=generate_content_config`, so the agent rebuilt with the tool keeps the safety settings defined above (the Sessions example below uses this `agent`); `generate_content_config` is a field of `LlmAgent` (`Agent` is an alias of it) in google-adk 2.15.0.

```python
from google.adk.agents import Agent

agent = Agent(
    model=model,                     # Required.
    name='currency_exchange_agent',  # Required.
    tools=[get_exchange_rate],       # Optional.
    generate_content_config=generate_content_config,  # Optional.
)

```

### Sessions

```python
def session_service_builder():
  from google.adk.sessions import InMemorySessionService

  return InMemorySessionService()
```

```python
from vertexai.agent_engines import AdkApp

app = AdkApp(
   agent=agent,                                      # Required.
   session_service_builder=session_service_builder,  # Optional.
)
```

```python
session = await app.async_create_session(user_id="USER_ID")
print(session)
```

```python
await app.async_list_sessions(user_id="USER_ID")
```

Adapted (not in the official docs): `session_id="SESSION_ID"` is replaced with `session["id"]`, the ID of the session created above, and the result goes to `fetched_session` so that `session` keeps the created session.

```python
fetched_session = await app.async_get_session(user_id="USER_ID", session_id=session["id"])
```

Adapted (not in the official docs): `session_id=SESSION_ID` (an undefined name) is replaced with `session["id"]`, the ID of the session created above.

```python
async for event in app.async_stream_query(
    user_id="USER_ID",
    session_id=session["id"], # Optional. you can pass in the session_id when querying the agent
    message="What is the exchange rate from US dollars to Swedish currency on 2025-04-03?",
):
    print(event)
```

### Memories

Adapted (not in the official docs): in instruction item 1, the sentence telling the agent to provide a hypothetical tool execution outcome is replaced with one that reports only real tool results; this agent has only `PreloadMemoryTool`, so the original wording makes it claim vehicle actions it cannot perform. Also, `model="gemini-2.0-flash"` is replaced with `model="gemini-3.5-flash"`, because that model ID is listed as retired (see the model definition above).

```python
from google.adk.agents import Agent
from google.adk.tools.preload_memory_tool import PreloadMemoryTool
from vertexai.agent_engines import AdkApp

agent = Agent(
    model="gemini-3.5-flash",
    name='stateful_agent',
    instruction="""You are a Vehicle Voice Agent, designed to assist users with information and in-vehicle actions.

1.  **Direct Action:** If a user requests a specific vehicle function (e.g., "turn on the AC"), execute it immediately using the corresponding tool. Report an outcome only if the tool returned one; if no tool can perform the function, say so instead of describing an outcome.
2.  **Information Retrieval:** Respond concisely to general information requests with your own knowledge (e.g., restaurant recommendation).
3.  **Clarity:** When necessary, try to seek clarification to better understand the user's needs and preference before taking an action.
4.  **Brevity:** Limit responses to under 30 words.
""",
    tools=[PreloadMemoryTool()],
)

app = AdkApp(agent=agent)
```

```python
def memory_service_builder():
  from google.adk.memory import InMemoryMemoryService

  return InMemoryMemoryService()
```

```python
from vertexai.agent_engines import AdkApp

app = AdkApp(
   agent=agent,                                    # Required.
   memory_service_builder=memory_service_builder,  # Optional.
)
```

Create a session and interact with the agent, generate memories from the session, then search them:

Adapted (not in the official docs): `initial_session.id` is written as `initial_session["id"]`, because `AdkApp.async_create_session` returns the session serialized with `model_dump(mode="json")` (a dictionary) in google-cloud-aiplatform 2.10.0, and the source itself says the session is created as a dictionary.

```python
initial_session = await app.async_create_session(user_id="USER_ID")

async for event in app.async_stream_query(
    user_id="USER_ID",
    session_id=initial_session["id"],
    message="Can you update the temperature to my preferred temperature?",
):
    print(event)
```

Adapted (not in the official docs): after the stream is consumed, the session is read again with `async_get_session` and that latest session is passed, instead of `initial_session` from before the conversation.

```python
latest_session = await app.async_get_session(
    user_id="USER_ID",
    session_id=initial_session["id"],
)
await app.async_add_session_to_memory(session=latest_session)
```

```python
response = await app.async_search_memory(
    user_id="USER_ID",
    query="Fix the temperature!",
)
print(response)
```

## Notes

- `AdkApp(agent=...)`: Wraps an ADK `Agent` for local testing and deployment.
- `session_service_builder`: Optional function returning a session service; overrides the managed session service.
- `memory_service_builder`: Optional function returning a `BaseMemoryService`; overrides the default memory service.
- `async_stream_query(user_id, message, session_id)`: Streams events; `session_id` is optional.
- `async_create_session` / `async_list_sessions` / `async_get_session`: Session management; the created session is the dictionary form of an ADK session object.
- `async_add_session_to_memory` / `async_search_memory`: Generate and search memories.
- `USER_ID`: User-defined ID with a character limit of 128 (for example `user-123`).
- `PreloadMemoryTool`: Retrieves memories at the start of each turn and injects them into the model request context before the user turn.
- `vertexai.agent_engines.AdkApp` is the Agent Runtime SDK module, not the deprecated generative AI module. SDK version 2.0.1 refactored `agent_engines` into client-based modules (see [runtime.md](./runtime.md)).
- Corrected from the official docs: the safety settings example set `threshold=types.HarmBlockThreshold.OFF,` for `HARM_CATEGORY_DANGEROUS_CONTENT`, which turns that filter off ("Turn off the safety filter entirely.", google-genai 3.6.1 `google/genai/types.py`, `HarmBlockThreshold.OFF`) for the agent built from `generate_content_config`. The same enum defines `BLOCK_MEDIUM_AND_ABOVE` ("Block content with a medium harm probability or higher.").
- With a custom in-memory session or memory service, state might not stay in sync after deployment to Agent Runtime; the source only recommends customizing if you can synchronize state across instances in a deployed environment.
- Write tool docstrings that fully describe parameters, behavior and return values; the model uses them to choose a function. Test functions locally first. The tool calls an external API with a fixed URL (Frankfurter).
- Corrected from the official docs: the source writes `session_id=SESSION_ID, # Optional.` and `session_id=initial_session.id,`.
- The source's follow-up examples also read `session.id` / `initial_session.id` from the dictionary returned by `async_create_session`; those blocks are not reproduced.
- The top-level `await` / `async for` statements run in a notebook; in a plain Python script, put them inside an `async def` function and run it with `asyncio.run(...)`.
- The source's memory test creates `new_session` but then queries with `session_id=initial_session.id`; that walkthrough block is not reproduced here.
- The source also shows sample response dictionaries and the rest of the memory test walkthrough (the follow-up message and the new-session test), which are omitted.
- Corrected from the official docs: `get_exchange_rate` called `requests.get(f"https://api.frankfurter.app/{currency_date}", params={"from": currency_from, "to": currency_to})` with no timeout and returned `response.json()` without checking the HTTP status.
- Corrected from the official docs: the Memories example's instruction item 1 ended "You don't have the outcome of the actual tool execution, so provide a hypothetical tool execution outcome."
- Corrected from the official docs: the source writes `model = "gemini-2.0-flash"` and, in the Memories example, `model="gemini-2.0-flash",`. The model versions page lists `gemini-2.0-flash` in its "Retired models" table ("`gemini-2.0-flash` | February 5, 2025 | June 1, 2026 | `gemini-3.5-flash-lite`": release date, retirement date, recommended upgrade; https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions, retrieved 2026-11-21). Both examples use `gemini-3.5-flash` instead, the model in the ADK quickstart (`model="gemini-3.5-flash"`, https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk, retrieved 2026-11-21), which the model versions page lists as available ("May 19, 2026 | May 19, 2027 or later").
- Corrected from the official docs: `get_exchange_rate` put `currency_date` into the URL path (`f"https://api.frankfurter.app/{currency_date}"`) without checking it.
- Adapted from the official docs: the source passes `initial_session` (created before the conversation) to `async_add_session_to_memory` and queries and reads with the placeholder `SESSION_ID`; the examples use the created session's `["id"]` and pass the session read after the stream. In google-cloud-aiplatform 2.10.0 (`vertexai/agent_engines/templates/adk.py`), `async_create_session` returns a dictionary (`model_dump(mode="json")`), the local `async_get_session` returns the ADK `Session` object from the session service, and `async_add_session_to_memory` accepts either (a dictionary goes through `Session.model_validate`). It also re-reads a session that has no events ("Get the latest version of the session in case it was updated."), so the source's call still includes the conversation in 2.10.0, but passing the latest session does not depend on that.
- Corrected from the official docs: `get_exchange_rate` put the model-supplied `currency_date` in the URL as given; the example validates it with `strptime("%Y-%m-%d")`, which also accepts dates without zero padding such as `2023-1-5`, so it sends the normalized `date().isoformat()` value.
- Corrected from the official docs: the `Agent` rebuilt with `tools=[get_exchange_rate]` did not pass `generate_content_config`, so the safety settings of the first example were dropped for it and for the Sessions example that uses it (google-adk 2.15.0 `google/adk/agents/llm_agent.py`: `generate_content_config: types.GenerateContentConfig | None = None`, `Agent: TypeAlias = LlmAgent`).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart-adk.md](./quickstart-adk.md)
- [adk.md](./adk.md)
- [create-a-custom-agent.md](./create-a-custom-agent.md)
