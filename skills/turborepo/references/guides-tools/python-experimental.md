# Python (experimental support)

Detects uv workspace members as Turborepo packages, builds the dependency graph, and maps tasks to uv commands. Package resolution, environment setup, and installs are still handled by uv; uv is currently the only supported Python package manager.

## Usage

Enable:

```json
{
  "futureFlags": {
    "experimentalPythonWorkspaces": true
  }
}
```

Prerequisites:

- `turbo` / `uv` must be resolvable on `PATH`
- Root `pyproject.toml` with a `[tool.uv.workspace]` table
- A valid `[tool.turbo] name` for the synthesized package representation
- A `uv.lock` at the root

```toml
[tool.turbo]
name = "acme-python"

[tool.uv.workspace]
members = ["packages/*"]
```

Built-in tasks:

| Task | Command |
| --- | --- |
| `build` | `uv build --package=<name>` |

Auto-detected quality-tool tasks:

- Ruff: `lint:ruff`, `format:ruff`
- Black: `format:black`
- mypy: `check:mypy`
- Pyright: `check:pyright`
- ty: `check:ty`

Fallback when no tool is detected: `format` runs `uv format -- <member-dir>`, `check` runs `uv check --package=<name>`.

## Notes

- Built-in uv-command tasks are non-cached by default because uv/Python/tool/isolated-build-backend identity is not yet part of the hash; opting into caching requires pinning toolchain versions. Hash inputs include member source files, root config files, environment variables, and the dependency closure resolved from `uv.lock`.
- Only the root uv workspace is detected; standalone projects are not modeled.
- Turborepo does not create or update `uv.lock` (run `uv lock` explicitly).
- Local path dependencies and editable dependencies must be workspace members.
- Synthesized workspace packages have no directory and cannot be pruned.
- Tool detection is limited to 5 tools; anything else requires manual configuration.
- Tool version, Python interpreter, and build-backend identity are not yet hashed.

## Related

- [Rust (experimental support)](./rust-experimental.md)
