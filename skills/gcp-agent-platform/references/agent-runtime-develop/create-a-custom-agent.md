---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent
---

# Develop a custom agent for Agent Runtime

Define a custom agent as a Python class that Agent Runtime deploys and manages: `__init__` for configuration, `set_up` for initialization, and `query` / `stream_query` (plus optional async and custom operations) for serving. This page covers the class template, async and streaming queries, registered operations, type annotations and error handling; tracing, environment variables, Secret Manager and credentials are in [custom-agent-integrations.md](./custom-agent-integrations.md).

## Signature / Usage

### Basic template

```python
from typing import Callable, Sequence

class CLASS_NAME:
    def __init__(
        self,
        model: str,
        tools: Sequence[Callable],
        project: str,
        location: str,
    ):
        self.model_name = model
        self.tools = tools
        self.project = project
        self.location = location

    def set_up(self):
        import vertexai
        from langchain_google_vertexai import ChatVertexAI
        from langgraph.prebuilt import create_react_agent

        vertexai.init(project=self.project, location=self.location)

        model = ChatVertexAI(model_name=self.model_name)
        self.graph = create_react_agent(model, tools=self.tools)

    def query(self, **kwargs):
        return self.graph.invoke(**kwargs)
```

Instantiate and test locally (`model` is the model name string and `get_exchange_rate` is a tool function you define, for example the one in [quickstart-adk.md](./quickstart-adk.md); the source does not define either in this snippet or in the async and streaming examples below):

```python
agent = CLASS_NAME(
    model=model,  # Required.
    tools=[get_exchange_rate],  # Optional.
    project="PROJECT_ID",
    location="LOCATION",
)
agent.set_up()
```

Adapted (not in the official docs): `input` is a state with the question as a user message in `messages`, because the template's `query` passes its keyword arguments to `self.graph.invoke(**kwargs)` (a graph built by `create_react_agent`), and the prebuilt LangGraph template in google-cloud-aiplatform 2.10.0 (`vertexai/agent_engines/templates/langgraph.py`) converts a string input to a state with `"messages": [("user", input)]` before calling `.invoke(input=...)` / `.stream(input=...)` on the same kind of graph, while the source passes the question as a bare string.

```python
response = agent.query(
    input={"messages": [("user", "What is the exchange rate from US dollars to Swedish currency?")]}
)

print(response)
```

### Query asynchronously

Define a method such as `async_query` that returns a Python coroutine.

Adapted (not in the official docs): the body is `return dumpd(await self.graph.ainvoke(**kwargs))` instead of `for chunk in self.graph.ainvoke(**kwargs): yield dumpd(chunk)`, because the source says `async_query` returns a coroutine and tests it with `response = await agent.async_query(...)`, while `yield` makes it an async generator; `ainvoke` on a LangGraph graph is awaited (google-adk 2.15.0 `LangGraphAgent` calls `await self.graph.ainvoke(...)`). Also, `from langchain.load.dump import dumpd` is replaced with `from langchain_core.load import dumpd`, because the `langchain` 1.x package has no `langchain.load` module (see Notes).

```python
class AsyncAgent(CLASS_NAME):

    async def async_query(self, **kwargs):
        from langchain_core.load import dumpd

        return dumpd(await self.graph.ainvoke(**kwargs))

agent = AsyncAgent(
    model=model,                # Required.
    tools=[get_exchange_rate],  # Optional.
    project="PROJECT_ID",
    location="LOCATION",
)
agent.set_up()
```

### Stream responses

Adapted (not in the official docs): `from langchain.load.dump import dumpd` is replaced with `from langchain_core.load import dumpd`, because the `langchain` 1.x package has no `langchain.load` module (see Notes).

```python
from typing import Iterable

class StreamingAgent(CLASS_NAME):

    def stream_query(self, **kwargs) -> Iterable:
        from langchain_core.load import dumpd

        for chunk in self.graph.stream(**kwargs):
            yield dumpd(chunk)

agent = StreamingAgent(
    model=model,                # Required.
    tools=[get_exchange_rate],  # Optional.
    project="PROJECT_ID",
    location="LOCATION",
)
agent.set_up()
```

