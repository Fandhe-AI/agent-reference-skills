---
source: https://dataplex.googleapis.com/$discovery/rest?version=v1
---

# Cloud Dataplex API message schemas (dataplex) (part 2/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/dataplex/`.

### `GoogleCloudDataplexV1DataScanExecutionStatus`

- Status of the data scan execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latestJobCreateTime` | string (google-datetime) | Optional. The time when the DataScanJob execution was created. |
| `latestJobEndTime` | string (google-datetime) | Optional. The time when the latest DataScanJob ended. |
| `latestJobStartTime` | string (google-datetime) | Optional. The time when the latest DataScanJob started. |

### `GoogleCloudDataplexV1DataScanJob`

- A DataScanJob represents an instance of DataScan execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the DataScanJob was created. |
| `dataDiscoveryResult` | GoogleCloudDataplexV1DataDiscoveryResult | Output only. The result of a data discovery scan. |
| `dataDiscoverySpec` | GoogleCloudDataplexV1DataDiscoverySpec | Output only. Settings for a data discovery scan. |
| `dataDocumentationResult` | GoogleCloudDataplexV1DataDocumentationResult | Output only. The result of a data documentation scan. |
| `dataDocumentationSpec` | GoogleCloudDataplexV1DataDocumentationSpec | Output only. Settings for a data documentation scan. |
| `dataProfileResult` | GoogleCloudDataplexV1DataProfileResult | Output only. The result of a data profile scan. |
| `dataProfileSpec` | GoogleCloudDataplexV1DataProfileSpec | Output only. Settings for a data profile scan. |
| `dataQualityResult` | GoogleCloudDataplexV1DataQualityResult | Output only. The result of a data quality scan. |
| `dataQualitySpec` | GoogleCloudDataplexV1DataQualitySpec | Output only. Settings for a data quality scan. |
| `endTime` | string (google-datetime) | Output only. The time when the DataScanJob ended. |
| `message` | string | Output only. Additional information about the current state. |
| `name` | string | Output only. Identifier. The relative resource name of the DataScanJob, of the form: projects/{project}/locations/{location_id}/dataScans/{datascan_id}/jobs/{job_id}, where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `partialFailureMessage` | string | Output only. A message indicating partial failure details. |
| `startTime` | string (google-datetime) | Output only. The time when the DataScanJob was started. |
| `state` | string enum | Output only. Execution state for the DataScanJob. Values: `STATE_UNSPECIFIED`, `RUNNING`, `CANCELING`, `CANCELLED`, `SUCCEEDED`, `FAILED`, `PENDING`, `SUCCEEDED_WITH_ERRORS`. |
| `type` | string enum | Output only. The type of the parent DataScan. Values: `DATA_SCAN_TYPE_UNSPECIFIED`, `DATA_QUALITY`, `DATA_PROFILE`, `DATA_DISCOVERY`, `DATA_DOCUMENTATION`. |
| `uid` | string | Output only. System generated globally unique ID for the DataScanJob. |

### `GoogleCloudDataplexV1DataSource`

- The data source for DataScan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entity` | string | Immutable. The Dataplex Universal Catalog entity that represents the data source (e.g. BigQuery table) for DataScan, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. |
| `resource` | string | Immutable. The service-qualified full resource name of the cloud resource for a DataScan job to scan against. The field could either be: Cloud Storage bucket for DataDiscoveryScan Format: //storage.googleapis.com/projects/PROJECT_ID/buckets/BUCKET_ID or BigQuery table of type "TABLE" for DataProfileScan/DataQualityScan/DataDocumentationScan Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID or BigQuery dataset for DataDocumentationScan only Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID |

### `GoogleCloudDataplexV1DeleteEntryLinkRequest`

- Request message for DeleteEntryLink.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}. |

### `GoogleCloudDataplexV1DeleteEntryRequest`

- Delete Entry request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}. |

### `GoogleCloudDataplexV1DeleteGlossaryCategoryRequest`

- Delete GlossaryCategory Request
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the GlossaryCategory to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |

### `GoogleCloudDataplexV1DeleteGlossaryRequest`

- Delete Glossary Request
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The etag of the Glossary. If this is provided, it must match the server's etag. If the etag is provided and does not match the server-computed etag, the request must fail with a ABORTED error code. |
| `name` | string | Required. The name of the Glossary to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} |

### `GoogleCloudDataplexV1DeleteGlossaryTermRequest`

- Delete GlossaryTerm Request
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the GlossaryTerm to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} |

### `GoogleCloudDataplexV1DiscoveryEvent`

- The payload associated with Discovery data processing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | GoogleCloudDataplexV1DiscoveryEventActionDetails | Details about the action associated with the event. |
| `assetId` | string | The id of the associated asset. |
| `config` | GoogleCloudDataplexV1DiscoveryEventConfigDetails | Details about discovery configuration in effect. |
| `dataLocation` | string | The data location associated with the event. |
| `datascanId` | string | The id of the associated datascan for standalone discovery. |
| `entity` | GoogleCloudDataplexV1DiscoveryEventEntityDetails | Details about the entity associated with the event. |
| `lakeId` | string | The id of the associated lake. |
| `message` | string | The log message. |
| `partition` | GoogleCloudDataplexV1DiscoveryEventPartitionDetails | Details about the partition associated with the event. |
| `table` | GoogleCloudDataplexV1DiscoveryEventTableDetails | Details about the BigQuery table publishing associated with the event. |
| `type` | string enum | The type of the event being logged. Values: `EVENT_TYPE_UNSPECIFIED`, `CONFIG`, `ENTITY_CREATED`, `ENTITY_UPDATED`, `ENTITY_DELETED`, `PARTITION_CREATED`, `PARTITION_UPDATED`, `PARTITION_DELETED`, `TABLE_PUBLISHED`, `TABLE_UPDATED`, `TABLE_IGNORED`, `TABLE_DELETED`. |
| `zoneId` | string | The id of the associated zone. |

### `GoogleCloudDataplexV1DiscoveryEventActionDetails`

- Details about the action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issue` | string | The human readable issue associated with the action. |
| `type` | string | The type of action. Eg. IncompatibleDataSchema, InvalidDataFormat |

### `GoogleCloudDataplexV1DiscoveryEventConfigDetails`

- Details about configuration events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | object | A list of discovery configuration parameters in effect. The keys are the field paths within DiscoverySpec. Eg. includePatterns, excludePatterns, csvOptions.disableTypeInference, etc. |

### `GoogleCloudDataplexV1DiscoveryEventEntityDetails`

- Details about the entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entity` | string | The name of the entity resource. The name is the fully-qualified resource name. |
| `type` | string enum | The type of the entity resource. Values: `ENTITY_TYPE_UNSPECIFIED`, `TABLE`, `FILESET`. |

### `GoogleCloudDataplexV1DiscoveryEventPartitionDetails`

- Details about the partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entity` | string | The name to the containing entity resource. The name is the fully-qualified resource name. |
| `partition` | string | The name to the partition resource. The name is the fully-qualified resource name. |
| `sampledDataLocations` | array<string> | The locations of the data items (e.g., a Cloud Storage objects) sampled for metadata inference. |
| `type` | string enum | The type of the containing entity resource. Values: `ENTITY_TYPE_UNSPECIFIED`, `TABLE`, `FILESET`. |

### `GoogleCloudDataplexV1DiscoveryEventTableDetails`

- Details about the published table.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `table` | string | The fully-qualified resource name of the table resource. |
| `type` | string enum | The type of the table resource. Values: `TABLE_TYPE_UNSPECIFIED`, `EXTERNAL_TABLE`, `BIGLAKE_TABLE`, `OBJECT_TABLE`. |

### `GoogleCloudDataplexV1EncryptionConfig`

- A Resource designed to manage encryption configurations for customers to support Customer Managed Encryption Keys (CMEK).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the Encryption configuration was created. |
| `enableMetastoreEncryption` | boolean | Optional. Represent the state of CMEK opt-in for metastore. |
| `encryptionState` | string enum | Output only. The state of encryption of the databases. Values: `ENCRYPTION_STATE_UNSPECIFIED`, `ENCRYPTING`, `COMPLETED`, `FAILED`. |
| `etag` | string | Etag of the EncryptionConfig. This is a strong etag. |
| `failureDetails` | GoogleCloudDataplexV1EncryptionConfigFailureDetails | Output only. Details of the failure if anything related to Cmek db fails. |
| `key` | string | Optional. If a key is chosen, it means that the customer is using CMEK. If a key is not chosen, it means that the customer is using Google managed encryption. |
| `name` | string | Identifier. The resource name of the EncryptionConfig. Format: organizations/{organization}/locations/{location}/encryptionConfigs/{encryption_config} Global location is not supported. |
| `updateTime` | string (google-datetime) | Output only. The time when the Encryption configuration was last updated. |

### `GoogleCloudDataplexV1EncryptionConfigFailureDetails`

- Details of the failure if anything related to Cmek db fails.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | string enum | Output only. The error code for the failure. Values: `UNKNOWN`, `INTERNAL_ERROR`, `REQUIRE_USER_ACTION`. |
| `errorMessage` | string | Output only. The error message will be shown to the user. Set only if the error code is REQUIRE_USER_ACTION. |

### `GoogleCloudDataplexV1Entity`

- Represents tables and fileset metadata contained within a zone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `access` | GoogleCloudDataplexV1StorageAccess | Output only. Identifies the access mechanism to the entity. Not user settable. |
| `asset` | string | Required. Immutable. The ID of the asset associated with the storage location containing the entity data. The entity must be with in the same zone with the asset. |
| `catalogEntry` | string | Output only. The name of the associated Data Catalog entry. |
| `compatibility` | GoogleCloudDataplexV1EntityCompatibilityStatus | Output only. Metadata stores that the entity is compatible with. |
| `createTime` | string (google-datetime) | Output only. The time when the entity was created. |
| `dataPath` | string | Required. Immutable. The storage path of the entity data. For Cloud Storage data, this is the fully-qualified path to the entity, such as gs://bucket/path/to/data. For BigQuery data, this is the name of the table resource, such as projects/project_id/datasets/dataset_id/tables/table_id. |
| `dataPathPattern` | string | Optional. The set of items within the data path constituting the data in the entity, represented as a glob path. Example: gs://bucket/path/to/data/\*\*/\*.csv. |
| `description` | string | Optional. User friendly longer description text. Must be shorter than or equal to 1024 characters. |
| `displayName` | string | Optional. Display name must be shorter than or equal to 256 characters. |
| `etag` | string | Optional. The etag associated with the entity, which can be retrieved with a GetEntity request. Required for update and delete requests. |
| `format` | GoogleCloudDataplexV1StorageFormat | Required. Identifies the storage format of the entity data. It does not apply to entities with data stored in BigQuery. |
| `id` | string | Required. A user-provided entity ID. It is mutable, and will be used as the published table name. Specifying a new ID in an update entity request will override the existing value. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores, and consist of 256 or fewer characters. |
| `name` | string | Output only. The resource name of the entity, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{id}. |
| `schema` | GoogleCloudDataplexV1Schema | Required. The description of the data structure and layout. The schema is not included in list responses. It is only included in SCHEMA and FULL entity views of a GetEntity response. |
| `system` | string enum | Required. Immutable. Identifies the storage system of the entity data. Values: `STORAGE_SYSTEM_UNSPECIFIED`, `CLOUD_STORAGE`, `BIGQUERY`. |
| `type` | string enum | Required. Immutable. The type of entity. Values: `TYPE_UNSPECIFIED`, `TABLE`, `FILESET`. |
| `uid` | string | Output only. System generated unique ID for the Entity. This ID will be different if the Entity is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time when the entity was last updated. |

### `GoogleCloudDataplexV1EntityCompatibilityStatus`

- Provides compatibility information for various metadata stores.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigquery` | GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility | Output only. Whether this entity is compatible with BigQuery. |
| `hiveMetastore` | GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility | Output only. Whether this entity is compatible with Hive Metastore. |

