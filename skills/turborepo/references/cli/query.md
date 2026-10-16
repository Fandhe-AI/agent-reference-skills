# turbo query

## Signature / Usage

```bash
turbo query [query|file.gql] [flags]
```

Runs GraphQL queries against the monorepo to analyze package dependencies and task relationships.

```bash
turbo query                              # opens a GraphiQL playground
turbo query "query { packages { items { name } } }"  # run directly
turbo query query.gql                    # from a file
turbo query --schema                     # print the GraphQL schema
```

## Options / Props

| Option | Description |
|---|---|
| `--schema` | Output the GraphQL introspection schema (cannot be used with a query argument) |
| `--variables` / `-V` | Path to a JSON file of query variables (requires a query argument) |
| `--filter` / `-F` | Filter packages using pnpm-style selectors (`turbo query ls`) |
| `--output` (Experimental) | Output format for `turbo query ls` (`json` or `pretty`, default `pretty`) |

## Notes

- `turbo query ls` — shorthand for a `packages` query, equivalent to `turbo ls`; with package names it returns tasks, dependencies, and dependents. `--affected` shows packages affected between the current branch and `main`; combined with `--filter` it returns the intersection:
  ```bash
  turbo query ls              # all packages
  turbo query ls web          # details for a specific package
  turbo query ls --affected --filter=web
  turbo query ls --filter=web... --output json
  ```
- `turbo query affected` — which packages or tasks are affected between two git refs. With no flags it returns affected tasks (task-level detection: a task is affected only if its `inputs` match a changed file or an upstream task dependency is affected). If the checkout is too shallow, all packages are considered changed (check out with `--filter=blob:none --depth=0`).
  ```bash
  turbo query affected [flags]
  ```

  | Flag | Description |
  |---|---|
  | `--tasks [names]` | Filter to task names; no values returns all affected tasks |
  | `--packages [names]` | Without `--tasks`, returns affected packages instead of tasks; with values filters to the named packages. Combined with `--tasks`, both filters apply (intersection) |
  | `--base [ref]` | Git ref to compare from; default is the auto-detected base (e.g. `GITHUB_BASE_REF` on GitHub Actions, or the merge-base with `main`); `TURBO_SCM_BASE` also works, the flag wins |
  | `--head [ref]` | Git ref to compare against (default `HEAD`); `TURBO_SCM_HEAD` also works, the flag wins |
  | `--exit-code` | Exit `1` when affected packages or tasks are found, `0` when none, `2` on errors; JSON is still printed |

  ```bash
  turbo query affected --tasks build --packages web
  turbo query affected --packages web docs
  ```

### Affected packages

By default `affectedPackages` follows the Package Graph (an explicit `package#task` dependency does not create a package dependency). With `futureFlags.affectedUsingTaskInputs` it returns the unique packages that own affected tasks: changed files are matched against task `inputs` and the Task Graph is followed to dependent tasks (including across enabled toolchains); packages with no affected tasks are omitted. This also applies to `turbo query affected --packages`. Use `affectedTasks` for individual tasks and `withDependencies` for execution prerequisites.

### Task planning

Select task metadata without a full `turbo run --dry=json`:

```bash
turbo query '
query {
  globalEnvironment { env passThroughEnv }
  affectedTasks(base: "origin/main", head: "HEAD", tasks: ["lint", "test"]) {
    items { fullName }
    withDependencies {
      length
      items { fullName name command package { name path }
              directDependencies { items { fullName } }
              environment { env passThroughEnv } }
    }
  }
}
'
```

- `affectedTasks.withDependencies` returns the collection plus transitive dependencies, deduplicated by task ID and sorted by package then task name; `length` counts unique tasks. Select only `fullName` under `directDependencies` to represent edges without repeating dependency trees. It includes non-executable transit and leaf dependencies, implicit native tasks, and command overrides (`command` is `null` without a command). The internal graph root is excluded; configured root tasks such as `//#lint` are included when required. `affectedTasks.items` is unchanged.
- Environment patterns: `globalEnvironment` exposes `globalEnv` / `globalPassThroughEnv` as `env` / `passThroughEnv`; each task's `environment` exposes its configured `env` / `passThroughEnv` after resolving Package Configurations, inheritance, and `$TURBO_EXTENDS$` (also available outside affected queries, e.g. `package(name: "web") { tasks { items { environment { env } } } }`). Both return arrays (`[]` when none); wildcards and exclusions are preserved — they are configuration patterns, not expanded variable values. The query does not execute tasks, report cache hits, or include file-hash inventories.

### Package task catalogue

