---
source: https://securityposture.googleapis.com/$discovery/rest?version=v1
---

# Security Posture API REST API (securityposture)

## Signature / Usage

Base URL: `https://securityposture.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `securityposture.organizations.locations.get`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `securityposture.organizations.locations.list`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}/locations`
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

### `securityposture.organizations.locations.operations.cancel`

- Versions: v1
- `POST https://securityposture.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `securityposture.organizations.locations.operations.delete`

- Versions: v1
- `DELETE https://securityposture.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `securityposture.organizations.locations.operations.get`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `securityposture.organizations.locations.operations.list`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}/operations`
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

### `securityposture.organizations.locations.postureDeployments.create`

- Versions: v1
- `POST https://securityposture.googleapis.com/v1/{+parent}/postureDeployments`
- Creates a new PostureDeployment in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PostureDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |
| `postureDeploymentId` | query | string | yes | Required. An identifier for the posture deployment. |

### `securityposture.organizations.locations.postureDeployments.delete`

- Versions: v1
- `DELETE https://securityposture.googleapis.com/v1/{+name}`
- Deletes a PostureDeployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{posture_id}`. |
| `etag` | query | string | no | Optional. An opaque identifier for the current version of the posture deployment. If you provide this value, then it must match the existing value. If the values don't match, then the request fails with an ABORTED error. If you omit this value, then the posture deployment is deleted regardless of its current `etag` value. |

### `securityposture.organizations.locations.postureDeployments.get`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}`
- Gets details for a PostureDeployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PostureDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the PostureDeployment, in the format `organizations/{organization}/locations/global/postureDeployments/{posture_deployment_id}`. |

