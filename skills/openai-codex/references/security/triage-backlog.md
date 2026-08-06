# Triage a backlog

Use `$codex-security:triage-finding` to review existing security findings against the current repository. This is a read-only static analysis: Codex treats each finding as an unproven claim and inspects repository evidence without executing code.

## Signature / Usage

Pasted or local findings:

```text
Use $codex-security:triage-finding to triage these existing security findings against this repository:

[Paste the findings or provide the artifact path.]
```

Jira/Linear:

```text
Use $codex-security:triage-finding to import and triage the security findings from [Jira or Linear issue URLs, identifiers, or query] against this repository.
Do not change the source issues.
```

GitHub:

```text
Use $codex-security:triage-finding to import and triage [code scanning, Dependabot vulnerabilities and malware, security advisories and private vulnerability reports, or all] from [owner/repository] against this repository.
```

## Options / Props

Finding sources:

| Source | What to provide | Requirements |
|--------|------------------|---------------|
| Pasted/local | SARIF, CVE/GHSA, advisory, scanner ticket, bug bounty report, Codex Security finding artifact, plain-language claim | None |
| Jira/Linear | Issue URLs/identifiers, JQL, or team/project/search phrase | Jira via Atlassian Rovo or Linear connector with read access |
| GitHub | Repository + finding source (code scanning, Dependabot, advisories/private vulnerability reports, or all) | Authenticated GitHub REST access (`gh auth token`, `GH_TOKEN`, `GITHUB_TOKEN`) |

Verdicts:

| Verdict | Meaning |
|---------|---------|
| `confirmed` | Repository evidence shows the path is reachable under stated preconditions and crosses a supported security boundary |
| `not_actionable` | Repository evidence rules out the claim (unaffected version, unreachable path, effective guard, non-shipped surface) |
| `needs_review` | Evidence insufficient — missing, ambiguous, runtime/environment/policy-dependent |

`confirmed` and `needs_review` findings are ranked separately by exploitability (positive integers starting at 1); `not_actionable` findings aren't ranked.

## Notes

- Differs from `$codex-security:validation`, which can build/run code or exercise a real interface to reproduce/disprove a finding — triage classifies/ranks an existing backlog, validation resolves proof gaps with runtime evidence
- Doesn't modify the repository, implement fixes, or automatically write back to source tickets
- `confirmed` findings hand off to [`$codex-security:fix-finding`](./fix-findings.md) after a person accepts remediation

## Related

- [Run a Codex Security scan](./scans.md)
- [Fix and verify security findings](./fix-findings.md)
