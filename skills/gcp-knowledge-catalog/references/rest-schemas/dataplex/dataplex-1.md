---
source: https://dataplex.googleapis.com/$discovery/rest?version=v1
---

# Cloud Dataplex API message schemas (dataplex) (part 1/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/dataplex/`.

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GoogleCloudDataplexV1Action`

- Action represents an issue requiring administrator action for resolution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asset` | string | Output only. The relative resource name of the asset, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. |
| `category` | string enum | The category of issue associated with the action. Values: `CATEGORY_UNSPECIFIED`, `RESOURCE_MANAGEMENT`, `SECURITY_POLICY`, `DATA_DISCOVERY`. |
| `dataLocations` | array<string> | The list of data locations associated with this action. Cloud Storage locations are represented as URI paths(E.g. gs://bucket/table1/year=2020/month=Jan/). BigQuery locations refer to resource names(E.g. bigquery.googleapis.com/projects/project-id/datasets/dataset-id). |
| `detectTime` | string (google-datetime) | The time that the issue was detected. |
| `failedSecurityPolicyApply` | GoogleCloudDataplexV1ActionFailedSecurityPolicyApply | Details for issues related to applying security policy. |
| `incompatibleDataSchema` | GoogleCloudDataplexV1ActionIncompatibleDataSchema | Details for issues related to incompatible schemas detected within data. |
| `invalidDataFormat` | GoogleCloudDataplexV1ActionInvalidDataFormat | Details for issues related to invalid or unsupported data formats. |
| `invalidDataOrganization` | GoogleCloudDataplexV1ActionInvalidDataOrganization | Details for issues related to invalid data arrangement. |
| `invalidDataPartition` | GoogleCloudDataplexV1ActionInvalidDataPartition | Details for issues related to invalid or unsupported data partition structure. |
| `issue` | string | Detailed description of the issue requiring action. |
| `lake` | string | Output only. The relative resource name of the lake, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. |
| `missingData` | GoogleCloudDataplexV1ActionMissingData | Details for issues related to absence of data within managed resources. |
| `missingResource` | GoogleCloudDataplexV1ActionMissingResource | Details for issues related to absence of a managed resource. |
| `name` | string | Output only. The relative resource name of the action, of the form: projects/{project}/locations/{location}/lakes/{lake}/actions/{action} projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/actions/{action} projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/assets/{asset}/actions/{action}. |
| `unauthorizedResource` | GoogleCloudDataplexV1ActionUnauthorizedResource | Details for issues related to lack of permissions to access data resources. |
| `zone` | string | Output only. The relative resource name of the zone, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. |

### `GoogleCloudDataplexV1ActionFailedSecurityPolicyApply`

- Failed to apply security policy to the managed resource(s) under a lake, zone or an asset. For a lake or zone resource, one or more underlying assets has a failure applying security policy to the associated managed resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asset` | string | Resource name of one of the assets with failing security policy application. Populated for a lake or zone resource only. |

### `GoogleCloudDataplexV1ActionIncompatibleDataSchema`

- Action details for incompatible schemas detected by discovery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `existingSchema` | string | The existing and expected schema of the table. The schema is provided as a JSON formatted structure listing columns and data types. |
| `newSchema` | string | The new and incompatible schema within the table. The schema is provided as a JSON formatted structured listing columns and data types. |
| `sampledDataLocations` | array<string> | The list of data locations sampled and used for format/schema inference. |
| `schemaChange` | string enum | Whether the action relates to a schema that is incompatible or modified. Values: `SCHEMA_CHANGE_UNSPECIFIED`, `INCOMPATIBLE`, `MODIFIED`. |
| `table` | string | The name of the table containing invalid data. |

### `GoogleCloudDataplexV1ActionInvalidDataFormat`

- Action details for invalid or unsupported data files detected by discovery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expectedFormat` | string | The expected data format of the entity. |
| `newFormat` | string | The new unexpected data format within the entity. |
| `sampledDataLocations` | array<string> | The list of data locations sampled and used for format/schema inference. |

### `GoogleCloudDataplexV1ActionInvalidDataOrganization`

- Action details for invalid data arrangement.
- Version: v1

### `GoogleCloudDataplexV1ActionInvalidDataPartition`

- Action details for invalid or unsupported partitions detected by discovery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expectedStructure` | string enum | The issue type of InvalidDataPartition. Values: `PARTITION_STRUCTURE_UNSPECIFIED`, `CONSISTENT_KEYS`, `HIVE_STYLE_KEYS`. |

### `GoogleCloudDataplexV1ActionMissingData`

- Action details for absence of data detected by discovery.
- Version: v1

### `GoogleCloudDataplexV1ActionMissingResource`

- Action details for resource references in assets that cannot be located.
- Version: v1

### `GoogleCloudDataplexV1ActionUnauthorizedResource`

- Action details for unauthorized resource issues raised to indicate that the service account associated with the lake instance is not authorized to access or manage the resource associated with an asset.
- Version: v1

### `GoogleCloudDataplexV1ApproveChangeRequestRequest`

- Request message for ApproveChangeRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comment` | string | Optional. The comment or reason for approving the ChangeRequest. Maximum length is 1024 characters. |
| `etag` | string | Optional. The etag of the ChangeRequest. |

### `GoogleCloudDataplexV1Aspect`

- Represents a single piece of metadata describing an entry or entry link.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aspectSource` | GoogleCloudDataplexV1AspectSource | Optional. Information related to the source system of the aspect. |
| `aspectType` | string | Output only. The resource name of the type used to create this Aspect. |
| `createTime` | string (google-datetime) | Output only. The time when the Aspect was created. |
| `data` | object | Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8). |
| `path` | string | Output only. The path in the entry under which the aspect is attached. |
| `updateTime` | string (google-datetime) | Output only. The time when the Aspect was last updated. |

### `GoogleCloudDataplexV1AspectSource`

- Information related to the source system of the aspect.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time the aspect was created in the source system. |
| `dataVersion` | string | The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc). |
| `updateTime` | string (google-datetime) | The time the aspect was last updated in the source system. |

### `GoogleCloudDataplexV1AspectType`

- AspectType is a template for creating Aspects, and represents the JSON-schema for a given Entry, for example, BigQuery Table Schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorization` | GoogleCloudDataplexV1AspectTypeAuthorization | Immutable. Defines the Authorization for this type. |
| `createTime` | string (google-datetime) | Output only. The time when the AspectType was created. |
| `dataClassification` | string enum | Optional. Immutable. Stores data classification of the aspect. Values: `DATA_CLASSIFICATION_UNSPECIFIED`, `METADATA_AND_DATA`. |
| `description` | string | Optional. Description of the AspectType. |
| `displayName` | string | Optional. User friendly display name. |
| `etag` | string | The service computes this checksum. The client may send it on update and delete requests to ensure it has an up-to-date value before proceeding. |
| `labels` | object | Optional. User-defined labels for the AspectType. |
| `metadataTemplate` | GoogleCloudDataplexV1AspectTypeMetadataTemplate | Required. MetadataTemplate of the aspect. |
| `name` | string | Output only. The relative resource name of the AspectType, of the form: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. |
| `transferStatus` | string enum | Output only. Denotes the transfer status of the Aspect Type. It is unspecified for Aspect Types created from Dataplex API. Values: `TRANSFER_STATUS_UNSPECIFIED`, `TRANSFER_STATUS_MIGRATED`, `TRANSFER_STATUS_TRANSFERRED`. |
| `uid` | string | Output only. System generated globally unique ID for the AspectType. If you delete and recreate the AspectType with the same name, then this ID will be different. |
| `updateTime` | string (google-datetime) | Output only. The time when the AspectType was last updated. |

### `GoogleCloudDataplexV1AspectTypeAuthorization`

- Authorization for an AspectType.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alternateUsePermission` | string | Immutable. The IAM permission grantable on the EntryGroup to allow access to instantiate Aspects of Dataplex Universal Catalog owned AspectTypes, only settable for Dataplex Universal Catalog owned Types. |

### `GoogleCloudDataplexV1AspectTypeMetadataTemplate`

- MetadataTemplate definition for an AspectType.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations | Optional. Specifies annotations on this field. |
| `arrayItems` | GoogleCloudDataplexV1AspectTypeMetadataTemplate | Optional. If the type is array, set array_items. array_items can refer to a primitive field or a complex (record only) field. To specify a primitive field, you only need to set name and type in the nested MetadataTemplate. The recommended value for the name field is item, as this isn't used in the actual payload. |
| `constraints` | GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints | Optional. Specifies the constraints on this field. |
| `enumValues` | array<GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue> | Optional. The list of values for an enum type. You must define it if the type is enum. |
| `index` | integer (int32) | Optional. Index is used to encode Template messages. The value of index can range between 1 and 2,147,483,647. Index must be unique within all fields in a Template. (Nested Templates can reuse indexes). Once a Template is defined, the index cannot be changed, because it identifies the field in the actual storage format. Index is a mandatory field, but it is optional for top level fields, and map/array "values" definitions. |
| `mapItems` | GoogleCloudDataplexV1AspectTypeMetadataTemplate | Optional. If the type is map, set map_items. map_items can refer to a primitive field or a complex (record only) field. To specify a primitive field, you only need to set name and type in the nested MetadataTemplate. The recommended value for the name field is item, as this isn't used in the actual payload. |
| `name` | string | Required. The name of the field. |
| `recordFields` | array<GoogleCloudDataplexV1AspectTypeMetadataTemplate> | Optional. Field definition. You must specify it if the type is record. It defines the nested fields. |
| `type` | string | Required. The datatype of this field. The following values are supported:Primitive types: string int bool double datetime. Must be of the format RFC3339 UTC "Zulu" (Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z").Complex types: enum array map record |
| `typeId` | string | Optional. You can use type id if this definition of the field needs to be reused later. The type id must be unique across the entire template. You can only specify it if the field type is record. |
| `typeRef` | string | Optional. A reference to another field definition (not an inline definition). The value must be equal to the value of an id field defined elsewhere in the MetadataTemplate. Only fields with record type can refer to other fields. |

### `GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations`

- Definition of the annotations of a field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deprecated` | string | Optional. Marks a field as deprecated. You can include a deprecation message. |
| `description` | string | Optional. Description for a field. |
| `displayName` | string | Optional. Display name for a field. |
| `displayOrder` | integer (int32) | Optional. Display order for a field. You can use this to reorder where a field is rendered. |
| `stringType` | string | Optional. You can use String Type annotations to specify special meaning to string fields. The following values are supported: richText: The field must be interpreted as a rich text field. markdown: The field must be interpreted as a markdown field. url: A fully qualified URL link. resource: A service qualified resource reference. |
| `stringValues` | array<string> | Optional. Suggested hints for string fields. You can use them to suggest values to users through console. |

### `GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints`

- Definition of the constraints of a field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `required` | boolean | Optional. Marks this field as optional or required. |

### `GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue`

- Definition of Enumvalue, to be used for enum fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deprecated` | string | Optional. You can set this message if you need to deprecate an enum value. |
| `index` | integer (int32) | Required. Index for the enum value. It can't be modified. |
| `name` | string | Required. Name of the enumvalue. This is the actual value that the aspect can contain. |

### `GoogleCloudDataplexV1Asset`

- An asset represents a cloud resource that is being managed within a lake as a member of a zone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the asset was created. |
| `description` | string | Optional. Description of the asset. |
| `discoverySpec` | GoogleCloudDataplexV1AssetDiscoverySpec | Optional. Specification of the discovery feature applied to data referenced by this asset. When this spec is left unset, the asset will use the spec set on the parent zone. |
| `discoveryStatus` | GoogleCloudDataplexV1AssetDiscoveryStatus | Output only. Status of the discovery feature applied to data referenced by this asset. |
| `displayName` | string | Optional. User friendly display name. |
| `labels` | object | Optional. User defined labels for the asset. |
| `name` | string | Output only. The relative resource name of the asset, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. |
| `resourceSpec` | GoogleCloudDataplexV1AssetResourceSpec | Required. Specification of the resource that is referenced by this asset. |
| `resourceStatus` | GoogleCloudDataplexV1AssetResourceStatus | Output only. Status of the resource referenced by this asset. |
| `securityStatus` | GoogleCloudDataplexV1AssetSecurityStatus | Output only. Status of the security policy applied to resource referenced by this asset. |
| `state` | string enum | Output only. Current state of the asset. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `ACTION_REQUIRED`. |
| `uid` | string | Output only. System generated globally unique ID for the asset. This ID will be different if the asset is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time when the asset was last updated. |

### `GoogleCloudDataplexV1AssetDiscoverySpec`

- Settings to manage the metadata discovery and publishing for an asset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `csvOptions` | GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions | Optional. Configuration for CSV data. |
| `enabled` | boolean | Optional. Whether discovery is enabled. |
| `excludePatterns` | array<string> | Optional. The list of patterns to apply for selecting data to exclude during discovery. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. |
| `includePatterns` | array<string> | Optional. The list of patterns to apply for selecting data to include during discovery if only a subset of the data should considered. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. |
| `jsonOptions` | GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions | Optional. Configuration for Json data. |
| `schedule` | string | Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running discovery periodically. Successive discovery runs must be scheduled at least 60 minutes apart. The default value is to run discovery every 60 minutes.To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 \* \* \* \*, or TZ=America/New_York 1 \* \* \* \*. |

### `GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions`

- Describe CSV and similar semi-structured data formats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimiter` | string | Optional. The delimiter being used to separate values. This defaults to ','. |
| `disableTypeInference` | boolean | Optional. Whether to disable the inference of data type for CSV data. If true, all columns will be registered as strings. |
| `encoding` | string | Optional. The character encoding of the data. The default is UTF-8. |
| `headerRows` | integer (int32) | Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. |

### `GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions`

- Describe JSON data format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableTypeInference` | boolean | Optional. Whether to disable the inference of data type for Json data. If true, all columns will be registered as their primitive types (strings, number or boolean). |
| `encoding` | string | Optional. The character encoding of the data. The default is UTF-8. |

### `GoogleCloudDataplexV1AssetDiscoveryStatus`

- Status of discovery for an asset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastRunDuration` | string (google-duration) | The duration of the last discovery run. |
| `lastRunTime` | string (google-datetime) | The start time of the last discovery run. |
| `message` | string | Additional information about the current state. |
| `state` | string enum | The current status of the discovery feature. Values: `STATE_UNSPECIFIED`, `SCHEDULED`, `IN_PROGRESS`, `PAUSED`, `DISABLED`. |
| `stats` | GoogleCloudDataplexV1AssetDiscoveryStatusStats | Data Stats of the asset reported by discovery. |
| `updateTime` | string (google-datetime) | Last update time of the status. |

### `GoogleCloudDataplexV1AssetDiscoveryStatusStats`

- The aggregated data statistics for the asset reported by discovery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataItems` | string (int64) | The count of data items within the referenced resource. |
| `dataSize` | string (int64) | The number of stored data bytes within the referenced resource. |
| `filesets` | string (int64) | The count of fileset entities within the referenced resource. |
| `tables` | string (int64) | The count of table entities within the referenced resource. |

### `GoogleCloudDataplexV1AssetResourceSpec`

- Identifies the cloud resource that is referenced by this asset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Immutable. Relative name of the cloud resource that contains the data that is being managed within a lake. For example: projects/{project_number}/buckets/{bucket_id} projects/{project_number}/datasets/{dataset_id} |
| `readAccessMode` | string enum | Optional. Determines how read permissions are handled for each asset and their associated tables. Only available to storage buckets assets. Values: `ACCESS_MODE_UNSPECIFIED`, `DIRECT`, `MANAGED`. |
| `type` | string enum | Required. Immutable. Type of resource. Values: `TYPE_UNSPECIFIED`, `STORAGE_BUCKET`, `BIGQUERY_DATASET`. |

### `GoogleCloudDataplexV1AssetResourceStatus`

- Status of the resource referenced by an asset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managedAccessIdentity` | string | Output only. Service account associated with the BigQuery Connection. |
| `message` | string | Additional information about the current state. |
| `state` | string enum | The current state of the managed resource. Values: `STATE_UNSPECIFIED`, `READY`, `ERROR`. |
| `updateTime` | string (google-datetime) | Last update time of the status. |

### `GoogleCloudDataplexV1AssetSecurityStatus`

- Security policy status of the asset. Data security policy, i.e., readers, writers & owners, should be specified in the lake/zone/asset IAM policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Additional information about the current state. |
| `state` | string enum | The current state of the security policy applied to the attached resource. Values: `STATE_UNSPECIFIED`, `READY`, `APPLYING`, `ERROR`. |
| `updateTime` | string (google-datetime) | Last update time of the status. |

### `GoogleCloudDataplexV1AssetStatus`

- Aggregated status of the underlying assets of a lake or zone.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeAssets` | integer (int32) | Number of active assets. |
| `securityPolicyApplyingAssets` | integer (int32) | Number of assets that are in process of updating the security policy on attached resources. |
| `updateTime` | string (google-datetime) | Last update time of the status. |

### `GoogleCloudDataplexV1BatchChangeMetadataRequest`

- Request message for batch changing metadata. Requires permission to perform the underlying change, depending on the type and content of the change. Per operation, required permissions are: - for CreateEntry: dataplex.entries.create - for UpdateEntry: dataplex.entries.update - for DeleteEntry: dataplex.entries.delete - for CreateEntryLink: dataplex.entryLinks.create - for UpdateEntryLink: dataplex.entryLinks.update - for DeleteEntryLink: dataplex.entryLinks.deleteAnd per used type permissions are: - for EntryType: dataplex.entryTypes.use or dataplex.entryGroups.useEntry for reusable built-in types, - for AspectType: dataplex.aspectTypes.use or dataplex.entryGroups.useAspect for reusable built-in types and - for EntryLinkType: dataplex.entryLinkTypes.use or dataplex.entryGroups.useEntryLink for reusable built-in types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changes` | array<GoogleCloudDataplexV1BatchChangeMetadataRequestChange> | Required. The list of changes to apply. Only a single change per resource is supported. Maximum number of changes supported is 250. |
| `description` | GoogleCloudDataplexV1BatchChangeMetadataRequestDescription | Optional. Text description of the batch change. |
| `name` | string | Required. The resource name of the EntryGroup on which the batch change applies. Format: projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id} |

