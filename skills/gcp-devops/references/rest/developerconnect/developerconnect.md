---
source: https://developerconnect.googleapis.com/$discovery/rest?version=v1
---

# Developer Connect API REST API (developerconnect)

## Signature / Usage

Base URL: `https://developerconnect.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `developerconnect.projects.locations.accountConnectors.create`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+parent}/accountConnectors`
- Creates a new AccountConnector in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccountConnector`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Location resource name as the account_connector’s parent. |
| `accountConnectorId` | query | string | yes | Required. The ID to use for the AccountConnector, which will become the final component of the AccountConnector's resource name. Its format should adhere to https://google.aip.dev/122#resource-id-segments Names must be unique per-project per-location. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.accountConnectors.delete`

- Versions: v1
- `DELETE https://developerconnect.googleapis.com/v1/{+name}`
- Deletes a single AccountConnector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `etag` | query | string | no | Optional. The current etag of the AccountConnectorn. If an etag is provided and does not match the current etag of the AccountConnector, deletion will be blocked and an ABORTED error will be returned. |
| `force` | query | boolean | no | Optional. If set to true, any Users from this AccountConnector will also be deleted. (Otherwise, the request will only work if the AccountConnector has no Users.) |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.accountConnectors.fetchUserRepositories`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+accountConnector}:fetchUserRepositories`
- FetchUserRepositories returns a list of UserRepos that are available for an account connector resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchUserRepositoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `accountConnector` | path | string | yes | Required. The name of the Account Connector resource in the format: `projects/*/locations/*/accountConnectors/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Number of results to return in the list. Defaults to 20. |
| `pageToken` | query | string | no | Optional. Page start. |
| `repository` | query | string | no | Optional. The name of the repository. When specified, only the UserRepository with this name will be returned if the repository is accessible under this Account Connector for the calling user. |

### `developerconnect.projects.locations.accountConnectors.get`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}`
- Gets details of a single AccountConnector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccountConnector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |

### `developerconnect.projects.locations.accountConnectors.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+parent}/accountConnectors`
- Lists AccountConnectors in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAccountConnectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListAccountConnectorsRequest |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `developerconnect.projects.locations.accountConnectors.patch`

- Versions: v1
- `PATCH https://developerconnect.googleapis.com/v1/{+name}`
- Updates the parameters of a single AccountConnector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccountConnector`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the accountConnector, in the format `projects/{project}/locations/{location}/accountConnectors/{account_connector_id}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the accountConnector is not found a new accountConnector will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input accountConnector has all the necessary |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to be updated. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.accountConnectors.users.delete`

- Versions: v1
- `DELETE https://developerconnect.googleapis.com/v1/{+name}`
- Deletes a single User.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `etag` | query | string | no | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.accountConnectors.users.deleteSelf`

- Versions: v1
- `DELETE https://developerconnect.googleapis.com/v1/{+name}/users:deleteSelf`
- Delete the User based on the user credentials.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AccountConnector resource |

### `developerconnect.projects.locations.accountConnectors.users.fetchAccessToken`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+accountConnector}/users:fetchAccessToken`
- Fetches OAuth access token based on end user credentials.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchAccessTokenRequest`; Response: `FetchAccessTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `accountConnector` | path | string | yes | Required. The resource name of the AccountConnector in the format `projects/*/locations/*/accountConnectors/*`. |

### `developerconnect.projects.locations.accountConnectors.users.fetchSelf`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}/users:fetchSelf`
- Fetch the User based on the user credentials.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `User`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AccountConnector resource |

