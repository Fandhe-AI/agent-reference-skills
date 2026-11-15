---
source: https://cloudbilling.googleapis.com/$discovery/rest?version=v1
---

# Cloud Billing API message schemas (cloudbilling)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudbilling/`.

### `APIKeySecurityScheme`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of this security scheme. |
| `location` | string | Location of the API key, valid values are "query", "header", or "cookie" |
| `name` | string | Name of the header, query or cookie parameter to be used. |

### `AgentCapabilities`

- Defines the A2A feature set supported by the agent
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extensions` | array<AgentExtension> | Extensions supported by this agent. |
| `pushNotifications` | boolean | If the agent can send push notifications to the clients webhook |
| `streaming` | boolean | If the agent will support streaming responses |

### `AgentCard`

- AgentCard conveys key information: - Overall details (version, name, description, uses) - Skills; a set of actions/solutions the agent can perform - Default modalities/content types supported by the agent. - Authentication requirements Next ID: 19
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalInterfaces` | array<AgentInterface> | Announcement of additional supported transports. Client can use any of the supported transports. |
| `capabilities` | AgentCapabilities | A2A Capability set supported by the agent. |
| `defaultInputModes` | array<string> | protolint:enable REPEATED_FIELD_NAMES_PLURALIZED The set of interaction modes that the agent supports across all skills. This can be overridden per skill. Defined as mime types. |
| `defaultOutputModes` | array<string> | The mime types supported as outputs from this agent. |
| `description` | string | A description of the agent's domain of action/solution space. Example: "Agent that helps users with recipes and cooking." |
| `documentationUrl` | string | A url to provide additional documentation about the agent. |
| `iconUrl` | string | An optional URL to an icon for the agent. |
| `name` | string | A human readable name for the agent. Example: "Recipe Agent" |
| `preferredTransport` | string | The transport of the preferred endpoint. If empty, defaults to JSONRPC. |
| `protocolVersion` | string | The version of the A2A protocol this agent supports. |
| `provider` | AgentProvider | The service provider of the agent. |
| `security` | array<Security> | protolint:disable REPEATED_FIELD_NAMES_PLURALIZED Security requirements for contacting the agent. This list can be seen as an OR of ANDs. Each object in the list describes one possible set of security requirements that must be present on a request. This allows specifying, for example, "callers must either use OAuth OR an API Key AND mTLS." Example: security { schemes { key: "oauth" value { list: \["read"\] } } } security { schemes { key: "api-key" } schemes { key: "mtls" } } |
| `securitySchemes` | object | The security scheme details used for authenticating with this agent. |
| `signatures` | array<AgentCardSignature> | JSON Web Signatures computed for this AgentCard. |
| `skills` | array<AgentSkill> | Skills represent a unit of ability an agent can perform. This may somewhat abstract but represents a more focused set of actions that the agent is highly likely to succeed at. |
| `supportsAuthenticatedExtendedCard` | boolean | Whether the agent supports providing an extended agent card when the user is authenticated, i.e. is the card from .well-known different than the card from GetAgentCard. |
| `url` | string | A URL to the address the agent is hosted at. This represents the preferred endpoint as declared by the agent. |
| `version` | string | The version of the agent. Example: "1.0.0" |

### `AgentCardSignature`

- AgentCardSignature represents a JWS signature of an AgentCard. This follows the JSON format of an RFC 7515 JSON Web Signature (JWS).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `header` | object | The unprotected JWS header values. |
| `protected` | string | Required. The protected JWS header for the signature. This is always a base64url-encoded JSON object. Required. |
| `signature` | string | Required. The computed signature, base64url-encoded. Required. |

### `AgentExtension`

- A declaration of an extension supported by an Agent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | A description of how this agent uses this extension. Example: "Google OAuth 2.0 authentication" |
| `params` | object | Optional configuration for the extension. |
| `required` | boolean | Whether the client must follow specific requirements of the extension. Example: false |
| `uri` | string | The URI of the extension. Example: "https://developers.google.com/identity/protocols/oauth2" |

### `AgentInterface`

- Defines additional transport information for the agent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tenant` | string | Tenant to be set in the request when calling the agent. Experimental, might still change for 1.0 release. |
| `transport` | string | The transport supported this url. This is an open form string, to be easily extended for many transport protocols. The core ones officially supported are JSONRPC, GRPC and HTTP+JSON. |
| `url` | string | The url this interface is found at. |

### `AgentProvider`

- Represents information about the service provider of an agent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `organization` | string | The providers organization name Example: "Google" |
| `url` | string | The providers reference url Example: "https://ai.google.dev" |

### `AgentSkill`

- AgentSkill represents a unit of action/solution that the agent can perform. One can think of this as a type of highly reliable solution that an agent can be tasked to provide. Agents have the autonomy to choose how and when to use specific skills, but clients should have confidence that if the skill is defined that unit of action can be reliably performed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | A human (or llm) readable description of the skill details and behaviors. |
| `examples` | array<string> | A set of example queries that this skill is designed to address. These examples should help the caller to understand how to craft requests to the agent to achieve specific goals. Example: \["I need a recipe for bread"\] |
| `id` | string | Unique identifier of the skill within this agent. |
| `inputModes` | array<string> | Possible input modalities supported. |
| `name` | string | A human readable name for the skill. |
| `outputModes` | array<string> | Possible output modalities produced |
| `security` | array<Security> | protolint:disable REPEATED_FIELD_NAMES_PLURALIZED Security schemes necessary for the agent to leverage this skill. As in the overall AgentCard.security, this list represents a logical OR of security requirement objects. Each object is a set of security schemes that must be used together (a logical AND). protolint:enable REPEATED_FIELD_NAMES_PLURALIZED |
| `tags` | array<string> | A set of tags for the skill to enhance categorization/utilization. Example: \["cooking", "customer support", "billing"\] |

### `AgenticQueryInfo`

- A local representation of the query used to fetch the data. This is used instead of the raw QueryBillingDataRequest to avoid pulling in Cloud Policy Enforcement (CPE) resource_type annotations into the response payload, which causes ESF validation failures.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `columns` | string | The columns queried. |
| `filter` | string | The filter applied to the query. |
| `groupBy` | string | The group-by clause applied to the query. |
| `limit` | integer (int32) | The row limit applied to the query. |
| `orderBy` | string | The order-by clause applied to the query. |
| `parents` | array<string> | The parents (e.g. projects, billing accounts) queried. |
| `view` | string | The view queried. |

### `AggregationInfo`

- Represents the aggregation level and interval for pricing of a single SKU.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationCount` | integer (int32) | The number of intervals to aggregate over. Example: If aggregation_level is "DAILY" and aggregation_count is 14, aggregation will be over 14 days. |
| `aggregationInterval` | string enum | — |
| `aggregationLevel` | string enum | — |

### `Array`

- An ordered collection of elements of arbitrary count.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `element` | array<ValueProto> | The elements of the array. |

### `Artifact`

