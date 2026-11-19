---
source: https://docs.cloud.google.com/bigquery/docs/enable-transfer-service
---

# Enable the BigQuery Data Transfer Service

Before creating transfers you create or select a project (billing enabled in most cases), enable the BigQuery API and the BigQuery Data Transfer API (requires the project Owner role), and grant the IAM roles needed to manage transfers. The service uses a service agent, created automatically after you enable the service and first use the API.

## Signature / Usage

### Cross-project service account authorization

If the transfer is authorized with a service account from a different project than the one with the Data Transfer Service enabled, grant `roles/iam.serviceAccountTokenCreator` to the service agent.

```bash
gcloud iam service-accounts add-iam-policy-binding service_account \
--member serviceAccount:service-project_number@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com \
--role roles/iam.serviceAccountTokenCreator
```

The console can't attach a cross-project service account. Use `bq update`.

Adapted (not in the official docs): added the missing `\` line continuations so the command runs as one command.

```bash
bq update \
--transfer_config \
--update_credentials \
--service_account_name="SERVICE_ACCOUNT" projects/PROJECT_ID/locations/LOCATION/transferConfigs/CONFIG_ID
```

### Grant the service agent role after manual creation

```bash
gcloud projects add-iam-policy-binding project_number \
--member serviceAccount:service-project_number@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com \
--role roles/bigquerydatatransfer.serviceAgent
```

### Grant `bigquery.admin` to a user or group

```bash
gcloud projects add-iam-policy-binding project_id \
--member principal:address \
--role roles/bigquery.admin
```

Output of the example (`--member group:group@example.com`):

```text
    bindings:
    - members:
      - group:group@example.com
        role: roles/bigquery.admin

```

## Options / Props

### Permissions included in `bigquery.admin` that matter for transfers

| Group | Permissions |
|---|---|
| Data Transfer Service | `bigquery.transfers.update`, `bigquery.transfers.get` |
| BigQuery | `bigquery.datasets.get`, `bigquery.datasets.getIamPolicy`, `bigquery.datasets.update`, `bigquery.datasets.setIamPolicy`, `bigquery.jobs.create` |

### Roles to select or create a project

| Action | Requirement |
|---|---|
| Select a project | No specific IAM role |
| Create a project | `roles/resourcemanager.projectCreator` (contains `resourcemanager.projects.create`) |

## Notes

- Programmatic enablement is asynchronous and subject to propagation delays (eventual consistency): retry with backoff delays between consecutive API calls.
- Billing must be enabled for all transfers (free transfers cost $0), once per project. BigQuery is automatically enabled in new projects; enable the BigQuery API in existing projects.
- Service agent: used to retrieve an access token for the service account, publish notifications to the Pub/Sub topic if enabled, start BigQuery jobs, and retrieve events from the Pub/Sub subscription for Cloud Storage event-driven transfers. When created automatically, Google grants the predefined service agent role (`roles/bigquerydatatransfer.serviceAgent`). Manual creation options: `services.GenerateServiceIdentity` API, `gcloud beta services identity create`, or the Terraform `google_project_service_identity`; in that case the role is not granted automatically.
- Warning: don't revoke the service agent role from the service agent; the Data Transfer Service stops working.
- Cross-project: when you enable the API through the console, Google tries to grant permissions; with Terraform, the gcloud CLI, or other programmatic methods you must grant them manually. Grant the role at the resource level (on the specific service account) rather than the project level to follow least privilege.
- Starting March 17, 2026, the Data Transfer Service requires the `bigquery.datasets.getIamPolicy` and `bigquery.datasets.setIamPolicy` permissions.
- Permissive grant: the source recommends `roles/bigquery.admin` for users who create transfers. It is a broad role (includes dataset and IAM-policy permissions); if too broad, create a custom IAM role with only the necessary permissions. Required permissions can differ per data source; see the "Required permissions" section of each data source guide.
- For external identity providers, replace `user:` / `group:` / `domain:` principals with Workforce Identity Federation principal identifiers.
- The source also shows Console steps for the project selector, API library, and IAM page.
- Source: https://docs.cloud.google.com/bigquery/docs/enable-transfer-service (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source's `bq update` example had no `\` continuations (`--transfer_config` and following flags on separate unjoined lines); they were added. The `gcloud` commands keep the source's lowercase placeholders (`service_account`, `project_number`, `project_id`, `principal:address`).
- IAM in general is in `gcp-foundation`.

## Related

- [dts-introduction.md](./dts-introduction.md)
- [scheduling-queries.md](./scheduling-queries.md)
