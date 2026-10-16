---
source: https://docs.astral.sh/uv/reference/troubleshooting/build-failures/
---

# Build failures

uv needs to build packages when there is not a compatible wheel available. Building packages can fail for many reasons, some of which may be unrelated to uv itself.

## Signature / Usage

Recognize a build failure by the prefix "The build backend returned an error", followed by the `[stderr]` (and `[stdout]`) of the build backend. The error logs are not from uv itself; the message following `╰─▶` may be a uv hint (not available for every failure).

```console
$ uv pip install -p 3.13 'numpy<1.20'
Resolved 1 package in 62ms
  × Failed to build `numpy==1.19.5`
  ├─▶ The build backend returned an error
  ╰─▶ Call to `setuptools.build_meta:__legacy__.build_wheel()` failed (exit status: 1)
```

## Confirming that a build failure is specific to uv

Build failures are usually related to your system and the build backend. Attempt to reproduce with pip:

```console
$ uv venv -p 3.13 --seed
$ source .venv/bin/activate
$ pip install --use-pep517 --no-cache --force-reinstall 'numpy==1.19.5'
```

If it is reproducible with another installer, investigate upstream, find a way to avoid building the package, or adjust your system. Include `--use-pep517` to match uv's build isolation behavior, and `--force-reinstall` and `--no-cache` when reproducing.

## Why does uv build a package?

- When generating the cross-platform lockfile, uv needs the dependencies of all packages, even those only installed on other platforms. It uses any wheel if one exists for that version, then tries static metadata in the source distribution (mainly `pyproject.toml` with static `project.version`, `project.dependencies` and `project.optional-dependencies`, or METADATA v2.2+). Only if all of that fails, it builds the package.
- When installing, uv needs a wheel for the current platform for each package. If no matching wheel exists in the index, uv tries to build the source distribution.
- Wheels with `...-py3-none-any.whl` filenames work everywhere; others have the operating system and platform in the filename.

## Common build failures

| Symptom | Resolution |
| --- | --- |
| Command is not found (e.g., `gcc`) | Install it with your system package manager, e.g., `apt install gcc`. With uv-managed Python versions, `clang` is commonly needed instead. `apt install build-essential` covers most common build dependencies on Debian / Ubuntu. |
| Header or library is missing (a `.h` file) | Install it with your system package manager, e.g., `apt install libgraphviz-dev` for `pygraphviz` (the `graphviz` package alone is not sufficient; development headers are required). For missing `Python.h`, install `python3-dev`. |
| Module is missing or cannot be imported | Consider disabling build isolation: pre-install the build dependencies, then use `--no-build-isolation-package`. |
| Old version of the package is built | Add a constraint with a lower bound (e.g., `numpy>=1.17`), or use `constraints.txt` / the `constraint-dependencies` setting for indirect dependencies. |
| Old version of a build dependency is used | Use the `build-constraint-dependencies` setting (or a `build-constraints.txt` file). |
| Package is only needed for an unused platform | Limit resolution to your supported platforms (`environments`). |
| Package does not support all Python versions | Use markers to split the requirement by Python version. |
| Package is only usable on a specific platform | Provide dependency metadata manually (`dependency-metadata`) to skip the build. uv cannot verify this information, so specify correct metadata. |

Module-missing example (build dependencies pre-installed, isolation disabled for one package):

```console
$ uv pip install pip setuptools
$ uv pip install chumpy --no-build-isolation-package chumpy
```

Build constraint example:

```toml
[tool.uv]
# Prevent setuptools version 72.0.0 from being used as a build dependency.
build-constraint-dependencies = ["setuptools!=72.0.0"]
```

Markers example for `numpy` (Python 3.8 to 3.13):

```
numpy>=1.23; python_version >= "3.10"
numpy<1.23; python_version < "3.10"
```

## Notes

- When disabling build isolation, install the missing package (e.g., `pip`) and all the other build dependencies of the package (e.g., `setuptools`).
- Changed in 0.13.0: `tar-codec` is used for extracting tar archives by default, with stricter validation (archives with hard links or unsupported tar extensions may be rejected). If a source distribution fails to extract after upgrading, `UV_LEGACY_TAR_BACKEND=1` opts out (environment variable added in 0.13.0).
- Fixed in 0.13.1: support restored for source distributions containing hard links or full-length tar user or group names.
- The troubleshooting section also links to a reproducible-examples page for reporting uv issues.

## Related

- [uv build](./uv-build.md)
- [Build backend](./build-backend.md)
- [Reproducible examples](../getting-started/reproducible-examples.md)
- [Breaking changes in 0.13.0](../getting-started/breaking-changes-0-13.md)
