---
source: https://connectors.googleapis.com/$discovery/rest?version=v2
---

# Connectors API message schemas (connectors) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/connectors/`.

### `AccessCredentials`

- AccessCredentials includes the OAuth access token, and the other fields returned along with it.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | OAuth access token. |
| `expiresIn` | string (google-duration) | Duration till the access token expires. |
| `refreshToken` | string | OAuth refresh token. |

### `Action`

- Action message contains metadata information about a single action present in the external system.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Brief Description of action |
| `displayName` | string | Display Name of action to be shown on client side |
| `inputJsonSchema` | JsonSchema | JsonSchema representation of this actions's input schema |
| `inputParameters` | array<InputParameter> | List containing input parameter metadata. |
| `metadata` | object | Metadata like service latency, etc. |
| `name` | string | Name of the action. |
| `resultJsonSchema` | JsonSchema | JsonSchema representation of this actions's result schema |
| `resultMetadata` | array<ResultMetadata> | List containing the metadata of result fields. |

### `AdminFilters`

- \* AdminFilters defines a set of filters that can be applied to a connection. These are currently used by Gemini Enterprise connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filterKey` | string | Required. Unique name for the filter, e.g., "SharePointSiteURL", "DocumentType", "ChatSpaceName". |
| `filterType` | string enum | Required. Type of the filter. Values: `FILTER_TYPE_UNSPECIFIED`, `INCLUSION`, `EXCLUSION`. |
| `intValue` | string (int64) | Optional. A single integer value. |
| `stringListValues` | StringListValues | Optional. List of string values. |
| `stringValue` | string | Optional. A single string value. |

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

### `AuthCodeData`

- AuthCodeData contains the data the runtime plane will give the connector backend in exchange for access and refresh tokens.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authCode` | string | OAuth authorization code. |
| `pkceVerifier` | string | OAuth PKCE verifier, needed if PKCE is enabled for this particular connection. |
| `redirectUri` | string | OAuth redirect URI passed in during the auth code flow, required by some OAuth backends. |
| `scopes` | array<string> | Scopes the connection will request when the user performs the auth code flow. |

### `AuthConfig`

- AuthConfig defines details of a authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<ConfigVariable> | Optional. List containing additional auth configs. |
| `authKey` | string | Optional. Identifier key for auth config |
| `authType` | string enum | Optional. The type of authentication configured. Values: `AUTH_TYPE_UNSPECIFIED`, `USER_PASSWORD`, `OAUTH2_JWT_BEARER`, `OAUTH2_CLIENT_CREDENTIALS`, `SSH_PUBLIC_KEY`, `OAUTH2_AUTH_CODE_FLOW`, `GOOGLE_AUTHENTICATION`, `OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED`. |
| `oauth2AuthCodeFlow` | Oauth2AuthCodeFlow | Oauth2AuthCodeFlow. |
| `oauth2AuthCodeFlowGoogleManaged` | Oauth2AuthCodeFlowGoogleManaged | Oauth2AuthCodeFlowGoogleManaged. |
| `oauth2ClientCredentials` | Oauth2ClientCredentials | Oauth2ClientCredentials. |
| `oauth2JwtBearer` | Oauth2JwtBearer | Oauth2JwtBearer. |
| `sshPublicKey` | SshPublicKey | SSH Public Key. |
| `userPassword` | UserPassword | UserPassword. |

### `AuthConfigTemplate`

- AuthConfigTemplate defines required field over an authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authKey` | string | Identifier key for auth config |
| `authType` | string enum | The type of authentication configured. Values: `AUTH_TYPE_UNSPECIFIED`, `USER_PASSWORD`, `OAUTH2_JWT_BEARER`, `OAUTH2_CLIENT_CREDENTIALS`, `SSH_PUBLIC_KEY`, `OAUTH2_AUTH_CODE_FLOW`, `GOOGLE_AUTHENTICATION`, `OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED`. |
| `configVariableTemplates` | array<ConfigVariableTemplate> | Config variables to describe an `AuthConfig` for a `Connection`. |
| `description` | string | Connector specific description for an authentication template. |
| `displayName` | string | Display name for authentication template. |
| `isDefault` | boolean | Whether the auth config is the default one. |

### `AuthField`

- AuthField defines a field in an authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataType` | string | Data type of the field. |
| `description` | string | Description of the field. |
| `key` | string | Key of the field. |

### `AuthObject`

- AuthObject defines a JSON schema of an authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalProperties` | boolean | Whether the object has additional properties. |
| `authKey` | string | Auth key of the object. |
| `authType` | string | Auth type of the object. |
| `description` | string | Description of the object. |
| `isDefault` | boolean | Whether the object is the default one. |
| `properties` | object | Properties of the object. |
| `type` | string | Type of the object. |

### `AuthProperty`

- AuthProperty defines a property of an authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the property. |
| `type` | string | Type of the property. |

### `AuthSchema`

- AuthSchema defines the schema of an authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authFields` | array<AuthField> | List of AuthFields. |
| `authKey` | string | Auth key of the schema. |
| `authType` | string enum | Auth type of the schema. Values: `AUTH_TYPE_UNSPECIFIED`, `USER_PASSWORD`, `OAUTH2_JWT_BEARER`, `OAUTH2_CLIENT_CREDENTIALS`, `SSH_PUBLIC_KEY`, `OAUTH2_AUTH_CODE_FLOW`, `GOOGLE_AUTHENTICATION`, `OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED`. |
| `description` | string | Description of the schema. |
| `displayName` | string | Display name of the schema. |
| `isDefault` | boolean | Whether the auth schema is the default one. |

### `AuthorizationCodeLink`

- This configuration captures the details required to render an authorization link for the OAuth Authorization Code Flow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Optional. The client ID assigned to the Google Cloud Connectors OAuth app for the connector data source. |
| `clientSecret` | Secret | Optional. The client secret assigned to the Google Cloud Connectors OAuth app for the connector data source. |
| `enablePkce` | boolean | Optional. Whether to enable PKCE for the auth code flow. |
| `omitQueryParams` | boolean | Optional. Omit query params from the redirect URI. |
| `scopes` | array<string> | Optional. The scopes for which the user will authorize Google Cloud Connectors on the connector data source. |
| `uri` | string | Optional. The base URI the user must click to trigger the authorization code login flow. |

### `BillingConfig`

- Billing config for the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingCategory` | string enum | Output only. Billing category for the connector. Values: `BILLING_CATEGORY_UNSPECIFIED`, `GCP_AND_TECHNICAL_CONNECTOR`, `NON_GCP_CONNECTOR`. |

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

### `CheckReadinessResponse`

- Response containing status of the connector for readiness prober.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `status` | string | — |

### `CheckStatusResponse`

- The status of the connector.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | When the connector is not in ACTIVE state, the description must be populated to specify the reason why it's not in ACTIVE state. |
| `metadata` | object | Metadata like service latency, etc. |
| `state` | string enum | State of the connector. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `ERROR`, `AUTH_ERROR`. |

### `ConfigVariable`

- ConfigVariable represents a configuration variable present in a Connection. or AuthConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Optional. Value is a bool. |
| `encryptionKeyValue` | EncryptionKey | Optional. Value is a Encryption Key. |
| `intValue` | string (int64) | Optional. Value is an integer |
| `key` | string | Optional. Key of the config variable. |
| `secretValue` | Secret | Optional. Value is a secret. |
| `stringValue` | string | Optional. Value is a string. |

### `ConfigVariableTemplate`

- ConfigVariableTemplate provides metadata about a `ConfigVariable` that is used in a Connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationCodeLink` | AuthorizationCodeLink | Optional. Authorization code link options. To be populated if `ValueType` is `AUTHORIZATION_CODE` |
| `description` | string | Optional. Description. |
| `displayName` | string | Optional. Display name of the parameter. |
| `enumOptions` | array<EnumOption> | Optional. Enum options. To be populated if `ValueType` is `ENUM` |
| `enumSource` | string enum | Optional. enum source denotes the source of api to fill the enum options Values: `ENUM_SOURCE_UNSPECIFIED`, `EVENT_TYPES_API`. |
| `isAdvanced` | boolean | Optional. Indicates if current template is part of advanced settings |
| `key` | string | Optional. Key of the config variable. |
| `locationType` | string enum | Optional. Location Type denotes where this value should be sent in BYOC connections. Values: `LOCATION_TYPE_UNSPECIFIED`, `HEADER`, `PAYLOAD`, `QUERY_PARAM`, `PATH_PARAM`. |
| `multipleSelectConfig` | MultipleSelectConfig | Optional. MultipleSelectConfig represents the multiple options for a config variable. |
| `required` | boolean | Optional. Flag represents that this `ConfigVariable` must be provided for a connection. |
| `requiredCondition` | LogicalExpression | Optional. Condition under which a field would be required. The condition can be represented in the form of a logical expression. |
| `roleGrant` | RoleGrant | Optional. Role grant configuration for the config variable. |
| `state` | string enum | Output only. State of the config variable. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `DEPRECATED`. |
| `validationRegex` | string | Optional. Regular expression in RE2 syntax used for validating the `value` of a `ConfigVariable`. |
| `valueType` | string enum | Optional. Type of the parameter: string, int, bool etc. consider custom type for the benefit for the validation. Values: `VALUE_TYPE_UNSPECIFIED`, `STRING`, `INT`, `BOOL`, `SECRET`, `ENUM`, `AUTHORIZATION_CODE`, `ENCRYPTION_KEY`, `MULTIPLE_SELECT`. |

### `Connection`

