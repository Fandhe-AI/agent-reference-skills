---
source: https://deploymentmanager.googleapis.com/$discovery/rest?version=v2
---

# Cloud Deployment Manager V2 API message schemas (deploymentmanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/deploymentmanager/`.

### `AsyncOptions`

- Async options that determine when a resource should finish.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `methodMatch` | string | Method regex where this policy will apply. |
| `pollingOptions` | PollingOptions | Deployment manager will poll instances for this API resource setting a RUNNING state, and blocking until polling conditions tell whether the resource is completed or failed. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `BaseType`

- BaseType that describes a service-backed Type.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `collectionOverrides` | array<CollectionOverride> | Allows resource handling overrides for specific collections |
| `credential` | Credential | Credential used when interacting with this type. |
| `descriptorUrl` | string | Descriptor Url for the this type. |
| `options` | Options | Options to apply when handling any resources in this service. |

### `BasicAuth`

- Basic Auth used as a credential.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `password` | string | — |
| `user` | string | — |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BulkInsertOperationStatus`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createdVmCount` | integer (int32) | \[Output Only\] Count of VMs successfully created so far. |
| `deletedVmCount` | integer (int32) | \[Output Only\] Count of VMs that got deleted during rollback. |
| `failedToCreateVmCount` | integer (int32) | \[Output Only\] Count of VMs that started creating but encountered an error. |
| `status` | string enum | \[Output Only\] Creation status of BulkInsert operation - information if the flow is rolling forward or rolling back. Values: `STATUS_UNSPECIFIED`, `CREATING`, `ROLLING_BACK`, `DONE`, `PENDING`. |
| `targetVmCount` | integer (int32) | \[Output Only\] Count of VMs originally planned to be created. |

### `CollectionOverride`

- CollectionOverride allows resource handling overrides for specific resources within a BaseType
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `collection` | string | The collection that identifies this resource within its service. |
| `options` | Options | The options to apply to this resource-level override |

### `CollectionOverride` (alpha)

- CollectionOverride allows resource handling overrides for specific resources within a BaseType
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `collection` | string | The collection that identifies this resource within its service. |
| `methodMap` | MethodMap | Custom verb method mappings to support unordered list API mappings. |
| `options` | Options | The options to apply to this resource-level override |

### `CompositeType`

- Holds the composite type.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional textual description of the resource; provided by the client when the resource is created. |
| `id` | string (uint64) | — |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `labels` | array<CompositeTypeLabelEntry> | Map of labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. |
| `name` | string | Name of the composite type, must follow the expression: `[a-z]([-a-z0-9_.]{0,61}[a-z0-9])?`. |
| `operation` | Operation | Output only. The Operation that most recently ran, or is currently running, on this composite type. |
| `selfLink` | string | Output only. Server defined URL for the resource. |
| `status` | string enum | — Values: `UNKNOWN_STATUS`, `DEPRECATED`, `EXPERIMENTAL`, `SUPPORTED`. |
| `templateContents` | TemplateContents | Files for the template type. |

### `CompositeTypeLabelEntry`

- Label object for CompositeTypes
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the label |
| `value` | string | Value of the label |

### `CompositeTypesListResponse`

- A response that returns all Composite Types supported by Deployment Manager
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `compositeTypes` | array<CompositeType> | Output only. A list of resource composite types supported by Deployment Manager. |
| `nextPageToken` | string | A token used to continue a truncated list request. |

### `ConfigFile`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `content` | string | The contents of the file. |

### `Credential`

- The credential used by Deployment Manager and TypeProvider. Only one of the options is permitted.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `basicAuth` | BasicAuth | Basic Auth Credential, only used by TypeProvider. |
| `serviceAccount` | ServiceAccount | Service Account Credential, only used by Deployment. |
| `useProjectDefault` | boolean | Specify to use the project default credential, only supported by Deployment. |

### `DebugInfo`

- Describes additional debugging info.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `detail` | string | Additional debugging information provided by the server. |
| `stackEntries` | array<string> | The stack trace entries indicating where the error occurred. |

