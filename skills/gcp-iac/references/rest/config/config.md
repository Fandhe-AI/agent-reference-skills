---
source: https://config.googleapis.com/$discovery/rest?version=v1
---

# Infrastructure Manager API REST API (config)

## Signature / Usage

Base URL: `https://config.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `config.projects.locations.deploymentGroups.create`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+parent}/deploymentGroups`
- Creates a DeploymentGroup The newly created DeploymentGroup will be in the `CREATING` state and can be retrieved via Get and List calls.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeploymentGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the Deployment Group is created. The parent value is in the format: 'projects/{project_id}/locations/{location}' |
| `deploymentGroupId` | query | string | yes | Required. The deployment group ID. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `config.projects.locations.deploymentGroups.delete`

- Versions: v1
- `DELETE https://config.googleapis.com/v1/{+name}`
- Deletes a DeploymentGroup
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of DeploymentGroup in the format projects/{project_id}/locations/{location_id}/deploymentGroups/{deploymentGroup} |
| `deploymentReferencePolicy` | query | string enum | no | Optional. Policy on how to handle referenced deployments when deleting the DeploymentGroup. If unspecified, the default behavior is to fail the deletion if any deployments currently referenced in the `deployment_units` of the DeploymentGroup or in the latest revision are not deleted. Values: `DEPLOYMENT_REFERENCE_POLICY_UNSPECIFIED`, `FAIL_IF_ANY_REFERENCES_EXIST`, `FAIL_IF_METADATA_REFERENCES_EXIST`, `IGNORE_DEPLOYMENT_REFERENCES`. |
| `force` | query | boolean | no | Optional. If set to true, any revisions for this deployment group will also be deleted. (Otherwise, the request will only work if the deployment group has no revisions.) |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `config.projects.locations.deploymentGroups.deprovision`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+name}:deprovision`
- Deprovisions a deployment group. NOTE: As a first step of this operation, Infra Manager will automatically delete any Deployments that were part of the \*last successful\* DeploymentGroupRevision but are \*no longer\* included in the \*current\* DeploymentGroup definition (e.g., following an `UpdateDeploymentGroup` call), along with their actuated resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeprovisionDeploymentGroupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment group to deprovision. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}'. |

### `config.projects.locations.deploymentGroups.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Get a DeploymentGroup for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DeploymentGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment group to retrieve. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}'. |

### `config.projects.locations.deploymentGroups.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/deploymentGroups`
- List DeploymentGroups for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDeploymentGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of deployment groups. Format: 'projects/{project_id}/locations/{location}'. |
| `filter` | query | string | no | Optional. Lists the DeploymentGroups that match the filter expression. A filter expression filters the deployment groups listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deploymentGroups/bar" - Filter by labels: - Resources that have a key called 'foo' labels.foo:\* - Resources that have a key called 'foo' whose value is 'bar' labels.foo = bar - Filter by state: - DeploymentGroups in CREATING state. state=CREATING |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to 'ListDeploymentGroups' which specifies the position in the list from where to continue listing the deployment groups. |

### `config.projects.locations.deploymentGroups.patch`

- Versions: v1
- `PATCH https://config.googleapis.com/v1/{+name}`
- Updates a DeploymentGroup
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeploymentGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the deployment group. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}'. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask used to specify the fields to be overwritten in the Deployment Group resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `config.projects.locations.deploymentGroups.provision`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+name}:provision`
- Provisions a deployment group. NOTE: As a first step of this operation, Infra Manager will automatically delete any Deployments that were part of the \*last successful\* DeploymentGroupRevision but are \*no longer\* included in the \*current\* DeploymentGroup definition (e.g., following an `UpdateDeploymentGroup` call), along with their actuated resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProvisionDeploymentGroupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment group to provision. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}'. |

### `config.projects.locations.deploymentGroups.revisions.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets details about a DeploymentGroupRevision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DeploymentGroupRevision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment group revision to retrieve. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}/revisions/{revision}'. |

### `config.projects.locations.deploymentGroups.revisions.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/revisions`
- Lists DeploymentGroupRevisions in a given DeploymentGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDeploymentGroupRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of deployment group revisions. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}'. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, a sensible default will be used by the server. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to 'ListDeploymentGroupRevisions' which specifies the position in the list from where to continue listing the deployment group revisions. All other parameters provided to `ListDeploymentGroupRevisions` must match the call that provided the page token. |

### `config.projects.locations.deployments.create`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+parent}/deployments`
- Creates a Deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Deployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the Deployment is created. The parent value is in the format: 'projects/{project_id}/locations/{location}'. |
| `deploymentId` | query | string | yes | Required. The Deployment ID. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `config.projects.locations.deployments.delete`