- Connection represents an instance of connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminFilters` | array<AdminFilters> | Optional. Admin filters for the connection. These are used by Gemini Enterprise. |
| `asyncOperationsEnabled` | boolean | Optional. Async operations enabled for the connection. If Async Operations is enabled, Connection allows the customers to initiate async long running operations using the actions API. |
| `authConfig` | AuthConfig | Optional. Configuration for establishing the connection's authentication with an external system. |
| `authOverrideEnabled` | boolean | Optional. Auth override enabled for the connection. If Auth Override is enabled, Connection allows the backend service auth to be overridden in the entities/actions API. |
| `billingConfig` | BillingConfig | Output only. Billing config for the connection. |
| `configVariables` | array<ConfigVariable> | Optional. Configuration for configuring the connection with an external system. |
| `connectionRevision` | string (int64) | Output only. Connection revision. This field is only updated when the connection is created or updated by User. |
| `connectorVersion` | string | Required. Connector version on which the connection is created. The format is: projects/\*/locations/\*/providers/\*/connectors/\*/versions/\* Only global location is supported for ConnectorVersion resource. |
| `connectorVersionInfraConfig` | ConnectorVersionInfraConfig | Output only. Infra configs supported by Connector Version. |
| `connectorVersionLaunchStage` | string enum | Output only. Flag to mark the version indicating the launch stage. Values: `LAUNCH_STAGE_UNSPECIFIED`, `PREVIEW`, `GA`, `DEPRECATED`, `TEST`, `PRIVATE_PREVIEW`. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `description` | string | Optional. Description of the resource. |
| `destinationConfigs` | array<DestinationConfig> | Optional. Configuration of the Connector's destination. Only accepted for Connectors that accepts user defined destination(s). |
| `envoyImageLocation` | string | Output only. GCR location where the envoy image is stored. formatted like: gcr.io/{bucketName}/{imageName} |
| `euaOauthAuthConfig` | AuthConfig | Optional. Additional Oauth2.0 Auth config for EUA. If the connection is configured using non-OAuth authentication but OAuth needs to be used for EUA, this field can be populated with the OAuth config. This should be a OAuth2AuthCodeFlow Auth type only. |
| `eventingConfig` | EventingConfig | Optional. Eventing config of a connection |
| `eventingEnablementType` | string enum | Optional. Eventing enablement type. Will be nil if eventing is not enabled. Values: `EVENTING_ENABLEMENT_TYPE_UNSPECIFIED`, `EVENTING_AND_CONNECTION`, `ONLY_EVENTING`. |
| `eventingRuntimeData` | EventingRuntimeData | Output only. Eventing Runtime Data. |
| `fallbackOnAdminCredentials` | boolean | Optional. Fallback on admin credentials for the connection. If this both auth_override_enabled and fallback_on_admin_credentials are set to true, the connection will use the admin credentials if the dynamic auth header is not present during auth override. |
| `host` | string | Output only. The name of the Hostname of the Service Directory service with TLS. |
| `imageLocation` | string | Output only. GCR location where the runtime image is stored. formatted like: gcr.io/{bucketName}/{imageName} |
| `isTrustedTester` | boolean | Output only. Is trusted tester program enabled for the project. |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `lockConfig` | LockConfig | Optional. Configuration that indicates whether or not the Connection can be edited. |
| `logConfig` | ConnectorsLogConfig | Optional. Log configuration for the connection. |
| `name` | string | Output only. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |
| `nodeConfig` | NodeConfig | Optional. Node configuration for the connection. |
| `serviceAccount` | string | Optional. Service account needed for runtime plane to access Google Cloud resources. |
| `serviceDirectory` | string | Output only. The name of the Service Directory service name. Used for Private Harpoon to resolve the ILB address. e.g. "projects/cloud-connectors-e2e-testing/locations/us-central1/namespaces/istio-system/services/istio-ingressgateway-connectors" |
| `sslConfig` | SslConfig | Optional. Ssl config of a connection |
| `status` | ConnectionStatus | Output only. Current status of the connection. |
| `subscriptionType` | string enum | Output only. This subscription type enum states the subscription type of the project. Values: `SUBSCRIPTION_TYPE_UNSPECIFIED`, `PAY_G`, `PAID`. |
| `suspended` | boolean | Optional. Suspended indicates if a user has suspended a connection or not. |
| `tlsServiceDirectory` | string | Output only. The name of the Service Directory service with TLS. |
| `trafficShapingConfigs` | array<TrafficShapingConfig> | Optional. Traffic shaping configuration for the connection. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `ConnectionSchemaMetadata`

- ConnectionSchemaMetadata is the singleton resource of each connection. It includes the entity and action names of runtime resources exposed by a connection backend.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | Output only. List of actions. |
| `entities` | array<string> | Output only. List of entity names. |
| `errorMessage` | string | Error message for users. |
| `name` | string | Output only. Resource name. Format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata |
| `refreshTime` | string (google-datetime) | Output only. Timestamp when the connection runtime schema refresh was triggered. |
| `state` | string enum | Output only. The current state of runtime schema. Values: `STATE_UNSPECIFIED`, `REFRESHING`, `UPDATED`, `REFRESHING_SCHEMA_METADATA`, `UPDATED_SCHEMA_METADATA`, `REFRESH_SCHEMA_METADATA_FAILED`, `REFRESHING_FULL_SCHEMA`, `UPDATED_FULL_SCHEMA`. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the connection runtime schema was updated. |

### `ConnectionStatus`

- ConnectionStatus indicates the state of the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description. |
| `state` | string enum | State. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `INACTIVE`, `DELETING`, `UPDATING`, `ERROR`, `AUTHORIZATION_REQUIRED`. |
| `status` | string | Status provides detailed information for the state. |

### `Connector`

- Connectors indicates a specific connector type, e.x. Salesforce, SAP etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string | Output only. Category of the connector. |
| `connectorType` | string enum | Output only. The type of the connector. Values: `CONNECTOR_TYPE_UNSPECIFIED`, `CONNECTOR_TYPE_GOOGLE`, `CONNECTOR_TYPE_TECHNICAL`, `CONNECTOR_TYPE_THIRD_PARTY`. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `description` | string | Output only. Description of the resource. |
| `displayName` | string | Output only. Display name. |
| `documentationUri` | string | Output only. Link to documentation page. |
| `eventingDetails` | EventingDetails | Output only. Eventing details. Will be null if eventing is not supported. |
| `externalUri` | string | Output only. Link to external page. |
| `labels` | object | Output only. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `launchStage` | string enum | Output only. Flag to mark the version indicating the launch stage. Values: `LAUNCH_STAGE_UNSPECIFIED`, `PREVIEW`, `GA`, `DEPRECATED`, `TEST`, `PRIVATE_PREVIEW`. |
| `marketplaceConnectorDetails` | MarketplaceConnectorDetails | Output only. Marketplace connector details. Will be null if the connector is not marketplace connector. |
| `name` | string | Output only. Resource name of the Connector. Format: projects/{project}/locations/{location}/providers/{provider}/connectors/{connector} Only global location is supported for Connector resource. |
| `tags` | array<string> | Output only. Tags of the connector. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |
| `webAssetsLocation` | string | Output only. Cloud storage location of icons etc consumed by UI. |

### `ConnectorInfraConfig`

- This cofiguration provides infra configs like rate limit threshold which need to be configurable for every connector version
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alwaysAllocateCpu` | boolean | Indicates that the Cloud Run CPU should always be allocated. |
| `connectionRatelimitWindowSeconds` | string (int64) | The window used for ratelimiting runtime requests to connections. |
| `connectionServiceAccountEnabled` | boolean | Indicate whether connection service account is enabled. If false, the common runtime service agent is used. |
| `connectorVersioningEnabled` | boolean | Indicate whether connector versioning is enabled. |
| `deploymentModel` | string enum | Indicate whether connector is deployed on GKE/CloudRun Values: `DEPLOYMENT_MODEL_UNSPECIFIED`, `GKE_MST`, `CLOUD_RUN_MST`. |
| `hpaConfig` | HPAConfig | HPA autoscaling config. |
| `internalclientRatelimitThreshold` | string (int64) | Max QPS supported for internal requests originating from Connd. |
| `maxInstanceRequestConcurrency` | integer (int32) | Max Instance Request Conncurrency for Cloud Run service. |
| `migrateDeploymentModel` | boolean | Indicate whether connector is being migrated to cloud run deployment model. |
| `migrateTls` | boolean | Indicate whether connector is being migrated to TLS. |
| `networkEgressModeOverride` | NetworkEgressModeOverride | Network egress mode override to migrate to direct VPC egress. |
| `provisionCloudSpanner` | boolean | Indicate whether cloud spanner is required for connector job. |
| `provisionMemstore` | boolean | Indicate whether memstore is required for connector job. |
| `publicNetworkIngressEnabled` | boolean | Indicate whether public network ingress should be enabled. |
| `ratelimitThreshold` | string (int64) | Max QPS supported by the connector version before throttling of requests. |
| `resourceLimits` | ResourceLimits | System resource limits. |
| `resourceRequests` | ResourceRequests | System resource requests. |
| `sharedDeployment` | string | The name of shared connector deployment. |

### `ConnectorVersion`

