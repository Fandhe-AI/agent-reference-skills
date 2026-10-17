---
source: https://docs.astral.sh/uv/pip/compatibility/
---

# Compatibility with pip (resolution)

uv is designed as a drop-in replacement for common `pip` and `pip-tools` workflows, but is not intended to be an exact clone of `pip`. This page covers differences in configuration, resolution, and index handling. Differences in CLI options, install behavior, and `pip compile` defaults are in compatibility-options.md.

## Signature / Usage

```console
$ uv pip install --index-strategy unsafe-best-match flask
$ uv pip install --prerelease allow flask
$ uv pip install wheel && uv pip install --no-build-isolation biopython==1.77
```

## Configuration files and environment variables

uv does not read configuration files or environment variables that are specific to `pip`, like `pip.conf` or `PIP_INDEX_URL`. Reading configuration intended for other tools requires bug-for-bug compatibility, locks uv into format changes, needs version knowledge of the target tool, prevents uv from adding settings that don't exist in the target tool, and can confuse users.

Instead, uv supports its own environment variables, like `UV_INDEX_URL`, and persistent configuration in a `uv.toml` file or a `[tool.uv.pip]` section of `pyproject.toml`.

## Pre-release compatibility

By default (`if-necessary`), uv prefers stable versions over pre-releases, falling back to pre-releases only if every stable candidate that satisfies the active constraints is rejected during resolution.

For example, suppose only `c==1.0` and `c==2.0a1` are available. Together, `c>=1` and `a -> c>=0.5a1` allow both versions, but uv selects `c==1.0` regardless of which requirement is discovered first. If another active requirement rejects `c==1.0`, uv falls back to `c==2.0a1`.

- `--prerelease allow` considers pre-releases for every package without preferring stable candidates first.
- `--prerelease disallow` excludes them entirely.
- `explicit` mode considers pre-releases only for first-party requirements that contain a pre-release identifier (preferring stable versions and falling back to pre-releases only if necessary), while disallowing pre-releases for all other packages.

Pre-releases are notoriously difficult to model because dependency requirements are discovered incrementally during resolution. uv keeps the candidate universe fixed for each package while trying stable candidates before pre-releases, so backtracking can reach a pre-release without invalidating PubGrub's learned incompatibilities.

## Packages that exist on multiple indexes

When uv searches for a package across multiple indexes, it iterates over the indexes in order (preferring the `--extra-index-url` over the default index), and stops searching as soon as it finds a match. If a package exists on multiple indexes, uv limits its candidate versions to those present in the first index that contains the package.

`pip`, meanwhile, combines the candidate versions from all indexes and selects the best version from the combined set, with no guarantees around the order in which it searches indexes.

uv's behavior is such that if a package exists on an internal index, it is always installed from the internal index, and never from PyPI. The intent is to prevent "dependency confusion" attacks (see the `torchtriton` attack from December 2022).

As of v0.1.39, users can opt in to `pip`-style behavior via the `--index-strategy` command-line option, or the `UV_INDEX_STRATEGY` environment variable:

- `first-index` (default): Search for each package across all indexes, limiting the candidate versions to those present in the first index that contains the package, prioritizing the `--extra-index-url` indexes over the default index URL.
- `unsafe-first-match`: Search for each package across all indexes, but prefer the first index with a compatible version, even if newer versions are available on other indexes.
- `unsafe-best-match`: Search for each package across all indexes, and select the best version from the combined set of candidate versions.

`unsafe-best-match` is the closest to `pip`'s behavior but exposes users to the risk of "dependency confusion" attacks. uv also supports pinning packages to dedicated indexes (see `../indexes-auth/indexes.md`).

## PEP 517 build isolation

uv uses PEP 517 build isolation by default (akin to `pip install --use-pep517`). If a package fails to install due to a missing build-time dependency, try a newer version of the package; if the problem persists, consider filing an issue with the package maintainer. As an escape hatch, preinstall a package's build dependencies, then run `uv pip install` with `--no-build-isolation`:

```shell
uv pip install wheel && uv pip install --no-build-isolation biopython==1.77
```

For a list of packages that are known to fail under PEP 517 build isolation, see astral-sh/uv issue #2252.

## Transitive URL dependencies

uv differs from pip in its handling of transitive URL dependencies in two ways.

