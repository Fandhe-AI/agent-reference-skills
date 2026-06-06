# CI with GitHub Actions

Run Turborepo tasks in GitHub Actions with Remote Cache and affected-package detection.

`.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: ["main"]
  pull_request:
    types: [opened, synchronize]

env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}

jobs:
  build:
    name: Build and Test
    timeout-minutes: 15
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm turbo run lint check-types test
      - run: pnpm turbo run build --affected
```

Optional local cache persistence between runs (alternative to Remote Cache):

```yaml
- uses: actions/cache@v4
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
```

## Notes

- `fetch-depth: 2` is required for `--affected` to detect changes between commits; without Git history, source-diff filtering is unavailable
- GitHub Actions automatically detects the PR base/head branches for `--affected` comparisons
- `TURBO_TOKEN` is a Vercel scoped access token; `TURBO_TEAM` is the Vercel team slug
- Use `turbo run <task>` explicitly (not bare `turbo <task>`) to avoid future subcommand name conflicts
