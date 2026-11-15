---
source: https://cloudbilling.googleapis.com/$discovery/rest?version=v1
---

# Cloud Billing API REST API (cloudbilling)

## Signature / Usage

Base URL: `https://cloudbilling.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudbilling.billingAccounts.create`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/billingAccounts`
- This method creates billing subaccounts (https://cloud.google.com/billing/docs/concepts#subaccounts). Google Cloud resellers should use the Channel Services APIs, accounts.customers.create (https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers/create) and accounts.customers.entitlements.create (https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers.entitlements/create). When creating a subaccount, the current authenticated user must have the `billing.accounts.update` IAM permission on the parent account, which is typically given to billing account administrators (https://cloud.google.com/billing/docs/how-to/billing-access). This method will return an error if the parent account has not been provisioned for subaccounts.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BillingAccount`; Response: `BillingAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | query | string | no | Optional. The parent to create a billing account from. Format: - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` |

### `cloudbilling.billingAccounts.get`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+name}`
- Gets information about a billing account. The current authenticated user must be a viewer of the billing account (https://cloud.google.com/billing/docs/how-to/billing-access).
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BillingAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the billing account to retrieve. For example, `billingAccounts/012345-567890-ABCDEF`. |

### `cloudbilling.billingAccounts.getIamPolicy`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a billing account. The caller must have the `billing.accounts.getIamPolicy` permission on the account, which is often given to billing account viewers (https://cloud.google.com/billing/docs/how-to/billing-access).
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `cloudbilling.billingAccounts.list`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/billingAccounts`
- Lists the billing accounts that the current authenticated user has permission to view (https://cloud.google.com/billing/docs/how-to/billing-access).
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBillingAccountsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | no | Options for how to filter the returned billing accounts. This only supports filtering for subaccounts (https://cloud.google.com/billing/docs/concepts) under a single provided parent billing account. (for example, `master_billing_account=billingAccounts/012345-678901-ABCDEF`). Boolean algebra and other fields are not currently supported. |
| `pageSize` | query | integer (int32) | no | Requested page size. The maximum page size is 100; this is also the default. |
| `pageToken` | query | string | no | A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListBillingAccounts` call. If unspecified, the first page of results is returned. |
| `parent` | query | string | no | Optional. The parent resource to list billing accounts from. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` |

### `cloudbilling.billingAccounts.move`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/{+name}:move`
- Changes which parent organization a billing account belongs to.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveBillingAccountRequest`; Response: `BillingAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the billing account to move. Must be of the form `billingAccounts/{billing_account_id}`. The specified billing account cannot be a subaccount, since a subaccount always belongs to the same organization as its parent account. |

### `cloudbilling.billingAccounts.patch`

- Versions: v1
- `PATCH https://cloudbilling.googleapis.com/v1/{+name}`
- Updates a billing account's fields. Currently the only field that can be edited is `display_name`. The current authenticated user must have the `billing.accounts.update` IAM permission, which is typically given to the administrator (https://cloud.google.com/billing/docs/how-to/billing-access) of the billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BillingAccount`; Response: `BillingAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the billing account resource to be updated. |
| `updateMask` | query | string (google-fieldmask) | no | The update mask applied to the resource. Only "display_name" is currently supported. |

### `cloudbilling.billingAccounts.projects.list`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+name}/projects`
- Lists the projects associated with a billing account. The current authenticated user must have the `billing.resourceAssociations.list` IAM permission, which is often given to billing account viewers (https://cloud.google.com/billing/docs/how-to/billing-access).
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListProjectBillingInfoResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the billing account associated with the projects that you want to list. For example, `billingAccounts/012345-567890-ABCDEF`. |
| `pageSize` | query | integer (int32) | no | Requested page size. The maximum page size is 100; this is also the default. |
| `pageToken` | query | string | no | A token identifying a page of results to be returned. This should be a `next_page_token` value returned from a previous `ListProjectBillingInfo` call. If unspecified, the first page of results is returned. |

### `cloudbilling.billingAccounts.services.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets a Google Cloud service visible to a billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountservicesV1betaBillingAccountService`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the billing account service to retrieve. Format: billingAccounts/{billing_account}/services/{service} |

### `cloudbilling.billingAccounts.services.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+parent}/services`
- Lists services visible to a billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountservicesV1betaListBillingAccountServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The billing account to list billing account service from. Format: billingAccounts/{billing_account} |
| `pageSize` | query | integer (int32) | no | Maximum number of billing account service to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Page token received from a previous ListBillingAccountServices call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.billingAccounts.setIamPolicy`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy for a billing account. Replaces any existing policy. The caller must have the `billing.accounts.setIamPolicy` permission on the account, which is often given to billing account administrators (https://cloud.google.com/billing/docs/how-to/billing-access).
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudbilling.billingAccounts.skuGroups.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets a SKU group visible to a billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountskugroupsV1betaBillingAccountSkuGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the BillingAccountSkuGroup to retrieve. Format: billingAccounts/{billing_account}/skuGroups/{sku_group} |

### `cloudbilling.billingAccounts.skuGroups.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+parent}/skuGroups`
- Lists SKU groups visible to a billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountskugroupsV1betaListBillingAccountSkuGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The billing account to list billing account SKU groups from. Format: billingAccounts/{billing_account} |
| `pageSize` | query | integer (int32) | no | Maximum number of billing account SKU groups to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Page token received from a previous ListBillingAccountSkuGroups call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.billingAccounts.skuGroups.skus.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets a SKU that is part of a billing account SKU group.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountskugroupskusV1betaBillingAccountSkuGroupSku`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the billing account SKU group SKU to retrieve. Format: billingAccounts/{billing_account}/skuGroups/{sku_group}/skus/{sku} |

### `cloudbilling.billingAccounts.skuGroups.skus.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+parent}/skus`
- Lists SKUs that is part of billing account SKU groups.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountskugroupskusV1betaListBillingAccountSkuGroupSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The billing account SKU group to list billing account SKU group SKUs from. Format: billingAccounts/{billing_account}/skuGroups/{sku_group} |
| `pageSize` | query | integer (int32) | no | Maximum number of billing account SKU group SKUs to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Page token received from a previous ListBillingAccountSkuGroupSkus call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.billingAccounts.skus.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets a SKU visible to a billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountskusV1betaBillingAccountSku`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the billing account SKU to retrieve. Format: billingAccounts/{billing_account}/skus/{sku} |

### `cloudbilling.billingAccounts.skus.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+parent}/skus`
- Lists SKUs visible to a billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountskusV1betaListBillingAccountSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The billing account to list billing account SKU from. Format: billingAccounts/{billing_account} |
| `filter` | query | string | no | Options for how to filter the billing account SKUs. Currently, only filter on `billing_account_service` is supported. Only !=, = operators are supported. Examples: - billing_account_service = "billingAccounts/012345-567890-ABCDEF/services/DA34-426B-A397" |
| `pageSize` | query | integer (int32) | no | Maximum number of billing account SKUs to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Page token received from a previous ListBillingAccountSkus call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.billingAccounts.skus.price.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets the latest price for SKUs available to your Cloud Billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountpricesV1betaBillingAccountPrice`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the billing account price to retrieve. Format: billingAccounts/{billing_account}/skus/{sku}/price |
| `currencyCode` | query | string | no | Optional. ISO-4217 currency code for the price. If not specified, the currency of the billing account is used. |

