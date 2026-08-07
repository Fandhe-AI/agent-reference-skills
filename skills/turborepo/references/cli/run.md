# turbo run

## Signature / Usage

```bash
turbo run <task> [options]
```

## Options / Props

### Filtering

| Option | Description |
|---|---|
| `--filter <pattern>` / `-F` | Narrow down which packages to run |
| `--affected` | Run only packages with changes |
| `--only` | Run only the specified task, without its dependent tasks |

### Cache control

| Option | Default | Description |
|---|---|---|
| `--cache` | `local:rw,remote:rw` | Cache read/write mode |
| `--force` | — | Ignore cache and re-run |
| `--cache-dir` | `.turbo/cache` | Cache directory |

### Execution control

| Option | Default | Description |
|---|---|---|
| `--concurrency` | `10` | Maximum concurrent executions |
| `--continue` | `never` | Behavior on error (`never`/`dependencies-successful`/`always`) |
| `--env-mode` | `strict` | Environment variable access control |

### Output & debugging

| Option | Description |
|---|---|
| `--dry` / `--dry-run` | Show the task plan without running it |
| `--graph` | Visualize the task graph (`dot`/`svg`/`html`/`mermaid`) |
| `--json` | Output NDJSON to stdout instead of human-readable text |
| `--log-file` | Write structured JSON logs to a file |
| `--output-logs` | Log output level |
| `--log-order` | Log ordering (`stream`/`grouped`/`auto`, default: `auto`) |
| `--log-prefix` | Log prefix control (`task`/`none`/`auto`, default: `auto`) |
| `--summarize` | Output run metadata as JSON |
| `--profile` | Generate a performance trace |
| `--anon-profile` | Generate a profile with sensitive info stripped |
| `--framework-inference` | Enable/disable framework inference (default: `true`) |
| `--verbosity` / `-v` | Log level (`-v`=Info, `-vv`=Debug, `-vvv`=Trace) |

## Notes

- Filter syntax:
  - By package name:
    ```bash
    turbo run build --filter=ui
    turbo run build --filter=@acme/ui
    ```
  - By directory:
    ```bash
    turbo run build --filter=./apps/*
    ```
  - Git-based:
    ```bash
    turbo run build --filter=[HEAD^1]
    turbo run build --filter=[origin/main]
    ```
  - Microsyntax operators:

    | Operator | Meaning |
    |---|---|
    | `!` | Exclude |
    | `...pkg` | Include pkg's dependents (upstream) |
    | `pkg...` | Include pkg's dependencies (downstream) |
    | `^` | Exclude the target itself when used with `...` |

- Common combinations:
  ```bash
  turbo run build --affected                         # changed packages only
  turbo run build --dry=json                         # dry run
  turbo run test --continue=always                   # continue on error
  turbo run build --cache=local:r,remote:rw          # local reads only
  turbo run test --filter=...@acme/ui                # all dependents
  turbo run web#lint                                 # a specific task
  ```