- uv assumes that non-URL dependencies do not introduce URL dependencies into the resolution. If a non-URL dependency does introduce a URL dependency, uv rejects the URL dependency during resolution. (PyPI does not allow published packages to depend on URL dependencies; other registries may be more permissive.)
- If a constraint (`--constraint`) or override (`--override`) is defined using a direct URL dependency, and the constrained package has a direct URL dependency of its own, uv may reject that transitive direct URL dependency during resolution, if the URL isn't referenced elsewhere in the set of input requirements.

If uv rejects a transitive URL dependency, provide the URL dependency as a direct dependency in the relevant `pyproject.toml` or `requirement.in` file.

## Virtual environments by default

`uv pip install` and `uv pip sync` always install packages into the currently active virtual environment, or search for a virtual environment named `.venv` in the current directory or any parent directory (even if it is not activated). `pip` installs packages into a global environment if no virtual environment is active, and does not search for inactive virtual environments.

To install into non-virtual environments, provide a path to a Python executable via `--python /path/to/python`, or use the `--system` flag, which installs into the first Python interpreter found on the `PATH`, like `pip`. uv inverts the default, requiring explicit opt-in to installing into the system Python.

## Resolution strategy

Neither `pip` nor uv make any guarantees about the exact set of packages that will be installed; only that the resolution will be consistent, deterministic, and compliant with the specifiers. In some cases `pip` and uv will yield different resolutions; both should be equally valid.

```requirements
starlette
fastapi
```

At time of writing (per the source), `fastapi==0.110.0` depends on `starlette>=0.36.3,<0.37.0` while the most recent `starlette` is `0.37.2`. A resolver prioritizing the latest `starlette` falls back to `fastapi==0.1.17`; one prioritizing the latest `fastapi` falls back to `starlette==0.36.3`.

When uv resolutions differ from `pip` in undesirable ways, it's often a sign that the specifiers are too loose; for example, require `fastapi>=0.110.0`.

## `requires-python` upper bounds

When evaluating `requires-python` ranges for dependencies, uv only considers lower bounds and ignores upper bounds entirely. For example, `>=3.8, <4` is treated as `>=3.8`. Respecting upper bounds often leads to formally correct but practically incorrect resolutions, as resolvers backtrack to the first published version that omits the upper bound.

## `requires-python` specifiers

When evaluating Python versions against `requires-python` specifiers, uv truncates the candidate version to the major, minor, and patch components, ignoring (e.g.) pre-release and post-release identifiers. For example, a project that declares `requires-python: >=3.13` will accept Python 3.13.0b1. This is not strictly compliant with PEP 440, but is consistent with pip.

## Package priority

uv's resolver and pip's resolver have a different set of package priorities. Both use the user-provided order as one of their priorities, but pip has additional priorities that uv does not have. Hence, uv is more likely to be affected by a change in user order than pip is. For example, `uv pip install foo bar` prioritizes newer versions of `foo` over `bar` and could result in a different resolution than `uv pip install bar foo`. The same applies to the ordering of requirements in input files for `uv pip compile`.

## Strictness and spec enforcement

uv tends to be stricter than `pip`, and will often reject packages that `pip` would install. For example, uv rejects HTML indexes with invalid URL fragments (PEP 503), while `pip` ignores such fragments. In some cases uv implements lenient behavior for popular packages that are known to have specific spec compliance issues. If uv rejects a package that `pip` would install, first attempt to install a newer version of the package; if that fails, report the issue to the package maintainer.

## Wheel filename and metadata validation

By default, uv rejects wheels whose filenames are inconsistent with the wheel metadata inside the file (e.g., `foo-1.0.0-py3-none-any.whl` containing metadata with version `1.0.1`), while pip accepts them. To force uv to accept such wheels, set `UV_SKIP_WHEEL_FILENAME_CHECK=1` in the environment.

## Package name normalization

By default, uv normalizes package names to their PEP 503-compliant forms and uses those normalized names in all output contexts, whereas pip tends to preserve the verbatim package name as published. For example, `uv pip list` displays `docstring-parser` while `pip list` displays `docstring_parser`.

## Notes

- Prior to pip 26.0, pre-release handling in pip was not consistent.
- Remaining option-level differences (`pip check`, `--user`, `--only-binary`, `--no-binary`, `manylinux_compatible`, bytecode compilation, registry authentication, `egg` support, build constraints, `pip compile` defaults) are in `compatibility-options.md`.

## Related

- [Compatibility with pip (options)](./compatibility-options.md)
- [Using environments](./environments.md)
- [uv pip install](./uv-pip-install.md)
