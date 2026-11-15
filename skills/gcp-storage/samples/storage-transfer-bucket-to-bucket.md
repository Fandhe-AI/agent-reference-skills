---
source: https://docs.cloud.google.com/storage-transfer/docs/create-transfers
---

# Create a Scheduled Storage Transfer Service Job

Create a Storage Transfer Service job with gcloud, and define a scheduled bucket-to-bucket job through the REST API.

## Signature / Usage

### gcloud: create a job

Creating a job starts the transfer unless a schedule or `--do-not-run` is given. Cloud Storage, Amazon S3, Azure and URL-list sources need no agents.

```bash
gcloud transfer jobs create \
  SOURCE DESTINATION
```

Source formats: `gs://BUCKET_NAME/FOLDER_PATH/`, `s3://BUCKET_NAME/FOLDER_PATH`, `https://myaccount.blob.core.windows.net/CONTAINER_NAME`, `posix:///PATH`.

### REST: scheduled bucket-to-bucket job

Request line (times in UTC):

```text
POST https://storagetransfer.googleapis.com/v1/transferJobs
```

Request body (from the create-transfers page):

Adapted (not in the official docs): moved the `POST` request line out of the `json` fence and removed `transferOptions` (`deleteObjectsFromSourceAfterTransfer: true`), which deletes source objects.

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
      }
  }
}
```

## Options / Props

| Flag | Description |
|---|---|
| `--schedule-starts`, `--schedule-repeats-every`, `--schedule-repeats-until` | Schedule (UTC) |
| `--do-not-run` | Create without running; add a schedule later or use `jobs run` |
| `--overwrite-when=different\|always\|never` | Overwrite destination files (`never` is listed in the gcloud help, not in the create-transfers page) |
| `--delete-from=destination-if-unique\|source-after-transfer` | Delete during or after transfer (destructive) |
| `--include-prefixes`, `--exclude-prefixes` | Object conditions |
| `--source-agent-pool`, `--destination-agent-pool`, `--intermediate-storage-path` | Needed for file-system transfers |

Roles for Cloud Storage to Cloud Storage transfers:

| Principal | Role |
|---|---|
| User or user-managed service account creating the job | Storage Transfer User (`roles/storagetransfer.user`: create, get, update, list; cannot delete jobs) or Storage Transfer Admin (`roles/storagetransfer.admin`: all operations), plus `resourcemanager.projects.getIamPolicy` (for example Role Viewer, `roles/iam.roleViewer`) |
| Storage Transfer Service service agent (`project-PROJECT_NUMBER@storage-transfer-service.iam.gserviceaccount.com`) | Storage Legacy Bucket Writer (`roles/storage.legacyBucketWriter`) on the destination bucket; Storage Object Viewer (`roles/storage.objectViewer`) and Storage Legacy Bucket Reader (`roles/storage.legacyBucketReader`) on the source bucket; Storage Object Viewer also on the destination unless the job always overwrites |

## Notes

- Destructive: `--delete-from=source-after-transfer` and `deleteObjectsFromSourceAfterTransfer: true` delete source objects, and `--delete-from=destination-if-unique` deletes destination objects. Try them on disposable buckets first.
- The request body sets no `scheduleEndDate`; the source says that leaving the end date blank runs the transfer continually, and the API `Schedule` schema says `repeatInterval` defaults to 24 hours, so this job copies every day until you disable or delete it. Create it on disposable buckets and delete the job after testing.
- `gcloud transfer authorize --add-missing` or creating the job in the console grants the service agent roles automatically. `--add-missing` grants the service agent `roles/storage.admin` (not a bucket-scoped grant) and grants the user `roles/owner` among other broad roles; for least privilege grant the bucket-level roles in the table above instead.
- Jobs can repeat as often as hourly. At most one operation is active per job; a run still in progress causes the next one to be skipped.
- The console shows local time but stores UTC; with the API or gcloud always use UTC.
- Do not put PII in a transfer job name.
- Adapted from the official docs: the request line `POST https://storagetransfer.googleapis.com/v1/transferJobs` was moved out of the `json` block, and the unrelated `transferOptions` (`deleteObjectsFromSourceAfterTransfer: true`) was removed from the create-transfers example.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage-transfer/docs/create-transfers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage-transfer/docs/schedule-transfer-jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage-transfer/docs/iam-cloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/jobs/create (`--overwrite-when` values; retrieved 2026-11-14)
- Source: https://storagetransfer.googleapis.com/$discovery/rest?version=v1 (`Schedule` schema; https://developers.google.com/discovery)

## Related

- [upload-large-files.md](./upload-large-files.md)
- https://docs.cloud.google.com/storage-transfer/docs/create-transfers