### `Deployment`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional user-provided description of the deployment. |
| `fingerprint` | string (byte) | Provides a fingerprint to use in requests to modify a deployment, such as `update()`, `stop()`, and `cancelPreview()` requests. A fingerprint is a randomly generated value that must be provided with `update()`, `stop()`, and `cancelPreview()` requests to perform optimistic locking. This ensures optimistic concurrency so that only one request happens at a time. The fingerprint is initially generated by Deployment Manager and changes after every request to modify data. To get the latest fingerprint value, perform a `get()` request to a deployment. |
| `id` | string (uint64) | — |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `labels` | array<DeploymentLabelEntry> | Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. |
| `manifest` | string | Output only. URL of the manifest representing the last manifest that was successfully deployed. If no manifest has been successfully deployed, this field will be absent. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `operation` | Operation | Output only. The Operation that most recently ran, or is currently running, on this deployment. |
| `selfLink` | string | Output only. Server defined URL for the resource. |
| `target` | TargetConfiguration | \[Input Only\] The parameters that define your deployment, including the deployment configuration and relevant templates. |
| `update` | DeploymentUpdate | Output only. If Deployment Manager is currently updating or previewing an update to this deployment, the updated configuration appears here. |
| `updateTime` | string | Output only. Update timestamp in RFC3339 text format. |

### `Deployment` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `credential` | Credential | User provided default credential for the deployment. |
| `description` | string | An optional user-provided description of the deployment. |
| `fingerprint` | string (byte) | Provides a fingerprint to use in requests to modify a deployment, such as `update()`, `stop()`, and `cancelPreview()` requests. A fingerprint is a randomly generated value that must be provided with `update()`, `stop()`, and `cancelPreview()` requests to perform optimistic locking. This ensures optimistic concurrency so that only one request happens at a time. The fingerprint is initially generated by Deployment Manager and changes after every request to modify data. To get the latest fingerprint value, perform a `get()` request to a deployment. |
| `id` | string (uint64) | — |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `labels` | array<DeploymentLabelEntry> | Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. |
| `manifest` | string | Output only. URL of the manifest representing the last manifest that was successfully deployed. If no manifest has been successfully deployed, this field will be absent. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `operation` | Operation | Output only. The Operation that most recently ran, or is currently running, on this deployment. |
| `outputs` | array<DeploymentOutputEntry> | Output only. List of outputs from the last manifest that deployed successfully. |
| `selfLink` | string | Output only. Server defined URL for the resource. |
| `target` | TargetConfiguration | \[Input Only\] The parameters that define your deployment, including the deployment configuration and relevant templates. |
| `update` | DeploymentUpdate | Output only. If Deployment Manager is currently updating or previewing an update to this deployment, the updated configuration appears here. |
| `updateTime` | string | Output only. Update timestamp in RFC3339 text format. |

### `DeploymentLabelEntry`

- Label object for Deployments
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the label |
| `value` | string | Value of the label |

### `DeploymentOutputEntry`

- Output object for Deployments
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the output |
| `value` | string | Value of the label |

### `DeploymentUpdate`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. An optional user-provided description of the deployment after the current update has been applied. |
| `labels` | array<DeploymentUpdateLabelEntry> | Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. |
| `manifest` | string | Output only. URL of the manifest representing the update configuration of this deployment. |

### `DeploymentUpdate` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `credential` | Credential | Output only. The user-provided default credential to use when deploying this preview. |
| `description` | string | Output only. An optional user-provided description of the deployment after the current update has been applied. |
| `labels` | array<DeploymentUpdateLabelEntry> | Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. |
| `manifest` | string | Output only. URL of the manifest representing the update configuration of this deployment. |

### `DeploymentUpdateLabelEntry`

- Label object for DeploymentUpdate
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the label |
| `value` | string | Value of the label |

### `DeploymentsCancelPreviewRequest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Specifies a fingerprint for `cancelPreview()` requests. A fingerprint is a randomly generated value that must be provided in `cancelPreview()` requests to perform optimistic locking. This ensures optimistic concurrency so that the deployment does not have conflicting requests (e.g. if someone attempts to make a new update request while another user attempts to cancel a preview, this would prevent one of the requests). The fingerprint is initially generated by Deployment Manager and changes after every request to modify a deployment. To get the latest fingerprint value, perform a `get()` request on the deployment. |

### `DeploymentsListResponse`

