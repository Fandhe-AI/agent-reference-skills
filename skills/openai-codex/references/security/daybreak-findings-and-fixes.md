# Review findings and fixes in Daybreak

Review Daybreak findings and the patches proposed for them: findings page, finding detail, and the fix review flow ending in a draft pull request.

## Signature / Usage

Open **Overview**, then under **Proposed fixes** select **Review**; or open **Findings** and select a finding. To generate a fix:

```text
Findings > Fix (or select several findings > "Generate 2 fixes") > Fixes > open the proposed fix > Proposed changes / Patch checker > Create PR
```

## Options / Props

| Area | What it shows |
| --- | --- |
| Findings page | Chart grouping findings by severity and status; table with owner, reporting scanner, detection time; search and repository filter. |
| Finding detail | Summary, root cause, supporting evidence, how someone could exploit it, reported severity, current status. |
| Proposed fix | Summary and diff under **Proposed changes**; **Patch checker** result showing what Daybreak verified. |
| Actions | **Fix with Codex** (menu next to **Create PR**) to ask questions or request changes; **Create PR** opens a draft pull request on GitHub. |

## Notes

- Check the **Patch checker** for tests such as one that rejects a request from another project and one that still allows an authorized export (the page's example).
- Review and test the change in the pull request; after merge, verify the original attack path fails on the merged revision before marking the finding **Fixed**.
- Findings imported from other scanners (**Settings → Integrations**) appear with each scanner's evidence under **Observations** on the shared finding.
- Source: https://learn.chatgpt.com/docs/security/findings-and-fixes (retrieved 2026-11-14).

## Related

- [Import scanner findings into Daybreak](./daybreak-scanner-imports.md)
- [Daybreak FAQ](./daybreak-faq.md)
- [Set up Daybreak Defense Factory](./daybreak-setup.md)
- [Fix findings](./fix-findings.md)
