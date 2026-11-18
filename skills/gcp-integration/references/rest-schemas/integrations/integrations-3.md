---
source: https://integrations.googleapis.com/$discovery/rest?version=v2
---

# Application Integration API message schemas (integrations) (part 3/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/integrations/`.

### `GoogleCloudIntegrationsV1alphaStringParameterArray`

- This message only contains a field of string array.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stringValues` | array<string> | String array. |

### `GoogleCloudIntegrationsV1alphaSuccessPolicy`

- Policy that dictates the behavior for the task after it completes successfully.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `finalState` | string enum | State to which the execution snapshot status will be set if the task succeeds. Values: `FINAL_STATE_UNSPECIFIED`, `SUCCEEDED`, `SUSPENDED`. |

### `GoogleCloudIntegrationsV1alphaSuspension`

- A record representing a suspension.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalConfig` | GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig | Controls the notifications and approval permissions for this suspension. |
| `audit` | GoogleCloudIntegrationsV1alphaSuspensionAudit | Metadata pertaining to the resolution of this suspension. |
| `createTime` | string (google-datetime) | Output only. Auto-generated. |
| `eventExecutionInfoId` | string | Required. ID of the associated execution. |
| `integration` | string | Required. The name of the originating integration. |
| `lastModifyTime` | string (google-datetime) | Output only. Auto-generated. |
| `name` | string | Resource name for suspensions suspension/{suspension_id} |
| `state` | string enum | Required. State of this suspension, indicating what action a resolver has taken. Values: `RESOLUTION_STATE_UNSPECIFIED`, `PENDING`, `REJECTED`, `LIFTED`. |
| `suspensionConfig` | EnterpriseCrmEventbusProtoSuspensionConfig | Controls the notifications and resolver permissions for this suspension. |
| `taskId` | string | Required. Task id of the associated SuspensionTask. |

### `GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig`

- Configurations for approving the Suspension.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customMessage` | string | Information to provide for recipients. |
| `emailAddresses` | array<string> | Email addresses to send approval request to. |
| `expiration` | GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration | Indicates the next steps when no external actions happen on the suspension. |

### `GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration`

- Expiration configs for the approval request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | Output only. Time after which the suspension expires, if no action taken. |
| `liftWhenExpired` | boolean | Whether the suspension will be REJECTED or LIFTED upon expiration. REJECTED is the default behavior. |
| `remindTime` | string (google-datetime) | Time after the previous suspension action reminder, if any, is sent using the selected notification option, for a suspension which is still PENDING_UNSPECIFIED. |

### `GoogleCloudIntegrationsV1alphaSuspensionAudit`

- Contains when and by whom the suspension was resolved.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resolveTime` | string (google-datetime) | Time at which this suspension was resolved. |
| `resolver` | string | Email address of the person who resolved this suspension. |

### `GoogleCloudIntegrationsV1alphaSwitchEncryptionRequest`

- Request for the SwitchEncryption rpc
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudKmsConfig` | GoogleCloudIntegrationsV1alphaCloudKmsConfig | Required. REQUIRED: Cloud KMS config for AuthModule to encrypt/decrypt credentials. |

### `GoogleCloudIntegrationsV1alphaSwitchVariableMaskingRequest`

- Request to enable/disable variable masking for a provisioned client
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableVariableMasking` | boolean | Required. REQUIRED: True if variable masking feature should be turned on for this region |

### `GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest`

- Request for TakeoverEditLock.
- Version: v1

### `GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse`