### `GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility`

- Provides compatibility information for a specific metadata store.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compatible` | boolean | Output only. Whether the entity is compatible and can be represented in the metadata store. |
| `reason` | string | Output only. Provides additional detail if the entity is incompatible with the metadata store. |

### `GoogleCloudDataplexV1Entry`

- An entry is a representation of a data resource that can be described by various metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspects` | object | Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path} |
| `createTime` | string (google-datetime) | Output only. The time when the entry was created in Dataplex Universal Catalog. |
| `entryGroupType` | string | Output only. The type of the EntryGroup that this entry belongs to. The default value is an empty string. Recognised values include: \* context-set: EntryGroup containing context set data assets. |
| `entrySource` | GoogleCloudDataplexV1EntrySource | Optional. Information related to the source system of the data resource that is represented by the entry. |
| `entryType` | string | Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}. |
| `fullyQualifiedName` | string | Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters. |
| `name` | string | Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. |
| `parentEntry` | string | Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. |
| `updateTime` | string (google-datetime) | Output only. The time when the entry was last updated in Dataplex Universal Catalog. |

### `GoogleCloudDataplexV1EntryGroup`

- An Entry Group represents a logical grouping of one or more Entries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeRequestConfig` | GoogleCloudDataplexV1EntryGroupChangeRequestConfig | Optional. Specifies the configuration for requesting changes in the metadata belonging to the Entry Group. |
| `createTime` | string (google-datetime) | Output only. The time when the EntryGroup was created. |
| `description` | string | Optional. Description of the EntryGroup. |
| `displayName` | string | Optional. User friendly display name. |
| `etag` | string | This checksum is computed by the service, and might be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. User-defined labels for the EntryGroup. |
| `name` | string | Output only. The relative resource name of the EntryGroup, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. |
| `transferStatus` | string enum | Output only. Denotes the transfer status of the Entry Group. It is unspecified for Entry Group created from Dataplex API. Values: `TRANSFER_STATUS_UNSPECIFIED`, `TRANSFER_STATUS_MIGRATED`, `TRANSFER_STATUS_TRANSFERRED`. |
| `type` | string | Optional. Immutable. The type of this EntryGroup. The default value is an empty string. Recognised values include: \* context-set: EntryGroup containing context set data assets. |
| `uid` | string | Output only. System generated globally unique ID for the EntryGroup. If you delete and recreate the EntryGroup with the same name, this ID will be different. |
| `updateTime` | string (google-datetime) | Output only. The time when the EntryGroup was last updated. |

### `GoogleCloudDataplexV1EntryGroupChangeRequestConfig`

- Specifies the configuration for requesting changes in the metadata belonging to the Entry Group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approverEmails` | array<string> | Optional. Specifies the email addresses of users who are potential approvers and are notified when a change request is created for the metadata belonging to the Entry Group. The maximum number of emails allowed is 10. |

### `GoogleCloudDataplexV1EntryLink`

- EntryLink represents a link between two Entries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspects` | object | Optional. The aspects that are attached to the entry link. The format of the aspect key has to be the following: {project_id_or_number}.{location_id}.{aspect_type_id} Currently, only a single aspect of a Dataplex-owned Aspect Type is allowed. |
| `createTime` | string (google-datetime) | Output only. The time when the Entry Link was created. |
| `entryLinkType` | string | Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition |
| `entryReferences` | array<GoogleCloudDataplexV1EntryLinkEntryReference> | Required. Immutable. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references. |
| `name` | string | Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id} |
| `updateTime` | string (google-datetime) | Output only. The time when the Entry Link was last updated. |

### `GoogleCloudDataplexV1EntryLinkEntryReference`

- Reference to the Entry that is linked through the Entry Link.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Immutable. The relative resource name of the referenced Entry, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id} |
| `path` | string | Immutable. The path in the Entry that is referenced in the Entry Link. Empty path denotes that the Entry itself is referenced in the Entry Link. |
| `type` | string enum | Required. Immutable. The reference type of the Entry. Values: `UNSPECIFIED`, `SOURCE`, `TARGET`. |

### `GoogleCloudDataplexV1EntryLinkEvent`

- Payload associated with Entry related log events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventType` | string enum | The type of the event. Values: `EVENT_TYPE_UNSPECIFIED`, `ENTRY_LINK_CREATE`, `ENTRY_LINK_DELETE`. |
| `message` | string | The log message. |
| `resource` | string | Name of the resource. |

### `GoogleCloudDataplexV1EntryLinkTypeEvent`

- Payload associated with EntryLinkType related log events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryLinkTypeId` | string | Name of the resource. |
| `eventType` | string enum | The type of the event. Values: `EVENT_TYPE_UNSPECIFIED`, `ENTRY_LINK_TYPE_CREATE`, `ENTRY_LINK_TYPE_UPDATE`, `ENTRY_LINK_TYPE_DELETE`. |
| `message` | string | The log message. |

### `GoogleCloudDataplexV1EntrySource`

- Information related to the source system of the data resource that is represented by the entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestors` | array<GoogleCloudDataplexV1EntrySourceAncestor> | Immutable. The entries representing the ancestors of the data resource in the source system. |
| `createTime` | string (google-datetime) | The time when the resource was created in the source system. |
| `description` | string | A description of the data resource. Maximum length is 2,000 characters. |
| `displayName` | string | A user-friendly display name. Maximum length is 500 characters. |
| `labels` | object | User-defined labels. The maximum size of keys and values is 128 characters each. |
| `location` | string | Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud. |
| `platform` | string | The platform containing the source system. Maximum length is 64 characters. |
| `resource` | string | The name of the resource in the source system. Maximum length is 4,000 characters. |
| `system` | string | The name of the source system. Maximum length is 64 characters. |
| `updateTime` | string (google-datetime) | The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time. |

### `GoogleCloudDataplexV1EntrySourceAncestor`

- Information about individual items in the hierarchy that is associated with the data resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. The name of the ancestor resource. |
| `type` | string | Optional. The type of the ancestor resource. |

### `GoogleCloudDataplexV1EntryType`

- Entry Type is a template for creating Entries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorization` | GoogleCloudDataplexV1EntryTypeAuthorization | Immutable. Authorization defined for this type. |
| `createTime` | string (google-datetime) | Output only. The time when the EntryType was created. |
| `description` | string | Optional. Description of the EntryType. |
| `displayName` | string | Optional. User friendly display name. |
| `etag` | string | Optional. This checksum is computed by the service, and might be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. User-defined labels for the EntryType. |
| `name` | string | Output only. The relative resource name of the EntryType, of the form: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. |
| `platform` | string | Optional. The platform that Entries of this type belongs to. |
| `requiredAspects` | array<GoogleCloudDataplexV1EntryTypeAspectInfo> | AspectInfo for the entry type. |
| `system` | string | Optional. The system that Entries of this type belongs to. Examples include CloudSQL, MariaDB etc |
| `typeAliases` | array<string> | Optional. Indicates the classes this Entry Type belongs to, for example, TABLE, DATABASE, MODEL. |
| `uid` | string | Output only. System generated globally unique ID for the EntryType. This ID will be different if the EntryType is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time when the EntryType was last updated. |

### `GoogleCloudDataplexV1EntryTypeAspectInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string | Required aspect type for the entry type. |

### `GoogleCloudDataplexV1EntryTypeAuthorization`

