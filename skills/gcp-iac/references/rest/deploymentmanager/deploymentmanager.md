---
source: https://deploymentmanager.googleapis.com/$discovery/rest?version=v2
---

# Cloud Deployment Manager V2 API REST API (deploymentmanager)

## Signature / Usage

Base URL: `https://deploymentmanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `deploymentmanager.compositeTypes.delete`

- Versions: v2beta, alpha
- `DELETE https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/compositeTypes/{compositeType}`
- Deletes a composite type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `compositeType` | path | string | yes | The name of the type for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.compositeTypes.get`

- Versions: v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/compositeTypes/{compositeType}`
- Gets information about a specific composite type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `CompositeType`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `compositeType` | path | string | yes | The name of the composite type for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.compositeTypes.insert`

- Versions: v2beta, alpha
- `POST https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/compositeTypes`
- Creates a composite type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `CompositeType`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.compositeTypes.list`

- Versions: v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/compositeTypes`
- Lists all composite types for Deployment Manager.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `CompositeTypesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `deploymentmanager.compositeTypes.patch`

- Versions: v2beta, alpha
- `PATCH https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/compositeTypes/{compositeType}`
- Patches a composite type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `CompositeType`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `compositeType` | path | string | yes | The name of the composite type for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.compositeTypes.update`

- Versions: v2beta, alpha
- `PUT https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/compositeTypes/{compositeType}`
- Updates a composite type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `CompositeType`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `compositeType` | path | string | yes | The name of the composite type for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.deployments.cancelPreview`

- Versions: v2, v2beta, alpha
- `POST https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}/cancelPreview`
- Cancels and removes the preview currently associated with the deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `DeploymentsCancelPreviewRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |

### `deploymentmanager.deployments.delete`

- Versions: v2, v2beta, alpha
- `DELETE https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}`
- Deletes a deployment and all of the resources in the deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `deletePolicy` | query | string enum | no | Sets the policy to use for deleting resources. Values: `DELETE`, `ABANDON`. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.deployments.get`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}`
- Gets information about a specific deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `Deployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.deployments.getIamPolicy`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{resource}/getIamPolicy`
- Gets the access control policy for a resource. May be empty if no such policy or resource exists.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |
| `optionsRequestedPolicyVersion` | query | integer (int32) | no | Requested IAM Policy version. |

### `deploymentmanager.deployments.insert`

- Versions: v2, v2beta, alpha
- `POST https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments`
- Creates a deployment and all of the resources described by the deployment manifest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `Deployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `createPolicy` | query | string enum | no | Sets the policy to use for creating new resources. Values: `CREATE_OR_ACQUIRE`, `ACQUIRE`. |
| `header.bypassBillingFilter` | query | boolean | no | — |
| `preview` | query | boolean | no | If set to true, creates a deployment and creates "shell" resources but does not actually instantiate these resources. This allows you to preview what your deployment looks like. After previewing a deployment, you can deploy your resources by making a request with the `update()` method or you can use the `cancelPreview()` method to cancel the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it. |

### `deploymentmanager.deployments.list`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments`
- Lists all deployments for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `DeploymentsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `deploymentmanager.deployments.patch`

- Versions: v2, v2beta, alpha
- `PATCH https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}`
- Patches a deployment and all of the resources described by the deployment manifest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `Deployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `createPolicy` | query | string enum | no | Sets the policy to use for creating new resources. Values: `CREATE_OR_ACQUIRE`, `ACQUIRE`. |
| `deletePolicy` | query | string enum | no | Sets the policy to use for deleting resources. Values: `DELETE`, `ABANDON`. |
| `header.bypassBillingFilter` | query | boolean | no | — |
| `preview` | query | boolean | no | If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it. |

### `deploymentmanager.deployments.setIamPolicy`

- Versions: v2, v2beta, alpha
- `POST https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{resource}/setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `GlobalSetPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |

### `deploymentmanager.deployments.stop`

- Versions: v2, v2beta, alpha
- `POST https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}/stop`
- Stops an ongoing operation. This does not roll back any work that has already been completed, but prevents any new work from being started.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `DeploymentsStopRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |

### `deploymentmanager.deployments.testIamPermissions`

- Versions: v2, v2beta, alpha
- `POST https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{resource}/testIamPermissions`
- Returns permissions that a caller has on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `TestPermissionsRequest`; Response: `TestPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Project ID for this request. |
| `resource` | path | string | yes | Name or id of the resource for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.deployments.update`

- Versions: v2, v2beta, alpha
- `PUT https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}`
- Updates a deployment and all of the resources described by the deployment manifest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `Deployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `createPolicy` | query | string enum | no | Sets the policy to use for creating new resources. Values: `CREATE_OR_ACQUIRE`, `ACQUIRE`. |
| `deletePolicy` | query | string enum | no | Sets the policy to use for deleting resources. Values: `DELETE`, `ABANDON`. |
| `header.bypassBillingFilter` | query | boolean | no | — |
| `preview` | query | boolean | no | If set to true, updates the deployment and creates and updates the "shell" resources but does not actually alter or instantiate these resources. This allows you to preview what your deployment will look like. You can use this intent to preview how an update would affect your deployment. You must provide a `target.config` with a configuration if this is set to true. After previewing a deployment, you can deploy your resources by making a request with the `update()` or you can `cancelPreview()` to remove the preview altogether. Note that the deployment will still exist after you cancel the preview and you must separately delete this deployment if you want to remove it. |

