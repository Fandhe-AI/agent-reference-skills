---
source: https://cloudcommerceprocurement.googleapis.com/$discovery/rest?version=v1
---

# Cloud Commerce Partner Procurement API REST API (cloudcommerceprocurement)

## Signature / Usage

Base URL: `https://cloudcommerceprocurement.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudcommerceprocurement.providers.accounts.approve`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:approve`
- Grants an approval on an Account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveAccountRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the account, with the format `providers/{providerId}/accounts/{accountId}`. |

### `cloudcommerceprocurement.providers.accounts.get`

- Versions: v1
- `GET https://cloudcommerceprocurement.googleapis.com/v1/{+name}`
- Gets a requested Account resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Account`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the account to retrieve. |
| `view` | query | string enum | no | Optional. What information to include in the response. |

### `cloudcommerceprocurement.providers.accounts.list`

- Versions: v1
- `GET https://cloudcommerceprocurement.googleapis.com/v1/{+parent}/accounts`
- Lists Accounts that the provider has access to.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAccountsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `pageSize` | query | integer (int32) | no | The maximum number of entries that are requested. The default page size is 25 and the maximum page size is 200. |
| `pageToken` | query | string | no | The token for fetching the next page. |

### `cloudcommerceprocurement.providers.accounts.reject`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:reject`
- Rejects an approval on an Account.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RejectAccountRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the account. |

### `cloudcommerceprocurement.providers.accounts.reset`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:reset`
- Resets an Account and cancels all associated Entitlements. Partner can only reset accounts they own rather than customer accounts.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetAccountRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the account. |

### `cloudcommerceprocurement.providers.entitlements.approve`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:approve`
- Approves an entitlement that is in the EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED state. This method is invoked by the provider to approve the creation of the entitlement resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveEntitlementRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement, with the format `providers/{providerId}/entitlements/{entitlementId}`. |

### `cloudcommerceprocurement.providers.entitlements.approvePlanChange`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:approvePlanChange`
- Approves an entitlement plan change that is in the EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL state. This method is invoked by the provider to approve the plan change on the entitlement resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApproveEntitlementPlanChangeRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement. |

### `cloudcommerceprocurement.providers.entitlements.get`

- Versions: v1
- `GET https://cloudcommerceprocurement.googleapis.com/v1/{+name}`
- Gets a requested Entitlement resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Entitlement`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the entitlement to retrieve. |

### `cloudcommerceprocurement.providers.entitlements.list`

- Versions: v1
- `GET https://cloudcommerceprocurement.googleapis.com/v1/{+parent}/entitlements`
- Lists Entitlements for which the provider has read access.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEntitlementsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `filter` | query | string | no | The filter that can be used to limit the list request. The filter is a query string that can match a selected set of attributes with string values. For example `account=E-1234-5678-ABCD-EFGH`, `state=pending_cancellation`, and `plan!=foo-plan`. Supported query attributes are \* `account` \* `customer_billing_account` with value in the format of: `billingAccounts/{id}` \* `product_external_name` \* `quote_external_name` \* `offer` \* `new_pending_offer` \* `plan` \* `newPendingPlan` or `new_pending_plan` \* `state` \* `services` \* `consumers.project` \* `change_history.new_offer` Note that the consumers and change_history.new_offer match works on repeated structures, so equality (`consumers.project=projects/123456789`) is not supported. Set membership can be expressed with the `:` operator. For example, `consumers.project:projects/123456789` finds entitlements with at least one consumer with project field equal to `projects/123456789`. `change_history.new_offer` retrieves all entitlements that were once associated or are currently active with the offer. Also note that the state name match is case-insensitive and query can omit the prefix "ENTITLEMENT\_". For example, `state=active` is equivalent to `state=ENTITLEMENT_ACTIVE`. If the query contains some special characters other than letters, underscore, or digits, the phrase must be quoted with double quotes. For example, `product="providerId:productId"`, where the product name needs to be quoted because it contains special character colon. Queries can be combined with `AND`, `OR`, and `NOT` to form more complex queries. They can also be grouped to force a desired evaluation order. For example, `state=active AND (account=E-1234 OR account=5678) AND NOT (product=foo-product)`. Connective `AND` can be omitted between two predicates. For example `account=E-1234 state=active` is equivalent to `account=E-1234 AND state=active`. |
| `pageSize` | query | integer (int32) | no | The maximum number of entries that are requested. The default page size is 200. |
| `pageToken` | query | string | no | The token for fetching the next page. |

### `cloudcommerceprocurement.providers.entitlements.patch`

- Versions: v1
- `PATCH https://cloudcommerceprocurement.googleapis.com/v1/{+name}`
- Updates an existing Entitlement.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Entitlement`; Response: `Entitlement`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the entitlement to update. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask that applies to the resource. See the \[FieldMask definition\] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask) for more details. |

### `cloudcommerceprocurement.providers.entitlements.reject`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:reject`
- Rejects an entitlement that is in the EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED state. This method is invoked by the provider to reject the creation of the entitlement resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RejectEntitlementRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement. |

### `cloudcommerceprocurement.providers.entitlements.rejectPlanChange`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:rejectPlanChange`
- Rejects an entitlement plan change that is in the EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL state. This method is invoked by the provider to reject the plan change on the entitlement resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RejectEntitlementPlanChangeRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement. |

### `cloudcommerceprocurement.providers.entitlements.suspend`

- Versions: v1
- `POST https://cloudcommerceprocurement.googleapis.com/v1/{+name}:suspend`
- Requests suspension of an active Entitlement. This is not yet supported.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SuspendEntitlementRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the entitlement to suspend. |

### Example request skeleton

Generated from the Discovery entry of `cloudcommerceprocurement.providers.accounts.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudcommerceprocurement.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudcommerceprocurement` (retrieved 2026-11-14). Resources on this page: providers.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/cloudcommerceprocurement/`.
- Source: https://cloudcommerceprocurement.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
