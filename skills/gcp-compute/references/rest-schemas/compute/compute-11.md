---
source: https://compute.googleapis.com/$discovery/rest?version=v1
---

# Compute Engine API message schemas (compute) (part 11/14)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/compute/`.

### `ResourceStatusAcceleratorStatus`

- The status of an individual accelerator resource.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `passedScans` | array<ResourceStatusAcceleratorStatusPassedScan> | The details of scans that passed for an accelerator. |
| `recommendedScans` | array<ResourceStatusAcceleratorStatusRecommendedScan> | The details of recommended scans for an accelerator. |
| `serialNumber` | string | The serial number of the accelerator. |
| `uuid` | string | The UUID of the accelerator. |

### `ResourceStatusAcceleratorStatusPassedScan`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `endTime` | string | The end time of the passed scan inRFC3339 text format. |
| `name` | string | — |
| `startTime` | string | The start time of the passed scan inRFC3339 text format. |
| `version` | string | — |

### `ResourceStatusAcceleratorStatusRecommendedScan`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `estimatedDuration` | Duration | — |
| `name` | string | — |
| `version` | string | — |

### `ResourceStatusEffectiveInstanceMetadata`

- Effective values of predefined metadata keys for an instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blockProjectSshKeysMetadataValue` | boolean | Effective block-project-ssh-keys value at Instance level. |
| `enableGuestAttributesMetadataValue` | boolean | Effective enable-guest-attributes value at Instance level. |
| `enableOsInventoryMetadataValue` | boolean | Effective enable-os-inventory value at Instance level. |
| `enableOsconfigMetadataValue` | boolean | Effective enable-osconfig value at Instance level. |
| `enableOsloginMetadataValue` | boolean | Effective enable-oslogin value at Instance level. |
| `gceContainerDeclarationMetadataValue` | boolean | Effective gce-container-declaration value at Instance level. |
| `serialPortEnableMetadataValue` | boolean | Effective serial-port-enable value at Instance level. |
| `serialPortLoggingEnableMetadataValue` | boolean | Effective serial-port-logging-enable value at Instance level. |
| `vmDnsSettingMetadataValue` | string | Effective VM DNS setting at Instance level. |

### `ResourceStatusLastInstanceTerminationDetails`

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `terminationReason` | string enum | Reason for termination Values: `BAD_BILLING_ACCOUNT`, `CLOUD_ABUSE_DETECTED`, `DISK_ERROR`, `FREE_TRIAL_EXPIRED`, `INSTANCE_UPDATE_REQUIRED_RESTART`, `INTERNAL_ERROR`, `KMS_REJECTION`, `MANAGED_INSTANCE_GROUP`, `OS_TERMINATED`, `PREEMPTED`, `SCHEDULED_STOP`, `SHUTDOWN_DUE_TO_HOST_ERROR`, `SHUTDOWN_DUE_TO_MAINTENANCE`, `SHUTDOWN_DUE_TO_SHEDDING_EVENT`, `USER_TERMINATED`. |

### `ResourceStatusPhysicalHostTopology`

- Represents the physical host topology of the host on which the VM is running.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | ResourceStatusPhysicalHostTopologyAdditionalAttributes | Output only. \[Output Only\] Additional location information of the running instance. |
| `block` | string | \[Output Only\] The ID of the block in which the running instance is located. Instances within the same block experience low network latency. |
| `cluster` | string | \[Output Only\] The global name of the Compute Engine cluster where the running instance is located. |
| `host` | string | \[Output Only\] The ID of the host on which the running instance is located. Instances on the same host experience the lowest possible network latency. |
| `subblock` | string | \[Output Only\] The ID of the sub-block in which the running instance is located. Instances in the same sub-block experience lower network latency than instances in the same block. |

### `ResourceStatusPhysicalHostTopology` (beta)

- Represents the physical host topology of the host on which the VM is running.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | ResourceStatusPhysicalHostTopologyAdditionalAttributes | Output only. \[Output Only\] Additional location information of the running instance. |
| `block` | string | \[Output Only\] The ID of the block in which the running instance is located. Instances within the same block experience low network latency. |
| `cluster` | string | \[Output Only\] The global name of the Compute Engine cluster where the running instance is located. |
| `host` | string | \[Output Only\] The ID of the host on which the running instance is located. Instances on the same host experience the lowest possible network latency. |
| `machine` | string | Output only. \[Output Only\] The ID of the machine on which the running instance is located. It is only populated for machines which have multiple hosts. |
| `subblock` | string | \[Output Only\] The ID of the sub-block in which the running instance is located. Instances in the same sub-block experience lower network latency than instances in the same block. |

### `ResourceStatusPhysicalHostTopologyAdditionalAttributes`

- Additional location information of the running instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologyIds` | object | Output only. The IDs of the accelerator topologies the instance belongs to. For example The key will be topologies like "4x4", "2x2x2" and the value will be the location ID of the topologies. |

### `ResourceStatusPhysicalHostTopologyAdditionalAttributes` (beta)

- Additional location information of the running instance.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `acceleratorTopologyIds` | object | Output only. The IDs of the accelerator topologies the instance belongs to. For example The key will be topologies like "4x4", "2x2x2" and the value will be the location ID of the topologies. |
| `networkTopologyIds` | object | Output only. Key-value store for arbitrary network topology identifiers defined by the underlying infrastructure. The key will be the topology label and the value will be the location ID for the topology. |

### `ResourceStatusReservationConsumptionInfo`

- Reservation consumption information that the instance is consuming from.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumedReservation` | string | Output only. \[Output Only\] The full resource name of the reservation that this instance is consuming from. |
| `consumedReservationBlock` | string | Output only. \[Output Only\] The full resource name of the reservation block that this instance is consuming from. |
| `consumedReservationSubBlock` | string | Output only. \[Output Only\] The full resource name of the reservation sub-block that this instance is consuming from. |

### `ResourceStatusScheduling`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availabilityDomain` | integer (int32) | Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance. |
| `gracefulShutdownTimestamp` | string | Output only. Specifies the timestamp, when the instance will start graceful shutdown process, in RFC3339 text format. |
| `protectionTier` | string enum | Output only. Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures). Values: `PROTECTION_TIER_CAPACITY_OPTIMIZED`, `PROTECTION_TIER_STANDARD`, `PROTECTION_TIER_UNSPECIFIED`. |
| `terminationTimestamp` | string | Time in future when the instance will be terminated inRFC3339 text format. |

### `ResourceStatusScheduling` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `availabilityDomain` | integer (int32) | Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance. |
| `gracefulShutdownTimestamp` | string | Output only. Specifies the timestamp, when the instance will start graceful shutdown process, in RFC3339 text format. |
| `terminationTimestamp` | string | Time in future when the instance will be terminated inRFC3339 text format. |

### `ResourceStatusServiceIntegrationStatus`

- Represents the status of integration between instance and another service. See (internal link) for more details.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `backupDr` | ResourceStatusServiceIntegrationStatusBackupDRStatus | — |

### `ResourceStatusServiceIntegrationStatusBackupDRStatus`

- Message defining compute perspective of the result of integration with Backup and DR. FAILED status indicates that the operation specified did not complete correctly and should be retried with the same value.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `integrationDetails` | string | The PlanReference object created by Backup and DR to maintain the actual status of backups. May still be present if removing the backup plan fails. |
| `state` | string enum | Enum representing the registration state of a Backup and DR backup plan for the instance. Values: `ACTIVE`, `CREATING`, `DELETING`, `FAILED`, `STATE_UNSPECIFIED`. |

### `ResourceStatusShutdownDetails`

- Specifies if the instance is in `PENDING_STOP` state or there is a programmed stop scheduled.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxDuration` | Duration | The duration for graceful shutdown. Only applicable when `stop_state=PENDING_STOP`. |
| `requestTimestamp` | string | Past timestamp indicating the beginning of current `stopState` in RFC3339 text format. |
| `stopState` | string enum | Current stopping state of the instance. Values: `PENDING_STOP`, `STOPPING`. |
| `targetState` | string enum | Target instance state. Values: `DELETED`, `STOPPED`. |

### `RiskDetails`

- Detailed insights and metrics about a detected reliability risk.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | The duration of the risk since it was detected. |
| `globalDnsInsight` | RiskDetailsGlobalDnsInsight | Insight details for global DNS risk. |
| `lastUpdateTimestamp` | string (google-datetime) | The last time the risk was updated. |
| `severity` | string enum | The severity of the risk. Values: `CRITICAL`, `HIGH`, `LOW`, `MEDIUM`, `SEVERITY_UNSPECIFIED`. |
| `type` | string enum | The type of risk. Values: `GLOBAL_DNS`, `RISK_TYPE_UNSPECIFIED`. |

### `RiskDetailsGlobalDnsInsight`

- Detailed insights for a global DNS reliability risk.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectDefaultIsGlobalDns` | boolean | Indicates whether the project's default DNS setting is global DNS. |
| `queryObservationWindow` | string (google-duration) | The observation window for the query counts. |
| `riskyQueryCount` | string (int64) | The number of queries that are risky. This is always less than or equal to total_query_count. |
| `totalQueryCount` | string (int64) | The total number of queries in the observation window. |

### `RiskRecommendation`

- Recommendation for mitigating a reliability risk, including a reference URL.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | Mitigation guide for the risk. |
| `referenceUrl` | string | URL referencing a more detailed mitigation guide. |

### `Rollout`

- Rollout resource. A Rollout is a specific instance of a RolloutPlan. It represents a single execution of a strategy to roll out a specific resource. It also provides APIs to interact with the rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancellationTime` | string | Output only. The timestamp at which the Rollout was cancelled. |
| `completionTime` | string | Output only. The timestamp at which the Rollout was completed. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `currentWaveNumber` | string (int64) | Output only. The number of the currently running wave. Ex. 1 |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `etag` | string | Output only. etag of the Rollout Ex. abc1234 |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#rollout for rollouts. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `pauseTime` | string | Output only. The timestamp at which the Rollout was paused. |
| `resumeTime` | string | Output only. The timestamp at which the Rollout was resumed. |
| `rolloutEntity` | RolloutRolloutEntity | Required. The resource being rolled out. |
| `rolloutPlan` | string | Required. Rollout Plan used to model the Rollout. Ex. compute.googleapis.com/v1/projects/1234/rolloutPlans/rp1 |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `state` | string enum | Output only. The current state of the Rollout. Values: `CANCELLED`, `CANCELLING`, `CANCEL_FAILED`, `COMPLETED`, `COMPLETE_FAILED`, `COMPLETING`, `FAILED`, `PAUSED`, `PAUSE_FAILED`, `PAUSING`, `PROCESSING`, `READY`, `RESUMING`, `ROLLBACK_WAVE_FAILED`, `ROLLING_BACK`, `STATE_UNSPECIFIED`, `UNINITIALIZED`, `WAVE_FAILED`. |
| `waveDetails` | array<RolloutWaveDetails> | Output only. Details about each wave of the rollout. |

### `RolloutPlan`

- RolloutPlan resource. A RolloutPlan is the customer-defined strategy to divide a large-scale change into smaller increments, referred to as "waves". Each wave targets a specific portion of the overall affected area and defines criteria that must be met before progressing to the subsequent wave.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#rolloutPlan for rolloutPlans. |
| `locationScope` | string enum | The location scope of the rollout plan. If not specified, the location scope is considered as ZONAL. Values: `LOCATION_SCOPE_UNSPECIFIED`, `REGIONAL`, `ZONAL`. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource's resource id. |
| `waves` | array<RolloutPlanWave> | Required. The waves included in this rollout plan. |

### `RolloutPlanWave`

- A single wave in a rollout plan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. The display name of this wave of the rollout plan. |
| `number` | string (int64) | Output only. The wave number. |
| `orchestrationOptions` | RolloutPlanWaveOrchestrationOptions | Optional. The orchestration options for this wave. |
| `selectors` | array<RolloutPlanWaveSelector> | Required. The selectors for this wave. There is a logical AND between each selector defined in a wave, so a resource must satisfy the criteria of \*all\* the specified selectors to be in scope for the wave. |
| `validation` | RolloutPlanWaveValidation | Required. The validation to be performed at the end of this wave. |

### `RolloutPlanWaveOrchestrationOptions`

- Options to control the pace of orchestration of a wave. These options are required only if the resource being rolled out follows the Orchestrated pattern.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delays` | array<RolloutPlanWaveOrchestrationOptionsDelay> | Optional. Delays, if any, to be added between batches of projects. We allow multiple Delays to be specified, letting users set separate delays between batches of projects corresponding to different locations and batches of projects corresponding to the same location. |
| `maxConcurrentLocations` | string (int64) | Optional. Maximum number of locations to be orchestrated in parallel. |
| `maxConcurrentResourcesPerLocation` | string (int64) | Optional. Maximum number of resources to be orchestrated per location in parallel. |

### `RolloutPlanWaveOrchestrationOptionsDelay`

- Options to control the delay, if any, between batches of projects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `delimiter` | string enum | Optional. Controls whether the delay should only be added between batches of projects corresponding to different locations, or also between batches of projects corresponding to the same location. Must be set to DELIMITER_UNSPECIFIED if no delay is to be added. Values: `DELIMITER_BATCH`, `DELIMITER_LOCATION`, `DELIMITER_UNSPECIFIED`. |
| `duration` | string (google-duration) | Optional. The duration of the delay, if any, to be added between batches of projects. A zero duration corresponds to no delay. |
| `type` | string enum | Optional. Controls whether the specified duration is to be added at the end of each batch, or if the total processing time for each batch will be padded if needed to meet the specified duration. Must be set to TYPE_UNSPECIFIED if no delay is to be added. Values: `TYPE_MINIMUM`, `TYPE_OFFSET`, `TYPE_UNSPECIFIED`. |

### `RolloutPlanWaveSelector`

