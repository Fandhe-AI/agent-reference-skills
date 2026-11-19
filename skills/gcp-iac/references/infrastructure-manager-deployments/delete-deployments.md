---
source: https://docs.cloud.google.com/infrastructure-manager/docs/delete-deployments
---

# Delete a deployment

Deleting a deployment removes its metadata, configuration copy and state. You choose whether to delete the provisioned resources or keep (abandon) them.

## Signature / Usage

Caution from the source: deleting Google Cloud resources can cause unrecoverable data loss; re-deploying the configuration won't restore data. Try this on a disposable project first.

### Delete the deployment and the provisioned resources

Optionally list the resources first:

```bash
gcloud infra-manager resources list --revision=projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID/revisions/REVISION_ID
```

Preview the deletion (see https://docs.cloud.google.com/infrastructure-manager/docs/preview-deployment-deletion), then delete:

```bash
gcloud infra-manager deployments delete projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID
```

### Delete the deployment and keep the provisioned resources

```bash
gcloud infra-manager deployments delete projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID \
    --delete-policy=abandon
```

## Options / Props

| Flag | Values |
|---|---|
| `--delete-policy` | `abandon` (abandon resources, delete only deployment metadata), `delete` (delete resources actuated by the deployment), `delete-policy-unspecified` (gcloud 593.0.0 help) |

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Project ID where Infrastructure Manager runs |
| `LOCATION` | Location where Infra Manager runs |
| `DEPLOYMENT_ID` | Deployment identifier |
| `REVISION_ID` | Revision identifier |

## Notes

- Irreversible: without `--delete-policy=abandon` the command deletes the provisioned resources. With `abandon`, Infra Manager can no longer identify or manage the kept resources.
- Prerequisites: `roles/config.admin`; the service account last used to create or update the deployment must still be valid (Infra Manager deletes with it) and have permissions to delete the resources in the specified projects and locations; the Terraform configuration used for the deployment must still be valid.
- To find the last used service account, view the state of a revision (view-deployments.md).
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/delete-deployments (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-resources.md](./view-resources.md)
- [view-deployments.md](./view-deployments.md)
- [configure-service-account.md](./configure-service-account.md)
