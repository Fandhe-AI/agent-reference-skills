---
source: https://orgpolicy.googleapis.com/$discovery/rest?version=v2
---

# Organization Policy API REST API (orgpolicy)

## Signature / Usage

Base URL: `https://orgpolicy.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `orgpolicy.folders.constraints.list`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+parent}/constraints`
- Lists constraints that could be applied on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2ListConstraintsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |
| `pageSize` | query | integer (int32) | no | Size of the pages to be returned. This is not used, but the server may at any point start using this field to limit page size. |
| `pageToken` | query | string | no | Page token used to retrieve the next page. This is not used, but the server may at any point start using this field. |

### `orgpolicy.folders.policies.create`

- Versions: v2
- `POST https://orgpolicy.googleapis.com/v2/{+parent}/policies`
- Creates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy already exists on the given Google Cloud resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2Policy`; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |

### `orgpolicy.folders.policies.delete`

- Versions: v2
- `DELETE https://orgpolicy.googleapis.com/v2/{+name}`
- Deletes a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the policy to delete. See the policy entry for naming rules. |
| `etag` | query | string | no | Optional. The current entity tag (ETag) of the organization policy. If an ETag is provided and doesn't match the current ETag of the policy, deletion of the policy will be blocked and an `ABORTED` error will be returned. |

### `orgpolicy.folders.policies.get`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+name}`
- Gets a policy on a resource. If no policy is set on the resource, `NOT_FOUND` is returned. The entity tag (ETag) can be used with `UpdatePolicy()` to update a policy during read-modify-write.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the policy. See Policy for naming requirements. |

### `orgpolicy.folders.policies.getEffectivePolicy`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+name}:getEffectivePolicy`
- Gets the effective policy on a resource. This is the result of merging policies in the resource hierarchy and evaluating conditions. The returned policy will not have an ETag or `condition` set because it is an evaluated policy across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The effective policy to compute. See Policy for naming requirements. |

### `orgpolicy.folders.policies.list`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+parent}/policies`
- Retrieves all of the policies that exist on a particular resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2ListPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |
| `pageSize` | query | integer (int32) | no | Size of the pages to be returned. This is not used, but the server may at any point start using this field to limit page size. |
| `pageToken` | query | string | no | Page token used to retrieve the next page. This is not used, but the server may at any point start using this field. |

### `orgpolicy.folders.policies.patch`

- Versions: v2
- `PATCH https://orgpolicy.googleapis.com/v2/{+name}`
- Updates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or the policy doesn't exist. Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the ETag supplied in the request doesn't match the persisted ETag of the policy. Note: the supplied policy will perform a full overwrite of all fields.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2Policy`; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_number}/policies/{constraint_name}` \* `organizations/{organization_number}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask used to specify the fields to be overwritten in the policy. The fields specified in the update_mask are relative to the policy, not the full request. |

### `orgpolicy.organizations.constraints.list`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+parent}/constraints`
- Lists constraints that could be applied on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2ListConstraintsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |
| `pageSize` | query | integer (int32) | no | Size of the pages to be returned. This is not used, but the server may at any point start using this field to limit page size. |
| `pageToken` | query | string | no | Page token used to retrieve the next page. This is not used, but the server may at any point start using this field. |

### `orgpolicy.organizations.customConstraints.create`

- Versions: v2
- `POST https://orgpolicy.googleapis.com/v2/{+parent}/customConstraints`
- Creates a custom constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the organization does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the constraint already exists on the given organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2CustomConstraint`; Response: `GoogleCloudOrgpolicyV2CustomConstraint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Must be in the following form: \* `organizations/{organization_id}` |

### `orgpolicy.organizations.customConstraints.delete`

- Versions: v2
- `DELETE https://orgpolicy.googleapis.com/v2/{+name}`
- Deletes a custom constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the custom constraint to delete. See the custom constraint entry for naming rules. |

### `orgpolicy.organizations.customConstraints.get`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+name}`
- Gets a custom or managed constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the custom or managed constraint does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2CustomConstraint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the custom or managed constraint. See the custom constraint entry for naming requirements. |

### `orgpolicy.organizations.customConstraints.list`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+parent}/customConstraints`
- Retrieves all of the custom constraints that exist on a particular organization resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2ListCustomConstraintsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The target Google Cloud resource that parents the set of custom constraints that will be returned from this call. Must be in one of the following forms: \* `organizations/{organization_id}` |
| `pageSize` | query | integer (int32) | no | Size of the pages to be returned. This is not used, but the server may at any point start using this field to limit page size. |
| `pageToken` | query | string | no | Page token used to retrieve the next page. This is not used, but the server may at any point start using this field. |

### `orgpolicy.organizations.customConstraints.patch`

- Versions: v2
- `PATCH https://orgpolicy.googleapis.com/v2/{+name}`
- Updates a custom constraint. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Note: the supplied policy will perform a full overwrite of all fields.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2CustomConstraint`; Response: `GoogleCloudOrgpolicyV2CustomConstraint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Name of the constraint. This is unique within the organization. The name must be of the form: \* `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 71 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/custom.` is not counted. |

### `orgpolicy.organizations.policies.create`

- Versions: v2
- `POST https://orgpolicy.googleapis.com/v2/{+parent}/policies`
- Creates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy already exists on the given Google Cloud resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2Policy`; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |

### `orgpolicy.organizations.policies.delete`

- Versions: v2
- `DELETE https://orgpolicy.googleapis.com/v2/{+name}`
- Deletes a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the policy to delete. See the policy entry for naming rules. |
| `etag` | query | string | no | Optional. The current entity tag (ETag) of the organization policy. If an ETag is provided and doesn't match the current ETag of the policy, deletion of the policy will be blocked and an `ABORTED` error will be returned. |