- Response for TakeoverEditLock.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationVersion` | GoogleCloudIntegrationsV1alphaIntegrationVersion | Version after the lock is acquired by the new user. |

### `GoogleCloudIntegrationsV1alphaTakeoverTestCaseEditLockRequest`

- Request for TakeoverTestCaseEditLock.
- Version: v1

### `GoogleCloudIntegrationsV1alphaTaskConfig`

- The task configuration details. This is not the implementation of Task. There might be multiple TaskConfigs for the same Task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditionalFailurePolicies` | GoogleCloudIntegrationsV1alphaConditionalFailurePolicies | Optional. The list of conditional failure policies that will be applied to the task in order. |
| `description` | string | Optional. User-provided description intended to give additional business context about the task. |
| `displayName` | string | Optional. User-provided label that is attached to this TaskConfig in the UI. |
| `errorCatcherId` | string | Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task |
| `externalTaskType` | string enum | Optional. External task type of the task Values: `EXTERNAL_TASK_TYPE_UNSPECIFIED`, `NORMAL_TASK`, `ERROR_TASK`. |
| `failurePolicy` | GoogleCloudIntegrationsV1alphaFailurePolicy | Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.). |
| `jsonValidationOption` | string enum | Optional. If set, overrides the option configured in the Task implementation class. Values: `JSON_VALIDATION_OPTION_UNSPECIFIED`, `SKIP`, `PRE_EXECUTION`, `POST_EXECUTION`, `PRE_POST_EXECUTION`. |
| `nextTasks` | array<GoogleCloudIntegrationsV1alphaNextTask> | Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true. |
| `nextTasksExecutionPolicy` | string enum | Optional. The policy dictating the execution of the next set of tasks for the current task. Values: `NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED`, `RUN_ALL_MATCH`, `RUN_FIRST_MATCH`. |
| `parameters` | object | Optional. The customized parameters the user can pass to this task. |
| `position` | GoogleCloudIntegrationsV1alphaCoordinate | Optional. Informs the front-end application where to draw this error catcher config on the UI. |
| `successPolicy` | GoogleCloudIntegrationsV1alphaSuccessPolicy | Optional. Determines what action to take upon successful task completion. |
| `synchronousCallFailurePolicy` | GoogleCloudIntegrationsV1alphaFailurePolicy | Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post). |
| `task` | string | Optional. The name for the task. |
| `taskExecutionStrategy` | string enum | Optional. The policy dictating the execution strategy of this task. Values: `TASK_EXECUTION_STRATEGY_UNSPECIFIED`, `WHEN_ALL_SUCCEED`, `WHEN_ANY_SUCCEED`, `WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED`. |
| `taskId` | string | Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`). |
| `taskTemplate` | string | Optional. Used to define task-template name if task is of type task-template |

### `GoogleCloudIntegrationsV1alphaTaskExecutionDetails`

- Contains the details of the execution of this task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `taskAttemptStats` | array<GoogleCloudIntegrationsV1alphaAttemptStats> | Status for the current task execution attempt. |
| `taskExecutionState` | string enum | The execution state of this task. Values: `TASK_EXECUTION_STATE_UNSPECIFIED`, `PENDING_EXECUTION`, `IN_PROCESS`, `SUCCEED`, `FAILED`, `FATAL`, `RETRY_ON_HOLD`, `SKIPPED`, `CANCELLED`, `PENDING_ROLLBACK`, `ROLLBACK_IN_PROCESS`, `ROLLEDBACK`, `SUSPENDED`. |
| `taskNumber` | string | Pointer to the task config it used for execution. |

### `GoogleCloudIntegrationsV1alphaTemplate`

- Defines the template for Application Integration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `author` | string | Optional. Creator of the template. |
| `categories` | array<string> | Required. Categories associated with the Template. The categories listed below will be utilized for the Template listing. Values: `CATEGORY_UNSPECIFIED`, `AI_MACHINE_LEARNING`, `BUSINESS_INTELLIGENCE`, `COLLABORATION`, `CUSTOMER_SERVICE`, `DATABASES`, `DEVOPS_IT`, `CONTENT_AND_FILES`, `FINANCE_AND_ACCOUNTING`, `HUMAN_RESOURCES`, `OPERATIONS`, `PRODUCT_PROJECT_MANAGEMENT`, `PRODUCTIVITY`, `SALES_AND_MARKETING`, `UNIVERSAL_CONNECTORS`, `UTILITY`, `OTHERS`. |
| `components` | array<GoogleCloudIntegrationsV1alphaTemplateComponent> | Optional. Components being used in the template. This could be used to categorize and filter. |
| `createTime` | string (google-datetime) | Output only. Auto-generated. |
| `description` | string | Optional. Description of the template. The length should not be more than 255 characters |
| `displayName` | string | Required. The name of the template |
| `docLink` | string | Optional. Link to template documentation. |
| `lastUsedTime` | string (google-datetime) | Optional. Time the template was last used. |
| `name` | string | Identifier. Resource name of the template. |
| `sharedWith` | array<string> | Required. Resource names with which the template is shared for example ProjectNumber/Ord id |
| `tags` | array<string> | Required. Tags which are used to identify templates. These tags could be for business use case, connectors etc. |
| `templateBundle` | GoogleCloudIntegrationsV1alphaTemplateBundle | Required. Bundle which is part of the templates. The template entities in the bundle would be converted to an actual entity. |
| `updateTime` | string (google-datetime) | Output only. Auto-generated |
| `usageCount` | string (int64) | Optional. Number of template usages. |
| `usageInfo` | string | Optional. Information on how to use the template. This should contain detailed information about usage of the template. |
| `visibility` | string enum | Required. Visibility of the template. Values: `VISIBILITY_UNSPECIFIED`, `PRIVATE`, `SHARED`, `PUBLIC`. |

### `GoogleCloudIntegrationsV1alphaTemplateBundle`

- Define the bundle of the template.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationVersionTemplate` | GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate | Required. Main integration templates of the template bundle. |
| `subIntegrationVersionTemplates` | array<GoogleCloudIntegrationsV1alphaIntegrationVersionTemplate> | Optional. Sub integration templates which would be added along with main integration. |

### `GoogleCloudIntegrationsV1alphaTemplateComponent`

- Define the components that are present in a template.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the component. |
| `type` | string enum | Optional. Type of the component. Values: `TYPE_UNSPECIFIED`, `TRIGGER`, `TASK`, `CONNECTOR`. |

### `GoogleCloudIntegrationsV1alphaTestCase`

- Defines the functional test case for Application Integration. Next available id: 15
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Auto-generated. |
| `creatorEmail` | string | Optional. The creator's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `databasePersistencePolicy` | string enum | Optional. Various policies for how to persist the test execution info including execution info, execution export info, execution metadata index and execution param index.. Values: `DATABASE_PERSISTENCE_POLICY_UNSPECIFIED`, `DATABASE_PERSISTENCE_DISABLED`, `DATABASE_PERSISTENCE_ASYNC`. |
| `description` | string | Optional. Description of the test case. |
| `displayName` | string | Required. The display name of test case. |
| `lastModifierEmail` | string | The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `lockHolderEmail` | string | Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call. |
| `name` | string | Output only. Auto-generated primary key. |
| `testInputParameters` | array<GoogleCloudIntegrationsV1alphaIntegrationParameter> | Optional. Parameters that are expected to be passed to the test case when the test case is triggered. This gives the user the ability to provide default values. This should include all the output variables of the trigger as input variables. |
| `testTaskConfigs` | array<GoogleCloudIntegrationsV1alphaTestTaskConfig> | Optional. However, the test case doesn't mock or assert anything without test_task_configs. |
| `triggerConfig` | GoogleCloudIntegrationsV1alphaTriggerConfig | Optional. Auto-generated. |
| `triggerId` | string | Required. This defines the trigger ID in workflow which is considered to be executed as starting point of the test case |
| `updateTime` | string (google-datetime) | Auto-generated. |

### `GoogleCloudIntegrationsV1alphaTestIntegrationsRequest`