### `cloudbilling.billingAccounts.skus.prices.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+parent}/prices`
- Lists the latest prices for SKUs available to your Cloud Billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingBillingaccountpricesV1betaListBillingAccountPricesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. To list all Billing Account SKUs, use `-` as the SKU ID. Format: `billingAccounts/{billing_account}/skus/-` Note: Specifying an actual SKU resource id will return a collection of one Billing Account Price. |
| `currencyCode` | query | string | no | Optional. ISO-4217 currency code for the price. If not specified, currency of billing account will be used. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of billing account price to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListBillingAccountPrices call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.billingAccounts.subAccounts.create`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/{+parent}/subAccounts`
- This method creates billing subaccounts (https://cloud.google.com/billing/docs/concepts#subaccounts). Google Cloud resellers should use the Channel Services APIs, accounts.customers.create (https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers/create) and accounts.customers.entitlements.create (https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers.entitlements/create). When creating a subaccount, the current authenticated user must have the `billing.accounts.update` IAM permission on the parent account, which is typically given to billing account administrators (https://cloud.google.com/billing/docs/how-to/billing-access). This method will return an error if the parent account has not been provisioned for subaccounts.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BillingAccount`; Response: `BillingAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Optional. The parent to create a billing account from. Format: - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` |

### `cloudbilling.billingAccounts.subAccounts.list`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+parent}/subAccounts`
- Lists the billing accounts that the current authenticated user has permission to view (https://cloud.google.com/billing/docs/how-to/billing-access).
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBillingAccountsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Optional. The parent resource to list billing accounts from. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` |
| `filter` | query | string | no | Options for how to filter the returned billing accounts. This only supports filtering for subaccounts (https://cloud.google.com/billing/docs/concepts) under a single provided parent billing account. (for example, `master_billing_account=billingAccounts/012345-678901-ABCDEF`). Boolean algebra and other fields are not currently supported. |
| `pageSize` | query | integer (int32) | no | Requested page size. The maximum page size is 100; this is also the default. |
| `pageToken` | query | string | no | A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListBillingAccounts` call. If unspecified, the first page of results is returned. |

### `cloudbilling.billingAccounts.testIamPermissions`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/{+resource}:testIamPermissions`
- Tests the access control policy for a billing account. This method takes the resource and a set of permissions as input and returns the subset of the input permissions that the caller is allowed for that resource.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudbilling.message.send`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/message:send`
- Send a message to the agent. This is a blocking call that will return the task once it is completed, or a LRO if requested.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SendMessageRequest`; Response: `SendMessageResponse`

### `cloudbilling.message.stream`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/message:stream`
- SendStreamingMessage is a streaming call that will return a stream of task update events until the Task is in an interrupted or terminal state.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SendMessageRequest`; Response: `StreamResponse`

### `cloudbilling.organizations.billingAccounts.create`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/{+parent}/billingAccounts`
- This method creates billing subaccounts (https://cloud.google.com/billing/docs/concepts#subaccounts). Google Cloud resellers should use the Channel Services APIs, accounts.customers.create (https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers/create) and accounts.customers.entitlements.create (https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers.entitlements/create). When creating a subaccount, the current authenticated user must have the `billing.accounts.update` IAM permission on the parent account, which is typically given to billing account administrators (https://cloud.google.com/billing/docs/how-to/billing-access). This method will return an error if the parent account has not been provisioned for subaccounts.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BillingAccount`; Response: `BillingAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Optional. The parent to create a billing account from. Format: - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` |

### `cloudbilling.organizations.billingAccounts.list`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+parent}/billingAccounts`
- Lists the billing accounts that the current authenticated user has permission to view (https://cloud.google.com/billing/docs/how-to/billing-access).
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBillingAccountsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Optional. The parent resource to list billing accounts from. Format: - `organizations/{organization_id}`, for example, `organizations/12345678` - `billingAccounts/{billing_account_id}`, for example, `billingAccounts/012345-567890-ABCDEF` |
| `filter` | query | string | no | Options for how to filter the returned billing accounts. This only supports filtering for subaccounts (https://cloud.google.com/billing/docs/concepts) under a single provided parent billing account. (for example, `master_billing_account=billingAccounts/012345-678901-ABCDEF`). Boolean algebra and other fields are not currently supported. |
| `pageSize` | query | integer (int32) | no | Requested page size. The maximum page size is 100; this is also the default. |
| `pageToken` | query | string | no | A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListBillingAccounts` call. If unspecified, the first page of results is returned. |

### `cloudbilling.organizations.billingAccounts.move`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+destinationParent}/{+name}:move`
- Changes which parent organization a billing account belongs to.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BillingAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `destinationParent` | path | string | yes | Required. The resource name of the Organization to move the billing account under. Must be of the form `organizations/{organization_id}`. |
| `name` | path | string | yes | Required. The resource name of the billing account to move. Must be of the form `billingAccounts/{billing_account_id}`. The specified billing account cannot be a subaccount, since a subaccount always belongs to the same organization as its parent account. |

### `cloudbilling.projects.getBillingInfo`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+name}/billingInfo`
- Gets the billing information for a project. The current authenticated user must have the `resourcemanager.projects.get` permission for the project, which can be granted by assigning the Project Viewer (https://cloud.google.com/iam/docs/understanding-roles#predefined_roles) role.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ProjectBillingInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the project for which billing information is retrieved. For example, `projects/tokyo-rain-123`. |

### `cloudbilling.projects.updateBillingInfo`

- Versions: v1
- `PUT https://cloudbilling.googleapis.com/v1/{+name}/billingInfo`
- Sets or updates the billing account associated with a project. You specify the new billing account by setting the `billing_account_name` in the `ProjectBillingInfo` resource to the resource name of a billing account. Associating a project with an open billing account enables billing on the project and allows charges for resource usage. If the project already had a billing account, this method changes the billing account used for resource usage charges. \*Note:\* Incurred charges that have not yet been reported in the transaction history of the Google Cloud Console might be billed to the new billing account, even if the charge occurred before the new billing account was assigned to the project. The current authenticated user must have ownership privileges for both the \[project\](https://cloud.google.com/docs/permissions-overview#h.bgs0oxofvnoo ) and the billing account (https://cloud.google.com/billing/docs/how-to/billing-access). You can disable billing on the project by setting the `billing_account_name` field to empty. This action disassociates the current billing account from the project. Any billable activity of your in-use services will stop, and your application could stop functioning as expected. Any unbilled charges to date will be billed to the previously associated account. The current authenticated user must be either an owner of the project or an owner of the billing account for the project. Note that associating a project with a \*closed\* billing account will have much the same effect as disabling billing on the project: any paid resources used by the project will be shut down. Thus, unless you wish to disable billing, you should always call this method with the name of an \*open\* billing account.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProjectBillingInfo`; Response: `ProjectBillingInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the project associated with the billing information that you want to update. For example, `projects/tokyo-rain-123`. |

### `cloudbilling.services.list`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/services`
- Lists all public cloud services.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Requested page size. Defaults to 5000. |
| `pageToken` | query | string | no | A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListServices` call. If unspecified, the first page of results is returned. |

### `cloudbilling.services.skus.list`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+parent}/skus`
- Lists all publicly available SKUs for a given cloud service.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the service. Example: "services/6F81-5844-456A" |
| `currencyCode` | query | string | no | The ISO 4217 currency code for the pricing info in the response proto. Will use the conversion rate as of start_time. Optional. If not specified USD will be used. |
| `endTime` | query | string (google-datetime) | no | Optional exclusive end time of the time range for which the pricing versions will be returned. Timestamps in the future are not allowed. The time range has to be within a single calendar month in America/Los_Angeles timezone. Time range as a whole is optional. If not specified, the latest pricing will be returned (up to 12 hours old at most). |
| `pageSize` | query | integer (int32) | no | Requested page size. Defaults to 5000. |
| `pageToken` | query | string | no | A token identifying a page of results to return. This should be a `next_page_token` value returned from a previous `ListSkus` call. If unspecified, the first page of results is returned. |
| `startTime` | query | string (google-datetime) | no | Optional inclusive start time of the time range for which the pricing versions will be returned. Timestamps in the future are not allowed. The time range has to be within a single calendar month in America/Los_Angeles timezone. Time range as a whole is optional. If not specified, the latest pricing will be returned (up to 12 hours old at most). |

### `cloudbilling.skuGroups.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets a publicly listed SKU group.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingSkugroupsV1betaSkuGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SKU group to retrieve. Format: skuGroups/{sku_group} |

### `cloudbilling.skuGroups.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/skuGroups`
- Lists all publicly listed SKU groups.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingSkugroupsV1betaListSkuGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Maximum number of SKU groups to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Page token received from a previous ListSkuGroups call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.skuGroups.skus.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets a publicly listed SKU that is part of a publicly listed SKU group.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingSkugroupskusV1betaSkuGroupSku`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the SKU group SKU to retrieve. Format: skuGroups/{sku_group}/skus/{sku} |

### `cloudbilling.skuGroups.skus.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+parent}/skus`
- Lists all publicly listed SKUs contained by a publicly listed SKU group.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingSkugroupskusV1betaListSkuGroupSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The SkuGroup to list SkuGroupSku from. Format: skuGroups/{sku_group} |
| `pageSize` | query | integer (int32) | no | Maximum number of SKU group SKUs to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Page token received from a previous ListSkuGroupSkus call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.skus.price.get`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+name}`
- Gets the latest price for the given SKU.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingPricesV1betaPrice`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the latest price to retrieve. Format: skus/{sku}/price |
| `currencyCode` | query | string | no | Optional. ISO-4217 currency code for the price. If not specified, USD will be used. |

### `cloudbilling.skus.prices.list`

- Versions: v1beta
- `GET https://cloudbilling.googleapis.com/v1beta/{+parent}/prices`
- Lists the latest prices for all SKUs.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudBillingPricesV1betaListPricesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. To list the prices for all SKUs, use `-` as the SKU ID. Format: `skus/-` Specifying a specific SKU ID returns a collection with one Price object for the SKU. |
| `currencyCode` | query | string | no | Optional. ISO-4217 currency code for the price. If not specified, USD will be used. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of prices to return. Results may return fewer than this value. Default value is 50 and maximum value is 5000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListPrices call to retrieve the next page of results. If this field is empty, the first page is returned. |

### `cloudbilling.tasks.cancel`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/{+name}:cancel`
- Cancel a task from the agent. If supported one should expect no more task updates for the task.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelTaskRequest`; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the task to cancel. Format: tasks/{task_id} |

### `cloudbilling.tasks.get`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+name}`
- Get the current state of a task from the agent.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the task. Format: tasks/{task_id} |
| `historyLength` | query | integer (int32) | no | The number of most recent messages from the task's history to retrieve. |
| `tenant` | query | string | no | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `cloudbilling.tasks.pushNotificationConfigs.create`

- Versions: v1
- `POST https://cloudbilling.googleapis.com/v1/{+parent}`
- Set a push notification config for a task.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TaskPushNotificationConfig`; Response: `TaskPushNotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent task resource for this config. Format: tasks/{task_id} |
| `configId` | query | string | yes | Required. The ID for the new config. |
| `tenant` | query | string | no | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `cloudbilling.tasks.pushNotificationConfigs.delete`

- Versions: v1
- `DELETE https://cloudbilling.googleapis.com/v1/{+name}`
- Delete a push notification config for a task.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the config to delete. Format: tasks/{task_id}/pushNotificationConfigs/{config_id} |
| `tenant` | query | string | no | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `cloudbilling.tasks.pushNotificationConfigs.get`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+name}`
- Get a push notification config for a task.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TaskPushNotificationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the config to retrieve. Format: tasks/{task_id}/pushNotificationConfigs/{config_id} |
| `tenant` | query | string | no | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `cloudbilling.tasks.pushNotificationConfigs.list`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+parent}/pushNotificationConfigs`
- Get a list of push notifications configured for a task.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTaskPushNotificationConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The parent task resource. Format: tasks/{task_id} |
| `pageSize` | query | integer (int32) | no | For AIP-158 these fields are present. Usually not used/needed. The maximum number of configurations to return. If unspecified, all configs will be returned. |
| `pageToken` | query | string | no | A page token received from a previous ListTaskPushNotificationConfigRequest call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTaskPushNotificationConfigRequest` must match the call that provided the page token. |
| `tenant` | query | string | no | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `cloudbilling.tasks.subscribe`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/{+name}:subscribe`
- TaskSubscription is a streaming call that will return a stream of task update events. This attaches the stream to an existing in process task. If the task is complete the stream will return the completed task (like GetTask) and close the stream.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `StreamResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name of the task to subscribe to. Format: tasks/{task_id} |
| `tenant` | query | string | no | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `cloudbilling.getCard`

- Versions: v1
- `GET https://cloudbilling.googleapis.com/v1/card`
- GetAgentCard returns the agent card for the agent.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AgentCard`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `tenant` | query | string | no | Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. |

### `cloudbilling.generateInsights`

- Versions: v1beta
- `POST https://cloudbilling.googleapis.com/v1beta:generateInsights`
- Analyzes cost data for a billing account and/or specific projects. Returns a natural language summary and supporting datasets.
- Scopes: `https://www.googleapis.com/auth/cloud-billing`, `https://www.googleapis.com/auth/cloud-billing.readonly`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateInsightsRequest`; Response: `GenerateInsightsResponse`

### Example request skeleton

Generated from the Discovery entry of `cloudbilling.billingAccounts.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudbilling.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `cloudbilling` (retrieved 2026-11-14). Resources on this page: billingAccounts, message, organizations, projects, services, skuGroups, skus, tasks, v1, v1beta.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/cloudbilling/`.
- Source: https://cloudbilling.googleapis.com/$discovery/rest?version=v1, https://cloudbilling.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
