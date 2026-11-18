---
source: https://firestore.googleapis.com/$discovery/rest?version=v1
---

# Cloud Firestore API REST API (firestore)

## Signature / Usage

Base URL: `https://firestore.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `firestore.projects.databases.backupSchedules.create`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+parent}/backupSchedules`
- Creates a backup schedule on a database. At most two backup schedules can be configured on a database, one daily backup schedule and one weekly backup schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1BackupSchedule`; Response: `GoogleFirestoreAdminV1BackupSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent database. Format `projects/{project}/databases/{database}` |

### `firestore.projects.databases.backupSchedules.delete`

- Versions: v1
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a backup schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the backup schedule. Format `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` |

### `firestore.projects.databases.backupSchedules.get`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets information about a backup schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1BackupSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the backup schedule. Format `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` |

### `firestore.projects.databases.backupSchedules.list`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+parent}/backupSchedules`
- List backup schedules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ListBackupSchedulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent database. Format is `projects/{project}/databases/{database}`. |

### `firestore.projects.databases.backupSchedules.patch`

- Versions: v1
- `PATCH https://firestore.googleapis.com/v1/{+name}`
- Updates a backup schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1BackupSchedule`; Response: `GoogleFirestoreAdminV1BackupSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The unique backup schedule identifier across all locations and databases for the given project. This will be auto-assigned. Format is `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |

### `firestore.projects.databases.bulkDeleteDocuments`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+name}:bulkDeleteDocuments`
- Bulk deletes a subset of documents from Google Cloud Firestore. Documents created or updated after the underlying system starts to process the request will not be deleted. The bulk delete occurs in the background and its progress can be monitored and managed via the Operation resource that is created. For more details on bulk delete behavior, refer to: https://cloud.google.com/firestore/docs/manage-data/bulk-delete
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1BulkDeleteDocumentsRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Database to operate. Should be of the form: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.changeStreams.create`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+parent}/changeStreams`
- Creates a new change stream for the database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1ChangeStream`; Response: `GoogleFirestoreAdminV1ChangeStream`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent database to create the change stream for. Format is `projects/{project}/databases/{database}`. |
| `changeStreamId` | query | string | yes | Required. The ID to use for the change stream, which will become the final component of the change stream's resource name. This value should be 4-63 characters. Valid characters are lowercase letters, numbers, and hyphens. The first character must be a letter, and the last character must be a letter or a number. |

### `firestore.projects.databases.changeStreams.delete`

- Versions: v1
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a change stream.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the change stream to delete. Format is `projects/{project}/databases/{database}/changeStreams/{change_stream}`. |
| `etag` | query | string | no | Optional. The etag of the change stream to delete. If this is not the current etag of the change stream, the deletion will fail. |

### `firestore.projects.databases.changeStreams.get`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets information about a change stream.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ChangeStream`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the change stream to retrieve. Format is `projects/{project}/databases/{database}/changeStreams/{change_stream}`. |

### `firestore.projects.databases.changeStreams.list`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+parent}/changeStreams`
- Lists all change streams in a database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ListChangeStreamsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent database to list change streams from. Format is `projects/{project}/databases/{database}`. |

### `firestore.projects.databases.clone`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+parent}/databases:clone`
- Creates a new database by cloning an existing one. The new database must be in the same cloud region or multi-region location as the existing database. This behaves similar to FirestoreAdmin.CreateDatabase except instead of creating a new empty database, a new database is created with the database type, index configuration, and documents from an existing database. The long-running operation can be used to track the progress of the clone, with the Operation's metadata field type being the CloneDatabaseMetadata. The response type is the Database if the clone was successful. The new database is not readable or writeable until the LRO has completed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1CloneDatabaseRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project to clone the database in. Format is `projects/{project_id}`. |

### `firestore.projects.databases.collectionGroups.fields.get`

- Versions: v1, v1beta2
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets the metadata and configuration for a Field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1Field`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_id}` |

### `firestore.projects.databases.collectionGroups.fields.list`

