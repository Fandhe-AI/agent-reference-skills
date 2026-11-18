---
source: https://pubsub.googleapis.com/$discovery/rest?version=v1
---

# Cloud Pub/Sub API message schemas (pubsub)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/pubsub/`.

### `AIInference`

- Configuration for making inference requests against Vertex AI models.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpoint` | string | Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint. |
| `serviceAccountEmail` | string | Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `unstructuredInference` | UnstructuredInference | Optional. Requests and responses can be any arbitrary JSON object. |

### `AcknowledgeRequest`

- Request for the Acknowledge method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ackIds` | array<string> | Required. The acknowledgment ID for the messages being acknowledged that was returned by the Pub/Sub system in the `Pull` response. Must not be empty. |

### `AcknowledgeRequest` (v1beta1a)

- Request for the Acknowledge method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `ackId` | array<string> | The acknowledgment ID for the message being acknowledged. This was returned by the Pub/Sub system in the Pull response. |
| `subscription` | string | The subscription whose message is being acknowledged. |

### `AnalyticsHubSubscriptionInfo`

- Information about an associated Analytics Hub subscription (https://cloud.google.com/bigquery/docs/analytics-hub-manage-subscriptions).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `listing` | string | Optional. The name of the associated Analytics Hub listing resource. Pattern: "projects/{project}/locations/{location}/dataExchanges/{data_exchange}/listings/{listing}" |
| `subscription` | string | Optional. The name of the associated Analytics Hub subscription resource. Pattern: "projects/{project}/locations/{location}/subscriptions/{subscription}" |

### `AvroConfig`

- Configuration for writing message data in Avro format. Message payloads and metadata will be written to files as an Avro binary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `useTopicSchema` | boolean | Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists. |
| `writeMetadata` | boolean | Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map. |

### `AvroFormat`

- Configuration for reading Cloud Storage data in Avro binary format. The bytes of each object will be set to the `data` field of a Pub/Sub message.
- Version: v1

### `AwsKinesis`

- Ingestion settings for Amazon Kinesis Data Streams.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `awsRoleArn` | string | Required. AWS role ARN to be used for Federated Identity authentication with Kinesis. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it. |
| `consumerArn` | string | Required. The Kinesis consumer ARN to used for ingestion in Enhanced Fan-Out mode. The consumer must be already created and ready to be used. |
| `gcpServiceAccount` | string | Required. The GCP service account to be used for Federated Identity authentication with Kinesis (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number. |
| `state` | string enum | Output only. An output-only field that indicates the state of the Kinesis ingestion source. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `KINESIS_PERMISSION_DENIED`, `PUBLISH_PERMISSION_DENIED`, `STREAM_NOT_FOUND`, `CONSUMER_NOT_FOUND`, `CONFLICTING_REGION_CONSTRAINTS`. |
| `streamArn` | string | Required. The Kinesis stream ARN to ingest data from. |

### `AwsMsk`

- Ingestion settings for Amazon MSK.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `awsRoleArn` | string | Required. AWS role ARN to be used for Federated Identity authentication with Amazon MSK. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it. |
| `clusterArn` | string | Required. The Amazon Resource Name (ARN) that uniquely identifies the cluster. |
| `gcpServiceAccount` | string | Required. The GCP service account to be used for Federated Identity authentication with Amazon MSK (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number. |
| `state` | string enum | Output only. An output-only field that indicates the state of the Amazon MSK ingestion source. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `MSK_PERMISSION_DENIED`, `PUBLISH_PERMISSION_DENIED`, `CLUSTER_NOT_FOUND`, `TOPIC_NOT_FOUND`, `CONFLICTING_REGION_CONSTRAINTS`. |
| `topic` | string | Required. The name of the topic in the Amazon MSK cluster that Pub/Sub will import from. |

### `AzureEventHubs`

- Ingestion settings for Azure Event Hubs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Optional. The client id of the Azure application that is being used to authenticate Pub/Sub. |
| `eventHub` | string | Optional. The name of the Event Hub. |
| `gcpServiceAccount` | string | Optional. The GCP service account to be used for Federated Identity authentication. |
| `namespace` | string | Optional. The name of the Event Hubs namespace. |
| `resourceGroup` | string | Optional. Name of the resource group within the azure subscription. |
| `state` | string enum | Output only. An output-only field that indicates the state of the Event Hubs ingestion source. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `EVENT_HUBS_PERMISSION_DENIED`, `PUBLISH_PERMISSION_DENIED`, `NAMESPACE_NOT_FOUND`, `EVENT_HUB_NOT_FOUND`, `SUBSCRIPTION_NOT_FOUND`, `RESOURCE_GROUP_NOT_FOUND`, `CONFLICTING_REGION_CONSTRAINTS`. |
| `subscriptionId` | string | Optional. The Azure subscription id. |
| `tenantId` | string | Optional. The tenant id of the Azure application that is being used to authenticate Pub/Sub. |

### `BigQueryConfig`

- Configuration for a BigQuery subscription.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dropUnknownFields` | boolean | Optional. If true and `use_topic_schema` is true, drops any fields that are part of the topic schema that are not part of the BigQuery table schema when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog. If true and `use_table_schema` is true, drops any fields in the message that are not part of the BigQuery table schema when writing to BigQuery. Otherwise, the write to BigQuery will fail. |
| `serviceAccountEmail` | string | Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `state` | string enum | Output only. An output-only field that indicates whether or not the subscription can receive messages. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `PERMISSION_DENIED`, `NOT_FOUND`, `SCHEMA_MISMATCH`, `IN_TRANSIT_LOCATION_RESTRICTION`, `VERTEX_AI_LOCATION_RESTRICTION`. |
| `table` | string | Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId} |
| `useTableSchema` | boolean | Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time. |
| `useTopicSchema` | boolean | Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time. |
| `writeMetadata` | boolean | Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column. |

### `BigtableConfig`

- Configuration for a Bigtable subscription, which will write a Pub/Sub message to a Bigtable row. See the ColumnFamilyMapping documentation below for details on how the row keys and columns will be written.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appProfileId` | string | Optional. The app profile to use for the Bigtable writes. If not specified, the "default" application profile will be used. The app profile must use single-cluster routing. |
| `columnFamilyMapping` | ColumnFamilyMapping | Optional. Configuration that allows writing row keys and/or columns based on fields in the input message. The input message format must be JSON if this field is set. |
| `serviceAccountEmail` | string | Optional. The service account to use to write to Bigtable. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `state` | string enum | Output only. An output-only field that indicates whether or not the subscription can receive messages. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `NOT_FOUND`, `APP_PROFILE_MISCONFIGURED`, `PERMISSION_DENIED`, `SCHEMA_MISMATCH`, `IN_TRANSIT_LOCATION_RESTRICTION`, `VERTEX_AI_LOCATION_RESTRICTION`. |
| `table` | string | Optional. The unique name of the table to write messages to. Values are of the form `projects//instances//tables/`. |
| `writeMetadata` | boolean | Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table under the pubsub_metadata column family. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CloudStorage`

- Ingestion settings for Cloud Storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `avroFormat` | AvroFormat | Optional. Data from Cloud Storage will be interpreted in Avro format. |
| `bucket` | string | Optional. Cloud Storage bucket. The bucket name must be without any prefix like "gs://". See the \[bucket naming requirements\]( https://cloud.google.com/storage/docs/buckets#naming). |
| `matchGlob` | string | Optional. Glob pattern used to match objects that will be ingested. If unset, all objects will be ingested. See the supported patterns (https://cloud.google.com/storage/docs/json_api/v1/objects/list#list-objects-and-prefixes-using-glob). |
| `minimumObjectCreateTime` | string (google-datetime) | Optional. Only objects with a larger or equal creation timestamp will be ingested. |
| `pubsubAvroFormat` | PubSubAvroFormat | Optional. It will be assumed data from Cloud Storage was written via Cloud Storage subscriptions (https://cloud.google.com/pubsub/docs/cloudstorage). |
| `state` | string enum | Output only. An output-only field that indicates the state of the Cloud Storage ingestion source. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CLOUD_STORAGE_PERMISSION_DENIED`, `PUBLISH_PERMISSION_DENIED`, `BUCKET_NOT_FOUND`, `TOO_MANY_OBJECTS`, `CONFLICTING_REGION_CONSTRAINTS`. |
| `textFormat` | TextFormat | Optional. Data from Cloud Storage will be interpreted as text. |

### `CloudStorageConfig`

- Configuration for a Cloud Storage subscription.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `avroConfig` | AvroConfig | Optional. If set, message data will be written to Cloud Storage in Avro format. |
| `bucket` | string | Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the \[bucket naming requirements\] (https://cloud.google.com/storage/docs/buckets#naming). |
| `filenameDatetimeFormat` | string | Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the datetime format guidance (https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names). |
| `filenamePrefix` | string | Optional. User-provided prefix for Cloud Storage filename. See the object naming requirements (https://cloud.google.com/storage/docs/objects#naming). |
| `filenameSuffix` | string | Optional. User-provided suffix for Cloud Storage filename. See the object naming requirements (https://cloud.google.com/storage/docs/objects#naming). Must not end in "/". |
| `maxBytes` | string (int64) | Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit. |
| `maxDuration` | string (google-duration) | Optional. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgment deadline. |
| `maxMessages` | string (int64) | Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages. |
| `serviceAccountEmail` | string | Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `state` | string enum | Output only. An output-only field that indicates whether or not the subscription can receive messages. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `PERMISSION_DENIED`, `NOT_FOUND`, `IN_TRANSIT_LOCATION_RESTRICTION`, `SCHEMA_MISMATCH`, `VERTEX_AI_LOCATION_RESTRICTION`. |
| `textConfig` | TextConfig | Optional. If set, message data will be written to Cloud Storage in text format. |

### `ColumnFamilyMapping`

- Configuration for writing a Pub/Sub message to a Bigtable row with a user-defined key and writing to column families. If this field is set: - The subscription messages must be formatted as JSON. - The row key mapping is configured in the `key_definition` section. - The top-level fields will be written either: - By default, they will be written to the `data` column family with the field name as the column qualifier. - But if the field name matches an existing column family (except for the default `data` column), then that field will be written to that column family, either as a scalar or its next level nested fields if it's a JSON object. - The cell timestamp will be the message publish timestamp. If the field is not set, the default behavior is to write: - row key: subscription name, message ID hash, and message ID delimited by `#`. - columns: message bytes written to a single column family `data` with an empty-string column qualifier. - cell timestamp: the message publish timestamp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimitedKey` | DelimitedKey | Optional. If set, the row key is constructed from the given key fields and delimiter. All key fields must be present in the message; otherwise, the message remains in the subscription backlog. |
| `rowKeySchema` | RowKeySchema | Optional. If set, the row key is constructed from the field names of the table's structured row key ({$universe.dns_names.final_documentation_domain}/bigtable/docs/manage-row-key-schemas). Note that if the field is nullable in the structured row key, then it need not be present in the message; null will be used instead. |

### `CommitSchemaRequest`

- Request for CommitSchema method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schema` | Schema | Required. The schema revision to commit. |

### `CompiledProtoSchema`

- Configuration specific to compiled Protocol Buffer schemas.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compiledBytes` | string (byte) | Required. The compiled FileDescriptorSet binary. |
| `rootMessage` | string | Required. The name of the root message type in the schema. |

### `Compression`

- Configuration for compressing/decompressing message data using a user-specified compression algorithm.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compressionAlgorithm` | string enum | Required. Specifies the compression algorithm to use. Values: `COMPRESSION_ALGORITHM_UNSPECIFIED`, `ZLIB`. |
| `compressionMode` | string enum | Required. Specifies whether to compress or decompress the message. Values: `COMPRESSION_MODE_UNSPECIFIED`, `COMPRESS`, `DECOMPRESS`. |

### `ConfluentCloud`

- Ingestion settings for Confluent Cloud.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootstrapServer` | string | Required. The address of the bootstrap server. The format is url:port. |
| `clusterId` | string | Required. The id of the cluster. |
| `gcpServiceAccount` | string | Required. The GCP service account to be used for Federated Identity authentication with `identity_pool_id`. |
| `identityPoolId` | string | Required. The id of the identity pool to be used for Federated Identity authentication with Confluent Cloud. See https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/identity-providers/oauth/identity-pools.html#add-oauth-identity-pools. |
| `state` | string enum | Output only. An output-only field that indicates the state of the Confluent Cloud ingestion source. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `CONFLUENT_CLOUD_PERMISSION_DENIED`, `PUBLISH_PERMISSION_DENIED`, `UNREACHABLE_BOOTSTRAP_SERVER`, `CLUSTER_NOT_FOUND`, `TOPIC_NOT_FOUND`, `CONFLICTING_REGION_CONSTRAINTS`. |
| `topic` | string | Required. The name of the topic in the Confluent Cloud cluster that Pub/Sub will import from. |

### `CreateSnapshotRequest`

- Request for the `CreateSnapshot` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Optional. See Creating and managing labels (https://cloud.google.com/pubsub/docs/labels). |
| `subscription` | string | Required. The subscription whose backlog the snapshot retains. Specifically, the created snapshot is guaranteed to retain: (a) The existing backlog on the subscription. More precisely, this is defined as the messages in the subscription's backlog that are unacknowledged upon the successful completion of the `CreateSnapshot` request; as well as: (b) Any messages published to the subscription's topic following the successful completion of the CreateSnapshot request. Format is `projects/{project}/subscriptions/{sub}`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See https://{$universe.dns_names.final_documentation_domain}/pubsub/docs/tags for more information on using tags with Pub/Sub resources. |

### `DeadLetterPolicy`

- Dead lettering is done on a best effort basis. The same message might be dead lettered multiple times. If validation on any of the fields fails at subscription creation/updation, the create/update subscription request will fail.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deadLetterTopic` | string | Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost. |
| `maxDeliveryAttempts` | integer (int32) | Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgment deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used. |

### `DelimitedKey`

- Row key definition based on fields from the message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimiter` | string (byte) | Optional. Byte sequence used to delimit concatenated fields. Must be specified if multiple key fields are used. The delimiter must contain at least 1 character and at most 50 characters. |
| `keyFields` | array<string> | Required. The key fields to construct from the row key. The fields must be present in the message as a top-level field, i.e. JSON path expressions will not traverse into nested objects. |

### `DetachSubscriptionResponse`

- Response for the DetachSubscription method. Reserved for future use.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExpirationPolicy`

- A policy that specifies the conditions for resource expiration (i.e., automatic resource deletion).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ttl` | string (google-duration) | Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `IngestionDataSourceSettings`

- Settings for an ingestion data source on a topic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `awsKinesis` | AwsKinesis | Optional. Amazon Kinesis Data Streams. |
| `awsMsk` | AwsMsk | Optional. Amazon MSK. |
| `azureEventHubs` | AzureEventHubs | Optional. Azure Event Hubs. |
| `cloudStorage` | CloudStorage | Optional. Cloud Storage. |
| `confluentCloud` | ConfluentCloud | Optional. Confluent Cloud. |
| `platformLogsSettings` | PlatformLogsSettings | Optional. Platform Logs settings. If unset, no Platform Logs will be generated. |

### `JavaScriptUDF`

- User-defined JavaScript function that can transform or filter a Pub/Sub message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | Required. JavaScript code that contains a function `function_name` with the below signature: /\*\* \* Transforms a Pub/Sub message. \* @return {(Object)>\|null)} - To \* filter a message, return `null`. To transform a message return a map \* with the following keys: \* - (required) 'data' : {string} \* - (optional) 'attributes' : {Object} \* Returning empty `attributes` will remove all attributes from the \* message. \* \* @param {(Object)>} Pub/Sub \* message. Keys: \* - (required) 'data' : {string} \* - (required) 'attributes' : {Object} \* \* @param {Object} metadata - Pub/Sub message metadata. \* Keys: \* - (optional) 'message_id' : {string} \* - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format \* - (optional) 'ordering_key': {string} \*/ function (message, metadata) { } |
| `functionName` | string | Required. Name of the JavasScript function that should applied to Pub/Sub messages. |

### `Label`

- A key-value pair applied to a given object.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `key` | string | The key of a label is a syntactically valid URL (as per RFC 1738) with the "scheme" and initial slashes omitted and with the additional restrictions noted below. Each key should be globally unique. The "host" portion is called the "namespace" and is not necessarily resolvable to a network endpoint. Instead, the namespace indicates what system or entity defines the semantics of the label. Namespaces do not restrict the set of objects to which a label may be associated. Keys are defined by the following grammar: key = hostname "/" kpath kpath = ksegment \*\[ "/" ksegment \] ksegment = alphadigit \| \*\[ alphadigit \| "-" \| "\_" \| "." \] where "hostname" and "alphadigit" are defined as in RFC 1738. Example key: spanner.google.com/universe |
| `numValue` | string (int64) | An integer value. |
| `strValue` | string | A string value. |

### `ListSchemaRevisionsResponse`

- Response for the `ListSchemaRevisions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |
| `schemas` | array<Schema> | The revisions of the schema. |

### `ListSchemasResponse`

- Response for the `ListSchemas` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If not empty, indicates that there may be more schemas that match the request; this value should be passed in a new `ListSchemasRequest`. |
| `schemas` | array<Schema> | The resulting schemas. |

### `ListSnapshotsResponse`

- Response for the `ListSnapshots` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. If not empty, indicates that there may be more snapshot that match the request; this value should be passed in a new `ListSnapshotsRequest`. |
| `snapshots` | array<Snapshot> | Optional. The resulting snapshots. |

### `ListSubscriptionsResponse`

- Response for the `ListSubscriptions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. If not empty, indicates that there may be more subscriptions that match the request; this value should be passed in a new `ListSubscriptionsRequest` to get more subscriptions. |
| `subscriptions` | array<Subscription> | Optional. The subscriptions that match the request. |

### `ListSubscriptionsResponse` (v1beta1a)

- Response for the ListSubscriptions method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If not empty, indicates that there are more subscriptions that match the request and this value should be passed to the next ListSubscriptionsRequest to continue. |
| `subscription` | array<Subscription> | The subscriptions that match the request. |

### `ListTopicSnapshotsResponse`

- Response for the `ListTopicSnapshots` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. If not empty, indicates that there may be more snapshots that match the request; this value should be passed in a new `ListTopicSnapshotsRequest` to get more snapshots. |
| `snapshots` | array<string> | Optional. The names of the snapshots that match the request. |

### `ListTopicSubscriptionsResponse`

- Response for the `ListTopicSubscriptions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. If not empty, indicates that there may be more subscriptions that match the request; this value should be passed in a new `ListTopicSubscriptionsRequest` to get more subscriptions. |
| `subscriptions` | array<string> | Optional. The names of subscriptions attached to the topic specified in the request. |

### `ListTopicsResponse`

- Response for the `ListTopics` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. If not empty, indicates that there may be more topics that match the request; this value should be passed in a new `ListTopicsRequest`. |
| `topics` | array<Topic> | Optional. The resulting topics. |

### `ListTopicsResponse` (v1beta1a)

- Response for the ListTopics method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If not empty, indicates that there are more topics that match the request, and this value should be passed to the next ListTopicsRequest to continue. |
| `topic` | array<Topic> | The resulting topics. |

### `MessageStoragePolicy`

- A policy constraining the storage of messages published to the topic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedPersistenceRegions` | array<string> | Optional. A list of IDs of Google Cloud regions where messages that are published to the topic may be persisted in storage. Messages published by publishers running in non-allowed Google Cloud regions (or running outside of Google Cloud altogether) are routed for storage in one of the allowed regions. An empty list means that no regions are allowed, and is not a valid configuration. |
| `enforceInTransit` | boolean | Optional. If true, `allowed_persistence_regions` is also used to enforce in-transit guarantees for messages. That is, Pub/Sub will fail Publish operations on this topic and subscribe operations on any subscription attached to this topic in any region that is not in `allowed_persistence_regions`. |

### `MessageTransform`

- All supported message transforms types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aiInference` | AIInference | Optional. AI Inference. Specifies the Vertex AI endpoint that inference requests built from the Pub/Sub message data and provided parameters will be sent to. |
| `compression` | Compression | Optional. Compression/Decompression. |
| `disabled` | boolean | Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`. |
| `enabled` | boolean | Optional. This field is deprecated, use the `disabled` field to disable transforms. |
| `javascriptUdf` | JavaScriptUDF | Optional. JavaScript User Defined Function. If multiple JavaScriptUDF's are specified on a resource, each must have a unique `function_name`. |

### `ModifyAckDeadlineRequest`

- Request for the ModifyAckDeadline method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ackDeadlineSeconds` | integer (int32) | Required. The new ack deadline with respect to the time this request was sent to the Pub/Sub system. For example, if the value is 10, the new ack deadline will expire 10 seconds after the `ModifyAckDeadline` call was made. Specifying zero might immediately make the message available for delivery to another subscriber client. This typically results in an increase in the rate of message redeliveries (that is, duplicates). The minimum deadline you can specify is 0 seconds. The maximum deadline you can specify in a single request is 600 seconds (10 minutes). |
| `ackIds` | array<string> | Required. List of acknowledgment IDs. |

### `ModifyAckDeadlineRequest` (v1beta1a)

- Request for the ModifyAckDeadline method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `ackDeadlineSeconds` | integer (int32) | The new ack deadline with respect to the time this request was sent to the Pub/Sub system. Must be >= 0. For example, if the value is 10, the new ack deadline will expire 10 seconds after the ModifyAckDeadline call was made. Specifying zero may immediately make the message available for another pull request. |
| `ackId` | string | The acknowledgment ID. Either this or ack_ids must be populated, not both. |
| `ackIds` | array<string> | List of acknowledgment IDs. Either this field or ack_id should be populated, not both. |
| `subscription` | string | Next Index: 5 The name of the subscription from which messages are being pulled. |

### `ModifyAckDeadlineRequest` (v1beta2)

- Request for the ModifyAckDeadline method.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `ackDeadlineSeconds` | integer (int32) | The new ack deadline with respect to the time this request was sent to the Pub/Sub system. Must be >= 0. For example, if the value is 10, the new ack deadline will expire 10 seconds after the `ModifyAckDeadline` call was made. Specifying zero may immediately make the message available for another pull request. |
| `ackId` | string | The acknowledgment ID. Either this or ack_ids must be populated, but not both. |
| `ackIds` | array<string> | List of acknowledgment IDs. |

### `ModifyPushConfigRequest`

- Request for the ModifyPushConfig method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pushConfig` | PushConfig | Required. The push configuration for future deliveries. An empty `pushConfig` indicates that the Pub/Sub system should stop pushing messages from the given subscription and allow messages to be pulled and acknowledged - effectively pausing the subscription if `Pull` or `StreamingPull` is not called. |

### `ModifyPushConfigRequest` (v1beta1a)

- Request for the ModifyPushConfig method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `pushConfig` | PushConfig | An empty push_config indicates that the Pub/Sub system should pause pushing messages from the given subscription. |
| `subscription` | string | The name of the subscription. |

### `NoWrapper`

- Sets the `data` field as the HTTP body for delivery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `writeMetadata` | boolean | Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-:` headers of the HTTP request. Writes the Pub/Sub message attributes to `:` headers of the HTTP request. |

### `OidcToken`

- Contains information needed for generating an OpenID Connect token (https://developers.google.com/identity/protocols/OpenIDConnect).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `audience` | string | Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used. |
| `serviceAccountEmail` | string | Optional. Service account email (https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see Push subscriptions (https://cloud.google.com/pubsub/docs/push). |

### `PlatformLogsSettings`

- Settings for Platform Logs produced by Pub/Sub.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `severity` | string enum | Optional. The minimum severity level of Platform Logs that will be written. Values: `SEVERITY_UNSPECIFIED`, `DISABLED`, `DEBUG`, `INFO`, `WARNING`, `ERROR`. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PubSubAvroFormat`

- Configuration for reading Cloud Storage data written via Cloud Storage subscriptions (https://cloud.google.com/pubsub/docs/cloudstorage). The data and attributes fields of the originally exported Pub/Sub message will be restored when publishing.
- Version: v1

### `PublishBatchRequest`

- Request for the PublishBatch method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `messages` | array<PubsubMessage> | The messages to publish. |
| `topic` | string | The messages in the request will be published on this topic. |

### `PublishBatchResponse`

- Response for the PublishBatch method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `messageIds` | array<string> | The server-assigned ID of each published message, in the same order as the messages in the request. IDs are guaranteed to be unique within the topic. |

### `PublishOperation`

- Telemetry about a `Publish` operation which may or may not be common across individual RPCs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hedgedAttemptCount` | integer (int32) | Optional. If the publisher client is using publish hedging, provides the attempt count for the hedge (starting at 1). A value of 0 indicates that the request was not hedged. |
| `publishStartTime` | string (google-datetime) | Optional. Time at which the `publish()` call was initiated in the client library, meaning across all RPC retry attempts, see grpc retries (https://grpc.io/docs/guides/retry/). Provides a sense of the end-to-end publish duration from the client perspective, across retries. |

### `PublishRequest`

- Request for the Publish method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `messages` | array<PubsubMessage> | Required. The messages to publish. |

### `PublishRequest` (v1beta1a)

- Request for the Publish method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `message` | PubsubMessage | The message to publish. |
| `topic` | string | The message in the request will be published on this topic. |

### `PublishResponse`

- Response for the `Publish` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `messageIds` | array<string> | Optional. The server-assigned ID of each published message, in the same order as the messages in the request. IDs are guaranteed to be unique within the topic. |

### `PubsubClientTelemetry`

- Client-side telemetry about Pub/Sub requests, useful for debugging purposes. If the client opts to provide this information, it will be passed as a serialized proto in the `x-goog-pubsub-client-telemetry` header.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publishOperation` | PublishOperation | Optional. Telemetry about a `Publish` operation. |

### `PubsubEvent`

- An event indicating a received message or truncation event.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `deleted` | boolean | Indicates that this subscription has been deleted. (Note that pull subscribers will always receive NOT_FOUND in response in their pull request on the subscription, rather than seeing this boolean.) |
| `message` | PubsubMessage | A received message. |
| `subscription` | string | The subscription that received the event. |
| `truncated` | boolean | Indicates that this subscription has been truncated. |

### `PubsubMessage`

- A message that is published by publishers and consumed by subscribers. The message must contain either a non-empty data field or at least one attribute. Note that client libraries represent this object differently depending on the language. See the corresponding client library documentation (https://cloud.google.com/pubsub/docs/reference/libraries) for more information. See \[quotas and limits\]( https://cloud.google.com/pubsub/quotas) for more information about message limits.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. Attributes for this message. If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription. |
| `data` | string (byte) | Optional. The message data field. If this field is empty, the message must contain at least one attribute. |
| `messageId` | string | ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. |
| `orderingKey` | string | Optional. If non-empty, identifies related messages for which publish order should be respected. If a `Subscription` has `enable_message_ordering` set to `true`, messages published with the same non-empty `ordering_key` value will be delivered to subscribers in the order in which they are received by the Pub/Sub system. All `PubsubMessage`s published in a given `PublishRequest` must specify the same `ordering_key` value. For more information, see ordering messages (https://cloud.google.com/pubsub/docs/ordering). |
| `publishTime` | string (google-datetime) | The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. |

### `PubsubMessage` (v1beta1a)

- A message data and its labels.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `data` | string (byte) | The message payload. |
| `label` | array<Label> | Optional list of labels for this message. Keys in this collection must be unique. |
| `messageId` | string | ID of this message assigned by the server at publication time. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a PubsubMessage via a Pull call or a push delivery. It must not be populated by a publisher in a Publish call. |
| `publishTime` | string (int64) | The time at which the message was published. The time is milliseconds since the UNIX epoch. |

### `PubsubMessage` (v1beta2)

- A message data and its attributes. The message payload must not be empty; it must contain either a non-empty data field, or at least one attribute.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional attributes for this message. |
| `data` | string (byte) | The message payload. For JSON requests, the value of this field must be base64-encoded (https://tools.ietf.org/html/rfc4648). |
| `messageId` | string | ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. |
| `publishTime` | string (google-datetime) | The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. |

### `PubsubWrapper`

- The payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage).
- Version: v1

### `PullBatchRequest`

- Request for the PullBatch method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `maxEvents` | integer (int32) | The maximum number of PubsubEvents returned for this request. The Pub/Sub system may return fewer than the number of events specified. |
| `returnImmediately` | boolean | If this is specified as true the system will respond immediately even if it is not able to return a message in the Pull response. Otherwise the system is allowed to wait until at least one message is available rather than returning no messages. The client may cancel the request if it does not wish to wait any longer for the response. |
| `subscription` | string | The subscription from which messages should be pulled. |

### `PullBatchResponse`

- Response for the PullBatch method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `pullResponses` | array<PullResponse> | Received Pub/Sub messages or status events. The Pub/Sub system will return zero messages if there are no more messages available in the backlog. The Pub/Sub system may return fewer than the max_events requested even if there are more messages available in the backlog. |

### `PullRequest`

- Request for the `Pull` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxMessages` | integer (int32) | Required. The maximum number of messages to return for this request. Must be a positive integer. The Pub/Sub system may return fewer than the number specified. |
| `returnImmediately` | boolean | Optional. If this field set to true, the system will respond immediately even if it there are no messages available to return in the `Pull` response. Otherwise, the system may wait (for a bounded amount of time) until at least one message is available, rather than returning no messages. Warning: setting this field to `true` is discouraged because it adversely impacts the performance of `Pull` operations. We recommend that users do not set this field. |

### `PullRequest` (v1beta1a)

- Request for the Pull method.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `returnImmediately` | boolean | If this is specified as true the system will respond immediately even if it is not able to return a message in the Pull response. Otherwise the system is allowed to wait until at least one message is available rather than returning FAILED_PRECONDITION. The client may cancel the request if it does not wish to wait any longer for the response. |
| `subscription` | string | The subscription from which a message should be pulled. |

### `PullResponse`

- Response for the `Pull` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `receivedMessages` | array<ReceivedMessage> | Optional. Received Pub/Sub messages. The list will be empty if there are no more messages available in the backlog, or if no messages could be returned before the request timeout. For JSON, the response can be entirely empty. The Pub/Sub system may return fewer than the `maxMessages` requested even if there are more messages available in the backlog. |

### `PullResponse` (v1beta1a)

- Either a PubsubMessage or a truncation event. One of these two must be populated.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `ackId` | string | This ID must be used to acknowledge the received event or message. |
| `pubsubEvent` | PubsubEvent | A pubsub message or truncation event. |

### `PushConfig`

- Configuration for a push delivery endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: \* `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. \* `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }` |
| `noWrapper` | NoWrapper | Optional. When set, the payload to the push endpoint is not wrapped. |
| `oidcToken` | OidcToken | Optional. If specified, Pub/Sub will generate and attach an OIDC JWT token as an `Authorization` header in the HTTP request for every pushed message. |
| `pubsubWrapper` | PubsubWrapper | Optional. When set, the payload to the push endpoint is in the form of the JSON representation of a \[PubsubMessage\]( https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage). |
| `pushEndpoint` | string | Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`. |

### `PushConfig` (v1beta1a)

- Configuration for a push delivery endpoint.
- Version: v1beta1a

| Field | Type | Description |
|---|---|---|
| `pushEndpoint` | string | A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use "https://example.com/push". |

### `PushConfig` (v1beta2)

- Configuration for a push delivery endpoint.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Endpoint configuration attributes. Every endpoint has a set of API supported attributes that can be used to control different aspects of the message delivery. The currently supported attribute is `x-goog-version`, which you can use to change the format of the push message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the envelope (i.e. its fields and metadata). The endpoint version is based on the version of the Pub/Sub API. If not present during the `CreateSubscription` call, it will default to the version of the API used to make such call. If not present during a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The possible values for this attribute are: \* `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. \* `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. |
| `oidcToken` | OidcToken | If specified, Pub/Sub will generate and attach an OIDC JWT token as an `Authorization` header in the HTTP request for every pushed message. |
| `pushEndpoint` | string | A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use "https://example.com/push". |

### `ReceivedMessage`

- A message and its corresponding acknowledgment ID.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ackId` | string | Optional. This ID can be used to acknowledge the received message. |
| `deliveryAttempt` | integer (int32) | Optional. The approximate number of times that Pub/Sub has attempted to deliver the associated message to a subscriber. More precisely, this is 1 + (number of NACKs) + (number of ack_deadline exceeds) for this message. A NACK is any call to ModifyAckDeadline with a 0 deadline. An ack_deadline exceeds event is whenever a message is not acknowledged within ack_deadline. Note that ack_deadline is initially Subscription.ackDeadlineSeconds, but may get extended automatically by the client library. Upon the first delivery of a given message, `delivery_attempt` will have a value of 1. The value is calculated at best effort and is approximate. If a DeadLetterPolicy is not set on the subscription, this will be 0. |
| `message` | PubsubMessage | Optional. The message. |

### `ReceivedMessage` (v1beta2)

- A message and its corresponding acknowledgment ID.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `ackId` | string | This ID can be used to acknowledge the received message. |
| `message` | PubsubMessage | The message. |

### `RetryPolicy`

- A policy that specifies how Pub/Sub retries message delivery. Retry delay will be exponential based on provided minimum and maximum backoffs. https://en.wikipedia.org/wiki/Exponential_backoff. RetryPolicy will be triggered on NACKs or acknowledgment deadline exceeded events for a given message. Retry Policy is implemented on a best effort basis. At times, the delay between consecutive deliveries may not match the configuration. That is, delay can be more or less than configured backoff.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maximumBackoff` | string (google-duration) | Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds. |
| `minimumBackoff` | string (google-duration) | Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds. |

### `RollbackSchemaRequest`

- Request for the `RollbackSchema` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revisionId` | string | Required. The revision ID to roll back to. It must be a revision of the same schema. Example: c7cfa2a8 |

### `RowKeySchema`

- Row key definition that reads the input message fields based on the field names of the table's structured row key ({$universe.dns_names.final_documentation_domain}/bigtable/docs/manage-row-key-schemas). Note that if the field is nullable in the structured row key, then it need not be present in the message; null will be used instead.
- Version: v1

### `Schema`

- A schema resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compiledProtoSchema` | CompiledProtoSchema | Optional. Configuration for a schema provided as a pre-compiled Protocol Buffer FileDescriptorSet. The `type` field above must be set to PROTOCOL_BUFFER. |
| `definition` | string | The definition of the schema. This should contain a string representing the full definition of the schema that is a valid schema definition of the type specified in `type`. |
| `name` | string | Required. Name of the schema. Format is `projects/{project}/schemas/{schema}`. |
| `revisionCreateTime` | string (google-datetime) | Output only. The timestamp that the revision was created. |
| `revisionId` | string | Output only. Immutable. The revision ID of the schema. |
| `type` | string enum | The type of the schema definition. Values: `TYPE_UNSPECIFIED`, `PROTOCOL_BUFFER`, `AVRO`. |

### `SchemaSettings`

- Settings for validating messages published against a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encoding` | string enum | Optional. The encoding of messages validated against `schema`. Values: `ENCODING_UNSPECIFIED`, `JSON`, `BINARY`. |
| `firstRevisionId` | string | Optional. The minimum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against last_revision or any revision created before. |
| `lastRevisionId` | string | Optional. The maximum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against first_revision or any revision created after. |
| `schema` | string | Required. The name of the schema that messages published should be validated against. Format is `projects/{project}/schemas/{schema}`. The value of this field will be `_deleted-schema_` if the schema has been deleted. |

### `SeekRequest`

- Request for the `Seek` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `snapshot` | string | Optional. The snapshot to seek to. The snapshot's topic must be the same as that of the provided subscription. Format is `projects/{project}/snapshots/{snap}`. |
| `time` | string (google-datetime) | Optional. The time to seek to. Messages retained in the subscription that were published before this time are marked as acknowledged, and messages retained in the subscription that were published after this time are marked as unacknowledged. Note that this operation affects only those messages retained in the subscription (configured by the combination of `message_retention_duration` and `retain_acked_messages`). For example, if `time` corresponds to a point before the message retention window (or to a point before the system's notion of the subscription creation time), only retained messages will be marked as unacknowledged, and already-expunged messages will not be restored. |

### `SeekResponse`

- Response for the `Seek` method (this response is empty).
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `Snapshot`

- A snapshot resource. Snapshots are used in Seek (https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | Optional. The snapshot is guaranteed to exist up until this time. A newly-created snapshot expires no later than 7 days from the time of its creation. Its exact lifetime is determined at creation by the existing backlog in the source subscription. Specifically, the lifetime of the snapshot is `7 days - (age of oldest unacked message in the subscription)`. For example, consider a subscription whose oldest unacked message is 3 days old. If a snapshot is created from this subscription, the snapshot -- which will always capture this 3-day-old backlog as long as the snapshot exists -- will expire in 4 days. The service will refuse to create a snapshot that would expire in less than 1 hour after creation. |
| `labels` | object | Optional. See \[Creating and managing labels\]( https://cloud.google.com/pubsub/docs/labels). |
| `name` | string | Optional. The name of the snapshot. |
| `topic` | string | Optional. The name of the topic from which this snapshot is retaining messages. |

### `Subscription`

- A subscription resource. If none of `push_config`, `bigquery_config`, `cloud_storage_config`, or `bigtable_config` is set, then the subscriber will pull and ack messages using API methods. At most one of these fields may be set.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ackDeadlineSeconds` | integer (int32) | Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be \_outstanding\_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message. |
| `analyticsHubSubscriptionInfo` | AnalyticsHubSubscriptionInfo | Output only. Information about the associated Analytics Hub subscription. Only set if the subscription is created by Analytics Hub. |
| `bigqueryConfig` | BigQueryConfig | Optional. If delivery to BigQuery is used with this subscription, this field is used to configure it. |
| `bigtableConfig` | BigtableConfig | Optional. If delivery to Bigtable is used with this subscription, this field is used to configure it. |
| `cloudStorageConfig` | CloudStorageConfig | Optional. If delivery to Google Cloud Storage is used with this subscription, this field is used to configure it. |
| `deadLetterPolicy` | DeadLetterPolicy | Optional. A policy that specifies the conditions for dead lettering messages in this subscription. If dead_letter_policy is not set, dead lettering is disabled. The Pub/Sub service account associated with this subscriptions's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Acknowledge() messages on this subscription. |
| `detached` | boolean | Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made. |
| `enableExactlyOnceDelivery` | boolean | Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: \* The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgment deadline expires. \* An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values. |
| `enableMessageOrdering` | boolean | Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order. |
| `expirationPolicy` | ExpirationPolicy | Optional. A policy that specifies the conditions for this subscription's expiration. A subscription is considered active as long as any connected subscriber is successfully consuming messages from the subscription or is issuing operations on the subscription. If `expiration_policy` is not set, a \*default policy\* with `ttl` of 31 days will be used. The minimum allowed value for `expiration_policy.ttl` is 1 day. If `expiration_policy` is set, but `expiration_policy.ttl` is not set, the subscription never expires. |
| `filter` | string | Optional. An expression written in the Pub/Sub filter language (https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out. |
| `labels` | object | Optional. See Creating and managing labels (https://cloud.google.com/pubsub/docs/labels). |
| `messageRetentionDuration` | string (google-duration) | Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes. |
| `messageTransforms` | array<MessageTransform> | Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified. |
| `name` | string | Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |
| `pushConfig` | PushConfig | Optional. If push delivery is used with this subscription, this field is used to configure it. |
| `retainAckedMessages` | boolean | Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to \[`Seek` to a timestamp\]( https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages. |
| `retryPolicy` | RetryPolicy | Optional. A policy that specifies how Pub/Sub retries message delivery for this subscription. If not set, the default retry policy is applied. This generally implies that messages will be retried as soon as possible for healthy subscribers. RetryPolicy will be triggered on NACKs or acknowledgment deadline exceeded events for a given message. |
| `state` | string enum | Output only. An output-only field indicating whether or not the subscription can receive messages. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `RESOURCE_ERROR`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See https://{$universe.dns_names.final_documentation_domain}/pubsub/docs/tags for more information on using tags with Pub/Sub resources. |
| `topic` | string | Required. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. The value of this field will be `_deleted-topic_` if the topic has been deleted. |
| `topicMessageRetentionDuration` | string (google-duration) | Output only. Indicates the minimum duration for which a message is retained after it is published to the subscription's topic. If this field is set, messages published to the subscription's topic in the last `topic_message_retention_duration` are always available to subscribers. See the `message_retention_duration` field in `Topic`. This field is set only in responses from the server; it is ignored if it is set in any requests. |

### `Subscription` (v1beta2)

- A subscription resource.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `ackDeadlineSeconds` | integer (int32) | This value is the maximum time after a subscriber receives a message before the subscriber should acknowledge the message. After message delivery but before the ack deadline expires and before the message is acknowledged, it is an outstanding message and will not be delivered again during that time (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using pull. The maximum custom deadline you can specify is 600 seconds (10 minutes). For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message. If this parameter is 0, a default value of 10 seconds is used. |
| `name` | string | The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |
| `pushConfig` | PushConfig | If push delivery is used with this subscription, this field is used to configure it. An empty `pushConfig` signifies that the subscriber will pull and ack messages using API methods. |
| `topic` | string | The name of the topic from which this subscription is receiving messages. The value of this field will be `_deleted-topic_` if the topic has been deleted. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TextConfig`

- Configuration for writing message data in text format. Message payloads will be written to files as raw text, separated by a newline.
- Version: v1

### `TextFormat`

- Configuration for reading Cloud Storage data in text format. Each line of text as specified by the delimiter will be set to the `data` field of a Pub/Sub message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimiter` | string | Optional. When unset, '\n' is used. |

### `Topic`

- A topic resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingestionDataSourceSettings` | IngestionDataSourceSettings | Optional. Settings for ingestion from a data source into this topic. |
| `kmsKeyName` | string | Optional. The resource name of the Cloud KMS CryptoKey to be used to protect access to messages published on this topic. The expected format is `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |
| `labels` | object | Optional. See \[Creating and managing labels\]( https://cloud.google.com/pubsub/docs/labels). |
| `messageRetentionDuration` | string (google-duration) | Optional. Indicates the minimum duration to retain a message after it is published to the topic. If this field is set, messages published to the topic in the last `message_retention_duration` are always available to subscribers. For instance, it allows any attached subscription to seek to a timestamp (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) that is up to `message_retention_duration` in the past. If this field is not set, message retention is controlled by settings on individual subscriptions. Cannot be more than 31 days or less than 10 minutes. |
| `messageStoragePolicy` | MessageStoragePolicy | Optional. Policy constraining the set of Google Cloud Platform regions where messages published to the topic may be stored. If not present, then no constraints are in effect. |
| `messageTransforms` | array<MessageTransform> | Optional. Transforms to be applied to messages published to the topic. Transforms are applied in the order specified. |
| `name` | string | Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |
| `satisfiesPzs` | boolean | Optional. Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests. |
| `schemaSettings` | SchemaSettings | Optional. Settings for validating messages published against a schema. |
| `state` | string enum | Output only. An output-only field indicating the state of the topic. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `INGESTION_RESOURCE_ERROR`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See https://{$universe.dns_names.final_documentation_domain}/pubsub/docs/tags for more information on using tags with Pub/Sub resources. |

### `Topic` (v1beta2)

- A topic resource.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. |

### `UnstructuredInference`

- Configuration for making inferences using arbitrary JSON payloads.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | object | Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request. |

### `UpdateSnapshotRequest`

- Request for the UpdateSnapshot method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `snapshot` | Snapshot | Required. The updated snapshot object. |
| `updateMask` | string (google-fieldmask) | Required. Indicates which fields in the provided snapshot to update. Must be specified and non-empty. |

### `UpdateSubscriptionRequest`

- Request for the UpdateSubscription method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subscription` | Subscription | Required. The updated subscription object. |
| `updateMask` | string (google-fieldmask) | Required. Indicates which fields in the provided subscription to update. Must be specified and non-empty. |

### `UpdateTopicRequest`

- Request for the UpdateTopic method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `topic` | Topic | Required. The updated topic object. |
| `updateMask` | string (google-fieldmask) | Required. Indicates which fields in the provided topic to update. Must be specified and non-empty. Note that if `update_mask` contains "message_storage_policy" but the `message_storage_policy` is not set in the `topic` provided above, then the updated value is determined by the policy configured at the project or organization level. |

### `ValidateMessageRequest`

- Request for the `ValidateMessage` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encoding` | string enum | The encoding expected for messages Values: `ENCODING_UNSPECIFIED`, `JSON`, `BINARY`. |
| `message` | string (byte) | Message to validate against the provided `schema_spec`. |
| `name` | string | Name of the schema against which to validate. Format is `projects/{project}/schemas/{schema}`. |
| `schema` | Schema | Ad-hoc schema against which to validate |

### `ValidateMessageResponse`

- Response for the `ValidateMessage` method. Empty for now.
- Version: v1

### `ValidateSchemaRequest`

- Request for the `ValidateSchema` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schema` | Schema | Required. The schema object to validate. |

### `ValidateSchemaResponse`

- Response for the `ValidateSchema` method. Empty for now.
- Version: v1

### Shape of `AIInference`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "endpoint": "string",
  "serviceAccountEmail": "string",
  "unstructuredInference": "UnstructuredInference"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2, v1beta1a of `pubsub` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://pubsub.googleapis.com/$discovery/rest?version=v1, https://pubsub.googleapis.com/$discovery/rest?version=v1beta2, https://pubsub.googleapis.com/$discovery/rest?version=v1beta1a (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
