---
source: https://storagebatchoperations.googleapis.com/$discovery/rest?version=v1
---

# Storage Batch Operations API message schemas (storagebatchoperations)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/storagebatchoperations/`.

### `AccessControlsUpdates`

- Represents updates to existing access-control entries on an object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `grants` | array<ObjectAccessControl> | Optional. Grants to add or update. If a grant for same entity exists, its role is updated. |
| `removeEntities` | array<string> | Optional. Entities for which all grants should be removed. An entity can't be in both `grants` and `remove_entities`. |

### `Bucket`

- Describes configuration of a single bucket and its objects to be transformed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Bucket name for the objects to be transformed. |
| `manifest` | Manifest | Specifies objects in a manifest file. |
| `prefixList` | PrefixList | Specifies objects matching a prefix set. |

### `BucketList`

- Describes list of buckets and their objects to be transformed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buckets` | array<Bucket> | Required. List of buckets and their objects to be transformed. You can specify only one bucket per job. If multiple buckets are specified, an error occurs. |

### `BucketOperation`

- BucketOperation represents a bucket-level breakdown of a Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | The bucket name of the objects to be transformed in the BucketOperation. |
| `completeTime` | string (google-datetime) | Output only. The time that the BucketOperation was completed. |
| `counters` | Counters | Output only. Information about the progress of the bucket operation. |
| `createTime` | string (google-datetime) | Output only. The time that the BucketOperation was created. |
| `deleteObject` | DeleteObject | Delete objects. |
| `errorSummaries` | array<ErrorSummary> | Output only. Summarizes errors encountered with sample error log entries. |
| `manifest` | Manifest | Specifies objects in a manifest file. |
| `name` | string | Identifier. The resource name of the BucketOperation. This is defined by the service. Format: `projects/{project_id}/locations/global/jobs/{job_id}/bucketOperations/{bucket_operation}`. |
| `prefixList` | PrefixList | Specifies objects matching a prefix set. |
| `projectSource` | ProjectSource | Specifies objects matching the object filters in a project source. |
| `putMetadata` | PutMetadata | Updates object metadata. Allows updating fixed-key and custom metadata and fixed-key metadata i.e. Cache-Control, Content-Disposition, Content-Encoding, Content-Language, Content-Type, Custom-Time. |
| `putObjectHold` | PutObjectHold | Changes object hold status. |
| `rewriteObject` | RewriteObject | Rewrite the object and updates metadata like KMS key. |
| `setObjectAcls` | SetObjectAcls | Updates object ACLs. |
| `startTime` | string (google-datetime) | Output only. The time that the BucketOperation was started. |
| `state` | string enum | Output only. State of the BucketOperation. Values: `STATE_UNSPECIFIED`, `QUEUED`, `RUNNING`, `SUCCEEDED`, `CANCELED`, `FAILED`. |
| `updateObjectCustomContext` | UpdateObjectCustomContext | Update object custom context. |

### `CancelJobRequest`

- Message for Job to Cancel
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID in case you need to retry your request. Requests with same `request_id` are ignored for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID isn't supported (00000000-0000-0000-0000-000000000000). |

### `CancelJobResponse`

- Message for response to cancel Job.
- Version: v1

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Counters`

