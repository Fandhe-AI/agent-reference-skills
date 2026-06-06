# Ban Dependency

Flag disallowed packages so they are reported as issues and must be removed.

```json
{
  "versionGroups": [
    {
      "label": "Ban legacy or disallowed packages",
      "dependencies": ["moment", "lodash"],
      "isBanned": true
    }
  ]
}
```

```bash
# Report banned dependencies
syncpack lint

# Verify the specific packages are flagged
syncpack lint --dependencies moment
```

## Notes

- `IsBanned` is reported as a fixable issue, but syncpack does not auto-remove entries — manual deletion is required
- Local (workspace) packages cannot be banned; `RefuseToBanLocal` is reported instead
- Glob patterns are supported in `dependencies` (e.g., `["@deprecated/**"]`)
- Useful for enforcing policies against security violations, conflicting libraries, or migration targets
