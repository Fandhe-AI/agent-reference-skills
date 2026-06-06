# CI Workflow

Run syncpack checks in CI to enforce version consistency and formatting before merging.

```yaml
# .github/workflows/syncpack.yml
name: Syncpack

on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Lint version consistency
        run: npx syncpack lint
      - name: Check package.json formatting
        run: npx syncpack format --check
      - name: Check for outdated dependencies
        run: npx syncpack update --check --target minor
```

## Notes

- `syncpack lint` and `syncpack format --check` exit with code 1 on issues, failing the CI job automatically
- `syncpack update --check` reports outdated packages without modifying files
- Use `npx syncpack` to run without a local install, or add `syncpack` to root `devDependencies` for caching
- Add `--dependency-types prod,dev` to narrow lint scope and reduce noise in CI output
