---
source: https://clouddeploy.googleapis.com/$discovery/rest?version=v1
---

# Cloud Deploy API message schemas (clouddeploy) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/clouddeploy/`.

### `AbandonReleaseRequest`

- The request object used by `AbandonRelease`.
- Version: v1

### `AbandonReleaseResponse`

- The response object for `AbandonRelease`.
- Version: v1

### `AdvanceChildRolloutJob`

- An advanceChildRollout Job.
- Version: v1

### `AdvanceChildRolloutJobRun`

- AdvanceChildRolloutJobRun contains information specific to a advanceChildRollout `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rollout` | string | Output only. Name of the `ChildRollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |
| `rolloutPhaseId` | string | Output only. the ID of the ChildRollout's Phase. |

### `AdvanceRolloutOperation`

- Contains the information of an automated advance-rollout operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationPhase` | string | Output only. The phase the rollout will be advanced to. |
| `rollout` | string | Output only. The name of the rollout that initiates the `AutomationRun`. |
| `sourcePhase` | string | Output only. The phase of a deployment that initiated the operation. |
| `wait` | string (google-duration) | Output only. How long the operation will be paused. |

### `AdvanceRolloutRequest`

- The request object used by `AdvanceRollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overrideDeployPolicy` | array<string> | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |
| `phaseId` | string | Required. The phase ID to advance the `Rollout` to. |

### `AdvanceRolloutResponse`

- The response object from `AdvanceRollout`.
- Version: v1

### `AdvanceRolloutRule`

- The `AdvanceRollout` automation rule will automatically advance a successful Rollout to the next phase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | AutomationRuleCondition | Output only. Information around the state of the Automation rule. |
| `id` | string | Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. |
| `sourcePhases` | array<string> | Optional. Proceeds only after phase name matched any one in the list. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `wait` | string (google-duration) | Optional. How long to wait after a rollout is finished. |

### `AlertPolicyCheck`

- AlertPolicyCheck configures a set of Cloud Monitoring alerting policies that will be periodically polled for alerts. If any of the listed policies have an active alert, the analysis check will fail.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertPolicies` | array<string> | Required. The Cloud Monitoring Alert Policies to check for active alerts. Format is `projects/{project}/alertPolicies/{alert_policy}`. |
| `id` | string | Required. The ID of the analysis check. |
| `labels` | object | Optional. A set of labels to filter active alerts. If set, only alerts having all of the specified labels will be considered. Otherwise, all active alerts will be considered. |

### `AlertPolicyCheckStatus`

- AlertPolicyCheckStatus contains information specific to a single run of an alert policy check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertPolicies` | array<string> | Output only. The alert policies that this analysis monitors. Format is `projects/{project}/locations/{location}/alertPolicies/{alertPolicy}`. |
| `failedAlertPolicies` | array<FailedAlertPolicy> | Output only. The alert policies that were found to be firing during this check. This will be empty if no incidents were found. |
| `failureMessage` | string | Output only. Additional information about the alert policy check failure, if available. This will be empty if the alert policy check succeeded. |
| `id` | string | Output only. The ID of this analysis. |
| `labels` | object | Output only. The resolved labels used to filter for specific incidents. |

### `Analysis`

- Analysis contains the configuration for the set of analyses to be performed on the target.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customChecks` | array<CustomCheck> | Optional. Custom analysis checks from 3P metric providers. |
| `duration` | string (google-duration) | Required. The amount of time in minutes the analysis on the target will last. If all analysis checks have successfully completed before the specified duration, the analysis is successful. If a check is still running while the specified duration passes, it will wait for that check to complete to determine if the analysis is successful. The maximum duration is 48 hours. |
| `googleCloud` | GoogleCloudAnalysis | Optional. Google Cloud - based analysis checks. |

### `AnalysisJob`

- An analysis Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customChecks` | array<CustomCheck> | Output only. Custom analysis checks from 3P metric providers that are run as part of the analysis Job. |
| `duration` | string (google-duration) | Output only. The amount of time in minutes the analysis Job will run, up to a maximum of 48 hours. If any check in this Job is still running when the duration ends, the Job keeps running until that check completes. |
| `googleCloud` | GoogleCloudAnalysis | Output only. Google Cloud - based analysis checks that are run as part of the analysis Job. |

### `AnalysisJobRun`

- AnalysisJobRun contains information specific to an analysis `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertPolicyAnalyses` | array<AlertPolicyCheckStatus> | Output only. The status of the running alert policy checks configured for this analysis. |
| `customCheckAnalyses` | array<CustomCheckStatus> | Output only. The status of the running custom checks configured for this analysis. |
| `failedCheckId` | string | Output only. The ID of the configured check that failed. This will always be blank while the analysis is in progress or if it succeeded. |

### `AnthosCluster`

- Information specifying an Anthos Cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `membership` | string | Optional. Membership of the GKE Hub-registered cluster to which to apply the Skaffold configuration. Format is `projects/{project}/locations/{location}/memberships/{membership_name}`. |

### `ApproveRolloutRequest`

- The request object used by `ApproveRollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approved` | boolean | Required. True = approve; false = reject |
| `overrideDeployPolicy` | array<string> | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |

### `ApproveRolloutResponse`

- The response object from `ApproveRollout`.
- Version: v1

### `AssociatedEntities`

- Information about entities associated with a `Target`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `anthosClusters` | array<AnthosCluster> | Optional. Information specifying Anthos clusters as associated entities. |
| `gkeClusters` | array<GkeCluster> | Optional. Information specifying GKE clusters as associated entities. |

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

### `Automation`

- An `Automation` resource in the Cloud Deploy API. An `Automation` enables the automation of manually driven actions for a Delivery Pipeline, which includes Release promotion among Targets, Rollout repair and Rollout deployment strategy advancement. The intention of Automation is to reduce manual intervention in the continuous delivery process.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. Annotations must meet the following constraints: \* Annotations are key/value pairs. \* Valid annotation keys have two segments: an optional prefix and name, separated by a slash (`/`). \* The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. \* The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots(`.`), not longer than 253 characters in total, followed by a slash (`/`). See https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set for more details. |
| `createTime` | string (google-datetime) | Output only. Time at which the automation was created. |
| `description` | string | Optional. Description of the `Automation`. Max length is 255 characters. |
| `etag` | string | Optional. The weak etag of the `Automation` resource. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: \* Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. \* All characters must use UTF-8 encoding, and international characters are allowed. \* Keys must start with a lowercase letter or international character. \* Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 63 characters. |
| `name` | string | Output only. Name of the `Automation`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automations/{automation}`. |
| `rules` | array<AutomationRule> | Required. List of Automation rules associated with the Automation resource. Must have at least one rule and limited to 250 rules per Delivery Pipeline. Note: the order of the rules here is not the same as the order of execution. |
| `selector` | AutomationResourceSelector | Required. Selected resources to which the automation will be applied. |
| `serviceAccount` | string | Required. Email address of the user-managed IAM service account that creates Cloud Deploy release and rollout resources. |
| `suspended` | boolean | Optional. When Suspended, automation is deactivated from execution. |
| `uid` | string | Output only. Unique identifier of the `Automation`. |
| `updateTime` | string (google-datetime) | Output only. Time at which the automation was updated. |

### `AutomationEvent`

- Payload proto for "clouddeploy.googleapis.com/automation" Platform Log event that describes the Automation related events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automation` | string | The name of the `AutomationRun`. |
| `message` | string | Debug message for when there is an update on the AutomationRun. Provides further details about the resource creation or state change. |
| `pipelineUid` | string | Unique identifier of the `DeliveryPipeline`. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `AutomationResourceSelector`

- AutomationResourceSelector contains the information to select the resources to which an Automation is going to be applied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targets` | array<TargetAttribute> | Optional. Contains attributes about a target. |

### `AutomationRolloutMetadata`

- AutomationRolloutMetadata contains Automation-related actions that were performed on a rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advanceAutomationRuns` | array<string> | Output only. The names of the AutomationRuns initiated by an advance rollout rule. |
| `promoteAutomationRun` | string | Output only. The name of the AutomationRun initiated by a promote release rule. |
| `repairAutomationRuns` | array<string> | Output only. The names of the AutomationRuns initiated by a repair rollout rule. |

### `AutomationRule`

