---
source: https://servicecontrol.googleapis.com/$discovery/rest?version=v2
---

# Service Control API message schemas (servicecontrol)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/servicecontrol/`.

### `AllocateInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `unusedArguments` | array<string> | A list of label keys that were unused by the server in processing the request. Thus, for similar requests repeated in a certain future time window, the caller can choose to ignore these labels in the requests to achieve better client-side cache hits and quota aggregation for rate quota. This field is not populated for allocation quota checks. |

### `AllocateQuotaRequest`

- Request message for the AllocateQuota method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocateOperation` | QuotaOperation | Operation that describes the quota allocation. |
| `serviceConfigId` | string | Specifies which version of service configuration should be used to process the request. If unspecified or no matching version can be found, the latest one will be used. |

### `AllocateQuotaResponse`

- Response message for the AllocateQuota method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocateErrors` | array<QuotaError> | Indicates the decision of the allocate. |
| `allocateInfo` | AllocateInfo | WARNING: DO NOT use this field until this warning message is removed. |
| `operationId` | string | The same operation_id value used in the AllocateQuotaRequest. Used for logging and diagnostics purposes. |
| `quotaMetrics` | array<MetricValueSet> | Quota metrics to indicate the result of allocation. Depending on the request, one or more of the following metrics will be included: 1. Per quota group or per quota metric incremental usage will be specified using the following delta metric : "serviceruntime.googleapis.com/api/consumer/quota_used_count" 2. The quota limit reached condition will be specified using the following boolean metric : "serviceruntime.googleapis.com/quota/exceeded" |
| `serviceConfigId` | string | ID of the actual config used to process the request. |

### `Api`

- This message defines attributes associated with API operations, such as a network API request. The terminology is based on the conventions used by Google APIs, Istio, and OpenAPI.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `operation` | string | The API operation name. For gRPC requests, it is the fully qualified API method name, such as "google.pubsub.v1.Publisher.Publish". For OpenAPI requests, it is the `operationId`, such as "getPet". |
| `protocol` | string | The API protocol used for sending the request, such as "http", "https", "grpc", or "internal". |
| `service` | string | The API service name. It is a logical identifier for a networked API, such as "pubsub.googleapis.com". The naming syntax depends on the API management system being used for handling the request. |
| `version` | string | The API version associated with the API operation above, such as "v1" or "v1alpha1". |

### `AttributeContext`

- This message defines the standard attribute vocabulary for Google APIs. An attribute is a piece of metadata that describes an activity on a network service. For example, the size of an HTTP request, or the status code of an HTTP response. Each attribute has a type and a name, which is logically defined as a proto message field in `AttributeContext`. The field type becomes the attribute type, and the field path becomes the attribute name. For example, the attribute `source.ip` maps to field `AttributeContext.source.ip`. This message definition is guaranteed not to have any wire breaking change. So you can use it directly for passing attributes across different systems. NOTE: Different system may generate different subset of attributes. Please verify the system specification before relying on an attribute generated a system.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `api` | Api | Represents an API operation that is involved to a network activity. |
| `destination` | Peer | The destination of a network activity, such as accepting a TCP connection. In a multi hop network activity, the destination represents the receiver of the last hop. |
| `extensions` | array<object> | Supports extensions for advanced use cases, such as logs and metrics. |
| `origin` | Peer | The origin of a network activity. In a multi hop network activity, the origin represents the sender of the first hop. For the first hop, the `source` and the `origin` must have the same content. |
| `request` | Request | Represents a network request, such as an HTTP request. |
| `resource` | Resource | Represents a target resource that is involved with a network activity. If multiple resources are involved with an activity, this must be the primary one. |
| `response` | Response | Represents a network response, such as an HTTP response. |
| `source` | Peer | The source of a network activity, such as starting a TCP connection. In a multi hop network activity, the source represents the sender of the last hop. |

### `AttributeValue`

- The allowed types for \[VALUE\] in a `[KEY]:[VALUE]` attribute.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | A Boolean value represented by `true` or `false`. |
| `intValue` | string (int64) | A 64-bit signed integer. |
| `stringValue` | TruncatableString | A string up to 256 bytes long. |

### `Attributes`

- A set of attributes, each in the format `[KEY]:[VALUE]`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributeMap` | object | The set of attributes. Each attribute's key can be up to 128 bytes long. The value can be a string up to 256 bytes, a signed 64-bit integer, or the Boolean values `true` and `false`. For example: "/instance_id": "my-instance" "/http/user_agent": "" "/http/request_bytes": 300 "example.com/myattribute": true |
| `droppedAttributesCount` | integer (int32) | The number of attributes that were discarded. Attributes can be discarded because their keys are too long or because there are too many attributes. If this value is 0 then all attributes are valid. |

### `AuditLog`

- Common audit log format for Google Cloud Platform API operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersionIdentifier` | string | The API version identifier of the operation that uses interface based versioning (IBV). For example, `"2026-01-01-preview"`. The version identifier generally follows the format of \[variant\_\]date\[\_decorator\]. It should not be parsed because the exact format varies across services. |
| `authenticationInfo` | AuthenticationInfo | Authentication information. |
| `authorizationInfo` | array<AuthorizationInfo> | Authorization information. If there are multiple resources or permissions involved, then there is one AuthorizationInfo element for each {resource, permission} tuple. |
| `callerAgent` | CallerAgent | Information set when the caller is an agent. |
| `metadata` | object | Other service-specific data about the request, response, and other information associated with the current audited event. |
| `methodName` | string | The name of the service method or operation. For API calls, this should be the name of the API method. For example, "google.cloud.bigquery.v2.TableService.InsertTable" "google.logging.v2.ConfigServiceV2.CreateSink" |
| `numResponseItems` | string (int64) | The number of items returned from a List or Query API method, if applicable. |
| `policyViolationInfo` | PolicyViolationInfo | Indicates the policy violations for this request. If the request is denied by the policy, violation information will be logged here. |
| `request` | object | The operation request. This may not include all request parameters, such as those that are too large, privacy-sensitive, or duplicated elsewhere in the log record. It should never include user-generated data, such as file contents. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. |
| `requestMetadata` | RequestMetadata | Metadata about the operation. |
| `resourceLocation` | ResourceLocation | The resource location information. |
| `resourceName` | string | The resource or collection that is the target of the operation. The name is a scheme-less URI, not including the API service name. For example: "projects/PROJECT_ID/zones/us-central1-a/instances" "projects/PROJECT_ID/datasets/DATASET_ID" |
| `resourceOriginalState` | object | The resource's original state before mutation. Present only for operations which have successfully modified the targeted resource(s). In general, this field should contain all changed fields, except those that are already been included in `request`, `response`, `metadata` or `service_data` fields. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. |
| `response` | object | The operation response. This may not include all response elements, such as those that are too large, privacy-sensitive, or duplicated elsewhere in the log record. It should never include user-generated data, such as file contents. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. |
| `serviceData` | object | Deprecated. Use the `metadata` field instead. Other service-specific data about the request, response, and other activities. |
| `serviceName` | string | The name of the API service performing the operation. For example, `"compute.googleapis.com"`. |
| `status` | Status | The status of the overall operation. |

### `AuditPamBindingId`

