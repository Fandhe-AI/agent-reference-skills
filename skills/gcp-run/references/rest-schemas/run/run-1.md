---
source: https://run.googleapis.com/$discovery/rest?version=v2
---

# Cloud Run Admin API message schemas (run) (part 1/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/run/`.

### `Addressable`

- Information for connecting over HTTP(s).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `url` | string | — |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AuthorizedDomain`

- A domain that a user has been authorized to administer. To authorize use of a domain, verify ownership via Search Console (https://search.google.com/search-console/welcome).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Relative name of the domain authorized for use. Example: `example.com`. |
| `name` | string | Deprecated Read only. Full path to the `AuthorizedDomain` resource in the API. Example: `projects/myproject/authorizedDomains/example.com`. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BuildStatus`

- BuildStatus holds the status of a build.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudBuildLogUrl` | string | The log URL for the Cloud Build execution. |
| `message` | string | The message details of the build. |
| `status` | string | The status of the build. |

### `CSIVolumeSource`

- Storage volume source using the Container Storage Interface.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `driver` | string | name of the CSI driver for the requested storage system. Cloud Run supports the following drivers: \* gcsfuse.run.googleapis.com : Mount a Cloud Storage Bucket as a volume. |
| `readOnly` | boolean | If true, mount the volume as read only. Defaults to false. |
| `volumeAttributes` | object | stores driver specific attributes. For Google Cloud Storage volumes, the following attributes are supported: \* bucketName: the name of the Cloud Storage bucket to mount. The Cloud Run Service identity must have access to this bucket. \* mountOptions: comma-separated list of mount options to pass to the gcsfuse. |

### `CancelExecutionRequest`

- Request message for cancelling an execution.
- Version: v1

### `ConfigMapEnvSource`

- Not supported by Cloud Run. ConfigMapEnvSource selects a ConfigMap to populate the environment variables with. The contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `localObjectReference` | LocalObjectReference | This field should not be used directly as it is meant to be inlined directly into the message. Use the "name" field instead. |
| `name` | string | The ConfigMap to select from. |
| `optional` | boolean | Specify whether the ConfigMap must be defined. |

### `ConfigMapKeySelector`

- Not supported by Cloud Run.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. Not supported by Cloud Run. |
| `localObjectReference` | LocalObjectReference | Not supported by Cloud Run. |
| `name` | string | Required. Not supported by Cloud Run. |
| `optional` | boolean | Not supported by Cloud Run. |

### `ConfigMapVolumeSource`

- Not supported by Cloud Run. Adapts a ConfigMap into a volume. The contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultMode` | integer (int32) | (Optional) Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0644. Directories within the path are not affected by this setting. Notes \* Internally, a umask of 0222 will be applied to any non-zero value. \* This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). \* This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. |
| `items` | array<KeyToPath> | (Optional) If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified that is not present in the Secret, the volume setup will error unless it is marked optional. |
| `name` | string | Name of the config. |
| `optional` | boolean | (Optional) Specify whether the Secret or its keys must be defined. |

### `Configuration`

- Configuration represents the "floating HEAD" of a linear history of Revisions, and optionally how the containers those revisions reference are built. Users create new Revisions by updating the Configuration's spec. The "latest created" revision's name is available under status, as is the "latest ready" revision's name.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "serving.knative.dev/v1". |
| `kind` | string | The kind of resource, in this case always "Configuration". |
| `metadata` | ObjectMeta | Metadata associated with this Configuration, including name, namespace, labels, and annotations. |
| `spec` | ConfigurationSpec | Spec holds the desired state of the Configuration (from the client). |
| `status` | ConfigurationStatus | Status communicates the observed state of the Configuration (from the controller). |

### `ConfigurationSpec`

- ConfigurationSpec holds the desired state of the Configuration (from the client).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `template` | RevisionTemplate | Template holds the latest specification for the Revision to be stamped out. |

### `ConfigurationStatus`

- ConfigurationStatus communicates the observed state of the Configuration (from the controller).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<GoogleCloudRunV1Condition> | Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. |
| `latestCreatedRevisionName` | string | LatestCreatedRevisionName is the last revision that was created from this Configuration. It might not be ready yet, so for the latest ready revision, use LatestReadyRevisionName. |
| `latestReadyRevisionName` | string | LatestReadyRevisionName holds the name of the latest Revision stamped out from this Configuration that has had its "Ready" condition become "True". |
| `observedGeneration` | integer (int32) | ObservedGeneration is the 'Generation' of the Configuration that was last processed by the controller. The observed generation is updated even if the controller failed to process the spec and create the Revision. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation, and the Ready condition's status is True or False. |

### `Container`

- A single application container. This specifies both the container to run, the command to run in the container and the arguments to supply to it. Note that additional arguments may be supplied by the system to the container at runtime.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references are not supported in Cloud Run. |
| `command` | array<string> | Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references are not supported in Cloud Run. |
| `env` | array<EnvVar> | List of environment variables to set in the container. EnvVar with duplicate names are generally allowed; if referencing a secret, the name must be unique for the container. For non-secret EnvVar names, the Container will only get the last-declared one. |
| `envFrom` | array<EnvFromSource> | Not supported by Cloud Run. |
| `image` | string | Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed. |
| `imagePullPolicy` | string | Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. |
| `livenessProbe` | Probe | Periodic probe of container liveness. Container will be restarted if the probe fails. |
| `name` | string | Name of the container specified as a DNS_LABEL (RFC 1123). |
| `ports` | array<ContainerPort> | List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on. |
| `readinessProbe` | Probe | Readiness probe to be used for health checks. |
| `resources` | ResourceRequirements | Compute Resources required by this container. |
| `sandboxLauncher` | boolean | Optional. Indicates that this container can act as a sandbox supervisor and launch sandboxes. |
| `securityContext` | SecurityContext | Not supported by Cloud Run. |
| `startupProbe` | Probe | Startup probe of application within the container. All other probes are disabled if a startup probe is provided, until it succeeds. Container will not receive traffic if the probe fails. If not provided, a default startup probe with TCP socket action is used. |
| `terminationMessagePath` | string | Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. |
| `terminationMessagePolicy` | string | Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated. |
| `volumeMounts` | array<VolumeMount> | Volume to mount into the container's filesystem. Only supports SecretVolumeSources. Pod volumes to mount into the container's filesystem. |
| `workingDir` | string | Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. |

### `ContainerOverride`

- Per container override specification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Arguments to the entrypoint. The specified arguments replace and override any existing entrypoint arguments. Must be empty if `clear_args` is set to true. |
| `clearArgs` | boolean | Optional. Set to True to clear all existing arguments. |
| `env` | array<EnvVar> | List of environment variables to set in the container. All specified environment variables are merged with existing environment variables. When the specified environment variables exist, these values override any existing values. |
| `name` | string | The name of the container specified as a DNS_LABEL. |

### `ContainerPort`

- ContainerPort represents a network port in a single container.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `containerPort` | integer (int32) | Port number the container listens on. If present, this must be a valid port number, 0 < x < 65536. If not present, it will default to port 8080. For more information, see https://cloud.google.com/run/docs/container-contract#port |
| `name` | string | If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c". |
| `protocol` | string | Protocol for port. Must be "TCP". Defaults to "TCP". |

### `ContainerStatus`

- ContainerStatus holds the information of container name and image digest value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buildStatus` | BuildStatus | Output only. The build status of the container image. |
| `imageDigest` | string | ImageDigest holds the resolved digest for the image specified and resolved during the creation of Revision. This field holds the digest value regardless of whether a tag or digest was originally specified in the Container object. |
| `name` | string | The name of the container, if specified. |

### `DomainMapping`

- Resource to hold the state and status of a user's domain mapping. NOTE: This resource is currently in Beta.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | The API version for this call such as "domains.cloudrun.com/v1". |
| `kind` | string | The kind of resource, in this case "DomainMapping". |
| `metadata` | ObjectMeta | Metadata associated with this BuildTemplate. |
| `spec` | DomainMappingSpec | The spec for this DomainMapping. |
| `status` | DomainMappingStatus | The current status of the DomainMapping. |

### `DomainMappingSpec`

- The desired state of the Domain Mapping.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateMode` | string enum | The mode of the certificate. Values: `CERTIFICATE_MODE_UNSPECIFIED`, `NONE`, `AUTOMATIC`. |
| `forceOverride` | boolean | If set, the mapping will override any mapping set before this spec was set. It is recommended that the user leaves this empty to receive an error warning about a potential conflict and only set it once the respective UI has given such a warning. |
| `routeName` | string | The name of the Knative Route that this DomainMapping applies to. The route must exist. |

### `DomainMappingStatus`

- The current state of the Domain Mapping.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<GoogleCloudRunV1Condition> | Array of observed DomainMappingConditions, indicating the current state of the DomainMapping. |
| `mappedRouteName` | string | The name of the route that the mapping currently points to. |
| `observedGeneration` | integer (int32) | ObservedGeneration is the 'Generation' of the DomainMapping that was last processed by the controller. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False. |
| `resourceRecords` | array<ResourceRecord> | The resource records required to configure this domain mapping. These records must be added to the domain's DNS configuration in order to serve the application via this domain mapping. |
| `url` | string | Optional. Not supported by Cloud Run. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EmptyDirVolumeSource`

- In memory or disk-backed ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `medium` | string | The medium on which the data is stored. The default is "" which means to use the node's default medium. Must be an empty string (default), `Memory`, or `Disk`. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir |
| `sizeLimit` | string | Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir |

### `EnvFromSource`

- Not supported by Cloud Run. EnvFromSource represents the source of a set of ConfigMaps
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configMapRef` | ConfigMapEnvSource | The ConfigMap to select from |
| `prefix` | string | An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER. |
| `secretRef` | SecretEnvSource | The Secret to select from |

### `EnvVar`

- EnvVar represents an environment variable present in a Container.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Name of the environment variable. |
| `value` | string | Value of the environment variable. Defaults to "". Variable references are not supported in Cloud Run. |
| `valueFrom` | EnvVarSource | Source for the environment variable's value. Only supports secret_key_ref. Cannot be used if value is not empty. |

### `EnvVarSource`

