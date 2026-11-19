---
source: https://config.googleapis.com/$discovery/rest?version=v1
---

# Infrastructure Manager API message schemas (config)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/config/`.

### `ApplyResults`

- Outputs and artifacts from applying a deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifacts` | string | Location of artifacts (e.g. logs) in Google Cloud Storage. Format: `gs://{bucket}/{object}` |
| `content` | string | Location of a blueprint copy and other manifests in Google Cloud Storage. Format: `gs://{bucket}/{object}` |
| `outputs` | object | Map of output name to output info. |

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

### `AutoMigrationConfig`

- AutoMigrationConfig contains the automigration configuration for a project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoMigrationEnabled` | boolean | Optional. Whether the auto migration is enabled for the project. |
| `name` | string | Identifier. The name of the AutoMigrationConfig. Format: 'projects/{project_id}/locations/{location}/AutoMigrationConfig'. |
| `updateTime` | string (google-datetime) | Output only. Time the AutoMigrationConfig was last updated. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `DeleteStatefileRequest`

- A request to delete a state file passed to a 'DeleteStatefile' call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lockId` | string (int64) | Required. Lock ID of the lock file to verify that the user who is deleting the state file previously locked the Deployment. |

### `Deployment`

- A Deployment is a group of resources and configs managed and provisioned by Infra Manager.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Arbitrary key-value metadata storage e.g. to help client tools identify deployments during automation. See https://google.aip.dev/148#annotations for details on format and size limitations. |
| `artifactsGcsBucket` | string | User-defined location of Cloud Build logs and artifacts in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty. Default bucket format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` - The field cannot be updated, including changing its presence |
| `createTime` | string (google-datetime) | Output only. Time when the deployment was created. |
| `deleteBuild` | string | Output only. Cloud Build instance UUID associated with deleting this deployment. |
| `deleteLogs` | string | Output only. Location of Cloud Build logs in Google Cloud Storage, populated when deleting this deployment. Format: `gs://{bucket}/{object}`. |
| `deleteResults` | ApplyResults | Output only. Location of artifacts from a DeleteDeployment operation. |
| `errorCode` | string enum | Output only. Error code describing errors that may have occurred. Values: `ERROR_CODE_UNSPECIFIED`, `REVISION_FAILED`, `CLOUD_BUILD_PERMISSION_DENIED`, `DELETE_BUILD_API_FAILED`, `DELETE_BUILD_RUN_FAILED`, `BUCKET_CREATION_PERMISSION_DENIED`, `BUCKET_CREATION_FAILED`, `EXTERNAL_VALUE_SOURCE_IMPORT_FAILED`. |
| `errorLogs` | string | Output only. Location of Terraform error logs in Google Cloud Storage. Format: `gs://{bucket}/{object}`. |
| `importExistingResources` | boolean | By default, Infra Manager will return a failure when Terraform encounters a 409 code (resource conflict error) during actuation. If this flag is set to true, Infra Manager will instead attempt to automatically import the resource into the Terraform state (for supported resource types) and continue actuation. Not all resource types are supported, refer to documentation. |
| `labels` | object | Optional. User-defined metadata for the deployment. |
| `latestRevision` | string | Output only. Revision name that was most recently applied. Format: `projects/{project}/locations/{location}/deployments/{deployment}/ revisions/{revision}` |
| `lockState` | string enum | Output only. Current lock state of the deployment. Values: `LOCK_STATE_UNSPECIFIED`, `LOCKED`, `UNLOCKED`, `LOCKING`, `UNLOCKING`, `LOCK_FAILED`, `UNLOCK_FAILED`. |
| `name` | string | Identifier. Resource name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}` |
| `providerConfig` | ProviderConfig | Optional. This field specifies the provider configurations. |
| `quotaValidation` | string enum | Optional. Input to control quota checks for resources in terraform configuration files. There are limited resources on which quota validation applies. Values: `QUOTA_VALIDATION_UNSPECIFIED`, `ENABLED`, `ENFORCED`. |
| `serviceAccount` | string | Required. User-specified Service Account (SA) credentials to be used when actuating resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` |
| `state` | string enum | Output only. Current state of the deployment. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `UPDATING`, `DELETING`, `FAILED`, `SUSPENDED`, `DELETED`. |
| `stateDetail` | string | Output only. Additional information regarding the current state. |
| `terraformBlueprint` | TerraformBlueprint | A blueprint described using Terraform's HashiCorp Configuration Language as a root module. |
| `tfErrors` | array<TerraformError> | Output only. Errors encountered when deleting this deployment. Errors are truncated to 10 entries, see `delete_results` and `error_logs` for full details. |
| `tfVersion` | string | Output only. The current Terraform version set on the deployment. It is in the format of "Major.Minor.Patch", for example, "1.3.10". |
| `tfVersionConstraint` | string | The user-specified Terraform version constraint. Example: "=1.3.10". |
| `updateTime` | string (google-datetime) | Output only. Time when the deployment was last modified. |
| `workerPool` | string | The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used. |

