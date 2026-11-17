---
source: https://networkmanagement.googleapis.com/$discovery/rest?version=v1
---

# Network Management API REST API (networkmanagement)

## Signature / Usage

Base URL: `https://networkmanagement.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `networkmanagement.organizations.locations.get`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `networkmanagement.organizations.locations.global.operations.cancel`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `networkmanagement.organizations.locations.global.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://networkmanagement.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `networkmanagement.organizations.locations.global.operations.get`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `networkmanagement.organizations.locations.global.operations.list`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `networkmanagement.organizations.locations.list`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `networkmanagement.organizations.locations.vpcFlowLogsConfigs.create`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+parent}/vpcFlowLogsConfigs`
- Creates a new `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Creating a configuration with `state=DISABLED` will fail 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - creating another configuration with the same fields but different values for the following fields will fail as well: \* name \* create_time \* update_time \* labels \* description
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VpcFlowLogsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the VpcFlowLogsConfig to create, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` |
| `vpcFlowLogsConfigId` | query | string | yes | Required. ID of the `VpcFlowLogsConfig`. |

### `networkmanagement.organizations.locations.vpcFlowLogsConfigs.delete`

- Versions: v1, v1beta1
- `DELETE https://networkmanagement.googleapis.com/v1/{+name}`
- Deletes a specific `VpcFlowLogsConfig`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For a project-level resource: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For an organization-level resource: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` |

### `networkmanagement.organizations.locations.vpcFlowLogsConfigs.get`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the details of a specific `VpcFlowLogsConfig`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VpcFlowLogsConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level resources: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` |

### `networkmanagement.organizations.locations.vpcFlowLogsConfigs.list`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/vpcFlowLogsConfigs`
- Lists all `VpcFlowLogsConfigs` in a given organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVpcFlowLogsConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` |
| `filter` | query | string | no | Optional. Lists the `VpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported \[CEL logic operators\] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. Number of `VpcFlowLogsConfigs` to return. |
| `pageToken` | query | string | no | Optional. Page token from an earlier query, as returned in `next_page_token`. |

### `networkmanagement.organizations.locations.vpcFlowLogsConfigs.patch`

- Versions: v1, v1beta1
- `PATCH https://networkmanagement.googleapis.com/v1/{+name}`
- Updates an existing `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Updating a configuration with `state=DISABLED` will fail 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - updating another configuration with the same fields but different values for the following fields will fail as well: \* name \* create_time \* update_time \* labels \* description
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VpcFlowLogsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. For example, to change the state of the configuration to ENABLED, specify `update_mask` = `"state"`, and the `vpc_flow_logs_config` would be: `vpc_flow_logs_config = { name = "projects/my-project/locations/global/vpcFlowLogsConfigs/my-config" state = "ENABLED" }` |

### `networkmanagement.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `networkmanagement.projects.locations.global.connectivityTests.create`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+parent}/connectivityTests`
- Creates a new Connectivity Test. After you create a test, the reachability analysis is performed as part of the long running operation, which completes when the analysis completes. If the endpoint specifications in `ConnectivityTest` are invalid (for example, containing non-existent resources in the network, or you don't have read permissions to the network configurations of listed projects), then the reachability result returns a value of `UNKNOWN`. If the endpoint specifications in `ConnectivityTest` are incomplete, the reachability result returns a value of `AMBIGUOUS`. For more information, see the Connectivity Test documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConnectivityTest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the Connectivity Test to create: `projects/{project_id}/locations/global` |
| `testId` | query | string | yes | Required. The logical name of the Connectivity Test in your project with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-40 characters. \* Must end with a number or a letter. \* Must be unique within the customer project |

### `networkmanagement.projects.locations.global.connectivityTests.delete`

- Versions: v1, v1beta1
- `DELETE https://networkmanagement.googleapis.com/v1/{+name}`
- Deletes a specific `ConnectivityTest`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Connectivity Test resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` |

### `networkmanagement.projects.locations.global.connectivityTests.get`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the details of a specific Connectivity Test.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConnectivityTest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. `ConnectivityTest` resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` |

