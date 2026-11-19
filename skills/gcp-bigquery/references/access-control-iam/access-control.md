---
source: https://docs.cloud.google.com/bigquery/docs/access-control
---

# BigQuery IAM roles and permissions

Predefined IAM roles and permissions for BigQuery and its related services: Connection API, continuous queries, Data Policy, Data Transfer Service, Engine for Apache Flink, Migration Service, Omni and BigQuery sharing (formerly Analytics Hub). The source lists the full permission set of every role; this page keeps role IDs, descriptions, where each role can be granted, and the permission names. For the per-role permission lists use the IAM roles and permissions index.

## Signature / Usage

### Grant a predefined role on a dataset

```sql
GRANT `roles/bigquery.dataViewer` ON SCHEMA `myProject`.myDataset
TO "user:raha@example-pet-store.com", "user:sasha@example-pet-store.com"
```

## Options / Props

### BigQuery roles

| Role | ID | Description / where it can be granted |
|------|----|----------------------------------------|
| BigQuery Admin | `roles/bigquery.admin` | Manage all resources and data in the project; can cancel other users' jobs. Granting on a dataset or lower-level resource is possible but not recommended; typically granted at the project level. |
| BigQuery Connection Admin | `roles/bigquery.connectionAdmin` | `bigquery.connections.*`. Connection, or Resource Manager resources. |
| BigQuery Connection User | `roles/bigquery.connectionUser` | `bigquery.connections.get`, `getIamPolicy`, `list`, `use`. Connection, or Resource Manager resources. |
| BigQuery Data Editor | `roles/bigquery.dataEditor` | On a dataset: create, update, get, list, delete tables and views; read (query), export, replicate, update table data; indexes; snapshots; all permissions for routines and models. Mapped to the `WRITER` basic role. Dataset, table, view, routine (not models), or Resource Manager resources. At project level it can also create and list datasets. |
| BigQuery Data Owner | `roles/bigquery.dataOwner` | On a dataset: all permissions for the dataset and its tables, views, models, routines. On a table or view: all permissions, all row access policy permissions except overriding time travel restrictions, set categories and column-level data policies. Mapped to the `OWNER` basic role. Not grantable on models; do not grant on a routine (Data Editor is less permissive). |
| BigQuery Data Viewer | `roles/bigquery.dataViewer` | On a dataset: get metadata and permissions, list tables, views, models, get (query), replicate, export table data, create snapshots, list and invoke routines. Mapped to the `READER` basic role. Not grantable on models. |
| BigQuery Job User | `roles/bigquery.jobUser` | Run jobs, including queries, within the project. Resource Manager resources only. |
| BigQuery Metadata Viewer | `roles/bigquery.metadataViewer` | Get metadata and access controls for datasets, tables, views; get metadata of models and routines; list them. Not grantable on models. |
| BigQuery Read Session User | `roles/bigquery.readSessionUser` | Create and use read sessions. Resource Manager resources only. |
| BigQuery Resource Admin | `roles/bigquery.resourceAdmin` | Administer workloads: slot assignments, commitments, reservations. Resource Manager resources only. |
| BigQuery Resource Editor | `roles/bigquery.resourceEditor` | Manage workloads, but not create or modify slot commitments. Resource Manager resources only. |
| BigQuery Resource Viewer | `roles/bigquery.resourceViewer` | View workloads; cannot create or modify slot reservations or commitments. Resource Manager resources only. |
| BigQuery Studio Admin | `roles/bigquery.studioAdmin` | Combination of BigQuery Admin, Dataform Admin, Notebook Runtime Admin and Dataproc Serverless Editor. Granting on lower-level resources is possible but not recommended; typically granted at the project level. |
| BigQuery Studio User | `roles/bigquery.studioUser` | Combination of BigQuery Job User, BigQuery Read Session User, Dataform Code Creator, Notebook Runtime User and Dataproc Serverless Editor. Saved query, data canvas, data preparation, pipeline, repository, or Resource Manager resources. |
| BigQuery User | `roles/bigquery.user` | On a dataset: read metadata and list tables. On a project: also run jobs and queries, list and cancel own jobs, enumerate datasets, create datasets (the creator gets `roles/bigquery.dataOwner` on them). Dataset, routine, or Resource Manager resources. |
| BigQuery Filtered Data Viewer | `roles/bigquery.filteredDataViewer` | View filtered table data defined by a row access policy. System-managed: grant it through row-level access policies, not directly through IAM. |
| BigQuery ObjectRef Admin | `roles/bigquery.objectRefAdmin` | Administer ObjectRef resources (read and write). Connection, or Resource Manager resources. |
| BigQuery ObjectRef Reader | `roles/bigquery.objectRefReader` | Read referenced objects via ObjectRefs. Connection, or Resource Manager resources. |
| BigQuery Authorized Routine Admin (Beta) | `roles/bigquery.routineAdmin` | Authorized routine: administer supported resources. |
| BigQuery Authorized Routine Data Editor (Beta) | `roles/bigquery.routineDataEditor` | Authorized routine: edit contents of supported resources. |
| BigQuery Authorized Routine Data Viewer (Beta) | `roles/bigquery.routineDataViewer` | Authorized routine: view data and contents of supported resources. |
| BigQuery Authorized Routine Metadata Viewer (Beta) | `roles/bigquery.routineMetadataViewer` | Authorized routine: view metadata of supported resources. |
| BigQuery Security Admin (Beta) | `roles/bigquery.securityAdmin` | Administer all BigQuery security controls. |

