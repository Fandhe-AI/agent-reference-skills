---
source: https://dataform.googleapis.com/$discovery/rest?version=v1
---

# Dataform API REST API (dataform)

## Signature / Usage

Base URL: `https://dataform.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1). The URL, parameters and request / response types shown for a method come from the first version on its `Versions` line; for another version, see the Discovery document of that version under Source in Notes.

### `dataform.projects.locations.folders.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/folders`
- Creates a new Folder in a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Folder`; Response: `Folder`

### `dataform.projects.locations.folders.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a single Folder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.folders.deleteTree`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:deleteTree`
- Deletes a Folder with its contents (Folders, Repositories, Workspaces, ReleaseConfigs, and WorkflowConfigs).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeleteFolderTreeRequest`; Response: `Operation`

### `dataform.projects.locations.folders.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single Folder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Folder`

### `dataform.projects.locations.folders.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

### `dataform.projects.locations.folders.move`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:move`
- Moves a Folder to a new Folder, TeamFolder, or the root location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveFolderRequest`; Response: `Operation`

### `dataform.projects.locations.folders.patch`

- Versions: v1, v1beta1
- `PATCH https://dataform.googleapis.com/v1/{+name}`
- Updates a single Folder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Folder`; Response: `Folder`

### `dataform.projects.locations.folders.queryFolderContents`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+folder}:queryFolderContents`
- Returns the contents of a given Folder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryFolderContentsResponse`

### `dataform.projects.locations.folders.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `dataform.projects.locations.folders.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `dataform.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

### `dataform.projects.locations.getConfig`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Get default config for a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Config`

### `dataform.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- In the REST route above, `name` is a required path variable: set it to the project (`projects/{project}`, path pattern `^projects/[^/]+$`). The Discovery document defines no URL for the empty-`name` case in the description above.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

### `dataform.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

### `dataform.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

### `dataform.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

### `dataform.projects.locations.queryUserRootContents`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+location}:queryUserRootContents`
- Returns the contents of a caller's root folder in a given location. The root folder contains all resources that are created by the user and not contained in any other folder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryUserRootContentsResponse`

### `dataform.projects.locations.repositories.commit`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:commit`
- Applies a Git commit to a Repository. The Repository must not have a value for `git_remote_settings.url`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CommitRepositoryChangesRequest`; Response: `CommitRepositoryChangesResponse`

### `dataform.projects.locations.repositories.compilationResults.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/compilationResults`
- Creates a new CompilationResult in the parent `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CompilationResult`; Response: `CompilationResult`

### `dataform.projects.locations.repositories.compilationResults.createLongRunning`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/compilationResults:createLongRunning`
- Creates a new CompilationResult in the parent `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}` asynchronously. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CompilationResult`; Response: `Operation`

### `dataform.projects.locations.repositories.compilationResults.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single CompilationResult.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CompilationResult`

### `dataform.projects.locations.repositories.compilationResults.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+parent}/compilationResults`
- Lists CompilationResults in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCompilationResultsResponse`

### `dataform.projects.locations.repositories.compilationResults.query`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:query`
- Returns CompilationResultActions in a given CompilationResult.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryCompilationResultActionsResponse`

### `dataform.projects.locations.repositories.computeAccessTokenStatus`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:computeAccessTokenStatus`
- Computes a Repository's Git access token status.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ComputeRepositoryAccessTokenStatusResponse`

### `dataform.projects.locations.repositories.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/repositories`
- Creates a new Repository in a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Repository`; Response: `Repository`

### `dataform.projects.locations.repositories.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a single Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.repositories.deleteLongRunning`

- Versions: v1beta1
- `POST https://dataform.googleapis.com/v1beta1/{+name}:deleteLongRunning`
- Deletes a single repository asynchronously.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeleteRepositoryLongRunningRequest`; Response: `Operation`

### `dataform.projects.locations.repositories.fetchHistory`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:fetchHistory`
- Fetches a Repository's history of commits. The Repository must not have a value for `git_remote_settings.url`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchRepositoryHistoryResponse`

### `dataform.projects.locations.repositories.fetchRemoteBranches`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:fetchRemoteBranches`
- Fetches a Repository's remote branches.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchRemoteBranchesResponse`

### `dataform.projects.locations.repositories.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Repository`

### `dataform.projects.locations.repositories.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

