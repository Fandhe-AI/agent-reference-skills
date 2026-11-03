---
source: https://developers.cloudflare.com/workers/languages/python/packages/fastapi/
---

# FastAPI on Python Workers

FastAPI runs on Python Workers using the built-in ASGI server (`workers.asgi`).

## Signature / Usage

`src/main.py`:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

from workers import asgi
Default = asgi.entrypoint(app)
```

`wrangler.jsonc`:

```jsonc
{
    "$schema": "node_modules/wrangler/config-schema.json",
	"name": "my-fastapi-app",
	"main": "src/main.py",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["python_workers"],
}
```

`pyproject.toml`:

```toml
[project]
name = "my-fastapi-app"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    "fastapi",
]

[dependency-groups]
dev = [
    "workers-py",
    "workers-runtime-sdk"
]
```

Run `uv run pywrangler dev`, then `curl http://localhost:8787/` returns `{"Hello": "World"}`.

## Notes

- Serving a frontend: use Workers Static Assets. Place build output in `./public/` and set an `assets` block with `binding` and `run_worker_first: true`, so API routes take priority. This is equivalent to FastAPI's `app.frontend()`, except files are served from Cloudflare's asset store via the `ASSETS` binding rather than the local filesystem or the Worker bundle.

```jsonc
{
	"name": "my-fastapi-app",
	"main": "src/worker.py",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["python_workers"],
	"assets": {
		"directory": "./public/",
		"binding": "ASSETS",
		"run_worker_first": true
	}
}
```

`src/worker.py` with a catch-all route proxying to the assets binding:

```python
from fastapi import FastAPI, Request
from fastapi.responses import Response
from workers import asgi

app = FastAPI()
Default = asgi.entrypoint(app)

@app.get("/api/hello")
async def api_hello():
    return {"message": "Hello from the API"}

# Catch-all: proxy everything else to Workers Static Assets.
# This is the Workers equivalent of app.frontend("/", directory="dist").
@app.get("/{path:path}")
async def frontend(path: str, request: Request):
    env = request.scope["env"]
    asset_url = f"https://assets.local/{path}"
    resp = await env.ASSETS.fetch(asset_url)
    body = await resp.bytes()
    return Response(content=body, status_code=resp.status, headers=resp.headers)
```

- Examples: `git clone https://github.com/cloudflare/python-workers-examples`, then `cd python-workers-examples/fastapi` and `uv run pywrangler dev`.

## Related

- [python-packages.md](./python-packages.md)
- [python-flask.md](./python-flask.md)
- [python-django.md](./python-django.md)
