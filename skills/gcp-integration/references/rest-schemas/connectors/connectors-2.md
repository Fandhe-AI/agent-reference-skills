---
source: https://connectors.googleapis.com/$discovery/rest?version=v2
---

# Connectors API message schemas (connectors) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/connectors/`.

### `ListManagedZonesResponse`

- Response message for ConnectorsService.ListManagedZones
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managedZones` | array<ManagedZone> | ManagedZones. |
| `nextPageToken` | string | Next page token. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListProvidersResponse`

- Response message for Connectors.ListProviders.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `providers` | array<Provider> | A list of providers. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListResourcesResponse`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `metadata` | object | Metadata like service latency, etc. |
| `nextPageToken` | string | Next page token if more resources available. |
| `resources` | array<Resource> | List of available resources. |

### `ListRuntimeActionSchemasResponse`

- Response message for ConnectorsService.ListRuntimeActionSchemas.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `runtimeActionSchemas` | array<RuntimeActionSchema> | Runtime action schemas. |

### `ListRuntimeEntitySchemasResponse`

- Response message for ConnectorsService.ListRuntimeEntitySchemas.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Next page token. |
| `runtimeEntitySchemas` | array<RuntimeEntitySchema> | Runtime entity schemas. |

### `ListToolsPostRequest`

- Request message for ConnectorAgentService.ListToolsPost
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executionConfig` | ExecutionConfig | execution config for the request. |
| `pageSize` | integer (int32) | Page size. |
| `pageToken` | string | Page token. |
| `toolNames` | array<string> | List of tool names to for selective tool fetching. |
| `toolSpec` | ToolSpec | List of tool specifications. |

### `ListToolsResponse`

- Response message for ConnectorAgentService.ListTools
- Version: v2

| Field | Type | Description |
|---|---|---|
| `metadata` | object | Metadata like service latency, etc. |
| `nextPageToken` | string | Next page token. |
| `tools` | array<Tool> | List of available tools. |

### `ListenEventRequest`

- Expected request for ListenEvent API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `payload` | object | Optional. Request payload. |

### `ListenEventResponse`

- Expected response for ListenEvent API.
- Version: v1

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

### `LockConfig`

- Determines whether or no a connection is locked. If locked, a reason must be specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locked` | boolean | Optional. Indicates whether or not the connection is locked. |
| `reason` | string | Optional. Describes why a connection is locked. |

### `LogicalExpression`

- Struct for representing boolean expressions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldComparisons` | array<FieldComparison> | Optional. A list of fields to be compared. |
| `logicalExpressions` | array<LogicalExpression> | Optional. A list of nested conditions to be compared. |
| `logicalOperator` | string enum | Optional. The logical operator to use between the fields and conditions. Values: `OPERATOR_UNSPECIFIED`, `AND`, `OR`. |

### `MaintenancePolicy`

- Defines policies to service maintenance events.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the resource was created. |
| `description` | string | Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512. |
| `labels` | object | Optional. Resource labels to represent user provided metadata. Each label is a key-value pair, where both the key and the value are arbitrary strings provided by the user. |
| `name` | string | Required. MaintenancePolicy name using the form: `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}` where {project_id} refers to a GCP consumer project ID, {location_id} refers to a GCP region/zone, {maintenance_policy_id} must be 1-63 characters long and match the regular expression `[a-z0-9]([-a-z0-9]*[a-z0-9])?`. |
| `state` | string enum | Optional. The state of the policy. Values: `STATE_UNSPECIFIED`, `READY`, `DELETING`. |
| `updatePolicy` | UpdatePolicy | Maintenance policy applicable to instance update. |
| `updateTime` | string (google-datetime) | Output only. The time when the resource was updated. |

### `MaintenanceSchedule`

- Maintenance schedule which is exposed to customer and potentially end user, indicating published upcoming future maintenance schedule
- Version: v2

| Field | Type | Description |
|---|---|---|
| `canReschedule` | boolean | This field is deprecated, and will be always set to true since reschedule can happen multiple times now. This field should not be removed until all service producers remove this for their customers. |
| `endTime` | string (google-datetime) | The scheduled end time for the maintenance. |
| `rolloutManagementPolicy` | string | The rollout management policy this maintenance schedule is associated with. When doing reschedule update request, the reschedule should be against this given policy. |
| `scheduleDeadlineTime` | string (google-datetime) | schedule_deadline_time is the time deadline any schedule start time cannot go beyond, including reschedule. It's normally the initial schedule start time plus maintenance window length (1 day or 1 week). Maintenance cannot be scheduled to start beyond this deadline. |
| `startTime` | string (google-datetime) | The scheduled start time for the maintenance. |

### `MaintenanceSettings`

- Maintenance settings associated with instance. Allows service producers and end users to assign settings that controls maintenance on this instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exclude` | boolean | Optional. Exclude instance from maintenance. When true, rollout service will not attempt maintenance on the instance. Rollout service will include the instance in reported rollout progress as not attempted. |
| `isRollback` | boolean | Optional. If the update call is triggered from rollback, set the value as true. |
| `maintenancePolicies` | object | Optional. The MaintenancePolicies that have been attached to the instance. The key must be of the type name of the oneof policy name defined in MaintenancePolicy, and the embedded policy must define the same policy type. For details, please refer to (internal link). Should not be set if maintenance_policy_names is set. If only the name is needed, then only populate MaintenancePolicy.name. |

### `MaintenanceWindow`

- MaintenanceWindow definition.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dailyCycle` | DailyCycle | Daily cycle. |
| `weeklyCycle` | WeeklyCycle | Weekly cycle. |

