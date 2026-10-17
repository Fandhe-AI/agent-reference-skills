# Review code changes for security

Runs a security change review to find regressions in one Git-backed change set. Codex reviews each changed source-like file and its directly supporting code; it doesn't expand into a full repository audit.

## Signature / Usage

Desktop app: **Security** → **Scans** → **+ Scan** → choose repository → **Changes** (uncommitted changes, a single commit, or a base/head revision range). **Deep scan** isn't available for a changes scan.

Conversation prompt (uncommitted changes):

```text
Use $codex-security:security-diff-scan to review my current uncommitted changes for security regressions.
```

Conversation prompt (revision range):

```text
Use $codex-security:security-diff-scan to review the changes from origin/main to HEAD for security regressions. Focus on authentication, authorization, input handling, filesystem access, network requests, and secrets.
```

## CI/CD automation

```bash
npm install --global @openai/codex
codex plugin add codex-security@openai-curated
CODEX_API_KEY="$CODEX_SECURITY_API_KEY" codex exec \
  --sandbox workspace-write \
  "Use \$codex-security:security-diff-scan to review changes from $BASE_REVISION to $HEAD_REVISION for security regressions. Do not modify the checkout."
```

Output at `$TMPDIR/codex-security-scans/<repository>/<scan-id>/`: `report.md`, `findings/<slug>/`, `hardening/`, `findings.json`, `scan-manifest.json`, `coverage.json`.

## Options / Props

Scan output files (`$TMPDIR/codex-security-scans/<repository>/<scan-id>/`):

| Name | Description |
|------|-------------|
| `report.md` | Primary readable entry point to the complete scan directory |
| `findings/<slug>/` | Detailed vulnerability reports and supporting proof-of-concept files, when requested |
| `hardening/` | Structural hardening guidance and supporting proposals, when requested |
| `findings.json` | Findings with stable identifiers, severity, confidence, source locations, and remediation; use `findingId` to identify the finding and `occurrenceId` for its occurrence in this scan (field definitions: the findings schema in `github.com/openai/plugins`, `plugins/codex-security/schemas/findings.schema.json`) |
| `scan-manifest.json` | Sealed scan receipt with the reviewed target, revisions, and artifact hashes |
| `coverage.json` | Reviewed and deferred surfaces, exclusions, and coverage completeness |

```bash
jq -r '
  .findings[] |
  [.findingId, .severity.level, .confidence.level, .locations[0].path, .locations[0].startLine, .title] |
  @tsv
' findings.json
```

## Notes

- Confirm the change in setup: select **Changes**, confirm the checked-out repository, current branch, and latest commit; under **Changes to review** choose `Uncommitted changes`, the latest commit, or a base and head revision (branch or pull-request range); confirm the summary, then **Start scan**. Codex doesn't check out another branch or switch the selected working tree; if a requested revision isn't available locally, fetch it first or provide a locally available base and head. You can also name a pull request when its base and head revisions are in the local checkout.
- CI/CD requirements: a trusted Linux runner with Node.js and `npm` (writable global prefix), Git, Python 3, `jq`, and the provider's command-line tools. Install the CLI without exposing the scan credential (`npm install --global @openai/codex`), install the plugin from the public Codex CLI plugin marketplace (`codex plugin add codex-security@openai-curated`; see plugin-changelog.md for version-specific requirements), provide `CODEX_SECURITY_API_KEY` from your CI secret store and expose it only for the scan (`CODEX_API_KEY="$CODEX_SECURITY_API_KEY" codex exec ...`). Set `CODEX_HOME` and `TMPDIR` to job-local directories and archive `codex-security-scans` (structured findings, manifest, coverage, `report.md`, and any `findings/` or `hardening/` outputs). The official page gives examples for GitHub Actions, GitLab CI/CD (masked `CODEX_SECURITY_API_KEY` variable, `CI_MERGE_REQUEST_DIFF_BASE_SHA` as base), Azure Pipelines (Build validation branch policy for Azure Repos), and Jenkins (`withCredentials`).
- The examples skip forked pull requests; run credentialed jobs only from a protected pipeline definition and only for contributors trusted with the scan credential. Scan results can include sensitive vulnerability details, so keep artifacts private and review the destination before publishing findings. Start with advisory results and review coverage and runtime before making the job a required check.
- If your organization permits the Codex GitHub Action, it can install the CLI at runtime, but you must still install the plugin first and point the action's `codex-home` input at the same `CODEX_HOME`. For API-key handling and sandbox controls see non-interactive-mode.md.

- For a beta standalone CLI with structured JSON, severity policy, and SARIF upload, see [Run Codex Security in CI](./cli-ci.md); this page's CI section instead invokes the installed plugin skill via `codex exec`
- Requires `--sandbox workspace-write` so the scan can create temporary artifacts, but the prompt must still require leaving the checkout unchanged
- After reviewing results: [Fix and verify a finding](./fix-findings.md) or [Export and track findings](./export-findings.md)

## Related

- [Run a Codex Security scan](./scans.md)
- [Fix and verify security findings](./fix-findings.md)
- [Run Codex Security in CI](./cli-ci.md)
