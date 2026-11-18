---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API REST API (compute) (part 9/12)

## Signature / Usage

Base URL: `https://compute.googleapis.com/compute/v1`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `compute.regionNetworkPolicies.removeTrafficClassificationRule`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkPolicies/{networkPolicy}/removeTrafficClassificationRule`
- Deletes a rule of the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region of this request. |
| `networkPolicy` | path | string | yes | Name of the network policy resource to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to remove from the network policy. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNotificationEndpoints.aggregatedList`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/notificationEndpoints`
- Retrieves the list of all NotificationEndpoint resources, regional and global, available to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NotificationEndpointAggregatedList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Name of the project scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `includeAllScopes` | query | boolean | no | Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `serviceProjectNumber` | query | string (int64) | no | The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api. |

### `compute.regionNotificationEndpoints.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/notificationEndpoints/{notificationEndpoint}`
- Deletes the specified NotificationEndpoint in the given region
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `notificationEndpoint` | path | string | yes | Name of the NotificationEndpoint resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNotificationEndpoints.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/notificationEndpoints/{notificationEndpoint}`
- Returns the specified NotificationEndpoint resource in the given region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NotificationEndpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `notificationEndpoint` | path | string | yes | Name of the NotificationEndpoint resource to return. |

### `compute.regionNotificationEndpoints.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/notificationEndpoints`
- Create a NotificationEndpoint in the specified project in the given region using the parameters that are included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `NotificationEndpoint`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionNotificationEndpoints.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/notificationEndpoints`
- Lists the NotificationEndpoints for a project in the given region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `NotificationEndpointList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionNotificationEndpoints.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/notificationEndpoints/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionOperations.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/operations/{operation}`
- Deletes the specified region-specific Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `operation` | path | string | yes | Name of the Operations resource to delete, or its unique numeric identifier. |

### `compute.regionOperations.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/operations/{operation}`
- Retrieves the specified region-specific Operations resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return, or its unique numeric identifier. |

### `compute.regionOperations.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/operations`
- Retrieves a list of Operation resources contained within the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `OperationList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionOperations.wait`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/operations/{operation}/wait`
- Waits for the specified Operation resource to return as `DONE` or for the request to approach the 2 minute deadline, and retrieves the specified Operation resource. This method differs from the `GET` method in that it waits for no more than the default deadline (2 minutes) and then returns the current state of the operation, which might be `DONE` or still in progress. This method is called on a best-effort basis. Specifically: - In uncommon cases, when the server is overloaded, the request might return before the default deadline is reached, or might return after zero seconds. - If the default deadline is reached, there is no guarantee that the operation is actually done when the method returns. Be prepared to retry if the operation is not `DONE`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `operation` | path | string | yes | Name of the Operations resource to return, or its unique numeric identifier. |

### `compute.regionRecoverableSnapshots.delete`

- Versions: alpha
- `DELETE https://compute.googleapis.com/compute/alpha/projects/{project}/regions/{region}/recoverableSnapshots/{recoverableSnapshot}`
- Deletes the specified RecoverableSnapshot. Deleting a recoverable snapshot will delete the underlying PD snapshot and is irreversible.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `recoverableSnapshot` | path | string | yes | Name of the recoverable Snapshot resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionRecoverableSnapshots.get`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/regions/{region}/recoverableSnapshots/{recoverableSnapshot}`
- Returns the specified RecoverableSnapshot resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RecoverableSnapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `recoverableSnapshot` | path | string | yes | Name of the Snapshot resource to return. |