- A response containing a partial list of deployments and a page token used to build the next request if the request has been truncated.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deployments` | array<Deployment> | Output only. The deployments contained in this response. |
| `nextPageToken` | string | Output only. A token used to continue a truncated list request. |

### `DeploymentsStopRequest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Specifies a fingerprint for `stop()` requests. A fingerprint is a randomly generated value that must be provided in `stop()` requests to perform optimistic locking. This ensures optimistic concurrency so that the deployment does not have conflicting requests (e.g. if someone attempts to make a new update request while another user attempts to stop an ongoing update request, this would prevent a collision). The fingerprint is initially generated by Deployment Manager and changes after every request to modify a deployment. To get the latest fingerprint value, perform a `get()` request on the deployment. |

### `Diagnostic`

-
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `field` | string | JsonPath expression on the resource that if non empty, indicates that this field needs to be extracted as a diagnostic. |
| `level` | string enum | Level to record this diagnostic. Values: `UNKNOWN`, `INFORMATION`, `WARNING`, `ERROR`. |

### `ErrorInfo`

- Describes the cause of the error with structured details. Example of an error when contacting the "pubsub.googleapis.com" API when it is not enabled: { "reason": "API_DISABLED" "domain": "googleapis.com" "metadata": { "resource": "projects/123", "service": "pubsub.googleapis.com" } } This response indicates that the pubsub.googleapis.com API is not enabled. Example of an error that is returned when attempting to create a Spanner instance in a region that is out of stock: { "reason": "STOCKOUT" "domain": "spanner.googleapis.com", "metadata": { "availableRegions": "us-central1,us-east2" } }
- Version: v2

| Field | Type | Description |
|---|---|---|
| `domain` | string | The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". |
| `metadatas` | object | Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. |
| `reason` | string | The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FirewallPolicyRuleOperationMetadata`

- Metadata for FirewallPolicyRule operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allocatedPriority` | integer (int32) | Output only. \[Output Only\] The priority allocated for the firewall policy rule if query parameters specified minPriority/maxPriority. |

### `GetHealthOperationMetadata`

- Metadata for GetHealth operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `healthInfo` | GetHealthOperationMetadataHealthInfo | Output only. The health information. |

### `GetHealthOperationMetadataHealthInfo`

- Health information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `availabilitySloStatus` | string enum | Output only. The availability SLO status. Values: `AVAILABILITY_SLO_STATUS_UNSPECIFIED`, `AVAILABILITY_SLO_STATUS_IN_SLO`, `AVAILABILITY_SLO_STATUS_OUT_OF_SLO`, `AVAILABILITY_SLO_STATUS_SLO_UNKNOWN`. |
| `healthStatus` | string enum | Output only. The health status. Values: `HEALTH_STATUS_UNSPECIFIED`, `HEALTH_STATUS_HEALTHY`, `HEALTH_STATUS_UNHEALTHY`. |
| `repairCategory` | string enum | Output only. The repair category. Values: `REPAIR_CATEGORY_UNSPECIFIED`, `REPAIR_CATEGORY_PLANNED_MAINTENANCE`, `REPAIR_CATEGORY_EMERGENT_MAINTENANCE`, `REPAIR_CATEGORY_USER_REPORTED_FAULT`, `REPAIR_CATEGORY_CRITICAL_FAILURE`. |
| `unhealthyReason` | string enum | Output only. The reason for unhealthy status. Values: `UNHEALTHY_REASON_UNSPECIFIED`, `UNHEALTHY_REASON_REPAIRING`, `UNHEALTHY_REASON_PENDING_USER_APPROVAL`, `UNHEALTHY_REASON_UNSCHEDULABLE`. |
| `updateTime` | string (google-datetime) | Output only. The time when health info was updated. |

### `GetVersionOperationMetadata`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `inlineSbomInfo` | GetVersionOperationMetadataSbomInfo | — |

### `GetVersionOperationMetadataSbomInfo`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `currentComponentVersions` | object | A mapping of components to their currently-applied versions or other appropriate identifiers. |
| `targetComponentVersions` | object | A mapping of components to their target versions or other appropriate identifiers. |

### `GlobalSetPolicyRequest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify bindings. |
| `etag` | string (byte) | Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag. |
| `policy` | Policy | REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | Update mask for the policy. |

### `Help`

- Provides links to documentation or for performing an out of band action. For example, if a quota check failed with an error indicating the calling project hasn't enabled the accessed service, this can contain a URL pointing directly to the right place in the developer console to flip the bit.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `links` | array<HelpLink> | URL(s) pointing to additional information on handling the current error. |

### `HelpLink`

- Describes a URL link.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Describes what the link offers. |
| `url` | string | The URL of the link. |

