---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 9/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `NodeTypeAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NodeTypesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Alwayscompute#nodeTypeAggregatedList for aggregated lists of node types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NodeTypeList`

- Contains a list of node types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NodeType> | A list of NodeType resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource.Always compute#nodeTypeList for lists of node types. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NodeTypesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeTypes` | array<NodeType> | \[Output Only\] A list of node types contained in this scope. |
| `warning` | object | \[Output Only\] An informational warning that appears when the node types list is empty. |

### `NotificationEndpoint`

- Represents a notification endpoint. A notification endpoint resource defines an endpoint to receive notifications when there are status changes detected by the associated health check service. For more information, see Health checks overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `grpcSettings` | NotificationEndpointGrpcSettings | Settings of the gRPC notification endpoint including the endpoint URL and the retry duration. |
| `id` | string (uint64) | Output only. \[Output Only\] A unique identifier for this resource type. The server generates this identifier. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#notificationEndpoint for notification endpoints. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the notification endpoint resides. This field applies only to the regional resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `NotificationEndpointAggregatedList`

- Contains a list of NotificationEndpointsScopedList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of NotificationEndpointsScopedList resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NotificationEndpointGrpcSettings`

- Represents a gRPC setting that describes one gRPC notification endpoint and the retry duration attempting to send notification to this endpoint.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authority` | string | Optional. If specified, this field is used to set the authority header by the sender of notifications. See https://tools.ietf.org/html/rfc7540#section-8.1.2.3 |
| `endpoint` | string | Endpoint to which gRPC notifications are sent. This must be a valid gRPCLB DNS name. |
| `payloadName` | string | Optional. If specified, this field is used to populate the "name" field in gRPC requests. |
| `resendInterval` | Duration | Optional. This field is used to configure how often to send a full update of all non-healthy backends. If unspecified, full updates are not sent. If specified, must be in the range between 600 seconds to 3600 seconds. Nanos are disallowed. Can only be set for regional notification endpoints. |
| `retryDurationSec` | integer (uint32) | How much time (in seconds) is spent attempting notification retries until a successful response is received. Default is 30s. Limit is 20m (1200s). Must be a positive number. |

### `NotificationEndpointList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<NotificationEndpoint> | A list of NotificationEndpoint resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#notificationEndpoint for notification endpoints. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `NotificationEndpointsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resources` | array<NotificationEndpoint> | A list of NotificationEndpoints contained in this scope. |
| `warning` | object | Informational warning which replaces the list of notification endpoints when the list is empty. |

### `Operation`

- Represents an Operation resource. Google Compute Engine has three Operation resources: \* Global \* Regional \* Zonal You can use an operation resource to manage asynchronous API requests. For more information, readHandling API responses. Operations can be global, regional or zonal. - For global operations, use the `globalOperations` resource. - For regional operations, use the `regionOperations` resource. - For zonal operations, use the `zoneOperations` resource. For more information, read Global, Regional, and Zonal Resources. Note that completed Operation resources have a limited retention period.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientOperationId` | string | \[Output Only\] The value of `requestId` if you provided it in the request. Not present otherwise. |
| `creationTimestamp` | string | \[Deprecated\] This field is deprecated. |
| `description` | string | \[Output Only\] A textual description of the operation, which is set when the operation is created. |
| `endTime` | string | \[Output Only\] The time that this operation was completed. This value is inRFC3339 text format. |
| `error` | object | \[Output Only\] If errors are generated during processing of the operation, this field will be populated. |
| `getHealthOperationMetadata` | GetHealthOperationMetadata | Output only. Metadata for GetHealth operations. |
| `getVersionOperationMetadata` | GetVersionOperationMetadata | — |
| `httpErrorMessage` | string | \[Output Only\] If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`. |
| `httpErrorStatusCode` | integer (int32) | \[Output Only\] If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the operation. This identifier is defined by the server. |
| `insertTime` | string | \[Output Only\] The time that this operation was requested. This value is inRFC3339 text format. |
| `instancesBulkInsertOperationMetadata` | InstancesBulkInsertOperationMetadata | — |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always `compute#operation` for Operation resources. |
| `name` | string | \[Output Only\] Name of the operation. |
| `operationGroupId` | string | Output only. \[Output Only\] An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request. |
| `operationType` | string | \[Output Only\] The type of operation, such as `insert`, `update`, or `delete`, and so on. |
| `progress` | integer (int32) | \[Output Only\] An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses. |
| `region` | string | \[Output Only\] The URL of the region where the operation resides. Only applicable when performing regional operations. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `setCommonInstanceMetadataOperationMetadata` | SetCommonInstanceMetadataOperationMetadata | Output only. \[Output Only\] If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state. |
| `startTime` | string | \[Output Only\] The time that this operation was started by the server. This value is inRFC3339 text format. |
| `status` | string enum | \[Output Only\] The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`. Values: `DONE`, `PENDING`, `RUNNING`. |
| `statusMessage` | string | \[Output Only\] An optional textual description of the current status of the operation. |
| `targetId` | string (uint64) | \[Output Only\] The unique target ID, which identifies a specific incarnation of the target resource. |
| `targetLink` | string | \[Output Only\] The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from. |
| `user` | string | \[Output Only\] User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`. |
| `warnings` | array<object> | \[Output Only\] If warning messages are generated during processing of the operation, this field will be populated. |
| `zone` | string | \[Output Only\] The URL of the zone where the operation resides. Only applicable when performing per-zone operations. |

### `Operation` (alpha)

- Represents an Operation resource. Google Compute Engine has three Operation resources: \* Global \* Regional \* Zonal You can use an operation resource to manage asynchronous API requests. For more information, readHandling API responses. Operations can be global, regional or zonal. - For global operations, use the `globalOperations` resource. - For regional operations, use the `regionOperations` resource. - For zonal operations, use the `zoneOperations` resource. For more information, read Global, Regional, and Zonal Resources. Note that completed Operation resources have a limited retention period.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `clientOperationId` | string | \[Output Only\] The value of `requestId` if you provided it in the request. Not present otherwise. |
| `creationTimestamp` | string | \[Deprecated\] This field is deprecated. |
| `description` | string | \[Output Only\] A textual description of the operation, which is set when the operation is created. |
| `endTime` | string | \[Output Only\] The time that this operation was completed. This value is inRFC3339 text format. |
| `error` | object | \[Output Only\] If errors are generated during processing of the operation, this field will be populated. |
| `firewallPolicyRuleOperationMetadata` | FirewallPolicyRuleOperationMetadata | Output only. \[Output Only\] Metadata containing the allocated priority from the networkFirewallPolicies.addRule and regionNetworkFirewallPolicies.addRule methods if not explicitly provided by the user. |
| `getHealthOperationMetadata` | GetHealthOperationMetadata | Output only. Metadata for GetHealth operations. |
| `getVersionOperationMetadata` | GetVersionOperationMetadata | — |
| `httpErrorMessage` | string | \[Output Only\] If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`. |
| `httpErrorStatusCode` | integer (int32) | \[Output Only\] If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the operation. This identifier is defined by the server. |
| `insertTime` | string | \[Output Only\] The time that this operation was requested. This value is inRFC3339 text format. |
| `instancesBulkInsertOperationMetadata` | InstancesBulkInsertOperationMetadata | — |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always `compute#operation` for Operation resources. |
| `name` | string | \[Output Only\] Name of the operation. |
| `operationGroupId` | string | Output only. \[Output Only\] An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request. |
| `operationType` | string | \[Output Only\] The type of operation, such as `insert`, `update`, or `delete`, and so on. |
| `progress` | integer (int32) | \[Output Only\] An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses. |
| `region` | string | \[Output Only\] The URL of the region where the operation resides. Only applicable when performing regional operations. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `setCommonInstanceMetadataOperationMetadata` | SetCommonInstanceMetadataOperationMetadata | Output only. \[Output Only\] If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state. |
| `startTime` | string | \[Output Only\] The time that this operation was started by the server. This value is inRFC3339 text format. |
| `status` | string enum | \[Output Only\] The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`. Values: `DONE`, `PENDING`, `RUNNING`. |
| `statusMessage` | string | \[Output Only\] An optional textual description of the current status of the operation. |
| `targetId` | string (uint64) | \[Output Only\] The unique target ID, which identifies a specific incarnation of the target resource. |
| `targetLink` | string | \[Output Only\] The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from. |
| `user` | string | \[Output Only\] User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`. |
| `warnings` | array<object> | \[Output Only\] If warning messages are generated during processing of the operation, this field will be populated. |
| `zone` | string | \[Output Only\] The URL of the zone where the operation resides. Only applicable when performing per-zone operations. |

### `Operation` (preview)

- Represents an Operation resource. Google Compute Engine has three Operation resources: \* Global \* Regional \* Zonal You can use an operation resource to manage asynchronous API requests. For more information, readHandling API responses. Operations can be global, regional or zonal. - For global operations, use the `globalOperations` resource. - For regional operations, use the `regionOperations` resource. - For zonal operations, use the `zoneOperations` resource. For more information, read Global, Regional, and Zonal Resources. Note that completed Operation resources have a limited retention period.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `clientOperationId` | string | \[Output Only\] The value of `requestId` if you provided it in the request. Not present otherwise. |
| `creationTimestamp` | string | \[Deprecated\] This field is deprecated. |
| `description` | string | \[Output Only\] A textual description of the operation, which is set when the operation is created. |
| `details` | OperationDetails | \[Output Only\] Extended details about the operation's execution. |
| `endTime` | string | \[Output Only\] The time that this operation was completed. This value is inRFC3339 text format. |
| `error` | object | \[Output Only\] If errors are generated during processing of the operation, this field will be populated. |
| `getHealthOperationMetadata` | GetHealthOperationMetadata | Output only. Metadata for GetHealth operations. |
| `getVersionOperationMetadata` | GetVersionOperationMetadata | — |
| `httpErrorMessage` | string | \[Output Only\] If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`. |
| `httpErrorStatusCode` | integer (int32) | \[Output Only\] If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the operation. This identifier is defined by the server. |
| `insertTime` | string | \[Output Only\] The time that this operation was requested. This value is inRFC3339 text format. |
| `instancesBulkInsertOperationMetadata` | InstancesBulkInsertOperationMetadata | — |
| `instancesTroubleshootOperationMetadata` | InstancesTroubleshootOperationMetadata | Output only. \[Output Only\] Operation metadata for instances.troubleshoot. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always `compute#operation` for Operation resources. |
| `name` | string | \[Output Only\] Name of the operation. |
| `operationGroupId` | string | Output only. \[Output Only\] An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request. |
| `operationType` | string | \[Output Only\] The type of operation, such as `insert`, `update`, or `delete`, and so on. |
| `progress` | integer (int32) | \[Output Only\] An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses. |
| `region` | string | \[Output Only\] The URL of the region where the operation resides. Only applicable when performing regional operations. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `setCommonInstanceMetadataOperationMetadata` | SetCommonInstanceMetadataOperationMetadata | Output only. \[Output Only\] If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state. |
| `startTime` | string | \[Output Only\] The time that this operation was started by the server. This value is inRFC3339 text format. |
| `status` | string enum | \[Output Only\] The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`. Values: `DONE`, `PENDING`, `RUNNING`. |
| `statusMessage` | string | \[Output Only\] An optional textual description of the current status of the operation. |
| `targetId` | string (uint64) | \[Output Only\] The unique target ID, which identifies a specific incarnation of the target resource. |
| `targetLink` | string | \[Output Only\] The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from. |
| `user` | string | \[Output Only\] User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`. |
| `warnings` | array<object> | \[Output Only\] If warning messages are generated during processing of the operation, this field will be populated. |
| `zone` | string | \[Output Only\] The URL of the zone where the operation resides. Only applicable when performing per-zone operations. |

### `OperationAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `items` | object | \[Output Only\] A map of scoped operation lists. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always `compute#operationAggregatedList` for aggregated lists of operations. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger than `maxResults`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `OperationDetails`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `data` | object | Machine readable data from the message. |
| `message` | string | Human or AI readable details on execution of the operation. |

### `OperationList`

- Contains a list of Operation resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `items` | array<Operation> | \[Output Only\] A list of Operation resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always `compute#operations` for Operations resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger than `maxResults`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `OperationsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operations` | array<Operation> | \[Output Only\] A list of operations contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of operations when the list is empty. |

