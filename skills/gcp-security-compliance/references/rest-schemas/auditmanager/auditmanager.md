---
source: https://auditmanager.googleapis.com/$discovery/rest?version=v1
---

# Audit Manager API message schemas (auditmanager)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/auditmanager/`.

### `AuditReport`

- An audit report.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudControlParameterStates` | object | Output only. Parameter values provided by the user and values for tunable parameters, stored in the DB, keyed by control name. |
| `complianceFramework` | string | Output only. Compliance framework to use for the audit report. For example, `CIS_GCP_FOUNDATIONS_V1_2_0`. |
| `complianceStandard` | string | Output only. Deprecated. Compliance standard to be audited against. Use the `compliance_framework` field instead. |
| `controlDetails` | array<ControlDetails> | Output only. Overall status of the controls. |
| `createTime` | string (google-datetime) | Output only. Creation time of the audit report. |
| `destinationDetails` | DestinationDetails | Output only. Cloud Storage bucket where the audit report is uploaded to. |
| `name` | string | Identifier. Name of the audit report, in one of the following formats: \* `projects/{project}/locations/{location}/auditReports/{audit_report}` \* `folders/{folder}/locations/{location}/auditReports/{audit_report}` \* `organizations/{organization}/locations/{location}/auditReports/{audit_report}` |
| `operationId` | string | Output only. Client operation ID for the audit report. |
| `reportGenerationState` | string enum | Output only. State of audit report generation. Values: `REPORT_GENERATION_STATE_UNSPECIFIED`, `IN_PROGRESS`, `COMPLETED`, `FAILED`, `SUMMARY_UNKNOWN`. |
| `reportSummary` | ReportSummary | Output only. Report summary that includes information about compliance and violation counts. |
| `scope` | string | Output only. Organization, folder, or project that the report is generated for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `scopeId` | string | Output only. Project number, folder ID, or organization ID that the audit report was generated for. |

### `AuditSchedule`

- An audit schedule, in one of the following formats: \* `projects/{project}/locations/{location}/auditSchedules/{audit_schedule}` \* `folders/{folder}/locations/{location}/auditSchedules/{audit_schedule}`
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceFramework` | string | Required. Framework (set of controls) that the audit scope report is generated against. For example, `NIST_800_53`. |
| `createTime` | string (google-datetime) | Output only. Timestamp when the schedule was created. |
| `displayName` | string | Optional. Display name for the audit schedule. |
| `errorMessage` | string | Output only. Describes the error if the schedule is in an error state. |
| `gcsUri` | string | Required. Cloud Storage bucket where Audit Manager can upload the audit report and evidence. The format is `gs://{bucket_name}`. |
| `lastTriggerTime` | string (google-datetime) | Output only. Timestamp when the audit run was last triggered. |
| `name` | string | Identifier. Unique identifier for the audit schedule. Format: projects/{project}/locations/{location}/auditSchedules/{audit_schedule} folders/{folder}/locations/{location}/auditSchedules/{audit_schedule} organizations/{organization}/locations/{location}/auditSchedules/{audit_schedule} |
| `nextRunTime` | string (google-datetime) | Output only. Calculated timestamp for the next scheduled run. |
| `parameterOverrides` | object | Optional. Maps dynamic parameter overrides by Cloud Control resource name at execution time. For example, `{"organizations/123/locations/global/cloudControls/control-1": {parameters: [...]}}` |
| `reportFormat` | string enum | Required. Format for the audit report. Values: `AUDIT_REPORT_FORMAT_UNSPECIFIED`, `AUDIT_REPORT_FORMAT_ODF`. |
| `scheduleConfig` | ScheduleConfig | Required. Configuration that defines when and how often audit runs are automatically triggered for this schedule. |
| `state` | string enum | Optional. State of the audit schedule. While most states are managed by the system, you can use UpdateAuditSchedule to start, pause, or delete the schedule. Values: `SCHEDULE_STATE_UNSPECIFIED`, `SCHEDULE_STATE_ACTIVE`, `SCHEDULE_STATE_PAUSED`, `SCHEDULE_STATE_COMPLETED`, `SCHEDULE_STATE_FAILED_SETUP`, `SCHEDULE_STATE_ERROR`, `SCHEDULE_STATE_DELETED`. |
| `updateTime` | string (google-datetime) | Output only. Timestamp when the schedule was last updated. |