### `ManagedZone`

- represents the Connector's Managed Zone resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Created time. |
| `description` | string | Optional. Description of the resource. |
| `dns` | string | Required. DNS Name of the resource |
| `labels` | object | Optional. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `name` | string | Output only. Resource name of the Managed Zone. Format: projects/{project}/locations/global/managedZones/{managed_zone} |
| `targetProject` | string | Required. The name of the Target Project |
| `targetVpc` | string | Required. The name of the Target Project VPC Network |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `MarketplaceConnectorDetails`

- Marketplace connector details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `marketplaceProduct` | string | Marketplace product name. |
| `marketplaceProductId` | string | Marketplace product ID. |
| `marketplaceProductUri` | string | Marketplace product URL. |
| `partner` | string | The name of the partner. |

### `ModifyConnectionToolspecOverrideRequest`

- Request message for ModifyConnectionToolspecOverride API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `toolspecOverride` | ToolspecOverride | Required. Toolspec overrides to be modified. |

### `ModifyConnectionToolspecOverrideResponse`

- Response message for ModifyConnectionToolspecOverride API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `toolspecOverrides` | ToolspecOverride | Toolspec overrides for the connection. |

### `MultipleSelectConfig`

- MultipleSelectConfig represents the multiple options for a config variable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowCustomValues` | boolean | Optional. Allow custom values. |
| `multipleSelectOptions` | array<MultipleSelectOption> | Required. Multiple select options. |
| `valueSeparator` | string | Required. Value separator. Only "," can be used for OAuth auth code flow scope field. |

### `MultipleSelectOption`

- MultiplSelecteOption represents the single option for a config variable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Value of the option. |
| `displayName` | string | Required. Display name of the option. |
| `key` | string | Required. Key of the option. |
| `preselected` | boolean | Optional. Indicates if the option is preselected. |

### `NetworkConfig`

- Regional Network Config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `egressIps` | array<string> | Output only. Egress IPs |
| `egressMode` | string enum | Optional. Egress mode for the network. Values: `NETWORK_EGRESS_MODE_UNSPECIFIED`, `AUTO_IP`, `STATIC_IP`. |

### `NetworkEgressModeOverride`

- NetworkEgressModeOverride provides the network egress mode override for a connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isEventingOverrideEnabled` | boolean | boolean should be set to true to make sure only eventing enabled connections are migrated to direct vpc egress. |
| `isJobsOverrideEnabled` | boolean | boolean should be set to true to make sure only async operations enabled connections are migrated to direct vpc egress. |
| `networkEgressMode` | string enum | Determines the VPC Egress mode for the connector. Values: `NETWORK_EGRESS_MODE_UNSPECIFIED`, `SERVERLESS_VPC_ACCESS_CONNECTOR`, `DIRECT_VPC_EGRESS`. |

### `NodeConfig`

- Node configuration for the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxNodeCount` | integer (int32) | Optional. Maximum number of nodes in the runtime nodes. |
| `minNodeCount` | integer (int32) | Optional. Minimum number of nodes in the runtime nodes. |

### `NodeSloMetadata`

- Node information for custom per-node SLO implementations. SSA does not support per-node SLO, but producers can populate per-node information in SloMetadata for custom precomputations. SSA Eligibility Exporter will emit per-node metric based on this information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `location` | string | The location of the node, if different from instance location. |
| `nodeId` | string | The id of the node. This should be equal to SaasInstanceNode.node_id. |
| `perSliEligibility` | PerSliSloEligibility | If present, this will override eligibility for the node coming from instance or exclusions for specified SLIs. |

### `NotificationParameter`

- Contains notification related data.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | Optional. Array of string values. e.g. instance's replica information. |

### `OAuth2Config`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authUri` | string | Authorization Server URL/Token Endpoint for Authorization Code Flow |
| `clientId` | string | Client ID for the OAuth2 flow. |
| `clientSecret` | string | Client secret for the OAuth2 flow. |

### `OAuthTokenData`

- pass only at create and not update using updateMask Auth Code Data
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | EUASecret | Optional. Access token for the connection. |
| `createTime` | string (google-datetime) | Optional. Timestamp when the access token was created. |
| `expiry` | string (google-duration) | Optional. Time in seconds when the access token expires. |
| `refreshToken` | EUASecret | Optional. Refresh token for the connection. |

### `Oauth2AuthCodeFlow`

- Parameters to support Oauth 2.0 Auth Code Grant Authentication. See https://www.rfc-editor.org/rfc/rfc6749#section-1.3.1 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authCode` | string | Optional. Authorization code to be exchanged for access and refresh tokens. |
| `authUri` | string | Optional. Auth URL for Authorization Code Flow |
| `clientId` | string | Optional. Client ID for user-provided OAuth app. |
| `clientSecret` | Secret | Optional. Client secret for user-provided OAuth app. |
| `enablePkce` | boolean | Optional. Whether to enable PKCE when the user performs the auth code flow. |
| `pkceVerifier` | string | Optional. PKCE verifier to be used during the auth code exchange. |
| `redirectUri` | string | Optional. Redirect URI to be provided during the auth code exchange. |
| `scopes` | array<string> | Optional. Scopes the connection will request when the user performs the auth code flow. |

