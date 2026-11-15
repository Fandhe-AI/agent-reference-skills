---
source: https://agentidentity.googleapis.com/$discovery/rest?version=v1
---

# Agent Identity API message schemas (agentidentity)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/agentidentity/`.

### `AccessSummary`

- Represents an access summary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authProvider` | string | Output only. The auth provider that this access summary is associated with. |
| `authProviderType` | string enum | Output only. The auth provider type used to create this access summary. |
| `firstAccessTime` | string (google-datetime) | Output only. The first time this user interacted with this workload, rounded to the previous hour. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `lastAccessTime` | string (google-datetime) | Output only. The most recent time this user interacted with this workload, rounded to the previous hour. |
| `name` | string | Output only. Identifier. The resource name of the access summary. |
| `purgeTime` | string (google-datetime) | Output only. The time when this access summary is permanently deleted. |
| `scopes` | array<string> | Output only. All scopes that have been used by this user with this workload. The number of scopes is limited to 200. |
| `tokenUrl` | string | Output only. The URL of the authentication server that was accessed. |
| `userId` | string | Output only. The user ID provided by the workload application for this user. Not verified by Google. |
| `workloadId` | string | Output only. The identity bound to the workload that this user interacted with to produce this access summary. Typically an agentic SPIFFE ID. |

### `AgentIdentityPool`

- Marker message to indicate the managed Agent Identity Pool is used.
- Version: v1

### `ApiKeyParams`

- Configuration for API key authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiKey` | string | Optional. Input only. The API key for this auth provider. |

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
| `logType` | string enum | The log type that this config enables. |

### `AuthProvider`

- Represents an auth provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedScopes` | array<string> | Optional. List of scopes that are allowed to be requested for this auth provider. If this list is non-empty, only scopes within this list may be requested. If this list is empty, all scopes may be requested. Scopes appearing in `blocked_scopes` are disallowed even if they appear in `allowed_scopes`. The number of allowed scopes is limited to 200. |
| `authProviderTypeParams` | AuthProviderTypeParams | Required. Parameters specific to the auth provider type. |
| `blockedScopes` | array<string> | Optional. List of scopes that are blocked from being requested for this auth provider. If a scope appears in this list, it will not be requested, even if it also appears in `allowed_scopes`. `blocked_scopes` takes precedence over `allowed_scopes`. The number of blocked scopes is limited to 200. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp. |
| `deleted` | boolean | Output only. Set to `true` if the auth provider is deleted. |
| `description` | string | Optional. Description of the resource. Must be less than 256 characters. |
| `expireTime` | string (google-datetime) | Output only. The time when the auth provider will expire. |
| `labels` | object | Optional. Labels as key-value pairs. |
| `name` | string | Identifier. The full resource name of the auth provider. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |
| `state` | string enum | Output only. The state of the auth provider. |
| `updateTime` | string (google-datetime) | Output only. The update timestamp. |
| `workloadIds` | array<string> | Optional. Input only. Identifiers for the agents that will use this auth provider, starting with `principal://`. For example: `principal://agents.global.org-${ORG_ID}.system.id.goog/resources/aiplatform/projects/{PROJECT_ID}/locations/{LOCATIONS}/reasoningEngines/{ID}` |

### `AuthProviderTypeParams`

- Required. Parameters specific to the auth provider type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiKey` | ApiKeyParams | Parameters for API key authentication. |
| `connectorReferenceAuthProvider` | ConnectorReferenceAuthProvider | Parameters for Connector Reference authentication. |
| `geAuthProvider` | GeminiEnterpriseAuthProviderParams | Parameters for Gemini Enterprise authentication. |
| `threeLeggedOauth` | ThreeLeggedOAuth | Parameters for 3-legged OAuth (3LO) authentication. |
| `twoLeggedOauth` | TwoLeggedOAuth | Parameters for 2-legged OAuth (2LO) authentication. |
| `xaaAuthProvider` | CrossAppAccessAuthProvider | Parameters for Cross-App Access authentication. |

### `Authorization`

- Represents an authorization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientUserId` | string | Output only. The client user ID provided by the client application for their end user. Not verified by Google. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp. |
| `name` | string | Identifier. The resource name of the authorization. |
| `scopes` | array<string> | Output only. The scopes actually granted by the end user during the consent flow. |
| `state` | string enum | Output only. The state of the authorization. |
| `updateTime` | string (google-datetime) | Output only. The update timestamp. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `ClientAssertionJwtAuth`

- Configuration for client ID and client assertion JWT authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Required. The client identifier. |

### `ClientSecretAuth`

- Configuration for client ID and client secret authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Required. The client identifier. |
| `clientSecret` | string | Required. Input only. The client secret. |

### `ConnectorReferenceAuthProvider`

- Configuration parameters for the Connector Reference auth provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationDetails` | array<object> | Optional. Rich Authorization Requests (RFC 9396) detailing targeted OAuth resources/scopes, formatted as a JSON array of JSON objects. |
| `connector` | string | Required. The name of the referenced connector. |

### `CrossAppAccessAuthProvider`

- Configuration parameters for the Cross-App Access auth provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalParameters` | object | Optional. Additional parameters to be passed to the token endpoint. |
| `clientAssertionJwtAuth` | ClientAssertionJwtAuth | Option 2: Authenticate using a standard `client_id` and a Client Assertion JWT. |
| `clientSecretAuth` | ClientSecretAuth | Option 1: Authenticate using a standard `client_id` and `client_secret`. |
| `customIssuer` | CustomIssuer | Configuration when using a custom or third-party authorization server as the issuer. |
| `googleAccount` | GoogleAccount | Configuration when using Google Accounts as the issuer. |
| `idJagInput` | DirectIdJagInput | Configuration for when the input is already an ID-JAG. |
| `idTokenInput` | IdTokenProcessingConfig | Configuration for when the input is an ID token. |
| `workforceIdentityFederation` | WorkforceIdentityFederation | Configuration when using Workforce Identity Federation as the issuer. |

