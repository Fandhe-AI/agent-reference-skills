# Using Knip in CI

Source: https://knip.dev/guides/using-knip-in-ci

## Overview

Knip exits with code `1` when issues are detected, ideal for CI.

## GitHub Actions Example

```yaml
name: Lint project
on: push
jobs:
  knip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm install --ignore-scripts
      - run: npm run knip
```

## Recommendations

1. **Caching**: `--cache` (stored at `./node_modules/.cache/knip`)
2. **Reporting**: Use `--reporter github-actions` for PR annotations
3. **Dual Execution**: Run both standard and production mode
4. **Output Config**: `--treat-config-hints-as-errors`, `--no-exit-code`
5. **Automation**: CI applies `--no-progress` automatically