### `GoogleCloudDataplexV1BatchChangeMetadataRequestChange`

- Detailed description of an individual change.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createEntryLinkRequest` | GoogleCloudDataplexV1CreateEntryLinkRequest | Payload for creating an EntryLink. |
| `createEntryRequest` | GoogleCloudDataplexV1CreateEntryRequest | Payload for creating an Entry. |
| `deleteEntryLinkRequest` | GoogleCloudDataplexV1DeleteEntryLinkRequest | Payload for deleting an EntryLink. |
| `deleteEntryRequest` | GoogleCloudDataplexV1DeleteEntryRequest | Payload for deleting an Entry. |
| `updateEntryLinkRequest` | GoogleCloudDataplexV1UpdateEntryLinkRequest | Payload for updating an EntryLink. |
| `updateEntryRequest` | GoogleCloudDataplexV1UpdateEntryRequest | Payload for updating an Entry. |

### `GoogleCloudDataplexV1BatchChangeMetadataRequestDescription`

- Description of the batch change.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | Optional. The text description content. |
| `job` | GoogleCloudDataplexV1BatchChangeMetadataRequestDescriptionJob | Optional. The job that created the batch change. |

### `GoogleCloudDataplexV1BatchChangeMetadataRequestDescriptionJob`

- Description of the job that created the batch change.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. The name of the job that created the batch change. For example: projects/{project_number}/locations/{location_id}/enrichmentTasks/{enrichment_task_id}/runs/{enrichment_run_id} |
| `runTime` | string (google-datetime) | Optional. The start time of the job run that created the batch change. |

### `GoogleCloudDataplexV1BatchChangeMetadataResponse`

- Response message for BatchChangeMetadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failedRequests` | object | A map of failed requests for a batch change, where the key is the 0-based index of the failed request in the batch and the value is the error status. If all operations succeeded, this map is empty. |

### `GoogleCloudDataplexV1BatchOperationMetadata`

- Represents the metadata of a long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `failedRequests` | object | Output only. A map of failed requests, where the key is the index of the request in a batch and the value is the error status. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. This corresponds to the type of operation being performed. For example: 'batchCreate' or 'batchChangeMetadata'. |

### `GoogleCloudDataplexV1BusinessGlossaryEvent`

