---
source: https://workflowexecutions.googleapis.com/$discovery/rest?version=v1
---

# Workflow Executions API message schemas (workflowexecutions)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/workflowexecutions/`.

### `Callback`

- An instance of a Callback created by an execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availablePayloads` | array<string> | Output only. The payloads received by the callback that have not been processed by a waiting execution step. |
| `method` | string | Output only. The method accepted by the callback. For example: GET, POST, PUT. |
| `name` | string | Output only. The resource name of the callback. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}/callback/{callback} |
| `waiters` | string (int64) | Output only. Number of execution steps waiting on this callback. |

### `CancelExecutionRequest`

- Request for the CancelExecution method.
- Version: v1

### `DeleteExecutionHistoryRequest`

- Request for the DeleteExecutionHistory method.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Error`

- Error describes why the execution was abnormally terminated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `context` | string | Human-readable stack trace string. |
| `payload` | string | Error message and data returned represented as a JSON string. |
| `stackTrace` | StackTrace | Stack trace with detailed information of where error was generated. |

### `Exception`

- Exception describes why the step entry failed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `payload` | string | Error message represented as a JSON string. |

### `Execution`

- A running instance of a Workflow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `argument` | string | Input parameters of the execution represented as a JSON string. The size limit is 32KB. \*Note\*: If you are using the REST API directly to run your workflow, you must escape any JSON string value of `argument`. Example: `'{"argument":"{\"firstName\":\"FIRST\",\"lastName\":\"LAST\"}"}'` |
| `callLogLevel` | string enum | The call logging level associated to this execution. Values: `CALL_LOG_LEVEL_UNSPECIFIED`, `LOG_ALL_CALLS`, `LOG_ERRORS_ONLY`, `LOG_NONE`. |
| `createTime` | string (google-datetime) | Output only. Marks the creation of the execution. |
| `disableConcurrencyQuotaOverflowBuffering` | boolean | Optional. If set to true, the execution will not be backlogged when the concurrency quota is exhausted. The backlog execution starts when the concurrency quota becomes available. |
| `duration` | string (google-duration) | Output only. Measures the duration of the execution. |
| `endTime` | string (google-datetime) | Output only. Marks the end of execution, successful or not. |
| `error` | Error | Output only. The error which caused the execution to finish prematurely. The value is only present if the execution's state is `FAILED` or `CANCELLED`. |
| `executionHistoryLevel` | string enum | Optional. Describes the execution history level to apply to this execution. If not specified, the execution history level is determined by its workflow's execution history level. If the levels are different, the executionHistoryLevel overrides the workflow's execution history level for this execution. Values: `EXECUTION_HISTORY_LEVEL_UNSPECIFIED`, `EXECUTION_HISTORY_BASIC`, `EXECUTION_HISTORY_DETAILED`. |
| `labels` | object | Labels associated with this execution. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. By default, labels are inherited from the workflow but are overridden by any labels associated with the execution. |
| `name` | string | Output only. The resource name of the execution. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |
| `result` | string | Output only. Output of the execution represented as a JSON string. The value can only be present if the execution's state is `SUCCEEDED`. |
| `startTime` | string (google-datetime) | Output only. Marks the beginning of execution. Note that this will be the same as `createTime` for executions that start immediately. |
| `state` | string enum | Output only. Current state of the execution. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `UNAVAILABLE`, `QUEUED`. |
| `stateError` | StateError | Output only. Error regarding the state of the Execution resource. For example, this field will have error details if the execution data is unavailable due to revoked KMS key permissions. |
| `status` | Status | Output only. Status tracks the current steps and progress data of this execution. |
| `workflowRevisionId` | string | Output only. Revision of the workflow this execution is using. |

### `Execution` (v1beta)

