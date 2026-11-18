---
source: https://managedkafka.googleapis.com/$discovery/rest?version=v1
---

# Managed Service for Apache Kafka API message schemas (managedkafka)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/managedkafka/`.

### `AccessConfig`

- The configuration of access to the Kafka cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkConfigs` | array<NetworkConfig> | Required. Virtual Private Cloud (VPC) networks that must be granted direct access to the Kafka cluster. Minimum of 1 network is required. Maximum 10 networks can be specified. |
| `publicClusterConfig` | PublicClusterConfig | Optional. The configuration for public connectivity to the Kafka cluster. |

### `Acl`

- Represents the set of ACLs for a given Kafka Resource Pattern, which consists of resource_type, resource_name and pattern_type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aclEntries` | array<AclEntry> | Required. The ACL entries that apply to the resource pattern. The maximum number of allowed entries 100. |
| `etag` | string | Optional. `etag` is used for concurrency control. An `etag` is returned in the response to `GetAcl` and `CreateAcl`. Callers are required to put that etag in the request to `UpdateAcl` to ensure that their change will be applied to the same version of the acl that exists in the Kafka Cluster. A terminal 'T' character in the etag indicates that the AclEntries were truncated; more entries for the Acl exist on the Kafka Cluster, but can't be returned in the Acl due to repeated field limits. |
| `name` | string | Identifier. The name for the acl. Represents a single Resource Pattern. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/acls/{acl_id} The structure of `acl_id` defines the Resource Pattern (resource_type, resource_name, pattern_type) of the acl. `acl_id` is structured like one of the following: For acls on the cluster: `cluster` For acls on a single resource within the cluster: `topic/{resource_name}` `consumerGroup/{resource_name}` `transactionalId/{resource_name}` For acls on all resources that match a prefix: `topicPrefixed/{resource_name}` `consumerGroupPrefixed/{resource_name}` `transactionalIdPrefixed/{resource_name}` For acls on all resources of a given type (i.e. the wildcard literal "\*"): `allTopics` (represents `topic/*`) `allConsumerGroups` (represents `consumerGroup/*`) `allTransactionalIds` (represents `transactionalId/*`) |
| `patternType` | string | Output only. The ACL pattern type derived from the name. One of: LITERAL, PREFIXED. |
| `resourceName` | string | Output only. The ACL resource name derived from the name. For cluster resource_type, this is always "kafka-cluster". Can be the wildcard literal "\*". |
| `resourceType` | string | Output only. The ACL resource type derived from the name. One of: CLUSTER, TOPIC, GROUP, TRANSACTIONAL_ID. |

### `AclEntry`

- Represents the access granted for a given Resource Pattern in an ACL.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Required. The host. Must be set to "\*" for Managed Service for Apache Kafka. |
| `operation` | string | Required. The operation type. Allowed values are (case insensitive): ALL, READ, WRITE, CREATE, DELETE, ALTER, DESCRIBE, CLUSTER_ACTION, DESCRIBE_CONFIGS, ALTER_CONFIGS, and IDEMPOTENT_WRITE. See https://kafka.apache.org/documentation/#operations_resources_and_protocols for valid combinations of resource_type and operation for different Kafka API requests. |
| `permissionType` | string | Required. The permission type. Accepted values are (case insensitive): ALLOW, DENY. |
| `principal` | string | Required. The principal. Specified as Google Cloud account, with the Kafka StandardAuthorizer prefix "User:". For example: "User:test-kafka-client@test-project.iam.gserviceaccount.com". Can be the wildcard "User:\*" to refer to all users. |

### `AddAclEntryResponse`

- Response for AddAclEntry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acl` | Acl | The updated acl. |
| `aclCreated` | boolean | Whether the acl was created as a result of adding the acl entry. |

### `BrokerCapacityConfig`

- Capacity configuration at a per-broker level within the Kafka cluster. The config will be appled to each broker in the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskSizeGib` | string (int64) | Optional. The disk to provision for each broker in Gibibytes. Minimum: 100 GiB. |

### `BrokerDetails`

