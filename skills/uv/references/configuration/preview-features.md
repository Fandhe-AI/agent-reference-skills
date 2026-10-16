---
source: https://docs.astral.sh/uv/concepts/preview/
---

# Preview features

uv includes opt-in preview features to provide an opportunity for community feedback and increase confidence that changes are a net-benefit before enabling them for everyone.

## Signature / Usage

```console
$ uv run --preview ...
$ UV_PREVIEW=1 uv run ...
$ uv run --preview-features foo,bar ...
$ UV_PREVIEW_FEATURES=foo,bar uv run ...
```

```toml
preview-features = ["foo", "bar"]
```

- `--preview` (or `UV_PREVIEW`) enables all preview features. `--preview-features` enables specific features; repeat the flag or pass a comma-separated list. `UV_PREVIEW_FEATURES` works similarly.
- Preview features can also be enabled in `uv.toml`, or under `[tool.uv]` in `pyproject.toml` and PEP 723 metadata. `preview-features = true` enables all.
- `--no-preview` disables preview features.

## Available preview features

| Feature | Description |
| --- | --- |
| `add-bounds` | The `add-bounds` setting controls the default version bounds added by `uv add` (major / minor range or exact pin instead of the default lower bound). |
| `adjust-ulimit` | On Unix, uv raises the process's soft open-file limit at startup, up to the hard limit; child processes inherit it. |
| `artifact-hash-filtering` | `uv pip compile --generate-hashes` restricts generated hashes to artifacts allowed by the selected binary and build policies. |
| `audit-command` | `uv audit` and `uv tool audit` check project and installed-tool dependencies for known vulnerabilities. Tool audits use lockfiles recorded by `tool-install-locks`. |
| `auth-helper` | `uv auth helper` lets external tools retrieve HTTP credentials through uv; supports the Bazel credential helper protocol. |
| `azure-endpoint` | Authenticate requests to an Azure Blob Storage endpoint using Azure credentials. Set `UV_AZURE_ENDPOINT_URL`. |
| `batch-export` | `uv export --batch` exports multiple dependency selections from a TOML manifest containing `[[export]]` entries. |
| `build-dependency-check` | Before a nonisolated `uv build`, checks that the environment satisfies declared, backend-reported, and transitive build requirements; `--skip-dependency-check` skips it. |
| `build-dependency-hashes` | `--require-build-hashes` requires hashes for every build dependency, including transitive ones. |
| `build-lazy-imports` | Enables lazy imports when invoking build backends on CPython 3.15 and later. |
| `cache-physical-space` | Cache cleanup reports physical disk space reclaimed (hardlinks and copy-on-write clones) on macOS and Linux. |
| `cache-size` | The `uv cache size` command reports the total size of uv's cache. |
| `centralized-project-envs` | Default project virtual environments are stored in uv's cache and `.venv` is linked to the cached environment. |
| `check-command` | `uv check` runs Python type checking with ty. |
| `content-addressed-cache` | Cached wheel archives are identified by a digest of their contents. |
| `detect-module-conflicts` | Warns when multiple packages install conflicting Python modules into the same environment. |
| `extra-build-dependencies` | The `extra-build-dependencies` setting augments a package's declared build dependencies without disabling build isolation (also `match-runtime = true`). |
| `format-command` | `uv format` formats Python code with Ruff, downloading the formatter when needed; supports `--check` and `--diff`. |
| `frozen-lockfile` | Frozen project commands can use `uv.lock` without the workspace's `pyproject.toml`. Requires lockfile revision 5 or later. |
| `gcs-endpoint` | Authenticate requests to a Google Cloud Storage endpoint. Set `UV_GCS_ENDPOINT_URL`. |
| `index-by-name` | `--index` and `--default-index` accept names of configured package indexes as well as URLs. |
| `index-exclude-newer` | Each configured package index can set its own `exclude-newer` cutoff; `false` disables it for an index. |
| `index-hash-algorithm` | Each configured index can require a hash algorithm with `hash-algorithm`; recorded in the lockfile. |
| `init-project-flag` | `uv init` rejects the deprecated `--project` option; pass the target directory positionally (e.g., `uv init my-project`). |
| `json-output` | Commands supporting `--output-format json`, such as `uv tree`, produce machine-readable output; schemas are experimental. |
| `lock-without-metadata` | uv omits `package.metadata` tables from `uv.lock`, except for remote URL and Git dependencies. |
| `lockfile-format-check` | Commands using `--locked` or `--check` reject non-canonical lockfile formatting. |
| `lockfile-normalization` | Equivalent dependency declarations are combined when writing lockfiles. |
| `malware-check` | `uv sync` and other installation commands check packages for malware using OSV before installing (distinct from `uv audit`, which checks for known vulnerabilities). |
| `metadata-json` | The uv build backend includes `METADATA.json` and `WHEEL.json` in built wheels. |
| `minimum-libc-version` | The `minimum-libc-version` setting specifies the oldest glibc or musl versions to support during universal resolution. |
| `missing-exclude-newer-package-lock` | `exclude-newer-package` entries are omitted from the lockfile when the packages are absent from the resolution. |
| `native-auth` | `uv auth` commands store credentials in a system-native location (Keychain Services on macOS, Credential Manager on Windows, Secret Service API on Linux). |
| `package-conflicts` | Workspace members can declare conflicting dependencies at the package level. |
| `packaged-init` | `uv init` creates a packaged application by default (`src/` layout, build system, script entry point). |
| `project-directory-must-exist` | `--project` rejects invalid paths instead of warning. Takes effect before configuration is loaded; enable on the command line or environment variable. |
| `publish-require-normalized` | `uv publish` requires normalized distribution filenames; others are skipped. |
| `pylock` | `uv pip install` / `uv pip sync` can install from `pylock.toml` files. |
| `python-install-default` | `uv python install --default` installs `python` and `python3` executables; also default when no version is requested and no `.python-version` is found. |
| `relocatable-envs-default` | Virtual environments are relocatable by default; `uv venv --no-relocatable` opts out. |
| `resolution-inputs` | Omits redundant runtime constraints and unused overrides, exclusions, dependency metadata, and package-specific upload cutoffs from the lockfile. |
| `s3-endpoint` | Authenticate requests to an S3-compatible endpoint using AWS Signature Version 4. Set `UV_S3_ENDPOINT_URL`. |
| `sbom-export` | `uv export --format cyclonedx1.5` exports a CycloneDX 1.5 JSON software bill of materials. |
| `special-conda-env-names` | Conda environments named `base` or `root` are classified using their paths. |
| `target-workspace-discovery` | For a local `uv run` target, discovery starts from the directory containing the target. Takes effect before configuration is loaded. |
| `toml-backwards-compatibility` | The uv build backend rewrites `pyproject.toml` as TOML 1.0 in source distributions; the original is included as `pyproject.toml.orig`. |
| `tool-install-locks` | uv stores a `uv.lock` alongside each installed tool and reuses it for installs and upgrades. |
| `venv-safe-clear` | `uv venv --clear` refuses to clear a directory without `pyvenv.cfg`; `--force` overrides. |
| `wheel-variants` | Experimental support for wheel variants (PEP 825). Variant wheels are not yet selectable. |
| `workspace-dir` | `uv workspace dir` prints the workspace root (`--package` for a member). |
| `workspace-list` | `uv workspace list` lists workspace member names (`--paths` for paths). |
| `workspace-list-scripts` | `uv workspace list --scripts` lists standalone scripts with inline metadata under the workspace root. |
| `workspace-metadata` | `uv workspace metadata` exposes structured information about a workspace; output is experimental (`--sync` adds a module-to-package mapping). |

## Notes

- Often preview features can be used without changing preview settings if the behavior change is gated by user interaction. For example, while `pylock.toml` support is in preview, `uv pip install` with a `pylock.toml` works without additional configuration, but a warning is displayed; enabling the feature silences it.
- Some preview features take effect before configuration files are loaded and cannot be enabled from configuration.
- For backwards compatibility, enabling preview features that do not exist warns but does not error, regardless of the source.

## Related

- [Settings: Python and misc](./settings-python-misc.md)
- [Environment variables (UV_A-UV_M)](./environment-variables-uv-a-m.md)
- [Environment variables (UV_N-UV_Z)](./environment-variables-uv-n-z.md)
- [Caching](./cache.md)
