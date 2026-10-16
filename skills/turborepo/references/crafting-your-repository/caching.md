# Caching

## Usage

Turborepo restores the results of a cacheable task from cache using a fingerprint (hash) from the first time the task ran. Two hashes are computed for each task (global hash and task hash); if either changes, the task misses cache. Turborepo assumes tasks are deterministic.

### Global hash inputs

| Input | Example |
| --- | --- |
| Resolved task definition from root `turbo.json` and package `turbo.json` | Changing `outputs` in the root `turbo.json` or a Package Configuration |
| Lockfile changes that affect the Workspace root | Updating dependencies in root `package.json` causes **all** tasks to miss cache |
| Source files in internal packages used by the Workspace root | If root `package.json` depends on `@repo/tooling`, changing `packages/tooling/src/index.ts` causes **all** tasks to miss cache |
| `globalDependencies` file contents | Changing `./.env` when listed in `globalDependencies` |
| Values of variables listed in `globalEnv` | Changing the value of `GITHUB_TOKEN` when listed in `globalEnv` |
| Flag values that affect task runtime | Behavior-changing flags like `--cache-dir`, `--framework-inference`, `--env-mode` |
| Arbitrary passthrough arguments | `turbo build -- --arg=value` misses cache for **all** tasks versus `turbo build` or `turbo build -- --arg=diff` (including dependencies of `build` that did not receive `--arg=value`) |

### Root workspace dependencies

Source files of every internal workspace package that the root `package.json` depends on, directly or transitively, are included in the global hash. If the root depends on `@repo/tooling`, changing a source file there makes every cacheable task miss cache; a change to an internal package outside this closure only changes the relevant package and task hashes. When comparing Git revisions, `turbo query affected --packages` reports this repository-wide result with the `RootInternalDepChanged` reason.

### Package hash inputs

| Input | Example |
| --- | --- |
| Package Configuration changes | Changing a package's `turbo.json` |
| Lockfile changes that affect the package | Updating dependencies in a package's `package.json` |
| Package's `package.json` changes | Updating the `name` field |
| File changes | Defaults to all source-controlled files in the package directory; configurable with `inputs` |

### What gets cached

- Files/directories defined in `outputs` (not declared = not cached; make sure outputs are defined if files are missing after a cache hit)
- Terminal logs (always captured and replayed; verbosity via `--output-logs` or `outputLogs`)

```bash
turbo build --dry       # Preview the task plan without running it
turbo build --summarize # Generate a detailed JSON summary of inputs/outputs
```

## Options

| Method | Description |
| --- | --- |
| `"cache": false` | Permanently disable caching for a specific task |
| `--force` | Re-run without reading the cache (disables **reading**, not writing) |
| `--cache` flag | Fine-grained control over local/remote read/write |
| `--summarize` | Generate a debug report of hashing; comparing two summaries shows why hashes differ |

## Notes

- Remote Caching: authenticate with `npx turbo login`, then `npx turbo link`; outputs are then sent to the Remote Cache automatically. By default Turborepo uses Vercel Remote Cache with zero configuration.
- Git worktree cache sharing:
  - How it works: for a linked worktree (`git worktree add ../my-feature feature-branch`) Turborepo redirects the cache to the main worktree's `.turbo/cache`, enabling cache hits across branches, reduced disk usage, and faster iteration. The output shows `• Remote caching enabled, using shared worktree cache` when active.
  - Setting an explicit `cacheDir` in `turbo.json` disables sharing; each worktree uses its own directory.
  - Outputs containing absolute paths: cache artifacts are restored without rewriting contents, so an output containing the absolute path to its worktree can point to another checkout after restore. Set an explicit `cacheDir` such as `.turbo/cache` to isolate caches per worktree.
  - With Remote Caching: the local cache is shared between worktrees on the same machine, the remote cache across machines and CI; if the local cache lacks the artifact, Turborepo falls back to the Remote Cache.
- Caching provides less benefit when: task execution is faster than a network round-trip to the Remote Cache, output artifacts are enormous (e.g. a complete Docker container), or the script has its own internal caching.
- Troubleshooting: `--dry` shows what would run; `--summarize` shows inputs/outputs of a run (community viewers exist, e.g. turbo.nullvoxpopuli.com, `turborepo-summary`, `turborepo-summary-action`).
