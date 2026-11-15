---
source: https://docs.cloud.google.com/storage-transfer/docs/schedule-transfer-jobs
---

# Schedule transfer jobs

Transfer jobs can run periodically, as frequently as every hour. Each run is an incremental transfer at the frequency you specify, with results recorded in the Google Cloud console.

## Signature / Usage

Schedule flags for `gcloud transfer jobs create` are `--schedule-starts`, `--schedule-repeats-every` and `--schedule-repeats-until`; `--do-not-run` creates the job without running it. In the REST API the schedule is the `schedule` object (times in UTC):

Request line:

```text
POST https://storagetransfer.googleapis.com/v1/transferJobs
```

Request body:

Adapted (not in the official docs): moved the `POST https://storagetransfer.googleapis.com/v1/transferJobs` request line out of the JSON fence, and removed the `transferOptions` object (`deleteObjectsFromSourceAfterTransfer: true`), which is unrelated to scheduling and deletes source objects.

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

Interval periods: Hours, Days, Weeks. First transfer can start now or at a future time.

| Scenario | Schedule editor configuration |
|---|---|
| Copy data every night at midnight, forever | Run every day; Starting on tonight at midnight; End date None |
| Copy data every hour, starting now | Run with custom frequency; Starting now; End date None; Repeat every 1 Hours |
| Copy data every Tuesday at 3PM, starting in 2 weeks and stopping on April 3, 2030 | Run every week; Starting on Tuesday 3:00PM, 2 weeks from now; End date April 3, 2030 |

## Notes

- Timezones: the console shows schedules in your local timezone but stores UTC; DST changes may shift the schedule. With the API or gcloud CLI, specify time in UTC.
- Overlapping runs: at most one operation can be active per job. If a run is in progress when the next is due, that run is skipped.
- Pausing or deactivating a job stops the schedule from triggering new operations until the job is resumed or re-activated.
- You can re-run a job with the same configuration; a re-run runs only once.
- A job scheduled to start now may appear to start in the past when monitored; this is normal.
- Adapted from the official docs: the borrowed bucket-to-bucket example has the request line `POST https://storagetransfer.googleapis.com/v1/transferJobs` inside the `json` block and ends `transferSpec` with `"transferOptions": { "deleteObjectsFromSourceAfterTransfer": true }`; the option deletes source objects after transfer and is not needed to show a schedule.
- Snippet taken from https://docs.cloud.google.com/storage-transfer/docs/create-transfers.
- Source: https://docs.cloud.google.com/storage-transfer/docs/schedule-transfer-jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage-transfer/docs/create-transfers (snippet; retrieved 2026-11-15)

## Related

- [create-transfers.md](./create-transfers.md)
- [quotas.md](./quotas.md)
