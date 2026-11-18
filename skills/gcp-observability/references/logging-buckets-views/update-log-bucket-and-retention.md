---
source: https://docs.cloud.google.com/logging/docs/buckets
---

# Update a log bucket, configure retention, and lock

Update bucket properties such as the description and retention period, and lock a bucket against updates and deletion. Retention can be customized for user-defined buckets and for the `_Default` bucket when it is in a project.

## Signature / Usage

### Update a bucket

```bash
gcloud logging buckets update BUCKET_ID --location=LOCATION UPDATED_ATTRIBUTES
```

```bash
gcloud logging buckets update my-bucket --location=global --description "Updated description"
```

REST: `projects.locations.buckets.patch`.

### Configure custom retention

```bash
gcloud logging buckets update BUCKET_ID  --location=LOCATION --retention-days=RETENTION_DAYS
```

Retain the `_Default` bucket's logs in the `global` location for a year:

```bash
gcloud logging buckets update _Default --location=global --retention-days=365
```

### Lock a bucket

Warning from the source: locking a log bucket is irreversible.

```bash
gcloud logging buckets update BUCKET_ID --location=LOCATION --locked
```

```bash
gcloud logging buckets update my-bucket --location=global --locked
```

REST: call `projects.locations.buckets.patch` and set the `locked` parameter to `true`.

## Options / Props

| Item | Value / Limit | Description |
|------|---------------|-------------|
| `--retention-days` | 1 to 3650 days | Retention period; the default for new buckets is 30 days. |
| `--description` | string | Bucket description. |
| `--locked` | flag | Locks the bucket, its retention policy, and prevents deletion. Console doesn't support locking. |
| Shortening grace period | 7 days | Expired logs aren't deleted for 7 days after you shorten retention; you can't query or view them, but extending retention restores access. |
| `_Required` bucket | fixed | Retention can't be changed. |
| Folder / organization buckets | fixed | You can't extend retention of a log bucket in a folder or organization. |

## Notes

- Shortening retention eventually deletes entries older than the new period (after the 7-day grace period); extending retention applies going forward, not retroactively, and logs can't be recovered after the applicable retention period ends. Try retention changes on a disposable project first.
- To get longer retention for folder- or organization-level logs, create a sink that routes them to a bucket in a project, then configure that bucket's retention.
- Logs stored during the grace period count toward retention costs. Effective April 1, 2023, retention costs apply to logs retained longer than the default retention period of the `_Default` bucket and user-defined buckets (see the Google Cloud Observability pricing page).
- Retention enforcement is eventually consistent. Entries older than the bucket's retention that you write to the bucket may be briefly visible and are then purged; they contribute to storage costs but not retention costs. Don't write entries older than the bucket's retention period.
- Locking also locks the retention policy and prevents deletion of the bucket. To prevent accidental deletion of a project that contains a locked bucket, add a lien to the project (see "Protecting projects with liens" in the Resource Manager docs).
- Locking is irreversible; try it on a disposable project first.
- To upgrade a bucket to Observability Analytics with `--enable-analytics`, don't change any other property in the same `update` call (the call fails); see [log-analytics-upgrade-and-linked-datasets.md](./log-analytics-upgrade-and-linked-datasets.md).
- The gcloud help for `buckets update` also lists `--cmek-kms-key-name`, `--restricted-fields`, `--add-index`, `--update-index`, `--remove-indexes`, and `--clear-indexes`; they are not covered on this source page.
- The source also shows the Google Cloud console steps.
- Source: https://docs.cloud.google.com/logging/docs/buckets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-log-bucket.md](./create-log-bucket.md)
- [delete-and-restore-log-bucket.md](./delete-and-restore-log-bucket.md)
- [log-analytics-upgrade-and-linked-datasets.md](./log-analytics-upgrade-and-linked-datasets.md)
