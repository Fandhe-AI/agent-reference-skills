---
source: https://databasecenter.googleapis.com/$discovery/rest?version=v1beta
---

# Database Center API REST API (databasecenter)

## Signature / Usage

Base URL: `https://databasecenter.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1beta).

### `databasecenter.folders.aggregateQueryStats`

- Versions: v1beta
- `POST https://databasecenter.googleapis.com/v1beta/{+parent}:aggregateQueryStats`
- AggregateQueryStats provides database resource query execution statistics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AggregateQueryStatsRequest`; Response: `AggregateQueryStatsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent can be a project, a folder, or an organization. The search is limited to the resources within the `parent`. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1… |

### `databasecenter.organizations.aggregateQueryStats`

- Versions: v1beta
- `POST https://databasecenter.googleapis.com/v1beta/{+parent}:aggregateQueryStats`
- AggregateQueryStats provides database resource query execution statistics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AggregateQueryStatsRequest`; Response: `AggregateQueryStatsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent can be a project, a folder, or an organization. The search is limited to the resources within the `parent`. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1… |

### `databasecenter.projects.aggregateQueryStats`

- Versions: v1beta
- `POST https://databasecenter.googleapis.com/v1beta/{+parent}:aggregateQueryStats`
- AggregateQueryStats provides database resource query execution statistics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AggregateQueryStatsRequest`; Response: `AggregateQueryStatsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent can be a project, a folder, or an organization. The search is limited to the resources within the `parent`. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1… |

### `databasecenter.aggregateFleet`

- Versions: v1beta
- `GET https://databasecenter.googleapis.com/v1beta:aggregateFleet`
- AggregateFleet provides statistics about the fleet grouped by various fields.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AggregateFleetResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `baselineDate.day` | query | integer (int32) | no | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `baselineDate.month` | query | integer (int32) | no | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `baselineDate.year` | query | integer (int32) | no | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |
| `filter` | query | string | no | Optional. The expression to filter resources. Supported fields are: `full_resource_name`, `resource_type`, `container`, `product.type`, `product.engine`, `product.version`, `location`, `labels`, `issues`, fields of availability_info, data_protection_info, 'resource_name', etc. The expression is a l… |
| `groupBy` | query | string | no | Optional. A field that statistics are grouped by. Valid values are any combination of the following: \* container \* product.type \* product.engine \* product.version \* location \* sub_resource_type \* management_type \* tag.key \* tag.value \* tag.source \* tag.inherited \* label.key \* label.value \* label.so… |
| `orderBy` | query | string | no | Optional. Valid values to order by are: \* resource_groups_count \* resources_count \* and all fields supported by `group_by` The default order is ascending. Add "DESC" after the field name to indicate descending order. Add "ASC" after the field name to indicate ascending order. It supports ordering u… |
| `pageSize` | query | integer (int32) | no | Optional. If unspecified, at most 50 items will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `AggregateFleet` call. Provide this to retrieve the subsequent page. All other parameters should match the parameters in the call that provided the page token except for page_size which can be different. |
| `parent` | query | string | no | Required. Parent can be a project, a folder, or an organization. The search is limited to the resources within the `scope`. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/12… |

### `databasecenter.aggregateIssueStats`

- Versions: v1beta
- `POST https://databasecenter.googleapis.com/v1beta:aggregateIssueStats`
- AggregateIssueStats provides database resource issues statistics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AggregateIssueStatsRequest`; Response: `AggregateIssueStatsResponse`

### `databasecenter.queryDatabaseResourceGroups`

- Versions: v1beta
- `POST https://databasecenter.googleapis.com/v1beta:queryDatabaseResourceGroups`
- QueryDatabaseResourceGroups returns paginated results of database groups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `QueryDatabaseResourceGroupsRequest`; Response: `QueryDatabaseResourceGroupsResponse`

### `databasecenter.queryIssues`

- Versions: v1beta
- `POST https://databasecenter.googleapis.com/v1beta:queryIssues`
- QueryIssues provides a list of issues and recommendations that a user has access to and that are within the requested scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `QueryIssuesRequest`; Response: `QueryIssuesResponse`

### `databasecenter.queryProducts`

- Versions: v1beta
- `GET https://databasecenter.googleapis.com/v1beta:queryProducts`
- QueryProducts provides a list of all possible products which can be used to filter database resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryProductsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. If unspecified, at most 50 products will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListLocations` call. Provide this to retrieve the subsequent page. All other parameters except page size should match the call that provided the page page token. |
| `parent` | query | string | no | Required. Parent can be a project, a folder, or an organization. The allowed values are: \* projects/{PROJECT_ID}/locations/{LOCATION} (e.g.,"projects/foo-bar/locations/us-central1") \* projects/{PROJECT_NUMBER}/locations/{LOCATION} (e.g.,"projects/12345678/locations/us-central1") \* folders/{FOLDER_N… |

## Notes

- Generated from the Discovery document(s) v1beta of `databasecenter` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects, v1beta.
- Message schemas are listed under `references/rest-schemas/databasecenter/`.
- Source: https://databasecenter.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
