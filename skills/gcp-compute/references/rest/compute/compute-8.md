---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API REST API (compute) (part 8/12)

## Signature / Usage

Base URL: `https://compute.googleapis.com/compute/v1`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `compute.regionHealthSources.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/healthSources`
- Lists the HealthSources for a project in the given region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `HealthSourceList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionHealthSources.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/healthSources/{healthSource}`
- Updates the specified regional HealthSource resource with the data included in the request. This method supportsPATCH semantics and uses theJSON merge patch format and processing rules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `HealthSource`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `healthSource` | path | string | yes | Name of the HealthSource to update. The name must be 1-63 characters long, and comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionHealthSources.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/healthSources/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionInstanceGroupManagerResizeRequests.cancel`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resizeRequests/{resizeRequest}/cancel`
- Cancels the specified resize request. Cancelled resize request no longer waits for the resources to be provisioned. Cancel is only possible for requests that are in accepted state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region scoping this request. Name should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. Name should conform to RFC1035 or be a resource ID. |
| `resizeRequest` | path | string | yes | The name of the resize request to cancel. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagerResizeRequests.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resizeRequests/{resizeRequest}`
- Deletes the specified, inactive resize request. Requests that are still active cannot be deleted. Deleting request does not delete instances that were provisioned previously.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region scoping this request. Name should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. Name should conform to RFC1035 or be a resource ID. |
| `resizeRequest` | path | string | yes | The name of the resize request to delete. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagerResizeRequests.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resizeRequests/{resizeRequest}`
- Returns all of the details about the specified resize request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstanceGroupManagerResizeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region scoping this request. Name should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. Name should conform to RFC1035 or be a resource ID. |
| `resizeRequest` | path | string | yes | The name of the resize request. Name should conform to RFC1035 or be a resource ID. |

### `compute.regionInstanceGroupManagerResizeRequests.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resizeRequests`
- Creates a new Resize Request that starts provisioning VMs immediately or queues VM creation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `InstanceGroupManagerResizeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. Name should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group to which the resize request is scoped. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagerResizeRequests.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resizeRequests`
- Retrieves a list of Resize Requests that are contained in the managed instance group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionInstanceGroupManagerResizeRequestsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. Name should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. The name should conform to RFC1035. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstanceGroupManagers.abandonInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/abandonInstances`
- Flags the specified instances to be immediately removed from the managed instance group. Abandoning an instance does not delete the instance, but it does remove the instance from any target pools that are applied by the managed instance group. This method reduces thetargetSize of the managed instance group by the number of instances that you abandon. This operation is marked asDONE when the action is scheduled even if the instances have not yet been removed from the group. You must separately verify the status of the abandoning action with thelistmanagedinstances method. If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted. You can specify a maximum of 1000 instances with this method per request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersAbandonInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.adoptInstances`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/adoptInstances`
- Flags the specified instances to be adopted to the managed instance group. Adopting an instance does not change the instance status, but it adds the instance to any target pools that are applied by the managed instance group. This method increases the targetSize of the managed instance group by the number of instances that you adopt. This operation is marked as DONE when the action is scheduled even if the instances have not been adopted to the group yet. You must separately verify the status of the adopting action with the listManagedInstances method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersAdoptInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. It should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. It should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.applyUpdatesToInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/applyUpdatesToInstances`
- Apply updates to selected instances the managed instance group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersApplyUpdatesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request, should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group, should conform to RFC1035. |

