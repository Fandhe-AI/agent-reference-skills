---
source: https://datalineage.googleapis.com/$discovery/rest?version=v1
---

# Data Lineage API REST API (datalineage)

## Signature / Usage

Base URL: `https://datalineage.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `datalineage.folders.locations.config.get`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}`
- Get the Config for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. REQUIRED: The resource name of the config to be fetched. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` |

### `datalineage.folders.locations.config.patch`

- Versions: v1
- `PATCH https://datalineage.googleapis.com/v1/{+name}`
- Update the Config for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`; Response: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` |

### `datalineage.organizations.locations.config.get`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}`
- Get the Config for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. REQUIRED: The resource name of the config to be fetched. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` |

### `datalineage.organizations.locations.config.patch`

- Versions: v1
- `PATCH https://datalineage.googleapis.com/v1/{+name}`
- Update the Config for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`; Response: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` |

### `datalineage.projects.locations.batchSearchLinkProcesses`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+parent}:batchSearchLinkProcesses`
- Retrieve information about LineageProcesses associated with specific links. LineageProcesses are transformation pipelines that result in data flowing from \*\*source\*\* to \*\*target\*\* assets. Links between assets represent this operation. If you have specific link names, you can use this method to verify which LineageProcesses contribute to creating those links. See the SearchLinks method for more information on how to retrieve link name. You can retrieve the LineageProcess information in every project where you have the `datalineage.events.get` permission. The project provided in the URL is used for Billing and Quota.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest`; Response: `GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location where you want to search. |

### `datalineage.projects.locations.config.get`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}`
- Get the Config for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. REQUIRED: The resource name of the config to be fetched. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` |

### `datalineage.projects.locations.config.patch`

- Versions: v1
- `PATCH https://datalineage.googleapis.com/v1/{+name}`
- Update the Config for a given resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`; Response: `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` |

### `datalineage.projects.locations.operations.cancel`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `datalineage.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://datalineage.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `datalineage.projects.locations.operations.get`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `datalineage.projects.locations.operations.list`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}/operations`
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

### `datalineage.projects.locations.processOpenLineageRunEvent`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+parent}:processOpenLineageRunEvent`
- Creates new lineage events together with their parents: process and run. Updates the process and run if they already exist. Mapped from Open Lineage specification: https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.json.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: a JSON object (no named type in the Discovery document); Response: `GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project and its location that should own the process, run, and lineage event. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. |

### `datalineage.projects.locations.processes.create`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+parent}/processes`
- Creates a new process.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageV1Process`; Response: `GoogleCloudDatacatalogLineageV1Process`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project and its location that should own the process. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. |

### `datalineage.projects.locations.processes.delete`

- Versions: v1
- `DELETE https://datalineage.googleapis.com/v1/{+name}`
- Deletes the process with the specified name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the process to delete. |
| `allowMissing` | query | boolean | no | Optional. If set to true and the process is not found, the request succeeds but the server doesn't perform any actions. |

### `datalineage.projects.locations.processes.get`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}`
- Gets the details of the specified process.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageV1Process`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the process to get. |

### `datalineage.projects.locations.processes.list`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+parent}/processes`
- List processes in the given project and location. List order is descending by insertion time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageV1ListProcessesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project and its location that owns this collection of processes. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of processes to return. The service may return fewer than this value. If unspecified, at most 50 processes are returned. The maximum value is 100; values greater than 100 are cut to 100. |
| `pageToken` | query | string | no | Optional. The page token received from a previous `ListProcesses` call. Specify it to get the next page. When paginating, all other parameters specified in this call must match the parameters of the call that provided the page token. |

### `datalineage.projects.locations.processes.patch`

- Versions: v1
- `PATCH https://datalineage.googleapis.com/v1/{+name}`
- Updates a process.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageV1Process`; Response: `GoogleCloudDatacatalogLineageV1Process`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of the lineage process. Format: `projects/{project}/locations/{location}/processes/{process}`. Can be specified or auto-assigned. {process} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` |
| `allowMissing` | query | boolean | no | Optional. If set to true and the process is not found, the request inserts it. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Currently not used. The whole message is updated. |

### `datalineage.projects.locations.processes.runs.create`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+parent}/runs`
- Creates a new run.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageV1Run`; Response: `GoogleCloudDatacatalogLineageV1Run`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the process that should own the run. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. |

### `datalineage.projects.locations.processes.runs.delete`

- Versions: v1
- `DELETE https://datalineage.googleapis.com/v1/{+name}`
- Deletes the run with the specified name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the run to delete. |
| `allowMissing` | query | boolean | no | Optional. If set to true and the run is not found, the request succeeds but the server doesn't perform any actions. |

### `datalineage.projects.locations.processes.runs.get`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}`
- Gets the details of the specified run.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageV1Run`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the run to get. |

### `datalineage.projects.locations.processes.runs.lineageEvents.create`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+parent}/lineageEvents`
- Creates a new lineage event.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageV1LineageEvent`; Response: `GoogleCloudDatacatalogLineageV1LineageEvent`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the run that should own the lineage event. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is idempotent only if a `request_id` is provided. |

### `datalineage.projects.locations.processes.runs.lineageEvents.delete`

- Versions: v1
- `DELETE https://datalineage.googleapis.com/v1/{+name}`
- Deletes the lineage event with the specified name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the lineage event to delete. |
| `allowMissing` | query | boolean | no | Optional. If set to true and the lineage event is not found, the request succeeds but the server doesn't perform any actions. |

