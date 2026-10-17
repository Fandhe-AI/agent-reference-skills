# Codex Security CLI reference

Supported `codex-security` commands, flags, output formats, and exit behavior for the `@openai/codex-security` package. The package is public; scans using OpenAI inference require Codex Security access. Scans use your local permissions and don't pause for approval (see "Local scan permissions" below). Run the CLI with `npx @openai/codex-security`.

## Signature / Usage

```bash
npx @openai/codex-security --help
npx @openai/codex-security scan --help
npx @openai/codex-security --version
npx @openai/codex-security info --json
npx @openai/codex-security --llms                         # agent-readable command manifest
npx @openai/codex-security scan --schema --format json    # scan argument schema as JSON
npx @openai/codex-security completions bash               # or zsh, fish
npx @openai/codex-security mcp add                        # register as an MCP server (read-only `info` only)
npx @openai/codex-security skills add                     # sync Codex Security skills to agents
```

`--version` and `info --json` don't require Python. Scan results support `--format toon|json|yaml|jsonl` and `--full-output` (framework-level `--format` is separate from `--export-format`; global help also lists `md`, but scan results don't support Markdown output). MCP exposes only the read-only `info` command; scans, exports, authentication, validation, patching, and publication remain CLI-only.

## Commands

| Command | Purpose |
|---------|---------|
| `codex-security scan` | Run a Codex Security scan |
| `codex-security install-hook` | Install a Git pre-commit security scan |
| `codex-security bulk-scan` | Discover repositories and run resumable bulk scans |
| `codex-security scans` | List, inspect, compare, and retrieve saved scan logs |
| `codex-security findings` | Review and update saved security findings |
| `codex-security export` | Export completed findings as CSV, JSON, or SARIF |
| `codex-security publish` | Publish completed scan findings to Linear |
| `codex-security validate` | Check one or more candidate security findings |
| `codex-security patch` | Patch one or more security issues |
| `codex-security login` / `logout` | Sign in, store credentials, or check status / remove the stored sign-in |
| `codex-security info` | Read-only SDK and bundled-plugin metadata |
| `codex-security completions` / `mcp` / `skills` | Integration commands |

## `scan`

```text
usage: codex-security scan [-h] [--auth {auto,chatgpt,api-key}]
                           [--provider {openai,openrouter,fireworks,amazon-bedrock}]
                           [--path PATH | --diff BASE | --working-tree]
                           [--head HEAD] [--base BASE]
                           [--knowledge-base PATH] [--scan-prompt-file FILE]
                           [--post-scan-prompt-file FILE]
                           [--mode {standard,deep}] [--workers N]
                           [--subagents N] [--stop-after-no-new N]
                           [--max-discovery-runs N] [--max-time-hours HOURS]
                           [--model MODEL]
                           [--effort {minimal,low,medium,high,xhigh,max}]
                           [--output-dir DIR] [--archive-existing]
                           [--plugin-path PATH] [--python PATH]
                           [--codex KEY=VALUE] [--fail-on-severity LEVEL]
                           [--patch] [--patch-severity {critical,high,medium,low}]
                           [--create-pr]
                           [--max-cost USD] [--dry-run] [--headless] [--verbose]
                           [--json] [--format {toon,json,yaml,jsonl}]
                           [--full-output] [repository]
```

`repository` defaults to the current directory.

Target selection (choose one target type per scan):

| Argument | Description |
|----------|-------------|
| `--path PATH` | Scan a path relative to the repository; repeatable |
| `--diff BASE` | Scan committed changes from `BASE` to `--head` (head defaults to `HEAD`) |
| `--head HEAD` | Head revision for `--diff` (requires `--diff`) |
| `--working-tree` | Scan staged and unstaged changes against `--base` (base defaults to `HEAD`) |
| `--base BASE` | Base revision for `--working-tree` (requires `--working-tree`) |
| `--mode {standard,deep}` | Scan mode, default `standard` |

`--path`, `--diff`, and `--working-tree` are mutually exclusive. Deep mode supports repository and path targets. Diff and working-tree scans require the repository argument to be the Git worktree root and the refs to exist in that checkout.

Deep scan options (with `--mode deep`; not available for standard scans):

