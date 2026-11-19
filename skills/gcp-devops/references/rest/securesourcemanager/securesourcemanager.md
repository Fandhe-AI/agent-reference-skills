---
source: https://securesourcemanager.googleapis.com/$discovery/rest?version=v1
---

# Secure Source Manager API REST API (securesourcemanager)

## Signature / Usage

Base URL: `https://securesourcemanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `securesourcemanager.projects.locations.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `securesourcemanager.projects.locations.instances.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/instances`
- Creates a new instance in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `instanceId` | query | string | yes | Required. ID of the instance to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `securesourcemanager.projects.locations.instances.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- Deletes a single instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `securesourcemanager.projects.locations.instances.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets details of a single instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `securesourcemanager.projects.locations.instances.getIamPolicy`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `securesourcemanager.projects.locations.instances.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/instances`
- Lists Instances in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListInstancesRequest. |
| `filter` | query | string | no | Filter for filtering results. |
| `orderBy` | query | string | no | Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.instances.setIamPolicy`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `securesourcemanager.projects.locations.instances.testIamPermissions`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `securesourcemanager.projects.locations.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. A list of extra location types that should be used as conditions for controlling the visibility of the locations. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `securesourcemanager.projects.locations.operations.cancel`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `securesourcemanager.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `securesourcemanager.projects.locations.operations.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `securesourcemanager.projects.locations.operations.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |

### `securesourcemanager.projects.locations.repositories.branchRules.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/branchRules`
- CreateBranchRule creates a branch rule in a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BranchRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `branchRuleId` | query | string | no | — |

### `securesourcemanager.projects.locations.repositories.branchRules.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- DeleteBranchRule deletes a branch rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | — |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the branch rule is not found, the request will succeed but no action will be taken on the server. |

### `securesourcemanager.projects.locations.repositories.branchRules.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- GetBranchRule gets a branch rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BranchRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the repository to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}`. |

### `securesourcemanager.projects.locations.repositories.branchRules.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/branchRules`
- ListBranchRules lists branch rules in a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBranchRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | — |
| `pageSize` | query | integer (int32) | no | — |
| `pageToken` | query | string | no | — |

### `securesourcemanager.projects.locations.repositories.branchRules.patch`

- Versions: v1
- `PATCH https://securesourcemanager.googleapis.com/v1/{+name}`
- UpdateBranchRule updates a branch rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BranchRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Optional. A unique identifier for a BranchRule. The name should be of the format: `projects/{project}/locations/{location}/repositories/{repository}/branchRules/{branch_rule}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the branchRule resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "\*" means full replacement. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not actually post it. (https://google.aip.dev/163, for declarative friendly) |

### `securesourcemanager.projects.locations.repositories.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/repositories`
- Creates a new repository in a given project and location. The Repository.Instance field is required in the request body for requests using the securesourcemanager.googleapis.com endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Repository`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project in which to create the repository. Values are of the form `projects/{project_number}/locations/{location_id}` |
| `repositoryId` | query | string | yes | Required. The ID to use for the repository, which will become the final component of the repository's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. |

### `securesourcemanager.projects.locations.repositories.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- Deletes a Repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the repository to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the repository is not found, the request will succeed but no action will be taken on the server. |

### `securesourcemanager.projects.locations.repositories.fetchBlob`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+repository}:fetchBlob`
- Fetches a blob from a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchBlobResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. Specifies the repository containing the blob. |
| `sha` | query | string | yes | Required. The SHA-1 hash of the blob to retrieve. |

### `securesourcemanager.projects.locations.repositories.fetchTree`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+repository}:fetchTree`
- Fetches a tree from a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchTreeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. Specifies the repository to fetch the tree from. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, at most 10,000 items will be returned. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |
| `recursive` | query | boolean | no | Optional. If true, include all subfolders and their files in the response. If false, only the immediate children are returned. |
| `ref` | query | string | no | Optional. `ref` can be a SHA-1 hash, a branch name, or a tag. Specifies which tree to fetch. If not specified, the default branch will be used. |

### `securesourcemanager.projects.locations.repositories.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets metadata of a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Repository`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the repository to retrieve. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}`. |

