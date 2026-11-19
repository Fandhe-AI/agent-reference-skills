---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/dataplex
---

# Knowledge Catalog IAM roles and permissions (part 1/3)

## Signature / Usage

Predefined roles of `dataplex` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Dataplex Administrator (`roles/dataplex.admin`)

- Full access to Dataplex Universal Catalog resources, except for catalog resources like entries and entry groups.
- Permissions (203): `cloudasset.assets.analyzeIamPolicy`, `cloudasset.assets.searchAllIamPolicies`, `cloudasset.assets.searchAllResources`, `dataplex.agentTasks.create`, `dataplex.agentTasks.delete`, `dataplex.agentTasks.get`, `dataplex.agentTasks.getData`, `dataplex.agentTasks.getIamPolicy`, `dataplex.agentTasks.list`, `dataplex.agentTasks.run`, `dataplex.agentTasks.setIamPolicy`, `dataplex.agentTasks.update`, `dataplex.assetActions.list`, `dataplex.assets.create`, `dataplex.assets.delete`, `dataplex.assets.get`, `dataplex.assets.getIamPolicy`, `dataplex.assets.list`, `dataplex.assets.setIamPolicy`, `dataplex.assets.update`, `dataplex.changeRequests.adminDelete`, `dataplex.changeRequests.delete`, `dataplex.changeRequests.get`, `dataplex.changeRequests.getIamPolicy`, `dataplex.changeRequests.list`, `dataplex.changeRequests.setIamPolicy`, `dataplex.changeRequests.update`, `dataplex.changeRequests.use`, `dataplex.content.create`, `dataplex.content.delete`, `dataplex.content.get`, `dataplex.content.getIamPolicy`, `dataplex.content.list`, `dataplex.content.setIamPolicy`, `dataplex.content.update`, `dataplex.dataAssets.create`, `dataplex.dataAssets.delete`, `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataAssets.update`, `dataplex.dataAttributeBindings.create`, `dataplex.dataAttributeBindings.delete`, `dataplex.dataAttributeBindings.get`, `dataplex.dataAttributeBindings.getIamPolicy`, `dataplex.dataAttributeBindings.list`, `dataplex.dataAttributeBindings.setIamPolicy`, `dataplex.dataAttributeBindings.update`, `dataplex.dataAttributes.bind`, `dataplex.dataAttributes.create`, `dataplex.dataAttributes.delete`, `dataplex.dataAttributes.get`, `dataplex.dataAttributes.getIamPolicy`, `dataplex.dataAttributes.list`, `dataplex.dataAttributes.setIamPolicy`, `dataplex.dataAttributes.update`, `dataplex.dataDomainBindings.create`, `dataplex.dataDomainBindings.delete`, `dataplex.dataDomainBindings.get`, `dataplex.dataDomainBindings.list`, `dataplex.dataDomains.create`, `dataplex.dataDomains.delete`, `dataplex.dataDomains.discover`, `dataplex.dataDomains.get`, `dataplex.dataDomains.getIamPolicy`, `dataplex.dataDomains.list`, `dataplex.dataDomains.lookupEntry`, `dataplex.dataDomains.modifyEntry`, `dataplex.dataDomains.setIamPolicy`, `dataplex.dataDomains.update`, `dataplex.dataProducts.approve`, `dataplex.dataProducts.create`, `dataplex.dataProducts.delete`, `dataplex.dataProducts.get`, `dataplex.dataProducts.getIamPolicy`, `dataplex.dataProducts.list`, `dataplex.dataProducts.setIamPolicy`, `dataplex.dataProducts.update`, `dataplex.dataTaxonomies.configureDataAccess`, `dataplex.dataTaxonomies.configureResourceAccess`, `dataplex.dataTaxonomies.create`, `dataplex.dataTaxonomies.delete`, `dataplex.dataTaxonomies.get`, `dataplex.dataTaxonomies.getIamPolicy`, `dataplex.dataTaxonomies.list`, `dataplex.dataTaxonomies.setIamPolicy`, `dataplex.dataTaxonomies.update`, `dataplex.datascans.cancel`, `dataplex.datascans.create`, `dataplex.datascans.delete`, `dataplex.datascans.get`, `dataplex.datascans.getData`, `dataplex.datascans.getIamPolicy`, `dataplex.datascans.list`, `dataplex.datascans.run`, `dataplex.datascans.setIamPolicy`, `dataplex.datascans.update`, `dataplex.entities.create`, `dataplex.entities.delete`, `dataplex.entities.get`, `dataplex.entities.list`, `dataplex.entities.update`, `dataplex.entries.link`, `dataplex.entryGroups.createContextSet`, `dataplex.entryGroups.createTagBinding`, `dataplex.entryGroups.deleteTagBinding`, `dataplex.entryGroups.export`, `dataplex.entryGroups.import`, `dataplex.entryGroups.listEffectiveTags`, `dataplex.entryGroups.listTagBindings`, `dataplex.entryGroups.requestChanges`, `dataplex.entryGroups.useContextEntryLink`, `dataplex.entryGroups.useDefinitionEntryLink`, `dataplex.entryGroups.useRelatedEntryLink`, `dataplex.entryGroups.useSchemaJoinEntryLink`, `dataplex.entryGroups.useSynonymEntryLink`, `dataplex.entryLinks.create`, `dataplex.entryLinks.delete`, `dataplex.entryLinks.get`, `dataplex.entryLinks.reference`, `dataplex.entryLinks.update`, `dataplex.entryTypes.createTagBinding`, `dataplex.entryTypes.deleteTagBinding`, `dataplex.entryTypes.listEffectiveTags`, `dataplex.entryTypes.listTagBindings`, `dataplex.environments.create`, `dataplex.environments.delete`, `dataplex.environments.execute`, `dataplex.environments.get`, `dataplex.environments.getIamPolicy`, `dataplex.environments.list`, `dataplex.environments.setIamPolicy`, `dataplex.environments.update`, `dataplex.glossaries.create`, `dataplex.glossaries.delete`, `dataplex.glossaries.get`, `dataplex.glossaries.getIamPolicy`, `dataplex.glossaries.import`, `dataplex.glossaries.list`, `dataplex.glossaries.requestChanges`, `dataplex.glossaries.setIamPolicy`, `dataplex.glossaries.update`, `dataplex.glossaryCategories.create`, `dataplex.glossaryCategories.delete`, `dataplex.glossaryCategories.get`, `dataplex.glossaryCategories.list`, `dataplex.glossaryCategories.update`, `dataplex.glossaryTerms.create`, `dataplex.glossaryTerms.delete`, `dataplex.glossaryTerms.get`, `dataplex.glossaryTerms.list`, `dataplex.glossaryTerms.update`, `dataplex.glossaryTerms.use`, `dataplex.governanceRules.createTagBinding`, `dataplex.governanceRules.deleteTagBinding`, `dataplex.governanceRules.listEffectiveTags`, `dataplex.governanceRules.listTagBindings`, `dataplex.lakeActions.list`, `dataplex.lakes.create`, `dataplex.lakes.delete`, `dataplex.lakes.get`, `dataplex.lakes.getIamPolicy`, `dataplex.lakes.list`, `dataplex.lakes.setIamPolicy`, `dataplex.lakes.update`, `dataplex.locations.get`, `dataplex.locations.list`, `dataplex.metadataFeeds.create`, `dataplex.metadataFeeds.delete`, `dataplex.metadataFeeds.get`, `dataplex.metadataFeeds.list`, `dataplex.metadataFeeds.update`, `dataplex.metadataJobs.cancel`, `dataplex.metadataJobs.create`, `dataplex.metadataJobs.get`, `dataplex.metadataJobs.list`, `dataplex.operations.cancel`, `dataplex.operations.delete`, `dataplex.operations.get`, `dataplex.operations.list`, `dataplex.partitions.create`, `dataplex.partitions.delete`, `dataplex.partitions.get`, `dataplex.partitions.list`, `dataplex.partitions.update`, `dataplex.tasks.cancel`, `dataplex.tasks.create`, `dataplex.tasks.delete`, `dataplex.tasks.get`, `dataplex.tasks.getIamPolicy`, `dataplex.tasks.list`, `dataplex.tasks.run`, `dataplex.tasks.setIamPolicy`, `dataplex.tasks.update`, `dataplex.zoneActions.list`, `dataplex.zones.create`, `dataplex.zones.delete`, `dataplex.zones.get`, `dataplex.zones.getIamPolicy`, `dataplex.zones.list`, `dataplex.zones.setIamPolicy`, `dataplex.zones.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex DataScan Administrator (`roles/dataplex.dataScanAdmin`)

- Full access to DataScan resources.
- Permissions (21): `dataplex.agentTasks.create`, `dataplex.agentTasks.delete`, `dataplex.agentTasks.get`, `dataplex.agentTasks.getData`, `dataplex.agentTasks.getIamPolicy`, `dataplex.agentTasks.list`, `dataplex.agentTasks.run`, `dataplex.agentTasks.setIamPolicy`, `dataplex.agentTasks.update`, `dataplex.datascans.cancel`, `dataplex.datascans.create`, `dataplex.datascans.delete`, `dataplex.datascans.get`, `dataplex.datascans.getData`, `dataplex.datascans.getIamPolicy`, `dataplex.datascans.list`, `dataplex.datascans.run`, `dataplex.datascans.setIamPolicy`, `dataplex.datascans.update`, `dataplex.operations.get`, `dataplex.operations.list`

#### Dataplex Editor (`roles/dataplex.editor`)

- Write access to Dataplex Universal Catalog resources, except for catalog resources like entries, entry groups, and glossaries.
- Permissions (93): `cloudasset.assets.analyzeIamPolicy`, `dataplex.agentTasks.create`, `dataplex.agentTasks.delete`, `dataplex.agentTasks.get`, `dataplex.agentTasks.getIamPolicy`, `dataplex.agentTasks.list`, `dataplex.agentTasks.run`, `dataplex.agentTasks.update`, `dataplex.assetActions.list`, `dataplex.assets.create`, `dataplex.assets.delete`, `dataplex.assets.get`, `dataplex.assets.getIamPolicy`, `dataplex.assets.list`, `dataplex.assets.update`, `dataplex.content.delete`, `dataplex.content.get`, `dataplex.content.getIamPolicy`, `dataplex.content.list`, `dataplex.dataAssets.create`, `dataplex.dataAssets.delete`, `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataAssets.update`, `dataplex.dataAttributeBindings.create`, `dataplex.dataAttributeBindings.delete`, `dataplex.dataAttributeBindings.get`, `dataplex.dataAttributeBindings.getIamPolicy`, `dataplex.dataAttributeBindings.list`, `dataplex.dataAttributeBindings.update`, `dataplex.dataAttributes.bind`, `dataplex.dataAttributes.create`, `dataplex.dataAttributes.delete`, `dataplex.dataAttributes.get`, `dataplex.dataAttributes.getIamPolicy`, `dataplex.dataAttributes.list`, `dataplex.dataAttributes.update`, `dataplex.dataProducts.approve`, `dataplex.dataProducts.create`, `dataplex.dataProducts.delete`, `dataplex.dataProducts.get`, `dataplex.dataProducts.getIamPolicy`, `dataplex.dataProducts.list`, `dataplex.dataProducts.update`, `dataplex.dataTaxonomies.configureDataAccess`, `dataplex.dataTaxonomies.configureResourceAccess`, `dataplex.dataTaxonomies.create`, `dataplex.dataTaxonomies.delete`, `dataplex.dataTaxonomies.get`, `dataplex.dataTaxonomies.getIamPolicy`, `dataplex.dataTaxonomies.list`, `dataplex.dataTaxonomies.update`, `dataplex.datascans.cancel`, `dataplex.datascans.create`, `dataplex.datascans.delete`, `dataplex.datascans.get`, `dataplex.datascans.getIamPolicy`, `dataplex.datascans.list`, `dataplex.datascans.run`, `dataplex.datascans.update`, `dataplex.entryGroups.createContextSet`, `dataplex.environments.create`, `dataplex.environments.delete`, `dataplex.environments.get`, `dataplex.environments.getIamPolicy`, `dataplex.environments.list`, `dataplex.environments.update`, `dataplex.lakeActions.list`, `dataplex.lakes.create`, `dataplex.lakes.delete`, `dataplex.lakes.get`, `dataplex.lakes.getIamPolicy`, `dataplex.lakes.list`, `dataplex.lakes.update`, `dataplex.operations.cancel`, `dataplex.operations.delete`, `dataplex.operations.get`, `dataplex.operations.list`, `dataplex.tasks.cancel`, `dataplex.tasks.create`, `dataplex.tasks.delete`, `dataplex.tasks.get`, `dataplex.tasks.getIamPolicy`, `dataplex.tasks.list`, `dataplex.tasks.run`, `dataplex.tasks.update`, `dataplex.zoneActions.list`, `dataplex.zones.create`, `dataplex.zones.delete`, `dataplex.zones.get`, `dataplex.zones.getIamPolicy`, `dataplex.zones.list`, `dataplex.zones.update`

#### Dataplex Viewer (`roles/dataplex.viewer`)

- Read access to Dataplex Universal Catalog resources, except for catalog resources like entries, entry groups, and glossaries.
- Permissions (44): `cloudasset.assets.analyzeIamPolicy`, `dataplex.agentTasks.get`, `dataplex.agentTasks.getIamPolicy`, `dataplex.agentTasks.list`, `dataplex.assetActions.list`, `dataplex.assets.get`, `dataplex.assets.getIamPolicy`, `dataplex.assets.list`, `dataplex.content.get`, `dataplex.content.getIamPolicy`, `dataplex.content.list`, `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataAttributeBindings.get`, `dataplex.dataAttributeBindings.getIamPolicy`, `dataplex.dataAttributeBindings.list`, `dataplex.dataAttributes.get`, `dataplex.dataAttributes.getIamPolicy`, `dataplex.dataAttributes.list`, `dataplex.dataProducts.get`, `dataplex.dataProducts.getIamPolicy`, `dataplex.dataProducts.list`, `dataplex.dataTaxonomies.get`, `dataplex.dataTaxonomies.getIamPolicy`, `dataplex.dataTaxonomies.list`, `dataplex.datascans.get`, `dataplex.datascans.getIamPolicy`, `dataplex.datascans.list`, `dataplex.environments.get`, `dataplex.environments.getIamPolicy`, `dataplex.environments.list`, `dataplex.lakeActions.list`, `dataplex.lakes.get`, `dataplex.lakes.getIamPolicy`, `dataplex.lakes.list`, `dataplex.operations.get`, `dataplex.operations.list`, `dataplex.tasks.get`, `dataplex.tasks.getIamPolicy`, `dataplex.tasks.list`, `dataplex.zoneActions.list`, `dataplex.zones.get`, `dataplex.zones.getIamPolicy`, `dataplex.zones.list`

#### Dataplex Aspect Type Owner (`roles/dataplex.aspectTypeOwner`)

- Grants access to creating and managing Aspect Types. Does not give the right to create/modify Entries.
- Permissions (14): `datacatalog.migrationConfig.get`, `dataplex.aspectTypes.create`, `dataplex.aspectTypes.delete`, `dataplex.aspectTypes.get`, `dataplex.aspectTypes.getIamPolicy`, `dataplex.aspectTypes.list`, `dataplex.aspectTypes.setIamPolicy`, `dataplex.aspectTypes.update`, `dataplex.aspectTypes.use`, `dataplex.dataDomains.discover`, `dataplex.operations.get`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Aspect Type User (`roles/dataplex.aspectTypeUser`)

- Grants access to use Aspect Types to create/modify Entries with the corresponding aspects.
- Permissions (8): `datacatalog.migrationConfig.get`, `dataplex.aspectTypes.get`, `dataplex.aspectTypes.list`, `dataplex.aspectTypes.use`, `dataplex.dataDomains.discover`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Binding Administrator (`roles/dataplex.bindingAdmin`)

- Full access on DataAttribute Binding resources.
- Permissions (7): `dataplex.dataAttributeBindings.create`, `dataplex.dataAttributeBindings.delete`, `dataplex.dataAttributeBindings.get`, `dataplex.dataAttributeBindings.getIamPolicy`, `dataplex.dataAttributeBindings.list`, `dataplex.dataAttributeBindings.setIamPolicy`, `dataplex.dataAttributeBindings.update`

#### Dataplex Catalog Admin (`roles/dataplex.catalogAdmin`)

- Full access to catalog resources, including entries, entry groups, and glossaries.
- Permissions (136): `datacatalog.migrationConfig.get`, `dataplex.aspectTypes.create`, `dataplex.aspectTypes.delete`, `dataplex.aspectTypes.get`, `dataplex.aspectTypes.getIamPolicy`, `dataplex.aspectTypes.list`, `dataplex.aspectTypes.setIamPolicy`, `dataplex.aspectTypes.update`, `dataplex.aspectTypes.use`, `dataplex.changeRequests.adminDelete`, `dataplex.changeRequests.delete`, `dataplex.changeRequests.get`, `dataplex.changeRequests.list`, `dataplex.changeRequests.use`, `dataplex.dataDomains.discover`, `dataplex.entries.create`, `dataplex.entries.createContext`, `dataplex.entries.delete`, `dataplex.entries.deleteContext`, `dataplex.entries.get`, `dataplex.entries.getContext`, `dataplex.entries.getData`, `dataplex.entries.link`, `dataplex.entries.list`, `dataplex.entries.listContext`, `dataplex.entries.update`, `dataplex.entries.updateContext`, `dataplex.entryGroups.create`, `dataplex.entryGroups.createContextSet`, `dataplex.entryGroups.createTagBinding`, `dataplex.entryGroups.delete`, `dataplex.entryGroups.deleteContextSet`, `dataplex.entryGroups.deleteTagBinding`, `dataplex.entryGroups.export`, `dataplex.entryGroups.get`, `dataplex.entryGroups.getContextSet`, `dataplex.entryGroups.getIamPolicy`, `dataplex.entryGroups.import`, `dataplex.entryGroups.list`, `dataplex.entryGroups.listEffectiveTags`, `dataplex.entryGroups.listTagBindings`, `dataplex.entryGroups.requestChanges`, `dataplex.entryGroups.requestContextChanges`, `dataplex.entryGroups.setIamPolicy`, `dataplex.entryGroups.update`, `dataplex.entryGroups.updateContextSet`, `dataplex.entryGroups.useCertificationAspect`, `dataplex.entryGroups.useContactsAspect`, `dataplex.entryGroups.useContextAspect`, `dataplex.entryGroups.useContextEntry`, `dataplex.entryGroups.useContextEntryLink`, `dataplex.entryGroups.useDataProfileAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateEntry`, `dataplex.entryGroups.useDataQualityScorecardAspect`, `dataplex.entryGroups.useDataRulesAspect`, `dataplex.entryGroups.useDatabaseDataPolicyAspect`, `dataplex.entryGroups.useDefinitionEntryLink`, `dataplex.entryGroups.useDescriptionsAspect`, `dataplex.entryGroups.useDocumentAspect`, `dataplex.entryGroups.useDocumentEntry`, `dataplex.entryGroups.useGenericAspect`, `dataplex.entryGroups.useGenericEntry`, `dataplex.entryGroups.useGraphProfileAspect`, `dataplex.entryGroups.useManagedConnectorTypes`, `dataplex.entryGroups.useMySQLConnectorTypes`, `dataplex.entryGroups.useOracleConnectorTypes`, `dataplex.entryGroups.useOverviewAspect`, `dataplex.entryGroups.usePostgreSQLConnectorTypes`, `dataplex.entryGroups.useQueriesAspect`, `dataplex.entryGroups.useQueryTemplateAspect`, `dataplex.entryGroups.useQueryTemplateEntry`, `dataplex.entryGroups.useReferenceEntryLink`, `dataplex.entryGroups.useRefreshCadenceAspect`, `dataplex.entryGroups.useRelatedEntryLink`, `dataplex.entryGroups.useSQLAccessAspect`, `dataplex.entryGroups.useSQLServerConnectorTypes`, `dataplex.entryGroups.useSQLTriggersAspect`, `dataplex.entryGroups.useSchemaAspect`, `dataplex.entryGroups.useSchemaJoinAspect`, `dataplex.entryGroups.useSchemaJoinEntryLink`, `dataplex.entryGroups.useSecondaryIndexesAspect`, `dataplex.entryGroups.useStorageAspect`, `dataplex.entryGroups.useSynonymEntryLink`, `dataplex.entryGroups.useUsageAspect`, `dataplex.entryLinkTypes.create`, `dataplex.entryLinkTypes.delete`, `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.getIamPolicy`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinkTypes.setIamPolicy`, `dataplex.entryLinkTypes.update`, `dataplex.entryLinkTypes.use`, `dataplex.entryLinks.create`, `dataplex.entryLinks.delete`, `dataplex.entryLinks.get`, `dataplex.entryLinks.reference`, `dataplex.entryLinks.update`, `dataplex.entryTypes.create`, `dataplex.entryTypes.createTagBinding`, `dataplex.entryTypes.delete`, `dataplex.entryTypes.deleteTagBinding`, `dataplex.entryTypes.get`, `dataplex.entryTypes.getIamPolicy`, `dataplex.entryTypes.list`, `dataplex.entryTypes.listEffectiveTags`, `dataplex.entryTypes.listTagBindings`, `dataplex.entryTypes.setIamPolicy`, `dataplex.entryTypes.update`, `dataplex.entryTypes.use`, `dataplex.glossaries.create`, `dataplex.glossaries.delete`, `dataplex.glossaries.get`, `dataplex.glossaries.getIamPolicy`, `dataplex.glossaries.import`, `dataplex.glossaries.list`, `dataplex.glossaries.requestChanges`, `dataplex.glossaries.setIamPolicy`, `dataplex.glossaries.update`, `dataplex.glossaryCategories.create`, `dataplex.glossaryCategories.delete`, `dataplex.glossaryCategories.get`, `dataplex.glossaryCategories.list`, `dataplex.glossaryCategories.update`, `dataplex.glossaryTerms.create`, `dataplex.glossaryTerms.delete`, `dataplex.glossaryTerms.get`, `dataplex.glossaryTerms.list`, `dataplex.glossaryTerms.update`, `dataplex.glossaryTerms.use`, `dataplex.locations.get`, `dataplex.locations.list`, `dataplex.operations.get`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Catalog Editor (`roles/dataplex.catalogEditor`)

