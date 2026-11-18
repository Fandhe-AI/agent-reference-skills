---
source: https://integrations.googleapis.com/$discovery/rest?version=v2
---

# Application Integration API message schemas (integrations) (part 1/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/integrations/`.

### `CrmlogErrorCode`

- Registered ids for errors, as "oneof" enums. Each task or logical grouping of tasks may share the same enum.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commonErrorCode` | string enum | — Values: `COMMON_ERROR_CODE_UNSPECIFIED`, `INVALID_CREDENTIALS`, `REQUIRED_FIELDS_MISSING`, `INVALID_FIELDS`, `BACKEND`, `GENERAL`, `INTERNAL`, `IO_ERROR`, `NOT_FOUND`, `EVENT_BUS`, `ALREADY_EXISTS`, `CONCORD`, `CONVERSION`, `FLUME`, `PERMISSION`, `SALES_FORCE`, `SPANNER`, `UNIMPLEMENTED`, `RELTIO`, `WORKFLOW_NOT_FOUND`, `QUOTA_THROTTLED`, `QUOTA_ENQUEUED`, `INVALID_QUOTA_CONFIGURATION`, `TASK_NOT_FOUND`, `EXECUTION_TIMEOUT`, `INVALID_EVENT_EXECUTION_STATE`, `INVALID_ATTRIBUTE`, `MISSING_ATTRIBUTE`, `CLIENT_UNAUTHORIZED_FOR_WORKFLOW`, `INVALID_PARAMETER`, `MISSING_PARAMETER`, `UNAUTHROIZED_WORKFLOW_EDITOR_ACTION`, `FAILED_PRECONDITION`, `INVALID_CLIENT`, `MISSING_CLIENT`, `INVALID_WORKFLOW`, `MISSING_QUOTA_CONFIGURATION`, `UNHANDLED_TASK_ERROR`, `SCRIPT_TASK_RUNTIME_ERROR`, `RPC`, `INVALID_PROTO`, `UNHANDLED_EVENTBUS_ERROR`, `INVALID_TASK_STATE`, `TYPED_TASK_INVALID_INPUT_OPERATION`, `TYPED_TASK_INVALID_OUTPUT_OPERATION`, `VALIDATION_ERROR`, `RESUME_ERROR`, `APPS_SCRIPT_EXECUTION_ERROR`, `INVALID_VECTOR_USER`, `INFORMATICA`, `RETRYABLE_TASK_ERROR`, `INVALID_TENANT`, `WRONG_TENANT`, `INFORMATICA_BACKEND_UNAVAILABLE`, `RPC_PERMISSION_DENIED`, `SYNC_EVENTBUS_EXECUTION_TIMEOUT`, `ASYNC_EVENTBUS_EXECUTION_TIMEOUT`, `NOT_SUPPORTED_DATA_TYPE`, `UNSANITIZED_USER_INPUT`, `TRANSFORM_EXPRESSION_EVALUATION_ERROR`, `HTTP_EXCEPTION`, `EXECUTION_CANCELLED`, `DATA_LAYER`. |

### `EnterpriseCrmEventbusAuthconfigAuthConfigTaskParam`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowedCredentialTypes` | array<string> | Defines the credential types to be supported as Task may restrict specific types to use, e.g. Cloud SQL Task will use username/password type only. Values: `CREDENTIAL_TYPE_UNSPECIFIED`, `USERNAME_AND_PASSWORD`, `API_KEY`, `OAUTH2_AUTHORIZATION_CODE`, `OAUTH2_IMPLICIT`, `OAUTH2_CLIENT_CREDENTIALS`, `OAUTH2_RESOURCE_OWNER_CREDENTIALS`, `JWT`, `AUTH_TOKEN`, `SERVICE_ACCOUNT`, `CLIENT_CERTIFICATE_ONLY`, `OIDC_TOKEN`. |
| `allowedServiceAccountInContext` | boolean | — |
| `authConfigId` | string | UUID of the AuthConfig. |
| `scope` | string | A space-delimited list of requested scope permissions. |
| `useServiceAccountInContext` | boolean | — |

### `EnterpriseCrmEventbusProtoAddress`

- Email address along with optional name and tokens. These tokens will be substituted for the variables in the form of \[{var_name}\], where var_name could be any string of no more than 32 bytes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `email` | string | Required. |
| `name` | string | — |
| `tokens` | array<EnterpriseCrmEventbusProtoToken> | — |

### `EnterpriseCrmEventbusProtoAttributes`

- Attributes are additional options that can be associated with each event property. For more information, see
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | Things like URL, Email, Currency, Timestamp (rather than string, int64...) Values: `DATA_TYPE_UNSPECIFIED`, `EMAIL`, `URL`, `CURRENCY`, `TIMESTAMP`, `DOMAIN_NAME`. |
| `defaultValue` | EnterpriseCrmEventbusProtoValueType | Used to define defaults. |
| `isRequired` | boolean | Required for event execution. The validation will be done by the event bus when the event is triggered. |
| `isSearchable` | boolean | Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable. |
| `logSettings` | EnterpriseCrmEventbusProtoLogSettings | See |
| `masked` | boolean | True if this workflow parameter should be masked in the logs |
| `readOnly` | boolean | Used to indicate if the ParameterEntry is a read only field or not. |
| `searchable` | string enum | — Values: `UNSPECIFIED`, `YES`, `NO`. |
| `taskVisibility` | array<string> | List of tasks that can view this property, if empty then all. |

### `EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList`

- List of error enums for alerts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enumStrings` | array<string> | — |
| `filterType` | string enum | — Values: `DEFAULT_INCLUSIVE`, `EXCLUSIVE`. |

### `EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue`

- The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the \*RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For \*PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For \*AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `absolute` | string (int64) | — |
| `percentage` | integer (int32) | — |

### `EnterpriseCrmEventbusProtoBaseFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `NOW_IN_MILLIS`, `INT_LIST`, `ENVIRONMENT`, `GET_EXECUTION_ID`, `GET_INTEGRATION_NAME`, `GET_REGION`, `GET_UUID`, `GET_PROJECT_ID`. |

### `EnterpriseCrmEventbusProtoBaseValue`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseFunction` | EnterpriseCrmEventbusProtoFunction | Start with a function that does not build on existing values. Eg. CurrentTime, Min, Max, Exists, etc. |
| `literalValue` | EnterpriseCrmEventbusProtoParameterValueType | Start with a literal value. |
| `referenceValue` | string | Start with a reference value to dereference. |

### `EnterpriseCrmEventbusProtoBooleanArrayFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `GET`, `APPEND`, `SIZE`, `TO_SET`, `APPEND_ALL`, `TO_JSON`, `SET`, `REMOVE`, `REMOVE_AT`, `CONTAINS`, `FOR_EACH`, `FILTER`. |

### `EnterpriseCrmEventbusProtoBooleanFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `TO_JSON`, `NOT`, `AND`, `NAND`, `OR`, `XOR`, `NOR`, `XNOR`, `TO_STRING`, `EQUALS`. |

### `EnterpriseCrmEventbusProtoBooleanParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `booleanValues` | array<boolean> | — |

### `EnterpriseCrmEventbusProtoBuganizerNotification`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `assigneeEmailAddress` | string | Whom to assign the new bug. Optional. |
| `componentId` | string (int64) | ID of the buganizer component within which to create a new issue. Required. |
| `templateId` | string (int64) | ID of the buganizer template to use. Optional. |
| `title` | string | Title of the issue to be created. Required. |

### `EnterpriseCrmEventbusProtoCloudKmsConfig`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gcpProjectId` | string | Optional. The id of GCP project where the KMS key is stored. If not provided, assume the key is stored in the same GCP project defined in Client (tag 14). |
| `keyName` | string | A Cloud KMS key is a named object containing one or more key versions, along with metadata for the key. A key exists on exactly one key ring tied to a specific location. |
| `keyRingName` | string | A key ring organizes keys in a specific Google Cloud location and allows you to manage access control on groups of keys. A key ring's name does not need to be unique across a Google Cloud project, but must be unique within a given location. |
| `keyVersionName` | string | Optional. Each version of a key contains key material used for encryption or signing. A key's version is represented by an integer, starting at 1. To decrypt data or verify a signature, you must use the same key version that was used to encrypt or sign the data. |
| `locationName` | string | Location name of the key ring, e.g. "us-west1". |
| `serviceAccount` | string | Optional. The service account used for authentication of this KMS key. If this is not provided, the service account in Client.clientSource will be used. |

### `EnterpriseCrmEventbusProtoCloudLoggingDetails`

- Cloud Logging details, selected by the user for the integration version (workflow). This message field will be also used in ExecutionInfo, to indicate the CloudLoggingDetails config at the time of workflow (integration version) execution, since this field value can be changed for an unpublished workflow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudLoggingSeverity` | string enum | Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed. Values: `CLOUD_LOGGING_SEVERITY_UNSPECIFIED`, `INFO`, `ERROR`, `WARNING`. |
| `enableCloudLogging` | boolean | Status of whether Cloud Logging is enabled or not for the integration version getting executed. |

### `EnterpriseCrmEventbusProtoCloudSchedulerConfig`

- Cloud Scheduler Trigger configuration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cronTab` | string | Required. The cron tab of cloud scheduler trigger. |
| `errorMessage` | string | Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations |
| `location` | string | Required. The location where associated cloud scheduler job will be created |
| `serviceAccountEmail` | string | Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time |

### `EnterpriseCrmEventbusProtoCombinedCondition`

- This message recursively combines constituent conditions using logical AND.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<EnterpriseCrmEventbusProtoCondition> | A set of individual constituent conditions. |

### `EnterpriseCrmEventbusProtoCondition`