- `AutomationRule` defines the automation activities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advanceRolloutRule` | AdvanceRolloutRule | Optional. The `AdvanceRolloutRule` will automatically advance a successful Rollout. |
| `promoteReleaseRule` | PromoteReleaseRule | Optional. `PromoteReleaseRule` will automatically promote a release from the current target to a specified target. |
| `repairRolloutRule` | RepairRolloutRule | Optional. The `RepairRolloutRule` will automatically repair a failed rollout. |
| `timedPromoteReleaseRule` | TimedPromoteReleaseRule | Optional. The `TimedPromoteReleaseRule` will automatically promote a release from the current target(s) to the specified target(s) on a configured schedule. |

### `AutomationRuleCondition`

- `AutomationRuleCondition` contains conditions relevant to an `Automation` rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetsPresentCondition` | TargetsPresentCondition | Optional. Details around targets enumerated in the rule. |
| `timedPromoteReleaseCondition` | TimedPromoteReleaseCondition | Optional. TimedPromoteReleaseCondition contains rule conditions specific to a an Automation with a timed promote release rule defined. |

### `AutomationRun`

- An `AutomationRun` resource in the Cloud Deploy API. An `AutomationRun` represents an execution instance of an automation rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advanceRolloutOperation` | AdvanceRolloutOperation | Output only. Advances a rollout to the next phase. |
| `automationId` | string | Output only. The ID of the automation that initiated the operation. |
| `automationSnapshot` | Automation | Output only. Snapshot of the Automation taken at AutomationRun creation time. |
| `createTime` | string (google-datetime) | Output only. Time at which the `AutomationRun` was created. |
| `etag` | string | Output only. The weak etag of the `AutomationRun` resource. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `expireTime` | string (google-datetime) | Output only. Time the `AutomationRun` expires. An `AutomationRun` expires after 14 days from its creation date. |
| `name` | string | Output only. Name of the `AutomationRun`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{delivery_pipeline}/automationRuns/{automation_run}`. |
| `policyViolation` | PolicyViolation | Output only. Contains information about what policies prevented the `AutomationRun` from proceeding. |
| `promoteReleaseOperation` | PromoteReleaseOperation | Output only. Promotes a release to a specified 'Target'. |
| `repairRolloutOperation` | RepairRolloutOperation | Output only. Repairs a failed 'Rollout'. |
| `ruleId` | string | Output only. The ID of the automation rule that initiated the operation. |
| `serviceAccount` | string | Output only. Email address of the user-managed IAM service account that performs the operations against Cloud Deploy resources. |
| `state` | string enum | Output only. Current state of the `AutomationRun`. Values: `STATE_UNSPECIFIED`, `SUCCEEDED`, `CANCELLED`, `FAILED`, `IN_PROGRESS`, `PENDING`, `ABORTED`. |
| `stateDescription` | string | Output only. Explains the current state of the `AutomationRun`. Present only when an explanation is needed. |
| `targetId` | string | Output only. The ID of the source target that initiates the `AutomationRun`. The value of this field is the last segment of a target name. |
| `timedPromoteReleaseOperation` | TimedPromoteReleaseOperation | Output only. Promotes a release to a specified 'Target' as defined in a Timed Promote Release rule. |
| `uid` | string | Output only. Unique identifier of the `AutomationRun`. |
| `updateTime` | string (google-datetime) | Output only. Time at which the automationRun was updated. |
| `waitUntilTime` | string (google-datetime) | Output only. Earliest time the `AutomationRun` will attempt to resume. Wait-time is configured by `wait` in automation rule. |

### `AutomationRunEvent`

- Payload proto for "clouddeploy.googleapis.com/automation_run" Platform Log event that describes the AutomationRun related events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automationId` | string | Identifier of the `Automation`. |
| `automationRun` | string | The name of the `AutomationRun`. |
| `destinationTargetId` | string | ID of the `Target` to which the `AutomationRun` is created. |
| `message` | string | Debug message for when there is an update on the AutomationRun. Provides further details about the resource creation or state change. |
| `pipelineUid` | string | Unique identifier of the `DeliveryPipeline`. |
| `ruleId` | string | Identifier of the `Automation` rule. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BuildArtifact`

- Description of an a image to use during Skaffold rendering.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `image` | string | Optional. Image name in Skaffold configuration. |
| `tag` | string | Optional. Image tag to use. This will generally be the full path to an image, such as "gcr.io/my-project/busybox:1.2.3" or "gcr.io/my-project/busybox@sha256:abc123". |

### `Canary`

- Canary represents the canary deployment strategy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canaryDeployment` | CanaryDeployment | Optional. Configures the progressive based deployment for a Target. |
| `customCanaryDeployment` | CustomCanaryDeployment | Optional. Configures the progressive based deployment for a Target, but allows customizing at the phase level where a phase represents each of the percentage deployments. |
| `runtimeConfig` | RuntimeConfig | Optional. Runtime specific configurations for the deployment strategy. The runtime configuration is used to determine how Cloud Deploy will split traffic to enable a progressive deployment. |

### `CanaryDeployment`

- CanaryDeployment represents the canary deployment configuration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysis` | Analysis | Optional. Configuration for the analysis job. If configured, the analysis will run after each percentage deployment. |
| `percentages` | array<integer> | Required. The percentage based deployments that will occur as a part of a `Rollout`. List is expected in ascending order and each integer n is 0 <= n < 100. If the GatewayServiceMesh is configured for Kubernetes, then the range for n is 0 <= n <= 100. |
| `postdeploy` | Postdeploy | Optional. Configuration for the postdeploy job of the last phase. If this is not configured, there will be no postdeploy job for this phase. |
| `predeploy` | Predeploy | Optional. Configuration for the predeploy job of the first phase. If this is not configured, there will be no predeploy job for this phase. |
| `verify` | boolean | Optional. Whether to run verify tests after each percentage deployment via `skaffold verify`. |
| `verifyConfig` | Verify | Optional. Configuration for the verify job. Cannot be set if `verify` is set to true. |

### `CancelAutomationRunRequest`

- The request object used by `CancelAutomationRun`.
- Version: v1

### `CancelAutomationRunResponse`

- The response object from `CancelAutomationRun`.
- Version: v1

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CancelRolloutRequest`

- The request object used by `CancelRollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overrideDeployPolicy` | array<string> | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |

### `CancelRolloutResponse`

- The response object from `CancelRollout`.
- Version: v1

### `ChildRolloutJobs`

- ChildRollouts job composition
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advanceRolloutJobs` | array<Job> | Output only. List of AdvanceChildRolloutJobs |
| `createRolloutJobs` | array<Job> | Output only. List of CreateChildRolloutJobs |

### `CloudRunConfig`

- CloudRunConfig contains the Cloud Run runtime configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automaticTrafficControl` | boolean | Optional. Whether Cloud Deploy should update the traffic stanza in a Cloud Run Service on the user's behalf to facilitate traffic splitting. This is required to be true for CanaryDeployments, but optional for CustomCanaryDeployments. |
| `canaryRevisionTags` | array<string> | Optional. A list of tags that are added to the canary revision while the canary phase is in progress. |
| `priorRevisionTags` | array<string> | Optional. A list of tags that are added to the prior revision while the canary phase is in progress. |
| `stableRevisionTags` | array<string> | Optional. A list of tags that are added to the final stable revision when the stable phase is applied. |

### `CloudRunLocation`

- Information specifying where to deploy a Cloud Run Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Required. The location for the Cloud Run Service. Format must be `projects/{project}/locations/{location}`. |

### `CloudRunMetadata`

- CloudRunMetadata contains information from a Cloud Run deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `job` | string | Output only. The name of the Cloud Run job that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/jobs/{job_name}`. |
| `previousRevision` | string | Output only. The previous Cloud Run Revision name associated with a `Rollout`. Only set when a canary deployment strategy is configured. Format for service is projects/{project}/locations/{location}/services/{service}/revisions/{revision}. Format for worker pool is projects/{project}/locations/{location}/workerPools/{workerpool}/revisions/{revision}. |
| `revision` | string | Output only. The Cloud Run Revision id associated with a `Rollout`. |
| `service` | string | Output only. The name of the Cloud Run Service that is associated with a `Rollout`. Format is `projects/{project}/locations/{location}/services/{service}`. |
| `serviceUrls` | array<string> | Output only. The Cloud Run Service urls that are associated with a `Rollout`. |
| `workerPool` | string | Output only. The Cloud Run worker pool associated with a `Rollout`. Format is `projects/{project}/locations/{location}/workerPools/{worker_pool}`. |

### `CloudRunRenderMetadata`

