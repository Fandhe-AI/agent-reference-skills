---
source: https://iam.googleapis.com/$discovery/rest?version=v2
---

# Identity and Access Management (IAM) API message schemas (iam)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/iam/`.

### `AccessRestrictions`

- Access related restrictions on the workforce pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedServices` | array<ServiceConfig> | Optional. Immutable. Services allowed for web sign-in with the workforce pool. If not set by default there are no restrictions. |
| `disableProgrammaticSignin` | boolean | Optional. Disable programmatic sign-in by disabling token issue via the Security Token API endpoint. See \[Security Token Service API\] (https://cloud.google.com/iam/docs/reference/sts/rest). |

### `AddAttestationRuleRequest`

- Request message for AddAttestationRule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationRule` | AttestationRule | Required. The attestation rule to be added. |

### `AdminAuditData`

- Audit log information specific to Cloud IAM admin APIs. This message is serialized as an `Any` type in the `ServiceData` message of an `AuditLog` message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissionDelta` | PermissionDelta | The permission_delta when when creating or updating a Role. |

### `AttestationRule`

- Defines which workloads can receive an identity within a pool. When an AttestationRule is defined under a managed identity, matching workloads may receive that identity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googleCloudResource` | string | Optional. A single workload operating on Google Cloud. For example: `//compute.googleapis.com/projects/123/uid/zones/us-central1-a/instances/12345`. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditData`

- Audit log information specific to Cloud IAM. This message is serialized as an `Any` type in the `ServiceData` message of an `AuditLog` message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policyDelta` | PolicyDelta | Policy delta between the original policy and the newly set policy. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. |

### `AuditableService`

- Contains information about an auditable service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Public name of the service. For example, the service name for IAM is 'iam.googleapis.com'. |

### `Aws`

- Represents an Amazon Web Services identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountId` | string | Required. The AWS account ID. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BindingDelta`

- One delta entry for Binding. Each individual change (only one member in each entry) to a binding will be a separate entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action that was performed on a Binding. Required |
| `condition` | Expr | The condition that is associated with this binding. |
| `member` | string | A single identity requesting access for a Google Cloud resource. Follows the same format of Binding.members. Required |
| `role` | string | Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. Required |

### `CloudControl2SharedOperationsReconciliationOperationMetadata`

- Operation metadata returned by the CLH during resource state reconciliation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deleteResource` | boolean | DEPRECATED. Use exclusive_action instead. |
| `exclusiveAction` | string enum | Excluisive action returned by the CLH. |

### `CreateRoleRequest`

- The request to create a new role.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `role` | Role | The Role resource to create. |
| `roleId` | string | The role ID to use for this role. A role ID may contain alphanumeric characters, underscores (`_`), and periods (`.`). It must contain a minimum of 3 characters and a maximum of 64 characters. |

### `CreateServiceAccountKeyRequest`

- The service account key create request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyAlgorithm` | string enum | Which type of key and algorithm to use for the key. The default is currently a 2K RSA key. However this may change in the future. |
| `privateKeyType` | string enum | The output format of the private key. The default value is `TYPE_GOOGLE_CREDENTIALS_FILE`, which is the Google Credentials File format. |

### `CreateServiceAccountRequest`

- The service account create request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountId` | string | Required. The account id that is used to generate the service account email address and a stable unique id. It is unique within a project, must be 6-30 characters long, and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])` to comply with RFC1035. |
| `serviceAccount` | ServiceAccount | The ServiceAccount resource to create. Currently, only the following values are user assignable: `display_name` and `description`. |

### `DisableServiceAccountKeyRequest`

- The service account key disable request.
- Version: v1

### `DisableServiceAccountRequest`

- The service account disable request.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnableServiceAccountKeyRequest`

- The service account key enable request.
- Version: v1

### `EnableServiceAccountRequest`

- The service account enable request.
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

### `ExtendedStatus`

- Extended status can store additional metadata. For example, for keys disabled due to their private key data being expoesed we may include a message with more information about the exposure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string enum | The key for this extended status. |
| `value` | string | The value for the extended status. |

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

### `GoogleCloudCommonOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleIamAdminV1AuditData`

- Audit log information specific to Cloud IAM admin APIs. This message is serialized as an `Any` type in the `ServiceData` message of an `AuditLog` message.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissionDelta` | GoogleIamAdminV1AuditDataPermissionDelta | The permission_delta when when creating or updating a Role. |

### `GoogleIamAdminV1AuditDataPermissionDelta`

- A PermissionDelta message to record the added_permissions and removed_permissions inside a role.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `addedPermissions` | array<string> | Added permissions. |
| `removedPermissions` | array<string> | Removed permissions. |

### `GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client`

- Represents the OAuth 2.0 client credential configuration for retrieving additional user attributes that are not present in the initial authentication credentials from the identity provider, for example, groups. See https://datatracker.ietf.org/doc/html/rfc6749#section-4.4 for more details on client credentials grant flow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributesType` | string enum | Required. Represents the IdP and type of claims that should be fetched. |
| `clientId` | string | Required. The OAuth 2.0 client ID for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow. |
| `clientSecret` | GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret | Required. The OAuth 2.0 client secret for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow. |
| `issuerUri` | string | Required. The OIDC identity provider's issuer URI. Must be a valid URI using the `https` scheme. Required to get the OIDC discovery document. |
| `queryParameters` | GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters | Optional. Represents the parameters to control which claims are fetched from an IdP. |

### `GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2ClientQueryParameters`

- Represents the parameters to control which claims are fetched from an IdP.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. The filter used to request specific records from the IdP. By default, all of the groups that are associated with a user are fetched. For Microsoft Entra ID, you can add `$search` query parameters using \[Keyword Query Language\] (https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference). To learn more about `$search` querying in Microsoft Entra ID, see \[Use the `$search` query parameter\] (https://learn.microsoft.com/en-us/graph/search-query-parameter). Additionally, Workforce Identity Federation automatically adds the following \[`$filter` query parameters\] (https://learn.microsoft.com/en-us/graph/filter-query-parameter), based on the value of `attributes_type`. Values passed to `filter` are converted to `$search` query parameters. Additional `$filter` query parameters cannot be added using this field. \* `AZURE_AD_GROUPS_MAIL`: `mailEnabled` and `securityEnabled` filters are applied. \* `AZURE_AD_GROUPS_ID`: `securityEnabled` filter is applied. |

### `GoogleIamAdminV1WorkforcePoolProviderOidc`

- Represents an OpenID Connect 1.0 identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Required. The client ID. Must match the audience claim of the JWT issued by the identity provider. |
| `clientSecret` | GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret | Optional. The optional client secret. Required to enable Authorization Code flow for web sign-in. |
| `issuerUri` | string | Required. The OIDC issuer URI. Must be a valid URI using the `https` scheme. |
| `jwksJson` | string | Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document that is fetched from the well-known path of the `issuer_uri`, will be used. RSA and EC asymmetric keys are supported. The JWK must use the following format and include only the following fields: { "keys": \[ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } \] } |
| `webSsoConfig` | GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig | Required. Configuration for web single sign-on for the OIDC provider. Here, web sign-in refers to console sign-in and gcloud sign-in through the browser. |

### `GoogleIamAdminV1WorkforcePoolProviderOidcClientSecret`

- Representation of a client secret configured for the OIDC provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue | The value of the client secret. |

### `GoogleIamAdminV1WorkforcePoolProviderOidcClientSecretValue`

- Representation of the value of the client secret.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `plainText` | string | Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response. |
| `thumbprint` | string | Output only. A thumbprint to represent the current client secret value. |

### `GoogleIamAdminV1WorkforcePoolProviderOidcWebSsoConfig`

