# Format package.json

Sort and standardize `package.json` fields consistently across all monorepo packages.

```bash
# Apply formatting to all package.json files
syncpack format

# Check formatting without modifying files (exits with code 1 if issues found)
syncpack format --check

# Check a specific package
syncpack format --check --source 'packages/my-app/package.json'
```

```json
{
  "indent": "    ",
  "sortFirst": ["name", "version", "description", "main", "scripts"],
  "sortAz": ["dependencies", "devDependencies", "peerDependencies"]
}
```

## Notes

- `format` sorts fields and alphabetizes nested properties but does not modify version numbers
- `--check` is suitable for CI enforcement of `package.json` style consistency
- `sortFirst` controls the order of top-level fields that appear before alphabetical sorting
- `sortAz` alphabetizes the named fields; dependency objects are a common target