- Authorization for an Entry Type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alternateUsePermission` | string | Immutable. The IAM permission grantable on the Entry Group to allow access to instantiate Entries of Dataplex Universal Catalog owned Entry Types, only settable for Dataplex Universal Catalog owned Types. |

### `GoogleCloudDataplexV1ExecutionIdentity`

- The identity to run the datascan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataplexServiceAgent` | GoogleCloudDataplexV1ExecutionIdentityDataplexServiceAgent | Optional. The Dataplex service agent associated with the user's project. |
| `serviceAccount` | GoogleCloudDataplexV1ExecutionIdentityServiceAccount | Optional. The provided service account. |
| `userCredential` | GoogleCloudDataplexV1ExecutionIdentityUserCredential | Optional. The credential of the calling user. Supports only ONE_TIME trigger type. |

### `GoogleCloudDataplexV1ExecutionIdentityDataplexServiceAgent`

- The Dataplex service agent associated with the user's project.
- Version: v1

### `GoogleCloudDataplexV1ExecutionIdentityServiceAccount`

- The service account
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Required. Service account email. The datascan will execute with this service account's credentials. The user calling this API must have permissions to act as this service account. Dataplex service agent must be granted iam.serviceAccounts.getAccessToken permission on this service account, for example, through the iam.serviceAccountTokenCreator role . |

### `GoogleCloudDataplexV1ExecutionIdentityUserCredential`

- The credential of the calling user.
- Version: v1

### `GoogleCloudDataplexV1GenerateDataQualityRulesRequest`

- Request details for generating data quality rule recommendations.
- Version: v1

### `GoogleCloudDataplexV1GenerateDataQualityRulesResponse`

- Response details for data quality rule recommendations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rule` | array<GoogleCloudDataplexV1DataQualityRule> | The data quality rules that Dataplex Universal Catalog generates based on the results of a data profiling scan. |

### `GoogleCloudDataplexV1Glossary`

- A Glossary represents a collection of GlossaryCategories and GlossaryTerms defined by the user. Glossary is a top level resource and is the Google Cloud parent resource of all the GlossaryCategories and GlossaryTerms within it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categoryCount` | integer (int32) | Output only. The number of GlossaryCategories in the Glossary. |
| `createTime` | string (google-datetime) | Output only. The time at which the Glossary was created. |
| `description` | string | Optional. The user-mutable description of the Glossary. |
| `displayName` | string | Optional. User friendly display name of the Glossary. This is user-mutable. This will be same as the GlossaryId, if not specified. |
| `etag` | string | Optional. Needed for resource freshness validation. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. User-defined labels for the Glossary. |
| `name` | string | Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} |
| `termCount` | integer (int32) | Output only. The number of GlossaryTerms in the Glossary. |
| `uid` | string | Output only. System generated unique id for the Glossary. This ID will be different if the Glossary is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time at which the Glossary was last updated. |

### `GoogleCloudDataplexV1GlossaryCategory`

- A GlossaryCategory represents a collection of GlossaryCategories and GlossaryTerms within a Glossary that are related to each other.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the GlossaryCategory was created. |
| `description` | string | Optional. The user-mutable description of the GlossaryCategory. |
| `displayName` | string | Optional. User friendly display name of the GlossaryCategory. This is user-mutable. This will be same as the GlossaryCategoryId, if not specified. |
| `labels` | object | Optional. User-defined labels for the GlossaryCategory. |
| `name` | string | Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |
| `parent` | string | Required. The immediate parent of the GlossaryCategory in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |
| `uid` | string | Output only. System generated unique id for the GlossaryCategory. This ID will be different if the GlossaryCategory is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time at which the GlossaryCategory was last updated. |

### `GoogleCloudDataplexV1GlossaryTerm`

- GlossaryTerms are the core of Glossary. A GlossaryTerm holds a rich text description that can be attached to Entries or specific columns to enrich them.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the GlossaryTerm was created. |
| `description` | string | Optional. The user-mutable description of the GlossaryTerm. |
| `displayName` | string | Optional. User friendly display name of the GlossaryTerm. This is user-mutable. This will be same as the GlossaryTermId, if not specified. |
| `labels` | object | Optional. User-defined labels for the GlossaryTerm. |
| `name` | string | Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} |
| `parent` | string | Required. The immediate parent of the GlossaryTerm in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |
| `uid` | string | Output only. System generated unique id for the GlossaryTerm. This ID will be different if the GlossaryTerm is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time at which the GlossaryTerm was last updated. |

### `GoogleCloudDataplexV1GovernanceEvent`

- Payload associated with Governance related log events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entity` | GoogleCloudDataplexV1GovernanceEventEntity | Entity resource information if the log event is associated with a specific entity. |
| `eventType` | string enum | The type of the event. Values: `EVENT_TYPE_UNSPECIFIED`, `RESOURCE_IAM_POLICY_UPDATE`, `BIGQUERY_TABLE_CREATE`, `BIGQUERY_TABLE_UPDATE`, `BIGQUERY_TABLE_DELETE`, `BIGQUERY_CONNECTION_CREATE`, `BIGQUERY_CONNECTION_UPDATE`, `BIGQUERY_CONNECTION_DELETE`, `BIGQUERY_TAXONOMY_CREATE`, `BIGQUERY_POLICY_TAG_CREATE`, `BIGQUERY_POLICY_TAG_DELETE`, `BIGQUERY_POLICY_TAG_SET_IAM_POLICY`, `ACCESS_POLICY_UPDATE`, `GOVERNANCE_RULE_MATCHED_RESOURCES`, `GOVERNANCE_RULE_SEARCH_LIMIT_EXCEEDS`, `GOVERNANCE_RULE_ERRORS`, `GOVERNANCE_RULE_PROCESSING`. |
| `message` | string | The log message. |

### `GoogleCloudDataplexV1GovernanceEventEntity`

- Information about Entity resource that the log event is associated with.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entity` | string | The Entity resource the log event is associated with. Format: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id} |
| `entityType` | string enum | Type of entity. Values: `ENTITY_TYPE_UNSPECIFIED`, `TABLE`, `FILESET`. |

### `GoogleCloudDataplexV1ImportItem`

