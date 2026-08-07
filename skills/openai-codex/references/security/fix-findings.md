# Fix and verify security findings

Turn an accepted security finding into a focused, verified patch. Codex validates the issue and, when safe and practical, adds a focused regression test that fails before the fix and passes after it.

## Signature / Usage

UI workflow (Findings or Scans → open accepted finding → **Patch** tab):

1. **Generate a focused patch** — Codex validates/reproduces the issue when feasible and writes a patch artifact without modifying the checkout
2. **Review the proposed diff** — reject broad refactors, unrelated cleanup, or changes weakening another control
3. **Apply the patch locally** — **Apply patch** applies the exact generated patch to the working tree
4. **Verify the fix** — **Verify fix** reruns the original reproducer or strongest exploit check; checks legitimate behavior and nearby bypasses
5. **Close the finding deliberately** — verification doesn't auto-close; review evidence and close with an accurate reason or keep open

CLI prompt:

```text
Use $codex-security:fix-finding to fix finding <finding-id> from <report-path>. Validate the issue, make the smallest safe change, and add a focused regression test that fails before the fix and passes after it. If that test is unsafe or infeasible, record the proof gap and provide the strongest repeatable validation artifact instead. Verify that the issue no longer reproduces.
```

CI/CD:

```bash
codex exec --sandbox workspace-write 'Use $codex-security:fix-finding to fix finding <finding-id> from <report-path>. Validate the issue, make the smallest safe change, and add a focused regression test that fails before the fix and passes after it. If that test is unsafe or infeasible, record the proof gap and provide the strongest repeatable validation artifact instead. Verify that the issue no longer reproduces.'
```

## Notes

- Install Codex Security in the `CODEX_HOME` that `codex exec` uses before running these commands — a fresh CI runner doesn't include marketplace plugins by default
- In CI/CD, separate the change scan from remediation: preserve the completed scan directory as a job artifact, then start one Codex task/job per accepted finding
- Uses `--sandbox workspace-write`; see Non-interactive mode (`security-automation` category) for permissions/safety details
- If a regression test is unsafe/infeasible, Codex records the proof gap and provides the strongest repeatable validation artifact instead

## Related

- [Run a Codex Security scan](./scans.md)
- [Export and track security findings](./export-findings.md)
- [Triage a backlog](./triage-backlog.md)
