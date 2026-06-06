# VCS Integration

Process only changed or staged files using Biome's built-in Git integration.

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true,
    "defaultBranch": "main"
  }
}
```

```bash
# Check only files changed from the default branch (main)
biome check --changed

# Check only files changed from a specific branch
biome check --since=develop

# Check only staged files (pre-commit use)
biome check --staged
```

## Notes

- `vcs.useIgnoreFile: true` makes Biome respect `.gitignore` and `.ignore`
- `--changed` requires `vcs.defaultBranch` to be set in `biome.json`
- `--staged` is designed for pre-commit hooks and cannot be used in CI
- Combine `--changed` with `biome ci` in CI pipelines to check only the PR diff