- Versions: v1, v1beta2
- `GET https://firestore.googleapis.com/v1/{+parent}/fields`
- Lists the field configuration and metadata for this database. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with the filter set to `indexConfig.usesAncestorConfig:false` or `ttlConfig:*`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ListFieldsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` |
| `filter` | query | string | no | The filter to apply to list results. Currently, FirestoreAdmin.ListFields only supports listing fields that have been explicitly overridden. To issue this query, call FirestoreAdmin.ListFields with a filter that includes `indexConfig.usesAncestorConfig:false` or `ttlConfig:*`. |
| `pageSize` | query | integer (int32) | no | The number of results to return. |
| `pageToken` | query | string | no | A page token, returned from a previous call to FirestoreAdmin.ListFields, that may be used to get the next page of results. |

### `firestore.projects.databases.collectionGroups.fields.patch`

- Versions: v1, v1beta2
- `PATCH https://firestore.googleapis.com/v1/{+name}`
- Updates a field configuration. Currently, field updates apply only to single field index configuration. However, calls to FirestoreAdmin.UpdateField should provide a field mask to avoid changing any configuration that the caller isn't aware of. The field mask should be specified as: `{ paths: "index_config" }`. This call returns a google.longrunning.Operation which may be used to track the status of the field update. The metadata for the operation will be the type FieldOperationMetadata. To configure the default field settings for the database, use the special `Field` with resource name: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1Field`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value` , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `\*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration. |
| `updateMask` | query | string (google-fieldmask) | no | A mask, relative to the field. If specified, only configuration specified by this field_mask will be updated in the field. |

### `firestore.projects.databases.collectionGroups.indexes.create`

- Versions: v1, v1beta2
- `POST https://firestore.googleapis.com/v1/{+parent}/indexes`
- Creates a composite index. This returns a google.longrunning.Operation which may be used to track the status of the creation. The metadata for the operation will be the type IndexOperationMetadata.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1Index`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` |

### `firestore.projects.databases.collectionGroups.indexes.delete`

- Versions: v1, v1beta2
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a composite index.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` |

### `firestore.projects.databases.collectionGroups.indexes.get`

- Versions: v1, v1beta2
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets a composite index.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1Index`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` |

### `firestore.projects.databases.collectionGroups.indexes.list`

- Versions: v1, v1beta2
- `GET https://firestore.googleapis.com/v1/{+parent}/indexes`
- Lists composite indexes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ListIndexesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}` |
| `filter` | query | string | no | The filter to apply to list results. |
| `pageSize` | query | integer (int32) | no | The number of results to return. |
| `pageToken` | query | string | no | A page token, returned from a previous call to FirestoreAdmin.ListIndexes, that may be used to get the next page of results. |

### `firestore.projects.databases.create`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+parent}/databases`
- Create a database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1Database`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A parent name of the form `projects/{project_id}` |
| `databaseId` | query | string | yes | Required. The ID to use for the database, which will become the final component of the database's resource name. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /\[0-9a-f\]{8}(-\[0-9a-f\]{4}){3}-\[0-9a-f\]{12}/. "(default)" database ID is also valid if the database is Standard edition. |

### `firestore.projects.databases.delete`

- Versions: v1
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}` |
| `etag` | query | string | no | The current etag of the Database. If an etag is provided and does not match the current etag of the database, deletion will be blocked and a FAILED_PRECONDITION error will be returned. |

