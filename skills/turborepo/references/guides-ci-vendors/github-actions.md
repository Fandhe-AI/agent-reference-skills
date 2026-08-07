# GitHub Actions

## Usage

Example workflow (pnpm):

```yaml
name: CI
on:
  push:
    branches: ["main"]
  pull_request:
    types: [opened, synchronize]

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
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

## Notes

- Configure Remote Cache:
  1. Create a scoped access token in Vercel.
  2. Register `TURBO_TOKEN` in GitHub Secrets.
  3. Register `TURBO_TEAM` in GitHub Variables.
  4. Add the environment variables to the workflow YAML:

  ```yaml
  env:
    TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
    TURBO_TEAM: ${{ vars.TURBO_TEAM }}
  ```

- Local caching with `actions/cache`:

```yaml
- uses: actions/cache@v4
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
```
