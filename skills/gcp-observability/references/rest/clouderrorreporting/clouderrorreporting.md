---
source: https://clouderrorreporting.googleapis.com/$discovery/rest?version=v1beta1
---

# Error Reporting API REST API (clouderrorreporting)

## Signature / Usage

Base URL: `https://clouderrorreporting.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1beta1).

### `clouderrorreporting.projects.deleteEvents`

- Versions: v1beta1
- `DELETE https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/events`
- Deletes all error events of a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DeleteEventsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectName` | path | string | yes | Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the Google Cloud Platform project ID (https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |

### `clouderrorreporting.projects.events.list`

- Versions: v1beta1
- `GET https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/events`
- Lists the specified events.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEventsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectName` | path | string | yes | Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the Google Cloud Platform project ID (https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |
| `groupId` | query | string | yes | Required. The group for which events shall be returned. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return per response. |
| `pageToken` | query | string | no | Optional. A `next_page_token` provided by a previous response. |
| `serviceFilter.resourceType` | query | string | no | Optional. The exact value to match against `ServiceContext.resource_type` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). |
| `serviceFilter.service` | query | string | no | Optional. The exact value to match against `ServiceContext.service` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). |
| `serviceFilter.version` | query | string | no | Optional. The exact value to match against `ServiceContext.version` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). |
| `timeRange.period` | query | string enum | no | Restricts the query to the specified time range. Values: `PERIOD_UNSPECIFIED`, `PERIOD_1_HOUR`, `PERIOD_6_HOURS`, `PERIOD_1_DAY`, `PERIOD_1_WEEK`, `PERIOD_30_DAYS`. |

### `clouderrorreporting.projects.events.report`

- Versions: v1beta1
- `POST https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/events:report`
- Report an individual error event and record the event to a log. This endpoint accepts \*\*either\*\* an OAuth token, \*\*or\*\* an API key (https://support.google.com/cloud/answer/6158862) for authentication. To use an API key, append it to the URL as the value of a `key` parameter. For example: `POST https://clouderrorreporting.googleapis.com/v1beta1/{projectName}/events:report?key=123ABC456` \*\*Note:\*\* \[Error Reporting\] (https://cloud.google.com/error-reporting) is a service built on Cloud Logging and can analyze log entries when all of the following are true: \* Customer-managed encryption keys (CMEK) are disabled on the log bucket. \* The log bucket satisfies one of the following: \* The log bucket is stored in the same project where the logs originated. \* The logs were routed to a project, and then that project stored those logs in a log bucket that it owns.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReportedErrorEvent`; Response: `ReportErrorEventResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectName` | path | string | yes | Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectId}`, where `{projectId}` is the Google Cloud Platform project ID (https://support.google.com/cloud/answer/6158840). Example: // `projects/my-project-123`. |

### `clouderrorreporting.projects.groupStats.list`

- Versions: v1beta1
- `GET https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/groupStats`
- Lists the specified groups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGroupStatsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectName` | path | string | yes | Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectNumber}`, where `{projectID}` and `{projectNumber}` can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840). It may also include a location, such as `projects/{projectID}/locations/{location}` where `{location}` is a cloud region. Examples: `projects/my-project-123`, `projects/5551234`, `projects/my-project-123/locations/us-central1`, `projects/5551234/locations/us-central1`. For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. Use `-` as a wildcard to request group stats from all regions. |
| `alignment` | query | string enum | no | Optional. The alignment of the timed counts to be returned. Default is `ALIGNMENT_EQUAL_AT_END`. Values: `ERROR_COUNT_ALIGNMENT_UNSPECIFIED`, `ALIGNMENT_EQUAL_ROUNDED`, `ALIGNMENT_EQUAL_AT_END`. |
| `alignmentTime` | query | string (google-datetime) | no | Optional. Time where the timed counts shall be aligned if rounded alignment is chosen. Default is 00:00 UTC. |
| `groupId` | query | repeated string | no | Optional. List all ErrorGroupStats with these IDs. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see \[Google Cloud Privacy Notice\] (https://cloud.google.com/terms/cloud-privacy-notice). |
| `order` | query | string enum | no | Optional. The sort order in which the results are returned. Default is `COUNT_DESC`. Values: `GROUP_ORDER_UNSPECIFIED`, `COUNT_DESC`, `LAST_SEEN_DESC`, `CREATED_DESC`, `AFFECTED_USERS_DESC`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return per response. Default is 20. |
| `pageToken` | query | string | no | Optional. A next_page_token provided by a previous response. To view additional results, pass this token along with the identical query parameters as the first request. |
| `serviceFilter.resourceType` | query | string | no | Optional. The exact value to match against `ServiceContext.resource_type` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). |
| `serviceFilter.service` | query | string | no | Optional. The exact value to match against `ServiceContext.service` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). |
| `serviceFilter.version` | query | string | no | Optional. The exact value to match against `ServiceContext.version` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). |
| `timeRange.period` | query | string enum | no | Restricts the query to the specified time range. Values: `PERIOD_UNSPECIFIED`, `PERIOD_1_HOUR`, `PERIOD_6_HOURS`, `PERIOD_1_DAY`, `PERIOD_1_WEEK`, `PERIOD_30_DAYS`. |
| `timedCountDuration` | query | string (google-duration) | no | Optional. The preferred duration for a single returned TimedCount. If not set, no timed counts are returned. |

### `clouderrorreporting.projects.groups.get`

- Versions: v1beta1
- `GET https://clouderrorreporting.googleapis.com/v1beta1/{+groupName}`
- Get the specified group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ErrorGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `groupName` | path | string | yes | Required. The group resource name. Written as either `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}`. Call groupStats.list to return a list of groups belonging to this project. Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/global/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |

