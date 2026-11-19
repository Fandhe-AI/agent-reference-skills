---
source: https://workloadmanager.googleapis.com/$discovery/rest?version=v1
---

# Workload Manager API message schemas (workloadmanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/workloadmanager/`.

### `ActiveDirectory`

- Active Directory details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsAddress` | string | Optional. DNS IP address. |
| `domain` | string | Optional. Human readable form of a domain such as `example.com`. |
| `domainUsername` | string | Optional. Domain username. |
| `secretManagerSecret` | string | Required. Secret Manager secret. |
| `type` | string enum | Required. Active Directory type. Values: `ACTIVE_DIRECTORY_TYPE_UNSPECIFIED`, `GCP_MANAGED`, `SELF_MANAGED`. |

### `Actuation`

- The Actuation object represents the bootstrap state and output results of deployed infrastructure and software.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actuationOutput` | ActuationOutput | Output only. Actuation output. |
| `deploymentOutput` | array<DeploymentOutput> | Output only. Deployment output. |
| `endTime` | string (google-datetime) | Output only. End time stamp. |
| `name` | string | The name of the actuation resource. The format is projects/{project}/locations/{location}/deployments/{deployment}/actuations/{actuation}. |
| `startTime` | string (google-datetime) | Output only. Start time stamp. |
| `state` | string enum | Output only. Actuation state. Values: `STATE_UNSPECIFIED`, `INFRA_CREATING`, `SUCCEEDED`, `FAILED`, `POST_INFRA_CONFIGURING`, `INFRA_DESTROYING`, `TIMEOUT`. |

### `ActuationOutput`

- Message for output of actuation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actuateLogs` | string | A link to the Cloud Storage file that stores build logs. |
| `ansibleError` | string | Output only. Error message returned from Ansible. |
| `ansibleFailedTask` | array<string> | Output only. Failed task name returned from Ansible. |
| `blueprintId` | string | Reference to the Blueprint Controller deployment and revision resource. |
| `cloudbuildId` | string | Cloud Build instance UUID associated with this revision, without any suffix or prefix |
| `errorCode` | string enum | Output only. Code describing any errors that may have occurred. If not specified, there is no error in actuation. Values: `ERROR_CODE_UNSPECIFIED`, `TERRAFORM_FAILED`, `PERMISSION_DENIED_IN_TERRAFORM`, `QUOTA_EXCEED_IN_TERRAFORM`, `ANSIBLE_FAILED`, `CONSTRAINT_VIOLATION_IN_TERRAFORM`, `RESOURCE_ALREADY_EXISTS_IN_TERRAFORM`, `RESOURCE_UNAVAILABLE_IN_TERRAFORM`, `PERMISSION_DENIED_IN_ANSIBLE`, `INVALID_SECRET_IN_ANSIBLE`, `TERRAFORM_DELETION_FAILED`, `RESOURCE_IN_USE_IN_TERRAFORM_DELETION`, `ANSIBLE_START_FAILED`. |
| `errorLogs` | string | A link to the actuation Cloud Build log. |
| `hasUserFacingErrorMsg` | boolean | Output only. Whether the error message is user facing. If true, the error message will be shown in the UI. |
| `terraformError` | string | Output only. Error message returned from Terraform. |
| `terraformTemplate` | string | Reference to the Terraform template used. |

### `AgentCommand`

- An AgentCommand specifies a one-time executable program for the agent to run.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `command` | string | The name of the agent one-time executable that will be invoked. |
| `parameters` | object | A map of key/value pairs that can be used to specify additional one-time executable settings. |

### `AgentStates`

- Agent status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableVersion` | string | Optional. The available version of the agent in artifact registry. |
| `hanaMonitoring` | ServiceStates | Optional. HANA monitoring metrics of the agent. |
| `installedVersion` | string | Optional. The installed version of the agent on the host. |
| `isFullyEnabled` | boolean | Optional. Whether the agent is fully enabled. If false, the agent is has some issues. |
| `processMetrics` | ServiceStates | Optional. The Process metrics of the agent. |
| `systemDiscovery` | ServiceStates | Optional. The System discovery metrics of the agent. |

### `AgentStatus`

- The schema of agent status data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentName` | string | Output only. The name of the agent. |
| `availableVersion` | string | Output only. The available version of the agent in artifact registry. |
| `cloudApiAccessFullScopesGranted` | string enum | Output only. Whether the agent has full access to Cloud APIs. Values: `UNSPECIFIED_STATE`, `SUCCESS_STATE`, `FAILURE_STATE`, `ERROR_STATE`. |
| `configurationErrorMessage` | string | Output only. The error message for the agent configuration if invalid. |
| `configurationFilePath` | string | Output only. The path to the agent configuration file. |
| `configurationValid` | string enum | Output only. Whether the agent configuration is valid. Values: `UNSPECIFIED_STATE`, `SUCCESS_STATE`, `FAILURE_STATE`, `ERROR_STATE`. |
| `installedVersion` | string | Output only. The installed version of the agent on the host. |
| `instanceUri` | string | Output only. The URI of the instance. Format: projects//zones//instances/ |
| `kernelVersion` | SapDiscoveryResourceInstancePropertiesKernelVersion | Output only. The kernel version of the system. |
| `references` | array<AgentStatusReference> | Output only. Optional references to public documentation. |
| `services` | array<AgentStatusServiceStatus> | Output only. The services (process metrics, host metrics, etc.). |
| `systemdServiceEnabled` | string enum | Output only. Whether the agent service is enabled in systemd. Values: `UNSPECIFIED_STATE`, `SUCCESS_STATE`, `FAILURE_STATE`, `ERROR_STATE`. |
| `systemdServiceRunning` | string enum | Output only. Whether the agent service is running in systemd. Values: `UNSPECIFIED_STATE`, `SUCCESS_STATE`, `FAILURE_STATE`, `ERROR_STATE`. |

### `AgentStatusConfigValue`

- The configuration value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isDefault` | boolean | Output only. Whether the configuration value is the default value or overridden. |
| `name` | string | Output only. The name of the configuration value. |
| `value` | string | Output only. The value of the configuration value. |

### `AgentStatusIAMPermission`

- The IAM permission status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `granted` | string enum | Output only. Whether the permission is granted. Values: `UNSPECIFIED_STATE`, `SUCCESS_STATE`, `FAILURE_STATE`, `ERROR_STATE`. |
| `name` | string | Output only. The name of the permission. |

### `AgentStatusReference`

