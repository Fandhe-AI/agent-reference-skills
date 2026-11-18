---
source: https://accesscontextmanager.googleapis.com/$discovery/rest?version=v1
---

# Access Context Manager API message schemas (accesscontextmanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/accesscontextmanager/`.

### `AccessContextManagerOperationMetadata`

- Metadata of Access Context Manager's Long Running Operations.
- Version: v1

### `AccessLevel`

- An `AccessLevel` is a label that can be applied to requests to Google Cloud services, along with a list of requirements necessary for the label to be applied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `basic` | BasicLevel | A `BasicLevel` composed of `Conditions`. |
| `custom` | CustomLevel | A `CustomLevel` written in the Common Expression Language. |
| `description` | string | Description of the `AccessLevel` and its use. Does not affect behavior. |
| `name` | string | Identifier. Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`. |
| `title` | string | Human-readable title. Must be unique within the policy. |

### `AccessPolicy`

- `AccessPolicy` is a container for `AccessLevels` (which define the necessary attributes to use Google Cloud services) and `ServicePerimeters` (which define regions of services able to freely pass data within a perimeter). An access policy is globally visible within an organization, and the restrictions it specifies apply to all projects within an organization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Output only. An opaque identifier for the current version of the `AccessPolicy`. This will always be a strongly validated etag, meaning that two access policies will be identical if and only if their etags are identical. Clients should not expect this to be in any specific format. |
| `name` | string | Output only. Identifier. Resource name of the `AccessPolicy`. Format: `accessPolicies/{access_policy}` |
| `parent` | string | Required. The parent of this `AccessPolicy` in the Cloud Resource Hierarchy. Currently immutable once created. Format: `organizations/{organization_id}` |
| `scopes` | array<string> | The scopes of the AccessPolicy. Scopes define which resources a policy can restrict and where its resources can be referenced. For example, policy A with `scopes=["folders/123"]` has the following behavior: - ServicePerimeter can only restrict projects within `folders/123`. - ServicePerimeter within policy A can only reference access levels defined within policy A. - Only one policy can include a given scope; thus, attempting to create a second policy that includes `folders/123` will result in an error. If no scopes are provided, then any resource within the organization can be restricted. Scopes cannot be modified after a policy is created. Policies can only have a single scope. Format: list of `folders/{folder_number}` or `projects/{project_number}` |
| `title` | string | Required. Human-readable title. Does not affect behavior. |

### `AccessScope`

- Access scope represents the client scope to which the settings are applied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientScope` | ClientScope | Optional. Client scope for this access scope. |

### `AccessSettings`

- Access settings represent the set of conditions that must be met for access to be granted. At least one of the fields must be set.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<string> | Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: `"accessPolicies/9522/accessLevels/device_trusted"` |
| `sessionSettings` | SessionSettings | Optional. Session settings applied to user access on a given `AccessScope`. |

### `AddRequestHeader`

- Adds a request header to the API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | HTTP header key. |
| `value` | string | HTTP header value. |

### `ApiOperation`

- Identification for an API Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `methodSelectors` | array<MethodSelector> | API methods or permissions to allow. Method or permission must belong to the service specified by `service_name` field. A single MethodSelector entry with `*` specified for the `method` field will allow all methods AND permissions for the service specified in `service_name`. |
| `serviceName` | string | The name of the API whose methods or permissions the IngressPolicy or EgressPolicy want to allow. A single ApiOperation with `service_name` field set to `*` will allow all methods AND permissions for all services. |

### `Application`

- An application that accesses Google Cloud APIs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | The OAuth client ID of the application. |
| `name` | string | The name of the application. Example: "Cloud Console" |

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

### `AuthorizedOrgsDesc`