- CloudRunRenderMetadata contains Cloud Run information associated with a `Release` render.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `job` | string | Output only. The name of the Cloud Run Job in the rendered manifest. Format is `projects/{project}/locations/{location}/jobs/{job}`. |
| `revision` | string | Output only. The name of the Cloud Run Revision in the rendered manifest. Format is `projects/{project}/locations/{location}/services/{service}/revisions/{revision}`. |
| `service` | string | Output only. The name of the Cloud Run Service in the rendered manifest. Format is `projects/{project}/locations/{location}/services/{service}`. |
| `workerPool` | string | Output only. The name of the Cloud Run Worker Pool in the rendered manifest. Format is `projects/{project}/locations/{location}/workerPools/{worker_pool}`. |

### `Config`

- Service-wide configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultSkaffoldVersion` | string | Default Skaffold version that is assigned when a Release is created without specifying a Skaffold version. |
| `defaultToolVersions` | ToolVersions | Output only. Default tool versions. These tool versions are assigned when a Release is created without specifying tool versions. |
| `name` | string | Name of the configuration. |
| `supportedVersions` | array<SkaffoldVersion> | All supported versions of Skaffold. |

### `ContainerTask`

- This task is represented by a container that is executed in the Cloud Build execution environment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image. |
| `command` | array<string> | Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image. |
| `env` | object | Optional. Environment variables that are set in the container. |
| `image` | string | Required. Image is the container image to use. |

### `CreateChildRolloutJob`

- A createChildRollout Job.
- Version: v1

### `CreateChildRolloutJobRun`

- CreateChildRolloutJobRun contains information specific to a createChildRollout `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rollout` | string | Output only. Name of the `ChildRollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |
| `rolloutPhaseId` | string | Output only. The ID of the childRollout Phase initiated by this JobRun. |

### `CustomCanaryDeployment`

- CustomCanaryDeployment represents the custom canary deployment configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `phaseConfigs` | array<PhaseConfig> | Required. Configuration for each phase in the canary deployment in the order executed. |

### `CustomCheck`

- CustomCheck configures a third-party metric provider to run the analysis, via a Task that runs at a specified frequency.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `frequency` | string (google-duration) | Optional. The frequency at which the custom check will be run, with a minimum and default of 5 minutes. |
| `id` | string | Required. The ID of the custom Analysis check. |
| `task` | Task | Required. The Task to be run for this custom check. |

### `CustomCheckStatus`

- CustomCheckStatus contains information specific to a single iteration of a custom analysis job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failureCause` | string enum | Output only. The reason the analysis failed. This will always be unspecified while the analysis is in progress or if it succeeded. Values: `FAILURE_CAUSE_UNSPECIFIED`, `CLOUD_BUILD_UNAVAILABLE`, `EXECUTION_FAILED`, `DEADLINE_EXCEEDED`, `CLOUD_BUILD_REQUEST_FAILED`. |
| `failureMessage` | string | Output only. Additional information about the analysis failure, if available. |
| `frequency` | string (google-duration) | Output only. The frequency in minutes at which the custom check is run. |
| `id` | string | Output only. The ID of the custom check. |
| `latestBuild` | string | Output only. The resource name of the Cloud Build `Build` object that was used to execute the latest run of this custom action check. Format is `projects/{project}/locations/{location}/builds/{build}`. |
| `metadata` | CustomMetadata | Output only. Custom metadata provided by the user-defined custom check operation. result. |
| `task` | Task | Output only. The task that ran for this custom check. |

### `CustomMetadata`

- CustomMetadata contains information from a user-defined operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | object | Output only. Key-value pairs provided by the user-defined operation. |

### `CustomTarget`

- Information specifying a Custom Target.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customTargetType` | string | Required. The name of the CustomTargetType. Format must be `projects/{project}/locations/{location}/customTargetTypes/{custom_target_type}`. |

### `CustomTargetDeployMetadata`

- CustomTargetDeployMetadata contains information from a Custom Target deploy operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skipMessage` | string | Output only. Skip message provided in the results of a custom deploy operation. |

### `CustomTargetSkaffoldActions`

- CustomTargetSkaffoldActions represents the `CustomTargetType` configuration using Skaffold custom actions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployAction` | string | Required. The Skaffold custom action responsible for deploy operations. |
| `includeSkaffoldModules` | array<SkaffoldModules> | Optional. List of Skaffold modules Cloud Deploy will include in the Skaffold Config as required before performing diagnose. |
| `renderAction` | string | Optional. The Skaffold custom action responsible for render operations. If not provided then Cloud Deploy will perform the render operations via `skaffold render`. |

### `CustomTargetTasks`

- CustomTargetTasks represents the `CustomTargetType` configuration using tasks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploy` | Task | Required. The task responsible for deploy operations. |
| `render` | Task | Optional. The task responsible for render operations. If not provided then Cloud Deploy will perform its default rendering operation. |

### `CustomTargetType`

- A `CustomTargetType` resource in the Cloud Deploy API. A `CustomTargetType` defines a type of custom target that can be referenced in a `Target` in order to facilitate deploying to other systems besides the supported runtimes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. |
| `createTime` | string (google-datetime) | Output only. Time at which the `CustomTargetType` was created. |
| `customActions` | CustomTargetSkaffoldActions | Optional. Configures render and deploy for the `CustomTargetType` using Skaffold custom actions. |
| `customTargetTypeId` | string | Output only. Resource id of the `CustomTargetType`. |
| `description` | string | Optional. Description of the `CustomTargetType`. Max length is 255 characters. |
| `etag` | string | Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: \* Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. \* All characters must use UTF-8 encoding, and international characters are allowed. \* Keys must start with a lowercase letter or international character. \* Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. |
| `name` | string | Identifier. Name of the `CustomTargetType`. Format is `projects/{project}/locations/{location}/customTargetTypes/{customTargetType}`. The `customTargetType` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `tasks` | CustomTargetTasks | Optional. Configures render and deploy for the `CustomTargetType` using tasks. |
| `uid` | string | Output only. Unique identifier of the `CustomTargetType`. |
| `updateTime` | string (google-datetime) | Output only. Most recent time at which the `CustomTargetType` was updated. |

### `CustomTargetTypeNotificationEvent`

- Payload proto for "clouddeploy.googleapis.com/customtargettype_notification" Platform Log event that describes the failure to send a custom target type status change Pub/Sub notification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customTargetType` | string | The name of the `CustomTargetType`. |
| `customTargetTypeUid` | string | Unique identifier of the `CustomTargetType`. |
| `message` | string | Debug message for when a notification fails to send. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DefaultPool`

- Execution using the default Cloud Build pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactStorage` | string | Optional. Cloud Storage location where execution outputs should be stored. This can either be a bucket ("gs://my-bucket") or a path within a bucket ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the same region will be used. |
| `serviceAccount` | string | Optional. Google service account to use for execution. If unspecified, the project execution service account (-compute@developer.gserviceaccount.com) will be used. |

### `DeliveryPipeline`

- A `DeliveryPipeline` resource in the Cloud Deploy API. A `DeliveryPipeline` defines a pipeline through which a Skaffold configuration can progress.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. |
| `condition` | PipelineCondition | Output only. Information around the state of the Delivery Pipeline. |
| `createTime` | string (google-datetime) | Output only. Time at which the pipeline was created. |
| `description` | string | Optional. Description of the `DeliveryPipeline`. Max length is 255 characters. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: \* Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. \* All characters must use UTF-8 encoding, and international characters are allowed. \* Keys must start with a lowercase letter or international character. \* Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. |
| `name` | string | Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `serialPipeline` | SerialPipeline | Optional. SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`. |
| `suspended` | boolean | Optional. When suspended, no new releases or rollouts can be created, but in-progress ones will complete. |
| `uid` | string | Output only. Unique identifier of the `DeliveryPipeline`. |
| `updateTime` | string (google-datetime) | Output only. Most recent time at which the pipeline was updated. |

### `DeliveryPipelineAttribute`

- Contains criteria for selecting DeliveryPipelines.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Optional. ID of the `DeliveryPipeline`. The value of this field could be one of the following: \* The last segment of a pipeline name \* "\*", all delivery pipelines in a location |
| `labels` | object | DeliveryPipeline labels. |

### `DeliveryPipelineNotificationEvent`

- Payload proto for "clouddeploy.googleapis.com/deliverypipeline_notification" Platform Log event that describes the failure to send delivery pipeline status change Pub/Sub notification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deliveryPipeline` | string | The name of the `Delivery Pipeline`. |
| `message` | string | Debug message for when a notification fails to send. |
| `pipelineUid` | string | Unique identifier of the `DeliveryPipeline`. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `DeployArtifact`