- Describes details about the progress of the job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failedObjectCount` | string (int64) | Output only. The number of objects that failed due to user errors or service errors. |
| `objectCustomContextsCreated` | string (int64) | Output only. Number of object custom contexts created. This field is only populated for jobs with the UpdateObjectCustomContext transformation. |
| `objectCustomContextsDeleted` | string (int64) | Output only. Number of object custom contexts deleted. This field is only populated for jobs with the UpdateObjectCustomContext transformation. |
| `objectCustomContextsUpdated` | string (int64) | Output only. Number of object custom contexts updated. This counter tracks custom contexts where the key already existed, but the payload was modified. This field is only populated for jobs with the UpdateObjectCustomContext transformation. |
| `succeededObjectCount` | string (int64) | Output only. Number of objects completed. |
| `totalBytesFound` | string (int64) | Output only. Number of bytes found from source. This field is only populated for jobs with a prefix list object configuration. |
| `totalBytesTransformed` | string (int64) | Output only. The total number of bytes affected by the transformation. For example, this counts bytes deleted for `DeleteObject` operations and bytes rewritten for `RewriteObject` operations. |
| `totalObjectCount` | string (int64) | Output only. Number of objects listed. |

### `CustomContextUpdates`

- Describes a collection of updates to apply to custom contexts identified by key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keysToClear` | array<string> | Optional. Custom contexts to clear by key. A key can't be present in both `updates` and `keys_to_clear`. |
| `updates` | object | Optional. Insert or update the existing custom contexts. |

### `DeleteObject`

- Describes options to delete an object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permanentObjectDeletionEnabled` | boolean | Required. Controls deletion behavior when versioning is enabled for the object's bucket. If true, both live and noncurrent objects will be permanently deleted. Otherwise live objects in versioned buckets will become noncurrent and objects that were already noncurrent will be skipped. This setting doesn't have any impact on the Soft Delete feature. All objects deleted by this service can be be restored for the duration of the Soft Delete retention duration if enabled. If enabled and the manifest doesn't specify an object's generation, a `GetObjectMetadata` call is made to determine the live object generation. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ErrorLogEntry`

- An entry describing an error that has occurred.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorDetails` | array<string> | Optional. Output only. At most 5 error log entries are recorded for a given error code for a job. |
| `objectUri` | string | Required. Output only. Object URL. e.g. gs://my_bucket/object.txt |

### `ErrorSummary`

- A summary of errors by error code, plus a count and sample error log entries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | string enum | Required. The canonical error code. Values: `OK`, `CANCELLED`, `UNKNOWN`, `INVALID_ARGUMENT`, `DEADLINE_EXCEEDED`, `NOT_FOUND`, `ALREADY_EXISTS`, `PERMISSION_DENIED`, `UNAUTHENTICATED`, `RESOURCE_EXHAUSTED`, `FAILED_PRECONDITION`, `ABORTED`, `OUT_OF_RANGE`, `UNIMPLEMENTED`, `INTERNAL`, `UNAVAILABLE`, `DATA_LOSS`. |
| `errorCount` | string (int64) | Required. Number of errors encountered per `error_code`. |
| `errorLogEntries` | array<ErrorLogEntry> | Required. Sample error logs. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Job`

- The storage batch operations job description.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketList` | BucketList | Specifies a list of buckets and their objects to be transformed. |
| `completeTime` | string (google-datetime) | Output only. The time that the job was completed. |
| `counters` | Counters | Output only. Information about the progress of the job. |
| `createTime` | string (google-datetime) | Output only. The time that the job was created. |
| `deleteObject` | DeleteObject | Delete objects. |
| `description` | string | Optional. A user-provided description for the job. Maximum length: 1024 bytes when unicode-encoded. |
| `dryRun` | boolean | Optional. If true, the job runs in dry run mode, returning the total object count and, if the object configuration is a prefix list, the bytes found from source. No transformations are performed. |
| `errorSummaries` | array<ErrorSummary> | Output only. Summarizes errors encountered with sample error log entries. |
| `isMultiBucketJob` | boolean | Output only. If true, this job operates on multiple buckets. Multi-bucket jobs are subject to different quota limits than single-bucket jobs. |
| `loggingConfig` | LoggingConfig | Optional. Logging configuration. |
| `name` | string | Identifier. The resource name of the job. Format: `projects/{project_id}/locations/global/jobs/{job_id}`. For example: `projects/123456/locations/global/jobs/job01`. `job_id` is unique in a given project. |
| `projectSource` | ProjectSource | Specifies a project source and filters to identify objects to be transformed. |
| `putMetadata` | PutMetadata | Updates object metadata. Allows updating fixed-key and custom metadata. For example, `Cache-Control`, `Content-Disposition`, `Content-Encoding`, `Content-Language`, `Content-Type`, `Custom-Time`, and `Retention configuration`. |
| `putObjectHold` | PutObjectHold | Changes object hold status. |
| `rewriteObject` | RewriteObject | Rewrite the object and updates metadata like KMS key. |
| `scheduleTime` | string (google-datetime) | Output only. The time that the job was scheduled. |
| `setObjectAcls` | SetObjectAcls | Updates object ACLs. |
| `state` | string enum | Output only. State of the job. Values: `STATE_UNSPECIFIED`, `RUNNING`, `SUCCEEDED`, `CANCELED`, `FAILED`, `QUEUED`. |
| `updateObjectCustomContext` | UpdateObjectCustomContext | Update object custom context. |

### `ListBucketOperationsResponse`

- Message for response to listing BucketOperations
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketOperations` | array<BucketOperation> | A list of storage batch bucket operations. |
| `nextPageToken` | string | A token identifying a page of results. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListJobsResponse`

- Message for response to listing Jobs
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobs` | array<Job> | A list of storage batch jobs. |
| `nextPageToken` | string | A token identifying a page of results. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `LoggingConfig`