- Payload associated with Business Glossary related log events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventType` | string enum | The type of the event. Values: `EVENT_TYPE_UNSPECIFIED`, `GLOSSARY_CREATE`, `GLOSSARY_UPDATE`, `GLOSSARY_DELETE`, `GLOSSARY_CATEGORY_CREATE`, `GLOSSARY_CATEGORY_UPDATE`, `GLOSSARY_CATEGORY_DELETE`, `GLOSSARY_TERM_CREATE`, `GLOSSARY_TERM_UPDATE`, `GLOSSARY_TERM_DELETE`. |
| `message` | string | The log message. |
| `resource` | string | Name of the resource. |

### `GoogleCloudDataplexV1CancelDataScanJobRequest`

- Request message for the CancelDataScanJob method.
- Version: v1

### `GoogleCloudDataplexV1CancelDataScanJobResponse`

- Response message for the CancelDataScanJob method.
- Version: v1

### `GoogleCloudDataplexV1CancelJobRequest`

- Cancel task jobs.
- Version: v1

### `GoogleCloudDataplexV1CancelMetadataJobRequest`

- Cancel metadata job request.
- Version: v1

### `GoogleCloudDataplexV1ChangeRequest`

- Represents a proposed change to a metadata resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approver` | string | Output only. The email address of the user who approved/rejected the ChangeRequest. |
| `author` | string | Output only. The email address of the user who created the ChangeRequest. |
| `batchChangeMetadataRequest` | GoogleCloudDataplexV1BatchChangeMetadataRequest | Payload for executing a batch of catalog changes. |
| `batchChangeMetadataResponse` | GoogleCloudDataplexV1BatchChangeMetadataResponse | Output only. Result of applying a batch change metadata request. |
| `changeType` | string enum | Output only. The type of change represented by the change_payload. This field is derived from the populated field in the change_payload oneof. Values: `CHANGE_TYPE_UNSPECIFIED`, `CREATE_ENTRY`, `UPDATE_ENTRY`, `DELETE_ENTRY`, `CREATE_ENTRY_LINK`, `DELETE_ENTRY_LINK`, `CREATE_GLOSSARY`, `UPDATE_GLOSSARY`, `DELETE_GLOSSARY`, `CREATE_GLOSSARY_CATEGORY`, `UPDATE_GLOSSARY_CATEGORY`, `DELETE_GLOSSARY_CATEGORY`, `CREATE_GLOSSARY_TERM`, `UPDATE_GLOSSARY_TERM`, `DELETE_GLOSSARY_TERM`, `REQUEST_DATA_PRODUCT_ACCESS`, `BATCH_CHANGE_METADATA`. |
| `createEntry` | GoogleCloudDataplexV1CreateEntryRequest | Payload for creating an Entry. |
| `createEntryLink` | GoogleCloudDataplexV1CreateEntryLinkRequest | Payload for creating an EntryLink. |
| `createGlossary` | GoogleCloudDataplexV1CreateGlossaryRequest | Payload for creating a Glossary. |
| `createGlossaryCategory` | GoogleCloudDataplexV1CreateGlossaryCategoryRequest | Payload for creating a GlossaryCategory. |
| `createGlossaryTerm` | GoogleCloudDataplexV1CreateGlossaryTermRequest | Payload for creating a GlossaryTerm. |
| `createTime` | string (google-datetime) | Output only. The time when the ChangeRequest was created. |
| `dataProductAccessRequest` | GoogleCloudDataplexV1DataProductAccessRequest | Payload for Data Product access request. |
| `deleteEntry` | GoogleCloudDataplexV1DeleteEntryRequest | Payload for deleting an Entry. |
| `deleteEntryLink` | GoogleCloudDataplexV1DeleteEntryLinkRequest | Payload for deleting an EntryLink. |
| `deleteGlossary` | GoogleCloudDataplexV1DeleteGlossaryRequest | Payload for deleting a Glossary. |
| `deleteGlossaryCategory` | GoogleCloudDataplexV1DeleteGlossaryCategoryRequest | Payload for deleting a GlossaryCategory. |
| `deleteGlossaryTerm` | GoogleCloudDataplexV1DeleteGlossaryTermRequest | Payload for deleting a GlossaryTerm. |
| `etag` | string | Optional. This checksum is computed by the service. It can be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `justification` | string | Optional. Justification of the ChangeRequest. This should explain why the change is needed or why it should be approved. |
| `labels` | object | Optional. User-defined labels for the ChangeRequest. |
| `name` | string | Identifier. The relative resource name of the ChangeRequest, of the form: projects/{project_number}/locations/{location_id}/changeRequests/{change_request_id} |
| `rejectionComment` | string | Output only. The reason provided for rejecting the ChangeRequest. |
| `resource` | string | Output only. The full resource name of the target resource to be modified. Example: //dataplex.googleapis.com/projects/my-project/locations/us-central1/entryGroups/my-group/entries/my-entry |
| `reviewerComment` | string | Output only. The comment provided by the reviewer when approving or rejecting the ChangeRequest. Maximum length is 1024 characters. |
| `state` | string enum | Output only. The current state of the ChangeRequest. Values: `STATE_UNSPECIFIED`, `NEW`, `APPROVED`, `REJECTED`, `EXPIRED`, `REVOKED`, `APPLYING`, `FAILED`. |
| `uid` | string | Output only. System generated globally unique ID for the ChangeRequest. |
| `updateEntry` | GoogleCloudDataplexV1UpdateEntryRequest | Payload for updating an Entry. |
| `updateGlossary` | GoogleCloudDataplexV1UpdateGlossaryRequest | Payload for updating a Glossary. |
| `updateGlossaryCategory` | GoogleCloudDataplexV1UpdateGlossaryCategoryRequest | Payload for updating a GlossaryCategory. |
| `updateGlossaryTerm` | GoogleCloudDataplexV1UpdateGlossaryTermRequest | Payload for updating a GlossaryTerm. |
| `updateTime` | string (google-datetime) | Output only. The time when the ChangeRequest was last updated. |

### `GoogleCloudDataplexV1ContactIdentity`

- Identity of a business contact.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contactId` | string | Optional. Email ID or freeform ID of the Contact person. |
| `contactName` | string | Required. Name of the contact person for the Data Domain; unvalidated freeform text. |
| `contactRole` | string | Required. Designation of the person i.e. Data Steward or Data Analyst. Example values: owner, steward, producer, admin. |

### `GoogleCloudDataplexV1Contacts`

- Business contacts part of business context of a Data Domain. Corresponds to the Contacts Aspect in Dataplex Universal Catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identities` | array<GoogleCloudDataplexV1ContactIdentity> | Required. Identities of the business contacts. |

### `GoogleCloudDataplexV1CreateEntryLinkRequest`

- Request message for CreateEntryLink.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryLink` | GoogleCloudDataplexV1EntryLink | Required. Entry Link resource. |
| `entryLinkId` | string | Required. Entry Link identifier \* Must contain only lowercase letters, numbers and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the EntryGroup. |
| `parent` | string | Required. The resource name of the parent Entry Group: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. |

### `GoogleCloudDataplexV1CreateEntryRequest`

- Create Entry request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entry` | GoogleCloudDataplexV1Entry | Required. Entry resource. |
| `entryId` | string | Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters. |
| `parent` | string | Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}. |

### `GoogleCloudDataplexV1CreateGlossaryCategoryRequest`

- Creates a new GlossaryCategory under the specified Glossary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | GoogleCloudDataplexV1GlossaryCategory | Required. The GlossaryCategory to create. |
| `categoryId` | string | Required. GlossaryCategory identifier. |
| `parent` | string | Required. The parent resource where this GlossaryCategory will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where locationId refers to a Google Cloud region. |

### `GoogleCloudDataplexV1CreateGlossaryRequest`

- Create Glossary Request
- Version: v1

| Field | Type | Description |
|---|---|---|
| `glossary` | GoogleCloudDataplexV1Glossary | Required. The Glossary to create. |
| `glossaryId` | string | Required. Glossary ID: Glossary identifier. |
| `parent` | string | Required. The parent resource where this Glossary will be created. Format: projects/{project_id_or_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `validateOnly` | boolean | Optional. Validates the request without actually creating the Glossary. Default: false. |

### `GoogleCloudDataplexV1CreateGlossaryTermRequest`

- Creates a new GlossaryTerm under the specified Glossary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parent` | string | Required. The parent resource where the GlossaryTerm will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where location_id refers to a Google Cloud region. |
| `term` | GoogleCloudDataplexV1GlossaryTerm | Required. The GlossaryTerm to create. |
| `termId` | string | Required. GlossaryTerm identifier. |

### `GoogleCloudDataplexV1DataAsset`

- Represents a data asset resource that can be packaged and shared via a data product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessGroupConfigs` | object | Optional. Access groups configurations for this data asset.The key is DataProduct.AccessGroup.id and the value is AccessGroupConfig.Example: { "analyst": { "iamRoles": \["roles/bigquery.dataViewer"\] } } Currently, at most one IAM role is allowed per access group. For providing multiple predefined IAM roles, wrap them in a custom IAM role as per https://cloud.google.com/iam/docs/creating-custom-roles. |
| `createTime` | string (google-datetime) | Output only. The time at which the data asset was created. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. User-defined labels for the data asset.Example: { "environment": "production", "billing": "marketing-department" } |
| `name` | string | Identifier. Resource name of the data asset. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} |
| `resource` | string | Required. Immutable. Full resource name of the cloud resource represented by the data asset. This must follow https://cloud.google.com/iam/docs/full-resource-names. Example: //bigquery.googleapis.com/projects/my_project_123/datasets/dataset_456/tables/table_789 Only BigQuery tables and datasets are currently supported. Data asset creator must have getIamPolicy and setIamPolicy permissions on the resource. Data asset creator must also have resource specific get permission, for instance, bigquery.tables.get for BigQuery tables. |
| `uid` | string | Output only. System generated globally unique ID for the data asset. This ID will be different if the data asset is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time at which the data asset was last updated. |

### `GoogleCloudDataplexV1DataAssetAccessGroupConfig`

- Configuration for access group inherited from the parent data product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamRoles` | array<string> | Optional. IAM roles granted on the resource to this access group. Role name follows https://cloud.google.com/iam/docs/reference/rest/v1/roles.Example: \[ "roles/bigquery.dataViewer" \] |
| `state` | string enum | Output only. The state of the iam role application. Values: `STATE_UNSPECIFIED`, `APPLYING`, `APPLIED`, `FAILED`, `UNSUPPORTED`. |

### `GoogleCloudDataplexV1DataDiscoveryResult`

- The output of a data discovery scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryPublishing` | GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing | Output only. Configuration for metadata publishing. |
| `scanStatistics` | GoogleCloudDataplexV1DataDiscoveryResultScanStatistics | Output only. Describes result statistics of a data scan discovery job. |

### `GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing`

- Describes BigQuery publishing configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Output only. The BigQuery dataset the discovered tables are published to. |
| `location` | string | Output only. The location of the BigQuery publishing dataset. |

### `GoogleCloudDataplexV1DataDiscoveryResultScanStatistics`

- Describes result statistics of a data scan discovery job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataProcessedBytes` | string (int64) | The data processed in bytes. |
| `filesExcluded` | integer (int32) | The number of files excluded. |
| `filesetsCreated` | integer (int32) | The number of filesets created. |
| `filesetsDeleted` | integer (int32) | The number of filesets deleted. |
| `filesetsUpdated` | integer (int32) | The number of filesets updated. |
| `scannedFileCount` | integer (int32) | The number of files scanned. |
| `tablesCreated` | integer (int32) | The number of tables created. |
| `tablesDeleted` | integer (int32) | The number of tables deleted. |
| `tablesUpdated` | integer (int32) | The number of tables updated. |

### `GoogleCloudDataplexV1DataDiscoverySpec`

- Spec for a data discovery scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryPublishingConfig` | GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig | Optional. Configuration for metadata publishing. |
| `storageConfig` | GoogleCloudDataplexV1DataDiscoverySpecStorageConfig | Cloud Storage related configurations. |

### `GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig`

