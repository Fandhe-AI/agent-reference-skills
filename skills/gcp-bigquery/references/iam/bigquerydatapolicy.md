---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerydatapolicy
---

# BigQuery Data Policy IAM roles and permissions

## Signature / Usage

Predefined roles of `bigquerydatapolicy` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### BigQuery Data Policy Admin (`roles/bigquerydatapolicy.admin`)

- Role for managing Data Policies in BigQuery This role can only be granted on Resource Manager resources (projects, folders, and organizations).
- Permissions (8): `bigquery.dataPolicies.attach`, `bigquery.dataPolicies.create`, `bigquery.dataPolicies.delete`, `bigquery.dataPolicies.get`, `bigquery.dataPolicies.getIamPolicy`, `bigquery.dataPolicies.list`, `bigquery.dataPolicies.setIamPolicy`, `bigquery.dataPolicies.update`

#### BigQuery Data Policy Editor (`roles/bigquerydatapolicy.editor`)

- Editor role for BigQuery Data Policy
- Permissions (100): `bigquery.bireservations.get`, `bigquery.bireservations.update`, `bigquery.capacityCommitments.get`, `bigquery.capacityCommitments.list`, `bigquery.capacityCommitments.update`, `bigquery.config.get`, `bigquery.config.update`, `bigquery.connections.create`, `bigquery.connections.delete`, `bigquery.connections.get`, `bigquery.connections.getIamPolicy`, `bigquery.connections.list`, `bigquery.connections.update`, `bigquery.connections.updateTag`, `bigquery.connections.use`, `bigquery.dataPolicies.attach`, `bigquery.dataPolicies.create`, `bigquery.dataPolicies.delete`, `bigquery.dataPolicies.get`, `bigquery.dataPolicies.getIamPolicy`, `bigquery.dataPolicies.list`, `bigquery.dataPolicies.update`, `bigquery.datasets.create`, `bigquery.datasets.get`, `bigquery.datasets.getIamPolicy`, `bigquery.datasets.listEffectiveTags`, `bigquery.datasets.listTagBindings`, `bigquery.datasets.updateTag`, `bigquery.jobs.create`, `bigquery.jobs.createGlobalQuery`, `bigquery.jobs.delete`, `bigquery.jobs.get`, `bigquery.jobs.list`, `bigquery.jobs.listExecutionMetadata`, `bigquery.models.create`, `bigquery.models.delete`, `bigquery.models.export`, `bigquery.models.getData`, `bigquery.models.getMetadata`, `bigquery.models.list`, `bigquery.models.updateData`, `bigquery.models.updateMetadata`, `bigquery.models.updateTag`, `bigquery.objectRefs.read`, `bigquery.objectRefs.write`, `bigquery.propertyGraphs.create`, `bigquery.propertyGraphs.delete`, `bigquery.propertyGraphs.get`, `bigquery.propertyGraphs.list`, `bigquery.propertyGraphs.update`, `bigquery.readsessions.create`, `bigquery.readsessions.getData`, `bigquery.readsessions.update`, `bigquery.reservationAssignments.create`, `bigquery.reservationAssignments.delete`, `bigquery.reservationAssignments.list`, `bigquery.reservationAssignments.search`, `bigquery.reservationGroups.create`, `bigquery.reservationGroups.delete`, `bigquery.reservationGroups.get`, `bigquery.reservationGroups.list`, `bigquery.reservationGroups.update`, `bigquery.reservations.create`, `bigquery.reservations.delete`, `bigquery.reservations.get`, `bigquery.reservations.getIamPolicy`, `bigquery.reservations.list`, `bigquery.reservations.listFailoverDatasets`, `bigquery.reservations.update`, `bigquery.reservations.use`, `bigquery.routines.create`, `bigquery.routines.delete`, `bigquery.routines.get`, `bigquery.routines.list`, `bigquery.routines.update`, `bigquery.routines.updateTag`, `bigquery.rowAccessPolicies.create`, `bigquery.rowAccessPolicies.delete`, `bigquery.rowAccessPolicies.get`, `bigquery.rowAccessPolicies.getIamPolicy`, `bigquery.rowAccessPolicies.list`, `bigquery.rowAccessPolicies.update`, `bigquery.savedqueries.create`, `bigquery.savedqueries.delete`, `bigquery.savedqueries.get`, `bigquery.savedqueries.list`, `bigquery.savedqueries.update`, `bigquery.tables.createIndex`, `bigquery.tables.createSnapshot`, `bigquery.tables.deleteIndex`, `bigquery.tables.getIamPolicy`, `bigquery.tables.listEffectiveTags`, `bigquery.tables.listTagBindings`, `bigquery.tables.replicateData`, `bigquery.tables.restoreSnapshot`, `bigquery.tables.updateIndex`, `bigquery.transfers.get`, `bigquery.transfers.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### BigQuery Data Policy Viewer (`roles/bigquerydatapolicy.viewer`)

- Role for viewing Data Policies in BigQuery This role can only be granted on Resource Manager resources (projects, folders, and organizations).
- Permissions (2): `bigquery.dataPolicies.get`, `bigquery.dataPolicies.list`

#### Masked Reader (`roles/bigquerydatapolicy.maskedReader`)

- Masked read access to sub-resources tagged by the policy tag associated with a data policy, for example, BigQuery columns This role can only be granted on Resource Manager resources (projects, folders, and organizations).
- Permissions (1): `bigquery.dataPolicies.maskedGet`

#### Raw Data Reader (`roles/bigquerydatapolicy.rawDataReader`)

- Launch stage: Beta
- Raw read access to sub-resources associated with a data policy, for example, BigQuery columns This role can only be granted on Resource Manager resources (projects, folders, and organizations).
- Permissions (1): `bigquery.dataPolicies.getRawData`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/bigquerydatapolicy.admin"
```

## Notes

- Roles and permissions of the `bigquerydatapolicy` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerydatapolicy (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
