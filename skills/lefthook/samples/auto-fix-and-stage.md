# Auto-fix and Stage

Automatically fix lint errors and re-stage the corrected files so they are included in the commit.

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      glob: "*.{js,ts,jsx,tsx}"
      run: yarn eslint --fix {staged_files}
      stage_fixed: true
    style:
      glob: "*.{css,scss}"
      run: yarn stylelint --fix {staged_files}
      stage_fixed: true
```

## Notes

- `stage_fixed: true` runs `git add` on the affected files after the command completes
- Only works in the `pre-commit` hook context
- Combine with the linter's `--fix` flag; without `--fix` the command modifies nothing and staging is a no-op
- `glob` and `exclude` filters are respected when determining which files to re-stage
