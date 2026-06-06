# Snap to Source

Synchronize dependency versions across packages by treating one package as the authoritative version source.

```json
{
  "versionGroups": [
    {
      "label": "Snap React versions to match mobile-app",
      "dependencies": ["react", "react-dom", "react-native"],
      "snapTo": ["mobile-app"]
    },
    {
      "label": "Snap shared deps to root, fall back to web-app",
      "dependencies": ["typescript", "eslint"],
      "snapTo": ["root-package", "web-app"]
    }
  ]
}
```

## Notes

- `snapTo` references package `name` fields from `package.json`, not directory paths
- When multiple packages are listed in `snapTo`, syncpack checks each in order and uses the first match found (fallback behavior)
- `DiffersToSnapTarget` is reported when versions differ and can be auto-corrected by `syncpack fix`
- Local packages cannot be snapped; `RefuseToSnapLocal` is reported instead
- If the snap target does not exist in the monorepo, `DependsOnMissingSnapTarget` is reported
