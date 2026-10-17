---
source: https://docs.astral.sh/uv/guides/projects/
---

# Working on projects

Create a project, add dependencies, run commands in the project environment, and build distributions.

```console
$ uv init hello-world
$ cd hello-world
$ uv run hello-world
Hello from hello-world!

$ uv add requests
$ uv add 'requests==2.31.0'
$ uv remove requests
$ uv lock --upgrade-package requests

$ uv add flask
$ uv run -- flask run -p 3000

$ uv build
$ ls dist/
hello_world-0.1.0-py3-none-any.whl
hello_world-0.1.0.tar.gz
```

Import an existing `requirements.txt` with constraints:

```console
$ uv add -r requirements.txt -c constraints.txt
```

## Notes

- `uv.lock` is created or updated by `uv lock` (and implicitly by `uv run` / `uv sync`); the project virtual environment (`.venv`) is created by `uv run` or `uv sync`, not by `uv lock`. Commit `uv.lock`; do not edit it manually.
- `uv run` verifies that the lockfile matches `pyproject.toml` and that the environment matches the lockfile before every invocation. It does not remove extraneous packages by default.
- `uv version` reads the package version; `--short` prints the version only and `--output-format json` prints JSON.