### `ImportFile`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `content` | string | The contents of the file. |
| `name` | string | The name of the file. |

### `InputMapping`

- InputMapping creates a 'virtual' property that will be injected into the properties before sending the request to the underlying API.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `fieldName` | string | The name of the field that is going to be injected. |
| `location` | string enum | The location where this mapping applies. Values: `UNKNOWN`, `PATH`, `QUERY`, `BODY`, `HEADER`. |
| `methodMatch` | string | Regex to evaluate on method to decide if input applies. |
| `value` | string | A jsonPath expression to select an element. |

### `InstancesBulkInsertOperationMetadata`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `machineType` | string | \[Output Only\] The machine type of the VMs that were created used internally only by KCP flex bulk insert. |
| `perLocationStatus` | object | Status information per location (location name is key). Example key: zones/us-central1-a |

### `InstancesTroubleshootOperationMetadata`

- \[Output Only\] Operation metadata for instances.troubleshoot.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `troubleshootOutput` | string | Output only. \[Output Only\] Serialized output of the troubleshooting diagnostic run. |

### `LocalizedMessage`

- Provides a localized error message that is safe to return to the user which can be attached to an RPC error.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locale` | string | The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX" |
| `message` | string | The localized error message in the above locale. |

### `Manifest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `config` | ConfigFile | Output only. The YAML configuration for this manifest. |
| `expandedConfig` | string | Output only. The fully-expanded configuration file, including any templates and references. |
| `id` | string (uint64) | — |
| `imports` | array<ImportFile> | Output only. The imported files for this manifest. |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `layout` | string | Output only. The YAML layout for this manifest. |
| `manifestSizeBytes` | string (int64) | Output only. The computed size of the fully expanded manifest. |
| `manifestSizeLimitBytes` | string (int64) | Output only. The size limit for expanded manifests in the project. |
| `name` | string | Output only. The name of the manifest. |
| `selfLink` | string | Output only. Self link for the manifest. |

### `ManifestsListResponse`

- A response containing a partial list of manifests and a page token used to build the next request if the request has been truncated.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `manifests` | array<Manifest> | Output only. Manifests contained in this list response. |
| `nextPageToken` | string | Output only. A token used to continue a truncated list request. |

### `MethodMap`

- Deployment Manager will call these methods during the events of creation/deletion/update/get/setIamPolicy
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `create` | string | The action identifier for the create method to be used for this collection |
| `delete` | string | The action identifier for the delete method to be used for this collection |
| `get` | string | The action identifier for the get method to be used for this collection |
| `setIamPolicy` | string | The action identifier for the setIamPolicy method to be used for this collection |
| `update` | string | The action identifier for the update method to be used for this collection |

### `Operation`