- Write access to catalog resources, including entries, entry groups, and glossaries. Cannot set IAM policies on resources.
- Permissions (108): `datacatalog.migrationConfig.get`, `dataplex.aspectTypes.create`, `dataplex.aspectTypes.delete`, `dataplex.aspectTypes.get`, `dataplex.aspectTypes.getIamPolicy`, `dataplex.aspectTypes.list`, `dataplex.aspectTypes.update`, `dataplex.aspectTypes.use`, `dataplex.changeRequests.get`, `dataplex.changeRequests.list`, `dataplex.dataDomains.discover`, `dataplex.entries.create`, `dataplex.entries.delete`, `dataplex.entries.get`, `dataplex.entries.getData`, `dataplex.entries.link`, `dataplex.entries.list`, `dataplex.entries.update`, `dataplex.entryGroups.create`, `dataplex.entryGroups.delete`, `dataplex.entryGroups.get`, `dataplex.entryGroups.getIamPolicy`, `dataplex.entryGroups.list`, `dataplex.entryGroups.listEffectiveTags`, `dataplex.entryGroups.listTagBindings`, `dataplex.entryGroups.update`, `dataplex.entryGroups.useCertificationAspect`, `dataplex.entryGroups.useContactsAspect`, `dataplex.entryGroups.useContextAspect`, `dataplex.entryGroups.useContextEntry`, `dataplex.entryGroups.useContextEntryLink`, `dataplex.entryGroups.useDataProfileAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateEntry`, `dataplex.entryGroups.useDataQualityScorecardAspect`, `dataplex.entryGroups.useDataRulesAspect`, `dataplex.entryGroups.useDatabaseDataPolicyAspect`, `dataplex.entryGroups.useDefinitionEntryLink`, `dataplex.entryGroups.useDescriptionsAspect`, `dataplex.entryGroups.useDocumentAspect`, `dataplex.entryGroups.useDocumentEntry`, `dataplex.entryGroups.useGenericAspect`, `dataplex.entryGroups.useGenericEntry`, `dataplex.entryGroups.useGraphProfileAspect`, `dataplex.entryGroups.useManagedConnectorTypes`, `dataplex.entryGroups.useMySQLConnectorTypes`, `dataplex.entryGroups.useOracleConnectorTypes`, `dataplex.entryGroups.useOverviewAspect`, `dataplex.entryGroups.usePostgreSQLConnectorTypes`, `dataplex.entryGroups.useQueriesAspect`, `dataplex.entryGroups.useQueryTemplateAspect`, `dataplex.entryGroups.useQueryTemplateEntry`, `dataplex.entryGroups.useReferenceEntryLink`, `dataplex.entryGroups.useRefreshCadenceAspect`, `dataplex.entryGroups.useRelatedEntryLink`, `dataplex.entryGroups.useSQLAccessAspect`, `dataplex.entryGroups.useSQLServerConnectorTypes`, `dataplex.entryGroups.useSQLTriggersAspect`, `dataplex.entryGroups.useSchemaAspect`, `dataplex.entryGroups.useSchemaJoinAspect`, `dataplex.entryGroups.useSchemaJoinEntryLink`, `dataplex.entryGroups.useSecondaryIndexesAspect`, `dataplex.entryGroups.useStorageAspect`, `dataplex.entryGroups.useSynonymEntryLink`, `dataplex.entryGroups.useUsageAspect`, `dataplex.entryLinkTypes.create`, `dataplex.entryLinkTypes.delete`, `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.getIamPolicy`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinkTypes.update`, `dataplex.entryLinkTypes.use`, `dataplex.entryLinks.create`, `dataplex.entryLinks.delete`, `dataplex.entryLinks.get`, `dataplex.entryLinks.update`, `dataplex.entryTypes.create`, `dataplex.entryTypes.delete`, `dataplex.entryTypes.get`, `dataplex.entryTypes.getIamPolicy`, `dataplex.entryTypes.list`, `dataplex.entryTypes.listEffectiveTags`, `dataplex.entryTypes.listTagBindings`, `dataplex.entryTypes.update`, `dataplex.entryTypes.use`, `dataplex.glossaries.create`, `dataplex.glossaries.delete`, `dataplex.glossaries.get`, `dataplex.glossaries.getIamPolicy`, `dataplex.glossaries.list`, `dataplex.glossaries.update`, `dataplex.glossaryCategories.create`, `dataplex.glossaryCategories.delete`, `dataplex.glossaryCategories.get`, `dataplex.glossaryCategories.list`, `dataplex.glossaryCategories.update`, `dataplex.glossaryTerms.create`, `dataplex.glossaryTerms.delete`, `dataplex.glossaryTerms.get`, `dataplex.glossaryTerms.list`, `dataplex.glossaryTerms.update`, `dataplex.glossaryTerms.use`, `dataplex.locations.get`, `dataplex.locations.list`, `dataplex.operations.get`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Catalog Viewer (`roles/dataplex.catalogViewer`)

- Read access to catalog resources, including entries, entry groups, and glossaries. Can view IAM policies on catalog resources.
- Permissions (37): `datacatalog.migrationConfig.get`, `dataplex.aspectTypes.get`, `dataplex.aspectTypes.getIamPolicy`, `dataplex.aspectTypes.list`, `dataplex.changeRequests.get`, `dataplex.changeRequests.list`, `dataplex.dataDomains.discover`, `dataplex.entries.get`, `dataplex.entries.list`, `dataplex.entryGroups.get`, `dataplex.entryGroups.getIamPolicy`, `dataplex.entryGroups.list`, `dataplex.entryGroups.listEffectiveTags`, `dataplex.entryGroups.listTagBindings`, `dataplex.entryGroups.requestChanges`, `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.getIamPolicy`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinks.get`, `dataplex.entryTypes.get`, `dataplex.entryTypes.getIamPolicy`, `dataplex.entryTypes.list`, `dataplex.entryTypes.listEffectiveTags`, `dataplex.entryTypes.listTagBindings`, `dataplex.glossaries.get`, `dataplex.glossaries.getIamPolicy`, `dataplex.glossaries.list`, `dataplex.glossaries.requestChanges`, `dataplex.glossaryCategories.get`, `dataplex.glossaryCategories.list`, `dataplex.glossaryTerms.get`, `dataplex.glossaryTerms.list`, `dataplex.locations.get`, `dataplex.locations.list`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Change Request Owner (`roles/dataplex.changeRequestOwner`)

