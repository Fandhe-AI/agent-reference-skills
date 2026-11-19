---
source: https://docs.cloud.google.com/knowledge-catalog/docs/export-metadata
---

# Export metadata with a metadata export job

A metadata export job (`dataplex.googleapis.com/v1`, `metadataJobs` with `"type": "EXPORT"`) exports a snapshot of Knowledge Catalog (formerly Dataplex Universal Catalog) metadata to Cloud Storage as JSON Lines files, for analysis in BigQuery, large-volume programmatic processing, or custom applications. Assumes familiarity with entry groups, entry types, and aspect types.

## Signature / Usage

### Configure Google Cloud resources

Install and initialize the Google Cloud CLI; if you use an external identity provider (IdP), first sign in to the gcloud CLI with your federated identity.

```bash
gcloud init
```

Create a Cloud Storage bucket for the exported results. The bucket must be in the same location and the same VPC Service Controls perimeter as the metadata job.

### Export metadata from your organization

Use the `metadataJobs.create` method and set `organizationLevel` to `true`. Replacements used in all request examples:

- `JOB_PROJECT`: the Google Cloud project that you run the metadata job in (project number or project ID).
- `LOCATION_ID`: the Google Cloud location, such as `us-central1`.
- `METADATA_JOB_ID`: optional. The metadata job ID.
- `BUCKET`: the Cloud Storage bucket to export the metadata to. Optionally include a custom prefix after the bucket name, in the format `gs://BUCKET/PREFIX/` (maximum prefix length 128 characters).

HTTP method and URL:

```text
POST https://dataplex.googleapis.com/v1/projects/JOB_PROJECT/locations/LOCATION_ID/metadataJobs?metadataJobId=METADATA_JOB_ID
```

Request JSON body:

```text
{
  "type": "EXPORT",
  "export_spec": {
    "output_path": "gs://BUCKET/",
    "scope": {
      "organizationLevel": true,
    },
  }
}
```

Save the request body in a file named `request.json` and execute (curl, Linux, macOS, or Cloud Shell; assumes you are logged in to the gcloud CLI with your user account):

```text
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://dataplex.googleapis.com/v1/projects/JOB_PROJECT/locations/LOCATION_ID/metadataJobs?metadataJobId=METADATA_JOB_ID"
```

PowerShell (Windows):

```text
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://dataplex.googleapis.com/v1/projects/JOB_PROJECT/locations/LOCATION_ID/metadataJobs?metadataJobId=METADATA_JOB_ID" | Select-Object -Expand Content
```

The response identifies a long-running operation. The exported metadata is saved to the Cloud Storage bucket.

### Export metadata from specific projects

Same method, URL, and send commands as above; provide a list of projects. Extra replacement: `METADATA_SOURCE_PROJECT`: a project whose metadata you want to export (project number or project ID); it must be in the same organization and VPC Service Controls perimeter as the metadata job.

Request JSON body:

```text
{
  "type": "EXPORT",
  "export_spec": {
    "output_path": "gs://BUCKET/",
    "scope": {
      "projects": [
        "projects/METADATA_SOURCE_PROJECT",
        # Additional projects
      ],
    },
  }
}
```

### Export metadata from specific entry groups

Same method, URL, and send commands as above; provide a list of entry groups. Extra replacement: `ENTRY_GROUP`: the relative resource name of an entry group that is in scope for the job, in the format `projects/PROJECT_ID_OR_NUMBER/locations/LOCATION_ID/entryGroups/ENTRY_GROUP_ID`. The entry group must be in the same project as the metadata job.

Request JSON body:

```text
{
  "type": "EXPORT",
  "export_spec": {
    "output_path": "gs://BUCKET/",
    "scope": {
      "entryGroups": [
        "ENTRY_GROUP",
        # Additional entry groups
      ],
    },
  }
}
```

### Export metadata from specific entry types or aspect types

Set the primary job scope (for example, organization level) and add a list of entry types, aspect types, or both. Replacements:

- `ENTRY_TYPE`: optional. The relative resource name of an entry type that is in scope for the job, in the format `projects/PROJECT_ID_OR_NUMBER/locations/LOCATION_ID/entryTypes/ENTRY_TYPE_ID`.
- `ASPECT_TYPE`: optional. The relative resource name of an aspect type that is in scope for the job, in the format `projects/PROJECT_ID_OR_NUMBER/locations/LOCATION_ID/aspectTypes/ASPECT_TYPE_ID`.

