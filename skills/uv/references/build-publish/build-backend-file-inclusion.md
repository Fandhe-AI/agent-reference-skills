---
source: https://docs.astral.sh/uv/concepts/build-backend/#file-inclusion-and-exclusion
---

# Build backend file inclusion

How the uv build backend determines which files in a source tree are packaged into the source distribution and the wheel.

## Signature / Usage

```toml
[tool.uv.build-backend]
source-include = ["tests/**"]
source-exclude = ["*.bin"]
wheel-exclude = ["*.bin"]
```

To determine which files to include in a source distribution, uv first adds the included files and directories, then removes the excluded files and directories. Exclusions always take precedence over inclusions. By default, uv excludes `__pycache__`, `*.pyc`, and `*.pyo`.

## Source distribution

Included:

- The `pyproject.toml`, rewritten using TOML 1.0-compatible syntax. The original file is also included as `pyproject.toml.orig`.
- The module under `tool.uv.build-backend.module-root`.
- The files referenced by `project.license-files` and `project.readme`.
- All directories under `tool.uv.build-backend.data`.
- All files matching patterns from `tool.uv.build-backend.source-include`.

From these, items matching `tool.uv.build-backend.source-exclude` and the default excludes are removed.

## Wheel

Included:

- The module under `tool.uv.build-backend.module-root`.
- The files referenced by `project.license-files`, which are copied into the `.dist-info` directory.
- The `project.readme`, which is copied into the project metadata.
- All directories under `tool.uv.build-backend.data`, which are copied into the `.data` directory.

From these, `source-exclude`, `wheel-exclude` and the default excludes are removed. The source dist excludes are applied to avoid source tree to wheel builds including more files than source tree to source distribution to wheel build.

There are no specific wheel includes. There must only be one top level module, and all data files must either be under the module root or in the appropriate data directory. Most packages store small data in the module root alongside the source code.

## Include and exclude syntax

- Includes are anchored: `pyproject.toml` includes only `<root>/pyproject.toml` and not `<root>/bar/pyproject.toml`. To recursively include all files under a directory, use a `/**` suffix, e.g. `src/**`. Recursive inclusions are also anchored, e.g., `assets/**/sample.csv` includes all `sample.csv` files in `<root>/assets` or any of its children.
- Excludes are not anchored: `__pycache__` excludes all directories named `__pycache__` regardless of its parent directory. All children of an exclusion are excluded as well. To anchor a directory, use a `/` prefix, e.g., `/dist` will exclude only `<root>/dist`.
- All fields accepting patterns use the reduced portable glob syntax from PEP 639, with the addition that characters can be escaped with a backslash.

## Notes

- For performance and reproducibility, avoid patterns without an anchor such as `**/sample.csv`.
- When using the uv build backend through a frontend that is not uv, such as pip or `python -m build`, debug logging can be enabled with `RUST_LOG=uv=debug` or `RUST_LOG=uv=verbose`. When used through uv, the uv build backend shares the verbosity level of uv.

## Related

- [Build backend](./build-backend.md)
- [Build backend modules](./build-backend-modules.md)
- [Build backend settings](./build-backend-settings.md)