### `DeploymentGroup`

- A DeploymentGroup is a collection of DeploymentUnits that in a DAG-like structure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Arbitrary key-value metadata storage e.g. to help client tools identify deployment group during automation. See https://google.aip.dev/148#annotations for details on format and size limitations. |
| `createTime` | string (google-datetime) | Output only. Time when the deployment group was created. |
| `deploymentUnits` | array<DeploymentUnit> | The deployment units of the deployment group in a DAG like structure. When a deployment group is being provisioned, the deployment units are deployed in a DAG order. The provided units must be in a DAG order, otherwise an error will be returned. |
| `labels` | object | Optional. User-defined metadata for the deployment group. |
| `name` | string | Identifier. The name of the deployment group. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}'. |
| `provisioningError` | Status | Output only. The error status of the deployment group provisioning or deprovisioning. |
| `provisioningState` | string enum | Output only. The provisioning state of the deployment group. Values: `PROVISIONING_STATE_UNSPECIFIED`, `PROVISIONING`, `PROVISIONED`, `FAILED_TO_PROVISION`, `DEPROVISIONING`, `DEPROVISIONED`, `FAILED_TO_DEPROVISION`. |
| `provisioningStateDescription` | string | Output only. Additional information regarding the current provisioning state. |
| `state` | string enum | Output only. Current state of the deployment group. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `UPDATING`, `DELETING`, `FAILED`, `SUSPENDED`, `DELETED`. |
| `stateDescription` | string | Output only. Additional information regarding the current state. |
| `updateTime` | string (google-datetime) | Output only. Time when the deployment group was last updated. |

### `DeploymentGroupRevision`

- A DeploymentGroupRevision represents a snapshot of a DeploymentGroup at a given point in time, created when a DeploymentGroup is provisioned or deprovisioned.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alternativeIds` | array<string> | Output only. The alternative IDs of the deployment group revision. |
| `createTime` | string (google-datetime) | Output only. Time when the deployment group revision was created. |
| `name` | string | Identifier. The name of the deployment group revision. Format: 'projects/{project_id}/locations/{location}/deploymentGroups/{deployment_group}/revisions/{revision}'. |
| `snapshot` | DeploymentGroup | Output only. The snapshot of the deployment group at this revision. |

### `DeploymentOperationMetadata`

- Ephemeral metadata content describing the state of a deployment operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applyResults` | ApplyResults | Outputs and artifacts from applying a deployment. |
| `applyResultsAvailable` | boolean | Output only. Indicating if early apply results are available. |
| `build` | string | Output only. Cloud Build instance UUID associated with this operation. |
| `logs` | string | Output only. Location of Deployment operations logs in `gs://{bucket}/{object}` format. |
| `step` | string enum | The current step the deployment operation is running. Values: `DEPLOYMENT_STEP_UNSPECIFIED`, `PREPARING_STORAGE_BUCKET`, `DOWNLOADING_BLUEPRINT`, `RUNNING_TF_INIT`, `RUNNING_TF_PLAN`, `RUNNING_TF_APPLY`, `RUNNING_TF_DESTROY`, `RUNNING_TF_VALIDATE`, `UNLOCKING_DEPLOYMENT`, `SUCCEEDED`, `FAILED`, `VALIDATING_REPOSITORY`, `RUNNING_QUOTA_VALIDATION`. |

### `DeploymentOperationSummary`

