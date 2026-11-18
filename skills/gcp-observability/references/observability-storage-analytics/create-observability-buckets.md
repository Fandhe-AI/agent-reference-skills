---
source: https://docs.cloud.google.com/stackdriver/docs/observability/create-observability-buckets
---

# Create and list observability buckets

Manually create the `_Trace` observability bucket to customize its storage location and CMEK settings before the project receives trace data. If trace data arrives first, the bucket is provisioned automatically from the project's default settings for observability buckets.

## Signature / Usage

### Prepare a Cloud KMS key (optional)

Required only if you want to specify a Cloud KMS key. Create a key ring and key in the same location as the bucket, then run the following; it checks the default storage location and creates the Google Cloud Observability service account if it doesn't exist (the response lists its ID).

```bash
gcloud observability settings describe \
--location=global --project=PROJECT_ID
```

Grant the Cloud KMS CryptoKey Encrypter/Decrypter role to the Google Cloud Observability service account, on the key.

```bash
gcloud kms keys add-iam-policy-binding \
--project=KMS_PROJECT_ID \
--member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-observability.iam.gserviceaccount.com \
--role=roles/cloudkms.cryptoKeyEncrypterDecrypter \
--location=KMS_KEY_LOCATION \
--keyring=KMS_KEY_RING \
KMS_KEY_NAME
```

### Create an observability bucket (gcloud 586.0.0 or later)

```bash
gcloud observability buckets create BUCKET_ID \
 --location=LOCATION --project=PROJECT_ID
```

The command starts a long-running operation and blocks until it completes. Example output:

```text
Create request issued for: [_Trace]
Waiting for operation [projects/my-project/locations/us/operations/operation-1775164903749-64e80c9817833-9ff804b6-c3e9cbe7] to complete...done.
Created bucket [_Trace].
```

### List observability buckets

Set `LOCATION` to `-` to list buckets in all locations.

```bash
gcloud observability buckets list \
 --location=LOCATION --project=PROJECT_ID
```

```text
---
createTime: '2026-01-21T21:39:22.381083860Z'
description: Bucket for storing spans from Cloud Trace.
name: projects/my-project/locations/us/buckets/_Trace
```

### REST

Create: `projects.locations.buckets.create` with parent `projects/PROJECT_ID/locations/LOCATION`; body is a `Bucket` with `name` set to the value below, optional `displayName`, `description` and a CMEK. The response is an `Operation`; poll `projects.locations.operations.get` until `Operation.done` is `true` and check the other fields for success or failure.

```text
projects/PROJECT_ID/locations/LOCATION/buckets/_Trace
```

List: `projects.locations.buckets.list` with the same parent form. Sample response:

```json
{
  "buckets": [
    {
      "name": "projects/my-project/locations/us/buckets/_Trace",
      "description": "Trace Bucket",
      "createTime": "2025-01-01T15:42:30.988919645Z",
      "updateTime": "2025-02-04T15:42:30.988919645Z",
      "retentionDays": 30
    }
  ]
}
```

## Options / Props

### Limitations

| Item | Limit |
|---|---|
| Location | Must be a supported observability bucket location; required on create. |
| `BUCKET_ID` | Must be `_Trace`. |
| Display name | At most 100 encoded bytes. |
| Description | At most 1000 encoded bytes. |
| Retention | 30 days; omit the retention period or set it to `30`. |
| Cloud KMS key | Key location must exactly match the parent location of the observability bucket. |
| Parent | Observability buckets can only be created in Google Cloud projects. |
| Count | At most one bucket named `_Trace` per project. |

### Required role

| Role | Grant on | Purpose |
|---|---|---|
| Observability Editor (`roles/observability.editor`) | Project | Create observability buckets. |
| Cloud KMS CryptoKey Encrypter/Decrypter (`roles/cloudkms.cryptoKeyEncrypterDecrypter`) | The key | Granted to the Observability service account to use a CMEK. |

## Notes

- The create request is checked against organization policies; for example it fails if you specify a location restricted by a resource-locations policy.
- You must specify a location. The Cloud KMS key from the default settings is applied unless the create request names a different key. You can't create a bucket with Google-default encryption if the applicable default settings specify a Cloud KMS key; remove the key from the default settings first.
- Enabling the Cloud KMS API needs `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- The KMS binding is granted on the key to the Observability service agent only (as the source shows), not at project level.
- Source inconsistency: the sample list response is copied as written, but its `retentionDays` field is not a field of `Bucket` in the Observability API (`observability.v1`) Discovery document, whose `Bucket` has `name`, `displayName`, `description`, `createTime`, `updateTime`, `deleteTime`, `purgeTime` and `cmekSettings`.
- The source also shows Windows PowerShell / cmd.exe forms, Console setup and Terraform (`google_observability_bucket`); Terraform can't list buckets. Omitted here.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/create-observability-buckets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [storage-overview.md](./storage-overview.md)
- [cmek.md](./cmek.md)
