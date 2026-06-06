# Migrate to v15

Source: https://syncpack.dev/guide/migrate-v15/

Upgrade guide for Syncpack v15. The install step is unchanged.

```bash
npm install --save-dev syncpack
```

## Breaking Change: pnpmOverrides

`pnpmOverrides` now reads from `pnpm-workspace.yaml` instead of `package.json`. This aligns with current pnpm conventions.

### Legacy compatibility

If your overrides remain in `package.json` under `pnpm.overrides`, add a custom type to maintain compatibility:

```json
{
  "customTypes": {
    "pnpmOverridesLegacy": {
      "strategy": "versionsByName",
      "path": "pnpm.overrides"
    }
  }
}
```

The standard `pnpmOverrides` type will continue to manage `pnpm-workspace.yaml` going forward.

## New Features in v15

| Version | Feature |
|---------|---------|
| v15.0.0 | `catalog:` protocol support (pnpm/Bun), `minimumReleaseAge` |
| v15.1.1 | `updateGroups`, interactive `update` picker, registry caching |
| v15.2.0 | `severity` override map, `sourceMode: "extend"` |
| v15.3.0 | `semverRangeOnly` version group policy |

## Related

- [migrate-v14](./migrate-v14.md)
- [what's new](./whats-new.md)
- [catalog version group](../version-groups/catalog.md)
- [updateGroups config](../config/update-groups.md)
