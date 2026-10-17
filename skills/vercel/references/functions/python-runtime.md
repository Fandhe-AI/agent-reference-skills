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

- Framework presets are detected from `requirements.txt`, `pyproject.toml`, or `Pipfile`
- For Django, a `manage.py` that sets `DJANGO_SETTINGS_MODULE` is also detected (including in an immediate subdirectory); the app is resolved from `WSGI_APPLICATION` or `ASGI_APPLICATION`
- `[project.scripts] app = "module:variable"` is still supported for existing projects; use `tool.vercel.entrypoint` for new projects
- Streaming responses are supported
- No automatic tree-shaking: all files reachable at build time are bundled. Source is compiled to `.pyc` bytecode and included when space allows
- Standard bundle size limit is 500 MB uncompressed; Large Functions (public beta, Fluid compute) support up to 5 GB
- Relative paths in `open()` resolve against the project base directory, not the file's directory
- Existing projects can still define file-based functions in an `/api` directory (documented on a separate page `/docs/functions/runtimes/python/api-directory`)
- Python and a frontend can be combined in one project with Services

## Related

- [vercel-sdk-python.md](./vercel-sdk-python.md)
- [websockets.md](./websockets.md)
- [runtimes.md](./runtimes.md)
- [limitations.md](./limitations.md)