- Configuration for web single sign-on for the OIDC provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalScopes` | array<string> | Optional. Additional scopes to request for in the OIDC authentication request on top of scopes requested by default. By default, the `openid`, `profile` and `email` scopes that are supported by the identity provider are requested. Each additional scope may be at most 256 characters. A maximum of 10 additional scopes may be configured. |
| `assertionClaimsBehavior` | string enum | Required. The behavior for how OIDC Claims are included in the `assertion` object used for attribute mapping and attribute condition. |
| `responseType` | string enum | Required. The Response Type to request for in the OIDC Authorization Request for web sign-in. The `CODE` Response Type is recommended to avoid the Implicit Flow, for security reasons. |

### `GoogleIamAdminV1WorkforcePoolProviderSaml`

- Represents a SAML identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `idpMetadataXml` | string | Required. SAML Identity provider configuration metadata xml doc. The xml document should comply with SAML 2.0 specification (https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The max size of the acceptable xml document will be bounded to 128k characters. The metadata xml document should satisfy the following constraints: 1) Must contain an Identity Provider Entity ID. 2) Must contain at least one non-expired signing key certificate. 3) For each signing key: a) Valid from should be no more than 7 days from now. b) Valid to should be no more than 25 years in the future. 4) Up to 3 IdP signing keys are allowed in the metadata xml. When updating the provider's metadata xml, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata. |

### `GoogleIamV1BindingDelta`

- One delta entry for Binding. Each individual change (only one member in each entry) to a binding will be a separate entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `action` | string enum | The action that was performed on a Binding. Required |
| `condition` | GoogleTypeExpr | The condition that is associated with this binding. |
| `member` | string | A single identity requesting access for a Google Cloud resource. Follows the same format of Binding.members. Required |
| `role` | string | Role that is assigned to `members`. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. Required |

### `GoogleIamV1LoggingAuditData`

- Audit log information specific to Cloud IAM. This message is serialized as an `Any` type in the `ServiceData` message of an `AuditLog` message.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policyDelta` | GoogleIamV1PolicyDelta | Policy delta between the original policy and the newly set policy. |

### `GoogleIamV1PolicyDelta`

- The difference delta between two policies.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bindingDeltas` | array<GoogleIamV1BindingDelta> | The delta for Bindings between two policies. |

### `GoogleIamV1betaWorkloadIdentityPoolOperationMetadata`

- Metadata for long-running WorkloadIdentityPool operations.
- Version: v2

### `GoogleIamV2DenyRule`

- A deny rule in an IAM deny policy.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `denialCondition` | GoogleTypeExpr | The condition that determines whether this deny rule applies to a request. If the condition expression evaluates to `true`, then the deny rule is applied; otherwise, the deny rule is not applied. Each deny rule is evaluated independently. If this deny rule does not apply to a request, other deny rules might still apply. The condition can use CEL functions that evaluate resource tags (https://cloud.google.com/iam/help/conditions/resource-tags). Other functions and operators are not supported. |
| `deniedPermissions` | array<string> | The permissions that are explicitly denied by this rule. Each permission uses the format `{service_fqdn}/{resource}.{verb}`, where `{service_fqdn}` is the fully qualified domain name for the service. For example, `iam.googleapis.com/roles.list`. |
| `deniedPrincipals` | array<string> | The identities that are prevented from using one or more permissions on Google Cloud resources. This field can contain the following values: \* `principal://goog/subject/{email_id}`: A specific Google Account. Includes Gmail, Cloud Identity, and Google Workspace user accounts. For example, `principal://goog/subject/alice@example.com`. \* `principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}`: A Google Cloud service account. For example, `principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com`. \* `principalSet://goog/group/{group_id}`: A Google group. For example, `principalSet://goog/group/admins@example.com`. \* `principalSet://goog/public:all`: A special identifier that represents any principal that is on the internet, even if they do not have a Google Account or are not logged in. \* `principalSet://goog/cloudIdentityCustomerId/{customer_id}`: All of the principals associated with the specified Google Workspace or Cloud Identity customer ID. For example, `principalSet://goog/cloudIdentityCustomerId/C01Abc35`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `principalSet://cloudresourcemanager.googleapis.com/[projects\|folders\|organizations]/{project_number\|folder_number\|org_number}/type/ServiceAccount`: All service accounts grouped under a resource (project, folder, or organization). \* `principalSet://cloudresourcemanager.googleapis.com/[projects\|folders\|organizations]/{project_number\|folder_number\|org_number}/type/ServiceAgent`: All service agents grouped under a resource (project, folder, or organization). \* `deleted:principal://goog/subject/{email_id}?uid={uid}`: A specific Google Account that was deleted recently. For example, `deleted:principal://goog/subject/alice@example.com?uid=1234567890`. If the Google Account is recovered, this identifier reverts to the standard identifier for a Google Account. \* `deleted:principalSet://goog/group/{group_id}?uid={uid}`: A Google group that was deleted recently. For example, `deleted:principalSet://goog/group/admins@example.com?uid=1234567890`. If the Google group is restored, this identifier reverts to the standard identifier for a Google group. \* `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}`: A Google Cloud service account that was deleted recently. For example, `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890`. If the service account is undeleted, this identifier reverts to the standard identifier for a service account. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `exceptionPermissions` | array<string> | Specifies the permissions that this rule excludes from the set of denied permissions given by `denied_permissions`. If a permission appears in `denied_permissions` \_and\_ in `exception_permissions` then it will \_not\_ be denied. The excluded permissions can be specified using the same syntax as `denied_permissions`. |
| `exceptionPrincipals` | array<string> | The identities that are excluded from the deny rule, even if they are listed in the `denied_principals`. For example, you could add a Google group to the `denied_principals`, then exclude specific users who belong to that group. This field can contain the same values as the `denied_principals` field, excluding `principalSet://goog/public:all`, which represents all users on the internet. |

### `GoogleIamV2ListPoliciesResponse`

- Response message for `ListPolicies`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A page token that you can use in a ListPoliciesRequest to retrieve the next page. If this field is omitted, there are no additional pages. |
| `policies` | array<GoogleIamV2Policy> | Metadata for the policies that are attached to the resource. |

### `GoogleIamV2Policy`

- Data for an IAM policy.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | A key-value map to store arbitrary metadata for the `Policy`. Keys can be up to 63 characters. Values can be up to 255 characters. |
| `createTime` | string (google-datetime) | Output only. The time when the `Policy` was created. |
| `deleteTime` | string (google-datetime) | Output only. The time when the `Policy` was deleted. Empty if the policy is not deleted. |
| `displayName` | string | A user-specified description of the `Policy`. This value can be up to 63 characters. |
| `etag` | string | An opaque tag that identifies the current version of the `Policy`. IAM uses this value to help manage concurrent updates, so they do not cause one update to be overwritten by another. If this field is present in a CreatePolicyRequest, the value is ignored. |
| `kind` | string | Output only. The kind of the `Policy`. Always contains the value `DenyPolicy`. |
| `name` | string | Immutable. The resource name of the `Policy`, which must be unique. Format: `policies/{attachment_point}/denypolicies/{policy_id}` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-deny-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, requests can use the alphanumeric or the numeric ID. Responses always contain the numeric ID. |
| `rules` | array<GoogleIamV2PolicyRule> | A list of rules that specify the behavior of the `Policy`. All of the rules should be of the `kind` specified in the `Policy`. |
| `uid` | string | Immutable. The globally unique ID of the `Policy`. Assigned automatically when the `Policy` is created. |
| `updateTime` | string (google-datetime) | Output only. The time when the `Policy` was last updated. |

### `GoogleIamV2PolicyOperationMetadata`

- Metadata for long-running `Policy` operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Timestamp when the `google.longrunning.Operation` was created. |

### `GoogleIamV2PolicyRule`

- A single rule in a `Policy`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `denyRule` | GoogleIamV2DenyRule | A rule for a deny policy. |
| `description` | string | A user-specified description of the rule. This value can be up to 256 characters. |

### `GoogleIamV2betaDenyRule`

