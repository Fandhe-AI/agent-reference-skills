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
    body = run_sync(asset_response.bytes())
    return Response(
        body,
        status=asset_response.status,
        headers=asset_response.headers,
    )

Default = wsgi.entrypoint(app)
```

- `run_sync` bridges the asynchronous asset operations into Flask's synchronous handler.
- Example: clone `cloudflare/python-workers-examples` and see `flask-todo` (README for instructions).

## Related

- [python-packages.md](./python-packages.md)
- [python-fastapi.md](./python-fastapi.md)
- [python-django.md](./python-django.md)
