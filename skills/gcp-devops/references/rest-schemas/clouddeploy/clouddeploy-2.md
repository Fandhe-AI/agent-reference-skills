---
source: https://clouddeploy.googleapis.com/$discovery/rest?version=v1
---

# Cloud Deploy API message schemas (clouddeploy) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/clouddeploy/`.

### `RolloutNotificationEvent`

- Payload proto for "clouddeploy.googleapis.com/rollout_notification" Platform Log event that describes the failure to send rollout status change Pub/Sub notification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Debug message for when a notification fails to send. |
| `pipelineUid` | string | Unique identifier of the `DeliveryPipeline`. |
| `release` | string | The name of the `Release`. |
| `releaseUid` | string | Unique identifier of the `Release`. |
| `rollout` | string | The name of the `Rollout`. |
| `rolloutUid` | string | Unique identifier of the `Rollout`. |
| `targetId` | string | ID of the `Target` that the rollout is deployed to. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `RolloutRestriction`

- Rollout restrictions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | Optional. Rollout actions to be restricted as part of the policy. If left empty, all actions will be restricted. Values: `ROLLOUT_ACTIONS_UNSPECIFIED`, `ADVANCE`, `APPROVE`, `CANCEL`, `CREATE`, `IGNORE_JOB`, `RETRY_JOB`, `ROLLBACK`, `TERMINATE_JOBRUN`. |
| `id` | string | Required. Restriction rule ID. Required and must be unique within a DeployPolicy. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. |
| `invokers` | array<string> | Optional. What invoked the action. If left empty, all invoker types will be restricted. Values: `INVOKER_UNSPECIFIED`, `USER`, `DEPLOY_AUTOMATION`. |
| `timeWindows` | TimeWindows | Required. Time window within which actions are restricted. |

### `RolloutUpdateEvent`

- Payload proto for "clouddeploy.googleapis.com/rollout_update" Platform Log event that describes the rollout update event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Debug message for when a rollout update event occurs. |
| `pipelineUid` | string | Unique identifier of the pipeline. |
| `release` | string | The name of the `Release`. |
| `releaseUid` | string | Unique identifier of the release. |
| `rollout` | string | The name of the rollout. rollout_uid is not in this log message because we write some of these log messages at rollout creation time, before we've generated the uid. |
| `rolloutUpdateType` | string enum | The type of the rollout update. Values: `ROLLOUT_UPDATE_TYPE_UNSPECIFIED`, `PENDING`, `PENDING_RELEASE`, `IN_PROGRESS`, `CANCELLING`, `CANCELLED`, `HALTED`, `SUCCEEDED`, `FAILED`, `APPROVAL_REQUIRED`, `APPROVED`, `REJECTED`, `ADVANCE_REQUIRED`, `ADVANCED`. |
| `targetId` | string | ID of the target. |
| `type` | string enum | Type of this notification, e.g. for a rollout update event. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `RouteDestinations`

- Information about route destinations for the Gateway API service mesh.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationIds` | array<string> | Required. The clusters where the Gateway API HTTPRoute resource will be deployed to. Valid entries include the associated entities IDs configured in the Target resource and "@self" to include the Target cluster. |
| `propagateService` | boolean | Optional. Whether to propagate the Kubernetes Service to the route destination clusters. The Service will always be deployed to the Target cluster even if the HTTPRoute is not. This option may be used to facilitate successful DNS lookup in the route destination clusters. Can only be set to true if destinations are specified. |

### `RuntimeConfig`

- RuntimeConfig contains the runtime specific configurations for a deployment strategy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudRun` | CloudRunConfig | Optional. Cloud Run runtime configuration. |
| `kubernetes` | KubernetesConfig | Optional. Kubernetes runtime configuration. |

### `SerialPipeline`

- SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stages` | array<Stage> | Optional. Each stage specifies configuration for a `Target`. The ordering of this list defines the promotion flow. |

### `ServiceNetworking`

- Information about the Kubernetes Service networking configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployment` | string | Required. Name of the Kubernetes Deployment whose traffic is managed by the specified Service. |
| `disablePodOverprovisioning` | boolean | Optional. Whether to disable Pod overprovisioning. If Pod overprovisioning is disabled then Cloud Deploy will limit the number of total Pods used for the deployment strategy to the number of Pods the Deployment has on the cluster. |
| `podSelectorLabel` | string | Optional. The label to use when selecting Pods for the Deployment resource. This label must already be present in the Deployment. |
| `service` | string | Required. Name of the Kubernetes Service. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SkaffoldGCBRepoSource`

- Cloud Build V2 Repository containing Skaffold Configs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Optional. Relative path from the repository root to the Skaffold Config file. |
| `ref` | string | Optional. Branch or tag to use when cloning the repository. |
| `repository` | string | Required. Name of the Cloud Build V2 Repository. Format is projects/{project}/locations/{location}/connections/{connection}/repositories/{repository}. |

### `SkaffoldGCSSource`

- Cloud Storage bucket containing Skaffold Config modules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Optional. Relative path from the source to the Skaffold file. |
| `source` | string | Required. Cloud Storage source paths to copy recursively. For example, providing "gs://my-bucket/dir/configs/\*" will result in Skaffold copying all files within the "dir/configs" directory in the bucket "my-bucket". |

### `SkaffoldGitSource`

- Git repository containing Skaffold Config modules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Optional. Relative path from the repository root to the Skaffold file. |
| `ref` | string | Optional. Git branch or tag to use when cloning the repository. |
| `repo` | string | Required. Git repository the package should be cloned from. |

### `SkaffoldModules`

- Skaffold Config modules and their remote source.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configs` | array<string> | Optional. The Skaffold Config modules to use from the specified source. |
| `git` | SkaffoldGitSource | Optional. Remote git repository containing the Skaffold Config modules. |
| `googleCloudBuildRepo` | SkaffoldGCBRepoSource | Optional. Cloud Build V2 repository containing the Skaffold Config modules. |
| `googleCloudStorage` | SkaffoldGCSSource | Optional. Cloud Storage bucket containing the Skaffold Config modules. |

### `SkaffoldSupportedCondition`

- SkaffoldSupportedCondition contains information about when support for the release's version of Skaffold ends.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceModeTime` | string (google-datetime) | The time at which this release's version of Skaffold will enter maintenance mode. |
| `skaffoldSupportState` | string enum | The Skaffold support state for this release's version of Skaffold. Values: `SKAFFOLD_SUPPORT_STATE_UNSPECIFIED`, `SKAFFOLD_SUPPORT_STATE_SUPPORTED`, `SKAFFOLD_SUPPORT_STATE_MAINTENANCE_MODE`, `SKAFFOLD_SUPPORT_STATE_UNSUPPORTED`. |
| `status` | boolean | True if the version of Skaffold used by this release is supported. |
| `supportExpirationTime` | string (google-datetime) | The time at which this release's version of Skaffold will no longer be supported. |

### `SkaffoldVersion`

- Details of a supported Skaffold version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceModeTime` | string (google-datetime) | The time at which this version of Skaffold will enter maintenance mode. |
| `supportEndDate` | Date | Date when this version is expected to no longer be supported. |
| `supportExpirationTime` | string (google-datetime) | The time at which this version of Skaffold will no longer be supported. |
| `version` | string | Release version number. For example, "1.20.3". |

### `Stage`

- Stage specifies a location to which to deploy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployParameters` | array<DeployParameters> | Optional. The deploy parameters to use for the target in this stage. |
| `profiles` | array<string> | Optional. Skaffold profiles to use when rendering the manifest for this stage's `Target`. |
| `strategy` | Strategy | Optional. The strategy to use for a `Rollout` to this stage. |
| `targetId` | string | Optional. The target_id to which this stage points. This field refers exclusively to the last segment of a target name. For example, this field would just be `my-target` (rather than `projects/project/locations/location/targets/my-target`). The location of the `Target` is inferred to be the same as the location of the `DeliveryPipeline` that contains this `Stage`. |

### `Standard`

