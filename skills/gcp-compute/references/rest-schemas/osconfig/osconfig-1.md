---
source: https://osconfig.googleapis.com/$discovery/rest?version=v2
---

# OS Config API message schemas (osconfig) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/osconfig/`.

### `AptRepository`

- Represents a single Apt package repository. This repository is added to a repo file that is stored at `/etc/apt/sources.list.d/google_osconfig.list`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `archiveType` | string enum | Type of archive files in this repository. The default behavior is DEB. Values: `ARCHIVE_TYPE_UNSPECIFIED`, `DEB`, `DEB_SRC`. |
| `components` | array<string> | Required. List of components for this repository. Must contain at least one item. |
| `distribution` | string | Required. Distribution of this repository. |
| `gpgKey` | string | URI of the key file for this repository. The agent maintains a keyring at `/etc/apt/trusted.gpg.d/osconfig_agent_managed.gpg` containing all the keys in any applied guest policy. |
| `uri` | string | Required. URI for this repository. |

### `AptSettings`

- Apt patching is completed by executing `apt-get update && apt-get upgrade`. Additional options can be set to control how this is executed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludes` | array<string> | List of packages to exclude from update. These packages will be excluded |
| `exclusivePackages` | array<string> | An exclusive list of packages to be updated. These are the only packages that will be updated. If these packages are not installed, they will be ignored. This field cannot be specified with any other patch configuration fields. |
| `type` | string enum | By changing the type to DIST, the patching is performed using `apt-get dist-upgrade` instead. Values: `TYPE_UNSPECIFIED`, `DIST`, `UPGRADE`. |

### `Assignment`

- An assignment represents the group or groups of VM instances that the policy applies to. If an assignment is empty, it applies to all VM instances. Otherwise, the targeted VM instances must meet all the criteria specified. So if both labels and zones are specified, the policy applies to VM instances with those labels and in those zones.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `groupLabels` | array<AssignmentGroupLabel> | Targets instances matching at least one of these label sets. This allows an assignment to target disparate groups, for example "env=prod or env=staging". |
| `instanceNamePrefixes` | array<string> | Targets VM instances whose name starts with one of these prefixes. Like labels, this is another way to group VM instances when targeting configs, for example prefix="prod-". Only supported for project-level policies. |
| `instances` | array<string> | Targets any of the instances specified. Instances are specified by their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`. Instance targeting is uncommon and is supported to facilitate the management of changes by the instance or to target specific VM instances for development and testing. Only supported for project-level policies and must reference instances within this project. |
| `osTypes` | array<AssignmentOsType> | Targets VM instances matching at least one of the following OS types. VM instances must match all supplied criteria for a given OsType to be included. |
| `zones` | array<string> | Targets instances in any of these zones. Leave empty to target instances in any zone. Zonal targeting is uncommon and is supported to facilitate the management of changes by zone. |

### `AssignmentGroupLabel`

- Represents a group of VM intances that can be identified as having all these labels, for example "env=prod and app=web".
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `labels` | object | Google Compute Engine instance labels that must be present for an instance to be included in this assignment group. |

### `AssignmentOsType`

- Defines the criteria for selecting VM Instances by OS type.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `osArchitecture` | string | Targets VM instances with OS Inventory enabled and having the following OS architecture. |
| `osShortName` | string | Targets VM instances with OS Inventory enabled and having the following OS short name, for example "debian" or "windows". |
| `osVersion` | string | Targets VM instances with OS Inventory enabled and having the following following OS version. |

### `CVSSv3`

