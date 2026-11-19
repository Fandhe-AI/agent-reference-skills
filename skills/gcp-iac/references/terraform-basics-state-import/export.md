---
source: https://docs.cloud.google.com/docs/terraform/resource-management/export
---

# Export your Google Cloud resources into Terraform format

Preview. Generates Terraform HCL for resources in a project, folder, or organization with `gcloud beta resource-config bulk-export --resource-format=terraform`. Not supported on Windows operating systems.

## Signature / Usage

### Before you begin

```bash
export GOOGLE_CLOUD_PROJECT=PROJECT_ID
```

```bash
gcloud components install config-connector
```

If the component manager is disabled, run instead:

```bash
sudo apt-get install google-cloud-sdk-config-connector
```

```bash
gcloud services enable cloudasset.googleapis.com
```

```bash
gcloud beta services identity create --service=cloudasset.googleapis.com
```

Ensure the Cloud Asset Service Agent (`gcp-sa-cloudasset.iam.gserviceaccount.com`) has `roles/cloudasset.serviceAgent`:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-cloudasset.iam.gserviceaccount.com \
  --role=roles/cloudasset.serviceAgent
```

and `roles/storage.objectAdmin`:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-cloudasset.iam.gserviceaccount.com \
  --role=roles/storage.objectAdmin
```

### Export the entire project to the screen

```bash
gcloud beta resource-config bulk-export \
  --project=PROJECT_ID \
  --resource-format=terraform
```

### Write to a directory structure

```bash
mkdir OUTPUT_DIRECTORY
```

```bash
gcloud beta resource-config bulk-export \
 --path=OUTPUT_DIRECTORY \
 --project=PROJECT_ID \
 --resource-format=terraform
```

Each resource is written to its own `.tf` file under:

```text
OUTPUT_DIRECTORY/projects/PROJECT_ID/RESOURCE_TYPE
```

### Write to a single file

```bash
gcloud beta resource-config bulk-export \
  --resource-format=terraform \
  --project=PROJECT_ID \
  >> gcp_resources.tf
```

### Filter by resource type

```bash
gcloud beta resource-config list-resource-types
```

```bash
gcloud beta resource-config list-resource-types >> strings.txt
```

Compute Engine VMs are listed as `KRM KIND: ComputeInstance`; ignore the `KRM KIND:` prefix.

```bash
gcloud beta resource-config bulk-export \
  --resource-types=RESOURCE_TYPE \
  --project=PROJECT_ID \
  --resource-format=terraform
```

```bash
gcloud beta resource-config bulk-export \
  --resource-types=ComputeFirewall,ComputeInstance \
  --project=PROJECT_ID \
  --resource-format=terraform
```

### Use a file to specify the resource types

```bash
cd && mkdir tf-output && cd tf-output
```

`types.txt`:

```text
ComputeBackendBucket
ComputeBackendService
ComputeForwardingRule
```

```bash
gcloud beta resource-config bulk-export \
 --resource-types-file=types.txt \
 --path=tf-output \
 --project=PROJECT_ID \
 --resource-format=terraform
```

## Options / Props

### Required roles (on the organization, folder, or project)

| Role | When |
|------|------|
| `roles/serviceusage.serviceUsageConsumer` (Service Usage Consumer) | Always |
| `roles/storage.objectCreator` (Storage Object Creator) and `roles/storage.objectViewer` (Storage Object Viewer) | Writing state to an existing bucket (`--storage-path=BUCKET`) |
| `roles/storage.objectViewer` (Storage Object Viewer) | Writing state to a new bucket |

### Flags used

| Flag | Description |
|------|-------------|
| `--path` | Location to output the HCL code (directory) |
| `--project` | Project to export |
| `--resource-format=terraform` | Export as Terraform HCL (the gcloud help says the command defaults to `krm`) |
| `--resource-types` | Resource types to output |
| `--resource-types-file` | File with a list of resource types |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" and available "as is" with possibly limited support. Not supported on Windows operating systems.
- Some resource types the Terraform Google provider supports cannot be exported to Terraform format; run `gcloud beta resource-config list-resource-types` for the supported list.
- If the project has none of a requested resource type, the command succeeds but outputs nothing for it.
- The gcloud 593.0.0 help for `bulk-export` describes `--resource-types` as a "List of Config Connector KRM Kinds to export" and says `--resource-format` defaults to `krm`.
- Troubleshooting: the error "Permission denied during export. Please ensure the Cloud Asset Inventory API is enabled." means the Before you begin steps were not completed.
- Source inconsistency: the file-based example runs `cd && mkdir tf-output && cd tf-output` and then `--path=tf-output` from inside that directory, which points at `~/tf-output/tf-output`; the gcloud 593.0.0 help describes `--path` only as the "Path of the directory or file to output configuration(s)" and does not say whether a missing directory is created.
- `gcloud resource-config` and Cloud Asset Inventory are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/docs/terraform/resource-management/export (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [import.md](./import.md)
