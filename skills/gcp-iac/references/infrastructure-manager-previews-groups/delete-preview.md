---
source: https://docs.cloud.google.com/infrastructure-manager/docs/delete-preview
---

# Delete a preview

Deleting a preview deletes the preview's metadata only. Previews are automatically deleted if they target a deployment and that deployment is updated or deleted.

## Signature / Usage

```bash
gcloud infra-manager previews delete projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID
```

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Project ID where Infrastructure Manager runs. |
| `LOCATION` | Location where Infra Manager runs (see Infrastructure Manager locations). |
| `PREVIEW_ID` | Preview identifier of the preview. |

## Notes

- Required IAM role to delete previews: `roles/config.admin`.
- This deletes preview metadata, not a deployment or its resources. Deleting a preview cannot be undone; try it on a disposable project first.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/delete-preview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [preview-deployment.md](./preview-deployment.md)
- [list-preview.md](./list-preview.md)
