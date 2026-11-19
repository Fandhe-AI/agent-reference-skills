---
source: https://workloadmanager.googleapis.com/$discovery/rest?version=v1
---

# Workload Manager API REST API (workloadmanager)

## Signature / Usage

Base URL: `https://workloadmanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `workloadmanager.projects.locations.deployments.actuations.create`

- Versions: v1
- `POST https://workloadmanager.googleapis.com/v1/{+parent}/actuations`
- Creates a new actuation for an existing Deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Actuation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Actuation location using the form: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `workloadmanager.projects.locations.deployments.actuations.delete`

- Versions: v1
- `DELETE https://workloadmanager.googleapis.com/v1/{+name}`
- Deletes a single Actuation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the actuation to delete. projects/{project}/locations/{location}/deployments/{deployment}/actuations/{actuation}. |

### `workloadmanager.projects.locations.deployments.actuations.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Gets details of a single Actuation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Actuation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `workloadmanager.projects.locations.deployments.actuations.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/actuations`
- Lists Actuations in a given project, location and deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListActuationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource prefix of the Actuation using the form: 'projects/{project_id}/locations/{location}/deployments/{deployment}'. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `workloadmanager.projects.locations.deployments.create`

- Versions: v1
- `POST https://workloadmanager.googleapis.com/v1/{+parent}/deployments`
- Creates a new Deployment in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Deployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource prefix of the Deployment using the form: `projects/{project_id}/locations/{location_id}` |
| `deploymentId` | query | string | yes | Required. ID of the deployment. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `workloadmanager.projects.locations.deployments.delete`

- Versions: v1
- `DELETE https://workloadmanager.googleapis.com/v1/{+name}`
- Deletes a single Deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `force` | query | boolean | no | Optional. If set to true, any actuation will also be deleted. Follows the best practice from https://aip.dev/135#cascading-delete. |

### `workloadmanager.projects.locations.deployments.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Gets details of a single Deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Deployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. The format is 'projects/{project_id}/locations/{location_id}/deployments/{deployment_id}'. |

### `workloadmanager.projects.locations.deployments.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/deployments`
- Lists Deployments in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource prefix of the Deployment using the form: `projects/{project_id}/locations/{location_id}` |
| `filter` | query | string | no | Optional. Filter resource following https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `workloadmanager.projects.locations.discoveredprofiles.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Gets details of a discovered workload profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WorkloadProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |

### `workloadmanager.projects.locations.discoveredprofiles.health.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Get the health of a discovered workload profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WorkloadProfileHealth`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name |

### `workloadmanager.projects.locations.discoveredprofiles.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/discoveredprofiles`
- List discovered workload profiles
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDiscoveredProfilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListDiscoveredProfilesRequest |
| `filter` | query | string | no | Optional. Filtering results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `workloadmanager.projects.locations.evaluations.create`

- Versions: v1
- `POST https://workloadmanager.googleapis.com/v1/{+parent}/evaluations`
- Creates a new Evaluation in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Evaluation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource prefix of the evaluation location using the form: `projects/{project_id}/locations/{location_id}`. |
| `evaluationId` | query | string | yes | Required. Id of the requesting object. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `workloadmanager.projects.locations.evaluations.delete`

- Versions: v1
- `DELETE https://workloadmanager.googleapis.com/v1/{+name}`
- Deletes a single Evaluation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `force` | query | boolean | no | Optional. Followed the best practice from https://aip.dev/135#cascading-delete. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `workloadmanager.projects.locations.evaluations.executions.delete`

- Versions: v1
- `DELETE https://workloadmanager.googleapis.com/v1/{+name}`
- Deletes a single Execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `workloadmanager.projects.locations.evaluations.executions.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Gets details of a single Execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `workloadmanager.projects.locations.evaluations.executions.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/executions`
- Lists Executions in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExecutionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource prefix of the Execution using the form: `projects/{project}/locations/{location}/evaluations/{evaluation}`. |
| `filter` | query | string | no | Filtering results. |
| `orderBy` | query | string | no | Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `workloadmanager.projects.locations.evaluations.executions.results.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/results`
- Lists the result of a single evaluation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExecutionResultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The execution results. Format: {parent}/evaluations/\*/executions/\*/results. |
| `filter` | query | string | no | Filtering results. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `workloadmanager.projects.locations.evaluations.executions.run`

- Versions: v1
- `POST https://workloadmanager.googleapis.com/v1/{+name}/executions:run`
- Creates a new Execution in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RunEvaluationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Evaluation using the form: `projects/{project}/locations/{location}/evaluations/{evaluation}`. |

### `workloadmanager.projects.locations.evaluations.executions.scannedResources.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/scannedResources`
- List all scanned resources for a single Execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListScannedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent for ListScannedResourcesRequest. |
| `filter` | query | string | no | Filtering results. |
| `orderBy` | query | string | no | Field to sort by. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |
| `rule` | query | string | no | Rule name. |

### `workloadmanager.projects.locations.evaluations.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Gets details of a single Evaluation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Evaluation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `workloadmanager.projects.locations.evaluations.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/evaluations`
- Lists Evaluations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEvaluationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListEvaluationsRequest. |
| `filter` | query | string | no | Filter to be applied when listing the evaluation results. |
| `orderBy` | query | string | no | Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `workloadmanager.projects.locations.evaluations.patch`

- Versions: v1
- `PATCH https://workloadmanager.googleapis.com/v1/{+name}`
- Updates the parameters of a single Evaluation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Evaluation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of resource that has the form `projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Evaluation resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. |

### `workloadmanager.projects.locations.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `workloadmanager.projects.locations.insights.delete`

- Versions: v1
- `DELETE https://workloadmanager.googleapis.com/v1/{+name}`
- Delete the data insights from workload manager data warehouse.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The system id of the SAP system resource to delete. Formatted as projects/{project}/locations/{location}/sapSystems/{sap_system_id} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `workloadmanager.projects.locations.insights.writeInsight`

- Versions: v1
- `POST https://workloadmanager.googleapis.com/v1/{+location}/insights:writeInsight`
- Write the data insights to workload manager data warehouse.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WriteInsightRequest`; Response: `WriteInsightResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The GCP location. The format is: projects/{project}/locations/{location}. |

### `workloadmanager.projects.locations.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `workloadmanager.projects.locations.operations.cancel`

- Versions: v1
- `POST https://workloadmanager.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `workloadmanager.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://workloadmanager.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `workloadmanager.projects.locations.operations.get`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `workloadmanager.projects.locations.operations.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `workloadmanager.projects.locations.rules.list`

- Versions: v1
- `GET https://workloadmanager.googleapis.com/v1/{+parent}/rules`
- Lists rules in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The \[project\] on which to execute the request. The format is: projects/{project_id}/locations/{location} Currently, the pre-defined rules are global available to all projects and all regions. |
| `customRulesBucket` | query | string | no | The Cloud Storage bucket name for custom rules. |
| `evaluationType` | query | string enum | no | Optional. The evaluation type of the rules will be applied to. The Cloud Storage bucket name for custom rules. Values: `EVALUATION_TYPE_UNSPECIFIED`, `SAP`, `SQL_SERVER`, `OTHER`. |
| `filter` | query | string | no | Filter based on primary_category, secondary_category. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### Example request skeleton

Generated from the Discovery entry of `workloadmanager.projects.locations.deployments.actuations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://workloadmanager.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `workloadmanager` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://workloadmanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