- Condition that uses `operator` to evaluate the key against the value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventPropertyKey` | string | Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown. |
| `operator` | string enum | Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair. Values: `UNSET`, `EQUALS`, `CONTAINS`, `LESS_THAN`, `GREATER_THAN`, `EXISTS`, `DOES_NOT_EXIST`, `IS_EMPTY`, `IS_NOT_EMPTY`. |
| `value` | EnterpriseCrmEventbusProtoValueType | Value that's checked for the key. |

### `EnterpriseCrmEventbusProtoConditionResult`

- Contains the combined condition calculation results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentTaskNumber` | string | the current task number. |
| `nextTaskNumber` | string | the next task number. |
| `result` | boolean | the result comes out after evaluate the combined condition. True if there's no combined condition specified. |

### `EnterpriseCrmEventbusProtoConditionalFailurePolicies`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultFailurePolicy` | EnterpriseCrmEventbusProtoFailurePolicy | The default failure policy to be applied if no conditional failure policy matches |
| `failurePolicies` | array<EnterpriseCrmEventbusProtoFailurePolicy> | The list of failure policies that will be applied to the task in order. |

### `EnterpriseCrmEventbusProtoConnectorsConnection`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `connectionName` | string | Connection name Format: projects/{project}/locations/{location}/connections/{connection} |
| `connectorVersion` | string | Connector version Format: projects/{project}/locations/{location}/providers/{provider}/connectors/{connector}/versions/{version} |
| `host` | string | The name of the Hostname of the Service Directory service with TLS if used. |
| `serviceName` | string | Service name Format: projects/{project}/locations/{location}/namespaces/{namespace}/services/{service} |

### `EnterpriseCrmEventbusProtoConnectorsGenericConnectorTaskConfig`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `connection` | EnterpriseCrmEventbusProtoConnectorsConnection | User-selected connection. |
| `operation` | string enum | Operation to perform using the configured connection. Values: `OPERATION_UNSPECIFIED`, `EXECUTE_ACTION`, `LIST_ENTITIES`, `GET_ENTITY`, `CREATE_ENTITY`, `UPDATE_ENTITY`, `DELETE_ENTITY`, `EXECUTE_QUERY`. |

### `EnterpriseCrmEventbusProtoCoordinate`

- Represents two-dimensional positions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `x` | integer (int32) | — |
| `y` | integer (int32) | — |

### `EnterpriseCrmEventbusProtoCustomSuspensionRequest`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `postToQueueWithTriggerIdRequest` | GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest | Request to fire an event containing the SuspensionInfo message. |
| `suspensionInfoEventParameterKey` | string | In the fired event, set the SuspensionInfo message as the value for this key. |

### `EnterpriseCrmEventbusProtoDoubleArray`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<number> | — |

### `EnterpriseCrmEventbusProtoDoubleArrayFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `GET`, `APPEND`, `SIZE`, `SUM`, `AVG`, `MAX`, `MIN`, `TO_SET`, `APPEND_ALL`, `TO_JSON`, `SET`, `REMOVE`, `REMOVE_AT`, `CONTAINS`, `FOR_EACH`, `FILTER`. |

### `EnterpriseCrmEventbusProtoDoubleFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `TO_JSON`, `TO_STRING`, `ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`, `EXPONENT`, `ROUND`, `FLOOR`, `CEIL`, `GREATER_THAN`, `LESS_THAN`, `EQUALS`, `GREATER_THAN_EQUALS`, `LESS_THAN_EQUALS`, `MOD`. |

### `EnterpriseCrmEventbusProtoDoubleParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `doubleValues` | array<number> | — |

### `EnterpriseCrmEventbusProtoErrorDetail`

- An error, warning, or information message associated with a workflow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | CrmlogErrorCode | The associated error-code, which can be a common or internal code. |
| `errorMessage` | string | The full text of the error message, including any parameters that were thrown along with the exception. |
| `severity` | string enum | The severity of the error: ERROR\|WARN\|INFO. Values: `SEVERITY_UNSPECIFIED`, `ERROR`, `WARN`, `INFO`. |
| `taskNumber` | integer (int32) | The task try-number, in which, the error occurred. If zero, the error happened at the event level. |

### `EnterpriseCrmEventbusProtoEventBusProperties`

- LINT.IfChange This message is used for storing key value pair properties for each Event / Task in the EventBus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `properties` | array<EnterpriseCrmEventbusProtoPropertyEntry> | An unordered list of property entries. |

### `EnterpriseCrmEventbusProtoEventExecutionDetails`

- Contains the details of the execution info of this event: this includes the tasks execution details plus the event execution statistics. Next available id: 12
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelReason` | string | If the execution is manually canceled, this field will contain the reason for cancellation. |
| `eventAttemptStats` | array<EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats> | — |
| `eventExecutionSnapshot` | array<EnterpriseCrmEventbusProtoEventExecutionSnapshot> | — |
| `eventExecutionSnapshotsSize` | string (int64) | Total size of all event_execution_snapshots for an execution |
| `eventExecutionState` | string enum | — Values: `UNSPECIFIED`, `ON_HOLD`, `IN_PROCESS`, `SUCCEEDED`, `FAILED`, `CANCELED`, `RETRY_ON_HOLD`, `SUSPENDED`. |
| `eventRetriesFromBeginningCount` | integer (int32) | Indicates the number of times the execution has restarted from the beginning. |
| `logFilePath` | string | The log file path (aka. cns address) for this event. |
| `networkAddress` | string | The network address (aka. bns address) that indicates where the event executor is running. |
| `nextExecutionTime` | string (int64) | Next scheduled execution time in case the execution status was RETRY_ON_HOLD. |
| `ryeLockUnheldCount` | integer (int32) | Used internally and shouldn't be exposed to users. A counter for the cron job to record how many times this event is in in_process state but don't have a lock consecutively/ |

### `EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (int64) | The end time of the event execution for current attempt. |
| `startTime` | string (int64) | The start time of the event execution for current attempt. This could be in the future if it's been scheduled. |

### `EnterpriseCrmEventbusProtoEventExecutionSnapshot`

- Contains the snapshot of the event execution for a given checkpoint. Next available id: 15
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkpointTaskNumber` | string | Indicates "right after which checkpoint task's execution" this snapshot is taken. |
| `clientId` | string | Client that the execution snapshot is associated to. |
| `conditionResults` | array<EnterpriseCrmEventbusProtoConditionResult> | All of the computed conditions that been calculated. |
| `diffParams` | EnterpriseCrmEventbusProtoEventParameters | The parameters in Event object that differs from last snapshot. |
| `eventExecutionInfoId` | string | Points to the event execution info this snapshot belongs to. |
| `eventExecutionSnapshotId` | string | Auto-generated. Used as primary key for EventExecutionSnapshots table. |
| `eventExecutionSnapshotMetadata` | EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata | — |
| `eventParams` | EnterpriseCrmEventbusProtoEventParameters | The parameters in Event object. |
| `exceedMaxSize` | boolean | indicate whether snapshot exceeded maximum size before clean up |
| `snapshotTime` | string (int64) | Indicates when this snapshot is taken. |
| `taskExecutionDetails` | array<EnterpriseCrmEventbusProtoTaskExecutionDetails> | All of the task execution details at the given point of time. |
| `taskName` | string | The task name associated with this snapshot. Could be empty. |
| `workflowName` | string | Name of the workflow this event execution snapshot belongs to. |

### `EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestorIterationNumbers` | array<string> | Ancestor iteration number for the task(it will only be non-empty if the task is under 'private workflow') |
| `ancestorTaskNumbers` | array<string> | Ancestor task number for the task(it will only be non-empty if the task is under 'private workflow') |
| `eventAttemptNum` | integer (int32) | the event attempt number this snapshot belongs to. |
| `integrationName` | string | The direct integration which the event execution snapshots belongs to |
| `taskAttemptNum` | integer (int32) | the task attempt number this snapshot belongs to. Could be empty. |
| `taskLabel` | string | the task label associated with this snapshot. Could be empty. |
| `taskName` | string | the task name associated with this snapshot. Could be empty. |
| `taskNumber` | string | The task number associated with this snapshot. Could be empty. |

### `EnterpriseCrmEventbusProtoEventParameters`

- LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see
- Version: v2

| Field | Type | Description |
|---|---|---|
| `parameters` | array<EnterpriseCrmEventbusProtoParameterEntry> | Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution. |

### `EnterpriseCrmEventbusProtoExecutionTraceInfo`

- Message that helps aggregate all sub-executions triggered by one execution and keeps track of child-parent relationships.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `parentEventExecutionInfoId` | string | Parent event execution info id that triggers the current execution through SubWorkflowExecutorTask. |
| `traceId` | string | Used to aggregate ExecutionTraceInfo. |

### `EnterpriseCrmEventbusProtoExternalTraffic`

- Represents external traffic type and id.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enableInternalIp` | boolean | Indicates the client enables internal IP feature, this is applicable for internal clients only. |
| `gcpProjectId` | string | User’s GCP project id the traffic is referring to. |
| `gcpProjectNumber` | string | User’s GCP project number the traffic is referring to. |
| `location` | string | Location for the user's request. |
| `retryRequestForQuota` | boolean | Enqueue the execution request due to quota issue |
| `source` | string enum | — Values: `SOURCE_UNSPECIFIED`, `APIGEE`, `SECURITY`. |

### `EnterpriseCrmEventbusProtoFailurePolicy`

- Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `intervalInSeconds` | string (int64) | Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff. |
| `maxNumRetries` | integer (int32) | Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed. |
| `retryCondition` | string | Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy. |
| `retryStrategy` | string enum | Defines what happens to the task upon failure. Values: `UNSPECIFIED`, `IGNORE`, `NONE`, `FATAL`, `FIXED_INTERVAL`, `LINEAR_BACKOFF`, `EXPONENTIAL_BACKOFF`, `RESTART_WORKFLOW_WITH_BACKOFF`. |

### `EnterpriseCrmEventbusProtoField`

