---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API REST API (compute) (part 12/12)

## Signature / Usage

Base URL: `https://compute.googleapis.com/compute/v1`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `compute.targetVpnGateways.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetVpnGateways`
- Retrieves a list of target VPN gateways available to the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `TargetVpnGatewayList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.targetVpnGateways.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetVpnGateways/{resource}/setLabels`
- Sets the labels on a TargetVpnGateway. To learn more about labels, read theLabeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.targetVpnGateways.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/targetVpnGateways/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.urlMaps.aggregatedList`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/urlMaps`
- Retrieves the list of all UrlMap resources, regional and global, available to the specified project. To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `UrlMapsAggregatedList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Name of the project scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.urlMaps.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps/{urlMap}`
- Deletes the specified UrlMap resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.urlMaps.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps/{urlMap}`
- Returns the specified UrlMap resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `UrlMap`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to return. |

### `compute.urlMaps.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps`
- Creates a UrlMap resource in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.urlMaps.invalidateCache`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps/{urlMap}/invalidateCache`
- Initiates a cache invalidation operation, invalidating the specified path, scoped to the specified UrlMap. For more information, see Invalidating cached content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `CacheInvalidationRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `urlMap` | path | string | yes | Name of the UrlMap scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.urlMaps.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps`
- Retrieves the list of UrlMap resources available to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `UrlMapList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.urlMaps.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps/{urlMap}`
- Patches the specified UrlMap resource with the data included in the request. This method supportsPATCH semantics and uses theJSON merge patch format and processing rules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.urlMaps.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.urlMaps.update`

- Versions: v1, preview, beta, alpha
- `PUT https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps/{urlMap}`
- Updates the specified UrlMap resource with the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.urlMaps.validate`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/urlMaps/{urlMap}/validate`
- Runs static validation for the UrlMap. In particular, the tests of the provided UrlMap will be run. Calling this method does NOT create the UrlMap.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMapsValidateRequest`; Response: `UrlMapsValidateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to be validated as. |

### `compute.vpnGateways.aggregatedList`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/vpnGateways`
- Retrieves an aggregated list of VPN gateways. To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VpnGatewayAggregatedList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.vpnGateways.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnGateways/{vpnGateway}`
- Deletes the specified VPN gateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `vpnGateway` | path | string | yes | Name of the VPN gateway to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.vpnGateways.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnGateways/{vpnGateway}`
- Returns the specified VPN gateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VpnGateway`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `vpnGateway` | path | string | yes | Name of the VPN gateway to return. |

### `compute.vpnGateways.getStatus`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnGateways/{vpnGateway}/getStatus`
- Returns the status for the specified VPN gateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VpnGatewaysGetStatusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `vpnGateway` | path | string | yes | Name of the VPN gateway to return. |

### `compute.vpnGateways.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnGateways`
- Creates a VPN gateway in the specified project and region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `VpnGateway`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.vpnGateways.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnGateways`
- Retrieves a list of VPN gateways available to the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VpnGatewayList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.vpnGateways.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnGateways/{resource}/setLabels`
- Sets the labels on a VpnGateway. To learn more about labels, read theLabeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.vpnGateways.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnGateways/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.vpnTunnels.aggregatedList`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/vpnTunnels`
- Retrieves an aggregated list of VPN tunnels. To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VpnTunnelAggregatedList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.vpnTunnels.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnTunnels/{vpnTunnel}`
- Deletes the specified VpnTunnel resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `vpnTunnel` | path | string | yes | Name of the VpnTunnel resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.vpnTunnels.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnTunnels/{vpnTunnel}`
- Returns the specified VpnTunnel resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VpnTunnel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `vpnTunnel` | path | string | yes | Name of the VpnTunnel resource to return. |

