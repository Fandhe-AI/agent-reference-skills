---
source: https://developers.cloudflare.com/workflows/python/bindings/
---

# Python Workflow bindings

Trigger and manage Workflow instances from a Python Worker through the `env` binding (FFI to the JavaScript Workflow binding).

## Signature / Usage

Adapted (not in the official docs): `send_event` is shown on the instance returned by `get(id)` as the JavaScript `sendEvent`; see Notes.

```python
create(options=None)
create_batch(batch)
get(id)
instance.sendEvent(to_js({"type": type, "payload": payload}))
```

Payload inside a Python Workflow:

```python
from workers import WorkflowEntrypoint

class DemoWorkflowClass(WorkflowEntrypoint):
    async def run(self, event, step):
        @step.do('step-name')
        async def first_step():
            payload = event["payload"]
            return payload
```

Create an instance:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        event = {"foo": "bar"}
        await self.env.MY_WORKFLOW.create(params=event)
        return Response.json({"status": "success"})
```

Create a batch (up to 100):

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Create a new batch of 3 Workflow instances, each with its own ID and pass params to the Workflow instances
        instances = [
            {"id": "id-abc123", "params": {"hello": "world-0"}},
            {"id": "id-def456", "params": {"hello": "world-1"}},
            {"id": "id-ghi789", "params": {"hello": "world-2"}},
        ]
        await self.env.MY_WORKFLOW.create_batch(instances)
        return Response.json({"status": "success"})
```

Get an instance and manage it:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        instance = await self.env.MY_WORKFLOW.get("abc-123")

        # FFI methods available for WorkflowInstance
        await instance.status()
        await instance.pause()
        await instance.resume()
        await instance.restart()
        await instance.terminate()
        return Response.json({"status": "success"})
```

Send an event:

Adapted (not in the official docs): the event is sent to a specific instance via `get(id)` and the JavaScript `WorkflowInstance.sendEvent`, with the payload converted by the `to_js` helper from the Python FFI page; see Notes.

```python
from js import Object
from pyodide.ffi import to_js as _to_js

from workers import WorkerEntrypoint, Response

# to_js converts between Python dictionaries and JavaScript Objects
def to_js(obj):
   return _to_js(obj, dict_converter=Object.fromEntries)

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        instance = await self.env.MY_WORKFLOW.get("abc-123")
        await instance.sendEvent(to_js({"type": "my-event-type", "payload": {"foo": "bar"}}))
        return Response.json({"status": "success"})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| create `options` | `dict` | `None` | Same keys as `WorkflowInstanceCreateOptions` (`id`, `params`, `retention`) |
| create_batch `batch` | `list` of `WorkflowInstanceCreateOptions` | — | Up to 100 instances; each element is expected to include both `id` and `params` |
| get `id` | `str` | — | Instance ID |
| sendEvent `type` | `str` | — | Event type to send (key of the object passed to `sendEvent`) |
| sendEvent `payload` | — | — | Payload to send (key of the object passed to `sendEvent`) |

## Notes

- Requires both `python_workflows` and `python_workers` compatibility flags and `compatibility_date` of `2025-08-01` or later. Bindings use FFI; see https://developers.cloudflare.com/workers/languages/python/ffi/#using-bindings-from-python-workers .
- `create` and `get` return JavaScript `WorkflowInstance` objects, not Python objects.
- `create_batch` here takes a list; in JavaScript the array form of `createBatch` is deprecated in favour of the `{ instances }` object form (see [workflow-binding.md](./workflow-binding.md)). The Python page documents only the list form.
- Corrected from the official docs: the Python page calls `send_event(type=..., payload=...)` on the binding itself without naming a target instance. Through FFI the binding is the JavaScript Workflow binding, which has no event-sending method; events are sent with `sendEvent({ type, payload })` on the `WorkflowInstance` returned by `get(id)` (see [workflow-instance.md](./workflow-instance.md)). The example converts the dictionary with `to_js(..., dict_converter=Object.fromEntries)` as shown on https://developers.cloudflare.com/workers/languages/python/ffi/ .
- Configuration for Python Workflows is in [python-sdk.md](./python-sdk.md). Events sent with `sendEvent` should come only from authenticated callers in a real Worker.

## Related

- [python-sdk.md](./python-sdk.md)
- [workflow-binding.md](./workflow-binding.md)
- [workflow-instance.md](./workflow-instance.md)
