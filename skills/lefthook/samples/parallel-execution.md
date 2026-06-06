# Parallel Execution

Run multiple hook commands concurrently to reduce total wait time.

```yaml
# lefthook.yml

pre-commit:
  parallel: true
  commands:
    lint:
      glob: "*.{js,ts,jsx,tsx}"
      run: yarn eslint {staged_files}
    typecheck:
      run: yarn tsc --noEmit
    test:
      run: yarn vitest related {staged_files}
```

## Notes

- `parallel: true` at the hook level runs all commands simultaneously
- Use `piped: true` instead when commands must run sequentially and stop on first failure
- `parallel` and `piped` are mutually exclusive — setting both causes an error
- Individual commands within a parallel hook can still use `priority` to define ordering for non-parallel fallback