### `securesourcemanager.projects.locations.repositories.getIamPolicy`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+resource}:getIamPolicy`
- Get IAM policy for a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `securesourcemanager.projects.locations.repositories.hooks.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/hooks`
- Creates a new hook in a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Hook`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the hook. Values are of the form `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` |
| `hookId` | query | string | yes | Required. The ID to use for the hook, which will become the final component of the hook's resource name. This value restricts to lower-case letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `securesourcemanager.projects.locations.repositories.hooks.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- Deletes a Hook.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the hook to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}`. |

### `securesourcemanager.projects.locations.repositories.hooks.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets metadata of a hook.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Hook`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the hook to retrieve. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}`. |

### `securesourcemanager.projects.locations.repositories.hooks.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/hooks`
- Lists hooks in a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListHooksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListHooksRequest. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.repositories.hooks.patch`

- Versions: v1
- `PATCH https://securesourcemanager.googleapis.com/v1/{+name}`
- Updates the metadata of a hook.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Hook`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A unique identifier for a Hook. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}/hooks/{hook_id}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the hook resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "\*" means full replacement. |

### `securesourcemanager.projects.locations.repositories.issues.close`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+name}:close`
- Closes an issue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloseIssueRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the issue to close. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}`. |

### `securesourcemanager.projects.locations.repositories.issues.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/issues`
- Creates an issue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Issue`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the issue. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` |

### `securesourcemanager.projects.locations.repositories.issues.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- Deletes an issue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the issue to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}`. |
| `etag` | query | string | no | Optional. The current etag of the issue. If the etag is provided and does not match the current etag of the issue, deletion will be blocked and an ABORTED error will be returned. |

### `securesourcemanager.projects.locations.repositories.issues.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets an issue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Issue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the issue to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}`. |

### `securesourcemanager.projects.locations.repositories.issues.issueComments.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/issueComments`
- Creates an issue comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `IssueComment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The issue in which to create the issue comment. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}` |

### `securesourcemanager.projects.locations.repositories.issues.issueComments.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- Deletes an issue comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the issue comment to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}/issueComments/{comment_id}`. |

### `securesourcemanager.projects.locations.repositories.issues.issueComments.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets an issue comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `IssueComment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the issue comment to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}/issueComments/{comment_id}`. |

### `securesourcemanager.projects.locations.repositories.issues.issueComments.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/issueComments`
- Lists comments in an issue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListIssueCommentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The issue in which to list the comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}` |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.repositories.issues.issueComments.patch`

- Versions: v1
- `PATCH https://securesourcemanager.googleapis.com/v1/{+name}`
- Updates an issue comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `IssueComment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique identifier for an issue comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue}/issueComments/{comment_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the issue comment resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "\*" means full replacement. |

### `securesourcemanager.projects.locations.repositories.issues.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/issues`
- Lists issues in a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListIssuesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to list issues. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` |
| `filter` | query | string | no | Optional. Used to filter the resulting issues list. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.repositories.issues.open`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+name}:open`
- Opens an issue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OpenIssueRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the issue to open. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/issues/{issue_id}`. |

### `securesourcemanager.projects.locations.repositories.issues.patch`

- Versions: v1
- `PATCH https://securesourcemanager.googleapis.com/v1/{+name}`
- Updates a issue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Issue`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique identifier for an issue. The issue id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/issues/{issue_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the issue resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "\*" means full replacement. |

### `securesourcemanager.projects.locations.repositories.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/repositories`
- Lists Repositories in a given project and location. The instance field is required in the query parameter for requests using the securesourcemanager.googleapis.com endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRepositoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListRepositoriesRequest. |
| `filter` | query | string | no | Optional. Filter results. |
| `instance` | query | string | conditional | Optional. The name of the instance in which the repository is hosted, formatted as `projects/{project_number}/locations/{location_id}/instances/{instance_id}`. When listing repositories via securesourcemanager.googleapis.com, this field is required. When listing repositories via \*.sourcemanager.dev, this field is ignored. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.repositories.patch`