### `Oauth2AuthCodeFlowGoogleManaged`

- Parameters to support Oauth 2.0 Auth Code Grant Authentication using Google Provided OAuth Client. See https://tools.ietf.org/html/rfc6749#section-1.3.1 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authCode` | string | Optional. Authorization code to be exchanged for access and refresh tokens. |
| `redirectUri` | string | Optional. Redirect URI to be provided during the auth code exchange. |
| `scopes` | array<string> | Required. Scopes the connection will request when the user performs the auth code flow. |

### `Oauth2ClientCredentials`

- Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Optional. The client identifier. |
| `clientSecret` | Secret | Optional. Secret version reference containing the client secret. |

### `Oauth2JwtBearer`

- Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0 Authorization Grant based authentication. See https://tools.ietf.org/html/rfc7523 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientKey` | Secret | Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`. |
| `jwtClaims` | JwtClaims | Optional. JwtClaims providers fields to generate the token. |

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

### `PartnerMetadata`

- Partner metadata details. This will be populated when publishing the custom connector as a partner connector version. On publishing, parntner connector version will be created using the fields in PartnerMetadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceptGcpTos` | boolean | Required. Whether the user has accepted the Google Cloud Platform Terms of Service (https://cloud.google.com/terms/) and the Google Cloud Marketplace Terms of Service (https://cloud.google.com/terms/marketplace/launcher?hl=en). |
| `additionalComments` | string | Optional. Additional comments for the submission. |
| `confirmPartnerRequirements` | boolean | Required. Confirmation that connector meets all applicable requirements mentioned in the Partner Connector Publishing requirements list and Partner onboardiong requirements list (https://cloud.google.com/marketplace/docs/partners/get-started#requirements). |
| `demoUri` | string | Required. Public URL for the demo video. |
| `hasDynamicSpecUri` | boolean | Output only. Has dynamic open api spec uri. |
| `integrationTemplates` | string | Required. Integration example templates for the custom connector. |
| `localSpecPath` | string | Output only. Local spec path. Required if has_dynamic_spec_uri is true. |
| `marketplaceProduct` | string | Optional. Marketplace product name. |
| `marketplaceProductId` | string | Required. Marketplace product ID. |
| `marketplaceProductProjectId` | string | Optional. Marketplace product project ID. |
| `marketplaceProductUri` | string | Optional. Marketplace product URL. |
| `partner` | string | Required. Partner name. |
| `partnerConnectorDisplayName` | string | Required. Partner connector display name. |
| `publishRequestTime` | string (google-datetime) | Output only. Publish request time. |
| `targetApplication` | string | Required. Target application for which partner connector is built. |
| `targetCustomerSegment` | string | Required. Target customer segment for the partner connector. |
| `useCases` | string | Required. Details about partner connector use cases. |

### `PerSliSloEligibility`

- PerSliSloEligibility is a mapping from an SLI name to eligibility.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `eligibilities` | object | An entry in the eligibilities map specifies an eligibility for a particular SLI for the given instance. The SLI key in the name must be a valid SLI name specified in the Eligibility Exporter binary flags otherwise an error will be emitted by Eligibility Exporter and the oncaller will be alerted. If an SLI has been defined in the binary flags but the eligibilities map does not contain it, the corresponding SLI time series will not be emitted by the Eligibility Exporter. This ensures a smooth rollout and compatibility between the data produced by different versions of the Eligibility Exporters. If eligibilities map contains a key for an SLI which has not been declared in the binary flags, there will be an error message emitted in the Eligibility Exporter log and the metric for the SLI in question will not be emitted. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Provider`

- Provider indicates the owner who provides the connectors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Created time. |
| `description` | string | Output only. Description of the resource. |
| `displayName` | string | Output only. Display name. |
| `documentationUri` | string | Output only. Link to documentation page. |
| `externalUri` | string | Output only. Link to external page. |
| `labels` | object | Output only. Resource labels to represent user-provided metadata. Refer to cloud documentation on labels for more details. https://cloud.google.com/compute/docs/labeling-resources |
| `launchStage` | string enum | Output only. Flag to mark the version indicating the launch stage. Values: `LAUNCH_STAGE_UNSPECIFIED`, `PREVIEW`, `GA`, `DEPRECATED`, `TEST`, `PRIVATE_PREVIEW`. |
| `name` | string | Output only. Resource name of the Provider. Format: projects/{project}/locations/{location}/providers/{provider} Only global location is supported for Provider resource. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |
| `webAssetsLocation` | string | Output only. Cloud storage location of icons etc consumed by UI. |

### `ProvisionedResource`

