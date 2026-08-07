# turbo.json Configuration

## Usage

```json
{
  "$schema": "https://turborepo.com/schema.json",
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

## Options / Props

### Global Configuration

| Key | Default | Description |
|---|---|---|
| `extends` | — | Extends the root `turbo.json` (for package-specific configuration) |
| `globalDependencies` | `[]` | Globs of files to include in every task's hash |
| `globalEnv` | `[]` | Environment variables that affect every task's hash |
| `globalPassThroughEnv` | `[]` | Environment variables made available to every task (no hash impact) |
| `ui` | `"stream"` | `"tui"` or `"stream"` |
| `cacheDir` | `".turbo/cache"` | Cache storage location |
| `cacheMaxAge` | `"0"` | Maximum cache retention period (e.g. `"7d"`, `"24h"`) |
| `cacheMaxSize` | `"0"` | Maximum cache size (e.g. `"10GB"`, `"500MB"`) |
| `envMode` | `"strict"` | `"strict"` or `"loose"` |
| `concurrency` | `"10"` | Maximum number of tasks to run in parallel |
| `noUpdateNotifier` | `false` | Disables the update notification |
| `dangerouslyDisablePackageManagerCheck` | `false` | Disables `packageManager` validation |
| `futureFlags` | — | Enables experimental features that will become default in the future |
| `tags` | — | Package tags used by Boundaries (package configuration only) |
| `global` | — | Namespace for global options (requires the `globalConfiguration` flag) |
| `remoteCache` | — | Remote Cache configuration |
| `experimentalObservability` | — | OpenTelemetry metrics output configuration |
| `boundaries` | — | Rule configuration for the `turbo boundaries` command |
| `tasks` | — | Task definitions |

### futureFlags

| Flag | Default | Description |
|---|---|---|
| `errorsOnlyShowHash` | `false` | Shows the task hash when `outputLogs: "errors-only"` |
| `longerSignatureKey` | `false` | Restricts Remote Cache signature keys to 32 bytes or more |
| `affectedUsingTaskInputs` | `false` | Uses task-level `inputs` for `--affected` |
| `watchUsingTaskInputs` | `false` | Filters `turbo watch` using the task's `inputs` globs |
| `pruneIncludesGlobalFiles` | `false` | Includes `globalDependencies` files in `turbo prune` output |
| `filterUsingTasks` | `false` | Resolves `--filter` at the task level instead of the package level |
| `globalConfiguration` | `false` | Moves global options under the `global` namespace |

### Task Definitions (`tasks`)

| Key | Default | Description |
|---|---|---|
| `dependsOn` | `[]` | Execution dependencies of the task |
| `inputs` | all files tracked in source control | Globs of files included in the hash |
| `outputs` | `[]` | Files to cache |
| `cache` | `true` | Enables/disables caching |
| `env` | `[]` | Environment variables that affect the task's hash |
| `passThroughEnv` | `[]` | Environment variables available only at runtime |
| `persistent` | `false` | Marks the task as a long-running process |
| `interactive` | `false` | Enables stdin input |
| `interruptible` | `false` | Allows restarts during `turbo watch` |
| `outputLogs` | `"full"` | `"full"` / `"hash-only"` / `"new-only"` / `"errors-only"` / `"none"` |
| `with` | `[]` | Tasks to run concurrently |
| `extends` | `true` | Inherits configuration from the extends chain (task level) |
| `description` | `""` | Description of the task (informational only) |

## Notes

- `inputs` special values:
  - `$TURBO_DEFAULT$`: retains the default behavior while adding/excluding entries
  - `$TURBO_ROOT$`: path relative to the repository root
  - `$TURBO_EXTENDS$`: appends to the inherited value
