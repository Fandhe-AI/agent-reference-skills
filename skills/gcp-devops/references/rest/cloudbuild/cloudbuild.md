---
source: https://cloudbuild.googleapis.com/$discovery/rest?version=v2
---

# Cloud Build API REST API (cloudbuild)

## Signature / Usage

Base URL: `https://cloudbuild.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `cloudbuild.githubDotComWebhook.receive`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/githubDotComWebhook:receive`
- ReceiveGitHubDotComWebhook is called when the API receives a github.com webhook.
- Request: `HttpBody`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `webhookKey` | query | string | no | For GitHub Enterprise webhooks, this key is used to associate the webhook request with the GitHubEnterpriseConfig to use for validation. |

### `cloudbuild.locations.regionalWebhook`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+location}/regionalWebhook`
- ReceiveRegionalWebhook is called when the API receives a regional GitHub webhook.
- Request: `HttpBody`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location where the webhook should be sent. |
| `webhookKey` | query | string | no | For GitHub Enterprise webhooks, this key is used to associate the webhook request with the GitHubEnterpriseConfig to use for validation. |

### `cloudbuild.operations.cancel`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `cloudbuild.operations.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudbuild.projects.builds.approve`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+name}:approve`
- Approves or rejects a pending build. If approved, the returned long-running operation (LRO) will be analogous to the LRO returned from a CreateBuild call. If rejected, the returned LRO will be immediately done. Note: This method only approves or rejects builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}:approve. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}:approve`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveBuildRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the target build. For example: "projects/{$project_id}/builds/{$build_id}" |

### `cloudbuild.projects.builds.cancel`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/projects/{projectId}/builds/{id}:cancel`
- Cancels a build in progress. Note: This method only cancels builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}:cancel. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}:cancel`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelBuildRequest`; Response: `Build`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project. |
| `id` | path | string | yes | Required. ID of the build. |

### `cloudbuild.projects.builds.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/projects/{projectId}/builds`
- Starts a build with the specified configuration. This method returns a long-running `Operation`, which includes the build ID. Pass the build ID to `GetBuild` to determine the build status (such as `SUCCESS` or `FAILURE`). Note: This method only creates builds in the "global" region when using the legacy resource path projects/{project_id}/builds. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Build`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project. |
| `parent` | query | string | no | The parent resource where this build will be created. Format: `projects/{project}/locations/{location}` |

### `cloudbuild.projects.builds.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/projects/{projectId}/builds/{id}`
- Returns information about a previously requested build. The `Build` that is returned includes its status (such as `SUCCESS`, `FAILURE`, or `WORKING`), and timing information. Note: This method only gets builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Build`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project. |
| `id` | path | string | yes | Required. ID of the build. |
| `name` | query | string | no | The name of the `Build` to retrieve. Format: `projects/{project}/locations/{location}/builds/{build}` |

### `cloudbuild.projects.builds.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/projects/{projectId}/builds`
- Lists previously requested builds. Previously requested builds may still be in-progress, or may have finished successfully or unsuccessfully. Note: This method only lists builds in the "global" region when using the legacy resource path projects/{project_id}/builds. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBuildsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project. |
| `filter` | query | string | no | The raw filter text to constrain the results. |
| `pageSize` | query | integer (int32) | no | Number of results to return in the list. |
| `pageToken` | query | string | no | The page token for the next page of Builds. If unspecified, the first page of results is returned. If the token is rejected for any reason, INVALID_ARGUMENT will be thrown. In this case, the token should be discarded, and pagination should be restarted from the first page of results. See https://google.aip.dev/158 for more. |
| `parent` | query | string | no | The parent of the collection of `Builds`. Format: `projects/{project}/locations/{location}` |