### `firestore.projects.databases.documents.batchGet`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:batchGet`
- Gets multiple documents. Documents returned by this method are not guaranteed to be returned in the same order that they were requested.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `BatchGetDocumentsRequest`; Response: `BatchGetDocumentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.documents.batchWrite`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:batchWrite`
- Applies a batch of write operations. The BatchWrite method does not apply the write operations atomically and can apply them out of order. Method does not allow more than one write per document. Each write succeeds or fails independently. See the BatchWriteResponse for the success status of each write. If you require an atomically applied set of writes, use Commit instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `BatchWriteRequest`; Response: `BatchWriteResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.documents.beginTransaction`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:beginTransaction`
- Starts a new transaction.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `BeginTransactionRequest`; Response: `BeginTransactionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.documents.commit`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:commit`
- Commits a transaction, while optionally updating documents.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `CommitRequest`; Response: `CommitResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.documents.createDocument`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+parent}/{collectionId}`
- Creates a new document.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `Document`; Response: `Document`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource. For example: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}` |
| `collectionId` | path | string | yes | Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`. |
| `documentId` | query | string | no | The client-assigned document ID to use for this document. Optional. If not specified, an ID will be assigned by the service. |
| `mask.fieldPaths` | query | repeated string | no | The list of field paths in the mask. See Document.fields for a field path syntax reference. |
| `requestOptions.requestTags` | query | repeated string | no | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |

### `firestore.projects.databases.documents.delete`

- Versions: v1, v1beta1
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a document.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Document to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. |
| `currentDocument.exists` | query | boolean | no | When set to `true`, the target document must exist. When set to `false`, the target document must not exist. |
| `currentDocument.updateTime` | query | string (google-datetime) | no | When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. |
| `requestOptions.requestTags` | query | repeated string | no | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |

### `firestore.projects.databases.documents.executePipeline`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:executePipeline`
- Executes a pipeline query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `ExecutePipelineRequest`; Response: `ExecutePipelineResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. Database identifier, in the form `projects/{project}/databases/{database}`. |

### `firestore.projects.databases.documents.get`

- Versions: v1, v1beta1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets a single document.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Document`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Document to get. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. |
| `mask.fieldPaths` | query | repeated string | no | The list of field paths in the mask. See Document.fields for a field path syntax reference. |
| `readTime` | query | string (google-datetime) | no | Reads the version of the document at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `requestOptions.requestTags` | query | repeated string | no | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |
| `transaction` | query | string (byte) | no | Reads the document in a transaction. |

### `firestore.projects.databases.documents.list`

- Versions: v1, v1beta1
- `GET https://firestore.googleapis.com/v1/{+parent}/{collectionId}`
- Lists documents.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `ListDocumentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` |
| `collectionId` | path | string | yes | Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`. |
| `mask.fieldPaths` | query | repeated string | no | The list of field paths in the mask. See Document.fields for a field path syntax reference. |
| `orderBy` | query | string | no | Optional. The optional ordering of the documents to return. For example: `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in Firestore queries but in a string representation. When absent, documents are ordered based on `__name__ ASC`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of documents to return in a single response. Firestore may return fewer than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListDocuments` response. Provide this to retrieve the subsequent page. When paginating, all other parameters (with the exception of `page_size`) must match the values set in the request that generated the page token. |
| `readTime` | query | string (google-datetime) | no | Perform the read at the provided time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `recursive` | query | boolean | no | Optional. If the list should recursively include all documents nested under the parent at any level. If the request specifies a `collection_id`, then the list will include all nested documents in the collection under the parent. This is optional, and when not provided, Firestore will only list documents nested immediately under the parent. Requests with `recursive` may not specify `show_missing`. |
| `requestOptions.requestTags` | query | repeated string | no | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |
| `showMissing` | query | boolean | no | If the list should show missing documents. A document is missing if it does not exist, but there are sub-documents nested underneath it. When true, such missing documents will be returned with a key but will not have fields, `create_time`, or `update_time` set. Requests with `show_missing` may not specify `where` or `order_by`. |
| `transaction` | query | string (byte) | no | Perform the read as part of an already active transaction. |

### `firestore.projects.databases.documents.listCollectionIds`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+parent}:listCollectionIds`
- Lists all the collection IDs underneath a document.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `ListCollectionIdsRequest`; Response: `ListCollectionIdsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent document. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` Use `projects/{project_id}/databases/{database_id}/documents` to list top-level collections. |

### `firestore.projects.databases.documents.listDocuments`

