# Codex Security CLI reference

Arguments, output formats, scan artifacts, and exit codes for the `codex-security` command-line tool (`@openai/codex-security`).

## Signature / Usage

```bash
npm install @openai/codex-security
npx @openai/codex-security --help
```

## Commands

| Command | Purpose |
|---------|---------|
| `codex-security scan` | Run a Codex Security scan |
| `codex-security install-hook` | Install a Git pre-commit security scan |
| `codex-security bulk-scan` | Discover repositories and run resumable bulk scans |
| `codex-security scans` | List, inspect, match, rerun, and compare saved scans |
| `codex-security findings` | Review and update saved security findings |
| `codex-security export` | Export completed findings as CSV, JSON, or SARIF |
| `codex-security validate` | Check one or more candidate security findings |
| `codex-security patch` | Patch one or more security issues |
| `codex-security login` / `logout` | Sign in / remove stored sign-in |
| `codex-security info` | Read-only SDK and bundled-plugin metadata |
| `codex-security completions` | Generate shell completion scripts |
| `codex-security mcp` | Register the CLI as an MCP server |
| `codex-security skills` | Sync Codex Security skills to agents |

## `scan`

```text
usage: codex-security scan [-h] [--auth {auto,chatgpt,api-key}]
                           [--path PATH | --diff BASE | --working-tree]
                           [--head HEAD] [--base BASE]
                           [--knowledge-base PATH]
                           [--mode {standard,deep}] [--model MODEL]
                           [--effort {minimal,low,medium,high,xhigh}]
                           [--output-dir DIR]
                           [--archive-existing]
                           [--plugin-path PATH] [--python PATH]
                           [--codex KEY=VALUE] [--fail-on-severity LEVEL]
                           [--max-cost USD] [--dry-run] [--verbose]
                           [--json] [--format {toon,json,yaml,jsonl}]
                           [--full-output] [repository]
```

`repository` defaults to the current directory.

### Target selection

| Argument | Description |
|----------|-------------|
| `--path PATH` | Scan a path relative to the repository; repeatable |
| `--diff BASE` | Scan committed changes from `BASE` to `--head` (head defaults to `HEAD`) |
| `--head HEAD` | Head revision for `--diff` |
| `--working-tree` | Scan staged/unstaged changes against `--base` (base defaults to `HEAD`) |
| `--base BASE` | Base revision for `--working-tree` |
| `--mode {standard,deep}` | Scan mode, default `standard` |

`--path`, `--diff`, `--working-tree` are mutually exclusive. Deep mode supports repository/path targets only. Diff/working-tree require the repository argument to be the Git worktree root.

### Output and policy

| Argument | Description |
|----------|-------------|
| `--output-dir DIR` | Write artifacts to a private directory outside the Git worktree (defaults to persistent Codex Security state) |
| `--archive-existing` | Move existing results to `DIR.previous-<timestamp>-<id>`; requires `--output-dir` |
| `--fail-on-severity LEVEL` | Exit `1` on a finding at/above `critical`/`high`/`medium`/`low` |
| `--max-cost USD` | Stop when estimated model cost exceeds this USD amount (estimate, not a hard cap) |
| `--dry-run` | Check inputs without starting a scan |
| `--verbose` | Redacted lifecycle/auth/progress/cost diagnostics to stderr |
| `--json` | Print manifest/findings/coverage/paths/turn metadata as one JSON document |
| `--format {toon,json,yaml,jsonl}` | Print the complete result in the given format |
| `--full-output` | Print the complete result in the default structured format |

Default result location: `$CODEX_HOME/state/plugins/codex-security/scans/<repository>` (`CODEX_HOME` defaults to `~/.codex`); override with `CODEX_SECURITY_STATE_DIR`.

### Runtime

| Argument | Description |
|----------|-------------|
| `--auth {auto,chatgpt,api-key}` | Credential selection, default `auto` |
| `--model MODEL` | Default `gpt-5.6-sol` |
| `--effort {minimal,low,medium,high,xhigh}` | Default `xhigh` |
| `--plugin-path PATH` | Override the bundled plugin (directory or ZIP) |
| `--python PATH` | Python interpreter for the plugin runtime |
| `--codex KEY=VALUE` | Override an isolated Codex config value (TOML syntax); repeatable |

## `install-hook`

```bash
npx @openai/codex-security install-hook
npx @openai/codex-security install-hook . --fail-on-severity medium
```

Scans staged/unstaged changes before each commit; blocks high-severity findings or scan errors; respects `core.hooksPath`; doesn't replace an existing pre-commit script.

## `bulk-scan`