- Information about the value and type of the field.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cardinality` | string enum | By default, if the cardinality is unspecified the field is considered required while mapping. Values: `UNSPECIFIED`, `OPTIONAL`. |
| `defaultValue` | EnterpriseCrmEventbusProtoParameterValueType | This holds the default values for the fields. This value is supplied by user so may or may not contain PII or SPII data. |
| `fieldType` | string enum | Specifies the data type of the field. Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |
| `protoDefPath` | string | Optional. The fully qualified proto name (e.g. enterprise.crm.storage.Account). Required for output field of type PROTO_VALUE or PROTO_ARRAY. For e.g., if input field_type is BYTES and output field_type is PROTO_VALUE, then fully qualified proto type url should be provided to parse the input bytes. If field_type is \*\_ARRAY, then all the converted protos are of the same type. |
| `referenceKey` | string | This holds the reference key of the workflow or task parameter. 1. Any workflow parameter, for e.g. $workflowParam1$. 2. Any task input or output parameter, for e.g. $task1_param1$. 3. Any workflow or task parameters with subfield references, for e.g., $task1_param1.employee.id$ |
| `transformExpression` | EnterpriseCrmEventbusProtoTransformExpression | This is the transform expression to fetch the input field value. for e.g. $param1$.CONCAT('test'). Keep points - 1. Only input field can have a transform expression. 2. If a transform expression is provided, reference_key will be ignored. 3. If no value is returned after evaluation of transform expression, default_value can be mapped if provided. 4. The field_type should be the type of the final object returned after the transform expression is evaluated. Scrubs the transform expression before logging as value provided by user so may or may not contain PII or SPII data. |

### `EnterpriseCrmEventbusProtoFieldMappingConfig`

- Field Mapping Config to map multiple output fields values from input fields values.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `mappedFields` | array<EnterpriseCrmEventbusProtoMappedField> | — |

### `EnterpriseCrmEventbusProtoFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionType` | EnterpriseCrmEventbusProtoFunctionType | The name of the function to perform. |
| `parameters` | array<EnterpriseCrmEventbusProtoTransformExpression> | List of parameters required for the transformation. |

### `EnterpriseCrmEventbusProtoFunctionType`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseFunction` | EnterpriseCrmEventbusProtoBaseFunction | LINT.IfChange |
| `booleanArrayFunction` | EnterpriseCrmEventbusProtoBooleanArrayFunction | — |
| `booleanFunction` | EnterpriseCrmEventbusProtoBooleanFunction | — |
| `doubleArrayFunction` | EnterpriseCrmEventbusProtoDoubleArrayFunction | — |
| `doubleFunction` | EnterpriseCrmEventbusProtoDoubleFunction | — |
| `intArrayFunction` | EnterpriseCrmEventbusProtoIntArrayFunction | — |
| `intFunction` | EnterpriseCrmEventbusProtoIntFunction | — |
| `jsonFunction` | EnterpriseCrmEventbusProtoJsonFunction | — |
| `protoArrayFunction` | EnterpriseCrmEventbusProtoProtoArrayFunction | — |
| `protoFunction` | EnterpriseCrmEventbusProtoProtoFunction | — |
| `stringArrayFunction` | EnterpriseCrmEventbusProtoStringArrayFunction | — |
| `stringFunction` | EnterpriseCrmEventbusProtoStringFunction | — |

### `EnterpriseCrmEventbusProtoIntArray`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | — |

### `EnterpriseCrmEventbusProtoIntArrayFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `GET`, `APPEND`, `SIZE`, `SUM`, `AVG`, `MAX`, `MIN`, `TO_SET`, `APPEND_ALL`, `TO_JSON`, `SET`, `REMOVE`, `REMOVE_AT`, `CONTAINS`, `FOR_EACH`, `FILTER`. |

### `EnterpriseCrmEventbusProtoIntFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`, `EXPONENT`, `GREATER_THAN_EQUAL_TO`, `GREATER_THAN`, `LESS_THAN_EQUAL_TO`, `LESS_THAN`, `TO_DOUBLE`, `TO_STRING`, `EQUALS`, `TO_JSON`, `MOD`, `EPOCH_TO_HUMAN_READABLE_TIME`. |

### `EnterpriseCrmEventbusProtoIntParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `intValues` | array<string> | — |

### `EnterpriseCrmEventbusProtoJsonFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `GET_PROPERTY`, `GET_ELEMENT`, `APPEND_ELEMENT`, `SIZE`, `SET_PROPERTY`, `FLATTEN`, `FLATTEN_ONCE`, `MERGE`, `TO_STRING`, `TO_INT`, `TO_DOUBLE`, `TO_BOOLEAN`, `TO_PROTO`, `TO_STRING_ARRAY`, `TO_INT_ARRAY`, `TO_DOUBLE_ARRAY`, `TO_PROTO_ARRAY`, `TO_BOOLEAN_ARRAY`, `REMOVE_PROPERTY`, `RESOLVE_TEMPLATE`, `EQUALS`, `FOR_EACH`, `FILTER_ELEMENTS`. |

### `EnterpriseCrmEventbusProtoLogSettings`

- The LogSettings define the logging attributes for an event property. These attributes are used to map the property to the parameter in the log proto. Also used to define scrubbing/truncation behavior and PII information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logFieldName` | string | The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key. |
| `seedPeriod` | string enum | — Values: `SEED_PERIOD_UNSPECIFIED`, `DAY`, `WEEK`, `MONTH`. |
| `seedScope` | string enum | — Values: `SEED_SCOPE_UNSPECIFIED`, `EVENT_NAME`, `TIME_PERIOD`, `PARAM_NAME`. |

### `EnterpriseCrmEventbusProtoLoopMetadata`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `currentIterationCount` | string (int64) | Starting from 1, not 0. |
| `currentIterationDetail` | string | Needs to be set by the loop impl class before each iteration. The abstract loop class will append the request and response to it. Eg. The foreach Loop will clean up and set it as the current iteration element at the start of each loop. The post request and response will be appended to the value once they are available. |
| `errorMsg` | string | Add the error message when loops fail. |
| `failureLocation` | string enum | Indicates where in the loop logic did it error out. Values: `UNKNOWN`, `SUBWORKFLOW`, `PARAM_OVERRIDING`, `PARAM_AGGREGATING`, `SETTING_ITERATION_ELEMENT`, `GETTING_LIST_TO_ITERATE`, `CONDITION_EVALUATION`, `BUILDING_REQUEST`. |

### `EnterpriseCrmEventbusProtoMappedField`

- Mapped field is a pair of input field and output field.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `inputField` | EnterpriseCrmEventbusProtoField | The input field being mapped from. |
| `outputField` | EnterpriseCrmEventbusProtoField | The output field being mapped to. |

### `EnterpriseCrmEventbusProtoNextTask`

- The task that is next in line to be executed, if the condition specified evaluated to true.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `combinedConditions` | array<EnterpriseCrmEventbusProtoCombinedCondition> | Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition` |
| `condition` | string | Standard filter expression for this task to become an eligible next task. |
| `description` | string | User-provided description intended to give more business context about the next task edge or condition. |
| `label` | string | User-provided label that is attached to this edge in the UI. |
| `taskConfigId` | string | ID of the next task. |
| `taskNumber` | string | Task number of the next task. |

### `EnterpriseCrmEventbusProtoNextTeardownTask`

- The teardown task that is next in line to be executed. We support only sequential execution of teardown tasks (i.e. no branching).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Name of the next teardown task. |

### `EnterpriseCrmEventbusProtoNodeIdentifier`

- Represents a node identifier (type + id). Next highest id: 3
- Version: v1

| Field | Type | Description |
|---|---|---|
| `elementIdentifier` | string | Configuration of the edge. |
| `elementType` | string enum | Destination node where the edge ends. It can only be a task config. Values: `UNKNOWN_TYPE`, `TASK_CONFIG`, `TRIGGER_CONFIG`. |

### `EnterpriseCrmEventbusProtoNotification`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buganizerNotification` | EnterpriseCrmEventbusProtoBuganizerNotification | — |
| `emailAddress` | EnterpriseCrmEventbusProtoAddress | — |
| `escalatorQueue` | string | — |
| `pubsubTopic` | string | — |
| `request` | EnterpriseCrmEventbusProtoCustomSuspensionRequest | If the out-of-the-box email/pubsub notifications are not suitable and custom logic is required, fire a workflow containing all info needed to notify users to resume execution. |

### `EnterpriseCrmEventbusProtoParamSpecEntryConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `descriptivePhrase` | string | A short phrase to describe what this parameter contains. |
| `helpText` | string | Detailed help text for this parameter containing information not provided elsewhere. For example, instructions on how to migrate from a deprecated parameter. |
| `hideDefaultValue` | boolean | Whether the default value is hidden in the UI. |
| `inputDisplayOption` | string enum | — Values: `DEFAULT`, `STRING_MULTI_LINE`, `NUMBER_SLIDER`, `BOOLEAN_TOGGLE`. |
| `isHidden` | boolean | Whether this field is hidden in the UI. |
| `label` | string | A user-friendly label for the parameter. |
| `parameterNameOption` | string enum | — Values: `DEFAULT_NOT_PARAMETER_NAME`, `IS_PARAMETER_NAME`, `KEY_IS_PARAMETER_NAME`, `VALUE_IS_PARAMETER_NAME`. |
| `subSectionLabel` | string | A user-friendly label for subSection under which the parameter will be displayed. |
| `uiPlaceholderText` | string | Placeholder text which will appear in the UI input form for this parameter. |

### `EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullName` | string | The fully-qualified proto name. This message, for example, would be "enterprise.crm.eventbus.proto.ParamSpecEntry.ProtoDefinition". |
| `path` | string | Path to the proto file that contains the message type's definition. |

### `EnterpriseCrmEventbusProtoParamSpecEntryValidationRule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `doubleRange` | EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange | — |
| `intRange` | EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange | — |
| `stringRegex` | EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex | — |

### `EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange`