### `AuditScopeReport`

- Audit scope report.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. Name for the audit scope report, in one of the following formats: \* `projects/{project}/locations/{location}/auditScopeReports/{audit_scope_report}` \* `folders/{folder}/locations/{location}/auditScopeReports/{audit_scope_report}` \* `organizations/{organization}/locations/{location}/auditScopeReports/{audit_scope_report}` |
| `scopeReportContents` | string (byte) | Audit scope report content in byte format. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CloudControlParameterStates`

- Collection of parameter states for a cloud control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameterStates` | array<ParameterState> | Output only. The parameter states for the cloud control. |

### `Control`

- A control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controlFamily` | ControlFamily | Output only. Regulatory family of the control. |
| `customerResponsibilityDescription` | string | Output only. A description of your responsibility for this control. |
| `customerResponsibilityImplementation` | string | Output only. A description of how you can implement your responsibility for this control. |
| `description` | string | Output only. Description of the control. |
| `displayName` | string | Output only. Display name of the control. |
| `family` | string enum | Output only. Category that the control belongs to. Values: `FAMILY_UNSPECIFIED`, `AC`, `AT`, `AU`, `CA`, `CM`, `CP`, `IA`, `IR`, `MA`, `MP`, `PE`, `PL`, `PS`, `RA`, `SA`, `SC`, `SI`, `SR`. |
| `googleResponsibilityDescription` | string | Output only. A description of Google's responsibility for this control. |
| `googleResponsibilityImplementation` | string | Output only. A description of how Google implements its responsibility for this control. |
| `id` | string | Output only. Control identifier that's used to fetch the findings. The identifier is the same as the control report name. |
| `responsibilityType` | string | Output only. Who is responsible for implementing this control. Set to one of the following values: `GOOGLE`, `CUSTOMER`, or `SHARED`. |

### `ControlDetails`

- Evaluation details for a control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceState` | string enum | Output only. Overall status of the findings for the control. Values: `COMPLIANCE_STATE_UNSPECIFIED`, `COMPLIANT`, `VIOLATION`, `MANUAL_REVIEW_NEEDED`, `ERROR`, `AUDIT_NOT_SUPPORTED`. |
| `control` | Control | Control that the findings are being reported for. |
| `controlReportSummary` | ReportSummary | A control report summary that provides a high-level overview of the compliance controls and the assessment status. |

### `ControlFamily`

- Regulatory family of the control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Display name of the regulatory control family. |
| `familyId` | string | ID of the regulatory control family. To find the list of supported control families, use the ListControls method and review the `control_family` field in the response. |

### `DestinationDetails`

- Cloud Storage bucket where the audit report is uploaded to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsBucketUri` | string | URI for the Cloud Storage bucket, in the format `gs://{bucket_name}`. |

### `EligibleDestination`

- Details about the bucket where you want to upload the audit report.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eligibleGcsBucket` | string | The location of the Cloud Storage bucket where you want to upload the audit report and evidence during the GenerateAuditReport API call. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnrollResourceRequest`

- Request message for EnrollResource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinations` | array<EligibleDestination> | Required. Cloud Storage buckets that you can upload your audit reports to during the audit process. When you enroll an organization or folder, you can choose a Cloud Storage bucket from any project in the organization or folder. If you run an audit at the project level using the service agent at the organization or folder level, all the buckets that are associated with the service agent are available. |
| `validateOnly` | boolean | Optional. If `true`, only validates the request and does not enroll the resource. This executes standard request validation (such as schema, IAM, and destination checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `Enrollment`

- Organization, folder, or project to enroll for audit reports.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationDetails` | array<DestinationDetails> | Output only. Cloud Storage buckets where you want to upload the audit reports. |
| `name` | string | Identifier. Name of the enrollment, in one of the following formats: \* `projects/{project}/locations/{location}/enrollments/{enrollment}` \* `folders/{folder}/locations/{location}/enrollments/{enrollment}` \* `organizations/{organization}/locations/{location}/enrollments/{enrollment}` |

### `GenerateAuditReportRequest`