- ConnectorVersion indicates a specific version of a connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authConfigTemplates` | array<AuthConfigTemplate> | Output only. List of auth configs supported by the Connector Version. |
| `authOverrideEnabled` | boolean | Output only. Flag to mark the dynamic auth override. |
| `configVariableTemplates` | array<ConfigVariableTemplate> | Output only. List of config variables needed to create a connection. |
| `connectorInfraConfig` | ConnectorInfraConfig | Output only. Infra configs supported by Connector. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `destinationConfigTemplates` | array<DestinationConfigTemplate> | Output only. List of destination configs needed to create a connection. |
| `displayName` | string | Output only. Display name. |
| `egressControlConfig` | EgressControlConfig | Output only. Configuration for Egress Control. |
| `eventingConfigTemplate` | EventingConfigTemplate | Output only. Eventing configuration supported by the Connector. |
| `isCustomActionsSupported` | boolean | Output only. Is custom actions supported. |
| `isCustomEntitiesSupported` | boolean | Output only. Is custom entities supported. |
| `labels` | object | Output only. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `launchStage` | string enum | Output only. Flag to mark the version indicating the launch stage. Values: `LAUNCH_STAGE_UNSPECIFIED`, `PREVIEW`, `GA`, `DEPRECATED`, `TEST`, `PRIVATE_PREVIEW`. |
| `name` | string | Output only. Resource name of the Version. Format: projects/{project}/locations/{location}/providers/{provider}/connectors/{connector}/versions/{version} Only global location is supported for Connector resource. |
| `releaseVersion` | string | Output only. ReleaseVersion of the connector, for example: "1.0.1-alpha". |
| `roleGrant` | RoleGrant | Output only. Role grant configuration for this config variable. It will be DEPRECATED soon. |
| `roleGrants` | array<RoleGrant> | Output only. Role grant configurations for this connector version. |
| `schemaRefreshConfig` | SchemaRefreshConfig | Connection Schema Refresh Config |
| `sslConfigTemplate` | SslConfigTemplate | Output only. Ssl configuration supported by the Connector. |
| `supportedRuntimeFeatures` | SupportedRuntimeFeatures | Output only. Information about the runtime features supported by the Connector. |
| `supportedStandardActions` | array<StandardAction> | Output only. Supported standard actions. |
| `supportedStandardEntities` | array<StandardEntity> | Output only. Supported standard entities. |
| `unsupportedConnectionTypes` | array<string> | Output only. Unsupported connection types. Values: `CONNECTION_TYPE_UNSPECIFIED`, `CONNECTION_WITH_EVENTING`, `ONLY_CONNECTION`, `ONLY_EVENTING`. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |
| `vpcscConfig` | VpcscConfig | Output only. VPCSC config for the connector. |

### `ConnectorVersionInfraConfig`

- This configuration provides infra configs like rate limit threshold which need to be configurable for every connector version
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionRatelimitWindowSeconds` | string (int64) | Output only. The window used for ratelimiting runtime requests to connections. |
| `deploymentModel` | string enum | Output only. Indicates whether connector is deployed on GKE/CloudRun Values: `DEPLOYMENT_MODEL_UNSPECIFIED`, `GKE_MST`, `CLOUD_RUN_MST`. |
| `deploymentModelMigrationState` | string enum | Output only. Status of the deployment model migration. Values: `DEPLOYMENT_MODEL_MIGRATION_STATE_UNSPECIFIED`, `IN_PROGRESS`, `COMPLETED`, `ROLLEDBACK`, `ROLLBACK_IN_PROGRESS`. |
| `hpaConfig` | HPAConfig | Output only. HPA autoscaling config. |
| `internalclientRatelimitThreshold` | string (int64) | Output only. Max QPS supported for internal requests originating from Connd. |
| `maxInstanceRequestConcurrency` | integer (int32) | Output only. Max instance request concurrency. |
| `ratelimitThreshold` | string (int64) | Output only. Max QPS supported by the connector version before throttling of requests. |
| `resourceLimits` | ResourceLimits | Output only. System resource limits. |
| `resourceRequests` | ResourceRequests | Output only. System resource requests. |
| `sharedDeployment` | string | Output only. The name of shared connector deployment. |
| `tlsMigrationState` | string enum | Output only. Status of the TLS migration. Values: `TLS_MIGRATION_STATE_UNSPECIFIED`, `TLS_MIGRATION_NOT_STARTED`, `TLS_MIGRATION_COMPLETED`. |

### `ConnectorsLogConfig`

- Log configuration for the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Enabled represents whether logging is enabled or not for a connection. |
| `level` | string enum | Optional. Log configuration level. Values: `LOG_LEVEL_UNSPECIFIED`, `ERROR`, `INFO`, `DEBUG`. |

### `CustomConnector`

- CustomConnector represents the custom connector defined by the customer as part of byoc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeConnectorVersions` | array<string> | Output only. Active connector versions. |
| `allConnectorVersions` | array<string> | Output only. All connector versions. |
| `allMarketplaceVersions` | array<string> | Output only. All marketplace versions. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `customConnectorType` | string enum | Required. Type of the custom connector. Values: `CUSTOM_CONNECTOR_TYPE_UNSPECIFIED`, `OPEN_API`, `PROTO`, `SDK`. |
| `description` | string | Optional. Description of the resource. |
| `displayName` | string | Optional. Display name. |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `logo` | string | Optional. Logo of the resource. |
| `name` | string | Identifier. Resource name of the CustomConnector. Format: projects/{project}/locations/{location}/customConnectors/{connector} |
| `publishedMarketplaceVersions` | array<string> | Output only. Published marketplace versions. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `CustomConnectorVersion`

- CustomConnectorVersion indicates a specific version of a connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asyncOperationsSupport` | boolean | Optional. Indicates if Async Operations/Connector Job is supported. This is only available for SDK based custom connectors. |
| `authConfig` | AuthConfig | Optional. Authentication config for accessing connector service (facade). This is used only when enable_backend_destination_config is true. |
| `authConfigTemplates` | array<AuthConfigTemplate> | Optional. Auth Config Templates is only used when connector backend is enabled. This is used to specify the auth configs supported by the connector backend service to talk to the actual application backend. |
| `authOverrideSupport` | boolean | Optional. Auth override support. |
| `backendVariableTemplates` | array<ConfigVariableTemplate> | Optional. Backend variable templates is only used when connector backend is enabled. This is used to specify the variables required by the connector backend service to talk to the actual application backend. This translates to additional variable templates in the connection config. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `destinationConfigs` | array<DestinationConfig> | Optional. Destination config(s) for accessing connector service (facade). This is used only when enable_backend_destination_config is true. |
| `enableBackendDestinationConfig` | boolean | Optional. Indicates if an intermediatory connectorservice is used as backend. When this is enabled, the connector destination and connector auth config are required. For SDK based connectors, this is always enabled. |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `name` | string | Output only. Identifier. Resource name of the Version. Format: projects/{project}/locations/{location}/customConnectors/{custom_connector}/customConnectorVersions/{custom_connector_version} |
| `partnerMetadata` | PartnerMetadata | Optional. Partner metadata details. This should be populated only when publishing the custom connector to partner connector. |
| `publishStatus` | PublishStatus | Output only. Publish status of a custom connector. |
| `serviceAccount` | string | Optional. Service account used by runtime plane to access auth config secrets. |
| `specLocation` | string | Optional. Location of the custom connector spec. This is only used for Open API based custom connectors. The location can be either a public url like `https://public-url.com/spec` Or a Google Cloud Storage location like `gs:///`. |
| `specServerUrls` | array<string> | Output only. Server URLs parsed from the Open API spec. This is only used for Open API based custom connectors. |
| `state` | string enum | Output only. State of the custom connector version. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `DEPRECATED`. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `DailyCycle`

- Time window specified for daily operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Output only. Duration of the time window, set by service producer. |
| `startTime` | TimeOfDay | Time within the day to start the operations. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v2

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DeadLetterConfig`

- Dead Letter configuration details provided by the user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Optional. Project which has the topic given. |
| `topic` | string | Optional. Topic to push events which couldn't be processed. |

### `DenyMaintenancePeriod`

- DenyMaintenancePeriod definition. Maintenance is forbidden within the deny period. The start_date must be less than the end_date.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endDate` | Date | Deny period end date. This can be: \* A full date, with non-zero year, month and day values. \* A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be before the end. |
| `startDate` | Date | Deny period start date. This can be: \* A full date, with non-zero year, month and day values. \* A month and day value, with a zero year. Allows recurring deny periods each year. Date matching this period will have to be the same or after the start. |
| `time` | TimeOfDay | Time in UTC when the Blackout period starts on start_date and ends on end_date. This can be: \* Full time. \* All zeros for 00:00:00 UTC |

### `DeprecateCustomConnectorVersionRequest`

- Request message for ConnectorsService.DeprecateCustomConnectorVersion
- Version: v1

### `Destination`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | For publicly routable host. |
| `port` | integer (int32) | Optional. The port is the target port number that is accepted by the destination. |
| `serviceAttachment` | string | PSC service attachments. Format: projects/\*/regions/\*/serviceAttachments/\* |

### `DestinationConfig`

- Define the Connectors target endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<Destination> | Optional. The destinations for the key. |
| `key` | string | Optional. The key is the destination identifier that is supported by the Connector. |

### `DestinationConfigTemplate`

- DestinationConfigTemplate defines required destinations supported by the Connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autocompleteSuggestions` | array<string> | Autocomplete suggestions for destination URL field. |
| `defaultPort` | integer (int32) | The default port. |
| `description` | string | Description. |
| `displayName` | string | Display name of the parameter. |
| `isAdvanced` | boolean | Whether the current destination tempalate is part of Advanced settings |
| `key` | string | Key of the destination. |
| `max` | integer (int32) | The maximum number of destinations supported for this key. |
| `min` | integer (int32) | The minimum number of destinations supported for this key. |
| `portFieldType` | string enum | Whether port number should be provided by customers. Values: `FIELD_TYPE_UNSPECIFIED`, `REQUIRED`, `OPTIONAL`, `NOT_USED`. |
| `regexPattern` | string | Regex pattern for host. |

### `EUASecret`

- EUASecret provides a reference to entries in Secret Manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `secretValue` | string | Optional. The plain string value of the secret. |
| `secretVersion` | string | Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`. |

