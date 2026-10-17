---
source: https://modelcontextprotocol.io/registry/versioning
---

# Registry Versioning

Rules for the `version` string of servers published to the MCP Registry.

## Signature / Usage

```json
{
  "version": "1.2.3",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "@my-username/my-server",
      "version": "1.2.3",
      "transport": {
        "type": "stdio"
      }
    }
  ]
}
```

## Options / Props

| Example | Type | Guidance |
| --- | --- | --- |
| `1.0.0` | semantic version | **Recommended** |
| `2.1.3-alpha` | semantic prerelease | **Recommended** |
| `1.0.0-beta.1` | semantic prerelease | **Recommended** |
| `3.0.0-rc.2` | semantic prerelease | **Recommended** |
| `2025.11.25` | semantic date | Recommended |
| `2025.6.18` | semantic date | Recommended (Caution) |
| `2025.06.18` | non-semantic date | Allowed (Caution) |
| `2025-06-18` | non-semantic date | Allowed |
| `v1.0` | prefixed version | Allowed |
| `^1.2.3`, `~1.2.3`, `>=1.2.3`, `<=1.2.3`, `>1.2.3`, `<1.2.3`, `1.x`, `1.2.*`, `1 - 2`, `1.2 \|\| 1.3` | version range | Prohibited |

## Notes

- MCP servers **MUST** define a version string in `server.json`. It **MUST** be unique for each publication; once published, the version string (and other metadata) cannot be changed.
- Semantic versioning is recommended but any format is supported (ranges are prohibited). The registry tries to parse the version as semver for sorting and marks "latest" if appropriate. If parsing fails, the version is always marked "latest". A non-semver version published after semver ones is marked "latest" even if it would otherwise sort earlier.
- Best practices: align the server version with the package version for local servers (with multiple packages, use the server version as the overall release version); align with the remote API version for remote servers; use semantic prerelease versions (e.g. `1.2.3-1`) for registry-only metadata updates. A prerelease sorts before the regular version, so publishing it after `1.2.3` does **not** mark it "latest".
- Aggregators **SHOULD** interpret versions as semver when possible and compare: a version marked "latest" is later; if both are valid semver use semver rules; if neither is valid compare published timestamp; if only one is valid semver, treat the semver one as later.
- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path). Preview status: breaking changes or data resets may occur.

## Related

- [server.json](./server-json.md)
- [Registry Aggregators](./registry-aggregators.md)
