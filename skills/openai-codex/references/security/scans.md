# Run a Codex Security scan

Start with a standard scan for an initial review or routine repository/component assessment; it runs the full scan workflow once.

## Signature / Usage

Desktop app: **Security** → **Scans** → **+ Scan** → choose repository/folder → **Codebase**.

Conversation prompt:

```text
Use $codex-security:security-scan to scan this repository for security vulnerabilities.
```

Scoped to a folder:

```text
Use $codex-security:security-scan to scan this repository for security vulnerabilities, focusing on the services/billing component.
```

## Scan phases

1. **Threat modeling** — assets, entry points, trust boundaries, security invariants
2. **Finding discovery** — plausible broken controls and source-to-sink paths
3. **Validation** — tests/checks each candidate, records evidence or proof gaps
4. **Impact and path analysis** — realistic paths, impact, severity
5. **Reporting** — validated findings, coverage, scan metadata (detailed per-finding reports are optional for standard scans)
6. **Structural hardening** (when available) — design guidance from the finding set
7. **Finalization** — validates the structured scan contract, generates `report.md`

## Configure the scan

For the best scan quality use `gpt-5.6-sol` with `xhigh` reasoning effort. In the desktop app: select **Codebase** and leave **Deep scan** off; confirm the repository, current branch, and latest revision; set **Scan area** to the entire repository or one folder (scan the whole repository when it's a reasonable review unit; for a monorepo choose one folder when a service, package, or component has an owner and security boundary); choose a model and reasoning effort; use **Additional context** for attacker-controlled inputs, trust boundaries, sensitive actions, or an area to prioritize; select **Start scan**.

## Follow scan progress and review the result

- The workbench shows the current phase and reported progress; select **View activity** to inspect the Codex task. Review the final result after the scan finishes, since findings can change while Codex checks the evidence.
- Review order: confirm the target, revision, and scan area; read reviewed surfaces and deferred or follow-up areas; for each finding check how an attacker reaches the affected code, which control fails, what impact the evidence supports, the validation method, and unresolved questions; investigate findings with missing evidence (dismiss a finding only when you can explain why it doesn't apply, and keep that explanation); select one accepted finding before starting a fix. A completed scan and complete coverage are separate claims, and source-based validation can support a finding without a runtime reproduction (ask for validation of the specific finding to resolve execution-dependent uncertainty).
- Use your first scan as a baseline: decide what you want to compare (such as evidence quality or false positives), record whether a known finding was provided to Codex or withheld, and record the repository revision, plugin version, model, and reasoning effort to compare later scans.
- Reopen a previous scan: open **Security**, select a saved scan from **Scans** to review its findings, coverage, and report artifacts; start a new scan to assess the latest code (it doesn't replace the earlier scan or its artifacts).
- Use the results: open `report.md` for a portable report and keep its scan directory together when sharing or archiving it; see export-findings.md for other formats or issue tracking and fix-findings.md after accepting a finding.

## Notes

- Add `SECURITY.md` (repo root, or nested for directory-specific guidance) for persistent security guidance: threat model, invariants, reportable-finding criteria, exclusions, severity context. The closest file to the code takes precedence. Treated as policy context, not executable instructions
- Use `AGENTS.md` for supported build/validation commands
- For a more thorough assessment after reviewing standard-scan results, use a [deep scan](./deep-scans.md)

## Related

- [Run a deep security scan](./deep-scans.md)
- [Fix and verify security findings](./fix-findings.md)
- [Export and track security findings](./export-findings.md)