- Versions: v1, v1beta1
- `GET https://firestore.googleapis.com/v1/{+parent}/{collectionId}`
- Lists documents.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `ListDocumentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` |
| `collectionId` | path | string | yes | Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`. |
| `mask.fieldPaths` | query | repeated string | no | The list of field paths in the mask. See Document.fields for a field path syntax reference. |
| `orderBy` | query | string | no | Optional. The optional ordering of the documents to return. For example: `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in Firestore queries but in a string representation. When absent, documents are ordered based on `__name__ ASC`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of documents to return in a single response. Firestore may return fewer than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListDocuments` response. Provide this to retrieve the subsequent page. When paginating, all other parameters (with the exception of `page_size`) must match the values set in the request that generated the page token. |
| `readTime` | query | string (google-datetime) | no | Perform the read at the provided time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `recursive` | query | boolean | no | Optional. If the list should recursively include all documents nested under the parent at any level. If the request specifies a `collection_id`, then the list will include all nested documents in the collection under the parent. This is optional, and when not provided, Firestore will only list documents nested immediately under the parent. Requests with `recursive` may not specify `show_missing`. |
| `requestOptions.requestTags` | query | repeated string | no | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |
| `showMissing` | query | boolean | no | If the list should show missing documents. A document is missing if it does not exist, but there are sub-documents nested underneath it. When true, such missing documents will be returned with a key but will not have fields, `create_time`, or `update_time` set. Requests with `show_missing` may not specify `where` or `order_by`. |
| `transaction` | query | string (byte) | no | Perform the read as part of an already active transaction. |

### `firestore.projects.databases.documents.listen`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:listen`
- Listens to changes. This method is only available via gRPC or WebChannel (not REST).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `ListenRequest`; Response: `ListenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.documents.partitionQuery`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+parent}:partitionQuery`
- Partitions a query by returning partition cursors that can be used to run the query in parallel. The returned partition cursors are split points that can be used by RunQuery as starting/end points for the query results.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `PartitionQueryRequest`; Response: `PartitionQueryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents`. Document resource names are not supported; only database resource names can be specified. |

### `firestore.projects.databases.documents.patch`

- Versions: v1, v1beta1
- `PATCH https://firestore.googleapis.com/v1/{+name}`
- Updates or inserts a document.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `Document`; Response: `Document`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`. |
| `currentDocument.exists` | query | boolean | no | When set to `true`, the target document must exist. When set to `false`, the target document must not exist. |
| `currentDocument.updateTime` | query | string (google-datetime) | no | When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. |
| `mask.fieldPaths` | query | repeated string | no | The list of field paths in the mask. See Document.fields for a field path syntax reference. |
| `requestOptions.requestTags` | query | repeated string | no | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |
| `updateMask.fieldPaths` | query | repeated string | no | The list of field paths in the mask. See Document.fields for a field path syntax reference. |

### `firestore.projects.databases.documents.rollback`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:rollback`
- Rolls back a transaction.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `RollbackRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.documents.runAggregationQuery`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+parent}:runAggregationQuery`
- Runs an aggregation query. Rather than producing Document results like Firestore.RunQuery, this API allows running an aggregation to produce a series of AggregationResult server-side. High-Level Example: -- Return the number of documents in table given a filter. SELECT COUNT(\*) FROM ( SELECT \* FROM k where a = true );
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `RunAggregationQueryRequest`; Response: `RunAggregationQueryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` |

### `firestore.projects.databases.documents.runQuery`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+parent}:runQuery`
- Runs a query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `RunQueryRequest`; Response: `RunQueryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` |

### `firestore.projects.databases.documents.write`

