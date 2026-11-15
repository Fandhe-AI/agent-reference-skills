---
source: https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v3
---

# Cloud Resource Manager API message schemas (cloudresourcemanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudresourcemanager/`.

### `Ancestor`

- Identifying information for a single ancestor of a project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceId` | ResourceId | Resource id of the ancestor. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BooleanConstraint`

- A `Constraint` that is either enforced or not. For example a constraint `constraints/compute.disableSerialPortAccess`. If it is enforced on a VM instance, serial port connections will not be opened to that instance.
- Version: v1

### `BooleanPolicy`

- Used in `policy_type` to specify how `boolean_policy` will behave at this resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enforced` | boolean | If `true`, then the `Policy` is enforced. If `false`, then any configuration is acceptable. Suppose you have a `Constraint` `constraints/compute.disableSerialPortAccess` with `constraint_default` set to `ALLOW`. A `Policy` for that `Constraint` exhibits the following behavior: - If the `Policy` at this resource has enforced set to `false`, serial port connection attempts will be allowed. - If the `Policy` at this resource has enforced set to `true`, serial port connection attempts will be refused. - If the `Policy` at this resource is `RestoreDefault`, serial port connection attempts will be allowed. - If no `Policy` is set at this resource or anywhere higher in the resource hierarchy, serial port connection attempts will be allowed. - If no `Policy` is set at this resource, but one exists higher in the resource hierarchy, the behavior is as if the`Policy` were set at this resource. The following examples demonstrate the different possible layerings: Example 1 (nearest `Constraint` wins): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has no `Policy` set. The constraint at `projects/bar` and `organizations/foo` will not be enforced. Example 2 (enforcement gets replaced): `organizations/foo` has a `Policy` with: {enforced: false} `projects/bar` has a `Policy` with: {enforced: true} The constraint at `organizations/foo` is not enforced. The constraint at `projects/bar` is enforced. Example 3 (RestoreDefault): `organizations/foo` has a `Policy` with: {enforced: true} `projects/bar` has a `Policy` with: {RestoreDefault: {}} The constraint at `organizations/foo` is enforced. The constraint at `projects/bar` is not enforced, because `constraint_default` for the `Constraint` is `ALLOW`. |

### `Boundary`

- A Boundary is a collection of projects defined by a filtering criteria on an organization or a folder.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation time of the Boundary. |
| `displayName` | string | Optional. Human-readable display name of the Boundary. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Production Boundary` |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `managementProject` | string | Output only. The Management Project of the CapabilityConfig this Boundary is associated with. Will be empty if the Boundary is not associated with any CapabilityConfig. Format: `projects/{project_number}` Example: `projects/123456789012` |
| `name` | string | Identifier. The unique resource name of the Boundary. Format: - `organizations/{organization_id}/boundaries/{boundary_id}` - `folders/{folder_id}/boundaries/{boundary_id}` Example: `folders/123456789/boundaries/my-boundary` |
| `resourceFilter` | ResourceFilter | Optional. The filter defining the criteria for descendant projects to be included in the Boundary. Descendant projects are dynamically included in the Boundary based on this filter. |
| `state` | string enum | Output only. The lifecycle state of the Boundary. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`. |
| `updateTime` | string (google-datetime) | Output only. The most recent time this Boundary was modified. |

### `BoundaryConfig`

- A BoundaryConfig defines the common configurations regarding Boundaries defined under a parent CRM node (Folder or Organization), such as the partitioning tag key.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update requests to ensure the client has an up-to-date value before proceeding. |
| `name` | string | Identifier. The unique resource name of the BoundaryConfig. Format: - `organizations/{organization}/boundaryConfig` - `folders/{folder}/boundaryConfig` Example: `folders/123456789/boundaryConfig` |
| `tagKey` | string | Optional. The namespaced name of the tag key. Format: `{parent_id}/{tag_key_short_name}` Example: `123456789012/env` (where 123456789012 is the organization ID). |
| `updateTime` | string (google-datetime) | Output only. The most recent time this BoundaryConfig was modified. |

### `Capability`

- Representation of a Capability.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `name` | string | Immutable. Identifier. The resource name of the capability. Must be in the following form: \* `folders/{folder_id}/capabilities/{capability_name}` For example, `folders/123/capabilities/app-management` Following are the allowed {capability_name} values: \* `app-management` |
| `value` | boolean | Required. The configured value of the capability at the given parent resource. |

### `CapabilityConfig`

- A CapabilityConfig allows managing experiences like applications and agents on a logical administrative perimeter of Projects (Boundary).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `boundaries` | array<string> | Optional. The list of Boundaries associated with this CapabilityConfig. Format: `organizations/{organization}/boundaries/{boundary}` or, `folders/{folder}/boundaries/{boundary}` or, `projects/{project}/boundaries/{boundary}` |
| `createTime` | string (google-datetime) | Output only. The creation time of the CapabilityConfig. |
| `displayName` | string | Optional. Human-readable non-unique display name of the CapabilityConfig. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My CapabilityConfig` |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `managementProject` | string | Optional. Immutable. The Management Project associated with this CapabilityConfig. If not provided during creation, a management project will be automatically created. Cannot be modified after creation. Format: `projects/{project_number}` Example: `projects/123456789012` |
| `name` | string | Identifier. The unique resource name of the CapabilityConfig. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` |
| `state` | string enum | Output only. The lifecycle state of the CapabilityConfig. Values: `STATE_UNSPECIFIED`, `ACTIVE`. |
| `types` | array<string> | Required. The CapabilityConfig types. Values: `TYPE_UNSPECIFIED`, `APP_MANAGEMENT`, `AGENT_MANAGEMENT`. |
| `updateTime` | string (google-datetime) | Output only. The most recent time this CapabilityConfig was modified. |

### `ClearOrgPolicyRequest`

- The request sent to the ClearOrgPolicy method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraint` | string | Name of the `Constraint` of the `Policy` to clear. |
| `etag` | string (byte) | The current version, for concurrency control. Not sending an `etag` will cause the `Policy` to be cleared blindly. |

### `CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation`

- Metadata describing a long running folder operation
- Version: v3

| Field | Type | Description |
|---|---|---|
| `destinationParent` | string | The resource name of the folder or organization we are either creating the folder under or moving the folder to. |
| `displayName` | string | The display name of the folder. |
| `operationType` | string enum | The type of this operation. Values: `OPERATION_TYPE_UNSPECIFIED`, `CREATE`, `MOVE`. |
| `sourceParent` | string | The resource name of the folder's parent. Only applicable when the operation_type is MOVE. |

### `CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation`

- Metadata describing a long running folder operation
- Version: v3