- The reference to public documentation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The name of the reference. |
| `url` | string | Output only. The URL of the reference. |

### `AgentStatusServiceStatus`

- The status of a service (process metrics, host metrics, etc.).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configValues` | array<AgentStatusConfigValue> | Output only. The configuration values for the service. |
| `errorMessage` | string | Output only. The error message for the service if it is not fully functional. |
| `fullyFunctional` | string enum | Output only. Whether the service is fully functional (all checks passed). Values: `UNSPECIFIED_STATE`, `SUCCESS_STATE`, `FAILURE_STATE`, `ERROR_STATE`. |
| `iamPermissions` | array<AgentStatusIAMPermission> | Output only. The permissions required for the service. |
| `name` | string | Output only. The name of the service. |
| `state` | string enum | Output only. The state of the service (enabled or disabled in the configuration). Values: `UNSPECIFIED_STATE`, `SUCCESS_STATE`, `FAILURE_STATE`, `ERROR_STATE`. |
| `unspecifiedStateMessage` | string | Output only. The message to display when the service state is unspecified. |

### `AppDetails`

- Message for SAP instance details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appInstanceId` | string | Optional. Instance ID for app. |
| `appServiceAccount` | string | Application service account. Let customers bring their own service account for the application. |
| `appVmNames` | array<string> | Optional. Customized VM names. |
| `ascsImage` | string | Required. Image for the ASCS server. |
| `ascsInstanceId` | string | Optional. Instance ID for ASCS. |
| `ascsMachineType` | string | Required. ASCS machine type. |
| `ascsServiceAccount` | string | ASCS service account. Let customers bring their own service account for ASCS. |
| `ascsVm` | string | Optional. ASCS VM name. |
| `ersInstanceId` | string | Optional. Instance ID for ERS. |
| `ersVm` | string | Optional. ERS VM name. |
| `image` | string | Required. Image for the app server and ASCS server. |
| `machineType` | string | Required. Machine type. |
| `secretManagerSecret` | string | Required. Secret Manager secret. |
| `sharedStorage` | string | Optional. Storage location. |
| `sid` | string | Required. The SAP SID is a three-digit server-specific unique identification code. |
| `vmsMultiplier` | integer (int32) | Required. VMs multiplier. |

### `BackupProperties`

- Backup properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latestBackupStatus` | string enum | Output only. The state of the latest backup. Values: `BACKUP_STATE_UNSPECIFIED`, `BACKUP_STATE_SUCCESS`, `BACKUP_STATE_FAILURE`. |
| `latestBackupTime` | string (google-datetime) | The time when the latest backup was performed. |

### `BigQueryDestination`

- BigQuery destination for evaluation results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createNewResultsTable` | boolean | Optional. Determines if a new results table will be created when an Execution is created. |
| `destinationDataset` | string | Optional. Destination dataset to save evaluation results. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CloudResource`

- The resource on GCP
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceProperties` | InstanceProperties | Output only. All instance properties. |
| `kind` | string enum | Output only. Values: `RESOURCE_KIND_UNSPECIFIED`, `RESOURCE_KIND_INSTANCE`, `RESOURCE_KIND_DISK`, `RESOURCE_KIND_ADDRESS`, `RESOURCE_KIND_FILESTORE`, `RESOURCE_KIND_HEALTH_CHECK`, `RESOURCE_KIND_FORWARDING_RULE`, `RESOURCE_KIND_BACKEND_SERVICE`, `RESOURCE_KIND_SUBNETWORK`, `RESOURCE_KIND_NETWORK`, `RESOURCE_KIND_PUBLIC_ADDRESS`, `RESOURCE_KIND_INSTANCE_GROUP`. |
| `name` | string | Output only. resource name Example: compute.googleapis.com/projects/wlm-obs-dev/zones/us-central1-a/instances/sap-pri |

### `Command`

- Command specifies the type of command to execute.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentCommand` | AgentCommand | AgentCommand specifies a one-time executable program for the agent to run. |
| `shellCommand` | ShellCommand | ShellCommand is invoked via the agent's command line executor. |

### `ComponentHealth`

- HealthCondition contains the detailed health check of each component.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `component` | string | The component of a workload. |
| `componentHealthChecks` | array<HealthCheck> | The detailed health checks of the component. |
| `componentHealthType` | string enum | Output only. The type of the component health. Values: `TYPE_UNSPECIFIED`, `TYPE_REQUIRED`, `TYPE_OPTIONAL`, `TYPE_SPECIAL`. |
| `state` | string enum | Output only. The health state of the component. Values: `HEALTH_STATE_UNSPECIFIED`, `HEALTHY`, `UNHEALTHY`, `CRITICAL`, `UNSUPPORTED`. |
| `subComponentsHealth` | array<ComponentHealth> | Sub component health. |

### `Database`

- Database details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskType` | string | Required. Disk type. |
| `floatingIpAddress` | string | Optional. Only useful for Linux High Availability setup. |
| `machineType` | string | Required. Machine type. |
| `secondarySoleTenantNode` | string | Optional. The name of a secondary-sole-tenant node/node group. |
| `secondarySoleTenantNodeType` | string | Optional. The type of a secondary-sole-tenant node/node group. E.g., compute.googleapis.com/node-name. |
| `secretManagerSecret` | string | Required. Secret Manager secret. |
| `smt` | boolean | Required. Whether simultaneous multithreading is enabled or not. |
| `soleTenantNode` | string | Optional. The name of a primary sole-tenant node/node group. |
| `soleTenantNodeType` | string | Optional. The type of a primary sole-tenant node/node group. E.g., compute.googleapis.com/node-name. |
| `tempdbOnSsd` | boolean | Required. Whether to have TempDB on local SSD. |
| `tenancyModel` | string enum | Required. SHARED or SOLE_TENANT. Values: `TENANCY_MODEL_UNSPECIFIED`, `SHARED`, `SOLE_TENANT`. |

### `DatabaseDetails`

- Message for SAP instance details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseServiceAccount` | string | Database service account. Let customers bring their own SA for the database. |
| `diskType` | string | Required. Disk type. |
| `image` | string | Required. Image for the database server. |
| `instanceId` | string | Optional. Instance ID. |
| `machineType` | string | Required. Machine type. |
| `primaryDbVm` | string | Optional. Primary DB VM name. |
| `secondaryDbVm` | string | Optional. Secondary DB VM name. |
| `secretManagerSecret` | string | Required. Secret Manager secret. |
| `sid` | string | Required. The SID is a three-digit server-specific unique identification code. |

### `DatabaseProperties`

- Database Properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupProperties` | BackupProperties | Output only. Backup properties. |
| `databaseType` | string enum | Output only. Type of the database. `HANA`, `DB2`, etc. Values: `DATABASE_TYPE_UNSPECIFIED`, `HANA`, `MAX_DB`, `DB2`, `ORACLE`, `SQLSERVER`, `ASE`. |

