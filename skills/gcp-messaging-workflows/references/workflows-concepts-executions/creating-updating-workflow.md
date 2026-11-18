---
source: https://docs.cloud.google.com/workflows/docs/creating-updating-workflow
---

# Create, Update, List and Delete Workflows

A workflow definition (YAML or JSON in Workflows syntax) is deployed to make it available for execution; deploy also validates that the source is a valid workflow definition. You can manage workflows with the Google Cloud console, the gcloud CLI, or the Workflows API (the source recommends the Google-provided client libraries for `workflows.googleapis.com`).

## Signature / Usage

### Create a service account for the workflow

The service account is the workflow's identity. Create a dedicated one and grant it the roles needed to reach the target resources and to write logs.

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT
```

If the workflow invokes another workflow:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member "serviceAccount:SERVICE_ACCOUNT@PROJECT_ID.iam.gserviceaccount.com" \
   --role "roles/workflows.invoker"
```

To send logs to Cloud Logging:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
   --member "serviceAccount:SERVICE_ACCOUNT@PROJECT_ID.iam.gserviceaccount.com" \
   --role "roles/logging.logWriter"
```

### Create (deploy) a workflow

```bash
gcloud workflows deploy WORKFLOW_NAME \
    --location=LOCATION \
    --call-log-level=CALL_LOGGING_LEVEL \
    --description="DESCRIPTION" \
    --execution-history-level="EXECUTION_HISTORY_LEVEL" \
    --labels="LABEL_KEY=LABEL_VALUE" \
    --set-env-vars="ENV_KEY=ENV_VALUE" \
    --kms-key=ENCRYPT_KEY \
    --service-account=SERVICE_ACCOUNT@PROJECT_ID.iam.gserviceaccount.com \
    --source=YAML_OR_JSON_SOURCE_FILE