- A selector which specifies what resource(s) are included in a given wave.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locationSelector` | RolloutPlanWaveSelectorLocationSelector | Optional. Roll out to resources by Cloud locations. |
| `resourceHierarchySelector` | RolloutPlanWaveSelectorResourceHierarchySelector | Optional. Roll out to resources by Cloud Resource Manager resource hierarchy. |

### `RolloutPlanWaveSelectorLocationSelector`

- Roll out to resources by location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `includedLocations` | array<string> | Optional. Example: "us-central1-a" |

### `RolloutPlanWaveSelectorResourceHierarchySelector`

- Roll out to resources by Cloud Resource Manager resource hierarchy nodes such as projects, folders, orgs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `includedFolders` | array<string> | Optional. Format: "folders/{folder_id}" |
| `includedOrganizations` | array<string> | Optional. Format: "organizations/{organization_id}" |
| `includedProjects` | array<string> | Optional. Format: "projects/{project_id}" |

### `RolloutPlanWaveValidation`

- The validation to be performed before progressing to the next wave.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `timeBasedValidationMetadata` | RolloutPlanWaveValidationTimeBasedValidationMetadata | Optional. Metadata required if type = "time". |
| `type` | string | Required. The type of the validation. If a type of validation is associated with a metadata object, the appropriate metadata field mapping to the validation type must be provided in the validation message. Possible values are in quotes below alongside an explanation: "manual": The system waits for an end-user approval API before progressing to the next wave. "time": The system waits for a user specified duration before progressing to the next wave. TimeBasedValidation must be provided. |

### `RolloutPlanWaveValidationTimeBasedValidationMetadata`

- Metadata required if type = "time".
- Version: v1

| Field | Type | Description |
|---|---|---|
| `waitDuration` | string (google-duration) | Optional. The duration that the system waits in between waves. This wait starts after all changes in the wave are rolled out. |

### `RolloutPlansListResponse`

- Contains a list of RolloutPlan resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<RolloutPlan> | A list of RolloutPlan resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RolloutPolicy`

- A rollout policy configuration.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `defaultRolloutTime` | string | An optional RFC3339 timestamp on or after which the update is considered rolled out to any zone that is not explicitly stated. |
| `locationRolloutPolicies` | object | Location based rollout policies to apply to the resource. Currently only zone names are supported and must be represented as valid URLs, like: zones/us-central1-a. The value expects an RFC3339 timestamp on or after which the update is considered rolled out to the specified location. |

### `RolloutRolloutEntity`

- Specifications of the resource to roll out.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `orchestratedEntity` | RolloutRolloutEntityOrchestratedEntity | Optional. Entity details for products using the Orchestrated Integration model. |

### `RolloutRolloutEntityOrchestratedEntity`

- This message is used if the resource type follows the Orchestrated integration model with ProgressiveRollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conflictBehavior` | string | Required. Specifies the behavior of the Rollout if an out of band update is detected in a project during a Rollout. It can be one of the following values: 1) overwrite : Overwrite the local value with the rollout value. 2) no_overwrite : Do not overwrite the local value with the rollout value. |
| `orchestrationAction` | string | Required. Orchestration action during the Rollout. It can be one of the following values: 1) "update": Resources will be updated by the rollout. 2) "delete": Resources will be deleted by the rollout. |
| `orchestrationSource` | string | Required. Fully qualified resource name of the resource which contains the source of truth of the configuration being rolled out across locations/projects. For example, in the case of a global Rollout which is applied across regions, this contains the name of the global resource created by the user which contains a payload for a resource that is orchestrated across regions. This follows the following format: //.googleapis.com/projects//locations/global// e.g. //osconfig.googleapis.com/projects/1/locations/global/policyOrchestrators/po1 |

### `RolloutWaveDetails`

- Additional metadata about the status of each wave provided by the server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `orchestratedWaveDetails` | RolloutWaveDetailsOrchestratedWaveDetails | Output only. Additional details of the wave for products using the Orchestrated Integration model. |
| `waveDisplayName` | string | Output only. Wave name. Ex. wave1 |
| `waveNumber` | string (int64) | Output only. System generated number for the wave. |

### `RolloutWaveDetailsOrchestratedWaveDetails`

- Details of the wave for products using the Orchestrated integration model.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completedResourcesCount` | string (int64) | Output only. Resource completed so far. |
| `estimatedCompletionTime` | string | Output only. Estimated timestamp at which the wave will complete. Extrapolated from current progress. |
| `estimatedTotalResourcesCount` | string (int64) | Output only. Estimated total count of resources. |
| `failedLocations` | array<string> | Output only. Locations that failed during orchestration, and ProgressiveRollout stopped retrying. There may be some successful resources rolled out in the wave as the location may have failed later in the Rollout. |
| `failedResourcesCount` | string (int64) | Output only. Resources failed. |
| `locationStatus` | object | Output only. Status of each location in the wave. Map keys (locations) must be specified like "us-east1" or "asia-west1-a". |

### `RolloutWaveDetailsOrchestratedWaveDetailsLocationStatus`

- Represents the status of a location in a wave.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Output only. Location state of the wave. Values: `STATE_FAILED`, `STATE_IN_PROGRESS`, `STATE_PENDING`, `STATE_SKIPPED`, `STATE_SUCCEEDED`, `STATE_UNSPECIFIED`. |

### `RolloutsListResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Rollout> | A list of Rollout resources. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. end_interface: MixerListResponseWithEtagBuilder |
| `warning` | object | \[Output Only\] Informational warning message. |

### `Route`

- Represents a Route resource. A route defines a path from VM instances in the VPC network to a specific destination. This destination can be inside or outside the VPC network. For more information, read theRoutes overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asPaths` | array<RouteAsPath> | Output only. \[Output Only\] AS path. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `destRange` | string | The destination range of outgoing packets that this route applies to. Both IPv4 and IPv6 are supported. Must specify an IPv4 range (e.g. 192.0.2.0/24) or an IPv6 range in RFC 4291 format (e.g. 2001:db8::/32). IPv6 range will be displayed using RFC 5952 compressed format. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of this resource. Always compute#routes for Route resources. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | Fully-qualified URL of the network that this route applies to. |
| `nextHopGateway` | string | The URL to a gateway that should handle matching packets. You can only specify the internet gateway using a full or partial valid URL: projects/project/global/gateways/default-internet-gateway |
| `nextHopHub` | string | Output only. \[Output Only\] The full resource name of the Network Connectivity Center hub that will handle matching packets. |
| `nextHopIlb` | string | The URL to a forwarding rule of typeloadBalancingScheme=INTERNAL that should handle matching packets or the IP address of the forwarding Rule. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/forwardingRules/forwardingRule - regions/region/forwardingRules/forwardingRule If an IP address is provided, must specify an IPv4 address in dot-decimal notation or an IPv6 address in RFC 4291 format. For example, the following are all valid IP addresses: - 10.128.0.56 - 2001:db8::2d9:51:0:0 - 2001:db8:0:0:2d9:51:0:0 IPv6 addresses will be displayed using RFC 5952 compressed format (e.g. 2001:db8::2d9:51:0:0). Should never be an IPv4-mapped IPv6 address. |
| `nextHopInstance` | string | The URL to an instance that should handle matching packets. You can specify this as a full or partial URL. For example: https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/ |
| `nextHopInterRegionCost` | integer (uint32) | Output only. \[Output only\] Internal fixed region-to-region cost that Google Cloud calculates based on factors such as network performance, distance, and available bandwidth between regions. |
| `nextHopInterconnectAttachment` | string | Output only. \[Output Only\] The URL to an InterconnectAttachment which is the next hop for the route. This field will only be populated for dynamic routes generated by Cloud Router with a linked interconnectAttachment or the static route generated by each L2 Interconnect Attachment. |
| `nextHopIp` | string | The network IP address of an instance that should handle matching packets. Both IPv6 address and IPv4 addresses are supported. Must specify an IPv4 address in dot-decimal notation (e.g. 192.0.2.99) or an IPv6 address in RFC 4291 format (e.g. 2001:db8::2d9:51:0:0 or 2001:db8:0:0:2d9:51:0:0). IPv6 addresses will be displayed using RFC 5952 compressed format (e.g. 2001:db8::2d9:51:0:0). Should never be an IPv4-mapped IPv6 address. |
| `nextHopMed` | integer (uint32) | Output only. \[Output Only\] Multi-Exit Discriminator, a BGP route metric that indicates the desirability of a particular route in a network. |
| `nextHopNetwork` | string | The URL of the local network if it should handle matching packets. |
| `nextHopOrigin` | string enum | Output only. \[Output Only\] Indicates the origin of the route. Can be IGP (Interior Gateway Protocol), EGP (Exterior Gateway Protocol), or INCOMPLETE. Values: `EGP`, `IGP`, `INCOMPLETE`. |
| `nextHopPeering` | string | Output only. \[Output Only\] The network peering name that should handle matching packets, which should conform to RFC1035. |
| `nextHopVpnTunnel` | string | The URL to a VpnTunnel that should handle matching packets. |
| `params` | RouteParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `priority` | integer (uint32) | The priority of this route. Priority is used to break ties in cases where there is more than one matching route of equal prefix length. In cases where multiple routes have equal prefix length, the one with the lowest-numbered priority value wins. The default value is `1000`. The priority value must be from `0` to `65535`, inclusive. |
| `routeStatus` | string enum | \[Output only\] The status of the route. This status applies to dynamic routes learned by Cloud Routers. It is also applicable to routes undergoing migration. Values: `ACTIVE`, `DROPPED`, `INACTIVE`, `PENDING`. |
| `routeType` | string enum | Output only. \[Output Only\] The type of this route, which can be one of the following values: - 'TRANSIT' for a transit route that this router learned from another Cloud Router and will readvertise to one of its BGP peers - 'SUBNET' for a route from a subnet of the VPC - 'BGP' for a route learned from a BGP peer of this router - 'STATIC' for a static route Values: `BGP`, `STATIC`, `SUBNET`, `TRANSIT`. |
| `selfLink` | string | \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `tags` | array<string> | A list of instance tags to which this route applies. |
| `warnings` | array<object> | Output only. \[Output Only\] If potential misconfigurations are detected for this route, this field will be populated with warning messages. |

### `Route` (alpha)

- Represents a Route resource. A route defines a path from VM instances in the VPC network to a specific destination. This destination can be inside or outside the VPC network. For more information, read theRoutes overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `allowConflictingSubnetworks` | boolean | Whether this route can conflict with existing subnetworks. Setting this to true allows this route to conflict with subnetworks that have already been configured on the corresponding network. |
| `asPaths` | array<RouteAsPath> | Output only. \[Output Only\] AS path. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this field when you create the resource. |
| `destRange` | string | The destination range of outgoing packets that this route applies to. Both IPv4 and IPv6 are supported. Must specify an IPv4 range (e.g. 192.0.2.0/24) or an IPv6 range in RFC 4291 format (e.g. 2001:db8::/32). IPv6 range will be displayed using RFC 5952 compressed format. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `ilbRouteBehaviorOnUnhealthy` | string enum | ILB route behavior when ILB is deemed unhealthy based on user specified threshold on the Backend Service of the internal load balancing. Values: `DO_NOT_WITHDRAW_ROUTE_IF_ILB_UNHEALTHY`, `WITHDRAW_ROUTE_IF_ILB_UNHEALTHY`. |
| `kind` | string | Output only. \[Output Only\] Type of this resource. Always compute#routes for Route resources. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `network` | string | Fully-qualified URL of the network that this route applies to. |
| `nextHopGateway` | string | The URL to a gateway that should handle matching packets. You can only specify the internet gateway using a full or partial valid URL: projects/project/global/gateways/default-internet-gateway |
| `nextHopHub` | string | Output only. \[Output Only\] The full resource name of the Network Connectivity Center hub that will handle matching packets. |
| `nextHopIlb` | string | The URL to a forwarding rule of typeloadBalancingScheme=INTERNAL that should handle matching packets or the IP address of the forwarding Rule. For example, the following are all valid URLs: - https://www.googleapis.com/compute/v1/projects/project/regions/region/forwardingRules/forwardingRule - regions/region/forwardingRules/forwardingRule If an IP address is provided, must specify an IPv4 address in dot-decimal notation or an IPv6 address in RFC 4291 format. For example, the following are all valid IP addresses: - 10.128.0.56 - 2001:db8::2d9:51:0:0 - 2001:db8:0:0:2d9:51:0:0 IPv6 addresses will be displayed using RFC 5952 compressed format (e.g. 2001:db8::2d9:51:0:0). Should never be an IPv4-mapped IPv6 address. |
| `nextHopInstance` | string | The URL to an instance that should handle matching packets. You can specify this as a full or partial URL. For example: https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/ |
| `nextHopInterRegionCost` | integer (uint32) | Output only. \[Output only\] Internal fixed region-to-region cost that Google Cloud calculates based on factors such as network performance, distance, and available bandwidth between regions. |
| `nextHopInterconnectAttachment` | string | Output only. \[Output Only\] The URL to an InterconnectAttachment which is the next hop for the route. This field will only be populated for dynamic routes generated by Cloud Router with a linked interconnectAttachment or the static route generated by each L2 Interconnect Attachment. |
| `nextHopIp` | string | The network IP address of an instance that should handle matching packets. Both IPv6 address and IPv4 addresses are supported. Must specify an IPv4 address in dot-decimal notation (e.g. 192.0.2.99) or an IPv6 address in RFC 4291 format (e.g. 2001:db8::2d9:51:0:0 or 2001:db8:0:0:2d9:51:0:0). IPv6 addresses will be displayed using RFC 5952 compressed format (e.g. 2001:db8::2d9:51:0:0). Should never be an IPv4-mapped IPv6 address. |
| `nextHopMed` | integer (uint32) | Output only. \[Output Only\] Multi-Exit Discriminator, a BGP route metric that indicates the desirability of a particular route in a network. |
| `nextHopNetwork` | string | The URL of the local network if it should handle matching packets. |
| `nextHopOrigin` | string enum | Output only. \[Output Only\] Indicates the origin of the route. Can be IGP (Interior Gateway Protocol), EGP (Exterior Gateway Protocol), or INCOMPLETE. Values: `EGP`, `IGP`, `INCOMPLETE`. |
| `nextHopPeering` | string | Output only. \[Output Only\] The network peering name that should handle matching packets, which should conform to RFC1035. |
| `nextHopVpnTunnel` | string | The URL to a VpnTunnel that should handle matching packets. |
| `params` | RouteParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `priority` | integer (uint32) | The priority of this route. Priority is used to break ties in cases where there is more than one matching route of equal prefix length. In cases where multiple routes have equal prefix length, the one with the lowest-numbered priority value wins. The default value is `1000`. The priority value must be from `0` to `65535`, inclusive. |
| `routeStatus` | string enum | \[Output only\] The status of the route. This status applies to dynamic routes learned by Cloud Routers. It is also applicable to routes undergoing migration. Values: `ACTIVE`, `DROPPED`, `INACTIVE`, `OVERRIDDEN_BY_HUB`, `OVERRIDDEN_BY_PEERING`, `PENDING`. |
| `routeType` | string enum | Output only. \[Output Only\] The type of this route, which can be one of the following values: - 'TRANSIT' for a transit route that this router learned from another Cloud Router and will readvertise to one of its BGP peers - 'SUBNET' for a route from a subnet of the VPC - 'BGP' for a route learned from a BGP peer of this router - 'STATIC' for a static route Values: `BGP`, `STATIC`, `SUBNET`, `TRANSIT`. |
| `selfLink` | string | \[Output Only\] Server-defined fully-qualified URL for this resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `tags` | array<string> | A list of instance tags to which this route applies. |
| `warnings` | array<object> | Output only. \[Output Only\] If potential misconfigurations are detected for this route, this field will be populated with warning messages. |

### `RouteAsPath`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asLists` | array<integer> | \[Output Only\] The AS numbers of the AS Path. |
| `pathSegmentType` | string enum | \[Output Only\] The type of the AS Path, which can be one of the following values: - 'AS_SET': unordered set of autonomous systems that the route in has traversed - 'AS_SEQUENCE': ordered set of autonomous systems that the route has traversed - 'AS_CONFED_SEQUENCE': ordered set of Member Autonomous Systems in the local confederation that the route has traversed - 'AS_CONFED_SET': unordered set of Member Autonomous Systems in the local confederation that the route has traversed Values: `AS_CONFED_SEQUENCE`, `AS_CONFED_SET`, `AS_SEQUENCE`, `AS_SET`. |