### `compute.regionRecoverableSnapshots.getIamPolicy`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/regions/{region}/recoverableSnapshots/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.regionRecoverableSnapshots.list`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/regions/{region}/recoverableSnapshots`
- Retrieves the list of RecoverableSnapshot resources contained within the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RecoverableSnapshotList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnPartialSuccess` | query | boolean | no | Opt-in for partial success behavior which provides partial results in case of failure. The default value is false. For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code. |

### `compute.regionRecoverableSnapshots.recover`

- Versions: alpha
- `POST https://compute.googleapis.com/compute/alpha/projects/{project}/regions/{region}/recoverableSnapshots/{recoverableSnapshot}/recover`
- Recovers the specified RecoverableSnapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project Id of the request |
| `region` | path | string | yes | Name of the region for this request. |
| `recoverableSnapshot` | path | string | yes | Name of the recoverable resource to recover |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `snapshotName` | query | string | no | Optional. Name of the snapshot after the recovery The name will be 1-63 characters long, and comply withRFC1035. Specifically, the name will be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character will be a lowercase letter, and all following characters can be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `compute.regionRecoverableSnapshots.setIamPolicy`

- Versions: alpha
- `POST https://compute.googleapis.com/compute/alpha/projects/{project}/regions/{region}/recoverableSnapshots/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionRecoverableSnapshots.testIamPermissions`

- Versions: alpha
- `POST https://compute.googleapis.com/compute/alpha/projects/{project}/regions/{region}/recoverableSnapshots/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionSecurityPolicies.addRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/addRule`
- Inserts a rule into a security policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SecurityPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `securityPolicy` | path | string | yes | Name of the security policy to update. |
| `validateOnly` | query | boolean | no | If true, the request will not be committed. |

### `compute.regionSecurityPolicies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{securityPolicy}`
- Deletes the specified policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `securityPolicy` | path | string | yes | Name of the security policy to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSecurityPolicies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{securityPolicy}`
- List all of the ordered rules present in a single specified policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SecurityPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `securityPolicy` | path | string | yes | Name of the security policy to get. |

### `compute.regionSecurityPolicies.getRule`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/getRule`
- Gets a rule at the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SecurityPolicyRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `securityPolicy` | path | string | yes | Name of the security policy to which the queried rule belongs. |
| `priority` | query | integer (int32) | no | The priority of the rule to get from the security policy. |

### `compute.regionSecurityPolicies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies`
- Creates a new policy in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SecurityPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If true, the request will not be committed. |

### `compute.regionSecurityPolicies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies`
- List all the policies that have been configured for the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SecurityPolicyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionSecurityPolicies.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{securityPolicy}`
- Patches the specified policy with the data included in the request. To clear fields in the policy, leave the fields empty and specify them in the updateMask. This cannot be used to be update the rules in the policy. Please use the per rule methods like addRule, patchRule, and removeRule instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SecurityPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `securityPolicy` | path | string | yes | Name of the security policy to update. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Indicates fields to be cleared as part of this request. |

### `compute.regionSecurityPolicies.patchRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/patchRule`
- Patches a rule at the specified priority. To clear fields in the rule, leave the fields empty and specify them in the updateMask.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SecurityPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `securityPolicy` | path | string | yes | Name of the security policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to patch. |
| `updateMask` | query | string (google-fieldmask) | no | Indicates fields to be cleared as part of this request. |
| `validateOnly` | query | boolean | no | If true, the request will not be committed. |

### `compute.regionSecurityPolicies.removeRule`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{securityPolicy}/removeRule`
- Deletes a rule at the specified priority.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `securityPolicy` | path | string | yes | Name of the security policy to update. |
| `priority` | query | integer (int32) | no | The priority of the rule to remove from the security policy. |

### `compute.regionSecurityPolicies.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/securityPolicies/{resource}/setLabels`
- Sets the labels on a security policy. To learn more about labels, read the Labeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSnapshotSettings.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshotSettings`
- Get region snapshot settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SnapshotSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |

### `compute.regionSnapshotSettings.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshotSettings`
- Patch region snapshot settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SnapshotSettings`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | update_mask indicates fields to be updated as part of this request. |

