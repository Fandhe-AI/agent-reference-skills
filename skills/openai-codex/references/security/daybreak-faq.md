# Daybreak Defense Factory FAQ

Answers on billing, scanning, findings and validation, and fixes for Daybreak Defense Factory cloud scans.

## Signature / Usage

Pausing commit monitoring (UI path from the page):

```text
Repositories > select the repository > Continuous scanning settings > turn off Continuous monitoring > save
```

## Options / Props

| Question | Answer |
| --- | --- |
| How are cloud scans billed? | Repository scans and continuous monitoring are billed by token usage at the plan's rates, in credits or USD; the plan's included usage allowance does not cover them. Both draw from the same credit balance, shared by everyone in a workspace. Free scanning credits don't expire; afterwards plan rates apply. |
| Where are costs shown? | **Usage** compares cost by repository over a date range. **Scan cost** is before credits and exemptions; **Billable remainder** is after. |
| Must the project build? | No, source can be analyzed without a successful build. Validation may need dependencies or a working build; configure them in the Codex cloud environment. |
| Languages? | Source across languages; results depend on the model's reasoning about the language / framework and repository context. Coverage isn't equal across languages or components; check the report's scope. |
| Which scan? | Repository scan for existing issues, continuous monitoring for new commits on the default branch, scheduled scan for recurring reviews; PR reviews check changes before merge. |
| Edit the threat model? | Yes: open **Threat model** in the monitored repository; edits apply to future scans. |
| GitLab? | Cloud scans use a connected GitHub repository. For GitLab, scan a local checkout or run the Codex Security CLI in GitLab CI/CD. |
| Are patches applied automatically? | No. Daybreak saves a proposed patch; **Fix with Codex** discusses or refines it; **Create PR** opens a draft pull request on GitHub. |

## Notes

- Validation: read the evidence attached to each finding. Source analysis can establish a vulnerable code path; execution evidence shows a specific reproducer or test demonstrated it. Status and severity only organize review.
- If validation fails, inspect the attempt and logs; a failed reproducer can mean the issue doesn't apply or that the environment or test was unsuitable. Resolve the gap before dismissing or claiming reproduction.
- If no findings are reported, confirm the scan completed and covered the intended repository and revision; a scan with no findings can still miss vulnerabilities.
- A proposed patch, draft pull request, or status change alone doesn't verify a fix; review validation evidence (original issue no longer reproduces, legitimate behavior still works).
- Compare cloud-faq.md (Codex Security Cloud FAQ) for the earlier-named equivalent; this page uses Daybreak wording and billing text.
- Source: https://learn.chatgpt.com/docs/security/faq (retrieved 2026-11-14).

## Related

- [Set up Daybreak Defense Factory](./daybreak-setup.md)
- [Review findings and fixes in Daybreak](./daybreak-findings-and-fixes.md)
- [Codex Security cloud FAQ](./cloud-faq.md)
- [Improve the Cloud threat model](./threat-model.md)
