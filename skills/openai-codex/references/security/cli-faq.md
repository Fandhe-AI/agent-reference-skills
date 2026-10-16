# Codex Security CLI FAQ

Answers to common questions about scanning repositories and managing security findings from the terminal (earlier scan results, scan history, new vs known findings, false positives, repeat scans, fix confirmation, coverage, deep-scan time limits, cost limits). For installation and a first scan start with the CLI quickstart.

## Signature / Usage

```bash
npx @openai/codex-security scan /path/to/repository --output-dir /path/outside/repository/codex-security-results
```

This FAQ assumes a working `@openai/codex-security` CLI install and sign-in; see [Codex Security CLI quickstart](./cli-quickstart.md) for setup and the base `scan` command.

## Repository scans

- Why does a scan use an API key after sign-in: with `OPENAI_API_KEY` or `CODEX_API_KEY` set, scans without an interactive terminal and JSON/JSONL scans use the environment API key by default, even after a successful ChatGPT or access-token login; interactive text-output scans ask you to choose when both exist; dry runs don't prompt or load credentials. Select explicitly with `--auth chatgpt` or `--auth api-key`, or run `unset OPENAI_API_KEY CODEX_API_KEY` to make stored credentials the default.
- Can an interrupted bulk scan resume: yes. Run the same command with the original CSV and output directory (completed repositories are skipped); add `--max-attempts 3` to retry temporary repository or scan errors. Completed scans keep their results and aren't retried even when coverage gaps remain, and coverage gaps don't make the campaign exit `2`.

```bash
npx @openai/codex-security bulk-scan repositories.csv \
  --output-dir /path/outside/repositories/security-scans \
  --workers 4 \
  --max-attempts 3
```

## Findings and coverage

```bash
npx @openai/codex-security scans list /path/to/repository     # earlier scan results
npx @openai/codex-security scans show SCAN_ID
npx @openai/codex-security scans logs SCAN_ID                 # unredacted scan and worker events; may contain source or credentials
npx @openai/codex-security findings list /path/to/repository  # open findings across all scans
npx @openai/codex-security scans compare PREVIOUS_SCAN_ID CURRENT_SCAN_ID
npx @openai/codex-security findings false-positive FINDING_OCCURRENCE_ID \
  --reason "The framework escapes this input before it reaches the query"
npx @openai/codex-security scans rerun BASELINE_SCAN_ID
npx @openai/codex-security validate /path/to/original/findings.json \
  "Recheck the SQL injection in src/orders.ts:42 against the current code"
```

- What if the CLI can't save scan history: scan history lives in a workbench database; if the default state directory isn't writable set `export CODEX_SECURITY_STATE_DIR=/path/outside/repository/codex-security-state` (a private directory outside the repository).
- New vs known findings: `findings list` shows findings confirmed in the latest scan and earlier open findings it didn't confirm. `scans compare` matches findings by root cause, reuses saved matches, and reports new, persisting, reopened, not observed, resolved, and unknown findings; a finding not found in the code a later scan covered is not observed and counts as resolved only after being explicitly closed as already fixed; excluded paths and uncertain matches remain unknown.
- False-positive feedback: inspect the saved scan for the occurrence ID, then record the reason; future scans of the repository receive it as context but still independently check current source, controls, and reachability; a dismissal doesn't suppress a rule, path, or vulnerability class.
- Repeat scans can differ: AI-assisted scans vary even with the same configuration. Rerun the baseline (`scans rerun` keeps the original configuration and requires the same plugin version; it stops if the plugin changed), compare with `scans compare BASELINE REPEAT`, provide shared architecture and security guidance when missing context may cause variation, and directly recheck any important finding that disappears. Matching doesn't make scans deterministic.
- Confirm a fix: recheck the original finding against the changed checkout with `validate`, review evidence that the vulnerable path is closed and legitimate behavior still works, run the original reproducer or regression test when available, and note remaining uncertainty if the check can't run. A scan comparison can show how findings changed, but a missing finding alone doesn't verify a fix.
- What does incomplete coverage mean: review `coverage.json` for excluded paths, deferred surfaces, and open questions; new results don't include a coverage-completeness field; check `scan.status` in `scan-manifest.json`. Coverage gaps don't change a completed scan's exit code (exit `0` doesn't mean every file was reviewed), and a later scan can't establish that an earlier finding is gone when it doesn't cover that finding's original path.

## Automation and cost

```bash
npx @openai/codex-security scan . --mode deep --max-time-hours 1.5
npx @openai/codex-security scan . --max-cost 5
npx @openai/codex-security install-hook
npx @openai/codex-security scan . --diff origin/main --fail-on-severity high
```

- Deep-scan time limits: `--max-time-hours` defaults to `96` (any positive value up to `96`, including fractions). At the deadline unfinished workers stop, completed standard-scan results are kept and aggregated into the final report (check it for reviewed areas and deferred work); the deadline alone doesn't determine the exit code. For persistent settings or bulk campaigns set `max_time_hours` under `[deep_scan]` in the deep-scan configuration.
- Scan cost limits: `--max-cost` is an estimate, not a hard cap; in-progress requests can finish above it. If a deep scan reaches the limit after aggregating completed worker results the CLI can save a completed report with a budget warning (exit `0`, or `1` if findings meet the severity threshold); otherwise it returns `2` and preserves available output. For pull-request checks see cli-ci.md; for a check before each commit use `install-hook`.

## Notes

- AI-assisted scans can vary even with the same configuration; rerun the baseline and use `scans match` / `scans compare` to track variation.
- Another application can run scans directly via the [TypeScript SDK](./sdk.md).
- Earlier revisions of this page referenced `--knowledge-base`, `--diff`, `--fail-on-severity` as FAQ answers and said partial or unknown coverage returns exit `2`; the current FAQ covers the questions above instead (flags remain documented in cli-reference.md).

## Related

- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Codex Security CLI reference](./cli-reference.md)
- [Run bulk security scans](./cli-bulk-scans.md)
- [Run Codex Security in CI](./cli-ci.md)
