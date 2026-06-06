# Conditional Skip

Skip or restrict hook execution based on branch name, Git state, or environment variable.

```yaml
# lefthook.yml

pre-commit:
  only:
    - ref: dev/*          # run only on branches matching dev/*
  commands:
    lint:
      glob: "*.{ts,js}"
      run: yarn lint {staged_files} --fix
      skip:
        - merge           # skip during merge commits
        - rebase          # skip during interactive rebase

pre-push:
  commands:
    test:
      run: yarn test
      skip:
        - run: test "$NO_TEST" -eq 1   # skip when NO_TEST=1 is exported
    lint:
      run: yarn lint
      only:
        - ref: main       # run only when pushing to main
```

## Notes

- `only` is a whitelist: the command runs only when the condition matches
- `skip` is a blacklist: the command is skipped when the condition matches; `skip` takes precedence over `only` if both are set
- `ref` supports glob patterns (e.g., `release/*`, `feat/**`)
- The `run` condition evaluates a shell command; exit code 0 means "skip"
- Hook-level `only`/`skip` applies to all commands in that hook; command-level settings apply individually