### `cloudbuild.projects.builds.retry`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/projects/{projectId}/builds/{id}:retry`
- Creates a new build based on the specified build. Note: This method only creates builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}:retry. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}:retry`. This method creates a new build using the original build request, which may or may not result in an identical build. For triggered builds: \* Triggered builds resolve to a precise revision; therefore a retry of a triggered build will result in a build that uses the same revision. For non-triggered builds that specify `RepoSource`: \* If the original build built from the tip of a branch, the retried build will build from the tip of that branch, which may not be the same revision as the original build. \* If the original build specified a commit sha or revision ID, the retried build will use the identical source. For builds that specify `StorageSource`: \* If the original build pulled source from Cloud Storage without specifying the generation of the object, the new build will use the current object, which may be different from the original build source. \* If the original build pulled source from Cloud Storage and specified the generation of the object, the new build will attempt to use the same object, which may or may not be available depending on the bucket's lifecycle management settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RetryBuildRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project. |
| `id` | path | string | yes | Required. Build ID of the original build. |

### `cloudbuild.projects.githubEnterpriseConfigs.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+parent}/githubEnterpriseConfigs`
- Create an association between a GCP project and a GitHub Enterprise server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GitHubEnterpriseConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} |
| `gheConfigId` | query | string | no | Optional. The ID to use for the GithubEnterpriseConfig, which will become the final component of the GithubEnterpriseConfig's resource name. ghe_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character |
| `projectId` | query | string | no | ID of the project. |

### `cloudbuild.projects.githubEnterpriseConfigs.delete`

- Versions: v1
- `DELETE https://cloudbuild.googleapis.com/v1/{+name}`
- Delete an association between a GCP project and a GitHub Enterprise server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `configId` | query | string | no | Unique identifier of the `GitHubEnterpriseConfig` |
| `projectId` | query | string | no | ID of the project |

### `cloudbuild.projects.githubEnterpriseConfigs.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Retrieve a GitHubEnterpriseConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GitHubEnterpriseConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `configId` | query | string | no | Unique identifier of the `GitHubEnterpriseConfig` |
| `projectId` | query | string | no | ID of the project |

### `cloudbuild.projects.githubEnterpriseConfigs.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+parent}/githubEnterpriseConfigs`
- List all GitHubEnterpriseConfigs for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGithubEnterpriseConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} |
| `projectId` | query | string | no | ID of the project |

### `cloudbuild.projects.githubEnterpriseConfigs.patch`

- Versions: v1
- `PATCH https://cloudbuild.googleapis.com/v1/{+name}`
- Update an association between a GCP project and a GitHub Enterprise server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GitHubEnterpriseConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `updateMask` | query | string (google-fieldmask) | no | Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. |

### `cloudbuild.projects.locations.bitbucketServerConfigs.connectedRepositories.batchCreate`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+parent}/connectedRepositories:batchCreate`
- Batch connecting Bitbucket Server repositories to Cloud Build.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreateBitbucketServerConnectedRepositoriesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the `BitbucketServerConfig` that added connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` |

### `cloudbuild.projects.locations.bitbucketServerConfigs.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+parent}/bitbucketServerConfigs`
- Creates a new `BitbucketServerConfig`. This API is experimental.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BitbucketServerConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the parent resource. |
| `bitbucketServerConfigId` | query | string | no | Optional. The ID to use for the BitbucketServerConfig, which will become the final component of the BitbucketServerConfig's resource name. bitbucket_server_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character. |

### `cloudbuild.projects.locations.bitbucketServerConfigs.delete`

- Versions: v1
- `DELETE https://cloudbuild.googleapis.com/v1/{+name}`
- Delete a `BitbucketServerConfig`. This API is experimental.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The config resource name. |

### `cloudbuild.projects.locations.bitbucketServerConfigs.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Retrieve a `BitbucketServerConfig`. This API is experimental.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BitbucketServerConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The config resource name. |

### `cloudbuild.projects.locations.bitbucketServerConfigs.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+parent}/bitbucketServerConfigs`
- List all `BitbucketServerConfigs` for a given project. This API is experimental.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBitbucketServerConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the parent resource. |
| `pageSize` | query | integer (int32) | no | The maximum number of configs to return. The service may return fewer than this value. If unspecified, at most 50 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListBitbucketServerConfigsRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBitbucketServerConfigsRequest` must match the call that provided the page token. |

### `cloudbuild.projects.locations.bitbucketServerConfigs.patch`

- Versions: v1
- `PATCH https://cloudbuild.googleapis.com/v1/{+name}`
- Updates an existing `BitbucketServerConfig`. This API is experimental.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BitbucketServerConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for the config. |
| `updateMask` | query | string (google-fieldmask) | no | Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. |