### `clouderrorreporting.projects.groups.update`

- Versions: v1beta1
- `PUT https://clouderrorreporting.googleapis.com/v1beta1/{+name}`
- Replace the data for the specified group. Fails if the group does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ErrorGroup`; Response: `ErrorGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The group resource name. Written as `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}` Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/us-central1/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |

### `clouderrorreporting.projects.locations.deleteEvents`

- Versions: v1beta1
- `DELETE https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/events`
- Deletes all error events of a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DeleteEventsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectName` | path | string | yes | Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the Google Cloud Platform project ID (https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |

### `clouderrorreporting.projects.locations.events.list`

- Versions: v1beta1
- `GET https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/events`
- Lists the specified events.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEventsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectName` | path | string | yes | Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the Google Cloud Platform project ID (https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |
| `groupId` | query | string | yes | Required. The group for which events shall be returned. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return per response. |
| `pageToken` | query | string | no | Optional. A `next_page_token` provided by a previous response. |
| `serviceFilter.resourceType` | query | string | no | Optional. The exact value to match against `ServiceContext.resource_type` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). |
| `serviceFilter.service` | query | string | no | Optional. The exact value to match against `ServiceContext.service` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). |
| `serviceFilter.version` | query | string | no | Optional. The exact value to match against `ServiceContext.version` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). |
| `timeRange.period` | query | string enum | no | Restricts the query to the specified time range. Values: `PERIOD_UNSPECIFIED`, `PERIOD_1_HOUR`, `PERIOD_6_HOURS`, `PERIOD_1_DAY`, `PERIOD_1_WEEK`, `PERIOD_30_DAYS`. |

### `clouderrorreporting.projects.locations.groupStats.list`

- Versions: v1beta1
- `GET https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/groupStats`
- Lists the specified groups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGroupStatsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectName` | path | string | yes | Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectNumber}`, where `{projectID}` and `{projectNumber}` can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840). It may also include a location, such as `projects/{projectID}/locations/{location}` where `{location}` is a cloud region. Examples: `projects/my-project-123`, `projects/5551234`, `projects/my-project-123/locations/us-central1`, `projects/5551234/locations/us-central1`. For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. Use `-` as a wildcard to request group stats from all regions. |
| `alignment` | query | string enum | no | Optional. The alignment of the timed counts to be returned. Default is `ALIGNMENT_EQUAL_AT_END`. Values: `ERROR_COUNT_ALIGNMENT_UNSPECIFIED`, `ALIGNMENT_EQUAL_ROUNDED`, `ALIGNMENT_EQUAL_AT_END`. |
| `alignmentTime` | query | string (google-datetime) | no | Optional. Time where the timed counts shall be aligned if rounded alignment is chosen. Default is 00:00 UTC. |
| `groupId` | query | repeated string | no | Optional. List all ErrorGroupStats with these IDs. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see \[Google Cloud Privacy Notice\] (https://cloud.google.com/terms/cloud-privacy-notice). |
| `order` | query | string enum | no | Optional. The sort order in which the results are returned. Default is `COUNT_DESC`. Values: `GROUP_ORDER_UNSPECIFIED`, `COUNT_DESC`, `LAST_SEEN_DESC`, `CREATED_DESC`, `AFFECTED_USERS_DESC`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return per response. Default is 20. |
| `pageToken` | query | string | no | Optional. A next_page_token provided by a previous response. To view additional results, pass this token along with the identical query parameters as the first request. |
| `serviceFilter.resourceType` | query | string | no | Optional. The exact value to match against `ServiceContext.resource_type` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). |
| `serviceFilter.service` | query | string | no | Optional. The exact value to match against `ServiceContext.service` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). |
| `serviceFilter.version` | query | string | no | Optional. The exact value to match against `ServiceContext.version` (https://cloud.google.com/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). |
| `timeRange.period` | query | string enum | no | Restricts the query to the specified time range. Values: `PERIOD_UNSPECIFIED`, `PERIOD_1_HOUR`, `PERIOD_6_HOURS`, `PERIOD_1_DAY`, `PERIOD_1_WEEK`, `PERIOD_30_DAYS`. |
| `timedCountDuration` | query | string (google-duration) | no | Optional. The preferred duration for a single returned TimedCount. If not set, no timed counts are returned. |

### `clouderrorreporting.projects.locations.groups.get`

- Versions: v1beta1
- `GET https://clouderrorreporting.googleapis.com/v1beta1/{+groupName}`
- Get the specified group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ErrorGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `groupName` | path | string | yes | Required. The group resource name. Written as either `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}`. Call groupStats.list to return a list of groups belonging to this project. Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/global/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |

### `clouderrorreporting.projects.locations.groups.update`

- Versions: v1beta1
- `PUT https://clouderrorreporting.googleapis.com/v1beta1/{+name}`
- Replace the data for the specified group. Fails if the group does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ErrorGroup`; Response: `ErrorGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The group resource name. Written as `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}` Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/us-central1/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |

### Example request skeleton

Generated from the Discovery entry of `clouderrorreporting.projects.events.list` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://clouderrorreporting.googleapis.com/v1beta1/{+projectName}/events?groupId={groupId}"
```

## Notes

- Generated from the Discovery document(s) v1beta1 of `clouderrorreporting` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/clouderrorreporting/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`clouderrorreporting` v1beta1, revision 20260814) also lists 44 endpoints of the form `https://clouderrorreporting.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://clouderrorreporting.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://clouderrorreporting.us.rep.googleapis.com/`) and keep the path.
- Source: https://clouderrorreporting.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
