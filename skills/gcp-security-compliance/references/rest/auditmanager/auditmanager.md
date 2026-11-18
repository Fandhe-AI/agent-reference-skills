---
source: https://auditmanager.googleapis.com/$discovery/rest?version=v1
---

# Audit Manager API REST API (auditmanager)

## Signature / Usage

Base URL: `https://auditmanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `auditmanager.folders.locations.auditReports.generate`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}/auditReports:generate`
- Registers audit report generation requests. This method returns the operation identifier that you can use to track the report generation progress.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAuditReportRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Organization, folder, or project that the audit applies to, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.folders.locations.auditReports.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets the full metadata and findings for an audit report.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuditReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the audit report, in one of the following formats: \* `projects/{project}/locations/{location}/auditReports/{audit_report}` \* `folders/{folder}/locations/{location}/auditReports/{audit_report}` \* `organizations/{organization}/locations/{location}/auditReports/{audit_report}` |

### `auditmanager.folders.locations.auditReports.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/auditReports`
- Lists the audit reports for the organization, folder, or project that you specify as the parent scope.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuditReportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent organization, folder, or project to list reports for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.folders.locations.auditSchedules.create`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+parent}/auditSchedules`
- Creates a new audit schedule in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuditSchedule`; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project or folder that this audit schedule is for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` |
| `auditScheduleId` | query | string | yes | Required. ID to use for the audit schedule, which becomes the final component of the audit schedule's resource name. |
| `validateOnly` | query | boolean | no | Optional. If `true`, only validates the request and does not create the audit schedule. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `auditmanager.folders.locations.auditSchedules.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details of a single audit schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the audit schedule to retrieve, in one of the following formats: \* `projects/{project}/locations/{location}/auditSchedules/{audit_schedule}` \* `folders/{folder}/locations/{location}/auditSchedules/{audit_schedule}` \* `organizations/{organization}/locations/{location}/auditSchedules/{audit_schedule}` |

### `auditmanager.folders.locations.auditSchedules.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/auditSchedules`
- Lists audit schedules in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuditSchedulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent for the audit schedule, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.folders.locations.auditSchedules.patch`

- Versions: v1
- `PATCH https://auditmanager.googleapis.com/v1/{+name}`
- Updates an existing audit schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuditSchedule`; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique identifier for the audit schedule. Format: projects/{project}/locations/{location}/auditSchedules/{audit_schedule} folders/{folder}/locations/{location}/auditSchedules/{audit_schedule} organizations/{organization}/locations/{location}/auditSchedules/{audit_schedule} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. List of fields to update. |
| `validateOnly` | query | boolean | no | Optional. If `true`, only validates the request and does not update the audit schedule. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `auditmanager.folders.locations.auditScopeReports.generate`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}/auditScopeReports:generate`
- Generates an audit scope report for the given standard. The report includes the following: \* The technical attributes and constraints that Audit Manager uses to verify your compliance with a framework. \* A list of Google Cloud services and resources that are within the scope of the framework.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAuditScopeReportRequest`; Response: `AuditScopeReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Project or folder that the audit scope report is generated for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.folders.locations.enrollResource`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}:enrollResource`
- Adds your project, folder, or organization to Audit Manager. This method creates the Audit Manager service agent in your workload and grants required permissions to the service agent. If you make this request on a workload that's already enrolled, then this method overrides the existing set of destinations.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollResourceRequest`; Response: `Enrollment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Organization, folder, or project to enroll in Audit Manager, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.folders.locations.operationDetails.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details about the long-running operation to generate audit reports.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.folders.locations.operationIds.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details about the long-running operation to generate audit reports.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.folders.locations.resourceEnrollmentStatuses.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets a resource and its enrollment status.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ResourceEnrollmentStatus`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource enrollment status, in one of the following formats: \* `folders/{folder}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `projects/{project}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `organizations/{organization}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` |

### `auditmanager.folders.locations.resourceEnrollmentStatuses.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/resourceEnrollmentStatuses`
- Lists all the folders and projects in an organization or folder, along with their enrollments.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListResourceEnrollmentStatusesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent organization or folder to list enrollment statuses for, in one of the following formats: \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.folders.locations.standards.controls.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/controls`
- Lists the controls that you must implement to become compliant to a regulatory standard.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListControlsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Standard to list controls for, in one of the following formats: \* `projects/{project}/locations/{location}/standards/{standard}` \* `folders/{folder}/locations/{location}/standards/{standard}` \* `organizations/{organization}/locations/{location}/standards/{standard}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.organizations.locations.auditReports.generate`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}/auditReports:generate`
- Registers audit report generation requests. This method returns the operation identifier that you can use to track the report generation progress.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAuditReportRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Organization, folder, or project that the audit applies to, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.organizations.locations.auditReports.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets the full metadata and findings for an audit report.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuditReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the audit report, in one of the following formats: \* `projects/{project}/locations/{location}/auditReports/{audit_report}` \* `folders/{folder}/locations/{location}/auditReports/{audit_report}` \* `organizations/{organization}/locations/{location}/auditReports/{audit_report}` |