- The request for testing an integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asyncExecution` | boolean | Optional. Runs the test asynchronously, by enqueueing it through the real execution queue under `trigger_id` instead of running the task graph inline. Default `false`, which preserves the existing synchronous behavior. The enqueued request carries no caller identity, so it is drained under the integration's run-as service account, exactly as a real Cloud Scheduler, cron, Pub/Sub, Salesforce or connector fire would be. That is the only way to verify the credential path an asynchronous trigger actually takes; a synchronous test always carries the caller's own credential and so exercises the opposite branch. When `true`: \* The version named by `integration_version.name` runs. A name ending in `/versions/{version}` runs that exact version, published or draft; a name without one runs the published (`ACTIVE`) version on the trigger. Either way the integration is resolved from storage, so `integration_version` must carry only `name`; supplying any other field is rejected, rather than silently running something other than what was passed. \* A draft is validated before it is enqueued, including the check that the caller may act as the integration's run-as service account. Testing a draft therefore fails fast on a configuration a publish would reject. \* The response carries `execution_id` only. `execution_failed`, `event_parameters`, `parameters` and `parameter_entries` describe a finished run and are left unset, because nothing has run yet. In particular, do not read `execution_failed` as a pass signal. \* The run is real, with real side effects, quota and concurrency. No actual Pub/Sub push or Cloud Scheduler tick occurs; only the enqueue is simulated, which does not change the credential path. |
| `clientId` | string | Required. This is used to identify the client on whose behalf the event will be executed. |
| `configParameters` | object | Optional. Config parameters used during integration execution. |
| `credentialMode` | string enum | Optional. The credential flow to run the test under. Applies to synchronous tests only. When unset, the default depends on when the test runs: before the EUC hardening cutover it is `CREDENTIAL_MODE_CURRENT`; from the cutover on it is `CREDENTIAL_MODE_HARDENED`, whatever the integration's stored disposition. Where the hardened flow cannot be evaluated, an unset mode runs `CREDENTIAL_MODE_CURRENT` instead of failing. The response's `credential_mode` reports the mode that ran. Values: `CREDENTIAL_MODE_UNSPECIFIED`, `CREDENTIAL_MODE_CURRENT`, `CREDENTIAL_MODE_HARDENED`. |
| `deadlineSecondsTime` | string (google-datetime) | Optional. custom deadline of the rpc |
| `inputParameters` | object | Optional. Input parameters used during integration execution. |
| `integrationVersion` | GoogleCloudIntegrationsV1alphaIntegrationVersion | Required. integration config to execute the workflow |
| `parameters` | EnterpriseCrmFrontendsEventbusProtoEventParameters | Optional. Passed in as parameters to each integration execution. |
| `testMode` | boolean | Optional. Can be specified in the event request, otherwise false (default). If true, enables tasks with condition "test_mode = true". If false, disables tasks with condition "test_mode = true" if global test mode (set by platform) is also false {@link EventBusConfig}. |
| `triggerId` | string | Required. The trigger id of the integration trigger config. If both trigger_id and client_id is present, the integration is executed from the start tasks provided by the matching trigger config otherwise it is executed from the default start tasks. |

### `GoogleCloudIntegrationsV1alphaTestIntegrationsResponse`

- The response for testing an integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `credentialMode` | string enum | The credential flow the test ran under. Unset for asynchronous tests. Values: `CREDENTIAL_MODE_UNSPECIFIED`, `CREDENTIAL_MODE_CURRENT`, `CREDENTIAL_MODE_HARDENED`. |
| `eucHardeningDisposition` | string enum | The EUC hardening disposition stored for the tested integration, read before the run. Unset for asynchronous tests. Values: `EUC_HARDENING_DISPOSITION_UNSPECIFIED`, `LEGACY`, `HARDENED`. |
| `eventParameters` | EnterpriseCrmFrontendsEventbusProtoEventParameters | Details for the integration that were executed. |
| `executionFailed` | boolean | Is true if any execution in the integration failed. False otherwise. |
| `executionId` | string | The id of the execution corresponding to this run of integration. |
| `hardenedPaths` | array<string> | The credential paths the hardened flow covers for this test: each one that a task in the tested integration reaches and that the server running the test hardens, whatever the credential mode. A `CREDENTIAL_MODE_CURRENT` test of an integration not stored as hardened usually lists none, and a `CREDENTIAL_MODE_HARDENED` response with no paths means nothing in this integration was hardened. Empty where the hardened flow is switched off. Unset for asynchronous tests. Derived from the integration's task types before the run: it reports presence in the graph, not execution, so a task on a branch that did not run is still counted, as is a Call Integration task that runs as a configured service account. A sub-integration's own tasks are not included; each runs under its own stored disposition. Integration Connectors tasks and Cloud Scheduler triggers are never reported: the services they call do not yet accept the hardened credential. Values: `HARDENED_PATH_UNSPECIFIED`, `SCRIPT_EVAL`, `STUBBY_CALLER`, `SUB_INTEGRATION`. |
| `parameterEntries` | array<EnterpriseCrmFrontendsEventbusProtoParameterEntry> | Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. |
| `parameters` | object | Optional. Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. |

### `GoogleCloudIntegrationsV1alphaTestTaskConfig`

- The task mock configuration details and assertions for functional tests. Next available id: 6
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assertions` | array<GoogleCloudIntegrationsV1alphaAssertion> | Optional. List of conditions or expressions which should be evaluated to true unless there is a bug/problem in the integration. These are evaluated one the task execution is completed as per the mock strategy in test case |
| `mockConfig` | GoogleCloudIntegrationsV1alphaMockConfig | Optional. Defines how to mock the given task during test execution |
| `task` | string | Required. This defines in the test case, the task name in integration which will be mocked by this test task config |
| `taskConfig` | GoogleCloudIntegrationsV1alphaTaskConfig | Optional. Auto-generated. |
| `taskNumber` | string | Required. This defines in the test case, the task in integration which will be mocked by this test task config |

