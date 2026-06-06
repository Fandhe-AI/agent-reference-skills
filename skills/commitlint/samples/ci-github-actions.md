# CI Setup with GitHub Actions

Validate commit messages on every push and pull request using the official GitHub Actions workflow.

```yaml
# .github/workflows/commitlint.yml
name: CI

on: [push, pull_request]

permissions:
  contents: read

jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: npm
      - name: Install commitlint
        run: npm install -D @commitlint/cli @commitlint/config-conventional
      - name: Validate current commit (last commit) with commitlint
        if: github.event_name == 'push'
        run: npx commitlint --last --verbose
      - name: Validate PR commits with commitlint
        if: github.event_name == 'pull_request'
        run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }} --verbose
```

## Notes

- `fetch-depth: 0` is required so that the full git history is available for range-based validation
- On `push` events, `--last` checks only the most recent commit; on PRs, `--from`/`--to` checks the entire PR diff
- The `--verbose` flag prints a confirmation message even when all commits pass
- For GitLab CI, use `--from ${CI_MERGE_REQUEST_DIFF_BASE_SHA} --to ${CI_COMMIT_SHA}` and set `GIT_DEPTH: 0`
