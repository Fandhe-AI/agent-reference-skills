---
source: https://docs.astral.sh/uv/concepts/resolution/#multi-version-resolution
---

# Multi-version resolution

During universal resolution a package may appear multiple times with different versions; `--fork-strategy` controls the trade-off.

## Signature / Usage

```console
$ uv lock --fork-strategy fewest
```

## Multi-version resolution

During universal resolution, a package may be listed multiple times with different versions or URLs within the same lockfile, since different versions may be needed for different platforms or Python versions.

The `--fork-strategy` setting can be used to control how uv trades off between (1) minimizing the number of selected versions and (2) selecting the latest-possible version for each platform. The former leads to greater consistency across platforms, while the latter leads to use of newer package versions where possible.

By default (`--fork-strategy requires-python`), uv will optimize for selecting the latest version of each package for each supported Python version, while minimizing the number of selected versions across platforms.

For example, when resolving `numpy` with a Python requirement of `>=3.8`, uv would select the following versions:

```txt
numpy==1.24.4 ; python_version == "3.8"
numpy==2.0.2 ; python_version == "3.9"
numpy==2.2.0 ; python_version >= "3.10"
```

This resolution reflects the fact that NumPy 2.2.0 and later require at least Python 3.10, while earlier versions are compatible with Python 3.8 and 3.9.

Under `--fork-strategy fewest`, uv will instead minimize the number of selected versions for each package, preferring older versions that are compatible with a wider range of supported Python versions or platforms.

For example, when in the scenario above, uv would select `numpy==1.24.4` for all Python versions, rather than upgrading to `numpy==2.0.2` for Python 3.9 and `numpy==2.2.0` for Python 3.10 and later.

## Options / Props

| Name | Description |
| --- | --- |
| `--fork-strategy requires-python` (default) | Latest version of each package for each supported Python version, minimizing the number of selected versions across platforms |
| `--fork-strategy fewest` | Minimizes the number of selected versions per package, preferring older versions compatible with a wider range of Python versions or platforms |

## Related

- [platform-markers.md](./platform-markers.md)
- [resolver-internals.md](./resolver-internals.md)
