---
source: https://assuredworkloads.googleapis.com/$discovery/rest?version=v1
---

# Assured Workloads API REST API (assuredworkloads)

## Signature / Usage

Base URL: `https://assuredworkloads.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `assuredworkloads.folders.locations.dbFindingSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbFindingSummaries`
- Lists summaries of the active findings in a Data Boundary scope (an organization, folder, or project), with one summary for each finding category.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbFindingSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent scope to list finding summaries for. Formats: \* `organizations/{organization}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `projects/{project}/locations/{location}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the framework deployments whose findings are summarized. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, and `framework_revision` (the major revision ID of the framework). |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |

### `assuredworkloads.folders.locations.dbFrameworkComplianceReports.aggregate`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}:aggregate`
- Gets daily compliance reports over a time range for a framework that's deployed in a Data Boundary scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1AggregateDbFrameworkComplianceReportResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the framework compliance report to aggregate over time. The report ID is the ID of the compliance framework, for example `builtin-fedramp-high`. Format: `organizations/{organization_id}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the framework deployments that are included in the report. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, and `framework_revision` (the major revision ID of the framework). |
| `interval.endTime` | query | string (google-datetime) | no | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `assuredworkloads.folders.locations.dbFrameworkComplianceReports.dbControlComplianceSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbControlComplianceSummaries`
- Lists the compliance summaries of the controls in a framework compliance report.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbControlComplianceSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The framework compliance report to list control compliance summaries for. Formats: \* `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `folders/{folder}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `projects/{project}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, `framework_revision` (the major revision ID of the framework), and `end_time`. The `end_time` field accepts a single equality comparison with an RFC 3339 (https://www.ietf.org/rfc/rfc3339.txt) timestamp, for example `end_time = "2026-01-01T00:00:00Z"`. Only findings that were updated at or after this time are counted. |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the default page size is 50. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |

### `assuredworkloads.folders.locations.dbFrameworkComplianceReports.fetch`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}:fetch`
- Fetches the current compliance report for a framework that's deployed in a Data Boundary scope (an organization, folder, or project). The report includes the number of passing, failing, and not assessed controls in the framework.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1FetchDbFrameworkComplianceReportResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the framework compliance report to retrieve. The report ID is the ID of the compliance framework, for example `builtin-fedramp-high`. Formats: \* `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `folders/{folder}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `projects/{project}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `endTime` | query | string (google-datetime) | no | Optional. The end time of the report. Reserved for future use. Currently, the report always reflects the current compliance state. |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. Reserved for future use. |

### `assuredworkloads.folders.locations.dbFrameworkComplianceSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbFrameworkComplianceSummaries`
- Lists the compliance summaries of the frameworks that are deployed in a Data Boundary scope (an organization, folder, or project).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbFrameworkComplianceSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent scope to list framework compliance summaries for. Formats: \* `organizations/{organization}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `projects/{project}/locations/{location}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. Reserved for future use. |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the default page size is 50. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |
| `view` | query | string enum | no | Optional. The level of detail to return for each summary. If not specified, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_BASIC` is used. Values: `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_UNSPECIFIED`, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_BASIC`, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_FULL`. |

### `assuredworkloads.organizations.locations.dbFindingSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbFindingSummaries`
- Lists summaries of the active findings in a Data Boundary scope (an organization, folder, or project), with one summary for each finding category.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbFindingSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent scope to list finding summaries for. Formats: \* `organizations/{organization}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `projects/{project}/locations/{location}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the framework deployments whose findings are summarized. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, and `framework_revision` (the major revision ID of the framework). |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |

### `assuredworkloads.organizations.locations.dbFrameworkComplianceReports.aggregate`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}:aggregate`
- Gets daily compliance reports over a time range for a framework that's deployed in a Data Boundary scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1AggregateDbFrameworkComplianceReportResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the framework compliance report to aggregate over time. The report ID is the ID of the compliance framework, for example `builtin-fedramp-high`. Format: `organizations/{organization_id}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the framework deployments that are included in the report. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, and `framework_revision` (the major revision ID of the framework). |
| `interval.endTime` | query | string (google-datetime) | no | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `assuredworkloads.organizations.locations.dbFrameworkComplianceReports.dbControlComplianceSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbControlComplianceSummaries`
- Lists the compliance summaries of the controls in a framework compliance report.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbControlComplianceSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The framework compliance report to list control compliance summaries for. Formats: \* `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `folders/{folder}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `projects/{project}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, `framework_revision` (the major revision ID of the framework), and `end_time`. The `end_time` field accepts a single equality comparison with an RFC 3339 (https://www.ietf.org/rfc/rfc3339.txt) timestamp, for example `end_time = "2026-01-01T00:00:00Z"`. Only findings that were updated at or after this time are counted. |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the default page size is 50. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |

### `assuredworkloads.organizations.locations.dbFrameworkComplianceReports.fetch`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}:fetch`
- Fetches the current compliance report for a framework that's deployed in a Data Boundary scope (an organization, folder, or project). The report includes the number of passing, failing, and not assessed controls in the framework.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1FetchDbFrameworkComplianceReportResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the framework compliance report to retrieve. The report ID is the ID of the compliance framework, for example `builtin-fedramp-high`. Formats: \* `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `folders/{folder}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `projects/{project}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `endTime` | query | string (google-datetime) | no | Optional. The end time of the report. Reserved for future use. Currently, the report always reflects the current compliance state. |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. Reserved for future use. |

