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
- Example: repeated authorization bugs may suggest a shared control is easier to enforce than checks in each handler; the evidence may instead support keeping a local fix.
- Before choosing an option check that the proposal connects each change to findings, source, and threat-model evidence; describes the current design and the security invariants to preserve; compares distinct options (residual risk, performance, reliability, operations, compatibility, migration cost); supports its recommendation with evidence and states assumptions and open questions; includes rollout, validation, rollback, and implementation guidance; and separates observed facts, inferences, and proposed design properties. An architecture diagram or design recommendation doesn't replace validation of the original findings or the implemented fix.
- You can request a hardening portfolio for a standard, deep, or change scan with reportable findings; Codex writes `hardening/hardening.md` (portfolio), `hardening/hardening.json` (structured analysis), and supporting proposals/diagrams under `hardening/`, linked from `report.md`. Keep the full scan directory together so links stay usable.

## Related

- [Write vulnerability reports](./vulnerability-reports.md)
- [Run a deep security scan](./deep-scans.md)