### `GoogleCloudIntegrationsV1alphaToggleHttpRequest`

- Request to enable/disable http call for a provisioned client
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableHttpCall` | boolean | Required. REQUIRED: True if http call feature should be turned on for this region |

### `GoogleCloudIntegrationsV1alphaTriggerConfig`

- Configuration detail of a trigger.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertConfig` | array<GoogleCloudIntegrationsV1alphaIntegrationAlertConfig> | Optional. An alert threshold configuration for the \[trigger + client + integration\] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per \[client + trigger + integration\] when published. |
| `cloudSchedulerConfig` | GoogleCloudIntegrationsV1alphaCloudSchedulerConfig | Optional. Cloud Scheduler Trigger related metadata |
| `description` | string | Optional. User-provided description intended to give additional business context about the task. |
| `errorCatcherId` | string | Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task |
| `inputVariables` | GoogleCloudIntegrationsV1alphaTriggerConfigVariables | Optional. List of input variables for the api trigger. |
| `label` | string | Optional. The user created label for a particular trigger. |
| `nextTasksExecutionPolicy` | string enum | Optional. Dictates how next tasks will be executed. Values: `NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED`, `RUN_ALL_MATCH`, `RUN_FIRST_MATCH`. |
| `outputVariables` | GoogleCloudIntegrationsV1alphaTriggerConfigVariables | Optional. List of output variables for the api trigger. |
| `position` | GoogleCloudIntegrationsV1alphaCoordinate | Optional. Informs the front-end application where to draw this error catcher config on the UI. |
| `properties` | object | Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers. |
| `startTasks` | array<GoogleCloudIntegrationsV1alphaNextTask> | Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph). |
| `trigger` | string | Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose. |
| `triggerId` | string | Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME} |
| `triggerNumber` | string | Required. A number to uniquely identify each trigger config within the integration on UI. |
| `triggerType` | string enum | Optional. Type of trigger Values: `TRIGGER_TYPE_UNSPECIFIED`, `CRON`, `API`, `SFDC_CHANNEL`, `CLOUD_PUBSUB_EXTERNAL`, `SFDC_CDC_CHANNEL`, `CLOUD_SCHEDULER`, `INTEGRATION_CONNECTOR_TRIGGER`, `PRIVATE_TRIGGER`, `CLOUD_PUBSUB`, `EVENTARC_TRIGGER`. |

### `GoogleCloudIntegrationsV1alphaTriggerConfigVariables`

- Variables names mapped to api trigger.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `names` | array<string> | Optional. List of variable names. |

### `GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest`

- Request for UnpublishIntegrationVersion.
- Version: v1

### `GoogleCloudIntegrationsV1alphaUnshareTemplateRequest`

- Request to Unshare template
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceNames` | array<string> | Optional. Project name resources to unshare the template. The project names is expected in resource format Ex: projects/{project-number} |

### `GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest`

- Request for UploadIntegrationVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | Optional. The textproto of the IntegrationVersion. |
| `fileFormat` | string enum | File format for upload request. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |

### `GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse`

- Response for UploadIntegrationVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationVersion` | GoogleCloudIntegrationsV1alphaIntegrationVersion | The uploaded integration. |

### `GoogleCloudIntegrationsV1alphaUploadTemplateRequest`

- Request for UploadTemplate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | Required. The textproto of the template. |
| `fileFormat` | string enum | Required. File format for upload request. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |

### `GoogleCloudIntegrationsV1alphaUploadTemplateResponse`

- Response for UploadTemplate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `template` | GoogleCloudIntegrationsV1alphaTemplate | The uploaded Template |

### `GoogleCloudIntegrationsV1alphaUploadTestCaseRequest`

- Request for UploadTestCase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | The textproto of the test case. |
| `fileFormat` | string enum | File format for upload request. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |

### `GoogleCloudIntegrationsV1alphaUploadTestCaseResponse`

- Response for UploadTestCase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `testCase` | GoogleCloudIntegrationsV1alphaTestCase | The uploaded TestCase |

### `GoogleCloudIntegrationsV1alphaUseTemplateRequest`

- Request to Use template
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationDetails` | GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails | Required. Integration details which would be created via templates. |
| `integrationRegion` | string | Required. The region of the Integration to be created. |
| `subIntegrations` | object | Optional. Sub Integration which would be created via templates. |

### `GoogleCloudIntegrationsV1alphaUseTemplateRequestIntegrationDetails`

- Sub Integration which would be created via templates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integration` | string | Required. Name of the sub integration which would be created via templates. |
| `integrationDescription` | string | Optional. Description of the sub integration which would be created via templates. |

### `GoogleCloudIntegrationsV1alphaUseTemplateResponse`

- Response for use template
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationVersion` | GoogleCloudIntegrationsV1alphaIntegrationVersion | IntegrationVersion which is created. |
| `subIntegrationVersions` | array<GoogleCloudIntegrationsV1alphaIntegrationVersion> | Sub integration versions which are created. |

### `GoogleCloudIntegrationsV1alphaUsernameAndPassword`

- Username and password pair.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `password` | string | Password to be used |
| `username` | string | Username to be used |

### `GoogleCloudIntegrationsV1alphaValueType`

- The type of the parameter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `booleanArray` | GoogleCloudIntegrationsV1alphaBooleanParameterArray | Boolean Array. |
| `booleanValue` | boolean | Boolean. |
| `doubleArray` | GoogleCloudIntegrationsV1alphaDoubleParameterArray | Double Number Array. |
| `doubleValue` | number (double) | Double Number. |
| `intArray` | GoogleCloudIntegrationsV1alphaIntParameterArray | Integer Array. |
| `intValue` | string (int64) | Integer. |
| `jsonValue` | string | Json. |
| `stringArray` | GoogleCloudIntegrationsV1alphaStringParameterArray | String Array. |
| `stringValue` | string | String. |

### `GoogleCloudIntegrationsV2AttemptStats`

- Status for the execution attempt.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The end time of the execution for the current attempt. |
| `startTime` | string (google-datetime) | The start time of the execution for the current attempt. This could be in the future if it's been scheduled. |

### `GoogleCloudIntegrationsV2CloudLoggingDetails`

- Cloud Logging details for execution info
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudLoggingSeverity` | string enum | Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed. Values: `CLOUD_LOGGING_SEVERITY_UNSPECIFIED`, `INFO`, `ERROR`, `WARNING`. |
| `enableCloudLogging` | boolean | Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed. |

