---
source: https://docs.cloud.google.com/config-connector/docs/how-to/import-export/bulk-export
---

# Bulk importing and exporting existing Google Cloud resources

`config-connector bulk-export` uses Cloud Asset Inventory export to discover existing resources and writes Config Connector YAML you can import. You can supply an Asset Inventory export or let the tool perform the export. Asset Inventory exports JSON structures with each resource's name, asset type and ancestors (projects, folders, organization).

## Signature / Usage

### Prerequisites

Install the `config-connector` tool. To export directly from Cloud Asset Inventory, enable the API:

```bash
gcloud services enable cloudasset.googleapis.com
```

### Example: export one topic and import it

```bash
gcloud pubsub topics create sample-topic
```

```bash
TOPIC_RESOURCE_NAME=$(gcloud pubsub topics describe sample-topic --format "value(name)")
```

```bash
TOPIC_ASSET='{"name":"//pubsub.googleapis.com/'"${TOPIC_RESOURCE_NAME}"'","asset_type":"pubsub.googleapis.com/Topic"}'
```

Adapted (not in the official docs): `${TOPIC_ASSET}` is quoted so it is passed as one argument.

```bash
echo "${TOPIC_ASSET}" | config-connector bulk-export
```

Output (`PROJECT_ID` is replaced with your project):

```text
---
apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
kind: PubSubTopic
metadata:
  annotations:
    cnrm.cloud.google.com/project-id: PROJECT_ID
  name: sample-topic
...
```

Pass it to Config Connector (`CC_NAMESPACE` is the namespace Config Connector manages resources from), which acquires the resource:

Adapted (not in the official docs): `${TOPIC_ASSET}` is quoted so it is passed as one argument.

```bash
echo "${TOPIC_ASSET}" | config-connector bulk-export | kubectl apply -f -  --namespace CC_NAMESPACE
```

```bash
kubectl describe pubsubtopic sample-topic --namespace CC_NAMESPACE
```

Clean up (deletes the topic through Config Connector):

Adapted (not in the official docs): `${TOPIC_ASSET}` is quoted so it is passed as one argument.

```bash
echo "${TOPIC_ASSET}" | config-connector bulk-export | kubectl delete -f - --namespace CC_NAMESPACE
```

### Import from an existing export

```bash
config-connector bulk-export --input ASSET_INVENTORY_EXPORT
```

```bash
cat export.json | config-connector bulk-export
```

Filter an export to `PubSubTopic` assets only (`EXPORT_FILE` is the export file):

```bash
cat EXPORT_FILE | jq '. | select( .asset_type == "pubsub.googleapis.com/Topic" )' | config-connector bulk-export
```

### Export a project, folder or organization

```bash
config-connector bulk-export --project PROJECT_ID
```

```bash
config-connector bulk-export --folder FOLDER_NUMBER
```

```bash
config-connector bulk-export --organization ORGANIZATION_ID
```

With a specific temporary bucket:

```bash
config-connector bulk-export --storage-key gs://BUCKET_NAME
```

### Write one file per resource

```bash
config-connector bulk-export --project PROJECT_ID --on-error continue --output OUTPUT_DIRECTORY/
```

### Command-line options

```text
config-connector bulk-export
    --input FILENAME \
    --output FILENAME \
    --storage-key gs://BUCKET_NAME \
    --project PROJECT_ID \
    --folder FOLDER_NUMBER \
    --organization ORGANIZATION_ID \
    --oauth2-token TOKEN \
    --on-error [halt | continue | ignore] \
    --iam-format [policy | policymember | none] \
    --filter-deleted-iam-members [true | false] \
    --verbose
```

## Options / Props

| Flag | Values | Description |
|------|--------|-------------|
| `--input` | file | Cloud Asset Inventory input file. |
| `--output` | file or directory | Output path that disables standard output. A directory path must end in `/`; one file per resource, named after the resource. A single file is used if it is an existing regular file, or does not exist and its parent directory does. |
| `--storage-key` | `gs://BUCKET_NAME` or full object path | Temporary Cloud Storage bucket for the export. A bucket-only URI generates the object name; a full path is used as given. |
| `--project`, `--folder`, `--organization` | project ID, folder number, organization ID | Scope to export. |
| `--oauth2-token` | OAuth2 token | Defaults to the Google Cloud CLI credentials. |
| `--on-error` | `halt` (default), `continue`, `ignore` | `halt` stops on any error; `continue` keeps going and prints the error to STDERR; `ignore` keeps going silently. |
| `--iam-format` | `policy` (default), `policymember`, `none` | Kind of IAM resources output. |
| `--filter-deleted-iam-members` | `true`, `false` (default `false`) | Filter out deleted IAM principals. |
| `--verbose` | flag | Verbose logging. |

## Notes

- Not all resources support `bulk-export`; run `config-connector print-resources`.
- If you lack permission for every resource and see `error converting asset`, retry with `--on-error continue` (the source's note writes `-on-error continue`; its command-line options list and examples use `--on-error`).
- `--oauth2-token TOKEN` puts the token on the command line, where it can appear in shell history and process lists; by default the tool uses the Google Cloud CLI credentials.
- Without `--storage-key`, the tool creates a temporary bucket in the `US` multi-region and deletes it when the export completes.
- Delete operations (`kubectl delete`) remove the Google Cloud resource unless its deletion policy is `abandon`; try the example on a disposable project first.
- Corrected from the official docs: the three pipelines used unquoted `echo ${TOPIC_ASSET}`; they are written `echo "${TOPIC_ASSET}"` so the JSON is passed as one argument.
- Cloud Asset Inventory itself (exports to Cloud Storage, supported asset types) is in `gcp-foundation`.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/import-export/bulk-export (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [import-export-overview.md](./import-export-overview.md)
- [export.md](./export.md)
