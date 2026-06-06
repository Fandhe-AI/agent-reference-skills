# Basic Setup

Install lefthook and configure a pre-commit hook that runs a linter on staged files.

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      glob: "*.{js,ts,jsx,tsx}"
      run: yarn eslint {staged_files}
```

```bash
# Install hooks into .git/hooks/
lefthook install

# Verify configuration is valid
lefthook validate
```

## Notes

- `lefthook install` reads `lefthook.yml` and writes hook scripts into `.git/hooks/`
- `{staged_files}` expands to the list of files staged for the commit; the command is skipped if the list is empty after filtering
- `glob` filters which staged files are passed to the command; non-matching files are excluded
- To skip hooks temporarily: `LEFTHOOK=0 git commit`