### `OrganizationRolloutsListResponse`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Rollout> | A list of Rollout resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `OrganizationSecurityPoliciesListAssociationsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associations` | array<SecurityPolicyAssociation> | A list of associations. |
| `kind` | string | Output only. \[Output Only\] Type of securityPolicy associations. Alwayscompute#organizationSecurityPoliciesListAssociations for lists of securityPolicy associations. |

### `OrganizationVmExtensionPolicyAggregatedListResponse`

-
- Version: preview

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of VmExtensionPoliciesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#OrganizationVmExtensionPolicyAggregatedList for lists of VmExtensionPolicies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `OriginAuthenticationMethod`

- \[Deprecated\] Configuration for the origin authentication method. Configuration for the origin authentication method.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `jwt` | Jwt | — |

### `OutlierDetection`

- Settings controlling the eviction of unhealthy hosts from the load balancing pool for the backend service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseEjectionTime` | Duration | The base time that a backend endpoint is ejected for. Defaults to 30000ms or 30s. After a backend endpoint is returned back to the load balancing pool, it can be ejected again in another ejection analysis. Thus, the total ejection time is equal to the base ejection time multiplied by the number of times the backend endpoint has been ejected. Defaults to 30000ms or 30s. |
| `consecutiveErrors` | integer (int32) | Number of consecutive errors before a backend endpoint is ejected from the load balancing pool. When the backend endpoint is accessed over HTTP, a 5xx return code qualifies as an error. Defaults to 5. |
| `consecutiveGatewayFailure` | integer (int32) | The number of consecutive gateway failures (502, 503, 504 status or connection errors that are mapped to one of those status codes) before a consecutive gateway failure ejection occurs. Defaults to 3. |
| `enforcingConsecutiveErrors` | integer (int32) | The percentage chance that a backend endpoint will be ejected when an outlier status is detected through consecutive 5xx. This setting can be used to disable ejection or to ramp it up slowly. Defaults to 0. |
| `enforcingConsecutiveGatewayFailure` | integer (int32) | The percentage chance that a backend endpoint will be ejected when an outlier status is detected through consecutive gateway failures. This setting can be used to disable ejection or to ramp it up slowly. Defaults to 100. |
| `enforcingSuccessRate` | integer (int32) | The percentage chance that a backend endpoint will be ejected when an outlier status is detected through success rate statistics. This setting can be used to disable ejection or to ramp it up slowly. Defaults to 100. Not supported when the backend service uses Serverless NEG. |
| `interval` | Duration | Time interval between ejection analysis sweeps. This can result in both new ejections and backend endpoints being returned to service. The interval is equal to the number of seconds as defined in outlierDetection.interval.seconds plus the number of nanoseconds as defined in outlierDetection.interval.nanos. Defaults to 1 second. |
| `maxEjectionPercent` | integer (int32) | Maximum percentage of backend endpoints in the load balancing pool for the backend service that can be ejected if the ejection conditions are met. Defaults to 50%. |
| `successRateMinimumHosts` | integer (int32) | The number of backend endpoints in the load balancing pool that must have enough request volume to detect success rate outliers. If the number of backend endpoints is fewer than this setting, outlier detection via success rate statistics is not performed for any backend endpoint in the load balancing pool. Defaults to 5. Not supported when the backend service uses Serverless NEG. |
| `successRateRequestVolume` | integer (int32) | The minimum number of total requests that must be collected in one interval (as defined by the interval duration above) to include this backend endpoint in success rate based outlier detection. If the volume is lower than this setting, outlier detection via success rate statistics is not performed for that backend endpoint. Defaults to 100. Not supported when the backend service uses Serverless NEG. |
| `successRateStdevFactor` | integer (int32) | This factor is used to determine the ejection threshold for success rate outlier ejection. The ejection threshold is the difference between the mean success rate, and the product of this factor and the standard deviation of the mean success rate: mean - (stdev \* successRateStdevFactor). This factor is divided by a thousand to get a double. That is, if the desired factor is 1.9, the runtime value should be 1900. Defaults to 1900. Not supported when the backend service uses Serverless NEG. |

### `PacketIntervals`

- Next free: 7
- Version: v1

| Field | Type | Description |
|---|---|---|
| `avgMs` | string (int64) | Average observed inter-packet interval in milliseconds. |
| `duration` | string enum | From how long ago in the past these intervals were observed. Values: `DURATION_UNSPECIFIED`, `HOUR`, `MAX`, `MINUTE`. |
| `maxMs` | string (int64) | Maximum observed inter-packet interval in milliseconds. |
| `minMs` | string (int64) | Minimum observed inter-packet interval in milliseconds. |
| `numIntervals` | string (int64) | Number of inter-packet intervals from which these statistics were derived. |
| `type` | string enum | The type of packets for which inter-packet intervals were computed. Values: `LOOPBACK`, `RECEIVE`, `TRANSMIT`, `TYPE_UNSPECIFIED`. |

### `PacketMirroring`

- Represents a Packet Mirroring resource. Packet Mirroring clones the traffic of specified instances in your Virtual Private Cloud (VPC) network and forwards it to a collector destination, such as an instance group of an internal TCP/UDP load balancer, for analysis or examination. For more information about setting up Packet Mirroring, seeUsing Packet Mirroring.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectorIlb` | PacketMirroringForwardingRuleInfo | The Forwarding Rule resource of typeloadBalancingScheme=INTERNAL that will be used as collector for mirrored traffic. The specified forwarding rule must have isMirroringCollector set to true. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enable` | string enum | Indicates whether or not this packet mirroring takes effect. If set to FALSE, this packet mirroring policy will not be enforced on the network. The default is TRUE. Values: `FALSE`, `TRUE`. |
| `filter` | PacketMirroringFilter | Filter for mirrored traffic. If unspecified, all IPv4 traffic is mirrored. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#packetMirroring for packet mirrorings. |
| `mirroredResources` | PacketMirroringMirroredResourceInfo | PacketMirroring mirroredResourceInfos. MirroredResourceInfo specifies a set of mirrored VM instances, subnetworks and/or tags for which traffic from/to all VM instances will be mirrored. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | PacketMirroringNetworkInfo | Specifies the mirrored VPC network. Only packets in this network will be mirrored. All mirrored VMs should have a NIC in the given network. All mirrored subnetworks should belong to the given network. |
| `priority` | integer (uint32) | The priority of applying this configuration. Priority is used to break ties in cases where there is more than one matching rule. In the case of two rules that apply for a given Instance, the one with the lowest-numbered priority value wins. Default value is 1000. Valid range is 0 through 65535. |
| `region` | string | \[Output Only\] URI of the region where the packetMirroring resides. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |

### `PacketMirroring` (alpha)

- Represents a Packet Mirroring resource. Packet Mirroring clones the traffic of specified instances in your Virtual Private Cloud (VPC) network and forwards it to a collector destination, such as an instance group of an internal TCP/UDP load balancer, for analysis or examination. For more information about setting up Packet Mirroring, seeUsing Packet Mirroring.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `collectorIlb` | PacketMirroringForwardingRuleInfo | The Forwarding Rule resource of typeloadBalancingScheme=INTERNAL that will be used as collector for mirrored traffic. The specified forwarding rule must have isMirroringCollector set to true. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enable` | string enum | Indicates whether or not this packet mirroring takes effect. If set to FALSE, this packet mirroring policy will not be enforced on the network. The default is TRUE. Values: `FALSE`, `TRUE`. |
| `filter` | PacketMirroringFilter | Filter for mirrored traffic. If unspecified, all IPv4 traffic is mirrored. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#packetMirroring for packet mirrorings. |
| `mirroredResources` | PacketMirroringMirroredResourceInfo | PacketMirroring mirroredResourceInfos. MirroredResourceInfo specifies a set of mirrored VM instances, subnetworks and/or tags for which traffic from/to all VM instances will be mirrored. |
| `name` | string | Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `network` | PacketMirroringNetworkInfo | Specifies the mirrored VPC network. Only packets in this network will be mirrored. All mirrored VMs should have a NIC in the given network. All mirrored subnetworks should belong to the given network. |
| `priority` | integer (uint32) | The priority of applying this configuration. Priority is used to break ties in cases where there is more than one matching rule. In the case of two rules that apply for a given Instance, the one with the lowest-numbered priority value wins. Default value is 1000. Valid range is 0 through 65535. |
| `region` | string | \[Output Only\] URI of the region where the packetMirroring resides. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |

### `PacketMirroringAggregatedList`

- Contains a list of packetMirrorings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of PacketMirroring resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `PacketMirroringFilter`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `IPProtocols` | array<string> | Protocols that apply as filter on mirrored traffic. If no protocols are specified, all traffic that matches the specified CIDR ranges is mirrored. If neither cidrRanges nor IPProtocols is specified, all IPv4 traffic is mirrored. |
| `cidrRanges` | array<string> | One or more IPv4 or IPv6 CIDR ranges that apply as filters on the source (ingress) or destination (egress) IP in the IP header. If no ranges are specified, all IPv4 traffic that matches the specified IPProtocols is mirrored. If neither cidrRanges nor IPProtocols is specified, all IPv4 traffic is mirrored. To mirror all IPv4 and IPv6 traffic, use "0.0.0.0/0,::/0". |
| `direction` | string enum | Direction of traffic to mirror, either INGRESS, EGRESS, or BOTH. The default is BOTH. Values: `BOTH`, `EGRESS`, `INGRESS`. |

### `PacketMirroringForwardingRuleInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalUrl` | string | Output only. \[Output Only\] Unique identifier for the forwarding rule; defined by the server. |
| `url` | string | Resource URL to the forwarding rule representing the ILB configured as destination of the mirrored traffic. |

### `PacketMirroringList`

- Contains a list of PacketMirroring resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<PacketMirroring> | A list of PacketMirroring resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#packetMirroring for packetMirrorings. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `PacketMirroringMirroredResourceInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<PacketMirroringMirroredResourceInfoInstanceInfo> | A set of virtual machine instances that are being mirrored. They must live in zones contained in the same region as this packetMirroring. Note that this config will apply only to those network interfaces of the Instances that belong to the network specified in this packetMirroring. You may specify a maximum of 50 Instances. |
| `subnetworks` | array<PacketMirroringMirroredResourceInfoSubnetInfo> | A set of subnetworks for which traffic from/to all VM instances will be mirrored. They must live in the same region as this packetMirroring. You may specify a maximum of 5 subnetworks. |
| `tags` | array<string> | A set of mirrored tags. Traffic from/to all VM instances that have one or more of these tags will be mirrored. |

### `PacketMirroringMirroredResourceInfoInstanceInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalUrl` | string | Output only. \[Output Only\] Unique identifier for the instance; defined by the server. |
| `url` | string | Resource URL to the virtual machine instance which is being mirrored. |

### `PacketMirroringMirroredResourceInfoSubnetInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalUrl` | string | Output only. \[Output Only\] Unique identifier for the subnetwork; defined by the server. |
| `url` | string | Resource URL to the subnetwork for which traffic from/to all VM instances will be mirrored. |

### `PacketMirroringNetworkInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canonicalUrl` | string | Output only. \[Output Only\] Unique identifier for the network; defined by the server. |
| `url` | string | URL of the network resource. |

### `PacketMirroringsScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `packetMirrorings` | array<PacketMirroring> | A list of packetMirrorings contained in this scope. |
| `warning` | object | Informational warning which replaces the list of packetMirrorings when the list is empty. |

### `PartitionFormability`

- Formability of a partition.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `acceleratorTopology` | string | Topological shape (e.g., "4x4x4"). |
| `parent` | string | Partition ID of a partition that is a direct parent in the tree hierarchy. In case the partition represents a full cube, it doesn't have a parent field. |
| `partitionId` | string | Identifier for this topological block. |
| `status` | PartitionFormabilityStatus | Output only. Defines the status of the partition. |
| `subblock` | string | The URL of the capacity subblock. |

### `PartitionFormabilityStatus`

