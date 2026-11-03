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

Adapted (not in the official docs): the route accepts GET and HEAD, the asset request keeps the original method, headers, query string, and the percent-encoded path (`raw_path`), and the JS `Response` body and headers are converted to Python types (`bytes`, `dict`) before building the FastAPI `Response`; see Notes.

```python
import js
from fastapi import FastAPI, Request
from fastapi.responses import Response
from pyodide.ffi import to_js
from workers import asgi

app = FastAPI()
Default = asgi.entrypoint(app)

@app.get("/api/hello")
async def api_hello():
    return {"message": "Hello from the API"}

# Catch-all: proxy everything else to Workers Static Assets.
# This is the Workers equivalent of app.frontend("/", directory="dist").
@app.api_route("/{path:path}", methods=["GET", "HEAD"])
async def frontend(path: str, request: Request):
    env = request.scope["env"]
    # Keep the original method, headers (conditional/Range) and query string.
    # Use the percent-encoded path bytes from the ASGI scope (raw_path);
    # do not build the URL from the decoded `path` parameter.
    asset_url = f"https://assets.local{request.scope['raw_path'].decode('latin-1')}"
    if request.url.query:
        asset_url += f"?{request.url.query}"
    asset_request = js.Request.new(
        asset_url,
        to_js(
            {"method": request.method, "headers": dict(request.headers.items())},
            dict_converter=js.Object.fromEntries,
        ),
    )
    resp = await env.ASSETS.fetch(asset_request)
    # resp is a JavaScript Response (JsProxy): convert body and headers to Python types.
    body = bytes((await resp.bytes()).to_py())
    headers = dict(resp.headers.entries())
    return Response(content=body, status_code=resp.status, headers=headers)
```

- Adapted from the official docs: `env.ASSETS.fetch()` returns a JavaScript `Response` (a Pyodide `JsProxy`). The official snippet passed `resp.headers` (a JS `Headers` object) straight to FastAPI's `Response`, which expects a Python mapping. The snippet now converts the body with `.to_py()` (wrapped in `bytes()`) and the headers with `dict(resp.headers.entries())`. See python-ffi.md and https://pyodide.org/en/stable/usage/type-conversions.html for JS-to-Python conversion.
- Adapted from the official docs: the official snippet called `env.ASSETS.fetch()` with a URL built from the decoded `path` parameter, which drops the query string, the request method and headers (conditional `If-None-Match`, `Range`) and can corrupt percent-encoded characters (for example `%2F`). The snippet now registers the catch-all with `@app.api_route("/{path:path}", methods=["GET", "HEAD"])` (the official `@app.get` route does not match HEAD requests) and builds a JS `Request` (via `to_js` with `dict_converter=Object.fromEntries`, see python-ffi.md) from the ASGI scope's `raw_path` (the percent-encoded request path bytes, decoded as latin-1, so encoded slashes are preserved), the query string, method and headers. The host `assets.local` is a placeholder; only the path and query matter to the assets binding.
- Examples: `git clone https://github.com/cloudflare/python-workers-examples`, then `cd python-workers-examples/fastapi` and `uv run pywrangler dev`.

## Related

- [python-packages.md](./python-packages.md)
- [python-flask.md](./python-flask.md)
- [python-django.md](./python-django.md)
