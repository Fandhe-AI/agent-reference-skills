---
source: https://networkservices.googleapis.com/$discovery/rest?version=v1
---

# Network Services API message schemas (networkservices) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/networkservices/`.

### `ServiceBinding`

- ServiceBinding can be used to: - Bind a Service Directory Service to be used in a BackendService resource. This feature will be deprecated soon. - Bind a Private Service Connect producer service to be used in consumer Cloud Service Mesh or Application Load Balancers. - Bind a Cloud Run service to be used in consumer Cloud Service Mesh or Application Load Balancers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `labels` | object | Optional. Set of label tags associated with the ServiceBinding resource. |
| `name` | string | Identifier. Name of the ServiceBinding resource. It matches pattern `projects/*/locations/*/serviceBindings/`. |
| `service` | string | Optional. The full Service Directory Service name of the format `projects/*/locations/*/namespaces/*/services/*`. This field is for Service Directory integration which will be deprecated soon. |
| `serviceId` | string | Output only. The unique identifier of the Service Directory Service against which the ServiceBinding resource is validated. This is populated when the Service Binding resource is used in another resource (like Backend Service). This is of the UUID4 format. This field is for Service Directory integration which will be deprecated soon. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `ServiceLbPolicy`

- ServiceLbPolicy holds load balancing and traffic distribution configuration that can be applied to a global or regional BackendService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCapacityDrain` | ServiceLbPolicyAutoCapacityDrain | Optional. Configuration to automatically move traffic away for unhealthy IG/NEG for the associated Backend Service. |
| `createTime` | string (google-datetime) | Output only. The timestamp when this resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `failoverConfig` | ServiceLbPolicyFailoverConfig | Optional. Configuration related to health based failover. |
| `isolationConfig` | ServiceLbPolicyIsolationConfig | Optional. Configuration to provide isolation support for the associated Backend Service. |
| `labels` | object | Optional. Set of label tags associated with the ServiceLbPolicy resource. |
| `loadBalancingAlgorithm` | string enum | Optional. The type of load balancing algorithm to be used. The default behavior is WATERFALL_BY_REGION. Values: `LOAD_BALANCING_ALGORITHM_UNSPECIFIED`, `SPRAY_TO_WORLD`, `SPRAY_TO_REGION`, `WATERFALL_BY_REGION`, `WATERFALL_BY_ZONE`. |
| `name` | string | Identifier. Name of the ServiceLbPolicy resource. It matches pattern `projects/{project}/locations/{location}/serviceLbPolicies/{service_lb_policy_name}`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when this resource was last updated. |

### `ServiceLbPolicyAutoCapacityDrain`

- Option to specify if an unhealthy IG/NEG should be considered for load balancing and traffic routing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | Optional. If set to 'True', an unhealthy IG/NEG will be set as drained. - An IG/NEG is considered unhealthy if less than 25% of the instances/endpoints in the IG/NEG are healthy. - This option will never result in draining more than 50% of the configured IGs/NEGs for the Backend Service. |

### `ServiceLbPolicyFailoverConfig`

- Option to specify health based failover behavior. This is not related to Network load balancer FailoverPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failoverHealthThreshold` | integer (int32) | Optional. The percentage threshold that a load balancer will begin to send traffic to failover backends. If the percentage of endpoints in a MIG/NEG is smaller than this value, traffic would be sent to failover backends if possible. This field should be set to a value between 1 and 99. The default value is 50 for Global external HTTP(S) load balancer (classic) and Proxyless service mesh, and 70 for others. |

### `ServiceLbPolicyIsolationConfig`