### `deploymentmanager.manifests.get`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}/manifests/{manifest}`
- Gets information about a specific manifest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `Manifest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `manifest` | path | string | yes | The name of the manifest for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.manifests.list`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}/manifests`
- Lists all manifests for a given deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `ManifestsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `deploymentmanager.operations.get`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/operations/{operation}`
- Gets information about a specific operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `operation` | path | string | yes | The name of the operation for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.operations.list`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/operations`
- Lists all operations for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `OperationsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `deploymentmanager.resources.get`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}/resources/{resource}`
- Gets information about a single resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `Resource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `resource` | path | string | yes | The name of the resource for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.resources.list`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/deployments/{deployment}/resources`
- Lists all resources in a given deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `ResourcesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `deployment` | path | string | yes | The name of the deployment for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `deploymentmanager.typeProviders.delete`

- Versions: v2beta, alpha
- `DELETE https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders/{typeProvider}`
- Deletes a type provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `typeProvider` | path | string | yes | The name of the type provider for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.typeProviders.get`

- Versions: v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders/{typeProvider}`
- Gets information about a specific type provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `TypeProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `typeProvider` | path | string | yes | The name of the type provider for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.typeProviders.getType`

- Versions: v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders/{typeProvider}/types/{type}`
- Gets a type info for a type provided by a TypeProvider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `TypeInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `typeProvider` | path | string | yes | The name of the type provider for this request. |
| `type` | path | string | yes | The name of the type provider type for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.typeProviders.insert`

- Versions: v2beta, alpha
- `POST https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders`
- Creates a type provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `TypeProvider`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.typeProviders.list`

- Versions: v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders`
- Lists all resource type providers for Deployment Manager.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `TypeProvidersListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `deploymentmanager.typeProviders.listTypes`

- Versions: v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders/{typeProvider}/types`
- Lists all the type info for a TypeProvider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `TypeProvidersListTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `typeProvider` | path | string | yes | The name of the type provider for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### `deploymentmanager.typeProviders.patch`

- Versions: v2beta, alpha
- `PATCH https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders/{typeProvider}`
- Patches a type provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `TypeProvider`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `typeProvider` | path | string | yes | The name of the type provider for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.typeProviders.update`

- Versions: v2beta, alpha
- `PUT https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/typeProviders/{typeProvider}`
- Updates a type provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.cloudman`
- Request: `TypeProvider`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `typeProvider` | path | string | yes | The name of the type provider for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.types.get`

- Versions: alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/alpha/projects/{project}/global/types/{type}`
- Gets information about a specific type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `Type`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `type` | path | string | yes | The name of the type for this request. |
| `header.bypassBillingFilter` | query | boolean | no | — |

### `deploymentmanager.types.list`

- Versions: v2, v2beta, alpha
- `GET https://deploymentmanager.googleapis.com/deploymentmanager/v2/projects/{project}/global/types`
- Lists all resource types for Deployment Manager.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.cloudman`, `https://www.googleapis.com/auth/ndev.cloudman.readonly`
- Request: —; Response: `TypesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | The project ID for this request. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request. If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`. The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use: labels.owner:\* You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels. To filter on multiple expressions, provide each separate expression within parentheses. For example: (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example: (cpuPlatform = "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND (scheduling.automaticRestart = true) If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples: `fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field. For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`. You cannot combine constraints on multiple fields using regular expressions. |
| `maxResults` | query | integer (uint32) | no | The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`) |
| `orderBy` | query | string | no | Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name. You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first. Currently, only sorting by `name` or `creationTimestamp desc` is supported. |
| `pageToken` | query | string | no | Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results. |

### Example request skeleton

Generated from the Discovery entry of `deploymentmanager.compositeTypes.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://deploymentmanager.googleapis.com/deploymentmanager/v2beta/projects/{project}/global/compositeTypes/{compositeType}"
```

## Notes

- Generated from the Discovery document(s) v2, v2beta, alpha of `deploymentmanager` (retrieved 2026-11-14). Resources on this page: compositeTypes, deployments, manifests, operations, resources, typeProviders, types.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/deploymentmanager/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026.", "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down. All related APIs and functions will no longer be supported." and "As of June 30, 2026, new users are blocked from enabling Google Cloud Deployment Manager V2 API or creating their first deployment."; it recommends Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19). The methods are still in the Discovery documents.
- Source: https://deploymentmanager.googleapis.com/$discovery/rest?version=v2, https://deploymentmanager.googleapis.com/$discovery/rest?version=v2beta, https://deploymentmanager.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
