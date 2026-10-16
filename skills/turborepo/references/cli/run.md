# turbo run

## Signature / Usage

```bash
turbo run [tasks] [options] [-- [args passed to tasks]]
```

- `turbo run` is aliased to `turbo` (`turbo run build lint` = `turbo build lint`). Using `turbo run` in CI and `turbo` with global `turbo` locally is recommended.
- Arguments after `--` are passed to the underlying scripts of **all** tasks named in the command.
- With no tasks, `turbo run` lists the tasks available for the packages in the repository.
- Yarn v1 consumes the first `--`, so use `-- --` (e.g. `yarn turbo run build -- -- --sourcemap`).

## Options / Props

### Filtering

| Option | Description |
|---|---|
| `--filter <pattern>` / `-F` | Narrow down which packages to run (see Notes) |
| `--affected` | Run only packages affected by changes on the current branch; combined with `--filter`, only packages matching both are selected |
| `--only` | Run only the specified task, without its dependent tasks (and only in the specified packages, excluding dependencies) |
| `--single-package` | Run in single-package workspace mode, treating the repository as one package |

### Cache control

| Option | Default | Description |
|---|---|---|
| `--cache` | `local:rw,remote:rw` | Cache sources, comma-separated `local` / `remote` with `rw` / `r` / `w` / none (`local:`). An omitted source disables both read and write |
| `--force` | — | Ignore existing cached artifacts and re-execute all tasks (overwrites existing task caches; `TURBO_FORCE`) |
| `--cache-dir` | `.turbo/cache` | Filesystem cache directory (`TURBO_CACHE_DIR`; keep it in `.gitignore` when changed) |
| `--cache-workers` | `10` | Number of concurrent cache operations |
| `--global-deps <glob>` | — | Glob of global filesystem dependencies to hash (e.g. `.env`); `globalDependencies` in `turbo.json` is recommended instead |
| `--no-cache` | `false` | Deprecated: removed in a future major release, use `--cache` |
| `--remote-only` | `false` | Deprecated: removed in a future major release, use `--cache` |

### Remote Cache

| Option | Default | Description |
|---|---|---|
| `--remote-cache-timeout` | `30` | Timeout for Remote Cache operations in seconds |
| `--preflight` | — | Send a preflight request before every cache artifact and analytics request (`TURBO_PREFLIGHT=true`); only when Remote Caching is configured |
| `--token` | — | Bearer token for Remote Caching (`TURBO_TOKEN`; the flag overrides the variable); use with `--team` in non-interactive shells |
| `--team` | — | Slug of the Remote Cache team (`TURBO_TEAM`; the flag overrides the variable) |

### Execution control

| Option | Default | Description |
|---|---|---|
| `--concurrency` | `10` | Maximum concurrent tasks: integer >= `1` or a percentage such as `50%` / `100%` (all logical processors); `1` forces serial execution |
| `--continue[=<option>]` | `never` | Behavior on error: `never` / `dependencies-successful` / `always`; `--continue` with no value means `always`. turbo exits with the highest exit code encountered |
| `--env-mode` | `strict` | `strict` (only `env` / `passThroughEnv` / `globalEnv` / `globalPassThroughEnv`) or `loose` (all variables); `TURBO_ENV_MODE`. `PATH`, `SHELL`, `SYSTEMROOT` are always available |
| `--cwd` | directory of root `turbo.json` | Working directory of the command |
| `--dangerously-disable-package-manager-check` | — | Opt out of the package manager declaration check (`devEngines.packageManager` recommended; legacy `packageManager` still supported); best-effort package manager discovery instead. Also available as a `turbo.json` key and `TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK` |
| `--framework-inference` | `true` | Enable/disable Framework Inference (automatic env var inclusion) |
| `--ui` | — | UI for output: `stream` or `tui` |
| `--parallel` | `false` | Deprecated: removed in a future major release. Discards the task graph (caching, ordering lost). Use `persistent` + `with` for dev tasks, or `--concurrency=100%` to lift the limit |
| `--daemon` / `--no-daemon` | — | Deprecated: ignored by `turbo run` (daemon is still used by `turbo watch` and the LSP), removed in 3.0 |

### Output & debugging

| Option | Default | Description |
|---|---|---|
| `--dry` / `--dry-run` | — | Show the task plan without running it; `--dry=json` for JSON |
| `--graph [file]` | `dot` | Output a graph file: `svg` / `html` / `mermaid` / `dot`; no filename prints dot to stdout. `png` / `jpg` / `pdf` / `json` are deprecated and removed in 3.0 (need Graphviz; use `turbo query`) |
| `--json` (Experimental) | — | Output NDJSON to stdout instead of text; disables the TUI and forces stream mode |
| `--log-file [path]` (Experimental) | `.turbo/logs/<timestamp>.json` | Write structured JSON logs to a file (`TURBO_LOG_FILE`; flag takes precedence) |
| `--output-logs` | `full` | `full` / `hash-only` / `new-only` / `errors-only` / `none`; overrides `outputLogs` in `turbo.json` |
| `--log-order` | `auto` | `stream` / `grouped` / `auto` (`grouped` in CI, `stream` elsewhere); not applicable with the TUI |
| `--log-prefix` | `auto` | `task` / `none` / `auto` for the `<package>:<task>:` prefix |
| `--summarize` | — | Write run metadata JSON to `.turbo/runs` |
| `--profile` | — | Produce Chrome Tracing and Markdown traces of the run |
| `--anon-profile` | — | Same as `--profile`, attempting to redact sensitive information |
| `--verbosity` / `-v` | — | `--verbosity=1` / `-v` Info, `=2` / `-vv` Debug, `=3` / `-vvv` Trace |