- Describes BigQuery publishing configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connection` | string | Optional. The BigQuery connection used to create BigLake tables. Must be in the form projects/{project_id}/locations/{location_id}/connections/{connection_id} |
| `location` | string | Optional. The location of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. 1. If the Cloud Storage bucket is located in a multi-region bucket, then BigQuery dataset can be in the same multi-region bucket or any single region that is included in the same multi-region bucket. The datascan can be created in any single region that is included in the same multi-region bucket 2. If the Cloud Storage bucket is located in a dual-region bucket, then BigQuery dataset can be located in regions that are included in the dual-region bucket, or in a multi-region that includes the dual-region. The datascan can be created in any single region that is included in the same dual-region bucket. 3. If the Cloud Storage bucket is located in a single region, then BigQuery dataset can be in the same single region or any multi-region bucket that includes the same single region. The datascan will be created in the same single region as the bucket. 4. If the BigQuery dataset is in single region, it must be in the same single region as the datascan.For supported values, refer to https://cloud.google.com/bigquery/docs/locations#supported_locations. |
| `project` | string | Optional. The project of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. If not specified, the project of the Cloud Storage bucket will be used. The format is "projects/{project_id_or_number}". |
| `tableType` | string enum | Optional. Determines whether to publish discovered tables as BigLake external tables or non-BigLake external tables. Values: `TABLE_TYPE_UNSPECIFIED`, `EXTERNAL`, `BIGLAKE`. |

### `GoogleCloudDataplexV1DataDiscoverySpecStorageConfig`

- Configurations related to Cloud Storage as the data source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `csvOptions` | GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions | Optional. Configuration for CSV data. |
| `excludePatterns` | array<string> | Optional. Defines the data to exclude during discovery. Provide a list of patterns that identify the data to exclude. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names. |
| `includePatterns` | array<string> | Optional. Defines the data to include during discovery when only a subset of the data should be considered. Provide a list of patterns that identify the data to include. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names. |
| `jsonOptions` | GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions | Optional. Configuration for JSON data. |

### `GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions`

- Describes CSV and similar semi-structured data formats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimiter` | string | Optional. The delimiter that is used to separate values. The default is , (comma). |
| `encoding` | string | Optional. The character encoding of the data. The default is UTF-8. |
| `headerRows` | integer (int32) | Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. |
| `quote` | string | Optional. The character used to quote column values. Accepts " (double quotation mark) or ' (single quotation mark). If unspecified, defaults to " (double quotation mark). |
| `typeInferenceDisabled` | boolean | Optional. Whether to disable the inference of data types for CSV data. If true, all columns are registered as strings. |

### `GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions`

- Describes JSON data format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encoding` | string | Optional. The character encoding of the data. The default is UTF-8. |
| `typeInferenceDisabled` | boolean | Optional. Whether to disable the inference of data types for JSON data. If true, all columns are registered as their primitive types (strings, number, or boolean). |

### `GoogleCloudDataplexV1DataDocumentationResult`

- The output of a DataDocumentation scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataProductResult` | GoogleCloudDataplexV1DataDocumentationResultDataProductResult | Output only. Insights for a data product. |
| `datasetResult` | GoogleCloudDataplexV1DataDocumentationResultDatasetResult | Output only. Insights for a Dataset resource. |
| `tableResult` | GoogleCloudDataplexV1DataDocumentationResultTableResult | Output only. Insights for a Table resource. |

### `GoogleCloudDataplexV1DataDocumentationResultDataProductResult`

- Generated metadata about a data product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetDescriptions` | array<GoogleCloudDataplexV1DataDocumentationResultDataProductResultAssetDescription> | Output only. Unordered list. Generated descriptions for assets in the data product. Note that some assets may not have a generated description. Such assets will not be included in this list. |
| `overview` | string | Output only. A detailed description for the data product. |
| `queries` | array<GoogleCloudDataplexV1DataDocumentationResultQuery> | Output only. Unordered list. Sample SQL queries for the data product. |

### `GoogleCloudDataplexV1DataDocumentationResultDataProductResultAssetDescription`

- Description for an asset in the data product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overview` | string | Output only. A generated description for the asset. |
| `resource` | string | Output only. The service-qualified full resource name of the asset. Example: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID |

### `GoogleCloudDataplexV1DataDocumentationResultDatasetResult`

- Insights for a dataset resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overview` | string | Output only. Generated Dataset description. |
| `queries` | array<GoogleCloudDataplexV1DataDocumentationResultQuery> | Output only. Sample SQL queries for the dataset. |
| `schemaRelationships` | array<GoogleCloudDataplexV1DataDocumentationResultSchemaRelationship> | Output only. Relationships suggesting how tables in the dataset are related to each other, based on their schema. |

### `GoogleCloudDataplexV1DataDocumentationResultField`

- Column of a table with generated metadata and nested fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. Generated description for columns and fields. |
| `fields` | array<GoogleCloudDataplexV1DataDocumentationResultField> | Output only. Nested fields. |
| `name` | string | Output only. The name of the column. |

### `GoogleCloudDataplexV1DataDocumentationResultQuery`

- A sample SQL query in data documentation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. The description for the query. |
| `sql` | string | Output only. The SQL query string which can be executed. |
| `sqlDialect` | string enum | Output only. The SQL dialect of the query. Values: `SQL_DIALECT_UNSPECIFIED`, `GOOGLE_SQL`, `SPARK_SQL`. |

### `GoogleCloudDataplexV1DataDocumentationResultSchema`

- Schema of the table with generated metadata of columns.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | array<GoogleCloudDataplexV1DataDocumentationResultField> | Output only. The list of columns. |

### `GoogleCloudDataplexV1DataDocumentationResultSchemaRelationship`

- Details of the relationship between the schema of two resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `leftSchemaPaths` | GoogleCloudDataplexV1DataDocumentationResultSchemaRelationshipSchemaPaths | Output only. An ordered list of fields for the join from the first table. The size of this list must be the same as right_schema_paths. Each field at index i in this list must correspond to a field at the same index in the right_schema_paths list. |
| `rightSchemaPaths` | GoogleCloudDataplexV1DataDocumentationResultSchemaRelationshipSchemaPaths | Output only. An ordered list of fields for the join from the second table. The size of this list must be the same as left_schema_paths. Each field at index i in this list must correspond to a field at the same index in the left_schema_paths list. |
| `sources` | array<string> | Output only. Sources which generated the schema relation edge. Values: `SOURCE_UNSPECIFIED`, `AGENT`, `QUERY_HISTORY`, `TABLE_CONSTRAINTS`. |
| `type` | string enum | Output only. The type of relationship between the schema paths. Values: `TYPE_UNSPECIFIED`, `SCHEMA_JOIN`. |

### `GoogleCloudDataplexV1DataDocumentationResultSchemaRelationshipSchemaPaths`

- Represents an ordered set of paths within a table's schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `paths` | array<string> | Output only. An ordered set of Paths to fields within the schema of the table. For fields nested within a top level field of type record, use '.' to separate field names. Examples: Top level field - top_level Nested field - top_level.child.sub_field |
| `tableFqn` | string | Output only. The service-qualified full resource name of the table Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID |

### `GoogleCloudDataplexV1DataDocumentationResultTableResult`

- Insights for a table resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The service-qualified full resource name of the cloud resource. Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID |
| `overview` | string | Output only. Generated description of the table. |
| `queries` | array<GoogleCloudDataplexV1DataDocumentationResultQuery> | Output only. Sample SQL queries for the table. |
| `schema` | GoogleCloudDataplexV1DataDocumentationResultSchema | Output only. Schema of the table with generated metadata of the columns in the schema. |

### `GoogleCloudDataplexV1DataDocumentationSpec`

- DataDocumentation scan related spec.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `catalogPublishingEnabled` | boolean | Optional. Whether to publish result to Dataplex Catalog. |
| `customInstructions` | string | Optional. Custom instructions for generating data documentation. The maximum length is 2,048 characters. |
| `generationScopes` | array<string> | Optional. Specifies which components of the data documentation to generate. Any component that is required to generate the specified components will also be generated. If no generation scope is specified, all available documentation components will be generated. Values: `GENERATION_SCOPE_UNSPECIFIED`, `ALL`, `TABLE_AND_COLUMN_DESCRIPTIONS`, `SQL_QUERIES`, `BUSINESS_GLOSSARY_TERM_ASSOCIATIONS`. |
| `sqlDialect` | string enum | Optional. The SQL dialect to use in the generated SQL queries. If not specified, the default dialect is Google SQL. Values: `SQL_DIALECT_UNSPECIFIED`, `GOOGLE_SQL`, `SPARK_SQL`. |

### `GoogleCloudDataplexV1DataDomain`

- A DataDomain is a logical grouping of data resources for governance, discovery, and management at scale.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contacts` | GoogleCloudDataplexV1Contacts | Required. Contact info for the Data Domains. |
| `createTime` | string (google-datetime) | Output only. The time at which the DataDomain was created. |
| `description` | string | Optional. User-provided description of the DataDomain. |
| `displayName` | string | Required. User-friendly display name. |
| `labels` | object | Optional. User-defined labels for the DataDomain. |
| `name` | string | Identifier. The relative resource name of the DataDomain, of the form: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id} |
| `parentDataDomain` | string | Optional. Immutable. The resource name of the parent DataDomain. Empty if this is a top-level DataDomain. Format: projects/{project_id_or_number}/locations/{location}/dataDomains/{parent_data_domain_id} This field is immutable after creation. |
| `policyMember` | GoogleIamV1ResourcePolicyMember | Output only. Output-only policy member strings of this resource. |
| `uid` | string | Output only. System-generated globally unique ID for the DataDomain. |
| `updateTime` | string (google-datetime) | Output only. The time at which the DataDomain was last updated. |

### `GoogleCloudDataplexV1DataDomainBinding`