- EnvVarSource represents a source for the value of an EnvVar.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configMapKeyRef` | ConfigMapKeySelector | Not supported by Cloud Run. Not supported in Cloud Run. |
| `secretKeyRef` | SecretKeySelector | Selects a key (version) of a secret in Secret Manager. |

### `ExecAction`

- Not supported by Cloud Run. ExecAction describes a "run in container" action.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `command` | array<string> | Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('\|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy. |

### `Execution`

- Execution represents the configuration of a single execution. An execution is an immutable resource that references a container image which is run to completion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. |
| `kind` | string | Optional. Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. |
| `metadata` | ObjectMeta | Optional. Standard object's metadata. |
| `spec` | ExecutionSpec | Optional. Specification of the desired behavior of an execution. |
| `status` | ExecutionStatus | Output only. Current status of an execution. |

### `ExecutionReference`

- Reference to an Execution. Use /Executions.GetExecution with the given name to get full execution including the latest status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completionStatus` | string enum | Optional. Status for the execution completion. Values: `COMPLETION_STATUS_UNSPECIFIED`, `EXECUTION_SUCCEEDED`, `EXECUTION_FAILED`, `EXECUTION_RUNNING`, `EXECUTION_PENDING`, `EXECUTION_CANCELLED`. |
| `completionTimestamp` | string (google-datetime) | Optional. Completion timestamp of the execution. |
| `creationTimestamp` | string (google-datetime) | Optional. Creation timestamp of the execution. |
| `deletionTimestamp` | string (google-datetime) | Optional. The read-only soft deletion timestamp of the execution. |
| `name` | string | Optional. Name of the execution. |

### `ExecutionSpec`

- ExecutionSpec describes how the execution will look.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delayExecution` | boolean | Optional. If true, the system will start the execution within the next 12 hours depending on available capacity. |
| `parallelism` | integer (int32) | Optional. Specifies the maximum desired number of tasks the execution should run at given time. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed, i.e. when the work left to do is less than max parallelism. |
| `taskCount` | integer (int32) | Optional. Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1. |
| `template` | TaskTemplateSpec | Optional. The template used to create tasks for this execution. |

### `ExecutionStatus`

- ExecutionStatus represents the current state of an Execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelledCount` | integer (int32) | Optional. The number of tasks which reached phase Cancelled. |
| `completionTime` | string (google-datetime) | Optional. Represents the time that the execution was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. +optional |
| `conditions` | array<GoogleCloudRunV1Condition> | Optional. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Execution-specific conditions include: \* `ResourcesAvailable`: `True` when underlying resources have been provisioned. \* `Started`: `True` when the execution has started to execute. \* `Completed`: `True` when the execution has succeeded. `False` when the execution has failed. |
| `failedCount` | integer (int32) | Optional. The number of tasks which reached phase Failed. |
| `logUri` | string | Optional. URI where logs for this execution can be found in Cloud Console. |
| `observedGeneration` | integer (int32) | Optional. The 'generation' of the execution that was last processed by the controller. |
| `retriedCount` | integer (int32) | Optional. The number of tasks which have retried at least once. |
| `runningCount` | integer (int32) | Optional. The number of actively running tasks. |
| `startTime` | string (google-datetime) | Optional. Represents the time that the execution started to run. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. |
| `succeededCount` | integer (int32) | Optional. The number of tasks which reached phase Succeeded. |

### `ExecutionTemplateSpec`

- ExecutionTemplateSpec describes the metadata and spec an Execution should have when created from a job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadata` | ObjectMeta | Optional. Optional metadata for this Execution, including labels and annotations. The following annotation keys set properties of the created execution: \* `run.googleapis.com/cloudsql-instances` sets Cloud SQL connections. Multiple values should be comma separated. \* `run.googleapis.com/vpc-access-connector` sets a Serverless VPC Access connector. \* `run.googleapis.com/vpc-access-egress` sets VPC egress. Supported values are `all-traffic`, `all` (deprecated), and `private-ranges-only`. `all-traffic` and `all` provide the same functionality. `all` is deprecated but will continue to be supported. Prefer `all-traffic`. |
| `spec` | ExecutionSpec | Required. ExecutionSpec holds the desired configuration for executions of this job. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FilestoreVolumeSource`

- Represents a volume backed by a Filestore instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `volume` | string | Required. The resource name of the Filestore volume. Format: `projects/{project}/locations/{location}/volumePools/{volume_pool}/volumes/{volume}` |

### `GRPCAction`

- GRPCAction describes an action involving a GRPC port.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `port` | integer (int32) | Port number of the gRPC service. Number must be in the range 1 to 65535. |
| `service` | string | Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC. |

### `GoogleCloudRunV1Condition`

- Conditions show the status of reconciliation progress on a given resource. Most resource use a top-level condition type "Ready" or "Completed" to show overall status with other conditions to checkpoint each stage of reconciliation. Note that if metadata.Generation does not equal status.ObservedGeneration, the conditions shown may not be relevant for the current spec.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastTransitionTime` | string (google-datetime) | Optional. Last time the condition transitioned from one status to another. |
| `message` | string | Optional. Human readable message indicating details about the current status. |
| `reason` | string | Optional. One-word CamelCase reason for the condition's last transition. These are intended to be stable, unique values which the client may use to trigger error handling logic, whereas messages which may be changed later by the server. |
| `severity` | string | Optional. How to interpret this condition. One of Error, Warning, or Info. Conditions of severity Info do not contribute to resource readiness. |
| `status` | string | Status of the condition, one of True, False, Unknown. |
| `type` | string | type is used to communicate the status of the reconciliation process. Types common to all resources include: \* "Ready" or "Completed": True when the Resource is ready. |

### `GoogleCloudRunV2AmbientNetworking`

- Configuration for Ambient Networking.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ambientScope` | string enum | The ambient networking scope of the instance. Values: `AMBIENT_SCOPE_UNSPECIFIED`, `AMBIENT_SCOPE_REGIONAL`, `AMBIENT_SCOPE_GLOBAL`. |
| `enabled` | boolean | Optional. Whether ambient networking is enabled. |

### `GoogleCloudRunV2BinaryAuthorization`

- Settings for Binary Authorization feature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `breakglassJustification` | string | Optional. If present, indicates to use Breakglass using this justification. If use_default is False, then it must be empty. For more information on breakglass, see https://cloud.google.com/binary-authorization/docs/using-breakglass |
| `policy` | string | Optional. The path to a binary authorization policy. Format: `projects/{project}/platforms/cloudRun/{policy-name}` |
| `useDefault` | boolean | Optional. If True, indicates to use the default project's binary authorization policy. If False, binary authorization will be disabled. |

### `GoogleCloudRunV2BuildConfig`

- Describes the Build step of the function that builds a container from the given source.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseImage` | string | Optional. The base image used to build the function. |
| `enableAutomaticUpdates` | boolean | Optional. Sets whether the function will receive automatic base image updates. |
| `environmentVariables` | object | Optional. User-provided build-time environment variables for the function |
| `functionTarget` | string | Optional. The name of the function (as defined in source code) that will be executed. Defaults to the resource name suffix, if not specified. For backward compatibility, if function with given name is not found, then the system will try to use function named "function". |
| `imageUri` | string | Optional. Artifact Registry URI to store the built image. |
| `name` | string | Output only. The Cloud Build name of the latest successful deployment of the function. |
| `serviceAccount` | string | Optional. Service account to be used for building the container. The format of this field is `projects/{projectId}/serviceAccounts/{serviceAccountEmail}`. |
| `sourceLocation` | string | The Cloud Storage bucket URI where the function source code is located. |
| `workerPool` | string | Optional. Name of the Cloud Build private pool that should be used to build the Cloud Run function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where `{project}` and `{region}` are the project id and region respectively where the worker pool is defined and `{workerPool}` is the short name of the worker pool. |

### `GoogleCloudRunV2BuildConfiguration`

- Build configuration for a container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildpacksBuild` | GoogleCloudRunV2BuildConfigurationBuildpacksBuild | Optional. Builds the source using Buildpacks. |
| `dockerBuild` | GoogleCloudRunV2BuildConfigurationDockerBuild | Optional. Builds the source using Docker. |
| `imageRepositoryUri` | string | Required. Artifact Registry URI to store the built image. |
| `serviceAccount` | string | Optional. The service account to use for the build. Its resource name in the format `projects/{project}/serviceAccounts/{email}`. |
| `tags` | array<string> | Optional. Tags to add to the build. |
| `workerConfiguration` | GoogleCloudRunV2WorkerConfiguration | Optional. Configuration for the worker. |

### `GoogleCloudRunV2BuildConfigurationBuildpacksBuild`

- Buildpacks build configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildBaseImageUri` | string | Optional. Specify base image other than the default. |
| `cacheImageUri` | string | Optional. Cache image URI. |
| `environmentVariables` | object | Optional. Environment variables for the build. |

### `GoogleCloudRunV2BuildConfigurationDockerBuild`

- Docker build configuration.
- Version: v2

### `GoogleCloudRunV2BuildInfo`

- Build information of the image.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionTarget` | string | Output only. Entry point of the function when the image is a Cloud Run function. |
| `sourceLocation` | string | Output only. Source code location of the image. |

### `GoogleCloudRunV2BuildStatus`

- BuildStatus holds the status of a build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudBuildLogUrl` | string | The log URL for the Cloud Build execution. |
| `message` | string | The message details of the build. |
| `status` | string | The status of the build. |

### `GoogleCloudRunV2BuildpacksBuild`

- Build the source using Buildpacks.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseImage` | string | Optional. The base image to use for the build. |
| `cacheImageUri` | string | Optional. cache_image_uri is the GCR/AR URL where the cache image will be stored. cache_image_uri is optional and omitting it will disable caching. This URL must be stable across builds. It is used to derive a build-specific temporary URL by substituting the tag with the build ID. The build will clean up the temporary image on a best-effort basis. |
| `enableAutomaticUpdates` | boolean | Optional. Whether or not the application container will be enrolled in automatic base image updates. When true, the application will be built on a scratch base image, so the base layers can be appended at run time. |
| `environmentVariables` | object | Optional. User-provided build-time environment variables. |
| `functionTarget` | string | Optional. Name of the function target if the source is a function source. Required for function builds. |
| `projectDescriptor` | string | Optional. project_descriptor stores the path to the project descriptor file. When empty, it means that there is no project descriptor file in the source. |
| `runtime` | string | The runtime name, e.g. 'go113'. Leave blank for generic builds. |

### `GoogleCloudRunV2CancelExecutionRequest`

- Request message for deleting an Execution.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `etag` | string | A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates. |
| `validateOnly` | boolean | Indicates that the request should be validated without actually cancelling any resources. |

### `GoogleCloudRunV2CloudBuildWorkerConfiguration`

- Configuration for Cloud Build worker.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `machineType` | string | Optional. The machine type for the Cloud Build worker. |
| `workerPool` | string | Optional. The name of the Cloud Build worker pool. |

### `GoogleCloudRunV2CloudSqlInstance`

- Represents a set of Cloud SQL instances. Each one will be available under /cloudsql/\[instance\]. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `instances` | array<string> | A list of Cloud SQL instance connection names. Cloud Run uses these to establish connections to the specified Cloud SQL instances. While the SQL instance name itself is unique within a project, the full connection name requires the location for proper routing. Format: `{project}:{location}:{instance}` Example: `my-project:us-central1:my-instance` You can find this value on the instance's \*\*Overview\*\* page in the Google Cloud console or by using the following `gcloud` command: gcloud sql instances describe INSTANCE_NAME \ --format='value(connectionName)' Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run. |