- Versions: v1
- `DELETE https://config.googleapis.com/v1/{+name}`
- Deletes a Deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |
| `deletePolicy` | query | string enum | no | Optional. Policy on how resources actuated by the deployment should be deleted. If unspecified, the default behavior is to delete the underlying resources. Values: `DELETE_POLICY_UNSPECIFIED`, `DELETE`, `ABANDON`. |
| `force` | query | boolean | no | Optional. If set to true, any revisions for this deployment will also be deleted. (Otherwise, the request will only work if the deployment has no revisions.) |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `config.projects.locations.deployments.deleteState`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+name}:deleteState`
- Deletes Terraform state file in a given deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeleteStatefileRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |

### `config.projects.locations.deployments.exportLock`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}:exportLock`
- Exports the lock info on a locked deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LockInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |

### `config.projects.locations.deployments.exportState`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+parent}:exportState`
- Exports Terraform state file from a given deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportDeploymentStatefileRequest`; Response: `Statefile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the statefile is listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |

### `config.projects.locations.deployments.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets details about a Deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Deployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment. Format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |

### `config.projects.locations.deployments.getIamPolicy`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `config.projects.locations.deployments.importState`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+parent}:importState`
- Imports Terraform state file in a given deployment. The state file does not take effect until the Deployment has been unlocked.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportStatefileRequest`; Response: `Statefile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the statefile is listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |

### `config.projects.locations.deployments.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/deployments`
- Lists Deployments in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the Deployments are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}'. |
| `filter` | query | string | no | Lists the Deployments that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/bar - Filter by labels: - Resources that have a key called 'foo' labels.foo:\* - Resources that have a key called 'foo' whose value is 'bar' labels.foo = bar - Filter by state: - Deployments in CREATING state. state=CREATING |
| `orderBy` | query | string | no | Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Token returned by previous call to 'ListDeployments' which specifies the position in the list from where to continue listing the resources. |

### `config.projects.locations.deployments.lock`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+name}:lock`
- Locks a deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LockDeploymentRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |

### `config.projects.locations.deployments.patch`

- Versions: v1
- `PATCH https://config.googleapis.com/v1/{+name}`
- Updates a Deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Deployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask used to specify the fields to be overwritten in the Deployment resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `config.projects.locations.deployments.revisions.exportState`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+parent}:exportState`
- Exports Terraform state file from a given revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportRevisionStatefileRequest`; Response: `Statefile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the statefile is listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}'. |

### `config.projects.locations.deployments.revisions.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets details about a Revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Revision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Revision in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}'. |

### `config.projects.locations.deployments.revisions.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/revisions`
- Lists Revisions of a deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the Revisions are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |
| `filter` | query | string | no | Lists the Revisions that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/dep/revisions/bar - Filter by labels: - Resources that have a key called 'foo' labels.foo:\* - Resources that have a key called 'foo' whose value is 'bar' labels.foo = bar - Filter by state: - Revisions in CREATING state. state=CREATING |
| `orderBy` | query | string | no | Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | When requesting a page of resources, `page_size` specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Token returned by previous call to 'ListRevisions' which specifies the position in the list from where to continue listing the resources. |

### `config.projects.locations.deployments.revisions.resources.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets details about a Resource deployed by Infra Manager.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Resource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Resource in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}/resource/{resource}'. |

### `config.projects.locations.deployments.revisions.resources.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/resources`
- Lists Resources in a given revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the Resources are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}/revisions/{revision}'. |
| `filter` | query | string | no | Lists the Resources that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/dep/revisions/bar/resources/baz |
| `orderBy` | query | string | no | Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Token returned by previous call to 'ListResources' which specifies the position in the list from where to continue listing the resources. |

### `config.projects.locations.deployments.setIamPolicy`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `config.projects.locations.deployments.testIamPermissions`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `config.projects.locations.deployments.unlock`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+name}:unlock`
- Unlocks a locked deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UnlockDeploymentRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment in the format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |

### `config.projects.locations.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `config.projects.locations.getAutoMigrationConfig`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Get the AutoMigrationConfig for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AutoMigrationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the AutoMigrationConfig. Format: 'projects/{project_id}/locations/{location}/AutoMigrationConfig'. |

### `config.projects.locations.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}/locations`
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

### `config.projects.locations.operations.cancel`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `config.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://config.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `config.projects.locations.operations.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `config.projects.locations.operations.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}/operations`
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