- Launch stage: Beta
- Grants Change Request creator necessary permissions on a created ChangeRequest instance.
- Permissions (3): `dataplex.changeRequests.delete`, `dataplex.changeRequests.get`, `dataplex.changeRequests.update`

#### Dataplex Content Admin (`roles/dataplex.contentAdmin`)

- Grants full lifecycle ownership, IAM sharing (getIamPolicy/setIamPolicy), context entry management, curation specification updates, and deletion rights on a specific Context Set.
- Permissions (52): `dataplex.entries.create`, `dataplex.entries.createContext`, `dataplex.entries.delete`, `dataplex.entries.deleteContext`, `dataplex.entries.get`, `dataplex.entries.getContext`, `dataplex.entries.link`, `dataplex.entries.list`, `dataplex.entries.listContext`, `dataplex.entries.update`, `dataplex.entries.updateContext`, `dataplex.entryGroups.deleteContextSet`, `dataplex.entryGroups.getContextSet`, `dataplex.entryGroups.getIamPolicy`, `dataplex.entryGroups.requestContextChanges`, `dataplex.entryGroups.setIamPolicy`, `dataplex.entryGroups.updateContextSet`, `dataplex.entryGroups.useCertificationAspect`, `dataplex.entryGroups.useContactsAspect`, `dataplex.entryGroups.useContextAspect`, `dataplex.entryGroups.useContextEntry`, `dataplex.entryGroups.useContextEntryLink`, `dataplex.entryGroups.useDataProfileAspect`, `dataplex.entryGroups.useDataQualityScorecardAspect`, `dataplex.entryGroups.useDataRulesAspect`, `dataplex.entryGroups.useDefinitionEntryLink`, `dataplex.entryGroups.useDescriptionsAspect`, `dataplex.entryGroups.useDocumentAspect`, `dataplex.entryGroups.useDocumentEntry`, `dataplex.entryGroups.useGenericAspect`, `dataplex.entryGroups.useGenericEntry`, `dataplex.entryGroups.useGraphProfileAspect`, `dataplex.entryGroups.useOverviewAspect`, `dataplex.entryGroups.useQueriesAspect`, `dataplex.entryGroups.useQueryTemplateAspect`, `dataplex.entryGroups.useQueryTemplateEntry`, `dataplex.entryGroups.useReferenceEntryLink`, `dataplex.entryGroups.useRelatedEntryLink`, `dataplex.entryGroups.useSQLAccessAspect`, `dataplex.entryGroups.useSchemaAspect`, `dataplex.entryGroups.useSchemaJoinAspect`, `dataplex.entryGroups.useSchemaJoinEntryLink`, `dataplex.entryGroups.useSecondaryIndexesAspect`, `dataplex.entryGroups.useStorageAspect`, `dataplex.entryGroups.useSynonymEntryLink`, `dataplex.entryGroups.useUsageAspect`, `dataplex.entryLinks.create`, `dataplex.entryLinks.delete`, `dataplex.entryLinks.get`, `dataplex.entryLinks.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Content Creator (`roles/dataplex.contentCreator`)

- Authorizes users to create new Context Sets within a project.
- Permissions (4): `dataplex.entryGroups.createContextSet`, `dataplex.entryGroups.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Content Editor (`roles/dataplex.contentEditor`)