- Range used to validate doubles and floats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `max` | number (double) | The inclusive maximum of the acceptable range. |
| `min` | number (double) | The inclusive minimum of the acceptable range. |

### `EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange`

- Range used to validate longs and ints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `max` | string (int64) | The inclusive maximum of the acceptable range. |
| `min` | string (int64) | The inclusive minimum of the acceptable range. |

### `EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex`

- Rule used to validate strings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exclusive` | boolean | Whether the regex matcher is applied exclusively (if true, matching values will be rejected). |
| `regex` | string | The regex applied to the input value(s). |

### `EnterpriseCrmEventbusProtoParameterEntry`

- Key-value pair of EventBus parameters.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition. |
| `masked` | boolean | True if this parameter should be masked in the logs |
| `value` | EnterpriseCrmEventbusProtoParameterValueType | Values for the defined keys. Each value can either be string, int, double or any proto message. |

### `EnterpriseCrmEventbusProtoParameterMap`

- A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `entries` | array<EnterpriseCrmEventbusProtoParameterMapEntry> | — |
| `keyType` | string enum | Option to specify key value type for all entries of the map. If provided then field types for all entries must conform to this. Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |
| `valueType` | string enum | — Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |

### `EnterpriseCrmEventbusProtoParameterMapEntry`

- Entry is a pair of key and value.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | EnterpriseCrmEventbusProtoParameterMapField | — |
| `value` | EnterpriseCrmEventbusProtoParameterMapField | — |

### `EnterpriseCrmEventbusProtoParameterMapField`

- Field represents either the key or value in an entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `literalValue` | EnterpriseCrmEventbusProtoParameterValueType | Passing a literal value. |
| `referenceKey` | string | Referencing one of the WF variables. |

### `EnterpriseCrmEventbusProtoParameterValueType`

- LINT.IfChange To support various types of parameter values. Next available id: 14
- Version: v2

| Field | Type | Description |
|---|---|---|
| `booleanArray` | EnterpriseCrmEventbusProtoBooleanParameterArray | — |
| `booleanValue` | boolean | — |
| `doubleArray` | EnterpriseCrmEventbusProtoDoubleParameterArray | — |
| `doubleValue` | number (double) | — |
| `intArray` | EnterpriseCrmEventbusProtoIntParameterArray | — |
| `intValue` | string (int64) | — |
| `protoArray` | EnterpriseCrmEventbusProtoProtoParameterArray | — |
| `protoValue` | object | — |
| `serializedObjectValue` | EnterpriseCrmEventbusProtoSerializedObjectParameter | — |
| `stringArray` | EnterpriseCrmEventbusProtoStringParameterArray | — |
| `stringValue` | string | — |

### `EnterpriseCrmEventbusProtoPropertyEntry`

- Key-value pair of EventBus property.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key is used to retrieve the corresponding property value. This should be unique for a given fired event. The Tasks should be aware of the keys used while firing the events for them to be able to retrieve the values. |
| `value` | EnterpriseCrmEventbusProtoValueType | Values for the defined keys. Each value can either be string, int, double or any proto message. |

### `EnterpriseCrmEventbusProtoProtoArrayFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `GET`, `APPEND`, `SIZE`, `TO_SET`, `APPEND_ALL`, `TO_JSON`, `SET`, `REMOVE`, `REMOVE_AT`, `CONTAINS`, `FOR_EACH`, `FILTER`. |

### `EnterpriseCrmEventbusProtoProtoFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `GET_STRING_SUBFIELD`, `GET_INT_SUBFIELD`, `GET_DOUBLE_SUBFIELD`, `GET_BOOLEAN_SUBFIELD`, `GET_STRING_ARRAY_SUBFIELD`, `GET_INT_ARRAY_SUBFIELD`, `GET_DOUBLE_ARRAY_SUBFIELD`, `GET_BOOLEAN_ARRAY_SUBFIELD`, `GET_PROTO_ARRAY_SUBFIELD`, `GET_PROTO_SUBFIELD`, `TO_JSON`, `GET_BYTES_SUBFIELD_AS_UTF_8_STRING`, `GET_BYTES_SUBFIELD_AS_PROTO`, `EQUALS`. |

### `EnterpriseCrmEventbusProtoProtoParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `protoValues` | array<object> | — |

### `EnterpriseCrmEventbusProtoScatterResponse`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `errorMsg` | string | The error message of the failure if applicable. |
| `executionIds` | array<string> | The execution ids of each Subworkflow fired by this scatter. |
| `isSuccessful` | boolean | If execution is sync, this is true if the execution passed and false if it failed. If the execution is async, this is true if the WF was fired off successfully, and false if it failed to execute. The success or failure of the subworkflows executed are not captured. |
| `responseParams` | array<EnterpriseCrmEventbusProtoParameterEntry> | A list of all the response parameters in the aggregtorMap stored with the remapped key. |
| `scatterElement` | EnterpriseCrmEventbusProtoParameterValueType | The element that was scattered for this execution. |

### `EnterpriseCrmEventbusProtoSerializedObjectParameter`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `objectValue` | string (byte) | — |

### `EnterpriseCrmEventbusProtoStringArray`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | — |

### `EnterpriseCrmEventbusProtoStringArrayFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `GET`, `APPEND`, `SIZE`, `TO_SET`, `APPEND_ALL`, `TO_JSON`, `SET`, `REMOVE`, `REMOVE_AT`, `CONTAINS`, `FOR_EACH`, `FILTER`. |

### `EnterpriseCrmEventbusProtoStringFunction`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `functionName` | string enum | — Values: `UNSPECIFIED`, `CONCAT`, `TO_UPPERCASE`, `TO_LOWERCASE`, `CONTAINS`, `SPLIT`, `LENGTH`, `EQUALS`, `TO_INT`, `TO_DOUBLE`, `TO_BOOLEAN`, `TO_BASE_64`, `TO_JSON`, `EQUALS_IGNORE_CASE`, `REPLACE_ALL`, `SUBSTRING`, `RESOLVE_TEMPLATE`, `DECODE_BASE64_STRING`. |

### `EnterpriseCrmEventbusProtoStringParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `stringValues` | array<string> | — |

### `EnterpriseCrmEventbusProtoSuccessPolicy`

- Policy that dictates the behavior for the task after it completes successfully.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `finalState` | string enum | State to which the execution snapshot status will be set if the task succeeds. Values: `UNSPECIFIED`, `SUCCEEDED`, `SUSPENDED`. |

### `EnterpriseCrmEventbusProtoSuspensionAuthPermissions`

- LINT.IfChange
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gaiaIdentity` | EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity | Represents a Gaia identity for a person or service account. |
| `googleGroup` | EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity | — |
| `loasRole` | string | — |
| `mdbGroup` | string | — |

### `EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `emailAddress` | string | — |
| `gaiaId` | string (int64) | — |

### `EnterpriseCrmEventbusProtoSuspensionConfig`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `customMessage` | string | Optional information to provide recipients of the suspension in addition to the resolution URL, typically containing relevant parameter values from the originating workflow. |
| `notifications` | array<EnterpriseCrmEventbusProtoNotification> | — |
| `suspensionExpiration` | EnterpriseCrmEventbusProtoSuspensionExpiration | Indicates the next steps when no external actions happen on the suspension. |
| `whoMayResolve` | array<EnterpriseCrmEventbusProtoSuspensionAuthPermissions> | Identities able to resolve this suspension. |

### `EnterpriseCrmEventbusProtoSuspensionExpiration`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `expireAfterMs` | integer (int32) | Milliseconds after which the suspension expires, if no action taken. |
| `liftWhenExpired` | boolean | Whether the suspension will be REJECTED or LIFTED upon expiration. REJECTED is the default behavior. |
| `remindAfterMs` | integer (int32) | Milliseconds after which the previous suspension action reminder, if any, is sent using the selected notification option, for a suspension which is still PENDING_UNSPECIFIED. |

### `EnterpriseCrmEventbusProtoSuspensionResolutionInfo`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `audit` | EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit | — |
| `clientId` | string | The event data user sends as request. |
| `cloudKmsConfig` | EnterpriseCrmEventbusProtoCloudKmsConfig | KMS info, used by cmek/gmek integration |
| `createdTimestamp` | string (google-datetime) | Auto-generated. |
| `encryptedSuspensionResolutionInfo` | string (byte) | Encrypted SuspensionResolutionInfo |
| `eventExecutionInfoId` | string | Required. ID of the associated execution. |
| `externalTraffic` | EnterpriseCrmEventbusProtoExternalTraffic | The origin of the suspension for periodic notifications. |
| `lastModifiedTimestamp` | string (google-datetime) | Auto-generated. |
| `product` | string enum | Which Google product the suspension belongs to. If not set, the suspension belongs to Integration Platform by default. Values: `UNSPECIFIED_PRODUCT`, `IP`, `APIGEE`, `SECURITY`. |
| `status` | string enum | — Values: `PENDING_UNSPECIFIED`, `REJECTED`, `LIFTED`, `CANCELED`. |
| `suspensionConfig` | EnterpriseCrmEventbusProtoSuspensionConfig | — |
| `suspensionId` | string | Primary key for the SuspensionResolutionInfoTable. |
| `taskNumber` | string | Required. Task number of the associated SuspensionTask. |
| `workflowName` | string | Required. The name of the originating workflow. |
| `wrappedDek` | string (byte) | Wrapped dek |

### `EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `resolvedBy` | string | — |
| `resolvedByCpi` | string | — |
| `timestamp` | string (google-datetime) | — |

### `EnterpriseCrmEventbusProtoTaskAlertConfig`