### `developerconnect.projects.locations.accountConnectors.users.finishOAuthFlow`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+accountConnector}/users:finishOAuthFlow`
- Finishes OAuth flow for an account connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FinishOAuthResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `accountConnector` | path | string | yes | Required. The resource name of the AccountConnector in the format `projects/*/locations/*/accountConnectors/*`. |
| `googleOauthParams.scopes` | query | repeated string | conditional | Required. The scopes returned by Google OAuth flow. |
| `googleOauthParams.ticket` | query | string | conditional | Required. The ticket to be used for post processing the callback from Google OAuth flow. |
| `googleOauthParams.versionInfo` | query | string | no | Optional. The version info returned by Google OAuth flow. |
| `oauthParams.code` | query | string | conditional | Required. The code to be used for getting the token from SCM provider. |
| `oauthParams.ticket` | query | string | conditional | Required. The ticket to be used for post processing the callback from SCM provider. |

### `developerconnect.projects.locations.accountConnectors.users.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+parent}/users`
- Lists Users in a given project, location, and account_connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListUsersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListUsersRequest |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `developerconnect.projects.locations.accountConnectors.users.startOAuthFlow`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+accountConnector}/users:startOAuthFlow`
- Starts OAuth flow for an account connector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `StartOAuthResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `accountConnector` | path | string | yes | Required. The resource name of the AccountConnector in the format `projects/*/locations/*/accountConnectors/*`. |

### `developerconnect.projects.locations.connections.create`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+parent}/connections`
- Creates a new Connection in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `connectionId` | query | string | yes | Required. The ID to use for the connection, which becomes the final component of the connection's resource name. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.connections.delete`

- Versions: v1
- `DELETE https://developerconnect.googleapis.com/v1/{+name}`
- Deletes a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `etag` | query | string | no | Optional. The current etag of the Connection. If an etag is provided and does not match the current etag of the Connection, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.connections.fetchGitHubInstallations`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+connection}:fetchGitHubInstallations`
- FetchGitHubInstallations returns the list of GitHub Installations that are available to be added to a Connection. For github.com, only installations accessible to the authorizer token are returned. For GitHub Enterprise, all installations are returned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitHubInstallationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `connection` | path | string | yes | Required. The resource name of the connection in the format `projects/*/locations/*/connections/*`. |

### `developerconnect.projects.locations.connections.fetchLinkableGitRepositories`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+connection}:fetchLinkableGitRepositories`
- FetchLinkableGitRepositories returns a list of git repositories from an SCM that are available to be added to a Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchLinkableGitRepositoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `connection` | path | string | yes | Required. The name of the Connection. Format: `projects/*/locations/*/connections/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Number of results to return in the list. Defaults to 20. |
| `pageToken` | query | string | no | Optional. Page start. |

### `developerconnect.projects.locations.connections.get`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}`
- Gets details of a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.addPullRequestComment`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:addPullRequestComment`
- Add a comment to a Pull Request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddGitRepositoryLinkPullRequestCommentRequest`; Response: `PullRequestComment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the GitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.addPullRequestReviewComment`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:addPullRequestReviewComment`
- Add a review comment (inline on diff) to a Pull Request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddGitRepositoryLinkPullRequestReviewCommentRequest`; Response: `PullRequestReviewComment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the GitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.create`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+parent}/gitRepositoryLinks`
- Creates a GitRepositoryLink. Upon linking a Git Repository, Developer Connect will configure the Git Repository to send webhook events to Developer Connect. Connections that use Firebase GitHub Application will have events forwarded to the Firebase service. Connections that use Gemini Code Assist will have events forwarded to Gemini Code Assist service. All other Connections will have events forwarded to Cloud Build.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GitRepositoryLink`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `gitRepositoryLinkId` | query | string | yes | Required. The ID to use for the repository, which will become the final component of the repository's resource name. This ID should be unique in the connection. Allows alphanumeric characters and any of -.\_~%!$&'()\*+,;=@. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.delete`

