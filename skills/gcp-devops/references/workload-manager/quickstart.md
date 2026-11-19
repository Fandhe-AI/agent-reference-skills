---
source: https://docs.cloud.google.com/workload-manager/docs/quickstart
---

# Workload Manager quickstart: create and run an evaluation

In the Google Cloud console, create and run a workload evaluation named `my-custom-evaluation` that checks workloads against Google Cloud best practices and, optionally, custom rules.

## Signature / Usage

### Before you begin

1. Create the Google Cloud resources you want to evaluate in the target project.
2. Enable the Workload Manager API, Cloud Asset API, and Cloud Monitoring API in the consumer project where you create and run the evaluation.
3. Optional: to include custom rules, upload a sample rule from the `GoogleCloudPlatform/workload-manager` GitHub repository to a Cloud Storage bucket whose top level contains the `/lib` and `/rules` folders.

### Create and run (console)

In **Name & rules**: set **Evaluation name** to `my-custom-evaluation`, **Workload type** to **Custom**, optionally pick the custom-rules bucket, and select rules from the **Rules table**. In **Scope & filters**: **Browse scopes**, optionally **Share findings**, filters (**Service account**, **Label**, **Name**), and **Regions** for evaluation data. In **Frequency & notification**: choose scheduling and optional notifications, then **Create**. To run on demand, open `my-custom-evaluation` and click **Run**; an evaluation takes a few minutes.

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

### Required roles

| Task | Role | Where |
|------|------|-------|
| Create and run an evaluation | Workload Manager Evaluation Administrator (`roles/workloadmanager.evaluationAdmin`) | Consumer project |
| Create a service agent (first evaluation only) | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) | Consumer and target projects |
| Read Cloud Asset Inventory data | Cloud Asset Owner (`roles/cloudasset.owner`) | Consumer project |
| Read custom rules from a Cloud Storage bucket (optional) | Storage Object Viewer (`roles/storage.objectViewer`) | Consumer project |

### Required permissions

| Task | Permissions |
|------|-------------|
| Create and run an evaluation | `workloadmanager.evaluations.create`, `workloadmanager.evaluations.run` (consumer project) |
| Create a service agent (first evaluation only) | `resourcemanager.projects.setIamPolicy` (consumer and target projects) |
| Read Cloud Asset Inventory data | `cloudasset.assets.searchAllResources` (consumer project) |
| Read custom rules from a bucket (optional) | `storage.objects.get`, `storage.objects.list` (consumer project) |

## Notes

- Filters: multiple filters within the same filter type use `OR` logic; filters across different filter types use `AND` logic.
- Clean up: you can delete `my-custom-evaluation` and the optional Cloud Storage bucket; deleting an evaluation doesn't affect your workloads. Try cleanup on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation (the REST equivalent of **Run**)
- Source: https://docs.cloud.google.com/workload-manager/docs/quickstart (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-evaluation.md](./create-evaluation.md)
- [rego-custom-rules.md](./rego-custom-rules.md)
- [service-accounts.md](./service-accounts.md)
