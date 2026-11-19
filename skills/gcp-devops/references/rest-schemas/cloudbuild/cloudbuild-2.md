---
source: https://cloudbuild.googleapis.com/$discovery/rest?version=v2
---

# Cloud Build API message schemas (cloudbuild) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudbuild/`.

### `SecretManagerSecret`

- Pairs a secret environment variable with a SecretVersion in Secret Manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `env` | string | Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. |
| `versionName` | string | Resource name of the SecretVersion. In format: projects/\*/secrets/\*/versions/\* |

### `SecretVolumeSource`

- Secret Volume Source.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `secretName` | string | Name of the secret referenced by the WorkspaceBinding. |
| `secretVersion` | string | Optional. Resource name of the SecretVersion. In format: projects/\*/secrets/\*/versions/\* |

### `Secrets`

- Secrets and secret environment variables.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inline` | array<InlineSecret> | Secrets encrypted with KMS key and the associated secret environment variable. |
| `secretManager` | array<SecretManagerSecret> | Secrets in Secret Manager and associated secret environment variable. |

### `Security`

- Security configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `privilegeMode` | string enum | Optional. Privilege mode. Values: `PRIVILEGE_MODE_UNSPECIFIED`, `PRIVILEGED`, `UNPRIVILEGED`. |
| `serviceAccount` | string | IAM service account whose credentials will be used at runtime. |

### `SecurityContext`

- Security options the container should be run with.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowPrivilegeEscalation` | boolean | Optional. AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN Note that this field cannot be set when spec.os.name is windows. +optional |
| `privileged` | boolean | Run container in privileged mode. |
| `runAsGroup` | string (int64) | Optional. The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows. +optional |
| `runAsNonRoot` | boolean | Optional. Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. +optional |
| `runAsUser` | string (int64) | Optional. The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows. +optional |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Sidecar`

- Sidecars run alongside the Task's step containers.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Arguments to the entrypoint. |
| `command` | array<string> | Entrypoint array. |
| `env` | array<EnvVar> | List of environment variables to set in the container. |
| `image` | string | Docker image name. |
| `name` | string | Name of the Sidecar. |
| `readinessProbe` | Probe | Optional. Periodic probe of Sidecar service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes +optional |
| `script` | string | The contents of an executable file to execute. |
| `securityContext` | SecurityContext | Optional. Security options the container should be run with. |
| `volumeMounts` | array<VolumeMount> | Pod volumes to mount into the container's filesystem. |
| `workingDir` | string | Container's working directory. |

### `SkippedTask`

- SkippedTask is used to describe the Tasks that were skipped due to their When Expressions evaluating to False.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name is the Pipeline Task name |
| `reason` | string | Output only. Reason is the cause of the PipelineTask being skipped. |
| `whenExpressions` | array<WhenExpression> | WhenExpressions is the list of checks guarding the execution of the PipelineTask |

### `Source`

- Location of the source in a supported storage service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectedRepository` | ConnectedRepository | Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. |
| `developerConnectConfig` | DeveloperConnectConfig | If provided, get the source from this Developer Connect config. |
| `gitSource` | GitSource | If provided, get the source from this Git repository. |
| `repoSource` | RepoSource | If provided, get the source from this location in a Cloud Source Repository. |
| `storageSource` | StorageSource | If provided, get the source from this location in Cloud Storage. |
| `storageSourceManifest` | StorageSourceManifest | If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description here (https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). |

### `SourceProvenance`

- Provenance of the source. Ways to find the original source, or verify that some source was used for this build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileHashes` | object | Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. |
| `resolvedConnectedRepository` | ConnectedRepository | Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. |
| `resolvedGitSource` | GitSource | Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. |
| `resolvedRepoSource` | RepoSource | A copy of the build's `source.repo_source`, if exists, with any revisions resolved. |
| `resolvedStorageSource` | StorageSource | A copy of the build's `source.storage_source`, if exists, with any generations resolved. |
| `resolvedStorageSourceManifest` | StorageSourceManifest | A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Step`

- Step embeds the Container type, which allows it to include fields not provided by Container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Arguments to the entrypoint. |
| `command` | array<string> | Entrypoint array. |
| `env` | array<EnvVar> | List of environment variables to set in the container. |
| `image` | string | Docker image name. |
| `name` | string | Name of the container specified as a DNS_LABEL. |
| `onError` | string enum | Optional. OnError defines the exiting behavior on error can be set to \[ continue \| stopAndFail \] Values: `ON_ERROR_TYPE_UNSPECIFIED`, `STOP_AND_FAIL`, `CONTINUE`. |
| `params` | array<Param> | Optional. Optional parameters passed to the StepAction. |
| `ref` | StepRef | Optional. Optional reference to a remote StepAction. |
| `script` | string | The contents of an executable file to execute. |
| `securityContext` | SecurityContext | Optional. SecurityContext defines the security options the Step should be run with. If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext. More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/ +optional |
| `timeout` | string (google-duration) | Time after which the Step times out. Defaults to never. |
| `volumeMounts` | array<VolumeMount> | Pod volumes to mount into the container's filesystem. |
| `workingDir` | string | Container's working directory. |

