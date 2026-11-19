---
source: https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation
---

# Create and run a Workload Manager evaluation

Create and run automated evaluations that scan workloads against industry standards and Google Cloud best practices, using the Google Cloud console or the Workload Manager API, to detect configuration drift and architectural risks early.

## Signature / Usage

### Create an evaluation (REST)

Optional: list the available rule names for your workload type (`projects.locations.rules.list`).

```bash
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "X-Goog-User-Project: CONSUMER_PROJECT_ID" \
    "https://workloadmanager.googleapis.com/v1/projects/CONSUMER_PROJECT_ID/locations/LOCATION_ID/rules?evaluationType=EVALUATION_TYPE"
```

Create the evaluation (`projects.locations.evaluations.create`).

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

### Run an evaluation (REST)

Run on demand (`projects.locations.evaluations.executions.run`). The request returns a long-running `Operation`; check status or list results with `projects.locations.evaluations.executions.get` and `projects.locations.evaluations.executions.results.list`.

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

### Limits

| Limit | Value |
|-------|-------|
| Simultaneous evaluations | Up to 25 evaluations simultaneously every 1 hour per project. If a project has more than 25 evaluations, limit hourly evaluations to 25, or set the schedule to every 6 hours or less frequently. |

### Placeholders

| Name | Description |
|------|-------------|
| `CONSUMER_PROJECT_ID` | Project where you create and run the evaluation. |
| `LOCATION_ID` | A supported region, such as `us-central1`, where Workload Manager stores the evaluation. |
| `EVALUATION_ID` | Unique ID for the evaluation. |
| `EVALUATION_TYPE` | Workload evaluation type, such as `SAP`, `SQL_SERVER`, `MYSQL`, `REDIS`, `OPENSHIFT`, or `OTHER`. |
| `RULE_NAMES` | Comma-separated list of rule IDs to include. |
| `TARGET_PROJECT_ID` | Project ID or number of the target project that contains the resources. |
| `RESOURCE_ID_PATTERNS` | Optional patterns, such as `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance*`. |
| `LABEL_KEY` / `LABEL_VALUE` | Optional key-value label pairs to filter resources. |
| `SERVICE_ACCOUNT_EMAIL` | Optional service account email to filter Compute Engine instances. |
| `SCHEDULE` | Optional UTC cron expression for recurring runs, such as `0 */6 * * *` (every 6 hours). |
| `BQ_PROJECT_ID` / `BQ_DATASET_ID` | Optional project and regional BigQuery dataset for exporting results. |
| `EXECUTION_ID` | Optional unique ID for a run; omit to let Workload Manager generate one. |

### Workload types (console)

| Type | Condition |
|------|-----------|
| SAP, SQL Server, MySQL, Redis, OpenShift, Custom | **Custom** evaluates against Google Cloud best practices or custom rules stored in Cloud Storage. |

### Required roles

| Task | Role | Where |
|------|------|-------|
| Create and run an evaluation | `roles/workloadmanager.evaluationAdmin` | Consumer project |
| Create a service agent (first evaluation only) | `roles/resourcemanager.projectIamAdmin` | Consumer and target projects |
| Read Cloud Asset Inventory data (custom rules and best practices) | `roles/cloudasset.owner` | Consumer project |
| Read custom rules from a Cloud Storage bucket (optional) | `roles/storage.objectViewer` | Consumer project |
| Create alert notifications (optional) | `roles/monitoring.metricWriter` | Consumer project |
| Export results to BigQuery (optional) | `roles/bigquery.admin` | Consumer project |
| Share evaluation findings | `roles/workloadmanager.evaluationAdmin` | Consumer project and target project |

### Required permissions

| Task | Permissions |
|------|-------------|
| Create and run | `workloadmanager.evaluations.create`, `workloadmanager.evaluations.run` (consumer project) |
| Create a service agent | `resourcemanager.projects.setIamPolicy` (consumer and target projects) |
| Read Cloud Asset Inventory data | `cloudasset.assets.searchAllResources` (consumer project) |
| Read custom rules from a bucket | `storage.objects.get`, `storage.objects.list` (consumer project) |
| Alert notifications | `monitoring.timeSeries.create` (consumer project) |
| Export to BigQuery | `bigquery.datasets.get`, `bigquery.tables.create`, `bigquery.tables.updateData` (consumer project) |
| Share findings | `workloadmanager.evaluations.create`, `workloadmanager.evaluations.update` (consumer project); `workloadmanager.findings.create` (target project) |

## Notes

- Prerequisites: create the resources in the target project; enable the Workload Manager API in the consumer project, plus the Cloud Asset API and Cloud Monitoring API when evaluating against custom rules or best practices; set up the required agent or operator on all instances or clusters for SAP, SQL Server, MySQL, Redis, and OpenShift (Preview) workloads.
- With the API, you must manually create the Workload Manager service agent in the consumer project and grant it `roles/workloadmanager.serviceAgent` in the target projects, plus `roles/workloadmanager.worker` in the consumer project if you set a schedule. The console creates the service agent automatically.
- Console flow: **Name & rules** (workload type, rules table), **Scope & filters** (**Browse projects**, **Share findings**, filters: **Service account**, **Label**, **Name**; filters of the same type use `OR`, different types use `AND`; region for evaluation data), **Frequency & notification** (schedule, **Save to BigQuery dataset** to a regional dataset in the same region as the evaluation, optional **Create a new results table for this evaluation**, alert notifications), then **Review** and **Create**.
- Share evaluation findings is Preview. Enabling **Share findings** propagates findings to all target projects in the scope; disabling it stops propagation and findings remain visible only within the consumer project. Edit an existing evaluation (**Edit**, **Scope & filters**, **Share findings**, **Save**) to toggle it.
- Alert notifications can be added to an existing evaluation (**Edit**, **Notification**) for events such as new findings or a failed run.
- The Discovery document for `workloadmanager.v1` lists only `SAP`, `SQL_SERVER`, and `OTHER` for `evaluationType`; the source additionally lists `MYSQL`, `REDIS`, and `OPENSHIFT`. Values are kept as the source states them.
- Least privilege: `roles/resourcemanager.projectIamAdmin`, `roles/cloudasset.owner` and `roles/bigquery.admin` are broad roles; grant them only on the projects and for the tasks in the table above, and remove them when no longer needed.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-accounts.md](./service-accounts.md)
- [view-rule-findings.md](./view-rule-findings.md)
- [evaluate-using-custom-rules.md](./evaluate-using-custom-rules.md)
- [wlm-vpc-service-controls.md](./wlm-vpc-service-controls.md)
