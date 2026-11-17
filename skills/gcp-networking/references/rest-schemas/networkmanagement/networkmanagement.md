---
source: https://networkmanagement.googleapis.com/$discovery/rest?version=v1
---

# Network Management API message schemas (networkmanagement)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/networkmanagement/`.

### `AbortInfo`

- Details of the final state "abort" and associated resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cause` | string enum | Causes that the analysis is aborted. Values: `CAUSE_UNSPECIFIED`, `UNKNOWN_NETWORK`, `UNKNOWN_PROJECT`, `NO_EXTERNAL_IP`, `UNINTENDED_DESTINATION`, `SOURCE_ENDPOINT_NOT_FOUND`, `MISMATCHED_SOURCE_NETWORK`, `DESTINATION_ENDPOINT_NOT_FOUND`, `MISMATCHED_DESTINATION_NETWORK`, `UNKNOWN_IP`, `GOOGLE_MANAGED_SERVICE_UNKNOWN_IP`, `SOURCE_IP_ADDRESS_NOT_IN_SOURCE_NETWORK`, `PERMISSION_DENIED`, `PERMISSION_DENIED_NO_CLOUD_NAT_CONFIGS`, `PERMISSION_DENIED_NO_NEG_ENDPOINT_CONFIGS`, `PERMISSION_DENIED_NO_CLOUD_ROUTER_CONFIGS`, `NO_SOURCE_LOCATION`, `NO_SOURCE_GCP_NETWORK_LOCATION`, `NO_SOURCE_NON_GCP_NETWORK_LOCATION`, `NO_SOURCE_INTERNET_LOCATION`, `INVALID_ARGUMENT`, `TRACE_TOO_LONG`, `INTERNAL_ERROR`, `UNSUPPORTED`, `MISMATCHED_IP_VERSION`, `GKE_KONNECTIVITY_PROXY_UNSUPPORTED`, `RESOURCE_CONFIG_NOT_FOUND`, `VM_INSTANCE_CONFIG_NOT_FOUND`, `NETWORK_CONFIG_NOT_FOUND`, `FIREWALL_CONFIG_NOT_FOUND`, `ROUTE_CONFIG_NOT_FOUND`, `GOOGLE_MANAGED_SERVICE_AMBIGUOUS_PSC_ENDPOINT`, `GOOGLE_MANAGED_SERVICE_AMBIGUOUS_ENDPOINT`, `SOURCE_PSC_CLOUD_SQL_UNSUPPORTED`, `SOURCE_EXTERNAL_CLOUD_SQL_UNSUPPORTED`, `SOURCE_REDIS_CLUSTER_UNSUPPORTED`, `SOURCE_REDIS_INSTANCE_UNSUPPORTED`, `SOURCE_FORWARDING_RULE_UNSUPPORTED`, `NON_ROUTABLE_IP_ADDRESS`, `UNKNOWN_ISSUE_IN_GOOGLE_MANAGED_PROJECT`, `UNSUPPORTED_GOOGLE_MANAGED_PROJECT_CONFIG`, `NO_SERVERLESS_IP_RANGES`, `IP_VERSION_PROTOCOL_MISMATCH`, `GKE_POD_UNKNOWN_ENDPOINT_LOCATION`, `RESPONSE_TOO_LARGE`, `DESTINATION_CLOUD_RUN_SERVICE_REVISION_UNSUPPORTED`, `DESTINATION_CLOUD_RUN_VPC_CONNECTOR_UNSUPPORTED`, `CLOUD_RUN_RESOURCE_NOT_CONNECTED_TO_VPC`. |
| `ipAddress` | string | IP address that caused the abort. |
| `projectsMissingPermission` | array<string> | List of project IDs the user specified in the request but lacks access to. In this case, analysis is aborted with the PERMISSION_DENIED cause. |
| `resourceUri` | string | URI of the resource that caused the abort. Format: \* `projects/{project_id}/global/networks/{network_id}` (VPC network) \* `projects/{project_id}/zones/{zone}/instances/{instance_id}` (VM instance) |

### `AppEngineVersionEndpoint`

- Wrapper for the App Engine service version attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | An App Engine (https://cloud.google.com/appengine) service version (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name. |

### `AppEngineVersionInfo`

- For display only. Metadata associated with an App Engine version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of an App Engine version. |
| `environment` | string | App Engine execution environment for a version. |
| `runtime` | string | Runtime of the App Engine version. |
| `uri` | string | URI of the App Engine version. Format: `apps/{app_id}/services/{service_id}/versions/{version_id}` |

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

### `CloudFunctionEndpoint`

- Wrapper for Cloud Function attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | A Cloud Function (https://cloud.google.com/functions) name. |

### `CloudFunctionInfo`

- For display only. Metadata associated with a Cloud Function.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Cloud Function. |
| `location` | string | Location in which the Cloud Function is deployed. |
| `uri` | string | URI of the Cloud Function. Format: `projects/{project_id}/locations/{location}/functions/{function_id}` |
| `versionId` | string (int64) | Latest successfully deployed version id of the Cloud Function. |

### `CloudRunJobInfo`

- For display only. Metadata associated with a Cloud Run job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Cloud Run job. |
| `location` | string | Location in which this job is deployed. |
| `uri` | string | URI of the Cloud Run job. Format: `projects/{project_id}/locations/{location}/jobs/{job_id}` |

### `CloudRunRevisionEndpoint`

- Wrapper for Cloud Run revision attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceUri` | string | Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}. Mutually exclusive with worker_pool_uri. |
| `uri` | string | A Cloud Run (https://cloud.google.com/run) revision (https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision} |

### `CloudRunRevisionInfo`

- For display only. Metadata associated with a Cloud Run revision.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Cloud Run revision. |
| `ipAddress` | string | IP address of a Cloud Run revision. If the Cloud Run revision is in dual-stack subnetwork, this is the IP address relevant to the trace. Populated for `ARRIVE_AT_CLOUD_RUN_REVISION` steps. |
| `location` | string | Location in which this revision is deployed. |
| `serviceUri` | string | URI of Cloud Run service this revision belongs to. Format: `projects/{project_id}/locations/{location}/services/{service_id}` Mutually exclusive with `worker_pool_uri`. |
| `uri` | string | URI of the Cloud Run revision. Format: `projects/{project_id}/locations/{location}/revisions/{revision_id}` |
| `workerPoolUri` | string | URI of Cloud Run worker pool this revision belongs to. Format: `projects/{project_id}/locations/{location}/workerPools/{worker_pool_id}` Mutually exclusive with `service_uri`. |

### `CloudSQLInstanceInfo`

- For display only. Metadata associated with a Cloud SQL instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Cloud SQL instance. |
| `externalIp` | string | External IP address of a Cloud SQL instance. |
| `internalIp` | string | Internal IP address of a Cloud SQL instance. |
| `networkUri` | string | URI of a Cloud SQL instance network or empty string if the instance does not have one. In format "projects/{project}/global/networks/{network}". |
| `region` | string | Region in which the Cloud SQL instance is running. |
| `uri` | string | URI of a Cloud SQL instance in format "projects/{project}/instances/{instance}" |

### `ConnectivityTest`

- A Connectivity Test for a network reachability analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bypassFirewallChecks` | boolean | Whether the analysis should skip firewall checking. Default value is false. |
| `createTime` | string (google-datetime) | Output only. The time the test was created. |
| `description` | string | The user-supplied description of the Connectivity Test. Maximum of 512 characters. |
| `destination` | Endpoint | Required. Destination specification of the Connectivity Test. You can use a combination of destination IP address, URI of a supported endpoint, project ID, or VPC network to identify the destination location. Reachability analysis proceeds even if the destination location is ambiguous. However, the test result might include endpoints or use a destination that you don't intend to test. |
| `displayName` | string | Output only. The display name of a Connectivity Test. |
| `labels` | object | Resource labels to represent user-provided metadata. |
| `name` | string | Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` |
| `probingDetails` | ProbingDetails | Output only. The probing details of this test from the latest run, present for applicable tests only. The details are updated when creating a new test, updating an existing test, or triggering a one-time rerun of an existing test. |
| `protocol` | string | IP Protocol of the test. When not provided, "TCP" is assumed. |
| `reachabilityDetails` | ReachabilityDetails | Output only. The reachability details of this test from the latest run. The details are updated when creating a new test, updating an existing test, or triggering a one-time rerun of an existing test. |
| `relatedProjects` | array<string> | Other projects that may be relevant for reachability analysis. This is applicable to scenarios where a test can cross project boundaries. |
| `returnReachabilityDetails` | ReachabilityDetails | Output only. The reachability details of this test from the latest run for the return path. The details are updated when creating a new test, updating an existing test, or triggering a one-time rerun of an existing test. |
| `roundTrip` | boolean | Whether run analysis for the return path from destination to source. Default value is false. |
| `source` | Endpoint | Required. Source specification of the Connectivity Test. You can use a combination of source IP address, URI of a supported endpoint, project ID, or VPC network to identify the source location. Reachability analysis might proceed even if the source location is ambiguous. However, the test result might include endpoints or use a source that you don't intend to test. |
| `updateTime` | string (google-datetime) | Output only. The time the test's configuration was updated. |

### `DeliverInfo`

- Details of the final state "deliver" and associated resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googleServiceType` | string enum | Recognized type of a Google Service the packet is delivered to (if applicable). Values: `GOOGLE_SERVICE_TYPE_UNSPECIFIED`, `IAP`, `GFE_PROXY_OR_HEALTH_CHECK_PROBER`, `CLOUD_DNS`, `PRIVATE_GOOGLE_ACCESS`, `SERVERLESS_VPC_ACCESS`. |
| `ipAddress` | string | IP address of the target (if applicable). |
| `pscGoogleApiTarget` | string | PSC Google API target the packet is delivered to (if applicable). |
| `resourceUri` | string | URI of the resource that the packet is delivered to. For example: \* `"projects/{project}/zones/{zone}/instances/{instance}"` \* `"projects/{project}/regions/{region}/networkEndpointGroups/{network_endpoint_group}"` |
| `storageBucket` | string | Name of the Cloud Storage Bucket the packet is delivered to (if applicable). |
| `target` | string enum | Target type where the packet is delivered to. Values: `TARGET_UNSPECIFIED`, `INSTANCE`, `INTERNET`, `GOOGLE_API`, `GKE_MASTER`, `CLOUD_SQL_INSTANCE`, `PSC_PUBLISHED_SERVICE`, `PSC_GOOGLE_API`, `PSC_VPC_SC`, `SERVERLESS_NEG`, `STORAGE_BUCKET`, `PRIVATE_NETWORK`, `CLOUD_FUNCTION`, `APP_ENGINE_VERSION`, `CLOUD_RUN_REVISION`, `GOOGLE_MANAGED_SERVICE`, `REDIS_INSTANCE`, `REDIS_CLUSTER`, `GKE_POD`, `CLOUD_RUN_JOB`, `DMS_PRIVATE_CONNECTION`, `DATASTREAM_PRIVATE_CONNECTION`. |

### `DirectVpcEgressConnectionInfo`

- For display only. Metadata associated with a serverless direct VPC egress connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkUri` | string | URI of the VPC network for direct egress. Format: `projects/{project_id}/global/networks/{network_id}` |
| `region` | string | Region in which the Direct VPC egress is deployed. |
| `selectedIpAddress` | string | Selected starting IP address, from the selected IP range. |
| `selectedIpRange` | string | Selected IP range. |
| `subnetworkUri` | string | URI of the subnetwork for direct egress. Format: `projects/{project_id}/regions/{region}/subnetworks/{subnetwork_id}` |

### `DropInfo`

- Details of the final state "drop" and associated resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cause` | string enum | Cause that the packet is dropped. Values: `CAUSE_UNSPECIFIED`, `UNKNOWN_EXTERNAL_ADDRESS`, `FOREIGN_IP_DISALLOWED`, `FIREWALL_RULE`, `NO_ROUTE`, `ROUTE_BLACKHOLE`, `ROUTE_WRONG_NETWORK`, `ROUTE_NEXT_HOP_IP_ADDRESS_NOT_RESOLVED`, `ROUTE_NEXT_HOP_RESOURCE_NOT_FOUND`, `ROUTE_NEXT_HOP_INSTANCE_WRONG_NETWORK`, `ROUTE_NEXT_HOP_INSTANCE_NON_PRIMARY_IP`, `ROUTE_NEXT_HOP_FORWARDING_RULE_IP_MISMATCH`, `ROUTE_NEXT_HOP_VPN_TUNNEL_NOT_ESTABLISHED`, `ROUTE_NEXT_HOP_FORWARDING_RULE_TYPE_INVALID`, `NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV6_ADDRESS`, `NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV4_ADDRESS`, `NO_ROUTE_FROM_EXTERNAL_IPV6_SOURCE_TO_PRIVATE_IPV6_ADDRESS`, `VPN_TUNNEL_LOCAL_SELECTOR_MISMATCH`, `VPN_TUNNEL_REMOTE_SELECTOR_MISMATCH`, `PRIVATE_TRAFFIC_TO_INTERNET`, `PRIVATE_GOOGLE_ACCESS_DISALLOWED`, `PRIVATE_GOOGLE_ACCESS_VIA_VPN_TUNNEL_UNSUPPORTED`, `NO_EXTERNAL_ADDRESS`, `UNKNOWN_INTERNAL_ADDRESS`, `FORWARDING_RULE_MISMATCH`, `FORWARDING_RULE_NO_INSTANCES`, `FIREWALL_BLOCKING_LOAD_BALANCER_BACKEND_HEALTH_CHECK`, `FIREWALL_BLOCKING_LOAD_BALANCER_ENVOY_PROXY_HEALTH_CHECK`, `INGRESS_FIREWALL_TAGS_UNSUPPORTED_BY_DIRECT_VPC_EGRESS`, `INSTANCE_NOT_RUNNING`, `GKE_CLUSTER_NOT_RUNNING`, `GKE_POD_NOT_RUNNING`, `CLOUD_SQL_INSTANCE_NOT_RUNNING`, `REDIS_INSTANCE_NOT_RUNNING`, `REDIS_CLUSTER_NOT_RUNNING`, `TRAFFIC_TYPE_BLOCKED`, `GKE_MASTER_UNAUTHORIZED_ACCESS`, `CLOUD_SQL_INSTANCE_UNAUTHORIZED_ACCESS`, `DROPPED_INSIDE_GKE_SERVICE`, `DROPPED_INSIDE_CLOUD_SQL_SERVICE`, `DROPPED_INSIDE_DMS_PRIVATE_CONNECTION`, `DROPPED_INSIDE_DATASTREAM_PRIVATE_CONNECTION`, `GOOGLE_MANAGED_SERVICE_NO_PEERING`, `GOOGLE_MANAGED_SERVICE_NO_PSC_ENDPOINT`, `GKE_PSC_ENDPOINT_MISSING`, `CLOUD_SQL_INSTANCE_NO_IP_ADDRESS`, `GKE_CONTROL_PLANE_REGION_MISMATCH`, `PUBLIC_GKE_CONTROL_PLANE_TO_PRIVATE_DESTINATION`, `GKE_CONTROL_PLANE_NO_ROUTE`, `CLOUD_SQL_INSTANCE_NOT_CONFIGURED_FOR_EXTERNAL_TRAFFIC`, `PUBLIC_CLOUD_SQL_INSTANCE_TO_PRIVATE_DESTINATION`, `CLOUD_SQL_INSTANCE_NO_ROUTE`, `CLOUD_SQL_CONNECTOR_REQUIRED`, `CLOUD_FUNCTION_NOT_ACTIVE`, `VPC_CONNECTOR_NOT_SET`, `VPC_CONNECTOR_NOT_RUNNING`, `VPC_CONNECTOR_SERVERLESS_TRAFFIC_BLOCKED`, `VPC_CONNECTOR_HEALTH_CHECK_TRAFFIC_BLOCKED`, `FORWARDING_RULE_REGION_MISMATCH`, `PSC_CONNECTION_NOT_ACCEPTED`, `PSC_ENDPOINT_ACCESSED_FROM_PEERED_NETWORK`, `PSC_NEG_PRODUCER_ENDPOINT_NO_GLOBAL_ACCESS`, `PSC_NEG_PRODUCER_FORWARDING_RULE_MULTIPLE_PORTS`, `CLOUD_SQL_PSC_NEG_UNSUPPORTED`, `NO_NAT_SUBNETS_FOR_PSC_SERVICE_ATTACHMENT`, `PSC_TRANSITIVITY_NOT_PROPAGATED`, `HYBRID_NEG_NON_DYNAMIC_ROUTE_MATCHED`, `HYBRID_NEG_NON_LOCAL_DYNAMIC_ROUTE_MATCHED`, `CLOUD_RUN_REVISION_NOT_READY`, `CLOUD_RUN_JOB_NOT_READY`, `DROPPED_INSIDE_PSC_SERVICE_PRODUCER`, `LOAD_BALANCER_HAS_NO_PROXY_SUBNET`, `CLOUD_NAT_NO_ADDRESSES`, `ROUTING_LOOP`, `DROPPED_INSIDE_GOOGLE_MANAGED_SERVICE`, `LOAD_BALANCER_BACKEND_INVALID_NETWORK`, `BACKEND_SERVICE_NAMED_PORT_NOT_DEFINED`, `DESTINATION_IS_PRIVATE_NAT_IP_RANGE`, `DROPPED_INSIDE_REDIS_INSTANCE_SERVICE`, `REDIS_INSTANCE_UNSUPPORTED_PORT`, `REDIS_INSTANCE_CONNECTING_FROM_PUPI_ADDRESS`, `REDIS_INSTANCE_NO_ROUTE_TO_DESTINATION_NETWORK`, `REDIS_INSTANCE_NO_EXTERNAL_IP`, `REDIS_INSTANCE_UNSUPPORTED_PROTOCOL`, `DROPPED_INSIDE_REDIS_CLUSTER_SERVICE`, `REDIS_CLUSTER_UNSUPPORTED_PORT`, `REDIS_CLUSTER_NO_EXTERNAL_IP`, `REDIS_CLUSTER_UNSUPPORTED_PROTOCOL`, `NO_ADVERTISED_ROUTE_TO_GCP_DESTINATION`, `NO_TRAFFIC_SELECTOR_TO_GCP_DESTINATION`, `NO_KNOWN_ROUTE_FROM_PEERED_NETWORK_TO_DESTINATION`, `PRIVATE_NAT_TO_PSC_ENDPOINT_UNSUPPORTED`, `PRIVATE_NAT_SOURCE_IP_IN_EXCLUDED_RANGE`, `PRIVATE_NAT_SOURCE_IP_IS_A_LINK_LOCAL_IP_IN_GKE`, `PSC_PORT_MAPPING_PORT_MISMATCH`, `PSC_PORT_MAPPING_WITHOUT_PSC_CONNECTION_UNSUPPORTED`, `UNSUPPORTED_ROUTE_MATCHED_FOR_NAT64_DESTINATION`, `TRAFFIC_FROM_HYBRID_ENDPOINT_TO_INTERNET_DISALLOWED`, `NO_MATCHING_NAT64_GATEWAY`, `NO_CONFIGURED_PRIVATE_NAT64_RULE`, `LOAD_BALANCER_BACKEND_IP_VERSION_MISMATCH`, `NO_KNOWN_ROUTE_FROM_NCC_NETWORK_TO_DESTINATION`, `CLOUD_NAT_PROTOCOL_UNSUPPORTED`, `L2_INTERCONNECT_UNSUPPORTED_PROTOCOL`, `L2_INTERCONNECT_UNSUPPORTED_PORT`, `L2_INTERCONNECT_DESTINATION_IP_MISMATCH`, `NCC_ROUTE_WITHIN_HYBRID_SUBNET_UNSUPPORTED`, `HYBRID_SUBNET_REGION_MISMATCH`, `HYBRID_SUBNET_NO_ROUTE`, `GKE_NETWORK_POLICY`, `NO_VALID_ROUTE_FROM_GOOGLE_MANAGED_NETWORK_TO_DESTINATION`, `PRIVATE_CONNECTION_NO_RUNNING_INSTANCE`. |
| `destinationGeolocationCode` | string | Geolocation (region code) of the destination IP address (if relevant). |
| `destinationIp` | string | Destination IP address of the dropped packet (if relevant). |
| `region` | string | Region of the dropped packet (if relevant). |
| `resourceUri` | string | URI of the resource that caused the drop. Format: \* `projects/{project_id}/global/firewalls/{firewall_id}` (firewall rule) \* `projects/{project_id}/global/routes/{route_id}` (route) |
| `sourceGeolocationCode` | string | Geolocation (region code) of the source IP address (if relevant). |
| `sourceIp` | string | Source IP address of the dropped packet (if relevant). |

### `EdgeLocation`

- Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metropolitanArea` | string | Name of the metropolitan area. |

### `EffectiveVpcFlowLogsConfig`

- A configuration to generate a response for GetEffectiveVpcFlowLogsConfig request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationInterval` | string enum | The aggregation interval for the logs. Default value is INTERVAL_5_SEC. Values: `AGGREGATION_INTERVAL_UNSPECIFIED`, `INTERVAL_5_SEC`, `INTERVAL_30_SEC`, `INTERVAL_1_MIN`, `INTERVAL_5_MIN`, `INTERVAL_10_MIN`, `INTERVAL_15_MIN`. |
| `connectionLogging` | string enum | Optional. Configures whether connection logging is enabled for VPC Flow Logs. Values: `CONNECTION_LOGGING_UNSPECIFIED`, `CONNECTION_LOGGING_ENABLED`, `CONNECTION_LOGGING_DISABLED`. |
| `crossProjectMetadata` | string enum | Determines whether to include cross project annotations in the logs. This field is available only for organization configurations. If not specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED. Values: `CROSS_PROJECT_METADATA_UNSPECIFIED`, `CROSS_PROJECT_METADATA_ENABLED`, `CROSS_PROJECT_METADATA_DISABLED`. |
| `filterExpr` | string | Export filter used to define which VPC Flow Logs should be logged. |
| `flowSampling` | number (float) | The value of the field must be in (0, 1\]. The sampling rate of VPC Flow Logs where 1.0 means all collected logs are reported. Setting the sampling rate to 0.0 is not allowed. If you want to disable VPC Flow Logs, use the state field instead. Default value is 1.0. |
| `interconnectAttachment` | string | Traffic will be logged from the Interconnect Attachment. Format: projects/{project_id}/regions/{region}/interconnectAttachments/{name} |
| `metadata` | string enum | Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default value is INCLUDE_ALL_METADATA. Values: `METADATA_UNSPECIFIED`, `INCLUDE_ALL_METADATA`, `EXCLUDE_ALL_METADATA`, `CUSTOM_METADATA`. |
| `metadataFields` | array<string> | Custom metadata fields to include in the reported VPC flow logs. Can only be specified if "metadata" was set to CUSTOM_METADATA. |
| `name` | string | Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For a Compute config, the name will be the path of the subnet: `projects/{project_id}/regions/{region}/subnetworks/{subnet_id}` |
| `network` | string | Traffic will be logged from VMs, VPN tunnels and Interconnect Attachments within the network. Format: projects/{project_id}/global/networks/{name} |
| `scope` | string enum | Specifies the scope of the config (e.g., SUBNET, NETWORK, ORGANIZATION..). Values: `SCOPE_UNSPECIFIED`, `SUBNET`, `COMPUTE_API_SUBNET`, `NETWORK`, `VPN_TUNNEL`, `INTERCONNECT_ATTACHMENT`, `ORGANIZATION`. |
| `state` | string enum | The state of the VPC Flow Log configuration. Default value is ENABLED. When creating a new configuration, it must be enabled. Setting state=DISABLED will pause the log generation for this config. Values: `STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `subnet` | string | Traffic will be logged from VMs within the subnetwork. Format: projects/{project_id}/regions/{region}/subnetworks/{name} |
| `vpnTunnel` | string | Traffic will be logged from the VPN Tunnel. Format: projects/{project_id}/regions/{region}/vpnTunnels/{name} |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Endpoint`

- Source or destination of the Connectivity Test.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appEngineVersion` | AppEngineVersionEndpoint | An App Engine (https://cloud.google.com/appengine) service version (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions). Applicable only to source endpoint. |
| `cloudFunction` | CloudFunctionEndpoint | A Cloud Function (https://cloud.google.com/functions). Applicable only to source endpoint. |
| `cloudRunJob` | string | A Cloud Run (https://cloud.google.com/run) job (https://docs.cloud.google.com/run/docs/reference/rest/v2/projects.locations.jobs#Job) URI. Applicable only to source endpoint. The format is: projects/{project}/locations/{location}/jobs/{job} |
| `cloudRunRevision` | CloudRunRevisionEndpoint | A Cloud Run (https://cloud.google.com/run) revision (https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) Applicable only to source endpoint. |
| `cloudSqlInstance` | string | A Cloud SQL (https://cloud.google.com/sql) instance URI. |
| `datastreamPrivateConnection` | string | A Datastream Private Connection (https://docs.cloud.google.com/datastream/docs/reference/rest/v1/projects.locations.privateConnections) name format: projects/{project}/locations/{location}/privateConnections/{privateConnection}. |
| `dmsPrivateConnection` | string | A DMS Private Connection (https://docs.cloud.google.com/database-migration/docs/reference/rest/v1/projects.locations.privateConnections) name format: projects/{project}/locations/{location}/privateConnections/{privateConnection}. |
| `forwardingRule` | string | A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}` |
| `forwardingRuleTarget` | string enum | Output only. Specifies the type of the target of the forwarding rule. Values: `FORWARDING_RULE_TARGET_UNSPECIFIED`, `INSTANCE`, `LOAD_BALANCER`, `VPN_GATEWAY`, `PSC`. |
| `fqdn` | string | DNS endpoint of Google Kubernetes Engine cluster control plane (https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint. |
| `gkeMasterCluster` | string | A cluster URI for Google Kubernetes Engine cluster control plane (https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). |
| `gkePod` | string | A GKE Pod (https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI. |
| `instance` | string | A Compute Engine instance URI. |
| `ipAddress` | string | The IP address of the endpoint, which can be an external or internal IP. |
| `loadBalancerId` | string | Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers. |
| `loadBalancerType` | string enum | Output only. Type of the load balancer the forwarding rule points to. Values: `LOAD_BALANCER_TYPE_UNSPECIFIED`, `HTTPS_ADVANCED_LOAD_BALANCER`, `HTTPS_LOAD_BALANCER`, `REGIONAL_HTTPS_LOAD_BALANCER`, `INTERNAL_HTTPS_LOAD_BALANCER`, `SSL_PROXY_LOAD_BALANCER`, `TCP_PROXY_LOAD_BALANCER`, `INTERNAL_TCP_PROXY_LOAD_BALANCER`, `NETWORK_LOAD_BALANCER`, `LEGACY_NETWORK_LOAD_BALANCER`, `TCP_UDP_INTERNAL_LOAD_BALANCER`. |
| `network` | string | A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint. |
| `networkType` | string enum | For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints. Values: `NETWORK_TYPE_UNSPECIFIED`, `GCP_NETWORK`, `NON_GCP_NETWORK`, `INTERNET`. |
| `port` | integer (int32) | The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP. |
| `projectId` | string | For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints. |
| `redisCluster` | string | A Redis Cluster (https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint. |
| `redisInstance` | string | A Redis Instance (https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint. |

### `EndpointInfo`

- For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationIp` | string | Destination IP address. |
| `destinationNetworkUri` | string | URI of the network where this packet is sent to. Format: `projects/{project_id}/global/networks/{network_id}` |
| `destinationPort` | integer (int32) | Destination port. Only valid when protocol is TCP or UDP. |
| `protocol` | string | IP protocol in string format, for example: "TCP", "UDP", "ICMP". |
| `sourceAgentUri` | string | URI of the source telemetry agent this packet originates from. |
| `sourceIp` | string | Source IP address. |
| `sourceNetworkUri` | string | URI of the network where this packet originates from. Format: `projects/{project_id}/global/networks/{network_id}` |
| `sourcePort` | integer (int32) | Source port. Only valid when protocol is TCP or UDP. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FirewallInfo`

- For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | Possible values: ALLOW, DENY, APPLY_SECURITY_PROFILE_GROUP |
| `direction` | string | Possible values: INGRESS, EGRESS |
| `displayName` | string | The display name of the firewall rule. This field might be empty for firewall policy rules. |
| `firewallRuleType` | string enum | The firewall rule's type. Values: `FIREWALL_RULE_TYPE_UNSPECIFIED`, `HIERARCHICAL_FIREWALL_POLICY_RULE`, `VPC_FIREWALL_RULE`, `IMPLIED_VPC_FIREWALL_RULE`, `SERVERLESS_VPC_ACCESS_MANAGED_FIREWALL_RULE`, `NETWORK_FIREWALL_POLICY_RULE`, `NETWORK_REGIONAL_FIREWALL_POLICY_RULE`, `SYSTEM_NETWORK_FIREWALL_POLICY_RULE`, `SYSTEM_REGIONAL_NETWORK_FIREWALL_POLICY_RULE`, `UNSUPPORTED_FIREWALL_POLICY_RULE`, `TRACKING_STATE`, `ANALYSIS_SKIPPED`. |
| `networkUri` | string | The URI of the VPC network that the firewall rule is associated with in format "projects/{project}/global/networks/{network}". This field is not applicable to hierarchical firewall policy rules. |
| `policy` | string | The name of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules. |
| `policyPriority` | integer (int32) | The priority of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules. |
| `policyUri` | string | The URI of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules. Format: \* `locations/global/firewallPolicies/{policy_id}` (hierarchical policy) \* `projects/{project_id}/global/firewallPolicies/{policy_id}` (global network firewall policy) \* `projects/{project_id}/regions/{region}/firewallPolicies/{policy_id}` (regional network firewall policy) |
| `priority` | integer (int32) | The priority of the firewall rule. |
| `targetServiceAccounts` | array<string> | The target service accounts specified by the firewall rule. |
| `targetTags` | array<string> | The target tags defined by the VPC firewall rule. This field is not applicable to firewall policy rules. |
| `targetType` | string enum | Target type of the firewall rule. Values: `TARGET_TYPE_UNSPECIFIED`, `INSTANCES`, `INTERNAL_MANAGED_LB`. |
| `uri` | string | The URI of the firewall rule in format "projects/{project}/global/firewalls/{firewall}". This field is not applicable to implied VPC firewall rules. |

### `ForwardInfo`

- Details of the final state "forward" and associated resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | IP address of the target (if applicable). |
| `resourceUri` | string | URI of the resource that the packet is forwarded to. Format: \* `projects/{project_id}/global/networks/{network_id}` (VPC peering network) \* `projects/{project_id}/regions/{region}/vpnGateways/{vpn_gateway_id}` (VPN gateway) |
| `target` | string enum | Target type where this packet is forwarded to. Values: `TARGET_UNSPECIFIED`, `PEERING_VPC`, `VPN_GATEWAY`, `INTERCONNECT`, `GKE_MASTER`, `IMPORTED_CUSTOM_ROUTE_NEXT_HOP`, `CLOUD_SQL_INSTANCE`, `ANOTHER_PROJECT`, `NCC_HUB`, `ROUTER_APPLIANCE`, `SECURE_WEB_PROXY_GATEWAY`. |

### `ForwardingRuleInfo`

- For display only. Metadata associated with a Compute Engine forwarding rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of the forwarding rule. |
| `envoyHealthCheckFirewallsConfigState` | string enum | Output only. State of the firewalls allowing health check traffic to the load balancer frontend (Envoy proxies). This is the result of the firewall configuration analysis verifying that health check traffic from required IP ranges to the the Envoy-based load balancer frontend is allowed by firewall rules with the load balancer target. Values: `HEALTH_CHECK_FIREWALLS_CONFIG_STATE_UNSPECIFIED`, `FIREWALLS_CONFIGURED`, `FIREWALLS_PARTIALLY_CONFIGURED`, `FIREWALLS_NOT_CONFIGURED`, `FIREWALLS_UNSUPPORTED`. |
| `loadBalancerName` | string | Name of the load balancer the forwarding rule belongs to. Empty for forwarding rules not related to load balancers (like PSC forwarding rules). |
| `matchedPortRange` | string | Port range defined in the forwarding rule that matches the packet. |
| `matchedProtocol` | string | Protocol defined in the forwarding rule that matches the packet. |
| `networkUri` | string | URI of a VPC network where the forwarding rule is located in format "projects/{project}/global/networks/{network}". |
| `pscGoogleApiTarget` | string | PSC Google API target this forwarding rule targets (if applicable). |
| `pscServiceAttachmentUri` | string | URI of the PSC service attachment this forwarding rule targets (if applicable) in format "projects/{project}/regions/{region}/serviceAttachments/{service_attachment}". |
| `region` | string | Region of the forwarding rule. Set only for regional forwarding rules. |
| `target` | string | Target type of the forwarding rule. |
| `uri` | string | URI of the forwarding rule in format "projects/{project}/global/forwardingRules/{forwarding_rule}" (global) or "projects/{project}/regions/{region}/forwardingRules/{forwarding_rule}" (regional). |
| `vip` | string | VIP of the forwarding rule. |

### `GKEMasterInfo`

- For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterNetworkUri` | string | URI of the GKE cluster network. Format: `projects/{project_id}/global/networks/{network_id}` |
| `clusterUri` | string | URI of the GKE cluster. Format: \* `projects/{project_id}/locations/{location}/clusters/{cluster_id}` (regional cluster) \* `projects/{project_id}/zones/{zone}/clusters/{cluster_id}` (zonal cluster) |
| `dnsEndpoint` | string | DNS endpoint of a GKE cluster control plane. |
| `externalIp` | string | External IP address of a GKE cluster control plane. |
| `internalIp` | string | Internal IP address of a GKE cluster control plane. |

### `GenerateMonitoringPointConfigResponse`

- Message for response for getting Monitoring Point configuration of a NetworkMonitoringProvider resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `config` | object | The Monitoring Point configuration of the provider in JSON format. |

### `GenerateProviderAccessTokenResponse`

- Message for response for generating an access token for a NetworkMonitoringProvider resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `providerAccessToken` | string | Provider access token for the NetworkMonitoringProvider resource. |

### `GeoLocation`

- The geographical location of the MonitoringPoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `formattedAddress` | string | Formatted address. |
| `regionCode` | string | Unicode CLDR region code. |

### `GkeNetworkPolicyInfo`

- For display only. Metadata associated with a GKE Network Policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | Possible values: ALLOW, DENY |
| `direction` | string | Possible values: INGRESS, EGRESS |
| `displayName` | string | The name of the Network Policy. |
| `uri` | string | The URI of the Network Policy. Format for a Network Policy in a zonal cluster: `projects//zones//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/` Format for a Network Policy in a regional cluster: `projects//locations//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/` |

### `GkeNetworkPolicySkippedInfo`

- For display only. Contains information about why GKE Network Policy evaluation was skipped.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reason` | string enum | Reason why Network Policy evaluation was skipped. Values: `REASON_UNSPECIFIED`, `NETWORK_POLICY_DISABLED`, `INGRESS_SOURCE_ON_SAME_NODE`, `EGRESS_FROM_NODE_NETWORK_NAMESPACE_POD`, `NETWORK_POLICY_NOT_APPLIED_TO_RESPONSE_TRAFFIC`, `NETWORK_POLICY_ANALYSIS_UNSUPPORTED`. |

### `GkePodInfo`

- For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | IP address of a GKE Pod. If the Pod is dual-stack, this is the IP address relevant to the trace. |
| `networkUri` | string | URI of the network containing the GKE Pod. Format: `projects/{project_id}/global/networks/{network_id}` |
| `podUri` | string | URI of a GKE Pod. For Pods in regional Clusters, the URI format is: `projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` For Pods in zonal Clusters, the URI format is: `projects/{project}/zones/{zone}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` |

### `GoogleServiceInfo`

- For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googleServiceType` | string enum | Recognized type of a Google Service. Values: `GOOGLE_SERVICE_TYPE_UNSPECIFIED`, `IAP`, `GFE_PROXY_OR_HEALTH_CHECK_PROBER`, `CLOUD_DNS`, `GOOGLE_API`, `GOOGLE_API_PSC`, `GOOGLE_API_VPC_SC`, `SERVERLESS_VPC_ACCESS`. |
| `sourceIp` | string | Source IP address. |

### `Host`

- Message describing information about the host.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudInstanceId` | string | Output only. The cloud instance id of the host. |
| `cloudProjectId` | string | Output only. The cloud project id of the host. |
| `cloudProvider` | string | Output only. The cloud provider of the host. |
| `cloudRegion` | string | Output only. The cloud region of the host. |
| `cloudVirtualNetworkIds` | array<string> | Output only. The ids of cloud virtual networks of the host. |
| `cloudZone` | string | Output only. The cloud zone of the host. |
| `os` | string | Output only. The operating system of the host. |

### `HttpBody`

- Message that represents an arbitrary HTTP body. It should only be used for payload formats that can't be represented as JSON, such as raw binary or an HTML page. This message can be used both in streaming and non-streaming API methods in the request as well as the response. It can be used as a top-level request field, which is convenient if one wants to extract parameters from either the URL or HTTP template into the request fields and also want access to the raw HTTP body. Example: message GetResourceRequest { // A unique request id. string request_id = 1; // The raw HTTP body is bound to this field. google.api.HttpBody http_body = 2; } service ResourceService { rpc GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); } Example with streaming methods: service CaldavService { rpc GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); rpc UpdateCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); } Use of this type only changes how the request and response bodies are handled, all other features will continue to work unchanged.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contentType` | string | The HTTP Content-Type header value specifying the content type of the body. |
| `data` | string (byte) | The HTTP request/response body as raw binary. |
| `extensions` | array<object> | Application specific response metadata. Must be set in the first response for streaming APIs. |

### `HybridSubnetInfo`

- For display only. Metadata associated with a hybrid subnet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a hybrid subnet. |
| `region` | string | Name of a Google Cloud region where the hybrid subnet is configured. |
| `uri` | string | URI of the hybrid subnet. Format: `projects/{project_id}/regions/{region}/subnetworks/{subnetwork_id}` |

### `InstanceInfo`

- For display only. Metadata associated with a Compute Engine instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Compute Engine instance. |
| `externalIp` | string | External IP address of the network interface. |
| `interface` | string | Name of the network interface of a Compute Engine instance. |
| `internalIp` | string | Internal IP address of the network interface. |
| `networkTags` | array<string> | Network tags configured on the instance. |
| `networkUri` | string | URI of a Compute Engine network in format "projects/{project}/global/networks/{network}" |
| `pscNetworkAttachmentUri` | string | URI of the PSC network attachment the NIC is attached to (if relevant) in format "projects/{project}/regions/{region}/networkAttachments/{network_attachment}" |
| `running` | boolean | Indicates whether the Compute Engine instance is running. Deprecated: use the `status` field instead. |
| `serviceAccount` | string | Service account authorized for the instance. |
| `status` | string enum | The status of the instance. Values: `STATUS_UNSPECIFIED`, `RUNNING`, `NOT_RUNNING`. |
| `uri` | string | URI of a Compute Engine instance in format "projects/{project}/zones/{zone}/instances/{instance}" |

### `InterconnectAttachmentInfo`

- For display only. Metadata associated with an Interconnect attachment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudRouterUri` | string | URI of the Cloud Router to be used for dynamic routing. Format: `projects/{project_id}/regions/{region}/routers/{router_id}` |
| `displayName` | string | Name of an Interconnect attachment. |
| `interconnectUri` | string | URI of the Interconnect. Format: `projects/{project_id}/global/interconnects/{interconnect_id}` |
| `l2AttachmentMatchedIpAddress` | string | Appliance IP address that was matched for L2_DEDICATED attachments. |
| `region` | string | Name of a Google Cloud region where the Interconnect attachment is configured. |
| `type` | string enum | The type of interconnect attachment this is. Values: `TYPE_UNSPECIFIED`, `DEDICATED`, `PARTNER`, `PARTNER_PROVIDER`, `L2_DEDICATED`. |
| `uri` | string | URI of the Interconnect attachment. Format: `projects/{project_id}/regions/{region}/interconnectAttachments/{attachment_id}` |

### `IpMasqueradingSkippedInfo`

- For display only. Contains information about why IP masquerading was skipped for the packet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nonMasqueradeRange` | string | The matched non-masquerade IP range. Only set if reason is DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE or DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE. |
| `reason` | string enum | Reason why IP masquerading was not applied. Values: `REASON_UNSPECIFIED`, `DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE`, `DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE`, `DESTINATION_ON_SAME_NODE`, `DEFAULT_SNAT_DISABLED`, `NO_MASQUERADING_FOR_IPV6`, `POD_USES_NODE_NETWORK_NAMESPACE`, `NO_MASQUERADING_FOR_RETURN_PACKET`. |

### `LatencyDistribution`

- Describes measured latency distribution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latencyPercentiles` | array<LatencyPercentile> | Representative latency percentiles. |

### `LatencyPercentile`

- Latency percentile rank and value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latencyMicros` | string (int64) | percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field. |
| `percent` | integer (int32) | Percentage of samples this data point applies to. |

### `ListConnectivityTestsResponse`

- Response for the `ListConnectivityTests` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Page token to fetch the next set of Connectivity Tests. |
| `resources` | array<ConnectivityTest> | List of Connectivity Tests. |
| `unreachable` | array<string> | Locations that could not be reached (when querying all locations with `-`). |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMonitoringPointsResponse`

- Message for response to listing MonitoringPoints
- Version: v1

| Field | Type | Description |
|---|---|---|
| `monitoringPoints` | array<MonitoringPoint> | The list of MonitoringPoints. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListNetworkMonitoringProvidersResponse`

- Message for response to listing NetworkMonitoringProviders
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkMonitoringProviders` | array<NetworkMonitoringProvider> | The list of NetworkMonitoringProvider |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListNetworkPathsResponse`

- Message for response to listing NetworkPaths
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkPaths` | array<NetworkPath> | The list of NetworkPath |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListVpcFlowLogsConfigsResponse`

- Response for the `ListVpcFlowLogsConfigs` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Page token to fetch the next set of configurations. |
| `unreachable` | array<string> | Locations that could not be reached (when querying all locations with `-`). |
| `vpcFlowLogsConfigs` | array<VpcFlowLogsConfig> | List of VPC Flow Log configurations. |

### `ListWebPathsResponse`

- Message for response to listing WebPaths
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `webPaths` | array<WebPath> | The list of WebPath. |

### `LoadBalancerBackend`

- For display only. Metadata associated with a specific load balancer backend.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Compute Engine instance or network endpoint. |
| `healthCheckAllowingFirewallRules` | array<string> | A list of firewall rule URIs allowing probes from health check IP ranges. |
| `healthCheckBlockingFirewallRules` | array<string> | A list of firewall rule URIs blocking probes from health check IP ranges. |
| `healthCheckFirewallState` | string enum | State of the health check firewall configuration. Values: `HEALTH_CHECK_FIREWALL_STATE_UNSPECIFIED`, `CONFIGURED`, `MISCONFIGURED`. |
| `uri` | string | URI of the backend instance or network endpoint. Format: \* `projects/{project_id}/zones/{zone}/instances/{instance_id}` (instance) \* `projects/{project_id}/zones/{zone}/networkEndpointGroups/{neg_id}` (zonal NEG) \* `projects/{project_id}/regions/{region}/networkEndpointGroups/{neg_id}` (regional NEG) \* `projects/{project_id}/global/networkEndpointGroups/{neg_id}` (global NEG) |

### `LoadBalancerBackendInfo`

- For display only. Metadata associated with the load balancer backend.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendBucketUri` | string | URI of the backend bucket this backend targets (if applicable) in format "projects/{project}/global/backendBuckets/{backend_bucket}". |
| `backendServiceUri` | string | URI of the backend service this backend belongs to (if applicable) in format "projects/{project}/regions/{region}/backendServices/{backend_service}" (regional) or "projects/{project}/global/backendServices/{backend_service}" (global). |
| `healthCheckFirewallsConfigState` | string enum | Output only. Health check firewalls configuration state for the backend. This is a result of the static firewall analysis (verifying that health check traffic from required IP ranges to the backend is allowed or not). The backend might still be unhealthy even if these firewalls are configured. Please refer to the documentation for more information: https://cloud.google.com/load-balancing/docs/firewall-rules Values: `HEALTH_CHECK_FIREWALLS_CONFIG_STATE_UNSPECIFIED`, `FIREWALLS_CONFIGURED`, `FIREWALLS_PARTIALLY_CONFIGURED`, `FIREWALLS_NOT_CONFIGURED`, `FIREWALLS_UNSUPPORTED`. |
| `healthCheckUri` | string | URI of the health check attached to this backend (if applicable). Format: \* `projects/{project_id}/global/healthChecks/{health_check_id}` \* `projects/{project_id}/regions/{region}/healthChecks/{health_check_id}` \* `projects/{project_id}/global/httpHealthChecks/{health_check_id}` (legacy) |
| `instanceGroupUri` | string | URI of the instance group this backend belongs to (if applicable) in format "projects/{project}/zones/{zone}/instanceGroups/{instance_group}". |
| `instanceUri` | string | URI of the backend instance (if applicable) in format "projects/{project}/zones/{zone}/instances/{instance}". Populated for instance group backends, and zonal NEG backends. |
| `name` | string | Display name of the backend. For example, it might be an instance name for the instance group backends, or an IP address and port for zonal network endpoint group backends. |
| `networkEndpointGroupUri` | string | URI of the network endpoint group this backend belongs to (if applicable) Format: \* `projects/{project_id}/zones/{zone}/networkEndpointGroups/{neg_id}` (zonal NEG) \* `projects/{project_id}/regions/{region}/networkEndpointGroups/{neg_id}` (regional NEG) \* `projects/{project_id}/global/networkEndpointGroups/{neg_id}` (global NEG) |
| `pscGoogleApiTarget` | string | PSC Google API target this PSC NEG backend targets (if applicable). |
| `pscServiceAttachmentUri` | string | URI of the PSC service attachment this PSC NEG backend targets (if applicable) in format "projects/{project}/regions/{region}/serviceAttachments/{service_attachment}". |

### `LoadBalancerInfo`

- For display only. Metadata associated with a load balancer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendType` | string enum | Type of load balancer's backend configuration. Values: `BACKEND_TYPE_UNSPECIFIED`, `BACKEND_SERVICE`, `TARGET_POOL`, `TARGET_INSTANCE`. |
| `backendUri` | string | URI of the backend associated with the load balancer. Format: \* `projects/{project_id}/regions/{region}/backendServices/{backend_service_id}` \* `projects/{project_id}/global/backendServices/{backend_service_id}` \* `projects/{project_id}/regions/{region}/targetPools/{target_pool_id}` \* `projects/{project_id}/zones/{zone}/targetInstances/{target_instance_id}` |
| `backends` | array<LoadBalancerBackend> | Information for the loadbalancer backends. |
| `healthCheckUri` | string | URI of the health check for the load balancer. Deprecated and no longer populated as different load balancer backends might have different health checks. |
| `loadBalancerType` | string enum | Type of the load balancer. Values: `LOAD_BALANCER_TYPE_UNSPECIFIED`, `INTERNAL_TCP_UDP`, `NETWORK_TCP_UDP`, `HTTP_PROXY`, `TCP_PROXY`, `SSL_PROXY`. |

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

### `MonitoringPoint`

- Message describing MonitoringPoint resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoGeoLocationEnabled` | boolean | Output only. Indicates if automaitic geographic location is enabled for the MonitoringPoint. |
| `connectionStatus` | string enum | Output only. Connection status of the MonitoringPoint. Values: `CONNECTION_STATUS_UNSPECIFIED`, `ONLINE`, `OFFLINE`. |
| `createTime` | string (google-datetime) | Output only. The time the MonitoringPoint was created. |
| `deploymentType` | string enum | Output only. The deployment type of the MonitoringPoint. Values: `DEPLOYMENT_TYPE_UNSPECIFIED`, `DOCKER`, `PODMAN`, `HELM`. |
| `displayName` | string | Output only. Display name of the MonitoringPoint. |
| `errors` | array<string> | Output only. The codes of errors detected in the MonitoringPoint. Values: `ERROR_CODE_UNSPECIFIED`, `NTP_ERROR`, `UPGRADE_ERROR`, `DOWNLOAD_FAILED`. |
| `geoLocation` | GeoLocation | Output only. The geographical location of the MonitoringPoint. |
| `guid` | string | Output only. The GUID of the MonitoringPoint. |
| `host` | Host | Output only. The host information of the MonitoringPoint. |
| `hostname` | string | Output only. The hostname of the MonitoringPoint. |
| `name` | string | Identifier. Name of the resource. Format: `projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/monitoringPoints/{monitoring_point}` |
| `networkInterfaces` | array<NetworkInterface> | Output only. The network interfaces of the MonitoringPoint. |
| `originatingIp` | string | Output only. IP address visible when MonitoringPoint connects to the provider. |
| `providerTags` | array<ProviderTag> | Output only. The provider tags of the MonitoringPoint. |
| `type` | string | Output only. Deployment type of the MonitoringPoint. |
| `updateTime` | string (google-datetime) | Output only. The time the MonitoringPoint was updated. |
| `upgradeAvailable` | boolean | Output only. Indicates if an upgrade is available for the MonitoringPoint. |
| `upgradeType` | string enum | Output only. The type of upgrade available for the MonitoringPoint. Values: `UPGRADE_TYPE_UNSPECIFIED`, `MANUAL`, `MANAGED`, `SCHEDULED`, `AUTO`, `EXTERNAL`. |
| `version` | string | Output only. Version of the software running on the MonitoringPoint. |

### `NatInfo`

- For display only. Metadata associated with NAT.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudNatGatewayType` | string enum | Type of Cloud NAT gateway. Only valid when `type` is CLOUD_NAT. Values: `CLOUD_NAT_GATEWAY_TYPE_UNSPECIFIED`, `PUBLIC_NAT44`, `PUBLIC_NAT64`, `PRIVATE_NAT_NCC`, `PRIVATE_NAT_HYBRID`, `PRIVATE_NAT64`. |
| `natGatewayName` | string | The name of Cloud NAT Gateway. Only valid when type is CLOUD_NAT. |
| `networkUri` | string | URI of the VPC network where NAT translation takes place. Format: `projects/{project_id}/global/networks/{network_id}` |
| `newDestinationIp` | string | Destination IP address after NAT translation. |
| `newDestinationPort` | integer (int32) | Destination port after NAT translation. Only valid when protocol is TCP or UDP. |
| `newSourceIp` | string | Source IP address after NAT translation. |
| `newSourcePort` | integer (int32) | Source port after NAT translation. Only valid when protocol is TCP or UDP. |
| `oldDestinationIp` | string | Destination IP address before NAT translation. |
| `oldDestinationPort` | integer (int32) | Destination port before NAT translation. Only valid when protocol is TCP or UDP. |
| `oldSourceIp` | string | Source IP address before NAT translation. |
| `oldSourcePort` | integer (int32) | Source port before NAT translation. Only valid when protocol is TCP or UDP. |
| `protocol` | string | IP protocol in string format, for example: "TCP", "UDP", "ICMP". |
| `routerUri` | string | URI of the Cloud Router. Only valid when type is CLOUD_NAT. Format: `projects/{project_id}/regions/{region}/routers/{router_id}` |
| `ruleNumber` | integer (int32) | The number of the NAT rule that was matched. Only valid when `type` is CLOUD_NAT. |
| `type` | string enum | Type of NAT. Values: `TYPE_UNSPECIFIED`, `INTERNAL_TO_EXTERNAL`, `EXTERNAL_TO_INTERNAL`, `CLOUD_NAT`, `PRIVATE_SERVICE_CONNECT`, `GKE_POD_IP_MASQUERADING`. |

### `NetworkInfo`

- For display only. Metadata associated with a Compute Engine network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Compute Engine network. |
| `matchedIpRange` | string | The IP range of the subnet matching the source IP address of the test. |
| `matchedSubnetUri` | string | URI of the subnet matching the source IP address of the test in format "projects/{project}/regions/{region}/subnetworks/{subnetwork}" |
| `region` | string | The region of the subnet matching the source IP address of the test. |
| `uri` | string | URI of a Compute Engine network in format "projects/{project}/global/networks/{network}" |

### `NetworkInterface`

- Message describing network interfaces.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adapterDescription` | string | Output only. The description of the interface. |
| `cidr` | string | Output only. The IP address of the interface and subnet mask in CIDR format. Examples: 192.168.1.0/24, 2001:db8::/32 |
| `interfaceName` | string | Output only. The name of the network interface. Examples: eth0, eno1 |
| `ipAddress` | string | Output only. The IP address of the interface. |
| `macAddress` | string | Output only. The MAC address of the interface. |
| `speed` | string (int64) | Output only. Speed of the interface in millions of bits per second. |
| `vlanId` | string (int64) | Output only. The id of the VLAN. |

### `NetworkMonitoringProvider`

- Message describing NetworkMonitoringProvider resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the NetworkMonitoringProvider was created. |
| `errors` | array<string> | Output only. The list of error messages detected for the NetworkMonitoringProvider. |
| `name` | string | Output only. Identifier. Name of the resource. Format: `projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}` |
| `providerType` | string enum | Required. Type of the NetworkMonitoringProvider. Values: `PROVIDER_TYPE_UNSPECIFIED`, `EXTERNAL`. |
| `providerUri` | string | Output only. Link to the provider's UI. |
| `state` | string enum | Output only. State of the NetworkMonitoringProvider. Values: `STATE_UNSPECIFIED`, `ACTIVATING`, `ACTIVE`, `SUSPENDING`, `SUSPENDED`, `DELETING`, `DELETED`. |
| `updateTime` | string (google-datetime) | Output only. The time the NetworkMonitoringProvider was updated. |

### `NetworkPath`

- Message describing NetworkPath resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the NetworkPath was created. |
| `destination` | string | Output only. IP address or hostname of the network path destination. |
| `destinationGeoLocation` | GeoLocation | Output only. Geographical location of the destination MonitoringPoint. |
| `destinationMonitoringPointId` | string | Output only. Provider's UUID of the destination MonitoringPoint. This id may not point to a resource in the Google Cloud. |
| `displayName` | string | Output only. The display name of the network path. |
| `dualEnded` | boolean | Output only. Indicates if the network path is dual ended. When true, the network path is measured both: from both source to destination, and from destination to source. When false, the network path is measured from the source through the destination back to the source (round trip measurement). |
| `monitoringEnabled` | boolean | Output only. Is monitoring enabled for the network path. |
| `monitoringPolicyDisplayName` | string | Output only. Display name of the monitoring policy. |
| `monitoringPolicyId` | string | Output only. ID of monitoring policy. |
| `monitoringStatus` | string enum | Output only. The monitoring status of the network path. Values: `MONITORING_STATUS_UNSPECIFIED`, `MONITORING`, `POLICY_MISMATCH`, `MONITORING_POINT_OFFLINE`, `DISABLED`. |
| `name` | string | Identifier. Name of the resource. Format: `projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/networkPaths/{network_path}` |
| `networkProtocol` | string enum | Output only. The network protocol of the network path. Values: `NETWORK_PROTOCOL_UNSPECIFIED`, `ICMP`, `UDP`, `TCP`. |
| `providerTags` | array<ProviderTag> | Output only. The provider tags of the network path. |
| `providerUiUri` | string | Output only. Link to provider's UI; link shows the NetworkPath. |
| `sourceMonitoringPointId` | string | Output only. Provider's UUID of the source MonitoringPoint. This id may not point to a resource in the Google Cloud. |
| `updateTime` | string (google-datetime) | Output only. The time the NetworkPath was updated. |

### `NgfwPacketInspectionInfo`

- For display only. Metadata associated with a layer 7 packet inspection by the firewall.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `securityProfileGroupUri` | string | URI of the security profile group associated with this firewall packet inspection. Format: `organizations/{organization_id}/locations/global/securityProfileGroups/{security_profile_group_id}` |

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

- Metadata describing an Operation
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | API version. |
| `cancelRequested` | boolean | Specifies if cancellation was requested for the operation. |
| `createTime` | string (google-datetime) | The time the operation was created. |
| `endTime` | string (google-datetime) | The time the operation finished running. |
| `statusDetail` | string | Human-readable status of the operation, if any. |
| `target` | string | Target of the operation - for example projects/project-1/locations/global/connectivityTests/test-1 |
| `verb` | string | Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PrivateConnectionInfo`

- For display only. Metadata associated with a Private Connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | URI of the Private Connection in format "projects/{project_id}/locations/{location}/privateConnections/{private_connection_id}" |

### `ProbingDetails`

- Results of active probing from the last run of the test.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abortCause` | string enum | The reason probing was aborted. Values: `PROBING_ABORT_CAUSE_UNSPECIFIED`, `PERMISSION_DENIED`, `NO_SOURCE_LOCATION`. |
| `destinationEgressLocation` | EdgeLocation | The EdgeLocation from which a packet, destined to the internet, will egress the Google network. This will only be populated for a connectivity test which has an internet destination address. The absence of this field \*must not\* be used as an indication that the destination is part of the Google network. |
| `edgeResponses` | array<SingleEdgeResponse> | Probing results for all edge devices. |
| `endpointInfo` | EndpointInfo | The source and destination endpoints derived from the test input and used for active probing. |
| `error` | Status | Details about an internal failure or the cancellation of active probing. |
| `probedAllDevices` | boolean | Whether all relevant edge devices were probed. |
| `probingLatency` | LatencyDistribution | Latency as measured by active probing in one direction: from the source to the destination endpoint. |
| `result` | string enum | The overall result of active probing. Values: `PROBING_RESULT_UNSPECIFIED`, `REACHABLE`, `UNREACHABLE`, `REACHABILITY_INCONSISTENT`, `UNDETERMINED`. |
| `sentProbeCount` | integer (int32) | Number of probes sent. |
| `successfulProbeCount` | integer (int32) | Number of probes that reached the destination. |
| `verifyTime` | string (google-datetime) | The time that reachability was assessed through active probing. |

### `ProviderTag`

- Message describing the provider tag.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string | Output only. The category of the provider tag. |
| `resourceType` | string enum | Output only. The resource type of the provider tag. Values: `RESOURCE_TYPE_UNSPECIFIED`, `NETWORK_PATH`, `WEB_PATH`, `MONITORING_POLICY`, `MONITORING_POINT`, `MONITORING_POINT_RULE`, `MONITORING_POINT_RULE_AUTO`. |
| `value` | string | Output only. The value of the provider tag. |

### `ProxyConnectionInfo`

- For display only. Metadata associated with ProxyConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkUri` | string | URI of the VPC network where connection is proxied. Format: `projects/{project_id}/global/networks/{network_id}` |
| `newDestinationIp` | string | Destination IP address of a new connection. |
| `newDestinationPort` | integer (int32) | Destination port of a new connection. Only valid when protocol is TCP or UDP. |
| `newSourceIp` | string | Source IP address of a new connection. |
| `newSourcePort` | integer (int32) | Source port of a new connection. Only valid when protocol is TCP or UDP. |
| `oldDestinationIp` | string | Destination IP address of an original connection |
| `oldDestinationPort` | integer (int32) | Destination port of an original connection. Only valid when protocol is TCP or UDP. |
| `oldSourceIp` | string | Source IP address of an original connection. |
| `oldSourcePort` | integer (int32) | Source port of an original connection. Only valid when protocol is TCP or UDP. |
| `protocol` | string | IP protocol in string format, for example: "TCP", "UDP", "ICMP". |
| `subnetUri` | string | URI of the proxy subnet. Format: `projects/{project_id}/regions/{region}/subnetworks/{subnetwork_id}` |

### `QueryOrgVpcFlowLogsConfigsResponse`

- Response for the `QueryVpcFlowLogsConfigs` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Page token to fetch the next set of configurations. |
| `unreachable` | array<string> | Locations that could not be reached (when querying all locations with `-`). |
| `vpcFlowLogsConfigs` | array<VpcFlowLogsConfig> | List of VPC Flow Log configurations. |

### `ReachabilityDetails`

- Results of the configuration analysis from the last run of the test.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | Status | The details of a failure or a cancellation of reachability analysis. |
| `result` | string enum | The overall result of the test's configuration analysis. Values: `RESULT_UNSPECIFIED`, `REACHABLE`, `UNREACHABLE`, `AMBIGUOUS`, `UNDETERMINED`. |
| `traces` | array<Trace> | Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends. |
| `verifyTime` | string (google-datetime) | The time of the configuration analysis. |

### `RedisClusterInfo`

- For display only. Metadata associated with a Redis Cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discoveryEndpointIpAddress` | string | Discovery endpoint IP address of a Redis Cluster. |
| `displayName` | string | Name of a Redis Cluster. |
| `location` | string | Name of the region in which the Redis Cluster is defined. For example, "us-central1". |
| `networkUri` | string | URI of the network containing the Redis Cluster endpoints in format "projects/{project_id}/global/networks/{network_id}". |
| `secondaryEndpointIpAddress` | string | Secondary endpoint IP address of a Redis Cluster. |
| `uri` | string | URI of a Redis Cluster in format "projects/{project_id}/locations/{location}/clusters/{cluster_id}" |

### `RedisInstanceInfo`

- For display only. Metadata associated with a Cloud Redis Instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a Cloud Redis Instance. |
| `networkUri` | string | URI of a Cloud Redis Instance network in format "projects/{project}/global/networks/{network}". |
| `primaryEndpointIp` | string | Primary endpoint IP address of a Cloud Redis Instance. |
| `readEndpointIp` | string | Read endpoint IP address of a Cloud Redis Instance (if applicable). |
| `region` | string | Region in which the Cloud Redis Instance is defined. |
| `uri` | string | URI of a Cloud Redis Instance in format "projects/{project}/locations/{location}/instances/{instance}" |

### `RerunConnectivityTestRequest`

- Request for the `RerunConnectivityTest` method.
- Version: v1

### `RouteInfo`

- For display only. Metadata associated with a Compute Engine route.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advertisedRouteNextHopUri` | string | For ADVERTISED routes, the URI of their next hop, i.e. the URI of the hybrid endpoint (VPN tunnel, Interconnect attachment, NCC router appliance) the advertised prefix is advertised through, or URI of the source peered network. Deprecated in favor of the next_hop_uri field, not used in new tests. |
| `advertisedRouteSourceRouterUri` | string | For ADVERTISED dynamic routes, the URI of the Cloud Router that advertised the corresponding IP prefix in format "projects/{project}/regions/{region}/routers/{router}". |
| `destIpRange` | string | Destination IP range of the route. |
| `destPortRanges` | array<string> | Destination port ranges of the route. POLICY_BASED routes only. |
| `displayName` | string | Name of a route. |
| `instanceTags` | array<string> | Instance tags of the route. |
| `nccHubRouteUri` | string | For PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub, the URI of the corresponding route in NCC Hub's routing table. Format: `projects/{project_id}/locations/global/hubs/{hub_id}/routeTables/{route_table_id}/routes/{route_id}` |
| `nccHubUri` | string | URI of the NCC Hub the route is advertised by in format "projects/{project}/locations/global/hubs/{hub}". PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only. |
| `nccSpokeUri` | string | URI of the destination NCC Spoke in format "projects/{project}/locations/{location}/spokes/{spoke}" (regional) or "projects/{project}/locations/global/spokes/{spoke}" (global). PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only. |
| `networkUri` | string | URI of a VPC network where route is located in format "projects/{project}/global/networks/{network}". |
| `nextHop` | string | String type of the next hop of the route (for example, "VPN tunnel"). Deprecated in favor of the next_hop_type and next_hop_uri fields, not used in new tests. |
| `nextHopNetworkUri` | string | URI of a VPC network where the next hop resource is located in format "projects/{project}/global/networks/{network}". |
| `nextHopType` | string enum | Type of next hop. Values: `NEXT_HOP_TYPE_UNSPECIFIED`, `NEXT_HOP_IP`, `NEXT_HOP_INSTANCE`, `NEXT_HOP_NETWORK`, `NEXT_HOP_PEERING`, `NEXT_HOP_INTERCONNECT`, `NEXT_HOP_VPN_TUNNEL`, `NEXT_HOP_VPN_GATEWAY`, `NEXT_HOP_INTERNET_GATEWAY`, `NEXT_HOP_BLACKHOLE`, `NEXT_HOP_ILB`, `NEXT_HOP_ROUTER_APPLIANCE`, `NEXT_HOP_NCC_HUB`, `SECURE_WEB_PROXY_GATEWAY`. |
| `nextHopUri` | string | URI of the next hop resource. |
| `originatingRouteDisplayName` | string | For PEERING_SUBNET, PEERING_STATIC and PEERING_DYNAMIC routes, the name of the originating SUBNET/STATIC/DYNAMIC route. |
| `originatingRouteUri` | string | For PEERING_SUBNET and PEERING_STATIC routes, the URI of the originating SUBNET/STATIC route. Format: `projects/{project_id}/global/routes/{route_id}` |
| `priority` | integer (int32) | Priority of the route. |
| `protocols` | array<string> | Protocols of the route. POLICY_BASED routes only. |
| `region` | string | Region of the route. DYNAMIC, PEERING_DYNAMIC, POLICY_BASED and ADVERTISED routes only. If set for POLICY_BASED route, this is a region of VLAN attachments for Cloud Interconnect the route applies to. If set to "all" for POLICY_BASED route, the route applies to VLAN attachments of Cloud Interconnect in all regions. |
| `routeScope` | string enum | Indicates where route is applicable. Deprecated, routes with NCC_HUB scope are not included in the trace in new tests. Values: `ROUTE_SCOPE_UNSPECIFIED`, `NETWORK`, `NCC_HUB`. |
| `routeType` | string enum | Type of route. Values: `ROUTE_TYPE_UNSPECIFIED`, `SUBNET`, `STATIC`, `DYNAMIC`, `PEERING_SUBNET`, `PEERING_STATIC`, `PEERING_DYNAMIC`, `POLICY_BASED`, `ADVERTISED`. |
| `srcIpRange` | string | Source IP address range of the route. POLICY_BASED routes only. |
| `srcPortRanges` | array<string> | Source port ranges of the route. POLICY_BASED routes only. |
| `uri` | string | URI of a route in format "projects/{project}/global/routes/{route}". SUBNET, STATIC, PEERING_SUBNET (only for peering network) and POLICY_BASED routes only. |

### `ServerlessExternalConnectionInfo`

- For display only. Metadata associated with a serverless public connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `selectedIpAddress` | string | Selected starting IP address, from the Google dynamic address pool. |

### `ServerlessNegInfo`

- For display only. Metadata associated with the serverless network endpoint group backend.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `negUri` | string | URI of the serverless network endpoint group in format "projects/{project}/regions/{region}/networkEndpointGroups/{network_endpoint_group}". |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `ShowEffectiveFlowLogsConfigsResponse`

- Response for the `ShowEffectiveFlowLogsConfigs` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectiveFlowLogsConfigs` | array<EffectiveVpcFlowLogsConfig> | List of Effective Vpc Flow Logs configurations. |
| `nextPageToken` | string | Page token to fetch the next set of configurations. |
| `unreachable` | array<string> | Locations that could not be reached (when querying all locations with `-`). |

### `SingleEdgeResponse`

- Probing results for a single edge device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationEgressLocation` | EdgeLocation | The EdgeLocation from which a packet, destined to the internet, will egress the Google network. This will only be populated for a connectivity test which has an internet destination address. The absence of this field \*must not\* be used as an indication that the destination is part of the Google network. |
| `destinationRouter` | string | Router name in the format '{router}.{metroshard}'. For example: pf01.aaa01, pr02.aaa01. |
| `probingLatency` | LatencyDistribution | Latency as measured by active probing in one direction: from the source to the destination endpoint. |
| `result` | string enum | The overall result of active probing for this egress device. Values: `PROBING_RESULT_UNSPECIFIED`, `REACHABLE`, `UNREACHABLE`, `REACHABILITY_INCONSISTENT`, `UNDETERMINED`. |
| `sentProbeCount` | integer (int32) | Number of probes sent. |
| `successfulProbeCount` | integer (int32) | Number of probes that reached the destination. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Step`

- A simulated forwarding path is composed of multiple steps. Each step has a well-defined state and an associated configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abort` | AbortInfo | Display information of the final state "abort" and reason. |
| `appEngineVersion` | AppEngineVersionInfo | Display information of an App Engine service version. |
| `causesDrop` | boolean | This is a step that leads to the final state Drop. |
| `cloudFunction` | CloudFunctionInfo | Display information of a Cloud Function. |
| `cloudRunJob` | CloudRunJobInfo | Display information of a Cloud Run job. |
| `cloudRunRevision` | CloudRunRevisionInfo | Display information of a Cloud Run revision. |
| `cloudSqlInstance` | CloudSQLInstanceInfo | Display information of a Cloud SQL instance. |
| `datastreamPrivateConnection` | PrivateConnectionInfo | Display information of a Datastream Private Connection. |
| `deliver` | DeliverInfo | Display information of the final state "deliver" and reason. |
| `description` | string | A description of the step. Usually this is a summary of the state. |
| `directVpcEgressConnection` | DirectVpcEgressConnectionInfo | Display information of a serverless direct VPC egress connection. |
| `dmsPrivateConnection` | PrivateConnectionInfo | Display information of a DMS Private Connection. |
| `drop` | DropInfo | Display information of the final state "drop" and reason. |
| `endpoint` | EndpointInfo | Display information of the source and destination under analysis. The endpoint information in an intermediate state may differ with the initial input, as it might be modified by state like NAT, or Connection Proxy. |
| `firewall` | FirewallInfo | Display information of a Compute Engine firewall rule. |
| `forward` | ForwardInfo | Display information of the final state "forward" and reason. |
| `forwardingRule` | ForwardingRuleInfo | Display information of a Compute Engine forwarding rule. |
| `gkeMaster` | GKEMasterInfo | Display information of a Google Kubernetes Engine cluster master. |
| `gkeNetworkPolicy` | GkeNetworkPolicyInfo | Display information of a GKE Network Policy. |
| `gkeNetworkPolicySkipped` | GkeNetworkPolicySkippedInfo | Display information of the reason why GKE Network Policy evaluation was skipped. |
| `gkePod` | GkePodInfo | Display information of a Google Kubernetes Engine Pod. |
| `googleService` | GoogleServiceInfo | Display information of a Google service |
| `hybridSubnet` | HybridSubnetInfo | Display information of a hybrid subnet. |
| `instance` | InstanceInfo | Display information of a Compute Engine instance. |
| `interconnectAttachment` | InterconnectAttachmentInfo | Display information of an interconnect attachment. |
| `ipMasqueradingSkipped` | IpMasqueradingSkippedInfo | Display information of the reason why GKE Pod IP masquerading was skipped. |
| `loadBalancer` | LoadBalancerInfo | Display information of the load balancers. Deprecated in favor of the `load_balancer_backend_info` field, not used in new tests. |
| `loadBalancerBackendInfo` | LoadBalancerBackendInfo | Display information of a specific load balancer backend. |
| `nat` | NatInfo | Display information of a NAT. |
| `network` | NetworkInfo | Display information of a Google Cloud network. |
| `ngfwPacketInspection` | NgfwPacketInspectionInfo | Display information of a layer 7 packet inspection by the firewall. |
| `projectId` | string | Project ID that contains the configuration this step is validating. |
| `proxyConnection` | ProxyConnectionInfo | Display information of a ProxyConnection. |
| `redisCluster` | RedisClusterInfo | Display information of a Redis Cluster. |
| `redisInstance` | RedisInstanceInfo | Display information of a Redis Instance. |
| `route` | RouteInfo | Display information of a Compute Engine route. |
| `serverlessExternalConnection` | ServerlessExternalConnectionInfo | Display information of a serverless public (external) connection. |
| `serverlessNeg` | ServerlessNegInfo | Display information of a Serverless network endpoint group backend. Used only for return traces. |
| `state` | string enum | Each step is in one of the pre-defined states. Values: `STATE_UNSPECIFIED`, `START_FROM_INSTANCE`, `START_FROM_INTERNET`, `START_FROM_GOOGLE_SERVICE`, `START_FROM_PRIVATE_NETWORK`, `START_FROM_GKE_MASTER`, `START_FROM_CLOUD_SQL_INSTANCE`, `START_FROM_GKE_POD`, `START_FROM_REDIS_INSTANCE`, `START_FROM_REDIS_CLUSTER`, `START_FROM_CLOUD_FUNCTION`, `START_FROM_APP_ENGINE_VERSION`, `START_FROM_CLOUD_RUN_REVISION`, `START_FROM_CLOUD_RUN_JOB`, `START_FROM_STORAGE_BUCKET`, `START_FROM_PSC_PUBLISHED_SERVICE`, `START_FROM_SERVERLESS_NEG`, `START_FROM_DMS_PRIVATE_CONNECTION`, `START_FROM_DATASTREAM_PRIVATE_CONNECTION`, `APPLY_INGRESS_FIREWALL_RULE`, `APPLY_EGRESS_FIREWALL_RULE`, `APPLY_ROUTE`, `APPLY_FORWARDING_RULE`, `ANALYZE_LOAD_BALANCER_BACKEND`, `SPOOFING_APPROVED`, `ARRIVE_AT_INSTANCE`, `ARRIVE_AT_INTERNAL_LOAD_BALANCER`, `ARRIVE_AT_EXTERNAL_LOAD_BALANCER`, `ARRIVE_AT_HYBRID_SUBNET`, `ARRIVE_AT_VPN_GATEWAY`, `ARRIVE_AT_VPN_TUNNEL`, `ARRIVE_AT_INTERCONNECT_ATTACHMENT`, `ARRIVE_AT_VPC_CONNECTOR`, `ARRIVE_AT_GKE_POD`, `DIRECT_VPC_EGRESS_CONNECTION`, `SERVERLESS_EXTERNAL_CONNECTION`, `NGFW_PACKET_INSPECTION`, `NAT`, `SKIP_GKE_POD_IP_MASQUERADING`, `SKIP_GKE_INGRESS_NETWORK_POLICY`, `SKIP_GKE_EGRESS_NETWORK_POLICY`, `APPLY_INGRESS_GKE_NETWORK_POLICY`, `APPLY_EGRESS_GKE_NETWORK_POLICY`, `PROXY_CONNECTION`, `DELIVER`, `DROP`, `FORWARD`, `ABORT`, `VIEWER_PERMISSION_MISSING`. |
| `storageBucket` | StorageBucketInfo | Display information of a Storage Bucket. Used only for return traces. |
| `viewerPermissionMissingInfo` | ViewerPermissionMissingInfo | Display information of a step that is redacted due to missing permissions. |
| `vpcConnector` | VpcConnectorInfo | Display information of a VPC connector. |
| `vpnGateway` | VpnGatewayInfo | Display information of a Compute Engine VPN gateway. |
| `vpnTunnel` | VpnTunnelInfo | Display information of a Compute Engine VPN tunnel. |

### `StorageBucketInfo`

- For display only. Metadata associated with Storage Bucket.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Cloud Storage Bucket name. |

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

### `Trace`

- Trace represents one simulated packet forwarding path. \* Each trace contains multiple ordered steps. \* Each step is in a particular state with associated configuration. \* State is categorized as final or non-final states. \* Each final state has a reason associated. \* Each trace must end with a final state (the last step). |---------------------Trace----------------------| Step1(State) Step2(State) --- StepN(State(final))
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpointInfo` | EndpointInfo | Derived from the source and destination endpoints definition specified by user request, and validated by the data plane model. If there are multiple traces starting from different source locations, then the endpoint_info may be different between traces. |
| `forwardTraceId` | integer (int32) | ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace. |
| `steps` | array<Step> | A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them. |

### `ViewerPermissionMissingInfo`

- For display only. Metadata associated with a step that was redacted due to missing permissions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceTypes` | array<string> | Types of the resources that the user does not have permission to view. Values: `RESOURCE_TYPE_UNSPECIFIED`, `FIREWALL`, `INSTANCE`, `FORWARDING_RULE`. |

### `VpcConnectorInfo`

- For display only. Metadata associated with a VPC connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a VPC connector. |
| `location` | string | Location in which the VPC connector is deployed. |
| `uri` | string | URI of a VPC connector. Format: `projects/{project_id}/locations/{location}/connectors/{connector_id}` |

### `VpcFlowLogsConfig`

- A configuration to generate VPC Flow Logs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationInterval` | string enum | Optional. The aggregation interval for the logs. Default value is INTERVAL_5_SEC. Values: `AGGREGATION_INTERVAL_UNSPECIFIED`, `INTERVAL_5_SEC`, `INTERVAL_30_SEC`, `INTERVAL_1_MIN`, `INTERVAL_5_MIN`, `INTERVAL_10_MIN`, `INTERVAL_15_MIN`. |
| `connectionLogging` | string enum | Optional. Configures whether connection logging is enabled for VPC Flow Logs. Values: `CONNECTION_LOGGING_UNSPECIFIED`, `CONNECTION_LOGGING_ENABLED`, `CONNECTION_LOGGING_DISABLED`. |
| `createTime` | string (google-datetime) | Output only. The time the config was created. |
| `crossProjectMetadata` | string enum | Optional. Determines whether to include cross project annotations in the logs. This field is available only for organization configurations. If not specified in org configs will be set to CROSS_PROJECT_METADATA_ENABLED. Values: `CROSS_PROJECT_METADATA_UNSPECIFIED`, `CROSS_PROJECT_METADATA_ENABLED`, `CROSS_PROJECT_METADATA_DISABLED`. |
| `description` | string | Optional. The user-supplied description of the VPC Flow Logs configuration. Maximum of 512 characters. |
| `filterExpr` | string | Optional. Export filter used to define which VPC Flow Logs should be logged. |
| `flowSampling` | number (float) | Optional. The value of the field must be in (0, 1\]. The sampling rate of VPC Flow Logs where 1.0 means all collected logs are reported. Setting the sampling rate to 0.0 is not allowed. If you want to disable VPC Flow Logs, use the state field instead. Default value is 1.0. |
| `interconnectAttachment` | string | Traffic will be logged from the Interconnect Attachment. Format: projects/{project_id}/regions/{region}/interconnectAttachments/{name} |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. |
| `metadata` | string enum | Optional. Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default value is INCLUDE_ALL_METADATA. Values: `METADATA_UNSPECIFIED`, `INCLUDE_ALL_METADATA`, `EXCLUDE_ALL_METADATA`, `CUSTOM_METADATA`. |
| `metadataFields` | array<string> | Optional. Custom metadata fields to include in the reported VPC flow logs. Can only be specified if "metadata" was set to CUSTOM_METADATA. |
| `name` | string | Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` |
| `network` | string | Traffic will be logged from VMs, VPN tunnels and Interconnect Attachments within the network. Format: projects/{project_id}/global/networks/{name} |
| `state` | string enum | Optional. The state of the VPC Flow Log configuration. Default value is ENABLED. When creating a new configuration, it must be enabled. Setting state=DISABLED will pause the log generation for this config. Values: `STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `subnet` | string | Traffic will be logged from VMs within the subnetwork. Format: projects/{project_id}/regions/{region}/subnetworks/{name} |
| `targetResourceState` | string enum | Output only. Describes the state of the configured target resource for diagnostic purposes. Values: `TARGET_RESOURCE_STATE_UNSPECIFIED`, `TARGET_RESOURCE_EXISTS`, `TARGET_RESOURCE_DOES_NOT_EXIST`. |
| `updateTime` | string (google-datetime) | Output only. The time the config was updated. |
| `vpnTunnel` | string | Traffic will be logged from the VPN Tunnel. Format: projects/{project_id}/regions/{region}/vpnTunnels/{name} |

### `VpnGatewayInfo`

- For display only. Metadata associated with a Compute Engine VPN gateway.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a VPN gateway. |
| `ipAddress` | string | IP address of the VPN gateway. |
| `networkUri` | string | URI of the VPC network where the VPN gateway is configured. Format: `projects/{project_id}/global/networks/{network_id}` |
| `region` | string | Name of a Google Cloud region where this VPN gateway is configured. |
| `uri` | string | URI of the VPN gateway. Format: \* `projects/{project_id}/regions/{region}/vpnGateways/{vpn_gateway_id}` (HA VPN gateway) \* `projects/{project_id}/regions/{region}/targetVpnGateways/{target_vpn_gateway_id}` (Classic VPN gateway) |
| `vpnTunnelUri` | string | URI of the VPN tunnel associated with the VPN gateway. There may be multiple VPN tunnels configured on a VPN gateway, and only the one relevant to the test is displayed. Format: `projects/{project_id}/regions/{region}/vpnTunnels/{vpn_tunnel_id}` |

### `VpnTunnelInfo`

- For display only. Metadata associated with a Compute Engine VPN tunnel.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of a VPN tunnel. |
| `networkUri` | string | URI of the VPC network where the VPN tunnel is configured. Format: `projects/{project_id}/global/networks/{network_id}` |
| `region` | string | Name of a Google Cloud region where this VPN tunnel is configured. |
| `remoteGateway` | string | URI of a VPN gateway at remote end of the tunnel. Format: \* `projects/{project_id}/regions/{region}/vpnGateways/{vpn_gateway_id}` (GCP HA VPN gateway) \* `projects/{project_id}/global/peerVpnGateways/{peer_vpn_gateway_id}` (GCP peer VPN gateway) |
| `remoteGatewayIp` | string | Remote VPN gateway's IP address. |
| `routingType` | string enum | Type of the routing policy. Values: `ROUTING_TYPE_UNSPECIFIED`, `ROUTE_BASED`, `POLICY_BASED`, `DYNAMIC`. |
| `sourceGateway` | string | URI of the VPN gateway at local end of the tunnel. Format: \* `projects/{project_id}/regions/{region}/vpnGateways/{vpn_gateway_id}` (HA VPN gateway) \* `projects/{project_id}/regions/{region}/targetVpnGateways/{target_vpn_gateway_id}` (Classic VPN gateway) |
| `sourceGatewayIp` | string | Local VPN gateway's IP address. |
| `uri` | string | URI of the VPN tunnel. Format: `projects/{project_id}/regions/{region}/vpnTunnels/{vpn_tunnel_id}` |

### `WebPath`

- Message describing WebPath resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the WebPath was created. |
| `destination` | string | Output only. Web monitoring target. |
| `destinationGeoLocation` | GeoLocation | Output only. Geographical location of the destination. |
| `displayName` | string | Output only. Display name of the WebPath. |
| `interval` | string (google-duration) | Output only. Monitoring interval. |
| `monitoringEnabled` | boolean | Output only. Is monitoring enabled for the WebPath. |
| `monitoringPolicyDisplayName` | string | Output only. Display name of the monitoring policy. |
| `monitoringPolicyId` | string | Output only. ID of the monitoring policy. |
| `monitoringStatus` | string enum | Output only. The monitoring status of the WebPath. Values: `MONITORING_STATUS_UNSPECIFIED`, `MONITORING`, `POLICY_MISMATCH`, `MONITORING_POINT_OFFLINE`, `DISABLED`. |
| `name` | string | Identifier. Name of the resource. Format: `projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/webPaths/{web_path}` |
| `providerTags` | array<ProviderTag> | Output only. The provider tags of the web path. |
| `providerUiUri` | string | Output only. Link to provider's UI; link shows the WebPath. |
| `relatedNetworkPathId` | string | Output only. Provider's UUID of the related NetworkPath. |
| `sourceMonitoringPointId` | string | Output only. ID of the source MonitoringPoint. |
| `updateTime` | string (google-datetime) | Output only. The time the WebPath was updated. |
| `workflowType` | string enum | Output only. The workflow type of the WebPath. Values: `WORKFLOW_TYPE_UNSPECIFIED`, `BROWSER`, `HTTP`. |

### Shape of `AbortInfo`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "cause": "string enum",
  "ipAddress": "string",
  "projectsMissingPermission": "array<string>",
  "resourceUri": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `networkmanagement` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://networkmanagement.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