- Authorizes context engineers, curators, and agents to modify context entries, author guidelines, and update curation specifications without administrative IAM sharing or container deletion capabilities.
- Permissions (50): `dataplex.entries.create`, `dataplex.entries.createContext`, `dataplex.entries.delete`, `dataplex.entries.deleteContext`, `dataplex.entries.get`, `dataplex.entries.getContext`, `dataplex.entries.link`, `dataplex.entries.list`, `dataplex.entries.listContext`, `dataplex.entries.update`, `dataplex.entries.updateContext`, `dataplex.entryGroups.getContextSet`, `dataplex.entryGroups.getIamPolicy`, `dataplex.entryGroups.requestContextChanges`, `dataplex.entryGroups.updateContextSet`, `dataplex.entryGroups.useCertificationAspect`, `dataplex.entryGroups.useContactsAspect`, `dataplex.entryGroups.useContextAspect`, `dataplex.entryGroups.useContextEntry`, `dataplex.entryGroups.useContextEntryLink`, `dataplex.entryGroups.useDataProfileAspect`, `dataplex.entryGroups.useDataQualityScorecardAspect`, `dataplex.entryGroups.useDataRulesAspect`, `dataplex.entryGroups.useDefinitionEntryLink`, `dataplex.entryGroups.useDescriptionsAspect`, `dataplex.entryGroups.useDocumentAspect`, `dataplex.entryGroups.useDocumentEntry`, `dataplex.entryGroups.useGenericAspect`, `dataplex.entryGroups.useGenericEntry`, `dataplex.entryGroups.useGraphProfileAspect`, `dataplex.entryGroups.useOverviewAspect`, `dataplex.entryGroups.useQueriesAspect`, `dataplex.entryGroups.useQueryTemplateAspect`, `dataplex.entryGroups.useQueryTemplateEntry`, `dataplex.entryGroups.useReferenceEntryLink`, `dataplex.entryGroups.useRelatedEntryLink`, `dataplex.entryGroups.useSQLAccessAspect`, `dataplex.entryGroups.useSchemaAspect`, `dataplex.entryGroups.useSchemaJoinAspect`, `dataplex.entryGroups.useSchemaJoinEntryLink`, `dataplex.entryGroups.useSecondaryIndexesAspect`, `dataplex.entryGroups.useStorageAspect`, `dataplex.entryGroups.useSynonymEntryLink`, `dataplex.entryGroups.useUsageAspect`, `dataplex.entryLinks.create`, `dataplex.entryLinks.delete`, `dataplex.entryLinks.get`, `dataplex.entryLinks.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Content User (`roles/dataplex.contentUser`)

- Authorizes consumers, business analysts, and 1P/3P AI agents to read context entries and documentation within specific Context Sets, and to submit feedback or modification proposals.
- Permissions (6): `dataplex.entries.getContext`, `dataplex.entries.listContext`, `dataplex.entryGroups.getContextSet`, `dataplex.entryGroups.requestContextChanges`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Content Viewer (`roles/dataplex.contentViewer`)

- Enables discovery of content containers (Context Sets) within a project or catalog without granting access to the underlying sensitive context entries.
- Permissions (3): `dataplex.entryGroups.getContextSet`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Domain Admin (`roles/dataplex.dataDomainAdmin`)

- Launch stage: Beta
- Allows full management of the Data Domain and its bindings.
- Permissions (16): `dataplex.dataDomainBindings.create`, `dataplex.dataDomainBindings.delete`, `dataplex.dataDomainBindings.get`, `dataplex.dataDomainBindings.list`, `dataplex.dataDomains.create`, `dataplex.dataDomains.delete`, `dataplex.dataDomains.discover`, `dataplex.dataDomains.get`, `dataplex.dataDomains.getIamPolicy`, `dataplex.dataDomains.list`, `dataplex.dataDomains.lookupEntry`, `dataplex.dataDomains.setIamPolicy`, `dataplex.dataDomains.update`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Domain Configuration Editor (`roles/dataplex.dataDomainEditor`)

- Launch stage: Beta
- Allows updating the Data Domain as well as full management of its bindings.
- Permissions (13): `dataplex.dataDomainBindings.create`, `dataplex.dataDomainBindings.delete`, `dataplex.dataDomainBindings.get`, `dataplex.dataDomainBindings.list`, `dataplex.dataDomains.discover`, `dataplex.dataDomains.get`, `dataplex.dataDomains.getIamPolicy`, `dataplex.dataDomains.list`, `dataplex.dataDomains.lookupEntry`, `dataplex.dataDomains.update`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Domain Entry Reader (`roles/dataplex.dataDomainEntryReader`)

- Launch stage: Beta
- Allows discovering and viewing the Data Domain, its subdomains, and metadata of all its resources.
- Permissions (4): `dataplex.dataDomains.discover`, `dataplex.dataDomains.get`, `dataplex.dataDomains.list`, `dataplex.dataDomains.lookupEntry`

#### Dataplex Data Domain Configuration Viewer (`roles/dataplex.dataDomainViewer`)

- Launch stage: Beta
- Allows viewing the configuration of the Data Domain and its bindings.
- Permissions (9): `dataplex.dataDomainBindings.get`, `dataplex.dataDomainBindings.list`, `dataplex.dataDomains.discover`, `dataplex.dataDomains.get`, `dataplex.dataDomains.getIamPolicy`, `dataplex.dataDomains.list`, `dataplex.dataDomains.lookupEntry`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Owner (`roles/dataplex.dataOwner`)

- Owner access to data. To be granted to Dataplex Universal Catalog resources Lake, Zone or Asset only.
- Permissions (3): `dataplex.assets.ownData`, `dataplex.assets.readData`, `dataplex.assets.writeData`

#### Dataplex Data Products Admin (`roles/dataplex.dataProductsAdmin`)

- Full access to Data Products.
- Permissions (16): `dataplex.dataAssets.create`, `dataplex.dataAssets.delete`, `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataAssets.update`, `dataplex.dataProducts.approve`, `dataplex.dataProducts.create`, `dataplex.dataProducts.delete`, `dataplex.dataProducts.get`, `dataplex.dataProducts.getIamPolicy`, `dataplex.dataProducts.list`, `dataplex.dataProducts.setIamPolicy`, `dataplex.dataProducts.update`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Products Consumer (`roles/dataplex.dataProductsConsumer`)

- Restricted read access, intended for consumers of Data Products.
- Permissions (5): `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataProducts.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Products Editor (`roles/dataplex.dataProductsEditor`)

