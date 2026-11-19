---
source: https://docs.cloud.google.com/knowledge-catalog/docs/iam-roles
---

# Knowledge Catalog IAM roles

Predefined and custom IAM roles for Knowledge Catalog (formerly Dataplex Universal Catalog). Roles can be applied to projects, lakes, zones and assets, data scans, tasks and environments, entry groups, entry types, entry link types, aspect types and glossaries, and data taxonomies, data attributes and data attribute bindings.

## Signature / Usage

### Grant a catalog role on an entry group

Adapted (not in the official docs): the role is `roles/dataplex.catalogViewer`; the gcloud help example's `roles/dataplex.viewer` has no `dataplex.entryGroups.*` permissions and excludes catalog resources.

```bash
gcloud dataplex entry-groups add-iam-policy-binding \
    test-entry-group --project=test-project --location=us-central1 \
    --role=roles/dataplex.catalogViewer --member=user:foo@gmail.com
```

### Connectors

- To view connector configurations and run history: BigQuery User (`roles/bigquery.user`) and Dataplex Viewer (`roles/dataplex.viewer`).
- To create, edit, delete or manually run connector configurations: BigQuery Admin (`roles/bigquery.admin`) and Dataplex Administrator (`roles/dataplex.admin`) or Dataplex Editor (`roles/dataplex.editor`).
- Grant the BigQuery Data Transfer Service service agent (`service-PROJECT_NUMBER@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`) the `dataplex.entryGroups.import` permission or Dataplex Entry Group Importer (`roles/dataplex.entryGroupImporter`), at project or entry group level.

## Options / Props

### Broad roles

| Role | Description |
|---|---|
| Dataplex Administrator (`roles/dataplex.admin`) | Full access to Knowledge Catalog resources, except catalog resources such as entries and entry groups. Exceptions: includes `dataplex.entryGroups.createContextSet`, `dataplex.entryLinks.*` and `dataplex.entries.link`. |
| Dataplex Editor (`roles/dataplex.editor`) | Write access, except catalog resources such as entries, entry groups and glossaries. Exception: includes `dataplex.entryGroups.createContextSet`. |
| Dataplex Viewer (`roles/dataplex.viewer`) | Read access, except catalog resources such as entries, entry groups and glossaries. Contains the `dataplex.*.get` and `dataplex.*.list` style permissions. |
| Dataplex Developer (`roles/dataplex.developer`) | Run data analytics workloads in a lake (`dataplex.content.*`, `dataplex.environments.execute`, `dataplex.environments.get`, `dataplex.environments.list`, `dataplex.tasks.*` except get-policy permissions). |

### Catalog roles

