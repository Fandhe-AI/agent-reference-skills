---
source: https://networkconnectivity.googleapis.com/$discovery/rest?version=v1
---

# Network Connectivity API message schemas (networkconnectivity)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/networkconnectivity/`.

### `AcceptHubSpokeRequest`

- The request for HubService.AcceptHubSpoke.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `spokeUri` | string | Required. The URI of the spoke to accept into the hub. |

### `AcceptHubSpokeResponse`

- The response for HubService.AcceptHubSpoke.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `spoke` | Spoke | The spoke that was operated on. |

### `AcceptSpokeUpdateRequest`

- The request for HubService.AcceptSpokeUpdate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `spokeEtag` | string | Required. The etag of the spoke to accept update. |
| `spokeUri` | string | Required. The URI of the spoke to accept update. |

### `AllocationOptions`

- Range auto-allocation options, to be optionally used when CIDR block is not explicitly set.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocationStrategy` | string enum | Optional. Allocation strategy Not setting this field when the allocation is requested means an implementation defined strategy is used. Values: `ALLOCATION_STRATEGY_UNSPECIFIED`, `RANDOM`, `FIRST_AVAILABLE`, `RANDOM_FIRST_N_AVAILABLE`, `FIRST_SMALLEST_FITTING`. |
| `firstAvailableRangesLookupSize` | integer (int32) | Optional. This field must be set only when allocation_strategy is set to RANDOM_FIRST_N_AVAILABLE. The value should be the maximum expected parallelism of range creation requests issued to the same space of peered netwroks. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AutoAccept`

- The auto-accept setting for a group controls whether proposed spokes are automatically attached to the hub. If auto-accept is enabled, the spoke immediately is attached to the hub and becomes part of the group. In this case, the new spoke is in the ACTIVE state. If auto-accept is disabled, the spoke goes to the INACTIVE state, and it must be reviewed and accepted by a hub administrator.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoAcceptProjects` | array<string> | Optional. A list of project ids or project numbers for which you want to enable auto-accept. The auto-accept setting is applied to spokes being created or updated in these projects. |

### `AutoCreatedSubnetworkInfo`

- Information for the automatically created subnetwork and its associated IR.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delinked` | boolean | Output only. Indicates whether the subnetwork is delinked from the Service Connection Policy. Only set if the subnetwork mode is AUTO_CREATED during creation. |
| `internalRange` | string | Output only. URI of the automatically created Internal Range. Only set if the subnetwork mode is AUTO_CREATED during creation. |
| `internalRangeRef` | string | Output only. URI of the automatically created Internal Range reference. Only set if the subnetwork mode is AUTO_CREATED during creation. |
| `subnetwork` | string | Output only. URI of the automatically created subnetwork. Only set if the subnetwork mode is AUTO_CREATED during creation. |
| `subnetworkRef` | string | Output only. URI of the automatically created subnetwork reference. Only set if the subnetwork mode is AUTO_CREATED during creation. |

### `AutomatedDnsCreationSpec`

- The specification for automatically creating a DNS record.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsSuffix` | string | Required. The DNS suffix to use for the DNS record. Must end with a dot. This should be a valid DNS domain name as per RFC 1035. Each label (between dots) can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-service.example.com.", "internal." |
| `hostname` | string | Required. The hostname (the first label of the FQDN) to use for the DNS record. This should be a valid DNS label as per RFC 1035. Generally, this means the hostname can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-instance", "db-1" |
| `ttl` | string (google-duration) | Optional. The Time To Live for the DNS record, in seconds. If not provided, a default of 30 seconds will be used. |

### `AutomatedDnsRecord`

- Represents a DNS record managed by the AutomatedDnsRecord API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerNetwork` | string | Required. Immutable. The full resource path of the consumer network this AutomatedDnsRecord is visible to. Example: "projects/{projectNumOrId}/global/networks/{networkName}". |
| `createTime` | string (google-datetime) | Output only. The timestamp of when the record was created. |
| `creationMode` | string enum | Required. Immutable. The creation mode of the AutomatedDnsRecord. This field is immutable. Values: `CREATION_MODE_UNSPECIFIED`, `CONSUMER_API`, `SERVICE_CONNECTION_MAP`. |
| `currentConfig` | Config | Output only. The current settings for this record as identified by (`hostname`, `dns_suffix`, `type`) in Cloud DNS. The `current_config` field reflects the actual settings of the DNS record in Cloud DNS based on the `hostname`, `dns_suffix`, and `type`. \* \*\*Absence:\*\* If `current_config` is unset, it means a DNS record with the specified `hostname`, `dns_suffix`, and `type` does not currently exist in Cloud DNS. This could be because the `AutomatedDnsRecord` has never been successfully programmed, has been deleted, or there was an error during provisioning. \* \*\*Presence:\*\* If `current_config` is present: \* It can be different from the `original_config`. This can happen due to several reasons: \* Out-of-band changes: A consumer might have directly modified the DNS record in Cloud DNS. \* `OVERWRITE` operations from other `AutomatedDnsRecord` resources: Another `AutomatedDnsRecord` with the same identifying attributes (`hostname`, `dns_suffix`, `type`) but a different configuration might have overwritten the record using `insert_mode: OVERWRITE`. Therefore, the presence of `current_config` indicates that a corresponding DNS record exists, but its values (TTL and RRData) might not always align with the `original_config` of the AutomatedDnsRecord. |
| `description` | string | A human-readable description of the record. |
| `dnsSuffix` | string | Required. Immutable. The dns suffix for this record to use in longest-suffix matching. Requires a trailing dot. Example: "example.com." |
| `dnsZone` | string | Output only. DnsZone is the DNS zone managed by automation. Format: projects/{project}/managedZones/{managedZone} |
| `etag` | string | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `fqdn` | string | Output only. The FQDN created by combining the hostname and dns suffix. Should include a trailing dot. |
| `hostname` | string | Required. Immutable. The hostname for the DNS record. This value will be prepended to the `dns_suffix` to create the full domain name (FQDN) for the record. For example, if `hostname` is "corp.db" and `dns_suffix` is "example.com.", the resulting record will be "corp.db.example.com.". Should not include a trailing dot. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Immutable. Identifier. The name of an AutomatedDnsRecord. Format: projects/{project}/locations/{location}/automatedDnsRecords/{automated_dns_record} See: https://google.aip.dev/122#fields-representing-resource-names |
| `originalConfig` | Config | Required. Immutable. The configuration settings used to create this DNS record. These settings define the desired state of the record as specified by the producer. |
| `recordType` | string enum | Required. Immutable. The identifier of a supported record type. Values: `RECORD_TYPE_UNSPECIFIED`, `A`, `AAAA`, `TXT`, `CNAME`. |
| `serviceClass` | string | Required. Immutable. The service class identifier which authorizes this AutomatedDnsRecord. Any API calls targeting this AutomatedDnsRecord must have `networkconnectivity.serviceClasses.use` IAM permission for the provided service class. |
| `state` | string enum | Output only. The current operational state of this AutomatedDnsRecord as managed by Service Connectivity Automation. Values: `STATE_UNSPECIFIED`, `PROGRAMMED`, `FAILED_DEPROGRAMMING`, `CREATING`, `DELETING`. |
| `stateDetails` | string | Output only. A human-readable message providing more context about the current state, such as an error description if the state is `FAILED_DEPROGRAMMING`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp of when the record was updated. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CheckConsumerConfigRequest`

- Request for CheckConsumerConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerNetwork` | string | Required. Full resource name of the consumer network. Example: - projects/{project}/global/networks/{network}. |
| `endpointProject` | string | The project number or ID where the PSC endpoint is to be created. |
| `requestedIpVersion` | string enum | The requested IP Version Values: `IP_VERSION_UNSPECIFIED`, `IPV4`, `IPV6`. |
| `serviceClass` | string | Required. The service class identifier of the producer. |

### `CheckConsumerConfigResponse`

- Response for CheckConsumerConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | array<string> | List of validation errors. If the list is empty, the consumer config is valid. Values: `ERROR_UNSPECIFIED`, `NETWORK_PROJECT_INVALID`, `NETWORK_PROJECT_APIS_NOT_ENABLED`, `NETWORK_INVALID`, `CONNECTION_POLICY_MISSING`, `IP_VERSION_NOT_SUPPORTED`, `NETWORK_PROJECT_SERVICE_AGENT_NOT_FOUND`, `ENDPOINT_PROJECT_INVALID`, `ENDPOINT_PROJECT_API_NOT_ENABLED`, `ENDPOINT_PROJECT_IS_NOT_SERVICE_PROJECT`. |

### `Config`

- Defines the configuration of a DNS record.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rrdatas` | array<string> | Required. The list of resource record data strings. The content and format of these strings depend on the AutomatedDnsRecord.type. For many common record types, this list may contain multiple strings. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. Examples: A record: \["192.0.2.1"\] or \["192.0.2.1", "192.0.2.2"\] TXT record: \["This is a text record"\] CNAME record: \["target.example.com."\] AAAA record: \["::1"\] or \["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "2001:0db8:85a3:0000:0000:8a2e:0370:7335"\] |
| `ttl` | string (google-duration) | Required. Number of seconds that this DNS record can be cached by resolvers. |

### `ConsumerPscConfig`

- Allow the producer to specify which consumers can connect to it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerInstanceProject` | string | Required. The project ID or project number of the consumer project. This project is the one that the consumer uses to interact with the producer instance. From the perspective of a consumer who's created a producer instance, this is the project of the producer instance. Format: 'projects/' Eg. 'projects/consumer-project' or 'projects/1234' |
| `disableGlobalAccess` | boolean | This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region. |
| `ipVersion` | string enum | The requested IP version for the PSC connection. Values: `IP_VERSION_UNSPECIFIED`, `IPV4`, `IPV6`. |
| `network` | string | The resource path of the consumer network where PSC connections are allowed to be created in. Note, this network does not need be in the ConsumerPscConfig.project in the case of SharedVPC. Example: projects/{projectNumOrId}/global/networks/{networkId}. |
| `producerInstanceId` | string | Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance. |
| `producerInstanceMetadata` | object | Immutable. An immutable map for the producer instance metadata. |
| `project` | string | The consumer project where PSC connections are allowed to be created in. |
| `serviceAttachmentIpAddressMap` | object | Optional. A map to store mapping between customer vip and target service attachment. This field can be used to specify a static IP address for a PSC connection. |
| `state` | string enum | Output only. Overall state of PSC Connections management for this consumer psc config. Values: `STATE_UNSPECIFIED`, `VALID`, `CONNECTION_POLICY_MISSING`, `POLICY_LIMIT_REACHED`, `CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED`. |