### `GoogleCloudIntegrationsV2DuetBooleanParameterArray`

- This message only contains a field of boolean array.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `booleanValues` | array<boolean> | Boolean array. |

### `GoogleCloudIntegrationsV2DuetCloudSchedulerConfig`

- Cloud Scheduler Trigger configuration
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cronTab` | string | Required. The cron tab of cloud scheduler trigger. |
| `errorMessage` | string | Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations |
| `location` | string | Required. The location where associated cloud scheduler job will be created |
| `serviceAccountEmail` | string | Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time |

### `GoogleCloudIntegrationsV2DuetDoubleParameterArray`

- This message only contains a field of double number array.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `doubleValues` | array<number> | Double number array. |

### `GoogleCloudIntegrationsV2DuetErrorCatcherConfig`

- Configuration detail of a error catch task
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. User-provided description intended to give more business context about the error catcher config. |
| `errorCatcherId` | string | Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow |
| `errorCatcherNumber` | string | Required. A number to uniquely identify each error catcher config within the workflow on UI. |
| `label` | string | Optional. The user created label for a particular error catcher. Optional. |
| `startErrorTasks` | array<GoogleCloudIntegrationsV2DuetNextTask> | Required. The set of start tasks that are to be executed for the error catch flow |

### `GoogleCloudIntegrationsV2DuetEventParameter`

- This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. |
| `value` | GoogleCloudIntegrationsV2DuetValueType | Values for the defined keys. Each value can either be string, int, double or any proto message. |

### `GoogleCloudIntegrationsV2DuetGenerateIntegrationBranchRequest`

- Request message for generating an integration branch containing tasks.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `integrationBranchRequest` | GoogleCloudIntegrationsV2DuetIntegrationBranchRequest | Required. The integration branch request payload. |
| `prompt` | string | Required. User prompt. |

### `GoogleCloudIntegrationsV2DuetGenerateIntegrationBranchResponse`

- Response message containing the generated integration branch data.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `integrationBranch` | GoogleCloudIntegrationsV2DuetIntegrationBranch | The integration branch returned by Duet |

### `GoogleCloudIntegrationsV2DuetGenerateIntegrationDocumentRequest`

- Request message for generating documentation for an integration version.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `integrationDocumentRequest` | GoogleCloudIntegrationsV2DuetIntegrationDocumentRequest | Required. The integration document request payload. |

### `GoogleCloudIntegrationsV2DuetGenerateIntegrationDocumentResponse`

- Response message containing generated integration documentation text.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `document` | string | The description of the integration returned by Duet AI. |

### `GoogleCloudIntegrationsV2DuetGenerateIntegrationRequest`

- Request for generating an integration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `copilotEnabled` | boolean | Optional. Indicates if copilot is enabled. Copilot features may alter the generated integration structure. |
| `prompt` | string | Required. The natural language prompt based on which the integration will be generated. |

### `GoogleCloudIntegrationsV2DuetGenerateIntegrationResponse`

- Response for generating an integration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `skeletonIntegrations` | array<GoogleCloudIntegrationsV2DuetIntegrationSkeleton> | The list of integration skeletons returned. |

### `GoogleCloudIntegrationsV2DuetGenerateJavascriptRequest`

- Request message for generating data mapping Javascript.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `javascriptRequest` | GoogleCloudIntegrationsV2DuetJavascriptRequest | Required. The javascript request payload. |
| `prompt` | string | Optional. User prompt. |

### `GoogleCloudIntegrationsV2DuetGenerateJavascriptResponse`

- Response message containing generated Javascript code recommendations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `recommendations` | array<GoogleCloudIntegrationsV2DuetJavascriptRecommendation> | List of the Javascript recommendations. |

### `GoogleCloudIntegrationsV2DuetIntParameterArray`

- This message only contains a field of integer array.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `intValues` | array<string> | Integer array. |

### `GoogleCloudIntegrationsV2DuetIntegrationBranch`

- An integration branch skeleton containing basic fields which can be used to create an integration branch on the UI.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `branchCondition` | string | The condition for the branch. |
| `explanation` | string | Explanation of why this integration branch was generated. |
| `integrationParameters` | array<GoogleCloudIntegrationsV2DuetIntegrationParameter> | The newly generated workflow parameters. |
| `taskConfigs` | array<GoogleCloudIntegrationsV2DuetTaskConfig> | The newly generated tasks which can be branched into the current integration. |

### `GoogleCloudIntegrationsV2DuetIntegrationBranchRequest`

- The request for generating an integration branch.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `branchCondition` | string | Optional. The condition for the particular branch which the user selected. |
| `integrationParameters` | array<GoogleCloudIntegrationsV2DuetIntegrationParameter> | Optional. A list of all the workflow parameters of the current integration. |
| `taskConfigs` | array<GoogleCloudIntegrationsV2DuetTaskConfig> | Required. A list of all the tasks of the current integration. |

### `GoogleCloudIntegrationsV2DuetIntegrationConfigParameter`

- Integration Config Parameter is defined in the integration config and are used to provide external configuration for integration. It provide information about data types of the expected parameters and provide any default values or value. They can also be used to add custom attributes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `parameter` | GoogleCloudIntegrationsV2DuetIntegrationParameter | Optional. Integration Parameter to provide the default value, data type and attributes required for the Integration config variables. |
| `value` | GoogleCloudIntegrationsV2DuetValueType | Values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. |

### `GoogleCloudIntegrationsV2DuetIntegrationDocumentRequest`

- The request for generating description of an integration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `integrationVersion` | GoogleCloudIntegrationsV2DuetIntegrationVersion | Required. The current integrtion on the canvas. |

### `GoogleCloudIntegrationsV2DuetIntegrationParameter`

- Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | Type of the parameter. Values: `INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `BOOLEAN_ARRAY`, `JSON_VALUE`, `PROTO_VALUE`, `PROTO_ARRAY`. |
| `defaultValue` | GoogleCloudIntegrationsV2DuetValueType | Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. |
| `description` | string | Optional. Description of the parameter. |
| `displayName` | string | The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName". |
| `inputOutputType` | string enum | Specifies the input/output type for the parameter. Values: `IN_OUT_TYPE_UNSPECIFIED`, `IN`, `OUT`, `IN_OUT`. |
| `isTransient` | boolean | Whether this parameter is a transient parameter. |
| `jsonSchema` | string | This schema will be used to validate runtime JSON-typed values of this parameter. |
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. |

