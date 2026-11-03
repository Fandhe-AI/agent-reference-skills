---
source: https://developers.cloudflare.com/workers/languages/python/packages/
---

# Python Workers: Packages

Pywrangler is a CLI wrapper for wrangler that sets up a full environment and bundles your packages into the Worker bundle on deployment.

## Signature / Usage

Create a `pyproject.toml`:

```toml
[project]
name = "YourProjectName"
version = "0.1.0"
description = "Add your description here"
requires-python = ">=3.13"
dependencies = [
    "fastapi"
]

[dependency-groups]
dev = [
	"workers-py",
	"workers-runtime-sdk"
]
```

Run locally and deploy:

```plaintext
uv run pywrangler dev
```

```plaintext
uv run pywrangler deploy
```

## Notes

- Dependencies are bundled with the Worker automatically on deployment.
- `pywrangler` supports all `wrangler` commands; run `uv run pywrangler --help` for the full list.
- Supported libraries: pure and PyEmscripten (PEP 783) Python packages on PyPI, plus packages included in Pyodide.
- WebAssembly support for Python packages is early; some packages lack PyEmscripten wheels on PyPI. Ask package maintainers for wheels, or start a thread in the Python Packages Discussions on the `cloudflare/workerd` GitHub repository.
- Python packaging with uv: see the uv skill.

## Related

- [python-fastapi.md](./python-fastapi.md)
- [python-flask.md](./python-flask.md)
- [python-django.md](./python-django.md)
- [python-langchain.md](./python-langchain.md)
- [python.md](./python.md)
