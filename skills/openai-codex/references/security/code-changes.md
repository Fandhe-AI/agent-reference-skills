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

Key `findings.json` fields (schema at `github.com/openai/plugins` → `plugins/codex-security/schemas/findings.schema.json`):

| Name | Type | Description |
|------|------|-------------|
| `documentType` | String | `codex-security.findings` |
| `schemaVersion` | String | Findings schema version |
| `scanId` | String | Scan that produced the findings |
| `findings[].findingId` | String | Stable identifier derived from the finding fingerprint |
| `findings[].occurrenceId` | String | Identifies this occurrence in a specific scan |
| `findings[].ruleId` | String | Vulnerability family |
| `findings[].severity` | Object | Severity level and optional scoring |
| `findings[].confidence` | Object | Confidence level and rationale |
| `findings[].taxonomy` | Object | Vulnerability category and CWE identifiers |
| `findings[].locations` | Array | Affected files, line numbers, location roles |
| `findings[].remediation` | String | Recommended fix |

## Notes

- For a beta standalone CLI with structured JSON, severity policy, and SARIF upload, see [Run Codex Security in CI](./cli-ci.md); this page's CI section instead invokes the installed plugin skill via `codex exec`
- Requires `--sandbox workspace-write` so the scan can create temporary artifacts, but the prompt must still require leaving the checkout unchanged
- After reviewing results: [Fix and verify a finding](./fix-findings.md) or [Export and track findings](./export-findings.md)

## Related

- [Run a Codex Security scan](./scans.md)
- [Fix and verify security findings](./fix-findings.md)
- [Run Codex Security in CI](./cli-ci.md)
