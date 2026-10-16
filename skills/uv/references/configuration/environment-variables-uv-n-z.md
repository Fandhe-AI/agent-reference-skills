---
source: https://docs.astral.sh/uv/reference/environment/
---

# Environment variables (UV_N-UV_Z)

uv defines and respects the following environment variables. This page covers `UV_NATIVE_TLS` through `UV_WORKING_DIR`.

## Signature / Usage

```console
$ UV_PYTHON_INSTALL_DIR=/opt/uv/python uv python install 3.13
$ UV_NO_CACHE=1 uv pip install ruff
```

## Options / Props

| Name | Added in | Description |
| --- | --- | --- |
| `UV_NATIVE_TLS` | 0.1.19 | Equivalent to `--native-tls`. If `true`, load TLS certificates from the platform's native certificate store instead of the bundled Mozilla root certificates. (Deprecated: use `UV_SYSTEM_CERTS` instead.) |
| `UV_NO_BINARY` | 0.5.30 | Equivalent to `--no-binary`. Install all packages from source. The resolver still uses pre-built wheels to extract package metadata, if available. |
| `UV_NO_BINARY_PACKAGE` | 0.5.30 | Equivalent to `--no-binary-package`. Do not use pre-built wheels for the given space-delimited list of packages. |
| `UV_NO_BUILD` | 0.1.40 | Equivalent to `--no-build`. Do not build source distributions. First-party packages, such as projects in the workspace, are still built. |
| `UV_NO_BUILD_ISOLATION` | 0.1.40 | Equivalent to `--no-build-isolation`. Skip isolation when building source distributions. |
| `UV_NO_BUILD_PACKAGE` | 0.6.5 | Equivalent to `--no-build-package`. Do not build source distributions for the given space-delimited list of packages. First-party packages are still built. |
| `UV_NO_CACHE` | 0.1.2 | Equivalent to `--no-cache`. Do not use the cache for any operations. |
| `UV_NO_CONFIG` | 0.2.30 | Equivalent to `--no-config`. Do not read any configuration files from the current directory, parent directories, or user configuration directories. |
| `UV_NO_DEFAULT_GROUPS` | 0.9.9 | Equivalent to `--no-default-groups`. Do not select the default dependency groups defined in `tool.uv.default-groups`. |
| `UV_NO_DEV` | 0.8.7 | Equivalent to `--no-dev`. Exclude development dependencies. |
| `UV_NO_EDITABLE` | 0.6.15 | Equivalent to `--no-editable`. Install or export any editable dependencies, including the project and any workspace members, as non-editable. |
| `UV_NO_ENV_FILE` | 0.4.30 | Ignore `.env` files when executing `uv run` commands. |
| `UV_NO_GITHUB_FAST_PATH` | 0.7.13 | Disable GitHub-specific requests that allow uv to skip `git fetch` in some circumstances. |
| `UV_NO_GROUP` | 0.9.8 | Equivalent to `--no-group`. Disable the specified dependency groups for the given space-delimited list of packages. |
| `UV_NO_HF_TOKEN` | 0.8.1 | Disable Hugging Face authentication, even if `HF_TOKEN` is set. |
| `UV_NO_INSTALLER_METADATA` | 0.5.7 | Skip writing `uv` installer metadata files (e.g., `INSTALLER`, `REQUESTED`, `direct_url.json`) to site-packages `.dist-info` directories. |
| `UV_NO_INSTALL_LOCAL` | 0.11.20 | Equivalent to `--no-install-local`. Skip the current project, workspace members, and any other local (path or editable) packages, installing only remote dependencies. |
| `UV_NO_INSTALL_PROJECT` | 0.11.20 | Equivalent to `--no-install-project`. Install the project's dependencies but not the project itself. |
| `UV_NO_INSTALL_WORKSPACE` | 0.11.20 | Equivalent to `--no-install-workspace`. Install workspace dependencies but not workspace members (including the current project). |
| `UV_NO_MANAGED_PYTHON` | 0.6.8 | Disable use of uv-managed Python versions. |
| `UV_NO_MODIFY_PATH` | 0.8.4 | Avoid modifying the `PATH` environment variable when installing uv using the standalone installer and `self update`. `INSTALLER_NO_MODIFY_PATH` is also supported as an alias. |
| `UV_NO_PROGRESS` | 0.2.28 | Equivalent to `--no-progress`. Disables all progress output (spinners, progress bars). |
| `UV_NO_PROJECT` | 0.11.8 | Equivalent to `--no-project`. |
| `UV_NO_SOURCES` | 0.9.8 | Equivalent to `--no-sources`. Ignore `[tool.uv.sources]` annotations when resolving dependencies. |
| `UV_NO_SOURCES_PACKAGE` | 0.9.26 | Equivalent to `--no-sources-package`. Ignore the `tool.uv.sources` table for the given space-delimited list of packages. |
| `UV_NO_SYNC` | 0.4.18 | Equivalent to `--no-sync`. Skip updating the environment. |
| `UV_NO_SYSTEM_CONFIG` | 0.11.16 | Do not read system-level configuration files. |
| `UV_NO_VERIFY_HASHES` | 0.5.3 | Equivalent to `--no-verify-hashes`. Disables hash verification for `requirements.txt` files. |
| `UV_NO_WRAP` | 0.0.5 | Disable line wrapping for diagnostics. |
| `UV_OFFLINE` | 0.5.9 | Equivalent to `--offline`. Disable network access. |
| `UV_OVERRIDE` | 0.2.22 | Equivalent to `--overrides`. Overrides file. Space-separated list of files. |
| `UV_PRERELEASE` | 0.1.16 | Equivalent to `--prerelease`. E.g., `allow` allows pre-release versions for all dependencies. |
| `UV_PREVIEW` | 0.1.37 | Equivalent to `--preview`. Enables preview mode. |
| `UV_PREVIEW_FEATURES` | 0.8.4 | Equivalent to `--preview-features`. Enables specific preview features. |
| `UV_PROJECT` | 0.4.4 | Equivalent to `--project`. |
| `UV_PROJECT_ENVIRONMENT` | 0.4.4 | Path to the directory to use for a project virtual environment. |
| `UV_PUBLISH_CHECK_URL` | 0.4.30 | Equivalent to `--check-url` in `uv publish`. Do not upload a file if it already exists on the index. The value is the URL of the index. |
| `UV_PUBLISH_INDEX` | 0.5.8 | Equivalent to `--index` in `uv publish`. Use the index with this name in the configuration for publishing. |
| `UV_PUBLISH_NO_ATTESTATIONS` | 0.9.12 | Equivalent to `--no-attestations` in `uv publish`. Skip uploading any collected attestations. |
| `UV_PUBLISH_PASSWORD` | 0.4.16 | Equivalent to `--password` in `uv publish`. |
| `UV_PUBLISH_TOKEN` | 0.4.16 | Equivalent to `--token` in `uv publish`. Token used with the username `__token__`. |
| `UV_PUBLISH_URL` | 0.4.16 | Equivalent to `--publish-url`. URL of the upload endpoint of the index to use with `uv publish`. |
| `UV_PUBLISH_USERNAME` | 0.4.16 | Equivalent to `--username` in `uv publish`. |
| `UV_PYODIDE_INSTALL_MIRROR` | 0.12.24 | Mirror URL replacing `https://github.com/pyodide/pyodide/releases/download` for managed Pyodide downloads. `file://` supported. |
| `UV_PYPY_INSTALL_MIRROR` | 0.2.35 | Mirror URL replacing `https://downloads.python.org/pypy` for managed PyPy downloads. `file://` supported. |
| `UV_PYTHON` | 0.1.40 | Equivalent to `--python`. If set to a path, uv uses this Python interpreter for all operations. |
| `UV_PYTHON_ARCH` | 0.12.22 | Architecture for Python requests that do not specify one, e.g., `x86_64` or `aarch64`. Requests that name an interpreter executable take precedence. |
| `UV_PYTHON_BIN_DIR` | 0.4.29 | Directory to place links to installed, managed Python executables. |
| `UV_PYTHON_CACHE_DIR` | 0.7.0 | Directory for caching the archives of managed Python installations before installation. |
| `UV_PYTHON_CPYTHON_BUILD` | 0.8.14 | Pin managed CPython versions to a specific build version (the build date, e.g., "20250814"). |
| `UV_PYTHON_DOWNLOADS` | 0.3.2 | Equivalent to the `python-downloads` setting and, when disabled, `--no-python-downloads`. Whether uv allows Python downloads. |
| `UV_PYTHON_DOWNLOADS_JSON_URL` | 0.6.13 | Local path or URL pointing to a JSON list of Python installations, overriding the list hardcoded in the `uv` binary. |
| `UV_PYTHON_GRAALPY_BUILD` | 0.8.14 | Pin managed GraalPy versions to a specific build version (the GraalPy version, e.g., "24.2.2"). |
| `UV_PYTHON_INSTALL_BIN` | 0.8.0 | Whether to install the Python executable into the `UV_PYTHON_BIN_DIR` directory. |
| `UV_PYTHON_INSTALL_DIR` | 0.2.22 | Directory for storing managed Python installations. |
| `UV_PYTHON_INSTALL_MIRROR` | 0.2.35 | Mirror URL replacing `https://github.com/astral-sh/python-build-standalone/releases/download` for managed Python downloads. `file://` supported. Takes precedence over `UV_ASTRAL_MIRROR_URL` for CPython downloads. |
| `UV_PYTHON_INSTALL_REGISTRY` | 0.8.0 | Whether to install the Python executable into the Windows registry. |
| `UV_PYTHON_NO_REGISTRY` | 0.11.8 | Disable use of the Windows registry for Python discovery and registration (no discovery from the registry or Microsoft Store locations; managed installations are not registered). |
| `UV_PYTHON_PREFERENCE` | 0.3.2 | Whether uv should prefer system or managed Python versions. |
| `UV_PYTHON_PYODIDE_BUILD` | 0.8.14 | Pin managed Pyodide versions to a specific build version (the Pyodide version, e.g., "0.28.1"). |
| `UV_PYTHON_PYPY_BUILD` | 0.8.14 | Pin managed PyPy versions to a specific build version (the PyPy version, e.g., "7.3.20"). |
| `UV_PYTHON_SEARCH_PATH` | 0.11.8 | Override `PATH` for Python executable discovery; uv searches these directories instead of `PATH`. |
| `UV_REQUEST_TIMEOUT` | 0.1.6 | Timeout (in seconds) for HTTP requests. Equivalent to `UV_HTTP_TIMEOUT`. |
| `UV_REQUIRE_BUILD_HASHES` | 0.13.0 | Require hashes for build dependencies across project, build, tool, and pip commands. |
| `UV_REQUIRE_HASHES` | 0.1.34 | Equivalent to `--require-hashes`. If `true`, all dependencies must have a hash specified in the requirements file. |
| `UV_RESOLUTION` | 0.1.27 | Equivalent to `--resolution`. E.g., `lowest-direct` installs the lowest compatible versions of all direct dependencies. |
| `UV_RUN_RLIMIT_NOFILE` | 0.12.3 | Soft open-file descriptor limit for commands executed by `uv run`, applied after uv prepares the environment and immediately before the command is spawned. The hard limit is unchanged. If it cannot be applied, uv exits with an error without running the command. Unix only. |
| `UV_S3_ENDPOINT_URL` | 0.8.21 | The URL to treat as an S3-compatible storage endpoint. Requests are signed with AWS Signature Version 4 based on `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_PROFILE`, and `AWS_CONFIG_FILE`. |
| `UV_SKIP_WHEEL_FILENAME_CHECK` | 0.8.23 | Avoid verifying that wheel filenames match their contents. Not recommended; only to work around invalid artifacts in rare cases. |
| `UV_STACK_SIZE` | 0.0.5 | Stack size used by uv, in bytes. If both `UV_STACK_SIZE` and `RUST_MIN_STACK` are unset, uv uses a 4MB (4194304) stack. `UV_STACK_SIZE` takes precedence over `RUST_MIN_STACK`. Can affect main thread stack size (uv spawns its own thread of size `max(UV_STACK_SIZE, 1MB)`). |
| `UV_SYSTEM_CERTS` | 0.11.0 | Equivalent to `--system-certs`. If `true`, load TLS certificates from the platform's native certificate store instead of the bundled Mozilla root certificates. |
| `UV_SYSTEM_PYTHON` | 0.1.18 | Equivalent to `--system`. If `true`, use the first Python interpreter found in the system `PATH`. WARNING: intended for CI or containerized environments; modifying the system Python can lead to unexpected behavior. |
| `UV_TOOL_BIN_DIR` | 0.3.0 | The "bin" directory for installing tool executables. |
| `UV_TOOL_DIR` | 0.2.16 | Directory where uv stores managed tools. |
| `UV_TORCH_BACKEND` | 0.6.9 | Equivalent to `--torch-backend` (e.g., `cpu`, `cu126`, or `auto`). |
| `UV_UNMANAGED_INSTALL` | 0.5.0 | Used in ephemeral environments like CI to install uv to a specific path while preventing the installer from modifying shell profiles or environment variables. |
| `UV_UPLOAD_HTTP_TIMEOUT` | 0.9.1 | Timeout (in seconds) for only upload HTTP requests. (default: 900 s) |
| `UV_VENV_CLEAR` | 0.8.0 | Equivalent to `--clear`. Remove any existing files or directories at the target path. |
| `UV_VENV_RELOCATABLE` | 0.10.8 | Equivalent to `--relocatable`. The virtual environment will be relocatable. |
| `UV_VENV_SEED` | 0.5.21 | Install seed packages (one or more of `pip`, `setuptools`, `wheel`) into the virtual environment created by `uv venv`. `setuptools` and `wheel` are not included in Python 3.12+ environments. |
| `UV_WORKING_DIR` | 0.9.14 | Equivalent to `--directory`. `UV_WORKING_DIRECTORY` (added in v0.9.1) is also supported for backwards compatibility. |

## Notes

- Changed in 0.13.0: `UV_REQUIRE_BUILD_HASHES` was added (build dependency hashes across project, build, tool, and pip commands).
- Python mirror and pin variables (`UV_PYTHON_*`) apply to managed Python installations; see the python category pages for behavior.
- `UV_PUBLISH_*` credentials are package-registry credentials for `uv publish`, not application authentication (see better-auth, supabase).

## Related

- [Environment variables (UV_A-UV_M)](./environment-variables-uv-a-m.md)
- [Externally defined environment variables](./environment-variables-external.md)
- [Settings: Python and misc](./settings-python-misc.md)
- [Storage](./storage.md)
