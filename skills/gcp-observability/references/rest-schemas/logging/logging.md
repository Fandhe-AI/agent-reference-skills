---
source: https://logging.googleapis.com/$discovery/rest?version=v2
---

# Cloud Logging API message schemas (logging)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/logging/`.

### `AppHub`

- Metadata associated with App Hub.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `application` | AppHubApplication | Metadata associated with the application. |
| `service` | AppHubService | Metadata associated with the service. |
| `workload` | AppHubWorkload | Metadata associated with the workload. |

### `AppHubApplication`

- Resource identifiers associated with an AppHub application AppHub resources are of the form projects//locations//applications/ projects//locations//applications//services/ projects//locations//applications//workloads/ These resources can be reconstructed from the components below.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `container` | string | Resource container that owns the application. Example: "projects/management_project" |
| `id` | string | Application Id. Example: "my-app" |
| `location` | string | Location associated with the Application. Example: "us-east1" |

### `AppHubService`

- Metadata associated with an App Hub service.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `criticalityType` | string | Service criticality type Example: "CRITICAL" |
| `environmentType` | string | Service environment type Example: "DEV" |
| `id` | string | Service Id. Example: "my-service" |

### `AppHubWorkload`

- Metadata associated with an App Hub workload.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `criticalityType` | string | Workload criticality type Example: "CRITICAL" |
| `environmentType` | string | Workload environment type Example: "DEV" |
| `id` | string | Workload Id. Example: "my-workload" |

### `BigQueryDataset`

- Describes a BigQuery dataset that was created by a link.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Output only. The full resource name of the BigQuery dataset. The DATASET_ID will match the ID of the link, so the link must match the naming restrictions of BigQuery datasets (alphanumeric characters and underscores only).The dataset will have a resource path of "bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID" |

### `BigQueryOptions`

- Options that change functionality of a sink exporting data to BigQuery.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `usePartitionedTables` | boolean | Optional. Whether to use BigQuery's partition tables (https://docs.cloud.google.com/bigquery/docs/partitioned-tables). By default, Cloud Logging creates dated tables based on the log entries' timestamps, e.g. syslog_20170523. With partitioned tables the date suffix is no longer present and special query syntax (https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables) has to be used instead. In both cases, tables are sharded based on UTC timezone. |
| `usesTimestampColumnPartitioning` | boolean | Output only. True if new timestamp column based partitioning is in use, false if legacy ingress-time partitioning is in use.All new sinks will have this field set true and will use timestamp column based partitioning. If use_partitioned_tables is false, this value has no meaning and will be false. Legacy sinks using partitioned tables will have this field set to false. |

### `Binding`

- Associates members, or principals, with a role.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding.If the condition evaluates to true, then this binding applies to the current request.If the condition evaluates to false, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. members can have the following values: allUsers: A special identifier that represents anyone who is on the internet; with or without a Google account. allAuthenticatedUsers: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. user:{emailid}: An email address that represents a specific Google account. For example, alice@example.com . serviceAccount:{emailid}: An email address that represents a Google service account. For example, my-other-app@appspot.gserviceaccount.com. serviceAccount:{projectid}.svc.id.goog\[{namespace}/{kubernetes-sa}\]: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, my-project.svc.id.goog\[my-namespace/my-kubernetes-sa\]. group:{emailid}: An email address that represents a Google group. For example, admins@example.com. domain:{domain}: The G Suite domain (primary) that represents all the users of that domain. For example, google.com or example.com. principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workforce identity pool. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}: All workforce identities in a group. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All workforce identities with a specific attribute value. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/\*: All identities in a workforce identity pool. principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workload identity pool. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}: A workload identity pool group. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All identities in a workload identity pool with a certain attribute. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/\*: All identities in a workload identity pool. deleted:user:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a user that has been recently deleted. For example, alice@example.com?uid=123456789012345678901. If the user is recovered, this value reverts to user:{emailid} and the recovered user retains the role in the binding. deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901. If the service account is undeleted, this value reverts to serviceAccount:{emailid} and the undeleted service account retains the role in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, admins@example.com?uid=123456789012345678901. If the group is recovered, this value reverts to group:{emailid} and the recovered group retains the role in the binding. deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: Deleted single identity in a workforce identity pool. For example, deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value. |
| `role` | string | Role that is assigned to the list of members, or principals. For example, roles/viewer, roles/editor, or roles/owner.For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BucketMetadata`

- Metadata for LongRunningUpdateBucket Operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createBucketRequest` | CreateBucketRequest | LongRunningCreateBucket RPC request. |
| `endTime` | string (google-datetime) | The end time of an operation. |
| `startTime` | string (google-datetime) | The create time of an operation. |
| `state` | string enum | Output only. State of an operation. Values: `OPERATION_STATE_UNSPECIFIED`, `OPERATION_STATE_SCHEDULED`, `OPERATION_STATE_WAITING_FOR_PERMISSIONS`, `OPERATION_STATE_RUNNING`, `OPERATION_STATE_SUCCEEDED`, `OPERATION_STATE_FAILED`, `OPERATION_STATE_CANCELLED`, `OPERATION_STATE_PENDING`. |
| `updateBucketRequest` | UpdateBucketRequest | LongRunningUpdateBucket RPC request. |

### `BucketOptions`

- BucketOptions describes the bucket boundaries used to create a histogram for the distribution. The buckets can be in a linear sequence, an exponential sequence, or each bucket can be specified explicitly. BucketOptions does not include the number of values in each bucket.A bucket has an inclusive lower bound and exclusive upper bound for the values that are counted for that bucket. The upper bound of a bucket must be strictly greater than the lower bound. The sequence of N buckets for a distribution consists of an underflow bucket (number 0), zero or more finite buckets (number 1 through N - 2) and an overflow bucket (number N - 1). The buckets are contiguous: the lower bound of bucket i (i > 0) is the same as the upper bound of bucket i - 1. The buckets span the whole range of finite values: lower bound of the underflow bucket is -infinity and the upper bound of the overflow bucket is +infinity. The finite buckets are so-called because both bounds are finite.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `explicitBuckets` | Explicit | The explicit buckets. |
| `exponentialBuckets` | Exponential | The exponential buckets. |
| `linearBuckets` | Linear | The linear bucket. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v2

### `CmekSettings`

- Describes the customer-managed encryption key (CMEK) settings associated with a project, folder, organization, billing account, or flexible resource.Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The resource name for the configured Cloud KMS key.KMS key name format: "projects/\[PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[KEYRING\]/cryptoKeys/\[KEY\]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To enable CMEK for the Log Router, set this field to a valid kms_key_name for which the associated service account has the needed cloudkms.cryptoKeyEncrypterDecrypter roles assigned for the key.The Cloud KMS key used by the Log Router can be updated by changing the kms_key_name to a new valid key name or disabled by setting the key name to an empty string. Encryption operations that are in progress will be completed with the key that was in use when they started. Decryption operations will be completed using the key that was used at the time of encryption unless access to that key has been revoked.To disable CMEK for the Log Router, set this field to an empty string.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. |
| `kmsKeyVersionName` | string | Output only. The CryptoKeyVersion resource name for the configured Cloud KMS key.KMS key name format: "projects/\[PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[KEYRING\]/cryptoKeys/\[KEY\]/cryptoKeyVersions/\[VERSION\]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key/cryptoKeyVersions/1"This is a read-only field used to convey the specific configured CryptoKeyVersion of kms_key that has been configured. It will be populated in cases where the CMEK settings are bound to a single key version.If this field is populated, the kms_key is tied to a specific CryptoKeyVersion. |
| `name` | string | Output only. The resource name of the CMEK settings. |
| `serviceAccountId` | string | Output only. The service account that will be used by the Log Router to access your Cloud KMS key.Before enabling CMEK for Log Router, you must first assign the cloudkms.cryptoKeyEncrypterDecrypter role to the service account that the Log Router will use to access your Cloud KMS key. Use GetCmekSettings to obtain the service account ID.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. |

### `CopyLogEntriesMetadata`

- Metadata for CopyLogEntries long running operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cancellationRequested` | boolean | Identifies whether the user has requested cancellation of the operation. |
| `destination` | string | Destination to which to copy log entries.For example, a Cloud Storage bucket:"storage.googleapis.com/my-cloud-storage-bucket" |
| `endTime` | string (google-datetime) | The end time of an operation. |
| `progress` | integer (int32) | Estimated progress of the operation (0 - 100%). |
| `request` | CopyLogEntriesRequest | CopyLogEntries RPC request. This field is deprecated and not used. |
| `source` | string | Source from which to copy log entries.For example, a log bucket:"projects/my-project/locations/global/buckets/my-source-bucket" |
| `startTime` | string (google-datetime) | The create time of an operation. |
| `state` | string enum | Output only. State of an operation. Values: `OPERATION_STATE_UNSPECIFIED`, `OPERATION_STATE_SCHEDULED`, `OPERATION_STATE_WAITING_FOR_PERMISSIONS`, `OPERATION_STATE_RUNNING`, `OPERATION_STATE_SUCCEEDED`, `OPERATION_STATE_FAILED`, `OPERATION_STATE_CANCELLED`, `OPERATION_STATE_PENDING`. |
| `verb` | string | Name of the verb executed by the operation.For example,"copy" |
| `writerIdentity` | string | The IAM identity of a service account that must be granted access to the destination.If the service account is not granted permission to the destination within an hour, the operation will be cancelled.For example: "serviceAccount:foo@bar.com" |

### `CopyLogEntriesRequest`

- The parameters to CopyLogEntries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `destination` | string | Required. Destination to which to copy log entries. For example: "storage.googleapis.com/GCS_BUCKET" |
| `filter` | string | Optional. A filter specifying which log entries to copy. The filter must be no more than 20k characters. An empty filter matches all log entries. |
| `name` | string | Required. Log bucket from which to copy log entries.For example:"projects/my-project/locations/global/buckets/my-source-bucket" |

### `CopyLogEntriesResponse`

- Response type for CopyLogEntries long running operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logEntriesCopiedCount` | string (int64) | Number of log entries copied. |

