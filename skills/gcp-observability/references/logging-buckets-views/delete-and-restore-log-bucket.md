---
source: https://docs.cloud.google.com/logging/docs/buckets
---

# Delete and restore a log bucket

Delete an unlocked log bucket, which moves it to the `DELETE_REQUESTED` state for 7 days, or restore (undelete) a bucket that is pending deletion.

## Signature / Usage

### Delete a bucket

```bash
gcloud logging buckets delete BUCKET_ID --location=LOCATION
```

REST: `projects.locations.buckets.delete`.

### Restore a bucket pending deletion

```bash
gcloud logging buckets undelete BUCKET_ID --location=LOCATION
```

REST: `projects.locations.buckets.undelete`.

## Options / Props

| Condition | Behavior |
|-----------|----------|
| Locked bucket | Can't be deleted. To delete a locked user-defined bucket, wait until all entries have fulfilled the bucket's retention period and then contact Cloud Customer Care. |
| Bucket has one or more links | Can't be deleted. List links with `gcloud logging links list`; delete with `gcloud logging links delete` (deleting a link also deletes associated artifacts, which might include a linked BigQuery dataset). |
| After the delete command | The bucket is in the `DELETE_REQUESTED` state for 7 days; Logging continues to route logs to it during that period. |
| Same name | You can't create a new bucket with the name of a bucket in `DELETE_REQUESTED`. |
| Quota | Buckets in `DELETE_REQUESTED` count toward the buckets-per-project quota until fully deleted. |

## Notes

- Deleting a bucket permanently removes all the logs in it after 7 days. Try it on a disposable project first.
- If you delete a bucket, also delete or modify the log sinks that route entries to it; to stop routing during the 7-day period, delete or modify those sinks.
- Failure example when a link still exists: `FAILED_PRECONDITION: This bucket is used for advanced analytics and has an active link. The link must be deleted first before deleting the bucket`.
- In the console, the bucket shows a pending-deletion indicator; use More, then Restore deleted bucket.
- Troubleshooting checklist from the source: verify delete permissions (see Access control with IAM), check whether the bucket is locked, and check for links.
- The source also shows the Google Cloud console steps.
- Source: https://docs.cloud.google.com/logging/docs/buckets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [update-log-bucket-and-retention.md](./update-log-bucket-and-retention.md)
- [log-analytics-upgrade-and-linked-datasets.md](./log-analytics-upgrade-and-linked-datasets.md)
- [list-and-describe-log-buckets.md](./list-and-describe-log-buckets.md)