Request JSON body (same method, URL, and send commands as above):

```text
{
  "type": "EXPORT",
  "export_spec": {
    "output_path": "gs://BUCKET/",
    "scope": {
      "organizationLevel": true,
      "entry_types": [
        "ENTRY_TYPE",
        # Additional entry types
      ],
      "aspect_types": [
        "ASPECT_TYPE",
        # Additional aspect types
      ]
    },
  }
}
```

### Get details about a metadata job

To get information about a metadata job, such as the status of the job and the number of entries that were exported, use the `metadataJobs.get` method (https://docs.cloud.google.com/knowledge-catalog/docs/reference/rest/v1/projects.locations.metadataJobs/get).

### Export file location

Result files are Cloud Storage objects. The object path is the bucket name and custom prefix from the job, followed by a system-generated path designed for BigQuery integration:

```text
gs://BUCKET/PREFIX/year=YYYY/month=MM/day=DD/consumer_project=JOB_PROJECT/job=METADATA_JOB_ID/project=METADATA_SOURCE_PROJECT/entrygroup=ENTRY_GROUP/FILE_NUMBER.jsonl
```

Example output files for a job that included multiple projects:

```text
gs://export-bucket/example-folder/year=2025/month=04/day=13/consumer_project=admin-project/job=example-job/project=metadata-project-1/entrygroup=entry-group-1/1.jsonl
gs://export-bucket/example-folder/year=2025/month=04/day=13/consumer_project=admin-project/job=example-job/project=metadata-project-2/entrygroup=entry-group-1/1.jsonl
gs://export-bucket/example-folder/year=2025/month=04/day=13/consumer_project=admin-project/job=example-job/project=metadata-project-3/entrygroup=entry-group-2/1.jsonl
```

Example output files for a job with a large entry group, split into multiple files:

```text
gs://export-bucket/example-folder/year=2025/month=04/day=13/consumer_project=admin-project/job=another-example-job/project=example-metadata-project/entrygroup=big-entry-group/1.jsonl
gs://export-bucket/example-folder/year=2025/month=04/day=13/consumer_project=admin-project/job=another-example-job/project=example-metadata-project/entrygroup=big-entry-group/2.jsonl
```

### Analyze the exported metadata in BigQuery

Create an external table for Hive partitioned data (https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage#create-external-table-partitioned) so you can query the export without loading or transforming it. Provide:

- **Select file from Cloud Storage bucket**: the path to the Cloud Storage folder that contains the exported files; use the asterisk (`*`) wildcard to include all files, for example `gs://export-bucket/example-folder/*`.
- **File format**: **JSONL (Newline delimited JSON)**.
- Select the **Source data partitioning** checkbox; for **Select Source URI Prefix**, provide the Cloud Storage URI prefix that defines partitions, for example `gs://export-bucket/example-folder/`.
- **Partition inference mode**: **Automatically infer types**.
- **Table type**: **External table**.
- **Schema**: click the **Edit as text** toggle, then enter this schema definition:

```json
[
  {
    "name": "entry",
    "type": "RECORD",
    "mode": "NULLABLE",
    "fields": [
      {
        "mode": "NULLABLE",
        "name": "name",
        "type": "STRING"
      },
      {
        "mode": "NULLABLE",
        "name": "entryType",
        "type": "STRING"
      },
      {
        "mode": "NULLABLE",
        "name": "createTime",
        "type": "STRING"
      },
      {
        "mode": "NULLABLE",
        "name": "updateTime",
        "type": "STRING"
      },
      {
        "mode": "NULLABLE",
        "name": "aspects",
        "type": "JSON"
      },
      {
        "mode": "NULLABLE",
        "name": "parentEntry",
        "type": "STRING"
      },
      {
        "mode": "NULLABLE",
        "name": "fullyQualifiedName",
        "type": "STRING"
      },
      {
        "mode": "NULLABLE",
        "name": "entrySource",
        "type": "RECORD",
        "fields": [
          {
            "mode": "NULLABLE",
            "name": "resource",
            "type": "STRING"
          },
          {
            "mode": "NULLABLE",
            "name": "system",
            "type": "STRING"
          },
          {
            "mode": "NULLABLE",
            "name": "platform",
            "type": "STRING"
          },
          {
            "mode": "NULLABLE",
            "name": "displayName",
            "type": "STRING"
          },
          {
            "mode": "NULLABLE",
            "name": "description",
            "type": "STRING"
          },
          {
            "mode": "NULLABLE",
            "name": "labels",
            "type": "JSON"
          },
          {
            "mode": "REPEATED",
            "name": "ancestors",
            "type": "RECORD",
            "fields": [
              {
                "mode": "NULLABLE",
                "name": "name",
                "type": "STRING"
              },
              {
                "mode": "NULLABLE",
                "name": "type",
                "type": "STRING"
              }
            ]
          },
          {
            "mode": "NULLABLE",
            "name": "createTime",
            "type": "STRING"
          },
          {
            "mode": "NULLABLE",
            "name": "updateTime",
            "type": "STRING"
          },
          {
            "mode": "NULLABLE",
            "name": "location",
            "type": "STRING"
          }
        ]
      }
    ]
  }
]
```

The table has an `entry` column (one row per entry; fields per `ImportItem`, https://docs.cloud.google.com/knowledge-catalog/docs/reference/rpc/google.cloud.dataplex.v1#google.cloud.dataplex.v1.ImportItem) plus the export file partitions from the path above. Query it with GoogleSQL, for example to see which entry types were exported:

```sql
SELECT entry.entryType FROM `example-project.example-dataset.example-table` LIMIT 1000
```

## Options / Props

### Job scope

Provide exactly one scope per job.

| Scope | Exports |
|---|---|
| Organization (`organizationLevel`) | The metadata that belongs to your organization. |
| Projects (`projects`) | The metadata that belongs to the specified projects. |
| Entry groups (`entryGroups`) | The metadata that belongs to the specified entry groups. |

You can further restrict the scope with `entry_types` or `aspect_types`; the job exports only entries and aspects that belong to those types.

### Required roles for end users

| Task | Role | Granted on |
|---|---|---|
| Create metadata export jobs | Dataplex Metadata Job Owner (`roles/dataplex.metadataJobOwner`) | The project that you run the metadata export job in |
| Create metadata export jobs | Dataplex Entry Group Exporter (`roles/dataplex.entryGroupExporter`) | The organization, the projects, or the entry groups that contain the metadata you want to export. For cross-project exports, grant it on the source projects or entry groups, rather than the project running the job. |
| Access the exported results | Storage Object Viewer (`roles/storage.objectViewer`) | The project or the bucket |
| View metadata jobs | Dataplex Metadata Job Viewer (`roles/dataplex.metadataJobViewer`) | The project |

### Required permissions

| Task | Permissions |
|---|---|
| Export metadata | `dataplex.metadataJobs.create`, `dataplex.entryGroups.export`, `dataplex.entryGroups.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list` |
| Access the exported results | `storage.objects.get` |

### Required permissions for the Knowledge Catalog service account

The Knowledge Catalog service account needs these permissions on the bucket: `storage.buckets.get`, `storage.objects.get`, and `storage.objects.create`.

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/export-metadata (retrieved 2026-11-19)
- The export is a snapshot of the metadata at the time the metadata job was created. The output file contents follow the same format as the metadata import file (see import-metadata.md), so an output file can be used directly as the input of a metadata import job.
- VPC Service Controls: the project that the job belongs to determines the perimeter. With organization-level scope, only entries within the perimeter are exported and projects in the organization but outside the perimeter are excluded. With projects or entry groups scope, they must be in the same perimeter as the job; if any violates the rules, the job fails.
- Path notes: the system-generated path starts with the standard Hive partition format for the job's creation date (supported by BigQuery). `consumer_project` is the project where you run the export job; `project` is the project that contains the exported metadata. A metadata job ID can be reused after the previous job was deleted, but deleting a job does not delete its exported files, so duplicate job IDs may appear in output paths. File numbers are integers starting from `1`; large exports are split into multiple files of at most 1,000,000 entries each.
- The curl and PowerShell commands are identical for all four scope examples in the official page, so they are shown once above. The official page shows REST only; it documents no gcloud command, and no list, cancel, or delete method, for export jobs (only `metadataJobs.get` is mentioned).
- The official request bodies are reproduced verbatim: they contain trailing commas and `#` placeholder comments (`# Additional projects`), which are not valid JSON. Remove them and replace the placeholders before saving `request.json`.

## Related

- [import-metadata.md](./import-metadata.md)