- Configuration to provide isolation support for the associated Backend Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isolationGranularity` | string enum | Optional. The isolation granularity of the load balancer. Values: `ISOLATION_GRANULARITY_UNSPECIFIED`, `REGION`. |
| `isolationMode` | string enum | Optional. The isolation mode of the load balancer. Values: `ISOLATION_MODE_UNSPECIFIED`, `NEAREST`, `STRICT`. |

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

### `TcpRoute`

- TcpRoute is the resource defining how TCP traffic should be routed by a Mesh/Gateway resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `gateways` | array<string> | Optional. Gateways defines a list of gateways this TcpRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/` |
| `labels` | object | Optional. Set of label tags associated with the TcpRoute resource. |
| `meshes` | array<string> | Optional. Meshes defines a list of meshes this TcpRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` The attached Mesh should be of a type SIDECAR |
| `name` | string | Identifier. Name of the TcpRoute resource. It matches pattern `projects/*/locations/*/tcpRoutes/tcp_route_name>`. |
| `rules` | array<TcpRouteRouteRule> | Required. Rules that define how traffic is routed and handled. At least one RouteRule must be supplied. If there are multiple rules then the action taken will be the first rule to match. |
| `selfLink` | string | Output only. Server-defined URL of this resource |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `TcpRouteRouteAction`

- The specifications for routing traffic and applying associated policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<TcpRouteRouteDestination> | Optional. The destination services to which traffic should be forwarded. At least one destination service is required. Only one of route destination or original destination can be set. |
| `idleTimeout` | string (google-duration) | Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 30 seconds. If set to 0s, the timeout will be disabled. |
| `originalDestination` | boolean | Optional. If true, Router will use the destination IP and port of the original connection as the destination of the request. Default is false. Only one of route destinations or original destination can be set. |

### `TcpRouteRouteDestination`

- Describe the destination for traffic to be routed to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceName` | string | Required. The URL of a BackendService to route traffic to. |
| `weight` | integer (int32) | Optional. Specifies the proportion of requests forwarded to the backend referenced by the serviceName field. This is computed as: - weight/Sum(weights in this destination list). For non-zero values, there may be some epsilon from the exact proportion defined here depending on the precision an implementation supports. If only one serviceName is specified and it has a weight greater than 0, 100% of the traffic is forwarded to that backend. If weights are specified for any one service name, they need to be specified for all of them. If weights are unspecified for all services, then, traffic is distributed in equal proportions to all of them. |

### `TcpRouteRouteMatch`

- RouteMatch defines the predicate used to match requests to a given action. Multiple match types are "OR"ed for evaluation. If no routeMatch field is specified, this rule will unconditionally match traffic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Required. Must be specified in the CIDR range format. A CIDR range consists of an IP Address and a prefix length to construct the subnet mask. By default, the prefix length is 32 (i.e. matches a single IP address). Only IPV4 addresses are supported. Examples: "10.0.0.1" - matches against this exact IP address. "10.0.0.0/8" - matches against any IP address within the 10.0.0.0 subnet and 255.255.255.0 mask. "0.0.0.0/0" - matches against any IP address'. |
| `port` | string | Required. Specifies the destination port to match against. |

### `TcpRouteRouteRule`

- Specifies how to match traffic and how to route traffic when traffic is matched.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | TcpRouteRouteAction | Required. The detailed rule defining how to route matched traffic. |
| `matches` | array<TcpRouteRouteMatch> | Optional. RouteMatch defines the predicate used to match requests to a given action. Multiple match types are "OR"ed for evaluation. If no routeMatch field is specified, this rule will unconditionally match traffic. |

### `TelemetryPolicy`

- Provides a configuration for telemetry.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User-provided annotations. |
| `createTime` | string (google-datetime) | Output only. Indicates the timestamp when the resource was created. |
| `deleteTime` | string (google-datetime) | Output only. The time when this resource was soft-deleted. Only populated if the resource is in the process of being deleted. |
| `displayName` | string | Optional. Provides a human-readable name for the policy. |
| `etag` | string | Provides a mechanism for optimistic concurrency control. If this is provided, it must match the server's etag. If the provided etag does not match the server's etag, the request will fail with a 409 ABORTED error. |
| `labels` | object | Optional. Set of label tags associated with the TelemetryPolicy resource. |
| `metricsConfiguration` | MetricsConfiguration | Optional. Specifies the top-level configuration block within the telemetry policy that contains all the settings for how metrics will be applied to the target resources. |
| `name` | string | Identifier. Represents the resource name of the policy. Format: `projects/{project}/locations/{location}/telemetryPolicies/{telemetry_policy}` |
| `reconciling` | boolean | Output only. If true, the service is currently reconciling the resource to the desired state. |
| `telemetryTarget` | TelemetryTarget | Required. Specifies the set of targets to which this telemetry policy applies. |
| `tracingConfiguration` | TracingConfiguration | Optional. Specifies the top-level configuration block within the telemetry policy that contains all the settings for how tracing will be applied to the target resources. |
| `uid` | string | Output only. Specifies the server-assigned unique identifier for the policy. |
| `updateTime` | string (google-datetime) | Output only. Indicates the timestamp when the resource was last updated. |