- Status of a partition formability.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `acceleratorInterconnect` | string | URL of the AcceleratorInterconnect utilizing this partition. |
| `error` | object | Detailed error status if the subblock has wrong or no provisioning. When set, only subblock and error are populated. |
| `infrastructureHealth` | string enum | Physical health of the underlying infrastructure. Values: `DEGRADED`, `HEALTHY`, `INFRASTRUCTURE_HEALTH_UNSPECIFIED`, `UNHEALTHY`. |
| `instance` | string | URL of an instance provisioned in a single-host partitionID at the lowest level of the partition tree. Empty if the instance is missing. |
| `instanceState` | string enum | State of the instances within this partition. Values: `INSTANCE_STATE_UNSPECIFIED`, `NOT_READY`, `RUNNING`. |
| `state` | string enum | Current formability state. Values: `NOT_READY`, `READY`, `READY_DEGRADED`, `STATE_UNSPECIFIED`. |
| `usageState` | string enum | Usage state indicating if the partition is occupied. Values: `FREE`, `IN_USE`, `USAGE_STATE_UNSPECIFIED`. |

### `PartnerMetadata`

- Model definition of partner_metadata field. To be used in dedicated Partner Metadata methods and to be inlined in the Instance and InstanceTemplate resources.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Instance-level hash to be used for optimistic locking. |
| `partnerMetadata` | object | Partner Metadata assigned to the instance. A map from a subdomain to entries map. Subdomain name must be compliant withRFC1035 definition. The total size of all keys and values must be less than 2MB. Subdomain 'metadata.compute.googleapis.com' is reserverd for instance's metadata. |

### `PathMatcher`

- A matcher for the path portion of the URL. The BackendService from the longest-matched rule will serve the URL. If no rule was matched, the default service is used.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultCustomErrorResponsePolicy` | CustomErrorResponsePolicy | defaultCustomErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. This policy takes effect at the PathMatcher level and applies only when no policy has been defined for the error code at lower levels likeRouteRule and PathRule within thisPathMatcher. If an error code does not have a policy defined in defaultCustomErrorResponsePolicy, then a policy defined for the error code in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy is configured with policies for 5xx and 4xx errors - A RouteRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in RouteRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. When used in conjunction withpathMatcher.defaultRouteAction.retryPolicy, retries take precedence. Only once all retries are exhausted, thedefaultCustomErrorResponsePolicy is applied. While attempting a retry, if load balancer is successful in reaching the service, the defaultCustomErrorResponsePolicy is ignored and the response from the service is returned to the client. defaultCustomErrorResponsePolicy is supported only for global external Application Load Balancers. |
| `defaultRouteAction` | HttpRouteAction | defaultRouteAction takes effect when none of the pathRules or routeRules match. The load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a path matcher'sdefaultRouteAction. |
| `defaultService` | string | The full or partial URL to the BackendService resource. This URL is used if none of the pathRules orrouteRules defined by this PathMatcher are matched. For example, the following are all valid URLs to a BackendService resource: - https://www.googleapis.com/compute/v1/projects/project/global/backendServices/backendService - compute/v1/projects/project/global/backendServices/backendService - global/backendServices/backendService If defaultRouteAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Authorization requires one or more of the following Google IAM permissions on the specified resource default_service: - compute.backendBuckets.use - compute.backendServices.use |
| `defaultUrlRedirect` | HttpRedirectAction | When none of the specified pathRules orrouteRules match, the request is redirected to a URL specified by defaultUrlRedirect. Only one of defaultUrlRedirect, defaultService or defaultRouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `headerAction` | HttpHeaderAction | Specifies changes to request and response headers that need to take effect for the selected backend service. HeaderAction specified here are applied after the matchingHttpRouteRule HeaderAction and before theHeaderAction in the UrlMap HeaderAction is not supported for load balancers that have their loadBalancingScheme set to EXTERNAL. Not supported when the URL map is bound to a target gRPC proxy that has validateForProxyless field set to true. |
| `name` | string | The name to which this PathMatcher is referred by theHostRule. |
| `pathRules` | array<PathRule> | The list of path rules. Use this list instead of routeRules when routing based on simple path matching is all that's required. A path rule can only include a wildcard character (\*) after a forward slash character ("/"). The order by which path rules are specified does not matter. Matches are always done on the longest-path-first basis. For example: a pathRule with a path /a/b/c/\* will match before /a/b/\* irrespective of the order in which those paths appear in this list. Within a given pathMatcher, only one ofpathRules or routeRules must be set. |
| `routeRules` | array<HttpRouteRule> | The list of HTTP route rules. Use this list instead ofpathRules when advanced route matching and routing actions are desired. routeRules are evaluated in order of priority, from the lowest to highest number. Within a given pathMatcher, you can set only one ofpathRules or routeRules. |

### `PathRule`

- A path-matching rule for a URL. If matched, will use the specifiedBackendService to handle the traffic arriving at this URL.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customErrorResponsePolicy` | CustomErrorResponsePolicy | customErrorResponsePolicy specifies how the Load Balancer returns error responses when BackendServiceorBackendBucket responds with an error. If a policy for an error code is not configured for the PathRule, a policy for the error code configured inpathMatcher.defaultCustomErrorResponsePolicy is applied. If one is not specified inpathMatcher.defaultCustomErrorResponsePolicy, the policy configured in UrlMap.defaultCustomErrorResponsePolicy takes effect. For example, consider a UrlMap with the following configuration: - UrlMap.defaultCustomErrorResponsePolicy are configured with policies for 5xx and 4xx errors - A PathRule for /coming_soon/ is configured for the error code 404. If the request is for www.myotherdomain.com and a404 is encountered, the policy underUrlMap.defaultCustomErrorResponsePolicy takes effect. If a404 response is encountered for the requestwww.example.com/current_events/, the pathMatcher's policy takes effect. If however, the request forwww.example.com/coming_soon/ encounters a 404, the policy in PathRule.customErrorResponsePolicy takes effect. If any of the requests in this example encounter a 500 error code, the policy atUrlMap.defaultCustomErrorResponsePolicy takes effect. customErrorResponsePolicy is supported only for global external Application Load Balancers. |
| `paths` | array<string> | The list of path patterns to match. Each must start with / and the only place a \* is allowed is at the end following a /. The string fed to the path matcher does not include any text after the first ? or #, and those chars are not allowed here. |
| `routeAction` | HttpRouteAction | In response to a matching path, the load balancer performs advanced routing actions, such as URL rewrites and header transformations, before forwarding the request to the selected backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. URL maps for classic Application Load Balancers only support the urlRewrite action within a path rule'srouteAction. |
| `service` | string | The full or partial URL of the backend service resource to which traffic is directed if this rule is matched. If routeAction is also specified, advanced routing actions, such as URL rewrites, take effect before sending the request to the backend. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. |
| `urlRedirect` | HttpRedirectAction | When a path pattern is matched, the request is redirected to a URL specified by urlRedirect. Only one of urlRedirect, service orrouteAction.weightedBackendService can be set. Not supported when the URL map is bound to a target gRPC proxy. |

### `PeerAuthenticationMethod`

- \[Deprecated\] Configuration for the peer authentication method. Configuration for the peer authentication method.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `mtls` | MutualTls | Set if mTLS is used for peer authentication. |

### `PerInstanceConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fingerprint` | string (byte) | Fingerprint of this per-instance config. This field can be used in optimistic locking. It is ignored when inserting a per-instance config. An up-to-date fingerprint must be provided in order to update an existing per-instance configuration or the field needs to be unset. |
| `name` | string | The name of a per-instance configuration and its corresponding instance. Serves as a merge key during UpdatePerInstanceConfigs operations, that is, if a per-instance configuration with the same name exists then it will be updated, otherwise a new one will be created for the VM instance with the same name. An attempt to create a per-instance configuration for a VM instance that either doesn't exist or is not part of the group will result in an error. |
| `preservedState` | PreservedState | The intended preserved state for the given instance. Does not contain preserved state generated from a stateful policy. |
| `status` | string enum | The status of applying this per-instance configuration on the corresponding managed instance. Values: `APPLYING`, `DELETING`, `EFFECTIVE`, `NONE`, `UNAPPLIED`, `UNAPPLIED_DELETION`. |

### `PeriodicPartialMaintenanceSchedule`

- The periodic partial maintenance schedule includes 52 weeks worth of maintenance windows. LINT.IfChange(PeriodicPartialMaintenanceSchedule)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subType` | string enum | The maintenance type in which the zone is during the given window. Values: `MAINTENANCE_SUBTYPE_UNSPECIFIED`, `MAINTENANCE_TYPE_CUSTOMER_MAINTENANCE`, `MAINTENANCE_TYPE_DISRUPTIVE_UPGRADE`, `MAINTENANCE_TYPE_STABLE`, `MAINTENANCE_TYPE_TRANSITION`. |
| `targetResource` | string | The target resource that the maintenance window is for. For example, "projects/my-project/zones/us-central1-a". |
| `type` | string enum | — Values: `MAINTENANCE_TYPE_UNSPECIFIED`, `PRIVATE_ZONE_MAINTENANCE`. |
| `windowEndTime` | DateTime | The end civil timestamp of the window (not inclusive). This contains a time zone. |
| `windowStartTime` | DateTime | The start civil timestamp of the window. This contains a time zone. |

### `Permission`

- \[Deprecated\] All fields defined in a permission are ANDed.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `constraints` | array<PermissionConstraint> | Extra custom constraints. The constraints are ANDed together. |
| `hosts` | array<string> | Used in Ingress or Egress Gateway cases to specify hosts that the policy applies to. Exact match, prefix match, and suffix match are supported. |
| `methods` | array<string> | HTTP method. |
| `notHosts` | array<string> | Negate of hosts. Specifies exclusions. |
| `notMethods` | array<string> | Negate of methods. Specifies exclusions. |
| `notPaths` | array<string> | Negate of paths. Specifies exclusions. |
| `notPorts` | array<string> | Negate of ports. Specifies exclusions. |
| `paths` | array<string> | HTTP request paths or gRPC methods. Exact match, prefix match, and suffix match are supported. |
| `ports` | array<string> | Port names or numbers. |

### `PermissionConstraint`

- Custom constraint that specifies a key and a list of allowed values for Istio attributes.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the constraint. |
| `values` | array<string> | A list of allowed values. |

### `PersistentDiskResourceCommitment`

- Commitment for a particular persistent disk resource.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `amount` | string (int64) | Required. The amount of the resource to commit to, in GiB. |
| `dimensionType` | string enum | The specific dimension of the product for this amount. Values: `CAPACITY_OPTIMIZED`, `DIMENSION_TYPE_UNSPECIFIED`, `READ_OPTIMIZED`, `WRITE_OPTIMIZED`. |
| `productType` | string enum | The PD product being committed to. All entries in a Commitment.persistent_disk_resources list must have the same product_type. Values: `HYPERDISK_EXAPOOL_BALANCED`, `HYPERDISK_EXAPOOL_THROUGHPUT`, `PRODUCT_TYPE_UNSPECIFIED`. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PreconfiguredWafSet`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expressionSets` | array<WafExpressionSet> | List of entities that are currently supported for WAF rules. |

### `PreservedState`

- Preserved state for a given instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disks` | object | Preserved disks defined for this instance. This map is keyed with the device names of the disks. |
| `externalIPs` | object | Preserved external IPs defined for this instance. This map is keyed with the name of the network interface. |
| `internalIPs` | object | Preserved internal IPs defined for this instance. This map is keyed with the name of the network interface. |
| `metadata` | object | Preserved metadata defined for this instance. |

### `PreservedStatePreservedDisk`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDelete` | string enum | These stateful disks will never be deleted during autohealing, update, instance recreate operations. This flag is used to configure if the disk should be deleted after it is no longer used by the group, e.g. when the given instance or the whole MIG is deleted. Note: disks attached in READ_ONLY mode cannot be auto-deleted. Values: `NEVER`, `ON_PERMANENT_INSTANCE_DELETION`. |
| `mode` | string enum | The mode in which to attach this disk, either READ_WRITE orREAD_ONLY. If not specified, the default is to attach the disk in READ_WRITE mode. Values: `READ_ONLY`, `READ_WRITE`. |
| `source` | string | The URL of the disk resource that is stateful and should be attached to the VM instance. |

### `PreservedStatePreservedNetworkIp`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDelete` | string enum | These stateful IPs will never be released during autohealing, update or VM instance recreate operations. This flag is used to configure if the IP reservation should be deleted after it is no longer used by the group, e.g. when the given instance or the whole group is deleted. Values: `NEVER`, `ON_PERMANENT_INSTANCE_DELETION`. |
| `ipAddress` | PreservedStatePreservedNetworkIpIpAddress | Ip address representation |

