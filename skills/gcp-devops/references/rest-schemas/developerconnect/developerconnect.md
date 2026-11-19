---
source: https://developerconnect.googleapis.com/$discovery/rest?version=v1
---

# Developer Connect API message schemas (developerconnect)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/developerconnect/`.

### `AccountConnector`

- AccountConnector encapsulates what a platform administrator needs to configure for users to connect to the service providers, which includes, among other fields, the OAuth client ID, client secret, and authorization and token endpoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Allows users to store small amounts of arbitrary data. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the accountConnector was created. |
| `customOauthConfig` | CustomOAuthConfig | Custom OAuth config. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Identifier. The resource name of the accountConnector, in the format `projects/{project}/locations/{location}/accountConnectors/{account_connector_id}`. |
| `oauthStartUri` | string | Output only. Start OAuth flow by clicking on this URL. |
| `providerOauthConfig` | ProviderOAuthConfig | Optional. Provider OAuth config. |
| `proxyConfig` | ProxyConfig | Optional. Configuration for the http and git proxy features. |
| `uid` | string | Output only. A system-assigned unique identifier for the Account Connector. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the accountConnector was updated. |

### `AddGitRepositoryLinkPullRequestCommentRequest`

- Request message for AddGitRepositoryLinkPullRequestComment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comment` | PullRequestComment | Required. The comment to add. |
| `pullRequestId` | string | Required. The ID of the Pull Request. |

### `AddGitRepositoryLinkPullRequestReviewCommentRequest`

- Request message for AddGitRepositoryLinkPullRequestReviewComment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comment` | PullRequestReviewComment | Required. The review comment to add. |
| `commitId` | string | Optional. The commit SHA to comment on. If not specified, defaults to the HEAD commit of the Pull Request. |
| `pullRequestId` | string | Required. The ID of the Pull Request. |

### `AppHubService`

- AppHubService represents the App Hub Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apphubService` | string | Required. Output only. Immutable. The name of the App Hub Service. Format: `projects/{project}/locations/{location}/applications/{application}/services/{service}`. |
| `criticality` | string | Output only. The criticality of the App Hub Service. |
| `environment` | string | Output only. The environment of the App Hub Service. |

### `AppHubWorkload`

- AppHubWorkload represents the App Hub Workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `criticality` | string | Output only. The criticality of the App Hub Workload. |
| `environment` | string | Output only. The environment of the App Hub Workload. |
| `workload` | string | Required. Output only. Immutable. The name of the App Hub Workload. Format: `projects/{project}/locations/{location}/applications/{application}/workloads/{workload}`. |

### `ArtifactConfig`

- The artifact config of the artifact that is deployed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googleArtifactAnalysis` | GoogleArtifactAnalysis | Optional. Set if the artifact metadata is stored in Artifact analysis. |
| `googleArtifactRegistry` | GoogleArtifactRegistry | Optional. Set if the artifact is stored in Artifact registry. |
| `uri` | string | Required. Immutable. The URI of the artifact that is deployed. e.g. `us-docker.pkg.dev/my-project/my-repo/image`. The URI does not include the tag / digest because it captures a lineage of artifacts. |

### `ArtifactDeployment`

- The ArtifactDeployment resource represents the deployment of the artifact within the InsightsConfig resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactAlias` | string | Output only. The artifact alias in the deployment spec, with Tag/SHA. e.g. us-docker.pkg.dev/my-project/my-repo/image:1.0.0 |
| `artifactReference` | string | Output only. The artifact that is deployed. |
| `containerStatusSummary` | string | Output only. The summary of container status of the artifact deployment. Format as `ContainerStatusState-Reason : restartCount` e.g. "Waiting-ImagePullBackOff : 3" |
| `deployTime` | string (google-datetime) | Output only. The time at which the deployment was deployed. |
| `id` | string | Output only. Unique identifier of `ArtifactDeployment`. |
| `sourceCodeUris` | array<string> | Output only. The URIs of the source code, if available. For Cloud Run source deploy for example: `gs://my-bucket/my-folder/1234567890.abcde-fdbe.zip#1234567890` |
| `sourceCommitUris` | array<string> | Output only. The source commits at which this artifact was built. Extracted from provenance. |
| `undeployTime` | string (google-datetime) | Output only. The time at which the deployment was undeployed, all artifacts are considered undeployed once this time is set. |

### `BasicAuthentication`

- Basic authentication with username and password.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `passwordSecretVersion` | string | The password SecretManager secret version to authenticate as. |
| `username` | string | Required. The username to authenticate as. |

### `BearerTokenAuthentication`