### `cloudbuild.projects.locations.bitbucketServerConfigs.removeBitbucketServerConnectedRepository`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+config}:removeBitbucketServerConnectedRepository`
- Remove a Bitbucket Server repository from a given BitbucketServerConfig's connected repositories. This API is experimental.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveBitbucketServerConnectedRepositoryRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `config` | path | string | yes | Required. The name of the `BitbucketServerConfig` to remove a connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` |

### `cloudbuild.projects.locations.bitbucketServerConfigs.repos.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+parent}/repos`
- List all repositories for a given `BitbucketServerConfig`. This API is experimental.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBitbucketServerRepositoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the parent resource. |
| `pageSize` | query | integer (int32) | no | The maximum number of configs to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListBitbucketServerRepositoriesRequest` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBitbucketServerConfigsRequest` must match the call that provided the page token. |

### `cloudbuild.projects.locations.builds.approve`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+name}:approve`
- Approves or rejects a pending build. If approved, the returned long-running operation (LRO) will be analogous to the LRO returned from a CreateBuild call. If rejected, the returned LRO will be immediately done. Note: This method only approves or rejects builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}:approve. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}:approve`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveBuildRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the target build. For example: "projects/{$project_id}/builds/{$build_id}" |

### `cloudbuild.projects.locations.builds.cancel`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+name}:cancel`
- Cancels a build in progress. Note: This method only cancels builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}:cancel. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}:cancel`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelBuildRequest`; Response: `Build`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the `Build` to cancel. Format: `projects/{project}/locations/{location}/builds/{build}` |

### `cloudbuild.projects.locations.builds.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+parent}/builds`
- Starts a build with the specified configuration. This method returns a long-running `Operation`, which includes the build ID. Pass the build ID to `GetBuild` to determine the build status (such as `SUCCESS` or `FAILURE`). Note: This method only creates builds in the "global" region when using the legacy resource path projects/{project_id}/builds. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Build`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent resource where this build will be created. Format: `projects/{project}/locations/{location}` |
| `projectId` | query | string | yes | Required. ID of the project. |

### `cloudbuild.projects.locations.builds.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Returns information about a previously requested build. The `Build` that is returned includes its status (such as `SUCCESS`, `FAILURE`, or `WORKING`), and timing information. Note: This method only gets builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Build`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the `Build` to retrieve. Format: `projects/{project}/locations/{location}/builds/{build}` |
| `id` | query | string | yes | Required. ID of the build. |
| `projectId` | query | string | yes | Required. ID of the project. |

### `cloudbuild.projects.locations.builds.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+parent}/builds`
- Lists previously requested builds. Previously requested builds may still be in-progress, or may have finished successfully or unsuccessfully. Note: This method only lists builds in the "global" region when using the legacy resource path projects/{project_id}/builds. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBuildsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent of the collection of `Builds`. Format: `projects/{project}/locations/{location}` |
| `filter` | query | string | no | The raw filter text to constrain the results. |
| `pageSize` | query | integer (int32) | no | Number of results to return in the list. |
| `pageToken` | query | string | no | The page token for the next page of Builds. If unspecified, the first page of results is returned. If the token is rejected for any reason, INVALID_ARGUMENT will be thrown. In this case, the token should be discarded, and pagination should be restarted from the first page of results. See https://google.aip.dev/158 for more. |
| `projectId` | query | string | yes | Required. ID of the project. |

### `cloudbuild.projects.locations.builds.retry`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+name}:retry`
- Creates a new build based on the specified build. Note: This method only creates builds in the "global" region when using the legacy resource path projects/{project_id}/builds/{id}:retry. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/builds/{id}:retry`. This method creates a new build using the original build request, which may or may not result in an identical build. For triggered builds: \* Triggered builds resolve to a precise revision; therefore a retry of a triggered build will result in a build that uses the same revision. For non-triggered builds that specify `RepoSource`: \* If the original build built from the tip of a branch, the retried build will build from the tip of that branch, which may not be the same revision as the original build. \* If the original build specified a commit sha or revision ID, the retried build will use the identical source. For builds that specify `StorageSource`: \* If the original build pulled source from Cloud Storage without specifying the generation of the object, the new build will use the current object, which may be different from the original build source. \* If the original build pulled source from Cloud Storage and specified the generation of the object, the new build will attempt to use the same object, which may or may not be available depending on the bucket's lifecycle management settings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RetryBuildRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the `Build` to retry. Format: `projects/{project}/locations/{location}/builds/{build}` |

### `cloudbuild.projects.locations.connections.create`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+parent}/connections`
- Creates a Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location where the connection will be created. Format: `projects/*/locations/*`. |
| `connectionId` | query | string | yes | Required. The ID to use for the Connection, which will become the final component of the Connection's resource name. Names must be unique per-project per-location. Allows alphanumeric characters and any of -.\_~%!$&'()\*+,;=@. |