- A composite unique identifier for a PAM Grant which is {Org/Folder/Project identifier, grant Unique Identifier} tuple.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `container` | string | Output only. GCP Project/Folder/Organization identifier to which the PAM entitlement/grant is bound to. Container will be in the following form: projects/$project_num or folders/$folder_num or organizations/$org |
| `grantUuid` | string | Output only. Represents the unique identifier for the PAM grant. Full_resource_name_pattern for PAM Grant is: //privilegedaccessmanager.googleapis.com/ (projects\|folders\|organizations)/$0/locations/$1/entitlements/$2/ grants/$3 where $3 is the grant_uuid. |

### `Auth`

- This message defines request authentication attributes. Terminology is based on the JSON Web Token (JWT) standard, but the terms also correlate to concepts in other standards.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accessLevels` | array<string> | A list of access level resource names that allow resources to be accessed by authenticated requester. It is part of Secure GCP processing for the incoming request. An access level string has the format: "//{api_service_name}/accessPolicies/{policy_id}/accessLevels/{short_name}" Example: "//accesscontextmanager.googleapis.com/accessPolicies/MY_POLICY_ID/accessLevels/MY_LEVEL" |
| `audiences` | array<string> | The intended audience(s) for this authentication information. Reflects the audience (`aud`) claim within a JWT. The audience value(s) depends on the `issuer`, but typically include one or more of the following pieces of information: \* The services intended to receive the credential. For example, \["https://pubsub.googleapis.com/", "https://storage.googleapis.com/"\]. \* A set of service-based scopes. For example, \["https://www.googleapis.com/auth/cloud-platform"\]. \* The client id of an app, such as the Firebase project id for JWTs from Firebase Auth. Consult the documentation for the credential issuer to determine the information provided. |
| `claims` | object | Structured claims presented with the credential. JWTs include `{key: value}` pairs for standard and private claims. The following is a subset of the standard required and optional claims that would typically be presented for a Google-based JWT: {'iss': 'accounts.google.com', 'sub': '113289723416554971153', 'aud': \['123456789012', 'pubsub.googleapis.com'\], 'azp': '123456789012.apps.googleusercontent.com', 'email': 'jsmith@example.com', 'iat': 1353601026, 'exp': 1353604926} SAML assertions are similarly specified, but with an identity provider dependent structure. |
| `credentialId` | string | Identifies the client credential id used for authentication. credential_id is in the format of AUTH_METHOD:IDENTIFIER, e.g. "serviceaccount:XXXXX, apikey:XXXXX" where the format of the IDENTIFIER can vary for different AUTH_METHODs. |
| `oauth` | Oauth | Attributes of the OAuth token associated with the request. |
| `presenter` | string | The authorized presenter of the credential. Reflects the optional Authorized Presenter (`azp`) claim within a JWT or the OAuth client id. For example, a Google Cloud Platform client id looks as follows: "123456789012.apps.googleusercontent.com". |
| `principal` | string | The authenticated principal. Reflects the issuer (`iss`) and subject (`sub`) claims within a JWT. The issuer and subject should be `/` delimited, with `/` percent-encoded within the subject fragment. For Google accounts, the principal format is: "https://accounts.google.com/{id}" |

### `AuthenticationInfo`

- Authentication information for the operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authoritySelector` | string | The authority selector specified by the requestor, if any. It is not guaranteed that the principal was allowed to use this authority. |
| `loggableShortLivedCredential` | object | Converted from "identity_cloudgaia.AuditLoggableShortLivedCredential" proto. This message will be used by security, detection and response team. For context please refer to go/cg:short-lived-credential-logging. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. |
| `oauthInfo` | OAuthInfo | OAuth authentication information such as the OAuth client ID. |
| `principalEmail` | string | The email address of the authenticated user (or service account on behalf of third party principal) making the request. For third party identity callers, the `principal_subject` field is populated instead of this field. For privacy reasons, the principal email address is sometimes redacted. For more information, see Caller identities in audit logs (https://cloud.google.com/logging/docs/audit#user-id). |
| `principalSubject` | string | String representation of identity of requesting party. Populated for both first and third party identities. |
| `serviceAccountDelegationInfo` | array<ServiceAccountDelegationInfo> | Identity delegation history of an authenticated service account that makes the request. It contains information on the real authorities that try to access GCP resources by delegating on a service account. When multiple authorities present, they are guaranteed to be sorted based on the original ordering of the identity delegation events. |
| `serviceAccountKeyName` | string | The name of the service account key used to create or exchange credentials for authenticating the service account making the request. This is a scheme-less URI full resource name. For example: "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}" |
| `serviceDelegationHistory` | ServiceDelegationHistory | Records the history of delegated resource access across Google services. |
| `thirdPartyPrincipal` | object | The third party identification (if any) of the authenticated user making the request. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. |

### `AuthorizationInfo`

- Authorization information for the operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `granted` | boolean | Whether or not authorization for `resource` and `permission` was granted. |
| `permission` | string | The required IAM permission. |
| `permissionType` | string enum | The type of the permission that was checked. For data access audit logs this corresponds with the permission type that must be enabled in the project/folder/organization IAM policy in order for the log to be written. |
| `privilegedAccessManagerMetadata` | PrivilegedAccessManagerMetadata | Output only. Metadata about the Privileged Access Manager (PAM) backed authorization decisions. This field is populated if the access is granted via an IAM policy with a binding which is managed by Privileged Access Manager. |
| `resource` | string | The resource being accessed, as a REST-style or cloud resource string. For example: bigquery.googleapis.com/projects/PROJECTID/datasets/DATASETID or projects/PROJECTID/datasets/DATASETID |
| `resourceAttributes` | Resource | Resource attributes used in IAM condition evaluation. This field contains resource attributes like resource type and resource name. To get the whole view of the attributes used in IAM condition evaluation, the user must also look into `AuditLog.request_metadata.request_attributes`. |

### `CallerAgent`

- Information set when the caller is an agent.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authority` | string enum | The type of authority for the caller agent. |
| `id` | string | The agent identifier of the caller agent. This is a globally unique, immutable name in Uniform Resource Name (URN) format. Example: 'urn:agent:projects-123456789:projects:123456789:locations:us-central1:aiplatform:reasoningEngines:987654321' |

### `CheckError`

- Defines the errors to be returned in google.api.servicecontrol.v1.CheckResponse.check_errors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The error code. |
| `detail` | string | Free-form text providing details on the error cause of the error. |
| `status` | Status | Contains public information about the check error. If available, `status.code` will be non zero and client can propagate it out as public error. |
| `subject` | string | Subject to whom this error applies. See the specific code enum for more details on this field. For example: - "project:" - "folder:" - "organization:" |

### `CheckInfo`

- Contains additional information about the check operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiKeyUid` | string | The unique id of the api key in the format of "apikey:". This field will be populated when the consumer passed to Chemist is an API key and all the API key related validations are successful. |
| `consumerInfo` | ConsumerInfo | Consumer info of this check. |
| `ignoreApiKeyUidAsCredentialId` | boolean | Whether or not the api key should be ignored in the credential_id during reporting. |
| `unusedArguments` | array<string> | A list of fields and label keys that are ignored by the server. The client doesn't need to send them for following requests to improve performance and allow better aggregation. |

### `CheckRequest`

- Request message for the Check method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attributes` | AttributeContext | Describes attributes about the operation being executed by the service. |
| `flags` | string | Optional. Contains a comma-separated list of flags. |
| `resources` | array<ResourceInfo> | Describes the resources and the policies applied to each resource. |
| `serviceConfigId` | string | Specifies the version of the service configuration that should be used to process the request. Must not be empty. Set this field to 'latest' to specify using the latest configuration. |

### `CheckResponse`

- Response message for the Check method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dynamicMetadata` | object | Optional response metadata that will be emitted as dynamic metadata to be consumed by the caller of ServiceController. For compatibility with the ext_authz interface. |
| `headers` | object | Returns a set of request contexts generated from the `CheckRequest`. |
| `status` | Status | Operation is allowed when this field is not set. Any non-'OK' status indicates a denial; google.rpc.Status.details would contain additional details about the denial. |

### `ConsumerInfo`

- `ConsumerInfo` provides information about the consumer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerNumber` | string (int64) | The consumer identity number, can be Google cloud project number, folder number or organization number e.g. 1234567890. A value of 0 indicates no consumer number is found. |
| `projectNumber` | string (int64) | The Google cloud project number, e.g. 1234567890. A value of 0 indicates no project number is found. NOTE: This field is deprecated after Chemist support flexible consumer id. New code should not depend on this field anymore. |
| `type` | string enum | The type of the consumer which should have been defined in Google Resource Manager (https://cloud.google.com/resource-manager/). |

### `Distribution`

- Distribution represents a frequency distribution of double-valued sample points. It contains the size of the population of sample points plus additional optional information: \* the arithmetic mean of the samples \* the minimum and maximum of the samples \* the sum-squared-deviation of the samples, used to compute variance \* a histogram of the values of the sample points
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketCounts` | array<string> | The number of samples in each histogram bucket. `bucket_counts` are optional. If present, they must sum to the `count` value. The buckets are defined below in `bucket_option`. There are N buckets. `bucket_counts[0]` is the number of samples in the underflow bucket. `bucket_counts[1]` to `bucket_counts[N-1]` are the numbers of samples in each of the finite buckets. And `bucket_counts[N]` is the number of samples in the overflow bucket. See the comments of `bucket_option` below for more details. Any suffix of trailing zeros may be omitted. |
| `count` | string (int64) | The total number of samples in the distribution. Must be >= 0. |
| `exemplars` | array<Exemplar> | Example points. Must be in increasing order of `value` field. |
| `explicitBuckets` | ExplicitBuckets | Buckets with arbitrary user-provided width. |
| `exponentialBuckets` | ExponentialBuckets | Buckets with exponentially growing width. |
| `linearBuckets` | LinearBuckets | Buckets with constant width. |
| `maximum` | number (double) | The maximum of the population of values. Ignored if `count` is zero. |
| `mean` | number (double) | The arithmetic mean of the samples in the distribution. If `count` is zero then this field must be zero. |
| `minimum` | number (double) | The minimum of the population of values. Ignored if `count` is zero. |
| `sumOfSquaredDeviation` | number (double) | The sum of squared deviations from the mean: Sumi=1..count^2) where each x_i is a sample values. If `count` is zero then this field must be zero, otherwise validation of the request fails. |