### `RouteList`

- Contains a list of Route resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Route> | A list of Route resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RouteParams`

- Additional route parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. |

### `RoutePolicy`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | An optional description of route policy. |
| `fingerprint` | string (byte) | A fingerprint for the Route Policy being applied to this Router, which is essentially a hash of the Route Policy used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update Route Policy. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make a getRoutePolicy() request to retrieve a Route Policy. |
| `name` | string | Route Policy name, which must be a resource ID segment and unique within all the router's Route Policies. Name should conform to RFC1035. |
| `terms` | array<RoutePolicyPolicyTerm> | List of terms (the order in the list is not important, they are evaluated in order of priority). Order of policies is not retained and might change when getting policy later. |
| `type` | string enum | — Values: `ROUTE_POLICY_TYPE_EXPORT`, `ROUTE_POLICY_TYPE_IMPORT`. |

### `RoutePolicyPolicyTerm`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<Expr> | CEL expressions to evaluate to modify a route when this term matches. |
| `match` | Expr | CEL expression evaluated against a route to determine if this term applies. When not set, the term applies to all routes. |
| `priority` | integer (int32) | The evaluation priority for this term, which must be between 0 (inclusive) and 2^31 (exclusive), and unique within the list. |

### `Router`

- Represents a Cloud Router resource. For more information about Cloud Router, read theCloud Router overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bgp` | RouterBgp | BGP information specific to this router. |
| `bgpPeers` | array<RouterBgpPeer> | BGP information that must be configured into the routing stack to establish BGP peering. This information must specify the peer ASN and either the interface name, IP address, or peer IP address. Please refer toRFC4273. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `encryptedInterconnectRouter` | boolean | Indicates if a router is dedicated for use with encrypted VLAN attachments (interconnectAttachments). |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interfaces` | array<RouterInterface> | Router interfaces. To create a BGP peer that uses a router interface, the interface must have one of the following fields specified: - linkedVpnTunnel - linkedInterconnectAttachment - subnetwork You can create a router interface without any of these fields specified. However, you cannot create a BGP peer that uses that interface. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#router for routers. |
| `md5AuthenticationKeys` | array<RouterMd5AuthenticationKey> | Keys used for MD5 authentication. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nats` | array<RouterNat> | A list of NAT services created in this router. |
| `nccGateway` | string | URI of the ncc_gateway to which this router associated. |
| `network` | string | URI of the network to which this router belongs. |
| `params` | RouterParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | \[Output Only\] URI of the region where the router resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |

### `Router` (alpha)

- Represents a Cloud Router resource. For more information about Cloud Router, read theCloud Router overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `bgp` | RouterBgp | BGP information specific to this router. |
| `bgpPeers` | array<RouterBgpPeer> | BGP information that must be configured into the routing stack to establish BGP peering. This information must specify the peer ASN and either the interface name, IP address, or peer IP address. Please refer toRFC4273. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `encryptedInterconnectRouter` | boolean | Indicates if a router is dedicated for use with encrypted VLAN attachments (interconnectAttachments). |
| `etag` | string | ETag for optimistic concurrency control as described by AIP 154. Used to prevent conflicting updates. If provided, the request will succeed only if the etag matches the current etag of the router; otherwise, the request fails with an ABORTED error. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interfaces` | array<RouterInterface> | Router interfaces. To create a BGP peer that uses a router interface, the interface must have one of the following fields specified: - linkedVpnTunnel - linkedInterconnectAttachment - subnetwork You can create a router interface without any of these fields specified. However, you cannot create a BGP peer that uses that interface. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#router for routers. |
| `md5AuthenticationKeys` | array<RouterMd5AuthenticationKey> | Keys used for MD5 authentication. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nats` | array<RouterNat> | A list of NAT services created in this router. |
| `nccGateway` | string | URI of the ncc_gateway to which this router associated. |
| `network` | string | URI of the network to which this router belongs. |
| `params` | RouterParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | \[Output Only\] URI of the region where the router resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |

### `Router` (beta)

- Represents a Cloud Router resource. For more information about Cloud Router, read theCloud Router overview.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `bgp` | RouterBgp | BGP information specific to this router. |
| `bgpPeers` | array<RouterBgpPeer> | BGP information that must be configured into the routing stack to establish BGP peering. This information must specify the peer ASN and either the interface name, IP address, or peer IP address. Please refer toRFC4273. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `encryptedInterconnectRouter` | boolean | Indicates if a router is dedicated for use with encrypted VLAN attachments (interconnectAttachments). |
| `etag` | string | ETag for optimistic concurrency control as described by AIP 154. Used to prevent conflicting updates. If provided, the request will succeed only if the etag matches the current etag of the router; otherwise, the request fails with an ABORTED error. |
| `id` | string (uint64) | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `interfaces` | array<RouterInterface> | Router interfaces. To create a BGP peer that uses a router interface, the interface must have one of the following fields specified: - linkedVpnTunnel - linkedInterconnectAttachment - subnetwork You can create a router interface without any of these fields specified. However, you cannot create a BGP peer that uses that interface. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#router for routers. |
| `md5AuthenticationKeys` | array<RouterMd5AuthenticationKey> | Keys used for MD5 authentication. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `nats` | array<RouterNat> | A list of NAT services created in this router. |
| `nccGateway` | string | URI of the ncc_gateway to which this router associated. |
| `network` | string | URI of the network to which this router belongs. |
| `params` | RouterParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `region` | string | \[Output Only\] URI of the region where the router resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body. |
| `selfLink` | string | \[Output Only\] Server-defined URL for the resource. |

### `RouterAdvertisedIpRange`

- Description-tagged IP ranges for the router to advertise.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | User-specified description for the IP range. |
| `range` | string | The IP range to advertise. The value must be a CIDR-formatted string. |

### `RouterAggregatedList`

- Contains a list of routers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of Router resources. |
| `kind` | string | Output only. Type of resource. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RouterBgp`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advertiseMode` | string enum | User-specified flag to indicate which mode to use for advertisement. The options are DEFAULT or CUSTOM. Values: `CUSTOM`, `DEFAULT`. |
| `advertisedGroups` | array<string> | User-specified list of prefix groups to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and is advertised to all peers of the router. These groups will be advertised in addition to any specified prefixes. Leave this field blank to advertise no custom groups. Values: `ALL_SUBNETS`. |
| `advertisedIpRanges` | array<RouterAdvertisedIpRange> | User-specified list of individual IP ranges to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and is advertised to all peers of the router. These IP ranges will be advertised in addition to any specified groups. Leave this field blank to advertise no custom IP ranges. |
| `asn` | integer (uint32) | Local BGP Autonomous System Number (ASN). Must be anRFC6996 private ASN, either 16-bit or 32-bit. The value will be fixed for this router resource. All VPN tunnels that link to this router will have the same local ASN. |
| `identifierRange` | string | Explicitly specifies a range of valid BGP Identifiers for this Router. It is provided as a link-local IPv4 range (from 169.254.0.0/16), of size at least /30, even if the BGP sessions are over IPv6. It must not overlap with any IPv4 BGP session ranges. Other vendors commonly call this "router ID". |
| `keepaliveInterval` | integer (uint32) | The interval in seconds between BGP keepalive messages that are sent to the peer. Hold time is three times the interval at which keepalive messages are sent, and the hold time is the maximum number of seconds allowed to elapse between successive keepalive messages that BGP receives from a peer. BGP will use the smaller of either the local hold time value or the peer's hold time value as the hold time for the BGP connection between the two peers. If set, this value must be between 20 and 60. The default is 20. |

### `RouterBgpPeer`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advertiseMode` | string enum | User-specified flag to indicate which mode to use for advertisement. Values: `CUSTOM`, `DEFAULT`. |
| `advertisedGroups` | array<string> | User-specified list of prefix groups to advertise in custom mode, which currently supports the following option: - ALL_SUBNETS: Advertises all of the router's own VPC subnets. This excludes any routes learned for subnets that use VPC Network Peering. Note that this field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These groups are advertised in addition to any specified prefixes. Leave this field blank to advertise no custom groups. Values: `ALL_SUBNETS`. |
| `advertisedIpRanges` | array<RouterAdvertisedIpRange> | User-specified list of individual IP ranges to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These IP ranges are advertised in addition to any specified groups. Leave this field blank to advertise no custom IP ranges. |
| `advertisedRoutePriority` | integer (uint32) | The priority of routes advertised to this BGP peer. Where there is more than one matching route of maximum length, the routes with the lowest priority value win. |
| `bfd` | RouterBgpPeerBfd | BFD configuration for the BGP peering. |
| `customLearnedIpRanges` | array<RouterBgpPeerCustomLearnedIpRange> | A list of user-defined custom learned route IP address ranges for a BGP session. |
| `customLearnedRoutePriority` | integer (int32) | The user-defined custom learned route priority for a BGP session. This value is applied to all custom learned route ranges for the session. You can choose a value from `0` to `65335`. If you don't provide a value, Google Cloud assigns a priority of `100` to the ranges. |
| `enable` | string enum | The status of the BGP peer connection. If set to FALSE, any active session with the peer is terminated and all associated routing information is removed. If set to TRUE, the peer connection can be established with routing information. The default is TRUE. Values: `FALSE`, `TRUE`. |
| `enableIpv4` | boolean | Enable IPv4 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 4. |
| `enableIpv6` | boolean | Enable IPv6 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 6. |
| `exportPolicies` | array<string> | List of export policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_EXPORT type. |
| `importPolicies` | array<string> | List of import policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_IMPORT type. |
| `interfaceName` | string | Name of the interface the BGP peer is associated with. |
| `ipAddress` | string | IP address of the interface inside Google Cloud Platform. |
| `ipv4NexthopAddress` | string | IPv4 address of the interface inside Google Cloud Platform. |
| `ipv6NexthopAddress` | string | IPv6 address of the interface inside Google Cloud Platform. |
| `managementType` | string enum | Output only. \[Output Only\] The resource that configures and manages this BGP peer. - MANAGED_BY_USER is the default value and can be managed by you or other users - MANAGED_BY_ATTACHMENT is a BGP peer that is configured and managed by Cloud Interconnect, specifically by an InterconnectAttachment of type PARTNER. Google automatically creates, updates, and deletes this type of BGP peer when the PARTNER InterconnectAttachment is created, updated, or deleted. Values: `MANAGED_BY_ATTACHMENT`, `MANAGED_BY_USER`. |
| `md5AuthenticationKeyName` | string | Present if MD5 authentication is enabled for the peering. Must be the name of one of the entries in the Router.md5_authentication_keys. The field must comply with RFC1035. |
| `name` | string | Name of this BGP peer. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `peerAsn` | integer (uint32) | Peer BGP Autonomous System Number (ASN). Each BGP interface may use a different value. |
| `peerIpAddress` | string | IP address of the BGP interface outside Google Cloud Platform. |
| `peerIpv4NexthopAddress` | string | IPv4 address of the BGP interface outside Google Cloud Platform. |
| `peerIpv6NexthopAddress` | string | IPv6 address of the BGP interface outside Google Cloud Platform. |
| `routerApplianceInstance` | string | URI of the VM instance that is used as third-party router appliances such as Next Gen Firewalls, Virtual Routers, or Router Appliances. The VM instance must be located in zones contained in the same region as this Cloud Router. The VM instance is the peer side of the BGP session. |