- An object that describes the values that you want to set for an entry and its attached aspects when you import metadata. Used when you run a metadata import job. See CreateMetadataJob.You provide a collection of import items in a metadata import file. For more information about how to create a metadata import file, see Metadata import file (https://cloud.google.com/dataplex/docs/import-metadata#metadata-import-file).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectKeys` | array<string> | The aspects to modify. Supports the following syntaxes: {aspect_type_reference}: matches aspects that belong to the specified aspect type and are attached directly to the entry. {aspect_type_reference}@{path}: matches aspects that belong to the specified aspect type and path. {aspect_type_reference}@\* : matches aspects of the given type for all paths. \*@path : matches aspects of all types on the given path.Replace {aspect_type_reference} with a reference to the aspect type, in the format {project_id_or_number}.{location_id}.{aspect_type_id}.In FULL entry sync mode, if you leave this field empty, it is treated as specifying exactly those aspects that are present within the specified entry. Dataplex Universal Catalog implicitly adds the keys for all of the required aspects of an entry. |
| `entry` | GoogleCloudDataplexV1Entry | Information about an entry and its attached aspects. |
| `entryLink` | GoogleCloudDataplexV1EntryLink | Information about the entry link. User should provide either one of the entry or entry_link. While providing entry_link, user should not provide update_mask and aspect_keys. |
| `updateMask` | string (google-fieldmask) | The fields to update, in paths that are relative to the Entry resource. Separate each field with a comma.In FULL entry sync mode, Dataplex Universal Catalog includes the paths of all of the fields for an entry that can be modified, including aspects. This means that Dataplex Universal Catalog replaces the existing entry with the entry in the metadata import file. All modifiable fields are updated, regardless of the fields that are listed in the update mask, and regardless of whether a field is present in the entry object.The update_mask field is ignored when an entry is created or re-created.In an aspect-only metadata job (when entry sync mode is NONE), set this value to aspects.Dataplex Universal Catalog also determines which entries and aspects to modify by comparing the values and timestamps that you provide in the metadata import file with the values and timestamps that exist in your project. For more information, see Comparison logic (https://cloud.google.com/dataplex/docs/import-metadata#data-modification-logic). |

### `GoogleCloudDataplexV1Job`

- A job represents an instance of a task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. The time when the job ended. |
| `executionSpec` | GoogleCloudDataplexV1TaskExecutionSpec | Output only. Spec related to how a task is executed. |
| `labels` | object | Output only. User-defined labels for the task. |
| `message` | string | Output only. Additional information about the current state. |
| `name` | string | Output only. The relative resource name of the job, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}. |
| `retryCount` | integer (uint32) | Output only. The number of times the job has been retried (excluding the initial attempt). |
| `service` | string enum | Output only. The underlying service running a job. Values: `SERVICE_UNSPECIFIED`, `DATAPROC`. |
| `serviceJob` | string | Output only. The full resource name for the job run under a particular service. |
| `startTime` | string (google-datetime) | Output only. The time when the job was started. |
| `state` | string enum | Output only. Execution state for the job. Values: `STATE_UNSPECIFIED`, `RUNNING`, `CANCELLING`, `CANCELLED`, `SUCCEEDED`, `FAILED`, `ABORTED`. |
| `trigger` | string enum | Output only. Job execution trigger. Values: `TRIGGER_UNSPECIFIED`, `TASK_CONFIG`, `RUN_REQUEST`. |
| `uid` | string | Output only. System generated globally unique ID for the job. |

### `GoogleCloudDataplexV1JobEvent`

- The payload associated with Job logs that contains events describing jobs that have run within a Lake.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time when the job ended running. |
| `executionTrigger` | string enum | Job execution trigger. Values: `EXECUTION_TRIGGER_UNSPECIFIED`, `TASK_CONFIG`, `RUN_REQUEST`. |
| `jobId` | string | The unique id identifying the job. |
| `message` | string | The log message. |
| `retries` | integer (int32) | The number of retries. |
| `service` | string enum | The service used to execute the job. Values: `SERVICE_UNSPECIFIED`, `DATAPROC`. |
| `serviceJob` | string | The reference to the job within the service. |
| `startTime` | string (google-datetime) | The time when the job started running. |
| `state` | string enum | The job state on completion. Values: `STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `ABORTED`. |
| `type` | string enum | The type of the job. Values: `TYPE_UNSPECIFIED`, `SPARK`, `NOTEBOOK`. |

### `GoogleCloudDataplexV1Lake`

- A lake is a centralized repository for managing enterprise data across the organization distributed across many cloud projects, and stored in a variety of storage services such as Google Cloud Storage and BigQuery. The resources attached to a lake are referred to as managed resources. Data within these managed resources can be structured or unstructured. A lake provides data admins with tools to organize, secure and manage their data at scale, and provides data scientists and data engineers an integrated experience to easily search, discover, analyze and transform data and associated metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetStatus` | GoogleCloudDataplexV1AssetStatus | Output only. Aggregated status of the underlying assets of the lake. |
| `createTime` | string (google-datetime) | Output only. The time when the lake was created. |
| `description` | string | Optional. Description of the lake. |
| `displayName` | string | Optional. User friendly display name. |
| `labels` | object | Optional. User-defined labels for the lake. |
| `metastore` | GoogleCloudDataplexV1LakeMetastore | Optional. Settings to manage lake and Dataproc Metastore service instance association. |
| `metastoreStatus` | GoogleCloudDataplexV1LakeMetastoreStatus | Output only. Metastore status of the lake. |
| `name` | string | Output only. The relative resource name of the lake, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `serviceAccount` | string | Output only. Service account associated with this lake. This service account must be authorized to access or operate on resources managed by the lake. |
| `state` | string enum | Output only. Current state of the lake. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `ACTION_REQUIRED`. |
| `uid` | string | Output only. System generated globally unique ID for the lake. This ID will be different if the lake is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time when the lake was last updated. |

### `GoogleCloudDataplexV1LakeMetastore`

- Settings to manage association of Dataproc Metastore with a lake.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `service` | string | Optional. A relative reference to the Dataproc Metastore (https://cloud.google.com/dataproc-metastore/docs) service associated with the lake: projects/{project_id}/locations/{location_id}/services/{service_id} |

### `GoogleCloudDataplexV1LakeMetastoreStatus`

- Status of Lake and Dataproc Metastore service instance association.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpoint` | string | The URI of the endpoint used to access the Metastore service. |
| `message` | string | Additional information about the current status. |
| `state` | string enum | Current state of association. Values: `STATE_UNSPECIFIED`, `NONE`, `READY`, `UPDATING`, `ERROR`. |
| `updateTime` | string (google-datetime) | Last update time of the metastore status of the lake. |

### `GoogleCloudDataplexV1ListActionsResponse`

- List actions response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<GoogleCloudDataplexV1Action> | Actions under the given parent lake/zone/asset. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudDataplexV1ListAspectTypesResponse`

- List AspectTypes response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectTypes` | array<GoogleCloudDataplexV1AspectType> | AspectTypes under the given parent location. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachableLocations` | array<string> | Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListAssetsResponse`

- List assets response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assets` | array<GoogleCloudDataplexV1Asset> | Asset under the given parent zone. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudDataplexV1ListChangeRequestsResponse`

- Response message for ListChangeRequests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeRequests` | array<GoogleCloudDataplexV1ChangeRequest> | The ChangeRequests from the specified project and location. |
| `nextPageToken` | string | A token, which can be sent as page_token to retrieve the next page. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `GoogleCloudDataplexV1ListDataAssetsResponse`

- Response message for listing data assets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataAssets` | array<GoogleCloudDataplexV1DataAsset> | The data assets for the requested filter criteria. |
| `nextPageToken` | string | A token, which can be sent as page_token to retrieve the next page. If this field is empty, then there are no subsequent pages. |

### `GoogleCloudDataplexV1ListDataDomainBindingsResponse`

- List DataDomainBindings response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataDomainBindings` | array<GoogleCloudDataplexV1DataDomainBinding> | DataDomainBindings under the given parent. |
| `nextPageToken` | string | Token to retrieve the next page of results. |

### `GoogleCloudDataplexV1ListDataDomainsResponse`

- List DataDomains response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataDomains` | array<GoogleCloudDataplexV1DataDomain> | DataDomains under the given parent. |
| `nextPageToken` | string | Token to retrieve the next page of results. |

### `GoogleCloudDataplexV1ListDataProductsResponse`

- Response message for listing data products.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataProducts` | array<GoogleCloudDataplexV1DataProduct> | The data products for the requested filter criteria. |
| `nextPageToken` | string | A token, which can be sent as page_token to retrieve the next page. If this field is empty, then there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListDataScanJobsResponse`

- List DataScanJobs response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataScanJobs` | array<GoogleCloudDataplexV1DataScanJob> | DataScanJobs (BASIC view only) under a given dataScan. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudDataplexV1ListDataScansResponse`

- List dataScans response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataScans` | array<GoogleCloudDataplexV1DataScan> | DataScans (BASIC view only) under the given parent location. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `GoogleCloudDataplexV1ListEncryptionConfigsResponse`

- List EncryptionConfigs Response
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionConfigs` | array<GoogleCloudDataplexV1EncryptionConfig> | The list of EncryptionConfigs under the given parent location. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachableLocations` | array<string> | Locations that could not be reached. |

### `GoogleCloudDataplexV1ListEntitiesResponse`

- List metadata entities response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entities` | array<GoogleCloudDataplexV1Entity> | Entities in the specified parent zone. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no remaining results in the list. |

### `GoogleCloudDataplexV1ListEntriesResponse`

- List Entries response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entries` | array<GoogleCloudDataplexV1Entry> | The list of entries under the given parent location. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudDataplexV1ListEntryGroupsResponse`

- List entry groups response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryGroups` | array<GoogleCloudDataplexV1EntryGroup> | Entry groups under the given parent location. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachableLocations` | array<string> | Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListEntryTypesResponse`

- List EntryTypes response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryTypes` | array<GoogleCloudDataplexV1EntryType> | EntryTypes under the given parent location. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachableLocations` | array<string> | Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListGlossariesResponse`

- List Glossaries Response
- Version: v1

| Field | Type | Description |
|---|---|---|
| `glossaries` | array<GoogleCloudDataplexV1Glossary> | Lists the Glossaries in the specified parent. |
| `nextPageToken` | string | A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachableLocations` | array<string> | Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListGlossaryCategoriesResponse`

- List GlossaryCategories Response
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categories` | array<GoogleCloudDataplexV1GlossaryCategory> | Lists the GlossaryCategories in the specified parent. |
| `nextPageToken` | string | A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachableLocations` | array<string> | Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListGlossaryTermsResponse`

- List GlossaryTerms Response
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `terms` | array<GoogleCloudDataplexV1GlossaryTerm> | Lists the GlossaryTerms in the specified parent. |
| `unreachableLocations` | array<string> | Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListJobsResponse`

- List jobs response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobs` | array<GoogleCloudDataplexV1Job> | Jobs under a given task. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudDataplexV1ListLakesResponse`

- List lakes response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lakes` | array<GoogleCloudDataplexV1Lake> | Lakes under the given parent location. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachableLocations` | array<string> | Locations that could not be reached. |

### `GoogleCloudDataplexV1ListMetadataFeedsResponse`

- Response message for ListMetadataFeeds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadataFeeds` | array<GoogleCloudDataplexV1MetadataFeed> | List of metadata feeds under the specified parent location. |
| `nextPageToken` | string | A token to retrieve the next page of results. If there are no more results in the list, the value is empty. |
| `unreachable` | array<string> | Unordered list. Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListMetadataJobsResponse`

- List metadata jobs response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadataJobs` | array<GoogleCloudDataplexV1MetadataJob> | Metadata jobs under the specified parent location. |
| `nextPageToken` | string | A token to retrieve the next page of results. If there are no more results in the list, the value is empty. |
| `unreachableLocations` | array<string> | Locations that the service couldn't reach. |

### `GoogleCloudDataplexV1ListPartitionsResponse`

- List metadata partitions response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no remaining results in the list. |
| `partitions` | array<GoogleCloudDataplexV1Partition> | Partitions under the specified parent entity. |

### `GoogleCloudDataplexV1ListTasksResponse`

- List tasks response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `tasks` | array<GoogleCloudDataplexV1Task> | Tasks under the given parent lake. |
| `unreachableLocations` | array<string> | Locations that could not be reached. |

### `GoogleCloudDataplexV1ListZonesResponse`

- List zones response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `zones` | array<GoogleCloudDataplexV1Zone> | Zones under the given parent lake. |

### `GoogleCloudDataplexV1LookupContextRequest`

- Lookup Context using permissions in the source system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | object | Optional. Allows to configure the context.Supported options: format - The format of the context (one of yaml, xml, json, default is yaml). context_budget - If provided, the output will be intelligently truncated on a best-effort basis to contain approximately the desired amount of characters. There is no guarantee to achieve the specific amount. all_schema_fields - If set to true, all schema fields will be returned in the context (regardless of context_budget value). Otherwise, the list of schema fields is truncated. Default is false. |
| `resources` | array<string> | Required. The entry names to look up the context for. The maximum number of resources for a request is limited to 10.Examples:projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry} |

### `GoogleCloudDataplexV1LookupContextResponse`

- Lookup Context response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `context` | string | Pre-formatted block of text containing the context for the requested resources. |

### `GoogleCloudDataplexV1LookupEntryLinksResponse`

- Response message for LookupEntryLinks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryLinks` | array<GoogleCloudDataplexV1EntryLink> | List of entry links that reference the specified entry. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `GoogleCloudDataplexV1MetadataFeed`

- MetadataFeed contains information related to the metadata feed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the feed was created. |
| `filters` | GoogleCloudDataplexV1MetadataFeedFilters | Optional. The filters of the metadata feed. Only the changes that match the filters are published. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Identifier. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}. |
| `pubsubTopic` | string | Optional. The pubsub topic that you want the metadata feed messages to publish to. Please grant Dataplex service account the permission to publish messages to the topic. The service account is: service-{PROJECT_NUMBER}@gcp-sa-dataplex.iam.gserviceaccount.com. |
| `scope` | GoogleCloudDataplexV1MetadataFeedScope | Required. The scope of the metadata feed. Only the in scope changes are published. |
| `uid` | string | Output only. A system-generated, globally unique ID for the metadata job. If the metadata job is deleted and then re-created with the same name, this ID is different. |
| `updateTime` | string (google-datetime) | Output only. The time when the feed was updated. |

### `GoogleCloudDataplexV1MetadataFeedFilters`

- Filters defines the type of changes that you want to listen to. You can have multiple entry type filters and multiple aspect type filters. All of the entry type filters are OR'ed together. All of the aspect type filters are OR'ed together. All of the entry type filters and aspect type filters are AND'ed together.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectTypes` | array<string> | Optional. The aspect types that you want to listen to. Depending on how the aspect is attached to the entry, in the format: projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}. |
| `changeTypes` | array<string> | Optional. The type of change that you want to listen to. If not specified, all changes are published. Values: `CHANGE_TYPE_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`. |
| `entryTypes` | array<string> | Optional. The entry types that you want to listen to, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are published. |

