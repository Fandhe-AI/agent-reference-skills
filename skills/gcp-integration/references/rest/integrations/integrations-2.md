---
source: https://integrations.googleapis.com/$discovery/rest?version=v2
---

# Application Integration API REST API (integrations) (part 2/2)

## Signature / Usage

Base URL: `https://integrations.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `integrations.projects.locations.sfdcInstances.sfdcChannels.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates an sfdc channel. Updates the sfdc channel in spanner. Returns the sfdc channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaSfdcChannel`; Response: `GoogleCloudIntegrationsV1alphaSfdcChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask specifying the fields in the above SfdcChannel that have been modified and need to be updated. |

### `integrations.projects.locations.templates.create`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/templates`
- Creates a new template
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTemplate`; Response: `GoogleCloudIntegrationsV1alphaTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. "projects/{project}/locations/{location}" format. |

### `integrations.projects.locations.templates.delete`

- Versions: v1
- `DELETE https://integrations.googleapis.com/v1/{+name}`
- Deletes a template
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the Template. |

### `integrations.projects.locations.templates.download`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}:download`
- Downloads a template. Retrieves the `Template` and returns the response as a string.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaDownloadTemplateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The template to download. Format: projects/{project}/locations/{location}/template/{template_id} |
| `fileFormat` | query | string enum | yes | Required. File format for download request. Values: `FILE_FORMAT_UNSPECIFIED`, `JSON`, `YAML`, `WORKFLOW_TEXTPROTO`. |

### `integrations.projects.locations.templates.get`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+name}`
- Get a template in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The template to retrieve. Format: projects/{project}/locations/{location}/templates/{template} |

### `integrations.projects.locations.templates.import`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:import`
- Import the template to an existing integration. This api would keep track of usage_count and last_used_time. PERMISSION_DENIED would be thrown if template is not accessible by client.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaImportTemplateRequest`; Response: `GoogleCloudIntegrationsV1alphaImportTemplateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the Template. |

### `integrations.projects.locations.templates.list`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/templates`
- Lists all templates matching the filter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaListTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of Templates. |
| `filter` | query | string | no | Optional. Standard filter field to filter templates. client_id filter won't be supported and will restrict to templates belonging to the current client only. Return all templates of the current client if the filter is empty. Also supports operators like AND, OR, NOT For example, "status=\"ACTIVE\" |
| `orderBy` | query | string | no | Optional. The results would be returned in the order you specified here. |
| `pageSize` | query | integer (int32) | no | Optional. The size of the response entries. If unspecified, defaults to 100. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. The token returned in the previous response. |
| `readMask` | query | string (google-fieldmask) | no | Optional. The mask which specifies fields that need to be returned in the template's response. |

### `integrations.projects.locations.templates.patch`

- Versions: v1
- `PATCH https://integrations.googleapis.com/v1/{+name}`
- Updates the template by given id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaTemplate`; Response: `GoogleCloudIntegrationsV1alphaTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the template. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask specifying the fields in the above template that have been modified and must be updated. |

### `integrations.projects.locations.templates.search`

- Versions: v1
- `GET https://integrations.googleapis.com/v1/{+parent}/templates:search`
- Search templates based on user query and filters. This api would query the templates and return a list of templates based on the user filter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudIntegrationsV1alphaSearchTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The client, which owns this collection of Templates. |
| `enableNaturalLanguageQueryUnderstanding` | query | boolean | no | Optional. Whether to enable natural language query understanding. |
| `filter` | query | string | no | Optional. Standard filter field to filter templates. client_id filter won't be supported and will restrict to templates belonging to the current client only. Return all templates of the current client if the filter is empty. Also supports operators like AND, OR, NOT For example, "status=\"ACTIVE\" |
| `orderBy` | query | string | no | Optional. The results would be returned in the order you specified here. |
| `pageSize` | query | integer (int32) | no | Optional. The size of the response entries. If unspecified, defaults to 100. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. The token returned in the previous response. |
| `query` | query | string | no | Optional. The search query that will be passed to Vertex search service. |
| `readMask` | query | string (google-fieldmask) | no | Optional. The mask which specifies fields that need to be returned in the template's response. |

### `integrations.projects.locations.templates.share`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:share`
- Share a template with other clients. Only the template owner can share the templates with other projects. PERMISSION_DENIED would be thrown if the request is not from the owner.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaShareTemplateRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the Template. |

### `integrations.projects.locations.templates.unshare`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:unshare`
- Unshare a template from given clients. Owner of the template can unshare template with clients. Shared client can only unshare the template from itself. PERMISSION_DENIED would be thrown if request is not from owner or for unsharing itself.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUnshareTemplateRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the Template. |

### `integrations.projects.locations.templates.upload`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+parent}/templates:upload`
- Uploads a template. The content can be a previously downloaded template. Performs the same function as CreateTemplate, but accepts input in a string format, which holds the complete representation of the Template content.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUploadTemplateRequest`; Response: `GoogleCloudIntegrationsV1alphaUploadTemplateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The template to upload. Format: projects/{project}/locations/{location} |

### `integrations.projects.locations.templates.use`

- Versions: v1
- `POST https://integrations.googleapis.com/v1/{+name}:use`
- Use the template to create integration. This api would keep track of usage_count and last_used_time. PERMISSION_DENIED would be thrown if template is not accessible by client.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudIntegrationsV1alphaUseTemplateRequest`; Response: `GoogleCloudIntegrationsV1alphaUseTemplateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name that is associated with the Template. |

### Example request skeleton

Generated from the Discovery entry of `integrations.projects.locations.templates.download` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://integrations.googleapis.com/v1/{+name}:download?fileFormat={fileFormat}"
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `integrations` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/integrations/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `name` in `integrations.projects.locations.templates.download` gives the resource name format `projects/{project}/locations/{location}/template/{template_id}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/templates/[^/]+$`; a value must match the pattern to reach the route.
- Source: https://integrations.googleapis.com/$discovery/rest?version=v2, https://integrations.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
