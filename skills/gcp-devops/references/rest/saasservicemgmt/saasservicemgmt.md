---
source: https://saasservicemgmt.googleapis.com/$discovery/rest?version=v1
---

# App Lifecycle Manager API REST API (saasservicemgmt)

## Signature / Usage

Base URL: `https://saasservicemgmt.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `saasservicemgmt.projects.locations.flagAttributes.create`

- Versions: v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flagAttributes`
- Create a new flag attribute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `FlagAttribute`; Response: `FlagAttribute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag attribute. |
| `flagAttributeId` | query | string | yes | Required. The ID value for the new flag attribute. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagAttributes.delete`

- Versions: v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Delete a single flag attribute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the flag attribute. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the flag attribute. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagAttributes.get`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Retrieve a single flag attribute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `FlagAttribute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.flagAttributes.list`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flagAttributes`
- Retrieve a collection of flag attributes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListFlagAttributesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag attribute. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of flag attributes to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.flagAttributes.patch`

- Versions: v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Update a single flag attribute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `FlagAttribute`; Response: `FlagAttribute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flagAttributes/{flag_attribute_id}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the FlagAttribute resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the FlagAttribute will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagReleases.create`

- Versions: v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flagReleases`
- Create a new flag release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `FlagRelease`; Response: `FlagRelease`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag release. |
| `flagReleaseId` | query | string | yes | Required. The ID value for the new flag release. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagReleases.delete`

- Versions: v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Delete a single flag release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the flag release. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the flag release. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagReleases.get`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Retrieve a single flag release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `FlagRelease`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.flagReleases.list`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flagReleases`
- Retrieve a collection of flag releases.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListFlagReleasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag release. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of flag releases to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.flagReleases.patch`

- Versions: v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Update a single flag release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `FlagRelease`; Response: `FlagRelease`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flagReleases/{flag_release_id}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the FlagRelease resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the FlagRelease will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagRevisions.create`

- Versions: v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flagRevisions`
- Create a new flag revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `FlagRevision`; Response: `FlagRevision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag revision. |
| `flagRevisionId` | query | string | yes | Required. The ID value for the new flag revision. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagRevisions.delete`

- Versions: v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Delete a single flag revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the flag revision. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the flag revision. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flagRevisions.get`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Retrieve a single flag revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `FlagRevision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.flagRevisions.list`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flagRevisions`
- Retrieve a collection of flag revisions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListFlagRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag revision. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of flag revisions to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.flagRevisions.patch`

- Versions: v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Update a single flag revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `FlagRevision`; Response: `FlagRevision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flagRevisions/{flag_revision_id}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the FlagRevision resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the FlagRevision will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flags.create`

- Versions: v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flags`
- Create a new flag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Flag`; Response: `Flag`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag. |
| `flagId` | query | string | yes | Required. The ID value for the new flag. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flags.delete`

- Versions: v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Delete a single flag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the flag. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the flag. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.flags.get`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Retrieve a single flag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `Flag`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.flags.list`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/flags`
- Retrieve a collection of flags.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListFlagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the flag. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of flags to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.flags.patch`

- Versions: v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Update a single flag.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Flag`; Response: `Flag`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/flags/{flag_id}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the Flag resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Flag will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationLocation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `saasservicemgmt.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}/locations`
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

