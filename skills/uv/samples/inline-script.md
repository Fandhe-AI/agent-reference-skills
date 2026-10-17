---
source: https://docs.astral.sh/uv/guides/scripts/
---

# Running scripts with inline metadata

Declare script dependencies with PEP 723 inline script metadata and run the script with `uv run`.

```console
$ uv add --script example.py 'requests<3' 'rich'
```

```python
# /// script
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
$ uv run example.py
```

Executable script with a shebang:

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

Lock the script's dependencies:

```console
$ uv lock --script example.py
```

## Notes

- `uv init --script example.py --python 3.12` creates a script with the inline metadata block.
- The `dependencies` field must be provided even if empty. Inline metadata makes uv ignore the project's dependencies, so `--no-project` is not required.
- `uv run --with rich example.py` requests dependencies per invocation instead; add `--no-project` to exclude the project's own dependencies.
- `uv lock --script` writes `example.py.lock` next to the script; later `uv run --script`, `uv add --script`, `uv export --script`, and `uv tree --script` reuse it.
