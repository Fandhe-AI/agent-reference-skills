# minimumReleaseAge

Source: https://syncpack.dev/config/minimum-release-age/

Minimum age in minutes a published package version must reach before syncpack considers it for updates. Reduces supply chain attack risk by filtering out very recently published versions.

## Property

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `minimumReleaseAge` | `number` | `1440` | Minimum age in minutes. Set to `0` to disable. |

## Usage

```json
{
  "minimumReleaseAge": 10080
}
```

## Notes

- Applies to the `update` command only
- Default is 1440 minutes (24 hours); "Most malicious releases are detected and unpublished within an hour"
- When omitted from `.syncpackrc`, reads from `pnpm-workspace.yaml` if present
- Setting to `0` disables the filter entirely
- Added in v15.0.0

## Related

- [update command](../commands/update.md)
- [updateGroups](./update-groups.md)
