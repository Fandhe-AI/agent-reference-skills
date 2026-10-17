---
source: https://docs.astral.sh/uv/concepts/resolution/#pre-release-handling
---

# Pre-release handling

uv prefers stable versions over pre-releases by default; `--prerelease` and `--prerelease-package` change this.

## Signature / Usage

```toml
[tool.uv]
prerelease = "disallow"
prerelease-package = { foo = "allow", bar = "if-necessary" }
```

## Options / Props

| Name | Description |
| --- | --- |
| `if-necessary` (default) | Prefers stable versions over pre-releases, falling back to pre-releases only if every stable candidate that satisfies the active constraints is rejected during resolution |
| `allow` | Considers pre-releases for every package without preferring stable candidates first (`--prerelease allow`) |
| `disallow` | Excludes pre-releases entirely (`--prerelease disallow`) |
| `explicit` | Considers pre-releases only for first-party requirements that contain a pre-release identifier (preferring stable versions and falling back to pre-releases only if necessary), while disallowing pre-releases for all other packages |
| `--prerelease-package foo=allow` | Overrides the global pre-release strategy for a specific package; also configurable via `prerelease-package` in `[tool.uv]` |

## Notes

- For more details, see Pre-release compatibility in the pip interface compatibility documentation (`pip-interface/compatibility-resolution.md`).

## Related

- [resolution-strategy.md](./resolution-strategy.md)
- [constraints-overrides-exclusions.md](./constraints-overrides-exclusions.md)