- The artifacts produced by a deploy operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactUri` | string | Output only. URI of a directory containing the artifacts. All paths are relative to this location. |
| `manifestPaths` | array<string> | Output only. File paths of the manifests applied during the deploy operation relative to the URI. |

### `DeployJob`

- A deploy Job.
- Version: v1

### `DeployJobRun`

- DeployJobRun contains information specific to a deploy `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifact` | DeployArtifact | Output only. The artifact of a deploy job run, if available. |
| `build` | string | Output only. The resource name of the Cloud Build `Build` object that is used to deploy. Format is `projects/{project}/locations/{location}/builds/{build}`. |
| `failureCause` | string enum | Output only. The reason the deploy failed. This will always be unspecified while the deploy is in progress or if it succeeded. Values: `FAILURE_CAUSE_UNSPECIFIED`, `CLOUD_BUILD_UNAVAILABLE`, `EXECUTION_FAILED`, `DEADLINE_EXCEEDED`, `MISSING_RESOURCES_FOR_CANARY`, `CLOUD_BUILD_REQUEST_FAILED`, `DEPLOY_FEATURE_NOT_SUPPORTED`. |
| `failureMessage` | string | Output only. Additional information about the deploy failure, if available. |
| `metadata` | DeployJobRunMetadata | Output only. Metadata containing information about the deploy job run. |

### `DeployJobRunMetadata`

- DeployJobRunMetadata surfaces information associated with a `DeployJobRun` to the user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudRun` | CloudRunMetadata | Output only. The name of the Cloud Run Service that is associated with a `DeployJobRun`. |
| `custom` | CustomMetadata | Output only. Custom metadata provided by user-defined deploy operation. |
| `customTarget` | CustomTargetDeployMetadata | Output only. Custom Target metadata associated with a `DeployJobRun`. |

### `DeployParameters`

- DeployParameters contains deploy parameters information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `matchTargetLabels` | object | Optional. Deploy parameters are applied to targets with match labels. If unspecified, deploy parameters are applied to all targets (including child targets of a multi-target). |
| `values` | object | Required. Values are deploy parameters in key-value pairs. |

### `DeployPolicy`

- A `DeployPolicy` resource in the Cloud Deploy API. A `DeployPolicy` inhibits manual or automation-driven actions within a Delivery Pipeline or Target.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. Annotations must meet the following constraints: \* Annotations are key/value pairs. \* Valid annotation keys have two segments: an optional prefix and name, separated by a slash (`/`). \* The name segment is required and must be 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. \* The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots(`.`), not longer than 253 characters in total, followed by a slash (`/`). See https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set for more details. |
| `createTime` | string (google-datetime) | Output only. Time at which the deploy policy was created. |
| `description` | string | Optional. Description of the `DeployPolicy`. Max length is 255 characters. |
| `etag` | string | The weak etag of the `DeployPolicy` resource. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: \* Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. \* All characters must use UTF-8 encoding, and international characters are allowed. \* Keys must start with a lowercase letter or international character. \* Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. |
| `name` | string | Output only. Name of the `DeployPolicy`. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. The `deployPolicy` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `rules` | array<PolicyRule> | Required. Rules to apply. At least one rule must be present. |
| `selectors` | array<DeployPolicyResourceSelector> | Required. Selected resources to which the policy will be applied. At least one selector is required. If one selector matches the resource the policy applies. For example, if there are two selectors and the action being attempted matches one of them, the policy will apply to that action. |
| `suspended` | boolean | Optional. When suspended, the policy will not prevent actions from occurring, even if the action violates the policy. |
| `uid` | string | Output only. Unique identifier of the `DeployPolicy`. |
| `updateTime` | string (google-datetime) | Output only. Most recent time at which the deploy policy was updated. |

### `DeployPolicyEvaluationEvent`

- Payload proto for "clouddeploy.googleapis.com/deploypolicy_evaluation" Platform Log event that describes the deploy policy evaluation event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowed` | boolean | Whether the request is allowed. Allowed is set as true if: (1) the request complies with the policy; or (2) the request doesn't comply with the policy but the policy was overridden; or (3) the request doesn't comply with the policy but the policy was suspended |
| `deliveryPipeline` | string | The name of the `Delivery Pipeline`. |
| `deployPolicy` | string | The name of the `DeployPolicy`. |
| `deployPolicyUid` | string | Unique identifier of the `DeployPolicy`. |
| `invoker` | string enum | What invoked the action (e.g. a user or automation). Values: `INVOKER_UNSPECIFIED`, `USER`, `DEPLOY_AUTOMATION`. |
| `message` | string | Debug message for when a deploy policy event occurs. |
| `overrides` | array<string> | Things that could have overridden the policy verdict. Overrides together with verdict decide whether the request is allowed. Values: `POLICY_VERDICT_OVERRIDE_UNSPECIFIED`, `POLICY_OVERRIDDEN`, `POLICY_SUSPENDED`. |
| `pipelineUid` | string | Unique identifier of the `Delivery Pipeline`. |
| `rule` | string | Rule id. |
| `ruleType` | string | Rule type (e.g. Restrict Rollouts). |
| `target` | string | The name of the `Target`. This is an optional field, as a `Target` may not always be applicable to a policy. |
| `targetUid` | string | Unique identifier of the `Target`. This is an optional field, as a `Target` may not always be applicable to a policy. |
| `verdict` | string enum | The policy verdict of the request. Values: `POLICY_VERDICT_UNSPECIFIED`, `ALLOWED_BY_POLICY`, `DENIED_BY_POLICY`. |

### `DeployPolicyNotificationEvent`

- Payload proto for "clouddeploy.googleapis.com/deploypolicy_notification". Platform Log event that describes the failure to send a pub/sub notification when there is a DeployPolicy status change.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployPolicy` | string | The name of the `DeployPolicy`. |
| `deployPolicyUid` | string | Unique identifier of the deploy policy. |
| `message` | string | Debug message for when a deploy policy fails to send a pub/sub notification. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `DeployPolicyResourceSelector`

- Contains information on the resources to select for a deploy policy. Attributes provided must all match the resource in order for policy restrictions to apply. For example, if delivery pipelines attributes given are an id "prod" and labels "foo: bar", a delivery pipeline resource must match both that id and have that label in order to be subject to the policy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deliveryPipeline` | DeliveryPipelineAttribute | Optional. Contains attributes about a delivery pipeline. |
| `target` | TargetAttribute | Optional. Contains attributes about a target. |

### `DeploymentJobs`

- Deployment job composition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysisJob` | Job | Output only. The analysis Job. Runs after a verify if there is a verify job and the verify job succeeds. |
| `deployJob` | Job | Output only. The deploy Job. This is the deploy job in the phase. |
| `postdeployJob` | Job | Output only. The postdeploy Job, which is the last job on the phase. |
| `predeployJob` | Job | Output only. The predeploy Job, which is the first job on the phase. |
| `verifyJob` | Job | Output only. The verify Job. Runs after a deploy if the deploy succeeds. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExecutionConfig`

- Configuration of the environment to use when calling Skaffold.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactStorage` | string | Optional. Cloud Storage location in which to store execution outputs. This can either be a bucket ("gs://my-bucket") or a path within a bucket ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the same region will be used. |
| `defaultPool` | DefaultPool | Optional. Use default Cloud Build pool. |
| `executionTimeout` | string (google-duration) | Optional. Execution timeout for a Cloud Build Execution. This must be between 10m and 24h in seconds format. If unspecified, a default timeout of 1h is used. |
| `privatePool` | PrivatePool | Optional. Use private Cloud Build pool. |
| `serviceAccount` | string | Optional. Google service account to use for execution. If unspecified, the project execution service account (-compute@developer.gserviceaccount.com) is used. |
| `usages` | array<string> | Required. Usages when this configuration should be applied. Values: `EXECUTION_ENVIRONMENT_USAGE_UNSPECIFIED`, `RENDER`, `DEPLOY`, `VERIFY`, `PREDEPLOY`, `POSTDEPLOY`, `ANALYSIS`. |
| `verbose` | boolean | Optional. If true, additional logging will be enabled when running builds in this execution environment. |
| `workerPool` | string | Optional. The resource name of the `WorkerPool`, with the format `projects/{project}/locations/{location}/workerPools/{worker_pool}`. If this optional field is unspecified, the default Cloud Build pool will be used. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FailedAlertPolicy`

- FailedAlertPolicy contains information about an alert policy that was found to be firing during an alert policy check.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertPolicy` | string | Output only. The name of the alert policy that was found to be firing. Format is `projects/{project}/locations/{location}/alertPolicies/{alertPolicy}`. |
| `alerts` | array<string> | Output only. Open alerts for the alerting policies that matched the alert policy check configuration. |