- Common Vulnerability Scoring System version 3. For details, see https://www.first.org/cvss/specification-document
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attackComplexity` | string enum | This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability. Values: `ATTACK_COMPLEXITY_UNSPECIFIED`, `ATTACK_COMPLEXITY_LOW`, `ATTACK_COMPLEXITY_HIGH`. |
| `attackVector` | string enum | This metric reflects the context by which vulnerability exploitation is possible. Values: `ATTACK_VECTOR_UNSPECIFIED`, `ATTACK_VECTOR_NETWORK`, `ATTACK_VECTOR_ADJACENT`, `ATTACK_VECTOR_LOCAL`, `ATTACK_VECTOR_PHYSICAL`. |
| `availabilityImpact` | string enum | This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `baseScore` | number (float) | The base score is a function of the base metric scores. https://www.first.org/cvss/specification-document#Base-Metrics |
| `confidentialityImpact` | string enum | This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `exploitabilityScore` | number (float) | The Exploitability sub-score equation is derived from the Base Exploitability metrics. https://www.first.org/cvss/specification-document#2-1-Exploitability-Metrics |
| `impactScore` | number (float) | The Impact sub-score equation is derived from the Base Impact metrics. |
| `integrityImpact` | string enum | This metric measures the impact to integrity of a successfully exploited vulnerability. Values: `IMPACT_UNSPECIFIED`, `IMPACT_HIGH`, `IMPACT_LOW`, `IMPACT_NONE`. |
| `privilegesRequired` | string enum | This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. Values: `PRIVILEGES_REQUIRED_UNSPECIFIED`, `PRIVILEGES_REQUIRED_NONE`, `PRIVILEGES_REQUIRED_LOW`, `PRIVILEGES_REQUIRED_HIGH`. |
| `scope` | string enum | The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope. Values: `SCOPE_UNSPECIFIED`, `SCOPE_UNCHANGED`, `SCOPE_CHANGED`. |
| `userInteraction` | string enum | This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component. Values: `USER_INTERACTION_UNSPECIFIED`, `USER_INTERACTION_NONE`, `USER_INTERACTION_REQUIRED`. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v2

### `CancelPatchJobRequest`

- Message for canceling a patch job.
- Version: v1

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `EffectiveGuestPolicy`

- The effective guest policy that applies to a VM instance.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `packageRepositories` | array<EffectiveGuestPolicySourcedPackageRepository> | List of package repository configurations assigned to the VM instance. |
| `packages` | array<EffectiveGuestPolicySourcedPackage> | List of package configurations assigned to the VM instance. |
| `softwareRecipes` | array<EffectiveGuestPolicySourcedSoftwareRecipe> | List of recipes assigned to the VM instance. |

### `EffectiveGuestPolicySourcedPackage`

- A guest policy package including its source.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `package` | Package | A software package to configure on the VM instance. |
| `source` | string | Name of the guest policy providing this config. |

### `EffectiveGuestPolicySourcedPackageRepository`

- A guest policy package repository including its source.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `packageRepository` | PackageRepository | A software package repository to configure on the VM instance. |
| `source` | string | Name of the guest policy providing this config. |

### `EffectiveGuestPolicySourcedSoftwareRecipe`

- A guest policy recipe including its source.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `softwareRecipe` | SoftwareRecipe | A software recipe to configure on the VM instance. |
| `source` | string | Name of the guest policy providing this config. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `ExecStep`

- A step that runs an executable for a PatchJob.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `linuxExecStepConfig` | ExecStepConfig | The ExecStepConfig for all Linux VMs targeted by the PatchJob. |
| `windowsExecStepConfig` | ExecStepConfig | The ExecStepConfig for all Windows VMs targeted by the PatchJob. |

### `ExecStepConfig`

- Common configurations for an ExecStep.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedSuccessCodes` | array<integer> | Defaults to \[0\]. A list of possible return values that the execution can return to indicate a success. |
| `gcsObject` | GcsObject | A Cloud Storage object containing the executable. |
| `interpreter` | string enum | The script interpreter to use to run the script. If no interpreter is specified the script will be executed directly, which will likely only succeed for scripts with \[shebang lines\] (https://en.wikipedia.org/wiki/Shebang\_\(Unix\)). Values: `INTERPRETER_UNSPECIFIED`, `NONE`, `SHELL`, `POWERSHELL`. |
| `localPath` | string | An absolute path to the executable on the VM. |

### `ExecutePatchJobRequest`

- A request message to initiate patching across Compute Engine instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Description of the patch job. Length of the description is limited to 1024 characters. |
| `displayName` | string | Display name for this patch job. This does not have to be unique. |
| `dryRun` | boolean | If this patch is a dry-run only, instances are contacted but will do nothing. |
| `duration` | string (google-duration) | Duration of the patch job. After the duration ends, the patch job times out. |
| `instanceFilter` | PatchInstanceFilter | Required. Instances to patch, either explicitly or filtered by some criteria such as zone or labels. |
| `patchConfig` | PatchConfig | Patch configuration being applied. If omitted, instances are patched using the default configurations. |
| `rollout` | PatchRollout | Rollout strategy of the patch job. |

### `FixedOrPercent`

- Message encapsulating a value that can be either absolute ("fixed") or relative ("percent") to a value.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fixed` | integer (int32) | Specifies a fixed value. |
| `percent` | integer (int32) | Specifies the relative value defined as a percentage, which will be multiplied by a reference value. |

### `GcsObject`

- Cloud Storage object representation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Bucket of the Cloud Storage object. |
| `generationNumber` | string (int64) | Required. Generation number of the Cloud Storage object. This is used to ensure that the ExecStep specified by this PatchJob does not change. |
| `object` | string | Required. Name of the Cloud Storage object. |

### `GooRepository`

- Represents a Goo package repository. These is added to a repo file that is stored at C:/ProgramData/GooGet/repos/google_osconfig.repo.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the repository. |
| `url` | string | Required. The url of the repository. |

### `GooSettings`

- Googet patching is performed by running `googet update`.
- Version: v1

### `GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata`

- OS policy assignment operation metadata provided by OS policy assignment API methods that return long running operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiMethod` | string enum | The OS policy assignment API method. Values: `API_METHOD_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`. |
| `osPolicyAssignment` | string | Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` |
| `rolloutStartTime` | string (google-datetime) | Rollout start time |
| `rolloutState` | string enum | State of the rollout Values: `ROLLOUT_STATE_UNSPECIFIED`, `IN_PROGRESS`, `CANCELLING`, `CANCELLED`, `SUCCEEDED`. |
| `rolloutUpdateTime` | string (google-datetime) | Rollout update time |

### `GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector`

- Selector containing locations in scope.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `includedLocations` | array<string> | Optional. Names of the locations in scope. Format: `us-central1-a` |

### `GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector`

- Selector containing Cloud Resource Manager resource hierarchy nodes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `includedFolders` | array<string> | Optional. Names of the folders in scope. Format: `folders/{folder_id}` |
| `includedProjects` | array<string> | Optional. Names of the projects in scope. Format: `projects/{project_number}` |

### `GoogleCloudOsconfigV2_OrchestrationScope_Selector`

- Selector for the resources in scope of orchestration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locationSelector` | GoogleCloudOsconfigV2_OrchestrationScope_LocationSelector | Selector for selecting locations. |
| `resourceHierarchySelector` | GoogleCloudOsconfigV2_OrchestrationScope_ResourceHierarchySelector | Selector for selecting resource hierarchy. |

### `GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState`

- Describes the state of a single iteration of the orchestrator.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `error` | Status | Output only. Error thrown in the wave iteration. |
| `failedActions` | string (int64) | Output only. Number of orchestration actions which failed so far. For more details, query the Cloud Logs. |
| `finishTime` | string (google-datetime) | Output only. Finish time of the wave iteration. |
| `iterationId` | string | Output only. Unique identifier of the iteration. |
| `performedActions` | string (int64) | Output only. Overall number of actions done by the orchestrator so far. |
| `progress` | number (float) | Output only. An estimated percentage of the progress. Number between 0 and 100. |
| `startTime` | string (google-datetime) | Output only. Start time of the wave iteration. |
| `state` | string enum | Output only. State of the iteration. Values: `STATE_UNSPECIFIED`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED`, `UNKNOWN`. |

### `GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState`

- Describes the state of the orchestration process.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `currentIterationState` | GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState | Output only. Current Wave iteration state. |
| `previousIterationState` | GoogleCloudOsconfigV2_PolicyOrchestrator_IterationState | Output only. Previous Wave iteration state. |

### `GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse`

- Response for the list policy orchestrator resources.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `policyOrchestrators` | array<GoogleCloudOsconfigV2__PolicyOrchestrator> | The policy orchestrators for the specified parent resource. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `GoogleCloudOsconfigV2__OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudOsconfigV2__OrchestratedResource`

- Represents a resource that is being orchestrated by the policy orchestrator.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `id` | string | Optional. ID of the resource to be used while generating set of affected resources. For UPSERT action the value is auto-generated during PolicyOrchestrator creation when not set. When the value is set it should following next restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the project. For DELETE action, ID must be specified explicitly during PolicyOrchestrator creation. |
| `osPolicyAssignmentV1Payload` | OSPolicyAssignment | Optional. OSPolicyAssignment resource to be created, updated or deleted. Name field is ignored and replace with a generated value. With this field set, orchestrator will perform actions on `project/{project}/locations/{zone}/osPolicyAssignments/{resource_id}` resources, where `project` and `zone` pairs come from the expanded scope, and `resource_id` comes from the `resource_id` field of orchestrator resource. |

### `GoogleCloudOsconfigV2__OrchestrationScope`

- Defines a set of selectors which drive which resources are in scope of policy orchestration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `selectors` | array<GoogleCloudOsconfigV2_OrchestrationScope_Selector> | Optional. Selectors of the orchestration scope. Each `Selector` entry can specify either a `ResourceHierarchySelector` or a `LocationSelector`, but not both. To filter by both resource hierarchy and location, specify separate `Selector` entries for each selector type. There is a logical AND between each selector defined. When there is no explicit `ResourceHierarchySelector` selector specified, the scope is by default bounded to the parent of the policy orchestrator resource. |

### `GoogleCloudOsconfigV2__PolicyOrchestrator`

- A policy orchestrator manages project-level and zone-level policy resources, such as OS policy assignments. It provides methods to create, update, and delete these resources across projects and locations at scale. The policy orchestrator operates as a continuous loop. In each iteration, the orchestrator identifies the set of resources to be modified and progressively applies changes. If the set of resources changes over time (for example, if you add new projects), subsequent iterations address those changes. The orchestrator can either upsert or delete policy resources. For more details, see the `action` and `orchestrated_resource` fields. The policy orchestrator does not manage the lifecycle of the resources it creates. Each iteration is independent and, besides Cloud Logging, the orchestrator retains only a minimal history of past actions. Deleting the orchestrator does not affect previously created resources; these resources remain in their current state. Similarly, removing projects from the orchestrator's scope does not affect existing resources.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `action` | string | Required. Action to be done by the orchestrator in `projects/{project_id}/zones/{zone_id}` locations defined by the `orchestration_scope`. Allowed values: - `UPSERT` - Orchestrator will create or update target resources. - `DELETE` - Orchestrator will delete target resources, if they exist |
| `createTime` | string (google-datetime) | Output only. Timestamp when the policy orchestrator resource was created. |
| `description` | string | Optional. Freeform text describing the purpose of the resource. |
| `etag` | string | Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Immutable. Identifier. In the following format: \* `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` |
| `orchestratedResource` | GoogleCloudOsconfigV2__OrchestratedResource | Required. Resource to be orchestrated by the policy orchestrator. |
| `orchestrationScope` | GoogleCloudOsconfigV2__OrchestrationScope | Optional. Defines scope for the orchestration, in context of the enclosing PolicyOrchestrator resource. Scope is expanded into a list of pairs, in which the rollout action will take place. Expansion starts with a Folder resource parenting the PolicyOrchestrator resource: - All the descendant projects are listed. - List of project is cross joined with a list of all available zones. - Resulting list of pairs is filtered according to the selectors. |
| `orchestrationState` | GoogleCloudOsconfigV2_PolicyOrchestrator_OrchestrationState | Output only. State of the orchestration. |
| `reconciling` | boolean | Output only. Set to true, if there are ongoing changes being applied by the orchestrator. |
| `state` | string | Optional. State of the orchestrator. Can be updated to change orchestrator behaviour. Allowed values: - `ACTIVE` - orchestrator is actively looking for actions to be taken. - `STOPPED` - orchestrator won't make any changes. Note: There might be more states added in the future. We use string here instead of an enum, to avoid the need of propagating new states to all the client code. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the policy orchestrator resource was last modified. |

### `GoogleCloudOsconfigV2beta_OrchestrationScope_LocationSelector`

- Selector containing locations in scope.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `includedLocations` | array<string> | Optional. Names of the locations in scope. Format: `us-central1-a` |

### `GoogleCloudOsconfigV2beta_OrchestrationScope_ResourceHierarchySelector`

- Selector containing Cloud Resource Manager resource hierarchy nodes.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `includedFolders` | array<string> | Optional. Names of the folders in scope. Format: `folders/{folder_id}` |
| `includedProjects` | array<string> | Optional. Names of the projects in scope. Format: `projects/{project_number}` |

### `GoogleCloudOsconfigV2beta_OrchestrationScope_Selector`

- Selector for the resources in scope of orchestration.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `locationSelector` | GoogleCloudOsconfigV2beta_OrchestrationScope_LocationSelector | Selector for selecting locations. |
| `resourceHierarchySelector` | GoogleCloudOsconfigV2beta_OrchestrationScope_ResourceHierarchySelector | Selector for selecting resource hierarchy. |

### `GoogleCloudOsconfigV2beta_PolicyOrchestrator_IterationState`

- Describes the state of a single iteration of the orchestrator.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `error` | Status | Output only. Error thrown in the wave iteration. |
| `failedActions` | string (int64) | Output only. Number of orchestration actions which failed so far. For more details, query the Cloud Logs. |
| `finishTime` | string (google-datetime) | Output only. Finish time of the wave iteration. |
| `iterationId` | string | Output only. Unique identifier of the iteration. |
| `performedActions` | string (int64) | Output only. Overall number of actions done by the orchestrator so far. |
| `progress` | number (float) | Output only. An estimated percentage of the progress. Number between 0 and 100. |
| `startTime` | string (google-datetime) | Output only. Start time of the wave iteration. |
| `state` | string enum | Output only. State of the iteration. Values: `STATE_UNSPECIFIED`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED`, `UNKNOWN`. |

### `GoogleCloudOsconfigV2beta_PolicyOrchestrator_OrchestrationState`

- Describes the state of the orchestration process.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `currentIterationState` | GoogleCloudOsconfigV2beta_PolicyOrchestrator_IterationState | Output only. Current Wave iteration state. |
| `previousIterationState` | GoogleCloudOsconfigV2beta_PolicyOrchestrator_IterationState | Output only. Previous Wave iteration state. |

### `GoogleCloudOsconfigV2beta__ListPolicyOrchestratorsResponse`

- Response for the list policy orchestrator resources.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `policyOrchestrators` | array<GoogleCloudOsconfigV2beta__PolicyOrchestrator> | The policy orchestrators for the specified parent resource. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `GoogleCloudOsconfigV2beta__OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudOsconfigV2beta__OrchestratedResource`

- Represents a resource that is being orchestrated by the policy orchestrator.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `id` | string | Optional. ID of the resource to be used while generating set of affected resources. For UPSERT action the value is auto-generated during PolicyOrchestrator creation when not set. When the value is set it should following next restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the project. For DELETE action, ID must be specified explicitly during PolicyOrchestrator creation. |
| `osPolicyAssignmentV1Payload` | OSPolicyAssignment | Optional. OSPolicyAssignment resource to be created, updated or deleted. Name field is ignored and replace with a generated value. With this field set, orchestrator will perform actions on `project/{project}/locations/{zone}/osPolicyAssignments/{resource_id}` resources, where `project` and `zone` pairs come from the expanded scope, and `resource_id` comes from the `resource_id` field of orchestrator resource. |

### `GoogleCloudOsconfigV2beta__OrchestrationScope`

- Defines a set of selectors which drive which resources are in scope of policy orchestration.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `selectors` | array<GoogleCloudOsconfigV2beta_OrchestrationScope_Selector> | Optional. Selectors of the orchestration scope. Each `Selector` entry can specify either a `ResourceHierarchySelector` or a `LocationSelector`, but not both. To filter by both resource hierarchy and location, specify separate `Selector` entries for each selector type. There is a logical AND between each selector defined. When there is no explicit `ResourceHierarchySelector` selector specified, the scope is by default bounded to the parent of the policy orchestrator resource. |

### `GoogleCloudOsconfigV2beta__PolicyOrchestrator`

- A policy orchestrator manages project-level and zone-level policy resources, such as OS policy assignments. It provides methods to create, update, and delete these resources across projects and locations at scale. The policy orchestrator operates as a continuous loop. In each iteration, the orchestrator identifies the set of resources to be modified and progressively applies changes. If the set of resources changes over time (for example, if you add new projects), subsequent iterations address those changes. The orchestrator can either upsert or delete policy resources. For more details, see the `action` and `orchestrated_resource` fields. The policy orchestrator does not manage the lifecycle of the resources it creates. Each iteration is independent and, besides Cloud Logging, the orchestrator retains only a minimal history of past actions. Deleting the orchestrator does not affect previously created resources; these resources remain in their current state. Similarly, removing projects from the orchestrator's scope does not affect existing resources.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `action` | string | Required. Action to be done by the orchestrator in `projects/{project_id}/zones/{zone_id}` locations defined by the `orchestration_scope`. Allowed values: - `UPSERT` - Orchestrator will create or update target resources. - `DELETE` - Orchestrator will delete target resources, if they exist |
| `createTime` | string (google-datetime) | Output only. Timestamp when the policy orchestrator resource was created. |
| `description` | string | Optional. Freeform text describing the purpose of the resource. |
| `etag` | string | Output only. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `labels` | object | Optional. Labels as key value pairs |
| `name` | string | Immutable. Identifier. In the following format: \* `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` |
| `orchestratedResource` | GoogleCloudOsconfigV2beta__OrchestratedResource | Required. Resource to be orchestrated by the policy orchestrator. |
| `orchestrationScope` | GoogleCloudOsconfigV2beta__OrchestrationScope | Optional. Defines scope for the orchestration, in context of the enclosing PolicyOrchestrator resource. Scope is expanded into a list of pairs, in which the rollout action will take place. Expansion starts with a Folder resource parenting the PolicyOrchestrator resource: - All the descendant projects are listed. - List of project is cross joined with a list of all available zones. - Resulting list of pairs is filtered according to the selectors. |
| `orchestrationState` | GoogleCloudOsconfigV2beta_PolicyOrchestrator_OrchestrationState | Output only. State of the orchestration. |
| `reconciling` | boolean | Output only. Set to true, if there are ongoing changes being applied by the orchestrator. |
| `state` | string | Optional. State of the orchestrator. Can be updated to change orchestrator behaviour. Allowed values: - `ACTIVE` - orchestrator is actively looking for actions to be taken. - `STOPPED` - orchestrator won't make any changes. Note: There might be more states added in the future. We use string here instead of an enum, to avoid the need of propagating new states to all the client code. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the policy orchestrator resource was last modified. |

### `GuestPolicy`

- An OS Config resource representing a guest configuration policy. These policies represent the desired state for VM instance guest environments including packages to install or remove, package repository configurations, and software to install.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `assignment` | Assignment | Required. Specifies the VM instances that are assigned to this policy. This allows you to target sets or groups of VM instances by different parameters such as labels, names, OS, or zones. If left empty, all VM instances underneath this policy are targeted. At the same level in the resource hierarchy (that is within a project), the service prevents the creation of multiple policies that conflict with each other. For more information, see how the service handles assignment conflicts. |
| `createTime` | string (google-datetime) | Output only. Time this guest policy was created. |
| `description` | string | Description of the guest policy. Length of the description is limited to 1024 characters. |
| `etag` | string | The etag for this guest policy. If this is provided on update, it must match the server's etag. |
| `name` | string | Required. Unique name of the resource in this project using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. |
| `packageRepositories` | array<PackageRepository> | A list of package repositories to configure on the VM instance. This is done before any other configs are applied so they can use these repos. Package repositories are only configured if the corresponding package manager(s) are available. |
| `packages` | array<Package> | The software packages to be managed by this policy. |
| `recipes` | array<SoftwareRecipe> | A list of Recipes to install on the VM instance. |
| `updateTime` | string (google-datetime) | Output only. Last time this guest policy was updated. |

### `InstanceOSPoliciesCompliance`

- This API resource represents the OS policies compliance data for a Compute Engine virtual machine (VM) instance at a given point in time. A Compute Engine VM can have multiple OS policy assignments, and each assignment can have multiple OS policies. As a result, multiple OS policies could be applied to a single VM. You can use this API resource to determine both the compliance state of your VM as well as the compliance state of an individual OS policy. For more information, see View compliance (https://cloud.google.com/compute/docs/os-configuration-management/view-compliance).
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `detailedState` | string | Output only. Detailed compliance state of the VM. This field is populated only when compliance state is `UNKNOWN`. It may contain one of the following values: \* `no-compliance-data`: Compliance data is not available for this VM. \* `no-agent-detected`: OS Config agent is not detected for this VM. \* `config-not-supported-by-agent`: The version of the OS Config agent running on this VM does not support configuration management. \* `inactive`: VM is not running. \* `internal-service-errors`: There were internal service errors encountered while enforcing compliance. \* `agent-errors`: OS config agent encountered errors while enforcing compliance. |
| `detailedStateReason` | string | Output only. The reason for the `detailed_state` of the VM (if any). |
| `instance` | string | Output only. The Compute Engine VM instance name. |
| `lastComplianceCheckTime` | string (google-datetime) | Output only. Timestamp of the last compliance check for the VM. |
| `lastComplianceRunId` | string | Output only. Unique identifier for the last compliance run. This id will be logged by the OS config agent during a compliance run and can be used for debugging and tracing purpose. |
| `name` | string | Output only. The `InstanceOSPoliciesCompliance` API resource name. Format: `projects/{project_number}/locations/{location}/instanceOSPoliciesCompliances/{instance_id}` |
| `osPolicyCompliances` | array<InstanceOSPoliciesComplianceOSPolicyCompliance> | Output only. Compliance data for each `OSPolicy` that is applied to the VM. |
| `state` | string enum | Output only. Compliance state of the VM. Values: `OS_POLICY_COMPLIANCE_STATE_UNSPECIFIED`, `COMPLIANT`, `NON_COMPLIANT`, `UNKNOWN`, `NO_OS_POLICIES_APPLICABLE`. |

### `InstanceOSPoliciesComplianceOSPolicyCompliance`

- Compliance data for an OS policy
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `osPolicyAssignment` | string | Reference to the `OSPolicyAssignment` API resource that the `OSPolicy` belongs to. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` |
| `osPolicyId` | string | The OS policy id |
| `osPolicyResourceCompliances` | array<OSPolicyResourceCompliance> | Compliance data for each `OSPolicyResource` that is applied to the VM. |
| `state` | string enum | Compliance state of the OS policy. Values: `OS_POLICY_COMPLIANCE_STATE_UNSPECIFIED`, `COMPLIANT`, `NON_COMPLIANT`, `UNKNOWN`, `NO_OS_POLICIES_APPLICABLE`. |

### `Inventory`

- This API resource represents the available inventory data for a Compute Engine virtual machine (VM) instance at a given point in time. You can use this API resource to determine the inventory data of your VM. For more information, see Information provided by OS inventory management (https://cloud.google.com/compute/docs/instances/os-inventory-management#data-collected).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | object | Inventory items related to the VM keyed by an opaque unique identifier for each inventory item. The identifier is unique to each distinct and addressable inventory item and will change, when there is a new package version. |
| `name` | string | Output only. The `Inventory` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/inventory` |
| `osInfo` | InventoryOsInfo | Base level operating system information for the VM. |
| `updateTime` | string (google-datetime) | Output only. Timestamp of the last reported inventory for the VM. |

### `InventoryItem`

- A single piece of inventory on a VM.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availablePackage` | InventorySoftwarePackage | Software package available to be installed on the VM instance. |
| `createTime` | string (google-datetime) | When this inventory item was first detected. |
| `id` | string | Identifier for this item, unique across items for this VM. |
| `installedPackage` | InventorySoftwarePackage | Software package present on the VM instance. |
| `originType` | string enum | The origin of this inventory item. Values: `ORIGIN_TYPE_UNSPECIFIED`, `INVENTORY_REPORT`. |
| `type` | string enum | The specific type of inventory, correlating to its specific details. Values: `TYPE_UNSPECIFIED`, `INSTALLED_PACKAGE`, `AVAILABLE_PACKAGE`. |
| `updateTime` | string (google-datetime) | When this inventory item was last modified. |

### `InventoryOsInfo`

- Operating system information for the VM.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | The system architecture of the operating system. |
| `hostname` | string | The VM hostname. |
| `kernelRelease` | string | The kernel release of the operating system. |
| `kernelVersion` | string | The kernel version of the operating system. |
| `longName` | string | The operating system long name. For example 'Debian GNU/Linux 9' or 'Microsoft Window Server 2019 Datacenter'. |
| `osconfigAgentVersion` | string | The current version of the OS Config agent running on the VM. |
| `shortName` | string | The operating system short name. For example, 'windows' or 'debian'. |
| `version` | string | The version of the operating system. |

### `InventorySoftwarePackage`

- Software package information of the operating system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aptPackage` | InventoryVersionedPackage | Details of an APT package. For details about the apt package manager, see https://wiki.debian.org/Apt. |
| `cosPackage` | InventoryVersionedPackage | Details of a COS package. |
| `googetPackage` | InventoryVersionedPackage | Details of a Googet package. For details about the googet package manager, see https://github.com/google/googet. |
| `qfePackage` | InventoryWindowsQuickFixEngineeringPackage | Details of a Windows Quick Fix engineering package. See https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering for info in Windows Quick Fix Engineering. |
| `windowsApplication` | InventoryWindowsApplication | Details of Windows Application. |
| `wuaPackage` | InventoryWindowsUpdatePackage | Details of a Windows Update package. See https://docs.microsoft.com/en-us/windows/win32/api/\_wua/ for information about Windows Update. |
| `yumPackage` | InventoryVersionedPackage | Yum package info. For details about the yum package manager, see https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum. |
| `zypperPackage` | InventoryVersionedPackage | Details of a Zypper package. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. |
| `zypperPatch` | InventoryZypperPatch | Details of a Zypper patch. For details about the Zypper package manager, see https://en.opensuse.org/SDB:Zypper_manual. |

### `InventoryVersionedPackage`

- Information related to the a standard versioned package. This includes package info for APT, Yum, Zypper, and Googet package managers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `architecture` | string | The system architecture this package is intended for. |
| `packageName` | string | The name of the package. |
| `version` | string | The version of the package. |

### `InventoryWindowsApplication`

- Contains information about a Windows application that is retrieved from the Windows Registry. For more information about these fields, see: https://docs.microsoft.com/en-us/windows/win32/msi/uninstall-registry-key
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The name of the application or product. |
| `displayVersion` | string | The version of the product or application in string format. |
| `helpLink` | string | The internet address for technical support. |
| `installDate` | Date | The last time this product received service. The value of this property is replaced each time a patch is applied or removed from the product or the command-line option is used to repair the product. |
| `publisher` | string | The name of the manufacturer for the product or application. |

### `InventoryWindowsQuickFixEngineeringPackage`

- Information related to a Quick Fix Engineering package. Fields are taken from Windows QuickFixEngineering Interface and match the source names: https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caption` | string | A short textual description of the QFE update. |
| `description` | string | A textual description of the QFE update. |
| `hotFixId` | string | Unique identifier associated with a particular QFE update. |
| `installTime` | string (google-datetime) | Date that the QFE update was installed. Mapped from installed_on field. |

### `InventoryWindowsUpdatePackage`

- Details related to a Windows Update package. Field data and names are taken from Windows Update API IUpdate Interface: https://docs.microsoft.com/en-us/windows/win32/api/\_wua/ Descriptive fields like title, and description are localized based on the locale of the VM being updated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categories` | array<InventoryWindowsUpdatePackageWindowsUpdateCategory> | The categories that are associated with this update package. |
| `description` | string | The localized description of the update package. |
| `kbArticleIds` | array<string> | A collection of Microsoft Knowledge Base article IDs that are associated with the update package. |
| `lastDeploymentChangeTime` | string (google-datetime) | The last published date of the update, in (UTC) date and time. |
| `moreInfoUrls` | array<string> | A collection of URLs that provide more information about the update package. |
| `revisionNumber` | integer (int32) | The revision number of this update package. |
| `supportUrl` | string | A hyperlink to the language-specific support information for the update. |
| `title` | string | The localized title of the update package. |
| `updateId` | string | Gets the identifier of an update package. Stays the same across revisions. |

### `InventoryWindowsUpdatePackageWindowsUpdateCategory`

- Categories specified by the Windows Update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The identifier of the windows update category. |
| `name` | string | The name of the windows update category. |

### `InventoryZypperPatch`

- Details related to a Zypper Patch.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string | The category of the patch. |
| `patchName` | string | The name of the patch. |
| `severity` | string | The severity specified for this patch |
| `summary` | string | Any summary information provided about this patch. |

### `ListGuestPoliciesResponse`

- A response message for listing guest policies.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `guestPolicies` | array<GuestPolicy> | The list of GuestPolicies. |
| `nextPageToken` | string | A pagination token that can be used to get the next page of guest policies. |

### `ListInstanceOSPoliciesCompliancesResponse`

- A response message for listing OS policies compliance data for all Compute Engine VMs in the given location.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `instanceOsPoliciesCompliances` | array<InstanceOSPoliciesCompliance> | List of instance OS policies compliance objects. |
| `nextPageToken` | string | The pagination token to retrieve the next page of instance OS policies compliance objects. |

### `ListInventoriesResponse`

- A response message for listing inventory data for all VMs in a specified location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inventories` | array<Inventory> | List of inventory objects. |
| `nextPageToken` | string | The pagination token to retrieve the next page of inventory objects. |

### `ListOSPolicyAssignmentReportsResponse`

- A response message for listing OS Policy assignment reports including the page of results and page token.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The pagination token to retrieve the next page of OS policy assignment report objects. |
| `osPolicyAssignmentReports` | array<OSPolicyAssignmentReport> | List of OS policy assignment reports. |

### `ListOSPolicyAssignmentRevisionsResponse`

- A response message for listing all revisions for a OS policy assignment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The pagination token to retrieve the next page of OS policy assignment revisions. |
| `osPolicyAssignments` | array<OSPolicyAssignment> | The OS policy assignment revisions |

### `ListOSPolicyAssignmentsResponse`

- A response message for listing all assignments under given parent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The pagination token to retrieve the next page of OS policy assignments. |
| `osPolicyAssignments` | array<OSPolicyAssignment> | The list of assignments |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListPatchDeploymentsResponse`

- A response message for listing patch deployments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A pagination token that can be used to get the next page of patch deployments. |
| `patchDeployments` | array<PatchDeployment> | The list of patch deployments. |

### `ListPatchJobInstanceDetailsResponse`

- A response message for listing the instances details for a patch job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A pagination token that can be used to get the next page of results. |
| `patchJobInstanceDetails` | array<PatchJobInstanceDetails> | A list of instance status. |

### `ListPatchJobsResponse`

- A response message for listing patch jobs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A pagination token that can be used to get the next page of results. |
| `patchJobs` | array<PatchJob> | The list of patch jobs. |

### `ListVulnerabilityReportsResponse`

- A response message for listing vulnerability reports for all VM instances in the specified location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The pagination token to retrieve the next page of vulnerabilityReports object. |
| `vulnerabilityReports` | array<VulnerabilityReport> | List of vulnerabilityReport objects. |

### `LookupEffectiveGuestPolicyRequest`

- A request message for getting the effective guest policy assigned to the instance.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `osArchitecture` | string | Architecture of OS running on the instance. The OS Config agent only provides this field for targeting if OS Inventory is enabled for that instance. |
| `osShortName` | string | Short name of the OS running on the instance. The OS Config agent only provides this field for targeting if OS Inventory is enabled for that instance. |
| `osVersion` | string | Version of the OS running on the instance. The OS Config agent only provides this field for targeting if OS Inventory is enabled for that VM instance. |

### `MessageSet`

- This is proto2's version of MessageSet. DEPRECATED: DO NOT USE FOR NEW FIELDS. If you are using editions or proto2, please make your own extendable messages for your use case. If you are using proto3, please use `Any` instead. MessageSet was the implementation of extensions for proto1. When proto2 was introduced, extensions were implemented as a first-class feature. This schema for MessageSet was meant to be a "bridge" solution to migrate MessageSet-bearing messages from proto1 to proto2. This schema has been open-sourced only to facilitate the migration of Google products with MessageSet-bearing messages to open-source environments.
- Version: v2

### `MonthlySchedule`

- Represents a monthly schedule. An example of a valid monthly schedule is "on the third Tuesday of the month" or "on the 15th of the month".
- Version: v1

| Field | Type | Description |
|---|---|---|
| `monthDay` | integer (int32) | Required. One day of the month. 1-31 indicates the 1st to the 31st day. -1 indicates the last day of the month. Months without the target day will be skipped. For example, a schedule to run "every month on the 31st" will not run in February, April, June, etc. |
| `weekDayOfMonth` | WeekDayOfMonth | Required. Week day in a month. |

### `OSPolicy`

- An OS policy defines the desired state configuration for a VM.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowNoResourceGroupMatch` | boolean | This flag determines the OS policy compliance status when none of the resource groups within the policy are applicable for a VM. Set this value to `true` if the policy needs to be reported as compliant even if the policy has nothing to validate or enforce. |
| `description` | string | Policy description. Length of the description is limited to 1024 characters. |
| `id` | string | Required. The id of the OS policy with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the assignment. |
| `mode` | string enum | Required. Policy mode Values: `MODE_UNSPECIFIED`, `VALIDATION`, `ENFORCEMENT`. |
| `resourceGroups` | array<OSPolicyResourceGroup> | Required. List of resource groups for the policy. For a particular VM, resource groups are evaluated in the order specified and the first resource group that is applicable is selected and the rest are ignored. If none of the resource groups are applicable for a VM, the VM is considered to be non-compliant w.r.t this policy. This behavior can be toggled by the flag `allow_no_resource_group_match` |

### `OSPolicyAssignment`

- OS policy assignment is an API resource that is used to apply a set of OS policies to a dynamically targeted group of Compute Engine VM instances. An OS policy is used to define the desired state configuration for a Compute Engine VM instance through a set of configuration resources that provide capabilities such as installing or removing software packages, or executing a script. For more information about the OS policy resource definitions and examples, see OS policy and OS policy assignment (https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseline` | boolean | Output only. Indicates that this revision has been successfully rolled out in this zone and new VMs will be assigned OS policies from this revision. For a given OS policy assignment, there is only one revision with a value of `true` for this field. |
| `deleted` | boolean | Output only. Indicates that this revision deletes the OS policy assignment. |
| `description` | string | OS policy assignment description. Length of the description is limited to 1024 characters. |
| `etag` | string | The etag for this OS policy assignment. If this is provided on update, it must match the server's etag. |
| `instanceFilter` | OSPolicyAssignmentInstanceFilter | Required. Filter to select VMs. |
| `name` | string | Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment. |
| `osPolicies` | array<OSPolicy> | Required. List of OS policies to be applied to the VMs. |
| `reconciling` | boolean | Output only. Indicates that reconciliation is in progress for the revision. This value is `true` when the `rollout_state` is one of: \* IN_PROGRESS \* CANCELLING |
| `revisionCreateTime` | string (google-datetime) | Output only. The timestamp that the revision was created. |
| `revisionId` | string | Output only. The assignment revision ID A new revision is committed whenever a rollout is triggered for a OS policy assignment |
| `rollout` | OSPolicyAssignmentRollout | Required. Rollout to deploy the OS policy assignment. A rollout is triggered in the following situations: 1) OSPolicyAssignment is created. 2) OSPolicyAssignment is updated and the update contains changes to one of the following fields: - instance_filter - os_policies 3) OSPolicyAssignment is deleted. |
| `rolloutState` | string enum | Output only. OS policy assignment rollout state Values: `ROLLOUT_STATE_UNSPECIFIED`, `IN_PROGRESS`, `CANCELLING`, `CANCELLED`, `SUCCEEDED`. |
| `uid` | string | Output only. Server generated unique id for the OS policy assignment resource. |