- A running instance of a Workflow.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `argument` | string | Input parameters of the execution represented as a JSON string. The size limit is 32KB. \*Note\*: If you are using the REST API directly to run your workflow, you must escape any JSON string value of `argument`. Example: `'{"argument":"{\"firstName\":\"FIRST\",\"lastName\":\"LAST\"}"}'` |
| `callLogLevel` | string enum | The call logging level associated to this execution. Values: `CALL_LOG_LEVEL_UNSPECIFIED`, `LOG_ALL_CALLS`, `LOG_ERRORS_ONLY`. |
| `endTime` | string (google-datetime) | Output only. Marks the end of execution, successful or not. |
| `error` | Error | Output only. The error which caused the execution to finish prematurely. The value is only present if the execution's state is `FAILED` or `CANCELLED`. |
| `name` | string | Output only. The resource name of the execution. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |
| `result` | string | Output only. Output of the execution represented as a JSON string. The value can only be present if the execution's state is `SUCCEEDED`. |
| `startTime` | string (google-datetime) | Output only. Marks the beginning of execution. |
| `state` | string enum | Output only. Current state of the execution. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `SUCCEEDED`, `FAILED`, `CANCELLED`, `UNAVAILABLE`, `QUEUED`. |
| `status` | Status | Output only. Status tracks the current steps and progress data of this execution. |
| `workflowRevisionId` | string | Output only. Revision of the workflow this execution is using. |

### `ExportDataResponse`

- Response for the ExportData method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | string | The JSON string with customer data and metadata for an execution with the given name |

### `ListCallbacksResponse`

- RPC response object for the ListCallbacks method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `callbacks` | array<Callback> | The callbacks which match the request. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListExecutionsResponse`

- Response for the ListExecutions method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executions` | array<Execution> | The executions which match the request. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListStepEntriesResponse`

- Response message for ExecutionHistory.ListStepEntries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in the ListStepEntriesRequest.page_token field in the subsequent call to `ListStepEntries` method to retrieve the next page of results. |
| `stepEntries` | array<StepEntry> | The list of entries. |
| `totalSize` | integer (int32) | Indicates the total number of StepEntries that matched the request filter. For running executions, this number shows the number of StepEntries that are executed thus far. |

### `NavigationInfo`

- NavigationInfo describes what steps if any come before or after this step, or what steps are parents or children of this step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `children` | array<string> | Step entries that can be reached by "stepping into" e.g. a subworkflow call. |
| `next` | string (int64) | The index of the next step in the current workflow, if any. |
| `parent` | string (int64) | The step entry, if any, that can be reached by "stepping out" of the current workflow being executed. |
| `previous` | string (int64) | The index of the previous step in the current workflow, if any. |

### `Position`

- Position contains source position information about the stack trace element such as line number, column number and length of the code block in bytes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `column` | string (int64) | The source code column position (of the line) the current instruction was generated from. |
| `length` | string (int64) | The number of bytes of source code making up this stack trace element. |
| `line` | string (int64) | The source code line number the current instruction was generated from. |

### `PubsubMessage`

- A message that is published by publishers and consumed by subscribers. The message must contain either a non-empty data field or at least one attribute. Note that client libraries represent this object differently depending on the language. See the corresponding client library documentation (https://cloud.google.com/pubsub/docs/reference/libraries) for more information. See \[quotas and limits\]( https://cloud.google.com/pubsub/quotas) for more information about message limits.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. Attributes for this message. If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription. |
| `data` | string (byte) | Optional. The message data field. If this field is empty, the message must contain at least one attribute. |
| `messageId` | string | ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. |
| `orderingKey` | string | Optional. If non-empty, identifies related messages for which publish order should be respected. If a `Subscription` has `enable_message_ordering` set to `true`, messages published with the same non-empty `ordering_key` value will be delivered to subscribers in the order in which they are received by the Pub/Sub system. All `PubsubMessage`s published in a given `PublishRequest` must specify the same `ordering_key` value. For more information, see ordering messages (https://cloud.google.com/pubsub/docs/ordering). |
| `publishTime` | string (google-datetime) | The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. |

### `StackTrace`

- A collection of stack elements (frames) where an error occurred.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `elements` | array<StackTraceElement> | An array of stack elements. |

### `StackTraceElement`

- A single stack element (frame) where an error occurred.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `position` | Position | The source position information of the stack trace element. |
| `routine` | string | The routine where the error occurred. |
| `step` | string | The step the error occurred at. |

### `StateError`

- Describes an error related to the current state of the Execution resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Provides specifics about the error. |
| `type` | string enum | The type of this state error. Values: `TYPE_UNSPECIFIED`, `KMS_ERROR`. |

### `Status`

- Represents the current status of this execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentSteps` | array<Step> | A list of currently executing or last executed step names for the workflow execution currently running. If the workflow has succeeded or failed, this is the last attempted or executed step. Presently, if the current step is inside a subworkflow, the list only includes that step. In the future, the list will contain items for each step in the call stack, starting with the outermost step in the `main` subworkflow, and ending with the most deeply nested step. |