### `assuredworkloads.organizations.locations.dbFrameworkComplianceSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbFrameworkComplianceSummaries`
- Lists the compliance summaries of the frameworks that are deployed in a Data Boundary scope (an organization, folder, or project).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbFrameworkComplianceSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent scope to list framework compliance summaries for. Formats: \* `organizations/{organization}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `projects/{project}/locations/{location}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. Reserved for future use. |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the default page size is 50. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |
| `view` | query | string enum | no | Optional. The level of detail to return for each summary. If not specified, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_BASIC` is used. Values: `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_UNSPECIFIED`, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_BASIC`, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_FULL`. |

### `assuredworkloads.organizations.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `assuredworkloads.organizations.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `assuredworkloads.organizations.locations.workloads.analyzeWorkloadMove`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+target}:analyzeWorkloadMove`
- Analyzes a hypothetical move of a source resource to a target workload to surface compliance risks. The analysis is best effort and is not guaranteed to be exhaustive.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1AnalyzeWorkloadMoveResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `target` | path | string | yes | Required. The resource ID of the folder-based destination workload. This workload is where the source resource will hypothetically be moved to. Specify the workload's relative resource name, formatted as: "organizations/{ORGANIZATION_ID}/locations/{LOCATION_ID}/workloads/{WORKLOAD_ID}" For example: "organizations/123/locations/us-east1/workloads/assured-workload-2" |
| `assetTypes` | query | repeated string | no | Optional. List of asset types to be analyzed, including and under the source resource. If empty, all assets are analyzed. The complete list of asset types is available here (https://cloud.google.com/asset-inventory/docs/supported-asset-types). |
| `pageSize` | query | integer (int32) | no | Optional. Page size. If a value is not specified, the default value of 10 is used. The maximum value is 50. |
| `pageToken` | query | string | no | Optional. The page token from the previous response. It needs to be passed in the second and following requests. |
| `project` | query | string | no | The source type is a project. Specify the project's relative resource name, formatted as either a project number or a project ID: "projects/{PROJECT_NUMBER}" or "projects/{PROJECT_ID}" For example: "projects/951040570662" when specifying a project number, or "projects/my-project-123" when specifying a project ID. |

### `assuredworkloads.organizations.locations.workloads.create`

- Versions: v1, v1beta1
- `POST https://assuredworkloads.googleapis.com/v1/{+parent}/workloads`
- Creates Assured Workload.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAssuredworkloadsV1Workload`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the new Workload's parent. Must be of the form `organizations/{org_id}/locations/{location_id}`. |
| `externalId` | query | string | no | Optional. A identifier associated with the workload and underlying projects which allows for the break down of billing costs for a workload. The value provided for the identifier will add a label to the workload and contained projects with the identifier as the value. |

### `assuredworkloads.organizations.locations.workloads.delete`

- Versions: v1, v1beta1
- `DELETE https://assuredworkloads.googleapis.com/v1/{+name}`
- Deletes the workload. Make sure that workload's direct children are already in a deleted state, otherwise the request will fail with a FAILED_PRECONDITION error. In addition to assuredworkloads.workload.delete permission, the user should also have orgpolicy.policy.set permission on the deleted folder to remove Assured Workloads OrgPolicies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the workload. Format: organizations/{org_id}/locations/{location_id}/workloads/{workload_id} |
| `etag` | query | string | no | Optional. The etag of the workload. If this is provided, it must match the server's etag. |

### `assuredworkloads.organizations.locations.workloads.enableComplianceUpdates`

- Versions: v1, v1beta1
- `PUT https://assuredworkloads.googleapis.com/v1/{+name}:enableComplianceUpdates`
- This endpoint enables Assured Workloads service to offer compliance updates for the folder based assured workload. It sets up an Assured Workloads Service Agent, having permissions to read compliance controls (for example: Org Policies) applied on the workload. The caller must have `resourcemanager.folders.getIamPolicy` and `resourcemanager.folders.setIamPolicy` permissions on the assured workload folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1EnableComplianceUpdatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the workload. Format: organizations/{org_id}/locations/{location_id}/workloads/{workload_id} |

### `assuredworkloads.organizations.locations.workloads.enableResourceMonitoring`

- Versions: v1, v1beta1
- `POST https://assuredworkloads.googleapis.com/v1/{+name}:enableResourceMonitoring`
- Enable resource violation monitoring for a workload.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1EnableResourceMonitoringResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the workload. Format: organizations/{org_id}/locations/{location_id}/workloads/{workload_id} |

### `assuredworkloads.organizations.locations.workloads.get`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}`
- Gets Assured Workload associated with a CRM Node
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1Workload`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Workload to fetch. This is the workloads's relative path in the API, formatted as "organizations/{organization_id}/locations/{location_id}/workloads/{workload_id}". For example, "organizations/123/locations/us-east1/workloads/assured-workload-1". |

### `assuredworkloads.organizations.locations.workloads.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/workloads`
- Lists Assured Workloads under a CRM Node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListWorkloadsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent Resource to list workloads from. Must be of the form `organizations/{org_id}/locations/{location}`. |
| `filter` | query | string | no | Optional. A custom filter for filtering by properties of a workload. At this time, only filtering by labels is supported. |
| `pageSize` | query | integer (int32) | no | Optional. Page size. |
| `pageToken` | query | string | no | Optional. Page token returned from previous request. Page token contains context from previous request. Page token needs to be passed in the second and following requests. |

### `assuredworkloads.organizations.locations.workloads.mutatePartnerPermissions`

- Versions: v1
- `PATCH https://assuredworkloads.googleapis.com/v1/{+name}:mutatePartnerPermissions`
- Update the permissions settings for an existing partner workload. For force updates don't set etag field in the Workload. Only one update operation per workload can be in progress.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest`; Response: `GoogleCloudAssuredworkloadsV1Workload`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` field is used to identify the workload. Format: organizations/{org_id}/locations/{location_id}/workloads/{workload_id} |

### `assuredworkloads.organizations.locations.workloads.patch`

- Versions: v1, v1beta1
- `PATCH https://assuredworkloads.googleapis.com/v1/{+name}`
- Updates an existing workload. Currently allows updating of workload display_name and labels. For force updates don't set etag field in the Workload. Only one update operation per workload can be in progress.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAssuredworkloadsV1Workload`; Response: `GoogleCloudAssuredworkloadsV1Workload`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Optional. The resource name of the workload. Format: organizations/{organization}/locations/{location}/workloads/{workload} Read-only. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to be updated. |

### `assuredworkloads.organizations.locations.workloads.restrictAllowedResources`

- Versions: v1, v1beta1
- `POST https://assuredworkloads.googleapis.com/v1/{+name}:restrictAllowedResources`
- Restrict the list of resources allowed in the Workload environment. The current list of allowed products can be found at https://cloud.google.com/assured-workloads/docs/supported-products In addition to assuredworkloads.workload.update permission, the user should also have orgpolicy.policy.set permission on the folder resource to use this functionality.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesRequest`; Response: `GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Workload. This is the workloads's relative path in the API, formatted as "organizations/{organization_id}/locations/{location_id}/workloads/{workload_id}". For example, "organizations/123/locations/us-east1/workloads/assured-workload-1". |

### `assuredworkloads.organizations.locations.workloads.updates.apply`

- Versions: v1, v1beta1
- `POST https://assuredworkloads.googleapis.com/v1/{+name}:apply`
- This endpoint creates a new operation to apply the given update.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAssuredworkloadsV1ApplyWorkloadUpdateRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the update. Format: organizations/{org_id}/locations/{location_id}/workloads/{workload_id}/updates/{update_id} |

### `assuredworkloads.organizations.locations.workloads.updates.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/updates`
- This endpoint lists all updates for the given workload.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListWorkloadUpdatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. organizations/{org_id}/locations/{location_id}/workloads/{workload_id} |
| `pageSize` | query | integer (int32) | no | Page size. The default value is 20 and the max allowed value is 100. |
| `pageToken` | query | string | no | Page token returned from previous request. |

### `assuredworkloads.organizations.locations.workloads.violations.acknowledge`

- Versions: v1, v1beta1
- `POST https://assuredworkloads.googleapis.com/v1/{+name}:acknowledge`
- Acknowledges an existing violation. By acknowledging a violation, users acknowledge the existence of a compliance violation in their workload and decide to ignore it due to a valid business justification. Acknowledgement is a permanent operation and it cannot be reverted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudAssuredworkloadsV1AcknowledgeViolationRequest`; Response: `GoogleCloudAssuredworkloadsV1AcknowledgeViolationResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the violation to acknowledge. Format: `organizations/{organization}/locations/{location}/workloads/{workload}/violations/{violation}` |

### `assuredworkloads.organizations.locations.workloads.violations.get`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}`
- Retrieves an Assured Workloads violation by its resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1Violation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the violation to retrieve (that is, the value of `Violation.name`). Format: `organizations/{organization}/locations/{location}/workloads/{workload}/violations/{violation}` |
| `view` | query | string enum | no | Optional. The violation view (`VIOLATION_VIEW_ASSURED_WORKLOADS` or `VIOLATION_VIEW_DATA_BOUNDARY`) that the violation belongs to. If not specified, `VIOLATION_VIEW_ASSURED_WORKLOADS` is used. Values: `VIOLATION_VIEW_UNSPECIFIED`, `VIOLATION_VIEW_ASSURED_WORKLOADS`, `VIOLATION_VIEW_DATA_BOUNDARY`. |

### `assuredworkloads.organizations.locations.workloads.violations.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/violations`
- Lists the Violations in the AssuredWorkload Environment. Callers may also choose to read across multiple Workloads as per AIP-159 (https://google.aip.dev/159) by using '-' (the hyphen or dash character) as a wildcard character instead of workload-id in the parent. Format `organizations/{org_id}/locations/{location}/workloads/-`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListViolationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The workload to list violations for. To list violations across all workloads in an organization, use `-` as the workload ID. When `view` is `VIOLATION_VIEW_DATA_BOUNDARY`, violations are listed for the entire organization and location, and the workload ID is ignored. Format: `organizations/{organization}/locations/{location}/workloads/{workload}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the violations that are returned. The syntax follows AIP-160 (https://google.aip.dev/160). Only the equality operator (`=`) is supported, and expressions can be combined with `AND`, `OR`, and `NOT`. When `view` is `VIOLATION_VIEW_DATA_BOUNDARY`, the following fields are supported: `violationId`, `category`, `state` (`UNRESOLVED`, `RESOLVED`, or `EXCEPTION`), `violationType` (`ORG_POLICY` or `RESOURCE`), `resourceType`, `resourceName`, `project`, `associatedOrgPolicyViolationId`, `cloudControlName`, `workloadDisplayName`, and `complianceType` (a framework ID). Example: `state = "UNRESOLVED" AND complianceType = "builtin-fedramp-high"` |
| `interval.endTime` | query | string (google-datetime) | no | The end of the time window. |
| `interval.startTime` | query | string (google-datetime) | no | The start of the time window. |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to sort the results by. The default sort order is ascending; to sort in descending order, append ` desc` to the field name. For example, `update_time desc,category`. When `view` is `VIOLATION_VIEW_DATA_BOUNDARY`, the following fields are supported: `begin_time`, `update_time`, `resource_type`, `state`, and `category`. If not specified, results are sorted by `begin_time` in descending order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of violations to return. The service might return fewer violations than this value. If unspecified, at most 100 violations are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListViolations` call. Provide this token to retrieve the subsequent page. When paginating, all other parameters that are provided to `ListViolations` must match the call that provided the page token. |
| `view` | query | string enum | no | Optional. The violation view (`VIOLATION_VIEW_ASSURED_WORKLOADS` or `VIOLATION_VIEW_DATA_BOUNDARY`) to list violations for. If not specified, `VIOLATION_VIEW_ASSURED_WORKLOADS` is used. Values: `VIOLATION_VIEW_UNSPECIFIED`, `VIOLATION_VIEW_ASSURED_WORKLOADS`, `VIOLATION_VIEW_DATA_BOUNDARY`. |

### `assuredworkloads.projects.locations.dbFindingSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbFindingSummaries`
- Lists summaries of the active findings in a Data Boundary scope (an organization, folder, or project), with one summary for each finding category.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbFindingSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent scope to list finding summaries for. Formats: \* `organizations/{organization}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `projects/{project}/locations/{location}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the framework deployments whose findings are summarized. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, and `framework_revision` (the major revision ID of the framework). |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |

### `assuredworkloads.projects.locations.dbFrameworkComplianceReports.aggregate`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}:aggregate`
- Gets daily compliance reports over a time range for a framework that's deployed in a Data Boundary scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1AggregateDbFrameworkComplianceReportResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the framework compliance report to aggregate over time. The report ID is the ID of the compliance framework, for example `builtin-fedramp-high`. Format: `organizations/{organization_id}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the framework deployments that are included in the report. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, and `framework_revision` (the major revision ID of the framework). |
| `interval.endTime` | query | string (google-datetime) | no | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `assuredworkloads.projects.locations.dbFrameworkComplianceReports.dbControlComplianceSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbControlComplianceSummaries`
- Lists the compliance summaries of the controls in a framework compliance report.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbControlComplianceSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The framework compliance report to list control compliance summaries for. Formats: \* `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `folders/{folder}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `projects/{project}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. The syntax follows AIP-160 (https://google.aip.dev/160). Supported fields are `framework_deployment`, `framework_name`, `framework_revision` (the major revision ID of the framework), and `end_time`. The `end_time` field accepts a single equality comparison with an RFC 3339 (https://www.ietf.org/rfc/rfc3339.txt) timestamp, for example `end_time = "2026-01-01T00:00:00Z"`. Only findings that were updated at or after this time are counted. |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the default page size is 50. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |

### `assuredworkloads.projects.locations.dbFrameworkComplianceReports.fetch`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+name}:fetch`
- Fetches the current compliance report for a framework that's deployed in a Data Boundary scope (an organization, folder, or project). The report includes the number of passing, failing, and not assessed controls in the framework.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1FetchDbFrameworkComplianceReportResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the framework compliance report to retrieve. The report ID is the ID of the compliance framework, for example `builtin-fedramp-high`. Formats: \* `organizations/{organization}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `folders/{folder}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` \* `projects/{project}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}` |
| `endTime` | query | string (google-datetime) | no | Optional. The end time of the report. Reserved for future use. Currently, the report always reflects the current compliance state. |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. Reserved for future use. |

### `assuredworkloads.projects.locations.dbFrameworkComplianceSummaries.list`

- Versions: v1, v1beta1
- `GET https://assuredworkloads.googleapis.com/v1/{+parent}/dbFrameworkComplianceSummaries`
- Lists the compliance summaries of the frameworks that are deployed in a Data Boundary scope (an organization, folder, or project).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudAssuredworkloadsV1ListDbFrameworkComplianceSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent scope to list framework compliance summaries for. Formats: \* `organizations/{organization}/locations/{location}` \* `folders/{folder}/locations/{location}` \* `projects/{project}/locations/{location}` |
| `filter` | query | string | no | Optional. A filter expression that restricts the results. Reserved for future use. |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server might return fewer items than requested. If unspecified, the default page size is 50. The maximum value is 1000. |
| `pageToken` | query | string | no | Optional. A token that identifies the page of results that the server should return. Pass the `next_page_token` value from a previous result. |
| `view` | query | string enum | no | Optional. The level of detail to return for each summary. If not specified, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_BASIC` is used. Values: `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_UNSPECIFIED`, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_BASIC`, `FRAMEWORK_COMPLIANCE_SUMMARY_VIEW_FULL`. |

### Example request skeleton

Generated from the Discovery entry of `assuredworkloads.folders.locations.dbFindingSummaries.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://assuredworkloads.googleapis.com/v1/{+parent}/dbFindingSummaries"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `assuredworkloads` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/assuredworkloads/`; they are the `schemas` section of the Discovery documents in Source.
- Path variables described as "Optional" in the Discovery document are still required by the route shown, so they are `yes` in the Required column: `name` in `assuredworkloads.organizations.locations.workloads.patch`. The description refers to the field in the request message; the Discovery document defines no URL without that segment. Where a sibling method covers an alternative parent (another resource's method listed separately), call that method's route instead.
- Corrected from the Discovery document: the description of `name` in `assuredworkloads.folders.locations.dbFrameworkComplianceReports.aggregate` gives the resource name format `organizations/{organization_id}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}`, but the path pattern of `name` is `^folders/[^/]+/locations/[^/]+/dbFrameworkComplianceReports/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `assuredworkloads.projects.locations.dbFrameworkComplianceReports.aggregate` gives the resource name format `organizations/{organization_id}/locations/{location}/dbFrameworkComplianceReports/{db_framework_compliance_report}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/dbFrameworkComplianceReports/[^/]+$`; a value must match the pattern to reach the route.
- Source: https://assuredworkloads.googleapis.com/$discovery/rest?version=v1, https://assuredworkloads.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