### `GoogleCloudIntegrationsV2DuetIntegrationSkeleton`

- An integration skeleton containing basic fields which can be used to create an integration on the UI.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `explanation` | string | Explanation of why this integration was generated. |
| `integrationVersion` | GoogleCloudIntegrationsV2DuetIntegrationVersion | The integration version containing basic triggers and tasks. |
| `name` | string | The name of the integration. |
| `tag` | string | Indicate the strategy/methodology used to generate the integration. |

### `GoogleCloudIntegrationsV2DuetIntegrationVersion`

- The integration version definition.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. The integration description. |
| `errorCatcherConfigs` | array<GoogleCloudIntegrationsV2DuetErrorCatcherConfig> | Optional. Error Catch Task configuration for the integration. It's optional. |
| `integrationConfigParameters` | array<GoogleCloudIntegrationsV2DuetIntegrationConfigParameter> | Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter. |
| `integrationParameters` | array<GoogleCloudIntegrationsV2DuetIntegrationParameter> | Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter. |
| `name` | string | Optional. Auto-generated primary key. |
| `snapshotNumber` | string (int64) | Optional. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by \[workflow_name, org_id latest(snapshot_number)\]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head. |
| `state` | string enum | Output only. User should not set it as an input. Values: `INTEGRATION_STATE_UNSPECIFIED`, `DRAFT`, `ACTIVE`, `ARCHIVED`, `SNAPSHOT`. |
| `taskConfigs` | array<GoogleCloudIntegrationsV2DuetTaskConfig> | Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs. |
| `triggerConfigs` | array<GoogleCloudIntegrationsV2DuetTriggerConfig> | Optional. Trigger configurations. |
| `userLabel` | string | Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created. |

### `GoogleCloudIntegrationsV2DuetJavascriptRecommendation`

- Individual Javascript recommendation containing the task config with the new code, integration parameters and the explanation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `explanation` | string | The explanation of the Javascript code. |
| `integrationParameters` | array<GoogleCloudIntegrationsV2DuetIntegrationParameter> | Optional. The list of the new integration parameters. |
| `taskConfig` | GoogleCloudIntegrationsV2DuetTaskConfig | Optional. The task config of the Javascript task. |

### `GoogleCloudIntegrationsV2DuetJavascriptRequest`

- Request message for Javascript Task using Gemini.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `copilotEnabled` | boolean | Optional. If this request is for copilot. |
| `integrationVersion` | GoogleCloudIntegrationsV2DuetIntegrationVersion | Required. The integration version which contains all the integration parameters, all triggers and tasks including the Javascript task. |
| `taskId` | string | Required. The task id of the Javascript task. |
| `useCurrentScript` | boolean | Optional. Whether to use the current javascript task config (JS code) to generate the Javascript code. |

### `GoogleCloudIntegrationsV2DuetNextTask`

- The task that is next in line to be executed, if the condition specified evaluated to true.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | string | Standard filter expression for this task to become an eligible next task. |
| `description` | string | User-provided description intended to give additional business context about the task. |
| `displayName` | string | User-provided label that is attached to this edge in the UI. |
| `taskConfigId` | string | ID of the next task. |
| `taskId` | string | Task number of the next task. |

### `GoogleCloudIntegrationsV2DuetRecommendTasksRequest`

- Request message for recommending tasks to replace a selected task.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `prompt` | string | Optional. User prompt. |
| `replaceTaskRequest` | GoogleCloudIntegrationsV2DuetReplaceTaskRequest | Required. The current task to replace and options. |

### `GoogleCloudIntegrationsV2DuetRecommendTasksResponse`

- Response message containing recommended tasks for replacement.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `taskConfigs` | array<GoogleCloudIntegrationsV2DuetTaskConfig> | The list of recommended tasks. |
| `taskResponseStatuses` | array<GoogleCloudIntegrationsV2DuetTaskResponseStatus> | The list of task response status based on the task_types in the request. |

### `GoogleCloudIntegrationsV2DuetReplaceTaskRequest`

- Message for Replace Task Scenario.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `copilotEnabled` | boolean | Optional. If this request is for copilot. |
| `taskConfig` | GoogleCloudIntegrationsV2DuetTaskConfig | Required. The current task selected on the UI. |
| `taskTypes` | array<string> | The list of task types. Values: `TASK_TYPE_UNSPECIFIED`, `CONNECTOR_TASK`, `REST_TASK`. |