- A deny rule in an IAM deny policy.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `denialCondition` | GoogleTypeExpr | The condition that determines whether this deny rule applies to a request. If the condition expression evaluates to `true`, then the deny rule is applied; otherwise, the deny rule is not applied. Each deny rule is evaluated independently. If this deny rule does not apply to a request, other deny rules might still apply. The condition can use CEL functions that evaluate resource tags (https://cloud.google.com/iam/help/conditions/resource-tags). Other functions and operators are not supported. |
| `deniedPermissions` | array<string> | The permissions that are explicitly denied by this rule. Each permission uses the format `{service_fqdn}/{resource}.{verb}`, where `{service_fqdn}` is the fully qualified domain name for the service. For example, `iam.googleapis.com/roles.list`. |
| `deniedPrincipals` | array<string> | The identities that are prevented from using one or more permissions on Google Cloud resources. This field can contain the following values: \* `principal://goog/subject/{email_id}`: A specific Google Account. Includes Gmail, Cloud Identity, and Google Workspace user accounts. For example, `principal://goog/subject/alice@example.com`. \* `principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}`: A Google Cloud service account. For example, `principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com`. \* `principalSet://goog/group/{group_id}`: A Google group. For example, `principalSet://goog/group/admins@example.com`. \* `principalSet://goog/public:all`: A special identifier that represents any principal that is on the internet, even if they do not have a Google Account or are not logged in. \* `principalSet://goog/cloudIdentityCustomerId/{customer_id}`: All of the principals associated with the specified Google Workspace or Cloud Identity customer ID. For example, `principalSet://goog/cloudIdentityCustomerId/C01Abc35`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `principalSet://cloudresourcemanager.googleapis.com/[projects\|folders\|organizations]/{project_number\|folder_number\|org_number}/type/ServiceAccount`: All service accounts grouped under a resource (project, folder, or organization). \* `principalSet://cloudresourcemanager.googleapis.com/[projects\|folders\|organizations]/{project_number\|folder_number\|org_number}/type/ServiceAgent`: All service agents grouped under a resource (project, folder, or organization). \* `deleted:principal://goog/subject/{email_id}?uid={uid}`: A specific Google Account that was deleted recently. For example, `deleted:principal://goog/subject/alice@example.com?uid=1234567890`. If the Google Account is recovered, this identifier reverts to the standard identifier for a Google Account. \* `deleted:principalSet://goog/group/{group_id}?uid={uid}`: A Google group that was deleted recently. For example, `deleted:principalSet://goog/group/admins@example.com?uid=1234567890`. If the Google group is restored, this identifier reverts to the standard identifier for a Google group. \* `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}`: A Google Cloud service account that was deleted recently. For example, `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890`. If the service account is undeleted, this identifier reverts to the standard identifier for a service account. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `exceptionPermissions` | array<string> | Specifies the permissions that this rule excludes from the set of denied permissions given by `denied_permissions`. If a permission appears in `denied_permissions` \_and\_ in `exception_permissions` then it will \_not\_ be denied. The excluded permissions can be specified using the same syntax as `denied_permissions`. |
| `exceptionPrincipals` | array<string> | The identities that are excluded from the deny rule, even if they are listed in the `denied_principals`. For example, you could add a Google group to the `denied_principals`, then exclude specific users who belong to that group. This field can contain the same values as the `denied_principals` field, excluding `principalSet://goog/public:all`, which represents all users on the internet. |

### `GoogleIamV2betaListPoliciesResponse`

- Response message for `ListPolicies`.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A page token that you can use in a ListPoliciesRequest to retrieve the next page. If this field is omitted, there are no additional pages. |
| `policies` | array<GoogleIamV2betaPolicy> | Metadata for the policies that are attached to the resource. |

### `GoogleIamV2betaPolicy`

- Data for an IAM policy.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `annotations` | object | A key-value map to store arbitrary metadata for the `Policy`. Keys can be up to 63 characters. Values can be up to 255 characters. |
| `createTime` | string (google-datetime) | Output only. The time when the `Policy` was created. |
| `deleteTime` | string (google-datetime) | Output only. The time when the `Policy` was deleted. Empty if the policy is not deleted. |
| `displayName` | string | A user-specified description of the `Policy`. This value can be up to 63 characters. |
| `etag` | string | An opaque tag that identifies the current version of the `Policy`. IAM uses this value to help manage concurrent updates, so they do not cause one update to be overwritten by another. If this field is present in a CreatePolicyRequest, the value is ignored. |
| `kind` | string | Output only. The kind of the `Policy`. Always contains the value `DenyPolicy`. |
| `name` | string | Immutable. The resource name of the `Policy`, which must be unique. Format: `policies/{attachment_point}/denypolicies/{policy_id}` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-deny-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, requests can use the alphanumeric or the numeric ID. Responses always contain the numeric ID. |
| `rules` | array<GoogleIamV2betaPolicyRule> | A list of rules that specify the behavior of the `Policy`. All of the rules should be of the `kind` specified in the `Policy`. |
| `uid` | string | Immutable. The globally unique ID of the `Policy`. Assigned automatically when the `Policy` is created. |
| `updateTime` | string (google-datetime) | Output only. The time when the `Policy` was last updated. |

### `GoogleIamV2betaPolicyOperationMetadata`

- Metadata for long-running `Policy` operations.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Timestamp when the `google.longrunning.Operation` was created. |

### `GoogleIamV2betaPolicyRule`

- A single rule in a `Policy`.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `denyRule` | GoogleIamV2betaDenyRule | A rule for a deny policy. |
| `description` | string | A user-specified description of the rule. This value can be up to 256 characters. |

### `GoogleIamV3OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleIamV3alphaOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleIamV3betaOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleIamV3mainOperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `GoogleTypeExpr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `InlineCertificateIssuanceConfig`

- Represents configuration for generating mutual TLS (mTLS) certificates for the identities within this pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caPools` | object | Optional. A required mapping of a Google Cloud region to the CA pool resource located in that region. The CA pool is used for certificate issuance, adhering to the following constraints: \* Key format: A supported cloud region name equivalent to the location identifier in the corresponding map entry's value. \* Value format: A valid CA pool resource path format like: "projects/{project}/locations/{location}/caPools/{ca_pool}" \* Region Matching: Workloads are ONLY issued certificates from CA pools within the same region. Also the CA pool region (in value) must match the workload's region (key). |
| `keyAlgorithm` | string enum | Optional. Key algorithm to use when generating the key pair. This key pair will be used to create the certificate. If not specified, this will default to ECDSA_P256. |
| `lifetime` | string (google-duration) | Optional. Lifetime of the workload certificates issued by the CA pool. Must be between 24 hours and 30 days. If not specified, this will be defaulted to 24 hours. |
| `rotationWindowPercentage` | integer (int32) | Optional. Rotation window percentage, the percentage of remaining lifetime after which certificate rotation is initiated. Must be between 50 and 80. If no value is specified, rotation window percentage is defaulted to 50. |
| `useDefaultSharedCa` | boolean | Optional. Determines whether the trust domain utilizes the Google Cloud-provisioned default CA. A default CA in the same region as the workload will be selected to issue the certificate. Enabling this will clear any existing `ca_pools` configuration to provision the certificates. NOTE: This field is mutually exclusive with `ca_pools`. If this flag is enabled, certificates will be automatically provisioned from the default shared CAs. This flag should not be set if you want to use your own CA pools to provision the certificates. |

### `InlineTrustConfig`

- Defines configuration for extending trust to additional trust domains. By establishing trust with another domain, the current domain will recognize and accept certificates issued by entities within the trusted domains. Note that a trust domain automatically trusts itself, eliminating the need for explicit configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalTrustBundles` | object | Optional. Maps specific trust domains (e.g., "example.com") to their corresponding TrustStore, which contain the trusted root certificates for that domain. There can be a maximum of 10 trust domain entries in this map. Note that a trust domain automatically trusts itself and don't need to be specified here. If however, this WorkloadIdentityPool's trust domain contains any trust anchors in the additional_trust_bundles map, those trust anchors will be \*appended to\* the trust bundle automatically derived from your InlineCertificateIssuanceConfig's ca_pools. |

### `IntermediateCA`

- Intermediate CA certificates used for building the trust chain to trust anchor
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCertificate` | string | PEM certificate of the PKI used for validation. Must only contain one ca certificate. |

### `KeyData`

- Represents a public key data along with its format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `format` | string enum | Output only. The format of the key. |
| `key` | string | Output only. The key data. The format of the key is represented by the format field. |
| `keySpec` | string enum | Required. The specifications for the key. |
| `notAfterTime` | string (google-datetime) | Output only. Latest timestamp when this key is valid. Attempts to use this key after this time will fail. Only present if the key data represents a X.509 certificate. |
| `notBeforeTime` | string (google-datetime) | Output only. Earliest timestamp when this key is valid. Attempts to use this key before this time will fail. Only present if the key data represents a X.509 certificate. |

### `LintPolicyRequest`

- The request to lint an IAM policy object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | google.iam.v1.Binding.condition object to be linted. |
| `fullResourceName` | string | The full resource name of the policy this lint request is about. The name follows the Google Cloud format for full resource names. For example, a Google Cloud project with ID `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. The resource name is not used to read a policy from IAM. Only the data in the request object is linted. |

### `LintPolicyResponse`

- The response of a lint operation. An empty response indicates the operation was able to fully execute and no lint issue was found.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lintResults` | array<LintResult> | List of lint results sorted by `severity` in descending order. |

### `LintResult`

- Structured response of a single validation unit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `debugMessage` | string | Human readable debug message associated with the issue. |
| `fieldName` | string | The name of the field for which this lint result is about. For nested messages `field_name` consists of names of the embedded fields separated by period character. The top-level qualifier is the input object to lint in the request. For example, the `field_name` value `condition.expression` identifies a lint result for the `expression` field of the provided condition. |
| `level` | string enum | The validation unit level. |
| `locationOffset` | integer (int32) | 0-based character position of problematic construct within the object identified by `field_name`. Currently, this is populated only for condition expression. |
| `severity` | string enum | The validation unit severity. |
| `validationUnitName` | string | The validation unit name, for instance "lintValidationUnits/ConditionComplexityCheck". |

### `ListAttestationRulesResponse`

- Response message for ListAttestationRules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationRules` | array<AttestationRule> | A list of AttestationRules. |
| `nextPageToken` | string | Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListOauthClientCredentialsResponse`

- Response message for ListOauthClientCredentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `oauthClientCredentials` | array<OauthClientCredential> | A list of OauthClientCredentials. |

### `ListOauthClientsResponse`

- Response message for ListOauthClients.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `oauthClients` | array<OauthClient> | A list of OauthClients. |

### `ListRolesResponse`

- The response containing the roles defined under a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | To retrieve the next page of results, set `ListRolesRequest.page_token` to this value. |
| `roles` | array<Role> | The Roles defined on this resource. |

### `ListServiceAccountKeysResponse`

- The service account keys list response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keys` | array<ServiceAccountKey> | The public keys for the service account. |

### `ListServiceAccountsResponse`

- The service account list response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accounts` | array<ServiceAccount> | The list of matching service accounts. |
| `nextPageToken` | string | To retrieve the next page of results, set ListServiceAccountsRequest.page_token to this value. |

### `ListWorkforcePoolProviderKeysResponse`

- Response message for ListWorkforcePoolProviderKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workforcePoolProviderKeys` | array<WorkforcePoolProviderKey> | A list of WorkforcePoolProviderKeys. |

### `ListWorkforcePoolProviderScimTenantsResponse`

- Gemini Enterprise only. Response message for ListWorkforcePoolProviderScimTenants.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. Gemini Enterprise only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workforcePoolProviderScimTenants` | array<WorkforcePoolProviderScimTenant> | Output only. Gemini Enterprise only. A list of SCIM tenants. |

### `ListWorkforcePoolProviderScimTokensResponse`

- Gemini Enterprise only. Response message for ListWorkforcePoolProviderScimTokens.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. Gemini Enterprise only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workforcePoolProviderScimTokens` | array<WorkforcePoolProviderScimToken> | Output only. Gemini Enterprise only. A list of SCIM tokens. |

### `ListWorkforcePoolProvidersResponse`

- Response message for ListWorkforcePoolProviders.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workforcePoolProviders` | array<WorkforcePoolProvider> | A list of providers. |

### `ListWorkforcePoolsResponse`

- Response message for ListWorkforcePools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workforcePools` | array<WorkforcePool> | A list of pools. |

### `ListWorkloadIdentityPoolManagedIdentitiesResponse`

- Response message for ListWorkloadIdentityPoolManagedIdentities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workloadIdentityPoolManagedIdentities` | array<WorkloadIdentityPoolManagedIdentity> | A list of managed identities. |

### `ListWorkloadIdentityPoolNamespacesResponse`

- Response message for ListWorkloadIdentityPoolNamespaces.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workloadIdentityPoolNamespaces` | array<WorkloadIdentityPoolNamespace> | A list of namespaces. |

### `ListWorkloadIdentityPoolProviderKeysResponse`

- Response message for ListWorkloadIdentityPoolProviderKeys.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workloadIdentityPoolProviderKeys` | array<WorkloadIdentityPoolProviderKey> | A list of WorkloadIdentityPoolProviderKey |

### `ListWorkloadIdentityPoolProvidersResponse`

- Response message for ListWorkloadIdentityPoolProviders.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workloadIdentityPoolProviders` | array<WorkloadIdentityPoolProvider> | A list of providers. |

### `ListWorkloadIdentityPoolsResponse`

- Response message for ListWorkloadIdentityPools.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workloadIdentityPools` | array<WorkloadIdentityPool> | A list of pools. |

### `OauthClient`

- Represents an OauthClient. Used to access Google Cloud resources on behalf of a Workforce Identity Federation user by using OAuth 2.0 Protocol to obtain an access token from Google Cloud.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedGrantTypes` | array<string> | Optional. The list of OAuth grant types is allowed for the OauthClient. |
| `allowedRedirectUris` | array<string> | Required. The list of redirect uris that is allowed to redirect back when authorization process is completed. |
| `allowedScopes` | array<string> | Required. The list of scopes that the OauthClient is allowed to request during OAuth flows. The following scopes are supported: \* `https://www.googleapis.com/auth/cloud-platform`: See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account. |
| `clientId` | string | Output only. The system-generated OauthClient id. |
| `clientType` | string enum | Immutable. The type of OauthClient. Either public or private. For private clients, the client secret can be managed using the dedicated OauthClientCredential resource. |
| `description` | string | Optional. A user-specified description of the OauthClient. Cannot exceed 256 characters. |
| `disabled` | boolean | Optional. Whether the OauthClient is disabled. You cannot use a disabled OAuth client. |
| `displayName` | string | Optional. A user-specified display name of the OauthClient. Cannot exceed 32 characters. |
| `expireTime` | string (google-datetime) | Output only. Time after which the OauthClient will be permanently purged and cannot be recovered. |
| `name` | string | Immutable. Identifier. The resource name of the OauthClient. Format:`projects/{project}/locations/{location}/oauthClients/{oauth_client}`. |
| `state` | string enum | Output only. The state of the OauthClient. |

### `OauthClientCredential`

- Represents an OauthClientCredential. Used to authenticate an OauthClient while accessing Google Cloud resources on behalf of a user by using OAuth 2.0 Protocol.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientSecret` | string | Output only. The system-generated OAuth client secret. The client secret must be stored securely. If the client secret is leaked, you must delete and re-create the client credential. To learn more, see OAuth client and credential security risks and mitigations (https://cloud.google.com/iam/docs/workforce-oauth-app#security) |
| `disabled` | boolean | Optional. Whether the OauthClientCredential is disabled. You cannot use a disabled OauthClientCredential. |
| `displayName` | string | Optional. A user-specified display name of the OauthClientCredential. Cannot exceed 32 characters. |
| `name` | string | Immutable. Identifier. The resource name of the OauthClientCredential. Format: `projects/{project}/locations/{location}/oauthClients/{oauth_client}/credentials/{credential}` |

### `Oidc`

- Represents an OpenId Connect 1.0 identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedAudiences` | array<string> | Optional. Acceptable values for the `aud` field (audience) in the OIDC token. Token exchange requests are rejected if the token audience does not match one of the configured values. Each audience may be at most 256 characters. A maximum of 10 audiences may be configured. If this list is empty, the OIDC token audience must be equal to the full canonical resource name of the WorkloadIdentityPoolProvider, with or without the HTTPS prefix. For example: //iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ https://iam.googleapis.com/projects//locations//workloadIdentityPools//providers/ |
| `discoveryUri` | string | Optional. The URL to fetch the OIDC discovery document from, overriding the default URL derived from `issuer_uri`. If not set, `discovery_uri` defaults to `issuer_uri` with `/.well-known/openid-configuration` appended, as per the OpenID Connect Discovery 1.0 specification. If set, `discovery_uri` must meet the following requirements: - Must start with `https://`. - Must not exceed 2000 characters. - The scheme, host, and port must match `issuer_uri`. - The path must contain `/.well-known/` (where `` is not empty, such as `openid-configuration`) and conform to the `issuer_uri` topology: - The well-known path segment is inserted before the issuer path (for example, `https://example.com/.well-known/openid-configuration/tenant1` for issuer `https://example.com/tenant1`), or - The well-known path segment is appended under the issuer path (for example, `https://example.com/tenant1/.well-known/openid-configuration` for issuer `https://example.com/tenant1`). |
| `issuerUri` | string | Required. The OIDC `issuer_uri`. Must be an HTTPS endpoint. Per OpenID Connect Discovery 1.0 spec, the OIDC issuer URL is used to locate the provider's public keys (via `jwks_uri`) for verifying tokens like the OIDC ID token. These public key types must be 'EC' or 'RSA'. |
| `jwksJson` | string | Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document(fetched from the .well-known path of the `issuer_uri`) will be used. Currently, RSA and EC asymmetric keys are supported. The JWK must use following format and include only the following fields: { "keys": \[ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } \] } |

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
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OwnerService`

- The Google Cloud service that owns this namespace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `principalSubject` | string | Required. The service agent principal subject, e.g. "serviceAccount:service-1234@gcp-sa-gkehub.iam.gserviceaccount.com". |

### `PatchServiceAccountRequest`

- The service account patch request. You can patch only the `display_name` and `description` fields. You must use the `update_mask` field to specify which of these fields you want to patch. Only the fields specified in the request are guaranteed to be returned in the response. Other fields may be empty in the response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAccount` | ServiceAccount | — |
| `updateMask` | string (google-fieldmask) | — |