| Argument | Description |
|----------|-------------|
| `--workers N` | Concurrent independent standard-scan workers (default `4`) |
| `--subagents N` | Subagents available to each worker (default `3`; accepts zero) |
| `--stop-after-no-new N` | Stop after `N` consecutive completed worker scans find no new issues (default `4`) |
| `--max-discovery-runs N` | Limit on total independent standard-scan runs (default `40`) |
| `--max-time-hours HOURS` | Worker execution time limit (default `96`; positive, at most `96`; accepts fractions) |

Persistent defaults go in `~/.codex/codex-security/config.toml` (or `$CODEX_HOME/codex-security/config.toml`); command-line options override them. `stop_after_consecutive_errors` (default `3`) can only be set in the TOML file:

```toml
[deep_scan]
workers = 2
subagents = 0
stop_after_no_new = 3
max_discovery_runs = 10
max_time_hours = 1.5
```

Security context and instructions: `--knowledge-base PATH` (repeatable; `.md`, `.markdown`, `.txt`, `.pdf`, `.docx`; directories searched recursively; linked inputs rejected; extracted content kept outside saved results), `--scan-prompt-file FILE`, and `--post-scan-prompt-file FILE` (follow-up in the same authenticated session after successful scans and scan errors; a failing follow-up only warns; doesn't run after cancellation or at the cost limit).

Output and policy:

| Argument | Description |
|----------|-------------|
| `--output-dir DIR` | Write artifacts to a private directory outside the enclosing Git worktree (defaults to persistent Codex Security state) |
| `--archive-existing` | Move existing results to `DIR.previous-<timestamp>-<id>`; requires `--output-dir` |
| `--fail-on-severity LEVEL` | Exit `1` when a completed scan reports a finding at or above `critical` / `high` / `medium` / `low` |
| `--patch` | Fix and verify selected findings after a complete scan (CLI 0.1.15+) |
| `--patch-severity LEVEL` | Patch findings at or above this severity (default `low`) |
| `--create-pr` | Commit verified patch files and open a GitHub pull request; requires `--patch` |
| `--max-cost USD` | Stop when estimated model cost exceeds this amount (an estimate, not a hard cap) |
| `--dry-run` | Check repository, target, knowledge base, output directory, and Codex configuration without starting a scan |
| `--headless` | Plain-text progress instead of the interactive dashboard |
| `--verbose` | Redacted lifecycle, authentication, progress, and cost diagnostics to stderr |
| `--json` / `--format FORMAT` / `--full-output` | Structured results on stdout |

Runtime:

| Argument | Description |
|----------|-------------|
| `--auth {auto,chatgpt,api-key}` | Credential selection, default `auto` |
| `--provider {openai,openrouter,fireworks,amazon-bedrock}` | Inference provider, default `openai` |
| `--model MODEL` | Default `gpt-5.6-sol`; required for OpenRouter, Fireworks, and Amazon Bedrock |
| `--effort {minimal,low,medium,high,xhigh,max}` | Default `xhigh` |
| `--plugin-path PATH` | Override the bundled plugin (directory or ZIP) |
| `--python PATH` | Python interpreter for the plugin runtime |
| `--codex KEY=VALUE` | Override an isolated Codex config value (TOML syntax; quote strings, e.g. `--codex 'model="gpt-6.1-sol"'`); repeatable |

Examples:

```bash
npx @openai/codex-security scan . --model gpt-6.1-sol --effort medium
npx @openai/codex-security scan . --diff origin/main --output-dir /path/outside/repository/results --json --fail-on-severity high
npx @openai/codex-security scan . --patch --patch-severity high --json
npx @openai/codex-security scan . --mode deep --workers 2 --subagents 0 --stop-after-no-new 3 --max-discovery-runs 10 --max-time-hours 1.5
```

## `install-hook`, `bulk-scan`

```bash
npx @openai/codex-security install-hook
npx @openai/codex-security install-hook . --fail-on-severity medium
npx @openai/codex-security bulk-scan repositories.csv --output-dir /path/outside/repositories/security-scans --workers 4
```

`install-hook` scans staged and unstaged changes before each commit, blocks high-severity findings or scan errors, respects `core.hooksPath`, and doesn't replace an existing pre-commit script. `bulk-scan [input]` accepts `--output-dir`, `--workers` (default `4`, concurrent repository scans), `--mode`, `--provider`, `--model`, `--effort`, `--knowledge-base`, `--scan-prompt-file`, `--post-scan-prompt-file`, `--max-attempts` (default `1`), `--plugin-path`, `--python`, `--codex`; with no arguments it selects repositories interactively (requires a GitHub CLI sign-in). The CSV requires `id`, `repository`, `revision` (full commit hash) with optional `scope`, `mode`, `prompt` (appended after the shared scan prompt). Re-running resumes from an existing output directory and skips completed scans; completed scans aren't retried for coverage gaps or severity violations. See [Run bulk security scans](./cli-bulk-scans.md).

## `scans`, `findings`, `export`

```bash
npx @openai/codex-security scans                                  # list for the current directory
npx @openai/codex-security scans list /path/to/repository
npx @openai/codex-security scans list --scan-root /path/outside/repository/results
npx @openai/codex-security scans show SCAN_ID                     # --show-linked-findings adds links from earlier scans
npx @openai/codex-security scans rerun SCAN_ID                    # stops if the plugin version differs from the original
npx @openai/codex-security scans logs SCAN_ID                     # unredacted session events; --json for structured output
npx @openai/codex-security scans compare PREVIOUS_SCAN_ID CURRENT_SCAN_ID
npx @openai/codex-security scans match PREVIOUS_SCAN_ID CURRENT_SCAN_ID   # --force recomputes; `match --all` for all completed scans
npx @openai/codex-security findings list [/path/to/repository]    # --json
npx @openai/codex-security findings false-positive OCCURRENCE_ID --reason "The framework escapes this input before it reaches the query"
npx @openai/codex-security export /path/to/scan --export-format sarif --source-root /path/to/repository --output /path/outside/repository/exports/results.sarif
```

Comparison classes: new, persisting, reopened, not observed, resolved, unknown (unknown when a path is excluded or the match is uncertain; not observed when the later scan doesn't find it in scanned code; resolved only when explicitly closed as already fixed). `findings list` shows findings seen in the latest scan and earlier findings not confirmed there (they remain open until resolved or dismissed). A false-positive reason must not be empty; it is saved as repository context for future scans and doesn't suppress a rule, path, or vulnerability class. `export`: `--export-format {csv,json,sarif}` (default `sarif`), `--output FILE|-`, `--source-root PATH` (SARIF only; adds source-line fingerprints), `--python PATH`; default files `results.sarif`, `findings.json`, `findings.csv` in the current directory; JSON preserves the sealed findings document, CSV has portable columns without local workbench triage state. Exports can contain source excerpts, so write outside the repository.

## `publish scan`

```text
usage: codex-security publish scan [SCAN_DIR] --to linear
                                   [--linear-team TEAM_ID] [--project PROJECT_ID]
                                   [--linear-api-key KEY]
                                   [--linear-assignee EMAIL_OR_USER_ID]
                                   [--dry-run] [--json]
```

Publishes every finding from a completed, sealed scan to Linear (`CODEX_SECURITY_LINEAR_TEAM`, `CODEX_SECURITY_LINEAR_PROJECT`, `CODEX_SECURITY_LINEAR_API_KEY` env fallbacks; `--linear-assignee` requires an API key; issues stay unassigned when omitted). Without an API key the command starts Codex with your connected Linear app (run `login` first); with `--linear-api-key` / `CODEX_SECURITY_LINEAR_API_KEY` it publishes directly via the Linear API (prefer the env var over the flag). `--dry-run` prepares payloads without contacting Linear. Each non-dry-run invocation creates a new issue per finding (re-publishing doesn't reuse issues); if some findings fail it preserves created issues and exits `2` (review `created` / `failed` with `--json` before retrying). Issue descriptions can include source snippets and vulnerability details; check who can view the destination.

## `validate` and `patch`

```bash
npx @openai/codex-security validate findings.json "Possible SQL injection in src/query.ts:42"
npx @openai/codex-security patch findings.json "Missing authorization check in src/routes.ts:18"
npx @openai/codex-security validate "Possible SQL injection" --effort high
npx @openai/codex-security patch OCCURRENCE_ID
npx @openai/codex-security patch --scan SCAN_ID --severity high --json     # --scan latest = latest completed scan
npx @openai/codex-security patch --scan SCAN_ID --severity high --create-pr
npx @openai/codex-security patch --linear-issue SEC-123 --linear-issue SEC-124
npx @openai/codex-security patch --linear-project "Security backlog" --linear-filter '{"labels":{"name":{"eq":"security"}}}'
```

Each positional argument accepts literal text or a file path (current directory); `--effort` selects reasoning effort. Comparing scans alone doesn't prove a fix worked; use `validate` to recheck. Saved-finding commands support `--json` (literal-text and file inputs don't). `--create-pr` commits only verified patch files and opens a PR with the GitHub CLI; if push or PR creation fails, run the printed `patch --resume-pr BRANCH` from the same repository. Linear: set `CODEX_SECURITY_LINEAR_API_KEY` or `LINEAR_API_KEY` (personal key) or `LINEAR_ACCESS_TOKEN` (OAuth); the CLI excludes completed and canceled issues unless the filter sets `state` and doesn't change the Linear issues. Verified and already-fixed findings don't trigger `--fail-on-severity`.

## `login`, `logout`, `info`

```bash
npx @openai/codex-security login
npx @openai/codex-security login --device-auth
npx @openai/codex-security login status
npx @openai/codex-security logout
printenv OPENAI_API_KEY | npx @openai/codex-security login --with-api-key
printenv CODEX_ACCESS_TOKEN | npx @openai/codex-security login --with-access-token
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--auth` | `auto` / `chatgpt` / `api-key` | `auto` | `chatgpt` uses stored credentials; `api-key` uses the environment `OPENAI_API_KEY` / `CODEX_API_KEY` |
| `--provider openrouter` | string | — | Requires `OPENROUTER_API_KEY`; example model `anthropic/claude-sonnet-4.5` |
| `--provider fireworks` | string | — | Requires `FIREWORKS_API_KEY`; example model `accounts/fireworks/models/qwen3-235b-a22b` |
| `--provider amazon-bedrock` | string | — | Uses AWS credentials (`AWS_PROFILE` + `AWS_REGION`, `AWS_BEARER_TOKEN_BEDROCK`, or the standard AWS credential chain; temporary access keys need `AWS_SESSION_TOKEN`); no `--auth`, OpenAI login, or OpenAI API key needed |
| `--model` | string | — | Model ID for the selected provider (Bedrock model ID for `amazon-bedrock`) |

| Bedrock access | Model ID | Region |
|----------------|----------|--------|
| Daybreak Blue | `openai.gpt-daybreak-blue-5.6-sol` | `us-east-2` |
| Daybreak Red | `openai.gpt-5.6-cyber` | `us-east-2` |

## Notes

- Authentication selection (`--auth auto`): when both a ChatGPT sign-in and `OPENAI_API_KEY` / `CODEX_API_KEY` exist, interactive text-output scans ask which to use; CI, JSON and JSONL scans, and other non-interactive scans use the environment API key; dry runs don't prompt or load credentials. `unset OPENAI_API_KEY CODEX_API_KEY` makes stored credentials the automatic default.
- `openrouter` and `fireworks` providers also support `bulk-scan`.
- Daybreak Blue and Daybreak Red require Trusted Access for Cyber approval (enterprise access application or your OpenAI account team), then AWS provisioning on Bedrock; Daybreak Red approval doesn't include GPT-5.6-Cyber, which requires separate U.S. government approval. Saved local reports, `scans show`, and `export` work without cloud credentials; uploading to Codex Security Cloud needs a separate ChatGPT sign-in. `info` and `scan --dry-run` don't test AWS credentials or model access; run a scan to check. `@openai/codex-security@0.1.31` supports Amazon Bedrock scans but doesn't provide cost estimates or support `--max-cost` for the Daybreak model IDs.
- Time limit: when `--max-time-hours` expires the scan stops unfinished workers, keeps completed results, and aggregates them into the final report (the deadline alone doesn't determine the exit code). The cost limit is an estimate: in-progress requests can finish slightly above it; if a deep scan reaches the limit after aggregation it can seal a completed result with a budget warning (exit `0`, or `1` if findings meet the threshold), otherwise it returns `2`.
- Result locations: without `--output-dir`, results persist under `$CODEX_HOME/state/plugins/codex-security/scans/<repository>` (`CODEX_HOME` defaults to `~/.codex`); `CODEX_SECURITY_STATE_DIR` moves them to `$CODEX_SECURITY_STATE_DIR/scans/<repository>` and also moves the workbench database (`workbench.sqlite3`). The output directory must be outside the scanned directory and enclosing Git worktree; results can contain source excerpts and vulnerability details.
- Scan output: by default progress, completion summaries, and errors go to stderr; interactive terminals show a live dashboard (phase, reviewed files, activity, token usage, estimated cost) whose session details aren't redacted. The completion summary shows open repository finding count, severity breakdown, elapsed time, report path, result directory, and token usage and estimated cost when available; informational findings count toward the total, but severity policies evaluate only `critical`, `high`, `medium`, `low` findings from the current scan. `CODEX_SECURITY_LOG_LEVEL=debug` (or `LOG_LEVEL=debug` when unset) enables the `--verbose` diagnostics.
- `scan --json` top-level shape: `manifest`, `repositoryFindings`, `findings`, `coverage`, `scanDir`, `threadId`, `reportPath`, `artifactsDir`, `sarifPath`, `cost`, `turn` (`id`, `status`, `durationMs`, `finalResponse`, `usage`); patching adds patch results and any created PR. A completed scan still prints the full JSON when a severity policy returns exit `1`. `codex-security scan --json` emits one JSON document, while `codex exec --json` emits a JSON Lines event stream.
- Scan artifacts: `scan-manifest.json` (identity, status, target, scope, producer, sealed artifact records with hashes), `findings.json`, `coverage.json` (reviewed surfaces, exclusions, deferred work, open questions), `report.md`, `artifacts/`, `exports/results.sarif` (when produced). `scan.status` in the manifest is `completed`, `failed`, `canceled`, or `interrupted`. New results don't include `coverage.completeness`; review `coverage.json` for what the scan reviewed.
- Exit codes: `0` scan or bulk campaign completed and passed its severity policy, publication completed without failures, or another command succeeded; `1` a completed scan or bulk campaign reports a finding at or above the configured severity; `2` input, execution, result-integrity, required-output, or export failure, or a publication has failed findings; `130` Ctrl-C; `143` SIGTERM. Coverage gaps don't change a completed scan's exit code or bypass its severity policy; exit `0` doesn't mean every file was reviewed. With structured output, completed scans and partial publications still write available results to stdout.
- Local scan permissions: CLI and SDK scans use the `codex_security_scan` filesystem profile with `approvalPolicy = "never"`: reading the local filesystem and writing to workspace roots and the selected scan state directory, with no interactive approval. `--codex` / SDK `codexOverrides` (including `approval_policy`, `sandbox_mode`, filesystem permissions) can't replace or restrict these controls; host and network restrictions still apply. Scan and workbench processes can inherit your environment (unrelated API tokens, cloud credentials), so remove them first.
- Prerequisites: Node.js 22 (22.13.0 or later), 24, or 26; scans, bulk scans, exports, scan history, and saved findings also need Python 3.10+ (3.10 needs `tomli`); use `--python` with `scan`, `bulk-scan`, or `export`, or set `PYTHON`. For CI keep the API key scoped to the scan step in a trusted workflow. Set `OPENAI_API_KEY` or `CODEX_API_KEY`, sign in with `login`, or use an existing file-backed Codex sign-in.
- Earlier revisions of this page said incomplete coverage returns exit `2` and listed `coverage.completeness` values (`complete` / `partial` / `unknown`); the current official page says coverage gaps don't change the exit code and new results don't include `coverage.completeness`.

## Related

- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Run bulk security scans](./cli-bulk-scans.md)
- [Codex Security CLI FAQ](./cli-faq.md)
- [Run Codex Security in CI](./cli-ci.md)
- [Codex Security TypeScript SDK](./sdk.md)
