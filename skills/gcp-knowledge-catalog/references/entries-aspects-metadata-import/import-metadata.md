---
source: https://docs.cloud.google.com/knowledge-catalog/docs/import-metadata
---

# Import metadata with the metadata import API

The metadata import API (`dataplex.googleapis.com/v1`, `metadataJobs`) imports metadata from a third-party system into Knowledge Catalog (formerly Dataplex Universal Catalog) through your own pipeline. Steps: determine the job scope and sync mode, create metadata import files (JSON Lines), save them in a Cloud Storage bucket, run a metadata import job. For a Google Cloud-managed orchestration, see the managed connectivity pipeline.

## Signature / Usage

### Structure of the metadata import file

Each line is one JSON object (an import item); separate items with a newline (`0x0a`). Do not provide the same import item more than once in a job.

```text
{ "entry": { "name": "entry 1", #Information about entry 1 }
{ "entry": { "name": "entry 2", #Information about entry 2 }
```

### Structure of an import item

Shown with line breaks for readability; in the file, put a newline only after each import item, never between the fields of one item.

```text
{
  "entry": {
    "name": "ENTRY_NAME",
    "entryType": "ENTRY_TYPE",
    "entrySource": {
      "resource": "RESOURCE",
      "system": "SYSTEM",
      "platform": "PLATFORM",
      "displayName": "DISPLAY_NAME",
      "description": "DESCRIPTION",
      "createTime": "ENTRY_CREATE_TIMESTAMP",
      "updateTime": "ENTRY_UPDATE_TIMESTAMP"
    },
    "aspects": {
      "ASPECT": {
        "data": {
          "KEY": "VALUE"
        },
        "aspectSource": {
          "createTime": "ASPECT_CREATE_TIMESTAMP",
          "updateTime": "ASPECT_UPDATE_TIMESTAMP"
        }
      },
      # Additional aspect maps
    },
    "parentEntry": "PARENT_ENTRY",
    "fullyQualifiedName": "FULLY_QUALIFIED_NAME"
  },
  "updateMask": "UPDATE_MASK_FIELDS",
  "aspectKeys": [
    "ASPECT_KEY",
    # Additional aspect keys
  ],
}
```

### Run a metadata import job (REST)

`POST https://dataplex.googleapis.com/v1/projects/TARGET_PROJECT_NUMBER/locations/LOCATION_ID/metadataJobs?metadataJobId=METADATA_JOB_ID`. The response is a long-running operation.

Adapted (not in the official docs): the field names are the API's camelCase names (`importSpec`, `sourceStorageUri`, `entryTypes`, `aspectTypes`, `entrySyncMode`, `aspectSyncMode`, `logLevel`); the official page writes them in snake_case.

```json
{
  "type": "IMPORT",
  "importSpec": {
    "sourceStorageUri": "gs://CLOUD_STORAGE_URI/",
    "scope": {
      "entryGroups": [
        "ENTRY_GROUP"
      ],
      "entryTypes": [
        "ENTRY_TYPE"
      ],
      "aspectTypes": [
        "ASPECT_TYPE"
      ]
    },
    "entrySyncMode": "ENTRY_SYNC_MODE",
    "aspectSyncMode": "INCREMENTAL",
    "logLevel": "LOG_LEVEL"
  }
}
```