### `EgressControlConfig`

- Egress control config for connector runtime. These configurations define the rules to identify which outbound domains/hosts needs to be whitelisted. It may be a static information for a particular connector version or it is derived from the configurations provided by the customer in Connection resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessMode` | string enum | Optional. Access mode for egress control. Values: `ACCESS_MODE_UNSPECIFIED`, `RESTRICTED`, `ALLOW_ALL`. |
| `additionalExtractionRules` | ExtractionRules | Additional extraction rules to identity the backends from customer provided configuration in Connection resource. These rules are applied in addition to the ones specified in `oneof_backends`. |
| `allowlistedProjectNumbers` | array<string> | Optional. Used when access_mode is RESTRICTED or ACCESS_MODE_UNSPECIFIED. |
| `backends` | string | Static Comma separated backends which are common for all Connection resources. Supported formats for each backend are host:port or just host (host can be ip address or domain name). |
| `extractionRules` | ExtractionRules | Extractions Rules to extract the backends from customer provided configuration. |
| `launchEnvironment` | string enum | Launch environment for egress control. Values: `LAUNCH_ENVIRONMENT_UNSPECIFIED`, `AUTOPUSH`, `STAGING`, `PROD`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `EncryptionConfig`

- Regional encryption config for CMEK details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionType` | string enum | Optional. Encryption type for the region. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `GMEK`, `CMEK`. |
| `kmsKeyName` | string | Optional. KMS crypto key. This field accepts identifiers of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/ {crypto_key}` |

### `EncryptionKey`

- Encryption Key value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The \[KMS key name\] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed. |
| `type` | string enum | Optional. Specifies the type of the encryption key. Values: `TYPE_UNSPECIFIED`, `GOOGLE_MANAGED`, `CUSTOMER_MANAGED`. |

### `EndPoint`

- Endpoint message includes details of the Destination endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpointUri` | string | Optional. The URI of the Endpoint. |
| `headers` | array<Header> | Optional. List of Header to be added to the Endpoint. |

### `EndUserAuthentication`

- AuthConfig defines details of a authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configVariables` | array<EndUserAuthenticationConfigVariable> | Optional. Config variables for the EndUserAuthentication. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `destinationConfigs` | array<DestinationConfig> | Optional. Destination configs for the EndUserAuthentication. |
| `endUserAuthenticationConfig` | EndUserAuthenticationConfig | Optional. The EndUserAuthenticationConfig for the EndUserAuthentication. |
| `labels` | array<string> | Optional. Labels for the EndUserAuthentication. |
| `name` | string | Required. Identifier. Resource name of the EndUserAuthentication. Format: projects/{project}/locations/{location}/connections/{connection}/endUserAuthentications/{end_user_authentication} |
| `notifyEndpointDestination` | EndUserAuthenticationNotifyEndpointDestination | Optional. The destination to hit when we receive an event |
| `roles` | array<string> | Optional. Roles for the EndUserAuthentication. Values: `ROLE_UNSPECIFIED`, `READER`, `READER_DOMAIN_WIDE_ACCESSIBLE`. |
| `status` | EndUserAuthenticationEndUserAuthenticationStatus | Optional. Status of the EndUserAuthentication. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |
| `userId` | string | Optional. The user id of the user. |

### `EndUserAuthenticationConfig`

- EndUserAuthenticationConfig defines details of a authentication configuration for EUC
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<EndUserAuthenticationConfigVariable> | Optional. List containing additional auth configs. |
| `authKey` | string | Identifier key for auth config |
| `authType` | string enum | The type of authentication configured. Values: `AUTH_TYPE_UNSPECIFIED`, `USER_PASSWORD`, `OAUTH2_JWT_BEARER`, `OAUTH2_CLIENT_CREDENTIALS`, `SSH_PUBLIC_KEY`, `OAUTH2_AUTH_CODE_FLOW`, `GOOGLE_AUTHENTICATION`, `OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED`. |
| `oauth2AuthCodeFlow` | EndUserAuthenticationConfigOauth2AuthCodeFlow | Oauth2AuthCodeFlow. |
| `oauth2AuthCodeFlowGoogleManaged` | EndUserAuthenticationConfigOauth2AuthCodeFlowGoogleManaged | Oauth2AuthCodeFlowGoogleManaged. |
| `oauth2ClientCredentials` | EndUserAuthenticationConfigOauth2ClientCredentials | Oauth2ClientCredentials. |
| `oauth2JwtBearer` | EndUserAuthenticationConfigOauth2JwtBearer | Oauth2JwtBearer. |
| `sshPublicKey` | EndUserAuthenticationConfigSshPublicKey | SSH Public Key. |
| `userPassword` | EndUserAuthenticationConfigUserPassword | UserPassword. |

### `EndUserAuthenticationConfigOauth2AuthCodeFlow`

- Parameters to support Oauth 2.0 Auth Code Grant Authentication. See https://www.rfc-editor.org/rfc/rfc6749#section-1.3.1 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authCode` | string | Optional. Authorization code to be exchanged for access and refresh tokens. |
| `authUri` | string | Optional. Auth URL for Authorization Code Flow |
| `clientId` | string | Optional. Client ID for user-provided OAuth app. |
| `clientSecret` | EUASecret | Optional. Client secret for user-provided OAuth app. |
| `enablePkce` | boolean | Optional. Whether to enable PKCE when the user performs the auth code flow. |
| `oauthTokenData` | OAuthTokenData | Optional. Auth Code Data |
| `pkceVerifier` | string | Optional. PKCE verifier to be used during the auth code exchange. |
| `redirectUri` | string | Optional. Redirect URI to be provided during the auth code exchange. |
| `scopes` | array<string> | Optional. Scopes the connection will request when the user performs the auth code flow. |

### `EndUserAuthenticationConfigOauth2AuthCodeFlowGoogleManaged`

- Parameters to support Oauth 2.0 Auth Code Grant Authentication using Google Provided OAuth Client. See https://tools.ietf.org/html/rfc6749#section-1.3.1 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authCode` | string | Optional. Authorization code to be exchanged for access and refresh tokens. |
| `oauthTokenData` | OAuthTokenData | Auth Code Data |
| `redirectUri` | string | Optional. Redirect URI to be provided during the auth code exchange. |
| `scopes` | array<string> | Required. Scopes the connection will request when the user performs the auth code flow. |

### `EndUserAuthenticationConfigOauth2ClientCredentials`

- Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | The client identifier. |
| `clientSecret` | EUASecret | Required. string value or secret version containing the client secret. |

### `EndUserAuthenticationConfigOauth2JwtBearer`

- Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0 Authorization Grant based authentication. See https://tools.ietf.org/html/rfc7523 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientKey` | EUASecret | Required. secret version/value reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/strings/*/versions/*`. |
| `jwtClaims` | EndUserAuthenticationConfigOauth2JwtBearerJwtClaims | JwtClaims providers fields to generate the token. |

### `EndUserAuthenticationConfigOauth2JwtBearerJwtClaims`

- JWT claims used for the jwt-bearer authorization grant.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `audience` | string | Value for the "aud" claim. |
| `issuer` | string | Value for the "iss" claim. |
| `subject` | string | Value for the "sub" claim. |

### `EndUserAuthenticationConfigSshPublicKey`

- Parameters to support Ssh public key Authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certType` | string | Format of SSH Client cert. |
| `sshClientCert` | EUASecret | Required. SSH Client Cert. It should contain both public and private key. |
| `sshClientCertPass` | EUASecret | Required. Password (passphrase) for ssh client certificate if it has one. |
| `username` | string | The user account used to authenticate. |

### `EndUserAuthenticationConfigUserPassword`

- Parameters to support Username and Password Authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `password` | EUASecret | Required. string value or secret version reference containing the password. |
| `username` | string | Username. |

### `EndUserAuthenticationConfigVariable`

- EndUserAuthenticationConfigVariable represents a configuration variable present in a EndUserAuthentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Value is a bool. |
| `intValue` | string (int64) | Value is an integer |
| `key` | string | Required. Key of the config variable. |
| `secretValue` | EUASecret | Value is a secret |
| `stringValue` | string | Value is a string. |

### `EndUserAuthenticationEndUserAuthenticationStatus`

- EndUserAuthentication Status denotes the status of the EndUserAuthentication resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. Description of the state. |
| `state` | string enum | Output only. State of Event Subscription resource. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `ERROR`. |

### `EndUserAuthenticationNotifyEndpointDestination`

- Message for NotifyEndpointDestination Destination to hit when the refresh token is expired.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpoint` | EndUserAuthenticationNotifyEndpointDestinationEndPoint | Optional. OPTION 1: Hit an endpoint when the refresh token is expired. |
| `serviceAccount` | string | Required. Service account needed for runtime plane to notify the backend. |
| `type` | string enum | Required. type of the destination Values: `TYPE_UNSPECIFIED`, `ENDPOINT`. |

### `EndUserAuthenticationNotifyEndpointDestinationEndPoint`