### `Step`

- Represents a step of the workflow this execution is running.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `routine` | string | Name of a routine within the workflow. |
| `step` | string | Name of a step within the routine. |

### `StepEntry`

- An StepEntry contains debugging information for a step transition in a workflow execution.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation time of the step entry. |
| `entryId` | string (int64) | Output only. The numeric ID of this step entry, used for navigation. |
| `exception` | Exception | Output only. The exception thrown by the step entry. |
| `name` | string | Output only. The full resource name of the step entry. Each step entry has a unique entry ID, which is a monotonically increasing counter. Step entry names have the format: `projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}/stepEntries/{step_entry}`. |
| `navigationInfo` | NavigationInfo | Output only. The NavigationInfo associated with this step. |
| `routine` | string | Output only. The name of the routine this step entry belongs to. A routine name is the subworkflow name defined in the YAML source code. The top level routine name is `main`. |
| `state` | string enum | Output only. The state of the step entry. Values: `STATE_UNSPECIFIED`, `STATE_IN_PROGRESS`, `STATE_SUCCEEDED`, `STATE_FAILED`, `STATE_CANCELLED`. |
| `step` | string | Output only. The name of the step this step entry belongs to. |
| `stepEntryMetadata` | StepEntryMetadata | Output only. The StepEntryMetadata associated with this step. |
| `stepType` | string enum | Output only. The type of the step this step entry belongs to. Values: `STEP_TYPE_UNSPECIFIED`, `STEP_ASSIGN`, `STEP_STD_LIB_CALL`, `STEP_CONNECTOR_CALL`, `STEP_SUBWORKFLOW_CALL`, `STEP_CALL`, `STEP_SWITCH`, `STEP_CONDITION`, `STEP_FOR`, `STEP_FOR_ITERATION`, `STEP_PARALLEL_FOR`, `STEP_PARALLEL_BRANCH`, `STEP_PARALLEL_BRANCH_ENTRY`, `STEP_TRY_RETRY_EXCEPT`, `STEP_TRY`, `STEP_RETRY`, `STEP_EXCEPT`, `STEP_RETURN`, `STEP_RAISE`, `STEP_GOTO`. |
| `updateTime` | string (google-datetime) | Output only. The most recently updated time of the step entry. |
| `variableData` | VariableData | Output only. The VariableData associated with this step. |

### `StepEntryMetadata`

- StepEntryMetadata contains metadata information about this step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expectedIteration` | string (int64) | Expected iteration represents the expected number of iterations in the step's progress. |
| `progressNumber` | string (int64) | Progress number represents the current state of the current progress. eg: A step entry represents the 4th iteration in a progress of PROGRESS_TYPE_FOR. Note: This field is only populated when an iteration exists and the starting value is 1. |
| `progressType` | string enum | Progress type of this step entry. Values: `PROGRESS_TYPE_UNSPECIFIED`, `PROGRESS_TYPE_FOR`, `PROGRESS_TYPE_SWITCH`, `PROGRESS_TYPE_RETRY`, `PROGRESS_TYPE_PARALLEL_FOR`, `PROGRESS_TYPE_PARALLEL_BRANCH`. |
| `threadId` | string | Child thread id that this step entry belongs to. |

### `TriggerPubsubExecutionRequest`

- Request for the TriggerPubsubExecution method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `GCPCloudEventsMode` | string | Required. LINT: LEGACY_NAMES The query parameter value for \__GCP_CloudEventsMode, set by the Eventarc service when configuring triggers. |
| `deliveryAttempt` | integer (int32) | The number of attempts that have been made to deliver this message. This is set by Pub/Sub for subscriptions that have the "dead letter" feature enabled, and hence provided here for compatibility, but is ignored by Workflows. |
| `message` | PubsubMessage | Required. The message of the Pub/Sub push notification. |
| `subscription` | string | Required. The subscription of the Pub/Sub push notification. Format: projects/{project}/subscriptions/{sub} |

### `VariableData`

- VariableData contains the variable data for this step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `variables` | object | Variables that are associated with this step. |

### Shape of `Callback`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "availablePayloads": "array<string>",
  "method": "string",
  "name": "string",
  "waiters": "string (int64)"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `workflowexecutions` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://workflowexecutions.googleapis.com/$discovery/rest?version=v1, https://workflowexecutions.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