### `cloudbuild.projects.locations.connections.delete`

- Versions: v2
- `DELETE https://cloudbuild.googleapis.com/v2/{+name}`
- Deletes a single connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Connection to delete. Format: `projects/*/locations/*/connections/*`. |
| `etag` | query | string | no | The current etag of the connection. If an etag is provided and does not match the current etag of the connection, deletion will be blocked and an ABORTED error will be returned. |
| `validateOnly` | query | boolean | no | If set, validate the request, but do not actually post it. |

### `cloudbuild.projects.locations.connections.fetchLinkableRepositories`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+connection}:fetchLinkableRepositories`
- FetchLinkableRepositories get repositories from SCM that are accessible and could be added to the connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchLinkableRepositoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `connection` | path | string | yes | Required. The name of the Connection. Format: `projects/*/locations/*/connections/*`. |
| `pageSize` | query | integer (int32) | no | Number of results to return in the list. Default to 20. |
| `pageToken` | query | string | no | Page start. |

### `cloudbuild.projects.locations.connections.get`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+name}`
- Gets details of a single connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Connection to retrieve. Format: `projects/*/locations/*/connections/*`. |

### `cloudbuild.projects.locations.connections.getIamPolicy`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudbuild.projects.locations.connections.list`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+parent}/connections`
- Lists Connections in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of Connections. Format: `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Number of results to return in the list. |
| `pageToken` | query | string | no | Page start. |
| `returnPartialSuccess` | query | boolean | no | Optional. If set to true, the response will return partial results when some regions are unreachable. If set to false, the response will fail if any region is unreachable. |

### `cloudbuild.projects.locations.connections.patch`

- Versions: v2
- `PATCH https://cloudbuild.googleapis.com/v2/{+name}`
- Updates a single connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`. |
| `allowMissing` | query | boolean | no | If set to true, and the connection is not found a new connection will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input connection has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties). |
| `etag` | query | string | no | The current etag of the connection. If an etag is provided and does not match the current etag of the connection, update will be blocked and an ABORTED error will be returned. |
| `updateMask` | query | string (google-fieldmask) | no | The list of fields to be updated. |

### `cloudbuild.projects.locations.connections.processWebhook`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+parent}/connections:processWebhook`
- ProcessWebhook is called by the external SCM for notifying of events.
- Request: `HttpBody`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location where the webhook will be received. Format: `projects/*/locations/*`. |
| `webhookKey` | query | string | no | Arbitrary additional key to find the matching repository for a webhook event if needed. |

### `cloudbuild.projects.locations.connections.repositories.accessReadToken`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+repository}:accessReadToken`
- Fetches read token of a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchReadTokenRequest`; Response: `FetchReadTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The resource name of the repository in the format `projects/*/locations/*/connections/*/repositories/*`. |