- Describes provisioned dataplane resources.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `resourceType` | string | Type of the resource. This can be either a GCP resource or a custom one (e.g. another cloud provider's VM). For GCP compute resources use singular form of the names listed in GCP compute API documentation (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with 'compute-', for example: 'compute-instance', 'compute-disk', 'compute-autoscaler'. |
| `resourceUrl` | string | URL identifying the resource, e.g. "https://www.googleapis.com/compute/v1/projects/...)". |

### `PubSub`

- Pub/Sub message includes details of the Destination Pub/Sub topic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. Pub/Sub message attributes to be added to the Pub/Sub message. |
| `configVariables` | array<ConfigVariable> | Optional. Configuration for configuring the trigger |
| `projectId` | string | Required. The project id which has the Pub/Sub topic. |
| `topicId` | string | Required. The topic id of the Pub/Sub topic. |

### `PublishCustomConnectorVersionRequest`

- Request message for ConnectorsService.PublishCustomConnectorVersion
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partnerMetadata` | PartnerMetadata | Required. Partner metadata details for validating and publishing the custom connector as a partner connector version. |

### `PublishStatus`

- Publish status of a custom connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publishState` | string enum | Output only. Publish state of the custom connector. Values: `PUBLISH_STATE_UNSPECIFIED`, `PUBLISHED`, `PUBLISH_IN_PROGRESS`, `UNPUBLISHED`. |
| `publishTime` | string (google-datetime) | Output only. Publish time. |
| `publishedAs` | string | Output only. Partner connector name. Will be set on the custom connector. Format: providers/partner/connectors//versions/ |
| `publishedSource` | string | Output only. Custom connector name. Will be set on the partner connector. Format: providers/customconnectors/connectors//versions/ |

### `Query`

- A wrapper around the SQL query statement. This is needed so that the JSON representation of ExecuteSqlQueryRequest has the following format: `{"query":"select *"}`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `maxRows` | string (int64) | Sets the limit for the maximum number of rows returned after the query execution. |
| `query` | string | Required. Sql query to execute. |
| `queryParameters` | array<QueryParameter> | In the struct, the value corresponds to the value of query parameter and date type corresponds to the date type of the query parameter. |
| `timeout` | string (int64) | Sets the number of seconds the driver will wait for a query to execute. |

### `QueryParameter`

- Query parameter definition
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | — Values: `DATA_TYPE_UNSPECIFIED`, `INT`, `SMALLINT`, `DOUBLE`, `DATE`, `DATETIME`, `TIME`, `STRING`, `LONG`, `BOOLEAN`, `DECIMAL`, `UUID`, `BLOB`, `BIT`, `TINYINT`, `INTEGER`, `BIGINT`, `FLOAT`, `REAL`, `NUMERIC`, `CHAR`, `VARCHAR`, `LONGVARCHAR`, `TIMESTAMP`, `NCHAR`, `NVARCHAR`, `LONGNVARCHAR`, `NULL`, `OTHER`, `JAVA_OBJECT`, `DISTINCT`, `STRUCT`, `ARRAY`, `CLOB`, `REF`, `DATALINK`, `ROWID`, `BINARY`, `VARBINARY`, `LONGVARBINARY`, `NCLOB`, `SQLXML`, `REF_CURSOR`, `TIME_WITH_TIMEZONE`, `TIMESTAMP_WITH_TIMEZONE`. |
| `value` | any | — |

### `Reference`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the reference field. |
| `type` | string | Name of reference entity type. |

### `RefreshAccessTokenRequest`

- RefreshAccessTokenRequest includes the refresh token.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executionConfig` | ExecutionConfig | ExecutionConfig contains the configuration for the execution of the request. |
| `oauth2Config` | OAuth2Config | OAuth2Config contains the OAuth2 config for the connection. |
| `refreshToken` | string | Optional. Refresh Token String. If the Refresh Token is not provided, the runtime will read the data from the secret manager. |

### `RefreshAccessTokenResponse`

- RefreshAccessTokenResponse includes the returned access token and its associated credentials.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessCredentials` | AccessCredentials | — |
| `metadata` | object | Metadata like service latency, etc. |

### `RefreshConnectionSchemaMetadataRequest`

- Request message for ConnectorsService.RefreshConnectionSchemaMetadata.
- Version: v1

### `RegionalSettings`

- Regional Settings details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `client` | string | Optional. Client type for the regional settings. |
| `encryptionConfig` | EncryptionConfig | Optional. Regional encryption config to hold CMEK details. |
| `name` | string | Output only. Resource name of the Connection. Format: projects/{project}/locations/{location}/regionalSettings |
| `networkConfig` | NetworkConfig | Optional. Regional network config. |
| `provisioned` | boolean | Output only. Specifies whether the region is provisioned. |

### `RemoveConnectionToolspecOverrideRequest`

- Request message for RemoveConnectionToolspecOverride API.
- Version: v1

### `RepairEventingRequest`

- Request message for ConnectorsService.RepairEventing
- Version: v1

### `Resource`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `_meta` | object | Metadata for the resource. |
| `description` | string | A description of what this resource represents. |
| `mimeType` | string | The MIME type of this resource, if known. |
| `name` | string | A human-readable name for this resource. |
| `size` | string (int64) | The size of the raw resource content, in bytes, if known. |
| `uri` | string | The URI of this resource. |

### `Resource` (v1)

- Resource definition
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pathTemplate` | string | Optional. Template to uniquely represent a Google Cloud resource in a format IAM expects This is a template that can have references to other values provided in the config variable template. |
| `type` | string enum | Optional. Different types of resource supported. Values: `TYPE_UNSPECIFIED`, `GCP_PROJECT`, `GCP_RESOURCE`, `GCP_SECRETMANAGER_SECRET`, `GCP_SECRETMANAGER_SECRET_VERSION`. |

### `ResourceLimits`

- Resource limits defined for connection pods of a given connector type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpu` | string | Output only. CPU limit. |
| `memory` | string | Output only. Memory limit. |

### `ResourceRequests`

- Resource requests defined for connection pods of a given connector type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpu` | string | Output only. CPU request. |
| `memory` | string | Output only. Memory request. |

### `ResultMetadata`

- Result Metadata message contains metadata about the result returned after executing an Action.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | The data type of the metadata field Values: `DATA_TYPE_UNSPECIFIED`, `INT`, `SMALLINT`, `DOUBLE`, `DATE`, `DATETIME`, `TIME`, `STRING`, `LONG`, `BOOLEAN`, `DECIMAL`, `UUID`, `BLOB`, `BIT`, `TINYINT`, `INTEGER`, `BIGINT`, `FLOAT`, `REAL`, `NUMERIC`, `CHAR`, `VARCHAR`, `LONGVARCHAR`, `TIMESTAMP`, `NCHAR`, `NVARCHAR`, `LONGNVARCHAR`, `NULL`, `OTHER`, `JAVA_OBJECT`, `DISTINCT`, `STRUCT`, `ARRAY`, `CLOB`, `REF`, `DATALINK`, `ROWID`, `BINARY`, `VARBINARY`, `LONGVARBINARY`, `NCLOB`, `SQLXML`, `REF_CURSOR`, `TIME_WITH_TIMEZONE`, `TIMESTAMP_WITH_TIMEZONE`. |
| `defaultValue` | any | The following field specifies the default value of the Parameter provided by the external system if a value is not provided. |
| `description` | string | A brief description of the metadata field. |
| `jsonSchema` | JsonSchema | JsonSchema of the result, applicable only if parameter is of type `STRUCT` |
| `name` | string | Name of the metadata field. |
| `nullable` | boolean | Specifies whether a null value is allowed. |

### `ResultMetadata` (v1)

- Metadata of result field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | The data type of the field. Values: `DATA_TYPE_UNSPECIFIED`, `DATA_TYPE_INT`, `DATA_TYPE_SMALLINT`, `DATA_TYPE_DOUBLE`, `DATA_TYPE_DATE`, `DATA_TYPE_DATETIME`, `DATA_TYPE_TIME`, `DATA_TYPE_STRING`, `DATA_TYPE_LONG`, `DATA_TYPE_BOOLEAN`, `DATA_TYPE_DECIMAL`, `DATA_TYPE_UUID`, `DATA_TYPE_BLOB`, `DATA_TYPE_BIT`, `DATA_TYPE_TINYINT`, `DATA_TYPE_INTEGER`, `DATA_TYPE_BIGINT`, `DATA_TYPE_FLOAT`, `DATA_TYPE_REAL`, `DATA_TYPE_NUMERIC`, `DATA_TYPE_CHAR`, `DATA_TYPE_VARCHAR`, `DATA_TYPE_LONGVARCHAR`, `DATA_TYPE_TIMESTAMP`, `DATA_TYPE_NCHAR`, `DATA_TYPE_NVARCHAR`, `DATA_TYPE_LONGNVARCHAR`, `DATA_TYPE_NULL`, `DATA_TYPE_OTHER`, `DATA_TYPE_JAVA_OBJECT`, `DATA_TYPE_DISTINCT`, `DATA_TYPE_STRUCT`, `DATA_TYPE_ARRAY`, `DATA_TYPE_CLOB`, `DATA_TYPE_REF`, `DATA_TYPE_DATALINK`, `DATA_TYPE_ROWID`, `DATA_TYPE_BINARY`, `DATA_TYPE_VARBINARY`, `DATA_TYPE_LONGVARBINARY`, `DATA_TYPE_NCLOB`, `DATA_TYPE_SQLXML`, `DATA_TYPE_REF_CURSOR`, `DATA_TYPE_TIME_WITH_TIMEZONE`, `DATA_TYPE_TIMESTAMP_WITH_TIMEZONE`. |
| `defaultValue` | any | The following field specifies the default value of the Parameter provided by the external system if a value is not provided. |
| `description` | string | A brief description of the field. |
| `field` | string | Name of the result field. |
| `jsonSchema` | JsonSchema | JsonSchema representation of this action's result |
| `nullable` | boolean | Specifies whether a null value is allowed. |

### `RetryEventSubscriptionRequest`

- Request message for ConnectorsService.RefreshEventSubscription
- Version: v1

### `RoleGrant`

- This configuration defines all the Cloud IAM roles that needs to be granted to a particular Google Cloud resource for the selected principal like service account. These configurations will let UI display to customers what IAM roles need to be granted by them. Or these configurations can be used by the UI to render a 'grant' button to do the same on behalf of the user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `helperTextTemplate` | string | Optional. Template that UI can use to provide helper text to customers. |
| `principal` | string enum | Optional. Principal/Identity for whom the role need to assigned. Values: `PRINCIPAL_UNSPECIFIED`, `CONNECTOR_SA`. |
| `resource` | Resource | Optional. Resource on which the roles needs to be granted for the principal. |
| `roles` | array<string> | Optional. List of roles that need to be granted. |

### `RuntimeActionSchema`

- Schema of a runtime action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | Output only. Name of the action. |
| `description` | string | Output only. Brief Description of action |
| `displayName` | string | Output only. Display Name of action to be shown on client side |
| `inputJsonSchema` | JsonSchema | Output only. JsonSchema representation of this action's input metadata |
| `inputParameters` | array<InputParameter> | Output only. List of input parameter metadata for the action. |
| `inputSchemaAsString` | string | Output only. Input schema as string. |
| `resultJsonSchema` | JsonSchema | Output only. JsonSchema representation of this action's result metadata |
| `resultMetadata` | array<ResultMetadata> | Output only. List of result field metadata. |
| `resultSchemaAsString` | string | Output only. Result schema as string. |

### `RuntimeConfig`

- RuntimeConfig is the singleton resource of each location. It includes generic resource configs consumed by control plane and runtime plane like: pub/sub topic/subscription resource name, Cloud Storage location storing schema etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conndSubscription` | string | Output only. Pub/Sub subscription for connd to receive message. E.g. projects/{project-id}/subscriptions/{topic-id} |
| `conndTopic` | string | Output only. Pub/Sub topic for connd to send message. E.g. projects/{project-id}/topics/{topic-id} |
| `controlPlaneSubscription` | string | Output only. Pub/Sub subscription for control plane to receive message. E.g. projects/{project-id}/subscriptions/{topic-id} |
| `controlPlaneTopic` | string | Output only. Pub/Sub topic for control plne to send message. communication. E.g. projects/{project-id}/topics/{topic-id} |
| `locationId` | string | Output only. location_id of the runtime location. E.g. "us-west1". |
| `name` | string | Output only. Name of the runtimeConfig resource. Format: projects/{project}/locations/{location}/runtimeConfig |
| `runtimeEndpoint` | string | Output only. The endpoint of the connectors runtime ingress. |
| `schemaGcsBucket` | string | Output only. The Cloud Storage bucket that stores connector's schema reports. |
| `serviceDirectory` | string | Output only. The name of the Service Directory service name. |
| `state` | string enum | Output only. The state of the location. Values: `STATE_UNSPECIFIED`, `INACTIVE`, `ACTIVATING`, `ACTIVE`, `CREATING`, `DELETING`, `UPDATING`. |

### `RuntimeEntitySchema`

- Schema of a runtime entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entity` | string | Output only. Name of the entity. |
| `fields` | array<Field> | Output only. List of fields in the entity. |
| `jsonSchema` | JsonSchema | Output only. JsonSchema representation of this entity's metadata |
| `operations` | array<string> | List of operations supported by this entity Values: `OPERATION_UNSPECIFIED`, `LIST`, `GET`, `CREATE`, `UPDATE`, `DELETE`. |

### `Schedule`

- Configure the schedule.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Allows to define schedule that runs specified day of the week. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `duration` | string (google-duration) | Output only. Duration of the time window, set by service producer. |
| `startTime` | TimeOfDay | Time within the window to start the operations. |

### `SchemaRefreshConfig`

- Config for connection schema refresh
- Version: v1

| Field | Type | Description |
|---|---|---|
| `useActionDisplayNames` | boolean | Whether to use displayName for actions in UI. |
| `useSynchronousSchemaRefresh` | boolean | Whether to use synchronous schema refresh. |

### `SearchConnectionInstance`

- SearchConnectionInstance represents an instance of connector with specific fields
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actionSchema` | RuntimeActionSchema | Output only. Schema of a runtime action. |
| `connection` | Connection | Output only. Connection details |
| `entitySchema` | RuntimeEntitySchema | Output only. Schema of a runtime entity. |

### `SearchConnectionsResponse`

- Response message for Connectors.SearchConnections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connections` | array<SearchConnectionInstance> | A list of connectors. |
| `nextPageToken` | string | Optional. page_token |
| `unreachable` | array<string> | Locations that could not be reached. |

### `Secret`

- Secret provides a reference to entries in Secret Manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `secretVersion` | string | Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Settings`

- Global Settings details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Resource name of the Connection. Format: projects/{project}/locations/global/settings} |
| `payg` | boolean | Output only. Flag indicates if user is in PayG model |
| `tenantProjectId` | string | Output only. Tenant project id of the consumer project. |
| `vpcsc` | boolean | Optional. Flag indicates whether vpc-sc is enabled. |