### `GoogleCloudRunV2CloudStorageSource`

- Cloud Storage source.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. The Cloud Storage bucket name. |
| `generation` | string (int64) | Optional. The Cloud Storage object generation. |
| `object` | string | Required. The Cloud Storage object name. |

### `GoogleCloudRunV2Condition`

- Defines a status condition for a resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executionReason` | string enum | Output only. A reason for the execution condition. Values: `EXECUTION_REASON_UNDEFINED`, `JOB_STATUS_SERVICE_POLLING_ERROR`, `NON_ZERO_EXIT_CODE`, `CANCELLED`, `CANCELLING`, `DELETED`, `DELAYED_START_PENDING`, `DELAYED_EXECUTION_EXCEEDING_DURATION_LIMIT`. |
| `instanceReason` | string enum | Output only. A reason for the instance condition. Values: `INSTANCE_REASON_UNSPECIFIED`, `INSTANCE_DELETED`, `INSTANCE_STOPPED`, `INSTANCE_STOPPING`, `INSTANCE_NON_ZERO_EXIT_CODE`. |
| `lastTransitionTime` | string (google-datetime) | Last time the condition transitioned from one status to another. |
| `message` | string | Human readable message indicating details about the current status. |
| `reason` | string enum | Output only. A common (service-level) reason for this condition. Values: `COMMON_REASON_UNDEFINED`, `UNKNOWN`, `REVISION_FAILED`, `PROGRESS_DEADLINE_EXCEEDED`, `CONTAINER_MISSING`, `CONTAINER_PERMISSION_DENIED`, `CONTAINER_IMAGE_UNAUTHORIZED`, `CONTAINER_IMAGE_AUTHORIZATION_CHECK_FAILED`, `ENCRYPTION_KEY_PERMISSION_DENIED`, `ENCRYPTION_KEY_CHECK_FAILED`, `SECRETS_ACCESS_CHECK_FAILED`, `WAITING_FOR_OPERATION`, `IMMEDIATE_RETRY`, `POSTPONED_RETRY`, `INTERNAL`, `VPC_NETWORK_NOT_FOUND`. |
| `revisionReason` | string enum | Output only. A reason for the revision condition. Values: `REVISION_REASON_UNDEFINED`, `PENDING`, `RESERVE`, `RETIRED`, `RETIRING`, `RECREATING`, `HEALTH_CHECK_CONTAINER_ERROR`, `CUSTOMIZED_PATH_RESPONSE_PENDING`, `MIN_INSTANCES_NOT_PROVISIONED`, `ACTIVE_REVISION_LIMIT_REACHED`, `NO_DEPLOYMENT`, `HEALTH_CHECK_SKIPPED`, `MIN_INSTANCES_WARMING`. |
| `severity` | string enum | How to interpret failures of this condition, one of Error, Warning, Info Values: `SEVERITY_UNSPECIFIED`, `ERROR`, `WARNING`, `INFO`. |
| `state` | string enum | State of the condition. Values: `STATE_UNSPECIFIED`, `CONDITION_PENDING`, `CONDITION_RECONCILING`, `CONDITION_FAILED`, `CONDITION_SUCCEEDED`. |
| `type` | string | type is used to communicate the status of the reconciliation process. See also: https://github.com/knative/serving/blob/main/docs/spec/errors.md#error-conditions-and-reporting Types common to all resources include: \* "Ready": True when the Resource is ready. |

### `GoogleCloudRunV2Container`

- A single application container. This specifies both the container to run, the command to run in the container and the arguments to supply to it. Note that additional arguments can be supplied by the system to the container at runtime.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Arguments to the entrypoint. The docker image's CMD is used if this is not provided. |
| `baseImageUri` | string | Base image for this container. Only supported for services. If set, it indicates that the service is enrolled into automatic base image update. |
| `buildConfig` | GoogleCloudRunV2BuildConfiguration | Optional. The build configuration for the container image. |
| `buildInfo` | GoogleCloudRunV2BuildInfo | Output only. The build info of the container image. |
| `command` | array<string> | Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. |
| `dependsOn` | array<string> | Names of the containers that must start before this container. |
| `env` | array<GoogleCloudRunV2EnvVar> | List of environment variables to set in the container. |
| `image` | string | Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed. |
| `livenessProbe` | GoogleCloudRunV2Probe | Periodic probe of container liveness. Container will be restarted if the probe fails. |
| `name` | string | Name of the container specified as a DNS_LABEL (RFC 1123). |
| `ports` | array<GoogleCloudRunV2ContainerPort> | List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on. |
| `readinessProbe` | GoogleCloudRunV2Probe | Readiness probe to be used for health checks. |
| `resources` | GoogleCloudRunV2ResourceRequirements | Compute Resource requirements by this container. |
| `sandboxLauncher` | boolean | Optional. Indicates that this container can act as a sandbox supervisor and launch sandboxes. |
| `sourceCode` | GoogleCloudRunV2SourceCode | Optional. Location of the source. This field is only supported in Cloud Run Service. |
| `startupProbe` | GoogleCloudRunV2Probe | Startup probe of application within the container. All other probes are disabled if a startup probe is provided, until it succeeds. Container will not be added to service endpoints if the probe fails. |
| `volumeMounts` | array<GoogleCloudRunV2VolumeMount> | Volume to mount into the container's filesystem. |
| `workingDir` | string | Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. |

### `GoogleCloudRunV2ContainerOverride`

- Per-container override specification.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Optional. Arguments to the entrypoint. Will replace existing args for override. |
| `clearArgs` | boolean | Optional. True if the intention is to clear out existing args list. |
| `env` | array<GoogleCloudRunV2EnvVar> | List of environment variables to set in the container. Will be merged with existing env for override. |
| `name` | string | The name of the container specified as a DNS_LABEL. |

### `GoogleCloudRunV2ContainerPort`

- ContainerPort represents a network port in a single container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `containerPort` | integer (int32) | Port number the container listens on. This must be a valid TCP port number, 0 < container_port < 65536. |
| `name` | string | If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c". |

### `GoogleCloudRunV2ContainerStatus`

- ContainerStatus holds the information of container name and image digest value.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildStatus` | GoogleCloudRunV2BuildStatus | Output only. The build status of the container image. |
| `imageDigest` | string | ImageDigest holds the resolved digest for the image specified and resolved during the creation of Revision. This field holds the digest value regardless of whether a tag or digest was originally specified in the Container object. |
| `name` | string | The name of the container, if specified. |

### `GoogleCloudRunV2DockerBuild`

- Build the source using Docker. This means the source has a Dockerfile.
- Version: v2

### `GoogleCloudRunV2EmptyDirVolumeSource`

- In memory (tmpfs) ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `medium` | string enum | The medium on which the data is stored. Acceptable values today is only MEMORY or none. When none, the default will currently be backed by memory but could change over time. +optional Values: `MEDIUM_UNSPECIFIED`, `MEMORY`, `DISK`. |
| `sizeLimit` | string | Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir |

### `GoogleCloudRunV2EnvVar`

- EnvVar represents an environment variable present in a Container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Name of the environment variable. Must not exceed 32768 characters. |
| `value` | string | Literal value of the environment variable. Defaults to "", and the maximum length is 32768 bytes. Variable references are not supported in Cloud Run. |
| `valueSource` | GoogleCloudRunV2EnvVarSource | Source for the environment variable's value. |

### `GoogleCloudRunV2EnvVarSource`

- EnvVarSource represents a source for the value of an EnvVar.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `secretKeyRef` | GoogleCloudRunV2SecretKeySelector | Selects a secret and a specific version from Cloud Secret Manager. |

### `GoogleCloudRunV2Execution`

