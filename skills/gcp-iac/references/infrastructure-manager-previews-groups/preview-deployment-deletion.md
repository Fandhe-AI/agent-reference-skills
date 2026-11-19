---
source: https://docs.cloud.google.com/infrastructure-manager/docs/preview-deployment-deletion
---

# Preview the deletion of a deployment

Before you delete an Infrastructure Manager deployment, create a preview in DELETE mode to review the resources planned to be deleted. A preview runs `terraform plan` and does not delete any provisioned resources.

## Signature / Usage

Adapted (not in the official docs): the source's command passes a `previews/...` path to `--deployment`, ends with a dangling `\`, and omits the preview resource name. `--deployment` takes the deployment reference, and the preview name is the positional argument.

```bash
gcloud infra-manager previews create projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID \
    --preview-mode DELETE \
    --deployment=projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID \
    --service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT
```

## Options / Props

| Placeholder / flag | Description |
|---|---|
| `PROJECT_ID` | Project ID where Infrastructure Manager runs. |
| `LOCATION` | Location where Infra Manager runs (see Infrastructure Manager locations). |
| `PREVIEW_ID` | Preview identifier you specify. |
| `SERVICE_ACCOUNT` | Name of the service account used to call Infra Manager. |
| `SERVICE_ACCOUNT_PROJECT_ID` | Project ID of the service account; commonly the same project where Infra Manager runs. |
| `DEPLOYMENT_ID` | Identifier of the deployment whose deletion you preview. |
| `--preview-mode` | gcloud help: "Preview mode to set it to either default or delete." |

## Notes

- Required IAM role: `roles/config.admin`. You need a service account with the needed permissions, and the configuration must comply with the Infra Manager Terraform constraints (including no sensitive data).
- Corrected from the official docs: the source shows `--deployment=projects/PROJECT_ID/locations/LOCATION/previews/DEPLOYMENT_ID`, a trailing `\` after `--service-account`, and no `PREVIEW_ID` argument although the replacement list defines `PREVIEW_ID`. With that form gcloud 593.0.0 stops with "Error parsing [location]" (the help says the location comes from the positional `PREVIEW` or `--location`). The command above passes the positional preview name and a `deployments/` path for `--deployment`, the form used on the import-resources page (`--deployment projects/PROJECT_ID/locations/us-central1/deployments/import-deployment`).
- A preview does not delete anything. Deleting the deployment (and its resources) is a separate, destructive step (see Delete deployments in the Infrastructure Manager docs); try it on a disposable project first.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/preview-deployment-deletion (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [preview-deployment.md](./preview-deployment.md)
- [export-view-preview-results.md](./export-view-preview-results.md)
- [delete-preview.md](./delete-preview.md)