Save the body as `request.json`, then:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://dataplex.googleapis.com/v1/projects/TARGET_PROJECT_NUMBER/locations/LOCATION_ID/metadataJobs?metadataJobId=METADATA_JOB_ID"
```

### Get details about a metadata job

`GET https://dataplex.googleapis.com/v1/projects/TARGET_PROJECT_NUMBER/locations/LOCATION_ID/metadataJobs/METADATA_JOB_ID` (`metadataJobs.get`).

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://dataplex.googleapis.com/v1/projects/TARGET_PROJECT_NUMBER/locations/LOCATION_ID/metadataJobs/METADATA_JOB_ID"
```

The source says to expect a JSON response similar to the following:

```json
{
  "name": "projects/123456789012/locations/us-central1/metadataJobs/my-metadata-job",
  "uid": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "createTime": "2026-07-17T16:30:15Z",
  "updateTime": "2026-07-17T16:35:15Z",
  "type": "IMPORT",
  "importSpec": {
    "sourceStorageUri": "gs://my-bucket/",
    "scope": {
      "entryGroups": [
        "projects/123456789012/locations/us-central1/entryGroups/my-entry-group"
      ],
      "entryTypes": [
        "projects/123456789012/locations/us-central1/entryTypes/my-entry-type"
      ],
      "aspectTypes": [
        "projects/123456789012/locations/us-central1/aspectTypes/my-aspect-type"
      ]
    },
    "entrySyncMode": "FULL",
    "aspectSyncMode": "INCREMENTAL",
    "logLevel": "INFO"
  },
  "status": {
    "state": "SUCCEEDED"
  },
  "importResult": {
    "deletedEntries": "2",
    "updatedEntries": "5",
    "createdEntries": "10",
    "unchangedEntries": "20",
    "updateTime": "2026-07-17T16:35:15Z"
  }
}
```

```python
# This snippet has been automatically generated and should be regarded as a
# code template only.
# It will require modifications to work:
# - It may require correct/in-range values for request initialization.
# - It may require specifying regional endpoints when creating the service
#   client as shown in:
#   https://googleapis.dev/python/google-api-core/latest/client_options.html
from google.cloud import dataplex_v1


def sample_get_metadata_job():
    # Create a client
    client = dataplex_v1.CatalogServiceClient()

    # Initialize request argument(s)
    request = dataplex_v1.GetMetadataJobRequest(
        name="name_value",
    )

    # Make the request
    response = client.get_metadata_job(request=request)

    # Handle the response
    print(response)
