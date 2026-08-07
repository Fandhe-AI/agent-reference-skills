# turbo watch

## Signature / Usage

```bash
turbo watch [tasks]
```

Re-runs tasks based on code changes.

## Notes

- Watch granularity:
  - **Default**: package-level. Any single file change re-runs all tasks.
  - **With `futureFlags.watchUsingTaskInputs` enabled**: filters based on each task's `inputs` globs.
- Relationship with persistent tasks:

  | Case | Recommendation |
  |---|---|
  | Has a built-in watcher (e.g. `next dev`) | Mark as `"persistent": true` and don't use `turbo watch` |
  | Watcher isn't monorepo-aware | Mark as `"interruptible": true` so it restarts on change detection |

  Persistent tasks are ignored by `turbo watch`.
- Limitations:
  - Caching is currently experimental (enable with `--experimental-write-cache`)
  - Tasks that write to files under source control risk infinite loops