- Standard represents the standard deployment strategy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysis` | Analysis | Optional. Configuration for the analysis job. If this is not configured, the analysis job will not be present. |
| `postdeploy` | Postdeploy | Optional. Configuration for the postdeploy job. If this is not configured, the postdeploy job will not be present. |
| `predeploy` | Predeploy | Optional. Configuration for the predeploy job. If this is not configured, the predeploy job will not be present. |
| `verify` | boolean | Optional. Whether to verify a deployment via `skaffold verify`. |
| `verifyConfig` | Verify | Optional. Configuration for the verify job. Cannot be set if `verify` is set to true. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Strategy`

- Strategy contains deployment strategy information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canary` | Canary | Optional. Canary deployment strategy provides progressive percentage based deployments to a Target. |
| `standard` | Standard | Optional. Standard deployment strategy executes a single deploy and allows verifying the deployment. |

### `Target`

- A `Target` resource in the Cloud Deploy API. A `Target` defines a location to which a Skaffold configuration can be deployed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. |
| `anthosCluster` | AnthosCluster | Optional. Information specifying an Anthos Cluster. |
| `associatedEntities` | object | Optional. Map of entity IDs to their associated entities. Associated entities allows specifying places other than the deployment target for specific features. For example, the Gateway API canary can be configured to deploy the HTTPRoute to a different cluster(s) than the deployment cluster using associated entities. An entity ID must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `createTime` | string (google-datetime) | Output only. Time at which the `Target` was created. |
| `customTarget` | CustomTarget | Optional. Information specifying a Custom Target. |
| `deployParameters` | object | Optional. The deploy parameters to use for this target. |
| `description` | string | Optional. Description of the `Target`. Max length is 255 characters. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `executionConfigs` | array<ExecutionConfig> | Optional. Configurations for all execution that relates to this `Target`. Each `ExecutionEnvironmentUsage` value may only be used in a single configuration; using the same value multiple times is an error. When one or more configurations are specified, they must include the `RENDER` and `DEPLOY` `ExecutionEnvironmentUsage` values. When no configurations are specified, execution will use the default specified in `DefaultPool`. |
| `gke` | GkeCluster | Optional. Information specifying a GKE Cluster. |
| `labels` | object | Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: \* Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. \* All characters must use UTF-8 encoding, and international characters are allowed. \* Keys must start with a lowercase letter or international character. \* Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. |
| `multiTarget` | MultiTarget | Optional. Information specifying a multiTarget. |
| `name` | string | Identifier. Name of the `Target`. Format is `projects/{project}/locations/{location}/targets/{target}`. The `target` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `requireApproval` | boolean | Optional. Whether or not the `Target` requires approval. |
| `run` | CloudRunLocation | Optional. Information specifying a Cloud Run deployment target. |
| `targetId` | string | Output only. Resource id of the `Target`. |
| `uid` | string | Output only. Unique identifier of the `Target`. |
| `updateTime` | string (google-datetime) | Output only. Most recent time at which the `Target` was updated. |

### `TargetArtifact`

- The artifacts produced by a target render operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactUri` | string | Output only. URI of a directory containing the artifacts. This contains deployment configuration used by Skaffold during a rollout, and all paths are relative to this location. |
| `manifestPath` | string | Output only. File path of the rendered manifest relative to the URI for the stable phase. |
| `phaseArtifacts` | object | Output only. Map from the phase ID to the phase artifacts for the `Target`. |
| `skaffoldConfigPath` | string | Output only. File path of the resolved Skaffold configuration for the stable phase, relative to the URI. |

### `TargetAttribute`

- Contains criteria for selecting Targets. This could be used to select targets for a Deploy Policy or for an Automation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Optional. ID of the `Target`. The value of this field could be one of the following: \* The last segment of a target name \* "\*", all targets in a location |
| `labels` | object | Target labels. |

### `TargetNotificationEvent`

- Payload proto for "clouddeploy.googleapis.com/target_notification" Platform Log event that describes the failure to send target status change Pub/Sub notification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Debug message for when a notification fails to send. |
| `target` | string | The name of the `Target`. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `TargetRender`