- Details of a broker in the Kafka cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `brokerIndex` | string (int64) | Output only. The index of the broker. |
| `nodeId` | string (int64) | Output only. The node id of the broker. |
| `rack` | string | Output only. The rack of the broker. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CapacityConfig`

- A capacity configuration of a Kafka cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memoryBytes` | string (int64) | Required. The memory to provision for the cluster in bytes. The CPU:memory ratio (vCPU:GiB) must be between 1:1 and 1:8. Minimum: 3221225472 (3 GiB). |
| `vcpuCount` | string (int64) | Required. The number of vCPUs to provision for the cluster. Minimum: 3. |

### `CertificateAuthorityServiceConfig`

- A configuration for the Google Certificate Authority Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caPool` | string | Required. The name of the CA pool to pull CA certificates from. Structured like: projects/{project}/locations/{location}/caPools/{ca_pool}. The CA pool does not need to be in the same project or location as the Kafka cluster. |

### `CheckCompatibilityRequest`

- Request for CheckCompatibility.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `references` | array<SchemaReference> | Optional. The schema references used by the schema. |
| `schema` | string | Required. The schema payload |
| `schemaType` | string enum | Optional. The schema type of the schema. Values: `SCHEMA_TYPE_UNSPECIFIED`, `AVRO`, `JSON`, `PROTOBUF`. |
| `verbose` | boolean | Optional. If true, the response will contain the compatibility check result with reasons for failed checks. The default is false. |

### `CheckCompatibilityResponse`

- Response for CheckCompatibility.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `is_compatible` | boolean | The compatibility check result. If true, the schema is compatible with the resource. |
| `messages` | array<string> | Failure reasons if verbose = true. |

### `Cluster`

- An Apache Kafka cluster deployed in a location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bootstrapAddress` | string | Output only. The bootstrap address of the Kafka cluster. The returned address format is: `bootstrap-...managedkafka.s.cloud.goog` or `bootstrap...managedkafka..cloud.goog` (legacy format). ## Examples: `bootstrap-nol2mecj8p94jhx2ge2rg54579a.c0aad26f.europe-west1.managedkafka.s.cloud.goog` - `bootstrap.my-cluster.us-central1.managedkafka.my-project.cloud.goog` The port number is omitted so clients can connect to their target listener (for example, `:9092` for TLS or `:9094` for mTLS). |
| `brokerCapacityConfig` | BrokerCapacityConfig | Optional. Capacity configuration at a per-broker level within the Kafka cluster. The config will be appled to each broker in the cluster. |
| `brokerDetails` | array<BrokerDetails> | Output only. Only populated when FULL view is requested. Details of each broker in the cluster. |
| `capacityConfig` | CapacityConfig | Required. Capacity configuration for the Kafka cluster. |
| `createTime` | string (google-datetime) | Output only. The time when the cluster was created. |
| `effectiveCapacityConfig` | EffectiveCapacityConfig | Output only. Only populated when FULL view is requested. The effective capacity configuration of the cluster. |
| `gcpConfig` | GcpConfig | Required. Configuration properties for a Kafka cluster deployed to Google Cloud Platform. |
| `kafkaVersion` | string | Optional. The Apache Kafka version of the cluster. Specifically, this value is the finalized metadata version. If not specified during cluster creation, defaults to `3.7.x`. Supported values: `3.7.x`. |
| `labels` | object | Optional. Labels as key value pairs. |
| `name` | string | Identifier. The name of the cluster. Structured like: projects/{project_number}/locations/{location}/clusters/{cluster_id} |
| `publicClusterDetails` | PublicClusterDetails | Output only. Details of the public cluster feature for the Kafka cluster. |
| `rebalanceConfig` | RebalanceConfig | Optional. Rebalance configuration for the Kafka cluster. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The current state of the cluster. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `UPDATING`. |
| `tlsConfig` | TlsConfig | Optional. TLS configuration for the Kafka cluster. |
| `updateOptions` | UpdateOptions | Optional. UpdateOptions represents options that control how updates to the cluster are applied. |
| `updateTime` | string (google-datetime) | Output only. The time when the cluster was last updated. |

### `ConnectAccessConfig`