### `Exemplar`

- Exemplars are example points that may be used to annotate aggregated distribution values. They are metadata that gives information about a particular value added to a Distribution bucket, such as a trace ID that was active when a value was added. They may contain further information, such as a example values and timestamps, origin, etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachments` | array<object> | Contextual information about the example value. Examples are: Trace: type.googleapis.com/google.monitoring.v3.SpanContext Literal string: type.googleapis.com/google.protobuf.StringValue Labels dropped during aggregation: type.googleapis.com/google.monitoring.v3.DroppedLabels There may be only a single attachment of any given message type in a single exemplar, and this is enforced by the system. |
| `timestamp` | string (google-datetime) | The observation (sampling) time of the above value. |
| `value` | number (double) | Value of the exemplar point. This value determines to which bucket the exemplar belongs. |

### `ExplicitBuckets`

- Describing buckets with arbitrary user-provided width.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bounds` | array<number> | 'bound' is a list of strictly increasing boundaries between buckets. Note that a list of length N-1 defines N buckets because of fenceposting. See comments on `bucket_options` for details. The i'th finite bucket covers the interval \[bound\[i-1\], bound\[i\]) where i ranges from 1 to bound_size() - 1. Note that there are no finite buckets at all if 'bound' only contains a single element; in that special case the single bound defines the boundary between the underflow and overflow buckets. bucket number lower bound upper bound i == 0 (underflow) -inf bound\[i\] 0 < i < bound_size() bound\[i-1\] bound\[i\] i == bound_size() (overflow) bound\[i-1\] +inf |

### `ExponentialBuckets`

- Describing buckets with exponentially growing width.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `growthFactor` | number (double) | The i'th exponential bucket covers the interval \[scale \* growth_factor^(i-1), scale \* growth_factor^i) where i ranges from 1 to num_finite_buckets inclusive. Must be larger than 1.0. |
| `numFiniteBuckets` | integer (int32) | The number of finite buckets. With the underflow and overflow buckets, the total number of buckets is `num_finite_buckets` + 2. See comments on `bucket_options` for details. |
| `scale` | number (double) | The i'th exponential bucket covers the interval \[scale \* growth_factor^(i-1), scale \* growth_factor^i) where i ranges from 1 to num_finite_buckets inclusive. Must be > 0. |

### `FirstPartyPrincipal`

- First party identity principal.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `principalEmail` | string | The email address of a Google account. . |
| `serviceMetadata` | object | Metadata about the service that uses the service account. . |

### `HttpRequest`