### `GatewayServiceMesh`

- Information about the Kubernetes Gateway API service mesh configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployment` | string | Required. Name of the Kubernetes Deployment whose traffic is managed by the specified HTTPRoute and Service. |
| `httpRoute` | string | Required. Name of the Gateway API HTTPRoute. |
| `podSelectorLabel` | string | Optional. The label to use when selecting Pods for the Deployment and Service resources. This label must already be present in both resources. |
| `routeDestinations` | RouteDestinations | Optional. Route destinations allow configuring the Gateway API HTTPRoute to be deployed to additional clusters. This option is available for multi-cluster service mesh set ups that require the route to exist in the clusters that call the service. If unspecified, the HTTPRoute will only be deployed to the Target cluster. |
| `routeUpdateWaitTime` | string (google-duration) | Optional. The time to wait for route updates to propagate. The maximum configurable time is 3 hours, in seconds format. If unspecified, there is no wait time. |
| `service` | string | Required. Name of the Kubernetes Service. |
| `stableCutbackDuration` | string (google-duration) | Optional. The amount of time to migrate traffic back from the canary Service to the original Service during the stable phase deployment. If specified, must be between 15s and 3600s. If unspecified, there is no cutback time. |

### `GkeCluster`

- Information specifying a GKE Cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Optional. Information specifying a GKE Cluster. Format is `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}`. |
| `dnsEndpoint` | boolean | Optional. If set, the cluster will be accessed using the DNS endpoint. Note that both `dns_endpoint` and `internal_ip` cannot be set to true. |
| `internalIp` | boolean | Optional. If true, `cluster` is accessed using the private IP address of the control plane endpoint. Otherwise, the default IP address of the control plane endpoint is used. The default IP address is the private IP address for clusters with private control-plane endpoints and the public IP address otherwise. Only specify this option when `cluster` is a private GKE cluster (https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept). Note that `internal_ip` and `dns_endpoint` cannot both be set to true. |
| `proxyUrl` | string | Optional. If set, used to configure a proxy (https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#proxy) to the Kubernetes server. |

### `GoogleCloudAnalysis`

- GoogleCloudAnalysis is a set of Google Cloud-based checks to perform on the deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertPolicyChecks` | array<AlertPolicyCheck> | Optional. A list of Cloud Monitoring Alert Policy checks to perform as part of the analysis. |

### `IgnoreJobRequest`

- The request object used by `IgnoreJob`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobId` | string | Required. The job ID for the Job to ignore. |
| `overrideDeployPolicy` | array<string> | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |
| `phaseId` | string | Required. The phase ID the Job to ignore belongs to. |

### `IgnoreJobResponse`

- The response object from `IgnoreJob`.
- Version: v1

### `Job`

- Job represents an operation for a `Rollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advanceChildRolloutJob` | AdvanceChildRolloutJob | Output only. An advanceChildRollout Job. |
| `analysisJob` | AnalysisJob | Output only. An analysis Job. |
| `createChildRolloutJob` | CreateChildRolloutJob | Output only. A createChildRollout Job. |
| `deployJob` | DeployJob | Output only. A deploy Job. |
| `id` | string | Output only. The ID of the Job. |
| `jobRun` | string | Output only. The name of the `JobRun` responsible for the most recent invocation of this Job. |
| `postdeployJob` | PostdeployJob | Output only. A postdeploy Job. |
| `predeployJob` | PredeployJob | Output only. A predeploy Job. |
| `skipMessage` | string | Output only. Additional information on why the Job was skipped, if available. |
| `state` | string enum | Output only. The current state of the Job. Values: `STATE_UNSPECIFIED`, `PENDING`, `DISABLED`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`, `ABORTED`, `SKIPPED`, `IGNORED`. |
| `verifyJob` | VerifyJob | Output only. A verify Job. |

### `JobRun`

- A `JobRun` resource in the Cloud Deploy API. A `JobRun` contains information of a single `Rollout` job evaluation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advanceChildRolloutJobRun` | AdvanceChildRolloutJobRun | Output only. Information specific to an advanceChildRollout `JobRun` |
| `analysisJobRun` | AnalysisJobRun | Output only. Information specific to an analysis `JobRun`. |
| `createChildRolloutJobRun` | CreateChildRolloutJobRun | Output only. Information specific to a createChildRollout `JobRun`. |
| `createTime` | string (google-datetime) | Output only. Time at which the `JobRun` was created. |
| `deployJobRun` | DeployJobRun | Output only. Information specific to a deploy `JobRun`. |
| `endTime` | string (google-datetime) | Output only. Time at which the `JobRun` ended. |
| `etag` | string | Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `jobId` | string | Output only. ID of the `Rollout` job this `JobRun` corresponds to. |
| `name` | string | Output only. Name of the `JobRun`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{releases}/rollouts/{rollouts}/jobRuns/{uuid}`. |
| `phaseId` | string | Output only. ID of the `Rollout` phase this `JobRun` belongs in. |
| `postdeployJobRun` | PostdeployJobRun | Output only. Information specific to a postdeploy `JobRun`. |
| `predeployJobRun` | PredeployJobRun | Output only. Information specific to a predeploy `JobRun`. |
| `startTime` | string (google-datetime) | Output only. Time at which the `JobRun` was started. |
| `state` | string enum | Output only. The current state of the `JobRun`. Values: `STATE_UNSPECIFIED`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`, `TERMINATING`, `TERMINATED`. |
| `uid` | string | Output only. Unique identifier of the `JobRun`. |
| `verifyJobRun` | VerifyJobRun | Output only. Information specific to a verify `JobRun`. |

### `JobRunNotificationEvent`

- Payload proto for "clouddeploy.googleapis.com/jobrun_notification" Platform Log event that describes the failure to send JobRun resource update Pub/Sub notification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobRun` | string | The name of the `JobRun`. |
| `message` | string | Debug message for when a notification fails to send. |
| `pipelineUid` | string | Unique identifier of the `DeliveryPipeline`. |
| `release` | string | The name of the `Release`. |
| `releaseUid` | string | Unique identifier of the `Release`. |
| `rollout` | string | The name of the `Rollout`. |
| `rolloutUid` | string | Unique identifier of the `Rollout`. |
| `targetId` | string | ID of the `Target`. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `KubernetesConfig`

- KubernetesConfig contains the Kubernetes runtime configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gatewayServiceMesh` | GatewayServiceMesh | Optional. Kubernetes Gateway API service mesh configuration. |
| `serviceNetworking` | ServiceNetworking | Optional. Kubernetes Service networking configuration. |

### `KubernetesRenderMetadata`

- KubernetesRenderMetadata contains Kubernetes information associated with a `Release` render.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `canaryDeployment` | string | Output only. Name of the canary version of the Kubernetes Deployment that will be applied to the GKE cluster. Only set if a canary deployment strategy was configured. |
| `deployment` | string | Output only. Name of the Kubernetes Deployment that will be applied to the GKE cluster. Only set if a single Deployment was provided in the rendered manifest. |
| `kubernetesNamespace` | string | Output only. Namespace the Kubernetes resources will be applied to in the GKE cluster. Only set if applying resources to a single namespace. |

### `ListAutomationRunsResponse`

- The response object from `ListAutomationRuns`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automationRuns` | array<AutomationRun> | The `AutomationRuns` objects. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListAutomationsResponse`

- The response object from `ListAutomations`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automations` | array<Automation> | The `Automation` objects. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCustomTargetTypesResponse`

- The response object from `ListCustomTargetTypes.`
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customTargetTypes` | array<CustomTargetType> | The `CustomTargetType` objects. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDeliveryPipelinesResponse`

- The response object from `ListDeliveryPipelines`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deliveryPipelines` | array<DeliveryPipeline> | The `DeliveryPipeline` objects. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDeployPoliciesResponse`

- The response object from `ListDeployPolicies`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployPolicies` | array<DeployPolicy> | The `DeployPolicy` objects. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListJobRunsResponse`

- ListJobRunsResponse is the response object returned by `ListJobRuns`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobRuns` | array<JobRun> | The `JobRun` objects. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached |

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