`package.tasks` lists native scripts and resolved Task Graph entries, including configured tasks without a script and tasks with an explicit command. Scriptless tasks have `script: null` and `command: null` unless a command is configured; tasks excluded by `extends: false` are not listed; names are deduplicated and sorted; task filters apply to the full catalogue.

### Tags

Packages and tasks expose a `tags` array (`[]` when none). Package tags come from the package's loaded `turbo.json` (no task labels, no inheritance of root labels). A task's `tags` holds resolved task labels only (after inheritance and `$TURBO_EXTENDS$`; order and duplicates preserved; marker not exposed). Filter with `has: { field: TAG, value: "label" }` (exact, case-sensitive): package predicates match package labels only; task predicates match resolved task labels or package labels.

```bash
turbo query '
query {
  packages(filter: {has: {field: TAG, value: "frontend"}}) { items { name tags } }
  package(name: "web") {
    tasks(filter: {has: {field: TAG, value: "ci"}}) { items { fullName tags package { tags } } }
  }
}
'
```

Task predicates support `and` / `or` / `not` and `equal` / `notEqual` on `NAME`, `FULL_NAME`, and `EXPERIMENTAL_CI` (compares resolved `experimentalCI` metadata as JSON: boolean, object, or `null`; objects use structural equality; an omitted `value` equals `null`). The task `filter` is available on package task lists, dependency/dependent lists, and `withDependencies`. For affected tasks pass `taskFilter` next to the package `filter` or task-name `tasks` arguments; those filters intersect before required prerequisites are added, so prerequisites may lack the tag. Filters on dependency/dependent lists and `withDependencies` apply after traversal and do not prune traversal.

### Understanding affected-package reasons

The `reason.__typename` explains why a package is included (diagnostic output, not a `turbo.json` value). Repository-wide reasons include every package. `RootInternalDepChanged` also changes the global hash, so every cacheable task misses cache. Run `turbo query --schema` for the exact schema of the installed version.

Change-detection reason types:

| `reason.__typename` | Meaning |
|---|---|
| `FileChanged` | A file in this package changed |
| `LockfileChanged` | The lockfile comparison found added or removed external dependencies for this package |
| `ConservativeRootLockfileChanged` | The root package is included after a lockfile change because it may depend on a workspace package |
| `RootInternalDepChanged` | A direct or transitive internal workspace dependency of the root package changed; all packages selected and the global hash changes |
| `GlobalDepsChanged` | A file configured in `globalDependencies` changed; all packages selected |
| `DefaultGlobalFileChanged` | `turbo.json` or `turbo.jsonc` changed; all packages selected |
| `LockfileChangeDetectionFailed` | Could not safely compare lockfile versions; all packages selected |
| `LockfileChangedWithoutDetails` | Lockfile changed but its previous content was unavailable; all packages selected |
| `GitRefNotFound` | The requested Git range could not be resolved; all packages selected |
| `ScmError` | Source-control change detection failed; all packages selected |

Package-selection reason types (graph or filter expansion):

| `reason.__typename` | Meaning |
|---|---|
| `DependencyChanged` | Included because one of its dependencies changed |
| `DependentChanged` | Included because an included package depends on it |
| `InFilteredDirectory` | Selected by a directory filter |
| `IncludedByFilter` | Selected explicitly by a filter or package-qualified task |
| `RootTask` | A root task was included in the run |

Task output uses task reasons such as `TaskFileChanged` (e.g. `{"name":"build","fullName":"web#build","package":{"name":"web"},"reason":{"__typename":"TaskFileChanged"}}`).

### Migrating from turbo-ignore

`turbo-ignore` is deprecated; `turbo query affected` replaces it with task-level detection that respects `inputs` (a `.md` change does not trigger a rebuild if the task excludes `*.md`) and JSON output including the reason.

| `turbo-ignore` | `turbo query affected` |
|---|---|
| `npx turbo-ignore my-app` | `turbo query affected --packages my-app` |
| `--task build` | `--tasks build` |
| `--fallback main` | `--base main` |

```bash
set -euo pipefail
affected=$(turbo query affected --packages my-app)
count=$(printf '%s\n' "$affected" | jq -e '.data.affectedPackages.length')
case "$count" in ''|*[!0-9]*) echo "could not determine affected packages" >&2; exit 1;; esac
if [ "$count" -gt 0 ]; then echo "affected, proceeding"; else echo "skipping"; exit 0; fi
```

- Adapted from the official turbo-ignore migration example; `set -euo pipefail`, `jq -e`, and a numeric check were added so a failed query does not skip CI. Alternatively use `--exit-code` (2 on errors).

- `turbo query` is not marked Experimental in the v2.11.8 docs (only `ls --output` is); the docs do not state the version it became stable.

## Related

- [turbo run](./run.md)
- [Other commands](./other-commands.md)