- A common proto for logging HTTP requests. Only contains semantics defined by the HTTP specification. Product-specific logging information MUST be defined in a separate message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheFillBytes` | string (int64) | The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. |
| `cacheHit` | boolean | Whether or not an entity was served from cache (with or without validation). |
| `cacheLookup` | boolean | Whether or not a cache lookup was attempted. |
| `cacheValidatedWithOriginServer` | boolean | Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if `cache_hit` is True. |
| `latency` | string (google-duration) | The request processing latency on the server, from the time the request was received until the response was sent. |
| `protocol` | string | Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket" |
| `referer` | string | The referer URL of the request, as defined in HTTP/1.1 Header Field Definitions (https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). |
| `remoteIp` | string | The IP address (IPv4 or IPv6) of the client that issued the HTTP request. Examples: `"192.168.1.1"`, `"FE80::0202:B3FF:FE1E:8329"`. |
| `requestMethod` | string | The request method. Examples: `"GET"`, `"HEAD"`, `"PUT"`, `"POST"`. |
| `requestSize` | string (int64) | The size of the HTTP request message in bytes, including the request headers and the request body. |
| `requestUrl` | string | The scheme (http, https), the host name, the path, and the query portion of the URL that was requested. Example: `"http://example.com/some/info?color=red"`. |
| `responseSize` | string (int64) | The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. |
| `serverIp` | string | The IP address (IPv4 or IPv6) of the origin server that the request was sent to. |
| `status` | integer (int32) | The response code indicating the status of the response. Examples: 200, 404. |
| `userAgent` | string | The user agent sent by the client. Example: `"Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)"`. |

### `LinearBuckets`

- Describing buckets with constant width.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `numFiniteBuckets` | integer (int32) | The number of finite buckets. With the underflow and overflow buckets, the total number of buckets is `num_finite_buckets` + 2. See comments on `bucket_options` for details. |
| `offset` | number (double) | The i'th linear bucket covers the interval \[offset + (i-1) \* width, offset + i \* width) where i ranges from 1 to num_finite_buckets, inclusive. |
| `width` | number (double) | The i'th linear bucket covers the interval \[offset + (i-1) \* width, offset + i \* width) where i ranges from 1 to num_finite_buckets, inclusive. Must be strictly positive. |

### `LogEntry`

- An individual log entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `httpRequest` | HttpRequest | Optional. Information about the HTTP request associated with this log entry, if applicable. |
| `insertId` | string | A unique ID for the log entry used for deduplication. If omitted, the implementation will generate one based on operation_id. |
| `labels` | object | A set of user-defined (key, value) data that provides additional information about the log entry. |
| `name` | string | Required. The log to which this log entry belongs. Examples: `"syslog"`, `"book_log"`. |
| `operation` | LogEntryOperation | Optional. Information about an operation associated with the log entry, if applicable. |
| `protoPayload` | object | The log entry payload, represented as a protocol buffer that is expressed as a JSON object. The only accepted type currently is AuditLog. |
| `severity` | string enum | The severity of the log entry. The default value is `LogSeverity.DEFAULT`. |
| `sourceLocation` | LogEntrySourceLocation | Optional. Source code location information associated with the log entry, if any. |
| `structPayload` | object | The log entry payload, represented as a structure that is expressed as a JSON object. |
| `textPayload` | string | The log entry payload, represented as a Unicode string (UTF-8). |
| `timestamp` | string (google-datetime) | The time the event described by the log entry occurred. If omitted, defaults to operation start time. |
| `trace` | string | Optional. Resource name of the trace associated with the log entry, if any. If this field contains a relative resource name, you can assume the name is relative to `//tracing.googleapis.com`. Example: `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824` |

### `LogEntryOperation`

- Additional information about a potentially long-running operation with which a log entry is associated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `first` | boolean | Optional. Set this to True if this is the first log entry in the operation. |
| `id` | string | Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. |
| `last` | boolean | Optional. Set this to True if this is the last log entry in the operation. |
| `producer` | string | Optional. An arbitrary producer identifier. The combination of `id` and `producer` must be globally unique. Examples for `producer`: `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`. |

### `LogEntrySourceLocation`

- Additional information about the source code location that produced the log entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `file` | string | Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. |
| `function` | string | Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function` (Python). |
| `line` | string (int64) | Optional. Line within the source file. 1-based; 0 indicates no line number available. |

### `MetricValue`

- Represents a single metric value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | A boolean value. |
| `distributionValue` | Distribution | A distribution value. |
| `doubleValue` | number (double) | A double precision floating point value. |
| `endTime` | string (google-datetime) | The end of the time period over which this metric value's measurement applies. If not specified, google.api.servicecontrol.v1.Operation.end_time will be used. |
| `int64Value` | string (int64) | A signed 64-bit integer value. |
| `labels` | object | The labels describing the metric value. See comments on google.api.servicecontrol.v1.Operation.labels for the overriding relationship. Note that this map must not contain monitored resource labels. |
| `moneyValue` | Money | A money value. |
| `startTime` | string (google-datetime) | The start of the time period over which this metric value's measurement applies. The time period has different semantics for different metric types (cumulative, delta, and gauge). See the metric definition documentation in the service configuration for details. If not specified, google.api.servicecontrol.v1.Operation.start_time will be used. |
| `stringValue` | string | A text string value. |

### `MetricValueSet`

- Represents a set of metric values in the same metric. Each metric value in the set should have a unique combination of start time, end time, and label values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metricName` | string | The metric name defined in the service configuration. |
| `metricValues` | array<MetricValue> | The values in this metric. |

### `Money`

- Represents an amount of money with its currency type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | The three-letter currency code defined in ISO 4217. |
| `nanos` | integer (int32) | Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. |
| `units` | string (int64) | The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. |

### `OAuthInfo`

- OAuth related information about the request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `oauthClientId` | string | The OAuth client ID of the 1P or 3P application acting on behalf of the user. |

### `Oauth`

- This message defines attributes associated with OAuth credentials.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clientId` | string | The optional OAuth client ID. This is the unique public identifier issued by an authorization server to a registered client application. Empty string is equivalent to no oauth client id. WARNING: This is for MCP tools/call and tools/list authorization and not for general use. |

### `Operation`

- Represents information regarding an operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerId` | string | Identity of the consumer who is using the service. This field should be filled in for the operations initiated by a consumer, but not for service-initiated operations that are not related to a specific consumer. - This can be in one of the following formats: - project:PROJECT_ID, - project`_`number:PROJECT_NUMBER, - projects/PROJECT_ID or PROJECT_NUMBER, - folders/FOLDER_NUMBER, - organizations/ORGANIZATION_NUMBER, - api`_`key:API_KEY. |
| `endTime` | string (google-datetime) | End time of the operation. Required when the operation is used in ServiceController.Report, but optional when the operation is used in ServiceController.Check. |
| `importance` | string enum | DO NOT USE. This is an experimental field. |
| `labels` | object | Labels describing the operation. Only the following labels are allowed: - Labels describing monitored resources as defined in the service configuration. - Default labels of metric values. When specified, labels defined in the metric value override these default. - The following labels defined by Google Cloud Platform: - `cloud.googleapis.com/location` describing the location where the operation happened, - `servicecontrol.googleapis.com/user_agent` describing the user agent of the API request, - `servicecontrol.googleapis.com/service_agent` describing the service used to handle the API request (e.g. ESP), - `servicecontrol.googleapis.com/platform` describing the platform where the API is served, such as App Engine, Compute Engine, or Kubernetes Engine. |
| `logEntries` | array<LogEntry> | Represents information to be logged. |
| `metricValueSets` | array<MetricValueSet> | Represents information about this operation. Each MetricValueSet corresponds to a metric defined in the service configuration. The data type used in the MetricValueSet must agree with the data type specified in the metric definition. Within a single operation, it is not allowed to have more than one MetricValue instances that have the same metric names and identical label value combinations. If a request has such duplicated MetricValue instances, the entire request is rejected with an invalid argument error. |
| `operationId` | string | Identity of the operation. This must be unique within the scope of the service that generated the operation. If the service calls Check() and Report() on the same operation, the two calls should carry the same id. UUID version 4 is recommended, though not required. In scenarios where an operation is computed from existing information and an idempotent id is desirable for deduplication purpose, UUID version 5 is recommended. See RFC 4122 for details. |
| `operationName` | string | Fully qualified name of the operation. Reserved for future use. |
| `quotaProperties` | QuotaProperties | Represents the properties needed for quota check. Applicable only if this operation is for a quota check request. If this is not specified, no quota check will be performed. |
| `resources` | array<ResourceInfo> | The resources that are involved in the operation. The maximum supported number of entries in this field is 100. |
| `startTime` | string (google-datetime) | Required. Start time of the operation. |
| `traceSpans` | array<TraceSpan> | Unimplemented. A list of Cloud Trace spans. The span names shall contain the id of the destination project which can be either the produce or the consumer project. |
| `userLabels` | object | Private Preview. This feature is only available for approved services. User defined labels for the resource that this operation is associated with. |