### `compute.regionInstanceGroupManagers.createInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/createInstances`
- Creates instances with per-instance configurations in this regional managed instance group. Instances are created using the current instance template. The create instances operation is marked DONE if the createInstances request is successful. The underlying actions take additional time. You must separately verify the status of thecreating or actions with the listmanagedinstances method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersCreateInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of theregion where the managed instance group is located. It should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. It should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}`
- Deletes the specified managed instance group and all of the instances in that group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group to delete. |
| `noGracefulShutdown` | query | boolean | no | When set, graceful shutdown is skipped for instance deletion even if it's configured for the instances. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.deleteInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/deleteInstances`
- Flags the specified instances in the managed instance group to be immediately deleted. The instances are also removed from any target pools of which they were a member. This method reduces thetargetSize of the managed instance group by the number of instances that you delete. The deleteInstances operation is marked DONE if the deleteInstances request is successful. The underlying actions take additional time. You must separately verify the status of thedeleting action with thelistmanagedinstances method. If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted. You can specify a maximum of 1000 instances with this method per request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersDeleteInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `noGracefulShutdown` | query | boolean | no | When set, graceful shutdown is skipped for instance deletion even if it's configured for the instances. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.deletePerInstanceConfigs`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/deletePerInstanceConfigs`
- Deletes selected per-instance configurations for the managed instance group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagerDeleteInstanceConfigReq`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request, should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. It should conform to RFC1035. |

### `compute.regionInstanceGroupManagers.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}`
- Returns all of the details about the specified managed instance group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstanceGroupManager`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group to return. |