### `RouterBgpPeer` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `advertiseMode` | string enum | User-specified flag to indicate which mode to use for advertisement. Values: `CUSTOM`, `DEFAULT`. |
| `advertisedGroups` | array<string> | User-specified list of prefix groups to advertise in custom mode, which currently supports the following option: - ALL_SUBNETS: Advertises all of the router's own VPC subnets. This excludes any routes learned for subnets that use VPC Network Peering. Note that this field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These groups are advertised in addition to any specified prefixes. Leave this field blank to advertise no custom groups. Values: `ALL_SUBNETS`. |
| `advertisedIpRanges` | array<RouterAdvertisedIpRange> | User-specified list of individual IP ranges to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These IP ranges are advertised in addition to any specified groups. Leave this field blank to advertise no custom IP ranges. |
| `advertisedRoutePriority` | integer (uint32) | The priority of routes advertised to this BGP peer. Where there is more than one matching route of maximum length, the routes with the lowest priority value win. |
| `bfd` | RouterBgpPeerBfd | BFD configuration for the BGP peering. |
| `customLearnedIpRanges` | array<RouterBgpPeerCustomLearnedIpRange> | A list of user-defined custom learned route IP address ranges for a BGP session. |
| `customLearnedRoutePriority` | integer (int32) | The user-defined custom learned route priority for a BGP session. This value is applied to all custom learned route ranges for the session. You can choose a value from `0` to `65335`. If you don't provide a value, Google Cloud assigns a priority of `100` to the ranges. |
| `enable` | string enum | The status of the BGP peer connection. If set to FALSE, any active session with the peer is terminated and all associated routing information is removed. If set to TRUE, the peer connection can be established with routing information. The default is TRUE. Values: `FALSE`, `TRUE`. |
| `enableIpv4` | boolean | Enable IPv4 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 4. |
| `enableIpv6` | boolean | Enable IPv6 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 6. |
| `exportPolicies` | array<string> | List of export policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_EXPORT type. |
| `importPolicies` | array<string> | List of import policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_IMPORT type. |
| `interfaceName` | string | Name of the interface the BGP peer is associated with. |
| `ipAddress` | string | IP address of the interface inside Google Cloud Platform. |
| `ipv4NexthopAddress` | string | IPv4 address of the interface inside Google Cloud Platform. |
| `ipv6NexthopAddress` | string | IPv6 address of the interface inside Google Cloud Platform. |
| `linkedCustomHardware` | string | The linked custom hardware resource. The URI of the custom hardware link attachment is where you will establish the BGP session from the Cloud Router. This link attachment must reside in the same subnetwork as the associated router interface. |
| `managementType` | string enum | Output only. \[Output Only\] The resource that configures and manages this BGP peer. - MANAGED_BY_USER is the default value and can be managed by you or other users - MANAGED_BY_ATTACHMENT is a BGP peer that is configured and managed by Cloud Interconnect, specifically by an InterconnectAttachment of type PARTNER. Google automatically creates, updates, and deletes this type of BGP peer when the PARTNER InterconnectAttachment is created, updated, or deleted. Values: `MANAGED_BY_ATTACHMENT`, `MANAGED_BY_USER`. |
| `md5AuthenticationKeyName` | string | Present if MD5 authentication is enabled for the peering. Must be the name of one of the entries in the Router.md5_authentication_keys. The field must comply with RFC1035. |
| `name` | string | Name of this BGP peer. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `peerAsn` | integer (uint32) | Peer BGP Autonomous System Number (ASN). Each BGP interface may use a different value. |
| `peerIpAddress` | string | IP address of the BGP interface outside Google Cloud Platform. |
| `peerIpv4NexthopAddress` | string | IPv4 address of the BGP interface outside Google Cloud Platform. |
| `peerIpv6NexthopAddress` | string | IPv6 address of the BGP interface outside Google Cloud Platform. |
| `routerApplianceInstance` | string | URI of the VM instance that is used as third-party router appliances such as Next Gen Firewalls, Virtual Routers, or Router Appliances. The VM instance must be located in zones contained in the same region as this Cloud Router. The VM instance is the peer side of the BGP session. |

### `RouterBgpPeerBfd`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minReceiveInterval` | integer (uint32) | The minimum interval, in milliseconds, between BFD control packets received from the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the transmit interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000. |
| `minTransmitInterval` | integer (uint32) | The minimum interval, in milliseconds, between BFD control packets transmitted to the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the corresponding receive interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000. |
| `multiplier` | integer (uint32) | The number of consecutive BFD packets that must be missed before BFD declares that a peer is unavailable. If set, the value must be a value between 5 and 16. The default is 5. |
| `sessionInitializationMode` | string enum | The BFD session initialization mode for this BGP peer. If set to ACTIVE, the Cloud Router will initiate the BFD session for this BGP peer. If set to PASSIVE, the Cloud Router will wait for the peer router to initiate the BFD session for this BGP peer. If set to DISABLED, BFD is disabled for this BGP peer. The default is DISABLED. Values: `ACTIVE`, `DISABLED`, `PASSIVE`. |

### `RouterBgpPeerBfd` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `minReceiveInterval` | integer (uint32) | The minimum interval, in milliseconds, between BFD control packets received from the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the transmit interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000. |
| `minTransmitInterval` | integer (uint32) | The minimum interval, in milliseconds, between BFD control packets transmitted to the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the corresponding receive interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000. |
| `mode` | string enum | The BFD session initialization mode for this BGP peer. If set to ACTIVE, the Cloud Router will initiate the BFD session for this BGP peer. If set to PASSIVE, the Cloud Router will wait for the peer router to initiate the BFD session for this BGP peer. If set to DISABLED, BFD is disabled for this BGP peer. The default is PASSIVE. Values: `ACTIVE`, `DISABLED`, `PASSIVE`. |
| `multiplier` | integer (uint32) | The number of consecutive BFD packets that must be missed before BFD declares that a peer is unavailable. If set, the value must be a value between 5 and 16. The default is 5. |
| `packetMode` | string enum | The BFD packet mode for this BGP peer. If set to CONTROL_AND_ECHO, BFD echo mode is enabled for this BGP peer. In this mode, if the peer router also has BFD echo mode enabled, BFD echo packets will be sent to the other router. If the peer router does not have BFD echo mode enabled, only control packets will be sent. If set to CONTROL_ONLY, BFD echo mode is disabled for this BGP peer. If this router and the peer router have a multihop connection, this should be set to CONTROL_ONLY as BFD echo mode is only supported on singlehop connections. The default is CONTROL_AND_ECHO. Values: `CONTROL_AND_ECHO`, `CONTROL_ONLY`. |
| `sessionInitializationMode` | string enum | The BFD session initialization mode for this BGP peer. If set to ACTIVE, the Cloud Router will initiate the BFD session for this BGP peer. If set to PASSIVE, the Cloud Router will wait for the peer router to initiate the BFD session for this BGP peer. If set to DISABLED, BFD is disabled for this BGP peer. The default is DISABLED. Values: `ACTIVE`, `DISABLED`, `PASSIVE`. |
| `slowTimerInterval` | integer (uint32) | The minimum interval, in milliseconds, between BFD control packets transmitted to and received from the peer router when BFD echo mode is enabled on both routers. The actual transmit and receive intervals are negotiated between the two routers and are equal to the greater of this value and the corresponding interval on the other router. If set, this value must be between 1000 and 30000. The default is 5000. |

### `RouterBgpPeerCustomLearnedIpRange`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `range` | string | The custom learned route IP address range. Must be a valid CIDR-formatted prefix. If an IP address is provided without a subnet mask, it is interpreted as, for IPv4, a `/32` singular IP address range, and, for IPv6, `/128`. |

### `RouterInterface`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipRange` | string | IP address and range of the interface. - For Internet Protocol version 4 (IPv4), the IP range must be in theRFC3927 link-local IP address space. The value must be a CIDR-formatted string, for example, 169.254.0.1/30. Note: Do not truncate the IP address, as it represents the IP address of the interface. - For Internet Protocol version 6 (IPv6), the value must be a unique local address (ULA) range from fdff:1::/64 with a mask length of 126 or less. This value should be a CIDR-formatted string, for example, fdff:1::1/112. Within the router's VPC, this IPv6 prefix will be reserved exclusively for this connection and cannot be used for any other purpose. |
| `ipVersion` | string enum | IP version of this interface. Values: `IPV4`, `IPV6`. |
| `linkedInterconnectAttachment` | string | URI of the linked Interconnect attachment. It must be in the same region as the router. Each interface can have one linked resource, which can be a VPN tunnel, an Interconnect attachment, or a subnetwork. |
| `linkedVpnTunnel` | string | URI of the linked VPN tunnel, which must be in the same region as the router. Each interface can have one linked resource, which can be a VPN tunnel, an Interconnect attachment, or a subnetwork. |
| `managementType` | string enum | Output only. \[Output Only\] The resource that configures and manages this interface. - MANAGED_BY_USER is the default value and can be managed directly by users. - MANAGED_BY_ATTACHMENT is an interface that is configured and managed by Cloud Interconnect, specifically, by an InterconnectAttachment of type PARTNER. Google automatically creates, updates, and deletes this type of interface when the PARTNER InterconnectAttachment is created, updated, or deleted. Values: `MANAGED_BY_ATTACHMENT`, `MANAGED_BY_USER`. |
| `name` | string | Name of this interface entry. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `privateIpAddress` | string | The regional private internal IP address that is used to establish BGP sessions to a VM instance acting as a third-party Router Appliance, such as a Next Gen Firewall, a Virtual Router, or an SD-WAN VM. |
| `redundantInterface` | string | Name of the interface that will be redundant with the current interface you are creating. The redundantInterface must belong to the same Cloud Router as the interface here. To establish the BGP session to a Router Appliance VM, you must create two BGP peers. The two BGP peers must be attached to two separate interfaces that are redundant with each other. The redundant_interface must be 1-63 characters long, and comply withRFC1035. Specifically, the redundant_interface must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `subnetwork` | string | The URI of the subnetwork resource that this interface belongs to, which must be in the same region as the Cloud Router. When you establish a BGP session to a VM instance using this interface, the VM instance must belong to the same subnetwork as the subnetwork specified here. |

### `RouterList`

- Contains a list of Router resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | array<Router> | A list of Router resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Always compute#router for routers. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RouterMd5AuthenticationKey`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | \[Input only\] Value of the key. For patch and update calls, it can be skipped to copy the value from the previous configuration. This is allowed if the key with the same name existed before the operation. Maximum length is 80 characters. Can only contain printable ASCII characters. |
| `name` | string | Name used to identify the key. Must be unique within a router. Must be referenced by exactly one bgpPeer. Must comply withRFC1035. |

### `RouterNat`

