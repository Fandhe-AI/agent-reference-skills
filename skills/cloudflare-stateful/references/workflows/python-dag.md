---
source: https://developers.cloudflare.com/workflows/python/dag/
---

# Python DAG Workflows

Define directed acyclic graph Workflows in Python declaratively: step function parameter names declare which earlier steps must complete first.

## Signature / Usage

```python
from workers import Response, WorkflowEntrypoint, WorkerEntrypoint

class PythonWorkflowStarter(WorkflowEntrypoint):
    async def run(self, event, step):
        async def await_step(fn):
            try:
                return await fn()
            except TypeError as e:
                print(f"Successfully caught {type(e).__name__}: {e}")

        await step.sleep('demo sleep', '10 seconds')

        @step.do()
        async def dep_1():
            # does stuff
            print('executing dep1')
            return 'dep1'

        @step.do()
        async def dep_2():
            # does stuff
            print('executing dep2')
            return 'dep2'

        @step.do(concurrent=True)
        async def final_step(dep_1, dep_2):
            # does stuff
            print(f'{dep_1} {dep_2}')

        await await_step(final_step)

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        await self.env.MY_WORKFLOW.create()
        return Response("Hello world!")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| concurrent | `bool` (keyword of `step.do`) | `False` | Let this step's dependencies resolve concurrently; an already completed dependency is skipped and its return value reused |

## Notes

- `dep_1` and `dep_2` run concurrently before `final_step`, which depends on both (diamond-shaped workflows).
- Dependencies come from parameter names matching earlier step functions. The older `depends=[...]` list is still supported for compatibility but not recommended for new Workflows.
- The `await_step` helper wraps the call in `try/except TypeError`; it is part of the official example, not required for DAGs.

## Related

- [python-sdk.md](./python-sdk.md)
- [python-bindings.md](./python-bindings.md)