### `SloEligibility`

- SloEligibility is a tuple containing eligibility value: true if an instance is eligible for SLO calculation or false if it should be excluded from all SLO-related calculations along with a user-defined reason.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `eligible` | boolean | Whether an instance is eligible or ineligible. |
| `reason` | string | User-defined reason for the current value of instance eligibility. Usually, this can be directly mapped to the internal state. An empty reason is allowed. |

### `SloMetadata`

- SloMetadata contains resources required for proper SLO classification of the instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nodes` | array<NodeSloMetadata> | Optional. List of nodes. Some producers need to use per-node metadata to calculate SLO. This field allows such producers to publish per-node SLO meta data, which will be consumed by SSA Eligibility Exporter and published in the form of per node metric to Monarch. |
| `perSliEligibility` | PerSliSloEligibility | Optional. Multiple per-instance SLI eligibilities which apply for individual SLIs. |
| `tier` | string | Name of the SLO tier the Instance belongs to. This name will be expected to match the tiers specified in the service SLO configuration. Field is mandatory and must not be empty. |

### `Source`

- Source to extract the backend from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldId` | string | Field identifier. For example config variable name. |
| `sourceType` | string enum | Type of the source. Values: `SOURCE_TYPE_UNSPECIFIED`, `CONFIG_VARIABLE`, `AUTH_CONFIG_VARIABLE`. |