| Field | Type | Description |
|---|---|---|
| `destinationParent` | string | The resource name of the folder or organization we are either creating the folder under or moving the folder to. |
| `displayName` | string | The display name of the folder. |
| `operationType` | string enum | The type of this operation. Values: `OPERATION_TYPE_UNSPECIFIED`, `CREATE`, `MOVE`. |
| `sourceParent` | string | The resource name of the folder's parent. Only applicable when the operation_type is MOVE. |

### `Constraint`

- A `Constraint` describes a way in which a resource's configuration can be restricted. For example, it controls which cloud services can be activated across an organization, or whether a Compute Engine instance can have serial port connections established. `Constraints` can be configured by the organization's policy administrator to fit the needs of the organzation by setting Policies for `Constraints` at different locations in the organization's resource hierarchy. Policies are inherited down the resource hierarchy from higher levels, but can also be overridden. For details about the inheritance rules please read about Policies. `Constraints` have a default behavior determined by the `constraint_default` field, which is the enforcement behavior that is used in the absence of a `Policy` being defined or inherited for the resource in question.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `booleanConstraint` | BooleanConstraint | Defines this constraint as being a BooleanConstraint. |
| `constraintDefault` | string enum | The evaluation behavior of this constraint in the absence of 'Policy'. Values: `CONSTRAINT_DEFAULT_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `description` | string | Detailed description of what this `Constraint` controls as well as how and where it is enforced. Mutable. |
| `displayName` | string | The human readable name. Mutable. |
| `listConstraint` | ListConstraint | Defines this constraint as being a ListConstraint. |
| `name` | string | Immutable value, required to globally be unique. For example, `constraints/serviceuser.services` |
| `version` | integer (int32) | Version of the `Constraint`. Default version is 0; |

### `CreateBoundaryMetadata`

- A status object which is used as the `metadata` field for the Operation returned by CreateBoundary. Currently empty.
- Version: v3

### `CreateCapabilityConfigMetadata`

- A status object which is used as the `metadata` field for the Operation returned by CreateCapabilityConfig. Currently empty.
- Version: v3

### `CreateFolderMetadata`

- Metadata pertaining to the Folder creation process.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The display name of the folder. |
| `parent` | string | The resource name of the folder or organization we are creating the folder under. |

### `CreateProjectMetadata`

- A status object which is used as the `metadata` field for the Operation returned by CreateProject. It provides insight for when significant phases of Project creation have completed.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Creation time of the project creation workflow. |
| `gettable` | boolean | True if the project can be retrieved using `GetProject`. No other operations on the project are guaranteed to work until the project creation is complete. |
| `ready` | boolean | True if the project creation process is complete. |

### `CreateSemanticTagBindingMetadata`

- Metadata for the `CreateSemanticTagBinding` long-running operation.
- Version: v3

### `CreateSemanticTagValueMetadata`

- Runtime operation information for creating a `SemanticTagValue`.
- Version: v3

### `CreateTagBindingMetadata`

- Runtime operation information for creating a TagValue.
- Version: v3

### `CreateTagKeyMetadata`

- Runtime operation information for creating a TagKey.
- Version: v3

### `CreateTagValueMetadata`

- Runtime operation information for creating a TagValue.
- Version: v3

### `DeleteBoundaryMetadata`

- A status object which is used as the `metadata` field for the Operation returned by DeleteBoundary. Currently empty.
- Version: v3

### `DeleteCapabilityConfigMetadata`

- A status object which is used as the `metadata` field for the Operation returned by DeleteCapabilityConfig. Currently empty.
- Version: v3

### `DeleteFolderMetadata`

- A status object which is used as the `metadata` field for the `Operation` returned by `DeleteFolder`.
- Version: v3

### `DeleteOrganizationMetadata`

- A status object which is used as the `metadata` field for the operation returned by DeleteOrganization.
- Version: v3

### `DeleteProjectMetadata`

- A status object which is used as the `metadata` field for the Operation returned by `DeleteProject`.
- Version: v3

### `DeleteSemanticTagBindingMetadata`

- Metadata for the `DeleteSemanticTagBinding` long-running operation.
- Version: v3

### `DeleteSemanticTagValueMetadata`

- Runtime operation information for deleting a `SemanticTagValue`.
- Version: v3

### `DeleteTagBindingMetadata`

- Runtime operation information for deleting a TagBinding.
- Version: v3

### `DeleteTagKeyMetadata`

- Runtime operation information for deleting a TagKey.
- Version: v3

### `DeleteTagValueMetadata`

- Runtime operation information for deleting a TagValue.
- Version: v3

### `EffectiveTag`

- An EffectiveTag represents a tag that applies to a resource during policy evaluation. Tags can be either directly bound to a resource or inherited from its ancestor. EffectiveTag contains the name and namespaced_name of the tag value and tag key, with additional fields of `inherited` to indicate the inheritance status of the effective tag.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `inherited` | boolean | Indicates the inheritance status of a tag value attached to the given resource. If the tag value is inherited from one of the resource's ancestors, inherited will be true. If false, then the tag value is directly attached to the resource, inherited will be false. |
| `namespacedTagKey` | string | The namespaced name of the TagKey. Can be in the form `{organization_id}/{tag_key_short_name}` or `{project_id}/{tag_key_short_name}` or `{project_number}/{tag_key_short_name}`. |
| `namespacedTagValue` | string | The namespaced name of the TagValue. Can be in the form `{organization_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_number}/{tag_key_short_name}/{tag_value_short_name}`. |
| `tagKey` | string | The name of the TagKey, in the format `tagKeys/{id}`, such as `tagKeys/123`. |
| `tagKeyParentName` | string | The parent name of the tag key. Must be in the format `organizations/{organization_id}` or `projects/{project_number}` |
| `tagValue` | string | Resource name for TagValue in the format `tagValues/456`. |

### `EffectiveTagBindingCollection`

- Represents a collection of effective tag bindings for a GCP resource.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `effectiveTags` | object | Tag keys/values effectively bound to this resource, specified in namespaced format. For example: "123/environment": "production" |
| `fullResourceName` | string | The full resource name of the resource the TagBindings are bound to. E.g. `//cloudresourcemanager.googleapis.com/projects/123` |
| `name` | string | Identifier. The name of the EffectiveTagBindingCollection, following the convention: `locations/{location}/effectiveTagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the GCP resource the TagBindings are bound to. E.g. "locations/global/effectiveTagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123" |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v3

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FetchResourceSemanticsResponse`