| Role | Description |
|---|---|
| Dataplex Catalog Admin (`roles/dataplex.catalogAdmin`) | Full access to catalog resources, including entries, entry groups and glossaries (aspect types, change requests, entries, entry groups, entry link types, entry links, entry types, glossaries, categories and terms). |
| Dataplex Catalog Editor (`roles/dataplex.catalogEditor`) | Write access to catalog resources including entries, entry groups and glossaries. Cannot set IAM policies on resources. |
| Dataplex Catalog Viewer (`roles/dataplex.catalogViewer`) | Read access to catalog resources including entries, entry groups and glossaries. Can view IAM policies on catalog resources. |
| Dataplex Entry Group Owner (`roles/dataplex.entryGroupOwner`) | Owns entry groups and the entries inside them. |
| Dataplex Entry and EntryLink Owner (`roles/dataplex.entryOwner`) | Owns metadata entries and entry links. |
| Dataplex Entry Group Exporter (`roles/dataplex.entryGroupExporter`) | Export an entry group for metadata job processing: `dataplex.entryGroups.export`, `dataplex.entryGroups.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`. |
| Dataplex Entry Group Importer (`roles/dataplex.entryGroupImporter`) | Import an entry group for metadata job processing: `dataplex.entryGroups.get`, `dataplex.entryGroups.import`, `resourcemanager.projects.get`, `resourcemanager.projects.list`. |
| Dataplex Aspect Type Owner (`roles/dataplex.aspectTypeOwner`) | Create and manage aspect types (`dataplex.aspectTypes.*` including `dataplex.aspectTypes.use`). Does not give the right to create or modify entries. |
| Dataplex Aspect Type User (`roles/dataplex.aspectTypeUser`) | Use aspect types to create or modify entries with the corresponding aspects: `dataplex.aspectTypes.get`, `dataplex.aspectTypes.list`, `dataplex.aspectTypes.use` (plus `dataplex.projects.search`, `dataplex.dataDomains.discover`, `datacatalog.migrationConfig.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`). |
| Dataplex Entry Type Owner (`roles/dataplex.entryTypeOwner`) | Create and manage entry types (`dataplex.entryTypes.*`). Does not give the right to create or modify entries. |
| Dataplex Entry Type User (`roles/dataplex.entryTypeUser`) | Use entry types to create or modify entries of those types: `dataplex.entryTypes.get`, `dataplex.entryTypes.list`, `dataplex.entryTypes.listEffectiveTags`, `dataplex.entryTypes.listTagBindings`, `dataplex.entryTypes.use` (plus search, discover, project read permissions). |
| Dataplex Entry Link Type Owner (`roles/dataplex.entryLinkTypeOwner`) | Create and manage entry link types (`dataplex.entryLinkTypes.*`). Does not give the right to create or modify entry links. |
| Dataplex Entry Link Type User (`roles/dataplex.entryLinkTypeUser`) | Use entry link types to create entry links of those types: `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinkTypes.use` (plus search, discover, project read permissions). |
| Dataplex Metadata Feed Owner (`roles/dataplex.metadataFeedOwner`) | Create and manage metadata feeds (`dataplex.metadataFeeds.*`). Does not give the right to create or modify entry groups. |
| Dataplex Metadata Feed Viewer (`roles/dataplex.metadataFeedViewer`) | `dataplex.metadataFeeds.get`, `dataplex.metadataFeeds.list`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`. |
| Dataplex Metadata Job Owner (`roles/dataplex.metadataJobOwner`) | Create and manage metadata jobs (`dataplex.metadataJobs.cancel`, `.create`, `.get`, `.list`). Does not give the right to create or modify entry groups. |
| Dataplex Metadata Job Viewer (`roles/dataplex.metadataJobViewer`) | `dataplex.metadataJobs.get`, `dataplex.metadataJobs.list`, `dataplex.operations.get`, project read permissions. |
| Dataplex Encryption Admin (`roles/dataplex.encryptionAdmin`) | Manage encryption configurations (`dataplex.encryptionConfig.create`, `.delete`, `.get`, `.list`, `.update`, plus `dataplex.operations.get`, `dataplex.operations.list`). |
| Dataplex Workflow Admin (Beta, `roles/dataplex.workflowAdmin`) | Full access to change requests in approval workflows: `dataplex.changeRequests.adminDelete`, `.delete`, `.get`, `.list`, `.use`. |
| Dataplex Workflow Approver (Beta, `roles/dataplex.workflowApprover`) | Approve, reject or revoke change requests: `dataplex.changeRequests.get`, `.list`, `.use`. |
| Dataplex Change Request Owner (Beta, `roles/dataplex.changeRequestOwner`) | Permissions on a created change request: `dataplex.changeRequests.delete`, `.get`, `.update`. |

### Context set roles (Knowledge Studio)

| Role | Description |
|---|---|
| Dataplex Content Creator (`roles/dataplex.contentCreator`) | Create new context sets in a project: `dataplex.entryGroups.createContextSet`, `dataplex.entryGroups.list`, project read permissions. |
| Dataplex Content Viewer (`roles/dataplex.contentViewer`) | Discover context sets without access to the underlying context entries: `dataplex.entryGroups.getContextSet`, project read permissions. |
| Dataplex Content User (`roles/dataplex.contentUser`) | Read context entries and documentation in specific context sets and submit feedback or modification proposals: `dataplex.entries.getContext`, `dataplex.entries.listContext`, `dataplex.entryGroups.getContextSet`, `dataplex.entryGroups.requestContextChanges`, project read permissions. |
| Dataplex Content Editor (`roles/dataplex.contentEditor`) | Modify context entries, author guidelines and update curation specifications without administrative IAM sharing or container deletion. |
| Dataplex Content Admin (`roles/dataplex.contentAdmin`) | Full lifecycle ownership, IAM sharing (`getIamPolicy` / `setIamPolicy`), context entry management, curation specification updates and deletion on a context set. |

### Data domains and data products

| Role | Description |
|---|---|
| Dataplex Data Domain Admin (Beta, `roles/dataplex.dataDomainAdmin`) | Full management of the data domain and its bindings. |
| Dataplex Data Domain Configuration Editor (Beta, `roles/dataplex.dataDomainEditor`) | Update the data domain and fully manage its bindings. |
| Dataplex Data Domain Entry Reader (Beta, `roles/dataplex.dataDomainEntryReader`) | Discover and view the data domain, its subdomains and the metadata of its resources: `dataplex.dataDomains.discover`, `.get`, `.list`, `.lookupEntry`. |
| Dataplex Data Domain Configuration Viewer (Beta, `roles/dataplex.dataDomainViewer`) | View the configuration of the data domain and its bindings. |
| Dataplex Data Products Admin (`roles/dataplex.dataProductsAdmin`) | Full access to data products (`dataplex.dataAssets.*`, `dataplex.dataProducts.*`). |
| Dataplex Data Products Editor (`roles/dataplex.dataProductsEditor`) | Write access to data products (includes `dataplex.dataProducts.approve`). |
| Dataplex Data Products Viewer (`roles/dataplex.dataProductsViewer`) | Read access: `dataplex.dataAssets.get`, `.list`, `dataplex.dataProducts.get`, `.getIamPolicy`, `.list`. |
| Dataplex Data Products Consumer (`roles/dataplex.dataProductsConsumer`) | Restricted read access for consumers: `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataProducts.get`. |

### Data scans

| Role | Description |
|---|---|
| Dataplex DataScan Administrator (`roles/dataplex.dataScanAdmin`) | Full access to DataScan resources (`dataplex.datascans.*`, `dataplex.agentTasks.*`). |
| Dataplex DataScan Creator (`roles/dataplex.dataScanCreator`) | Create new DataScan resources: `dataplex.datascans.create`, `.get`, `.list`, `dataplex.agentTasks.create`, `.get`, `.list`, `dataplex.operations.get`. |
| Dataplex DataScan Editor (`roles/dataplex.dataScanEditor`) | Write access to DataScan resources. |
| Dataplex DataScan DataViewer (`roles/dataplex.dataScanDataViewer`) | Read access to DataScan resources, including the results (`dataplex.datascans.getData`). |
| Dataplex DataScan Viewer (`roles/dataplex.dataScanViewer`) | Read access to DataScan resources, excluding the results: `dataplex.datascans.get`, `.getIamPolicy`, `.list`, `dataplex.agentTasks.get`, `.getIamPolicy`, `.list`. |

### Lake, data, taxonomy and metadata-entity roles

| Role | Description |
|---|---|
| Dataplex Data Owner (`roles/dataplex.dataOwner`) | Owner access to data; grant on lake, zone or asset only. `dataplex.assets.ownData`, `.readData`, `.writeData`. |
| Dataplex Data Reader (`roles/dataplex.dataReader`) | Read-only access to data; grant on lake, zone or asset only. `dataplex.assets.readData`. |
| Dataplex Data Writer (`roles/dataplex.dataWriter`) | Write access to data; grant on lake, zone or asset only. `dataplex.assets.writeData`. |
| Dataplex Metadata Reader (`roles/dataplex.metadataReader`) | Read-only access to metadata within table and fileset entities and partitions (`dataplex.assets`, `entities`, `partitions`, `zones` get and list). |
| Dataplex Metadata Writer (`roles/dataplex.metadataWriter`) | Write and read access to metadata within table and fileset entities and partitions. |
| Dataplex Binding Administrator (`roles/dataplex.bindingAdmin`) | Full access to DataAttribute binding resources (`dataplex.dataAttributeBindings.*`). |
| Dataplex Security Administrator (`roles/dataplex.securityAdmin`) | `dataplex.dataTaxonomies.configureDataAccess`, `dataplex.dataTaxonomies.configureResourceAccess` (ResourceAccess and DataAccess specs on data attributes). |
| Dataplex Taxonomy Administrator (`roles/dataplex.taxonomyAdmin`) | Full access to DataTaxonomy and DataAttribute resources. |
| Dataplex Taxonomy Viewer (`roles/dataplex.taxonomyViewer`) | Read access: `dataplex.dataAttributes.get`, `.getIamPolicy`, `.list`, `dataplex.dataTaxonomies.get`, `.getIamPolicy`, `.list`. |
| Dataplex Storage Data Owner / Reader / Writer (`roles/dataplex.storageDataOwner`, `roles/dataplex.storageDataReader`, `roles/dataplex.storageDataWriter`) | Data access on managed resources (Cloud Storage buckets, BigQuery datasets). Should not be used directly; Dataplex grants them to managed resources. |

### Service agent roles

| Role | Description |
|---|---|
| Cloud Dataplex Service Agent (`roles/dataplex.serviceAgent`) | Gives the Dataplex service account access to project resources, used in data discovery, data management and data workload management. |
| Dataplex Discovery Service Agent (`roles/dataplex.discoveryServiceAgent`) | Bucket read permissions: `storage.buckets.get`, `storage.objects.get`, `storage.objects.list`. |
| Dataplex Discovery Publishing Service Agent (`roles/dataplex.discoveryPublishingServiceAgent`) | Dataset create and get: `bigquery.datasets.create`, `bigquery.datasets.get`. |
| Dataplex Discovery BigLake Publishing Service Agent (`roles/dataplex.discoveryBigLakePublishingServiceAgent`) | Use a BigQuery connection: `bigquery.connections.delegate`, `bigquery.connections.use`. |

### Data lineage roles

| Role | Description |
|---|---|
| Data Lineage Administrator (`roles/datalineage.admin`) | Full access to all resources in the Data Lineage API (`datalineage.*`, including `datalineage.configs.get` / `update` and `datalineage.locations.importLineage`). |
| Data Lineage Editor (`roles/datalineage.editor`) | Edit access to all resources in the Data Lineage API (events, processes, process revisions, runs, `processOpenLineageMessage`, `searchLinks`). |
| Data Lineage Viewer (`roles/datalineage.viewer`) | Read access: `datalineage.events.get`, `.getFields`, `.list`, `datalineage.locations.searchLinks`, `datalineage.processRevisions.get`, `.list`, `datalineage.processes.get`, `.list`, `datalineage.runs.get`, `.list`. |
| Data Lineage Events Producer (`roles/datalineage.producer`) | Create resources in the Data Lineage API: `datalineage.events.create`, `datalineage.locations.processOpenLineageMessage`, `datalineage.processRevisions.insert`, `datalineage.processes.create`, `.get`, `.markAsDeleted`, `.update`, `datalineage.runs.create`, `.get`, `.update`. |

### Agent Identity roles (Preview)

| Role | Description |
|---|---|
| Agent Identity Admin (`roles/agentidentity.admin`) | Full access to manage Agent Identity auth providers and credentials. |
| Agent Identity Viewer (`roles/agentidentity.viewer`) | Read-only access to view Agent Identity auth providers. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/iam-roles (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entry-groups/add-iam-policy-binding (gcloud 593.0.0 help); the page itself has no fenced code. The example grants only the read-only `roles/dataplex.catalogViewer`.
- Adapted from the official docs: the gcloud help example binds `roles/dataplex.viewer` on an entry group; IAM `dataplex.md.txt`: `roles/dataplex.viewer` is read access "except for catalog resources like entries, entry groups, and glossaries", while `roles/dataplex.catalogViewer` has `dataplex.entryGroups.get/list`, `dataplex.entries.get/list`, `dataplex.aspectTypes.get/list`, so the example binds `roles/dataplex.catalogViewer`.
- The source lists the full permission set of every role; this page keeps role IDs, descriptions and the permissions of narrow roles. For the permission list of broad roles (admin, editor, viewer, catalog roles, owners, service agent), see the source page and the IAM `dataplex` roles reference.
- Admin / Editor / Viewer (`roles/dataplex.admin`, `roles/dataplex.editor`, `roles/dataplex.viewer`) do not provide general access to metadata resources (entry groups, entries, entry links, entry types, entry link types, aspect types, glossaries). Use the Catalog roles for those. `roles/dataplex.admin` and `roles/dataplex.editor` are broad; prefer narrower catalog roles where possible.
- Agent Identity roles are Preview: subject to the "Pre-GA Offerings Terms"; features are available "as is" and might have limited support. They manage third-party auth providers for Knowledge Studio enrichment workflows. Beta roles are labeled Beta in the source.
- Service agent roles must only be granted to service agents, not to other principals.
- `roles/dataplex.dataOwner`, `roles/dataplex.dataReader`, `roles/dataplex.dataWriter` apply to resources managed by Knowledge Catalog (lake, zone, asset) and its children. `roles/dataplex.dataReader` includes all permissions of `roles/dataplex.metadataReader` plus permissions to read the actual data.
- Entry and EntryLink Owner (`roles/dataplex.entryOwner`): full access to entry and entry-link operations (excluding the Knowledge Studio `dataplex.entries.*Context` permissions); can add aspects of some system aspect types (`Schema`, `Generic`, `Overview`, `Contacts`) to entries and `SchemaJoin` to entry links; can create `GenericEntry` entries and `schema-join` links. Creating an entry with an entry type and aspect type requires them to be in the same project as the entry; otherwise also grant `roles/dataplex.entryTypeUser` and `roles/dataplex.aspectTypeUser` on the projects where those types are defined. It does not grant read access to entries created from Google Cloud resources outside Knowledge Catalog (for example BigQuery entries) via `LookupEntry`, `SearchEntries` or `ModifyEntry`; use `GetEntry` / `UpdateEntry`, or the metadata read / update permissions on the source resources.
- Role considerations: no role grants permission to add or delete entries in system-defined entry groups such as `@bigquery` and `@dataplex`. To view data aspects of an entry you also need permission to read data from the source asset; otherwise Knowledge Catalog hides the content of the attached data aspects. Catalog Admin and Catalog Editor can view custom entries.
- QueryData database context sets (`dataplex.contextSetGroups.*`, `dataplex.contextSets.*`, `dataplex.context.*`): Catalog Viewer can view, list and download; Catalog Editor and Catalog Admin manage them. These catalog roles do not grant access to Knowledge Studio entry-group context sets (`dataplex.entryGroups.*ContextSet`, `dataplex.entryGroups.requestContextChanges`, `dataplex.entries.*Context`); use the Content roles.
- `SearchEntries` requires at least one of Catalog Admin, Catalog Editor or Catalog Viewer on the project used in the API request; permissions on results are checked independently of that project.
- Lineage: to view lineage you need Data Lineage Viewer (`roles/datalineage.viewer`) on both the active project (where you view lineage) and the compute project (where lineage is recorded; the project of the job that generated it), or on the folder or organization. Without it the API and console show no lineage or an error, so absence of lineage does not mean none exists. To see the SQL of a BigQuery process you need `bigquery.jobs.get`; for a BigQuery view definition `bigquery.tables.get`. Asset metadata needs a viewer role on the system resource or Catalog Viewer on the project storing the entry. Assets in an organization you are not a member of may not return metadata.
- The BigQuery roles and permissions themselves are covered by `gcp-bigquery`; IAM in general by `gcp-foundation`.

## Related

- [iam-and-access-control.md](./iam-and-access-control.md)
- [upgrade-dataplex-universal-catalog.md](./upgrade-dataplex-universal-catalog.md)
