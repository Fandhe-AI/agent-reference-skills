# CLI

Targets Biome 2.5.15. Commands: `version` / `upgrade` / `rage` / `start` / `stop` / `check` / `lint` / `format` / `ci` / `init` / `lsp-proxy` / `migrate` (`prettier` / `eslint`) / `search` / `explain` / `clean`. Run `biome --help` or `biome <command> --help` for usage.

## Main commands

### biome version
Prints the Biome CLI version and, if connected, information about the daemon server, then exits.

### biome upgrade
Updates Biome to the latest stable release. Behavior depends on how Biome was installed:
- **Standalone**: updates the binary in place
- **Homebrew**: runs `brew upgrade biome`
- `BIOME_DISTRIBUTION` (`npm` / `homebrew` / `standalone`) overrides auto-detection
- Biome installed via npm cannot be upgraded this way (update `@biomejs/biome` with your package manager)

### biome check - unified check
Runs the formatter, linter, and assist actions.

```bash
biome check --write         # apply safe fixes
biome check --write --unsafe  # also apply unsafe fixes
```

Options:
- `--write`, `--fix` / `--unsafe`
- `--formatter-enabled=<true|false>` / `--linter-enabled=<true|false>` / `--assist-enabled=<true|false>`
- `--enforce-assist=<true|false>`: fail when assist actions are unapplied (default `true`)
- `--format-with-errors=<true|false>`
- `--stdin-file-path=<PATH>`: path used for stdin input (the extension determines the input type)
- `--staged`: only staged files (for local use)
- `--changed`: only files changed in commits (relative to `vcs.defaultBranch` or `--since`; for CI)
- `--since=REF`: base ref for `--changed` (requires `--changed`)
- `--profile-rules`: reports per-rule execution time (excludes setup time such as semantic model construction)
- `--only=<GROUP|RULE|DOMAIN|ACTION|PLUGIN>` / `--skip=<GROUP|RULE|DOMAIN|ACTION|PLUGIN>`
- `--watch`: after the first run, watches the given paths and reprocesses changed files (2.5.0)

### biome lint - linter
```bash
biome lint --write          # safe fixes
biome lint --write --unsafe  # also unsafe fixes
```

Options:
- `--suppress`: writes suppression comments instead of fixing rules
- `--reason=<STRING>`: suppression reason (requires `--suppress`)
- `--only=<GROUP|RULE|DOMAIN|PLUGIN>` / `--skip=<GROUP|RULE|DOMAIN|PLUGIN>`
- `--stdin-file-path`, `--staged`, `--changed`, `--since=REF`, `--profile-rules`, `--watch`

Example of `--only` / `--skip` (the `plugin` group targets analyzer plugins only):

```bash
biome lint --only=correctness/noUnusedVariables --only=suspicious --only=test --only=plugin
biome lint --skip=correctness/noUnusedVariables --skip=suspicious --skip=project --skip=plugin
```

If a rule selected with `--only` has severity `off`, recommended rules become `error` and others become `warn`. `--skip` takes precedence over `--only` and turns the targeted rules `off`.

### biome format - formatter
```bash
biome format --write
```

Options:
- `--write`, `--fix`
- `--stdin-file-path=<PATH>`: path for stdin input (a virtual path bypasses `files.includes` and VCS ignore)
- `--staged`, `--changed`, `--since=REF`, `--watch`

### biome ci - for CI environments
Checks formatting, lint, and assist without modifying files. No `--write` / `--fix`.

```bash
biome ci .
```

Options: `--formatter-enabled` / `--linter-enabled` / `--assist-enabled` / `--enforce-assist` / `--changed` / `--since=REF` / `--only` / `--skip` / `--threads=<NUMBER>` (env `BIOME_THREADS`)

### biome init - initialize
```bash
biome init
biome init --jsonc   # creates biome.jsonc
```

### biome lsp-proxy - editor integration
Ensures the daemon server is running and relays LSP messages between the daemon and stdin/stdout.

### biome migrate - configuration migration
By default only suggests changes. Use `--write` to apply.

```bash
biome migrate --write           # migrate to v2 configuration
biome migrate eslint --write    # migrate from ESLint (--include-inspired / --include-nursery)
biome migrate prettier --write  # migrate from Prettier
```