### `OrgPolicyViolationInfo`

- Represents OrgPolicy Violation information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `payload` | object | Optional. Deprecated. Resource payload that is currently in scope and is subjected to orgpolicy conditions. This payload may be the subset of the actual Resource that may come in the request. |
| `resourceTags` | object | Optional. Deprecated. Tags referenced on the resource at the time of evaluation. |
| `resourceType` | string | Optional. Resource type that the orgpolicy is checked against. Example: compute.googleapis.com/Instance, store.googleapis.com/bucket |
| `violationInfo` | array<ViolationInfo> | Optional. Policy violations |

### `Peer`

- This message defines attributes for a node that handles a network request. The node can be either a service or an application that sends, forwards, or receives the request. Service peers should fill in `principal` and `labels` as appropriate.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ip` | string | The IP address of the peer. |
| `labels` | object | The labels associated with the peer. |
| `port` | string (int64) | The network port of the peer. |
| `principal` | string | The identity of this peer. Similar to `Request.auth.principal`, but relative to the peer instead of the request. For example, the identity associated with a load balancer that forwarded the request. |
| `regionCode` | string | The CLDR country/region code associated with the above IP address. If the IP address is private, the `region_code` should reflect the physical location where this peer is running. |

### `PolicyViolationInfo`

- Information related to policy violations for this request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `orgPolicyViolationInfo` | OrgPolicyViolationInfo | Indicates the orgpolicy violations for this resource. |

### `PrivilegedAccessManagerMetadata`

- Metadata about the Privileged Access Manager (PAM) backed authorization decisions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `pamBindingIds` | array<AuditPamBindingId> | Output only. If PAM is managing the elevated access, AuditPamBindingId is written to an Identity and Access Management (IAM) policy, which specifies access controls for resources. If the access is granted via an IAM policy with a binding which is managed by Privileged Access Manager, PrivilegedAccessManagerMetadata will contain the AuditPamBindingId. |

### `QuotaError`

- Represents error information for QuotaOperation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Error code. |
| `description` | string | Free-form text that provides details on the cause of the error. |
| `status` | Status | Contains additional information about the quota error. If available, `status.code` will be non zero. |
| `subject` | string | Subject to whom this error applies. See the specific enum for more details on this field. For example, "clientip:" or "project:". |

### `QuotaInfo`

- Contains the quota information for a quota check response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `limitExceeded` | array<string> | Quota Metrics that have exceeded quota limits. For QuotaGroup-based quota, this is QuotaGroup.name For QuotaLimit-based quota, this is QuotaLimit.name See: google.api.Quota Deprecated: Use quota_metrics to get per quota group limit exceeded status. |
| `quotaConsumed` | object | Map of quota group name to the actual number of tokens consumed. If the quota check was not successful, then this will not be populated due to no quota consumption. We are not merging this field with 'quota_metrics' field because of the complexity of scaling in Chemist client code base. For simplicity, we will keep this field for Castor (that scales quota usage) and 'quota_metrics' for SuperQuota (that doesn't scale quota usage). |
| `quotaExtractionState` | string enum | Output only. Indicates the state of the quota extraction. |
| `quotaMetrics` | array<MetricValueSet> | Quota metrics to indicate the usage. Depending on the check request, one or more of the following metrics will be included: 1. For rate quota, per quota group or per quota metric incremental usage will be specified using the following delta metric: "serviceruntime.googleapis.com/api/consumer/quota_used_count" 2. For allocation quota, per quota metric total usage will be specified using the following gauge metric: "serviceruntime.googleapis.com/allocation/consumer/quota_used_count" 3. For both rate quota and allocation quota, the quota limit reached condition will be specified using the following boolean metric: "serviceruntime.googleapis.com/quota/exceeded" |

### `QuotaOperation`

- Represents information regarding a quota operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerId` | string | Identity of the consumer for whom this quota operation is being performed. This can be in one of the following formats: project:, project_number:, api_key:. |
| `labels` | object | Labels describing the operation. |
| `methodName` | string | Fully qualified name of the API method for which this quota operation is requested. This name is used for matching quota rules or metric rules and billing status rules defined in service configuration. This field should not be set if any of the following is true: (1) the quota operation is performed on non-API resources. (2) quota_metrics is set because the caller is doing quota override. Example of an RPC method name: google.example.library.v1.LibraryService.CreateShelf |
| `operationId` | string | Identity of the operation. For Allocation Quota, this is expected to be unique within the scope of the service that generated the operation, and guarantees idempotency in case of retries. In order to ensure best performance and latency in the Quota backends, operation_ids are optimally associated with time, so that related operations can be accessed fast in storage. For this reason, the recommended token for services that intend to operate at a high QPS is Unix time in nanos + UUID |
| `quotaMetrics` | array<MetricValueSet> | Represents information about this operation. Each MetricValueSet corresponds to a metric defined in the service configuration. The data type used in the MetricValueSet must agree with the data type specified in the metric definition. Within a single operation, it is not allowed to have more than one MetricValue instances that have the same metric names and identical label value combinations. If a request has such duplicated MetricValue instances, the entire request is rejected with an invalid argument error. This field is mutually exclusive with method_name. |
| `quotaMode` | string enum | Quota mode for this operation. |

### `QuotaProperties`

- Represents the properties needed for quota operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `quotaMode` | string enum | Quota mode for this operation. |

### `ReportError`

- Represents the processing error of one Operation in the request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operationId` | string | The Operation.operation_id value from the request. |
| `status` | Status | Details of the error when processing the Operation. |

### `ReportRequest`

- Request message for the Report method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `operations` | array<AttributeContext> | Describes the list of operations to be reported. Each operation is represented as an AttributeContext, and contains all attributes around an API access. |
| `serviceConfigId` | string | Specifies the version of the service configuration that should be used to process the request. Must not be empty. Set this field to 'latest' to specify using the latest configuration. |

### `ReportResponse`

- Response message for the Report method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `extensions` | object | The extension field to store serialized OTel responses. e.g. ExportLogsServiceResponse, ExportMetricsServiceResponse. |

### `Request`

- This message defines attributes for an HTTP request. If the actual request is not an HTTP request, the runtime system should try to map the actual request to an equivalent HTTP request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auth` | Auth | The request authentication. May be absent for unauthenticated requests. Derived from the HTTP request `Authorization` header or equivalent. |
| `headers` | object | The HTTP request headers. If multiple headers share the same key, they must be merged according to the HTTP spec. All header keys must be lowercased, because HTTP header keys are case-insensitive. |
| `host` | string | The HTTP request `Host` header value. |
| `id` | string | The unique ID for a request, which can be propagated to downstream systems. The ID should have low probability of collision within a single day for a specific service. |
| `method` | string | The HTTP request method, such as `GET`, `POST`. |
| `origin` | string | The values from Origin header from the HTTP request, such as "https://console.cloud.google.com". Modern browsers can only have one origin. Special browsers and/or HTTP clients may require multiple origins. |
| `path` | string | The HTTP URL path, excluding the query parameters. |
| `protocol` | string | The network protocol used with the request, such as "http/1.1", "spdy/3", "h2", "h2c", "webrtc", "tcp", "udp", "quic". See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for details. |
| `query` | string | The HTTP URL query in the format of `name1=value1&name2=value2`, as it appears in the first line of the HTTP request. No decoding is performed. |
| `reason` | string | A special parameter for request reason. It is used by security systems to associate auditing information with a request. |
| `scheme` | string | The HTTP URL scheme, such as `http` and `https`. |
| `size` | string (int64) | The HTTP request size in bytes. If unknown, it must be -1. |
| `time` | string (google-datetime) | The timestamp when the `destination` service receives the last byte of the request. |

