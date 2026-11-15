---
source: https://run.googleapis.com/$discovery/rest?version=v2
---

# Cloud Run Admin API message schemas (run) (part 2/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/run/`.

### `GoogleCloudRunV2WorkerPool`

- WorkerPool acts as a top-level container that manages a set of configurations and revision templates which implement a pull-based workload. WorkerPool exists to provide a singular abstraction which can be access controlled, reasoned about, and which encapsulates software lifecycle decisions such as rollout policy and team resource ownership.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected in new resources. All system annotations in v1 now have a corresponding field in v2 WorkerPool. This field follows Kubernetes annotations' namespacing, limits, and rules. |
| `binaryAuthorization` | GoogleCloudRunV2BinaryAuthorization | Optional. Settings for the Binary Authorization feature. |
| `client` | string | Arbitrary identifier for the API client. |
| `clientVersion` | string | Arbitrary version identifier for the API client. |
| `conditions` | array<GoogleCloudRunV2Condition> | Output only. The Conditions of all other associated sub-resources. They contain additional diagnostics information in case the WorkerPool does not reach its Serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `createTime` | string (google-datetime) | Output only. The creation time. |
| `creator` | string | Output only. Email address of the authenticated creator. |
| `customAudiences` | array<string> | Deprecated: Not supported, and ignored by Cloud Run. |
| `deleteTime` | string (google-datetime) | Output only. The deletion time. It is only populated as a response to a Delete request. |
| `description` | string | User-provided description of the WorkerPool. This field currently has a 512-character limit. |
| `etag` | string | Optional. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `expireTime` | string (google-datetime) | Output only. For a deleted resource, the time after which it will be permamently deleted. |
| `generation` | string (int64) | Output only. A number that monotonically increases every time the user modifies the desired state. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. |
| `instanceSplitStatuses` | array<GoogleCloudRunV2InstanceSplitStatus> | Output only. Detailed status information for corresponding instance splits. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `instanceSplits` | array<GoogleCloudRunV2InstanceSplit> | Optional. Specifies how to distribute instances over a collection of Revisions belonging to the WorkerPool. If instance split is empty or not provided, defaults to 100% instances assigned to the latest `Ready` Revision. |
| `labels` | object | Optional. Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 WorkerPool. |
| `lastModifier` | string | Output only. Email address of the last authenticated modifier. |
| `latestCreatedRevision` | string | Output only. Name of the last created revision. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `latestReadyRevision` | string | Output only. Name of the latest revision that is serving workloads. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `launchStage` | string enum | Optional. The launch stage as defined by Google Cloud Platform Launch Stages (https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `name` | string | The fully qualified name of this WorkerPool. In CreateWorkerPoolRequest, this field is ignored, and instead composed from CreateWorkerPoolRequest.parent and CreateWorkerPoolRequest.worker_id. Format: `projects/{project}/locations/{location}/workerPools/{worker_id}` |
| `observedGeneration` | string (int64) | Output only. The generation of this WorkerPool currently serving workloads. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. |
| `reconciling` | boolean | Output only. Returns true if the WorkerPool is currently being acted upon by the system to bring it into the desired state. When a new WorkerPool is created, or an existing one is updated, Cloud Run will asynchronously perform all necessary steps to bring the WorkerPool to the desired serving state. This process is called reconciliation. While reconciliation is in process, `observed_generation`, `latest_ready_revison`, `instance_split_statuses`, and `uri` will have transient values that might mismatch the intended state: Once reconciliation is over (and this field is false), there are two possible outcomes: reconciliation succeeded and the serving state matches the WorkerPool, or there was an error, and reconciliation failed. This state can be found in `terminal_condition.state`. If reconciliation succeeded, the following fields will match: `instance_splits` and `instance_split_statuses`, `observed_generation` and `generation`, `latest_ready_revision` and `latest_created_revision`. If reconciliation failed, `instance_split_statuses`, `observed_generation`, and `latest_ready_revision` will have the state of the last serving revision, or empty for newly created WorkerPools. Additional information on the failure can be found in `terminal_condition` and `conditions`. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `scaling` | GoogleCloudRunV2WorkerPoolScaling | Optional. Specifies worker-pool-level scaling settings |
| `template` | GoogleCloudRunV2WorkerPoolRevisionTemplate | Required. The template used to create revisions for this WorkerPool. |
| `terminalCondition` | GoogleCloudRunV2Condition | Output only. The Condition of this WorkerPool, containing its readiness status, and detailed error information in case it did not reach a serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `threatDetectionEnabled` | boolean | Output only. Indicates whether Cloud Run Threat Detection monitoring is enabled for the parent project of this worker pool. |
| `uid` | string | Output only. Server assigned unique identifier for the trigger. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. |
| `updateTime` | string (google-datetime) | Output only. The last-modified time. |

### `GoogleCloudRunV2WorkerPoolRevisionTemplate`

- WorkerPoolRevisionTemplate describes the data a worker pool revision should have when created from a template.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system annotations in v1 now have a corresponding field in v2 WorkerPoolRevisionTemplate. This field follows Kubernetes annotations' namespacing, limits, and rules. |
| `client` | string | Optional. Arbitrary identifier for the API client. |
| `clientVersion` | string | Optional. Arbitrary version identifier for the API client. |
| `containers` | array<GoogleCloudRunV2Container> | Holds list of the containers that defines the unit of execution for this Revision. |
| `encryptionKey` | string | A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek |
| `encryptionKeyRevocationAction` | string enum | Optional. The action to take if the encryption key is revoked. Values: `ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED`, `PREVENT_NEW`, `SHUTDOWN`. |
| `encryptionKeyShutdownDuration` | string (google-duration) | Optional. If encryption_key_revocation_action is SHUTDOWN, the duration before shutting down all instances. The minimum increment is 1 hour. |
| `gpuZonalRedundancyDisabled` | boolean | Optional. True if GPU zonal redundancy is disabled on this worker pool. |
| `labels` | object | Optional. Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 WorkerPoolRevisionTemplate. |
| `nodeSelector` | GoogleCloudRunV2NodeSelector | Optional. The node selector for the revision template. |
| `revision` | string | Optional. The unique name for the revision. If this field is omitted, it will be automatically generated based on the WorkerPool name. |
| `sandboxes` | GoogleCloudRunV2SandboxConfiguration | Optional. Configuration for sandboxes. |
| `serviceAccount` | string | Optional. Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. If not provided, the revision will use the project's default service account. |
| `serviceMesh` | GoogleCloudRunV2ServiceMesh | Optional. Enables service mesh connectivity. |
| `volumes` | array<GoogleCloudRunV2Volume> | Optional. A list of Volumes to make available to containers. |
| `vpcAccess` | GoogleCloudRunV2VpcAccess | Optional. VPC Access configuration to use for this Revision. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. |

### `GoogleCloudRunV2WorkerPoolScaling`

- Worker pool scaling settings.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `manualInstanceCount` | integer (int32) | Optional. The total number of instances in manual scaling mode. |

### `GoogleCloudRunV2WorkloadIdentityConfig`

- Workload identity settings.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `identity` | string | Optional. The Revision's SPIFFE workload identity. Enables provisioning of SPIFFE workload certificates. |
| `identityCertificateEnabled` | boolean | Optional. Controls whether an instance receives a MWLID certificate. Corresponds to the intention of the original --\[no-\]identity-certificate flag. |
| `identityType` | string enum | Optional. The type of identity to use. Values: `IDENTITY_TYPE_UNSPECIFIED`, `IDENTITY_TYPE_SERVICE_ACCOUNT`, `IDENTITY_TYPE_AGENT_IDENTITY`. |

### `GoogleDevtoolsCloudbuildV1ApprovalConfig`

- ApprovalConfig describes configuration for manual approval of a build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `approvalRequired` | boolean | Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. |

### `GoogleDevtoolsCloudbuildV1ApprovalResult`

- ApprovalResult describes the decision and associated metadata of a manual approval of a build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `approvalTime` | string (google-datetime) | Output only. The time when the approval decision was made. |
| `approverAccount` | string | Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. |
| `comment` | string | Optional. An optional comment for this manual approval result. |
| `decision` | string enum | Required. The decision of this manual approval. Values: `DECISION_UNSPECIFIED`, `APPROVED`, `REJECTED`. |
| `url` | string | Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. |

### `GoogleDevtoolsCloudbuildV1ArtifactObjects`

- Files in the workspace to upload to Cloud Storage upon successful completion of all build steps.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `location` | string | Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. |
| `paths` | array<string> | Path globs used to match files in the build's workspace. |
| `timing` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing all artifact objects. |

### `GoogleDevtoolsCloudbuildV1Artifacts`

- Artifacts produced by a build that should be uploaded upon successful completion of all build steps.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `genericArtifacts` | array<GoogleDevtoolsCloudbuildV1GenericArtifact> | Optional. A list of generic artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. If any artifacts fail to be pushed, the build is marked FAILURE. |
| `goModules` | array<GoogleDevtoolsCloudbuildV1GoModule> | Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. |
| `images` | array<string> | A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. |
| `mavenArtifacts` | array<GoogleDevtoolsCloudbuildV1MavenArtifact> | A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. |
| `npmPackages` | array<GoogleDevtoolsCloudbuildV1NpmPackage> | A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. |
| `objects` | GoogleDevtoolsCloudbuildV1ArtifactObjects | A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. |
| `oci` | array<GoogleDevtoolsCloudbuildV1Oci> | Optional. A list of OCI images to be uploaded to Artifact Registry upon successful completion of all build steps. OCI images in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any images fail to be pushed, the build is marked FAILURE. |
| `pythonPackages` | array<GoogleDevtoolsCloudbuildV1PythonPackage> | A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. |

### `GoogleDevtoolsCloudbuildV1Build`

- A build resource in the Cloud Build API. At a high level, a `Build` describes where to find source code, how to build it (for example, the builder image to run on the source), and where to store the built artifacts. Fields can include the following variables, which will be expanded when the build is created: - $PROJECT_ID: the project ID of the build. - $PROJECT_NUMBER: the project number of the build. - $LOCATION: the location/region of the build. - $BUILD_ID: the autogenerated ID of the build. - $REPO_NAME: the source repository name specified by RepoSource. - $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA specified by RepoSource or resolved from the specified branch or tag. - $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `approval` | GoogleDevtoolsCloudbuildV1BuildApproval | Output only. Describes this build's approval configuration, status, and result. |
| `artifacts` | GoogleDevtoolsCloudbuildV1Artifacts | Artifacts produced by the build that should be uploaded upon successful completion of all build steps. |
| `availableSecrets` | GoogleDevtoolsCloudbuildV1Secrets | Secrets and secret environment variables. |
| `buildTriggerId` | string | Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. |
| `createTime` | string (google-datetime) | Output only. Time at which the request to create the build was received. |
| `dependencies` | array<GoogleDevtoolsCloudbuildV1Dependency> | Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. |
| `failureInfo` | GoogleDevtoolsCloudbuildV1FailureInfo | Output only. Contains information about the build when status=FAILURE. |
| `finishTime` | string (google-datetime) | Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. |
| `gitConfig` | GoogleDevtoolsCloudbuildV1GitConfig | Optional. Configuration for git operations. |
| `id` | string | Output only. Unique identifier of the build. |
| `images` | array<string> | A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. |
| `logUrl` | string | Output only. URL to logs for this build in Google Cloud Console. |
| `logsBucket` | string | Cloud Storage bucket where logs should be written (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. |
| `name` | string | Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. |
| `options` | GoogleDevtoolsCloudbuildV1BuildOptions | Special options for this build. |
| `projectId` | string | Output only. ID of the project. |
| `queueTtl` | string (google-duration) | TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. |
| `results` | GoogleDevtoolsCloudbuildV1Results | Output only. Results of the build. |
| `secrets` | array<GoogleDevtoolsCloudbuildV1Secret> | Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets |
| `serviceAccount` | string | IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. |
| `source` | GoogleDevtoolsCloudbuildV1Source | Optional. The location of the source files to build. |
| `sourceProvenance` | GoogleDevtoolsCloudbuildV1SourceProvenance | Output only. A permanent fixed identifier for source. |
| `startTime` | string (google-datetime) | Output only. Time at which execution of the build was started. |
| `status` | string enum | Output only. Status of the build. Values: `STATUS_UNKNOWN`, `PENDING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED`. |
| `statusDetail` | string | Output only. Customer-readable message about the current status. |
| `steps` | array<GoogleDevtoolsCloudbuildV1BuildStep> | Required. The operations to be performed on the workspace. |
| `substitutions` | object | Substitutions data for `Build` resource. |
| `tags` | array<string> | Tags for annotation of a `Build`. These are not docker tags. |
| `timeout` | string (google-duration) | Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. |
| `timing` | object | Output only. Stores timing information for phases of the build. Valid keys are: \* BUILD: time to execute all build steps. \* PUSH: time to push all artifacts including docker images and non docker artifacts. \* FETCHSOURCE: time to fetch source. \* SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. |
| `warnings` | array<GoogleDevtoolsCloudbuildV1Warning> | Output only. Non-fatal problems encountered during the execution of the build. |

### `GoogleDevtoolsCloudbuildV1BuildApproval`

- BuildApproval describes a build's approval configuration, state, and result.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `config` | GoogleDevtoolsCloudbuildV1ApprovalConfig | Output only. Configuration for manual approval of this build. |
| `result` | GoogleDevtoolsCloudbuildV1ApprovalResult | Output only. Result of manual approval for this Build. |
| `state` | string enum | Output only. The state of this build's approval. Values: `STATE_UNSPECIFIED`, `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`. |

### `GoogleDevtoolsCloudbuildV1BuildOperationMetadata`

- Metadata for build operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `build` | GoogleDevtoolsCloudbuildV1Build | The build that the operation is tracking. |

### `GoogleDevtoolsCloudbuildV1BuildOptions`

- Optional arguments to enable specific features of builds.
- Version: v2

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
| `pool` | GoogleDevtoolsCloudbuildV1PoolOption | Optional. Specification for execution on a `WorkerPool`. See running builds in a private pool (https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. |
| `pubsubTopic` | string | Optional. Option to specify the Pub/Sub topic to receive build status updates. |
| `rankedMachineSeries` | array<string> | Optional. Ranked list (earlier items have higher priority) of Machine Series to consider when provisioning Worker VMs. A concrete machine type will be selected based on machine availability in the given region. This field must be empty for the Build to be eligible to be paired with a pre-provisioned worker VM. Values: `MACHINE_SERIES_UNSPECIFIED`, `MACHINE_SERIES_E`, `MACHINE_SERIES_N`, `MACHINE_SERIES_C`. |
| `requestedVerifyOption` | string enum | Requested verifiability options. Values: `NOT_VERIFIED`, `VERIFIED`, `BEST_EFFORT`. |
| `resolvedWorkerRelease` | string | Output only. Worker release resolved from the release channel. |
| `secretEnv` | array<string> | A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. |
| `sourceProvenanceHash` | array<string> | Requested hash for SourceProvenance. Values: `NONE`, `SHA256`, `MD5`, `GO_MODULE_H1`, `SHA512`, `DIRSUM_SHA256`. |
| `substitutionOption` | string enum | Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. Values: `MUST_MATCH`, `ALLOW_LOOSE`. |
| `volumes` | array<GoogleDevtoolsCloudbuildV1Volume> | Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. |
| `workerPool` | string | This field deprecated; please use `pool.name` instead. |
| `workerRelease` | string | Optional. Option to specify which release or release channel (rapid\|regular\|stable) to use to run this build. |

### `GoogleDevtoolsCloudbuildV1BuildResourceUsage`

- Aggregated/summary metrics over the entire build lifecycle.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `averageCpuUtilization` | number (float) | Output only. The average CPU utilization ratio across all vCPUs over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `averageMemoryUtilization` | number (float) | Output only. The average memory utilization ratio over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `peakCpuUtilization` | number (float) | Output only. The highest CPU utilization ratio across all vCPUs observed over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `peakMemoryUtilization` | number (float) | Output only. The highest memory utilization ratio observed over the duration of the build, expressed as a fraction in the range \[0.0, 1.0\]. |
| `totalCpuDuration` | string (google-duration) | Output only. Total CPU execution time consumed across all cores during build execution. |

### `GoogleDevtoolsCloudbuildV1BuildStep`

- A step in the build pipeline.
- Version: v2

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
| `pullTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pulling this build step's builder image only. |
| `results` | array<GoogleDevtoolsCloudbuildV1StepResult> | Declaration of results for this build step. |
| `script` | string | A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. |
| `secretEnv` | array<string> | A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. |
| `status` | string enum | Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. Values: `STATUS_UNKNOWN`, `PENDING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED`. |
| `timeout` | string (google-duration) | Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. |
| `timing` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for executing this build step. |
| `volumes` | array<GoogleDevtoolsCloudbuildV1Volume> | List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. |
| `waitFor` | array<string> | The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. |

### `GoogleDevtoolsCloudbuildV1BuildStepResults`

- Results for a build step.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `results` | object | Results for a build step. |

### `GoogleDevtoolsCloudbuildV1BuiltImage`

- An image built by the pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `digest` | string | Docker Registry 2.0 digest. |
| `name` | string | Name used to push the container image to Google Container Registry, as presented to `docker push`. |
| `ociMediaType` | string enum | Output only. The OCI media type of the artifact. Non-OCI images, such as Docker images, will have an unspecified value. Values: `OCI_MEDIA_TYPE_UNSPECIFIED`, `IMAGE_MANIFEST`, `IMAGE_INDEX`. |
| `pushTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified image. |

### `GoogleDevtoolsCloudbuildV1ConnectedRepository`

- Location of the source in a 2nd-gen Google Cloud Build repository resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. |
| `repository` | string | Required. Name of the Google Cloud Build repository, formatted as `projects/*/locations/*/connections/*/repositories/*`. |
| `revision` | string | Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. |

### `GoogleDevtoolsCloudbuildV1Dependency`

- A dependency that the Cloud Build worker will fetch before executing user steps.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `empty` | boolean | If set to true disable all dependency fetching (ignoring the default source as well). |
| `genericArtifact` | GoogleDevtoolsCloudbuildV1GenericArtifactDependency | Represents a generic artifact as a build dependency. |
| `gitSource` | GoogleDevtoolsCloudbuildV1GitSourceDependency | Represents a git repository as a build dependency. |

### `GoogleDevtoolsCloudbuildV1DeveloperConnectConfig`

- This config defines the location of a source through Developer Connect.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dir` | string | Required. Directory, relative to the source root, in which to run the build. |
| `gitRepositoryLink` | string | Required. The Developer Connect Git repository link, formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*`. |
| `revision` | string | Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. |

### `GoogleDevtoolsCloudbuildV1FailureInfo`

- A fatal problem encountered during the execution of the build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `detail` | string | Explains the failure issue in more detail using hard-coded text. |
| `type` | string enum | The name of the failure. Values: `FAILURE_TYPE_UNSPECIFIED`, `PUSH_FAILED`, `PUSH_IMAGE_NOT_FOUND`, `PUSH_NOT_AUTHORIZED`, `LOGGING_FAILURE`, `USER_BUILD_STEP`, `FETCH_SOURCE_FAILED`. |

### `GoogleDevtoolsCloudbuildV1FileHashes`

- Container message for hashes of byte content of files, used in SourceProvenance messages to verify integrity of source input to the build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fileHash` | array<GoogleDevtoolsCloudbuildV1Hash> | Collection of file hashes. |

### `GoogleDevtoolsCloudbuildV1GenericArtifact`

- Generic artifact to upload to Artifact Registry upon successful completion of all build steps.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `folder` | string | Required. Path to the generic artifact in the build's workspace to be uploaded to Artifact Registry. |
| `registryPath` | string | Required. Registry path to upload the generic artifact to, in the form projects/$PROJECT/locations/$LOCATION/repositories/$REPO/packages/$PACKAGE/versions/$VERSION |

### `GoogleDevtoolsCloudbuildV1GenericArtifactDependency`

- Represents a generic artifact as a build dependency.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `destPath` | string | Optional. Where the artifact files should be placed on the worker. Required when specified in `Build.dependencies`. |
| `resource` | string | Required. The location to download the artifact files from. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1 |

### `GoogleDevtoolsCloudbuildV1GitConfig`

- GitConfig is a configuration for git operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `http` | GoogleDevtoolsCloudbuildV1HttpConfig | Configuration for HTTP related git operations. |

### `GoogleDevtoolsCloudbuildV1GitSource`

- Location of the source in any accessible Git repository.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dir` | string | Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. |
| `revision` | string | Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#\_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. |
| `url` | string | Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. |

### `GoogleDevtoolsCloudbuildV1GitSourceDependency`

- Represents a git repository as a build dependency.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `depth` | string (int64) | Optional. How much history should be fetched for the build (default 1, -1 for all history). |
| `destPath` | string | Required. Where should the files be placed on the worker. |
| `fetchTags` | boolean | Optional. True if remote tags should be fetched too (default false). Note: when depth is 1 (default), git fetch only retrieves tags pointing to commits within the shallow boundary. Set depth to -1 to fetch all historical tags. |
| `recurseSubmodules` | boolean | Optional. True if submodules should be fetched too (default false). |
| `repository` | GoogleDevtoolsCloudbuildV1GitSourceRepository | Required. The kind of repo (url or dev connect). |
| `revision` | string | Required. The revision that we will fetch the repo at. |

### `GoogleDevtoolsCloudbuildV1GitSourceRepository`

- A repository for a git source.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `developerConnect` | string | The Developer Connect Git repository link formatted as `projects/*/locations/*/connections/*/gitRepositoryLink/*` |
| `url` | string | Location of the Git repository. |

### `GoogleDevtoolsCloudbuildV1GoModule`

- Go module to upload to Artifact Registry upon successful completion of all build steps. A module refers to all dependencies in a go.mod file.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `modulePath` | string | Optional. The Go module's "module path". e.g. example.com/foo/v2 |
| `moduleVersion` | string | Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 |
| `repositoryLocation` | string | Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. |
| `repositoryName` | string | Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo |
| `repositoryProjectId` | string | Optional. Project ID of the Artifact Registry repository. Defaults to the build project. |
| `sourcePath` | string | Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage |

### `GoogleDevtoolsCloudbuildV1Hash`

- Container message for hash values.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `type` | string enum | The type of hash that was performed. Values: `NONE`, `SHA256`, `MD5`, `GO_MODULE_H1`, `SHA512`, `DIRSUM_SHA256`. |
| `value` | string (byte) | The hash value. |

### `GoogleDevtoolsCloudbuildV1HttpConfig`

- HttpConfig is a configuration for HTTP related git operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `proxySecretVersionName` | string | SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. |

### `GoogleDevtoolsCloudbuildV1InlineSecret`

- Pairs a set of secret environment variables mapped to encrypted values with the Cloud KMS key to use to decrypt the value.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `envMap` | object | Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. |
| `kmsKeyName` | string | Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/\*/locations/\*/keyRings/\*/cryptoKeys/\* |

### `GoogleDevtoolsCloudbuildV1MavenArtifact`

- A Maven artifact to upload to Artifact Registry upon successful completion of all build steps.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Maven `artifactId` value used when uploading the artifact to Artifact Registry. |
| `deployFolder` | string | Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. |
| `groupId` | string | Maven `groupId` value used when uploading the artifact to Artifact Registry. |
| `path` | string | Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. |
| `version` | string | Maven `version` value used when uploading the artifact to Artifact Registry. |

### `GoogleDevtoolsCloudbuildV1NpmPackage`

- Npm package to upload to Artifact Registry upon successful completion of all build steps.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `packagePath` | string | Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. |

### `GoogleDevtoolsCloudbuildV1Oci`

- OCI image to upload to Artifact Registry upon successful completion of all build steps.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `file` | string | Required. Path on the local file system where to find the container to upload. e.g. /workspace/my-image.tar |
| `registryPath` | string | Required. Registry path to upload the container to. e.g. us-east1-docker.pkg.dev/my-project/my-repo/my-image |
| `tags` | array<string> | Optional. Tags to apply to the uploaded image. e.g. latest, 1.0.0 |

### `GoogleDevtoolsCloudbuildV1PoolOption`

- Details about how a build should be executed on a `WorkerPool`. See running builds in a private pool (https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} |
| `resolvedWorkerRelease` | string | Output only. OUTPUT_ONLY. Worker release resolved from the release channel. |
| `workerRelease` | string | Output only. OUTPUT_ONLY. The release or release channel used to run the Build. This is set to the same value as `PrivatePoolV1Config.WorkerConfig.worker_release` for the UI to easily access. |

### `GoogleDevtoolsCloudbuildV1PythonPackage`

- Python package to upload to Artifact Registry upon successful completion of all build steps. A package can encapsulate multiple objects to be uploaded to a single repository.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `paths` | array<string> | Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. |
| `repository` | string | Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. |

### `GoogleDevtoolsCloudbuildV1RepoSource`

- Location of the source in a Google Cloud Source Repository.
- Version: v2

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

### `GoogleDevtoolsCloudbuildV1Results`

- Artifacts created by the build pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactManifest` | string | Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. |
| `artifactTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Time to push all non-container artifacts to Cloud Storage. |
| `buildStepImages` | array<string> | List of build step digests, in the order corresponding to build step indices. |
| `buildStepOutputs` | array<string> | List of build step outputs, produced by builder images, in the order corresponding to build step indices. Cloud Builders (https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. |
| `buildStepResults` | object | Results for build steps. step_id -> |
| `genericArtifacts` | array<GoogleDevtoolsCloudbuildV1UploadedGenericArtifact> | Output only. Generic artifacts uploaded to Artifact Registry at the end of the build. |
| `goModules` | array<GoogleDevtoolsCloudbuildV1UploadedGoModule> | Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. |
| `images` | array<GoogleDevtoolsCloudbuildV1BuiltImage> | Container images that were built as a part of the build. |
| `mavenArtifacts` | array<GoogleDevtoolsCloudbuildV1UploadedMavenArtifact> | Maven artifacts uploaded to Artifact Registry at the end of the build. |
| `npmPackages` | array<GoogleDevtoolsCloudbuildV1UploadedNpmPackage> | Npm packages uploaded to Artifact Registry at the end of the build. |
| `numArtifacts` | string (int64) | Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. |
| `pythonPackages` | array<GoogleDevtoolsCloudbuildV1UploadedPythonPackage> | Python artifacts uploaded to Artifact Registry at the end of the build. |
| `resourceUsage` | GoogleDevtoolsCloudbuildV1BuildResourceUsage | Output only. Aggregated metrics for the build. |

### `GoogleDevtoolsCloudbuildV1Secret`

- Pairs a set of secret environment variables containing encrypted values with the Cloud KMS key to use to decrypt the value. Note: Use `kmsKeyName` with `available_secrets` instead of using `kmsKeyName` with `secret`. For instructions see: https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-credentials.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Cloud KMS key name to use to decrypt these envs. |
| `secretEnv` | object | Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. |

### `GoogleDevtoolsCloudbuildV1SecretManagerSecret`

- Pairs a secret environment variable with a SecretVersion in Secret Manager.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `env` | string | Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. |
| `versionName` | string | Resource name of the SecretVersion. In format: projects/\*/secrets/\*/versions/\* |

### `GoogleDevtoolsCloudbuildV1Secrets`

- Secrets and secret environment variables.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `inline` | array<GoogleDevtoolsCloudbuildV1InlineSecret> | Secrets encrypted with KMS key and the associated secret environment variable. |
| `secretManager` | array<GoogleDevtoolsCloudbuildV1SecretManagerSecret> | Secrets in Secret Manager and associated secret environment variable. |

### `GoogleDevtoolsCloudbuildV1Source`

- Location of the source in a supported storage service.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `connectedRepository` | GoogleDevtoolsCloudbuildV1ConnectedRepository | Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. |
| `developerConnectConfig` | GoogleDevtoolsCloudbuildV1DeveloperConnectConfig | If provided, get the source from this Developer Connect config. |
| `gitSource` | GoogleDevtoolsCloudbuildV1GitSource | If provided, get the source from this Git repository. |
| `repoSource` | GoogleDevtoolsCloudbuildV1RepoSource | If provided, get the source from this location in a Cloud Source Repository. |
| `storageSource` | GoogleDevtoolsCloudbuildV1StorageSource | If provided, get the source from this location in Cloud Storage. |
| `storageSourceManifest` | GoogleDevtoolsCloudbuildV1StorageSourceManifest | If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description here (https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). |

### `GoogleDevtoolsCloudbuildV1SourceProvenance`

- Provenance of the source. Ways to find the original source, or verify that some source was used for this build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fileHashes` | object | Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. |
| `resolvedConnectedRepository` | GoogleDevtoolsCloudbuildV1ConnectedRepository | Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. |
| `resolvedGitSource` | GoogleDevtoolsCloudbuildV1GitSource | Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. |
| `resolvedRepoSource` | GoogleDevtoolsCloudbuildV1RepoSource | A copy of the build's `source.repo_source`, if exists, with any revisions resolved. |
| `resolvedStorageSource` | GoogleDevtoolsCloudbuildV1StorageSource | A copy of the build's `source.storage_source`, if exists, with any generations resolved. |
| `resolvedStorageSourceManifest` | GoogleDevtoolsCloudbuildV1StorageSourceManifest | A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. |

### `GoogleDevtoolsCloudbuildV1StepResult`

- StepResult is the declaration of a result for a build step.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attestationContent` | string | Optional. The content of the attestation to be generated. |
| `attestationType` | string | Optional. The type of attestation to be generated. |
| `name` | string | Required. The name of the result. |

### `GoogleDevtoolsCloudbuildV1StorageSource`

- Location of the source in an archive file in Cloud Storage.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Cloud Storage bucket containing the source (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. |
| `sourceFetcher` | string enum | Optional. Option to specify the tool to fetch the source file for the build. Values: `SOURCE_FETCHER_UNSPECIFIED`, `GSUTIL`, `GCS_FETCHER`. |

### `GoogleDevtoolsCloudbuildV1StorageSourceManifest`

- Location of the source manifest in Cloud Storage. This feature is in Preview; see description here (https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Cloud Storage bucket containing the source manifest (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Required. Cloud Storage object containing the source manifest. This object must be a JSON file. |

### `GoogleDevtoolsCloudbuildV1TimeSpan`

- Start and end times for a build execution phase.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | End of time span. |
| `startTime` | string (google-datetime) | Start of time span. |

### `GoogleDevtoolsCloudbuildV1UploadedGenericArtifact`

- A generic artifact uploaded to Artifact Registry using the GenericArtifact directive.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactFingerprint` | GoogleDevtoolsCloudbuildV1FileHashes | Output only. The hash of the whole artifact. |
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | object | Output only. The file hashes that make up the generic artifact. |
| `pushTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | Output only. URI of the uploaded artifact. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1 |

### `GoogleDevtoolsCloudbuildV1UploadedGoModule`

- A Go module artifact uploaded to Artifact Registry using the GoModule directive.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | GoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the Go Module Artifact. |
| `pushTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `GoogleDevtoolsCloudbuildV1UploadedMavenArtifact`

- A Maven artifact uploaded using the MavenArtifact directive.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | GoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the Maven Artifact. |
| `pushTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `GoogleDevtoolsCloudbuildV1UploadedNpmPackage`

- An npm package uploaded to Artifact Registry using the NpmPackage directive.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | GoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the npm package. |
| `pushTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded npm package. |

### `GoogleDevtoolsCloudbuildV1UploadedPythonPackage`

- Artifact uploaded using the PythonPackage directive.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | GoogleDevtoolsCloudbuildV1FileHashes | Hash types and values of the Python Artifact. |
| `pushTiming` | GoogleDevtoolsCloudbuildV1TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `GoogleDevtoolsCloudbuildV1Volume`

- Volume describes a Docker container volume which is mounted into build steps in order to persist files across build step execution.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. |
| `path` | string | Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. |

### `GoogleDevtoolsCloudbuildV1Warning`

- A non-fatal problem encountered during the execution of the build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `priority` | string enum | The priority for this warning. Values: `PRIORITY_UNSPECIFIED`, `INFO`, `WARNING`, `ALERT`. |
| `text` | string | Explanation of the warning generated. |

### `GoogleIamV1AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<GoogleIamV1AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `GoogleIamV1AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `GoogleIamV1Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | GoogleTypeExpr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `GoogleIamV1Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<GoogleIamV1AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<GoogleIamV1Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GoogleIamV1SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policy` | GoogleIamV1Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `GoogleIamV1TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `GoogleIamV1TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleLongrunningWaitOperationRequest`

- The request message for Operations.WaitOperation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `timeout` | string (google-duration) | The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `GoogleTypeExpr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `HTTPGetAction`

- HTTPGetAction describes an action based on HTTP Get requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Not supported by Cloud Run. |
| `httpHeaders` | array<HTTPHeader> | Custom headers to set in the request. HTTP allows repeated headers. |
| `path` | string | Path to access on the HTTP server. |
| `port` | integer (int32) | Port number to access on the container. Number must be in the range 1 to 65535. |
| `scheme` | string | Not supported by Cloud Run. |

### `HTTPHeader`

- HTTPHeader describes a custom header to be used in HTTP probes
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The header field name |
| `value` | string | The header field value |

### `Instance`

- An Instance represents the configuration of a single instance that references a container image and runs to completion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. |
| `kind` | string | Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. |
| `metadata` | ObjectMeta | Optional. Standard object's metadata. |
| `spec` | InstanceSpec | Optional. Specification of the desired behavior of an Instance. |
| `status` | InstanceStatus | Output only. Current status of an Instance. |

### `InstanceSpec`

- InstanceSpec describes how the Instance will look.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containers` | array<Container> | Optional. List of containers belonging to the Instance. We disallow a number of fields on this Container. |
| `nodeSelector` | object | Optional. The Node Selector configuration. Map of selector key to a value which matches a node. |
| `restartPolicy` | string | Optional. Restart policy for the Instance. Allowable values are 'Always', 'OnFailure', or 'Never'. |
| `sandboxes` | SandboxConfiguration | Optional. Sandbox configuration that can be launched through the `sandbox` CLI. |
| `serviceAccountName` | string | Optional. Email address of the IAM service account associated with the Instance. The service account represents the identity of the running container, and determines what permissions the Instance has. If not provided, the Instance will use the project's default service account. |
| `volumes` | array<Volume> | Optional. List of volumes that can be mounted by containers belonging to the Instance. |

### `InstanceSplit`

- Holds a single instance split entry for the Worker. Allocations can be done to a specific Revision name, or pointing to the latest Ready Revision.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latestRevision` | boolean | Uses the "status.latestReadyRevisionName" to determine the instance split target. When it changes, workloads will automatically migrate from the prior "latest ready" revision to the new one. |
| `percent` | integer (int32) | Optional. Specifies percent of the instance split to this Revision. This defaults to zero if unspecified. |
| `revisionName` | string | Revision to which to assign this portion of instances. |

### `InstanceStatus`

- InstanceStatus represents the current state of an Instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<GoogleCloudRunV1Condition> | Output only. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Instance-specific conditions include: \* `Ready`: `True` when the Instance is ready to be executed. |
| `logUri` | string | Optional. URI where logs for this execution can be found in Cloud Console. |
| `observedGeneration` | integer (int32) | Output only. The 'generation' of the Instance that was last processed by the controller. |
| `urls` | array<string> | Output only. All URLs serving traffic for this Instance. |

### `Job`

- Job represents the configuration of a single job, which references a container image which is run to completion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. |
| `kind` | string | Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. |
| `metadata` | ObjectMeta | Optional. Standard object's metadata. |
| `spec` | JobSpec | Optional. Specification of the desired behavior of a job. |
| `status` | JobStatus | Output only. Current status of a job. |

### `JobSpec`

- JobSpec describes how the job will look.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `runExecutionToken` | string | A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully completed. The sum of job name and token length must be fewer than 63 characters. |
| `startExecutionToken` | string | A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully started. The sum of job name and token length must be fewer than 63 characters. |
| `template` | ExecutionTemplateSpec | Optional. Describes the execution that will be created when running a job. |

### `JobStatus`

- JobStatus represents the current state of a Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<GoogleCloudRunV1Condition> | Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Job-specific conditions include: \* `Ready`: `True` when the job is ready to be executed. |
| `executionCount` | integer (int32) | Number of executions created for this job. |
| `latestCreatedExecution` | ExecutionReference | A pointer to the most recently created execution for this job. This is set regardless of the eventual state of the execution. |
| `observedGeneration` | integer (int32) | The 'generation' of the job that was last processed by the controller. |

### `KeyToPath`

- Maps a string key to a path within a volume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | The Cloud Secret Manager secret version. Can be 'latest' for the latest value, or an integer or a secret alias for a specific version. The key to project. |
| `mode` | integer (int32) | (Optional) Mode bits to use on this file, must be a value between 01 and 0777 (octal). If 0 or not set, the Volume's default mode will be used. Notes \* Internally, a umask of 0222 will be applied to any non-zero value. \* This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). \* This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. |
| `path` | string | The relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'. |

### `ListAuthorizedDomainsResponse`

- A list of Authorized Domains.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domains` | array<AuthorizedDomain> | The authorized domains belonging to the user. |
| `nextPageToken` | string | Continuation token for fetching the next page of results. |

### `ListConfigurationsResponse`

- ListConfigurationsResponse is a list of Configuration resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "serving.knative.dev/v1". |
| `items` | array<Configuration> | List of Configurations. |
| `kind` | string | The kind of this resource, in this case "ConfigurationList". |
| `metadata` | ListMeta | Metadata associated with this Configuration list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDomainMappingsResponse`

- ListDomainMappingsResponse is a list of DomainMapping resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "domains.cloudrun.com/v1". |
| `items` | array<DomainMapping> | List of DomainMappings. |
| `kind` | string | The kind of this resource, in this case "DomainMappingList". |
| `metadata` | ListMeta | Metadata associated with this DomainMapping list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListExecutionsResponse`

- ListExecutionsResponse is a list of Executions resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "run.googleapis.com/v1". |
| `items` | array<Execution> | List of Executions. |
| `kind` | string | The kind of this resource, in this case "ExecutionsList". |
| `metadata` | ListMeta | Metadata associated with this executions list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInstancesResponse`

- ListInstancesResponse is a list of Instances resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "run.googleapis.com/v1". |
| `items` | array<Instance> | List of Instances. |
| `kind` | string | The kind of this resource, in this case "InstancesList". |
| `metadata` | ListMeta | Metadata associated with this Instances list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListJobsResponse`

- ListJobsResponse is a list of Jobs resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "run.googleapis.com/v1". |
| `items` | array<Job> | List of Jobs. |
| `kind` | string | The kind of this resource, in this case "JobsList". |
| `metadata` | ListMeta | Metadata associated with this jobs list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMeta`

- Metadata for synthetic resources like List. In Cloud Run, all List Resources Responses will have a ListMeta instead of ObjectMeta.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `continue` | string | Continuation token is a value emitted when the count of items is larger than the user/system limit. To retrieve the next page of items, pass the value of `continue` as the next request's `page_token`. |
| `resourceVersion` | string | Opaque string that identifies the server's internal version of this object. It can be used by clients to determine when objects have changed. If the message is passed back to the server, it must be left unmodified. |
| `selfLink` | string | URL representing this object. |

### `ListRevisionsResponse`

- ListRevisionsResponse is a list of Revision resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "serving.knative.dev/v1". |
| `items` | array<Revision> | List of Revisions. |
| `kind` | string | The kind of this resource, in this case "RevisionList". |
| `metadata` | ListMeta | Metadata associated with this revision list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRoutesResponse`

- ListRoutesResponse is a list of Route resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "serving.knative.dev/v1". |
| `items` | array<Route> | List of Routes. |
| `kind` | string | The kind of this resource, in this case always "RouteList". |
| `metadata` | ListMeta | Metadata associated with this Route list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListServicesResponse`

- A list of Service resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call; returns "serving.knative.dev/v1". |
| `items` | array<Service> | List of Services. |
| `kind` | string | The kind of this resource; returns "ServiceList". |
| `metadata` | ListMeta | Metadata associated with this Service list. |
| `unreachable` | array<string> | For calls against the global endpoint, returns the list of Cloud locations that could not be reached. For regional calls, this field is not used. |

### `ListTasksResponse`

- ListTasksResponse is a list of Tasks resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "run.googleapis.com/v1". |
| `items` | array<Task> | List of Tasks. |
| `kind` | string | The kind of this resource, in this case "TasksList". |
| `metadata` | ListMeta | Metadata associated with this tasks list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListWorkerPoolsResponse`

- A list of WorkerPool resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call; returns "run.googleapis.com/v1". |
| `items` | array<WorkerPool> | List of WorkerPools. |
| `kind` | string | The kind of this resource; returns "WorkerPoolList". |
| `metadata` | ListMeta | Metadata associated with this WorkerPool list. |
| `unreachable` | array<string> | For calls against the global endpoint, returns the list of Cloud locations that could not be reached. For regional calls, this field is not used. |

### `LocalObjectReference`

- Not supported by Cloud Run. LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the referent. |

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

### `NFSVolumeSource`

- Represents a persistent volume that will be mounted using NFS. This volume will be shared between all instances of the resource and data will not be deleted when the instance is shut down.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Path that is exported by the NFS server. |
| `readOnly` | boolean | If true, mount the NFS volume as read only. Defaults to false. |
| `server` | string | Hostname or IP address of the NFS server. |

### `ObjectMeta`

- google.cloud.run.meta.v1.ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. \* `autoscaling.knative.dev/maxScale`: Revision. \* `autoscaling.knative.dev/minScale`: Revision. \* `run.googleapis.com/base-images`: Service, Revision. \* `run.googleapis.com/binary-authorization-breakglass`: Service, Job, \* `run.googleapis.com/binary-authorization`: Service, Job, Execution. \* `run.googleapis.com/build-base-image`: Service. \* `run.googleapis.com/build-enable-automatic-updates`: Service. \* `run.googleapis.com/build-environment-variables`: Service. \* `run.googleapis.com/build-function-target`: Service, Revision. \* `run.googleapis.com/build-id`: Service, Revision. \* `run.googleapis.com/build-image-uri`: Service. \* `run.googleapis.com/build-name`: Service. \* `run.googleapis.com/build-service-account`: Service. \* `run.googleapis.com/build-source-location`: Service, Revision. \* `run.googleapis.com/build-worker-pool`: Service. \* `run.googleapis.com/client-name`: All resources. \* `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. \* `run.googleapis.com/container-dependencies`: Revision, Instance. \* `run.googleapis.com/cpu-throttling`: Revision. \* `run.googleapis.com/custom-audiences`: Service. \* `run.googleapis.com/default-url-disabled`: Service. \* `run.googleapis.com/description`: Service. \* `run.googleapis.com/encryption-key-shutdown-hours`: Revision. \* `run.googleapis.com/encryption-key`: Revision, Execution, Instance. \* `run.googleapis.com/execution-environment`: Revision, Execution. \* `run.googleapis.com/gc-traffic-tags`: Service. \* `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. \* `run.googleapis.com/health-check-disabled`: Revision. \* `run.googleapis.com/ingress`: Service, Instance. \* `run.googleapis.com/invoker-iam-disabled`: Service, Instance. \* `run.googleapis.com/launch-stage`: Service, Job. \* `run.googleapis.com/minScale`: Service. \* `run.googleapis.com/maxScale`: Service. \* `run.googleapis.com/manualInstanceCount`: Service. \* `run.googleapis.com/network-interfaces`: Revision, Execution, Instance. \* `run.googleapis.com/post-key-revocation-action-type`: Revision. \* `run.googleapis.com/scalingMode`: Service. \* `run.googleapis.com/secrets`: Revision, Execution. \* `run.googleapis.com/secure-session-agent`: Revision. \* `run.googleapis.com/sessionAffinity`: Revision. \* `run.googleapis.com/startup-cpu-boost`: Revision. \* `run.googleapis.com/vpc-access-connector`: Revision, Execution. \* `run.googleapis.com/vpc-access-egress`: Revision, Execution, Instance. |
| `clusterName` | string | Not supported by Cloud Run |
| `creationTimestamp` | string (google-datetime) | UTC timestamp representing the server time when this object was created. |
| `deletionGracePeriodSeconds` | integer (int32) | Not supported by Cloud Run |
| `deletionTimestamp` | string (google-datetime) | The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API. |
| `finalizers` | array<string> | Not supported by Cloud Run |
| `generateName` | string | Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix. |
| `generation` | integer (int32) | A system-provided sequence number representing a specific generation of the desired state. |
| `labels` | object | Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes. |
| `name` | string | Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated. |
| `namespace` | string | Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number. |
| `ownerReferences` | array<OwnerReference> | Not supported by Cloud Run |
| `resourceVersion` | string | Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection. |
| `selfLink` | string | URL representing this object. |
| `uid` | string | Unique, system-generated identifier for this resource. |

### `Overrides`

- RunJob Overrides that contains Execution fields to be overridden on the go.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containerOverrides` | array<ContainerOverride> | Per container override specification. |
| `delayExecution` | boolean | Optional. If true, the system will start the execution within the next 12 hours depending on available capacity. |
| `taskCount` | integer (int32) | The desired number of tasks the execution should run. Will replace existing task_count value. |
| `timeoutSeconds` | integer (int32) | Duration in seconds the task may be active before the system will actively try to mark it failed and kill associated containers. Will replace existing timeout_seconds value. |

### `OwnerReference`

- This is not supported or used by Cloud Run.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | This is not supported or used by Cloud Run. |
| `blockOwnerDeletion` | boolean | This is not supported or used by Cloud Run. |
| `controller` | boolean | This is not supported or used by Cloud Run. |
| `kind` | string | This is not supported or used by Cloud Run. |
| `name` | string | This is not supported or used by Cloud Run. |
| `uid` | string | This is not supported or used by Cloud Run. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Probe`

- Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exec` | ExecAction | Not supported by Cloud Run. |
| `failureThreshold` | integer (int32) | Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1. |
| `grpc` | GRPCAction | GRPCAction specifies an action involving a GRPC port. |
| `httpGet` | HTTPGetAction | HTTPGet specifies the http request to perform. |
| `initialDelaySeconds` | integer (int32) | Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. |
| `periodSeconds` | integer (int32) | How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds. |
| `successThreshold` | integer (int32) | Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set. |
| `tcpSocket` | TCPSocketAction | TCPSocket specifies an action involving a TCP port. |
| `timeoutSeconds` | integer (int32) | Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10. |

### `Proto2BridgeMessageSet`

- This is proto2's version of MessageSet. DEPRECATED: DO NOT USE FOR NEW FIELDS. If you are using editions or proto2, please make your own extendable messages for your use case. If you are using proto3, please use `Any` instead. MessageSet was the implementation of extensions for proto1. When proto2 was introduced, extensions were implemented as a first-class feature. This schema for MessageSet was meant to be a "bridge" solution to migrate MessageSet-bearing messages from proto1 to proto2. This schema has been open-sourced only to facilitate the migration of Google products with MessageSet-bearing messages to open-source environments.
- Version: v2

### `ResourceRecord`

- A DNS resource record.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the resource record relative to its apex domain, e.g. `www` for `www.example.com`. Omitted for apex records. |
| `rrdata` | string | Data for this record. Values vary by record type, as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1). |
| `type` | string enum | Resource record type. Example: `AAAA`. Values: `RECORD_TYPE_UNSPECIFIED`, `A`, `AAAA`, `CNAME`. |

### `ResourceRequirements`

- ResourceRequirements describes the compute resource requirements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `limits` | object | Limits describes the maximum amount of compute resources allowed. Only 'cpu', 'memory' and 'nvidia.com/gpu' keys are supported. \* For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. \* For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits. \* The only supported 'nvidia.com/gpu' value is '1'. |
| `requests` | object | Requests describes the minimum amount of compute resources required. Only `cpu` and `memory` are supported. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. \* For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. \* For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits |

### `Revision`

- Revision is an immutable snapshot of code and configuration. A revision references one or more container images. Revisions are created by updates to a Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "serving.knative.dev/v1". |
| `kind` | string | The kind of this resource, in this case "Revision". |
| `metadata` | ObjectMeta | Metadata associated with this Revision, including name, namespace, labels, and annotations. |
| `spec` | RevisionSpec | Spec holds the desired state of the Revision (from the client). |
| `status` | RevisionStatus | Status communicates the observed state of the Revision (from the controller). |

### `RevisionSpec`

- RevisionSpec holds the desired state of the Revision (from the client).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containerConcurrency` | integer (int32) | ContainerConcurrency specifies the maximum allowed in-flight (concurrent) requests per container instance of the Revision. If not specified or 0, defaults to 80 when requested CPU >= 1 and defaults to 1 when requested CPU < 1. |
| `containers` | array<Container> | Required. Containers holds the list which define the units of execution for this Revision. |
| `enableServiceLinks` | boolean | Not supported by Cloud Run. |
| `imagePullSecrets` | array<LocalObjectReference> | Not supported by Cloud Run. |
| `nodeSelector` | object | Optional. The Node Selector configuration. Map of selector key to a value which matches a node. |
| `runtimeClassName` | string | Optional. Runtime. Leave unset for default. |
| `sandboxes` | SandboxConfiguration | Optional. Sandbox configuration that can be launched through the `sandbox` CLI. |
| `serviceAccountName` | string | Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. If not provided, the revision will use the project's default service account. |
| `timeoutSeconds` | integer (int32) | Optional. TimeoutSeconds holds the max duration the instance is allowed for responding to a request. Cloud Run: defaults to 300 seconds (5 minutes). Maximum allowed value is 3600 seconds (1 hour). |
| `volumes` | array<Volume> | — |

### `RevisionStatus`

- RevisionStatus communicates the observed state of the Revision (from the controller).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<GoogleCloudRunV1Condition> | Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. As a Revision is being prepared, it will incrementally update conditions. Revision-specific conditions include: \* `ResourcesAvailable`: `True` when underlying resources have been provisioned. \* `ContainerHealthy`: `True` when the Revision readiness check completes. \* `Active`: `True` when the Revision may receive traffic. |
| `containerStatuses` | array<ContainerStatus> | Output only. Status information for each of the specified containers. The status includes the resolved digest for specified images. |
| `desiredReplicas` | integer (int32) | Output only. The configured number of instances running this revision. For Cloud Run, this only includes instances provisioned using the minScale annotation. It does not include instances created by autoscaling. |
| `imageDigest` | string | ImageDigest holds the resolved digest for the image specified within .Spec.Container.Image. The digest is resolved during the creation of Revision. This field holds the digest value regardless of whether a tag or digest was originally specified in the Container object. |
| `logUrl` | string | Optional. Specifies the generated logging url for this particular revision based on the revision url template specified in the controller's config. |
| `observedGeneration` | integer (int32) | ObservedGeneration is the 'Generation' of the Revision that was last processed by the controller. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation, and the Ready condition's status is True or False. |
| `serviceName` | string | Not currently used by Cloud Run. |

### `RevisionTemplate`

- RevisionTemplateSpec describes the data a revision should have when created from a template.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadata` | ObjectMeta | Optional metadata for this Revision, including labels and annotations. Name will be generated by the Configuration. The following annotation keys set properties of the created revision: \* `autoscaling.knative.dev/minScale` sets the minimum number of instances. \* `autoscaling.knative.dev/maxScale` sets the maximum number of instances. \* `run.googleapis.com/cloudsql-instances` sets Cloud SQL connections. Multiple values should be comma separated. \* `run.googleapis.com/health-check-disabled`: if true, deploy-time startup probes will not run for this revision. \* `run.googleapis.com/vpc-access-connector` sets a Serverless VPC Access connector. \* `run.googleapis.com/vpc-access-egress` sets VPC egress. Supported values are `all-traffic`, `all` (deprecated), and `private-ranges-only`. `all-traffic` and `all` provide the same functionality. `all` is deprecated but will continue to be supported. Prefer `all-traffic`. |
| `spec` | RevisionSpec | RevisionSpec holds the desired state of the Revision (from the client). |

### `Route`

- Route is responsible for configuring ingress over a collection of Revisions. Some of the Revisions a Route distributes traffic over may be specified by referencing the Configuration responsible for creating them; in these cases the Route is additionally responsible for monitoring the Configuration for "latest ready" revision changes, and smoothly rolling out latest revisions. Cloud Run currently supports referencing a single Configuration to automatically deploy the "latest ready" Revision from that Configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "serving.knative.dev/v1". |
| `kind` | string | The kind of this resource, in this case always "Route". |
| `metadata` | ObjectMeta | Metadata associated with this Route, including name, namespace, labels, and annotations. |
| `spec` | RouteSpec | Spec holds the desired state of the Route (from the client). |
| `status` | RouteStatus | Status communicates the observed state of the Route (from the controller). |

### `RouteSpec`

- RouteSpec holds the desired state of the Route (from the client).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `traffic` | array<TrafficTarget> | Traffic specifies how to distribute traffic over a collection of Knative Revisions and Configurations. Cloud Run currently supports a single configurationName. |

### `RouteStatus`

- RouteStatus communicates the observed state of the Route (from the controller).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | Addressable | Similar to url, information on where the service is available on HTTP. |
| `conditions` | array<GoogleCloudRunV1Condition> | Conditions communicates information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. |
| `observedGeneration` | integer (int32) | ObservedGeneration is the 'Generation' of the Route that was last processed by the controller. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. Note that providing a TrafficTarget that has latest_revision=True will result in a Route that does not increment either its metadata.generation or its observedGeneration, as new "latest ready" revisions from the Configuration are processed without an update to the Route's spec. |
| `traffic` | array<TrafficTarget> | Traffic holds the configured traffic distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that was last observed. |
| `url` | string | URL holds the url that will distribute traffic over the provided traffic targets. It generally has the form: `https://{route-hash}-{project-hash}-{cluster-level-suffix}.a.run.app` |

### `RunJobRequest`

- Request message for creating a new execution of a job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overrides` | Overrides | Optional. Overrides existing job configuration for one specific new job execution only, using the specified values to update the job configuration for the new execution. |

### `SandboxConfiguration`

- Configuration for sandboxes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `templates` | array<SandboxTemplate> | Required. Sandbox templates that can be launched through the `sandbox` CLI. |

### `SandboxTemplate`

- Template for a single sandbox.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Optional. Arguments to the entrypoint. The docker image's CMD is used if this is not provided. |
| `command` | array<string> | Optional. Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. |
| `env` | array<EnvVar> | Optional. List of environment variables to set in the sandbox. |
| `image` | string | Required. Name of the container image in Dockerhub or Artifact Registry. If the host is not provided, Dockerhub is assumed. |
| `name` | string | Required. Name of the sandbox specified as a DNS_LABEL (RFC 1123). |
| `volumeMounts` | array<VolumeMount> | Optional. Volume to mount into the container's filesystem. |
| `workingDir` | string | Optional. Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. |

### `SecretEnvSource`

- Not supported by Cloud Run. SecretEnvSource selects a Secret to populate the environment variables with. The contents of the target Secret's Data field will represent the key-value pairs as environment variables.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `localObjectReference` | LocalObjectReference | This field should not be used directly as it is meant to be inlined directly into the message. Use the "name" field instead. |
| `name` | string | The Secret to select from. |
| `optional` | boolean | Specify whether the Secret must be defined |

### `SecretKeySelector`

- SecretKeySelector selects a key of a Secret.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. A Cloud Secret Manager secret version. Must be 'latest' for the latest version, an integer for a specific version, or a version alias. The key of the secret to select from. Must be a valid secret key. |
| `localObjectReference` | LocalObjectReference | This field should not be used directly as it is meant to be inlined directly into the message. Use the "name" field instead. |
| `name` | string | The name of the secret in Cloud Secret Manager. By default, the secret is assumed to be in the same project. If the secret is in another project, you must define an alias. An alias definition has the form: :projects//secrets/. If multiple alias definitions are needed, they must be separated by commas. The alias definitions must be set on the run.googleapis.com/secrets annotation. The name of the secret in the pod's namespace to select from. |
| `optional` | boolean | Specify whether the Secret or its key must be defined. |

### `SecretVolumeSource`

- A volume representing a secret stored in Google Secret Manager. The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret_name. The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultMode` | integer (int32) | Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0444. Directories within the path are not affected by this setting. Notes \* Internally, a umask of 0222 will be applied to any non-zero value. \* This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). \* This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. |
| `items` | array<KeyToPath> | A list of secret versions to mount in the volume. If no items are specified, the volume will expose a file with the same name as the secret name. The contents of the file will be the data in the latest version of the secret. If items are specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify both a key and a path. |
| `optional` | boolean | Not supported by Cloud Run. |
| `secretName` | string | The name of the secret in Cloud Secret Manager. By default, the secret is assumed to be in the same project. If the secret is in another project, you must define an alias. An alias definition has the form: :projects//secrets/. If multiple alias definitions are needed, they must be separated by commas. The alias definitions must be set on the run.googleapis.com/secrets annotation. Name of the secret in the container's namespace to use. |

### `SecurityContext`

- Not supported by Cloud Run. SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext. When both are set, the values in SecurityContext take precedence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `runAsUser` | integer (int32) | The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. |

### `Service`

- Service acts as a top-level container that manages a set of Routes and Configurations which implement a network service. Service exists to provide a singular abstraction which can be access controlled, reasoned about, and which encapsulates software lifecycle decisions such as rollout policy and team resource ownership. Service acts only as an orchestrator of the underlying Routes and Configurations (much as a kubernetes Deployment orchestrates ReplicaSets). The Service's controller will track the statuses of its owned Configuration and Route, reflecting their statuses and conditions as its own.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call. It must be "serving.knative.dev/v1". |
| `kind` | string | The kind of resource. It must be "Service". |
| `metadata` | ObjectMeta | Metadata associated with this Service, including name, namespace, labels, and annotations. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. The following Cloud Run-specific annotations are accepted in Service.metadata.annotations. \* `run.googleapis.com/base-images` \* `run.googleapis.com/binary-authorization-breakglass` \* `run.googleapis.com/binary-authorization` \* `run.googleapis.com/client-name` \* `run.googleapis.com/custom-audiences` \* `run.googleapis.com/default-url-disabled` \* `run.googleapis.com/description` \* `run.googleapis.com/gc-traffic-tags` \* `run.googleapis.com/ingress` \* `run.googleapis.com/ingress` sets the ingress settings for the Service. See the ingress settings documentation for details on configuring ingress settings. \* `run.googleapis.com/ingress-status` is output-only and contains the currently active ingress settings for the Service. `run.googleapis.com/ingress-status` may differ from `run.googleapis.com/ingress` while the system is processing a change to `run.googleapis.com/ingress` or if the system failed to process a change to `run.googleapis.com/ingress`. When the system has processed all changes successfully `run.googleapis.com/ingress-status` and `run.googleapis.com/ingress` are equal. |
| `spec` | ServiceSpec | Holds the desired state of the Service (from the client). |
| `status` | ServiceStatus | Communicates the system-controlled state of the Service. |

### `ServiceSpec`

- ServiceSpec holds the desired state of the Route (from the client), which is used to manipulate the underlying Route and Configuration(s).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `template` | RevisionTemplate | Holds the latest specification for the Revision to be stamped out. |
| `traffic` | array<TrafficTarget> | Specifies how to distribute traffic over a collection of Knative Revisions and Configurations to the Service's main URL. |

### `ServiceStatus`

- The current state of the Service. Output only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | Addressable | Similar to url, information on where the service is available on HTTP. |
| `conditions` | array<GoogleCloudRunV1Condition> | Conditions communicate information about ongoing/complete reconciliation processes that bring the `spec` inline with the observed state of the world. Service-specific conditions include: \* `ConfigurationsReady`: `True` when the underlying Configuration is ready. \* `RoutesReady`: `True` when the underlying Route is ready. \* `Ready`: `True` when all underlying resources are ready. |
| `latestCreatedRevisionName` | string | Name of the last revision that was created from this Service's Configuration. It might not be ready yet, for that use LatestReadyRevisionName. |
| `latestReadyRevisionName` | string | Name of the latest Revision from this Service's Configuration that has had its `Ready` condition become `True`. |
| `observedGeneration` | integer (int32) | Returns the generation last seen by the system. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. |
| `traffic` | array<TrafficTarget> | Holds the configured traffic distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that we last observed. |
| `url` | string | URL that will distribute traffic over the provided traffic targets. It generally has the form `https://{route-hash}-{project-hash}-{cluster-level-suffix}.a.run.app` |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `StartInstanceRequest`

- Request message for starting a stopped Instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dryRun` | string | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `Status`

- Status is a return value for calls that don't return other objects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | Suggested HTTP return code for this status, 0 if not set. |
| `details` | StatusDetails | Extended data associated with the reason. Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type. |
| `message` | string | A human-readable description of the status of this operation. |
| `metadata` | ListMeta | Standard list metadata. |
| `reason` | string | A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it. |
| `status` | string | Status of the operation. One of: "Success" or "Failure". |

### `StatusCause`

- StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | string | The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed. Fields may appear more than once in an array of causes due to fields having multiple errors. Examples: "name" - the field "name" on the current resource "items\[0\].name" - the field "name" on the first array entry in "items" |
| `message` | string | A human-readable description of the cause of the error. This field may be presented as-is to a reader. |
| `reason` | string | A machine-readable description of the cause of the error. If this value is empty there is no information available. |

### `StatusDetails`

- StatusDetails is a set of additional properties that MAY be set by the server to provide additional information about a response. The Reason field of a Status object defines what attributes will be set. Clients must ignore fields that do not match the defined type of each attribute, and should assume that any attribute may be empty, invalid, or under defined.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `causes` | array<StatusCause> | The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes. |
| `group` | string | The group attribute of the resource associated with the status StatusReason. |
| `kind` | string | The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. |
| `name` | string | The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described). |
| `retryAfterSeconds` | integer (int32) | If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action. |
| `uid` | string | UID of the resource. (when there is a single resource which can be described). |

### `StopInstanceRequest`

- Request message for stopping a running Instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dryRun` | string | Optional. Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all` |

### `TCPSocketAction`

- TCPSocketAction describes an action based on opening a socket
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Not supported by Cloud Run. |
| `port` | integer (int32) | Port number to access on the container. Number must be in the range 1 to 65535. |

### `Task`

- Task represents a single run of a container to completion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. |
| `kind` | string | Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. |
| `metadata` | ObjectMeta | Optional. Standard object's metadata. |
| `spec` | TaskSpec | Optional. Specification of the desired behavior of a task. |
| `status` | TaskStatus | Output only. Current status of a task. |

### `TaskAttemptResult`

- Result of a task attempt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exitCode` | integer (int32) | Optional. The exit code of this attempt. This may be unset if the container was unable to exit cleanly with a code due to some other failure. See status field for possible failure details. At most one of exit_code or term_signal will be set. |
| `status` | GoogleRpcStatus | Optional. The status of this attempt. If the status code is OK, then the attempt succeeded. |
| `termSignal` | integer (int32) | Optional. Termination signal of the container. This is set to non-zero if the container is terminated by the system. At most one of exit_code or term_signal will be set. |

### `TaskSpec`

- TaskSpec is a description of a task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containers` | array<Container> | Optional. List of containers belonging to the task. We disallow a number of fields on this Container. |
| `maxRetries` | integer (int32) | Optional. Number of retries allowed per task, before marking this job failed. Defaults to 3. |
| `nodeSelector` | object | Optional. The Node Selector configuration. Map of selector key to a value which matches a node. |
| `sandboxes` | SandboxConfiguration | Optional. Sandbox configuration that can be launched through the `sandbox` CLI. |
| `serviceAccountName` | string | Optional. Email address of the IAM service account associated with the task of a job execution. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account. |
| `timeoutSeconds` | string (int64) | Optional. Duration in seconds the task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds. |
| `volumes` | array<Volume> | Optional. List of volumes that can be mounted by containers belonging to the task. |

### `TaskStatus`

- TaskStatus represents the status of a task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completionTime` | string (google-datetime) | Optional. Represents time when the task was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. |
| `conditions` | array<GoogleCloudRunV1Condition> | Optional. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Task-specific conditions include: \* `Started`: `True` when the task has started to execute. \* `Completed`: `True` when the task has succeeded. `False` when the task has failed. |
| `index` | integer (int32) | Required. Index of the task, unique per execution, and beginning at 0. |
| `lastAttemptResult` | TaskAttemptResult | Optional. Result of the last attempt of this task. |
| `logUri` | string | Optional. URI where logs for this task can be found in Cloud Console. |
| `observedGeneration` | integer (int32) | Optional. The 'generation' of the task that was last processed by the controller. |
| `retried` | integer (int32) | Optional. The number of times this task was retried. Instances are retried when they fail up to the maxRetries limit. |
| `startTime` | string (google-datetime) | Optional. Represents time when the task started to run. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. |

### `TaskTemplateSpec`

- TaskTemplateSpec describes the data a task should have when created from a template.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `spec` | TaskSpec | Optional. Specification of the desired behavior of the task. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### Shape of `GoogleCloudRunV2WorkerPool`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "annotations": "object",
  "binaryAuthorization": "GoogleCloudRunV2BinaryAuthorization",
  "client": "string",
  "clientVersion": "string",
  "conditions": "array<GoogleCloudRunV2Condition>",
  "createTime": "string (google-datetime)",
  "creator": "string",
  "customAudiences": "array<string>",
  "deleteTime": "string (google-datetime)",
  "description": "string",
  "etag": "string",
  "expireTime": "string (google-datetime)",
  "generation": "string (int64)",
  "instanceSplitStatuses": "array<GoogleCloudRunV2InstanceSplitStatus>",
  "instanceSplits": "array<GoogleCloudRunV2InstanceSplit>",
  "labels": "object",
  "lastModifier": "string",
  "latestCreatedRevision": "string",
  "latestReadyRevision": "string",
  "launchStage": "string enum",
  "name": "string",
  "observedGeneration": "string (int64)",
  "reconciling": "boolean",
  "satisfiesPzs": "boolean",
  "scaling": "GoogleCloudRunV2WorkerPoolScaling",
  "template": "GoogleCloudRunV2WorkerPoolRevisionTemplate",
  "terminalCondition": "GoogleCloudRunV2Condition",
  "threatDetectionEnabled": "boolean",
  "uid": "string",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `run` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://run.googleapis.com/$discovery/rest?version=v2, https://run.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