### `GoogleCloudDataplexV1MetadataFeedScope`

- Scope defines the scope of the metadata feed. Scopes are exclusive. Only one of the scopes can be specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryGroups` | array<string> | Optional. The entry groups whose entries you want to listen to. Must be in the format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. |
| `organizationLevel` | boolean | Optional. Whether the metadata feed is at the organization-level. If true, all changes happened to the entries in the same organization as the feed are published. If false, you must specify a list of projects or a list of entry groups whose entries you want to listen to.The default is false. |
| `projects` | array<string> | Optional. The projects whose entries you want to listen to. Must be in the same organization as the feed. Must be in the format: projects/{project_id_or_number}. |

### `GoogleCloudDataplexV1MetadataJob`

- A metadata job resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the metadata job was created. |
| `exportResult` | GoogleCloudDataplexV1MetadataJobExportJobResult | Output only. Export job result. |
| `exportSpec` | GoogleCloudDataplexV1MetadataJobExportJobSpec | Export job specification. |
| `importResult` | GoogleCloudDataplexV1MetadataJobImportJobResult | Output only. Import job result. |
| `importSpec` | GoogleCloudDataplexV1MetadataJobImportJobSpec | Import job specification. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Output only. Identifier. The name of the resource that the configuration is applied to, in the format projects/{project_number}/locations/{location_id}/metadataJobs/{metadata_job_id}. |
| `status` | GoogleCloudDataplexV1MetadataJobStatus | Output only. Metadata job status. |
| `type` | string enum | Required. Metadata job type. Values: `TYPE_UNSPECIFIED`, `IMPORT`, `EXPORT`. |
| `uid` | string | Output only. A system-generated, globally unique ID for the metadata job. If the metadata job is deleted and then re-created with the same name, this ID is different. |
| `updateTime` | string (google-datetime) | Output only. The time when the metadata job was updated. |

### `GoogleCloudDataplexV1MetadataJobExportJobResult`

- Summary results from a metadata export job. The results are a snapshot of the metadata at the time when the job was created. The exported entries are saved to a Cloud Storage bucket.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | Output only. The error message if the metadata export job failed. |
| `exportedEntries` | string (int64) | Output only. The number of entries that were exported. |

### `GoogleCloudDataplexV1MetadataJobExportJobSpec`

- Job specification for a metadata export job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `outputPath` | string | Required. The root path of the Cloud Storage bucket to export the metadata to, in the format gs://{bucket}/. You can optionally specify a custom prefix after the bucket name, in the format gs://{bucket}/{prefix}/. The maximum length of the custom prefix is 128 characters. Dataplex Universal Catalog constructs the object path for the exported files by using the bucket name and prefix that you provide, followed by a system-generated path.The bucket must be in the same VPC Service Controls perimeter as the job. |
| `scope` | GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope | Required. The scope of the export job. |

### `GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope`

- The scope of the export job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectTypes` | array<string> | The aspect types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}. Only aspects that belong to the specified aspect types are affected by the job. |
| `entryGroups` | array<string> | The entry groups whose metadata you want to export, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. Only the entries in the specified entry groups are exported.The entry groups must be in the same location and the same VPC Service Controls perimeter as the job.If you set the job scope to be a list of entry groups, then set the organization-level export flag to false and don't provide a list of projects. |
| `entryTypes` | array<string> | The entry types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are affected by the job. |
| `organizationLevel` | boolean | Whether the metadata export job is an organization-level export job. If true, the job exports the entries from the same organization and VPC Service Controls perimeter as the job. The project that the job belongs to determines the VPC Service Controls perimeter. If you set the job scope to be at the organization level, then don't provide a list of projects or entry groups. If false, you must specify a list of projects or a list of entry groups whose entries you want to export.The default is false. |
| `projects` | array<string> | The projects whose metadata you want to export, in the format projects/{project_id_or_number}. Only the entries from the specified projects are exported.The projects must be in the same organization and VPC Service Controls perimeter as the job.If you set the job scope to be a list of projects, then set the organization-level export flag to false and don't provide a list of entry groups. |

### `GoogleCloudDataplexV1MetadataJobImportJobResult`

