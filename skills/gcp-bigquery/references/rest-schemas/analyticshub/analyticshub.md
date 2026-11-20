---
source: https://analyticshub.googleapis.com/$discovery/rest?version=v1
---

# Analytics Hub API message schemas (analyticshub)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/analyticshub/`.

### `AIInference`

- Configuration for making inference requests against Vertex AI models.
- Version: v1

### `ApproveQueryTemplateRequest`

- Message for approving a QueryTemplate.
- Version: v1

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

### `AvroConfig`

- Configuration for writing message data in Avro format. Message payloads and metadata will be written to files as an Avro binary.
- Version: v1

### `BigQueryConfig`

- Configuration for a BigQuery subscription.
- Version: v1

### `BigQueryDatasetSource`

- A reference to a shared dataset. It is an existing BigQuery dataset with a collection of objects such as tables and views that you want to share with subscribers. When subscriber's subscribe to a listing, Analytics Hub creates a linked dataset in the subscriber's project. A Linked dataset is an opaque, read-only BigQuery dataset that serves as a \_symbolic link\_ to a shared dataset.
- Version: v1

### `BigQueryDatasetSource` (v1beta1)

- A reference to a shared dataset. It is an existing BigQuery dataset with a collection of objects such as tables and views that you want to share with subscribers. When subscriber's subscribe to a listing, Analytics Hub creates a linked dataset in the subscriber's project. A Linked dataset is an opaque, read-only BigQuery dataset that serves as a \_symbolic link\_ to a shared dataset.
- Version: v1beta1

### `BigtableConfig`

- Configuration for a Bigtable subscription, which will write a Pub/Sub message to a Bigtable row. See the ColumnFamilyMapping documentation below for details on how the row keys and columns will be written.
- Version: v1

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

### `CloudStorageConfig`

- Configuration for a Cloud Storage subscription.
- Version: v1

### `ColumnFamilyMapping`

- Configuration for writing a Pub/Sub message to a Bigtable row with a user-defined key and writing to column families. If this field is set: - The subscription messages must be formatted as JSON. - The row key mapping is configured in the `key_definition` section. - The top-level fields will be written either: - By default, they will be written to the `data` column family with the field name as the column qualifier. - But if the field name matches an existing column family (except for the default `data` column), then that field will be written to that column family, either as a scalar or its next level nested fields if it's a JSON object. - The cell timestamp will be the message publish timestamp. If the field is not set, the default behavior is to write: - row key: subscription name, message ID hash, and message ID delimited by `#`. - columns: message bytes written to a single column family `data` with an empty-string column qualifier. - cell timestamp: the message publish timestamp.
- Version: v1

### `CommercialInfo`

- Commercial info metadata for this subscription.
- Version: v1beta1

### `Compression`

- Configuration for compressing/decompressing message data using a user-specified compression algorithm.
- Version: v1

### `DataExchange`

- A data exchange is a container that lets you share data. Along with the descriptive information about the data exchange, it contains listings that reference shared datasets.
- Version: v1

### `DataExchange` (v1beta1)

- A data exchange is a container that lets you share data. Along with the descriptive information about the data exchange, it contains listings that reference shared datasets.
- Version: v1beta1

### `DataProvider`

- Contains details of the data provider.
- Version: v1

### `DcrExchangeConfig`

- Data Clean Room (DCR), used for privacy-safe and secured data sharing.
- Version: v1

### `DeadLetterPolicy`

- Dead lettering is done on a best effort basis. The same message might be dead lettered multiple times. If validation on any of the fields fails at subscription creation/updation, the create/update subscription request will fail.
- Version: v1

### `DefaultExchangeConfig`

- Default Analytics Hub data exchange, used for secured data sharing.
- Version: v1

### `DelimitedKey`

- Row key definition based on fields from the message.
- Version: v1

### `DestinationDataset`

- Defines the destination bigquery dataset.
- Version: v1

### `DestinationDatasetReference`

-
- Version: v1

### `DestinationPubSubSubscription`

