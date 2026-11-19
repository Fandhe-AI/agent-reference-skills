---
source: https://docs.cloud.google.com/workload-manager/docs/about-evaluations
---

# About Workload Manager evaluations

Workload Manager uses a rule-based evaluation service to scan workloads and detect deviations from standards, rules, and best practices. It checks resource state against up-to-date best practices for infrastructure, operating systems, and critical high-availability configurations, and provides guidance for identified issues. You can run a one-time check or ongoing evaluation of workloads that might drift after system upgrades or other operational activities.

## Signature / Usage

An evaluation specifies the projects that contain the resources to evaluate and the best practices to evaluate against. Create multiple evaluations to evaluate different resource sets (for example different business units or applications) against different best practices. Running an evaluation uses data from Cloud Asset Inventory and Cloud Monitoring.

```bash
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "X-Goog-User-Project: CONSUMER_PROJECT_ID" \
    "https://workloadmanager.googleapis.com/v1/projects/CONSUMER_PROJECT_ID/locations/LOCATION_ID/rules?evaluationType=EVALUATION_TYPE"
```

## Options / Props

### Supported workloads

| Workload | Condition |
|----------|-----------|
| SAP | - |
| Microsoft SQL Server | - |
| MySQL | - |
| Redis | - |
| Red Hat OpenShift | Preview |
| Custom | Evaluate using custom rules (Rego) |

### Severity levels

| Severity level | Impacts | Recommendation |
|----------------|---------|----------------|
| Critical | System Reliability, Unplanned Outages, Unsupported Configuration | Resolve as soon as possible to prevent an impact on system availability and data integrity due to a high risk of an unplanned outage. |
| High | Degraded Performance, System Stability | Resolve during the next planned maintenance window. |
| Medium | Suboptimal Performance, Supportability | Resolve at your earliest convenience. |
| Low | Informational, Non-essential Behavior | Although there's no resolution needed, reviewing this best practice can provide useful insights. |

## Notes

- Benefits: improve system quality (initial and ongoing evaluation of infrastructure configuration, high-availability setup, and operating system configurations), lower operational overhead (at-scale validation and automated drift detection), and save time during troubleshooting.
- A non-compliant resource is assigned a severity level indicating how far it is out of compliance; the Google Cloud console marks each with an icon.
- Rule findings (Preview) aggregate configuration issues across projects and can be shared with target projects; they appear in the Workload Manager **Rule findings** tab and on integrated pages such as the Compute Engine **Overview** page.
- Agents or operators must be set up on instances or clusters for SAP, SQL Server, Oracle, MySQL, Redis, and the Cluster Services for OpenShift Telemetry operator (OpenShift, Preview) before evaluating those workloads. The page links setup guides for Oracle, but the create-evaluation page does not list Oracle as a workload type.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation
- The Discovery document for `workloadmanager.v1` lists only `SAP`, `SQL_SERVER` and `OTHER` for `evaluationType`; the workload list above follows the source page (see create-evaluation.md).
- Source: https://docs.cloud.google.com/workload-manager/docs/about-evaluations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-rule-findings.md](./about-rule-findings.md)
- [create-evaluation.md](./create-evaluation.md)
- [about-custom-rules.md](./about-custom-rules.md)
- [quickstart.md](./quickstart.md)
