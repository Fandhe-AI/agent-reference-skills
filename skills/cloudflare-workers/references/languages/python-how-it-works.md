---
source: https://developers.cloudflare.com/workers/languages/python/how-python-workers-work/
---

# How Python Workers Work

Python Workers run on Pyodide (CPython compiled to WebAssembly) inside a V8 isolate; deploy-time snapshots reduce cold starts.

## Signature / Usage

A basic Python Worker and the Wrangler configuration pointing at it:

```python
from workers import Response, WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response("Hello world!")
```

Adapted (not in the official docs): adds the `python_workers` compatibility flag; see Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "hello-world-python-worker",
	"main": "src/entry.py",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["python_workers"]
}
```

## Notes

- Corrected from the official docs: the official configuration example omits `compatibility_flags`; Python Workers require the `python_workers` compatibility flag (see python.md), so it is added to the example.
- `uv run pywrangler dev` does: (1) determine the Pyodide version required by the compatibility date; (2) install packages from `pyproject.toml`; (3) create a new V8 isolate and inject Pyodide; (4) serve your Python code using Pyodide. No extra toolchain or precompilation step is needed.
- Deployment (`uv run pywrangler deploy`): (1) Wrangler uploads Python code and packages from `pyproject.toml` to the Workers API; (2) Cloudflare sends the code to the Workers runtime for validation; (3) a new V8 isolate is created with Pyodide injected; (4) the entrypoint module and everything it imports at top level are executed and a snapshot of the Worker's WebAssembly linear memory is taken (expensive initialization happens at deploy time); (5) the snapshot is deployed alongside the Python code. On each request the snapshot bootstraps the Worker in an isolate.
- Versions: a new Python release comes every August and a new Pyodide release six months later. Each new Pyodide version is gated behind a compatibility flag that takes effect only after a specified compatibility date. Each Python release has a five-year support window; existing Workers on versions outside the window keep working, but this is not recommended for new projects, no patches are provided, and performance degradation (higher latency or CPU time) cannot be ruled out.

## Related

- [python.md](./python.md)
- [python-stdlib.md](./python-stdlib.md)
- [python-examples.md](./python-examples.md)
