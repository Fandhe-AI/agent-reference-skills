---
source: https://docs.astral.sh/uv/concepts/projects/run/
---

# Running commands

`uv run` runs a command in the project environment, ensuring the environment is up-to-date first.

## Signature / Usage

```console
$ uv run python -c "import example"
$ uv run example-cli foo
$ uv run bash scripts/foo.sh
$ uv run --with httpx==0.26.0 python -c "import httpx; print(httpx.__version__)"
```

## Notes

- The project is installed into the virtual environment at `.venv`, isolated from the current shell by default, so `python -c "import example"` fails outside `uv run`.
- The given command can be provided by the project environment or exist outside of it.
- `--with` includes a dependency for the invocation; the requested version is respected regardless of the project's requirements (even if the project requires `httpx==0.24.0`).
- Scripts that declare inline metadata run automatically in environments isolated from the project, with only the listed dependencies (see scripts.md):

```python
# /// script
# dependencies = [
#   "httpx",
# ]
# ///

import httpx

resp = httpx.get("https://peps.python.org/api/peps.json")
data = resp.json()
print([(k, v["title"]) for k, v in data.items()][:10])
```

- Legacy setuptools scripts on Windows (`.venv\Scripts`) are supported for `.ps1`, `.cmd`, and `.bat` extensions only; the extension may be omitted and uv looks for those extensions in that order: `uv run --with nuitka==2.6.7 -- nuitka --version`.
- Signal handling: uv does not cede control of the process to the spawned command, so it forwards some signals. On Unix, uv forwards most signals (except SIGKILL, SIGCHLD, SIGIO, and SIGPOLL); SIGINT is forwarded only if sent more than once or the child process group differs from uv's. On Windows, uv ignores Ctrl-C events, deferring handling to the child process.
- Distinct from task runners such as make: `uv run` executes a command inside the uv-managed Python environment and does not define targets or dependencies between tasks.

## Related

- [Locking and syncing](./lock-sync.md)
- [Structure and files](./layout.md)
- [Scripts (PEP 723 inline metadata)](./scripts.md)