### `networkmanagement.projects.locations.global.connectivityTests.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkmanagement.projects.locations.global.connectivityTests.list`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/connectivityTests`
- Lists all Connectivity Tests owned by a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectivityTestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the Connectivity Tests: `projects/{project_id}/locations/global` |
| `filter` | query | string | no | Optional. Lists the `ConnectivityTests` that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form ` ` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`, `:` are supported (colon `:` represents a HAS operator which is roughly synonymous with equality). can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/proj-1/locations/global/connectivityTests/test-1 - Filter by labels: - Resources that have a key called `foo` labels.foo:\* - Resources that have a key called `foo` whose value is `bar` labels.foo = bar |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. Number of `ConnectivityTests` to return. |
| `pageToken` | query | string | no | Optional. Page token from an earlier query, as returned in `next_page_token`. |

### `networkmanagement.projects.locations.global.connectivityTests.patch`

- Versions: v1, v1beta1
- `PATCH https://networkmanagement.googleapis.com/v1/{+name}`
- Updates the configuration of an existing `ConnectivityTest`. After you update a test, the reachability analysis is performed as part of the long running operation, which completes when the analysis completes. The Reachability state in the test resource is updated with the new result. If the endpoint specifications in `ConnectivityTest` are invalid (for example, they contain non-existent resources in the network, or the user does not have read permissions to the network configurations of listed projects), then the reachability result returns a value of `UNKNOWN`. If the endpoint specifications in `ConnectivityTest` are incomplete, the reachability result returns a value of `AMBIGUOUS`. See the documentation in `ConnectivityTest` for more details.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConnectivityTest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. |

### `networkmanagement.projects.locations.global.connectivityTests.rerun`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+name}:rerun`
- Rerun an existing `ConnectivityTest`. After the user triggers the rerun, the reachability analysis is performed as part of the long running operation, which completes when the analysis completes. Even though the test configuration remains the same, the reachability result may change due to underlying network configuration changes. If the endpoint specifications in `ConnectivityTest` become invalid (for example, specified resources are deleted in the network, or you lost read permissions to the network configurations of listed projects), then the reachability result returns a value of `UNKNOWN`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RerunConnectivityTestRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Connectivity Test resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}` |

### `networkmanagement.projects.locations.global.connectivityTests.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkmanagement.projects.locations.global.connectivityTests.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkmanagement.projects.locations.global.operations.cancel`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `networkmanagement.projects.locations.global.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://networkmanagement.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `networkmanagement.projects.locations.global.operations.get`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `networkmanagement.projects.locations.global.operations.list`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `networkmanagement.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `networkmanagement.projects.locations.networkMonitoringProviders.create`

- Versions: v1
- `POST https://networkmanagement.googleapis.com/v1/{+parent}/networkMonitoringProviders`
- Creates a NetworkMonitoringProvider resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `NetworkMonitoringProvider`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for CreateNetworkMonitoringProviderRequest. Format: projects/{project}/locations/{location} |
| `networkMonitoringProviderId` | query | string | yes | Required. The ID to use for the NetworkMonitoringProvider resource, which will become the final component of the NetworkMonitoringProvider resource's name. |

### `networkmanagement.projects.locations.networkMonitoringProviders.delete`

- Versions: v1
- `DELETE https://networkmanagement.googleapis.com/v1/{+name}`
- Deletes a NetworkMonitoringProvider resource and all of its child resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |
| `force` | query | boolean | no | Optional. If set to true, any nested MonitoringPoints, NetworkPaths and WebPaths resources from this NetworkMonitoringProvider will also be deleted. Otherwise, the request will only work if there are no nested resources. |

### `networkmanagement.projects.locations.networkMonitoringProviders.generateMonitoringPointConfig`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+name}:generateMonitoringPointConfig`
- Generates Monitoring Point configuration of a NetworkMonitoringProvider resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GenerateMonitoringPointConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |
| `privateConnectivityEnabled` | query | boolean | no | Optional. For Google Cloud MPs, this field indicates whether the Monitoring Point is deployed in a Private Service Connect deployment. Not used for non-Google Cloud MPs. |

### `networkmanagement.projects.locations.networkMonitoringProviders.generateProviderAccessToken`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+name}:generateProviderAccessToken`
- Generates a provider access token for a given Google access token. Provider access token is a short-lived token that is used to access resources in the provider's platform.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GenerateProviderAccessTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |
| `gcpAccessToken` | query | string | yes | Required. Google access token. |

### `networkmanagement.projects.locations.networkMonitoringProviders.get`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the NetworkMonitoringProvider resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `NetworkMonitoringProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Format: `projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}` |

