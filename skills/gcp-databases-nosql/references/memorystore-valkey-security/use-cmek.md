---
source: https://docs.cloud.google.com/memorystore/docs/valkey/use-cmek
---

# Use customer-managed encryption keys (CMEK)

Workflow to create a Memorystore for Valkey instance protected by a Cloud KMS key: create a key ring and symmetric key, grant the service agent access, create the instance with `--kms-key`, and inspect it.

## Signature / Usage

Workflow: (1) create a key ring and key in the instance's region, (2) note `KEY_NAME`, location and `KEY_RING`, (3) grant the Memorystore service account access, (4) create the instance with CMEK in the same region. You need the Memorystore Admin role.

### Grant the service account access to the key

Service account format: `service-PROJECT_NUMBER@gcp-sa-memorystore.iam.gserviceaccount.com`.

```bash
gcloud kms keys add-iam-policy-binding  \
projects/PROJECT_ID/locations/REGION_ID/keyRings/KEY_RING/cryptoKeys/KEY_NAME \
--member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-memorystore.iam.gserviceaccount.com \
--role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```

### Create an instance that uses CMEK

Adapted (not in the official docs): `PROJECT_NAME` replaced with `PROJECT_ID` (gcloud takes a project ID, not a project name) and `SHARD_NUMBER` with `SHARD_COUNT`, matching the other Memorystore pages.

```bash
gcloud memorystore instances create INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' \
--kms-key=projects/PROJECT_ID/locations/REGION_ID/keyRings/KEY_RING/cryptoKeys/KEY_NAME \
--shard-count=SHARD_COUNT \
--persistence-config-mode=PERSISTENCE_CONFIG_MODE
```

### View key information

Check the `encryptionInfo` and `kmsKey` fields:

Adapted (not in the official docs): `--project=PROJECT_NAME` replaced with `--project=PROJECT_ID` (gcloud takes a project ID, not a project name).

```bash
gcloud memorystore instances describe INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID
```

## Options / Props

| Placeholder | Meaning |
|-------------|---------|
| PROJECT_ID | grant command: ID or number of the project that contains the key ring; create / describe: ID of the instance project |
| PROJECT_NUMBER | project number of the project that contains the service account |
| `--persistence-config-mode` | `aof` (Append-Only File), `rdb` (RDB snapshots), `disabled` |
| SHARD_COUNT | number of shards |

## Notes

- CMEK is for new instances only; creation takes several minutes. The key must use a symmetric encryption algorithm and be in the same region as the instance (it may be in another project).
- Key lifecycle behavior (disable, destroy, rotate, restore) is described in the CMEK concept page; disabling or destroying the primary key version affects backups and persistence and puts the instance out of SLA. Use Cloud KMS docs for enabling, disabling, destroying and restoring key versions; destroying is irreversible, so try it on a disposable key first.
- Corrected from the official docs: the create and describe examples use `--project=PROJECT_NAME`, `projects/PROJECT_NAME/...` and `--shard-count=SHARD_NUMBER`; the grant command uses `PROJECT_ID`. The key may be in another project than the instance; adjust the `--kms-key` path project accordingly.
- The source also shows no Console steps for instance creation. Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`). IAM roles and service agents: `gcp-foundation`.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/use-cmek (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-cmek.md](./about-cmek.md)
- [security-overview.md](./security-overview.md)