### `RequestMetadata`

- Metadata about the request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `callerIp` | string | The IP address of the caller. For a caller from the internet, this will be the public IPv4 or IPv6 address. For calls made from inside Google's internal production network from one GCP service to another, `caller_ip` will be redacted to "private". For a caller from a Compute Engine VM with a external IP address, `caller_ip` will be the VM's external IP address. For a caller from a Compute Engine VM without a external IP address, if the VM is in the same organization (or project) as the accessed resource, `caller_ip` will be the VM's internal IPv4 address, otherwise `caller_ip` will be redacted to "gce-internal-ip". See https://cloud.google.com/compute/docs/vpc/ for more information. |
| `callerNetwork` | string | The network of the caller. Set only if the network host project is part of the same GCP organization (or project) as the accessed resource. See https://cloud.google.com/compute/docs/vpc/ for more information. This is a scheme-less URI full resource name. For example: "//compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK_ID" |
| `callerSuppliedUserAgent` | string | The user agent of the caller. This information is not authenticated and should be treated accordingly. For example: + `google-api-python-client/1.4.0`: The request was made by the Google API client for Python. + `Cloud SDK Command Line Tool apitools-client/1.0 gcloud/0.9.62`: The request was made by the Google Cloud SDK CLI (gcloud). + `AppEngine-Google; (+http://code.google.com/appengine; appid: s~my-project`: The request was made from the `my-project` App Engine app. |
| `destinationAttributes` | Peer | The destination of a network activity, such as accepting a TCP connection. In a multi hop network activity, the destination represents the receiver of the last hop. Only two fields are used in this message, Peer.port and Peer.ip. These fields are optionally populated by those services utilizing the IAM condition feature. |
| `requestAttributes` | Request | Request attributes used in IAM condition evaluation. This field contains request attributes like request time and access levels associated with the request. To get the whole view of the attributes used in IAM condition evaluation, the user must also look into `AuditLog.authentication_info.resource_attributes`. |

### `Resource`

- This message defines core attributes for a resource. A resource is an addressable (named) entity provided by the destination service. For example, a file stored on a network storage service.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/ |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. This may be either the time creation was initiated or when it was completed. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp when the resource was deleted. If the resource is not deleted, this must be empty. |
| `displayName` | string | Mutable. The display name set by clients. Must be <= 63 characters. |
| `etag` | string | Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. |
| `labels` | object | The labels or tags on the resource, such as AWS resource tags and Kubernetes resource labels. |
| `location` | string | Immutable. The location of the resource. The location encoding is specific to the service provider, and new encoding may be introduced as the service evolves. For Google Cloud products, the encoding is what is used by Google Cloud APIs, such as `us-east1`, `aws-us-east-1`, and `azure-eastus2`. The semantics of `location` is identical to the `cloud.googleapis.com/location` label used by some Google Cloud APIs. |
| `name` | string | The stable identifier (name) of a resource on the `service`. A resource can be logically identified as "//{resource.service}/{resource.name}". The differences between a resource name and a URI are: \* Resource name is a logical identifier, independent of network protocol and API version. For example, `//pubsub.googleapis.com/projects/123/topics/news-feed`. \* URI often includes protocol and version information, so it can be used directly by applications. For example, `https://pubsub.googleapis.com/v1/projects/123/topics/news-feed`. See https://cloud.google.com/apis/design/resource_names for details. |
| `service` | string | The name of the service that this resource belongs to, such as `pubsub.googleapis.com`. The service may be different from the DNS hostname that actually serves the request. |
| `type` | string | The type of the resource. The syntax is platform-specific because different platforms define their resources differently. For Google APIs, the type format must be "{service}/{kind}", such as "pubsub.googleapis.com/Topic". |
| `uid` | string | The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. |

### `ResourceInfo`

- Describes a resource referenced in the request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `container` | string | Optional. The identifier of the container of this resource. For Google Cloud APIs, the resource container must be one of the following formats: - `projects/` - `folders/` - `organizations/` Required for the policy enforcement on the container level (e.g. VPCSC, Location Policy check, Org Policy check). |
| `location` | string | Optional. The location of the resource, it must be a valid zone, region or multiregion, for example: "europe-west4", "northamerica-northeast1-a". Required for location policy check. |
| `name` | string | The name of the resource referenced in the request. |
| `permission` | string | The resource permission needed for this request. The format must be "{service}/{plural}.{verb}". |
| `type` | string | The resource type in the format of "{service}/{kind}". |

### `ResourceLocation`

- Location information about a resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `currentLocations` | array<string> | The locations of a resource after the execution of the operation. Requests to create or delete a location based resource must populate the 'current_locations' field and not the 'original_locations' field. For example: "europe-west1-a" "us-east1" "nam3" |
| `originalLocations` | array<string> | The locations of a resource prior to the execution of the operation. Requests that mutate the resource's location must populate both the 'original_locations' as well as the 'current_locations' fields. For example: "europe-west1-a" "us-east1" "nam3" |

### `Response`