- Execution represents the configuration of a single execution. A execution an immutable resource that references a container image which is run to completion.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Output only. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. |
| `cancelledCount` | integer (int32) | Output only. The number of tasks which reached phase Cancelled. |
| `client` | string | Output only. Arbitrary identifier for the API client. |
| `clientVersion` | string | Output only. Arbitrary version identifier for the API client. |
| `completionTime` | string (google-datetime) | Output only. Represents time when the execution was completed. It is not guaranteed to be set in happens-before order across separate operations. |
| `conditions` | array<GoogleCloudRunV2Condition> | Output only. The Condition of this Execution, containing its readiness status, and detailed error information in case it did not reach the desired state. |
| `createTime` | string (google-datetime) | Output only. Represents time when the execution was acknowledged by the execution controller. It is not guaranteed to be set in happens-before order across separate operations. |
| `creator` | string | Output only. Email address of the authenticated creator. |
| `deleteTime` | string (google-datetime) | Output only. For a deleted resource, the deletion time. It is only populated as a response to a Delete request. |
| `etag` | string | Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `expireTime` | string (google-datetime) | Output only. For a deleted resource, the time after which it will be permamently deleted. It is only populated as a response to a Delete request. |
| `failedCount` | integer (int32) | Output only. The number of tasks which reached phase Failed. |
| `generation` | string (int64) | Output only. A number that monotonically increases every time the user modifies the desired state. |
| `job` | string | Output only. The name of the parent Job. |
| `labels` | object | Output only. Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels |
| `launchStage` | string enum | The least stable launch stage needed to create this resource, as defined by Google Cloud Platform Launch Stages (https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. Note that this value might not be what was used as input. For example, if ALPHA was provided as input in the parent resource, but only BETA and GA-level features are used, this field will be BETA. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `logUri` | string | Output only. URI where logs for this execution can be found in Cloud Console. |
| `name` | string | Output only. The unique name of this Execution. |
| `observedGeneration` | string (int64) | Output only. The generation of this Execution. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `parallelism` | integer (int32) | Output only. Specifies the maximum desired number of tasks the execution should run at any given time. Must be <= task_count. The actual number of tasks running in steady state will be less than this number when ((.spec.task_count - .status.successful) < .spec.parallelism), i.e. when the work left to do is less than max parallelism. |
| `reconciling` | boolean | Output only. Indicates whether the resource's reconciliation is still in progress. See comments in `Job.reconciling` for additional information on reconciliation process in Cloud Run. |
| `retriedCount` | integer (int32) | Output only. The number of tasks which have retried at least once. |
| `runningCount` | integer (int32) | Output only. The number of actively running tasks. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `startTime` | string (google-datetime) | Output only. Represents time when the execution started to run. It is not guaranteed to be set in happens-before order across separate operations. |
| `succeededCount` | integer (int32) | Output only. The number of tasks which reached phase Succeeded. |
| `taskCount` | integer (int32) | Output only. Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. |
| `template` | GoogleCloudRunV2TaskTemplate | Output only. The template used to create tasks for this execution. |
| `uid` | string | Output only. Server assigned unique identifier for the Execution. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. |
| `updateTime` | string (google-datetime) | Output only. The last-modified time. |

### `GoogleCloudRunV2ExecutionReference`

- Reference to an Execution. Use /Executions.GetExecution with the given name to get full execution including the latest status.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `completionStatus` | string enum | Status for the execution completion. Values: `COMPLETION_STATUS_UNSPECIFIED`, `EXECUTION_SUCCEEDED`, `EXECUTION_FAILED`, `EXECUTION_RUNNING`, `EXECUTION_PENDING`, `EXECUTION_CANCELLED`. |
| `completionTime` | string (google-datetime) | Creation timestamp of the execution. |
| `createTime` | string (google-datetime) | Creation timestamp of the execution. |
| `deleteTime` | string (google-datetime) | The deletion time of the execution. It is only populated as a response to a Delete request. |
| `name` | string | Name of the execution. |

### `GoogleCloudRunV2ExecutionTemplate`

- ExecutionTemplate describes the data an execution should have when created from a template.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system annotations in v1 now have a corresponding field in v2 ExecutionTemplate. This field follows Kubernetes annotations' namespacing, limits, and rules. |
| `client` | string | Optional. Arbitrary identifier for the API client. |
| `clientVersion` | string | Optional. Arbitrary version identifier for the API client. |
| `delayExecution` | boolean | Optional. If true, the system will start the execution within the next 12 hours depending on available capacity. |
| `labels` | object | Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 ExecutionTemplate. |
| `parallelism` | integer (int32) | Optional. Specifies the maximum desired number of tasks the execution should run at given time. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed remaining, i.e. when the work left to do is less than max parallelism. |
| `taskCount` | integer (int32) | Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1. |
| `template` | GoogleCloudRunV2TaskTemplate | Required. Describes the task(s) that will be created when executing an execution. |

### `GoogleCloudRunV2ExportImageRequest`

- Request message for exporting Cloud Run image.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `destinationRepo` | string | Required. The export destination url (the Artifact Registry repo). |

### `GoogleCloudRunV2ExportImageResponse`

- ExportImageResponse contains an operation Id to track the image export operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `operationId` | string | An operation ID used to track the status of image exports tied to the original pod ID in the request. |

### `GoogleCloudRunV2ExportStatusResponse`

- ExportStatusResponse contains the status of image export operation, with the status of each image export job.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `imageExportStatuses` | array<GoogleCloudRunV2ImageExportStatus> | The status of each image export job. |
| `operationId` | string | The operation id. |
| `operationState` | string enum | Output only. The state of the overall export operation. Values: `OPERATION_STATE_UNSPECIFIED`, `IN_PROGRESS`, `FINISHED`. |

### `GoogleCloudRunV2FilestoreVolumeSource`

- Represents a volume backed by a Filestore instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `volume` | string | Required. The resource name of the Filestore volume. Format: `projects/{project}/locations/{location}/volumePools/{volume_pool}/volumes/{volume}` |

### `GoogleCloudRunV2GCSVolumeSource`

- Represents a volume backed by a Cloud Storage bucket (mounted via Cloud Storage FUSE or as a block device disk).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Cloud Storage Bucket name. |
| `mountOptions` | array<string> | A list of additional flags to pass to the gcsfuse CLI. Options should be specified without the leading "--". |
| `readOnly` | boolean | If true, the volume will be mounted as read only for all mounts. |

### `GoogleCloudRunV2GRPCAction`

- GRPCAction describes an action involving a GRPC port.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `port` | integer (int32) | Optional. Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports\[0\].containerPort. |
| `service` | string | Optional. Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md ). If this is not specified, the default behavior is defined by gRPC. |

### `GoogleCloudRunV2HTTPGetAction`

- HTTPGetAction describes an action based on HTTP Get requests.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `httpHeaders` | array<GoogleCloudRunV2HTTPHeader> | Optional. Custom headers to set in the request. HTTP allows repeated headers. |
| `path` | string | Optional. Path to access on the HTTP server. Defaults to '/'. |
| `port` | integer (int32) | Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports\[0\].containerPort. |

### `GoogleCloudRunV2HTTPHeader`

- HTTPHeader describes a custom header to be used in HTTP probes
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The header field name |
| `value` | string | Optional. The header field value |

### `GoogleCloudRunV2ImageExportStatus`

- The status of an image export job.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exportJobState` | string enum | Output only. Has the image export job finished (regardless of successful or failure). Values: `EXPORT_JOB_STATE_UNSPECIFIED`, `IN_PROGRESS`, `FINISHED`. |
| `exportedImageDigest` | string | The exported image ID as it will appear in Artifact Registry. |
| `status` | UtilStatusProto | The status of the export task if done. |
| `tag` | string | The image tag as it will appear in Artifact Registry. |

### `GoogleCloudRunV2InlinedSource`

- Inlined source.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `sources` | array<GoogleCloudRunV2SourceFile> | Required. Input only. The source code. |

### `GoogleCloudRunV2Instance`

- A Cloud Run Instance represents a single group of containers running in a region.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | — |
| `binaryAuthorization` | GoogleCloudRunV2BinaryAuthorization | Settings for the Binary Authorization feature. |
| `client` | string | Arbitrary identifier for the API client. |
| `clientVersion` | string | Arbitrary version identifier for the API client. |
| `conditions` | array<GoogleCloudRunV2Condition> | Output only. The Conditions of all other associated sub-resources. They contain additional diagnostics information in case the Instance does not reach its Serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `containerStatuses` | array<GoogleCloudRunV2ContainerStatus> | Output only. Status information for each of the specified containers. The status includes the resolved digest for specified images. |
| `containers` | array<GoogleCloudRunV2Container> | Required. Holds the single container that defines the unit of execution for this Instance. |
| `createTime` | string (google-datetime) | Output only. The creation time. |
| `creator` | string | Output only. Email address of the authenticated creator. |
| `defaultUriDisabled` | boolean | Optional. Disables public resolution of the default URI of this Instance. |
| `deleteTime` | string (google-datetime) | Output only. The deletion time. |
| `description` | string | User-provided description of the Instance. This field currently has a 512-character limit. |
| `encryptionKey` | string | A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek |
| `encryptionKeyRevocationAction` | string enum | The action to take if the encryption key is revoked. Values: `ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED`, `PREVENT_NEW`, `SHUTDOWN`. |
| `encryptionKeyShutdownDuration` | string (google-duration) | If `encryption_key_revocation_action` is `SHUTDOWN`, the duration before shutting down all instances. The minimum increment is 1 hour. |
| `etag` | string | Optional. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `expireTime` | string (google-datetime) | Output only. For a deleted resource, the time after which it will be permamently deleted. |
| `generation` | string (int64) | Output only. A number that monotonically increases every time the user modifies the desired state. Please note that unlike v1, this is an `int64` value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. |
| `gpuZonalRedundancyDisabled` | boolean | Optional. True if GPU zonal redundancy is disabled on this instance. |
| `iapEnabled` | boolean | Optional. IAP settings on the Instance. |
| `ingress` | string enum | Optional. Provides the ingress settings for this Instance. On output, returns the currently observed ingress settings, or `INGRESS_TRAFFIC_UNSPECIFIED` if no revision is active. Values: `INGRESS_TRAFFIC_UNSPECIFIED`, `INGRESS_TRAFFIC_ALL`, `INGRESS_TRAFFIC_INTERNAL_ONLY`, `INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER`, `INGRESS_TRAFFIC_NONE`. |
| `invokerIamDisabled` | boolean | Optional. Disables IAM permission check for `run.routes.invoke` for callers of this Instance. For more information, visit https://cloud.google.com/run/docs/securing/managing-access#invoker_check. |
| `labels` | object | — |
| `lastModifier` | string | Output only. Email address of the last authenticated modifier. |
| `launchStage` | string enum | The launch stage as defined by Google Cloud Platform Launch Stages (https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, `GA` is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if `ALPHA` is provided as input, but only `BETA` and `GA`-level features are used, this field will be `BETA` on output. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `logUri` | string | Output only. The Google Console URI to obtain logs for the Instance. |
| `name` | string | The fully qualified name of this Instance. In `CreateInstanceRequest`, this field is ignored, and instead composed from `CreateInstanceRequest.parent` and `CreateInstanceRequest.instance_id`. |
| `nodeSelector` | GoogleCloudRunV2NodeSelector | Optional. The node selector for the instance. |
| `observedGeneration` | string (int64) | Output only. The generation of this Instance currently serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. Please note that unlike v1, this is an `int64` value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. |
| `reconciling` | boolean | Output only. Returns `true` if the Instance is currently being acted upon by the system to bring it into the desired state. When a new Instance is created, or an existing one is updated, Cloud Run will asynchronously perform all necessary steps to bring the Instance to the desired serving state. This process is called reconciliation. While reconciliation is in process, `observed_generation` will have a transient value that might mismatch the intended state. Once reconciliation is over (and this field is `false`), there are two possible outcomes: reconciliation succeeded and the serving state matches the Instance, or there was an error, and reconciliation failed. This state can be found in `terminal_condition.state`. |
| `restartPolicy` | string enum | Optional. Restart policy for the Instance. Values: `RESTART_POLICY_UNSPECIFIED`, `ALWAYS`, `ON_FAILURE`, `NEVER`. |
| `sandboxes` | GoogleCloudRunV2SandboxConfiguration | Optional. Configuration for sandboxes. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `serviceAccount` | string | — |
| `sshEnabled` | boolean | Optional. Enables SSH access to the Instance. |
| `terminalCondition` | GoogleCloudRunV2Condition | Output only. The Condition of this Instance, containing its readiness status, and detailed error information in case it did not reach a serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `uid` | string | Output only. Server assigned unique identifier for the trigger. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. |
| `updateTime` | string (google-datetime) | Output only. The last-modified time. |
| `urls` | array<string> | Output only. All URLs serving traffic for this Instance. |
| `volumes` | array<GoogleCloudRunV2Volume> | A list of Volumes to make available to containers. |
| `vpcAccess` | GoogleCloudRunV2VpcAccess | Optional. VPC Access configuration to use for this Revision. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. |

### `GoogleCloudRunV2InstanceSplit`

- Holds a single instance split entry for the Worker. Allocations can be done to a specific Revision name, or pointing to the latest Ready Revision.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `percent` | integer (int32) | Specifies percent of the instance split to this Revision. This defaults to zero if unspecified. |
| `revision` | string | Revision to which to assign this portion of instances, if split allocation is by revision. |
| `type` | string enum | The allocation type for this instance split. Values: `INSTANCE_SPLIT_ALLOCATION_TYPE_UNSPECIFIED`, `INSTANCE_SPLIT_ALLOCATION_TYPE_LATEST`, `INSTANCE_SPLIT_ALLOCATION_TYPE_REVISION`. |

### `GoogleCloudRunV2InstanceSplitStatus`

- Represents the observed state of a single `InstanceSplit` entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `percent` | integer (int32) | Specifies percent of the instance split to this Revision. |
| `revision` | string | Revision to which this instance split is assigned. |
| `type` | string enum | The allocation type for this instance split. Values: `INSTANCE_SPLIT_ALLOCATION_TYPE_UNSPECIFIED`, `INSTANCE_SPLIT_ALLOCATION_TYPE_LATEST`, `INSTANCE_SPLIT_ALLOCATION_TYPE_REVISION`. |

### `GoogleCloudRunV2Job`

- Job represents the configuration of a single job, which references a container image that is run to completion.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected on new resources. All system annotations in v1 now have a corresponding field in v2 Job. This field follows Kubernetes annotations' namespacing, limits, and rules. |
| `binaryAuthorization` | GoogleCloudRunV2BinaryAuthorization | Settings for the Binary Authorization feature. |
| `client` | string | Arbitrary identifier for the API client. |
| `clientVersion` | string | Arbitrary version identifier for the API client. |
| `conditions` | array<GoogleCloudRunV2Condition> | Output only. The Conditions of all other associated sub-resources. They contain additional diagnostics information in case the Job does not reach its desired state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `createTime` | string (google-datetime) | Output only. The creation time. |
| `creator` | string | Output only. Email address of the authenticated creator. |
| `deleteTime` | string (google-datetime) | Output only. The deletion time. It is only populated as a response to a Delete request. |
| `etag` | string | Optional. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `executionCount` | integer (int32) | Output only. Number of executions created for this job. |
| `expireTime` | string (google-datetime) | Output only. For a deleted resource, the time after which it will be permamently deleted. |
| `functionalType` | string enum | Optional. The functional type of the Job. Values: `FUNCTIONAL_TYPE_UNSPECIFIED`, `FUNCTIONAL_TYPE_AGENT`, `FUNCTIONAL_TYPE_MCP_SERVER`. |
| `generation` | string (int64) | Output only. A number that monotonically increases every time the user modifies the desired state. |
| `labels` | object | Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 Job. |
| `lastModifier` | string | Output only. Email address of the last authenticated modifier. |
| `latestCreatedExecution` | GoogleCloudRunV2ExecutionReference | Output only. Name of the last created execution. |
| `launchStage` | string enum | The launch stage as defined by Google Cloud Platform Launch Stages (https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `name` | string | The fully qualified name of this Job. Format: projects/{project}/locations/{location}/jobs/{job} |
| `observedGeneration` | string (int64) | Output only. The generation of this Job. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `reconciling` | boolean | Output only. Returns true if the Job is currently being acted upon by the system to bring it into the desired state. When a new Job is created, or an existing one is updated, Cloud Run will asynchronously perform all necessary steps to bring the Job to the desired state. This process is called reconciliation. While reconciliation is in process, `observed_generation` and `latest_succeeded_execution`, will have transient values that might mismatch the intended state: Once reconciliation is over (and this field is false), there are two possible outcomes: reconciliation succeeded and the state matches the Job, or there was an error, and reconciliation failed. This state can be found in `terminal_condition.state`. If reconciliation succeeded, the following fields will match: `observed_generation` and `generation`, `latest_succeeded_execution` and `latest_created_execution`. If reconciliation failed, `observed_generation` and `latest_succeeded_execution` will have the state of the last succeeded execution or empty for newly created Job. Additional information on the failure can be found in `terminal_condition` and `conditions`. |
| `runExecutionToken` | string | A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully completed. The sum of job name and token length must be fewer than 63 characters. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `startExecutionToken` | string | A unique string used as a suffix creating a new execution. The Job will become ready when the execution is successfully started. The sum of job name and token length must be fewer than 63 characters. |
| `template` | GoogleCloudRunV2ExecutionTemplate | Required. The template used to create executions for this Job. |
| `terminalCondition` | GoogleCloudRunV2Condition | Output only. The Condition of this Job, containing its readiness status, and detailed error information in case it did not reach the desired state. |
| `uid` | string | Output only. Server assigned unique identifier for the Execution. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. |
| `updateTime` | string (google-datetime) | Output only. The last-modified time. |

### `GoogleCloudRunV2ListExecutionsResponse`

- Response message containing a list of Executions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executions` | array<GoogleCloudRunV2Execution> | The resulting list of Executions. |
| `nextPageToken` | string | A token indicating there are more items than page_size. Use it in the next ListExecutions request to continue. |

