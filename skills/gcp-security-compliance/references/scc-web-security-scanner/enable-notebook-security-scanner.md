---
source: https://docs.cloud.google.com/security-command-center/docs/enable-notebook-security-scanner
---

# Enable and use Notebook Security Scanner

Notebook Security Scanner (Preview; Premium and Enterprise (Deprecated) service tiers) detects vulnerabilities in Python packages within Colab Enterprise notebooks (`.ipynb` files). After you enable it through Security Command Center, it scans notebooks every 24 hours and publishes findings to the Security Command Center **Findings** page.

## Signature / Usage

### Enable

Enable at the organization or project level on the Security Command Center Settings page.

- New activation, Premium tier: **Get Security Command Center**, select **Premium**, set **Notebook Security Scanner** to **Enable**, choose **Grant roles automatically** and **Grant roles**, wait for the service account to be provisioned, then **Finish**.
- New activation, Enterprise tier: activate the Enterprise tier (see the Security Command Center activation guide), then enable the scanner.
- Existing Premium or Enterprise tier: **Settings** > **Notebook Security Scanner** card > **Manage settings**, then select **Enable** in the **Notebook Security Scanner** column for your project.

### Review findings

On the Findings page, select the organization or project, and under **Quick filters** > **Source display name** select **Notebook Security Scanner**. Follow the **Next steps** of a finding to resolve it; if no fix exists, use alternative Python packages.

### Service name for `gcloud scc manage services`

You manage the feature in the console. To read its enablement state from the CLI, `gcloud scc manage services describe` takes the service as `SERVICE_NAME`; the supported-services list of the gcloud help names it as follows.

```text
* notebook-security-scanner (can be abbreviated as nss)
```

## Options / Props

| Item | Value |
|------|-------|
| Scan frequency | Every 24 hours |
| New notebook | Findings can take a maximum of four hours to appear |
| Supported regions | `us-central1`, `us-east4`, `us-west1`, `europe-west4` |
| Enablement scope | Organization or project |
| API | `notebooksecurityscanner.googleapis.com` is not intended for direct use; manage the feature in the console |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; available as is, limited support.
- Findings can name packages and versions not actually in the notebook: for Python packages installed without versions in unexecuted code cells, the scanner assumes the latest PyPI version and publishes its vulnerabilities.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe (gcloud 593.0.0 help, `SERVICE_NAME` list). The source page has no code.
- The Security Command Center Enterprise service tier shuts down on May 21, 2027; Enterprise organizations move to Premium on or after that date.
- Source: https://docs.cloud.google.com/security-command-center/docs/enable-notebook-security-scanner (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-web-security-scanner-overview.md](./concepts-web-security-scanner-overview.md)
