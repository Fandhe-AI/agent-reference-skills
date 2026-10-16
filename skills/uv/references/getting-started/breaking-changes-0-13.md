---
source: https://github.com/astral-sh/uv/blob/0.13.1/CHANGELOG.md
---

# Breaking changes in 0.13.0

uv 0.13.0 (released 2026-10-09) makes Python 3.15 the default stable Python version and includes several breaking changes. Most users are expected to upgrade without changes.

## Signature / Usage

Opt out of the new default Python and keep 3.14:

```console
$ uv venv --python 3.14
$ uv python pin 3.14
```

Update an upper bound on `uv_build` in `[build-system]` to allow 0.13:

```text
uv_build>=0.13.0,<0.14
```

## Overview

Not a breaking change, but this release updates the format of many cache entries to improve performance. uv may download or rebuild dependencies after upgrading, because some cached entries from earlier versions cannot be reused. Multiple versions of uv can still safely share the same cache directory.

There are no breaking changes to the configuration of the uv build backend. If your `[build-system]` table includes an upper bound on `uv_build`, update it to allow `uv_build` 0.13, e.g., `uv_build>=0.13.0,<0.14`.

## Breaking changes

**Use Python 3.15 as the default stable version.** The default stable Python version changed from 3.14 to 3.15. This affects Python downloads when no version is requested or pinned, e.g., `uv python install`. uv continues to use compatible Python installations already present (e.g., `uv venv` can still use an installed Python 3.14). If no suitable interpreter is installed and automatic downloads are enabled, commands such as `uv venv` and `uvx python` can now download Python 3.15. Opt out by requesting Python 3.14 explicitly, e.g., `uv venv --python 3.14`; for projects, use `uv python pin 3.14` to record the version in `.python-version`.

**Honor `--require-hashes` in included constraints files** (#22275). Previously, uv ignored `--require-hashes` in constraints files included with `-c` from a requirements file. Now uv honors the directive and requires hashes for all requirements in the installation. Installs that previously succeeded can now fail if a requirement is missing a hash. You cannot opt out while the directive is present. Add the missing hashes, or remove the `--require-hashes` directive from the included constraints file if hash checking is not intended.

**Prefer native Python on Windows ARM64** (#22100). Previously, ARM64 builds of uv preferred emulated `x86_64` Python installations because native wheel support was limited. Now uv prefers native ARM64 (`aarch64`) interpreters across Python versions. When a native interpreter is unavailable, uv falls back to `x86_64`, then 32-bit `x86`. Opt out by setting `UV_PYTHON_ARCH=x86_64` or requesting an explicit architecture, e.g., `cpython-3.14-windows-x86_64`. With `setup-uv`, set `python-arch: x86_64` instead.

**Reject editable requirements in included constraints files** (#22282). Previously, uv silently ignored editable (`-e`) requirements in constraints files included with `-c` from a requirements file. Now uv rejects them with an error, matching pip's behavior. You cannot opt out. Move editable requirements to a requirements file passed with `-r`, or pass them directly with `--editable`.

**Omit the distutils startup patch on Python 3.10 and later** (#22096). Previously, uv installed `_virtualenv.py` and `_virtualenv.pth` into every new virtual environment to prevent distutils configuration from changing installation paths. Now, like `virtualenv` 21.6.0, uv omits these files on Python 3.10 and later. Python 3.9 and earlier retain the patch. You cannot opt out. Existing virtual environments are not modified automatically; recreate an environment with Python 3.10 or later to remove the patch. This stabilizes the `no-distutils-patch` preview feature.

**Treat requirement-file option values as single paths** (#22290). Previously, uv split values passed to `--constraint`, `--override`, `--exclude`, and `--build-constraint` on spaces, even when quoted. Now each value is a single path, allowing file paths containing spaces. You cannot opt out. Repeat the option to provide multiple files, e.g., replace `-c "a.txt b.txt"` with `-c a.txt -c b.txt`. Space-separated lists in `UV_CONSTRAINT`, `UV_OVERRIDE`, `UV_EXCLUDE`, and `UV_BUILD_CONSTRAINT` remain supported.

**Use `tar-codec` for tar archives by default** (#22094). Previously, uv used `astral-tokio-tar` to extract tar archives, build source distributions with `uv_build`, and read their metadata for `uv publish`. Now uv uses `tar-codec`, which applies stricter validation when reading archives. uv may now reject archives containing hard links or unsupported tar extensions that previous versions accepted, and source distributions created by `uv_build` can have different archive bytes and hashes. Opt out by setting `UV_LEGACY_TAR_BACKEND=1`. This stabilizes the `tar-codec` preview feature.

**Reject `uv build --clear` output directories that contain a build source** (#22276). Previously, `uv build --clear` could delete a project or input source distribution when the output directory contained the source. Now uv rejects these output directories, including equivalent paths reached through symlinks, before clearing any build output. Select an output directory that does not contain any build sources, or omit `--clear`.

## Notes

- Python added in 0.13.0: CPython 3.15.0. Preview feature added: `--require-build-hashes` requires hashes for build dependencies, including transitive dependencies (#21411).
- 0.13.1 (released 2026-10-14) adds CPython 3.16.0a1 and ignores `Requires-Python` upper bounds in `uv pip check` and `uv pip install --strict`; Python 3.15-based uv Docker images are published under stable tags.
- Cache versions are internal to uv and may change in minor or patch releases.

## Related

- [Versioning policy](./versioning-policy.md)
- [Installing uv](./installation.md)
