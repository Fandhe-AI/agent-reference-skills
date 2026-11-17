---
source: https://networkservices.googleapis.com/$discovery/rest?version=v1
---

# Network Services API message schemas (networkservices) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/networkservices/`.

### `AgentConnectivityTemplate`

- AgentConnectivityTemplate represents a reusable network configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessPath` | string enum | Optional. Immutable. The path of the access. Maps roughly to ingress/egress, though we keep CLIENT_TO_AGENT and AGENT_TO_ANYWHERE as carryovers from Agent Gateway's original resource model. The path is immutable once set. Exactly one path can be set. Values: `ACCESS_PATH_UNSPECIFIED`, `CLIENT_TO_AGENT`, `AGENT_TO_ANYWHERE`. |
| `accessTypes` | array<string> | Optional. The types of network access provided to the gateway. Both PUBLIC and PRIVATE can be configured. Values: `ACCESS_TYPE_UNSPECIFIED`, `PUBLIC`, `PRIVATE`. |
| `agentCompute` | string enum | Optional. The compute environment where the agent is hosted. Exactly one type of compute must be chosen. Values: `AGENT_COMPUTE_UNSPECIFIED`, `GKE`, `CLOUD_RUN`, `BORG`, `GCE_VM`. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `deploymentModel` | string enum | Optional. The deployment model for the gateway. Values: `DEPLOYMENT_MODEL_UNSPECIFIED`, `CENTRALIZED`, `AMBIENT`. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `egressNetworkConfig` | EgressNetworkConfig | Optional. Configuration for egress network traffic. |
| `etag` | string | Optional. Etag of the resource. If this is provided, it must match the server's etag. If the provided etag does not match the server's etag, the request will fail with a 409 ABORTED error. |
| `labels` | object | Optional. Set of label tags associated with the AgentConnectivityTemplate resource. |
| `name` | string | Identifier. Name of the AgentConnectivityTemplate resource. It matches pattern `projects/*/locations/*/agentConnectivityTemplates/`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `AgentGateway`

- AgentGateway represents the agent gateway resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentConnectivityTemplate` | string | Optional. The resource name of the AgentConnectivityTemplate. Format: projects/{project}/locations/{location}/agentConnectivityTemplates/{template} |
| `agentGatewayCard` | AgentGatewayAgentGatewayOutputCard | Output only. Field for populated AgentGateway card. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `etag` | string | Optional. Etag of the resource. If this is provided, it must match the server's etag. If the provided etag does not match the server's etag, the request will fail with a 409 ABORTED error. |
| `googleManaged` | AgentGatewayGoogleManaged | Optional. Proxy is orchestrated and managed by GoogleCloud in a tenant project. |
| `labels` | object | Optional. Set of label tags associated with the AgentGateway resource. |
| `name` | string | Identifier. Name of the AgentGateway resource. It matches pattern `projects/*/locations/*/agentGateways/`. |
| `networkConfig` | AgentGatewayNetworkConfig | Optional. Network configuration for the AgentGateway. |
| `protocols` | array<string> | Optional. Deprecated. Values: `PROTOCOL_UNSPECIFIED`, `MCP`. |
| `registries` | array<string> | Optional. A list of Agent registries containing the agents, MCP servers and tools governed by the Agent Gateway. Note: Currently limited to project-scoped registries Must be of format `//agentregistry.googleapis.com/projects/{project}/locations/{location}/` |
| `selfManaged` | AgentGatewaySelfManaged | Optional. Attach to existing Application Load Balancers or Secure Web Proxies. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `AgentGatewayAgentGatewayOutputCard`

- AgentGatewayOutputCard contains informational output-only fields
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mtlsEndpoint` | string | Output only. mTLS Endpoint associated with this AgentGateway |
| `rootCertificates` | array<string> | Output only. Root Certificates for Agents to validate this AgentGateway |
| `serviceExtensionsServiceAccount` | string | Output only. Service Account used by Service Extensions to operate. |

### `AgentGatewayGoogleManaged`

- Configuration for Google Managed deployment mode. Proxy is orchestrated and managed by GoogleCloud in a tenant project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `governedAccessPath` | string enum | Optional. Operating Mode of Agent Gateway. Values: `GOVERNED_ACCESS_PATH_UNSPECIFIED`, `AGENT_TO_ANYWHERE`, `CLIENT_TO_AGENT`. |

### `AgentGatewayNetworkConfig`

- NetworkConfig contains network configurations for the AgentGateway.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsPeeringConfig` | AgentGatewayNetworkConfigDnsPeeringConfig | Optional. Optional DNS peering configuration for connectivity to your private VPC network. |
| `egress` | AgentGatewayNetworkConfigEgress | Optional. Optional PSC-Interface network attachment for connectivity to your private VPCs network. |

### `AgentGatewayNetworkConfigDnsPeeringConfig`

- DNS peering config for the user VPC network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domains` | array<string> | Required. Domain names for which DNS queries should be forwarded to the target network. |
| `targetNetwork` | string | Required. Target network in 'target project' to which DNS queries should be forwarded to. Must be in format of `projects/{project}/global/networks/{network}`. |
| `targetProject` | string | Required. Target project ID to which DNS queries should be forwarded to. This can be the same project that contains the AgentGateway or a different project. |

### `AgentGatewayNetworkConfigEgress`

- Configuration for Egress
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkAttachment` | string | Optional. The URI of the Network Attachment resource. |

### `AgentGatewaySelfManaged`