### `auditmanager.organizations.locations.auditReports.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/auditReports`
- Lists the audit reports for the organization, folder, or project that you specify as the parent scope.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuditReportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent organization, folder, or project to list reports for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.organizations.locations.auditSchedules.create`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+parent}/auditSchedules`
- Creates a new audit schedule in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuditSchedule`; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project or folder that this audit schedule is for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` |
| `auditScheduleId` | query | string | yes | Required. ID to use for the audit schedule, which becomes the final component of the audit schedule's resource name. |
| `validateOnly` | query | boolean | no | Optional. If `true`, only validates the request and does not create the audit schedule. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `auditmanager.organizations.locations.auditSchedules.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details of a single audit schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the audit schedule to retrieve, in one of the following formats: \* `projects/{project}/locations/{location}/auditSchedules/{audit_schedule}` \* `folders/{folder}/locations/{location}/auditSchedules/{audit_schedule}` \* `organizations/{organization}/locations/{location}/auditSchedules/{audit_schedule}` |

### `auditmanager.organizations.locations.auditSchedules.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/auditSchedules`
- Lists audit schedules in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuditSchedulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent for the audit schedule, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.organizations.locations.auditSchedules.patch`

- Versions: v1
- `PATCH https://auditmanager.googleapis.com/v1/{+name}`
- Updates an existing audit schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuditSchedule`; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique identifier for the audit schedule. Format: projects/{project}/locations/{location}/auditSchedules/{audit_schedule} folders/{folder}/locations/{location}/auditSchedules/{audit_schedule} organizations/{organization}/locations/{location}/auditSchedules/{audit_schedule} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. List of fields to update. |
| `validateOnly` | query | boolean | no | Optional. If `true`, only validates the request and does not update the audit schedule. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `auditmanager.organizations.locations.auditScopeReports.generate`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}/auditScopeReports:generate`
- Generates an audit scope report for the given standard. The report includes the following: \* The technical attributes and constraints that Audit Manager uses to verify your compliance with a framework. \* A list of Google Cloud services and resources that are within the scope of the framework.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAuditScopeReportRequest`; Response: `AuditScopeReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Project or folder that the audit scope report is generated for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.organizations.locations.enrollResource`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}:enrollResource`
- Adds your project, folder, or organization to Audit Manager. This method creates the Audit Manager service agent in your workload and grants required permissions to the service agent. If you make this request on a workload that's already enrolled, then this method overrides the existing set of destinations.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollResourceRequest`; Response: `Enrollment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Organization, folder, or project to enroll in Audit Manager, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.organizations.locations.operationDetails.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details about the long-running operation to generate audit reports.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.organizations.locations.operationIds.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details about the long-running operation to generate audit reports.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.organizations.locations.operations.cancel`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `auditmanager.organizations.locations.operations.delete`

- Versions: v1
- `DELETE https://auditmanager.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `auditmanager.organizations.locations.operations.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.organizations.locations.operations.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `auditmanager.organizations.locations.resourceEnrollmentStatuses.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets a resource and its enrollment status.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ResourceEnrollmentStatus`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource enrollment status, in one of the following formats: \* `folders/{folder}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `projects/{project}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `organizations/{organization}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` |

### `auditmanager.organizations.locations.resourceEnrollmentStatuses.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/resourceEnrollmentStatuses`
- Lists all the folders and projects in an organization or folder, along with their enrollments.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListResourceEnrollmentStatusesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent organization or folder to list enrollment statuses for, in one of the following formats: \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.organizations.locations.standards.controls.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/controls`
- Lists the controls that you must implement to become compliant to a regulatory standard.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListControlsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Standard to list controls for, in one of the following formats: \* `projects/{project}/locations/{location}/standards/{standard}` \* `folders/{folder}/locations/{location}/standards/{standard}` \* `organizations/{organization}/locations/{location}/standards/{standard}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.projects.locations.auditReports.generate`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}/auditReports:generate`
- Registers audit report generation requests. This method returns the operation identifier that you can use to track the report generation progress.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAuditReportRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Organization, folder, or project that the audit applies to, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.projects.locations.auditReports.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets the full metadata and findings for an audit report.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuditReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the audit report, in one of the following formats: \* `projects/{project}/locations/{location}/auditReports/{audit_report}` \* `folders/{folder}/locations/{location}/auditReports/{audit_report}` \* `organizations/{organization}/locations/{location}/auditReports/{audit_report}` |

