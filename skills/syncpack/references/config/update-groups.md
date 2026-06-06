# updateGroups

Source: https://syncpack.dev/update-groups/

Provide granular control over which registry updates qualify for the `update` command. Groups are evaluated sequentially through source order; the first matching group applies. Unmatched instances default to the CLI's `--target` value.

## Property

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `updateGroups` | `object[]` | No | Array of update group definitions evaluated in order |

## Usage

```json
{
  "updateGroups": [
    {
      "label": "Storybook — patch only",
      "dependencies": ["@storybook/**"],
      "target": "patch"
    },
    {
      "label": "Dev dependencies — minor only",
      "dependencyTypes": ["dev"],
      "target": "minor"
    },
    {
      "label": "Ignore peer dependencies",
      "dependencyTypes": ["peer"],
      "isIgnored": true
    }
  ]
}
```

## Group Types

| Property | Description |
|----------|-------------|
| `target` | Restrict update scope: `"patch"`, `"minor"`, or `"latest"` — see [targeted](../update-groups/targeted.md) |
| `isIgnored` | Exclude from registry checks entirely — see [ignored](../update-groups/ignored.md) |

## Target Strictness

The stricter of the CLI `--target` flag and a group's `target` wins. A group with `target: "latest"` cannot override `--target patch` passed on the CLI.

## Notes

- Added in v15.1.1
- All filter properties (`dependencies`, `dependencyTypes`, `packages`, `specifierTypes`, `label`) are optional; omitted properties match all values

## Related

- [update command](../commands/update.md)
- [minimumReleaseAge](./minimum-release-age.md)
- [update-groups/ignored](../update-groups/ignored.md)
- [update-groups/targeted](../update-groups/targeted.md)