### `SshPublicKey`

- Parameters to support Ssh public key Authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certType` | string | Optional. Format of SSH Client cert. |
| `sshClientCert` | Secret | Optional. SSH Client Cert. It should contain both public and private key. |
| `sshClientCertPass` | Secret | Optional. Password (passphrase) for ssh client certificate if it has one. |
| `username` | string | Optional. The user account used to authenticate. |

### `SslConfig`

- SSL Configuration of a connection
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<ConfigVariable> | Optional. Additional SSL related field values |
| `clientCertType` | string enum | Optional. Type of Client Cert (PEM/JKS/.. etc.) Values: `CERT_TYPE_UNSPECIFIED`, `PEM`. |
| `clientCertificate` | Secret | Optional. Client Certificate |
| `clientPrivateKey` | Secret | Optional. Client Private Key |
| `clientPrivateKeyPass` | Secret | Optional. Secret containing the passphrase protecting the Client Private Key |
| `privateServerCertificate` | Secret | Optional. Private Server Certificate. Needs to be specified if trust model is `PRIVATE`. |
| `serverCertType` | string enum | Optional. Type of Server Cert (PEM/JKS/.. etc.) Values: `CERT_TYPE_UNSPECIFIED`, `PEM`. |
| `trustModel` | string enum | Optional. Trust Model of the SSL connection Values: `PUBLIC`, `PRIVATE`, `INSECURE`. |
| `type` | string enum | Optional. Controls the ssl type for the given connector version. Values: `SSL_TYPE_UNSPECIFIED`, `TLS`, `MTLS`. |
| `useSsl` | boolean | Optional. Bool for enabling SSL |

### `SslConfigTemplate`

- Ssl config details of a connector version
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<ConfigVariableTemplate> | Any additional fields that need to be rendered |
| `clientCertType` | array<string> | List of supported Client Cert Types Values: `CERT_TYPE_UNSPECIFIED`, `PEM`. |
| `isTlsMandatory` | boolean | Boolean for determining if the connector version mandates TLS. |
| `serverCertType` | array<string> | List of supported Server Cert Types Values: `CERT_TYPE_UNSPECIFIED`, `PEM`. |
| `sslType` | string enum | Controls the ssl type for the given connector version Values: `SSL_TYPE_UNSPECIFIED`, `TLS`, `MTLS`. |

### `StandardAction`

- Standard action
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the standard action. |

### `StandardEntity`

- Standard entity
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the standard entity. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StringListValues`