### `compute.regionSnapshots.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots/{snapshot}`
- Deletes the specified Snapshot resource. Keep in mind that deleting a single snapshot might not necessarily delete all the data on that snapshot. If any data on the snapshot that is marked for deletion is needed for subsequent snapshots, the data will be moved to the next corresponding snapshot. For more information, seeDeleting snapshots.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `snapshot` | path | string | yes | Name of the snapshot resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSnapshots.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots/{snapshot}`
- Returns the specified Snapshot resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Snapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `snapshot` | path | string | yes | Name of the Snapshot resource to return. |

### `compute.regionSnapshots.getIamPolicy`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.regionSnapshots.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots`
- Creates a snapshot in the specified region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `Snapshot`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSnapshots.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots`
- Retrieves the list of Snapshot resources contained within the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SnapshotList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionSnapshots.setIamPolicy`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionSnapshots.setLabels`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots/{resource}/setLabels`
- Sets the labels on a regional snapshot. To learn more about labels, read the Labeling Resources documentation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetLabelsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSnapshots.testIamPermissions`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionSnapshots.updateKmsKey`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/snapshots/{snapshot}/updateKmsKey`
- Rotates the customer-managed encryption key to the latest version for the specified snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSnapshotUpdateKmsKeyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `snapshot` | path | string | yes | Name of the snapshot resource to update. Should conform to RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSslCertificates.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslCertificates/{sslCertificate}`
- Deletes the specified SslCertificate resource in the region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `sslCertificate` | path | string | yes | Name of the SslCertificate resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSslCertificates.fetchEncryptionKey`

- Versions: preview
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslCertificates/encryptionKey`
- Returns the public encryption key used to encrypt the TLS private key before upload.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SslCertificatesFetchEncryptionKeyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `name` | query | string | yes | Required. Name of the SslCertificate resource to be created. The name must be 1-63 characters long, and comply withRFC1035. |

### `compute.regionSslCertificates.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslCertificates/{sslCertificate}`
- Returns the specified SslCertificate resource in the specified region. Get a list of available SSL certificates by making a list() request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SslCertificate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `sslCertificate` | path | string | yes | Name of the SslCertificate resource to return. |

### `compute.regionSslCertificates.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslCertificates`
- Creates a SslCertificate resource in the specified project and region using the data included in the request
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SslCertificate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSslCertificates.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslCertificates`
- Retrieves the list of SslCertificate resources available to the specified project in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SslCertificateList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionSslCertificates.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/sslCertificates/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionSslPolicies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/{sslPolicy}`
- Deletes the specified SSL policy. The SSL policy resource can be deleted only if it is not in use by any TargetHttpsProxy or TargetSslProxy resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `sslPolicy` | path | string | yes | Name of the SSL policy to delete. The name must be 1-63 characters long, and comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSslPolicies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/{sslPolicy}`
- Lists all of the ordered rules present in a single specified policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SslPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `sslPolicy` | path | string | yes | Name of the SSL policy to update. The name must be 1-63 characters long, and comply with RFC1035. |

### `compute.regionSslPolicies.getIamPolicy`

- Versions: v1, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.regionSslPolicies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies`
- Creates a new policy in the specified project and region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SslPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSslPolicies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies`
- Lists all the SSL policies that have been configured for the specified project and region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SslPoliciesList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionSslPolicies.listAvailableFeatures`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/listAvailableFeatures`
- Lists all features that can be specified in the SSL policy when using custom profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `SslPoliciesListAvailableFeaturesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionSslPolicies.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/{sslPolicy}`
- Patches the specified SSL policy with the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `SslPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `sslPolicy` | path | string | yes | Name of the SSL policy to update. The name must be 1-63 characters long, and comply with RFC1035. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionSslPolicies.setIamPolicy`

- Versions: v1, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionSslPolicies.testIamPermissions`