### Related-service roles

| Role | ID | Description |
|------|----|-------------|
| BigQuery Data Policy Admin | `roles/bigquerydatapolicy.admin` | Manage data policies. Resource Manager resources only. |
| BigQuery Data Policy Editor | `roles/bigquerydatapolicy.editor` | Editor of data policies. |
| BigQuery Data Policy Viewer | `roles/bigquerydatapolicy.viewer` | View data policies. Resource Manager resources only. |
| Masked Reader | `roles/bigquerydatapolicy.maskedReader` | Masked read access to sub-resources tagged by the policy tag associated with a data policy (for example columns). Resource Manager resources only. |
| Raw Data Reader (Beta) | `roles/bigquerydatapolicy.rawDataReader` | Raw read access to sub-resources associated with a data policy. Resource Manager resources only. |
| Managed Flink Admin (Beta) | `roles/managedflink.admin` | Full access to Managed Flink resources. |
| Managed Flink Viewer (Beta) | `roles/managedflink.viewer` | Read-only access. |
| Managed Flink Developer (Beta) | `roles/managedflink.developer` | Full access to jobs and sessions, read access to deployments. |
| Bigquerymigration Admin | `roles/bigquerymigration.admin` | Admin role for bigquerymigration. |
| MigrationWorkflow Editor | `roles/bigquerymigration.editor` | Editor of EDW migration workflows. |
| MigrationWorkflow Viewer | `roles/bigquerymigration.viewer` | Viewer of EDW migration workflows. |
| Migration Management Editor (Beta) | `roles/bigquerymigration.migrationEditor` | Admin of EDW migrations. |
| Migration Management Viewer (Beta) | `roles/bigquerymigration.migrationViewer` | Viewer of EDW migrations. |
| Task Orchestrator | `roles/bigquerymigration.orchestrator` | Orchestrator of EDW migration tasks. |
| Migration Translation User | `roles/bigquerymigration.translationUser` | User of the interactive SQL translation service. |
| Task Worker | `roles/bigquerymigration.worker` | Executes EDW migration subtasks. |
| Analytics Hub Admin | `roles/analyticshub.admin` | Administer data exchanges and listings. |
| Analytics Hub Editor | `roles/analyticshub.editor` | Editor role. |
| Analytics Hub Viewer | `roles/analyticshub.viewer` | Browse data exchanges and listings. |
| Analytics Hub Listing Admin | `roles/analyticshub.listingAdmin` | Full control over the listing, including updating, deleting and setting ACLs. |
| Analytics Hub Publisher | `roles/analyticshub.publisher` | Publish to data exchanges, creating listings. |
| Analytics Hub Subscriber | `roles/analyticshub.subscriber` | Browse data exchanges and subscribe to listings. |
| Analytics Hub Subscription Owner | `roles/analyticshub.subscriptionOwner` | Full control over the subscription, including updating and deleting. |