- StringListValues is a message to store a list of string values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `listValues` | array<string> | Required. The list of string values. |

### `SupportedRuntimeFeatures`

- Supported runtime features of a connector version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actionApis` | boolean | Specifies if the connector supports action apis like 'executeAction'. |
| `asyncOperations` | boolean | Specifies if the connector supports async long running operations. |
| `entityApis` | boolean | Specifies if the connector supports entity apis like 'createEntity'. |
| `sqlQuery` | boolean | Specifies if the connector supports 'ExecuteSqlQuery' operation. |

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

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `Tool`

- Message representing a single tool.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `_meta` | object | Metadata for the tool. |
| `annotations` | ToolAnnotations | Annotations for the tool. |
| `dependsOn` | array<string> | List of tool names that this tool depends on. |
| `description` | string | Description of the tool. |
| `inputSchema` | JsonSchema | JSON schema for the input parameters of the tool. |
| `name` | string | Name of the tool. |
| `outputSchema` | JsonSchema | JSON schema for the output of the tool. |

### `ToolAnnotations`

- ToolAnnotations holds annotations for a tool.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `destructiveHint` | boolean | If true, the tool may perform destructive updates to its environment. If false, the tool performs only additive updates. (This property is meaningful only when `read_only_hint == false`) |
| `idempotentHint` | boolean | If true, calling the tool repeatedly with the same arguments will have no additional effect on the environment. (This property is meaningful only when `read_only_hint == false`) |
| `openWorldHint` | boolean | If true, this tool may interact with an "open world" of external entities. If false, the tool's domain of interaction is closed. For example, the world of a web search tool is open, whereas that of a memory tool is not. |
| `readOnlyHint` | boolean | If true, the tool does not modify its environment. |
| `title` | string | A human-readable title for the tool. |

### `ToolName`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `entityName` | string | Entity name for which the tool was generated. |
| `name` | string | Tool name that was generated in the list tools call. |
| `operation` | string enum | Operation for which the tool was generated. Values: `OPERATION_UNSPECIFIED`, `LIST`, `GET`, `CREATE`, `UPDATE`, `DELETE`. |

### `ToolName` (v1)

- Tool name for which the tool spec override is to be generated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entityType` | string | Optional. Entity type name for which the tool was generated. |
| `name` | string | Required. Tool name that was generated in the list tools call. |
| `operation` | string enum | Optional. Operation for which the tool was generated. Values: `OPERATION_UNSPECIFIED`, `LIST`, `GET`, `CREATE`, `UPDATE`, `DELETE`. |

### `ToolSpec`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `toolDefinitions` | array<object> | List of tool definitions. |
| `toolSpecVersion` | string | Version of the tool spec. Format: providerId/connectorId/versionId/toolSpecId |

### `ToolspecOverride`

