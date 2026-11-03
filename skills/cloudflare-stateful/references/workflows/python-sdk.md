---
source: https://developers.cloudflare.com/workflows/python/, https://developers.cloudflare.com/workflows/python/python-workers-api/
---

# Python Workflows SDK

Declare a Workflow in Python by subclassing `WorkflowEntrypoint` (from `workers`) and decorating steps with `step.do`.

## Signature / Usage

Adapted (not in the official docs): the official minimal class has only a comment in the `run` body, which is not valid Python; `pass` is added.

```python
from workers import WorkflowEntrypoint

class MyWorkflow(WorkflowEntrypoint):
    async def run(self, event, step):
        # steps here
        pass
```

A Workflow plus a Worker that starts it:

```python
from workers import Response, WorkflowEntrypoint, WorkerEntrypoint

class PythonWorkflowStarter(WorkflowEntrypoint):
    async def run(self, event, step):

        @step.do('step1')
        async def step_1():
            # does stuff
            print('executing step1')

        @step.do('step2')
        async def step_2():
            # does stuff
            print('executing step2')

        await step_1()
        await step_2()

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        await self.env.MY_WORKFLOW.create()
        return Response("Hello world!")
```

Required Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "hello-python",
	"main": "src/entry.py",
	"compatibility_flags": [
		"python_workers",
		"python_workflows"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"workflows": [
		{
			"name": "workflows-demo",
			"binding": "MY_WORKFLOW",
			"class_name": "PythonWorkflowStarter"
		}
	]
}
```

Sleeping, waiting, and retries:

```python
async def run(self, event, step):
    await step.sleep("my-sleep-step", "10 seconds")
```

Adapted (not in the official docs): the official `sleep_until` example uses a naive `datetime.datetime.now()`; a timezone-aware UTC time is used so the instant is unambiguous.

```python
import datetime

async def run(self, event, step):
    await step.sleep_until("my-sleep-step", datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=10))
```

```python
async def run(self, event, step):
    await step.wait_for_event("my-wait-for-event-step", "my-event-type")
```

Per-step retry config and step context:

```python
from workers import WorkflowEntrypoint

class DemoWorkflowClass(WorkflowEntrypoint):
    async def run(self, event, step):
        @step.do('step-name', config={"retries": {"limit": 1, "delay": "10 seconds"}})
        async def first_step():
            # do some work
            pass
```

```python
from workers import WorkflowEntrypoint

class CtxWorkflow(WorkflowEntrypoint):
    async def run(self, event, step):
        @step.do()
        async def read_context(ctx):
            print(ctx["step"]["name"])    # step name
            print(ctx["step"]["count"])   # step count
            print(ctx["attempt"])         # attempt number
            print(ctx["config"])          # resolved step config
            return ctx["attempt"]

        return await read_context()
```

Error handling:

```python
async def run(self, event, step):
    async def try_step(fn):
        try:
            return await fn()
        except Exception as e:
            print(f"Successfully caught {type(e).__name__}: {e}")

    @step.do("my_failing")
    async def my_failing():
        print("Executing my_failing")
        raise TypeError("Intentional error in my_failing")

    await try_step(my_failing)
```

Adapted (not in the official docs): the official snippet raises `NonRetryableError(message)` with an undefined `message`; a literal string is used.

```python
from workers.workflows import NonRetryableError

raise NonRetryableError("event payload was invalid")
```

```sh
npx wrangler@latest dev
npx wrangler@latest deploy
```

## Options / Props

`step.do(name=None, *, concurrent=False, config=None)` (decorator; all parameters except `name` are keyword-only):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | `str` | function name (`func.__name__`) | Step name |
| concurrent | `bool` | `False` | Whether dependencies for this step can run concurrently |
| config | `dict` (a `WorkflowStepConfig`) | — | Retry/timeout behaviour; the dict must respect `WorkflowStepConfig` |

Other step methods:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `step.sleep(name, duration)` | method | — | `duration` is a number in milliseconds or a `WorkflowDuration`-compatible string |
| `step.sleep_until(name, timestamp)` | method | — | `timestamp` is a `datetime.datetime` or seconds from the Unix epoch |
| `step.wait_for_event(name, event_type, timeout="24 hours")` | method | `timeout` 24 hours | Wait for an event of `event_type` |

`event` dictionary keys: `payload`, `timestamp`, `instanceId`, `workflowName`.

`ctx` dictionary keys (injected into a parameter named `ctx`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| step | `dict` | — | `name` and `count` (how many times `step.do` was called with this name) |
| attempt | `int` | — | Current attempt (1-indexed) |
| config | `dict` | — | Resolved retry and timeout configuration |

## Notes

- Add both `python_workers` and `python_workflows` compatibility flags. Python Workflows requires `compatibility_date` `2025-08-01` or later (stated on the bindings page).
- The decorator does not run the step; call the returned callable (`await my_first_step()`) to execute it. Returned state must be serializable.
- Dependencies are resolved implicitly by parameter name: a parameter matching a previously declared step function receives that step's result. The older `depends=[...]` form remains supported for compatibility; prefer parameter names. See [python-dag.md](./python-dag.md).
- Some built-in Python errors (`ValueError`, `TypeError`) are re-instantiated correctly across the RPC layer; user-defined and other built-in exceptions are not, so catch them with `Exception`.
- `env` is a JavaScript object exposed through JsProxy; binding methods mirror the JavaScript Workers API. See [python-bindings.md](./python-bindings.md). The Python SDK does not cover the diagram visualizer ([visualizer.md](./visualizer.md)).
- Python Workflows entered open beta on 2025-08-22 per [changelog.md](./changelog.md). More on Python Workers: https://developers.cloudflare.com/workers/languages/python/ .
- Adapted from the official docs: empty `run` body (`pass`), naive `sleep_until` time (UTC-aware), undefined `message` in `NonRetryableError`.
- The `Default.fetch` example creates a Workflow instance for every request; authenticate the route before deploying (see the bearer-token handler in [trigger-workflows.md](./trigger-workflows.md)). Raise `NonRetryableError` for permanent failures so they are not retried.

## Related

- [python-bindings.md](./python-bindings.md)
- [python-dag.md](./python-dag.md)
- [workflow-step.md](./workflow-step.md)
- [step-config-and-context.md](./step-config-and-context.md)