### `GoogleCloudRunV2ListInstancesResponse`

- Response message containing a list of Instances.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `instances` | array<GoogleCloudRunV2Instance> | The resulting list of Instances. |
| `nextPageToken` | string | A token indicating there are more items than page_size. Use it in the next ListInstances request to continue. |

### `GoogleCloudRunV2ListJobsResponse`

- Response message containing a list of Jobs.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `jobs` | array<GoogleCloudRunV2Job> | The resulting list of Jobs. |
| `nextPageToken` | string | A token indicating there are more items than page_size. Use it in the next ListJobs request to continue. |

### `GoogleCloudRunV2ListRevisionsResponse`

- Response message containing a list of Revisions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token indicating there are more items than page_size. Use it in the next ListRevisions request to continue. |
| `revisions` | array<GoogleCloudRunV2Revision> | The resulting list of Revisions. |

### `GoogleCloudRunV2ListServicesResponse`

- Response message containing a list of Services.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token indicating there are more items than page_size. Use it in the next ListServices request to continue. |
| `services` | array<GoogleCloudRunV2Service> | The resulting list of Services. |
| `unreachable` | array<string> | Output only. For global requests, returns the list of regions that could not be reached within the deadline. |

### `GoogleCloudRunV2ListTasksResponse`

- Response message containing a list of Tasks.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token indicating there are more items than page_size. Use it in the next ListTasks request to continue. |
| `tasks` | array<GoogleCloudRunV2Task> | The resulting list of Tasks. |

### `GoogleCloudRunV2ListWorkerPoolsResponse`

- Response message containing a list of WorkerPools.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token indicating there are more items than page_size. Use it in the next ListWorkerPools request to continue. |
| `workerPools` | array<GoogleCloudRunV2WorkerPool> | The resulting list of WorkerPools. |

### `GoogleCloudRunV2Metadata`

- Metadata represents the JSON encoded generated customer metadata.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `metadata` | string | JSON encoded Google-generated Customer Metadata for a given resource/project. |

### `GoogleCloudRunV2MultiRegionSettings`

- Settings for multi-region deployment.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `multiRegionId` | string | Optional. System-generated unique id for the multi-region Service. |
| `regions` | array<string> | Required. List of regions to deploy to, including primary region. |

### `GoogleCloudRunV2NFSVolumeSource`

- Represents an NFS mount.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `path` | string | Path that is exported by the NFS server. |
| `readOnly` | boolean | If true, the volume will be mounted as read only for all mounts. |
| `server` | string | Hostname or IP address of the NFS server |

### `GoogleCloudRunV2NetworkInterface`

- Direct VPC egress settings.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `network` | string | Optional. The VPC network that the Cloud Run resource will be able to send traffic to. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If network is not specified, it will be looked up from the subnetwork. |
| `subnetwork` | string | Optional. The VPC subnetwork that the Cloud Run resource will get IPs from. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used. |
| `tags` | array<string> | Optional. Network tags applied to this Cloud Run resource. |

### `GoogleCloudRunV2NodeSelector`

- Hardware constraints configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `accelerator` | string | Required. GPU accelerator type to attach to an instance. |

### `GoogleCloudRunV2Overrides`

- RunJob Overrides that contains Execution fields to be overridden.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `containerOverrides` | array<GoogleCloudRunV2ContainerOverride> | Per container override specification. |
| `delayExecution` | boolean | Optional. If true, the system will start the execution within the next 12 hours depending on available capacity. |
| `taskCount` | integer (int32) | Optional. The desired number of tasks the execution should run. Will replace existing task_count value. |
| `timeout` | string (google-duration) | Duration in seconds the task may be active before the system will actively try to mark it failed and kill associated containers. Will replace existing timeout_seconds value. |

### `GoogleCloudRunV2Probe`

- Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `failureThreshold` | integer (int32) | Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1. |
| `grpc` | GoogleCloudRunV2GRPCAction | Optional. GRPC specifies an action involving a gRPC port. Exactly one of httpGet, tcpSocket, or grpc must be specified. |
| `httpGet` | GoogleCloudRunV2HTTPGetAction | Optional. HTTPGet specifies the http request to perform. Exactly one of httpGet, tcpSocket, or grpc must be specified. |
| `initialDelaySeconds` | integer (int32) | Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. |
| `periodSeconds` | integer (int32) | Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds. |
| `tcpSocket` | GoogleCloudRunV2TCPSocketAction | Optional. TCPSocket specifies an action involving a TCP port. Exactly one of httpGet, tcpSocket, or grpc must be specified. |
| `timeoutSeconds` | integer (int32) | Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds. |

### `GoogleCloudRunV2ResourceRequirements`