### `Deployment`

- The Deployment object represents user intent for deploying a specific type of workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create time stamp. |
| `description` | string | Description of the deployment. |
| `name` | string | The name of the deployment resource. The format is 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}'. |
| `sapSystemS4Config` | SapSystemS4Config | SAP system workload input. |
| `serviceAccount` | string | User-specified Service Account (SA) credentials to be used for Cloud Build. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}` The default Cloud Build SA will be used initially if this field is not set during deployment creation. |
| `sqlServerWorkload` | SqlServerWorkload | MS SQL workload input. |
| `state` | string enum | Output only. Current state of the deployment. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `UPDATING`, `DELETING`, `FAILED`. |
| `terraformVariables` | object | Optional. terraform_variables represents all the Terraform variables for the deployment workload. The key is the name of the Terraform variable, and the value is the TerraformVariable. For example: { "project_id": { "input_value": { "string_value": "my-project-id" } }, "zone": { "input_value": { "string_value": "us-central1-a" } } } |
| `updateTime` | string (google-datetime) | Output only. Update time stamp. |
| `workerPool` | string | Optional. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used. |
| `workloadType` | string enum | Optional. Workload type of the deployment. Values: `WORKLOAD_TYPE_UNSPECIFIED`, `SAP_S4`, `SQL_SERVER`, `ORACLE`. |

### `DeploymentOutput`

- Message for output of deployment resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the resource. |
| `type` | string | Type of the resource. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Evaluation`

- Represents a Workload Manager Evaluation configuration. An Evaluation defines a set of rules to be validated against a scope of Cloud resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bigQueryDestination` | BigQueryDestination | Optional. The BigQuery destination for detailed evaluation results. If this field is specified, the results of each evaluation execution are exported to BigQuery. |
| `createTime` | string (google-datetime) | Output only. \[Output only\] Create time stamp. |
| `customRulesBucket` | string | The Cloud Storage bucket name for custom rules. |
| `description` | string | Description of the Evaluation. |
| `evaluationType` | string enum | Evaluation type. Values: `EVALUATION_TYPE_UNSPECIFIED`, `SAP`, `SQL_SERVER`, `OTHER`. |
| `kmsKey` | string | Optional. Immutable. Customer-managed encryption key name, in the format projects/\*/locations/\*/keyRings/\*/cryptoKeys/\*. The key will be used for CMEK encryption of the evaluation resource. |
| `labels` | object | Labels as key value pairs. |
| `name` | string | Name of resource that has the form `projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}`. |
| `resourceFilter` | ResourceFilter | Resource filter for an evaluation defining the scope of resources to be evaluated. |
| `resourceStatus` | ResourceStatus | Output only. \[Output only\] The current lifecycle state of the evaluation resource. |
| `ruleNames` | array<string> | The names of the rules used for this evaluation. |
| `schedule` | string | Crontab format schedule for scheduled evaluation, currently only supports the following fixed schedules: \* `0 */1 * * *` # Hourly \* `0 */6 * * *` # Every 6 hours \* `0 */12 * * *` # Every 12 hours \* `0 0 */1 * *` # Daily \* `0 0 */7 * *` # Weekly \* `0 0 */14 * *` # Every 14 days \* `0 0 1 */1 *` # Monthly |
| `updateTime` | string (google-datetime) | Output only. \[Output only\] Update time stamp. |

### `Execution`

- Execution that represents a single run of an Evaluation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. \[Output only\] End time stamp. |
| `engine` | string enum | Optional. Engine. Values: `ENGINE_UNSPECIFIED`, `ENGINE_SCANNER`, `V2`. |
| `evaluationId` | string | Output only. \[Output only\] Evaluation ID. |
| `externalDataSources` | array<ExternalDataSources> | Optional. External data sources. |
| `inventoryTime` | string (google-datetime) | Output only. \[Output only\] Inventory time stamp. |
| `labels` | object | Labels as key value pairs. |
| `name` | string | The name of execution resource. The format is projects/{project}/locations/{location}/evaluations/{evaluation}/executions/{execution}. |
| `notices` | array<Notice> | Output only. Additional information generated by the execution. |
| `resultSummary` | Summary | Output only. \[Output only\] Result summary for the execution. |
| `ruleResults` | array<RuleExecutionResult> | Output only. Execution result summary per rule. |
| `runType` | string enum | Type which represents whether the execution executed directly by user or scheduled according to the `Evaluation.schedule` field. Values: `TYPE_UNSPECIFIED`, `ONE_TIME`, `SCHEDULED`. |
| `startTime` | string (google-datetime) | Output only. \[Output only\] Start time stamp. |
| `state` | string enum | Output only. \[Output only\] State. Values: `STATE_UNSPECIFIED`, `RUNNING`, `SUCCEEDED`, `FAILED`. |

### `ExecutionResult`

- The result of an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commands` | array<Command> | The commands to remediate the violation. |
| `documentationUrl` | string | The URL for the documentation of the rule. |
| `resource` | Resource | The resource that violates the rule. |
| `rule` | string | The rule that is violated in an evaluation. |
| `severity` | string | The severity of violation. |
| `type` | string enum | Execution result type of the scanned resource. Values: `TYPE_UNSPECIFIED`, `TYPE_PASSED`, `TYPE_VIOLATED`. |
| `violationDetails` | ViolationDetails | The details of violation in an evaluation result. |
| `violationMessage` | string | The violation message of an execution. |

### `ExternalDataSources`