- The configuration of access to the Kafka Connect cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkConfigs` | array<ConnectNetworkConfig> | Required. Virtual Private Cloud (VPC) networks that must be granted direct access to the Kafka Connect cluster. Minimum of 1 network is required. Maximum 10 networks can be specified. |

### `ConnectCluster`

- An Apache Kafka Connect cluster deployed in a location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacityConfig` | CapacityConfig | Required. Capacity configuration for the Kafka Connect cluster. |
| `config` | object | Optional. Reserved for future use. This field is meant for worker config overrides, but is unsupported for now. |
| `createTime` | string (google-datetime) | Output only. The time when the cluster was created. |
| `gcpConfig` | ConnectGcpConfig | Required. Configuration properties for a Kafka Connect cluster deployed to Google Cloud Platform. |
| `kafkaCluster` | string | Required. Immutable. The name of the Kafka cluster this Kafka Connect cluster is attached to. Structured like: projects/{project}/locations/{location}/clusters/{cluster} |
| `labels` | object | Optional. Labels as key value pairs. |
| `name` | string | Identifier. The name of the Kafka Connect cluster. Structured like: projects/{project_number}/locations/{location}/connectClusters/{connect_cluster_id} |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The current state of the Kafka Connect cluster. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `DETACHED`. |
| `updateTime` | string (google-datetime) | Output only. The time when the cluster was last updated. |

### `ConnectGcpConfig`

- Configuration properties for a Kafka Connect cluster deployed to Google Cloud Platform.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessConfig` | ConnectAccessConfig | Required. Access configuration for the Kafka Connect cluster. |
| `secretPaths` | array<string> | Optional. Secrets to load into workers. Exact SecretVersions from Secret Manager must be provided -- aliases are not supported. Up to 32 secrets may be loaded into one cluster. Format: projects//secrets//versions/ |

### `ConnectNetworkConfig`

- The configuration of a Virtual Private Cloud (VPC) network that can access the Kafka Connect cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalSubnets` | array<string> | Optional. Deprecated: Managed Kafka Connect clusters can now reach any endpoint accessible from the primary subnet without the need to define additional subnets. Please see https://cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster#worker-subnet for more information. |
| `dnsDomainNames` | array<string> | Optional. Additional DNS domain names from the subnet's network to be made visible to the Connect Cluster. When using MirrorMaker2, it's necessary to add the bootstrap address's dns domain name of the target cluster to make it visible to the connector. For example: my-kafka-cluster.us-central1.managedkafka.my-project.cloud.goog |
| `primarySubnet` | string | Required. VPC subnet to make available to the Kafka Connect cluster. Structured like: projects/{project}/regions/{region}/subnetworks/{subnet_id} It is used to create a Private Service Connect (PSC) interface for the Kafka Connect workers. It must be located in the same region as the Kafka Connect cluster. The CIDR range of the subnet must be within the IPv4 address ranges for private networks, as specified in RFC 1918. The primary subnet CIDR range must have a minimum size of /22 (1024 addresses). |

### `Connector`

- A Kafka Connect connector in a given ConnectCluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configs` | object | Optional. Connector config as keys/values. The keys of the map are connector property names, for example: `connector.class`, `tasks.max`, `key.converter`. |
| `name` | string | Identifier. The name of the connector. Structured like: projects/{project}/locations/{location}/connectClusters/{connect_cluster}/connectors/{connector} |
| `state` | string enum | Output only. The current state of the connector. Values: `STATE_UNSPECIFIED`, `UNASSIGNED`, `RUNNING`, `PAUSED`, `FAILED`, `RESTARTING`, `STOPPED`. |
| `taskRestartPolicy` | TaskRetryPolicy | Optional. Restarts the individual tasks of a Connector. |

### `ConsumerGroup`

- A Kafka consumer group in a given cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the consumer group. The `consumer_group` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/consumerGroups/{consumer_group} |
| `topics` | object | Optional. Metadata for this consumer group for all topics it has metadata for. The key of the map is a topic name, structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic} |

### `ConsumerPartitionMetadata`

- Metadata for a consumer group corresponding to a specific partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadata` | string | Optional. The associated metadata for this partition, or empty if it does not exist. |
| `offset` | string (int64) | Required. The current offset for this partition, or 0 if no offset has been committed. |

