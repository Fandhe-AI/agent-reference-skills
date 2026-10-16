# CI Integration

Run knip in CI to block merges when unused code or dependencies are detected.

```yaml
# .github/workflows/knip.yml
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

Enable GitHub Actions PR annotations:

```sh
knip --reporter github-actions
```

Use caching for faster runs:

```sh
knip --cache
```

Run both default and production mode in CI:

```yaml
- run: npm run knip
- run: npm run knip -- --production --strict
```

Optionally upload a SARIF report to GitHub Code Scanning (after installing project dependencies):

```yaml
permissions:
  contents: read
  security-events: write

steps:
  - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
  - run: pnpm exec knip --reporter sarif > knip.sarif
  - if: always()
    uses: github/codeql-action/upload-sarif@6f2ac81f5cd81fe351a197ba0b00d91d03cd2aee  # v4.39.0
    with:
      sarif_file: knip.sarif
```

## Notes

- Knip exits with code `1` on any detected issue, which fails CI jobs automatically
- `--no-progress` is applied automatically in CI environments
- Cache is stored at `./node_modules/.cache/knip`; include this path in CI cache configuration
- Use `--reporter github-actions` to get inline annotations on pull request diffs
- The SARIF upload step uses `if: always()` so it runs even when knip exits non-zero; Code Scanning availability for private repositories depends on the repository's GitHub Code Security plan (source: reporters docs)
- Third-party actions are pinned to full commit SHAs (version in a trailing comment); the upstream docs use mutable tags such as @v4