### `compute.regionInstanceGroupManagers.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers`
- Creates a managed instance group using the information that you specify in the request. After the group is created, instances in the group are created using the specified instance template. This operation is marked as DONE when the group is created even if the instances in the group have not yet been created. You must separately verify the status of the individual instances with thelistmanagedinstances method. A regional managed instance group can contain up to 2000 instances.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `InstanceGroupManager`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers`
- Retrieves the list of managed instance groups that are contained within the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionInstanceGroupManagerList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstanceGroupManagers.listErrors`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/listErrors`
- Lists all errors thrown by actions on instances for a given regional managed instance group. The filter andorderBy query parameters are not supported.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionInstanceGroupManagersListErrorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. This should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. It must be a string that meets the requirements in RFC1035, or an unsigned long integer: must match regexp pattern: (?:\[a-z\](?:\[-a-z0-9\]{0,61}\[a-z0-9\])?)\|1-9{0,19}. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstanceGroupManagers.listManagedInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/listManagedInstances`
- Lists the instances in the managed instance group and instances that are scheduled to be created. The list includes any current actions that the group has scheduled for its instances. The orderBy query parameter is not supported. The `pageToken` query parameter is supported only if the group's `listManagedInstancesResults` field is set to `PAGINATED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionInstanceGroupManagersListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstanceGroupManagers.listPerInstanceConfigs`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/listPerInstanceConfigs`
- Lists all of the per-instance configurations defined for the managed instance group. The orderBy query parameter is not supported.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionInstanceGroupManagersListInstanceConfigsResp`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request, should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. It should conform to RFC1035. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstanceGroupManagers.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}`
- Updates a managed instance group using the information that you specify in the request. This operation is marked as DONE when the group is patched even if the instances in the group are still in the process of being patched. You must separately verify the status of the individual instances with the listmanagedinstances method. This method supportsPATCH semantics and uses theJSON merge patch format and processing rules. If you update your group to specify a new template or instance configuration, it's possible that your intended specification for each VM in the group is different from the current state of that VM. To learn how to apply an updated configuration to the VMs in a MIG, seeUpdating instances in a MIG.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `InstanceGroupManager`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | The name of the instance group manager. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.patchPerInstanceConfigs`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/patchPerInstanceConfigs`
- Inserts or patches per-instance configurations for the managed instance group. perInstanceConfig.name serves as a key used to distinguish whether to perform insert or patch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagerPatchInstanceConfigReq`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request, should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. It should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.recreateInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/recreateInstances`
- Flags the specified VM instances in the managed instance group to be immediately recreated. Each instance is recreated using the group's current configuration. This operation is marked as DONE when the flag is set even if the instances have not yet been recreated. You must separately verify the status of each instance by checking itscurrentAction field; for more information, see Checking the status of managed instances. If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted. You can specify a maximum of 1000 instances with this method per request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersRecreateRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `noGracefulShutdown` | query | boolean | no | When set, graceful shutdown is skipped for instance recreation even if it's configured for the instances. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.resize`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resize`
- Changes the intended size of the managed instance group. If you increase the size, the group creates new instances using the current instance template. If you decrease the size, the group deletes one or more instances. The resize operation is marked DONE if theresize request is successful. The underlying actions take additional time. You must separately verify the status of thecreating or deleting actions with thelistmanagedinstances method. If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `size` | query | integer (int32) | yes | Number of instances that should exist in this instance group manager. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.resizeAdvanced`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resizeAdvanced`
- Resizes the regional managed instance group with advanced configuration options like disabling creation retries. This is an extended version of theresize method. If you increase the size, the group creates new instances using the current instance template. If you decrease the size, the group deletes one or more instances. The resize operation is marked DONE if theresize request is successful. The underlying actions take additional time. You must separately verify the status of thecreating or deleting actions with the get orlistmanagedinstances method. If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is removed or deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersResizeAdvancedRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. It must be a string that meets the requirements in RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. It must be a string that meets the requirements in RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.resumeInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/resumeInstances`
- Flags the specified instances in the managed instance group to be resumed. This method increases thetargetSize and decreases the targetSuspendedSize of the managed instance group by the number of instances that you resume. The resumeInstances operation is marked DONE if the resumeInstances request is successful. The underlying actions take additional time. You must separately verify the status of theRESUMING action with thelistmanagedinstances method. In this request, you can only specify instances that are suspended. For example, if an instance was previously suspended using the suspendInstances method, it can be resumed using the resumeInstances method. If a health check is attached to the managed instance group, the specified instances will be verified as healthy after they are resumed. You can specify a maximum of 1000 instances with this method per request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersResumeInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.setAutoHealingPolicies`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/setAutoHealingPolicies`
- Modifies the autohealing policy for the instances in this managed instance group. \[Deprecated\] This method is deprecated. UseregionInstanceGroupManagers.patch instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersSetAutoHealingRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.setInstanceTemplate`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/setInstanceTemplate`
- Sets the instance template to use when creating new instances or recreating instances in this group. Existing instances are not affected.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersSetTemplateRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.setTargetPools`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/setTargetPools`
- Modifies the target pools to which all new instances in this group are assigned. Existing instances in the group are not affected.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersSetTargetPoolsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.startInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/startInstances`
- Flags the specified instances in the managed instance group to be started. This method increases thetargetSize and decreases the targetStoppedSize of the managed instance group by the number of instances that you start. The startInstances operation is marked DONE if the startInstances request is successful. The underlying actions take additional time. You must separately verify the status of theSTARTING action with thelistmanagedinstances method. In this request, you can only specify instances that are stopped. For example, if an instance was previously stopped using the stopInstances method, it can be started using the startInstances method. If a health check is attached to the managed instance group, the specified instances will be verified as healthy after they are started. You can specify a maximum of 1000 instances with this method per request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersStartInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.stopInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/stopInstances`
- Flags the specified instances in the managed instance group to be immediately stopped. You can only specify instances that are running in this request. This method reduces thetargetSize and increases the targetStoppedSize of the managed instance group by the number of instances that you stop. The stopInstances operation is marked DONE if the stopInstances request is successful. The underlying actions take additional time. You must separately verify the status of theSTOPPING action with thelistmanagedinstances method. If the standbyPolicy.initialDelaySec field is set, the group delays stopping the instances until initialDelaySec have passed from instance.creationTimestamp (that is, when the instance was created). This delay gives your application time to set itself up and initialize on the instance. If more thaninitialDelaySec seconds have passed sinceinstance.creationTimestamp when this method is called, there will be zero delay. If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is stopped. Stopped instances can be started using the startInstances method. You can specify a maximum of 1000 instances with this method per request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersStopInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. |
| `noGracefulShutdown` | query | boolean | no | When set, graceful shutdown is skipped for instance stopping even if it's configured for the instances. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.suspendInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/suspendInstances`
- Flags the specified instances in the managed instance group to be immediately suspended. You can only specify instances that are running in this request. This method reduces thetargetSize and increases the targetSuspendedSize of the managed instance group by the number of instances that you suspend. The suspendInstances operation is marked DONE if the suspendInstances request is successful. The underlying actions take additional time. You must separately verify the status of theSUSPENDING action with thelistmanagedinstances method. If the standbyPolicy.initialDelaySec field is set, the group delays suspension of the instances until initialDelaySec have passed from instance.creationTimestamp (that is, when the instance was created). This delay gives your application time to set itself up and initialize on the instance. If more thaninitialDelaySec seconds have passed sinceinstance.creationTimestamp when this method is called, there will be zero delay. If the group is part of a backend service that has enabled connection draining, it can take up to 60 seconds after the connection draining duration has elapsed before the VM instance is suspended. Suspended instances can be resumed using the resumeInstances method. You can specify a maximum of 1000 instances with this method per request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagersSuspendInstancesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | Name of the managed instance group. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/instanceGroupManagers/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionInstanceGroupManagers.update`

- Versions: beta, alpha
- `PUT https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}`
- Updates a managed instance group using the information that you specify in the request. This operation is marked as DONE when the group is updated even if the instances in the group have not yet been updated. You must separately verify the status of the individual instances with thelistmanagedinstances method. If you update your group to specify a new template or instance configuration, it's possible that your intended specification for each VM in the group is different from the current state of that VM. To learn how to apply an updated configuration to the VMs in a MIG, seeUpdating instances in a MIG.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `InstanceGroupManager`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroupManager` | path | string | yes | The name of the instance group manager. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroupManagers.updatePerInstanceConfigs`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroupManagers/{instanceGroupManager}/updatePerInstanceConfigs`
- Inserts or updates per-instance configurations for the managed instance group. perInstanceConfig.name serves as a key used to distinguish whether to perform insert or patch.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupManagerUpdateInstanceConfigReq`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request, should conform to RFC1035. |
| `instanceGroupManager` | path | string | yes | The name of the managed instance group. It should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroups.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroups/{instanceGroup}`
- Returns the specified instance group resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstanceGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroup` | path | string | yes | Name of the instance group resource to return. |

### `compute.regionInstanceGroups.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroups`
- Retrieves the list of instance group resources contained within the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionInstanceGroupList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstanceGroups.listInstances`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroups/{instanceGroup}/listInstances`
- Lists the instances in the specified instance group and displays information about the named ports. Depending on the specified options, this method can list all instances or only the instances that are running. The orderBy query parameter is not supported.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `RegionInstanceGroupsListInstancesRequest`; Response: `RegionInstanceGroupsListInstances`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroup` | path | string | yes | Name of the regional instance group for which we want to list the instances. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstanceGroups.setNamedPorts`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroups/{instanceGroup}/setNamedPorts`
- Sets the named ports for the specified regional instance group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionInstanceGroupsSetNamedPortsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `instanceGroup` | path | string | yes | The name of the regional instance group where the named ports are updated. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceGroups.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceGroups/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionInstanceTemplates.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceTemplates/{instanceTemplate}`
- Deletes the specified instance template. Deleting an instance template is permanent and cannot be undone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `instanceTemplate` | path | string | yes | The name of the instance template to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceTemplates.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceTemplates/{instanceTemplate}`
- Returns the specified instance template.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstanceTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `instanceTemplate` | path | string | yes | The name of the instance template. |