- Details of rendering for a single target.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failureCause` | string enum | Output only. Reason this render failed. This will always be unspecified while the render in progress. Values: `FAILURE_CAUSE_UNSPECIFIED`, `CLOUD_BUILD_UNAVAILABLE`, `EXECUTION_FAILED`, `CLOUD_BUILD_REQUEST_FAILED`, `VERIFICATION_CONFIG_NOT_FOUND`, `CUSTOM_ACTION_NOT_FOUND`, `DEPLOYMENT_STRATEGY_NOT_SUPPORTED`, `RENDER_FEATURE_NOT_SUPPORTED`. |
| `failureMessage` | string | Output only. Additional information about the render failure, if available. |
| `metadata` | RenderMetadata | Output only. Metadata related to the `Release` render for this Target. |
| `renderingBuild` | string | Output only. The resource name of the Cloud Build `Build` object that is used to render the manifest for this target. Format is `projects/{project}/locations/{location}/builds/{build}`. |
| `renderingState` | string enum | Output only. Current state of the render operation for this Target. Values: `TARGET_RENDER_STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `IN_PROGRESS`. |

### `Targets`

- The targets involved in a single timed promotion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationTargetId` | string | Optional. The destination target ID. |
| `sourceTargetId` | string | Optional. The source target ID. |

### `TargetsPresentCondition`

- `TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `missingTargets` | array<string> | The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`. |
| `status` | boolean | True if there aren't any missing Targets. |
| `updateTime` | string (google-datetime) | Last time the condition was updated. |

### `TargetsTypeCondition`

- TargetsTypeCondition contains information on whether the Targets defined in the Delivery Pipeline are of the same type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorDetails` | string | Human readable error message. |
| `status` | boolean | True if the targets are all a comparable type. For example this is true if all targets are GKE clusters. This is false if some targets are Cloud Run targets and others are GKE clusters. |

### `Task`

- A Task represents a unit of work that is executed as part of a Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `container` | ContainerTask | Optional. This task is represented by a container that is executed in the Cloud Build execution environment. |

### `TerminateJobRunRequest`

- The request object used by `TerminateJobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overrideDeployPolicy` | array<string> | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |

### `TerminateJobRunResponse`

- The response object from `TerminateJobRun`.
- Version: v1

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

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TimeWindows`

- Time windows within which actions are restricted. See the documentation (https://cloud.google.com/deploy/docs/deploy-policy#dates_times) for more information on how to configure dates/times.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `oneTimeWindows` | array<OneTimeWindow> | Optional. One-time windows within which actions are restricted. |
| `timeZone` | string | Required. The time zone in IANA format IANA Time Zone Database (https://www.iana.org/time-zones) (e.g. America/New_York). |
| `weeklyWindows` | array<WeeklyWindow> | Optional. Recurring weekly windows within which actions are restricted. |

### `TimedPromoteReleaseCondition`

- `TimedPromoteReleaseCondition` contains conditions specific to an Automation with a Timed Promote Release rule defined.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPromotionTime` | string (google-datetime) | Output only. When the next scheduled promotion(s) will occur. |
| `targetsList` | array<Targets> | Output only. A list of targets involved in the upcoming timed promotion(s). |

### `TimedPromoteReleaseOperation`

- Contains the information of an automated timed promote-release operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `phase` | string | Output only. The starting phase of the rollout created by this operation. |
| `release` | string | Output only. The name of the release to be promoted. |
| `targetId` | string | Output only. The ID of the target that represents the promotion stage to which the release will be promoted. The value of this field is the last segment of a target name. |

### `TimedPromoteReleaseRule`