- Write access to Data Products.
- Permissions (15): `dataplex.dataAssets.create`, `dataplex.dataAssets.delete`, `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataAssets.update`, `dataplex.dataProducts.approve`, `dataplex.dataProducts.create`, `dataplex.dataProducts.delete`, `dataplex.dataProducts.get`, `dataplex.dataProducts.getIamPolicy`, `dataplex.dataProducts.list`, `dataplex.dataProducts.update`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Products Viewer (`roles/dataplex.dataProductsViewer`)

- Read access to Data Products.
- Permissions (7): `dataplex.dataAssets.get`, `dataplex.dataAssets.list`, `dataplex.dataProducts.get`, `dataplex.dataProducts.getIamPolicy`, `dataplex.dataProducts.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Data Reader (`roles/dataplex.dataReader`)

- Read only access to data. To be granted to Dataplex Universal Catalog resources Lake, Zone or Asset only.
- Permissions (1): `dataplex.assets.readData`

#### Dataplex DataScan Creator (`roles/dataplex.dataScanCreator`)

- Access to create new DataScan resources.
- Permissions (7): `dataplex.agentTasks.create`, `dataplex.agentTasks.get`, `dataplex.agentTasks.list`, `dataplex.datascans.create`, `dataplex.datascans.get`, `dataplex.datascans.list`, `dataplex.operations.get`

#### Dataplex DataScan DataViewer (`roles/dataplex.dataScanDataViewer`)

- Read access to DataScan resources, including the results.
- Permissions (8): `dataplex.agentTasks.get`, `dataplex.agentTasks.getData`, `dataplex.agentTasks.getIamPolicy`, `dataplex.agentTasks.list`, `dataplex.datascans.get`, `dataplex.datascans.getData`, `dataplex.datascans.getIamPolicy`, `dataplex.datascans.list`

#### Dataplex DataScan Editor (`roles/dataplex.dataScanEditor`)

- Write access to DataScan resources.
- Permissions (19): `dataplex.agentTasks.create`, `dataplex.agentTasks.delete`, `dataplex.agentTasks.get`, `dataplex.agentTasks.getData`, `dataplex.agentTasks.getIamPolicy`, `dataplex.agentTasks.list`, `dataplex.agentTasks.run`, `dataplex.agentTasks.update`, `dataplex.datascans.cancel`, `dataplex.datascans.create`, `dataplex.datascans.delete`, `dataplex.datascans.get`, `dataplex.datascans.getData`, `dataplex.datascans.getIamPolicy`, `dataplex.datascans.list`, `dataplex.datascans.run`, `dataplex.datascans.update`, `dataplex.operations.get`, `dataplex.operations.list`

#### Dataplex DataScan Viewer (`roles/dataplex.dataScanViewer`)

- Read access to DataScan resources, excluding the results.
- Permissions (6): `dataplex.agentTasks.get`, `dataplex.agentTasks.getIamPolicy`, `dataplex.agentTasks.list`, `dataplex.datascans.get`, `dataplex.datascans.getIamPolicy`, `dataplex.datascans.list`

#### Dataplex Data Writer (`roles/dataplex.dataWriter`)

- Write access to data. To be granted to Dataplex Universal Catalog resources Lake, Zone or Asset only.
- Permissions (1): `dataplex.assets.writeData`

#### Dataplex Developer (`roles/dataplex.developer`)

- Allows running data analytics workloads in a lake.
- Permissions (17): `dataplex.content.create`, `dataplex.content.delete`, `dataplex.content.get`, `dataplex.content.getIamPolicy`, `dataplex.content.list`, `dataplex.content.setIamPolicy`, `dataplex.content.update`, `dataplex.environments.execute`, `dataplex.environments.get`, `dataplex.environments.list`, `dataplex.tasks.cancel`, `dataplex.tasks.create`, `dataplex.tasks.delete`, `dataplex.tasks.get`, `dataplex.tasks.list`, `dataplex.tasks.run`, `dataplex.tasks.update`

#### Dataplex Encryption Admin (`roles/dataplex.encryptionAdmin`)

- Gives user permissions to manage encryption configurations.
- Permissions (7): `dataplex.encryptionConfig.create`, `dataplex.encryptionConfig.delete`, `dataplex.encryptionConfig.get`, `dataplex.encryptionConfig.list`, `dataplex.encryptionConfig.update`, `dataplex.operations.get`, `dataplex.operations.list`

#### Dataplex Entry Group Exporter (`roles/dataplex.entryGroupExporter`)

- Grants access to export this entry group for Metadata Job processing.
- Permissions (4): `dataplex.entryGroups.export`, `dataplex.entryGroups.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Entry Group Importer (`roles/dataplex.entryGroupImporter`)

