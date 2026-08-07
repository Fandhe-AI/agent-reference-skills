# Building CI

## Usage

### Running only affected packages

```bash
# Simple approach
turbo run build --affected

# Check affected packages as JSON
turbo query affected --packages web

# Binary check (exit code 1 if there are changes)
turbo query affected --packages web --exit-code
```

### Typical workflow

```bash
# Run quality checks across all packages
turbo run lint check-types test

# Build only specific packages
turbo build --filter=web
```

## Options

| Environment variable | Purpose |
| --- | --- |
| `TURBO_TOKEN` | Access token for Remote Cache |
| `TURBO_TEAM` | Account name for the repository (Vercel team slug) |

## Notes

- Shallow clone limitation: without Git history, filtering by source-control changes doesn't work.
- GitHub Actions auto-detection: automatically detects the diff between a PR's base and head branches.
- Pinning the global `turbo` version is recommended.
- Use `turbo run <task>` explicitly (avoids future subcommand name collisions).
- Misconfigured `outputs`, `env`, or `globalEnv` can cause cache misses or build failures.
