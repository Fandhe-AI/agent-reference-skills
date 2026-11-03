---
source: https://developers.cloudflare.com/workers/languages/python/basics/
---

# Python Workers: The Basics

Fetch handler, `Request`, JSON responses, `env`, modules, types, and upgrading `pywrangler`.

## Signature / Usage

Read the request body and return a response (`request` is a JavaScript Request exposed through the FFI):

```python
from workers import WorkerEntrypoint, Response
from hello import hello

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        body = await request.json()
        name = body["name"]
        return Response(hello(name))
```

Return JSON:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        data = {"message": "Hello", "status": "ok"}
        return Response.json(data)
```

Access environment variables, secrets, and bindings via `self.env`:

```python
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response(self.env.API_HOST)
```

with this Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "hello-python-worker",
	"main": "src/entry.py",
	"compatibility_flags": [
		"python_workers"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"vars": {
		"API_HOST": "example.com"
	}
}
```

Modules: `src/hello.py` is imported by `src/entry.py`:

```python
def hello(name):
    return "Hello, " + name + "!"
```

```python
from hello import hello
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response(hello("World"))
```

Test with:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name": "Python"}' http://localhost:8787
```

## Notes

- Editing `src/entry.py` makes Wrangler / `pywrangler` restart the local dev server automatically.
- Types and autocompletion: the `workers-runtime-sdk` package is installed automatically with `pywrangler`; add it to `pyproject.toml` for IDE type hints:

```toml
dependencies = [
  "workers-runtime-sdk"
]
```

- `uv run pywrangler types` generates types from the Worker configuration: `Env` types for bindings and module rules, and runtime types from `compatibility_date` and `compatibility_flags`. (Source inconsistency: the sentence ends with a dangling "See" in the original.)
- Upgrade `pywrangler` globally with `uv tool upgrade workers-py`; in a project with `uv lock --upgrade-package workers-py`.

## Related

- [python.md](./python.md)
- [python-ffi.md](./python-ffi.md)
- [python-how-it-works.md](./python-how-it-works.md)
- [python-packages.md](./python-packages.md)
- [python-stdlib.md](./python-stdlib.md)