### `cloudbuild.projects.locations.connections.repositories.accessReadWriteToken`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+repository}:accessReadWriteToken`
- Fetches read/write token of a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchReadWriteTokenRequest`; Response: `FetchReadWriteTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The resource name of the repository in the format `projects/*/locations/*/connections/*/repositories/*`. |

### `cloudbuild.projects.locations.connections.repositories.batchCreate`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+parent}/repositories:batchCreate`
- Creates multiple repositories inside a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchCreateRepositoriesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The connection to contain all the repositories being created. Format: projects/\*/locations/\*/connections/\* The parent field in the CreateRepositoryRequest messages must either be empty or match this field. |

### `cloudbuild.projects.locations.connections.repositories.create`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+parent}/repositories`
- Creates a Repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Repository`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The connection to contain the repository. If the request is part of a BatchCreateRepositoriesRequest, this field should be empty or match the parent specified there. |
| `repositoryId` | query | string | yes | Required. The ID to use for the repository, which will become the final component of the repository's resource name. This ID should be unique in the connection. Allows alphanumeric characters and any of -.\_~%!$&'()\*+,;=@. |

### `cloudbuild.projects.locations.connections.repositories.delete`

- Versions: v2
- `DELETE https://cloudbuild.googleapis.com/v2/{+name}`
- Deletes a single repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Repository to delete. Format: `projects/*/locations/*/connections/*/repositories/*`. |
| `etag` | query | string | no | The current etag of the repository. If an etag is provided and does not match the current etag of the repository, deletion will be blocked and an ABORTED error will be returned. |
| `validateOnly` | query | boolean | no | If set, validate the request, but do not actually post it. |