- The `TimedPromoteReleaseRule` will automatically promote a release from the current target(s) to the specified target(s) on a configured schedule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | AutomationRuleCondition | Output only. Information around the state of the Automation rule. |
| `destinationPhase` | string | Optional. The starting phase of the rollout created by this rule. Default to the first phase. |
| `destinationTargetId` | string | Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: \* The last segment of a target name \* "@next", the next target in the promotion sequence |
| `id` | string | Required. ID of the rule. This ID must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. |
| `schedule` | string | Required. Schedule in crontab format. e.g. "0 9 \* \* 1" for every Monday at 9am. |
| `timeZone` | string | Required. The time zone in IANA format IANA Time Zone Database (https://www.iana.org/time-zones) (e.g. America/New_York). |

### `ToolVersionSupportedCondition`

- ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maintenanceModeTime` | string (google-datetime) | Output only. The time at which this release's version of the tool will enter maintenance mode. |
| `status` | boolean | Output only. True if the version of Tool used by this release is supported. |
| `supportExpirationTime` | string (google-datetime) | Output only. The time at which this release's version of the tool will no longer be supported. |
| `toolVersionSupportState` | string enum | Output only. The tool support state for this release's version of the tool. Values: `TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED`, `TOOL_VERSION_SUPPORT_STATE_SUPPORTED`, `TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE`, `TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED`. |

### `ToolVersions`

- Details of ToolVersions for the release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `docker` | string | Optional. The Docker version to use for Cloud Deploy operations. |
| `helm` | string | Optional. The Helm version to use for Cloud Deploy operations. |
| `kpt` | string | Optional. The kpt version to use for Cloud Deploy operations. |
| `kubectl` | string | Optional. The Kubectl version to use for Cloud Deploy operations. |
| `kustomize` | string | Optional. The Kustomize version to use for Cloud Deploy operations. |
| `skaffold` | string | Optional. The Skaffold version to use for Cloud Deploy operations. |

### `Verify`

- Verify contains the verify job configuration information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tasks` | array<Task> | Optional. The tasks that will run as a part of the verify job. The tasks are executed sequentially in the order specified. |

### `VerifyJob`

- A verify Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tasks` | array<Task> | Output only. The tasks that are executed as part of the verify Job. |

### `VerifyJobRun`

- VerifyJobRun contains information specific to a verify `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactUri` | string | Output only. URI of a directory containing the verify artifacts. This contains the Skaffold event log. |
| `build` | string | Output only. The resource name of the Cloud Build `Build` object that is used to verify. Format is `projects/{project}/locations/{location}/builds/{build}`. |
| `eventLogPath` | string | Output only. File path of the Skaffold event log relative to the artifact URI. |
| `failureCause` | string enum | Output only. The reason the verify failed. This will always be unspecified while the verify is in progress or if it succeeded. Values: `FAILURE_CAUSE_UNSPECIFIED`, `CLOUD_BUILD_UNAVAILABLE`, `EXECUTION_FAILED`, `DEADLINE_EXCEEDED`, `VERIFICATION_CONFIG_NOT_FOUND`, `CLOUD_BUILD_REQUEST_FAILED`. |
| `failureMessage` | string | Output only. Additional information about the verify failure, if available. |
| `metadata` | VerifyJobRunMetadata | Output only. Metadata containing information about the verify `JobRun`. |

### `VerifyJobRunMetadata`

- VerifyJobRunMetadata contains metadata about the verify `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `custom` | CustomMetadata | Output only. Custom metadata provided by user-defined verify operation. |

### `WeeklyWindow`

- Weekly windows. For example, blocking actions every Saturday and Sunday. Another example would be blocking actions every weekday from 5pm to midnight.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `daysOfWeek` | array<string> | Optional. Days of week. If left empty, all days of the week will be included. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `endTime` | TimeOfDay | Optional. End time (exclusive). Use 24:00 to indicate midnight. If you specify end_time you must also specify start_time. If left empty, this will block for the entire day for the days specified in days_of_week. |
| `startTime` | TimeOfDay | Optional. Start time (inclusive). Use 00:00 for the beginning of the day. If you specify start_time you must also specify end_time. If left empty, this will block for the entire day for the days specified in days_of_week. |

### Shape of `RolloutNotificationEvent`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "message": "string",
  "pipelineUid": "string",
  "release": "string",
  "releaseUid": "string",
  "rollout": "string",
  "rolloutUid": "string",
  "targetId": "string",
  "type": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `clouddeploy` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://clouddeploy.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