- Message to be used to configure alerting in the {@code TaskConfig} protos for tasks in an event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationPeriod` | string | The period over which the metric value should be aggregated and evaluated. Format is , where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). |
| `alertDisabled` | boolean | Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert. |
| `alertName` | string | A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique in within the scope of the containing workflow. |
| `clientId` | string | Client associated with this alert configuration. Must be a client enabled in one of the containing workflow's triggers. |
| `durationThresholdMs` | string (int64) | Should be specified only for TASK_AVERAGE_DURATION and TASK_PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger. |
| `errorEnumList` | EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList | — |
| `metricType` | string enum | — Values: `METRIC_TYPE_UNSPECIFIED`, `TASK_ERROR_RATE`, `TASK_WARNING_RATE`, `TASK_RATE`, `TASK_AVERAGE_DURATION`, `TASK_PERCENTILE_DURATION`. |
| `numAggregationPeriods` | integer (int32) | For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired. |
| `onlyFinalAttempt` | boolean | Only count final task attempts, not retries. |
| `playbookUrl` | string | Link to a playbook for resolving the issue that triggered this alert. |
| `thresholdType` | string enum | The threshold type for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired. Values: `UNSPECIFIED_THRESHOLD_TYPE`, `EXPECTED_MIN`, `EXPECTED_MAX`. |
| `thresholdValue` | EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue | The metric value, above or below which the alert should be triggered. |
| `warningEnumList` | EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList | — |

### `EnterpriseCrmEventbusProtoTaskExecutionDetails`

- Contains the details of the execution of this task. Next available id: 11
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skippedOnFailure` | boolean | Indicates whether the task was skipped on failure. Only relevant if the task is in SKIPPED state. |
| `taskAttemptStats` | array<EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats> | — |
| `taskExecutionState` | string enum | — Values: `UNSPECIFIED`, `PENDING_EXECUTION`, `IN_PROCESS`, `SUCCEED`, `FAILED`, `FATAL`, `RETRY_ON_HOLD`, `SKIPPED`, `CANCELED`, `PENDING_ROLLBACK`, `ROLLBACK_IN_PROCESS`, `ROLLEDBACK`, `SUSPENDED`. |
| `taskNumber` | string | Pointer to the task config it used for execution. |

### `EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (int64) | The end time of the task execution for current attempt. |
| `startTime` | string (int64) | The start time of the task execution for current attempt. This could be in the future if it's been scheduled. |

### `EnterpriseCrmEventbusProtoTaskMetadata`

- TaskMetadata are attributes that are associated to every common Task we have.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeTaskName` | string | The new task name to replace the current task if it is deprecated. Otherwise, it is the same as the current task name. |
| `admins` | array<EnterpriseCrmEventbusProtoTaskMetadataAdmin> | — |
| `category` | string enum | — Values: `UNSPECIFIED_CATEGORY`, `CUSTOM`, `FLOW_CONTROL`, `DATA_MANIPULATION`, `SCRIPTING`, `CONNECTOR`, `HIDDEN`, `CLOUD_SYSTEMS`, `CUSTOM_TASK_TEMPLATE`, `TASK_RECOMMENDATIONS`. |
| `codeSearchLink` | string | The Code Search link to the Task Java file. |
| `defaultJsonValidationOption` | string enum | Controls whether JSON workflow parameters are validated against provided schemas before and/or after this task's execution. Values: `UNSPECIFIED_JSON_VALIDATION_OPTION`, `SKIP`, `PRE_EXECUTION`, `POST_EXECUTION`, `PRE_POST_EXECUTION`. |
| `defaultSpec` | string | Contains the initial configuration of the task with default values set. For now, The string should be compatible to an ASCII-proto format. |
| `description` | string | In a few sentences, describe the purpose and usage of the task. |
| `descriptiveName` | string | The string name to show on the task list on the Workflow editor screen. This should be a very short, one to two words name for the task. (e.g. "Send Mail") |
| `docMarkdown` | string | Snippet of markdown documentation to embed in the RHP for this task. |
| `externalCategory` | string enum | — Values: `UNSPECIFIED_EXTERNAL_CATEGORY`, `CORE`, `CONNECTORS`, `EXTERNAL_HTTP`, `EXTERNAL_INTEGRATION_SERVICES`, `EXTERNAL_CUSTOMER_ACTIONS`, `EXTERNAL_FLOW_CONTROL`, `EXTERNAL_WORKSPACE`, `EXTERNAL_SECURITY`, `EXTERNAL_DATABASES`, `EXTERNAL_ANALYTICS`, `EXTERNAL_BYOC`, `EXTERNAL_BYOT`, `EXTERNAL_ARTIFICIAL_INTELIGENCE`, `EXTERNAL_DATA_MANIPULATION`. |
| `externalCategorySequence` | integer (int32) | Sequence with which the task in specific category to be displayed in task discovery panel for external users. |
| `externalDocHtml` | string | External-facing documention embedded in the RHP for this task. |
| `externalDocLink` | string | Doc link for external-facing documentation (separate from g3doc). |
| `externalDocMarkdown` | string | DEPRECATED: Use external_doc_html. |
| `g3DocLink` | string | URL to the associated G3 Doc for the task if available |
| `iconLink` | string | URL to gstatic image icon for this task. This icon shows up on the task list panel along with the task name in the Workflow Editor screen. Use the 24p, 2x, gray color icon image format. |
| `isDeprecated` | boolean | The deprecation status of the current task. Default value is false; |
| `name` | string | The actual class name or the annotated name of the task. Task Author should initialize this field with value from the getName() method of the Task class. |
| `standaloneExternalDocHtml` | string | External-facing documention for standalone IP in pantheon embedded in the RHP for this task. Non null only if different from external_doc_html |
| `status` | string enum | Allows author to indicate if the task is ready to use or not. If not set, then it will default to INACTIVE. Values: `UNSPECIFIED_STATUS`, `DEFAULT_INACTIVE`, `ACTIVE`. |
| `system` | string enum | — Values: `UNSPECIFIED_SYSTEM`, `GENERIC`, `BUGANIZER`, `SALESFORCE`, `CLOUD_SQL`, `PLX`, `SHEETS`, `GOOGLE_GROUPS`, `EMAIL`, `SPANNER`, `DATA_BRIDGE`. |
| `tags` | array<string> | A set of tags that pertain to a particular task. This can be used to improve the searchability of tasks with several names ("REST Caller" vs. "Call REST Endpoint") or to help users find tasks based on related words. |

### `EnterpriseCrmEventbusProtoTaskMetadataAdmin`

- Admins are owners of a Task, and have all permissions on a particular task identified by the task name. By default, Eventbus periodically scans all task metadata and syncs (adds) any new admins defined here to Zanzibar.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `googleGroupEmail` | string | — |
| `userEmail` | string | — |

### `EnterpriseCrmEventbusProtoTaskUiConfig`

- Task authors would use this type to configure the UI for a particular task by specifying what UI config modules should be included to compose the UI. Learn more about config module framework:
- Version: v1

| Field | Type | Description |
|---|---|---|
| `taskUiModuleConfigs` | array<EnterpriseCrmEventbusProtoTaskUiModuleConfig> | Configurations of included config modules. |

### `EnterpriseCrmEventbusProtoTaskUiModuleConfig`

- Task author would use this type to configure a config module.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `moduleId` | string enum | ID of the config module. Values: `UNSPECIFIED_TASK_MODULE`, `LABEL`, `ERROR_HANDLING`, `TASK_PARAM_TABLE`, `TASK_PARAM_FORM`, `PRECONDITION`, `SCRIPT_EDITOR`, `RPC`, `TASK_SUMMARY`, `SUSPENSION`, `RPC_TYPED`, `SUB_WORKFLOW`, `APPS_SCRIPT_NAVIGATOR`, `SUB_WORKFLOW_FOR_EACH_LOOP`, `FIELD_MAPPING`, `README`, `REST_CALLER`, `SUB_WORKFLOW_SCATTER_GATHER`, `CLOUD_SQL`, `GENERIC_CONNECTOR_TASK`. |

### `EnterpriseCrmEventbusProtoTeardown`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `teardownTaskConfigs` | array<EnterpriseCrmEventbusProtoTeardownTaskConfig> | Required. |

### `EnterpriseCrmEventbusProtoTeardownTaskConfig`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creatorEmail` | string | The creator's email address. |
| `name` | string | Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks. |
| `nextTeardownTask` | EnterpriseCrmEventbusProtoNextTeardownTask | — |
| `parameters` | EnterpriseCrmEventbusProtoEventParameters | The parameters the user can pass to this task. |
| `properties` | EnterpriseCrmEventbusProtoEventBusProperties | — |
| `teardownTaskImplementationClassName` | string | Required. Implementation class name. |

### `EnterpriseCrmEventbusProtoToken`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | — |
| `value` | string | — |

### `EnterpriseCrmEventbusProtoTransformExpression`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `initialValue` | EnterpriseCrmEventbusProtoBaseValue | Initial value upon which to perform transformations. |
| `transformationFunctions` | array<EnterpriseCrmEventbusProtoFunction> | Transformations to be applied sequentially. |

### `EnterpriseCrmEventbusProtoTriggerCriteria`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | string | Required. Standard filter expression, when true the workflow will be executed. If there's no trigger_criteria_task_implementation_class_name specified, the condition will be validated directly. |
| `parameters` | EnterpriseCrmEventbusProtoEventParameters | Optional. To be used in TaskConfig for the implementation class. |
| `triggerCriteriaTaskImplementationClassName` | string | Optional. Implementation class name. The class should implement the “TypedTask” interface. |

### `EnterpriseCrmEventbusProtoValueType`

- Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `booleanValue` | boolean | — |
| `doubleArray` | EnterpriseCrmEventbusProtoDoubleArray | — |
| `doubleValue` | number (double) | — |
| `intArray` | EnterpriseCrmEventbusProtoIntArray | — |
| `intValue` | string (int64) | — |
| `protoValue` | object | — |
| `stringArray` | EnterpriseCrmEventbusProtoStringArray | — |
| `stringValue` | string | — |

### `EnterpriseCrmEventbusProtoWorkflowAlertConfig`