### `ListReleasesResponse`

- The response object from `ListReleases`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `releases` | array<Release> | The `Release` objects. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRolloutsResponse`

- ListRolloutsResponse is the response object returned by `ListRollouts`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `rollouts` | array<Rollout> | The `Rollout` objects. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListTargetsResponse`

- The response object from `ListTargets`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `targets` | array<Target> | The `Target` objects. |
| `unreachable` | array<string> | Locations that could not be reached. |

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

### `Metadata`

- Metadata includes information associated with a `Rollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automation` | AutomationRolloutMetadata | Output only. AutomationRolloutMetadata contains the information about the interactions between Automation service and this rollout. |
| `cloudRun` | CloudRunMetadata | Output only. The name of the Cloud Run Service that is associated with a `Rollout`. |
| `custom` | CustomMetadata | Output only. Custom metadata provided by user-defined `Rollout` operations. |

### `MultiTarget`

- Information specifying a multiTarget.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetIds` | array<string> | Required. The target_ids of this multiTarget. |

### `OneTimeWindow`

- One-time window within which actions are restricted. For example, blocking actions over New Year's Eve from December 31st at 5pm to January 1st at 9am.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | Date | Required. End date. |
| `endTime` | TimeOfDay | Required. End time (exclusive). You may use 24:00 for the end of the day. |
| `startDate` | Date | Required. Start date. |
| `startTime` | TimeOfDay | Required. Start time (inclusive). Use 00:00 for the beginning of the day. |

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
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Phase`

- Phase represents a collection of jobs that are logically grouped together for a `Rollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `childRolloutJobs` | ChildRolloutJobs | Output only. ChildRollout job composition. |
| `deploymentJobs` | DeploymentJobs | Output only. Deployment job composition. |
| `id` | string | Output only. The ID of the Phase. |
| `skipMessage` | string | Output only. Additional information on why the Phase was skipped, if available. |
| `state` | string enum | Output only. Current state of the Phase. Values: `STATE_UNSPECIFIED`, `PENDING`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`, `ABORTED`, `SKIPPED`. |

### `PhaseArtifact`

- Contains the paths to the artifacts, relative to the URI, for a phase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobManifestsPath` | string | Output only. File path of the directory of rendered job manifests relative to the URI. This is only set if it is applicable. |
| `manifestPath` | string | Output only. File path of the rendered manifest relative to the URI. |
| `skaffoldConfigPath` | string | Output only. File path of the resolved Skaffold configuration relative to the URI. |

### `PhaseConfig`

- PhaseConfig represents the configuration for a phase in the custom canary deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analysis` | Analysis | Optional. Configuration for the analysis job of this phase. If this is not configured, there will be no analysis job for this phase. |
| `percentage` | integer (int32) | Required. Percentage deployment for the phase. |
| `phaseId` | string | Required. The ID to assign to the `Rollout` phase. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `postdeploy` | Postdeploy | Optional. Configuration for the postdeploy job of this phase. If this is not configured, there will be no postdeploy job for this phase. |
| `predeploy` | Predeploy | Optional. Configuration for the predeploy job of this phase. If this is not configured, there will be no predeploy job for this phase. |
| `profiles` | array<string> | Optional. Skaffold profiles to use when rendering the manifest for this phase. These are in addition to the profiles list specified in the `DeliveryPipeline` stage. |
| `verify` | boolean | Optional. Whether to run verify tests after the deployment via `skaffold verify`. |
| `verifyConfig` | Verify | Optional. Configuration for the verify job. Cannot be set if `verify` is set to true. |

### `PipelineCondition`

- PipelineCondition contains all conditions relevant to a Delivery Pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pipelineReadyCondition` | PipelineReadyCondition | Details around the Pipeline's overall status. |
| `targetsPresentCondition` | TargetsPresentCondition | Details around targets enumerated in the pipeline. |
| `targetsTypeCondition` | TargetsTypeCondition | Details on the whether the targets enumerated in the pipeline are of the same type. |

### `PipelineReadyCondition`

- PipelineReadyCondition contains information around the status of the Pipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `status` | boolean | True if the Pipeline is in a valid state. Otherwise at least one condition in `PipelineCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Pipeline. |
| `updateTime` | string (google-datetime) | Last time the condition was updated. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PolicyRule`

- Deploy Policy rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rolloutRestriction` | RolloutRestriction | Optional. Rollout restrictions. |

### `PolicyViolation`

- Returned from an action if one or more policies were violated, and therefore the action was prevented. Contains information about what policies were violated and why.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policyViolationDetails` | array<PolicyViolationDetails> | Policy violation details. |

### `PolicyViolationDetails`

- Policy violation details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failureMessage` | string | User readable message about why the request violated a policy. This is not intended for machine parsing. |
| `policy` | string | Name of the policy that was violated. Policy resource will be in the format of `projects/{project}/locations/{location}/policies/{policy}`. |
| `ruleId` | string | Id of the rule that triggered the policy violation. |

### `Postdeploy`

- Postdeploy contains the postdeploy job configuration information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job. |
| `tasks` | array<Task> | Optional. The tasks that will run as a part of the postdeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified. |

### `PostdeployJob`

- A postdeploy Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | Output only. The custom actions that the postdeploy Job executes. |
| `tasks` | array<Task> | Output only. The tasks that are executed as part of the postdeploy Job. |

### `PostdeployJobRun`

- PostdeployJobRun contains information specific to a postdeploy `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `build` | string | Output only. The resource name of the Cloud Build `Build` object that is used to execute the custom actions associated with the postdeploy Job. Format is `projects/{project}/locations/{location}/builds/{build}`. |
| `failureCause` | string enum | Output only. The reason the postdeploy failed. This will always be unspecified while the postdeploy is in progress or if it succeeded. Values: `FAILURE_CAUSE_UNSPECIFIED`, `CLOUD_BUILD_UNAVAILABLE`, `EXECUTION_FAILED`, `DEADLINE_EXCEEDED`, `CLOUD_BUILD_REQUEST_FAILED`. |
| `failureMessage` | string | Output only. Additional information about the postdeploy failure, if available. |
| `metadata` | PostdeployJobRunMetadata | Output only. Metadata containing information about the postdeploy `JobRun`. |

### `PostdeployJobRunMetadata`

- PostdeployJobRunMetadata contains metadata about the postdeploy `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `custom` | CustomMetadata | Output only. Custom metadata provided by user-defined postdeploy operation. |

### `Predeploy`

- Predeploy contains the predeploy job configuration information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job. |
| `tasks` | array<Task> | Optional. The tasks that will run as a part of the predeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified. |

### `PredeployJob`

- A predeploy Job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | Output only. The custom actions that the predeploy Job executes. |
| `tasks` | array<Task> | Output only. The tasks that are executed as part of the predeploy Job. |

### `PredeployJobRun`

- PredeployJobRun contains information specific to a predeploy `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `build` | string | Output only. The resource name of the Cloud Build `Build` object that is used to execute the custom actions associated with the predeploy Job. Format is `projects/{project}/locations/{location}/builds/{build}`. |
| `failureCause` | string enum | Output only. The reason the predeploy failed. This will always be unspecified while the predeploy is in progress or if it succeeded. Values: `FAILURE_CAUSE_UNSPECIFIED`, `CLOUD_BUILD_UNAVAILABLE`, `EXECUTION_FAILED`, `DEADLINE_EXCEEDED`, `CLOUD_BUILD_REQUEST_FAILED`. |
| `failureMessage` | string | Output only. Additional information about the predeploy failure, if available. |
| `metadata` | PredeployJobRunMetadata | Output only. Metadata containing information about the predeploy `JobRun`. |

### `PredeployJobRunMetadata`

- PredeployJobRunMetadata contains metadata about the predeploy `JobRun`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `custom` | CustomMetadata | Output only. Custom metadata provided by user-defined predeploy operation. |

### `PrivatePool`

- Execution using a private Cloud Build pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifactStorage` | string | Optional. Cloud Storage location where execution outputs should be stored. This can either be a bucket ("gs://my-bucket") or a path within a bucket ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the same region will be used. |
| `serviceAccount` | string | Optional. Google service account to use for execution. If unspecified, the project execution service account (-compute@developer.gserviceaccount.com) will be used. |
| `workerPool` | string | Required. Resource name of the Cloud Build worker pool to use. The format is `projects/{project}/locations/{location}/workerPools/{pool}`. |

