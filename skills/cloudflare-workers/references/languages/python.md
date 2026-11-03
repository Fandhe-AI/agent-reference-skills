---
source: https://developers.cloudflare.com/workers/languages/python/
---

# Python Workers

Write Workers in 100% Python, with packages, a JavaScript FFI, and access to Workers bindings.

## Signature / Usage

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response("Hello World!")
```

The `pywrangler` CLI (uv and Node must be installed):

```bash
uvx --from workers-py pywrangler init
uv run pywrangler dev
uv run pywrangler deploy
```

Templates:

```bash
uv run pywrangler init
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/hello
```

## Notes

- The main entry point is the `fetch` handler, placed in a `Default` class extending `WorkerEntrypoint` (imported from the `workers` SDK module).
- You must add the `python_workers` compatibility flag to your Worker.
- `pywrangler` (`cloudflare/workers-py`) is the CLI for running locally, installing packages, and deploying. `pywrangler init` creates a `pyproject.toml` with `workers-py` as a development dependency and a Wrangler config file.
- Supported: packages (FastAPI, Langchain, Pydantic and more), an FFI that exposes JavaScript objects and all Runtime APIs, and bindings (KV, D1, Durable Objects, Environment Variables, Secrets, Service Bindings, Workers AI, Vectorize, R2, Workflows, Queues).
- Python packaging with uv: see the uv skill.

## Related

- [python-basics.md](./python-basics.md)
- [python-how-it-works.md](./python-how-it-works.md)
- [python-packages.md](./python-packages.md)
- [python-stdlib.md](./python-stdlib.md)
- [python-ffi.md](./python-ffi.md)
- [python-examples.md](./python-examples.md)
