---
source: https://accessapproval.googleapis.com/$discovery/rest?version=v1
---

# Access Approval API REST API (accessapproval)

## Signature / Usage

Base URL: `https://accessapproval.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `accessapproval.folders.approvalRequests.approve`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:approve`
- Approves a request and returns the updated ApprovalRequest. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the approval request to approve. |

### `accessapproval.folders.approvalRequests.dismiss`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:dismiss`
- Dismisses a request. Returns the updated ApprovalRequest. NOTE: When a request is dismissed, it is considered ignored. Dismissing a request does not prevent access granted by other Access Approval requests. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DismissApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the ApprovalRequest to dismiss. |

### `accessapproval.folders.approvalRequests.get`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Gets an approval request. Returns NOT_FOUND if the request does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the approval request to retrieve. Format: "{projects\|folders\|organizations}/{id}/approvalRequests/{approval_request}" |

### `accessapproval.folders.approvalRequests.invalidate`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:invalidate`
- Invalidates an existing ApprovalRequest. Returns the updated ApprovalRequest. NOTE: This action revokes Google access based on this approval request. If the resource has other active approvals, access will remain granted. Returns FAILED_PRECONDITION if the request exists but is not in an approved state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InvalidateApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the ApprovalRequest to invalidate. |

### `accessapproval.folders.approvalRequests.list`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+parent}/approvalRequests`
- Lists approval requests associated with a project, folder, or organization. Approval requests can be filtered by state (pending, active, dismissed). The order is reverse chronological.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListApprovalRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}". |
| `filter` | query | string | no | A filter on the type of approval requests to retrieve. Must be one of the following values: \* \[not set\]: Requests that are pending or have active approvals. \* ALL: All requests. \* PENDING: Only pending requests. \* ACTIVE: Only active (i.e. currently approved) requests. \* DISMISSED: Only requests that have been dismissed, or requests that are not approved and past expiration. \* EXPIRED: Only requests that have been approved, and the approval has expired. \* HISTORY: Active, dismissed and expired requests. |
| `pageSize` | query | integer (int32) | no | Requested page size. |
| `pageToken` | query | string | no | A token identifying the page of results to return. |

### `accessapproval.folders.deleteAccessApprovalSettings`

- Versions: v1
- `DELETE https://accessapproval.googleapis.com/v1/{+name}`
- Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the resource. Access Approval may remain active based on parent resource settings. To confirm the effective settings, call GetAccessApprovalSettings and verify effective setting is disabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the AccessApprovalSettings to delete. |

### `accessapproval.folders.getAccessApprovalSettings`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Gets the Access Approval settings associated with a project, folder, or organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessApprovalSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the AccessApprovalSettings to retrieve. Format: "{projects\|folders\|organizations}/{id}/accessApprovalSettings" |

### `accessapproval.folders.getServiceAccount`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Retrieves the service account that is used by Access Approval to access KMS keys for signing approved approval requests.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessApprovalServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the AccessApprovalServiceAccount to retrieve. |

### `accessapproval.folders.updateAccessApprovalSettings`

- Versions: v1
- `PATCH https://accessapproval.googleapis.com/v1/{+name}`
- Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccessApprovalSettings`; Response: `AccessApprovalSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the settings. Format is one of: \* "projects/{project}/accessApprovalSettings" \* "folders/{folder}/accessApprovalSettings" \* "organizations/{organization}/accessApprovalSettings" |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the settings. Only the top level fields of AccessApprovalSettings (notification_emails & enrolled_services) are supported. For each field, if it is included, the currently stored value will be entirely overwritten with the value of the field passed in this request. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If this field is left unset, only the notification_emails field will be updated. |

### `accessapproval.organizations.approvalRequests.approve`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:approve`
- Approves a request and returns the updated ApprovalRequest. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the approval request to approve. |

### `accessapproval.organizations.approvalRequests.dismiss`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:dismiss`
- Dismisses a request. Returns the updated ApprovalRequest. NOTE: When a request is dismissed, it is considered ignored. Dismissing a request does not prevent access granted by other Access Approval requests. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DismissApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the ApprovalRequest to dismiss. |

### `accessapproval.organizations.approvalRequests.get`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Gets an approval request. Returns NOT_FOUND if the request does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the approval request to retrieve. Format: "{projects\|folders\|organizations}/{id}/approvalRequests/{approval_request}" |

### `accessapproval.organizations.approvalRequests.invalidate`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:invalidate`
- Invalidates an existing ApprovalRequest. Returns the updated ApprovalRequest. NOTE: This action revokes Google access based on this approval request. If the resource has other active approvals, access will remain granted. Returns FAILED_PRECONDITION if the request exists but is not in an approved state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InvalidateApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the ApprovalRequest to invalidate. |

### `accessapproval.organizations.approvalRequests.list`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+parent}/approvalRequests`
- Lists approval requests associated with a project, folder, or organization. Approval requests can be filtered by state (pending, active, dismissed). The order is reverse chronological.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListApprovalRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}". |
| `filter` | query | string | no | A filter on the type of approval requests to retrieve. Must be one of the following values: \* \[not set\]: Requests that are pending or have active approvals. \* ALL: All requests. \* PENDING: Only pending requests. \* ACTIVE: Only active (i.e. currently approved) requests. \* DISMISSED: Only requests that have been dismissed, or requests that are not approved and past expiration. \* EXPIRED: Only requests that have been approved, and the approval has expired. \* HISTORY: Active, dismissed and expired requests. |
| `pageSize` | query | integer (int32) | no | Requested page size. |
| `pageToken` | query | string | no | A token identifying the page of results to return. |