### `ConsumerPscConnection`

- PSC connection details on consumer side.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsAutomationStatus` | DnsAutomationStatus | Output only. The status of DNS automation for this PSC connection. |
| `error` | GoogleRpcStatus | The most recent error during operating this connection. |
| `errorInfo` | GoogleRpcErrorInfo | Output only. The error info for the latest error during operating this connection. |
| `errorType` | string enum | The error type indicates whether the error is consumer facing, producer facing or system internal. Values: `CONNECTION_ERROR_TYPE_UNSPECIFIED`, `ERROR_INTERNAL`, `ERROR_CONSUMER_SIDE`, `ERROR_PRODUCER_SIDE`. |
| `forwardingRule` | string | The URI of the consumer forwarding rule created. Example: projects/{projectNumOrId}/regions/us-east1/networks/{resourceId}. |
| `gceOperation` | string | The last Compute Engine operation to setup PSC connection. |
| `ip` | string | The IP literal allocated on the consumer network for the PSC forwarding rule that is created to connect to the producer service attachment in this service connection map. |
| `ipVersion` | string enum | The requested IP version for the PSC connection. Values: `IP_VERSION_UNSPECIFIED`, `IPV4`, `IPV6`. |
| `network` | string | The consumer network whose PSC forwarding rule is connected to the service attachments in this service connection map. Note that the network could be on a different project (shared VPC). |
| `producerInstanceId` | string | Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance. |
| `producerInstanceMetadata` | object | Immutable. An immutable map for the producer instance metadata. |
| `project` | string | The consumer project whose PSC forwarding rule is connected to the service attachments in this service connection map. |
| `pscConnectionId` | string | The PSC connection id of the PSC forwarding rule connected to the service attachments in this service connection map. |
| `selectedSubnetwork` | string | Output only. The URI of the selected subnetwork selected to allocate IP address for this connection. |
| `serviceAttachmentUri` | string | The URI of a service attachment which is the target of the PSC connection. |
| `state` | string enum | The state of the PSC connection. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `FAILED`, `CREATING`, `DELETING`, `CREATE_REPAIRING`, `DELETE_REPAIRING`. |

### `Destination`

- The `Destination` resource. It specifies the IP prefix and the associated autonomous system numbers (ASN) that you want to include in a `MulticloudDataTransferConfig` resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the `Destination` resource was created. |
| `description` | string | Optional. A description of this resource. |
| `endpoints` | array<DestinationEndpoint> | Required. Unordered list. The list of `DestinationEndpoint` resources configured for the IP prefix. |
| `etag` | string | The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. |
| `ipPrefix` | string | Required. Immutable. The IP prefix that represents your workload on another CSP. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Identifier. The name of the `Destination` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}`. |
| `stateTimeline` | StateTimeline | Output only. The timeline of the expected `Destination` states or the current rest state. If a state change is expected, the value is `ADDING`, `DELETING` or `SUSPENDING`, depending on the action specified. Example: "state_timeline": { "states": \[ { // The time when the `Destination` resource will be activated. "effectiveTime": "2024-12-01T08:00:00Z", "state": "ADDING" }, { // The time when the `Destination` resource will be suspended. "effectiveTime": "2024-12-01T20:00:00Z", "state": "SUSPENDING" } \] } |
| `uid` | string | Output only. The Google-generated unique ID for the `Destination` resource. This value is unique across all `Destination` resources. If a resource is deleted and another with the same name is created, the new resource is assigned a different and unique ID. |
| `updateTime` | string (google-datetime) | Output only. Time when the `Destination` resource was updated. |

### `DestinationEndpoint`

- The metadata for a `DestinationEndpoint` resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asn` | string (int64) | Required. The ASN of the remote IP prefix. |
| `csp` | string | Required. The CSP of the remote IP prefix. |
| `state` | string enum | Output only. The state of the `DestinationEndpoint` resource. Values: `STATE_UNSPECIFIED`, `VALID`, `INVALID`. |
| `updateTime` | string (google-datetime) | Output only. Time when the `DestinationEndpoint` resource was updated. |

### `DnsAutomationStatus`

- The status of DNS automation for a PSC connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | GoogleRpcStatus | Output only. The error details if the state is CREATE_FAILED or DELETE_FAILED. |
| `fqdn` | string | Output only. The fully qualified domain name of the DNS record. |
| `state` | string enum | Output only. The current state of DNS automation. Values: `STATE_UNSPECIFIED`, `PENDING_CREATE`, `ACTIVE`, `PENDING_DELETE`, `CREATE_FAILED`, `DELETE_FAILED`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExportPscConfig`

- Configuration for more granular control of Private Service Connect connection propagation. This allows enabling or disabling connection propagation for specific types of Private Service Connect endpoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `globalGoogleApis` | boolean | Optional. Controls whether Private Service Connect endpoints for global Google APIs should be propagated. The default value is false. |
| `publishedServicesAndRegionalGoogleApis` | boolean | Optional. Controls whether Private Service Connect endpoints for regional ILBs and regional Google APIs should be propagated. Default value is true if export_psc is true. Otherwise, the default value is false. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Filter`

- Filter matches L4 traffic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destRange` | string | Optional. The destination IP range of outgoing packets that this policy-based route applies to. Default is "0.0.0.0/0" if protocol version is IPv4 and "::/0" if protocol version is IPv6. |
| `ipProtocol` | string | Optional. The IP protocol that this policy-based route applies to. Valid values are 'TCP', 'UDP', and 'ALL'. Default is 'ALL'. |
| `protocolVersion` | string enum | Required. Internet protocol versions this policy-based route applies to. IPV4 and IPV6 is supported. Values: `PROTOCOL_VERSION_UNSPECIFIED`, `IPV4`, `IPV6`. |
| `srcRange` | string | Optional. The source IP range of outgoing packets that this policy-based route applies to. Default is "0.0.0.0/0" if protocol version is IPv4 and "::/0" if protocol version is IPv6. |

### `Gateway`

- A gateway that can apply specialized traffic processing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacity` | string enum | Optional. The aggregate processing capacity of this gateway. Values: `GATEWAY_CAPACITY_UNSPECIFIED`, `CAPACITY_1_GBPS`, `CAPACITY_10_GBPS`. |
| `cloudRouters` | array<string> | Output only. The list of Cloud Routers that are connected to this gateway. Should be in the form: https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/routers/{router} |
| `ipRangeReservations` | array<IpRangeReservation> | Optional. A list of IP ranges that are reserved for this gateway's internal intfrastructure. |
| `sacAttachment` | string | Output only. The URI of the connected SACAttachment. Should be in the form: projects/{project}/locations/{location}/sacAttachments/{sac_attachment} |

### `GatewayAdvertisedRoute`

- A gateway advertised route is a route that a gateway spoke advertises somewhere.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the gateway advertised route was created. |
| `description` | string | An optional description of the gateway advertised route. |
| `ipRange` | string | Immutable. This route's advertised IP address range. Must be a valid CIDR-formatted prefix. If an IP address is provided without a subnet mask, it is interpreted as, for IPv4, a `/32` singular IP address range, and, for IPv6, `/128`. |
| `labels` | object | Optional labels in key-value pair format. For more information about labels, see Requirements for labels (https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). |
| `name` | string | Identifier. The name of the gateway advertised route. Route names must be unique and use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke}/gatewayAdvertisedRoutes/{gateway_advertised_route_id}` |
| `priority` | integer (int32) | Optional. The priority of this advertised route. You can choose a value from `0` to `65335`. If you don't provide a value, Google Cloud assigns a priority of `100` to the ranges. |
| `recipient` | string enum | Optional. The recipient of this advertised route. Values: `RECIPIENT_UNSPECIFIED`, `ADVERTISE_TO_HUB`. |
| `state` | string enum | Output only. The current lifecycle state of this gateway advertised route. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ACCEPTING`, `REJECTING`, `UPDATING`, `INACTIVE`, `OBSOLETE`, `FAILED`. |
| `uniqueId` | string | Output only. The Google-generated UUID for the gateway advertised route. This value is unique across all gateway advertised route resources. If a gateway advertised route is deleted and another with the same name is created, the new route is assigned a different `unique_id`. |
| `updateTime` | string (google-datetime) | Output only. The time the gateway advertised route was last updated. |

### `GoogleLongrunningCancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleRpcErrorInfo`

- Describes the cause of the error with structured details. Example of an error when contacting the "pubsub.googleapis.com" API when it is not enabled: { "reason": "API_DISABLED" "domain": "googleapis.com" "metadata": { "resource": "projects/123", "service": "pubsub.googleapis.com" } } This response indicates that the pubsub.googleapis.com API is not enabled. Example of an error that is returned when attempting to create a Spanner instance in a region that is out of stock: { "reason": "STOCKOUT" "domain": "spanner.googleapis.com", "metadata": { "availableRegions": "us-central1,us-east2" } }
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". |
| `metadata` | object | Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. |
| `reason` | string | The reason for the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. |

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Group`

- A group represents a subset of spokes attached to a hub.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoAccept` | AutoAccept | Optional. The auto-accept setting for this group. |
| `createTime` | string (google-datetime) | Output only. The time the group was created. |
| `description` | string | Optional. The description of the group. |
| `labels` | object | Optional. Labels in key-value pair format. For more information about labels, see Requirements for labels (https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). |
| `name` | string | Immutable. The name of the group. Group names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/groups/{group_id}` |
| `routeTable` | string | Output only. The name of the route table that corresponds to this group. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}/routeTables/{route_table_id}` |
| `state` | string enum | Output only. The current lifecycle state of this group. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ACCEPTING`, `REJECTING`, `UPDATING`, `INACTIVE`, `OBSOLETE`, `FAILED`. |
| `uid` | string | Output only. The Google-generated UUID for the group. This value is unique across all group resources. If a group is deleted and another with the same name is created, the new route table is assigned a different unique_id. |
| `updateTime` | string (google-datetime) | Output only. The time the group was last updated. |

### `Hub`

- A Network Connectivity Center hub is a global management resource to which you attach spokes. A single hub can contain spokes from multiple regions. However, if any of a hub's spokes use the site-to-site data transfer feature, the resources associated with those spokes must all be in the same VPC network. Spokes that do not use site-to-site data transfer can be associated with any VPC network in your project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the hub was created. |
| `description` | string | Optional. An optional description of the hub. |
| `exportPsc` | boolean | Optional. Whether Private Service Connect connection propagation is enabled for the hub. If true, Private Service Connect endpoints in VPC spokes attached to the hub are made accessible to other VPC spokes attached to the hub. The default value is false. |
| `exportPscConfig` | ExportPscConfig | Optional. Config for more granular control of Private Service Connect transitivity. |
| `labels` | object | Optional labels in key-value pair format. For more information about labels, see Requirements for labels (https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). |
| `name` | string | Immutable. The name of the hub. Hub names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}` |
| `policyMode` | string enum | Optional. The policy mode of this hub. This field can be either PRESET or CUSTOM. If unspecified, the policy_mode defaults to PRESET. Values: `POLICY_MODE_UNSPECIFIED`, `PRESET`. |
| `presetTopology` | string enum | Optional. The topology implemented in this hub. Currently, this field is only used when policy_mode = PRESET. The available preset topologies are MESH and STAR. If preset_topology is unspecified and policy_mode = PRESET, the preset_topology defaults to MESH. When policy_mode = CUSTOM, the preset_topology is set to PRESET_TOPOLOGY_UNSPECIFIED. Values: `PRESET_TOPOLOGY_UNSPECIFIED`, `MESH`, `STAR`, `HYBRID_INSPECTION`. |
| `routeTables` | array<string> | Output only. The route tables that belong to this hub. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}/routeTables/{route_table_id}` This field is read-only. Network Connectivity Center automatically populates it based on the route tables nested under the hub. |
| `routingVpcs` | array<RoutingVPC> | Output only. The VPC networks associated with this hub's spokes. This field is read-only. Network Connectivity Center automatically populates it based on the set of spokes attached to the hub. |
| `spokeSummary` | SpokeSummary | Output only. A summary of the spokes associated with a hub. The summary includes a count of spokes according to type and according to state. If any spokes are inactive, the summary also lists the reasons they are inactive, including a count for each reason. |
| `state` | string enum | Output only. The current lifecycle state of this hub. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ACCEPTING`, `REJECTING`, `UPDATING`, `INACTIVE`, `OBSOLETE`, `FAILED`. |
| `uniqueId` | string | Output only. The Google-generated UUID for the hub. This value is unique across all hub resources. If a hub is deleted and another with the same name is created, the new hub is assigned a different unique_id. |
| `updateTime` | string (google-datetime) | Output only. The time the hub was last updated. |

### `Hub` (v1alpha1)

- Network Connectivity Center is a hub-and-spoke abstraction for network connectivity management in Google Cloud. It reduces operational complexity through a simple, centralized connectivity management model. Following is the resource message of a hub.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Time when the Hub was created. |
| `description` | string | Short description of the hub resource. |
| `labels` | object | User-defined labels. |
| `name` | string | Immutable. The name of a Hub resource. |
| `spokes` | array<string> | Output only. A list of the URIs of all attached spokes. This field is deprecated and will not be included in future API versions. Call ListSpokes on each region instead. |
| `state` | string enum | Output only. The current lifecycle state of this Hub. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `UPDATING`, `FAILED`. |
| `uniqueId` | string | Output only. Google-generated UUID for this resource. This is unique across all Hub resources. If a Hub resource is deleted and another with the same name is created, it gets a different unique_id. |
| `updateTime` | string (google-datetime) | Time when the Hub was updated. |

### `HubStatusEntry`

- A hub status entry represents the status of a set of propagated Private Service Connect connections grouped by certain fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | The number of propagated Private Service Connect connections with this status. If the `group_by` field was not set in the request message, the value of this field is 1. |
| `groupBy` | string | The fields that this entry is grouped by. This has the same value as the `group_by` field in the request message. |
| `pscPropagationStatus` | PscPropagationStatus | The Private Service Connect propagation status. |

### `InterconnectAttachment`

- InterconnectAttachment that this route applies to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `region` | string | Optional. Cloud region to install this policy-based route on interconnect attachment. Use `all` to install it on all interconnect attachments. |

### `InternalRange`

- The internal range resource for IPAM operations within a VPC network. Used to represent a private address range along with behavioral characteristics of that range (its usage and peering behavior). Networking resources can link to this range if they are created as belonging to it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocationOptions` | AllocationOptions | Optional. Range auto-allocation options, may be set only when auto-allocation is selected by not setting ip_cidr_range (and setting prefix_length). |
| `createTime` | string (google-datetime) | Output only. Time when the internal range was created. |
| `description` | string | Optional. A description of this resource. |
| `excludeCidrRanges` | array<string> | Optional. ExcludeCidrRanges flag. Specifies a set of CIDR blocks that allows exclusion of particular CIDR ranges from the auto-allocation process, without having to reserve these blocks |
| `immutable` | boolean | Optional. Immutable ranges cannot have their fields modified, except for labels and description. |
| `ipCidrRange` | string | Optional. The IP range that this internal range defines. NOTE: IPv6 ranges are limited to usage=EXTERNAL_TO_VPC and peering=FOR_SELF. NOTE: For IPv6 Ranges this field is compulsory, i.e. the address range must be specified explicitly. |
| `labels` | object | User-defined labels. |
| `migration` | Migration | Optional. Must be present if usage is set to FOR_MIGRATION. |
| `name` | string | Identifier. The name of an internal range. Format: projects/{project}/locations/{location}/internalRanges/{internal_range} See: https://google.aip.dev/122#fields-representing-resource-names |
| `network` | string | Immutable. The URL or resource ID of the network in which to reserve the internal range. The network cannot be deleted if there are any reserved internal ranges referring to it. Legacy networks are not supported. For example: https://www.googleapis.com/compute/v1/projects/{project}/locations/global/networks/{network} projects/{project}/locations/global/networks/{network} {network} |
| `overlaps` | array<string> | Optional. Types of resources that are allowed to overlap with the current internal range. Values: `OVERLAP_UNSPECIFIED`, `OVERLAP_ROUTE_RANGE`, `OVERLAP_EXISTING_SUBNET_RANGE`. |
| `peering` | string enum | Optional. The type of peering set for this internal range. Values: `PEERING_UNSPECIFIED`, `FOR_SELF`, `FOR_PEER`, `NOT_SHARED`. |
| `prefixLength` | integer (int32) | Optional. An alternate to ip_cidr_range. Can be set when trying to create an IPv4 reservation that automatically finds a free range of the given size. If both ip_cidr_range and prefix_length are set, there is an error if the range sizes do not match. Can also be used during updates to change the range size. NOTE: For IPv6 this field only works if ip_cidr_range is set as well, and both fields must match. In other words, with IPv6 this field only works as a redundant parameter. |
| `purpose` | string enum | Optional. The purpose of this internal range. Defines the intended use of the range and any restrictions associated with it. If not specified, it defaults to VPC_SUBNET. Values: `PURPOSE_UNSPECIFIED`, `VPC_SUBNET`, `INTERNAL_ADDRESS`. |
| `rangeStatus` | string enum | Output only. Status of the Internal Range. Values: `RANGE_STATUS_UNSPECIFIED`, `ACTIVE`, `OBSOLETE`, `CREATING`, `DELETING`. |
| `targetCidrRange` | array<string> | Optional. Can be set to narrow down or pick a different address space while searching for a free range. If not set, defaults to the \["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"\] address space (for auto-mode networks, the "10.0.0.0/9" range is used instead of "10.0.0.0/8"). This can be used to target the search in other rfc-1918 address spaces like "172.16.0.0/12" and "192.168.0.0/16" or non-rfc-1918 address spaces used in the VPC. |
| `updateTime` | string (google-datetime) | Output only. Time when the internal range was updated. |
| `usage` | string enum | Optional. The type of usage set for this InternalRange. Values: `USAGE_UNSPECIFIED`, `FOR_VPC`, `EXTERNAL_TO_VPC`, `FOR_MIGRATION`. |
| `users` | array<string> | Output only. The list of resources that refer to this internal range. Resources that use the internal range for their range allocation are referred to as users of the range. Other resources mark themselves as users while doing so by creating a reference to this internal range. Having a user, based on this reference, prevents deletion of the internal range referred to. Can be empty. |

### `IpRangeReservation`

- A list of IP ranges that are reserved for this gateway's internal intfrastructure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipRange` | string | Required. A block of IP addresses used to allocate supporting infrastructure for this gateway. This block must not overlap with subnets in any spokes or peer VPC networks that the gateway can communicate with. Example: "10.1.2.0/24" |

### `LinkedInterconnectAttachments`

- A collection of VLAN attachment resources. These resources should be redundant attachments that all advertise the same prefixes to Google Cloud. Alternatively, in active/passive configurations, all attachments should be capable of advertising the same prefixes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeExportRanges` | array<string> | Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub. |
| `excludeImportRanges` | array<string> | Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub. |
| `includeExportRanges` | array<string> | Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub. |
| `includeImportRanges` | array<string> | Optional. Hub routes fully encompassed by include import ranges are included during import from hub. |
| `proposedExcludeExportRanges` | array<string> | Output only. The proposed exclude export IP ranges waiting for hub administrator's approval. |
| `proposedExcludeImportRanges` | array<string> | Output only. The proposed exclude import IP ranges waiting for hub administrator's approval. |
| `proposedIncludeExportRanges` | array<string> | Output only. The proposed include export IP ranges waiting for hub administrator's approval. |
| `proposedIncludeImportRanges` | array<string> | Output only. The proposed include import IP ranges waiting for hub administrator's approval. |
| `siteToSiteDataTransfer` | boolean | A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in supported locations (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). |
| `uris` | array<string> | The URIs of linked interconnect attachment resources |
| `vpcNetwork` | string | Output only. The VPC network where these VLAN attachments are located. |

### `LinkedProducerVpcNetwork`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeExportRanges` | array<string> | Optional. IP ranges encompassing the subnets to be excluded from peering. |
| `includeExportRanges` | array<string> | Optional. IP ranges allowed to be included from peering. |
| `network` | string | Immutable. The URI of the Service Consumer VPC that the Producer VPC is peered with. |
| `peering` | string | Immutable. The name of the VPC peering between the Service Consumer VPC and the Producer VPC (defined in the Tenant project) which is added to the NCC hub. This peering must be in ACTIVE state. |
| `producerNetwork` | string | Output only. The URI of the Producer VPC. |
| `proposedExcludeExportRanges` | array<string> | Output only. The proposed exclude export IP ranges waiting for hub administrator's approval. |
| `proposedIncludeExportRanges` | array<string> | Output only. The proposed include export IP ranges waiting for hub administrator's approval. |
| `serviceConsumerVpcSpoke` | string | Output only. The Service Consumer Network spoke. |

### `LinkedRouterApplianceInstances`

- A collection of router appliance instances. If you configure multiple router appliance instances to receive data from the same set of sites outside of Google Cloud, we recommend that you associate those instances with the same spoke.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeExportRanges` | array<string> | Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub. |
| `excludeImportRanges` | array<string> | Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub. |
| `includeExportRanges` | array<string> | Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub. |
| `includeImportRanges` | array<string> | Optional. Hub routes fully encompassed by include import ranges are included during import from hub. |
| `instances` | array<RouterApplianceInstance> | The list of router appliance instances. |
| `proposedExcludeExportRanges` | array<string> | Output only. The proposed exclude export IP ranges waiting for hub administrator's approval. |
| `proposedExcludeImportRanges` | array<string> | Output only. The proposed exclude import IP ranges waiting for hub administrator's approval. |
| `proposedIncludeExportRanges` | array<string> | Output only. The proposed include export IP ranges waiting for hub administrator's approval. |
| `proposedIncludeImportRanges` | array<string> | Output only. The proposed include import IP ranges waiting for hub administrator's approval. |
| `siteToSiteDataTransfer` | boolean | A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in supported locations (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). |
| `vpcNetwork` | string | Output only. The VPC network where these router appliance instances are located. |

### `LinkedVpcNetwork`

- An existing VPC network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeExportRanges` | array<string> | Optional. IP ranges encompassing the subnets to be excluded from peering. |
| `includeExportRanges` | array<string> | Optional. IP ranges allowed to be included from peering. |
| `producerVpcSpokes` | array<string> | Output only. The list of Producer VPC spokes that this VPC spoke is a service consumer VPC spoke for. These producer VPCs are connected through VPC peering to this spoke's backing VPC network. Because they are directly connected through VPC peering, NCC export filters do not apply between the service consumer VPC spoke and any of its producer VPC spokes. This VPC spoke cannot be deleted as long as any of these producer VPC spokes are connected to the NCC Hub. |
| `proposedExcludeExportRanges` | array<string> | Output only. The proposed exclude export IP ranges waiting for hub administrator's approval. |
| `proposedIncludeExportRanges` | array<string> | Output only. The proposed include export IP ranges waiting for hub administrator's approval. |
| `uri` | string | Required. The URI of the VPC network resource. |

### `LinkedVpnTunnels`

- A collection of Cloud VPN tunnel resources. These resources should be redundant HA VPN tunnels that all advertise the same prefixes to Google Cloud. Alternatively, in a passive/active configuration, all tunnels should be capable of advertising the same prefixes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeExportRanges` | array<string> | Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub. |
| `excludeImportRanges` | array<string> | Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub. |
| `includeExportRanges` | array<string> | Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub. |
| `includeImportRanges` | array<string> | Optional. Hub routes fully encompassed by include import ranges are included during import from hub. |
| `proposedExcludeExportRanges` | array<string> | Output only. The proposed exclude export IP ranges waiting for hub administrator's approval. |
| `proposedExcludeImportRanges` | array<string> | Output only. The proposed exclude import IP ranges waiting for hub administrator's approval. |
| `proposedIncludeExportRanges` | array<string> | Output only. The proposed include export IP ranges waiting for hub administrator's approval. |
| `proposedIncludeImportRanges` | array<string> | Output only. The proposed include import IP ranges waiting for hub administrator's approval. |
| `siteToSiteDataTransfer` | boolean | A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in supported locations (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). |
| `uris` | array<string> | The URIs of linked VPN tunnel resources. |
| `vpcNetwork` | string | Output only. The VPC network where these VPN tunnels are located. |

### `ListAutomatedDnsRecordsResponse`

- Response for ListAutomatedDnsRecords.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automatedDnsRecords` | array<AutomatedDnsRecord> | AutomatedDnsRecords to be returned. |
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDestinationsResponse`

- Response message to list `Destination` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<Destination> | The list of `Destination` resources to be listed. |
| `nextPageToken` | string | The next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListGatewayAdvertisedRoutesResponse`

- Response for HubService.ListGatewayAdvertisedRoutes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gatewayAdvertisedRoutes` | array<GatewayAdvertisedRoute> | The requested gateway advertised routes. |
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |
| `unreachable` | array<string> | Hubs that could not be reached. |

### `ListGroupsResponse`

- Response for HubService.ListGroups method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groups` | array<Group> | The requested groups. |
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |
| `unreachable` | array<string> | Hubs that could not be reached. |

### `ListHubSpokesResponse`

- The response for HubService.ListHubSpokes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |
| `spokes` | array<Spoke> | The requested spokes. The spoke fields can be partially populated based on the `view` field in the request message. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListHubsResponse`

- Response for HubService.ListHubs method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hubs` | array<Hub> | The requested hubs. |
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInternalRangesResponse`

- Response for InternalRange.ListInternalRanges
- Version: v1

| Field | Type | Description |
|---|---|---|
| `internalRanges` | array<InternalRange> | Internal ranges to be returned. |
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMulticloudDataTransferConfigsResponse`

- Response message to list `MulticloudDataTransferConfig` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `multicloudDataTransferConfigs` | array<MulticloudDataTransferConfig> | The list of `MulticloudDataTransferConfig` resources to be listed. |
| `nextPageToken` | string | The next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListMulticloudDataTransferSupportedServicesResponse`

- Response message to list the services in your project in regions that are eligible for Data Transfer Essentials configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `multicloudDataTransferSupportedServices` | array<MulticloudDataTransferSupportedService> | The list of supported services. |
| `nextPageToken` | string | The next page token. |

### `ListPolicyBasedRoutesResponse`

- Response for PolicyBasedRoutingService.ListPolicyBasedRoutes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `policyBasedRoutes` | array<PolicyBasedRoute> | Policy-based routes to be returned. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListPscAuthorizationPoliciesResponse`

- Response for ListPscAuthorizationPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. |
| `pscAuthorizationPolicies` | array<PscAuthorizationPolicy> | The list of PscAuthorizationPolicies. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListRegionalEndpointsResponse`

- Response for ListRegionalEndpoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `regionalEndpoints` | array<RegionalEndpoint> | Regional endpoints to be returned. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRemoteTransportProfilesResponse`

- Message for response to listing RemoteTransportProfiles
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `remoteTransportProfiles` | array<RemoteTransportProfile> | The list of RemoteTransportProfiles. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListRouteTablesResponse`

- Response for HubService.ListRouteTables method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |
| `routeTables` | array<RouteTable> | The requested route tables. |
| `unreachable` | array<string> | Hubs that could not be reached. |

### `ListRoutesResponse`

- Response for HubService.ListRoutes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |
| `routes` | array<Route> | The requested routes. |
| `unreachable` | array<string> | RouteTables that could not be reached. |

### `ListServiceClassesResponse`

- Response for ListServiceClasses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `serviceClasses` | array<ServiceClass> | ServiceClasses to be returned. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListServiceConnectionMapsResponse`

- Response for ListServiceConnectionMaps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `serviceConnectionMaps` | array<ServiceConnectionMap> | ServiceConnectionMaps to be returned. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListServiceConnectionPoliciesResponse`

- Response for ListServiceConnectionPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `serviceConnectionPolicies` | array<ServiceConnectionPolicy> | ServiceConnectionPolicies to be returned. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListServiceConnectionTokensResponse`

- Response for ListServiceConnectionTokens.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The next pagination token in the List response. It should be used as page_token for the following request. An empty value means no more result. |
| `serviceConnectionTokens` | array<ServiceConnectionToken> | ServiceConnectionTokens to be returned. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListSpokesResponse`

- The response for HubService.ListSpokes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |
| `spokes` | array<Spoke> | The requested spokes. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListTransportsResponse`

- Message for response to listing Transports.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `transports` | array<Transport> | The list of Transport. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

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

### `LocationMetadata`

- Metadata about locations
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locationFeatures` | array<string> | List of supported features Values: `LOCATION_FEATURE_UNSPECIFIED`, `SITE_TO_CLOUD_SPOKES`, `SITE_TO_SITE_SPOKES`, `GATEWAY_SPOKES`, `TRANSPORTS`. |

### `Migration`

- Specification for migration with source and target resource names.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `source` | string | Immutable. Resource path as an URI of the source resource, for example a subnet. The project for the source resource should match the project for the InternalRange. An example: /projects/{project}/regions/{region}/subnetworks/{subnet} |
| `target` | string | Immutable. Resource path of the target resource. The target project can be different, as in the cases when migrating to peer networks. For example: /projects/{project}/regions/{region}/subnetworks/{subnet} |

### `MulticloudDataTransferConfig`

- The `MulticloudDataTransferConfig` resource. It lists the services that you configure for Data Transfer Essentials billing and metering.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the `MulticloudDataTransferConfig` resource was created. |
| `description` | string | Optional. A description of this resource. |
| `destinationsActiveCount` | integer (int32) | Output only. The number of `Destination` resources in use with the `MulticloudDataTransferConfig` resource. |
| `destinationsCount` | integer (int32) | Output only. The number of `Destination` resources configured for the `MulticloudDataTransferConfig` resource. |
| `etag` | string | The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Identifier. The name of the `MulticloudDataTransferConfig` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}`. |
| `services` | object | Optional. Maps services to their current or planned states. Service names are keys, and the associated values describe the state of the service. If a state change is expected, the value is either `ADDING` or `DELETING`, depending on the actions taken. Sample output: "services": { "big-query": { "states": \[ { "effectiveTime": "2024-12-12T08:00:00Z" "state": "ADDING", }, \] }, "cloud-storage": { "states": \[ { "state": "ACTIVE", } \] } } |
| `uid` | string | Output only. The Google-generated unique ID for the `MulticloudDataTransferConfig` resource. This value is unique across all `MulticloudDataTransferConfig` resources. If a resource is deleted and another with the same name is created, the new resource is assigned a different and unique ID. |
| `updateTime` | string (google-datetime) | Output only. Time when the `MulticloudDataTransferConfig` resource was updated. |

### `MulticloudDataTransferSupportedService`

- A service in your project in a region that is eligible for Data Transfer Essentials configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the service. |
| `serviceConfigs` | array<ServiceConfig> | Output only. The network service tier or regional endpoint supported for the service. |

### `NextHopInterconnectAttachment`

- A route next hop that leads to an interconnect attachment resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `siteToSiteDataTransfer` | boolean | Indicates whether site-to-site data transfer is allowed for this interconnect attachment resource. Data transfer is available only in supported locations (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). |
| `uri` | string | The URI of the interconnect attachment resource. |
| `vpcNetwork` | string | The VPC network where this interconnect attachment is located. |

### `NextHopRouterApplianceInstance`

- A route next hop that leads to a Router appliance instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `siteToSiteDataTransfer` | boolean | Indicates whether site-to-site data transfer is allowed for this Router appliance instance resource. Data transfer is available only in supported locations (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). |
| `uri` | string | The URI of the Router appliance instance. |
| `vpcNetwork` | string | The VPC network where this VM is located. |

### `NextHopSpoke`

- A route next hop that leads to a spoke resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `siteToSiteDataTransfer` | boolean | Indicates whether site-to-site data transfer is allowed for this spoke resource. Data transfer is available only in supported locations (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). Whether this route is accessible to other hybrid spokes with site-to-site data transfer enabled. If this is false, the route is only accessible to VPC spokes of the connected Hub. |
| `uri` | string | The URI of the spoke resource. |

### `NextHopVPNTunnel`

- A route next hop that leads to a VPN tunnel resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `siteToSiteDataTransfer` | boolean | Indicates whether site-to-site data transfer is allowed for this VPN tunnel resource. Data transfer is available only in supported locations (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations). |
| `uri` | string | The URI of the VPN tunnel resource. |
| `vpcNetwork` | string | The VPC network where this VPN tunnel is located. |

### `NextHopVpcNetwork`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | The URI of the VPC network resource |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PolicyBasedRoute`

- Policy-based routes route L4 network traffic based on not just destination IP address, but also source IP address, protocol, and more. If a policy-based route conflicts with other types of routes, the policy-based route always takes precedence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the policy-based route was created. |
| `description` | string | Optional. An optional description of this resource. Provide this field when you create the resource. |
| `filter` | Filter | Required. The filter to match L4 traffic. |
| `interconnectAttachment` | InterconnectAttachment | Optional. The interconnect attachments that this policy-based route applies to. |
| `kind` | string | Output only. Type of this resource. Always networkconnectivity#policyBasedRoute for policy-based Route resources. |
| `labels` | object | User-defined labels. |
| `name` | string | Immutable. Identifier. A unique name of the resource in the form of `projects/{project_number}/locations/global/PolicyBasedRoutes/{policy_based_route_id}` |
| `network` | string | Required. Fully-qualified URL of the network that this route applies to, for example: projects/my-project/global/networks/my-network. |
| `nextHopIlbIp` | string | Optional. The IP address of a global-access-enabled L4 ILB that is the next hop for matching packets. For this version, only nextHopIlbIp is supported. |
| `nextHopOtherRoutes` | string enum | Optional. Other routes that will be referenced to determine the next hop of the packet. Values: `OTHER_ROUTES_UNSPECIFIED`, `DEFAULT_ROUTING`. |
| `priority` | integer (int32) | Optional. The priority of this policy-based route. Priority is used to break ties in cases where there are more than one matching policy-based routes found. In cases where multiple policy-based routes are matched, the one with the lowest-numbered priority value wins. The default value is 1000. The priority value must be from 1 to 65535, inclusive. |
| `selfLink` | string | Output only. Server-defined fully-qualified URL for this resource. |
| `updateTime` | string (google-datetime) | Output only. Time when the policy-based route was updated. |
| `virtualMachine` | VirtualMachine | Optional. VM instances that this policy-based route applies to. |
| `warnings` | array<Warnings> | Output only. If potential misconfigurations are detected for this route, this field will be populated with warning messages. |

### `ProducerPscConfig`

- The PSC configurations on producer side.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automatedDnsCreationSpec` | AutomatedDnsCreationSpec | Optional. The specification for automatically creating a DNS record for this PSC connection. |
| `serviceAttachmentUri` | string | The resource path of a service attachment. Example: projects/{projectNumOrId}/regions/{region}/serviceAttachments/{resourceId}. |

### `PscAuthorizationPolicy`

- Represents a PSC Authorization Policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationMode` | string enum | Required. The authorization mode. Values: `AUTHORIZATION_MODE_UNSPECIFIED`, `AUTHORIZATION_MODE_TRANSITIVE_TO_SERVICE_ATTACHMENT`. |
| `authorizedClientResources` | array<string> | Required. List of authorized consumer resources allowed to connect. Supported values are: 1. Project resource name (e.g., `projects/{project_id}`) 2. Wildcard `"*"` (grants global ingress authorization to the target). |
| `createTime` | string (google-datetime) | Output only. The time when the PscAuthorizationPolicy was created. |
| `description` | string | Optional. A description of this resource. |
| `etag` | string | Output only. The etag of the PscAuthorizationPolicy. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Identifier. The name of the PscAuthorizationPolicy. Format: projects/{project}/locations/{location}/pscAuthorizationPolicies/{psc_authorization_policy} |
| `targetResourceUri` | string | Required. The full absolute URI of the targeted resource governed by this policy. For example, for an AgentRegistry resource, the format is: `//agentregistry.googleapis.com/projects/{project}/locations/{location}` |
| `uid` | string | Output only. The unique identifier of the PscAuthorizationPolicy. |
| `updateTime` | string (google-datetime) | Output only. The time when the PscAuthorizationPolicy was updated. |

### `PscConfig`

- Configuration used for Private Service Connect connections. Used when Infrastructure is PSC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedGoogleProducersResourceHierarchyLevel` | array<string> | Optional. List of Projects, Folders, or Organizations from where the Producer instance can be within. For example, a network administrator can provide both 'organizations/foo' and 'projects/bar' as allowed_google_producers_resource_hierarchy_levels. This allowlists this network to connect with any Producer instance within the 'foo' organization or the 'bar' project. By default, allowed_google_producers_resource_hierarchy_level is empty. The format for each allowed_google_producers_resource_hierarchy_level is / where is one of 'projects', 'folders', or 'organizations' and is either the ID or the number of the resource type. Format for each allowed_google_producers_resource_hierarchy_level value: 'projects/' or 'folders/' or 'organizations/' Eg. \[projects/my-project-id, projects/567, folders/891, organizations/123\] |
| `limit` | string (int64) | Optional. Max number of PSC connections for this policy. |
| `producerInstanceLocation` | string enum | Optional. ProducerInstanceLocation is used to specify which authorization mechanism to use to determine which projects the Producer instance can be within. Values: `PRODUCER_INSTANCE_LOCATION_UNSPECIFIED`, `CUSTOM_RESOURCE_HIERARCHY_LEVELS`. |
| `subnetworks` | array<string> | The resource paths of subnetworks to use for IP address management. Example: projects/{projectNumOrId}/regions/{region}/subnetworks/{resourceId}. |

### `PscConnection`

- Information about a specific Private Service Connect connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerAddress` | string | The resource reference of the consumer address. |
| `consumerForwardingRule` | string | The resource reference of the PSC Forwarding Rule within the consumer VPC. |
| `consumerTargetProject` | string | The project where the PSC connection is created. |
| `error` | GoogleRpcStatus | The most recent error during operating this connection. Deprecated, please use error_info instead. |
| `errorInfo` | GoogleRpcErrorInfo | Output only. The error info for the latest error during operating this connection. |
| `errorType` | string enum | The error type indicates whether the error is consumer facing, producer facing or system internal. Values: `CONNECTION_ERROR_TYPE_UNSPECIFIED`, `ERROR_INTERNAL`, `ERROR_CONSUMER_SIDE`, `ERROR_PRODUCER_SIDE`. |
| `gceOperation` | string | The last Compute Engine operation to setup PSC connection. |
| `ipVersion` | string enum | The requested IP version for the PSC connection. Values: `IP_VERSION_UNSPECIFIED`, `IPV4`, `IPV6`. |
| `producerInstanceId` | string | Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance. |
| `producerInstanceMetadata` | object | Immutable. An immutable map for the producer instance metadata. |
| `pscConnectionId` | string | The PSC connection id of the PSC forwarding rule. |
| `selectedSubnetwork` | string | Output only. The URI of the subnetwork selected to allocate IP address for this connection. |
| `serviceClass` | string | Output only. \[Output only\] The service class associated with this PSC Connection. The value is derived from the SCPolicy and matches the service class name provided by the customer. |
| `state` | string enum | State of the PSC Connection Values: `STATE_UNSPECIFIED`, `ACTIVE`, `FAILED`, `CREATING`, `DELETING`, `CREATE_REPAIRING`, `DELETE_REPAIRING`. |

### `PscPropagationStatus`

- The status of one or more propagated Private Service Connect connections in a hub.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The propagation status. Values: `CODE_UNSPECIFIED`, `READY`, `PROPAGATING`, `ERROR_PRODUCER_PROPAGATED_CONNECTION_LIMIT_EXCEEDED`, `ERROR_PRODUCER_NAT_IP_SPACE_EXHAUSTED`, `ERROR_PRODUCER_QUOTA_EXCEEDED`, `ERROR_CONSUMER_QUOTA_EXCEEDED`. |
| `message` | string | The human-readable summary of the Private Service Connect connection propagation status. |
| `sourceForwardingRule` | string | The name of the forwarding rule exported to the hub. |
| `sourceGroup` | string | The name of the group that the source spoke belongs to. |
| `sourceSpoke` | string | The name of the spoke that the source forwarding rule belongs to. |
| `targetGroup` | string | The name of the group that the target spoke belongs to. |
| `targetSpoke` | string | The name of the spoke that the source forwarding rule propagates to. |

### `QueryHubStatusResponse`

- The response for HubService.QueryHubStatus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hubStatusEntries` | array<HubStatusEntry> | The list of hub status. |
| `nextPageToken` | string | The token for the next page of the response. To see more results, use this value as the page_token for your next request. If this value is empty, there are no more results. |

### `RegionalEndpoint`

- The RegionalEndpoint resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessType` | string enum | Required. The access type of this regional endpoint. This field is reflected in the PSC Forwarding Rule configuration to enable global access. Values: `ACCESS_TYPE_UNSPECIFIED`, `GLOBAL`, `REGIONAL`. |
| `address` | string | Optional. The IP Address of the Regional Endpoint. When no address is provided, an IP from the subnetwork is allocated. Use one of the following formats: \* IPv4 address as in `10.0.0.1` \* Address resource URI as in `projects/{project}/regions/{region}/addresses/{address_name}` for an IPv4 or IPv6 address. |
| `createTime` | string (google-datetime) | Output only. Time when the RegionalEndpoint was created. |
| `description` | string | Optional. A description of this resource. |
| `ipAddress` | string | Output only. The literal IP address of the PSC Forwarding Rule created on behalf of the customer. This field is deprecated. Use address instead. |
| `labels` | object | User-defined labels. |
| `name` | string | Output only. The name of a RegionalEndpoint. Pattern: `projects/{project}/locations/{location}/regionalEndpoints/^[-a-z0-9](?:[-a-z0-9]{0,44})[a-z0-9]$`. |
| `network` | string | Optional. The name of the VPC network for this private regional endpoint. Format: `projects/{project}/global/networks/{network}` |
| `pscForwardingRule` | string | Output only. The resource reference of the PSC Forwarding Rule created on behalf of the customer. Format: `//compute.googleapis.com/projects/{project}/regions/{region}/forwardingRules/{forwarding_rule_name}` |
| `subnetwork` | string | Optional. The name of the subnetwork from which the IP address will be allocated. Format: `projects/{project}/regions/{region}/subnetworks/{subnetwork}` |
| `targetGoogleApi` | string | Required. The service endpoint this private regional endpoint connects to. Format: `{apiname}.{region}.p.rep.googleapis.com` Example: "cloudkms.us-central1.p.rep.googleapis.com". |
| `updateTime` | string (google-datetime) | Output only. Time when the RegionalEndpoint was updated. |

### `RejectHubSpokeRequest`

- The request for HubService.RejectHubSpoke.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Optional. Additional information provided by the hub administrator. |
| `requestId` | string | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `spokeUri` | string | Required. The URI of the spoke to reject from the hub. |

### `RejectHubSpokeResponse`

- The response for HubService.RejectHubSpoke.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `spoke` | Spoke | The spoke that was operated on. |

### `RejectSpokeUpdateRequest`

- The request for HubService.RejectSpokeUpdate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Optional. Additional information provided by the hub administrator. |
| `requestId` | string | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `spokeEtag` | string | Required. The etag of the spoke to reject update. |
| `spokeUri` | string | Required. The URI of the spoke to reject update. |

### `RemoteTransportProfile`

- Message describing RemoteTransportProfile object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. Description of the profile. |
| `displayName` | string | Output only. Human readable name of this profile, used to identify this profile in the UI. |
| `flow` | string enum | Output only. Type of provisioning flows supported by this profile. Values: `KEY_PROVISIONING_FLOW_UNSPECIFIED`, `INPUT_ONLY`, `OUTPUT_ONLY`, `INPUT_OR_OUTPUT`. |
| `labels` | object | Output only. Labels as key value pairs. |
| `name` | string | Identifier. Name of the resource in the format of $provider-$site. |
| `orderState` | string enum | Output only. Order state for this profile. Values: `STATE_UNSPECIFIED`, `CLOSED`, `OPEN`. |
| `provider` | string | Output only. Name of the provider on the other end of this profile. E.g. “Amazon Web Services” or “Microsoft Azure”. |
| `providerSite` | string | Output only. If the profile is a Cloud Service Provider with compute resources, this is populated with the region where connectivity is being established. If the profile provides facility-level selection, this is an identity of the facility any connections on this profile are going through. |
| `sla` | string enum | Output only. Availability class that will be configured for this particular RemoteTransportProfile. Values: `SERVICE_LEVEL_AVAILABILITY_UNSPECIFIED`, `HIGH`, `MAXIMUM`. |
| `supportedBandwidths` | array<string> | Output only. List of bandwidth enum values that are supported by this profile. Values: `BANDWIDTH_UNSPECIFIED`, `BPS_50M`, `BPS_100M`, `BPS_200M`, `BPS_300M`, `BPS_400M`, `BPS_500M`, `BPS_1G`, `BPS_2G`, `BPS_5G`, `BPS_10G`, `BPS_20G`, `BPS_50G`, `BPS_100G`. |

### `Route`

- A route defines a path from VM instances within a spoke to a specific destination resource. Only VPC spokes have routes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the route was created. |
| `description` | string | An optional description of the route. |
| `ipCidrRange` | string | The destination IP address range. |
| `labels` | object | Optional labels in key-value pair format. For more information about labels, see Requirements for labels (https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). |
| `location` | string | Output only. The origin location of the route. Uses the following form: "projects/{project}/locations/{location}" Example: projects/1234/locations/us-central1 |
| `name` | string | Immutable. The name of the route. Route names must be unique. Route names use the following form: `projects/{project_number}/locations/global/hubs/{hub}/routeTables/{route_table_id}/routes/{route_id}` |
| `nextHopInterconnectAttachment` | NextHopInterconnectAttachment | Immutable. The next-hop VLAN attachment for packets on this route. |
| `nextHopRouterApplianceInstance` | NextHopRouterApplianceInstance | Immutable. The next-hop Router appliance instance for packets on this route. |
| `nextHopSpoke` | NextHopSpoke | Immutable. The next-hop spoke for packets on this route. |
| `nextHopVpcNetwork` | NextHopVpcNetwork | Immutable. The destination VPC network for packets on this route. |
| `nextHopVpnTunnel` | NextHopVPNTunnel | Immutable. The next-hop VPN tunnel for packets on this route. |
| `priority` | string (int64) | Output only. The priority of this route. Priority is used to break ties in cases where a destination matches more than one route. In these cases the route with the lowest-numbered priority value wins. |
| `spoke` | string | Immutable. The spoke that this route leads to. Example: projects/12345/locations/global/spokes/SPOKE |
| `state` | string enum | Output only. The current lifecycle state of the route. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ACCEPTING`, `REJECTING`, `UPDATING`, `INACTIVE`, `OBSOLETE`, `FAILED`. |
| `type` | string enum | Output only. The route's type. Its type is determined by the properties of its IP address range. Values: `ROUTE_TYPE_UNSPECIFIED`, `VPC_PRIMARY_SUBNET`, `VPC_SECONDARY_SUBNET`, `DYNAMIC_ROUTE`, `PSC_GLOBAL_GAPI`. |
| `uid` | string | Output only. The Google-generated UUID for the route. This value is unique across all Network Connectivity Center route resources. If a route is deleted and another with the same name is created, the new route is assigned a different `uid`. |
| `updateTime` | string (google-datetime) | Output only. The time the route was last updated. |

### `RouteTable`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the route table was created. |
| `description` | string | An optional description of the route table. |
| `labels` | object | Optional labels in key-value pair format. For more information about labels, see Requirements for labels (https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). |
| `name` | string | Immutable. The name of the route table. Route table names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/routeTables/{route_table_id}` |
| `state` | string enum | Output only. The current lifecycle state of this route table. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ACCEPTING`, `REJECTING`, `UPDATING`, `INACTIVE`, `OBSOLETE`, `FAILED`. |
| `uid` | string | Output only. The Google-generated UUID for the route table. This value is unique across all route table resources. If a route table is deleted and another with the same name is created, the new route table is assigned a different `uid`. |
| `updateTime` | string (google-datetime) | Output only. The time the route table was last updated. |

### `RouterApplianceInstance`

- A router appliance instance is a Compute Engine virtual machine (VM) instance that acts as a BGP speaker. A router appliance instance is specified by the URI of the VM and the internal IP address of one of the VM's network interfaces.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The IP address on the VM to use for peering. |
| `virtualMachine` | string | The URI of the VM. |

### `RouterApplianceInstance` (v1alpha1)

- RouterAppliance represents a Router appliance which is specified by a VM URI and a NIC address.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The IP address of the network interface to use for peering. |
| `networkInterface` | string | — |
| `virtualMachine` | string | The URI of the virtual machine resource |

### `RoutingVPC`

- RoutingVPC contains information about the VPC networks associated with the spokes of a Network Connectivity Center hub.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requiredForNewSiteToSiteDataTransferSpokes` | boolean | Output only. If true, indicates that this VPC network is currently associated with spokes that use the data transfer feature (spokes where the site_to_site_data_transfer field is set to true). If you create new spokes that use data transfer, they must be associated with this VPC network. At most, one VPC network will have this field set to true. |
| `uri` | string | The URI of the VPC network. |

### `ServiceClass`

- The ServiceClass resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the ServiceClass was created. |
| `description` | string | A description of this resource. |
| `etag` | string | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | User-defined labels. |
| `name` | string | Immutable. The name of a ServiceClass resource. Format: projects/{project}/locations/{location}/serviceClasses/{service_class} See: https://google.aip.dev/122#fields-representing-resource-names |
| `serviceClass` | string | Output only. The generated service class name. Use this name to refer to the Service class in Service Connection Maps and Service Connection Policies. |
| `updateTime` | string (google-datetime) | Output only. Time when the ServiceClass was updated. |

### `ServiceConfig`

- Specifies eligibility information for the service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eligibilityCriteria` | string enum | Output only. The eligibility criteria for the service. Values: `ELIGIBILITY_CRITERIA_UNSPECIFIED`, `NETWORK_SERVICE_TIER_PREMIUM_ONLY`, `NETWORK_SERVICE_TIER_STANDARD_ONLY`, `REQUEST_ENDPOINT_REGIONAL_ENDPOINT_ONLY`. |
| `supportEndTime` | string (google-datetime) | Output only. The end time for eligibility criteria support. If not specified, no planned end time is set. |

### `ServiceConnectionMap`

- The ServiceConnectionMap resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerPscConfigs` | array<ConsumerPscConfig> | The PSC configurations on consumer side. |
| `consumerPscConnections` | array<ConsumerPscConnection> | Output only. PSC connection details on consumer side. |
| `createTime` | string (google-datetime) | Output only. Time when the ServiceConnectionMap was created. |
| `description` | string | A description of this resource. |
| `etag` | string | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `infrastructure` | string enum | Output only. The infrastructure used for connections between consumers/producers. Values: `INFRASTRUCTURE_UNSPECIFIED`, `PSC`. |
| `labels` | object | User-defined labels. |
| `name` | string | Immutable. The name of a ServiceConnectionMap. Format: projects/{project}/locations/{location}/serviceConnectionMaps/{service_connection_map} See: https://google.aip.dev/122#fields-representing-resource-names |
| `producerPscConfigs` | array<ProducerPscConfig> | The PSC configurations on producer side. |
| `serviceClass` | string | The service class identifier this ServiceConnectionMap is for. The user of ServiceConnectionMap create API needs to have networkconnectivity.serviceClasses.use IAM permission for the service class. |
| `serviceClassUri` | string | Output only. The service class uri this ServiceConnectionMap is for. |
| `token` | string | The token provided by the consumer. This token authenticates that the consumer can create a connection within the specified project and network. |
| `updateTime` | string (google-datetime) | Output only. Time when the ServiceConnectionMap was updated. |

### `ServiceConnectionPolicy`

- The ServiceConnectionPolicy resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCreatedSubnetInfo` | AutoCreatedSubnetworkInfo | Output only. Information for the automatically created subnetwork and its associated IR. |
| `createTime` | string (google-datetime) | Output only. Time when the ServiceConnectionPolicy was created. |
| `description` | string | A description of this resource. |
| `etag` | string | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `infrastructure` | string enum | Output only. The type of underlying resources used to create the connection. Values: `INFRASTRUCTURE_UNSPECIFIED`, `PSC`. |
| `labels` | object | User-defined labels. |
| `name` | string | Immutable. The name of a ServiceConnectionPolicy. Format: projects/{project}/locations/{location}/serviceConnectionPolicies/{service_connection_policy} See: https://google.aip.dev/122#fields-representing-resource-names |
| `network` | string | The resource path of the consumer network. Example: - projects/{projectNumOrId}/global/networks/{resourceId}. |
| `pscConfig` | PscConfig | Configuration used for Private Service Connect connections. Used when Infrastructure is PSC. |
| `pscConnections` | array<PscConnection> | Output only. \[Output only\] Information about each Private Service Connect connection. |
| `serviceClass` | string | The service class identifier for which this ServiceConnectionPolicy is for. The service class identifier is a unique, symbolic representation of a ServiceClass. It is provided by the Service Producer. Google services have a prefix of gcp or google-cloud. For example, gcp-memorystore-redis or google-cloud-sql. 3rd party services do not. For example, test-service-a3dfcx. |
| `updateTime` | string (google-datetime) | Output only. Time when the ServiceConnectionPolicy was updated. |

### `ServiceConnectionToken`

- The ServiceConnectionToken resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the ServiceConnectionToken was created. |
| `description` | string | A description of this resource. |
| `etag` | string | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `expireTime` | string (google-datetime) | Output only. The time to which this token is valid. |
| `labels` | object | User-defined labels. |
| `name` | string | Immutable. The name of a ServiceConnectionToken. Format: projects/{project}/locations/{location}/ServiceConnectionTokens/{service_connection_token} See: https://google.aip.dev/122#fields-representing-resource-names |
| `network` | string | The resource path of the network associated with this token. Example: projects/{projectNumOrId}/global/networks/{resourceId}. |
| `token` | string | Output only. The token generated by Automation. |
| `updateTime` | string (google-datetime) | Output only. Time when the ServiceConnectionToken was updated. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Spoke`

- A Network Connectivity Center spoke represents one or more network connectivity resources. When you create a spoke, you associate it with a hub. You must also identify a value for exactly one of the following fields: \* linked_vpn_tunnels \* linked_interconnect_attachments \* linked_router_appliance_instances \* linked_vpc_network
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the spoke was created. |
| `description` | string | Optional. An optional description of the spoke. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `fieldPathsPendingUpdate` | array<string> | Output only. The list of fields waiting for hub administrator's approval. |
| `gateway` | Gateway | Optional. This is a gateway that can apply specialized processing to traffic going through it. |
| `group` | string | Optional. The name of the group that this spoke is associated with. |
| `hub` | string | Immutable. The name of the hub that this spoke is attached to. |
| `labels` | object | Optional labels in key-value pair format. For more information about labels, see Requirements for labels (https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements). |
| `linkedInterconnectAttachments` | LinkedInterconnectAttachments | Optional. VLAN attachments that are associated with the spoke. |
| `linkedProducerVpcNetwork` | LinkedProducerVpcNetwork | Optional. The linked producer VPC that is associated with the spoke. |
| `linkedRouterApplianceInstances` | LinkedRouterApplianceInstances | Optional. Router appliance instances that are associated with the spoke. |
| `linkedVpcNetwork` | LinkedVpcNetwork | Optional. VPC network that is associated with the spoke. |
| `linkedVpnTunnels` | LinkedVpnTunnels | Optional. VPN tunnels that are associated with the spoke. |
| `name` | string | Immutable. The name of the spoke. Spoke names must be unique. They use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke_id}` |
| `reasons` | array<StateReason> | Output only. The reasons for current state of the spoke. |
| `spokeType` | string enum | Output only. The type of resource associated with the spoke. Values: `SPOKE_TYPE_UNSPECIFIED`, `VPN_TUNNEL`, `INTERCONNECT_ATTACHMENT`, `ROUTER_APPLIANCE`, `VPC_NETWORK`, `GATEWAY`, `PRODUCER_VPC_NETWORK`. |
| `state` | string enum | Output only. The current lifecycle state of this spoke. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ACCEPTING`, `REJECTING`, `UPDATING`, `INACTIVE`, `OBSOLETE`, `FAILED`. |
| `uniqueId` | string | Output only. The Google-generated UUID for the spoke. This value is unique across all spoke resources. If a spoke is deleted and another with the same name is created, the new spoke is assigned a different `unique_id`. |
| `updateTime` | string (google-datetime) | Output only. The time the spoke was last updated. |

