# Codex Security CLI FAQ

Answers about Codex Security scans, findings, false positives, coverage, cost, and CI.

## Signature / Usage

```bash
npx @openai/codex-security scan /path/to/repository --output-dir /path/outside/repository/codex-security-results
```

This FAQ assumes a working `@openai/codex-security` CLI install and sign-in; see [Codex Security CLI quickstart](./cli-quickstart.md) for setup and the base `scan` command.

## Repository scans

- The `@openai/codex-security` package is public; running scans requires Codex Security access
- When `OPENAI_API_KEY`/`CODEX_API_KEY` is set, scans without an interactive terminal (and JSON/JSONL scans) use the environment API key by default, even after a ChatGPT sign-in. Select explicitly with `--auth chatgpt` / `--auth api-key`. Dry runs don't prompt or load credentials
- Bulk scanning: `gh auth login` then `npx @openai/codex-security bulk-scan` (or with a CSV + `--output-dir` + `--workers`). Interrupted bulk scans resume by rerunning the same command; add `--max-attempts 3` to retry temporary errors
- Pass architecture/security-policy documents with `--knowledge-base` (repeatable)

## Findings and coverage

```bash
npx @openai/codex-security scans list /path/to/repository
npx @openai/codex-security scans show SCAN_ID
npx @openai/codex-security scans match PREVIOUS_SCAN_ID CURRENT_SCAN_ID
npx @openai/codex-security scans compare PREVIOUS_SCAN_ID CURRENT_SCAN_ID
```

The comparison identifies new, persisting, reopened, resolved, and unknown findings. A finding counts as resolved only when the later scan covers its original target and affected path without coverage gaps.

```bash
npx @openai/codex-security findings false-positive FINDING_OCCURRENCE_ID \
  --reason "The framework escapes this input before it reaches the query"
```

Future scans receive that explanation as context but still independently recheck the current source. A dismissal doesn't suppress a rule, path, or vulnerability class.

Confirm a fix:

```bash
npx @openai/codex-security scans rerun BEFORE_SCAN_ID
npx @openai/codex-security scans match BEFORE_SCAN_ID AFTER_SCAN_ID
npx @openai/codex-security scans compare BEFORE_SCAN_ID AFTER_SCAN_ID
npx @openai/codex-security validate /path/to/original/findings.json \
  "Recheck the SQL injection in src/orders.ts:42 against the current code"
```

A missing finding or scan comparison alone doesn't prove a fix worked.

Coverage can be `complete`, `partial`, or `unknown`. Scans with partial/unknown coverage return exit code `2`, even without a severity policy.

## Automation and cost

```bash
npx @openai/codex-security scan . --max-cost 5
npx @openai/codex-security install-hook
npx @openai/codex-security scan . --diff origin/main --fail-on-severity high
```

`--max-cost` is an estimate, not a hard cap — in-progress requests can finish above it. A complete scan returns exit code `1` when it finds an issue at or above the selected severity.

## Notes

- AI-assisted scans can vary even with the same configuration; rerun the baseline and use `scans match`/`scans compare` to track variation — matching doesn't make scans deterministic
- Another application can run scans directly via the [TypeScript SDK](./sdk.md)

## Related

- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Codex Security CLI reference](./cli-reference.md)
- [Run bulk security scans](./cli-bulk-scans.md)
- [Run Codex Security in CI](./cli-ci.md)
