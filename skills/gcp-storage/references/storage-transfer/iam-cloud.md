---
source: https://docs.cloud.google.com/storage-transfer/docs/iam-cloud
---

# Permissions for agentless (cloud) transfers

Agentless transfers (within Cloud Storage, or from Amazon S3, Azure Blob Storage / Data Lake Storage Gen2, or public URL lists) need no agents. Permissions are granted to two principals: the user account creating or managing the transfer, and a Google-managed service agent created automatically the first time you use Storage Transfer Service.

## Signature / Usage

Inspect existing permissions and print missing roles:

```bash
gcloud transfer authorize
```

Apply the missing roles automatically:

```bash
gcloud transfer authorize --add-missing
```

Grant the roles to a user-managed service account instead of the user (pass its key file):

```bash
gcloud transfer authorize --add-missing --creds-file=path/to/key.json
```

Not recommended for production: with `--creds-file`, the service account itself receives `roles/owner` and the other broad roles listed below, so its key file becomes a project Owner credential. Prefer granting the minimum roles in the tables below manually.

With `--add-missing`, the command grants to the user / user-managed service account: `roles/owner`, `roles/storagetransfer.admin`, `roles/storagetransfer.transferAgent`, `roles/storage.objectAdmin`, `roles/pubsub.editor`. To the service agent: `roles/storage.admin`, `roles/storagetransfer.serviceAgent`.

## Options / Props

User account (or user-managed service account):

| Role / Permission | What it does |
|---|---|
| `resourcemanager.projects.getIamPolicy` | Confirms the service agent has the required permissions. Grant via Role Viewer (`roles/iam.roleViewer`) or a custom role with this single permission |
| Storage Transfer Admin (`roles/storagetransfer.admin`) | All operations, including deleting transfer jobs |
| Storage Transfer User (`roles/storagetransfer.user`) | Create, get, update and list transfers; cannot delete jobs |

Service agent (grant manually if not auto-assigned):

| Role | What it does | Where to grant |
|---|---|---|
| Storage Legacy Bucket Writer (`roles/storage.legacyBucketWriter`) | Read bucket metadata, list objects, write objects | Destination bucket (legacy roles are bucket-level only) |
| Storage Object Viewer (`roles/storage.objectViewer`) | Copy objects from a Cloud Storage source; check whether a destination object exists/changed | Source bucket; also destination bucket if overwrite is "when different" or never (not needed for overwrite always). The source says it may be granted at project level "if appropriate"; prefer bucket-level grants |
| Storage Legacy Bucket Reader (`roles/storage.legacyBucketReader`) | Read bucket metadata | Source bucket (bucket-level only) |

Cross-project Cloud Storage transfers: grant one service agent (from the project creating the transfer) on both buckets. Source bucket: `roles/storage.legacyBucketReader` and `roles/storage.objectViewer`. Destination bucket: `roles/storage.legacyBucketWriter`, plus `roles/storage.objectViewer` when overwriting when different or never. The user needs permissions only on the project creating the transfer.

## Notes

- The service agent is typically `project-PROJECT_NUMBER@storage-transfer-service.iam.gserviceaccount.com`, created on first job creation, `googleServiceAccounts.get`, or opening the console job-creation page. It is Google-managed: prefer bucket-level roles for it; never grant service-agent roles to your own workloads.
- Automatic role assignment: create the transfer in the console, or run `gcloud transfer authorize --add-missing` (it grants `roles/storage.admin` to the service agent; the command takes no bucket argument, so this is not a bucket-scoped grant — for least privilege grant the bucket-level roles in the service agent table instead).
- `gcloud transfer authorize --add-missing` grants `roles/owner` and other broad roles to the user, or, with `--creds-file`, to that service account (a key-holding service account with project Owner). The gcloud help says the command "provides admin and owner rights for simplicity". If too broad for your organization, grant the minimum roles in the tables above manually.
- The `--creds-file` form uses a service account key file; keys are long-lived credentials, so protect and rotate them (see the `gcp-foundation` skill for service accounts and Workload Identity Federation).
- You can delegate service agent permissions to a user-managed service account to separate bucket permissions per job: https://docs.cloud.google.com/storage-transfer/docs/delegate-service-agent-permissions
- Organization policy constraints such as `constraints/iam.allowedPolicyMemberDomains` and `constraints/iam.disableCrossProjectServiceAccountUsage` must be updated for cross-project transfers; VPC Service Controls may also need changes: https://docs.cloud.google.com/storage-transfer/docs/transfer-with-vpc-sc
- AWS S3 and Azure sources need their own access configuration (https://docs.cloud.google.com/storage-transfer/docs/source-amazon-s3, https://docs.cloud.google.com/storage-transfer/docs/source-microsoft-azure).
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/authorize (gcloud help; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage-transfer/docs/iam-cloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-transfers.md](./create-transfers.md)
- [sources-and-sinks.md](./sources-and-sinks.md)