### biome search - pattern search (experimental)
Searches code with GritQL patterns (read-only; rewrite queries are not supported). `-l`, `--language=<css|javascript|json>` (default `javascript`).

```bash
biome search '`console.log($message)`' ./src
```

### biome explain - show documentation
Shows documentation for a lint rule name or for `daemon-logs`.

### biome clean - clear logs
Deletes daemon logs.

### biome rage - debug information
Prints a troubleshooting report covering the CLI, platform, environment, configuration, workspace, and daemon. Extra flags:
- `--daemon-logs`: includes the latest daemon logs (looks for a running daemon if not connected)
- `--formatter`: includes the formatter configuration
- `--linter`: includes the linter configuration and enabled rules

### biome start / stop - daemon control
Starts / stops the daemon server.

## Global flags

| Flag | Description |
|-----------|------|
| `-h`, `--help` / `-V`, `--version` | Help / version |
| `--colors=<off\|force>` | Controls ANSI styling |
| `--use-server` | Connects to a running daemon server |
| `--verbose` | Verbose output (lists processed and changed files) |
| `--config-path=<PATH>` | Configuration file or lookup directory (env `BIOME_CONFIG_PATH`) |
| `--max-diagnostics=<none\|NUMBER>` | Maximum diagnostics shown (`none` is unlimited, default 20) |
| `--skip-parse-errors` | Skips files with syntax errors |
| `--no-errors-on-unmatched` | Does not fail when no files are processed |
| `--error-on-warnings` | Exits non-zero on warnings as well |
| `--diagnostic-level=<info\|warn\|error>` | Minimum severity shown (default info) |
| `--reporter=<FORMAT>` | Output format (see table below; default `default`) |
| `--reporter-file=<PATH>` | Report output file (repeat `--reporter` for multiple outputs) |

### reporter

| Value | Output |
|----|------|
| `default` | Full diagnostics and summary (for terminals) |
| `concise` | One line per diagnostic; formatter diagnostics are grouped (2.5.0) |
| `summary` | By category and rule; formatter diagnostics by file |
| `json` / `json-pretty` | JSON (experimental; may change in patch releases) |
| `github` | GitHub workflow commands (annotations) |
| `gitlab` | GitLab Code Quality report |
| `junit` | JUnit XML |
| `checkstyle` | Checkstyle XML |
| `rdjson` | Reviewdog diagnostic JSON |
| `sarif` | SARIF |

```bash
biome ci --reporter=default --reporter=rdjson --reporter-file=report.json
```

## Shared flags

Accepted by multiple commands. Configuration flags override the equivalent `biome.json` settings.

- **Daemon watcher**: `--watcher-kind=<polling|recommended|none>` (`BIOME_WATCHER_KIND`, default `recommended`), `--watcher-polling-interval=<NUMBER>` (ms, `BIOME_WATCHER_POLLING_INTERVAL`, default 2000)
- **JSON parser**: `--json-parse-allow-comments` / `--json-parse-allow-trailing-commas`
- **Configuration**: `--vcs-enabled` / `--vcs-client-kind=<git>` / `--vcs-use-ignore-file` / `--vcs-root` / `--vcs-default-branch` / `--files-max-size` (default 1 MiB) / `--files-ignore-unknown` / `--format-with-errors`
- **Formatter configuration**: `--indent-style` / `--indent-width` / `--line-ending` / `--line-width` / `--attribute-position` / `--bracket-same-line` / `--bracket-spacing` / `--delimiter-spacing` (default false) / `--expand=<auto|always|never>` / `--trailing-newline` / `--use-editorconfig`
- **Per language**: `--javascript-formatter-*` / `--javascript-linter-enabled` / `--javascript-assist-enabled`, and the same families as `--json-*` / `--css-*` / `--graphql-*` / `--grit-*` / `--html-*` (e.g. `--html-formatter-whitespace-sensitivity=<css|strict|ignore>`, `--css-parse-tailwind-directives`)
- **Logging**: `--log-file` (`BIOME_LOG_FILE`), `--log-prefix-name` (`BIOME_LOG_PREFIX_NAME`, default `server.log`), `--log-path` (`BIOME_LOG_PATH`), `--log-level=<none|tracing|debug|info|warn|error>` (`BIOME_LOG_LEVEL`, default none), `--log-kind=<pretty|compact|json>` (`BIOME_LOG_KIND`, default pretty)
