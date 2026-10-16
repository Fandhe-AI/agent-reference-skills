# CLI Arguments

Source: https://knip.dev/reference/cli

## General

| Flag | Description |
|------|-------------|
| `--help` / `-h` | Prints a summary of this page |
| `--version` / `-V` | Print the version number |
| `--no-progress` / `-n` | Don't show dynamic progress updates (automatically disabled in CI environments) |
| `--config [file]` / `-c` | Use an alternative path for the configuration file |
| `--use-tsconfig-files` | Per workspace, take project files from `tsconfig.json` (`files` + `include`, minus `exclude`, `node_modules` and `outDir`) and from its `references` instead of the `project` patterns |
| `--tsConfig [file]` / `-t` | Use an alternative path for the TypeScript configuration file (default: `tsconfig.json`) |
| `knip-bun` | Run Knip using the Bun runtime (instead of Node.js + jiti); equal to `bunx --bun knip` |
| `NO_COLOR` | Built-in reporters respect NO_COLOR (environment variable) |
| `KNIP_DISABLE_RAW_TRANSFER` | Set `=1` to disable oxc-parser raw transfer and use the normal parser path (environment variable) |

## Mode

| Flag | Description |
|------|-------------|
| `--cache` | Enable caching; consecutive runs are 10-40% faster |
| `--cache-location` | Provide alternative cache location (default: `./node_modules/.cache/knip`) |
| `--include-entry-exports` | Include entry files when reporting unused exports |
| `--no-gitignore` | Ignore `.gitignore` files |
| `--production` / `-p` | Lint only production source files |
| `--strict` / `-s` | Isolate workspaces and consider only direct dependencies; implies production mode |
| `--watch` / `-w` | Watch current directory, and update reported issues when a file is modified, added or deleted |

## Scope

| Flag | Description |
|------|-------------|
| `--workspace [filter]` / `-W` | Select one or multiple workspaces (including ancestor, dependency and dependent workspaces) |
| `--directory [dir]` / `-D` | Run the process from a different directory (default: `cwd`) |
| `--exclude` | Exclude provided issue types from report (comma-separated or repeated) |
| `--include` | Report only provided issue types (comma-separated or repeated) |
| `--dependencies` | Shortcut for `--include dependencies,unlisted,binaries,unresolved,catalog,catalogReferences` |
| `--exports` | Shortcut for `--include exports,nsExports,types,nsTypes,enumMembers,namespaceMembers,duplicates` |
| `--files` | Shortcut for `--include files` |
| `--cycles` | Shortcut for `--include cycles` (report only circular dependencies); see the cycles reporter |
| `--tags` | Include (`+`) or exclude (`-`) exports tagged with JSDoc/TSDoc tags |

Issue types (`--include` / `--exclude`): `files`, `dependencies`, `unlisted`, `binaries`, `unresolved`, `exports`, `nsExports`, `types`, `nsTypes`, `enumMembers`, `namespaceMembers`, `duplicates`, `catalog`, `catalogReferences`

`nsExports` and `nsTypes` are off by default; including only those adds them to the default report instead of narrowing it.

## Fix

| Flag | Description |
|------|-------------|
| `--fix` / `-f` | Auto-fix issues |
| `--fix-type` | Fix only issues of type (comma-separated or repeated) |
| `--allow-remove-files` | Allow Knip to remove files (with `--fix`) |
| `--format` / `-F` | Format modified files after `--fix` using the local formatter |

## Output

| Flag | Description |
|------|-------------|
| `--preprocessor [file]` | Preprocess the results before providing them to the reporter(s) (can be repeated) |
| `--preprocessor-options [json]` | Pass extra options to the preprocessor as JSON string |
| `--reporter [reporter]` | Select reporter (can be repeated) |
| `--reporter-options [json]` | Pass extra options to the reporter as JSON string |
| `--no-config-hints` | Suppress configuration hints |
| `--no-tag-hints` | Suppress tag hints |
| `--treat-config-hints-as-errors` | Exit with code `1` if there are any configuration hints |
| `--max-issues` | Maximum number of issues before non-zero exit code (default: `0`) |
| `--max-show-issues` | Maximum number of issues per type to display (does not affect exit code) |
| `--treat-tag-hints-as-errors` | Exit with code `1` if there are any tag hints |
| `--no-exit-code` | Exit with code `0` even when there are lint issues (config load failures and internal errors still exit with `2`) |

Exit codes: `0` (no issues), `1` (at least one lint issue), `2` (bad input, plugin config load error or internal error)

## Troubleshooting

| Flag | Description |
|------|-------------|
| `--debug` / `-d` | Show debug output |
| `--memory` | Show memory usage |
| `--memory-realtime` | Log memory usage over time (useful if Knip crashes) |
| `--performance` | Show count and execution time of potentially expensive functions |
| `--duration` / `-u` | Print total running time (no `timerify` instrumentation, unlike `--performance`) |
| `--performance-fn` | Limit `--performance` output to a single function |
| `--trace` | Trace exports to see where they are imported |
| `--trace-dependency [name]` | Trace package or binary name to see where it's referenced (implies `--trace`) |
| `--trace-export [name]` | Trace export name to see where it's imported (implies `--trace`) |
| `--trace-file [path]` | Trace file to see where its exports are imported (implies `--trace`) |