- Endpoint message includes details of the Destination endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpointUri` | string | Required. The URI of the Endpoint. |
| `headers` | array<EndUserAuthenticationNotifyEndpointDestinationEndPointHeader> | Optional. List of Header to be added to the Endpoint. |

### `EndUserAuthenticationNotifyEndpointDestinationEndPointHeader`

- Header details for a given header to be added to Endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. Key of Header. |
| `value` | string | Required. Value of Header. |

### `EndpointAttachment`

- represents the Connector's Endpoint Attachment resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Created time. |
| `description` | string | Optional. Description of the resource. |
| `endpointGlobalAccess` | boolean | Optional. The Private Service Connect Connection Endpoint Global Access. https://cloud.google.com/vpc/docs/about-accessing-vpc-hosted-services-endpoints#global-access |
| `endpointIp` | string | Output only. The Private Service Connect connection endpoint ip |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `name` | string | Output only. Resource name of the Endpoint Attachment. Format: projects/{project}/locations/{location}/endpointAttachments/{endpoint_attachment} |
| `serviceAttachment` | string | Required. The path of the service attachment |
| `state` | string enum | Output only. The Private Service Connect Connection Endpoint State. This value is only available in the Full view. Values: `STATE_UNSPECIFIED`, `PENDING`, `ACCEPTED`, `REJECTED`, `CLOSED`, `FROZEN`, `NEEDS_ATTENTION`, `ACCEPTED_NOT_PROGRAMMED`. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `EnrichmentConfig`

- Data enrichment configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appendAcl` | boolean | Optional. Append ACL to the event. |

### `Entity`

- 'Entity row'/ 'Entity' refers to a single row of an entity type.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fields` | object | Fields of the entity. The key is name of the field and the value contains the applicable `google.protobuf.Value` entry for this field. |
| `metadata` | object | Metadata like service latency, etc. |
| `name` | string | Output only. Resource name of the Entity. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id} |

### `EntityType`

- EntityType message contains metadata information about a single entity type present in the external system.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `defaultSortBy` | string | — |
| `fields` | array<Field> | List containing metadata information about each field of the entity type. |
| `jsonSchema` | JsonSchema | JsonSchema representation of this entity's schema |
| `metadata` | object | Metadata like service latency, etc. |
| `name` | string | The name of the entity type. |
| `operations` | array<string> | — Values: `OPERATION_UNSPECIFIED`, `LIST`, `GET`, `CREATE`, `UPDATE`, `DELETE`. |

### `EnumOption`

- EnumOption definition
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. Display name of the option. |
| `id` | string | Optional. Id of the option. |

### `EventSubscription`

- represents the Connector's EventSubscription resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Created time. |
| `destinations` | EventSubscriptionDestination | Optional. The destination to hit when we receive an event |
| `eventTypeId` | string | Optional. Event type id of the event of current EventSubscription. |
| `filter` | string | Optional. Filter for the event subscription. Incoming events are filtered based on the filter expression. |
| `jms` | JMS | Optional. JMS is the source for the event listener. |
| `name` | string | Required. Identifier. Resource name of the EventSubscription. Format: projects/{project}/locations/{location}/connections/{connection}/eventSubscriptions/{event_subscription} |
| `status` | EventSubscriptionStatus | Optional. Status indicates the status of the event subscription resource |
| `subscriber` | string | Optional. name of the Subscriber for the current EventSubscription. |
| `subscriberLink` | string | Optional. Link for Subscriber of the current EventSubscription. |
| `triggerConfigVariables` | array<ConfigVariable> | Optional. Configuration for configuring the trigger |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `EventSubscriptionDestination`

- Message for EventSubscription Destination to act on receiving an event
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpoint` | EndPoint | OPTION 1: Hit an endpoint when we receive an event. |
| `pubsub` | PubSub | OPTION 3: Write the event to Pub/Sub topic. |
| `serviceAccount` | string | Optional. Service account needed for runtime plane to trigger IP workflow. |
| `type` | string enum | Optional. type of the destination Values: `TYPE_UNSPECIFIED`, `ENDPOINT`, `GCS`, `PUBSUB`. |

### `EventSubscriptionStatus`

- EventSubscription Status denotes the status of the EventSubscription resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. Description of the state. |
| `state` | string enum | Output only. State of Event Subscription resource. Values: `STATE_UNSPECIFIED`, `CREATING`, `UPDATING`, `ACTIVE`, `SUSPENDED`, `ERROR`. |

### `EventType`

- EventType includes fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Created time. |
| `enrichedEventPayloadSchema` | string | Output only. Schema of the event payload after enriched. Will be null if read before send is not supported. |
| `entityType` | string | Output only. Runtime entity type name. Will be null if entity type map is not available. Used for read before send feature. |
| `eventPayloadSchema` | string | Output only. Schema of webhook event payload. |
| `eventTypeId` | string | Output only. Event type id. Example: `ticket.created`. |
| `idPath` | string | Output only. Id path denotes the path of id in webhook payload. |
| `name` | string | Output only. Resource name of the eventtype. Format: projects/{project}/locations/{location}/providers/{provider}/connectors/{connector}/versions/{version}/eventtypes/{eventtype} Only global location is supported for Connector resource. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `EventingConfig`

- Eventing Configuration of a connection next: 21
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<ConfigVariable> | Optional. Additional eventing related field values |
| `allowedEventTypes` | array<string> | Optional. List of allowed event types for the connection. |
| `authConfig` | AuthConfig | Optional. Auth details for the webhook adapter. |
| `deadLetterConfig` | DeadLetterConfig | Optional. Dead letter configuration for eventing of a connection. |
| `enrichmentConfig` | EnrichmentConfig | Optional. Data enrichment configuration. |
| `enrichmentEnabled` | boolean | Optional. Enrichment Enabled. |
| `eventsListenerIngressEndpoint` | string | Output only. Ingress endpoint of the event listener. This is used only when private connectivity is enabled. |
| `globalEventFilter` | string | Optional. Filter to be applied on the events to be received by the connection. |
| `listenerAuthConfig` | AuthConfig | Optional. Auth details for the event listener. |
| `privateConnectivityAllowlistedProjects` | array<string> | Optional. List of projects to be allowlisted for the service attachment created in the tenant project for eventing ingress. |
| `privateConnectivityEnabled` | boolean | Optional. Private Connectivity Enabled. |
| `proxyDestinationConfig` | DestinationConfig | Optional. Proxy for Eventing auto-registration. |
| `registrationDestinationConfig` | DestinationConfig | Optional. Registration endpoint for auto registration. |
| `sslConfig` | SslConfig | Optional. Ssl config of a connection |

### `EventingConfigTemplate`

- Eventing Config details of a connector version. next: 14
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<ConfigVariableTemplate> | Additional fields that need to be rendered. |
| `authConfigTemplates` | array<AuthConfigTemplate> | AuthConfigTemplates represents the auth values for the webhook adapter. |
| `autoRefresh` | boolean | Auto refresh to extend webhook life. |
| `autoRegistrationSupported` | boolean | Auto Registration supported. |
| `encryptionKeyTemplate` | ConfigVariableTemplate | Encryption key (can be either Google managed or CMEK). |
| `enrichmentSupported` | boolean | Enrichment Supported. |
| `eventListenerType` | string enum | The type of the event listener for a specific connector. Values: `EVENT_LISTENER_TYPE_UNSPECIFIED`, `WEBHOOK_LISTENER`, `JMS_LISTENER`. |
| `isEventingSupported` | boolean | Is Eventing Supported. |
| `listenerAuthConfigTemplates` | array<AuthConfigTemplate> | ListenerAuthConfigTemplates represents the auth values for the event listener. |
| `proxyDestinationConfig` | DestinationConfigTemplate | Proxy destination config template. |
| `registrationDestinationConfig` | DestinationConfigTemplate | Registration host destination config template. |
| `sslConfigTemplate` | SslConfigTemplate | SSL Config template for the connector version. |
| `triggerConfigVariables` | array<ConfigVariableTemplate> | Trigger Config fields that needs to be rendered |

### `EventingDetails`

- Eventing Details message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customEventTypes` | boolean | Output only. Custom Event Types. |
| `description` | string | Output only. Description. |
| `documentationLink` | string | Output only. Link to public documentation. |
| `iconLocation` | string | Output only. Cloud storage location of the icon. |
| `launchStage` | string enum | Output only. Eventing Launch Stage. Values: `LAUNCH_STAGE_UNSPECIFIED`, `PREVIEW`, `GA`, `DEPRECATED`, `TEST`, `PRIVATE_PREVIEW`. |
| `name` | string | Output only. Name of the Eventing trigger. |
| `searchTags` | array<string> | Output only. Array of search keywords. |
| `subscriptionType` | string enum | The webhook model supported by this connector. Values: `SUBSCRIPTION_TYPE_UNSPECIFIED`, `SHARED`, `USER_SPECIFIC`. |
| `type` | string enum | Output only. The type of the event listener for a specific connector. Values: `TYPE_UNSPECIFIED`, `WEBHOOK`, `JMS`. |

### `EventingRuntimeData`

- Eventing runtime data has the details related to eventing managed by the system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventsListenerEndpoint` | string | Output only. Events listener endpoint. The value will populated after provisioning the events listener. |
| `eventsListenerPscSa` | string | Output only. Events listener PSC Service attachment. The value will be populated after provisioning the events listener with private connectivity enabled. |
| `status` | EventingStatus | Output only. Current status of eventing. |
| `webhookData` | WebhookData | Output only. Webhook data. |
| `webhookSubscriptions` | WebhookSubscriptions | Output only. Webhook subscriptions. |

### `EventingStatus`

- EventingStatus indicates the state of eventing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. Description of error if State is set to "ERROR". |
| `state` | string enum | Output only. State. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `ERROR`, `INGRESS_ENDPOINT_REQUIRED`. |

### `ExchangeAuthCodeRequest`