```

### List and cancel jobs

Use `metadataJobs.list` to list the most recent jobs (older jobs in a terminal state are periodically deleted; `pageSize` default 10, maximum 1,000; `orderBy` is `name` or `create_time`) and `metadataJobs.cancel` to cancel a job.

## Options / Props

### Required roles

| Task | Role |
|---|---|
| Knowledge Catalog service account reads the bucket | `roles/storage.objectViewer` and the `storage.buckets.get` permission on the bucket |
| Full entry sync job: modify entries and aspects | `roles/dataplex.entryTypeUser` on the entry type (or its project); `roles/dataplex.aspectTypeUser` on the aspect type (or its project) |
| Aspect-only job: modify required aspects | `roles/dataplex.entryTypeUser` and `roles/dataplex.aspectTypeUser` (as above) |
| Aspect-only job: modify optional aspects | `roles/dataplex.aspectTypeUser`; no entry type permissions needed |
| Create metadata import jobs | `roles/dataplex.entryGroupImporter` and `roles/dataplex.entryOwner` on the project or the resource |
| View metadata jobs | `roles/dataplex.metadataJobViewer` on the project |
| Create, view, and cancel metadata jobs | `roles/dataplex.metadataJobOwner` on the project |

### Job scope

| Scope item | Rule |
|---|---|
| Entry groups | One or more; the job modifies only entries and aspects in these groups. Entry groups and the job must be in the same region |
| Entry types | One or more; location must match the job's location, or the entry type must be global |
| Aspect types | One or more; location must match the job's location, or the aspect type must be global. Importing `data-rules` and `data-quality-rule-template` aspects isn't supported from the metadata job |

The job scope must include all entry types and aspect types referenced in the import file.

### Sync modes

| Goal | Entry sync mode | Aspect sync mode | Result |
|---|---|---|---|
| Import entries and their aspects (custom entries) | `FULL` | `INCREMENTAL` | All entries in scope are modified; an entry in Knowledge Catalog but not in the file is deleted. An aspect is modified only if the file references it in `updateMask` and `aspectKeys` |
| Import aspects only (custom and system entries) | `NONE` | `INCREMENTAL` | Aspects in scope referenced in `aspectKeys` are modified; other entry metadata isn't. For custom entries both optional and required aspects can be modified; for system entries only optional aspects |

### Import item fields

| Field | Description |
|---|---|
| `ENTRY_NAME` | `projects/PROJECT_ID_OR_NUMBER/locations/LOCATION_ID/entryGroups/ENTRY_GROUP_ID/entries/ENTRY_ID` |
| `ENTRY_TYPE` | `projects/PROJECT_ID_OR_NUMBER/locations/LOCATION_ID/entryTypes/ENTRY_TYPE_ID` |
| `entrySource` | `resource`, `system`, `platform`, `displayName`, `description`, `createTime`, `updateTime` from the source system. In an aspect-only job all optional entry fields except aspect maps are ignored |
| `ASPECT` | `PROJECT_ID_OR_NUMBER.LOCATION_ID.ASPECT_TYPE_ID` (attached to the entry) or `PROJECT_ID_OR_NUMBER.LOCATION_ID.ASPECT_TYPE_ID@PATH` (attached to a path) |
| `data` | Aspect content per the aspect type template; UTF-8; max 120 KB; required even if empty |
| `updateMask` | Comma-separated field paths relative to `Entry`. Full sync: all modifiable fields including aspects (ignored when an entry is created or re-created). Aspect-only job: `aspects` |
| `aspectKeys` | `ASPECT_TYPE_REFERENCE`, `ASPECT_TYPE_REFERENCE@PATH`, `ASPECT_TYPE_REFERENCE@*` (all paths), `*@PATH` (all aspect types on the path). Empty in a full sync = exactly the aspects present in the entry; required aspect keys are added implicitly |

### File requirements

| Requirement | Value |
|---|---|
| Format | JSON Lines, UTF-8, newline `0x0a` between items |
| Extensions | `.jsonl`, `.json` |
| Size | Each file less than 1 GiB; total for all data in the job 3 GB |
| Location | Cloud Storage bucket or folder; not in a folder named `CLOUD_STORAGE_URI/deletions/`. The job reads all files in the bucket including subfolders |

### Log levels and job states

| Value | Meaning |
|---|---|
| `INFO` | Job-level logs; aggregate import item logs without naming the failing item |
| `DEBUG` | Per-item logs; may incur additional Google Cloud Observability costs |
| `FAILED` | File error (unparseable item, out-of-scope resource, duplicate entry name, bad aspect type format, required aspect marked for deletion); nothing is imported |
| `SUCCEEDED_WITH_ERRORS` | File parsed, but an item would leave an entry inconsistent; those entries are ignored, the rest is imported |

## Notes

- Caution (source): if an entry exists in Knowledge Catalog but isn't in the file, a full sync deletes it; if the file contains no data, all entries and aspects in the job's scope are deleted. Provide an empty file only when you want that. Try this on a disposable entry group first.
- Caution (source): cancelling an in-progress import job may leave changes partially applied; run another job that reverts them.
- Comparison logic: Knowledge Catalog compares the source create/update timestamps in the file with those in the project. Full sync creates, deletes, or updates entries; an aspect is updated when it is in the aspect map, `updateMask`, and `aspectKeys` and its source update timestamp is newer (or absent while the entry is marked for update). If any aspect in the file has an older timestamp than the project, no updates are made for the attached entry. Aspect-only jobs update by aspect timestamp regardless of the entry timestamp, and required aspects can't be deleted.
- Adapted from the official docs: the source request body mixes snake_case (`import_spec`, `source_storage_uri`, `entry_types`, `aspect_types`, `entry_sync_mode`, `aspect_sync_mode`, `log_level`) with `entryGroups`. The API schema names these fields in camelCase (`importSpec`, `sourceStorageUri`, `entryTypes`, `aspectTypes`, `entrySyncMode`, `aspectSyncMode`, `logLevel`; rest-schemas/dataplex/dataplex-2.md, `GoogleCloudDataplexV1MetadataJob`), so the example uses them and matches the response example.
- The source's curl and URL use `TARGET_PROJECT_NUMBER` while its replacement list names `PROJECT_NUMBER`; replace `TARGET_PROJECT_NUMBER` with your project number or ID. The source request-body replacement list also covers `ENTRY_SYNC_MODE` (`FULL` or `NONE`) and `LOG_LEVEL` (`INFO` or `DEBUG`).
- The source also shows PowerShell, C#, Go, Java, Node.js and Ruby samples, and the list and cancel client-library samples. Only Python is kept.
- Python snippet is a generated template (`name_value` placeholder).
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/import-metadata (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-aspects.md](./about-aspects.md)
- [managed-connectivity-overview.md](./managed-connectivity-overview.md)
- [connectors.md](./connectors.md)