### `config.projects.locations.previews.create`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+parent}/previews`
- Creates a Preview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Preview`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the Preview is created. The parent value is in the format: 'projects/{project_id}/locations/{location}'. |
| `previewId` | query | string | no | Optional. The preview ID. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `config.projects.locations.previews.delete`

- Versions: v1
- `DELETE https://config.googleapis.com/v1/{+name}`
- Deletes a Preview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Preview in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `config.projects.locations.previews.export`

- Versions: v1
- `POST https://config.googleapis.com/v1/{+parent}:export`
- Export Preview results.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportPreviewResultRequest`; Response: `ExportPreviewResultResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The preview whose results should be exported. The preview value is in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. |

### `config.projects.locations.previews.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets details about a Preview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Preview`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the preview. Format: 'projects/{project_id}/locations/{location}/previews/{preview}'. |

### `config.projects.locations.previews.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/previews`
- Lists Previews in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPreviewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the Previews are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}'. |
| `filter` | query | string | no | Optional. Lists the Deployments that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/deployments/bar - Filter by labels: - Resources that have a key called 'foo' labels.foo:\* - Resources that have a key called 'foo' whose value is 'bar' labels.foo = bar - Filter by state: - Deployments in CREATING state. state=CREATING |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a page of resources, 'page_size' specifies number of resources to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to 'ListDeployments' which specifies the position in the list from where to continue listing the resources. |

### `config.projects.locations.previews.resourceChanges.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Get a ResourceChange for a given preview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ResourceChange`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource change to retrieve. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceChanges/{resource_change}'. |

### `config.projects.locations.previews.resourceChanges.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/resourceChanges`
- Lists ResourceChanges for a given preview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListResourceChangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the ResourceChanges are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. |
| `filter` | query | string | no | Optional. Lists the resource changes that match the filter expression. A filter expression filters the resource changes listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/previews/dep/resourceChanges/baz |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a page of resource changes, 'page_size' specifies number of resource changes to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to 'ListResourceChanges' which specifies the position in the list from where to continue listing the resource changes. |

### `config.projects.locations.previews.resourceDrifts.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Get a ResourceDrift for a given preview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ResourceDrift`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource drift to retrieve. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceDrifts/{resource_drift}'. |

### `config.projects.locations.previews.resourceDrifts.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/resourceDrifts`
- List ResourceDrifts for a given preview.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListResourceDriftsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the ResourceDrifts are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}/previews/{preview}'. |
| `filter` | query | string | no | Optional. Lists the resource drifts that match the filter expression. A filter expression filters the resource drifts listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: - Filter by name: name = "projects/foo/locations/us-central1/previews/dep/resourceDrifts/baz |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a page of resource drifts, 'page_size' specifies number of resource drifts to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to 'ListResourceDrifts' which specifies the position in the list from where to continue listing the resource drifts. |

### `config.projects.locations.terraformVersions.get`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+name}`
- Gets details about a TerraformVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TerraformVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the TerraformVersion. Format: 'projects/{project_id}/locations/{location}/terraformVersions/{terraform_version}' |

### `config.projects.locations.terraformVersions.list`

- Versions: v1
- `GET https://config.googleapis.com/v1/{+parent}/terraformVersions`
- Lists TerraformVersions in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTerraformVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent in whose context the TerraformVersions are listed. The parent value is in the format: 'projects/{project_id}/locations/{location}'. |
| `filter` | query | string | no | Optional. Lists the TerraformVersions that match the filter expression. A filter expression filters the resources listed in the response. The expression must be of the form '{field} {operator} {value}' where operators: '<', '>', '<=', '>=', '!=', '=', ':' are supported (colon ':' represents a HAS operator which is roughly synonymous with equality). {field} can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. |
| `orderBy` | query | string | no | Optional. Field to use to sort the list. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a page of terraform versions, 'page_size' specifies number of terraform versions to return. If unspecified, at most 500 will be returned. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to 'ListTerraformVersions' which specifies the position in the list from where to continue listing the terraform versions. |

### `config.projects.locations.updateAutoMigrationConfig`

- Versions: v1
- `PATCH https://config.googleapis.com/v1/{+name}`
- Updates the AutoMigrationConfig for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AutoMigrationConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the AutoMigrationConfig. Format: 'projects/{project_id}/locations/{location}/AutoMigrationConfig'. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The update mask applies to the resource. See google.protobuf.FieldMask. |

### Example request skeleton

Generated from the Discovery entry of `config.projects.locations.deploymentGroups.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://config.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `config` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/config/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`config` v1, revision 20261016) also lists 11 endpoints of the form `https://config.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://config.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://config.us-central1.rep.googleapis.com/`) and keep the path.
- Source: https://config.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
