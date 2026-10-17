---
source: https://docs.astral.sh/uv/concepts/resolution/#limited-resolution-environments
---

# Limited and required environments

The `environments` setting reduces the set of platforms the universal resolver solves for; `required-environments` expands the platforms a resolution must support.

## Signature / Usage

```toml title="pyproject.toml"
[tool.uv]
environments = [
    "sys_platform == 'darwin'",
    "sys_platform == 'linux'",
]
```

## Limited resolution environments

By default, the universal resolver attempts to solve for all platforms and Python versions.

If your project supports only a limited set of platforms or Python versions, you can constrain the set of solved platforms via the `environments` setting, which accepts a list of PEP 508 environment markers. In other words, you can use the `environments` setting to _reduce_ the set of supported platforms.

For example, to constrain the lockfile to macOS and Linux, and avoid solving for Windows, use the snippet above. Or, to avoid solving for alternative Python implementations:

```toml title="pyproject.toml"
[tool.uv]
environments = [
    "implementation_name == 'cpython'"
]
```

Entries in the `environments` setting must be disjoint (i.e., they must not overlap). For example, `sys_platform == 'darwin'` and `sys_platform == 'linux'` are disjoint, but `sys_platform == 'darwin'` and `python_version >= '3.9'` are not, since both could be true at the same time.

## Required environments

In the Python ecosystem, packages can be published as source distributions, built distributions (wheels), or both; but to install a package, a built distribution is required. If a package lacks a built distribution, or lacks a distribution for the current platform or Python version (built distributions are often platform-specific), uv will attempt to build the package from source, then install the resulting built distribution.

Some packages (like PyTorch) publish built distributions, but omit a source distribution. Such packages are _only_ installable on platforms for which a built distribution is available. For example, if a package publishes built distributions for Linux, but not macOS or Windows, then that package will _only_ be installable on Linux.

Packages that lack source distributions cause problems for universal resolution, since there will typically be at least one platform or Python version for which the package is not installable.

By default, uv requires each such package to include at least one wheel that is compatible with the target Python version. The `required-environments` setting can be used to ensure that the resulting resolution contains wheels for specific platforms, or fails if no such wheels are available. The setting accepts a list of PEP 508 environment markers.

While the `environments` setting _limits_ the set of environments that uv will consider when resolving dependencies, `required-environments` _expands_ the set of platforms that uv _must_ support when resolving dependencies.

For example, `environments = ["sys_platform == 'darwin'"]` would limit uv to solving for macOS (and ignoring Linux and Windows). On the other hand, `required-environments = ["sys_platform == 'darwin'"]` would _require_ that any package without a source distribution include a wheel for macOS in order to be installable (and would fail if no such wheel is available).

In practice, `required-environments` can be useful for declaring explicit support for non-latest platforms, since this often requires backtracking past the latest published versions of those packages. For example, to guarantee that any built distribution-only packages includes support for Intel macOS:

```toml title="pyproject.toml"
[tool.uv]
required-environments = [
    "sys_platform == 'darwin' and platform_machine == 'x86_64'"
]
```

To require a macOS release, use its Darwin kernel version in `platform_release`. For example, macOS 15 uses Darwin 24:

```toml title="pyproject.toml"
[tool.uv]
required-environments = [
    "sys_platform == 'darwin' and platform_machine == 'arm64' and platform_release == '24.0.0'"
]
```

Use `==` to require coverage at the baseline. A range like `>= '24.0.0'` can be satisfied by a wheel that only supports a newer release. Wheels targeting newer releases are still retained in the lockfile.

### Minimum libc version

`minimum-libc-version` is in preview. Use `--preview-features minimum-libc-version` or `preview-features = ["minimum-libc-version"]` to disable the warning.

Environment markers do not include the libc implementation or version. The `minimum-libc-version` setting specifies the oldest libc versions that must be supported in `required-environments`.

For example, to require support for glibc 2.31 on x86-64 and ARM64 Linux:

```toml title="pyproject.toml"
[tool.uv]
preview-features = ["minimum-libc-version"]
required-environments = [
    "sys_platform == 'linux' and platform_machine == 'x86_64'",
    "sys_platform == 'linux' and platform_machine == 'aarch64'",
]
minimum-libc-version = { glibc = "2.31" }
```

With this configuration, a `manylinux_2_17` wheel satisfies the glibc requirement, but a `manylinux_2_34` wheel does not. Both are retained in the lockfile and exported hashes, so machines with newer glibc versions can install the newer wheel. Musl wheels are also retained, but do not satisfy the glibc requirement. Omitting a libc implementation means it is not required, not excluded.

To require both glibc and musl support, set a version for each:

```toml
minimum-libc-version = { glibc = "2.31", musl = "1.2" }
```

Each configured libc version needs coverage in `required-environments`. If a required environment has no compatible wheel or usable source distribution, uv will try another version of the package. Generic Linux wheels, such as `linux_x86_64`, do not constrain libc and can satisfy either implementation.

## Notes

- `environments` entries must be disjoint.
- `minimum-libc-version` is a preview feature in 0.13.1.

## Related

- [platform-markers.md](./platform-markers.md)
- [multi-version-resolution.md](./multi-version-resolution.md)