- Toolspec overrides for a connection only holds the information that is to be displayed in the UI for admins.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseVersion` | string | Required. Represents the base version of the toolspec for which admin has added overrides. |
| `createTime` | string (google-datetime) | Output only. Created time. |
| `tools` | array<object> | Required. List of tools defined in the tool spec. Marking this field as required as this is the only field that is editable by the user in modify API so we should have at least one tool in the list. |
| `updateTime` | string (google-datetime) | Output only. Updated time. |

### `TrafficShapingConfig`

- \* TrafficShapingConfig defines the configuration for shaping API traffic by specifying a quota limit and the duration over which this limit is enforced. This configuration helps to control and manage the rate at which API calls are made on the client side, preventing service overload on the backend. For example: - if the quota limit is 100 calls per 10 seconds, then the message would be: { quota_limit: 100 duration: { seconds: 10 } } - if the quota limit is 100 calls per 5 minutes, then the message would be: { quota_limit: 100 duration: { seconds: 300 } } - if the quota limit is 10000 calls per day, then the message would be: { quota_limit: 10000 duration: { seconds: 86400 } and so on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Required. Specifies the duration over which the API call quota limits are calculated. This duration is used to define the time window for evaluating if the number of API calls made by a user is within the allowed quota limits. For example: - To define a quota sampled over 16 seconds, set `seconds` to 16 - To define a quota sampled over 5 minutes, set `seconds` to 300 (5 \* 60) - To define a quota sampled over 1 day, set `seconds` to 86400 (24 \* 60 \* 60) and so on. It is important to note that this duration is not the time the quota is valid for, but rather the time window over which the quota is evaluated. For example, if the quota is 100 calls per 10 seconds, then this duration field would be set to 10 seconds. |
| `quotaLimit` | string (int64) | Required. Maximum number of api calls allowed. |

### `UpdateEntitiesWithConditionsResponse`

- Response message for EntityService.UpdateEntitiesWithConditions
- Version: v2

| Field | Type | Description |
|---|---|---|
| `metadata` | object | Metadata like service latency, etc. |
| `response` | object | Response returned by the external system. |

### `UpdatePolicy`

- Maintenance policy applicable to instance updates.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `channel` | string enum | Optional. Relative scheduling channel applied to resource. Values: `UPDATE_CHANNEL_UNSPECIFIED`, `EARLIER`, `LATER`, `WEEK1`, `WEEK2`, `WEEK5`. |
| `denyMaintenancePeriods` | array<DenyMaintenancePeriod> | Deny Maintenance Period that is applied to resource to indicate when maintenance is forbidden. The protocol supports zero-to-many such periods, but the current SLM Rollout implementation only supports zero-to-one. |
| `window` | MaintenanceWindow | Optional. Maintenance window that is applied to resources covered by this policy. |

### `UserPassword`

- Parameters to support Username and Password Authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `password` | Secret | Optional. Secret version reference containing the password. |
| `username` | string | Optional. Username. |

### `ValidateCustomConnectorSpecRequest`

- Request message for ConnectorsService.ValidateCustomConnectorSpec
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAccount` | string | Required. Service account to access the spec from Google Cloud Storage. |
| `specLocation` | string | Required. Location of the custom connector spec. The location can be either a public url like `https://public-url.com/spec` Or a Google Cloud Storage location like `gs:///` |
| `specType` | string enum | Required. Spec type of the custom connector spec. Values: `CUSTOM_CONNECTOR_TYPE_UNSPECIFIED`, `OPEN_API`, `PROTO`, `SDK`. |

### `ValidateCustomConnectorSpecResponse`

- Response message for ConnectorsService.ValidateCustomConnectorSpec
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | Error message. The spec is valid if the error message is empty. |

### `VpcscConfig`

- This configuration provides VPCSC config for a connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultAllowlistedHost` | array<string> | The list of allowlisted FQDNs for VPCSC. |
| `disableFirewallVpcscFlow` | boolean | Whether to disable firewall VPCSC flow. |

### `WebhookData`

- WebhookData has details of webhook configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<ConfigVariable> | Output only. Additional webhook related field values. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the webhook was created. |
| `eventSubscriptions` | array<string> | Output only. List of event subscriptions which are using the webhook. |
| `eventTypes` | array<string> | Output only. List of event types for the webhook. This is the event types subscribed by the current webhook. |
| `id` | string | Output only. ID to uniquely identify webhook. |
| `name` | string | Output only. Name of the Webhook |
| `nextRefreshTime` | string (google-datetime) | Output only. Next webhook refresh time. Will be null if refresh is not supported. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the webhook was last updated. |

### `WebhookSubscriptions`

- WebhookSubscriptions has details of webhook subscriptions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `webhookData` | array<WebhookData> | Output only. Webhook data. |

### `WeeklyCycle`

- Time window specified for weekly operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `schedule` | array<Schedule> | User can specify multiple windows in a week. Minimum of 1 window. |

### `WithdrawCustomConnectorVersionRequest`

- Request message for ConnectorsService.WithdrawCustomConnectorVersion
- Version: v1

### Shape of `ListManagedZonesResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "managedZones": "array<ManagedZone>",
  "nextPageToken": "string",
  "unreachable": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `connectors` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `Settings.name` description and the `name` path parameter of `connectors.projects.locations.global.updateSettings` give the format `projects/{project}/locations/global/settings}`; the path pattern of `name` is `^projects/[^/]+/locations/global/settings$` (no trailing `}`), so the value has the form `projects/{project}/locations/global/settings`.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://connectors.googleapis.com/$discovery/rest?version=v2, https://connectors.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
