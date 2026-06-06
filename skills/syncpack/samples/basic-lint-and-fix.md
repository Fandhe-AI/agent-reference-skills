# Basic Lint and Fix

Check for version mismatches across the monorepo and auto-fix them.

```bash
# Check all dependency types for issues
syncpack lint

# Auto-fix all identified mismatches
syncpack fix

# Preview changes without writing to disk
syncpack fix --dry-run

# After fixing, refresh lockfiles
npm install
```

## Notes

- `lint` exits with code 1 when issues are found, making it suitable for CI gating
- `fix` handles version alignment only; use `format` separately for field ordering
- Always run the package manager install after `fix` or `update` to refresh lockfiles
- Use `--dependency-types prod,dev` to narrow scope to specific dependency categories
