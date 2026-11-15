---
source: https://billingbudgets.googleapis.com/$discovery/rest?version=v1
---

# Cloud Billing Budget API REST API (billingbudgets)

## Signature / Usage

Base URL: `https://billingbudgets.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `billingbudgets.billingAccounts.budgets.create`

- Versions: v1, v1beta1
- `POST https://billingbudgets.googleapis.com/v1/{+parent}/budgets`
- Creates a new budget. See Quotas and limits (https://cloud.google.com/billing/quotas) for more information on the limits of the number of budgets you can create.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudBillingBudgetsV1Budget`; Response: `GoogleCloudBillingBudgetsV1Budget`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the billing account to create the budget in. Values are of the form `billingAccounts/{billingAccountId}`. |

### `billingbudgets.billingAccounts.budgets.delete`

- Versions: v1, v1beta1
- `DELETE https://billingbudgets.googleapis.com/v1/{+name}`
- Deletes a budget. Returns successfully if already deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the budget to delete. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. |

### `billingbudgets.billingAccounts.budgets.get`

- Versions: v1, v1beta1
- `GET https://billingbudgets.googleapis.com/v1/{+name}`
- Returns a budget. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. When reading from the API, you will not see these fields in the return value, though they may have been set in the Cloud Console.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBudgetsV1Budget`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of budget to get. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. |

### `billingbudgets.billingAccounts.budgets.list`

- Versions: v1, v1beta1
- `GET https://billingbudgets.googleapis.com/v1/{+parent}/budgets`
- Returns a list of budgets for a billing account. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. When reading from the API, you will not see these fields in the return value, though they may have been set in the Cloud Console.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBudgetsV1ListBudgetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of billing account to list budgets under. Values are of the form `billingAccounts/{billingAccountId}`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of budgets to return per page. The default and maximum value are 100. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListBudgetsResponse` which indicates that this is a continuation of a prior `ListBudgets` call, and that the system should return the next page of data. |
| `scope` | query | string | no | Optional. Set the scope of the budgets to be returned, in the format of the resource name. The scope of a budget is the cost that it tracks, such as costs for a single project, or the costs for all projects in a folder. Only project scope (in the format of "projects/project-id" or "projects/123") is supported in this field. When this field is set to a project's resource name, the budgets returned are tracking the costs for that project. |

### `billingbudgets.billingAccounts.budgets.patch`

- Versions: v1, v1beta1
- `PATCH https://billingbudgets.googleapis.com/v1/{+name}`
- Updates a budget and returns the updated budget. WARNING: There are some fields exposed on the Google Cloud Console that aren't available on this API. Budget fields that are not exposed in this API will not be changed by this method.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudBillingBudgetsV1Budget`; Response: `GoogleCloudBillingBudgetsV1Budget`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the budget. The resource name implies the scope of a budget. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Indicates which fields in the provided budget to update. Read-only fields (such as `name`) cannot be changed. If this is not provided, then only fields with non-default values from the request are updated. See https://developers.google.com/protocol-buffers/docs/proto3#default for more details about default values. |

### Example request skeleton

Generated from the Discovery entry of `billingbudgets.billingAccounts.budgets.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://billingbudgets.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `billingbudgets` (retrieved 2026-11-14). Resources on this page: billingAccounts.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/billingbudgets/`.
- Source: https://billingbudgets.googleapis.com/$discovery/rest?version=v1, https://billingbudgets.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