### `TelemetryTarget`

- Specifies the set of targets to which the TelemetryPolicy should be applied.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `resources` | array<string> | Required. Lists references to the resources that are targeted by the policy. Types of resources supported: - `run.googleapis.com/` - `compute.googleapis.com/` - `networkservices.googleapis.com/` The format must be the full resource name of a supported resource. Examples: `//run.googleapis.com/projects/{project}/locations/{location}/services/{service}` `//compute.googleapis.com/projects/my-project/global/forwardingRules/my-fr-1` `//compute.googleapis.com/projects/my-project/regions/us-central1/forwardingRules/my-fr-1` `//networkservices.googleapis.com/projects/my-project/locations/us-central1/gateways/my-secure-web-proxy-gateway` `//networkservices.googleapis.com/projects/my-project/locations/us-east1/agentGateways/my-agent-gateway` |

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

### `TlsRoute`

- TlsRoute defines how traffic should be routed based on SNI and other matching L3 attributes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A free-text description of the resource. Max length 1024 characters. |
| `gateways` | array<string> | Optional. Gateways defines a list of gateways this TlsRoute is attached to, as one of the routing rules to route the requests served by the gateway. Each gateway reference should match the pattern: `projects/*/locations/*/gateways/` |
| `labels` | object | Optional. Set of label tags associated with the TlsRoute resource. |
| `meshes` | array<string> | Optional. Meshes defines a list of meshes this TlsRoute is attached to, as one of the routing rules to route the requests served by the mesh. Each mesh reference should match the pattern: `projects/*/locations/*/meshes/` The attached Mesh should be of a type SIDECAR |
| `name` | string | Identifier. Name of the TlsRoute resource. It matches pattern `projects/*/locations/*/tlsRoutes/tls_route_name>`. |
| `rules` | array<TlsRouteRouteRule> | Required. Rules that define how traffic is routed and handled. At least one RouteRule must be supplied. If there are multiple rules then the action taken will be the first rule to match. |
| `selfLink` | string | Output only. Server-defined URL of this resource |
| `targetProxies` | array<string> | Optional. TargetProxies defines a list of TargetTcpProxies this TlsRoute is attached to, as one of the routing rules to route the requests served by the TargetTcpProxy. Each TargetTcpProxy reference should match the pattern: `projects/*/locations/*/targetTcpProxies/` |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `TlsRouteRouteAction`

- The specifications for routing traffic and applying associated policies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<TlsRouteRouteDestination> | Required. The destination services to which traffic should be forwarded. At least one destination service is required. |
| `idleTimeout` | string (google-duration) | Optional. Specifies the idle timeout for the selected route. The idle timeout is defined as the period in which there are no bytes sent or received on either the upstream or downstream connection. If not set, the default idle timeout is 1 hour. If set to 0s, the timeout will be disabled. |

### `TlsRouteRouteDestination`

- Describe the destination for traffic to be routed to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceName` | string | Required. The URL of a BackendService to route traffic to. |
| `weight` | integer (int32) | Optional. Specifies the proportion of requests forwarded to the backend referenced by the service_name field. This is computed as: - weight/Sum(weights in destinations) Weights in all destinations does not need to sum up to 100. |

### `TlsRouteRouteMatch`

- RouteMatch defines the predicate used to match requests to a given action. Multiple match types are "AND"ed for evaluation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alpn` | array<string> | Optional. ALPN (Application-Layer Protocol Negotiation) to match against. Examples: "http/1.1", "h2". At least one of sni_host and alpn is required. Up to 5 alpns across all matches can be set. |
| `sniHost` | array<string> | Optional. SNI (server name indicator) to match against. SNI will be matched against all wildcard domains, i.e. `www.example.com` will be first matched against `www.example.com`, then `*.example.com`, then `*.com.` Partial wildcards are not supported, and values like \*w.example.com are invalid. At least one of sni_host and alpn is required. Up to 100 sni hosts across all matches can be set. |

### `TlsRouteRouteRule`

- Specifies how to match traffic and how to route traffic when traffic is matched.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | TlsRouteRouteAction | Required. The detailed rule defining how to route matched traffic. |
| `matches` | array<TlsRouteRouteMatch> | Required. RouteMatch defines the predicate used to match requests to a given action. Multiple match types are "OR"ed for evaluation. Atleast one RouteMatch must be supplied. |

