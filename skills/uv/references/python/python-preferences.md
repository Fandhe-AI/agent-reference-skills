---
source: https://docs.astral.sh/uv/concepts/python-versions/#disabling-automatic-python-downloads
---

# Python downloads and preferences

Control automatic Python downloads and whether managed or system Python installations are preferred.

## Signature / Usage

```console
$ uv python list --managed-python
$ uv python list --no-managed-python
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `python-downloads` | `automatic` (default) \| `manual` | Set to `manual` to only allow Python downloads during `uv python install`. Also settable via the `--no-python-downloads` flag on any uv command. |
| `python-preference` | `managed` (default) \| `only-managed` \| `system` \| `only-system` | Whether to prefer Python installations already present on the system, or those downloaded and installed by uv. |

`python-preference` values:

| Value | Meaning |
| --- | --- |
| `managed` | Default. Prefers managed Python installations over system Python installations. However, system Python installations are still preferred over downloading a managed Python version. |
| `only-managed` | Only use managed Python installations; never use system Python installations. Equivalent to `--managed-python`. |
| `system` | Prefer system Python installations over managed Python installations. |
| `only-system` | Only use system Python installations; never use managed Python installations. Equivalent to `--no-managed-python`. |

## Notes

- By default, uv will automatically download Python versions when needed.
- The `python-downloads` setting can be set in a persistent configuration file to change the default behavior, or the `--no-python-downloads` flag can be passed to any uv command.
- By default, uv will attempt to use Python versions found on the system and only download managed Python versions when necessary. To ignore system Python versions, and only use managed Python versions, use `--managed-python`; to ignore managed Python versions and only use system Python versions, use `--no-managed-python`. To change uv's default behavior in a configuration file, use the `python-preference` setting.
- Automatic Python version downloads can be disabled without changing the preference.
- Changed in 0.13.0: ARM64 builds of uv on Windows now prefer native ARM64 (`aarch64`) interpreters across Python versions (previously emulated `x86_64` was preferred). When a native interpreter is unavailable, uv falls back to `x86_64`, then 32-bit `x86`. Opt out with `UV_PYTHON_ARCH=x86_64` or an explicit architecture request, e.g., `cpython-3.14-windows-x86_64` (with `setup-uv`: `python-arch: x86_64`).

## Related

- [Python versions](./python-versions.md)
- [Python discovery](./python-discovery.md)
- [Managed Python distributions](./managed-distributions.md)