- Artifacts are the container for task completed results. These are similar to Messages but are intended to be the product of a task, as opposed to point-to-point communication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Unique identifier (e.g. UUID) for the artifact. It must be at least unique within a task. |
| `description` | string | A human readable description of the artifact, optional. |
| `extensions` | array<string> | The URIs of extensions that are present or contributed to this Artifact. |
| `metadata` | object | Optional metadata included with the artifact. |
| `name` | string | A human readable name for the artifact. |
| `parts` | array<Part> | The content of the artifact. |

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

### `AuthenticationInfo`

- Defines authentication details, used for push notifications.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `credentials` | string | Optional credentials |
| `schemes` | array<string> | Supported authentication schemes - e.g. Basic, Bearer, etc |

### `AuthorizationCodeOAuthFlow`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationUrl` | string | The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS |
| `refreshUrl` | string | The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS. |
| `scopes` | object | The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty. |
| `tokenUrl` | string | The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS. |

### `BillingAccount`

- A billing account in the Google Cloud Console (https://console.cloud.google.com/). You can assign a billing account to one or more projects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | Optional. The currency in which the billing account is billed and charged, represented as an ISO 4217 code such as `USD`. Billing account currency is determined at the time of billing account creation and cannot be updated subsequently, so this field should not be set on update requests. In addition, a subaccount always matches the currency of its parent billing account, so this field should not be set on subaccount creation requests. Clients can read this field to determine the currency of an existing billing account. |
| `displayName` | string | The display name given to the billing account, such as `My Billing Account`. This name is displayed in the Google Cloud Console. |
| `masterBillingAccount` | string | If this account is a subaccount (https://cloud.google.com/billing/docs/concepts), then this will be the resource name of the parent billing account that it is being resold through. Otherwise this will be empty. |
| `name` | string | Output only. The resource name of the billing account. The resource name has the form `billingAccounts/{billing_account_id}`. For example, `billingAccounts/012345-567890-ABCDEF` would be the resource name for billing account `012345-567890-ABCDEF`. |
| `open` | boolean | Output only. True if the billing account is open, and will therefore be charged for any usage on associated projects. False if the billing account is closed, and therefore projects associated with it are unable to use paid services. |
| `parent` | string | Output only. The billing account's parent resource identifier. Use the `MoveBillingAccount` method to update the account's parent resource if it is a organization. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` |

### `BillingData`

- Encapsulates billing data.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `columnInfo` | array<ColumnInfo> | Information about columns. |
| `rows` | array<Row> | Rows. |

### `BillingDataResource`

- Specifies a Billing data resource that can be used for authorization to access billing data.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccount` | string | Optional. If not provided the billing account currently associated with the resource will be used. |
| `resource` | string | Required. Resource name for an entitity that can be used for authorization to access billing data such as `projects/{project}` or `billingAccounts/{billing_account}` |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CancelTaskRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tenant` | string | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `Category`

- Represents the category hierarchy of a SKU.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceFamily` | string | The type of product the SKU refers to. Example: "Compute", "Storage", "Network", "ApplicationServices" etc. |
| `resourceGroup` | string | A group classification for related SKUs. Example: "RAM", "GPU", "Prediction", "Ops", "GoogleEgress" etc. |
| `serviceDisplayName` | string | The display name of the service this SKU belongs to. |
| `usageType` | string | Represents how the SKU is consumed. Example: "OnDemand", "Preemptible", "Commit1Mo", "Commit1Yr" etc. |

### `ClientCredentialsOAuthFlow`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `refreshUrl` | string | The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS. |
| `scopes` | object | The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty. |
| `tokenUrl` | string | The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS. |

### `ColumnInfo`

- Represents a column header.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `column` | string | Name of the column. |

### `DataPart`

- DataPart represents a structured blob. This is most commonly a JSON payload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | object | — |

### `DataSet`

- A dataset used to support an insight, suitable for UI rendering (tables/charts).
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingData` | BillingData | Output only. Actual billing data returned from the Data Mart. Uses the formal message from the Billing Data Service. |
| `queryInfo` | AgenticQueryInfo | Output only. The query used to fetch this data. |
| `suggestedChart` | SuggestedChart | Output only. A suggested chart for the data set, used for UI rendering. |

### `Datetime`

- A datetime value.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `bitFieldDatetimeSeconds` | string (int64) | Represents bit field encoding of year/month/day/hour/minute/second. See class DatetimeValue in civil_time.h for details of encoding. |
| `nanos` | integer (int32) | Non-negative fractions of a second at nanosecond resolution. |

### `Decimal`

- A representation of a decimal value, such as 2.5. Clients may convert values into language-native decimal formats, such as Java's BigDecimal (https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/math/BigDecimal.html) or Python's decimal.Decimal (https://docs.python.org/3/library/decimal.html).
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `value` | string | The decimal value, as a string. The string representation consists of an optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of zero or more decimal digits ("the integer"), optionally followed by a fraction, optionally followed by an exponent. An empty string \*\*should\*\* be interpreted as `0`. The fraction consists of a decimal point followed by zero or more decimal digits. The string must contain at least one digit in either the integer or the fraction. The number formed by the sign, the integer and the fraction is referred to as the significand. The exponent consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one or more decimal digits. Services \*\*should\*\* normalize decimal values before storing them by: - Removing an explicitly-provided `+` sign (`+2.5` -> `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). - Coercing the exponent character to upper-case, with explicit sign (`2.5e8` -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` -> `2.5`). Services \*\*may\*\* perform additional normalization based on its own needs and the internal decimal implementation selected, such as shifting the decimal point and exponent value together (example: `2.5E-1` <-> `0.25`). Additionally, services \*\*may\*\* preserve trailing zeroes in the fraction to indicate increased precision, but are not required to do so. Note that only the `.` character is supported to divide the integer and the fraction; `,` \*\*should not\*\* be supported regardless of locale. Additionally, thousand separators \*\*should not\*\* be supported. If a service does support them, values \*\*must\*\* be normalized. The ENBF grammar is: DecimalString = '' \| \[Sign\] Significand \[Exponent\]; Sign = '+' \| '-'; Significand = Digits '.' \| \[Digits\] '.' Digits; Exponent = ('e' \| 'E') \[Sign\] Digits; Digits = { '0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' }; Services \*\*should\*\* clearly document the range of supported values, the maximum supported precision (total number of digits), and, if applicable, the scale (number of digits after the decimal point), as well as how it behaves when receiving out-of-bounds values. Services \*\*may\*\* choose to accept values passed as input even when the value has a higher precision or scale than the service supports, and \*\*should\*\* round the value to fit the supported scale. Alternatively, the service \*\*may\*\* error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be lost. Services \*\*should\*\* error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if the service receives a value outside of the supported range. |

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

### `FilePart`

- FilePart represents the different ways files can be provided. If files are small, directly feeding the bytes is supported via file_with_bytes. If the file is large, the agent should read the content as appropriate directly from the file_with_uri source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileWithBytes` | string (byte) | — |
| `fileWithUri` | string | — |
| `mimeType` | string | — |
| `name` | string | — |

### `FinalResult`

- Encapsulates all structured data and the completed summary.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `dataSets` | array<DataSet> | Output only. Data sets used to support the insights, suitable for UI rendering (tables/charts). |
| `fullAnalysis` | string | Output only. Contains the full natural language analysis, including thoughts, reasoning, and references. |
| `insights` | array<Insight> | Output only. A list of discrete insights gleaned from the data. |
| `interopLinks` | array<InteropLink> | Output only. Links to interoperable tools (e.g., pre-filtered Cost Reports or BQE queries). |
| `suggestedQueries` | array<SuggestedQuery> | Output only. A list of suggested follow-up queries for the user. |
| `summary` | string | Output only. The full natural language summary (re-sent for consistency). |

### `GenerateInsightsRequest`

- Request for GenerateInsights.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. Filters cost data by service id. Follows https://google.aip.dev/160 for the filter syntax. eg. filter: "service = 'C7E2-9256-1C43'" |
| `overriddenMaxIterationCounts` | integer (int32) | Optional. Overrides the maximum iterations for any selected strategy. |
| `parents` | array<BillingDataResource> | Optional. The billing account or projects to analyze. |
| `prompt` | string | Required. The natural language prompt from the user. |
| `userContext` | UserContext | Optional. Additional context for personalization (e.g., user persona, role). |

### `GenerateInsightsResponse`

- Response for GenerateInsights.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `finalResult` | FinalResult | Output only. The final structured results and metadata. Usually sent as the final message in the stream. |
| `rejection` | Rejection | Output only. The request was rejected (e.g. out of scope). |
| `summaryChunk` | string | Output only. A chunk of the natural language summary (customer-facing). The UI can append these chunks to provide a real-time "typing" effect. |
| `thoughtChunk` | string | Output only. A chunk of the agent's internal reasoning process. The UI can use this to render a "Thinking..." log or status. |

### `GeoTaxonomy`

- Encapsulates the geographic taxonomy data for a sku.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `regions` | array<string> | The list of regions associated with a sku. Empty for Global skus, which are associated with all Google Cloud regions. |
| `type` | string enum | The type of Geo Taxonomy: GLOBAL, REGIONAL, or MULTI_REGIONAL. |

### `GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo`

- Encapsulates the aggregation information such as aggregation level and interval for a billing account price.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `interval` | string enum | Interval at which usage is aggregated to compute cost. Example: "MONTHLY" interval indicates that usage is aggregated every month. |
| `level` | string enum | Level at which usage is aggregated to compute cost. Example: "ACCOUNT" level indicates that usage is aggregated across all projects in a single account. |

### `GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice`

- Encapsulates the latest price for a billing account SKU.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | ISO-4217 currency code for the price. |
| `name` | string | Resource name for the latest billing account price. |
| `priceReason` | GoogleCloudBillingBillingaccountpricesV1betaPriceReason | Background information on the origin of the price. |
| `rate` | GoogleCloudBillingBillingaccountpricesV1betaRate | Rate price metadata. Billing account SKUs with `Rate` price are offered by pricing tiers. The price can have 1 or more rate pricing tiers. |
| `valueType` | string | Type of the price. The possible values are: \["unspecified", "rate"\]. |

### `GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice`

- Encapsulates a default price which is the current list price.
- Version: v1beta

### `GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount`

- Encapsulates a discount off the list price, anchored to the list price as of a fixed time.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `discountPercent` | Decimal | Percentage of the fixed discount. |
| `discountScopeType` | string | Type of the fixed discount scope which indicates the source of the discount. It can have values such as 'unspecified' and 'sku-group'. |
| `fixTime` | string (google-datetime) | Time that the fixed discount is anchored to. |
| `skuGroup` | string | SKU group where the fixed discount comes from. |

### `GoogleCloudBillingBillingaccountpricesV1betaFixedPrice`

- Encapsulates a set fixed price applicable during the terms of a contract agreement.
- Version: v1beta

### `GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount`

- Encapsulates a discount off the current list price, not anchored to any list price as of a fixed time.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `discountPercent` | Decimal | Percentage of the floating discount. |
| `discountScopeType` | string | Type of the floating discount scope which indicates the source of the discount. It can have values such as 'unspecified' and 'sku-group'. |
| `skuGroup` | string | SKU group where the floating discount comes from. |

### `GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse`

- Response message for ListBillingAccountPrices.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccountPrices` | array<GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice> | The returned billing account prices. |
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling`

- Encapsulates a contract feature that the list price (DefaultPrice) will be used for the price if the current list price drops lower than the custom fixed price. Available to new contracts after March 21, 2022. Applies to all fixed price SKUs in the contract, including FixedPrice, FixedDiscount, MigratedPrice, and MergedPrice.
- Version: v1beta

### `GoogleCloudBillingBillingaccountpricesV1betaMergedPrice`

- Encapsulates a price after merging from multiple sources. With merged tiers, each individual tier can be from a different source with different discount types.
- Version: v1beta

### `GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice`

- Encapsulates a price migrated from other SKUs.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `sourceSku` | string | Source SKU where the discount is migrated from. Format: billingAccounts/{billing_account}/skus/{sku} |

### `GoogleCloudBillingBillingaccountpricesV1betaPriceReason`

- Encapsulates a price reason which contains background information about the origin of the price.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `defaultPrice` | GoogleCloudBillingBillingaccountpricesV1betaDefaultPrice | Default price which is the current list price. |
| `fixedDiscount` | GoogleCloudBillingBillingaccountpricesV1betaFixedDiscount | Discount off the list price, anchored to the list price as of a fixed time. |
| `fixedPrice` | GoogleCloudBillingBillingaccountpricesV1betaFixedPrice | Fixed price applicable during the terms of a contract agreement. |
| `floatingDiscount` | GoogleCloudBillingBillingaccountpricesV1betaFloatingDiscount | Discount off the current list price, not anchored to any list price as of a fixed time. |
| `listPriceAsCeiling` | GoogleCloudBillingBillingaccountpricesV1betaListPriceAsCeiling | Contract feature that the list price (DefaultPrice) will be used for the price if the current list price drops lower than the custom fixed price. Available to new contracts after March 21, 2022. Applies to all fixed price SKUs in the contract, including FixedPrice, FixedDiscount, MigratedPrice, and MergedPrice. |
| `mergedPrice` | GoogleCloudBillingBillingaccountpricesV1betaMergedPrice | Price after merging from multiple sources. |
| `migratedPrice` | GoogleCloudBillingBillingaccountpricesV1betaMigratedPrice | Price migrated from other SKUs. |
| `type` | string | Type of the price reason. It can have values such as 'unspecified', 'default-price', 'fixed-price', 'fixed-discount', 'floating-discount', 'migrated-price', 'merged-price', 'list-price-as-ceiling'. |

### `GoogleCloudBillingBillingaccountpricesV1betaRate`

- Encapsulates a `Rate` price. Billing account SKUs with `Rate` price are offered by pricing tiers. The price have 1 or more rate pricing tiers.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `aggregationInfo` | GoogleCloudBillingBillingaccountpricesV1betaAggregationInfo | Aggregation info for tiers such as aggregation level and interval. |
| `tiers` | array<GoogleCloudBillingBillingaccountpricesV1betaRateTier> | All tiers associated with the `Rate` price. |
| `unitInfo` | GoogleCloudBillingBillingaccountpricesV1betaUnitInfo | Unit info such as name and quantity. |

### `GoogleCloudBillingBillingaccountpricesV1betaRateTier`

- Encapsulates a rate price tier.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `contractPrice` | Money | Negotiated contract price specific for a billing account. |
| `effectiveDiscountPercent` | Decimal | Percentage of effective discount calculated using the current list price per pricing tier. Formula used: effective_discount_percent = (list_price - contract_price) / list_price × 100 If list_price and contract_price are zero, this field is the same as `discount_percent` of FixedDiscount and FloatingDiscount. If your contract does NOT have the feature LIST_PRICE_AS_CEILING enabled, the effective_discount_percent can be negative if the SKU has a FixedDiscount and the current list price is lower than the list price on the date of the contract agreement. See the `FixedDiscount.fix_time` on when the discount was set. If you have questions regarding pricing per SKU, contact your Account team for more details. |
| `listPrice` | Money | List price of one tier. |
| `startAmount` | Decimal | Lower bound amount for a tier. Tiers 0-100, 100-200 will be represented with two tiers with `start_amount` 0 and 100. |

### `GoogleCloudBillingBillingaccountpricesV1betaUnitInfo`

- Encapsulates the unit information for a Rate
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `unit` | string | Shorthand for the unit. Example: GiBy.mo. |
| `unitDescription` | string | Human-readable description of the unit. Example: gibibyte month. |
| `unitQuantity` | Decimal | Unit quantity for the tier. Example: if the RateTier price is $1 per 1000000 Bytes, then `unit_quantity` is set to 1000000. |

### `GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService`

- Encapsulates a Google Cloud service visible to a billing account.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Description of the BillingAccountService. Example: "BigQuery", "Compute Engine". |
| `name` | string | Resource name for the BillingAccountService. Example: "billingAccounts/012345-567890-ABCDEF/services/DA34-426B-A397". |
| `serviceId` | string | Identifier for the service. It is the string after the collection identifier "services/". Example: "DA34-426B-A397". |

### `GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse`

- Response message for ListBillingAccountServices.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccountServices` | array<GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService> | The returned billing account services. |
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup`

- Encapsulates a stock keeping (SKU) group visible to a billing account. A SKU group represents a collection of SKUs that are related to each other. For example, the `AI Platform APIs` SKU group includes SKUs from the Cloud Dialogflow API, the Cloud Text-to-Speech API, and additional related APIs.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Description of the BillingAccountSkuGroup. Example: "A2 VMs (1 Year CUD)". |
| `name` | string | Resource name for the BillingAccountSkuGroup. Example: "billingAccounts/012345-567890-ABCDEF/skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301". |

### `GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse`

- Response message for ListBillingAccountSkuGroups.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccountSkuGroups` | array<GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup> | The returned publicly listed billing account SKU groups. |
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku`

- Encapsulates a SKU that is part of a billing account SKU group.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccountService` | string | BillingAccountService that the BillingAccountSkuGroupSku belongs to. |
| `displayName` | string | Description of the BillingAccountSkuGroupSku. Example: "A2 Instance Core running in Hong Kong". |
| `geoTaxonomy` | GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy | Geographic metadata that applies to the BillingAccountSkuGroupSku. |
| `name` | string | Resource name for the BillingAccountSkuGroupSku. Example: "billingAccounts/012345-567890-ABCDEF/skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301/skus/AA95-CD31-42FE". |
| `productTaxonomy` | GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy | List of product categories that apply to the BillingAccountSkuGroupSku. |
| `skuId` | string | Unique identifier for the SKU. It is the string after the collection identifier "skus/" Example: "AA95-CD31-42FE". |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomy`

- Encapsulates geographic metadata, such as regions and multi-regions like `us-east4` or `European Union`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `globalMetadata` | GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal | Global geographic metadata with no regions. |
| `multiRegionalMetadata` | GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional | Multi-regional geographic metadata with 2 or more regions. |
| `regionalMetadata` | GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional | Regional geographic metadata with 1 region. |
| `type` | string enum | Type of geographic taxonomy associated with the billing account SKU group SKU. |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyGlobal`

- Encapsulates a global geographic taxonomy.
- Version: v1beta

### `GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyMultiRegional`

- Encapsulates a multi-regional geographic taxonomy.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `regions` | array<GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion> | Google Cloud regions associated with the multi-regional geographic taxonomy. |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion`

- Encapsulates a Google Cloud region.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `region` | string | Description of a Google Cloud region. Example: "us-west2". |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegional`

- Encapsulates a regional geographic taxonomy.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `region` | GoogleCloudBillingBillingaccountskugroupskusV1betaGeoTaxonomyRegion | Google Cloud region associated with the regional geographic taxonomy. |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse`

- Response message for ListBillingAccountSkuGroupSkus.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccountSkuGroupSkus` | array<GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku> | The returned billing account SKU group SKUs. |
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaProductTaxonomy`

- Encapsulates product categories, such as `Serverless`, `Cloud Run`, `TaskQueue`, and others.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `taxonomyCategories` | array<GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory> | All product categories that the billing account SKU group SKU belong to. |

### `GoogleCloudBillingBillingaccountskugroupskusV1betaTaxonomyCategory`

- Encapsulates a product category.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `category` | string | Name of the product category. |

### `GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku`

- Encapsulates a stock keeping unit (SKU) visible to a billing account. A SKU distinctly identifies a resource that you can purchase. For a list of available SKUs, see SKUs (https://cloud.google.com/skus).
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccountService` | string | BillingAccountService that the BillingAccountSku belongs to. |
| `displayName` | string | Description of the BillingAccountSku. Example: "A2 Instance Core running in Hong Kong". |
| `geoTaxonomy` | GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy | Geographic metadata that applies to the BillingAccountSku. |
| `name` | string | Resource name for the BillingAccountSku. Example: "billingAccounts/012345-567890-ABCDEF/skus/AA95-CD31-42FE". |
| `productTaxonomy` | GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy | List of product categories that apply to the BillingAccountSku. |
| `skuId` | string | Unique identifier for the SKU. It is the string after the collection identifier "skus/" Example: "AA95-CD31-42FE". |

### `GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomy`

- Encapsulates geographic metadata, such as regions and multi-regions like `us-east4` or `European Union`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `globalMetadata` | GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal | Global geographic metadata with no regions. |
| `multiRegionalMetadata` | GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional | Multi-regional geographic metadata with 2 or more regions. |
| `regionalMetadata` | GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional | Regional geographic metadata with 1 region. |
| `type` | string enum | Type of geographic taxonomy associated with the billing account SKU. |

### `GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyGlobal`

- Encapsulates a global geographic taxonomy.
- Version: v1beta

### `GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyMultiRegional`

- Encapsulates a multi-regional geographic taxonomy.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `regions` | array<GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion> | Google Cloud regions associated with the multi-regional geographic taxonomy. |

### `GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion`

- Encapsulates a Google Cloud region.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `region` | string | Description of a Google Cloud region. Example: "us-west2". |

### `GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegional`

- Encapsulates a regional geographic taxonomy.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `region` | GoogleCloudBillingBillingaccountskusV1betaGeoTaxonomyRegion | Google Cloud region associated with the regional geographic taxonomy. |

### `GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse`

- Response message for ListBillingAccountSkus.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billingAccountSkus` | array<GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku> | The returned billing account SKUs. |
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |

### `GoogleCloudBillingBillingaccountskusV1betaProductTaxonomy`

- Encapsulates product categories, such as `Serverless`, `Cloud Run`, `TaskQueue`, and others.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `taxonomyCategories` | array<GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory> | All product categories that the billing account SKU belong to. |

### `GoogleCloudBillingBillingaccountskusV1betaTaxonomyCategory`

- Encapsulates a product category.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `category` | string | Name of the product category. |

### `GoogleCloudBillingPricesV1betaAggregationInfo`

- Encapsulates the aggregation information such as aggregation level and interval for a price.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `interval` | string enum | Interval at which usage is aggregated to compute cost. Example: "MONTHLY" interval indicates that usage is aggregated every month. |
| `level` | string enum | Level at which usage is aggregated to compute cost. Example: "ACCOUNT" level indicates that usage is aggregated across all projects in a single account. |

### `GoogleCloudBillingPricesV1betaListPricesResponse`

- Response message for ListPrices.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |
| `prices` | array<GoogleCloudBillingPricesV1betaPrice> | The returned publicly listed prices. |

### `GoogleCloudBillingPricesV1betaPrice`

- Encapsulates the latest price for a SKU.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | ISO-4217 currency code for the price. |
| `name` | string | Resource name for the latest price. |
| `rate` | GoogleCloudBillingPricesV1betaRate | Rate price metadata. SKUs with `Rate` price are offered by pricing tiers. The price can have 1 or more rate pricing tiers. |
| `valueType` | string | Type of the price. It can have values: \["unspecified", "rate"\]. |

### `GoogleCloudBillingPricesV1betaRate`

- Encapsulates a `Rate` price. SKUs with `Rate` price are offered by pricing tiers. The price have 1 or more rate pricing tiers.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `aggregationInfo` | GoogleCloudBillingPricesV1betaAggregationInfo | Aggregation info for tiers such as aggregation level and interval. |
| `tiers` | array<GoogleCloudBillingPricesV1betaRateTier> | All tiers associated with the `Rate` price. |
| `unitInfo` | GoogleCloudBillingPricesV1betaUnitInfo | Unit info such as name and quantity. |

### `GoogleCloudBillingPricesV1betaRateTier`

- Encapsulates a rate price tier.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `listPrice` | Money | List price of one tier. |
| `startAmount` | Decimal | Lower bound amount for a tier. Tiers 0-100, 100-200 will be represented with two tiers with `start_amount` 0 and 100. |

### `GoogleCloudBillingPricesV1betaUnitInfo`

- Encapsulates the unit information for a Rate
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `unit` | string | Shorthand for the unit. Example: GiBy.mo. |
| `unitDescription` | string | Human-readable description of the unit. Example: gibibyte month. |
| `unitQuantity` | Decimal | Unit quantity for the tier. Example: if the RateTier price is $1 per 1000000 Bytes, then `unit_quantity` is set to 1000000. |

### `GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse`

- Response message for ListSkuGroups.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |
| `skuGroups` | array<GoogleCloudBillingSkugroupsV1betaSkuGroup> | The returned publicly listed SKU groups. |

### `GoogleCloudBillingSkugroupsV1betaSkuGroup`

- Encapsulates a publicly listed stock keeping unit (SKU) group. A SKU group represents a collection of SKUs that are related to each other. For example, the `AI Platform APIs` SKU group includes SKUs from the Cloud Dialogflow API, the Cloud Text-to-Speech API, and additional related APIs.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Description of the SKU group. Example: "A2 VMs (1 Year CUD)". |
| `name` | string | Resource name for the SKU group. Example: "skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301". |

### `GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy`

- Encapsulates geographic metadata, such as regions and multi-regions like `us-east4` or `European Union`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `globalMetadata` | GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal | Global geographic metadata with no regions. |
| `multiRegionalMetadata` | GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional | Multi-regional geographic metadata with 2 or more regions. |
| `regionalMetadata` | GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional | Regional geographic metadata with 1 region. |
| `type` | string enum | Type of geographic taxonomy associated with the SKU group SKU. |

### `GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyGlobal`

- Encapsulates a global geographic taxonomy.
- Version: v1beta

### `GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyMultiRegional`

- Encapsulates a multi-regional geographic taxonomy.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `regions` | array<GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion> | Google Cloud regions associated with the multi-regional geographic taxonomy. |

### `GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion`

- Encapsulates a Google Cloud region.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `region` | string | Description of a Google Cloud region. Example: "us-west2". |

### `GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegional`

- Encapsulates a regional geographic taxonomy.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `region` | GoogleCloudBillingSkugroupskusV1betaGeoTaxonomyRegion | Google Cloud region associated with the regional geographic taxonomy. |

### `GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse`

- Response message for ListSkuGroupSkus.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token that can be sent as `page_token` in the subsequent request to retrieve the next page. If this field is empty, there are no subsequent pages. |
| `skuGroupSkus` | array<GoogleCloudBillingSkugroupskusV1betaSkuGroupSku> | The returned SKU group SKUs. |

### `GoogleCloudBillingSkugroupskusV1betaProductTaxonomy`

- Encapsulates product categories, such as `Serverless`, `Cloud Run`, `TaskQueue`, and others.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `taxonomyCategories` | array<GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory> | All product categories that the SKU group SKU belongs to. |

### `GoogleCloudBillingSkugroupskusV1betaSkuGroupSku`

- Encapsulates a publicly listed stock keeping unit (SKU) that is part of a publicly listed SKU group. A SKU group represents a collection of SKUs that are related to each other. For example, the `AI Platform APIs` SKU group includes SKUs from the Cloud Dialogflow API, the Cloud Text-to-Speech API, and additional related APIs.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Description of the SkuGroupSku. Example: "A2 Instance Core running in Hong Kong". |
| `geoTaxonomy` | GoogleCloudBillingSkugroupskusV1betaGeoTaxonomy | Geographic metadata that applies to the SkuGroupSku. |
| `name` | string | Resource name for the SkuGroupSku. Example: "skuGroups/0e6403d1-4694-44d2-a696-7a78b1a69301/skus/AA95-CD31-42FE". |
| `productTaxonomy` | GoogleCloudBillingSkugroupskusV1betaProductTaxonomy | List of product categories that apply to the SkuGroupSku. |
| `service` | string | Service that the SkuGroupSku belongs to. |
| `skuId` | string | Unique identifier for the SKU. It is the string after the collection identifier "skus/" Example: "AA95-CD31-42FE". |

### `GoogleCloudBillingSkugroupskusV1betaTaxonomyCategory`

- Encapsulates a product category.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `category` | string | Name of the product category. |

### `HTTPAuthSecurityScheme`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bearerFormat` | string | A hint to the client to identify how the bearer token is formatted. Bearer tokens are usually generated by an authorization server, so this information is primarily for documentation purposes. |
| `description` | string | Description of this security scheme. |
| `scheme` | string | The name of the HTTP Authentication scheme to be used in the Authorization header as defined in RFC7235. The values used SHOULD be registered in the IANA Authentication Scheme registry. The value is case-insensitive, as defined in RFC7235. |

### `ImplicitOAuthFlow`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationUrl` | string | The authorization URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS |
| `refreshUrl` | string | The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS. |
| `scopes` | object | The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty. |

### `Insight`

- e.g. insight: title: "Cost Increase (The Explanation)" description: "Your cost increase was driven by Vertex AI Online Prediction in us-central1..." severity: INFO
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. The description of the insight. |
| `severity` | string enum | Output only. The severity of the insight, used for UI rendering (e.g., color-coding). |
| `title` | string | Output only. The title of the insight. |

### `InteropLink`

- A link to interoperable tools (e.g., pre-filtered Cost Reports, BQE queries).
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `label` | string | Output only. The label of the link, suitable for UI rendering. |
| `linkType` | string enum | Output only. The type of the interop link, e.g., "COST_REPORT", "BQE_QUERY", etc. |
| `url` | string | Output only. The URL of the link. |

### `ListBillingAccountsResponse`

- Response message for `ListBillingAccounts`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccounts` | array<BillingAccount> | A list of billing accounts. |
| `nextPageToken` | string | A token to retrieve the next page of results. To retrieve the next page, call `ListBillingAccounts` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. |

### `ListProjectBillingInfoResponse`

- Request message for `ListProjectBillingInfoResponse`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. To retrieve the next page, call `ListProjectBillingInfo` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. |
| `projectBillingInfo` | array<ProjectBillingInfo> | A list of `ProjectBillingInfo` resources representing the projects associated with the billing account. |

### `ListServicesResponse`

- Response message for `ListServices`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. To retrieve the next page, call `ListServices` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. |
| `services` | array<Service> | A list of services. |

### `ListSkusResponse`

- Response message for `ListSkus`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. To retrieve the next page, call `ListSkus` again with the `page_token` field set to this value. This field is empty if there are no more results to retrieve. |
| `skus` | array<Sku> | The list of public SKUs of the given service. |

### `ListTaskPushNotificationConfigResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configs` | array<TaskPushNotificationConfig> | The list of push notification configurations. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `Map`

- An unordered mapping from key to value, represented as a collection of map entries.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `entry` | array<MapEntry> | Represents the map entries in the map. |

### `MapEntry`

- A single entry in a Map, representing the mapping between `key` and `value`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `key` | ValueProto | Represents the serialized map key for the entry. |
| `value` | ValueProto | Represents the serialized map value of the entry. |

### `Message`

- Message is one unit of communication between client and server. It is associated with a context and optionally a task. Since the server is responsible for the context definition, it must always provide a context_id in its messages. The client can optionally provide the context_id if it knows the context to associate the message to. Similarly for task_id, except the server decides if a task is created and whether to include the task_id.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | array<Part> | protolint:disable REPEATED_FIELD_NAMES_PLURALIZED Content is the container of the message content. |
| `contextId` | string | The context id of the message. This is optional and if set, the message will be associated with the given context. |
| `extensions` | array<string> | The URIs of extensions that are present or contributed to this Message. |
| `messageId` | string | The unique identifier (e.g. UUID)of the message. This is required and created by the message creator. |
| `metadata` | object | protolint:enable REPEATED_FIELD_NAMES_PLURALIZED Any optional metadata to provide along with the message. |
| `role` | string enum | A role for the message. |
| `taskId` | string | The task id of the message. This is optional and if set, the message will be associated with the given task. |

### `Money`

- Represents an amount of money with its currency type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | The three-letter currency code defined in ISO 4217. |
| `nanos` | integer (int32) | Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. |
| `units` | string (int64) | The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. |

### `MoveBillingAccountRequest`

- Request message for `MoveBillingAccount` RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationParent` | string | Required. The resource name of the Organization to move the billing account under. Must be of the form `organizations/{organization_id}`. |

### `MutualTlsSecurityScheme`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of this security scheme. |

### `OAuth2SecurityScheme`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of this security scheme. |
| `flows` | OAuthFlows | An object containing configuration information for the flow types supported |
| `oauth2MetadataUrl` | string | URL to the oauth2 authorization server metadata RFC8414 (https://datatracker.ietf.org/doc/html/rfc8414). TLS is required. |

### `OAuthFlows`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizationCode` | AuthorizationCodeOAuthFlow | — |
| `clientCredentials` | ClientCredentialsOAuthFlow | — |
| `implicit` | ImplicitOAuthFlow | — |
| `password` | PasswordOAuthFlow | — |

### `OpenIdConnectSecurityScheme`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of this security scheme. |
| `openIdConnectUrl` | string | Well-known URL to discover the \[\[OpenID-Connect-Discovery\]\] provider metadata. |

### `Part`

- Part represents a container for a section of communication content. Parts can be purely textual, some sort of file (image, video, etc) or a structured data blob (i.e. JSON).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | DataPart | — |
| `file` | FilePart | — |
| `metadata` | object | Optional metadata associated with this part. |
| `text` | string | — |

### `PasswordOAuthFlow`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `refreshUrl` | string | The URL to be used for obtaining refresh tokens. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS. |
| `scopes` | object | The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty. |
| `tokenUrl` | string | The token URL to be used for this flow. This MUST be in the form of a URL. The OAuth2 standard requires the use of TLS. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PricingExpression`

- Expresses a mathematical pricing formula. For Example:- `usage_unit: GBy` `tiered_rates:` `[start_usage_amount: 20, unit_price: $10]` `[start_usage_amount: 100, unit_price: $5]` The above expresses a pricing formula where the first 20GB is free, the next 80GB is priced at $10 per GB followed by $5 per GB for additional usage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseUnit` | string | The base unit for the SKU which is the unit used in usage exports. Example: "By" |
| `baseUnitConversionFactor` | number (double) | Conversion factor for converting from price per usage_unit to price per base_unit, and start_usage_amount to start_usage_amount in base_unit. unit_price / base_unit_conversion_factor = price per base_unit. start_usage_amount \* base_unit_conversion_factor = start_usage_amount in base_unit. |
| `baseUnitDescription` | string | The base unit in human readable form. Example: "byte". |
| `displayQuantity` | number (double) | The recommended quantity of units for displaying pricing info. When displaying pricing info it is recommended to display: (unit_price \* display_quantity) per display_quantity usage_unit. This field does not affect the pricing formula and is for display purposes only. Example: If the unit_price is "0.0001 USD", the usage_unit is "GB" and the display_quantity is "1000" then the recommended way of displaying the pricing info is "0.10 USD per 1000 GB" |
| `tieredRates` | array<TierRate> | The list of tiered rates for this pricing. The total cost is computed by applying each of the tiered rates on usage. This repeated list is sorted by ascending order of start_usage_amount. |
| `usageUnit` | string | The short hand for unit of usage this pricing is specified in. Example: usage_unit of "GiBy" means that usage is specified in "Gibi Byte". |
| `usageUnitDescription` | string | The unit of usage in human readable form. Example: "gibi byte". |

### `PricingInfo`

- Represents the pricing information for a SKU at a single point of time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationInfo` | AggregationInfo | Aggregation Info. This can be left unspecified if the pricing expression doesn't require aggregation. |
| `currencyConversionRate` | number (double) | Conversion rate used for currency conversion, from USD to the currency specified in the request. This includes any surcharge collected for billing in non USD currency. If a currency is not specified in the request this defaults to 1.0. Example: USD \* currency_conversion_rate = JPY |
| `effectiveTime` | string (google-datetime) | The timestamp from which this pricing was effective within the requested time range. This is guaranteed to be greater than or equal to the start_time field in the request and less than the end_time field in the request. If a time range was not specified in the request this field will be equivalent to a time within the last 12 hours, indicating the latest pricing info. |
| `pricingExpression` | PricingExpression | Expresses the pricing formula. See `PricingExpression` for an example. |
| `summary` | string | An optional human readable summary of the pricing information, has a maximum length of 256 characters. |

### `ProjectBillingInfo`

- Encapsulation of billing information for a Google Cloud Console project. A project has at most one associated billing account at a time (but a billing account can be assigned to multiple projects).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccountName` | string | The resource name of the billing account associated with the project, if any. For example, `billingAccounts/012345-567890-ABCDEF`. |
| `billingEnabled` | boolean | Output only. True if the project is associated with an open billing account, to which usage on the project is charged. False if the project is associated with a closed billing account, or no billing account at all, and therefore cannot use paid services. |
| `name` | string | Output only. The resource name for the `ProjectBillingInfo`; has the form `projects/{project_id}/billingInfo`. For example, the resource name for the billing information for project `tokyo-rain-123` would be `projects/tokyo-rain-123/billingInfo`. |
| `projectId` | string | Output only. The ID of the project that this `ProjectBillingInfo` represents, such as `tokyo-rain-123`. This is a convenience field so that you don't need to parse the `name` field to obtain a project ID. |

### `PushNotificationConfig`

- Configuration for setting up push notifications for task updates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authentication` | AuthenticationInfo | Information about the authentication to sent with the notification |
| `id` | string | A unique identifier (e.g. UUID) for this push notification. |
| `token` | string | Token unique for this task/session |
| `url` | string | Url to send the notification too |

### `Range`

- A range of values, bounded by the values 'start' (inclusive) and 'end' (exclusive). A range has an element type, and values must be of this element type. A range is contiguous, ie it contains all values of the given element type starting at 'start' and ending before 'end'. A "null" value on start or end represents an unbounded start or end value respectively. Start and end values must always be present.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `end` | ValueProto | Represents the end of the range. |
| `start` | ValueProto | Represents the start of the range. |

### `Rejection`

- Encapsulates details about why a request was rejected.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayMessage` | string | Output only. A user-facing message explaining the rejection. |
| `reason` | string enum | Output only. The reason for the rejection. |

### `Row`

- Represents a row in the query result.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `values` | array<ValueProto> | Values for a row in the column order. |

### `Security`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `schemes` | object | — |

### `SecurityScheme`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiKeySecurityScheme` | APIKeySecurityScheme | — |
| `httpAuthSecurityScheme` | HTTPAuthSecurityScheme | — |
| `mtlsSecurityScheme` | MutualTlsSecurityScheme | — |
| `oauth2SecurityScheme` | OAuth2SecurityScheme | — |
| `openIdConnectSecurityScheme` | OpenIdConnectSecurityScheme | — |

### `SendMessageConfiguration`

- Configuration of a send message request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceptedOutputModes` | array<string> | The output modes that the agent is expected to respond with. |
| `blocking` | boolean | If true, the message will be blocking until the task is completed. If false, the message will be non-blocking and the task will be returned immediately. It is the caller's responsibility to check for any task updates. |
| `historyLength` | integer (int32) | The maximum number of messages to include in the history. if 0, the history will be unlimited. |
| `pushNotification` | PushNotificationConfig | A configuration of a webhook that can be used to receive updates |

### `SendMessageRequest`

- /////////// Request Messages ///////////
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configuration` | SendMessageConfiguration | Configuration for the send request. |
| `message` | Message | Required. The message to send to the agent. |
| `metadata` | object | Optional metadata for the request. |
| `tenant` | string | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `SendMessageResponse`

- ////// Response Messages ///////////
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | Message | — |
| `task` | Task | — |

### `Service`

- Encapsulates a single service in Google Cloud Platform.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `businessEntityName` | string | The business under which the service is offered. Ex. "businessEntities/GCP", "businessEntities/Maps" |
| `displayName` | string | A human readable display name for this service. |
| `name` | string | The resource name for the service. Example: "services/6F81-5844-456A" |
| `serviceId` | string | The identifier for the service. Example: "6F81-5844-456A" |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Sku`

- Encapsulates a single SKU in Google Cloud
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | Category | The category hierarchy of this SKU, purely for organizational purpose. |
| `description` | string | A human readable description of the SKU, has a maximum length of 256 characters. |
| `geoTaxonomy` | GeoTaxonomy | The geographic taxonomy for this sku. |
| `name` | string | The resource name for the SKU. Example: "services/6F81-5844-456A/skus/D041-B8A1-6E0B" |
| `pricingInfo` | array<PricingInfo> | A timeline of pricing info for this SKU in chronological order. |
| `serviceProviderName` | string | Identifies the service provider. This is 'Google' for first party services in Google Cloud Platform. |
| `serviceRegions` | array<string> | List of service regions this SKU is offered at. Example: "asia-east1" Service regions can be found at https://cloud.google.com/about/locations/ |
| `skuId` | string | The identifier for the SKU. Example: "D041-B8A1-6E0B" |

### `StreamResponse`

- The stream response for a message. The stream should be one of the following sequences: If the response is a message, the stream should contain one, and only one, message and then close If the response is a task lifecycle, the first response should be a Task object followed by zero or more TaskStatusUpdateEvents and TaskArtifactUpdateEvents. The stream should complete when the Task if in an interrupted or terminal state. A stream that ends before these conditions are met are
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactUpdate` | TaskArtifactUpdateEvent | — |
| `message` | Message | — |
| `statusUpdate` | TaskStatusUpdateEvent | — |
| `task` | Task | — |

### `StringList`

- protolint:disable REPEATED_FIELD_NAMES_PLURALIZED
- Version: v1

| Field | Type | Description |
|---|---|---|
| `list` | array<string> | — |

### `Struct`

- A collection of fields. The count, order, and type of the fields is determined by the type associated with this value.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `field` | array<ValueProto> | The fields in the struct |

### `SuggestedChart`

- A suggested chart for the data set, used for UI rendering.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `chartTitle` | string | The title of the chart. |
| `chartType` | string enum | The type of the chart. |
| `seriesField` | string | The field used for the series (e.g., color-coding). Optional, but recommended for time-series data. |
| `xAxisField` | string | The field used for the x-axis. |
| `xAxisLabel` | string | The label of the x-axis. |
| `yAxisField` | string | The field used for the y-axis. |
| `yAxisLabel` | string | The label of the y-axis. |

### `SuggestedQuery`

- A suggested follow-up query for the user.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `query` | string | The natural language query. |

### `Task`

- Task is the core unit of action for A2A. It has a current status and when results are created for the task they are stored in the artifact. If there are multiple turns for a task, these are stored in history.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifacts` | array<Artifact> | A set of output artifacts for a Task. |
| `contextId` | string | Unique identifier (e.g. UUID) for the contextual collection of interactions (tasks and messages). Created by the A2A server. |
| `history` | array<Message> | protolint:disable REPEATED_FIELD_NAMES_PLURALIZED The history of interactions from a task. |
| `id` | string | Unique identifier (e.g. UUID) for the task, generated by the server for a new task. |
| `metadata` | object | protolint:enable REPEATED_FIELD_NAMES_PLURALIZED A key/value object to store custom metadata about a task. |
| `status` | TaskStatus | The current status of a Task, including state and a message. |

### `TaskArtifactUpdateEvent`

- TaskArtifactUpdateEvent represents a task delta where an artifact has been generated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `append` | boolean | Whether this should be appended to a prior one produced |
| `artifact` | Artifact | The artifact itself |
| `contextId` | string | The id of the context that this task belongs too |
| `lastChunk` | boolean | Whether this represents the last part of an artifact |
| `metadata` | object | Optional metadata associated with the artifact update. |
| `taskId` | string | The id of the task for this artifact |

### `TaskPushNotificationConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name of the config. Format: tasks/{task_id}/pushNotificationConfigs/{config_id} |
| `pushNotificationConfig` | PushNotificationConfig | The push notification configuration details. |

### `TaskStatus`

- A container for the status of a task
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | Message | A message associated with the status. |
| `state` | string enum | The current state of this task |
| `timestamp` | string (google-datetime) | Timestamp when the status was recorded. Example: "2023-10-27T10:00:00Z" |

### `TaskStatusUpdateEvent`

- TaskStatusUpdateEvent is a delta even on a task indicating that a task has changed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contextId` | string | The id of the context that the task belongs to |
| `final` | boolean | Whether this is the last status update expected for this task. |
| `metadata` | object | Optional metadata to associate with the task update. |
| `status` | TaskStatus | The new status of the task. |
| `taskId` | string | The id of the task that is changed |

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

### `TierRate`

- The price rate indicating starting usage and its corresponding price.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `startUsageAmount` | number (double) | Usage is priced at this rate only after this amount. Example: start_usage_amount of 10 indicates that the usage will be priced at the unit_price after the first 10 usage_units. |
| `unitPrice` | Money | The price per unit of usage. Example: unit_price of amount $10 indicates that each unit will cost $10. |

### `UserContext`

- Additional context for personalization (e.g., user persona, role).
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `persona` | string enum | Optional. The user's persona (e.g., FinOps Manager, Developer). |
| `role` | string | Optional. The user's role (e.g., Billing Admin, Project Owner, etc.). |

### `ValueProto`

- This is a copy of storage/googlesql/public/value.proto. ValueProto represents the serialized form of the googlesql::Value. The intention is to support multiple languages including Java and C++, so we must be sensitive to the distinction between Java Strings and byte arrays or ByteStrings. We also want to support use-cases which do not want to serialize a copy of the GoogleSQL type for every instance (which might be very repetitive). Therefore, unlike googlesql::Value, ValueProto does not carry full type information with every instance, and can only be fully interpreted with an associated TypeProto.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `ValueProtoSwitchMustHaveADefault` | boolean | User code that switches on this oneoff enum must have a default case so builds won't break when new fields are added. |
| `arrayValue` | Array | An array of value |
| `bignumericValue` | string (byte) | Encoded bignumeric value. For the encoding format see documentation for BigNumericValue::SerializeAsProtoBytes(). |
| `boolValue` | boolean | Primitive for bool. |
| `bytesValue` | string (byte) | Primitive for bytes. |
| `dateValue` | integer (int32) | Primitive for date. |
| `datetimeValue` | Datetime | primitive for datetime |
| `doubleValue` | number (double) | Primitive for double. |
| `enumValue` | integer (int32) | Tag 11 was used for specifying micros timestamps as int64, now obsolete. |
| `floatValue` | number (float) | Primitive for float. |
| `geographyValue` | string (byte) | Geography encoded using ::stlib::STGeographyEncoder |
| `int32Value` | integer (int32) | Primitive value for int32. |
| `int64Value` | string (int64) | Primitive for int64. |
| `intervalValue` | string (byte) | Encoded interval value. For the encoding format see documentation for IntervalValue::SerializeAsBytes(). |
| `jsonValue` | string | Tag 22 was used for json value as bytes, now obsolete. Json value represented as a string document. |
| `mapValue` | Map | Encoded map value. See (internal link). |
| `numericValue` | string (byte) | Encoded numeric value. For the encoding format see documentation for NumericValue::SerializeAsProtoBytes(). |
| `protoValue` | string (byte) | Stores a serialized protocol message. |
| `rangeValue` | Range | Encoded range value. See (internal link). |
| `stringValue` | string | Primitive for string. |
| `structValue` | Struct | A struct of values |
| `timeValue` | string (int64) | Bit field encoding of hour/minute/second/nanos. See TimeValue class for details. |
| `timestampPicoValue` | string (byte) | Encoded timestamp_pico value. For the encoding format see documentation for googlesql::TimestampPico::SerializeAsBytes(). |
| `timestampValue` | string (google-datetime) | primitive for timestamp |
| `tokenlistValue` | string (byte) | Encoded tokenlist value. copybara:strip_begin(internal-comment) See //search/tokens:token_list. copybara:strip_end |
| `uint32Value` | integer (uint32) | Primitive for uint32. |
| `uint64Value` | string (uint64) | Primitive for uint64. |
| `uuidValue` | string (byte) | Encoded uuid value. For the encoding format see documentation for UuidValue::SerializeAsBytes(). |

### Shape of `APIKeySecurityScheme`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "description": "string",
  "location": "string",
  "name": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `cloudbilling` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Source: https://cloudbilling.googleapis.com/$discovery/rest?version=v1, https://cloudbilling.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