### `Permission`

- A permission which can be included by a role.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiDisabled` | boolean | The service API associated with the permission is not enabled. |
| `customRolesSupportLevel` | string enum | The current custom role support level. |
| `description` | string | A brief description of what this Permission is used for. |
| `name` | string | The name of this Permission. |
| `onlyInPredefinedRoles` | boolean | — |
| `primaryPermission` | string | The preferred name for this permission. If present, then this permission is an alias of, and equivalent to, the listed primary_permission. |
| `stage` | string enum | The current launch stage of the permission. |
| `title` | string | The title of this Permission. |

### `PermissionDelta`

- A PermissionDelta message to record the added_permissions and removed_permissions inside a role.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addedPermissions` | array<string> | Added permissions. |
| `removedPermissions` | array<string> | Removed permissions. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PolicyDelta`

- The difference delta between two policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindingDeltas` | array<BindingDelta> | The delta for Bindings between two policies. |

### `QueryAuditableServicesRequest`

- A request to get the list of auditable services for a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | Required. The full resource name to query from the list of auditable services. The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. |

### `QueryAuditableServicesResponse`

- A response containing a list of auditable services for a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `services` | array<AuditableService> | The auditable services for a resource. |

### `QueryGrantableRolesRequest`

- The grantable role query request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | Required. Required. The full resource name to query from the list of grantable roles. The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. |
| `pageSize` | integer (int32) | Optional limit on the number of roles to include in the response. The default is 300, and the maximum is 3,000. |
| `pageToken` | string | Optional pagination token returned in an earlier QueryGrantableRolesResponse. |
| `view` | string enum | — |

