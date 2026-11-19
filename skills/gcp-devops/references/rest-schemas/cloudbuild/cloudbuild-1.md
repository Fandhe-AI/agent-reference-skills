---
source: https://cloudbuild.googleapis.com/$discovery/rest?version=v2
---

# Cloud Build API message schemas (cloudbuild) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudbuild/`.

### `ApprovalConfig`

- ApprovalConfig describes configuration for manual approval of a build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalRequired` | boolean | Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. |

### `ApprovalResult`

- ApprovalResult describes the decision and associated metadata of a manual approval of a build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalTime` | string (google-datetime) | Output only. The time when the approval decision was made. |
| `approverAccount` | string | Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. |
| `comment` | string | Optional. An optional comment for this manual approval result. |
| `decision` | string enum | Required. The decision of this manual approval. Values: `DECISION_UNSPECIFIED`, `APPROVED`, `REJECTED`. |
| `url` | string | Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. |

### `ApproveBuildRequest`

- Request to approve or reject a pending build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalResult` | ApprovalResult | Approval decision and metadata. |

### `ArtifactObjects`

- Files in the workspace to upload to Cloud Storage upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. |
| `paths` | array<string> | Path globs used to match files in the build's workspace. |
| `timing` | TimeSpan | Output only. Stores timing information for pushing all artifact objects. |

### `ArtifactResult`

- An artifact that was uploaded during a build. This is a single record in the artifact manifest JSON file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileHash` | array<FileHashes> | The file hash of the artifact. |
| `location` | string | The path of an artifact in a Cloud Storage bucket, with the generation number. For example, `gs://mybucket/path/to/output.jar#generation`. |

### `Artifacts`

- Artifacts produced by a build that should be uploaded upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `genericArtifacts` | array<GenericArtifact> | Optional. A list of generic artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. If any artifacts fail to be pushed, the build is marked FAILURE. |
| `goModules` | array<GoModule> | Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. |
| `images` | array<string> | A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. |
| `mavenArtifacts` | array<MavenArtifact> | A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. |
| `npmPackages` | array<NpmPackage> | A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. |
| `objects` | ArtifactObjects | A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. |
| `oci` | array<Oci> | Optional. A list of OCI images to be uploaded to Artifact Registry upon successful completion of all build steps. OCI images in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any images fail to be pushed, the build is marked FAILURE. |
| `pythonPackages` | array<PythonPackage> | A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `BatchCreateBitbucketServerConnectedRepositoriesRequest`

- RPC request object accepted by BatchCreateBitbucketServerConnectedRepositories RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requests` | array<CreateBitbucketServerConnectedRepositoryRequest> | Required. Requests to connect Bitbucket Server repositories. |

### `BatchCreateBitbucketServerConnectedRepositoriesResponse`

- Response of BatchCreateBitbucketServerConnectedRepositories RPC method including all successfully connected Bitbucket Server repositories.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConnectedRepositories` | array<BitbucketServerConnectedRepository> | The connected Bitbucket Server repositories. |

### `BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata`

- Metadata for `BatchCreateBitbucketServerConnectedRepositories` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `config` | string | The name of the `BitbucketServerConfig` that added connected repositories. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` |
| `createTime` | string (google-datetime) | Time the operation was created. |

### `BatchCreateRepositoriesRequest`

- Message for creating repositoritories in batch.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `requests` | array<CreateRepositoryRequest> | Required. The request messages specifying the repositories to create. |

### `BatchCreateRepositoriesResponse`

- Message for response of creating repositories in batch.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `repositories` | array<Repository> | Repository resources created. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BitbucketCloudConfig`

- Configuration for connections to Bitbucket Cloud.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authorizerCredential` | UserCredential | Required. An access token with the `webhook`, `repository`, `repository:admin` and `pullrequest` scope access. It can be either a workspace, project or repository access token. It's recommended to use a system account to generate these credentials. |
| `readAuthorizerCredential` | UserCredential | Required. An access token with the `repository` access. It can be either a workspace, project or repository access token. It's recommended to use a system account to generate the credentials. |
| `webhookSecretSecretVersion` | string | Required. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*`. |
| `workspace` | string | Required. The Bitbucket Cloud Workspace ID to be connected to Google Cloud Platform. |

### `BitbucketDataCenterConfig`