### Service agent roles

Do not grant service agent roles to any principals except service agents.

| Role | ID |
|------|----|
| Connected Sheets Service Agent | `roles/bigquery.connectedSheetsServiceAgent` |
| BigQuery Connection Service Agent | `roles/bigqueryconnection.serviceAgent` |
| BigQuery Continuous Query Service Agent | `roles/bigquerycontinuousquery.serviceAgent` |
| BigQuery Data Transfer Service Agent | `roles/bigquerydatatransfer.serviceAgent` |
| Managed Flink Service Agent | `roles/managedflink.serviceAgent` |
| BigQuery Migration Service Agent | `roles/bigquerymigration.serviceAgent` |
| BigQuery Omni Service Agent | `roles/bigqueryomni.serviceAgent` |
| Analytics Hub Service Agent | `roles/analyticshub.serviceAgent` |

### BigQuery permissions

Each permission applies to a particular resource type. The Connection API, continuous queries, Data Policy, Data Transfer Service and Omni sections of the source list no permissions of their own.

| Resource | Permissions (prefix `bigquery.<resource>.`) |
|----------|----------------------------------------------|
| `bireservations` | `get`, `update` |
| `capacityCommitments` | `create`, `delete`, `get`, `list`, `update` |
| `config` | `get`, `update` |
| `connections` | `create`, `delegate`, `delete`, `get`, `getIamPolicy`, `list`, `setIamPolicy`, `update`, `updateTag`, `use` |
| `dataPolicies` | `attach`, `create`, `delete`, `get`, `getIamPolicy`, `getRawData`, `list`, `maskedGet`, `setIamPolicy`, `update` |
| `datasets` | `create`, `createTagBinding`, `delete`, `deleteTagBinding`, `get`, `getIamPolicy`, `link`, `listEffectiveTags`, `listSharedDatasetUsage`, `listTagBindings`, `setIamPolicy`, `update`, `updateTag` |
| `jobs` | `create`, `createGlobalQuery`, `delete`, `get`, `list`, `listAll`, `listExecutionMetadata`, `update` |
| `models` | `create`, `delete`, `export`, `getData`, `getMetadata`, `list`, `updateData`, `updateMetadata`, `updateTag` |
| `objectRefs` | `read`, `write` |
| `propertyGraphs` | `create`, `delete`, `get`, `list`, `update` |
| `readsessions` | `create`, `getData`, `update` |
| `reservationAssignments` | `create`, `delete`, `list`, `search` |
| `reservationGroups` | `create`, `delete`, `get`, `list`, `update` |
| `reservations` | `create`, `delete`, `get`, `getIamPolicy`, `list`, `listFailoverDatasets`, `setIamPolicy`, `update`, `use` |
| `routines` | `create`, `delete`, `get`, `list`, `update`, `updateTag` |
| `rowAccessPolicies` | `create`, `delete`, `get`, `getFilteredData`, `getIamPolicy`, `list`, `overrideTimeTravelRestrictions`, `setIamPolicy`, `update` |
| `savedqueries` | `create`, `delete`, `get`, `list`, `update` |
| `tables` | `create`, `createIndex`, `createSnapshot`, `createTagBinding`, `delete`, `deleteIndex`, `deleteSnapshot`, `deleteTagBinding`, `export`, `get`, `getData`, `getIamPolicy`, `list`, `listEffectiveTags`, `listTagBindings`, `replicateData`, `restoreSnapshot`, `setCategory`, `setColumnDataPolicy`, `setIamPolicy`, `update`, `updateData`, `updateIndex`, `updateTag` |
| `transfers` | `get`, `update` |