### `securityposture.organizations.locations.postureDeployments.list`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+parent}/postureDeployments`
- Lists every PostureDeployment in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPostureDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |
| `filter` | query | string | no | Optional. A filter to apply to the list of postures, in the format defined in AIP-160: Filtering (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of posture deployments to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous request to list posture deployments. Provide this token to retrieve the next page of results. |

### `securityposture.organizations.locations.postureDeployments.patch`

- Versions: v1
- `PATCH https://securityposture.googleapis.com/v1/{+name}`
- Updates an existing PostureDeployment. To prevent concurrent updates from overwriting each other, always follow the read-modify-write pattern when you update a posture deployment: 1. Call GetPostureDeployment to get the current version of the deployment. 2. Update the fields in the deployment as needed. 3. Call UpdatePostureDeployment to update the deployment. Ensure that your request includes the `etag` value from the GetPostureDeployment response. \*\*Important:\*\* If you omit the `etag` when you call UpdatePostureDeployment, then the updated deployment unconditionally overwrites the existing deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PostureDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The name of the posture deployment, in the format `organizations/{organization}/locations/global/postureDeployments/{deployment_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields in the PostureDeployment to update. You can update only the following fields: \* PostureDeployment.posture_id \* PostureDeployment.posture_revision_id |

### `securityposture.organizations.locations.postureTemplates.get`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}`
- Gets a single revision of a PostureTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PostureTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the PostureTemplate, in the format `organizations/{organization}/locations/global/postureTemplates/{posture_template}`. |
| `revisionId` | query | string | no | Optional. The posture template revision to retrieve. If not specified, the most recently updated revision is retrieved. |

### `securityposture.organizations.locations.postureTemplates.list`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+parent}/postureTemplates`
- Lists every PostureTemplate in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPostureTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |
| `filter` | query | string | no | Optional. A filter to apply to the list of postures, in the format defined in AIP-160: Filtering (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of posture templates to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous request to list posture templates. Provide this token to retrieve the next page of results. |

### `securityposture.organizations.locations.postures.create`

- Versions: v1
- `POST https://securityposture.googleapis.com/v1/{+parent}/postures`
- Creates a new Posture.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Posture`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |
| `postureId` | query | string | yes | Required. An identifier for the posture. |

### `securityposture.organizations.locations.postures.delete`

- Versions: v1
- `DELETE https://securityposture.googleapis.com/v1/{+name}`
- Deletes all revisions of a Posture. You can only delete a posture if none of its revisions are deployed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. |
| `etag` | query | string | no | Optional. An opaque identifier for the current version of the posture. If you provide this value, then it must match the existing value. If the values don't match, then the request fails with an ABORTED error. If you omit this value, then the posture is deleted regardless of its current `etag` value. |

### `securityposture.organizations.locations.postures.extract`

- Versions: v1
- `POST https://securityposture.googleapis.com/v1/{+parent}/postures:extract`
- Extracts existing policies from an organization, folder, or project, and applies them to another organization, folder, or project as a Posture. If the other organization, folder, or project already has a posture, then the result of the long-running operation is an ALREADY_EXISTS error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExtractPostureRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |

### `securityposture.organizations.locations.postures.get`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}`
- Gets a single revision of a Posture.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Posture`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. |
| `revisionId` | query | string | no | Optional. The posture revision to retrieve. If not specified, the most recently updated revision is retrieved. |

### `securityposture.organizations.locations.postures.list`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+parent}/postures`
- Lists the most recent revisions of all Posture resources in a specified organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPosturesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |
| `filter` | query | string | no | Optional. A filter to apply to the list of postures, in the format defined in AIP-160: Filtering (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of postures to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. |
| `pageToken` | query | string | no | A pagination token returned from a previous request to list postures. Provide this token to retrieve the next page of results. |

### `securityposture.organizations.locations.postures.listRevisions`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}:listRevisions`
- Lists all revisions of a single Posture.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPostureRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of posture revisions to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. |
| `pageToken` | query | string | no | Optional. A pagination token from a previous request to list posture revisions. Provide this token to retrieve the next page of results. |

### `securityposture.organizations.locations.postures.patch`

- Versions: v1
- `PATCH https://securityposture.googleapis.com/v1/{+name}`
- Updates a revision of an existing Posture. If the posture revision that you update is currently deployed, then a new revision of the posture is created. To prevent concurrent updates from overwriting each other, always follow the read-modify-write pattern when you update a posture: 1. Call GetPosture to get the current version of the posture. 2. Update the fields in the posture as needed. 3. Call UpdatePosture to update the posture. Ensure that your request includes the `etag` value from the GetPosture response. \*\*Important:\*\* If you omit the `etag` when you call UpdatePosture, then the updated posture unconditionally overwrites the existing posture.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Posture`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`. |
| `revisionId` | query | string | yes | Required. The revision ID of the posture to update. If the posture revision that you update is currently deployed, then a new revision of the posture is created. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields in the Posture to update. You can update only the following fields: \* Posture.description \* Posture.policy_sets \* Posture.state |

### `securityposture.organizations.locations.reports.createIaCValidationReport`

- Versions: v1
- `POST https://securityposture.googleapis.com/v1/{+parent}/reports:createIaCValidationReport`
- Validates a specified infrastructure-as-code (IaC) configuration, and creates a Report with the validation results. Only Terraform configurations are supported. Only modified assets are validated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateIaCValidationReportRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |

### `securityposture.organizations.locations.reports.get`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+name}`
- Gets details for a Report.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Report`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the report, in the format `organizations/{organization}/locations/global/reports/{report_id}`. |

### `securityposture.organizations.locations.reports.list`

- Versions: v1
- `GET https://securityposture.googleapis.com/v1/{+parent}/reports`
- Lists every Report in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, in the format `organizations/{organization}/locations/global`. |
| `filter` | query | string | no | Optional. A filter to apply to the list of reports, in the format defined in AIP-160: Filtering (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of reports to return. The default value is `500`. If you exceed the maximum value of `1000`, then the service uses the maximum value. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous request to list reports. Provide this token to retrieve the next page of results. |

### Example request skeleton

Generated from the Discovery entry of `securityposture.organizations.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://securityposture.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `securityposture` (retrieved 2026-11-14). Resources on this page: organizations.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/securityposture/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://securityposture.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