### `StepRef`

- A reference to a remote Step, i.e. a StepAction.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the step. |
| `params` | array<Param> | Optional. Parameters used to control the resolution. |
| `resolver` | string enum | Optional. Type of the resolver. Values: `RESOLVER_NAME_UNSPECIFIED`, `BUNDLES`, `GCB_REPO`, `GIT`, `DEVELOPER_CONNECT`, `DEFAULT`. |

### `StepResult`

- StepResult is the declaration of a result for a build step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attestationContent` | string | Optional. The content of the attestation to be generated. |
| `attestationType` | string | Optional. The type of attestation to be generated. |
| `name` | string | Required. The name of the result. |

### `StepTemplate`

- StepTemplate can be used as the basis for all step containers within the Task, so that the steps inherit settings on the base container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `env` | array<EnvVar> | Optional. List of environment variables to set in the Step. Cannot be updated. |
| `volumeMounts` | array<VolumeMount> | Optional. Pod volumes to mount into the container's filesystem. |

### `StorageSource`

- Location of the source in an archive file in Cloud Storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Cloud Storage bucket containing the source (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. |
| `sourceFetcher` | string enum | Optional. Option to specify the tool to fetch the source file for the build. Values: `SOURCE_FETCHER_UNSPECIFIED`, `GSUTIL`, `GCS_FETCHER`. |

### `StorageSourceManifest`

- Location of the source manifest in Cloud Storage. This feature is in Preview; see description here (https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Cloud Storage bucket containing the source manifest (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Required. Cloud Storage object containing the source manifest. This object must be a JSON file. |

### `TaskRef`

- TaskRef can be used to refer to a specific instance of a task. PipelineRef can be used to refer to a specific instance of a Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the task. |
| `params` | array<Param> | Params contains the parameters used to identify the referenced Tekton resource. Example entries might include "repo" or "path" but the set of params ultimately depends on the chosen resolver. |
| `resolver` | string enum | Resolver is the name of the resolver that should perform resolution of the referenced Tekton resource. Values: `RESOLVER_NAME_UNSPECIFIED`, `BUNDLES`, `GCB_REPO`, `GIT`, `DEVELOPER_CONNECT`, `DEFAULT`. |

### `TaskResult`

- TaskResult is used to describe the results of a task.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the result. |
| `name` | string | Name of the result. |
| `properties` | object | When type is OBJECT, this map holds the names of fields inside that object along with the type of data each field holds. |
| `type` | string enum | The type of data that the result holds. Values: `TYPE_UNSPECIFIED`, `STRING`, `ARRAY`, `OBJECT`. |
| `value` | ParamValue | Optional. Optionally used to initialize a Task's result with a Step's result. |

### `TaskSpec`

- TaskSpec contains the Spec to instantiate a TaskRun.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the task. |
| `managedSidecars` | array<string> | Sidecars that run alongside the Task’s step containers that should be added to this Task. Values: `MANAGED_SIDECAR_UNSPECIFIED`, `PRIVILEGED_DOCKER_DAEMON`. |
| `params` | array<ParamSpec> | List of parameters. |
| `results` | array<TaskResult> | Values that this Task can output. |
| `sidecars` | array<Sidecar> | Sidecars that run alongside the Task's step containers. |
| `stepTemplate` | StepTemplate | Optional. StepTemplate can be used as the basis for all step containers within the Task, so that the steps inherit settings on the base container. |
| `steps` | array<Step> | Steps of the task. |
| `volumes` | array<VolumeSource> | A collection of volumes that are available to mount into steps. |
| `workspaces` | array<WorkspaceDeclaration> | The volumes that this Task requires. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TimeSpan`

- Start and end times for a build execution phase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | End of time span. |
| `startTime` | string (google-datetime) | Start of time span. |

### `TimeoutFields`

