---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/runtime-contract
---

# Agent Runtime Contract

Agent Runtime is independent of the application framework. A custom container or Dockerfile deployment must adhere to this HTTP contract to serve queries: listen on `0.0.0.0:8080` and, to use the Python SDK or the console Playground, implement `/api/reasoning_engine` and `/api/stream_reasoning_engine`.

## Signature / Usage

### Example API server (Python, FastAPI)

Requires `fastapi`, `uvicorn` and `pydantic`. It wraps an example `SimpleAgent`; replace it with your own agent, and list in `UNARY_METHODS` / `STREAM_METHODS` only the methods you register for each mode. The streaming endpoint iterates the result with `async for`, so this server works only with an asynchronous generator `stream_query` (as in `SimpleAgent`); a synchronous generator, such as the `stream_query` in create-a-custom-agent.md, is not handled.

Adapted (not in the official docs): added the `UNARY_METHODS` / `STREAM_METHODS` allowlists and a `400` response for any `class_method` not in the allowlist of the endpoint, checked before `getattr`, because the source passes the request's `class_method` straight to `getattr(agent, ...)`, so a request could call any attribute of the agent object (for example `__init__` or an internal helper); also added `_is_message_input` and a `400` response, checked before the method is invoked, for an `input` that is not `{"message": <string>}`, because both allowed methods take one string `message` and any other `input` raises `TypeError` (for streaming, after the response has started).

```python
import inspect
import json
import logging
import os
import uvicorn
from fastapi import FastAPI, encoders, responses
from pydantic import BaseModel

app = FastAPI()

# Define the request body structure
class QueryRequest(BaseModel):
    input: dict | None = None
    class_method: str

# Example Agent implementation
class SimpleAgent:
    def query(self, message: str) -> str:
        return f"Echo: {message}"

    async def stream_query(self, message: str):
        words = message.split()
        for word in words:
            yield {"output": word + " "}

agent = SimpleAgent()

UNARY_METHODS = {"query"}
STREAM_METHODS = {"stream_query"}

def _is_message_input(payload):
    return (
        isinstance(payload, dict)
        and set(payload) == {"message"}
        and isinstance(payload["message"], str)
    )

def _encode_chunk_to_json(chunk):
    """Encodes a chunk to a JSON string with a newline."""
    try:
        json_chunk = encoders.jsonable_encoder(chunk)
        return json.dumps(json_chunk) + "\n"
    except Exception:
        logging.exception("Failed to encode chunk")
        return None

async def json_generator(output):
    async for chunk in output:
        encoded_chunk = _encode_chunk_to_json(chunk)
        if encoded_chunk is None:
            break
        yield encoded_chunk

async def _invoke_callable_or_raise(invocation_callable, invocation_payload):
    if inspect.iscoroutinefunction(invocation_callable):
        return await invocation_callable(**invocation_payload)
    else:
        return invocation_callable(**invocation_payload)

@app.get("/")
def health_check():
    """Health check endpoint for container readiness."""
    return {"status": "ok"}

@app.post("/api/reasoning_engine")
async def query_endpoint(request: QueryRequest) -> responses.JSONResponse:
    if request.class_method not in UNARY_METHODS:
        return responses.JSONResponse(
            status_code=400,
            content={"error": f"Method {request.class_method} not allowed"}
        )
    try:
        method = getattr(agent, request.class_method)
    except AttributeError:
        return responses.JSONResponse(
            status_code=400,
            content={"error": f"Method {request.class_method} not found on agent"}
        )
    if not _is_message_input(request.input):
        return responses.JSONResponse(
            status_code=400,
            content={"error": 'input must be {"message": "<string>"}'}
        )

    output = await _invoke_callable_or_raise(method, request.input or {})

    try:
        json_serialized_content = encoders.jsonable_encoder({"output": output})
    except ValueError as encoding_error:
        logging.exception("Failed to JSON-encode response: %s", encoding_error)
        raise encoding_error
    return responses.JSONResponse(content=json_serialized_content)

@app.post("/api/stream_reasoning_engine")
async def stream_query_endpoint(request: QueryRequest) -> responses.StreamingResponse:
    if request.class_method not in STREAM_METHODS:
        return responses.StreamingResponse(
            content=iter([json.dumps({"error": f"Method {request.class_method} not allowed"})]),
            status_code=400,
            media_type="application/json"
        )
    try:
        method = getattr(agent, request.class_method)
    except AttributeError:
        return responses.StreamingResponse(
            content=iter([json.dumps({"error": f"Method {request.class_method} not found"})]),
            status_code=400,
            media_type="application/json"
        )
    if not _is_message_input(request.input):
        return responses.StreamingResponse(
            content=iter([json.dumps({"error": 'input must be {"message": "<string>"}'})]),
            status_code=400,
            media_type="application/json"
        )

    output = await _invoke_callable_or_raise(method, request.input or {})
    return responses.StreamingResponse(
        content=json_generator(output),
        media_type="application/json",
    )

@app.get("/is_busy")
def keep_alive_endpoint() -> responses.JSONResponse:
    """Optional keep-alive probe endpoint for background tasks."""
    if getattr(agent, "has_active_background_tasks", False):
        return responses.JSONResponse(status_code=200, content={"status": "busy"})
    return responses.JSONResponse(status_code=412, content={"status": "idle"})

if __name__ == "__main__":
    # The container must listen on 0.0.0.0 and port 8080
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
```

