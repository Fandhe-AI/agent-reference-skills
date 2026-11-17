---
source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-monitor-framework
---

# Monitor your frameworks for compliance

After you apply a framework, the Compliance Manager monitoring dashboards show the status of your environment's compliance with it, guidance on aligning further with industry standards, and compliance over time. A summary dashboard covers all applied frameworks; a detailed dashboard covers one deployed framework. Available on Standard, Premium, and Enterprise (Deprecated) service tiers.

## Signature / Usage

### Check the framework deployment before you monitor it

Monitoring requires the framework to be applied to an organization, folder, or project.

```bash
gcloud compliance-manager framework-deployments describe \
    my-framework-deployment-id --organization=my-organization-id \
    --location=global
```

### Open the dashboards (Console)

In the Google Cloud console, go to the **Compliance** page, select your organization or project, and click **Monitor (New)** to see the summary dashboard. Click a framework to open its **Framework details** page. Use the date picker to view an earlier date, and **Download report** to export CSV.

## Options / Props

### Required role

| Role | ID | Granted on |
|------|----|-----------|
| Compliance Manager Viewer | `roles/cloudsecuritycompliance.viewer` | Your organization or project |

### Summary dashboard shows

| Item | Availability |
|------|--------------|
| Whether your environment complies with applied frameworks | All tiers |
| List of current findings, with the frameworks that generated them | All tiers |
| Filtered views for resources in a specific App Hub application | Standard-legacy, Standard, Premium, and Enterprise (Deprecated) |
| Compliance scores incorporating both runtime violations and design-time findings detected in application templates | Standard, Premium, and Enterprise (Deprecated) |

### Detailed framework dashboard shows

| Item | Description |
|------|-------------|
| Compliance with applied controls | Scoring is based only on the regulatory controls in the framework; if the framework has none (for example Data security and privacy essentials), scoring is based on cloud controls. |
| Remediation | Information about how to remediate violations. |
| Mappings | Cloud controls to regulatory controls. |
| Shared responsibility | Status for cloud controls. |
| Trend | Current compliance status and trends over time. |
| Report | Download as CSV; file name is `framework-name_yyyy-mm-dd.csv`. |
| Top findings | List of top findings related to the framework. |
| Framework details | Time the framework was applied (your time zone), applied releases, resources it is applied to, timeline of passing controls, **Overview by Controls** table (regulatory controls in the Control toggle, cloud controls in the Cloud Control toggle), and associated findings. |

### Scoring across multiple releases

| Case | Result |
|------|--------|
| A control passes in all assigned releases | Counted as passing |
| A control fails in one or more assigned releases | Counted as failing |

## Notes

- Scoring across multiple releases: Score formula: `TOTAL_UNIQUE_PASSING_CONTROLS` / `TOTAL_UNIQUE_CONTROLS` = `FRAMEWORK_SCORE`. The summary dashboard shows only the aggregated score. The detailed dashboard also shows applied framework releases and, in the **Controls Overview** table, the releases a control is in, the applied cloud control releases, findings across control releases, all unique control groups, and for each group all cloud controls and applied releases.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; Enterprise organizations automatically move to Premium on or after that date.
- The Framework details page might take some time to update findings; use the Findings page for the latest information.
- After a finding appears on the Findings dashboard, it can take up to 24 hours to affect compliance counts; asset changes can take up to 48 hours to appear (see the overview page).
- Remediation steps for each finding are in the cloud controls reference.
- The source page describes the dashboards in the Console only.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/framework-deployments/describe
- Source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-monitor-framework (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [compliance-manager-overview.md](./compliance-manager-overview.md)
- [compliance-manager-apply-framework.md](./compliance-manager-apply-framework.md)
- [compliance-manager-audit.md](./compliance-manager-audit.md)
