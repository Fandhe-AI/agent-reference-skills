---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer
---

# Storage Transfer Service and Transfer Appliance

Copy-paste gcloud commands for Storage Transfer Service jobs, agent pools, agents and operations, plus mounting a Transfer Appliance NFS share.

## Signature / Usage

### Grant the permissions a transfer needs

```bash
gcloud transfer authorize
```

```bash
gcloud transfer authorize --add-missing
```

Authorize a user-managed service account instead of the logged-in user (pass its key file):

```bash
gcloud transfer authorize --add-missing --creds-file=path/to/key.json
```

Not recommended for production: with `--creds-file`, the service account in the key file receives the roles, so it becomes a key-holding service account with `roles/owner` (see Notes). Prefer granting the minimum roles from the agentless-transfer permissions page manually.

The first command only inspects and prints missing roles; `--add-missing` grants them.

### Create and run a transfer job

```bash
gcloud transfer jobs create \
  SOURCE DESTINATION
```

Cloud Storage to a file system:

```bash
gcloud transfer jobs create \
  gs://my-storage-bucket posix:///tmp/destination \
  --destination-agent-pool=my-destination-agent-pool
```

File system to file system (needs an intermediate bucket):

```bash
gcloud transfer jobs create \
  posix:///tmp/source/on/systemA posix:///tmp/destination/on/systemB \
  --source-agent-pool=source_agent_pool \
  --destination-agent-pool=destination_agent_pool \
  --intermediate-storage-path=gs://my-intermediary-bucket
```

```bash
gcloud transfer jobs run foo
```

### Jobs that delete data (no official example)

The create-transfers page lists `--delete-from=destination-if-unique|source-after-transfer` and `--do-not-run` for `gcloud transfer jobs create` but shows no command with them. See https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/create. `source-after-transfer` deletes source objects and `destination-if-unique` deletes destination objects missing from the source; neither is reversible without a backup.

### Monitor jobs and operations

```bash
gcloud transfer jobs list
```

```bash
gcloud transfer jobs list --job-statuses=disabled
```

```bash
gcloud transfer jobs describe JOB-NAME
```

```bash
gcloud transfer jobs monitor JOB-NAME
```

```bash
gcloud transfer jobs describe JOB-NAME \
    --format="json(latestOperationName)"
```

```bash
gcloud transfer operations describe OPERATION-NAME
```

```bash
gcloud transfer operations list --operation-statuses=failed
```

```bash
gcloud transfer operations monitor OPERATION-NAME
```

### Pause, resume and cancel an operation

```bash
gcloud transfer operations pause OPERATION-NAME
```

```bash
gcloud transfer operations resume OPERATION-NAME
```

```bash
gcloud transfer operations cancel OPERATION-NAME
```

### Agent pools

```bash
gcloud transfer agent-pools create my-pool \
  --display-name="daily backups" --bandwidth-limit=50
```

```bash
gcloud transfer agent-pools list
```

```bash
gcloud transfer agent-pools describe NAME
```

```bash
gcloud transfer agent-pools update foo --bandwidth-limit=100
```

> **Warning**: deleting an agent pool is destructive. Check for active operations first with the list command below, and try it on a disposable pool.

```bash
gcloud transfer operations list --format=yaml \
    --operation-statuses=in_progress
```

```bash
gcloud transfer agent-pools delete foo
```

### Install transfer agents

```bash
gcloud transfer agents install --pool=AGENT_POOL
```

```bash
gcloud transfer agents install --creds-file=/example/path.json \
    --pool=AGENT_POOL
```

### Delete a transfer job

> **Warning**: deleting a job is destructive. Try it on a disposable job first.

```bash
gcloud transfer jobs delete foo
```

### Mount a Transfer Appliance NFS share (Linux)

```bash
sudo mkdir /mnt/data
```

```bash
sudo mount -o vers=4 IP_ADDRESS:/mnt/ta_data /mnt/data
```

Copy data to the appliance over SSH instead:

```bash
scp PATH_TO_FILES USERNAME@IP_ADDRESS:/mnt/ta_data
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--source-agent-pool` | `jobs create` | Required when the source is a file system |
| `--destination-agent-pool` | `jobs create` | Required when the destination is a file system |
| `--intermediate-storage-path` | `jobs create` | Required between two file systems |
| `--bandwidth-limit` | `agent-pools create`, `update` | Bandwidth limit in MB/s |
| `--operation-statuses` | `operations list` | Filter by status such as `failed` or `in_progress` |

## Notes

- Commands from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- Destructive: `--delete-from` options delete source or destination objects, and `jobs delete` and `agent-pools delete` remove resources. Try them on disposable buckets and resources first.
- Transfers from Amazon S3, Azure, URL lists or Cloud Storage to Cloud Storage need no agents; file-system and S3-compatible transfers do. Do not put PII or security data in a job name.
- Prefer `https://` for URL list sources; plain `http://` is unauthenticated and unencrypted in transit.
- `gcloud transfer authorize --add-missing` grants broad roles (`roles/owner`, `roles/storagetransfer.admin`, `roles/storagetransfer.transferAgent`, `roles/storage.objectAdmin`, `roles/pubsub.editor`) to the user, or, with `--creds-file`, to that service account (a key-holding service account with project Owner), and `roles/storage.admin` to the service agent; the gcloud help says it "provides admin and owner rights for simplicity". A user-managed service account is not a safer alternative here. For least privilege, run `gcloud transfer authorize` without `--add-missing` to see what is missing and grant the minimum roles listed at https://docs.cloud.google.com/storage-transfer/docs/iam-cloud manually (Storage Transfer User or Admin plus `resourcemanager.projects.getIamPolicy` for the user; bucket-level Storage Legacy Bucket Writer / Reader and Storage Object Viewer for the service agent).
- The Transfer Appliance mount and `scp` commands come from the Transfer Appliance 4.0 guide. The gcloud reference also lists `gcloud alpha transfer appliances` commands (orders, list, describe, delete); they are not reproduced here.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/authorize (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/agent-pools (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/agents (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/operations (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage-transfer/docs/create-transfers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage-transfer/docs/iam-cloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [objects.md](./objects.md)
- [insights-batch.md](./insights-batch.md)
- Create transfers: https://docs.cloud.google.com/storage-transfer/docs/create-transfers