- This message defines attributes for a typical network response. It generally models semantics of an HTTP response.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backendLatency` | string (google-duration) | The amount of time it takes the backend service to fully respond to a request. Measured from when the destination service starts to send the request to the backend until when the destination service receives the complete response from the backend. |
| `code` | string (int64) | The HTTP response status code, such as `200` and `404`. |
| `headers` | object | The HTTP response headers. If multiple headers share the same key, they must be merged according to HTTP spec. All header keys must be lowercased, because HTTP header keys are case-insensitive. |
| `size` | string (int64) | The HTTP response size in bytes. If unknown, it must be -1. |
| `time` | string (google-datetime) | The timestamp when the `destination` service sends the last byte of the response. |

### `ServiceAccountDelegationInfo`

- Identity delegation history of an authenticated service account.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `firstPartyPrincipal` | FirstPartyPrincipal | First party (Google) identity as the real authority. |
| `principalSubject` | string | A string representing the principal_subject associated with the identity. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subject/{subject)` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` |
| `thirdPartyPrincipal` | ThirdPartyPrincipal | Third party identity as the real authority. |

### `ServiceDelegationHistory`

- The history of delegation across multiple services as the result of the original user's action. Such as "service A uses its own account to do something for user B". This differs from ServiceAccountDelegationInfo, which only tracks the history of direct token exchanges (impersonation).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `originalPrincipal` | string | The original end user who initiated the request to GCP. |
| `serviceMetadata` | array<ServiceMetadata> | Data identifying the service specific jobs or units of work that were involved in a chain of service calls. |

### `ServiceMetadata`

- Metadata describing the service and additional service specific information used to identify the job or unit of work at hand.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `jobMetadata` | object | Additional metadata provided by service teams to describe service specific job information that was triggered by the original principal. |
| `principalSubject` | string | A string representing the principal_subject associated with the identity. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subject/{subject)` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` If the identity is a Google account (e.g. workspace user account or service account), this will be the email of the prefixed by `serviceAccount:`. For example: `serviceAccount:my-service-account@project-1.iam.gserviceaccount.com`. If the identity is an individual user, the identity will be formatted as: `user:user_ABC@email.com`. |
| `serviceDomain` | string | The service's fully qualified domain name, e.g. "dataproc.googleapis.com". |

### `SpanContext`

- The context of a span. This is attached to an Exemplar in Distribution values during aggregation. It contains the name of a span with format: projects/\[PROJECT_ID_OR_NUMBER\]/traces/\[TRACE_ID\]/spans/\[SPAN_ID\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `spanName` | string | The resource name of the span. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/traces/\[TRACE_ID\]/spans/\[SPAN_ID\] `[TRACE_ID]` is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. `[SPAN_ID]` is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `ThirdPartyPrincipal`

- Third party identity principal.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `thirdPartyClaims` | object | Metadata about third party identity. |

### `TraceSpan`

- A span represents a single operation within a trace. Spans can be nested to form a trace tree. Often, a trace contains a root span that describes the end-to-end latency, and one or more subspans for its sub-operations. A trace can also contain multiple root spans, or none at all. Spans do not need to be contiguous—there may be gaps or overlaps between spans in a trace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | Attributes | A set of attributes on the span. You can have up to 32 attributes per span. |
| `childSpanCount` | integer (int32) | An optional number of child spans that were generated while this span was active. If set, allows implementation to detect missing child spans. |
| `displayName` | TruncatableString | A description of the span's operation (up to 128 bytes). Stackdriver Trace displays the description in the Google Cloud Platform Console. For example, the display name can be a qualified method name or a file name and a line number where the operation is called. A best practice is to use the same display name within an application and at the same call point. This makes it easier to correlate spans in different traces. |
| `endTime` | string (google-datetime) | The end time of the span. On the client side, this is the time kept by the local machine where the span execution ends. On the server side, this is the time when the server application handler stops running. |
| `name` | string | The resource name of the span in the following format: projects/\[PROJECT_ID\]/traces/\[TRACE_ID\]/spans/SPAN_ID is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. \[SPAN_ID\] is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. |
| `parentSpanId` | string | The \[SPAN_ID\] of this span's parent span. If this is a root span, then this field must be empty. |
| `sameProcessAsParentSpan` | boolean | (Optional) Set this parameter to indicate whether this span is in the same process as its parent. If you do not set this parameter, Stackdriver Trace is unable to take advantage of this helpful information. |
| `spanId` | string | The \[SPAN_ID\] portion of the span's resource name. |
| `spanKind` | string enum | Distinguishes between spans generated in a particular context. For example, two spans with the same name may be distinguished using `CLIENT` (caller) and `SERVER` (callee) to identify an RPC call. |
| `startTime` | string (google-datetime) | The start time of the span. On the client side, this is the time kept by the local machine where the span execution starts. On the server side, this is the time when the server's application handler starts running. |
| `status` | Status | An optional final status for this span. |

### `TruncatableString`

- Represents a string that might be shortened to a specified length.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `truncatedByteCount` | integer (int32) | The number of bytes removed from the original string. If this value is 0, then the string was not shortened. |
| `value` | string | The shortened string. For example, if the original string is 500 bytes long and the limit of the string is 128 bytes, then `value` contains the first 128 bytes of the 500-byte string. Truncation always happens on a UTF8 character boundary. If there are multi-byte characters in the string, then the length of the shortened string might be less than the size limit. |

### `V1HttpRequest`

- A common proto for logging HTTP requests. Only contains semantics defined by the HTTP specification. Product-specific logging information MUST be defined in a separate message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cacheFillBytes` | string (int64) | The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. |
| `cacheHit` | boolean | Whether or not an entity was served from cache (with or without validation). |
| `cacheLookup` | boolean | Whether or not a cache lookup was attempted. |
| `cacheValidatedWithOriginServer` | boolean | Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if `cache_hit` is True. |
| `latency` | string (google-duration) | The request processing latency on the server, from the time the request was received until the response was sent. |
| `protocol` | string | Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket" |
| `referer` | string | The referer URL of the request, as defined in HTTP/1.1 Header Field Definitions (https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). |
| `remoteIp` | string | The IP address (IPv4 or IPv6) of the client that issued the HTTP request. Examples: `"192.168.1.1"`, `"FE80::0202:B3FF:FE1E:8329"`. |
| `requestMethod` | string | The request method. Examples: `"GET"`, `"HEAD"`, `"PUT"`, `"POST"`. |
| `requestSize` | string (int64) | The size of the HTTP request message in bytes, including the request headers and the request body. |
| `requestUrl` | string | The scheme (http, https), the host name, the path, and the query portion of the URL that was requested. Example: `"http://example.com/some/info?color=red"`. |
| `responseSize` | string (int64) | The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. |
| `serverIp` | string | The IP address (IPv4 or IPv6) of the origin server that the request was sent to. |
| `status` | integer (int32) | The response code indicating the status of the response. Examples: 200, 404. |
| `userAgent` | string | The user agent sent by the client. Example: `"Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)"`. |

### `V1LogEntry`

- An individual log entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `httpRequest` | V1HttpRequest | Optional. Information about the HTTP request associated with this log entry, if applicable. |
| `insertId` | string | A unique ID for the log entry used for deduplication. If omitted, the implementation will generate one based on operation_id. |
| `labels` | object | A set of user-defined (key, value) data that provides additional information about the log entry. |
| `monitoredResourceLabels` | object | A set of user-defined (key, value) data that provides additional information about the moniotored resource that the log entry belongs to. |
| `name` | string | Required. The log to which this log entry belongs. Examples: `"syslog"`, `"book_log"`. |
| `operation` | V1LogEntryOperation | Optional. Information about an operation associated with the log entry, if applicable. |
| `protoPayload` | object | The log entry payload, represented as a protocol buffer that is expressed as a JSON object. The only accepted type currently is AuditLog. |
| `severity` | string enum | The severity of the log entry. The default value is `LogSeverity.DEFAULT`. |
| `sourceLocation` | V1LogEntrySourceLocation | Optional. Source code location information associated with the log entry, if any. |
| `structPayload` | object | The log entry payload, represented as a structure that is expressed as a JSON object. |
| `textPayload` | string | The log entry payload, represented as a Unicode string (UTF-8). |
| `timestamp` | string (google-datetime) | The time the event described by the log entry occurred. If omitted, defaults to operation start time. |
| `trace` | string | Optional. Resource name of the trace associated with the log entry, if any. If this field contains a relative resource name, you can assume the name is relative to `//tracing.googleapis.com`. Example: `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824` |

### `V1LogEntryOperation`

