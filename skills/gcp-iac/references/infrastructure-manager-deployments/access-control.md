---
source: https://docs.cloud.google.com/infrastructure-manager/docs/access-control
---

# Infrastructure Manager access control with IAM

Infra Manager uses IAM. Grant the predefined Infra Manager roles to the service account that calls Infra Manager. A service account is not required just to view deployments, revisions and IAM policies. The account also needs permissions for the resources defined in the Terraform configuration.

## Signature / Usage

```bash
gcloud projects add-iam-policy-binding INFRA_MANAGER_PROJECT_ID \
   --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
   --role="roles/config.agent"
```

## Options / Props

### Predefined roles

| Role | Description |
|---|---|
| Infra Manager Admin (`roles/config.admin`) | For a user, full control to Infra Manager resources |
| Infra Manager Service Agent (`roles/config.agent`) | Provide access to a service account to work with Infra Manager, including deployments, revisions, logging, and Terraform state files. |
| Infra Manager Service Account (`roles/cloudconfig.serviceAgent`) | Created automatically in the project when you enable the API and granted this role for the project's resources. It uses the role only as required to create, manage or delete deployments and revisions. |
| Infra Manager Viewer (`roles/config.viewer`) | Read deployments, revisions, and IAM policies. |

### Permissions of `roles/config.admin`

| Group | Permissions |
|---|---|
| deployments | `config.deployments.create` `config.deployments.delete` `config.deployments.deleteState` `config.deployments.get` `config.deployments.getIamPolicy` `config.deployments.getLock` `config.deployments.getState` `config.deployments.list` `config.deployments.lock` `config.deployments.setIamPolicy` `config.deployments.unlock` `config.deployments.update` `config.deployments.updateState` |
| deployment groups | `config.deploymentgroups.create` `config.deploymentgroups.update` `config.deploymentgroups.delete` `config.deploymentgroups.get` `config.deploymentgroups.list` `config.deploymentgroups.provision` `config.deploymentgroups.deprovision` `config.deploymentgrouprevisions.get` `config.deploymentgrouprevisions.list` |
| auto-migration | `config.automigrationconfig.get` `config.automigrationconfig.update` |
| previews | `config.previews.create` `config.previews.delete` `config.previews.get` `config.previews.list` `config.previews.export` `config.previews.upload` |
| locations / operations | `config.locations.get` `config.locations.list` `config.operations.cancel` `config.operations.delete` `config.operations.get` `config.operations.list` |
| resources | `config.resources.get` `config.resources.list` `config.resourcechanges.get` `config.resourcechanges.list` `config.resourcedrifts.get` `config.resourcedrifts.list` |
| revisions / other | `config.revisions.get` `config.revisions.getState` `config.revisions.list` `config.artifacts.import` `config.terraformversions.get` `config.terraformversions.list` `resourcemanager.projects.get` `resourcemanager.projects.list` |

### Permissions of `roles/config.agent`

`storage.buckets.get` `storage.buckets.list` `storage.buckets.create` `storage.buckets.update` `storage.buckets.delete` `storage.objects.get` `storage.objects.list` `storage.objects.create` `storage.objects.update` `storage.objects.delete` `logging.logEntries.create` `config.deployments.getState` `config.deployments.updateState` `config.deployments.deleteState` `config.deployments.getLock` `config.previews.upload` `config.artifacts.import` `config.revisions.getState` `cloudbuild.connections.list` `cloudbuild.repositories.accessReadToken` `cloudbuild.repositories.list` `cloudquotas.quotas.get` `monitoring.timeSeries.list`

### Permissions of `roles/cloudconfig.serviceAgent`

`cloudbuild.builds.get` `cloudbuild.builds.list` `cloudbuild.builds.create` `cloudbuild.builds.update` `cloudbuild.workerpools.use` `iam.serviceAccounts.actAs` `iam.serviceAccounts.getAccessToken` `logging.logEntries.create` `logging.logEntries.route` `serviceusage.services.use` `storage.buckets.get` `storage.buckets.list` `storage.buckets.create` `storage.buckets.update` `storage.buckets.delete` `storage.objects.get` `storage.objects.list` `storage.objects.create` `storage.objects.update` `storage.objects.delete`

### Permissions of `roles/config.viewer`

`config.deployments.get` `config.deployments.getIamPolicy` `config.deployments.list` `config.deploymentgroups.get` `config.deploymentgroups.list` `config.deploymentgrouprevisions.get` `config.deploymentgrouprevisions.list` `config.previews.get` `config.previews.list` `config.locations.get` `config.locations.list` `config.operations.get` `config.operations.list` `config.resources.get` `config.resources.list` `config.revisions.get` `config.revisions.list` `config.terraformversions.get` `config.terraformversions.list` `resourcemanager.projects.get` `resourcemanager.projects.list`

### Basic roles that include Infra Manager roles

| Role | Includes role |
|---|---|
| Viewer | `roles/config.viewer` |
| Owner | `roles/config.admin` |

## Notes

- The basic Viewer and Owner roles also include Infra Manager permissions, but the source recommends predefined roles to comply with the security principle of least privilege. Owner is a broad basic role; avoid it.
- Permissions needed to call each method are listed in the REST API reference (https://docs.cloud.google.com/infrastructure-manager/docs/reference/rest).
- The tables above are copied from the access-control page. The IAM roles and permissions reference (https://docs.cloud.google.com/iam/docs/roles-permissions/config, retrieved 2026-11-19) lists 62 permissions for `roles/config.admin` and 28 for `roles/config.viewer`: it adds tag-binding permissions (for example `config.deployments.createTagBinding`, `config.deployments.listEffectiveTags` and the same for `deploymentgroups` and `previews`) and, for the viewer, `config.automigrationconfig.get`. It also lists a Cloud Infrastructure Manager Editor role (`roles/config.editor`); `roles/cloudconfig.serviceAgent` does not appear there.
- Permissions for the resources in the Terraform configuration are in addition to those above. IAM in general is in `gcp-foundation`.
- Snippet taken from https://docs.cloud.google.com/infrastructure-manager/docs/configure-service-account (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/access-control (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-service-account.md](./configure-service-account.md)
- [deploy-resources.md](./deploy-resources.md)