- DataDomainBinding represents a rule that includes a Google Cloud resource and its contents into a DataDomain.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the DataDomainBinding was created. |
| `name` | string | Identifier. The relative resource name of the DataDomainBinding. Format: projects/{project_id_or_number}/locations/{location}/dataDomains/{data_domain_id}/bindings/{binding_id} |
| `resource` | string | Required. Immutable. The full resource name of the Google Cloud resource to be bound (i.e. included together with its contents) to the DataDomain.Format: IAM Full resource name (https://docs.cloud.google.com/iam/docs/full-resource-names) Examples: - GCP Project: //cloudresourcemanager.googleapis.com/projects/{project-id} - BigQuery Dataset: //bigquery.googleapis.com/projects/{project-id}/datasets/{dataset-id} - BigQuery Table: //bigquery.googleapis.com/projects/{project-id}/datasets/{dataset-id}/tables/{table-id} - Dataplex Data Product: //dataplex.googleapis.com/projects/{project-number}/locations/{location}/dataProducts/{data-product-id}Authorization: the resource to be bound must first grant an IAM role with the resource-specific setIamPolicy permission to the DataDomain. Example: - resource: //bigquery.googleapis.com/projects/{project-id}/datasets/{dataset-id} - IAM role: with bigquery.datasets.setIamPolicy permission (e.g. roles/owner) - IAM member: principal://dataplex.googleapis.com/projects/{project-number}/name/locations/{location}/dataDomains/{data-domain-id} |
| `uid` | string | Output only. System-generated unique ID. |

### `GoogleCloudDataplexV1DataProduct`

- A data product is a curated collection of data assets, packaged to address specific use cases. It's a way to manage and share data in a more organized, product-like manner.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessApprovalConfig` | GoogleCloudDataplexV1DataProductAccessApprovalConfig | Optional. Configuration for access approval for the data product. |
| `accessGroups` | object | Optional. Data product access groups by access group id as key. If data product is used only for packaging data assets, then access groups may be empty. However, if a data product is used for sharing data assets, then at least one access group must be specified.Example: { "analyst": { "id": "analyst", "displayName": "Analyst", "description": "Access group for analysts", "principal": { "googleGroup": "analysts@example.com" } } } |
| `assetCount` | integer (int32) | Output only. Number of data assets associated with this data product. |
| `createTime` | string (google-datetime) | Output only. The time at which the data product was created. |
| `description` | string | Optional. Description of the data product. |
| `displayName` | string | Required. User-friendly display name of the data product. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `icon` | string (byte) | Optional. Base64 encoded image representing the data product. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. |
| `labels` | object | Optional. User-defined labels for the data product.Example: { "environment": "production", "billing": "marketing-department" } |
| `name` | string | Identifier. Resource name of the data product. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}. |
| `ownerEmails` | array<string> | Required. Emails of the data product owners. |
| `uid` | string | Output only. System generated unique ID for the data product. This ID will be different if the data product is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time at which the data product was last updated. |

### `GoogleCloudDataplexV1DataProductAccessApprovalConfig`

- Configuration for access approval for the data product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approverEmails` | array<string> | Optional. Specifies the email addresses of users who are potential approvers and are notified when an access request is made for the data product. The maximum number of emails allowed is 10. |

### `GoogleCloudDataplexV1DataProductAccessGroup`

- Custom user defined access groups at the data product level. These are used for granting different levels of access (IAM roles) on the individual data product's data assets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultIamRoleConfig` | GoogleCloudDataplexV1DataProductAccessGroupDefaultIamRoleConfig | Optional. Default IAM role configuration to be applied on the data assets associated with this data product, for this access group. |
| `description` | string | Optional. Description of the access group. |
| `displayName` | string | Required. User friendly display name of the access group. Eg. "Analyst", "Developer", etc. |
| `id` | string | Required. Unique identifier of the access group within the data product. User defined. Eg. "analyst", "developer", etc. |
| `principal` | GoogleCloudDataplexV1DataProductPrincipal | Required. The principal entity associated with this access group. |

### `GoogleCloudDataplexV1DataProductAccessGroupDefaultIamRoleConfig`

- Default IAM role configuration for an access group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `role` | string | Optional. The IAM role resource name to be applied as default. Example: "roles/bigquery.dataViewer". |

### `GoogleCloudDataplexV1DataProductAccessRequest`

- Message for requesting access to a Data Product. This will be used to create a ChangeRequest of type REQUEST_DATA_PRODUCT_ACCESS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessGroupDisplayName` | string | Output only. The display name of the access group defined in the Data Product for which access is being requested. |
| `accessGroupId` | string | Required. The ID of the access group for which access is being requested. This corresponds to the unique identifier of the AccessGroup defined in the Data Product. |
| `parent` | string | Required. The resource name of the data product. Format: projects/{project_number}/locations/{location_id}/dataProducts/{data_product_id} |
| `requestedPrincipal` | string | Optional. The principal for which access is being requested in IAM format. If not specified, the requestor's principal will be used. Example: serviceAccount:my-sa@my-project.iam.gserviceaccount.com. Only service account principals are currently supported. https://cloud.google.com/iam/docs/principal-identifiers |

### `GoogleCloudDataplexV1DataProductPrincipal`

- Represents the principal entity associated with an access group, as per https://cloud.google.com/iam/docs/principals-overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googleGroup` | string | Optional. Email of the Google Group, as per https://cloud.google.com/iam/docs/principals-overview#google-group. |
| `serviceAccount` | string | Optional. Specifies the email of the producer service account, as per https://cloud.google.com/iam/docs/principals-overview#service-account. |

### `GoogleCloudDataplexV1DataProfileResult`

- DataProfileResult defines the output of DataProfileScan. Each field of the table will have field type specific profile result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `catalogPublishingStatus` | GoogleCloudDataplexV1DataScanCatalogPublishingStatus | Output only. The status of publishing the data scan as Dataplex Universal Catalog metadata. |
| `postScanActionsResult` | GoogleCloudDataplexV1DataProfileResultPostScanActionsResult | Output only. The result of post scan actions. |
| `profile` | GoogleCloudDataplexV1DataProfileResultProfile | Output only. The profile information per field. |
| `rowCount` | string (int64) | Output only. The count of rows scanned. |
| `scannedData` | GoogleCloudDataplexV1ScannedData | Output only. The data scanned for this result. |

### `GoogleCloudDataplexV1DataProfileResultPostScanActionsResult`

- The result of post scan actions of DataProfileScan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryExportResult` | GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult | Output only. The result of BigQuery export post scan action. |

### `GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult`

- The result of BigQuery export post scan action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Output only. Additional information about the BigQuery exporting. |
| `state` | string enum | Output only. Execution state for the BigQuery exporting. Values: `STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `SKIPPED`. |

### `GoogleCloudDataplexV1DataProfileResultProfile`

- Contains name, type, mode and field type specific profile information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | array<GoogleCloudDataplexV1DataProfileResultProfileField> | Output only. List of fields with structural and profile information for each field. |

### `GoogleCloudDataplexV1DataProfileResultProfileField`