- The summary of the deployment operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifacts` | string | Output only. Location of Deployment operations artifacts in `gs://{bucket}/{object}` format. |
| `build` | string | Output only. Cloud Build instance UUID associated with this operation. |
| `content` | string | Output only. Location of Deployment operations content in `gs://{bucket}/{object}` format. |
| `deploymentStep` | string enum | Output only. The current step the deployment operation is running. Values: `DEPLOYMENT_STEP_UNSPECIFIED`, `PREPARING_STORAGE_BUCKET`, `DOWNLOADING_BLUEPRINT`, `RUNNING_TF_INIT`, `RUNNING_TF_PLAN`, `RUNNING_TF_APPLY`, `RUNNING_TF_DESTROY`, `RUNNING_TF_VALIDATE`, `UNLOCKING_DEPLOYMENT`, `SUCCEEDED`, `FAILED`, `VALIDATING_REPOSITORY`, `RUNNING_QUOTA_VALIDATION`. |
| `logs` | string | Output only. Location of Deployment operations logs in `gs://{bucket}/{object}` format. |

### `DeploymentSource`

- Configuration for a value sourced from a Deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployment` | string | Required. The resource name of the source Deployment to import the output from. Format: projects/{project}/locations/{location}/deployments/{deployment} The source deployment must be in the same project and location. |
| `outputName` | string | Required. The name of the output variable in the source deployment's latest successfully applied revision. |

### `DeploymentSpec`

- Spec for a deployment to be created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployment` | Deployment | Required. The deployment to be created. |
| `deploymentId` | string | Required. The id of the deployment to be created which doesn't include the project id and location. |

### `DeploymentUnit`

- A DeploymentUnit is a container for a deployment and its dependencies. An existing deployment can be provided directly in the unit, or the unit can act as a placeholder to define the DAG, with the deployment specs supplied in a `provisionDeploymentRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencies` | array<string> | Required. The IDs of the deployment units within the deployment group that this unit depends on. |
| `deployment` | string | Optional. The name of the deployment to be provisioned. Format: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |
| `id` | string | The id of the deployment unit. Must be unique within the deployment group. |

### `DeploymentUnitProgress`

- The progress of a deployment unit provisioning or deprovisioning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployment` | string | Output only. The name of the deployment to be provisioned. Format: 'projects/{project}/locations/{location}/deployments/{deployment}'. |
| `deploymentOperationSummary` | DeploymentOperationSummary | Output only. The summary of the deployment operation. |
| `error` | Status | Output only. Holds the error status of the deployment unit provisioning. |
| `intent` | string enum | Output only. The intent of the deployment unit. Values: `INTENT_UNSPECIFIED`, `CREATE_DEPLOYMENT`, `UPDATE_DEPLOYMENT`, `DELETE_DEPLOYMENT`, `RECREATE_DEPLOYMENT`, `CLEAN_UP`, `UNCHANGED`. |
| `state` | string enum | Output only. The current step of the deployment unit provisioning. Values: `STATE_UNSPECIFIED`, `QUEUED`, `APPLYING_DEPLOYMENT`, `SUCCEEDED`, `FAILED`, `ABORTED`, `SKIPPED`, `DELETING_DEPLOYMENT`, `PREVIEWING_DEPLOYMENT`. |
| `stateDescription` | string | Output only. Additional information regarding the current state. |
| `unitId` | string | Output only. The unit id of the deployment unit to be provisioned. |

### `DeprovisionDeploymentGroupRequest`

- The request message for the DeprovisionDeploymentGroup method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deletePolicy` | string enum | Optional. Policy on how resources within each deployment should be handled during deletion. This policy is applied globally to the deletion of all deployments in this group. This corresponds to the 'delete_policy' field in DeleteDeploymentRequest. Values: `DELETE_POLICY_UNSPECIFIED`, `DELETE`, `ABANDON`. |
| `force` | boolean | Optional. If set to true, this option is propagated to the deletion of each deployment in the group. This corresponds to the 'force' field in DeleteDeploymentRequest. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExportDeploymentStatefileRequest`

- A request to export a state file passed to a 'ExportDeploymentStatefile' call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `draft` | boolean | Optional. If this flag is set to true, the exported deployment state file will be the draft state. This will enable the draft file to be validated before copying it over to the working state on unlock. |

### `ExportPreviewResultRequest`

- A request to export preview results.
- Version: v1

### `ExportPreviewResultResponse`

- A response to `ExportPreviewResult` call. Contains preview results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `result` | PreviewResult | Output only. Signed URLs for accessing the plan files. |

### `ExportRevisionStatefileRequest`

- A request to export a state file passed to a 'ExportRevisionStatefile' call.
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExternalValueSource`

