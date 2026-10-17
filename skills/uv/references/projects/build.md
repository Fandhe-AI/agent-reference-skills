---
source: https://docs.astral.sh/uv/concepts/projects/build/
---

# Building distributions

`uv build` builds source distributions (sdists) and wheels into `dist/`; uv acts as a build frontend and the backend decides the contents.

## Signature / Usage

```console
$ uv build
$ ls dist/
example-0.1.0-py3-none-any.whl
example-0.1.0.tar.gz
```

## Options / Props

| Name | Description |
|------|-------------|
| `uv build [path]` | Build the project in the given directory (default: current directory); output goes to `dist/` |
| `--sdist` | Build only a source distribution |
| `--wheel` | Build only a binary distribution |
| `--sdist --wheel` | Build both distributions from source |
| `--build-constraint <file>` | Constrain versions of build requirements |
| `--require-hashes` | With `--build-constraint`, enforce that requirements match known hashes |
| `--require-build-hashes` | Require hashes for every build dependency, including transitive ones (experimental) |

## Notes

- Python projects are typically distributed as both sdists (`.tar.gz` or `.zip` with source and metadata) and wheels (`.whl`, pre-built artifacts).
- uv only determines the Python version and invokes the build backend; included files and distribution filenames are determined by the backend as defined in `[build-system]`.
- By default `uv build` builds a source distribution first, then builds the wheel from that source distribution.
- Build constraints example with `constraints.txt`:

```text
setuptools==68.2.2 --hash=sha256:b454a35605876da60632df1a60f736524eb73cc47bbc9f3f1ef1b644de74fd2a
```

```console
$ uv build --build-constraint constraints.txt --require-hashes
```

- Project build dependency hashes: add hashes to `build-constraint-dependencies` in the workspace's `pyproject.toml`; constraints without hashes (e.g. `wheel<1`) are also allowed.

```toml
[tool.uv]
build-constraint-dependencies = [
    { requirement = "setuptools==68.2.2", hashes = ["sha256:b454a35605876da60632df1a60f736524eb73cc47bbc9f3f1ef1b644de74fd2a"] },
    "wheel<1",
]
```

- uv checks supplied hashes when it downloads pinned build dependencies. To require a hash for every build dependency, set `require-build-hashes = true` under `[tool.uv]` or pass `--require-build-hashes`. Pin each build dependency to an exact version (or direct URL) and provide a hash; hashes can come from URL fragments in `build-system.requires`, but not from requirements returned by a build backend.
- When build isolation is disabled, uv uses installed build dependencies without checking hashes, and does not recheck already-installed packages or previously built wheels. The bundled `uv_build` backend needs no hash because it is part of the uv executable.
- `--require-build-hashes` is experimental; use `--preview-features build-dependency-hashes` to suppress the warning.
- Preventing publish to PyPI: mark internal packages with a classifier; PyPI rejects the upload. It does not affect security or privacy settings on alternative registries. Generating only per-project PyPI API tokens is also recommended.

```toml
[project]
classifiers = ["Private :: Do Not Upload"]
```

## Related

- [Configuring projects](./config.md)
- [Build, editable and virtual dependencies](./build-editable-virtual-dependencies.md)
- [Exporting lockfiles](./export.md)