- Versions: v1, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/sslPolicies/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionTargetHttpProxies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpProxies/{targetHttpProxy}`
- Deletes the specified TargetHttpProxy resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetHttpProxy` | path | string | yes | Name of the TargetHttpProxy resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpProxies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpProxies/{targetHttpProxy}`
- Returns the specified TargetHttpProxy resource in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `TargetHttpProxy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetHttpProxy` | path | string | yes | Name of the TargetHttpProxy resource to return. |

### `compute.regionTargetHttpProxies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpProxies`
- Creates a TargetHttpProxy resource in the specified project and region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `TargetHttpProxy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpProxies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpProxies`
- Retrieves the list of TargetHttpProxy resources available to the specified project in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `TargetHttpProxyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionTargetHttpProxies.setUrlMap`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpProxies/{targetHttpProxy}/setUrlMap`
- Changes the URL map for TargetHttpProxy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMapReference`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetHttpProxy` | path | string | yes | Name of the TargetHttpProxy to set a URL map for. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpProxies.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/targetHttpProxies/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionTargetHttpsProxies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}`
- Deletes the specified TargetHttpsProxy resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetHttpsProxy` | path | string | yes | Name of the TargetHttpsProxy resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpsProxies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}`
- Returns the specified TargetHttpsProxy resource in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `TargetHttpsProxy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetHttpsProxy` | path | string | yes | Name of the TargetHttpsProxy resource to return. |

### `compute.regionTargetHttpsProxies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpsProxies`
- Creates a TargetHttpsProxy resource in the specified project and region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `TargetHttpsProxy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpsProxies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpsProxies`
- Retrieves the list of TargetHttpsProxy resources available to the specified project in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `TargetHttpsProxyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionTargetHttpsProxies.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}`
- Patches the specified regional TargetHttpsProxy resource with the data included in the request. This method supports PATCH semantics and usesJSON merge patch format and processing rules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `TargetHttpsProxy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region for this request. |
| `targetHttpsProxy` | path | string | yes | Name of the TargetHttpsProxy resource to patch. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpsProxies.setSslCertificates`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}/setSslCertificates`
- Replaces SslCertificates for TargetHttpsProxy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionTargetHttpsProxiesSetSslCertificatesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetHttpsProxy` | path | string | yes | Name of the TargetHttpsProxy resource to set an SslCertificates resource for. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpsProxies.setUrlMap`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetHttpsProxies/{targetHttpsProxy}/setUrlMap`
- Changes the URL map for TargetHttpsProxy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMapReference`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetHttpsProxy` | path | string | yes | Name of the TargetHttpsProxy to set a URL map for. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetHttpsProxies.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/targetHttpsProxies/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionTargetTcpProxies.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetTcpProxies/{targetTcpProxy}`
- Deletes the specified TargetTcpProxy resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetTcpProxy` | path | string | yes | Name of the TargetTcpProxy resource to delete. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetTcpProxies.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetTcpProxies/{targetTcpProxy}`
- Returns the specified TargetTcpProxy resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `TargetTcpProxy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `targetTcpProxy` | path | string | yes | Name of the TargetTcpProxy resource to return. |

### `compute.regionTargetTcpProxies.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetTcpProxies`
- Creates a TargetTcpProxy resource in the specified project and region using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `TargetTcpProxy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.regionTargetTcpProxies.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/targetTcpProxies`
- Retrieves a list of TargetTcpProxy resources available to the specified project in a given region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `TargetTcpProxyList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionTargetTcpProxies.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/targetTcpProxies/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionUrlMaps.delete`

- Versions: v1, preview, beta, alpha
- `DELETE https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/urlMaps/{urlMap}`
- Deletes the specified UrlMap resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to delete. |
| `requestId` | query | string | no | begin_interface: MixerMutationRequestBuilder Request ID to support idempotency. |

### `compute.regionUrlMaps.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/urlMaps/{urlMap}`
- Returns the specified UrlMap resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `UrlMap`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to return. |

### `compute.regionUrlMaps.insert`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/urlMaps`
- Creates a UrlMap resource in the specified project using the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `requestId` | query | string | no | begin_interface: MixerMutationRequestBuilder Request ID to support idempotency. |