- Configuration for a source of an external value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentSource` | DeploymentSource | A source from a Deployment. |

### `GitSource`

- A set of files in a Git repository.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `directory` | string | Subdirectory inside the repository. Example: 'staging/my-package' |
| `ref` | string | Git reference (e.g. branch or tag). |
| `repo` | string | Repository URL. Example: 'https://github.com/kubernetes/examples.git' |

### `ImportStatefileRequest`

- A request to import a state file passed to a 'ImportStatefile' call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lockId` | string (int64) | Required. Lock ID of the lock file to verify that the user who is importing the state file previously locked the Deployment. |

### `ListDeploymentGroupRevisionsResponse`

- The response message for the ListDeploymentGroupRevisions method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentGroupRevisions` | array<DeploymentGroupRevision> | The deployment group revisions from the specified collection. |
| `nextPageToken` | string | Token to be supplied to the next ListDeploymentGroupRevisions request via `page_token` to obtain the next set of results. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListDeploymentGroupsResponse`

- The response message for the ListDeploymentGroups method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentGroups` | array<DeploymentGroup> | The deployment groups from the specified collection. |
| `nextPageToken` | string | Token to be supplied to the next ListDeploymentGroups request via `page_token` to obtain the next set of results. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDeploymentsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployments` | array<Deployment> | List of Deployments. |
| `nextPageToken` | string | Token to be supplied to the next ListDeployments request via `page_token` to obtain the next set of results. |
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

### `ListPreviewsResponse`

- A response to a `ListPreviews` call. Contains a list of Previews.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to be supplied to the next ListPreviews request via `page_token` to obtain the next set of results. |
| `previews` | array<Preview> | List of Previews. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListResourceChangesResponse`

- A response to a 'ListResourceChanges' call. Contains a list of ResourceChanges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the 'ListResourceChanges' method. The value of an empty string means that there are no more resources to return. |
| `resourceChanges` | array<ResourceChange> | List of ResourceChanges. |
| `unreachable` | array<string> | Unreachable resources, if any. |

### `ListResourceDriftsResponse`

- A response to a 'ListResourceDrifts' call. Contains a list of ResourceDrifts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the 'ListResourceDrifts' method. The value of an empty string means that there are no more resources to return. |
| `resourceDrifts` | array<ResourceDrift> | List of ResourceDrifts. |
| `unreachable` | array<string> | Unreachable resources, if any. |

### `ListResourcesResponse`

- A response to a 'ListResources' call. Contains a list of Resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the 'ListResources' method. The value of an empty string means that there are no more resources to return. |
| `resources` | array<Resource> | List of Resources. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRevisionsResponse`

- A response to a 'ListRevisions' call. Contains a list of Revisions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the 'ListRevisions' method. The value of an empty string means that there are no more resources to return. |
| `revisions` | array<Revision> | List of Revisions. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListTerraformVersionsResponse`

- The response message for the `ListTerraformVersions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to be supplied to the next ListTerraformVersions request via `page_token` to obtain the next set of results. |
| `terraformVersions` | array<TerraformVersion> | List of TerraformVersions. |
| `unreachable` | array<string> | Unreachable resources, if any. |

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

### `LockDeploymentRequest`

- A request to lock a deployment passed to a 'LockDeployment' call.
- Version: v1

### `LockInfo`