- `AuthorizedOrgsDesc` contains data for an organization's authorization policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string enum | The asset type of this authorized orgs desc. Valid values are `ASSET_TYPE_DEVICE` and `ASSET_TYPE_CREDENTIAL_STRENGTH`. Values: `ASSET_TYPE_UNSPECIFIED`, `ASSET_TYPE_DEVICE`, `ASSET_TYPE_CREDENTIAL_STRENGTH`. |
| `authorizationDirection` | string enum | The direction of the authorization relationship between this organization and the organizations listed in the `orgs` field. The valid values for this field include the following: `AUTHORIZATION_DIRECTION_FROM`: Allows this organization to evaluate traffic in the organizations listed in the `orgs` field. `AUTHORIZATION_DIRECTION_TO`: Allows the organizations listed in the `orgs` field to evaluate the traffic in this organization. For the authorization relationship to take effect, all of the organizations must authorize and specify the appropriate relationship direction. For example, if organization A authorizes organizations B and C to evaluate its traffic by specifying `AUTHORIZATION_DIRECTION_TO` as the authorization direction, organizations B and C must specify `AUTHORIZATION_DIRECTION_FROM` as the authorization direction in their `AuthorizedOrgsDesc` resource. Values: `AUTHORIZATION_DIRECTION_UNSPECIFIED`, `AUTHORIZATION_DIRECTION_TO`, `AUTHORIZATION_DIRECTION_FROM`. |
| `authorizationType` | string enum | A granular control type for authorization levels. Valid value is `AUTHORIZATION_TYPE_TRUST`. Values: `AUTHORIZATION_TYPE_UNSPECIFIED`, `AUTHORIZATION_TYPE_TRUST`. |
| `name` | string | Identifier. Resource name for the `AuthorizedOrgsDesc`. Format: `accessPolicies/{access_policy}/authorizedOrgsDescs/{authorized_orgs_desc}`. The `authorized_orgs_desc` component must begin with a letter, followed by alphanumeric characters or `_`. After you create an `AuthorizedOrgsDesc`, you cannot change its `name`. |
| `orgs` | array<string> | The list of organization IDs in this `AuthorizedOrgsDesc`. Format: `organizations/{org_number}` Example: `organizations/123456` |

### `BasicLevel`

- `BasicLevel` is an `AccessLevel` using a set of recommended features.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `combiningFunction` | string enum | How the `conditions` list should be combined to determine if a request is granted this `AccessLevel`. If `AND` is used, each `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. If `OR` is used, at least one `Condition` in `conditions` must be satisfied for the `AccessLevel` to be applied. Default behavior is `AND`. Values: `AND`, `OR`. |
| `conditions` | array<Condition> | Required. A list of requirements for the `AccessLevel` to be granted. |

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

### `ClientScope`

- Client scope represents the application, project, or other resource subject to this binding's restrictions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `restrictedClientApplication` | Application | Optional. The application that is subject to this binding's scope. |
| `restrictedProject` | Project | Optional. The Google Cloud project that is subject to this binding's scope. |

### `CommitServicePerimetersRequest`

- A request to commit dry-run specs in all Service Perimeters belonging to an Access Policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The etag for the version of the Access Policy that this commit operation is to be performed on. If, at the time of commit, the etag for the Access Policy stored in Access Context Manager is different from the specified etag, then the commit operation will not be performed and the call will fail. This field is not required. If etag is not provided, the operation will be performed as if a valid etag is provided. |

### `CommitServicePerimetersResponse`

- A response to CommitServicePerimetersRequest. This will be put inside of Operation.response field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `servicePerimeters` | array<ServicePerimeter> | List of all the Service Perimeter instances in the Access Policy. |

### `Condition`

- A condition necessary for an `AccessLevel` to be granted. The `Condition` is an AND over its fields. A `Condition` is true if: 1) the request IP is from one of the listed subnetworks, AND 2) the originating device complies with the listed device policy, AND 3) all listed access levels are granted, AND 4) the request was sent at a time allowed by the `DateTimeRestriction`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `devicePolicy` | DevicePolicy | Device-specific restrictions. All restrictions must hold for the `Condition` to be true. If not specified, all devices are allowed. |
| `ipSubnetworks` | array<string> | CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (that is, all the host bits must be zero) or the input is considered malformed. For example, `"192.0.2.0/24"` is accepted, but `"192.0.2.1/24"` is not. Similarly, for IPv6, `"2001:db8::/32"` is accepted, whereas `"2001:db8::1/32"` is not. The originating IP of a request must be in one of the listed subnets in order for this `Condition` to be true. If empty, all IP addresses are allowed. |
| `members` | array<string> | The request must be made by one of the provided user or service accounts. Groups are not supported. Syntax: `user:{emailid}` `serviceAccount:{emailid}` If not specified, a request may come from any user. |
| `negate` | boolean | Whether to negate the `Condition`. If `true`, the `Condition` becomes a NAND over its non-empty fields. Any non-empty field criteria evaluating to `false` will result in the `Condition` being satisfied. Defaults to `false`. |
| `regions` | array<string> | The request must originate from one of the provided countries/regions. Must be valid ISO 3166-1 alpha-2 codes. |
| `requiredAccessLevels` | array<string> | A list of other access levels defined in the same `Policy`, referenced by resource name. Referencing an `AccessLevel` that does not exist is an error. All access levels listed must be granted for the `Condition` to be true. Example: `"accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"` |
| `vpcNetworkSources` | array<VpcNetworkSource> | The request must originate from one of the provided VPC networks in Google Cloud. Cannot specify this field together with `ip_subnetworks`. |

### `CustomLevel`

- `CustomLevel` is an `AccessLevel` using the Cloud Common Expression Language to represent the necessary conditions for the level to apply to a request. See CEL spec at: https://github.com/google/cel-spec
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expr` | Expr | Required. A Cloud CEL expression evaluating to a boolean. |

