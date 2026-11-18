---
source: https://iap.googleapis.com/$discovery/rest?version=v1
---

# Cloud Identity-Aware Proxy API REST API (iap)

## Signature / Usage

Base URL: `https://iap.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `iap.projects.brands.create`

- Versions: v1
- `POST https://iap.googleapis.com/v1/{+parent}/brands`
- Constructs a new OAuth brand for the project if one does not exist. The created brand is "internal only", meaning that OAuth clients created under it only accept requests from users who belong to the same Google Workspace organization as the project. The brand is created in an un-reviewed status. NOTE: The "internal only" status can be manually changed in the Google Cloud Console. Requires that a brand does not already exist for the project, and that the specified support email is owned by the caller.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Brand`; Response: `Brand`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. GCP Project number/id under which the brand is to be created. In the following format: projects/{project_number/id}. |

### `iap.projects.brands.get`

- Versions: v1
- `GET https://iap.googleapis.com/v1/{+name}`
- Retrieves the OAuth brand of the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Brand`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the brand to be fetched. In the following format: projects/{project_number/id}/brands/{brand}. |

### `iap.projects.brands.identityAwareProxyClients.create`

- Versions: v1
- `POST https://iap.googleapis.com/v1/{+parent}/identityAwareProxyClients`
- Creates an Identity Aware Proxy (IAP) OAuth client. The client is owned by IAP. Requires that the brand for the project exists and that it is set for internal-only use.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `IdentityAwareProxyClient`; Response: `IdentityAwareProxyClient`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Path to create the client in. In the following format: projects/{project_number/id}/brands/{brand}. The project must belong to a G Suite account. |

### `iap.projects.brands.identityAwareProxyClients.delete`

- Versions: v1
- `DELETE https://iap.googleapis.com/v1/{+name}`
- Deletes an Identity Aware Proxy (IAP) OAuth client. Useful for removing obsolete clients, managing the number of clients in a given project, and cleaning up after tests. Requires that the client is owned by IAP.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Identity Aware Proxy client to be deleted. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}. |

### `iap.projects.brands.identityAwareProxyClients.get`

- Versions: v1
- `GET https://iap.googleapis.com/v1/{+name}`
- Retrieves an Identity Aware Proxy (IAP) OAuth client. Requires that the client is owned by IAP.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `IdentityAwareProxyClient`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Identity Aware Proxy client to be fetched. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}. |

### `iap.projects.brands.identityAwareProxyClients.list`

- Versions: v1
- `GET https://iap.googleapis.com/v1/{+parent}/identityAwareProxyClients`
- Lists the existing clients for the brand.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListIdentityAwareProxyClientsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Full brand path. In the following format: projects/{project_number/id}/brands/{brand}. |
| `pageSize` | query | integer (int32) | no | The maximum number of clients to return. The service may return fewer than this value. If unspecified, at most 100 clients will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListIdentityAwareProxyClients` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListIdentityAwareProxyClients` must match the call that provided the page token. |

### `iap.projects.brands.identityAwareProxyClients.resetSecret`

- Versions: v1
- `POST https://iap.googleapis.com/v1/{+name}:resetSecret`
- Resets an Identity Aware Proxy (IAP) OAuth client secret. Useful if the secret was compromised. Requires that the client is owned by IAP.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetIdentityAwareProxyClientSecretRequest`; Response: `IdentityAwareProxyClient`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Identity Aware Proxy client to that will have its secret reset. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}. |

### `iap.projects.brands.list`

- Versions: v1
- `GET https://iap.googleapis.com/v1/{+parent}/brands`
- Lists the existing brands for the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBrandsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. GCP Project number/id. In the following format: projects/{project_number/id}. |

### `iap.projects.iap_tunnel.locations.destGroups.create`