### `QueryGrantableRolesResponse`

- The grantable role query response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | To retrieve the next page of results, set `QueryGrantableRolesRequest.page_token` to this value. |
| `roles` | array<Role> | The list of matching roles. |

### `QueryTestablePermissionsRequest`

- A request to get permissions which can be tested on a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | Required. The full resource name to query from the list of testable permissions. The name follows the Google Cloud Platform resource format. For example, a Cloud Platform project with id `my-project` will be named `//cloudresourcemanager.googleapis.com/projects/my-project`. |
| `pageSize` | integer (int32) | Optional limit on the number of permissions to include in the response. The default is 100, and the maximum is 1,000. |
| `pageToken` | string | Optional pagination token returned in an earlier QueryTestablePermissionsRequest. |

### `QueryTestablePermissionsResponse`

- The response containing permissions which can be tested on a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | To retrieve the next page of results, set `QueryTestableRolesRequest.page_token` to this value. |
| `permissions` | array<Permission> | The Permissions testable on the requested resource. |

### `ReconciliationOperationMetadata`

- Operation metadata returned by the CLH during resource state reconciliation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteResource` | boolean | DEPRECATED. Use exclusive_action instead. |
| `exclusiveAction` | string enum | Excluisive action returned by the CLH. |

### `RemoveAttestationRuleRequest`

- Request message for RemoveAttestationRule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationRule` | AttestationRule | Required. The attestation rule to be removed. |

### `RevokeWorkforcePoolSubjectSessionsRequest`

- Request message for RevokeWorkforcePoolSubjectSessions.
- Version: v1

### `Role`