- Response message for FetchResourceSemantics.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | The full resource name for which semantics are returned. Examples: "//compute.googleapis.com/projects/123/zones/us-central1-a/instances/my-instance" "//storage.googleapis.com/projects/\_/buckets/my_bucket" |
| `semantics` | object | Map of resource semantics (e.g., `"ENVIRONMENT": "PRODUCTION"`). |

### `Folder`

- A folder in an organization's resource hierarchy, used to organize that organization's resources.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `configuredCapabilities` | array<string> | Output only. Optional capabilities configured for this folder (via UpdateCapability API). Example: `folders/123/capabilities/app-management`. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the folder was created. |
| `deleteTime` | string (google-datetime) | Output only. Timestamp when the folder was requested to be deleted. |
| `displayName` | string | The folder's display name. A folder's display name must be unique amongst its siblings. For example, no two folders with the same parent can share the same display name. The display name must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be no longer than 30 characters. This is captured by the regular expression: `[\p{L}\p{N}]([\p{L}\p{N}_- ]{0,28}[\p{L}\p{N}])?`. |
| `etag` | string | Output only. A checksum computed by the server based on the current value of the folder resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `managementProject` | string | Output only. Management Project associated with this folder (if app-management capability is enabled). Example: `projects/google-mp-123` OUTPUT ONLY. |
| `name` | string | Identifier. The resource name of the folder. Its format is `folders/{folder_id}`, for example: "folders/1234". |
| `parent` | string | Required. The folder's parent's resource name. Updates to the folder's parent must be performed using MoveFolder. |
| `state` | string enum | Output only. The lifecycle state of the folder. Updates to the state must be performed using DeleteFolder and UndeleteFolder. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this folder. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the folder was last modified. |

### `Folder` (v2)

- A Folder in an Organization's resource hierarchy, used to organize that Organization's resources.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `configuredCapabilities` | array<string> | Output only. Optional capabilities configured for this folder (via UpdateCapability API). Example: `folders/123/capabilities/app-management`. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the Folder was created. Assigned by the server. |
| `displayName` | string | The folder's display name. A folder's display name must be unique amongst its siblings, e.g. no two folders with the same parent can share the same display name. The display name must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be no longer than 30 characters. This is captured by the regular expression: `[\p{L}\p{N}]([\p{L}\p{N}_- ]{0,28}[\p{L}\p{N}])?`. |
| `lifecycleState` | string enum | Output only. The lifecycle state of the folder. Updates to the lifecycle_state must be performed via DeleteFolder and UndeleteFolder. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`. |
| `managementProject` | string | Output only. Management Project associated with this folder (if app-management capability is enabled). Example: `projects/google-mp-123` OUTPUT ONLY. |
| `name` | string | Output only. The resource name of the Folder. Its format is `folders/{folder_id}`, for example: "folders/1234". |
| `parent` | string | Required. The Folder's parent's resource name. Updates to the folder's parent must be performed via MoveFolder. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this folder. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. |

### `FolderOperation`

- Metadata describing a long running folder operation
- Version: v3

| Field | Type | Description |
|---|---|---|
| `destinationParent` | string | The resource name of the folder or organization we are either creating the folder under or moving the folder to. |
| `displayName` | string | The display name of the folder. |
| `operationType` | string enum | The type of this operation. Values: `OPERATION_TYPE_UNSPECIFIED`, `CREATE`, `MOVE`. |
| `sourceParent` | string | The resource name of the folder's parent. Only applicable when the operation_type is MOVE. |

### `FolderOperationError`

- A classification of the Folder Operation error.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `errorMessageId` | string enum | The type of operation error experienced. Values: `ERROR_TYPE_UNSPECIFIED`, `ACTIVE_FOLDER_HEIGHT_VIOLATION`, `MAX_CHILD_FOLDERS_VIOLATION`, `FOLDER_NAME_UNIQUENESS_VIOLATION`, `RESOURCE_DELETED_VIOLATION`, `PARENT_DELETED_VIOLATION`, `CYCLE_INTRODUCED_VIOLATION`, `FOLDER_BEING_MOVED_VIOLATION`, `FOLDER_TO_DELETE_NON_EMPTY_VIOLATION`, `DELETED_FOLDER_HEIGHT_VIOLATION`, `FOLDER_TO_DELETE_CONFIGURED_CAPABILITY_VIOLATION`. |

### `GetAncestryRequest`

- The request sent to the GetAncestry method.
- Version: v1

### `GetAncestryResponse`

- Response from the projects.getAncestry method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestor` | array<Ancestor> | Ancestors are ordered from bottom to top of the resource hierarchy. The first ancestor is the project itself, followed by the project's parent, etc.. |

### `GetEffectiveOrgPolicyRequest`

- The request sent to the GetEffectiveOrgPolicy method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraint` | string | The name of the `Constraint` to compute the effective `Policy`. |

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetOrgPolicyRequest`

- The request sent to the GetOrgPolicy method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraint` | string | Name of the `Constraint` to get the `Policy`. |

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Lien`

- A Lien represents an encumbrance on the actions that can be performed on a resource.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The creation time of this Lien. |
| `name` | string | A system-generated unique identifier for this Lien. Example: `liens/1234abcd` |
| `origin` | string | A stable, user-visible/meaningful string identifying the origin of the Lien, intended to be inspected programmatically. Maximum length of 200 characters. Example: 'compute.googleapis.com' |
| `parent` | string | A reference to the resource this Lien is attached to. The server will validate the parent against those for which Liens are supported. Example: `projects/1234` |
| `reason` | string | Concise user-visible strings indicating why an action cannot be performed on a resource. Maximum length of 200 characters. Example: 'Holds production API key' |
| `restrictions` | array<string> | The types of operations which should be blocked as a result of this Lien. Each value should correspond to an IAM permission. The server will validate the permissions against those for which Liens are supported. An empty list is meaningless and will be rejected. Example: \['resourcemanager.projects.delete'\] |

### `ListAvailableOrgPolicyConstraintsRequest`

- The request sent to the `ListAvailableOrgPolicyConstraints` method on the project, folder, or organization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. |
| `pageToken` | string | Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. |

### `ListAvailableOrgPolicyConstraintsResponse`