- Versions: v1
- `POST https://iap.googleapis.com/v1/{+parent}/destGroups`
- Creates a new TunnelDestGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TunnelDestGroup`; Response: `TunnelDestGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Google Cloud Project ID and location. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}`. |
| `tunnelDestGroupId` | query | string | yes | Required. The ID to use for the TunnelDestGroup, which becomes the final component of the resource name. This value must be 4-63 characters, and valid characters are `[a-z]-`. |

### `iap.projects.iap_tunnel.locations.destGroups.delete`

- Versions: v1
- `DELETE https://iap.googleapis.com/v1/{+name}`
- Deletes a TunnelDestGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the TunnelDestGroup to delete. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}/destGroups/{dest_group}`. |

### `iap.projects.iap_tunnel.locations.destGroups.get`

- Versions: v1
- `GET https://iap.googleapis.com/v1/{+name}`
- Retrieves an existing TunnelDestGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TunnelDestGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the TunnelDestGroup to be fetched. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}/destGroups/{dest_group}`. |

### `iap.projects.iap_tunnel.locations.destGroups.list`

- Versions: v1
- `GET https://iap.googleapis.com/v1/{+parent}/destGroups`
- Lists the existing TunnelDestGroups. To group across all locations, use a `-` as the location ID. For example: `/v1/projects/123/iap_tunnel/locations/-/destGroups`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTunnelDestGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Google Cloud Project ID and location. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}`. A `-` can be used for the location to group across all locations. |
| `pageSize` | query | integer (int32) | no | The maximum number of groups to return. The service might return fewer than this value. If unspecified, at most 100 groups are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListTunnelDestGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTunnelDestGroups` must match the call that provided the page token. |

### `iap.projects.iap_tunnel.locations.destGroups.patch`

- Versions: v1
- `PATCH https://iap.googleapis.com/v1/{+name}`
- Updates a TunnelDestGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TunnelDestGroup`; Response: `TunnelDestGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Identifier for the TunnelDestGroup. Must be unique within the project and contain only lower case letters (a-z) and dashes (-). |
| `updateMask` | query | string (google-fieldmask) | no | A field mask that specifies which IAP settings to update. If omitted, then all of the settings are updated. See https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask |

### `iap.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://iap.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for an Identity-Aware Proxy protected resource. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `iap.getIapSettings`

- Versions: v1
- `GET https://iap.googleapis.com/v1/{+name}:iapSettings`
- Gets the IAP settings on a particular IAP protected resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `IapSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for which to retrieve the settings. Authorization: Requires the `getSettings` permission for the associated resource. |

### `iap.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://iap.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy for an Identity-Aware Proxy protected resource. Replaces any existing policy. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `iap.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://iap.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the Identity-Aware Proxy protected resource. More information about managing access via IAP can be found at: https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `iap.updateIapSettings`

- Versions: v1
- `PATCH https://iap.googleapis.com/v1/{+name}:iapSettings`
- Updates the IAP settings on a particular IAP protected resource. It replaces all fields unless the `update_mask` is set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `IapSettings`; Response: `IapSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the IAP protected resource. |
| `updateMask` | query | string (google-fieldmask) | no | The field mask specifying which IAP settings should be updated. If omitted, then all of the settings are updated. See https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. Note: All IAP reauth settings must always be set together, using the field mask: `iapSettings.accessSettings.reauthSettings`. |

### `iap.validateAttributeExpression`

- Versions: v1
- `POST https://iap.googleapis.com/v1/{+name}:validateAttributeExpression`
- Validates that a given CEL expression conforms to IAP restrictions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ValidateIapAttributeExpressionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the IAP protected resource. |
| `expression` | query | string | yes | Required. User input string expression. Should be of the form `attributes.saml_attributes.filter(attribute, attribute.name in ['{attribute_name}', '{attribute_name}'])` |

### Example request skeleton

Generated from the Discovery entry of `iap.projects.brands.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://iap.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `iap` (retrieved 2026-11-14). Resources on this page: projects, v1.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://iap.googleapis.com/$discovery/rest?version=v1, https://iap.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