### `PromoteReleaseOperation`

- Contains the information of an automated promote-release operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `phase` | string | Output only. The starting phase of the rollout created by this operation. |
| `rollout` | string | Output only. The name of the rollout that initiates the `AutomationRun`. |
| `targetId` | string | Output only. The ID of the target that represents the promotion stage to which the release will be promoted. The value of this field is the last segment of a target name. |
| `wait` | string (google-duration) | Output only. How long the operation will be paused. |

### `PromoteReleaseRule`

- The `PromoteRelease` rule will automatically promote a release from the current target to a specified target.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | AutomationRuleCondition | Output only. Information around the state of the Automation rule. |
| `destinationPhase` | string | Optional. The starting phase of the rollout created by this operation. Default to the first phase. |
| `destinationTargetId` | string | Optional. The ID of the stage in the pipeline to which this `Release` is deploying. If unspecified, default it to the next stage in the promotion flow. The value of this field could be one of the following: \* The last segment of a target name \* "@next", the next target in the promotion sequence |
| `id` | string | Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. |
| `wait` | string (google-duration) | Optional. How long the release need to be paused until being promoted to the next target. |

### `Release`

- A `Release` resource in the Cloud Deploy API. A `Release` defines a specific Skaffold configuration instance that can be deployed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abandoned` | boolean | Output only. Indicates whether this is an abandoned release. |
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. |
| `buildArtifacts` | array<BuildArtifact> | Optional. List of artifacts to pass through to Skaffold command. |
| `condition` | ReleaseCondition | Output only. Information around the state of the Release. |
| `createTime` | string (google-datetime) | Output only. Time at which the `Release` was created. |
| `customTargetTypeSnapshots` | array<CustomTargetType> | Output only. Snapshot of the custom target types referenced by the targets taken at release creation time. |
| `deliveryPipelineSnapshot` | DeliveryPipeline | Output only. Snapshot of the parent pipeline taken at release creation time. |
| `deployParameters` | object | Optional. The deploy parameters to use for all targets in this release. |
| `description` | string | Optional. Description of the `Release`. Max length is 255 characters. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: \* Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. \* All characters must use UTF-8 encoding, and international characters are allowed. \* Keys must start with a lowercase letter or international character. \* Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. |
| `name` | string | Identifier. Name of the `Release`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. The `release` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `renderEndTime` | string (google-datetime) | Output only. Time at which the render completed. |
| `renderStartTime` | string (google-datetime) | Output only. Time at which the render began. |
| `renderState` | string enum | Output only. Current state of the render operation. Values: `RENDER_STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `IN_PROGRESS`. |
| `skaffoldConfigPath` | string | Optional. Filepath of the Skaffold config inside of the config URI. |
| `skaffoldConfigUri` | string | Optional. Cloud Storage URI of tar.gz archive containing Skaffold configuration. |
| `skaffoldVersion` | string | Optional. The Skaffold version to use when operating on this release, such as "1.20.0". Not all versions are valid; Cloud Deploy supports a specific set of versions. If unset, the most recent supported Skaffold version will be used. |
| `targetArtifacts` | object | Output only. Map from target ID to the target artifacts created during the render operation. |
| `targetRenders` | object | Output only. Map from target ID to details of the render operation for that target. |
| `targetSnapshots` | array<Target> | Output only. Snapshot of the targets taken at release creation time. |
| `toolVersions` | ToolVersions | Optional. The tool versions to use for this release and all subsequent operations involving this release. If unset, tool versions are frozen when the release is created. |
| `uid` | string | Output only. Unique identifier of the `Release`. |

### `ReleaseCondition`

- ReleaseCondition contains all conditions relevant to a Release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dockerVersionSupportedCondition` | ToolVersionSupportedCondition | Output only. Details around the support state of the release's Docker version. |
| `helmVersionSupportedCondition` | ToolVersionSupportedCondition | Output only. Details around the support state of the release's Helm version. |
| `kptVersionSupportedCondition` | ToolVersionSupportedCondition | Output only. Details around the support state of the release's kpt version. |
| `kubectlVersionSupportedCondition` | ToolVersionSupportedCondition | Output only. Details around the support state of the release's Kubectl version. |
| `kustomizeVersionSupportedCondition` | ToolVersionSupportedCondition | Output only. Details around the support state of the release's Kustomize version. |
| `releaseReadyCondition` | ReleaseReadyCondition | Details around the Releases's overall status. |
| `skaffoldSupportedCondition` | SkaffoldSupportedCondition | Details around the support state of the release's Skaffold version. |
| `skaffoldVersionSupportedCondition` | ToolVersionSupportedCondition | Output only. Details around the support state of the release's Skaffold version. |

### `ReleaseNotificationEvent`

- Payload proto for "clouddeploy.googleapis.com/release_notification" Platform Log event that describes the failure to send release status change Pub/Sub notification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Debug message for when a notification fails to send. |
| `pipelineUid` | string | Unique identifier of the `DeliveryPipeline`. |
| `release` | string | The name of the `Release`. |
| `releaseUid` | string | Unique identifier of the `Release`. |
| `type` | string enum | Type of this notification, e.g. for a Pub/Sub failure. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `ReleaseReadyCondition`

- ReleaseReadyCondition contains information around the status of the Release. If a release is not ready, you cannot create a rollout with the release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `status` | boolean | True if the Release is in a valid state. Otherwise at least one condition in `ReleaseCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Release. |

### `ReleaseRenderEvent`

- Payload proto for "clouddeploy.googleapis.com/release_render" Platform Log event that describes the render status change.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Debug message for when a render transition occurs. Provides further details as rendering progresses through render states. |
| `pipelineUid` | string | Unique identifier of the `DeliveryPipeline`. |
| `release` | string | The name of the release. release_uid is not in this log message because we write some of these log messages at release creation time, before we've generated the uid. |
| `releaseRenderState` | string enum | The state of the release render. Values: `RENDER_STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `IN_PROGRESS`. |
| `type` | string enum | Type of this notification, e.g. for a release render state change event. Values: `TYPE_UNSPECIFIED`, `TYPE_PUBSUB_NOTIFICATION_FAILURE`, `TYPE_RESOURCE_STATE_CHANGE`, `TYPE_PROCESS_ABORTED`, `TYPE_RESTRICTION_VIOLATED`, `TYPE_RESOURCE_DELETED`, `TYPE_ROLLOUT_UPDATE`, `TYPE_DEPLOY_POLICY_EVALUATION`, `TYPE_RENDER_STATUES_CHANGE`. |

### `RenderMetadata`

- RenderMetadata includes information associated with a `Release` render.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudRun` | CloudRunRenderMetadata | Output only. Metadata associated with rendering for Cloud Run. |
| `custom` | CustomMetadata | Output only. Custom metadata provided by user-defined render operation. |
| `kubernetes` | KubernetesRenderMetadata | Output only. Metadata associated with rendering for a Kubernetes cluster (GKE or GKE Enterprise target). |

### `RepairPhase`

- RepairPhase tracks the repair attempts that have been made for each `RepairPhaseConfig` specified in the `Automation` resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retry` | RetryPhase | Output only. Records of the retry attempts for retry repair mode. |
| `rollback` | RollbackAttempt | Output only. Rollback attempt for rollback repair mode . |

### `RepairPhaseConfig`

- Configuration of the repair phase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retry` | Retry | Optional. Retries a failed job. |
| `rollback` | Rollback | Optional. Rolls back a `Rollout`. |

### `RepairRolloutOperation`

