---
source: https://cloudlocationfinder.googleapis.com/$discovery/rest?version=v1
---

# Cloud Location Finder API REST API (cloudlocationfinder)

## Signature / Usage

Base URL: `https://cloudlocationfinder.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudlocationfinder.projects.locations.cloudLocations.get`

- Versions: v1, v1alpha
- `GET https://cloudlocationfinder.googleapis.com/v1/{+name}`
- Retrieves a resource containing information about a cloud location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CloudLocation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `cloudlocationfinder.projects.locations.cloudLocations.list`

- Versions: v1, v1alpha
- `GET https://cloudlocationfinder.googleapis.com/v1/{+parent}/cloudLocations`
- Lists cloud locations under a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCloudLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of cloud locations. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters resources listed in the response. The expression is in the form of field=value. For example, 'cloud_location_type=CLOUD_LOCATION_TYPE_REGION'. Multiple filter queries are space-separated. For example, 'cloud_location_type=CLOUD_LOCATION_TYPE_REGION territory_code="US"' By default, each expression is an AND expression. However, you can include AND and OR expressions explicitly. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of cloud locations to return per page. The service might return fewer cloud locations than this value. If unspecified, at most 500 cloud locations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. Provide page token returned by a previous 'ListCloudLocations' call to retrieve the next page of results. When paginating, all other parameters provided to 'ListCloudLocations' must match the call that provided the page token. |

### `cloudlocationfinder.projects.locations.cloudLocations.search`

- Versions: v1, v1alpha
- `GET https://cloudlocationfinder.googleapis.com/v1/{+parent}/cloudLocations:search`
- Searches for cloud locations from a given source location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchCloudLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of cloud locations. Format: projects/{project}/locations/{location} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of cloud locations to return. The service might return fewer cloud locations than this value. If unspecified, at most 500 cloud locations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. Provide Page token returned by a previous 'ListCloudLocations' call to retrieve the next page of results. When paginating, all other parameters provided to 'ListCloudLocations' must match the call that provided the page token. |
| `query` | query | string | no | Optional. The query string in search query syntax. While filter is used to filter the search results by attributes, query is used to specify the search requirements. |
| `sourceCloudLocation` | query | string | yes | Required. The source cloud location to search from. Example search can be searching nearby cloud locations from the source cloud location by latency. |

### `cloudlocationfinder.projects.locations.get`

- Versions: v1, v1alpha
- `GET https://cloudlocationfinder.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `cloudlocationfinder.projects.locations.list`

- Versions: v1, v1alpha
- `GET https://cloudlocationfinder.googleapis.com/v1/{+name}/locations`
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

### Example request skeleton

Generated from the Discovery entry of `cloudlocationfinder.projects.locations.cloudLocations.get` (not in the official docs); replace the `{...}` path variables:

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudlocationfinder.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `cloudlocationfinder` (retrieved 2026-11-14). Resources on this page: projects.
- Message schemas are listed under `references/rest-schemas/cloudlocationfinder/`.
- Source: https://cloudlocationfinder.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