- A field within a table.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string | Output only. The mode of the field. Possible values include: REQUIRED, if it is a required field. NULLABLE, if it is an optional field. REPEATED, if it is a repeated field. |
| `name` | string | Output only. The name of the field. |
| `profile` | GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo | Output only. Profile information for the corresponding field. |
| `type` | string | Output only. The data type retrieved from the schema of the data source. For instance, for a BigQuery native table, it is the BigQuery Table Schema (https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#tablefieldschema). For a Dataplex Universal Catalog Entity, it is the Entity Schema (https://cloud.google.com/dataplex/docs/reference/rpc/google.cloud.dataplex.v1#type_3). |

### `GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo`

- The profile information for each field type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distinctRatio` | number (double) | Output only. Ratio of rows with distinct values against total scanned rows. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode. |
| `doubleProfile` | GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo | Double type field information. |
| `integerProfile` | GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo | Integer type field information. |
| `nullRatio` | number (double) | Output only. Ratio of rows with null value against total scanned rows. |
| `stringProfile` | GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo | String type field information. |
| `topNValues` | array<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue> | Output only. The list of top N non-null values, frequency and ratio with which they occur in the scanned data. N is 10 or equal to the number of distinct values in the field, whichever is smaller. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode. |

### `GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo`

- The profile information for a double type field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `average` | number (double) | Output only. Average of non-null values in the scanned data. NaN, if the field has a NaN. |
| `max` | number (double) | Output only. Maximum of non-null values in the scanned data. NaN, if the field has a NaN. |
| `min` | number (double) | Output only. Minimum of non-null values in the scanned data. NaN, if the field has a NaN. |
| `quartiles` | array<number> | Output only. A quartile divides the number of data points into four parts, or quarters, of more-or-less equal size. Three main quartiles used are: The first quartile (Q1) splits off the lowest 25% of data from the highest 75%. It is also known as the lower or 25th empirical quartile, as 25% of the data is below this point. The second quartile (Q2) is the median of a data set. So, 50% of the data lies below this point. The third quartile (Q3) splits off the highest 25% of data from the lowest 75%. It is known as the upper or 75th empirical quartile, as 75% of the data lies below this point. Here, the quartiles is provided as an ordered list of quartile values for the scanned data, occurring in order Q1, median, Q3. |
| `standardDeviation` | number (double) | Output only. Standard deviation of non-null values in the scanned data. NaN, if the field has a NaN. |

### `GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo`

- The profile information for an integer type field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `average` | number (double) | Output only. Average of non-null values in the scanned data. NaN, if the field has a NaN. |
| `max` | string (int64) | Output only. Maximum of non-null values in the scanned data. NaN, if the field has a NaN. |
| `min` | string (int64) | Output only. Minimum of non-null values in the scanned data. NaN, if the field has a NaN. |
| `quartiles` | array<string> | Output only. A quartile divides the number of data points into four parts, or quarters, of more-or-less equal size. Three main quartiles used are: The first quartile (Q1) splits off the lowest 25% of data from the highest 75%. It is also known as the lower or 25th empirical quartile, as 25% of the data is below this point. The second quartile (Q2) is the median of a data set. So, 50% of the data lies below this point. The third quartile (Q3) splits off the highest 25% of data from the lowest 75%. It is known as the upper or 75th empirical quartile, as 75% of the data lies below this point. Here, the quartiles is provided as an ordered list of approximate quartile values for the scanned data, occurring in order Q1, median, Q3. |
| `standardDeviation` | number (double) | Output only. Standard deviation of non-null values in the scanned data. NaN, if the field has a NaN. |

### `GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo`

- The profile information for a string type field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `averageLength` | number (double) | Output only. Average length of non-null values in the scanned data. |
| `maxLength` | string (int64) | Output only. Maximum length of non-null values in the scanned data. |
| `minLength` | string (int64) | Output only. Minimum length of non-null values in the scanned data. |

### `GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue`

- Top N non-null values in the scanned data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Output only. Count of the corresponding value in the scanned data. |
| `ratio` | number (double) | Output only. Ratio of the corresponding value in the field against the total number of rows in the scanned data. |
| `value` | string | Output only. String value of a top N non-null value. |

### `GoogleCloudDataplexV1DataProfileSpec`

- DataProfileScan related setting.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `catalogPublishingEnabled` | boolean | Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata. |
| `excludeFields` | GoogleCloudDataplexV1DataProfileSpecSelectedFields | Optional. The fields to exclude from data profile.If specified, the fields will be excluded from data profile, regardless of include_fields value. |
| `includeFields` | GoogleCloudDataplexV1DataProfileSpecSelectedFields | Optional. The fields to include in data profile.If not specified, all fields at the time of profile scan job execution are included, except for ones listed in exclude_fields. |
| `mode` | string enum | Optional. The execution mode for the profile scan. Values: `MODE_UNSPECIFIED`, `STANDARD`, `LIGHTWEIGHT`. |
| `postScanActions` | GoogleCloudDataplexV1DataProfileSpecPostScanActions | Optional. Actions to take upon job completion.. |
| `rowFilter` | string | Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in BigQuery standard SQL syntax. Example: col1 >= 0 AND col2 < 10 |
| `samplingPercent` | number (float) | Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100. |

### `GoogleCloudDataplexV1DataProfileSpecPostScanActions`

- The configuration of post scan actions of DataProfileScan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryExport` | GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport | Optional. If set, results will be exported to the provided BigQuery table. |

### `GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport`

- The configuration of BigQuery export post scan action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resultsTable` | string | Optional. The BigQuery table to export DataProfileScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID |

### `GoogleCloudDataplexV1DataProfileSpecSelectedFields`

- The specification for fields to include or exclude in data profile scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldNames` | array<string> | Optional. Expected input is a list of fully qualified names of fields as in the schema.Only top-level field names for nested fields are supported. For instance, if 'x' is of nested field type, listing 'x' is supported but 'x.y.z' is not supported. Here 'y' and 'y.z' are nested fields of 'x'. |

### `GoogleCloudDataplexV1DataQualityColumnResult`

- DataQualityColumnResult provides a more detailed, per-column view of the results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `column` | string | Output only. The column specified in the DataQualityRule. |
| `dimensions` | array<GoogleCloudDataplexV1DataQualityDimensionResult> | Output only. The dimension-level results for this column. |
| `passed` | boolean | Output only. Whether the column passed or failed. |
| `score` | number (float) | Output only. The column-level data quality score for this data scan job if and only if the 'column' field is set.The score ranges between between 0, 100 (up to two decimal points). |

### `GoogleCloudDataplexV1DataQualityDimension`

- A dimension captures data quality intent about a defined subset of the rules specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The dimension name a rule belongs to. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters. |

### `GoogleCloudDataplexV1DataQualityDimensionResult`

- DataQualityDimensionResult provides a more detailed, per-dimension view of the results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dimension` | GoogleCloudDataplexV1DataQualityDimension | Output only. The dimension config specified in the DataQualitySpec, as is. |
| `passed` | boolean | Output only. Whether the dimension passed or failed. |
| `score` | number (float) | Output only. The dimension-level data quality score for this data scan job if and only if the 'dimension' field is set.The score ranges between 0, 100 (up to two decimal points). |

### `GoogleCloudDataplexV1DataQualityResult`

- The output of a DataQualityScan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `anomalyDetectionGeneratedAssets` | GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets | Output only. The generated assets for anomaly detection. |
| `catalogPublishingStatus` | GoogleCloudDataplexV1DataScanCatalogPublishingStatus | Output only. The status of publishing the data scan as Dataplex Universal Catalog metadata. |
| `columns` | array<GoogleCloudDataplexV1DataQualityColumnResult> | Output only. A list of results at the column level.A column will have a corresponding DataQualityColumnResult if and only if there is at least one rule with the 'column' field set to it. |
| `dimensions` | array<GoogleCloudDataplexV1DataQualityDimensionResult> | Output only. A list of results at the dimension level.A dimension will have a corresponding DataQualityDimensionResult if and only if there is at least one rule with the 'dimension' field set to it. |
| `passed` | boolean | Output only. Overall data quality result -- true if all rules passed. |
| `postScanActionsResult` | GoogleCloudDataplexV1DataQualityResultPostScanActionsResult | Output only. The result of post scan actions. |
| `rowCount` | string (int64) | Output only. The count of rows processed. |
| `rules` | array<GoogleCloudDataplexV1DataQualityRuleResult> | Output only. A list of all the rules in a job, and their results. |
| `scannedData` | GoogleCloudDataplexV1ScannedData | Output only. The data scanned for this result. |
| `score` | number (float) | Output only. The overall data quality score.The score ranges between 0, 100 (up to two decimal points). |

### `GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets`

- The assets generated by Anomaly Detection Data Scan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataIntermediateTable` | string | Output only. The intermediate table for data anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID |
| `freshnessIntermediateTable` | string | Output only. The intermediate table for freshness anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID |
| `resultTable` | string | Output only. The result table for anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID If the result table is set at AnomalyDetectionAssets, the result table here would be the same as the one set in the AnomalyDetectionAssets.result_table. |
| `volumeIntermediateTable` | string | Output only. The intermediate table for volume anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID |

### `GoogleCloudDataplexV1DataQualityResultPostScanActionsResult`

- The result of post scan actions of DataQualityScan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryExportResult` | GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult | Output only. The result of BigQuery export post scan action. |

### `GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult`

- The result of BigQuery export post scan action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Output only. Additional information about the BigQuery exporting. |
| `state` | string enum | Output only. Execution state for the BigQuery exporting. Values: `STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `SKIPPED`. |

### `GoogleCloudDataplexV1DataQualityRule`

- A rule captures data quality intent about a data source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. Map of attribute name and value linked to the rule. The rules to evaluate can be filtered based on attributes provided here and a filter expression provided in the DataQualitySpec.filter field. |
| `column` | string | Optional. The unnested column which this rule is evaluated against. |
| `debugQueries` | array<GoogleCloudDataplexV1DataQualityRuleDebugQuery> | Optional. Specifies the debug queries for this rule. Currently, only one query is supported, but this may be expanded in the future. |
| `description` | string | Optional. Description of the rule. The maximum length is 1,024 characters. |
| `dimension` | string | Optional. The dimension a rule belongs to. Results are also aggregated at the dimension level. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters. |
| `ignoreNull` | boolean | Optional. Rows with null values will automatically fail a rule, unless ignore_null is true. In that case, such null rows are trivially considered passing.This field is only valid for the following type of rules: RangeExpectation RegexExpectation SetExpectation UniquenessExpectation |
| `name` | string | Optional. A mutable name for the rule. The name must contain only letters (a-z, A-Z), numbers (0-9), or hyphens (-). The maximum length is 63 characters. Must start with a letter. Must end with a number or a letter. |
| `nonNullExpectation` | GoogleCloudDataplexV1DataQualityRuleNonNullExpectation | Row-level rule which evaluates whether each column value is null. |
| `rangeExpectation` | GoogleCloudDataplexV1DataQualityRuleRangeExpectation | Row-level rule which evaluates whether each column value lies between a specified range. |
| `regexExpectation` | GoogleCloudDataplexV1DataQualityRuleRegexExpectation | Row-level rule which evaluates whether each column value matches a specified regex. |
| `rowConditionExpectation` | GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation | Row-level rule which evaluates whether each row in a table passes the specified condition. |
| `ruleSource` | GoogleCloudDataplexV1DataQualityRuleRuleSource | Output only. Contains information about the source of the rule and its relationship with the BigQuery table, where applicable. |
| `setExpectation` | GoogleCloudDataplexV1DataQualityRuleSetExpectation | Row-level rule which evaluates whether each column value is contained by a specified set. |
| `sqlAssertion` | GoogleCloudDataplexV1DataQualityRuleSqlAssertion | Aggregate rule which evaluates the number of rows returned for the provided statement. If any rows are returned, this rule fails. |
| `statisticRangeExpectation` | GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation | Aggregate rule which evaluates whether the column aggregate statistic lies between a specified range. |
| `suspended` | boolean | Optional. Whether the Rule is active or suspended. Default is false. |
| `tableConditionExpectation` | GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation | Aggregate rule which evaluates whether the provided expression is true for a table. |
| `templateReference` | GoogleCloudDataplexV1DataQualityRuleTemplateReference | Aggregate rule which references a rule template and provides the parameters to be substituted in the template. If any rows are returned, this rule fails. |
| `threshold` | number (double) | Optional. The minimum ratio of passing_rows / total_rows required to pass this rule, with a range of 0.0, 1.0.0 indicates default value (i.e. 1.0).This field is only valid for row-level type rules. |
| `uniquenessExpectation` | GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation | Row-level rule which evaluates whether each column value is unique. |

### `GoogleCloudDataplexV1DataQualityRuleDebugQuery`

- Specifies a SQL statement that is evaluated to return up to 10 scalar values that are used to debug rules. If the rule fails, the values can help diagnose the cause of the failure.The SQL statement must use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax), and must not contain any semicolons.You can use the data reference parameter ${data()} to reference the source table with all of its precondition filters applied. Examples of precondition filters include row filters, incremental data filters, and sampling. For more information, see Data reference parameter (https://cloud.google.com/dataplex/docs/auto-data-quality-overview#data-reference-parameter).You can also name results with an explicit alias using \[AS\] alias. For more information, see BigQuery explicit aliases (https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#explicit_alias_syntax).Example: SELECT MIN(col1) AS min_col1, MAX(col1) AS max_col1 FROM ${data()}
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Specifies the description of the debug query. The maximum length is 1,024 characters. |
| `sqlStatement` | string | Required. Specifies the SQL statement to be executed. |

### `GoogleCloudDataplexV1DataQualityRuleNonNullExpectation`

- Evaluates whether each column value is null.
- Version: v1

### `GoogleCloudDataplexV1DataQualityRuleRangeExpectation`

- Evaluates whether each column value lies between a specified range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxValue` | string | Optional. The maximum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided. |
| `minValue` | string | Optional. The minimum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided. |
| `strictMaxEnabled` | boolean | Optional. Whether each value needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false. |
| `strictMinEnabled` | boolean | Optional. Whether each value needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false. |

### `GoogleCloudDataplexV1DataQualityRuleRegexExpectation`

- Evaluates whether each column value matches a specified regex.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `regex` | string | Optional. A regular expression the column value is expected to match. |

### `GoogleCloudDataplexV1DataQualityRuleResult`

- DataQualityRuleResult provides a more detailed, per-rule view of the results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assertionRowCount` | string (int64) | Output only. The number of rows returned by the SQL statement in a SQL assertion rule.This field is only valid for SQL assertion rules. |
| `debugQueriesResultSets` | array<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet> | Output only. Contains the results of all debug queries for this rule. The number of result sets will correspond to the number of debug_queries. |
| `evaluatedCount` | string (int64) | Output only. The number of rows a rule was evaluated against.This field is only valid for row-level type rules.Evaluated count can be configured to either include all rows (default) - with null rows automatically failing rule evaluation, or exclude null rows from the evaluated_count, by setting ignore_nulls = true.This field is not set for rule SqlAssertion. |
| `failingRowsQuery` | string | Output only. The query to find rows that did not pass this rule.This field is only valid for row-level type rules. |
| `nullCount` | string (int64) | Output only. The number of rows with null values in the specified column. |
| `passRatio` | number (double) | Output only. The ratio of passed_count / evaluated_count.This field is only valid for row-level type rules. |
| `passed` | boolean | Output only. Whether the rule passed or failed. |
| `passedCount` | string (int64) | Output only. The number of rows which passed a rule evaluation.This field is only valid for row-level type rules.This field is not set for rule SqlAssertion. |
| `rule` | GoogleCloudDataplexV1DataQualityRule | Output only. The rule specified in the DataQualitySpec, as is. |

### `GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult`

- Contains a single result from the debug query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Specifies the name of the result. Available if provided with an explicit alias using \[AS\] alias. |
| `type` | string | Indicates the data type of the result. For more information, see BigQuery data types (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types). |
| `value` | string | Represents the value of the result as a string. |

### `GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet`

- Contains all results from a debug query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `results` | array<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult> | Output only. Contains all results. Up to 10 results can be returned. |

### `GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation`

- Evaluates whether each row passes the specified condition.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a boolean value per row as the result.Example: col1 >= 0 AND col2 < 10
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sqlExpression` | string | Optional. The SQL expression. |

### `GoogleCloudDataplexV1DataQualityRuleRuleSource`

- Represents the rule source information from Catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rulePathElements` | array<GoogleCloudDataplexV1DataQualityRuleRuleSourceRulePathElement> | Output only. Rule path elements represent information about the individual items in the relationship path between the scan resource and rule origin in that order. |

### `GoogleCloudDataplexV1DataQualityRuleRuleSourceRulePathElement`

- Path Element represents the direct relationship between the rule origin (aspects) to the BigQuery Entry. Ordering of the rule relationship will be maintained such that the first entry in the list is the closest ancestor (BigQuery table itself). A blank source denotes that the rule is derived directly from the DataScan itself.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryLinkSource` | GoogleCloudDataplexV1DataQualityRuleRuleSourceRulePathElementEntryLinkSource | Output only. Entry link source represents information about the entry link. |
| `entrySource` | GoogleCloudDataplexV1DataQualityRuleRuleSourceRulePathElementEntrySource | Output only. Entry source represents information about the related source entry. |

### `GoogleCloudDataplexV1DataQualityRuleRuleSourceRulePathElementEntryLinkSource`

- Entry link source represents information about the entry link.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entryLink` | string | Output only. The entry link name in the form of: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id} |
| `entryLinkType` | string | Output only. The entry link type to represent the current relationship between the entry and the next entry in the path. In the form of: projects/{project_id_or_number}/locations/{location_id}/entryLinkTypes/{entry_link_type_id} |