### `compute.regionUrlMaps.invalidateCache`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/urlMaps/{urlMap}/invalidateCache`
- Initiates a cache invalidation operation, invalidating the specified path, scoped to the specified UrlMap. For more information, see Invalidating cached content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `CacheInvalidationRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `urlMap` | path | string | yes | Name of the UrlMap scoping this request. |
| `requestId` | query | string | no | begin_interface: MixerMutationRequestBuilder Request ID to support idempotency. |

### `compute.regionUrlMaps.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/urlMaps`
- Retrieves the list of UrlMap resources available to the specified project in the specified region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `UrlMapList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regionUrlMaps.patch`

- Versions: v1, preview, beta, alpha
- `PATCH https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/urlMaps/{urlMap}`
- Patches the specified UrlMap resource with the data included in the request. This method supportsPATCH semantics and usesJSON merge patch format and processing rules.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to patch. |
| `requestId` | query | string | no | begin_interface: MixerMutationRequestBuilder Request ID to support idempotency. |

### `compute.regionUrlMaps.testIamPermissions`

- Versions: beta, alpha
- `POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/urlMaps/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | The name of the region for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.regionUrlMaps.update`

- Versions: v1, preview, beta, alpha
- `PUT https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/urlMaps/{urlMap}`
- Updates the specified UrlMap resource with the data included in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `UrlMap`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to update. |
| `requestId` | query | string | no | begin_interface: MixerMutationRequestBuilder Request ID to support idempotency. |

### `compute.regionUrlMaps.validate`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/urlMaps/{urlMap}/validate`
- Runs static validation for the UrlMap. In particular, the tests of the provided UrlMap will be run. Calling this method does NOT create the UrlMap.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `RegionUrlMapsValidateRequest`; Response: `UrlMapsValidateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region scoping this request. |
| `urlMap` | path | string | yes | Name of the UrlMap resource to be validated as. |

### `compute.regionZones.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/zones`
- Retrieves the list of Zone resources under the specific region available to the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ZoneList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Region for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.regions.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}`
- Returns the specified Region resource. To decrease latency for this method, you can optionally omit any unneeded information from the response by using a field mask. This practice is especially recommended for unused quota information (the `quotas` field). To exclude one or more fields, set your request's `fields` query parameter to only include the fields you need. For example, to only include the `id` and `selfLink` fields, add the query parameter `?fields=id,selfLink` to your request. This method fails if the quota information is unavailable for the region and if the organization policy constraint compute.requireBasicQuotaInResponse is enforced. This constraint, when enforced, disables the fail-open behaviour when quota information (the `items.quotas` field) is unavailable for the region. It is recommended to use the default setting for the constraint unless your application requires the fail-closed behaviour for this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Region`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `region` | path | string | yes | Name of the region resource to return. |

### `compute.regions.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/regions`
- Retrieves the list of region resources available to the specified project. To decrease latency for this method, you can optionally omit any unneeded information from the response by using a field mask. This practice is especially recommended for unused quota information (the `items.quotas` field). To exclude one or more fields, set your request's `fields` query parameter to only include the fields you need. For example, to only include the `id` and `selfLink` fields, add the query parameter `?fields=id,selfLink` to your request. This method fails if the quota information is unavailable for the region and if the organization policy constraint compute.requireBasicQuotaInResponse is enforced. This constraint, when enforced, disables the fail-open behaviour when quota information (the `items.quotas` field) is unavailable for the region. It is recommended to use the default setting for the constraint unless your application requires the fail-closed behaviour for this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `RegionList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.reliabilityRisks.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/reliabilityRisks/{reliabilityRisk}`
- Returns the specified ReliabilityRisk resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReliabilityRisk`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `reliabilityRisk` | path | string | yes | Name of the ReliabilityRisk resource to return. |

### `compute.reliabilityRisks.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/global/reliabilityRisks`
- Retrieves the list of reliabilityRisks available in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReliabilityRisksListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.reservationBlocks.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/reservations/{reservation}/reservationBlocks/{reservationBlock}`
- Retrieves information about the specified reservation block.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReservationBlocksGetResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `reservation` | path | string | yes | The name of the reservation. Name should conform to RFC1035 or be a resource ID. |
| `reservationBlock` | path | string | yes | The name of the reservation block. Name should conform to RFC1035 or be a resource ID. |
| `view` | query | string enum | no | View of the Block. Values: `BASIC`, `BLOCK_VIEW_UNSPECIFIED`, `FULL`. |