### `compute.regionInstanceTemplates.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceTemplates`
- Creates an instance template in the specified project and region using the global instance template whose URL is included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `InstanceTemplate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstanceTemplates.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instanceTemplates`
- Retrieves a list of instance templates that are contained within the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstanceTemplateList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the regions for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstances.bulkInsert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instances/bulkInsert`
- Creates multiple instances in a given region. Count specifies the number of instances to create.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `BulkInsertInstanceResource`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstantSnapshotGroups.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshotGroups/{instantSnapshotGroup}`
- deletes a Regional InstantSnapshotGroup resource
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `instantSnapshotGroup` | path | string | yes | Name of the InstantSnapshotGroup resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstantSnapshotGroups.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshotGroups/{instantSnapshotGroup}`
- returns the specified InstantSnapshotGroup resource in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstantSnapshotGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `instantSnapshotGroup` | path | string | yes | Name of the InstantSnapshotGroup resource to return. |

### `compute.regionInstantSnapshotGroups.getIamPolicy`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshotGroups/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.regionInstantSnapshotGroups.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshotGroups`
- creates a Regional InstantSnapshotGroup resource
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `InstantSnapshotGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `sourceConsistencyGroup` | query | string | no | begin_interface: MixerMutationRequestBuilder |

### `compute.regionInstantSnapshotGroups.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshotGroups`
- retrieves the list of InstantSnapshotGroup resources contained within the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ListInstantSnapshotGroups`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstantSnapshotGroups.setIamPolicy`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshotGroups/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionInstantSnapshotGroups.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshotGroups/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionInstantSnapshots.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots/{instantSnapshot}`
- Deletes the specified InstantSnapshot resource. Keep in mind that deleting a single instantSnapshot might not necessarily delete all the data on that instantSnapshot. If any data on the instantSnapshot that is marked for deletion is needed for subsequent instantSnapshots, the data will be moved to the next corresponding instantSnapshot. For more information, seeDeleting instantSnapshots.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `instantSnapshot` | path | string | yes | Name of the InstantSnapshot resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstantSnapshots.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots/{instantSnapshot}`
- Returns the specified InstantSnapshot resource in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstantSnapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `instantSnapshot` | path | string | yes | Name of the InstantSnapshot resource to return. |

### `compute.regionInstantSnapshots.getIamPolicy`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.regionInstantSnapshots.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots`
- Creates an instant snapshot in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `InstantSnapshot`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstantSnapshots.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots`
- Retrieves the list of InstantSnapshot resources contained within the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `InstantSnapshotList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionInstantSnapshots.setIamPolicy`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionInstantSnapshots.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots/{resource}/setLabels`
- Sets the labels on a instantSnapshot in the given region. To learn more about labels, read the Labeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionInstantSnapshots.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/instantSnapshots/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionMultiMigMembers.get`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/multiMigs/{multiMig}/multiMigMembers/{multiMigMember}`
- Retrieves information about the specified multi-MIG member.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `MultiMigMember`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. Region name should conform to RFC1035. |
| `multiMig` | path | string | yes | The name of the multi-MIG. Name should conform to RFC1035 or be a resource ID. |
| `multiMigMember` | path | string | yes | The name of the multi-MIG member. Name should conform to RFC1035 or be a resource ID. |