### `dataform.projects.locations.repositories.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+parent}/repositories`
- Lists Repositories in a given project and location. \*\*Note:\*\* \*This method can return repositories not shown in the Dataform UI (https://console.cloud.google.com/bigquery/dataform)\*.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRepositoriesResponse`

### `dataform.projects.locations.repositories.move`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:move`
- Moves a Repository to a new location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveRepositoryRequest`; Response: `Operation`

### `dataform.projects.locations.repositories.patch`

- Versions: v1, v1beta1
- `PATCH https://dataform.googleapis.com/v1/{+name}`
- Updates a single Repository. \*\*Note:\*\* \*This method does not fully implement AIP/134 (https://google.aip.dev/134). The wildcard entry (\\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.\*
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Repository`; Response: `Repository`

### `dataform.projects.locations.repositories.queryDirectoryContents`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:queryDirectoryContents`
- Returns the contents of a given Repository directory. The Repository must not have a value for `git_remote_settings.url`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryRepositoryDirectoryContentsResponse`

### `dataform.projects.locations.repositories.readFile`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:readFile`
- Returns the contents of a file (inside a Repository). The Repository must not have a value for `git_remote_settings.url`.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ReadRepositoryFileResponse`

### `dataform.projects.locations.repositories.releaseConfigs.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/releaseConfigs`
- Creates a new ReleaseConfig in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReleaseConfig`; Response: `ReleaseConfig`

### `dataform.projects.locations.repositories.releaseConfigs.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a single ReleaseConfig.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.repositories.releaseConfigs.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single ReleaseConfig.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ReleaseConfig`

### `dataform.projects.locations.repositories.releaseConfigs.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+parent}/releaseConfigs`
- Lists ReleaseConfigs in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReleaseConfigsResponse`

### `dataform.projects.locations.repositories.releaseConfigs.patch`

- Versions: v1, v1beta1
- `PATCH https://dataform.googleapis.com/v1/{+name}`
- Updates a single ReleaseConfig. \*\*Note:\*\* \*This method does not fully implement AIP/134 (https://google.aip.dev/134). The wildcard entry (\\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.\*
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReleaseConfig`; Response: `ReleaseConfig`

### `dataform.projects.locations.repositories.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `dataform.projects.locations.repositories.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `dataform.projects.locations.repositories.workflowConfigs.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/workflowConfigs`
- Creates a new WorkflowConfig in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkflowConfig`; Response: `WorkflowConfig`

### `dataform.projects.locations.repositories.workflowConfigs.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a single WorkflowConfig.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.repositories.workflowConfigs.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single WorkflowConfig.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WorkflowConfig`

### `dataform.projects.locations.repositories.workflowConfigs.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+parent}/workflowConfigs`
- Lists WorkflowConfigs in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkflowConfigsResponse`

### `dataform.projects.locations.repositories.workflowConfigs.patch`

- Versions: v1, v1beta1
- `PATCH https://dataform.googleapis.com/v1/{+name}`
- Updates a single WorkflowConfig. \*\*Note:\*\* \*This method does not fully implement AIP/134 (https://google.aip.dev/134). The wildcard entry (\\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.\*
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkflowConfig`; Response: `WorkflowConfig`

### `dataform.projects.locations.repositories.workflowInvocations.cancel`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:cancel`
- Requests cancellation of a running WorkflowInvocation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelWorkflowInvocationRequest`; Response: `CancelWorkflowInvocationResponse`

### `dataform.projects.locations.repositories.workflowInvocations.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/workflowInvocations`
- Creates a new WorkflowInvocation in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkflowInvocation`; Response: `WorkflowInvocation`

### `dataform.projects.locations.repositories.workflowInvocations.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a single WorkflowInvocation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.repositories.workflowInvocations.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single WorkflowInvocation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WorkflowInvocation`

### `dataform.projects.locations.repositories.workflowInvocations.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+parent}/workflowInvocations`
- Lists WorkflowInvocations in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkflowInvocationsResponse`

### `dataform.projects.locations.repositories.workflowInvocations.query`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:query`
- Returns WorkflowInvocationActions in a given WorkflowInvocation.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryWorkflowInvocationActionsResponse`

### `dataform.projects.locations.repositories.workspaces.checkout`

- Versions: v1beta1
- `POST https://dataform.googleapis.com/v1beta1/{+name}:checkout`
- Checkout a branch in a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CheckoutWorkspaceBranchRequest`; Response: `Empty`

### `dataform.projects.locations.repositories.workspaces.commit`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:commit`
- Applies a Git commit for uncommitted files in a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CommitWorkspaceChangesRequest`; Response: `CommitWorkspaceChangesResponse`

### `dataform.projects.locations.repositories.workspaces.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/workspaces`
- Creates a new Workspace in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workspace`; Response: `Workspace`

### `dataform.projects.locations.repositories.workspaces.createLongRunning`

- Versions: v1beta1
- `POST https://dataform.googleapis.com/v1beta1/{+parent}/workspaces:createLongRunning`
- Creates a new Workspace in a given Repository asynchronously.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workspace`; Response: `Operation`

### `dataform.projects.locations.repositories.workspaces.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a single Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.repositories.workspaces.deleteBranch`

- Versions: v1beta1
- `POST https://dataform.googleapis.com/v1beta1/{+name}:deleteBranch`
- Deletes a branch in a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeleteBranchRequest`; Response: `DeleteBranchResponse`

### `dataform.projects.locations.repositories.workspaces.fetchBranches`

- Versions: v1beta1
- `GET https://dataform.googleapis.com/v1beta1/{+name}:fetchBranches`
- Fetches branches in a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchWorkspaceBranchesResponse`

### `dataform.projects.locations.repositories.workspaces.fetchCurrentBranch`

- Versions: v1beta1
- `GET https://dataform.googleapis.com/v1beta1/{+name}:fetchCurrentBranch`
- Fetches the current branch of a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchCurrentWorkspaceBranchResponse`

### `dataform.projects.locations.repositories.workspaces.fetchFileDiff`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+workspace}:fetchFileDiff`
- Fetches Git diff for an uncommitted file in a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchFileDiffResponse`

### `dataform.projects.locations.repositories.workspaces.fetchFileGitStatuses`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:fetchFileGitStatuses`
- Fetches Git statuses for the files in a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchFileGitStatusesResponse`

### `dataform.projects.locations.repositories.workspaces.fetchGitAheadBehind`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}:fetchGitAheadBehind`
- Fetches Git ahead/behind against a remote branch.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitAheadBehindResponse`

### `dataform.projects.locations.repositories.workspaces.fetchHistory`

- Versions: v1beta1
- `GET https://dataform.googleapis.com/v1beta1/{+name}:fetchHistory`
- Fetches a Workspace's history of commits.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchWorkspaceHistoryResponse`

### `dataform.projects.locations.repositories.workspaces.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Workspace`

### `dataform.projects.locations.repositories.workspaces.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

### `dataform.projects.locations.repositories.workspaces.installNpmPackages`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+workspace}:installNpmPackages`
- Installs dependency NPM packages (inside a Workspace).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `InstallNpmPackagesRequest`; Response: `InstallNpmPackagesResponse`

### `dataform.projects.locations.repositories.workspaces.list`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+parent}/workspaces`
- Lists Workspaces in a given Repository.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkspacesResponse`

### `dataform.projects.locations.repositories.workspaces.makeDirectory`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+workspace}:makeDirectory`
- Creates a directory inside a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MakeDirectoryRequest`; Response: `MakeDirectoryResponse`

### `dataform.projects.locations.repositories.workspaces.moveDirectory`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+workspace}:moveDirectory`
- Moves a directory (inside a Workspace), and all of its contents, to a new location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveDirectoryRequest`; Response: `MoveDirectoryResponse`

### `dataform.projects.locations.repositories.workspaces.moveFile`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+workspace}:moveFile`
- Moves a file (inside a Workspace) to a new location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveFileRequest`; Response: `MoveFileResponse`

### `dataform.projects.locations.repositories.workspaces.pull`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:pull`
- Pulls Git commits from the Repository's remote into a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `PullGitCommitsRequest`; Response: `PullGitCommitsResponse`

### `dataform.projects.locations.repositories.workspaces.push`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:push`
- Pushes Git commits from a Workspace to the Repository's remote.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `PushGitCommitsRequest`; Response: `PushGitCommitsResponse`

### `dataform.projects.locations.repositories.workspaces.queryDirectoryContents`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+workspace}:queryDirectoryContents`
- Returns the contents of a given Workspace directory.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryDirectoryContentsResponse`

### `dataform.projects.locations.repositories.workspaces.readFile`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+workspace}:readFile`
- Returns the contents of a file (inside a Workspace).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ReadFileResponse`

### `dataform.projects.locations.repositories.workspaces.removeDirectory`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+workspace}:removeDirectory`
- Deletes a directory (inside a Workspace) and all of its contents.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveDirectoryRequest`; Response: `RemoveDirectoryResponse`

### `dataform.projects.locations.repositories.workspaces.removeFile`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+workspace}:removeFile`
- Deletes a file (inside a Workspace).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveFileRequest`; Response: `RemoveFileResponse`

### `dataform.projects.locations.repositories.workspaces.reset`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:reset`
- Performs a Git reset for uncommitted files in a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetWorkspaceChangesRequest`; Response: `ResetWorkspaceChangesResponse`

### `dataform.projects.locations.repositories.workspaces.searchFiles`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+workspace}:searchFiles`
- Finds the contents of a given Workspace directory by filter.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchFilesResponse`

### `dataform.projects.locations.repositories.workspaces.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `dataform.projects.locations.repositories.workspaces.syncWorkspaceRefs`

- Versions: v1beta1
- `POST https://dataform.googleapis.com/v1beta1/{+name}:syncWorkspaceRefs`
- Syncs the refs of a Workspace.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SyncWorkspaceRefsRequest`; Response: `SyncWorkspaceRefsResponse`

### `dataform.projects.locations.repositories.workspaces.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `dataform.projects.locations.repositories.workspaces.writeFile`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+workspace}:writeFile`
- Writes to a file (inside a Workspace).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `WriteFileRequest`; Response: `WriteFileResponse`

### `dataform.projects.locations.teamFolders.create`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+parent}/teamFolders`
- Creates a new TeamFolder in a given project and location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TeamFolder`; Response: `TeamFolder`

### `dataform.projects.locations.teamFolders.delete`

- Versions: v1, v1beta1
- `DELETE https://dataform.googleapis.com/v1/{+name}`
- Deletes a single TeamFolder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `dataform.projects.locations.teamFolders.deleteTree`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+name}:deleteTree`
- Deletes a TeamFolder with its contents (Folders, Repositories, Workspaces, ReleaseConfigs, and WorkflowConfigs).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeleteTeamFolderTreeRequest`; Response: `Operation`

### `dataform.projects.locations.teamFolders.get`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+name}`
- Fetches a single TeamFolder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TeamFolder`

### `dataform.projects.locations.teamFolders.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

### `dataform.projects.locations.teamFolders.patch`

- Versions: v1, v1beta1
- `PATCH https://dataform.googleapis.com/v1/{+name}`
- Updates a single TeamFolder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TeamFolder`; Response: `TeamFolder`

### `dataform.projects.locations.teamFolders.queryContents`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+teamFolder}:queryContents`
- Returns the contents of a given TeamFolder.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryTeamFolderContentsResponse`

### `dataform.projects.locations.teamFolders.search`

- Versions: v1, v1beta1
- `GET https://dataform.googleapis.com/v1/{+location}/teamFolders:search`
- Returns all TeamFolders in a given location that the caller has access to and match the provided filter.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchTeamFoldersResponse`

### `dataform.projects.locations.teamFolders.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `dataform.projects.locations.teamFolders.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://dataform.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `dataform.projects.locations.updateConfig`

- Versions: v1, v1beta1
- `PATCH https://dataform.googleapis.com/v1/{+name}`
- Update default config for a given project and location. \*\*Note:\*\* \*This method does not fully implement AIP/134 (https://google.aip.dev/134). The wildcard entry (\\*) is treated as a bad request, and when the `field_mask` is omitted, the request is treated as a full update on all modifiable fields.\*
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Config`; Response: `Config`

### Example request line

Generated from the Discovery entry of `dataform.projects.locations.folders.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values). The request needs an OAuth 2.0 access token in an `Authorization: Bearer` header; the Google Cloud client libraries (the gcp-client-libraries skill) obtain and send it:

```http
GET https://dataform.googleapis.com/v1/{+name}
```

## Options / Props

### `dataform.projects.locations.folders.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location in which to create the Folder. Must be in the format `projects/*/locations/*`. |

### `dataform.projects.locations.folders.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Folder's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |

### `dataform.projects.locations.folders.deleteTree` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Folder's name. Format: projects/{project}/locations/{location}/folders/{folder} Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |

### `dataform.projects.locations.folders.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Folder's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |

### `dataform.projects.locations.folders.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |
| `options.requestedPolicyVersion` | query | integer (int32) | conditional | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataform.projects.locations.folders.move` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the Folder to move. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |

### `dataform.projects.locations.folders.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The Folder's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the fields to be updated in the Folder. If left unset, all fields that can be updated, will be updated. A few fields cannot be updated and will be ignored if specified in the update_mask (e.g. parent_name, team_folder_name). |

### `dataform.projects.locations.folders.queryFolderContents` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `folder` | path | string | yes | Required. Resource name of the Folder to list contents for. Format: projects/\*/locations/\*/folders/\* |
| `filter` | query | string | no | Optional. Optional filtering for the returned list. Filtering is currently only supported on the `display_name` field. Example: \* `display_name="MyFolder"` (the value of `filter`; URL-encode it in a query string) |
| `orderBy` | query | string | no | Optional. Field to additionally sort results by. Will order Folders before Repositories, and then by `order_by` in ascending order. Supported keywords: display_name (default), create_time, last_modified_time. Examples: \* `orderBy="display_name"` \* `orderBy="display_name desc"` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of paths to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `QueryFolderContents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryFolderContents`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.folders.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |

### `dataform.projects.locations.folders.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/folders/{foldersId}`. |

### `dataform.projects.locations.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}`. |

### `dataform.projects.locations.getConfig` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The config name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/config`. |

### `dataform.projects.locations.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. In the REST JSON response the field is `nextPageToken` (`ListLocationsResponse`); pass its value as `pageToken`. |

### `dataform.projects.locations.operations.cancel` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`. |

### `dataform.projects.locations.operations.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`. |

### `dataform.projects.locations.operations.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`. |

### `dataform.projects.locations.operations.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `dataform.projects.locations.queryUserRootContents` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. Location of the user root folder to list contents for. Format: projects/\*/locations/\* |
| `filter` | query | string | no | Optional. Optional filtering for the returned list. Filtering is currently only supported on the `display_name` field. Example: \* `display_name="MyFolder"` (the value of `filter`; URL-encode it in a query string) |
| `orderBy` | query | string | no | Optional. Field to additionally sort results by. Will order Folders before Repositories, and then by `order_by` in ascending order. Supported keywords: display_name (default), created_at, last_modified_at. Examples: \* `orderBy="display_name"` \* `orderBy="display_name desc"` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of paths to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `QueryUserRootContents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `queryUserRootContents`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.commit` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |

### `dataform.projects.locations.repositories.compilationResults.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the compilation result. Must be in the format `projects/*/locations/*/repositories/*`. |

### `dataform.projects.locations.repositories.compilationResults.createLongRunning` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the compilation result. Must be in the format `projects/*/locations/*/repositories/*`. |

### `dataform.projects.locations.repositories.compilationResults.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The compilation result's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/compilationResults/{compilationResultsId}`. |

### `dataform.projects.locations.repositories.compilationResults.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to list compilation results. Must be in the format `projects/*/locations/*/repositories/*`. |
| `filter` | query | string | no | Optional. Filter for the returned list. |
| `orderBy` | query | string | no | Optional. This field only supports ordering by `name` and `create_time`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of compilation results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListCompilationResults` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCompilationResults`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.compilationResults.query` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The compilation result's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/compilationResults/{compilationResultsId}`. |
| `filter` | query | string | no | Optional. Optional filter for the returned list. Filtering is only currently supported on the `file_path` field. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of compilation results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `QueryCompilationResultActions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryCompilationResultActions`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.computeAccessTokenStatus` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. |

### `dataform.projects.locations.repositories.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location in which to create the repository. Must be in the format `projects/*/locations/*`. |
| `repositoryId` | query | string | yes | Required. The ID to use for the repository, which will become the final component of the repository's resource name. |

### `dataform.projects.locations.repositories.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |
| `force` | query | boolean | no | Optional. If set to true, child resources of this repository (compilation results and workflow invocations) will also be deleted. Otherwise, the request will only succeed if the repository has no child resources. \*\*Note:\*\* \*This flag doesn't support deletion of workspaces, release configs or workflow configs. If any of such resources exists in the repository, the request will fail.\*. |

### `dataform.projects.locations.repositories.deleteLongRunning` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. |

### `dataform.projects.locations.repositories.fetchHistory` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of commits to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `FetchRepositoryHistory` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchRepositoryHistory`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.fetchRemoteBranches` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. |

### `dataform.projects.locations.repositories.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |

### `dataform.projects.locations.repositories.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |
| `options.requestedPolicyVersion` | query | integer (int32) | conditional | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataform.projects.locations.repositories.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location in which to list repositories. Must be in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter for the returned list. |
| `orderBy` | query | string | no | Optional. This field only supports ordering by `name`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of repositories to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListRepositories` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRepositories`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.move` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the repository to move. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |

### `dataform.projects.locations.repositories.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The repository's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the fields to be updated in the repository. If left unset, all fields will be updated. |

### `dataform.projects.locations.repositories.queryDirectoryContents` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. |
| `commitSha` | query | string | no | Optional. The Commit SHA for the commit to query from. If unset, the directory will be queried from HEAD. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of paths to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `QueryRepositoryDirectoryContents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryRepositoryDirectoryContents`, with the exception of `page_size`, must match the call that provided the page token. |
| `path` | query | string | no | Optional. The directory's full path including directory name, relative to root. If left unset, the root is used. |

### `dataform.projects.locations.repositories.readFile` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The repository's name. |
| `commitSha` | query | string | no | Optional. The commit SHA for the commit to read from. If unset, the file will be read from HEAD. |
| `path` | query | string | yes | Required. Full file path to read including filename, from repository root. |

### `dataform.projects.locations.repositories.releaseConfigs.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the release config. Must be in the format `projects/*/locations/*/repositories/*`. |
| `releaseConfigId` | query | string | yes | Required. The ID to use for the release config, which will become the final component of the release config's resource name. |

### `dataform.projects.locations.repositories.releaseConfigs.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The release config's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs/{releaseConfigsId}`. |

### `dataform.projects.locations.repositories.releaseConfigs.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The release config's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs/{releaseConfigsId}`. |

### `dataform.projects.locations.repositories.releaseConfigs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to list release configs. Must be in the format `projects/*/locations/*/repositories/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of release configs to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListReleaseConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReleaseConfigs`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.releaseConfigs.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The release config's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/releaseConfigs/{releaseConfigsId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the fields to be updated in the release config. If left unset, all fields will be updated. |

### `dataform.projects.locations.repositories.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |

### `dataform.projects.locations.repositories.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}`. |

### `dataform.projects.locations.repositories.workflowConfigs.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the workflow config. Must be in the format `projects/*/locations/*/repositories/*`. |
| `workflowConfigId` | query | string | yes | Required. The ID to use for the workflow config, which will become the final component of the workflow config's resource name. |

### `dataform.projects.locations.repositories.workflowConfigs.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workflow config's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs/{workflowConfigsId}`. |

### `dataform.projects.locations.repositories.workflowConfigs.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workflow config's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs/{workflowConfigsId}`. |

### `dataform.projects.locations.repositories.workflowConfigs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to list workflow configs. Must be in the format `projects/*/locations/*/repositories/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of workflow configs to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListWorkflowConfigs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkflowConfigs`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.workflowConfigs.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The workflow config's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowConfigs/{workflowConfigsId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the fields to be updated in the workflow config. If left unset, all fields will be updated. |

### `dataform.projects.locations.repositories.workflowInvocations.cancel` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workflow invocation resource's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}`. |

### `dataform.projects.locations.repositories.workflowInvocations.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the workflow invocation. Must be in the format `projects/*/locations/*/repositories/*`. |

### `dataform.projects.locations.repositories.workflowInvocations.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workflow invocation resource's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}`. |

### `dataform.projects.locations.repositories.workflowInvocations.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workflow invocation resource's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}`. |

### `dataform.projects.locations.repositories.workflowInvocations.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the WorkflowInvocation type. Must be in the format `projects/*/locations/*/repositories/*`. |
| `filter` | query | string | no | Optional. Filter for the returned list. |
| `orderBy` | query | string | no | Optional. This field only supports ordering by `name`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of workflow invocations to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListWorkflowInvocations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkflowInvocations`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.workflowInvocations.query` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workflow invocation's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workflowInvocations/{workflowInvocationsId}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of workflow invocations to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `QueryWorkflowInvocationActions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryWorkflowInvocationActions`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.workspaces.checkout` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace resource name. Format: projects/{project}/locations/{location}/repositories/{repository}/workspaces/{workspace} |

### `dataform.projects.locations.repositories.workspaces.commit` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}`. |

### `dataform.projects.locations.repositories.workspaces.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the workspace. Must be in the format `projects/*/locations/*/repositories/*`. |
| `workspaceId` | query | string | yes | Required. The ID to use for the workspace, which will become the final component of the workspace's resource name. |

### `dataform.projects.locations.repositories.workspaces.createLongRunning` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to create the workspace. Must be in the format `projects/*/locations/*/repositories/*`. |
| `workspaceId` | query | string | yes | Required. The ID to use for the workspace, which will become the final component of the workspace's resource name. |

### `dataform.projects.locations.repositories.workspaces.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace resource's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}`. |

### `dataform.projects.locations.repositories.workspaces.deleteBranch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace resource name. Format: projects/{project}/locations/{location}/repositories/{repository}/workspaces/{workspace} |

### `dataform.projects.locations.repositories.workspaces.fetchBranches` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace resource name. Format: projects/{project}/locations/{location}/repositories/{repository}/workspaces/{workspace} |
| `filter` | query | string enum | no | Optional. Filter for the returned list. Values: `BRANCH_FILTER_UNSPECIFIED`, `LOCAL_ONLY`, `REMOTE_ONLY`, `ALL`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of branches to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `FetchWorkspaceBranches` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchWorkspaceBranches`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.workspaces.fetchCurrentBranch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace resource name. Format: projects/{project}/locations/{location}/repositories/{repository}/workspaces/{workspace} |

### `dataform.projects.locations.repositories.workspaces.fetchFileDiff` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |
| `path` | query | string | yes | Required. The file's full path including filename, relative to the workspace root. |

### `dataform.projects.locations.repositories.workspaces.fetchFileGitStatuses` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.fetchGitAheadBehind` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. |
| `remoteBranch` | query | string | no | Optional. The name of the branch in the Git remote against which this workspace should be compared. If left unset, the repository's default branch name will be used. |

### `dataform.projects.locations.repositories.workspaces.fetchHistory` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of commits to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `FetchWorkspaceHistory` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchWorkspaceHistory`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.workspaces.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}`. |

### `dataform.projects.locations.repositories.workspaces.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}`. |
| `options.requestedPolicyVersion` | query | integer (int32) | conditional | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataform.projects.locations.repositories.workspaces.installNpmPackages` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The repository in which to list workspaces. Must be in the format `projects/*/locations/*/repositories/*`. |
| `filter` | query | string | no | Optional. Filter for the returned list. |
| `orderBy` | query | string | no | Optional. This field only supports ordering by `name`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of workspaces to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `ListWorkspaces` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkspaces`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.workspaces.makeDirectory` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.moveDirectory` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.moveFile` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.pull` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.push` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.queryDirectoryContents` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of paths to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `QueryDirectoryContents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryDirectoryContents`, with the exception of `page_size`, must match the call that provided the page token. |
| `path` | query | string | no | Optional. The directory's full path including directory name, relative to the workspace root. If left unset, the workspace root is used. |
| `view` | query | string enum | no | Optional. Specifies the metadata to return for each directory entry. If unspecified, the default is `DIRECTORY_CONTENTS_VIEW_BASIC`. Currently the `DIRECTORY_CONTENTS_VIEW_METADATA` view is not supported by CMEK-protected workspaces. Values: `DIRECTORY_CONTENTS_VIEW_UNSPECIFIED`, `DIRECTORY_CONTENTS_VIEW_BASIC`, `DIRECTORY_CONTENTS_VIEW_METADATA`. |

### `dataform.projects.locations.repositories.workspaces.readFile` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |
| `path` | query | string | yes | Required. The file's full path including filename, relative to the workspace root. |
| `revision` | query | string | no | Optional. The Git revision of the file to return. If left empty, the current contents of `path` will be returned. |

### `dataform.projects.locations.repositories.workspaces.removeDirectory` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.removeFile` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.reset` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.repositories.workspaces.searchFiles` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |
| `filter` | query | string | no | Optional. Optional filter for the returned list in filtering format. Filtering is only currently supported on the `path` field. See https://google.aip.dev/160 for details. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of search results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `searchFiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `searchFiles`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.repositories.workspaces.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}`. |

### `dataform.projects.locations.repositories.workspaces.syncWorkspaceRefs` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace resource name. Format: projects/{project}/locations/{location}/repositories/{repository}/workspaces/{workspace} |

### `dataform.projects.locations.repositories.workspaces.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/repositories/{repositoriesId}/workspaces/{workspacesId}`. |

### `dataform.projects.locations.repositories.workspaces.writeFile` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workspace` | path | string | yes | Required. The workspace's name. |

### `dataform.projects.locations.teamFolders.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location in which to create the TeamFolder. Must be in the format `projects/*/locations/*`. |

### `dataform.projects.locations.teamFolders.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The TeamFolder's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}`. |

### `dataform.projects.locations.teamFolders.deleteTree` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The TeamFolder's name. Format: projects/{project}/locations/{location}/teamFolders/{team_folder} Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}`. |

### `dataform.projects.locations.teamFolders.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The TeamFolder's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}`. |

### `dataform.projects.locations.teamFolders.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}`. |
| `options.requestedPolicyVersion` | query | integer (int32) | conditional | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataform.projects.locations.teamFolders.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The TeamFolder's name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the fields to be updated in the Folder. If left unset, all fields will be updated. |

### `dataform.projects.locations.teamFolders.queryContents` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `teamFolder` | path | string | yes | Required. Resource name of the TeamFolder to list contents for. Format: `projects/*/locations/*/teamFolders/*`. |
| `filter` | query | string | no | Optional. Optional filtering for the returned list. Filtering is currently only supported on the `display_name` field. Example: \* `display_name="MyFolder"` (the value of `filter`; URL-encode it in a query string) |
| `orderBy` | query | string | no | Optional. Field to additionally sort results by. Will order Folders before Repositories, and then by `order_by` in ascending order. Supported keywords: `display_name` (default), `create_time`, last_modified_time. Examples: \* `orderBy="display_name"` \* `orderBy="display_name desc"` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of paths to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `QueryTeamFolderContents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `QueryTeamFolderContents`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.teamFolders.search` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. Location in which to query TeamFolders. Format: `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Optional filtering for the returned list. Filtering is currently only supported on the `display_name` field. Example: \* `display_name="MyFolder"` (the value of `filter`; URL-encode it in a query string) |
| `orderBy` | query | string | no | Optional. Field to additionally sort results by. Supported keywords: `display_name` (default), `create_time`, `last_modified_time`. Examples: \* `orderBy="display_name"` \* `orderBy="display_name desc"` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of `TeamFolders` to return. The server may return fewer items than requested. If unspecified, the server will pick a default of `page_size` = 50. |
| `pageToken` | query | string | no | Optional. Page token received from a previous `SearchTeamFolders` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchTeamFolders`, with the exception of `page_size`, must match the call that provided the page token. |

### `dataform.projects.locations.teamFolders.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}`. |

### `dataform.projects.locations.teamFolders.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/teamFolders/{teamFoldersId}`. |

### `dataform.projects.locations.updateConfig` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The config name. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/config`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the fields to be updated in the config. |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `dataform` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when the description says that some requests must specify it (for example, `options.requestedPolicyVersion` must be 3 to get a policy with conditional role bindings). Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `dataform.projects.locations.repositories.compilationResults.create` is "Creates a new CompilationResult in a given project and location.", but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+/repositories/[^/]+$`, so a call covers only that parent; the summary of this method on this page names that parent.
- Corrected from the Discovery document: the description of `dataform.projects.locations.repositories.compilationResults.createLongRunning` is "Creates a new CompilationResult in a given project and location asynchronously.", but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+/repositories/[^/]+$`, so a call covers only that parent; the summary of this method on this page names that parent.
- Regional endpoints: the Discovery document (`dataform` v1, revision 20261030) also lists 40 endpoints of the form `https://dataform.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://dataform.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://dataform.africa-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the Discovery document: the `filter` example of the Dataform folder and repository list methods reads `filter="display_name="MyFolder""`, which nests the same quotes; this page shows the parameter value `display_name="MyFolder"` (URL-encode it in a query string).
- Corrected from the Discovery document: the `pageToken` descriptions of `queryUserRootContents` and `searchFiles` name the request message or an RPC name (`QueryUserRootFolderContents`, `SearchFilesRequest`) as the previous call and as the call whose parameters must match; this page names the methods (`queryUserRootContents`, `searchFiles`).
- Source: https://dataform.googleapis.com/$discovery/rest?version=v1, https://dataform.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
