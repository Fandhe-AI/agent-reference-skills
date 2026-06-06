# Update Dependencies

Fetch newer versions from the npm registry and apply them across the monorepo.

```bash
# Check what updates are available without modifying files
syncpack update --check

# Apply only patch-level updates for devDependencies
syncpack update --dependency-types dev --target patch

# Apply minor updates for a specific package
syncpack update --dependencies react --target minor

# Interactively approve each update
syncpack update --interactive

# Check for updates in a specific scope
syncpack update --check --dependencies '@aws-sdk/**'

# After updating, refresh lockfiles
pnpm install
```

## Notes

- `--check` exits with code 1 when outdated dependencies are found, suitable for CI
- `--target patch` updates only within the current minor (1.2.x); `--target minor` updates within the major (1.x.x); `--target latest` accepts any update
- `--interactive` allows keyboard selection of which updates to apply
- Use `updateGroups` in `.syncpackrc` for per-dependency update policies