- ResourceRequirements describes the compute resource requirements.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cpuIdle` | boolean | Determines whether CPU is only allocated during requests (true by default). However, if ResourceRequirements is set, the caller must explicitly set this field to true to preserve the default behavior. |
| `limits` | object | Only `memory`, `cpu` and `nvidia.com/gpu` keys in the map are supported. Notes: \* The only supported values for CPU are '1', '2', '4', and '8'. Setting 4 CPU requires at least 2Gi of memory. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. \* For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits \* The only supported 'nvidia.com/gpu' value is '1'. |
| `startupCpuBoost` | boolean | Determines whether CPU should be boosted on startup of a new container instance above the requested CPU threshold, this can help reduce cold-start latency. |

### `GoogleCloudRunV2Revision`

- A Revision is an immutable snapshot of code and configuration. A Revision references a container image. Revisions are only created by updates to its parent Service.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ambientNetworking` | GoogleCloudRunV2AmbientNetworking | Output only. The ambient networking configuration for this revision. |
| `annotations` | object | Output only. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. |
| `client` | string | Output only. Arbitrary identifier for the API client. |
| `clientVersion` | string | Output only. Arbitrary version identifier for the API client. |
| `conditions` | array<GoogleCloudRunV2Condition> | Output only. The Condition of this Revision, containing its readiness status, and detailed error information in case it did not reach a serving state. |
| `containerStatuses` | array<GoogleCloudRunV2ContainerStatus> | Output only. Status information for each of the specified containers. The status includes the resolved digest for specified images. |
| `containers` | array<GoogleCloudRunV2Container> | Holds the list which define the units of execution for this Revision. |
| `createTime` | string (google-datetime) | Output only. The creation time. |
| `creator` | string | Output only. Email address of the authenticated creator. |
| `deleteTime` | string (google-datetime) | Output only. For a deleted resource, the deletion time. It is only populated as a response to a Delete request. |
| `encryptionKey` | string | A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek |
| `encryptionKeyRevocationAction` | string enum | The action to take if the encryption key is revoked. Values: `ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED`, `PREVENT_NEW`, `SHUTDOWN`. |
| `encryptionKeyShutdownDuration` | string (google-duration) | If encryption_key_revocation_action is SHUTDOWN, the duration before shutting down all instances. The minimum increment is 1 hour. |
| `etag` | string | Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `executionEnvironment` | string enum | The execution environment being used to host this Revision. Values: `EXECUTION_ENVIRONMENT_UNSPECIFIED`, `EXECUTION_ENVIRONMENT_GEN1`, `EXECUTION_ENVIRONMENT_GEN2`. |
| `expireTime` | string (google-datetime) | Output only. For a deleted resource, the time after which it will be permamently deleted. It is only populated as a response to a Delete request. |
| `generation` | string (int64) | Output only. A number that monotonically increases every time the user modifies the desired state. |
| `gpuZonalRedundancyDisabled` | boolean | Optional. Output only. True if GPU zonal redundancy is disabled on this revision. |
| `labels` | object | Output only. Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. |
| `launchStage` | string enum | The least stable launch stage needed to create this resource, as defined by Google Cloud Platform Launch Stages (https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. Note that this value might not be what was used as input. For example, if ALPHA was provided as input in the parent resource, but only BETA and GA-level features are used, this field will be BETA. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `logUri` | string | Output only. The Google Console URI to obtain logs for the Revision. |
| `maxInstanceRequestConcurrency` | integer (int32) | Sets the maximum number of requests that each serving instance can receive. |
| `name` | string | Output only. The unique name of this Revision. |
| `nodeSelector` | GoogleCloudRunV2NodeSelector | The node selector for the revision. |
| `observedGeneration` | string (int64) | Output only. The generation of this Revision currently serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `reconciling` | boolean | Output only. Indicates whether the resource's reconciliation is still in progress. See comments in `Service.reconciling` for additional information on reconciliation process in Cloud Run. |
| `sandboxes` | GoogleCloudRunV2SandboxConfiguration | Output only. Configuration for sandboxes. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `scaling` | GoogleCloudRunV2RevisionScaling | Scaling settings for this revision. |
| `scalingStatus` | GoogleCloudRunV2RevisionScalingStatus | Output only. The current effective scaling settings for the revision. |
| `service` | string | Output only. The name of the parent service. |
| `serviceAccount` | string | Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. |
| `serviceMesh` | GoogleCloudRunV2ServiceMesh | Enables service mesh connectivity. |
| `sessionAffinity` | boolean | Enable session affinity. |
| `timeout` | string (google-duration) | Max allowed time for an instance to respond to a request. |
| `uid` | string | Output only. Server assigned unique identifier for the Revision. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. |
| `updateTime` | string (google-datetime) | Output only. The last-modified time. |
| `volumes` | array<GoogleCloudRunV2Volume> | A list of Volumes to make available to containers. |
| `vpcAccess` | GoogleCloudRunV2VpcAccess | VPC Access configuration for this Revision. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. |
| `workloadIdentityConfig` | GoogleCloudRunV2WorkloadIdentityConfig | Optional. The Revision's workload identity settings. |

### `GoogleCloudRunV2RevisionScaling`

- Settings for revision-level scaling settings.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `concurrencyUtilization` | number (float) | Optional. Determines a threshold for concurrency utilization before scaling begins. Accepted values are between `0.1` and `0.95` (inclusive) or `0.0` to disable concurrency utilization as threshold for scaling. CPU and concurrency scaling cannot both be disabled. |
| `cpuUtilization` | number (float) | Optional. Determines a threshold for CPU utilization before scaling begins. Accepted values are between `0.1` and `0.90` (inclusive) or `0.0` to disable CPU utilization as threshold for scaling. CPU and concurrency scaling cannot both be disabled. |
| `maxInstanceCount` | integer (int32) | Optional. Maximum number of serving instances that this resource should have. When unspecified, the field is set to the server default value of 100. For more information see https://cloud.google.com/run/docs/configuring/max-instances |
| `minInstanceCount` | integer (int32) | Optional. Minimum number of serving instances that this resource should have. |

### `GoogleCloudRunV2RevisionScalingStatus`

- Effective settings for the current revision
- Version: v2

| Field | Type | Description |
|---|---|---|
| `desiredMinInstanceCount` | integer (int32) | The current number of min instances provisioned for this revision. |

### `GoogleCloudRunV2RevisionTemplate`

- RevisionTemplate describes the data a revision should have when created from a template.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ambientNetworking` | GoogleCloudRunV2AmbientNetworking | Optional. The ambient networking configuration for this revision. |
| `annotations` | object | Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system annotations in v1 now have a corresponding field in v2 RevisionTemplate. This field follows Kubernetes annotations' namespacing, limits, and rules. |
| `client` | string | Optional. Arbitrary identifier for the API client. |
| `clientVersion` | string | Optional. Arbitrary version identifier for the API client. |
| `containers` | array<GoogleCloudRunV2Container> | Holds the list which define the units of execution for this Revision. |
| `encryptionKey` | string | A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek |
| `encryptionKeyRevocationAction` | string enum | Optional. The action to take if the encryption key is revoked. Values: `ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED`, `PREVENT_NEW`, `SHUTDOWN`. |
| `encryptionKeyShutdownDuration` | string (google-duration) | Optional. If encryption_key_revocation_action is SHUTDOWN, the duration before shutting down all instances. The minimum increment is 1 hour. |
| `executionEnvironment` | string enum | Optional. The sandbox environment to host this Revision. Values: `EXECUTION_ENVIRONMENT_UNSPECIFIED`, `EXECUTION_ENVIRONMENT_GEN1`, `EXECUTION_ENVIRONMENT_GEN2`. |
| `gpuZonalRedundancyDisabled` | boolean | Optional. True if GPU zonal redundancy is disabled on this revision. |
| `healthCheckDisabled` | boolean | Optional. Disables health checking containers during deployment. |
| `labels` | object | Optional. Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 RevisionTemplate. |
| `maxInstanceRequestConcurrency` | integer (int32) | Optional. Sets the maximum number of requests that each serving instance can receive. If not specified or 0, concurrency defaults to 80 when requested `CPU >= 1` and defaults to 1 when requested `CPU < 1`. |
| `nodeSelector` | GoogleCloudRunV2NodeSelector | Optional. The node selector for the revision template. |
| `revision` | string | Optional. The unique name for the revision. If this field is omitted, it will be automatically generated based on the Service name. |
| `sandboxes` | GoogleCloudRunV2SandboxConfiguration | Optional. Configuration for sandboxes. |
| `scaling` | GoogleCloudRunV2RevisionScaling | Optional. Scaling settings for this Revision. |
| `serviceAccount` | string | Optional. Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. If not provided, the revision will use the project's default service account. |
| `serviceMesh` | GoogleCloudRunV2ServiceMesh | Optional. Enables service mesh connectivity. |
| `sessionAffinity` | boolean | Optional. Enable session affinity. |
| `timeout` | string (google-duration) | Optional. Max allowed time for an instance to respond to a request. |
| `volumes` | array<GoogleCloudRunV2Volume> | Optional. A list of Volumes to make available to containers. |
| `vpcAccess` | GoogleCloudRunV2VpcAccess | Optional. VPC Access configuration to use for this Revision. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. |
| `workloadIdentityConfig` | GoogleCloudRunV2WorkloadIdentityConfig | Optional. The Revision's workload identity settings. |

### `GoogleCloudRunV2RunJobRequest`

- Request message to create a new Execution of a Job.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `etag` | string | A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `overrides` | GoogleCloudRunV2Overrides | Overrides specification for a given execution of a job. If provided, overrides will be applied to update the execution or task spec. |
| `validateOnly` | boolean | Indicates that the request should be validated without actually deleting any resources. |

### `GoogleCloudRunV2SandboxConfiguration`

- Configuration for sandboxes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `templates` | array<GoogleCloudRunV2SandboxTemplate> | Required. Sandbox templates that can be launched through the `sandbox` CLI. |

### `GoogleCloudRunV2SandboxTemplate`

- Template for a single sandbox.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Optional. Arguments to the entrypoint. The docker image's CMD is used if this is not provided. |
| `command` | array<string> | Optional. Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. |
| `env` | array<GoogleCloudRunV2EnvVar> | Optional. List of environment variables to set in the sandbox. |
| `image` | string | Required. Name of the container image in Dockerhub or Artifact Registry. If the host is not provided, Dockerhub is assumed. |
| `name` | string | Required. Name of the sandbox specified as a DNS_LABEL (RFC 1123). |
| `volumeMounts` | array<GoogleCloudRunV2VolumeMount> | Optional. Volume to mount into the container's filesystem. |
| `workingDir` | string | Optional. Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. |

### `GoogleCloudRunV2SecretKeySelector`

- SecretEnvVarSource represents a source for the value of an EnvVar.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `secret` | string | Required. The name of the secret in Cloud Secret Manager. Format: {secret_name} if the secret is in the same project. projects/{project}/secrets/{secret_name} if the secret is in a different project. |
| `version` | string | The Cloud Secret Manager secret version. Can be 'latest' for the latest version, an integer for a specific version, or a version alias. |

### `GoogleCloudRunV2SecretVolumeSource`

- The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `defaultMode` | integer (int32) | Integer representation of mode bits to use on created files by default. Must be a value between 0000 and 0777 (octal), defaulting to 0444. Directories within the path are not affected by this setting. Notes \* Internally, a umask of 0222 will be applied to any non-zero value. \* This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). \* This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. This might be in conflict with other options that affect the file mode, like fsGroup, and as a result, other mode bits could be set. |
| `items` | array<GoogleCloudRunV2VersionToPath> | If unspecified, the volume will expose a file whose name is the secret, relative to VolumeMount.mount_path + VolumeMount.sub_path. If specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify a path and a version. |
| `secret` | string | Required. The name of the secret in Cloud Secret Manager. Format: {secret} if the secret is in the same project. projects/{project}/secrets/{secret} if the secret is in a different project. |

### `GoogleCloudRunV2Service`

- Service acts as a top-level container that manages a set of configurations and revision templates which implement a network service. Service exists to provide a singular abstraction which can be access controlled, reasoned about, and which encapsulates software lifecycle decisions such as rollout policy and team resource ownership.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected in new resources. All system annotations in v1 now have a corresponding field in v2 Service. This field follows Kubernetes annotations' namespacing, limits, and rules. |
| `binaryAuthorization` | GoogleCloudRunV2BinaryAuthorization | Optional. Settings for the Binary Authorization feature. |
| `buildConfig` | GoogleCloudRunV2BuildConfig | Optional. Configuration for building a Cloud Run function. |
| `client` | string | Arbitrary identifier for the API client. |
| `clientVersion` | string | Arbitrary version identifier for the API client. |
| `conditions` | array<GoogleCloudRunV2Condition> | Output only. The Conditions of all other associated sub-resources. They contain additional diagnostics information in case the Service does not reach its Serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `createTime` | string (google-datetime) | Output only. The creation time. |
| `creator` | string | Output only. Email address of the authenticated creator. |
| `customAudiences` | array<string> | One or more custom audiences that you want this service to support. Specify each custom audience as the full URL in a string. The custom audiences are encoded in the token and used to authenticate requests. For more information, see https://cloud.google.com/run/docs/configuring/custom-audiences. |
| `defaultUriDisabled` | boolean | Optional. Disables public resolution of the default URI of this service. |
| `deleteTime` | string (google-datetime) | Output only. The deletion time. It is only populated as a response to a Delete request. |
| `description` | string | User-provided description of the Service. This field currently has a 512-character limit. |
| `etag` | string | Optional. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `expireTime` | string (google-datetime) | Output only. For a deleted resource, the time after which it will be permanently deleted. |
| `functionalType` | string enum | Optional. The functional type of the Service. Values: `FUNCTIONAL_TYPE_UNSPECIFIED`, `FUNCTIONAL_TYPE_AGENT`, `FUNCTIONAL_TYPE_MCP_SERVER`. |
| `generation` | string (int64) | Output only. A number that monotonically increases every time the user modifies the desired state. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. |
| `iapEnabled` | boolean | Optional. IAP settings on the Service. |
| `ingress` | string enum | Optional. Provides the ingress settings for this Service. On output, returns the currently observed ingress settings, or INGRESS_TRAFFIC_UNSPECIFIED if no revision is active. Values: `INGRESS_TRAFFIC_UNSPECIFIED`, `INGRESS_TRAFFIC_ALL`, `INGRESS_TRAFFIC_INTERNAL_ONLY`, `INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER`, `INGRESS_TRAFFIC_NONE`. |
| `invokerIamDisabled` | boolean | Optional. Disables IAM permission check for run.routes.invoke for callers of this service. For more information, visit https://cloud.google.com/run/docs/securing/managing-access#invoker_check. |
| `labels` | object | Optional. Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 Service. |
| `lastModifier` | string | Output only. Email address of the last authenticated modifier. |
| `latestCreatedRevision` | string | Output only. Name of the last created revision. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `latestReadyRevision` | string | Output only. Name of the latest revision that is serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `launchStage` | string enum | Optional. The launch stage as defined by Google Cloud Platform Launch Stages (https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `multiRegionSettings` | GoogleCloudRunV2MultiRegionSettings | Optional. Settings for multi-region deployment. |
| `name` | string | Identifier. The fully qualified name of this Service. In CreateServiceRequest, this field is ignored, and instead composed from CreateServiceRequest.parent and CreateServiceRequest.service_id. Format: projects/{project}/locations/{location}/services/{service_id} |
| `observedGeneration` | string (int64) | Output only. The generation of this Service currently serving traffic. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. Please note that unlike v1, this is an int64 value. As with most Google APIs, its JSON representation will be a `string` instead of an `integer`. |
| `reconciling` | boolean | Output only. Returns true if the Service is currently being acted upon by the system to bring it into the desired state. When a new Service is created, or an existing one is updated, Cloud Run will asynchronously perform all necessary steps to bring the Service to the desired serving state. This process is called reconciliation. While reconciliation is in process, `observed_generation`, `latest_ready_revision`, `traffic_statuses`, and `uri` will have transient values that might mismatch the intended state: Once reconciliation is over (and this field is false), there are two possible outcomes: reconciliation succeeded and the serving state matches the Service, or there was an error, and reconciliation failed. This state can be found in `terminal_condition.state`. If reconciliation succeeded, the following fields will match: `traffic` and `traffic_statuses`, `observed_generation` and `generation`, `latest_ready_revision` and `latest_created_revision`. If reconciliation failed, `traffic_statuses`, `observed_generation`, and `latest_ready_revision` will have the state of the last serving revision, or empty for newly created Services. Additional information on the failure can be found in `terminal_condition` and `conditions`. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `scaling` | GoogleCloudRunV2ServiceScaling | Optional. Specifies service-level scaling settings |
| `sshEnabled` | boolean | Optional. Enables SSH access to the Service. |
| `template` | GoogleCloudRunV2RevisionTemplate | Required. The template used to create revisions for this Service. |
| `terminalCondition` | GoogleCloudRunV2Condition | Output only. The Condition of this Service, containing its readiness status, and detailed error information in case it did not reach a serving state. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `threatDetectionEnabled` | boolean | Output only. True if Cloud Run Threat Detection monitoring is enabled for the parent project of this Service. |
| `traffic` | array<GoogleCloudRunV2TrafficTarget> | Optional. Specifies how to distribute traffic over a collection of Revisions belonging to the Service. If traffic is empty or not provided, defaults to 100% traffic to the latest `Ready` Revision. |
| `trafficStatuses` | array<GoogleCloudRunV2TrafficTargetStatus> | Output only. Detailed status information for corresponding traffic targets. See comments in `reconciling` for additional information on reconciliation process in Cloud Run. |
| `uid` | string | Output only. Server assigned unique identifier for the trigger. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. |
| `updateTime` | string (google-datetime) | Output only. The last-modified time. |
| `uri` | string | Output only. The main URI in which this Service is serving traffic. |
| `urls` | array<string> | Output only. All URLs serving traffic for this Service. |

### `GoogleCloudRunV2ServiceMesh`

- Settings for Cloud Service Mesh. For more information see https://cloud.google.com/service-mesh/docs/overview.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mesh` | string | The Mesh resource name. Format: `projects/{project}/locations/global/meshes/{mesh}`, where `{project}` can be project id or number. |

### `GoogleCloudRunV2ServiceScaling`

- Scaling settings applied at the service level rather than at the revision level.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `manualInstanceCount` | integer (int32) | Optional. total instance count for the service in manual scaling mode. This number of instances is divided among all revisions with specified traffic based on the percent of traffic they are receiving. |
| `maxInstanceCount` | integer (int32) | Optional. total max instances for the service. This number of instances is divided among all revisions with specified traffic based on the percent of traffic they are receiving. |
| `minInstanceCount` | integer (int32) | Optional. total min instances for the service. This number of instances is divided among all revisions with specified traffic based on the percent of traffic they are receiving. |
| `scalingMode` | string enum | Optional. The scaling mode for the service. Values: `SCALING_MODE_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |

### `GoogleCloudRunV2SourceCode`

- Source type for the container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudStorageSource` | GoogleCloudRunV2CloudStorageSource | The source is a Cloud Storage bucket. |
| `inlinedSource` | GoogleCloudRunV2InlinedSource | Optional. Input only. Source code inlined in the request. Cloud Run will store the inlined_source to Cloud Storage and replace the field with cloud_storage_source. This field is only supported in Cloud Run Service. |

### `GoogleCloudRunV2SourceFile`

- Source file.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `content` | string | Required. Input only. Represents the exact, literal, and complete source code of the file. Placeholders like `...` or comments such as `# [rest of code]` should NEVER be used as omission. Every character in this field will be built into the final container. Any omission will result in a broken application. |
| `filename` | string | Required. Input only. The file name for the source code. e.g., `"index.js"` or `"node_modules/dependency.js"`. The filename must be less than 255 characters and cannot contain `..`, `./`, `//`, or end with a `/`. Cloud Run will place the files in the container subdirectories, please use relative path to access the file. |

### `GoogleCloudRunV2StartInstanceRequest`

- Request message for starting an Instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates. |
| `validateOnly` | boolean | Optional. Indicates that the request should be validated without actually stopping any resources. |

### `GoogleCloudRunV2StopInstanceRequest`

- Request message for deleting an Instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. A system-generated fingerprint for this version of the resource. This may be used to detect modification conflict during updates. |
| `validateOnly` | boolean | Optional. Indicates that the request should be validated without actually stopping any resources. |

### `GoogleCloudRunV2StorageSource`

- Location of the source in an archive file in Google Cloud Storage.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Google Cloud Storage bucket containing the source (see Bucket Name Requirements (https://cloud.google.com/storage/docs/bucket-naming#requirements)). |
| `generation` | string (int64) | Optional. Google Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. |
| `object` | string | Required. Google Cloud Storage object containing the source. This object must be a gzipped archive file (`.tar.gz`) containing source to build. |

### `GoogleCloudRunV2SubmitBuildRequest`

- Request message for submitting a Build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildpackBuild` | GoogleCloudRunV2BuildpacksBuild | Build the source using Buildpacks. |
| `client` | string | Optional. The client that initiated the build request. |
| `dockerBuild` | GoogleCloudRunV2DockerBuild | Build the source using Docker. This means the source has a Dockerfile. |
| `imageUri` | string | Required. Artifact Registry URI to store the built image. |
| `machineType` | string | Optional. The machine type from default pool to use for the build. If left blank, cloudbuild will use a sensible default. Currently only E2_HIGHCPU_8 is supported. If worker_pool is set, this field will be ignored. |
| `releaseTrack` | string enum | Optional. The release track of the client that initiated the build request. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `serviceAccount` | string | Optional. The service account to use for the build. If not set, the default Cloud Build service account for the project will be used. |
| `storageSource` | GoogleCloudRunV2StorageSource | Required. Source for the build. |
| `tags` | array<string> | Optional. Additional tags to annotate the build. |
| `workerPool` | string | Optional. Name of the Cloud Build private pool that should be used to build the function. The format of this field is `projects/{project}/locations/{region}/workerPools/{workerPool}` where `{project}` and `{region}` are the project id and region respectively where the worker pool is defined and `{workerPool}` is the short name of the worker pool. |

### `GoogleCloudRunV2SubmitBuildResponse`

- Response message for submitting a Build.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseImageUri` | string | URI of the base builder image in Artifact Registry being used in the build. Used to opt into automatic base image updates. |
| `baseImageWarning` | string | Warning message for the base image. |
| `buildOperation` | GoogleLongrunningOperation | Cloud Build operation to be polled via CloudBuild API. |

### `GoogleCloudRunV2TCPSocketAction`

- TCPSocketAction describes an action based on opening a socket
- Version: v2

| Field | Type | Description |
|---|---|---|
| `port` | integer (int32) | Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports\[0\].containerPort. |

### `GoogleCloudRunV2Task`

- Task represents a single run of a container to completion.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Output only. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. |
| `completionTime` | string (google-datetime) | Output only. Represents time when the Task was completed. It is not guaranteed to be set in happens-before order across separate operations. |
| `conditions` | array<GoogleCloudRunV2Condition> | Output only. The Condition of this Task, containing its readiness status, and detailed error information in case it did not reach the desired state. |
| `containers` | array<GoogleCloudRunV2Container> | Holds the single container that defines the unit of execution for this task. |
| `createTime` | string (google-datetime) | Output only. Represents time when the task was created by the system. It is not guaranteed to be set in happens-before order across separate operations. |
| `deleteTime` | string (google-datetime) | Output only. For a deleted resource, the deletion time. It is only populated as a response to a Delete request. |
| `encryptionKey` | string | Output only. A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek |
| `etag` | string | Output only. A system-generated fingerprint for this version of the resource. May be used to detect modification conflict during updates. |
| `execution` | string | Output only. The name of the parent Execution. |
| `executionEnvironment` | string enum | The execution environment being used to host this Task. Values: `EXECUTION_ENVIRONMENT_UNSPECIFIED`, `EXECUTION_ENVIRONMENT_GEN1`, `EXECUTION_ENVIRONMENT_GEN2`. |
| `expireTime` | string (google-datetime) | Output only. For a deleted resource, the time after which it will be permamently deleted. It is only populated as a response to a Delete request. |
| `generation` | string (int64) | Output only. A number that monotonically increases every time the user modifies the desired state. |
| `gpuZonalRedundancyDisabled` | boolean | Optional. Output only. True if GPU zonal redundancy is disabled on this task. |
| `index` | integer (int32) | Output only. Index of the Task, unique per execution, and beginning at 0. |
| `job` | string | Output only. The name of the parent Job. |
| `labels` | object | Output only. Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels |
| `lastAttemptResult` | GoogleCloudRunV2TaskAttemptResult | Output only. Result of the last attempt of this Task. |
| `logUri` | string | Output only. URI where logs for this execution can be found in Cloud Console. |
| `maxRetries` | integer (int32) | Number of retries allowed per Task, before marking this Task failed. |
| `name` | string | Output only. The unique name of this Task. |
| `nodeSelector` | GoogleCloudRunV2NodeSelector | Output only. The node selector for the task. |
| `observedGeneration` | string (int64) | Output only. The generation of this Task. See comments in `Job.reconciling` for additional information on reconciliation process in Cloud Run. |
| `reconciling` | boolean | Output only. Indicates whether the resource's reconciliation is still in progress. See comments in `Job.reconciling` for additional information on reconciliation process in Cloud Run. |
| `retried` | integer (int32) | Output only. The number of times this Task was retried. Tasks are retried when they fail up to the maxRetries limit. |
| `sandboxes` | GoogleCloudRunV2SandboxConfiguration | Configuration for sandboxes. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `scheduledTime` | string (google-datetime) | Output only. Represents time when the task was scheduled to run by the system. It is not guaranteed to be set in happens-before order across separate operations. |
| `serviceAccount` | string | Email address of the IAM service account associated with the Task of a Job. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account. |
| `startTime` | string (google-datetime) | Output only. Represents time when the task started to run. It is not guaranteed to be set in happens-before order across separate operations. |
| `timeout` | string (google-duration) | Max allowed time duration the Task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. |
| `uid` | string | Output only. Server assigned unique identifier for the Task. The value is a UUID4 string and guaranteed to remain unchanged until the resource is deleted. |
| `updateTime` | string (google-datetime) | Output only. The last-modified time. |
| `volumes` | array<GoogleCloudRunV2Volume> | A list of Volumes to make available to containers. |
| `vpcAccess` | GoogleCloudRunV2VpcAccess | Output only. VPC Access configuration to use for this Task. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. |
| `workloadIdentityConfig` | GoogleCloudRunV2WorkloadIdentityConfig | Optional. The Task's workload identity settings. |

### `GoogleCloudRunV2TaskAttemptResult`

- Result of a task attempt.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exitCode` | integer (int32) | Output only. The exit code of this attempt. This may be unset if the container was unable to exit cleanly with a code due to some other failure. See status field for possible failure details. At most one of exit_code or term_signal will be set. |
| `status` | GoogleRpcStatus | Output only. The status of this attempt. If the status code is OK, then the attempt succeeded. |
| `termSignal` | integer (int32) | Output only. Termination signal of the container. This is set to non-zero if the container is terminated by the system. At most one of exit_code or term_signal will be set. |

### `GoogleCloudRunV2TaskTemplate`

- TaskTemplate describes the data a task should have when created from a template.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `containers` | array<GoogleCloudRunV2Container> | Holds the single container that defines the unit of execution for this task. |
| `encryptionKey` | string | A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek |
| `executionEnvironment` | string enum | Optional. The execution environment being used to host this Task. Values: `EXECUTION_ENVIRONMENT_UNSPECIFIED`, `EXECUTION_ENVIRONMENT_GEN1`, `EXECUTION_ENVIRONMENT_GEN2`. |
| `gpuZonalRedundancyDisabled` | boolean | Optional. True if GPU zonal redundancy is disabled on this task template. |
| `maxRetries` | integer (int32) | Number of retries allowed per Task, before marking this Task failed. Defaults to 3. |
| `nodeSelector` | GoogleCloudRunV2NodeSelector | Optional. The node selector for the task template. |
| `sandboxes` | GoogleCloudRunV2SandboxConfiguration | Optional. Configuration for sandboxes. |
| `serviceAccount` | string | Optional. Email address of the IAM service account associated with the Task of a Job. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account. |
| `timeout` | string (google-duration) | Optional. Max allowed time duration the Task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds. |
| `volumes` | array<GoogleCloudRunV2Volume> | Optional. A list of Volumes to make available to containers. |
| `vpcAccess` | GoogleCloudRunV2VpcAccess | Optional. VPC Access configuration to use for this Task. For more information, visit https://cloud.google.com/run/docs/configuring/connecting-vpc. |
| `workloadIdentityConfig` | GoogleCloudRunV2WorkloadIdentityConfig | Optional. The Task's workload identity settings. |

### `GoogleCloudRunV2TrafficTarget`

- Holds a single traffic routing entry for the Service. Allocations can be done to a specific Revision name, or pointing to the latest Ready Revision.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `percent` | integer (int32) | Specifies percent of the traffic to this Revision. This defaults to zero if unspecified. |
| `revision` | string | Revision to which to send this portion of traffic, if traffic allocation is by revision. |
| `tag` | string | Indicates a string to be part of the URI to exclusively reference this target. |
| `type` | string enum | The allocation type for this traffic target. Values: `TRAFFIC_TARGET_ALLOCATION_TYPE_UNSPECIFIED`, `TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST`, `TRAFFIC_TARGET_ALLOCATION_TYPE_REVISION`. |

### `GoogleCloudRunV2TrafficTargetStatus`

- Represents the observed state of a single `TrafficTarget` entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `percent` | integer (int32) | Specifies percent of the traffic to this Revision. |
| `revision` | string | Revision to which this traffic is sent. |
| `tag` | string | Indicates the string used in the URI to exclusively reference this target. |
| `type` | string enum | The allocation type for this traffic target. Values: `TRAFFIC_TARGET_ALLOCATION_TYPE_UNSPECIFIED`, `TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST`, `TRAFFIC_TARGET_ALLOCATION_TYPE_REVISION`. |
| `uri` | string | Displays the target URI. |

### `GoogleCloudRunV2UploadSourceRequest`

- The request message for the UploadSource method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `service` | string | The name of Cloud Run Service upload source archive will be used for. |

### `GoogleCloudRunV2UploadSourceResponse`

- The response message for the UploadSource method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudStorageSource` | GoogleCloudRunV2CloudStorageSource | The Cloud Storage object path the source archive is uploaded to. |

### `GoogleCloudRunV2VersionToPath`

- VersionToPath maps a specific version of a secret to a relative file to mount to, relative to VolumeMount's mount_path.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mode` | integer (int32) | Integer octal mode bits to use on this file, must be a value between 01 and 0777 (octal). If 0 or not set, the Volume's default mode will be used. Notes \* Internally, a umask of 0222 will be applied to any non-zero value. \* This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). \* This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. |
| `path` | string | Required. The relative path of the secret in the container. |
| `version` | string | The Cloud Secret Manager secret version. Can be 'latest' for the latest value, or an integer or a secret alias for a specific version. |

### `GoogleCloudRunV2Volume`

- Volume represents a named volume in a container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudSqlInstance` | GoogleCloudRunV2CloudSqlInstance | For Cloud SQL volumes, contains the specific instances that should be mounted. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run. |
| `emptyDir` | GoogleCloudRunV2EmptyDirVolumeSource | Ephemeral storage used as a shared volume. |
| `filestore` | GoogleCloudRunV2FilestoreVolumeSource | Optional. Represents a volume backed by a Filestore instance. |
| `gcs` | GoogleCloudRunV2GCSVolumeSource | Persistent storage backed by a Google Cloud Storage bucket. |
| `name` | string | Required. Volume's name. |
| `nfs` | GoogleCloudRunV2NFSVolumeSource | For NFS Voumes, contains the path to the nfs Volume |
| `secret` | GoogleCloudRunV2SecretVolumeSource | Secret represents a secret that should populate this volume. |

### `GoogleCloudRunV2VolumeMount`

- VolumeMount describes a mounting of a Volume within a container.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mountPath` | string | Required. Path within the container at which the volume should be mounted. Must not contain ':'. For Cloud SQL volumes, it can be left empty, or must otherwise be `/cloudsql`. All instances defined in the Volume will be available as `/cloudsql/[instance]`. For more information on Cloud SQL volumes, visit https://cloud.google.com/sql/docs/mysql/connect-run |
| `name` | string | Required. This must match the Name of a Volume. |
| `subPath` | string | Optional. Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root). This field is currently rejected in Secret volume mounts. |

### `GoogleCloudRunV2VpcAccess`

- VPC Access settings. For more information on sending traffic to a VPC network, visit https://cloud.google.com/run/docs/configuring/connecting-vpc.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `connector` | string | VPC Access connector name. Format: `projects/{project}/locations/{location}/connectors/{connector}`, where `{project}` can be project id or number. For more information on sending traffic to a VPC network via a connector, visit https://cloud.google.com/run/docs/configuring/vpc-connectors. |
| `egress` | string enum | Optional. Traffic VPC egress settings. If not provided, it defaults to PRIVATE_RANGES_ONLY. Values: `VPC_EGRESS_UNSPECIFIED`, `ALL_TRAFFIC`, `PRIVATE_RANGES_ONLY`. |
| `networkInterfaces` | array<GoogleCloudRunV2NetworkInterface> | Optional. Direct VPC egress settings. Currently only single network interface is supported. |

### `GoogleCloudRunV2WorkerConfiguration`

- Configuration for the worker.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudBuildWorkerConfiguration` | GoogleCloudRunV2CloudBuildWorkerConfiguration | Optional. Cloud Build worker configuration. |

### Shape of `Addressable`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "url": "string"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `run` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://run.googleapis.com/$discovery/rest?version=v2, https://run.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