### `TracingConfiguration`

- Configuration for tracing collection.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customSpanAttributes` | array<TracingConfigurationCustomSpanAttribute> | Optional. Provides key-value pairs for adding context to spans. Supports literalValue (static) and fromHeaderValue (dynamic extraction). |
| `parentBasedSampling` | TracingConfigurationParentBasedSampling | Optional. Configures honoring a sampled bit in downstream traceparentID headers. |
| `samplingRate` | number (float) | Optional. Specifies the tracing sampling rate. The sampling rate is a float number in the interval \[0, 1\]. The sampling rate is applied to all requests to the targeted resources. The default value is 0.0. |

### `TracingConfigurationCustomSpanAttribute`

- Key-value pairs for adding context to spans. Supports literal_value (static) and from_header_value (dynamic extraction). Note: literal_value and from_header_value are mutually exclusive, but at least one of them must be set.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `attributeName` | string | Required. Defines the key for a custom attribute that is added to the trace spans generated by the Google Cloud Load Balancer (GCLB). |
| `fromHeaderValue` | string | Optional. Specifies an incoming request header name from which the value for the custom span attribute should be dynamically extracted. Note: the value of the header might be changed during the request processing; in this case the resulting value will be stored. |
| `literalValue` | string | Optional. Assigns a static, constant value to the custom trace span attribute defined by the corresponding attribute_name. |

### `TracingConfigurationParentBasedSampling`

- Configures honoring a sampled bit in downstream traceparentID headers.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Provides a master switch to respect a sampled bit in incoming traceparentID headers. Default is false. |
| `samplingRate` | number (float) | Optional. Specifies the sampling rate to use when the sampled bit is set in the incoming traceparentID header. |

### `TrafficPortSelector`

- Specification of a port-based selector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ports` | array<string> | Optional. A list of ports. Can be port numbers or port range (example, \[80-90\] specifies all ports from 80 to 90, including 80 and 90) or named ports or \* to specify all ports. If the list is empty, all ports are selected. |

### `WasmPlugin`