- Represents a Nat resource. It enables the VMs within the specified subnetworks to access Internet without external IP addresses. It specifies a list of subnetworks (and the ranges within) that want to use NAT. Customers can also provide the external IPs that would be used for NAT. GCP would auto-allocate ephemeral IPs if no external IPs are provided.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoNetworkTier` | string enum | The network tier to use when automatically reserving NAT IP addresses. Must be one of: PREMIUM, STANDARD. If not specified, then the current project-level default tier is used. Values: `FIXED_STANDARD`, `PREMIUM`, `STANDARD`, `STANDARD_OVERRIDES_FIXED_STANDARD`. |
| `drainNatIps` | array<string> | A list of URLs of the IP resources to be drained. These IPs must be valid static external IPs that have been assigned to the NAT. These IPs should be used for updating/patching a NAT only. |
| `effectiveTcpTimeWaitTimeoutSec` | integer (int32) | Output only. Effective timeout (in seconds) for TCP connections that are in TIME_WAIT state. This value is equal to tcp_time_wait_timeout_sec. If tcp_time_wait_timeout_sec isn't set, the effective timeout is 30s or 120s. The field is output only. |
| `enableDynamicPortAllocation` | boolean | Enable Dynamic Port Allocation. If not specified, it is disabled by default. If set to true, - Dynamic Port Allocation will be enabled on this NAT config. - enableEndpointIndependentMapping cannot be set to true. - If minPorts is set, minPortsPerVm must be set to a power of two greater than or equal to 32. If minPortsPerVm is not set, a minimum of 32 ports will be allocated to a VM from this NAT config. |
| `enableEndpointIndependentMapping` | boolean | — |
| `endpointTypes` | array<string> | List of NAT-ted endpoint types supported by the Nat Gateway. If the list is empty, then it will be equivalent to include ENDPOINT_TYPE_VM Values: `ENDPOINT_TYPE_MANAGED_PROXY_LB`, `ENDPOINT_TYPE_SWG`, `ENDPOINT_TYPE_VM`. |
| `icmpIdleTimeoutSec` | integer (int32) | Timeout (in seconds) for ICMP connections. Defaults to 30s if not set. |
| `logConfig` | RouterNatLogConfig | Configure logging on this NAT. |
| `maxPortsPerVm` | integer (int32) | Maximum number of ports allocated to a VM from this NAT config when Dynamic Port Allocation is enabled. If Dynamic Port Allocation is not enabled, this field has no effect. If Dynamic Port Allocation is enabled, and this field is set, it must be set to a power of two greater than minPortsPerVm, or 64 if minPortsPerVm is not set. If Dynamic Port Allocation is enabled and this field is not set, a maximum of 65536 ports will be allocated to a VM from this NAT config. |
| `minPortsPerVm` | integer (int32) | Minimum number of ports allocated to a VM from this NAT config. If not set, a default number of ports is allocated to a VM. This is rounded up to the nearest power of 2. For example, if the value of this field is 50, at least 64 ports are allocated to a VM. |
| `name` | string | Unique name of this Nat service. The name must be 1-63 characters long and comply withRFC1035. |
| `nat64Subnetworks` | array<RouterNatSubnetworkToNat64> | List of Subnetwork resources whose traffic should be translated by NAT64 Gateway. It is used only when LIST_OF_IPV6_SUBNETWORKS is selected for the SubnetworkIpRangeToNat64Option above. |
| `natIpAllocateOption` | string enum | Specify the NatIpAllocateOption, which can take one of the following values: - MANUAL_ONLY: Uses only Nat IP addresses provided by customers. When there are not enough specified Nat IPs, the Nat service fails for new VMs. - AUTO_ONLY: Nat IPs are allocated by Google Cloud Platform; customers can't specify any Nat IPs. When choosing AUTO_ONLY, then nat_ip should be empty. Values: `AUTO_ONLY`, `MANUAL_ONLY`. |
| `natIps` | array<string> | A list of URLs of the IP resources used for this Nat service. These IP addresses must be valid static external IP addresses assigned to the project. |
| `rules` | array<RouterNatRule> | A list of rules associated with this NAT. |
| `sourceSubnetworkIpRangesToNat` | string enum | Specify the Nat option, which can take one of the following values: - ALL_SUBNETWORKS_ALL_IP_RANGES: All of the IP ranges in every Subnetwork are allowed to Nat. - ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES: All of the primary IP ranges in every Subnetwork are allowed to Nat. - LIST_OF_SUBNETWORKS: A list of Subnetworks are allowed to Nat (specified in the field subnetwork below) The default is SUBNETWORK_IP_RANGE_TO_NAT_OPTION_UNSPECIFIED. Note that if this field contains ALL_SUBNETWORKS_ALL_IP_RANGES then there should not be any other Router.Nat section in any Router for this network in this region. Values: `ALL_SUBNETWORKS_ALL_IP_RANGES`, `ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES`, `LIST_OF_SUBNETWORKS`. |
| `sourceSubnetworkIpRangesToNat64` | string enum | Specify the Nat option for NAT64, which can take one of the following values: - ALL_IPV6_SUBNETWORKS: All of the IP ranges in every Subnetwork are allowed to Nat. - LIST_OF_IPV6_SUBNETWORKS: A list of Subnetworks are allowed to Nat (specified in the field nat64_subnetwork below) The default is NAT64_OPTION_UNSPECIFIED. Note that if this field contains NAT64_ALL_V6_SUBNETWORKS no other Router.Nat section in this region can also enable NAT64 for any Subnetworks in this network. Other Router.Nat sections can still be present to enable NAT44 only. Values: `ALL_IPV6_SUBNETWORKS`, `LIST_OF_IPV6_SUBNETWORKS`. |
| `subnetworks` | array<RouterNatSubnetworkToNat> | A list of Subnetwork resources whose traffic should be translated by NAT Gateway. It is used only when LIST_OF_SUBNETWORKS is selected for the SubnetworkIpRangeToNatOption above. |
| `tcpEstablishedIdleTimeoutSec` | integer (int32) | Timeout (in seconds) for TCP established connections. Defaults to 1200s if not set. |
| `tcpTimeWaitTimeoutSec` | integer (int32) | Timeout (in seconds) for TCP connections that are in TIME_WAIT state. Defaults to 120s if not set. |
| `tcpTransitoryIdleTimeoutSec` | integer (int32) | Timeout (in seconds) for TCP transitory connections. Defaults to 30s if not set. |
| `type` | string enum | Indicates whether this NAT is used for public or private IP translation. If unspecified, it defaults to PUBLIC. Values: `PRIVATE`, `PUBLIC`. |
| `udpIdleTimeoutSec` | integer (int32) | Timeout (in seconds) for UDP connections. Defaults to 30s if not set. |

### `RouterNatLogConfig`

- Configuration of logging on a NAT.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | Indicates whether or not to export logs. This is false by default. |
| `filter` | string enum | Specify the desired filtering of logs on this NAT. If unspecified, logs are exported for all connections handled by this NAT. This option can take one of the following values: - ERRORS_ONLY: Export logs only for connection failures. - TRANSLATIONS_ONLY: Export logs only for successful connections. - ALL: Export logs for all connections, successful and unsuccessful. Values: `ALL`, `ERRORS_ONLY`, `TRANSLATIONS_ONLY`. |

### `RouterNatRule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | RouterNatRuleAction | The action to be enforced for traffic that matches this rule. |
| `description` | string | An optional description of this rule. |
| `match` | string | CEL expression that specifies the match condition that egress traffic from a VM is evaluated against. If it evaluates to true, the corresponding `action` is enforced. The following examples are valid match expressions for public NAT: `inIpRange(destination.ip, '1.1.0.0/16') \|\| inIpRange(destination.ip, '2.2.0.0/16')` `destination.ip == '1.1.0.1' \|\| destination.ip == '8.8.8.8'` The following examples are valid match expressions for private NAT: (NAT 44) `nexthop.hub == '//networkconnectivity.googleapis.com/projects/my-project/locations/global/hubs/hub-1'` `nexthop.is_hybrid` (NAT 64) `isIPv6(source.ip)` |
| `ruleNumber` | integer (uint32) | An integer uniquely identifying a rule in the list. The rule number must be a positive value between 0 and 65000, and must be unique among rules within a NAT. |

### `RouterNatRule` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `action` | RouterNatRuleAction | The action to be enforced for traffic that matches this rule. |
| `description` | string | An optional description of this rule. |
| `match` | string | CEL expression that specifies the match condition that egress traffic from a VM is evaluated against. If it evaluates to true, the corresponding `action` is enforced. The following examples are valid match expressions for public NAT: `inIpRange(destination.ip, '1.1.0.0/16') \|\| inIpRange(destination.ip, '2.2.0.0/16')` `destination.ip == '1.1.0.1' \|\| destination.ip == '8.8.8.8'` The following examples are valid match expressions for private NAT: (NAT 44) `nexthop.hub == '//networkconnectivity.googleapis.com/projects/my-project/locations/global/hubs/hub-1'` `nexthop.is_hybrid` (NAT 64) `isIPv6(source.ip)` |
| `ruleNumber` | integer (uint32) | An integer uniquely identifying a rule in the list. The rule number must be a positive value between 0 and 65000, and must be unique among rules within a NAT. |
| `sourceWorkloadIdentities` | array<string> | A list of source workload identities. |

### `RouterNatRuleAction`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceNatActiveIps` | array<string> | A list of URLs of the IP resources used for this NAT rule. These IP addresses must be valid static external IP addresses assigned to the project. This field is used for public NAT. |
| `sourceNatActiveRanges` | array<string> | A list of URLs of the subnetworks used as source ranges for this NAT Rule. These subnetworks must have purpose set to PRIVATE_NAT. This field is used for private NAT. |
| `sourceNatDrainIps` | array<string> | A list of URLs of the IP resources to be drained. These IPs must be valid static external IPs that have been assigned to the NAT. These IPs should be used for updating/patching a NAT rule only. This field is used for public NAT. |
| `sourceNatDrainRanges` | array<string> | A list of URLs of subnetworks representing source ranges to be drained. This is only supported on patch/update, and these subnetworks must have previously been used as active ranges in this NAT Rule. This field is used for private NAT. |

### `RouterNatSubnetworkToNat`

- Defines the IP ranges that want to use NAT for a subnetwork.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | URL for the subnetwork resource that will use NAT. |
| `secondaryIpRangeNames` | array<string> | A list of the secondary ranges of the Subnetwork that are allowed to use NAT. This can be populated only if "LIST_OF_SECONDARY_IP_RANGES" is one of the values in source_ip_ranges_to_nat. |
| `sourceIpRangesToNat` | array<string> | Specify the options for NAT ranges in the Subnetwork. All options of a single value are valid except NAT_IP_RANGE_OPTION_UNSPECIFIED. The only valid option with multiple values is: \["PRIMARY_IP_RANGE", "LIST_OF_SECONDARY_IP_RANGES"\] Default: \[ALL_IP_RANGES\] Values: `ALL_IP_RANGES`, `LIST_OF_SECONDARY_IP_RANGES`, `PRIMARY_IP_RANGE`. |

### `RouterNatSubnetworkToNat64`

- Specifies a subnetwork to enable NAT64.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | URL for the subnetwork resource that will use NAT64. |

### `RouterParams`

- Additional router parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceManagerTags` | object | Tag keys/values directly bound to this resource. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID { : } or Namespaced format { : }. For example the following are valid inputs: \* {"tagKeys/333" : "tagValues/444", "tagKeys/123" : "tagValues/456"} \* {"123/environment" : "production", "345/abc" : "xyz"} Note: \* Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment" : "tagValues/444"} is invalid. \* Inconsistent format is not supported. For instance: {"tagKeys/333" : "tagValues/444", "123/env" : "prod"} is invalid. |

### `RouterStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bestRoutes` | array<Route> | A list of the best dynamic routes for this Cloud Router's Virtual Private Cloud (VPC) network in the same region as this Cloud Router. Lists all of the best routes per prefix that are programmed into this region's VPC data plane. When global dynamic routing mode is turned on in the VPC network, this list can include cross-region dynamic routes from Cloud Routers in other regions. |
| `bestRoutesForRouter` | array<Route> | A list of the best BGP routes learned by this Cloud Router. It is possible that routes listed might not be programmed into the data plane, if the Google Cloud control plane finds a more optimal route for a prefix than a route learned by this Cloud Router. |
| `bgpPeerStatus` | array<RouterStatusBgpPeerStatus> | — |
| `natStatus` | array<RouterStatusNatStatus> | — |
| `nccGateway` | string | URI of the ncc_gateway to which this router associated. |
| `network` | string | URI of the network to which this router belongs. |

### `RouterStatusBgpPeerStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `advertisedRoutes` | array<Route> | Routes that were advertised to the remote BGP peer |
| `bfdStatus` | BfdStatus | — |
| `depreferenced` | boolean | Output only. \[Output Only\] Indicates whether the BGP peer is in a depreferenced state. |
| `enableIpv4` | boolean | Output only. Enable IPv4 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 4. |
| `enableIpv6` | boolean | Output only. Enable IPv6 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 6. |
| `ipAddress` | string | Output only. IP address of the local BGP interface. |
| `ipv4NexthopAddress` | string | Output only. IPv4 address of the local BGP interface. |
| `ipv6NexthopAddress` | string | Output only. IPv6 address of the local BGP interface. |
| `linkedVpnTunnel` | string | Output only. URL of the VPN tunnel that this BGP peer controls. |
| `md5AuthEnabled` | boolean | Informs whether MD5 authentication is enabled on this BGP peer. |
| `name` | string | Output only. Name of this BGP peer. Unique within the Routers resource. |
| `numLearnedRoutes` | integer (uint32) | Output only. Number of routes learned from the remote BGP Peer. |
| `peerIpAddress` | string | Output only. IP address of the remote BGP interface. |
| `peerIpv4NexthopAddress` | string | Output only. IPv4 address of the remote BGP interface. |
| `peerIpv6NexthopAddress` | string | Output only. IPv6 address of the remote BGP interface. |
| `routerApplianceInstance` | string | Output only. \[Output only\] URI of the VM instance that is used as third-party router appliances such as Next Gen Firewalls, Virtual Routers, or Router Appliances. The VM instance is the peer side of the BGP session. |
| `state` | string | Output only. The state of the BGP session. For a list of possible values for this field, seeBGP session states. |
| `status` | string enum | Output only. Status of the BGP peer: {UP, DOWN} Values: `DOWN`, `UNKNOWN`, `UP`. |
| `statusReason` | string enum | Indicates why particular status was returned. Values: `IPV4_PEER_ON_IPV6_ONLY_CONNECTION`, `IPV6_PEER_ON_IPV4_ONLY_CONNECTION`, `MD5_AUTH_INTERNAL_PROBLEM`, `STATUS_REASON_UNSPECIFIED`. |
| `uptime` | string | Output only. Time this session has been up. Format: 14 years, 51 weeks, 6 days, 23 hours, 59 minutes, 59 seconds |
| `uptimeSeconds` | string | Output only. Time this session has been up, in seconds. Format: 145 |

### `RouterStatusBgpPeerStatus` (beta)

-
- Version: beta

| Field | Type | Description |
|---|---|---|
| `advertisedRoutes` | array<Route> | Routes that were advertised to the remote BGP peer |
| `bfdStatus` | BfdStatus | — |
| `depreferenced` | boolean | Output only. \[Output Only\] Indicates whether the BGP peer is in a depreferenced state. |
| `enableIpv4` | boolean | Output only. Enable IPv4 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 4. |
| `enableIpv6` | boolean | Output only. Enable IPv6 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 6. |
| `ipAddress` | string | Output only. IP address of the local BGP interface. |
| `ipv4NexthopAddress` | string | Output only. IPv4 address of the local BGP interface. |
| `ipv6NexthopAddress` | string | Output only. IPv6 address of the local BGP interface. |
| `linkedCustomHardware` | string | Output only. The URI of the linked custom hardware resource, CustomHardwareLinkAttachment. This CustomHardwareLinkAttachment resource is the one that will establish the BGP session from the Cloud Router. |
| `linkedVpnTunnel` | string | Output only. URL of the VPN tunnel that this BGP peer controls. |
| `md5AuthEnabled` | boolean | Informs whether MD5 authentication is enabled on this BGP peer. |
| `name` | string | Output only. Name of this BGP peer. Unique within the Routers resource. |
| `numLearnedRoutes` | integer (uint32) | Output only. Number of routes learned from the remote BGP Peer. |
| `peerIpAddress` | string | Output only. IP address of the remote BGP interface. |
| `peerIpv4NexthopAddress` | string | Output only. IPv4 address of the remote BGP interface. |
| `peerIpv6NexthopAddress` | string | Output only. IPv6 address of the remote BGP interface. |
| `routerApplianceInstance` | string | Output only. \[Output only\] URI of the VM instance that is used as third-party router appliances such as Next Gen Firewalls, Virtual Routers, or Router Appliances. The VM instance is the peer side of the BGP session. |
| `state` | string | Output only. The state of the BGP session. For a list of possible values for this field, seeBGP session states. |
| `status` | string enum | Output only. Status of the BGP peer: {UP, DOWN} Values: `DOWN`, `UNKNOWN`, `UP`. |
| `statusReason` | string enum | Indicates why particular status was returned. Values: `IPV4_PEER_ON_IPV6_ONLY_CONNECTION`, `IPV6_PEER_ON_IPV4_ONLY_CONNECTION`, `MD5_AUTH_INTERNAL_PROBLEM`, `STATUS_REASON_UNSPECIFIED`. |
| `uptime` | string | Output only. Time this session has been up. Format: 14 years, 51 weeks, 6 days, 23 hours, 59 minutes, 59 seconds |
| `uptimeSeconds` | string | Output only. Time this session has been up, in seconds. Format: 145 |