### `ConsumerTopicMetadata`

- Metadata for a consumer group corresponding to a specific topic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitions` | object | Optional. Metadata for this consumer group and topic for all partition indexes it has metadata for. |

### `Context`

- Context represents an independent schema grouping in a schema registry instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the context. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}` The context name {context} can contain the following: \* Up to 255 characters. \* Allowed characters: letters (uppercase or lowercase), numbers, and the following special characters: `.`, `-`, `_`, `+`, `%`, and `~`. |
| `subjects` | array<string> | Optional. The subjects of the context. |

### `CreateSchemaRegistryRequest`

- Request to create a schema registry instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schemaRegistry` | SchemaRegistry | Required. The schema registry instance to create. The name field is ignored. |
| `schemaRegistryId` | string | Required. The schema registry instance ID to use for this schema registry. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores (-). The maximum length is 63 characters. The ID must not start with a number. |

### `CreateVersionRequest`

- Request for CreateVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | integer (int32) | Optional. The schema ID of the schema. If not specified, the schema ID will be generated by the server. If the schema ID is specified, it must not be used by an existing schema that is different from the schema to be created. |
| `normalize` | boolean | Optional. If true, the schema will be normalized before being stored. The default is false. |
| `references` | array<SchemaReference> | Optional. The schema references used by the schema. |
| `schema` | string | Required. The schema payload |
| `schemaType` | string enum | Optional. The type of the schema. It is optional. If not specified, the schema type will be AVRO. Values: `SCHEMA_TYPE_UNSPECIFIED`, `AVRO`, `JSON`, `PROTOBUF`. |
| `version` | integer (int32) | Optional. The version to create. It is optional. If not specified, the version will be created with the max version ID of the subject increased by 1. If the version ID is specified, it will be used as the new version ID and must not be used by an existing version of the subject. |

### `CreateVersionResponse`

- Response for CreateVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | integer (int32) | The unique identifier of the schema created. |

### `EffectiveCapacityConfig`

- Describes the effective capacity configuration of a Kafka cluster, both cluster-wide and per-broker.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `brokerCount` | string (int64) | Output only. The number of brokers in the cluster. |
| `brokerDiskSizeGib` | string (int64) | Output only. The disk assigned to each broker in Gibibytes. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GcpConfig`

- Configuration properties for a Kafka cluster deployed to Google Cloud Platform.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessConfig` | AccessConfig | Required. Access configuration for the Kafka cluster. |
| `kmsKey` | string | Optional. Immutable. The Cloud KMS Key name to use for encryption. The key must be located in the same region as the cluster and cannot be changed. Structured like: projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}. |

### `HttpBody`

- Message that represents an arbitrary HTTP body. It should only be used for payload formats that can't be represented as JSON, such as raw binary or an HTML page. This message can be used both in streaming and non-streaming API methods in the request as well as the response. It can be used as a top-level request field, which is convenient if one wants to extract parameters from either the URL or HTTP template into the request fields and also want access to the raw HTTP body. Example: message GetResourceRequest { // A unique request id. string request_id = 1; // The raw HTTP body is bound to this field. google.api.HttpBody http_body = 2; } service ResourceService { rpc GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); } Example with streaming methods: service CaldavService { rpc GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); rpc UpdateCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); } Use of this type only changes how the request and response bodies are handled, all other features will continue to work unchanged.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contentType` | string | The HTTP Content-Type header value specifying the content type of the body. |
| `data` | string (byte) | The HTTP request/response body as raw binary. |
| `extensions` | array<object> | Application specific response metadata. Must be set in the first response for streaming APIs. |

### `ListAclsResponse`

- Response for ListAcls.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acls` | array<Acl> | The list of acls in the requested parent. The order of the acls is unspecified. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |

### `ListClustersResponse`

- Response for ListClusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusters` | array<Cluster> | The list of Clusters in the requested parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListConnectClustersResponse`

- Response for ListConnectClusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectClusters` | array<ConnectCluster> | The list of Connect clusters in the requested parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListConnectorsResponse`

- Response for ListConnectors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectors` | array<Connector> | The list of connectors in the requested parent. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |

### `ListConsumerGroupsResponse`

- Response for ListConsumerGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerGroups` | array<ConsumerGroup> | The list of consumer group in the requested parent. The order of the consumer groups is unspecified. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |

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

### `ListSchemaRegistriesResponse`

- Request for ListSchemaRegistries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schemaRegistries` | array<SchemaRegistry> | The schema registry instances. |

### `ListTopicsResponse`

- Response for ListTopics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `topics` | array<Topic> | The list of topics in the requested parent. The order of the topics is unspecified. |

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

### `LookupVersionRequest`

- Request for LookupVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleted` | boolean | Optional. If true, soft-deleted versions will be included in lookup, no matter if the subject is active or soft-deleted. If false, soft-deleted versions will be excluded. The default is false. |
| `normalize` | boolean | Optional. If true, the schema will be normalized before being looked up. The default is false. |
| `references` | array<SchemaReference> | Optional. The schema references used by the schema. |
| `schema` | string | Required. The schema payload |
| `schemaType` | string enum | Optional. The schema type of the schema. Values: `SCHEMA_TYPE_UNSPECIFIED`, `AVRO`, `JSON`, `PROTOBUF`. |

### `NetworkConfig`

- The configuration of a Virtual Private Cloud (VPC) network that can access the Kafka cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subnet` | string | Required. Name of the VPC subnet in which to create Private Service Connect (PSC) endpoints for the Kafka brokers and bootstrap address. Structured like: projects/{project}/regions/{region}/subnetworks/{subnet_id} The subnet must be located in the same region as the Kafka cluster. The project may differ. Multiple subnets from the same parent network must not be specified. |

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
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `PauseConnectorRequest`

- Request for PauseConnector.
- Version: v1

### `PauseConnectorResponse`

- Response for PauseConnector.
- Version: v1

### `PublicClusterConfig`

- The configuration for a public Kafka cluster
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedSourceIpRanges` | array<string> | Required. The list of IPv4 ranges in CIDR notation that are allowed to connect to the public Kafka broker endpoints. The Kafka cluster should only be exposed to trusted external ranges. A maximum of 500 IP ranges can be specified and no single range can be larger than a `/16`. This field is required if PublicClusterConfig is specified. |

### `PublicClusterDetails`

- Details of the public cluster feature for the Kafka cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discoveryDnsRecords` | array<string> | Output only. DNS discovery records that resolve to all of the external IP addresses associated with the public cluster. Used for configuring DNS-based egress firewall rules to a public cluster. discovery_dns_record can be added to this list if the cluster is scaled up. Must configure DNS based firewalls to resolve ALL DNS records in this list as large clusters have IP addresses sharded across records. Each record contains a maximum of 30 IP addresses. |
| `externalIpAddresses` | array<string> | Output only. All of the external IP addresses associated with the public cluster used for configuring egress firewall rules to a public cluster. external_ip_address can be added to this list if the cluster is scaled up. |

### `RebalanceConfig`

- Defines rebalancing behavior of a Kafka cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Optional. The rebalance behavior for the cluster. When not specified, defaults to `NO_REBALANCE`. Values: `MODE_UNSPECIFIED`, `NO_REBALANCE`, `AUTO_REBALANCE_ON_SCALE_UP`. |

### `RemoveAclEntryResponse`