## Options / Props

### Routing by `api_mode`

| API Mode | Execution Type | Routing Endpoint |
|---|---|---|
| `""` (empty string) or `"async"` | Unary (Request-Response) | `/api/reasoning_engine` |
| `"stream"` or `"async_stream"` | Streaming | `/api/stream_reasoning_engine` |

## Notes

- Request fields (both endpoints, HTTP `POST` with a JSON body):
  - `class_method` (string): Method name of the underlying agent to invoke (for example `query` or `stream_query`).
  - `input` (JSON object): Arguments passed to the class method.
- Endpoints:
  - `/api/reasoning_engine` (`reasoningEngines/query` REST API and the Python SDK's synchronous / asynchronous query methods): Body `{"class_method": "query", "input": {"message": "What is the capital of France?"}}`; returns a JSON object such as `{"output": "The capital of France is Paris."}`.
  - `/api/stream_reasoning_engine` (`reasoningEngines/streamQuery` REST API and the SDK's streaming query methods; required for Playground): Body `{"class_method": "stream_query", "input": {"message": "Tell me a short story."}}`; returns line-delimited JSON (ndjson), each line a chunk such as `{"output": "Once"}`.
  - `GET /` (an example path), for health probes: respond `200 OK` on `0.0.0.0:8080` to enable liveness / readiness probing.
  - `GET http_get.path` (for example `/is_busy`), for the optional keep-alive probe: see the keep-alive bullet below.
- Required methods for integration:
  - SDK standard query: `query` (mode `""` or `"async"`) and `stream_query` (mode `"stream"` or `"async_stream"`)
  - Playground: `stream_query` (mode `"stream"` or `"async_stream"`)
- Flow: the client sends `POST /v1/projects/.../reasoningEngines/...:query` (or `:streamQuery`); the control plane forwards `POST /api/reasoning_engine` (or `/api/stream_reasoning_engine`) with a JSON envelope to the container on `0.0.0.0:8080`; the container returns `HTTP 200 OK` with a JSON envelope (or NDJSON chunks), which the control plane returns to the client (as SSE events for streaming).
- Declare the supported class methods (`name` and `api_mode`) in the `classMethods` list of the deployment specification (`class_methods` in the SDK). The request body carries `class_method` (matching the method name) and `input`.
- Both endpoints are optional at the API level; custom HTTP endpoints you expose can be called through the agent's underlying API.
- Keep-alive probe (when `keep_alive_probe` is configured): `GET` on `http_get.path` on `http_get.port` (default `8080`), polled every 10 seconds with a 1-second request timeout while the instance is idle. Any `200`-`299` response (for example `{"status": "busy"}`) means busy and prevents idle scale-down until `max_seconds` (maximum `3600` seconds) after the last request completes. A non-`2xx` response (for example `412 Precondition Failed` or `503 Service Unavailable`, with `{"status": "idle"}`) or timing out for 3 consecutive probes makes the idle instance eligible for scale-down; a failing probe doesn't terminate active request processing.
- ADK: to support the full ADK feature set a proxy container must implement the methods defined by the ADK contract (see "Use an ADK agent"); the `AdkApp` template is a reference implementation. To have Google handle updates when you update ADK, use ADK's own deployment tooling instead of writing your own API server.
- Adapted from the official docs: the source's endpoints call `method = getattr(agent, request.class_method)` for any requested name; the example above first rejects names outside `UNARY_METHODS` (`/api/reasoning_engine`) or `STREAM_METHODS` (`/api/stream_reasoning_engine`) with `400`. It also rejects with `400`, before invoking the method, an `input` that is not an object whose only key is `message` with a string value (the signature of `SimpleAgent.query` / `stream_query`); the source passes `request.input or {}` unchecked. Keep these sets equal to the methods declared in `classMethods` for each `api_mode`, and change the input check when your methods take other arguments.
- The request-flow sequence diagram (iframe) is omitted; its text description is summarized above. The JSON request / response bodies in the source are inline code only, so they are in the Endpoints bullets instead of fenced blocks.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/runtime-contract (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-an-agent.md](./deploy-an-agent.md)
- [deploy-an-agent-containers.md](./deploy-an-agent-containers.md)
- [use-an-agent.md](./use-an-agent.md)
