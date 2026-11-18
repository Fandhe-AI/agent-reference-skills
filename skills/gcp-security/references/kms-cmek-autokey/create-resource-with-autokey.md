---
source: https://docs.cloud.google.com/kms/docs/create-resource-with-autokey
---

# Create protected resources using Cloud KMS Autokey

How a developer creates CMEK-protected resources with keys created by Autokey: request a key by creating a `KeyHandle`, read the key name from the returned operation, then create the resource with that key. Covers Compute Engine, Cloud Storage, BigQuery, Secret Manager and Dataflow (REST flow shown once; the same two calls apply to every resource type).

## Signature / Usage

### Step 1: request a key (KeyHandle)

```bash
curl -H "Content-Type: application/json" \
    -H "X-Goog-User-Project: USER_PROJECT" \
    -H "Authorization: Bearer TOKEN" \
    -X POST https://cloudkms.googleapis.com/v1/projects/RESOURCE_PROJECT_ID/locations/LOCATION/keyHandles \
    -d '{"resource_type_selector": "RESOURCE_TYPE"}'
```

Output (note the `OPERATION_ID`):

```json
{
  "name": "projects/RESOURCE_PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.kms.v1.CreateKeyHandleMetadata"
  }
}
```

### Step 2: find the key

```bash
curl -H "X-Goog-User-Project: USER_PROJECT" \
    -H "Authorization: Bearer TOKEN" \
    -X GET https://cloudkms.googleapis.com/v1/projects/RESOURCE_PROJECT_ID/locations/LOCATION/operations/OPERATION_ID
```

```json
{
  "name": "projects/RESOURCE_PROJECT_ID/locations/LOCATION/operations/OPERATION_ID",
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.cloud.kms.v1.KeyHandle",
    "name": "projects/RESOURCE_PROJECT_ID/locations/LOCATION/keyHandles/KEY_HANDLE",
    "kmsKey": "projects/KEY_PROJECT_ID/locations/LOCATION/keyRings/autokey/cryptoKeys/KEY_NAME",
    "resourceTypeSelector": "RESOURCE_TYPE"
  }
}
```

`kmsKey` is the full resource ID of the key; use it like any other Cloud KMS key ID.

### Step 3: create the resource

Compute Engine disk (`RESOURCE_TYPE` `compute.googleapis.com/Disk`):

```bash
gcloud compute disks create DISK_NAME \
  --kms-key projects/KEY_PROJECT_ID/locations/LOCATION/keyRings/autokey/cryptoKeys/KEY_NAME
```

Cloud Storage bucket (`storage.googleapis.com/Bucket`):

```bash
gcloud storage buckets create gs://BUCKET_NAME \
    --location=LOCATION \
    --default-encryption-key=projects/KEY_PROJECT_ID/locations/LOCATION/keyRings/autokey/cryptoKeys/KEY_NAME
```

BigQuery dataset (`bigquery.googleapis.com/Dataset`):

```bash
bq --location=LOCATION mk \
    --dataset \
    --default_kms_key=projects/KEY_PROJECT_ID/locations/LOCATION/keyRings/autokey/cryptoKeys/KEY_NAME \
    --default_table_expiration=TABLE_EXPIRATION \
    --description="DATASET_DESCRIPTION" \
    RESOURCE_PROJECT_ID:DATASET_ID
```

Secret Manager secret (`secretmanager.googleapis.com/Secret`; REST or Terraform only; the key ring and key are in `global`):

```bash
gcloud secrets create "SECRET_ID" \
    --replication-policy "automatic" \
    --kms-key-name "projects/KEY_PROJECT_ID/locations/global/keyRings/autokey/cryptoKeys/KEY_NAME" \
    --project "RESOURCE_PROJECT_ID"
```

## Options / Props

### Request fields

| Name | Description |
|---|---|
| `USER_PROJECT` | Project billed for charges of the request (`X-Goog-User-Project`) |
| `RESOURCE_PROJECT_ID` | Resource project where Autokey is enabled and the protected resource is created |
| `LOCATION` | Location of the protected resource |
| `RESOURCE_TYPE` / `resource_type_selector` | Resource type, for example `compute.googleapis.com/Disk` |
| `OPERATION_ID` | Operation identifier from the KeyHandle request output |
| `KEY_PROJECT_ID` | Project where the key was created |
| `KEY_NAME` | Name of the key returned in step 2 |

### Per-service behavior

| Service | Behavior |
|---|---|
| Compute Engine | New key per disk, image, machine image (and VM instance) in the resource's location; none for snapshots (use the disk's key; the console applies it automatically, with gcloud, Terraform or API you must identify the disk's key) |
| Cloud Storage | New key in the bucket's location, assigned as bucket default key; none for objects (use bucket default or a manually created CMEK) |
| BigQuery | Check the BigQuery edition supports Cloud KMS; new key per dataset (dataset default key); none for tables, queries, temporary tables, models; for queries and temporary tables outside a dataset use a project default key per location |
| Secret Manager | One key protects all secrets in the same project and location; new secrets use the key's new primary version after rotation; Terraform or REST API only |
| Dataflow | One key per job; REST flow only (`resource_type_selector` `dataflow.googleapis.com/Job`) |

## Notes

- `CreateKeyHandle` requests can intermittently complete slowly or time out after 8 minutes; if timed out, retry.
- Before you begin: Autokey must be enabled on the project (https://docs.cloud.google.com/kms/docs/enable-autokey); you need permission to create the resource (no additional permission is needed to request keys).
- You can't delete `KeyHandle` resources. In Terraform create-and-destroy patterns, recreating a `KeyHandle` returns `ALREADY_EXISTS`; add an `import` block (`to = google_kms_key_handle.KEY_HANDLE`, `id = "projects/RESOURCE_PROJECT_ID/locations/LOCATION/keyHandles/KEY_HANDLE"`) before the resource block.
- Secret Manager: if a key handle already exists for the same project and location, the error returns the existing key handle's details; in REST skip step 2 and use the `existingKmsKey` field value; in Terraform keep only one block creating the key handle and reuse it.
- Source quirk: the BigQuery step text says the `--destination_kms_key` flag, but the command uses `--default_kms_key`; the command is kept as in the source.
- Source quirk: the Cloud Storage and BigQuery REST examples reuse the placeholder `RESOURCE_TYPE`; set it to the type shown in the table above.
- `gcloud compute disks create` takes the disk's zone from `--zone` or the `compute/zone` property; per the gcloud 593.0.0 help, if neither is set you might be prompted to select a zone (interactive mode only). The full flag list is in the `gcp-compute` skill.
- `TOKEN` is an OAuth access token; a real token on the command line lands in shell history and process lists, so don't paste or print it in shared terminals or CI logs. If the key becomes disabled or destroyed, data encrypted with it becomes inaccessible (irreversible for destruction); use disposable resources first.
- The source also shows Console and Terraform for each service; those forms are omitted here.
- Source: https://docs.cloud.google.com/kms/docs/create-resource-with-autokey (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [autokey-overview.md](./autokey-overview.md)
- [kms-autokey.md](./kms-autokey.md)
- [use-keys-google-cloud.md](./use-keys-google-cloud.md)
