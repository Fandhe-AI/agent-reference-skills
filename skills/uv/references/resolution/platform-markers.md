---
source: https://docs.astral.sh/uv/concepts/resolution/#platform-markers
---

# Platform markers and universal resolution

Markers attach an expression to a requirement to indicate when the dependency should be used; uv supports both platform-specific and universal resolution.

## Signature / Usage

```console
$ uv pip compile --python-platform linux --python-version 3.10 requirements.in
$ uv pip compile --universal requirements.in
```

## Platform markers

Markers allow attaching an expression to requirements that indicate when the dependency should be used. For example `bar ; python_version < "3.9"` indicates that `bar` should only be installed on Python 3.8 and earlier.

Markers are used to adjust a package's dependencies based on the current environment or platform. For example, markers can be used to modify dependencies by operating system, CPU architecture, Python version, Python implementation, and more.

See the environment markers section in the Python Packaging documentation (https://packaging.python.org/en/latest/specifications/dependency-specifiers/#environment-markers) for more details.

Markers are important for resolution because their values change the required dependencies. Typically, Python package resolvers use the markers of the _current_ platform to determine which dependencies to use since the package is often being _installed_ on the current platform. However, for _locking_ dependencies this is problematic — the lockfile would only work for developers using the same platform the lockfile was created on. To solve this problem, platform-independent, or "universal" resolvers exist.

## Platform-specific resolution

By default, uv's pip interface, i.e., `uv pip compile`, produces a resolution that is platform-specific, like `pip-tools`. There is no way to use platform-specific resolution in the uv's project interface.

uv also supports resolving for specific, alternate platforms and Python versions with the `--python-platform` and `--python-version` options. For example, if using Python 3.12 on macOS, `uv pip compile --python-platform linux --python-version 3.10 requirements.in` can be used to produce a resolution for Python 3.10 on Linux instead. Unlike universal resolution, during platform-specific resolution, the provided `--python-version` is the exact python version to use, not a lower bound.

Python's environment markers expose far more information about the current machine than can be expressed by a simple `--python-platform` argument. For example, the `platform_version` marker on macOS includes the time at which the kernel was built, which can (in theory) be encoded in package requirements. uv's resolver makes a best-effort attempt to generate a resolution that is compatible with any machine running on the target `--python-platform`, which should be sufficient for most use cases, but may lose fidelity for complex package and platform combinations.

## Universal resolution

uv's lockfile (`uv.lock`) is created with a universal resolution and is portable across platforms. This ensures that dependencies are locked for everyone working on the project, regardless of operating system, architecture, and Python version. The uv lockfile is created and modified by project commands such as `uv lock`, `uv sync`, and `uv add`.

Universal resolution is also available in uv's pip interface, i.e., `uv pip compile`, with the `--universal` flag. The resulting requirements file will contain markers to indicate which platform each dependency is relevant for.

During universal resolution, a package may be listed multiple times with different versions or URLs if different versions are needed for different platforms — the markers determine which version will be used. A universal resolution is often more constrained than a platform-specific resolution, since we need to take the requirements for all markers into account.

During universal resolution, all required packages must be compatible with the _entire_ range of `requires-python` declared in the `pyproject.toml`. For example, if a project's `requires-python` is `>=3.8`, resolution will fail if all versions of given dependency require Python 3.9 or later, since the dependency lacks a usable version for (e.g.) Python 3.8, the lower bound of the project's supported range. In other words, the project's `requires-python` must be a subset of the `requires-python` of all its dependencies.

When selecting the compatible version for a given dependency, uv will (by default) attempt to choose the latest compatible version for each supported Python version. For example, if a project's `requires-python` is `>=3.8`, and the latest version of a dependency requires Python 3.9 or later, while all prior versions supporting Python 3.8, the resolver will select the latest version for users running Python 3.9 or later, and previous versions for users running Python 3.8.

When evaluating `requires-python` ranges for dependencies, uv only considers lower bounds and ignores upper bounds entirely. For example, `>=3.8, <4` is treated as `>=3.8`. Respecting upper bounds on `requires-python` often leads to formally correct but practically incorrect resolutions, as, e.g., resolvers will backtrack to the first published version that omits the upper bound (see: `Requires-Python` upper limits, https://discuss.python.org/t/requires-python-upper-limits/12663).

## Common marker values

The `environments` and `required-environments` settings accept PEP 508 environment markers. The values for these markers are derived from the Python runtime (e.g., `sys.platform`, `platform.machine()`, `platform.system()`, and `os.name`).

For quick reference, the most common marker values by platform are:

| Marker | Linux | macOS | Windows |
| --- | --- | --- | --- |
| `sys_platform` | `'linux'` | `'darwin'` | `'win32'` |
| `platform_system` | `'Linux'` | `'Darwin'` | `'Windows'` |
| `platform_machine` (x86-64) | `'x86_64'` | `'x86_64'` | `'AMD64'` |
| `platform_machine` (ARM64) | `'aarch64'` | `'arm64'` | `'ARM64'` |
| `os_name` | `'posix'` | `'posix'` | `'nt'` |

You can check the values for your current platform by running:

```console
$ uvx python -c "import sys, platform, os; print(sys.platform, platform.system(), platform.machine(), os.name)"
```

## Notes

- On Windows, `sys_platform` is always `'win32'`, even on 64-bit systems.
- The upstream docs show `uvx python -c "import sysconfig; print(sysconfig.get_config_vars())"` here; that prints build-time config variables rather than the PEP 508 marker values, so this page prints the runtime attributes the markers are derived from.

## Related

- [resolution-environments.md](./resolution-environments.md)
- [multi-version-resolution.md](./multi-version-resolution.md)
- [resolver-internals.md](./resolver-internals.md)