### `PreservedStatePreservedNetworkIpIpAddress`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | The URL of the reservation for this IP address. |
| `literal` | string | An IPv4 internal network address to assign to the instance for this network interface. |

### `PreviewFeature`

- Represents a single Google Compute Engine preview feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activationStatus` | string enum | Specifies whether the feature is enabled or disabled. Values: `ACTIVATION_STATE_UNSPECIFIED`, `DISABLED`, `ENABLED`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Output only. \[Output Only\] Description of the feature. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] The type of the feature. Always "compute#previewFeature" for preview features. |
| `name` | string | Name of the feature. |
| `rolloutOperation` | PreviewFeatureRolloutOperation | Rollout operation of the feature. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `status` | PreviewFeatureStatus | Output only. \[Output only\] Status of the feature. |

### `PreviewFeatureList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<PreviewFeature> | A list of PreviewFeature resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `PreviewFeatureRolloutOperation`

- Represents the rollout operation
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rolloutInput` | PreviewFeatureRolloutOperationRolloutInput | Input only. The input for the rollout operation. |

### `PreviewFeatureRolloutOperationRolloutInput`

- Represents the input for the rollout operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the rollout plan Ex. organizations//locations/global/rolloutPlans/ Ex. folders//locations/global/rolloutPlans/ Ex. projects//locations/global/rolloutPlans/. |
| `predefinedRolloutPlan` | string enum | Predefined rollout plan. Values: `ROLLOUT_PLAN_FAST_ROLLOUT`, `ROLLOUT_PLAN_TWO_DAY_ROLLOUT`, `ROLLOUT_PLAN_UNSPECIFIED`. |

### `PreviewFeatureStatus`

- \[Output Only\] The status of the feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. \[Output Only\] The description of the feature. |
| `helpLink` | string | Output only. \[Output Only\] Link to the public documentation for the feature. |
| `releaseStatus` | PreviewFeatureStatusReleaseStatus | — |

### `PreviewFeatureStatusReleaseStatus`

- \[Output Only\] The release status of the feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stage` | string enum | Output only. \[Output Only\] The stage of the feature. Values: `DEPRECATED`, `GA`, `PREVIEW`, `STAGE_UNSPECIFIED`. |
| `updateDate` | Date | Output only. The last date when a feature transitioned between ReleaseStatuses. |

### `Principal`

- \[Deprecated\] All fields defined in a principal are ANDed.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `condition` | string | An expression to specify custom condition. |
| `groups` | array<string> | The groups the principal belongs to. Exact match, prefix match, and suffix match are supported. |
| `ips` | array<string> | IPv4 or IPv6 address or range (In CIDR format) |
| `namespaces` | array<string> | The namespaces. Exact match, prefix match, and suffix match are supported. |
| `notGroups` | array<string> | Negate of groups. Specifies exclusions. |
| `notIps` | array<string> | Negate of IPs. Specifies exclusions. |
| `notNamespaces` | array<string> | Negate of namespaces. Specifies exclusions. |
| `notUsers` | array<string> | Negate of users. Specifies exclusions. |
| `properties` | object | A map of Istio attribute to expected values. Exact match, prefix match, and suffix match are supported for values. For example, `request.headers[version]: "v1"`. The properties are ANDed together. |
| `users` | array<string> | The user names/IDs or service accounts. Exact match, prefix match, and suffix match are supported. |

### `Project`

- Represents a Project resource. A project is used to organize resources in a Google Cloud Platform environment. For more information, read about the Resource Hierarchy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudArmorTier` | string enum | Output only. \[Output Only\] The Cloud Armor tier for this project. It can be one of the following values: CA_STANDARD,CA_ENTERPRISE_PAYGO. If this field is not specified, it is assumed to beCA_STANDARD. Values: `CA_ENTERPRISE_ANNUAL`, `CA_ENTERPRISE_PAYGO`, `CA_STANDARD`. |
| `commonInstanceMetadata` | Metadata | Metadata key/value pairs available to all instances contained in this project. See Custom metadata for more information. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultNetworkTier` | string enum | This signifies the default network tier used for configuring resources of the project and can only take the following values:PREMIUM, STANDARD. Initially the default network tier is PREMIUM. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `defaultServiceAccount` | string | \[Output Only\] Default service account used by VMs running in this project. |
| `description` | string | An optional textual description of the resource. |
| `enabledFeatures` | array<string> | An optional list of restricted features enabled for use on this project. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. This is \*not\* the project ID, and is just a unique ID used by Compute Engine to identify resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#project for projects. |
| `name` | string | The project ID. For example: my-example-project. Use the project ID to make requests to Compute Engine. |
| `quotas` | array<Quota> | \[Output Only\] Quotas assigned to this project. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `usageExportLocation` | UsageExportLocation | An optional naming prefix for daily usage reports and the Google Cloud Storage bucket where they are stored. |
| `vmDnsSetting` | string enum | Output only. \[Output Only\] Default internal DNS setting used by VMs running in this project. Values: `GLOBAL_DEFAULT`, `UNSPECIFIED_VM_DNS_SETTING`, `ZONAL_DEFAULT`, `ZONAL_ONLY`. |
| `xpnProjectStatus` | string enum | \[Output Only\] The role this project has in a shared VPC configuration. Currently, only projects with the host role, which is specified by the value HOST, are differentiated. Values: `HOST`, `UNSPECIFIED_XPN_PROJECT_STATUS`. |

### `Project` (beta)

- Represents a Project resource. A project is used to organize resources in a Google Cloud Platform environment. For more information, read about the Resource Hierarchy.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `cloudArmorTier` | string enum | Output only. \[Output Only\] The Cloud Armor tier for this project. It can be one of the following values: CA_STANDARD,CA_ENTERPRISE_PAYGO. If this field is not specified, it is assumed to beCA_STANDARD. Values: `CA_ENTERPRISE_ANNUAL`, `CA_ENTERPRISE_PAYGO`, `CA_STANDARD`. |
| `commonInstanceMetadata` | Metadata | Metadata key/value pairs available to all instances contained in this project. See Custom metadata for more information. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultNetworkTier` | string enum | This signifies the default network tier used for configuring resources of the project and can only take the following values:PREMIUM, STANDARD. Initially the default network tier is PREMIUM. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `defaultServiceAccount` | string | \[Output Only\] Default service account used by VMs running in this project. |
| `description` | string | An optional textual description of the resource. |
| `enabledFeatures` | array<string> | An optional list of restricted features enabled for use on this project. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. This is \*not\* the project ID, and is just a unique ID used by Compute Engine to identify resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#project for projects. |
| `managedProtectionTier` | string enum | Output only. \[Output Only\] The Cloud Armor Managed Protection (CAMP) tier for this project. It can be one of the following values:CA_STANDARD, CAMP_PLUS_PAYGO. If this field is not specified, it is assumed to beCA_STANDARD. Values: `CAMP_PLUS_ANNUAL`, `CAMP_PLUS_PAYGO`, `CA_STANDARD`. |
| `name` | string | The project ID. For example: my-example-project. Use the project ID to make requests to Compute Engine. |
| `quotas` | array<Quota> | \[Output Only\] Quotas assigned to this project. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `usageExportLocation` | UsageExportLocation | An optional naming prefix for daily usage reports and the Google Cloud Storage bucket where they are stored. |
| `vmDnsSetting` | string enum | Output only. \[Output Only\] Default internal DNS setting used by VMs running in this project. Values: `GLOBAL_DEFAULT`, `UNSPECIFIED_VM_DNS_SETTING`, `ZONAL_DEFAULT`, `ZONAL_ONLY`. |
| `xpnProjectStatus` | string enum | \[Output Only\] The role this project has in a shared VPC configuration. Currently, only projects with the host role, which is specified by the value HOST, are differentiated. Values: `HOST`, `UNSPECIFIED_XPN_PROJECT_STATUS`. |

### `Project` (preview)

- Represents a Project resource. A project is used to organize resources in a Google Cloud Platform environment. For more information, read about the Resource Hierarchy.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `cloudArmorTier` | string enum | Output only. \[Output Only\] The Cloud Armor tier for this project. It can be one of the following values: CA_STANDARD,CA_ENTERPRISE_PAYGO. If this field is not specified, it is assumed to beCA_STANDARD. Values: `CA_ENTERPRISE_ANNUAL`, `CA_ENTERPRISE_PAYGO`, `CA_STANDARD`. |
| `commonInstanceMetadata` | Metadata | Metadata key/value pairs available to all instances contained in this project. See Custom metadata for more information. |
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `defaultNetworkTier` | string enum | This signifies the default network tier used for configuring resources of the project and can only take the following values:PREMIUM, STANDARD. Initially the default network tier is PREMIUM. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `defaultServiceAccount` | string | \[Output Only\] Default service account used by VMs running in this project. |
| `description` | string | An optional textual description of the resource. |
| `enabledFeatures` | array<string> | An optional list of restricted features enabled for use on this project. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. This is \*not\* the project ID, and is just a unique ID used by Compute Engine to identify resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#project for projects. |
| `name` | string | The project ID. For example: my-example-project. Use the project ID to make requests to Compute Engine. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `usageExportLocation` | UsageExportLocation | An optional naming prefix for daily usage reports and the Google Cloud Storage bucket where they are stored. |
| `vmDnsSetting` | string enum | Output only. \[Output Only\] Default internal DNS setting used by VMs running in this project. Values: `GLOBAL_DEFAULT`, `UNSPECIFIED_VM_DNS_SETTING`, `ZONAL_DEFAULT`, `ZONAL_ONLY`. |
| `xpnProjectStatus` | string enum | \[Output Only\] The role this project has in a shared VPC configuration. Currently, only projects with the host role, which is specified by the value HOST, are differentiated. Values: `HOST`, `UNSPECIFIED_XPN_PROJECT_STATUS`. |

### `ProjectView`

- Represents a ProjectView resource. A ProjectView resource contains read-only project data which is available globally.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `project` | Project | The project data. The returned Project data does not contain regional or zonal quota usage data. Global quota limits are present. For accurate, real-time quota usage numbers, query the global projects.get (https://cloud.google.com/compute/docs/reference/rest/v1/projects/get) endpoint. |

### `ProjectsDisableXpnResourceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `xpnResource` | XpnResourceId | Service resource (a.k.a service project) ID. |

### `ProjectsEnableXpnResourceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `xpnResource` | XpnResourceId | Service resource (a.k.a service project) ID. |

### `ProjectsGetXpnResources`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#projectsGetXpnResources for lists of service resources (a.k.a service projects) |
| `nextPageToken` | string | Output only. \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `resources` | array<XpnResourceId> | Service resources (a.k.a service projects) attached to this project as their shared VPC host. |

### `ProjectsListXpnHostsRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `organization` | string | Optional organization ID managed by Cloud Resource Manager, for which to list shared VPC host projects. If not specified, the organization will be inferred from the project. |

### `ProjectsListXpnHostsRequest` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `organization` | string | Optional organization ID managed by Cloud Resource Manager, for which to list shared VPC host projects. If not specified, the organization will be inferred from the project. |
| `returnPartialPage` | boolean | Opt-in for partial page behavior which provides a partial filled page (number of items on which may be smaller than maxResults) within the API deadline. If opt-in, then the user should rely on if nextPageToken is empty in the response to determine if there is a next page. Empty page is also valid and possible. The default value is false. |

### `ProjectsSetCloudArmorTierRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudArmorTier` | string enum | Managed protection tier to be set. Values: `CA_ENTERPRISE_ANNUAL`, `CA_ENTERPRISE_PAYGO`, `CA_STANDARD`. |

### `ProjectsSetDefaultNetworkTierRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkTier` | string enum | Default network tier to be set. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |

### `ProjectsSetDefaultServiceAccountRequest`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `email` | string | Email address of the service account. |

### `ProjectsSetManagedProtectionTierRequest`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `managedProtectionTier` | string enum | Managed protection tier to be set. Values: `CAMP_PLUS_ANNUAL`, `CAMP_PLUS_PAYGO`, `CA_STANDARD`. |

### `PublicAdvertisedPrefix`