- Details about the lock which locked the deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Time that the lock was taken. |
| `info` | string | Extra information to store with the lock, provided by the caller. |
| `lockId` | string (int64) | Unique ID for the lock to be overridden with generation ID in the backend. |
| `operation` | string | Terraform operation, provided by the caller. |
| `version` | string | Terraform version |
| `who` | string | user@hostname when available |

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
| `createTime` | string (google-datetime) | Output only. Time when the operation was created. |
| `deploymentMetadata` | DeploymentOperationMetadata | Output only. Metadata about the deployment operation state. |
| `endTime` | string (google-datetime) | Output only. Time when the operation finished running. |
| `previewMetadata` | PreviewOperationMetadata | Output only. Metadata about the preview operation state. |
| `provisionDeploymentGroupMetadata` | ProvisionDeploymentGroupOperationMetadata | Output only. Metadata about ProvisionDeploymentGroup operation state. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Preview`

- A preview represents a set of actions Infra Manager would perform to move the resources towards the desired state as specified in the configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Optional. Arbitrary key-value metadata storage e.g. to help client tools identify preview during automation. See https://google.aip.dev/148#annotations for details on format and size limitations. |
| `artifactsGcsBucket` | string | User-defined location of Cloud Build logs, artifacts, and in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty Default Bucket Format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` If omitted and deployment resource ref provided has artifacts_gcs_bucket defined, that artifact bucket is used. |
| `build` | string | Output only. Cloud Build instance UUID associated with this preview. |
| `createTime` | string (google-datetime) | Output only. Time the preview was created. |
| `deployment` | string | Optional. Deployment reference. If specified, the preview will be performed using the provided deployment's current state and use any relevant fields from the deployment unless explicitly specified in the preview create request. |
| `errorCode` | string enum | Output only. Code describing any errors that may have occurred. Values: `ERROR_CODE_UNSPECIFIED`, `CLOUD_BUILD_PERMISSION_DENIED`, `BUCKET_CREATION_PERMISSION_DENIED`, `BUCKET_CREATION_FAILED`, `DEPLOYMENT_LOCK_ACQUIRE_FAILED`, `PREVIEW_BUILD_API_FAILED`, `PREVIEW_BUILD_RUN_FAILED`, `EXTERNAL_VALUE_SOURCE_IMPORT_FAILED`. |
| `errorLogs` | string | Output only. Link to tf-error.ndjson file, which contains the full list of the errors encountered during a Terraform preview. Format: `gs://{bucket}/{object}`. |
| `errorStatus` | Status | Output only. Additional information regarding the current state. |
| `labels` | object | Optional. User-defined labels for the preview. |
| `logs` | string | Output only. Location of preview logs in `gs://{bucket}/{object}` format. |
| `name` | string | Identifier. Resource name of the preview. Resource name can be user provided or server generated ID if unspecified. Format: `projects/{project}/locations/{location}/previews/{preview}` |
| `previewArtifacts` | PreviewArtifacts | Output only. Artifacts from preview. |
| `previewMode` | string enum | Optional. Current mode of preview. Values: `PREVIEW_MODE_UNSPECIFIED`, `DEFAULT`, `DELETE`. |
| `providerConfig` | ProviderConfig | Optional. This field specifies the provider configurations. |
| `serviceAccount` | string | Required. User-specified Service Account (SA) credentials to be used when previewing resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` |
| `state` | string enum | Output only. Current state of the preview. Values: `STATE_UNSPECIFIED`, `CREATING`, `SUCCEEDED`, `APPLYING`, `STALE`, `DELETING`, `FAILED`, `DELETED`. |
| `terraformBlueprint` | TerraformBlueprint | The terraform blueprint to preview. |
| `tfErrors` | array<TerraformError> | Output only. Summary of errors encountered during Terraform preview. It has a size limit of 10, i.e. only top 10 errors will be summarized here. |
| `tfVersion` | string | Output only. The current Terraform version set on the preview. It is in the format of "Major.Minor.Patch", for example, "1.3.10". |
| `tfVersionConstraint` | string | The user-specified Terraform version constraint. Example: "=1.3.10". |
| `workerPool` | string | The user-specified Worker Pool resource in which the Cloud Build job will execute. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} If this field is unspecified, the default Cloud Build worker pool will be used. If omitted and deployment resource ref provided has worker_pool defined, that worker pool is used. |

### `PreviewArtifacts`

- Artifacts created by preview.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `artifacts` | string | Output only. Location of artifacts in Google Cloud Storage. Format: `gs://{bucket}/{object}` |
| `content` | string | Output only. Location of a blueprint copy and other content in Google Cloud Storage. Format: `gs://{bucket}/{object}` |

