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
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
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

## Notes

- Knip exits with code `1` on any detected issue, which fails CI jobs automatically
- `--no-progress` is applied automatically in CI environments
- Cache is stored at `./node_modules/.cache/knip`; include this path in CI cache configuration
- Use `--reporter github-actions` to get inline annotations on pull request diffs