### `datalineage.projects.locations.processes.runs.lineageEvents.get`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+name}`
- Gets details of a specified lineage event.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageV1LineageEvent`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the lineage event to get. |

### `datalineage.projects.locations.processes.runs.lineageEvents.list`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+parent}/lineageEvents`
- Lists lineage events in the given project and location. The list order is not defined.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudDatacatalogLineageV1ListLineageEventsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the run that owns the collection of lineage events to get. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of lineage events to return. The service may return fewer events than this value. If unspecified, at most 50 events are returned. The maximum value is 100; values greater than 100 are cut to 100. |
| `pageToken` | query | string | no | Optional. The page token received from a previous `ListLineageEvents` call. Specify it to get the next page. When paginating, all other parameters specified in this call must match the parameters of the call that provided the page token. |

### `datalineage.projects.locations.processes.runs.list`

- Versions: v1
- `GET https://datalineage.googleapis.com/v1/{+parent}/runs`
- Lists runs in the given project and location. List order is descending by `start_time`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datalineage.read-write`, `https://www.googleapis.com/auth/datalineage.readonly`
- Request: —; Response: `GoogleCloudDatacatalogLineageV1ListRunsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of process that owns this collection of runs. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of runs to return. The service may return fewer than this value. If unspecified, at most 50 runs are returned. The maximum value is 100; values greater than 100 are cut to 100. |
| `pageToken` | query | string | no | Optional. The page token received from a previous `ListRuns` call. Specify it to get the next page. When paginating, all other parameters specified in this call must match the parameters of the call that provided the page token. |

### `datalineage.projects.locations.processes.runs.patch`

- Versions: v1
- `PATCH https://datalineage.googleapis.com/v1/{+name}`
- Updates a run.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageV1Run`; Response: `GoogleCloudDatacatalogLineageV1Run`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of the run. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}`. Can be specified or auto-assigned. {run} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` |
| `allowMissing` | query | boolean | no | Optional. If set to true and the run is not found, the request creates it. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Currently not used. The whole message is updated. |

### `datalineage.projects.locations.searchLineageStreaming`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+parent}:searchLineageStreaming`
- Retrieves a streaming response of lineage links connected to the requested assets by performing a breadth-first search in the given direction. Links represent the data flow between \*\*source\*\* (upstream) and \*\*target\*\* (downstream) assets in transformation pipelines. Links are stored in the same project as the Lineage Events that create them. This method retrieves links from all valid locations provided in the request. This method supports Column-Level Lineage (CLL) along with wildcard support to retrieve all CLL for an Entity FQN. Following permissions are required to retrieve links: \* `datalineage.events.get` permission for the project where the link is stored for entity-level lineage. \* `datalineage.events.getFields` permission for the project where the link is stored for column-level lineage. This method also returns processes that created the links if explicitly requested by setting \[max_process_per_link\](google.cloud.datacatalog.lineage.v1.SearchLineageStreamingRequest.limits.max_process_per_link) is non-zero and full process details are requested via `links.processes.process` in the FieldMask (https://developers.google.com/workspace/docs/api/how-tos/field-masks#read_with_a_field_mask). Permission required to retrieve processes: \* `datalineage.processes.get` permission for the project where the process is stored.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datalineage.read-write`, `https://www.googleapis.com/auth/datalineage.readonly`
- Request: `GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequest`; Response: `GoogleCloudDatacatalogLineageV1SearchLineageStreamingResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location to initiate the search from. |

### `datalineage.projects.locations.searchLinks`

- Versions: v1
- `POST https://datalineage.googleapis.com/v1/{+parent}:searchLinks`
- Retrieve a list of links connected to a specific asset. Links represent the data flow between \*\*source\*\* (upstream) and \*\*target\*\* (downstream) assets in transformation pipelines. Links are stored in the same project as the Lineage Events that create them. You can retrieve links in every project where you have the `datalineage.events.get` permission. The project provided in the URL is used for Billing and Quota.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudDatacatalogLineageV1SearchLinksRequest`; Response: `GoogleCloudDatacatalogLineageV1SearchLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location you want search in. |

### Example request skeleton

Generated from the Discovery entry of `datalineage.folders.locations.config.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://datalineage.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `datalineage` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`datalineage` v1, revision 20261030) also lists 49 endpoints of the form `https://datalineage.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `asia-southeast4`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://datalineage.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://datalineage.africa-south1.rep.googleapis.com/`) and keep the path.
- The request body of `datalineage.projects.locations.processOpenLineageRunEvent` is the OpenLineage run event itself: the Discovery document gives it no named type (an object with any fields), and the source proto maps the body to the field `open_lineage` ("Required. OpenLineage message following OpenLineage format: https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.json", a `google.protobuf.Struct`; `body: "open_lineage"` in `ProcessOpenLineageRunEvent`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/lineage/v1/lineage.proto, commit `5ce0245`, retrieved 2026-11-19). An example request with `eventTime`, `eventType`, `run`, `job`, `inputs` and `outputs` is in [open-lineage.md](../../data-lineage/open-lineage.md).
- Source: https://datalineage.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