- Represents an Operation resource. Google Compute Engine has three Operation resources: \* Global \* Regional \* Zonal You can use an operation resource to manage asynchronous API requests. For more information, read Handling API responses. Operations can be global, regional or zonal. - For global operations, use the `globalOperations` resource. - For regional operations, use the `regionOperations` resource. - For zonal operations, use the `zoneOperations` resource. For more information, read Global, Regional, and Zonal Resources. Note that completed Operation resources have a limited retention period.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clientOperationId` | string | \[Output Only\] The value of `requestId` if you provided it in the request. Not present otherwise. |
| `creationTimestamp` | string | \[Deprecated\] This field is deprecated. |
| `description` | string | \[Output Only\] A textual description of the operation, which is set when the operation is created. |
| `details` | OperationDetails | \[Output Only\] Extended details about the operation's execution. |
| `endTime` | string | \[Output Only\] The time that this operation was completed. This value is in RFC3339 text format. |
| `error` | object | \[Output Only\] If errors are generated during processing of the operation, this field will be populated. |
| `firewallPolicyRuleOperationMetadata` | FirewallPolicyRuleOperationMetadata | Output only. \[Output Only\] Metadata containing the allocated priority from the networkFirewallPolicies.addRule and regionNetworkFirewallPolicies.addRule methods if not explicitly provided by the user. |
| `getHealthOperationMetadata` | GetHealthOperationMetadata | Output only. Metadata for GetHealth operations. |
| `getVersionOperationMetadata` | GetVersionOperationMetadata | — |
| `httpErrorMessage` | string | \[Output Only\] If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`. |
| `httpErrorStatusCode` | integer (int32) | \[Output Only\] If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the operation. This identifier is defined by the server. |
| `insertTime` | string | \[Output Only\] The time that this operation was requested. This value is in RFC3339 text format. |
| `instancesBulkInsertOperationMetadata` | InstancesBulkInsertOperationMetadata | — |
| `instancesTroubleshootOperationMetadata` | InstancesTroubleshootOperationMetadata | Output only. \[Output Only\] Operation metadata for instances.troubleshoot. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always `compute#operation` for Operation resources. |
| `name` | string | \[Output Only\] Name of the operation. |
| `operationGroupId` | string | Output only. \[Output Only\] An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request. |
| `operationType` | string | \[Output Only\] The type of operation, such as `insert`, `update`, or `delete`, and so on. |
| `progress` | integer (int32) | \[Output Only\] An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses. |
| `region` | string | \[Output Only\] The URL of the region where the operation resides. Only applicable when performing regional operations. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `setAutoscalerLinkOperationMetadata` | SetAutoscalerLinkOperationMetadata | This field is used internally by the Autoscaler team and should not be promoted to "alpha/beta/v1". |
| `setCommonInstanceMetadataOperationMetadata` | SetCommonInstanceMetadataOperationMetadata | Output only. \[Output Only\] If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state. |
| `startTime` | string | \[Output Only\] The time that this operation was started by the server. This value is in RFC3339 text format. |
| `status` | string enum | \[Output Only\] The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`. Values: `PENDING`, `RUNNING`, `DONE`. |
| `statusMessage` | string | \[Output Only\] An optional textual description of the current status of the operation. |
| `targetId` | string (uint64) | \[Output Only\] The unique target ID, which identifies a specific incarnation of the target resource. |
| `targetLink` | string | \[Output Only\] The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from. |
| `user` | string | \[Output Only\] User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`. |
| `warnings` | array<object> | \[Output Only\] If warning messages are generated during processing of the operation, this field will be populated. |
| `zone` | string | \[Output Only\] The URL of the zone where the operation resides. Only applicable when performing per-zone operations. |

### `OperationDetails`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `data` | object | Machine readable data from the message. |
| `message` | string | Human or AI readable details on execution of the operation. |

### `OperationsListResponse`

- A response containing a partial list of operations and a page token used to build the next request if the request has been truncated.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Output only. A token used to continue a truncated list request. |
| `operations` | array<Operation> | Output only. Operations contained in this list response. |

### `Options`

- Options allows customized resource handling by Deployment Manager.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `asyncOptions` | array<AsyncOptions> | Options regarding how to thread async requests. |
| `inputMappings` | array<InputMapping> | The mappings that apply for requests. |
| `validationOptions` | ValidationOptions | Options for how to validate and process properties on a resource. |
| `virtualProperties` | string | Additional properties block described as a jsonSchema, these properties will never be part of the json payload, but they can be consumed by InputMappings, this must be a valid json schema draft-04. The properties specified here will be decouple in a different section. This schema will be merged to the schema validation, and properties here will be extracted From the payload and consumed explicitly by InputMappings. ex: field1: type: string field2: type: number |

### `Options` (alpha)

- Options allows customized resource handling by Deployment Manager.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `asyncOptions` | array<AsyncOptions> | Options regarding how to thread async requests. |
| `inputMappings` | array<InputMapping> | The mappings that apply for requests. |
| `nameProperty` | string | The json path to the field in the resource JSON body into which the resource name should be mapped. Leaving this empty indicates that there should be no mapping performed. |
| `validationOptions` | ValidationOptions | Options for how to validate and process properties on a resource. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PollingOptions`

-
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `diagnostics` | array<Diagnostic> | An array of diagnostics to be collected by Deployment Manager, these diagnostics will be displayed to the user. |
| `failCondition` | string | JsonPath expression that determines if the request failed. |
| `finishCondition` | string | JsonPath expression that determines if the request is completed. |
| `pollingLink` | string | JsonPath expression that evaluates to string, it indicates where to poll. |
| `targetLink` | string | JsonPath expression, after polling is completed, indicates where to fetch the resource. |

### `QuotaExceededInfo`

- Additional details for quota exceeded error for resource quota.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dimensions` | object | The map holding related quota dimensions. |
| `futureLimit` | number (double) | Future quota limit being rolled out. The limit's unit depends on the quota type or metric. |
| `limit` | number (double) | Current effective quota limit. The limit's unit depends on the quota type or metric. |
| `limitName` | string | The name of the quota limit. |
| `metricName` | string | The Compute Engine quota metric name. |
| `rolloutStatus` | string enum | Rollout status of the future quota limit. Values: `ROLLOUT_STATUS_UNSPECIFIED`, `IN_PROGRESS`. |