- Configuration for connections to Bitbucket Data Center.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authorizerCredential` | UserCredential | Required. A http access token with the `REPO_ADMIN` scope access. |
| `hostUri` | string | Required. The URI of the Bitbucket Data Center instance or cluster this connection is for. |
| `readAuthorizerCredential` | UserCredential | Required. A http access token with the `REPO_READ` access. |
| `serverVersion` | string | Output only. Version of the Bitbucket Data Center running on the `host_uri`. |
| `serviceDirectoryConfig` | GoogleDevtoolsCloudbuildV2ServiceDirectoryConfig | Optional. Configuration for using Service Directory to privately connect to a Bitbucket Data Center. This should only be set if the Bitbucket Data Center is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the Bitbucket Data Center will be made over the public internet. |
| `sslCa` | string | Optional. SSL certificate to use for requests to the Bitbucket Data Center. |
| `webhookSecretSecretVersion` | string | Required. Immutable. SecretManager resource containing the webhook secret used to verify webhook events, formatted as `projects/*/secrets/*/versions/*`. |

### `BitbucketServerConfig`

- BitbucketServerConfig represents the configuration for a Bitbucket Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiKey` | string | Required. Immutable. API Key that will be attached to webhook. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig. |
| `connectedRepositories` | array<BitbucketServerRepositoryId> | Output only. Connected Bitbucket Server repositories for this config. |
| `createTime` | string (google-datetime) | Time when the config was created. |
| `hostUri` | string | Required. Immutable. The URI of the Bitbucket Server host. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig. |
| `name` | string | Identifier. The resource name for the config. |
| `peeredNetwork` | string | Optional. The network to be used when reaching out to the Bitbucket Server instance. The VPC network must be enabled for private service connection. This should be set if the Bitbucket Server instance is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the Bitbucket Server instance will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project. |
| `peeredNetworkIpRange` | string | Immutable. IP range within the peered network. This is specified in CIDR notation with a slash and the subnet prefix size. You can optionally specify an IP address before the subnet prefix value. e.g. `192.168.0.0/29` would specify an IP range starting at 192.168.0.0 with a 29 bit prefix size. `/16` would specify a prefix size of 16 bits, with an automatically determined IP within the peered VPC. If unspecified, a value of `/24` will be used. The field only has an effect if peered_network is set. |
| `secrets` | BitbucketServerSecrets | Required. Secret Manager secrets needed by the config. |
| `sslCa` | string | Optional. SSL certificate to use for requests to Bitbucket Server. The format should be PEM format but the extension can be one of .pem, .cer, or .crt. |
| `username` | string | Username of the account Cloud Build will use on Bitbucket Server. |
| `webhookKey` | string | Output only. UUID included in webhook requests. The UUID is used to look up the corresponding config. |

### `BitbucketServerConnectedRepository`

- / BitbucketServerConnectedRepository represents a connected Bitbucket Server / repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parent` | string | The name of the `BitbucketServerConfig` that added connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` |
| `repo` | BitbucketServerRepositoryId | The Bitbucket Server repositories to connect. |
| `status` | Status | Output only. The status of the repo connection request. |

### `BitbucketServerRepository`

- BitbucketServerRepository represents a repository hosted on a Bitbucket Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `browseUri` | string | Link to the browse repo page on the Bitbucket Server instance. |
| `description` | string | Description of the repository. |
| `displayName` | string | Display name of the repository. |
| `name` | string | The resource name of the repository. |
| `repoId` | BitbucketServerRepositoryId | Identifier for a repository hosted on a Bitbucket Server. |

### `BitbucketServerRepositoryId`

- BitbucketServerRepositoryId identifies a specific repository hosted on a Bitbucket Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectKey` | string | Required. Identifier for the project storing the repository. |
| `repoSlug` | string | Required. Identifier for the repository. |
| `webhookId` | integer (int32) | Output only. The ID of the webhook that was created for receiving events from this repo. We only create and manage a single webhook for each repo. |

### `BitbucketServerSecrets`

- BitbucketServerSecrets represents the secrets in Secret Manager for a Bitbucket Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminAccessTokenVersionName` | string | Required. The resource name for the admin access token's secret version. |
| `readAccessTokenVersionName` | string | Required. The resource name for the read access token's secret version. |
| `webhookSecretVersionName` | string | Required. Immutable. The resource name for the webhook secret's secret version. Once this field has been set, it cannot be changed. If you need to change it, please create another BitbucketServerConfig. |

### `BitbucketServerTriggerConfig`

- BitbucketServerTriggerConfig describes the configuration of a trigger that creates a build whenever a Bitbucket Server event is received.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConfig` | BitbucketServerConfig | Output only. The BitbucketServerConfig specified in the bitbucket_server_config_resource field. |
| `bitbucketServerConfigResource` | string | Required. The Bitbucket server config resource that this trigger config maps to. |
| `projectKey` | string | Required. Key of the project that the repo is in. For example: The key for https://mybitbucket.server/projects/TEST/repos/test-repo is "TEST". |
| `pullRequest` | PullRequestFilter | Filter to match changes in pull requests. |
| `push` | PushFilter | Filter to match changes in refs like branches, tags. |
| `repoSlug` | string | Required. Slug of the repository. A repository slug is a URL-friendly version of a repository name, automatically generated by Bitbucket for use in the URL. For example, if the repository name is 'test repo', in the URL it would become 'test-repo' as in https://mybitbucket.server/projects/TEST/repos/test-repo. |

### `Build`

- A build resource in the Cloud Build API. At a high level, a `Build` describes where to find source code, how to build it (for example, the builder image to run on the source), and where to store the built artifacts. Fields can include the following variables, which will be expanded when the build is created: - $PROJECT_ID: the project ID of the build. - $PROJECT_NUMBER: the project number of the build. - $LOCATION: the location/region of the build. - $BUILD_ID: the autogenerated ID of the build. - $REPO_NAME: the source repository name specified by RepoSource. - $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA specified by RepoSource or resolved from the specified branch or tag. - $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approval` | BuildApproval | Output only. Describes this build's approval configuration, status, and result. |
| `artifacts` | Artifacts | Artifacts produced by the build that should be uploaded upon successful completion of all build steps. |
| `availableSecrets` | Secrets | Secrets and secret environment variables. |
| `buildTriggerId` | string | Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. |
| `createTime` | string (google-datetime) | Output only. Time at which the request to create the build was received. |
| `dependencies` | array<Dependency> | Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. |
| `failureInfo` | FailureInfo | Output only. Contains information about the build when status=FAILURE. |
| `finishTime` | string (google-datetime) | Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. |
| `gitConfig` | GitConfig | Optional. Configuration for git operations. |
| `id` | string | Output only. Unique identifier of the build. |
| `images` | array<string> | A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. |
| `logUrl` | string | Output only. URL to logs for this build in Google Cloud Console. |
| `logsBucket` | string | Cloud Storage bucket where logs should be written (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. |
| `name` | string | Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. |
| `options` | BuildOptions | Special options for this build. |
| `projectId` | string | Output only. ID of the project. |
| `queueTtl` | string (google-duration) | TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. |
| `results` | Results | Output only. Results of the build. |
| `secrets` | array<Secret> | Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets |
| `serviceAccount` | string | IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. |
| `source` | Source | Optional. The location of the source files to build. |
| `sourceProvenance` | SourceProvenance | Output only. A permanent fixed identifier for source. |
| `startTime` | string (google-datetime) | Output only. Time at which execution of the build was started. |
| `status` | string enum | Output only. Status of the build. Values: `STATUS_UNKNOWN`, `PENDING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED`. |
| `statusDetail` | string | Output only. Customer-readable message about the current status. |
| `steps` | array<BuildStep> | Required. The operations to be performed on the workspace. |
| `substitutions` | object | Substitutions data for `Build` resource. |
| `tags` | array<string> | Tags for annotation of a `Build`. These are not docker tags. |
| `timeout` | string (google-duration) | Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. |
| `timing` | object | Output only. Stores timing information for phases of the build. Valid keys are: \* BUILD: time to execute all build steps. \* PUSH: time to push all artifacts including docker images and non docker artifacts. \* FETCHSOURCE: time to fetch source. \* SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. |
| `warnings` | array<Warning> | Output only. Non-fatal problems encountered during the execution of the build. |

### `BuildApproval`

- BuildApproval describes a build's approval configuration, state, and result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `config` | ApprovalConfig | Output only. Configuration for manual approval of this build. |
| `result` | ApprovalResult | Output only. Result of manual approval for this Build. |
| `state` | string enum | Output only. The state of this build's approval. Values: `STATE_UNSPECIFIED`, `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`. |

### `BuildOperationMetadata`

- Metadata for build operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `build` | Build | The build that the operation is tracking. |

### `BuildOptions`

- Optional arguments to enable specific features of builds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automapSubstitutions` | boolean | Option to include built-in and custom substitutions as env variables for all build steps. |
| `defaultLogsBucketBehavior` | string enum | Optional. Option to specify how default logs buckets are setup. Values: `DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED`, `REGIONAL_USER_OWNED_BUCKET`, `LEGACY_BUCKET`. |
| `diskSizeGb` | string (int64) | Requested disk size for the VM that runs the build. Note that this is \*NOT\* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error. |
| `dynamicSubstitutions` | boolean | Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file. |
| `enableStructuredLogging` | boolean | Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs. |
| `env` | array<string> | A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". |
| `logStreamingOption` | string enum | Option to define build log streaming behavior to Cloud Storage. Values: `STREAM_DEFAULT`, `STREAM_ON`, `STREAM_OFF`. |
| `logging` | string enum | Option to specify the logging mode, which determines if and where build logs are stored. Values: `LOGGING_UNSPECIFIED`, `LEGACY`, `GCS_ONLY`, `STACKDRIVER_ONLY`, `CLOUD_LOGGING_ONLY`, `NONE`. |
| `machineType` | string enum | Compute Engine machine type on which to run the build. Values: `UNSPECIFIED`, `N1_HIGHCPU_8`, `N1_HIGHCPU_32`, `E2_HIGHCPU_8`, `E2_HIGHCPU_32`, `E2_MEDIUM`, `E2_STANDARD_2`. |
| `pool` | PoolOption | Optional. Specification for execution on a `WorkerPool`. See running builds in a private pool (https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. |
| `pubsubTopic` | string | Optional. Option to specify the Pub/Sub topic to receive build status updates. |
| `rankedMachineSeries` | array<string> | Optional. Ranked list (earlier items have higher priority) of Machine Series to consider when provisioning Worker VMs. A concrete machine type will be selected based on machine availability in the given region. This field must be empty for the Build to be eligible to be paired with a pre-provisioned worker VM. Values: `MACHINE_SERIES_UNSPECIFIED`, `MACHINE_SERIES_E`, `MACHINE_SERIES_N`, `MACHINE_SERIES_C`. |
| `requestedVerifyOption` | string enum | Requested verifiability options. Values: `NOT_VERIFIED`, `VERIFIED`, `BEST_EFFORT`. |
| `resolvedWorkerRelease` | string | Output only. Worker release resolved from the release channel. |
| `secretEnv` | array<string> | A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. |
| `sourceProvenanceHash` | array<string> | Requested hash for SourceProvenance. Values: `NONE`, `SHA256`, `MD5`, `GO_MODULE_H1`, `SHA512`, `DIRSUM_SHA256`. |
| `substitutionOption` | string enum | Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. Values: `MUST_MATCH`, `ALLOW_LOOSE`. |
| `volumes` | array<Volume> | Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. |
| `workerPool` | string | This field deprecated; please use `pool.name` instead. |
| `workerRelease` | string | Optional. Option to specify which release or release channel (rapid\|regular\|stable) to use to run this build. |

### `BuildResourceUsage`

- Aggregated/summary metrics over the entire build lifecycle.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `averageCpuUtilization` | number (float) | Output only. The average CPU utilization ratio across all vCPUs over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `averageMemoryUtilization` | number (float) | Output only. The average memory utilization ratio over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `peakCpuUtilization` | number (float) | Output only. The highest CPU utilization ratio across all vCPUs observed over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `peakMemoryUtilization` | number (float) | Output only. The highest memory utilization ratio observed over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `totalCpuDuration` | string (google-duration) | Output only. Total CPU execution time consumed across all cores during build execution. |

### `BuildStep`

- A step in the build pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowExitCodes` | array<integer> | Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. |
| `allowFailure` | boolean | Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. |
| `args` | array<string> | A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. |
| `automapSubstitutions` | boolean | Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. |
| `dir` | string | Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. |
| `entrypoint` | string | Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. |
| `env` | array<string> | A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". |
| `exitCode` | integer (int32) | Output only. Return code from running the step. |
| `id` | string | Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. |
| `name` | string | Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps (https://github.com/GoogleCloudPlatform/cloud-builders (https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. |
| `pullTiming` | TimeSpan | Output only. Stores timing information for pulling this build step's builder image only. |
| `results` | array<StepResult> | Declaration of results for this build step. |
| `script` | string | A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. |
| `secretEnv` | array<string> | A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. |
| `status` | string enum | Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. Values: `STATUS_UNKNOWN`, `PENDING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED`. |
| `timeout` | string (google-duration) | Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. |
| `timing` | TimeSpan | Output only. Stores timing information for executing this build step. |
| `volumes` | array<Volume> | List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. |
| `waitFor` | array<string> | The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. |

### `BuildStepResults`

- Results for a build step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `results` | object | Results for a build step. |

### `BuildTrigger`

- Configuration for an automated build in response to source repository changes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalConfig` | ApprovalConfig | Configuration for manual approval to start a build invocation of this BuildTrigger. |
| `autodetect` | boolean | Autodetect build configuration. The following precedence is used (case insensitive): 1. cloudbuild.yaml 2. cloudbuild.yml 3. cloudbuild.json 4. Dockerfile Currently only available for GitHub App Triggers. |
| `bitbucketServerTriggerConfig` | BitbucketServerTriggerConfig | BitbucketServerTriggerConfig describes the configuration of a trigger that creates a build whenever a Bitbucket Server event is received. |
| `build` | Build | Contents of the build template. |
| `createTime` | string (google-datetime) | Output only. Time when the trigger was created. |
| `description` | string | Human-readable description of this trigger. |
| `developerConnectEventConfig` | DeveloperConnectEventConfig | Optional. The configuration of a trigger that creates a build whenever an event from the DeveloperConnect API is received. |
| `disabled` | boolean | If true, the trigger will never automatically execute a build. |
| `eventType` | string enum | EventType allows the user to explicitly set the type of event to which this BuildTrigger should respond. This field will be validated against the rest of the configuration if it is set. Values: `EVENT_TYPE_UNSPECIFIED`, `REPO`, `WEBHOOK`, `PUBSUB`, `MANUAL`. |
| `filename` | string | Path, from the source root, to the build configuration file (i.e. cloudbuild.yaml). |
| `filter` | string | A Common Expression Language string. |
| `gitFileSource` | GitFileSource | The file source describing the local or remote Build template. |
| `github` | GitHubEventsConfig | GitHubEventsConfig describes the configuration of a trigger that creates a build whenever a GitHub event is received. Mutually exclusive with `trigger_template`. |
| `id` | string | Output only. Unique identifier of the trigger. |
| `ignoredFiles` | array<string> | ignored_files and included_files are file glob matches using https://golang.org/pkg/path/filepath/#Match extended with support for "\*\*". If ignored_files and changed files are both empty, then they are not used to determine whether or not to trigger a build. If ignored_files is not empty, then we ignore any files that match any of the ignored_file globs. If the change has no files that are outside of the ignored_files globs, then we do not trigger a build. |
| `includeBuildLogs` | string enum | If set to INCLUDE_BUILD_LOGS_WITH_STATUS, log url will be shown on GitHub page when build status is final. Setting this field to INCLUDE_BUILD_LOGS_WITH_STATUS for non GitHub triggers results in INVALID_ARGUMENT error. Values: `INCLUDE_BUILD_LOGS_UNSPECIFIED`, `INCLUDE_BUILD_LOGS_WITH_STATUS`. |
| `includedFiles` | array<string> | If any of the files altered in the commit pass the ignored_files filter and included_files is empty, then as far as this filter is concerned, we should trigger the build. If any of the files altered in the commit pass the ignored_files filter and included_files is not empty, then we make sure that at least one of those files matches a included_files glob. If not, then we do not trigger a build. |
| `name` | string | User-assigned name of the trigger. Must be unique within the project. Trigger names must meet the following requirements: + They must contain only alphanumeric characters and dashes. + They can be 1-64 characters long. + They must begin and end with an alphanumeric character. |
| `pubsubConfig` | PubsubConfig | PubsubConfig describes the configuration of a trigger that creates a build whenever a Pub/Sub message is published. |
| `repositoryEventConfig` | RepositoryEventConfig | The configuration of a trigger that creates a build whenever an event from Repo API is received. |
| `resourceName` | string | The `Trigger` name with format: `projects/{project}/locations/{location}/triggers/{trigger}`, where {trigger} is a unique identifier generated by the service. |
| `serviceAccount` | string | The service account used for all user-controlled operations including UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and CancelBuild. If no service account is set and the legacy Cloud Build service account (\[PROJECT_NUM\]@cloudbuild.gserviceaccount.com) is the default for the project then it will be used instead. Format: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}` |
| `sourceToBuild` | GitRepoSource | The repo and ref of the repository from which to build. This field is used only for those triggers that do not respond to SCM events. Triggers that respond to such events build source at whatever commit caused the event. This field is currently only used by Webhook, Pub/Sub, Manual, and Cron triggers. |
| `substitutions` | object | Substitutions for Build resource. The keys must match the following regular expression: `^_[A-Z0-9_]+$`. |
| `tags` | array<string> | Tags for annotation of a `BuildTrigger` |
| `triggerTemplate` | RepoSource | Template describing the types of source changes to trigger a build. Branch and tag names in trigger templates are interpreted as regular expressions. Any branch or tag change that matches that regular expression will trigger a build. Mutually exclusive with `github`. |
| `webhookConfig` | WebhookConfig | WebhookConfig describes the configuration of a trigger that creates a build whenever a webhook is sent to a trigger's webhook URL. |

### `BuiltImage`

- An image built by the pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `digest` | string | Docker Registry 2.0 digest. |
| `name` | string | Name used to push the container image to Google Container Registry, as presented to `docker push`. |
| `ociMediaType` | string enum | Output only. The OCI media type of the artifact. Non-OCI images, such as Docker images, will have an unspecified value. Values: `OCI_MEDIA_TYPE_UNSPECIFIED`, `IMAGE_MANIFEST`, `IMAGE_INDEX`. |
| `pushTiming` | TimeSpan | Output only. Stores timing information for pushing the specified image. |

### `CancelBuildRequest`

- Request to cancel an ongoing build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Required. ID of the build. |
| `name` | string | The name of the `Build` to cancel. Format: `projects/{project}/locations/{location}/builds/{build}` |
| `projectId` | string | Required. ID of the project. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v2

### `ChildStatusReference`

- ChildStatusReference is used to point to the statuses of individual TaskRuns and Runs within this PipelineRun.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name is the name of the TaskRun or Run this is referencing. |
| `pipelineTaskName` | string | PipelineTaskName is the name of the PipelineTask this is referencing. |
| `type` | string enum | Output only. Type of the child reference. Values: `TYPE_UNSPECIFIED`, `TASK_RUN`. |
| `whenExpressions` | array<WhenExpression> | WhenExpressions is the list of checks guarding the execution of the PipelineTask |

### `ConnectedRepository`

- Location of the source in a 2nd-gen Google Cloud Build repository resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. |
| `repository` | string | Required. Name of the Google Cloud Build repository, formatted as `projects/*/locations/*/connections/*/repositories/*`. |
| `revision` | string | Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. |

### `Connection`

- A connection to a SCM like GitHub, GitHub Enterprise, Bitbucket Data Center, Bitbucket Cloud or GitLab.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Allows clients to store small amounts of arbitrary data. |
| `bitbucketCloudConfig` | BitbucketCloudConfig | Configuration for connections to Bitbucket Cloud. |
| `bitbucketDataCenterConfig` | BitbucketDataCenterConfig | Configuration for connections to Bitbucket Data Center. |
| `createTime` | string (google-datetime) | Output only. Server assigned timestamp for when the connection was created. |
| `disabled` | boolean | Optional. If disabled is set to true, functionality is disabled for this connection. Repository based API methods and webhooks processing for repositories in this connection will be disabled. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `githubConfig` | GitHubConfig | Configuration for connections to github.com. |
| `githubEnterpriseConfig` | GoogleDevtoolsCloudbuildV2GitHubEnterpriseConfig | Configuration for connections to an instance of GitHub Enterprise. |
| `gitlabConfig` | GoogleDevtoolsCloudbuildV2GitLabConfig | Configuration for connections to gitlab.com or an instance of GitLab Enterprise. |
| `installationState` | InstallationState | Output only. Installation state of the Connection. |
| `name` | string | Immutable. The resource name of the connection, in the format `projects/{project}/locations/{location}/connections/{connection_id}`. |
| `reconciling` | boolean | Output only. Set to true when the connection is being set up or updated in the background. |
| `updateTime` | string (google-datetime) | Output only. Server assigned timestamp for when the connection was updated. |

### `CreateBitbucketServerConfigOperationMetadata`

- Metadata for `CreateBitbucketServerConfig` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConfig` | string | The resource name of the BitbucketServerConfig to be created. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. |
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |

### `CreateBitbucketServerConnectedRepositoryRequest`

- Request to connect a repository from a connected Bitbucket Server host.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConnectedRepository` | BitbucketServerConnectedRepository | Required. The Bitbucket Server repository to connect. |
| `parent` | string | Required. The name of the `BitbucketServerConfig` that added connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}` |

### `CreateGitHubEnterpriseConfigOperationMetadata`

- Metadata for `CreateGithubEnterpriseConfig` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |
| `githubEnterpriseConfig` | string | The resource name of the GitHubEnterprise to be created. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. |

### `CreateRepositoryRequest`

- Message for creating a Repository.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `parent` | string | Required. The connection to contain the repository. If the request is part of a BatchCreateRepositoriesRequest, this field should be empty or match the parent specified there. |
| `repository` | Repository | Required. The repository to create. |
| `repositoryId` | string | Required. The ID to use for the repository, which will become the final component of the repository's resource name. This ID should be unique in the connection. Allows alphanumeric characters and any of -.\_~%!$&'()\*+,;=@. |

### `CreateWorkerPoolOperationMetadata`

- Metadata for the `CreateWorkerPool` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |
| `workerPool` | string | The resource name of the `WorkerPool` to create. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`. |

### `DefaultServiceAccount`

- The default service account used for `Builds`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. Format: `projects/{project}/locations/{location}/defaultServiceAccount`. |
| `serviceAccountEmail` | string | Output only. The email address of the service account identity that will be used for a build by default. This is returned in the format `projects/{project}/serviceAccounts/{service_account}` where `{service_account}` could be the legacy Cloud Build SA, in the format \[PROJECT_NUMBER\]@cloudbuild.gserviceaccount.com or the Compute SA, in the format \[PROJECT_NUMBER\]-compute@developer.gserviceaccount.com. If no service account will be used by default, this will be empty. |

### `DeleteBitbucketServerConfigOperationMetadata`

- Metadata for `DeleteBitbucketServerConfig` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConfig` | string | The resource name of the BitbucketServerConfig to be deleted. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. |
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |

### `DeleteGitHubEnterpriseConfigOperationMetadata`

- Metadata for `DeleteGitHubEnterpriseConfig` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |
| `githubEnterpriseConfig` | string | The resource name of the GitHubEnterprise to be deleted. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. |

### `DeleteWorkerPoolOperationMetadata`

- Metadata for the `DeleteWorkerPool` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |
| `workerPool` | string | The resource name of the `WorkerPool` being deleted. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`. |

### `Dependency`

- A dependency that the Cloud Build worker will fetch before executing user steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `empty` | boolean | If set to true disable all dependency fetching (ignoring the default source as well). |
| `genericArtifact` | GenericArtifactDependency | Represents a generic artifact as a build dependency. |
| `gitSource` | GitSourceDependency | Represents a git repository as a build dependency. |

### `DeveloperConnectConfig`

- This config defines the location of a source through Developer Connect.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dir` | string | Required. Directory, relative to the source root, in which to run the build. |
| `gitRepositoryLink` | string | Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`. |
| `revision` | string | Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. |

### `DeveloperConnectEventConfig`

- The configuration of a trigger that creates a build whenever an event from the DeveloperConnect API is received.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gitRepositoryLink` | string | Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`. |
| `gitRepositoryLinkType` | string enum | Output only. The type of DeveloperConnect GitRepositoryLink. Values: `GIT_REPOSITORY_LINK_TYPE_UNSPECIFIED`, `GITHUB`, `GITHUB_ENTERPRISE`, `GITLAB`, `GITLAB_ENTERPRISE`, `BITBUCKET_DATA_CENTER`, `BITBUCKET_CLOUD`. |
| `pullRequest` | PullRequestFilter | Filter to match changes in pull requests. |
| `push` | PushFilter | Filter to match changes in refs like branches and tags. |

### `EmbeddedTask`

- EmbeddedTask defines a Task that is embedded in a Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | User annotations. See https://google.aip.dev/128#annotations |
| `taskSpec` | TaskSpec | Spec to instantiate this TaskRun. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `EmptyDirVolumeSource`

- Represents an empty Volume source.
- Version: v2

### `EnvVar`

- Environment variable.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the environment variable. |
| `value` | string | Value of the environment variable. |

### `ExecAction`

- ExecAction describes a "run in container" action.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `command` | array<string> | Optional. Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('\|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy. +optional |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FailureInfo`

- A fatal problem encountered during the execution of the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | Explains the failure issue in more detail using hard-coded text. |
| `type` | string enum | The name of the failure. Values: `FAILURE_TYPE_UNSPECIFIED`, `PUSH_FAILED`, `PUSH_IMAGE_NOT_FOUND`, `PUSH_NOT_AUTHORIZED`, `LOGGING_FAILURE`, `USER_BUILD_STEP`, `FETCH_SOURCE_FAILED`. |

### `FetchGitRefsResponse`

- Response for fetching git refs
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `refNames` | array<string> | Name of the refs fetched. |

### `FetchLinkableRepositoriesResponse`

- Response message for FetchLinkableRepositories.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `repositories` | array<Repository> | repositories ready to be created. |

### `FetchReadTokenRequest`

- Message for fetching SCM read token.
- Version: v2

### `FetchReadTokenResponse`

- Message for responding to get read token.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `expirationTime` | string (google-datetime) | Expiration timestamp. Can be empty if unknown or non-expiring. |
| `token` | string | The token content. |

### `FetchReadWriteTokenRequest`

- Message for fetching SCM read/write token.
- Version: v2

### `FetchReadWriteTokenResponse`

- Message for responding to get read/write token.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `expirationTime` | string (google-datetime) | Expiration timestamp. Can be empty if unknown or non-expiring. |
| `token` | string | The token content. |

### `FileHashes`

- Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileHash` | array<Hash> | Collection of file hashes. |

### `GenericArtifact`

- Generic artifact to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `folder` | string | Required. Path to the generic artifact in the build's workspace to be uploaded to Artifact Registry. |
| `registryPath` | string | Required. Registry path to upload the generic artifact to, in the form projects/$PROJECT/locations/$LOCATION/repositories/$REPO/packages/$PACKAGE/versions/$VERSION |

### `GenericArtifactDependency`

- Represents a generic artifact as a build dependency.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destPath` | string | Optional. Where the artifact files should be placed on the worker. Required when specified in `Build.dependencies`. |
| `resource` | string | Required. The location to download the artifact files from. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1 |

### `GitConfig`

- GitConfig is a configuration for git operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `http` | HttpConfig | Configuration for HTTP related git operations. |

### `GitFileSource`

- GitFileSource describes a file within a (possibly remote) code repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConfig` | string | The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. |
| `githubEnterpriseConfig` | string | The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`. |
| `path` | string | The path of the file, with the repo root as the root of the path. |
| `repoType` | string enum | See RepoType above. Values: `UNKNOWN`, `CLOUD_SOURCE_REPOSITORIES`, `GITHUB`, `BITBUCKET_SERVER`, `GITLAB`, `BITBUCKET_CLOUD`. |
| `repository` | string | The fully qualified resource name of the Repos API repository. Either URI or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path. |
| `revision` | string | The branch, tag, arbitrary ref, or SHA version of the repo to use when resolving the filename (optional). This field respects the same syntax/resolution as described here: https://git-scm.com/docs/gitrevisions If unspecified, the revision from which the trigger invocation originated is assumed to be the revision from which to read the specified path. |
| `uri` | string | The URI of the repo. Either uri or repository can be specified. If unspecified, the repo from which the trigger invocation originated is assumed to be the repo from which to read the specified path. |

### `GitHubConfig`

- Configuration for connections to github.com.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `appInstallationId` | string (int64) | Optional. GitHub App installation id. |
| `authorizerCredential` | OAuthCredential | Optional. OAuth credential of the account that authorized the Cloud Build GitHub App. It is recommended to use a robot account instead of a human user account. The OAuth token must be tied to the Cloud Build GitHub App. |

### `GitHubEnterpriseConfig`

- GitHubEnterpriseConfig represents a configuration for a GitHub Enterprise server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appId` | string (int64) | Required. The GitHub app id of the Cloud Build app on the GitHub Enterprise server. |
| `createTime` | string (google-datetime) | Output only. Time when the installation was associated with the project. |
| `displayName` | string | Optional. Name to display for this config. |
| `hostUrl` | string | The URL of the github enterprise host the configuration is for. |
| `name` | string | Identifier. The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `peeredNetwork` | string | Optional. The network to be used when reaching out to the GitHub Enterprise server. The VPC network must be enabled for private service connection. This should be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, no network peering will occur and calls to the GitHub Enterprise server will be made over the public internet. Must be in the format `projects/{project}/global/networks/{network}`, where {project} is a project number or id and {network} is the name of a VPC network in the project. |
| `secrets` | GitHubEnterpriseSecrets | Optional. Names of secrets in Secret Manager. |
| `sslCa` | string | Optional. SSL certificate to use for requests to GitHub Enterprise. |
| `webhookKey` | string | The key that should be attached to webhook calls to the ReceiveWebhook endpoint. |

### `GitHubEnterpriseSecrets`

- GitHubEnterpriseSecrets represents the names of all necessary secrets in Secret Manager for a GitHub Enterprise server. Format is: projects//secrets/.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `oauthClientIdName` | string | The resource name for the OAuth client ID secret in Secret Manager. |
| `oauthClientIdVersionName` | string | The resource name for the OAuth client ID secret version in Secret Manager. |
| `oauthSecretName` | string | The resource name for the OAuth secret in Secret Manager. |
| `oauthSecretVersionName` | string | The resource name for the OAuth secret secret version in Secret Manager. |
| `privateKeyName` | string | The resource name for the private key secret. |
| `privateKeyVersionName` | string | The resource name for the private key secret version. |
| `webhookSecretName` | string | The resource name for the webhook secret in Secret Manager. |
| `webhookSecretVersionName` | string | The resource name for the webhook secret secret version in Secret Manager. |

### `GitHubEventsConfig`

- GitHubEventsConfig describes the configuration of a trigger that creates a build whenever a GitHub event is received.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enterpriseConfigResourceName` | string | The resource name of the github enterprise config that should be applied to this installation. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}" |
| `installationId` | string (int64) | The installationID that emits the GitHub event. |
| `name` | string | Name of the repository. For example: The name for https://github.com/googlecloudplatform/cloud-builders is "cloud-builders". |
| `owner` | string | Owner of the repository. For example: The owner for https://github.com/googlecloudplatform/cloud-builders is "googlecloudplatform". |
| `pullRequest` | PullRequestFilter | filter to match changes in pull requests. |
| `push` | PushFilter | filter to match changes in refs like branches, tags. |

### `GitRepoSource`

- GitRepoSource describes a repo and ref of a code repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConfig` | string | The full resource name of the bitbucket server config. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. |
| `githubEnterpriseConfig` | string | The full resource name of the github enterprise config. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. `projects/{project}/githubEnterpriseConfigs/{id}`. |
| `ref` | string | The branch or tag to use. Must start with "refs/" (required). |
| `repoType` | string enum | See RepoType below. Values: `UNKNOWN`, `CLOUD_SOURCE_REPOSITORIES`, `GITHUB`, `BITBUCKET_SERVER`, `GITLAB`, `BITBUCKET_CLOUD`. |
| `repository` | string | The connected repository resource name, in the format `projects/*/locations/*/connections/*/repositories/*`. Either `uri` or `repository` can be specified and is required. |
| `uri` | string | The URI of the repo (e.g. https://github.com/user/repo.git). Either `uri` or `repository` can be specified and is required. |

### `GitSource`

- Location of the source in any accessible Git repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. |
| `revision` | string | Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#\_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. |
| `url` | string | Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. |

### `GitSourceDependency`

- Represents a git repository as a build dependency.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `depth` | string (int64) | Optional. How much history should be fetched for the build (default 1, -1 for all history). |
| `destPath` | string | Required. Where should the files be placed on the worker. |
| `fetchTags` | boolean | Optional. True if remote tags should be fetched too (default false). Note: when depth is 1 (default), git fetch only retrieves tags pointing to commits within the shallow boundary. Set depth to -1 to fetch all historical tags. |
| `recurseSubmodules` | boolean | Optional. True if submodules should be fetched too (default false). |
| `repository` | GitSourceRepository | Required. The kind of repo (url or dev connect). |
| `revision` | string | Required. The revision that we will fetch the repo at. |

### `GitSourceRepository`

- A repository for a git source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `developerConnect` | string | The Developer Connect Git repository link formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*` |
| `url` | string | Location of the Git repository. |

### `GoModule`

- Go module to upload to Artifact Registry upon successful completion of all build steps. A module refers to all dependencies in a go.mod file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `modulePath` | string | Optional. The Go module's "module path". e.g. example.com/foo/v2 |
| `moduleVersion` | string | Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 |
| `repositoryLocation` | string | Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. |
| `repositoryName` | string | Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo |
| `repositoryProjectId` | string | Optional. Project ID of the Artifact Registry repository. Defaults to the build project. |
| `sourcePath` | string | Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage |

### `GoogleDevtoolsCloudbuildV2Condition`

- Conditions defines a readiness condition for a Knative resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `lastTransitionTime` | string (google-datetime) | LastTransitionTime is the last time the condition transitioned from one status to another. |
| `message` | string | A human readable message indicating details about the transition. |
| `reason` | string | The reason for the condition's last transition. |
| `severity` | string enum | Severity with which to treat failures of this type of condition. Values: `SEVERITY_UNSPECIFIED`, `WARNING`, `INFO`. |
| `status` | string enum | Status of the condition. Values: `UNKNOWN`, `TRUE`, `FALSE`. |
| `type` | string | Type of condition. |

### `GoogleDevtoolsCloudbuildV2GitHubEnterpriseConfig`

- Configuration for connections to an instance of GitHub Enterprise.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiKey` | string | Required. API Key used for authentication of webhook events. |
| `appId` | string (int64) | Optional. Id of the GitHub App created from the manifest. |
| `appInstallationId` | string (int64) | Optional. ID of the installation of the GitHub App. |
| `appSlug` | string | Optional. The URL-friendly name of the GitHub App. |
| `hostUri` | string | Required. The URI of the GitHub Enterprise host this connection is for. |
| `privateKeySecretVersion` | string | Optional. SecretManager resource containing the private key of the GitHub App, formatted as `projects/*/secrets/*/versions/*`. |
| `serverVersion` | string | Output only. GitHub Enterprise version installed at the host_uri. |
| `serviceDirectoryConfig` | GoogleDevtoolsCloudbuildV2ServiceDirectoryConfig | Optional. Configuration for using Service Directory to privately connect to a GitHub Enterprise server. This should only be set if the GitHub Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitHub Enterprise server will be made over the public internet. |
| `sslCa` | string | Optional. SSL certificate to use for requests to GitHub Enterprise. |
| `webhookSecretSecretVersion` | string | Optional. SecretManager resource containing the webhook secret of the GitHub App, formatted as `projects/*/secrets/*/versions/*`. |

### `GoogleDevtoolsCloudbuildV2GitLabConfig`

- Configuration for connections to gitlab.com or an instance of GitLab Enterprise.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authorizerCredential` | UserCredential | Required. A GitLab personal access token with the `api` scope access. |
| `hostUri` | string | Optional. The URI of the GitLab Enterprise host this connection is for. If not specified, the default value is https://gitlab.com. |
| `readAuthorizerCredential` | UserCredential | Required. A GitLab personal access token with the minimum `read_api` scope access. |
| `serverVersion` | string | Output only. Version of the GitLab Enterprise server running on the `host_uri`. |
| `serviceDirectoryConfig` | GoogleDevtoolsCloudbuildV2ServiceDirectoryConfig | Optional. Configuration for using Service Directory to privately connect to a GitLab Enterprise server. This should only be set if the GitLab Enterprise server is hosted on-premises and not reachable by public internet. If this field is left empty, calls to the GitLab Enterprise server will be made over the public internet. |
| `sslCa` | string | Optional. SSL certificate to use for requests to GitLab Enterprise. |
| `webhookSecretSecretVersion` | string | Required. Immutable. SecretManager resource containing the webhook secret of a GitLab Enterprise project, formatted as `projects/*/secrets/*/versions/*`. |

### `GoogleDevtoolsCloudbuildV2OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleDevtoolsCloudbuildV2PipelineRun`

- Message describing PipelineRun object
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | User annotations. See https://google.aip.dev/128#annotations |
| `childReferences` | array<ChildStatusReference> | Output only. List of TaskRun and Run names and PipelineTask names for children of this PipelineRun. |
| `completionTime` | string (google-datetime) | Output only. Time the pipeline completed. |
| `conditions` | array<GoogleDevtoolsCloudbuildV2Condition> | Output only. Kubernetes Conditions convention for PipelineRun status and error. |
| `createTime` | string (google-datetime) | Output only. Time at which the request to create the `PipelineRun` was received. |
| `etag` | string | Needed for declarative-friendly resources. |
| `finallyStartTime` | string (google-datetime) | Output only. FinallyStartTime is when all non-finally tasks have been completed and only finally tasks are being executed. +optional |
| `gcbParams` | object | Output only. GCB default params. |
| `name` | string | Output only. The `PipelineRun` name with format `projects/{project}/locations/{location}/pipelineRuns/{pipeline_run}` |
| `params` | array<Param> | Params is a list of parameter names and values. |
| `pipelineRef` | PipelineRef | PipelineRef refer to a specific instance of a Pipeline. |
| `pipelineRunStatus` | string enum | Pipelinerun status the user can provide. Used for cancellation. Values: `PIPELINE_RUN_STATUS_UNSPECIFIED`, `PIPELINE_RUN_CANCELLED`. |
| `pipelineSpec` | PipelineSpec | PipelineSpec defines the desired state of Pipeline. |
| `pipelineSpecYaml` | string | Output only. Inline pipelineSpec yaml string, used by workflow run requests. |
| `provenance` | Provenance | Optional. Provenance configuration. |
| `record` | string | Output only. The `Record` of this `PipelineRun`. Format: `projects/{project}/locations/{location}/results/{result_id}/records/{record_id}` |
| `resolvedPipelineSpec` | PipelineSpec | Output only. The exact PipelineSpec used to instantiate the run. |
| `results` | array<PipelineRunResult> | Optional. Output only. List of results written out by the pipeline's containers |
| `security` | Security | Optional. Security configuration. |
| `serviceAccount` | string | Service account used in the Pipeline. Deprecated; please use security.service_account instead. |
| `skippedTasks` | array<SkippedTask> | Output only. List of tasks that were skipped due to when expressions evaluating to false. |
| `startTime` | string (google-datetime) | Output only. Time the pipeline is actually started. |
| `timeouts` | TimeoutFields | Time after which the Pipeline times out. Currently three keys are accepted in the map pipeline, tasks and finally with Timeouts.pipeline >= Timeouts.tasks + Timeouts.finally |
| `uid` | string | Output only. A unique identifier for the `PipelineRun`. |
| `updateTime` | string (google-datetime) | Output only. Time at which the request to update the `PipelineRun` was received. |
| `worker` | Worker | Optional. Worker configuration. |
| `workerPool` | string | Output only. The WorkerPool used to run this PipelineRun. |
| `workflow` | string | Output only. The Workflow used to create this PipelineRun. |
| `workspaces` | array<WorkspaceBinding> | Workspaces is a list of WorkspaceBindings from volumes to workspaces. |

### `GoogleDevtoolsCloudbuildV2ServiceDirectoryConfig`

- ServiceDirectoryConfig represents Service Directory configuration for a connection.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `service` | string | Required. The Service Directory service name. Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}. |

### `Hash`

- Container message for hash values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The type of hash that was performed. Values: `NONE`, `SHA256`, `MD5`, `GO_MODULE_H1`, `SHA512`, `DIRSUM_SHA256`. |
| `value` | string (byte) | The hash value. |

### `HttpBody`

- Message that represents an arbitrary HTTP body. It should only be used for payload formats that can't be represented as JSON, such as raw binary or an HTML page. This message can be used both in streaming and non-streaming API methods in the request as well as the response. It can be used as a top-level request field, which is convenient if one wants to extract parameters from either the URL or HTTP template into the request fields and also want access to the raw HTTP body. Example: message GetResourceRequest { // A unique request id. string request_id = 1; // The raw HTTP body is bound to this field. google.api.HttpBody http_body = 2; } service ResourceService { rpc GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); } Example with streaming methods: service CaldavService { rpc GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); rpc UpdateCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); } Use of this type only changes how the request and response bodies are handled, all other features will continue to work unchanged.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `contentType` | string | The HTTP Content-Type header value specifying the content type of the body. |
| `data` | string (byte) | The HTTP request/response body as raw binary. |
| `extensions` | array<object> | Application specific response metadata. Must be set in the first response for streaming APIs. |

### `HttpConfig`

- HttpConfig is a configuration for HTTP related git operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `proxySecretVersionName` | string | SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. |

### `InlineSecret`

- Pairs a set of secret environment variables mapped to encrypted values with the Cloud KMS key to use to decrypt the value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `envMap` | object | Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. |
| `kmsKeyName` | string | Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/\*/locations/\*/keyRings/\*/cryptoKeys/\* |