- A public advertised prefix represents an aggregated IP prefix or netblock which customers bring to cloud. The IP prefix is a single unit of route advertisement and is announced globally to the internet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `byoipApiVersion` | string enum | Output only. \[Output Only\] The version of BYOIP API. Values: `V1`, `V2`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `dnsVerificationIp` | string | The address to be used for reverse DNS verification. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicAdvertisedPrefix. An up-to-date fingerprint must be provided in order to update thePublicAdvertisedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicAdvertisedPrefix. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `ipCidrRange` | string | The address range, in CIDR format, represented by this public advertised prefix. |
| `ipv6AccessType` | string enum | The internet access type for IPv6 Public Advertised Prefixes. Values: `EXTERNAL`, `INTERNAL`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicAdvertisedPrefix for public advertised prefixes. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `pdpScope` | string enum | Specifies how child public delegated prefix will be scoped. It could be one of following values: - `REGIONAL`: The public delegated prefix is regional only. The provisioning will take a few minutes. - `GLOBAL`: The public delegated prefix is global only. The provisioning will take ~4 weeks. - `GLOBAL_AND_REGIONAL` \[output only\]: The public delegated prefixes is BYOIP V1 legacy prefix. This is output only value and no longer supported in BYOIP V2. Values: `GLOBAL`, `GLOBAL_AND_REGIONAL`, `REGIONAL`. |
| `publicDelegatedPrefixs` | array<PublicAdvertisedPrefixPublicDelegatedPrefix> | Output only. \[Output Only\] The list of public delegated prefixes that exist for this public advertised prefix. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `sharedSecret` | string | \[Output Only\] The shared secret to be used for reverse DNS verification. |
| `status` | string enum | The status of the public advertised prefix. Possible values include: - `INITIAL`: RPKI validation is complete. - `PTR_CONFIGURED`: User has configured the PTR. - `VALIDATED`: Reverse DNS lookup is successful. - `REVERSE_DNS_LOOKUP_FAILED`: Reverse DNS lookup failed. - `PREFIX_CONFIGURATION_IN_PROGRESS`: The prefix is being configured. - `PREFIX_CONFIGURATION_COMPLETE`: The prefix is fully configured. - `PREFIX_REMOVAL_IN_PROGRESS`: The prefix is being removed. Values: `ANNOUNCED_TO_INTERNET`, `INITIAL`, `PREFIX_CONFIGURATION_COMPLETE`, `PREFIX_CONFIGURATION_IN_PROGRESS`, `PREFIX_REMOVAL_IN_PROGRESS`, `PTR_CONFIGURED`, `READY_TO_ANNOUNCE`, `REVERSE_DNS_LOOKUP_FAILED`, `VALIDATED`. |

### `PublicAdvertisedPrefix` (alpha)

- A public advertised prefix represents an aggregated IP prefix or netblock which customers bring to cloud. The IP prefix is a single unit of route advertisement and is announced globally to the internet.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `byoipApiVersion` | string enum | Output only. \[Output Only\] The version of BYOIP API. Values: `V1`, `V2`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `dnsVerificationIp` | string | The address to be used for reverse DNS verification. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicAdvertisedPrefix. An up-to-date fingerprint must be provided in order to update thePublicAdvertisedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicAdvertisedPrefix. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `ipCidrRange` | string | The address range, in CIDR format, represented by this public advertised prefix. |
| `ipv6AccessType` | string enum | The internet access type for IPv6 Public Advertised Prefixes. Values: `EXTERNAL`, `INTERNAL`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicAdvertisedPrefix for public advertised prefixes. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkTier` | string enum | Network tier to be used for this prefix. All child delegated prefixes will inherit this field. If this field is not specified, it defaults to the network tier of the project that the PublicAdvertisedPrefix belongs to. Values: `FIXED_STANDARD`, `PREMIUM`, `SELECT`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `pdpScope` | string enum | Specifies how child public delegated prefix will be scoped. It could be one of following values: - `REGIONAL`: The public delegated prefix is regional only. The provisioning will take a few minutes. - `GLOBAL`: The public delegated prefix is global only. The provisioning will take ~4 weeks. - `GLOBAL_AND_REGIONAL` \[output only\]: The public delegated prefixes is BYOIP V1 legacy prefix. This is output only value and no longer supported in BYOIP V2. Values: `GLOBAL`, `GLOBAL_AND_REGIONAL`, `REGIONAL`. |
| `publicDelegatedPrefixs` | array<PublicAdvertisedPrefixPublicDelegatedPrefix> | Output only. \[Output Only\] The list of public delegated prefixes that exist for this public advertised prefix. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL with id for the resource. |
| `sharedSecret` | string | \[Output Only\] The shared secret to be used for reverse DNS verification. |
| `status` | string enum | The status of the public advertised prefix. Possible values include: - `INITIAL`: RPKI validation is complete. - `PTR_CONFIGURED`: User has configured the PTR. - `VALIDATED`: Reverse DNS lookup is successful. - `REVERSE_DNS_LOOKUP_FAILED`: Reverse DNS lookup failed. - `PREFIX_CONFIGURATION_IN_PROGRESS`: The prefix is being configured. - `PREFIX_CONFIGURATION_COMPLETE`: The prefix is fully configured. - `PREFIX_REMOVAL_IN_PROGRESS`: The prefix is being removed. Values: `ANNOUNCED_TO_INTERNET`, `INITIAL`, `PREFIX_CONFIGURATION_COMPLETE`, `PREFIX_CONFIGURATION_IN_PROGRESS`, `PREFIX_REMOVAL_IN_PROGRESS`, `PTR_CONFIGURED`, `READY_TO_ANNOUNCE`, `REVERSE_DNS_LOOKUP_FAILED`, `VALIDATED`. |

### `PublicAdvertisedPrefix` (beta)

- A public advertised prefix represents an aggregated IP prefix or netblock which customers bring to cloud. The IP prefix is a single unit of route advertisement and is announced globally to the internet.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `byoipApiVersion` | string enum | Output only. \[Output Only\] The version of BYOIP API. Values: `V1`, `V2`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `dnsVerificationIp` | string | The address to be used for reverse DNS verification. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicAdvertisedPrefix. An up-to-date fingerprint must be provided in order to update thePublicAdvertisedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicAdvertisedPrefix. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `ipCidrRange` | string | The address range, in CIDR format, represented by this public advertised prefix. |
| `ipv6AccessType` | string enum | The internet access type for IPv6 Public Advertised Prefixes. Values: `EXTERNAL`, `INTERNAL`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicAdvertisedPrefix for public advertised prefixes. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkTier` | string enum | Network tier to be used for this prefix. All child delegated prefixes will inherit this field. If this field is not specified, it defaults to the network tier of the project that the PublicAdvertisedPrefix belongs to. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `pdpScope` | string enum | Specifies how child public delegated prefix will be scoped. It could be one of following values: - `REGIONAL`: The public delegated prefix is regional only. The provisioning will take a few minutes. - `GLOBAL`: The public delegated prefix is global only. The provisioning will take ~4 weeks. - `GLOBAL_AND_REGIONAL` \[output only\]: The public delegated prefixes is BYOIP V1 legacy prefix. This is output only value and no longer supported in BYOIP V2. Values: `GLOBAL`, `GLOBAL_AND_REGIONAL`, `REGIONAL`. |
| `publicDelegatedPrefixs` | array<PublicAdvertisedPrefixPublicDelegatedPrefix> | Output only. \[Output Only\] The list of public delegated prefixes that exist for this public advertised prefix. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `sharedSecret` | string | \[Output Only\] The shared secret to be used for reverse DNS verification. |
| `status` | string enum | The status of the public advertised prefix. Possible values include: - `INITIAL`: RPKI validation is complete. - `PTR_CONFIGURED`: User has configured the PTR. - `VALIDATED`: Reverse DNS lookup is successful. - `REVERSE_DNS_LOOKUP_FAILED`: Reverse DNS lookup failed. - `PREFIX_CONFIGURATION_IN_PROGRESS`: The prefix is being configured. - `PREFIX_CONFIGURATION_COMPLETE`: The prefix is fully configured. - `PREFIX_REMOVAL_IN_PROGRESS`: The prefix is being removed. Values: `ANNOUNCED_TO_INTERNET`, `INITIAL`, `PREFIX_CONFIGURATION_COMPLETE`, `PREFIX_CONFIGURATION_IN_PROGRESS`, `PREFIX_REMOVAL_IN_PROGRESS`, `PTR_CONFIGURED`, `READY_TO_ANNOUNCE`, `REVERSE_DNS_LOOKUP_FAILED`, `VALIDATED`. |

### `PublicAdvertisedPrefixList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<PublicAdvertisedPrefix> | A list of PublicAdvertisedPrefix resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicAdvertisedPrefix for public advertised prefixes. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `PublicAdvertisedPrefixPublicDelegatedPrefix`

- Represents a CIDR range which can be used to assign addresses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipRange` | string | The IP address range of the public delegated prefix |
| `name` | string | The name of the public delegated prefix |
| `project` | string | The project number of the public delegated prefix |
| `region` | string | The region of the public delegated prefix if it is regional. If absent, the prefix is global. |
| `status` | string | The status of the public delegated prefix. Possible values are: INITIALIZING: The public delegated prefix is being initialized and addresses cannot be created yet. ANNOUNCED: The public delegated prefix is active. |

### `PublicDelegatedPrefix`

- A PublicDelegatedPrefix resource represents an IP block within a PublicAdvertisedPrefix that is configured within a single cloud scope (global or region). IPs in the block can be allocated to resources within that scope. Public delegated prefixes may be further broken up into smaller IP blocks in the same scope as the parent block.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatablePrefixLength` | integer (int32) | The allocatable prefix length supported by this public delegated prefix. This field is optional and cannot be set for prefixes in DELEGATION mode. It cannot be set for IPv4 prefixes either, and it always defaults to 32. |
| `byoipApiVersion` | string enum | Output only. \[Output Only\] The version of BYOIP API. Values: `V1`, `V2`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enableEnhancedIpv4Allocation` | boolean | Output only. \[Output Only\] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicDelegatedPrefix. An up-to-date fingerprint must be provided in order to update thePublicDelegatedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicDelegatedPrefix. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `ipCidrRange` | string | The IP address range, in CIDR format, represented by this public delegated prefix. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] The internet access type for IPv6 Public Delegated Prefixes. Inherited from parent prefix. Values: `EXTERNAL`, `INTERNAL`. |
| `isLiveMigration` | boolean | If true, the prefix will be live migrated. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicDelegatedPrefix for public delegated prefixes. |
| `mode` | string enum | The public delegated prefix mode for IPv6 only. Values: `DELEGATION`, `EXTERNAL_IPV6_FORWARDING_RULE_CREATION`, `EXTERNAL_IPV6_SUBNETWORK_CREATION`, `INTERNAL_IPV6_SUBNETWORK_CREATION`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `parentPrefix` | string | The URL of parent prefix. Either PublicAdvertisedPrefix or PublicDelegatedPrefix. |
| `publicDelegatedSubPrefixs` | array<PublicDelegatedPrefixPublicDelegatedSubPrefix> | The list of sub public delegated prefixes that exist for this public delegated prefix. |
| `purpose` | string enum | Immutable. The purpose of the public delegated prefix. This field can only be set for the top-level global public delegated prefix. It is an output-only field for the sub-delegates that inherit the value from the top-level global public delegated prefix. Once the value is set, it cannot be changed. The field cannot be set for regional public delegated prefixes. The supported values are: - APPLICATION_AND_PROXY_LOAD_BALANCERS: The global public delegated prefix can only be used by Global External Application and Proxy Load Balancers to allocate addresses for forwarding rules. This is the default value. - PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0: The global public delegated prefix can only be used by Global External Passthrough Network Load Balancers to allocate Availability Group 0 addresses for forwarding rules. - PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1: The global public delegated prefix can only be used by Global External Passthrough Network Load Balancers to allocate Availability Group 1 addresses for forwarding rules. Values: `APPLICATION_AND_PROXY_LOAD_BALANCERS`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the public delegated prefix resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] The status of the public delegated prefix, which can be one of following values: - `INITIALIZING` The public delegated prefix is being initialized and addresses cannot be created yet. - `READY_TO_ANNOUNCE` The public delegated prefix is a live migration prefix and is active. - `ANNOUNCED` The public delegated prefix is announced and ready to use. - `DELETING` The public delegated prefix is being deprovsioned. - `ACTIVE` The public delegated prefix is ready to use. Values: `ACTIVE`, `ANNOUNCED`, `ANNOUNCED_TO_GOOGLE`, `ANNOUNCED_TO_INTERNET`, `DELETING`, `INITIALIZING`, `READY_TO_ANNOUNCE`. |

### `PublicDelegatedPrefix` (alpha)

- A PublicDelegatedPrefix resource represents an IP block within a PublicAdvertisedPrefix that is configured within a single cloud scope (global or region). IPs in the block can be allocated to resources within that scope. Public delegated prefixes may be further broken up into smaller IP blocks in the same scope as the parent block.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allocatablePrefixLength` | integer (int32) | The allocatable prefix length supported by this public delegated prefix. This field is optional and cannot be set for prefixes in DELEGATION mode. It cannot be set for IPv4 prefixes either, and it always defaults to 32. |
| `byoipApiVersion` | string enum | Output only. \[Output Only\] The version of BYOIP API. Values: `V1`, `V2`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enableEnhancedIpv4Allocation` | boolean | Output only. \[Output Only\] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicDelegatedPrefix. An up-to-date fingerprint must be provided in order to update thePublicDelegatedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicDelegatedPrefix. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `ipCidrRange` | string | The IP address range, in CIDR format, represented by this public delegated prefix. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] The internet access type for IPv6 Public Delegated Prefixes. Inherited from parent prefix. Values: `EXTERNAL`, `INTERNAL`. |
| `isLiveMigration` | boolean | If true, the prefix will be live migrated. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicDelegatedPrefix for public delegated prefixes. |
| `mode` | string enum | The public delegated prefix mode for IPv6 only. Values: `DELEGATION`, `EXTERNAL_IPV6_FORWARDING_RULE_CREATION`, `EXTERNAL_IPV6_SUBNETWORK_CREATION`, `INTERNAL_IPV6_SUBNETWORK_CREATION`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkTier` | string enum | Network tier of the public delegated prefix. If populated, it must match the network tier of the parent public advertised prefix. If not populated, it defaults to the network tier of the parent public advertised prefix. Values: `FIXED_STANDARD`, `PREMIUM`, `SELECT`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `parentPrefix` | string | The URL of parent prefix. Either PublicAdvertisedPrefix or PublicDelegatedPrefix. |
| `publicDelegatedSubPrefixs` | array<PublicDelegatedPrefixPublicDelegatedSubPrefix> | The list of sub public delegated prefixes that exist for this public delegated prefix. |
| `purpose` | string enum | Immutable. The purpose of the public delegated prefix. This field can only be set for the top-level global public delegated prefix. It is an output-only field for the sub-delegates that inherit the value from the top-level global public delegated prefix. Once the value is set, it cannot be changed. The field cannot be set for regional public delegated prefixes. The supported values are: - APPLICATION_AND_PROXY_LOAD_BALANCERS: The global public delegated prefix can only be used by Global External Application and Proxy Load Balancers to allocate addresses for forwarding rules. This is the default value. - PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0: The global public delegated prefix can only be used by Global External Passthrough Network Load Balancers to allocate Availability Group 0 addresses for forwarding rules. - PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1: The global public delegated prefix can only be used by Global External Passthrough Network Load Balancers to allocate Availability Group 1 addresses for forwarding rules. Values: `APPLICATION_AND_PROXY_LOAD_BALANCERS`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the public delegated prefix resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL with id for the resource. |
| `status` | string enum | \[Output Only\] The status of the public delegated prefix, which can be one of following values: - `INITIALIZING` The public delegated prefix is being initialized and addresses cannot be created yet. - `READY_TO_ANNOUNCE` The public delegated prefix is a live migration prefix and is active. - `ANNOUNCED` The public delegated prefix is announced and ready to use. - `DELETING` The public delegated prefix is being deprovsioned. - `ACTIVE` The public delegated prefix is ready to use. Values: `ACTIVE`, `ANNOUNCED`, `ANNOUNCED_TO_GOOGLE`, `ANNOUNCED_TO_INTERNET`, `DELETING`, `INITIALIZING`, `READY_TO_ANNOUNCE`. |