### `GoogleCloudIntegrationsV2DuetStringParameterArray`

- This message only contains a field of string array.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `stringValues` | array<string> | String array. |

### `GoogleCloudIntegrationsV2DuetTaskConfig`

- The task configuration details. This is not the implementation of Task. There might be multiple TaskConfigs for the same Task.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. User-provided description intended to give additional business context about the task. |
| `displayName` | string | Optional. User-provided label that is attached to this TaskConfig in the UI. |
| `errorCatcherId` | string | Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task |
| `externalTaskType` | string enum | Optional. External task type of the task Values: `EXTERNAL_TASK_TYPE_UNSPECIFIED`, `NORMAL_TASK`, `ERROR_TASK`. |
| `nextTasks` | array<GoogleCloudIntegrationsV2DuetNextTask> | Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true. |
| `parameters` | object | Optional. The customized parameters the user can pass to this task. |
| `task` | string | Optional. The name for the task. |
| `taskId` | string | Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`). |

### `GoogleCloudIntegrationsV2DuetTaskResponseStatus`

- Message for task response status.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | The error message of the task response in case of failure. |
| `httpCode` | integer (int32) | The http code of the task response. |
| `taskType` | string enum | The task type. Values: `TASK_TYPE_UNSPECIFIED`, `CONNECTOR_TASK`, `REST_TASK`. |

### `GoogleCloudIntegrationsV2DuetTriggerConfig`

- Configuration detail of a trigger.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudSchedulerConfig` | GoogleCloudIntegrationsV2DuetCloudSchedulerConfig | Optional. Cloud Scheduler Trigger related metadata |
| `description` | string | Optional. User-provided description intended to give additional business context about the task. |
| `errorCatcherId` | string | Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task |
| `inputVariables` | GoogleCloudIntegrationsV2DuetTriggerConfigVariables | Optional. List of input variables for the api trigger. |
| `label` | string | Optional. The user created label for a particular trigger. |
| `outputVariables` | GoogleCloudIntegrationsV2DuetTriggerConfigVariables | Optional. List of output variables for the api trigger. |
| `properties` | object | Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers. |
| `startTasks` | array<GoogleCloudIntegrationsV2DuetNextTask> | Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph). |
| `trigger` | string | Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose. |
| `triggerId` | string | Optional. The backend trigger ID. |
| `triggerNumber` | string | Required. A number to uniquely identify each trigger config within the integration on UI. |
| `triggerType` | string enum | Optional. Type of trigger Values: `TRIGGER_TYPE_UNSPECIFIED`, `CRON`, `API`, `SFDC_CHANNEL`, `CLOUD_PUBSUB_EXTERNAL`, `SFDC_CDC_CHANNEL`, `CLOUD_SCHEDULER`, `INTEGRATION_CONNECTOR_TRIGGER`, `PRIVATE_TRIGGER`. |

### `GoogleCloudIntegrationsV2DuetTriggerConfigVariables`

- Variables names mapped to api trigger.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `names` | array<string> | Optional. List of variable names. |

### `GoogleCloudIntegrationsV2DuetTroubleshootExecutionResponse`

- Response for troubleshooting an integration execution.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `detailedExplanation` | string | Detailed explanation of the root cause of the integration execution failure. |
| `displayMessage` | string | Display message to be shown to the user. Example - If integration execution succeeded, this field value can be "Integration execution succeeded. No troubleshooting needed.". |
| `errorMessage` | string | Error message of the integration execution, if the execution failed. |
| `executionId` | string | The execution id of the integration execution to be troubleshooted. |
| `rootCause` | string | Root cause of the integration execution failure. |

### `GoogleCloudIntegrationsV2DuetValueType`

- The type of the parameter.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `booleanArray` | GoogleCloudIntegrationsV2DuetBooleanParameterArray | Boolean Array. |
| `booleanValue` | boolean | Boolean. |
| `doubleArray` | GoogleCloudIntegrationsV2DuetDoubleParameterArray | Double Number Array. |
| `doubleValue` | number (double) | Double Number. |
| `intArray` | GoogleCloudIntegrationsV2DuetIntParameterArray | Integer Array. |
| `intValue` | string (int64) | Integer. |
| `jsonValue` | string | Json. |
| `stringArray` | GoogleCloudIntegrationsV2DuetStringParameterArray | String Array. |
| `stringValue` | string | String. |

### `GoogleCloudIntegrationsV2Execution`

