---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerydatatransfer
---

# BigQuery Data Transfer Service IAM roles and permissions

## Signature / Usage

Predefined roles of `bigquerydatatransfer` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### BigQuery Data Transfer Service Agent (`roles/bigquerydatatransfer.serviceAgent`)

- Gives BigQuery Data Transfer Service access to start BigQuery jobs in consumer project. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (41): `bigquery.config.get`, `bigquery.connections.delegate`, `bigquery.jobs.create`, `cloudaicompanion.operations.get`, `cloudaicompanion.topics.create`, `compute.networkAttachments.get`, `compute.networkAttachments.update`, `compute.regionOperations.get`, `compute.subnetworks.use`, `dataform.folders.create`, `dataform.locations.get`, `dataform.locations.list`, `dataform.repositories.create`, `dataform.repositories.list`, `datalineage.locations.importLineage`, `datalineage.operations.get`, `dataplex.entryGroups.get`, `dataplex.entryGroups.useContactsAspect`, `dataplex.entryGroups.useDataProfileAspect`, `dataplex.entryGroups.useDatabaseDataPolicyAspect`, `dataplex.entryGroups.useManagedConnectorTypes`, `dataplex.entryGroups.useMySQLConnectorTypes`, `dataplex.entryGroups.useOracleConnectorTypes`, `dataplex.entryGroups.useOverviewAspect`, `dataplex.entryGroups.usePostgreSQLConnectorTypes`, `dataplex.entryGroups.useSQLAccessAspect`, `dataplex.entryGroups.useSQLServerConnectorTypes`, `dataplex.entryGroups.useSQLTriggersAspect`, `dataplex.entryGroups.useSchemaAspect`, `dataplex.entryGroups.useSecondaryIndexesAspect`, `dataplex.entryGroups.useStorageAspect`, `dataplex.metadataJobs.create`, `dataplex.metadataJobs.get`, `dataplex.metadataJobs.list`, `geminidataanalytics.locations.chat`, `iam.serviceAccounts.getAccessToken`, `logging.logEntries.create`, `logging.logEntries.route`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.use`

### Example: inspect a role

Generated example (not in the official docs) describing the first role on this page; every role on this page is a service agent role, which is granted to the service agent by Google Cloud and must not be granted to users:

```bash
gcloud iam roles describe roles/bigquerydatatransfer.serviceAgent
```

## Notes

- Roles and permissions of the `bigquerydatatransfer` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/bigquerydatatransfer (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
