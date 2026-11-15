---
source: https://storagetransfer.googleapis.com/$discovery/rest?version=v1
---

# Storage Transfer API message schemas (storagetransfer)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/storagetransfer/`.

### `AgentPool`

- Represents an agent pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bandwidthLimit` | BandwidthLimit | Specifies the bandwidth limit details. If this field is unspecified, the default value is set as 'No Limit'. |
| `displayName` | string | Specifies the client-specified AgentPool description. |
| `name` | string | Required. Specifies a unique string that identifies the agent pool. Format: `projects/{project_id}/agentPools/{agent_pool_id}` |
| `state` | string enum | Output only. Specifies the state of the AgentPool. Values: `STATE_UNSPECIFIED`, `CREATING`, `CREATED`, `DELETING`. |

### `AwsAccessKey`

- AWS access key (see AWS Security Credentials (https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)). For information on our data retention policy for user credentials, see User credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessKeyId` | string | Required. AWS access key ID. |
| `secretAccessKey` | string | Required. AWS secret access key. This field is not returned in RPC responses. |

### `AwsS3CompatibleData`

- An AwsS3CompatibleData resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | Required. Specifies the name of the bucket. |
| `endpoint` | string | Required. Specifies the endpoint of the storage service. |
| `path` | string | Specifies the root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. |
| `region` | string | Specifies the region to sign requests with. This can be left blank if requests should be signed with an empty region. |
| `s3Metadata` | S3CompatibleMetadata | A S3 compatible metadata. |

### `AwsS3Data`