### Other services' permissions

| Prefix | Permissions |
|--------|-------------|
| `managedflink.deployments.` | `create`, `delete`, `get`, `list`, `update` |
| `managedflink.jobs.` | `create`, `delete`, `get`, `list`, `update` |
| `managedflink.sessions.` | `create`, `delete`, `get`, `list`, `update` |
| `managedflink.locations.` | `get`, `list` |
| `managedflink.operations.` | `cancel`, `delete`, `get`, `list` |
| `bigquerymigration.` | `subtasks.get`, `subtasks.list`, `translation.translate`, `workflows.create`, `workflows.delete`, `workflows.enableAiOutputTypes`, `workflows.enableLineageOutputTypes`, `workflows.enableOutputTypePermissions`, `workflows.get`, `workflows.list`, `workflows.orchestrateTask`, `workflows.update` |
| `analyticshub.dataExchanges.` | `create`, `delete`, `get`, `getIamPolicy`, `list`, `setIamPolicy`, `subscribe`, `update`, `viewSubscriptions` |
| `analyticshub.listings.` | `create`, `delete`, `get`, `getIamPolicy`, `list`, `setIamPolicy`, `subscribe`, `update`, `viewSubscriptions` |
| `analyticshub.queryTemplates.` | `approve`, `create`, `delete`, `get`, `list`, `update` |
| `analyticshub.subscriptions.` | `create`, `delete`, `get`, `list`, `update` |

### Permissions for BigQuery ML tasks

| Permissions | Task |
|-------------|------|
| `bigquery.jobs.create` `bigquery.models.create` `bigquery.models.getData` `bigquery.models.updateData` | Create a new model using `CREATE MODEL` |
| `bigquery.jobs.create` `bigquery.models.create` `bigquery.models.getData` `bigquery.models.updateData` `bigquery.models.updateMetadata` | Replace an existing model using `CREATE OR REPLACE MODEL` |
| `bigquery.models.delete` | Delete a model using the `models.delete` API |
| `bigquery.jobs.create` `bigquery.models.delete` | Delete a model using `DROP MODEL` |
| `bigquery.models.getMetadata` | Get model metadata using the `models.get` API |
| `bigquery.models.list` | List models and metadata using the `models.list` API |
| `bigquery.models.updateMetadata` | Update model metadata (the source links `models.delete`). If setting or updating a non-zero expiration time for a model, `bigquery.models.delete` is also needed |
| `bigquery.jobs.create` `bigquery.models.getData` | Evaluation, prediction and model / feature inspection with `ML.EVALUATE`, `ML.PREDICT`, `ML.TRAINING_INFO`, `ML.WEIGHTS` |
| `bigquery.jobs.create` `bigquery.models.export` | Export a model |
| `bigquery.models.updateTag` | Update Data Catalog tags for a model |

## Notes

- New permissions can be added to predefined roles and new predefined roles can be added at any time; use custom roles if definitions must stay unchanged.
- Opens: `roles/bigquery.admin` and `roles/bigquery.studioAdmin` cover all project resources; the source recommends them only at project level.
- The source also lists, per role, every permission (including `dataform.*`, `dataplex.*`, `developerconnect.*`, `cloudaicompanion.*`, `aiplatform.*`, `dataproc.*` entries) and, per permission, every role and basic role that holds it. These tables are omitted here; use the IAM roles and permissions index.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language (first `GRANT` example; the source twin has no code).
- Source: https://docs.cloud.google.com/bigquery/docs/access-control (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-intro.md](./access-control-intro.md)
- [dataset-access-control.md](./dataset-access-control.md)
- [conditions.md](./conditions.md)
