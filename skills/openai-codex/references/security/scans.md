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

## Notes

- Add `SECURITY.md` (repo root, or nested for directory-specific guidance) for persistent security guidance: threat model, invariants, reportable-finding criteria, exclusions, severity context. The closest file to the code takes precedence. Treated as policy context, not executable instructions
- Use `AGENTS.md` for supported build/validation commands
- For a more thorough assessment after reviewing standard-scan results, use a [deep scan](./deep-scans.md)

## Related

- [Run a deep security scan](./deep-scans.md)
- [Fix and verify security findings](./fix-findings.md)
- [Export and track security findings](./export-findings.md)