- Versions: v1
- `PATCH https://securesourcemanager.googleapis.com/v1/{+name}`
- Updates the metadata of a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Repository`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Optional. A unique identifier for a repository. The name should be of the format: `projects/{project}/locations/{location_id}/repositories/{repository_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the repository resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |
| `validateOnly` | query | boolean | no | Optional. False by default. If set to true, the request is validated and the user is provided with an expected result, but no actual change is made. |

### `securesourcemanager.projects.locations.repositories.pullRequests.close`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+name}:close`
- Closes a pull request without merging.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ClosePullRequestRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The pull request to close. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |

### `securesourcemanager.projects.locations.repositories.pullRequests.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/pullRequests`
- Creates a pull request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PullRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository that the pull request is created from. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` |

### `securesourcemanager.projects.locations.repositories.pullRequests.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets a pull request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PullRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the pull request to retrieve. The format is `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request}`. |

### `securesourcemanager.projects.locations.repositories.pullRequests.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/pullRequests`
- Lists pull requests in a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPullRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to list pull requests. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}` |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.repositories.pullRequests.listFileDiffs`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}:listFileDiffs`
- Lists a pull request's file diffs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPullRequestFileDiffsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The pull request to list file diffs for. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.repositories.pullRequests.merge`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+name}:merge`
- Merges a pull request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MergePullRequestRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The pull request to merge. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |

### `securesourcemanager.projects.locations.repositories.pullRequests.open`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+name}:open`
- Opens a pull request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OpenPullRequestRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The pull request to open. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |

### `securesourcemanager.projects.locations.repositories.pullRequests.patch`

- Versions: v1
- `PATCH https://securesourcemanager.googleapis.com/v1/{+name}`
- Updates a pull request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PullRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. A unique identifier for a PullRequest. The number appended at the end is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the pull request resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. The special value "\*" means full replacement. |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.batchCreate`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/pullRequestComments:batchCreate`
- Batch creates pull request comments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreatePullRequestCommentsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The pull request in which to create the pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.create`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/pullRequestComments`
- Creates a pull request comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PullRequestComment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The pull request in which to create the pull request comment. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.delete`

- Versions: v1
- `DELETE https://securesourcemanager.googleapis.com/v1/{+name}`
- Deletes a pull request comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the pull request comment to delete. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}`. |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.get`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+name}`
- Gets a pull request comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PullRequestComment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the pull request comment to retrieve. The format is `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}/pullRequestComments/{comment_id}`. |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.list`

- Versions: v1
- `GET https://securesourcemanager.googleapis.com/v1/{+parent}/pullRequestComments`
- Lists pull request comments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPullRequestCommentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The pull request in which to list pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. If unspecified, at most 100 pull request comments will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.patch`

- Versions: v1
- `PATCH https://securesourcemanager.googleapis.com/v1/{+name}`
- Updates a pull request comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PullRequestComment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique identifier for the pull request comment. The comment id is generated by the server. Format: `projects/{project}/locations/{location}/repositories/{repository}/pullRequests/{pull_request}/pullRequestComments/{comment_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the pull request comment resource by the update. Updatable fields are `body`. |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.resolve`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/pullRequestComments:resolve`
- Resolves pull request comments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResolvePullRequestCommentsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The pull request in which to resolve the pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |

### `securesourcemanager.projects.locations.repositories.pullRequests.pullRequestComments.unresolve`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+parent}/pullRequestComments:unresolve`
- Unresolves pull request comment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UnresolvePullRequestCommentsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The pull request in which to resolve the pull request comments. Format: `projects/{project_number}/locations/{location_id}/repositories/{repository_id}/pullRequests/{pull_request_id}` |

### `securesourcemanager.projects.locations.repositories.setIamPolicy`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+resource}:setIamPolicy`
- Set IAM policy on a repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `securesourcemanager.projects.locations.repositories.testIamPermissions`

- Versions: v1
- `POST https://securesourcemanager.googleapis.com/v1/{+resource}:testIamPermissions`
- Test IAM permissions on a repository. IAM permission checks are not required on this method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `securesourcemanager.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://securesourcemanager.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `securesourcemanager` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Path variables described as "Optional" in the Discovery document are still required by the route shown, so they are `yes` in the Required column: `name` in `securesourcemanager.projects.locations.repositories.branchRules.patch`, `name` in `securesourcemanager.projects.locations.repositories.patch`. The description refers to the field in the request message; the Discovery document defines no URL without that segment. Where a sibling method covers an alternative parent (another resource's method listed separately), call that method's route instead.
- Regional endpoints: the Discovery document (`securesourcemanager` v1, revision 0) also lists 9 endpoints of the form `https://securesourcemanager.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-east1`, `asia-northeast1`, `asia-northeast3`, `australia-southeast1`, `europe-west4`, `me-central2`, `me-west1`, `northamerica-northeast1`, `us-central1`. The method URLs above use the global host `https://securesourcemanager.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://securesourcemanager.asia-east1.rep.googleapis.com/`) and keep the path.
- Source: https://securesourcemanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
