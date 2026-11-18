---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-web-security-scanner
---

# Use Web Security Scanner

How to review Web Security Scanner managed scan findings, view the managed scan configuration, run on-demand managed scans, and disable managed scans. Applies to the Premium and Enterprise (Deprecated) service tiers. Web Security Scanner must be enabled in the Security Command Center Services settings to see findings.

## Signature / Usage

### View all findings associated with a specific URL

Open a finding, view its JSON, copy the URL next to `externalUri`, close the pane, and enter this query in the **Query editor** of the Findings page (replace `AFFECTED_URI` with the copied URL):

```text
externalUri:"AFFECTED_URI"
```

### Review findings in the console

1. On the Security Command Center **Findings** page, select your project or organization.
2. In **Quick filters** > **Source display name**, select **Web Security Scanner**.
3. Click a finding name in the **Category** column; the **Summary** tab shows what was detected, the affected resource, and remediation steps. The **JSON** tab shows the full finding.

If data residency is enabled for your organization, use the jurisdictional console.

### Review the managed scan configuration and run on-demand scans

Open the Web Security Scanner page, select a project, and under **Scan configs** click `managed_scan` (latest results, scan status, URLs crawled, vulnerabilities found). Click **Run** or **Run scan again** in the **Results** tab for an on-demand managed scan.

## Options / Props

### Managed scan behavior

| Item | Value |
|------|-------|
| First scan | Can take up to 24 hours to start after the service is enabled |
| Schedule | Weekly after the first scan |
| On-demand scans | Do not affect the timing of scheduled weekly scans |
| Configuration | Managed by Web Security Scanner; cannot be modified (only edited or deleted in Security Command Center) |

### Static IP ranges for managed scans

| Range |
|-------|
| `8.34.210.32/27` |
| `34.66.18.0/26` |
| `34.66.114.64/26` |
| `34.68.34.64/27` |

### Example managed scan findings

| Vulnerability | Description |
|---------------|-------------|
| Mixed-content | HTTPS page also serves resources over HTTP; a man-in-the-middle attacker could tamper with the resource |
| Clear text password | An application returns sensitive content with an invalid content type, or without an `X-Content-Type-Options: nosniff` header |
| Outdated Library | Library version matches a known vulnerable list (false positives possible if version detection fails or the library was manually patched). Some vulnerable versions of jQuery, jQuery Mobile, and AngularJS are identified; the list is updated periodically |

## Notes

- Web Security Scanner can adversely affect the reliability of some applications and might not be suitable for production; it performs all actions with whatever access credentials it is given. Running scans in development, test, staging, or QA environments is recommended; limit access during production scans.
- Attack path simulations do not support Web Security Scanner findings (no attack exposure scores or attack paths).
- Managed scans are separate from custom scans; custom scans are more thorough.
- Filtering and muting: use the Vulnerabilities and Findings page filters; muted findings are hidden but still logged for audit, and can be unmuted at any time. Mute rules mute current and future findings matching the filter, so review the filter first.
- Disabling managed scans: disable the Web Security Scanner service in Security Command Center (organization, folder, or project). You then configure custom scans per project; managed scan configurations are archived, existing findings stay viewable in Security Command Center, and both are removed from the standalone Web Security Scanner page. Re-enabling brings them back; unchanged vulnerabilities generally update existing findings, while substantial application changes may create new findings.
- IAM roles for Security Command Center can be granted at organization, folder, or project level.
- Scan activity appears in the project logs page.
- Source inconsistency: the source gives the Clear text password example the description of an invalid content type finding; the Web Security Scanner overview page describes `CLEAR_TEXT_PASSWORD` as passwords transmitted in clear text and `INVALID_CONTENT_TYPE` as a resource that doesn't match the response's Content-Type header. The row is kept as written.
- The Security Command Center Enterprise service tier shuts down on May 21, 2027; Enterprise organizations move to Premium on or after that date.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-web-security-scanner (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-web-security-scanner-overview.md](./concepts-web-security-scanner-overview.md)
- [how-to-web-security-scanner-custom-scans.md](./how-to-web-security-scanner-custom-scans.md)
- [how-to-remediate-web-security-scanner-findings.md](./how-to-remediate-web-security-scanner-findings.md)