- TimeoutFields allows granular specification of pipeline, task, and finally timeouts
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finally` | string (google-duration) | Finally sets the maximum allowed duration of this pipeline's finally |
| `pipeline` | string (google-duration) | Pipeline sets the maximum allowed duration for execution of the entire pipeline. The sum of individual timeouts for tasks and finally must not exceed this value. |
| `tasks` | string (google-duration) | Tasks sets the maximum allowed duration of this pipeline's tasks |

### `UpdateBitbucketServerConfigOperationMetadata`

- Metadata for `UpdateBitbucketServerConfig` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitbucketServerConfig` | string | The resource name of the BitbucketServerConfig to be updated. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`. |
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |

### `UpdateGitHubEnterpriseConfigOperationMetadata`

- Metadata for `UpdateGitHubEnterpriseConfig` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |
| `githubEnterpriseConfig` | string | The resource name of the GitHubEnterprise to be updated. Format: `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`. |

### `UpdateWorkerPoolOperationMetadata`

- Metadata for the `UpdateWorkerPool` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Time the operation was completed. |
| `createTime` | string (google-datetime) | Time the operation was created. |
| `workerPool` | string | The resource name of the `WorkerPool` being updated. Format: `projects/{project}/locations/{location}/workerPools/{worker_pool}`. |

### `UploadedGenericArtifact`

- A generic artifact uploaded to Artifact Registry using the GenericArtifact directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactFingerprint` | FileHashes | Output only. The hash of the whole artifact. |
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | object | Output only. The file hashes that make up the generic artifact. |
| `pushTiming` | TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | Output only. URI of the uploaded artifact. Ex: projects/p1/locations/us/repositories/r1/packages/p1/versions/v1 |

### `UploadedGoModule`

- A Go module artifact uploaded to Artifact Registry using the GoModule directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | FileHashes | Hash types and values of the Go Module Artifact. |
| `pushTiming` | TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `UploadedMavenArtifact`

- A Maven artifact uploaded using the MavenArtifact directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | FileHashes | Hash types and values of the Maven Artifact. |
| `pushTiming` | TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `UploadedNpmPackage`

- An npm package uploaded to Artifact Registry using the NpmPackage directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | FileHashes | Hash types and values of the npm package. |
| `pushTiming` | TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded npm package. |

### `UploadedPythonPackage`

