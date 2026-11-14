# Python Runtime

Runs ASGI and WSGI applications on Vercel. Vercel detects supported Python frameworks (FastAPI, Flask, Django) and runs the app as Vercel Functions.

## Signature / Usage

```python
# app.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello from Python on Vercel"}

@app.get("/api/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```

```toml
# pyproject.toml — custom entrypoint (module:variable)
[tool.vercel]
entrypoint = "my_package.api:app"
```

## Entrypoints

Vercel looks for an entrypoint in:

- `app.py`, `index.py`, `server.py`, `main.py`, `wsgi.py`, or `asgi.py`
- the same filenames inside `src/` or `app/`
- the module path configured with `tool.vercel.entrypoint` in `pyproject.toml`

The entrypoint file must define one of these top-level names:

| Name | Used for |
|------|----------|
| `app` | Most ASGI or WSGI frameworks, including FastAPI and Flask |
| `application` | Django and other WSGI applications |

## Python version

| Version | Note |
|---------|------|
| 3.12 | default |
| 3.13 | |
| 3.14 | |

Set it with `pyproject.toml`, `.python-version`, or `Pipfile.lock`. If undefined or unsupported, the default is used.

## Dependencies

Define dependencies in `pyproject.toml` (with or without `uv.lock`), `requirements.txt`, or a `Pipfile` with `Pipfile.lock`.

## Bundling

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app.py": {
      "excludeFiles": "{tests/**,__tests__/**,**/*.test.py,**/test_*.py,fixtures/**,__fixtures__/**,testdata/**,sample-data/**,static/**,assets/**}"
    }
  }
}
```

## Notes

- Python bytecode: Vercel compiles Python source to `.pyc` during deployment builds and includes it in the bundle when space allows (no configuration)
- Official FastAPI example `pyproject.toml` uses `requires-python = ">=3.12"` and `dependencies = ["fastapi>=0.117.1"]`; a `requirements.txt` example is `fastapi==0.117.1`
- Migration guides exist for moving a FastAPI/Flask/Django API from Heroku, Render or Railway; guides exist for Vercel Queues, Blob, Connect, durable workflows, Sandbox and the AI SDK from Python (see the Vercel KB)
- `tool.vercel.entrypoint` is also the key used in `functions` in `vercel.json`
- Framework presets are detected from `requirements.txt`, `pyproject.toml`, or `Pipfile`
- For Django, a `manage.py` that sets `DJANGO_SETTINGS_MODULE` is also detected (including in an immediate subdirectory); the app is resolved from `WSGI_APPLICATION` or `ASGI_APPLICATION`
- `[project.scripts] app = "module:variable"` is still supported for existing projects; use `tool.vercel.entrypoint` for new projects
- Streaming responses are supported
- No automatic tree-shaking: all files reachable at build time are bundled. Source is compiled to `.pyc` bytecode and included when space allows
- Standard bundle size limit is 500 MB uncompressed; Large Functions (public beta, Fluid compute) support up to 5 GB
- Relative paths in `open()` resolve against the project base directory, not the file's directory
- Existing projects can still define file-based functions in an `/api` directory (documented on a separate page `/docs/functions/runtimes/python/api-directory`)
- Python and a frontend can be combined in one project with Services
- Source: https://vercel.com/docs/functions/runtimes/python (fetched 2026-11-14)

### Routing Middleware in Python

To redirect, rewrite, or answer requests before they reach the Python app, set `proxy` in `vercel.json` to a `module:attribute` entrypoint:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy:proxy"
  }
}
```

The middleware runs separately from the app, with only the packages in the `vercel.proxy` dependency group installed. See the Python reference of Routing Middleware (https://vercel.com/docs/routing-middleware/python-reference).

## Related

- [vercel-sdk-python.md](./vercel-sdk-python.md)
- [websockets.md](./websockets.md)
- [runtimes.md](./runtimes.md)
- [limitations.md](./limitations.md)
