# Codex Security plugin changelog

Notable user-facing changes to the Codex Security plugin, by version. Latest release in the hosted Codex Security catalog: `0.1.17`.

## Signature / Usage

Check the plugin version in the current Codex environment before relying on a feature from a newer release. Reopening or rerunning a saved scan doesn't pin the installed plugin version. Versions apply to the Codex Security plugin only — the Codex app, Codex CLI, TypeScript SDK, and plugin app have separate version numbers.

## Notable versions

| Version | Date | Highlights |
|---------|------|-----------|
| 0.1.17 | 2026-08-05 | Live scan progress view; resumable interrupted deep scans; native scan start/completion without the retired embedded widget |
| 0.1.16 | 2026-08-04 | Measured token usage reporting; unified threat-modeling/discovery/validation/attack-path/reporting phases for standard and deep scans; configurable deep-scan workers |
| 0.1.15 | 2026-07-30 | Persistent scan lifecycle metadata; false-positive feedback for completed scans; nested Git repository support in scan snapshots |
| 0.1.14 | 2026-07-28 | Scan history filtering/comparison (new/persisting/resolved/not-rescanned); `SECURITY.md` policy support via `$codex-security:define-security-policy`; select up to 25 findings for Linear/GitHub Issues tracking |
| 0.1.13 | 2026-07-25 | Findings kept for local/internal/training-only/non-production code, calibrated by deployment/exposure context instead of auto-suppression |
| 0.1.12 | 2026-07-23 | Repository-wide/directory-scoped deep scans with worker coordination; scan reopen/rerun; SARIF/JSON/CSV export |
| 0.1.11 | 2026-07-10 | Per-finding vulnerability reports and structural hardening portfolio (`findings/`, `hardening/`); `$codex-security:vulnerability-writeup` and `$codex-security:propose-security-hardening` skills; `SECURITY.md` guidance support |
| 0.1.10 | 2026-06-23 | Improved Jira/Linear ticket intake with duplicate detection |
| 0.1.9 | 2026-06-18 | Findings workspace (coverage, severity, confidence, artifacts); JSON/CSV/SARIF export; backlog triage against scanners, advisories, bug bounty reports |
| 0.1.7 | 2026-06-04 | Initial evidence-backed security review workflow: repository/folder scans, PR/commit/branch diff review, threat modeling → discovery → validation → impact analysis → reporting, focused fix generation |

## Notes

- This changelog covers the plugin only, distinct from the CLI/SDK package version (`@openai/codex-security`)

## Related

- [Codex Security plugin quickstart](./plugin-quickstart.md)
- [Use the Codex Security workbench](./workbench.md)
