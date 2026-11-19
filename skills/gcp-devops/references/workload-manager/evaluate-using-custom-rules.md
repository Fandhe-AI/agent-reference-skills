---
source: https://docs.cloud.google.com/workload-manager/docs/evaluate/custom-rules/evaluate-using-custom-rules
---

# Evaluate workloads using custom rules

Create and run a Workload Manager evaluation with workload type **Custom** that validates resources against the custom rules you uploaded to a Cloud Storage bucket.

## Signature / Usage

Steps in the console: **New evaluation**; in **Name & rules** set **Evaluation name** and **Workload type** to **Custom**, optionally select the Cloud Storage bucket with your custom rules (sample rules are in the `GoogleCloudPlatform/workload-manager` GitHub repository, or build and upload your own), and pick rules from the **Rules table**. In **Scope & filters** use **Browse scopes** (organizations, folders, or projects), optional resource filters, and **Regions** for evaluation data. In **Frequency & notification** optionally export to BigQuery, create a results table per evaluation, or add CMEK encryption keys per region. Then choose scheduling and notification channels, review, and **Create**. Run it from the **Evaluation information** page with **Run**.

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

### Before you begin

| Item | Detail |
|------|--------|
| Rules | Create custom rules using Rego and upload them to a Cloud Storage bucket. |
| APIs | Enable the Service Usage API and Cloud Monitoring API in the project where you create and run the evaluation. |
| Roles | See the required permissions to create and run an evaluation (the `create-evaluation.md` roles table). |

## Notes

- BigQuery export must go to a regional dataset in the same region you selected for evaluation data; multi-region datasets are not supported. If your organization uses a Resource Location Restriction policy, create the dataset in one of the allowed regions and Workload Manager supported regions.
- Optional CMEK: provide an encryption key for each region (see the source's "Enable customer-managed encryption keys for evaluations" page).
- Evaluations take a few minutes to complete and might not be completely real-time.
- The source's console steps list the scope and rule selection twice (in the first pane and again as separate **Evaluation scope** / **Evaluation rules** sections); both appear in the source.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation (the REST equivalent of **Run**; the source for this page shows only console steps)
- Source: https://docs.cloud.google.com/workload-manager/docs/evaluate/custom-rules/evaluate-using-custom-rules (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [rego-custom-rules.md](./rego-custom-rules.md)
- [about-custom-rules.md](./about-custom-rules.md)
- [create-evaluation.md](./create-evaluation.md)
