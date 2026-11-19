---
source: https://docs.cloud.google.com/workload-manager/docs/about-rule-findings
---

# About Workload Manager rule findings

Preview. Rule findings identify configuration risks and best practice violations across cloud resources by aggregating findings from workload evaluations across Google Cloud projects. Each finding is categorized by severity level and impact category.

## Signature / Usage

Findings are produced when you create and run an evaluation; sharing is enabled with the **Share findings** option on the evaluation. The page itself has no code; the following request creates an evaluation (the source of findings).

```bash
curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -H "X-Goog-User-Project: CONSUMER_PROJECT_ID" \
    -d '{
      "description": "DESCRIPTION",
      "evaluationType": "EVALUATION_TYPE",
      "ruleNames": [
        "RULE_NAMES"
      ],
      "resourceFilter": {
        "scopes": [
          "projects/TARGET_PROJECT_ID"
        ],
        "resourceIdPatterns": [
          "RESOURCE_ID_PATTERNS"
        ],
        "inclusionLabels": {
          "LABEL_KEY": "LABEL_VALUE"
        },
        "gceInstanceFilter": {
          "serviceAccounts": [
            "SERVICE_ACCOUNT_EMAIL"
          ]
        }
      },
      "schedule": "SCHEDULE",
      "bigQueryDestination": {
        "destinationDataset": "projects/BQ_PROJECT_ID/datasets/BQ_DATASET_ID",
        "createNewResultsTable": true
      }
    }' \
    "https://workloadmanager.googleapis.com/v1/projects/CONSUMER_PROJECT_ID/locations/LOCATION_ID/evaluations?evaluationId=EVALUATION_ID"
```

## Options / Props

### Projects

| Term | Meaning |
|------|---------|
| Consumer project | The project where you configure, store, and execute the evaluation. |
| Target projects | The projects containing the resources that the evaluation scans. |

### Severity levels

| Severity level | Impacts | Recommendation |
|----------------|---------|----------------|
| Critical | System Reliability, Unplanned Outages, Unsupported Configuration | Resolve as soon as possible to prevent an impact on system availability and data integrity due to a high risk of an unplanned outage. |
| High | Degraded Performance, System Stability | Resolve during the next planned maintenance window. |
| Medium | Suboptimal Performance, Supportability | Resolve at your earliest convenience. |
| Low | Informational, Non-essential Behavior | Although there's no resolution needed, reviewing this best practice can provide useful insights. |

### Impact categories

| Category | Description |
|----------|-------------|
| Reliability | Findings related to workload availability, fault tolerance, and backup configurations. |
| Security | Findings related to access controls, encryption, and compliance with best practices for security. |
| Performance | Findings related to resource utilization, latency, and system optimization. |
| Cost | Findings related to underutilized resources and opportunities to optimize operational expenses. |

## Notes

- Key benefits: fleet-wide visibility across projects, contextual integration (for example the Compute Engine **Overview** page), actionable remediation, and cross-project sharing without access to the consumer project.
- **Share findings** propagates findings to all target projects in the evaluation scope so resource owners can view them in their local consoles without direct IAM access to the consumer project.
- Console locations: the **Rule findings** tab in Workload Manager (filter by category, severity, or rule name) and the **Workload Manager findings** tile on the Compute Engine **Overview** page (click a severity count to drill down).
- Limitation: rule findings are only available at the project scope; viewing or aggregating at organization and folder levels is not supported.
- Limitation: if you disable **Share findings**, existing findings from earlier runs remain visible in target projects until their default time to live (TTL) retention period expires; later runs don't generate or share new findings with target projects.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation
- Source: https://docs.cloud.google.com/workload-manager/docs/about-rule-findings (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-rule-findings.md](./view-rule-findings.md)
- [create-evaluation.md](./create-evaluation.md)
- [about-evaluations.md](./about-evaluations.md)