### `CreateBucketRequest`

- The parameters to CreateBucket.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | LogBucket | Required. The new bucket. The region specified in the new bucket must be compliant with any Location Restriction Org Policy. The name field in the bucket is ignored. |
| `bucketId` | string | Required. A client-assigned identifier such as "my-bucket". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. Bucket identifiers must start with an alphanumeric character. |
| `parent` | string | Required. The resource in which to create the log bucket: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global" |

### `CreateLinkRequest`

- The parameters to CreateLink.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `link` | Link | Required. The new link. |
| `linkId` | string | Required. The ID to use for the link. The link_id can have up to 100 characters. A valid link_id must only have alphanumeric characters and underscores within it. |
| `parent` | string | Required. The full resource name of the bucket to create a link for. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" |

### `DefaultSinkConfig`

- Describes the custom \_Default sink configuration that is used to override the built-in \_Default sink configuration in newly created resource containers, such as projects or folders.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exclusions` | array<LogExclusion> | Optional. Specifies the set of exclusions to be added to the \_Default sink in newly created resource containers. |
| `filter` | string | Optional. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression). The only exported log entries are those that are in the resource owning the sink and that match the filter.For example:logName="projects/\[PROJECT_ID\]/logs/\[LOG_ID\]" AND severity>=ERRORTo match all logs, don't add exclusions and use the following line as the value of filter:logName:\*Cannot be empty or unset when the value of mode is OVERWRITE. |
| `mode` | string enum | Required. Determines the behavior to apply to the built-in \_Default sink inclusion filter.Exclusions are always appended, as built-in \_Default sinks have no exclusions. Values: `FILTER_WRITE_MODE_UNSPECIFIED`, `APPEND`, `OVERWRITE`. |

### `DeleteLinkRequest`

- The parameters to DeleteLink.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The full resource name of the link to delete. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `Explicit`

- Specifies a set of buckets with arbitrary widths.There are size(bounds) + 1 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): boundsi Lower bound (1 <= i < N); boundsi - 1The bounds field must contain at least one element. If bounds has only one element, then there are no finite buckets, and that single element is the common boundary of the overflow and underflow buckets.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bounds` | array<number> | The values must be monotonically increasing. |

### `Exponential`

- Specifies an exponential sequence of buckets that have a width that is proportional to the value of the lower bound. Each bucket represents a constant relative uncertainty on a specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): scale \* (growth_factor ^ i).Lower bound (1 <= i < N): scale \* (growth_factor ^ (i - 1)).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `growthFactor` | number (double) | Must be greater than 1. |
| `numFiniteBuckets` | integer (int32) | Must be greater than 0. |
| `scale` | number (double) | Must be greater than 0. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec.Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FieldSource`

- A source that can be used to represent a "field of data" within various parts of a structured query, such as in SELECT, WHERE, or ORDER BY clauses. The term "field of data" is used here because it is not limited to literal fields in the underlying data schema.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `aliasRef` | string | The alias name for a field that has already been aliased within a different ProjectedField type elsewhere in the query model. The alias must be defined in the QueryBuilderConfig's field_sources list, otherwise the model is invalid. |
| `columnType` | string | The type of the selected field. This comes from the schema. Can be one of the BigQuery data types: - STRING - INT64 - FLOAT64 - BOOL - TIMESTAMP - DATE - RECORD - JSON |
| `field` | string | The fully qualified, dot-delimited path to the selected atomic field (the leaf value). This path is used for primary selection and actions like drill-down or projection.The path components should match the exact field names or keys as they appear in the underlying data schema. For JSON fields, this means respecting the original casing (e.g., camelCase or snake_case as present in the JSON).To reference field names containing special characters (e.g., hyphens, spaces), enclose the individual path segment in backticks (`).Examples: * json_payload.labels.message * json_payload.request_id * httpRequest.status * json_payload.\my-custom-field`.value \*jsonPayload.`my key with spaces`.data\` |
| `isJson` | boolean | Whether the field is a JSON field, or has a parent that is a JSON field. This value is used to determine JSON extractions in generated SQL queries. Note that this is_json flag may be true when the column_type is not JSON if the parent is a JSON field. Ex: - A json_payload.message field might have is_json=true, since the 'json_payload' parent is of type JSON, and columnType='STRING' if the 'message' field is of type STRING. |
| `parentPath` | string | The dot-delimited path of the parent container that holds the target field.This path defines the structural hierarchy and is essential for correctly generating SQL when field keys contain special characters (e.g., dots or brackets).Example: json_payload.labels (This points to the 'labels' object). This is an empty string if the target field is at the root level. |
| `projectedField` | ProjectedField | A projected field option for when a user wants to use a field with some additional transformations such as casting or extractions. |

### `FilterExpression`

- This is a leaf of the FilterPredicate. Ex: { field: json_payload.message.error_code, filter_value: {numeric_value: 400}, comparator: EQUAL_TO} The field will be schema field that is selected using the . annotation to display the drill down value. The value will be the user inputted text that the filter is comparing against.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `comparator` | string enum | The comparison type to use for the filter. Values: `COMPARATOR_UNSPECIFIED`, `EQUALS`, `MATCHES_REGEXP`, `GREATER_THAN`, `LESS_THAN`, `GREATER_THAN_EQUALS`, `LESS_THAN_EQUALS`, `IS_NULL`, `IN`, `LIKE`. |
| `fieldSource` | FieldSource | Can be one of the FieldSource types: field name, alias ref, variable ref, or a literal value. |
| `fieldSourceValue` | FieldSource | The field. This will be the field that is set as the Right Hand Side of the filter. |
| `isNegation` | boolean | Determines if the NOT flag should be added to the comparator. |
| `literalValue` | any | The Value will be used to hold user defined constants set as the Right Hand Side of the filter. |

### `FilterPredicate`

- A filter for a query. This equates to the WHERE clause in SQL.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `childPredicates` | array<FilterPredicate> | The children of the filter predicate. This equates to the branches of the filter predicate that could contain further nested leaves. |
| `leafPredicate` | FilterExpression | The leaves of the filter predicate. This equates to the last leaves of the filter predicate associated with an operator. |
| `operatorType` | string enum | The operator type for the filter. Currently there is no support for multiple levels of nesting, so this will be a single value with no joining of different operator types Values: `OPERATOR_TYPE_UNSPECIFIED`, `AND`, `OR`, `LEAF`. |

### `FunctionApplication`

- Defines the aggregation function to apply to this field. This message is used only when operation is set to AGGREGATE.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `parameters` | array<any> | Optional. Parameters to be applied to the aggregation. Aggregations that support or require parameters are listed above. |
| `type` | string | Required. Specifies the aggregation function. Use one of the following string identifiers: "average": Computes the average (AVG). Applies only to numeric values. "count": Counts the number of values (COUNT). "count-distinct": Counts the number of distinct values (COUNT DISTINCT). "count-distinct-approx": Approximates the count of distinct values (APPROX_COUNT_DISTINCT). "max": Finds the maximum value (MAX). Applies only to numeric values. "min": Finds the minimum value (MIN). Applies only to numeric values. "sum": Computes the sum (SUM). Applies only to numeric values. |

### `GetIamPolicyRequest`

- Request message for GetIamPolicy method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A GetPolicyOptions object for specifying options to GetIamPolicy. |

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `HttpRequest`

- A common proto for logging HTTP requests. Only contains semantics defined by the HTTP specification. Product-specific logging information MUST be defined in a separate message.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cacheFillBytes` | string (int64) | The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. |
| `cacheHit` | boolean | Whether or not an entity was served from cache (with or without validation). |
| `cacheLookup` | boolean | Whether or not a cache lookup was attempted. |
| `cacheValidatedWithOriginServer` | boolean | Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if cache_hit is True. |
| `latency` | string (google-duration) | The request processing latency on the server, from the time the request was received until the response was sent. For WebSocket connections, this field refers to the entire time duration of the connection. |
| `protocol` | string | Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2" |
| `referer` | string | The referer URL of the request, as defined in HTTP/1.1 Header Field Definitions (https://datatracker.ietf.org/doc/html/rfc2616#section-14.36). |
| `remoteIp` | string | The IP address (IPv4 or IPv6) of the client that issued the HTTP request. This field can include port information. Examples: "192.168.1.1", "10.0.0.1:80", "FE80::0202:B3FF:FE1E:8329". |
| `requestMethod` | string | The request method. Examples: "GET", "HEAD", "PUT", "POST". |
| `requestSize` | string (int64) | The size of the HTTP request message in bytes, including the request headers and the request body. |
| `requestUrl` | string | The scheme (http, https), the host name, the path and the query portion of the URL that was requested. Example: "http://example.com/some/info?color=red". |
| `responseSize` | string (int64) | The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. |
| `serverIp` | string | The IP address (IPv4 or IPv6) of the origin server that the request was sent to. This field can include port information. Examples: "192.168.1.1", "10.0.0.1:80", "FE80::0202:B3FF:FE1E:8329". |
| `status` | integer (int32) | The response code indicating the status of response. Examples: 200, 404. |
| `userAgent` | string | The user agent sent by the client. Example: "Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)". |

### `IndexConfig`

- Configuration for an indexed field.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the index was last modified.This is used to return the timestamp, and will be ignored if supplied during update. |
| `fieldPath` | string | Required. The LogEntry field path to index.Note that some paths are automatically indexed, and other paths are not eligible for indexing. See indexing documentation( https://docs.cloud.google.com/logging/docs/analyze/custom-index) for details.For example: jsonPayload.request.status |
| `type` | string enum | Required. The type of data in this index. Values: `INDEX_TYPE_UNSPECIFIED`, `INDEX_TYPE_STRING`, `INDEX_TYPE_INTEGER`. |

### `LabelDescriptor`

- A description of a label.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | A human-readable description for the label. |
| `key` | string | The label key. |
| `valueType` | string enum | The type of data that can be assigned to the label. Values: `STRING`, `BOOL`, `INT64`. |

### `Linear`

- Specifies a linear sequence of buckets that all have the same width (except overflow and underflow). Each bucket represents a constant absolute uncertainty on the specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): offset + (width \* i).Lower bound (1 <= i < N): offset + (width \* (i - 1)).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `numFiniteBuckets` | integer (int32) | Must be greater than 0. |
| `offset` | number (double) | Lower bound of the first bucket. |
| `width` | number (double) | Must be greater than 0. |

### `Link`

- Describes a link connected to an analytics enabled bucket.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bigqueryDataset` | BigQueryDataset | Optional. The information of a BigQuery Dataset. When a link is created, a BigQuery dataset is created along with it, in the same project as the LogBucket it's linked to. This dataset will also have BigQuery Views corresponding to the LogViews in the bucket. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the link. |
| `description` | string | Optional. Describes this link.The maximum length of the description is 8000 characters. |
| `lifecycleState` | string enum | Output only. The resource lifecycle state. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`, `UPDATING`, `CREATING`, `FAILED`. |
| `name` | string | Output only. The resource name of the link. The name can have up to 100 characters. A valid link id (at the end of the link name) must only have alphanumeric characters and underscores within it. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/links/\[LINK_ID\]" For example:\`projects/my-project/locations/global/buckets/my-bucket/links/my_link |

### `LinkMetadata`

- Metadata for long running Link operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createLinkRequest` | CreateLinkRequest | CreateLink RPC request. |
| `deleteLinkRequest` | DeleteLinkRequest | DeleteLink RPC request. |
| `endTime` | string (google-datetime) | The end time of an operation. |
| `startTime` | string (google-datetime) | The start time of an operation. |
| `state` | string enum | Output only. State of an operation. Values: `OPERATION_STATE_UNSPECIFIED`, `OPERATION_STATE_SCHEDULED`, `OPERATION_STATE_WAITING_FOR_PERMISSIONS`, `OPERATION_STATE_RUNNING`, `OPERATION_STATE_SUCCEEDED`, `OPERATION_STATE_FAILED`, `OPERATION_STATE_CANCELLED`, `OPERATION_STATE_PENDING`. |

### `ListBucketsResponse`

- The response from ListBuckets.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buckets` | array<LogBucket> | A list of buckets. |
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |

### `ListExclusionsResponse`

- Result returned from ListExclusions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exclusions` | array<LogExclusion> | A list of exclusions. |
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |

### `ListLinksResponse`

- The response from ListLinks.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `links` | array<Link> | A list of links. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListLogEntriesRequest`

- The parameters to ListLogEntries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. A filter that chooses which log entries to return. For more information, see Logging query language (https://docs.cloud.google.com/logging/docs/view/logging-query-language).Only log entries that match the filter are returned. An empty filter matches all log entries in the resources listed in resource_names. Referencing a parent resource that is not listed in resource_names will cause the filter to return no results. The maximum length of a filter is 20,000 characters.To make queries faster, you can make the filter more selective by using restrictions on indexed fields (https://docs.cloud.google.com/logging/docs/view/logging-query-language#indexed-fields) as well as limit the time range of the query by adding range restrictions on the timestamp field. |
| `orderBy` | string | Optional. How the results should be sorted. Presently, the only permitted values are "timestamp asc" (default) and "timestamp desc". The first option returns entries in order of increasing values of LogEntry.timestamp (oldest first), and the second option returns entries in order of decreasing timestamps (newest first). Entries with equal timestamps are returned in order of their insert_id values.We recommend setting the order_by field to "timestamp desc" when listing recently ingested log entries. If not set, the default value of "timestamp asc" may take a long time to fetch matching logs that are only recently ingested. |
| `pageSize` | integer (int32) | Optional. The maximum number of results to return from this request. Default is 50. If the value is negative, the request is rejected.The presence of next_page_token in the response indicates that more results might be available. |
| `pageToken` | string | Optional. If present, then retrieve the next batch of results from the preceding call to this method. page_token must be the value of next_page_token from the previous response. The values of other method parameters should be identical to those in the previous call. |
| `projectIds` | array<string> | Optional. Deprecated. Use resource_names instead. One or more project identifiers or project numbers from which to retrieve log entries. Example: "my-project-1A". |
| `resourceNames` | array<string> | Required. Names of one or more parent resources from which to retrieve log entries. Resources may either be resource containers or specific LogViews. For the case of resource containers, all logs ingested into that container will be returned regardless of which LogBuckets they are actually stored in - i.e. these queries may fan out to multiple regions. In the event of region unavailability, specify a specific set of LogViews that do not include the unavailable region. projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\] projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]Projects listed in the project_ids field are added to this list. A maximum of 100 resources may be specified in a single request. |