### `Resource`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessControl` | ResourceAccessControl | The Access Control Policy set on this resource. |
| `finalProperties` | string | Output only. The evaluated properties of the resource with references expanded. Returned as serialized YAML. |
| `id` | string (uint64) | — |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `manifest` | string | Output only. URL of the manifest representing the current configuration of this resource. |
| `name` | string | Output only. The name of the resource as it appears in the YAML config. |
| `properties` | string | Output only. The current properties of the resource before any references have been filled in. Returned as serialized YAML. |
| `type` | string | Output only. The type of the resource, for example `compute.v1.instance`, or `cloudfunctions.v1beta1.function`. |
| `update` | ResourceUpdate | Output only. If Deployment Manager is currently updating or previewing an update to this resource, the updated configuration appears here. |
| `updateTime` | string | Output only. Update timestamp in RFC3339 text format. |
| `url` | string | Output only. The URL of the actual resource. |
| `warnings` | array<object> | Output only. If warning messages are generated during processing of this resource, this field will be populated. |

### `Resource` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `accessControl` | ResourceAccessControl | The Access Control Policy set on this resource. |
| `finalProperties` | string | Output only. The evaluated properties of the resource with references expanded. Returned as serialized YAML. |
| `id` | string (uint64) | — |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `lastUsedCredential` | Credential | Output only. The last used credential that successfully created/updated the resource. |
| `manifest` | string | Output only. URL of the manifest representing the current configuration of this resource. |
| `name` | string | Output only. The name of the resource as it appears in the YAML config. |
| `properties` | string | Output only. The current properties of the resource before any references have been filled in. Returned as serialized YAML. |
| `runtimePolicies` | array<string> | Output only. In case this is an action, it will show the runtimePolicies on which this action will run in the deployment Values: `CREATE`, `DELETE`, `UPDATE_ON_CHANGE`, `UPDATE_ALWAYS`. |
| `type` | string | Output only. The type of the resource, for example `compute.v1.instance`, or `cloudfunctions.v1beta1.function`. |
| `update` | ResourceUpdate | Output only. If Deployment Manager is currently updating or previewing an update to this resource, the updated configuration appears here. |
| `updateTime` | string | Output only. Update timestamp in RFC3339 text format. |
| `url` | string | Output only. The URL of the actual resource. |
| `warnings` | array<object> | Output only. If warning messages are generated during processing of this resource, this field will be populated. |

### `ResourceAccessControl`

- The access controls set on the resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gcpIamPolicy` | string | The GCP IAM Policy to set on the resource. |

### `ResourceUpdate`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessControl` | ResourceAccessControl | The Access Control Policy to set on this resource after updating the resource itself. |
| `error` | object | Output only. If errors are generated during update of the resource, this field will be populated. |
| `finalProperties` | string | Output only. The expanded properties of the resource with reference values expanded. Returned as serialized YAML. |
| `intent` | string enum | Output only. The intent of the resource: `PREVIEW`, `UPDATE`, or `CANCEL`. Values: `CREATE_OR_ACQUIRE`, `DELETE`, `ACQUIRE`, `UPDATE`, `ABANDON`, `CREATE`. |
| `manifest` | string | Output only. URL of the manifest representing the update configuration of this resource. |
| `properties` | string | Output only. The set of updated properties for this resource, before references are expanded. Returned as serialized YAML. |
| `state` | string enum | Output only. The state of the resource. Values: `PENDING`, `IN_PROGRESS`, `IN_PREVIEW`, `FAILED`, `ABORTED`. |
| `warnings` | array<object> | Output only. If warning messages are generated during processing of this resource, this field will be populated. |

