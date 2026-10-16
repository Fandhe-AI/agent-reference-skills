# Fix and verify security findings

Turn an accepted security finding into a focused, verified patch. Codex validates the issue and, when safe and practical, adds a focused regression test that fails before the fix and passes after it.

## Signature / Usage

UI workflow (Findings or Scans → open accepted finding → **Patch** tab):

1. **Generate a focused patch** — Codex validates/reproduces the issue when feasible and writes a patch artifact without modifying the checkout
2. **Review the proposed diff** — reject broad refactors, unrelated cleanup, or changes weakening another control
3. **Apply the patch locally** — **Apply patch** applies the exact generated patch to the working tree
4. **Verify the fix** — **Verify fix** reruns the original reproducer or strongest exploit check; checks legitimate behavior and nearby bypasses
5. **Close the finding deliberately** — verification doesn't auto-close; review evidence and close with an accurate reason or keep open

Conversation prompt (supply the finding ID and report path, plus a reproducer or validation command if you have one; this authorizes edits to the checkout):

```text
Use $codex-security:fix-finding to fix finding <finding-id> from <report-path>. Verify the issue against this checkout, fix it, and test the original failure and legitimate behavior. Record any verification you couldn't complete.
```

CI/CD:

```bash
codex exec --sandbox workspace-write 'Use $codex-security:fix-finding to fix finding <finding-id> from <report-path>. Verify the issue against this checkout, fix it, and test the original failure and legitimate behavior. Record any verification you could not complete.'
```

## Notes

- Start with one finding whose evidence you accept. A generated or applied patch isn't yet a verified fix. In the desktop workbench, generation leaves the selected checkout unchanged (**Generate patch** on the **Patch** tab), applying the patch changes it, and verification checks the patch and records evidence without automatically closing the finding. **Verify fix** reruns the original reproducer or another exploit check; when it can run a regression test it checks the test fails before and passes after, otherwise it records the verification gap and the checks it completed, and it also checks legitimate behavior, nearby bypasses, and repository tests. Review commands, results, and the remaining proof gap, then close the finding with an accurate reason or keep it open.
- Findings can come from a scan, ticket, advisory, or other review; Codex can inspect the repository for missing technical details but may need you to clarify an intended security policy before choosing a fix. For repeatable scans and patch generation use the standalone CLI validate and patch commands (cli-reference.md). After verification, merge through your normal code-review process; if verification is incomplete keep the finding open with the remaining work.

- Install Codex Security in the `CODEX_HOME` that `codex exec` uses before running these commands — a fresh CI runner doesn't include marketplace plugins by default
- In CI/CD, separate the change scan from remediation: preserve the completed scan directory as a job artifact, then start one Codex task/job per accepted finding
- Uses `--sandbox workspace-write`; see Non-interactive mode (`security-automation` category) for permissions/safety details
- If a regression test is unsafe/infeasible, Codex records the proof gap and provides the strongest repeatable validation artifact instead

## Related

- [Run a Codex Security scan](./scans.md)
- [Export and track security findings](./export-findings.md)
- [Triage a backlog](./triage-backlog.md)