### `ListLogEntriesResponse`

- Result returned from ListLogEntries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `entries` | array<LogEntry> | A list of log entries. If entries is empty, nextPageToken may still be returned, indicating that more entries may exist. See nextPageToken for more information. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken.If a value for next_page_token appears and the entries field is empty, it means that the search found no log entries so far but it did not have time to search all the possible log entries. Retry the method with this value for page_token to continue the search. Alternatively, consider speeding up the search by changing your filter to specify a single log name or resource type, or to narrow the time range of the search. |

### `ListLogMetricsResponse`

- Result returned from ListLogMetrics.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `metrics` | array<LogMetric> | A list of logs-based metrics. |
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken. |

### `ListLogScopesResponse`

- The response from ListLogScopes. Every project has a \_Default log scope that cannot be modified or deleted.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logScopes` | array<LogScope> | A list of log scopes. |
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |

### `ListLogsResponse`

- Result returned from ListLogs.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logNames` | array<string> | A list of log names. For example, "projects/my-project/logs/syslog" or "organizations/123/logs/cloudresourcemanager.googleapis.com%2Factivity". |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken. |

### `ListMonitoredResourceDescriptorsResponse`

- Result returned from ListMonitoredResourceDescriptors.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then nextPageToken is included. To get the next set of results, call this method again using the value of nextPageToken as pageToken. |
| `resourceDescriptors` | array<MonitoredResourceDescriptor> | A list of resource descriptors. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListRecentQueriesResponse`

- The response from ListRecentQueries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |
| `recentQueries` | array<RecentQuery> | A list of recent queries. |
| `unreachable` | array<string> | The unreachable resources. Each resource can be either 1) a saved query if a specific query is unreachable or 2) a location if a specific location is unreachable. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/recentQueries/\[QUERY_ID\]" "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example:"projects/my-project/locations/global/recentQueries/12345678" "projects/my-project/locations/global"If there are unreachable resources, the response will first return pages that contain recent queries, and then return pages that contain the unreachable resources. |

### `ListSavedQueriesResponse`

- The response from ListSavedQueries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |
| `savedQueries` | array<SavedQuery> | A list of saved queries. |
| `unreachable` | array<string> | The unreachable resources. It can be either 1) a saved query if a specific query is unreachable or 2) a location if a specific location is unreachabe. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]" For example: "projects/my-project/locations/global/savedQueries/12345678" "projects/my-project/locations/global" If there are unreachable resources, the response will first return pages that contain saved queries, and then return pages that contain the unreachable resources. |

### `ListSinksResponse`

- Result returned from ListSinks.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |
| `sinks` | array<LogSink> | A list of sinks. |

### `ListViewsResponse`

- The response from ListViews.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than appear in this response, then nextPageToken is included. To get the next set of results, call the same method again using the value of nextPageToken as pageToken. |
| `views` | array<LogView> | A list of views. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: "us-east1". |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" |

### `LocationMetadata`

- Cloud Logging specific location metadata.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logAnalyticsEnabled` | boolean | Indicates whether or not Log Analytics features are supported in the given location. |

### `LogBucket`

