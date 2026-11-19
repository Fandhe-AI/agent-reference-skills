---
source: https://docs.cloud.google.com/infrastructure-manager/docs/export-view-preview-results
---

# Export and view preview results

Export a preview's results (binary plan file and JSON representation), review them with Terraform CLI or JSON tools, and list resource drifts and resource changes with the Infra Manager API.

## Signature / Usage

### Export the results

A preview must be in state `SUCCEEDED` or `STALE` to be exported.

```bash
gcloud infra-manager previews export projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID
```

### Review the binary plan file

Install the Terraform CLI, make sure the configuration used to create the preview is present locally and initialized with `terraform init`, then print the plan with `terraform show` (see the import page for a full example that downloads the plan to `tfplan.out`).

### View resource drift

```bash
gcloud infra-manager resource-drifts list --preview=projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID
```

```bash
gcloud infra-manager resource-drifts describe projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID/resourceDrifts/RESOURCE_DRIFT_ID
```

### View resource changes

```bash
gcloud infra-manager resource-changes list --preview=projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID
```

```bash
gcloud infra-manager resource-changes describe projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID/resourceChanges/RESOURCE_CHANGE_ID
```

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Project where Infrastructure Manager runs / where the preview is located. |
| `LOCATION` | Location of the preview. |
| `PREVIEW_ID` | Preview identifier. |
| `RESOURCE_DRIFT_ID` | Identifier of the drift. |
| `RESOURCE_CHANGE_ID` | Identifier of the resource change. |

## Notes

- Required IAM role to export previews: `roles/config.admin`.
- Results are exported in two formats: the binary plan file and the JSON representation. To review the binary plan you need the Terraform configuration stored locally and `terraform init` run on it.
- For the JSON representation use an IDE or tools like jq. To enforce policy constraints you can use the JSON representation with tools like Terraform vet (the `terraform-policy-validation` category of this skill).
- Infra Manager resource drifts are structured versions of `resource_drift` in the `terraform plan` JSON representation; resource changes are structured versions of `resource_changes`.
- Resource drift lets you verify that changes to your configurations are intended and summarize how the deployment will change when updated with a particular preview.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/export-view-preview-results (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [preview-deployment.md](./preview-deployment.md)
- [list-preview.md](./list-preview.md)
- [import-resources.md](./import-resources.md)