- A role in the Identity and Access Management API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleted` | boolean | The current deleted state of the role. This field is read only. It will be ignored in calls to CreateRole and UpdateRole. |
| `description` | string | Optional. A human-readable description for the role. |
| `etag` | string (byte) | Used to perform a consistent read-modify-write. |
| `includedPermissions` | array<string> | The names of the permissions this role grants when bound in an IAM policy. |
| `name` | string | The name of the role. When `Role` is used in `CreateRole`, the role name must not be set. When `Role` is used in output and other input such as `UpdateRole`, the role name is the complete path. For example, `roles/logging.viewer` for predefined roles, `organizations/{ORGANIZATION_ID}/roles/myRole` for organization-level custom roles, and `projects/{PROJECT_ID}/roles/myRole` for project-level custom roles. |
| `stage` | string enum | The current launch stage of the role. If the `ALPHA` launch stage has been selected for a role, the `stage` field will not be included in the returned definition for the role. |
| `title` | string | Optional. A human-readable title for the role. Typically this is limited to 100 UTF-8 bytes. |

### `Saml`

- Represents an SAML 2.0 identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `idpMetadataXml` | string | Required. SAML identity provider (IdP) configuration metadata XML doc. The XML document must comply with the SAML 2.0 specification (https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The maximum size of an acceptable XML document is 128K characters. The SAML metadata XML document must satisfy the following constraints: \* Must contain an IdP Entity ID. \* Must contain at least one non-expired signing certificate. \* For each signing certificate, the expiration must be: \* From no more than 7 days in the future. \* To no more than 25 years in the future. \* Up to three IdP signing keys are allowed. When updating the provider's metadata XML, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata. |

### `ServiceAccount`

- An IAM service account. A service account is an account for an application or a virtual machine (VM) instance, not a person. You can use a service account to call Google APIs. To learn more, read the overview of service accounts (https://cloud.google.com/iam/help/service-accounts/overview). When you create a service account, you specify the project ID that owns the service account, as well as a name that must be unique within the project. IAM uses these values to create an email address that identifies the service account. //
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A user-specified, human-readable description of the service account. The maximum length is 256 UTF-8 bytes. |
| `disabled` | boolean | Output only. Whether the service account is disabled. |
| `displayName` | string | Optional. A user-specified, human-readable name for the service account. The maximum length is 100 UTF-8 bytes. |
| `email` | string | Output only. The email address of the service account. |
| `etag` | string (byte) | Deprecated. Do not use. |
| `name` | string | The resource name of the service account. Use one of the following formats: \* `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` As an alternative, you can use the `-` wildcard character instead of the project ID: \* `projects/-/serviceAccounts/{EMAIL_ADDRESS}` \* `projects/-/serviceAccounts/{UNIQUE_ID}` When possible, avoid using the `-` wildcard character, because it can cause response messages to contain misleading error codes. For example, if you try to access the service account `projects/-/serviceAccounts/fake@example.com`, which does not exist, the response contains an HTTP `403 Forbidden` error instead of a `404 Not Found` error. |
| `oauth2ClientId` | string | Output only. The OAuth 2.0 client ID for the service account. |
| `projectId` | string | Output only. The ID of the project that owns the service account. |
| `uniqueId` | string | Output only. The unique, stable numeric ID for the service account. Each service account retains its unique ID even if you delete the service account. For example, if you delete a service account, then create a new service account with the same name, the new service account has a different unique ID than the deleted service account. |

### `ServiceAccountKey`

- Represents a service account key. A service account has two sets of key-pairs: user-managed and system-managed. System-managed keys are also called \_Google-owned and managed keys\_. User-managed key-pairs can be created and deleted by users. Users are responsible for rotating these keys periodically to ensure security of their service accounts. Users retain the private key of these key-pairs, and Google retains ONLY the public key. System-managed keys that are actively used for signing are rotated regularly according to security best practices (https://docs.cloud.google.com/iam/docs/key-rotation#timing). The rotation process is probabilistic, and usage of the new key will gradually ramp up and down over the key's lifetime. If you cache the public key set for a service account, we recommend that you update the cache every 15 minutes. User-managed keys can be added and removed at any time, so it is important to update the cache frequently. For Google-managed keys, Google will publish a key at least 6 hours before it is first used for signing and will keep publishing it for at least 6 hours after it was last used for signing. Public keys for all service accounts are also published at the OAuth2 Service Account API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableReason` | string enum | Output only. optional. If the key is disabled, it may have a DisableReason describing why it was disabled. |
| `disabled` | boolean | The key status. |
| `extendedStatus` | array<ExtendedStatus> | Output only. Extended Status provides permanent information about a service account key. For example, if this key was detected as exposed or compromised, that information will remain for the lifetime of the key in the extended_status. |
| `keyAlgorithm` | string enum | Specifies the algorithm (and possibly key size) for the key. |
| `keyOrigin` | string enum | The key origin. |
| `keyType` | string enum | The key type. |
| `name` | string | The resource name of the service account key in the following format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`. |
| `privateKeyData` | string (byte) | The private key data. Only provided in `CreateServiceAccountKey` responses. Make sure to keep the private key data secure because it allows for the assertion of the service account identity. When base64 decoded, the private key data can be used to authenticate with Google API client libraries and with gcloud auth activate-service-account. |
| `privateKeyType` | string enum | The output format for the private key. Only provided in `CreateServiceAccountKey` responses, not in `GetServiceAccountKey` or `ListServiceAccountKey` responses. Google never exposes system-managed private keys, and never retains user-managed private keys. |
| `publicKeyData` | string (byte) | The public key data. Only provided in `GetServiceAccountKey` responses. |
| `validAfterTime` | string (google-datetime) | The key can be used after this timestamp. |
| `validBeforeTime` | string (google-datetime) | The key can be used before this timestamp. For system-managed key pairs, this timestamp is the end time for the private key signing operation. The public key could still be used for verification for a few hours after this time. |

### `ServiceConfig`

- Configuration for a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | Optional. Domain name of the service. Example: console.cloud.google |

### `SetAttestationRulesRequest`

- Request message for SetAttestationRules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationRules` | array<AttestationRule> | Required. The attestation rules to be set. At most 50 attestation rules can be set. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SignBlobRequest`

- Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The service account sign blob request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bytesToSign` | string (byte) | Required. Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The bytes to sign. |

### `SignBlobResponse`

- Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The service account sign blob response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The id of the key used to sign the blob. |
| `signature` | string (byte) | Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The signed blob. |

### `SignJwtRequest`

- Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The service account sign JWT request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `payload` | string | Required. Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The JWT payload to sign. Must be a serialized JSON object that contains a JWT Claims Set. For example: `{"sub": "user@example.com", "iat": 313435}` If the JWT Claims Set contains an expiration time (`exp`) claim, it must be an integer timestamp that is not in the past and no more than 12 hours in the future. If the JWT Claims Set does not contain an expiration time (`exp`) claim, this claim is added automatically, with a timestamp that is 1 hour in the future. |

### `SignJwtResponse`

- Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The service account sign JWT response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyId` | string | Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The id of the key used to sign the JWT. |
| `signedJwt` | string | Deprecated. Migrate to Service Account Credentials API (https://cloud.google.com/iam/help/credentials/migrate-api). The signed JWT. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

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

### `TrustAnchor`

- Represents a root of trust.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemCertificate` | string | PEM certificate of the PKI used for validation. Must only contain one ca certificate (either root or intermediate cert). |

### `TrustStore`

- Trust store that contains trust anchors and optional intermediate CAs used in PKI to build a trust chain(trust hierarchy) and verify a client's identity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `intermediateCas` | array<IntermediateCA> | Optional. Set of intermediate CA certificates used for building the trust chain to the trust anchor. Important: Intermediate CAs are only supported for X.509 federation. |
| `trustAnchors` | array<TrustAnchor> | Required. List of trust anchors to be used while performing validation against a given TrustStore. The incoming end entity's certificate must be in the trust chain of one of the trust anchors here. |
| `trustDefaultSharedCa` | boolean | Optional. Determines whether the trust bundle includes the private CA managed identity regional root public certificates. Important: `trust_default_shared_ca` is only supported for managed identity trust domain resource. |

### `UndeleteOauthClientRequest`

- Request message for UndeleteOauthClient.
- Version: v1

### `UndeleteRoleRequest`

- The request to undelete an existing role.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string (byte) | Used to perform a consistent read-modify-write. |

### `UndeleteServiceAccountRequest`

- The service account undelete request.
- Version: v1

### `UndeleteServiceAccountResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `restoredAccount` | ServiceAccount | Metadata for the restored service account. |

### `UndeleteWorkforcePoolProviderKeyRequest`

- Request message for UndeleteWorkforcePoolProviderKey.
- Version: v1

### `UndeleteWorkforcePoolProviderRequest`

- Request message for UndeleteWorkforcePoolProvider.
- Version: v1

### `UndeleteWorkforcePoolProviderScimTenantRequest`

- Gemini Enterprise only. Request message for UndeleteWorkforcePoolProviderScimTenant.
- Version: v1

### `UndeleteWorkforcePoolRequest`

- Request message for UndeleteWorkforcePool.
- Version: v1

### `UndeleteWorkforcePoolSubjectRequest`

- Request message for UndeleteWorkforcePoolSubject.
- Version: v1

### `UndeleteWorkloadIdentityPoolManagedIdentityRequest`

- Request message for UndeleteWorkloadIdentityPoolManagedIdentity.
- Version: v1

### `UndeleteWorkloadIdentityPoolNamespaceRequest`

- Request message for UndeleteWorkloadIdentityPoolNamespace.
- Version: v1

### `UndeleteWorkloadIdentityPoolProviderKeyRequest`

- Request message for UndeleteWorkloadIdentityPoolProviderKey.
- Version: v1

### `UndeleteWorkloadIdentityPoolProviderRequest`

- Request message for UndeleteWorkloadIdentityPoolProvider.
- Version: v1

### `UndeleteWorkloadIdentityPoolRequest`

- Request message for UndeleteWorkloadIdentityPool.
- Version: v1

### `UploadServiceAccountKeyRequest`