### `PublicDelegatedPrefix` (beta)

- A PublicDelegatedPrefix resource represents an IP block within a PublicAdvertisedPrefix that is configured within a single cloud scope (global or region). IPs in the block can be allocated to resources within that scope. Public delegated prefixes may be further broken up into smaller IP blocks in the same scope as the parent block.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `allocatablePrefixLength` | integer (int32) | The allocatable prefix length supported by this public delegated prefix. This field is optional and cannot be set for prefixes in DELEGATION mode. It cannot be set for IPv4 prefixes either, and it always defaults to 32. |
| `byoipApiVersion` | string enum | Output only. \[Output Only\] The version of BYOIP API. Values: `V1`, `V2`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enableEnhancedIpv4Allocation` | boolean | Output only. \[Output Only\] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicDelegatedPrefix. An up-to-date fingerprint must be provided in order to update thePublicDelegatedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicDelegatedPrefix. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `ipCidrRange` | string | The IP address range, in CIDR format, represented by this public delegated prefix. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] The internet access type for IPv6 Public Delegated Prefixes. Inherited from parent prefix. Values: `EXTERNAL`, `INTERNAL`. |
| `isLiveMigration` | boolean | If true, the prefix will be live migrated. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicDelegatedPrefix for public delegated prefixes. |
| `mode` | string enum | The public delegated prefix mode for IPv6 only. Values: `DELEGATION`, `EXTERNAL_IPV6_FORWARDING_RULE_CREATION`, `EXTERNAL_IPV6_SUBNETWORK_CREATION`, `INTERNAL_IPV6_SUBNETWORK_CREATION`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `networkTier` | string enum | Network tier of the public delegated prefix. If populated, it must match the network tier of the parent public advertised prefix. If not populated, it defaults to the network tier of the parent public advertised prefix. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `parentPrefix` | string | The URL of parent prefix. Either PublicAdvertisedPrefix or PublicDelegatedPrefix. |
| `publicDelegatedSubPrefixs` | array<PublicDelegatedPrefixPublicDelegatedSubPrefix> | The list of sub public delegated prefixes that exist for this public delegated prefix. |
| `purpose` | string enum | Immutable. The purpose of the public delegated prefix. This field can only be set for the top-level global public delegated prefix. It is an output-only field for the sub-delegates that inherit the value from the top-level global public delegated prefix. Once the value is set, it cannot be changed. The field cannot be set for regional public delegated prefixes. The supported values are: - APPLICATION_AND_PROXY_LOAD_BALANCERS: The global public delegated prefix can only be used by Global External Application and Proxy Load Balancers to allocate addresses for forwarding rules. This is the default value. - PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0: The global public delegated prefix can only be used by Global External Passthrough Network Load Balancers to allocate Availability Group 0 addresses for forwarding rules. - PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1: The global public delegated prefix can only be used by Global External Passthrough Network Load Balancers to allocate Availability Group 1 addresses for forwarding rules. Values: `APPLICATION_AND_PROXY_LOAD_BALANCERS`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`. |
| `region` | string | Output only. \[Output Only\] URL of the region where the public delegated prefix resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] The status of the public delegated prefix, which can be one of following values: - `INITIALIZING` The public delegated prefix is being initialized and addresses cannot be created yet. - `READY_TO_ANNOUNCE` The public delegated prefix is a live migration prefix and is active. - `ANNOUNCED` The public delegated prefix is announced and ready to use. - `DELETING` The public delegated prefix is being deprovsioned. - `ACTIVE` The public delegated prefix is ready to use. Values: `ACTIVE`, `ANNOUNCED`, `ANNOUNCED_TO_GOOGLE`, `ANNOUNCED_TO_INTERNET`, `DELETING`, `INITIALIZING`, `READY_TO_ANNOUNCE`. |

### `PublicDelegatedPrefix` (preview)

- A PublicDelegatedPrefix resource represents an IP block within a PublicAdvertisedPrefix that is configured within a single cloud scope (global or region). IPs in the block can be allocated to resources within that scope. Public delegated prefixes may be further broken up into smaller IP blocks in the same scope as the parent block.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `allocatablePrefixLength` | integer (int32) | The allocatable prefix length supported by this public delegated prefix. This field is optional and cannot be set for prefixes in DELEGATION mode. It cannot be set for IPv4 prefixes either, and it always defaults to 32. |
| `byoipApiVersion` | string enum | Output only. \[Output Only\] The version of BYOIP API. Values: `V1`, `V2`. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enableEnhancedIpv4Allocation` | boolean | Output only. \[Output Only\] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only. |
| `fingerprint` | string (byte) | Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicDelegatedPrefix. An up-to-date fingerprint must be provided in order to update thePublicDelegatedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicDelegatedPrefix. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource type. The server generates this identifier. |
| `ipCidrRange` | string | The IP address range, in CIDR format, represented by this public delegated prefix. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] The internet access type for IPv6 Public Delegated Prefixes. Inherited from parent prefix. Values: `EXTERNAL`, `INTERNAL`. |
| `isLiveMigration` | boolean | If true, the prefix will be live migrated. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicDelegatedPrefix for public delegated prefixes. |
| `mode` | string enum | The public delegated prefix mode for IPv6 only. Values: `DELEGATION`, `EXTERNAL_IPV6_FORWARDING_RULE_CREATION`, `EXTERNAL_IPV6_SUBNETWORK_CREATION`, `INTERNAL_IPV6_SUBNETWORK_CREATION`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `parentPrefix` | string | The URL of parent prefix. Either PublicAdvertisedPrefix or PublicDelegatedPrefix. |
| `publicDelegatedSubPrefixs` | array<PublicDelegatedPrefixPublicDelegatedSubPrefix> | The list of sub public delegated prefixes that exist for this public delegated prefix. |
| `region` | string | Output only. \[Output Only\] URL of the region where the public delegated prefix resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] The status of the public delegated prefix, which can be one of following values: - `INITIALIZING` The public delegated prefix is being initialized and addresses cannot be created yet. - `READY_TO_ANNOUNCE` The public delegated prefix is a live migration prefix and is active. - `ANNOUNCED` The public delegated prefix is announced and ready to use. - `DELETING` The public delegated prefix is being deprovsioned. - `ACTIVE` The public delegated prefix is ready to use. Values: `ACTIVE`, `ANNOUNCED`, `ANNOUNCED_TO_GOOGLE`, `ANNOUNCED_TO_INTERNET`, `DELETING`, `INITIALIZING`, `READY_TO_ANNOUNCE`. |

### `PublicDelegatedPrefixAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of PublicDelegatedPrefixesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicDelegatedPrefixAggregatedList for aggregated lists of public delegated prefixes. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `PublicDelegatedPrefixList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<PublicDelegatedPrefix> | A list of PublicDelegatedPrefix resources. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#publicDelegatedPrefixList for public delegated prefixes. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `PublicDelegatedPrefixPublicDelegatedSubPrefix`

- Represents a sub PublicDelegatedPrefix.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatablePrefixLength` | integer (int32) | The allocatable prefix length supported by this PublicDelegatedSubPrefix. |
| `delegateeProject` | string | Name of the project scoping this PublicDelegatedSubPrefix. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enableEnhancedIpv4Allocation` | boolean | Output only. \[Output Only\] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only. |
| `ipCidrRange` | string | The IP address range, in CIDR format, represented by this sub public delegated prefix. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] The internet access type for IPv6 Public Delegated Sub Prefixes. Inherited from parent prefix. Values: `EXTERNAL`, `INTERNAL`. |
| `isAddress` | boolean | Whether the sub prefix is delegated to create Address resources in the delegatee project. |
| `mode` | string enum | The PublicDelegatedSubPrefix mode for IPv6 only. Values: `DELEGATION`, `EXTERNAL_IPV6_FORWARDING_RULE_CREATION`, `EXTERNAL_IPV6_SUBNETWORK_CREATION`, `INTERNAL_IPV6_SUBNETWORK_CREATION`. |
| `name` | string | The name of the sub public delegated prefix. |
| `purpose` | string enum | Output only. \[Output Only\] The purpose of the sub public delegated prefix. Inherited from parent prefix. Values: `APPLICATION_AND_PROXY_LOAD_BALANCERS`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP0`, `PASSTHROUGH_LOAD_BALANCER_AVAILABILITY_GROUP1`. |
| `region` | string | Output only. \[Output Only\] The region of the sub public delegated prefix if it is regional. If absent, the sub prefix is global. |
| `status` | string enum | Output only. \[Output Only\] The status of the sub public delegated prefix. Values: `ACTIVE`, `INACTIVE`. |

### `PublicDelegatedPrefixPublicDelegatedSubPrefix` (preview)