- Message to be used to configure custom alerting in the {@code EventConfig} protos for an event.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationPeriod` | string | For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours. |
| `alertDisabled` | boolean | Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert. |
| `alertName` | string | A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the workflow. |
| `clientId` | string | Client associated with this alert configuration. |
| `durationThresholdMs` | string (int64) | Should be specified only for \*AVERAGE_DURATION and \*PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger. |
| `errorEnumList` | EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList | — |
| `metricType` | string enum | — Values: `METRIC_TYPE_UNSPECIFIED`, `EVENT_ERROR_RATE`, `EVENT_WARNING_RATE`, `TASK_ERROR_RATE`, `TASK_WARNING_RATE`, `TASK_RATE`, `EVENT_RATE`, `EVENT_AVERAGE_DURATION`, `EVENT_PERCENTILE_DURATION`, `TASK_AVERAGE_DURATION`, `TASK_PERCENTILE_DURATION`. |
| `numAggregationPeriods` | integer (int32) | For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired. |
| `onlyFinalAttempt` | boolean | For either events or tasks, depending on the type of alert, count only final attempts, not retries. |
| `playbookUrl` | string | Link to a playbook for resolving the issue that triggered this alert. |
| `thresholdType` | string enum | The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired. Values: `UNSPECIFIED_THRESHOLD_TYPE`, `EXPECTED_MIN`, `EXPECTED_MAX`. |
| `thresholdValue` | EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue | The metric value, above or below which the alert should be triggered. |
| `warningEnumList` | EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList | — |

### `EnterpriseCrmEventbusStats`

- Stats for the requested dimensions: QPS, duration, and error/warning rate
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dimensions` | EnterpriseCrmEventbusStatsDimensions | Dimensions that these stats have been aggregated on. |
| `durationInSeconds` | number (double) | Average duration in seconds. |
| `errorRate` | number (double) | Average error rate. |
| `qps` | number (double) | Queries per second. |
| `warningRate` | number (double) | Average warning rate. |

### `EnterpriseCrmEventbusStatsDimensions`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | — |
| `enumFilterType` | string enum | Whether to include or exclude the enums matching the regex. Values: `DEFAULT_INCLUSIVE`, `EXCLUSIVE`. |
| `errorEnumString` | string | — |
| `retryAttempt` | string enum | — Values: `UNSPECIFIED`, `FINAL`, `RETRYABLE`, `CANCELED`. |
| `taskName` | string | — |
| `taskNumber` | string | — |
| `triggerId` | string | Stats have been or will be aggregated on set fields for any semantically-meaningful combination. |
| `warningEnumString` | string | — |
| `workflowId` | string | — |
| `workflowName` | string | — |

### `EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `booleanValues` | array<boolean> | — |

### `EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `doubleValues` | array<number> | — |

### `EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails`

- Contains the details of the execution info of this event: this includes the tasks execution details plus the event execution statistics. Next available id: 12
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelReason` | string | If the execution is manually canceled, this field will contain the reason for cancellation. |
| `eventAttemptStats` | array<EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats> | — |
| `eventExecutionSnapshot` | array<EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot> | After snapshot migration, this field will no longer be populated, but old execution snapshots will still be accessible. |
| `eventExecutionSnapshotsSize` | string (int64) | Total size of all event_execution_snapshots for an execution |
| `eventExecutionState` | string enum | The execution state of this event. Values: `UNSPECIFIED`, `ON_HOLD`, `IN_PROCESS`, `SUCCEEDED`, `FAILED`, `CANCELED`, `RETRY_ON_HOLD`, `SUSPENDED`. |
| `eventRetriesFromBeginningCount` | integer (int32) | Indicates the number of times the execution has restarted from the beginning. |
| `logFilePath` | string | The log file path (aka. cns address) for this event. |
| `networkAddress` | string | The network address (aka. bns address) that indicates where the event executor is running. |
| `nextExecutionTime` | string (int64) | Next scheduled execution time in case the execution status was RETRY_ON_HOLD. |
| `ryeLockUnheldCount` | integer (int32) | Used internally and shouldn't be exposed to users. A counter for the cron job to record how many times this event is in in_process state but don't have a lock consecutively/ |

### `EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo`

- Contains all the execution details for a workflow instance. Next available id: 27
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | The event data user sends as request. |
| `cloudLoggingDetails` | EnterpriseCrmEventbusProtoCloudLoggingDetails | Cloud Logging details for execution info |
| `createTime` | string (int64) | Auto-generated. |
| `errorCode` | CrmlogErrorCode | Final error-code if event failed. |
| `errors` | array<EnterpriseCrmEventbusProtoErrorDetail> | Errors, warnings, and informationals associated with the workflow/task. The order in which the errors were added by the workflow/task is maintained. |
| `eventExecutionDetails` | EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails | The execution info about this event. |
| `eventExecutionInfoId` | string | Auto-generated primary key. |
| `executionTraceInfo` | EnterpriseCrmEventbusProtoExecutionTraceInfo | Execution trace info to aggregate parent-child executions. |
| `integrationVersionUserLabel` | string | User-defined label that annotates the executed integration version. |
| `lastModifiedTime` | string (int64) | Auto-generated. |
| `postMethod` | string enum | The ways user posts this event. Values: `UNSPECIFIED`, `POST`, `POST_TO_QUEUE`, `SCHEDULE`, `POST_BY_EVENT_CONFIG_ID`, `POST_WITH_EVENT_DETAILS`. |
| `product` | string enum | Which Google product the execution_info belongs to. If not set, the execution_info belongs to Integration Platform by default. Values: `UNSPECIFIED_PRODUCT`, `IP`, `APIGEE`, `SECURITY`. |
| `replayInfo` | EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo | Replay info for the execution |
| `requestId` | string | Optional. This is used to de-dup incoming request. |
| `requestParams` | EnterpriseCrmFrontendsEventbusProtoEventParameters | Event parameters come in as part of the request. |
| `responseParams` | EnterpriseCrmFrontendsEventbusProtoEventParameters | Event parameters come out as part of the response. |
| `snapshotNumber` | string (int64) | Workflow snapshot number. |
| `tenant` | string | Tenant this event is created. Used to reschedule the event to correct tenant. |
| `triggerId` | string | The trigger id of the workflow trigger config. If both trigger_id and client_id is present, the workflow is executed from the start tasks provided by the matching trigger config otherwise it is executed from the default start tasks. |
| `workflowId` | string | Required. Pointer to the workflow it is executing. |
| `workflowName` | string | Name of the workflow. |
| `workflowRetryBackoffIntervalSeconds` | string (int64) | Time interval in seconds to schedule retry of workflow in manifold when workflow is already running |

### `EnterpriseCrmFrontendsEventbusProtoEventExecutionInfoReplayInfo`

- Contains the details of the execution info: this includes the replay reason and replay tree connecting executions in a parent-child relationship
- Version: v1

| Field | Type | Description |
|---|---|---|
| `originalExecutionInfoId` | string | If this execution is a replay of another execution, then this field contains the original execution id. |
| `replayMode` | string enum | Replay mode for the execution Values: `REPLAY_MODE_UNSPECIFIED`, `REPLAY_MODE_FROM_BEGINNING`, `REPLAY_MODE_POINT_OF_FAILURE`. |
| `replayReason` | string | reason for replay |
| `replayedExecutionInfoIds` | array<string> | If this execution has been replayed, then this field contains the execution ids of the replayed executions. |

### `EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `checkpointTaskNumber` | string | Indicates "right after which checkpoint task's execution" this snapshot is taken. |
| `conditionResults` | array<EnterpriseCrmEventbusProtoConditionResult> | All of the computed conditions that been calculated. |
| `diffParams` | EnterpriseCrmFrontendsEventbusProtoEventParameters | The parameters in Event object that differs from last snapshot. |
| `eventExecutionInfoId` | string | Points to the event execution info this snapshot belongs to. |
| `eventExecutionSnapshotId` | string | Auto-generated. Used as primary key for EventExecutionSnapshots table. |
| `eventExecutionSnapshotMetadata` | EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata | — |
| `eventParams` | EnterpriseCrmFrontendsEventbusProtoEventParameters | The parameters in Event object. |
| `snapshotTime` | string (int64) | Indicates when this snapshot is taken. |
| `taskExecutionDetails` | array<EnterpriseCrmEventbusProtoTaskExecutionDetails> | All of the task execution details at the given point of time. |
| `taskName` | string | The task name associated with this snapshot. Could be empty. |

### `EnterpriseCrmFrontendsEventbusProtoEventParameters`

- LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | array<EnterpriseCrmFrontendsEventbusProtoParameterEntry> | Parameters are a part of Event and can be used to communicate between different tasks that are part of the same workflow execution. |

### `EnterpriseCrmFrontendsEventbusProtoIntParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `intValues` | array<string> | — |

### `EnterpriseCrmFrontendsEventbusProtoParamSpecEntry`

- Key-value pair of EventBus task parameters. Next id: 13
- Version: v1

| Field | Type | Description |
|---|---|---|
| `className` | string | The FQCN of the Java object this represents. A string, for example, would be "java.lang.String". If this is "java.lang.Object", the parameter can be of any type. |
| `collectionElementClassName` | string | If it is a collection of objects, this would be the FCQN of every individual element in the collection. If this is "java.lang.Object", the parameter is a collection of any type. |
| `config` | EnterpriseCrmEventbusProtoParamSpecEntryConfig | Optional fields, such as help text and other useful info. |
| `dataType` | string enum | The data type of the parameter. Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |
| `defaultValue` | EnterpriseCrmFrontendsEventbusProtoParameterValueType | Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. |
| `isDeprecated` | boolean | If set, this entry is deprecated, so further use of this parameter should be prohibited. |
| `isOutput` | boolean | — |
| `jsonSchema` | string | If the data_type is JSON_VALUE, then this will define its schema. |
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given task. These parameters must be predefined in the workflow definition. |
| `protoDef` | EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition | Populated if this represents a proto or proto array. |
| `required` | boolean | If set, the user must provide an input value for this parameter. |
| `validationRule` | EnterpriseCrmEventbusProtoParamSpecEntryValidationRule | Rule used to validate inputs (individual values and collection elements) for this parameter. |