### `compute.vpnTunnels.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnTunnels`
- Creates a VpnTunnel resource in the specified project and region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `VpnTunnel`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.vpnTunnels.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnTunnels`
- Retrieves a list of VpnTunnel resources contained in the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VpnTunnelList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.vpnTunnels.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/vpnTunnels/{resource}/setLabels`
- Sets the labels on a VpnTunnel. To learn more about labels, read theLabeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.vpnTunnels.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/vpnTunnels/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.wireGroups.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups/{wireGroup}`
- Deletes the specified wire group in the given scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `crossSiteNetwork` | path | string | yes | — |
| `wireGroup` | path | string | yes | Name of the wire group resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). end_interface: MixerMutationRequestBuilder |

### `compute.wireGroups.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups/{wireGroup}`
- Gets the specified wire group resource in the given scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `WireGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `crossSiteNetwork` | path | string | yes | — |
| `wireGroup` | path | string | yes | Name of the wire group resource to return. |

### `compute.wireGroups.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups`
- Creates a wire group in the specified project in the given scope using the parameters that are included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `WireGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `crossSiteNetwork` | path | string | yes | — |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). end_interface: MixerMutationRequestBuilder |
| `validateOnly` | query | boolean | no | \[Input Only\] Validate the new configuration, but don't create it. |

### `compute.wireGroups.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups`
- Lists the wire groups for a project in the given scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `WireGroupList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `crossSiteNetwork` | path | string | yes | — |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.wireGroups.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups/{wireGroup}`
- Updates the specified wire group resource with the data included in the request. This method supportsPATCH semantics and usesJSON merge patch format and processing rules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `WireGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `crossSiteNetwork` | path | string | yes | — |
| `wireGroup` | path | string | yes | Name of the WireGroups resource to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). end_interface: MixerMutationRequestBuilder |
| `updateMask` | query | string (google-fieldmask) | no | update_mask indicates fields to be updated as part of this request. |
| `validateOnly` | query | boolean | no | \[Input Only\] Validate the new configuration, but don't update it. |

### `compute.zoneFolderOperations.get`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/operations/{operation}`
- Retrieves the specified Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return. |

### `compute.zoneFolderOperations.list`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+folder}/zones/{zone}/operations`
- Retrieves a list of Operation resources contained within the specified folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `OperationList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Folder ID for this request. |
| `zone` | path | string | yes | Name of the zone for request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.zoneOperations.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/operations/{operation}`
- Deletes the specified zone-specific Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `operation` | path | string | yes | Name of the Operations resource to delete, or its unique numeric identifier. |

### `compute.zoneOperations.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/operations/{operation}`
- Retrieves the specified zone-specific Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return, or its unique numeric identifier. |

### `compute.zoneOperations.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/operations`
- Retrieves a list of Operation resources contained within the specified zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `OperationList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.zoneOperations.wait`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/operations/{operation}/wait`
- Waits for the specified Operation resource to return as `DONE` or for the request to approach the 2 minute deadline, and retrieves the specified Operation resource. This method waits for no more than the 2 minutes and then returns the current state of the operation, which might be `DONE` or still in progress. This method is called on a best-effort basis. Specifically: - In uncommon cases, when the server is overloaded, the request might return before the default deadline is reached, or might return after zero seconds. - If the default deadline is reached, there is no guarantee that the operation is actually done when the method returns. Be prepared to retry if the operation is not `DONE`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return, or its unique numeric identifier. |

### `compute.zoneOrganizationOperations.get`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+organization}/zones/{zone}/operations/{operation}`
- Retrieves the specified Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `organization` | path | string | yes | Organization ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return. Parent is derived from this field. |