- The response returned from the `ListAvailableOrgPolicyConstraints` method. Returns all `Constraints` that could be set at this level of the hierarchy (contrast with the response from `ListPolicies`, which returns all policies which are set).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraints` | array<Constraint> | The collection of constraints that are settable on the request resource. |
| `nextPageToken` | string | Page token used to retrieve the next page. This is currently not used. |

### `ListBoundariesResponse`

- A page of the response received from the ListBoundaries method. A paginated response where more pages are available has `next_page_token` set. This token can be used in a subsequent request to retrieve the next page. NOTE: A response may contain fewer elements than the request `page_size` and still have a `next_page_token`.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `boundaries` | array<Boundary> | The list of Boundaries under the parent. This list can be paginated. |
| `nextPageToken` | string | Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. |

### `ListCapabilityConfigsResponse`

- A page of the response received from the ListCapabilityConfigs method. A paginated response where more pages are available has `next_page_token` set. This token can be used in a subsequent request to retrieve the next page. NOTE: A response may contain fewer elements than the request `page_size` and still have a `next_page_token`.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `capabilityConfigs` | array<CapabilityConfig> | The list of CapabilityConfigs under the parent. This list can be paginated. |
| `nextPageToken` | string | Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. |

### `ListConstraint`

- A `Constraint` that allows or disallows a list of string values, which are configured by an Organization's policy administrator with a `Policy`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `suggestedValue` | string | Optional. The Google Cloud Console will try to default to a configuration that matches the value specified in this `Constraint`. |
| `supportsUnder` | boolean | Indicates whether subtrees of Cloud Resource Manager resource hierarchy can be used in `Policy.allowed_values` and `Policy.denied_values`. For example, `"under:folders/123"` would match any resource under the 'folders/123' folder. |

### `ListEffectiveTagsResponse`

- The response of ListEffectiveTags.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `effectiveTags` | array<EffectiveTag> | A possibly paginated list of effective tags for the specified resource. |
| `nextPageToken` | string | Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. |

### `ListFoldersResponse`

- The ListFolders response message.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `folders` | array<Folder> | A possibly paginated list of folders that are direct descendants of the specified parent resource. |
| `nextPageToken` | string | A pagination token returned from a previous call to `ListFolders` that indicates from where listing should continue. |

### `ListLiensResponse`

- The response message for Liens.ListLiens.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `liens` | array<Lien> | A list of Liens. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `ListOrgPoliciesRequest`

- The request sent to the ListOrgPolicies method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | Size of the pages to be returned. This is currently unsupported and will be ignored. The server may at any point start using this field to limit page size. |
| `pageToken` | string | Page token used to retrieve the next page. This is currently unsupported and will be ignored. The server may at any point start using this field. |

### `ListOrgPoliciesResponse`

- The response returned from the `ListOrgPolicies` method. It will be empty if no `Policies` are set on the resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Page token used to retrieve the next page. This is currently not used, but the server may at any point start supplying a valid token. |
| `policies` | array<OrgPolicy> | The `Policies` that are set on the resource. It will be empty if no `Policies` are set. |

### `ListOrganizationsResponse`

- The response returned from the `ListOrganizations` method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A pagination token to be used to retrieve the next page of results. If the result is too large to fit within the page size specified in the request, this field will be set with a token that can be used to fetch the next page of results. If this field is empty, it indicates that this response contains the last page of results. |
| `organizations` | array<Organization> | The list of Organizations that matched the list query, possibly paginated. |

### `ListPolicy`

- Used in `policy_type` to specify how `list_policy` behaves at this resource. `ListPolicy` can define specific values and subtrees of Cloud Resource Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or denied by setting the `allowed_values` and `denied_values` fields. This is achieved by using the `under:` and optional `is:` prefixes. The `under:` prefix is used to denote resource subtree values. The `is:` prefix is used to denote specific values, and is required only if the value contains a ":". Values prefixed with "is:" are treated the same as values with no prefix. Ancestry subtrees must be in one of the following formats: - "projects/", e.g. "projects/tokyo-rain-123" - "folders/", e.g. "folders/1234" - "organizations/", e.g. "organizations/1234" The `supports_under` field of the associated `Constraint` defines whether ancestry prefixes can be used. You can set `allowed_values` and `denied_values` in the same `Policy` if `all_values` is `ALL_VALUES_UNSPECIFIED`. `ALLOW` or `DENY` are used to allow or deny all values. If `all_values` is set to either `ALLOW` or `DENY`, `allowed_values` and `denied_values` must be unset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allValues` | string enum | The policy all_values state. Values: `ALL_VALUES_UNSPECIFIED`, `ALLOW`, `DENY`. |
| `allowedValues` | array<string> | List of values allowed at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. |
| `deniedValues` | array<string> | List of values denied at this resource. Can only be set if `all_values` is set to `ALL_VALUES_UNSPECIFIED`. |
| `inheritFromParent` | boolean | Determines the inheritance behavior for this `Policy`. By default, a `ListPolicy` set at a resource supersedes any `Policy` set anywhere up the resource hierarchy. However, if `inherit_from_parent` is set to `true`, then the values from the effective `Policy` of the parent resource are inherited, meaning the values set in this `Policy` are added to the values inherited up the hierarchy. Setting `Policy` hierarchies that inherit both allowed values and denied values isn't recommended in most circumstances to keep the configuration simple and understandable. However, it is possible to set a `Policy` with `allowed_values` set that inherits a `Policy` with `denied_values` set. In this case, the values that are allowed must be in `allowed_values` and not present in `denied_values`. For example, suppose you have a `Constraint` `constraints/serviceuser.services`, which has a `constraint_type` of `list_constraint`, and with `constraint_default` set to `ALLOW`. Suppose that at the Organization level, a `Policy` is applied that restricts the allowed API activations to {`E1`, `E2`}. Then, if a `Policy` is applied to a project below the Organization that has `inherit_from_parent` set to `false` and field all_values set to DENY, then an attempt to activate any API will be denied. The following examples demonstrate different possible layerings for `projects/bar` parented by `organizations/foo`: Example 1 (no inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has `inherit_from_parent` `false` and values: {allowed_values: "E3" allowed_values: "E4"} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E3`, and `E4`. Example 2 (inherited values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {value: "E3" value: "E4" inherit_from_parent: true} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are `E1`, `E2`, `E3`, and `E4`. Example 3 (inheriting both allowed and denied values): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {denied_values: "E1"} The accepted values at `organizations/foo` are `E1`, `E2`. The value accepted at `projects/bar` is `E2`. Example 4 (RestoreDefault): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"} `projects/bar` has a `Policy` with values: {RestoreDefault: {}} The accepted values at `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar` are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 5 (no policy inherits parent policy): `organizations/foo` has no `Policy` set. `projects/bar` has no `Policy` set. The accepted values at both levels are either all or none depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 6 (ListConstraint allowing all): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: ALLOW} The accepted values at `organizations/foo` are `E1`, E2`. Any value is accepted at `projects/bar`. Example 7 (ListConstraint allowing none): `organizations/foo` has a `Policy` with values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a `Policy` with: {all: DENY} The accepted values at `organizations/foo` are `E1`, E2`. No value is accepted at `projects/bar`. Example 10 (allowed and denied subtrees of Resource Manager hierarchy): Given the following resource hierarchy O1->{F1, F2}; F1->{P1}; F2->{P2, P3}, `organizations/foo` has a `Policy` with values: {allowed_values: "under:organizations/O1"} `projects/bar` has a `Policy` with: {allowed_values: "under:projects/P3"} {denied_values: "under:folders/F2"} The accepted values at `organizations/foo` are `organizations/O1`, `folders/F1`, `folders/F2`, `projects/P1`, `projects/P2`, `projects/P3`. The accepted values at `projects/bar` are `organizations/O1`, `folders/F1`, `projects/P1`. |
| `suggestedValue` | string | Optional. The Google Cloud Console will try to default to a configuration that matches the value specified in this `Policy`. If `suggested_value` is not set, it will inherit the value specified higher in the hierarchy, unless `inherit_from_parent` is `false`. |