### `DevicePolicy`

- `DevicePolicy` specifies device-specific restrictions necessary to acquire a given access level. A `DevicePolicy` specifies requirements for requests from devices to be granted access levels; it does not do any enforcement on the device. `DevicePolicy` acts as an AND over all specified fields, and each repeated field is an OR over its elements. Any unset fields are ignored. For example, if the proto is `{ os_type : DESKTOP_WINDOWS, os_type : DESKTOP_LINUX, encryption_status: ENCRYPTED}`, then the `DevicePolicy` will be true for requests originating from encrypted Linux desktops and encrypted Windows desktops.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedDeviceManagementLevels` | array<string> | Allowed device management levels. An empty list allows all management levels. Values: `MANAGEMENT_UNSPECIFIED`, `NONE`, `BASIC`, `COMPLETE`. |
| `allowedEncryptionStatuses` | array<string> | Allowed encryption statuses. An empty list allows all statuses. Values: `ENCRYPTION_UNSPECIFIED`, `ENCRYPTION_UNSUPPORTED`, `UNENCRYPTED`, `ENCRYPTED`. |
| `osConstraints` | array<OsConstraint> | Allowed OS versions. An empty list allows all types and all versions. |
| `requireAdminApproval` | boolean | Whether the device needs to be approved by the customer admin. |
| `requireCorpOwned` | boolean | Whether the device needs to be corp-owned. |
| `requireScreenlock` | boolean | Whether or not screenlock is required for the `DevicePolicy` to be true. Defaults to `false`. |

### `EgressFrom`

- Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the source of the request. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identities` | array<string> | A list of identities that are allowed access through \[EgressPolicy\]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities. |
| `identityType` | string enum | Specifies the type of identities that are allowed access to outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. Values: `IDENTITY_TYPE_UNSPECIFIED`, `ANY_IDENTITY`, `ANY_USER_ACCOUNT`, `ANY_SERVICE_ACCOUNT`. |
| `sourceRestriction` | string enum | Whether to enforce traffic restrictions based on `sources` field. If the `sources` field is not empty, then this field must be set to `SOURCE_RESTRICTION_ENABLED`. Values: `SOURCE_RESTRICTION_UNSPECIFIED`, `SOURCE_RESTRICTION_ENABLED`, `SOURCE_RESTRICTION_DISABLED`. |
| `sources` | array<EgressSource> | Sources that this EgressPolicy authorizes access from. If this field is not empty, then `source_restriction` must be set to `SOURCE_RESTRICTION_ENABLED`. |

### `EgressPolicy`

- Policy for egress from perimeter. EgressPolicies match requests based on `egress_from` and `egress_to` stanzas. For an EgressPolicy to match, both `egress_from` and `egress_to` stanzas must be matched. If an EgressPolicy matches a request, the request is allowed to span the ServicePerimeter boundary. For example, an EgressPolicy can be used to allow VMs on networks within the ServicePerimeter to access a defined set of projects outside the perimeter in certain contexts (e.g. to read data from a Cloud Storage bucket or query against a BigQuery dataset). EgressPolicies are concerned with the \*resources\* that a request relates to, as well as the API services and API actions being used. They do not relate to the direction of data movement. More detailed documentation for this concept can be found in the descriptions of EgressFrom and EgressTo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `egressFrom` | EgressFrom | Defines conditions on the source of a request causing this EgressPolicy to apply. |
| `egressTo` | EgressTo | Defines the conditions on the ApiOperation and destination resources that cause this EgressPolicy to apply. |
| `title` | string | Optional. Human-readable title for the egress rule. The title must be unique within the perimeter and cannot exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. |

### `EgressSource`

- The source that EgressPolicy authorizes access from inside the ServicePerimeter to somewhere outside the ServicePerimeter boundaries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | string | An AccessLevel resource name that allows protected resources inside the ServicePerimeters to access outside the ServicePerimeter boundaries. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If an AccessLevel name is not specified, only resources within the perimeter can be accessed through Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all EgressSources will be allowed. |
| `pscEndpoint` | PrivateServiceConnectEndpoint | A PrivateServiceConnectEndpoint that is allowed to access data outside the perimeter. The Private Service Connect endpoint may be in any organization, not just the organization that the perimeter is defined in. |
| `resource` | string | A Google Cloud resource from the service perimeter that you want to allow to access data outside the perimeter. This field supports projects, folders, and organizations in the form `projects/{project_number}`, `folders/{folder_id}`, and `organizations/{organization_id}`. You can't use `*` in this field to allow all Google Cloud resources. |

### `EgressTo`

