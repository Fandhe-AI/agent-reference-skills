# Caching

## Usage

Two kinds of hashes are computed for each task; a cache hit only occurs when both match.

### Global hash (shared across all tasks)

- Changes to the `turbo.json` configuration
- Updates to the root `package.json` lockfile
- Content changes to files listed in `globalDependencies`
- Value changes to environment variables in `globalEnv`
- Passthrough arguments after `--`

### Package hash (per task)

- Changes to a package-specific `turbo.json`
- Changes to a package's `package.json`
- File changes (default: all files; configurable via `inputs`)

### What gets cached

- Files/directories defined in `outputs`
- Terminal logs (always cached)

```bash
turbo build --dry       # Preview the task plan without running it
turbo build --summarize # Generate a detailed JSON summary of inputs/outputs
```

## Options

| Method | Description |
| --- | --- |
| `"cache": false` | Permanently disable caching for a specific task |
| `--force` | Re-run without reading the cache |
| `--cache` flag | Fine-grained control over local/remote read/write |
| `--summarize` | Generate a debug report of hashing |

## Notes

- Local cache is shared automatically between the main worktree and linked Git worktrees; explicitly setting `cacheDir` disables this.
- Caching provides less benefit when: task execution is faster than network latency, output artifacts are very large, or the script itself has its own internal caching mechanism.