- Contains the information for an automated `repair rollout` operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentRepairPhaseIndex` | string (int64) | Output only. The index of the current repair action in the repair sequence. |
| `jobId` | string | Output only. The job ID for the Job to repair. |
| `phaseId` | string | Output only. The phase ID of the phase that includes the job being repaired. |
| `repairPhases` | array<RepairPhase> | Output only. Records of the repair attempts. Each repair phase may have multiple retry attempts or single rollback attempt. |
| `rollout` | string | Output only. The name of the rollout that initiates the `AutomationRun`. |

### `RepairRolloutRule`

- The `RepairRolloutRule` automation rule will automatically repair a failed `Rollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | AutomationRuleCondition | Output only. Information around the state of the 'Automation' rule. |
| `id` | string | Required. ID of the rule. This id must be unique in the `Automation` resource to which this rule belongs. The format is `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. |
| `jobs` | array<string> | Optional. Jobs to repair. Proceeds only after job name matched any one in the list, or for all jobs if unspecified or empty. The phase that includes the job must match the phase ID specified in `source_phase`. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `phases` | array<string> | Optional. Phases within which jobs are subject to automatic repair actions on failure. Proceeds only after phase name matched any one in the list, or for all phases if unspecified. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `repairPhases` | array<RepairPhaseConfig> | Required. Defines the types of automatic repair phases for failed jobs. |

### `Retry`

- Retries the failed job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attempts` | string (int64) | Required. Total number of retries. Retry is skipped if set to 0; The minimum value is 1, and the maximum value is 10. |
| `backoffMode` | string enum | Optional. The pattern of how wait time will be increased. Default is linear. Backoff mode will be ignored if `wait` is 0. Values: `BACKOFF_MODE_UNSPECIFIED`, `BACKOFF_MODE_LINEAR`, `BACKOFF_MODE_EXPONENTIAL`. |
| `wait` | string (google-duration) | Optional. How long to wait for the first retry. Default is 0, and the maximum value is 14d. |

### `RetryAttempt`

- RetryAttempt represents an action of retrying the failed Cloud Deploy job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attempt` | string (int64) | Output only. The index of this retry attempt. |
| `state` | string enum | Output only. Valid state of this retry action. Values: `REPAIR_STATE_UNSPECIFIED`, `REPAIR_STATE_SUCCEEDED`, `REPAIR_STATE_CANCELLED`, `REPAIR_STATE_FAILED`, `REPAIR_STATE_IN_PROGRESS`, `REPAIR_STATE_PENDING`, `REPAIR_STATE_ABORTED`. |
| `stateDesc` | string | Output only. Description of the state of the Retry. |
| `wait` | string (google-duration) | Output only. How long the operation will be paused. |

### `RetryJobRequest`

- RetryJobRequest is the request object used by `RetryJob`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobId` | string | Required. The job ID for the Job to retry. |
| `overrideDeployPolicy` | array<string> | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`. |
| `phaseId` | string | Required. The phase ID the Job to retry belongs to. |

### `RetryJobResponse`

- The response object from 'RetryJob'.
- Version: v1

### `RetryPhase`

- RetryPhase contains the retry attempts and the metadata for initiating a new attempt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attempts` | array<RetryAttempt> | Output only. Detail of a retry action. |
| `backoffMode` | string enum | Output only. The pattern of how the wait time of the retry attempt is calculated. Values: `BACKOFF_MODE_UNSPECIFIED`, `BACKOFF_MODE_LINEAR`, `BACKOFF_MODE_EXPONENTIAL`. |
| `totalAttempts` | string (int64) | Output only. The number of attempts that have been made. |

### `Rollback`

- Rolls back a `Rollout`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationPhase` | string | Optional. The starting phase ID for the `Rollout`. If unspecified, the `Rollout` will start in the stable phase. |
| `disableRollbackIfRolloutPending` | boolean | Optional. If pending rollout exists on the target, the rollback operation will be aborted. |

### `RollbackAttempt`

- RollbackAttempt represents an action of rolling back a Cloud Deploy 'Target'.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationPhase` | string | Output only. The phase to which the rollout will be rolled back to. |
| `disableRollbackIfRolloutPending` | boolean | Output only. If active rollout exists on the target, abort this rollback. |
| `rolloutId` | string | Output only. ID of the rollback `Rollout` to create. |
| `state` | string enum | Output only. Valid state of this rollback action. Values: `REPAIR_STATE_UNSPECIFIED`, `REPAIR_STATE_SUCCEEDED`, `REPAIR_STATE_CANCELLED`, `REPAIR_STATE_FAILED`, `REPAIR_STATE_IN_PROGRESS`, `REPAIR_STATE_PENDING`, `REPAIR_STATE_ABORTED`. |
| `stateDesc` | string | Output only. Description of the state of the Rollback. |

### `RollbackTargetConfig`

- Configs for the Rollback rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rollout` | Rollout | Optional. The rollback `Rollout` to create. |
| `startingPhaseId` | string | Optional. The starting phase ID for the `Rollout`. If unspecified, the `Rollout` will start in the stable phase. |

### `RollbackTargetRequest`

- The request object for `RollbackTarget`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overrideDeployPolicy` | array<string> | Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deploy_policy}`. |
| `releaseId` | string | Optional. ID of the `Release` to roll back to. If this isn't specified, the previous successful `Rollout` to the specified target will be used to determine the `Release`. |
| `rollbackConfig` | RollbackTargetConfig | Optional. Configs for the rollback `Rollout`. |
| `rolloutId` | string | Required. ID of the rollback `Rollout` to create. |
| `rolloutToRollBack` | string | Optional. If provided, this must be the latest `Rollout` that is on the `Target`. |
| `targetId` | string | Required. ID of the `Target` that is being rolled back. |
| `validateOnly` | boolean | Optional. If set to true, the request is validated and the user is provided with a `RollbackTargetResponse`. |

### `RollbackTargetResponse`

- The response object from `RollbackTarget`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rollbackConfig` | RollbackTargetConfig | The config of the rollback `Rollout` created or will be created. |

### `Rollout`

- A `Rollout` resource in the Cloud Deploy API. A `Rollout` contains information around a specific deployment to a `Target`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeRepairAutomationRun` | string | Output only. The AutomationRun actively repairing the rollout. |
| `annotations` | object | Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations. |
| `approvalState` | string enum | Output only. Approval state of the `Rollout`. Values: `APPROVAL_STATE_UNSPECIFIED`, `NEEDS_APPROVAL`, `DOES_NOT_NEED_APPROVAL`, `APPROVED`, `REJECTED`. |
| `approveTime` | string (google-datetime) | Output only. Time at which the `Rollout` was approved. |
| `controllerRollout` | string | Output only. Name of the `ControllerRollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. |
| `createTime` | string (google-datetime) | Output only. Time at which the `Rollout` was created. |
| `deployEndTime` | string (google-datetime) | Output only. Time at which the `Rollout` finished deploying. |
| `deployFailureCause` | string enum | Output only. The reason this rollout failed. This will always be unspecified while the rollout is in progress. Values: `FAILURE_CAUSE_UNSPECIFIED`, `CLOUD_BUILD_UNAVAILABLE`, `EXECUTION_FAILED`, `DEADLINE_EXCEEDED`, `RELEASE_FAILED`, `RELEASE_ABANDONED`, `VERIFICATION_CONFIG_NOT_FOUND`, `CLOUD_BUILD_REQUEST_FAILED`, `OPERATION_FEATURE_NOT_SUPPORTED`. |
| `deployStartTime` | string (google-datetime) | Output only. Time at which the `Rollout` started deploying. |
| `deployingBuild` | string | Output only. The resource name of the Cloud Build `Build` object that is used to deploy the Rollout. Format is `projects/{project}/locations/{location}/builds/{build}`. |
| `description` | string | Optional. Description of the `Rollout` for user purposes. Max length is 255 characters. |
| `enqueueTime` | string (google-datetime) | Output only. Time at which the `Rollout` was enqueued. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `failureReason` | string | Output only. Additional information about the rollout failure, if available. |
| `labels` | object | Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: \* Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. \* All characters must use UTF-8 encoding, and international characters are allowed. \* Keys must start with a lowercase letter or international character. \* Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes. |
| `metadata` | Metadata | Output only. Metadata contains information about the rollout. |
| `name` | string | Identifier. Name of the `Rollout`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}/rollouts/{rollout}`. The `rollout` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?` |
| `phases` | array<Phase> | Output only. The phases that represent the workflows of this `Rollout`. |
| `rollbackOfRollout` | string | Output only. Name of the `Rollout` that is rolled back by this `Rollout`. Empty if this `Rollout` wasn't created as a rollback. |
| `rolledBackByRollouts` | array<string> | Output only. Names of `Rollouts` that rolled back this `Rollout`. |
| `state` | string enum | Output only. Current state of the `Rollout`. Values: `STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`, `IN_PROGRESS`, `PENDING_APPROVAL`, `APPROVAL_REJECTED`, `PENDING`, `PENDING_RELEASE`, `CANCELLING`, `CANCELLED`, `HALTED`. |
| `targetId` | string | Required. The ID of Target to which this `Rollout` is deploying. |
| `uid` | string | Output only. Unique identifier of the `Rollout`. |

### Shape of `AdvanceChildRolloutJobRun`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "rollout": "string",
  "rolloutPhaseId": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `clouddeploy` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://clouddeploy.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
