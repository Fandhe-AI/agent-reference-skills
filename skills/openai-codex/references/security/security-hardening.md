# Propose security hardening

Use `$codex-security:propose-security-hardening` to turn security evidence into structural or architectural hardening options. Analyzes a completed Codex Security scan or supplied findings, disclosure reports, incident reviews, assessment documents, and source code.

## Signature / Usage

```text
Use $codex-security:propose-security-hardening to analyze [scan directory or finding paths] against [source tree and revision]. Develop evidence-backed structural hardening options with engineering tradeoffs, before-and-after diagrams, a migration plan, and an implementation handoff. Do not modify the repository.
```

The result is a design portfolio, not a patch — it doesn't prove that it fixes a vulnerability. Codex changes the repository only after an option is selected and Codex is explicitly asked to make the change.

## Notes

- Provide: scan directory or explicit findings/reports, target source tree and revision, PoCs/traces/incident evidence, and constraints (performance, memory, compatibility, reliability, operations, delivery time, change scope)
- Can conclude that local fixes are more proportionate than an architectural change
- When a scan has reportable findings, Codex runs this workflow once after detailed vulnerability reports are ready, writing `hardening/hardening.md` (portfolio), `hardening/hardening.json` (structured analysis), and supporting proposals/diagrams under `hardening/`, linked from `report.md`

## Related

- [Write vulnerability reports](./vulnerability-reports.md)
- [Run a deep security scan](./deep-scans.md)
