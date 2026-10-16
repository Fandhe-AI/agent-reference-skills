# Rules & Filters

Control which issue types are reported and whether they cause CI failures.

Filter issue types via CLI flags:

```sh
# Report only unused files and dependencies
knip --include files,dependencies

# Exclude specific types from the report
knip --include files --exclude enumMembers,duplicates

# Shorthands
knip --dependencies   # all dependency-related issues
knip --exports        # all export-related issues
knip --files          # unused files only
knip --cycles         # circular dependencies only

# Default issue types plus circular dependencies
knip --dependencies --exports --files --cycles
```

Configure severity levels per issue type in `knip.json`:

```json
{
  "rules": {
    "files": "warn",
    "duplicates": "off",
    "cycles": "error"
  }
}
```

## Notes

- `"error"` (default): issue is printed and counted toward the exit code
- `"warn"`: issue is printed in faded color but does not increment the failure count
- `"off"`: issue is completely suppressed
- `cycles` is off by default and a warning when enabled; `"cycles": "error"` makes reported cycles cause a non-zero exit code
- Per the CLI reference, `--exports` also includes `nsExports` / `nsTypes` (off by default), so the combined shorthand may also report namespace issues; to add only circular dependencies to the default set, use `knip --dependencies --exports --files --cycles --exclude nsExports,nsTypes`
- CLI `--include`/`--exclude` filters are applied on top of `rules`; use `rules` for persistent team-wide configuration
