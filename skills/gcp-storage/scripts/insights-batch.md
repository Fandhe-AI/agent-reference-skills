---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/insights
---

# Storage Insights, Batch Operations and Anywhere Cache

Copy-paste gcloud commands for Storage Insights dataset configurations and inventory reports, storage batch operations jobs, and Anywhere Cache instances.

## Signature / Usage

### Enable the Storage Insights API

```bash
gcloud services enable storageinsights.googleapis.com
```

### Create a dataset configuration

Adapted (not in the official docs): renamed `my-dataset` to `my_dataset` (configuration names allow letters, numbers and underscores only).

```bash
gcloud storage insights dataset-configs create my_dataset \
--location=us-central1 \
--organization=123456789 \
--retention-period-days=30 \
--source-projects=987654321,123123123
```

Use project numbers (not project IDs) for `--source-projects`.

### Link, describe, list and update a dataset configuration

```bash
gcloud storage insights dataset-configs create-link DATASET_CONFIG_ID --location=LOCATION
```

```bash
gcloud storage insights dataset-configs create-link projects/DESTINATION_PROJECT_ID/locations/LOCATION/datasetConfigs/DATASET_CONFIG_ID
```

```bash
gcloud storage insights dataset-configs describe DATASET_CONFIG_ID \
  --location=LOCATION
```

```bash
gcloud storage insights dataset-configs list --location=LOCATION
```

```bash
gcloud storage insights dataset-configs update DATASET_CONFIG_ID \
  --location=LOCATION --retention-period-days=RETENTION_PERIOD_DAYS
```

### Unlink and delete a dataset configuration

> **Warning**: deleting a dataset configuration removes it, and `--auto-delete-link` also unlinks it from BigQuery. Try it on a disposable configuration first.

```bash
gcloud storage insights dataset-configs delete-link DATASET_CONFIG_ID \
  --location=LOCATION
```

```bash
gcloud storage insights dataset-configs delete DATASET_CONFIG_ID \
  --location=LOCATION --auto-delete-link
```

### Inventory reports

```bash
gcloud storage insights inventory-reports create gs://SOURCE_BUCKET_NAME \
    --destination=gs://REPORT_BUCKET_NAME/save-path/
```

```bash
gcloud storage insights inventory-reports list \
    --source=gs://SOURCE_BUCKET_NAME
```

```bash
gcloud storage insights inventory-reports describe REPORT_CONFIG_ID \
    --location=LOCATION --project=PROJECT_ID
```

```bash
gcloud storage insights inventory-reports details list REPORT_CONFIG_ID \
    --location=LOCATION --project=PROJECT_ID
```

```bash
gcloud storage insights inventory-reports update REPORT_CONFIG_ID \
    --location=LOCATION --project=PROJECT_ID --display-name=DISPLAY_NAME
```

> **Warning**: deleting a report configuration is destructive. Try it on a disposable report configuration first.

```bash
gcloud storage insights inventory-reports delete REPORT_CONFIG_ID \
    --location=LOCATION --project=PROJECT_ID
```

### Batch operations: dry run first, then delete objects from a manifest

Preview what the job would do:

```bash
gcloud storage batch-operations jobs create my-dry-run-job \
  --bucket=my-bucket \
  --manifest-location=gs://my-bucket/manifest.csv \
  --delete-object --dry-run
```

> **Warning**: the next job permanently deletes every object listed in the manifest. Run it only after reviewing a dry run, and try it on a disposable bucket first.

```bash
gcloud storage batch-operations jobs create my-job \
  --bucket=my-bucket \
  --manifest-location=gs://my-bucket/manifest.csv --delete-object
```

### Batch operations: update object custom contexts

```bash
gcloud storage batch-operations jobs create my-job \
  --bucket=my-bucket --included-object-prefixes=prefix1,prefix2 \
  --clear-object-custom-contexts=key1 \
  --update-object-custom-contexts=key2=val2,key3=val3
```

### Manage batch jobs

```bash
gcloud storage batch-operations jobs list
```

```bash
gcloud storage batch-operations jobs list --filter="dry_run=false"
```

```bash
gcloud storage batch-operations jobs describe my-job
```

```bash
gcloud storage batch-operations bucket-operations list --job=my-job
```

Cancel or delete a job by its fully specified name. The location segment must match the job's location; jobs created without a location, like the ones above, are in `global` (replace `us-central1` with `global` for them).

Adapted (not in the official docs): `my-job --location=us-central1` replaced with the fully specified name; `jobs cancel` has no `--location` flag in gcloud 593.0.0.

```bash
gcloud storage batch-operations jobs cancel projects/my-project/locations/us-central1/jobs/my-job
```

> **Warning**: deleting a batch job is destructive. Try it on a disposable job first.

Adapted (not in the official docs): `my-job --location=us-central1` replaced with the fully specified name; `jobs delete` has no `--location` flag in gcloud 593.0.0.

```bash
gcloud storage batch-operations jobs delete projects/my-project/locations/us-central1/jobs/my-job
```

### Anywhere Cache

```bash
gcloud storage buckets anywhere-caches create gs://my-bucket \
    asia-south2-b
```

Adapted (not in the official docs): `--ttl=6h` changed to `--ttl=24h` (the documented TTL range is 24 hours to 7 days) and the hidden `--admission-policy='ADMIT_ON_SECOND_MISS'` removed.

