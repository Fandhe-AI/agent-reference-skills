---
source: https://integrations.googleapis.com/$discovery/rest?version=v1
---

# Application Integration API message schemas (integrations) (part 2/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/integrations/`.

### `GoogleCloudConnectorsV1ConfigVariable`

- ConfigVariable represents a configuration variable present in a Connection. or AuthConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Optional. Value is a bool. |
| `encryptionKeyValue` | GoogleCloudConnectorsV1EncryptionKey | Optional. Value is a Encryption Key. |
| `intValue` | string (int64) | Optional. Value is an integer |
| `key` | string | Optional. Key of the config variable. |
| `secretValue` | GoogleCloudConnectorsV1Secret | Optional. Value is a secret. |
| `stringValue` | string | Optional. Value is a string. |

### `GoogleCloudConnectorsV1Connection`

- Connection represents an instance of connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminFilters` | array<GoogleCloudConnectorsV1AdminFilters> | Optional. Admin filters for the connection. These are used by Gemini Enterprise. |
| `asyncOperationsEnabled` | boolean | Optional. Async operations enabled for the connection. If Async Operations is enabled, Connection allows the customers to initiate async long running operations using the actions API. |
| `authConfig` | GoogleCloudConnectorsV1AuthConfig | Optional. Configuration for establishing the connection's authentication with an external system. |
| `authOverrideEnabled` | boolean | Optional. Auth override enabled for the connection. If Auth Override is enabled, Connection allows the backend service auth to be overridden in the entities/actions API. |
| `billingConfig` | GoogleCloudConnectorsV1BillingConfig | Output only. Billing config for the connection. |
| `configVariables` | array<GoogleCloudConnectorsV1ConfigVariable> | Optional. Configuration for configuring the connection with an external system. |
| `connectionRevision` | string (int64) | Output only. Connection revision. This field is only updated when the connection is created or updated by User. |
| `connectorVersion` | string | Required. Connector version on which the connection is created. The format is: projects/\*/locations/\*/providers/\*/connectors/\*/versions/\* Only global location is supported for ConnectorVersion resource. |
| `connectorVersionInfraConfig` | GoogleCloudConnectorsV1ConnectorVersionInfraConfig | Output only. Infra configs supported by Connector Version. |
| `connectorVersionLaunchStage` | string enum | Output only. Flag to mark the version indicating the launch stage. Values: `LAUNCH_STAGE_UNSPECIFIED`, `PREVIEW`, `GA`, `DEPRECATED`, `TEST`, `PRIVATE_PREVIEW`. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `description` | string | Optional. Description of the resource. |
| `destinationConfigs` | array<GoogleCloudConnectorsV1DestinationConfig> | Optional. Configuration of the Connector's destination. Only accepted for Connectors that accepts user defined destination(s). |
| `envoyImageLocation` | string | Output only. GCR location where the envoy image is stored. formatted like: gcr.io/{bucketName}/{imageName} |
| `euaOauthAuthConfig` | GoogleCloudConnectorsV1AuthConfig | Optional. Additional Oauth2.0 Auth config for EUA. If the connection is configured using non-OAuth authentication but OAuth needs to be used for EUA, this field can be populated with the OAuth config. This should be a OAuth2AuthCodeFlow Auth type only. |
| `eventingConfig` | GoogleCloudConnectorsV1EventingConfig | Optional. Eventing config of a connection |
| `eventingEnablementType` | string enum | Optional. Eventing enablement type. Will be nil if eventing is not enabled. Values: `EVENTING_ENABLEMENT_TYPE_UNSPECIFIED`, `EVENTING_AND_CONNECTION`, `ONLY_EVENTING`. |
| `eventingRuntimeData` | GoogleCloudConnectorsV1EventingRuntimeData | Output only. Eventing Runtime Data. |
| `fallbackOnAdminCredentials` | boolean | Optional. Fallback on admin credentials for the connection. If this both auth_override_enabled and fallback_on_admin_credentials are set to true, the connection will use the admin credentials if the dynamic auth header is not present during auth override. |
| `host` | string | Output only. The name of the Hostname of the Service Directory service with TLS. |
| `imageLocation` | string | Output only. GCR location where the runtime image is stored. formatted like: gcr.io/{bucketName}/{imageName} |
| `isTrustedTester` | boolean | Output only. Is trusted tester program enabled for the project. |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `lockConfig` | GoogleCloudConnectorsV1LockConfig | Optional. Configuration that indicates whether or not the Connection can be edited. |
| `logConfig` | GoogleCloudConnectorsV1LogConfig | Optional. Log configuration for the connection. |
| `name` | string | Output only. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection} |
| `nodeConfig` | GoogleCloudConnectorsV1NodeConfig | Optional. Node configuration for the connection. |
| `serviceAccount` | string | Optional. Service account needed for runtime plane to access Google Cloud resources. |
| `serviceDirectory` | string | Output only. The name of the Service Directory service name. Used for Private Harpoon to resolve the ILB address. e.g. "projects/cloud-connectors-e2e-testing/locations/us-central1/namespaces/istio-system/services/istio-ingressgateway-connectors" |
| `sslConfig` | GoogleCloudConnectorsV1SslConfig | Optional. Ssl config of a connection |
| `status` | GoogleCloudConnectorsV1ConnectionStatus | Output only. Current status of the connection. |
| `subscriptionType` | string enum | Output only. This subscription type enum states the subscription type of the project. Values: `SUBSCRIPTION_TYPE_UNSPECIFIED`, `PAY_G`, `PAID`. |
| `suspended` | boolean | Optional. Suspended indicates if a user has suspended a connection or not. |
| `tlsServiceDirectory` | string | Output only. The name of the Service Directory service with TLS. |
| `trafficShapingConfigs` | array<GoogleCloudConnectorsV1TrafficShapingConfig> | Optional. Traffic shaping configuration for the connection. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `GoogleCloudConnectorsV1ConnectionStatus`

- ConnectionStatus indicates the state of the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description. |
| `state` | string enum | State. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `INACTIVE`, `DELETING`, `UPDATING`, `ERROR`, `AUTHORIZATION_REQUIRED`. |
| `status` | string | Status provides detailed information for the state. |

### `GoogleCloudConnectorsV1ConnectorVersionInfraConfig`

- This configuration provides infra configs like rate limit threshold which need to be configurable for every connector version
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionRatelimitWindowSeconds` | string (int64) | Output only. The window used for ratelimiting runtime requests to connections. |
| `deploymentModel` | string enum | Output only. Indicates whether connector is deployed on GKE/CloudRun Values: `DEPLOYMENT_MODEL_UNSPECIFIED`, `GKE_MST`, `CLOUD_RUN_MST`. |
| `deploymentModelMigrationState` | string enum | Output only. Status of the deployment model migration. Values: `DEPLOYMENT_MODEL_MIGRATION_STATE_UNSPECIFIED`, `IN_PROGRESS`, `COMPLETED`, `ROLLEDBACK`, `ROLLBACK_IN_PROGRESS`. |
| `hpaConfig` | GoogleCloudConnectorsV1HPAConfig | Output only. HPA autoscaling config. |
| `internalclientRatelimitThreshold` | string (int64) | Output only. Max QPS supported for internal requests originating from Connd. |
| `maxInstanceRequestConcurrency` | integer (int32) | Output only. Max instance request concurrency. |
| `ratelimitThreshold` | string (int64) | Output only. Max QPS supported by the connector version before throttling of requests. |
| `resourceLimits` | GoogleCloudConnectorsV1ResourceLimits | Output only. System resource limits. |
| `resourceRequests` | GoogleCloudConnectorsV1ResourceRequests | Output only. System resource requests. |
| `sharedDeployment` | string | Output only. The name of shared connector deployment. |
| `tlsMigrationState` | string enum | Output only. Status of the TLS migration. Values: `TLS_MIGRATION_STATE_UNSPECIFIED`, `TLS_MIGRATION_NOT_STARTED`, `TLS_MIGRATION_COMPLETED`. |

### `GoogleCloudConnectorsV1Destination`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | For publicly routable host. |
| `port` | integer (int32) | Optional. The port is the target port number that is accepted by the destination. |
| `serviceAttachment` | string | PSC service attachments. Format: projects/\*/regions/\*/serviceAttachments/\* |

### `GoogleCloudConnectorsV1DestinationConfig`

- Define the Connectors target endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<GoogleCloudConnectorsV1Destination> | Optional. The destinations for the key. |
| `key` | string | Optional. The key is the destination identifier that is supported by the Connector. |

### `GoogleCloudConnectorsV1EncryptionKey`

- Encryption Key value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. The \[KMS key name\] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed. |
| `type` | string enum | Optional. Specifies the type of the encryption key. Values: `TYPE_UNSPECIFIED`, `GOOGLE_MANAGED`, `CUSTOMER_MANAGED`. |

### `GoogleCloudConnectorsV1EnrichmentConfig`