### `PreviewOperationMetadata`

- Ephemeral metadata content describing the state of a preview operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `build` | string | Output only. Cloud Build instance UUID associated with this preview. |
| `logs` | string | Output only. Location of preview logs in `gs://{bucket}/{object}` format. |
| `previewArtifacts` | PreviewArtifacts | Artifacts from preview. |
| `step` | string enum | The current step the preview operation is running. Values: `PREVIEW_STEP_UNSPECIFIED`, `PREPARING_STORAGE_BUCKET`, `DOWNLOADING_BLUEPRINT`, `RUNNING_TF_INIT`, `RUNNING_TF_PLAN`, `FETCHING_DEPLOYMENT`, `LOCKING_DEPLOYMENT`, `UNLOCKING_DEPLOYMENT`, `SUCCEEDED`, `FAILED`, `VALIDATING_REPOSITORY`. |

### `PreviewResult`

- Contains a signed Cloud Storage URLs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binarySignedUri` | string | Output only. Plan binary signed URL |
| `jsonSignedUri` | string | Output only. Plan JSON signed URL |

### `PropertyChange`

- A property change represents a change to a property in the state file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `after` | any | Output only. Representations of the object value after the actions. |
| `afterSensitivePaths` | array<string> | Output only. The paths of sensitive fields in `after`. Paths are relative to `path`. |
| `before` | any | Output only. Representations of the object value before the actions. |
| `beforeSensitivePaths` | array<string> | Output only. The paths of sensitive fields in `before`. Paths are relative to `path`. |
| `path` | string | Output only. The path of the property change. |

### `PropertyDrift`

- A property drift represents a drift to a property in the state file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `after` | any | Output only. Representations of the object value after the actions. |
| `afterSensitivePaths` | array<string> | Output only. The paths of sensitive fields in `after`. Paths are relative to `path`. |
| `before` | any | Output only. Representations of the object value before the actions. |
| `beforeSensitivePaths` | array<string> | Output only. The paths of sensitive fields in `before`. Paths are relative to `path`. |
| `path` | string | Output only. The path of the property drift. |

### `ProviderConfig`

- ProviderConfig contains the provider configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceType` | string enum | Optional. ProviderSource specifies the source type of the provider. Values: `PROVIDER_SOURCE_UNSPECIFIED`, `SERVICE_MAINTAINED`. |

### `ProvisionDeploymentGroupOperationMetadata`

- Operation metadata for `ProvisionDeploymentGroup` and `DeprovisionDeploymentGroup` long-running operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentUnitProgresses` | array<DeploymentUnitProgress> | Output only. Progress information for each deployment unit within the operation. |
| `step` | string enum | Output only. The current step of the deployment group operation. Values: `PROVISION_DEPLOYMENT_GROUP_STEP_UNSPECIFIED`, `VALIDATING_DEPLOYMENT_GROUP`, `ASSOCIATING_DEPLOYMENTS_TO_DEPLOYMENT_GROUP`, `PROVISIONING_DEPLOYMENT_UNITS`, `DISASSOCIATING_DEPLOYMENTS_FROM_DEPLOYMENT_GROUP`, `SUCCEEDED`, `FAILED`, `DEPROVISIONING_DEPLOYMENT_UNITS`. |

### `ProvisionDeploymentGroupRequest`

- The request message for the ProvisionDeploymentGroup method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentSpecs` | object | Optional. The deployment specs of the deployment units to be created within the same project and location of the deployment group. The key is the unit ID, and the value is the `DeploymentSpec`. Provisioning will fail if a `deployment_spec` has a `deployment_id` that matches an existing deployment in the same project and location. If an existing deployment was part of the last successful revision but is no longer in the current DeploymentGroup's `deployment_units`, it will be recreated if included in `deployment_specs`. |

### `Resource`

