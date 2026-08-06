# Codex Security CLI quickstart

Set up the `@openai/codex-security` CLI, run a local scan, and review the report, findings, and coverage.

## Signature / Usage

Requires Node.js 22+ (and Python 3.10+ for scanning/exporting).

```bash
npm install @openai/codex-security
npx @openai/codex-security --version
npx @openai/codex-security --help
```

Sign in:

```bash
npx @openai/codex-security login              # interactive ChatGPT login
npx @openai/codex-security login --device-auth # remote/headless machine
export OPENAI_API_KEY="<your-api-key>"          # CI / automated workflows
```

Run a scan:

```bash
REPOSITORY=/path/to/repository
SCAN_DIR=/path/outside/repository/codex-security-results

npx @openai/codex-security scan "$REPOSITORY" --output-dir "$SCAN_DIR" --dry-run
npx @openai/codex-security scan "$REPOSITORY" --output-dir "$SCAN_DIR"
```

Scans default to `gpt-5.6-sol` with `xhigh` reasoning effort:

```bash
npx @openai/codex-security scan "$REPOSITORY" --model gpt-5.6-terra --effort high
```

## Results

```text
codex-security-results/
├── scan-manifest.json
├── findings.json
├── coverage.json
├── report.md
├── artifacts/
└── exports/
    └── results.sarif       # when produced
```

Coverage is `complete`, `partial`, or `unknown`.

## Next scans

```bash
# path scan
npx @openai/codex-security scan "$REPOSITORY" --path services/billing --path packages/auth
# committed changes
npx @openai/codex-security scan "$REPOSITORY" --diff origin/main --head HEAD
# staged/unstaged changes
npx @openai/codex-security scan "$REPOSITORY" --working-tree --base HEAD
# deep mode
npx @openai/codex-security scan "$REPOSITORY" --mode deep
```

Add architecture/security context:

```bash
npx @openai/codex-security scan "$REPOSITORY" \
  --knowledge-base /path/to/architecture.md \
  --knowledge-base /path/to/security-policies
```

Pre-commit hook and bulk scans:

```bash
npx @openai/codex-security install-hook
gh auth login
npx @openai/codex-security bulk-scan
```

## Notes

- Scans are report-only by default; add `--fail-on-severity` when ready to enforce a policy in CI (see [Run Codex Security in CI](./cli-ci.md))
- If the default state directory isn't writable, set `CODEX_SECURITY_STATE_DIR` to a private directory outside the repository
- Diff and working-tree scans require the repository argument to be the Git worktree root; deep mode supports repository/path targets only

## Related

- [Codex Security CLI reference](./cli-reference.md)
- [Run bulk security scans](./cli-bulk-scans.md)
- [Run Codex Security in CI](./cli-ci.md)
- [Codex Security CLI FAQ](./cli-faq.md)
- [Codex Security TypeScript SDK](./sdk.md)
