---
source: https://docs.astral.sh/uv/reference/settings/#build-backend
---

# Build backend settings

Settings for the uv build backend (`uv_build`), under `[tool.uv.build-backend]`.

## Signature / Usage

```toml
[tool.uv.build-backend]
module-name = "sklearn"
module-root = ""
```

## Options / Props

All options that accept globs use the portable glob patterns from PEP 639. Anchors: `#build-backend_<setting>`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `dict[str, str]` | `{}` | Data includes for wheels. Each entry is a directory whose contents are copied to `<name>-<version>.data/(purelib\|platlib\|headers\|scripts\|data)` in the wheel and moved to the target location on installation. |
| `default-excludes` | `bool` | `true` | If `false`, the default excludes aren't applied. Default excludes: `__pycache__`, `*.pyc`, and `*.pyo`. |
| `module-name` | `str \| list[str]` | `None` | The name of the module directory inside `module-root`. Default is the package name with dots and dashes replaced by underscores. |
| `module-root` | `str` | `"src"` | The directory that contains the module directory. Common values are `src` (src layout) or an empty path (flat layout). |
| `namespace` | `bool` | `false` | Build a PEP 420 implicit namespace package, allowing more than one root `__init__.py`. |
| `source-exclude` | `list[str]` | `[]` | Glob expressions for files and directories to exclude from the source distribution. Also applied to wheels. |
| `source-include` | `list[str]` | `[]` | Glob expressions for files and directories to additionally include in the source distribution. `pyproject.toml` and the contents of the module directory are always included. |
| `wheel-exclude` | `list[str]` | `[]` | Glob expressions for files and directories to exclude from the wheel. |

## data

```toml
[tool.uv.build-backend]
data = { headers = "include/headers", scripts = "bin" }
```

- `scripts`: Installed to the directory for executables, `<venv>/bin` on Unix or `<venv>\Scripts` on Windows. This directory is added to `PATH` when the virtual environment is activated or when using `uv run`, so this data type can be used to install additional binaries. Consider using `project.scripts` instead for Python entrypoints.
- `data`: Installed over the virtualenv environment root. Warning: This may override existing files!
- `headers`: Installed to the include directory. Compilers building Python packages with this package as build requirement use the include directory to find additional header files.
- `purelib` and `platlib`: Installed to the `site-packages` directory. It is not recommended to use these two options.

## module-name

- Package names need to be valid Python identifiers, and the directory needs to contain a `__init__.py`. An exception are stubs packages, whose name ends with `-stubs`, with the stem being the module name, and which contain a `__init__.pyi` file.
- For namespace packages with a single module, the path can be dotted, e.g., `foo.bar` or `foo-stubs.bar`.
- For namespace packages with multiple modules, the path can be a list, e.g., `["foo", "bar"]`. Using a single module per package, splitting multiple packages into a workspace, is recommended.

```toml
[tool.uv.build-backend]
module-name = "sklearn"
```

## namespace

Use this option when the namespace package contains multiple root `__init__.py`; for namespace packages with a single root `__init__.py` use a dotted `module-name` instead. For example, `src/cloud/database/__init__.py` alone can be expressed with `module-name = "cloud.database"`, while a tree with three roots (`cloud.database`, `cloud.database_pro`, `billing.modules.database_pro`) requires `namespace = true`.

```toml
[tool.uv.build-backend]
namespace = true
```

## Notes

- These settings only apply when using the `uv_build` backend; other build backends (such as hatchling) have their own configuration.
- Using `module-name` runs the risk of creating two packages with different names but the same module names. Installing such packages together leads to unspecified behavior, often with corrupted files or directory trees.

## Related

- [Build backend](./build-backend.md)
- [Build backend modules](./build-backend-modules.md)
- [Build backend file inclusion](./build-backend-file-inclusion.md)