- Grants access to import this entry group for Metadata Job processing.
- Permissions (4): `dataplex.entryGroups.get`, `dataplex.entryGroups.import`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Entry Group Owner (`roles/dataplex.entryGroupOwner`)

- Owns Entry Groups and Entries inside of them.
- Permissions (92): `datacatalog.migrationConfig.get`, `dataplex.aspectTypes.get`, `dataplex.aspectTypes.list`, `dataplex.aspectTypes.use`, `dataplex.changeRequests.get`, `dataplex.changeRequests.list`, `dataplex.dataDomains.discover`, `dataplex.entries.create`, `dataplex.entries.createContext`, `dataplex.entries.delete`, `dataplex.entries.deleteContext`, `dataplex.entries.get`, `dataplex.entries.getContext`, `dataplex.entries.getData`, `dataplex.entries.link`, `dataplex.entries.list`, `dataplex.entries.listContext`, `dataplex.entries.update`, `dataplex.entries.updateContext`, `dataplex.entryGroups.create`, `dataplex.entryGroups.createContextSet`, `dataplex.entryGroups.createTagBinding`, `dataplex.entryGroups.delete`, `dataplex.entryGroups.deleteContextSet`, `dataplex.entryGroups.deleteTagBinding`, `dataplex.entryGroups.export`, `dataplex.entryGroups.get`, `dataplex.entryGroups.getContextSet`, `dataplex.entryGroups.getIamPolicy`, `dataplex.entryGroups.import`, `dataplex.entryGroups.list`, `dataplex.entryGroups.listEffectiveTags`, `dataplex.entryGroups.listTagBindings`, `dataplex.entryGroups.requestChanges`, `dataplex.entryGroups.requestContextChanges`, `dataplex.entryGroups.setIamPolicy`, `dataplex.entryGroups.update`, `dataplex.entryGroups.updateContextSet`, `dataplex.entryGroups.useCertificationAspect`, `dataplex.entryGroups.useContactsAspect`, `dataplex.entryGroups.useContextAspect`, `dataplex.entryGroups.useContextEntry`, `dataplex.entryGroups.useContextEntryLink`, `dataplex.entryGroups.useDataProfileAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateEntry`, `dataplex.entryGroups.useDataQualityScorecardAspect`, `dataplex.entryGroups.useDataRulesAspect`, `dataplex.entryGroups.useDatabaseDataPolicyAspect`, `dataplex.entryGroups.useDefinitionEntryLink`, `dataplex.entryGroups.useDescriptionsAspect`, `dataplex.entryGroups.useDocumentAspect`, `dataplex.entryGroups.useDocumentEntry`, `dataplex.entryGroups.useGenericAspect`, `dataplex.entryGroups.useGenericEntry`, `dataplex.entryGroups.useGraphProfileAspect`, `dataplex.entryGroups.useManagedConnectorTypes`, `dataplex.entryGroups.useMySQLConnectorTypes`, `dataplex.entryGroups.useOracleConnectorTypes`, `dataplex.entryGroups.useOverviewAspect`, `dataplex.entryGroups.usePostgreSQLConnectorTypes`, `dataplex.entryGroups.useQueriesAspect`, `dataplex.entryGroups.useQueryTemplateAspect`, `dataplex.entryGroups.useQueryTemplateEntry`, `dataplex.entryGroups.useReferenceEntryLink`, `dataplex.entryGroups.useRefreshCadenceAspect`, `dataplex.entryGroups.useRelatedEntryLink`, `dataplex.entryGroups.useSQLAccessAspect`, `dataplex.entryGroups.useSQLServerConnectorTypes`, `dataplex.entryGroups.useSQLTriggersAspect`, `dataplex.entryGroups.useSchemaAspect`, `dataplex.entryGroups.useSchemaJoinAspect`, `dataplex.entryGroups.useSchemaJoinEntryLink`, `dataplex.entryGroups.useSecondaryIndexesAspect`, `dataplex.entryGroups.useStorageAspect`, `dataplex.entryGroups.useSynonymEntryLink`, `dataplex.entryGroups.useUsageAspect`, `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinkTypes.use`, `dataplex.entryLinks.create`, `dataplex.entryLinks.delete`, `dataplex.entryLinks.get`, `dataplex.entryLinks.reference`, `dataplex.entryLinks.update`, `dataplex.entryTypes.get`, `dataplex.entryTypes.list`, `dataplex.entryTypes.use`, `dataplex.operations.get`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Entry Link Type Owner (`roles/dataplex.entryLinkTypeOwner`)