### `compute.reservationBlocks.getIamPolicy`

- Versions: v1, preview, beta
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/reservations/{parentResource}/reservationBlocks/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request. |
| `parentResource` | path | string | yes | Name or id of parent resource of the resource for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.reservationBlocks.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/reservations/{reservation}/reservationBlocks`
- Retrieves a list of reservation blocks under a single reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReservationBlocksListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `reservation` | path | string | yes | The name of the reservation. Name should conform to RFC1035 or be a resource ID. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.reservationBlocks.performMaintenance`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/reservations/{reservation}/reservationBlocks/{reservationBlock}/performMaintenance`
- Allows customers to perform maintenance on a reservation block
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ReservationsBlocksPerformMaintenanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `reservation` | path | string | yes | The name of the reservation. Name should conform to RFC1035 or be a resource ID. |
| `reservationBlock` | path | string | yes | The name of the reservation block. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.reservationBlocks.setIamPolicy`

- Versions: v1, preview, beta
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/reservations/{parentResource}/reservationBlocks/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ZoneSetNestedPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request. |
| `parentResource` | path | string | yes | Name or id of parent resource of the resource for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.reservationBlocks.testIamPermissions`

- Versions: v1, preview, beta
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/reservations/{parentResource}/reservationBlocks/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request. |
| `parentResource` | path | string | yes | Name or id of parent resource of the resource for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `compute.reservationConsumedInstances.list`

- Versions: alpha
- `GET https://compute.googleapis.com/compute/alpha/projects/{project}/zones/{zone}/{+reservation}/reservationConsumedInstances`
- Lists the instances consuming capacity from a specific reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReservationConsumedInstancesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Required. Project ID for this request. |
| `zone` | path | string | yes | Required. Zone name for this request. |
| `reservation` | path | string | yes | Required. The name of the reservation to list consumed instances for. In the format of reservations/{reservation_name} |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |
| `returnPartialSuccess` | query | boolean | no | Opt-in for partial success behavior which provides partial results in case of failure. The default value is false. For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code. |

### `compute.reservationSlots.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSlots/{reservationSlot}`
- Retrieves information about the specified reservation slot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReservationSlotsGetResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request, formatted as RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block, formatted as reservations/{reservation_name}/reservationBlocks/{reservation_block_name}/reservationSubBlocks/{reservation_sub_block_name} |
| `reservationSlot` | path | string | yes | The name of the reservation slot, formatted as RFC1035 or a resource ID number. |

### `compute.reservationSlots.getHealth`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSlots/{reservationSlot}/getHealth`
- Get health info on a reservation slot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation, parent block and parent sub-block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name}/reservationSubBlocks/{reservation_sub_block_name} |
| `reservationSlot` | path | string | yes | The name of the reservation slot. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. |

### `compute.reservationSlots.getVersion`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSlots/{reservationSlot}/getVersion`
- Allows customers to get SBOM versions of a reservation slot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ReservationSlotsGetVersionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name}/reservationSubBlocks/{reservation_sub_block_name} |
| `reservationSlot` | path | string | yes | The name of the reservation slot. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.reservationSlots.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSlots`
- Retrieves a list of reservation slots under a single reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReservationSlotsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request, formatted as RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block, formatted as reservations/{reservation_name}/reservationBlocks/{reservation_block_name}/reservationSubBlocks/{reservation_sub_block_name} |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.reservationSlots.update`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSlots/{reservationSlot}`
- Update a reservation slot in the specified sub-block.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ReservationSlot`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request, formatted as RFC1035. |
| `parentName` | path | string | yes | The name of the sub-block resource. |
| `reservationSlot` | path | string | yes | The name of the slot resource. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to be updated as part of this request. |