### `accessapproval.organizations.deleteAccessApprovalSettings`

- Versions: v1
- `DELETE https://accessapproval.googleapis.com/v1/{+name}`
- Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the resource. Access Approval may remain active based on parent resource settings. To confirm the effective settings, call GetAccessApprovalSettings and verify effective setting is disabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the AccessApprovalSettings to delete. |

### `accessapproval.organizations.getAccessApprovalSettings`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Gets the Access Approval settings associated with a project, folder, or organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessApprovalSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the AccessApprovalSettings to retrieve. Format: "{projects\|folders\|organizations}/{id}/accessApprovalSettings" |

### `accessapproval.organizations.getServiceAccount`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Retrieves the service account that is used by Access Approval to access KMS keys for signing approved approval requests.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessApprovalServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the AccessApprovalServiceAccount to retrieve. |

### `accessapproval.organizations.updateAccessApprovalSettings`

- Versions: v1
- `PATCH https://accessapproval.googleapis.com/v1/{+name}`
- Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccessApprovalSettings`; Response: `AccessApprovalSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the settings. Format is one of: \* "projects/{project}/accessApprovalSettings" \* "folders/{folder}/accessApprovalSettings" \* "organizations/{organization}/accessApprovalSettings" |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the settings. Only the top level fields of AccessApprovalSettings (notification_emails & enrolled_services) are supported. For each field, if it is included, the currently stored value will be entirely overwritten with the value of the field passed in this request. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If this field is left unset, only the notification_emails field will be updated. |

### `accessapproval.projects.approvalRequests.approve`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:approve`
- Approves a request and returns the updated ApprovalRequest. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the approval request to approve. |

### `accessapproval.projects.approvalRequests.dismiss`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:dismiss`
- Dismisses a request. Returns the updated ApprovalRequest. NOTE: When a request is dismissed, it is considered ignored. Dismissing a request does not prevent access granted by other Access Approval requests. Returns NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the request exists but is not in a pending state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DismissApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the ApprovalRequest to dismiss. |

### `accessapproval.projects.approvalRequests.get`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Gets an approval request. Returns NOT_FOUND if the request does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the approval request to retrieve. Format: "{projects\|folders\|organizations}/{id}/approvalRequests/{approval_request}" |

### `accessapproval.projects.approvalRequests.invalidate`

- Versions: v1
- `POST https://accessapproval.googleapis.com/v1/{+name}:invalidate`
- Invalidates an existing ApprovalRequest. Returns the updated ApprovalRequest. NOTE: This action revokes Google access based on this approval request. If the resource has other active approvals, access will remain granted. Returns FAILED_PRECONDITION if the request exists but is not in an approved state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InvalidateApprovalRequestMessage`; Response: `ApprovalRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the ApprovalRequest to invalidate. |

### `accessapproval.projects.approvalRequests.list`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+parent}/approvalRequests`
- Lists approval requests associated with a project, folder, or organization. Approval requests can be filtered by state (pending, active, dismissed). The order is reverse chronological.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListApprovalRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}". |
| `filter` | query | string | no | A filter on the type of approval requests to retrieve. Must be one of the following values: \* \[not set\]: Requests that are pending or have active approvals. \* ALL: All requests. \* PENDING: Only pending requests. \* ACTIVE: Only active (i.e. currently approved) requests. \* DISMISSED: Only requests that have been dismissed, or requests that are not approved and past expiration. \* EXPIRED: Only requests that have been approved, and the approval has expired. \* HISTORY: Active, dismissed and expired requests. |
| `pageSize` | query | integer (int32) | no | Requested page size. |
| `pageToken` | query | string | no | A token identifying the page of results to return. |

### `accessapproval.projects.deleteAccessApprovalSettings`

- Versions: v1
- `DELETE https://accessapproval.googleapis.com/v1/{+name}`
- Deletes the settings associated with a project, folder, or organization. This will have the effect of disabling Access Approval for the resource. Access Approval may remain active based on parent resource settings. To confirm the effective settings, call GetAccessApprovalSettings and verify effective setting is disabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the AccessApprovalSettings to delete. |

### `accessapproval.projects.getAccessApprovalSettings`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Gets the Access Approval settings associated with a project, folder, or organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessApprovalSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the AccessApprovalSettings to retrieve. Format: "{projects\|folders\|organizations}/{id}/accessApprovalSettings" |

### `accessapproval.projects.getServiceAccount`

- Versions: v1
- `GET https://accessapproval.googleapis.com/v1/{+name}`
- Retrieves the service account that is used by Access Approval to access KMS keys for signing approved approval requests.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessApprovalServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the AccessApprovalServiceAccount to retrieve. |

### `accessapproval.projects.updateAccessApprovalSettings`

- Versions: v1
- `PATCH https://accessapproval.googleapis.com/v1/{+name}`
- Updates the settings associated with a project, folder, or organization. Settings to update are determined by the value of field_mask.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AccessApprovalSettings`; Response: `AccessApprovalSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the settings. Format is one of: \* "projects/{project}/accessApprovalSettings" \* "folders/{folder}/accessApprovalSettings" \* "organizations/{organization}/accessApprovalSettings" |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applies to the settings. Only the top level fields of AccessApprovalSettings (notification_emails & enrolled_services) are supported. For each field, if it is included, the currently stored value will be entirely overwritten with the value of the field passed in this request. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If this field is left unset, only the notification_emails field will be updated. |

### Example request skeleton

Generated from the Discovery entry of `accessapproval.folders.approvalRequests.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://accessapproval.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `accessapproval` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://accessapproval.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