- The service account key upload request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicKeyData` | string (byte) | The public key to associate with the service account. Must be an RSA public key that is wrapped in an X.509 v3 certificate. Include the first line, `-----BEGIN CERTIFICATE-----`, and the last line, `-----END CERTIFICATE-----`. |

### `WorkforcePool`

- Represents a collection of external workforces. Provides namespaces for federated users that can be referenced in IAM policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessRestrictions` | AccessRestrictions | Optional. Configure access restrictions on the workforce pool users. This is an optional field. If specified web sign-in can be restricted to given set of services or programmatic sign-in can be disabled for pool users. |
| `description` | string | Optional. A description of the pool. Cannot exceed 256 characters. |
| `disabled` | boolean | Optional. Disables the workforce pool. You cannot use a disabled pool to exchange tokens, or use existing tokens to access resources. If the pool is re-enabled, existing tokens grant access again. |
| `displayName` | string | Optional. A display name for the pool. Cannot exceed 32 characters. |
| `expireTime` | string (google-datetime) | Output only. Time after which the workforce pool will be permanently purged and cannot be recovered. |
| `name` | string | Identifier. The resource name of the pool. Format: `locations/{location}/workforcePools/{workforce_pool_id}` |
| `parent` | string | Immutable. The resource name of the parent. Format: `organizations/{org-id}`. |
| `sessionDuration` | string (google-duration) | Optional. Duration that the Google Cloud access tokens, console sign-in sessions, and `gcloud` sign-in sessions from this pool are valid. Must be greater than 15 minutes (900s) and less than 12 hours (43200s). If `session_duration` is not configured, minted credentials have a default duration of one hour (3600s). For SAML providers, the lifetime of the token is the minimum of the `session_duration` and the `SessionNotOnOrAfter` claim in the SAML assertion. |
| `state` | string enum | Output only. The state of the pool. |

### `WorkforcePoolProvider`

- A configuration for an external identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributeCondition` | string | Optional. A Common Expression Language (https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: \* `assertion`: JSON representing the authentication credential issued by the provider. \* `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. `google.profile_photo`, `google.display_name` and `google.posix_username` are not supported. \* `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the attribute condition expression is 4096 characters. If unspecified, all valid authentication credentials will be accepted. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: "'admins' in google.groups" |
| `attributeMapping` | object | Required. Maps attributes from the authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: \* `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. \* `google.groups`: Groups the authenticating user belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. \* `google.display_name`: The name of the authenticated user. This is an optional field and the mapped display name cannot exceed 100 bytes. If not set, `google.subject` will be displayed instead. This attribute cannot be referenced in IAM bindings. \* `google.profile_photo`: The URL that specifies the authenticated user's thumbnail photo. This is an optional field. When set, the image will be visible as the user's profile picture. If not set, a generic user icon will be displayed instead. This attribute cannot be referenced in IAM bindings. \* `google.posix_username`: The Linux username used by OS Login. This is an optional field and the mapped POSIX username cannot exceed 32 characters. The key must match the regex `^a-zA-Z0-9._{0,31}$`. This attribute cannot be referenced in IAM bindings. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where {custom_attribute} is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters `[a-z0-9_]`. You can reference these attributes in IAM policies to define fine-grained access for a workforce pool to Google Cloud resources. For example: \* `google.subject`: `principal://iam.googleapis.com/locations/global/workforcePools/{pool}/subject/{value}` \* `google.groups`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/group/{value}` \* `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a \[Common Expression Language\] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 16 KB. For OIDC providers, you must supply a custom mapping that includes the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: {"google.subject": "assertion.sub"} |
| `description` | string | Optional. A description of the provider. Cannot exceed 256 characters. |
| `detailedAuditLogging` | boolean | Optional. If true, populates additional debug information in Cloud Audit Logs for this provider. Logged attribute mappings and values can be found in `sts.googleapis.com` data access logs. Default value is false. |
| `disabled` | boolean | Optional. Disables the workforce pool provider. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access. |
| `displayName` | string | Optional. A display name for the provider. Cannot exceed 32 characters. |
| `expireTime` | string (google-datetime) | Output only. Time after which the workforce identity pool provider will be permanently purged and cannot be recovered. |
| `extendedAttributesOauth2Client` | GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client | Optional. The configuration for OAuth 2.0 client used to get the extended group memberships for user identities. Only the `AZURE_AD_GROUPS_ID` attribute type is supported. Extended groups supports a subset of Google Cloud services. When the user accesses these services, extended group memberships override the mapped `google.groups` attribute. Extended group memberships cannot be used in attribute mapping or attribute condition expressions. To keep extended group memberships up to date, extended groups are retrieved when the user signs in and at regular intervals during the user's active session. Each user identity in the workforce identity pool must map to a unique Microsoft Entra ID user. |
| `extraAttributesOauth2Client` | GoogleIamAdminV1WorkforcePoolProviderExtraAttributesOAuth2Client | Optional. Defines the configuration for the OAuth 2.0 client that is used to get the additional user attributes in a separate backchannel call to the identity provider. This should be used when users can't get the required claims in authentication credentials. Currently, the OAuth 2.0 protocol is the only supported authorization method for this backchannel call. |
| `name` | string | Identifier. The resource name of the provider. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}` |
| `oidc` | GoogleIamAdminV1WorkforcePoolProviderOidc | An OpenID Connect 1.0 identity provider configuration. |
| `saml` | GoogleIamAdminV1WorkforcePoolProviderSaml | A SAML identity provider configuration. |
| `scimUsage` | string enum | Optional. Gemini Enterprise only. Specifies whether the workforce identity pool provider uses SCIM-managed groups instead of the `google.groups` attribute mapping for authorization checks. The `scim_usage` and `extended_attributes_oauth2_client` fields are mutually exclusive. A request that enables both fields on the same workforce identity pool provider will produce an error. |
| `state` | string enum | Output only. The state of the provider. |
| `vendorType` | string enum | Optional. The vendor type of the third-party identity provider. |

### `WorkforcePoolProviderKey`

- Represents a public key configuration for a Workforce Pool Provider. The key can be configured in your identity provider to encrypt SAML assertions. Google holds the corresponding private key, which it uses to decrypt encrypted tokens.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | Output only. The time after which the key will be permanently deleted and cannot be recovered. Note that the key may get purged before this time if the total limit of keys per provider is exceeded. |
| `keyData` | KeyData | Immutable. Public half of the asymmetric key. |
| `name` | string | Identifier. The resource name of the key. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}/keys/{key_id}` |
| `state` | string enum | Output only. The state of the key. |
| `use` | string enum | Required. The purpose of the key. |

### `WorkforcePoolProviderScimTenant`