### `GoogleCloudDataplexV1DataQualityRuleRuleSourceRulePathElementEntrySource`

- Entry source represents information about the related source entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. The display name of the entry. |
| `entry` | string | Output only. The entry name in the form of: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id} |
| `entryType` | string | Output only. The entry type to represent the current characteristics of the entry in the form of: projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry-type-id}. |

### `GoogleCloudDataplexV1DataQualityRuleSetExpectation`

- Evaluates whether each column value is contained by a specified set.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | Optional. Expected values for the column value. |

### `GoogleCloudDataplexV1DataQualityRuleSqlAssertion`

- A SQL statement that is evaluated to return rows that match an invalid state. If any rows are are returned, this rule fails.The SQL statement must use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax), and must not contain any semicolons.You can use the data reference parameter ${data()} to reference the source table with all of its precondition filters applied. Examples of precondition filters include row filters, incremental data filters, and sampling. For more information, see Data reference parameter (https://cloud.google.com/dataplex/docs/auto-data-quality-overview#data-reference-parameter).Example: SELECT \* FROM ${data()} WHERE price < 0
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sqlStatement` | string | Optional. The SQL statement. |

### `GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation`

- Evaluates whether the column aggregate statistic lies between a specified range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxValue` | string | Optional. The maximum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided. |
| `minValue` | string | Optional. The minimum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided. |
| `statistic` | string enum | Optional. The aggregate metric to evaluate. Values: `STATISTIC_UNDEFINED`, `MEAN`, `MIN`, `MAX`. |
| `strictMaxEnabled` | boolean | Optional. Whether column statistic needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false. |
| `strictMinEnabled` | boolean | Optional. Whether column statistic needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false. |

### `GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation`

- Evaluates whether the provided expression is true.The SQL expression needs to use GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax) and should produce a scalar boolean result.Example: MIN(col1) >= 0
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sqlExpression` | string | Optional. The SQL expression. |

### `GoogleCloudDataplexV1DataQualityRuleTemplate`

- DataQualityRuleTemplate represents a template which can be reused across multiple data quality rules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capabilities` | array<string> | Output only. A list of features or properties supported by this rule template. |
| `dimension` | string | Output only. The dimension a rule template belongs to. Rule level results are also aggregated at the dimension level. |
| `inputParameters` | object | Output only. Description for input parameters |
| `name` | string | Output only. The name of the rule template in the format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id} |
| `sqlCollection` | array<GoogleCloudDataplexV1DataQualityRuleTemplateSql> | Output only. Collection of SQLs for data quality rules. Currently only one SQL is supported. |

### `GoogleCloudDataplexV1DataQualityRuleTemplateParameterDescription`

- Description of the input parameter. It can include the type(s) supported by the parameter and intended usage. It is for information purposes only and does not affect the behavior of the rule template.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultValue` | string | Output only. The default value for the parameter if no value is provided. |
| `description` | string | Output only. Description of the input parameter. It can include the type(s) supported by the parameter and intended usage. It is for information purposes only and does not affect the behavior of the rule template. |

### `GoogleCloudDataplexV1DataQualityRuleTemplateReference`

- A rule that constructs a SQL statement to evaluate using a rule template and parameter values. If the constructed statement returns any rows, this rule fails
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The template entry name. Entry must be of EntryType projects/dataplex-types/locations/global/entryTypes/data-quality-rule-template and contains top-level aspect of AspectType projects/dataplex-types/locations/global/aspectTypes/data-quality-rule-template. The format is: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id} |
| `resolvedSql` | string | Output only. The resolved SQL statement generated from the template with parameters substituted. It is only populated in the result. |
| `ruleTemplate` | GoogleCloudDataplexV1DataQualityRuleTemplate | Output only. The rule template used to resolve the rule. It is only populated in the result. |
| `values` | object | Optional. Provides the map of parameter name and value. The maximum size of the field is 120KB (encoded as UTF-8). |

### `GoogleCloudDataplexV1DataQualityRuleTemplateReferenceParameterValue`

- Represents a parameter value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | string | Required. Represents the string value of the parameter. |

### `GoogleCloudDataplexV1DataQualityRuleTemplateSql`

- Templatized SQL query for data quality rules. It can have parameters that can be substituted with values when a rule is created using this template.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `query` | string | Output only. Templatized SQL query for data quality rules. |

### `GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation`

- Evaluates whether the column has duplicates.
- Version: v1

### `GoogleCloudDataplexV1DataQualityScanRuleResult`

- Information about the result of a data quality rule for data quality scan. The monitored resource is 'DataScan'.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assertionRowCount` | string (int64) | The number of rows returned by the SQL statement in a SQL assertion rule. This field is only valid for SQL assertion rules. |
| `column` | string | The column which this rule is evaluated against. |
| `dataSource` | string | The data source of the data scan (e.g. BigQuery table name). |
| `evaluatedRowCount` | string (int64) | The number of rows evaluated against the data quality rule. This field is only valid for rules of PER_ROW evaluation type. |
| `evalutionType` | string enum | The evaluation type of the data quality rule. Values: `EVALUATION_TYPE_UNSPECIFIED`, `PER_ROW`, `AGGREGATE`. |
| `jobId` | string | Identifier of the specific data scan job this log entry is for. |
| `nullRowCount` | string (int64) | The number of rows with null values in the specified column. |
| `passedRowCount` | string (int64) | The number of rows which passed a rule evaluation. This field is only valid for rules of PER_ROW evaluation type. |
| `result` | string enum | The result of the data quality rule. Values: `RESULT_UNSPECIFIED`, `PASSED`, `FAILED`. |
| `ruleDimension` | string | The dimension of the data quality rule. |
| `ruleName` | string | The name of the data quality rule. |
| `ruleType` | string enum | The type of the data quality rule. Values: `RULE_TYPE_UNSPECIFIED`, `NON_NULL_EXPECTATION`, `RANGE_EXPECTATION`, `REGEX_EXPECTATION`, `ROW_CONDITION_EXPECTATION`, `SET_EXPECTATION`, `STATISTIC_RANGE_EXPECTATION`, `TABLE_CONDITION_EXPECTATION`, `UNIQUENESS_EXPECTATION`, `SQL_ASSERTION`, `TEMPLATE_REFERENCE`. |
| `thresholdPercent` | number (double) | The passing threshold (0.0, 100.0) of the data quality rule. |

### `GoogleCloudDataplexV1DataQualitySpec`

