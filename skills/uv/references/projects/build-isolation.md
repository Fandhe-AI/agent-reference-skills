---
source: https://docs.astral.sh/uv/concepts/projects/config/#build-isolation
---

# Build isolation

By default uv builds packages in isolated virtual environments alongside their declared build dependencies (PEP 517); two settings adjust this for incompatible packages.

## Signature / Usage

```toml
[project]
name = "project"
version = "0.1.0"
description = "..."
readme = "README.md"
requires-python = ">=3.12"
dependencies = ["cchardet"]

[tool.uv.extra-build-dependencies]
cchardet = ["cython"]
```

## Options / Props

| Name | Description |
|------|-------------|
| `tool.uv.extra-build-dependencies` | Augment the build dependencies of a package; entries may be `{ requirement = "torch", match-runtime = true }` |
| `tool.uv.extra-build-variables` | Build environment variables per package (e.g. `flash-attn = { FLASH_ATTENTION_SKIP_CUDA_BUILD = "TRUE" }`) |
| `tool.uv.no-build-isolation-package` / `--no-build-isolation-package` | Install a package without building it in an isolated environment |
| `tool.uv.dependency-metadata` | Provide package metadata upfront (`name`, `version`, `requires-dist`), avoiding a build during resolution |

## Notes

- Why: packages like `flash-attn` and `deepspeed` must build against the same PyTorch version installed in the project environment; `cchardet` requires `cython` but does not declare it as a build dependency.
- Two approaches: augment build dependencies, or disable build isolation for specific packages. Augmenting is recommended when possible: disabling requires the build dependencies to be installed in the project environment _prior_ to installing the package, causing more complex steps, extraneous packages, and difficulty reproducing the environment.

### Augmenting build dependencies

`match-runtime = true` ensures a build dependency matches the version installed in the project environment:

```toml
[project]
dependencies = ["flash-attn", "torch"]

[tool.uv.extra-build-dependencies]
flash-attn = [{ requirement = "torch", match-runtime = true }]

[tool.uv.extra-build-variables]
flash-attn = { FLASH_ATTENTION_SKIP_CUDA_BUILD = "TRUE" }
```

- `FLASH_ATTENTION_SKIP_CUDA_BUILD` lets `flash-attn` resolve from a pre-built wheel instead of building from source (which needs the CUDA development toolkit). If the CUDA toolkit is available during resolution, omitting it is recommended: setting it to `TRUE` can lead to an incompatible install if no compatible pre-built wheel exists for the target PyTorch version, GPU version, and platform.
- `deepspeed` follows the same pattern (`deepspeed = [{ requirement = "torch", match-runtime = true }]`); `deep_gemm` (with `tool.uv.sources` Git `https://github.com/deepseek-ai/DeepGEMM`) too. Pre-built `deepspeed`, `flash-attn`, `deep_gemm` wheels are available from the Astral GPU indexes.
- `extra-build-dependencies` and `extra-build-variables` are tracked in the uv cache; changes trigger a reinstall/rebuild of affected packages (e.g., upgrading `torch` rebuilds `flash-attn`).
- Distinct from GPU programming (see the nvidia-cuda and amd-rocm skills): these settings only control how uv builds Python packages.

### Dynamic metadata

`match-runtime = true` is only available for packages that declare static metadata; otherwise uv must build the package during resolution and cannot determine the build dependency version. For `axolotl` (no static metadata), specify the exact `torch` version:

```toml
[project]
dependencies = ["axolotl[deepspeed, flash-attn]", "torch==2.6.0"]

[tool.uv.extra-build-dependencies]
axolotl = ["torch==2.6.0"]
deepspeed = ["torch==2.6.0"]
flash-attn = ["torch==2.6.0"]
```

Older `flash-attn` versions without static metadata can supply metadata upfront:

```toml
[[tool.uv.dependency-metadata]]
name = "flash-attn"
version = "2.6.3"
requires-dist = ["torch", "einops"]
```

The `version` field is optional for registry-based dependencies (omitted means the metadata applies to all versions) but required for direct URL dependencies (like Git). Package requirements can typically be found in `setup.py` / `setup.cfg` of the repository or sdist.

### Disabling build isolation

Without isolation, build dependencies must be installed in the project environment before building:

```console
$ uv venv
$ uv pip install cython setuptools
$ uv pip install cchardet --no-build-isolation
```

uv simplifies this with `no-build-isolation-package` (setting or `--no-build-isolation-package` flag). For marked packages uv performs a two-phase install: packages that support build isolation first, then those that do not. If build dependencies are also project dependencies they are installed first.

```toml
[project]
dependencies = ["cchardet", "cython", "setuptools"]

[tool.uv]
no-build-isolation-package = ["cchardet"]
```

For `flash-attn` (`dependencies = ["flash-attn", "torch"]`), `torch` is installed first; as `torch` is both a project and build dependency, its version is consistent between build and runtime.

To keep build-only dependencies out of the environment, isolate them in an optional group and sync twice:

```toml
[project]
dependencies = ["cchardet"]

[project.optional-dependencies]
build = ["setuptools", "cython"]

[tool.uv]
no-build-isolation-package = ["cchardet"]
```

```console
$ uv sync --extra build
 + cchardet==2.1.7
 + cython==3.1.3
 + setuptools==80.9.0
$ uv sync
 - cython==3.1.3
 - setuptools==80.9.0
```

If build dependencies are needed even during resolution, install them first with `uv pip`:

```console
$ uv venv
$ uv pip install torch setuptools
$ uv sync
```

(with `dependencies = ["flash-attn"]` and `no-build-isolation-package = ["flash-attn"]`), or provide `dependency-metadata` upfront.

## Related

- [Configuring projects](./config.md)
- [Managing dependencies](./dependencies.md)
- [Building distributions](./build.md)
