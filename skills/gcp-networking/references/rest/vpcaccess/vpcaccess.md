---
source: https://vpcaccess.googleapis.com/$discovery/rest?version=v1
---

# Serverless VPC Access API REST API (vpcaccess)

## Signature / Usage

Base URL: `https://vpcaccess.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `vpcaccess.projects.locations.connectors.create`

- Versions: v1, v1beta1
- `POST https://vpcaccess.googleapis.com/v1/{+parent}/connectors`
- Creates a Serverless VPC Access connector, returns an operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connector`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project ID and location in which the configuration should be created, specified in the format `projects/*/locations/*`. |
| `connectorId` | query | string | yes | Required. The ID to use for this connector. |

### `vpcaccess.projects.locations.connectors.delete`

- Versions: v1, v1beta1
- `DELETE https://vpcaccess.googleapis.com/v1/{+name}`
- Deletes a Serverless VPC Access connector. Returns NOT_FOUND if the resource does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of a Serverless VPC Access connector to delete. |

### `vpcaccess.projects.locations.connectors.get`

- Versions: v1, v1beta1
- `GET https://vpcaccess.googleapis.com/v1/{+name}`
- Gets a Serverless VPC Access connector. Returns NOT_FOUND if the resource does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of a Serverless VPC Access connector to get. |

### `vpcaccess.projects.locations.connectors.list`

- Versions: v1, v1beta1
- `GET https://vpcaccess.googleapis.com/v1/{+parent}/connectors`
- Lists Serverless VPC Access connectors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the routes should be listed. |
| `pageSize` | query | integer (int32) | no | Maximum number of functions to return per call. |
| `pageToken` | query | string | no | Continuation token. |

### `vpcaccess.projects.locations.connectors.patch`

- Versions: v1, v1beta1
- `PATCH https://vpcaccess.googleapis.com/v1/{+name}`
- Updates a Serverless VPC Access connector, returns an operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connector`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name in the format `projects/*/locations/*/connectors/*`. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to update on the entry group. If absent or empty, all modifiable fields are updated. |

### `vpcaccess.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://vpcaccess.googleapis.com/v1/{+name}/locations`
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

### `vpcaccess.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://vpcaccess.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `vpcaccess.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://vpcaccess.googleapis.com/v1/{+name}/operations`
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

### Example request skeleton

Generated from the Discovery entry of `vpcaccess.projects.locations.connectors.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://vpcaccess.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `vpcaccess` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/vpcaccess/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://vpcaccess.googleapis.com/$discovery/rest?version=v1, https://vpcaccess.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