### `ListProjectsResponse`

- A page of the response received from the ListProjects method. A paginated response where more pages are available has `next_page_token` set. This token can be used in a subsequent request to retrieve the next request page. NOTE: A response may contain fewer elements than the request `page_size` and still have a `next_page_token`.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. |
| `projects` | array<Project> | The list of Projects under the parent. This list can be paginated. |

### `ListTagBindingsResponse`

- The ListTagBindings response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. |
| `tagBindings` | array<TagBinding> | A possibly paginated list of TagBindings for the specified resource. |

### `ListTagHoldsResponse`

- The ListTagHolds response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. |
| `tagHolds` | array<TagHold> | A possibly paginated list of TagHolds. |

### `ListTagKeysResponse`

- The ListTagKeys response message.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A pagination token returned from a previous call to `ListTagKeys` that indicates from where listing should continue. |
| `tagKeys` | array<TagKey> | List of TagKeys that live under the specified parent in the request. |

### `ListTagValuesResponse`

- The ListTagValues response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A pagination token returned from a previous call to `ListTagValues` that indicates from where listing should continue. |
| `tagValues` | array<TagValue> | A possibly paginated list of TagValues that are direct descendants of the specified parent TagKey. |

### `MoveFolderMetadata`

- Metadata pertaining to the folder move process.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `destinationParent` | string | The resource name of the folder or organization to move the folder to. |
| `displayName` | string | The display name of the folder. |
| `sourceParent` | string | The resource name of the folder's parent. |

### `MoveFolderRequest`

- The MoveFolder request message.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `destinationParent` | string | Required. The resource name of the folder or organization which should be the folder's new parent. Must be of the form `folders/{folder_id}` or `organizations/{org_id}`. |

### `MoveProjectMetadata`

- A status object which is used as the `metadata` field for the Operation returned by MoveProject.
- Version: v3

### `MoveProjectRequest`

- The request sent to MoveProject method.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `destinationParent` | string | Required. The new parent to move the Project under. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OrgPolicy`

- Defines a Cloud Organization `Policy` which is used to specify `Constraints` for configurations of Cloud Platform resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `booleanPolicy` | BooleanPolicy | For boolean `Constraints`, whether to enforce the `Constraint` or not. |
| `constraint` | string | The name of the `Constraint` the `Policy` is configuring, for example, `constraints/serviceuser.services`. A list of available constraints is available. Immutable after creation. |
| `etag` | string (byte) | An opaque tag indicating the current version of the `Policy`, used for concurrency control. When the `Policy` is returned from either a `GetPolicy` or a `ListOrgPolicy` request, this `etag` indicates the version of the current `Policy` to use when executing a read-modify-write loop. When the `Policy` is returned from a `GetEffectivePolicy` request, the `etag` will be unset. When the `Policy` is used in a `SetOrgPolicy` method, use the `etag` value that was returned from a `GetOrgPolicy` request as part of a read-modify-write loop for concurrency control. Not setting the `etag`in a `SetOrgPolicy` request will result in an unconditional write of the `Policy`. |
| `listPolicy` | ListPolicy | List of values either allowed or disallowed. |
| `restoreDefault` | RestoreDefault | Restores the default behavior of the constraint; independent of `Constraint` type. |
| `updateTime` | string (google-datetime) | The time stamp the `Policy` was previously updated. This is set by the server, not specified by the caller, and represents the last time a call to `SetOrgPolicy` was made for that `Policy`. Any value set by the client will be ignored. |
| `version` | integer (int32) | Version of the `Policy`. Default version is 0; |

### `Organization`

- The root node in the resource hierarchy to which a particular entity's (a company, for example) resources belong.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Timestamp when the Organization was created. |
| `deleteTime` | string (google-datetime) | Output only. Timestamp when the Organization was requested for deletion. |
| `directoryCustomerId` | string | Immutable. The G Suite / Workspace customer id used in the Directory API. |
| `displayName` | string | Output only. A human-readable string that refers to the organization in the Google Cloud Console. This string is set by the server and cannot be changed. The string will be set to the primary domain (for example, "google.com") of the Google Workspace customer that owns the organization. |
| `etag` | string | Output only. A checksum computed by the server based on the current value of the Organization resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `name` | string | Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/\[organization_id\]". For example, "organizations/1234". |
| `state` | string enum | Output only. The organization's current lifecycle state. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the Organization was last modified. |

### `Organization` (v1)

- The root node in the resource hierarchy to which a particular entity's (e.g., company) resources belong.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTime` | string (google-datetime) | Timestamp when the Organization was created. Assigned by the server. |
| `displayName` | string | A human-readable string that refers to the Organization in the Google Cloud console. This string is set by the server and cannot be changed. The string will be set to the primary domain (for example, "google.com") of the G Suite customer that owns the organization. |
| `lifecycleState` | string enum | The organization's current lifecycle state. Assigned by the server. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`. |
| `name` | string | Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/\[organization_id\]". For example, "organizations/1234". |
| `owner` | OrganizationOwner | The owner of this Organization. The owner should be specified on creation. Once set, it cannot be changed. This field is required. |

### `Organization` (v1beta1)

- The root node in the resource hierarchy to which a particular entity's (e.g., company) resources belong.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `creationTime` | string (google-datetime) | Timestamp when the Organization was created. Assigned by the server. |
| `displayName` | string | A human-readable string that refers to the Organization in the Google Cloud console. This string is set by the server and cannot be changed. The string will be set to the primary domain (for example, "google.com") of the G Suite customer that owns the organization. |
| `lifecycleState` | string enum | The organization's current lifecycle state. Assigned by the server. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`. |
| `name` | string | Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/\[organization_id\]". For example, "organizations/1234". |
| `organizationId` | string | An immutable id for the Organization that is assigned on creation. This should be omitted when creating a new Organization. This field is read-only. |
| `owner` | OrganizationOwner | The owner of this Organization. The owner should be specified on creation. Once set, it cannot be changed. This field is required. |