### `orgpolicy.organizations.policies.get`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+name}`
- Gets a policy on a resource. If no policy is set on the resource, `NOT_FOUND` is returned. The entity tag (ETag) can be used with `UpdatePolicy()` to update a policy during read-modify-write.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the policy. See Policy for naming requirements. |

### `orgpolicy.organizations.policies.getEffectivePolicy`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+name}:getEffectivePolicy`
- Gets the effective policy on a resource. This is the result of merging policies in the resource hierarchy and evaluating conditions. The returned policy will not have an ETag or `condition` set because it is an evaluated policy across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The effective policy to compute. See Policy for naming requirements. |

### `orgpolicy.organizations.policies.list`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+parent}/policies`
- Retrieves all of the policies that exist on a particular resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2ListPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |
| `pageSize` | query | integer (int32) | no | Size of the pages to be returned. This is not used, but the server may at any point start using this field to limit page size. |
| `pageToken` | query | string | no | Page token used to retrieve the next page. This is not used, but the server may at any point start using this field. |

### `orgpolicy.organizations.policies.patch`

- Versions: v2
- `PATCH https://orgpolicy.googleapis.com/v2/{+name}`
- Updates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or the policy doesn't exist. Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the ETag supplied in the request doesn't match the persisted ETag of the policy. Note: the supplied policy will perform a full overwrite of all fields.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2Policy`; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_number}/policies/{constraint_name}` \* `organizations/{organization_number}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask used to specify the fields to be overwritten in the policy. The fields specified in the update_mask are relative to the policy, not the full request. |

### `orgpolicy.projects.constraints.list`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+parent}/constraints`
- Lists constraints that could be applied on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2ListConstraintsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |
| `pageSize` | query | integer (int32) | no | Size of the pages to be returned. This is not used, but the server may at any point start using this field to limit page size. |
| `pageToken` | query | string | no | Page token used to retrieve the next page. This is not used, but the server may at any point start using this field. |

### `orgpolicy.projects.policies.create`

- Versions: v2
- `POST https://orgpolicy.googleapis.com/v2/{+parent}/policies`
- Creates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy already exists on the given Google Cloud resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2Policy`; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |

### `orgpolicy.projects.policies.delete`

- Versions: v2
- `DELETE https://orgpolicy.googleapis.com/v2/{+name}`
- Deletes a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the policy to delete. See the policy entry for naming rules. |
| `etag` | query | string | no | Optional. The current entity tag (ETag) of the organization policy. If an ETag is provided and doesn't match the current ETag of the policy, deletion of the policy will be blocked and an `ABORTED` error will be returned. |

### `orgpolicy.projects.policies.get`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+name}`
- Gets a policy on a resource. If no policy is set on the resource, `NOT_FOUND` is returned. The entity tag (ETag) can be used with `UpdatePolicy()` to update a policy during read-modify-write.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the policy. See Policy for naming requirements. |

### `orgpolicy.projects.policies.getEffectivePolicy`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+name}:getEffectivePolicy`
- Gets the effective policy on a resource. This is the result of merging policies in the resource hierarchy and evaluating conditions. The returned policy will not have an ETag or `condition` set because it is an evaluated policy across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The effective policy to compute. See Policy for naming requirements. |

### `orgpolicy.projects.policies.list`

- Versions: v2
- `GET https://orgpolicy.googleapis.com/v2/{+parent}/policies`
- Retrieves all of the policies that exist on a particular resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`, `https://www.googleapis.com/auth/organizationpolicy.readonly`
- Request: —; Response: `GoogleCloudOrgpolicyV2ListPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: \* `projects/{project_number}` \* `projects/{project_id}` \* `folders/{folder_number}` \* `organizations/{organization_number}` |
| `pageSize` | query | integer (int32) | no | Size of the pages to be returned. This is not used, but the server may at any point start using this field to limit page size. |
| `pageToken` | query | string | no | Page token used to retrieve the next page. This is not used, but the server may at any point start using this field. |

### `orgpolicy.projects.policies.patch`

- Versions: v2
- `PATCH https://orgpolicy.googleapis.com/v2/{+name}`
- Updates a policy. Returns a `google.rpc.Status` with `google.rpc.Code.NOT_FOUND` if the constraint or the policy doesn't exist. Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the ETag supplied in the request doesn't match the persisted ETag of the policy. Note: the supplied policy will perform a full overwrite of all fields.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/organizationpolicy`
- Request: `GoogleCloudOrgpolicyV2Policy`; Response: `GoogleCloudOrgpolicyV2Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name of the policy. Must be one of the following forms, where `constraint_name` is the name of the constraint that this policy configures: \* `projects/{project_number}/policies/{constraint_name}` \* `folders/{folder_number}/policies/{constraint_name}` \* `organizations/{organization_number}/policies/{constraint_name}` For example, `projects/123/policies/compute.disableSerialPortAccess`. Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask used to specify the fields to be overwritten in the policy. The fields specified in the update_mask are relative to the policy, not the full request. |

### Example request skeleton

Generated from the Discovery entry of `orgpolicy.folders.constraints.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://orgpolicy.googleapis.com/v2/{+parent}/constraints"
```

## Notes

- Generated from the Discovery document(s) v2 of `orgpolicy` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/orgpolicy/`.
- Source: https://orgpolicy.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