- Data enrichment configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appendAcl` | boolean | Optional. Append ACL to the event. |

### `GoogleCloudConnectorsV1EventingConfig`

- Eventing Configuration of a connection next: 21
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<GoogleCloudConnectorsV1ConfigVariable> | Optional. Additional eventing related field values |
| `allowedEventTypes` | array<string> | Optional. List of allowed event types for the connection. |
| `authConfig` | GoogleCloudConnectorsV1AuthConfig | Optional. Auth details for the webhook adapter. |
| `deadLetterConfig` | GoogleCloudConnectorsV1EventingConfigDeadLetterConfig | Optional. Dead letter configuration for eventing of a connection. |
| `enrichmentConfig` | GoogleCloudConnectorsV1EnrichmentConfig | Optional. Data enrichment configuration. |
| `enrichmentEnabled` | boolean | Optional. Enrichment Enabled. |
| `eventsListenerIngressEndpoint` | string | Output only. Ingress endpoint of the event listener. This is used only when private connectivity is enabled. |
| `globalEventFilter` | string | Optional. Filter to be applied on the events to be received by the connection. |
| `listenerAuthConfig` | GoogleCloudConnectorsV1AuthConfig | Optional. Auth details for the event listener. |
| `privateConnectivityAllowlistedProjects` | array<string> | Optional. List of projects to be allowlisted for the service attachment created in the tenant project for eventing ingress. |
| `privateConnectivityEnabled` | boolean | Optional. Private Connectivity Enabled. |
| `proxyDestinationConfig` | GoogleCloudConnectorsV1DestinationConfig | Optional. Proxy for Eventing auto-registration. |
| `registrationDestinationConfig` | GoogleCloudConnectorsV1DestinationConfig | Optional. Registration endpoint for auto registration. |
| `sslConfig` | GoogleCloudConnectorsV1SslConfig | Optional. Ssl config of a connection |

### `GoogleCloudConnectorsV1EventingConfigDeadLetterConfig`

- Dead Letter configuration details provided by the user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Optional. Project which has the topic given. |
| `topic` | string | Optional. Topic to push events which couldn't be processed. |

### `GoogleCloudConnectorsV1EventingRuntimeData`

- Eventing runtime data has the details related to eventing managed by the system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventsListenerEndpoint` | string | Output only. Events listener endpoint. The value will populated after provisioning the events listener. |
| `eventsListenerPscSa` | string | Output only. Events listener PSC Service attachment. The value will be populated after provisioning the events listener with private connectivity enabled. |
| `status` | GoogleCloudConnectorsV1EventingStatus | Output only. Current status of eventing. |
| `webhookData` | GoogleCloudConnectorsV1EventingRuntimeDataWebhookData | Output only. Webhook data. |
| `webhookSubscriptions` | GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions | Output only. Webhook subscriptions. |

### `GoogleCloudConnectorsV1EventingRuntimeDataWebhookData`

- WebhookData has details of webhook configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<GoogleCloudConnectorsV1ConfigVariable> | Output only. Additional webhook related field values. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the webhook was created. |
| `eventSubscriptions` | array<string> | Output only. List of event subscriptions which are using the webhook. |
| `eventTypes` | array<string> | Output only. List of event types for the webhook. This is the event types subscribed by the current webhook. |
| `id` | string | Output only. ID to uniquely identify webhook. |
| `name` | string | Output only. Name of the Webhook |
| `nextRefreshTime` | string (google-datetime) | Output only. Next webhook refresh time. Will be null if refresh is not supported. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the webhook was last updated. |

### `GoogleCloudConnectorsV1EventingRuntimeDataWebhookSubscriptions`

- WebhookSubscriptions has details of webhook subscriptions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `webhookData` | array<GoogleCloudConnectorsV1EventingRuntimeDataWebhookData> | Output only. Webhook data. |

### `GoogleCloudConnectorsV1EventingStatus`

- EventingStatus indicates the state of eventing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. Description of error if State is set to "ERROR". |
| `state` | string enum | Output only. State. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `ERROR`, `INGRESS_ENDPOINT_REQUIRED`. |

### `GoogleCloudConnectorsV1HPAConfig`

- Autoscaling config for connector deployment system metrics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuUtilizationThreshold` | string (int64) | Output only. Percent CPU utilization where HPA triggers autoscaling. |
| `memoryUtilizationThreshold` | string (int64) | Output only. Percent Memory utilization where HPA triggers autoscaling. |

### `GoogleCloudConnectorsV1LockConfig`

- Determines whether or no a connection is locked. If locked, a reason must be specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locked` | boolean | Optional. Indicates whether or not the connection is locked. |
| `reason` | string | Optional. Describes why a connection is locked. |

### `GoogleCloudConnectorsV1LogConfig`

- Log configuration for the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Enabled represents whether logging is enabled or not for a connection. |
| `level` | string enum | Optional. Log configuration level. Values: `LOG_LEVEL_UNSPECIFIED`, `ERROR`, `INFO`, `DEBUG`. |

### `GoogleCloudConnectorsV1NodeConfig`

- Node configuration for the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxNodeCount` | integer (int32) | Optional. Maximum number of nodes in the runtime nodes. |
| `minNodeCount` | integer (int32) | Optional. Minimum number of nodes in the runtime nodes. |

### `GoogleCloudConnectorsV1ResourceLimits`

- Resource limits defined for connection pods of a given connector type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpu` | string | Output only. CPU limit. |
| `memory` | string | Output only. Memory limit. |

### `GoogleCloudConnectorsV1ResourceRequests`

- Resource requests defined for connection pods of a given connector type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpu` | string | Output only. CPU request. |
| `memory` | string | Output only. Memory request. |

### `GoogleCloudConnectorsV1Secret`

- Secret provides a reference to entries in Secret Manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `secretVersion` | string | Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`. |

### `GoogleCloudConnectorsV1SslConfig`

- SSL Configuration of a connection
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<GoogleCloudConnectorsV1ConfigVariable> | Optional. Additional SSL related field values |
| `clientCertType` | string enum | Optional. Type of Client Cert (PEM/JKS/.. etc.) Values: `CERT_TYPE_UNSPECIFIED`, `PEM`. |
| `clientCertificate` | GoogleCloudConnectorsV1Secret | Optional. Client Certificate |
| `clientPrivateKey` | GoogleCloudConnectorsV1Secret | Optional. Client Private Key |
| `clientPrivateKeyPass` | GoogleCloudConnectorsV1Secret | Optional. Secret containing the passphrase protecting the Client Private Key |
| `privateServerCertificate` | GoogleCloudConnectorsV1Secret | Optional. Private Server Certificate. Needs to be specified if trust model is `PRIVATE`. |
| `serverCertType` | string enum | Optional. Type of Server Cert (PEM/JKS/.. etc.) Values: `CERT_TYPE_UNSPECIFIED`, `PEM`. |
| `trustModel` | string enum | Optional. Trust Model of the SSL connection Values: `PUBLIC`, `PRIVATE`, `INSECURE`. |
| `type` | string enum | Optional. Controls the ssl type for the given connector version. Values: `SSL_TYPE_UNSPECIFIED`, `TLS`, `MTLS`. |
| `useSsl` | boolean | Optional. Bool for enabling SSL |

### `GoogleCloudConnectorsV1TrafficShapingConfig`

