# Monorepo Setup

Run different linters for each sub-project in a monorepo by scoping commands with `root` and `glob`.

```yaml
# lefthook.yml

pre-commit:
  parallel: true
  jobs:
    - name: frontend-lint
      root: "frontend/"
      glob: "*.{js,ts,jsx,tsx}"
      run: yarn eslint --fix {staged_files}
      stage_fixed: true
    - name: backend-lint
      root: "backend/"
      glob: "*.rb"
      exclude:
        - "config/initializers/*.rb"
      run: bundle exec rubocop --force-exclusion -- {staged_files}
    - name: proxy-lint
      root: "proxy/"
      glob: "*.go"
      run: golangci-lint run -- {staged_files}

post-checkout:
  piped: true
  commands:
    db-create:
      priority: 1
      run: rails db:create
    db-migrate:
      priority: 2
      run: rails db:migrate
```

## Notes

- `root` changes the working directory for the command and also filters `{staged_files}` to only files under that directory
- `glob` is always evaluated relative to the repository root, not the `root` directory
- `piped: true` stops execution on first failure; useful for ordered setup steps like DB migrations
- `priority` controls execution order within a sequential (non-parallel) hook; `0` (default) means last
