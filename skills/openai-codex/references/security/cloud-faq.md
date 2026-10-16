# Codex Security Cloud FAQ

Answers for Codex Security Cloud: billing, scanning, findings and validation, and fixes. For installation and a first scan use cloud-setup.md; local scans have separate plugin and CLI guides.

## Signature / Usage

Codex Security is an LLM-driven security analysis toolkit that inspects source code and returns structured, ranked vulnerability findings with proposed patches. It runs analysis in an ephemeral, isolated container, temporarily clones the target repository, and returns findings with description, file/location, criticality, root cause, and suggested remediation. It complements SAST rather than replacing it.

## Analysis pipeline

1. **Analysis** — builds a threat model for the repository
2. **Commit scanning** — reviews merged commits and repository history for likely issues
3. **Validation** — tries to reproduce likely vulnerabilities in a sandbox to reduce false positives
4. **Patching** — integrates with Codex to propose patches that reviewers inspect before opening a PR

## Billing

- How are Cloud scans billed: repository scans and continuous scans set up after October 1, 2026, at 12:53 PM Pacific are billed based on token usage at your plan's rates, in credits or USD depending on your billing plan; free scanning credits apply first for eligible accounts. This usage isn't covered by your plan's included usage allowance. Continuous scans set up before that cutoff are free until October 21, 2026; afterwards they are billed at regular token rates if you enable paid usage, otherwise they pause.
- Free period or credits: if continuous scanning was set up before October 1, 2026, at 12:53 PM Pacific, covered continuous scans remain free until October 21, 2026 (this doesn't cover repository scans or later-set-up continuous scanning); otherwise eligible accounts receive $500 in free scanning credits instead. Repository scans and continuous scanning share the same free balance, everyone in a workspace shares it, it doesn't expire, and further scanning is billed under the account's or workspace's billing plan once it runs out.
- When the free continuous-scanning period ends: select **Keep scans running** and enable paid usage to continue (billed at regular token rates); if you opt out or don't enable paid usage those scans pause, and **Re-enable scans** enables paid usage afterwards. In a workspace, ask a workspace owner if you lack permission.
- Token usage and charges: open a scan in **Scans**; hover over the token count for input, cached input (included in the input count, not added on top), and output tokens. Usage shows the cost before free scanning credits or billing exemptions plus any amount covered by credits; scans marked "Exempt from billing. No charges apply." incur no charges even when they show usage.

## Scanning

- Does the project need to be built: source can be analyzed without a successful build; validation may need dependencies or a working build (configure them in the Codex cloud environment); if validation can't run, inspect what the finding establishes from source versus runtime or deployment behavior. It may attempt a build inside the container during auto-validation.
- Languages: language-agnostic; results depend on the model's ability to reason about the language and framework and on the available repository context; a successful scan doesn't imply equal coverage across languages or components, so check the report for the scope actually reviewed.
- Repository scans vs commit monitoring: a **One-Time Scan** reviews the repository once; **Continuous Scanning** monitors new commits and can review selected commit history (enable it after the first scan; see "Monitor new commits" in cloud-setup.md).
- Pause commit monitoring: open **Repositories**, select the repository, open **Monitoring settings**, set monitoring to **Paused**, and select **Save**; enable it again from the same settings.
- Edit the threat model: yes, in the monitored repository's **Monitoring settings** when architecture, deployment, or security assumptions change (changes apply to future scans; see threat-model.md). A threat model is the scan-time security context (project overview plus entry points, trust boundaries, auth assumptions, risky components).

## Findings and validation

- What validation establishes: read the evidence attached to the particular finding; source analysis can establish a vulnerable code path and execution evidence can show that a reproducer or test demonstrated the issue; status and severity help organize review but use the underlying evidence and prerequisites to decide applicability.
- If validation fails: inspect the attempted validation and available logs; a failed reproducer can mean the issue doesn't apply or that the environment or test was unsuitable; resolve the stated gap before dismissing the finding or claiming it was reproduced.
- If the scan reports no findings: confirm the scan completed and reviewed the intended repository and revision, read any recorded limits or unfinished work; a scan with no findings can still miss vulnerabilities.

## Fixes

- Does Codex Security apply patches automatically: no. **Fix with Codex** on a repository finding starts a conversation that asks Codex to verify the issue, implement a fix, and run relevant tests (review the changes there). For a finding with a suggested patch, review the diff before **Create draft pull request** (the draft doesn't merge the fix).
- How do I know a patch fixed the issue: review the patch's validation evidence (does the original issue still reproduce, does legitimate behavior still work); if validation wasn't completed keep that uncertainty with the finding; a proposed patch, draft PR, or status change alone doesn't verify a fix.

## Notes

- Initial scans can take several hours to multiple days for larger repositories; later scans are usually faster (incremental). It doesn't replace manual security review, exploitability checks, or human threat assessment.

## Related

- [Codex Security](./overview.md)
- [Codex Security cloud setup](./cloud-setup.md)
- [Improving the threat model](./threat-model.md)