### `compute.zoneOrganizationOperations.list`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/{+organization}/zones/{zone}/operations`
- Retrieves a list of Operation resources contained within the specified organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `OperationList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `organization` | path | string | yes | Organization ID for this request. |
| `zone` | path | string | yes | Name of the zone for request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.zoneQueuedResources.aggregatedList`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/aggregated/queuedResources`
- Retrieves an aggregated list of all of the queued resources in a project across all zones. To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `QueuedResourcesAggregatedList`

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

### `compute.zoneQueuedResources.cancel`

- Versions: alpha
- `POST https://compute.googleapis.com/compute/alpha/projects/{project}/zones/{zone}/queuedResources/{queuedResource}/cancel`
- Cancels a QueuedResource. Only a resource in ACCEPTED state may be cancelled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `queuedResource` | path | string | yes | Name of the QueuedResource to cancel. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.zoneQueuedResources.delete`

- Versions: alpha
- `DELETE https://compute.googleapis.com/compute/alpha/projects/{project}/zones/{zone}/queuedResources/{queuedResource}`
- Deletes a QueuedResource. For a QueuedResource in ACCEPTED state, call cancel on the resource before deleting, to make sure no VMs have been provisioned and may require cleaning up. For a QueuedResource in PROVISIONING state the request to delete is registered for execution following the provisioning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `queuedResource` | path | string | yes | Name of the QueuedResource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.zoneQueuedResources.get`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/zones/{zone}/queuedResources/{queuedResource}`
- Returns the specified QueuedResource resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `QueuedResource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `queuedResource` | path | string | yes | Name of the QueuedResource resource to return. |

### `compute.zoneQueuedResources.insert`

- Versions: alpha
- `POST https://compute.googleapis.com/compute/alpha/projects/{project}/zones/{zone}/queuedResources`
- Creates a QueuedResource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `QueuedResource`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.zoneQueuedResources.list`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/zones/{zone}/queuedResources`
- Retrieves the list of QueuedResource resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `QueuedResourceList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnPartialSuccess` | query | boolean | no | Opt-in for partial success behavior which provides partial results in case of failure. The default value is false. For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code. |

### `compute.zoneVmExtensionPolicies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}`
- Deletes a specified zone VM extension policy within a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `vmExtensionPolicy` | path | string | yes | Name of the zone VM extension policy to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.zoneVmExtensionPolicies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}`
- Retrieves details of a specific zone VM extension policy within a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VmExtensionPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `vmExtensionPolicy` | path | string | yes | Name of the VM extension policy resource to return. |

### `compute.zoneVmExtensionPolicies.getVmExtension`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/vmExtensions/{extensionName}`
- Retrieves details of a specific VM extension within a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VmExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `extensionName` | path | string | yes | Required. Name of the VM extension for this request. |

### `compute.zoneVmExtensionPolicies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/vmExtensionPolicies`
- Creates a new zone-level VM extension policy within a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `VmExtensionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.zoneVmExtensionPolicies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/vmExtensionPolicies`
- Lists all VM extension policies within a specific zone for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `VmExtensionPolicyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.zoneVmExtensionPolicies.listVmExtensions`

- Versions: preview, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/vmExtensions`
- Lists all VM extensions within a specific zone for a project. This is a read-only API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ListVmExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.zoneVmExtensionPolicies.update`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}`
- Modifies an existing zone VM extension policy within a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `VmExtensionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. |
| `vmExtensionPolicy` | path | string | yes | Name of the zone VM extension policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.zones.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}`
- Returns the specified Zone resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Zone`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone resource to return. |

### `compute.zones.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones`
- Retrieves the list of Zone resources available to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ZoneList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### Example request skeleton

Generated from the Discovery entry of `compute.targetVpnGateways.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetVpnGateways"
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14). Resources on this page: targetVpnGateways, urlMaps, vpnGateways, vpnTunnels, wireGroups, zoneFolderOperations, zoneOperations, zoneOrganizationOperations, zoneQueuedResources, zoneVmExtensionPolicies, zones.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/compute/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`compute` v1, revision 20261106) also lists 43 endpoints of the form `https://compute.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://compute.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://compute.africa-south1.rep.googleapis.com/`) and keep the path.
- Methods whose `Versions` line starts with `preview` are not in the `v1` or `beta` Discovery documents; their URL comes from the `compute` `preview` Discovery document, whose base URL is `https://compute.googleapis.com/compute/v1/` (`servicePath: compute/v1/`, revision 20261106), so the `/compute/v1/` path is the one that document gives. It does not mean the method is in the `v1` API version. For the `alpha` version, the base URL is `https://compute.googleapis.com/compute/alpha/`.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