- \* TrafficShapingConfig defines the configuration for shaping API traffic by specifying a quota limit and the duration over which this limit is enforced. This configuration helps to control and manage the rate at which API calls are made on the client side, preventing service overload on the backend. For example: - if the quota limit is 100 calls per 10 seconds, then the message would be: { quota_limit: 100 duration: { seconds: 10 } } - if the quota limit is 100 calls per 5 minutes, then the message would be: { quota_limit: 100 duration: { seconds: 300 } } - if the quota limit is 10000 calls per day, then the message would be: { quota_limit: 10000 duration: { seconds: 86400 } and so on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Required. Specifies the duration over which the API call quota limits are calculated. This duration is used to define the time window for evaluating if the number of API calls made by a user is within the allowed quota limits. For example: - To define a quota sampled over 16 seconds, set `seconds` to 16 - To define a quota sampled over 5 minutes, set `seconds` to 300 (5 \* 60) - To define a quota sampled over 1 day, set `seconds` to 86400 (24 \* 60 \* 60) and so on. It is important to note that this duration is not the time the quota is valid for, but rather the time window over which the quota is evaluated. For example, if the quota is 100 calls per 10 seconds, then this duration field would be set to 10 seconds. |
| `quotaLimit` | string (int64) | Required. Maximum number of api calls allowed. |

### `GoogleCloudIntegrationsV1alphaAccessToken`

- The access token represents the authorization of a specific application to access specific parts of a user’s data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | The access token encapsulating the security identity of a process or thread. |
| `accessTokenExpireTime` | string (google-datetime) | Required. The approximate time until the access token retrieved is valid. |
| `refreshToken` | string | If the access token will expire, use the refresh token to obtain another access token. |
| `refreshTokenExpireTime` | string (google-datetime) | The approximate time until the refresh token retrieved is valid. |
| `tokenType` | string | Only support "bearer" token in v1 as bearer token is the predominant type used with OAuth 2.0. |

### `GoogleCloudIntegrationsV1alphaApiTriggerResource`

- List of API triggerID and their workflow resource name.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationResource` | string | Required. Integration where the API is published |
| `triggerId` | array<string> | Required. Trigger Id of the API trigger(s) in the integration |

### `GoogleCloudIntegrationsV1alphaAssertion`

- An assertion which will check for a condition over task execution status or an expression for task output variables
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assertionStrategy` | string enum | Optional. The type of assertion to perform. Values: `ASSERTION_STRATEGY_UNSPECIFIED`, `ASSERT_SUCCESSFUL_EXECUTION`, `ASSERT_FAILED_EXECUTION`, `ASSERT_NO_EXECUTION`, `ASSERT_EQUALS`, `ASSERT_NOT_EQUALS`, `ASSERT_CONTAINS`, `ASSERT_CONDITION`. |
| `condition` | string | Optional. Standard filter expression for ASSERT_CONDITION to succeed |
| `parameter` | GoogleCloudIntegrationsV1alphaEventParameter | Optional. Key-value pair for ASSERT_EQUALS, ASSERT_NOT_EQUALS, ASSERT_CONTAINS to succeed |
| `retryCount` | integer (int32) | Number of times given task should be retried in case of ASSERT_FAILED_EXECUTION |

### `GoogleCloudIntegrationsV1alphaAssertionResult`

- The result of an assertion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assertion` | GoogleCloudIntegrationsV1alphaAssertion | Assertion that was run. |
| `failureMessage` | string | Details of the assertion failure |
| `status` | string enum | Status of assertion to signify if the assertion succeeded or failed Values: `ASSERTION_STATUS_UNSPECIFIED`, `SUCCEEDED`, `FAILED`. |
| `taskName` | string | Task name of task where the assertion was run. |
| `taskNumber` | string | Task number of task where the assertion was run. |

### `GoogleCloudIntegrationsV1alphaAttemptStats`

- Status for the execution attempt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The end time of the integration execution for current attempt. |
| `startTime` | string (google-datetime) | The start time of the integration execution for current attempt. This could be in the future if it's been scheduled. |

### `GoogleCloudIntegrationsV1alphaAuthConfig`

- The AuthConfig resource use to hold channels and connection config data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateId` | string | Certificate id for client certificate |
| `createTime` | string (google-datetime) | Output only. The timestamp when the auth config is created. |
| `creatorEmail` | string | The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `credentialType` | string enum | Required. Credential type of the encrypted credential. Values: `CREDENTIAL_TYPE_UNSPECIFIED`, `USERNAME_AND_PASSWORD`, `API_KEY`, `OAUTH2_AUTHORIZATION_CODE`, `OAUTH2_IMPLICIT`, `OAUTH2_CLIENT_CREDENTIALS`, `OAUTH2_RESOURCE_OWNER_CREDENTIALS`, `JWT`, `AUTH_TOKEN`, `SERVICE_ACCOUNT`, `CLIENT_CERTIFICATE_ONLY`, `OIDC_TOKEN`. |
| `decryptedCredential` | GoogleCloudIntegrationsV1alphaCredential | Raw auth credentials. |
| `description` | string | Optional. A description of the auth config. |
| `displayName` | string | Required. The name of the auth config. |
| `encryptedCredential` | string (byte) | Auth credential encrypted by Cloud KMS. Can be decrypted as Credential with proper KMS key. |
| `expiryNotificationDuration` | array<string> | Optional. User can define the time to receive notification after which the auth config becomes invalid. Support up to 30 days. Support granularity in hours. |
| `lastModifierEmail` | string | The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `name` | string | Resource name of the auth config. For more information, see Manage authentication profiles. projects/{project}/locations/{location}/authConfigs/{authConfig}. |
| `overrideValidTime` | string (google-datetime) | Optional. User provided expiry time to override. For the example of Salesforce, username/password credentials can be valid for 6 months depending on the instance settings. |
| `reason` | string | Output only. The reason / details of the current status. |
| `state` | string enum | Output only. The status of the auth config. Values: `STATE_UNSPECIFIED`, `VALID`, `INVALID`, `SOFT_DELETED`, `EXPIRED`, `UNAUTHORIZED`, `UNSUPPORTED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the auth config is modified. |
| `validTime` | string (google-datetime) | Optional. The time until the auth config is valid. Empty or max value is considered the auth config won't expire. |
| `visibility` | string enum | Optional. The visibility of the auth config. Values: `AUTH_CONFIG_VISIBILITY_UNSPECIFIED`, `PRIVATE`, `CLIENT_VISIBLE`. |

### `GoogleCloudIntegrationsV1alphaAuthToken`

- The credentials to authenticate a user agent with a server that is put in HTTP Authorization request header.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `token` | string | The token for the auth type. |
| `type` | string | Authentication type, e.g. "Basic", "Bearer", etc. |

### `GoogleCloudIntegrationsV1alphaBooleanParameterArray`

- This message only contains a field of boolean array.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `booleanValues` | array<boolean> | Boolean array. |

### `GoogleCloudIntegrationsV1alphaCancelExecutionRequest`

- Request for cancelling an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelReason` | string | Required. Reason for cancelling the execution. This is provided by the client requesting the cancellation, and is not used by the Platform. |

### `GoogleCloudIntegrationsV1alphaCancelExecutionResponse`

- Response for cancelling an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isCanceled` | boolean | True if cancellation performed successfully. |

### `GoogleCloudIntegrationsV1alphaCertificate`

- The certificate definition
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateStatus` | string enum | Status of the certificate Values: `STATE_UNSPECIFIED`, `ACTIVE`, `EXPIRED`. |
| `credentialId` | string | Immutable. Credential id that will be used to register with trawler |
| `description` | string | Description of the certificate |
| `displayName` | string | Required. Name of the certificate |
| `name` | string | Output only. Auto generated primary key |
| `rawCertificate` | GoogleCloudIntegrationsV1alphaClientCertificate | Input only. Raw client certificate which would be registered with trawler |
| `requestorId` | string | Immutable. Requestor ID to be used to register certificate with trawler |
| `validEndTime` | string (google-datetime) | Output only. The timestamp after which certificate will expire |
| `validStartTime` | string (google-datetime) | Output only. The timestamp after which certificate will be valid |

### `GoogleCloudIntegrationsV1alphaChangeCustomerConfigRequest`

- Request for the ChangeCustomerConfig rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerConfig` | GoogleCloudIntegrationsV1alphaCustomerConfig | Optional. The customer configuration to be updated. |
| `updateMask` | string (google-fieldmask) | Required. Field mask specifying the fields in the customer config that have been modified and must be updated. If absent or empty, no fields are updated. |

### `GoogleCloudIntegrationsV1alphaChangeCustomerConfigResponse`

- Response for the ChangeCustomerConfig rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerConfig` | GoogleCloudIntegrationsV1alphaCustomerConfig | Required. The updated customer configuration. |

### `GoogleCloudIntegrationsV1alphaClientCertificate`

- Contains client certificate information
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptedPrivateKey` | string | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |
| `passphrase` | string | 'passphrase' should be left unset if private key is not encrypted. Note that 'passphrase' is not the password for web server, but an extra layer of security to protected private key. |
| `sslCertificate` | string | The ssl certificate encoded in PEM format. This string must include the begin header and end footer lines. For example, -----BEGIN CERTIFICATE----- MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1 JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE----- |

### `GoogleCloudIntegrationsV1alphaClientConfig`

- The configuration information for the Client
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingType` | string enum | Indicates the billing type of the client Values: `BILLING_TYPE_UNSPECIFIED`, `BILLING_TYPE_APIGEE_TRIALS`, `BILLING_TYPE_APIGEE_SUBSCRIPTION`, `BILLING_TYPE_PAYG`. |
| `clientState` | string enum | Indicates the activity state the client Values: `CLIENT_STATE_UNSPECIFIED`, `CLIENT_STATE_ACTIVE`, `CLIENT_STATE_DISABLED`. |
| `cloudKmsConfig` | GoogleCloudIntegrationsV1alphaCloudKmsConfig | — |
| `createTime` | string (google-datetime) | The timestamp when the client was first created. |
| `customerConfig` | GoogleCloudIntegrationsV1alphaCustomerConfig | Optional. Customer configuration information for the given client. |
| `description` | string | Description of what the client is used for |
| `enableHttpCall` | boolean | Optional. |
| `enableInternalIp` | boolean | Optional. Indicates the client enables internal IP feature, this is applicable for internal clients only. |
| `enableManagedAiFeatures` | boolean | Optional. |
| `enableVariableMasking` | boolean | Optional. |
| `id` | string | Globally unique ID (project_id + region) |
| `isGmek` | boolean | Optional. Indicates the client is provisioned with CMEK or GMEK. |
| `p4ServiceAccount` | string | The service agent associated with this client |
| `projectId` | string | The GCP project id of the client associated with |
| `region` | string | The region the client is linked to. |
| `runAsServiceAccount` | string | — |

### `GoogleCloudIntegrationsV1alphaCloudKmsConfig`

- Configuration information for Client's Cloud KMS information
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. A Cloud KMS key is a named object containing one or more key versions, along with metadata for the key. A key exists on exactly one key ring tied to a specific location. |
| `keyVersion` | string | Optional. Each version of a key contains key material used for encryption or signing. A key's version is represented by an integer, starting at 1. To decrypt data or verify a signature, you must use the same key version that was used to encrypt or sign the data. |
| `kmsLocation` | string | Required. Location name of the key ring, e.g. "us-west1". |
| `kmsProjectId` | string | Optional. The gcp project id of the project where the kms key stored. If empty, the kms key is stored at the same project as customer's project and ecrypted with CMEK, otherwise, the kms key is stored in the tenant project and encrypted with GMEK |
| `kmsRing` | string | Required. A key ring organizes keys in a specific Google Cloud location and allows you to manage access control on groups of keys. A key ring's name does not need to be unique across a Google Cloud project, but must be unique within a given location. |

### `GoogleCloudIntegrationsV1alphaCloudLoggingDetails`

- Cloud Logging details for execution info
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLoggingSeverity` | string enum | Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed. Values: `CLOUD_LOGGING_SEVERITY_UNSPECIFIED`, `INFO`, `ERROR`, `WARNING`. |
| `enableCloudLogging` | boolean | Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed. |

### `GoogleCloudIntegrationsV1alphaCloudSchedulerConfig`

- Cloud Scheduler Trigger configuration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cronTab` | string | Required. The cron tab of cloud scheduler trigger. |
| `errorMessage` | string | Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations |
| `location` | string | Required. The location where associated cloud scheduler job will be created |
| `serviceAccountEmail` | string | Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time |

### `GoogleCloudIntegrationsV1alphaConditionalFailurePolicies`

- Conditional task failur retry strategies
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultFailurePolicy` | GoogleCloudIntegrationsV1alphaFailurePolicy | The default failure policy to be applied if no conditional failure policy matches. |
| `failurePolicies` | array<GoogleCloudIntegrationsV1alphaFailurePolicy> | The list of failure policies that will be applied to the task in order. |

### `GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata`

- Metadata of runtime connection schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | List of actions. |
| `entities` | array<string> | List of entity names. |

### `GoogleCloudIntegrationsV1alphaCoordinate`

- Configuration detail of coordinate, it used for UI
- Version: v1

| Field | Type | Description |
|---|---|---|
| `x` | integer (int32) | Required. X axis of the coordinate |
| `y` | integer (int32) | Required. Y axis of the coordinate |

### `GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest`

- Request for CreateAppsScriptProject rpc call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appsScriptProject` | string | The name of the Apps Script project to be created. |
| `authConfigId` | string | The auth config id necessary to fetch the necessary credentials to create the project for external clients |

### `GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse`

- Response for CreateAppsScriptProject rpc call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | The created AppsScriptProject ID. |

### `GoogleCloudIntegrationsV1alphaCreateCloudFunctionRequest`

- Request for Creating Cloud Function rpc call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `functionName` | string | The function name of CF to be created |
| `functionRegion` | string | The function region of CF to be created |
| `gcfApiVersion` | string enum | Optional. The api version of CF to be created Values: `GCF_API_VERSION_UNSPECIFIED`, `API_VERSION_V1`, `API_VERSION_V2`. |
| `projectId` | string | Indicates the id of the GCP project that the function will be created in. |

### `GoogleCloudIntegrationsV1alphaCreateCloudFunctionResponse`

- Response for Creating Cloud Function rpc call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `triggerUrl` | string | The trigger url that will be returned |

### `GoogleCloudIntegrationsV1alphaCredential`

- Defines parameters for a single, canonical credential.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authToken` | GoogleCloudIntegrationsV1alphaAuthToken | Auth token credential |
| `credentialType` | string enum | Credential type associated with auth config. Values: `CREDENTIAL_TYPE_UNSPECIFIED`, `USERNAME_AND_PASSWORD`, `API_KEY`, `OAUTH2_AUTHORIZATION_CODE`, `OAUTH2_IMPLICIT`, `OAUTH2_CLIENT_CREDENTIALS`, `OAUTH2_RESOURCE_OWNER_CREDENTIALS`, `JWT`, `AUTH_TOKEN`, `SERVICE_ACCOUNT`, `CLIENT_CERTIFICATE_ONLY`, `OIDC_TOKEN`. |
| `jwt` | GoogleCloudIntegrationsV1alphaJwt | JWT credential |
| `oauth2AuthorizationCode` | GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode | The api_key and oauth2_implicit are not covered in v1 and will be picked up once v1 is implemented. ApiKey api_key = 3; OAuth2 authorization code credential |
| `oauth2ClientCredentials` | GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials | OAuth2Implicit oauth2_implicit = 5; OAuth2 client credentials |
| `oauth2ResourceOwnerCredentials` | GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials | OAuth2 resource owner credentials |
| `oidcToken` | GoogleCloudIntegrationsV1alphaOidcToken | Google OIDC ID Token |
| `serviceAccountCredentials` | GoogleCloudIntegrationsV1alphaServiceAccountCredentials | Service account credential |
| `usernameAndPassword` | GoogleCloudIntegrationsV1alphaUsernameAndPassword | Username and password credential |

### `GoogleCloudIntegrationsV1alphaCustomerConfig`

- Customer configuration information for the given client
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudKmsConfig` | GoogleCloudIntegrationsV1alphaCloudKmsConfig | Optional. Cloud KMS config for Auth Module to encrypt/decrypt credentials. |
| `enableEucHardenedFlow` | boolean | Optional. True if every integration in this region should run under the hardened end-user-credential flow. See (internal link). |
| `enableHttpCall` | boolean | Optional. Indicates if the client should be allowed to make HTTP calls. True if http call feature should be turned on for this region. |
| `enableManagedAiFeatures` | boolean | Optional. Indicates if the client should be allowed to use managed AI features, i.e. using Cloud Companion APIs of the tenant project. This will allow the customers to use features like Troubleshooting, OpenAPI spec enrichment, etc. for free. |
| `enableVariableMasking` | boolean | Optional. True if variable masking feature should be turned on for this region. |
| `runAsServiceAccount` | string | Optional. Run-as service account to be updated for the provisioned client. |

### `GoogleCloudIntegrationsV1alphaDeprovisionClientRequest`

- Request for the Deprovision rpc
- Version: v1

### `GoogleCloudIntegrationsV1alphaDoubleParameterArray`

- This message only contains a field of double number array.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `doubleValues` | array<number> | Double number array. |

### `GoogleCloudIntegrationsV1alphaDownloadExecutionResponse`

- Response for downloading an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | The content of downloaded execution. |

### `GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse`

- Response for DownloadIntegrationVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | String representation of the requested file. |
| `files` | array<GoogleCloudIntegrationsV1alphaSerializedFile> | List containing String representation for multiple file with type. |

### `GoogleCloudIntegrationsV1alphaDownloadJsonPackageResponse`

- Response for DownloadJsonPackage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `files` | array<GoogleCloudIntegrationsV1alphaFile> | List containing JSON for multiple file with type information. |

### `GoogleCloudIntegrationsV1alphaDownloadTemplateResponse`

- Response for DownloadTemplate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | String representation of the template. |

### `GoogleCloudIntegrationsV1alphaDownloadTestCaseResponse`

- Response for DownloadTestCase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | String representation of the test case. |

### `GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse`

- Response containing all provisioned regions for Connector Platform.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `regions` | array<string> | All regions where Connector Platform is provisioned. |

### `GoogleCloudIntegrationsV1alphaErrorCatcherConfig`

- Configuration detail of a error catch task
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. User-provided description intended to give more business context about the error catcher config. |
| `errorCatcherId` | string | Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow |
| `errorCatcherNumber` | string | Required. A number to uniquely identify each error catcher config within the workflow on UI. |
| `label` | string | Optional. The user created label for a particular error catcher. Optional. |
| `position` | GoogleCloudIntegrationsV1alphaCoordinate | Optional. Informs the front-end application where to draw this error catcher config on the UI. |
| `startErrorTasks` | array<GoogleCloudIntegrationsV1alphaNextTask> | Required. The set of start tasks that are to be executed for the error catch flow |

### `GoogleCloudIntegrationsV1alphaEventParameter`

- This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Next available id: 4
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. |
| `masked` | boolean | True if this parameter should be masked in the logs |
| `value` | GoogleCloudIntegrationsV1alphaValueType | Values for the defined keys. Each value can either be string, int, double or any proto message. |

### `GoogleCloudIntegrationsV1alphaExecuteEventResponse`

- The response for executing an integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionId` | string | The id of the execution corresponding to this run of integration. |

### `GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest`

- The request for executing an integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `doNotPropagateError` | boolean | Optional. Flag to determine how to should propagate errors. If this flag is set to be true, it will not throw an exception. Instead, it will return a {@link ExecuteIntegrationsResponse} with an execution id and error messages as PostWithTriggerIdExecutionException in {@link EventParameters}. The flag is set to be false by default. |
| `executionId` | string | Optional. The id of the ON_HOLD execution to be resumed. |
| `inputParameters` | object | Optional. Input parameters used by integration execution. |
| `parameterEntries` | array<EnterpriseCrmFrontendsEventbusProtoParameterEntry> | Optional. Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. |
| `parameters` | EnterpriseCrmFrontendsEventbusProtoEventParameters | Optional. Passed in as parameters to each integration execution. Redacted |
| `requestId` | string | Optional. This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. |
| `triggerId` | string | Required. Matched against all {@link TriggerConfig}s across all integrations. i.e. TriggerConfig.trigger_id.equals(trigger_id). The trigger_id is in the format of `api_trigger/TRIGGER_NAME`. |

### `GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse`

- The response for executing an integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventParameters` | EnterpriseCrmFrontendsEventbusProtoEventParameters | Details for the integration that were executed. |
| `executionFailed` | boolean | Is true if any execution in the integration failed. False otherwise. |
| `executionId` | string | The id of the execution corresponding to this run of integration. |
| `outputParameters` | object | OUTPUT parameters in format of Map. Where Key is the name of the parameter. Note: Name of the system generated parameters are wrapped by backtick(\`) to distinguish them from the user defined parameters. |
| `parameterEntries` | array<EnterpriseCrmFrontendsEventbusProtoParameterEntry> | Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. |
| `parameters` | object | Optional. OUTPUT parameters from integration execution. |

### `GoogleCloudIntegrationsV1alphaExecuteTestCaseRequest`

- The request for executing a functional test.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputParameters` | object | Optional. Input parameters used by test case execution. |

### `GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse`

- The response for executing a functional test.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assertionResults` | array<GoogleCloudIntegrationsV1alphaAssertionResult> | Results of each assertions ran during execution of test case. |
| `executionId` | string | The id of the execution corresponding to this run of integration. |
| `outputParameters` | object | OUTPUT parameters in format of Map. Where Key is the name of the parameter. Note: Name of the system generated parameters are wrapped by backtick(\`) to distinguish them from the user defined parameters. |
| `testExecutionState` | string enum | State of the test case execution Values: `STATE_UNSPECIFIED`, `PASSED`, `FAILED`. |

### `GoogleCloudIntegrationsV1alphaExecuteTestCasesRequest`

- Request for ExecuteTestCases.
- Version: v1

### `GoogleCloudIntegrationsV1alphaExecuteTestCasesResponse`

- Response for ExecuteTestCases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executeTestCaseResponses` | array<GoogleCloudIntegrationsV1alphaExecuteTestCaseResponse> | Results of each execution of test cases in an integration version. |

### `GoogleCloudIntegrationsV1alphaExecution`

- The Execution resource contains detailed information of an individual integration execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudKmsKey` | string | Optional. Cloud KMS resource name for the CMEK encryption key. |
| `cloudLoggingDetails` | GoogleCloudIntegrationsV1alphaCloudLoggingDetails | Cloud Logging details for the integration version |
| `createTime` | string (google-datetime) | Output only. Created time of the execution. |
| `directSubExecutions` | array<GoogleCloudIntegrationsV1alphaExecution> | Direct sub executions of the following Execution. |
| `eventExecutionDetails` | EnterpriseCrmEventbusProtoEventExecutionDetails | The execution info about this event. |
| `executionDetails` | GoogleCloudIntegrationsV1alphaExecutionDetails | Detailed info of this execution. |
| `executionMethod` | string enum | The ways user posts this event. Values: `EXECUTION_METHOD_UNSPECIFIED`, `POST`, `POST_TO_QUEUE`, `SCHEDULE`. |
| `integrationVersionState` | string enum | Output only. State of the integration version Values: `INTEGRATION_STATE_UNSPECIFIED`, `DRAFT`, `ACTIVE`, `ARCHIVED`, `SNAPSHOT`. |
| `name` | string | Auto-generated primary key. |
| `replayInfo` | GoogleCloudIntegrationsV1alphaExecutionReplayInfo | Output only. Replay info for the execution |
| `requestParameters` | object | Event parameters come in as part of the request. |
| `requestParams` | array<EnterpriseCrmFrontendsEventbusProtoParameterEntry> | Event parameters come in as part of the request. |
| `responseParameters` | object | Event parameters returned as part of the response. In the case of error, the `ErrorInfo` field is returned in the following format: { "ErrorInfo": { "message": String, "code": Number } } |
| `responseParams` | array<EnterpriseCrmFrontendsEventbusProtoParameterEntry> | — |
| `snapshotNumber` | string (int64) | Output only. An increasing sequence that is set when a new snapshot is created |
| `triggerId` | string | The trigger id of the integration trigger config. If both trigger_id and client_id is present, the integration is executed from the start tasks provided by the matching trigger config otherwise it is executed from the default start tasks. |
| `updateTime` | string (google-datetime) | Output only. Last modified time of the execution. |

### `GoogleCloudIntegrationsV1alphaExecutionDetails`

- Contains the details of the execution info: this includes the tasks execution details plus the event execution statistics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attemptStats` | array<GoogleCloudIntegrationsV1alphaAttemptStats> | List of Start and end time of the execution attempts. |
| `eventExecutionSnapshotsSize` | string (int64) | Total size of all event_execution_snapshots for an execution |
| `executionSnapshots` | array<GoogleCloudIntegrationsV1alphaExecutionSnapshot> | List of snapshots taken during the execution. |
| `state` | string enum | Status of the execution. Values: `STATE_UNSPECIFIED`, `PENDING`, `PROCESSING`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `RETRY_ON_HOLD`, `SUSPENDED`. |

### `GoogleCloudIntegrationsV1alphaExecutionReplayInfo`

- Contains the details of the execution info: this includes the replay reason and replay tree connecting executions in a parent-child relationship
- Version: v1

| Field | Type | Description |
|---|---|---|
| `originalExecutionInfoId` | string | If this execution is a replay of another execution, then this field contains the original execution id. |
| `replayMode` | string enum | Replay mode for the execution Values: `REPLAY_MODE_UNSPECIFIED`, `REPLAY_MODE_FROM_BEGINNING`, `REPLAY_MODE_POINT_OF_FAILURE`. |
| `replayReason` | string | reason for replay |
| `replayedExecutionInfoIds` | array<string> | If this execution has been replayed, then this field contains the execution ids of the replayed executions. |

### `GoogleCloudIntegrationsV1alphaExecutionSnapshot`

- Contains the snapshot of the execution for a given checkpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkpointTaskNumber` | string | Indicates "after which checkpoint task's execution" this snapshot is taken. |
| `executionSnapshotMetadata` | GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata | Metadata of the execution snapshot. |
| `params` | object | Parameters used during the execution. |
| `taskExecutionDetails` | array<GoogleCloudIntegrationsV1alphaTaskExecutionDetails> | All of the task execution details at the given point of time. |

### `GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata`

- Metadata of the execution snapshot.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestorIterationNumbers` | array<string> | Ancestor iteration number for the task(it will only be non-empty if the task is under 'private workflow') |
| `ancestorTaskNumbers` | array<string> | Ancestor task number for the task(it will only be non-empty if the task is under 'private workflow') |
| `executionAttempt` | integer (int32) | the execution attempt number this snapshot belongs to. |
| `integrationName` | string | The direct integration which the event execution snapshots belongs to |
| `task` | string | the task name associated with this snapshot. |
| `taskAttempt` | integer (int32) | the task attempt number this snapshot belongs to. |
| `taskLabel` | string | the task label associated with this snapshot. Could be empty. |
| `taskNumber` | string | The task number associated with this snapshot. |

### `GoogleCloudIntegrationsV1alphaFailurePolicy`

- Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | string | Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy. |
| `intervalTime` | string (google-datetime) | Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff. |
| `maxRetries` | integer (int32) | Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed. |
| `retryStrategy` | string enum | Defines what happens to the task upon failure. Values: `RETRY_STRATEGY_UNSPECIFIED`, `IGNORE`, `NONE`, `FATAL`, `FIXED_INTERVAL`, `LINEAR_BACKOFF`, `EXPONENTIAL_BACKOFF`, `RESTART_INTEGRATION_WITH_BACKOFF`. |

### `GoogleCloudIntegrationsV1alphaFile`

- To store Integration version related file i.e. Integration Version, Config variable etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationConfig` | object | Integration version config file |
| `integrationVersion` | GoogleCloudIntegrationsV1alphaIntegrationVersion | Integration version |
| `type` | string enum | File information like Integration version, Integration Config variables etc. Values: `INTEGRATION_FILE_UNSPECIFIED`, `INTEGRATION`, `INTEGRATION_CONFIG_VARIABLES`. |

### `GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecRequest`

- Request for GenerateOpenApiSpec.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiTriggerResources` | array<GoogleCloudIntegrationsV1alphaApiTriggerResource> | Required. List of api triggers |
| `fileFormat` | string enum | Required. File format for generated spec. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |

### `GoogleCloudIntegrationsV1alphaGenerateOpenApiSpecResponse`

- Response of the GenerateOpenApiSpec API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `openApiSpec` | string | Open API spec as per the required format |

### `GoogleCloudIntegrationsV1alphaGenerateTokenResponse`

- Returns success or error message
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | The message that notifies the user if the request succeeded or not. |

### `GoogleCloudIntegrationsV1alphaGetClientMetadataResponse`

- Response for the GetClientMetadata rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `properties` | GoogleCloudIntegrationsV1alphaProjectProperties | Required. Required: The client configuration that was requested |

### `GoogleCloudIntegrationsV1alphaGetClientResponse`

- Response for the GetClient rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `client` | GoogleCloudIntegrationsV1alphaClientConfig | Required. Required: The client configuration that was requested |

### `GoogleCloudIntegrationsV1alphaImportTemplateRequest`

- Request to Import template
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integration` | string | Required. Resource Name of the integration where template needs to be imported/inserted. |
| `subIntegrations` | object | Optional. Sub Integration which would be created via templates. |

### `GoogleCloudIntegrationsV1alphaImportTemplateResponse`

- Response for import template
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationVersion` | GoogleCloudIntegrationsV1alphaIntegrationVersion | IntegrationVersion after the import. |
| `subIntegrationVersions` | array<GoogleCloudIntegrationsV1alphaIntegrationVersion> | Sub integration versions which are imported. |

### `GoogleCloudIntegrationsV1alphaIntParameterArray`

- This message only contains a field of integer array.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `intValues` | array<string> | Integer array. |

### `GoogleCloudIntegrationsV1alphaIntegration`

- The integration definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `active` | boolean | Required. If any integration version is published. |
| `createTime` | string (google-datetime) | Required. Output only. Auto-generated. |
| `creatorEmail` | string | Output only. The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `description` | string | Optional. |
| `lastModifierEmail` | string | Required. The last modifier of this integration |
| `name` | string | Required. The resource name of the integration. |
| `updateTime` | string (google-datetime) | Output only. Auto-generated. |

### `GoogleCloudIntegrationsV1alphaIntegrationAlertConfig`

- Message to be used to configure custom alerting in the {@code EventConfig} protos for an event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationPeriod` | string | The period over which the metric value should be aggregated and evaluated. Format is , where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours. |
| `alertThreshold` | integer (int32) | For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired. |
| `disableAlert` | boolean | Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert. |
| `displayName` | string | Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration. |
| `durationThreshold` | string (google-duration) | Should be specified only for \*AVERAGE_DURATION and \*PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger. |
| `metricType` | string enum | The type of metric. Values: `METRIC_TYPE_UNSPECIFIED`, `EVENT_ERROR_RATE`, `EVENT_WARNING_RATE`, `TASK_ERROR_RATE`, `TASK_WARNING_RATE`, `TASK_RATE`, `EVENT_RATE`, `EVENT_AVERAGE_DURATION`, `EVENT_PERCENTILE_DURATION`, `TASK_AVERAGE_DURATION`, `TASK_PERCENTILE_DURATION`. |
| `onlyFinalAttempt` | boolean | For either events or tasks, depending on the type of alert, count only final attempts, not retries. |
| `thresholdType` | string enum | The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired. Values: `THRESHOLD_TYPE_UNSPECIFIED`, `EXPECTED_MIN`, `EXPECTED_MAX`. |
| `thresholdValue` | GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue | The metric value, above or below which the alert should be triggered. |

### `GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue`

- The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the \*RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For \*PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For \*AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `absolute` | string (int64) | Absolute value threshold. |
| `percentage` | integer (int32) | Percentage threshold. |

### `GoogleCloudIntegrationsV1alphaIntegrationConfigParameter`

- Integration Config Parameter is defined in the integration config and are used to provide external configuration for integration. It provide information about data types of the expected parameters and provide any default values or value. They can also be used to add custom attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameter` | GoogleCloudIntegrationsV1alphaIntegrationParameter | Optional. Integration Parameter to provide the default value, data type and attributes required for the Integration config variables. |
| `value` | GoogleCloudIntegrationsV1alphaValueType | Values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. |

### `GoogleCloudIntegrationsV1alphaIntegrationParameter`

- Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containsLargeData` | boolean | Indicates whether this variable contains large data and need to be uploaded to Cloud Storage. |
| `dataType` | string enum | Type of the parameter. Values: `INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `BOOLEAN_ARRAY`, `JSON_VALUE`, `PROTO_VALUE`, `PROTO_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `PROTO_ENUM`, `SERIALIZED_OBJECT_VALUE`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`. |
| `defaultValue` | GoogleCloudIntegrationsV1alphaValueType | Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. |
| `description` | string | Optional. Description of the parameter. |
| `displayName` | string | The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName". |
| `inputOutputType` | string enum | Specifies the input/output type for the parameter. Values: `IN_OUT_TYPE_UNSPECIFIED`, `IN`, `OUT`, `IN_OUT`. |
| `isTransient` | boolean | Whether this parameter is a transient parameter. |
| `jsonSchema` | string | This schema will be used to validate runtime JSON-typed values of this parameter. |
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. |
| `masked` | boolean | True if this parameter should be masked in the logs |
| `producer` | string | The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param. |
| `searchable` | boolean | Searchable in the execution log or not. |

### `GoogleCloudIntegrationsV1alphaIntegrationVersion`

- The integration version definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudKmsKey` | string | Optional. Cloud KMS resource name for the CMEK encryption key. |
| `cloudLoggingDetails` | GoogleCloudIntegrationsV1alphaCloudLoggingDetails | Optional. Cloud Logging details for the integration version |
| `createTime` | string (google-datetime) | Output only. Auto-generated. |
| `createdFromTemplate` | string | Optional. Optional. The resource name of the template from which the integration is created. |
| `databasePersistencePolicy` | string enum | Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index. Values: `DATABASE_PERSISTENCE_POLICY_UNSPECIFIED`, `DATABASE_PERSISTENCE_DISABLED`, `DATABASE_PERSISTENCE_ASYNC`. |
| `description` | string | Optional. The integration description. |
| `enableVariableMasking` | boolean | Optional. True if variable masking feature should be turned on for this version |
| `errorCatcherConfigs` | array<GoogleCloudIntegrationsV1alphaErrorCatcherConfig> | Optional. Error Catch Task configuration for the integration. It's optional. |
| `eucHardeningDisposition` | string enum | Output only. The EUC hardening disposition of this version. Set by the service when the integration is first created and inherited unchanged by every later version, so all versions of an integration report the same value. Values: `EUC_HARDENING_DISPOSITION_UNSPECIFIED`, `LEGACY`, `HARDENED`. |
| `integrationConfigParameters` | array<GoogleCloudIntegrationsV1alphaIntegrationConfigParameter> | Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter. |
| `integrationParameters` | array<GoogleCloudIntegrationsV1alphaIntegrationParameter> | Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter. |
| `integrationParametersInternal` | EnterpriseCrmFrontendsEventbusProtoWorkflowParameters | Optional. Deprecated: Use `integration_parameters` instead. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter. |
| `lastModifierEmail` | string | Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `lockHolder` | string | Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `name` | string | Output only. Auto-generated primary key. |
| `origin` | string enum | Optional. The origin that indicates where this integration is coming from. Values: `UNSPECIFIED`, `UI`, `PIPER_V2`, `PIPER_V3`, `APPLICATION_IP_PROVISIONING`, `TEST_CASE`. |
| `parentTemplateId` | string | Optional. The id of the template which was used to create this integration_version. |
| `runAsServiceAccount` | string | Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task. |
| `snapshotNumber` | string (int64) | Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by \[workflow_name, org_id latest(snapshot_number)\]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head. |
| `state` | string enum | Output only. User should not set it as an input. Values: `INTEGRATION_STATE_UNSPECIFIED`, `DRAFT`, `ACTIVE`, `ARCHIVED`, `SNAPSHOT`. |
| `status` | string enum | Output only. Generated by eventbus. User should not set it as an input. Values: `UNKNOWN`, `DRAFT`, `ACTIVE`, `ARCHIVED`, `SNAPSHOT`. |
| `taskConfigs` | array<GoogleCloudIntegrationsV1alphaTaskConfig> | Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs. |
| `taskConfigsInternal` | array<EnterpriseCrmFrontendsEventbusProtoTaskConfig> | Optional. Deprecated: Use `task_configs` instead. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs. |
| `teardown` | EnterpriseCrmEventbusProtoTeardown | Optional. Contains a graph of tasks that will be executed before putting the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of success or failure, similar to "finally" in code. |
| `triggerConfigs` | array<GoogleCloudIntegrationsV1alphaTriggerConfig> | Optional. Trigger configurations. |
| `triggerConfigsInternal` | array<EnterpriseCrmFrontendsEventbusProtoTriggerConfig> | Optional. Deprecated: Use `trigger_configs` instead. Trigger configurations. |
| `updateTime` | string (google-datetime) | Output only. Auto-generated. |
| `userLabel` | string | Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created. |

### `GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate`

- Define the template of IntegrationVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationVersion` | GoogleCloudIntegrationsV1alphaIntegrationVersion | Required. Templatized version of integration. |
| `key` | string | Required. Unique Key of the IntegrationVersion. |

### `GoogleCloudIntegrationsV1alphaJwt`

- Represents JSON web token(JWT), which is a compact, URL-safe means of representing claims to be transferred between two parties, enabling the claims to be digitally signed or integrity protected.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jwt` | string | The token calculated by the header, payload and signature. |
| `jwtHeader` | string | Identifies which algorithm is used to generate the signature. |
| `jwtPayload` | string | Contains a set of claims. The JWT specification defines seven Registered Claim Names which are the standard fields commonly included in tokens. Custom claims are usually also included, depending on the purpose of the token. |
| `secret` | string | User's pre-shared secret to sign the token. |

### `GoogleCloudIntegrationsV1alphaLiftSuspensionRequest`

- Request for lift Suspension
- Version: v1

| Field | Type | Description |
|---|---|---|
| `suspensionResult` | string | User passed in suspension result and will be used to control workflow execution branching behavior by setting up corresponnding edge condition with suspension result. For example, if you want to lift the suspension, you can pass "Approved", or if you want to reject the suspension and terminate workfloe execution, you can pass "Rejected" and terminate the workflow execution with configuring the edge condition. |

### `GoogleCloudIntegrationsV1alphaLiftSuspensionResponse`

- Response of lift Suspense
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventExecutionInfoId` | string | Execution Id that will be returned |

### `GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest`

- Request for LinkAppsScriptProject rpc call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scriptId` | string | The id of the Apps Script project to be linked. |

### `GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse`

- Response for LinkAppsScriptProject rpc call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scriptId` | string | The id of the linked Apps Script project. |

### `GoogleCloudIntegrationsV1alphaListAuthConfigsResponse`

- Response to list AuthConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authConfigs` | array<GoogleCloudIntegrationsV1alphaAuthConfig> | The list of AuthConfigs retrieved. |
| `nextPageToken` | string | The token used to retrieve the next page of results. |

### `GoogleCloudIntegrationsV1alphaListCertificatesResponse`

- Response to list Certificates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificates` | array<GoogleCloudIntegrationsV1alphaCertificate> | The list of Certificates retrieved. |
| `nextPageToken` | string | The token used to retrieve the next page of results. |

### `GoogleCloudIntegrationsV1alphaListConnectionsResponse`

- Response containing Connections listed by region.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connections` | array<GoogleCloudConnectorsV1Connection> | Connections. |
| `nextPageToken` | string | Next page token. |

### `GoogleCloudIntegrationsV1alphaListExecutionsResponse`

- Response for listing the integration execution data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionInfos` | array<EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo> | Required. The detailed information of requested executions. |
| `executions` | array<GoogleCloudIntegrationsV1alphaExecution> | The detailed information of requested executions |
| `nextPageToken` | string | The token used to retrieve the next page results. |

### `GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse`

- Response for ListIntegrationVersions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationVersions` | array<GoogleCloudIntegrationsV1alphaIntegrationVersion> | The integrations which match the request. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `noPermission` | boolean | Whether the user has no permission on the version or not. |

### `GoogleCloudIntegrationsV1alphaListIntegrationsResponse`

- Response for ListIntegrations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrations` | array<GoogleCloudIntegrationsV1alphaIntegration> | The integrations which match the request. |
| `nextPageToken` | string | The next page token for the response. |

### `GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse`

- Response for listing RuntimeActionSchemas for a specific Connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `runtimeActionSchemas` | array<GoogleCloudIntegrationsV1alphaRuntimeActionSchema> | Runtime action schemas. |

### `GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse`

- Response for listing RuntimeEntitySchemas for a specific Connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `runtimeEntitySchemas` | array<GoogleCloudIntegrationsV1alphaRuntimeEntitySchema> | Runtime entity schemas. |

### `GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse`

- Response to list SfdcChannels.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token used to retrieve the next page of results. |
| `sfdcChannels` | array<GoogleCloudIntegrationsV1alphaSfdcChannel> | The list of SfdcChannels retrieved. |

### `GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse`

- Response to list SfdcInstances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token used to retrieve the next page of results. |
| `sfdcInstances` | array<GoogleCloudIntegrationsV1alphaSfdcInstance> | The list of SfdcInstances retrieved. |

### `GoogleCloudIntegrationsV1alphaListSuspensionsResponse`

- Response for Suspensions.ListSuspensions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results. |
| `suspensions` | array<GoogleCloudIntegrationsV1alphaSuspension> | The suspensions for the relevant execution which the caller has permissions to view and resolve. |

### `GoogleCloudIntegrationsV1alphaListTemplatesResponse`

- Response for a request to list templates
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token used to retrieve the next page results. |
| `templates` | array<GoogleCloudIntegrationsV1alphaTemplate> | List of templates retrieved. |

### `GoogleCloudIntegrationsV1alphaListTestCasesResponse`

- Response for ListTestCases
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `testCases` | array<GoogleCloudIntegrationsV1alphaTestCase> | The test cases corresponding to the specified filter |

### `GoogleCloudIntegrationsV1alphaMockConfig`

- The configuration for mocking of a task during test execution Next available id: 4
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failedExecutions` | string (int64) | Optional. Number of times the given task should fail for failure mock strategy |
| `mockStrategy` | string enum | Mockstrategy defines how the particular task should be mocked during test execution Values: `MOCK_STRATEGY_UNSPECIFIED`, `NO_MOCK_STRATEGY`, `SPECIFIC_MOCK_STRATEGY`, `FAILURE_MOCK_STRATEGY`, `SKIP_MOCK_STRATEGY`. |
| `parameters` | array<GoogleCloudIntegrationsV1alphaEventParameter> | Optional. List of key-value pairs for specific mock strategy |

### `GoogleCloudIntegrationsV1alphaNextTask`

- The task that is next in line to be executed, if the condition specified evaluated to true.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | string | Standard filter expression for this task to become an eligible next task. |
| `description` | string | User-provided description intended to give additional business context about the task. |
| `displayName` | string | User-provided label that is attached to this edge in the UI. |
| `taskConfigId` | string | ID of the next task. |
| `taskId` | string | Task number of the next task. |

### `GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode`

- The OAuth Type where the client sends request with the client id and requested scopes to auth endpoint. User sees a consent screen and auth code is received at specified redirect url afterwards. The auth code is then combined with the client id and secret and sent to the token endpoint in exchange for the access and refresh token. The refresh token can be used to fetch new access tokens.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | GoogleCloudIntegrationsV1alphaAccessToken | The access token received from the token endpoint. |
| `applyReauthPolicy` | boolean | Indicates if the user has opted in Google Reauth Policy. If opted in, the refresh token will be valid for 20 hours, after which time users must re-authenticate in order to obtain a new one. |
| `authCode` | string | The Auth Code that is used to initially retrieve the access token. |
| `authEndpoint` | string | The auth url endpoint to send the auth code request to. |
| `authParams` | GoogleCloudIntegrationsV1alphaParameterMap | The auth parameters sent along with the auth code request. |
| `clientId` | string | The client's id. |
| `clientSecret` | string | The client's secret. |
| `requestType` | string enum | Represent how to pass parameters to fetch access token Values: `REQUEST_TYPE_UNSPECIFIED`, `REQUEST_BODY`, `QUERY_PARAMETERS`, `ENCODED_HEADER`. |
| `scope` | string | A space-delimited list of requested scope permissions. |
| `tokenEndpoint` | string | The token url endpoint to send the token request to. |
| `tokenParams` | GoogleCloudIntegrationsV1alphaParameterMap | The token parameters sent along with the token request. |

### `GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials`

- For client credentials grant, the client sends a POST request with grant_type as 'client_credentials' to the authorization server. The authorization server will respond with a JSON object containing the access token.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | GoogleCloudIntegrationsV1alphaAccessToken | Access token fetched from the authorization server. |
| `clientId` | string | The client's ID. |
| `clientSecret` | string | The client's secret. |
| `requestType` | string enum | Represent how to pass parameters to fetch access token Values: `REQUEST_TYPE_UNSPECIFIED`, `REQUEST_BODY`, `QUERY_PARAMETERS`, `ENCODED_HEADER`. |
| `scope` | string | A space-delimited list of requested scope permissions. |
| `tokenEndpoint` | string | The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token. |
| `tokenParams` | GoogleCloudIntegrationsV1alphaParameterMap | Token parameters for the auth request. |

### `GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials`

- For resource owner credentials grant, the client will ask the user for their authorization credentials (ususally a username and password) and send a POST request to the authorization server. The authorization server will respond with a JSON object containing the access token.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | GoogleCloudIntegrationsV1alphaAccessToken | Access token fetched from the authorization server. |
| `clientId` | string | The client's ID. |
| `clientSecret` | string | The client's secret. |
| `password` | string | The user's password. |
| `requestType` | string enum | Represent how to pass parameters to fetch access token Values: `REQUEST_TYPE_UNSPECIFIED`, `REQUEST_BODY`, `QUERY_PARAMETERS`, `ENCODED_HEADER`. |
| `scope` | string | A space-delimited list of requested scope permissions. |
| `tokenEndpoint` | string | The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token. |
| `tokenParams` | GoogleCloudIntegrationsV1alphaParameterMap | Token parameters for the auth request. |
| `username` | string | The user's username. |

### `GoogleCloudIntegrationsV1alphaOidcToken`

- OIDC Token
- Version: v1

| Field | Type | Description |
|---|---|---|
| `audience` | string | Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. |
| `serviceAccountEmail` | string | The service account email to be used as the identity for the token. |
| `token` | string | ID token obtained for the service account |
| `tokenExpireTime` | string (google-datetime) | The approximate time until the token retrieved is valid. |

### `GoogleCloudIntegrationsV1alphaParameterMap`

- A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entries` | array<GoogleCloudIntegrationsV1alphaParameterMapEntry> | A list of parameter map entries. |
| `keyType` | string enum | Option to specify key type for all entries of the map. If provided then field types for all entries must conform to this. Values: `INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `BOOLEAN_ARRAY`, `JSON_VALUE`, `PROTO_VALUE`, `PROTO_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `PROTO_ENUM`, `SERIALIZED_OBJECT_VALUE`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`. |
| `valueType` | string enum | Option to specify value type for all entries of the map. If provided then field types for all entries must conform to this. Values: `INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `BOOLEAN_ARRAY`, `JSON_VALUE`, `PROTO_VALUE`, `PROTO_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `PROTO_ENUM`, `SERIALIZED_OBJECT_VALUE`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`. |

### `GoogleCloudIntegrationsV1alphaParameterMapEntry`

- Entry is a pair of key and value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | GoogleCloudIntegrationsV1alphaParameterMapField | Key of the map entry. |
| `value` | GoogleCloudIntegrationsV1alphaParameterMapField | Value of the map entry. |

### `GoogleCloudIntegrationsV1alphaParameterMapField`

- Field represents either the key or value in an entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `literalValue` | GoogleCloudIntegrationsV1alphaValueType | Passing a literal value. |
| `referenceKey` | string | Referencing one of the Integration variables. |

### `GoogleCloudIntegrationsV1alphaProjectProperties`

- Metadata information for the given project
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingType` | string enum | Required. Required: The client billing type that was requested Values: `BILLING_TYPE_UNSPECIFIED`, `APIGEE_TRIALS`, `APIGEE_SUBSCRIPTION`, `PAYG`, `SUBSCRIPTION`, `NO_BILLING`. |
| `ipEnablementState` | string enum | An enum value of what the enablement state is for the given project Values: `IP_ENABLEMENT_STATE_UNSPECIFIED`, `IP_ENABLEMENT_STATE_STANDALONE`, `IP_ENABLEMENT_STATE_APIGEE`, `IP_ENABLEMENT_STATE_APIGEE_ENTITLED`. |
| `provisionedRegions` | array<string> | A list of provisioned regions on the current project |

### `GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorRequest`

- Request for PostProvisioning rpc call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `workflows` | array<string> | Optional. Indicate which workflows to create Values: `SAMPLE_INTEGRATIONS_UNSPECIFIED`, `SAMPLE_WORKFLOW_ECOM_PROCESSING`, `EXECUTE_CONNECTOR_TOOL_WORKFLOW`. |

### `GoogleCloudIntegrationsV1alphaProvisionClientPostProcessorResponse`

- Response for PostProvisioning rpc call.
- Version: v1

### `GoogleCloudIntegrationsV1alphaProvisionClientRequest`

- Request for the Provision rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudKmsConfig` | GoogleCloudIntegrationsV1alphaCloudKmsConfig | Optional. OPTIONAL: Cloud KMS config for AuthModule to encrypt/decrypt credentials. |
| `createSampleWorkflows` | boolean | Optional. Indicates if sample workflow should be created along with provisioning |
| `enableHttpCall` | boolean | Optional. Indicates if the client should be allowed to make HTTP calls. |
| `enableManagedAiFeatures` | boolean | Optional. Indicates if the client should be allowed to use managed AI features, i.e. using Cloud Companion APIs of the tenant project. This will allow the customers to use features like Troubleshooting, OpenAPI spec enrichment, etc. for free. |
| `provisionGmek` | boolean | Optional. Deprecated. Indicates provision with GMEK or CMEK. This field is deprecated and the provision would always be GMEK if cloud_kms_config is not present in the request. |
| `runAsServiceAccount` | string | Optional. User input run-as service account, if empty, will bring up a new default service account |
| `skipCpProvision` | boolean | Optional. Indicates if skip CP provision or not |

### `GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest`

- Request for PublishIntegrationVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configParameters` | object | Optional. Config parameters used during integration execution. |
| `validateOnly` | boolean | Optional. If set, validates the integration version's configuration and returns without publishing it. The version's state, edit lock, and active version do not change. |

### `GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse`

- Response for PublishIntegrationVersion.
- Version: v1

### `GoogleCloudIntegrationsV1alphaReplaceServiceAccountRequest`

- Request for the ReplaceServiceAccount rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `runAsServiceAccount` | string | Required. REQUIRED: Run-as service account to be updated |

### `GoogleCloudIntegrationsV1alphaReplayExecutionRequest`

- Request for replaying an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `modifiedParameters` | object | Optional. The modified input parameters for replay. - Provide values for all the fields in the 'update_mask'. Any field not present in the 'update_mask' will be ignored and its value will be taken from the original execution. - If the 'update_mask' is not specified, all the parameters from original execution will be ignored and only the `modified_parameters` will be used. |
| `replayMode` | string enum | Optional. The mode of the replay. Values: `REPLAY_MODE_UNSPECIFIED`, `REPLAY_MODE_FROM_BEGINNING`, `REPLAY_MODE_POINT_OF_FAILURE`. |
| `replayReason` | string | Required. The user provided reason for replaying the execution. |
| `updateMask` | string (google-fieldmask) | Optional. The list of parameters to be updated. - If the `update_mask` is not specified, all the parameters from original execution will be ignored and only the `modified_parameters` will be used. - It is an error to include a parameter in `update_mask` but not in `modified_parameters`. - Updating nested fields in a JSON parameter is not supported, please provide the complete JSON in the `modified_parameters`. |

### `GoogleCloudIntegrationsV1alphaReplayExecutionResponse`

- Response for replaying an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionId` | string | Next ID: 4 The id of the execution corresponding to this run of the integration. |
| `outputParameters` | object | OUTPUT parameters in format of Map. Where Key is the name of the parameter. The parameters would only be present in case of synchrounous execution. Note: Name of the system generated parameters are wrapped by backtick(\`) to distinguish them from the user defined parameters. |
| `replayedExecutionId` | string | The execution id which is replayed. |

### `GoogleCloudIntegrationsV1alphaResolveSuspensionRequest`

- Request for \[Suspensions.ResolveSuspensions\].
- Version: v1

| Field | Type | Description |
|---|---|---|
| `suspension` | GoogleCloudIntegrationsV1alphaSuspension | Suspension, containing the event_execution_info_id, task_id, and state to set on the corresponding suspension record. |

### `GoogleCloudIntegrationsV1alphaResolveSuspensionResponse`

- Response for Suspensions.ResolveSuspensions.
- Version: v1

### `GoogleCloudIntegrationsV1alphaRuntimeActionSchema`

- Metadata of an action, including schemas for its inputs and outputs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | Name of the action. |
| `inputSchema` | string | Input parameter schema for the action. |
| `outputSchema` | string | Output parameter schema for the action. |

### `GoogleCloudIntegrationsV1alphaRuntimeEntitySchema`

- Metadata of an entity, including a schema for its properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arrayFieldSchema` | string | The above schema, but for an array of the associated entity. |
| `entity` | string | Name of the entity. |
| `fieldSchema` | string | List of fields in the entity. |

### `GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest`

- The request for scheduling an integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputParameters` | object | Optional. Input parameters used by integration execution. |
| `parameterEntries` | array<EnterpriseCrmFrontendsEventbusProtoParameterEntry> | Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. |
| `parameters` | EnterpriseCrmEventbusProtoEventParameters | Passed in as parameters to each integration execution. |
| `requestId` | string | This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. |
| `scheduleTime` | string (google-datetime) | The time that the integration should be executed. If the time is less or equal to the current time, the integration is executed immediately. |
| `triggerId` | string | Required. Matched against all {@link TriggerConfig}s across all integrations. i.e. TriggerConfig.trigger_id.equals(trigger_id) |
| `userGeneratedExecutionId` | string | Optional. This is a unique id provided by the method caller. If provided this will be used as the execution_id when a new execution info is created. This is a string representation of a UUID. Must have no more than 36 characters and contain only alphanumeric characters and hyphens. |

### `GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse`

- The response for executing an integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionInfoIds` | array<string> | The execution info id for the executed integrations. |

### `GoogleCloudIntegrationsV1alphaSearchIntegrationsResponse`

- Response for SearchIntegrations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrations` | array<GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult> | The list of integrations that match the search criteria. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `GoogleCloudIntegrationsV1alphaSearchIntegrationsResponseIntegrationSearchResult`

- The integration search result with integration level information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The create time of the integration version. |
| `creator` | string | The creator of the integration version. |
| `description` | string | The description of the integration version. |
| `id` | string | The integration id. |
| `name` | string | The integration document metadata. |
| `region` | string | The region of the integration version. |
| `status` | string enum | Output only. The status of the integration version. Values: `INTEGRATION_STATE_UNSPECIFIED`, `DRAFT`, `ACTIVE`, `ARCHIVED`, `SNAPSHOT`. |
| `version` | string | The version of the integration version. |

### `GoogleCloudIntegrationsV1alphaSearchTemplatesResponse`

- Response for a request to search templates
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token used to retrieve the next page results. |
| `templates` | array<GoogleCloudIntegrationsV1alphaTemplate> | List of templates retrieved. |

### `GoogleCloudIntegrationsV1alphaSerializedFile`

- To store string representation of Integration file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | String representation of the file content. |
| `file` | string enum | File information like Integration version, Integration Config variables etc. Values: `INTEGRATION_FILE_UNSPECIFIED`, `INTEGRATION`, `INTEGRATION_CONFIG_VARIABLES`. |

### `GoogleCloudIntegrationsV1alphaServiceAccountCredentials`

- Represents the service account which can be used to generate access token for authenticating the service call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scope` | string | A space-delimited list of requested scope permissions. |
| `serviceAccount` | string | Name of the service account that has the permission to make the request. |

### `GoogleCloudIntegrationsV1alphaSfdcChannel`

- The SfdcChannel that points to a CDC or Platform Event Channel.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelTopic` | string | Required. The Channel topic defined by salesforce once an channel is opened |
| `createTime` | string (google-datetime) | Output only. Time when the channel is created |
| `deleteTime` | string (google-datetime) | Output only. Time when the channel was deleted. Empty if not deleted. |
| `description` | string | Optional. The description for this channel |
| `displayName` | string | Optional. Client level unique name/alias to easily reference a channel. |
| `isActive` | boolean | Output only. Indicated if a channel has any active integrations referencing it. Set to false when the channel is created, and set to true if there is any integration published with the channel configured in it. |
| `lastReplayId` | string | Output only. Last sfdc messsage replay id for channel |
| `name` | string | Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}. |
| `updateTime` | string (google-datetime) | Output only. Time when the channel was last updated |

### `GoogleCloudIntegrationsV1alphaSfdcInstance`

- The SfdcInstance resource use to hold channels and connection config data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authConfigId` | array<string> | A list of AuthConfigs that can be tried to open the channel to SFDC |
| `createTime` | string (google-datetime) | Output only. Time when the instance is created |
| `deleteTime` | string (google-datetime) | Output only. Time when the instance was deleted. Empty if not deleted. |
| `description` | string | Optional. A description of the sfdc instance. |
| `displayName` | string | Optional. User selected unique name/alias to easily reference an instance. |
| `name` | string | Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}. |
| `serviceAuthority` | string | Optional. URL used for API calls after authentication (the login authority is configured within the referenced AuthConfig). |
| `sfdcOrgId` | string | The SFDC Org Id. This is defined in salesforce. |
| `updateTime` | string (google-datetime) | Output only. Time when the instance was last updated |

### `GoogleCloudIntegrationsV1alphaShareTemplateRequest`

- Request to Share template
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceNames` | array<string> | Optional. Project name resources to share the template. The project names is expected in resource format Ex: projects/{project-number} or organization/{org-id} |

### Shape of `GoogleCloudConnectorsV1ConfigVariable`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "boolValue": "boolean",
  "encryptionKeyValue": "GoogleCloudConnectorsV1EncryptionKey",
  "intValue": "string (int64)",
  "key": "string",
  "secretValue": "GoogleCloudConnectorsV1Secret",
  "stringValue": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `integrations` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Source: https://integrations.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
