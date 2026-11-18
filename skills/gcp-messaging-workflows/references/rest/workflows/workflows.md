---
source: https://workflows.googleapis.com/$discovery/rest?version=v1
---

# Workflows API REST API (workflows)

## Signature / Usage

Base URL: `https://workflows.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `workflows.projects.locations.get`

- Versions: v1, v1beta
- `GET https://workflows.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `workflows.projects.locations.list`

- Versions: v1, v1beta
- `GET https://workflows.googleapis.com/v1/{+name}/locations`
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

### `workflows.projects.locations.operations.delete`

- Versions: v1, v1beta
- `DELETE https://workflows.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `workflows.projects.locations.operations.get`

- Versions: v1, v1beta
- `GET https://workflows.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `workflows.projects.locations.operations.list`

- Versions: v1, v1beta
- `GET https://workflows.googleapis.com/v1/{+name}/operations`
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

### `workflows.projects.locations.workflows.create`

- Versions: v1, v1beta
- `POST https://workflows.googleapis.com/v1/{+parent}/workflows`
- Creates a new workflow. If a workflow with the specified name already exists in the specified project and location, the long running operation returns a ALREADY_EXISTS error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workflow`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location in which the workflow should be created. Format: projects/{project}/locations/{location} |
| `workflowId` | query | string | yes | Required. The ID of the workflow to be created. It has to fulfill the following requirements: \* Must contain only letters, numbers, underscores and hyphens. \* Must start with a letter. \* Must be between 1-64 characters. \* Must end with a number or a letter. \* Must be unique within the customer project and location. |

### `workflows.projects.locations.workflows.delete`

- Versions: v1, v1beta
- `DELETE https://workflows.googleapis.com/v1/{+name}`
- Deletes a workflow with the specified name. This method also cancels and deletes all running executions of the workflow.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workflow to be deleted. Format: projects/{project}/locations/{location}/workflows/{workflow} |

### `workflows.projects.locations.workflows.get`

- Versions: v1, v1beta
- `GET https://workflows.googleapis.com/v1/{+name}`
- Gets details of a single workflow.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Workflow`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workflow for which information should be retrieved. Format: projects/{project}/locations/{location}/workflows/{workflow} |
| `revisionId` | query | string | no | Optional. The revision of the workflow to retrieve. If the revision_id is empty, the latest revision is retrieved. The format is "000001-a4d", where the first six characters define the zero-padded decimal revision number. They are followed by a hyphen and three hexadecimal characters. |

### `workflows.projects.locations.workflows.list`

- Versions: v1, v1beta
- `GET https://workflows.googleapis.com/v1/{+parent}/workflows`
- Lists workflows in a given project and location. The default order is not specified.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkflowsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Project and location from which the workflows should be listed. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Filter to restrict results to specific workflows. For details, see AIP-160. For example, if you are using the Google APIs Explorer: `state="SUCCEEDED"` or `createTime>"2023-08-01" AND state="FAILED"` |
| `orderBy` | query | string | no | Comma-separated list of fields that specify the order of the results. Default sorting order for a field is ascending. To specify descending order for a field, append a "desc" suffix. If not specified, the results are returned in an unspecified order. |
| `pageSize` | query | integer (int32) | no | Maximum number of workflows to return per call. The service might return fewer than this value even if not at the end of the collection. If a value is not specified, a default value of 500 is used. The maximum permitted value is 1000 and values greater than 1000 are coerced down to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListWorkflows` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWorkflows` must match the call that provided the page token. |

### `workflows.projects.locations.workflows.listRevisions`

- Versions: v1
- `GET https://workflows.googleapis.com/v1/{+name}:listRevisions`
- Lists revisions for a given workflow.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkflowRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Workflow for which the revisions should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow} |
| `pageSize` | query | integer (int32) | no | The maximum number of revisions to return per page. If a value is not specified, a default value of 20 is used. The maximum permitted value is 100. Values greater than 100 are coerced down to 100. |
| `pageToken` | query | string | no | The page token, received from a previous ListWorkflowRevisions call. Provide this to retrieve the subsequent page. |

### `workflows.projects.locations.workflows.patch`

- Versions: v1, v1beta
- `PATCH https://workflows.googleapis.com/v1/{+name}`
- Updates an existing workflow. Running this method has no impact on already running executions of the workflow. A new revision of the workflow might be created as a result of a successful update operation. In that case, the new revision is used in new workflow executions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workflow`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow}. This is a workflow-wide field and is not tied to a specific revision. |
| `updateMask` | query | string (google-fieldmask) | no | List of fields to be updated. If not present, the entire workflow will be updated. |

### Example request skeleton

Generated from the Discovery entry of `workflows.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://workflows.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `workflows` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/workflows/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`workflows` v1, revision 20260819) also lists 36 endpoints of the form `https://workflows.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://workflows.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://workflows.asia-south1.rep.googleapis.com/`) and keep the path.
- Source: https://workflows.googleapis.com/$discovery/rest?version=v1, https://workflows.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