- Response for RemoveAclEntry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acl` | Acl | The updated acl. Returned if the removed acl entry was not the last entry in the acl. |
| `aclDeleted` | boolean | Returned with value true if the removed acl entry was the last entry in the acl, resulting in acl deletion. |

### `RestartConnectorRequest`

- Request for RestartConnector.
- Version: v1

### `RestartConnectorResponse`

- Response for RestartConnector.
- Version: v1

### `ResumeConnectorRequest`

- Request for ResumeConnector.
- Version: v1

### `ResumeConnectorResponse`

- Response for ResumeConnector.
- Version: v1

### `Schema`

- Schema for a Kafka message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `references` | array<SchemaReference> | Optional. The schema references used by the schema. |
| `schema` | string | The schema payload. |
| `schemaType` | string enum | Optional. The schema type of the schema. Values: `SCHEMA_TYPE_UNSPECIFIED`, `AVRO`, `JSON`, `PROTOBUF`. |

### `SchemaConfig`

- SchemaConfig represents configuration for a schema registry or a specific subject.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alias` | string | Optional. The subject to which this subject is an alias of. Only applicable for subject config. |
| `compatibility` | string enum | Required. The compatibility type of the schema. The default value is BACKWARD. If unset in a SchemaSubject-level SchemaConfig, defaults to the global value. If unset in a SchemaRegistry-level SchemaConfig, reverts to the default value. Values: `NONE`, `BACKWARD`, `BACKWARD_TRANSITIVE`, `FORWARD`, `FORWARD_TRANSITIVE`, `FULL`, `FULL_TRANSITIVE`. |
| `normalize` | boolean | Optional. If true, the schema will be normalized before being stored or looked up. The default is false. If unset in a SchemaSubject-level SchemaConfig, the global value will be used. If unset in a SchemaRegistry-level SchemaConfig, reverts to the default value. |

### `SchemaMode`

- SchemaMode represents the mode of a schema registry or a specific subject. Four modes are supported: \* NONE: deprecated. This was the default mode for a subject, but now the default is unset (which means use the global schema registry setting) \* READONLY: The schema registry is in read-only mode. \* READWRITE: The schema registry is in read-write mode, which allows limited write operations on the schema. \* IMPORT: The schema registry is in import mode, which allows more editing operations on the schema for data importing purposes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Required. The mode type of a schema registry (READWRITE by default) or of a subject (unset by default, which means use the global schema registry setting). Values: `NONE`, `READONLY`, `READWRITE`, `IMPORT`. |

### `SchemaReference`

- SchemaReference is a reference to a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the reference. |
| `subject` | string | Required. The subject of the reference. |
| `version` | integer (int32) | Required. The version of the reference. |

### `SchemaRegistry`

- SchemaRegistry is a schema registry instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contexts` | array<string> | Output only. The contexts of the schema registry instance. |
| `name` | string | Identifier. The name of the schema registry instance. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}` The instance name {schema_registry} can contain the following: \* Up to 255 characters. \* Letters (uppercase or lowercase), numbers, and underscores. |

### `SchemaSubject`

- Subject defines the evolution scope of schemas as a holder of schema versions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the subject. Structured like: `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/subjects/{subject}` or `projects/{project}/locations/{location}/schemaRegistries/{schema_registry}/contexts/{context}/subjects/{subject}` Subject name {subject} can contain the following: \* Up to 255 UTF-8 bytes. \* Allowed characters: letters (uppercase or lowercase), numbers, and the following special characters: `.`, `-`, `_`, `+`, `%`, and `~`. |
| `versions` | array<string> | Optional. The versions of the subject. |

### `SchemaVersion`

- Version of a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | integer (int32) | Required. The schema ID. |
| `references` | array<SchemaReference> | Optional. The schema references used by the schema. |
| `schema` | string | Required. The schema payload. |
| `schemaType` | string enum | Optional. The schema type of the schema. Values: `SCHEMA_TYPE_UNSPECIFIED`, `AVRO`, `JSON`, `PROTOBUF`. |
| `subject` | string | Required. The subject of the version. |
| `version` | integer (int32) | Required. The version ID |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StopConnectorRequest`

- Request for StopConnector.
- Version: v1

### `StopConnectorResponse`

- Response for StopConnector.
- Version: v1

### `TaskRetryPolicy`

- Task Retry Policy is implemented on a best-effort basis. The default policy retries tasks with a minimum_backoff of 60 seconds, and a maximum_backoff of 12 hours. You can disable the policy by setting the task_retry_disabled field to true. Retry delay will be exponential based on provided minimum and maximum backoffs. https://en.wikipedia.org/wiki/Exponential_backoff. Note that the delay between consecutive task restarts may not always precisely match the configured settings. This can happen when the ConnectCluster is in rebalancing state or if the ConnectCluster is unresponsive etc. The default values for minimum and maximum backoffs are 60 seconds and 12 hours respectively.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maximumBackoff` | string (google-duration) | Optional. The maximum amount of time to wait before retrying a failed task. This sets an upper bound for the backoff delay. |
| `minimumBackoff` | string (google-duration) | Optional. The minimum amount of time to wait before retrying a failed task. This sets a lower bound for the backoff delay. |
| `taskRetryDisabled` | boolean | Optional. If true, task retry is disabled. |

