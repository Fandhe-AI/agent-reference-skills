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
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
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

## Notes

- Actions are pinned to full commit SHAs here; the upstream docs reference mutable tags (`@v4`)