- Configuration for Self Managed deployment mode. Attach to existing Application Load Balancers or Secure Web Proxies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceUri` | string | Optional. A supported Google Cloud networking proxy in the Project and Location |
| `resourceUris` | array<string> | Optional. List of supported Google Cloud networking proxies in the Project and Location. resource_uris is mutually exclusive with resource_uri. |

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

### `AuthzExtension`

- `AuthzExtension` is a resource that allows traffic forwarding to a callout backend service to make an authorization decision.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authority` | string | Optional. The `:authority` header in the gRPC request sent from Envoy to the extension service. It is required when the `service` field points to a backend service. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `failOpen` | boolean | Optional. Determines how the proxy behaves if the call to the extension fails or times out. When set to `TRUE`, request or response processing continues without error. Any subsequent extensions in the extension chain are also executed. When set to `FALSE` or the default setting of `FALSE` is used, one of the following happens: \* If response headers have not been delivered to the downstream client, a generic 500 error is returned to the client. The error response can be tailored by configuring a custom error response in the load balancer. \* If response headers have been delivered, then the HTTP stream to the downstream client is reset. |
| `forwardAttributes` | array<string> | Optional. List of the Envoy attributes to forward to the extension server. The attributes provided here are included as part of the `ProcessingRequest.attributes` field (of type `map`), where the keys are the attribute names. Refer to the documentation (https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference#attributes) for the names of attributes that can be forwarded. If omitted, no attributes are sent. Each element is a string indicating the attribute name. |
| `forwardHeaders` | array<string> | Optional. List of the HTTP headers to forward to the extension (from the client). If omitted, all headers are sent. Each element is a string indicating the header name. |
| `labels` | object | Optional. Set of labels associated with the `AuthzExtension` resource. The format must comply with the requirements for labels for Google Cloud resources. |
| `loadBalancingScheme` | string enum | Optional. All backend services and forwarding rules referenced by this extension must share the same load balancing scheme. The supported values are `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. You can omit this field for `AuthzExtensions` resources that don't reference a backend service. For more information, see Backend services overview (https://cloud.google.com/load-balancing/docs/backend-service). Values: `LOAD_BALANCING_SCHEME_UNSPECIFIED`, `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. |
| `metadata` | object | Optional. The metadata provided here is included as part of the `metadata_context` (of type `google.protobuf.Struct`) in the `ProcessingRequest` message sent to the extension server. The metadata is available under the namespace `com.google.authz_extension.`. The following variables are supported in the metadata Struct: `{forwarding_rule_id}` - substituted with the forwarding rule's fully qualified resource name. |
| `name` | string | Required. Identifier. Name of the `AuthzExtension` resource in the following format: `projects/{project}/locations/{location}/authzExtensions/{authz_extension}`. |
| `service` | string | Required. The reference to the service that runs the extension. To configure a callout extension: For global AuthzExtension, `service` must be a fully-qualified reference to a backend service (https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) in the format: `https://www.googleapis.com/compute/v1/projects/{project}/global/backendServices/{backendService}`. For regional AuthzExtension, `service` must be a fully-qualified reference to one of the following: \* a backend service (https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) in the format: `https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/backendServices/{backendService}`. \* a fully qualified domain name that can be resolved by the Google Cloud DNS. \* `iap.googleapis.com` and it can only be referenced by an AuthzPolicy with the policyProfile set to REQUEST_AUTHZ. \* `modelarmor..rep.googleapis.com` and it can only be referenced by an AuthzPolicy with the policyProfile set to CONTENT_AUTHZ. |
| `timeout` | string (google-duration) | Required. Specifies the timeout for each individual message on the stream. The timeout must be between 10-10000 milliseconds. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |
| `wireFormat` | string enum | Optional. The format of communication supported by the callout extension. This field is supported only for regional `AuthzExtension` resources. If not specified, the default value `EXT_PROC_GRPC` is used. Global `AuthzExtension` resources use the `EXT_PROC_GRPC` wire format. Values: `WIRE_FORMAT_UNSPECIFIED`, `EXT_PROC_GRPC`, `EXT_AUTHZ_GRPC`. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CdnEdgeExtension`

- `CdnEdgeExtension` is a resource that lets the extension service modify the headers of both requests to the cache and responses from the cache served by an `EdgeCacheService` (https://cloud.google.com/media-cdn/docs/reference/rest/v1/projects.locations.edgeCacheServices).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `extensionChains` | array<ExtensionChain> | Required. A set of ordered extension chains that contain the match conditions and extensions to execute. Match conditions for each extension chain are evaluated in sequence for a given request. The first extension chain that has a condition that matches the request is executed. Any subsequent extension chains do not execute. Limited to 5 extension chains per resource. |
| `labels` | object | Optional. Set of labels associated with the `CdnEdgeExtension` resource. The format must comply with the requirements for labels (https://cloud.google.com/compute/docs/labeling-resources#requirements) for Google Cloud resources. |
| `name` | string | Required. Identifier. Name of the `CdnEdgeExtension` resource in the following format: `projects/{project}/locations/{location}/cdnEdgeExtensions/{cdn_edge_extension}`. |
| `target` | CdnEdgeExtensionTarget | Required. Specifies the set of resources to which this extension should be applied to. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `CdnEdgeExtensionTarget`

- Specifies the set of targets to which `CdnEdgeExtension` should be applied to.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `resources` | array<string> | Required. A list of references to the resources that are targeted by `CdnEdgeExtension`. Types of resources supported: `EdgeCacheService`. The format must be the full resource name of EdgeCacheService (https://cloud.google.com/media-cdn/docs/reference/rest/v1/projects.locations.edgeCacheServices) in the following format: `//networkservices.googleapis.com/projects/{project}/locations/{location}/edgeCacheServices/{edgeCacheService}`. |

### `DnsPeeringConfig`

- DNS Peering configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | Optional. Deprecated: Use `domains` instead. The domain to peer. |
| `domains` | array<string> | Optional. The domains to peer. |
| `targetNetwork` | string | Optional. The target network resource name for DNS peering. Format: projects/{project}/global/networks/{network_id} |

### `EgressNetworkConfig`

- Egress network config
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsPeeringConfig` | DnsPeeringConfig | Optional. DNS Peering configuration. |
| `networkAttachment` | string | Optional. The network attachment resource name. Format: projects/{project}/regions/{region}/networkAttachments/{network_attachment_id} |
| `tlsConfig` | EgressNetworkConfigTlsConfig | Optional. The TLS configuration for the egress traffic. |
| `trustConfig` | string | Optional. Deprecated: Use tls_config instead. The trust config resource name. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config} |
| `vpcEgress` | string enum | Optional. The VPC egress setting. Values: `VPC_EGRESS_UNSPECIFIED`, `ALL_TRAFFIC`, `PRIVATE_RANGES_ONLY`. |

### `EgressNetworkConfigTlsConfig`

- Configuration for TLS connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalRoots` | string enum | Optional. The additional roots to trust. Values: `ADDITIONAL_ROOTS_UNSPECIFIED`, `NO_ADDITIONAL_ROOTS`, `PUBLICLY_TRUSTED_ROOTS`. |
| `trustConfig` | string | Optional. The trust config resource name. Format: projects/{project}/locations/{location}/trustConfigs/{trust_config} |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EndpointMatcher`

- A definition of a matcher that selects endpoints to which the policies should be applied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadataLabelMatcher` | EndpointMatcherMetadataLabelMatcher | The matcher is based on node metadata presented by xDS clients. |

### `EndpointMatcher` (v1beta1)

- A definition of a matcher that selects endpoints to which the policies should be applied.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `metadataLabelMatcher` | MetadataLabelMatcher | The matcher is based on node metadata presented by xDS clients. |

### `EndpointMatcherMetadataLabelMatcher`

- The matcher that is based on node metadata presented by xDS clients.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadataLabelMatchCriteria` | string enum | Specifies how matching should be done. Supported values are: MATCH_ANY: At least one of the Labels specified in the matcher should match the metadata presented by xDS client. MATCH_ALL: The metadata presented by the xDS client should contain all of the labels specified here. The selection is determined based on the best match. For example, suppose there are three EndpointPolicy resources P1, P2 and P3 and if P1 has a the matcher as MATCH_ANY , P2 has MATCH_ALL , and P3 has MATCH_ALL . If a client with label connects, the config from P1 will be selected. If a client with label connects, the config from P2 will be selected. If a client with label connects, the config from P3 will be selected. If there is more than one best match, (for example, if a config P4 with selector exists and if a client with label connects), pick up the one with older creation time. Values: `METADATA_LABEL_MATCH_CRITERIA_UNSPECIFIED`, `MATCH_ANY`, `MATCH_ALL`. |
| `metadataLabels` | array<EndpointMatcherMetadataLabelMatcherMetadataLabels> | The list of label value pairs that must match labels in the provided metadata based on filterMatchCriteria This list can have at most 64 entries. The list can be empty if the match criteria is MATCH_ANY, to specify a wildcard match (i.e this matches any client). |

### `EndpointMatcherMetadataLabelMatcherMetadataLabels`

- Defines a name-pair value for a single label.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelName` | string | Required. Label name presented as key in xDS Node Metadata. |
| `labelValue` | string | Required. Label value presented as value corresponding to the above key, in xDS Node Metadata. |

### `EndpointPolicy`

- EndpointPolicy is a resource that helps apply desired configuration on the endpoints that match specific criteria. For example, this resource can be used to apply "authentication config" an all endpoints that serve on port 8080.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationPolicy` | string | Optional. This field specifies the URL of AuthorizationPolicy resource that applies authorization policies to the inbound traffic at the matched endpoints. Refer to Authorization. If this field is not specified, authorization is disabled(no authz checks) for this endpoint. |
| `clientTlsPolicy` | string | Optional. Deprecated: This field is not used and is a no-op. A URL referring to a ClientTlsPolicy resource. ClientTlsPolicy can be set to specify the authentication for traffic from the proxy to the actual endpoints. More specifically, it is applied to the outgoing traffic from the proxy to the endpoint. This is typically used for sidecar model where the proxy identifies itself as endpoint to the control plane, with the connection between sidecar and endpoint requiring authentication. If this field is not set, authentication is disabled(open). Applicable only when EndpointPolicyType is SIDECAR_PROXY. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `endpointMatcher` | EndpointMatcher | Required. A matcher that selects endpoints to which the policies should be applied. |
| `labels` | object | Optional. Set of label tags associated with the EndpointPolicy resource. |
| `name` | string | Identifier. Name of the EndpointPolicy resource. It matches pattern `projects/{project}/locations/*/endpointPolicies/{endpoint_policy}`. |
| `serverTlsPolicy` | string | Optional. A URL referring to ServerTlsPolicy resource. ServerTlsPolicy is used to determine the authentication policy to be applied to terminate the inbound traffic at the identified backends. If this field is not set, authentication is disabled(open) for this endpoint. |
| `trafficPortSelector` | TrafficPortSelector | Optional. Port selector for the (matched) endpoints. If no port selector is provided, the matched config is applied to all ports. |
| `type` | string enum | Required. The type of endpoint policy. This is primarily used to validate the configuration. Values: `ENDPOINT_POLICY_TYPE_UNSPECIFIED`, `SIDECAR_PROXY`, `GRPC_SERVER`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `EndpointPolicy` (v1beta1)

- EndpointPolicy is a resource that helps apply desired configuration on the endpoints that match specific criteria. For example, this resource can be used to apply "authentication config" an all endpoints that serve on port 8080.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `authorizationPolicy` | string | Optional. This field specifies the URL of AuthorizationPolicy resource that applies authorization policies to the inbound traffic at the matched endpoints. Refer to Authorization. If this field is not specified, authorization is disabled(no authz checks) for this endpoint. |
| `clientTlsPolicy` | string | Optional. Deprecated: This field is not used and is a no-op. A URL referring to a ClientTlsPolicy resource. ClientTlsPolicy can be set to specify the authentication for traffic from the proxy to the actual endpoints. More specifically, it is applied to the outgoing traffic from the proxy to the endpoint. This is typically used for sidecar model where the proxy identifies itself as endpoint to the control plane, with the connection between sidecar and endpoint requiring authentication. If this field is not set, authentication is disabled(open). Applicable only when EndpointPolicyType is SIDECAR_PROXY. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `endpointMatcher` | EndpointMatcher | Required. A matcher that selects endpoints to which the policies should be applied. |
| `labels` | object | Optional. Set of label tags associated with the EndpointPolicy resource. |
| `name` | string | Identifier. Name of the EndpointPolicy resource. It matches pattern `projects/{project}/locations/*/endpointPolicies/{endpoint_policy}`. |
| `securityPolicy` | string | Optional. A URL referring to a SecurityPolicy resource. SecurityPolicy is used to enforce rate limiting policy on the inbound traffic at the identified backends. If this field is not set, rate limiting is disabled for this endpoint. |
| `serverTlsPolicy` | string | Optional. A URL referring to ServerTlsPolicy resource. ServerTlsPolicy is used to determine the authentication policy to be applied to terminate the inbound traffic at the identified backends. If this field is not set, authentication is disabled(open) for this endpoint. |
| `trafficPortSelector` | TrafficPortSelector | Optional. Port selector for the (matched) endpoints. If no port selector is provided, the matched config is applied to all ports. |
| `type` | string enum | Required. The type of endpoint policy. This is primarily used to validate the configuration. Values: `ENDPOINT_POLICY_TYPE_UNSPECIFIED`, `SIDECAR_PROXY`, `GRPC_SERVER`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExpressLink`

- ExpressLink provides automated, zero-friction service-to-service secure connectivity across network boundaries without manual infrastructure configuration toil.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cloudRunSecurityInfo` | ExpressLinkCloudRunSecurityInfo | Output only. Cloud Run security information if the ExpressLink destination is a Cloud Run service. |
| `cloudRunSourceInfo` | ExpressLinkCloudRunSourceInfo | Output only. Cloud Run source observability details. |
| `connectionStatus` | array<ExpressLinkConnectionStatus> | Output only. The connection status and negotiated parameters. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `destination` | ExpressLinkDestination | Optional. The destination service(s) for this binding. |
| `etag` | string | Optional. Etag of the resource. If this is provided, it must match the server's etag. If the provided etag does not match the server's etag, the request will fail with a 409 ABORTED error. |
| `forwardingRuleInfo` | ExpressLinkForwardingRuleInfo | Output only. Forwarding Rule information if the ExpressLink destination is a Forwarding Rule. |
| `labels` | object | Optional. Set of label tags associated with the ExpressLink resource. |
| `matches` | array<ExpressLinkMatch> | Optional. A list of matches define conditions used to match requests to destination services. Each match is independent with the OR semantic, i.e. we consider it matched if ANY one of the matches is satisfied. If an ExpressLink has only one Cloud Run service, Match is optional. If not specified, only the default hostname `-..run.app` can be used. If an ExpressLink has multiple Cloud Run services, at least one Match with valid hostname is required. |
| `name` | string | Identifier. Name of the ExpressLink resource. It matches pattern `projects/*/locations/*/expressLinks/`. |
| `pscEndpointInfo` | ExpressLinkPscEndpointInfo | Output only. Private Service Connect (PSC) endpoint information if the ExpressLink destination is a PSC service. |
| `source` | ExpressLinkSource | Optional. The source service(s) for this binding. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `ExpressLinkAuthenticationMethod`

- AuthenticationMethod specifies identity type and credential type pair.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `credentialType` | string enum | Output only. Credential type supported or used. Values: `CREDENTIAL_TYPE_UNSPECIFIED`, `GCP_ACCESS_TOKEN`, `JWT`, `BOUND_GCP_ACCESS_TOKEN`, `BOUND_JWT`, `MTLS`. |
| `identityType` | string enum | Output only. Identity type supported or used. Values: `IDENTITY_TYPE_UNSPECIFIED`, `SERVICE_ACCOUNT`, `AGENT_IDENTITY`, `WORKLOAD_IDENTITY`, `OAUTH`. |

### `ExpressLinkCloudRunSecurityInfo`

- CloudRunSecurityInfo provides security details for Cloud Run to Cloud Run ExpressLinks.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `mtlsTier` | string enum | Output only. Identifies the level of mTLS transport security in use. Values: `MTLS_TIER_UNSPECIFIED`, `STRICT`, `PERMISSIVE`. |
| `serverAuthenticationMethods` | array<ExpressLinkAuthenticationMethod> | Output only. The inbound server authentication methods required by the destination Cloud Run service. |

### `ExpressLinkCloudRunSourceInfo`

- CloudRunSourceInfo provides observability details for Cloud Run source services.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `workloads` | array<ExpressLinkCloudRunSourceInfoWorkloadInfo> | Output only. Observability details for Cloud Run source workloads. |

### `ExpressLinkCloudRunSourceInfoWorkloadInfo`

- WorkloadInfo provides observability details for a single Cloud Run source workload.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `clientAuthenticationMethods` | array<ExpressLinkAuthenticationMethod> | Output only. The outbound authentication methods the workload is capable of. |
| `vpcNetwork` | string | Output only. Consumer VPC network resource name. |
| `workloadUri` | string | Output only. The URI of the source workload (e.g. Cloud Run revision). |

### `ExpressLinkConnectionStatus`

- ConnectionStatus details the resolved state, error status, and negotiated configuration of the ExpressLink resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `credentialType` | string enum | Output only. The negotiated credential type. Values: `CREDENTIAL_TYPE_UNSPECIFIED`, `GCP_ACCESS_TOKEN`, `JWT`, `BOUND_GCP_ACCESS_TOKEN`, `BOUND_JWT`, `MTLS`. |
| `error` | string enum | Output only. Code representing the type of error encountered. Values: `CODE_UNSPECIFIED`, `NOT_FOUND`, `PARTIAL_RESOLUTION_ERROR`. |
| `errorMessage` | string | Output only. Detailed error message explaining the binding failure. |
| `hostnames` | array<ExpressLinkConnectionStatusHostnameInfo> | Output only. The list of hostnames that will route to this destination. |
| `routeType` | string enum | Output only. The route type of the connection (e.g. HTTP). Values: `ROUTE_TYPE_UNSPECIFIED`, `HTTP`, `TCP`, `GRPC`. |
| `workloadUri` | string | Output only. The URI of the source workload this status applies to. |

### `ExpressLinkConnectionStatusHostnameInfo`

- HostnameInfo provides details about a hostname that routes to this destination.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `hostname` | string | Output only. The hostname string. |

### `ExpressLinkDestination`

- The destination of the traffic. This defines the service that the source wants to connect to.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `services` | array<string> | Optional. The service URIs to which the ExpressLink resource is bound. Can be one of the following (all the service URIs should have the same type): `//compute.googleapis.com/projects/*/regions/*/serviceAttachments/`; `//compute.googleapis.com/projects/*/regions/*/forwardingRules/`; `//run.googleapis.com/projects/*/locations/*/services/`. |

### `ExpressLinkForwardingRuleInfo`

- ForwardingRuleInfo provides operational details when the ExpressLink destination is a Forwarding Rule.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | Output only. The IP address of the forwarding rule. |
| `port` | string | Output only. The port or port range of the forwarding rule. |

### `ExpressLinkMatch`

- Match defines the predicate used to match requests to destination services.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `hostname` | string | Optional. Specifies the hostname to match against the HTTP request host header. Hostname is the fully qualified domain name of a network host, as defined by RFC1123 with the exception that: - IPs are not allowed. - Wildcard labels (`*.`) are not allowed. Hostname must be "precise" which is a domain name without the terminating dot of a network host (e.g. `foo.example.com`). Note that as per RFC1035 and RFC1123, a label must consist of lower case alphanumeric characters or '-', and must start and end with an alphanumeric character. No other punctuation is allowed. |

### `ExpressLinkPscEndpointInfo`

- Private Service Connect (PSC) endpoint information populated in the Get API responses if the ExpressLink resource is bound to a PSC service.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `pscEndpoints` | array<ExpressLinkPscEndpointInfoPscEndpoint> | Output only. A list of PSC endpoints mapped to the PSC producer service. |

### `ExpressLinkPscEndpointInfoPscEndpoint`

- Private Service Connect (PSC) endpoint details.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allowGlobalAccess` | boolean | Output only. Whether the PSC endpoint is accessible from all regions. |
| `forwardingRule` | string | Output only. The ForwardingRule resource name of the PSC endpoint. Should match the pattern: `projects/*/regions/*/forwardingRules/`. |
| `pscEndpointAddress` | string | Output only. The IP address of the PSC endpoint. |
| `vpcNetwork` | string | Output only. The resource name of the consumer VPC network. Should match the pattern: `projects/*/global/networks/`. |

### `ExpressLinkSource`

- The source of the traffic. This defines where the connection originates from.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `services` | array<string> | Optional. A list of resources attached to the ExpressLink. The resources can be Cloud Run services of the format: `//run.googleapis.com/projects/*/locations/*/services/`. The location of the resources must match the location of the ExpressLink (unless the ExpressLink is global). |

### `ExtensionBinding`

- `ExtensionBinding` is a resource representing the attachment of an extension to a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `etag` | string | Optional. Etag of the resource. If provided, it must match the server's etag. If the provided etag does not match the server's etag, the request will fail with a 409 ABORTED error. |
| `failOpen` | boolean | Optional. Determines the behavior of the extension binding when the call to the extension fails or times out. Default value is `FALSE`. When set to `TRUE`, failures of the extension are silently ignored. |
| `labels` | object | Optional. Set of labels associated with the `ExtensionBinding` resource. The format must comply with the following requirements (https://cloud.google.com/compute/docs/labeling-resources#requirements). |
| `matchConditions` | array<ExtensionBindingMatchCondition> | Optional. A list of match conditions to evaluate against the incoming request. The extension is invoked if the request matches at least one condition, or if no match conditions are specified. A request matches a condition only if it matches every field that is set in that condition. Limited to 5 conditions. |
| `name` | string | Identifier. Name of the `ExtensionBinding` resource in the following format: `projects/{project}/locations/{location}/extensionBindings/{extension_binding}`. |
| `priority` | integer (int32) | Optional. This field is not supported. |
| `producerExtension` | string | Required. The name of the extension that this binding should attach to target resources. Format: For Google-provided extensions, specify the service endpoint, for example `modelarmor.us-central1.rep.googleapis.com`. |
| `producerMetadata` | object | Optional. Additional metadata that should be passed to the attached extension with each request. This field is subject to the following limitations: \* The total size of the metadata must be less than 1 KiB. \* The total number of keys must be less than 16. \* The length of each key must be less than 64 characters. \* The length of each value must be less than 1024 characters. |
| `target` | ExtensionBindingTarget | Required. Specifies a target to which this `ExtensionBinding` should be attached. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `ExtensionBindingMatchCondition`

- Conditions to match against the incoming request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `to` | ExtensionBindingMatchConditionTo | Optional. Describes properties of a destination of a request. If specified, the extension will only be invoked on requests to destinations that match the specified criteria. |

### `ExtensionBindingMatchConditionHeaderMatch`

- Determines how an HTTP header should be matched.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Specifies the name of the header in the request. |
| `value` | ExtensionBindingMatchConditionStringMatch | Optional. Specifies how the header match will be performed. |

### `ExtensionBindingMatchConditionStringMatch`

- Specifies matching logic for string values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contains` | string | Optional. The input string must contain the substring specified here. An empty substring is not allowed. Examples: \* `abc` matches the value `xyz.abc.def`. |
| `exact` | string | Optional. The input string must match exactly the string specified here. Examples: \* `abc` only matches the value `abc`. |
| `ignoreCase` | boolean | Optional. If true, the `exact`, `prefix`, `suffix`, or `contains` match is case insensitive. For example, the matcher `data` matches both `Data` and `data` when set to true. |
| `prefix` | string | Optional. The input string must have the prefix specified here. An empty prefix is not allowed. Examples: \* `abc` matches the value `abc.xyz`. |
| `suffix` | string | Optional. The input string must have the suffix specified here. An empty suffix is not allowed. Examples: \* `abc` matches the value `xyz.abc`. |

### `ExtensionBindingMatchConditionTo`

- Describes properties of one or more destinations of a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destination` | ExtensionBindingMatchConditionToDestination | Optional. Describes properties of the destination of a request. A request matches the destination only if it matches every field that is set. Fields that are not set are always considered a match. For example, if only `hosts` and `paths` are set, a request matches when any host matches and any path matches. At least one of `destination` or `not_destination` must be specified. |
| `notDestination` | ExtensionBindingMatchConditionToDestination | Optional. Describes the negated properties of the request destination. Extension will not be invoked on requests that match the criteria specified in this field. At least one of destination or not_destination must be specified. |

### `ExtensionBindingMatchConditionToDestination`

- Describes properties of a single destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headerSet` | ExtensionBindingMatchConditionToDestinationHeaderSet | Optional. A set of HTTP headers to match against. If not specified, requests with any headers are matched. |
| `hosts` | array<ExtensionBindingMatchConditionStringMatch> | Optional. A list of HTTP Hosts to match against. Limited to 10 hosts. If not specified, any host is allowed. If specified, a match occurs if any of the hosts matches the host value in the request. |
| `paths` | array<ExtensionBindingMatchConditionStringMatch> | Optional. A list of paths to match against. Limited to 10 paths. If not specified, any path is allowed. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method. |
| `resources` | array<ExtensionBindingMatchConditionStringMatch> | Optional. A list of non-empty strings whose value is matched against the resource to which a request is sent (e.g., an Agent in AiApplication). If not specified, any resource is allowed. If specified, a match occurs if any of the resources matches the resource value in the request. Limited to 5 resources. When matching against resources in the AgentRegistry, use the URNs of the registry resources. |

### `ExtensionBindingMatchConditionToDestinationHeaderSet`

- Describes a set of HTTP headers to match against.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headers` | array<ExtensionBindingMatchConditionHeaderMatch> | Required. A list of HTTP headers to match against. If multiple header matches are provided, they are evaluated as an AND, meaning that all header matches must match for the request to match. Limited to 10 headers. |

### `ExtensionBindingTarget`

- Specifies a list of targets to which this `ExtensionBinding` should attach.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resources` | array<string> | Optional. The references to the target resources to which this binding should attach. Exactly one of `resources` or `scope` must be set. For AI Application resources, specify the full resource name in the format: `projects/{project}/locations/{location}/applications/{application}`. Limited to 1 resource. |
| `scope` | ExtensionBindingTargetScope | Optional. Specifies the scope of resources to which this binding should attach. Exactly one of `resources` or `scope` must be set. |

### `ExtensionBindingTargetScope`

- Specifies the scope of resources to which this binding should attach.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parent` | string | Required. The parent resource that defines the scope, in the format `projects/{project_number}`. When the scope is a project, the binding applies to the resources that meet all of the following conditions: \* The resource belongs to the specified project. \* The resource is in the same location as the `ExtensionBinding`. \* The resource type is listed in `resource_types`. |
| `resourceTypes` | array<string> | Required. The types of resources to which the binding should attach. Limited to 1 resource type. Values: `RESOURCE_TYPE_UNSPECIFIED`, `AI_APPLICATION`, `AGENT_GATEWAY`. |

### `ExtensionChain`

- A single extension chain wrapper that contains the match conditions and extensions to execute.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extensions` | array<ExtensionChainExtension> | Required. A set of extensions to execute for the matching request. At least one extension is required. Up to 3 extensions can be defined for each extension chain for `LbTrafficExtension` and `CdnEdgeExtension` resources. `LbRouteExtension`, `LbEdgeExtension`, and `LbTcpExtension` chains are limited to 1 extension per extension chain. |
| `matchCondition` | ExtensionChainMatchCondition | Required. Conditions under which this chain is invoked for a request. |
| `name` | string | Required. The name for this extension chain. The name is logged as part of the HTTP request logs. The name must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number. |

### `ExtensionChainExtension`

- A single extension in the chain to execute for the matching request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authority` | string | Optional. The `:authority` header in the gRPC request sent from Envoy to the extension service. Required for Callout extensions. This field is not supported for plugin extensions. Setting it results in a validation error. |
| `failOpen` | boolean | Optional. Determines how the proxy behaves if the call to the extension fails or times out. When set to `TRUE`, request or response processing continues without error. Any subsequent extensions in the extension chain are also executed. When set to `FALSE` or the default setting of `FALSE` is used, one of the following happens: \* If response headers have not been delivered to the downstream client, a generic 500 error is returned to the client. The error response can be tailored by configuring a custom error response in the load balancer. \* If response headers have been delivered, then the HTTP stream to the downstream client is reset. |
| `forwardAttributes` | array<string> | Optional. List of the Envoy attributes to forward to the extension server. The attributes provided here are included as part of the `ProcessingRequest.attributes` field (of type `map`), where the keys are the attribute names. Refer to the documentation (https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference#attributes) for the names of attributes that can be forwarded. If omitted, no attributes are sent. Each element is a string indicating the attribute name. |
| `forwardHeaders` | array<string> | Optional. List of the HTTP headers to forward to the extension (from the client or backend). If omitted, all headers are sent. Each element is a string indicating the header name. |
| `metadata` | object | Optional. The metadata provided here is included as part of the `metadata_context` (of type `google.protobuf.Struct`) in the `ProcessingRequest` message sent to the extension server. For `AuthzExtension` resources, the metadata is available under the namespace `com.google.authz_extension.`. For other types of extensions, the metadata is available under the namespace `com.google....`. For example: `com.google.lb_traffic_extension.lbtrafficextension1.chain1.ext1`. The following variables are supported in the metadata: `{forwarding_rule_id}` - substituted with the forwarding rule's fully qualified resource name. This field must not be set for plugin extensions. Setting it results in a validation error. You can set metadata at either the resource level or the extension level. The extension level metadata is recommended because you can pass a different set of metadata through each extension to the backend. This field is subject to following limitations: \* The total size of the metadata must be less than 1KiB. \* The total number of keys in the metadata must be less than 16. \* The length of each key must be less than 64 characters. \* The length of each value must be less than 1024 characters. \* All values must be strings. |
| `name` | string | Optional. The name for this extension. The name is logged as part of the HTTP request logs. The name must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number. This field is required except for AuthzExtension. |
| `observabilityMode` | boolean | Optional. When set to `true`, the calls to the extension backend are performed asynchronously, without pausing the processing of the ongoing request. In this mode, only `STREAMED` (default) body processing is supported. Responses, if any, are ignored. Supported by regional `LbTrafficExtension` and `LbRouteExtension` resources. |
| `requestBodySendMode` | string enum | Optional. Configures the send mode for request body processing. The field can only be set if `supported_events` includes `REQUEST_BODY`. If `supported_events` includes `REQUEST_BODY`, but `request_body_send_mode` is unset, the default value `STREAMED` is used. When this field is set to `FULL_DUPLEX_STREAMED`, `supported_events` must include both `REQUEST_BODY` and `REQUEST_TRAILERS`. This field can be set only for `LbTrafficExtension` and `LbRouteExtension` resources, and only when the `service` field of the extension points to a `BackendService`. Only `FULL_DUPLEX_STREAMED` mode is supported for `LbRouteExtension` resources. Values: `BODY_SEND_MODE_UNSPECIFIED`, `BODY_SEND_MODE_STREAMED`, `BODY_SEND_MODE_FULL_DUPLEX_STREAMED`. |
| `responseBodySendMode` | string enum | Optional. Configures the send mode for response processing. If unspecified, the default value `STREAMED` is used. The field can only be set if `supported_events` includes `RESPONSE_BODY`. If `supported_events` includes `RESPONSE_BODY`, but `response_body_send_mode` is unset, the default value `STREAMED` is used. When this field is set to `FULL_DUPLEX_STREAMED`, `supported_events` must include both `RESPONSE_BODY` and `RESPONSE_TRAILERS`. This field can be set only for `LbTrafficExtension` resources, and only when the `service` field of the extension points to a `BackendService`. Values: `BODY_SEND_MODE_UNSPECIFIED`, `BODY_SEND_MODE_STREAMED`, `BODY_SEND_MODE_FULL_DUPLEX_STREAMED`. |
| `service` | string | Required. The reference to the service that runs the extension. To configure a callout extension, `service` must be a fully-qualified reference to a backend service (https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) in the format: `https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/backendServices/{backendService}` or `https://www.googleapis.com/compute/v1/projects/{project}/global/backendServices/{backendService}`. To configure a plugin extension, `service` must be a reference to a `WasmPlugin` resource (https://cloud.google.com/service-extensions/docs/reference/rest/v1beta1/projects.locations.wasmPlugins) in the format: `projects/{project}/locations/{location}/wasmPlugins/{plugin}` or `//networkservices.googleapis.com/projects/{project}/locations/{location}/wasmPlugins/{wasmPlugin}`. Plugin extensions are currently supported for the `LbTrafficExtension`, the `LbRouteExtension`, the `LbEdgeExtension`, and the `CdnEdgeExtension` resources. |
| `supportedEvents` | array<string> | Optional. A set of events during request or response processing for which this extension is called. For the `LbTrafficExtension` resource, this field is required. For the `LbRouteExtension` resource, this field is optional. If unspecified, `REQUEST_HEADERS` event is assumed as supported. For the `LbEdgeExtension` resource, this field is required and must only contain `REQUEST_HEADERS` event. For the `AuthzExtension` resource, this field is optional. `REQUEST_HEADERS` is the only supported event. If unspecified, `REQUEST_HEADERS` event is assumed as supported. For the `CdnEdgeExtension` resource, this field is optional. Eligible values are `REQUEST_HEADERS` and `RESPONSE_HEADERS`. If unspecified, both are assumed as supported. Values: `EVENT_TYPE_UNSPECIFIED`, `REQUEST_HEADERS`, `REQUEST_BODY`, `RESPONSE_HEADERS`, `RESPONSE_BODY`, `REQUEST_TRAILERS`, `RESPONSE_TRAILERS`. |
| `timeout` | string (google-duration) | Optional. Specifies the timeout for each individual message on the stream. The timeout must be between `10`-`10000` milliseconds. Required for callout extensions. This field is not supported for plugin extensions. Setting it results in a validation error. |

### `ExtensionChainExtension` (v1beta1)

- A single extension in the chain to execute for the matching request.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allowDynamicForwarding` | boolean | Optional. When set to `TRUE`, the response from an extension service is allowed to set the `com.google.envoy.dynamic_forwarding` namespace in the dynamic metadata. This field is not supported for plugin extensions or AuthzExtensions. Setting it results in a validation error. |
| `authority` | string | Optional. The `:authority` header in the gRPC request sent from Envoy to the extension service. Required for Callout extensions. This field is not supported for plugin extensions. Setting it results in a validation error. |
| `failOpen` | boolean | Optional. Determines how the proxy behaves if the call to the extension fails or times out. When set to `TRUE`, request or response processing continues without error. Any subsequent extensions in the extension chain are also executed. When set to `FALSE` or the default setting of `FALSE` is used, one of the following happens: \* If response headers have not been delivered to the downstream client, a generic 500 error is returned to the client. The error response can be tailored by configuring a custom error response in the load balancer. \* If response headers have been delivered, then the HTTP stream to the downstream client is reset. |
| `forwardAttributes` | array<string> | Optional. List of the Envoy attributes to forward to the extension server. The attributes provided here are included as part of the `ProcessingRequest.attributes` field (of type `map`), where the keys are the attribute names. Refer to the documentation (https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference#attributes) for the names of attributes that can be forwarded. If omitted, no attributes are sent. Each element is a string indicating the attribute name. |
| `forwardHeaders` | array<string> | Optional. List of the HTTP headers to forward to the extension (from the client or backend). If omitted, all headers are sent. Each element is a string indicating the header name. |
| `metadata` | object | Optional. The metadata provided here is included as part of the `metadata_context` (of type `google.protobuf.Struct`) in the `ProcessingRequest` message sent to the extension server. For `AuthzExtension` resources, the metadata is available under the namespace `com.google.authz_extension.`. For other types of extensions, the metadata is available under the namespace `com.google....`. For example: `com.google.lb_traffic_extension.lbtrafficextension1.chain1.ext1`. The following variables are supported in the metadata: `{forwarding_rule_id}` - substituted with the forwarding rule's fully qualified resource name. This field must not be set for plugin extensions. Setting it results in a validation error. You can set metadata at either the resource level or the extension level. The extension level metadata is recommended because you can pass a different set of metadata through each extension to the backend. This field is subject to following limitations: \* The total size of the metadata must be less than 1KiB. \* The total number of keys in the metadata must be less than 16. \* The length of each key must be less than 64 characters. \* The length of each value must be less than 1024 characters. \* All values must be strings. |
| `name` | string | Optional. The name for this extension. The name is logged as part of the HTTP request logs. The name must conform with RFC-1034, is restricted to lower-cased letters, numbers and hyphens, and can have a maximum length of 63 characters. Additionally, the first character must be a letter and the last a letter or a number. This field is required except for AuthzExtension. |
| `observabilityMode` | boolean | Optional. When set to `true`, the calls to the extension backend are performed asynchronously, without pausing the processing of the ongoing request. In this mode, only `STREAMED` (default) body processing is supported. Responses, if any, are ignored. Supported by regional `LbTrafficExtension` and `LbRouteExtension` resources. |
| `requestBodySendMode` | string enum | Optional. Configures the send mode for request body processing. The field can only be set if `supported_events` includes `REQUEST_BODY`. If `supported_events` includes `REQUEST_BODY`, but `request_body_send_mode` is unset, the default value `STREAMED` is used. When this field is set to `FULL_DUPLEX_STREAMED`, `supported_events` must include both `REQUEST_BODY` and `REQUEST_TRAILERS`. This field can be set only for `LbTrafficExtension` and `LbRouteExtension` resources, and only when the `service` field of the extension points to a `BackendService`. Only `FULL_DUPLEX_STREAMED` mode is supported for `LbRouteExtension` resources. Values: `BODY_SEND_MODE_UNSPECIFIED`, `BODY_SEND_MODE_STREAMED`, `BODY_SEND_MODE_FULL_DUPLEX_STREAMED`. |
| `responseBodySendMode` | string enum | Optional. Configures the send mode for response processing. If unspecified, the default value `STREAMED` is used. The field can only be set if `supported_events` includes `RESPONSE_BODY`. If `supported_events` includes `RESPONSE_BODY`, but `response_body_send_mode` is unset, the default value `STREAMED` is used. When this field is set to `FULL_DUPLEX_STREAMED`, `supported_events` must include both `RESPONSE_BODY` and `RESPONSE_TRAILERS`. This field can be set only for `LbTrafficExtension` resources, and only when the `service` field of the extension points to a `BackendService`. Values: `BODY_SEND_MODE_UNSPECIFIED`, `BODY_SEND_MODE_STREAMED`, `BODY_SEND_MODE_FULL_DUPLEX_STREAMED`. |
| `service` | string | Required. The reference to the service that runs the extension. To configure a callout extension, `service` must be a fully-qualified reference to a backend service (https://cloud.google.com/compute/docs/reference/rest/v1/backendServices) in the format: `https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/backendServices/{backendService}` or `https://www.googleapis.com/compute/v1/projects/{project}/global/backendServices/{backendService}`. To configure a plugin extension, `service` must be a reference to a `WasmPlugin` resource (https://cloud.google.com/service-extensions/docs/reference/rest/v1beta1/projects.locations.wasmPlugins) in the format: `projects/{project}/locations/{location}/wasmPlugins/{plugin}` or `//networkservices.googleapis.com/projects/{project}/locations/{location}/wasmPlugins/{wasmPlugin}`. Plugin extensions are currently supported for the `LbTrafficExtension`, the `LbRouteExtension`, the `LbEdgeExtension`, and the `CdnEdgeExtension` resources. |
| `supportedEvents` | array<string> | Optional. A set of events during request or response processing for which this extension is called. For the `LbTrafficExtension` resource, this field is required. For the `LbRouteExtension` resource, this field is optional. If unspecified, `REQUEST_HEADERS` event is assumed as supported. For the `LbEdgeExtension` resource, this field is required and must only contain `REQUEST_HEADERS` event. For the `AuthzExtension` resource, this field is optional. `REQUEST_HEADERS` is the only supported event. If unspecified, `REQUEST_HEADERS` event is assumed as supported. For the `CdnEdgeExtension` resource, this field is optional. Eligible values are `REQUEST_HEADERS` and `RESPONSE_HEADERS`. If unspecified, both are assumed as supported. Values: `EVENT_TYPE_UNSPECIFIED`, `REQUEST_HEADERS`, `REQUEST_BODY`, `RESPONSE_HEADERS`, `RESPONSE_BODY`, `REQUEST_TRAILERS`, `RESPONSE_TRAILERS`. |
| `timeout` | string (google-duration) | Optional. Specifies the timeout for each individual message on the stream. The timeout must be between `10`-`10000` milliseconds. Required for callout extensions. This field is not supported for plugin extensions. Setting it results in a validation error. |

### `ExtensionChainMatchCondition`

- Conditions under which this chain is invoked for a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `celExpression` | string | Required. A Common Expression Language (CEL) expression that is used to match requests for which the extension chain is executed. For more information, see CEL matcher language reference (https://cloud.google.com/service-extensions/docs/cel-matcher-language-reference). |

### `Gateway`

- Gateway represents the configuration for a proxy, typically a load balancer. It captures the ip:port over which the services are exposed by the proxy, along with any policy configurations. Routes have reference to to Gateways to dictate how requests should be routed by this Gateway.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addresses` | array<string> | Optional. Zero or one IPv4 or IPv6 address on which the Gateway will receive the traffic. When no address is provided, an IP from the subnetwork is allocated This field only applies to gateways of type 'SECURE_WEB_GATEWAY'. Gateways of type 'OPEN_MESH' listen on 0.0.0.0 for IPv4 and :: for IPv6. |
| `allPorts` | boolean | Optional. If true, the Gateway will listen on all ports. This is mutually exclusive with the `ports` field. This field only applies to gateways of type 'SECURE_WEB_GATEWAY'. |
| `allowGlobalAccess` | boolean | Optional. If true, the gateway will allow traffic from clients outside of the region where the gateway is located. This field is configurable only for gateways of type SECURE_WEB_GATEWAY. |
| `certificateUrls` | array<string> | Optional. A fully-qualified Certificates URL reference. The proxy presents a Certificate (selected based on SNI) when establishing a TLS connection. This feature only applies to gateways of type 'SECURE_WEB_GATEWAY'. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `envoyHeaders` | string enum | Optional. Determines if envoy will insert internal debug headers into upstream requests. Other Envoy headers may still be injected. By default, envoy will not insert any debug headers. Values: `ENVOY_HEADERS_UNSPECIFIED`, `NONE`, `DEBUG_HEADERS`. |
| `gatewaySecurityPolicy` | string | Optional. A fully-qualified GatewaySecurityPolicy URL reference. Defines how a server should apply security policy to inbound (VM to Proxy) initiated connections. For example: `projects/*/locations/*/gatewaySecurityPolicies/swg-policy`. This policy is specific to gateways of type 'SECURE_WEB_GATEWAY'. |
| `ipVersion` | string enum | Optional. The IP Version that will be used by this gateway. Valid options are IPV4 or IPV6. Default is IPV4. Values: `IP_VERSION_UNSPECIFIED`, `IPV4`, `IPV6`. |
| `labels` | object | Optional. Set of label tags associated with the Gateway resource. |
| `name` | string | Identifier. Name of the Gateway resource. It matches pattern `projects/*/locations/*/gateways/`. |
| `network` | string | Optional. The relative resource name identifying the VPC network that is using this configuration. For example: `projects/*/global/networks/network-1`. Currently, this field is specific to gateways of type 'SECURE_WEB_GATEWAY'. |
| `ports` | array<integer> | Required. One or more port numbers (1-65535), on which the Gateway will receive traffic. The proxy binds to the specified ports. Gateways of type 'SECURE_WEB_GATEWAY' are limited to 5 ports. Gateways of type 'OPEN_MESH' listen on 0.0.0.0 for IPv4 and :: for IPv6 and support multiple ports. |
| `routingMode` | string enum | Optional. The routing mode of the Gateway. This field is configurable only for gateways of type SECURE_WEB_GATEWAY. This field is required for gateways of type SECURE_WEB_GATEWAY. Values: `EXPLICIT_ROUTING_MODE`, `NEXT_HOP_ROUTING_MODE`. |
| `scope` | string | Optional. Scope determines how configuration across multiple Gateway instances are merged. The configuration for multiple Gateway instances with the same scope will be merged as presented as a single configuration to the proxy/load balancer. Max length 64 characters. Scope should start with a letter and can only have letters, numbers, hyphens. |
| `selfLink` | string | Output only. Server-defined URL of this resource |
| `serverTlsPolicy` | string | Optional. A fully-qualified ServerTLSPolicy URL reference. Specifies how TLS traffic is terminated. If empty, TLS termination is disabled. |
| `subnetwork` | string | Optional. The relative resource name identifying the subnetwork in which this SWG is allocated. For example: `projects/*/regions/us-central1/subnetworks/network-1` Currently, this field is specific to gateways of type 'SECURE_WEB_GATEWAY". |
| `type` | string enum | Immutable. The type of the customer managed gateway. This field is required. If unspecified, an error is returned. Values: `TYPE_UNSPECIFIED`, `OPEN_MESH`, `SECURE_WEB_GATEWAY`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `GatewayRouteView`

- GatewayRouteView defines view-only resource for Routes to a Gateway
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Identifier. Full path name of the GatewayRouteView resource. Format: projects/{project_number}/locations/{location}/gateways/{gateway}/routeViews/{route_view} |
| `routeId` | string | Output only. The resource id for the route. |
| `routeLocation` | string | Output only. Location where the route exists. |
| `routeProjectNumber` | string (int64) | Output only. Project number where the route exists. |
| `routeType` | string | Output only. Type of the route: HttpRoute,GrpcRoute,TcpRoute, or TlsRoute |

### `GrpcRoute`

- GrpcRoute is the resource defining how gRPC traffic routed by a Mesh or Gateway resource is routed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `gateways` | array<string> | Optional. Gateways defines a list of gateways this GrpcRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/` |
| `hostnames` | array<string> | Required. Service hostnames with an optional port for which this route describes traffic. Format: \[:\] Hostname is the fully qualified domain name of a network host. This matches the RFC 1123 definition of a hostname with 2 notable exceptions: - IPs are not allowed. - A hostname may be prefixed with a wildcard label (`*.`). The wildcard label must appear by itself as the first label. Hostname can be "precise" which is a domain name without the terminating dot of a network host (e.g. `foo.example.com`) or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. `*.example.com`). Note that as per RFC1035 and RFC1123, a label must consist of lower case alphanumeric characters or '-', and must start and end with an alphanumeric character. No other punctuation is allowed. The routes associated with a Mesh or Gateway must have unique hostnames. If you attempt to attach multiple routes with conflicting hostnames, the configuration will be rejected. For example, while it is acceptable for routes for the hostnames `*.foo.bar.com` and `*.bar.com` to be associated with the same route, it is not possible to associate two routes both with `*.bar.com` or both with `bar.com`. If a port is specified, then gRPC clients must use the channel URI with the port to match this rule (i.e. "xds:///service:123"), otherwise they must supply the URI without a port (i.e. "xds:///service"). |
| `labels` | object | Optional. Set of label tags associated with the GrpcRoute resource. |
| `meshes` | array<string> | Optional. Meshes defines a list of meshes this GrpcRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` |
| `name` | string | Identifier. Name of the GrpcRoute resource. It matches pattern `projects/*/locations/*/grpcRoutes/` |
| `rules` | array<GrpcRouteRouteRule> | Required. A list of detailed rules defining how to route traffic. Within a single GrpcRoute, the GrpcRoute.RouteAction associated with the first matching GrpcRoute.RouteRule will be executed. At least one rule must be supplied. |
| `selfLink` | string | Output only. Server-defined URL of this resource |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `GrpcRouteDestination`

- The destination to which traffic will be routed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceName` | string | Required. The URL of a destination service to which to route traffic. Must refer to either a BackendService or ServiceDirectoryService. |
| `weight` | integer (int32) | Optional. Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them. |

### `GrpcRouteFaultInjectionPolicy`

- The specification for fault injection introduced into traffic to test the resiliency of clients to destination service failure. As part of fault injection, when clients send requests to a destination, delays can be introduced on a percentage of requests before sending those requests to the destination service. Similarly requests from clients can be aborted by for a percentage of requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abort` | GrpcRouteFaultInjectionPolicyAbort | The specification for aborting to client requests. |
| `delay` | GrpcRouteFaultInjectionPolicyDelay | The specification for injecting delay to client requests. |

### `GrpcRouteFaultInjectionPolicyAbort`

- Specification of how client requests are aborted as part of fault injection before being sent to a destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `httpStatus` | integer (int32) | The HTTP status code used to abort the request. The value must be between 200 and 599 inclusive. |
| `percentage` | integer (int32) | The percentage of traffic which will be aborted. The value must be between \[0, 100\] |

### `GrpcRouteFaultInjectionPolicyDelay`

- Specification of how client requests are delayed as part of fault injection before being sent to a destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fixedDelay` | string (google-duration) | Specify a fixed delay before forwarding the request. |
| `percentage` | integer (int32) | The percentage of traffic on which delay will be injected. The value must be between \[0, 100\] |

### `GrpcRouteHeaderMatch`

- A match against a collection of headers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. The key of the header. |
| `type` | string enum | Optional. Specifies how to match against the value of the header. If not specified, a default value of EXACT is used. Values: `TYPE_UNSPECIFIED`, `EXACT`, `REGULAR_EXPRESSION`. |
| `value` | string | Required. The value of the header. |

### `GrpcRouteMethodMatch`

- Specifies a match against a method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caseSensitive` | boolean | Optional. Specifies that matches are case sensitive. The default value is true. case_sensitive must not be used with a type of REGULAR_EXPRESSION. |
| `grpcMethod` | string | Required. Name of the method to match against. If unspecified, will match all methods. |
| `grpcService` | string | Required. Name of the service to match against. If unspecified, will match all services. |
| `type` | string enum | Optional. Specifies how to match against the name. If not specified, a default value of "EXACT" is used. Values: `TYPE_UNSPECIFIED`, `EXACT`, `REGULAR_EXPRESSION`. |

### `GrpcRouteRetryPolicy`

- The specifications for retries. Specifies one or more conditions for which this retry rule applies. Valid values are:
- Version: v1

| Field | Type | Description |
|---|---|---|
| `numRetries` | integer (uint32) | Specifies the allowed number of retries. This number must be > 0. If not specified, default to 1. |
| `retryConditions` | array<string> | - connect-failure: Router will retry on failures connecting to Backend Services, for example due to connection timeouts. - refused-stream: Router will retry if the backend service resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. - cancelled: Router will retry if the gRPC status code in the response header is set to cancelled - deadline-exceeded: Router will retry if the gRPC status code in the response header is set to deadline-exceeded - resource-exhausted: Router will retry if the gRPC status code in the response header is set to resource-exhausted - unavailable: Router will retry if the gRPC status code in the response header is set to unavailable |

### `GrpcRouteRouteAction`

- Specifies how to route matched traffic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<GrpcRouteDestination> | Optional. The destination services to which traffic should be forwarded. If multiple destinations are specified, traffic will be split between Backend Service(s) according to the weight field of these destinations. |
| `faultInjectionPolicy` | GrpcRouteFaultInjectionPolicy | Optional. The specification for fault injection introduced into traffic to test the resiliency of clients to destination service failure. As part of fault injection, when clients send requests to a destination, delays can be introduced on a percentage of requests before sending those requests to the destination service. Similarly requests from clients can be aborted by for a percentage of requests. timeout and retry_policy will be ignored by clients that are configured with a fault_injection_policy |
| `idleTimeout` | string (google-duration) | Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled. |
| `retryPolicy` | GrpcRouteRetryPolicy | Optional. Specifies the retry policy associated with this route. |
| `statefulSessionAffinity` | GrpcRouteStatefulSessionAffinityPolicy | Optional. Specifies cookie-based stateful session affinity. |
| `timeout` | string (google-duration) | Optional. Specifies the timeout for selected route. Timeout is computed from the time the request has been fully processed (i.e. end of stream) up until the response has been completely processed. Timeout includes all retries. |

### `GrpcRouteRouteMatch`

- Criteria for matching traffic. A RouteMatch will be considered to match when all supplied fields match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headers` | array<GrpcRouteHeaderMatch> | Optional. Specifies a collection of headers to match. |
| `method` | GrpcRouteMethodMatch | Optional. A gRPC method to match against. If this field is empty or omitted, will match all methods. |

### `GrpcRouteRouteRule`

- Describes how to route traffic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | GrpcRouteRouteAction | Required. A detailed rule defining how to route traffic. This field is required. |
| `matches` | array<GrpcRouteRouteMatch> | Optional. Matches define conditions used for matching the rule against incoming gRPC requests. Each match is independent, i.e. this rule will be matched if ANY one of the matches is satisfied. If no matches field is specified, this rule will unconditionally match traffic. |

### `GrpcRouteStatefulSessionAffinityPolicy`

- The specification for cookie-based stateful session affinity where the date plane supplies a “session cookie” with the name "GSSA" which encodes a specific destination host and each request containing that cookie will be directed to that host as long as the destination host remains up and healthy. The gRPC proxyless mesh library or sidecar proxy will manage the session cookie but the client application code is responsible for copying the cookie from each RPC in the session to the next.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cookieTtl` | string (google-duration) | Required. The cookie TTL value for the Set-Cookie header generated by the data plane. The lifetime of the cookie may be set to a value from 0 to 86400 seconds (24 hours) inclusive. Set this to 0s to use a session cookie and disable cookie expiration. |

### `HttpRoute`

- HttpRoute is the resource defining how HTTP traffic should be routed by a Mesh or Gateway resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `gateways` | array<string> | Optional. Gateways defines a list of gateways this HttpRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/` |
| `hostnames` | array<string> | Required. Hostnames define a set of hosts that should match against the HTTP host header to select a HttpRoute to process the request. Hostname is the fully qualified domain name of a network host, as defined by RFC 1123 with the exception that: - IPs are not allowed. - A hostname may be prefixed with a wildcard label (`*.`). The wildcard label must appear by itself as the first label. Hostname can be "precise" which is a domain name without the terminating dot of a network host (e.g. `foo.example.com`) or "wildcard", which is a domain name prefixed with a single wildcard label (e.g. `*.example.com`). Note that as per RFC1035 and RFC1123, a label must consist of lower case alphanumeric characters or '-', and must start and end with an alphanumeric character. No other punctuation is allowed. The routes associated with a Mesh or Gateways must have unique hostnames. If you attempt to attach multiple routes with conflicting hostnames, the configuration will be rejected. For example, while it is acceptable for routes for the hostnames `*.foo.bar.com` and `*.bar.com` to be associated with the same Mesh (or Gateways under the same scope), it is not possible to associate two routes both with `*.bar.com` or both with `bar.com`. |
| `labels` | object | Optional. Set of label tags associated with the HttpRoute resource. |
| `meshes` | array<string> | Optional. Meshes defines a list of meshes this HttpRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` The attached Mesh should be of a type SIDECAR |
| `name` | string | Identifier. Name of the HttpRoute resource. It matches pattern `projects/*/locations/*/httpRoutes/http_route_name>`. |
| `rules` | array<HttpRouteRouteRule> | Required. Rules that define how traffic is routed and handled. Rules will be matched sequentially based on the RouteMatch specified for the rule. |
| `selfLink` | string | Output only. Server-defined URL of this resource |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `HttpRouteCorsPolicy`

- The Specification for allowing client side cross-origin requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowCredentials` | boolean | In response to a preflight request, setting this to true indicates that the actual request can include user credentials. This translates to the Access-Control-Allow-Credentials header. Default value is false. |
| `allowHeaders` | array<string> | Specifies the content for Access-Control-Allow-Headers header. |
| `allowMethods` | array<string> | Specifies the content for Access-Control-Allow-Methods header. |
| `allowOriginRegexes` | array<string> | Specifies the regular expression patterns that match allowed origins. For regular expression grammar, please see https://github.com/google/re2/wiki/Syntax. |
| `allowOrigins` | array<string> | Specifies the list of origins that will be allowed to do CORS requests. An origin is allowed if it matches either an item in allow_origins or an item in allow_origin_regexes. |
| `disabled` | boolean | If true, the CORS policy is disabled. The default value is false, which indicates that the CORS policy is in effect. |
| `exposeHeaders` | array<string> | Specifies the content for Access-Control-Expose-Headers header. |
| `maxAge` | string | Specifies how long result of a preflight request can be cached in seconds. This translates to the Access-Control-Max-Age header. |

### `HttpRouteDestination`

- Specifications of a destination to which the request should be routed to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestHeaderModifier` | HttpRouteHeaderModifier | Optional. The specification for modifying the headers of a matching request prior to delivery of the request to the destination. If HeaderModifiers are set on both the Destination and the RouteAction, they will be merged. Conflicts between the two will not be resolved on the configuration. |
| `responseHeaderModifier` | HttpRouteHeaderModifier | Optional. The specification for modifying the headers of a response prior to sending the response back to the client. If HeaderModifiers are set on both the Destination and the RouteAction, they will be merged. Conflicts between the two will not be resolved on the configuration. |
| `serviceName` | string | The URL of a BackendService to route traffic to. |
| `weight` | integer (int32) | Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them. |

### `HttpRouteFaultInjectionPolicy`

- The specification for fault injection introduced into traffic to test the resiliency of clients to destination service failure. As part of fault injection, when clients send requests to a destination, delays can be introduced by client proxy on a percentage of requests before sending those requests to the destination service. Similarly requests can be aborted by client proxy for a percentage of requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abort` | HttpRouteFaultInjectionPolicyAbort | The specification for aborting to client requests. |
| `delay` | HttpRouteFaultInjectionPolicyDelay | The specification for injecting delay to client requests. |

### `HttpRouteFaultInjectionPolicyAbort`

- Specification of how client requests are aborted as part of fault injection before being sent to a destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `httpStatus` | integer (int32) | The HTTP status code used to abort the request. The value must be between 200 and 599 inclusive. |
| `percentage` | integer (int32) | The percentage of traffic which will be aborted. The value must be between \[0, 100\] |

### `HttpRouteFaultInjectionPolicyDelay`

- Specification of how client requests are delayed as part of fault injection before being sent to a destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fixedDelay` | string (google-duration) | Specify a fixed delay before forwarding the request. |
| `percentage` | integer (int32) | The percentage of traffic on which delay will be injected. The value must be between \[0, 100\] |

### `HttpRouteHeaderMatch`

- Specifies how to select a route rule based on HTTP request headers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exactMatch` | string | The value of the header should match exactly the content of exact_match. |
| `header` | string | The name of the HTTP header to match against. |
| `invertMatch` | boolean | If specified, the match result will be inverted before checking. Default value is set to false. |
| `prefixMatch` | string | The value of the header must start with the contents of prefix_match. |
| `presentMatch` | boolean | A header with header_name must exist. The match takes place whether or not the header has a value. |
| `rangeMatch` | HttpRouteHeaderMatchIntegerRange | If specified, the rule will match if the request header value is within the range. |
| `regexMatch` | string | The value of the header must match the regular expression specified in regex_match. For regular expression grammar, please see: https://github.com/google/re2/wiki/Syntax |
| `suffixMatch` | string | The value of the header must end with the contents of suffix_match. |

### `HttpRouteHeaderMatchIntegerRange`

- Represents an integer value range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `end` | integer (int32) | End of the range (exclusive) |
| `start` | integer (int32) | Start of the range (inclusive) |

### `HttpRouteHeaderModifier`

- The specification for modifying HTTP header in HTTP request and HTTP response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `add` | object | Add the headers with given map where key is the name of the header, value is the value of the header. |
| `remove` | array<string> | Remove headers (matching by header names) specified in the list. |
| `set` | object | Completely overwrite/replace the headers with given map where key is the name of the header, value is the value of the header. |

### `HttpRouteHttpDirectResponse`

- Static HTTP response object to be returned.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bytesBody` | string (byte) | Optional. Response body as bytes. Maximum body size is 4096B. |
| `status` | integer (int32) | Required. Status to return as part of HTTP Response. Must be a positive integer. |
| `stringBody` | string | Optional. Response body as a string. Maximum body length is 1024 characters. |

### `HttpRouteQueryParameterMatch`

- Specifications to match a query parameter in the request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exactMatch` | string | The value of the query parameter must exactly match the contents of exact_match. Only one of exact_match, regex_match, or present_match must be set. |
| `presentMatch` | boolean | Specifies that the QueryParameterMatcher matches if request contains query parameter, irrespective of whether the parameter has a value or not. Only one of exact_match, regex_match, or present_match must be set. |
| `queryParameter` | string | The name of the query parameter to match. |
| `regexMatch` | string | The value of the query parameter must match the regular expression specified by regex_match. For regular expression grammar, please see https://github.com/google/re2/wiki/Syntax Only one of exact_match, regex_match, or present_match must be set. |

### `HttpRouteRedirect`

- The specification for redirecting traffic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostRedirect` | string | The host that will be used in the redirect response instead of the one that was supplied in the request. |
| `httpsRedirect` | boolean | If set to true, the URL scheme in the redirected request is set to https. If set to false, the URL scheme of the redirected request will remain the same as that of the request. The default is set to false. |
| `pathRedirect` | string | The path that will be used in the redirect response instead of the one that was supplied in the request. path_redirect can not be supplied together with prefix_redirect. Supply one alone or neither. If neither is supplied, the path of the original request will be used for the redirect. |
| `portRedirect` | integer (int32) | The port that will be used in the redirected request instead of the one that was supplied in the request. |
| `prefixRewrite` | string | Indicates that during redirection, the matched prefix (or path) should be swapped with this value. This option allows URLs be dynamically created based on the request. |
| `responseCode` | string enum | The HTTP Status code to use for the redirect. Values: `RESPONSE_CODE_UNSPECIFIED`, `MOVED_PERMANENTLY_DEFAULT`, `FOUND`, `SEE_OTHER`, `TEMPORARY_REDIRECT`, `PERMANENT_REDIRECT`. |
| `stripQuery` | boolean | if set to true, any accompanying query portion of the original URL is removed prior to redirecting the request. If set to false, the query portion of the original URL is retained. The default is set to false. |

### `HttpRouteRequestMirrorPolicy`

- Specifies the policy on how requests are shadowed to a separate mirrored destination service. The proxy does not wait for responses from the shadow service. Prior to sending traffic to the shadow service, the host/authority header is suffixed with -shadow. Mirroring is currently not supported for Cloud Run destinations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destination` | HttpRouteDestination | The destination the requests will be mirrored to. The weight of the destination will be ignored. |
| `mirrorPercent` | number (float) | Optional. The percentage of requests to get mirrored to the desired destination. |

### `HttpRouteRetryPolicy`

- The specifications for retries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `numRetries` | integer (int32) | Specifies the allowed number of retries. This number must be > 0. If not specified, default to 1. |
| `perTryTimeout` | string (google-duration) | Specifies a non-zero timeout per retry attempt. |
| `retryConditions` | array<string> | Specifies one or more conditions when this retry policy applies. Valid values are: 5xx: Proxy will attempt a retry if the destination service responds with any 5xx response code, of if the destination service does not respond at all, example: disconnect, reset, read timeout, connection failure and refused streams. gateway-error: Similar to 5xx, but only applies to response codes 502, 503, 504. reset: Proxy will attempt a retry if the destination service does not respond at all (disconnect/reset/read timeout) connect-failure: Proxy will retry on failures connecting to destination for example due to connection timeouts. retriable-4xx: Proxy will retry fro retriable 4xx response codes. Currently the only retriable error supported is 409. refused-stream: Proxy will retry if the destination resets the stream with a REFUSED_STREAM error code. This reset type indicates that it is safe to retry. |

### `HttpRouteRouteAction`

- The specifications for routing traffic and applying associated policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `corsPolicy` | HttpRouteCorsPolicy | The specification for allowing client side cross-origin requests. |
| `destinations` | array<HttpRouteDestination> | The destination to which traffic should be forwarded. |
| `directResponse` | HttpRouteHttpDirectResponse | Optional. Static HTTP Response object to be returned regardless of the request. |
| `faultInjectionPolicy` | HttpRouteFaultInjectionPolicy | The specification for fault injection introduced into traffic to test the resiliency of clients to backend service failure. As part of fault injection, when clients send requests to a backend service, delays can be introduced on a percentage of requests before sending those requests to the backend service. Similarly requests from clients can be aborted for a percentage of requests. timeout and retry_policy will be ignored by clients that are configured with a fault_injection_policy |
| `idleTimeout` | string (google-duration) | Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled. |
| `redirect` | HttpRouteRedirect | If set, the request is directed as configured by this field. |
| `requestHeaderModifier` | HttpRouteHeaderModifier | The specification for modifying the headers of a matching request prior to delivery of the request to the destination. If HeaderModifiers are set on both the Destination and the RouteAction, they will be merged. Conflicts between the two will not be resolved on the configuration. |
| `requestMirrorPolicy` | HttpRouteRequestMirrorPolicy | Specifies the policy on how requests intended for the routes destination are shadowed to a separate mirrored destination. Proxy will not wait for the shadow destination to respond before returning the response. Prior to sending traffic to the shadow service, the host/authority header is suffixed with -shadow. |
| `responseHeaderModifier` | HttpRouteHeaderModifier | The specification for modifying the headers of a response prior to sending the response back to the client. If HeaderModifiers are set on both the Destination and the RouteAction, they will be merged. Conflicts between the two will not be resolved on the configuration. |
| `retryPolicy` | HttpRouteRetryPolicy | Specifies the retry policy associated with this route. |
| `statefulSessionAffinity` | HttpRouteStatefulSessionAffinityPolicy | Optional. Specifies cookie-based stateful session affinity. |
| `timeout` | string (google-duration) | Specifies the timeout for selected route. Timeout is computed from the time the request has been fully processed (i.e. end of stream) up until the response has been completely processed. Timeout includes all retries. |
| `urlRewrite` | HttpRouteURLRewrite | The specification for rewrite URL before forwarding requests to the destination. |

### `HttpRouteRouteMatch`

- RouteMatch defines specifications used to match requests. If multiple match types are set, this RouteMatch will match if ALL type of matches are matched.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullPathMatch` | string | The HTTP request path value should exactly match this value. Only one of full_path_match, prefix_match, or regex_match should be used. |
| `headers` | array<HttpRouteHeaderMatch> | Specifies a list of HTTP request headers to match against. ALL of the supplied headers must be matched. |
| `ignoreCase` | boolean | Specifies if prefix_match and full_path_match matches are case sensitive. The default value is false. |
| `prefixMatch` | string | The HTTP request path value must begin with specified prefix_match. prefix_match must begin with a /. Only one of full_path_match, prefix_match, or regex_match should be used. |
| `queryParameters` | array<HttpRouteQueryParameterMatch> | Specifies a list of query parameters to match against. ALL of the query parameters must be matched. |
| `regexMatch` | string | The HTTP request path value must satisfy the regular expression specified by regex_match after removing any query parameters and anchor supplied with the original URL. For regular expression grammar, please see https://github.com/google/re2/wiki/Syntax Only one of full_path_match, prefix_match, or regex_match should be used. |

### `HttpRouteRouteRule`

- Specifies how to match traffic and how to route traffic when traffic is matched.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | HttpRouteRouteAction | The detailed rule defining how to route matched traffic. |
| `matches` | array<HttpRouteRouteMatch> | A list of matches define conditions used for matching the rule against incoming HTTP requests. Each match is independent, i.e. this rule will be matched if ANY one of the matches is satisfied. If no matches field is specified, this rule will unconditionally match traffic. If a default rule is desired to be configured, add a rule with no matches specified to the end of the rules list. |

### `HttpRouteStatefulSessionAffinityPolicy`

- The specification for cookie-based stateful session affinity where the date plane supplies a “session cookie” with the name "GSSA" which encodes a specific destination host and each request containing that cookie will be directed to that host as long as the destination host remains up and healthy. The gRPC proxyless mesh library or sidecar proxy will manage the session cookie but the client application code is responsible for copying the cookie from each RPC in the session to the next.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cookieTtl` | string (google-duration) | Required. The cookie TTL value for the Set-Cookie header generated by the data plane. The lifetime of the cookie may be set to a value from 0 to 86400 seconds (24 hours) inclusive. Set this to 0s to use a session cookie and disable cookie expiration. |

### `HttpRouteURLRewrite`

- The specification for modifying the URL of the request, prior to forwarding the request to the destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostRewrite` | string | Prior to forwarding the request to the selected destination, the requests host header is replaced by this value. |
| `pathPrefixRewrite` | string | Prior to forwarding the request to the selected destination, the matching portion of the requests path is replaced by this value. |

### `LbEdgeExtension`

- `LbEdgeExtension` is a resource that lets the extension service influence the selection of backend services and Cloud CDN cache keys by modifying request headers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `extensionChains` | array<ExtensionChain> | Required. A set of ordered extension chains that contain the match conditions and extensions to execute. Match conditions for each extension chain are evaluated in sequence for a given request. The first extension chain that has a condition that matches the request is executed. Any subsequent extension chains do not execute. Limited to 5 extension chains per resource. |
| `forwardingRules` | array<string> | Required. A list of references to the forwarding rules to which this service extension is attached. At least one forwarding rule is required. Only one `LbEdgeExtension` resource can be associated with a forwarding rule. |
| `labels` | object | Optional. Set of labels associated with the `LbEdgeExtension` resource. The format must comply with the requirements for labels (https://cloud.google.com/compute/docs/labeling-resources#requirements) for Google Cloud resources. |
| `loadBalancingScheme` | string enum | Required. All forwarding rules referenced by this extension must share the same load balancing scheme. Supported values: `EXTERNAL_MANAGED`. Values: `LOAD_BALANCING_SCHEME_UNSPECIFIED`, `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. |
| `name` | string | Required. Identifier. Name of the `LbEdgeExtension` resource in the following format: `projects/{project}/locations/{location}/lbEdgeExtensions/{lb_edge_extension}`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `LbRouteExtension`

- `LbRouteExtension` is a resource that lets you control where traffic is routed to for a given request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `extensionChains` | array<ExtensionChain> | Required. A set of ordered extension chains that contain the match conditions and extensions to execute. Match conditions for each extension chain are evaluated in sequence for a given request. The first extension chain that has a condition that matches the request is executed. Any subsequent extension chains do not execute. Limited to 5 extension chains per resource. |
| `forwardingRules` | array<string> | Required. A list of references to the forwarding rules to which this service extension is attached. At least one forwarding rule is required. Only one `LbRouteExtension` resource can be associated with a forwarding rule. |
| `labels` | object | Optional. Set of labels associated with the `LbRouteExtension` resource. The format must comply with the requirements for labels (https://cloud.google.com/compute/docs/labeling-resources#requirements) for Google Cloud resources. |
| `loadBalancingScheme` | string enum | Required. All backend services and forwarding rules referenced by this extension must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. For more information, refer to Backend services overview (https://cloud.google.com/load-balancing/docs/backend-service). Values: `LOAD_BALANCING_SCHEME_UNSPECIFIED`, `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. |
| `metadata` | object | Optional. The metadata provided here is included as part of the `metadata_context` (of type `google.protobuf.Struct`) in the `ProcessingRequest` message sent to the extension server. The metadata applies to all extensions in all extensions chains in this resource. The metadata is available under the key `com.google.lb_route_extension.`. The following variables are supported in the metadata: `{forwarding_rule_id}` - substituted with the forwarding rule's fully qualified resource name. This field must not be set if at least one of the extension chains contains plugin extensions. Setting it results in a validation error. You can set metadata at either the resource level or the extension level. The extension level metadata is recommended because you can pass a different set of metadata through each extension to the backend. |
| `name` | string | Required. Identifier. Name of the `LbRouteExtension` resource in the following format: `projects/{project}/locations/{location}/lbRouteExtensions/{lb_route_extension}`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `LbTcpExtension`

- `LbTcpExtension` is a resource that allows traffic forwarding to different backend services to make allow/deny decisions on TCP connections for all L7 Load Balancers within a network. Currently only internal load-balancers are supported.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `extensionChains` | array<ExtensionChain> | Required. A set of ordered extension chains that contain the match conditions and extensions to execute. Match conditions for each extension chain are evaluated in sequence for a given request. The first extension chain that has a condition that matches the request is executed. Any subsequent extension chains do not execute. Limited to 1 extension chain per resource. |
| `labels` | object | Optional. Set of labels associated with the `LbTcpExtension` resource. The format must comply with the requirements for labels for Google Cloud resources. |
| `loadBalancingScheme` | string enum | Required. All backend services and forwarding rules referenced by this extension must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED`. For more information, refer to Backend services overview (https://cloud.google.com/load-balancing/docs/backend-service). Values: `LOAD_BALANCING_SCHEME_UNSPECIFIED`, `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. |
| `name` | string | Required. Identifier. Name of the `LbTcpExtension` resource in the following format: `projects/{project}/locations/{location}/LbTcpExtension/{lb_tcp_extension}` |
| `networks` | array<string> | Optional. If set, this `LbTcpExtension` resource applies to all `ForwardingRule` resources in these VPC networks. Values should be relative resource names identifying VPC networks, for example `projects/*/global/networks/network-1`. Currently limited to 1 network per resource. Limited to 1 network per resource. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `LbTrafficExtension`

- `LbTrafficExtension` is a resource that lets the extension service modify the headers and payloads of both requests and responses without impacting the choice of backend services or any other security policies associated with the backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `extensionChains` | array<ExtensionChain> | Required. A set of ordered extension chains that contain the match conditions and extensions to execute. Match conditions for each extension chain are evaluated in sequence for a given request. The first extension chain that has a condition that matches the request is executed. Any subsequent extension chains do not execute. Limited to 5 extension chains per resource. |
| `forwardingRules` | array<string> | Optional. A list of references to the forwarding rules to which this service extension is attached. At least one forwarding rule is required. Only one `LbTrafficExtension` resource can be associated with a forwarding rule. |
| `labels` | object | Optional. Set of labels associated with the `LbTrafficExtension` resource. The format must comply with the requirements for labels (https://cloud.google.com/compute/docs/labeling-resources#requirements) for Google Cloud resources. |
| `loadBalancingScheme` | string enum | Required. All backend services and forwarding rules referenced by this extension must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. For more information, refer to Backend services overview (https://cloud.google.com/load-balancing/docs/backend-service). Values: `LOAD_BALANCING_SCHEME_UNSPECIFIED`, `INTERNAL_MANAGED`, `EXTERNAL_MANAGED`. |
| `metadata` | object | Optional. The metadata provided here is included as part of the `metadata_context` (of type `google.protobuf.Struct`) in the `ProcessingRequest` message sent to the extension server. The metadata applies to all extensions in all extensions chains in this resource. The metadata is available under the key `com.google.lb_traffic_extension.`. The following variables are supported in the metadata: `{forwarding_rule_id}` - substituted with the forwarding rule's fully qualified resource name. This field must not be set if at least one of the extension chains contains plugin extensions. Setting it results in a validation error. You can set metadata at either the resource level or the extension level. The extension level metadata is recommended because you can pass a different set of metadata through each extension to the backend. |
| `name` | string | Required. Identifier. Name of the `LbTrafficExtension` resource in the following format: `projects/{project}/locations/{location}/lbTrafficExtensions/{lb_traffic_extension}`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `ListAgentConnectivityTemplatesResponse`

- Response returned by the ListAgentConnectivityTemplates method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentConnectivityTemplates` | array<AgentConnectivityTemplate> | List of AgentConnectivityTemplate resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListAgentGatewaysResponse`

- Response returned by the ListAgentGateways method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentGateways` | array<AgentGateway> | List of AgentGateway resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListAuthzExtensionsResponse`

- Message for response to listing `AuthzExtension` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authzExtensions` | array<AuthzExtension> | The list of `AuthzExtension` resources. |
| `nextPageToken` | string | A token identifying a page of results that the server returns. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCdnEdgeExtensionsResponse`

- Message for response to listing `CdnEdgeExtension` resources.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cdnEdgeExtensions` | array<CdnEdgeExtension> | The list of `CdnEdgeExtension` resources. |
| `nextPageToken` | string | A token identifying a page of results that the server returns. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListEndpointPoliciesResponse`

- Response returned by the ListEndpointPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpointPolicies` | array<EndpointPolicy> | List of EndpointPolicy resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request opts into return_partial_success and reading across collections e.g. when attempting to list all resources across all supported locations. |

### `ListExpressLinksResponse`

- Response returned by the ListExpressLinks method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `expressLinks` | array<ExpressLink> | List of ExpressLink resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListExtensionBindingsResponse`

- Response returned by the `ListExtensionBindings` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extensionBindings` | array<ExtensionBinding> | List of `ExtensionBinding` resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. The resource names are in the format `projects/{project}/locations/{location}/extensionBindings/{extension_binding}`. |

### `ListGatewayRouteViewsResponse`

- Response returned by the ListGatewayRouteViews method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gatewayRouteViews` | array<GatewayRouteView> | List of GatewayRouteView resources. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListGatewaysResponse`

- Response returned by the ListGateways method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gateways` | array<Gateway> | List of Gateway resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListGrpcRoutesResponse`

- Response returned by the ListGrpcRoutes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `grpcRoutes` | array<GrpcRoute> | List of GrpcRoute resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request opts into return_partial_success and reading across collections e.g. when attempting to list all resources across all supported locations. |

### `ListHttpRoutesResponse`

- Response returned by the ListHttpRoutes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `httpRoutes` | array<HttpRoute> | List of HttpRoute resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request opts into return_partial_success and reading across collections e.g. when attempting to list all resources across all supported locations. |

### `ListLbEdgeExtensionsResponse`

- Message for response to listing `LbEdgeExtension` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lbEdgeExtensions` | array<LbEdgeExtension> | The list of `LbEdgeExtension` resources. |
| `nextPageToken` | string | A token identifying a page of results that the server returns. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLbRouteExtensionsResponse`

- Message for response to listing `LbRouteExtension` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lbRouteExtensions` | array<LbRouteExtension> | The list of `LbRouteExtension` resources. |
| `nextPageToken` | string | A token identifying a page of results that the server returns. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLbTcpExtensionsResponse`

- Message for response to listing `LbTcpExtension` resources.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `lbTcpExtensions` | array<LbTcpExtension> | The list of `LbTcpExtension` resources. |
| `nextPageToken` | string | A token identifying a page of results that the server returns. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLbTrafficExtensionsResponse`

- Message for response to listing `LbTrafficExtension` resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lbTrafficExtensions` | array<LbTrafficExtension> | The list of `LbTrafficExtension` resources. |
| `nextPageToken` | string | A token identifying a page of results that the server returns. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMeshRouteViewsResponse`

- Response returned by the ListMeshRouteViews method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `meshRouteViews` | array<MeshRouteView> | List of MeshRouteView resources. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListMeshesResponse`

- Response returned by the ListMeshes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `meshes` | array<Mesh> | List of Mesh resources. |
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request opts into `return_partial_success` and reading across collections e.g. when attempting to list all resources across all supported locations. |

### `ListMulticastConsumerAssociationsResponse`

- Response message for ListMulticastConsumerAssociations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `multicastConsumerAssociations` | array<MulticastConsumerAssociation> | The list of multicast consumer associations. |
| `nextPageToken` | string | A page token from an earlier query, as returned in `next_page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListMulticastGroupConsumerActivationsResponse`

- Response message for ListMulticastGroupConsumerActivations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `multicastGroupConsumerActivations` | array<MulticastGroupConsumerActivation> | The list of multicast group consumer activations. |
| `nextPageToken` | string | A page token from an earlier query, as returned in `next_page_token`. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListProducerExtensionsResponse`

- Response returned by the `ListProducerExtensions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `producerExtensions` | array<ProducerExtension> | List of `ProducerExtension` resources. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. The resource names are in the format: `projects/{project}/locations/{location}/producerExtensions/{producer_extension}`. |

### `ListServiceBindingsResponse`

- Response returned by the ListServiceBindings method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `serviceBindings` | array<ServiceBinding> | List of ServiceBinding resources. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListServiceLbPoliciesResponse`

- Response returned by the ListServiceLbPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `serviceLbPolicies` | array<ServiceLbPolicy> | List of ServiceLbPolicy resources. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListTcpRoutesResponse`

- Response returned by the ListTcpRoutes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `tcpRoutes` | array<TcpRoute> | List of TcpRoute resources. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request opts into return_partial_success and reading across collections e.g. when attempting to list all resources across all supported locations. |

### `ListTelemetryPoliciesResponse`

- Response returned by the ListTelemetryPolicies method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `telemetryPolicies` | array<TelemetryPolicy> | List of TelemetryPolicy resources. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |

### `ListTlsRoutesResponse`

- Response returned by the ListTlsRoutes method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `tlsRoutes` | array<TlsRoute> | List of TlsRoute resources. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request opts into return_partial_success and reading across collections e.g. when attempting to list all resources across all supported locations. |

### `ListWasmPluginVersionsResponse`

- Response returned by the `ListWasmPluginVersions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |
| `wasmPluginVersions` | array<WasmPluginVersion> | List of `WasmPluginVersion` resources. |

### `ListWasmPluginsResponse`

- Response returned by the `ListWasmPlugins` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there might be more results than those appearing in this response, then `next_page_token` is included. To get the next set of results, call this method again using the value of `next_page_token` as `page_token`. |
| `unreachable` | array<string> | Unreachable resources. Populated when the request attempts to list all resources across all supported locations, while some locations are temporarily unavailable. |
| `wasmPlugins` | array<WasmPlugin> | List of `WasmPlugin` resources. |

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

- The configuration for Platform Telemetry logging for Eventarc Advanced resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logSeverity` | string enum | Optional. The minimum severity of logs that will be sent to Stackdriver/Platform Telemetry. Logs at severitiy ≥ this value will be sent, unless it is NONE. Values: `LOG_SEVERITY_UNSPECIFIED`, `NONE`, `DEBUG`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `CRITICAL`, `ALERT`, `EMERGENCY`. |

### `Mesh`

- Mesh represents a logical configuration grouping for workload to workload communication within a service mesh. Routes that point to mesh dictate how requests are routed within this logical mesh boundary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `envoyHeaders` | string enum | Optional. Determines if envoy will insert internal debug headers into upstream requests. Other Envoy headers may still be injected. By default, envoy will not insert any debug headers. Values: `ENVOY_HEADERS_UNSPECIFIED`, `NONE`, `DEBUG_HEADERS`. |
| `interceptionPort` | integer (int32) | Optional. If set to a valid TCP port (1-65535), instructs the SIDECAR proxy to listen on the specified port of localhost (127.0.0.1) address. The SIDECAR proxy will expect all traffic to be redirected to this port regardless of its actual ip:port destination. If unset, a port '15001' is used as the interception port. This is applicable only for sidecar proxy deployments. |
| `labels` | object | Optional. Set of label tags associated with the Mesh resource. |
| `name` | string | Identifier. Name of the Mesh resource. It matches pattern `projects/*/locations/*/meshes/`. |
| `selfLink` | string | Output only. Server-defined URL of this resource |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `MeshRouteView`

- MeshRouteView defines view-only resource for Routes to a Mesh
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Identifier. Full path name of the MeshRouteView resource. Format: projects/{project_number}/locations/{location}/meshes/{mesh}/routeViews/{route_view} |
| `routeId` | string | Output only. The resource id for the route. |
| `routeLocation` | string | Output only. Location where the route exists. |
| `routeProjectNumber` | string (int64) | Output only. Project number where the route exists. |
| `routeType` | string | Output only. Type of the route: HttpRoute,GrpcRoute,TcpRoute, or TlsRoute |

### `MetadataLabelMatcher`

- The matcher that is based on node metadata presented by xDS clients.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `metadataLabelMatchCriteria` | string enum | Specifies how matching should be done. Supported values are: MATCH_ANY: At least one of the Labels specified in the matcher should match the metadata presented by xDS client. MATCH_ALL: The metadata presented by the xDS client should contain all of the labels specified here. The selection is determined based on the best match. For example, suppose there are three EndpointPolicy resources P1, P2 and P3 and if P1 has a the matcher as MATCH_ANY , P2 has MATCH_ALL , and P3 has MATCH_ALL . If a client with label connects, the config from P1 will be selected. If a client with label connects, the config from P2 will be selected. If a client with label connects, the config from P3 will be selected. If there is more than one best match, (for example, if a config P4 with selector exists and if a client with label connects), pick up the one with older creation time. Values: `METADATA_LABEL_MATCH_CRITERIA_UNSPECIFIED`, `MATCH_ANY`, `MATCH_ALL`. |
| `metadataLabels` | array<MetadataLabels> | The list of label value pairs that must match labels in the provided metadata based on filterMatchCriteria This list can have at most 64 entries. The list can be empty if the match criteria is MATCH_ANY, to specify a wildcard match (i.e this matches any client). |

### `MetadataLabels`

- Defines a name-pair value for a single label.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `labelName` | string | Required. Label name presented as key in xDS Node Metadata. |
| `labelValue` | string | Required. Label value presented as value corresponding to the above key, in xDS Node Metadata. |

### `MetricsConfiguration`

- Configuration for metrics collection.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Indicates whether metrics are enabled or disabled. Set to true to explicitly enable, or false to explicitly disable. |

### `MulticastConsumerAssociation`

- Multicast consumer association resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. \[Output only\] The timestamp when the multicast consumer association was created. |
| `description` | string | Optional. An optional text description of the multicast consumer association. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `multicastDomainActivation` | string | Optional. The resource name of the multicast domain activation that is in the same zone as this multicast consumer association. Use the following format: `projects/*/locations/*/multicastDomainActivations/*`. |
| `name` | string | Identifier. The resource name of the multicast consumer association. Use the following format: `projects/*/locations/*/multicastConsumerAssociations/*`. |
| `network` | string | Required. The resource name of the multicast consumer VPC network. Use following format: `projects/{project}/locations/global/networks/{network}`. |
| `placementPolicy` | string | Output only. \[Output only\] A Compute Engine (placement policy)\[https://cloud.google.com/compute/docs/instances/placement-policies-overview\] that can be used to place virtual machine (VM) instances as multicast consumers close to the multicast infrastructure created for this domain, on a best effort basis. |
| `resourceState` | string enum | Output only. \[Deprecated\] The resource state of the multicast consumer association. Use the state field instead. Values: `CONSUMER_RESOURCE_STATE_UNSPECIFIED`, `ACTIVE`, `OBSOLETE`. |
| `state` | MulticastResourceState | Output only. \[Output only\] The state of the resource. |
| `uniqueId` | string | Output only. \[Output only\] The Google-generated UUID for the resource. This value is unique across all multicast consumer association resources. If a multicast consumer association is deleted and another with the same name is created, the new multicast consumer association is assigned a different unique_id. |
| `updateTime` | string (google-datetime) | Output only. \[Output only\] The timestamp when the Multicast Consumer Association was most recently updated. |

### `MulticastGroupConsumerActivation`

- Multicast group consumer activation resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. \[Output only\] The timestamp when the multicast group consumer activation was created. |
| `description` | string | Optional. An optional text description of the multicast group consumer activation. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `logConfig` | MulticastLogConfig | Optional. Specifies the logging options for the activities performed related to the multicast group consumer activation. Defaults to false. If logging is enabled, logs are exported to Cloud Logging. |
| `multicastConsumerAssociation` | string | Required. The resource name of the multicast consumer association that is in the same zone as this multicast group consumer activation. Use the following format: `projects/*/locations/*/multicastConsumerAssociations/*`. |
| `multicastGroup` | string | Optional. The resource name of the multicast group created by the admin in the same zone as this multicast group consumer activation. Use the following format: `projects/*/locations/*/multicastGroups/*`. This field is deprecated. Use multicast_group_range_activation instead. |
| `multicastGroupRangeActivation` | string | Required. The resource name of the multicast group range activation created by the admin in the same zone as this multicast group consumer activation. Use the following format: `projects/*/locations/*/multicastGroupRangeActivations/*`. |
| `name` | string | Identifier. The resource name of the multicast group consumer activation. Use the following format: `projects/*/locations/*/multicastGroupConsumerActivations/*`. |
| `resourceState` | string enum | Output only. \[Deprecated\] The resource state of the multicast group consumer activation. Use the state field instead. Values: `CONSUMER_RESOURCE_STATE_UNSPECIFIED`, `ACTIVE`, `OBSOLETE`. |
| `state` | MulticastResourceState | Output only. \[Output only\] The state of the resource. |
| `uniqueId` | string | Output only. \[Output only\] The Google-generated UUID for the resource. This value is unique across all multicast group consumer activation resources. If a multicast group consumer activation is deleted and another with the same name is created, the new multicast group consumer activation is assigned a different unique_id. |
| `updateTime` | string (google-datetime) | Output only. \[Output only\] The timestamp when the multicast group consumer activation was most recently updated. |

### `MulticastLogConfig`

- The logging configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Whether to enable logging or not. |

### `MulticastResourceState`

- The multicast resource's state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Optional. The state of the multicast resource. Values: `STATE_ENUM_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `DELETE_FAILED`, `UPDATING`, `UPDATE_FAILED`, `INACTIVE`, `OBSOLETE`. |

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
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
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

### `ProducerExtension`

- `ProducerExtension` is a resource representing producer defined configuration for their service extension.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `etag` | string | Optional. Etag of the resource. If this is provided, it must match the server's etag. If the provided etag does not match the server's etag, the request will fail with a 409 ABORTED error. |
| `extensionSettings` | ProducerExtensionExtensionSettings | Required. The configuration for the service that this `ProducerExtension` offers. |
| `labels` | object | Optional. Set of labels associated with the `ProducerExtension` resource. The format must comply with the following requirements (https://cloud.google.com/compute/docs/labeling-resources#requirements). |
| `name` | string | Identifier. Name of the `ProducerExtension` resource in the following format: `projects/{project}/locations/{location}/producerExtensions/{producer_extension}`. |
| `phase` | string enum | Required. The phase in which this `ProducerExtension` should execute. Values: `PHASE_UNSPECIFIED`, `TRAFFIC`, `AUTHZ`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `ProducerExtensionExtensionSettings`

- The configuration for the service that this `ProducerExtension` offers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authority` | string | Optional. The `:authority` header in the request sent to the extension service. |
| `observabilityMode` | boolean | Optional. This field is not supported. |
| `service` | string | Required. URI of the PSC attachment. |
| `supportedEvents` | array<string> | Required. The event types supported by the extension. Values: `EVENT_TYPE_UNSPECIFIED`, `REQUEST_HEADERS`, `REQUEST_BODY`, `RESPONSE_HEADERS`, `RESPONSE_BODY`, `REQUEST_TRAILERS`, `RESPONSE_TRAILERS`. |

### `RetryFilterPerRouteConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cryptoKeyName` | string | The name of the crypto key to use for encrypting event data. |

### Shape of `AgentConnectivityTemplate`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "accessPath": "string enum",
  "accessTypes": "array<string>",
  "agentCompute": "string enum",
  "createTime": "string (google-datetime)",
  "deploymentModel": "string enum",
  "description": "string",
  "egressNetworkConfig": "EgressNetworkConfig",
  "etag": "string",
  "labels": "object",
  "name": "string",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networkservices` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): `name` descriptions that read "It matches pattern `projects/*/locations/*/<collection>/`" (for `gateways`, `meshes`, `grpcRoutes`, `serviceBindings`, `agentGateways`, `agentConnectivityTemplates` and `expressLinks`) lack the resource ID; the Discovery path patterns of the corresponding `patch` methods end with `/<collection>/[^/]+` (for example `projects/[^/]+/locations/[^/]+/gateways/[^/]+`), so the name is `projects/{project}/locations/{location}/<collection>/{id}`.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://networkservices.googleapis.com/$discovery/rest?version=v1, https://networkservices.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