- Defines the conditions under which an EgressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the `resources` specified. Note that if the destination of the request is also protected by a ServicePerimeter, then that ServicePerimeter must have an IngressPolicy which allows access in order for this request to succeed. The request must match `operations` AND `resources` fields in order to be allowed egress out of the perimeter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalResources` | array<string> | A list of external resources that are allowed to be accessed. Only AWS and Azure resources are supported. For Amazon S3, the supported formats are `s3://BUCKET_NAME`, `s3a://BUCKET_NAME`, and `s3n://BUCKET_NAME`. For Azure Storage, the supported format is `azure://myaccount.blob.core.windows.net/CONTAINER_NAME`. A request matches if it contains an external resource in this list (Example: `s3://bucket/path`). Currently `'*'` is not allowed. |
| `operations` | array<ApiOperation> | A list of ApiOperations allowed to be performed by the sources specified in the corresponding EgressFrom. A request matches if it uses an operation/service in this list. |
| `resources` | array<string> | A list of resources, currently projects, folders, and organizations in the form `projects/{project_number}`, `folders/{folder_id}`, and `organizations/{organization_id}`, that are allowed to be accessed by sources defined in the corresponding EgressFrom. A request matches if it contains a resource in this list. If `*` is specified for `resources`, then this EgressTo rule will authorize access to all resources outside the perimeter. |
| `roles` | array<string> | IAM roles that represent the set of operations that the sources specified in the corresponding EgressFrom are allowed to perform in this ServicePerimeter. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `GcpUserAccessBinding`