### `RouterStatusNatStatus`

- Status of a NAT contained in this router.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoAllocatedNatIps` | array<string> | Output only. A list of IPs auto-allocated for NAT. Example: \["1.1.1.1", "129.2.16.89"\] |
| `drainAutoAllocatedNatIps` | array<string> | Output only. A list of IPs auto-allocated for NAT that are in drain mode. Example: \["1.1.1.1", "179.12.26.133"\]. |
| `drainUserAllocatedNatIps` | array<string> | Output only. A list of IPs user-allocated for NAT that are in drain mode. Example: \["1.1.1.1", "179.12.26.133"\]. |
| `minExtraNatIpsNeeded` | integer (int32) | Output only. The number of extra IPs to allocate. This will be greater than 0 only if user-specified IPs are NOT enough to allow all configured VMs to use NAT. This value is meaningful only when auto-allocation of NAT IPs is \*not\* used. |
| `name` | string | Output only. Unique name of this NAT. |
| `numVmEndpointsWithNatMappings` | integer (int32) | Output only. Number of VM endpoints (i.e., Nics) that can use NAT. |
| `ruleStatus` | array<RouterStatusNatStatusNatRuleStatus> | Status of rules in this NAT. |
| `userAllocatedNatIpResources` | array<string> | Output only. A list of fully qualified URLs of reserved IP address resources. |
| `userAllocatedNatIps` | array<string> | Output only. A list of IPs user-allocated for NAT. They will be raw IP strings like "179.12.26.133". |

### `RouterStatusNatStatusNatRuleStatus`

- Status of a NAT Rule contained in this NAT.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeNatIps` | array<string> | Output only. A list of active IPs for NAT. Example: \["1.1.1.1", "179.12.26.133"\]. |
| `drainNatIps` | array<string> | Output only. A list of IPs for NAT that are in drain mode. Example: \["1.1.1.1", "179.12.26.133"\]. |
| `minExtraIpsNeeded` | integer (int32) | Output only. The number of extra IPs to allocate. This will be greater than 0 only if the existing IPs in this NAT Rule are NOT enough to allow all configured VMs to use NAT. |
| `numVmEndpointsWithNatMappings` | integer (int32) | Output only. Number of VM endpoints (i.e., NICs) that have NAT Mappings from this NAT Rule. |
| `ruleNumber` | integer (int32) | Output only. Rule number of the rule. |

### `RouterStatusResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Output only. Type of resource. |
| `result` | RouterStatus | — |

### `RoutersGetNamedSetResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | end_interface: MixerGetResponseWithEtagBuilder |
| `resource` | NamedSet | — |

### `RoutersGetRoutePolicyResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | RoutePolicy | — |

### `RoutersGetRoutePolicyResponse` (alpha)

-
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `etag` | string | end_interface: MixerGetResponseWithEtagBuilder |
| `resource` | RoutePolicy | — |

### `RoutersListBgpRoutes`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#routersListBgpRoutes for lists of bgp routes. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `result` | array<BgpRoute> | \[Output Only\] A list of bgp routes. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RoutersListNamedSets`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#routersListNamedSets for lists of named sets. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `result` | array<NamedSet> | \[Output Only\] A list of named sets. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RoutersListRoutePolicies`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#routersListRoutePolicies for lists of route policies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `result` | array<RoutePolicy> | \[Output Only\] A list of route policies. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `RoutersPreviewResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | Router | Preview of given router. |

### `RoutersScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `routers` | array<Router> | A list of routers contained in this scope. |
| `warning` | object | Informational warning which replaces the list of routers when the list is empty. |

### `SSLHealthCheck`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `port` | integer (int32) | The TCP port number to which the health check prober sends packets. The default value is 443. Valid values are 1 through65535. |
| `portName` | string | Not supported. |
| `portSpecification` | string enum | Specifies how a port is selected for health checking. Can be one of the following values: USE_FIXED_PORT: Specifies a port number explicitly using theport field in the health check. Supported by backend services for passthrough load balancers and backend services for proxy load balancers. Not supported by target pools. The health check supports all backends supported by the backend service provided the backend can be health checked. For example, GCE_VM_IP network endpoint groups, GCE_VM_IP_PORT network endpoint groups, and instance group backends. USE_NAMED_PORT: Not supported. USE_SERVING_PORT: Provides an indirect method of specifying the health check port by referring to the backend service. Only supported by backend services for proxy load balancers. Not supported by target pools. Not supported by backend services for passthrough load balancers. Supports all backends that can be health checked; for example,GCE_VM_IP_PORT network endpoint groups and instance group backends. For GCE_VM_IP_PORT network endpoint group backends, the health check uses the port number specified for each endpoint in the network endpoint group. For instance group backends, the health check uses the port number determined by looking up the backend service's named port in the instance group's list of named ports. Values: `USE_FIXED_PORT`, `USE_NAMED_PORT`, `USE_SERVING_PORT`. |
| `proxyHeader` | string enum | Specifies the type of proxy header to append before sending data to the backend, either NONE or PROXY_V1. The default is NONE. Values: `NONE`, `PROXY_V1`. |
| `request` | string | Instructs the health check prober to send this exact ASCII string, up to 1024 bytes in length, after establishing the TCP connection and SSL handshake. |
| `response` | string | Creates a content-based SSL health check. In addition to establishing a TCP connection and the TLS handshake, you can configure the health check to pass only when the backend sends this exact response ASCII string, up to 1024 bytes in length. For details, see: https://cloud.google.com/load-balancing/docs/health-check-concepts#criteria-protocol-ssl-tcp |

### `SavedAttachedDisk`

- DEPRECATED: Please use compute#savedDisk instead. An instance-attached disk resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDelete` | boolean | Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance). |
| `boot` | boolean | Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem. |
| `deviceName` | string | Specifies the name of the disk attached to the source instance. |
| `diskEncryptionKey` | CustomerEncryptionKey | The encryption key for the disk. |
| `diskSizeGb` | string (int64) | The size of the disk in base-2 GB. |
| `diskType` | string | Output only. \[Output Only\] URL of the disk type resource. For example:projects/project/zones/zone/diskTypes/pd-standard or pd-ssd |
| `guestOsFeatures` | array<GuestOsFeature> | A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options. |
| `index` | integer (int32) | Output only. Specifies zero-based index of the disk that is attached to the source instance. |
| `interface` | string enum | Specifies the disk interface to use for attaching this disk, which is either SCSI or NVME. Values: `NVME`, `SCSI`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Alwayscompute#attachedDisk for attached disks. |
| `licenses` | array<string> | Output only. \[Output Only\] Any valid publicly visible licenses. |
| `mode` | string enum | The mode in which this disk is attached to the source instance, eitherREAD_WRITE or READ_ONLY. Values: `READ_ONLY`, `READ_WRITE`. |
| `source` | string | Specifies a URL of the disk attached to the source instance. |
| `storageBytes` | string (int64) | Output only. \[Output Only\] A size of the storage used by the disk's snapshot by this machine image. |
| `storageBytesStatus` | string enum | Output only. \[Output Only\] An indicator whether storageBytes is in a stable state or it is being adjusted as a result of shared storage reallocation. This status can either be UPDATING, meaning the size of the snapshot is being updated, or UP_TO_DATE, meaning the size of the snapshot is up-to-date. Values: `UPDATING`, `UP_TO_DATE`. |
| `type` | string enum | Specifies the type of the attached disk, either SCRATCH orPERSISTENT. Values: `PERSISTENT`, `SCRATCH`. |

### `SavedDisk`

- An instance-attached disk resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string enum | Output only. \[Output Only\] The architecture of the attached disk. Values: `ARCHITECTURE_UNSPECIFIED`, `ARM64`, `X86_64`. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#savedDisk for attached disks. |
| `sourceDisk` | string | Output only. Specifies a URL of the disk attached to the source instance. |
| `storageBytes` | string (int64) | Output only. \[Output Only\] Size of the individual disk snapshot used by this machine image. |
| `storageBytesStatus` | string enum | Output only. \[Output Only\] An indicator whether storageBytes is in a stable state or it is being adjusted as a result of shared storage reallocation. This status can either be UPDATING, meaning the size of the snapshot is being updated, or UP_TO_DATE, meaning the size of the snapshot is up-to-date. Values: `UPDATING`, `UP_TO_DATE`. |

### `ScalingScheduleStatus`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastStartTime` | string | \[Output Only\] The last time the scaling schedule became active. Note: this is a timestamp when a schedule actually became active, not when it was planned to do so. The timestamp is in RFC3339 text format. |
| `nextStartTime` | string | \[Output Only\] The next time the scaling schedule is to become active. Note: this is a timestamp when a schedule is planned to run, but the actual time might be slightly different. The timestamp is in RFC3339 text format. |
| `state` | string enum | \[Output Only\] The current state of a scaling schedule. Values: `ACTIVE`, `DISABLED`, `OBSOLETE`, `READY`. |

### `Scheduling`