### `OSPolicyAssignmentInstanceFilter`

- Filters to select target VMs for an assignment. If more than one filter criteria is specified below, a VM will be selected if and only if it satisfies all of them.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `all` | boolean | Target all VMs in the project. If true, no other criteria is permitted. |
| `exclusionLabels` | array<OSPolicyAssignmentLabelSet> | List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM. |
| `inclusionLabels` | array<OSPolicyAssignmentLabelSet> | List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM. |
| `inventories` | array<OSPolicyAssignmentInstanceFilterInventory> | List of inventories to select VMs. A VM is selected if its inventory data matches at least one of the following inventories. |

### `OSPolicyAssignmentInstanceFilter` (v1alpha)

- Filters to select target VMs for an assignment. If more than one filter criteria is specified below, a VM will be selected if and only if it satisfies all of them.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `all` | boolean | Target all VMs in the project. If true, no other criteria is permitted. |
| `exclusionLabels` | array<OSPolicyAssignmentLabelSet> | List of label sets used for VM exclusion. If the list has more than one label set, the VM is excluded if any of the label sets are applicable for the VM. |
| `inclusionLabels` | array<OSPolicyAssignmentLabelSet> | List of label sets used for VM inclusion. If the list has more than one `LabelSet`, the VM is included if any of the label sets are applicable for the VM. |
| `inventories` | array<OSPolicyAssignmentInstanceFilterInventory> | List of inventories to select VMs. A VM is selected if its inventory data matches at least one of the following inventories. |
| `osShortNames` | array<string> | Deprecated. Use the `inventories` field instead. A VM is selected if it's OS short name matches with any of the values provided in this list. |