### `compute.regionMultiMigMembers.list`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/multiMigs/{multiMig}/multiMigMembers`
- Retrieves a list of members of a specific multi-MIG.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `MultiMigMemberList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. Region name should conform to RFC1035. |
| `multiMig` | path | string | yes | The name of the multi-MIG. Name should conform to RFC1035 or be a resource ID. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnPartialSuccess` | query | boolean | no | Opt-in for partial success behavior which provides partial results in case of failure. The default value is false. For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code. |

### `compute.regionMultiMigs.delete`

- Versions: beta, alpha
- `DELETE https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/multiMigs/{multiMig}`
- Deletes a multi-MIG in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `multiMig` | path | string | yes | Name of the multi-MIG to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionMultiMigs.get`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/multiMigs/{multiMig}`
- Returns all the details of a specific multi-MIG.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `MultiMig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `multiMig` | path | string | yes | Name of the multi-MIG resource to return. |

### `compute.regionMultiMigs.insert`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/multiMigs`
- Creates a multi-MIG in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `MultiMig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents you from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionMultiMigs.list`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/multiMigs`
- Retrieves a list of multi-MIGs in a project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `MultiMigsList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnPartialSuccess` | query | boolean | no | Opt-in for partial success behavior which provides partial results in case of failure. The default value is false. For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code. |

### `compute.regionNetworkEndpointGroups.attachNetworkEndpoints`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}/attachNetworkEndpoints`
- Attach a list of network endpoints to the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionNetworkEndpointGroupsAttachEndpointsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region where you want to create the network endpoint group. It should comply with RFC1035. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group where you are attaching network endpoints to. It should comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkEndpointGroups.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}`
- Deletes the specified network endpoint group. Note that the NEG cannot be deleted if it is configured as a backend of a backend service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region where the network endpoint group is located. It should comply with RFC1035. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group to delete. It should comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkEndpointGroups.detachNetworkEndpoints`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}/detachNetworkEndpoints`
- Detach the network endpoint from the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionNetworkEndpointGroupsDetachEndpointsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region where the network endpoint group is located. It should comply with RFC1035. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group you are detaching network endpoints from. It should comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). end_interface: MixerMutationRequestBuilder |

### `compute.regionNetworkEndpointGroups.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}`
- Returns the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkEndpointGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region where the network endpoint group is located. It should comply with RFC1035. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group. It should comply with RFC1035. |

### `compute.regionNetworkEndpointGroups.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/networkEndpointGroups`
- Creates a network endpoint group in the specified project using the parameters that are included in the request. Note: Use the following APIs to manage network endpoint groups: - To manage NEGs with zonal scope (such as zonal NEGs, hybrid connectivity NEGs): zonal API - To manage NEGs with regional scope (such as regional internet NEGs, serverless NEGs, Private Service Connect NEGs): regional API - To manage NEGs with global scope (such as global internet NEGs):global API
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NetworkEndpointGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region where you want to create the network endpoint group. It should comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkEndpointGroups.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/networkEndpointGroups`
- Retrieves the list of regional network endpoint groups available to the specified project in the given region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkEndpointGroupList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of theregion where the network endpoint group is located. It should comply with RFC1035. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionNetworkEndpointGroups.listNetworkEndpoints`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}/listNetworkEndpoints`
- Lists the network endpoints in the specified network endpoint group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkEndpointGroupsListNetworkEndpoints`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of theregion where the network endpoint group is located. It should comply with RFC1035. |
| `networkEndpointGroup` | path | string | yes | The name of the network endpoint group from which you want to generate a list of included network endpoints. It should comply with RFC1035. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionNetworkFirewallPolicies.addAssociation`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/addAssociation`
- Inserts an association for the specified network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `associatedPolicyToBeReplaced` | query | string | no | Name of the firewall policy associated with the target network to swap association with. This field is mutually exclusive with 'replace_existing_association'. |
| `replaceExistingAssociation` | query | boolean | no | Indicates whether or not to replace it if an association already exists. This is false by default, in which case an error will be returned if an association already exists. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.addRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/addRule`
- Inserts a rule into a network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `maxPriority` | query | integer (int32) | no | When rule.priority is not specified, auto choose a unused priority betweenminPriority and maxPriority>. This field is exclusive with rule.priority. |
| `minPriority` | query | integer (int32) | no | When rule.priority is not specified, auto choose a unused priority betweenminPriority and maxPriority>. This field is exclusive with rule.priority. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.cloneRules`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/cloneRules`
- Copies rules to the specified network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `sourceFirewallPolicy` | query | string | no | The firewall policy from which to copy rules. |