- Artifact uploaded using the PythonPackage directive.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactRegistryPackage` | string | Output only. Path to the artifact in Artifact Registry. |
| `fileHashes` | FileHashes | Hash types and values of the Python Artifact. |
| `pushTiming` | TimeSpan | Output only. Stores timing information for pushing the specified artifact. |
| `uri` | string | URI of the uploaded artifact. |

### `UserCredential`

- Represents a personal access token that authorized the Connection, and associated metadata.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `userTokenSecretVersion` | string | Required. A SecretManager resource containing the user token that authorizes the Cloud Build connection. Format: `projects/*/secrets/*/versions/*`. |
| `username` | string | Output only. The username associated to this token. |

### `Volume`

- Volume describes a Docker container volume which is mounted into build steps in order to persist files across build step execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. |
| `path` | string | Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. |

### `VolumeMount`

- Pod volumes to mount into the container's filesystem.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mountPath` | string | Path within the container at which the volume should be mounted. Must not contain ':'. |
| `name` | string | Name of the volume. |
| `readOnly` | boolean | Mounted read-only if true, read-write otherwise (false or unspecified). |
| `subPath` | string | Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root). |
| `subPathExpr` | string | Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to "" (volume's root). |

### `VolumeSource`

- Volumes available to mount.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `emptyDir` | EmptyDirVolumeSource | A temporary directory that shares a pod's lifetime. |
| `name` | string | Name of the Volume. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names |

### `Warning`

- A non-fatal problem encountered during the execution of the build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `priority` | string enum | The priority for this warning. Values: `PRIORITY_UNSPECIFIED`, `INFO`, `WARNING`, `ALERT`. |
| `text` | string | Explanation of the warning generated. |

### `WebhookConfig`

- WebhookConfig describes the configuration of a trigger that creates a build whenever a webhook is sent to a trigger's webhook URL.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `secret` | string | Required. Resource name for the secret required as a URL parameter. |
| `state` | string enum | Potential issues with the underlying Pub/Sub subscription configuration. Only populated on get requests. Values: `STATE_UNSPECIFIED`, `OK`, `SECRET_DELETED`. |

### `WhenExpression`

- Conditions that need to be true for the task to run.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `expressionOperator` | string enum | Operator that represents an Input's relationship to the values Values: `EXPRESSION_OPERATOR_UNSPECIFIED`, `IN`, `NOT_IN`. |
| `input` | string | Input is the string for guard checking which can be a static input or an output from a parent Task. |
| `values` | array<string> | Values is an array of strings, which is compared against the input, for guard checking. |

### `Worker`

- Configuration for the worker.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `machineType` | string | Optional. Machine type of a worker, default is "e2-standard-2". |

### `WorkerConfig`

- Defines the configuration to be used for creating workers in the pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskSizeGb` | string (int64) | Size of the disk attached to the worker, in GB. See Worker pool config file (https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema). Specify a value of up to 4000. If `0` is specified, Cloud Build will use a standard disk size. |
| `enableNestedVirtualization` | boolean | Optional. Enable nested virtualization on the worker, if supported by the machine type. By default, nested virtualization is disabled. |
| `machineType` | string | Optional. Machine type of a worker, such as `e2-medium`. See Worker pool config file (https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema). If left blank, Cloud Build will use a sensible default. |
| `rankedMachineSeries` | array<string> | Optional. Ranked list (earlier items have higher priority) of Machine Series to consider when provisioning Worker VMs. A concrete machine type will be selected based on machine availability in the given region. Values: `MACHINE_SERIES_UNSPECIFIED`, `MACHINE_SERIES_E`, `MACHINE_SERIES_N`, `MACHINE_SERIES_C`. |
| `workerRelease` | string | Optional. Option to specify which release or release channel (rapid\|regular\|stable) to use to run this build. |

### `WorkerPool`

- Configuration for a `WorkerPool`. Cloud Build owns and maintains a pool of workers for general use and have no access to a project's private network. By default, builds submitted to Cloud Build will use a worker from this pool. If your build needs access to resources on a private network, create and use a `WorkerPool` to run your builds. Private `WorkerPool`s give your builds access to any single VPC network that you administer, including any on-prem resources connected to that VPC network. For an overview of private pools, see Private pools overview (https://cloud.google.com/build/docs/private-pools/private-pools-overview).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | User specified annotations. See https://google.aip.dev/128#annotations for more details such as format and size limitations. |
| `createTime` | string (google-datetime) | Output only. Time at which the request to create the `WorkerPool` was received. |
| `deleteTime` | string (google-datetime) | Output only. Time at which the request to delete the `WorkerPool` was received. |
| `displayName` | string | A user-specified, human-readable name for the `WorkerPool`. If provided, this value must be 1-63 characters. |
| `etag` | string | Output only. Checksum computed by the server. May be sent on update and delete requests to ensure that the client has an up-to-date value before proceeding. |
| `name` | string | Output only. The resource name of the `WorkerPool`, with format `projects/{project}/locations/{location}/workerPools/{worker_pool}`. The value of `{worker_pool}` is provided by `worker_pool_id` in `CreateWorkerPool` request and the value of `{location}` is determined by the endpoint accessed. |
| `privatePoolV1Config` | PrivatePoolV1Config | Private Pool configuration. |
| `state` | string enum | Output only. `WorkerPool` state. Values: `STATE_UNSPECIFIED`, `CREATING`, `RUNNING`, `DELETING`, `DELETED`, `UPDATING`. |
| `uid` | string | Output only. A unique identifier for the `WorkerPool`. |
| `updateTime` | string (google-datetime) | Output only. Time at which the request to update the `WorkerPool` was received. |

### `WorkspaceBinding`

- WorkspaceBinding maps a workspace to a Volume. PipelineRef can be used to refer to a specific instance of a Pipeline.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the workspace. |
| `secret` | SecretVolumeSource | Secret Volume Source. |
| `subPath` | string | Optional. SubPath is optionally a directory on the volume which should be used for this binding (i.e. the volume will be mounted at this sub directory). +optional |

### `WorkspaceDeclaration`

- WorkspaceDeclaration is a declaration of a volume that a Task requires.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Description is a human readable description of this volume. |
| `mountPath` | string | MountPath overrides the directory that the volume will be made available at. |
| `name` | string | Name is the name by which you can bind the volume at runtime. |
| `optional` | boolean | Optional. Optional marks a Workspace as not being required in TaskRuns. By default this field is false and so declared workspaces are required. |
| `readOnly` | boolean | ReadOnly dictates whether a mounted volume is writable. |

### `WorkspacePipelineTaskBinding`

- WorkspacePipelineTaskBinding maps workspaces from the PipelineSpec to the workspaces declared in the Task.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the workspace as declared by the task. |
| `subPath` | string | Optional. SubPath is optionally a directory on the volume which should be used for this binding (i.e. the volume will be mounted at this sub directory). +optional |
| `workspace` | string | Name of the workspace declared by the pipeline. |

### Shape of `SecretManagerSecret`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "env": "string",
  "versionName": "string"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `cloudbuild` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudbuild.googleapis.com/$discovery/rest?version=v2, https://cloudbuild.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