- ExchangeAuthCodeRequest currently includes the auth code data.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authCodeData` | AuthCodeData | Optional. AuthCodeData contains the data the runtime requires to exchange for access and refresh tokens. If the data is not provided, the runtime will read the data from the secret manager. |
| `executionConfig` | ExecutionConfig | ExecutionConfig contains the configuration for the execution of the request. |
| `oauth2Config` | OAuth2Config | OAuth2Config contains the OAuth2 config for the connection. |

### `ExchangeAuthCodeResponse`

- ExchangeAuthCodeResponse includes the returned access token and its associated credentials.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessCredentials` | AccessCredentials | — |
| `metadata` | object | Metadata like service latency, etc. |

### `ExecuteActionRequest`

- Request message for ActionService.ExecuteAction
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executionConfig` | ExecutionConfig | Execution config for the request. |
| `parameters` | object | Parameters for executing the action. The parameters can be key/value pairs or nested structs. |

### `ExecuteActionResponse`

- Response message for ActionService.ExecuteAction
- Version: v2

| Field | Type | Description |
|---|---|---|
| `metadata` | object | Metadata like service latency, etc. |
| `results` | array<object> | In the case of successful invocation of the specified action, the results Struct contains values based on the response of the action invoked. 1. If the action execution produces any entities as a result, they are returned as an array of Structs with the 'key' being the field name and the 'value' being the value of that field in each result row. { 'results': \[{'key': 'value'}, ...\] } |

### `ExecuteHttpRequestRequest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `headers` | array<HttpHeader> | HTTP headers to send with the request (e.g., Content-Type: application/json). Order is preserved and duplicate keys are allowed. |
| `httpMethod` | string enum | Required. The HTTP method to use for the request. Values: `HTTP_METHOD_UNSPECIFIED`, `HTTP_METHOD_GET`, `HTTP_METHOD_POST`, `HTTP_METHOD_PUT`, `HTTP_METHOD_PATCH`, `HTTP_METHOD_DELETE`, `HTTP_METHOD_HEAD`, `HTTP_METHOD_OPTIONS`. |
| `rawBody` | string (byte) | Raw byte payload. Used for all pre-serialized formats including JSON, XML, GraphQL, and Multipart. |
| `url` | string | Required. The fully resolved absolute target URL. Callers must pre-encode any query parameters. |

### `ExecuteHttpRequestResponse`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `body` | string (byte) | The raw response body. |
| `headers` | array<HttpHeader> | HTTP headers received in the response. Order is preserved and duplicate keys are allowed (e.g., multiple Set-Cookie headers). |
| `reason` | string | The HTTP status reason phrase received from the backend (e.g., "Not Found"). May be empty if the backend did not provide one. |
| `statusCode` | integer (int32) | The HTTP status code received from the backend. |

### `ExecuteSqlQueryRequest`

- An execute sql query request containing the query and the connection to execute it on.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `query` | Query | Required. SQL statement passed by clients like Integration Platform, the query is passed as-is to the driver used for interfacing with external systems. |

### `ExecuteSqlQueryResponse`

- A response returned by the connection after executing the sql query.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `results` | array<object> | In the case of successful execution of the query the response contains results returned by the external system. For example, the result rows of the query are contained in the 'results' Struct list - "results": \[ { "field1": "val1", "field2": "val2",.. },.. \] Each Struct row can contain fields any type of like nested Structs or lists. |

### `ExecuteToolRequest`

- Request message for ConnectorAgentService.ExecuteTool
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executionConfig` | ExecutionConfig | execution config for the request. |
| `parameters` | object | Input parameters for the tool. |
| `toolDefinition` | object | Tool definition for the tool to be executed. |

### `ExecuteToolResponse`

- Response message for ConnectorAgentService.ExecuteTool
- Version: v2

| Field | Type | Description |
|---|---|---|
| `_meta` | object | Metadata for the tool execution result. |
| `metadata` | object | Metadata like service latency, etc. |
| `result` | object | Output from the tool execution. |

### `ExecutionConfig`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `headers` | string | headers to be used for the request. For example: headers:'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}' |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExtractionRule`

- Extraction Rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extractionRegex` | string | Regex used to extract backend details from source. If empty, whole source value will be used. |
| `formatString` | string | Format string used to format the extracted backend details. If empty, extracted backend details will be returned as it is. |
| `source` | Source | Source on which the rule is applied. |

### `ExtractionRules`

- Extraction Rules to identity the backends from customer provided configuration in Connection resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extractionRule` | array<ExtractionRule> | Collection of Extraction Rule. |

### `FetchAuthSchemaResponse`

- Response message for Connectors.GetAuthSchema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authSchemas` | array<AuthSchema> | List of AuthSchemas. |
| `jsonSchema` | JsonAuthSchema | JSON schema of the AuthSchemas. This is only populated if the view is JSON_SCHEMA. The schema is in draft-07 format. |

### `FetchConnectionToolspecOverrideRequest`

- Request message for FetchConnectionToolspecOverride API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `toolNames` | array<ToolName> | Required. List of tools for which the tool spec override is to be generated. |

### `FetchConnectionToolspecOverrideResponse`

- Response message for FetchConnectionToolspecOverride API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `toolspecOverride` | ToolspecOverride | Toolspec overrides for the connection. |

### `Field`

- Message contains EntityType's Field metadata.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `additionalDetails` | object | The following map contains fields that are not explicitly mentioned above,this give connectors the flexibility to add new metadata fields. |
| `dataType` | string enum | The data type of the Field. Values: `DATA_TYPE_UNSPECIFIED`, `INT`, `SMALLINT`, `DOUBLE`, `DATE`, `DATETIME`, `TIME`, `STRING`, `LONG`, `BOOLEAN`, `DECIMAL`, `UUID`, `BLOB`, `BIT`, `TINYINT`, `INTEGER`, `BIGINT`, `FLOAT`, `REAL`, `NUMERIC`, `CHAR`, `VARCHAR`, `LONGVARCHAR`, `TIMESTAMP`, `NCHAR`, `NVARCHAR`, `LONGNVARCHAR`, `NULL`, `OTHER`, `JAVA_OBJECT`, `DISTINCT`, `STRUCT`, `ARRAY`, `CLOB`, `REF`, `DATALINK`, `ROWID`, `BINARY`, `VARBINARY`, `LONGVARBINARY`, `NCLOB`, `SQLXML`, `REF_CURSOR`, `TIME_WITH_TIMEZONE`, `TIMESTAMP_WITH_TIMEZONE`. |
| `defaultValue` | any | The following field specifies the default value of the Field provided by the external system if a value is not provided. |
| `description` | string | A brief description of the Field. |
| `jsonSchema` | JsonSchema | JsonSchema of the field, applicable only if field is of type `STRUCT` |
| `key` | boolean | The following boolean field specifies if the current Field acts as a primary key or id if the parent is of type entity. |
| `name` | string | Name of the Field. |
| `nullable` | boolean | Specifies whether a null value is allowed. |
| `reference` | Reference | Reference captures the association between two different entity types. Value links to the reference of another entity type. |

### `Field` (v1)

- Metadata of an entity field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalDetails` | object | The following map contains fields that are not explicitly mentioned above,this give connectors the flexibility to add new metadata fields. |
| `dataType` | string enum | The data type of the Field. Values: `DATA_TYPE_UNSPECIFIED`, `DATA_TYPE_INT`, `DATA_TYPE_SMALLINT`, `DATA_TYPE_DOUBLE`, `DATA_TYPE_DATE`, `DATA_TYPE_DATETIME`, `DATA_TYPE_TIME`, `DATA_TYPE_STRING`, `DATA_TYPE_LONG`, `DATA_TYPE_BOOLEAN`, `DATA_TYPE_DECIMAL`, `DATA_TYPE_UUID`, `DATA_TYPE_BLOB`, `DATA_TYPE_BIT`, `DATA_TYPE_TINYINT`, `DATA_TYPE_INTEGER`, `DATA_TYPE_BIGINT`, `DATA_TYPE_FLOAT`, `DATA_TYPE_REAL`, `DATA_TYPE_NUMERIC`, `DATA_TYPE_CHAR`, `DATA_TYPE_VARCHAR`, `DATA_TYPE_LONGVARCHAR`, `DATA_TYPE_TIMESTAMP`, `DATA_TYPE_NCHAR`, `DATA_TYPE_NVARCHAR`, `DATA_TYPE_LONGNVARCHAR`, `DATA_TYPE_NULL`, `DATA_TYPE_OTHER`, `DATA_TYPE_JAVA_OBJECT`, `DATA_TYPE_DISTINCT`, `DATA_TYPE_STRUCT`, `DATA_TYPE_ARRAY`, `DATA_TYPE_CLOB`, `DATA_TYPE_REF`, `DATA_TYPE_DATALINK`, `DATA_TYPE_ROWID`, `DATA_TYPE_BINARY`, `DATA_TYPE_VARBINARY`, `DATA_TYPE_LONGVARBINARY`, `DATA_TYPE_NCLOB`, `DATA_TYPE_SQLXML`, `DATA_TYPE_REF_CURSOR`, `DATA_TYPE_TIME_WITH_TIMEZONE`, `DATA_TYPE_TIMESTAMP_WITH_TIMEZONE`. |
| `defaultValue` | any | The following field specifies the default value of the Field provided by the external system if a value is not provided. |
| `description` | string | A brief description of the Field. |
| `field` | string | Name of the Field. |
| `jsonSchema` | JsonSchema | JsonSchema representation of this entity's schema |
| `key` | boolean | The following boolean field specifies if the current Field acts as a primary key or id if the parent is of type entity. |
| `nullable` | boolean | Specifies whether a null value is allowed. |
| `readonly` | boolean | Specifies if the Field is readonly. |