### `compute.reservationSubBlocks.get`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}`
- Retrieves information about the specified reservation subBlock.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReservationSubBlocksGetResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name} |
| `reservationSubBlock` | path | string | yes | The name of the reservation subBlock. Name should conform to RFC1035 or be a resource ID. |
| `view` | query | string enum | no | View of the subBlock. Values: `SUB_BLOCK_VIEW_BASIC`, `SUB_BLOCK_VIEW_FULL`, `SUB_BLOCK_VIEW_UNSPECIFIED`. |

### `compute.reservationSubBlocks.getIamPolicy`

- Versions: v1, preview, beta
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentResource}/reservationSubBlocks/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | The name of the zone for this request. |
| `parentResource` | path | string | yes | Name or id of parent resource of the resource for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `compute.reservationSubBlocks.getVersion`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/getVersion`
- Allows customers to get SBOM versions of a reservation subBlock.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ReservationSubBlocksGetVersionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name} |
| `reservationSubBlock` | path | string | yes | The name of the reservation subBlock. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.reservationSubBlocks.list`

- Versions: v1, preview, beta, alpha
- `GET https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks`
- Retrieves a list of reservation subBlocks under a single reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`, `https://www.googleapis.com/auth/compute.readonly`
- Request: —; Response: `ReservationSubBlocksListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name} |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based onresource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using GoogleRE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `compute.reservationSubBlocks.performMaintenance`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/performMaintenance`
- Allows customers to perform maintenance on a reservation subBlock
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name} |
| `reservationSubBlock` | path | string | yes | The name of the reservation subBlock. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `compute.reservationSubBlocks.reportFaulty`

- Versions: v1, preview, beta, alpha
- `POST https://compute.googleapis.com/compute/v1/projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/reportFaulty`
- Allows customers to report a faulty subBlock.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/compute`
- Request: `ReservationSubBlocksReportFaultyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `zone` | path | string | yes | Name of the zone for this request. Zone name should conform to RFC1035. |
| `parentName` | path | string | yes | The name of the parent reservation and parent block. In the format of reservations/{reservation_name}/reservationBlocks/{reservation_block_name} |
| `reservationSubBlock` | path | string | yes | The name of the reservation subBlock. Name should conform to RFC1035 or be a resource ID. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### Example request skeleton

Generated from the Discovery entry of `compute.regionNotificationEndpoints.aggregatedList` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://compute.googleapis.com/compute/v1/projects/{project}/aggregated/notificationEndpoints"
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14). Resources on this page: regionNetworkPolicies, regionNotificationEndpoints, regionOperations, regionRecoverableSnapshots, regionSecurityPolicies, regionSnapshotSettings, regionSnapshots, regionSslCertificates, regionSslPolicies, regionTargetHttpProxies, regionTargetHttpsProxies, regionTargetTcpProxies, regionUrlMaps, regionZones, regions, reliabilityRisks, reservationBlocks, reservationConsumedInstances, reservationSlots, reservationSubBlocks.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/compute/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`compute` v1, revision 20261106) also lists 43 endpoints of the form `https://compute.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://compute.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://compute.africa-south1.rep.googleapis.com/`) and keep the path.
- Methods whose `Versions` line starts with `preview` are not in the `v1` or `beta` Discovery documents; their URL comes from the `compute` `preview` Discovery document, whose base URL is `https://compute.googleapis.com/compute/v1/` (`servicePath: compute/v1/`, revision 20261106), so the `/compute/v1/` path is the one that document gives. It does not mean the method is in the `v1` API version. For the `alpha` version, the base URL is `https://compute.googleapis.com/compute/alpha/`.
- Corrected from the official docs (the Discovery text above is verbatim): `compute.sslPolicies.get` / `compute.regionSslPolicies.get` are described as "Lists all of the ordered rules present in a single specified policy."; they are `GET` requests that return the specified SSL policy resource (Response: `SslPolicy`).
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