- Grants access to creating and managing Entry Link Types. Does not give the right to create/modify Entry Links.
- Permissions (13): `dataplex.dataDomains.discover`, `dataplex.entryLinkTypes.create`, `dataplex.entryLinkTypes.delete`, `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.getIamPolicy`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinkTypes.setIamPolicy`, `dataplex.entryLinkTypes.update`, `dataplex.entryLinkTypes.use`, `dataplex.operations.get`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Entry Link Type User (`roles/dataplex.entryLinkTypeUser`)

- Grants access to use Entry Link Types to create EntryLinks of those types.
- Permissions (7): `dataplex.dataDomains.discover`, `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinkTypes.use`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Entry and EntryLink Owner (`roles/dataplex.entryOwner`)

- Owns Metadata Entries and EntryLinks.
- Permissions (73): `datacatalog.migrationConfig.get`, `dataplex.aspectTypes.get`, `dataplex.aspectTypes.list`, `dataplex.aspectTypes.use`, `dataplex.changeRequests.get`, `dataplex.changeRequests.list`, `dataplex.dataDomains.discover`, `dataplex.entries.create`, `dataplex.entries.createContext`, `dataplex.entries.delete`, `dataplex.entries.deleteContext`, `dataplex.entries.get`, `dataplex.entries.getContext`, `dataplex.entries.getData`, `dataplex.entries.link`, `dataplex.entries.list`, `dataplex.entries.listContext`, `dataplex.entries.update`, `dataplex.entries.updateContext`, `dataplex.entryGroups.get`, `dataplex.entryGroups.useCertificationAspect`, `dataplex.entryGroups.useContactsAspect`, `dataplex.entryGroups.useContextAspect`, `dataplex.entryGroups.useContextEntry`, `dataplex.entryGroups.useContextEntryLink`, `dataplex.entryGroups.useDataProfileAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateAspect`, `dataplex.entryGroups.useDataQualityRuleTemplateEntry`, `dataplex.entryGroups.useDataQualityScorecardAspect`, `dataplex.entryGroups.useDataRulesAspect`, `dataplex.entryGroups.useDatabaseDataPolicyAspect`, `dataplex.entryGroups.useDefinitionEntryLink`, `dataplex.entryGroups.useDescriptionsAspect`, `dataplex.entryGroups.useDocumentAspect`, `dataplex.entryGroups.useDocumentEntry`, `dataplex.entryGroups.useGenericAspect`, `dataplex.entryGroups.useGenericEntry`, `dataplex.entryGroups.useGraphProfileAspect`, `dataplex.entryGroups.useManagedConnectorTypes`, `dataplex.entryGroups.useMySQLConnectorTypes`, `dataplex.entryGroups.useOracleConnectorTypes`, `dataplex.entryGroups.useOverviewAspect`, `dataplex.entryGroups.usePostgreSQLConnectorTypes`, `dataplex.entryGroups.useQueriesAspect`, `dataplex.entryGroups.useQueryTemplateAspect`, `dataplex.entryGroups.useQueryTemplateEntry`, `dataplex.entryGroups.useReferenceEntryLink`, `dataplex.entryGroups.useRefreshCadenceAspect`, `dataplex.entryGroups.useRelatedEntryLink`, `dataplex.entryGroups.useSQLAccessAspect`, `dataplex.entryGroups.useSQLServerConnectorTypes`, `dataplex.entryGroups.useSQLTriggersAspect`, `dataplex.entryGroups.useSchemaAspect`, `dataplex.entryGroups.useSchemaJoinAspect`, `dataplex.entryGroups.useSchemaJoinEntryLink`, `dataplex.entryGroups.useSecondaryIndexesAspect`, `dataplex.entryGroups.useStorageAspect`, `dataplex.entryGroups.useSynonymEntryLink`, `dataplex.entryGroups.useUsageAspect`, `dataplex.entryLinkTypes.get`, `dataplex.entryLinkTypes.list`, `dataplex.entryLinkTypes.use`, `dataplex.entryLinks.create`, `dataplex.entryLinks.delete`, `dataplex.entryLinks.get`, `dataplex.entryLinks.reference`, `dataplex.entryLinks.update`, `dataplex.entryTypes.get`, `dataplex.entryTypes.list`, `dataplex.entryTypes.use`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Entry Type Owner (`roles/dataplex.entryTypeOwner`)

- Grants access to creating and managing Entry Types. Does not give the right to create/modify Entries.
- Permissions (18): `datacatalog.migrationConfig.get`, `dataplex.dataDomains.discover`, `dataplex.entryTypes.create`, `dataplex.entryTypes.createTagBinding`, `dataplex.entryTypes.delete`, `dataplex.entryTypes.deleteTagBinding`, `dataplex.entryTypes.get`, `dataplex.entryTypes.getIamPolicy`, `dataplex.entryTypes.list`, `dataplex.entryTypes.listEffectiveTags`, `dataplex.entryTypes.listTagBindings`, `dataplex.entryTypes.setIamPolicy`, `dataplex.entryTypes.update`, `dataplex.entryTypes.use`, `dataplex.operations.get`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Entry Type User (`roles/dataplex.entryTypeUser`)

- Grants access to use Entry Types to create/modify Entries of those types.
- Permissions (10): `datacatalog.migrationConfig.get`, `dataplex.dataDomains.discover`, `dataplex.entryTypes.get`, `dataplex.entryTypes.list`, `dataplex.entryTypes.listEffectiveTags`, `dataplex.entryTypes.listTagBindings`, `dataplex.entryTypes.use`, `dataplex.projects.search`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Metadata Feed Owner (`roles/dataplex.metadataFeedOwner`)

- Grants access to creating and managing Metadata Feeds. Does not give the right to create/modify Entry Groups.
- Permissions (8): `dataplex.metadataFeeds.create`, `dataplex.metadataFeeds.delete`, `dataplex.metadataFeeds.get`, `dataplex.metadataFeeds.list`, `dataplex.metadataFeeds.update`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Metadata Feed Viewer (`roles/dataplex.metadataFeedViewer`)

- Read access to Metadata Feed resources.
- Permissions (5): `dataplex.metadataFeeds.get`, `dataplex.metadataFeeds.list`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Metadata Job Owner (`roles/dataplex.metadataJobOwner`)

- Grants access to creating and managing Metadata Jobs. Does not give the right to create/modify Entry Groups.
- Permissions (7): `dataplex.metadataJobs.cancel`, `dataplex.metadataJobs.create`, `dataplex.metadataJobs.get`, `dataplex.metadataJobs.list`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Metadata Job Viewer (`roles/dataplex.metadataJobViewer`)

- Read access to Metadata Job resources.
- Permissions (5): `dataplex.metadataJobs.get`, `dataplex.metadataJobs.list`, `dataplex.operations.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Metadata Reader (`roles/dataplex.metadataReader`)

