---
source: https://docs.astral.sh/uv/reference/cli/#uv-pip-compile
---

# uv pip compile

Compile a `requirements.in` file to a `requirements.txt` or `pylock.toml` file.

## Signature / Usage

```
uv pip compile [OPTIONS] <SRC_FILE|--group <GROUP>>
```

```console
$ uv pip compile pyproject.toml -o requirements.txt
```

### Arguments

| Name | Description |
| --- | --- |
| `SRC_FILE` | Include the packages listed in the given files. Supported formats: `requirements.txt`, `.py` files with inline metadata, `pylock.toml`, `pyproject.toml`, `setup.py`, and `setup.cfg`. For `pyproject.toml` / `setup.py` / `setup.cfg`, uv extracts the requirements for the relevant project. If `-` is provided, requirements are read from stdin. The order of the requirements files and the requirements in them is used to determine priority during resolution. |

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all-extras` | | Include all optional dependencies. Only applies to `pyproject.toml`, `setup.py`, and `setup.cfg` sources. |
| `--annotation-style` | annotation-style | Style of the annotation comments in the output file indicating the source of each package. Defaults to `split`. Values: `line` (single, comma-separated line), `split` (each annotation on its own line). |
| `--build-constraints`, `--build-constraint`, `-b` | build-constraints | Constrain build dependencies using the given requirements files when building source distributions. Env: `UV_BUILD_CONSTRAINT`. |
| `--cert` | file | Path to a PEM-encoded CA certificate bundle. If provided, overrides the default certificate source. |
| `--config-setting`, `--config-settings`, `-C` | config-setting | Settings to pass to the PEP 517 build backend, as `KEY=VALUE` pairs. |
| `--config-settings-package` | config-settings-package | Settings to pass to the PEP 517 build backend for a specific package, as `PACKAGE:KEY=VALUE` pairs. |
| `--constraints`, `--constraint`, `-c` | constraints | Constrain versions using the given requirements files. Equivalent to pip's `--constraint`. Env: `UV_CONSTRAINT`. |
| `--custom-compile-command` | custom-compile-command | Header comment at the top of the output file; reflects custom scripts wrapping `uv pip compile`. Env: `UV_CUSTOM_COMPILE_COMMAND`. |
| `--default-index` | default-index | The default package index (by default: `https://pypi.org/simple`). PEP 503 repository or a local directory in the same layout. Lower priority than all indexes given via `--index`. Indexes configured in `uv.toml` / `pyproject.toml` may be selected by name (enable the `index-by-name` preview feature to prefer index names over relative paths). Env: `UV_DEFAULT_INDEX`. |
| `--emit-build-options` | | Include `--no-binary` and `--only-binary` entries in the generated output file. |
| `--emit-find-links` | | Include `--find-links` entries in the generated output file. |
| `--emit-index-annotation` | | Include comment annotations indicating the index used to resolve each package (e.g., `# from https://pypi.org/simple`). |
| `--emit-index-url` | | Include `--index-url` and `--extra-index-url` entries in the generated output file. |
| `--exclude-newer` | exclude-newer | Limit candidates to distributions uploaded prior to the given date (compared against each distribution artifact's upload time). Accepts RFC 3339 timestamps (`2006-12-02T02:07:43Z`), local dates (`2006-12-02`), "friendly" durations (`24 hours`, `1 week`, `30 days`), or ISO 8601 durations (`PT24H`, `P7D`, `P30D`). Durations resolve to a fixed number of seconds (day = 24 hours); months and years are not allowed. `false` disables. Env: `UV_EXCLUDE_NEWER`. |
| `--exclude-newer-package` | exclude-newer-package | Per-package `PACKAGE=DATE` (same date formats as `--exclude-newer`). Can be provided multiple times. |
| `--excludes`, `--exclude` | excludes | Exclude packages from resolution using the given requirements files. An excluded package is omitted entirely and its own dependencies are ignored; unconditional (specifiers and markers are ignored). Env: `UV_EXCLUDE`. |
| `--extra` | extra | Include optional dependencies from the specified extra name; may be provided more than once. Only applies to `pyproject.toml`, `setup.py`, `setup.cfg` sources. |
| `--extra-index-url` | extra-index-url | (Deprecated: use `--index` instead) Extra package index URLs, in addition to `--index-url`; take priority over `--index-url`; earlier values take priority. Env: `UV_EXTRA_INDEX_URL`. |
| `--find-links`, `-f` | find-links | Locations to search for candidate distributions in addition to registry indexes. A path must be a directory of wheels / sdists at the top level; a URL must contain a flat list of links to package files. Env: `UV_FIND_LINKS`. |
| `--fork-strategy` | fork-strategy | Strategy for selecting multiple versions of a package across Python versions and platforms. Values: `fewest` (fewest versions; older versions may be preferred), `requires-python` (latest supported version for each supported Python version; the default). Env: `UV_FORK_STRATEGY`. |
| `--format` | format | Output format, `requirements.txt` or `pylock.toml` (PEP 751). Inferred from the output file extension if provided; otherwise `requirements.txt`. |
| `--generate-hashes` | | Include distribution hashes in the output file. |
| `--group` | group | Install the specified dependency group from a `pyproject.toml`. If no path is provided, the `pyproject.toml` in the working directory is used. May be provided multiple times. |
| `--index` | index | Indexes to use when resolving dependencies, in addition to the default index. Take priority over `--default-index`; earlier values take priority. Relative paths can be disambiguated from index names with `./` or `../` (Unix) or `.\\`, `..\\`, `./`, `../` (Windows). Env: `UV_INDEX`. |
| `--index-strategy` | index-strategy | Strategy for multiple index URLs. Default `first-index` (stops at the first index with the package; prevents "dependency confusion"). Values: `first-index`, `unsafe-first-match`, `unsafe-best-match`. Env: `UV_INDEX_STRATEGY`. |
| `--index-url`, `-i` | index-url | (Deprecated: use `--default-index` instead) The URL of the Python package index. Lower priority than `--extra-index-url`. Env: `UV_INDEX_URL`. |
| `--keyring-provider` | keyring-provider | Use `keyring` for authentication for index URLs. Only `subprocess` is supported. Defaults to `disabled`. Env: `UV_KEYRING_PROVIDER`. |
| `--link-mode` | link-mode | Method used when installing packages from the global cache; only used when building source distributions. Defaults to `clone` (Copy-on-Write) on macOS and Linux, `hardlink` on Windows. Values: `clone`, `copy`, `hardlink`, `symlink`. Symlink mode is discouraged (clearing the cache with `uv cache clean` breaks installed packages). Env: `UV_LINK_MODE`. |
| `--no-annotate` | | Exclude comment annotations indicating the source of each package. |
| `--no-binary` | no-binary | Don't install pre-built wheels; the given packages are built and installed from source (the resolver still uses wheels to extract metadata). Multiple packages may be provided; `:all:` disables binaries for all, `:none:` clears previously specified packages. |
| `--no-build` | | Don't build source distributions. Reuses cached wheels; operations requiring a build exit with an error. uv may still build editable requirements. Alias for `--only-binary :all:`. |
| `--no-build-isolation` | | Disable isolation when building source distributions; assumes PEP 518 build dependencies are already installed. Env: `UV_NO_BUILD_ISOLATION`. |
| `--no-build-isolation-package` | no-build-isolation-package | Disable build isolation for a specific package. |
| `--no-deps` | | Ignore package dependencies; only add those explicitly listed on the command line to the resulting requirements file. |
| `--no-emit-package`, `--unsafe-package` | no-emit-package | Omit a package from the output resolution; its dependencies are still included. Equivalent to pip-compile's `--unsafe-package`. |
| `--no-header` | | Exclude the comment header at the top of the generated output file. |
| `--no-index` | | Ignore the registry index (e.g., PyPI), relying on direct URL dependencies and `--find-links`. |
| `--no-sources` | | Ignore the `tool.uv.sources` table when resolving dependencies; lock against standards-compliant, publishable package metadata. Env: `UV_NO_SOURCES`. |
| `--no-sources-package` | no-sources-package | Don't use `tool.uv.sources` for the specified packages. Env: `UV_NO_SOURCES_PACKAGE`. |
| `--no-strip-extras` | | Include extras in the output file. By default uv strips extras; output files generated with `--no-strip-extras` cannot be used as constraints files in `install` and `sync`. |
| `--no-strip-markers` | | Include environment markers in the output file. By default uv strips markers, as the resolution is only guaranteed correct for the target environment. |
| `--only-binary` | only-binary | Only use pre-built wheels; don't build source distributions. Reuses cached wheels; builds for the given packages exit with an error. uv may still build editable requirements. `:all:` / `:none:` supported. |
| `--output-file`, `-o` | output-file | Write the compiled requirements to the given `requirements.txt` or `pylock.toml` file. If it already exists, existing versions are preferred unless `--upgrade` is also specified. |
| `--overrides`, `--override` | overrides | Override versions using the given requirements files (absolute, replacing the requirements of constituent packages, unlike additive constraints). Env: `UV_OVERRIDE`. |
| `--prerelease` | prerelease | Strategy for pre-release versions. Default `if-necessary`. Values: `disallow`, `allow`, `if-necessary`, `explicit` (stable preferred for first-party packages with explicit pre-release specifiers; pre-releases disallowed for all others), `if-necessary-or-explicit` (deprecated alias for `if-necessary`). Env: `UV_PRERELEASE`. |
| `--prerelease-package` | prerelease-package | Per-package `PACKAGE=MODE` (any value accepted by `--prerelease`). May be provided multiple times. |
| `--python`, `-p` | python | Python interpreter to use during resolution; required for building source distributions to determine metadata when there are no wheels, and used to determine the default minimum Python version unless `--python-version` is provided. Respects `UV_PYTHON`, but when set via environment variable it is overridden by `--python-version`. |
| `--python-platform` | python-platform | Platform for which requirements should be resolved, as a target triple such as `x86_64-unknown-linux-gnu` or `aarch64-apple-darwin`. macOS default minimum `13.0` (`MACOSX_DEPLOYMENT_TARGET`), iOS `13.0` (`IPHONEOS_DEPLOYMENT_TARGET`), Android API level `24` (`ANDROID_API_LEVEL`). Values: `windows`, `linux`, `macos` (aliases for `x86_64-pc-windows-msvc`, `x86_64-unknown-linux-gnu`, `aarch64-apple-darwin`), `x86_64-pc-windows-msvc`, `aarch64-pc-windows-msvc`, `i686-pc-windows-msvc`, `x86_64-unknown-linux-gnu` (= `x86_64-manylinux_2_28`), `aarch64-apple-darwin`, `x86_64-apple-darwin`, `aarch64-unknown-linux-gnu` (= `aarch64-manylinux_2_28`), `aarch64-unknown-linux-musl`, `x86_64-unknown-linux-musl`, `riscv64-unknown-linux`, `x86_64-manylinux2014` (= `x86_64-manylinux_2_17`), `x86_64-manylinux_2_17`, `x86_64-manylinux_2_28` through `x86_64-manylinux_2_40`, `aarch64-manylinux2014` (= `aarch64-manylinux_2_17`), `aarch64-manylinux_2_17`, `aarch64-manylinux_2_28` through `aarch64-manylinux_2_40`, `aarch64-linux-android`, `x86_64-linux-android`, `wasm32-pyodide2024` (Python 3.12), `wasm32-pyodide2025` (Python 3.13), `arm64-apple-ios`, `arm64-apple-ios-simulator`, `x86_64-apple-ios-simulator`. |
| `--python-version` | python-version | Python version to use for resolution (e.g., `3.8` or `3.8.17`); defaults to the interpreter's version. Defines the minimum Python version supported by the resolved requirements. A missing patch version is assumed minimum (`3.8` -> `3.8.0`). |
| `--refresh` | | Refresh all cached data. |
| `--refresh-package` | refresh-package | Refresh cached data for a specific package. |
| `--require-build-hashes` | | Require hashes for all build dependencies; provide requirements with hashes in a file passed to `--build-constraint`. Does not require hashes for runtime dependencies. No hash is required for the bundled `uv_build` backend; when build isolation is disabled, hashes are not checked. |
| `--resolution` | resolution | Strategy for selecting between compatible versions. Default `highest`. Values: `highest`, `lowest`, `lowest-direct` (lowest for direct dependencies, highest for transitive). Env: `UV_RESOLUTION`. |
| `--system` | | Install packages into the system Python environment. By default uv uses the virtual environment in the working directory or any parent, falling back to a Python executable in `PATH`; `--system` restricts the search to the system path. Env: `UV_SYSTEM_PYTHON`. |
| `--torch-backend` | torch-backend | Backend for the PyTorch ecosystem (e.g., `cpu`, `cu126`, or `auto`); ignores configured index URLs for those packages. `auto` detects the index from installed CUDA drivers. This option is in preview and may change in any future release. Values: `auto`, `cpu`, `cu132`, `cu130`, `cu129`, `cu128`, `cu126`, `cu125`, `cu124`, `cu123`, `cu122`, `cu121`, `cu120`, `cu118`, `cu117`, `cu116`, `cu115`, `cu114`, `cu113`, `cu112`, `cu111`, `cu110`, `cu102`, `cu101`, `cu100`, `cu92`, `cu91`, `cu90`, `cu80`, `rocm7.2`, `rocm7.1`, `rocm7.0`, `rocm6.4`, `rocm6.3`, `rocm6.2.4`, `rocm6.2`, `rocm6.1`, `rocm6.0`, `rocm5.7`, `rocm5.6`, `rocm5.5`, `rocm5.4.2`, `rocm5.4`, `rocm5.3`, `rocm5.2`, `rocm5.1.1`, `rocm4.2`, `rocm4.1`, `rocm4.0.1`, `xpu`. Env: `UV_TORCH_BACKEND`. |
| `--universal` | | Perform a universal resolution: a single `requirements.txt` compatible with all operating systems, architectures, and Python implementations. The current Python version (or `--python-version`) is treated as a lower bound. Implies `--no-strip-markers`. |
| `--upgrade`, `-U` | | Allow package upgrades, ignoring pinned versions in any existing output file. Implies `--refresh`. |
| `--upgrade-group` | upgrade-group | Allow upgrades for all packages in a dependency group. |
| `--upgrade-package`, `-P` | upgrade-package | Allow upgrades for a specific package. Implies `--refresh-package`. |

## Notes

- Global options (`--allow-insecure-host` / `--trusted-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in `../project-commands/uv.md`. `--project` has no effect in the `uv pip` interface.
- `--torch-backend` is in preview per the CLI reference.
- pip-tools differences (output file, `--strip-extras`, index URLs) are in `compatibility-options.md`.

## Related

- [Locking environments](./locking-environments.md)
- [uv pip sync](./uv-pip-sync.md)
- [uv pip install](./uv-pip-install.md)