- Represents a sub PublicDelegatedPrefix.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `allocatablePrefixLength` | integer (int32) | The allocatable prefix length supported by this PublicDelegatedSubPrefix. |
| `delegateeProject` | string | Name of the project scoping this PublicDelegatedSubPrefix. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `enableEnhancedIpv4Allocation` | boolean | Output only. \[Output Only\] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only. |
| `ipCidrRange` | string | The IP address range, in CIDR format, represented by this sub public delegated prefix. |
| `ipv6AccessType` | string enum | Output only. \[Output Only\] The internet access type for IPv6 Public Delegated Sub Prefixes. Inherited from parent prefix. Values: `EXTERNAL`, `INTERNAL`. |
| `isAddress` | boolean | Whether the sub prefix is delegated to create Address resources in the delegatee project. |
| `mode` | string enum | The PublicDelegatedSubPrefix mode for IPv6 only. Values: `DELEGATION`, `EXTERNAL_IPV6_FORWARDING_RULE_CREATION`, `EXTERNAL_IPV6_SUBNETWORK_CREATION`, `INTERNAL_IPV6_SUBNETWORK_CREATION`. |
| `name` | string | The name of the sub public delegated prefix. |
| `region` | string | Output only. \[Output Only\] The region of the sub public delegated prefix if it is regional. If absent, the sub prefix is global. |
| `status` | string enum | Output only. \[Output Only\] The status of the sub public delegated prefix. Values: `ACTIVE`, `INACTIVE`. |

### `PublicDelegatedPrefixesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publicDelegatedPrefixes` | array<PublicDelegatedPrefix> | \[Output Only\] A list of PublicDelegatedPrefixes contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of public delegated prefixes when the list is empty. |

### `QueryFormabilityRequest`

- Query formability of a given set of reservation subblocks.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `subblocks` | array<string> | Explicit list of fully qualified reservation subblock resource URLs. Both full and relative URIs are supported. |

### `QueryFormabilityResponse`

- Response message for AcceleratorInterconnects.QueryFormability.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `items` | array<PartitionFormability> | Flattened collection of hierarchical partitions and their formability across all requested subblocks. |
| `nextPageToken` | string | This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |

### `QueuedResource`

- QueuedResource represents a request for future capacity. The capacity is delivered in the form of other GCE resources, either Instances or Reservations.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `bulkInsertInstanceResource` | BulkInsertInstanceResource | Specification of VM instances to create. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp in RFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#queuedResource for QueuedResources. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `queuingPolicy` | QueuingPolicy | Queuing parameters for the requested capacity. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `state` | string enum | Output only. \[Output only\] High-level status of the request. Values: `ACCEPTED`, `CANCELLED`, `CREATING`, `DELETING`, `FAILED`, `PROVISIONING`, `STATE_UNSPECIFIED`, `SUCCEEDED`. |
| `status` | QueuedResourceStatus | Output only. \[Output only\] Result of queuing and provisioning based on deferred capacity. |
| `zone` | string | Output only. \[Output Only\] URL of the zone where the resource resides. Only applicable for zonal resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |

### `QueuedResourceList`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the resource; defined by the server. |
| `items` | array<QueuedResource> | A list of QueuedResource resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | This token allows you to get the next page of results formaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output only\] Unreachable resources. |
| `warning` | object | Informational warning message. |

### `QueuedResourceStatus`

- \[Output only\] Result of queuing and provisioning based on deferred capacity.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `failedData` | QueuedResourceStatusFailedData | Output only. Additional status detail for the FAILED state. |
| `provisioningOperations` | array<string> | Output only. \[Output only\] Fully qualified URL of the provisioning GCE operation to track the provisioning along with provisioning errors. The referenced operation may not exist after having been deleted or expired. |
| `queuingPolicy` | QueuingPolicy | Output only. Constraints for the time when the resource(s) start provisioning. Always exposed as absolute times. |

### `QueuedResourceStatusFailedData`

- Additional status detail for the FAILED state.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `error` | object | The error(s) that caused the QueuedResource to enter the FAILED state. |

### `QueuedResourcesAggregatedList`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of QueuedResourcesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#queuedResourcesAggregatedList for lists of QueuedResource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `QueuedResourcesScopedList`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `queuedResources` | array<QueuedResource> | List of QueuedResources contained in this scope. |
| `warning` | object | Informational warning which replaces the list of backend services when the list is empty. |

### `QueuingPolicy`

- Queuing parameters for the requested deferred capacity.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `validUntilDuration` | Duration | Relative deadline for waiting for capacity. |
| `validUntilTime` | string | Absolute deadline for waiting for capacity inRFC3339 text format. |

### `Quota`

- A quotas entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `limit` | number (double) | \[Output Only\] Quota limit for this metric. |
| `metric` | string enum | \[Output Only\] Name of the quota metric. Values: `A2_CPUS`, `AFFINITY_GROUPS`, `AUTOSCALERS`, `BACKEND_BUCKETS`, `BACKEND_SERVICES`, `C2D_CPUS`, `C2_CPUS`, `C3_CPUS`, `COMMITMENTS`, `COMMITTED_A2_CPUS`, `COMMITTED_C2D_CPUS`, `COMMITTED_C2_CPUS`, `COMMITTED_C3_CPUS`, `COMMITTED_CPUS`, `COMMITTED_E2_CPUS`, `COMMITTED_LICENSES`, `COMMITTED_LOCAL_SSD_TOTAL_GB`, `COMMITTED_M3_CPUS`, `COMMITTED_MEMORY_OPTIMIZED_CPUS`, `COMMITTED_N2A_CPUS`, `COMMITTED_N2D_CPUS`, `COMMITTED_N2_CPUS`, `COMMITTED_NVIDIA_A100_80GB_GPUS`, `COMMITTED_NVIDIA_A100_GPUS`, `COMMITTED_NVIDIA_H100_GPUS`, `COMMITTED_NVIDIA_K80_GPUS`, `COMMITTED_NVIDIA_L4_GPUS`, `COMMITTED_NVIDIA_P100_GPUS`, `COMMITTED_NVIDIA_P4_GPUS`, `COMMITTED_NVIDIA_T4_GPUS`, `COMMITTED_NVIDIA_V100_GPUS`, `COMMITTED_T2A_CPUS`, `COMMITTED_T2D_CPUS`, `COMMITTED_Z3_CPUS`, `CPUS`, `CPUS_ALL_REGIONS`, `DISKS_TOTAL_GB`, `E2_CPUS`, `EXTERNAL_MANAGED_FORWARDING_RULES`, `EXTERNAL_NETWORK_LB_FORWARDING_RULES`, `EXTERNAL_PROTOCOL_FORWARDING_RULES`, `EXTERNAL_VPN_GATEWAYS`, `FIREWALLS`, `FORWARDING_RULES`, `GLOBAL_EXTERNAL_MANAGED_BACKEND_SERVICES`, `GLOBAL_EXTERNAL_MANAGED_FORWARDING_RULES`, `GLOBAL_EXTERNAL_PROXY_LB_BACKEND_SERVICES`, `GLOBAL_INTERNAL_ADDRESSES`, `GLOBAL_INTERNAL_MANAGED_BACKEND_SERVICES`, `GLOBAL_INTERNAL_TRAFFIC_DIRECTOR_BACKEND_SERVICES`, `GPUS_ALL_REGIONS`, `HDB_TOTAL_GB`, `HDB_TOTAL_IOPS`, `HDB_TOTAL_THROUGHPUT`, `HEALTH_CHECKS`, `IMAGES`, `INSTANCES`, `INSTANCE_GROUPS`, `INSTANCE_GROUP_MANAGERS`, `INSTANCE_TEMPLATES`, `INTERCONNECTS`, `INTERCONNECT_ATTACHMENTS_PER_REGION`, `INTERCONNECT_ATTACHMENTS_TOTAL_MBPS`, `INTERCONNECT_TOTAL_GBPS`, `INTERNAL_ADDRESSES`, `INTERNAL_TRAFFIC_DIRECTOR_FORWARDING_RULES`, `IN_PLACE_SNAPSHOTS`, `IN_USE_ADDRESSES`, `IN_USE_BACKUP_SCHEDULES`, `IN_USE_SNAPSHOT_SCHEDULES`, `LOCAL_SSD_TOTAL_GB`, `M1_CPUS`, `M2_CPUS`, `M3_CPUS`, `MACHINE_IMAGES`, `N2A_CPUS`, `N2D_CPUS`, `N2_CPUS`, `NETWORKS`, `NETWORK_ATTACHMENTS`, `NETWORK_ENDPOINT_GROUPS`, `NETWORK_FIREWALL_POLICIES`, `NET_LB_SECURITY_POLICIES_PER_REGION`, `NET_LB_SECURITY_POLICY_RULES_PER_REGION`, `NET_LB_SECURITY_POLICY_RULE_ATTRIBUTES_PER_REGION`, `NODE_GROUPS`, `NODE_TEMPLATES`, `NVIDIA_A100_80GB_GPUS`, `NVIDIA_A100_GPUS`, `NVIDIA_K80_GPUS`, `NVIDIA_L4_GPUS`, `NVIDIA_P100_GPUS`, `NVIDIA_P100_VWS_GPUS`, `NVIDIA_P4_GPUS`, `NVIDIA_P4_VWS_GPUS`, `NVIDIA_T4_GPUS`, `NVIDIA_T4_VWS_GPUS`, `NVIDIA_V100_GPUS`, `PACKET_MIRRORINGS`, `PD_EXTREME_TOTAL_PROVISIONED_IOPS`, `PREEMPTIBLE_CPUS`, `PREEMPTIBLE_LOCAL_SSD_GB`, `PREEMPTIBLE_NVIDIA_A100_80GB_GPUS`, `PREEMPTIBLE_NVIDIA_A100_GPUS`, `PREEMPTIBLE_NVIDIA_H100_GPUS`, `PREEMPTIBLE_NVIDIA_K80_GPUS`, `PREEMPTIBLE_NVIDIA_L4_GPUS`, `PREEMPTIBLE_NVIDIA_P100_GPUS`, `PREEMPTIBLE_NVIDIA_P100_VWS_GPUS`, `PREEMPTIBLE_NVIDIA_P4_GPUS`, `PREEMPTIBLE_NVIDIA_P4_VWS_GPUS`, `PREEMPTIBLE_NVIDIA_T4_GPUS`, `PREEMPTIBLE_NVIDIA_T4_VWS_GPUS`, `PREEMPTIBLE_NVIDIA_V100_GPUS`, `PREEMPTIBLE_TPU_LITE_DEVICE_V5`, `PREEMPTIBLE_TPU_LITE_PODSLICE_V5`, `PREEMPTIBLE_TPU_PODSLICE_V4`, `PSC_ILB_CONSUMER_FORWARDING_RULES_PER_PRODUCER_NETWORK`, `PSC_INTERNAL_LB_FORWARDING_RULES`, `PUBLIC_ADVERTISED_PREFIXES`, `PUBLIC_DELEGATED_PREFIXES`, `REGIONAL_AUTOSCALERS`, `REGIONAL_EXTERNAL_MANAGED_BACKEND_SERVICES`, `REGIONAL_EXTERNAL_NETWORK_LB_BACKEND_SERVICES`, `REGIONAL_INSTANCE_GROUP_MANAGERS`, `REGIONAL_INTERNAL_LB_BACKEND_SERVICES`, `REGIONAL_INTERNAL_MANAGED_BACKEND_SERVICES`, `REGIONAL_INTERNAL_TRAFFIC_DIRECTOR_BACKEND_SERVICES`, `RESERVATIONS`, `RESOURCE_POLICIES`, `ROUTERS`, `ROUTES`, `SECURITY_POLICIES`, `SECURITY_POLICIES_PER_REGION`, `SECURITY_POLICY_ADVANCED_RULES_PER_REGION`, `SECURITY_POLICY_CEVAL_RULES`, `SECURITY_POLICY_RULES`, `SECURITY_POLICY_RULES_PER_REGION`, `SERVICE_ATTACHMENTS`, `SNAPSHOTS`, `SSD_TOTAL_GB`, `SSL_CERTIFICATES`, `SSL_POLICIES`, `STATIC_ADDRESSES`, `STATIC_BYOIP_ADDRESSES`, `STATIC_EXTERNAL_IPV6_ADDRESS_RANGES`, `SUBNETWORKS`, `T2A_CPUS`, `T2D_CPUS`, `TARGET_HTTPS_PROXIES`, `TARGET_HTTP_PROXIES`, `TARGET_INSTANCES`, `TARGET_POOLS`, `TARGET_SSL_PROXIES`, `TARGET_TCP_PROXIES`, `TARGET_VPN_GATEWAYS`, `TPU_LITE_DEVICE_V5`, `TPU_LITE_PODSLICE_V5`, `TPU_PODSLICE_V4`, `URL_MAPS`, `VARIABLE_IPV6_PUBLIC_DELEGATED_PREFIXES`, `VPN_GATEWAYS`, `VPN_TUNNELS`, `XPN_SERVICE_PROJECTS`. |
| `owner` | string | \[Output Only\] Owning resource. This is the resource on which this quota is applied. |
| `usage` | number (double) | \[Output Only\] Current usage of this metric. |