- Gemini Enterprise only. Represents a SCIM tenant. Used for provisioning and managing identity data (such as Users and Groups) in cross-domain environments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseUri` | string | Output only. Gemini Enterprise only. Represents the base URI as defined in RFC 7644, Section 1.3 (https://datatracker.ietf.org/doc/html/rfc7644#section-1.3). Clients must use this as the root address for managing resources under the tenant. Format: https://iamscim.googleapis.com/{version}/{tenant_id}/ |
| `claimMapping` | object | Required. Immutable. Gemini Enterprise only. Maps SCIM attributes to Google attributes. This mapping is used to associate the attributes synced via SCIM with the Google Cloud attributes used in IAM policies for Workforce Identity Federation. SCIM-managed user and group attributes are mapped to `google.subject` and `google.group` respectively. Each key must be a string specifying the Google Cloud IAM attribute to map to. The supported keys are as follows: \* `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. \* `google.group`: Group the authenticating user belongs to. You can grant group access to resources using an IAM `principalSet` binding; access applies to all members of the group. Each value must be a \[Common Expression Language\] (https://opensource.google/projects/cel) expression that maps SCIM user or group attribute to the normalized attribute specified by the corresponding map key. Example: To map the SCIM user's `externalId` to `google.subject` and the SCIM group's `externalId` to `google.group`: { "google.subject": "user.externalId", "google.group": "group.externalId" } |
| `description` | string | Optional. Gemini Enterprise only. The description of the SCIM tenant. Cannot exceed 256 characters. |
| `displayName` | string | Optional. Gemini Enterprise only. The display name of the SCIM tenant. Cannot exceed 32 characters. |
| `name` | string | Identifier. Gemini Enterprise only. The resource name of the SCIM Tenant. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}` |
| `purgeTime` | string (google-datetime) | Output only. Gemini Enterprise only. The timestamp that represents the time when the SCIM tenant is purged. |
| `serviceAgent` | string | Output only. Service Agent created by SCIM Tenant API. SCIM tokens created under this tenant will be attached to this service agent. |
| `state` | string enum | Output only. Gemini Enterprise only. The state of the tenant. |

### `WorkforcePoolProviderScimToken`

- Gemini Enterprise only. Represents a token for the WorkforcePoolProviderScimTenant. Used for authenticating SCIM provisioning requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. Gemini Enterprise only. The display name of the SCIM token. Cannot exceed 32 characters. |
| `name` | string | Identifier. Gemini Enterprise only. The resource name of the SCIM Token. Format: `locations/{location}/workforcePools/{workforce_pool}/providers/ {workforce_pool_provider}/scimTenants/{scim_tenant}/tokens/{token}` |
| `securityToken` | string | Output only. Gemini Enterprise only. The token string. Provide this to the IdP for authentication. Will be set only during creation. |
| `state` | string enum | Output only. Gemini Enterprise only. The state of the token. |

### `WorkloadIdentityPool`

- Represents a collection of workload identities. You can define IAM policies to grant these identities access to Google Cloud resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A description of the pool. Cannot exceed 256 characters. |
| `disabled` | boolean | Optional. Whether the pool is disabled. You cannot use a disabled pool to exchange tokens, or use existing tokens to access resources. If the pool is re-enabled, existing tokens grant access again. |
| `displayName` | string | Optional. A display name for the pool. Cannot exceed 32 characters. |
| `expireTime` | string (google-datetime) | Output only. Time after which the workload identity pool will be permanently purged and cannot be recovered. |
| `inlineCertificateIssuanceConfig` | InlineCertificateIssuanceConfig | Optional. Defines the Certificate Authority (CA) pool resources and configurations required for issuance and rotation of mTLS workload certificates. |
| `inlineTrustConfig` | InlineTrustConfig | Optional. Represents config to add additional trusted trust domains. |
| `mode` | string enum | Immutable. The mode the pool is operating in. |
| `name` | string | Identifier. The resource name of the pool. |
| `state` | string enum | Output only. The state of the pool. |

### `WorkloadIdentityPoolManagedIdentity`

- Represents a managed identity for a workload identity pool namespace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A description of the managed identity. Cannot exceed 256 characters. |
| `disabled` | boolean | Optional. Whether the managed identity is disabled. If disabled, credentials may no longer be issued for the identity, however existing credentials will still be accepted until they expire. |
| `expireTime` | string (google-datetime) | Output only. Time after which the managed identity will be permanently purged and cannot be recovered. |
| `name` | string | Identifier. The resource name of the managed identity. |
| `state` | string enum | Output only. The state of the managed identity. |

### `WorkloadIdentityPoolNamespace`

- Represents a namespace for a workload identity pool. Namespaces are used to segment identities within the pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A description of the namespace. Cannot exceed 256 characters. |
| `disabled` | boolean | Optional. Whether the namespace is disabled. If disabled, credentials may no longer be issued for identities within this namespace, however existing credentials will still be accepted until they expire. |
| `expireTime` | string (google-datetime) | Output only. Time after which the namespace will be permanently purged and cannot be recovered. |
| `name` | string | Identifier. The resource name of the namespace. |
| `ownerService` | OwnerService | Output only. The Google Cloud service that owns this namespace. |
| `state` | string enum | Output only. The state of the namespace. |

### `WorkloadIdentityPoolOperationMetadata`

- Metadata for long-running WorkloadIdentityPool operations.
- Version: v1

### `WorkloadIdentityPoolProvider`

- A configuration for an external identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actorProviders` | array<string> | Optional. A list of the resource names of WorkloadIdentityPoolProviders in the same pool that are authorized to issue actor tokens for this provider. An actor token represents the identity of the acting party to whom authority is delegated. At most 3 actor providers can be specified. |
| `attributeCondition` | string | Optional. A Common Expression Language (https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: \* `assertion`: JSON representing the authentication credential issued by the provider. \* `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. \* `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the `attribute_condition` expression is 4,096 characters. Providing a condition longer than this will result in an error. If unspecified, all valid authentication credentials are accepted. However, multi-tenant identity providers (such as GitHub or Terraform Cloud) require an `attribute_condition` to prevent token spoofing. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: "'admins' in google.groups" |
| `attributeMapping` | object | Optional. Maps attributes from authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: \* `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. Cannot exceed 127 bytes. \* `google.groups`: Groups the external identity belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where `{custom_attribute}` is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters \[a-z0-9\_\]. You can reference these attributes in IAM policies to define fine-grained access for a workload to Google Cloud resources. For example: \* `google.subject`: `principal://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/subject/{value}` \* `google.groups`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/group/{value}` \* `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/projects/{project}/locations/{location}/workloadIdentityPools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a \[Common Expression Language\] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 8KB. For AWS providers, if no attribute mapping is defined, the following default mapping applies: { "google.subject":"assertion.arn", "attribute.aws_role": "assertion.arn.contains('assumed-role')" " ? assertion.arn.extract('{account_arn}assumed-role/')" " + 'assumed-role/'" " + assertion.arn.extract('assumed-role/{role_name}/')" " : assertion.arn", } If any custom attribute mappings are defined, they must include a mapping to the `google.subject` attribute. For OIDC providers, you must supply a custom mapping, which must include the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: {"google.subject": "assertion.sub"} |
| `aws` | Aws | An Amazon Web Services identity provider. |
| `description` | string | Optional. A description for the provider. Cannot exceed 256 characters. |
| `disabled` | boolean | Optional. Whether the provider is disabled. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access. |
| `displayName` | string | Optional. A display name for the provider. Cannot exceed 32 characters. |
| `expireTime` | string (google-datetime) | Output only. Time after which the workload identity pool provider will be permanently purged and cannot be recovered. |
| `name` | string | Identifier. The resource name of the provider. |
| `oidc` | Oidc | An OpenId Connect 1.0 identity provider. |
| `saml` | Saml | An SAML 2.0 identity provider. |
| `state` | string enum | Output only. The state of the provider. |
| `x509` | X509 | An X.509-type identity provider. |

### `WorkloadIdentityPoolProviderKey`

- Represents a public key configuration for your workload identity pool provider. The key can be configured in your identity provider to encrypt the SAML assertions. Google holds the corresponding private key which it uses to decrypt encrypted tokens.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | Output only. Time after which the key will be permanently purged and cannot be recovered. Note that the key may get purged before this timestamp if the total limit of keys per provider is crossed. |
| `keyData` | KeyData | Immutable. Public half of the asymmetric key. |
| `name` | string | Identifier. The resource name of the key. |
| `state` | string enum | Output only. The state of the key. |
| `use` | string enum | Required. The purpose of the key. |

### `X509`

- An X.509-type identity provider represents a CA. It is trusted to assert a client identity if the client has a certificate that chains up to this CA.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `trustStore` | TrustStore | Required. A TrustStore. Use this trust store as a wrapper to config the trust anchor and optional intermediate cas to help build the trust chain for the incoming end entity certificate. Follow the X.509 guidelines to define those PEM encoded certs. Only one trust store is currently supported. |

### Shape of `AccessRestrictions`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "allowedServices": "array<ServiceConfig>",
  "disableProgrammaticSignin": "boolean"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta of `iam` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://iam.googleapis.com/$discovery/rest?version=v2, https://iam.googleapis.com/$discovery/rest?version=v1, https://iam.googleapis.com/$discovery/rest?version=v2beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