### `Spoke` (v1alpha1)

- A Spoke is an abstraction of a network attachment being attached to a Hub. A Spoke can be underlying a VPN tunnel, a VLAN (interconnect) attachment, a Router appliance, etc.
- Version: v1alpha1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time when the Spoke was created. |
| `description` | string | Short description of the spoke resource |
| `hub` | string | The resource URL of the hub resource that the spoke is attached to |
| `labels` | object | User-defined labels. |
| `linkedInterconnectAttachments` | array<string> | The URIs of linked interconnect attachment resources |
| `linkedRouterApplianceInstances` | array<RouterApplianceInstance> | The URIs of linked Router appliance resources |
| `linkedVpnTunnels` | array<string> | The URIs of linked VPN tunnel resources |
| `name` | string | Immutable. The name of a Spoke resource. |
| `state` | string enum | Output only. The current lifecycle state of this Hub. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `UPDATING`, `FAILED`. |
| `uniqueId` | string | Output only. Google-generated UUID for this resource. This is unique across all Spoke resources. If a Spoke resource is deleted and another with the same name is created, it gets a different unique_id. |
| `updateTime` | string (google-datetime) | The time when the Spoke was updated. |

### `SpokeStateCount`

- The number of spokes that are in a particular state and associated with a given hub.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Output only. The total number of spokes that are in this state and associated with a given hub. |
| `state` | string enum | Output only. The state of the spokes. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `ACCEPTING`, `REJECTING`, `UPDATING`, `INACTIVE`, `OBSOLETE`, `FAILED`. |