- Versions: v1, v1beta1
- `POST https://firestore.googleapis.com/v1/{+database}/documents:write`
- Streams batches of document updates and deletes, in order. This method is only available via gRPC or WebChannel (not REST).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `WriteRequest`; Response: `WriteResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `database` | path | string | yes | Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. This is only required in the first message. |

### `firestore.projects.databases.exportDocuments`

- Versions: v1, v1beta2, v1beta1
- `POST https://firestore.googleapis.com/v1/{+name}:exportDocuments`
- Exports a copy of all or a subset of documents from Google Cloud Firestore to another storage system, such as Google Cloud Storage. Recent updates to documents may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage. For more details on export behavior and output format, refer to: https://cloud.google.com/firestore/docs/manage-data/export-import
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1ExportDocumentsRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Database to export. Should be of the form: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.get`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets information about a database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1Database`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}` |

### `firestore.projects.databases.importDocuments`

- Versions: v1, v1beta2, v1beta1
- `POST https://firestore.googleapis.com/v1/{+name}:importDocuments`
- Imports documents into Google Cloud Firestore. Existing documents with the same name are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportDocuments operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Firestore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1ImportDocumentsRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Database to import into. Should be of the form: `projects/{project_id}/databases/{database_id}`. |

### `firestore.projects.databases.indexes.create`

- Versions: v1beta1
- `POST https://firestore.googleapis.com/v1beta1/{+parent}/indexes`
- Creates the specified index. A newly created index's initial state is `CREATING`. On completion of the returned google.longrunning.Operation, the state will be `READY`. If the index already exists, the call will return an `ALREADY_EXISTS` status. During creation, the process could result in an error, in which case the index will move to the `ERROR` state. The process can be recovered by fixing the data that caused the error, removing the index with delete, then re-creating the index with create. Indexes with a single field cannot be created.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1beta1Index`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the database this index will apply to. For example: `projects/{project_id}/databases/{database_id}` |

### `firestore.projects.databases.indexes.delete`

- Versions: v1beta1
- `DELETE https://firestore.googleapis.com/v1beta1/{+name}`
- Deletes an index.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The index name. For example: `projects/{project_id}/databases/{database_id}/indexes/{index_id}` |

### `firestore.projects.databases.indexes.get`

- Versions: v1beta1
- `GET https://firestore.googleapis.com/v1beta1/{+name}`
- Gets an index.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1beta1Index`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the index. For example: `projects/{project_id}/databases/{database_id}/indexes/{index_id}` |

### `firestore.projects.databases.indexes.list`

- Versions: v1beta1
- `GET https://firestore.googleapis.com/v1beta1/{+parent}/indexes`
- Lists the indexes that match the specified filters.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1beta1ListIndexesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The database name. For example: `projects/{project_id}/databases/{database_id}` |
| `filter` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | The standard List page size. |
| `pageToken` | query | string | no | The standard List page token. |

### `firestore.projects.databases.list`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+parent}/databases`
- List all the databases in the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ListDatabasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A parent name of the form `projects/{project_id}` |
| `showDeleted` | query | boolean | no | If true, also returns deleted resources. |

### `firestore.projects.databases.operations.cancel`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `firestore.projects.databases.operations.delete`

- Versions: v1
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `firestore.projects.databases.operations.get`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `firestore.projects.databases.operations.list`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `firestore.projects.databases.patch`

- Versions: v1
- `PATCH https://firestore.googleapis.com/v1/{+name}`
- Updates a database.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1Database`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the Database. Format: `projects/{project}/databases/{database}` |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |

### `firestore.projects.databases.restore`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+parent}/databases:restore`
- Creates a new database by restoring from an existing backup. The new database must be in the same cloud region or multi-region location as the existing backup. This behaves similar to FirestoreAdmin.CreateDatabase except instead of creating a new empty database, a new database is created with the database type, index configuration, and documents from an existing backup. The long-running operation can be used to track the progress of the restore, with the Operation's metadata field type being the RestoreDatabaseMetadata. The response type is the Database if the restore was successful. The new database is not readable or writeable until the LRO has completed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1RestoreDatabaseRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project to restore the database in. Format is `projects/{project_id}`. |

### `firestore.projects.databases.userCreds.create`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+parent}/userCreds`
- Create a user creds.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1UserCreds`; Response: `GoogleFirestoreAdminV1UserCreds`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A parent name of the form `projects/{project_id}/databases/{database_id}` |
| `userCredsId` | query | string | yes | Required. The ID to use for the user creds, which will become the final component of the user creds's resource name. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /\[0-9a-f\]{8}(-\[0-9a-f\]{4}){3}-\[0-9a-f\]{12}/. |

### `firestore.projects.databases.userCreds.delete`

- Versions: v1
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a user creds.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` |

