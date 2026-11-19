---
source: https://docs.cloud.google.com/workload-manager/docs/evaluate/view-rule-findings
---

# View Workload Manager rule findings

Preview. After you evaluate workloads, view and filter rule findings on the Workload Manager dashboard (**Rule findings** tab) to identify configuration risks, security vulnerabilities, and best practice deviations.

## Signature / Usage

Prerequisites: Workload Manager is enabled for the project, you have the required roles, and you have created and run at least one evaluation with **Share findings** enabled. The page has no code; the following request is the REST call that runs such an evaluation.

```bash
curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json; charset=utf-8" \
    -H "X-Goog-User-Project: CONSUMER_PROJECT_ID" \
    -d '{
      "executionId": "EXECUTION_ID"
    }' \
    "https://workloadmanager.googleapis.com/v1/projects/CONSUMER_PROJECT_ID/locations/LOCATION_ID/evaluations/EVALUATION_ID/executions:run"
```

## Options / Props

### Required roles (on your project)

| Role | ID | Permission |
|------|----|------------|
| Workload Manager Evaluation Viewer | `roles/workloadmanager.evaluationViewer` | `workloadmanager.findings.list` |
| Workload Manager Evaluation Administrator | `roles/workloadmanager.evaluationAdmin` | `workloadmanager.findings.list` |

### Filters

| Control | Description |
|---------|-------------|
| Category | Impact category: Reliability, Security, Performance, or Cost. |
| Severity | Critical, High, Medium, or Low. |
| Workload type | Workload type, such as SAP or Oracle. |
| Filter bar | Search by properties or keywords (for example rule names or resource names). |
| Reset filters | Clears all active filters. |

### Findings table columns

| Column | Description |
|--------|-------------|
| Rule name | The name of the evaluated best practice rule. |
| Category | The impact category of the rule finding. |
| Resource | The cloud resource that the rule evaluated. |
| Issues | The number of detected issues for the resource. |
| Severity | The severity level of the finding. |
| Evaluation ID | The name of the evaluation that generated the finding. |
| Source | The project that contains the evaluated resource. |

## Notes

- Roles apply on the project where you view findings; see the roles page for consumer and target projects.
- The source also shows Console click-paths only (no REST or gcloud for viewing findings).
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation
- Source: https://docs.cloud.google.com/workload-manager/docs/evaluate/view-rule-findings (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-rule-findings.md](./about-rule-findings.md)
- [create-evaluation.md](./create-evaluation.md)