## Notes

- Filter targets (multiple filters form a union; negated filters remove packages from it; `-F` is an alias):

  | Target type | Description | Example |
  |---|---|---|
  | Package | Select a package by its `package.json` name | `turbo run build --filter=ui` |
  | Directory | Select by directory; **wrapped in `{}` when used with other filters** | `turbo run build --filter=./apps/*` |
  | Git commits | Packages with source control changes; **wrapped in `[]`** | `turbo run build --filter=[HEAD^1]` |

- Microsyntaxes:

  | Syntax | Meaning |
  |---|---|
  | `!` | Negate targets from the selection |
  | `...pkg` | Select dependents of the target |
  | `pkg...` | Select dependencies of the target |
  | `[<from>]...[<to>]` | Git commit range |
  | `^` | Omit the target itself when using `...` |

- Filtering by tag: `tag:<label>` selects tasks with a matching task or package tag (a package tag matches every requested task in that package; a task tag only tasks carrying it). No future flag is required. Labels match exactly and case-sensitively (not globs); multiple includes are a union; required dependencies and co-scheduled `with` tasks are retained even without the tag. `...` / `^` traverse the Task Graph (`...tag:ci` dependents, `tag:ci...` dependencies); `{dir}` and `[git]` qualifiers narrow it (`tag:ci{./apps/*}[HEAD^1]`, Git-qualified selectors match changed files against task inputs). For labels containing selector syntax use a JSON string and preserve the quotes:
  ```bash
  turbo run test --filter=tag:ci --filter='!tag:slow'
  turbo run test --filter='tag:"ci..."'
  ```
- Task identifier `package-name#task-name` runs one task of one package (and its dependencies; use `--only` to skip them):
  ```bash
  turbo run web#lint
  ```
- `--affected` is equivalent to `--filter=...[main...HEAD]` by default. Override with `TURBO_SCM_BASE` / `TURBO_SCM_HEAD`. If the checkout is too shallow, all packages are considered changed (use `--filter=blob:none --depth=0` when checking out). It works at package level; enable `futureFlags.affectedUsingTaskInputs` to filter by each task's `inputs` globs instead.
  ```bash
  turbo run build --affected --filter=!docs
  TURBO_SCM_BASE=development turbo run build --affected
  ```
- The official docs suggest `--filter=blob:none --depth=0`, but Git rejects `--depth=0` (`fatal: depth 0 is not a positive number`). To get full history, omit `--depth` on a fresh `git clone --filter=blob:none`, run `git fetch --unshallow` on an existing shallow checkout, or set `fetch-depth: 0` on `actions/checkout` (a GitHub Actions input, not a Git flag).
- Advanced filter examples:
  ```bash
  turbo run build --filter={./apps/*}[HEAD^1]      # changed packages in apps
  turbo run build --filter=./apps/* --filter=!./apps/admin
  turbo run build --filter=...[origin/my-feature]  # dependents of branch changes
  turbo run build --filter=@acme/ui...[HEAD^1]
  turbo run test --filter=@acme/*{./packages/*}[HEAD^1]
  ```
- `--dry=json` task fields (non-exhaustive): `taskId` (`package-name#task-name`), `task`, `package`, `hash`, `hashOfExternalDependencies` (global hash), `command`, `inputs`, `outputs`, `dependencies` (run before), `dependents` (run after), `environmentVariables` (from `env` and `passThroughEnv`).
- `--json` lines: `{"timestamp":..., "source":"web#build", "level":"stdout", "text":"..."}`. `source` is `"turbo"` or `"<package>#<task>"`; `level` is `info` / `warn` / `error` (turbo) or `stdout` / `stderr` (task); `text` has ANSI stripped. Combinable with `--log-file`. Structured output captures all task output verbatim, including any echoed secrets.
- `--log-file`: the file is a valid JSON array at all times, created with owner-only permissions (`0600`) on Unix; the path is restricted to the repository root.
- `--graph` known bug: all possible task nodes are added even when the script does not exist in a package (no execution impact).
- Common combinations:
  ```bash
  turbo run build --affected
  turbo run build --dry=json
  turbo run test --continue=always
  turbo run build --cache=local:r,remote:rw
  turbo run test --filter=...@acme/ui
  turbo run build --concurrency=50%
  ```