### `ResourceUpdate` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `accessControl` | ResourceAccessControl | The Access Control Policy to set on this resource after updating the resource itself. |
| `credential` | Credential | Output only. The credential that will be used creating/updating this resource. |
| `error` | object | Output only. If errors are generated during update of the resource, this field will be populated. |
| `finalProperties` | string | Output only. The expanded properties of the resource with reference values expanded. Returned as serialized YAML. |
| `intent` | string enum | Output only. The intent of the resource: `PREVIEW`, `UPDATE`, or `CANCEL`. Values: `CREATE_OR_ACQUIRE`, `DELETE`, `ACQUIRE`, `UPDATE`, `ABANDON`, `CREATE`. |
| `manifest` | string | Output only. URL of the manifest representing the update configuration of this resource. |
| `properties` | string | Output only. The set of updated properties for this resource, before references are expanded. Returned as serialized YAML. |
| `runtimePolicies` | array<string> | Output only. In case this is an action, it will show the runtimePolicies that this action will have after updating the deployment. Values: `CREATE`, `DELETE`, `UPDATE_ON_CHANGE`, `UPDATE_ALWAYS`. |
| `state` | string enum | Output only. The state of the resource. Values: `PENDING`, `IN_PROGRESS`, `IN_PREVIEW`, `FAILED`, `ABORTED`. |
| `warnings` | array<object> | Output only. If warning messages are generated during processing of this resource, this field will be populated. |

### `ResourcesListResponse`

- A response containing a partial list of resources and a page token used to build the next request if the request has been truncated.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token used to continue a truncated list request. |
| `resources` | array<Resource> | Resources contained in this list response. |

### `ServiceAccount`

- Service Account used as a credential.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `email` | string | The IAM service account email address like test@myproject.iam.gserviceaccount.com |

### `SetAutoscalerLinkOperationMetadata`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `zonalIgmIds` | array<string> | List of zonal IGM IDs part of the RMIG. |
| `zoneToIgmIds` | object | Map of zone to an ID of the zonal IGM belonging to the RMIG. |

### `SetCommonInstanceMetadataOperationMetadata`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clientOperationId` | string | \[Output Only\] The client operation id. |
| `perLocationOperations` | object | \[Output Only\] Status information per location (location name is key). Example key: zones/us-central1-a |

### `SetCommonInstanceMetadataOperationMetadataPerLocationOperationInfo`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `error` | Status | \[Output Only\] If state is `ABANDONED` or `FAILED`, this field is populated. |
| `state` | string enum | \[Output Only\] Status of the action, which can be one of the following: `PROPAGATING`, `PROPAGATED`, `ABANDONED`, `FAILED`, or `DONE`. Values: `UNSPECIFIED`, `PROPAGATING`, `PROPAGATED`, `ABANDONED`, `FAILED`, `DONE`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TargetConfiguration`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `config` | ConfigFile | The configuration to use for this deployment. |
| `imports` | array<ImportFile> | Specifies any files to import for this configuration. This can be used to import templates or other files. For example, you might import a text file in order to use the file in a template. |

### `TemplateContents`

- Files that make up the template contents of a template type.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `imports` | array<ImportFile> | Import files referenced by the main template. |
| `interpreter` | string enum | Which interpreter (python or jinja) should be used during expansion. Values: `UNKNOWN_INTERPRETER`, `PYTHON`, `JINJA`. |
| `mainTemplate` | string | The filename of the mainTemplate |
| `schema` | string | The contents of the template schema. |
| `template` | string | The contents of the main template file. |

### `TestPermissionsRequest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the 'resource'. Permissions with wildcards (such as '\*' or 'storage.\*') are not allowed. |

### `TestPermissionsResponse`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `Type`

- A resource type supported by Deployment Manager.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `id` | string (uint64) | — |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `name` | string | Name of the type. |
| `operation` | Operation | Output only. The Operation that most recently ran, or is currently running, on this type. |
| `selfLink` | string | Output only. Server defined URL for the resource. |

### `Type` (v2beta)

- A resource type supported by Deployment Manager.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `base` | BaseType | Base Type (configurable service) that backs this Type. |
| `description` | string | An optional textual description of the resource; provided by the client when the resource is created. |
| `id` | string (uint64) | — |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `labels` | array<TypeLabelEntry> | Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. |
| `name` | string | Name of the type. |
| `operation` | Operation | Output only. The Operation that most recently ran, or is currently running, on this type. |
| `selfLink` | string | Output only. Server defined URL for the resource. |

### `TypeInfo`