- Specifies the Cloud Logging behavior.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logActionStates` | array<string> | Required. States in which Action are logged.If empty, no logs are generated. Values: `LOGGABLE_ACTION_STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`. |
| `logActions` | array<string> | Required. Specifies the actions to be logged. Values: `LOGGABLE_ACTION_UNSPECIFIED`, `TRANSFORM`. |

### `Manifest`

- Describes list of objects to be transformed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `manifestLocation` | string | Required. Specify the manifest file location. The format of manifest location can be an absolute path to the object in the format of `gs://bucket_name/path/object_name`. For example, `gs://bucket_name/path/object_name.csv`. Alternatively, you can specify an absolute path with a single wildcard character in the file name, for example `gs://bucket_name/path/file_name*.csv`. If the manifest location is specified with a wildcard, objects in all manifest files matching the pattern will be acted upon. The manifest is a CSV file, uploaded to Cloud Storage, that contains one object or a list of objects that you want to process. Each row in the manifest must include the `bucket` and `name` of the object. You can optionally specify the `generation` of the object. If you don't specify the `generation`, the current version of the object is used. You can optionally include a header row with the following format: `bucket,name,generation`. For example, bucket,name,generation bucket_1,object_1,generation_1 bucket_1,object_2,generation_2 bucket_1,object_3,generation_3 Note: The manifest file must specify only objects within the bucket provided to the job. Rows referencing objects in other buckets are ignored. |

### `ObjectAccessControl`

- Represents an access control entry on an object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entity` | string | Required. The entity holding the permission, in one of the following forms: \* `allUsers` \* `allAuthenticatedUsers` |
| `role` | string | Required. The role to grant. Acceptable values are: \* `READER` - gives read access to the object. \* `OWNER` - gives owner access to the object. |

### `ObjectCustomContextPayload`

- Describes the payload of a user-defined object custom context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | string | The value of the object custom context. If set, `value` can't be an empty string because it is a required field in custom context. If unset, `value` is ignored and no changes are made to the `value` field of the custom context payload. |

### `ObjectRetention`

- Describes options for object retention update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retainUntilTime` | string | Required. The object's retention expiration time, during which, the object is protected from being deleted or overwritten. The time must be specified in RFC 3339 format, for example `YYYY-MM-DD'T'HH:MM:SS'Z'` or `YYYY-MM-DD'T'HH:MM:SS.SS'Z'`. To clear an object's retention, both `retentionMode` and `retainUntilTime` must be left unset (omitted). Setting `retentionMode` to `RETENTION_MODE_UNSPECIFIED` is treated as a no-op. Unlike an unset field, it doesn't modify or clear the retention settings. |
| `retentionMode` | string enum | Required. The retention mode. Values: `RETENTION_MODE_UNSPECIFIED`, `LOCKED`, `UNLOCKED`. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `job` | Job | Output only. The Job associated with the operation. |
| `operation` | string | Output only. The unique operation resource name. Format: projects/{project_id}/locations/global/operations/{operation}. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |

