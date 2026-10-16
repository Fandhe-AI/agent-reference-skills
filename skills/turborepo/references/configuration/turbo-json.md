# turbo.json Configuration

## Usage

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "globalDependencies": [".env"],
  "globalEnv": ["NODE_ENV"],
  "globalPassThroughEnv": ["CI"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "package.json", "tsconfig.json"],
      "outputs": ["dist/**"],
      "env": ["MY_API_URL"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**", "test/**"]
    },
    "lint": {},
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    }
  }
}
```

`turbo.jsonc` is also supported (comments with IDE support).

## Options / Props

### Global Configuration

| Key | Default | Description |
|---|---|---|
| `extends` | — | Extends the root `turbo.json` (Package Configurations). Must start with `["//"]`; can also extend other packages (`["//", "shared-config"]`); ignored in the root `turbo.json` |
| `globalDependencies` | `[]` | Globs (relative to `turbo.json`, inside the repository) included in every task's hash; any change misses all caches. Root `package.json`, lockfile, and source files of internal packages the root depends on are always in the global hash |
| `globalEnv` | `[]` | Environment variables that affect every task's hash |
| `globalPassThroughEnv` | `[]` | Environment variables made available to every task (no hash impact); opts all tasks into Strict mode. Built-in passthrough set includes `HOME`, `PATH`, `APPDATA`, `SHELL`, `PWD` and more |
| `ui` | `"stream"` | `"tui"` or `"stream"` |
| `noUpdateNotifier` | `false` | Disables the update notification |
| `agentGuidance` | `false` | Root-only. When an AI coding agent is detected, `turbo` maintains a managed block in the repository-root `AGENTS.md` pointing to the docs bundled with the installed `turbo`; only Turborepo's own block is updated. Opting out does not delete an existing block; the default starter includes it |
| `concurrency` | `"10"` | Max concurrent tasks: integer >= `1` or a percentage such as `50%`; `100%` uses all logical processors. Ignored if the deprecated `--parallel` is passed |
| `dangerouslyDisablePackageManagerCheck` | `false` | Opts out of the package manager declaration check (`devEngines.packageManager` recommended; legacy `packageManager` also supported); also available as flag and `TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK` |
| `cacheDir` | `".turbo/cache"` | Cache storage location |
| `cacheMaxAge` | `"0"` (disabled) | Max age of local cache entries before eviction (`s` / `m` / `h` / `d` / `w`, e.g. `"7d"`); `TURBO_CACHE_MAX_AGE` |
| `cacheMaxSize` | `"0"` (disabled) | Max total local cache size (`MB` / `GB` / `TB`, case-insensitive, fractions like `1.5GB` allowed); `TURBO_CACHE_MAX_SIZE` |
| `daemon` | — | Deprecated: the daemon is no longer used by `turbo run`; removed in 3.0 (still used by `turbo watch` and the LSP) |
| `envMode` | `"strict"` | `"strict"` or `"loose"` |
| `futureFlags` | — | Enables features that will become default in future versions (root `turbo.json` only) |
| `tags` (Experimental) | — | Arbitrary string labels for the package containing the config |
| `global` | — | Namespace for global options (requires the `globalConfiguration` future flag) |
| `remoteCache` | — | Remote Cache configuration |
| `experimentalObservability` | — | OpenTelemetry metrics output (requires the `experimentalObservability` future flag) |
| `boundaries` | — | Rule configuration for `turbo boundaries` |
| `tasks` | — | Task definitions |

### futureFlags

| Flag | Default | Description |
|---|---|---|
| `errorsOnlyShowHash` | `false` | Shows the task hash when `outputLogs: "errors-only"` (`cache miss, executing <hash> (only logging errors)` / `cache hit, replaying logs (no errors) <hash>`) |
| `longerSignatureKey` | `false` | Enforces a 32-byte minimum for `TURBO_REMOTE_CACHE_SIGNATURE_KEY` when `remoteCache.signature` is enabled; fails at the start of the run if shorter |
| `affectedUsingTaskInputs` | `false` | Uses task-level `inputs` for `--affected` (also makes `turbo query` `affectedPackages` and `turbo prune` follow the Task Graph) |
| `githubActionsRemoteBaseRefFallback` | `false` | When GitHub Actions reports a PR base branch not available as a local ref, fall back to `origin/<branch>`; local refs still win, explicit `TURBO_SCM_BASE` and default `main` / `master` resolution unchanged |
| `watchUsingTaskInputs` | `false` | Filters `turbo watch` using the task's `inputs` globs |
| `pruneIncludesGlobalFiles` | `false` | Includes `globalDependencies` files in `turbo prune` output (inclusion and `!` exclusion globs supported) |
| `filterUsingTasks` | `false` | Resolves `--filter` at the task level (Git ranges match task `inputs`; `...` follows the Task Graph) |
| `strictTaskEntrypointSelection` | `false` | Selects requested tasks by whether they resolve a command: packages without a command do not become entrypoints. Scriptless tasks stay available for graph-only orchestration; independent of `filterUsingTasks` |
| `globalConfiguration` | `false` | Moves global options under the `global` namespace (old top-level keys then hard-error with a rename hint) |
| `experimentalObservability` | `false` | Honors the `experimentalObservability.otel` block |

### globalConfiguration renames

| Old key | New location |
|---|---|
| `globalDependencies` | `global.inputs` |
| `globalEnv` | `global.env` |
| `globalPassThroughEnv` | `global.passThroughEnv` |
| `ui` | `global.ui` |
| `envMode` | `global.envMode` |
| `cacheDir` | `global.cacheDir` |
| `cacheMaxAge` | `global.cacheMaxAge` |
| `cacheMaxSize` | `global.cacheMaxSize` |
| `concurrency` | `global.concurrency` |
| `daemon` | `global.daemon` |
| `noUpdateNotifier` | `global.noUpdateNotifier` |
| `dangerouslyDisablePackageManagerCheck` | `global.dangerouslyDisablePackageManagerCheck` |
| `remoteCache` | `global.remoteCache` |
| `experimentalObservability` | `global.experimentalObservability` |

### Task Definitions (`tasks`)

| Key | Default | Description |
|---|---|---|
| `dependsOn` | `[]` | Execution dependencies: `^task` (dependencies' tasks), `task` (same package), `pkg#task` (arbitrary) |
| `inputs` | all files tracked in source control | Globs (relative to the package) included in the hash; `package.json`, `turbo.json`, and lockfiles are always inputs. Entries may be deferred-hashing objects |
| `outputs` | `[]` | Globs to cache (must resolve inside the repository root); logs are always cached when caching is enabled |
| `cache` | `true` | Enables/disables caching |
| `env` | `[]` | Environment variables that affect the task's hash (wildcards `*`, negation `!`) |
| `passThroughEnv` | `[]` | Environment variables available at runtime only (no hash impact) |
| `persistent` | `false` | Marks the task as a long-running process; other tasks cannot depend on it; interactive by default |
| `interactive` | `false` (`true` when persistent) | Accepts stdin in the terminal UI; must be used with `persistent` |
| `interruptible` | `false` | Allows a persistent task to be restarted by `turbo watch` |
| `outputLogs` | `"full"` | `"full"` / `"hash-only"` / `"new-only"` / `"errors-only"` / `"none"` |
| `with` | `[]` | Tasks to run alongside this task |
| `tags` | — | Arbitrary task labels (see Notes) |
| `extends` | `true` | Task-level, Package Configurations only. `false` excludes the task from inheritance (or creates a fresh definition if other config is given) |
| `description` | `""` | Description of the task (informational only) |

### remoteCache

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` | When `false`, all remote cache operations are disabled even with a valid token |
| `signature` | `false` | Signs uploaded artifacts with `TURBO_REMOTE_CACHE_SIGNATURE_KEY` and rejects downloads with invalid or missing signatures (integrity check, not a security feature) |
| `preflight` | `false` | Precedes any HTTP request with an OPTIONS request |
| `timeout` | `30` | Seconds, whole values only; `0` = no timeout |
| `uploadTimeout` | `60` | Seconds, whole values only; `0` = no timeout |
| `apiUrl` | `"https://vercel.com"` | Endpoint for Remote Cache API calls |
| `loginUrl` | `"https://vercel.com"` | Endpoint for requesting tokens during `turbo login` |
| `teamId` | — | Remote Cache team ID, passed as `teamId` in the querystring; must start with `team_` |
| `teamSlug` | — | Remote Cache team slug, passed as `slug` in the querystring |

### experimentalObservability.otel (Experimental)

Requires `futureFlags.experimentalObservability: true` in the root `turbo.json` for every configuration source (file, environment variables, CLI flags); otherwise Turborepo errors.

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` (when endpoint is provided) | Enable/disable the exporter |
| `protocol` | `"grpc"` | `"grpc"` or `"http/protobuf"` |
| `endpoint` | — (required in file config) | OTLP collector URL; must be `https://` |
| `headers` | — | HTTP headers for export requests (tied to `endpoint`; not inherited if the endpoint is overridden) |
| `timeoutMs` | `10000` | Export request timeout |
| `intervalMs` | `15000` | Interval between periodic exports (final flush at run end) |
| `resource` | — | Resource attributes attached to all metrics |
| `metrics.runSummary` | `true` | Run-level metrics (duration, tasks attempted / failed / cached, exit code, SCM branch) |
| `metrics.taskDetails` | `false` | Per-task metrics |
| `metrics.runAttributes.id` / `.scmRevision` | `false` | Adds `turbo.run.id` / `turbo.scm.revision` (higher cardinality; needs `runSummary`) |
| `metrics.taskAttributes.id` / `.hashes` | `false` | Adds `turbo.task.id` / `turbo.task.hash` + `turbo.task.external_inputs_hash` (needs `taskDetails`) |
| `useRemoteCacheToken` | `false` | Adds `Authorization: Bearer <token>` from remote cache credentials (tied to `endpoint`) |

Environment variables: `TURBO_EXPERIMENTAL_OTEL_{ENABLED,PROTOCOL,ENDPOINT,TIMEOUT_MS,INTERVAL_MS,HEADERS,RESOURCE,METRICS_RUN_SUMMARY,METRICS_TASK_DETAILS,METRICS_TASK_ATTRIBUTES_ID,METRICS_TASK_ATTRIBUTES_HASHES,USE_REMOTE_CACHE_TOKEN}`. CLI flags: `--experimental-otel-enabled` / `--experimental-otel-protocol` / `--experimental-otel-endpoint` / `--experimental-otel-timeout-ms` / `--experimental-otel-interval-ms` / `--experimental-otel-header KEY=VALUE` (repeatable) / `--experimental-otel-resource KEY=VALUE` (repeatable) / `--experimental-otel-metrics-run-summary` / `--experimental-otel-metrics-task-details` / `--experimental-otel-use-remote-cache-token`. Priority: CLI flags > environment variables > `turbo.json`, deep-merged per field; changing the endpoint from a higher-priority source discards `headers` and `useRemoteCacheToken`.

## Notes

- `inputs` special values:
  - `$TURBO_DEFAULT$`: retains the default behavior while adding/excluding entries (specifying `inputs` otherwise opts out of `.gitignore` handling)
  - `$TURBO_ROOT$`: glob relative to the repository root
  - `$TURBO_EXTENDS$`: in Package Configurations, appends to the inherited value instead of replacing it. Applies to `dependsOn`, `env`, `inputs`, `outputs`, `passThroughEnv`, task `tags`, and `with`
- Deferred hashing: `inputs` entries can be objects whose hashing waits for dependencies; tasks depending on a deferred task are also deferred. `--dry=json` reports `hash: null` and a `hashReason` for them.
  ```json
  "inputs": [
    "$TURBO_DEFAULT$",
    "!src/generated/**",
    { "mode": "jit", "globs": ["src/generated/**"] },
    { "mode": "dependencyOutputs", "globs": ["dist/**/*.d.ts"], "from": ["^check-types"] }
  ]
  ```
  - `mode: "jit"`: hash `globs` just before execution, after dependencies complete.
  - `mode: "dependencyOutputs"`: hash the intersection of a dependency's declared `outputs` and `globs`; creates no graph edges (tasks must already be in `dependsOn`); `from` (only valid here) defaults to the direct task dependencies; selected tasks must declare `outputs`.
- Task `tags`: arbitrary labels; order and duplicates preserved; no effect on dependencies, commands, or boundary rules; not part of the resolved task hash (though editing a package `turbo.json` can still invalidate cache if that file is a task input). Package Configurations inherit them when omitted; an explicit array replaces them; `"tags": []` clears them; `["$TURBO_EXTENDS$", "frontend"]` appends; `extends: false` starts fresh. Used with `turbo run --filter=tag:<label>`.
- Top-level `tags` (Experimental) labels the package containing the config (root `turbo.json` labels the root package only). Labels need not be registered in `boundaries.tags`; existing boundary rules are unchanged. Separate from task tags and not inherited through task configuration.
- `globalDependencies` -> `global.inputs` changes semantics under `globalConfiguration`: files are prepended to every task's `inputs` for per-task hashing instead of contributing to the global hash, so tasks can exclude them with negation globs.
- `futureFlags` can only be set in the root `turbo.json` (error in Package Configurations). Flags that change behavior can invalidate the task cache.
- `cacheDir`: with no `cacheDir` set inside a Git worktree, the cache is shared with the main worktree. Artifacts are restored without rewriting contents, so outputs containing absolute worktree paths can point to another checkout after a cache hit. An explicit relative `cacheDir` (e.g. `.turbo/cache`) resolves from the current worktree root and disables sharing.
- `cacheMaxAge` / `cacheMaxSize`: eviction runs in a background thread at the start of each `turbo run`; age-based eviction runs first, then size-based (oldest entries evicted). Local cache eviction is opt-in today and expected to be enabled by default in Turborepo 3.0.
- `remoteCache.signature`: enable `futureFlags.longerSignatureKey` to enforce a 32-byte minimum key; short keys weaken HMAC-SHA256 and will be rejected in a future major version.
- Changes to root config files (`package.json`, `turbo.json`, `turbo.jsonc`), the lockfile, or `globalDependencies` always select / re-run all tasks regardless of `inputs` under `affectedUsingTaskInputs` / `watchUsingTaskInputs` / `filterUsingTasks`.
- Avoid storing tokens or API keys in `turbo.json` (e.g. OTEL `headers`); `turbo.json` is usually committed.