### `InstallationState`

- Describes stage and necessary actions to be taken by the user to complete the installation. Used for GitHub and GitHub Enterprise based connections.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `actionUri` | string | Output only. Link to follow for next action. Empty string if the installation is already complete. |
| `message` | string | Output only. Message of what the user should do next to continue the installation. Empty string if the installation is already complete. |
| `stage` | string enum | Output only. Current step of the installation process. Values: `STAGE_UNSPECIFIED`, `PENDING_CREATE_APP`, `PENDING_USER_OAUTH`, `PENDING_INSTALL_APP`, `COMPLETE`. |

### `ListBitbucketServerConfigsResponse`

- RPC response object returned by ListBitbucketServerConfigs RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConfigs` | array<BitbucketServerConfig> | A list of BitbucketServerConfigs |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListBitbucketServerRepositoriesResponse`

- RPC response object returned by the ListBitbucketServerRepositories RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerRepositories` | array<BitbucketServerRepository> | List of Bitbucket Server repositories. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListBuildTriggersResponse`

- Response containing existing `BuildTriggers`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to receive the next page of results. |
| `triggers` | array<BuildTrigger> | `BuildTriggers` for the project, sorted by `create_time` descending. |

### `ListBuildsResponse`

- Response including listed builds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `builds` | array<Build> | Builds will be sorted by `create_time`, descending. |
| `nextPageToken` | string | Token to receive the next page of results. This will be absent if the end of the response list has been reached. |