- Bearer token authentication with a token.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tokenSecretVersion` | string | Optional. The token SecretManager secret version to authenticate as. |

### `BitbucketCloudConfig`

- Configuration for connections to an instance of Bitbucket Cloud.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizerCredential` | UserCredential | Required. An access token with the minimum `repository`, `pullrequest` and `webhook` scope access. It can either be a workspace, project or repository access token. This is needed to create webhooks. It's recommended to use a system account to generate these credentials. |
| `readAuthorizerCredential` | UserCredential | Required. An access token with the minimum `repository` access. It can either be a workspace, project or repository access token. It's recommended to use a system account to generate the credentials. |
| `webhookSecretSecretVersion` | string | Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate and create webhooks. |
| `workspace` | string | Required. The Bitbucket Cloud Workspace ID to be connected to Google Cloud Platform. |

### `BitbucketDataCenterConfig`

- Configuration for connections to an instance of Bitbucket Data Center.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizerCredential` | UserCredential | Required. An http access token with the minimum `Repository admin` scope access. This is needed to create webhooks. It's recommended to use a system account to generate these credentials. |
| `hostUri` | string | Required. The URI of the Bitbucket Data Center host this connection is for. |
| `readAuthorizerCredential` | UserCredential | Required. An http access token with the minimum `Repository read` access. It's recommended to use a system account to generate the credentials. |
| `serverVersion` | string | Output only. Version of the Bitbucket Data Center server running on the `host_uri`. |
| `serviceDirectoryConfig` | ServiceDirectoryConfig | Optional. Configuration for using Service Directory to privately connect to a Bitbucket Data Center instance. This should only be set if the Bitbucket Data Center is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the Bitbucket Data Center will be made over the public internet. |
| `sslCaCertificate` | string | Optional. SSL certificate authority to trust when making requests to Bitbucket Data Center. |
| `webhookSecretSecretVersion` | string | Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks. |

### `BlameRange`

- BlameRange represents blame information for a range of lines.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commit` | SCMCommit | The commit metadata for this line range. |
| `firstLine` | integer (int32) | The 1-indexed starting line number of the range (inclusive). |
| `lastLine` | integer (int32) | The 1-indexed ending line number of the range (inclusive). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Connection`

- Message describing Connection object
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Allows clients to store small amounts of arbitrary data. |
| `bitbucketCloudConfig` | BitbucketCloudConfig | Configuration for connections to an instance of Bitbucket Clouds. |
| `bitbucketDataCenterConfig` | BitbucketDataCenterConfig | Configuration for connections to an instance of Bitbucket Data Center. |
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `cryptoKeyConfig` | CryptoKeyConfig | Optional. The crypto key configuration. This field is used by the Customer-Managed Encryption Keys (CMEK) feature. |
| `deleteTime` | string (google-datetime) | Output only. Delete timestamp. |
| `disabled` | boolean | Optional. If disabled is set to true, functionality is disabled for this connection. Repository based API methods and webhooks processing for repositories in this connection will be disabled. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `gitProxyConfig` | GitProxyConfig | Optional. Configuration for the Git proxy feature. Enabling the Git proxy allows clients to perform Git operations on the repositories linked in the connection. Learn more (https://docs.cloud.google.com/developer-connect/docs/configure-git-proxy). |
| `githubConfig` | GitHubConfig | Configuration for connections to github.com. |
| `githubEnterpriseConfig` | GitHubEnterpriseConfig | Configuration for connections to an instance of GitHub Enterprise. |
| `gitlabConfig` | GitLabConfig | Configuration for connections to gitlab.com. |
| `gitlabEnterpriseConfig` | GitLabEnterpriseConfig | Configuration for connections to an instance of GitLab Enterprise. |
| `httpConfig` | GenericHTTPEndpointConfig | Optional. Configuration for connections to an HTTP service provider. |
| `installationState` | InstallationState | Output only. Installation state of the Connection. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Identifier. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`. |
| `reconciling` | boolean | Output only. Set to true when the connection is being set up or updated in the background. |
| `secureSourceManagerInstanceConfig` | SecureSourceManagerInstanceConfig | Configuration for connections to an instance of Secure Source Manager. |
| `uid` | string | Output only. A system-assigned unique identifier for the Connection. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |

### `CryptoKeyConfig`