### `SpokeStateReasonCount`

- The number of spokes in the hub that are inactive for this reason.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Output only. The total number of spokes that are inactive for a particular reason and associated with a given hub. |
| `stateReasonCode` | string enum | Output only. The reason that a spoke is inactive. Values: `CODE_UNSPECIFIED`, `PENDING_REVIEW`, `REJECTED`, `PAUSED`, `FAILED`, `UPDATE_PENDING_REVIEW`, `UPDATE_REJECTED`, `UPDATE_FAILED`. |

### `SpokeSummary`

- Summarizes information about the spokes associated with a hub. The summary includes a count of spokes according to type and according to state. If any spokes are inactive, the summary also lists the reasons they are inactive, including a count for each reason.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `spokeStateCounts` | array<SpokeStateCount> | Output only. Counts the number of spokes that are in each state and associated with a given hub. |
| `spokeStateReasonCounts` | array<SpokeStateReasonCount> | Output only. Counts the number of spokes that are inactive for each possible reason and associated with a given hub. |
| `spokeTypeCounts` | array<SpokeTypeCount> | Output only. Counts the number of spokes of each type that are associated with a specific hub. |

### `SpokeTypeCount`

- The number of spokes of a given type that are associated with a specific hub. The type indicates what kind of resource is associated with the spoke.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Output only. The total number of spokes of this type that are associated with the hub. |
| `spokeType` | string enum | Output only. The type of the spokes. Values: `SPOKE_TYPE_UNSPECIFIED`, `VPN_TUNNEL`, `INTERCONNECT_ATTACHMENT`, `ROUTER_APPLIANCE`, `VPC_NETWORK`, `GATEWAY`, `PRODUCER_VPC_NETWORK`. |