- Sets the scheduling options for an Instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automaticRestart` | boolean | Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). You can only set the automatic restart option for standard instances.Preemptible instances cannot be automatically restarted. By default, this is set to true so an instance is automatically restarted if it is terminated by Compute Engine. |
| `availabilityDomain` | integer (int32) | Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance. |
| `exposeHostTopology` | boolean | This optional flag exposes the hashed physical host ID in the ResourceStatus resource of the VM. |
| `gracefulShutdown` | SchedulingGracefulShutdown | — |
| `hostErrorTimeoutSeconds` | integer (int32) | Specify the time in seconds for host error detection, the value must be within the range of \[90, 330\] with the increment of 30, if unset, the default behavior of host error recovery will be used. |
| `instanceTerminationAction` | string enum | Specifies the termination action for the instance. Values: `DELETE`, `INSTANCE_TERMINATION_ACTION_UNSPECIFIED`, `STOP`. |
| `localSsdRecoveryTimeout` | Duration | Specifies the maximum amount of time a Local Ssd Vm should wait while recovery of the Local Ssd state is attempted. Its value should be in between 0 and 168 hours with hour granularity and the default value being 1 hour. |
| `locationHint` | string | An opaque location hint used to place the instance close to other resources. This field is for use by internal tools that use the public API. |
| `maxRunDuration` | Duration | Specifies the max run duration for the given instance. If specified, the instance termination action will be performed at the end of the run duration. |
| `minNodeCpus` | integer (int32) | The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. |
| `nodeAffinities` | array<SchedulingNodeAffinity> | A set of node affinity and anti-affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity. |
| `onHostMaintenance` | string enum | Defines the maintenance behavior for this instance. For standard instances, the default behavior is MIGRATE. Forpreemptible instances, the default and only possible behavior is TERMINATE. For more information, see Set VM host maintenance policy. Values: `MIGRATE`, `TERMINATE`. |
| `onInstanceStopAction` | SchedulingOnInstanceStopAction | — |
| `preemptible` | boolean | Defines whether the instance is preemptible. This can only be set during instance creation or while the instance isstopped and therefore, in a `TERMINATED` state. SeeInstance Life Cycle for more information on the possible instance states. |
| `preemptionNoticeDuration` | Duration | Specifies the Metadata Service preemption notice duration before the GCE ACPI G2 Soft Off signal is triggered for Spot VMs only. If not specified, there will be no wait before the G2 Soft Off signal is triggered. |
| `protectionTier` | string enum | Protection tier for the workload which specifies the workload expectations in the event of infrastructure failures at data center (e.g. power and/or cooling failures). Values: `PROTECTION_TIER_CAPACITY_OPTIMIZED`, `PROTECTION_TIER_STANDARD`, `PROTECTION_TIER_UNSPECIFIED`. |
| `provisioningModel` | string enum | Specifies the provisioning model of the instance. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |
| `skipGuestOsShutdown` | boolean | Defines whether GCE ACPI G2 Soft Off signal should be skipped during shutdown operation of VM. Default is false, meaning there will be 120 seconds between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off for Standard VMs and 30 seconds for Spot VMs. |
| `terminationTime` | string | Specifies the timestamp, when the instance will be terminated, inRFC3339 text format. If specified, the instance termination action will be performed at the termination time. |

### `Scheduling` (alpha)

- Sets the scheduling options for an Instance.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `automaticRestart` | boolean | Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). You can only set the automatic restart option for standard instances.Preemptible instances cannot be automatically restarted. By default, this is set to true so an instance is automatically restarted if it is terminated by Compute Engine. |
| `availabilityDomain` | integer (int32) | Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance. |
| `currentCpus` | integer (int32) | Current number of vCPUs available for VM. 0 or unset means default vCPUs of the current machine type. |
| `currentMemoryMb` | string (int64) | Current amount of memory (in MB) available for VM. 0 or unset means default amount of memory of the current machine type. |
| `exposeHostTopology` | boolean | This optional flag exposes the hashed physical host ID in the ResourceStatus resource of the VM. |
| `gracefulShutdown` | SchedulingGracefulShutdown | — |
| `hostErrorTimeoutSeconds` | integer (int32) | Specify the time in seconds for host error detection, the value must be within the range of \[90, 330\] with the increment of 30, if unset, the default behavior of host error recovery will be used. |
| `instanceTerminationAction` | string enum | Specifies the termination action for the instance. Values: `DELETE`, `INSTANCE_TERMINATION_ACTION_UNSPECIFIED`, `STOP`. |
| `latencyTolerant` | boolean | Defines whether the instance is tolerant of higher cpu latency. This can only be set during instance creation, or when the instance is not currently running. It must not be set if thepreemptible option is also set. |
| `localSsdRecoveryTimeout` | Duration | Specifies the maximum amount of time a Local Ssd Vm should wait while recovery of the Local Ssd state is attempted. Its value should be in between 0 and 168 hours with hour granularity and the default value being 1 hour. |
| `locationHint` | string | An opaque location hint used to place the instance close to other resources. This field is for use by internal tools that use the public API. |
| `maintenanceFreezeDurationHours` | integer (int32) | Specifies the number of hours after VM instance creation where the VM won't be scheduled for maintenance. |
| `maintenanceInterval` | string enum | Specifies the frequency of planned maintenance events. The accepted values are: `PERIODIC`. Values: `AS_NEEDED`, `PERIODIC`, `RECURRENT`. |
| `maxRunDuration` | Duration | Specifies the max run duration for the given instance. If specified, the instance termination action will be performed at the end of the run duration. |
| `minNodeCpus` | integer (int32) | The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. |
| `nodeAffinities` | array<SchedulingNodeAffinity> | A set of node affinity and anti-affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity. |
| `onHostMaintenance` | string enum | Defines the maintenance behavior for this instance. For standard instances, the default behavior is MIGRATE. Forpreemptible instances, the default and only possible behavior is TERMINATE. For more information, see Set VM host maintenance policy. Values: `MIGRATE`, `TERMINATE`. |
| `onInstanceStopAction` | SchedulingOnInstanceStopAction | — |
| `preemptible` | boolean | Defines whether the instance is preemptible. This can only be set during instance creation or while the instance isstopped and therefore, in a `TERMINATED` state. SeeInstance Life Cycle for more information on the possible instance states. |
| `preemptionNoticeDuration` | Duration | Specifies the Metadata Service preemption notice duration before the GCE ACPI G2 Soft Off signal is triggered for Spot VMs only. If not specified, there will be no wait before the G2 Soft Off signal is triggered. |
| `provisioningModel` | string enum | Specifies the provisioning model of the instance. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |
| `shutdownTimeout` | Duration | DEPRECATED: please use skipGuestOsShutdown. Timeout between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off during shutdown operation of VM. For Standard VMs values between 0s and 120s are allowed. For Spot and Preemptible VMs supported values are between 0s and 30s. If no value is specified for shutdownDuration, default values are 90s for Standard VMs and 30s for Spot/Preemptible VMs. |
| `skipGuestOsShutdown` | boolean | Defines whether GCE ACPI G2 Soft Off signal should be skipped during shutdown operation of VM. Default is false, meaning there will be 120 seconds between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off for Standard VMs and 30 seconds for Spot VMs. |
| `terminationTime` | string | Specifies the timestamp, when the instance will be terminated, inRFC3339 text format. If specified, the instance termination action will be performed at the termination time. |
| `vsockMode` | SchedulingVsockMode | The vsock mode of the instance. |
| `windowsLicenseOptimizationMode` | string enum | Represents the Windows Server License Optimization Mode of the VM. If unspecified, the default mode is `OFF`. Values: `AUTO`, `BALANCED`, `COST_OPTIMIZED`, `MANAGED`, `OFF`, `PERFORMANCE`, `UNSPECIFIED`. |

### `Scheduling` (beta)

- Sets the scheduling options for an Instance.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `automaticRestart` | boolean | Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). You can only set the automatic restart option for standard instances.Preemptible instances cannot be automatically restarted. By default, this is set to true so an instance is automatically restarted if it is terminated by Compute Engine. |
| `availabilityDomain` | integer (int32) | Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance. |
| `exposeHostTopology` | boolean | This optional flag exposes the hashed physical host ID in the ResourceStatus resource of the VM. |
| `gracefulShutdown` | SchedulingGracefulShutdown | — |
| `hostErrorTimeoutSeconds` | integer (int32) | Specify the time in seconds for host error detection, the value must be within the range of \[90, 330\] with the increment of 30, if unset, the default behavior of host error recovery will be used. |
| `instanceTerminationAction` | string enum | Specifies the termination action for the instance. Values: `DELETE`, `INSTANCE_TERMINATION_ACTION_UNSPECIFIED`, `STOP`. |
| `localSsdRecoveryTimeout` | Duration | Specifies the maximum amount of time a Local Ssd Vm should wait while recovery of the Local Ssd state is attempted. Its value should be in between 0 and 168 hours with hour granularity and the default value being 1 hour. |
| `locationHint` | string | An opaque location hint used to place the instance close to other resources. This field is for use by internal tools that use the public API. |
| `maintenanceFreezeDurationHours` | integer (int32) | Specifies the number of hours after VM instance creation where the VM won't be scheduled for maintenance. |
| `maintenanceInterval` | string enum | Specifies the frequency of planned maintenance events. The accepted values are: `PERIODIC`. Values: `AS_NEEDED`, `PERIODIC`, `RECURRENT`. |
| `maxRunDuration` | Duration | Specifies the max run duration for the given instance. If specified, the instance termination action will be performed at the end of the run duration. |
| `minNodeCpus` | integer (int32) | The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node. |
| `nodeAffinities` | array<SchedulingNodeAffinity> | A set of node affinity and anti-affinity configurations. Refer toConfiguring node affinity for more information. Overrides reservationAffinity. |
| `onHostMaintenance` | string enum | Defines the maintenance behavior for this instance. For standard instances, the default behavior is MIGRATE. Forpreemptible instances, the default and only possible behavior is TERMINATE. For more information, see Set VM host maintenance policy. Values: `MIGRATE`, `TERMINATE`. |
| `onInstanceStopAction` | SchedulingOnInstanceStopAction | — |
| `preemptible` | boolean | Defines whether the instance is preemptible. This can only be set during instance creation or while the instance isstopped and therefore, in a `TERMINATED` state. SeeInstance Life Cycle for more information on the possible instance states. |
| `preemptionNoticeDuration` | Duration | Specifies the Metadata Service preemption notice duration before the GCE ACPI G2 Soft Off signal is triggered for Spot VMs only. If not specified, there will be no wait before the G2 Soft Off signal is triggered. |
| `provisioningModel` | string enum | Specifies the provisioning model of the instance. Values: `FLEX_START`, `RESERVATION_BOUND`, `SPOT`, `STANDARD`. |
| `skipGuestOsShutdown` | boolean | Defines whether GCE ACPI G2 Soft Off signal should be skipped during shutdown operation of VM. Default is false, meaning there will be 120 seconds between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off for Standard VMs and 30 seconds for Spot VMs. |
| `terminationTime` | string | Specifies the timestamp, when the instance will be terminated, inRFC3339 text format. If specified, the instance termination action will be performed at the termination time. |

### `SchedulingGracefulShutdown`

- The configuration for gracefully shutting down the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Opts-in for graceful shutdown. |
| `maxDuration` | Duration | The time allotted for the instance to gracefully shut down. If the graceful shutdown isn't complete after this time, then the instance transitions to the STOPPING state. |

### `SchedulingNodeAffinity`

- Node Affinity: the configuration of desired nodes onto which this Instance could be scheduled.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Corresponds to the label key of Node resource. |
| `operator` | string enum | Defines the operation of node selection. Valid operators areIN for affinity and NOT_IN for anti-affinity. Values: `IN`, `NOT_IN`, `OPERATOR_UNSPECIFIED`. |
| `values` | array<string> | Corresponds to the label values of Node resource. |

### `SchedulingOnInstanceStopAction`

- Defines the behaviour for instances with the instance_termination_actionSTOP.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discardLocalSsd` | boolean | If true, the contents of any attached Local SSD disks will be discarded else, the Local SSD data will be preserved when the instance is stopped at the end of the run duration/termination time. |

### `SchedulingVsockMode`

- Message to control the enablement of the vsock device.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | — Values: `DISABLED`, `ENABLED`, `VSOCK_MODE_UNSPECIFIED`. |

### `Screenshot`

- An instance's screenshot.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contents` | string | \[Output Only\] The Base64-encoded screenshot data. |
| `kind` | string | Output only. \[Output Only\] Type of the resource. Always compute#screenshot for the screenshots. |

### `SdsConfig`

- \[Deprecated\] The configuration to access the SDS server. The configuration to access the SDS server.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `grpcServiceConfig` | GrpcServiceConfig | The configuration to access the SDS server over GRPC. |

### `SecurityPoliciesAggregatedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | — |
| `id` | string | \[Output Only\] Unique identifier for the resource; defined by the server. |
| `items` | object | A list of SecurityPoliciesScopedList resources. |
| `kind` | string | Output only. \[Output Only\] Type of resource. Alwayscompute#securityPolicyAggregatedList for lists of Security Policies. |
| `nextPageToken` | string | \[Output Only\] This token allows you to get the next page of results for list requests. If the number of results is larger thanmaxResults, use the nextPageToken as a value for the query parameter pageToken in the next list request. Subsequent list requests will have their own nextPageToken to continue paging through the results. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for this resource. |
| `unreachables` | array<string> | Output only. \[Output Only\] Unreachable resources. |
| `warning` | object | \[Output Only\] Informational warning message. |

### `SecurityPoliciesListPreconfiguredExpressionSetsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `preconfiguredExpressionSets` | SecurityPoliciesWafConfig | — |

### `SecurityPoliciesScopedList`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `securityPolicies` | array<SecurityPolicy> | A list of SecurityPolicies contained in this scope. |
| `warning` | object | Informational warning which replaces the list of security policies when the list is empty. |

### `SecurityPoliciesWafConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `wafRules` | PreconfiguredWafSet | — |

### `SecurityPolicy`

- Represents a Google Cloud Armor security policy resource. Only external backend services that use load balancers can reference a security policy. For more information, see Google Cloud Armor security policy overview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adaptiveProtectionConfig` | SecurityPolicyAdaptiveProtectionConfig | — |
| `advancedOptionsConfig` | SecurityPolicyAdvancedOptionsConfig | — |
| `associations` | array<SecurityPolicyAssociation> | A list of associations that belong to this policy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `ddosProtectionConfig` | SecurityPolicyDdosProtectionConfig | — |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the security policy. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#securityPolicyfor security policies |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this security policy, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the security policy. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `parent` | string | Output only. \[Output Only\] The parent of the security policy. |
| `recaptchaOptionsConfig` | SecurityPolicyRecaptchaOptionsConfig | — |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional security policy resides. This field is not applicable to global security policies. |
| `rules` | array<SecurityPolicyRule> | A list of rules that belong to this policy. There must always be a default rule which is a rule with priority 2147483647 and match all condition (for the match condition this means match "\*" for srcIpRanges and for the networkMatch condition every field must be either match "\*" or not set). If no rules are provided when creating a security policy, a default rule with action "allow" will be added. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `shortName` | string | User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is CLOUD_ARMOR. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `type` | string enum | The type indicates the intended use of the security policy. - CLOUD_ARMOR: Cloud Armor backend security policies can be configured to filter incoming HTTP requests targeting backend services. They filter requests before they hit the origin servers. - CLOUD_ARMOR_EDGE: Cloud Armor edge security policies can be configured to filter incoming HTTP requests targeting backend services (including Cloud CDN-enabled) as well as backend buckets (Cloud Storage). They filter requests before the request is served from Google's cache. - CLOUD_ARMOR_INTERNAL_SERVICE (preview only): Cloud Armor internal service policies can be configured to filter HTTP requests targeting services managed by Traffic Director in a service mesh. They filter requests before the request is served from the application. - CLOUD_ARMOR_NETWORK: Cloud Armor network policies can be configured to filter packets targeting network load balancing resources such as backend services, target pools, target instances, and instances with external IPs. They filter requests before the request is served from the application. This field can be set only at resource creation time. Values: `CLOUD_ARMOR`, `CLOUD_ARMOR_EDGE`, `CLOUD_ARMOR_NETWORK`. |
| `userDefinedFields` | array<SecurityPolicyUserDefinedField> | Definitions of user-defined fields for CLOUD_ARMOR_NETWORK policies. A user-defined field consists of up to 4 bytes extracted from a fixed offset in the packet, relative to the IPv4, IPv6, TCP, or UDP header, with an optional mask to select certain bits. Rules may then specify matching values for these fields. Example: userDefinedFields: - name: "ipv4_fragment_offset" base: IPV4 offset: 6 size: 2 mask: "0x1fff" |

### `SecurityPolicy` (alpha)

- Represents a Google Cloud Armor security policy resource. Only external backend services that use load balancers can reference a security policy. For more information, see Google Cloud Armor security policy overview.
- Version: alpha

| Field | Type | Description |
|---|---|---|
| `adaptiveProtectionConfig` | SecurityPolicyAdaptiveProtectionConfig | — |
| `advancedOptionsConfig` | SecurityPolicyAdvancedOptionsConfig | — |
| `associations` | array<SecurityPolicyAssociation> | A list of associations that belong to this policy. |
| `cloudArmorConfig` | SecurityPolicyCloudArmorConfig | — |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `ddosProtectionConfig` | SecurityPolicyDdosProtectionConfig | — |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `displayName` | string | User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is FIREWALL. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the security policy. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#securityPolicyfor security policies |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this security policy, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the security policy. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `parent` | string | Output only. \[Output Only\] The parent of the security policy. |
| `recaptchaOptionsConfig` | SecurityPolicyRecaptchaOptionsConfig | — |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional security policy resides. This field is not applicable to global security policies. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Total count of all security policy rule tuples. A security policy can not exceed a set number of tuples. |
| `rules` | array<SecurityPolicyRule> | A list of rules that belong to this policy. There must always be a default rule which is a rule with priority 2147483647 and match all condition (for the match condition this means match "\*" for srcIpRanges and for the networkMatch condition every field must be either match "\*" or not set). If no rules are provided when creating a security policy, a default rule with action "allow" will be added. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shortName` | string | User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is CLOUD_ARMOR. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `type` | string enum | The type indicates the intended use of the security policy. - CLOUD_ARMOR: Cloud Armor backend security policies can be configured to filter incoming HTTP requests targeting backend services. They filter requests before they hit the origin servers. - CLOUD_ARMOR_EDGE: Cloud Armor edge security policies can be configured to filter incoming HTTP requests targeting backend services (including Cloud CDN-enabled) as well as backend buckets (Cloud Storage). They filter requests before the request is served from Google's cache. - CLOUD_ARMOR_INTERNAL_SERVICE (preview only): Cloud Armor internal service policies can be configured to filter HTTP requests targeting services managed by Traffic Director in a service mesh. They filter requests before the request is served from the application. - CLOUD_ARMOR_NETWORK: Cloud Armor network policies can be configured to filter packets targeting network load balancing resources such as backend services, target pools, target instances, and instances with external IPs. They filter requests before the request is served from the application. This field can be set only at resource creation time. Values: `CLOUD_ARMOR`, `CLOUD_ARMOR_EDGE`, `CLOUD_ARMOR_INTERNAL_SERVICE`, `CLOUD_ARMOR_NETWORK`, `FIREWALL`. |
| `userDefinedFields` | array<SecurityPolicyUserDefinedField> | Definitions of user-defined fields for CLOUD_ARMOR_NETWORK policies. A user-defined field consists of up to 4 bytes extracted from a fixed offset in the packet, relative to the IPv4, IPv6, TCP, or UDP header, with an optional mask to select certain bits. Rules may then specify matching values for these fields. Example: userDefinedFields: - name: "ipv4_fragment_offset" base: IPV4 offset: 6 size: 2 mask: "0x1fff" |

