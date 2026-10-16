# Codex Security plugin changelog

Notable user-facing changes to the Codex Security plugin, by version. Newest release notes: `0.1.30`.

## Signature / Usage

Check the plugin version in your current Codex environment before using a feature from a newer release. Reopening or rerunning a saved scan doesn't pin the installed plugin version. Changelog entries follow the plugin version, not the package version; CLI and SDK users can run `npx @openai/codex-security info --json` to check the package and bundled plugin versions together.

```bash
npx @openai/codex-security info --json
```

## Notable versions

| Version | Date | Highlights |
|---------|------|-----------|
| 0.1.30 | September 24, 2026 | Updates the plugin version; same behavior as `0.1.25` |
| 0.1.25 | September 23, 2026 | Scan evidence and supplemental documents kept with saved results; phase-by-phase standard scan progress; changed GitHub Actions workflow files included in change scans, `.cjs` / `.cts` / `.mts` / `.tf` recognized; scans continue when the Daybreak check is unavailable or inconclusive; `OPENAI_API_KEY` for deep-scan workers when the provider requires OpenAI authentication |
| 0.1.24 | September 9, 2026 | Daybreak access check from the plugin in ChatGPT-signed-in desktop and CLI sessions (enrollment link when not granted; advisory only); `$codex-security:verify-fix` runs only when explicitly requested |
| 0.1.23 | September 8, 2026 | `$codex-security:assess-patch-risk` (advisory merge / revise / no-change recommendation); recover valid saved findings from a selected failed scan; per-check setup readiness; deep-scan reports show include/exclude paths; tool server startup allowed up to two minutes; explicit GitHub connector honored for triage import |
| 0.1.22 | August 25, 2026 | `$codex-security:verify-fix` (`fixed` / `still_vulnerable` / `inconclusive`); findings and pending candidates saved as deep-scan workers progress; scan prompt carried into deep-scan workers; Windows path/filesystem compatibility fixes |
| 0.1.21 | August 21, 2026 | Plugin installs without the optional Codex Security Access app; Codex's bundled Node.js runtime used; consistent finding details; SARIF exports include readable rule names, remediation guidance, CWE tags, and security severity |
| 0.1.20 | August 17, 2026 | Each deep-scan worker runs the full end-to-end audit; four concurrent workers by default, stop after four consecutive scans with no new findings, 40 worker runs max (`workers = "auto"` resolves to four); Trusted Access for Cyber check before hosted scans (advisory); deep scans in packaged CLI/SDK installs |
| 0.1.19 | August 13, 2026 | `[deep_scan].max_time_hours` (positive, up to 96, fractions allowed); completed discovery results kept at the deadline; larger source files; OpenRouter and Fireworks credentials passed to deep-scan workers |
| 0.1.18 | August 7, 2026 | Amazon Bedrock scans (bearer tokens, AWS profiles, regional settings, web identity, container credentials); simpler standard-scan workflow; up to five minutes to initialize large repositories |
| 0.1.17 | August 5, 2026 | Live scan progress view; resumable interrupted deep scans; native scan start/completion without the retired embedded widget |
| 0.1.16 | August 4, 2026 | Measured token usage reporting; unified threat-modeling / discovery / validation / attack-path / reporting phases for standard and deep scans; configurable deep-scan workers |
| 0.1.15 | July 30, 2026 | Results tied to the original revision or working-tree snapshot; false-positive feedback for completed scans; nested Git repository support in snapshots |
| 0.1.14 | July 28, 2026 | Scan history filtering/comparison (new/persisting/resolved/not-rescanned); `SECURITY.md` policy via `$codex-security:define-security-policy`; select up to 25 findings for Linear/GitHub Issues tracking |
| 0.1.13 | July 25, 2026 | Findings kept for local/internal/training-only/non-production code, calibrated by deployment/exposure context instead of auto-suppression |
| 0.1.12 | July 23, 2026 | Repository-wide/directory-scoped deep scans with worker coordination; scan reopen/rerun; SARIF/JSON/CSV export |
| 0.1.11 | July 10, 2026 | Per-finding vulnerability reports and structural hardening portfolio (`findings/`, `hardening/`); `$codex-security:vulnerability-writeup` and `$codex-security:propose-security-hardening`; `SECURITY.md` guidance support |
| 0.1.10 | June 23, 2026 | Improved Jira/Linear ticket intake with duplicate detection |
| 0.1.9 | June 18, 2026 | Findings workspace (coverage, severity, confidence, artifacts); JSON/CSV/SARIF export; backlog triage against scanners, advisories, bug bounty reports |
| 0.1.7 | June 4, 2026 | Initial evidence-backed security review workflow: repository/folder scans, PR/commit/branch diff review, threat modeling → discovery → validation → impact analysis → reporting, focused fix generation |

## Notes

- This changelog covers the plugin only, distinct from the CLI/SDK package version (`@openai/codex-security`); the Codex app, Codex CLI, TypeScript SDK, and plugin app have separate version numbers.
- Dates follow the official page's notation (earlier revisions of this page used ISO dates for 0.1.7–0.1.17).
- The public CLI and SDK packages don't run the Trusted Access for Cyber advisory introduced in `0.1.20`.

## Related

- [Codex Security plugin quickstart](./plugin-quickstart.md)
- [Use the Codex Security workbench](./workbench.md)
- [Run deep scans](./deep-scans.md)