### `OrganizationOwner`

- The entity that owns an Organization. The lifetime of the Organization and all of its descendants are bound to the `OrganizationOwner`. If the `OrganizationOwner` is deleted, the Organization and all its descendants will be deleted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `directoryCustomerId` | string | The G Suite customer id used in the Directory API. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Project`

- A project is a high-level Google Cloud entity. It is a container for ACLs, APIs, App Engine Apps, VMs, and other Google Cloud Platform resources.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `configuredCapabilities` | array<string> | Output only. If this project is a Management Project, list of capabilities configured on the parent folder. Note, presence of any capability implies that this is a Management Project. Example: `folders/123/capabilities/app-management`. OUTPUT ONLY. |
| `createTime` | string (google-datetime) | Output only. Creation time. |
| `deleteTime` | string (google-datetime) | Output only. The time at which this resource was requested for deletion. |
| `displayName` | string | Optional. A user-assigned display name of the project. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Project` |
| `etag` | string | Output only. A checksum computed by the server based on the current value of the Project resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `isManagementProject` | boolean | Output only. If `true`, this project is a Management Project. A Management Project manages dedicated project groups for specific purposes (e.g., agent management or app management). |
| `labels` | object | Optional. The labels associated with this project. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: \\[a-z\\](\\[-a-z0-9\\]\*\\[a-z0-9\\])?. Label values must be between 0 and 63 characters long and must conform to the regular expression (\\[a-z\\](\\[-a-z0-9\\]\*\\[a-z0-9\\])?)?. No more than 64 labels can be associated with a given resource. Clients should store labels in a representation such as JSON that does not depend on specific characters being disallowed. Example: `"myBusinessDimension" : "businessValue"` |
| `managementType` | string enum | Output only. The type of Management Project. This field is only populated if `is_management_project` is `true`. Values: `MANAGEMENT_TYPE_UNSPECIFIED`, `SELF_MANAGED`, `HUB`. |
| `name` | string | Output only. The unique resource name of the project. It is an int64 generated number prefixed by "projects/". Example: `projects/415104041262` |
| `parent` | string | Optional. A reference to a parent Resource. eg., `organizations/123` or `folders/876`. |
| `projectId` | string | Immutable. The unique, user-assigned id of the project. It must be 6 to 30 lowercase ASCII letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `tokyo-rain-123` |
| `state` | string enum | Output only. The project lifecycle state. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this project. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. |
| `updateTime` | string (google-datetime) | Output only. The most recent time this resource was modified. |

### `Project` (v1)

- A Project is a high-level Google Cloud Platform entity. It is a container for ACLs, APIs, App Engine Apps, VMs, and other Google Cloud Platform resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configuredCapabilities` | array<string> | Output only. If this project is a Management Project, list of capabilities configured on the parent folder. Note, presence of any capability implies that this is a Management Project. Example: `folders/123/capabilities/app-management`. OUTPUT ONLY. |
| `createTime` | string (google-datetime) | Creation time. Read-only. |
| `isManagementProject` | boolean | Output only. If `true`, this project is a Management Project. A Management Project manages dedicated project groups for specific purposes (e.g., agent management or app management). |
| `labels` | object | The labels associated with this Project. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: a-z{0,62}. Label values must be between 0 and 63 characters long and must conform to the regular expression \[a-z0-9\_-\]{0,63}. A label value can be empty. No more than 256 labels can be associated with a given resource. Clients should store labels in a representation such as JSON that does not depend on specific characters being disallowed. Example: "environment" : "dev" Read-write. |
| `lifecycleState` | string enum | The Project lifecycle state. Read-only. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`, `DELETE_IN_PROGRESS`. |
| `managementType` | string enum | Output only. The type of Management Project. This field is only populated if `is_management_project` is `true`. Values: `MANAGEMENT_TYPE_UNSPECIFIED`, `SELF_MANAGED`, `HUB`. |
| `name` | string | The optional user-assigned display name of the Project. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Project` Read-write. |
| `parent` | ResourceId | An optional reference to a parent Resource. Supported parent types include "organization" and "folder". Once set, the parent cannot be cleared. The `parent` can be set on creation or using the `UpdateProject` method; the end user must have the `resourcemanager.projects.create` permission on the parent. |
| `projectId` | string | The unique, user-assigned ID of the Project. It must be 6 to 30 lowercase letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `tokyo-rain-123` Read-only after creation. |
| `projectNumber` | string (int64) | The number uniquely identifying the project. Example: `415104041262` Read-only. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this project. Each item in the map must be expressed as " : ". For example: "123/environment" : "production", "123/costCenter" : "marketing" Note: Currently this field is in Preview. |

### `Project` (v1beta1)

- A Project is a high-level Google Cloud Platform entity. It is a container for ACLs, APIs, App Engine Apps, VMs, and other Google Cloud Platform resources.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `configuredCapabilities` | array<string> | Output only. If this project is a Management Project, list of capabilities configured on the parent folder. Note, presence of any capability implies that this is a Management Project. Example: `folders/123/capabilities/app-management`. OUTPUT ONLY. |
| `createTime` | string (google-datetime) | Creation time. Read-only. |
| `isManagementProject` | boolean | Output only. If `true`, this project is a Management Project. A Management Project manages dedicated project groups for specific purposes (e.g., agent management or app management). |
| `labels` | object | The labels associated with this Project. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: a-z{0,62}. Label values must be between 0 and 63 characters long and must conform to the regular expression \[a-z0-9\_-\]{0,63}. A label value can be empty. No more than 256 labels can be associated with a given resource. Clients should store labels in a representation such as JSON that does not depend on specific characters being disallowed. Example: `"environment" : "dev"` Read-write. |
| `lifecycleState` | string enum | The Project lifecycle state. Read-only. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `ACTIVE`, `DELETE_REQUESTED`, `DELETE_IN_PROGRESS`. |
| `managementType` | string enum | Output only. The type of Management Project. This field is only populated if `is_management_project` is `true`. Values: `MANAGEMENT_TYPE_UNSPECIFIED`, `SELF_MANAGED`, `HUB`. |
| `name` | string | The optional user-assigned display name of the Project. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Project` Read-write. |
| `parent` | ResourceId | An optional reference to a parent Resource. Supported parent types include "organization" and "folder". Once set, the parent cannot be cleared. The `parent` can be set on creation or using the `UpdateProject` method; the end user must have the `resourcemanager.projects.create` permission on the parent. Read-write. |
| `projectId` | string | The unique, user-assigned ID of the Project. It must be 6 to 30 lowercase letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `tokyo-rain-123` Read-only after creation. |
| `projectNumber` | string (int64) | The number uniquely identifying the project. Example: `415104041262` Read-only. |