### `SecurityPolicy` (beta)

- Represents a Google Cloud Armor security policy resource. Only external backend services that use load balancers can reference a security policy. For more information, see Google Cloud Armor security policy overview.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `adaptiveProtectionConfig` | SecurityPolicyAdaptiveProtectionConfig | — |
| `advancedOptionsConfig` | SecurityPolicyAdvancedOptionsConfig | — |
| `associations` | array<SecurityPolicyAssociation> | A list of associations that belong to this policy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `ddosProtectionConfig` | SecurityPolicyDdosProtectionConfig | — |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `displayName` | string | User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is FIREWALL. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the security policy. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#securityPolicyfor security policies |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this security policy, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the security policy. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `parent` | string | Output only. \[Output Only\] The parent of the security policy. |
| `recaptchaOptionsConfig` | SecurityPolicyRecaptchaOptionsConfig | — |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional security policy resides. This field is not applicable to global security policies. |
| `ruleTupleCount` | integer (int32) | Output only. \[Output Only\] Total count of all security policy rule tuples. A security policy can not exceed a set number of tuples. |
| `rules` | array<SecurityPolicyRule> | A list of rules that belong to this policy. There must always be a default rule which is a rule with priority 2147483647 and match all condition (for the match condition this means match "\*" for srcIpRanges and for the networkMatch condition every field must be either match "\*" or not set). If no rules are provided when creating a security policy, a default rule with action "allow" will be added. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `selfLinkWithId` | string | Output only. \[Output Only\] Server-defined URL for this resource with the resource id. |
| `shortName` | string | User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is CLOUD_ARMOR. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `type` | string enum | The type indicates the intended use of the security policy. - CLOUD_ARMOR: Cloud Armor backend security policies can be configured to filter incoming HTTP requests targeting backend services. They filter requests before they hit the origin servers. - CLOUD_ARMOR_EDGE: Cloud Armor edge security policies can be configured to filter incoming HTTP requests targeting backend services (including Cloud CDN-enabled) as well as backend buckets (Cloud Storage). They filter requests before the request is served from Google's cache. - CLOUD_ARMOR_INTERNAL_SERVICE (preview only): Cloud Armor internal service policies can be configured to filter HTTP requests targeting services managed by Traffic Director in a service mesh. They filter requests before the request is served from the application. - CLOUD_ARMOR_NETWORK: Cloud Armor network policies can be configured to filter packets targeting network load balancing resources such as backend services, target pools, target instances, and instances with external IPs. They filter requests before the request is served from the application. This field can be set only at resource creation time. Values: `CLOUD_ARMOR`, `CLOUD_ARMOR_EDGE`, `CLOUD_ARMOR_INTERNAL_SERVICE`, `CLOUD_ARMOR_NETWORK`, `FIREWALL`. |
| `userDefinedFields` | array<SecurityPolicyUserDefinedField> | Definitions of user-defined fields for CLOUD_ARMOR_NETWORK policies. A user-defined field consists of up to 4 bytes extracted from a fixed offset in the packet, relative to the IPv4, IPv6, TCP, or UDP header, with an optional mask to select certain bits. Rules may then specify matching values for these fields. Example: userDefinedFields: - name: "ipv4_fragment_offset" base: IPV4 offset: 6 size: 2 mask: "0x1fff" |

### `SecurityPolicy` (preview)

- Represents a Google Cloud Armor security policy resource. Only external backend services that use load balancers can reference a security policy. For more information, see Google Cloud Armor security policy overview.
- Version: preview

| Field | Type | Description |
|---|---|---|
| `adaptiveProtectionConfig` | SecurityPolicyAdaptiveProtectionConfig | — |
| `advancedOptionsConfig` | SecurityPolicyAdvancedOptionsConfig | — |
| `associations` | array<SecurityPolicyAssociation> | A list of associations that belong to this policy. |
| `creationTimestamp` | string | Output only. \[Output Only\] Creation timestamp inRFC3339 text format. |
| `ddosProtectionConfig` | SecurityPolicyDdosProtectionConfig | — |
| `description` | string | An optional description of this resource. Provide this property when you create the resource. |
| `fingerprint` | string (byte) | Specifies a fingerprint for this resource, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make get() request to the security policy. |
| `id` | string (uint64) | Output only. \[Output Only\] The unique identifier for the resource. This identifier is defined by the server. |
| `kind` | string | Output only. \[Output only\] Type of the resource. Alwayscompute#securityPolicyfor security policies |
| `labelFingerprint` | string (byte) | A fingerprint for the labels being applied to this security policy, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels. To see the latest fingerprint, make get() request to the security policy. |
| `labels` | object | Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty. |
| `name` | string | Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `params` | SecurityPolicyParams | Input only. \[Input Only\] Additional params passed with the request, but not persisted as part of resource payload. |
| `parent` | string | Output only. \[Output Only\] The parent of the security policy. |
| `recaptchaOptionsConfig` | SecurityPolicyRecaptchaOptionsConfig | — |
| `region` | string | Output only. \[Output Only\] URL of the region where the regional security policy resides. This field is not applicable to global security policies. |
| `rules` | array<SecurityPolicyRule> | A list of rules that belong to this policy. There must always be a default rule which is a rule with priority 2147483647 and match all condition (for the match condition this means match "\*" for srcIpRanges and for the networkMatch condition every field must be either match "\*" or not set). If no rules are provided when creating a security policy, a default rule with action "allow" will be added. |
| `selfLink` | string | Output only. \[Output Only\] Server-defined URL for the resource. |
| `shortName` | string | User-provided name of the organization security policy. The name should be unique in the organization in which the security policy is created. This should only be used when SecurityPolicyType is CLOUD_ARMOR. The name must be 1-63 characters long, and comply with https://www.ietf.org/rfc/rfc1035.txt. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |
| `type` | string enum | The type indicates the intended use of the security policy. - CLOUD_ARMOR: Cloud Armor backend security policies can be configured to filter incoming HTTP requests targeting backend services. They filter requests before they hit the origin servers. - CLOUD_ARMOR_EDGE: Cloud Armor edge security policies can be configured to filter incoming HTTP requests targeting backend services (including Cloud CDN-enabled) as well as backend buckets (Cloud Storage). They filter requests before the request is served from Google's cache. - CLOUD_ARMOR_INTERNAL_SERVICE (preview only): Cloud Armor internal service policies can be configured to filter HTTP requests targeting services managed by Traffic Director in a service mesh. They filter requests before the request is served from the application. - CLOUD_ARMOR_NETWORK: Cloud Armor network policies can be configured to filter packets targeting network load balancing resources such as backend services, target pools, target instances, and instances with external IPs. They filter requests before the request is served from the application. This field can be set only at resource creation time. Values: `CLOUD_ARMOR`, `CLOUD_ARMOR_EDGE`, `CLOUD_ARMOR_NETWORK`. |
| `userDefinedFields` | array<SecurityPolicyUserDefinedField> | Definitions of user-defined fields for CLOUD_ARMOR_NETWORK policies. A user-defined field consists of up to 4 bytes extracted from a fixed offset in the packet, relative to the IPv4, IPv6, TCP, or UDP header, with an optional mask to select certain bits. Rules may then specify matching values for these fields. Example: userDefinedFields: - name: "ipv4_fragment_offset" base: IPV4 offset: 6 size: 2 mask: "0x1fff" |

### `SecurityPolicyAdaptiveProtectionConfig`

- Configuration options for Cloud Armor Adaptive Protection (CAAP).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `layer7DdosDefenseConfig` | SecurityPolicyAdaptiveProtectionConfigLayer7DdosDefenseConfig | If set to true, enables Cloud Armor Machine Learning. |

### `SecurityPolicyAdaptiveProtectionConfig` (beta)

- Configuration options for Cloud Armor Adaptive Protection (CAAP).
- Version: beta

| Field | Type | Description |
|---|---|---|
| `autoDeployConfig` | SecurityPolicyAdaptiveProtectionConfigAutoDeployConfig | — |
| `layer7DdosDefenseConfig` | SecurityPolicyAdaptiveProtectionConfigLayer7DdosDefenseConfig | If set to true, enables Cloud Armor Machine Learning. |

### `SecurityPolicyAdaptiveProtectionConfigAutoDeployConfig`

- Configuration options for Adaptive Protection auto-deploy feature.
- Version: beta

| Field | Type | Description |
|---|---|---|
| `confidenceThreshold` | number (float) | — |
| `expirationSec` | integer (int32) | — |
| `impactedBaselineThreshold` | number (float) | — |
| `loadThreshold` | number (float) | — |

### `SecurityPolicyAdaptiveProtectionConfigLayer7DdosDefenseConfig`

- Configuration options for L7 DDoS detection. This field is only supported in Global Security Policies of type CLOUD_ARMOR.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enable` | boolean | If set to true, enables CAAP for L7 DDoS detection. This field is only supported in Global Security Policies of type CLOUD_ARMOR. |
| `ruleVisibility` | string enum | Rule visibility can be one of the following: STANDARD - opaque rules. (default) PREMIUM - transparent rules. This field is only supported in Global Security Policies of type CLOUD_ARMOR. Values: `PREMIUM`, `STANDARD`. |
| `thresholdConfigs` | array<SecurityPolicyAdaptiveProtectionConfigLayer7DdosDefenseConfigThresholdConfig> | Configuration options for layer7 adaptive protection for various customizable thresholds. |

### `SecurityPolicyAdaptiveProtectionConfigLayer7DdosDefenseConfigThresholdConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoDeployConfidenceThreshold` | number (float) | — |
| `autoDeployExpirationSec` | integer (int32) | — |
| `autoDeployImpactedBaselineThreshold` | number (float) | — |
| `autoDeployLoadThreshold` | number (float) | — |
| `detectionAbsoluteQps` | number (float) | — |
| `detectionLoadThreshold` | number (float) | — |
| `detectionRelativeToBaselineQps` | number (float) | — |
| `name` | string | The name must be 1-63 characters long, and comply withRFC1035. The name must be unique within the security policy. |
| `trafficGranularityConfigs` | array<SecurityPolicyAdaptiveProtectionConfigLayer7DdosDefenseConfigThresholdConfigTrafficGranularityConfig> | Configuration options for enabling Adaptive Protection to operate on specified granular traffic units. |

### `SecurityPolicyAdaptiveProtectionConfigLayer7DdosDefenseConfigThresholdConfigTrafficGranularityConfig`

- Configurations to specifc granular traffic units processed by Adaptive Protection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableEachUniqueValue` | boolean | If enabled, traffic matching each unique value for the specified type constitutes a separate traffic unit. It can only be set to true if `value` is empty. |
| `type` | string enum | Type of this configuration. Values: `HTTP_HEADER_HOST`, `HTTP_PATH`, `UNSPECIFIED_TYPE`. |
| `value` | string | Requests that match this value constitute a granular traffic unit. |

### `SecurityPolicyAdvancedOptionsConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jsonCustomConfig` | SecurityPolicyAdvancedOptionsConfigJsonCustomConfig | Custom configuration to apply the JSON parsing. Only applicable when json_parsing is set to STANDARD. |
| `jsonParsing` | string enum | — Values: `DISABLED`, `STANDARD`, `STANDARD_WITH_GRAPHQL`. |
| `logLevel` | string enum | — Values: `NORMAL`, `VERBOSE`. |
| `requestBodyInspectionSize` | string | The maximum request size chosen by the customer with Waf enabled. Values supported are "8KB", "16KB, "32KB", "48KB" and "64KB". Values are case insensitive. |
| `userIpRequestHeaders` | array<string> | An optional list of case-insensitive request header names to use for resolving the callers client IP address. |

### `SecurityPolicyAdvancedOptionsConfigJsonCustomConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contentTypes` | array<string> | A list of custom Content-Type header values to apply the JSON parsing. As per RFC 1341, a Content-Type header value has the following format: Content-Type := type "/" subtype \*\[";" parameter\] When configuring a custom Content-Type header value, only the type/subtype needs to be specified, and the parameters should be excluded. |

### `SecurityPolicyAssociation`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachmentId` | string | The resource that the security policy is attached to. |
| `displayName` | string | Output only. \[Output Only\] The display name of the security policy of the association. |
| `excludedFolders` | array<string> | A list of folders to exclude from the security policy. |
| `excludedProjects` | array<string> | A list of projects to exclude from the security policy. |
| `name` | string | The name for an association. |
| `securityPolicyId` | string | Output only. \[Output Only\] The security policy ID of the association. |
| `shortName` | string | Output only. \[Output Only\] The short name of the security policy of the association. |

### Shape of `ResourceStatusAcceleratorStatus`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "passedScans": "array<ResourceStatusAcceleratorStatusPassedScan>",
  "recommendedScans": "array<ResourceStatusAcceleratorStatusRecommendedScan>",
  "serialNumber": "string",
  "uuid": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, preview, beta, alpha of `compute` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://compute.googleapis.com/$discovery/rest?version=v1, https://compute.googleapis.com/$discovery/rest?version=preview, https://compute.googleapis.com/$discovery/rest?version=beta, https://compute.googleapis.com/$discovery/rest?version=alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
