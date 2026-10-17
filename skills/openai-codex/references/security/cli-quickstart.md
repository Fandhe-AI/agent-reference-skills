# Codex Security CLI quickstart

Run a standard scan of a local repository with the standalone Codex Security CLI (`@openai/codex-security`). This quickstart ends with a saved report you can review and revisit. For scans inside a Codex conversation use the Codex Security plugin.

## Signature / Usage

Prerequisites: Node.js 22 (22.13.0 or later), 24, or 26, plus Python 3.10 or later (Python 3.10 also needs `tomli`). Scans using OpenAI inference require Codex Security access; depending on your account and repository, full-repository scans may also require Trusted Access for Cyber. The CLI runs with your operating-system permissions and doesn't pause for approval; scan processes can inherit your environment, so remove unrelated credentials first.

```bash
npx @openai/codex-security --version     # prints the installed package version
npx @openai/codex-security info --json   # bundled plugin version
npx @openai/codex-security --help
```

Sign in:

```bash
npx @openai/codex-security login
npx @openai/codex-security login --device-auth   # machine without a browser
```

Prepare and run a scan:

```bash
REPOSITORY=/path/to/repository
SCAN_DIR=/path/outside/repository/codex-security-results

# Check the target and output location (doesn't start a scan or load credentials)
npx @openai/codex-security scan "$REPOSITORY" \
  --auth chatgpt --output-dir "$SCAN_DIR" --dry-run

# Run the scan
npx @openai/codex-security scan "$REPOSITORY" \
  --auth chatgpt --output-dir "$SCAN_DIR"
```

Revisit a saved scan:

```bash
npx @openai/codex-security scans list "$REPOSITORY"
npx @openai/codex-security scans show SCAN_ID
```

## Options / Props

| Name | Description |
|------|-------------|
| `--auth chatgpt` | Select ChatGPT sign-in even when your environment also contains an API key. For API keys and other providers see "Select scan authentication" in cli-reference.md; for Amazon Bedrock use AWS credentials and model access instead of a ChatGPT sign-in or OpenAI API key. |
| `--output-dir <dir>` | Results location; choose a private directory outside the repository's Git worktree. If omitted, the CLI uses its persistent state directory. |
| `--dry-run` | Confirms local inputs only; doesn't start a scan, load credentials, or check the plugin's Python interpreter. |
| `--headless` | Use progress lines even in an interactive terminal. |
| `--json` | Machine-readable stdout. |

## Notes

- Results can include source excerpts and vulnerability details. An interactive terminal shows a live dashboard (non-interactive terminals show progress lines); the dashboard and saved logs can contain source code or credentials, so review them before sharing. When the scan finishes, stderr includes the report path, finding count, and elapsed time (e.g. `REPORT`, `FINDINGS 2 (2 confirmed this scan; 0 previously found; 1 high, 1 medium)`, `ELAPSED`, `RESULTS`).
- By default, finding severity doesn't cause a scan to fail; to make findings fail a CI check set a severity policy (see cli-ci.md).
- Review the results: open `report.md`, confirm the target and revision, then read the coverage before individual findings. Check `scan.status` in `scan-manifest.json` for completion and `coverage.json` for reviewed surfaces, excluded paths, deferred work, and open questions. A completed scan exits `0` unless findings meet a configured severity threshold (`1`); coverage gaps don't change the exit code, so exit `0` doesn't mean every file was reviewed; input, execution, result-integrity, or required-output failures return `2`. For each finding check the affected code, attacker prerequisites, validation evidence, and remaining uncertainty (a source-based finding doesn't necessarily include a successful runtime reproduction). Keep the scan directory together (`scan-manifest.json`, `findings.json`, `coverage.json`, the report, and supporting artifacts).
- After a complete interactive scan with findings, the CLI also offers a finding browser; for saved findings use the validate and patch commands in cli-reference.md.
- Choose the next scan: select paths or a diff, configure deep scans, add security context, change the model or reasoning effort, set an estimated cost limit, bulk scans (cli-bulk-scans.md), and CI (cli-ci.md); all flags are in cli-reference.md. For authentication problems, repeat-scan differences, or false-positive feedback see cli-faq.md. Package changes are listed in the CLI and SDK releases on GitHub.
- Earlier revisions of this page also documented `--base`, `--diff`, `--working-tree`, `--path`, `--mode`, `--effort`, `--model`, `--fail-on-severity`, `--knowledge-base`, and `CODEX_SECURITY_STATE_DIR`; the current quickstart doesn't cover them (see cli-reference.md).

## Related

- [Codex Security CLI reference](./cli-reference.md)
- [Run bulk security scans](./cli-bulk-scans.md)
- [Run Codex Security in CI](./cli-ci.md)
- [Codex Security CLI FAQ](./cli-faq.md)
- [Codex Security TypeScript SDK](./sdk.md)
