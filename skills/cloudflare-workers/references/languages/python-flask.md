---
source: https://developers.cloudflare.com/workers/languages/python/packages/flask/
---

# Flask on Python Workers

Flask (WSGI) runs on Python Workers using the built-in WSGI server (`workers.wsgi`).

## Signature / Usage

`src/worker.py`:

```python
from flask import Flask
from workers import wsgi

app = Flask(__name__)

@app.get("/")
def index():
    return {"message": "Hello from Flask"}

Default = wsgi.entrypoint(app)
```

`wrangler.jsonc`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-flask-worker",
  "main": "src/worker.py",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": ["python_workers"]
}
```

`pyproject.toml`:

```toml
[project]
name = "flask-worker"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "flask",
]

[dependency-groups]
dev = [
    "workers-py",
    "workers-runtime-sdk",
]
```

Run `uv run pywrangler dev`; `curl http://localhost:8787/` returns `{"message":"Hello from Flask"}`.

## Notes

- Serving a frontend: use Workers Static Assets with `assets` (`directory`, `binding: "ASSETS"`, `run_worker_first: true`) so API routes take priority; files are not bundled into the Worker.

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-flask-worker",
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

Adapted (not in the official docs): the JS `Response` body and headers are converted to Python types (`bytes`, `dict`) before building the Flask `Response`; see Notes.

```python
from flask import Flask, Response, request
from pyodide.ffi import run_sync
from workers import wsgi

app = Flask(__name__)

@app.get("/api/hello")
def api_hello():
    return {"message": "Hello from the API"}

@app.get("/")
@app.get("/<path:path>")
def frontend(path=""):
    assets = request.environ["workers.env"].ASSETS
    asset_response = run_sync(assets.fetch(f"https://assets.local/{path}"))
    # asset_response is a JavaScript Response (JsProxy): convert body and headers.
    body = bytes(run_sync(asset_response.bytes()).to_py())
    headers = dict(asset_response.headers.entries())
    return Response(
        body,
        status=asset_response.status,
        headers=headers,
    )

Default = wsgi.entrypoint(app)
```

- Adapted from the official docs: `assets.fetch()` returns a JavaScript `Response` (a Pyodide `JsProxy`). The official snippet passed the JS body and `headers` object directly to Flask's `Response`, which expects Python `bytes` and a Python mapping. The snippet now converts the body with `.to_py()` (wrapped in `bytes()`) and the headers with `dict(asset_response.headers.entries())`. See python-ffi.md and https://pyodide.org/en/stable/usage/type-conversions.html.
- `run_sync` bridges the asynchronous asset operations into Flask's synchronous handler.
- Example: clone `cloudflare/python-workers-examples` and see `flask-todo` (README for instructions).

## Related

- [python-packages.md](./python-packages.md)
- [python-fastapi.md](./python-fastapi.md)
- [python-django.md](./python-django.md)
