# Semver Range Policy

Enforce consistent semver range formats across dependency types (e.g., `^` for devDependencies, `~` for prod).

```json
{
  "semverGroups": [
    {
      "label": "Use ~ for production dependencies",
      "dependencyTypes": ["prod"],
      "range": "~"
    },
    {
      "label": "Use ^ for dev dependencies",
      "dependencyTypes": ["dev"],
      "range": "^"
    },
    {
      "label": "Pin exact versions for scoped packages",
      "dependencies": ["@my-org/**"],
      "range": ""
    }
  ]
}
```

## Notes

- `range: ""` enforces exact pinning (e.g., `1.2.3`); `"~"` allows patch updates; `"^"` allows minor updates
- Each dependency matches only the first semver group whose criteria it satisfies — order matters
- A catch-all group at the end (with no filters) acts as the default rule for unmatched dependencies
- Run `syncpack lint` then `syncpack fix` to detect and apply range corrections