- The crypto key configuration. This field is used by the Customer-managed encryption keys (CMEK) feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyReference` | string | Required. The name of the key which is used to encrypt/decrypt customer data. For key in Cloud KMS, the key should be in the format of `projects/*/locations/*/keyRings/*/cryptoKeys/*`. |

### `CustomOAuthConfig`

- Message for a customized OAuth config.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authUri` | string | Required. Immutable. The OAuth2 authorization server URL. |
| `clientId` | string | Required. The client ID of the OAuth application. |
| `clientSecret` | string | Required. Input only. The client secret of the OAuth application. It will be provided as plain text, but encrypted and stored in developer connect. As INPUT_ONLY field, it will not be included in the output. |
| `hostUri` | string | Required. The host URI of the OAuth application. |
| `pkceDisabled` | boolean | Optional. Disable PKCE for this OAuth config. PKCE is enabled by default. |
| `scmProvider` | string enum | Required. The type of the SCM provider. Values: `SCM_PROVIDER_UNKNOWN`, `GITHUB_ENTERPRISE`, `GITLAB_ENTERPRISE`, `BITBUCKET_DATA_CENTER`. |
| `scopes` | array<string> | Required. The scopes to be requested during OAuth. |
| `serverVersion` | string | Output only. SCM server version installed at the host URI. |
| `serviceDirectoryConfig` | ServiceDirectoryConfig | Optional. Configuration for using Service Directory to connect to a private service. |
| `sslCaCertificate` | string | Optional. SSL certificate to use for requests to a private service. |
| `tokenUri` | string | Required. Immutable. The OAuth2 token request URL. |

### `DeploymentEvent`

- The DeploymentEvent resource represents the deployment of the artifact within the InsightsConfig resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactDeployments` | array<ArtifactDeployment> | Output only. The artifact deployments of the DeploymentEvent. Each artifact deployment contains the artifact uri and the runtime configuration uri. For GKE, this would be all the containers images that are deployed in the pod. |
| `createTime` | string (google-datetime) | Output only. The create time of the DeploymentEvent. |
| `deployTime` | string (google-datetime) | Output only. The time at which the DeploymentEvent was deployed. This would be the min of all ArtifactDeployment deploy_times. |
| `name` | string | Identifier. The name of the DeploymentEvent. This name is provided by Developer Connect insights. Format: projects/{project}/locations/{location}/insightsConfigs/{insights_config}/deploymentEvents/{uuid} |
| `runtimeConfig` | RuntimeConfig | Output only. The runtime configurations where the DeploymentEvent happened. |
| `runtimeDeploymentUri` | string | Output only. The runtime assigned URI of the DeploymentEvent. For GKE, this is the fully qualified replica set uri. e.g. container.googleapis.com/projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/apps/replicasets/{replica-set-id} For Cloud Run, this is the revision name. |
| `state` | string enum | Output only. The state of the DeploymentEvent. Values: `STATE_UNSPECIFIED`, `STATE_ACTIVE`, `STATE_INACTIVE`. |
| `undeployTime` | string (google-datetime) | Output only. The time at which the DeploymentEvent was undeployed, all artifacts are considered undeployed once this time is set. This would be the max of all ArtifactDeployment undeploy_times. If any ArtifactDeployment is still active (i.e. does not have an undeploy_time), this field will be empty. |
| `updateTime` | string (google-datetime) | Output only. The update time of the DeploymentEvent. |

### `DiffGitRepositoryLinkCommitResponse`

- Response message for DiffGitRepositoryLinkCommit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `files` | array<FileDiff> | The file diff extracted from the unified diff. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExchangeError`

- Message for representing an error from exchanging OAuth tokens.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | https://datatracker.ietf.org/doc/html/rfc6749#section-5.2 - error |
| `description` | string | https://datatracker.ietf.org/doc/html/rfc6749#section-5.2 - error_description |

### `FetchAccessTokenRequest`

- Message for fetching an OAuth access token.
- Version: v1

### `FetchAccessTokenResponse`

- Message for responding to getting an OAuth access token.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exchangeError` | ExchangeError | The error resulted from exchanging OAuth tokens from the service provider. |
| `expirationTime` | string (google-datetime) | Expiration timestamp. Can be empty if unknown or non-expiring. |
| `scopes` | array<string> | The scopes of the access token. |
| `token` | string | The token content. |

### `FetchGitHubInstallationsResponse`

- Response of fetching github installations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `installations` | array<Installation> | List of installations available to the OAuth user (for github.com) or all the installations (for GitHub enterprise). |

### `FetchGitRefsResponse`

- Response for fetching git refs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `refNames` | array<string> | Name of the refs fetched. |

### `FetchGitRepositoryLinkCommitListResponse`

- Response message for FetchGitRepositoryLinkCommitList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commits` | array<SCMCommit> | The list of commit metadata. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `FetchGitRepositoryLinkCommitResponse`

- Response message for FetchGitRepositoryLinkCommit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commit` | SCMCommit | The commit metadata. |
| `files` | array<FileDiff> | List of file changes and patch diffs. Omitted when view is `BASIC`. Patch diffs (`FileDiff.patch`) are only populated when `path_filters` is specified in the request. |

### `FetchGitRepositoryLinkFileBlameResponse`

- Response message for FetchGitRepositoryLinkFileBlame.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ranges` | array<BlameRange> | The list of blame ranges for the file. |

### `FetchGitRepositoryLinkPullRequestListResponse`

- Response message for FetchGitRepositoryLinkPullRequestList.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `pullRequests` | array<PullRequest> | The list of pull requests. |

### `FetchLinkableGitRepositoriesResponse`

- Response message for FetchLinkableGitRepositories.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `linkableGitRepositories` | array<LinkableGitRepository> | The git repositories that can be linked to the connection. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |

### `FetchReadTokenRequest`

- Message for fetching SCM read token.
- Version: v1

### `FetchReadTokenResponse`

- Message for responding to get read token.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expirationTime` | string (google-datetime) | Expiration timestamp. Can be empty if unknown or non-expiring. |
| `gitUsername` | string | The git_username to specify when making a git clone with the token. For example, for GitHub GitRepositoryLinks, this would be "x-access-token" |
| `token` | string | The token content. |

### `FetchReadWriteTokenRequest`

- Message for fetching SCM read/write token.
- Version: v1

### `FetchReadWriteTokenResponse`

- Message for responding to get read/write token.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expirationTime` | string (google-datetime) | Expiration timestamp. Can be empty if unknown or non-expiring. |
| `gitUsername` | string | The git_username to specify when making a git clone with the token. For example, for GitHub GitRepositoryLinks, this would be "x-access-token" |
| `token` | string | The token content. |

### `FetchUserRepositoriesResponse`

- Response message for FetchUserRepositories.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `userRepos` | array<UserRepository> | The repositories that the user can access with this account connector. |

### `FieldVisibility`

- Visibility rules for individual tool parameters (fields). This allows producers to hide specific fields in tools/list and tools/call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `restriction` | string | The visibility restriction labels for this field (comma-separated). |
| `selector` | string | The name of the parameter in the input_schema or output_schema. |

### `FileDiff`

- Message for a file diff.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `patch` | string | Standard unified diff patch hunk for the file. Only populated when `path_filters` is specified in the request; otherwise empty. |
| `path` | string | Relative path to the file in the repository. |
| `status` | string | Status of change: "ADDED", "MODIFIED", "REMOVED", "RENAMED". |

### `FinishOAuthResponse`

- Message for responding to finishing an OAuth flow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exchangeError` | ExchangeError | The error resulted from exchanging OAuth tokens from the service provider. |

### `GKEWorkload`

- GKEWorkload represents the Google Kubernetes Engine runtime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Required. Immutable. The name of the GKE cluster. Format: `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `deployment` | string | Output only. The name of the GKE deployment. Format: `projects/{project}/locations/{location}/clusters/{cluster}/namespaces/{namespace}/deployments/{deployment}`. |

### `GenericHTTPEndpointConfig`

- Defines the configuration for connections to an HTTP service provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `basicAuthentication` | BasicAuthentication | Optional. Basic authentication with username and password. |
| `bearerTokenAuthentication` | BearerTokenAuthentication | Optional. Bearer token authentication with a token. |
| `hostUri` | string | Required. Immutable. The service provider's https endpoint. |
| `serviceDirectoryConfig` | ServiceDirectoryConfig | Optional. Configuration for using Service Directory to privately connect to a HTTP service provider. This should only be set if the Http service provider is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the HTTP service provider will be made over the public internet. |
| `sslCaCertificate` | string | Optional. The SSL certificate to use for requests to the HTTP service provider. |

### `GitHubConfig`

- Configuration for connections to github.com.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appInstallationId` | string (int64) | Optional. GitHub App installation id. |
| `authorizerCredential` | OAuthCredential | Optional. OAuth credential of the account that authorized the GitHub App. It is recommended to use a robot account instead of a human user account. The OAuth token must be tied to the GitHub App of this config. |
| `githubApp` | string enum | Required. Immutable. The GitHub Application that was installed to the GitHub user or organization. Values: `GIT_HUB_APP_UNSPECIFIED`, `DEVELOPER_CONNECT`, `FIREBASE`, `GEMINI_CODE_ASSIST`, `DATAFORM`. |
| `installationUri` | string | Output only. The URI to navigate to in order to manage the installation associated with this GitHubConfig. |

### `GitHubEnterpriseConfig`

- Configuration for connections to an instance of GitHub Enterprise.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appId` | string (int64) | Optional. ID of the GitHub App created from the manifest. |
| `appInstallationId` | string (int64) | Optional. ID of the installation of the GitHub App. |
| `appSlug` | string | Output only. The URL-friendly name of the GitHub App. |
| `hostUri` | string | Required. The URI of the GitHub Enterprise host this connection is for. |
| `installationUri` | string | Output only. The URI to navigate to in order to manage the installation associated with this GitHubEnterpriseConfig. |
| `organization` | string | Optional. Immutable. GitHub Enterprise organization in which the GitHub App is created. |
| `privateKeySecretVersion` | string | Optional. SecretManager resource containing the private key of the GitHub App, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). |
| `serverVersion` | string | Output only. GitHub Enterprise version installed at the host_uri. |
| `serviceDirectoryConfig` | ServiceDirectoryConfig | Optional. Configuration for using Service Directory to privately connect to a GitHub Enterprise server. This should only be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitHub Enterprise server will be made over the public internet. |
| `sslCaCertificate` | string | Optional. SSL certificate to use for requests to GitHub Enterprise. |
| `webhookSecretSecretVersion` | string | Optional. SecretManager resource containing the webhook secret of the GitHub App, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). |

### `GitLabConfig`

- Configuration for connections to gitlab.com.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizerCredential` | UserCredential | Required. A GitLab personal access token with the minimum `api` scope access and a minimum role of `maintainer`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. |
| `readAuthorizerCredential` | UserCredential | Required. A GitLab personal access token with the minimum `read_api` scope access and a minimum role of `reporter`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. |
| `webhookSecretSecretVersion` | string | Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks. |

### `GitLabEnterpriseConfig`

- Configuration for connections to an instance of GitLab Enterprise.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizerCredential` | UserCredential | Required. A GitLab personal access token with the minimum `api` scope access and a minimum role of `maintainer`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. |
| `hostUri` | string | Required. The URI of the GitLab Enterprise host this connection is for. |
| `readAuthorizerCredential` | UserCredential | Required. A GitLab personal access token with the minimum `read_api` scope access and a minimum role of `reporter`. The GitLab Projects visible to this Personal Access Token will control which Projects Developer Connect has access to. |
| `serverVersion` | string | Output only. Version of the GitLab Enterprise server running on the `host_uri`. |
| `serviceDirectoryConfig` | ServiceDirectoryConfig | Optional. Configuration for using Service Directory to privately connect to a GitLab Enterprise instance. This should only be set if the GitLab Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitLab Enterprise server will be made over the public internet. |
| `sslCaCertificate` | string | Optional. SSL Certificate Authority certificate to use for requests to GitLab Enterprise instance. |
| `webhookSecretSecretVersion` | string | Required. Immutable. SecretManager resource containing the webhook secret of a GitLab project, formatted as `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). This is used to validate webhooks. |

### `GitProxyConfig`

- Configuration for proxies. For legacy reasons, this message is named `GitProxyConfig`, but it includes settings for both Git and HTTP proxy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Setting this to true allows the Git proxy to be used for performing Git operations on the repositories linked in the connection. |
| `httpProxyBaseUri` | string | Output only. The base URI for the HTTP proxy endpoint. Has the format `https://{generatedID}-c-h-{shortRegion}.developerconnect.dev` Populated only when enabled is set to true. This endpoint is used by other Google services that integrate with Developer Connect. |

### `GitRepositoryLink`

- Message describing the GitRepositoryLink object
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Allows clients to store small amounts of arbitrary data. |
| `cloneUri` | string | Required. Git Clone URI. |
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `deleteTime` | string (google-datetime) | Output only. Delete timestamp. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `gitProxyUri` | string | Output only. URI to access the linked repository through the Git proxy. This field is only populated if the Git proxy is enabled for the connection. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Identifier. Resource name of the repository, in the format `projects/*/locations/*/connections/*/gitRepositoryLinks/*`. |
| `reconciling` | boolean | Output only. Set to true when the connection is being set up or updated in the background. |
| `uid` | string | Output only. A system-assigned unique identifier for the GitRepositoryLink. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |
| `webhookId` | string | Output only. External ID of the webhook created for the repository. |

### `GoogleArtifactAnalysis`

- Google Artifact Analysis configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. The project id of the project where the provenance is stored. |

### `GoogleArtifactRegistry`

- Google Artifact Registry configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Required. Immutable. The name of the artifact registry package. |
| `projectId` | string | Required. The host project of Artifact Registry. |

### `GoogleCloudRun`

- GoogleCloudRun represents the Cloud Run runtime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceUri` | string | Required. Immutable. The name of the Cloud Run service. Format: `projects/{project}/locations/{location}/services/{service}`. |

### `HttpBody`

- Message that represents an arbitrary HTTP body. It should only be used for payload formats that can't be represented as JSON, such as raw binary or an HTML page. This message can be used both in streaming and non-streaming API methods in the request as well as the response. It can be used as a top-level request field, which is convenient if one wants to extract parameters from either the URL or HTTP template into the request fields and also want access to the raw HTTP body. Example: message GetResourceRequest { // A unique request id. string request_id = 1; // The raw HTTP body is bound to this field. google.api.HttpBody http_body = 2; } service ResourceService { rpc GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); } Example with streaming methods: service CaldavService { rpc GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); rpc UpdateCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); } Use of this type only changes how the request and response bodies are handled, all other features will continue to work unchanged.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contentType` | string | The HTTP Content-Type header value specifying the content type of the body. |
| `data` | string (byte) | The HTTP request/response body as raw binary. |
| `extensions` | array<object> | Application specific response metadata. Must be set in the first response for streaming APIs. |

### `InsightsConfig`

- The InsightsConfig resource is the core configuration object to capture events from your Software Development Lifecycle. It acts as the central hub for managing how Developer Connect understands your application, its runtime environments, and the artifacts deployed within them.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User specified annotations. See https://google.aip.dev/148#annotations for more details such as format and size limitations. |
| `appHubApplication` | string | Optional. The name of the App Hub Application. Format: projects/{project}/locations/{location}/applications/{application} |
| `artifactConfigs` | array<ArtifactConfig> | Optional. The artifact configurations of the artifacts that are deployed. |
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `errors` | array<Status> | Output only. Any errors that occurred while setting up the InsightsConfig. Each error will be in the format: `field_name: error_message`, e.g. GetAppHubApplication: Permission denied while getting App Hub application. Please grant permissions to the P4SA. |
| `labels` | object | Optional. Set of labels associated with an InsightsConfig. |
| `name` | string | Identifier. The name of the InsightsConfig. Format: projects/{project}/locations/{location}/insightsConfigs/{insightsConfig} |
| `projects` | Projects | Optional. The projects to track with the InsightsConfig. |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of InsightsConfig does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `runtimeConfigs` | array<RuntimeConfig> | Output only. The runtime configurations where the application is deployed. |
| `state` | string enum | Optional. Output only. The state of the InsightsConfig. Values: `STATE_UNSPECIFIED`, `PENDING`, `COMPLETE`, `ERROR`. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |

### `Installation`

- Represents an installation of the GitHub App.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string (int64) | ID of the installation in GitHub. |
| `name` | string | Name of the GitHub user or organization that owns this installation. |
| `type` | string | Either "user" or "organization". |

### `InstallationState`

- Describes stage and necessary actions to be taken by the user to complete the installation. Used for GitHub and GitHub Enterprise based connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actionUri` | string | Output only. Link to follow for next action. Empty string if the installation is already complete. |
| `message` | string | Output only. Message of what the user should do next to continue the installation. Empty string if the installation is already complete. |
| `stage` | string enum | Output only. Current step of the installation process. Values: `STAGE_UNSPECIFIED`, `PENDING_CREATE_APP`, `PENDING_USER_OAUTH`, `PENDING_INSTALL_APP`, `COMPLETE`. |

### `LinkableGitRepository`

- LinkableGitRepository represents a git repository that can be linked to a connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloneUri` | string | The clone uri of the repository. |

### `ListAccountConnectorsResponse`

- Message for response to listing AccountConnectors
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountConnectors` | array<AccountConnector> | The list of AccountConnectors |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListConnectionsResponse`

- Message for response to listing Connections
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connections` | array<Connection> | The list of Connections. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDeploymentEventsResponse`

- Response to listing DeploymentEvents.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentEvents` | array<DeploymentEvent> | The list of DeploymentEvents. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListGitRepositoryLinksResponse`

- Message for response to listing GitRepositoryLinks
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gitRepositoryLinks` | array<GitRepositoryLink> | The list of GitRepositoryLinks. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInsightsConfigsResponse`

- Request for response to listing InsightsConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `insightsConfigs` | array<InsightsConfig> | The list of InsightsConfigs. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListUsersResponse`

- Message for response to listing Users
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `users` | array<User> | The list of Users |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `McpToolVisibility`

- Profile describing the visibility restriction of an MCP tool. Key: "google.com/tool.profiles/visibility.restriction"
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldVisibility` | array<FieldVisibility> | A list of field-level visibility restrictions. |
| `visibilityEnforcementStrategy` | string enum | The strategy used to enforce visibility restrictions. DO NOT USE. This field is not yet implemented. Values: `VISIBILITY_ENFORCEMENT_STRATEGY_UNSPECIFIED`, `COMBINE`, `OVERRIDE`. |
| `visibilityRestriction` | string | The visibility restriction labels for the tool itself (e.g., "PRODUCER_DEFINED_PREVIEW"). Multiple labels can be provided as a comma-separated string. |

### `ModifyGitRepositoryLinkPullRequestRequest`

- Message for modifying SCM Pull Request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseRef` | string | Optional. The target branch to merge into. |
| `body` | string | Optional. The body description of the Pull Request. |
| `pullRequestId` | string | Required. The SCM-specific pull request identifier (for example, "45"). |
| `state` | string enum | Optional. The state of the Pull Request. Values: `STATE_UNSPECIFIED`, `OPEN`, `CLOSED`. |
| `title` | string | Optional. The title of the Pull Request. |

### `OAuthCredential`

- Represents an OAuth token of the account that authorized the Connection, and associated metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `oauthTokenSecretVersion` | string | Required. A SecretManager resource containing the OAuth token that authorizes the connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). |
| `username` | string | Output only. The username associated with this token. |

### `OpenGitRepositoryLinkPullRequestRequest`

- Message for opening SCM Pull Request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pullRequest` | PullRequest | Required. The Pull Request details to open. Input fields used: title, body, head_ref, base_ref. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `ProcessBitbucketCloudWebhookRequest`

- RPC request object accepted by the ProcessBitbucketCloudWebhook RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | HttpBody | Required. HTTP request body. |

### `ProcessBitbucketDataCenterWebhookRequest`

- RPC request object accepted by the ProcessBitbucketDataCenterWebhook RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | HttpBody | Required. HTTP request body. |

### `ProcessGitHubEnterpriseWebhookRequest`

- RPC request object accepted by the ProcessGitHubEnterpriseWebhook RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | HttpBody | Required. HTTP request body. |

### `ProcessGitLabEnterpriseWebhookRequest`

- RPC request object accepted by the ProcessGitLabEnterpriseWebhook RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | HttpBody | Required. HTTP request body. |

### `ProcessGitLabWebhookRequest`

- RPC request object accepted by the ProcessGitLabWebhook RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | HttpBody | Required. HTTP request body. |

### `Projects`

- Projects represents the projects to track with the InsightsConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectIds` | array<string> | Optional. The project IDs. Format: {project} |

### `ProviderOAuthConfig`

- ProviderOAuthConfig is the OAuth config for a provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scopes` | array<string> | Required. User selected scopes to apply to the Oauth config In the event of changing scopes, user records under AccountConnector will be deleted and users will re-auth again. |
| `systemProviderId` | string enum | Optional. Immutable. Developer Connect provided OAuth. Values: `SYSTEM_PROVIDER_UNSPECIFIED`, `GITHUB`, `GITLAB`, `GOOGLE`, `SENTRY`, `ROVO`, `NEW_RELIC`, `DATASTAX`, `DYNATRACE`, `BITBUCKET_CLOUD`. |

### `ProxyConfig`

- The proxy configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Setting this to true allows the git and http proxies to perform actions on behalf of the user configured under the account connector. |
| `httpProxyBaseUri` | string | Output only. The base URI for the HTTP proxy endpoint. Has the format `https://{generatedID}-a-h-{shortRegion}.developerconnect.dev` Populated only when `enabled` is set to `true`. This endpoint is used by other Google services that integrate with Developer Connect. |

### `PullRequest`

- Message representing a SCM Pull Request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `author` | string | Output only. The username of the author. |
| `baseRef` | string | Required. The target commit SHA of the base branch. |
| `body` | string | Optional. The body description of the PR. |
| `closeTime` | string (google-datetime) | Output only. When the PR was closed. |
| `createTime` | string (google-datetime) | Output only. When the PR was created. |
| `declineTime` | string (google-datetime) | Output only. When the PR was declined. Only set for SCM providers that support declining pull requests. Never set for GitHub, GitHub Enterprise, GitLab, or GitLab Enterprise, where a pull request closed without being merged is `CLOSED`. |
| `headRef` | string | Required. The source commit SHA of the head branch. |
| `htmlUrl` | string | Output only. The HTML URL of the pull request on the SCM provider. |
| `id` | string | Required. The ID of the PR. |
| `mergeTime` | string (google-datetime) | Output only. When the PR was merged. |
| `mergeability` | string enum | Output only. The mergeability state of the pull request. Values: `MERGEABILITY_UNSPECIFIED`, `MERGEABLE`, `CONFLICTING`, `COMPUTING`. |
| `state` | string enum | Output only. The current state of the PR. Values: `STATE_UNSPECIFIED`, `OPEN`, `CLOSED`, `MERGED`, `DECLINED`. |
| `title` | string | Required. The title of the PR. |
| `updateTime` | string (google-datetime) | Output only. When the PR was updated. |

### `PullRequestComment`

- Message representing a SCM Pull Request Comment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `author` | string | Output only. The username of the author. |
| `body` | string | Required. The body of the comment. |
| `createTime` | string (google-datetime) | Output only. When the comment was created. |
| `id` | string | Output only. The ID of the comment. |
| `updateTime` | string (google-datetime) | Output only. When the comment was updated. |

### `PullRequestReviewComment`

- Message representing a SCM Pull Request Review Comment (inline on diff).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `author` | string | Output only. The username of the author. |
| `body` | string | Required. The body of the comment. |
| `commitId` | string | Output only. The commit SHA the comment was actually applied to. |
| `createTime` | string (google-datetime) | Output only. When the comment was created. |
| `firstLine` | integer (int32) | Optional. The first line of the comment range (inclusive). If not specified, the comment applies only to the `last_line`. |
| `id` | string | Output only. The ID of the comment. |
| `lastLine` | integer (int32) | Required. The last line of the comment range (inclusive). If `first_line` is not specified, the comment applies only to this line. |
| `path` | string | Required. The file path to comment on. |
| `side` | string enum | Optional. The side of the diff to comment on. Defaults to HEAD. Values: `DIFF_SIDE_UNSPECIFIED`, `BASE`, `HEAD`. |
| `updateTime` | string (google-datetime) | Output only. When the comment was updated. |

### `RuntimeConfig`

- RuntimeConfig represents the runtimes where the application is deployed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appHubService` | AppHubService | Output only. App Hub Service. |
| `appHubWorkload` | AppHubWorkload | Output only. App Hub Workload. |
| `gkeWorkload` | GKEWorkload | Output only. Google Kubernetes Engine runtime. |
| `googleCloudRun` | GoogleCloudRun | Output only. Cloud Run runtime. |
| `state` | string enum | Output only. The state of the Runtime. Values: `STATE_UNSPECIFIED`, `LINKED`, `UNLINKED`. |
| `uri` | string | Required. Immutable. The URI of the runtime configuration. For GKE, this is the cluster name. For Cloud Run, this is the service name. |

### `SCMCommit`

- SCMCommit represents commit metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `author` | string | The author's display name. |
| `authorEmail` | string | The author's email address. |
| `commitTime` | string (google-datetime) | Timestamp when the commit was authored. |
| `message` | string | Commit message text. |
| `sha` | string | Full 40-character SCM commit SHA. |
| `url` | string | The SCM provider's HTML URL link for this commit. |

### `SecureSourceManagerInstanceConfig`

- Configuration for connections to Secure Source Manager instance
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instance` | string | Required. Immutable. Secure Source Manager instance resource, formatted as `projects/*/locations/*/instances/*` |

### `ServiceDirectoryConfig`

- ServiceDirectoryConfig represents Service Directory configuration for a connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `service` | string | Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}. |

### `StartOAuthResponse`

- Message for responding to starting an OAuth flow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authUri` | string | The authorization server URL to the OAuth flow of the service provider. |
| `clientId` | string | The client ID to the OAuth App of the service provider. |
| `codeChallenge` | string | Please refer to https://datatracker.ietf.org/doc/html/rfc7636#section-4.1 |
| `codeChallengeMethod` | string | Please refer to https://datatracker.ietf.org/doc/html/rfc7636#section-4.2 |
| `scopes` | array<string> | The list of scopes requested by the application. |
| `systemProviderId` | string enum | The ID of the system provider. Values: `SYSTEM_PROVIDER_UNSPECIFIED`, `GITHUB`, `GITLAB`, `GOOGLE`, `SENTRY`, `ROVO`, `NEW_RELIC`, `DATASTAX`, `DYNATRACE`, `BITBUCKET_CLOUD`. |
| `ticket` | string | The ticket to be used for post processing the callback from the service provider. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `User`

- User represents a user connected to the service providers through a AccountConnector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the user was created. |
| `displayName` | string | Output only. Developer Connect automatically converts user identity to some human readable description, e.g., email address. |
| `lastTokenRequestTime` | string (google-datetime) | Output only. The timestamp when the token was last requested. |
| `name` | string | Identifier. Resource name of the user, in the format `projects/*/locations/*/accountConnectors/*/users/*`. |

### `UserCredential`

- Represents a personal access token that authorized the Connection, and associated metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `userTokenSecretVersion` | string | Required. A SecretManager resource containing the user token that authorizes the Developer Connect connection. Format: `projects/*/secrets/*/versions/*` or `projects/*/locations/*/secrets/*/versions/*` (if regional secrets are supported in that location). |
| `username` | string | Output only. The username associated with this token. |

### `UserRepository`

- A user repository that can be linked to the account connector. Consists of the repo name and the git proxy URL to forward requests to this repo.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloneUri` | string | Output only. The git clone URL of the repo. For example: https://github.com/myuser/myrepo.git |
| `displayName` | string | Output only. The user friendly repo name (e.g., myuser/myrepo) |
| `gitProxyUri` | string | Output only. The Git proxy URL for this repo. For example: https://us-west1-git.developerconnect.dev/a/my-proj/my-ac/myuser/myrepo.git. Populated only when `proxy_config.enabled` is set to `true` in the Account Connector. This URL is used by other Google services that integrate with Developer Connect. |

### Shape of `AccountConnector`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "annotations": "object",
  "createTime": "string (google-datetime)",
  "customOauthConfig": "CustomOAuthConfig",
  "etag": "string",
  "labels": "object",
  "name": "string",
  "oauthStartUri": "string",
  "providerOauthConfig": "ProviderOAuthConfig",
  "proxyConfig": "ProxyConfig",
  "uid": "string",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `developerconnect` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the `ListInsightsConfigsResponse` schema is described as "Request for response to listing InsightsConfigs.", but it is the response message of `developerconnect.projects.locations.insightsConfigs.list` (the method's `response` in the Discovery document), not a request.
- Source: https://developerconnect.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