- `WasmPlugin` is a resource representing a service executing a customer-provided Wasm module.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `labels` | object | Optional. Set of labels associated with the `WasmPlugin` resource. The format must comply with the following requirements. |
| `logConfig` | WasmPluginLogConfig | Optional. Specifies the logging options for the activity performed by this plugin. If logging is enabled, plugin logs are exported to Cloud Logging. Note that the settings relate to the logs generated by using logging statements in your Wasm code. |
| `mainVersionId` | string | Optional. The ID of the `WasmPluginVersion` resource that is the currently serving one. The version referred to must be a child of this `WasmPlugin` resource. |
| `name` | string | Identifier. Name of the `WasmPlugin` resource in the following format: `projects/{project}/locations/{location}/wasmPlugins/{wasm_plugin}`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |
| `usedBy` | array<WasmPluginUsedBy> | Output only. List of all extensions (https://cloud.google.com/service-extensions/docs/overview) that use this `WasmPlugin` resource. |
| `versions` | object | Optional. All versions of this `WasmPlugin` resource in the key-value format. The key is the resource ID, and the value is the `VersionDetails` object. Lets you create or update a `WasmPlugin` resource and its versions in a single request. When the `main_version_id` field is not empty, it must point to one of the `VersionDetails` objects in the map. If provided in a `PATCH` request, the new versions replace the previous set. Any version omitted from the `versions` field is removed. Because the `WasmPluginVersion` resource is immutable, if a `WasmPluginVersion` resource with the same name already exists and differs, the request fails. Note: In a `GET` request, this field is populated only if the field `GetWasmPluginRequest.view` is set to `WASM_PLUGIN_VIEW_FULL`. |

### `WasmPlugin` (v1beta1)

- `WasmPlugin` is a resource representing a service executing a customer-provided Wasm module.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `kmsKeyName` | string | Optional. The name of the customer-managed CryptoKey (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys) to be used to encrypt the `WasmPlugin` image (provided by image_uri) and configuration (provided by plugin_config_data or plugin_config_uri) that are stored by the `Service Extensions` product at rest. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}` By default, Google Cloud automatically encrypts all data at rest using Google-owned and Google-managed encryption keys. If you need ownership and control of the keys that protect your data at rest, you can specify a customer-managed encryption key (CMEK) to encrypt your `WasmPlugin` data. For more information, see Using customer-managed encryption keys (https://cloud.google.com/service-extensions/docs/cmek). |
| `kmsKeyVersion` | string | Output only. The name of the specific CryptoKeyVersion (https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions) used to encrypt the `WasmPlugin` data, if the kms_key_name field is set. Format: `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}/cryptoKeyVersions/{version}` This is a read-only field. `WasmPlugin` data is automatically encrypted using the most recent `CryptoKeyVersion` of the `CryptoKey` provided in the `kms_key_name` field. See Cloud KMS resources (https://cloud.google.com/kms/docs/resource-hierarchy) for more information. |
| `labels` | object | Optional. Set of labels associated with the `WasmPlugin` resource. The format must comply with the following requirements. |
| `logConfig` | WasmPluginLogConfig | Optional. Specifies the logging options for the activity performed by this plugin. If logging is enabled, plugin logs are exported to Cloud Logging. Note that the settings relate to the logs generated by using logging statements in your Wasm code. |
| `mainVersionId` | string | Optional. The ID of the `WasmPluginVersion` resource that is the currently serving one. The version referred to must be a child of this `WasmPlugin` resource. |
| `name` | string | Identifier. Name of the `WasmPlugin` resource in the following format: `projects/{project}/locations/{location}/wasmPlugins/{wasm_plugin}`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |
| `usedBy` | array<WasmPluginUsedBy> | Output only. List of all extensions (https://cloud.google.com/service-extensions/docs/overview) that use this `WasmPlugin` resource. |
| `versions` | object | Optional. All versions of this `WasmPlugin` resource in the key-value format. The key is the resource ID, and the value is the `VersionDetails` object. Lets you create or update a `WasmPlugin` resource and its versions in a single request. When the `main_version_id` field is not empty, it must point to one of the `VersionDetails` objects in the map. If provided in a `PATCH` request, the new versions replace the previous set. Any version omitted from the `versions` field is removed. Because the `WasmPluginVersion` resource is immutable, if a `WasmPluginVersion` resource with the same name already exists and differs, the request fails. Note: In a `GET` request, this field is populated only if the field `GetWasmPluginRequest.view` is set to `WASM_PLUGIN_VIEW_FULL`. |

### `WasmPluginLogConfig`

- Specifies the logging options for the activity performed by this plugin. If logging is enabled, plugin logs are exported to Cloud Logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | Optional. Specifies whether to enable logging for activity by this plugin. Defaults to `false`. |
| `minLogLevel` | string enum | Optional. Non-empty default. Specifies the lowest level of the plugin logs that are exported to Cloud Logging. This setting relates to the logs generated by using logging statements in your Wasm code. This field can be set only if logging is enabled for the plugin. If the field is not provided when logging is enabled, it is set to `INFO` by default. Values: `LOG_LEVEL_UNSPECIFIED`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`. |
| `sampleRate` | number (float) | Optional. Non-empty default. Configures the sampling rate of activity logs, where `1.0` means all logged activity is reported and `0.0` means no activity is reported. A floating point value between `0.0` and `1.0` indicates that a percentage of log messages is stored. The default value when logging is enabled is `1.0`. The value of the field must be between `0` and `1` (inclusive). This field can be specified only if logging is enabled for this plugin. |

### `WasmPluginUsedBy`

- Defines a resource that uses the `WasmPlugin` resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Full name of the resource https://google.aip.dev/122#full-resource-names, for example `//networkservices.googleapis.com/projects/{project}/locations/{location}/lbRouteExtensions/{extension}` |

### `WasmPluginVersion`