- Defines the destination Pub/Sub subscription.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionConfig`

- Encryption configuration for the query template.
- Version: v1

### `ExpirationPolicy`

- A policy that specifies the conditions for resource expiration (i.e., automatic resource deletion).
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v1

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v1

### `GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo`

- Commercial info contains the information about the commercial data products associated with the listing.
- Version: v1

### `GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo`

- Specifies the details of the Marketplace Data Product associated with the Listing.
- Version: v1

### `GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo`

- Commercial info metadata for this subscription.
- Version: v1

### `GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo`

- Cloud Marketplace commercial metadata for this subscription.
- Version: v1

### `GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset`

- Defines the destination bigquery dataset.
- Version: v1beta1

### `GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference`

-
- Version: v1beta1

### `GoogleCloudMarketplaceInfo`

- Cloud Marketplace commercial metadata for this subscription.
- Version: v1beta1

### `GooglePubsubV1Subscription`

- Defines the destination Pub/Sub subscription. If none of `push_config`, `bigquery_config`, `cloud_storage_config`, `bigtable_config`, `pubsub_export_config`, or `pubsublite_export_config` is set, then the subscriber will pull and ack messages using API methods. At most one of these fields may be set.
- Version: v1

### `JavaScriptUDF`

- User-defined JavaScript function that can transform or filter a Pub/Sub message.
- Version: v1

### `LinkedResource`

- Reference to a linked resource tracked by this Subscription.
- Version: v1

### `ListDataExchangesResponse`

- Message for response to the list of data exchanges.
- Version: v1

### `ListListingsResponse`

- Message for response to the list of Listings.
- Version: v1

### `ListOrgDataExchangesResponse`

- Message for response to listing data exchanges in an organization and location.
- Version: v1

### `ListQueryTemplatesResponse`

- Message for response to the list of QueryTemplates.
- Version: v1

### `ListSharedResourceSubscriptionsResponse`

- Message for response to the listing of shared resource subscriptions.
- Version: v1

### `ListSubscriptionsResponse`

- Message for response to the listing of subscriptions.
- Version: v1

### `Listing`

- A listing is what gets published into a data exchange that a subscriber can subscribe to. It contains a reference to the data source along with descriptive information that will help subscribers find and subscribe the data.
- Version: v1

### `Listing` (v1beta1)

- A listing is what gets published into a data exchange that a subscriber can subscribe to. It contains a reference to the data source along with descriptive information that will help subscribers find and subscribe the data.
- Version: v1beta1

### `MessageTransform`

- All supported message transforms types.
- Version: v1

### `NoWrapper`

- Sets the `data` field as the HTTP body for delivery.
- Version: v1

### `OidcToken`

- Contains information needed for generating an OpenID Connect token (https://developers.google.com/identity/protocols/OpenIDConnect).
- Version: v1

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

### `OperationMetadata`

- Represents the metadata of a long-running operation in Analytics Hub.
- Version: v1

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

### `PubSubTopicSource`

- Pub/Sub topic source.
- Version: v1

### `Publisher`

- Contains details of the listing publisher.
- Version: v1

### `PubsubWrapper`

- The payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage).
- Version: v1

### `PushConfig`

- Configuration for a push delivery endpoint.
- Version: v1

### `QueryTemplate`

- A query template is a container for sharing table-valued functions defined by contributors in a data clean room.
- Version: v1

### `RefreshSubscriptionRequest`

- Message for refreshing a subscription.
- Version: v1

### `RefreshSubscriptionResponse`

- Message for response when you refresh a subscription.
- Version: v1

### `Replica`

- Represents the state of a replica of a shared dataset. It includes the geographic location of the replica and system-computed, output-only fields indicating its replication state and whether it is the primary replica.
- Version: v1

### `RestrictedExportConfig`

- Restricted export config, used to configure restricted export on linked dataset.
- Version: v1

### `RestrictedExportPolicy`

- Restricted export policy used to configure restricted export on linked dataset.
- Version: v1

### `RetryPolicy`

- A policy that specifies how Pub/Sub retries message delivery. Retry delay will be exponential based on provided minimum and maximum backoffs. https://en.wikipedia.org/wiki/Exponential_backoff. RetryPolicy will be triggered on NACKs or acknowledgement deadline exceeded events for a given message. Retry Policy is implemented on a best effort basis. At times, the delay between consecutive deliveries may not match the configuration. That is, delay can be more or less than configured backoff.
- Version: v1

### `RevokeSubscriptionRequest`

- Message for revoking a subscription.
- Version: v1

### `RevokeSubscriptionResponse`

- Message for response when you revoke a subscription. Empty for now.
- Version: v1

### `Routine`

- Represents a bigquery routine.
- Version: v1

### `RowKeySchema`

- Row key definition that reads the input message fields based on the field names of the table's structured row key (https://cloud.google.com/bigtable/docs/manage-row-key-schemas). Note that if the field is nullable in the structured row key, then it need not be present in the message; `null` will be used instead.
- Version: v1

### `SelectedResource`

- Resource in this dataset that is selectively shared.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

### `SharingEnvironmentConfig`

- Sharing environment is a behavior model for sharing data within a data exchange. This option is configurable for a data exchange.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

### `StoredProcedureConfig`

- Stored procedure configuration, used to configure stored procedure sharing on linked dataset.
- Version: v1

### `SubmitQueryTemplateRequest`

- Message for submitting a QueryTemplate.
- Version: v1

### `SubscribeDataExchangeRequest`

- Message for subscribing to a Data Exchange.
- Version: v1

### `SubscribeDataExchangeResponse`

- Message for response when you subscribe to a Data Exchange.
- Version: v1

### `SubscribeListingRequest`

- Message for subscribing to a listing.
- Version: v1

### `SubscribeListingRequest` (v1beta1)

- Message for subscribing to a listing.
- Version: v1beta1

### `SubscribeListingResponse`

- Message for response when you subscribe to a listing.
- Version: v1

### `SubscribeListingResponse` (v1beta1)

- Message for response when you subscribe to a listing.
- Version: v1beta1

### `Subscription`

- A subscription represents a subscribers' access to a particular set of published data. It contains references to associated listings, data exchanges, and linked datasets.
- Version: v1

### `Subscription` (v1beta1)

- A subscription represents a subscribers' access to a particular set of published data. It contains references to associated listings, data exchanges, and linked datasets.
- Version: v1beta1

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

### `TextConfig`

- Configuration for writing message data in text format. Message payloads will be written to files as raw text, separated by a newline.
- Version: v1

### `UnstructuredInference`

- Configuration for making inferences using arbitrary JSON payloads.
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

## Options / Props

### `AIInference` fields

| Field | Type | Description |
|---|---|---|
| `endpoint` | string | Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint. |
| `serviceAccountEmail` | string | Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `unstructuredInference` | UnstructuredInference | Optional. Requests and responses can be any arbitrary JSON object. |

### `AuditConfig` fields

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig` fields

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AvroConfig` fields

| Field | Type | Description |
|---|---|---|
| `useTopicSchema` | boolean | Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists. |
| `writeMetadata` | boolean | Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map. |

### `BigQueryConfig` fields

| Field | Type | Description |
|---|---|---|
| `dropUnknownFields` | boolean | Optional. When true and use_topic_schema is true, any fields that are a part of the topic schema that are not part of the BigQuery table schema are dropped when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog. |
| `serviceAccountEmail` | string | Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `table` | string | Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId} |
| `useTableSchema` | boolean | Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time. |
| `useTopicSchema` | boolean | Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time. |
| `writeMetadata` | boolean | Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column. |

### `BigQueryDatasetSource` fields

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Optional. Resource name of the dataset source for this listing. e.g. `projects/myproject/datasets/123` |
| `effectiveReplicas` | array<Replica> | Output only. Server-owned effective state of replicas. Contains both primary and secondary replicas. Each replica includes a system-computed (output-only) state and primary designation. |
| `replicaLocations` | array<string> | Optional. A list of regions where the publisher has created shared dataset replicas. |
| `restrictedExportPolicy` | RestrictedExportPolicy | Optional. If set, restricted export policy will be propagated and enforced on the linked dataset. |
| `selectedResources` | array<SelectedResource> | Optional. Resource in this dataset that is selectively shared. This field is required for data clean room exchanges. |

### `BigQueryDatasetSource` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Resource name of the dataset source for this listing. e.g. `projects/myproject/datasets/123` |

### `BigtableConfig` fields

| Field | Type | Description |
|---|---|---|
| `appProfileId` | string | Optional. The app profile to use for the Bigtable writes. If not specified, the "default" application profile will be used. The app profile must use single-cluster routing. |
| `columnFamilyMapping` | ColumnFamilyMapping | Optional. Configuration that allows writing row keys and/or columns based on fields in the input message. The input message format must be JSON if this field is set. |
| `serviceAccountEmail` | string | Optional. The service account to use to write to Bigtable. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `table` | string | Optional. The unique name of the table to write messages to. Values are of the form `projects/<project>/instances/<instance>/tables/<table>` (placeholders restored from the source proto; see Notes). |
| `writeMetadata` | boolean | Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table under the pubsub_metadata column family. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column. |

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CloudStorageConfig` fields

