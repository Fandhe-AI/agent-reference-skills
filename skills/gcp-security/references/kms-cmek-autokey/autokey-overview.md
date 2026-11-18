---
source: https://docs.cloud.google.com/kms/docs/autokey-overview
---

# Autokey overview

Cloud KMS Autokey automates provisioning and assignment of customer-managed encryption keys (CMEK): key rings and keys are generated on demand, and the service agents that use them are created and granted IAM roles when needed. It is the recommended choice if the keys Autokey creates meet all your requirements. Available in all Google Cloud locations where Cloud HSM is available; no additional cost (keys are priced like other Cloud HSM keys, see https://docs.cloud.google.com/kms/pricing).

## Signature / Usage

### Developer requests a key (KeyHandle)

The request a developer sends during resource creation:

```bash
curl -H "Content-Type: application/json" \
    -H "X-Goog-User-Project: USER_PROJECT" \
    -H "Authorization: Bearer TOKEN" \
    -X POST https://cloudkms.googleapis.com/v1/projects/RESOURCE_PROJECT_ID/locations/LOCATION/keyHandles \
    -d '{"resource_type_selector": "RESOURCE_TYPE"}'
```

## Options / Props

### Participants

| Participant | Role |
|---|---|
| Administrator | Manages security at folder or organization level; an IaC pipeline with elevated permissions can act as administrator |
| Developer | Creates resources with Autokey; IaC pipelines can act as developer |
| Cloud KMS administrator | Manages Cloud KMS resources; fewer responsibilities with Autokey |
| Cloud KMS service agent | Service agent in the key project; needs elevated privileges to create keys and key rings and set IAM policy on keys, granting encrypt/decrypt to each resource service agent |
| Resource service agent | Service agent for a service in a resource project; needs encrypt/decrypt on the key; Autokey creates it and grants permissions |

### Attributes of keys created by Autokey

| Attribute | Value |
|---|---|
| Protection level | HSM |
| Algorithm | AES-256 GCM |
| Rotation period | One year (a Cloud KMS administrator can edit it after creation) |
| Location | Same location as the resource; where Cloud HSM is unavailable, create the CMEK manually |
| Key version state | Primary version, enabled |
| Key ring name | `autokey` (created at the first key request in a location; in the key project for dedicated-project storage, in the resource project for same-project storage) |
| Key name | `PROJECT_NUMBER-SERVICE_SHORT_NAME-RESOURCE_TYPE_DESCRIPTOR_NAME-RANDOM_HEX` |
| Export | Keys can't be exported |
| Key tracking | Tracked in the Cloud KMS dashboard |
| Separation of duties | Service account gets encrypt/decrypt; Cloud KMS administrators can view, update, enable, disable, destroy keys but get no encrypt/decrypt; developers can only request key creation and assignment |

### Controlling Autokey usage

| Control | Inheritance |
|---|---|
| Autokey configuration (folders or projects) | Inherited, can be overridden at a lower level (project config takes precedence over folder) |
| IAM role grants and deny policies (org, folder, project) | Deny policies on a parent can't be overridden at a lower level |
| Custom organization policy constraints | Inherited, can be overridden by policies enforced at a lower level |

### Compatible services and key granularity

| Service | Protected resources | Key granularity |
|---|---|---|
| AlloyDB for PostgreSQL | `alloydb.googleapis.com/Cluster`, `alloydb.googleapis.com/Backup` (Terraform or REST API only) | One key per resource |
| Apigee | `apigee.googleapis.com/Organization`, `apigee.googleapis.com/Instance` (Terraform or REST API only) | One key per resource |
| Apigee API hub | `apihub.googleapis.com/ApiHubInstance` (Terraform or REST API only) | One key per resource |
| Artifact Registry | `artifactregistry.googleapis.com/Repository` (keys created at repository creation, used for all stored artifacts) | One key per resource |
| Backup and DR Service | `backupdr.googleapis.com/BackupVault` | One key per resource |
| Backup for GKE | `gkebackup.googleapis.com/BackupPlan` (Terraform or REST API only) | One key per resource |
| BigQuery | `bigquery.googleapis.com/Dataset` (default key for datasets; tables, models, queries, temporary tables use the dataset default key; no keys for other BigQuery resources, create project or organization default keys for them) | One key per resource |
| Bigtable | `bigtableadmin.googleapis.com/Cluster` (clusters only; Terraform or Google Cloud SDK only) | One key per cluster |
| Cloud Run | `run.googleapis.com/Service`, `run.googleapis.com/Job` | One key per location within a project |
| Cloud SQL | `sqladmin.googleapis.com/Instance` (no keys for `BackupRun`; backups use the primary instance's key; Terraform or REST API only) | One key per resource |
| Cloud Storage | `storage.googleapis.com/Bucket` (objects use the bucket default key; no keys for `storage.object`) | One key per bucket |
| Compute Engine | `compute.googleapis.com/Disk`, `Image`, `Instance`, `MachineImage` (snapshots use the disk's key; no keys for `compute.snapshot`) | One key per resource |
| Google Kubernetes Engine | `container.googleapis.com/Cluster` (Terraform or REST API only) | One key per cluster |
| Dataflow | `dataflow.googleapis.com/Job` | One key per resource |
| Datastream | `datastream.googleapis.com/Stream` (Terraform or REST API only) | One key per resource |
| Document AI | `documentai.googleapis.com/Processor` (key in the same location as the processor, except multi-regions: `us-central1` for `us`, `europe-west4` for `eu`; for a multi-region processor create the key handle in the corresponding region) | One key per resource |
| Managed Service for Apache Airflow | `composer.googleapis.com/Environment` | One key per resource |
| Managed Service for Apache Spark | `dataproc.googleapis.com/Cluster`, `SessionTemplate`, `WorkflowTemplate`, `Batch`, `Session` | Cluster, SessionTemplate, WorkflowTemplate: one key per resource; Batch, Session: one key per location within a project |
| Memorystore for Redis | `redis.googleapis.com/Instance`, `redis.googleapis.com/Cluster` (Terraform or REST API only) | One key per resource |
| Memorystore for Valkey | `memorystore.googleapis.com/Instance` (Terraform or REST API only) | One key per resource |
| Migrate to Virtual Machines | `vmmigration.googleapis.com/MigratingVm`, `vmmigration.googleapis.com/Source` (Terraform or REST API only) | One key per resource |
| Pub/Sub | `pubsub.googleapis.com/Topic` | One key per resource |
| Secret Manager | `secretmanager.googleapis.com/Secret` (Terraform or REST API only) | One key per location within a project |
| Secure Source Manager | `securesourcemanager.googleapis.com/Instance` | One key per resource |
| Spanner | `spanner.googleapis.com/Database` (Terraform or REST API only) | One key per resource |
| Filestore | `file.googleapis.com/Instance`, `file.googleapis.com/Backup` | One key per resource |
| Workflows | `workflows.googleapis.com/Workflow` (Terraform or REST API only) | One key per resource |

## Notes

- Key storage models: dedicated-project key storage (formerly centralized key management) requires an organization resource containing a folder; you enable Autokey on the folder and designate one key project. Same-project key storage (formerly delegated key management) is enabled on a project or folder, and the Cloud KMS API must be enabled on those projects; the Cloud KMS service agent is created when needed.
- Dedicated-project one-time setup: enable Autokey on the folder and identify the key project; create the Cloud KMS service agent and grant it key creation and assignment privileges. Full steps: https://docs.cloud.google.com/kms/docs/enable-autokey.
- Developer flow: the Autokey service agent creates the key ring (unless it exists), the key at the right granularity (unless it exists), the per-project per-service service account (unless it exists), grants it encrypt/decrypt on the key, then returns the key details so the resource can be created.
- Request permissions are minimal and included in default roles that grant resource creation, so developers and IaC pipelines don't need elevated privileges.
- You can use manual Cloud KMS keys alongside Autokey keys; if you need a protection level other than `HSM` or a custom rotation period, use CMEK without Autokey (see kms-autokey.md).
- The `TOKEN` in the curl example is an OAuth access token; a real token on the command line lands in shell history and process lists, so don't paste or print it in shared terminals or CI logs.
- Autokey keys are CMEKs: disabling or destroying one makes the data it protects inaccessible (destruction is irreversible after the scheduled for destruction period). Try it on a disposable resource first.
- Source: https://docs.cloud.google.com/kms/docs/autokey-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kms/docs/create-resource-with-autokey.

## Related

- [kms-autokey.md](./kms-autokey.md)
- [create-resource-with-autokey.md](./create-resource-with-autokey.md)
- [cmek.md](./cmek.md)
- [cmek-recommended-practices.md](./cmek-recommended-practices.md)