### `StateMetadata`

- The state and activation time details of the resource state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveTime` | string (google-datetime) | Output only. Accompanies only the transient states, which include `ADDING`, `DELETING`, and `SUSPENDING`, to denote the time until which the transient state of the resource will be effective. For instance, if the state is `ADDING`, this field shows the time when the resource state transitions to `ACTIVE`. |
| `state` | string enum | Output only. The state of the resource. Values: `STATE_UNSPECIFIED`, `ADDING`, `ACTIVE`, `DELETING`, `SUSPENDING`, `SUSPENDED`. |

### `StateReason`

- The reason for the current state of the spoke.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The code associated with this reason. Values: `CODE_UNSPECIFIED`, `PENDING_REVIEW`, `REJECTED`, `PAUSED`, `FAILED`, `UPDATE_PENDING_REVIEW`, `UPDATE_REJECTED`, `UPDATE_FAILED`. |
| `message` | string | Human-readable details about this reason. |
| `userDetails` | string | Additional information provided by the user in the RejectSpoke call. |

### `StateTimeline`

- The timeline of the pending states for a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `states` | array<StateMetadata> | Output only. The state and activation time details of the resource state. |

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

### `Transport`

- Message describing Transport object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advertisedRoutes` | array<string> | Optional. List of IP Prefixes that will be advertised to the remote provider. Both IPv4 and IPv6 addresses are supported. |
| `autoAccept` | boolean | Optional. Immutable. Controls whether resources proposed by the Transport are automatically accepted on behalf of the user. List of actions that can be automatically accepted are: 1. VPC Peering creation 2. Routing VPC Spoke creation 3. Hybrid Spoke creation |
| `bandwidth` | string enum | Optional. Bandwidth of the Transport. This must be one of the supported bandwidths for the remote profile, and must be set when no activation key is being provided. Values: `BANDWIDTH_UNSPECIFIED`, `BPS_50M`, `BPS_100M`, `BPS_200M`, `BPS_300M`, `BPS_400M`, `BPS_500M`, `BPS_1G`, `BPS_2G`, `BPS_5G`, `BPS_10G`, `BPS_20G`, `BPS_50G`, `BPS_100G`. |
| `createTime` | string (google-datetime) | Output only. Create time stamp. |
| `description` | string | Optional. Description of the Transport. |
| `generatedActivationKey` | string | Output only. Google-generated activation key. This is only output if the selected profile supports an OUTPUT key flow. Inputting this to the provider is only valid while the resource is in a PENDING_KEY state. Once the provider has accepted the key, the resource will move to the CONFIGURING state. |
| `hub` | string | Optional. Immutable. The NCC Hub that the Transport should attach to. The hub must be in the same project as the Transport. Format: `{hub}` or `projects/{project}/locations/global/hubs/{hub}` |
| `labels` | object | Optional. Labels as key value pairs. |
| `mtuLimit` | integer (int32) | Output only. The maximum transmission unit (MTU) of a packet that can be sent over this transport. |
| `name` | string | Identifier. Name of the resource. |
| `network` | string | Optional. Immutable. Resource URI of the Network that will be peered with this Transport. This field must be provided during resource creation and cannot be changed. |
| `peeringNetwork` | string | Output only. VPC Network URI that was created for the VPC Peering connection to the provided `network`. If VPC Peering is disconnected, this can be used to re-establish. |
| `providedActivationKey` | string | Optional. Immutable. Key used for establishing a connection with the remote transport. This key can only be provided if the profile supports an INPUT key flow and the resource is in the PENDING_KEY state. |
| `pscRoutingEnabled` | boolean | Optional. Immutable. Controls whether a Routing VPC Spoke should be created and attached to the NCC Hub. This will provide Private Service Connect (PSC) connectivity through NCC. This can only be set when the Transport is first created. |
| `remoteAccountId` | string | Optional. Immutable. The user supplied account id for the CSP associated with the remote profile. |
| `remoteProfile` | string | Optional. Immutable. Name of the remoteTransportProfile that this Transport is connecting to. |
| `stackType` | string enum | Optional. IP version stack for the established connectivity. Values: `STACK_TYPE_UNSPECIFIED`, `IPV4_ONLY`, `IPV4_IPV6`. |
| `state` | string enum | Output only. State of the underlying connectivity. Values: `STATE_UNSPECIFIED`, `CREATING`, `PENDING_CONFIG`, `PENDING_KEY`, `ACTIVE`, `DELETING`, `DEPROVISIONED`, `SUSPENDED`. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp. |