| Field | Type | Description |
|---|---|---|
| `avroConfig` | AvroConfig | Optional. If set, message data will be written to Cloud Storage in Avro format. |
| `bucket` | string | Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the bucket naming requirements (https://cloud.google.com/storage/docs/buckets#naming). |
| `filenameDatetimeFormat` | string | Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the datetime format guidance (https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names). |
| `filenamePrefix` | string | Optional. User-provided prefix for Cloud Storage filename. See the object naming requirements (https://cloud.google.com/storage/docs/objects#naming). |
| `filenameSuffix` | string | Optional. User-provided suffix for Cloud Storage filename. See the object naming requirements (https://cloud.google.com/storage/docs/objects#naming). Must not end in "/". |
| `maxBytes` | string (int64) | Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit. |
| `maxDuration` | string (google-duration) | Optional. File batching settings. If no max_duration setting is specified, a max_duration of 5 minutes will be set by default. max_duration is required regardless of whether other file batching settings are specified. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgement deadline. |
| `maxMessages` | string (int64) | Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages. |
| `serviceAccountEmail` | string | Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub service agent (https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. |
| `textConfig` | TextConfig | Optional. If set, message data will be written to Cloud Storage in text format. |

### `ColumnFamilyMapping` fields

| Field | Type | Description |
|---|---|---|
| `delimitedKey` | DelimitedKey | Optional. If set, the row key is constructed from the given key fields and delimiter. All key fields must be present in the message; otherwise, the message remains in the subscription backlog. |
| `rowKeySchema` | RowKeySchema | Optional. If set, the row key is constructed from the field names of the table's structured row key (https://cloud.google.com/bigtable/docs/manage-row-key-schemas). Note that if the field is nullable in the structured row key, then it need not be present in the message; `null` will be used instead. |

### `CommercialInfo` fields

| Field | Type | Description |
|---|---|---|
| `cloudMarketplace` | GoogleCloudMarketplaceInfo | Output only. This is set when the subscription is commercialised via Cloud Marketplace. |

### `Compression` fields

| Field | Type | Description |
|---|---|---|
| `compressionAlgorithm` | string enum | Required. Specifies the compression algorithm to use. Values: `COMPRESSION_ALGORITHM_UNSPECIFIED`, `ZLIB`. |
| `compressionMode` | string enum | Required. Specifies whether to compress or decompress the message. Values: `COMPRESSION_MODE_UNSPECIFIED`, `COMPRESS`, `DECOMPRESS`. |

### `DataExchange` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the data exchange. The description must not contain Unicode non-characters as well as C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. |
| `discoveryType` | string enum | Optional. Type of discovery on the discovery page for all the listings under this exchange. Updating this field also updates (overwrites) the discovery_type field for all the listings under this exchange. Values: `DISCOVERY_TYPE_UNSPECIFIED`, `DISCOVERY_TYPE_PRIVATE`, `DISCOVERY_TYPE_PUBLIC`. |
| `displayName` | string | Required. Human-readable display name of the data exchange. The display name must contain only Unicode letters, numbers (0-9), underscores (\_), dashes (-), spaces ( ), ampersands (&) and must not start or end with spaces. Default value is an empty string. Max length: 63 bytes. |
| `documentation` | string | Optional. Documentation describing the data exchange. |
| `icon` | string (byte) | Optional. Base64 encoded image representing the data exchange. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. |
| `listingCount` | integer (int32) | Output only. Number of listings contained in the data exchange. |
| `logLinkedDatasetQueryUserEmail` | boolean | Optional. By default, false. If true, the DataExchange has an email sharing mandate enabled. |
| `name` | string | Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. |
| `primaryContact` | string | Optional. Email or URL of the primary point of contact of the data exchange. Max Length: 1000 bytes. |
| `sharingEnvironmentConfig` | SharingEnvironmentConfig | Optional. Configurable data sharing environment option for a data exchange. |

### `DataExchange` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the data exchange. The description must not contain Unicode non-characters as well as C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. |
| `displayName` | string | Required. Human-readable display name of the data exchange. The display name must contain only Unicode letters, numbers (0-9), underscores (\_), dashes (-), spaces ( ), ampersands (&) and must not start or end with spaces. Default value is an empty string. Max length: 63 bytes. |
| `documentation` | string | Optional. Documentation describing the data exchange. |
| `icon` | string (byte) | Optional. Base64 encoded image representing the data exchange. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. |
| `listingCount` | integer (int32) | Output only. Number of listings contained in the data exchange. |
| `name` | string | Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. |
| `primaryContact` | string | Optional. Email or URL of the primary point of contact of the data exchange. Max Length: 1000 bytes. |

### `DataProvider` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the data provider. |
| `primaryContact` | string | Optional. Email or URL of the data provider. Max Length: 1000 bytes. |

### `DcrExchangeConfig` fields

| Field | Type | Description |
|---|---|---|
| `singleLinkedDatasetPerCleanroom` | boolean | Output only. If True, when subscribing to this DCR, it will create only one linked dataset containing all resources shared within the cleanroom. If False, when subscribing to this DCR, it will create 1 linked dataset per listing. This is not configurable, and by default, all new DCRs will have the restriction set to True. |
| `singleSelectedResourceSharingRestriction` | boolean | Output only. If True, this DCR restricts the contributors to sharing only a single resource in a Listing. And no two resources should have the same IDs. So if a contributor adds a view with a conflicting name, the CreateListing API will reject the request. if False, the data contributor can publish an entire dataset (as before). This is not configurable, and by default, all new DCRs will have the restriction set to True. |

### `DeadLetterPolicy` fields

| Field | Type | Description |
|---|---|---|
| `deadLetterTopic` | string | Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost. |
| `maxDeliveryAttempts` | integer (int32) | Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgement deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used. |

### `DelimitedKey` fields

| Field | Type | Description |
|---|---|---|
| `delimiter` | string (byte) | Optional. Byte sequence used to delimit concatenated fields. Must be specified if multiple key fields are used. The delimiter must contain at least 1 character and at most 50 characters. |
| `keyFields` | array<string> | Required. The key fields to construct from the row key. The fields must be present in the message as a top-level field, i.e. JSON path expressions will not traverse into nested objects. |

### `DestinationDataset` fields

| Field | Type | Description |
|---|---|---|
| `datasetReference` | DestinationDatasetReference | Required. A reference that identifies the destination dataset. |
| `description` | string | Optional. A user-friendly description of the dataset. |
| `friendlyName` | string | Optional. A descriptive name for the dataset. |
| `labels` | object | Optional. The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See https://cloud.google.com/resource-manager/docs/creating-managing-labels for more information. |
| `location` | string | Required. The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. |
| `replicaLocations` | array<string> | Optional. The geographic locations where the dataset should be replicated. See BigQuery locations (https://cloud.google.com/bigquery/docs/locations) for supported locations. |

### `DestinationDatasetReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_). The maximum length is 1,024 characters. |
| `projectId` | string | Required. The ID of the project containing this dataset. |

### `DestinationPubSubSubscription` fields

| Field | Type | Description |
|---|---|---|
| `pubsubSubscription` | GooglePubsubV1Subscription | Required. Destination Pub/Sub subscription resource. |

### `EncryptionConfig` fields

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The KMS key used to encrypt the query template. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}` |

### `ExpirationPolicy` fields

| Field | Type | Description |
|---|---|---|
| `ttl` | string (google-duration) | Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires. |

### `Expr` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `GetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetPolicyOptions` fields

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo` fields

| Field | Type | Description |
|---|---|---|
| `cloudMarketplace` | GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo | Output only. Details of the Marketplace Data Product associated with the Listing. |

### `GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo` fields

| Field | Type | Description |
|---|---|---|
| `commercialState` | string enum | Output only. Commercial state of the Marketplace Data Product. Values: `COMMERCIAL_STATE_UNSPECIFIED`, `ONBOARDING`, `ACTIVE`. |
| `service` | string | Output only. Resource name of the commercial service associated with the Marketplace Data Product. e.g. example.com |

### `GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo` fields

| Field | Type | Description |
|---|---|---|
| `cloudMarketplace` | GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo | Output only. This is set when the subscription is commercialised via Cloud Marketplace. |

### `GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo` fields

| Field | Type | Description |
|---|---|---|
| `order` | string | Resource name of the Marketplace Order. |

### `GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset` fields

| Field | Type | Description |
|---|---|---|
| `datasetReference` | GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference | Required. A reference that identifies the destination dataset. |
| `description` | string | Optional. A user-friendly description of the dataset. |
| `friendlyName` | string | Optional. A descriptive name for the dataset. |
| `labels` | object | Optional. The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See https://cloud.google.com/resource-manager/docs/creating-managing-labels for more information. |
| `location` | string | Required. The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. |

### `GoogleCloudBigqueryDataexchangeV1beta1DestinationDatasetReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_). The maximum length is 1,024 characters. |
| `projectId` | string | Required. The ID of the project containing this dataset. |

### `GoogleCloudMarketplaceInfo` fields

| Field | Type | Description |
|---|---|---|
| `order` | string | Resource name of the Marketplace Order. |

### `GooglePubsubV1Subscription` fields

| Field | Type | Description |
|---|---|---|
| `ackDeadlineSeconds` | integer (int32) | Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be \_outstanding\_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message. |
| `bigqueryConfig` | BigQueryConfig | Optional. If delivery to BigQuery is used with this subscription, this field is used to configure it. |
| `bigtableConfig` | BigtableConfig | Optional. If delivery to Bigtable is used with this subscription, this field is used to configure it. |
| `cloudStorageConfig` | CloudStorageConfig | Optional. If delivery to Google Cloud Storage is used with this subscription, this field is used to configure it. |
| `deadLetterPolicy` | DeadLetterPolicy | Optional. A policy that specifies the conditions for dead lettering messages in this subscription. If dead_letter_policy is not set, dead lettering is disabled. The Pub/Sub service account associated with this subscriptions's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Acknowledge() messages on this subscription. |
| `detached` | boolean | Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made. |
| `enableExactlyOnceDelivery` | boolean | Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: \* The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgement deadline expires. \* An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values. |
| `enableMessageOrdering` | boolean | Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order. |
| `expirationPolicy` | ExpirationPolicy | Optional. A policy that specifies the conditions for this subscription's expiration. A subscription is considered active as long as any connected subscriber is successfully consuming messages from the subscription or is issuing operations on the subscription. If `expiration_policy` is not set, a \*default policy\* with `ttl` of 31 days will be used. The minimum allowed value for `expiration_policy.ttl` is 1 day. If `expiration_policy` is set, but `expiration_policy.ttl` is not set, the subscription never expires. |
| `filter` | string | Optional. An expression written in the Pub/Sub filter language (https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out. |
| `labels` | object | Optional. See Creating and managing labels (https://cloud.google.com/pubsub/docs/labels). |
| `messageRetentionDuration` | string (google-duration) | Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes. |
| `messageTransforms` | array<MessageTransform> | Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified. |
| `name` | string | Required. Identifier. Name of the subscription. Format is `projects/{project}/subscriptions/{sub}`. |
| `pushConfig` | PushConfig | Optional. If push delivery is used with this subscription, this field is used to configure it. |
| `retainAckedMessages` | boolean | Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to \[`Seek` to a timestamp\] (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages. |
| `retryPolicy` | RetryPolicy | Optional. A policy that specifies how Pub/Sub retries message delivery for this subscription. If not set, the default retry policy is applied. This generally implies that messages will be retried as soon as possible for healthy subscribers. RetryPolicy will be triggered on NACKs or acknowledgement deadline exceeded events for a given message. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" See Create and manage tags (https://cloud.google.com/pubsub/docs/tags) for more information on using tags with Pub/Sub resources. |

### `JavaScriptUDF` fields

| Field | Type | Description |
|---|---|---|
| `code` | string | Required. JavaScript code that contains a function `function_name` with the below signature (code fence removed; angle-bracket parts restored from the source proto, see Notes): /\*\* \* Transforms a Pub/Sub message. \* @return `{(Object<string, (string \| Object<string, string>)>\|null)}` - To \* filter a message, return `null`. To transform a message return a map \* with the following keys: \* - (required) 'data' : `{string}` \* - (optional) 'attributes' : `{Object<string, string>}` \* Returning empty `attributes` will remove all attributes from the \* message. \* \* @param `{(Object<string, (string \| Object<string, string>)>}` Pub/Sub \* message. Keys: \* - (required) 'data' : `{string}` \* - (required) 'attributes' : `{Object<string, string>}` \* \* @param `{Object<string, any>}` metadata - Pub/Sub message metadata. \* Keys: \* - (required) 'message_id' : `{string}` \* - (optional) 'publish_time': `{string}` YYYY-MM-DDTHH:MM:SSZ format \* - (optional) 'ordering_key': `{string}` \*/ `function <function_name>(message, metadata) { }` |
| `functionName` | string | Required. Name of the JavasScript function that should applied to Pub/Sub messages. |

### `LinkedResource` fields

| Field | Type | Description |
|---|---|---|
| `linkedDataset` | string | Output only. Name of the linked dataset, e.g. projects/subscriberproject/datasets/linked_dataset |
| `linkedPubsubSubscription` | string | Output only. Name of the Pub/Sub subscription, e.g. projects/subscriberproject/subscriptions/sub_id (corrected: the Discovery document repeats `subscriptions`; see Notes) |
| `listing` | string | Output only. Listing for which linked resource is created. |

### `ListDataExchangesResponse` fields

| Field | Type | Description |
|---|---|---|
| `dataExchanges` | array<DataExchange> | The list of data exchanges. |
| `nextPageToken` | string | A token to request the next page of results. |

### `ListListingsResponse` fields

| Field | Type | Description |
|---|---|---|
| `listings` | array<Listing> | The list of Listing. |
| `nextPageToken` | string | A token to request the next page of results. |

### `ListOrgDataExchangesResponse` fields

| Field | Type | Description |
|---|---|---|
| `dataExchanges` | array<DataExchange> | The list of data exchanges. |
| `nextPageToken` | string | A token to request the next page of results. |

### `ListQueryTemplatesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of results. |
| `queryTemplates` | array<QueryTemplate> | The list of QueryTemplates. |

### `ListSharedResourceSubscriptionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `sharedResourceSubscriptions` | array<Subscription> | The list of subscriptions. |

### `ListSubscriptionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `subscriptions` | array<Subscription> | The list of subscriptions. |

### `Listing` fields

| Field | Type | Description |
|---|---|---|
| `allowOnlyMetadataSharing` | boolean | Optional. If true, the listing is only available to get the resource metadata. Listing is non subscribable. |
| `bigqueryDataset` | BigQueryDatasetSource | Shared dataset i.e. BigQuery dataset source. |
| `categories` | array<string> | Optional. Categories of the listing. Up to five categories are allowed. Values: `CATEGORY_UNSPECIFIED`, `CATEGORY_OTHERS`, `CATEGORY_ADVERTISING_AND_MARKETING`, `CATEGORY_COMMERCE`, `CATEGORY_CLIMATE_AND_ENVIRONMENT`, `CATEGORY_DEMOGRAPHICS`, `CATEGORY_ECONOMICS`, `CATEGORY_EDUCATION`, `CATEGORY_ENERGY`, `CATEGORY_FINANCIAL`, `CATEGORY_GAMING`, `CATEGORY_GEOSPATIAL`, `CATEGORY_HEALTHCARE_AND_LIFE_SCIENCE`, `CATEGORY_MEDIA`, `CATEGORY_PUBLIC_SECTOR`, `CATEGORY_RETAIL`, `CATEGORY_SPORTS`, `CATEGORY_SCIENCE_AND_RESEARCH`, `CATEGORY_TRANSPORTATION_AND_LOGISTICS`, `CATEGORY_TRAVEL_AND_TOURISM`, `CATEGORY_GOOGLE_EARTH_ENGINE`. |
| `commercialInfo` | GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo | Output only. Commercial info contains the information about the commercial data products associated with the listing. |
| `dataProvider` | DataProvider | Optional. Details of the data provider who owns the source data. |
| `description` | string | Optional. Short description of the listing. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. |
| `discoveryType` | string enum | Optional. Type of discovery of the listing on the discovery page. Values: `DISCOVERY_TYPE_UNSPECIFIED`, `DISCOVERY_TYPE_PRIVATE`, `DISCOVERY_TYPE_PUBLIC`. |
| `displayName` | string | Required. Human-readable display name of the listing. The display name must contain only Unicode letters, numbers (0-9), underscores (\_), dashes (-), spaces ( ), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes. |
| `documentation` | string | Optional. Documentation describing the listing. |
| `icon` | string (byte) | Optional. Base64 encoded image representing the listing. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the contents of the field are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. |
| `logLinkedDatasetQueryUserEmail` | boolean | Optional. By default, false. If true, the Listing has an email sharing mandate enabled. |
| `name` | string | Output only. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456` |
| `primaryContact` | string | Optional. Email or URL of the primary point of contact of the listing. Max Length: 1000 bytes. |
| `publisher` | Publisher | Optional. Details of the publisher who owns the listing and who can share the source data. |
| `pubsubTopic` | PubSubTopicSource | Pub/Sub topic source. |
| `requestAccess` | string | Optional. Email or URL of the request access of the listing. Subscribers can use this reference to request access. Max Length: 1000 bytes. |
| `resourceType` | string enum | Output only. Listing shared asset type. Values: `SHARED_RESOURCE_TYPE_UNSPECIFIED`, `BIGQUERY_DATASET`, `PUBSUB_TOPIC`. |
| `restrictedExportConfig` | RestrictedExportConfig | Optional. If set, restricted export configuration will be propagated and enforced on the linked dataset. |
| `state` | string enum | Output only. Current state of the listing. Values: `STATE_UNSPECIFIED`, `ACTIVE`. |
| `storedProcedureConfig` | StoredProcedureConfig | Optional. If set, stored procedure configuration will be propagated and enforced on the linked dataset. |

### `Listing` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `allowOnlyMetadataSharing` | boolean | Optional. If true, the listing is only available to get the resource metadata. Listing is non subscribable. |
| `bigqueryDataset` | BigQueryDatasetSource | Required. Shared dataset i.e. BigQuery dataset source. |
| `categories` | array<string> | Optional. Categories of the listing. Up to five categories are allowed. Values: `CATEGORY_UNSPECIFIED`, `CATEGORY_OTHERS`, `CATEGORY_ADVERTISING_AND_MARKETING`, `CATEGORY_COMMERCE`, `CATEGORY_CLIMATE_AND_ENVIRONMENT`, `CATEGORY_DEMOGRAPHICS`, `CATEGORY_ECONOMICS`, `CATEGORY_EDUCATION`, `CATEGORY_ENERGY`, `CATEGORY_FINANCIAL`, `CATEGORY_GAMING`, `CATEGORY_GEOSPATIAL`, `CATEGORY_HEALTHCARE_AND_LIFE_SCIENCE`, `CATEGORY_MEDIA`, `CATEGORY_PUBLIC_SECTOR`, `CATEGORY_RETAIL`, `CATEGORY_SPORTS`, `CATEGORY_SCIENCE_AND_RESEARCH`, `CATEGORY_TRANSPORTATION_AND_LOGISTICS`, `CATEGORY_TRAVEL_AND_TOURISM`, `CATEGORY_GOOGLE_EARTH_ENGINE`. |
| `dataProvider` | DataProvider | Optional. Details of the data provider who owns the source data. |
| `description` | string | Optional. Short description of the listing. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. |
| `displayName` | string | Required. Human-readable display name of the listing. The display name must contain only Unicode letters, numbers (0-9), underscores (\_), dashes (-), spaces ( ), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes. |
| `documentation` | string | Optional. Documentation describing the listing. |
| `icon` | string (byte) | Optional. Base64 encoded image representing the listing. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the contents of the field are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. |
| `name` | string | Output only. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456` |
| `primaryContact` | string | Optional. Email or URL of the primary point of contact of the listing. Max Length: 1000 bytes. |
| `publisher` | Publisher | Optional. Details of the publisher who owns the listing and who can share the source data. |
| `requestAccess` | string | Optional. Email or URL of the request access of the listing. Subscribers can use this reference to request access. Max Length: 1000 bytes. |
| `restrictedExportConfig` | RestrictedExportConfig | Optional. If set, restricted export configuration will be propagated and enforced on the linked dataset. This is a required field for data clean room exchanges. |
| `state` | string enum | Output only. Current state of the listing. Values: `STATE_UNSPECIFIED`, `ACTIVE`. |

### `MessageTransform` fields

| Field | Type | Description |
|---|---|---|
| `aiInference` | AIInference | Optional. AI Inference. Specifies the Vertex AI endpoint that inference requests built from the Pub/Sub message data and provided parameters will be sent to. |
| `compression` | Compression | Optional. Compression/Decompression. |
| `disabled` | boolean | Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`. |
| `enabled` | boolean | Optional. This field is deprecated, use the `disabled` field to disable transforms. |
| `javascriptUdf` | JavaScriptUDF | Optional. JavaScript User Defined Function. If multiple JavaScriptUDF's are specified on a resource, each must have a unique `function_name`. |

### `NoWrapper` fields

| Field | Type | Description |
|---|---|---|
| `writeMetadata` | boolean | Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-<KEY>:<VAL>` headers of the HTTP request. Writes the Pub/Sub message attributes to `<KEY>:<VAL>` headers of the HTTP request (placeholders restored from the source proto; see Notes). |

### `OidcToken` fields

| Field | Type | Description |
|---|---|---|
| `audience` | string | Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used. |
| `serviceAccountEmail` | string | Optional. Service account email (https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see Push subscriptions (https://cloud.google.com/pubsub/docs/push). |

### `Operation` fields

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata` fields

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PubSubTopicSource` fields

| Field | Type | Description |
|---|---|---|
| `dataAffinityRegions` | array<string> | Optional. Region hint on where the data might be published. Data affinity regions are modifiable. See https://cloud.google.com/about/locations for full listing of possible Cloud regions. |
| `topic` | string | Required. Resource name of the Pub/Sub topic source for this listing. e.g. projects/myproject/topics/topicId |

### `Publisher` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the listing publisher. |
| `primaryContact` | string | Optional. Email or URL of the listing publisher. Max Length: 1000 bytes. |

### `PushConfig` fields

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: \* `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. \* `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }` |
| `noWrapper` | NoWrapper | Optional. When set, the payload to the push endpoint is not wrapped. |
| `oidcToken` | OidcToken | Optional. If specified, Pub/Sub will generate and attach an OIDC JWT token as an `Authorization` header in the HTTP request for every pushed message. |
| `pubsubWrapper` | PubsubWrapper | Optional. When set, the payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage). |
| `pushEndpoint` | string | Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`. |

### `QueryTemplate` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Timestamp when the QueryTemplate was created. |
| `description` | string | Optional. Short description of the QueryTemplate. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. |
| `displayName` | string | Required. Human-readable display name of the QueryTemplate. The display name must contain only Unicode letters, numbers (0-9), underscores (\_), dashes (-), spaces ( ), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes. |
| `documentation` | string | Optional. Documentation describing the QueryTemplate. |
| `encryptionConfiguration` | EncryptionConfig | Optional. Encryption configuration for the query template. If set, the customer-managed KMS key is used to encrypt the query template definition body. |
| `name` | string | Output only. The resource name of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/456` |
| `primaryContact` | string | Optional. Email or URL of the primary point of contact of the QueryTemplate. Max Length: 1000 bytes. |
| `proposer` | string | Optional. Deprecated: Use `primary_contact` instead. Email or URL of the primary point of contact of the QueryTemplate. Max Length: 1000 bytes. |
| `routine` | Routine | Optional. The routine associated with the QueryTemplate. |
| `state` | string enum | Output only. The QueryTemplate lifecycle state. Values: `STATE_UNSPECIFIED`, `DRAFTED`, `PENDING`, `DELETED`, `APPROVED`. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the QueryTemplate was last modified. |

### `RefreshSubscriptionResponse` fields

| Field | Type | Description |
|---|---|---|
| `subscription` | Subscription | The refreshed subscription resource. |

### `Replica` fields

| Field | Type | Description |
|---|---|---|
| `location` | string | Output only. The geographic location where the replica resides. See BigQuery locations (https://cloud.google.com/bigquery/docs/locations) for supported locations. Eg. "us-central1". |
| `primaryState` | string enum | Output only. Indicates that this replica is the primary replica. Values: `PRIMARY_STATE_UNSPECIFIED`, `PRIMARY_REPLICA`. |
| `replicaState` | string enum | Output only. Assigned by Analytics Hub based on real BigQuery replication state. Values: `REPLICA_STATE_UNSPECIFIED`, `READY_TO_USE`, `UNAVAILABLE`. |

### `RestrictedExportConfig` fields

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. If true, enable restricted export. |
| `restrictDirectTableAccess` | boolean | Output only. If true, restrict direct table access(read api/tabledata.list) on linked table. |
| `restrictQueryResult` | boolean | Optional. If true, restrict export of query result derived from restricted linked dataset table. |

### `RestrictedExportPolicy` fields

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. If true, enable restricted export. |
| `restrictDirectTableAccess` | boolean | Optional. If true, restrict direct table access (read api/tabledata.list) on linked table. |
| `restrictQueryResult` | boolean | Optional. If true, restrict export of query result derived from restricted linked dataset table. |

### `RetryPolicy` fields

| Field | Type | Description |
|---|---|---|
| `maximumBackoff` | string (google-duration) | Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds. |
| `minimumBackoff` | string (google-duration) | Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds. |

### `RevokeSubscriptionRequest` fields

| Field | Type | Description |
|---|---|---|
| `revokeCommercial` | boolean | Optional. If the subscription is commercial then this field must be set to true, otherwise a failure is thrown. This acts as a safety guard to avoid revoking commercial subscriptions accidentally. |

### `Routine` fields

| Field | Type | Description |
|---|---|---|
| `definitionBody` | string | Optional. The definition body of the routine. |
| `routineType` | string enum | Required. The type of routine. Values: `ROUTINE_TYPE_UNSPECIFIED`, `TABLE_VALUED_FUNCTION`. |

### `SelectedResource` fields

| Field | Type | Description |
|---|---|---|
| `routine` | string | Optional. Format: For routine: `projects/{projectId}/datasets/{datasetId}/routines/{routineId}` Example:"projects/test_project/datasets/test_dataset/routines/test_routine" |
| `table` | string | Optional. Format: For table: `projects/{projectId}/datasets/{datasetId}/tables/{tableId}` Example:"projects/test_project/datasets/test_dataset/tables/test_table" |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SharingEnvironmentConfig` fields

| Field | Type | Description |
|---|---|---|
| `dcrExchangeConfig` | DcrExchangeConfig | Data Clean Room (DCR), used for privacy-safe and secured data sharing. |
| `defaultExchangeConfig` | DefaultExchangeConfig | Default Analytics Hub data exchange, used for secured data sharing. |

### `Status` fields

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StoredProcedureConfig` fields

| Field | Type | Description |
|---|---|---|
| `allowedStoredProcedureTypes` | array<string> | Output only. Types of stored procedure supported to share. Values: `STORED_PROCEDURE_TYPE_UNSPECIFIED`, `SQL_PROCEDURE`. |
| `enabled` | boolean | Optional. If true, enable sharing of stored procedure. |

### `SubscribeDataExchangeRequest` fields

| Field | Type | Description |
|---|---|---|
| `destination` | string | Required. The parent resource path of the Subscription. e.g. `projects/subscriberproject/locations/us` |
| `destinationDataset` | DestinationDataset | Optional. BigQuery destination dataset to create for the subscriber. |
| `subscriberContact` | string | Email of the subscriber. |
| `subscription` | string | Required. Name of the subscription to create. e.g. `subscription1` |

### `SubscribeDataExchangeResponse` fields

| Field | Type | Description |
|---|---|---|
| `subscription` | Subscription | Subscription object created from this subscribe action. |

### `SubscribeListingRequest` fields

| Field | Type | Description |
|---|---|---|
| `destinationDataset` | DestinationDataset | Input only. BigQuery destination dataset to create for the subscriber. |
| `destinationPubsubSubscription` | DestinationPubSubSubscription | Input only. Destination Pub/Sub subscription to create for the subscriber. |

### `SubscribeListingRequest` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `destinationDataset` | GoogleCloudBigqueryDataexchangeV1beta1DestinationDataset | BigQuery destination dataset to create for the subscriber. |

### `SubscribeListingResponse` fields

| Field | Type | Description |
|---|---|---|
| `subscription` | Subscription | Subscription object created from this subscribe action. |

### `Subscription` fields

| Field | Type | Description |
|---|---|---|
| `commercialInfo` | GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo | Output only. This is set if this is a commercial subscription i.e. if this subscription was created from subscribing to a commercial listing. |
| `creationTime` | string (google-datetime) | Output only. Timestamp when the subscription was created. |
| `dataExchange` | string | Output only. Resource name of the source Data Exchange. e.g. projects/123/locations/us/dataExchanges/456 |
| `destinationDataset` | DestinationDataset | Optional. BigQuery destination dataset to create for the subscriber. |
| `lastModifyTime` | string (google-datetime) | Output only. Timestamp when the subscription was last modified. |
| `linkedDatasetMap` | object | Output only. Map of listing resource names to associated linked resource, e.g. projects/123/locations/us/dataExchanges/456/listings/789 -> projects/123/datasets/my_dataset For listing-level subscriptions, this is a map of size 1. Only contains values if state == STATE_ACTIVE. |
| `linkedResources` | array<LinkedResource> | Output only. Linked resources created in the subscription. Only contains values if state = STATE_ACTIVE. |
| `listing` | string | Output only. Resource name of the source Listing. e.g. projects/123/locations/us/dataExchanges/456/listings/789 |
| `logLinkedDatasetQueryUserEmail` | boolean | Output only. By default, false. If true, the Subscriber agreed to the email sharing mandate that is enabled for DataExchange/Listing. |
| `name` | string | Output only. The resource name of the subscription. e.g. `projects/myproject/locations/us/subscriptions/123`. |
| `organizationDisplayName` | string | Output only. Display name of the project of this subscription. |
| `organizationId` | string | Output only. Organization of the project this subscription belongs to. |
| `resourceType` | string enum | Output only. Listing shared asset type. Values: `SHARED_RESOURCE_TYPE_UNSPECIFIED`, `BIGQUERY_DATASET`, `PUBSUB_TOPIC`. |
| `state` | string enum | Output only. Current state of the subscription. Values: `STATE_UNSPECIFIED`, `STATE_ACTIVE`, `STATE_STALE`, `STATE_INACTIVE`. |
| `subscriberContact` | string | Output only. Email of the subscriber. |

### `Subscription` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `commercialInfo` | CommercialInfo | Output only. This is set if this is a commercial subscription i.e. if this subscription was created from subscribing to a commercial listing. |
| `creationTime` | string (google-datetime) | Output only. Timestamp when the subscription was created. |
| `dataExchange` | string | Output only. Resource name of the source Data Exchange. e.g. projects/123/locations/us/dataExchanges/456 |
| `destinationDataset` | DestinationDataset | Optional. BigQuery destination dataset to create for the subscriber. |
| `lastModifyTime` | string (google-datetime) | Output only. Timestamp when the subscription was last modified. |
| `linkedDatasetMap` | object | Output only. Map of listing resource names to associated linked resource, e.g. projects/123/locations/us/dataExchanges/456/listings/789 -> projects/123/datasets/my_dataset For listing-level subscriptions, this is a map of size 1. Only contains values if state == STATE_ACTIVE. |
| `linkedResources` | array<LinkedResource> | Output only. Linked resources created in the subscription. Only contains values if state = STATE_ACTIVE. |
| `listing` | string | Output only. Resource name of the source Listing. e.g. projects/123/locations/us/dataExchanges/456/listings/789 |
| `logLinkedDatasetQueryUserEmail` | boolean | Output only. By default, false. If true, the Subscriber agreed to the email sharing mandate that is enabled for DataExchange/Listing. |
| `name` | string | Output only. The resource name of the subscription. e.g. `projects/myproject/locations/us/subscriptions/123`. |
| `organizationDisplayName` | string | Output only. Display name of the project of this subscription. |
| `organizationId` | string | Output only. Organization of the project this subscription belongs to. |
| `resourceType` | string enum | Output only. Listing shared asset type. Values: `SHARED_RESOURCE_TYPE_UNSPECIFIED`, `BIGQUERY_DATASET`, `PUBSUB_TOPIC`. |
| `state` | string enum | Output only. Current state of the subscription. Values: `STATE_UNSPECIFIED`, `STATE_ACTIVE`, `STATE_STALE`, `STATE_INACTIVE`. |
| `subscriberContact` | string | Output only. Email of the subscriber. |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `UnstructuredInference` fields

| Field | Type | Description |
|---|---|---|
| `parameters` | object | Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request. |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `analyticshub` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the source proto: the `table` format `projects//instances//tables/` of `BigtableConfig` (a Pub/Sub type in this document) lost its placeholders in the Discovery document; the proto comment reads "Values are of the form `projects/<project>/instances/<instance>/tables/<table>`." (`google/pubsub/v1/pubsub.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/pubsub/v1/pubsub.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the official docs: the `LinkedResource.linkedPubsubSubscription` example `projects/subscriberproject/subscriptions/subscriptions/sub_id` repeats `subscriptions` (the proto comment in `google/cloud/bigquery/analyticshub/v1/analyticshub.proto` at googleapis commit `5ce0245` has the same text); a Pub/Sub subscription name has one `subscriptions` segment: the `GooglePubsubV1Subscription.name` description in the analyticshub.v1 Discovery document gives the format `projects/{project}/subscriptions/{sub}`, and the pubsub.v1 Discovery path pattern is `projects/[^/]+/subscriptions/[^/]+`.
- Corrected from the source proto: the header formats in the `writeMetadata` description of `NoWrapper` (`x-goog-pubsub-:` and `:`) lost their placeholders in the Discovery document; the proto comment reads "When true, writes the Pub/Sub message metadata to `x-goog-pubsub-<KEY>:<VAL>` headers of the HTTP request. Writes the Pub/Sub message attributes to `<KEY>:<VAL>` headers of the HTTP request." (`google/cloud/bigquery/analyticshub/v1/pubsub.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/analyticshub/v1/pubsub.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the source proto: the signature in the `code` description of `JavaScriptUDF` lost its angle-bracket parts in the Discovery document (`{(Object)>|null)}`, `{(Object)>}`, `{Object}` and `function (message, metadata)`); the proto comment reads `@return {(Object<string, (string | Object<string, string>)>|null)}`, `'attributes' : {Object<string, string>}`, `@param  {(Object<string, (string | Object<string, string>)>} Pub/Sub`, `@param  {Object<string, any>} metadata` and `function <function_name>(message, metadata) {` (backticks added) (`google/cloud/bigquery/analyticshub/v1/pubsub.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/analyticshub/v1/pubsub.proto, commit `5ce0245`, retrieved 2026-11-19).
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://analyticshub.googleapis.com/$discovery/rest?version=v1, https://analyticshub.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