### `firestore.projects.databases.userCreds.disable`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+name}:disable`
- Disables a user creds. No-op if the user creds are already disabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1DisableUserCredsRequest`; Response: `GoogleFirestoreAdminV1UserCreds`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` |

### `firestore.projects.databases.userCreds.enable`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+name}:enable`
- Enables a user creds. No-op if the user creds are already enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1EnableUserCredsRequest`; Response: `GoogleFirestoreAdminV1UserCreds`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` |

### `firestore.projects.databases.userCreds.get`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets a user creds resource. Note that the returned resource does not contain the secret value itself.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1UserCreds`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` |

### `firestore.projects.databases.userCreds.list`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+parent}/userCreds`
- List all user creds in the database. Note that the returned resource does not contain the secret value itself.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ListUserCredsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. A parent database name of the form `projects/{project_id}/databases/{database_id}` |

### `firestore.projects.databases.userCreds.resetPassword`

- Versions: v1
- `POST https://firestore.googleapis.com/v1/{+name}:resetPassword`
- Resets the password of a user creds.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleFirestoreAdminV1ResetUserPasswordRequest`; Response: `GoogleFirestoreAdminV1UserCreds`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the form `projects/{project_id}/databases/{database_id}/userCreds/{user_creds_id}` |

### `firestore.projects.locations.backups.delete`

- Versions: v1
- `DELETE https://firestore.googleapis.com/v1/{+name}`
- Deletes a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backup to delete. format is `projects/{project}/locations/{location}/backups/{backup}`. |

### `firestore.projects.locations.backups.get`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets information about a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backup to fetch. Format is `projects/{project}/locations/{location}/backups/{backup}`. |

### `firestore.projects.locations.backups.list`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+parent}/backups`
- Lists all the backups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleFirestoreAdminV1ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location to list backups from. Format is `projects/{project}/locations/{location}`. Use `{location} = '-'` to list backups from all locations for the given project. This allows listing backups from a single location or from all locations. |
| `filter` | query | string | no | An expression that filters the list of returned backups. A filter expression consists of a field name, a comparison operator, and a value for filtering. The value must be a string, a number, or a boolean. The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or `:`. Colon `:` is the contains operator. Filter rules are not case sensitive. The following fields in the Backup are eligible for filtering: \* `database_uid` (supports `=` only) |

### `firestore.projects.locations.get`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `firestore.projects.locations.list`

- Versions: v1
- `GET https://firestore.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### Example request skeleton

Generated from the Discovery entry of `firestore.projects.databases.backupSchedules.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://firestore.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `firestore` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/firestore/`; they are the `schemas` section of the Discovery documents in Source.
- Path variables described as "Optional" in the Discovery document are still required by the route shown, so they are `yes` in the Required column: `collectionId` in `firestore.projects.databases.documents.list`, `collectionId` in `firestore.projects.databases.documents.listDocuments`. The description refers to the field in the request message; the Discovery document defines no URL without that segment. Where a sibling method covers an alternative parent (another resource's method listed separately), call that method's route instead.
- Regional endpoints: the Discovery document (`firestore` v1, revision 20260928) also lists 90 endpoints of the form `https://firestore.LOCATION.rep.googleapis.com/` (Regional Endpoint) and `https://batch-firestore.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://firestore.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://firestore.africa-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the database ID character class; in google/firestore/admin/v1/firestore_admin.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/firestore/admin/v1/firestore_admin.proto) it reads "Valid characters are `/[a-z][0-9]-/`" (shown above as `/a-z-/`), that is lower-case letters, digits and hyphens, as the newer descriptions of the same field say.
- Source: https://firestore.googleapis.com/$discovery/rest?version=v1, https://firestore.googleapis.com/$discovery/rest?version=v1beta2, https://firestore.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