### `compute.regionNetworkFirewallPolicies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}`
- Deletes the specified network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}`
- Returns the specified network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to get. |

### `compute.regionNetworkFirewallPolicies.getAssociation`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/getAssociation`
- Gets an association with the specified name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicyAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to which the queried association belongs. |
| `name` | query | string | no | The name of the association to get from the firewall policy. |

### `compute.regionNetworkFirewallPolicies.getEffectiveFirewalls`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/getEffectiveFirewalls`
- Returns the effective firewalls on a given network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionNetworkFirewallPoliciesGetEffectiveFirewallsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `network` | query | string | yes | Network reference |

### `compute.regionNetworkFirewallPolicies.getIamPolicy`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.regionNetworkFirewallPolicies.getRule`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/getRule`
- Gets a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicyRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to which the queried rule belongs. |
| `priority` | query | integer (int32) | no | The priority of the rule to get from the firewall policy. |

### `compute.regionNetworkFirewallPolicies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies`
- Creates a new network firewall policy in the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies`
- Lists all the network firewall policies that have been configured for the specified project in the given region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `FirewallPolicyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionNetworkFirewallPolicies.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}`
- Patches the specified network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.patchAssociation`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/patchAssociation`
- Updates an association for the specified network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.patchRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/patchRule`
- Patches a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `FirewallPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.removeAssociation`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/removeAssociation`
- Removes an association for the specified network firewall policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `name` | query | string | no | Name for the association that will be removed. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.removeRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{firewallPolicy}/removeRule`
- Deletes a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `firewallPolicy` | path | string | yes | Name of the firewall policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to remove from the firewall policy. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkFirewallPolicies.setIamPolicy`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionNetworkFirewallPolicies.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/firewallPolicies/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionNetworkPolicies.addAssociation`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/addAssociation`
- Inserts an association for the specified network policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NetworkPolicyAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkPolicies.addTrafficClassificationRule`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/addTrafficClassificationRule`
- Inserts a rule into a network policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NetworkPolicyTrafficClassificationRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkPolicies.aggregatedList`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/aggregated/networkPolicies`
- Retrieves an aggregated list of network policies. To prevent failure, it's recommended that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkPolicyAggregatedList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnPartialSuccess` | query | boolean | no | Opt-in for partial success behavior which provides partial results in case of failure. The default value is false. For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.regionNetworkPolicies.delete`

- Versions: beta, alpha
- `DELETE https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}`
- Deletes the specified policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkPolicies.get`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}`
- Returns the specified network policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to return. |

### `compute.regionNetworkPolicies.getAssociation`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/getAssociation`
- Gets an association with the specified name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkPolicyAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy to which the queried association belongs. |
| `name` | query | string | no | The name of the association to get from the network policy. |

