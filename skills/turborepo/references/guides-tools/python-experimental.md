# Python (experimental support)

Turborepo can discover the members of a uv workspace as packages, add their dependency relationships to the Package Graph, and map common Turborepo tasks to uv commands. uv is currently the only supported Python package manager.

## Usage

Enable in the root `turbo.json`:

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "futureFlags": {
    "experimentalPythonWorkspaces": true
  },
  "tasks": {}
}
```

Prerequisites (repository root):

- `uv` available on `PATH`
- A root `pyproject.toml` containing a uv workspace
- A valid `[tool.turbo].name` for identity in Turborepo's graph
- A root `uv.lock`; Turborepo never creates or updates it (run `uv lock`)

```toml
[tool.turbo]
name = "acme-python"

[tool.uv.workspace]
members = ["packages/*"]
```

Every `packages/*/pyproject.toml` becomes a member, identified by its PEP 503-normalized project name. Two package types:

- Member packages: Package Graph nodes (filtering and affectedness follow Python dependency relationships); expose verification tasks, and buildable members (a `[build-system]` table or `[tool.uv] package = true`) also expose `build`.
- The root workspace package: uses `[tool.turbo] name`, depends on every member, and runs verification tasks across the whole uv workspace.

Both can be `--filter` / `--affected` targets.

## Options / Props

Built-in tasks:

| Package | Turbo task | uv command |
| --- | --- | --- |
| Buildable member | `turbo build` | `uv build --package=<name>` |
| Any member | `turbo format` | `uv format -- <member-dir>` |
| Any member | `turbo check` | `uv check --frozen --package=<name>` |
| Workspace package | `turbo format` | `uv format -- <member-dirs...>` |
| Workspace package | `turbo check` | `uv check --frozen --all-packages` |

Detected tools (declared in `[project].dependencies`, `[dependency-groups]`, or `[tool.uv].dev-dependencies`) replace the `format` / `check` fallbacks above:

| Declared tool | Turbo task | uv command |
| --- | --- | --- |
| Ruff | `turbo lint`, `turbo lint:ruff` | `uv run --active --frozen --package <name> ruff check <dir>` |
| Ruff | `turbo format`, `turbo format:ruff` | `uv run --active --frozen --package <name> ruff format <dir>` |
| Black | `turbo format`, `turbo format:black` | `uv run --active --frozen --package <name> black <dir>` |
| mypy | `turbo check`, `turbo check:mypy` | `uv run --active --frozen --package <name> mypy <dir>` |
| ty | `turbo check`, `turbo check:ty` | `uv run --active --frozen --package <name> ty check <dir>` |
| Pyright | `turbo check`, `turbo check:pyright` | `uv run --active --frozen --package <name> pyright <dir>` |
| pytest | `turbo test` | `uv run --active --frozen --package <name> pytest <dir>` |

Passing uv arguments: arguments after `--` go to the mapped command; for detected tools Turborepo inserts them before the member directory targets. `lint` and `check` reject arguments (they may fan out to several tools); run the qualified task named in the error instead. Arguments to `build` are appended to `uv build --package=<name>` and disable automatic output detection (options such as `--out-dir` can relocate artifacts).

```bash
turbo run lint:ruff --filter=py-api -- --fix
turbo run test --filter=py-api -- -k smoke
turbo run check:mypy --filter=py-api -- --strict
turbo run format -- --check
```

Your own tasks: enable `experimentalTaskCommand` and set `command` (an argument array run directly without a shell):

```json
{
  "futureFlags": {
    "experimentalPythonWorkspaces": true,
    "experimentalTaskCommand": true
  },
  "tasks": {
    "acme-python#docs": { "command": ["uv", "run", "--frozen", "mkdocs", "build"] },
    "py-api#lint": { "command": ["uv", "run", "--frozen", "--package", "py-api", "ruff", "check", "--select", "ALL"] }
  }
}
```

## Notes

- uv support is experimental and can change at any time; feedback goes to the Python RFC (vercel/turborepo discussion 13625).
- Tools declared in the root `pyproject.toml` apply to every member unless a member declares its own tool for that role; root-declared tools run once without `--package`. `lint` and `check` run every detected tool for the role; `format` runs one formatter, preferring Ruff over Black. A root pytest declaration creates one repository-wide `test` task (`uv run --active --frozen --all-packages pytest`, installing src-layout members before collection); a member declaration creates `test` for that member only; both scopes run if both declare pytest. Without a declared type checker, `check` runs uv's bundled ty.
- Zero-configuration hashing uses: the member's source files (plus internal dependency sources for `check` and `test`); every member's sources for workspace-package verification and the whole repository for a root pytest task; root uv files (`pyproject.toml`, `uv.toml`, `.python-version`) and supported tool config (`ruff.toml`, `mypy.ini`, `pyrightconfig.json`, `pytest.ini`, `ty.toml`; Ruff and pytest config including `conftest.py` in directories between the root and a member are included); relevant uv and pip environment variables; the resolved external dependency closure from `uv.lock` scoped to each member; and the uv and Python interpreter identities (if unresolvable, tasks stay runnable but implicit caching is disabled with a warning).
- Automatic inputs exclude `.venv`, `__pycache__`, and tool caches (`.ruff_cache`, `.mypy_cache`, `.pytest_cache`) at any depth. `format` tasks default to uncached (they mutate sources). The built-in `uv check` is cacheable when uv and Python can be identified.
- Project-specific inputs must be declared manually: environment variables read by tools in `env`, extra file inputs in `inputs` (with `$TURBO_DEFAULT$` to keep the defaults).
- Output caching stores only the sdist and wheel that a bare `uv build` writes to the workspace `dist/` directory, not `.venv`. Builds whose only build requirement is `uv_build` are cacheable by default; other PEP 517 backends default to `cache: false` (uv resolves their isolated build dependencies independently of `uv.lock`) and need an explicit `cache: true` plus `outputs` as needed.

## Related

- [Rust (experimental support)](./rust-experimental.md)
- [Go (experimental support)](./go-experimental.md)
- [Multi-language support](../guides/multi-language.md)