- An AwsS3Data resource can be a data source, but not a data sink. In an AwsS3Data resource, an object's name is the S3 object's key name.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `awsAccessKey` | AwsAccessKey | Input only. AWS access key used to sign the API requests to the AWS S3 bucket. Permissions on the bucket must be granted to the access ID of the AWS access key. For information on our data retention policy for user credentials, see User credentials. |
| `bucketName` | string | Required. S3 Bucket name (see Creating a bucket (https://docs.aws.amazon.com/AmazonS3/latest/dev/create-bucket-get-location-example.html)). |
| `cloudfrontDomain` | string | Optional. The CloudFront distribution domain name pointing to this bucket, to use when fetching. See Transfer from S3 via CloudFront (https://cloud.google.com/storage-transfer/docs/s3-cloudfront) for more information. Format: `https://{id}.cloudfront.net` or any valid custom domain. Must begin with `https://`. |
| `credentialsSecret` | string | Optional. The Resource name of a secret in Secret Manager. AWS credentials must be stored in Secret Manager in JSON format: { "access_key_id": "ACCESS_KEY_ID", "secret_access_key": "SECRET_ACCESS_KEY" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See \[Configure access to a source: Amazon S3\] (https://cloud.google.com/storage-transfer/docs/source-amazon-s3#secret_manager) for more information. If `credentials_secret` is specified, do not specify role_arn or aws_access_key. Format: `projects/{project_number}/secrets/{secret_name}` |
| `managedPrivateNetwork` | boolean | Egress bytes over a Google-managed private network. This network is shared between other users of Storage Transfer Service. |
| `path` | string | Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. |
| `privateNetworkService` | string | Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}` |
| `roleArn` | string | The Amazon Resource Name (ARN) of the role to support temporary credentials via `AssumeRoleWithWebIdentity`. For more information about ARNs, see IAM ARNs (https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns). When a role ARN is provided, Transfer Service fetches temporary credentials for the session using a `AssumeRoleWithWebIdentity` call for the provided role using the GoogleServiceAccount for this project. |

### `AzureBlobStorageData`

- An AzureBlobStorageData resource can be a data source, but not a data sink. An AzureBlobStorageData resource represents one Azure container. The storage account determines the Azure endpoint (https://docs.microsoft.com/en-us/azure/storage/common/storage-create-storage-account#storage-account-endpoints). In an AzureBlobStorageData resource, a blobs's name is the Azure Blob Storage blob's key name (https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#blob-names).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `azureCredentials` | AzureCredentials | Required. Input only. Credentials used to authenticate API requests to Azure. For information on our data retention policy for user credentials, see User credentials. |
| `container` | string | Required. The container to transfer from the Azure Storage account. |
| `credentialsSecret` | string | Optional. The Resource name of a secret in Secret Manager. The Azure SAS token must be stored in Secret Manager in JSON format: { "sas_token" : "SAS_TOKEN" } GoogleServiceAccount must be granted `roles/secretmanager.secretAccessor` for the resource. See \[Configure access to a source: Microsoft Azure Blob Storage\] (https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#secret_manager) for more information. If `credentials_secret` is specified, do not specify azure_credentials. Format: `projects/{project_number}/secrets/{secret_name}` |
| `federatedIdentityConfig` | FederatedIdentityConfig | Optional. Federated identity config of a user registered Azure application. If `federated_identity_config` is specified, do not specify azure_credentials or credentials_secret. |
| `path` | string | Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. |
| `privateNetworkService` | string | Service Directory Service to be used as the endpoint for transfers from a custom VPC. Format: `projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service}` |
| `storageAccount` | string | Required. The name of the Azure Storage account. |

### `AzureCredentials`

- Azure credentials For information on our data retention policy for user credentials, see User credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sasToken` | string | Required. Azure shared access signature (SAS). For more information about SAS, see Grant limited access to Azure Storage resources using shared access signatures (SAS) (https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview). |

### `BandwidthLimit`

- Specifies a bandwidth limit for an agent pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `limitMbps` | string (int64) | Bandwidth rate in megabytes per second, distributed across all the agents in the pool. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ErrorLogEntry`

- LINT.IfChange An entry describing an error that has occurred.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorDetails` | array<string> | Optional. A list of messages that carry the error details. |
| `url` | string | Output only. A URL that refers to the target (a data source, a data sink, or an object) with which the error is associated. |

### `ErrorSummary`

- A summary of errors by error code, plus a count and sample error log entries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | string enum | Required. Values: `OK`, `CANCELLED`, `UNKNOWN`, `INVALID_ARGUMENT`, `DEADLINE_EXCEEDED`, `NOT_FOUND`, `ALREADY_EXISTS`, `PERMISSION_DENIED`, `UNAUTHENTICATED`, `RESOURCE_EXHAUSTED`, `FAILED_PRECONDITION`, `ABORTED`, `OUT_OF_RANGE`, `UNIMPLEMENTED`, `INTERNAL`, `UNAVAILABLE`, `DATA_LOSS`. |
| `errorCount` | string (int64) | Required. Count of this type of error. |
| `errorLogEntries` | array<ErrorLogEntry> | Error samples. At most 5 error log entries are recorded for a given error code for a single transfer operation. |

### `EventStream`

- Specifies the Event-driven transfer options. Event-driven transfers listen to an event stream to transfer updated files.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventStreamExpirationTime` | string (google-datetime) | Specifies the data and time at which Storage Transfer Service stops listening for events from this stream. After this time, any transfers in progress will complete, but no new transfers are initiated. |
| `eventStreamStartTime` | string (google-datetime) | Specifies the date and time that Storage Transfer Service starts listening for events from this stream. If no start time is specified or start time is in the past, Storage Transfer Service starts listening immediately. |
| `name` | string | Required. Specifies a unique name of the resource such as AWS SQS ARN in the form 'arn:aws:sqs:region:account_id:queue_name', or Pub/Sub subscription resource name in the form 'projects/{project}/subscriptions/{sub}'. |

### `FederatedIdentityConfig`

- The identity of an Azure application through which Storage Transfer Service can authenticate requests using Azure workload identity federation. Storage Transfer Service can issue requests to Azure Storage through registered Azure applications, eliminating the need to pass credentials to Storage Transfer Service directly. To configure federated identity, see Configure access to Microsoft Azure Storage (https://cloud.google.com/storage-transfer/docs/source-microsoft-azure#option_3_authenticate_using_federated_identity).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Required. The client (application) ID of the application with federated credentials. |
| `tenantId` | string | Required. The tenant (directory) ID of the application with federated credentials. |

### `GcsData`

- In a GcsData resource, an object's name is the Cloud Storage object's name and its "last modification time" refers to the object's `updated` property of Cloud Storage objects, which changes when the content or the metadata of the object is updated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | Required. Cloud Storage bucket name. Must meet Bucket Name Requirements. |
| `managedFolderTransferEnabled` | boolean | Preview. Enables the transfer of managed folders between Cloud Storage buckets. Set this option on the gcs_data_source. If set to true: - Managed folders in the source bucket are transferred to the destination bucket. - Managed folders in the destination bucket are overwritten. Other OVERWRITE options are not supported. See Transfer Cloud Storage managed folders. |
| `path` | string | Root path to transfer objects. Must be an empty string or full path name that ends with a '/'. This field is treated as an object prefix. As such, it should generally not begin with a '/'. The root path value must meet Object Name Requirements. |

### `GoogleServiceAccount`

- Google service account
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountEmail` | string | Email address of the service account. |
| `subjectId` | string | Unique identifier for the service account. |

### `HdfsData`

- An HdfsData resource specifies a path within an HDFS entity (e.g. a cluster). All cluster-specific settings, such as namenodes and ports, are configured on the transfer agents servicing requests, so HdfsData only contains the root path to the data in our transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Root path to transfer files. |

### `HttpData`

- An HttpData resource specifies a list of objects on the web to be transferred over HTTP. The information of the objects to be transferred is contained in a file referenced by a URL. The first line in the file must be `"TsvHttpData-1.0"`, which specifies the format of the file. Subsequent lines specify the information of the list of objects, one object per list entry. Each entry has the following tab-delimited fields: \* \*\*HTTP URL\*\* — The location of the object. \* \*\*Length\*\* — The size of the object in bytes. \* \*\*MD5\*\* — The base64-encoded MD5 hash of the object. For an example of a valid TSV file, see Transferring data from URLs (https://cloud.google.com/storage-transfer/docs/create-url-list). When transferring data based on a URL list, keep the following in mind: \* When an object located at `http(s)://hostname:port/` is transferred to a data sink, the name of the object at the data sink is `/`. \* If the specified size of an object does not match the actual size of the object fetched, the object is not transferred. \* If the specified MD5 does not match the MD5 computed from the transferred bytes, the object transfer fails. \* Ensure that each URL you specify is publicly accessible. For example, in Cloud Storage you can \[share an object publicly\] (/storage/docs/cloud-console#\_sharingdata) and get a link to it. \* Storage Transfer Service obeys `robots.txt` rules and requires the source HTTP server to support `Range` requests and to return a `Content-Length` header in each response. \* ObjectConditions have no effect when filtering objects to transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `listUrl` | string | Required. The URL that points to the file that stores the object list entries. This file must allow public access. The URL is either an HTTP/HTTPS address (e.g. `https://example.com/urllist.tsv`) or a Cloud Storage path (e.g. `gs://my-bucket/urllist.tsv`). |

### `ListAgentPoolsResponse`

- Response from ListAgentPools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentPools` | array<AgentPool> | A list of agent pools. |
| `nextPageToken` | string | The list next page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListTransferJobsResponse`

- Response from ListTransferJobs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The list next page token. |
| `transferJobs` | array<TransferJob> | A list of transfer jobs. |

### `LoggingConfig`

- Specifies the logging behavior for transfer operations. Logs can be sent to Cloud Logging for all transfer types. See Read transfer logs (https://cloud.google.com/storage-transfer/docs/read-transfer-logs) for details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableOnpremGcsTransferLogs` | boolean | For PosixFilesystem transfers, enables file system transfer logs (https://cloud.google.com/storage-transfer/docs/on-prem-transfer-log-format) instead of, or in addition to, Cloud Logging. This option ignores \[LoggableAction\] and \[LoggableActionState\]. If these are set, Cloud Logging will also be enabled for this transfer. |
| `logActionStates` | array<string> | States in which `log_actions` are logged. If empty, no logs are generated. Values: `LOGGABLE_ACTION_STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `SKIPPED`. |
| `logActions` | array<string> | Specifies the actions to be logged. If empty, no logs are generated. Values: `LOGGABLE_ACTION_UNSPECIFIED`, `FIND`, `DELETE`, `COPY`. |

### `MetadataOptions`

- Specifies the metadata options for running a transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acl` | string enum | Specifies how each object's ACLs should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as ACL_DESTINATION_BUCKET_DEFAULT. Values: `ACL_UNSPECIFIED`, `ACL_DESTINATION_BUCKET_DEFAULT`, `ACL_PRESERVE`. |
| `gid` | string enum | Specifies how each file's POSIX group ID (GID) attribute should be handled by the transfer. By default, GID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. Values: `GID_UNSPECIFIED`, `GID_SKIP`, `GID_NUMBER`. |
| `kmsKey` | string enum | Specifies how each object's Cloud KMS customer-managed encryption key (CMEK) is preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as KMS_KEY_DESTINATION_BUCKET_DEFAULT. Values: `KMS_KEY_UNSPECIFIED`, `KMS_KEY_DESTINATION_BUCKET_DEFAULT`, `KMS_KEY_PRESERVE`. |
| `mode` | string enum | Specifies how each file's mode attribute should be handled by the transfer. By default, mode is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. Values: `MODE_UNSPECIFIED`, `MODE_SKIP`, `MODE_PRESERVE`. |
| `storageClass` | string enum | Specifies the storage class to set on objects being transferred to Google Cloud Storage buckets. If unspecified, the default behavior is the same as STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT. Values: `STORAGE_CLASS_UNSPECIFIED`, `STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT`, `STORAGE_CLASS_PRESERVE`, `STORAGE_CLASS_STANDARD`, `STORAGE_CLASS_NEARLINE`, `STORAGE_CLASS_COLDLINE`, `STORAGE_CLASS_ARCHIVE`. |
| `symlink` | string enum | Specifies how symlinks should be handled by the transfer. By default, symlinks are not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. Values: `SYMLINK_UNSPECIFIED`, `SYMLINK_SKIP`, `SYMLINK_PRESERVE`. |
| `temporaryHold` | string enum | Specifies how each object's temporary hold status should be preserved for transfers between Google Cloud Storage buckets. If unspecified, the default behavior is the same as TEMPORARY_HOLD_PRESERVE. Values: `TEMPORARY_HOLD_UNSPECIFIED`, `TEMPORARY_HOLD_SKIP`, `TEMPORARY_HOLD_PRESERVE`. |
| `timeCreated` | string enum | Specifies how each object's `timeCreated` metadata is preserved for transfers. If unspecified, the default behavior is the same as TIME_CREATED_SKIP. This behavior is supported for transfers to Cloud Storage buckets from Cloud Storage, Amazon S3, S3-compatible storage, and Azure sources. Values: `TIME_CREATED_UNSPECIFIED`, `TIME_CREATED_SKIP`, `TIME_CREATED_PRESERVE_AS_CUSTOM_TIME`. |
| `uid` | string enum | Specifies how each file's POSIX user ID (UID) attribute should be handled by the transfer. By default, UID is not preserved. Only applicable to transfers involving POSIX file systems, and ignored for other transfers. Values: `UID_UNSPECIFIED`, `UID_SKIP`, `UID_NUMBER`. |

### `NotificationConfig`

- Specification to configure notifications published to Pub/Sub. Notifications are published to the customer-provided topic using the following `PubsubMessage.attributes`: \* `"eventType"`: one of the EventType values \* `"payloadFormat"`: one of the PayloadFormat values \* `"projectId"`: the project_id of the `TransferOperation` \* `"transferJobName"`: the transfer_job_name of the `TransferOperation` \* `"transferOperationName"`: the name of the `TransferOperation` The `PubsubMessage.data` contains a TransferOperation resource formatted according to the specified `PayloadFormat`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventTypes` | array<string> | Event types for which a notification is desired. If empty, send notifications for all event types. Values: `EVENT_TYPE_UNSPECIFIED`, `TRANSFER_OPERATION_SUCCESS`, `TRANSFER_OPERATION_FAILED`, `TRANSFER_OPERATION_ABORTED`. |
| `payloadFormat` | string enum | Required. The desired format of the notification message payloads. Values: `PAYLOAD_FORMAT_UNSPECIFIED`, `NONE`, `JSON`. |
| `pubsubTopic` | string | Required. The `Topic.name` of the Pub/Sub topic to which to publish notifications. Must be of the format: `projects/{project}/topics/{topic}`. Not matching this format results in an INVALID_ARGUMENT error. |

### `ObjectConditions`

- Conditions that determine which objects are transferred. Applies only to Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last modification time" refers to the time of the last change to the object's content or metadata — specifically, this is the `updated` property of Cloud Storage objects, the `LastModified` field of S3 objects, and the `Last-Modified` header of Azure blobs. For S3 objects, the `LastModified` value is the time the object begins uploading. If the object meets your "last modification time" criteria, but has not finished uploading, the object is not transferred. See Transfer from Amazon S3 to Cloud Storage (https://cloud.google.com/storage-transfer/docs/create-transfers/agentless/s3#transfer_options) for more information. Transfers with a PosixFilesystem source or destination don't support `ObjectConditions`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludePrefixes` | array<string> | If you specify `exclude_prefixes`, Storage Transfer Service uses the items in the `exclude_prefixes` array to determine which objects to exclude from a transfer. Objects must not start with one of the matching `exclude_prefixes` for inclusion in a transfer. The following are requirements of `exclude_prefixes`: \* Each exclude-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. \* Each exclude-prefix must omit the leading slash. For example, to exclude the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the exclude-prefix as `logs/y=2015/requests.gz`. \* None of the exclude-prefix values can be empty, if specified. \* Each exclude-prefix must exclude a distinct portion of the object namespace. No exclude-prefix may be a prefix of another exclude-prefix. \* If include_prefixes is specified, then each exclude-prefix must start with the value of a path explicitly included by `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more information, see Filtering objects from transfers. |
| `includePrefixes` | array<string> | If you specify `include_prefixes`, Storage Transfer Service uses the items in the `include_prefixes` array to determine which objects to include in a transfer. Objects must start with one of the matching `include_prefixes` for inclusion in the transfer. If exclude_prefixes is specified, objects must not start with any of the `exclude_prefixes` specified for inclusion in the transfer. The following are requirements of `include_prefixes`: \* Each include-prefix can contain any sequence of Unicode characters, to a max length of 1024 bytes when UTF8-encoded, and must not contain Carriage Return or Line Feed characters. Wildcard matching and regular expression matching are not supported. \* Each include-prefix must omit the leading slash. For example, to include the object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as `logs/y=2015/requests.gz`. \* None of the include-prefix values can be empty, if specified. \* Each include-prefix must include a distinct portion of the object namespace. No include-prefix may be a prefix of another include-prefix. The max size of `include_prefixes` is 1000. For more information, see Filtering objects from transfers. |
| `includeStorageClasses` | array<string> | Optional. If specified, objects in the source matching any of the storage classes in this field will be transferred. Objects in storage classes not included in this field will be skipped. If empty, the default behavior regarding the storage classes is applied. This includes all storage classes except "GLACIER" as per default behavior. Currently, this field only supports S3 data source. For the list of valid Amazon S3 storage classnames, please refer to the AWS documentation: https://docs.aws.amazon.com/AmazonS3/latest/userguide/sc-howtoset.html |
| `lastModifiedBefore` | string (google-datetime) | If specified, only objects with a "last modification time" before this timestamp and objects that don't have a "last modification time" are transferred. |
| `lastModifiedSince` | string (google-datetime) | If specified, only objects with a "last modification time" on or after this timestamp and objects that don't have a "last modification time" are transferred. The `last_modified_since` and `last_modified_before` fields can be used together for chunked data processing. For example, consider a script that processes each day's worth of data at a time. For that you'd set each of the fields as follows: \* `last_modified_since` to the start of the day \* `last_modified_before` to the end of the day |
| `matchGlob` | string | Optional. If specified, only objects matching this glob are transferred. |
| `maxTimeElapsedSinceLastModification` | string (google-duration) | Ensures that objects are not transferred if a specific maximum time has elapsed since the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation`and the "last modification time" of the object is less than the value of max_time_elapsed_since_last_modification\`. Objects that do not have a "last modification time" are also transferred. |
| `minTimeElapsedSinceLastModification` | string (google-duration) | Ensures that objects are not transferred until a specific minimum time has elapsed after the "last modification time". When a TransferOperation begins, objects with a "last modification time" are transferred only if the elapsed time between the start_time of the `TransferOperation` and the "last modification time" of the object is equal to or greater than the value of min_time_elapsed_since_last_modification\`. Objects that do not have a "last modification time" are also transferred. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Represents the transfer operation object. To request a TransferOperation object, use transferOperations.get. |
| `name` | string | The server-assigned unique name. The format of `name` is `transferOperations/some/unique/name`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `PauseTransferOperationRequest`

- Request passed to PauseTransferOperation.
- Version: v1

### `PosixFilesystem`

- A POSIX filesystem resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rootDirectory` | string | Root directory path to the filesystem. |

### `ReplicationSpec`

- Specifies the configuration for a cross-bucket replication job. Cross-bucket replication copies new or updated objects from a source Cloud Storage bucket to a destination Cloud Storage bucket. Existing objects in the source bucket are not copied by a new cross-bucket replication job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsDataSink` | GcsData | The Cloud Storage bucket to which to replicate objects. |
| `gcsDataSource` | GcsData | The Cloud Storage bucket from which to replicate objects. |
| `objectConditions` | ObjectConditions | Object conditions that determine which objects are transferred. For replication jobs, only `include_prefixes` and `exclude_prefixes` are supported. |
| `transferOptions` | TransferOptions | Specifies the metadata options to be applied during replication. Delete options are not supported. If a delete option is specified, the request fails with an INVALID_ARGUMENT error. |

### `ResumeTransferOperationRequest`

- Request passed to ResumeTransferOperation.
- Version: v1

### `RunTransferJobRequest`

- Request passed to RunTransferJob.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. The ID of the Google Cloud project that owns the transfer job. |

### `S3CompatibleMetadata`

- S3CompatibleMetadata contains the metadata fields that apply to the basic types of S3-compatible data providers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authMethod` | string enum | Specifies the authentication and authorization method used by the storage service. When not specified, Transfer Service will attempt to determine right auth method to use. Values: `AUTH_METHOD_UNSPECIFIED`, `AUTH_METHOD_AWS_SIGNATURE_V4`, `AUTH_METHOD_AWS_SIGNATURE_V2`. |
| `listApi` | string enum | The Listing API to use for discovering objects. When not specified, Transfer Service will attempt to determine the right API to use. Values: `LIST_API_UNSPECIFIED`, `LIST_OBJECTS_V2`, `LIST_OBJECTS`. |
| `protocol` | string enum | Specifies the network protocol of the agent. When not specified, the default value of NetworkProtocol NETWORK_PROTOCOL_HTTPS is used. Values: `NETWORK_PROTOCOL_UNSPECIFIED`, `NETWORK_PROTOCOL_HTTPS`, `NETWORK_PROTOCOL_HTTP`. |
| `requestModel` | string enum | Specifies the API request model used to call the storage service. When not specified, the default value of RequestModel REQUEST_MODEL_VIRTUAL_HOSTED_STYLE is used. Values: `REQUEST_MODEL_UNSPECIFIED`, `REQUEST_MODEL_VIRTUAL_HOSTED_STYLE`, `REQUEST_MODEL_PATH_STYLE`. |

### `Schedule`

- Transfers can be scheduled to recur or to run just once.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTimeOfDay` | TimeOfDay | The time in UTC that no further transfer operations are scheduled. Combined with schedule_end_date, `end_time_of_day` specifies the end date and time for starting new transfer operations. This field must be greater than or equal to the timestamp corresponding to the combination of schedule_start_date and start_time_of_day, and is subject to the following: \* If `end_time_of_day` is not set and `schedule_end_date` is set, then a default value of `23:59:59` is used for `end_time_of_day`. \* If `end_time_of_day` is set and `schedule_end_date` is not set, then INVALID_ARGUMENT is returned. |
| `repeatInterval` | string (google-duration) | Interval between the start of each scheduled TransferOperation. If unspecified, the default value is 24 hours. This value may not be less than 1 hour. |
| `scheduleEndDate` | Date | The last day a transfer runs. Date boundaries are determined relative to UTC time. A job runs once per 24 hours within the following guidelines: \* If `schedule_end_date` and schedule_start_date are the same and in the future relative to UTC, the transfer is executed only one time. \* If `schedule_end_date` is later than `schedule_start_date` and `schedule_end_date` is in the future relative to UTC, the job runs each day at start_time_of_day through `schedule_end_date`. |
| `scheduleStartDate` | Date | Required. The start date of a transfer. Date boundaries are determined relative to UTC time. If `schedule_start_date` and start_time_of_day are in the past relative to the job's creation time, the transfer starts the day after you schedule the transfer request. \*\*Note:\*\* When starting jobs at or near midnight UTC it is possible that a job starts later than expected. For example, if you send an outbound request on June 1 one millisecond prior to midnight UTC and the Storage Transfer Service server receives the request on June 2, then it creates a TransferJob with `schedule_start_date` set to June 2 and a `start_time_of_day` set to midnight UTC. The first scheduled TransferOperation takes place on June 3 at midnight UTC. |
| `startTimeOfDay` | TimeOfDay | The time in UTC that a transfer job is scheduled to run. Transfers may start later than this time. If `start_time_of_day` is not specified: \* One-time transfers run immediately. \* Recurring transfers run immediately, and each day at midnight UTC, through schedule_end_date. If `start_time_of_day` is specified: \* One-time transfers run at the specified time. \* Recurring transfers run at the specified time each day, through `schedule_end_date`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TransferCounters`

- A collection of counters that report the progress of a transfer operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bytesCopiedToSink` | string (int64) | Bytes that are copied to the data sink. |
| `bytesDeletedFromSink` | string (int64) | Bytes that are deleted from the data sink. |
| `bytesDeletedFromSource` | string (int64) | Bytes that are deleted from the data source. |
| `bytesFailedToDeleteFromSink` | string (int64) | Bytes that failed to be deleted from the data sink. |
| `bytesFoundFromSource` | string (int64) | Bytes found in the data source that are scheduled to be transferred, excluding any that are filtered based on object conditions or skipped due to sync. |
| `bytesFoundOnlyFromSink` | string (int64) | Bytes found only in the data sink that are scheduled to be deleted. |
| `bytesFromSourceFailed` | string (int64) | Bytes in the data source that failed to be transferred or that failed to be deleted after being transferred. |
| `bytesFromSourceSkippedBySync` | string (int64) | Bytes in the data source that are not transferred because they already exist in the data sink. |
| `directoriesFailedToListFromSource` | string (int64) | For transfers involving PosixFilesystem only. Number of listing failures for each directory found at the source. Potential failures when listing a directory include permission failure or block failure. If listing a directory fails, no files in the directory are transferred. |
| `directoriesFoundFromSource` | string (int64) | For transfers involving PosixFilesystem only. Number of directories found while listing. For example, if the root directory of the transfer is `base/` and there are two other directories, `a/` and `b/` under this directory, the count after listing `base/`, `base/a/` and `base/b/` is 3. |
| `directoriesSuccessfullyListedFromSource` | string (int64) | For transfers involving PosixFilesystem only. Number of successful listings for each directory found at the source. |
| `intermediateObjectsCleanedUp` | string (int64) | Number of successfully cleaned up intermediate objects. |
| `intermediateObjectsFailedCleanedUp` | string (int64) | Number of intermediate objects failed cleaned up. |
| `objectsCopiedToSink` | string (int64) | Objects that are copied to the data sink. |
| `objectsDeletedFromSink` | string (int64) | Objects that are deleted from the data sink. |
| `objectsDeletedFromSource` | string (int64) | Objects that are deleted from the data source. |
| `objectsFailedToDeleteFromSink` | string (int64) | Objects that failed to be deleted from the data sink. |
| `objectsFoundFromSource` | string (int64) | Objects found in the data source that are scheduled to be transferred, excluding any that are filtered based on object conditions or skipped due to sync. |
| `objectsFoundOnlyFromSink` | string (int64) | Objects found only in the data sink that are scheduled to be deleted. |
| `objectsFromSourceFailed` | string (int64) | Objects in the data source that failed to be transferred or that failed to be deleted after being transferred. |
| `objectsFromSourceSkippedBySync` | string (int64) | Objects in the data source that are not transferred because they already exist in the data sink. |
| `unrestoredDeepArchiveObjectsSkippedCount` | string (int64) | Number of unrestored deep archive objects skipped. |
| `unsupportedS3GlacierObjectsSkippedCount` | string (int64) | Number of glacier objects skipped, glacier objects are unsupported by default regardless of the restore status. Allowlist the project to copy glacier objects if needed. |

### `TransferJob`

- This resource represents the configuration of a transfer job that runs periodically.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTime` | string (google-datetime) | Output only. The time that the transfer job was created. |
| `deletionTime` | string (google-datetime) | Output only. The time that the transfer job was deleted. |
| `description` | string | A description provided by the user for the job. Its max length is 1024 bytes when Unicode-encoded. |
| `eventStream` | EventStream | Specifies the event stream for the transfer job for event-driven transfers. When EventStream is specified, the Schedule fields are ignored. |
| `lastModificationTime` | string (google-datetime) | Output only. The time that the transfer job was last modified. |
| `latestOperationName` | string | The name of the most recently started TransferOperation of this JobConfig. Present if a TransferOperation has been created for this JobConfig. |
| `loggingConfig` | LoggingConfig | Logging configuration. |
| `name` | string | A unique name (within the transfer project) assigned when the job is created. If this field is empty in a CreateTransferJobRequest, Storage Transfer Service assigns a unique name. Otherwise, the specified name is used as the unique name for this job. If the specified name is in use by a job, the creation request fails with an ALREADY_EXISTS error. This name must start with `"transferJobs/"` prefix and end with a letter or a number, and should be no more than 128 characters. For transfers involving PosixFilesystem, this name must start with `transferJobs/OPI` specifically. For all other transfer types, this name must not start with `transferJobs/OPI`. Non-PosixFilesystem example: `"transferJobs/^(?!OPI)[A-Za-z0-9-._~]*[A-Za-z0-9]$"` PosixFilesystem example: `"transferJobs/OPI^[A-Za-z0-9-._~]*[A-Za-z0-9]$"` Applications must not rely on the enforcement of naming requirements involving OPI. Invalid job names fail with an INVALID_ARGUMENT error. |
| `notificationConfig` | NotificationConfig | Notification configuration. |
| `projectId` | string | The ID of the Google Cloud project that owns the job. |
| `replicationSpec` | ReplicationSpec | Replication specification. |
| `schedule` | Schedule | Specifies schedule for the transfer job. This is an optional field. When the field is not set, the job never executes a transfer, unless you invoke RunTransferJob or update the job to have a non-empty schedule. |
| `serviceAccount` | string | Optional. The user-managed service account to which to delegate service agent permissions. You can grant Cloud Storage bucket permissions to this service account instead of to the Transfer Service service agent. Either the service account email (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) or the unique ID (`123456789012345678901`) are accepted. See https://docs.cloud.google.com/storage-transfer/docs/delegate-service-agent-permissions for required permissions. |
| `status` | string enum | Status of the job. This value MUST be specified for `CreateTransferJobRequests`. \*\*Note:\*\* The effect of the new job status takes place during a subsequent job run. For example, if you change the job status from ENABLED to DISABLED, and an operation spawned by the transfer is running, the status change would not affect the current operation. Values: `STATUS_UNSPECIFIED`, `ENABLED`, `DISABLED`, `DELETED`. |
| `transferSpec` | TransferSpec | Transfer specification. |

### `TransferManifest`

- Specifies where the manifest is located.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Specifies the path to the manifest in Cloud Storage. The Google-managed service account for the transfer must have `storage.objects.get` permission for this object. An example path is `gs://bucket_name/path/manifest.csv`. |

### `TransferOperation`

- A description of the execution of a transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `counters` | TransferCounters | Information about the progress of the transfer operation. |
| `endTime` | string (google-datetime) | End time of this transfer execution. |
| `errorBreakdowns` | array<ErrorSummary> | Summarizes errors encountered with sample error log entries. |
| `loggingConfig` | LoggingConfig | Cloud Logging configuration. |
| `name` | string | A globally unique ID assigned by the system. |
| `notificationConfig` | NotificationConfig | Notification configuration. |
| `projectId` | string | The ID of the Google Cloud project that owns the operation. |
| `startTime` | string (google-datetime) | Start time of this transfer execution. |
| `status` | string enum | Status of the transfer operation. Values: `STATUS_UNSPECIFIED`, `IN_PROGRESS`, `PAUSED`, `SUCCESS`, `FAILED`, `ABORTED`, `QUEUED`, `SUSPENDING`. |
| `transferJobName` | string | The name of the transfer job that triggers this transfer operation. |
| `transferSpec` | TransferSpec | Transfer specification. |

### `TransferOptions`

- TransferOptions define the actions to be performed on objects in a transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteObjectsFromSourceAfterTransfer` | boolean | Whether objects should be deleted from the source after they are transferred to the sink. \*\*Note:\*\* This option and delete_objects_unique_in_sink are mutually exclusive. |
| `deleteObjectsUniqueInSink` | boolean | Whether objects that exist only in the sink should be deleted from the sink. \*\*Note:\*\* This option and delete_objects_from_source_after_transfer are mutually exclusive. |
| `metadataOptions` | MetadataOptions | Represents the selected metadata options for a transfer job. |
| `overwriteObjectsAlreadyExistingInSink` | boolean | When to overwrite objects that already exist in the sink. The default is that only objects that are different from the source are overwritten. If true, all objects in the sink whose name matches an object in the source are overwritten with the source object. |
| `overwriteWhen` | string enum | When to overwrite objects that already exist in the sink. If not set, overwrite behavior is determined by overwrite_objects_already_existing_in_sink. Values: `OVERWRITE_WHEN_UNSPECIFIED`, `DIFFERENT`, `NEVER`, `ALWAYS`. |

### `TransferSpec`

- Configuration for running a transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `awsS3CompatibleDataSource` | AwsS3CompatibleData | Optional. An AWS S3 compatible data source. |
| `awsS3DataSource` | AwsS3Data | Optional. An AWS S3 data source. |
| `azureBlobStorageDataSource` | AzureBlobStorageData | Optional. An Azure Blob Storage data source. |
| `gcsDataSink` | GcsData | Optional. A Cloud Storage data sink. |
| `gcsDataSource` | GcsData | Optional. A Cloud Storage data source. |
| `gcsIntermediateDataLocation` | GcsData | For transfers between file systems, specifies a Cloud Storage bucket to be used as an intermediate location through which to transfer data. See Transfer data between file systems (https://cloud.google.com/storage-transfer/docs/file-to-file) for more information. |
| `hdfsDataSource` | HdfsData | Optional. An HDFS cluster data source. |
| `httpDataSource` | HttpData | Optional. An HTTP URL data source. |
| `objectConditions` | ObjectConditions | Only objects that satisfy these object conditions are included in the set of data source and data sink objects. Object conditions based on objects' "last modification time" do not exclude objects in a data sink. |
| `posixDataSink` | PosixFilesystem | Optional. A POSIX Filesystem data sink. |
| `posixDataSource` | PosixFilesystem | Optional. A POSIX Filesystem data source. |
| `sinkAgentPoolName` | string | Specifies the agent pool name associated with the posix data sink. When unspecified, the default name is used. |
| `sourceAgentPoolName` | string | Specifies the agent pool name associated with the posix data source. When unspecified, the default name is used. |
| `transferManifest` | TransferManifest | A manifest file provides a list of objects to be transferred from the data source. This field points to the location of the manifest file. Otherwise, the entire source bucket is used. ObjectConditions still apply. |
| `transferOptions` | TransferOptions | If the option delete_objects_unique_in_sink is `true` and time-based object conditions such as 'last modification time' are specified, the request fails with an INVALID_ARGUMENT error. |

### `UpdateTransferJobRequest`

- Request passed to UpdateTransferJob.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. The ID of the Google Cloud project that owns the job. |
| `transferJob` | TransferJob | Required. The job to update. `transferJob` is expected to specify one or more of five fields: description, transfer_spec, notification_config, logging_config, and status. An `UpdateTransferJobRequest` that specifies other fields are rejected with the error INVALID_ARGUMENT. Updating a job status to DELETED requires `storagetransfer.jobs.delete` permission. |
| `updateTransferJobFieldMask` | string (google-fieldmask) | The field mask of the fields in `transferJob` that are to be updated in this request. Fields in `transferJob` that can be updated are: description, transfer_spec, notification_config, logging_config, and status. To update the `transfer_spec` of the job, a complete transfer specification must be provided. An incomplete specification missing any required fields is rejected with the error INVALID_ARGUMENT. |

### Shape of `AgentPool`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "bandwidthLimit": "BandwidthLimit",
  "displayName": "string",
  "name": "string",
  "state": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `storagetransfer` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://storagetransfer.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