### `ProjectCreationStatus`

- A status object which is used as the `metadata` field for the Operation returned by CreateProject. It provides insight for when significant phases of Project creation have completed.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Creation time of the project creation workflow. |
| `gettable` | boolean | True if the project can be retrieved using GetProject. No other operations on the project are guaranteed to work until the project creation is complete. |
| `ready` | boolean | True if the project creation process is complete. |

### `ResourceFilter`

- Filter to define the criteria for including projects in the Boundary.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `tagFilter` | TagFilter | A tag based filter. A project must match it to be included. |

### `ResourceId`

- A container to reference an id for any resource type. A `resource` in Google Cloud Platform is a generic term for something you (a developer) may want to interact with through one of our API's. Some examples are an App Engine app, a Compute Engine instance, a Cloud SQL database, and so on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The type-specific id. This should correspond to the id used in the type-specific API's. |
| `type` | string | The resource type this id is for. At present, the valid types are: "organization", "folder", and "project". |

### `RestoreDefault`

- Ignores policies set above this resource and restores the `constraint_default` enforcement behavior of the specific `Constraint` at this resource. Suppose that `constraint_default` is set to `ALLOW` for the `Constraint` `constraints/serviceuser.services`. Suppose that organization foo.com sets a `Policy` at their Organization resource node that restricts the allowed service activations to deny all service activations. They could then set a `Policy` with the `policy_type` `restore_default` on several experimental projects, restoring the `constraint_default` enforcement of the `Constraint` for only those projects, allowing those projects to have all services activated.
- Version: v1

### `SearchFoldersRequest`

- The request message for searching folders.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | Optional. The maximum number of folders to return in the response. The server can return fewer folders than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | string | Optional. A pagination token returned from a previous call to `SearchFolders` that indicates from where search should continue. |
| `query` | string | Search criteria used to select the Folders to return. If no search criteria is specified then all accessible folders will be returned. Query expressions can be used to restrict results based upon displayName, lifecycleState and parent, where the operators `=`, `NOT`, `AND` and `OR` can be used along with the suffix wildcard symbol `*`. The displayName field in a query expression should use escaped quotes for values that include whitespace to prevent unexpected behavior. Some example queries are: \* Query `displayName=Test*` returns Folder resources whose display name starts with "Test". \* Query `lifecycleState=ACTIVE` returns Folder resources with `lifecycleState` set to `ACTIVE`. \* Query `parent=folders/123` returns Folder resources that have `folders/123` as a parent resource. \* Query `parent=folders/123 AND lifecycleState=ACTIVE` returns active Folder resources that have `folders/123` as a parent resource. \* Query `displayName=\\"Test String\\"` returns Folder resources with display names that include both "Test" and "String". |

### `SearchFoldersResponse`

- The response message for searching folders.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `folders` | array<Folder> | A possibly paginated folder search results. the specified parent resource. |
| `nextPageToken` | string | A pagination token returned from a previous call to `SearchFolders` that indicates from where searching should continue. |

### `SearchOrganizationsRequest`

- The request sent to the `SearchOrganizations` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | An optional query string used to filter the Organizations to return in the response. Filter rules are case-insensitive. Organizations may be filtered by `owner.directoryCustomerId` or by `domain`, where the domain is a verified G Suite domain, for example: \* Filter `owner.directorycustomerid:123456789` returns Organization resources with `owner.directory_customer_id` equal to `123456789`. \* Filter `domain:google.com` returns Organization resources corresponding to the domain `google.com`. This field is optional. |
| `pageSize` | integer (int32) | The maximum number of Organizations to return in the response. The server can return fewer organizations than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | string | A pagination token returned from a previous call to `SearchOrganizations` that indicates from where listing should continue. This field is optional. |

### `SearchOrganizationsResponse`

- The response returned from the `SearchOrganizations` method.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A pagination token to be used to retrieve the next page of results. If the result is too large to fit within the page size specified in the request, this field will be set with a token that can be used to fetch the next page of results. If this field is empty, it indicates that this response contains the last page of results. |
| `organizations` | array<Organization> | The list of Organizations that matched the search query, possibly paginated. |

### `SearchProjectsResponse`

- A page of the response received from the SearchProjects method. A paginated response where more pages are available has `next_page_token` set. This token can be used in a subsequent request to retrieve the next request page.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pagination token. If the result set is too large to fit in a single response, this token is returned. It encodes the position of the current result cursor. Feeding this value into a new list request with the `page_token` parameter gives the next page of the results. When `next_page_token` is not filled in, there is no next page and the list returned is the last page in the result set. Pagination tokens have a limited lifetime. |
| `projects` | array<Project> | The list of Projects that matched the list filter query. This list can be paginated. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SetOrgPolicyRequest`

- The request sent to the SetOrgPolicyRequest method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | OrgPolicy | `Policy` to set on the resource. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TagBinding`

- A TagBinding represents a connection between a TagValue and a cloud resource. When a TagBinding is created, the TagValue is applied to all the descendants of the Google Cloud resource.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The name of the TagBinding. This is a String of the form: `tagBindings/{full-resource-name}/{tag-value-name}` (e.g. `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagValues/456`) or `tagBindings/{full-resource-name}/{tag-key-name}` (e.g. `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagKeys/123`). |
| `parent` | string | The full resource name of the resource the TagValue is bound to. E.g. `//cloudresourcemanager.googleapis.com/projects/123` |
| `tagValue` | string | The TagValue of the TagBinding. Must be of the form `tagValues/456`. |
| `tagValueNamespacedName` | string | The namespaced name for the TagValue of the TagBinding. Must be in the format `{parent_id}/{tag_key_short_name}/{short_name}`. For methods that support TagValue namespaced name, only one of tag_value_namespaced_name or tag_value may be filled. Requests with both fields will be rejected. |

### `TagBindingCollection`

