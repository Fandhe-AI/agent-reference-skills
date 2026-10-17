---
source: https://docs.astral.sh/uv/concepts/projects/dependencies/#optional-dependencies
---

# Optional dependencies

Published optional dependencies ("extras") live in `[project.optional-dependencies]`; extras are requested with `package[<extra>]` syntax.

## Signature / Usage

```toml
[project]
name = "pandas"
version = "1.0.0"

[project.optional-dependencies]
plot = [
  "matplotlib>=3.6.3"
]
excel = [
  "odfpy>=1.4.1",
  "openpyxl>=3.1.0",
  "python-calamine>=0.1.7",
  "pyxlsb>=1.0.10",
  "xlrd>=2.0.1",
  "xlsxwriter>=3.0.5"
]
```

```console
$ uv add httpx --optional network
```

## Notes

- Libraries make some features optional to reduce the default dependency tree (e.g., Pandas has `excel` and `plot` extras). Extras are requested like `pandas[plot, excel]`.
- The table maps from extra name to its dependencies, following dependency specifiers syntax. Optional dependencies can have entries in `tool.uv.sources` the same as normal dependencies.
- Conflicting optional dependencies make resolution fail unless explicitly declared as conflicting (see conflicts-environments.md).
- Sources can apply only to a specific optional dependency using `extra`:

```toml
[project]
dependencies = []

[project.optional-dependencies]
cpu = [
  "torch",
]
gpu = [
  "torch",
]

[tool.uv.sources]
torch = [
  { index = "torch-cpu", extra = "cpu" },
  { index = "torch-gpu", extra = "gpu" },
]

[[tool.uv.index]]
name = "torch-cpu"
url = "https://download.pytorch.org/whl/cpu"

[[tool.uv.index]]
name = "torch-gpu"
url = "https://download.pytorch.org/whl/cu130"
```

- `uv sync` does not sync extras by default; use `--extra <name>` or `--all-extras` (see lock-sync.md).

## Related

- [Managing dependencies](./dependencies.md)
- [Dependency sources](./dependency-sources.md)
- [Conflicting dependencies and environments](./conflicts-environments.md)
- [Locking and syncing](./lock-sync.md)