### `networkmanagement.projects.locations.networkMonitoringProviders.list`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/networkMonitoringProviders`
- Lists NetworkMonitoringProviders for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNetworkMonitoringProvidersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListNetworkMonitoringProvidersRequest. Format: `projects/{project}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of monitoring points to return. The service may return fewer than this value. If unspecified, at most 20 monitoring points will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMonitoringPoints` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMonitoringPoints` must match the call that provided the page token. |

### `networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.downloadInstallScript`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/monitoringPoints:downloadInstallScript`
- Downloads an install script for MonitoringPoints for a given network monitoring provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for DownloadInstallScriptRequest. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |
| `_password` | query | string | no | Optional. Password for logging into the MonitoringPoint. |
| `cloudDeploymentType` | query | string enum | no | Optional. The deployment type for Cloud Monitoring Points. Values: `CLOUD_DEPLOYMENT_TYPE_UNSPECIFIED`, `TERRAFORM`, `CLOUD_FORMATION`, `BICEP`. |
| `hostname` | query | string | yes | Required. The hostname of the MonitoringPoint, e.g. "test-vm" |
| `monitoringPointType` | query | string enum | yes | Required. The type of the monitoring point. Values: `MONITORING_POINT_TYPE_UNSPECIFIED`, `CONTAINER`, `KVM`, `VMWARE`, `HELM`, `GCE_VM`, `AZURE_VM`, `AWS_EC2`. |
| `ntpServerAddress` | query | string | no | Optional. Network Time Protocol a user can configure. If the user omits the field, the default is either NTP servers provided in the DHCP lease or a set of well-known NTP servers pre-configured on the monitoring point. This field can be an IP address or FQDN. |
| `ntpServerSecondaryAddress` | query | string | no | Optional. Second NTP server. |
| `privateConnectivityEnabled` | query | boolean | no | Optional. For Google Cloud MPs, this field indicates whether the Monitoring Point is deployed in a Private Service Connect deployment. Not used for non-Google Cloud MPs. |
| `staticIpAddress.dnsServerAddress` | query | string | conditional | Required. DNS server. |
| `staticIpAddress.dnsServerSecondaryAddress` | query | string | no | Optional. Second DNS server. |
| `staticIpAddress.domain` | query | string | no | Optional. Domain name of the MonitoringPoint. |
| `staticIpAddress.gatewayAddress` | query | string | conditional | Required. Gateway IP address. Example: "100.80.40.1". |
| `staticIpAddress.ipAddress` | query | string | conditional | Required. IP address of the MonitoringPoint. |
| `staticIpAddress.netmask` | query | string | no | Optional. Networkmask and CIDR range. Example: "255.255.255.0/24" |
| `timeZone.id` | query | string | no | IANA Time Zone Database time zone. For example "America/New_York". |
| `timeZone.version` | query | string | no | Optional. IANA Time Zone Database version number. For example "2019a". |
| `useDhcp` | query | boolean | no | Optional. Dynamic Host Configuration Protocol, is a network management protocol that automatically assigns IP addresses and other network configuration parameters to devices connecting to a network. |

### `networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.downloadRecreateInstallScript`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+name}:downloadRecreateInstallScript`
- Downloads an install script for a specific Container MonitoringPoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the MonitoringPoint. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/monitoringPoints/{monitoring_point} |
| `hostname` | query | string | no | Optional. The hostname of the MonitoringPoint, e.g. "test-vm" |

### `networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.downloadServerConnectConfig`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/monitoringPoints:downloadServerConnectConfig`
- Downloads the server connect configuration for a given network monitoring provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for DownloadServerConnectConfigRequest. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |

### `networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.get`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the MonitoringPoint resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MonitoringPoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/monitoringPoints/{monitoring_point} |

### `networkmanagement.projects.locations.networkMonitoringProviders.monitoringPoints.list`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/monitoringPoints`
- Lists MonitoringPoints for a given network monitoring provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMonitoringPointsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListMonitoringPointsRequest. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of monitoring points to return. The service may return fewer than this value. If unspecified, at most 20 monitoring points will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMonitoringPoints` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMonitoringPoints` must match the call that provided the page token. |

### `networkmanagement.projects.locations.networkMonitoringProviders.networkPaths.get`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the NetworkPath resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `NetworkPath`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/networkPaths/{network_path} |

### `networkmanagement.projects.locations.networkMonitoringProviders.networkPaths.list`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/networkPaths`
- Lists NetworkPaths for a given network monitoring provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNetworkPathsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListNetworkPathsRequest. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of network paths to return. The service may return fewer than this value. If unspecified, at most 20 network pathswill be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListNetworkPaths` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListNetworkPaths` must match the call that provided the page token. |

### `networkmanagement.projects.locations.networkMonitoringProviders.webPaths.get`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the WebPath resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WebPath`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource.. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider}/webPaths/{web_path} |

### `networkmanagement.projects.locations.networkMonitoringProviders.webPaths.list`

- Versions: v1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/webPaths`
- Lists WebPaths for a given network monitoring provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWebPathsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListWebPathsRequest. Format: projects/{project}/locations/{location}/networkMonitoringProviders/{network_monitoring_provider} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of web paths to return. The service may return fewer than this value. If unspecified, at most 20 web paths will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListWebPaths` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWebPaths` must match the call that provided the page token. |

### `networkmanagement.projects.locations.vpcFlowLogsConfigs.create`

- Versions: v1, v1beta1
- `POST https://networkmanagement.googleapis.com/v1/{+parent}/vpcFlowLogsConfigs`
- Creates a new `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Creating a configuration with `state=DISABLED` will fail 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - creating another configuration with the same fields but different values for the following fields will fail as well: \* name \* create_time \* update_time \* labels \* description
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VpcFlowLogsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the VpcFlowLogsConfig to create, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` |
| `vpcFlowLogsConfigId` | query | string | yes | Required. ID of the `VpcFlowLogsConfig`. |