- Represents a collection of tags directly bound to a GCP resource.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. A checksum based on the current bindings which can be passed to prevent race conditions. This field is always set in server responses. |
| `fullResourceName` | string | The full resource name of the resource the TagBindings are bound to. E.g. `//cloudresourcemanager.googleapis.com/projects/123` |
| `name` | string | Identifier. The name of the TagBindingCollection, following the convention: `locations/{location}/tagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the GCP resource the TagBindings are bound to. "locations/global/tagBindingCollections/%2f%2fcloudresourcemanager.googleapis.com%2fprojects%2f123" |
| `tags` | object | Tag keys/values directly bound to this resource, specified in namespaced format. For example: "123/environment": "production" |

### `TagFilter`

- Matches projects based on a specific tag key and a specific tag value.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `tagKey` | string | Required. Immutable. The namespaced name of the tag key. Format: `{parent_id}/{tag_key_short_name}` Example: `123456789012/env` (where 123456789012 is the organization ID). |
| `tagValue` | string | Required. The allowed value for the tag key. A project matches this tag filter if its effective tag value for the given `tag_key` matches this value. Format: short name of the tag value. Example: `production` or `staging`. |

### `TagHold`

- A TagHold represents the use of a TagValue that is not captured by TagBindings. If a TagValue has any TagHolds, deletion will be blocked. This resource is intended to be created in the same cloud location as the `holder`.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time this TagHold was created. |
| `helpLink` | string | Optional. A URL where an end user can learn more about removing this hold. E.g. `https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing` |
| `holder` | string | Required. The name of the resource where the TagValue is being used. Must be less than 200 characters. E.g. `//compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group` |
| `name` | string | Output only. The resource name of a TagHold. This is a String of the form: `tagValues/{tag-value-id}/tagHolds/{tag-hold-id}` (e.g. `tagValues/123/tagHolds/456`). This resource name is generated by the server. |
| `origin` | string | Optional. An optional string representing the origin of this request. This field should include human-understandable information to distinguish origins from each other. Must be less than 200 characters. E.g. `migs-35678234` |

### `TagKey`

- A TagKey, used to group a set of TagValues.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `allowedValuesRegex` | string | Optional. Regular expression constraint for freeform tag values. If present, it implicitly allows freeform values (constrained by the regex). |
| `createTime` | string (google-datetime) | Output only. Creation time. |
| `description` | string | Optional. User-assigned description of the TagKey. Must not exceed 256 characters. Read-write. |
| `etag` | string | Optional. Entity tag which users can pass to prevent race conditions. This field is always set in server responses. See UpdateTagKeyRequest for details. |
| `name` | string | Immutable. The resource name for a TagKey. Must be in the format `tagKeys/{tag_key_id}`, where `tag_key_id` is the generated numeric id for the TagKey. |
| `namespacedName` | string | Output only. Immutable. Namespaced name of the TagKey. |
| `parent` | string | Immutable. The resource name of the TagKey's parent. A TagKey can be parented by an Organization or a Project. For a TagKey parented by an Organization, its parent must be in the form `organizations/{org_id}`. For a TagKey parented by a Project, its parent can be in the form `projects/{project_id}` or `projects/{project_number}`. |
| `purpose` | string enum | Optional. A purpose denotes that this Tag is intended for use in policies of a specific policy engine, and will involve that policy engine in management operations involving this Tag. A purpose does not grant a policy engine exclusive rights to the Tag, and it may be referenced by other policy engines. A purpose cannot be changed once set. Values: `PURPOSE_UNSPECIFIED`, `GCE_FIREWALL`, `DATA_GOVERNANCE`. |
| `purposeData` | object | Optional. Purpose data corresponds to the policy system that the tag is intended for. See documentation for `Purpose` for formatting of this field. Purpose data cannot be changed once set. |
| `shortName` | string | Required. Immutable. The user friendly name for a TagKey. The short name should be unique for TagKeys within the same tag namespace. The short name must be 1-256 characters, beginning and ending with an alphanumeric character (\[a-z0-9A-Z\]) with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `updateTime` | string (google-datetime) | Output only. Update time. |

### `TagValue`

- A TagValue is a child of a particular TagKey. This is used to group cloud resources for the purpose of controlling them using policies.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Creation time. |
| `description` | string | Optional. User-assigned description of the TagValue. Must not exceed 256 characters. Read-write. |
| `etag` | string | Optional. Entity tag which users can pass to prevent race conditions. This field is always set in server responses. See UpdateTagValueRequest for details. |
| `name` | string | Immutable. Resource name for TagValue in the format `tagValues/456`. |
| `namespacedName` | string | Output only. The namespaced name of the TagValue. Can be in the form `{organization_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_id}/{tag_key_short_name}/{tag_value_short_name}` or `{project_number}/{tag_key_short_name}/{tag_value_short_name}`. |
| `parent` | string | Immutable. The resource name of the new TagValue's parent TagKey. Must be of the form `tagKeys/{tag_key_id}`. |
| `shortName` | string | Required. Immutable. User-assigned short name for TagValue. The short name should be unique for TagValues within the same parent TagKey. The short name must be 256 characters or less, beginning and ending with an alphanumeric character (\[a-z0-9A-Z\]) with dashes (-), underscores (\_), dots (.), and alphanumerics between. |
| `updateTime` | string (google-datetime) | Output only. Update time. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `UndeleteFolderMetadata`

- A status object which is used as the `metadata` field for the `Operation` returned by `UndeleteFolder`.
- Version: v3

### `UndeleteFolderRequest`

- The UndeleteFolder request message.
- Version: v3

### `UndeleteOrganizationMetadata`

- A status object which is used as the `metadata` field for the Operation returned by UndeleteOrganization.
- Version: v3

### `UndeleteProjectMetadata`

- A status object which is used as the `metadata` field for the Operation returned by `UndeleteProject`.
- Version: v3

### `UndeleteProjectRequest`

- The request sent to the UndeleteProject method.
- Version: v3

### `UpdateBoundaryConfigMetadata`

- A status object which is used as the `metadata` field for the Operation returned by UpdateBoundaryConfig. Currently empty.
- Version: v3

### `UpdateBoundaryMetadata`

- A status object which is used as the `metadata` field for the Operation returned by UpdateBoundary. Currently empty.
- Version: v3

### `UpdateCapabilityConfigMetadata`

- A status object which is used as the `metadata` field for the Operation returned by UpdateCapabilityConfig. Currently empty.
- Version: v3

### `UpdateFolderMetadata`

- A status object which is used as the `metadata` field for the Operation returned by UpdateFolder.
- Version: v3

### `UpdateProjectMetadata`

- A status object which is used as the `metadata` field for the Operation returned by UpdateProject.
- Version: v3

### `UpdateTagKeyMetadata`

- Runtime operation information for updating a TagKey.
- Version: v3

### `UpdateTagValueMetadata`

- Runtime operation information for updating a TagValue.
- Version: v3

### Shape of `Ancestor`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "resourceId": "ResourceId"
}
```

## Notes

- Generated from the Discovery document(s) v3, v2, v1, v1beta1 of `cloudresourcemanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v3, https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v2, https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v1, https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