### `PrefixList`

- Describes prefixes of objects to be transformed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `includedObjectPrefixes` | array<string> | Optional. Specify one or more object prefixes. For example: \* To match one object, use a single prefix, `prefix1`. \* To match multiple objects, use comma-separated prefixes, `prefix1, prefix2`. \* To match all objects, use an empty prefix, `''` |

### `ProjectSource`

- Describes the project source where the objects satisfying the filters will be transformed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketFilters` | Expr | Optional. Filters expressed in Common Expression Language (CEL) to apply to buckets to identify buckets with objects to be transformed. |
| `dryRunJobId` | string | Optional. The unique identifier of a dry run job to use as the baseline for the current job. Specifying this ID ensures the job is executed against the same set of objects validated during the dry run. The value corresponds to the {job_id} segment of the resource name: `projects/{project_id}/locations/{location}/jobs/{job_id}`. |
| `insightsDatasetConfig` | string | Required. The resource identifier of the Storage Insights dataset configuration. Storage batch operations uses the latest snapshot from this dataset as the source to list and filter target objects. Format: `projects/{project_id}/locations/{location}/datasetConfigs/{dataset_config}`. |
| `objectFilters` | Expr | Optional. Filters expressed in Common Expression Language (CEL) to apply to objects to identify objects to be transformed. |
| `project` | string | Required. Project name of the objects to be transformed. e.g. projects/my-project or projects/123456. |
| `snapshotTime` | string (google-datetime) | Output only. The snapshot time used by the job to read the Storage Insights dataset for bucket and object discovery. This field is populated by the service and reflects the exact timestamp of the dataset snapshot used. |
| `targetLocations` | TargetLocations | Optional. Specifies the Cloud Storage locations to include in the job. If provided, only buckets and objects within these locations will be discovered from the Storage Insights dataset as configured in the `insights_dataset_config`. If omitted, the job will discover buckets and objects from all locations configured in the `insights_dataset_config`. |

### `PutMetadata`

- Describes options for object metadata update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheControl` | string | Optional. Updates the objects `Cache-Control` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. Additionally, the value for `Custom-Time` can't decrease. For details, see Cache-Control (https://cloud.google.com/storage/docs/metadata#caching_data). |
| `contentDisposition` | string | Optional. Updates objects `Content-Disposition` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see Content-Disposition (https://cloud.google.com/storage/docs/metadata#content-disposition). |
| `contentEncoding` | string | Optional. Updates the objects `Content-Encoding` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see Content-Encoding (https://cloud.google.com/storage/docs/metadata#content-encoding). |
| `contentLanguage` | string | Optional. Updates the objects `Content-Language` fixed metadata. Metadata values must use ISO 639-1 language codes. The maximum length for metadata values is 100 characters. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see Content-Language (https://cloud.google.com/storage/docs/metadata#content-language). |
| `contentType` | string | Optional. Updates objects `Content-Type` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. For details, see Content-Type (https://cloud.google.com/storage/docs/metadata#content-type). |
| `customMetadata` | object | Optional. Updates the object's custom metadata. This operation adds or sets individual custom metadata key-value pairs. Keys specified with empty values have their values cleared. Existing custom metadata keys not included in the request remain unchanged. For details, see Custom metadata (https://cloud.google.com/storage/docs/metadata#custom-metadata). |
| `customTime` | string | Optional. Updates the objects `Custom-Time` fixed metadata. Unset values in the request are ignored. To clear the metadata, set an empty value. The time must be specified in RFC 3339 format, for example `YYYY-MM-DD'T'HH:MM:SS'Z'` or `YYYY-MM-DD'T'HH:MM:SS.SS'Z'`. For details, see Custom-Time (https://cloud.google.com/storage/docs/metadata#custom-time). |
| `objectRetention` | ObjectRetention | Optional. Updates an object's retention configuration. To clear an object's retention, both `retentionMode` and `retainUntilTime` must be left unset (omitted). Setting `retentionMode` to `RETENTION_MODE_UNSPECIFIED` is treated as a no-op. Unlike an unset field, it doesn't modify or clear the retention settings. An object with `LOCKED` retention mode can't have its retention cleared or its `retainUntilTime` reduced. For more information, see Object retention (https://cloud.google.com/storage/docs/batch-operations/create-manage-batch-operation-jobs#retain-until-time). |

### `PutObjectHold`

- Describes options to update object hold.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventBasedHold` | string enum | Required. Updates object event based holds state. When object event based hold is set, object can't be deleted or replaced. Resets object's time in the bucket for the purposes of the retention period. Values: `HOLD_STATUS_UNSPECIFIED`, `SET`, `UNSET`. |
| `temporaryHold` | string enum | Required. Updates object temporary holds state. When object temporary hold is set, object can't be deleted or replaced. Values: `HOLD_STATUS_UNSPECIFIED`, `SET`, `UNSET`. |

### `ReconciliationOperationMetadata`

- Operation metadata returned by the CLH during resource state reconciliation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteResource` | boolean | DEPRECATED. Use exclusive_action instead. |
| `exclusiveAction` | string enum | Excluisive action returned by the CLH. Values: `UNKNOWN_REPAIR_ACTION`, `DELETE`, `RETRY`. |

### `RewriteObject`

- Describes options for object rewrite.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKey` | string | Optional. Resource name of the Cloud KMS key that is used to encrypt the object. The Cloud KMS key must be located in same location as the object. For details, see https://cloud.google.com/storage/docs/encryption/using-customer-managed-keys#add-object-key Format: `projects/{project_id}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}` For example: `projects/123456/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key`. The object will be rewritten and set with the specified KMS key. |
| `storageClass` | string enum | Optional. Rewrites the object to the specified storage class. Setting this field will perform a full byte copy of the object if the storage class is different from the object's current storage class. If Autoclass is enabled on the bucket, storage class changes are ignored by Cloud Storage. Values: `STORAGE_CLASS_UNSPECIFIED`, `STANDARD`, `NEARLINE`, `COLDLINE`, `ARCHIVE`. |

### `SetObjectAcls`

- Describes options for setting object ACLs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessControlsUpdates` | AccessControlsUpdates | Required. Add, update, or remove grants from the object's existing ACLs. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TargetLocations`

- Describes the Cloud Storage locations to include in a ProjectSource job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<string> | Required. REQUIRED. A list of Cloud Storage locations (e.g., `us-central1`) to include in the job. If `snapshot_time` is omitted, the job automatically defaults to the most recent snapshot timestamp that is successfully populated in BOTH the `object_attributes_view` and `bucket_attributes_view` across ALL specified locations. For details on Storage Insights dataset snapshots and views, see: https://docs.cloud.google.com/storage/docs/insights/dataset-tables-and-schemas#schema |
| `snapshotTime` | string (google-datetime) | Optional. OPTIONAL. The exact Storage Insights snapshot timestamp to use for the job compatible with the RFC 3339 format (e.g., `2024-01-02T03:04:05Z`). If specified, this exact snapshot must exist in BOTH the `object_attributes_view` and `bucket_attributes_view` for every location listed in `locations`. If the snapshot is missing from either view in any of the locations, the job fails. |

### `UpdateObjectCustomContext`

- Describes options to update object custom contexts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clearAll` | boolean | If set, must be set to true and all existing object custom contexts are deleted. |
| `customContextUpdates` | CustomContextUpdates | A collection of updates to apply to specific custom contexts. Use this to add, update or delete individual contexts by key. |

### Shape of `AccessControlsUpdates`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "grants": "array<ObjectAccessControl>",
  "removeEntities": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `storagebatchoperations` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://storagebatchoperations.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