- Type Information. Contains detailed information about a composite type, base type, or base type with specific collection.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `description` | string | The description of the type. |
| `documentationLink` | string | For swagger 2.0 externalDocs field will be used. For swagger 1.2 this field will be empty. |
| `kind` | string | Output only. Type of the output. Always `deploymentManager#TypeInfo` for TypeInfo. |
| `name` | string | The base type or composite type name. |
| `schema` | TypeInfoSchemaInfo | For base types with a collection, we return a schema and documentation link For template types, we return only a schema |
| `selfLink` | string | Output only. Self link for the type provider. |
| `title` | string | The title on the API descriptor URL provided. |

### `TypeInfoSchemaInfo`

-
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `input` | string | The properties that this composite type or base type collection accept as input, represented as a json blob, format is: JSON Schema Draft V4 |
| `output` | string | The properties that this composite type or base type collection exposes as output, these properties can be used for references, represented as json blob, format is: JSON Schema Draft V4 |

### `TypeLabelEntry`

- Label object for Types
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the label |
| `value` | string | Value of the label |

### `TypeProvider`

- A type provider that describes a service-backed Type.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `collectionOverrides` | array<CollectionOverride> | Allows resource handling overrides for specific collections |
| `credential` | Credential | Credential used when interacting with this type. |
| `customCertificateAuthorityRoots` | array<string> | List of up to 2 custom certificate authority roots to use for TLS authentication when making calls on behalf of this type provider. If set, TLS authentication will exclusively use these roots instead of relying on publicly trusted certificate authorities when validating TLS certificate authenticity. The certificates must be in base64-encoded PEM format. The maximum size of each certificate must not exceed 10KB. |
| `description` | string | An optional textual description of the resource; provided by the client when the resource is created. |
| `descriptorUrl` | string | Descriptor Url for the this type provider. |
| `id` | string (uint64) | Output only. Unique identifier for the resource defined by the server. |
| `insertTime` | string | Output only. Creation timestamp in RFC3339 text format. |
| `labels` | array<TypeProviderLabelEntry> | Map of One Platform labels; provided by the client when the resource is created or updated. Specifically: Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?` |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `operation` | Operation | Output only. The Operation that most recently ran, or is currently running, on this type provider. |
| `options` | Options | Options to apply when handling any resources in this service. |
| `selfLink` | string | Output only. Self link for the type provider. |

### `TypeProviderLabelEntry`

- Label object for TypeProviders
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the label |
| `value` | string | Value of the label |

### `TypeProvidersListResponse`

- A response that returns all Type Providers supported by Deployment Manager
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token used to continue a truncated list request. |
| `typeProviders` | array<TypeProvider> | Output only. A list of resource type providers supported by Deployment Manager. |

### `TypeProvidersListTypesResponse`

-
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token used to continue a truncated list request. |
| `types` | array<TypeInfo> | Output only. A list of resource type info. |

### `TypesListResponse`

- A response that returns all Types supported by Deployment Manager
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token used to continue a truncated list request. |
| `types` | array<Type> | Output only. A list of resource types supported by Deployment Manager. |

### `ValidationOptions`

- Options for how to validate and process properties on a resource.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `schemaValidation` | string enum | Customize how deployment manager will validate the resource against schema errors. Values: `UNKNOWN`, `IGNORE`, `IGNORE_WITH_WARNINGS`, `FAIL`. |
| `undeclaredProperties` | string enum | Specify what to do with extra properties when executing a request. Values: `UNKNOWN`, `INCLUDE`, `IGNORE`, `INCLUDE_WITH_WARNINGS`, `IGNORE_WITH_WARNINGS`, `FAIL`. |

### Shape of `AsyncOptions`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "methodMatch": "string",
  "pollingOptions": "PollingOptions"
}
```

## Notes

- Generated from the Discovery document(s) v2, v2beta, alpha of `deploymentmanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026.", "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down. All related APIs and functions will no longer be supported." and "As of June 30, 2026, new users are blocked from enabling Google Cloud Deployment Manager V2 API or creating their first deployment."; it recommends Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19). The methods are still in the Discovery documents.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` `metadata` key regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[a-z][a-zA-Z0-9-_]+` (shown above as `a-z+`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` / `FieldViolation` `reason` regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[A-Z][A-Z0-9_]+[A-Z0-9]` (UPPER_SNAKE_CASE; shown above as `A-Z+[A-Z0-9]`).
- Source: https://deploymentmanager.googleapis.com/$discovery/rest?version=v2, https://deploymentmanager.googleapis.com/$discovery/rest?version=v2beta, https://deploymentmanager.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