- A single immutable version of a `WasmPlugin` resource. Defines the Wasm module used and optionally its runtime config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `imageDigest` | string | Output only. This field holds the digest (usually checksum) value for the plugin image. The value is calculated based on the `image_uri` field. If the `image_uri` field refers to a container image, the digest value is obtained from the container image. If the `image_uri` field refers to a generic artifact, the digest value is calculated based on the contents of the file. |
| `imageUri` | string | Optional. URI of the image containing the Wasm module, stored in Artifact Registry. The URI can refer to one of the following repository formats: \* Container images: the `image_uri` must point to a container that contains a single file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `image_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. \* Generic artifacts: the `image_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `image_digest` field. |
| `labels` | object | Optional. Set of labels associated with the `WasmPluginVersion` resource. |
| `name` | string | Identifier. Name of the `WasmPluginVersion` resource in the following format: `projects/{project}/locations/{location}/wasmPlugins/{wasm_plugin}/ versions/{wasm_plugin_version}`. |
| `pluginConfigData` | string (byte) | Configuration for the plugin. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. When a new `WasmPluginVersion` resource is created, the digest of the contents is saved in the `plugin_config_digest` field. |
| `pluginConfigDigest` | string | Output only. This field holds the digest (usually checksum) value for the plugin configuration. The value is calculated based on the contents of `plugin_config_data` field or the image defined by the `plugin_config_uri` field. |
| `pluginConfigUri` | string | URI of the plugin configuration stored in the Artifact Registry. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. The URI can refer to one of the following repository formats: \* Container images: the `plugin_config_uri` must point to a container that contains a single file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `plugin_config_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. \* Generic artifacts: the `plugin_config_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `plugin_config_digest` field. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### `WasmPluginVersionDetails`

- Details of a `WasmPluginVersion` resource to be inlined in the `WasmPlugin` resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. |
| `description` | string | Optional. A human-readable description of the resource. |
| `imageDigest` | string | Output only. This field holds the digest (usually checksum) value for the plugin image. The value is calculated based on the `image_uri` field. If the `image_uri` field refers to a container image, the digest value is obtained from the container image. If the `image_uri` field refers to a generic artifact, the digest value is calculated based on the contents of the file. |
| `imageUri` | string | Optional. URI of the image containing the Wasm module, stored in Artifact Registry. The URI can refer to one of the following repository formats: \* Container images: the `image_uri` must point to a container that contains a single file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `image_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. \* Generic artifacts: the `image_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.wasm`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `image_digest` field. |
| `labels` | object | Optional. Set of labels associated with the `WasmPluginVersion` resource. |
| `pluginConfigData` | string (byte) | Configuration for the plugin. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. When a new `WasmPluginVersion` version is created, the digest of the contents is saved in the `plugin_config_digest` field. |
| `pluginConfigDigest` | string | Output only. This field holds the digest (usually checksum) value for the plugin configuration. The value is calculated based on the contents of `plugin_config_data` field or the image defined by the `plugin_config_uri` field. |
| `pluginConfigUri` | string | URI of the plugin configuration stored in the Artifact Registry. The configuration is provided to the plugin at runtime through the `ON_CONFIGURE` callback. The URI can refer to one of the following repository formats: \* Container images: the `plugin_config_uri` must point to a container that contains a single file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the digest of the image is saved in the `plugin_config_digest` field. When pulling a container image from Artifact Registry, the digest value is used instead of an image tag. \* Generic artifacts: the `plugin_config_uri` must be in this format: `projects/{project}/locations/{location}/repositories/{repository}/ genericArtifacts/{package}:{version}`. The specified package and version must contain a file with the name `plugin.config`. When a new `WasmPluginVersion` resource is created, the checksum of the contents of the file is saved in the `plugin_config_digest` field. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was updated. |

### Shape of `ServiceBinding`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "createTime": "string (google-datetime)",
  "description": "string",
  "labels": "object",
  "name": "string",
  "service": "string",
  "serviceId": "string",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networkservices` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `TcpRouteRouteMatch.address` example says `"10.0.0.0/8"` matches "any IP address within the 10.0.0.0 subnet and 255.255.255.0 mask"; the mask of a `/8` prefix is `255.0.0.0` (`10.0.0.0`–`10.255.255.255`), and `255.255.255.0` is the mask of a `/24` prefix.
- Corrected from the official docs (the Discovery text above is verbatim): `name` descriptions that read "It matches pattern `projects/*/locations/*/<collection>/`" (for `gateways`, `meshes`, `grpcRoutes`, `serviceBindings`, `agentGateways`, `agentConnectivityTemplates` and `expressLinks`) lack the resource ID; the Discovery path patterns of the corresponding `patch` methods end with `/<collection>/[^/]+` (for example `projects/[^/]+/locations/[^/]+/gateways/[^/]+`), so the name is `projects/{project}/locations/{location}/<collection>/{id}`.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://networkservices.googleapis.com/$discovery/rest?version=v1, https://networkservices.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
