---
source: https://docs.astral.sh/uv/concepts/projects/config/#conflicting-dependencies
---

# Conflicting dependencies and environments

uv resolves all project dependencies, extras and dependency groups together; `conflicts`, `environments` and `required-environments` declare exceptions and constrain the resolution.

## Signature / Usage

```toml
[tool.uv]
conflicts = [
    [
      { extra = "extra1" },
      { extra = "extra2" },
    ],
]
```

## Options / Props

| Name | Description |
|------|-------------|
| `tool.uv.conflicts` | Sets of mutually incompatible extras (`{ extra = "..." }`) or groups (`{ group = "..." }`) |
| `tool.uv.environments` | List of PEP 508 environment markers limiting the set of solved platforms |
| `tool.uv.required-environments` | Platforms the project must support (relevant for packages that publish no source distribution, like PyTorch) |
| `minimum-libc-version` | Used alongside `required-environments` on Linux to select libc implementations and minimum versions |

## Notes

- If dependencies declared in one section (including extras and dependency groups) are not compatible with those in another, resolution fails with an error unless the conflict is declared.
- Dependency groups conflict declaration:

```toml
[tool.uv]
conflicts = [
    [
      { group = "group1" },
      { group = "group2" },
    ],
]
```

- Limited resolution environments, e.g. macOS and Linux but not Windows:

```toml
[tool.uv]
environments = [
    "sys_platform == 'darwin'",
    "sys_platform == 'linux'",
]
```

- Required environments, e.g. Intel macOS. Only relevant for packages that do not publish a source distribution (like PyTorch), which can only be installed on environments covered by the wheels they publish:

```toml
[tool.uv]
required-environments = [
    "sys_platform == 'darwin' and platform_machine == 'x86_64'",
]
```

- See the resolution documentation (conflicting-dependencies, limited resolution environments, required environments, minimum-libc-version) for more.

## Related

- [Configuring projects](./config.md)
- [Optional dependencies](./optional-dependencies.md)
- [Development dependencies and dependency groups](./dependency-groups.md)