- Additional information about a potentially long-running operation with which a log entry is associated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `first` | boolean | Optional. Set this to True if this is the first log entry in the operation. |
| `id` | string | Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. |
| `last` | boolean | Optional. Set this to True if this is the last log entry in the operation. |
| `producer` | string | Optional. An arbitrary producer identifier. The combination of `id` and `producer` must be globally unique. Examples for `producer`: `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`. |

### `V1LogEntrySourceLocation`

- Additional information about the source code location that produced the log entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `file` | string | Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. |
| `function` | string | Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function` (Python). |
| `line` | string (int64) | Optional. Line within the source file. 1-based; 0 indicates no line number available. |

### `V1ResourceEvent`

- Report v2 extension proto for passing the resource metadata associated with a resource create/update/delete/undelete event from ESF to Chemist. ResourceEvent proto should be serialized into the ReportRequest.operations.extensions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contextId` | string (int64) | The ESF unique context id of the api request, from which this resource event originated. This field is only needed for CAIS integration via api annotation. See go/cais-lro-delete for more details. |
| `destinations` | string | The destinations field determines which backend services should handle the event. This should be specified as a comma-delimited string. |
| `parent` | Resource | The parent resource for the resource. |
| `path` | string enum | The api path the resource event was created in. This should match the source of the `payload` field. For direct integrations with Chemist, this should generally be the RESPONSE. go/resource-event-pipeline-type |
| `payload` | object | The payload contains metadata associated with the resource event. A ResourceEventPayloadStatus is provided instead if the original payload cannot be returned due to a limitation (e.g. size limit). |
| `resource` | Resource | The resource associated with the event. |
| `type` | string enum | The resource event type determines how the backend service should process the event. |

### `V2HttpRequest`

- A common proto for logging HTTP requests. Only contains semantics defined by the HTTP specification. Product-specific logging information MUST be defined in a separate message.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cacheFillBytes` | string (int64) | The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. |
| `cacheHit` | boolean | Whether or not an entity was served from cache (with or without validation). |
| `cacheLookup` | boolean | Whether or not a cache lookup was attempted. |
| `cacheValidatedWithOriginServer` | boolean | Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if `cache_hit` is True. |
| `latency` | string (google-duration) | The request processing latency on the server, from the time the request was received until the response was sent. |
| `protocol` | string | Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket" |
| `referer` | string | The referer URL of the request, as defined in HTTP/1.1 Header Field Definitions (https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). |
| `remoteIp` | string | The IP address (IPv4 or IPv6) of the client that issued the HTTP request. Examples: `"192.168.1.1"`, `"FE80::0202:B3FF:FE1E:8329"`. |
| `requestMethod` | string | The request method. Examples: `"GET"`, `"HEAD"`, `"PUT"`, `"POST"`. |
| `requestSize` | string (int64) | The size of the HTTP request message in bytes, including the request headers and the request body. |
| `requestUrl` | string | The scheme (http, https), the host name, the path, and the query portion of the URL that was requested. Example: `"http://example.com/some/info?color=red"`. |
| `responseSize` | string (int64) | The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. |
| `serverIp` | string | The IP address (IPv4 or IPv6) of the origin server that the request was sent to. |
| `status` | integer (int32) | The response code indicating the status of the response. Examples: 200, 404. |
| `userAgent` | string | The user agent sent by the client. Example: `"Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)"`. |

### `V2LogEntry`

- An individual log entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `httpRequest` | V2HttpRequest | Optional. Information about the HTTP request associated with this log entry, if applicable. |
| `insertId` | string | A unique ID for the log entry used for deduplication. If omitted, the implementation will generate one based on operation_id. |
| `labels` | object | A set of user-defined (key, value) data that provides additional information about the log entry. |
| `monitoredResourceLabels` | object | A set of user-defined (key, value) data that provides additional information about the moniotored resource that the log entry belongs to. |
| `name` | string | Required. The log to which this log entry belongs. Examples: `"syslog"`, `"book_log"`. |
| `operation` | V2LogEntryOperation | Optional. Information about an operation associated with the log entry, if applicable. |
| `protoPayload` | object | The log entry payload, represented as a protocol buffer that is expressed as a JSON object. The only accepted type currently is AuditLog. |
| `severity` | string enum | The severity of the log entry. The default value is `LogSeverity.DEFAULT`. |
| `sourceLocation` | V2LogEntrySourceLocation | Optional. Source code location information associated with the log entry, if any. |
| `structPayload` | object | The log entry payload, represented as a structure that is expressed as a JSON object. |
| `textPayload` | string | The log entry payload, represented as a Unicode string (UTF-8). |
| `timestamp` | string (google-datetime) | The time the event described by the log entry occurred. If omitted, defaults to operation start time. |
| `trace` | string | Optional. Resource name of the trace associated with the log entry, if any. If this field contains a relative resource name, you can assume the name is relative to `//tracing.googleapis.com`. Example: `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824` |

### `V2LogEntryOperation`

- Additional information about a potentially long-running operation with which a log entry is associated.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `first` | boolean | Optional. Set this to True if this is the first log entry in the operation. |
| `id` | string | Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. |
| `last` | boolean | Optional. Set this to True if this is the last log entry in the operation. |
| `producer` | string | Optional. An arbitrary producer identifier. The combination of `id` and `producer` must be globally unique. Examples for `producer`: `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`. |

### `V2LogEntrySourceLocation`

- Additional information about the source code location that produced the log entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `file` | string | Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. |
| `function` | string | Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function` (Python). |
| `line` | string (int64) | Optional. Line within the source file. 1-based; 0 indicates no line number available. |

### `V2ResourceEvent`

- Report v2 extension proto for passing the resource metadata associated with a resource create/update/delete/undelete event from ESF to Chemist. ResourceEvent proto should be serialized into the ReportRequest.operations.extensions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `contextId` | string (int64) | The ESF unique context id of the api request, from which this resource event originated. This field is only needed for CAIS integration via api annotation. See go/cais-lro-delete for more details. |
| `destinations` | string | The destinations field determines which backend services should handle the event. This should be specified as a comma-delimited string. |
| `parent` | Resource | The parent resource for the resource. |
| `path` | string enum | The api path the resource event was created in. This should match the source of the `payload` field. For direct integrations with Chemist, this should generally be the RESPONSE. go/resource-event-pipeline-type |
| `payload` | object | The payload contains metadata associated with the resource event. A ResourceEventPayloadStatus is provided instead if the original payload cannot be returned due to a limitation (e.g. size limit). |
| `resource` | Resource | The resource associated with the event. |
| `type` | string enum | The resource event type determines how the backend service should process the event. |

### `ViolationInfo`

- Provides information about the Policy violation info for this request.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `checkedValue` | string | Optional. Value that is being checked for the policy. This could be in encrypted form (if pii sensitive). This field will only be emitted in LIST_POLICY types |
| `constraint` | string | Optional. Constraint name |
| `constraintViolationInfo` | object | Optional. Provides extra information for the specific violated constraint. See the constraint's documentation to determine if this field is populated and what the structure of the message should be. |
| `errorMessage` | string | Optional. Error message that policy is indicating. |
| `policyType` | string enum | Optional. Indicates the type of the policy. |

### Shape of `AllocateInfo`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "unusedArguments": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) of `servicecontrol` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://servicecontrol.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