- Request message for GenerateAuditReport.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceFramework` | string | Required. The framework that's used for the audit report. For example, `NIST_800_53`. |
| `complianceStandard` | string | Optional. Deprecated. Compliance standard for the audit report. Use the `compliance_framework` field instead. |
| `gcsUri` | string | URL for the Cloud Storage bucket where the report and evidence is uploaded. You must select a bucket that was provided during the enrollment process. |
| `parameterOverrides` | object | Optional. Maps dynamic parameter overrides by Cloud Control resource name at execution time. For example, `{"organizations/123/locations/global/cloudControls/control-1": {parameters: [...]}}` |
| `reportFormat` | string enum | Required. Format for the audit report. Values: `AUDIT_REPORT_FORMAT_UNSPECIFIED`, `AUDIT_REPORT_FORMAT_ODF`. |
| `validateOnly` | boolean | Optional. If `true`, only validates the request and does not generate the audit report. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without triggering expensive Long-Running Operations (LROs) or consuming resource quotas. |

### `GenerateAuditScopeReportRequest`

- Request message for GenerateAuditScopeReport.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceFramework` | string | Required. Framework (set of controls) that the audit scope report is generated against. For example, `NIST_800_53`. |
| `complianceStandard` | string | Optional. Deprecated. The standard (industry or regulatory requirements) that the audit scope report is run against. Use the `compliance_framework` field instead. |
| `parameterOverrides` | object | Optional. Maps dynamic parameter overrides by Cloud Control resource name at execution time. For example, `{"organizations/123/locations/global/cloudControls/control-1": {parameters: [...]}}` |
| `reportFormat` | string enum | Required. Format for the audit scope report. Values: `AUDIT_SCOPE_REPORT_FORMAT_UNSPECIFIED`, `AUDIT_SCOPE_REPORT_FORMAT_ODF`. |
| `validateOnly` | boolean | Optional. If `true`, only validates the request and does not generate the audit scope report. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `ListAuditReportsResponse`

- Response message for ListAuditReports.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditReports` | array<AuditReport> | Output only. Audit reports. |
| `nextPageToken` | string | Output only. A token that you can send as the `page_token` in a subsequent request to retrieve the next page of results. If this field is empty, there are no subsequent pages. |

### `ListAuditSchedulesResponse`

- Response message for ListAuditSchedules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditSchedules` | array<AuditSchedule> | List of audit schedules. |
| `nextPageToken` | string | A token that you can send as the `page_token` in a subsequent request to retrieve the next page of results. If this field is empty, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that can't be reached. |

### `ListControlsResponse`

- Response message for ListControls.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `controls` | array<Control> | Output only. Controls for a given regulatory standard. |
| `nextPageToken` | string | Output only. A token that you can send as the `page_token` in a subsequent request to retrieve the next page of results. If this field is empty, there are no subsequent pages. |

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

### `ListResourceEnrollmentStatusesResponse`

- Response message for ListResourceEnrollmentStatuses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Output only. A token that you can send as the `page_token` in a subsequent request to retrieve the next page of results. If this field is empty, there are no subsequent pages. |
| `resourceEnrollmentStatuses` | array<ResourceEnrollmentStatus> | Resources with their enrollment status. |

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

- Metadata for the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. The API version used to start the operation. For example, `v1`. |
| `createTime` | string (google-datetime) | Output only. Time that the operation was created. |
| `endTime` | string (google-datetime) | Output only. Time that the operation finished running. |
| `requestedCancellation` | boolean | Output only. Whether you requested that the operation be cancelled. Operations that were cancelled successfully have an Operation.error value with a status code Code.CANCELLED. |
| `statusMessage` | string | Output only. A human-readable status of the operation, if any. |
| `target` | string | Output only. A server-defined resource path for the target of the operation. |
| `verb` | string | Output only. The name of the verb that was executed by the operation. |

### `ParamValue`

- The possible parameter value types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Optional. A boolean value. |
| `numberValue` | number (double) | Optional. A double value. |
| `oneofValue` | Parameter | Optional. Sub-parameter values. |
| `stringListValue` | StringList | Optional. A repeated string. |
| `stringValue` | string | Optional. A string value. |

### `Parameter`

- Parameters are key-value pairs that let you provide your custom location requirements, environment requirements, or other settings that are relevant to the cloud control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name or key of the parameter. |
| `parameterValue` | ParamValue | Required. The value of the parameter. |

### `ParameterOverrides`

- Wrapper message to associate a list of CSC internal parameter overrides with a control name.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | array<Parameter> | The list of parameter overrides. |