### `EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | array<EnterpriseCrmFrontendsEventbusProtoParamSpecEntry> | — |

### `EnterpriseCrmFrontendsEventbusProtoParameterEntry`

- Key-value pair of EventBus parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | Explicitly getting the type of the parameter. Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition. |
| `masked` | boolean | True if this parameter should be masked in the logs |
| `value` | EnterpriseCrmFrontendsEventbusProtoParameterValueType | Values for the defined keys. Each value can either be string, int, double or any proto message. |

### `EnterpriseCrmFrontendsEventbusProtoParameterMap`

- A generic multi-map that holds key value pairs. They keys and values can be of any type, unless specified.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `entries` | array<EnterpriseCrmFrontendsEventbusProtoParameterMapEntry> | — |
| `keyType` | string enum | Option to specify key value type for all entries of the map. If provided then field types for all entries must conform to this. Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |
| `valueType` | string enum | — Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |

### `EnterpriseCrmFrontendsEventbusProtoParameterMapEntry`

- Entry is a pair of key and value.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | EnterpriseCrmFrontendsEventbusProtoParameterMapField | — |
| `value` | EnterpriseCrmFrontendsEventbusProtoParameterMapField | — |

### `EnterpriseCrmFrontendsEventbusProtoParameterMapField`

- Field represents either the key or value in an entry.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `literalValue` | EnterpriseCrmFrontendsEventbusProtoParameterValueType | Passing a literal value. |
| `referenceKey` | string | Referencing one of the WF variables. |

### `EnterpriseCrmFrontendsEventbusProtoParameterValueType`

- To support various types of parameter values. Next available id: 14
- Version: v2

| Field | Type | Description |
|---|---|---|
| `booleanArray` | EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray | — |
| `booleanValue` | boolean | — |
| `doubleArray` | EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray | — |
| `doubleValue` | number (double) | — |
| `intArray` | EnterpriseCrmFrontendsEventbusProtoIntParameterArray | — |
| `intValue` | string (int64) | — |
| `jsonValue` | string | — |
| `protoArray` | EnterpriseCrmFrontendsEventbusProtoProtoParameterArray | — |
| `protoValue` | object | — |
| `serializedObjectValue` | EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter | — |
| `stringArray` | EnterpriseCrmFrontendsEventbusProtoStringParameterArray | — |
| `stringValue` | string | — |

### `EnterpriseCrmFrontendsEventbusProtoProtoParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `protoValues` | array<object> | — |

### `EnterpriseCrmFrontendsEventbusProtoRollbackStrategy`

- Next available id: 4
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | EnterpriseCrmFrontendsEventbusProtoEventParameters | Optional. The customized parameters the user can pass to this task. |
| `rollbackTaskImplementationClassName` | string | Required. This is the name of the task that needs to be executed upon rollback of this task. |
| `taskNumbersToRollback` | array<string> | Required. These are the tasks numbers of the tasks whose `rollback_strategy.rollback_task_implementation_class_name` needs to be executed upon failure of this task. |

### `EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `objectValue` | string (byte) | — |

### `EnterpriseCrmFrontendsEventbusProtoStringParameterArray`

-
- Version: v2

| Field | Type | Description |
|---|---|---|
| `stringValues` | array<string> | — |

### `EnterpriseCrmFrontendsEventbusProtoTaskConfig`

- The task configuration details. This is not the implementation of Task. There might be multiple TaskConfigs for the same Task.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertConfigs` | array<EnterpriseCrmEventbusProtoTaskAlertConfig> | Alert configurations on error rate, warning rate, number of runs, durations, etc. |
| `conditionalFailurePolicies` | EnterpriseCrmEventbusProtoConditionalFailurePolicies | Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post). |
| `createTime` | string (google-datetime) | Auto-generated. |
| `creatorEmail` | string | The creator's email address. Auto-generated from the user's email. |
| `description` | string | User-provided description intended to give more business context about the task. |
| `disableStrictTypeValidation` | boolean | If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter. |
| `errorCatcherId` | string | Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task |
| `externalTaskType` | string enum | — Values: `EXTERNAL_TASK_TYPE_UNSPECIFIED`, `NORMAL_TASK`, `ERROR_TASK`. |
| `failurePolicy` | EnterpriseCrmEventbusProtoFailurePolicy | Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for asynchronous calls to Eventbus alone (Post To Queue, Schedule etc.). |
| `incomingEdgeCount` | integer (int32) | The number of edges leading into this TaskConfig. |
| `jsonValidationOption` | string enum | If set, overrides the option configured in the Task implementation class. Values: `UNSPECIFIED_JSON_VALIDATION_OPTION`, `SKIP`, `PRE_EXECUTION`, `POST_EXECUTION`, `PRE_POST_EXECUTION`. |
| `label` | string | User-provided label that is attached to this TaskConfig in the UI. |
| `lastModifiedTime` | string (google-datetime) | Auto-generated. |
| `nextTasks` | array<EnterpriseCrmEventbusProtoNextTask> | The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true. |
| `nextTasksExecutionPolicy` | string enum | The policy dictating the execution of the next set of tasks for the current task. Values: `UNSPECIFIED`, `RUN_ALL_MATCH`, `RUN_FIRST_MATCH`. |
| `parameters` | object | The customized parameters the user can pass to this task. |
| `position` | EnterpriseCrmEventbusProtoCoordinate | Optional. Informs the front-end application where to draw this task config on the UI. |
| `precondition` | string | Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task. |
| `preconditionLabel` | string | Optional. User-provided label that is attached to precondition in the UI. |
| `rollbackStrategy` | EnterpriseCrmFrontendsEventbusProtoRollbackStrategy | Optional. Contains information about what needs to be done upon failure (either a permanent error or after it has been retried too many times). |
| `successPolicy` | EnterpriseCrmEventbusProtoSuccessPolicy | Determines what action to take upon successful task completion. |
| `synchronousCallFailurePolicy` | EnterpriseCrmEventbusProtoFailurePolicy | Optional. Determines the number of times the task will be retried on failure and with what retry strategy. This is applicable for synchronous calls to Eventbus alone (Post). |
| `taskEntity` | EnterpriseCrmFrontendsEventbusProtoTaskEntity | Copy of the task entity that this task config is an instance of. |
| `taskExecutionStrategy` | string enum | The policy dictating the execution strategy of this task. Values: `WHEN_ALL_SUCCEED`, `WHEN_ANY_SUCCEED`, `WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED`. |
| `taskName` | string | The name for the task. |
| `taskNumber` | string | REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`). |
| `taskSpec` | string | A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field. |
| `taskTemplateName` | string | Used to define task-template name if task is of type task-template |
| `taskType` | string enum | Defines the type of the task Values: `TASK`, `ASIS_TEMPLATE`, `IO_TEMPLATE`. |

### `EnterpriseCrmFrontendsEventbusProtoTaskEntity`

- Contains a task's metadata and associated information. Next available id: 7
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disabledForVpcSc` | boolean | True if the task has conflict with vpcsc |
| `metadata` | EnterpriseCrmEventbusProtoTaskMetadata | Metadata inclueds the task name, author and so on. |
| `paramSpecs` | EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage | Declarations for inputs/outputs for a TypedTask. This is also associated with the METADATA mask. |
| `stats` | EnterpriseCrmEventbusStats | Deprecated - statistics from the Monarch query. |
| `taskType` | string enum | Defines the type of the task Values: `TASK`, `ASIS_TEMPLATE`, `IO_TEMPLATE`. |
| `uiConfig` | EnterpriseCrmEventbusProtoTaskUiConfig | UI configuration for this task Also associated with the METADATA mask. |

### `EnterpriseCrmFrontendsEventbusProtoTriggerConfig`

- Configuration detail of a trigger. Next available id: 22
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertConfig` | array<EnterpriseCrmEventbusProtoWorkflowAlertConfig> | An alert threshold configuration for the \[trigger + client + workflow\] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per \[client + trigger + workflow\] when published. |
| `cloudSchedulerConfig` | EnterpriseCrmEventbusProtoCloudSchedulerConfig | — |
| `description` | string | User-provided description intended to give more business context about the task. |
| `enabledClients` | array<string> | Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client. |
| `errorCatcherId` | string | Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task |
| `inputVariables` | EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables | Optional. List of input variables for the api trigger. |
| `label` | string | The user created label for a particular trigger. |
| `nextTasksExecutionPolicy` | string enum | Dictates how next tasks will be executed. Values: `UNSPECIFIED`, `RUN_ALL_MATCH`, `RUN_FIRST_MATCH`. |
| `outputVariables` | EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables | Optional. List of output variables for the api trigger. |
| `pauseWorkflowExecutions` | boolean | Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed. |
| `position` | EnterpriseCrmEventbusProtoCoordinate | Optional. Informs the front-end application where to draw this trigger config on the UI. |
| `properties` | object | Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers. |
| `startTasks` | array<EnterpriseCrmEventbusProtoNextTask> | Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph). |
| `triggerCriteria` | EnterpriseCrmEventbusProtoTriggerCriteria | Optional. When set, Eventbus will run the task specified in the trigger_criteria and validate the result using the trigger_criteria.condition, and only execute the workflow when result is true. |
| `triggerId` | string | The backend trigger ID. |
| `triggerName` | string | Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring. |
| `triggerNumber` | string | Required. A number to uniquely identify each trigger config within the workflow on UI. |
| `triggerType` | string enum | — Values: `UNKNOWN`, `CLOUD_PUBSUB`, `GOOPS`, `SFDC_SYNC`, `CRON`, `API`, `MANIFOLD_TRIGGER`, `DATALAYER_DATA_CHANGE`, `SFDC_CHANNEL`, `CLOUD_PUBSUB_EXTERNAL`, `SFDC_CDC_CHANNEL`, `SFDC_PLATFORM_EVENTS_CHANNEL`, `CLOUD_SCHEDULER`, `INTEGRATION_CONNECTOR_TRIGGER`, `PRIVATE_TRIGGER`, `EVENTARC_TRIGGER`. |

