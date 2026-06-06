# Pin Version

Lock a specific dependency to an exact version across the entire monorepo.

```json
{
  "versionGroups": [
    {
      "label": "Pin @types/node to LTS version",
      "dependencies": ["@types/node"],
      "pinVersion": "18.14.2"
    },
    {
      "label": "Pin all AWS SDK packages to the same range",
      "dependencies": ["@aws-sdk/**"],
      "pinVersion": "^3.0.0"
    }
  ]
}
```

```bash
# Detect and fix any deviation from the pin
syncpack fix --dependencies @types/node
```

## Notes

- `pinVersion` accepts any package manager-supported specifier: exact versions, ranges (`^`, `~`), or tags (`latest`)
- `DiffersToPin` is reported when a package deviates from the pinned value and can be auto-corrected by `syncpack fix`
- `PinOverridesSemverRange` is reported when the pin conflicts with an existing semver range
- Local packages cannot be pinned; `RefuseToPinLocal` is reported instead