- Versions: v1
- `DELETE https://developerconnect.googleapis.com/v1/{+name}`
- Deletes a single GitRepositoryLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `etag` | query | string | no | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.diffCommit`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}:diffCommit`
- Diff commits for a GitRepositoryLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DiffGitRepositoryLinkCommitResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the GitRepositoryLink. |
| `baseSha` | query | string | yes | Required. The base commit SHA or ref. |
| `headSha` | query | string | yes | Required. The head commit SHA or ref. |
| `pathFilters` | query | repeated string | no | Optional. Path patterns or exact paths to filter returned files. When `path_filters` is specified, `FileDiff.patch` is populated for all matching files (use `["**"]` to include patches for all changed files). When `path_filters` is omitted or empty, the full list of `FileDiff` is returned without patch diffs (`FileDiff.patch` is empty). |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchCommit`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}:fetchCommit`
- Fetch Commit details from a Git repository link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitRepositoryLinkCommitResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the GitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |
| `commitSha` | query | string | yes | Required. The commit SHA, or symbolic revision (for example, branch name, tag, or Git reference). |
| `pathFilters` | query | repeated string | no | Optional. Path patterns or exact paths to filter returned files (only applicable in `FULL` view). When `path_filters` is specified, `FileDiff.patch` is populated for all matching files (use `["**"]` to include patches for all changed files). When `path_filters` is omitted or empty, the full list of `FileDiff` is returned without patch diffs (`FileDiff.patch` is empty). |
| `view` | query | string enum | no | Optional. The level of commit details to return in the response. Defaults to `FULL` if unspecified. In `FULL` view, `files` metadata (paths and statuses) are returned; `path_filters` must also be specified to populate line patch hunks. Values: `COMMIT_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchCommitList`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}:fetchCommitList`
- Fetch a list of Commits from a Git repository link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitRepositoryLinkCommitListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the GitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Number of results to return in the list. Default is 50. Max is 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `FetchGitRepositoryLinkCommitList` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchGitRepositoryLinkCommitList` must match the call that provided the page token. |
| `ref` | query | string | no | Optional. The commit SHA, or symbolic revision (for example, branch name, tag, or Git reference) from which to start listing commits. |
| `view` | query | string enum | no | Optional. The level of commit details to return in the response. Only `BASIC` is supported; `FULL` returns `INVALID_ARGUMENT`. Defaults to `BASIC` if unspecified. Use `FetchGitRepositoryLinkCommit` to get file diffs for a single commit. Values: `COMMIT_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchFileBlame`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}:fetchFileBlame`
- Fetches blame information for a file or line range in a file.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitRepositoryLinkFileBlameResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the GitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |
| `firstLine` | query | integer (int32) | no | Optional. The 1-indexed starting line number of the range to blame (inclusive). If not specified, blame begins at line 1. |
| `lastLine` | query | integer (int32) | no | Optional. The 1-indexed ending line number of the range to blame (inclusive). If not specified, blame extends to the end of the file. |
| `path` | query | string | yes | Required. The file path within the repository. |
| `ref` | query | string | yes | Required. The SCM commit SHA, or symbolic revision (for example, branch name, tag) from which to fetch the blame. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchGitRefs`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+gitRepositoryLink}:fetchGitRefs`
- Fetch the list of branches or tags for a given repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitRefsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `gitRepositoryLink` | path | string | yes | Required. The resource name of GitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Number of results to return in the list. Default to 20. |
| `pageToken` | query | string | no | Optional. Page start. |
| `refType` | query | string enum | yes | Required. Type of refs to fetch. Values: `REF_TYPE_UNSPECIFIED`, `TAG`, `BRANCH`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchPullRequest`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}:fetchPullRequest`
- Fetch Pull Request details from a Git repository link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PullRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the GitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |
| `pullRequestId` | query | string | yes | Required. The ID of the Pull Request. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchPullRequestList`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}:fetchPullRequestList`
- Fetches a list of Pull Requests from the remote repository.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchGitRepositoryLinkPullRequestListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The GitRepositoryLink resource name in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |
| `filter` | query | string | no | Optional. A filter expression that filters the pull requests returned in the response. Only a single equality comparison on `state` is supported, for example `state = "OPEN"`. Supported values are `OPEN`, `CLOSED`, and `MERGED`. `DECLINED` is only supported for SCM providers that support declining pull requests, and returns `INVALID_ARGUMENT` for GitHub, GitHub Enterprise, GitLab, and GitLab Enterprise. Other values or expressions return `INVALID_ARGUMENT`. Defaults to `state = "OPEN"` if unspecified. |
| `pageSize` | query | integer (int32) | no | Optional. Number of results to return in the list. Default is 20. Max is 100. A page may contain fewer than `page_size` results even when more results are available; use `next_page_token` to check for more pages. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `FetchGitRepositoryLinkPullRequestList` call. Provide this to retrieve the subsequent page. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchReadToken`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+gitRepositoryLink}:fetchReadToken`
- Fetches read token of a given gitRepositoryLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchReadTokenRequest`; Response: `FetchReadTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `gitRepositoryLink` | path | string | yes | Required. The resource name of the gitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.fetchReadWriteToken`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+gitRepositoryLink}:fetchReadWriteToken`
- Fetches read/write token of a given gitRepositoryLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchReadWriteTokenRequest`; Response: `FetchReadWriteTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `gitRepositoryLink` | path | string | yes | Required. The resource name of the gitRepositoryLink in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.get`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}`
- Gets details of a single GitRepositoryLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GitRepositoryLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+parent}/gitRepositoryLinks`
- Lists GitRepositoryLinks in a given project, location, and connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGitRepositoryLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListGitRepositoryLinksRequest. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.modifyPullRequest`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:modifyPullRequest`
- Modifies a Pull Request in the remote SCM repository associated with a GitRepositoryLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ModifyGitRepositoryLinkPullRequestRequest`; Response: `PullRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The GitRepositoryLink resource name in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.openPullRequest`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:openPullRequest`
- Opens a Pull Request in the remote SCM repository associated with a GitRepositoryLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OpenGitRepositoryLinkPullRequestRequest`; Response: `PullRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The GitRepositoryLink resource name in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.processBitbucketCloudWebhook`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:processBitbucketCloudWebhook`
- ProcessBitbucketCloudWebhook is called by the external Bitbucket Cloud instances for notifying events.
- Request: `ProcessBitbucketCloudWebhookRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The GitRepositoryLink where the webhook will be received. Format: `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.processBitbucketDataCenterWebhook`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:processBitbucketDataCenterWebhook`
- ProcessBitbucketDataCenterWebhook is called by the external Bitbucket Data Center instances for notifying events.
- Request: `ProcessBitbucketDataCenterWebhookRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The GitRepositoryLink where the webhook will be received. Format: `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.processGitLabEnterpriseWebhook`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:processGitLabEnterpriseWebhook`
- ProcessGitLabEnterpriseWebhook is called by the external GitLab Enterprise instances for notifying events.
- Request: `ProcessGitLabEnterpriseWebhookRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The GitRepositoryLink resource where the webhook will be received. Format: `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.gitRepositoryLinks.processGitLabWebhook`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:processGitLabWebhook`
- ProcessGitLabWebhook is called by the GitLab.com for notifying events.
- Request: `ProcessGitLabWebhookRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The GitRepositoryLink resource where the webhook will be received. Format: `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |

### `developerconnect.projects.locations.connections.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+parent}/connections`
- Lists Connections in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListConnectionsRequest |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `developerconnect.projects.locations.connections.patch`

- Versions: v1
- `PATCH https://developerconnect.googleapis.com/v1/{+name}`
- Updates the parameters of a single Connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the connection is not found a new connection will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input connection has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties). |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Connection resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.connections.processGitHubEnterpriseWebhook`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+parent}/connections:processGitHubEnterpriseWebhook`
- ProcessGitHubEnterpriseWebhook is called by the external GitHub Enterprise instances for notifying events.
- Request: `ProcessGitHubEnterpriseWebhookRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location where the webhook will be received. Format: `projects/*/locations/*`. |

### `developerconnect.projects.locations.get`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `developerconnect.projects.locations.insightsConfigs.create`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+parent}/insightsConfigs`
- Creates a new InsightsConfig in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InsightsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `insightsConfigId` | query | string | yes | Required. ID of the requesting InsightsConfig. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.insightsConfigs.delete`

- Versions: v1
- `DELETE https://developerconnect.googleapis.com/v1/{+name}`
- Deletes a single Insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Value for parent. |
| `etag` | query | string | no | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.insightsConfigs.deploymentEvents.get`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}`
- Gets a single Deployment Event.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DeploymentEvent`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment event to retrieve. Format: projects/{project}/locations/{location}/insightsConfigs/{insights_config}/deploymentEvents/{uuid} |

### `developerconnect.projects.locations.insightsConfigs.deploymentEvents.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+parent}/deploymentEvents`
- Lists Deployment Events in a given insights config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDeploymentEventsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent insights config that owns this collection of deployment events. Format: projects/{project}/locations/{location}/insightsConfigs/{insights_config} |
| `filter` | query | string | no | Optional. Filter expression that matches a subset of the DeploymentEvents. https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. Field to use to order the list of DeploymentEvents. Expects AIP-132 format "field_name asc" or "field_name desc", e.g. "deploy_time desc" Supported fields for ordering are: deploy_time, update_time. Currently, only sorting by a single field is supported. If this field is not provided, the list will be sorted by "deploy_time desc". For more details on the ordering syntax, see https://google.aip.dev/132#ordering. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of deployment events to return. The service may return fewer than this value. If unspecified, at most 50 deployment events will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListDeploymentEvents` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDeploymentEvents` must match the call that provided the page token. |

### `developerconnect.projects.locations.insightsConfigs.get`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}`
- Gets details of a single Insight.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `InsightsConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `developerconnect.projects.locations.insightsConfigs.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+parent}/insightsConfigs`
- Lists InsightsConfigs in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInsightsConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListInsightsConfigsRequest. |
| `filter` | query | string | no | Optional. Filtering results. See https://google.aip.dev/160 for more details. Filter string, adhering to the rules in https://google.aip.dev/160. List only InsightsConfigs matching the filter. If filter is empty, all InsightsConfigs are listed. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `developerconnect.projects.locations.insightsConfigs.patch`

- Versions: v1
- `PATCH https://developerconnect.googleapis.com/v1/{+name}`
- Updates the parameters of a single InsightsConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InsightsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the InsightsConfig. Format: projects/{project}/locations/{location}/insightsConfigs/{insightsConfig} |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the insightsConfig is not found a new insightsConfig will be created. In this situation `update_mask` is ignored. The creation will succeed only if the input insightsConfig has all the necessary information (e.g a github_config with both user_oauth_token and installation_id properties). |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request, but do not actually post it. |

### `developerconnect.projects.locations.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}/locations`
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

### `developerconnect.projects.locations.operations.cancel`

- Versions: v1
- `POST https://developerconnect.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `developerconnect.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://developerconnect.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `developerconnect.projects.locations.operations.get`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `developerconnect.projects.locations.operations.list`

- Versions: v1
- `GET https://developerconnect.googleapis.com/v1/{+name}/operations`
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

### Example request skeleton

Generated from the Discovery entry of `developerconnect.projects.locations.accountConnectors.fetchUserRepositories` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://developerconnect.googleapis.com/v1/{+accountConnector}:fetchUserRepositories"
```

## Notes

- Generated from the Discovery document(s) v1 of `developerconnect` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`developerconnect` v1, revision 20261025) also lists 43 endpoints of the form `https://developerconnect.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://developerconnect.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://developerconnect.asia-east1.rep.googleapis.com/`) and keep the path.
- Source: https://developerconnect.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
