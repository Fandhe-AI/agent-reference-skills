---
source: https://docs.cloud.google.com/infrastructure-manager/docs/list-preview
---

# List and view previews

List the previews in a location and view the details of one preview, including its state and the Terraform version Infrastructure Manager used.

## Signature / Usage

### List previews

```bash
gcloud infra-manager previews list --location=LOCATION
```

### View details of a preview

```bash
gcloud infra-manager previews describe \
    projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID
```

## Options / Props

| Placeholder | Description |
|---|---|
| `LOCATION` | Location that contains the previews (see Infrastructure Manager locations). |
| `PROJECT_ID` | Project ID where Infrastructure Manager runs. |
| `PREVIEW_ID` | Preview identifier. |

## Notes

- Required IAM role to view previews: `roles/config.admin`.
- The describe output includes the state of the preview (successful, failed, or had issues) and the Terraform version used to create it.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/list-preview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [preview-deployment.md](./preview-deployment.md)
- [export-view-preview-results.md](./export-view-preview-results.md)
- [delete-preview.md](./delete-preview.md)