### `auditmanager.projects.locations.auditReports.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/auditReports`
- Lists the audit reports for the organization, folder, or project that you specify as the parent scope.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuditReportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent organization, folder, or project to list reports for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.projects.locations.auditSchedules.create`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+parent}/auditSchedules`
- Creates a new audit schedule in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuditSchedule`; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project or folder that this audit schedule is for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` |
| `auditScheduleId` | query | string | yes | Required. ID to use for the audit schedule, which becomes the final component of the audit schedule's resource name. |
| `validateOnly` | query | boolean | no | Optional. If `true`, only validates the request and does not create the audit schedule. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `auditmanager.projects.locations.auditSchedules.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details of a single audit schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the audit schedule to retrieve, in one of the following formats: \* `projects/{project}/locations/{location}/auditSchedules/{audit_schedule}` \* `folders/{folder}/locations/{location}/auditSchedules/{audit_schedule}` \* `organizations/{organization}/locations/{location}/auditSchedules/{audit_schedule}` |

### `auditmanager.projects.locations.auditSchedules.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/auditSchedules`
- Lists audit schedules in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuditSchedulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent for the audit schedule, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### `auditmanager.projects.locations.auditSchedules.patch`

- Versions: v1
- `PATCH https://auditmanager.googleapis.com/v1/{+name}`
- Updates an existing audit schedule.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuditSchedule`; Response: `AuditSchedule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Unique identifier for the audit schedule. Format: projects/{project}/locations/{location}/auditSchedules/{audit_schedule} folders/{folder}/locations/{location}/auditSchedules/{audit_schedule} organizations/{organization}/locations/{location}/auditSchedules/{audit_schedule} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. List of fields to update. |
| `validateOnly` | query | boolean | no | Optional. If `true`, only validates the request and does not update the audit schedule. This executes standard request validation (such as schema, framework existence, scope, and IAM checks) and skips the apply phase. Use this field for the following purposes: \* \*\*Infrastructure as Code (IaC)\*\*: Allow tools like Terraform to run dry-run mutations (e.g., `terraform plan`) without creating real resources or incurring costs. \* \*\*User Interface Validation\*\*: Enable real-time form and permission validation in custom UIs before submitting requests. \* \*\*CI/CD & Automation\*\*: Test your scripts, permissions, and parameters safely without consuming resource quotas. |

### `auditmanager.projects.locations.auditScopeReports.generate`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}/auditScopeReports:generate`
- Generates an audit scope report for the given standard. The report includes the following: \* The technical attributes and constraints that Audit Manager uses to verify your compliance with a framework. \* A list of Google Cloud services and resources that are within the scope of the framework.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAuditScopeReportRequest`; Response: `AuditScopeReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Project or folder that the audit scope report is generated for, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.projects.locations.enrollResource`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+scope}:enrollResource`
- Adds your project, folder, or organization to Audit Manager. This method creates the Audit Manager service agent in your workload and grants required permissions to the service agent. If you make this request on a workload that's already enrolled, then this method overrides the existing set of destinations.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollResourceRequest`; Response: `Enrollment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scope` | path | string | yes | Required. Organization, folder, or project to enroll in Audit Manager, in one of the following formats: \* `projects/{project}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `organizations/{organization}/locations/{location}` |

### `auditmanager.projects.locations.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `auditmanager.projects.locations.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `auditmanager.projects.locations.operationDetails.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details about the long-running operation to generate audit reports.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.projects.locations.operationIds.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets details about the long-running operation to generate audit reports.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.projects.locations.operations.cancel`

- Versions: v1
- `POST https://auditmanager.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `auditmanager.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://auditmanager.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `auditmanager.projects.locations.operations.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `auditmanager.projects.locations.operations.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `auditmanager.projects.locations.resourceEnrollmentStatuses.get`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+name}`
- Gets a resource and its enrollment status.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ResourceEnrollmentStatus`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource enrollment status, in one of the following formats: \* `folders/{folder}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `projects/{project}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` \* `organizations/{organization}/locations/{location}/resourceEnrollmentStatuses/{resource_enrollment_status}` |

### `auditmanager.projects.locations.standards.controls.list`

- Versions: v1
- `GET https://auditmanager.googleapis.com/v1/{+parent}/controls`
- Lists the controls that you must implement to become compliant to a regulatory standard.
- Scopes: `https://www.googleapis.com/auth/cloud-auditmanager`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListControlsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Standard to list controls for, in one of the following formats: \* `projects/{project}/locations/{location}/standards/{standard}` \* `folders/{folder}/locations/{location}/standards/{standard}` \* `organizations/{organization}/locations/{location}/standards/{standard}` |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return in a single page. The service might return fewer items than this value. If unspecified, the service picks an appropriate default. The maximum value is 100; values above 100 are reduced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call, to retrieve the next page of results. |

### Example request skeleton

Generated from the Discovery entry of `auditmanager.folders.locations.auditReports.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://auditmanager.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `auditmanager` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/auditmanager/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`auditmanager` v1, revision 20261028) also lists 4 endpoints of the form `https://auditmanager.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `europe-west1`, `me-central2`, `us-central1`. The method URLs above use the global host `https://auditmanager.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://auditmanager.us-central1.rep.googleapis.com/`) and keep the path.
- Source: https://auditmanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