- Results from a metadata import job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createdEntries` | string (int64) | Output only. The total number of entries that were created. |
| `createdEntryLinks` | string (int64) | Output only. The total number of entry links that were successfully created. |
| `deletedEntries` | string (int64) | Output only. The total number of entries that were deleted. |
| `deletedEntryLinks` | string (int64) | Output only. The total number of entry links that were successfully deleted. |
| `recreatedEntries` | string (int64) | Output only. The total number of entries that were recreated. |
| `unchangedEntries` | string (int64) | Output only. The total number of entries that were unchanged. |
| `unchangedEntryLinks` | string (int64) | Output only. The total number of entry links that were left unchanged. |
| `updateTime` | string (google-datetime) | Output only. The time when the status was updated. |
| `updatedEntries` | string (int64) | Output only. The total number of entries that were updated. |

### `GoogleCloudDataplexV1MetadataJobImportJobSpec`

- Job specification for a metadata import job.You can run the following kinds of metadata import jobs: Full sync of entries with incremental import of their aspects. Supported for custom entries. Incremental import of aspects only. Supported for aspects that belong to custom entries and system entries. For custom entries, you can modify both optional aspects and required aspects. For system entries, you can modify optional aspects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectSyncMode` | string enum | Required. The sync mode for aspects. Values: `SYNC_MODE_UNSPECIFIED`, `FULL`, `INCREMENTAL`, `NONE`. |
| `entrySyncMode` | string enum | Required. The sync mode for entries. Values: `SYNC_MODE_UNSPECIFIED`, `FULL`, `INCREMENTAL`, `NONE`. |
| `logLevel` | string enum | Optional. The level of logs to write to Cloud Logging for this job.Debug-level logs provide highly-detailed information for troubleshooting, but their increased verbosity could incur additional costs (https://cloud.google.com/stackdriver/pricing) that might not be merited for all jobs.If unspecified, defaults to INFO. Values: `LOG_LEVEL_UNSPECIFIED`, `DEBUG`, `INFO`. |
| `scope` | GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope | Required. A boundary on the scope of impact that the metadata import job can have. |
| `sourceCreateTime` | string (google-datetime) | Optional. The time when the process that created the metadata import files began. |
| `sourceStorageUri` | string | Optional. The URI of a Cloud Storage bucket or folder (beginning with gs:// and ending with /) that contains the metadata import files for this job.A metadata import file defines the values to set for each of the entries and aspects in a metadata import job. For more information about how to create a metadata import file and the file requirements, see Metadata import file (https://cloud.google.com/dataplex/docs/import-metadata#metadata-import-file).You can provide multiple metadata import files in the same metadata job. The bucket or folder must contain at least one metadata import file, in JSON Lines format (either .json or .jsonl file extension).In FULL entry sync mode, don't save the metadata import file in a folder named SOURCE_STORAGE_URI/deletions/.Caution: If the metadata import file contains no data, all entries and aspects that belong to the job's scope are deleted. |

### `GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope`

- A boundary on the scope of impact that the metadata import job can have.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectTypes` | array<string> | Optional. The aspect types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/aspectTypes/{aspect_type_id}. The job modifies only the aspects that belong to these aspect types.This field is required when creating an aspect-only import job.If the metadata import file attempts to modify an aspect whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an aspect type must either match the location of the job, or the aspect type must be global. |
| `entryGroups` | array<string> | Required. The entry groups that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id}. Only entries and aspects that belong to the specified entry groups are affected by the job.The entry groups and the job must be in the same location. |
| `entryLinkTypes` | array<string> | Optional. The entry link types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryLinkTypes/{entry_link_type_id}. The job modifies only the entryLinks that belong to these entry link types.If the metadata import file attempts to create or delete an entry link whose entry link type isn't included in this list, the import job will skip those entry links. |
| `entryTypes` | array<string> | Required. The entry types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryTypes/{entry_type_id}. The job modifies only the entries and aspects that belong to these entry types.If the metadata import file attempts to modify an entry whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an entry type must either match the location of the job, or the entry type must be global. |
| `glossaries` | array<string> | Optional. The glossaries that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/glossaries/{glossary_id}.While importing Business Glossary entries, the user must provide glossaries. While importing entries, the user does not have to provide glossaries. If the metadata import file attempts to modify Business Glossary entries whose glossary isn't included in this list, the import job will skip those entries.The location of a glossary must either match the location of the job, or the glossary must be global. |
| `referencedEntryScopes` | array<string> | Optional. Defines the scope of entries that can be referenced in the entry links.Currently, projects are supported as valid scopes. Format: projects/{project_number_or_id}If the metadata import file attempts to create an entry link which references an entry that is not in the scope, the import job will skip that entry link. |

### `GoogleCloudDataplexV1MetadataJobStatus`

- Metadata job status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completionPercent` | integer (int32) | Output only. Progress tracking. |
| `message` | string | Output only. Message relating to the progression of a metadata job. |
| `state` | string enum | Output only. State of the metadata job. Values: `STATE_UNSPECIFIED`, `QUEUED`, `RUNNING`, `CANCELING`, `CANCELED`, `SUCCEEDED`, `FAILED`, `SUCCEEDED_WITH_ERRORS`. |
| `updateTime` | string (google-datetime) | Output only. The time when the status was updated. |

### `GoogleCloudDataplexV1ModifyEntryRequest`

- Modify Entry request using permissions in the source system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectKeys` | array<string> | Optional. The aspect keys which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @\* - matches aspects of the given type for all paths. \*@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request. |
| `deleteMissingAspects` | boolean | Optional. If set to true, any aspects not specified in the request will be deleted. The default is false. |
| `entry` | GoogleCloudDataplexV1Entry | Required. The entry to modify. |
| `updateMask` | string (google-fieldmask) | Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request. |

### `GoogleCloudDataplexV1OperationMetadata`

- Represents the metadata of a long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudDataplexV1Partition`

- Represents partition metadata contained within entity instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The etag for this partition. |
| `location` | string | Required. Immutable. The location of the entity data within the partition, for example, gs://bucket/path/to/entity/key1=value1/key2=value2. Or projects//datasets//tables/ |
| `name` | string | Output only. Partition values used in the HTTP URL must be double encoded. For example, url_encode(url_encode(value)) can be used to encode "US:CA/CA#Sunnyvale so that the request URL ends with "/partitions/US%253ACA/CA%2523Sunnyvale". The name field in the response retains the encoded format. |
| `values` | array<string> | Required. Immutable. The set of values representing the partition, which correspond to the partition schema defined in the parent entity. |

### `GoogleCloudDataplexV1RejectChangeRequestRequest`

- Request message for RejectChangeRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comment` | string | Optional. The reason for rejecting the ChangeRequest. |
| `etag` | string | Optional. The etag of the ChangeRequest. |

### `GoogleCloudDataplexV1RequestBatchMetadataChangeRequest`

- Request message for submitting a set of catalog changes proposals.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changePayload` | GoogleCloudDataplexV1BatchChangeMetadataRequest | Required. The detailed specification of the proposed changes. This payload is intended to be embedded as the change_payload in the resulting ChangeRequest. |
| `deferredValidation` | boolean | Optional. If set to true, defers reference validation between entries to when the change request is approved and applied. Structural validation of entries and aspects is still performed at the time of submission. The default is false. |
| `justification` | string | Optional. Justification for the metadata change request. |
| `labels` | object | Optional. User-defined labels for the metadata change request. |

### `GoogleCloudDataplexV1RequestBatchMetadataChangeResponse`

- Response message containing the reference to the created change request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeRequest` | string | The resource name of the created ChangeRequest. Format: projects/{project}/locations/{location}/changeRequests/{change_request} |

### `GoogleCloudDataplexV1RequestDataProductAccessRequest`

- Message for requesting access to a Data Product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeRequest` | GoogleCloudDataplexV1ChangeRequest | Required. The change request for the data product access request. |
| `validateOnly` | boolean | Optional. Validates the request without actually creating the access change request. Defaults to false. |

### `GoogleCloudDataplexV1RequestDataProductAccessResponse`

- Response message for requesting access to a Data Product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeRequestName` | string | The resource name of the created ChangeRequest. Format: projects/{project_number}/locations/{location_id}/changeRequests/{change_request_id} |

### `GoogleCloudDataplexV1RunDataScanRequest`

- Run DataScan Request
- Version: v1

### `GoogleCloudDataplexV1RunDataScanResponse`

- Run DataScan Response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `job` | GoogleCloudDataplexV1DataScanJob | DataScanJob created by RunDataScan request. |

### `GoogleCloudDataplexV1RunTaskRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | object | Optional. Execution spec arguments. If the map is left empty, the task will run with existing execution spec args from task definition. If the map contains an entry with a new key, the same will be added to existing set of args. If the map contains an entry with an existing arg key in task definition, the task will run with new arg value for that entry. Clearing an existing arg will require arg value to be explicitly set to a hyphen "-". The arg value cannot be empty. |
| `labels` | object | Optional. User-defined labels for the task. If the map is left empty, the task will run with existing labels from task definition. If the map contains an entry with a new key, the same will be added to existing set of labels. If the map contains an entry with an existing label key in task definition, the task will run with new label value for that entry. Clearing an existing label will require label value to be explicitly set to a hyphen "-". The label value cannot be empty. |

### `GoogleCloudDataplexV1RunTaskResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `job` | GoogleCloudDataplexV1Job | Jobs created by RunTask API. |

### `GoogleCloudDataplexV1ScannedData`

- The data scanned during processing (e.g. in incremental DataScan)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `incrementalField` | GoogleCloudDataplexV1ScannedDataIncrementalField | The range denoted by values of an incremental field |

### `GoogleCloudDataplexV1ScannedDataIncrementalField`

- A data range denoted by a pair of start/end values of a field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `end` | string | Output only. Value that marks the end of the range. |
| `field` | string | Output only. The field that contains values which monotonically increases over time (e.g. a timestamp column). |
| `start` | string | Output only. Value that marks the start of the range. |

### `GoogleCloudDataplexV1Schema`

- Schema information describing the structure and layout of the data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | array<GoogleCloudDataplexV1SchemaSchemaField> | Optional. The sequence of fields describing data in table entities. Note: BigQuery SchemaFields are immutable. |
| `partitionFields` | array<GoogleCloudDataplexV1SchemaPartitionField> | Optional. The sequence of fields describing the partition structure in entities. If this field is empty, there are no partitions within the data. |
| `partitionStyle` | string enum | Optional. The structure of paths containing partition data within the entity. Values: `PARTITION_STYLE_UNSPECIFIED`, `HIVE_COMPATIBLE`. |
| `userManaged` | boolean | Required. Set to true if user-managed or false if managed by Dataplex Universal Catalog. The default is false (managed by Dataplex Universal Catalog). Set to falseto enable Dataplex Universal Catalog discovery to update the schema. including new data discovery, schema inference, and schema evolution. Users retain the ability to input and edit the schema. Dataplex Universal Catalog treats schema input by the user as though produced by a previous Dataplex Universal Catalog discovery operation, and it will evolve the schema and take action based on that treatment. Set to true to fully manage the entity schema. This setting guarantees that Dataplex Universal Catalog will not change schema fields. |

### `GoogleCloudDataplexV1SchemaPartitionField`

- Represents a key field within the entity's partition structure. You could have up to 20 partition fields, but only the first 10 partitions have the filtering ability due to performance consideration. Note: Partition fields are immutable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Partition field name must consist of letters, numbers, and underscores only, with a maximum of length of 256 characters, and must begin with a letter or underscore.. |
| `type` | string enum | Required. Immutable. The type of field. Values: `TYPE_UNSPECIFIED`, `BOOLEAN`, `BYTE`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`, `DECIMAL`, `STRING`, `BINARY`, `TIMESTAMP`, `DATE`, `TIME`, `RECORD`, `NULL`. |

### `GoogleCloudDataplexV1SchemaSchemaField`

- Represents a column field within a table schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. User friendly field description. Must be less than or equal to 1024 characters. |
| `fields` | array<GoogleCloudDataplexV1SchemaSchemaField> | Optional. Any nested field for complex types. |
| `mode` | string enum | Required. Additional field semantics. Values: `MODE_UNSPECIFIED`, `REQUIRED`, `NULLABLE`, `REPEATED`. |
| `name` | string | Required. The name of the field. Must contain only letters, numbers and underscores, with a maximum length of 767 characters, and must begin with a letter or underscore. |
| `type` | string enum | Required. The type of field. Values: `TYPE_UNSPECIFIED`, `BOOLEAN`, `BYTE`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`, `DECIMAL`, `STRING`, `BINARY`, `TIMESTAMP`, `DATE`, `TIME`, `RECORD`, `NULL`. |

### `GoogleCloudDataplexV1SearchEntriesResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `results` | array<GoogleCloudDataplexV1SearchEntriesResult> | The results matching the search query. |
| `totalSize` | integer (int32) | The estimated total number of matching entries. This number isn't guaranteed to be accurate. |
| `unreachable` | array<string> | Locations that the service couldn't reach. Search results don't include data from these locations. |

### `GoogleCloudDataplexV1SearchEntriesResult`

- A single result of a SearchEntries request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataplexEntry` | GoogleCloudDataplexV1Entry | — |
| `linkedResource` | string | Linked resource name. |
| `snippets` | GoogleCloudDataplexV1SearchEntriesResultSnippets | Snippets. |

### `GoogleCloudDataplexV1SearchEntriesResultSnippets`

- Snippets for the entry, contains HTML-style highlighting for matched tokens, will be used in UI.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataplexEntry` | GoogleCloudDataplexV1Entry | Entry |

### `GoogleCloudDataplexV1SessionEvent`

- These messages contain information about sessions within an environment. The monitored resource is 'Environment'.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventSucceeded` | boolean | The status of the event. |
| `fastStartupEnabled` | boolean | If the session is associated with an environment with fast startup enabled, and was created before being assigned to a user. |
| `message` | string | The log message. |
| `query` | GoogleCloudDataplexV1SessionEventQueryDetail | The execution details of the query. |
| `sessionId` | string | Unique identifier for the session. |
| `type` | string enum | The type of the event. Values: `EVENT_TYPE_UNSPECIFIED`, `START`, `STOP`, `QUERY`, `CREATE`. |
| `unassignedDuration` | string (google-duration) | The idle duration of a warm pooled session before it is assigned to user. |
| `userId` | string | The information about the user that created the session. It will be the email address of the user. |

### `GoogleCloudDataplexV1SessionEventQueryDetail`

- Execution details of the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataProcessedBytes` | string (int64) | The data processed by the query. |
| `duration` | string (google-duration) | Time taken for execution of the query. |
| `engine` | string enum | Query Execution engine. Values: `ENGINE_UNSPECIFIED`, `SPARK_SQL`, `BIGQUERY`. |
| `queryId` | string | The unique Query id identifying the query. |
| `queryText` | string | The query text executed. |
| `resultSizeBytes` | string (int64) | The size of results the query produced. |

### `GoogleCloudDataplexV1StorageAccess`

- Describes the access mechanism of the data within its storage location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `read` | string enum | Output only. Describes the read access mechanism of the data. Not user settable. Values: `ACCESS_MODE_UNSPECIFIED`, `DIRECT`, `MANAGED`. |

### `GoogleCloudDataplexV1StorageFormat`

- Describes the format of the data within its storage location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compressionFormat` | string enum | Optional. The compression type associated with the stored data. If unspecified, the data is uncompressed. Values: `COMPRESSION_FORMAT_UNSPECIFIED`, `GZIP`, `BZIP2`. |
| `csv` | GoogleCloudDataplexV1StorageFormatCsvOptions | Optional. Additional information about CSV formatted data. |
| `format` | string enum | Output only. The data format associated with the stored data, which represents content type values. The value is inferred from mime type. Values: `FORMAT_UNSPECIFIED`, `PARQUET`, `AVRO`, `ORC`, `CSV`, `JSON`, `IMAGE`, `AUDIO`, `VIDEO`, `TEXT`, `TFRECORD`, `OTHER`, `UNKNOWN`. |
| `iceberg` | GoogleCloudDataplexV1StorageFormatIcebergOptions | Optional. Additional information about iceberg tables. |
| `json` | GoogleCloudDataplexV1StorageFormatJsonOptions | Optional. Additional information about CSV formatted data. |
| `mimeType` | string | Required. The mime type descriptor for the data. Must match the pattern {type}/{subtype}. Supported values: application/x-parquet application/x-avro application/x-orc application/x-tfrecord application/x-parquet+iceberg application/x-avro+iceberg application/x-orc+iceberg application/json application/{subtypes} text/csv text/ image/{image subtype} video/{video subtype} audio/{audio subtype} |

### `GoogleCloudDataplexV1StorageFormatCsvOptions`

- Describes CSV and similar semi-structured data formats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimiter` | string | Optional. The delimiter used to separate values. Defaults to ','. |
| `encoding` | string | Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8", and "ISO-8859-1". Defaults to UTF-8 if unspecified. |
| `headerRows` | integer (int32) | Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. Defaults to 0. |
| `quote` | string | Optional. The character used to quote column values. Accepts '"' (double quotation mark) or ''' (single quotation mark). Defaults to '"' (double quotation mark) if unspecified. |

### `GoogleCloudDataplexV1StorageFormatIcebergOptions`

- Describes Iceberg data format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadataLocation` | string | Optional. The location of where the iceberg metadata is present, must be within the table path |

### `GoogleCloudDataplexV1StorageFormatJsonOptions`

- Describes JSON data format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encoding` | string | Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8" and "ISO-8859-1". Defaults to UTF-8 if not specified. |

### `GoogleCloudDataplexV1Task`

- A task represents a user-visible job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the task was created. |
| `description` | string | Optional. Description of the task. |
| `displayName` | string | Optional. User friendly display name. |
| `executionSpec` | GoogleCloudDataplexV1TaskExecutionSpec | Required. Spec related to how a task is executed. |
| `executionStatus` | GoogleCloudDataplexV1TaskExecutionStatus | Output only. Status of the latest task executions. |
| `labels` | object | Optional. User-defined labels for the task. |
| `name` | string | Output only. The relative resource name of the task, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/ tasks/{task_id}. |
| `notebook` | GoogleCloudDataplexV1TaskNotebookTaskConfig | Config related to running scheduled Notebooks. |
| `spark` | GoogleCloudDataplexV1TaskSparkTaskConfig | Config related to running custom Spark tasks. |
| `state` | string enum | Output only. Current state of the task. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `ACTION_REQUIRED`. |
| `triggerSpec` | GoogleCloudDataplexV1TaskTriggerSpec | Required. Spec related to how often and when a task should be triggered. |
| `uid` | string | Output only. System generated globally unique ID for the task. This ID will be different if the task is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time when the task was last updated. |

### `GoogleCloudDataplexV1TaskExecutionSpec`

- Execution related settings, like retry and service_account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | object | Optional. The arguments to pass to the task. The args can use placeholders of the format ${placeholder} as part of key/value string. These will be interpolated before passing the args to the driver. Currently supported placeholders: - ${task_id} - ${job_time} To pass positional args, set the key as TASK_ARGS. The value should be a comma-separated string of all the positional arguments. To use a delimiter other than comma, refer to https://cloud.google.com/sdk/gcloud/reference/topic/escaping. In case of other keys being present in the args, then TASK_ARGS will be passed as the last argument. |
| `kmsKey` | string | Optional. The Cloud KMS key to use for encryption, of the form: projects/{project_number}/locations/{location_id}/keyRings/{key-ring-name}/cryptoKeys/{key-name}. |
| `maxJobExecutionLifetime` | string (google-duration) | Optional. The maximum duration after which the job execution is expired. |
| `project` | string | Optional. The project in which jobs are run. By default, the project containing the Lake is used. If a project is provided, the ExecutionSpec.service_account must belong to this project. |
| `serviceAccount` | string | Required. Service account to use to execute a task. If not provided, the default Compute service account for the project is used. |

### `GoogleCloudDataplexV1TaskExecutionStatus`

- Status of the task execution (e.g. Jobs).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latestJob` | GoogleCloudDataplexV1Job | Output only. latest job execution |
| `updateTime` | string (google-datetime) | Output only. Last update time of the status. |

### `GoogleCloudDataplexV1TaskInfrastructureSpec`

- Configuration for the underlying infrastructure used to run workloads.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `batch` | GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources | Compute resources needed for a Task when using Dataproc Serverless. |
| `containerImage` | GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime | Container Image Runtime Configuration. |
| `vpcNetwork` | GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork | Vpc network. |

### `GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources`

- Batch compute resources associated with the task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executorsCount` | integer (int32) | Optional. Total number of job executors. Executor Count should be between 2 and 100. Default=2 |
| `maxExecutorsCount` | integer (int32) | Optional. Max configurable executors. If max_executors_count > executors_count, then auto-scaling is enabled. Max Executor Count should be between 2 and 1000. Default=1000 |

### `GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime`

- Container Image Runtime Configuration used with Batch execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `image` | string | Optional. Container image to use. |
| `javaJars` | array<string> | Optional. A list of Java JARS to add to the classpath. Valid input includes Cloud Storage URIs to Jar binaries. For example, gs://bucket-name/my/path/to/file.jar |
| `properties` | object | Optional. Override to common configuration of open source components installed on the Dataproc cluster. The properties to set on daemon config files. Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. For more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties). |
| `pythonPackages` | array<string> | Optional. A list of python packages to be installed. Valid formats include Cloud Storage URI to a PIP installable library. For example, gs://bucket-name/my/path/to/lib.tar.gz |

### `GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork`

- Cloud VPC Network used to run the infrastructure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Optional. The Cloud VPC network in which the job is run. By default, the Cloud VPC network named Default within the project is used. |
| `networkTags` | array<string> | Optional. List of network tags to apply to the job. |
| `subNetwork` | string | Optional. The Cloud VPC sub-network in which the job is run. |

### `GoogleCloudDataplexV1TaskNotebookTaskConfig`

- Config for running scheduled notebooks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `archiveUris` | array<string> | Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. |
| `fileUris` | array<string> | Optional. Cloud Storage URIs of files to be placed in the working directory of each executor. |
| `infrastructureSpec` | GoogleCloudDataplexV1TaskInfrastructureSpec | Optional. Infrastructure specification for the execution. |
| `notebook` | string | Required. Path to input notebook. This can be the Cloud Storage URI of the notebook file or the path to a Notebook Content. The execution args are accessible as environment variables (TASK_key=value). |

### `GoogleCloudDataplexV1TaskSparkTaskConfig`

- User-specified config for running a Spark task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `archiveUris` | array<string> | Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. |
| `fileUris` | array<string> | Optional. Cloud Storage URIs of files to be placed in the working directory of each executor. |
| `infrastructureSpec` | GoogleCloudDataplexV1TaskInfrastructureSpec | Optional. Infrastructure specification for the execution. |
| `mainClass` | string | The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in jar_file_uris. The execution args are passed in as a sequence of named process arguments (--key=value). |
| `mainJarFileUri` | string | The Cloud Storage URI of the jar file that contains the main class. The execution args are passed in as a sequence of named process arguments (--key=value). |
| `pythonScriptFile` | string | The Gcloud Storage URI of the main Python file to use as the driver. Must be a .py file. The execution args are passed in as a sequence of named process arguments (--key=value). |
| `sqlScript` | string | The query text. The execution args are used to declare a set of script variables (set key="value";). |
| `sqlScriptFile` | string | A reference to a query file. This should be the Cloud Storage URI of the query file. The execution args are used to declare a set of script variables (set key="value";). |

### `GoogleCloudDataplexV1TaskTriggerSpec`

- Task scheduling and trigger settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Optional. Prevent the task from executing. This does not cancel already running tasks. It is intended to temporarily disable RECURRING tasks. |
| `maxRetries` | integer (int32) | Optional. Number of retry attempts before aborting. Set to zero to never attempt to retry a failed task. |
| `schedule` | string | Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running tasks periodically. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 \* \* \* \*, or TZ=America/New_York 1 \* \* \* \*. This field is required for RECURRING tasks. |
| `startTime` | string (google-datetime) | Optional. The first run of the task will be after this time. If not specified, the task will run shortly after being submitted if ON_DEMAND and based on the schedule if RECURRING. |
| `type` | string enum | Required. Immutable. Trigger type of the user-specified Task. Values: `TYPE_UNSPECIFIED`, `ON_DEMAND`, `RECURRING`. |

### `GoogleCloudDataplexV1Trigger`

- DataScan scheduling and trigger settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `onDemand` | GoogleCloudDataplexV1TriggerOnDemand | The scan runs once via RunDataScan API. |
| `oneTime` | GoogleCloudDataplexV1TriggerOneTime | The scan runs once, and does not create an associated ScanJob child resource. |
| `schedule` | GoogleCloudDataplexV1TriggerSchedule | The scan is scheduled to run periodically. |

### `GoogleCloudDataplexV1TriggerOnDemand`

- The scan runs once via RunDataScan API.
- Version: v1

### `GoogleCloudDataplexV1TriggerOneTime`

- The scan runs once using create API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ttlAfterScanCompletion` | string (google-duration) | Optional. Time to live for OneTime scans. default value is 24 hours, minimum value is 0 seconds, and maximum value is 365 days. The time is calculated from the data scan job completion time. If value is set as 0 seconds, the scan will be immediately deleted upon job completion, regardless of whether the job succeeded or failed. |

### `GoogleCloudDataplexV1TriggerSchedule`

- The scan is scheduled to run periodically.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cron` | string | Required. Cron (https://en.wikipedia.org/wiki/Cron) schedule for running scans periodically.To explicitly set a timezone in the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database (wikipedia (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)). For example, CRON_TZ=America/New_York 1 \* \* \* \*, or TZ=America/New_York 1 \* \* \* \*.This field is required for Schedule scans. |

### `GoogleCloudDataplexV1UpdateEntryLinkRequest`

- Request message for UpdateEntryLink method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowMissing` | boolean | Optional. If set to true and the entry link doesn't exist, the service will create it. |
| `aspectKeys` | array<string> | Optional. The map keys of the Aspects which the service should modify. It should be the aspect type reference in the format {project_id_or_number}.{location_id}.{aspect_type_id}.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request. |
| `entryLink` | GoogleCloudDataplexV1EntryLink | Required. Entry Link resource. |

### `GoogleCloudDataplexV1UpdateEntryRequest`

- Update Entry request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowMissing` | boolean | Optional. If set to true and the entry doesn't exist, the service will create it. |
| `aspectKeys` | array<string> | Optional. The map keys of the Aspects which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @\* - matches aspects of the given type for all paths. \*@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request. |
| `deleteMissingAspects` | boolean | Optional. If set to true and the aspect_keys specify aspect ranges, the service deletes any existing aspects from that range that weren't provided in the request. |
| `entry` | GoogleCloudDataplexV1Entry | Required. Entry resource. |
| `updateMask` | string (google-fieldmask) | Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request. |

### `GoogleCloudDataplexV1UpdateGlossaryCategoryRequest`

- Update GlossaryCategory Request
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | GoogleCloudDataplexV1GlossaryCategory | Required. The GlossaryCategory to update. The GlossaryCategory's name field is used to identify the GlossaryCategory to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |
| `updateMask` | string (google-fieldmask) | Required. The list of fields to update. |

### `GoogleCloudDataplexV1UpdateGlossaryRequest`

- Update Glossary Request
- Version: v1

| Field | Type | Description |
|---|---|---|
| `glossary` | GoogleCloudDataplexV1Glossary | Required. The Glossary to update. The Glossary's name field is used to identify the Glossary to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} |
| `updateMask` | string (google-fieldmask) | Required. The list of fields to update. |
| `validateOnly` | boolean | Optional. Validates the request without actually updating the Glossary. Default: false. |

### `GoogleCloudDataplexV1UpdateGlossaryTermRequest`

- Update GlossaryTerm Request
- Version: v1

| Field | Type | Description |
|---|---|---|
| `term` | GoogleCloudDataplexV1GlossaryTerm | Required. The GlossaryTerm to update. The GlossaryTerm's name field is used to identify the GlossaryTerm to update. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} |
| `updateMask` | string (google-fieldmask) | Required. The list of fields to update. |

### `GoogleCloudDataplexV1Zone`

- A zone represents a logical group of related assets within a lake. A zone can be used to map to organizational structure or represent stages of data readiness from raw to curated. It provides managing behavior that is shared or inherited by all contained assets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetStatus` | GoogleCloudDataplexV1AssetStatus | Output only. Aggregated status of the underlying assets of the zone. |
| `createTime` | string (google-datetime) | Output only. The time when the zone was created. |
| `description` | string | Optional. Description of the zone. |
| `discoverySpec` | GoogleCloudDataplexV1ZoneDiscoverySpec | Optional. Specification of the discovery feature applied to data in this zone. |
| `displayName` | string | Optional. User friendly display name. |
| `labels` | object | Optional. User defined labels for the zone. |
| `name` | string | Output only. The relative resource name of the zone, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |
| `resourceSpec` | GoogleCloudDataplexV1ZoneResourceSpec | Required. Specification of the resources that are referenced by the assets within this zone. |
| `state` | string enum | Output only. Current state of the zone. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `ACTION_REQUIRED`. |
| `type` | string enum | Required. Immutable. The type of the zone. Values: `TYPE_UNSPECIFIED`, `RAW`, `CURATED`. |
| `uid` | string | Output only. System generated globally unique ID for the zone. This ID will be different if the zone is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time when the zone was last updated. |

### `GoogleCloudDataplexV1ZoneDiscoverySpec`

- Settings to manage the metadata discovery and publishing in a zone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `csvOptions` | GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions | Optional. Configuration for CSV data. |
| `enabled` | boolean | Required. Whether discovery is enabled. |
| `excludePatterns` | array<string> | Optional. The list of patterns to apply for selecting data to exclude during discovery. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. |
| `includePatterns` | array<string> | Optional. The list of patterns to apply for selecting data to include during discovery if only a subset of the data should considered. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. |
| `jsonOptions` | GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions | Optional. Configuration for Json data. |
| `schedule` | string | Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running discovery periodically. Successive discovery runs must be scheduled at least 60 minutes apart. The default value is to run discovery every 60 minutes.To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 \* \* \* \*, or TZ=America/New_York 1 \* \* \* \*. |

### `GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions`

- Describe CSV and similar semi-structured data formats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimiter` | string | Optional. The delimiter being used to separate values. This defaults to ','. |
| `disableTypeInference` | boolean | Optional. Whether to disable the inference of data type for CSV data. If true, all columns will be registered as strings. |
| `encoding` | string | Optional. The character encoding of the data. The default is UTF-8. |
| `headerRows` | integer (int32) | Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. |

### `GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions`

- Describe JSON data format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableTypeInference` | boolean | Optional. Whether to disable the inference of data type for Json data. If true, all columns will be registered as their primitive types (strings, number or boolean). |
| `encoding` | string | Optional. The character encoding of the data. The default is UTF-8. |

### `GoogleCloudDataplexV1ZoneResourceSpec`

- Settings for resources attached as assets within a zone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locationType` | string enum | Required. Immutable. The location type of the resources that are allowed to be attached to the assets within this zone. Values: `LOCATION_TYPE_UNSPECIFIED`, `SINGLE_REGION`, `MULTI_REGION`. |

### `GoogleCloudLocationListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<GoogleCloudLocationLocation> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `GoogleCloudLocationLocation`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: "us-east1". |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" |

### Shape of `GoogleCloudDataplexV1DataScanExecutionStatus`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "latestJobCreateTime": "string (google-datetime)",
  "latestJobEndTime": "string (google-datetime)",
  "latestJobStartTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `dataplex` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the source proto: the BigQuery form `projects//datasets//tables/` in the `location` description of `GoogleCloudDataplexV1Partition` lost its placeholders in the Discovery document; the proto comment reads "for example, `gs://bucket/path/to/entity/key1=value1/key2=value2`. Or `projects/<project_id>/datasets/<dataset_id>/tables/<table_id>`" (`google/cloud/dataplex/v1/metadata.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataplex/v1/metadata.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the source proto: the `aspectKeys` syntaxes (the `entries.patch` parameter and the `GoogleCloudDataplexV1UpdateEntryRequest` / `GoogleCloudDataplexV1ModifyEntryRequest` fields) lost the aspect type placeholder in the Discovery document, so the first syntax is empty and the next ones are shown as `@path` and `@*`, and the path format is shown as `Schema.`; the proto comments read "`<aspect_type_reference>` - matches an aspect of the given type and empty path.", "`<aspect_type_reference>@path` - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the `schema` aspect, the path should have the format `Schema.<field_name>`." and "`<aspect_type_reference>@*` - matches aspects of the given type for all paths." (`google/cloud/dataplex/v1/catalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataplex/v1/catalog.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the source proto: the supported value `text/` in the `mimeType` description of `GoogleCloudDataplexV1StorageFormat` lost its placeholder in the Discovery document; the proto comment lists `text/<subtypes>` (backticks added) between `text/csv` and `image/{image subtype}` (`google/cloud/dataplex/v1/metadata.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataplex/v1/metadata.proto, commit `5ce0245`, retrieved 2026-11-19).
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://dataplex.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