- External data sources for an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string | Required. The asset type of the external data source. This can be a supported Cloud Asset Inventory asset type (see https://cloud.google.com/asset-inventory/docs/supported-asset-types) to override the default asset type, or it can be a custom type defined by the user. |
| `name` | string | Optional. Name of external data source. The name will be used inside the rego/sql to refer the external data. |
| `type` | string enum | Required. Type of external data source. Values: `TYPE_UNSPECIFIED`, `BIG_QUERY_TABLE`. |
| `uri` | string | Required. URI of external data source. example of bq table {project_ID}.{dataset_ID}.{table_ID}. |

### `GceInstanceFilter`

- A filter for matching Compute Engine instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAccounts` | array<string> | If non-empty, only Compute Engine instances associated with at least one of the provided service accounts will be included in the evaluation. |

### `HealthCheck`

- HealthCheck contains the detailed health check of a component based on asource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Output only. The message of the health check. |
| `metric` | string | Output only. The health check source metric name. |
| `resource` | CloudResource | Output only. The resource the check performs on. |
| `source` | string | Output only. The source of the health check. |
| `state` | string enum | Output only. The state of the health check. Values: `STATE_UNSPECIFIED`, `PASSED`, `FAILED`, `DEGRADED`, `SKIPPED`, `UNSUPPORTED`. |

### `IAMPermission`

- The IAM permission status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `granted` | boolean | Output only. Whether the permission is granted. |
| `name` | string | Output only. The name of the permission. |

### `Insight`

- A presentation of host resource usage where the workload runs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentStatus` | AgentStatus | The insights data for the agent status. |
| `instanceId` | string | Optional. The instance id where the insight is generated from |
| `openShiftValidation` | OpenShiftValidation | The insights data for the OpenShift workload validation. |
| `sapDiscovery` | SapDiscovery | The insights data for SAP system discovery. This is a copy of SAP System proto and should get updated whenever that one changes. |
| `sapValidation` | SapValidation | The insights data for the SAP workload validation. |
| `sentTime` | string (google-datetime) | Output only. \[Output only\] Create time stamp |
| `sqlserverValidation` | SqlserverValidation | The insights data for the sqlserver workload validation. |
| `torsoValidation` | TorsoValidation | The insights data for workload validation of torso workloads. |

### `InstanceProperties`

- Instance Properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceNumber` | string | Optional. Instance number. |
| `machineType` | string | Optional. Instance machine type. |
| `roles` | array<string> | Optional. Instance roles. Values: `INSTANCE_ROLE_UNSPECIFIED`, `INSTANCE_ROLE_ASCS`, `INSTANCE_ROLE_ERS`, `INSTANCE_ROLE_APP_SERVER`, `INSTANCE_ROLE_HANA_PRIMARY`, `INSTANCE_ROLE_HANA_SECONDARY`. |
| `sapInstanceProperties` | SapInstanceProperties | Optional. SAP Instance properties. |
| `status` | string | Optional. Instance status. |
| `upcomingMaintenanceEvent` | UpcomingMaintenanceEvent | Optional. the next maintenance event on VM |

### `ListActuationsResponse`

- The response object from `ListActuations`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actuations` | array<Actuation> | The list of actuations. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListDeploymentsResponse`

- Message for response to listing deployments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deployments` | array<Deployment> | The list of deployments. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Unordered list. Locations that could not be reached. |

### `ListDiscoveredProfilesResponse`

- List discovered profile Response returns discovered profiles from agents
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Output only. A token identifying a page of results the server should return |
| `unreachable` | array<string> | Locations that could not be reached. |
| `workloadProfiles` | array<WorkloadProfile> | Output only. The list of workload profiles |

### `ListEvaluationsResponse`

- Response message for the ListEvaluations RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `evaluations` | array<Evaluation> | The list of evaluations. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListExecutionResultsResponse`

- Response message for the ListExecutionResults RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionResults` | array<ExecutionResult> | The versions from the specified publisher. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListExecutionsResponse`

- Response message for the ListExecutions RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executions` | array<Execution> | The list of Execution. |
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

### `ListRulesResponse`

- Response message for the ListRules RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rules` | array<Rule> | All rules in response. |

### `ListScannedResourcesResponse`

- Response message for the ListScannedResources RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `scannedResources` | array<ScannedResource> | All scanned resources in response. |

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

### `LocationDetails`

- Message for SAP instance details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createCommsFirewall` | boolean | Optional. Create firewall. If true, creates a firewall for the deployment. This field provides an option to not always create a firewall for the deployment. |
| `customTags` | array<string> | Optional. Network tags. |
| `deploymentDnsEnabled` | boolean | Optional. When the user skips DNS configuration in the UI, `deployment_dns_enabled` is false; otherwise `deployment_dns_enabled` is true. |
| `dnsZone` | string | Optional. DNS zone name. |
| `dnsZoneNameSuffix` | string | Optional. DNS zone name suffix. |
| `internetAccess` | string enum | — Values: `INTERNETACCESS_UNSPECIFIED`, `ALLOW_EXTERNAL_IP`, `CONFIGURE_NAT`. |
| `networkProject` | string | Optional. Network project. |
| `regionName` | string | Required. Region name. |
| `subnetName` | string | Required. Subnet name. |
| `vpcName` | string | Required. VPC name. |
| `zone1Name` | string | Required. Zone 1 name. |
| `zone2Name` | string | Optional. Zone 2 name. |

### `Notice`

- Additional information generated by an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Output only. Message of the notice. |

### `OpenShiftValidation`

- A presentation of OpenShift workload insight. The schema of OpenShift workloads validation related data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterId` | string | Required. The OpenShift cluster ID (e.g. 8371bb05-7cac-4d38-82c0-0f58c4f6f936). |
| `validationDetails` | object | Required. The validation details of the OpenShift cluster in JSON format. |

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
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Pacemaker`

- Pacemaker configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucketNameNodeCertificates` | string | Required. Bucket location for node certificates. |
| `pacemakerCluster` | string | Required. Pacemaker cluster name. |
| `pacemakerClusterSecret` | string | Required. Pacemaker cluster secret name. |
| `pacemakerClusterUsername` | string | Required. Pacemaker cluster username. |
| `sqlPacemakerSecret` | string | Required. SQL Pacemaker secret name. |
| `sqlPacemakerUsername` | string | Required. SQL Pacemaker username. |

### `Product`

- Contains the details of a product.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the product. |
| `version` | string | Optional. Version of the product. |

### `Resource`

- Resource in execution result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the resource. |
| `serviceAccount` | string | The service account associated with the resource. |
| `type` | string | The type of resource. |

### `ResourceFilter`

- Resource filter for an evaluation defining the scope of resources to be evaluated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gceInstanceFilter` | GceInstanceFilter | Filter compute engine resources. |
| `inclusionLabels` | object | Labels to filter resources by. Each key-value pair in the map must exist on the resource for it to be included (e.g. VM instance labels). For example, specifying `{ "env": "prod", "database": "nosql" }` will only include resources that have labels `env=prod` and `database=nosql`. |
| `resourceIdPatterns` | array<string> | The pattern to filter resources by their id For example, a pattern of ".\*prod-cluster.\*" will match all resources that contain "prod-cluster" in their ID. |
| `scopes` | array<string> | The scopes of evaluation resource. Format: \* `projects/{project_id}` \* `folders/{folder_id}` \* `organizations/{organization_id}` |

### `ResourceStatus`

- The lifecycle status of an Evaluation resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | State of the Evaluation resource. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`. |

### `Rule`

- A rule to be evaluated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetType` | string | The CAI asset type of the rule is evaluating, for joined asset types, it will be the corresponding primary asset types. |
| `description` | string | Describe rule in plain language. |
| `displayName` | string | The name display in UI. |
| `errorMessage` | string | The message template for rule. |
| `name` | string | Rule name. |
| `primaryCategory` | string | The primary category. |
| `remediation` | string | The remediation for the rule. |
| `revisionId` | string | Output only. The version of the rule. |
| `ruleType` | string enum | The type of the rule. Values: `RULE_TYPE_UNSPECIFIED`, `BASELINE`, `CUSTOM`. |
| `secondaryCategory` | string | The secondary category. |
| `severity` | string | The severity of the rule. |
| `tags` | array<string> | List of user-defined tags. |
| `uri` | string | The document url for the rule. |

### `RuleExecutionResult`

- Execution result summary per rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | Execution message, if any. |
| `resultCount` | string (int64) | Number of violations. |
| `rule` | string | Rule name as plain text like `sap-hana-configured`. |
| `scannedResourceCount` | string (int64) | Number of total scanned resources. |
| `state` | string enum | Output only. The execution status. Values: `STATE_UNSPECIFIED`, `STATE_SUCCESS`, `STATE_FAILURE`, `STATE_SKIPPED`. |

### `RuleOutput`

- The rule output of the violation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | object | Output only. Violation details generated by rule. |
| `message` | string | Output only. The message generated by rule. |

### `RunEvaluationRequest`

- Request message for the RunEvaluation RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `execution` | Execution | Required. The resource being created. |
| `executionId` | string | Required. ID of the execution which will be created. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `SapComponent`

- The component of sap workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseProperties` | DatabaseProperties | Output only. All instance properties. |
| `haHosts` | array<string> | List of host URIs that are part of the HA configuration if present. An empty list indicates the component is not configured for HA. |
| `resources` | array<CloudResource> | Output only. resources in the component |
| `sid` | string | Output only. sid is the sap component identificator |
| `topologyType` | string enum | The detected topology of the component. Values: `TOPOLOGY_TYPE_UNSPECIFIED`, `TOPOLOGY_SCALE_UP`, `TOPOLOGY_SCALE_OUT`. |

### `SapDiscovery`

- The schema of SAP system discovery data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicationLayer` | SapDiscoveryComponent | Optional. An SAP system may run without an application layer. |
| `databaseLayer` | SapDiscoveryComponent | Required. An SAP System must have a database. |
| `metadata` | SapDiscoveryMetadata | Optional. The metadata for SAP system discovery data. |
| `projectNumber` | string | Optional. The GCP project number that this SapSystem belongs to. |
| `systemId` | string | Output only. A combination of database SID, database instance URI and tenant DB name to make a unique identifier per-system. |
| `updateTime` | string (google-datetime) | Required. Unix timestamp this system has been updated last. |
| `useDrReconciliation` | boolean | Optional. Whether to use DR reconciliation or not. |
| `workloadProperties` | SapDiscoveryWorkloadProperties | Optional. The properties of the workload. |

### `SapDiscoveryComponent`

- Message describing the system component.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applicationProperties` | SapDiscoveryComponentApplicationProperties | Optional. The component is a SAP application. |
| `databaseProperties` | SapDiscoveryComponentDatabaseProperties | Optional. The component is a SAP database. |
| `haHosts` | array<string> | Optional. A list of host URIs that are part of the HA configuration if present. An empty list indicates the component is not configured for HA. |
| `hostProject` | string | Required. Pantheon Project in which the resources reside. |
| `region` | string | Optional. The region this component's resources are primarily located in. |
| `replicationSites` | array<SapDiscoveryComponentReplicationSite> | Optional. A list of replication sites used in Disaster Recovery (DR) configurations. |
| `resources` | array<SapDiscoveryResource> | Optional. The resources in a component. |
| `sid` | string | Optional. The SAP identifier, used by the SAP software and helps differentiate systems for customers. |
| `topologyType` | string enum | Optional. The detected topology of the component. Values: `TOPOLOGY_TYPE_UNSPECIFIED`, `TOPOLOGY_SCALE_UP`, `TOPOLOGY_SCALE_OUT`. |

### `SapDiscoveryComponentApplicationProperties`

- A set of properties describing an SAP Application layer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `abap` | boolean | Optional. Deprecated: ApplicationType now tells you whether this is ABAP or Java. |
| `appInstanceNumber` | string | Optional. Instance number of the SAP application instance. |
| `applicationType` | string enum | Required. Type of the application. Netweaver, etc. Values: `APPLICATION_TYPE_UNSPECIFIED`, `NETWEAVER`, `NETWEAVER_ABAP`, `NETWEAVER_JAVA`. |
| `ascsInstanceNumber` | string | Optional. Instance number of the ASCS instance. |
| `ascsUri` | string | Optional. Resource URI of the recognized ASCS host of the application. |
| `ersInstanceNumber` | string | Optional. Instance number of the ERS instance. |
| `kernelVersion` | string | Optional. Kernel version for Netweaver running in the system. |
| `nfsUri` | string | Optional. Resource URI of the recognized shared NFS of the application. May be empty if the application server has only a single node. |

### `SapDiscoveryComponentDatabaseProperties`

- A set of properties describing an SAP Database layer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseSid` | string | Optional. SID of the system database. |
| `databaseType` | string enum | Required. Type of the database. HANA, DB2, etc. Values: `DATABASE_TYPE_UNSPECIFIED`, `HANA`, `MAX_DB`, `DB2`, `ORACLE`, `SQLSERVER`, `ASE`. |
| `databaseVersion` | string | Optional. The version of the database software running in the system. |
| `instanceNumber` | string | Optional. Instance number of the SAP instance. |
| `landscapeId` | string | Optional. Landscape ID from the HANA nameserver. |
| `primaryInstanceUri` | string | Required. URI of the recognized primary instance of the database. |
| `sharedNfsUri` | string | Optional. URI of the recognized shared NFS of the database. May be empty if the database has only a single node. |

### `SapDiscoveryComponentReplicationSite`

- A replication site used in Disaster Recovery (DR) configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `component` | SapDiscoveryComponent | Optional. The system component for the site. |
| `sourceSite` | string | Optional. The name of the source site from which this one replicates. |

### `SapDiscoveryMetadata`

- Message describing SAP discovery system metadata
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerRegion` | string | Optional. Customer region string for customer's use. Does not represent GCP region. |
| `definedSystem` | string | Optional. Customer defined, something like "E-commerce pre prod" |
| `environmentType` | string | Optional. Should be "prod", "QA", "dev", "staging", etc. |
| `sapProduct` | string | Optional. This SAP product name |

### `SapDiscoveryResource`

- Message describing a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceProperties` | SapDiscoveryResourceInstanceProperties | Optional. A set of properties only applying to instance type resources. |
| `relatedResources` | array<string> | Optional. A list of resource URIs related to this resource. |
| `resourceKind` | string enum | Required. ComputeInstance, ComputeDisk, VPC, Bare Metal server, etc. Values: `RESOURCE_KIND_UNSPECIFIED`, `RESOURCE_KIND_INSTANCE`, `RESOURCE_KIND_DISK`, `RESOURCE_KIND_ADDRESS`, `RESOURCE_KIND_FILESTORE`, `RESOURCE_KIND_HEALTH_CHECK`, `RESOURCE_KIND_FORWARDING_RULE`, `RESOURCE_KIND_BACKEND_SERVICE`, `RESOURCE_KIND_SUBNETWORK`, `RESOURCE_KIND_NETWORK`, `RESOURCE_KIND_PUBLIC_ADDRESS`, `RESOURCE_KIND_INSTANCE_GROUP`. |
| `resourceType` | string enum | Required. The type of this resource. Values: `RESOURCE_TYPE_UNSPECIFIED`, `RESOURCE_TYPE_COMPUTE`, `RESOURCE_TYPE_STORAGE`, `RESOURCE_TYPE_NETWORK`. |
| `resourceUri` | string | Required. URI of the resource, includes project, location, and name. |
| `updateTime` | string (google-datetime) | Required. Unix timestamp of when this resource last had its discovery data updated. |

### `SapDiscoveryResourceInstanceProperties`

- A set of properties only present for an instance type resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appInstances` | array<SapDiscoveryResourceInstancePropertiesAppInstance> | Optional. App server instances on the host |
| `clusterInstances` | array<string> | Optional. A list of instance URIs that are part of a cluster with this one. |
| `diskMounts` | array<SapDiscoveryResourceInstancePropertiesDiskMount> | Optional. Disk mounts on the instance. |
| `instanceNumber` | string (int64) | Optional. The VM's instance number. |
| `instanceRole` | string enum | Optional. Bitmask of instance role, a resource may have multiple roles at once. Values: `INSTANCE_ROLE_UNSPECIFIED`, `INSTANCE_ROLE_ASCS`, `INSTANCE_ROLE_ERS`, `INSTANCE_ROLE_APP_SERVER`, `INSTANCE_ROLE_DATABASE`, `INSTANCE_ROLE_ASCS_ERS`, `INSTANCE_ROLE_ASCS_APP_SERVER`, `INSTANCE_ROLE_ASCS_DATABASE`, `INSTANCE_ROLE_ERS_APP_SERVER`, `INSTANCE_ROLE_ERS_DATABASE`, `INSTANCE_ROLE_APP_SERVER_DATABASE`, `INSTANCE_ROLE_ASCS_ERS_APP_SERVER`, `INSTANCE_ROLE_ASCS_ERS_DATABASE`, `INSTANCE_ROLE_ASCS_APP_SERVER_DATABASE`, `INSTANCE_ROLE_ERS_APP_SERVER_DATABASE`, `INSTANCE_ROLE_ASCS_ERS_APP_SERVER_DATABASE`. |
| `isDrSite` | boolean | Optional. Instance is part of a DR site. |
| `osKernelVersion` | SapDiscoveryResourceInstancePropertiesKernelVersion | Optional. The kernel version of the instance. |
| `virtualHostname` | string | Optional. A virtual hostname of the instance if it has one. |

### `SapDiscoveryResourceInstancePropertiesAppInstance`

- Fields to describe an SAP application server instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Instance name of the SAP application instance. |
| `number` | string | Optional. Instance number of the SAP application instance. |

### `SapDiscoveryResourceInstancePropertiesDiskMount`

- Disk mount on the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diskNames` | array<string> | Optional. Names of the disks providing this mount point. |
| `mountPoint` | string | Optional. Filesystem mount point. |
| `name` | string | Optional. Name of the disk. |

### `SapDiscoveryResourceInstancePropertiesKernelVersion`

- KernelVersion encapsulates the kernel version data for the system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distroKernel` | SapDiscoveryResourceInstancePropertiesKernelVersionVersion | Optional. Captures the distro-specific kernel version, the portion of the string following the first dash. |
| `osKernel` | SapDiscoveryResourceInstancePropertiesKernelVersionVersion | Optional. Captures the OS-specific kernel version, the portion of the string up to the first dash. |
| `rawString` | string | Optional. Raw string of the kernel version. |

### `SapDiscoveryResourceInstancePropertiesKernelVersionVersion`

- Version is reported as Major.Minor.Build.Patch.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `build` | integer (int32) | Optional. The build version number. |
| `major` | integer (int32) | Optional. The major version number. |
| `minor` | integer (int32) | Optional. The minor version number. |
| `patch` | integer (int32) | Optional. The patch version number. |
| `remainder` | string | Optional. A catch-all for any unparsed version components. This is in case the number of points in the version string exceeds the expected count of 4. |

### `SapDiscoveryWorkloadProperties`

- A set of properties describing an SAP workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `productVersions` | array<SapDiscoveryWorkloadPropertiesProductVersion> | Optional. List of SAP Products and their versions running on the system. |
| `softwareComponentVersions` | array<SapDiscoveryWorkloadPropertiesSoftwareComponentProperties> | Optional. A list of SAP software components and their versions running on the system. |

### `SapDiscoveryWorkloadPropertiesProductVersion`

- A product name and version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the product. |
| `version` | string | Optional. Version of the product. |

### `SapDiscoveryWorkloadPropertiesSoftwareComponentProperties`

- A SAP software component name, version, and type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `extVersion` | string | Optional. The component's minor version. |
| `name` | string | Optional. Name of the component. |
| `type` | string | Optional. The component's type. |
| `version` | string | Optional. The component's major version. |

### `SapInstanceProperties`

- SAP instance properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentStates` | AgentStates | Optional. Sap Instance Agent status. |
| `numbers` | array<string> | Optional. SAP Instance numbers. They are from '00' to '99'. |

### `SapSystemS4Config`

- Message for SAP system workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowStoppingForUpdate` | boolean | — |
| `ansibleRunnerServiceAccount` | string | Ansible runner service account. Let customers bring their own service account for the Ansible runner. |
| `app` | AppDetails | Instance details. |
| `database` | DatabaseDetails | Database details. |
| `deploymentModel` | string enum | Required. Supports non-HA and HA models. Values: `DEPLOYMENT_MODEL_UNSPECIFIED`, `DISTRIBUTED`, `DISTRIBUTED_HA`. |
| `environmentType` | string enum | Required. Deployment environment. Values: `ENVIRONMENT_TYPE_UNSPECIFIED`, `NON_PRODUCTION`, `PRODUCTION`. |
| `gcpProjectId` | string | The project that infrastructure is deployed in. Currently only supports the same project where the deployment resource exists. |
| `location` | LocationDetails | Database details. |
| `mediaBucketName` | string | Required. Media bucket name. |
| `sapBootDiskImage` | string | Optional. SAP boot disk image. |
| `scalingMethod` | string enum | Required. Supports scale up and scale out. Values: `SCALE_METHOD_UNSPECIFIED`, `SCALE_UP`, `SCALE_OUT`. |
| `version` | string enum | Required. SAP HANA version. Values: `VERSION_UNSPECIFIED`, `S4_HANA_2021`, `S4_HANA_2022`, `S4_HANA_2023`. |
| `vmPrefix` | string | VM prefix. |

### `SapValidation`

- A presentation of SAP workload insight. The schema of SAP workloads validation related data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. The project_id of the cloud project that the Insight data comes from. |
| `validationDetails` | array<SapValidationValidationDetail> | Optional. A list of SAP validation metrics data. |
| `zone` | string | Optional. The zone of the instance that the Insight data comes from. |

### `SapValidationValidationDetail`

- Message describing the SAP validation metrics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | object | Optional. The pairs of metrics data: field name & field value. |
| `isPresent` | boolean | Optional. Was there a SAP system detected for this validation type. |
| `sapValidationType` | string enum | Optional. The SAP system that the validation data is from. Values: `SAP_VALIDATION_TYPE_UNSPECIFIED`, `SYSTEM`, `COROSYNC`, `PACEMAKER`, `HANA`, `NETWEAVER`, `HANA_SECURITY`, `CUSTOM`. |

### `SapWorkload`

- The body of sap workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `application` | SapComponent | Output only. application component |
| `architecture` | string enum | Output only. The architecture. Values: `ARCHITECTURE_UNSPECIFIED`, `INVALID`, `CENTRALIZED`, `DISTRIBUTED`, `DISTRIBUTED_HA`, `STANDALONE_DATABASE`, `STANDALONE_DATABASE_HA`. |
| `database` | SapComponent | Output only. database component |
| `metadata` | object | Output only. The metadata for SAP workload. |
| `products` | array<Product> | Output only. The products on this workload. |

### `ScannedResource`

- A scanned resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resource` | string | Resource name. |
| `type` | string | Resource type. |

### `ServiceStates`

- The state of the service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `iamPermissions` | array<IAMPermission> | Optional. Output only. The IAM permissions for the service. |
| `state` | string enum | Output only. The overall state of the service. Values: `STATE_UNSPECIFIED`, `CONFIG_FAILURE`, `IAM_FAILURE`, `FUNCTIONALITY_FAILURE`, `ENABLED`, `DISABLED`. |

### `ShellCommand`

- A ShellCommand is invoked via the agent's command line executor.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | string | Arguments to be passed to the command. |
| `command` | string | The name of the command to be executed. |
| `timeoutSeconds` | integer (int32) | Optional. If not specified, the default timeout is 60 seconds. |

### `SqlLocationDetails`

- Location and networking details for configuring SQL server workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsZone` | string | Optional. Create a new DNS zone when the field is empty. Only shown for `Using an existing DNS`. List of existing DNS zones. Terraform variable name: existing_dns_zone_name. |
| `gcpProjectId` | string | Required. The project that infrastructure is deployed in. Currently only supports the same project where the deployment resource exists. |
| `internetAccess` | string enum | Required. Internet Access. Values: `INTERNET_ACCESS_UNSPECIFIED`, `ALLOW_EXTERNAL_IP`, `CONFIGURE_NAT`. |
| `network` | string | Required. Network name. |
| `primaryZone` | string | Required. Primary zone. |
| `region` | string | Required. Region name. |
| `secondaryZone` | string | Optional. Secondary zone cannot be the same as primary_zone and is only for High Availability deployment mode. |
| `subnetwork` | string | Required. Subnetwork name. |
| `tertiaryZone` | string | Optional. Tertiary zone cannot be the same as primary_zone and secondary_zone, and it is only for High Availability deployment mode. |

### `SqlServerWorkload`

- Message for MS SQL workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeDirectory` | ActiveDirectory | Required. Active Directory details. |
| `computeEngineServiceAccount` | string | Compute Engine service account. Let customers bring their own service account for Compute Engine. |
| `database` | Database | Required. Database details. |
| `deploymentModel` | string enum | Required. HIGH_AVAILABILITY or SINGLE_INSTANCE. Values: `DEPLOYMENT_MODEL_UNSPECIFIED`, `HIGH_AVAILABILITY`, `SINGLE_INSTANCE`. |
| `environmentType` | string enum | Required. Deployment environment. Values: `ENVIRONMENT_TYPE_UNSPECIFIED`, `NON_PRODUCTION`, `PRODUCTION`. |
| `fciType` | string enum | Optional. SHARED_DISK or S2D. Values: `FCI_TYPE_UNSPECIFIED`, `SHARED_DISK`, `S2D`. |
| `haType` | string enum | Optional. AOAG or FCI. It is only needed for the High Availability deployment mode. Values: `HA_TYPE_UNSPECIFIED`, `AOAG`, `FCI`. |
| `isSqlPayg` | boolean | Required. SQL licensing type. |
| `location` | SqlLocationDetails | Required. Location details. |
| `mediaBucket` | string | Required. Name of the media storing SQL server installation files. |
| `operatingSystemType` | string enum | Required. The type of the operating system the SQL server is going to run on top of. Values: `OPERATING_SYSTEM_TYPE_UNSPECIFIED`, `WINDOWS`, `UBUNTU`, `RED_HAT_ENTERPRISE_LINUX`, `SUSE`. |
| `osImage` | string | Required. The image of the operating system. |
| `osImageType` | string enum | Optional. OS image type. It's used to create boot disks for VM instances. When either Windows licensing type or SQL licensing type is BYOL, this option is disabled and defaults to a custom image. Values: `OS_IMAGE_TYPE_UNSPECIFIED`, `PUBLIC_IMAGE`, `CUSTOM_IMAGE`. |
| `pacemaker` | Pacemaker | Optional. Pacemaker configuration, only applicable for Linux HA deployments. |
| `sqlServerEdition` | string enum | Optional. SQL Server Edition type, only applicable when the operating system is Linux. Values: `SQL_SERVER_EDITION_TYPE_UNSPECIFIED`, `SQL_SERVER_EDITION_TYPE_DEVELOPER`, `SQL_SERVER_EDITION_TYPE_ENTERPRISE`, `SQL_SERVER_EDITION_TYPE_STANDARD`, `SQL_SERVER_EDITION_TYPE_WEB`. |
| `sqlServerVersion` | string enum | Optional. 2017, 2019, or 2022. Values: `SQL_SERVER_VERSION_TYPE_UNSPECIFIED`, `SQL_SERVER_VERSION_TYPE_2017`, `SQL_SERVER_VERSION_TYPE_2019`, `SQL_SERVER_VERSION_TYPE_2022`. |
| `vmPrefix` | string | Required. Should be unique in the project. |

### `SqlserverValidation`

- A presentation of SQLServer workload insight. The schema of SqlServer workloads validation related data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentVersion` | string | Optional. The agent version collected this data point |
| `instance` | string | Required. The instance_name of the instance that the Insight data comes from. According to https://linter.aip.dev/122/name-suffix: field names should not use the \_name suffix unless the field would be ambiguous without it. |
| `projectId` | string | Required. The project_id of the cloud project that the Insight data comes from. |
| `validationDetails` | array<SqlserverValidationValidationDetail> | Optional. A list of SqlServer validation metrics data. |

### `SqlserverValidationDetails`

- Message containing collected data names and values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | object | Required. Collected data is in format. |

### `SqlserverValidationValidationDetail`

- Message describing the Sqlserver validation metrics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | array<SqlserverValidationDetails> | Required. Details wraps map that represents collected data names and values. |
| `type` | string enum | Optional. The Sqlserver system that the validation data is from. Values: `SQLSERVER_VALIDATION_TYPE_UNSPECIFIED`, `OS`, `DB_LOG_DISK_SEPARATION`, `DB_MAX_PARALLELISM`, `DB_CXPACKET_WAITS`, `DB_TRANSACTION_LOG_HANDLING`, `DB_VIRTUAL_LOG_FILE_COUNT`, `DB_BUFFER_POOL_EXTENSION`, `DB_MAX_SERVER_MEMORY`, `INSTANCE_METRICS`, `DB_INDEX_FRAGMENTATION`, `DB_TABLE_INDEX_COMPRESSION`, `DB_BACKUP_POLICY`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Summary`

- Execution summary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failures` | string (int64) | Output only. Number of failures. |
| `newFailures` | string (int64) | Output only. Number of new failures compared to the previous execution. |
| `newFixes` | string (int64) | Output only. Number of new fixes compared to the previous execution. |

### `TerraformVariable`

- In order to align with the Infra Manager dependency, we create the same TerraformVariable message to represent a Terraform input variable, by following Infra Manager's API documentation: https://cloud.google.com/infrastructure-manager/docs/reference/rest. A Terraform input variable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputValue` | any | Optional. Input variable value. |

### `TorsoValidation`

- The schema of torso workload validation data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentVersion` | string | Required. agent_version lists the version of the agent that collected this data. |
| `instanceName` | string | Optional. instance_name lists the human readable name of the instance that the data comes from. |
| `projectId` | string | Required. project_id lists the human readable cloud project that the data comes from. |
| `validationDetails` | object | Required. validation_details contains the pairs of validation data: field name & field value. |
| `workloadType` | string enum | Required. workload_type specifies the type of torso workload. Values: `WORKLOAD_TYPE_UNSPECIFIED`, `MYSQL`, `ORACLE`, `REDIS`. |

### `UpcomingMaintenanceEvent`

- Maintenance Event
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. End time |
| `maintenanceStatus` | string | Optional. Maintenance status |
| `onHostMaintenance` | string | Optional. Instance maintenance behavior. Could be `MIGRATE` or `TERMINATE`. |
| `startTime` | string (google-datetime) | Optional. Start time |
| `type` | string | Optional. Type |

### `ViolationDetails`

- The violation in an evaluation result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asset` | string | The name of the asset. |
| `observed` | object | Details of the violation. |
| `ruleOutput` | array<RuleOutput> | Output only. The rule output of the violation. |
| `serviceAccount` | string | The service account associated with the resource. |

### `WorkloadProfile`

- Workload resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Optional. such as name, description, version. More example can be found in deployment |
| `name` | string | Identifier. name of resource names have the form 'projects/{project_id}/locations/{location}/workloadProfiles/{workload_id}' |
| `refreshedTime` | string (google-datetime) | Required. time when the workload data was refreshed |
| `sapWorkload` | SapWorkload | The sap workload content |
| `workloadType` | string enum | Required. The type of the workload Values: `WORKLOAD_TYPE_UNSPECIFIED`, `S4_HANA`. |

### `WorkloadProfileHealth`

- WorkloadProfileHealth contains the detailed health check of workload.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkTime` | string (google-datetime) | The time when the health check was performed. |
| `componentsHealth` | array<ComponentHealth> | The detailed condition reports of each component. |
| `state` | string enum | Output only. The health state of the workload. Values: `HEALTH_STATE_UNSPECIFIED`, `HEALTHY`, `UNHEALTHY`, `CRITICAL`, `UNSUPPORTED`. |

### `WriteInsightRequest`

- Request for sending the data insights.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `agentVersion` | string | Optional. The agent version collected this data point. |
| `insight` | Insight | Required. The metrics data details. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `WriteInsightResponse`

- The response for write insights request.
- Version: v1

### Shape of `ActiveDirectory`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "dnsAddress": "string",
  "domain": "string",
  "domainUsername": "string",
  "secretManagerSecret": "string",
  "type": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `workloadmanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://workloadmanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