- Resource represents a Google Cloud Platform resource actuated by IM. Resources are child resources of Revisions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caiAssets` | object | Output only. Map of Cloud Asset Inventory (CAI) type to CAI info (e.g. CAI ID). CAI type format follows https://cloud.google.com/asset-inventory/docs/supported-asset-types |
| `intent` | string enum | Output only. Intent of the resource. Values: `INTENT_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`, `RECREATE`, `UNCHANGED`. |
| `name` | string | Output only. Resource name. Format: `projects/{project}/locations/{location}/deployments/{deployment}/revisions/{revision}/resources/{resource}` |
| `state` | string enum | Output only. Current state of the resource. Values: `STATE_UNSPECIFIED`, `PLANNED`, `IN_PROGRESS`, `RECONCILED`, `FAILED`. |
| `terraformInfo` | ResourceTerraformInfo | Output only. Terraform-specific info if this resource was created using Terraform. |

### `ResourceCAIInfo`

- CAI info of a Resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | CAI resource name in the format following https://cloud.google.com/apis/design/resource_names#full_resource_name |

### `ResourceChange`

- A resource change represents a change to a resource in the state file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `intent` | string enum | Output only. The intent of the resource change. Values: `INTENT_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`, `RECREATE`, `UNCHANGED`. |
| `name` | string | Identifier. The name of the resource change. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceChanges/{resource_change}'. |
| `propertyChanges` | array<PropertyChange> | Output only. The property changes of the resource change. |
| `terraformInfo` | ResourceChangeTerraformInfo | Output only. Terraform info of the resource change. |

### `ResourceChangeTerraformInfo`

- Terraform info of a ResourceChange.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<string> | Output only. TF resource actions. |
| `address` | string | Output only. TF resource address that uniquely identifies the resource. |
| `provider` | string | Output only. TF resource provider. |
| `resourceName` | string | Output only. TF resource name. |
| `type` | string | Output only. TF resource type. |

### `ResourceDrift`

- A resource drift represents a drift to a resource in the state file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the resource drift. Format: 'projects/{project_id}/locations/{location}/previews/{preview}/resourceDrifts/{resource_drift}'. |
| `propertyDrifts` | array<PropertyDrift> | Output only. The property drifts of the resource drift. |
| `terraformInfo` | ResourceDriftTerraformInfo | Output only. Terraform info of the resource drift. |

### `ResourceDriftTerraformInfo`

- Terraform info of a ResourceChange.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | Output only. The address of the drifted resource. |
| `provider` | string | Output only. The provider of the drifted resource. |
| `resourceName` | string | Output only. TF resource name. |
| `type` | string | Output only. The type of the drifted resource. |

### `ResourceTerraformInfo`

- Terraform info of a Resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `address` | string | TF resource address that uniquely identifies this resource within this deployment. |
| `id` | string | ID attribute of the TF resource |
| `type` | string | TF resource type |

### `Revision`

- A child resource of a Deployment generated by a 'CreateDeployment' or 'UpdateDeployment' call. Each Revision contains metadata pertaining to a snapshot of a particular Deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Output only. The action which created this revision Values: `ACTION_UNSPECIFIED`, `CREATE`, `UPDATE`, `DELETE`. |
| `applyResults` | ApplyResults | Output only. Outputs and artifacts from applying a deployment. |
| `build` | string | Output only. Cloud Build instance UUID associated with this revision. |
| `createTime` | string (google-datetime) | Output only. Time when the revision was created. |
| `errorCode` | string enum | Output only. Code describing any errors that may have occurred. Values: `ERROR_CODE_UNSPECIFIED`, `CLOUD_BUILD_PERMISSION_DENIED`, `APPLY_BUILD_API_FAILED`, `APPLY_BUILD_RUN_FAILED`, `QUOTA_VALIDATION_FAILED`, `EXTERNAL_VALUE_SOURCE_IMPORT_FAILED`. |
| `errorLogs` | string | Output only. Location of Terraform error logs in Google Cloud Storage. Format: `gs://{bucket}/{object}`. |
| `importExistingResources` | boolean | Output only. By default, Infra Manager will return a failure when Terraform encounters a 409 code (resource conflict error) during actuation. If this flag is set to true, Infra Manager will instead attempt to automatically import the resource into the Terraform state (for supported resource types) and continue actuation. Not all resource types are supported, refer to documentation. |
| `logs` | string | Output only. Location of Revision operation logs in `gs://{bucket}/{object}` format. |
| `name` | string | Revision name. Format: `projects/{project}/locations/{location}/deployments/{deployment}/ revisions/{revision}` |
| `providerConfig` | ProviderConfig | Output only. This field specifies the provider configurations. |
| `quotaValidation` | string enum | Optional. Input to control quota checks for resources in terraform configuration files. There are limited resources on which quota validation applies. Values: `QUOTA_VALIDATION_UNSPECIFIED`, `ENABLED`, `ENFORCED`. |
| `quotaValidationResults` | string | Output only. Cloud Storage path containing quota validation results. This field is set when a user sets Deployment.quota_validation field to ENABLED or ENFORCED. Format: `gs://{bucket}/{object}`. |
| `serviceAccount` | string | Output only. User-specified Service Account (SA) to be used as credential to manage resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` |
| `state` | string enum | Output only. Current state of the revision. Values: `STATE_UNSPECIFIED`, `APPLYING`, `APPLIED`, `FAILED`. |
| `stateDetail` | string | Output only. Additional info regarding the current state. |
| `terraformBlueprint` | TerraformBlueprint | Output only. A blueprint described using Terraform's HashiCorp Configuration Language as a root module. |
| `tfErrors` | array<TerraformError> | Output only. Errors encountered when creating or updating this deployment. Errors are truncated to 10 entries, see `delete_results` and `error_logs` for full details. |
| `tfVersion` | string | Output only. The version of Terraform used to create the Revision. It is in the format of "Major.Minor.Patch", for example, "1.3.10". |
| `tfVersionConstraint` | string | Output only. The user-specified Terraform version constraint. Example: "=1.3.10". |
| `updateTime` | string (google-datetime) | Output only. Time when the revision was last modified. |
| `workerPool` | string | Output only. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Statefile`

