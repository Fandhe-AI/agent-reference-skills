# CI with GitHub Actions

Run Biome in read-only CI mode using the official GitHub Action.

```yaml
name: Code quality
on:
  push:
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: biomejs/setup-biome@v2
        with:
          version: latest
      - run: biome ci .
```

For projects that require Node.js dependencies:

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - uses: biomejs/setup-biome@v2
        with:
          version: latest
      - run: biome ci .
```

## Notes

- `biome ci` is read-only — it never writes fixes; exits non-zero on any finding
- GitHub Actions annotations are emitted automatically when running in that environment
- `biomejs/setup-biome@v2` installs the Biome CLI without requiring it in `package.json`
- Specify `version: latest` or a pinned version string (e.g., `2.1.1`) to control the release used