### `compute.regionNetworkPolicies.getTrafficClassificationRule`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/getTrafficClassificationRule`
- Gets a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkPolicyTrafficClassificationRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy to which the queried rule belongs. |
| `priority` | query | integer (int32) | no | The priority of the rule to get from the network policy. |

### `compute.regionNetworkPolicies.insert`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies`
- Creates a new policy in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NetworkPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkPolicies.list`

- Versions: beta, alpha
- `GET https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies`
- Lists all the policies that have been configured for the specified project in the given region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NetworkPolicyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnPartialSuccess` | query | boolean | no | Opt-in for partial success behavior which provides partial results in case of failure. The default value is false. For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code. |

### `compute.regionNetworkPolicies.patch`

- Versions: beta, alpha
- `PATCH https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}`
- Patches the specified policy with the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NetworkPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkPolicies.patchTrafficClassificationRule`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/patchTrafficClassificationRule`
- Patches a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NetworkPolicyTrafficClassificationRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to update. |
| `priority` | query | integer (int32) | no | The priority of the traffic classification rule to patch. Only rules with a priority value between 1 and 2147482647 (inclusive) can be patched. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNetworkPolicies.removeAssociation`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/removeAssociation`
- Removes an association for the specified network policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to update. |
| `name` | query | string | no | Name for the association that will be removed. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### Example request skeleton

Generated from the Discovery entry of `compute.regionHealthSources.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/healthSources"
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14). Resources on this page: regionHealthSources, regionInstanceGroupManagerResizeRequests, regionInstanceGroupManagers, regionInstanceGroups, regionInstanceTemplates, regionInstances, regionInstantSnapshotGroups, regionInstantSnapshots, regionMultiMigMembers, regionMultiMigs, regionNetworkEndpointGroups, regionNetworkFirewallPolicies, regionNetworkPolicies.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/compute/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `compute.regionInstanceGroupManagers.setAutoHealingPolicies`. Avoid them in new code.
- Regional endpoints: the Discovery document (`compute` v1, revision 20261106) also lists 43 endpoints of the form `https://compute.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://compute.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://compute.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
