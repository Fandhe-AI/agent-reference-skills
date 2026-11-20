---
source: https://bigquerydatatransfer.googleapis.com/$discovery/rest?version=v1
---

# BigQuery Data Transfer API REST API (bigquerydatatransfer)

## Signature / Usage

Base URL: `https://bigquerydatatransfer.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1). The URL, parameters and request / response types shown for a method come from the first version on its `Versions` line; for another version, see the Discovery document of that version under Source in Notes.

### `bigquerydatatransfer.projects.dataSources.checkValidCreds`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+name}:checkValidCreds`
- Returns true if valid credentials exist for the given data source and requesting user.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `CheckValidCredsRequest`; Response: `CheckValidCredsResponse`

### `bigquerydatatransfer.projects.dataSources.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Retrieves a supported data source and returns its settings.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `DataSource`

### `bigquerydatatransfer.projects.dataSources.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/dataSources`
- Lists supported data sources and returns their settings.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListDataSourcesResponse`

### `bigquerydatatransfer.projects.enrollDataSources`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+name}:enrollDataSources`
- Enroll data sources in a user project. This allows users to create transfer configurations for these data sources. They will also appear in the ListDataSources RPC and as such, will appear in the BigQuery UI (https://console.cloud.google.com/bigquery), and the documents can be found in the public guide for BigQuery Web UI (https://cloud.google.com/bigquery/bigquery-web-ui) and Data Transfer Service (https://cloud.google.com/bigquery/docs/working-with-transfers).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollDataSourcesRequest`; Response: `Empty`

### `bigquerydatatransfer.projects.locations.dataSources.checkValidCreds`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+name}:checkValidCreds`
- Returns true if valid credentials exist for the given data source and requesting user.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `CheckValidCredsRequest`; Response: `CheckValidCredsResponse`

### `bigquerydatatransfer.projects.locations.dataSources.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Retrieves a supported data source and returns its settings.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `DataSource`

### `bigquerydatatransfer.projects.locations.dataSources.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/dataSources`
- Lists supported data sources and returns their settings.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListDataSourcesResponse`

### `bigquerydatatransfer.projects.locations.enrollDataSources`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+name}:enrollDataSources`
- Enroll data sources in a user project. This allows users to create transfer configurations for these data sources. They will also appear in the ListDataSources RPC and as such, will appear in the BigQuery UI (https://console.cloud.google.com/bigquery), and the documents can be found in the public guide for BigQuery Web UI (https://cloud.google.com/bigquery/bigquery-web-ui) and Data Transfer Service (https://cloud.google.com/bigquery/docs/working-with-transfers).
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnrollDataSourcesRequest`; Response: `Empty`

### `bigquerydatatransfer.projects.locations.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Location`

### `bigquerydatatransfer.projects.locations.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- In the REST route above, `name` is a required path variable: set it to the project (`projects/{project}`, path pattern `^projects/[^/]+$`). The Discovery document defines no URL for the empty-`name` case in the description above.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListLocationsResponse`

### `bigquerydatatransfer.projects.locations.transferConfigs.create`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferConfigs`
- Creates a new data transfer configuration.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TransferConfig`; Response: `TransferConfig`

### `bigquerydatatransfer.projects.locations.transferConfigs.delete`

- Versions: v1
- `DELETE https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Deletes a data transfer configuration, including any associated transfer runs and logs.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigquerydatatransfer.projects.locations.transferConfigs.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Returns information about a data transfer config.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TransferConfig`

### `bigquerydatatransfer.projects.locations.transferConfigs.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferConfigs`
- Returns information about all transfer configs owned by a project in the specified location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferConfigsResponse`

### `bigquerydatatransfer.projects.locations.transferConfigs.patch`

- Versions: v1
- `PATCH https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Updates a data transfer configuration. All fields must be set, even if they are not updated.
- Route of this method (from its `flatPath`; another method shares the URL template above): `PATCH https://bigquerydatatransfer.googleapis.com/v1/projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TransferConfig`; Response: `TransferConfig`

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.delete`

- Versions: v1
- `DELETE https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Deletes the specified transfer run.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Returns information about the particular transfer run.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TransferRun`

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/runs`
- Returns information about running and completed transfer runs.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferRunsResponse`

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.transferLogs.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferLogs`
- Returns log messages for the transfer run.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferLogsResponse`

### `bigquerydatatransfer.projects.locations.transferConfigs.scheduleRuns`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+parent}:scheduleRuns`
- Creates transfer runs for a time range \[start_time, end_time\]. For each date - or whatever granularity the data source supports - in the range, one transfer run is created. Note that runs are created per UTC time in the time range. DEPRECATED: use StartManualTransferRuns instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ScheduleTransferRunsRequest`; Response: `ScheduleTransferRunsResponse`

### `bigquerydatatransfer.projects.locations.transferConfigs.startManualRuns`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+parent}:startManualRuns`
- Manually initiates transfer runs. You can schedule these runs in two ways: 1. For a specific point in time using the 'requested_run_time' parameter. 2. For a period between 'start_time' (inclusive) and 'end_time' (exclusive). If scheduling a single run, it is set to execute immediately (schedule_time equals the current time). When scheduling multiple runs within a time range, the first run starts now, and subsequent runs are delayed by 15 seconds each.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartManualTransferRunsRequest`; Response: `StartManualTransferRunsResponse`

### `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Returns a transfer resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TransferResource`

### `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferResources`
- Returns information about transfer resources.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferResourcesResponse`

### `bigquerydatatransfer.projects.locations.unenrollDataSources`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+name}:unenrollDataSources`
- Unenroll data sources in a user project. This allows users to remove transfer configurations for these data sources. They will no longer appear in the ListDataSources RPC and will also no longer appear in the BigQuery UI (https://console.cloud.google.com/bigquery). Data transfers configurations of unenrolled data sources will not be scheduled.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `UnenrollDataSourcesRequest`; Response: `Empty`

### `bigquerydatatransfer.projects.transferConfigs.create`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferConfigs`
- Creates a new data transfer configuration.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TransferConfig`; Response: `TransferConfig`

### `bigquerydatatransfer.projects.transferConfigs.delete`

- Versions: v1
- `DELETE https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Deletes a data transfer configuration, including any associated transfer runs and logs.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigquerydatatransfer.projects.transferConfigs.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Returns information about a data transfer config.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TransferConfig`

### `bigquerydatatransfer.projects.transferConfigs.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferConfigs`
- Returns information about all transfer configs owned by a project in the specified location.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferConfigsResponse`

### `bigquerydatatransfer.projects.transferConfigs.patch`

- Versions: v1
- `PATCH https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Updates a data transfer configuration. All fields must be set, even if they are not updated.
- Route of this method (from its `flatPath`; another method shares the URL template above): `PATCH https://bigquerydatatransfer.googleapis.com/v1/projects/{projectsId}/transferConfigs/{transferConfigsId}`
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TransferConfig`; Response: `TransferConfig`

### `bigquerydatatransfer.projects.transferConfigs.runs.delete`

- Versions: v1
- `DELETE https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Deletes the specified transfer run.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigquerydatatransfer.projects.transferConfigs.runs.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Returns information about the particular transfer run.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TransferRun`

### `bigquerydatatransfer.projects.transferConfigs.runs.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/runs`
- Returns information about running and completed transfer runs.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferRunsResponse`

### `bigquerydatatransfer.projects.transferConfigs.runs.transferLogs.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferLogs`
- Returns log messages for the transfer run.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferLogsResponse`

### `bigquerydatatransfer.projects.transferConfigs.scheduleRuns`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+parent}:scheduleRuns`
- Creates transfer runs for a time range \[start_time, end_time\]. For each date - or whatever granularity the data source supports - in the range, one transfer run is created. Note that runs are created per UTC time in the time range. DEPRECATED: use StartManualTransferRuns instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ScheduleTransferRunsRequest`; Response: `ScheduleTransferRunsResponse`

### `bigquerydatatransfer.projects.transferConfigs.startManualRuns`

- Versions: v1
- `POST https://bigquerydatatransfer.googleapis.com/v1/{+parent}:startManualRuns`
- Manually initiates transfer runs. You can schedule these runs in two ways: 1. For a specific point in time using the 'requested_run_time' parameter. 2. For a period between 'start_time' (inclusive) and 'end_time' (exclusive). If scheduling a single run, it is set to execute immediately (schedule_time equals the current time). When scheduling multiple runs within a time range, the first run starts now, and subsequent runs are delayed by 15 seconds each.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartManualTransferRunsRequest`; Response: `StartManualTransferRunsResponse`

### `bigquerydatatransfer.projects.transferConfigs.transferResources.get`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+name}`
- Returns a transfer resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TransferResource`

### `bigquerydatatransfer.projects.transferConfigs.transferResources.list`

- Versions: v1
- `GET https://bigquerydatatransfer.googleapis.com/v1/{+parent}/transferResources`
- Returns information about transfer resources.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTransferResourcesResponse`

### Example request line

Generated from the Discovery entry of `bigquerydatatransfer.projects.dataSources.get` (not in the official docs); replace the upper-case placeholders (path variables from the method's `flatPath`; URL-encode query values) and `ACCESS_TOKEN`. `ACCESS_TOKEN` is an OAuth 2.0 access token for a principal allowed to call the method; the Google Cloud client libraries (the gcp-client-libraries skill) obtain and send it:

```http
GET https://bigquerydatatransfer.googleapis.com/v1/projects/PROJECT/dataSources/DATA_SOURCE
Authorization: Bearer ACCESS_TOKEN
```

## Options / Props

### `bigquerydatatransfer.projects.dataSources.checkValidCreds` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the data source. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` This method takes only the form `projects/{projectsId}/dataSources/{dataSourcesId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.checkValidCreds`. |

### `bigquerydatatransfer.projects.dataSources.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` This method takes only the form `projects/{projectsId}/dataSources/{dataSourcesId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.get`. |

### `bigquerydatatransfer.projects.dataSources.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BigQuery project id for which data sources should be returned. Must be in the form: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}` This method takes only the form `projects/{projectsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.dataSources.list`. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListDataSourcesRequest` list results. For multiple-page results, `ListDataSourcesResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListDataSourcesResponse`); pass its value as `pageToken`. |

### `bigquerydatatransfer.projects.enrollDataSources` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project resource in the form: `projects/{project_id}` Format for this method (from its `flatPath`): `projects/{projectsId}`. |

### `bigquerydatatransfer.projects.locations.dataSources.checkValidCreds` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the data source. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.checkValidCreds`. |

### `bigquerydatatransfer.projects.locations.dataSources.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/dataSources/{data_source_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.get`. |

### `bigquerydatatransfer.projects.locations.dataSources.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BigQuery project id for which data sources should be returned. Must be in the form: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}` (from its `flatPath`); for `projects/{projectsId}`, use `bigquerydatatransfer.projects.dataSources.list`. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListDataSourcesRequest` list results. For multiple-page results, `ListDataSourcesResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListDataSourcesResponse`); pass its value as `pageToken`. |

### `bigquerydatatransfer.projects.locations.enrollDataSources` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project and location resource in the form: `projects/{project_id}/locations/{location_id}` (from the path pattern `^projects/[^/]+/locations/[^/]+$`). For the regionless form `projects/{project_id}`, use `bigquerydatatransfer.projects.enrollDataSources`. (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `bigquerydatatransfer.projects.locations.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}`. |

### `bigquerydatatransfer.projects.locations.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. Format for this method (from its `flatPath`): `projects/{projectsId}`. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. In the REST JSON response the field is `nextPageToken` (`ListLocationsResponse`); pass its value as `pageToken`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BigQuery project id where the transfer configuration should be created. Must be in the format projects/{project_id}/locations/{location_id} or projects/{project_id}. If specified location and location of the destination bigquery dataset do not match - the request will fail. This method takes only the form `projects/{projectsId}/locations/{locationsId}` (from its `flatPath`); for `projects/{projectsId}`, use `bigquerydatatransfer.projects.transferConfigs.create`. |
| `authorizationCode` | query | string | no | Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `versionInfo` instead. (Shortened from the Discovery document: the former authorization-code procedure is omitted; see Notes.) |
| `serviceAccountName` | query | string | no | Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about using service accounts (https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). |
| `versionInfo` | query | string | conditional | Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' \*or\* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes \* The client_id is the OAuth client_id of the data source as returned by ListDataSources method. \* data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config. |

### `bigquerydatatransfer.projects.locations.transferConfigs.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource to delete. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.delete`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.delete`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.delete`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.get`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BigQuery project id for which transfer configs should be returned. If you are using the regionless method, the location must be `US` and `parent` should be in the following form: \* `projects/{project_id}` If you are using the regionalized method, `parent` should be in the following form: \* `projects/{project_id}/locations/{location_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}` (from its `flatPath`); for `projects/{projectsId}`, use `bigquerydatatransfer.projects.transferConfigs.list`. |
| `dataSourceIds` | query | repeated string | no | When specified, only configurations of requested data sources are returned. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListTransfersRequest` list results. For multiple-page results, `ListTransfersResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListTransferConfigsResponse`); pass its value as `pageToken`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the existing transfer config to update; this route takes `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` (from its path pattern), where `config_id` is usually a UUID, even though it is not guaranteed or required. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `authorizationCode` | query | string | no | Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `versionInfo` instead. (Shortened from the Discovery document: the former authorization-code procedure is omitted; see Notes.) |
| `serviceAccountName` | query | string | no | Optional service account email. The transfer config runs with this service account's credentials (the `create` description says the config "will be created with this service account's credentials"; the `versionInfo` description of this method says it should not be set "when `service_account_name` is used to update the transfer config"). This account is not the credential that authenticates the PATCH request: the caller authenticates with its own OAuth 2.0 access token and must have permission to act as this service account (`iam.serviceAccounts.actAs`, in the Service Account User role `roles/iam.serviceAccountUser` granted on that service account; see `references/data-transfer-scheduled-queries/scheduling-queries.md`). Not all data sources support service account credentials; for the latest list, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). With the `bq` tool, `bq update --transfer_config` applies `--service_account_name` only together with `--update_credentials`. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Required list of fields to be updated in this request. |
| `versionInfo` | query | string | conditional | Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' \*or\* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes \* The client_id is the OAuth client_id of the data source as returned by ListDataSources method. \* data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to update the transfer config. |

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.delete`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.delete`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.delete`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.get`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of transfer configuration for which transfer runs should be retrieved. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.list`. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListTransferRunsRequest` list results. For multiple-page results, `ListTransferRunsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListTransferRunsResponse`); pass its value as `pageToken`. |
| `runAttempt` | query | string enum | no | Indicates how run attempts are to be pulled. Values: `RUN_ATTEMPT_UNSPECIFIED`, `LATEST`. |
| `states` | query | repeated string enum | no | When specified, only transfer runs with requested states are returned. Values: `TRANSFER_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELLED`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.runs.transferLogs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Transfer run name. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}` (from its `flatPath`); for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.transferLogs.list`. |
| `messageTypes` | query | repeated string enum | no | Message types to return. If not populated - INFO, WARNING and ERROR messages are returned. Values: `MESSAGE_SEVERITY_UNSPECIFIED`, `INFO`, `WARNING`, `ERROR`. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListTransferLogsRequest` list results. For multiple-page results, `ListTransferLogsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListTransferLogsResponse`); pass its value as `pageToken`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.scheduleRuns` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.scheduleRuns`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.startManualRuns` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.startManualRuns`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the transfer resource in the form of: \* `projects/{project}/transferConfigs/{transfer_config}/transferResources/{transfer_resource}` \* `projects/{project}/locations/{location}/transferConfigs/{transfer_config}/transferResources/{transfer_resource}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.get`. |

### `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of transfer configuration for which transfer resources should be retrieved. The name should be in one of the following forms: \* `projects/{project}/transferConfigs/{transfer_config}` \* `projects/{project}/locations/{location_id}/transferConfigs/{transfer_config}` This method takes only the form `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.list`. |
| `filter` | query | string | no | Optional. Filter for the transfer resources. Currently supported filters include: \* Resource name: `name` - Wildcard supported \* Resource type: `type` \* Resource destination: `destination` \* Latest resource state: `latest_status_detail.state` \* Last update time: `update_time` - RFC-3339 format \* Parent table name: `hierarchy_detail.partition_detail.table` Multiple filters can be applied using the `AND/OR` operator. Examples: \* `name="*123" AND (type="TABLE" OR latest_status_detail.state="SUCCEEDED")` \* `update_time >= "2012-04-21T11:30:00-04:00"` \* `hierarchy_detail.partition_detail.table = "table1"` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of transfer resources to return. The maximum value is 1000; values above 1000 will be coerced to 1000. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTransferResources` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTransferResources` must match the call that provided the page token. |

### `bigquerydatatransfer.projects.locations.unenrollDataSources` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project and location resource in the form: `projects/{project_id}/locations/{location_id}` (from the path pattern `^projects/[^/]+/locations/[^/]+$`). (Corrected from the Discovery document; the original description is quoted in Notes.) |

### `bigquerydatatransfer.projects.transferConfigs.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BigQuery project id where the transfer configuration should be created. Must be in the format projects/{project_id}/locations/{location_id} or projects/{project_id}. If specified location and location of the destination bigquery dataset do not match - the request will fail. This method takes only the form `projects/{projectsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.create`. |
| `authorizationCode` | query | string | no | Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `versionInfo` instead. (Shortened from the Discovery document: the former authorization-code procedure is omitted; see Notes.) |
| `serviceAccountName` | query | string | no | Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about using service accounts (https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). |
| `versionInfo` | query | string | conditional | Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' \*or\* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes \* The client_id is the OAuth client_id of the data source as returned by ListDataSources method. \* data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config. |

### `bigquerydatatransfer.projects.transferConfigs.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource to delete. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.delete`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.delete`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.delete`. |

### `bigquerydatatransfer.projects.transferConfigs.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.get`. |

### `bigquerydatatransfer.projects.transferConfigs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BigQuery project id for which transfer configs should be returned. If you are using the regionless method, the location must be `US` and `parent` should be in the following form: \* `projects/{project_id}` If you are using the regionalized method, `parent` should be in the following form: \* `projects/{project_id}/locations/{location_id}` This method takes only the form `projects/{projectsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.list`. |
| `dataSourceIds` | query | repeated string | no | When specified, only configurations of requested data sources are returned. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListTransfersRequest` list results. For multiple-page results, `ListTransfersResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListTransferConfigsResponse`); pass its value as `pageToken`. |

### `bigquerydatatransfer.projects.transferConfigs.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the existing transfer config to update; this route takes `projects/{project_id}/transferConfigs/{config_id}` (from its path pattern), where `config_id` is usually a UUID, even though it is not guaranteed or required. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `authorizationCode` | query | string | no | Deprecated: Authorization code was required when `transferConfig.dataSourceId` is 'youtube_channel' but it is no longer used in any data sources. Use `versionInfo` instead. (Shortened from the Discovery document: the former authorization-code procedure is omitted; see Notes.) |
| `serviceAccountName` | query | string | no | Optional service account email. The transfer config runs with this service account's credentials (the `create` description says the config "will be created with this service account's credentials"; the `versionInfo` description of this method says it should not be set "when `service_account_name` is used to update the transfer config"). This account is not the credential that authenticates the PATCH request: the caller authenticates with its own OAuth 2.0 access token and must have permission to act as this service account (`iam.serviceAccounts.actAs`, in the Service Account User role `roles/iam.serviceAccountUser` granted on that service account; see `references/data-transfer-scheduled-queries/scheduling-queries.md`). Not all data sources support service account credentials; for the latest list, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts). With the `bq` tool, `bq update --transfer_config` applies `--service_account_name` only together with `--update_credentials`. (Corrected from the Discovery document; the original description is quoted in Notes.) |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Required list of fields to be updated in this request. |
| `versionInfo` | query | string | conditional | Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' \*or\* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes \* The client_id is the OAuth client_id of the data source as returned by ListDataSources method. \* data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to update the transfer config. |

### `bigquerydatatransfer.projects.transferConfigs.runs.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.delete`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.delete`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.delete`. |

### `bigquerydatatransfer.projects.transferConfigs.runs.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource requested. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.transferConfigs.transferResources.get`. |

### `bigquerydatatransfer.projects.transferConfigs.runs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of transfer configuration for which transfer runs should be retrieved. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.list`. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListTransferRunsRequest` list results. For multiple-page results, `ListTransferRunsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListTransferRunsResponse`); pass its value as `pageToken`. |
| `runAttempt` | query | string enum | no | Indicates how run attempts are to be pulled. Values: `RUN_ATTEMPT_UNSPECIFIED`, `LATEST`. |
| `states` | query | repeated string enum | no | When specified, only transfer runs with requested states are returned. Values: `TRANSFER_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELLED`. |

### `bigquerydatatransfer.projects.transferConfigs.runs.transferLogs.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Transfer run name. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.transferLogs.list`. |
| `messageTypes` | query | repeated string enum | no | Message types to return. If not populated - INFO, WARNING and ERROR messages are returned. Values: `MESSAGE_SEVERITY_UNSPECIFIED`, `INFO`, `WARNING`, `ERROR`. |
| `pageSize` | query | integer (int32) | no | Page size. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Pagination token, which can be used to request a specific page of `ListTransferLogsRequest` list results. For multiple-page results, `ListTransferLogsResponse` outputs a `next_page` token, which can be used as the `page_token` value to request the next page of list results. In the REST JSON response the field is `nextPageToken` (`ListTransferLogsResponse`); pass its value as `pageToken`. |

### `bigquerydatatransfer.projects.transferConfigs.scheduleRuns` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.scheduleRuns`. |

### `bigquerydatatransfer.projects.transferConfigs.startManualRuns` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Transfer configuration name. If you are using the regionless method, the location must be `US` and the name should be in the following form: \* `projects/{project_id}/transferConfigs/{config_id}` If you are using the regionalized method, the name should be in the following form: \* `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.startManualRuns`. |

### `bigquerydatatransfer.projects.transferConfigs.transferResources.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the transfer resource in the form of: \* `projects/{project}/transferConfigs/{transfer_config}/transferResources/{transfer_resource}` \* `projects/{project}/locations/{location}/transferConfigs/{transfer_config}/transferResources/{transfer_resource}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}` (from its `flatPath`); for `projects/{projectsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}/dataSources/{dataSourcesId}`, use `bigquerydatatransfer.projects.locations.dataSources.get`; for `projects/{projectsId}/locations/{locationsId}`, use `bigquerydatatransfer.projects.locations.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.runs.get`; for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}/transferResources/{transferResourcesId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.transferConfigs.get`; for `projects/{projectsId}/transferConfigs/{transferConfigsId}/runs/{runsId}`, use `bigquerydatatransfer.projects.transferConfigs.runs.get`. |

### `bigquerydatatransfer.projects.transferConfigs.transferResources.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of transfer configuration for which transfer resources should be retrieved. The name should be in one of the following forms: \* `projects/{project}/transferConfigs/{transfer_config}` \* `projects/{project}/locations/{location_id}/transferConfigs/{transfer_config}` This method takes only the form `projects/{projectsId}/transferConfigs/{transferConfigsId}` (from its `flatPath`); for `projects/{projectsId}/locations/{locationsId}/transferConfigs/{transferConfigsId}`, use `bigquerydatatransfer.projects.locations.transferConfigs.transferResources.list`. |
| `filter` | query | string | no | Optional. Filter for the transfer resources. Currently supported filters include: \* Resource name: `name` - Wildcard supported \* Resource type: `type` \* Resource destination: `destination` \* Latest resource state: `latest_status_detail.state` \* Last update time: `update_time` - RFC-3339 format \* Parent table name: `hierarchy_detail.partition_detail.table` Multiple filters can be applied using the `AND/OR` operator. Examples: \* `name="*123" AND (type="TABLE" OR latest_status_detail.state="SUCCEEDED")` \* `update_time >= "2012-04-21T11:30:00-04:00"` \* `hierarchy_detail.partition_detail.table = "table1"` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of transfer resources to return. The maximum value is 1000; values above 1000 will be coerced to 1000. The default page size is the maximum value of 1000 results. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTransferResources` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTransferResources` must match the call that provided the page token. |

## Notes

- Generated from the Discovery document(s) v1 of `bigquerydatatransfer` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when the description says that some requests must specify it (for example, `options.requestedPolicyVersion` must be 3 to get a policy with conditional role bindings). Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `bigquerydatatransfer.projects.locations.transferConfigs.scheduleRuns`, `bigquerydatatransfer.projects.transferConfigs.scheduleRuns`. Avoid them in new code.
- Corrected from the Discovery document: the description of `name` in `bigquerydatatransfer.projects.locations.enrollDataSources` gives the resource name format `projects/{project_id}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `bigquerydatatransfer.projects.locations.unenrollDataSources` gives the resource name format `projects/{project_id}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+$`; a value must match the pattern to reach the route.
- Regional endpoints: the Discovery document (`bigquerydatatransfer` v1, revision 20261024) also lists 25 endpoints of the form `https://bigquerydatatransfer.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `asia-south2`, `europe-west1`, `europe-west10`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central2`, `northamerica-northeast1`, `northamerica-northeast2`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://bigquerydatatransfer.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://bigquerydatatransfer.asia-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the Discovery document: the `serviceAccountName` description of `transferConfigs.patch` is the text of `create`, "If this field is set, the transfer config will be created with this service account's credentials. ... Note that not all data sources support service account credentials when creating a transfer config."; the same text is in the proto (`UpdateTransferConfigRequest.service_account_name`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/datatransfer/v1/datatransfer.proto, commit `5ce0245`, retrieved 2026-11-19). Neither source states further how an update applies the service account credentials; the table quotes the `versionInfo` note of the same request and the `bq update` flag rule of the scheduled-queries guide.
- Corrected from the Discovery document: the `name` description of `transferConfigs.patch` is the field description of `TransferConfig.name`, "Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config."; in this method it is the required path variable that names the transfer config to update, so the table gives the form of each route and omits the create-only sentence.
- Shortened from the Discovery document: after "Use `version_info` instead.", the `authorizationCode` description of `transferConfigs.create` and `.patch` goes on to describe the former OAuth authorization-code procedure (when it was required and a URL to obtain the code); the table omits it because the description itself says the parameter is no longer used in any data sources. `version_info` is the proto field name; the REST query parameter is `versionInfo`.
- Corrected from the Discovery document: the `name` description of `bigquerydatatransfer.projects.locations.enrollDataSources` and `.unenrollDataSources` reads "Required. The name of the project resource in the form: `projects/{project_id}`", the same as the regionless `bigquerydatatransfer.projects.enrollDataSources`; their path pattern is `^projects/[^/]+/locations/[^/]+$`, so the table shows the form with the location.
- Corrected from the Discovery document: the `parent` descriptions of `bigquerydatatransfer.projects.transferConfigs.list` and `bigquerydatatransfer.projects.locations.transferConfigs.list` do not close the code span after `projects/{project_id}` (the original continues "If you are using the regionalized method" inside the span); this page adds the closing backtick.
- Source: https://bigquerydatatransfer.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
