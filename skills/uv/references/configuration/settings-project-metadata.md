---
source: https://docs.astral.sh/uv/reference/settings/#project-metadata
---

# Settings: project metadata

Project-specific `[tool.uv]` settings (in `pyproject.toml`) and the `[tool.uv.workspace]` table. The `build-backend` settings are covered in the build-publish category.

## Signature / Usage

```toml
[tool.uv]
constraint-dependencies = ["grpcio<1.65"]
default-groups = ["docs"]
environments = ["sys_platform == 'darwin'"]

[tool.uv.workspace]
members = ["member1", "path/to/member2", "libs/*"]
exclude = ["member1", "path/to/member2", "libs/*"]
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build-constraint-dependencies` | `list[str \| dict]` | `[]` | Constraints to apply when solving build dependencies. A constraint does not trigger installation; the package must be requested elsewhere in the build dependency graph. Hashes can be included with a table of `requirement` and `hashes`; uv records them in `uv.lock`. |
| `conflicts` | `list[list[dict]]` | `[]` | Declare collections of extras or dependency groups that are mutually exclusive (e.g., `[[{ extra = "extra1" }, { extra = "extra2" }]]` or with `group`). Lets uv generate a universal resolution; installation fails if conflicting extras are activated together. |
| `constraint-dependencies` | `list[str]` | `[]` | Constraints to apply when resolving the project's dependencies. A constraint does not trigger installation on its own. |
| `default-groups` | `str \| list[str]` | `["dev"]` | The list of `dependency-groups` to install by default. Can be the literal `"all"` to default enable all groups. |
| `dependency-groups` | `dict` | `[]` | Additional settings for `dependency-groups`. Currently only adds `requires-python` constraints to groups. Cannot define groups; use the top-level `[dependency-groups]` table. |
| `dev-dependencies` | `list[str]` | `[]` | The project's development dependencies, installed by default in `uv run` and `uv sync`, not in published metadata. Not recommended anymore; use `dependency-groups.dev`. Both are combined to determine the `dev` group. |
| `environments` | `str \| list[str]` | `[]` | A list of supported environments against which to resolve dependencies. By default uv resolves for all possible environments in `uv lock`. Also respected by `uv pip compile --universal`. |
| `exclude-dependencies` | `list[str \| dict]` | `[]` | Dependencies to exclude when resolving, regardless of whether another package requests them. Can be limited to a package's dependencies via a table with `package` (`name`, optional `version`) and `dependencies`; version-specific entries take precedence over all-versions entries. |
| `index` | `dict` | `[]` | The indexes to use when resolving dependencies: a PEP 503 repository or a local directory in the same format. First-defined has highest priority and outranks `index_url` / `extra_index_url`. `explicit = true` restricts an index to dependencies that select it via `[tool.uv.sources]`; `default = true` moves it to lowest priority and disables the PyPI default index. |
| `managed` | `bool` | `true` | Whether the project is managed by uv. If `false`, uv ignores the project when `uv run` is invoked. |
| `minimum-libc-version` | `dict[str, str]` | `None` | Minimum libc versions to support when resolving for Linux (e.g., `{ glibc = "2.31" }`). Used with `required-environments`. Respected by `uv lock` and `uv pip compile --universal`. **In preview**: use `--preview-features minimum-libc-version` or `preview-features = ["minimum-libc-version"]`. |
| `override-dependencies` | `list[str \| dict]` | `[]` | Overrides to force selection of a specific version regardless of what other packages request. Unlike constraints (additive), overrides are absolute. Scoped overrides (`package` + `dependencies`) support registry version specifiers only; direct URL, path, Git sources and explicit indexes are not supported. |
| `package` | `bool` | `true` | Whether the project is a Python package or a non-package ("virtual") project. Packages are built and installed in editable mode and need a `build-system`; virtual projects only have their dependencies installed. |
| `required-environments` | `str \| list[str]` | `[]` | Required platforms for packages that lack source distributions. `environments` limits the set of environments considered; `required-environments` expands the platforms uv must support (fails if no wheel exists for them). |
| `sources` | `dict` | `{}` | Additional sources (Git repository, URL, local path, alternative registry) for dependency metadata, incorporated during development. See the dependencies pages. |
| `workspace.exclude` | `list[str]` | `[]` | Packages to exclude as workspace members. If a package matches both `members` and `exclude`, it is excluded. Supports globs and explicit paths. |
| `workspace.members` | `list[str]` | `[]` | Packages to include as workspace members. Supports globs and explicit paths. |

Example usage (from the reference):

```toml
[tool.uv]
# build-constraint-dependencies
build-constraint-dependencies = ["setuptools==60.0.0"]

# conflicts
conflicts = [
    [
        { extra = "extra1" },
        { extra = "extra2" },
    ]
]

# dev-dependencies
dev-dependencies = ["ruff==0.5.0"]

# exclude-dependencies
exclude-dependencies = [
    "werkzeug",
    { package = { name = "flask", version = "3.0.0" }, dependencies = ["itsdangerous"] },
]

# override-dependencies
override-dependencies = [
    "werkzeug==2.3.0",
    { package = { name = "flask", version = "3.0.0" }, dependencies = ["itsdangerous==2.1.2"] },
]

# package / managed
package = false
managed = false

# required-environments
required-environments = [
    "sys_platform == 'darwin' and platform_machine == 'arm64'",
    "sys_platform == 'linux' and platform_machine == 'x86_64'",
    "sys_platform == 'win32' and platform_machine == 'AMD64'",
]

# dependency-groups
[tool.uv.dependency-groups]
my-group = {requires-python = ">=3.12"}

# sources
[tool.uv.sources]
httpx = { git = "https://github.com/encode/httpx", tag = "0.27.0" }
pydantic = { path = "/path/to/pydantic", editable = true }
```

## Notes

- In `uv lock`, `uv sync`, and `uv run`, uv only reads `build-constraint-dependencies`, `constraint-dependencies`, `exclude-dependencies`, and `override-dependencies` from the `pyproject.toml` at the workspace root, ignoring declarations in other workspace members or `uv.toml` files.
- `tool.uv.dev-dependencies` is no longer recommended (use the standardized `dependency-groups.dev`).
- `workspace.members` / `workspace.exclude` define uv workspaces of Python packages; unrelated to Cargo workspaces and `Cargo.lock` (see rust) and to JS monorepo tooling (see turborepo, syncpack).

## Related

- [Configuration files](./configuration-files.md)
- [Settings: resolver](./settings-resolver.md)
- [Settings: indexes and network](./settings-index-network.md)