### `cloudbuild.projects.locations.connections.repositories.fetchGitRefs`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+repository}:fetchGitRefs`
- Fetch the list of branches or tags for a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitRefsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `repository` | path | string | yes | Required. The resource name of the repository in the format `projects/*/locations/*/connections/*/repositories/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Number of results to return in the list. Default to 20. |
| `pageToken` | query | string | no | Optional. Page start. |
| `refType` | query | string enum | no | Type of refs to fetch Values: `REF_TYPE_UNSPECIFIED`, `TAG`, `BRANCH`. |

### `cloudbuild.projects.locations.connections.repositories.get`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+name}`
- Gets details of a single repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Repository`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Repository to retrieve. Format: `projects/*/locations/*/connections/*/repositories/*`. |

### `cloudbuild.projects.locations.connections.repositories.list`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+parent}/repositories`
- Lists Repositories in a given connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRepositoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of Repositories. Format: `projects/*/locations/*/connections/*`. |
| `filter` | query | string | no | A filter expression that filters resources listed in the response. Expressions must follow API improvement proposal AIP-160 (https://google.aip.dev/160). e.g. `remote_uri:"https://github.com*"`. |
| `pageSize` | query | integer (int32) | no | Number of results to return in the list. |
| `pageToken` | query | string | no | Page start. |
| `returnPartialSuccess` | query | boolean | no | Optional. If set to true, the response will return partial results when some regions are unreachable. If set to false, the response will fail if any region is unreachable. |

### `cloudbuild.projects.locations.connections.setIamPolicy`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudbuild.projects.locations.connections.testIamPermissions`

- Versions: v2
- `POST https://cloudbuild.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudbuild.projects.locations.get`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `cloudbuild.projects.locations.getDefaultServiceAccount`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Returns the `DefaultServiceAccount` used by the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DefaultServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `DefaultServiceAccount` to retrieve. Format: `projects/{project}/locations/{location}/defaultServiceAccount` |

### `cloudbuild.projects.locations.githubEnterpriseConfigs.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+parent}/githubEnterpriseConfigs`
- Create an association between a GCP project and a GitHub Enterprise server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GitHubEnterpriseConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} |
| `gheConfigId` | query | string | no | Optional. The ID to use for the GithubEnterpriseConfig, which will become the final component of the GithubEnterpriseConfig's resource name. ghe_config_id must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character |
| `projectId` | query | string | no | ID of the project. |

### `cloudbuild.projects.locations.githubEnterpriseConfigs.delete`

- Versions: v1
- `DELETE https://cloudbuild.googleapis.com/v1/{+name}`
- Delete an association between a GCP project and a GitHub Enterprise server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `configId` | query | string | no | Unique identifier of the `GitHubEnterpriseConfig` |
| `projectId` | query | string | no | ID of the project |

### `cloudbuild.projects.locations.githubEnterpriseConfigs.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Retrieve a GitHubEnterpriseConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GitHubEnterpriseConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `configId` | query | string | no | Unique identifier of the `GitHubEnterpriseConfig` |
| `projectId` | query | string | no | ID of the project |

### `cloudbuild.projects.locations.githubEnterpriseConfigs.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+parent}/githubEnterpriseConfigs`
- List all GitHubEnterpriseConfigs for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGithubEnterpriseConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Name of the parent project. For example: projects/{$project_number} or projects/{$project_id} |
| `projectId` | query | string | no | ID of the project |

### `cloudbuild.projects.locations.githubEnterpriseConfigs.patch`

- Versions: v1
- `PATCH https://cloudbuild.googleapis.com/v1/{+name}`
- Update an association between a GCP project and a GitHub Enterprise server.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GitHubEnterpriseConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `updateMask` | query | string (google-fieldmask) | no | Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. |

### `cloudbuild.projects.locations.list`

- Versions: v2
- `GET https://cloudbuild.googleapis.com/v2/{+name}/locations`
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

### `cloudbuild.projects.locations.operations.cancel`

- Versions: v2, v1
- `POST https://cloudbuild.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `cloudbuild.projects.locations.operations.get`

- Versions: v2, v1
- `GET https://cloudbuild.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudbuild.projects.locations.triggers.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+parent}/triggers`
- Creates a new `BuildTrigger`. Note: This method only creates triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BuildTrigger`; Response: `BuildTrigger`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent resource where this trigger will be created. Format: `projects/{project}/locations/{location}` |
| `projectId` | query | string | yes | Required. ID of the project for which to configure automatic builds. |

### `cloudbuild.projects.locations.triggers.delete`

- Versions: v1
- `DELETE https://cloudbuild.googleapis.com/v1/{+name}`
- Deletes a `BuildTrigger` by its project ID and trigger ID. Note: This method only deletes triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers/{trigger_id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers/{trigger_id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the `Trigger` to delete. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |
| `projectId` | query | string | yes | Required. ID of the project that owns the trigger. |
| `triggerId` | query | string | yes | Required. ID of the `BuildTrigger` to delete. |

### `cloudbuild.projects.locations.triggers.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Returns information about a `BuildTrigger`. Note: This method only gets triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers/{trigger_id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers/{trigger_id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BuildTrigger`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the `Trigger` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |
| `projectId` | query | string | yes | Required. ID of the project that owns the trigger. |
| `triggerId` | query | string | yes | Required. Identifier (`id` or `name`) of the `BuildTrigger` to get. |

### `cloudbuild.projects.locations.triggers.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+parent}/triggers`
- Lists existing `BuildTrigger`s. Note: This method only lists triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBuildTriggersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent of the collection of `Triggers`. Format: `projects/{project}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Number of results to return in the list. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |
| `projectId` | query | string | yes | Required. ID of the project for which to list BuildTriggers. |

### `cloudbuild.projects.locations.triggers.patch`

- Versions: v1
- `PATCH https://cloudbuild.googleapis.com/v1/{+resourceName}`
- Updates a `BuildTrigger` by its project ID and trigger ID. Note: This method only updates triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers/{trigger_id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers/{trigger_id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BuildTrigger`; Response: `BuildTrigger`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resourceName` | path | string | yes | The `Trigger` name with format: `projects/{project}/locations/{location}/triggers/{trigger}`, where {trigger} is a unique identifier generated by the service. |
| `projectId` | query | string | yes | Required. ID of the project that owns the trigger. |
| `triggerId` | query | string | yes | Required. ID of the `BuildTrigger` to update. |
| `updateMask` | query | string (google-fieldmask) | no | Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. |

### `cloudbuild.projects.locations.triggers.run`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+name}:run`
- Runs a `BuildTrigger` at a particular source revision. To run a regional or global trigger, use the POST request that includes the location endpoint in the path (ex. v1/projects/{projectId}/locations/{region}/triggers/{triggerId}:run). The POST request that does not include the location endpoint in the path can only be used when running global triggers.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RunBuildTriggerRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the `Trigger` to run. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |

### `cloudbuild.projects.locations.triggers.webhook`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+name}:webhook`
- ReceiveTriggerWebhook \[Experimental\] is called when the API receives a webhook request targeted at a specific trigger.
- Request: `HttpBody`; Response: `ReceiveTriggerWebhookResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the `ReceiveTriggerWebhook` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |
| `projectId` | query | string | no | Project in which the specified trigger lives |
| `secret` | query | string | no | Secret token used for authorization if an OAuth token isn't provided. |
| `trigger` | query | string | no | Name of the trigger to run the payload against |

### `cloudbuild.projects.locations.workerPools.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/{+parent}/workerPools`
- Creates a `WorkerPool`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkerPool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this worker pool will be created. Format: `projects/{project}/locations/{location}`. |
| `validateOnly` | query | boolean | no | If set, validate the request and preview the response, but do not actually post it. |
| `workerPoolId` | query | string | yes | Required. Immutable. The ID to use for the `WorkerPool`, which will become the final component of the resource name. This value should be 1-63 characters, and valid characters are /a-z-/. |

### `cloudbuild.projects.locations.workerPools.delete`

- Versions: v1
- `DELETE https://cloudbuild.googleapis.com/v1/{+name}`
- Deletes a `WorkerPool`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `WorkerPool` to delete. Format: `projects/{project}/locations/{location}/workerPools/{workerPool}`. |
| `allowMissing` | query | boolean | no | If set to true, and the `WorkerPool` is not found, the request will succeed but no action will be taken on the server. |
| `etag` | query | string | no | Optional. If provided, it must match the server's etag on the workerpool for the request to be processed. |
| `validateOnly` | query | boolean | no | If set, validate the request and preview the response, but do not actually post it. |

### `cloudbuild.projects.locations.workerPools.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+name}`
- Returns details of a `WorkerPool`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WorkerPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `WorkerPool` to retrieve. Format: `projects/{project}/locations/{location}/workerPools/{workerPool}`. |

### `cloudbuild.projects.locations.workerPools.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/{+parent}/workerPools`
- Lists `WorkerPool`s.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkerPoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the collection of `WorkerPools`. Format: `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of `WorkerPool`s to return. The service may return fewer than this value. If omitted, the server will use a sensible default. |
| `pageToken` | query | string | no | A page token, received from a previous `ListWorkerPools` call. Provide this to retrieve the subsequent page. |

### `cloudbuild.projects.locations.workerPools.patch`

- Versions: v1
- `PATCH https://cloudbuild.googleapis.com/v1/{+name}`
- Updates a `WorkerPool`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkerPool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the `WorkerPool`, with format `projects/{project}/locations/{location}/workerPools/{worker_pool}`. The value of `{worker_pool}` is provided by `worker_pool_id` in `CreateWorkerPool` request and the value of `{location}` is determined by the endpoint accessed. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A mask specifying which fields in `worker_pool` to update. |
| `validateOnly` | query | boolean | no | If set, validate the request and preview the response, but do not actually post it. |

### `cloudbuild.projects.triggers.create`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers`
- Creates a new `BuildTrigger`. Note: This method only creates triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BuildTrigger`; Response: `BuildTrigger`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project for which to configure automatic builds. |
| `parent` | query | string | no | The parent resource where this trigger will be created. Format: `projects/{project}/locations/{location}` |

### `cloudbuild.projects.triggers.delete`

- Versions: v1
- `DELETE https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers/{triggerId}`
- Deletes a `BuildTrigger` by its project ID and trigger ID. Note: This method only deletes triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers/{trigger_id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers/{trigger_id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project that owns the trigger. |
| `triggerId` | path | string | yes | Required. ID of the `BuildTrigger` to delete. |
| `name` | query | string | no | The name of the `Trigger` to delete. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |

### `cloudbuild.projects.triggers.get`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers/{triggerId}`
- Returns information about a `BuildTrigger`. Note: This method only gets triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers/{trigger_id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers/{trigger_id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BuildTrigger`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project that owns the trigger. |
| `triggerId` | path | string | yes | Required. Identifier (`id` or `name`) of the `BuildTrigger` to get. |
| `name` | query | string | no | The name of the `Trigger` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |

### `cloudbuild.projects.triggers.list`

- Versions: v1
- `GET https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers`
- Lists existing `BuildTrigger`s. Note: This method only lists triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBuildTriggersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project for which to list BuildTriggers. |
| `pageSize` | query | integer (int32) | no | Number of results to return in the list. |
| `pageToken` | query | string | no | Token to provide to skip to a particular spot in the list. |
| `parent` | query | string | no | The parent of the collection of `Triggers`. Format: `projects/{project}/locations/{location}` |

### `cloudbuild.projects.triggers.patch`

- Versions: v1
- `PATCH https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers/{triggerId}`
- Updates a `BuildTrigger` by its project ID and trigger ID. Note: This method only updates triggers in the "global" region when using the legacy resource path projects/{project_id}/triggers/{trigger_id}. For all regions, use the regional resource path: `projects/{project_id}/locations/{location}/triggers/{trigger_id}`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BuildTrigger`; Response: `BuildTrigger`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project that owns the trigger. |
| `triggerId` | path | string | yes | Required. ID of the `BuildTrigger` to update. |
| `updateMask` | query | string (google-fieldmask) | no | Update mask for the resource. If this is set, the server will only update the fields specified in the field mask. Otherwise, a full update of the mutable resource fields will be performed. |

### `cloudbuild.projects.triggers.run`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers/{triggerId}:run`
- Runs a `BuildTrigger` at a particular source revision. To run a regional or global trigger, use the POST request that includes the location endpoint in the path (ex. v1/projects/{projectId}/locations/{region}/triggers/{triggerId}:run). The POST request that does not include the location endpoint in the path can only be used when running global triggers.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RepoSource`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the project. |
| `triggerId` | path | string | yes | Required. ID of the trigger. |
| `name` | query | string | no | The name of the `Trigger` to run. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |

### `cloudbuild.projects.triggers.webhook`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/projects/{projectId}/triggers/{trigger}:webhook`
- ReceiveTriggerWebhook \[Experimental\] is called when the API receives a webhook request targeted at a specific trigger.
- Request: `HttpBody`; Response: `ReceiveTriggerWebhookResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project in which the specified trigger lives |
| `trigger` | path | string | yes | Name of the trigger to run the payload against |
| `name` | query | string | no | The name of the `ReceiveTriggerWebhook` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}` |
| `secret` | query | string | no | Secret token used for authorization if an OAuth token isn't provided. |

### `cloudbuild.webhook`

- Versions: v1
- `POST https://cloudbuild.googleapis.com/v1/webhook`
- ReceiveWebhook is called when the API receives a GitHub webhook.
- Request: `HttpBody`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `webhookKey` | query | string | no | For GitHub Enterprise webhooks, this key is used to associate the webhook request with the GitHubEnterpriseConfig to use for validation. |

### Example request skeleton

Generated from the Discovery entry of `cloudbuild.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudbuild.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `cloudbuild` (retrieved 2026-11-14). Resources on this page: githubDotComWebhook, locations, operations, projects, v1.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/cloudbuild/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`cloudbuild` v2, revision 20260904) also lists 47 endpoints of the form `https://cloudbuild.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://cloudbuild.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://cloudbuild.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://cloudbuild.googleapis.com/$discovery/rest?version=v2, https://cloudbuild.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