### `TlsConfig`

- The TLS configuration for the Kafka cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sslPrincipalMappingRules` | string | Optional. A list of rules for mapping from SSL principal names to short names. These are applied in order by Kafka. Refer to the Apache Kafka documentation for `ssl.principal.mapping.rules` for the precise formatting details and syntax. Example: "RULE:^CN=(.\*?),OU=ServiceUsers.\*$/$1@example.com/,DEFAULT" This is a static Kafka broker configuration. Setting or modifying this field will trigger a rolling restart of the Kafka brokers to apply the change. An empty string means no rules are applied (Kafka default). |
| `trustConfig` | TrustConfig | Optional. The configuration of the broker truststore. If specified, clients can use mTLS for authentication. |

### `Topic`

- A Kafka topic in a given cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configs` | object | Optional. Configurations for the topic that are overridden from the cluster defaults. The key of the map is a Kafka topic property name, for example: `cleanup.policy`, `compression.type`. |
| `name` | string | Identifier. The name of the topic. The `topic` segment is used when connecting directly to the cluster. Structured like: projects/{project}/locations/{location}/clusters/{cluster}/topics/{topic} |
| `partitionCount` | integer (int32) | Required. The number of partitions this topic has. The partition count can only be increased, not decreased. Please note that if partitions are increased for a topic that has a key, the partitioning logic or the ordering of the messages will be affected. |
| `replicationFactor` | integer (int32) | Required. Immutable. The number of replicas of each partition. A replication factor of 3 is recommended for high availability. |

### `TrustConfig`

- Sources of CA certificates to install in the broker's truststore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `casConfigs` | array<CertificateAuthorityServiceConfig> | Optional. Configuration for the Google Certificate Authority Service. Maximum 10. |

### `UpdateOptions`

- UpdateOptions specifies options that influence how a cluster update is applied. These options control the behavior of the update process, rather than defining the desired end-state of a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowBrokerDownscaleOnClusterUpscale` | boolean | Optional. If true, allows an update operation that increases the total vCPU and/or memory allocation of the cluster to significantly decrease the per-broker vCPU and/or memory allocation. This can result in reduced performance and availability. By default, the update operation will fail if an upscale request results in a vCPU or memory allocation for the brokers that is smaller than 90% of the current broker size. |

### `UpdateSchemaConfigRequest`

- Request for updating schema config. On a SchemaSubject-level SchemaConfig, an unset field will be removed from the SchemaConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compatibility` | string enum | Required. The compatibility type of the schemas. Cannot be unset for a SchemaRegistry-level SchemaConfig. If unset on a SchemaSubject-level SchemaConfig, removes the compatibility field for the SchemaConfig. Values: `NONE`, `BACKWARD`, `BACKWARD_TRANSITIVE`, `FORWARD`, `FORWARD_TRANSITIVE`, `FULL`, `FULL_TRANSITIVE`. |
| `normalize` | boolean | Optional. If true, the schema will be normalized before being stored or looked up. The default is false. Cannot be unset for a SchemaRegistry-level SchemaConfig. If unset on a SchemaSubject-level SchemaConfig, removes the normalize field for the SchemaConfig. |

### `UpdateSchemaModeRequest`

- Request for updating schema registry or subject mode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Required. The mode type. Values: `NONE`, `READONLY`, `READWRITE`, `IMPORT`. |

### Shape of `AccessConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "networkConfigs": "array<NetworkConfig>",
  "publicClusterConfig": "PublicClusterConfig"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `managedkafka` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://managedkafka.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
