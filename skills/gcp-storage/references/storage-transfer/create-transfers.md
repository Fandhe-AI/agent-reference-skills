---
source: https://docs.cloud.google.com/storage-transfer/docs/create-transfers
---

# Create transfers

Create and start Storage Transfer Service jobs with the console, `gcloud transfer jobs create`, or the REST API. Creating a job starts the transfer unless a schedule or `--do-not-run` is specified.

## Signature / Usage

### Before you begin

Transfers from Amazon S3, Azure, URL lists, or Cloud Storage to Cloud Storage do not require agents or agent pools. Transfers whose source and/or destination is a file system, or from S3-compatible storage, do (see https://docs.cloud.google.com/storage-transfer/docs/on-prem-agent-pools). Configure user permissions, agent-based project-level permissions and source/destination access first (see [iam-cloud.md](./iam-cloud.md)); install the gcloud CLI for the commands below.

### gcloud: create a job

```bash
gcloud transfer jobs create \
  SOURCE DESTINATION
```

### Cloud Storage to file system

```bash
gcloud transfer jobs create \
  gs://my-storage-bucket posix:///tmp/destination \
  --destination-agent-pool=my-destination-agent-pool
```

### File system to file system

Requires a source agent pool, a destination agent pool and an intermediate Cloud Storage bucket:

```bash
gcloud transfer jobs create \
  posix:///tmp/source/on/systemA posix:///tmp/destination/on/systemB \
  --source-agent-pool=source_agent_pool \
  --destination-agent-pool=destination_agent_pool \
  --intermediate-storage-path=gs://my-intermediary-bucket
```

### REST: Cloud Storage bucket to bucket

Times must be in UTC. The source frames this example as moving files: `transferOptions.deleteObjectsFromSourceAfterTransfer: true` deletes source objects after transfer.

Request line:

```text
POST https://storagetransfer.googleapis.com/v1/transferJobs
```

Request body:

Adapted (not in the official docs): moved the `POST https://storagetransfer.googleapis.com/v1/transferJobs` request line out of the JSON fence so the body is valid JSON.

```json
{
  "description": "YOUR DESCRIPTION",
  "status": "ENABLED",
  "projectId": "PROJECT_ID",
  "schedule": {
      "scheduleStartDate": {
          "day": 1,
          "month": 1,
          "year": 2015
      },
      "startTimeOfDay": {
          "hours": 1,
          "minutes": 1
      }
  },
  "transferSpec": {
      "gcsDataSource": {
          "bucketName": "GCS_SOURCE_NAME"
      },
      "gcsDataSink": {
          "bucketName": "GCS_SINK_NAME"
      },
      "transferOptions": {
          "deleteObjectsFromSourceAfterTransfer": true
      }
  }
}
```

### Source and destination paths

The source path is the root of the transfer and is stripped from object names; the destination path is prepended to object names (for file systems it is the target folder). Example: source `bucketA` path `alpha/` to destination `bucketB` path `bravo/` moves `gs://bucketA/alpha/object` to `gs://bucketB/bravo/object`. Destination path only `alpha/`: `object.txt` becomes `bucketB/alpha/object.txt`. Specify paths in the console "Bucket or folder" field, as part of the gcloud URI (`gs://BUCKET/PATH/`), or as a `path` field (`rootDirectory` for file systems) in the `TransferSpec` data source.

## Options / Props

`SOURCE` formats:

| Source | Format |
|---|---|
| Cloud Storage | `gs://BUCKET_NAME` or `gs://BUCKET_NAME/FOLDER_PATH/` (trailing slash) |
| Amazon S3 | `s3://BUCKET_NAME/FOLDER_PATH` |
| S3-compatible storage | `s3://BUCKET_NAME` (relative to endpoint; data at `https://us-east-1.example.com/folder1/bucket_a` is `s3://folder1/bucket_a`) |
| Microsoft Azure Storage | `https://myaccount.blob.core.windows.net/CONTAINER_NAME` |
| URL list | `https://PATH_TO_URL_LIST` or `http://PATH_TO_URL_LIST` |
| POSIX file system | `posix:///PATH` (absolute path from the root of the agent host) |
| HDFS | `hdfs:///PATH` |

`DESTINATION` formats: Cloud Storage `gs://BUCKET_NAME` or `gs://BUCKET_NAME/FOLDER_PATH/`; POSIX `posix:///PATH` (the agent tries to create a missing path; it needs write permission in the parent directory).

| Flag | Description |
|---|---|
| `--source-agent-pool` | Source agent pool. Required for transfers originating from a file system |
| `--destination-agent-pool` | Destination agent pool. Required for transfers to a file system |
| `--intermediate-storage-path` | `gs://my-intermediary-bucket`. Required for transfers between two file systems |
| `--source-creds-file` | Relative path to a local file with AWS or Azure credentials (format in the `TransferSpec` reference) |
| `--do-not-run` | Do not run on submission; add a schedule via update or use `jobs run` |
| `--manifest-file` | CSV file in Cloud Storage listing files to transfer |
| `--name`, `--description` | Job information. `--name` is not supported for cross-bucket replication jobs |
| `--schedule-starts`, `--schedule-repeats-every`, `--schedule-repeats-until` | Schedule |
| `--include-prefixes`, `--exclude-prefixes`, `--include-modified-[before \| after]-[absolute \| relative]` | Object conditions (relative to a source folder); not supported for transfers involving file systems |
| `--overwrite-when=different\|always\|never` | Overwrite destination files |
| `--delete-from=destination-if-unique\|source-after-transfer` | Delete files during/after the transfer |
| `--preserve-metadata` | Which metadata values to preserve |
| `--custom-storage-class` | Storage class on transferred objects |
| `--notification-pubsub-topic`, `--notification-event-types`, `--notification-payload-format` | Pub/Sub notifications |
| `--log-actions`, `--log-action-states` | Cloud Logging for agentless or S3-compatible transfers |

S3-compatible source flags:

| Flag | Description |
|---|---|
| `--source-endpoint` | Required. Endpoint such as `s3.example.com`; no `http://` / `https://` |
| `--source-signing-region` | Signing region; omit if not required |
| `--source-auth-method` | `AWS_SIGNATURE_V2` or `AWS_SIGNATURE_V4` |
| `--source-request-model` | `PATH_STYLE` or `VIRTUAL_HOSTED_STYLE` |
| `--source-network-protocol` | `HTTP` or `HTTPS` |
| `--source-list-api` | `LIST_OBJECTS` or `LIST_OBJECTS_V2` |

Console "When to overwrite": **If different** (different ETag or checksum) or **Always**. "When to delete": **Never**; **Delete file from source after they're transferred** (a source file not transferred, e.g. already at the destination, is not deleted); **Delete files from destination if they're not also at source** (destination exactly matches source).

## Notes

- `--overwrite-when`: this page's prose lists `different` and `always`; the gcloud help (`gcloud transfer jobs create`) says "OVERWRITE_WHEN must be one of: always, different, never" (`never` never overwrites a destination file with the same name).
- Do not put PII or security data in a transfer job name; resource names may propagate to other resources and Google-internal systems.
- Destructive: `--delete-from=source-after-transfer` / `deleteObjectsFromSourceAfterTransfer: true` delete source objects (source says it is non-reversible without a local backup), and `--delete-from=destination-if-unique` deletes destination objects missing from the source. Try them on disposable buckets first.
- Console schedules are shown in local time but stored in UTC; DST can shift them. Console options also cover manifest files, managed folders, logging, Pub/Sub notifications and delegating to a user-managed service account (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`).
- Azure SAS: the default SAS expiration is 8 hours; create tokens from stored access policies (basic SAS tokens cannot be revoked); do not add an IP restriction. Supported Azure regions are listed in the source.
- The source also shows Console steps, Amazon S3 / HDFS / file-system pointers, Azure REST examples and Go / Java / Node.js / Python client-library samples. The Azure REST sample in the source is not valid JSON (missing comma after `"day": 14`), so it is omitted here.
- Cloud Storage is Google Cloud's object storage — distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Adapted from the official docs: the source puts the request line `POST https://storagetransfer.googleapis.com/v1/transferJobs` inside the `json` block, above the body.
- Prefer `https://` for the URL list (and for the URLs it contains); plain `http://` is supported but unauthenticated and unencrypted in transit.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/create (`--overwrite-when` values; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage-transfer/docs/create-transfers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [iam-cloud.md](./iam-cloud.md)
- [sources-and-sinks.md](./sources-and-sinks.md)
- [schedule-transfer-jobs.md](./schedule-transfer-jobs.md)
- [metadata-preservation.md](./metadata-preservation.md)