### `networkmanagement.projects.locations.vpcFlowLogsConfigs.delete`

- Versions: v1, v1beta1
- `DELETE https://networkmanagement.googleapis.com/v1/{+name}`
- Deletes a specific `VpcFlowLogsConfig`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For a project-level resource: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For an organization-level resource: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` |

### `networkmanagement.projects.locations.vpcFlowLogsConfigs.get`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+name}`
- Gets the details of a specific `VpcFlowLogsConfig`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VpcFlowLogsConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level resources: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` |

### `networkmanagement.projects.locations.vpcFlowLogsConfigs.list`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/vpcFlowLogsConfigs`
- Lists all `VpcFlowLogsConfigs` in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVpcFlowLogsConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the VpcFlowLogsConfig, in one of the following formats: - For project-level resources: `projects/{project_id}/locations/global` - For organization-level resources: `organizations/{organization_id}/locations/global` |
| `filter` | query | string | no | Optional. Lists the `VpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported \[CEL logic operators\] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. Number of `VpcFlowLogsConfigs` to return. |
| `pageToken` | query | string | no | Optional. Page token from an earlier query, as returned in `next_page_token`. |

### `networkmanagement.projects.locations.vpcFlowLogsConfigs.patch`

- Versions: v1, v1beta1
- `PATCH https://networkmanagement.googleapis.com/v1/{+name}`
- Updates an existing `VpcFlowLogsConfig`. If a configuration with the exact same settings already exists (even if the ID is different), the creation fails. Notes: 1. Updating a configuration with `state=DISABLED` will fail. 2. The following fields are not considered as settings for the purpose of the check mentioned above, therefore - updating another configuration with the same fields but different values for the following fields will fail as well: \* name \* create_time \* update_time \* labels \* description
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VpcFlowLogsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique name of the configuration. The name can have one of the following forms: - For project-level configurations: `projects/{project_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` - For organization-level configurations: `organizations/{organization_id}/locations/global/vpcFlowLogsConfigs/{vpc_flow_logs_config_id}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. For example, to change the state of the configuration to ENABLED, specify `update_mask` = `"state"`, and the `vpc_flow_logs_config` would be: `vpc_flow_logs_config = { name = "projects/my-project/locations/global/vpcFlowLogsConfigs/my-config" state = "ENABLED" }` |

### `networkmanagement.projects.locations.vpcFlowLogsConfigs.queryOrgVpcFlowLogsConfigs`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/vpcFlowLogsConfigs:queryOrgVpcFlowLogsConfigs`
- QueryOrgVpcFlowLogsConfigs returns a list of all organization-level VPC Flow Logs configurations applicable to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryOrgVpcFlowLogsConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the VpcFlowLogsConfig, specified in the following format: `projects/{project_id}/locations/global` |
| `filter` | query | string | no | Optional. Lists the `VpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported \[CEL logic operators\] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). |
| `pageSize` | query | integer (int32) | no | Optional. Number of `VpcFlowLogsConfigs` to return. |
| `pageToken` | query | string | no | Optional. Page token from an earlier query, as returned in `next_page_token`. |

### `networkmanagement.projects.locations.vpcFlowLogsConfigs.showEffectiveFlowLogsConfigs`

- Versions: v1, v1beta1
- `GET https://networkmanagement.googleapis.com/v1/{+parent}/vpcFlowLogsConfigs:showEffectiveFlowLogsConfigs`
- ShowEffectiveFlowLogsConfigs returns a list of all VPC Flow Logs configurations applicable to a specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ShowEffectiveFlowLogsConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the VpcFlowLogsConfig, specified in the following format: `projects/{project_id}/locations/global` |
| `filter` | query | string | no | Optional. Lists the `EffectiveVpcFlowLogsConfigs` that match the filter expression. A filter expression must use the supported \[CEL logic operators\] (https://cloud.google.com/vpc/docs/about-flow-logs-records#supported_cel_logic_operators). |
| `pageSize` | query | integer (int32) | no | Optional. Number of `EffectiveVpcFlowLogsConfigs` to return. Default is 30. |
| `pageToken` | query | string | no | Optional. Page token from an earlier query, as returned in `next_page_token`. |
| `resource` | query | string | yes | Required. The resource to get the effective VPC Flow Logs configuration for. The resource must belong to the same project as the parent. The resource must be a network, subnetwork, interconnect attachment, VPN tunnel, or a project. |

### Example request skeleton

Generated from the Discovery entry of `networkmanagement.organizations.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://networkmanagement.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networkmanagement` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://networkmanagement.googleapis.com/$discovery/rest?version=v1, https://networkmanagement.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
