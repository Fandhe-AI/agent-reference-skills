---
source: https://docs.cloud.google.com/storage/docs/insights/inventory-reports
---

# Storage Insights inventory reports

Inventory reports are scheduled lists of objects and their metadata for a single bucket, a faster alternative to the `Objects: list` API. They export as CSV or Apache Parquet files for analysis in tools such as BigQuery. For complete, daily, multi-bucket analysis the source recommends Storage Insights datasets.

## Signature / Usage

### Manifest file

When a report has more than 1,000,000 objects, shard objects are generated; a manifest file in the destination bucket marks that all shards exist. Naming: `REPORT_CONFIG_UUID_TARGET_DATETIME_manifest.json`, for example `fc95c52f-157a-494f-af4a-d4a53a69ba66_2022-11-30T00:00_manifest.json`.

Manifest template (a `text` fragment: the unquoted placeholders and the `...` for further shard names are not valid JSON):

Adapted (not in the official docs): added the missing closing quotes on `snapshot_time` and `target_datetime`; the template's other placeholders and `...` are kept, so the block is labelled `text`.

```text
{
  "report_config": REPORT_CONFIG_FIELDS,
  "records_processed": NUMBER_OF_INCLUDED_OBJECTS,
  "snapshot_time": "SNAPSHOT_TIME",
  "target_datetime": "TARGET_DATETIME",
  "shard_count": SHARD_COUNT,
  "report_shards_file_names": [
    SHARD_FILE_NAME
    ...]
}
```

Adapted (not in the official docs): added missing commas and removed trailing commas so the example is valid JSON; the trailing `...` after the shard file names was removed (`shard_count` is 4, but only two names are shown).

```json
{
  "report_config":
     {
       "name": "projects/123456789098/locations/us/reportConfigs/fcec5187-afa6-48b0-938a-543d16493dc0",
       "createTime": "2023-06-08T08:07:53.397366139Z",
       "updateTime": "2023-06-08T08:07:53.552347723Z",
       "frequencyOptions": {
         "frequency": "DAILY",
         "startDate": {
           "year": 2023,
           "month": 6,
           "day": 9
         },
         "endDate": {
           "year": 2023,
           "month": 6,
           "day": 23
         }
       },
       "csvOptions": {
         "recordSeparator": "\n",
         "delimiter": ","
       },
       "objectMetadataReportOptions": {
         "metadataFields": [
           "project",
           "bucket",
           "name",
           "location",
           "updated",
           "storageClass"
         ],
         "storageFilters": {
           "bucket": "my-test-bucket"
         },
         "storageDestinationOptions": {
           "bucket": "example-bucket",
           "destinationPath": "folder/subfolder"
         }
       }
     },
  "records_processed": 3993900,
  "snapshot_time" : "2023-06-06T00:07:27Z",
  "target_datetime": {
    "year": 2023,
    "month": 6,
    "day": 6
  },
  "shard_count": 4,
  "report_shards_file_names": [
    "fc95c52f-157a-494f-af4a-d4a53a69ba66_2022-11-30T00:54_0.csv",
    "fc95c52f-157a-494f-af4a-d4a53a69ba66_2022-11-30T00:54_1.csv"
  ]
}
```

## Options / Props

### Source and destination buckets

| Item | Requirement |
|------|-------------|
| Inventory report configurations per source bucket | Up to 100 |
| Destination bucket location | Same location as the source bucket |
| Destination bucket project | Same project as the source bucket |
| Destination bucket | Can be the same as the source bucket |
| Editable configuration fields | Display name, object metadata fields, destination bucket, schedule, file format (CSV or Parquet); the UUID is not editable |

### Object metadata fields

Required: `project` (project ID of the source bucket), `bucket`, `name`. Optional fields:

| Field | Description |
|-------|-------------|
| `location` | Location of the source bucket |
| `size` | Object size |
| `timeCreated` | Creation time (RFC 3339) |
| `timeDeleted` | Deletion time (RFC 3339); only for noncurrent versions |
| `updated` | Metadata modification time (RFC 3339) |
| `storageClass` | Storage class |
| `etag` | HTTP 1.1 entity tag |
| `retentionExpirationTime` | Earliest deletion time given retention configuration or bucket retention policy (RFC 3339) |
| `crc32c` | CRC32C checksum, base64, big-endian |
| `md5Hash` | MD5 hash, base64; absent for composite objects |
| `generation` | Content generation, used for object versioning |
| `metageneration` | Metadata version at this generation |
| `contentType` | Content-Type; `application/octet-stream` if stored without one |
| `contentEncoding` | Content-Encoding |
| `timeStorageClassUpdated` | When the storage class last changed; set to `timeCreated` on creation |

### Unsupported locations

- Regions: `africa-south1`, `asia-southeast3`, `europe-north2`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `northamerica-south1`
- Dual-regions: `eur5`, `eur7`, `eur8`

## Notes

- Caution (from the source): timeliness and completeness of report delivery vary; reports might not generate daily and some objects might be missing. For complete daily analysis use Storage Insights datasets (available through the Storage Intelligence subscription).
- Deleting a configuration stops new reports; existing reports remain.
- On first configuration a service agent is created; both you and the service agent need IAM permissions to create configurations and write reports.
- Reports use bucket names: if you delete a source or destination bucket and create a new one with the same name, reports run against the new bucket.
- Audit logs are created when reports are generated in the destination bucket and when configurations are created, updated, or deleted; not when a configuration reads object metadata from the source.
- VPC Service Controls can protect the resources. Enabling IP filtering on a bucket blocks inventory reports from accessing it, even through a service agent; avoid IP filtering on buckets you report on.
- Pricing depends on the bucket location.
- Use cases: list all objects in a bucket, validate data transfers, audit a particular bucket. Datasets suit organization-wide visibility, cost, and security analysis.
- Corrected from the official docs: the manifest template had `"snapshot_time": "SNAPSHOT_TIME,` and `"target_datetime": "TARGET_DATETIME,` (unterminated strings), and the example lacked commas after the `startDate` and `report_config` objects and had trailing commas.
- Adapted from the official docs: the example's `report_shards_file_names` array ended with a `...` entry after the second file name; it was removed, so the example lists two of the four shards. The manifest template is shown as `text` because it keeps unquoted placeholders and `...`.
- Distance: Cloud Storage is Google Cloud's object storage; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/insights/inventory-reports (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [datasets.md](./datasets.md)
- [configure-datasets.md](./configure-datasets.md)
- [storage-intelligence-overview.md](./storage-intelligence-overview.md)
