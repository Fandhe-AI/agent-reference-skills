---
source: https://parametermanager.googleapis.com/$discovery/rest?version=v1
---

# Parameter Manager API REST API (parametermanager)

## Signature / Usage

Base URL: `https://parametermanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `parametermanager.projects.locations.get`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `parametermanager.projects.locations.list`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}/locations`
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

### `parametermanager.projects.locations.parameters.create`

- Versions: v1
- `POST https://parametermanager.googleapis.com/v1/{+parent}/parameters`
- Creates a new Parameter in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Parameter`; Response: `Parameter`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent in the format `projects/*/locations/*`. |
| `parameterId` | query | string | yes | Required. Id of the Parameter resource |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `parametermanager.projects.locations.parameters.delete`

- Versions: v1
- `DELETE https://parametermanager.googleapis.com/v1/{+name}`
- Deletes a single Parameter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/parameters/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `parametermanager.projects.locations.parameters.get`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}`
- Gets details of a single Parameter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Parameter`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/parameters/*`. |

### `parametermanager.projects.locations.parameters.list`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+parent}/parameters`
- Lists Parameters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListParametersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListParametersRequest in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListParameters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListParameters` must match the call that provided the page token. |

### `parametermanager.projects.locations.parameters.patch`

- Versions: v1
- `PATCH https://parametermanager.googleapis.com/v1/{+name}`
- Updates a single Parameter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Parameter`; Response: `Parameter`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the Parameter in the format `projects/*/locations/*/parameters/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Parameter resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A mutable field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. |

### `parametermanager.projects.locations.parameters.versions.create`

- Versions: v1
- `POST https://parametermanager.googleapis.com/v1/{+parent}/versions`
- Creates a new ParameterVersion in a given project, location, and parameter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ParameterVersion`; Response: `ParameterVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent in the format `projects/*/locations/*/parameters/*`. |
| `parameterVersionId` | query | string | yes | Required. Id of the ParameterVersion resource |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `parametermanager.projects.locations.parameters.versions.delete`

- Versions: v1
- `DELETE https://parametermanager.googleapis.com/v1/{+name}`
- Deletes a single ParameterVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/parameters/*/versions/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `parametermanager.projects.locations.parameters.versions.get`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}`
- Gets details of a single ParameterVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ParameterVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/parameters/*/versions/*`. |
| `view` | query | string enum | no | Optional. View of the ParameterVersion. In the default FULL view, all metadata & payload associated with the ParameterVersion will be returned. Values: `VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `parametermanager.projects.locations.parameters.versions.list`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+parent}/versions`
- Lists ParameterVersions in a given project, location, and parameter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListParameterVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListParameterVersionsRequest in the format `projects/*/locations/*/parameters/*`. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListParameterVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListParameterVersions` must match the call that provided the page token. |

### `parametermanager.projects.locations.parameters.versions.patch`

- Versions: v1
- `PATCH https://parametermanager.googleapis.com/v1/{+name}`
- Updates a single ParameterVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ParameterVersion`; Response: `ParameterVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the ParameterVersion in the format `projects/*/locations/*/parameters/*/versions/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ParameterVersion resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A mutable field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. |

### `parametermanager.projects.locations.parameters.versions.render`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}:render`
- Gets rendered version of a ParameterVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RenderParameterVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |

### `parametermanager.projects.locations.templates.create`

- Versions: v1
- `POST https://parametermanager.googleapis.com/v1/{+parent}/templates`
- Creates a new Template in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Template`; Response: `Template`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent in the format `projects/*/locations/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `templateId` | query | string | yes | Required. Id of the Template resource |

### `parametermanager.projects.locations.templates.delete`

- Versions: v1
- `DELETE https://parametermanager.googleapis.com/v1/{+name}`
- Deletes a single Template.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/templates/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `parametermanager.projects.locations.templates.get`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}`
- Gets details of a single Template.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Template`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/templates/*`. |

### `parametermanager.projects.locations.templates.list`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+parent}/templates`
- Lists Templates in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListTemplatesRequest in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTemplates` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTemplates` must match the call that provided the page token. |

### `parametermanager.projects.locations.templates.patch`

- Versions: v1
- `PATCH https://parametermanager.googleapis.com/v1/{+name}`
- Updates a single Template.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Template`; Response: `Template`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the Template in the format `projects/*/locations/*/templates/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Template resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A mutable field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. |

### `parametermanager.projects.locations.templates.versions.create`

- Versions: v1
- `POST https://parametermanager.googleapis.com/v1/{+parent}/versions`
- Creates a new TemplateVersion in a given project, location, and template.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TemplateVersion`; Response: `TemplateVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent in the format `projects/*/locations/*/templates/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `templateVersionId` | query | string | yes | Required. Id of the TemplateVersion resource |

### `parametermanager.projects.locations.templates.versions.delete`

- Versions: v1
- `DELETE https://parametermanager.googleapis.com/v1/{+name}`
- Deletes a single TemplateVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/templates/*/versions/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `parametermanager.projects.locations.templates.versions.get`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}`
- Gets details of a single TemplateVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TemplateVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource in the format `projects/*/locations/*/templates/*/versions/*`. |
| `view` | query | string enum | no | Optional. Specifies the view of the TemplateVersion to return. In the default FULL view, all metadata & payload associated with the TemplateVersion will be returned. Values: `VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `parametermanager.projects.locations.templates.versions.list`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+parent}/versions`
- Lists TemplateVersions in a given project, location, and template.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTemplateVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListTemplateVersionsRequest in the format `projects/*/locations/*/templates/*`. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListTemplateVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTemplateVersions` must match the call that provided the page token. |

### `parametermanager.projects.locations.templates.versions.patch`

- Versions: v1
- `PATCH https://parametermanager.googleapis.com/v1/{+name}`
- Updates a single TemplateVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TemplateVersion`; Response: `TemplateVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the TemplateVersion in the format `projects/*/locations/*/templates/*/versions/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the TemplateVersion resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A mutable field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. |

### `parametermanager.projects.locations.templates.versions.render`

- Versions: v1
- `GET https://parametermanager.googleapis.com/v1/{+name}:render`
- Gets rendered version of a TemplateVersion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RenderTemplateVersionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `parameterVersion` | query | string | yes | Required. Parameter version used to render the template version. |

### Example request skeleton

Generated from the Discovery entry of `parametermanager.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://parametermanager.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `parametermanager` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://parametermanager.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