- Contains info about a Terraform state file
- Version: v1

| Field | Type | Description |
|---|---|---|
| `signedUri` | string | Output only. Cloud Storage signed URI used for downloading or uploading the state file. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TerraformBlueprint`

- TerraformBlueprint describes the source of a Terraform root module which describes the resources and configs to be deployed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `externalValues` | object | Optional. Map of input variable names in this blueprint to configurations for importing values from external sources. |
| `gcsSource` | string | URI of an object in Google Cloud Storage. Format: `gs://{bucket}/{object}` URI may also specify an object version for zipped objects. Format: `gs://{bucket}/{object}#{version}` |
| `gitSource` | GitSource | URI of a public Git repo. |
| `inputValues` | object | Optional. Input variable values for the Terraform blueprint. |

### `TerraformError`

- Errors encountered during actuation using Terraform
- Version: v1

| Field | Type | Description |
|---|---|---|
| `error` | Status | Output only. Original error response from underlying Google API, if available. |
| `errorDescription` | string | A human-readable error description. |
| `httpResponseCode` | integer (int32) | HTTP response code returned from Google Cloud Platform APIs when Terraform fails to provision the resource. If unset or 0, no HTTP response code was returned by Terraform. |
| `resourceAddress` | string | Address of the resource associated with the error, e.g. `google_compute_network.vpc_network`. |

### `TerraformOutput`

- Describes a Terraform output.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sensitive` | boolean | Identifies whether Terraform has set this output as a potential sensitive value. |
| `value` | any | Value of output. |

### `TerraformVariable`

- A Terraform input variable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputValue` | any | Optional. Input variable value. |

### `TerraformVersion`

- A TerraformVersion represents the support state the corresponding Terraform version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deprecateTime` | string (google-datetime) | Output only. When the version is deprecated. |
| `name` | string | Identifier. The version name is in the format: 'projects/{project_id}/locations/{location}/terraformVersions/{terraform_version}'. |
| `obsoleteTime` | string (google-datetime) | Output only. When the version is obsolete. |
| `state` | string enum | Output only. The state of the version, ACTIVE, DEPRECATED or OBSOLETE. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `DEPRECATED`, `OBSOLETE`. |
| `supportTime` | string (google-datetime) | Output only. When the version is supported. |

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

### `UnlockDeploymentRequest`

- A request to unlock a state file passed to a 'UnlockDeployment' call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lockId` | string (int64) | Required. Lock ID of the lock file to be unlocked. |

### Shape of `ApplyResults`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "artifacts": "string",
  "content": "string",
  "outputs": "object"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `config` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://config.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