```text
usage: codex-security bulk-scan [input] [--output-dir DIR]
                                [--workers N] [--mode {standard,deep}]
                                [--model MODEL]
                                [--effort {minimal,low,medium,high,xhigh}]
                                [--max-attempts N] [--plugin-path PATH]
                                [--python PATH] [--codex KEY=VALUE]
```

CSV requires `id`, `repository`, `revision` columns (full commit hash); optional `scope`, `mode`. `--workers` defaults to `4`, `--mode` to `standard`, `--max-attempts` to `1`. See [Run bulk security scans](./cli-bulk-scans.md).

## `scans`

```bash
npx @openai/codex-security scans list /path/to/repository
npx @openai/codex-security scans list --scan-root /path/outside/repository/results
npx @openai/codex-security scans show SCAN_ID
npx @openai/codex-security scans rerun SCAN_ID
npx @openai/codex-security scans match PREVIOUS_SCAN_ID CURRENT_SCAN_ID
npx @openai/codex-security scans compare PREVIOUS_SCAN_ID CURRENT_SCAN_ID
npx @openai/codex-security scans match --all
```

Add `--force` to `match` to recompute an existing match. A finding is `unknown` when the later scan has incomplete coverage or doesn't cover the finding's original location.

## `findings`

```text
usage: codex-security findings false-positive OCCURRENCE_ID --reason REASON
```

```bash
npx @openai/codex-security findings false-positive FINDING_OCCURRENCE_ID \
  --reason "The framework escapes this input before it reaches the query"
```

The reason must not be empty. Saved as context for future scans; doesn't suppress a rule/path/vulnerability class.

## `export`

```text
usage: codex-security export [--export-format {csv,json,sarif}]
                             [--output FILE|-] [--source-root PATH]
                             [--python PATH] scan_dir
```

| Argument | Description |
|----------|-------------|
| `--export-format {csv,json,sarif}` | Default `sarif` |
| `--output FILE\|-` | File or stdout; defaults to a file in the current directory |
| `--source-root PATH` | SARIF only — adds source-line fingerprints |
| `--python PATH` | Python interpreter for the bundled exporter |

Defaults without `--output`: `results.sarif`, `findings.json`, `findings.csv`.

## `validate` and `patch`

```bash
npx @openai/codex-security validate findings.json "Possible SQL injection in src/query.ts:42"
npx @openai/codex-security patch findings.json "Missing authorization check in src/routes.ts:18"
npx @openai/codex-security validate "Possible SQL injection" --effort high
```

Each argument can be literal text or a file path. A scan comparison alone doesn't prove a fix worked — use `validate` to recheck.

## `login`, `logout`, `info`

```bash
npx @openai/codex-security login
npx @openai/codex-security login --device-auth
npx @openai/codex-security login status
npx @openai/codex-security logout
printenv OPENAI_API_KEY | npx @openai/codex-security login --with-api-key
printenv CODEX_ACCESS_TOKEN | npx @openai/codex-security login --with-access-token
npx @openai/codex-security info --json
```

When exposed as an MCP server, `info` is the only available command.

## Scan artifacts

```text
<scan-directory>/
├── scan-manifest.json
├── findings.json
├── coverage.json
├── report.md
├── artifacts/
└── exports/
    └── results.sarif       # when produced
```

| File | Contents |
|------|----------|
| `scan-manifest.json` | Identity, status, target, scope, producer, sealed artifact records |
| `findings.json` | Identifiers, severity, confidence, taxonomy, locations, evidence, validation, data flow, reachability, remediation |
| `coverage.json` | Reviewed surfaces, exclusions, deferred work, open questions, completeness |
| `report.md` | Readable scan report |

Coverage completeness: `complete`, `partial`, `unknown`.

## Exit codes and signals

| Exit | Condition |
|------|-----------|
| `0` | Success (scan passed policy with complete coverage, or another command succeeded) |
| `1` | A completed scan reports a finding at/above the configured severity |
| `2` | Input/runtime/export error, incomplete coverage, or bulk-scan repository errors |
| `130` | Ctrl-C interrupted a scan |
| `143` | SIGTERM terminated a scan |

Any scan with `partial`/`unknown` coverage returns `2`, even without a severity policy.

## Notes

- Requires Node.js 22+; scanning/exporting also requires Python 3.10+ (with `tomli` on 3.10)
- `codex-security scan --json` emits one JSON document; `codex exec --json` emits a JSON Lines event stream — these are different contracts
- Set `CODEX_SECURITY_LOG_LEVEL=debug` (or `LOG_LEVEL=debug` when unset) for the same diagnostics as `--verbose`

## Related

- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Run bulk security scans](./cli-bulk-scans.md)
- [Codex Security CLI FAQ](./cli-faq.md)
- [Run Codex Security in CI](./cli-ci.md)
- [Codex Security TypeScript SDK](./sdk.md)
