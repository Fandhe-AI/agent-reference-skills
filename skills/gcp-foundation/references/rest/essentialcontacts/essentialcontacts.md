---
source: https://essentialcontacts.googleapis.com/$discovery/rest?version=v1
---

# Essential Contacts API REST API (essentialcontacts)

## Signature / Usage

Base URL: `https://essentialcontacts.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `essentialcontacts.folders.contacts.compute`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+parent}/contacts:compute`
- Lists all contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1ComputeContactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the resource to compute contacts for. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |
| `notificationCategories` | query | string enum | no | The categories of notifications to compute contacts for. If ALL is included in this list, contacts subscribed to any notification category will be returned. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `essentialcontacts.folders.contacts.create`

- Versions: v1
- `POST https://essentialcontacts.googleapis.com/v1/{+parent}/contacts`
- Adds a new contact for a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1Contact`; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource to save this contact for. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |

### `essentialcontacts.folders.contacts.delete`

- Versions: v1
- `DELETE https://essentialcontacts.googleapis.com/v1/{+name}`
- Deletes a contact.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the contact to delete. Format: organizations/{organization}/contacts/{contact}, folders/{folder}/contacts/{contact} or projects/{project}/contacts/{contact} (where {project} is the project number) |

### `essentialcontacts.folders.contacts.get`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+name}`
- Gets a single contact.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the contact to retrieve. Format: organizations/{organization}/contacts/{contact}, folders/{folder}/contacts/{contact} or projects/{project}/contacts/{contact} (where {project} is the project number) |

### `essentialcontacts.folders.contacts.list`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+parent}/contacts`
- Lists the contacts that have been set on a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1ListContactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `essentialcontacts.folders.contacts.patch`

- Versions: v1
- `PATCH https://essentialcontacts.googleapis.com/v1/{+name}`
- Updates a contact. Note: A contact's email address cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1Contact`; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The update mask applied to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `essentialcontacts.folders.contacts.sendTestMessage`

- Versions: v1
- `POST https://essentialcontacts.googleapis.com/v1/{+resource}/contacts:sendTestMessage`
- Allows a contact admin to send a test message to contact to verify that it has been configured correctly.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1SendTestMessageRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project… |

### `essentialcontacts.organizations.contacts.compute`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+parent}/contacts:compute`
- Lists all contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1ComputeContactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the resource to compute contacts for. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |
| `notificationCategories` | query | string enum | no | The categories of notifications to compute contacts for. If ALL is included in this list, contacts subscribed to any notification category will be returned. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `essentialcontacts.organizations.contacts.create`

- Versions: v1
- `POST https://essentialcontacts.googleapis.com/v1/{+parent}/contacts`
- Adds a new contact for a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1Contact`; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource to save this contact for. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |

### `essentialcontacts.organizations.contacts.delete`

- Versions: v1
- `DELETE https://essentialcontacts.googleapis.com/v1/{+name}`
- Deletes a contact.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the contact to delete. Format: organizations/{organization}/contacts/{contact}, folders/{folder}/contacts/{contact} or projects/{project}/contacts/{contact} (where {project} is the project number) |

### `essentialcontacts.organizations.contacts.get`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+name}`
- Gets a single contact.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the contact to retrieve. Format: organizations/{organization}/contacts/{contact}, folders/{folder}/contacts/{contact} or projects/{project}/contacts/{contact} (where {project} is the project number) |

### `essentialcontacts.organizations.contacts.list`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+parent}/contacts`
- Lists the contacts that have been set on a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1ListContactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `essentialcontacts.organizations.contacts.patch`

- Versions: v1
- `PATCH https://essentialcontacts.googleapis.com/v1/{+name}`
- Updates a contact. Note: A contact's email address cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1Contact`; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The update mask applied to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `essentialcontacts.organizations.contacts.sendTestMessage`

- Versions: v1
- `POST https://essentialcontacts.googleapis.com/v1/{+resource}/contacts:sendTestMessage`
- Allows a contact admin to send a test message to contact to verify that it has been configured correctly.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1SendTestMessageRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project… |

### `essentialcontacts.projects.contacts.compute`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+parent}/contacts:compute`
- Lists all contacts for the resource that are subscribed to the specified notification categories, including contacts inherited from any parent resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1ComputeContactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the resource to compute contacts for. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |
| `notificationCategories` | query | string enum | no | The categories of notifications to compute contacts for. If ALL is included in this list, contacts subscribed to any notification category will be returned. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `essentialcontacts.projects.contacts.create`

- Versions: v1
- `POST https://essentialcontacts.googleapis.com/v1/{+parent}/contacts`
- Adds a new contact for a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1Contact`; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource to save this contact for. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |

### `essentialcontacts.projects.contacts.delete`

- Versions: v1
- `DELETE https://essentialcontacts.googleapis.com/v1/{+name}`
- Deletes a contact.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the contact to delete. Format: organizations/{organization}/contacts/{contact}, folders/{folder}/contacts/{contact} or projects/{project}/contacts/{contact} (where {project} is the project number) |

### `essentialcontacts.projects.contacts.get`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+name}`
- Gets a single contact.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the contact to retrieve. Format: organizations/{organization}/contacts/{contact}, folders/{folder}/contacts/{contact} or projects/{project}/contacts/{contact} (where {project} is the project number) |

### `essentialcontacts.projects.contacts.list`

- Versions: v1
- `GET https://essentialcontacts.googleapis.com/v1/{+parent}/contacts`
- Lists the contacts that have been set on a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudEssentialcontactsV1ListContactsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project number) |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. If not specified, the default page_size is 100. |
| `pageToken` | query | string | no | Optional. If present, retrieves the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `essentialcontacts.projects.contacts.patch`

- Versions: v1
- `PATCH https://essentialcontacts.googleapis.com/v1/{+name}`
- Updates a contact. Note: A contact's email address cannot be changed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1Contact`; Response: `GoogleCloudEssentialcontactsV1Contact`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The update mask applied to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `essentialcontacts.projects.contacts.sendTestMessage`

- Versions: v1
- `POST https://essentialcontacts.googleapis.com/v1/{+resource}/contacts:sendTestMessage`
- Allows a contact admin to send a test message to contact to verify that it has been configured correctly.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudEssentialcontactsV1SendTestMessageRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization}, folders/{folder} or projects/{project} (where {project} is the project… |

## Notes

- Generated from the Discovery document(s) v1 of `essentialcontacts` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- Message schemas are listed under `references/rest-schemas/essentialcontacts/`.
- Source: https://essentialcontacts.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