### `ParameterState`

- State of a parameter for a cloud control.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isOverridden` | boolean | Output only. Whether this parameter was overridden by the user. |
| `parameter` | Parameter | Output only. The parameter key and value. |

### `ReportGenerationProgress`

- Details about the current status of the report-generation process.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditReport` | string | Output only. Name of the audit report. |
| `destinationGcsBucket` | string | Output only. Cloud Storage bucket where the audit report is uploaded to after the evaluation process is completed. |
| `evaluationPercentComplete` | number (double) | Progress of the evaluation process. The progress is defined in terms of percentage complete. |
| `failureReason` | string | Output only. Reason for failure during the audit report generation process. This field is set only if the `OperationState` attribute is `OPERATION_STATE_FAILED`. |
| `reportGenerationPercentComplete` | number (double) | Report generation progress, defined in terms of percentage complete. Until evaluation is complete, this value is always `0`. |
| `reportUploadingPercentComplete` | number (double) | Report uploading progress, defined in terms of percentage complete. Until evaluation and report generation are complete, this value is always `0`. |
| `state` | string enum | Output only. Current state of execution for report generation. Values: `OPERATION_STATE_UNSPECIFIED`, `OPERATION_STATE_NOT_STARTED`, `OPERATION_STATE_EVALUATION_IN_PROGRESS`, `OPERATION_STATE_EVALUATION_DONE`, `OPERATION_STATE_EVIDENCE_REPORT_GENERATION_IN_PROGRESS`, `OPERATION_STATE_EVIDENCE_REPORT_GENERATION_DONE`, `OPERATION_STATE_EVIDENCE_UPLOAD_IN_PROGRESS`, `OPERATION_STATE_DONE`, `OPERATION_STATE_FAILED`. |

### `ReportSummary`

- Additional information about the number of checks that were made during an audit operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compliantCount` | integer (int32) | Number of compliant checks. |
| `errorCount` | integer (int32) | Number of checks that can't be performed due to errors. |
| `manualReviewNeededCount` | integer (int32) | Number of checks that require a manual review. |
| `totalCount` | integer (int32) | Total number of evaluated checks. |
| `violationCount` | integer (int32) | Number of checks with violations. |

### `ResourceEnrollmentStatus`

- An organization, folder, or project with its enrollment status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. Display name for the organization, folder, or project. |
| `enrolled` | boolean | Output only. Deprecated. Whether the organization, folder, or project is enrolled. Use `enrollment_state` instead. |
| `enrollment` | Enrollment | Output only. Enrolled destination details for the organization, folder, or project. |
| `enrollmentState` | string enum | Output only. Enrollment state of the organization, folder, or project. Values: `RESOURCE_ENROLLMENT_STATE_UNSPECIFIED`, `NOT_ENROLLED`, `INHERITED`, `ENROLLED`. |
| `name` | string | Identifier. Name of the resource enrollment status, in one of the following formats: \* `folders/{folder}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `projects/{project}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `organizations/{organization}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` |

### `ScheduleConfig`

- Timing and frequency parameters for recurring audit runs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Date that the schedule stops. If not specified, the schedule runs indefinitely. |
| `frequency` | string enum | Required. Frequency of audit runs. Values: `FREQUENCY_UNSPECIFIED`, `DAILY`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `ANNUALLY`. |
| `startTime` | string (google-datetime) | Required. Date and time when the first audit run is triggered. Subsequent runs are based on this time and the chosen frequency. |
| `timeZone` | string | Optional. Time zone for the audit schedule in IANA format (for example, `America/New_York`). The time zone is used to interpret the `start_time` and the `end_time`, and to calculate subsequent run dates. If not specified, the time zone default is UTC. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StringList`

- A list of strings for the parameter value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | Required. The strings in the list. |

### Shape of `AuditReport`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "cloudControlParameterStates": "object",
  "complianceFramework": "string",
  "complianceStandard": "string",
  "controlDetails": "array<ControlDetails>",
  "createTime": "string (google-datetime)",
  "destinationDetails": "DestinationDetails",
  "name": "string",
  "operationId": "string",
  "reportGenerationState": "string enum",
  "reportSummary": "ReportSummary",
  "scope": "string",
  "scopeId": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `auditmanager` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://auditmanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