### `ListConnectionsResponse`

- Message for response to listing Connections.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `connections` | array<Connection> | The list of Connections. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListGithubEnterpriseConfigsResponse`

- RPC response object returned by ListGithubEnterpriseConfigs RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configs` | array<GitHubEnterpriseConfig> | A list of GitHubEnterpriseConfigs |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListRepositoriesResponse`

- Message for response to listing Repositories.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `repositories` | array<Repository> | The list of Repositories. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListWorkerPoolsResponse`

- Response containing existing `WorkerPools`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Continuation token used to page through large result sets. Provide this value in a subsequent ListWorkerPoolsRequest to return the next page of results. |
| `workerPools` | array<WorkerPool> | `WorkerPools` for the specified project. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `MavenArtifact`

- A Maven artifact to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Maven `artifactId` value used when uploading the artifact to Artifact Registry. |
| `deployFolder` | string | Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. |
| `groupId` | string | Maven `groupId` value used when uploading the artifact to Artifact Registry. |
| `path` | string | Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. |
| `version` | string | Maven `version` value used when uploading the artifact to Artifact Registry. |

### `NetworkConfig`

- Defines the network configuration for the pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `egressOption` | string enum | Option to configure network egress for the workers. Values: `EGRESS_OPTION_UNSPECIFIED`, `NO_PUBLIC_EGRESS`, `PUBLIC_EGRESS`. |
| `peeredNetwork` | string | Required. Immutable. The network definition that the workers are peered to. If this section is left empty, the workers will be peered to `WorkerPool.project_id` on the service producer network. Must be in the format `projects/{project}/global/networks/{network}`, where `{project}` is a project number, such as `12345`, and `{network}` is the name of a VPC network in the project. See Understanding network configuration options (https://cloud.google.com/build/docs/private-pools/set-up-private-pool-environment) |
| `peeredNetworkIpRange` | string | Immutable. Subnet IP range within the peered network. This is specified in CIDR notation with a slash and the subnet prefix size. You can optionally specify an IP address before the subnet prefix value. e.g. `192.168.0.0/29` would specify an IP range starting at 192.168.0.0 with a prefix size of 29 bits. `/16` would specify a prefix size of 16 bits, with an automatically determined IP within the peered VPC. If unspecified, a value of `/24` will be used. |

### `NpmPackage`

- Npm package to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `packagePath` | string | Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. |

### `OAuthCredential`

- Represents an OAuth token of the account that authorized the Connection, and associated metadata.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `oauthTokenSecretVersion` | string | Optional. A SecretManager resource containing the OAuth token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`. |
| `username` | string | Output only. The username associated to this token. |

### `Oci`

- OCI image to upload to Artifact Registry upon successful completion of all build steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `file` | string | Required. Path on the local file system where to find the container to upload. e.g. /workspace/my-image.tar |
| `registryPath` | string | Required. Registry path to upload the container to. e.g. us-east1-docker.pkg.dev/my-project/my-repo/my-image |
| `tags` | array<string> | Optional. Tags to apply to the uploaded image. e.g. latest, 1.0.0 |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Param`

- Param defined with name and value. PipelineRef can be used to refer to a specific instance of a Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the parameter. |
| `value` | ParamValue | Value of the parameter. |

### `ParamSpec`

- ParamSpec defines parameters needed beyond typed inputs (such as resources). Parameter values are provided by users as inputs on a TaskRun or PipelineRun.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `default` | ParamValue | The default value a parameter takes if no input value is supplied |
| `description` | string | Description of the ParamSpec |
| `name` | string | Name of the ParamSpec |
| `type` | string enum | Type of ParamSpec Values: `TYPE_UNSPECIFIED`, `STRING`, `ARRAY`, `OBJECT`. |

### `ParamValue`

- Parameter value.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `arrayVal` | array<string> | Value of the parameter if type is array. |
| `objectVal` | object | Optional. Value of the parameter if type is object. |
| `stringVal` | string | Value of the parameter if type is string. |
| `type` | string enum | Type of parameter. Values: `TYPE_UNSPECIFIED`, `STRING`, `ARRAY`, `OBJECT`. |

### `PipelineRef`

- PipelineRef can be used to refer to a specific instance of a Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the Pipeline. |
| `params` | array<Param> | Params contains the parameters used to identify the referenced Tekton resource. Example entries might include "repo" or "path" but the set of params ultimately depends on the chosen resolver. |
| `resolver` | string enum | Resolver is the name of the resolver that should perform resolution of the referenced Tekton resource. Values: `RESOLVER_NAME_UNSPECIFIED`, `BUNDLES`, `GCB_REPO`, `GIT`, `DEVELOPER_CONNECT`, `DEFAULT`. |

### `PipelineResult`

- A value produced by a Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Output only. Description of the result. |
| `name` | string | Output only. Name of the result. |
| `type` | string enum | Output only. The type of data that the result holds. Values: `TYPE_UNSPECIFIED`, `STRING`, `ARRAY`, `OBJECT`. |
| `value` | ResultValue | Output only. Value of the result. |

### `PipelineRunResult`

- PipelineRunResult used to describe the results of a pipeline
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Name of the TaskRun |
| `value` | ResultValue | Output only. Value of the result. |

### `PipelineSpec`

- PipelineSpec defines the desired state of Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finallyTasks` | array<PipelineTask> | List of Tasks that execute just before leaving the Pipeline i.e. either after all Tasks are finished executing successfully or after a failure which would result in ending the Pipeline. |
| `generatedYaml` | string | Output only. auto-generated yaml that is output only for display purpose for workflows using pipeline_spec, used by UI/gcloud cli for Workflows. |
| `params` | array<ParamSpec> | List of parameters. |
| `results` | array<PipelineResult> | Optional. Output only. List of results written out by the pipeline's containers |
| `tasks` | array<PipelineTask> | List of Tasks that execute when this Pipeline is run. |
| `workspaces` | array<PipelineWorkspaceDeclaration> | Workspaces declares a set of named workspaces that are expected to be provided by a PipelineRun. |

### `PipelineTask`

- PipelineTask defines a task in a Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the task. |
| `params` | array<Param> | Params is a list of parameter names and values. |
| `retries` | integer (int32) | Retries represents how many times this task should be retried in case of task failure. |
| `runAfter` | array<string> | RunAfter is the list of PipelineTask names that should be executed before this Task executes. (Used to force a specific ordering in graph execution.) |
| `taskRef` | TaskRef | Reference to a specific instance of a task. |
| `taskSpec` | EmbeddedTask | Spec to instantiate this TaskRun. |
| `timeout` | string (google-duration) | Time after which the TaskRun times out. Defaults to 1 hour. Specified TaskRun timeout should be less than 24h. |
| `whenExpressions` | array<WhenExpression> | Conditions that need to be true for the task to run. |
| `workspaces` | array<WorkspacePipelineTaskBinding> | Workspaces maps workspaces from the pipeline spec to the workspaces declared in the Task. |

### `PipelineWorkspaceDeclaration`

- Workspaces declares a set of named workspaces that are expected to be provided by a PipelineRun.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Description is a human readable string describing how the workspace will be used in the Pipeline. |
| `name` | string | Name is the name of a workspace to be provided by a PipelineRun. |
| `optional` | boolean | Optional marks a Workspace as not being required in PipelineRuns. By default this field is false and so declared workspaces are required. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PoolOption`

- Details about how a build should be executed on a `WorkerPool`. See running builds in a private pool (https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} |
| `resolvedWorkerRelease` | string | Output only. OUTPUT_ONLY. Worker release resolved from the release channel. |
| `workerRelease` | string | Output only. OUTPUT_ONLY. The release or release channel used to run the Build. This is set to the same value as `PrivatePoolV1Config.WorkerConfig.worker_release` for the UI to easily access. |

### `PrivatePoolV1Config`

- Configuration for a V1 `PrivatePool`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkConfig` | NetworkConfig | Network configuration for the pool. |
| `privateServiceConnect` | PrivateServiceConnect | Immutable. Private Service Connect(PSC) Network configuration for the pool. |
| `workerConfig` | WorkerConfig | Machine configuration for the workers in the pool. |

### `PrivateServiceConnect`

- Defines the Private Service Connect network configuration for the pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkAttachment` | string | Required. Immutable. The network attachment that the worker network interface is peered to. Must be in the format `projects/{project}/regions/{region}/networkAttachments/{networkAttachment}`. The region of network attachment must be the same as the worker pool. See Network Attachments (https://cloud.google.com/vpc/docs/about-network-attachments) |
| `publicIpAddressDisabled` | boolean | Required. Immutable. Disable public IP on the primary network interface. If true, workers are created without any public address, which prevents network egress to public IPs unless a network proxy is configured. If false, workers are created with a public address which allows for public internet egress. The public address only applies to traffic through the primary network interface. If `route_all_traffic` is set to true, all traffic will go through the non-primary network interface, this boolean has no effect. |
| `routeAllTraffic` | boolean | Immutable. Route all traffic through PSC interface. Enable this if you want full control of traffic in the private pool. Configure Cloud NAT for the subnet of network attachment if you need to access public Internet. If false, Only route RFC 1918 (10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16) and RFC 6598 (100.64.0.0/10) through PSC interface. |

### `Probe`

- Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exec` | ExecAction | Optional. Exec specifies the action to take. +optional |
| `periodSeconds` | integer (int32) | Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. +optional |

### `ProcessAppManifestCallbackOperationMetadata`

- Metadata for `ProcessAppManifestCallback` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |
| `githubEnterpriseConfig` | string | The resource name of the GitHubEnterprise to be created. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. |

### `PropertySpec`

- PropertySpec holds information about a property in an object.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `type` | string enum | A type for the object. Values: `TYPE_UNSPECIFIED`, `STRING`. |

### `Provenance`

- Provenance configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabled` | string enum | Optional. Provenance push mode. Values: `ENABLED_UNSPECIFIED`, `REQUIRED`, `OPTIMISTIC`, `DISABLED`. |
| `region` | string enum | Optional. Provenance region. Values: `REGION_UNSPECIFIED`, `GLOBAL`. |
| `storage` | string enum | Optional. Where provenance is stored. Values: `STORAGE_UNSPECIFIED`, `PREFER_ARTIFACT_PROJECT`, `ARTIFACT_PROJECT_ONLY`, `BUILD_PROJECT_ONLY`. |

### `PubsubConfig`

- PubsubConfig describes the configuration of a trigger that creates a build whenever a Pub/Sub message is published.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAccountEmail` | string | Service account that will make the push request. |
| `state` | string enum | Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests. Values: `STATE_UNSPECIFIED`, `OK`, `SUBSCRIPTION_DELETED`, `TOPIC_DELETED`, `SUBSCRIPTION_MISCONFIGURED`. |
| `subscription` | string | Output only. Name of the subscription. Format is `projects/{project}/subscriptions/{subscription}`. |
| `topic` | string | Optional. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. |

### `PullRequestFilter`

- PullRequestFilter contains filter properties for matching GitHub Pull Requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `branch` | string | Regex of branches to match. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |
| `commentControl` | string enum | If CommentControl is enabled, depending on the setting, builds may not fire until a repository writer comments `/gcbrun` on a pull request or `/gcbrun` is in the pull request description. Only PR comments that contain `/gcbrun` will trigger builds. If CommentControl is set to disabled, comments with `/gcbrun` from a user with repository write permission or above will still trigger builds to run. Values: `COMMENTS_DISABLED`, `COMMENTS_ENABLED`, `COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY`. |
| `invertRegex` | boolean | If true, branches that do NOT match the git_ref will trigger a build. |

### `PushFilter`

- Push contains filter properties for matching GitHub git pushes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `branch` | string | Regexes matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |
| `invertRegex` | boolean | When true, only trigger a build if the revision regex does NOT match the git_ref regex. |
| `tag` | string | Regexes matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |

### `PythonPackage`

- Python package to upload to Artifact Registry upon successful completion of all build steps. A package can encapsulate multiple objects to be uploaded to a single repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `paths` | array<string> | Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. |

### `ReceiveTriggerWebhookResponse`

- ReceiveTriggerWebhookResponse \[Experimental\] is the response object for the ReceiveTriggerWebhook method.
- Version: v1

### `RemoveBitbucketServerConnectedRepositoryRequest`

- RPC request object accepted by RemoveBitbucketServerConnectedRepository RPC method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectedRepository` | BitbucketServerRepositoryId | The connected repository to remove. |

### `RepoSource`

- Location of the source in a Google Cloud Source Repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `branchName` | string | Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |
| `commitSha` | string | Explicit commit SHA to build. |
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. |
| `invertRegex` | boolean | Optional. Only trigger a build if the revision regex does NOT match the revision regex. |
| `projectId` | string | Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. |
| `repoName` | string | Required. Name of the Cloud Source Repository. |
| `substitutions` | object | Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger |
| `tagName` | string | Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax |

### `Repository`

- A repository associated to a parent connection.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Allows clients to store small amounts of arbitrary data. |
| `createTime` | string (google-datetime) | Output only. Server assigned timestamp for when the connection was created. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `name` | string | Immutable. Resource name of the repository, in the format `projects/*/locations/*/connections/*/repositories/*`. |
| `remoteUri` | string | Required. Git Clone HTTPS URI. |
| `updateTime` | string (google-datetime) | Output only. Server assigned timestamp for when the connection was updated. |
| `webhookId` | string | Output only. External ID of the webhook created for the repository. |

### `RepositoryEventConfig`

- The configuration of a trigger that creates a build whenever an event from Repo API is received.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pullRequest` | PullRequestFilter | Filter to match changes in pull requests. |
| `push` | PushFilter | Filter to match changes in refs like branches, tags. |
| `repository` | string | The resource name of the Repo API resource. |
| `repositoryType` | string enum | Output only. The type of the SCM vendor the repository points to. Values: `REPOSITORY_TYPE_UNSPECIFIED`, `GITHUB`, `GITHUB_ENTERPRISE`, `GITLAB_ENTERPRISE`, `BITBUCKET_DATA_CENTER`, `BITBUCKET_CLOUD`. |

### `ResultValue`

- ResultValue holds different types of data for a single result.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `arrayVal` | array<string> | Value of the result if type is array. |
| `objectVal` | object | Value of the result if type is object. |
| `stringVal` | string | Value of the result if type is string. |
| `type` | string enum | Output only. The type of data that the result holds. Values: `TYPE_UNSPECIFIED`, `STRING`, `ARRAY`, `OBJECT`. |

### `Results`

- Artifacts created by the build pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactManifest` | string | Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. |
| `artifactTiming` | TimeSpan | Time to push all non-container artifacts to Cloud Storage. |
| `buildStepImages` | array<string> | List of build step digests, in the order corresponding to build step indices. |
| `buildStepOutputs` | array<string> | List of build step outputs, produced by builder images, in the order corresponding to build step indices. Cloud Builders (https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. |
| `buildStepResults` | object | Results for build steps. step_id -> |
| `genericArtifacts` | array<UploadedGenericArtifact> | Output only. Generic artifacts uploaded to Artifact Registry at the end of the build. |
| `goModules` | array<UploadedGoModule> | Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. |
| `images` | array<BuiltImage> | Container images that were built as a part of the build. |
| `mavenArtifacts` | array<UploadedMavenArtifact> | Maven artifacts uploaded to Artifact Registry at the end of the build. |
| `npmPackages` | array<UploadedNpmPackage> | Npm packages uploaded to Artifact Registry at the end of the build. |
| `numArtifacts` | string (int64) | Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. |
| `pythonPackages` | array<UploadedPythonPackage> | Python artifacts uploaded to Artifact Registry at the end of the build. |
| `resourceUsage` | BuildResourceUsage | Output only. Aggregated metrics for the build. |

### `RetryBuildRequest`

- Specifies a build to retry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Required. Build ID of the original build. |
| `name` | string | The name of the `Build` to retry. Format: `projects/{project}/locations/{location}/builds/{build}` |
| `projectId` | string | Required. ID of the project. |

### `RunBuildTriggerRequest`

- Specifies a build trigger to run and the source to use.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. ID of the project. |
| `source` | RepoSource | Source to build against this trigger. Branch and tag names cannot consist of regular expressions. |
| `triggerId` | string | Required. ID of the trigger. |

### `RunWorkflowCustomOperationMetadata`

- Represents the custom metadata of the RunWorkflow long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `pipelineRunId` | string | Output only. ID of the pipeline run created by RunWorkflow. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Secret`

- Pairs a set of secret environment variables containing encrypted values with the Cloud KMS key to use to decrypt the value. Note: Use `kmsKeyName` with `available_secrets` instead of using `kmsKeyName` with `secret`. For instructions see: https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Cloud KMS key name to use to decrypt these envs. |
| `secretEnv` | object | Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. |

### Shape of `ApprovalConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "approvalRequired": "boolean"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `cloudbuild` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the source proto: the proxy URL format `protocol://@]proxyhost[:port]` in the `proxySecretVersionName` description lost its leading part in the Discovery document; the proto comment it is generated from reads "The proxy URL should be in format `[protocol://][user[:password]@]proxyhost[:port]`." (`google/devtools/cloudbuild/v1/cloudbuild.proto`, https://github.com/googleapis/googleapis/blob/6f8ddc394a90ea2c6a355afd2e9d21f56622df14/google/devtools/cloudbuild/v1/cloudbuild.proto, commit `6f8ddc3`, retrieved 2026-11-18).
- Corrected from the official docs (the Discovery text above is verbatim): the `DeveloperConnectConfig.gitRepositoryLink` and `GitSourceRepository.developerConnect` descriptions give the format `projects/*/locations/*/connections/*/gitRepositoryLink/*`; the collection is `gitRepositoryLinks` (the developerconnect.v1 Discovery path pattern is `projects/[^/]+/locations/[^/]+/connections/[^/]+/gitRepositoryLinks/[^/]+`), so the value has the form `projects/*/locations/*/connections/*/gitRepositoryLinks/*`.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://cloudbuild.googleapis.com/$discovery/rest?version=v2, https://cloudbuild.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
