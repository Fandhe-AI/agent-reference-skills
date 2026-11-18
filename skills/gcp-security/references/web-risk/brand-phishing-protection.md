---
source: https://docs.cloud.google.com/web-risk/docs/brand-phishing-protection
---

# Brand Phishing Protection

Web Risk Brand Phishing Protection is a premium Google Cloud security service that proactively detects and disrupts phishing attacks impersonating brands (primarily financial institutions), using Google's real-time telemetry and AI-driven models. Detected sites show a Safe Browsing interstitial warning, and identified threats are added to the Google Safe Browsing block list within minutes. Access is managed through an allowlist; contact your sales representative.

## Signature / Usage

### Grant the Web Risk Viewer role

Enable the Web Risk API in the console project (search for **Web Risk API** and click **Enable**), then grant `roles/webrisk.viewer` to each user who needs the dashboard. Replace `PROJECT_ID` and `USER_EMAIL`.

Adapted (not in the official docs): the source command uses `{project-id}` / `{email}` placeholders and is missing the closing quote after `roles/webrisk.viewer`; both were fixed.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member='user:USER_EMAIL' --role='roles/webrisk.viewer'
```

## Options / Props

### Dashboard metrics

| Metric | Definition |
|---|---|
| Warnings shown | Times Chrome Safe Browsing users saw a Safe Browsing warning page for a malicious URL relevant to your brand. |
| Malicious hosts found and blocked | Unique hosts identified as hosting phishing content and added to the block list. |
| Unique URLs | Distinct relevant malicious URLs for a host identified by Google's detection systems. |
| Unique URLs (customer submitted) | Unique malicious URLs for a host explicitly reported by the customer through the Submission API. |
| First blocked | Timestamp when a malicious host was first added to the block list. |
| Last warning | Most recent date a warning was issued for malicious URLs on the host. |
| Total blocked hosts | Total unique malicious hosts detected relevant to your brand. |

### Dashboard features

| Feature | Description |
|---|---|
| Summary Metrics | Total warnings shown and malicious hosts blocked. |
| Geographical Breakdown | Map of global user protection. |
| Screenshot Gallery | Screenshots of detected phishing sites impersonating your brand. |
| Host Analytics | Detected malicious hosts, first-blocked time and unique malicious URLs per host. |

### Submission API tab (Brand Phishing Protection customers only)

| Metric / column | Definition |
|---|---|
| Total submissions | URLs submitted during the selected time range. |
| Submission API SUCCEEDED rate | Percentage of submitted URLs approved and added to the block list. |
| Median SUCCEEDED time | Median duration from submission to being added to the block list. |
| Status | Current state (`RUNNING`, `SUCCEEDED` or `CLOSED`). |
| Submitted URL / Submission Time | The reported URL and when it was submitted. |
| Time to Analyze | Duration from submission to completed analysis. |
| Verdict Rationale | Reason for closed submissions (see "Understanding CLOSED reasons" in the Long-running operations guide). |

## Notes

- Onboarding with the Google Cloud security team is required. The command grants the role on the project (`gcloud projects add-iam-policy-binding`).
- Standalone Submission API customers must keep checking submission status through the API; the Submission API tab shares the same project setup, API enablement and IAM permissions (`roles/webrisk.viewer`). For the Submission API's deprecation status, see [submission-api.md](./submission-api.md).
- Adapted from the official docs: the original command was `gcloud projects add-iam-policy-binding {project-id} --member='user:{email}' --role='roles/webrisk.viewer` (unterminated quote). The flags `--member` and `--role` exist in gcloud 593.0.0 help. Full flags: https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding
- Source: https://docs.cloud.google.com/web-risk/docs/brand-phishing-protection (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [submission-api.md](./submission-api.md)
- [overview.md](./overview.md)