### `OSPolicyAssignmentInstanceFilterInventory`

- VM inventory details.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `osShortName` | string | Required. The OS short name |
| `osVersion` | string | The OS version Prefix matches are supported if asterisk(\*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. |

### `OSPolicyAssignmentLabelSet`

- Message representing label set. \* A label is a key value pair set for a VM. \* A LabelSet is a set of labels. \* Labels within a LabelSet are ANDed. In other words, a LabelSet is applicable for a VM only if it matches all the labels in the LabelSet. \* Example: A LabelSet with 2 labels: `env=prod` and `type=webserver` will only be applicable for those VMs with both labels present.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `labels` | object | Labels are identified by key/value pairs in this map. A VM should contain all the key/value pairs specified in this map to be selected. |

### `OSPolicyAssignmentOperationMetadata`

- OS policy assignment operation metadata provided by OS policy assignment API methods that return long running operations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiMethod` | string enum | The OS policy assignment API method. Values: `API_METHOD_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`. |
| `osPolicyAssignment` | string | Reference to the `OSPolicyAssignment` API resource. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` |
| `rolloutStartTime` | string (google-datetime) | Rollout start time |
| `rolloutState` | string enum | State of the rollout Values: `ROLLOUT_STATE_UNSPECIFIED`, `IN_PROGRESS`, `CANCELLING`, `CANCELLED`, `SUCCEEDED`. |
| `rolloutUpdateTime` | string (google-datetime) | Rollout update time |

### `OSPolicyAssignmentReport`

- A report of the OS policy assignment status for a given instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instance` | string | The Compute Engine VM instance name. |
| `lastRunId` | string | Unique identifier of the last attempted run to apply the OS policies associated with this assignment on the VM. This ID is logged by the OS Config agent while applying the OS policies associated with this assignment on the VM. NOTE: If the service is unable to successfully connect to the agent for this run, then this id will not be available in the agent logs. |
| `name` | string | The `OSPolicyAssignmentReport` API resource name. Format: `projects/{project_number}/locations/{location}/instances/{instance_id}/osPolicyAssignments/{os_policy_assignment_id}/report` |
| `osPolicyAssignment` | string | Reference to the `OSPolicyAssignment` API resource that the `OSPolicy` belongs to. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}` |
| `osPolicyCompliances` | array<OSPolicyAssignmentReportOSPolicyCompliance> | Compliance data for each `OSPolicy` that is applied to the VM. |
| `updateTime` | string (google-datetime) | Timestamp for when the report was last generated. |

### `OSPolicyAssignmentReportOSPolicyCompliance`

- Compliance data for an OS policy
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceState` | string enum | The compliance state of the OS policy. Values: `UNKNOWN`, `COMPLIANT`, `NON_COMPLIANT`. |
| `complianceStateReason` | string | The reason for the OS policy to be in an unknown compliance state. This field is always populated when `compliance_state` is `UNKNOWN`. If populated, the field can contain one of the following values: \* `vm-not-running`: The VM was not running. \* `os-policies-not-supported-by-agent`: The version of the OS Config agent running on the VM does not support running OS policies. \* `no-agent-detected`: The OS Config agent is not detected for the VM. \* `resource-execution-errors`: The OS Config agent encountered errors while executing one or more resources in the policy. See `os_policy_resource_compliances` for details. \* `task-timeout`: The task sent to the agent to apply the policy timed out. \* `unexpected-agent-state`: The OS Config agent did not report the final status of the task that attempted to apply the policy. Instead, the agent unexpectedly started working on a different task. This mostly happens when the agent or VM unexpectedly restarts while applying OS policies. \* `internal-service-errors`: Internal service errors were encountered while attempting to apply the policy. \* `os-policy-execution-pending`: OS policy was assigned to the given VM, but was not executed yet. Typically this is a transient condition that will go away after the next policy execution cycle. |
| `osPolicyId` | string | The OS policy id |
| `osPolicyResourceCompliances` | array<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance> | Compliance data for each resource within the policy that is applied to the VM. |

### `OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance`

- Compliance data for an OS policy resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceState` | string enum | The compliance state of the resource. Values: `UNKNOWN`, `COMPLIANT`, `NON_COMPLIANT`. |
| `complianceStateReason` | string | A reason for the resource to be in the given compliance state. This field is always populated when `compliance_state` is `UNKNOWN`. The following values are supported when `compliance_state == UNKNOWN` \* `execution-errors`: Errors were encountered by the agent while executing the resource and the compliance state couldn't be determined. \* `execution-skipped-by-agent`: Resource execution was skipped by the agent because errors were encountered while executing prior resources in the OS policy. \* `os-policy-execution-attempt-failed`: The execution of the OS policy containing this resource failed and the compliance state couldn't be determined. \* `os-policy-execution-pending`: OS policy that owns this resource was assigned to the given VM, but was not executed yet. |
| `configSteps` | array<OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep> | Ordered list of configuration completed by the agent for the OS policy resource. |
| `execResourceOutput` | OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput | ExecResource specific output. |
| `osPolicyResourceId` | string | The ID of the OS policy resource. |

### `OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput`

- ExecResource specific output.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enforcementOutput` | string (byte) | Output from enforcement phase output file (if run). Output size is limited to 100K bytes. |

### `OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep`

- Step performed by the OS Config agent for configuring an `OSPolicy` resource to its desired state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | An error message recorded during the execution of this step. Only populated if errors were encountered during this step execution. |
| `type` | string enum | Configuration step type. Values: `TYPE_UNSPECIFIED`, `VALIDATION`, `DESIRED_STATE_CHECK`, `DESIRED_STATE_ENFORCEMENT`, `DESIRED_STATE_CHECK_POST_ENFORCEMENT`. |

### `OSPolicyAssignmentRollout`

- Message to configure the rollout at the zonal level for the OS policy assignment.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `disruptionBudget` | FixedOrPercent | Required. The maximum number (or percentage) of VMs per zone to disrupt at any given moment. |
| `minWaitDuration` | string (google-duration) | Required. This determines the minimum duration of time to wait after the configuration changes are applied through the current rollout. A VM continues to count towards the `disruption_budget` at least until this duration of time has passed after configuration changes are applied. |

### `OSPolicyInventoryFilter`

- Filtering criteria to select VMs based on inventory details.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `osShortName` | string | Required. The OS short name |
| `osVersion` | string | The OS version Prefix matches are supported if asterisk(\*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` An empty string matches all OS versions. |

### `OSPolicyOSFilter`

- Filtering criteria to select VMs based on OS details.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `osShortName` | string | This should match OS short name emitted by the OS inventory agent. An empty value matches any OS. |
| `osVersion` | string | This value should match the version emitted by the OS inventory agent. Prefix matches are supported if asterisk(\*) is provided as the last character. For example, to match all versions with a major version of `7`, specify the following value for this field `7.*` |

### `OSPolicyResource`

- An OS policy resource is used to define the desired state configuration and provides a specific functionality like installing/removing packages, executing a script etc. The system ensures that resources are always in their desired state by taking necessary actions if they have drifted from their desired state.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exec` | OSPolicyResourceExecResource | Exec resource |
| `file` | OSPolicyResourceFileResource | File resource |
| `id` | string | Required. The id of the resource with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the OS policy. |
| `pkg` | OSPolicyResourcePackageResource | Package resource |
| `repository` | OSPolicyResourceRepositoryResource | Package repository resource |

### `OSPolicyResourceCompliance`

- Compliance data for an OS policy resource.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `configSteps` | array<OSPolicyResourceConfigStep> | Ordered list of configuration steps taken by the agent for the OS policy resource. |
| `execResourceOutput` | OSPolicyResourceComplianceExecResourceOutput | ExecResource specific output. |
| `osPolicyResourceId` | string | The id of the OS policy resource. |
| `state` | string enum | Compliance state of the OS policy resource. Values: `OS_POLICY_COMPLIANCE_STATE_UNSPECIFIED`, `COMPLIANT`, `NON_COMPLIANT`, `UNKNOWN`, `NO_OS_POLICIES_APPLICABLE`. |

### `OSPolicyResourceComplianceExecResourceOutput`

- ExecResource specific output.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `enforcementOutput` | string (byte) | Output from Enforcement phase output file (if run). Output size is limited to 100K bytes. |

### `OSPolicyResourceConfigStep`

- Step performed by the OS Config agent for configuring an `OSPolicyResource` to its desired state.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | An error message recorded during the execution of this step. Only populated when outcome is FAILED. |
| `outcome` | string enum | Outcome of the configuration step. Values: `OUTCOME_UNSPECIFIED`, `SUCCEEDED`, `FAILED`. |
| `type` | string enum | Configuration step type. Values: `TYPE_UNSPECIFIED`, `VALIDATION`, `DESIRED_STATE_CHECK`, `DESIRED_STATE_ENFORCEMENT`, `DESIRED_STATE_CHECK_POST_ENFORCEMENT`. |

### `OSPolicyResourceExecResource`

- A resource that allows executing scripts on the VM. The `ExecResource` has 2 stages: `validate` and `enforce` and both stages accept a script as an argument to execute. When the `ExecResource` is applied by the agent, it first executes the script in the `validate` stage. The `validate` stage can signal that the `ExecResource` is already in the desired state by returning an exit code of `100`. If the `ExecResource` is not in the desired state, it should return an exit code of `101`. Any other exit code returned by this stage is considered an error. If the `ExecResource` is not in the desired state based on the exit code from the `validate` stage, the agent proceeds to execute the script from the `enforce` stage. If the `ExecResource` is already in the desired state, the `enforce` stage will not be run. Similar to `validate` stage, the `enforce` stage should return an exit code of `100` to indicate that the resource in now in its desired state. Any other exit code is considered an error. NOTE: An exit code of `100` was chosen over `0` (and `101` vs `1`) to have an explicit indicator of `in desired state`, `not in desired state` and errors. Because, for example, Powershell will always return an exit code of `0` unless an `exit` statement is provided in the script. So, for reasons of consistency and being explicit, exit codes `100` and `101` were chosen.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enforce` | OSPolicyResourceExecResourceExec | What to run to bring this resource into the desired state. An exit code of 100 indicates "success", any other exit code indicates a failure running enforce. |
| `validate` | OSPolicyResourceExecResourceExec | Required. What to run to validate this resource is in the desired state. An exit code of 100 indicates "in desired state", and exit code of 101 indicates "not in desired state". Any other exit code indicates a failure running validate. |

### `OSPolicyResourceExecResourceExec`

- A file or script to execute.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `args` | array<string> | Optional arguments to pass to the source during execution. |
| `file` | OSPolicyResourceFile | A remote or local file. |
| `interpreter` | string enum | Required. The script interpreter to use. Values: `INTERPRETER_UNSPECIFIED`, `NONE`, `SHELL`, `POWERSHELL`. |
| `outputFilePath` | string | Only recorded for enforce Exec. Path to an output file (that is created by this Exec) whose content will be recorded in OSPolicyResourceCompliance after a successful run. Absence or failure to read this file will result in this ExecResource being non-compliant. Output file size is limited to 500K bytes. |
| `script` | string | An inline script. The size of the script is limited to 32KiB. |

### `OSPolicyResourceFile`

- A remote or local file.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowInsecure` | boolean | Defaults to false. When false, files are subject to validations based on the file type: Remote: A checksum must be specified. Cloud Storage: An object generation number must be specified. |
| `gcs` | OSPolicyResourceFileGcs | A Cloud Storage object. |
| `localPath` | string | A local path within the VM to use. |
| `remote` | OSPolicyResourceFileRemote | A generic remote file. |

### `OSPolicyResourceFileGcs`

- Specifies a file available as a Cloud Storage Object.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. Bucket of the Cloud Storage object. |
| `generation` | string (int64) | Generation number of the Cloud Storage object. |
| `object` | string | Required. Name of the Cloud Storage object. |

### `OSPolicyResourceFileRemote`

- Specifies a file available via some URI.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `sha256Checksum` | string | SHA256 checksum of the remote file. |
| `uri` | string | Required. URI from which to fetch the object. It should contain both the protocol and path following the format `{protocol}://{location}`. |

### `OSPolicyResourceFileResource`

- A resource that manages the state of a file.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `content` | string | A file with this content. The size of the content is limited to 32KiB. |
| `file` | OSPolicyResourceFile | A remote or local source. |
| `path` | string | Required. The absolute path of the file within the VM. |
| `permissions` | string | Consists of three octal digits which represent, in order, the permissions of the owner, group, and other users for the file (similarly to the numeric mode used in the linux chmod utility). Each digit represents a three bit number with the 4 bit corresponding to the read permissions, the 2 bit corresponds to the write bit, and the one bit corresponds to the execute permission. Default behavior is 755. Below are some examples of permissions and their associated values: read, write, and execute: 7 read and execute: 5 read and write: 6 read only: 4 |
| `state` | string enum | Required. Desired state of the file. Values: `DESIRED_STATE_UNSPECIFIED`, `PRESENT`, `ABSENT`, `CONTENTS_MATCH`. |

### `OSPolicyResourceGroup`

- Resource groups provide a mechanism to group OS policy resources. Resource groups enable OS policy authors to create a single OS policy to be applied to VMs running different operating Systems. When the OS policy is applied to a target VM, the appropriate resource group within the OS policy is selected based on the `OSFilter` specified within the resource group.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `inventoryFilters` | array<OSPolicyInventoryFilter> | List of inventory filters for the resource group. The resources in this resource group are applied to the target VM if it satisfies at least one of the following inventory filters. For example, to apply this resource group to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items for the list with following values: inventory_filters\[0\].os_short_name='rhel' and inventory_filters\[1\].os_short_name='centos' If the list is empty, this resource group will be applied to the target VM unconditionally. |
| `resources` | array<OSPolicyResource> | Required. List of resources configured for this resource group. The resources are executed in the exact order specified here. |

### `OSPolicyResourceGroup` (v1alpha)

- Resource groups provide a mechanism to group OS policy resources. Resource groups enable OS policy authors to create a single OS policy to be applied to VMs running different operating Systems. When the OS policy is applied to a target VM, the appropriate resource group within the OS policy is selected based on the `OSFilter` specified within the resource group.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `inventoryFilters` | array<OSPolicyInventoryFilter> | List of inventory filters for the resource group. The resources in this resource group are applied to the target VM if it satisfies at least one of the following inventory filters. For example, to apply this resource group to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items for the list with following values: inventory_filters\[0\].os_short_name='rhel' and inventory_filters\[1\].os_short_name='centos' If the list is empty, this resource group will be applied to the target VM unconditionally. |
| `osFilter` | OSPolicyOSFilter | Deprecated. Use the `inventory_filters` field instead. Used to specify the OS filter for a resource group |
| `resources` | array<OSPolicyResource> | Required. List of resources configured for this resource group. The resources are executed in the exact order specified here. |

### `OSPolicyResourcePackageResource`

- A resource that manages a system package.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apt` | OSPolicyResourcePackageResourceAPT | A package managed by Apt. |
| `deb` | OSPolicyResourcePackageResourceDeb | A deb package file. |
| `desiredState` | string enum | Required. The desired state the agent should maintain for this package. Values: `DESIRED_STATE_UNSPECIFIED`, `INSTALLED`, `REMOVED`. |
| `googet` | OSPolicyResourcePackageResourceGooGet | A package managed by GooGet. |
| `msi` | OSPolicyResourcePackageResourceMSI | An MSI package. |
| `rpm` | OSPolicyResourcePackageResourceRPM | An rpm package file. |
| `yum` | OSPolicyResourcePackageResourceYUM | A package managed by YUM. |
| `zypper` | OSPolicyResourcePackageResourceZypper | A package managed by Zypper. |

### `OSPolicyResourcePackageResourceAPT`

- A package managed by APT. - install: `apt-get update && apt-get -y install [name]` - remove: `apt-get -y remove [name]`
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Package name. |

### `OSPolicyResourcePackageResourceDeb`

- A deb package file. dpkg packages only support INSTALLED state.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `pullDeps` | boolean | Whether dependencies should also be installed. - install when false: `dpkg -i package` - install when true: `apt-get update && apt-get -y install package.deb` |
| `source` | OSPolicyResourceFile | Required. A deb package. |

### `OSPolicyResourcePackageResourceGooGet`

- A package managed by GooGet. - install: `googet -noconfirm install package` - remove: `googet -noconfirm remove package`
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Package name. |

### `OSPolicyResourcePackageResourceMSI`

- An MSI package. MSI packages only support INSTALLED state.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `properties` | array<string> | Additional properties to use during installation. This should be in the format of Property=Setting. Appended to the defaults of `ACTION=INSTALL REBOOT=ReallySuppress`. |
| `source` | OSPolicyResourceFile | Required. The MSI package. |

### `OSPolicyResourcePackageResourceRPM`

- An RPM package file. RPM packages only support INSTALLED state.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `pullDeps` | boolean | Whether dependencies should also be installed. - install when false: `rpm --upgrade --replacepkgs package.rpm` - install when true: `yum -y install package.rpm` or `zypper -y install package.rpm` |
| `source` | OSPolicyResourceFile | Required. An rpm package. |

### `OSPolicyResourcePackageResourceYUM`

- A package managed by YUM. - install: `yum -y install package` - remove: `yum -y remove package`
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Package name. |

### `OSPolicyResourcePackageResourceZypper`

- A package managed by Zypper. - install: `zypper -y install package` - remove: `zypper -y rm package`
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Package name. |

### `OSPolicyResourceRepositoryResource`

- A resource that manages a package repository.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apt` | OSPolicyResourceRepositoryResourceAptRepository | An Apt Repository. |
| `goo` | OSPolicyResourceRepositoryResourceGooRepository | A Goo Repository. |
| `yum` | OSPolicyResourceRepositoryResourceYumRepository | A Yum Repository. |
| `zypper` | OSPolicyResourceRepositoryResourceZypperRepository | A Zypper Repository. |

### `OSPolicyResourceRepositoryResourceAptRepository`

- Represents a single apt package repository. These will be added to a repo file that will be managed at `/etc/apt/sources.list.d/google_osconfig.list`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `archiveType` | string enum | Required. Type of archive files in this repository. Values: `ARCHIVE_TYPE_UNSPECIFIED`, `DEB`, `DEB_SRC`. |
| `components` | array<string> | Required. List of components for this repository. Must contain at least one item. |
| `distribution` | string | Required. Distribution of this repository. |
| `gpgKey` | string | URI of the key file for this repository. The agent maintains a keyring at `/etc/apt/trusted.gpg.d/osconfig_agent_managed.gpg`. |
| `uri` | string | Required. URI for this repository. |

### `OSPolicyResourceRepositoryResourceGooRepository`

- Represents a Goo package repository. These are added to a repo file that is managed at `C:/ProgramData/GooGet/repos/google_osconfig.repo`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the repository. |
| `url` | string | Required. The url of the repository. |

### `OSPolicyResourceRepositoryResourceYumRepository`

- Represents a single yum package repository. These are added to a repo file that is managed at `/etc/yum.repos.d/google_osconfig.repo`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseUrl` | string | Required. The location of the repository directory. |
| `displayName` | string | The display name of the repository. |
| `gpgKeys` | array<string> | URIs of GPG keys. |
| `id` | string | Required. A one word, unique name for this repository. This is the `repo id` in the yum config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for resource conflicts. |

### `OSPolicyResourceRepositoryResourceZypperRepository`

- Represents a single zypper package repository. These are added to a repo file that is managed at `/etc/zypp/repos.d/google_osconfig.repo`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseUrl` | string | Required. The location of the repository directory. |
| `displayName` | string | The display name of the repository. |
| `gpgKeys` | array<string> | URIs of GPG keys. |
| `id` | string | Required. A one word, unique name for this repository. This is the `repo id` in the zypper config file and also the `display_name` if `display_name` is omitted. This id is also used as the unique identifier when checking for GuestPolicy conflicts. |

### `OneTimeSchedule`

- Sets the time for a one time patch deployment. Timestamp is in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executeTime` | string (google-datetime) | Required. The desired patch job execution time. |

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

### `Package`

- Package is a reference to the software package to be installed or removed. The agent on the VM instance uses the system package manager to apply the config. These are the commands that the agent uses to install or remove packages. Apt install: `apt-get update && apt-get -y install package1 package2 package3` remove: `apt-get -y remove package1 package2 package3` Yum install: `yum -y install package1 package2 package3` remove: `yum -y remove package1 package2 package3` Zypper install: `zypper install package1 package2 package3` remove: `zypper rm package1 package2` Googet install: `googet -noconfirm install package1 package2 package3` remove: `googet -noconfirm remove package1 package2 package3`
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `desiredState` | string enum | The desired_state the agent should maintain for this package. The default is to ensure the package is installed. Values: `DESIRED_STATE_UNSPECIFIED`, `INSTALLED`, `UPDATED`, `REMOVED`. |
| `manager` | string enum | Type of package manager that can be used to install this package. If a system does not have the package manager, the package is not installed or removed no error message is returned. By default, or if you specify `ANY`, the agent attempts to install and remove this package using the default package manager. This is useful when creating a policy that applies to different types of systems. The default behavior is ANY. Values: `MANAGER_UNSPECIFIED`, `ANY`, `APT`, `YUM`, `ZYPPER`, `GOO`. |
| `name` | string | Required. The name of the package. A package is uniquely identified for conflict validation by checking the package name and the manager(s) that the package targets. |

### `PackageRepository`

- A package repository.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `apt` | AptRepository | An Apt Repository. |
| `goo` | GooRepository | A Goo Repository. |
| `yum` | YumRepository | A Yum Repository. |
| `zypper` | ZypperRepository | A Zypper Repository. |

### `PatchConfig`

- Patch configuration specifications. Contains details on how to apply the patch(es) to a VM instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apt` | AptSettings | Apt update settings. Use this setting to override the default `apt` patch rules. |
| `goo` | GooSettings | Goo update settings. Use this setting to override the default `goo` patch rules. |
| `migInstancesAllowed` | boolean | Allows the patch job to run on Managed instance groups (MIGs). |
| `postStep` | ExecStep | The `ExecStep` to run after the patch update. |
| `preStep` | ExecStep | The `ExecStep` to run before the patch update. |
| `rebootConfig` | string enum | Post-patch reboot settings. Values: `REBOOT_CONFIG_UNSPECIFIED`, `DEFAULT`, `ALWAYS`, `NEVER`. |
| `skipUnpatchableVms` | boolean | Optional. Enables enhanced reporting for the patch job: 1. The patch job skips instances that cannot be patched and reports them as `SKIPPED`. An instance cannot be patched for two reasons: 1. The instance runs Container-Optimized OS (COS), which cannot be patched. 2. The instance is part of a managed instance group (MIG), and patching MIG instances is disabled in the patch job's configuration (PatchConfig.migInstancesAllowed is `false`). 2. The patch job is reported as `SUCCEEDED` if it completes without errors, even if some instances are `SKIPPED`. 3. The patch job is reported as `COMPLETED_WITH_INACTIVE_VMS` if it completes without errors, but does not patch instances that are `INACTIVE`. |
| `windowsUpdate` | WindowsUpdateSettings | Windows update settings. Use this override the default windows patch rules. |
| `yum` | YumSettings | Yum update settings. Use this setting to override the default `yum` patch rules. |
| `zypper` | ZypperSettings | Zypper update settings. Use this setting to override the default `zypper` patch rules. |

### `PatchDeployment`

- Patch deployments are configurations that individual patch jobs use to complete a patch. These configurations include instance filter, package repository settings, and a schedule. For more information about creating and managing patch deployments, see Scheduling patch jobs (https://cloud.google.com/compute/docs/os-patch-management/schedule-patch-jobs).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time the patch deployment was created. Timestamp is in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `description` | string | Optional. Description of the patch deployment. Length of the description is limited to 1024 characters. |
| `duration` | string (google-duration) | Optional. Duration of the patch. After the duration ends, the patch times out. |
| `instanceFilter` | PatchInstanceFilter | Required. VM instances to patch. |
| `lastExecuteTime` | string (google-datetime) | Output only. The last time a patch job was started by this deployment. Timestamp is in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |
| `name` | string | Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment. |
| `oneTimeSchedule` | OneTimeSchedule | Required. Schedule a one-time execution. |
| `patchConfig` | PatchConfig | Optional. Patch configuration that is applied. |
| `recurringSchedule` | RecurringSchedule | Required. Schedule recurring executions. |
| `rollout` | PatchRollout | Optional. Rollout strategy of the patch job. |
| `state` | string enum | Output only. Current state of the patch deployment. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `PAUSED`. |
| `updateTime` | string (google-datetime) | Output only. Time the patch deployment was last updated. Timestamp is in RFC3339 (https://www.ietf.org/rfc/rfc3339.txt) text format. |

### `PatchInstanceFilter`

- A filter to target VM instances for patching. The targeted VMs must meet all criteria specified. So if both labels and zones are specified, the patch job targets only VMs with those labels and in those zones.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `all` | boolean | Target all VM instances in the project. If true, no other criteria is permitted. |
| `groupLabels` | array<PatchInstanceFilterGroupLabel> | Targets VM instances matching ANY of these GroupLabels. This allows targeting of disparate groups of VM instances. |
| `instanceNamePrefixes` | array<string> | Targets VMs whose name starts with one of these prefixes. Similar to labels, this is another way to group VMs when targeting configs, for example prefix="prod-". |
| `instances` | array<string> | Targets any of the VM instances specified. Instances are specified by their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`, `projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`, or `https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]` |
| `zones` | array<string> | Targets VM instances in ANY of these zones. Leave empty to target VM instances in any zone. |

### `PatchInstanceFilterGroupLabel`

- Targets a group of VM instances by using their assigned labels (https://cloud.google.com/compute/docs/labeling-resources). Labels are key-value pairs. A `GroupLabel` is a combination of labels that is used to target VMs for a patch job. For example, a patch job can target VMs that have the following `GroupLabel`: `{"env":"test", "app":"web"}`. This means that the patch job is applied to VMs that have both the labels `env=test` and `app=web`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Compute Engine instance labels that must be present for a VM instance to be targeted by this filter. |

### `PatchJob`

- A high level representation of a patch job that is either in progress or has completed. Instance details are not included in the job. To paginate through instance details, use `ListPatchJobInstanceDetails`. For more information about patch jobs, see Creating patch jobs (https://cloud.google.com/compute/docs/os-patch-management/create-patch-job).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Time this patch job was created. |
| `description` | string | Description of the patch job. Length of the description is limited to 1024 characters. |
| `displayName` | string | Display name for this patch job. This is not a unique identifier. |
| `dryRun` | boolean | If this patch job is a dry run, the agent reports that it has finished without running any updates on the VM instance. |
| `duration` | string (google-duration) | Duration of the patch job. After the duration ends, the patch job times out. |
| `errorMessage` | string | If this patch job failed, this message provides information about the failure. |
| `instanceDetailsSummary` | PatchJobInstanceDetailsSummary | Summary of instance details. |
| `instanceFilter` | PatchInstanceFilter | Instances to patch. |
| `name` | string | Unique identifier for this patch job in the form `projects/*/patchJobs/*` |
| `patchConfig` | PatchConfig | Patch configuration being applied. |
| `patchDeployment` | string | Output only. Name of the patch deployment that created this patch job. |
| `percentComplete` | number (double) | Reflects the overall progress of the patch job in the range of 0.0 being no progress to 100.0 being complete. |
| `rollout` | PatchRollout | Rollout strategy being applied. |
| `state` | string enum | The current state of the PatchJob. Values: `STATE_UNSPECIFIED`, `STARTED`, `INSTANCE_LOOKUP`, `PATCHING`, `SUCCEEDED`, `COMPLETED_WITH_INACTIVE_VMS`, `COMPLETED_WITH_ERRORS`, `CANCELED`, `TIMED_OUT`. |
| `updateTime` | string (google-datetime) | Last time this patch job was updated. |

### `PatchJobInstanceDetails`

- Patch details for a VM instance. For more information about reviewing VM instance details, see Listing all VM instance details for a specific patch job (https://cloud.google.com/compute/docs/os-patch-management/manage-patch-jobs#list-instance-details).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attemptCount` | string (int64) | The number of times the agent that the agent attempts to apply the patch. |
| `failureReason` | string | If the patch fails, this field provides the reason. |
| `instanceSystemId` | string | The unique identifier for the instance. This identifier is defined by the server. |
| `name` | string | The instance name in the form `projects/*/zones/*/instances/*` |
| `state` | string enum | Current state of instance patch. Values: `PATCH_STATE_UNSPECIFIED`, `PENDING`, `INACTIVE`, `NOTIFIED`, `STARTED`, `DOWNLOADING_PATCHES`, `APPLYING_PATCHES`, `REBOOTING`, `SUCCEEDED`, `SUCCEEDED_REBOOT_REQUIRED`, `FAILED`, `ACKED`, `TIMED_OUT`, `RUNNING_PRE_PATCH_STEP`, `RUNNING_POST_PATCH_STEP`, `NO_AGENT_DETECTED`, `SKIPPED`. |

### `PatchJobInstanceDetailsSummary`

- A summary of the current patch state across all instances that this patch job affects. Contains counts of instances in different states. These states map to `InstancePatchState`. List patch job instance details to see the specific states of each instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ackedInstanceCount` | string (int64) | Number of instances that have acked and will start shortly. |
| `applyingPatchesInstanceCount` | string (int64) | Number of instances that are applying patches. |
| `downloadingPatchesInstanceCount` | string (int64) | Number of instances that are downloading patches. |
| `failedInstanceCount` | string (int64) | Number of instances that failed. |
| `inactiveInstanceCount` | string (int64) | Number of instances that are inactive. |
| `noAgentDetectedInstanceCount` | string (int64) | Number of instances that do not appear to be running the agent. Check to ensure that the agent is installed, running, and able to communicate with the service. |
| `notifiedInstanceCount` | string (int64) | Number of instances notified about patch job. |
| `pendingInstanceCount` | string (int64) | Number of instances pending patch job. |
| `postPatchStepInstanceCount` | string (int64) | Number of instances that are running the post-patch step. |
| `prePatchStepInstanceCount` | string (int64) | Number of instances that are running the pre-patch step. |
| `rebootingInstanceCount` | string (int64) | Number of instances rebooting. |
| `skippedInstanceCount` | string (int64) | Number of instances that were skipped during patching. |
| `startedInstanceCount` | string (int64) | Number of instances that have started. |
| `succeededInstanceCount` | string (int64) | Number of instances that have completed successfully. |
| `succeededRebootRequiredInstanceCount` | string (int64) | Number of instances that require reboot. |
| `timedOutInstanceCount` | string (int64) | Number of instances that exceeded the time out while applying the patch. |

### `PatchRollout`

- Patch rollout configuration specifications. Contains details on the concurrency control when applying patch(es) to all targeted VMs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disruptionBudget` | FixedOrPercent | The maximum number (or percentage) of VMs per zone to disrupt at any given moment. The number of VMs calculated from multiplying the percentage by the total number of VMs in a zone is rounded up. During patching, a VM is considered disrupted from the time the agent is notified to begin until patching has completed. This disruption time includes the time to complete reboot and any post-patch steps. A VM contributes to the disruption budget if its patching operation fails either when applying the patches, running pre or post patch steps, or if it fails to respond with a success notification before timing out. VMs that are not running or do not have an active agent do not count toward this disruption budget. For zone-by-zone rollouts, if the disruption budget in a zone is exceeded, the patch job stops, because continuing to the next zone requires completion of the patch process in the previous zone. For example, if the disruption budget has a fixed value of `10`, and 8 VMs fail to patch in the current zone, the patch job continues to patch 2 VMs at a time until the zone is completed. When that zone is completed successfully, patching begins with 10 VMs at a time in the next zone. If 10 VMs in the next zone fail to patch, the patch job stops. |
| `mode` | string enum | Mode of the patch rollout. Values: `MODE_UNSPECIFIED`, `ZONE_BY_ZONE`, `CONCURRENT_ZONES`. |

### `PausePatchDeploymentRequest`

- A request message for pausing a patch deployment.
- Version: v1

### `ProjectFeatureSettings`

- ProjectFeatureSettings represents the VM Manager feature settings in a project. For more information, see Enable full VM Manager functionality.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Immutable. Name specifies the URL for the ProjectFeatureSettings resource: projects/project_id/locations/global/projectFeatureSettings. |
| `patchAndConfigFeatureSet` | string enum | Set PatchAndConfigFeatureSet for the project. Values: `PATCH_AND_CONFIG_FEATURE_SET_UNSPECIFIED`, `OSCONFIG_B`, `OSCONFIG_C`. |

### `RecurringSchedule`

- Sets the time for recurring patch deployments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. The end time at which a recurring patch deployment schedule is no longer active. |
| `frequency` | string enum | Required. The frequency unit of this recurring schedule. Values: `FREQUENCY_UNSPECIFIED`, `WEEKLY`, `MONTHLY`, `DAILY`. |
| `lastExecuteTime` | string (google-datetime) | Output only. The time the last patch job ran successfully. |
| `monthly` | MonthlySchedule | Required. Schedule with monthly executions. |
| `nextExecuteTime` | string (google-datetime) | Output only. The time the next patch job is scheduled to run. |
| `startTime` | string (google-datetime) | Optional. The time that the recurring schedule becomes effective. Defaults to `create_time` of the patch deployment. |
| `timeOfDay` | TimeOfDay | Required. Time of the day to run a recurring deployment. |
| `timeZone` | TimeZone | Required. Defines the time zone that `time_of_day` is relative to. The rules for daylight saving time are determined by the chosen time zone. |
| `weekly` | WeeklySchedule | Required. Schedule with weekly executions. |

### `ResumePatchDeploymentRequest`

- A request message for resuming a patch deployment.
- Version: v1

### `SoftwareRecipe`

- A software recipe is a set of instructions for installing and configuring a piece of software. It consists of a set of artifacts that are downloaded, and a set of steps that install, configure, and/or update the software. Recipes support installing and updating software from artifacts in the following formats: Zip archive, Tar archive, Windows MSI, Debian package, and RPM package. Additionally, recipes support executing a script (either defined in a file or directly in this api) in bash, sh, cmd, and powershell. Updating a software recipe If a recipe is assigned to an instance and there is a recipe with the same name but a lower version already installed and the assigned state of the recipe is `UPDATED`, then the recipe is updated to the new version. Script Working Directories Each script or execution step is run in its own temporary directory which is deleted after completing the step.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `artifacts` | array<SoftwareRecipeArtifact> | Resources available to be used in the steps in the recipe. |
| `desiredState` | string enum | Default is INSTALLED. The desired state the agent should maintain for this recipe. INSTALLED: The software recipe is installed on the instance but won't be updated to new versions. UPDATED: The software recipe is installed on the instance. The recipe is updated to a higher version, if a higher version of the recipe is assigned to this instance. REMOVE: Remove is unsupported for software recipes and attempts to create or update a recipe to the REMOVE state is rejected. Values: `DESIRED_STATE_UNSPECIFIED`, `INSTALLED`, `UPDATED`, `REMOVED`. |
| `installSteps` | array<SoftwareRecipeStep> | Actions to be taken for installing this recipe. On failure it stops executing steps and does not attempt another installation. Any steps taken (including partially completed steps) are not rolled back. |
| `name` | string | Required. Unique identifier for the recipe. Only one recipe with a given name is installed on an instance. Names are also used to identify resources which helps to determine whether guest policies have conflicts. This means that requests to create multiple recipes with the same name and version are rejected since they could potentially have conflicting assignments. |
| `updateSteps` | array<SoftwareRecipeStep> | Actions to be taken for updating this recipe. On failure it stops executing steps and does not attempt another update for this recipe. Any steps taken (including partially completed steps) are not rolled back. |
| `version` | string | The version of this software recipe. Version can be up to 4 period separated numbers (e.g. 12.34.56.78). |

### `SoftwareRecipeArtifact`

- Specifies a resource to be used in the recipe.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `allowInsecure` | boolean | Defaults to false. When false, recipes are subject to validations based on the artifact type: Remote: A checksum must be specified, and only protocols with transport-layer security are permitted. GCS: An object generation number must be specified. |
| `gcs` | SoftwareRecipeArtifactGcs | A Google Cloud Storage artifact. |
| `id` | string | Required. Id of the artifact, which the installation and update steps of this recipe can reference. Artifacts in a recipe cannot have the same id. |
| `remote` | SoftwareRecipeArtifactRemote | A generic remote artifact. |

### `SoftwareRecipeArtifactGcs`

- Specifies an artifact available as a Google Cloud Storage object.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Bucket of the Google Cloud Storage object. Given an example URL: `https://storage.googleapis.com/my-bucket/foo/bar#1234567` this value would be `my-bucket`. |
| `generation` | string (int64) | Must be provided if allow_insecure is false. Generation number of the Google Cloud Storage object. `https://storage.googleapis.com/my-bucket/foo/bar#1234567` this value would be `1234567`. |
| `object` | string | Name of the Google Cloud Storage object. As specified \[here\] (https://cloud.google.com/storage/docs/naming#objectnames) Given an example URL: `https://storage.googleapis.com/my-bucket/foo/bar#1234567` this value would be `foo/bar`. |

### `SoftwareRecipeArtifactRemote`

- Specifies an artifact available via some URI.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `checksum` | string | Must be provided if `allow_insecure` is `false`. SHA256 checksum in hex format, to compare to the checksum of the artifact. If the checksum is not empty and it doesn't match the artifact then the recipe installation fails before running any of the steps. |
| `uri` | string | URI from which to fetch the object. It should contain both the protocol and path following the format {protocol}://{location}. |

### `SoftwareRecipeStep`

- An action that can be taken as part of installing or updating a recipe.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `archiveExtraction` | SoftwareRecipeStepExtractArchive | Extracts an archive into the specified directory. |
| `dpkgInstallation` | SoftwareRecipeStepInstallDpkg | Installs a deb file via dpkg. |
| `fileCopy` | SoftwareRecipeStepCopyFile | Copies a file onto the instance. |
| `fileExec` | SoftwareRecipeStepExecFile | Executes an artifact or local file. |
| `msiInstallation` | SoftwareRecipeStepInstallMsi | Installs an MSI file. |
| `rpmInstallation` | SoftwareRecipeStepInstallRpm | Installs an rpm file via the rpm utility. |
| `scriptRun` | SoftwareRecipeStepRunScript | Runs commands in a shell. |

### `SoftwareRecipeStepCopyFile`

- Copies the artifact to the specified path on the instance.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Required. The id of the relevant artifact in the recipe. |
| `destination` | string | Required. The absolute path on the instance to put the file. |
| `overwrite` | boolean | Whether to allow this step to overwrite existing files. If this is false and the file already exists the file is not overwritten and the step is considered a success. Defaults to false. |
| `permissions` | string | Consists of three octal digits which represent, in order, the permissions of the owner, group, and other users for the file (similarly to the numeric mode used in the linux chmod utility). Each digit represents a three bit number with the 4 bit corresponding to the read permissions, the 2 bit corresponds to the write bit, and the one bit corresponds to the execute permission. Default behavior is 755. Below are some examples of permissions and their associated values: read, write, and execute: 7 read and execute: 5 read and write: 6 read only: 4 |

### `SoftwareRecipeStepExecFile`

- Executes an artifact or local file.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `allowedExitCodes` | array<integer> | Defaults to \[0\]. A list of possible return values that the program can return to indicate a success. |
| `args` | array<string> | Arguments to be passed to the provided executable. |
| `artifactId` | string | The id of the relevant artifact in the recipe. |
| `localPath` | string | The absolute path of the file on the local filesystem. |

### `SoftwareRecipeStepExtractArchive`

- Extracts an archive of the type specified in the specified directory.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Required. The id of the relevant artifact in the recipe. |
| `destination` | string | Directory to extract archive to. Defaults to `/` on Linux or `C:\` on Windows. |
| `type` | string enum | Required. The type of the archive to extract. Values: `ARCHIVE_TYPE_UNSPECIFIED`, `TAR`, `TAR_GZIP`, `TAR_BZIP`, `TAR_LZMA`, `TAR_XZ`, `ZIP`. |

### `SoftwareRecipeStepInstallDpkg`

- Installs a deb via dpkg.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Required. The id of the relevant artifact in the recipe. |

### `SoftwareRecipeStepInstallMsi`

- Installs an MSI file.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `allowedExitCodes` | array<integer> | Return codes that indicate that the software installed or updated successfully. Behaviour defaults to \[0\] |
| `artifactId` | string | Required. The id of the relevant artifact in the recipe. |
| `flags` | array<string> | The flags to use when installing the MSI defaults to \["/i"\] (i.e. the install flag). |

### `SoftwareRecipeStepInstallRpm`

- Installs an rpm file via the rpm utility.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `artifactId` | string | Required. The id of the relevant artifact in the recipe. |

### `SoftwareRecipeStepRunScript`

- Runs a script through an interpreter.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `allowedExitCodes` | array<integer> | Return codes that indicate that the software installed or updated successfully. Behaviour defaults to \[0\] |
| `interpreter` | string enum | The script interpreter to use to run the script. If no interpreter is specified the script is executed directly, which likely only succeed for scripts with shebang lines (https://en.wikipedia.org/wiki/Shebang\_\(Unix\)). Values: `INTERPRETER_UNSPECIFIED`, `SHELL`, `POWERSHELL`. |
| `script` | string | Required. The shell script to be executed. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StatusProto`

- Wire-format for a Status object
- Version: v2

| Field | Type | Description |
|---|---|---|
| `canonicalCode` | integer (int32) | copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 canonical_code = 6; |
| `code` | integer (int32) | Numeric code drawn from the space specified below. Often, this is the canonical error space, and code is drawn from google3/util/task/codes.proto copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional int32 code = 1; |
| `message` | string | Detail message copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional string message = 3; |
| `messageSet` | MessageSet | message_set associates an arbitrary proto message with the status. copybara:strip_begin(b/383363683) copybara:strip_end_and_replace optional proto2.bridge.MessageSet message_set = 5; |
| `space` | string | copybara:strip_begin(b/383363683) Space to which this status belongs copybara:strip_end_and_replace optional string space = 2; // Space to which this status belongs |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TimeZone`

- Represents a time zone from the IANA Time Zone Database (https://www.iana.org/time-zones).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | IANA Time Zone Database time zone. For example "America/New_York". |
| `version` | string | Optional. IANA Time Zone Database version number. For example "2019a". |

### Shape of `AptRepository`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "archiveType": "string enum",
  "components": "array<string>",
  "distribution": "string",
  "gpgKey": "string",
  "uri": "string"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta, v1beta, v1alpha of `osconfig` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://osconfig.googleapis.com/$discovery/rest?version=v2, https://osconfig.googleapis.com/$discovery/rest?version=v1, https://osconfig.googleapis.com/$discovery/rest?version=v2beta, https://osconfig.googleapis.com/$discovery/rest?version=v1beta, https://osconfig.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