- DataQualityScan related setting.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `catalogPublishingEnabled` | boolean | Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata. |
| `enableCatalogBasedRules` | boolean | Optional. If enabled, the data scan will retrieve rules defined in the dataplex-types.global.data-rules aspect on all paths of the catalog entry corresponding to the BigQuery table resource and all attached glossary terms. The path that data-rules aspect is attached on the table entry defines the column that the rule will be evaluated against. For glossary terms, the path that the terms are attached on the table entry defines the column that the rule will be evaluated against. At the start of scan execution, the rules reflect the latest state retrieved from the catalog entry and any updates on the rules thereafter are ignored for that execution. The updates will be reflected from the next execution. Rules defined in the datascan must be empty if this field is enabled. |
| `filter` | string | Optional. Filter for selectively running a subset of rules. You can filter the request by the name or attribute key-value pairs defined on the rule. If not specified, all rules are run. The filter is applicable to both, the rules retrieved from catalog and explicitly defined rules in the scan. Please see filter syntax (https://docs.cloud.google.com/dataplex/docs/auto-data-quality-overview#rule-filtering) for more details. |
| `postScanActions` | GoogleCloudDataplexV1DataQualitySpecPostScanActions | Optional. Actions to take upon job completion. |
| `rowFilter` | string | Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#where_clause).Example: col1 >= 0 AND col2 < 10 |
| `rules` | array<GoogleCloudDataplexV1DataQualityRule> | Required. The list of rules to evaluate against a data source. At least one rule is required. |
| `samplingPercent` | number (float) | Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100. |

### `GoogleCloudDataplexV1DataQualitySpecPostScanActions`

- The configuration of post scan actions of DataQualityScan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryExport` | GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport | Optional. If set, results will be exported to the provided BigQuery table. |
| `notificationReport` | GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport | Optional. If set, results will be sent to the provided notification receipts upon triggers. |

### `GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport`

- The configuration of BigQuery export post scan action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resultsTable` | string | Optional. The BigQuery table to export DataQualityScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID or projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID |

### `GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger`

- This trigger is triggered whenever a scan job run ends, regardless of the result.
- Version: v1

### `GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger`

- This trigger is triggered when the scan job itself fails, regardless of the result.
- Version: v1

### `GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport`

- The configuration of notification report post scan action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobEndTrigger` | GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger | Optional. If set, report will be sent when a scan job ends. |
| `jobFailureTrigger` | GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger | Optional. If set, report will be sent when a scan job fails. |
| `recipients` | GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients | Required. The recipients who will receive the notification report. |
| `scoreThresholdTrigger` | GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger | Optional. If set, report will be sent when score threshold is met. |

### `GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients`

- The individuals or groups who are designated to receive notifications upon triggers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `emails` | array<string> | Optional. The email recipients who will receive the DataQualityScan results report. |

### `GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger`

- This trigger is triggered when the DQ score in the job result is less than a specified input score.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scoreThreshold` | number (float) | Optional. The score range is in 0,100. |

### `GoogleCloudDataplexV1DataScan`

- Represents a user-visible job which provides the insights for the related data source.For example: Data quality: generates queries based on the rules and runs against the data to get data quality check results. For more information, see Auto data quality overview (https://cloud.google.com/dataplex/docs/auto-data-quality-overview). Data profile: analyzes the data in tables and generates insights about the structure, content and relationships (such as null percent, cardinality, min/max/mean, etc). For more information, see About data profiling (https://cloud.google.com/dataplex/docs/data-profiling-overview). Data discovery: scans data in Cloud Storage buckets to extract and then catalog metadata. For more information, see Discover and catalog Cloud Storage data (https://cloud.google.com/bigquery/docs/automatic-discovery). Data documentation: analyzes the table or dataset metadata and generates insights. For tables, insights include descriptions and sample SQL queries. For datasets, insights include descriptions, schema relationships and sample SQL queries. For more information, see Generate data insights in BigQuery (https://cloud.google.com/bigquery/docs/data-insights).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the scan was created. |
| `data` | GoogleCloudDataplexV1DataSource | Required. The data source for DataScan. |
| `dataDiscoveryResult` | GoogleCloudDataplexV1DataDiscoveryResult | Output only. The result of a data discovery scan. |
| `dataDiscoverySpec` | GoogleCloudDataplexV1DataDiscoverySpec | Settings for a data discovery scan. |
| `dataDocumentationResult` | GoogleCloudDataplexV1DataDocumentationResult | Output only. The result of a data documentation scan. |
| `dataDocumentationSpec` | GoogleCloudDataplexV1DataDocumentationSpec | Settings for a data documentation scan. |
| `dataProfileResult` | GoogleCloudDataplexV1DataProfileResult | Output only. The result of a data profile scan. |
| `dataProfileSpec` | GoogleCloudDataplexV1DataProfileSpec | Settings for a data profile scan. |
| `dataQualityResult` | GoogleCloudDataplexV1DataQualityResult | Output only. The result of a data quality scan. |
| `dataQualitySpec` | GoogleCloudDataplexV1DataQualitySpec | Settings for a data quality scan. |
| `description` | string | Optional. Description of the scan. Must be between 1-1024 characters. |
| `displayName` | string | Optional. User friendly display name. Must be between 1-256 characters. |
| `executionIdentity` | GoogleCloudDataplexV1ExecutionIdentity | Optional. Immutable. The identity to run the datascan. If not specified, defaults to the Dataplex Service Agent. |
| `executionSpec` | GoogleCloudDataplexV1DataScanExecutionSpec | Optional. DataScan execution settings.If not specified, the fields in it will use their default values. |
| `executionStatus` | GoogleCloudDataplexV1DataScanExecutionStatus | Output only. Status of the data scan execution. |
| `labels` | object | Optional. User-defined labels for the scan. |
| `name` | string | Output only. Identifier. The relative resource name of the scan, of the form: projects/{project}/locations/{location_id}/dataScans/{datascan_id}, where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `state` | string enum | Output only. Current state of the DataScan. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CREATING`, `DELETING`, `ACTION_REQUIRED`. |
| `type` | string enum | Output only. The type of DataScan. Values: `DATA_SCAN_TYPE_UNSPECIFIED`, `DATA_QUALITY`, `DATA_PROFILE`, `DATA_DISCOVERY`, `DATA_DOCUMENTATION`. |
| `uid` | string | Output only. System generated globally unique ID for the scan. This ID will be different if the scan is deleted and re-created with the same name. |
| `updateTime` | string (google-datetime) | Output only. The time when the scan was last updated. |

### `GoogleCloudDataplexV1DataScanCatalogPublishingStatus`

- The status of publishing the data scan result as Dataplex Universal Catalog metadata. Multiple DataScan log events may exist, each with different publishing information depending on the type of publishing triggered.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Output only. Execution state for publishing. Values: `STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `SKIPPED`. |

### `GoogleCloudDataplexV1DataScanEvent`

- These messages contain information about the execution of a datascan. The monitored resource is 'DataScan'
- Version: v1

| Field | Type | Description |
|---|---|---|
| `catalogPublishingStatus` | GoogleCloudDataplexV1DataScanCatalogPublishingStatus | The status of publishing the data scan as Dataplex Universal Catalog metadata. |
| `createTime` | string (google-datetime) | The time when the data scan job was created. |
| `dataDocumentation` | GoogleCloudDataplexV1DataScanEventDataDocumentationResult | Data documentation result for data documentation (insights) scan. |
| `dataProfile` | GoogleCloudDataplexV1DataScanEventDataProfileResult | Data profile result for data profile type data scan. |
| `dataProfileConfigs` | GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs | Applied configs for data profile type data scan. |
| `dataQuality` | GoogleCloudDataplexV1DataScanEventDataQualityResult | Data quality result for data quality type data scan. |
| `dataQualityConfigs` | GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs | Applied configs for data quality type data scan. |
| `dataSource` | string | The data source of the data scan |
| `endTime` | string (google-datetime) | The time when the data scan job finished. |
| `jobId` | string | The identifier of the specific data scan job this log entry is for. |
| `message` | string | The message describing the data scan job event. |
| `postScanActionsResult` | GoogleCloudDataplexV1DataScanEventPostScanActionsResult | The result of post scan actions. |
| `scope` | string enum | The scope of the data scan (e.g. full, incremental). Values: `SCOPE_UNSPECIFIED`, `FULL`, `INCREMENTAL`. |
| `specVersion` | string | A version identifier of the spec which was used to execute this job. |
| `startTime` | string (google-datetime) | The time when the data scan job started to run. |
| `state` | string enum | The status of the data scan job. Values: `STATE_UNSPECIFIED`, `STARTED`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `CREATED`. |
| `trigger` | string enum | The trigger type of the data scan job. Values: `TRIGGER_UNSPECIFIED`, `ON_DEMAND`, `SCHEDULE`, `ONE_TIME`. |
| `type` | string enum | The type of the data scan. Values: `SCAN_TYPE_UNSPECIFIED`, `DATA_PROFILE`, `DATA_QUALITY`, `DATA_DISCOVERY`. |

### `GoogleCloudDataplexV1DataScanEventDataDocumentationResult`

- Data documentation result for data scan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billableTokenUsage` | GoogleCloudDataplexV1DataScanEventDataDocumentationResultTokenUsage | Breakdown of token consumption for the data documentation scan. |

### `GoogleCloudDataplexV1DataScanEventDataDocumentationResultTokenUsage`

- Captures structured token usage breakdown for LLM-powered scans.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cachedContentTokenCount` | string (int64) | Billable cached content tokens (billed at discounted prompt caching SKU). |
| `candidatesTokenCount` | string (int64) | Generated candidate response tokens. |
| `inputTokenCount` | string (int64) | Billable non-cached input tokens. |
| `outputTokenCount` | string (int64) | Billable output tokens (candidates + thoughts). |
| `promptTokenCount` | string (int64) | Base prompt and system instructions tokens. |
| `thoughtsTokenCount` | string (int64) | Reasoning / Chain-of-Thought tokens. |
| `toolUsePromptTokenCount` | string (int64) | Tool use context tokens (schema, profile, query history). |
| `totalTokenCount` | string (int64) | Total billable tokens (billable_input + billable_cached + billable_output). Evaluates to 0 for failed or cancelled jobs. |

### `GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs`

- Applied configs for data profile type data scan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnFilterApplied` | boolean | Boolean indicating whether a column filter was applied in the DataScan job. |
| `rowFilterApplied` | boolean | Boolean indicating whether a row filter was applied in the DataScan job. |
| `samplingPercent` | number (float) | The percentage of the records selected from the dataset for DataScan. Value ranges between 0.0 and 100.0. Value 0.0 or 100.0 imply that sampling was not applied. |

### `GoogleCloudDataplexV1DataScanEventDataProfileResult`

- Data profile result for data scan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dcuConsumed` | number (double) | Dataplex Compute Units (DCUs) used in the data scan job. |
| `rowCount` | string (int64) | The count of rows processed in the data scan job. |

### `GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs`

- Applied configs for data quality type data scan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rowFilterApplied` | boolean | Boolean indicating whether a row filter was applied in the DataScan job. |
| `samplingPercent` | number (float) | The percentage of the records selected from the dataset for DataScan. Value ranges between 0.0 and 100.0. Value 0.0 or 100.0 imply that sampling was not applied. |

### `GoogleCloudDataplexV1DataScanEventDataQualityResult`

- Data quality result for data scan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnScore` | object | The score of each column scanned in the data scan job. The key of the map is the name of the column. The value is the data quality score for the column.The score ranges between 0, 100 (up to two decimal points). |
| `dimensionPassed` | object | The result of each dimension for data quality result. The key of the map is the name of the dimension. The value is the bool value depicting whether the dimension result was pass or not. |
| `dimensionScore` | object | The score of each dimension for data quality result. The key of the map is the name of the dimension. The value is the data quality score for the dimension.The score ranges between 0, 100 (up to two decimal points). |
| `passed` | boolean | Whether the data quality result was pass or not. |
| `rowCount` | string (int64) | The count of rows processed in the data scan job. |
| `score` | number (float) | The table-level data quality score for the data scan job.The data quality score ranges between 0, 100 (up to two decimal points). |

### `GoogleCloudDataplexV1DataScanEventPostScanActionsResult`

- Post scan actions result for data scan job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigqueryExportResult` | GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult | The result of BigQuery export post scan action. |

### `GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult`

- The result of BigQuery export post scan action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Additional information about the BigQuery exporting. |
| `state` | string enum | Execution state for the BigQuery exporting. Values: `STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `SKIPPED`. |

### `GoogleCloudDataplexV1DataScanExecutionSpec`

- DataScan execution settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | string | Immutable. The unnested field (of type Date or Timestamp) that contains values which monotonically increase over time.If not specified, a data scan will run for all data in the table. |
| `trigger` | GoogleCloudDataplexV1Trigger | Optional. Spec related to how often and when a scan should be triggered.If not specified, the default is OnDemand, which means the scan will not run until the user calls RunDataScan API. |

### Shape of `GoogleCloudDataplexV1Action`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "asset": "string",
  "category": "string enum",
  "dataLocations": "array<string>",
  "detectTime": "string (google-datetime)",
  "failedSecurityPolicyApply": "GoogleCloudDataplexV1ActionFailedSecurityPolicyApply",
  "incompatibleDataSchema": "GoogleCloudDataplexV1ActionIncompatibleDataSchema",
  "invalidDataFormat": "GoogleCloudDataplexV1ActionInvalidDataFormat",
  "invalidDataOrganization": "GoogleCloudDataplexV1ActionInvalidDataOrganization",
  "invalidDataPartition": "GoogleCloudDataplexV1ActionInvalidDataPartition",
  "issue": "string",
  "lake": "string",
  "missingData": "GoogleCloudDataplexV1ActionMissingData",
  "missingResource": "GoogleCloudDataplexV1ActionMissingResource",
  "name": "string",
  "unauthorizedResource": "GoogleCloudDataplexV1ActionUnauthorizedResource",
  "zone": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `dataplex` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://dataplex.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
