---
source: https://docs.astral.sh/uv/guides/scripts/
---

# Scripts (PEP 723 inline metadata)

Run standalone Python scripts with uv; dependencies and the Python version can be declared in the script itself using PEP 723 inline script metadata.

## Signature / Usage

```python
# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "requests<3",
#   "rich",
# ]
# ///

import requests
from rich.pretty import pprint

resp = requests.get("https://peps.python.org/api/peps.json")
data = resp.json()
pprint([(k, v["title"]) for k, v in data.items()][:10])
```

```console
$ uv init --script example.py --python 3.12
$ uv add --script example.py 'requests<3' 'rich'
$ uv run example.py
```

## Options / Props

| Name | Description |
|------|-------------|
| `uv run <script>` | Run a script; arguments may follow the script name |
| `uv run -` | Read the script from stdin |
| `--no-project` | Skip installing the current project (must be provided _before_ the script name) |
| `--with <req>` | Request a dependency per invocation; repeat for multiple |
| `--python <version>` | Use a specific Python version, e.g. `uv run --python 3.10 example.py` |
| `uv init --script <file> --python <ver>` | Create a script with inline metadata |
| `uv add --script <file> <reqs>` | Add or update inline metadata dependencies |
| `uv add --index <url> --script <file> ...` | Add an index to the inline metadata |
| `uv lock --script <file>` | Lock script dependencies |

## Notes

- Scripts with only stdlib imports run with `uv run example.py`. In a project (a directory with `pyproject.toml`), `uv run` installs the current project before running the script; `--no-project` skips that. With `--with`, dependencies are included in addition to the project's dependencies.
- Requesting dependencies per invocation: `uv run --with rich example.py`, `uv run --with 'rich>12,<13' example.py`. Generally a project or inline metadata is recommended.
- Inline metadata: uv creates an environment with the necessary dependencies. With inline script metadata, the project's dependencies are ignored even when `uv run` is used in a project; `--no-project` is not required. The `dependencies` field must be provided even if empty. uv respects `requires-python` and downloads the Python version if not installed.
- Shebang for an executable script (`chmod +x greet`):

```python
#!/usr/bin/env -S uv run --script
#
# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx"]
# ///

import httpx

print(httpx.get("https://example.com"))
```

- Alternative index: `uv add --index "https://example.com/simple" --script example.py 'requests<3' 'rich'` writes `# [[tool.uv.index]]` / `# url = "https://example.com/simple"` into the metadata.
- Locking: scripts must be explicitly locked with `uv lock --script example.py`, creating an adjacent `example.py.lock`. Afterwards `uv run --script`, `uv add --script`, `uv export --script`, and `uv tree --script` reuse the locked dependencies, updating the lockfile if necessary. Without a lockfile, `uv export --script` still works but creates none.
- Reproducibility: `exclude-newer` in the `tool.uv` section of inline metadata limits uv to distributions released before an RFC 3339 timestamp:

```python
# /// script
# dependencies = [
#   "requests",
# ]
# [tool.uv]
# exclude-newer = "2023-10-16T00:00:00Z"
# ///
```

- GUI scripts: on Windows, scripts ending in `.pyw` run with `pythonw` (`uv run example.pyw`, `uv run --with PyQt5 example_pyqt.pyw`).
- Heredoc/stdin: `echo 'print("hello world!")' | uv run -`.

## Related

- [Running commands](./run.md)
- [Workspace metadata](./workspace-metadata.md)
- [Locking and syncing](./lock-sync.md)