### `FieldComparison`

- Field that needs to be compared.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Boolean value |
| `comparator` | string enum | Optional. Comparator to use for comparing the field value. Values: `COMPARATOR_UNSPECIFIED`, `EQUALS`, `NOT_EQUALS`. |
| `intValue` | string (int64) | Integer value |
| `key` | string | Optional. Key of the field. |
| `stringValue` | string | String value |

### `GenerateConnectionToolspecOverrideRequest`

- Request message for GenerateConnectionToolspecOverride API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `toolNames` | array<ToolName> | Required. List of tools for which the tool spec override is to be generated. |

### `GenerateConnectionToolspecOverrideResponse`

- Response message for GenerateConnectionToolspecOverride API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `toolspecOverride` | ToolspecOverride | Toolspec overrides for the connection. |

### `GenerateCustomToolspecRequest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `toolNames` | array<ToolName> | list of tools to be generated. |

### `GenerateCustomToolspecResponse`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `toolSpec` | ToolSpec | tool spec that has tool_defitions array containing the tools for all sted tool_names. |

### `GetResourcePostRequest`

- Request message for ConnectorAgentService.GetResourcePost
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executionConfig` | ExecutionConfig | execution config for the request. |
| `toolSpec` | ToolSpec | List of tool specifications. |

### `GetResourceResponse`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `_meta` | object | Metadata for the resource. |
| `data` | string (byte) | The content of the resource. |
| `metadata` | object | Metadata like service latency, etc. |
| `mimeType` | string | The MIME type of the resource. |

### `HPAConfig`

- Autoscaling config for connector deployment system metrics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuUtilizationThreshold` | string (int64) | Output only. Percent CPU utilization where HPA triggers autoscaling. |
| `memoryUtilizationThreshold` | string (int64) | Output only. Percent Memory utilization where HPA triggers autoscaling. |

### `Header`

- Header details for a given header to be added to Endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Optional. Key of Header. |
| `value` | string | Optional. Value of Header. |

### `HttpHeader`

- A single HTTP header. Keys are case-insensitive. Multiple headers with the same key may be present.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | The header name. |
| `value` | string | The header value. |

### `InputParameter`

- Input Parameter message contains metadata about the parameters required for executing an Action.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `additionalDetails` | object | The following map contains fields that are not explicitly mentioned above,this give connectors the flexibility to add new metadata fields. |
| `dataType` | string enum | The data type of the Parameter Values: `DATA_TYPE_UNSPECIFIED`, `INT`, `SMALLINT`, `DOUBLE`, `DATE`, `DATETIME`, `TIME`, `STRING`, `LONG`, `BOOLEAN`, `DECIMAL`, `UUID`, `BLOB`, `BIT`, `TINYINT`, `INTEGER`, `BIGINT`, `FLOAT`, `REAL`, `NUMERIC`, `CHAR`, `VARCHAR`, `LONGVARCHAR`, `TIMESTAMP`, `NCHAR`, `NVARCHAR`, `LONGNVARCHAR`, `NULL`, `OTHER`, `JAVA_OBJECT`, `DISTINCT`, `STRUCT`, `ARRAY`, `CLOB`, `REF`, `DATALINK`, `ROWID`, `BINARY`, `VARBINARY`, `LONGVARBINARY`, `NCLOB`, `SQLXML`, `REF_CURSOR`, `TIME_WITH_TIMEZONE`, `TIMESTAMP_WITH_TIMEZONE`. |
| `defaultValue` | any | The following field specifies the default value of the Parameter provided by the external system if a value is not provided. |
| `description` | string | A brief description of the Parameter. |
| `jsonSchema` | JsonSchema | JsonSchema of the parameter, applicable only if parameter is of type `STRUCT` |
| `name` | string | Name of the Parameter. |
| `nullable` | boolean | Specifies whether a null value is allowed. |

### `InputParameter` (v1)

- Metadata of an input parameter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | The data type of the Parameter. Values: `DATA_TYPE_UNSPECIFIED`, `DATA_TYPE_INT`, `DATA_TYPE_SMALLINT`, `DATA_TYPE_DOUBLE`, `DATA_TYPE_DATE`, `DATA_TYPE_DATETIME`, `DATA_TYPE_TIME`, `DATA_TYPE_STRING`, `DATA_TYPE_LONG`, `DATA_TYPE_BOOLEAN`, `DATA_TYPE_DECIMAL`, `DATA_TYPE_UUID`, `DATA_TYPE_BLOB`, `DATA_TYPE_BIT`, `DATA_TYPE_TINYINT`, `DATA_TYPE_INTEGER`, `DATA_TYPE_BIGINT`, `DATA_TYPE_FLOAT`, `DATA_TYPE_REAL`, `DATA_TYPE_NUMERIC`, `DATA_TYPE_CHAR`, `DATA_TYPE_VARCHAR`, `DATA_TYPE_LONGVARCHAR`, `DATA_TYPE_TIMESTAMP`, `DATA_TYPE_NCHAR`, `DATA_TYPE_NVARCHAR`, `DATA_TYPE_LONGNVARCHAR`, `DATA_TYPE_NULL`, `DATA_TYPE_OTHER`, `DATA_TYPE_JAVA_OBJECT`, `DATA_TYPE_DISTINCT`, `DATA_TYPE_STRUCT`, `DATA_TYPE_ARRAY`, `DATA_TYPE_CLOB`, `DATA_TYPE_REF`, `DATA_TYPE_DATALINK`, `DATA_TYPE_ROWID`, `DATA_TYPE_BINARY`, `DATA_TYPE_VARBINARY`, `DATA_TYPE_LONGVARBINARY`, `DATA_TYPE_NCLOB`, `DATA_TYPE_SQLXML`, `DATA_TYPE_REF_CURSOR`, `DATA_TYPE_TIME_WITH_TIMEZONE`, `DATA_TYPE_TIMESTAMP_WITH_TIMEZONE`. |
| `defaultValue` | any | The following field specifies the default value of the Parameter provided by the external system if a value is not provided. |
| `description` | string | A brief description of the Parameter. |
| `jsonSchema` | JsonSchema | JsonSchema representation of this action's parameter |
| `nullable` | boolean | Specifies whether a null value is allowed. |
| `parameter` | string | Name of the Parameter. |

### `Instance`

- Instance represents the interface for SLM services to actuate the state of control plane resources. Example Instance in JSON, where consumer-project-number=123456, producer-project-id=cloud-sql: Instance: { "name": "projects/123456/locations/us-east1/instances/prod-instance", "create_time": { "seconds": 1526406431, }, "labels": { "env": "prod", "foo": "bar" }, "state": READY, "software_versions": { "software_update": "cloud-sql-09-28-2018", }, "maintenance_policy_names": { "UpdatePolicy": "projects/123456/locations/us-east1/maintenancePolicies/prod-update-policy", } "tenant_project_id": "cloud-sql-test-tenant", "producer_metadata": { "cloud-sql-tier": "basic", "cloud-sql-instance-size": "1G", }, "provisioned_resources": \[ { "resource-type": "compute-instance", "resource-url": "https://www.googleapis.com/compute/v1/projects/cloud-sql/zones/us-east1-b/instances/vm-1", } \], "maintenance_schedules": { "csa_rollout": { "start_time": { "seconds": 1526406431, }, "end_time": { "seconds": 1535406431, }, }, "ncsa_rollout": { "start_time": { "seconds": 1526406431, }, "end_time": { "seconds": 1535406431, }, } }, "consumer_defined_name": "my-sql-instance1", } LINT.IfChange
- Version: v2