### `QuotaExceededInfo`

- Additional details for quota exceeded error for resource quota.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dimensions` | object | The map holding related quota dimensions. |
| `futureLimit` | number (double) | Future quota limit being rolled out. The limit's unit depends on the quota type or metric. |
| `limit` | number (double) | Current effective quota limit. The limit's unit depends on the quota type or metric. |
| `limitName` | string | The name of the quota limit. |
| `metricName` | string | The Compute Engine quota metric name. |
| `rolloutStatus` | string enum | Rollout status of the future quota limit. Values: `IN_PROGRESS`, `ROLLOUT_STATUS_UNSPECIFIED`. |

### `RbacPolicy`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the RbacPolicy. |
| `permissions` | array<Permission> | The list of permissions. |
| `principals` | array<Principal> | The list of principals. |

### `RecoverableSnapshot`

- Represents a RecoverableSnapshot resource. A RecoverableSnapshot represents a snapshot in recycle bin.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | Optional. An optional description of this resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#recoverableSnapshot for RecoverableSnapshot resources. |
| `name` | string | Output only. Identifier. Name of the recoverable snapshot generated on the deletion of the snapshot. The name will be 1-63 characters long, and comply withRFC1035. Specifically, the name will be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character will be a lowercase letter, and all following characters can be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `originalResource` | RecoverableSnapshotOriginalSnapshot | Output only. Output Only\] The original snapshot resource. |
| `purgeTimestamp` | string | Output only. \[Output Only\] Purge timestamp of recoverable snapshot inRFC3339 text format. |
| `satisfiesPzi` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `status` | string enum | Output only. \[Output Only\] Status of the recoverable snapshot. Values: `CREATING`, `DELETING`, `FAILED`, `READY`, `RECOVERING`, `UNKNOWN`. |

### `RecoverableSnapshotAggregatedList`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of RecoverableSnapshotsScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#recoverableSnapshotAggregatedList for aggregated lists of recoverablesnapshots. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RecoverableSnapshotList`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<RecoverableSnapshot> | A list of RecoverableSnapshots resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#recoverableSnapshotList for lists of recoverablesnapshots. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RecoverableSnapshotOriginalSnapshot`

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the snapshot. Valid values are ARM64 or X86_64. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `autoCreated` | boolean | Output only. \[Output Only\] Set to true if snapshots are automatically created by applying resource policy on the target disk. |
| `chainName` | string | Creates the new snapshot in the snapshot chain labeled with the specified name. The chain name must be 1-63 characters long and comply with RFC1035. This is an uncommon option only for advanced service owners who needs to create separate snapshot chains, for example, for chargeback tracking. When you describe your snapshot resource, this field is visible only if it has a non-empty value. |
| `creationSizeBytes` | string (int64) | Output only. \[Output Only\] Size in bytes of the snapshot at creation time. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deletionTimestamp` | string | Output only. \[Output Only\] Deletion timestamp of snapshot inRFC3339 text format. |
| `description` | string | An optional description of this resource. |
| `diskSizeGb` | string (int64) | Output only. \[Output Only\] Size of the source disk, specified in GB. |
| `downloadBytes` | string (int64) | Output only. \[Output Only\] Number of bytes downloaded to restore a snapshot to a disk. |
| `enableConfidentialCompute` | boolean | Output only. Whether this snapshot is created from a confidential compute mode disk. \[Output Only\]: This field is not set by user, but from source disk. |
| `guestOsFeatures` | array<GuestOsFeature> | Output only. \[Output Only\] A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the original snapshot. This identifier is defined by the server. |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this snapshot, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a snapshot. |
| `labels` | object | Labels to apply to this snapshot. These can be later modified by the setLabels method. Label values may be empty. |
| `licenseCodes` | array<string> | Output only. \[Output Only\] Integer license codes indicating which licenses are attached to this snapshot. |
| `licenses` | array<string> | Output only. \[Output Only\] A list of public visible licenses that apply to this snapshot. |
| `maxRetentionDays` | integer (int32) | Number of days the snapshot should be retained before being deleted automatically. |
| `name` | string | Name of the original snapshot provided by the client. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `region` | string | Output only. \[Output Only\] URL of the region where the snapshot resides. Only applicable for regional snapshots. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `snapshotEncryptionKey` | CustomerEncryptionKey | Encrypts the snapshot using acustomer-supplied encryption key. After you encrypt a snapshot using a customer-supplied key, you must provide the same key if you use the snapshot later. For example, you must provide the encryption key when you create a disk from the encrypted snapshot in a future request. Customer-supplied encryption keys do not protect access to metadata of the snapshot. If you do not provide an encryption key when creating the snapshot, then the snapshot will be encrypted using an automatically generated key and you do not need to provide a key to use the snapshot later. |
| `snapshotGroupId` | string | Output only. \[Output Only\] The unique ID of the snapshot group that this snapshot belongs to. The usage of snapshot group feature is restricted. |
| `snapshotGroupName` | string | Output only. \[Output only\] The snapshot group that this snapshot belongs to. The usage of snapshot group feature is restricted. |
| `snapshotType` | string enum | Indicates the type of the snapshot. Valid values are ARCHIVE or STANDARD. Values: `ARCHIVE`, `STANDARD`. |
| `sourceDisk` | string | The source disk used to create this snapshot. |
| `sourceDiskEncryptionKey` | CustomerEncryptionKey | The customer-supplied encryption key of the source disk. Required if the source disk is protected by a customer-supplied encryption key. |
| `sourceDiskForRecoveryCheckpoint` | string | The source disk whose recovery checkpoint will be used to create this snapshot. |
| `sourceDiskId` | string | Output only. \[Output Only\] The ID value of the disk used to create this snapshot |
| `sourceInstantSnapshot` | string | The source instant snapshot used to create this snapshot. |
| `sourceInstantSnapshotEncryptionKey` | CustomerEncryptionKey | Customer provided encryption key when creating Snapshot from Instant Snapshot. |
| `sourceInstantSnapshotId` | string | Output only. \[Output Only\] The unique ID of the instant snapshot used to create this snapshot. This value identifies the exact instant snapshot that was used to create this persistent disk. For example, if you created the persistent disk from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact instant snapshot that was used. |
| `sourceSnapshotSchedulePolicy` | string | Output only. \[Output Only\] URL of the resource policy which created this scheduled snapshot. |
| `sourceSnapshotSchedulePolicyId` | string | Output only. \[Output Only\] ID of the resource policy which created this scheduled snapshot. |
| `storageBytes` | string (int64) | Output only. \[Output Only\] A size of the storage used by the snapshot. |
| `storageBytesStatus` | string enum | Output only. \[Deprecated\] Instead, check the storageBytes field. After snapshot creation, the storageBytesStatus field is alwaysUP_TO_DATE. \[Output Only\] An indicator whether storageBytes is in a stable state or it is being adjusted as a result of shared storage reallocation. This status can either be unset, meaning the snapshot is being created, or UP_TO_DATE, meaning the size of the snapshot is up-to-date. Values: `UPDATING`, `UP_TO_DATE`. |
| `storageLocations` | array<string> | Cloud Storage bucket storage location of the snapshot (regional or multi-regional). |

### `RecoverableSnapshotsScopedList`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `recoverablesnapshots` | array<RecoverableSnapshot> | \[Output Only\] A list of recoverablesnapshots contained in this scope. |
| `warning` | object | \[Output Only\] Informational warning which replaces the list of recoverablesnapshots when the list is empty. |

### `Reference`

- Represents a reference to a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#reference for references. |
| `referenceType` | string | A description of the reference type with no implied semantics. Possible values include: 1. MEMBER_OF |
| `referrer` | string | URL of the resource which refers to the target. |
| `target` | string | URL of the resource to which this reference points. |

### `RegexRewrite`

- The spec for modifying the path using a regular expression.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pathPattern` | string | Required. The regular expression used to match against the URL path. It uses RE2 syntax with the following constraints: - Any single character operators - Groups are allowed to have only submatch operator inside - Groups are allowed only without any char repetition, e.g. .\* - Any char repetition, e.g. .\*, is only allowed to be used in a single regex together with: - Empty string operators - Other repetitions - Ranges - Repetitions of ranges - Ranges are only allowed to have: - Character range - Digits range - Symbols listed in characters allowed for ranges |
| `pathSubstitution` | string | Required. Required when path pattern is specified. Used to rewrite matching parts of the path. |

### `Region`

- Represents a Region resource. A region is a geographical area where a resource is located. For more information, readRegions and Zones.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this region. |
| `description` | string | \[Output Only\] Textual description of the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#region for regions. |
| `name` | string | \[Output Only\] Name of the resource. |
| `quotaStatusWarning` | object | Output only. \[Output Only\] Warning of fetching the `quotas` field for this region. This field is populated only if fetching of the `quotas` field fails. |
| `quotas` | array<Quota> | \[Output Only\] Quotas assigned to this region. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] Status of the region, either UP orDOWN. Values: `DOWN`, `UP`. |
| `supportsPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `zones` | array<string> | \[Output Only\] A list of zones available in this region, in the form of resource URLs. |

### `Region` (alpha)

- Represents a Region resource. A region is a geographical area where a resource is located. For more information, readRegions and Zones.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this region. |
| `description` | string | \[Output Only\] Textual description of the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#region for regions. |
| `name` | string | \[Output Only\] Name of the resource. |
| `quotaStatusWarning` | object | Output only. \[Output Only\] Warning of fetching the `quotas` field for this region. This field is populated only if fetching of the `quotas` field fails. |
| `quotas` | array<Quota> | \[Output Only\] Quotas assigned to this region. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `status` | string enum | \[Output Only\] Status of the region, either UP orDOWN. Values: `DOWN`, `UP`. |
| `supportsPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `zones` | array<string> | \[Output Only\] A list of zones available in this region, in the form of resource URLs. |

### `Region` (preview)

- Represents a Region resource. A region is a geographical area where a resource is located. For more information, readRegions and Zones.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | \[Output Only\] Creation timestamp inRFC3339 text format. |
| `deprecated` | DeprecationStatus | \[Output Only\] The deprecation status associated with this region. |
| `description` | string | \[Output Only\] Textual description of the resource. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#region for regions. |
| `name` | string | \[Output Only\] Name of the resource. |
| `quotaStatusWarning` | object | Output only. \[Output Only\] Warning of fetching the `quotas` field for this region. This field is populated only if fetching of the `quotas` field fails. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `status` | string enum | \[Output Only\] Status of the region, either UP orDOWN. Values: `DOWN`, `UP`. |
| `supportsPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `zones` | array<string> | \[Output Only\] A list of zones available in this region, in the form of resource URLs. |

### `RegionAddressesMoveRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional destination address description if intended to be different from the source. |
| `destinationAddress` | string | The URL of the destination address to move to. This can be a full or partial URL. For example, the following are all valid URLs to a address: - https://www.googleapis.com/compute/v1/projects/project/regions/region/addresses/address - projects/project/regions/region/addresses/address Note that destination project must be different from the source project. So/regions/region/addresses/address is not valid partial url. |

### `RegionAddressesUpdatePublicPtrRequest`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `ptrDomainName` | string | The public DNS PTR record to be configured for this external IP. |
| `ptrDomainNameTtl` | integer (int32) | The TTL in seconds for public DNS PTR record. |

### Shape of `NodeTypeAggregatedList`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "id": "string",
  "items": "object",
  "kind": "string",
  "nextPageToken": "string",
  "selfLink": "string",
  "unreachables": "array<string>",
  "warning": "object"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