### `CustomIssuer`

- Configuration for a custom or third-party authorization server issuer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issuer` | string | Optional. The issuer identifier of the target Authorization Server. |
| `tokenUrl` | string | Required. The token endpoint of the target OAuth authorization server to retrieve resource tokens. |

### `DirectIdJagInput`

- Marker message indicating the input is already an ID-JAG, so no fetching is required.
- Version: v1

### `DisableAuthProviderRequest`

- Request message for `DisableAuthProvider`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnableAuthProviderRequest`

- Request message for `EnableAuthProvider`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `GeminiEnterpriseAuthProviderParams`

- Configuration for Gemini Enterprise authentication.
- Version: v1

### `GoogleAccount`

- Configuration for Google Account usage as the issuer.
- Version: v1

### `IdTokenProcessingConfig`

- Defines how to process an input ID token to obtain an ID-JAG.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentIdentityPool` | AgentIdentityPool | Indicates the managed Agent Identity pool should be used to fetch the ID-JAG. |
| `idJagAdditionalClaims` | object | Optional. Optional additional claims to include when fetching an ID-JAG. |
| `idJagAuthProvider` | string | The resource name of the ID-JAG auth provider. Format: "projects/{project}/locations/{location}/authProviders/{auth_provider}" |

### `ListAccessSummariesResponse`

- Response message for `ListAccessSummaries`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessSummaries` | array<AccessSummary> | The list of access summaries. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListAuthProvidersResponse`

- Response message for `ListAuthProviders`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authProviders` | array<AuthProvider> | The list of auth providers. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListAuthorizationsResponse`

- Response message for `ListAuthorizations`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizations` | array<Authorization> | The list of authorizations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

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

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `QueryAuthProvidersResponse`

- Response message for `QueryAuthProviders`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authProviderNames` | array<string> | The unique list of auth provider resource names used by the workload. |
| `nextPageToken` | string | A token identifying a page of results the server should return. If this field is omitted, there are no subsequent pages. |

### `QueryWorkloadsResponse`

- Response message for `QueryWorkloads`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. |
| `workloadIds` | array<string> | The unique list of identifiers for the agents that used this auth provider, starting with `principal://`. |

### `ResolveAuthorizationRequest`

- Request message for `ResolveAuthorization`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientUserId` | string | Required. The user ID of the client for whom the authorization is resolved. |

### `ResolveAuthorizationResponse`

- Response message for `ResolveAuthorization`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorization` | string | The resource name of the resolved authorization. Format: projects/{project}/locations/{location}/authProviders/{auth_provider}/authorizations/{authorization} |

### `RevokeAuthorizationRequest`

- Request message for `RevokeAuthorization`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `userId` | string | Required. The identity of the user to revoke authorization for. |

### `RevokeAuthorizationResponse`

- Response message for `RevokeAuthorization`.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

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

### `ThreeLeggedOAuth`

- Configuration for 3-legged OAuth (3LO) authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationUrl` | string | Optional. The authorization endpoint to send users to for consenting to delegate to the agent. For example, "https://auth.atlassian.com/authorize". |
| `clientId` | string | Optional. The client ID of the OAuth client. |
| `clientSecret` | string | Optional. Input only. The client secret of the OAuth client. |
| `defaultContinueUri` | string | Optional. The default continue URI for the 3LO flow, used when no continue URI is provided in the RetrieveCredentials request. |
| `enablePkce` | boolean | Optional. Enables Proof Key for Code Exchange (PKCE) for the OAuth flow to prevent authorization code interception attacks. |
| `redirectUrl` | string | Output only. The redirect URL this auth provider uses for the OAuth exchange. This is deterministic based on the name of the auth provider. |
| `tokenUrl` | string | Optional. The token endpoint for requesting tokens on behalf of an end user. For example, "https://auth.atlassian.com/oauth/token". |

### `TwoLeggedOAuth`

- Configuration for 2-legged OAuth (2LO) authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Optional. The client ID of the OAuth client. |
| `clientSecret` | string | Optional. Input only. The client secret of the OAuth client. |
| `tokenUrl` | string | Optional. The token endpoint of the OAuth client. |

### `UndeleteAuthProviderRequest`

- Request message for `UndeleteAuthProvider`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `WorkforceIdentityFederation`

- Configuration for Workforce Identity Federation usage as the issuer.
- Version: v1

### Shape of `AccessSummary`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "authProvider": "string",
  "authProviderType": "string enum",
  "firstAccessTime": "string (google-datetime)",
  "labels": "object",
  "lastAccessTime": "string (google-datetime)",
  "name": "string",
  "purgeTime": "string (google-datetime)",
  "scopes": "array<string>",
  "tokenUrl": "string",
  "userId": "string",
  "workloadId": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `agentidentity` (retrieved 2026-11-14); a type shared by several versions shows the preferred version, and each type's `Version` line names the document it was taken from.
- Source: https://agentidentity.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