- Read only access to metadata within table and fileset entities and partitions.
- Permissions (10): `dataplex.assets.get`, `dataplex.assets.list`, `dataplex.entities.get`, `dataplex.entities.list`, `dataplex.partitions.get`, `dataplex.partitions.list`, `dataplex.zones.get`, `dataplex.zones.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Metadata Writer (`roles/dataplex.metadataWriter`)

- Write and read access to metadata within table and fileset entities and partitions.
- Permissions (16): `dataplex.assets.get`, `dataplex.assets.list`, `dataplex.entities.create`, `dataplex.entities.delete`, `dataplex.entities.get`, `dataplex.entities.list`, `dataplex.entities.update`, `dataplex.partitions.create`, `dataplex.partitions.delete`, `dataplex.partitions.get`, `dataplex.partitions.list`, `dataplex.partitions.update`, `dataplex.zones.get`, `dataplex.zones.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Dataplex Security Administrator (`roles/dataplex.securityAdmin`)

- Permissions configure ResourceAccess and DataAccess Specs on Data Attributes.
- Permissions (2): `dataplex.dataTaxonomies.configureDataAccess`, `dataplex.dataTaxonomies.configureResourceAccess`

#### Dataplex Storage Data Owner (`roles/dataplex.storageDataOwner`)

- Owner access to data. Should not be used directly. This role is granted by Dataplex to managed resources like Cloud Storage buckets, BigQuery datasets etc.
- Permissions (31): `bigquery.datasets.get`, `bigquery.models.create`, `bigquery.models.delete`, `bigquery.models.export`, `bigquery.models.getData`, `bigquery.models.getMetadata`, `bigquery.models.list`, `bigquery.models.updateData`, `bigquery.models.updateMetadata`, `bigquery.routines.create`, `bigquery.routines.delete`, `bigquery.routines.get`, `bigquery.routines.list`, `bigquery.routines.update`, `bigquery.tables.create`, `bigquery.tables.createSnapshot`, `bigquery.tables.delete`, `bigquery.tables.deleteSnapshot`, `bigquery.tables.export`, `bigquery.tables.get`, `bigquery.tables.getData`, `bigquery.tables.list`, `bigquery.tables.restoreSnapshot`, `bigquery.tables.update`, `bigquery.tables.updateData`, `storage.buckets.get`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.get`, `storage.objects.list`, `storage.objects.update`

#### Dataplex Storage Data Reader (`roles/dataplex.storageDataReader`)

- Read only access to data. Should not be used directly. This role is granted by Dataplex to managed resources like Cloud Storage buckets, BigQuery datasets etc.
- Permissions (14): `bigquery.datasets.get`, `bigquery.models.export`, `bigquery.models.getData`, `bigquery.models.getMetadata`, `bigquery.models.list`, `bigquery.routines.get`, `bigquery.routines.list`, `bigquery.tables.export`, `bigquery.tables.get`, `bigquery.tables.getData`, `bigquery.tables.list`, `storage.buckets.get`, `storage.objects.get`, `storage.objects.list`

#### Dataplex Storage Data Writer (`roles/dataplex.storageDataWriter`)

- Write access to data. Should not be used directly. This role is granted by Dataplex to managed resources like Cloud Storage buckets, BigQuery datasets etc.
- Permissions (4): `bigquery.tables.updateData`, `storage.objects.create`, `storage.objects.delete`, `storage.objects.update`

#### Dataplex Taxonomy Administrator (`roles/dataplex.taxonomyAdmin`)

- Full access to DataTaxonomy, DataAttribute resources.
- Permissions (15): `dataplex.dataAttributes.bind`, `dataplex.dataAttributes.create`, `dataplex.dataAttributes.delete`, `dataplex.dataAttributes.get`, `dataplex.dataAttributes.getIamPolicy`, `dataplex.dataAttributes.list`, `dataplex.dataAttributes.setIamPolicy`, `dataplex.dataAttributes.update`, `dataplex.dataTaxonomies.create`, `dataplex.dataTaxonomies.delete`, `dataplex.dataTaxonomies.get`, `dataplex.dataTaxonomies.getIamPolicy`, `dataplex.dataTaxonomies.list`, `dataplex.dataTaxonomies.setIamPolicy`, `dataplex.dataTaxonomies.update`

#### Dataplex Taxonomy Viewer (`roles/dataplex.taxonomyViewer`)

- Read access on DataTaxonomy, DataAttribute resources.
- Permissions (6): `dataplex.dataAttributes.get`, `dataplex.dataAttributes.getIamPolicy`, `dataplex.dataAttributes.list`, `dataplex.dataTaxonomies.get`, `dataplex.dataTaxonomies.getIamPolicy`, `dataplex.dataTaxonomies.list`

#### Dataplex Workflow Admin (`roles/dataplex.workflowAdmin`)

- Launch stage: Beta
- Full access to Change Requests in Approval Workflows.
- Permissions (5): `dataplex.changeRequests.adminDelete`, `dataplex.changeRequests.delete`, `dataplex.changeRequests.get`, `dataplex.changeRequests.list`, `dataplex.changeRequests.use`

#### Dataplex Workflow Approver (`roles/dataplex.workflowApprover`)

- Launch stage: Beta
- Access to approve, reject, or revoke Change Requests in Approval Workflows.
- Permissions (3): `dataplex.changeRequests.get`, `dataplex.changeRequests.list`, `dataplex.changeRequests.use`

#### Dataplex Discovery BigLake Publishing Service Agent (`roles/dataplex.discoveryBigLakePublishingServiceAgent`)

- Gives the Dataplex Discovery Service Agent permissions to use bigquery connection. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (2): `bigquery.connections.delegate`, `bigquery.connections.use`

#### Dataplex Discovery Publishing Service Agent (`roles/dataplex.discoveryPublishingServiceAgent`)

- Gives the Dataplex Discovery Service Agent dataset create and get permissions. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (2): `bigquery.datasets.create`, `bigquery.datasets.get`

#### Dataplex Discovery Service Agent (`roles/dataplex.discoveryServiceAgent`)

- Gives the Dataplex Discovery Service Agent bucket read permissions. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `storage.buckets.get`, `storage.objects.get`, `storage.objects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/dataplex.admin"
```

## Notes

- Roles and permissions of the `dataplex` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/dataplex (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