| Field | Type | Description |
|---|---|---|
| `consumerDefinedName` | string | consumer_defined_name is the name of the instance set by the service consumers. Generally this is different from the `name` field which reperesents the system-assigned id of the instance which the service consumers do not recognize. This is a required field for tenants onboarding to Maintenance Window notifications ((internal link)#prerequisites). |
| `consumerProjectNumber` | string | Optional. The consumer_project_number associated with this Apigee instance. This field is added specifically to support Apigee integration with SLM Rollout and UMM. It represents the numerical project ID of the GCP project that consumes this Apigee instance. It is used for SLM rollout notifications and UMM integration, enabling proper mapping to customer projects and log delivery for Apigee instances. This field complements consumer_project_id and may be used for specific Apigee scenarios where the numerical ID is required. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the resource was created. |
| `instanceType` | string | Optional. The instance_type of this instance of format: projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}. Instance Type represents a high-level tier or SKU of the service that this instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses 'instance_type' along with 'software_versions' to determine whether instance needs an update or not. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. |
| `maintenancePolicyNames` | object | Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the referenced policy must define the same policy type. For details, please refer to (internal link). Should not be set if maintenance_settings.maintenance_policies is set. |
| `maintenanceSchedules` | object | The MaintenanceSchedule contains the scheduling information of published maintenance schedule with same key as software_versions. |
| `maintenanceSettings` | MaintenanceSettings | Optional. The MaintenanceSettings associated with instance. |
| `name` | string | Unique name of the resource. It uses the form: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` Note: This name is passed, stored and logged across the rollout system. So use of consumer project_id or any other consumer PII in the name is strongly discouraged for wipeout ((internal link)) compliance. See (internal link)#storage-guidance for more details. |
| `notificationParameters` | object | Optional. notification_parameter are information that service producers may like to include that is not relevant to Rollout. This parameter will only be passed to Gamma and Cloud Logging for notification/logging purpose. |
| `producerMetadata` | object | Output only. Custom string attributes used primarily to expose producer-specific information in monitoring dashboards. See (internal link). |
| `provisionedResources` | array<ProvisionedResource> | Output only. The list of data plane resources provisioned for this instance, e.g. compute VMs. See (internal link). |
| `slmInstanceTemplate` | string | Link to the SLM instance template. Only populated when updating SLM instances via SSA's Actuation service adaptor. Service producers with custom control plane (e.g. Cloud SQL) doesn't need to populate this field. Instead they should use software_versions. |
| `sloMetadata` | SloMetadata | Output only. SLO metadata for instance classification in the Standardized dataplane SLO platform. See (internal link) for feature description. |
| `softwareVersions` | object | Software versions that are used to deploy this instance. This can be mutated by rollout services. |
| `state` | string enum | Output only. Current lifecycle state of the resource (e.g. if it's being created or ready to use). Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `UPDATING`, `REPAIRING`, `DELETING`, `ERROR`. |
| `tenantProjectId` | string | Output only. ID of the associated GCP tenant project. See (internal link). |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the resource was last modified. |

### `JMS`

- JMS message denotes the source of the event
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the JMS source. i.e. queueName or topicName |
| `type` | string enum | Optional. Type of the JMS Source. i.e. Queue or Topic Values: `TYPE_UNSPECIFIED`, `QUEUE`, `TOPIC`. |

### `JsonAuthSchema`

- JsonAuthSchema defines the JSON schema of all authentication types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `$schema` | string | JSON schema of the AuthSchemas. |
| `oneOf` | array<AuthObject> | List of AuthObjects. |

### `JsonSchema`

- JsonSchema representation of schema metadata
- Version: v2

| Field | Type | Description |
|---|---|---|
| `$comment` | string | A comment on the schema. |
| `$defs` | object | Definitions for the schema. |
| `$id` | string | The URI defining the core schema meta-schema. |
| `$ref` | string | A reference to another schema. |
| `$schema` | string | The URI defining the schema. |
| `additionalDetails` | object | Additional details apart from standard json schema fields, this gives flexibility to store metadata about the schema |
| `additionalItems` | JsonSchema | Schema for additional items. |
| `additionalProperties` | JsonSchema | Schema for additional properties. |
| `allOf` | array<JsonSchema> | Schema that must be valid against all of the sub-schemas. |
| `anyOf` | array<JsonSchema> | Schema that must be valid against at least one of the sub-schemas. |
| `const` | any | Const value that the data must match. |
| `contains` | JsonSchema | Schema that applies to at least one item in an array. |
| `contentEncoding` | string | Encoding of the content. |
| `contentMediaType` | string | Media type of the content. |
| `default` | any | The default value of the field or object described by this schema. |
| `definitions` | object | Definitions for the schema. |
| `dependencies` | object | Dependencies for the schema. |
| `description` | string | A description of this schema. |
| `else` | JsonSchema | Schema that must be valid if the "if" schema is invalid. |
| `enum` | array<any> | Possible values for an enumeration. This works in conjunction with `type` to represent types with a fixed set of legal values |
| `examples` | array<any> | Examples of the value. |
| `exclusiveMaximum` | any | Whether the maximum number value is exclusive. |
| `exclusiveMinimum` | any | Whether the minimum number value is exclusive. |
| `format` | string | Format of the value as per https://json-schema.org/understanding-json-schema/reference/string.html#format |
| `if` | JsonSchema | Schema that must be valid if the "if" schema is valid. |
| `items` | JsonSchema | Schema that applies to array values, applicable only if this is of type `array`. |
| `jdbcType` | string enum | JDBC datatype of the field. Values: `DATA_TYPE_UNSPECIFIED`, `INT`, `SMALLINT`, `DOUBLE`, `DATE`, `DATETIME`, `TIME`, `STRING`, `LONG`, `BOOLEAN`, `DECIMAL`, `UUID`, `BLOB`, `BIT`, `TINYINT`, `INTEGER`, `BIGINT`, `FLOAT`, `REAL`, `NUMERIC`, `CHAR`, `VARCHAR`, `LONGVARCHAR`, `TIMESTAMP`, `NCHAR`, `NVARCHAR`, `LONGNVARCHAR`, `NULL`, `OTHER`, `JAVA_OBJECT`, `DISTINCT`, `STRUCT`, `ARRAY`, `CLOB`, `REF`, `DATALINK`, `ROWID`, `BINARY`, `VARBINARY`, `LONGVARBINARY`, `NCLOB`, `SQLXML`, `REF_CURSOR`, `TIME_WITH_TIMEZONE`, `TIMESTAMP_WITH_TIMEZONE`. |
| `maxItems` | integer (int32) | Maximum number of items in the array field. |
| `maxLength` | integer (int32) | Maximum length of the string field. |
| `maxProperties` | integer (int32) | Maximum number of properties. |
| `maximum` | any | Maximum value of the number field. |
| `minItems` | integer (int32) | Minimum number of items in the array field. |
| `minLength` | integer (int32) | Minimum length of the string field. |
| `minProperties` | integer (int32) | Minimum number of properties. |
| `minimum` | any | Minimum value of the number field. |
| `multipleOf` | number (double) | Number must be a multiple of this value. |
| `not` | JsonSchema | Schema that must not be valid. |
| `oneOf` | array<JsonSchema> | Schema that must be valid against at least one of the sub-schemas. |
| `pattern` | string | Regex pattern of the string field. This is a string value that describes the regular expression that the string value should match. |
| `patternProperties` | object | Pattern properties for the schema. |
| `properties` | object | The child schemas, applicable only if this is of type `object`. The key is the name of the property and the value is the json schema that describes that property |
| `propertyNames` | JsonSchema | Schema for property names. |
| `readOnly` | boolean | Whether the value is read-only. |
| `required` | array<string> | Whether this property is required. |
| `then` | JsonSchema | Schema that must be valid if the "if" schema is valid. |
| `title` | string | A title of the schema. |
| `type` | array<string> | JSON Schema Validation: A Vocabulary for Structural Validation of JSON |
| `uniqueItems` | boolean | Whether the items in the array field are unique. |
| `writeOnly` | boolean | Whether the value is write-only. |

### `JwtClaims`

- JWT claims used for the jwt-bearer authorization grant.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `audience` | string | Optional. Value for the "aud" claim. |
| `issuer` | string | Optional. Value for the "iss" claim. |
| `subject` | string | Optional. Value for the "sub" claim. |

### `ListActionsResponse`

- Response message for ActionService.ListActions
- Version: v2

| Field | Type | Description |
|---|---|---|
| `actions` | array<Action> | List of action metadata. |
| `metadata` | object | Metadata like service latency, etc. |
| `nextPageToken` | string | Next page token if more actions available. |
| `unsupportedActionNames` | array<string> | List of actions which contain unsupported Datatypes. Check datatype.proto for more information. |

### `ListActionsResponse` (v1)

- Response message for ListActions API
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<RuntimeActionSchema> | list of actions |
| `nextPageToken` | string | token for next page |

### `ListConnectionsResponse`

- Response message for ConnectorsService.ListConnections
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connections` | array<Connection> | Connections. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListConnectorVersionsResponse`

- Response message for Connectors.ListConnectorVersions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectorVersions` | array<ConnectorVersion> | A list of connector versions. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListConnectorsResponse`

- Response message for Connectors.ListConnectors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectors` | array<Connector> | A list of connectors. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCustomConnectorVersionsResponse`

- Response message for Connectors.ListCustomConnectorVersions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customConnectorVersions` | array<CustomConnectorVersion> | A list of connector versions. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCustomConnectorsResponse`

- Response message for Connectors.ListCustomConnectors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customConnectors` | array<CustomConnector> | A list of customConnectors. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCustomToolNamesResponse`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `toolNames` | array<ToolName> | List of custom tools. |

### `ListEndUserAuthenticationsResponse`

- Response message for ConnectorsService.ListEndUserAuthentications
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endUserAuthentications` | array<EndUserAuthentication> | Subscriptions. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListEndpointAttachmentsResponse`

- Response message for ConnectorsService.ListEndpointAttachments
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpointAttachments` | array<EndpointAttachment> | EndpointAttachments. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListEntitiesResponse`

- Response message for EntityService.ListEntities
- Version: v2

| Field | Type | Description |
|---|---|---|
| `entities` | array<Entity> | List containing entity rows. |
| `metadata` | object | Metadata like service latency, etc. |
| `nextPageToken` | string | Next page token if more records are available. |

### `ListEntityTypesResponse`

- Response message for EntityService.ListEntityTypes
- Version: v2

| Field | Type | Description |
|---|---|---|
| `metadata` | object | Metadata like service latency, etc. |
| `nextPageToken` | string | Next page token if more entity types available. |
| `types` | array<EntityType> | List of metadata related to all entity types. |
| `unsupportedTypeNames` | array<string> | List of entity type names which contain unsupported Datatypes. Check datatype.proto for more information. |

### `ListEntityTypesResponse` (v1)

- Response message for ListEntityTypes API
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entityTypes` | array<RuntimeEntitySchema> | list of entity types |
| `nextPageToken` | string | token for next page |

### `ListEventSubscriptionsResponse`

- Response message for ConnectorsService.ListEventSubscriptions
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventSubscriptions` | array<EventSubscription> | Subscriptions. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListEventTypesResponse`

- Response message for Connectors.ListEventTypes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventTypes` | array<EventType> | A list of connector versions. |
| `nextPageToken` | string | Next page token. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### Shape of `AccessCredentials`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "accessToken": "string",
  "expiresIn": "string (google-duration)",
  "refreshToken": "string"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `connectors` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://connectors.googleapis.com/$discovery/rest?version=v2, https://connectors.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