### `VirtualMachine`

- VM instances that this policy-based route applies to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tags` | array<string> | Optional. A list of VM instance tags that this policy-based route applies to. VM instances that have ANY of tags specified here installs this PBR. |

### `Warnings`

- Informational warning message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. A warning code, if applicable. Values: `WARNING_UNSPECIFIED`, `RESOURCE_NOT_ACTIVE`, `RESOURCE_BEING_MODIFIED`. |
| `data` | object | Output only. Metadata about this warning in key: value format. The key should provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be scope and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement. |
| `warningMessage` | string | Output only. A human-readable description of the warning code. |

### Shape of `AcceptHubSpokeRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "requestId": "string",
  "spokeUri": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha1 of `networkconnectivity` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `network` description of `InternalRange` gives the examples `https://www.googleapis.com/compute/v1/projects/{project}/locations/global/networks/{network}` and `projects/{project}/locations/global/networks/{network}`, but a Compute Engine network URL has no `locations/` segment (`https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`); the `{network}` ID form that the description also lists avoids the ambiguity.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` `metadata` key regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[a-z][a-zA-Z0-9-_]+` (shown above as `a-z+`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` / `FieldViolation` `reason` regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[A-Z][A-Z0-9_]+[A-Z0-9]` (UPPER_SNAKE_CASE; shown above as `A-Z+[A-Z0-9]`).
- Source: https://networkconnectivity.googleapis.com/$discovery/rest?version=v1, https://networkconnectivity.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