- Describes a repository in which log entries are stored.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `analyticsEnabled` | boolean | Optional. Whether log analytics is enabled for this bucket.Once enabled, log analytics features cannot be disabled. |
| `cmekSettings` | CmekSettings | Optional. The CMEK settings of the log bucket. If present, new log entries written to this log bucket are encrypted using the CMEK key provided in this configuration. If a log bucket has CMEK settings, the CMEK settings cannot be disabled later by updating the log bucket. Changing the KMS key is allowed. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the bucket. This is not set for any of the default buckets. |
| `description` | string | Optional. Describes this bucket. |
| `indexConfigs` | array<IndexConfig> | Optional. A list of indexed fields and related configuration data. |
| `lifecycleState` | string enum | Output only. The bucket lifecycle state. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`, `UPDATING`, `CREATING`, `FAILED`. |
| `locked` | boolean | Optional. Whether the bucket is locked.The retention period on a locked bucket cannot be changed. Locked buckets may only be deleted if they are empty. |
| `name` | string | Output only. The resource name of the bucket.For example:projects/my-project/locations/global/buckets/my-bucketFor a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support)For the location of global it is unspecified where log entries are actually stored.After a bucket has been created, the location cannot be changed. |
| `restrictedFields` | array<string> | Optional. Log entry field paths that are denied access in this bucket.The following fields and their children are eligible: textPayload, jsonPayload, protoPayload, httpRequest, labels, sourceLocation.Restricting a repeated field will restrict all values. Adding a parent will block all child fields. (e.g. foo.bar will block foo.bar.baz) |
| `retentionDays` | integer (int32) | Optional. Logs will be retained by default for this amount of time, after which they will automatically be deleted. The minimum retention period is 1 day. If this value is set to zero at bucket creation time, the default time of 30 days will be used. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the bucket. |

### `LogEntry`

- An individual entry in a log.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apphub` | AppHub | Output only. AppHub application metadata associated with this LogEntry. May be empty if there is no associated AppHub application or multiple associated applications (such as for VPC flow logs) |
| `apphubDestination` | AppHub | Output only. AppHub application metadata associated with the destination application. This is only populated if the log represented "edge"-like data (such as for VPC flow logs) with a destination. |
| `apphubSource` | AppHub | Output only. AppHub application metadata associated with the source application. This is only populated if the log represented "edge"-like data (such as for VPC flow logs) with a source. |
| `errorGroups` | array<LogErrorGroup> | Output only. The Error Reporting (https://cloud.google.com/error-reporting) error groups associated with this LogEntry. Error Reporting sets the values for this field during error group creation.This field is populated only when log entries are stored in Cloud Logging storage (Logs Explorer and Observability Analytics). It is not available for use in log sink filters, log-based metrics, or log-based alerts, and it is excluded from log exports (Cloud Storage, BigQuery, and Pub/Sub).For more information, see View error details( https://cloud.google.com/error-reporting/docs/viewing-errors#view_error_details) |
| `httpRequest` | HttpRequest | Optional. Information about the HTTP request associated with this log entry, if applicable. |
| `insertId` | string | Optional. A unique identifier for the log entry. If you provide a value, then Logging considers other log entries in the same project, with the same timestamp, and with the same insert_id to be duplicates which are removed in a single query result. However, there are no guarantees of de-duplication in the export of logs.If the insert_id is omitted when writing a log entry, the Logging API assigns its own unique identifier in this field.In queries, the insert_id is also used to order log entries that have the same log_name and timestamp values. |
| `jsonPayload` | object | The log entry payload, represented as a structure that is expressed as a JSON object. |
| `labels` | object | Optional. A map of key, value pairs that provides additional information about the log entry. The labels can be user-defined or system-defined.User-defined labels are arbitrary key, value pairs that you can use to classify logs.System-defined labels are defined by cloud services for platform logs. They have two components - a service namespace component and the attribute name. For example: compute.googleapis.com/resource_name.Cloud Logging truncates label keys that exceed 512 B and label values that exceed 64 KB upon their associated log entry being written. The truncation is indicated by an ellipsis at the end of the character string. |
| `logName` | string | Required. The resource name of the log to which this log entry belongs: "projects/\[PROJECT_ID\]/logs/\[LOG_ID\]" "organizations/\[ORGANIZATION_ID\]/logs/\[LOG_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/logs/\[LOG_ID\]" "folders/\[FOLDER_ID\]/logs/\[LOG_ID\]" A project number may be used in place of PROJECT_ID. The project number is translated to its corresponding PROJECT_ID internally and the log_name field will contain PROJECT_ID in queries and exports.\[LOG_ID\] must be URL-encoded within log_name. Example: "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity".\[LOG_ID\] must be less than 512 characters long and can only include the following characters: upper and lower case alphanumeric characters, forward-slash, underscore, hyphen, and period.For backward compatibility, if log_name begins with a forward-slash, such as /projects/..., then the log entry is processed as usual, but the forward-slash is removed. Listing the log entry will not show the leading slash and filtering for a log name with a leading slash will never return any results. |
| `metadata` | MonitoredResourceMetadata | Output only. Deprecated. This field is not used by Logging. Any value written to it is cleared. |
| `operation` | LogEntryOperation | Optional. Information about an operation associated with the log entry, if applicable. |
| `otel` | object | Optional. The structured OpenTelemetry protocol payload. Contains the OpenTelemetry Resource, Instrumentation Scope, and Entities attributes for this log as they are defined in the OTLP specification, and any other fields that do not have a direct analog in the LogEntry. See https://opentelemetry.io/docs/specs/otel/logs/data-model/ |
| `protoPayload` | object | The log entry payload, represented as a protocol buffer. Some Google Cloud Platform services use this field for their log entry payloads.The following protocol buffer types are supported; user-defined types are not supported:"type.googleapis.com/google.cloud.audit.AuditLog" "type.googleapis.com/google.appengine.logging.v1.RequestLog" |
| `receiveTimestamp` | string (google-datetime) | Output only. The time the log entry was received by Logging. |
| `resource` | MonitoredResource | Required. The monitored resource that produced this log entry.Example: a log entry that reports a database error would be associated with the monitored resource designating the particular database that reported the error. |
| `severity` | string enum | Optional. The severity of the log entry. The default value is LogSeverity.DEFAULT. Values: `DEFAULT`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`. |
| `sourceLocation` | LogEntrySourceLocation | Optional. Source code location information associated with the log entry, if any. |
| `spanId` | string | Optional. The ID of the Cloud Trace (https://docs.cloud.google.com/trace/docs) span associated with the current operation in which the log is being written.A Span (https://docs.cloud.google.com/trace/docs/reference/v2/rest/v2/projects.traces/batchWrite#Span) represents a single operation within a trace. Whereas a trace may involve multiple different microservices running on multiple different machines, a span generally corresponds to a single logical operation being performed in a single instance of a microservice on one specific machine. Spans are the nodes within the tree that is a trace.Applications that are instrumented for tracing (https://docs.cloud.google.com/trace/docs/setup) will generally assign a new, unique span ID on each incoming request. It is also common to create and record additional spans corresponding to internal processing elements as well as issuing requests to dependencies.The span ID is expected to be a 16-character, hexadecimal encoding of an 8-byte array and should not be zero. It should be unique within the trace and should, ideally, be generated in a manner that is uniformly random.Example values: 000000000000004a 7a2190356c3fc94b 0000f00300090021 d39223e101960076 |
| `split` | LogSplit | Optional. Information indicating this LogEntry is part of a sequence of multiple log entries split from a single LogEntry. |
| `textPayload` | string | The log entry payload, represented as a Unicode string (UTF-8). |
| `timestamp` | string (google-datetime) | Optional. The time the event described by the log entry occurred. This time is used to compute the log entry's age and to enforce the logs retention period. If this field is omitted in a new log entry, then Logging assigns it the current time. Timestamps have nanosecond accuracy, but trailing zeros in the fractional seconds might be omitted when the timestamp is displayed. |
| `trace` | string | Optional. The trace ID being written to Cloud Trace (https://docs.cloud.google.com/trace/docs) in association with this log entry. For example, if your trace data is stored in the Cloud project "my-trace-project" and if the service that is creating the log entry receives a trace header that includes the trace ID "12345", then the service should use "12345".The REST resource name of the trace is also supported, but using this format is not recommended. An example trace REST resource name is similar to "projects/my-trace-project/traces/12345".The trace field provides the link between logs and traces. By using this field, you can navigate from a log entry to a trace. |
| `traceSampled` | boolean | Optional. The sampling decision of the span associated with the log entry at the time the log entry was created. This field corresponds to the sampled flag in the W3C trace-context specification (https://www.w3.org/TR/trace-context/#sampled-flag). A non-sampled trace value is still useful as a request correlation identifier. The default is False. |

### `LogEntryOperation`

- Additional information about a potentially long-running operation with which a log entry is associated.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `first` | boolean | Optional. Set this to True if this is the first log entry in the operation. |
| `id` | string | Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. |
| `last` | boolean | Optional. Set this to True if this is the last log entry in the operation. |
| `producer` | string | Optional. An arbitrary producer identifier. The combination of id and producer must be globally unique. Examples for producer: "MyDivision.MyBigCompany.com", "github.com/MyProject/MyApplication". |

### `LogEntrySourceLocation`

- Additional information about the source code location that produced the log entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `file` | string | Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. |
| `function` | string | Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python). |
| `line` | string (int64) | Optional. Line within the source file. 1-based; 0 indicates no line number available. |

### `LogErrorGroup`

- Contains metadata that associates the LogEntry to Error Reporting error groups.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `id` | string | The id is a unique identifier for a particular error group; it is the last part of the error group resource name: /project/\[PROJECT_ID\]/errors/\[ERROR_GROUP_ID\]. Example: COShysOX0r_51QE.This field can be used to search for log entries belonging to a specific error group in Logs Explorer (e.g., error_groups.id = "ID") or Observability Analytics.The id is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). |

### `LogExclusion`

- Specifies a set of log entries that are filtered out by a sink. If your Google Cloud resource receives a large volume of log entries, you can use exclusions to reduce your chargeable logs. Note that exclusions on organization-level and folder-level sinks don't apply to child resources. Note also that you cannot modify the \_Required sink or exclude logs from it.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the exclusion.This field may not be present for older exclusions. |
| `description` | string | Optional. A description of this exclusion. |
| `disabled` | boolean | Optional. If set to True, then this exclusion is disabled and it does not exclude any log entries. You can update an exclusion to change the value of this field. |
| `filter` | string | Required. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression) that matches the log entries to be excluded. By using the sample function (https://docs.cloud.google.com/logging/docs/view/logging-query-language#sample), you can exclude less than 100% of the matching log entries.For example, the following query matches 99% of low-severity log entries from Google Cloud Storage buckets:resource.type=gcs_bucket severity<ERROR sample(insertId, 0.99) |
| `name` | string | Optional. A client-assigned identifier, such as "load-balancer-exclusion". Identifiers are limited to 100 characters and can include only letters, digits, underscores, hyphens, and periods. First character has to be alphanumeric. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the exclusion.This field may not be present for older exclusions. |

### `LogLine`

- Application log line emitted while processing a request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logMessage` | string | App-provided log message. |
| `severity` | string enum | Severity of this log entry. Values: `DEFAULT`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`. |
| `sourceLocation` | SourceLocation | Where in the source code this log message was written. |
| `time` | string (google-datetime) | Approximate time when this log entry was made. |

### `LogMetric`

- Describes a logs-based metric. The value of the metric is the number of log entries that match a logs filter in a given time interval.Logs-based metrics can also be used to extract values from logs and create a distribution of the values. The distribution records the statistics of the extracted values along with an optional histogram of the values as specified by the bucket options.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | Optional. The resource name of the Log Bucket that owns the Log Metric. Only Log Buckets in projects are supported. The bucket has to be in the same project as the metric.For example:projects/my-project/locations/global/buckets/my-bucketIf empty, then the Log Metric is considered a non-Bucket Log Metric. |
| `bucketOptions` | BucketOptions | Optional. The bucket_options are required when the logs-based metric is using a DISTRIBUTION value type and it describes the bucket boundaries used to create a histogram of the extracted values. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the metric.This field may not be present for older metrics. |
| `description` | string | Optional. A description of this metric, which is used in documentation. The maximum length of the description is 8000 characters. |
| `disabled` | boolean | Optional. If set to True, then this metric is disabled and it does not generate any points. |
| `filter` | string | Required. An advanced logs filter (https://cloud.google.com/logging/docs/view/advanced_filters) which is used to match log entries. Example: "resource.type=gae_app AND severity>=ERROR" The maximum length of the filter is 20000 characters. |
| `labelExtractors` | object | Optional. A map from a label key string to an extractor expression which is used to extract data from a log entry field and assign as the label value. Each label key specified in the LabelDescriptor must have an associated extractor expression in this map. The syntax of the extractor expression is the same as for the value_extractor field.The extracted value is converted to the type defined in the label descriptor. If either the extraction or the type conversion fails, the label will have a default value. The default value for a string label is an empty string, for an integer label its 0, and for a boolean label its false.Note that there are upper bounds on the maximum number of labels and the number of active time series that are allowed in a project. |
| `metricDescriptor` | MetricDescriptor | Optional. The metric descriptor associated with the logs-based metric. If unspecified, it uses a default metric descriptor with a DELTA metric kind, INT64 value type, with no labels and a unit of "1". Such a metric counts the number of log entries matching the filter expression.The name, type, and description fields in the metric_descriptor are output only, and is constructed using the name and description field in the LogMetric.To create a logs-based metric that records a distribution of log values, a DELTA metric kind with a DISTRIBUTION value type must be used along with a value_extractor expression in the LogMetric.Each label in the metric descriptor must have a matching label name as the key and an extractor expression as the value in the label_extractors map.The metric_kind and value_type fields in the metric_descriptor cannot be updated once initially configured. New labels can be added in the metric_descriptor, but existing labels cannot be modified except for their description. |
| `name` | string | Required. The client-assigned metric identifier. Examples: "error_count", "nginx/requests".Metric identifiers are limited to 100 characters and can include only the following characters: A-Z, a-z, 0-9, and the special characters \_-.,+!\*',()%/. The forward-slash character (/) denotes a hierarchy of name pieces, and it cannot be the first character of the name.This field is the \[METRIC_ID\] part of a metric resource name in the format "projects/PROJECT_ID/metrics/METRIC_ID". Example: If the resource name of a metric is "projects/my-project/metrics/nginx%2Frequests", this field's value is "nginx/requests". |
| `resourceName` | string | Output only. The resource name of the metric: "projects/\[PROJECT_ID\]/metrics/\[METRIC_ID\]" |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the metric.This field may not be present for older metrics. |
| `valueExtractor` | string | Optional. A value_extractor is required when using a distribution logs-based metric to extract the values to record from a log entry. Two functions are supported for value extraction: EXTRACT(field) or REGEXP_EXTRACT(field, regex). The arguments are: field: The name of the log entry field from which the value is to be extracted. regex: A regular expression using the Google RE2 syntax (https://github.com/google/re2/wiki/Syntax) with a single capture group to extract data from the specified log entry field. The value of the field is converted to a string before applying the regex. It is an error to specify a regex that does not include exactly one capture group.The result of the extraction must be convertible to a double type, as the distribution always records double values. If either the extraction or the conversion to double fails, then those values are not recorded in the distribution.Example: REGEXP_EXTRACT(jsonPayload.request, ".\*quantity=(\d+).\*") |
| `version` | string enum | Deprecated. The API version that created or updated this metric. The v2 format is used by default and cannot be changed. Values: `V2`, `V1`. |

### `LogScope`

- Describes a group of resources to read log entries from.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the log scope. |
| `description` | string | Optional. Describes this log scope.The maximum length of the description is 8000 characters. |
| `name` | string | Output only. The resource name of the log scope.Log scopes are only available in the global location. For example:projects/my-project/locations/global/logScopes/my-log-scope |
| `resourceNames` | array<string> | Required. Names of one or more parent resources (organizations and folders are not supported.): projects/\[PROJECT_ID\]May alternatively be one or more views: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\]A log scope can include a maximum of 5 projects and a maximum of 100 resources in total. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the log scope. |

### `LogSink`

- Describes a sink used to export log entries to one of the following destinations: a Cloud Logging log bucket, a Cloud Storage bucket, a BigQuery dataset, a Pub/Sub topic, a Cloud project.A logs filter controls which log entries are exported. The sink must be created within a project, organization, billing account, or folder.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bigqueryOptions` | BigQueryOptions | Optional. Options that affect sinks exporting data to BigQuery. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the sink.This field may not be present for older sinks. |
| `description` | string | Optional. A description of this sink.The maximum length of the description is 8000 characters. |
| `destination` | string | Required. The export destination: "storage.googleapis.com/\[GCS_BUCKET\]" "bigquery.googleapis.com/projects/\[PROJECT_ID\]/datasets/\[DATASET\]" "pubsub.googleapis.com/projects/\[PROJECT_ID\]/topics/\[TOPIC_ID\]" "logging.googleapis.com/projects/\[PROJECT_ID\]" "logging.googleapis.com/projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" The sink's writer_identity, set when the sink is created, must have permission to write to the destination or else the log entries are not exported. For more information, see Route logs to supported destinations (https://docs.cloud.google.com/logging/docs/export/configure_export_v2). |
| `disabled` | boolean | Optional. If set to true, then this sink is disabled and it does not export any log entries. |
| `exclusions` | array<LogExclusion> | Optional. Log entries that match any of these exclusion filters will not be exported.If a log entry is matched by both filter and one of exclusions it will not be exported. |
| `filter` | string | Optional. An advanced logs filter (https://docs.cloud.google.com/logging/docs/view/building-queries#queries-by-expression). The only exported log entries are those that are in the resource owning the sink and that match the filter.For example:logName="projects/\[PROJECT_ID\]/logs/\[LOG_ID\]" AND severity>=ERROR |
| `includeChildren` | boolean | Optional. This field applies only to sinks owned by organizations and folders. If the field is false, the default, only the logs owned by the sink's parent resource are available for export. If the field is true, then log entries from all the projects, folders, and billing accounts contained in the sink's parent resource are also available for export. Whether a particular log entry from the children is exported depends on the sink's filter expression.For example, if this field is true, then the filter resource.type=gce_instance would export all Compute Engine VM instance log entries from all projects in the sink's parent.To only export entries from certain child projects, filter on the project part of the log name:logName:("projects/test-project1/" OR "projects/test-project2/") AND resource.type=gce_instance |
| `interceptChildren` | boolean | Optional. This field applies only to sinks owned by organizations and folders.When the value of 'intercept_children' is true, the following restrictions apply: The sink must have the include_children flag set to true. The sink destination must be a Cloud project.Also, the following behaviors apply: Any logs matched by the sink won't be included by non-\_Required sinks owned by child resources. The sink appears in the results of a ListSinks call from a child resource if the value of the filter field in its request is either 'in_scope("ALL")' or 'in_scope("ANCESTOR")'. |
| `name` | string | Optional. The client-assigned sink identifier, unique within the project.For example: "my-syslog-errors-to-pubsub".Sink identifiers are limited to 100 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, periods.First character has to be alphanumeric. |
| `outputVersionFormat` | string enum | Deprecated. This field is unused. Values: `VERSION_FORMAT_UNSPECIFIED`, `V2`, `V1`. |
| `resourceName` | string | Output only. The resource name of the sink. "projects/\[PROJECT_ID\]/sinks/\[SINK_NAME\] "organizations/\[ORGANIZATION_ID\]/sinks/\[SINK_NAME\] "billingAccounts/\[BILLING_ACCOUNT_ID\]/sinks/\[SINK_NAME\] "folders/\[FOLDER_ID\]/sinks/\[SINK_NAME\] For example: projects/my_project/sinks/SINK_NAME |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the sink.This field may not be present for older sinks. |
| `writerIdentity` | string | Output only. An IAM identity—a service account or group—under which Cloud Logging writes the exported log entries to the sink's destination. This field is either set by specifying custom_writer_identity or set automatically by sinks.create and sinks.update based on the value of unique_writer_identity in those methods.Until you grant this identity write-access to the destination, log entry exports from this sink will fail. For more information, see Manage access to projects, folders, and organizations (https://docs.cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource). Consult the destination service's documentation to determine the appropriate IAM roles to assign to the identity.Sinks that have a destination that is a log bucket in the same project as the sink cannot have a writer_identity and no additional permissions are required. |

### `LogSplit`

- Additional information used to correlate multiple log entries. Used when a single LogEntry would exceed the Google Cloud Logging size limit and is split across multiple log entries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `index` | integer (int32) | The index of this LogEntry in the sequence of split log entries. Log entries are given \|index\| values 0, 1, ..., n-1 for a sequence of n log entries. |
| `totalSplits` | integer (int32) | The total number of log entries that the original LogEntry was split into. |
| `uid` | string | A globally unique identifier for all log entries in a sequence of split log entries. All log entries with the same \|LogSplit.uid\| are assumed to be part of the same sequence of split log entries. |

### `LogView`

- Describes a view over log entries in a bucket.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the view. |
| `description` | string | Optional. Describes this view. |
| `filter` | string | Optional. Filter that restricts which log entries in a bucket are visible in this view.Filters must be logical conjunctions that use the AND operator, and they can use any of the following qualifiers: SOURCE(), which specifies a project, folder, organization, or billing account of origin. resource.type, which specifies the resource type. LOG_ID(), which identifies the log.They can also use the negations of these qualifiers with the NOT operator.For example:SOURCE("projects/myproject") AND resource.type = "gce_instance" AND NOT LOG_ID("stdout") |
| `name` | string | Output only. The resource name of the view.For example:projects/my-project/locations/global/buckets/my-bucket/views/my-view |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the view. |

### `LoggingQuery`

- Describes a Cloud Logging query that can be run in Logs Explorer UI or via the logging API.In addition to the query itself, additional information may be stored to capture the display configuration and other UI state used in association with analysis of query results.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `filter` | string | Required. An advanced query using the Logging Query Language (https://docs.cloud.google.com/logging/docs/view/logging-query-language). The maximum length of the filter is 20000 characters. |
| `summaryFieldEnd` | integer (int32) | Characters will be counted from the end of the string. |
| `summaryFieldStart` | integer (int32) | Characters will be counted from the start of the string. |
| `summaryFields` | array<SummaryField> | Optional. The set of summary fields to display for this saved query. |

### `MetricDescriptor`

- Defines a metric type and its schema. Once a metric descriptor is created, deleting or altering it stops data collection and makes the metric type's existing data unusable.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | A detailed description of the metric, which can be used in documentation. |
| `displayName` | string | A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. |
| `labels` | array<LabelDescriptor> | The set of labels that can be used to describe a specific instance of this metric type. For example, the appengine.googleapis.com/http/server/response_latencies metric type has a label for the HTTP response code, response_code, so you can look at latencies for successful responses or just for responses that failed. |
| `launchStage` | string enum | Optional. The launch stage of the metric definition. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `metadata` | MetricDescriptorMetadata | Optional. Metadata which can be used to guide usage of the metric. |
| `metricKind` | string enum | Whether the metric records instantaneous values, changes to a value, etc. Some combinations of metric_kind and value_type might not be supported. Values: `METRIC_KIND_UNSPECIFIED`, `GAUGE`, `DELTA`, `CUMULATIVE`. |
| `monitoredResourceTypes` | array<string> | Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. |
| `name` | string | The resource name of the metric descriptor. |
| `type` | string | The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name custom.googleapis.com or external.googleapis.com. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" |
| `unit` | string | The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values.Different systems might scale the values to be more easily displayed (so a value of 0.02kBy might be displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy). However, if the unit is kBy, then the value of the metric is always in thousands of bytes, no matter how it might be displayed.If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is written as 12005.Alternatively, if you want a custom metric to record data in a more granular way, you can create a DOUBLE CUMULATIVE metric whose unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are a subset of The Unified Code for Units of Measure (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these connectors: / division or ratio (as an infix operator). For examples, kBy/{email} or MiBy/10ms (although you should almost never have /s in a metric unit; rates should always be computed at query time from the underlying cumulative or delta value). . multiplication or composition (as an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( \[ PREFIX \] UNIT \| "%" ) \[ Annotation \] \| Annotation \| "1" ; Annotation = "{" NAME "}" ; Notes: Annotation is just a comment if it follows a UNIT. If the annotation is used alone, then the unit is equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s == By/s. NAME is a sequence of non-blank printable ASCII characters not containing { or }. 1 represents a unitary dimensionless unit (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in 1/s. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as 1/d or {new-users}/d (and a metric value 5 would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as 1000/d or k1/d or k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per day"). % represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value 0.03 means "3 percent"). |
| `valueType` | string enum | Whether the measurement is an integer, a floating-point number, etc. Some combinations of metric_kind and value_type might not be supported. Values: `VALUE_TYPE_UNSPECIFIED`, `BOOL`, `INT64`, `DOUBLE`, `STRING`, `DISTRIBUTION`, `MONEY`. |

### `MetricDescriptorMetadata`

- Additional annotations that can be used to guide the usage of a metric.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ingestDelay` | string (google-duration) | The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. |
| `launchStage` | string enum | Deprecated. Must use the MetricDescriptor.launch_stage instead. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `samplePeriod` | string (google-duration) | The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. |
| `timeSeriesResourceHierarchyLevel` | array<string> | The scope of the timeseries data of the metric. Values: `TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED`, `PROJECT`, `ORGANIZATION`, `FOLDER`. |

### `MonitoredResource`

- An object representing a resource that can be used for monitoring, logging, billing, or other purposes. Examples include virtual machine instances, databases, and storage devices such as disks. The type field identifies a MonitoredResourceDescriptor object that describes the resource's schema. Information in the labels field identifies the actual resource and its attributes according to the schema. For example, a particular Compute Engine VM instance could be represented by the following object, because the MonitoredResourceDescriptor for "gce_instance" has labels "project_id", "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id": "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}
- Version: v2

| Field | Type | Description |
|---|---|---|
| `labels` | object | Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone". |
| `type` | string | Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. Some descriptors include the service name in the type; for example, the type of a Datastream stream is datastream.googleapis.com/Stream. |

### `MonitoredResourceDescriptor`

- An object that describes the schema of a MonitoredResource object using a type name and a set of labels. For example, the monitored resource descriptor for Google Compute Engine VM instances has a type of "gce_instance" and specifies the use of the labels "instance_id" and "zone" to identify particular VM instances.Different APIs can support different monitored resource types. APIs generally provide a list method that returns the monitored resource descriptors used by the API.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A detailed description of the monitored resource type that might be used in documentation. |
| `displayName` | string | Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, "Google Cloud SQL Database". |
| `labels` | array<LabelDescriptor> | Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels "database_id" and "zone". |
| `launchStage` | string enum | Optional. The launch stage of the monitored resource definition. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `name` | string | Optional. The resource name of the monitored resource descriptor: "projects/{project_id}/monitoredResourceDescriptors/{type}" where {type} is the value of the type field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format "monitoredResourceDescriptors/{type}". |
| `type` | string | Required. The monitored resource type. For example, the type "cloudsql_database" represents databases in Google Cloud SQL. For a list of types, see Monitored resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list). |

### `MonitoredResourceMetadata`

- Auxiliary metadata for a MonitoredResource object. MonitoredResource objects contain the minimum set of information to uniquely identify a monitored resource instance. There is some other useful auxiliary metadata. Monitoring and Logging use an ingestion pipeline to extract metadata for cloud resources of all types, and store the metadata in this message.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `systemLabels` | object | Output only. Values for predefined system metadata labels. System labels are a kind of metadata extracted by Google, including "machine_image", "vpc", "subnet_id", "security_group", "name", etc. System label values can be only strings, Boolean values, or a list of strings. For example: { "name": "my-test-instance", "security_group": \["a", "b", "c"\], "spot_instance": false } |
| `userLabels` | object | Output only. A map of user-defined metadata labels. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. |

### `OpsAnalyticsQuery`

- Describes a query that can be run in Log Analytics.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `queryBuilder` | QueryBuilderConfig | Optional. A query builder configuration used in Log Analytics.If both query_builder and sql_query_text fields are set, then the sql_query_text will be used, if its non-empty. At least one of the two fields must be set. |
| `sqlQueryText` | string | Optional. A Log Analytics SQL query in text format.If both sql_query_text and query_builder fields are set, then the sql_query_text will be used, if its non-empty. At least one of the two fields must be set. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.A Policy is a collection of bindings. A binding binds one or more members, or principals, to a single role. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A role is a named list of permissions; each role can be an IAM predefined role or a user-created custom role.For some types of Google Cloud resources, a binding can also specify a condition, which is a logical expression that allows access to a resource only if the expression evaluates to true. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies).JSON example: { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } YAML example: bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of members, or principals, with a role. Optionally, may specify a condition that determines how and when the bindings are applied. Each of the bindings must contain at least one principal.The bindings in a Policy can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the bindings grant 50 different roles to user:alice@example.com, and not to any other principal, then you can add another 1,450 principals to the bindings in the Policy. |
| `etag` | string (byte) | etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to getIamPolicy, and systems are expected to put that etag in the request to setIamPolicy to ensure that their change will be applied to the same version of the policy.Important: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy.Valid values are 0, 1, and 3. Requests that specify an invalid value are rejected.Any operation that affects conditional role bindings must specify version 3. This requirement applies to the following operations: Getting a policy that includes a conditional role binding Adding a conditional role binding to a policy Changing a conditional role binding in a policy Removing any role binding, with or without a condition, from a policy that includes conditionsImportant: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost.If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ProjectedField`

- Represents a field selected in the query, analogous to an item in a SQL SELECT clause. It specifies the source field and optionally applies transformations like aggregation, casting, regex extraction, or assigns an alias. Use ProjectedField when you need more than just the raw source field name (for which you might use FieldSource directly in QueryBuilderConfig's field_sources list if no transformations or specific operation type are needed).A ProjectedField can represent either a field present in the data schema (specified via the field property) or a virtual field that is computed from other fields (specified via the virtual_field property).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `alias` | string | The alias name for the field. Valid alias examples are: - single word alias: TestAlias - numbers in an alias: Alias123 - multi word alias should be enclosed in quotes: "Test Alias" Invalid alias examples are: - alias containing keywords: WHERE, SELECT, FROM, etc. - alias starting with a number: 1stAlias |
| `cast` | string | The cast for the field. This can any SQL cast type. Examples: - STRING - CHAR - DATE - TIMESTAMP - DATETIME - INT - FLOAT |
| `field` | string | Optional. The field name. This will be the field that is selected using the dot notation to display the drill down value. |
| `operation` | string enum | Specifies the role of this field (direct selection, grouping, or aggregation). Values: `FIELD_OPERATION_UNSPECIFIED`, `NO_SETTING`, `GROUP_BY`, `AGGREGATE`. |
| `regexExtraction` | string | The re2 extraction for the field. This will be used to extract the value from the field using REGEXP_EXTRACT. More information on re2 can be found here: https://github.com/google/re2/wiki/Syntax. Meta characters like +?()\| will need to be escaped. Examples: - ".(autoscaler.\*)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(.\*(autoscaler.\*)$)")in SQL. - "\(test_value\)$" will be converted to REGEXP_EXTRACT(JSON_VALUE(field),"request(\(test_value\)$)") in SQL. |
| `sqlAggregationFunction` | FunctionApplication | The function to apply to the field. |
| `truncationGranularity` | string | The truncation granularity when grouping by a time/date field. This will be used to truncate the field to the granularity specified. This can be either a date or a time granularity found at https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_date and https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions#timestamp_trunc_granularity_time respectively. |
| `virtualField` | VirtualField | Optional. A virtual field definition, used in place of field to define a field that is computed from other fields rather than being directly present in the data schema.For example, a virtual field can be defined using COALESCE to select the first non-null value from a list of fields.If virtual_field is set, field must not be set. |

### `QueryBuilderConfig`

- Defines a structured query configuration that can be used instead of writing raw SQL. This configuration represents the components of a SQL query (FROM, SELECT, WHERE, ORDER BY, LIMIT) and is typically converted into an executable query (e.g., BigQuery SQL) by the backend service to retrieve data for analysis or visualization.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fieldSources` | array<FieldSource> | Defines the items to include in the query result, analogous to a SQL SELECT clause. |
| `filter` | FilterPredicate | The filter to use for the query. This equates to the WHERE clause in SQL. |
| `limit` | string (int64) | The limit to use for the query. This equates to the LIMIT clause in SQL. A limit of 0 will be treated as not enabled. |
| `orderBys` | array<SortOrderParameter> | The sort orders to use for the query. This equates to the ORDER BY clause in SQL. |
| `resourceNames` | array<string> | Required. The view/resource to query. For now only a single view/resource will be sent, but there are plans to allow multiple views in the future. Marking as repeated for that purpose. Example: - "projects/123/locations/global/buckets/456/views/\_Default" - "projects/123/locations/global/metricBuckets/456/views/\_Default" |
| `searchTerm` | string | The plain text search to use for the query. There is no support for multiple search terms. This uses the SEARCH functionality in BigQuery. For example, a search_term = 'ERROR' would result in the following SQL:SELECT \* FROM resource WHERE SEARCH(resource, 'ERROR') LIMIT 100 |

### `RecentQuery`

- Describes a recent query executed on the Logs Explorer or Log Analytics page within the last ~ 30 days.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `lastRunTime` | string (google-datetime) | Output only. The timestamp when this query was last run. |
| `loggingQuery` | LoggingQuery | Logging query that can be executed in Logs Explorer or via Logging API. |
| `name` | string | Output only. Resource name of the recent query.In the format: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/recentQueries/\[QUERY_ID\]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support)The QUERY_ID is a system generated alphanumeric ID. |
| `opsAnalyticsQuery` | OpsAnalyticsQuery | Analytics query that can be executed in Log Analytics. |

### `RequestLog`

- Complete log information about a single HTTP request to an App Engine application.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `appEngineRelease` | string | App Engine release version. |
| `appId` | string | Application that handled this request. |
| `cost` | number (double) | An indication of the relative cost of serving this request. |
| `endTime` | string (google-datetime) | Time when the request finished. |
| `finished` | boolean | Whether this request is finished or active. |
| `first` | boolean | Whether this is the first RequestLog entry for this request. If an active request has several RequestLog entries written to Stackdriver Logging, then this field will be set for one of them. |
| `host` | string | Internet host and port number of the resource being requested. |
| `httpVersion` | string | HTTP version of request. Example: "HTTP/1.1". |
| `instanceId` | string | An identifier for the instance that handled the request. |
| `instanceIndex` | integer (int32) | If the instance processing this request belongs to a manually scaled module, then this is the 0-based index of the instance. Otherwise, this value is -1. |
| `ip` | string | Origin IP address. |
| `latency` | string (google-duration) | Latency of the request. |
| `line` | array<LogLine> | A list of log lines emitted by the application while serving this request. |
| `megaCycles` | string (int64) | Number of CPU megacycles used to process request. |
| `method` | string | Request method. Example: "GET", "HEAD", "PUT", "POST", "DELETE". |
| `moduleId` | string | Module of the application that handled this request. |
| `nickname` | string | The logged-in user who made the request.Most likely, this is the part of the user's email before the @ sign. The field value is the same for different requests from the same user, but different users can have similar names. This information is also available to the application via the App Engine Users API.This field will be populated starting with App Engine 1.9.21. |
| `pendingTime` | string (google-duration) | Time this request spent in the pending request queue. |
| `referrer` | string | Referrer URL of request. |
| `requestId` | string | Globally unique identifier for a request, which is based on the request start time. Request IDs for requests which started later will compare greater as strings than those for requests which started earlier. |
| `resource` | string | Contains the path and query portion of the URL that was requested. For example, if the URL was "http://example.com/app?name=val", the resource would be "/app?name=val". The fragment identifier, which is identified by the # character, is not included. |
| `responseSize` | string (int64) | Size in bytes sent back to client by request. |
| `sourceReference` | array<SourceReference> | Source code for the application that handled this request. There can be more than one source reference per deployed application if source code is distributed among multiple repositories. |
| `spanId` | string | Stackdriver Trace span identifier for this request. |
| `startTime` | string (google-datetime) | Time when the request started. |
| `status` | integer (int32) | HTTP response status code. Example: 200, 404. |
| `taskName` | string | Task name of the request, in the case of an offline request. |
| `taskQueueName` | string | Queue name of the request, in the case of an offline request. |
| `traceId` | string | Stackdriver Trace identifier for this request. |
| `traceSampled` | boolean | If true, the value in the 'trace_id' field was sampled for storage in a trace backend. |
| `urlMapEntry` | string | File or class that handled the request. |
| `userAgent` | string | User agent that made the request. |
| `versionId` | string | Version of the application that handled this request. |
| `wasLoadingRequest` | boolean | Whether this was a loading request for the instance. |

### `SavedQuery`

- Describes a query that has been saved by a user.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the saved query was created. |
| `description` | string | Optional. A human readable description of the saved query. |
| `displayName` | string | Required. The user specified title for the SavedQuery. |
| `loggingQuery` | LoggingQuery | Logging query that can be executed in Logs Explorer or via Logging API. |
| `name` | string | Output only. Resource name of the saved query.In the format: "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/savedQueries/\[QUERY_ID\]" For a list of supported locations, see Supported Regions (https://docs.cloud.google.com/logging/docs/region-support#bucket-regions)After the saved query is created, the location cannot be changed.If the user doesn't provide a QUERY_ID, the system will generate an alphanumeric ID. |
| `opsAnalyticsQuery` | OpsAnalyticsQuery | Analytics query that can be executed in Log Analytics. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the saved query was last updated. |
| `visibility` | string enum | Required. The visibility status of this query, which determines its ownership. Values: `VISIBILITY_UNSPECIFIED`, `PRIVATE`, `SHARED`. |

### `SetIamPolicyRequest`

- Request message for SetIamPolicy method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used:paths: "bindings, etag" |

### `Settings`

- Describes the settings associated with a project, folder, organization, or billing account.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `defaultSinkConfig` | DefaultSinkConfig | Optional. Overrides the built-in configuration for \_Default sink. |
| `disableDefaultSink` | boolean | Optional. If set to true, the \_Default sink in newly created projects and folders will created in a disabled state. This can be used to automatically disable log storage if there is already an aggregated sink configured in the hierarchy. The \_Default sink can be re-enabled manually if needed. |
| `kmsKeyName` | string | Optional. The resource name for the configured Cloud KMS key.KMS key name format: "projects/\[PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[KEYRING\]/cryptoKeys/\[KEY\]" For example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To enable CMEK, set this field to a valid kms_key_name for which the associated service account has the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key.The Cloud KMS key used by the Log Router can be updated by changing the kms_key_name to a new valid key name.To disable CMEK for the Log Router, set this field to an empty string.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. |
| `kmsServiceAccountId` | string | Output only. The service account that will be used by the Log Router to access your Cloud KMS key.Before enabling CMEK, you must first assign the role roles/cloudkms.cryptoKeyEncrypterDecrypter to the service account that will be used to access your Cloud KMS key. Use GetSettings to obtain the service account ID.See Configure CMEK for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption) for more information. |
| `loggingServiceAccountId` | string | Output only. The service account for the given resource container, such as project or folder. Log sinks use this service account as their writer_identity if no custom service account is provided in the request when calling the create sink method. |
| `name` | string | Output only. The resource name of the settings. |
| `storageLocation` | string | Optional. The storage location for the \_Default and \_Required log buckets of newly created projects and folders, unless the storage location is explicitly provided.Example value: europe-west1.Note: this setting does not affect the location of resources where a location is explicitly provided when created, such as custom log buckets. |

### `SortOrderParameter`

- A sort order for a query based on a column.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fieldSource` | FieldSource | The field to sort on. Can be one of the FieldSource types: field name, alias ref, variable ref, or a literal value. |
| `sortOrderDirection` | string enum | The sort order to use for the query. Values: `SORT_ORDER_UNSPECIFIED`, `SORT_ORDER_NONE`, `SORT_ORDER_ASCENDING`, `SORT_ORDER_DESCENDING`. |

### `SourceLocation`

- Specifies a location in a source code file.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `file` | string | Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. |
| `functionName` | string | Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information is used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python). |
| `line` | string (int64) | Line within the source file. |

### `SourceReference`

- A reference to a particular snapshot of the source tree used to build and deploy an application.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `repository` | string | Optional. A URI string identifying the repository. Example: "https://github.com/GoogleCloudPlatform/kubernetes.git" |
| `revisionId` | string | The canonical and persistent identifier of the deployed revision. Example (git): "0035781c50ec7aa23385dc841529ce8a4b70db1b" |

### `Status`

- The Status type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each Status message contains three pieces of data: error code, error message, and error details.You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `SummaryField`

- A field from the LogEntry that is added to the summary line (https://docs.cloud.google.com/logging/docs/view/logs-explorer-interface#preferences) for a query in the Logs Explorer.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `field` | string | Optional. The field from the LogEntry to include in the summary line, for example resource.type or jsonPayload.name. |

### `SuppressionInfo`

- Information about entries that were omitted from the session.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `reason` | string enum | The reason that entries were omitted from the session. Values: `REASON_UNSPECIFIED`, `RATE_LIMIT`, `NOT_CONSUMED`. |
| `suppressedCount` | integer (int32) | A lower bound on the count of entries omitted due to reason. |

### `TailLogEntriesRequest`

- The parameters to TailLogEntries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bufferWindow` | string (google-duration) | Optional. The amount of time to buffer log entries at the server before being returned to prevent out of order results due to late arriving log entries. Valid values are between 0-60000 milliseconds. Defaults to 2000 milliseconds. |
| `filter` | string | Optional. A filter that chooses which log entries to return. For more information, see Logging query language (https://docs.cloud.google.com/logging/docs/view/logging-query-language).Only log entries that match the filter are returned. An empty filter matches all log entries in the resources listed in resource_names. Referencing a parent resource that is not listed in resource_names will cause the filter to return no results. The maximum length of a filter is 20,000 characters. |
| `resourceNames` | array<string> | Required. Name of a parent resource from which to retrieve log entries: projects/\[PROJECT_ID\] organizations/\[ORGANIZATION_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\] folders/\[FOLDER_ID\]May alternatively be one or more views: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]/views/\[VIEW_ID\] |

### `TailLogEntriesResponse`

- Result returned from TailLogEntries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `entries` | array<LogEntry> | A list of log entries. Each response in the stream will order entries with increasing values of LogEntry.timestamp. Ordering is not guaranteed between separate responses. |
| `suppressionInfo` | array<SuppressionInfo> | If entries that otherwise would have been included in the session were not sent back to the client, counts of relevant entries omitted from the session with the reason that they were not included. There will be at most one of each reason per response. The counts represent the number of suppressed entries since the last streamed response. |

### `TestIamPermissionsRequest`

- Request message for TestIamPermissions method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the resource. Permissions with wildcards (such as \* or storage.\*) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for TestIamPermissions method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of TestPermissionsRequest.permissions that the caller is allowed. |

### `UndeleteBucketRequest`

- The parameters to UndeleteBucket.
- Version: v2

### `UpdateBucketRequest`

- The parameters to UpdateBucket.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | LogBucket | Required. The updated bucket. |
| `name` | string | Required. The full resource name of the bucket to update. "projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "billingAccounts/\[BILLING_ACCOUNT_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" "folders/\[FOLDER_ID\]/locations/\[LOCATION_ID\]/buckets/\[BUCKET_ID\]" For example:"projects/my-project/locations/global/buckets/my-bucket" |
| `updateMask` | string (google-fieldmask) | Required. Field mask that specifies the fields in bucket that need an update. A bucket field will be overwritten if, and only if, it is in the update mask. name and output only fields cannot be updated.For a detailed FieldMask definition, see: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor example: updateMask=retention_days |

### `VirtualField`

- A virtual field is a field that is not physically present in the underlying data schema, but is created through specific operations within the query builder model based on other fields in the schema.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `underlyingFieldSources` | array<FieldSource> | The field sources that will be used to create the virtual field, based on the semantics of the virtual field type.The field sources must follow these rules, based on the virtual field type: - For VIRTUAL_FIELD_TYPE_UNSPECIFIED, this field must be empty. - For COALESCE, this field must be non-empty and include a minimum of two field sources. The underlying field sources must be actual projected fields that represent actual schema fields and that must not be transformed and aggregated in any way, except for casting. The type of all the underlying field sources must be equivalent so that picking one of them would result in the same value type. |
| `virtualFieldType` | string enum | Required. The type of the virtual field. Values: `VIRTUAL_FIELD_TYPE_UNSPECIFIED`, `COALESCE`. |

### `WriteLogEntriesRequest`

- The parameters to WriteLogEntries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dryRun` | boolean | Optional. If true, the request should expect normal response, but the entries won't be persisted nor exported. Useful for checking whether the logging API endpoints are working properly before sending valuable data. |
| `entries` | array<LogEntry> | Required. The log entries to send to Logging. The order of log entries in this list does not matter. Values supplied in this method's log_name, resource, and labels fields are copied into those log entries in this list that do not include values for their corresponding fields. For more information, see the LogEntry type.If the timestamp or insert_id fields are missing in log entries, then this method supplies the current time or a unique identifier, respectively. The supplied values are chosen so that, among the log entries that did not supply their own values, the entries earlier in the list will sort before the entries later in the list. See the entries.list method.Log entries with timestamps that are more than the logs retention period (https://docs.cloud.google.com/logging/quotas) in the past or more than 24 hours in the future will not be available when calling entries.list. However, those log entries can still be exported with LogSinks (https://docs.cloud.google.com/logging/docs/routing/overview).To improve throughput and to avoid exceeding the quota limit (https://docs.cloud.google.com/logging/quotas) for calls to entries.write, you should try to include several log entries in this list, rather than calling this method for each individual log entry. |
| `labels` | object | Optional. Default labels that are added to the labels field of all log entries in entries. If a log entry already has a label with the same key as a label in this parameter, then the log entry's label is not changed. See LogEntry. |
| `logName` | string | Optional. A default log resource name that is assigned to all log entries in entries that do not specify a value for log_name: projects/\[PROJECT_ID\]/logs/\[LOG_ID\] organizations/\[ORGANIZATION_ID\]/logs/\[LOG_ID\] billingAccounts/\[BILLING_ACCOUNT_ID\]/logs/\[LOG_ID\] folders/\[FOLDER_ID\]/logs/\[LOG_ID\]\[LOG_ID\] must be URL-encoded. For example: "projects/my-project-id/logs/syslog" "organizations/123/logs/cloudaudit.googleapis.com%2Factivity" The permission logging.logEntries.create is needed on each project, organization, billing account, or folder that is receiving new log entries, whether the resource is specified in logName or in an individual log entry.Only platform services can write logs to billing accounts. |
| `partialSuccess` | boolean | Optional. Whether a batch's valid entries should be written even if some other entry failed due to a permanent error such as INVALID_ARGUMENT or PERMISSION_DENIED. If any entry failed, then the response status is the response status of one of the failed entries. The response will include error details in WriteLogEntriesPartialErrors.log_entry_errors keyed by the entries' zero-based index in the entries. Failed requests for which no entries are written will not include per-entry errors. |
| `resource` | MonitoredResource | Optional. A default monitored resource object that is assigned to all log entries in entries that do not specify a value for resource. Example: { "type": "gce_instance", "labels": { "zone": "us-central1-a", "instance_id": "00000000000000000000" }} See LogEntry. |

### `WriteLogEntriesResponse`

- Result returned from WriteLogEntries.
- Version: v2

### Shape of `AppHub`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "application": "AppHubApplication",
  "service": "AppHubService",
  "workload": "AppHubWorkload"
}
```

## Notes

- Generated from the Discovery document(s) v2 of `logging` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://logging.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
