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

Adapted (not in the official docs): the asset request keeps the original method, headers, and query string (using the raw request target when the server provides one), and the JS `Response` body and headers are converted to Python types (`bytes`, `dict`) before building the Flask `Response`; see Notes.

```python
from urllib.parse import quote

import js
from flask import Flask, Response, request
from pyodide.ffi import run_sync, to_js
from workers import wsgi

app = Flask(__name__)

@app.get("/api/hello")
def api_hello():
    return {"message": "Hello from the API"}

@app.get("/")
@app.get("/<path:path>")
def frontend(path=""):
    assets = request.environ["workers.env"].ASSETS
    # Keep the original method, headers (conditional/Range) and query string.
    # Prefer the raw request target (path + query) when the WSGI server provides it;
    # otherwise re-quote the decoded path (percent-encoded slashes may be lost).
    raw_uri = request.environ.get("RAW_URI") or request.environ.get("REQUEST_URI")
    if raw_uri:
        asset_url = f"https://assets.local{raw_uri}"
    else:
        asset_url = f"https://assets.local{quote(request.path)}"
        if request.query_string:
            asset_url += f"?{request.query_string.decode()}"
    asset_request = js.Request.new(
        asset_url,
        to_js(
            {"method": request.method, "headers": dict(request.headers.items())},
            dict_converter=js.Object.fromEntries,
        ),
    )
    asset_response = run_sync(assets.fetch(asset_request))
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
- Adapted from the official docs: the official snippet called `assets.fetch()` with a URL built from the decoded `path` parameter, which drops the query string, the request method and headers (conditional `If-None-Match`, `Range`) and can corrupt percent-encoded characters. The snippet now builds a JS `Request` (via `to_js` with `dict_converter=Object.fromEntries`, see python-ffi.md) from the raw request target (`RAW_URI` or `REQUEST_URI` in the WSGI environ, path plus query) when present, otherwise from the re-quoted `request.path` and the raw query string, together with the method and headers. The host `assets.local` is a placeholder; only the path and query matter to the assets binding.
- Limitation: WSGI's `PATH_INFO` (`request.path`) is already percent-decoded, so `quote(request.path)` cannot recover an encoded slash (`%2F`) and such paths may be altered when the server provides no raw URI. This page does not guarantee exact path preservation under WSGI; for exact paths use the ASGI form (see python-fastapi.md) or forward requests to the assets binding without a framework.
- HEAD: Flask automatically adds HEAD to routes registered for GET, so the `@app.get` routes shown also answer HEAD requests, and the asset request keeps `request.method`.
- `run_sync` bridges the asynchronous asset operations into Flask's synchronous handler.
- Example: clone `cloudflare/python-workers-examples` and see `flask-todo` (README for instructions).

## Related

- [python-packages.md](./python-packages.md)
- [python-fastapi.md](./python-fastapi.md)
- [python-django.md](./python-django.md)