### `saasservicemgmt.projects.locations.releases.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/releases`
- Create a new release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Release`; Response: `Release`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the release. |
| `releaseId` | query | string | yes | Required. The ID value for the new release. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.releases.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the release. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the release. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.releases.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `Release`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.releases.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/releases`
- Retrieve a collection of releases.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListReleasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the release. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of releases to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.releases.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single release.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Release`; Response: `Release`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/releases/{release}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the Release resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Release will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.rolloutKinds.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/rolloutKinds`
- Create a new rollout kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `RolloutKind`; Response: `RolloutKind`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the rollout kind. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `rolloutKindId` | query | string | yes | Required. The ID value for the new rollout kind. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.rolloutKinds.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single rollout kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the rollout kind. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the rollout kind. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.rolloutKinds.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single rollout kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `RolloutKind`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.rolloutKinds.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/rolloutKinds`
- Retrieve a collection of rollout kinds.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListRolloutKindsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the rollout kind. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of rollout kinds to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.rolloutKinds.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single rollout kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `RolloutKind`; Response: `RolloutKind`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rolloutKinds/{rollout_kind_id}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the RolloutKind resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the RolloutKind will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.rollouts.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/rollouts`
- Create a new rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Rollout`; Response: `Rollout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the rollout. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `rolloutId` | query | string | yes | Required. The ID value for the new rollout. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.rollouts.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the rollout. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the rollout. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.rollouts.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `Rollout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.rollouts.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/rollouts`
- Retrieve a collection of rollouts.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListRolloutsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the rollout. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of rollouts to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.rollouts.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Rollout`; Response: `Rollout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/rollout/{rollout_id}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the Rollout resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Rollout will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.saas.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/saas`
- Create a new saas.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Saas`; Response: `Saas`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the saas. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `saasId` | query | string | yes | Required. The ID value for the new saas. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.saas.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single saas.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the saas. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the saas. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.saas.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single saas.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `Saas`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.saas.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/saas`
- Retrieve a collection of saas.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListSaasResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the saas. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of saas to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.saas.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single saas.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Saas`; Response: `Saas`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/saas/{saas}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the Saas resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Saas will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.tenants.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/tenants`
- Create a new tenant.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Tenant`; Response: `Tenant`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the tenant. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `tenantId` | query | string | yes | Required. The ID value for the new tenant. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.tenants.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single tenant.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the tenant. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the tenant. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.tenants.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single tenant.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `Tenant`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.tenants.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/tenants`
- Retrieve a collection of tenants.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListTenantsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the tenant. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of tenants to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.tenants.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single tenant.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Tenant`; Response: `Tenant`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/tenants/{tenant}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the Tenant resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Tenant will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.unitGroupOperations.get`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Retrieve a single unit group operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `UnitGroupOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.unitGroupOperations.list`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/unitGroupOperations`
- Retrieve a collection of unit group operations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `ListUnitGroupOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit group operation. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of unit group operations to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.unitGroups.get`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+name}`
- Retrieve a single unit group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `UnitGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.unitGroups.list`

- Versions: v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1beta1/{+parent}/unitGroups`
- Retrieve a collection of unit groups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `ListUnitGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit group. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of unit groups to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.unitKinds.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/unitKinds`
- Create a new unit kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `UnitKind`; Response: `UnitKind`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit kind. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `unitKindId` | query | string | yes | Required. The ID value for the new unit kind. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.unitKinds.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single unit kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the unit kind. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the unit kind. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.unitKinds.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single unit kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `UnitKind`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.unitKinds.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/unitKinds`
- Retrieve a collection of unit kinds.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListUnitKindsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit kind. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of unit kinds to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.unitKinds.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single unit kind.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `UnitKind`; Response: `UnitKind`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitKinds/{unitKind}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the UnitKind resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the UnitKind will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.unitOperations.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/unitOperations`
- Create a new unit operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `UnitOperation`; Response: `UnitOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit operation. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `unitOperationId` | query | string | yes | Required. The ID value for the new unit operation. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.unitOperations.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single unit operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the unit operation. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the unit operation. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.unitOperations.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single unit operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `UnitOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.unitOperations.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/unitOperations`
- Retrieve a collection of unit operations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListUnitOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit operation. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of unit operations to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.unitOperations.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single unit operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `UnitOperation`; Response: `UnitOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/unitOperations/{unitOperation}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the UnitOperation resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the UnitOperation will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.units.create`

- Versions: v1, v1beta1
- `POST https://saasservicemgmt.googleapis.com/v1/{+parent}/units`
- Create a new unit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Unit`; Response: `Unit`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `unitId` | query | string | yes | Required. The ID value for the new unit. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.units.delete`

- Versions: v1, v1beta1
- `DELETE https://saasservicemgmt.googleapis.com/v1/{+name}`
- Delete a single unit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |
| `etag` | query | string | no | The etag known to the client for the expected state of the unit. This is used with state-changing methods to prevent accidental overwrites when multiple user agents might be acting in parallel on the same resource. An etag wildcard provide optimistic concurrency based on the expected existence of the unit. The Any wildcard (`*`) requires that the resource must already exists, and the Not Any wildcard (`!*`) requires that it must not. |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### `saasservicemgmt.projects.locations.units.get`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+name}`
- Retrieve a single unit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `Unit`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the resource within a service. |

### `saasservicemgmt.projects.locations.units.list`

- Versions: v1, v1beta1
- `GET https://saasservicemgmt.googleapis.com/v1/{+parent}/units`
- Retrieve a collection of units.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`, `https://www.googleapis.com/auth/saasservicemgmt.readonly`
- Request: —; Response: `ListUnitsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the unit. |
| `filter` | query | string | no | Filter the list as specified in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Order results as specified in https://google.aip.dev/132. |
| `pageSize` | query | integer (int32) | no | The maximum number of units to send per page. |
| `pageToken` | query | string | no | The page token: If the next_page_token from a previous response is provided, this request will send the subsequent page. |

### `saasservicemgmt.projects.locations.units.patch`

- Versions: v1, v1beta1
- `PATCH https://saasservicemgmt.googleapis.com/v1/{+name}`
- Update a single unit.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/saasservicemgmt.read-write`
- Request: `Unit`; Response: `Unit`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/units/{unit}" |
| `requestId` | query | string | no | An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Field mask is used to specify the fields to be overwritten in the Unit resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields in the Unit will be overwritten. |
| `validateOnly` | query | boolean | no | If "validate_only" is set to true, the service will try to validate that this request would succeed, but will not actually make changes. |

### Example request skeleton

Generated from the Discovery entry of `saasservicemgmt.projects.locations.flagAttributes.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://saasservicemgmt.googleapis.com/v1beta1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `saasservicemgmt` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`saasservicemgmt` v1, revision 20261106) also lists 23 endpoints of the form `https://saasservicemgmt.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-southeast2`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west15`, `europe-west3`, `europe-west6`, `me-central1`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `us-east1`, `us-east4`, `us-south1`, `us-west2`. The method URLs above use the global host `https://saasservicemgmt.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://saasservicemgmt.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://saasservicemgmt.googleapis.com/$discovery/rest?version=v1, https://saasservicemgmt.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