- Restricts access to Cloud Console and Google Cloud APIs for a set of users using Context-Aware Access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<string> | Optional. Access level that a user must have to be granted access. Only one access level is supported, not multiple. This repeated field must have exactly one element. Example: `"accessPolicies/9522/accessLevels/device_trusted"` |
| `dryRunAccessLevels` | array<string> | Optional. Dry-run access level that is evaluated, but not enforced. Any access denial based on the dry-run policy is logged. Only one access level is supported, not multiple. This list must have exactly one element. Example: `"accessPolicies/9522/accessLevels/device_trusted"` |
| `groupKey` | string | Optional. Immutable. Google Group ID whose users are subject to this binding's restrictions. See "id" in the \[Google Workspace Directory API's Group Resource\] (https://developers.google.com/admin-sdk/directory/v1/reference/groups#resource). If a group's email address or alias is changed, this resource will continue to point at the changed group. This field does not accept group email addresses or aliases. Example: `"01d520gv4vjcrht"` |
| `name` | string | Immutable. Assigned by the server during creation. The last segment has an arbitrary length and has only URI unreserved characters (as defined by RFC 3986 Section 2.3 (https://tools.ietf.org/html/rfc3986#section-2.3)). Should not be specified by the client during creation. Example: `"organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"` |
| `principal` | Principal | Optional. Immutable. The principal that is subject to the access policies in this policy binding. |
| `scopedAccessSettings` | array<ScopedAccessSettings> | Optional. A list of scoped access settings that set this binding's restrictions on a subset of applications. |
| `sessionSettings` | SessionSettings | Optional. The Google Cloud session length (GCSL) policy for the group key. |

### `GcpUserAccessBindingOperationMetadata`

- Metadata of Google Cloud Access Binding Long Running Operations.
- Version: v1

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `IngressFrom`

- Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the source of the request. The request must satisfy what is defined in `sources` AND identity related fields in order to match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identities` | array<string> | A list of identities that are allowed access through \[IngressPolicy\]. Identities can be an individual user, service account, Google group, third-party identity, or agent identity. For the list of supported identity types, see https://docs.cloud.google.com/vpc-service-controls/docs/supported-identities. |
| `identityType` | string enum | Specifies the type of identities that are allowed access from outside the perimeter. If left unspecified, then members of `identities` field will be allowed access. Values: `IDENTITY_TYPE_UNSPECIFIED`, `ANY_IDENTITY`, `ANY_USER_ACCOUNT`, `ANY_SERVICE_ACCOUNT`. |
| `sources` | array<IngressSource> | Sources that this IngressPolicy authorizes access from. |

### `IngressPolicy`

- Policy for ingress into ServicePerimeter. IngressPolicies match requests based on `ingress_from` and `ingress_to` stanzas. For an ingress policy to match, both the `ingress_from` and `ingress_to` stanzas must be matched. If an IngressPolicy matches a request, the request is allowed through the perimeter boundary from outside the perimeter. For example, access from the internet can be allowed either based on an AccessLevel or, for traffic hosted on Google Cloud, the project of the source network. For access from private networks, using the project of the hosting network is required. Individual ingress policies can be limited by restricting which services and/or actions they match using the `ingress_to` field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ingressFrom` | IngressFrom | Defines the conditions on the source of a request causing this IngressPolicy to apply. |
| `ingressTo` | IngressTo | Defines the conditions on the ApiOperation and request destination that cause this IngressPolicy to apply. |
| `title` | string | Optional. Human-readable title for the ingress rule. The title must be unique within the perimeter and cannot exceed 100 characters. Within the access policy, the combined length of all rule titles must not exceed 240,000 characters. |

### `IngressSource`

- The source that IngressPolicy authorizes access from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevel` | string | An AccessLevel resource name that allows resources within the ServicePerimeters to be accessed from the internet. AccessLevels listed must be in the same policy as this ServicePerimeter. Referencing a nonexistent AccessLevel will cause an error. If no AccessLevel names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is specified for `access_level`, then all IngressSources will be allowed. |
| `pscEndpoint` | PrivateServiceConnectEndpoint | A PrivateServiceConnectEndpoint that is allowed to access the perimeter. The Private Service Connect endpoint may be in any organization, not just the organization that the perimeter is defined in. |
| `resource` | string | A Google Cloud resource that is allowed to ingress the perimeter. Requests from these resources will be allowed to access perimeter data. Currently projects, folders, organizations, and VPCs are allowed. Project format: `projects/{project_number}` Folder format: `folders/{folder_id}` Organization format: `organizations/{organization_id}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. The project may be in any Google Cloud organization, not just the organization that the perimeter is defined in. `*` is not allowed, the case of allowing all Google Cloud resources only is not supported. |

### `IngressTo`

- Defines the conditions under which an IngressPolicy matches a request. Conditions are based on information about the ApiOperation intended to be performed on the target resource of the request. The request must satisfy what is defined in `operations` AND `resources` in order to match.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operations` | array<ApiOperation> | A list of ApiOperations allowed to be performed by the sources specified in corresponding IngressFrom in this ServicePerimeter. |
| `resources` | array<string> | A list of resources, currently projects, folders, and organizations in the form `projects/{project_number}`, `folders/{folder_id}`, and `organizations/{organization_id}`, protected by this ServicePerimeter that are allowed to be accessed by sources defined in the corresponding IngressFrom. If a single `*` is specified, then access to all resources inside the perimeter is allowed. |
| `roles` | array<string> | IAM roles that represent the set of operations that the sources specified in the corresponding IngressFrom are allowed to perform in this ServicePerimeter. |

### `ListAccessLevelsResponse`

- A response to `ListAccessLevelsRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<AccessLevel> | List of the Access Level instances. |
| `nextPageToken` | string | The pagination token to retrieve the next page of results. If the value is empty, no further results remain. |

### `ListAccessPoliciesResponse`

- A response to `ListAccessPoliciesRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessPolicies` | array<AccessPolicy> | List of the AccessPolicy instances. |
| `nextPageToken` | string | The pagination token to retrieve the next page of results. If the value is empty, no further results remain. |

### `ListAuthorizedOrgsDescsResponse`

- A response to `ListAuthorizedOrgsDescsRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizedOrgsDescs` | array<AuthorizedOrgsDesc> | List of all the Authorized Orgs Desc instances. |
| `nextPageToken` | string | The pagination token to retrieve the next page of results. If the value is empty, no further results remain. |

### `ListGcpUserAccessBindingsResponse`

- Response of ListGcpUserAccessBindings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcpUserAccessBindings` | array<GcpUserAccessBinding> | GcpUserAccessBinding |
| `nextPageToken` | string | Token to get the next page of items. If blank, there are no more items. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListServicePerimetersResponse`

- A response to `ListServicePerimetersRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The pagination token to retrieve the next page of results. If the value is empty, no further results remain. |
| `servicePerimeters` | array<ServicePerimeter> | List of the Service Perimeter instances. |

### `ListSupportedPermissionsResponse`

- A response to `ListSupportedPermissionsRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Use this pagination token to retrieve the next page of results. An empty value indicates that no further results are available. |
| `supportedPermissions` | array<string> | List of VPC Service Controls supported permissions. |

### `ListSupportedServicesResponse`

- A response to `ListSupportedServicesRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Use this pagination token to retrieve the next page of results. An empty value indicates that no further results are available. |
| `supportedServices` | array<SupportedService> | List of services supported by VPC Service Controls instances. |

### `LookupConfiguredServicePerimeterResponse`

- A configured service perimeter returned by Access Context Manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `restrictedResource` | string | The resource (for example, `projects/123` or `folders/456`) that directly owns or is restricted by the enforced perimeter. |
| `restrictedResourceDryRun` | string | The resource (for example, `projects/123` or `folders/456`) that directly owns or is restricted by the dry-run perimeter. |
| `servicePerimeter` | string | Fully qualified name of the configured enforced perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{perimeter_name}` This field is empty if no enforced perimeter applies. |
| `servicePerimeterDryRun` | string | Fully qualified name of the configured dry-run perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{perimeter_name}` This field is empty if no dry-run perimeter configuration applies. |

### `MethodSelector`

- An allowed method or permission of a service specified in ApiOperation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `method` | string | A valid method name for the corresponding `service_name` in ApiOperation. If `*` is used as the value for the `method`, then ALL methods and permissions are allowed. |
| `permission` | string | A valid Cloud IAM permission for the corresponding `service_name` in ApiOperation. |

### `Modifier`

- Modifier to apply to the API requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addRequestHeader` | AddRequestHeader | Adds an additional HTTP request header. |

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

### `OsConstraint`

- A restriction on the OS type and version of devices making requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minimumVersion` | string | The minimum allowed OS version. If not set, any version of this OS satisfies the constraint. Format: `"major.minor.patch"`. Examples: `"10.5.301"`, `"9.2.1"`. |
| `osType` | string enum | Required. The allowed OS type. Values: `OS_UNSPECIFIED`, `DESKTOP_MAC`, `DESKTOP_WINDOWS`, `DESKTOP_LINUX`, `DESKTOP_CHROME_OS`, `GOOGLEBOOK_OS`, `ANDROID`, `IOS`. |
| `requireVerifiedChromeOs` | boolean | Only allows requests from devices with a verified Chrome OS. Verification includes requirements that the device is enterprise-managed, conforms to domain policies, and the caller has permission to call the API targeted by the request. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Principal`

- The comprehensive identity container supporting identities including groups, service accounts, and federated identities. Only one of them can be set to create an access binding.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `federatedPrincipal` | string | Immutable. The IAM principal identifier of the federated workforce or workload to assign the policy to. Examples include the following: \* Single principal: `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}` \* All workloads in a workload identity pool: `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*` \* All Workforce Pools in a Google Cloud organization: `principalSet://cloudresourcemanager.googleapis.com/organizations/{organization_id}/type/WorkforcePool` Bindings created for all Workforce Pools in a Google Cloud organization support only `scoped_access_settings` with the `restricted_project` client scope and active `session_settings`. No other configurations are allowed. |
| `serviceAccount` | string | Immutable. Service account email used to assign policies to a specific service account. If a service account is subject to multiple policies (for example, if there is a policy for all service accounts in a project and a policy for the service account), the closest (that is, the most specific) dry-run policy is used for the dry-run functionality and the closest enforcement policy is used for enforcement. |
| `serviceAccountProjectNumber` | string | Immutable. Cloud project number used to assign policies to all service accounts owned by the project. |

### `PrivateServiceConnectEndpoint`

- Specifies the Private Service Connect endpoint that an API call refers to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `forwardingRule` | string | The full resource name of the global forwarding rule that identifies a Private Service Connect endpoint. Forwarding rule format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/forwardingRules/{FORWARDING_RULE_ID}`. |

### `Project`

- A Google Cloud project that contains applications and resources that users can access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The Google Cloud project resource name. Format: `projects/{project_number}`. Only the project number is supported. Example: `projects/1234567890` |

### `ReplaceAccessLevelsRequest`

- A request to replace all existing Access Levels in an Access Policy with the Access Levels provided. This is done atomically.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<AccessLevel> | Required. The desired Access Levels that should replace all existing Access Levels in the Access Policy. |
| `etag` | string | Optional. The etag for the version of the Access Policy that this replace operation is to be performed on. If, at the time of replace, the etag for the Access Policy stored in Access Context Manager is different from the specified etag, then the replace operation will not be performed and the call will fail. This field is not required. If etag is not provided, the operation will be performed as if a valid etag is provided. |

### `ReplaceAccessLevelsResponse`

- A response to ReplaceAccessLevelsRequest. This will be put inside of Operation.response field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<AccessLevel> | List of the Access Level instances. |

### `ReplaceServicePerimetersRequest`

- A request to replace all existing Service Perimeters in an Access Policy with the Service Perimeters provided. This is done atomically.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The etag for the version of the Access Policy that this replace operation is to be performed on. If, at the time of replace, the etag for the Access Policy stored in Access Context Manager is different from the specified etag, then the replace operation will not be performed and the call will fail. This field is not required. If etag is not provided, the operation will be performed as if a valid etag is provided. |
| `servicePerimeters` | array<ServicePerimeter> | Required. The desired Service Perimeters that should replace all existing Service Perimeters in the Access Policy. |

### `ReplaceServicePerimetersResponse`

- A response to ReplaceServicePerimetersRequest. This will be put inside of Operation.response field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `servicePerimeters` | array<ServicePerimeter> | List of the Service Perimeter instances. |

### `ScopedAccessSettings`

- A relationship between access settings and their scope.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeSettings` | AccessSettings | Optional. Access settings for this `ScopedAccessSettings`. This field may be empty if `dry_run_settings` is set. |
| `dryRunSettings` | AccessSettings | Optional. Dry-run access settings for this `ScopedAccessSettings`. This field may be empty if `active_settings` is set. |
| `scope` | AccessScope | Optional. Application or other resource to which the access settings are applied. Implicitly, this is the scoped access settings key; as such, it must be unique and non-empty. |

### `ServicePattern`

- Service patterns used to allow access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `modifiers` | array<Modifier> | Modifiers to apply to the requests that match the URL pattern. |
| `pattern` | string | URL pattern to allow. Only patterns of `".googleapis.com/*"`, `"www.googleapis.com//*"`, and `"*.appspot.com/*"` forms are supported, where \`\` should be an alphanumeric name. |
| `service` | string | Supported service to allow. |

### `ServicePerimeter`

- `ServicePerimeter` describes a set of Google Cloud resources which can freely import and export data amongst themselves, but not export outside of the `ServicePerimeter`. If a request with a source within this `ServicePerimeter` has a target outside of the `ServicePerimeter`, the request will be blocked. Otherwise the request is allowed. There are two types of Service Perimeter - Regular and Bridge. Regular Service Perimeters cannot overlap, a single Google Cloud project or VPC network can only belong to a single regular Service Perimeter. Service Perimeter Bridges can contain only Google Cloud projects as members, a single Google Cloud project may belong to multiple Service Perimeter Bridges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the `ServicePerimeter` and its use. Does not affect behavior. |
| `etag` | string | Optional. An opaque identifier for the current version of the `ServicePerimeter`. This identifier does not follow any specific format. If an etag is not provided, the operation will be performed as if a valid etag is provided. |
| `name` | string | Identifier. Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`. |
| `perimeterType` | string enum | Perimeter type indicator. A single project or VPC network is allowed to be a member of a single regular perimeter, but multiple service perimeter bridges. A project cannot be included in a perimeter bridge without being included in a regular perimeter. For perimeter bridges, the restricted service list as well as access level lists must be empty. Values: `PERIMETER_TYPE_REGULAR`, `PERIMETER_TYPE_BRIDGE`. |
| `spec` | ServicePerimeterConfig | Proposed (or dry run) ServicePerimeter configuration. This configuration allows you to specify and test ServicePerimeter configuration without enforcing actual access restrictions. Only allowed to be set when the `use_explicit_dry_run_spec` flag is set. |
| `status` | ServicePerimeterConfig | Current ServicePerimeter configuration. Specifies sets of resources, restricted services, and access levels that determine perimeter content and boundaries. |
| `title` | string | Human readable title. Must be unique within the Policy. |
| `useExplicitDryRunSpec` | boolean | Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly exists for all Service Perimeters, and that spec is identical to the status for those Service Perimeters. When this flag is set, it inhibits the generation of the implicit spec, thereby allowing the user to explicitly provide a configuration ("spec") to use in a dry-run version of the Service Perimeter. This allows the user to test changes to the enforced config ("status") without actually enforcing them. This testing is done through analyzing the differences between currently enforced and suggested restrictions. `use_explicit_dry_run_spec` must be set to `true` if any of the fields in the spec are set to non-default values. |

### `ServicePerimeterConfig`

- `ServicePerimeterConfig` specifies a set of Google Cloud resources that describe specific Service Perimeter configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<string> | A list of `AccessLevel` resource names that allow resources within the `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed must be in the same policy as this `ServicePerimeter`. Referencing a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are listed, resources within the perimeter can only be accessed via Google Cloud calls with request origins within the perimeter. Example: `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter Bridge, must be empty. |
| `egressPolicies` | array<EgressPolicy> | List of EgressPolicies to apply to the perimeter. A perimeter may have multiple EgressPolicies, each of which is evaluated separately. Access is granted if any EgressPolicy grants it. Must be empty for a perimeter bridge. |
| `ingressPolicies` | array<IngressPolicy> | List of IngressPolicies to apply to the perimeter. A perimeter may have multiple IngressPolicies, each of which is evaluated separately. Access is granted if any Ingress Policy grants it. Must be empty for a perimeter bridge. |
| `resources` | array<string> | A list of Google Cloud resources that are inside of the service perimeter. Currently projects, folders, and VPCs are allowed. Project format: `projects/{project_number}` Folder format: `folders/{folder_id}` VPC network format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`. |
| `restrictedServices` | array<string> | Google Cloud services that are subject to the Service Perimeter restrictions. For example, if `storage.googleapis.com` is specified, access to the storage buckets inside the perimeter must meet the perimeter's access restrictions. |
| `vpcAccessibleServices` | VpcAccessibleServices | Configuration for APIs allowed within Perimeter. |

### `SessionSettings`

- Stores settings related to Google Cloud Session Length, including session duration, the type of challenge (that is, method) a user faces when their session expires, and other related settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxInactivity` | string (google-duration) | Optional. How long a user is allowed to take between actions before a new access token must be issued. Only set for Google Cloud apps. |
| `sessionLength` | string (google-duration) | Optional. The session length. Setting this field to zero allows for sessions that are active indefinitely. Also, setting `session_length_enabled` to `false` disregards session limits, which means that sessions never expire. If `use_oidc_max_age` is `true`, for OIDC apps, the session length will be the minimum of this field and the OIDC `max_age` parameter. If this field is set to zero, `session_length_enabled` must be set to `false` or left unset. |
| `sessionLengthEnabled` | boolean | Optional. This field enables or disables Google Cloud session length. When `false`, all fields set above are disregarded and the session length is effectively infinite. If `session_length` is set to zero, this field must be set to `false`. |
| `sessionReauthMethod` | string enum | Optional. Session challenge method when a user's Google Cloud session expires. Values: `SESSION_REAUTH_METHOD_UNSPECIFIED`, `LOGIN`, `SECURITY_KEY`, `PASSWORD`. |
| `useOidcMaxAge` | boolean | Optional. Only useful for OIDC apps. When `false`, the OIDC `max_age` parameter, if passed in the authentication request, is ignored. When `true`, the re-authentication period is the minimum of the `session_length` field and the `max_age` OIDC parameter. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `SupportedService`

- `SupportedService` specifies a service supported by VPC Service Controls and its properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableOnRestrictedVip` | boolean | True if the service is available on the restricted VIP. Services on the restricted VIP typically either support VPC Service Controls or are core infrastructure services required for the functioning of Google Cloud. |
| `knownLimitations` | boolean | True if the service is supported with some limitations. Check documentation (https://cloud.google.com/vpc-service-controls/docs/supported-products) for details. |
| `name` | string | The service name or address of the supported service, such as `service.googleapis.com`. |
| `serviceSupportStage` | string enum | The support stage of the service. Values: `SERVICE_SUPPORT_STAGE_UNSPECIFIED`, `GA`, `PREVIEW`, `DEPRECATED`. |
| `supportStage` | string enum | The support stage of the service. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `supportedMethods` | array<MethodSelector> | The list of supported methods. This field exists only in response to GetSupportedService. |
| `title` | string | The name of the supported product, such as `'Cloud Product API'`. |

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

### `VpcAccessibleServices`

- Specifies how APIs are allowed to communicate within the Service Perimeter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedServicePatterns` | array<ServicePattern> | Specifies which Google services are allowed to be accessed from VPC networks in the service perimeter. |
| `allowedServices` | array<string> | The list of APIs usable within the Service Perimeter. Must be empty unless `enable_restriction` is `true`. You can specify a list of individual services, as well as include the `'RESTRICTED-SERVICES'` value, which automatically includes all of the services protected by the perimeter. |
| `enableRestriction` | boolean | Whether to restrict API calls within the Service Perimeter to the list of APIs specified in `allowed_services`. |
| `servicePatternsEnforcementScopes` | array<string> | Defines the enforcement scopes of service patterns. Values: `SERVICE_PATTERNS_ENFORCEMENT_SCOPE_UNSPECIFIED`, `GOOGLE_APIS_VIA_PRIVATE_PATH`. |

### `VpcNetworkSource`

- The originating network source in Google Cloud.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vpcSubnetwork` | VpcSubNetwork | Sub-segment ranges of a VPC network. |

### `VpcSubNetwork`

- Sub-segment ranges inside of a VPC network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `network` | string | Required. Network name. If the network is not part of the organization, the `compute.network.get` permission must be granted to the caller. Format: `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NETWORK_NAME}` Example: `//compute.googleapis.com/projects/my-project/global/networks/network-1` |
| `vpcIpSubnetworks` | array<string> | CIDR block IP subnetwork specification. The IP address must be an IPv4 address and can be a public or private IP address. Note that for a CIDR IP address block, the specified IP address portion must be properly truncated (that is, all the host bits must be zero) or the input is considered malformed. For example, `"192.0.2.0/24"` is accepted, but `"192.0.2.1/24"` is not. If empty, all IP addresses are allowed. |

### Shape of `AccessLevel`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "basic": "BasicLevel",
  "custom": "CustomLevel",
  "description": "string",
  "name": "string",
  "title": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `accesscontextmanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://accesscontextmanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
