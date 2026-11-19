---
source: https://docs.cloud.google.com/infrastructure-manager/docs/view-deployments
---

# View deployments and revisions

List deployments in a project and location, describe a deployment (state and the Terraform version in `tfVersion`), list revisions, and describe a revision. Needs `roles/config.admin` or `roles/config.viewer`.

## Signature / Usage

### List deployments in a project and location

```bash
gcloud infra-manager deployments list --project PROJECT_ID --location "LOCATION"
```

### View details of a deployment

```bash
gcloud infra-manager deployments describe projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID
```

### List revisions in a deployment

```bash
gcloud infra-manager revisions list --deployment=projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID
```

### View details of a revision

```bash
gcloud infra-manager revisions describe projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID/revisions/REVISION_ID
```

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Project ID where Infrastructure Manager runs |
| `LOCATION` | Location of the deployments (see the locations page) |
| `DEPLOYMENT_ID` | Deployment identifier of the deployment you are viewing |
| `REVISION_ID` | Revision identifier |

## Notes

- Deployments are specific to a project and location.
- The deployment state shows whether it succeeded, failed, or had issues such as a partial deployment. Possible states are listed in the REST reference `State` (deployments: https://docs.cloud.google.com/infrastructure-manager/docs/reference/rest/v1/projects.locations.deployments#State; revisions: https://docs.cloud.google.com/infrastructure-manager/docs/reference/rest/v1/projects.locations.deployments.revisions#state).
- The Terraform version used appears next to `tfVersion` in the describe output.
- A revision's state also identifies the service account last used, which deleting a deployment depends on.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/view-deployments (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-resources.md](./view-resources.md)
- [troubleshoot-deployments.md](./troubleshoot-deployments.md)
- [deployments-revisions.md](./deployments-revisions.md)