```bash
gcloud storage buckets anywhere-caches create gs://my-bucket asia-south2-b \
    --ttl=24h
```

```bash
gcloud storage buckets anywhere-caches list gs://my-bucket
```

```bash
gcloud storage buckets anywhere-caches describe \
    my-bucket/my-cache-id
```

Adapted (not in the official docs): `--ttl=6h` changed to `--ttl=24h` (the documented TTL range is 24 hours to 7 days) and the hidden `--admission-policy='ADMIT_ON_SECOND_MISS'` removed.

```bash
gcloud storage buckets anywhere-caches update my-bucket/my-cache-id \
    --ttl=24h

gcloud storage buckets anywhere-caches update bucket-1/my-cache-id-1 bucket-2/my-cache-id-2 \
    --ttl=24h
```

> **Warning**: disabling a cache permanently removes it after a 1-hour grace period, and all data in the cache is evicted; until then you can cancel the disablement with `resume`. Try it on a disposable bucket first.

```bash
gcloud storage buckets anywhere-caches disable \
    my-bucket/my-cache-id
```

```bash
gcloud storage buckets anywhere-caches resume my-bucket/my-cache-id
```

Several zones can be listed to create several cache instances.

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--source-projects` | `dataset-configs create` | Project numbers to include |
| `--retention-period-days` | `dataset-configs create`, `update` | Dataset retention in days |
| `--destination` | `inventory-reports create` | `gs://` path that receives the reports |
| `--manifest-location` | `batch-operations jobs create` | CSV manifest of objects in Cloud Storage |
| `--included-object-prefixes` | `batch-operations jobs create` | Select objects by prefix |
| `--delete-object` | `batch-operations jobs create` | Delete the selected objects |
| `--dry-run` | `batch-operations jobs create` | Preview without changing objects |
| `--ttl` | `anywhere-caches create`, `update` | Cache entry time to live, for example `24h`; between 24 hours and 7 days, default 24 hours |

## Notes

- Commands from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- In the dataset-config and inventory-report commands taken from the gcloud help, the help-example values (`my_config`, `us-central1`, `20`, `1234`, `foo`, `bar`, `gs://my-bucket`, `gs://report-bucket`) are replaced with UPPER_CASE placeholders such as `DATASET_CONFIG_ID`, `LOCATION`, `REPORT_CONFIG_ID` and `SOURCE_BUCKET_NAME`; the commands are otherwise verbatim.
- Adapted from the official docs: the source example uses `create my-dataset`, which breaks the page's own naming rule (letters, numbers and underscores only); renamed to `my_dataset` (the gcloud help example uses `my_config`).
- Corrected from the official docs: the `jobs cancel` and `jobs delete` help examples pass `my-job --location=us-central1`, but these commands have no `--location` flag (gcloud 593.0.0 rejects it as an unrecognized argument; the location is taken from a fully specified name and defaults to `global`); the commands use the fully specified name `projects/my-project/locations/us-central1/jobs/my-job` (the help's second example).
- Corrected from the official docs: the `anywhere-caches create` and `update` help examples use `--ttl=6h`, but the Anywhere Cache page says the TTL can be set between 24 hours and 7 days, so the commands use `--ttl=24h`, the documented minimum and default.
- Corrected from the official docs: the help examples pass `--admission-policy='ADMIT_ON_SECOND_MISS'`; the flag is hidden (absent from the SYNOPSIS) and gcloud 593.0.0 warns that the `ADMIT_ON_SECOND_MISS` choice is deprecated and mapped to `ADMIT_ON_FIRST_MISS`, so the commands omit it.
- Destructive: batch `--delete-object` jobs, `inventory-reports delete` (its `--force` flag also deletes generated report details), `dataset-configs delete --auto-delete-link` and `anywhere-caches disable` remove or stop data and configuration. Always run a `--dry-run` job first and try everything on disposable resources.
- Storage Insights needs Storage Intelligence for the project, folder or organization. The first dataset can take up to 48 hours to appear in BigQuery. Roles used: `roles/storageinsights.admin` (configure) and `roles/storageinsights.analyst` (link). Configuring a dataset also needs `storage.buckets.getObjectInsights`, which the IAM roles reference does not include in `roles/storageinsights.admin`; get it from another role on the source buckets or projects.
- The official dataset-config page names the flags `--include-buckets` / `--exclude-buckets`; gcloud 593.0.0 has `--include-bucket-names` / `--exclude-bucket-names` (and `...-prefix-regexes`) instead, so use those.
- Anywhere Cache instances are addressed as `BUCKET_NAME/CACHE_ID` in the gcloud help examples.
- Batch jobs that set `Retention-Mode=locked` (object retention lock, irreversible) are intentionally not listed; see the gcloud reference page.
- Wildcard URLs (`*`, `**`) must be quoted in zsh and similar shells; none are used here.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storageinsights (IAM roles reference; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/insights/dataset-configs (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/insights/inventory-reports (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/batch-operations (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/anywhere-caches (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/insights/configure-datasets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/anywhere-cache (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [objects.md](./objects.md)
- [buckets.md](./buckets.md)
- Batch operations overview: https://docs.cloud.google.com/storage/docs/batch-operations/overview