- The Execution contains detailed information of an individual integration execution.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudLoggingDetails` | GoogleCloudIntegrationsV2CloudLoggingDetails | Cloud Logging details for the integration version |
| `containTaskVariables` | boolean | Indicates if the task execution contains variables. |
| `createTime` | string (google-datetime) | Output only. Time the execution is created. |
| `executionAttemptStats` | array<GoogleCloudIntegrationsV2AttemptStats> | Start and end time of each execution attempt. |
| `integrationVersionNumber` | string (int64) | Indicates which snapshot of integration is used for this execution. |
| `integrationVersionUserLabel` | string | Optional. User-defined label that annotates the executed integration version. |
| `name` | string | Identifier. Execution resource name. |
| `replayInfo` | GoogleCloudIntegrationsV2ExecutionReplayInfo | Output only. Replay info for the execution |
| `requestVariables` | object | Optional. Variables provided in the request. |
| `responseVariables` | object | Optional. Variables returned as part of the response. |
| `state` | string enum | Output only. Status of the execution. Values: `STATE_UNSPECIFIED`, `ON_HOLD`, `IN_PROCESS`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `RETRY_ON_HOLD`, `SUSPENDED`. |
| `taskExecutions` | array<GoogleCloudIntegrationsV2TaskExecution> | Optional. List of task executions. |
| `triggerId` | string | The ID of the trigger invoked at the start of the execution. |
| `updateTime` | string (google-datetime) | Output only. Time the execution is recently updated. |

### `GoogleCloudIntegrationsV2ExecutionReplayInfo`

- Contains the details of the execution info: this includes the replay reason and replay tree connecting executions in a parent-child relationship
- Version: v2

| Field | Type | Description |
|---|---|---|
| `originalExecutionId` | string | If this execution is a replay of another execution, then this field contains the original execution id. |
| `replayMode` | string enum | Replay mode for the execution Values: `REPLAY_MODE_UNSPECIFIED`, `REPLAY_MODE_FROM_BEGINNING`, `REPLAY_MODE_POINT_OF_FAILURE`. |
| `replayReason` | string | reason for replay |
| `replayedExecutionIds` | array<string> | If this execution has been replayed, then this field contains the execution ids of the replayed executions. |

### `GoogleCloudIntegrationsV2ListExecutionsResponse`

- Response for listing the Integration executions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `executions` | array<GoogleCloudIntegrationsV2Execution> | Required. The list of executions. |
| `nextPageToken` | string | The token for retrieving the next page of results. |

### `GoogleCloudIntegrationsV2TaskExecution`

- Execution of a single task within an integration
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. Task execution resource name. |
| `taskExecutionDetails` | array<GoogleCloudIntegrationsV2TaskExecutionDetails> | Details of the task execution. |
| `taskExecutionMetadata` | GoogleCloudIntegrationsV2TaskExecutionTaskExecutionMetadata | Optional. Metadata of the task execution. |
| `variables` | object | Optional. Variables used during the execution. |

### `GoogleCloudIntegrationsV2TaskExecutionDetails`

- Details of the task execution.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `taskAttemptStats` | array<GoogleCloudIntegrationsV2AttemptStats> | List for the current task execution attempts. |
| `taskExecutionState` | string enum | Output only. The execution state of this task. Values: `STATE_UNSPECIFIED`, `IN_PROCESS`, `SUCCEED`, `FAILED`, `FATAL`, `RETRY_ON_HOLD`, `CANCELLED`, `SUSPENDED`. |
| `taskNumber` | string | Pointer to the task config it used for execution. |

### `GoogleCloudIntegrationsV2TaskExecutionTaskExecutionMetadata`

- Metadata of the task execution.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ancestorIterationNumbers` | array<string> | Optional. Ancestor iteration number for the task (it will only be non-empty if the task is under 'private integration'). |
| `ancestorTaskNumbers` | array<string> | Optional. Ancestor task number for the task (it will only be non-empty if the task is under 'private integration'). |
| `executionAttempt` | integer (int32) | The execution attempt number this execution belongs to. |
| `privateIntegrationName` | string | Optional. The direct integration which the execution belongs to. |
| `task` | string | The task name associated with this execution. |
| `taskAttempt` | integer (int32) | The task attempt number this execution belongs to. |
| `taskLabel` | string | The task label associated with this execution. |
| `taskNumber` | string | The task number associated with this execution. |

### `GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest`

- LINT.IfChange Use this request to post all workflows associated with a given trigger id. Next available id: 14
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Optional. If the client id is provided, then the combination of trigger id and client id is matched across all the workflows. If the client id is not provided, then workflows with matching trigger id are executed for each client id in the {@link TriggerConfig}. For Api Trigger, the client id is required and will be validated against the allowed clients. |
| `ignoreErrorIfNoActiveWorkflow` | boolean | Optional. Flag to determine whether clients would suppress a warning when no ACTIVE workflows are not found. If this flag is set to be true, an error will not be thrown if the requested trigger_id or client_id is not found in any ACTIVE workflow. Otherwise, the error is always thrown. The flag is set to be false by default. |
| `parameters` | EnterpriseCrmEventbusProtoEventParameters | Passed in as parameters to each workflow execution. Optional. |
| `priority` | string enum | The request priority this request should be processed at. For internal users: Values: `UNSPCIFIED`, `SHEDDABLE`, `SHEDDABLE_PLUS`, `CRITICAL`, `CRITICAL_PLUS`. |
| `quotaRetryCount` | integer (int32) | Optional. This is a field to see the quota retry count for integration execution |
| `requestId` | string | Optional. This is used to de-dup incoming request: if the duplicate request was detected, the response from the previous execution is returned. Must have no more than 36 characters and contain only alphanumeric characters and hyphens. |
| `resourceName` | string | This field is only required when using Admin Access. The resource name of target, or the parent resource name. For example: "projects/\*/locations/\*/integrations/\*" |
| `scheduledTime` | string (int64) | Optional. Time in milliseconds since epoch when the given event would be scheduled. |
| `testMode` | boolean | Optional. Sets test mode in {@link enterprise/crm/eventbus/event_message.proto}. |
| `triggerId` | string | Matched against all {@link TriggerConfig}s across all workflows. i.e. TriggerConfig.trigger_id.equals(trigger_id) Required. |
| `userGeneratedExecutionId` | string | This is a unique id provided by the method caller. If provided this will be used as the execution_id when a new execution info is created. This is a string representation of a UUID. Must have no more than 36 characters and contain only alphanumeric characters and hyphens. |
| `workflowId` | string | Optional. Pins the enqueue to this exact version. Requires client_id, and only an ACTIVE version is accepted: the drain re-resolves by trigger id, so nothing else could run. Unset by every caller today; draft support is b/570602030. See integrationplatform/api/executionsservice/README.md. |
| `workflowName` | string | Optional. If provided, the workflow_name is used to filter all the matched workflows having same trigger_id+client_id. A combination of trigger_id, client_id and workflow_name identifies a unique workflow. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### Shape of `GoogleCloudIntegrationsV1alphaStringParameterArray`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "stringValues": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `integrations` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://integrations.googleapis.com/$discovery/rest?version=v2, https://integrations.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