Adapted (not in the official docs): `input` is a state with the question as a user message in `messages`, for the same reason as the `query` test above (the template's `stream_query` passes its keyword arguments to `self.graph.stream(**kwargs)`).

```python
import pprint

for chunk in agent.stream_query(
    input={"messages": [("user", "What is the exchange rate from US dollars to Swedish currency?")]}
):
    # Use pprint with depth=1 for a more concise, high-level view of the
    # streamed output.
    # To see the full content of the chunk, use:
    # print(chunk)
    pprint.pprint(chunk, depth=1)
```

### Stream asynchronously

Define a method such as `async_stream_query` that returns an asynchronous generator, and test it locally by iterating over it with `async for`, similar to the `stream_query` test. The source's class block is left out (see Notes).

### Register custom operations

Prerequisite (not in the official docs): `get_state` and `get_state_history` read the graph's checkpoints, so the graph must be built with a checkpointer. The basic template's `set_up` calls `create_react_agent(model, tools=self.tools)` without one, and LangGraph then raises `ValueError("No checkpointer set")`. Pass `checkpointer=` to `create_react_agent` in `set_up` (for example `InMemorySaver()` from `langgraph.checkpoint.memory`, which keeps state only in the memory of one process), and call `query` / `stream_query` and the state methods with the same `config={"configurable": {"thread_id": "THREAD_ID"}}`.

Adapted (not in the official docs): `get_state` and `get_state_history` take `**kwargs`, because the source's bodies pass `**kwargs` that are not defined in those methods (`NameError`); the prebuilt LangGraph template in google-cloud-aiplatform 2.10.0 defines both methods with `**kwargs`.

```python
from typing import Iterable

class CustomAgent(StreamingAgent):

    def get_state(self, **kwargs) -> dict: # new synchronous method
        return self.graph.get_state(**kwargs)._asdict()

    def get_state_history(self, **kwargs) -> Iterable: # new streaming operation
        for state_snapshot in self.graph.get_state_history(**kwargs):
            yield state_snapshot._asdict()

    def register_operations(self):
        return {
            # The list of synchronous operations to be registered
            "": ["query", "get_state"],
            # The list of streaming operations to be registered
            "stream": ["stream_query", "get_state_history"],
        }
```

### Type annotations

The `get_state` method below has the same checkpointer prerequisite as the custom operations above; `config` carries the `thread_id` in `configurable`.

```python
from typing import Any, Dict, TypedDict

# schemas.py
class RunnableConfig(TypedDict, total=False):
    metadata: Dict[str, Any]
    configurable: Dict[str, Any]

# agents.py
class AnnotatedAgent(CLASS_NAME):

    def get_state(self, config: RunnableConfig) -> dict:
        return self.graph.get_state(config=config)._asdict()

    def register_operations(self):
        return {"": ["query", "get_state"]}
```

### Handle errors

Adapted (not in the official docs): the wrapper re-raises exceptions that lack the `code` and `error` attributes, because the source catches every `Exception` and then reads `getattr(err, 'code')` / `getattr(err, 'error')` without defaults, so an ordinary exception (for example `ValueError`) would raise `AttributeError` inside the handler and hide the original failure.

```python
from functools import wraps
import json

def error_wrapper(func):
    @wraps(func)  # Preserve original function metadata
    def wrapper(*args, **kwargs):
        try:
            # Execute the original function with its arguments
            return func(*args, **kwargs)
        except Exception as err:
            if not (hasattr(err, 'code') and hasattr(err, 'error')):
                raise
            error_code = getattr(err, 'code')
            error_message = getattr(err, 'error')

            # Construct the error response dictionary
            error_response = {
                "error": {
                    "code": error_code,
                    "message": f"'{func.__name__}': {error_message}"
                }
            }
            # Return the Python dictionary directly.
            return error_response

    return wrapper

# Example exception
class SessionNotFoundError(Exception):
    def __init__(self, session_id, message="Session not found"):
        self.code = 404
        self.error = f"{message}: {session_id}"
        super().__init__(self.error)

# Example Agent Class
class MyAgent:
    @error_wrapper
    def get_session(self, session_id: str):
        # Simulate the condition where the session isn't found
        raise SessionNotFoundError(session_id=session_id)

# Example Usage: Session Not Found
agent = MyAgent()
error_result = agent.get_session(session_id="nonexistent_session_123")
print(json.dumps(error_result, indent=2))
```

## Notes

- Class methods (all optional):
  - `__init__()`: if absent, the default Python constructor is used. Agent configuration parameters only (model parameters, safety attributes, project ID, region; the source also lists "credentials, API keys", but values stored here are pickled, see Secrets below, so pass a Secret Manager secret name instead and get credentials in `set_up` from ADC or Secret Manager). The constructed object must be "pickle-able"; initialize service clients and database connections in `set_up`.
  - Secrets: an agent-object deployment pickles the object and uploads it to Cloud Storage (see deploy-an-agent.md), so anything stored on `self` in `__init__` is part of that file. Pass only non-secret configuration to `__init__` (for example the project ID and a Secret Manager secret name) and read secret values and runtime credentials in `set_up`, as the Secret Manager example in [custom-agent-integrations.md](./custom-agent-integrations.md) does.
  - `set_up()`: if absent, Agent Runtime assumes no set-up is needed. Initialization logic: connect to databases or services, import dependent packages, precompute data.
  - `query()`: returns the complete response as a single result.
  - `stream_query()`: returns the response in chunks; must return an iterable (for example a generator).
  - `async_query()` / `async_stream_query()`: async variants returning a coroutine / asynchronous generator.
  - `register_operations()`: returns a dict of execution modes to method lists: `""` is standard, `"stream"` is streaming.
- Maximum timeout for streaming responses: 15 minutes; break longer tasks into smaller chunks.
- Give `query` / `stream_query` a clear docstring with typed inputs and avoid variable arguments in them.
- By default `query` and `stream_query` are registered as operations. You need not register both modes; `{"": ["query", "get_state"]}` supports only standard operations.
- Only JSON-serializable types are supported in the input and output of deployed operations; annotate schemas with `TypedDict` or Pydantic models.
- Streaming: LangChain's async `astream_event` method is not supported at the moment. If the consumer cannot keep up (backpressure), throttle content generation.
- The wrapper in the error example returns the error as an ordinary return value (a dictionary) for exceptions that carry `code` and `error`; the caller must inspect it, it does not raise. Other exceptions propagate unchanged.
- Corrected from the official docs: the local `query` and `stream_query` tests passed `input="What is the exchange rate from US dollars to Swedish currency?"` (a bare string) to a `create_react_agent` graph; the error wrapper had `except Exception as err:` followed directly by `error_code = getattr(err, 'code')` / `error_message = getattr(err, 'error')`, so only exceptions with both attributes (such as the example's `SessionNotFoundError`) are now converted to the error dictionary.
- Corrected from the official docs: `async_query` was `for chunk in self.graph.ainvoke(**kwargs):` / `yield dumpd(chunk)`; `get_state` / `get_state_history` were `def get_state(self) -> dict:` and `def get_state_history(self) -> Iterable:`.
- Left out: the source's `AsyncStreamingAgent` class, because it iterates `self.graph.astream(**kwargs)` with a plain `for` inside `async def async_stream_query`; whether `astream` returns a synchronous iterable cannot be confirmed against the pinned SDK sources, and the source calls the method's result an asynchronous generator. Its `async for` test loop is left out with it.
- Top-level `async for` / `await` (as the source writes them) runs in a notebook; in a plain Python script, put it inside an `async def` function and run it with `asyncio.run(...)`.
- The source's printed error output (JSON with message "Invocation error in 'get_session': ...") is garbled in the twin and differs from the code's message format, so it is not reproduced.
- The source also shows sample dictionary responses, the `async_query` test call and the streaming output samples.
- Corrected from the official docs: the `async_query` and `stream_query` examples imported `from langchain.load.dump import dumpd`. The `langchain` 1.0.0 and 1.5.2 wheels (PyPI, checked 2026-11-21) contain no `langchain/load/` module (the 1.5.2 wheel's subpackages are `agents`, `chat_models`, `embeddings`, `mcp`, `messages`, `rate_limiters`, `tools`; 1.0.0 has the same without `mcp`), so the import raises `ModuleNotFoundError` with `langchain` 1.x. The `langchain-classic` package that the same SDK extra installs (1.0.8 checked) ships only `langchain_classic/`, not `langchain/`. `dumpd` is defined in `langchain_core/load/dump.py` and exported in `__all__` of `langchain_core/load/__init__.py` in both `langchain-core` 1.0.0 and 1.8.4. The `langchain` extra of google-cloud-aiplatform 2.10.0 (`google-cloud-aiplatform[agent_engines,langchain]`, see [setup.md](./setup.md)) requires `langchain<2.0.0,>=1.0.0` and `langchain-core<2.0.0,>=1.0.0`, and that SDK's own LangGraph template (`vertexai/agent_engines/templates/langgraph.py`) tries `from langchain_core.load import dumpd` first and falls back to `from langchain.load.dump import dumpd` only on `ImportError`.
- Checkpointer prerequisite: the source's `CustomAgent` and `AnnotatedAgent` inherit the basic template's `set_up`, which builds the graph without a checkpointer. In langgraph 1.2.24 (`langgraph/pregel/main.py`), `get_state` and `get_state_history` call `_state_checkpointer`, which raises `ValueError("No checkpointer set")` when the graph has none, and `get_state` reads `thread_id` from the `configurable` part of the config. `create_react_agent` in langgraph-prebuilt 1.1.3 takes `checkpointer: Checkpointer | None = None`; `InMemorySaver` (alias `MemorySaver`) is in `langgraph/checkpoint/memory/__init__.py` of langgraph-checkpoint 4.3.2, whose docstring says "Only use `InMemorySaver` for debugging or testing purposes." The `langchain` extra of google-cloud-aiplatform 2.10.0 requires `langgraph<2.0.0,>=1.0.0`, and that SDK's prebuilt LangGraph template takes a `checkpointer_builder` for the same purpose (`vertexai/agent_engines/templates/langgraph.py`). For a deployed agent that serves state across instances, use a persistent checkpointer instead (not covered by the official page).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [custom-agent-integrations.md](./custom-agent-integrations.md)
- [create-an-adk-agent.md](./create-an-adk-agent.md)
- [runtime.md](./runtime.md)