### `EnterpriseCrmFrontendsEventbusProtoTriggerConfigVariables`

- Variables names mapped to api trigger.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `names` | array<string> | Optional. List of variable names. |

### `EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | EnterpriseCrmEventbusProtoAttributes | Metadata information about the parameters. |
| `children` | array<EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry> | Child parameters nested within this parameter. This field only applies to protobuf parameters |
| `containsLargeData` | boolean | Indicates whether this variable contains large data and need to be uploaded to Cloud Storage. |
| `dataType` | string enum | The data type of the parameter. Values: `DATA_TYPE_UNSPECIFIED`, `STRING_VALUE`, `INT_VALUE`, `DOUBLE_VALUE`, `BOOLEAN_VALUE`, `PROTO_VALUE`, `SERIALIZED_OBJECT_VALUE`, `STRING_ARRAY`, `INT_ARRAY`, `DOUBLE_ARRAY`, `PROTO_ARRAY`, `PROTO_ENUM`, `BOOLEAN_ARRAY`, `PROTO_ENUM_ARRAY`, `BYTES`, `BYTES_ARRAY`, `NON_SERIALIZABLE_OBJECT`, `JSON_VALUE`. |
| `defaultValue` | EnterpriseCrmFrontendsEventbusProtoParameterValueType | Default values for the defined keys. Each value can either be string, int, double or any proto message or a serialized object. |
| `description` | string | Optional. The description about the parameter |
| `inOutType` | string enum | Specifies the input/output type for the parameter. Values: `IN_OUT_TYPE_UNSPECIFIED`, `IN`, `OUT`, `IN_OUT`. |
| `isTransient` | boolean | Whether this parameter is a transient parameter. |
| `jsonSchema` | string | This schema will be used to validate runtime JSON-typed values of this parameter. |
| `key` | string | Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition. |
| `name` | string | The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName". |
| `producedBy` | EnterpriseCrmEventbusProtoNodeIdentifier | The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param. |
| `producer` | string | — |
| `protoDefName` | string | The name of the protobuf type if the parameter has a protobuf data type. |
| `protoDefPath` | string | If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry". |
| `required` | boolean | — |

### `EnterpriseCrmFrontendsEventbusProtoWorkflowParameters`

- LINT.IfChange This is the frontend version of WorkflowParameters. It's exactly like the backend version except that instead of flattening protobuf parameters and treating every field and subfield of a protobuf parameter as a separate parameter, the fields/subfields of a protobuf parameter will be nested as "children" (see 'children' field below) parameters of the parent parameter. Please refer to enterprise/crm/eventbus/proto/workflow_parameters.proto for more information about WorkflowParameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | array<EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry> | Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution. |

### `GoogleApiHttpBody`

- Message that represents an arbitrary HTTP body. It should only be used for payload formats that can't be represented as JSON, such as raw binary or an HTML page. This message can be used both in streaming and non-streaming API methods in the request as well as the response. It can be used as a top-level request field, which is convenient if one wants to extract parameters from either the URL or HTTP template into the request fields and also want access to the raw HTTP body. Example: message GetResourceRequest { // A unique request id. string request_id = 1; // The raw HTTP body is bound to this field. google.api.HttpBody http_body = 2; } service ResourceService { rpc GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); } Example with streaming methods: service CaldavService { rpc GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); rpc UpdateCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); } Use of this type only changes how the request and response bodies are handled, all other features will continue to work unchanged.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `contentType` | string | The HTTP Content-Type header value specifying the content type of the body. |
| `data` | string (byte) | The HTTP request/response body as raw binary. |
| `extensions` | array<object> | Application specific response metadata. Must be set in the first response for streaming APIs. |

### `GoogleCloudConnectorsV1AdminFilters`

- \* AdminFilters defines a set of filters that can be applied to a connection. These are currently used by Gemini Enterprise connections.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filterKey` | string | Required. Unique name for the filter, e.g., "SharePointSiteURL", "DocumentType", "ChatSpaceName". |
| `filterType` | string enum | Required. Type of the filter. Values: `FILTER_TYPE_UNSPECIFIED`, `INCLUSION`, `EXCLUSION`. |
| `intValue` | string (int64) | Optional. A single integer value. |
| `stringListValues` | GoogleCloudConnectorsV1AdminFiltersStringListValues | Optional. List of string values. |
| `stringValue` | string | Optional. A single string value. |

### `GoogleCloudConnectorsV1AdminFiltersStringListValues`

- StringListValues is a message to store a list of string values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `listValues` | array<string> | Required. The list of string values. |

### `GoogleCloudConnectorsV1AuthConfig`

- AuthConfig defines details of a authentication type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalVariables` | array<GoogleCloudConnectorsV1ConfigVariable> | Optional. List containing additional auth configs. |
| `authKey` | string | Optional. Identifier key for auth config |
| `authType` | string enum | Optional. The type of authentication configured. Values: `AUTH_TYPE_UNSPECIFIED`, `USER_PASSWORD`, `OAUTH2_JWT_BEARER`, `OAUTH2_CLIENT_CREDENTIALS`, `SSH_PUBLIC_KEY`, `OAUTH2_AUTH_CODE_FLOW`, `GOOGLE_AUTHENTICATION`, `OAUTH2_AUTH_CODE_FLOW_GOOGLE_MANAGED`. |
| `oauth2AuthCodeFlow` | GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow | Oauth2AuthCodeFlow. |
| `oauth2AuthCodeFlowGoogleManaged` | GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged | Oauth2AuthCodeFlowGoogleManaged. |
| `oauth2ClientCredentials` | GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials | Oauth2ClientCredentials. |
| `oauth2JwtBearer` | GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer | Oauth2JwtBearer. |
| `sshPublicKey` | GoogleCloudConnectorsV1AuthConfigSshPublicKey | SSH Public Key. |
| `userPassword` | GoogleCloudConnectorsV1AuthConfigUserPassword | UserPassword. |

### `GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlow`

- Parameters to support Oauth 2.0 Auth Code Grant Authentication. See https://www.rfc-editor.org/rfc/rfc6749#section-1.3.1 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authCode` | string | Optional. Authorization code to be exchanged for access and refresh tokens. |
| `authUri` | string | Optional. Auth URL for Authorization Code Flow |
| `clientId` | string | Optional. Client ID for user-provided OAuth app. |
| `clientSecret` | GoogleCloudConnectorsV1Secret | Optional. Client secret for user-provided OAuth app. |
| `enablePkce` | boolean | Optional. Whether to enable PKCE when the user performs the auth code flow. |
| `pkceVerifier` | string | Optional. PKCE verifier to be used during the auth code exchange. |
| `redirectUri` | string | Optional. Redirect URI to be provided during the auth code exchange. |
| `scopes` | array<string> | Optional. Scopes the connection will request when the user performs the auth code flow. |

### `GoogleCloudConnectorsV1AuthConfigOauth2AuthCodeFlowGoogleManaged`

- Parameters to support Oauth 2.0 Auth Code Grant Authentication using Google Provided OAuth Client. See https://tools.ietf.org/html/rfc6749#section-1.3.1 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authCode` | string | Optional. Authorization code to be exchanged for access and refresh tokens. |
| `redirectUri` | string | Optional. Redirect URI to be provided during the auth code exchange. |
| `scopes` | array<string> | Required. Scopes the connection will request when the user performs the auth code flow. |

### `GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials`

- Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | Optional. The client identifier. |
| `clientSecret` | GoogleCloudConnectorsV1Secret | Optional. Secret version reference containing the client secret. |

### `GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer`

- Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0 Authorization Grant based authentication. See https://tools.ietf.org/html/rfc7523 for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientKey` | GoogleCloudConnectorsV1Secret | Optional. Secret version reference containing a PKCS#8 PEM-encoded private key associated with the Client Certificate. This private key will be used to sign JWTs used for the jwt-bearer authorization grant. Specified in the form as: `projects/*/secrets/*/versions/*`. |
| `jwtClaims` | GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims | Optional. JwtClaims providers fields to generate the token. |

### `GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims`

- JWT claims used for the jwt-bearer authorization grant.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `audience` | string | Optional. Value for the "aud" claim. |
| `issuer` | string | Optional. Value for the "iss" claim. |
| `subject` | string | Optional. Value for the "sub" claim. |

### `GoogleCloudConnectorsV1AuthConfigSshPublicKey`

- Parameters to support Ssh public key Authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certType` | string | Optional. Format of SSH Client cert. |
| `sshClientCert` | GoogleCloudConnectorsV1Secret | Optional. SSH Client Cert. It should contain both public and private key. |
| `sshClientCertPass` | GoogleCloudConnectorsV1Secret | Optional. Password (passphrase) for ssh client certificate if it has one. |
| `username` | string | Optional. The user account used to authenticate. |

### `GoogleCloudConnectorsV1AuthConfigUserPassword`

- Parameters to support Username and Password Authentication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `password` | GoogleCloudConnectorsV1Secret | Optional. Secret version reference containing the password. |
| `username` | string | Optional. Username. |

### `GoogleCloudConnectorsV1BillingConfig`

- Billing config for the connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingCategory` | string enum | Output only. Billing category for the connector. Values: `BILLING_CATEGORY_UNSPECIFIED`, `GCP_AND_TECHNICAL_CONNECTOR`, `NON_GCP_CONNECTOR`. |

### Shape of `CrmlogErrorCode`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "commonErrorCode": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `integrations` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://integrations.googleapis.com/$discovery/rest?version=v2, https://integrations.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