```

### Create through REST

`projects.locations.workflows.create` with the `workflowId` query parameter.

Adapted (not in the official docs): added the missing comma after `executionHistoryLevel` so the request body is valid JSON.

```json
{
  "name": "WORKFLOW_NAME",
  "description": "DESCRIPTION",
  "labels": {"LABEL_KEY":"LABEL_VALUE"},
  "serviceAccount": "SERVICE_ACCOUNT@PROJECT_ID.iam.gserviceaccount.com",
  "cryptoKeyName": "ENCRYPT_KEY",
  "callLogLevel": "CALL_LOGGING_LEVEL",
  "executionHistoryLevel": "EXECUTION_HISTORY_LEVEL",
  "userEnvVars": {"ENV_KEY":"ENV_VALUE"},
  "sourceContents": "SOURCE_CODE"
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://workflows.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/workflows?workflowId=WORKFLOW_NAME"
```

The response is an `Operation`; if `"done"` is `false` the operation is still in progress.

### List workflows

```bash
gcloud workflows list --location=LOCATION
```

REST: `projects.locations.workflows.list` (or `.get` for one workflow).

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://workflows.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/workflows"
```

### Update a workflow

Run `gcloud workflows deploy` with the flags to change (same command as create; only `WORKFLOW_NAME` is required). REST uses `projects.locations.workflows.patch` with an optional `updateMask`.

Adapted (not in the official docs): removed the quotation marks around `UPDATE_FIELDS` inside the quoted URL, which would end the shell string early.

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://workflows.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/workflows/WORKFLOW_NAME?updateMask=UPDATE_FIELDS"
```

### Delete a workflow

```bash
gcloud workflows delete WORKFLOW_NAME \
   --location=LOCATION
```

REST: `DELETE https://workflows.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/workflows/WORKFLOW_NAME`.

## Options / Props

### `gcloud workflows deploy` flags

| Flag | Description |
|------|-------------|
| `WORKFLOW_NAME` | Letters, numbers, underscores and hyphens; must start with a letter and end with a number or letter |
| `--location` | Required for create. On update optional if the `workflows/location` property is set; otherwise required |
| `--source` | Local YAML or JSON file; required on first deployment |
| `--service-account` | Workflow identity |
| `--call-log-level` | `none` (default; the workflow level applies unless the execution level is set), `log-errors-only`, `log-all-calls`, `log-none` |
| `--execution-history-level` | `none` (default), `execution-history-basic`, `execution-history-detailed` (adds in-scope variable values and expected iterations) |
| `--description` | Workflow description (REST: no longer than 1000 Unicode characters) |
| `--labels` | `KEY=VALUE` pairs; inherited by executions; a new label can take up to 10 minutes to take effect |
| `--set-env-vars` | User-defined environment variables `KEY=VALUE` |
| `--kms-key` | Cloud KMS key for data encryption, `projects/PROJECT_ID/locations/LOCATION/keyRings/RING_NAME/cryptoKeys/KEY_NAME` (not in the 593.0.0 help; see Notes); `--clear-kms-key` removes it |
| `--async` | Return without waiting for the operation |
| `--clear-env-vars`, `--env-vars-file`, `--remove-env-vars`, `--update-env-vars` | Other environment variable flags (help shows at most one of the clear / file / set / remove / update group) |

### REST fields

| Field | Values / notes |
|-------|----------------|
| `callLogLevel` | `CALL_LOG_LEVEL_UNSPECIFIED` (default), `LOG_ERRORS_ONLY`, `LOG_ALL_CALLS`, `LOG_NONE` |
| `executionHistoryLevel` | `EXECUTION_HISTORY_LEVEL_UNSPECIFIED` (default), `EXECUTION_HISTORY_BASIC`, `EXECUTION_HISTORY_DETAILED` |
| `cryptoKeyName` | `projects/PROJECT_ID/locations/LOCATION/keyRings/RING_NAME/cryptoKeys/KEY_NAME` (CMEK) |
| `userEnvVars` | Map of key/value strings |
| `sourceContents` | Workflow definition; escape new lines in YAML and quotation marks in JSON |
| `updateMask` | Comma-separated fields to update (for example `description,callLogLevel`); if omitted the entire workflow is updated |

### Permissions

| Action | Needs |
|--------|-------|
| Create a workflow with a service account | Create permission (for example Workflows Editor) and `iam.serviceAccounts.actAs` (for example Service Account User) on that account |
| Update only the source | `iam.serviceAccounts.actAs` on the existing service account |
| Update the service account (or source and service account) | `iam.serviceAccounts.actAs` on the new service account |

## Notes

- Dedicated service account: if you do not specify one, the workflow uses the default Compute Engine service account. The source states: "For production environments, Google strongly recommends creating a new service account and granting it one or more IAM roles that contain the minimum permissions required to access the resources orchestrated by your workflows."
- Service account names are 6 to 30 characters of lowercase alphanumerics and dashes and cannot be changed after creation.
- Updating does not affect in-progress executions; only later executions use the new configuration. You cannot change a workflow's name or location.
- A new revision (`revisionId`, for example `000001-27f`: a six-digit zero-padded counter plus a random three-character hex string) is created when the source, service account, encryption key, environment variables, call log level or execution history level changes; changing only the description or labels does not.
- Per the source, a Cloud KMS key for data encryption can be set at creation (`--kms-key=ENCRYPT_KEY`, the REST `cryptoKeyName` field, or the console CMEK option); `--clear-kms-key` removes the key, and removing a CMEK from the current revision makes later executions unencrypted by CMEK while existing revisions and executions keep their keys. The gcloud 593.0.0 help for `workflows deploy` (GA, beta and alpha) does not list `--kms-key` or `--clear-kms-key`, but the 593.0.0 argument parser accepts both (checked with a credential-less run), so they are kept as in the source. The REST field is `cryptoKeyName`.
- Corrected from the official docs: the source lists `EXECUTION_HISTORY_ADVANCED` for `executionHistoryLevel`; the Workflows API Discovery document defines `EXECUTION_HISTORY_DETAILED`.
- Corrected from the official docs: the source's request body had no comma between `"executionHistoryLevel": "EXECUTION_HISTORY_LEVEL"` and `"userEnvVars"`, and its update URL wrote `?updateMask="UPDATE_FIELDS"` inside a quoted string.
- Corrected from the official docs: the source writes the key format as `projects/PROJECT_NAME/locations/LOCATION/keyRings/RING_NAME/cryptoKeys/KEY_NAME`; the Workflows API Discovery document gives `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{cryptoKey}`, and resource names take the project ID, not the project name.
- `--set-env-vars` / `userEnvVars` are not recommended for secrets such as database credentials or API keys; store them separately from source code and environment variables, do not send them to logs, and read them with Secret Manager (https://docs.cloud.google.com/workflows/docs/use-secret-manager).
- Source: https://docs.cloud.google.com/workflows/docs/use-environment-variables (Managing secrets; retrieved 2026-11-18; CC BY 4.0)
- Irreversible: deleting a workflow also deletes its executions and cancels any active executions. Try it on a disposable project first.
- `projects add-iam-policy-binding` grants are project-level as in the source; grant only the roles the workflow needs.
- When listing, paging might be applied before or after filtering, so fewer results than `pageSize` can be returned.
- The source also shows Console, PowerShell and APIs Explorer forms.
- Source: https://docs.cloud.google.com/workflows/docs/creating-updating-workflow (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [executing-workflow.md](./executing-workflow.md)
- [best-practice.md](./best-practice.md)
