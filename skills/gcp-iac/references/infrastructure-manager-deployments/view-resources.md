---
source: https://docs.cloud.google.com/infrastructure-manager/docs/view-resources
---

# View resources provisioned by a deployment

List, filter, sort and describe the Google Cloud resources a revision provisioned. The state file records resources as provisioned; later changes made outside an Infra Manager revision (for example in the Console) are not known to Infra Manager.

## Signature / Usage

### List resources of a revision

```bash
gcloud infra-manager resources list --revision=projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID/revisions/REVISION_ID
```

### Filter

```bash
gcloud infra-manager resources list --revision=projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID/revisions/REVISION_ID --filter=EXPRESSION
```

### Sort

Adapted (not in the official docs): `[FIELD]` brackets are replaced with a plain `FIELD` placeholder because brackets in the source are gcloud synopsis notation; use a comma-separated list for several fields.

```bash
gcloud infra-manager resources list --revision=projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID/revisions/REVISION_ID --sort-by=FIELD
```

### Describe one resource

```bash
gcloud infra-manager resources describe projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID/revisions/REVISION_ID/resources/RESOURCE_ID
```

## Options / Props

### Supported `--filter` expressions

| Field | Type / values |
|---|---|
| `terraformInfo.address` | string |
| `terraformInfo.type` | string |
| `terraformInfo.id` | string |
| `state` | string, one of: `STATE_UNSPECIFIED`, `PLANNED`, `IN_PROGRESS`, `RECONCILED`, `FAILED` |
| `intent` | string, one of: `INTENT_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`, `RECREATE`, `UNCHANGED` |
| `caiAssets.fullResourceName` | map |
| `caiAssets.type` | map |

### Supported `--sort-by` fields

| Field |
|---|
| `name` |
| `terraformInfo.address` |
| `terraformInfo.type` |
| `terraformInfo.id` |

## Notes

- Needs `roles/config.admin` or `roles/config.viewer` and a service account exists.
- Example from the source: a load balancer deployed by Infra Manager and then modified in the Console; Infra Manager has information only about the load balancer as initially provisioned.
- Adapted from the official docs: the source shows `--sort-by=[FIELD]`; the `[...]` is gcloud help notation for a list, so the example uses `--sort-by=FIELD`.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/view-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-deployments.md](./view-deployments.md)
- [state-file.md](./state-file.md)
- [delete-deployments.md](./delete-deployments.md)
