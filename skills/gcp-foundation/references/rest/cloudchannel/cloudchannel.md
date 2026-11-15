---
source: https://cloudchannel.googleapis.com/$discovery/rest?version=v1
---

# Cloud Channel API REST API (cloudchannel)

## Signature / Usage

Base URL: `https://cloudchannel.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudchannel.accounts.channelPartnerLinks.channelPartnerRepricingConfigs.create`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/channelPartnerRepricingConfigs`
- Creates a ChannelPartnerRepricingConfig. Call this method to set modifications for a specific ChannelPartner's bill. You can only create configs if the RepricingConfig.effective_invoice_month is a future month. If needed, you can create a config for the current month, with some restrictions. When creating a config for a future month, make sure there are no existing configs for that RepricingConfig.effective_invoice_month. The following restrictions are for creating configs in the current month. \* This functionality is reserved for recovering from an erroneous config, and should not be used for regular business cases. \* The new config will not modify exports used with other configs. Changes to the config may be immediate, but may take up to 24 hours. \* There is a limit of ten configs for any ChannelPartner or RepricingConfig.EntitlementGranularity.entitlement, for any RepricingConfig.effective_invoice_month. \* The contained ChannelPartnerRepricingConfig.repricing_config value must be different from the value used in the current config for a ChannelPartner. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. \* NOT_FOUND: The ChannelPartnerRepricingConfig specified does not exist or is not associated with the given account. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated ChannelPartnerRepricingConfig resource, otherwise returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ChannelPartnerRepricingConfig`; Response: `GoogleCloudChannelV1ChannelPartnerRepricingConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the ChannelPartner that will receive the repricing config. Parent uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id} |

### `cloudchannel.accounts.channelPartnerLinks.channelPartnerRepricingConfigs.delete`

- Versions: v1
- `DELETE https://cloudchannel.googleapis.com/v1/{+name}`
- Deletes the given ChannelPartnerRepricingConfig permanently. You can only delete configs if their RepricingConfig.effective_invoice_month is set to a date after the current month. Possible error codes: \* PERMISSION_DENIED: The account making the request does not own this customer. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* FAILED_PRECONDITION: The ChannelPartnerRepricingConfig is active or in the past. \* NOT_FOUND: No ChannelPartnerRepricingConfig found for the name in the request.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the channel partner repricing config rule to delete. |

### `cloudchannel.accounts.channelPartnerLinks.channelPartnerRepricingConfigs.get`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Gets information about how a Distributor modifies their bill before sending it to a ChannelPartner. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* NOT_FOUND: The ChannelPartnerRepricingConfig was not found. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the ChannelPartnerRepricingConfig resource, otherwise returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ChannelPartnerRepricingConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the ChannelPartnerRepricingConfig Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}. |

### `cloudchannel.accounts.channelPartnerLinks.channelPartnerRepricingConfigs.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/channelPartnerRepricingConfigs`
- Lists information about how a Reseller modifies their bill before sending it to a ChannelPartner. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* NOT_FOUND: The ChannelPartnerRepricingConfig specified does not exist or is not associated with the given account. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the ChannelPartnerRepricingConfig resources. The data for each resource is displayed in the ascending order of: \* Channel Partner ID \* RepricingConfig.effective_invoice_month \* ChannelPartnerRepricingConfig.update_time If unsuccessful, returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the account's ChannelPartnerLink. Parent uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}. Supports accounts/{account_id}/channelPartnerLinks/- to retrieve configs for all channel partners. |
| `filter` | query | string | no | Optional. A filter for \[CloudChannelService.ListChannelPartnerRepricingConfigs\] results (channel_partner_link only). You can use this filter when you support a BatchGet-like query. To use the filter, you must set `parent=accounts/{account_id}/channelPartnerLinks/-`. Example: `channel_partner_link = accounts/account_id/channelPartnerLinks/c1` OR `channel_partner_link = accounts/account_id/channelPartnerLinks/c2`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of repricing configs to return. The service may return fewer than this value. If unspecified, returns a maximum of 50 rules. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results beyond the first page. Obtained through ListChannelPartnerRepricingConfigsResponse.next_page_token of the previous CloudChannelService.ListChannelPartnerRepricingConfigs call. |

### `cloudchannel.accounts.channelPartnerLinks.channelPartnerRepricingConfigs.patch`

- Versions: v1
- `PATCH https://cloudchannel.googleapis.com/v1/{+name}`
- Updates a ChannelPartnerRepricingConfig. Call this method to set modifications for a specific ChannelPartner's bill. This method overwrites the existing CustomerRepricingConfig. You can only update configs if the RepricingConfig.effective_invoice_month is a future month. To make changes to configs for the current month, use CreateChannelPartnerRepricingConfig, taking note of its restrictions. You cannot update the RepricingConfig.effective_invoice_month. When updating a config in the future: \* This config must already exist. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. \* NOT_FOUND: The ChannelPartnerRepricingConfig specified does not exist or is not associated with the given account. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated ChannelPartnerRepricingConfig resource, otherwise returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ChannelPartnerRepricingConfig`; Response: `GoogleCloudChannelV1ChannelPartnerRepricingConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the ChannelPartnerRepricingConfig. Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}. |

### `cloudchannel.accounts.channelPartnerLinks.create`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/channelPartnerLinks`
- Initiates a channel partner link between a distributor and a reseller, or between resellers in an n-tier reseller channel. Invited partners need to follow the invite_link_uri provided in the response to accept. After accepting the invitation, a link is set up between the two parties. You must be a distributor to call this method. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* ALREADY_EXISTS: The ChannelPartnerLink sent in the request already exists. \* NOT_FOUND: No Cloud Identity customer exists for provided domain. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The new ChannelPartnerLink resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ChannelPartnerLink`; Response: `GoogleCloudChannelV1ChannelPartnerLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Create a channel partner link for the provided reseller account's resource name. Parent uses the format: accounts/{account_id} |

### `cloudchannel.accounts.channelPartnerLinks.customers.create`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/customers`
- Creates a new Customer resource under the reseller or distributor account. Possible error codes: \* PERMISSION_DENIED: \* The reseller account making the request is different from the reseller account in the API request. \* You are not authorized to create a customer. See https://support.google.com/channelservices/answer/9759265 \* INVALID_ARGUMENT: \* Required request parameters are missing or invalid. \* Domain field value doesn't match the primary email domain. Return value: The newly created Customer resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1Customer`; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of reseller account in which to create the customer. Parent uses the format: accounts/{account_id} |

### `cloudchannel.accounts.channelPartnerLinks.customers.delete`

- Versions: v1
- `DELETE https://cloudchannel.googleapis.com/v1/{+name}`
- Deletes the given Customer permanently. Possible error codes: \* PERMISSION_DENIED: The account making the request does not own this customer. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* FAILED_PRECONDITION: The customer has existing entitlements. \* NOT_FOUND: No Customer resource found for the name in the request.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the customer to delete. |

### `cloudchannel.accounts.channelPartnerLinks.customers.get`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Returns the requested Customer resource. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The customer resource doesn't exist. Usually the result of an invalid name parameter. Return value: The Customer resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the customer to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id} |

### `cloudchannel.accounts.channelPartnerLinks.customers.import`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/customers:import`
- Imports a Customer from the Cloud Identity associated with the provided Cloud Identity ID or domain before a TransferEntitlements call. If a linked Customer already exists and overwrite_if_exists is true, it will update that Customer's data. Possible error codes: \* PERMISSION_DENIED: \* The reseller account making the request is different from the reseller account in the API request. \* You are not authorized to import the customer. See https://support.google.com/channelservices/answer/9759265 \* NOT_FOUND: Cloud Identity doesn't exist or was deleted. \* INVALID_ARGUMENT: Required parameters are missing, or the auth_token is expired or invalid. \* ALREADY_EXISTS: A customer already exists and has conflicting critical fields. Requires an overwrite. Return value: The Customer.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ImportCustomerRequest`; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller's account. Parent takes the format: accounts/{account_id} or accounts/{account_id}/channelPartnerLinks/{channel_partner_id} |

### `cloudchannel.accounts.channelPartnerLinks.customers.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/customers`
- List Customers. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: List of Customers, or an empty list if there are no customers.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListCustomersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller account to list customers from. Parent uses the format: accounts/{account_id}. |
| `filter` | query | string | no | Optional. Filters applied to the \[CloudChannelService.ListCustomers\] results. See https://cloud.google.com/channel/docs/concepts/google-cloud/filter-customers for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of customers to return. The service may return fewer than this value. If unspecified, returns at most 10 customers. The maximum value is 50. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results other than the first page. Obtained through ListCustomersResponse.next_page_token of the previous CloudChannelService.ListCustomers call. |

### `cloudchannel.accounts.channelPartnerLinks.customers.patch`

- Versions: v1
- `PATCH https://cloudchannel.googleapis.com/v1/{+name}`
- Updates an existing Customer resource for the reseller or distributor. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: No Customer resource found for the name in the request. Return value: The updated Customer resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1Customer`; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} |
| `updateMask` | query | string (google-fieldmask) | no | The update mask that applies to the resource. Optional. |

### `cloudchannel.accounts.channelPartnerLinks.get`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Returns the requested ChannelPartnerLink resource. You must be a distributor to call this method. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: ChannelPartnerLink resource not found because of an invalid channel partner link name. Return value: The ChannelPartnerLink resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ChannelPartnerLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the channel partner link to retrieve. Name uses the format: accounts/{account_id}/channelPartnerLinks/{id} where {id} is the Cloud Identity ID of the partner. |
| `view` | query | string enum | no | Optional. The level of granularity the ChannelPartnerLink will display. Values: `UNSPECIFIED`, `BASIC`, `FULL`. |

### `cloudchannel.accounts.channelPartnerLinks.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/channelPartnerLinks`
- List ChannelPartnerLinks belonging to a distributor. You must be a distributor to call this method. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: The list of the distributor account's ChannelPartnerLink resources.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListChannelPartnerLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller account for listing channel partner links. Parent uses the format: accounts/{account_id} |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server might return fewer results than requested. If unspecified, server will pick a default size (25). The maximum value is 200; the server will coerce values above 200. |
| `pageToken` | query | string | no | Optional. A token for a page of results other than the first page. Obtained using ListChannelPartnerLinksResponse.next_page_token of the previous CloudChannelService.ListChannelPartnerLinks call. |
| `view` | query | string enum | no | Optional. The level of granularity the ChannelPartnerLink will display. Values: `UNSPECIFIED`, `BASIC`, `FULL`. |

### `cloudchannel.accounts.channelPartnerLinks.patch`

- Versions: v1
- `PATCH https://cloudchannel.googleapis.com/v1/{+name}`
- Updates a channel partner link. Distributors call this method to change a link's status. For example, to suspend a partner link. You must be a distributor to call this method. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: \* Required request parameters are missing or invalid. \* Link state cannot change from invited to active or suspended. \* Cannot send reseller_cloud_identity_id, invite_url, or name in update mask. \* NOT_FOUND: ChannelPartnerLink resource not found. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The updated ChannelPartnerLink resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1UpdateChannelPartnerLinkRequest`; Response: `GoogleCloudChannelV1ChannelPartnerLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the channel partner link to cancel. Name uses the format: accounts/{account_id}/channelPartnerLinks/{id} where {id} is the Cloud Identity ID of the partner. |

### `cloudchannel.accounts.checkCloudIdentityAccountsExist`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}:checkCloudIdentityAccountsExist`
- Confirms the existence of Cloud Identity accounts based on the domain and if the Cloud Identity accounts are owned by the reseller. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* INVALID_VALUE: Invalid domain value in the request. Return value: A list of CloudIdentityCustomerAccount resources for the domain (may be empty) Note: in the v1alpha1 version of the API, a NOT_FOUND error returns if no CloudIdentityCustomerAccount resources match the domain.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest`; Response: `GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The reseller account's resource name. Parent uses the format: accounts/{account_id} |

### `cloudchannel.accounts.customers.create`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/customers`
- Creates a new Customer resource under the reseller or distributor account. Possible error codes: \* PERMISSION_DENIED: \* The reseller account making the request is different from the reseller account in the API request. \* You are not authorized to create a customer. See https://support.google.com/channelservices/answer/9759265 \* INVALID_ARGUMENT: \* Required request parameters are missing or invalid. \* Domain field value doesn't match the primary email domain. Return value: The newly created Customer resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1Customer`; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of reseller account in which to create the customer. Parent uses the format: accounts/{account_id} |

### `cloudchannel.accounts.customers.customerRepricingConfigs.create`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/customerRepricingConfigs`
- Creates a CustomerRepricingConfig. Call this method to set modifications for a specific customer's bill. You can only create configs if the RepricingConfig.effective_invoice_month is a future month. If needed, you can create a config for the current month, with some restrictions. When creating a config for a future month, make sure there are no existing configs for that RepricingConfig.effective_invoice_month. The following restrictions are for creating configs in the current month. \* This functionality is reserved for recovering from an erroneous config, and should not be used for regular business cases. \* The new config will not modify exports used with other configs. Changes to the config may be immediate, but may take up to 24 hours. \* There is a limit of ten configs for any RepricingConfig.EntitlementGranularity.entitlement, for any RepricingConfig.effective_invoice_month. \* The contained CustomerRepricingConfig.repricing_config value must be different from the value used in the current config for a RepricingConfig.EntitlementGranularity.entitlement. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. \* NOT_FOUND: The CustomerRepricingConfig specified does not exist or is not associated with the given account. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated CustomerRepricingConfig resource, otherwise returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1CustomerRepricingConfig`; Response: `GoogleCloudChannelV1CustomerRepricingConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the customer that will receive this repricing config. Parent uses the format: accounts/{account_id}/customers/{customer_id} |

### `cloudchannel.accounts.customers.customerRepricingConfigs.delete`

- Versions: v1
- `DELETE https://cloudchannel.googleapis.com/v1/{+name}`
- Deletes the given CustomerRepricingConfig permanently. You can only delete configs if their RepricingConfig.effective_invoice_month is set to a date after the current month. Possible error codes: \* PERMISSION_DENIED: The account making the request does not own this customer. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* FAILED_PRECONDITION: The CustomerRepricingConfig is active or in the past. \* NOT_FOUND: No CustomerRepricingConfig found for the name in the request.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the customer repricing config rule to delete. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. |

### `cloudchannel.accounts.customers.customerRepricingConfigs.get`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Gets information about how a Reseller modifies their bill before sending it to a Customer. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* NOT_FOUND: The CustomerRepricingConfig was not found. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the CustomerRepricingConfig resource, otherwise returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1CustomerRepricingConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. |

### `cloudchannel.accounts.customers.customerRepricingConfigs.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/customerRepricingConfigs`
- Lists information about how a Reseller modifies their bill before sending it to a Customer. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* NOT_FOUND: The CustomerRepricingConfig specified does not exist or is not associated with the given account. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the CustomerRepricingConfig resources. The data for each resource is displayed in the ascending order of: \* Customer ID \* RepricingConfig.EntitlementGranularity.entitlement \* RepricingConfig.effective_invoice_month \* CustomerRepricingConfig.update_time If unsuccessful, returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListCustomerRepricingConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the customer. Parent uses the format: accounts/{account_id}/customers/{customer_id}. Supports accounts/{account_id}/customers/- to retrieve configs for all customers. |
| `filter` | query | string | no | Optional. A filter for \[CloudChannelService.ListCustomerRepricingConfigs\] results (customer only). You can use this filter when you support a BatchGet-like query. To use the filter, you must set `parent=accounts/{account_id}/customers/-`. Example: customer = accounts/account_id/customers/c1 OR customer = accounts/account_id/customers/c2. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of repricing configs to return. The service may return fewer than this value. If unspecified, returns a maximum of 50 rules. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results beyond the first page. Obtained through ListCustomerRepricingConfigsResponse.next_page_token of the previous CloudChannelService.ListCustomerRepricingConfigs call. |

### `cloudchannel.accounts.customers.customerRepricingConfigs.patch`

- Versions: v1
- `PATCH https://cloudchannel.googleapis.com/v1/{+name}`
- Updates a CustomerRepricingConfig. Call this method to set modifications for a specific customer's bill. This method overwrites the existing CustomerRepricingConfig. You can only update configs if the RepricingConfig.effective_invoice_month is a future month. To make changes to configs for the current month, use CreateCustomerRepricingConfig, taking note of its restrictions. You cannot update the RepricingConfig.effective_invoice_month. When updating a config in the future: \* This config must already exist. Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different. \* INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. \* NOT_FOUND: The CustomerRepricingConfig specified does not exist or is not associated with the given account. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated CustomerRepricingConfig resource, otherwise returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1CustomerRepricingConfig`; Response: `GoogleCloudChannelV1CustomerRepricingConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. |

### `cloudchannel.accounts.customers.delete`

- Versions: v1
- `DELETE https://cloudchannel.googleapis.com/v1/{+name}`
- Deletes the given Customer permanently. Possible error codes: \* PERMISSION_DENIED: The account making the request does not own this customer. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* FAILED_PRECONDITION: The customer has existing entitlements. \* NOT_FOUND: No Customer resource found for the name in the request.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the customer to delete. |

### `cloudchannel.accounts.customers.entitlements.activate`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:activate`
- Activates a previously suspended entitlement. Entitlements suspended for pending ToS acceptance can't be activated using this method. An entitlement activation is a long-running operation and it updates the state of the customer entitlement. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: Entitlement resource not found. \* SUSPENSION_NOT_RESELLER_INITIATED: Can only activate reseller-initiated suspensions and entitlements that have accepted the TOS. \* NOT_SUSPENDED: Can only activate suspended entitlements not in an ACTIVE state. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ActivateEntitlementRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement to activate. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.cancel`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:cancel`
- Cancels a previously fulfilled entitlement. An entitlement cancellation is a long-running operation. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* FAILED_PRECONDITION: There are Google Cloud projects linked to the Google Cloud entitlement's Cloud Billing subaccount. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: Entitlement resource not found. \* DELETION_TYPE_NOT_ALLOWED: Cancel is only allowed for Google Workspace add-ons, or entitlements for Google Cloud's development platform. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The response will contain google.protobuf.Empty on success. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1CancelEntitlementRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement to cancel. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.changeOffer`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:changeOffer`
- Updates the Offer for an existing customer entitlement. An entitlement update is a long-running operation and it updates the entitlement as a result of fulfillment. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: Offer or Entitlement resource not found. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ChangeOfferRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.changeParameters`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:changeParameters`
- Change parameters of the entitlement. An entitlement update is a long-running operation and it updates the entitlement as a result of fulfillment. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. For example, the number of seats being changed is greater than the allowed number of max seats, or decreasing seats for a commitment based plan. \* NOT_FOUND: Entitlement resource not found. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ChangeParametersRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.changeRenewalSettings`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:changeRenewalSettings`
- Updates the renewal settings for an existing customer entitlement. An entitlement update is a long-running operation and it updates the entitlement as a result of fulfillment. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: Entitlement resource not found. \* NOT_COMMITMENT_PLAN: Renewal Settings are only applicable for a commitment plan. Can't enable or disable renewals for non-commitment plans. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ChangeRenewalSettingsRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.create`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/entitlements`
- Creates an entitlement for a customer. Possible error codes: \* PERMISSION_DENIED: \* The customer doesn't belong to the reseller. \* The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 \* INVALID_ARGUMENT: \* Required request parameters are missing or invalid. \* There is already a customer entitlement for a SKU from the same product family. \* INVALID_VALUE: Make sure the OfferId is valid. If it is, contact Google Channel support for further troubleshooting. \* NOT_FOUND: The customer or offer resource was not found. \* ALREADY_EXISTS: \* The SKU was already purchased for the customer. \* The customer's primary email already exists. Retry after changing the customer's primary contact email. \* CONDITION_NOT_MET or FAILED_PRECONDITION: \* The domain required for purchasing a SKU has not been verified. \* A pre-requisite SKU required to purchase an Add-On SKU is missing. For example, Google Workspace Business Starter is required to purchase Vault or Drive. \* (Developer accounts only) Reseller and resold domain must meet the following naming requirements: \* Domain names must start with goog-test. \* Domain names must include the reseller domain. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1CreateEntitlementRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller's customer account in which to create the entitlement. Parent uses the format: accounts/{account_id}/customers/{customer_id} |

### `cloudchannel.accounts.customers.entitlements.get`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Returns the requested Entitlement resource. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The customer entitlement was not found. Return value: The requested Entitlement resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1Entitlement`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/entitlements`
- Lists Entitlements belonging to a customer. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: A list of the customer's Entitlements.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListEntitlementsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller's customer account to list entitlements for. Parent uses the format: accounts/{account_id}/customers/{customer_id} |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server might return fewer results than requested. If unspecified, return at most 50 entitlements. The maximum value is 100; the server will coerce values above 100. |
| `pageToken` | query | string | no | Optional. A token for a page of results other than the first page. Obtained using ListEntitlementsResponse.next_page_token of the previous CloudChannelService.ListEntitlements call. |

### `cloudchannel.accounts.customers.entitlements.listEntitlementChanges`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}:listEntitlementChanges`
- List entitlement history. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different. \* INVALID_ARGUMENT: Missing or invalid required fields in the request. \* NOT_FOUND: The parent resource doesn't exist. Usually the result of an invalid name parameter. \* INTERNAL: Any non-user error related to a technical issue in the backend. In this case, contact CloudChannel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. Return value: List of EntitlementChanges.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListEntitlementChangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the entitlement for which to list entitlement changes. The `-` wildcard may be used to match entitlements across a customer. Formats: \* accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} \* accounts/{account_id}/customers/{customer_id}/entitlements/- |
| `filter` | query | string | no | Optional. Filters applied to the list results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of entitlement changes to return. The service may return fewer than this value. If unspecified, returns at most 10 entitlement changes. The maximum value is 50; the server will coerce values above 50. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous CloudChannelService.ListEntitlementChanges call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to CloudChannelService.ListEntitlementChanges must match the call that provided the page token. |

### `cloudchannel.accounts.customers.entitlements.lookupOffer`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+entitlement}:lookupOffer`
- Returns the requested Offer resource. Possible error codes: \* PERMISSION_DENIED: The entitlement doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: Entitlement or offer was not found. Return value: The Offer resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1Offer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `entitlement` | path | string | yes | Required. The resource name of the entitlement to retrieve the Offer. Entitlement uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.startPaidService`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:startPaidService`
- Starts paid service for a trial entitlement. Starts paid service for a trial entitlement immediately. This method is only applicable if a plan is set up for a trial entitlement but has some trial days remaining. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: Entitlement resource not found. \* FAILED_PRECONDITION/NOT_IN_TRIAL: This method only works for entitlement on trial plans. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1StartPaidServiceRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the entitlement to start a paid service for. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.entitlements.suspend`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:suspend`
- Suspends a previously fulfilled entitlement. An entitlement suspension is a long-running operation. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: Entitlement resource not found. \* NOT_ACTIVE: Entitlement is not active. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1SuspendEntitlementRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the entitlement to suspend. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `cloudchannel.accounts.customers.get`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Returns the requested Customer resource. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The customer resource doesn't exist. Usually the result of an invalid name parameter. Return value: The Customer resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the customer to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id} |

### `cloudchannel.accounts.customers.import`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}/customers:import`
- Imports a Customer from the Cloud Identity associated with the provided Cloud Identity ID or domain before a TransferEntitlements call. If a linked Customer already exists and overwrite_if_exists is true, it will update that Customer's data. Possible error codes: \* PERMISSION_DENIED: \* The reseller account making the request is different from the reseller account in the API request. \* You are not authorized to import the customer. See https://support.google.com/channelservices/answer/9759265 \* NOT_FOUND: Cloud Identity doesn't exist or was deleted. \* INVALID_ARGUMENT: Required parameters are missing, or the auth_token is expired or invalid. \* ALREADY_EXISTS: A customer already exists and has conflicting critical fields. Requires an overwrite. Return value: The Customer.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ImportCustomerRequest`; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller's account. Parent takes the format: accounts/{account_id} or accounts/{account_id}/channelPartnerLinks/{channel_partner_id} |

### `cloudchannel.accounts.customers.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/customers`
- List Customers. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: List of Customers, or an empty list if there are no customers.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListCustomersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller account to list customers from. Parent uses the format: accounts/{account_id}. |
| `filter` | query | string | no | Optional. Filters applied to the \[CloudChannelService.ListCustomers\] results. See https://cloud.google.com/channel/docs/concepts/google-cloud/filter-customers for more information. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of customers to return. The service may return fewer than this value. If unspecified, returns at most 10 customers. The maximum value is 50. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results other than the first page. Obtained through ListCustomersResponse.next_page_token of the previous CloudChannelService.ListCustomers call. |

### `cloudchannel.accounts.customers.listPurchasableOffers`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+customer}:listPurchasableOffers`
- Lists the following: \* Offers that you can purchase for a customer. \* Offers that you can change for an entitlement. Possible error codes: \* PERMISSION_DENIED: \* The customer doesn't belong to the reseller \* The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 \* INVALID_ARGUMENT: Required request parameters are missing or invalid.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListPurchasableOffersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `customer` | path | string | yes | Required. The resource name of the customer to list Offers for. Format: accounts/{account_id}/customers/{customer_id}. |
| `changeOfferPurchase.billingAccount` | query | string | no | Optional. Resource name of the new target Billing Account. Provide this Billing Account when setting up billing for a trial subscription. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. This field is only relevant for multi-currency accounts. It should be left empty for single currency accounts. |
| `changeOfferPurchase.entitlement` | query | string | conditional | Required. Resource name of the entitlement. Format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |
| `changeOfferPurchase.newSku` | query | string | no | Optional. Resource name of the new target SKU. Provide this SKU when upgrading or downgrading an entitlement. Format: products/{product_id}/skus/{sku_id} |
| `createEntitlementPurchase.billingAccount` | query | string | no | Optional. Billing account that the result should be restricted to. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. |
| `createEntitlementPurchase.sku` | query | string | conditional | Required. SKU that the result should be restricted to. Format: products/{product_id}/skus/{sku_id}. |
| `languageCode` | query | string | no | Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 Offers. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | query | string | no | Optional. A token for a page of results other than the first page. |

### `cloudchannel.accounts.customers.listPurchasableSkus`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+customer}:listPurchasableSkus`
- Lists the following: \* SKUs that you can purchase for a customer \* SKUs that you can upgrade or downgrade for an entitlement. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListPurchasableSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `customer` | path | string | yes | Required. The resource name of the customer to list SKUs for. Format: accounts/{account_id}/customers/{customer_id}. |
| `changeOfferPurchase.changeType` | query | string enum | conditional | Required. Change Type for the entitlement. Values: `CHANGE_TYPE_UNSPECIFIED`, `UPGRADE`, `DOWNGRADE`. |
| `changeOfferPurchase.entitlement` | query | string | conditional | Required. Resource name of the entitlement. Format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |
| `createEntitlementPurchase.product` | query | string | conditional | Required. List SKUs belonging to this Product. Format: products/{product_id}. Supports products/- to retrieve SKUs for all products. |
| `languageCode` | query | string | no | Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 SKUs. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | query | string | no | Optional. A token for a page of results other than the first page. |

### `cloudchannel.accounts.customers.patch`

- Versions: v1
- `PATCH https://cloudchannel.googleapis.com/v1/{+name}`
- Updates an existing Customer resource for the reseller or distributor. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: No Customer resource found for the name in the request. Return value: The updated Customer resource.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1Customer`; Response: `GoogleCloudChannelV1Customer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} |
| `updateMask` | query | string (google-fieldmask) | no | The update mask that applies to the resource. Optional. |

### `cloudchannel.accounts.customers.provisionCloudIdentity`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+customer}:provisionCloudIdentity`
- Creates a Cloud Identity for the given customer using the customer's information, or the information provided here. Possible error codes: \* PERMISSION_DENIED: \* The customer doesn't belong to the reseller. \* You are not authorized to provision cloud identity id. See https://support.google.com/channelservices/answer/9759265 \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The customer was not found. \* ALREADY_EXISTS: The customer's primary email already exists. Retry after changing the customer's primary contact email. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata contains an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ProvisionCloudIdentityRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `customer` | path | string | yes | Required. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} |

### `cloudchannel.accounts.customers.queryEligibleBillingAccounts`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+customer}:queryEligibleBillingAccounts`
- Lists the billing accounts that are eligible to purchase particular SKUs for a given customer. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: Based on the provided list of SKUs, returns a list of SKU groups that must be purchased using the same billing account and the billing accounts eligible to purchase each SKU group.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1QueryEligibleBillingAccountsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `customer` | path | string | yes | Required. The resource name of the customer to list eligible billing accounts for. Format: accounts/{account_id}/customers/{customer_id}. |
| `skus` | query | repeated string | yes | Required. List of SKUs to list eligible billing accounts for. At least one SKU is required. Format: products/{product_id}/skus/{sku_id}. |

### `cloudchannel.accounts.customers.transferEntitlements`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}:transferEntitlements`
- Transfers customer entitlements to new reseller. Possible error codes: \* PERMISSION_DENIED: \* The customer doesn't belong to the reseller. \* The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The customer or offer resource was not found. \* ALREADY_EXISTS: The SKU was already transferred for the customer. \* CONDITION_NOT_MET or FAILED_PRECONDITION: \* The SKU requires domain verification to transfer, but the domain is not verified. \* An Add-On SKU (example, Vault or Drive) is missing the pre-requisite SKU (example, G Suite Basic). \* (Developer accounts only) Reseller and resold domain must meet the following naming requirements: \* Domain names must start with goog-test. \* Domain names must include the reseller domain. \* Specify all transferring entitlements. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1TransferEntitlementsRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller's customer account that will receive transferred entitlements. Parent uses the format: accounts/{account_id}/customers/{customer_id} |

### `cloudchannel.accounts.customers.transferEntitlementsToGoogle`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}:transferEntitlementsToGoogle`
- Transfers customer entitlements from their current reseller to Google. Possible error codes: \* PERMISSION_DENIED: The customer doesn't belong to the reseller. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The customer or offer resource was not found. \* ALREADY_EXISTS: The SKU was already transferred for the customer. \* CONDITION_NOT_MET or FAILED_PRECONDITION: \* The SKU requires domain verification to transfer, but the domain is not verified. \* An Add-On SKU (example, Vault or Drive) is missing the pre-requisite SKU (example, G Suite Basic). \* (Developer accounts only) Reseller and resold domain must meet the following naming requirements: \* Domain names must start with goog-test. \* Domain names must include the reseller domain. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The response will contain google.protobuf.Empty on success. The Operation metadata will contain an instance of OperationMetadata.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1TransferEntitlementsToGoogleRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller's customer account where the entitlements transfer from. Parent uses the format: accounts/{account_id}/customers/{customer_id} |

### `cloudchannel.accounts.listSubscribers`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+account}:listSubscribers`
- Lists service accounts with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The topic resource doesn't exist. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: A list of service email addresses.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListSubscribersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `account` | path | string | conditional | Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. |
| `integrator` | query | string | conditional | Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of service accounts to return. The service may return fewer than this value. If unspecified, returns at most 100 service accounts. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSubscribers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscribers` must match the call that provided the page token. |

### `cloudchannel.accounts.listTransferableOffers`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}:listTransferableOffers`
- List TransferableOffers of a customer based on Cloud Identity ID or Customer Name in the request. Use this method when a reseller gets the entitlement information of an unowned customer. The reseller should provide the customer's Cloud Identity ID or Customer Name. Possible error codes: \* PERMISSION_DENIED: \* The customer doesn't belong to the reseller and has no auth token. \* The customer provided incorrect reseller information when generating auth token. \* The reseller account making the request is different from the reseller account in the query. \* The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 \* INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: List of TransferableOffer for the given customer and SKU.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ListTransferableOffersRequest`; Response: `GoogleCloudChannelV1ListTransferableOffersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller's account. |

### `cloudchannel.accounts.listTransferableSkus`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+parent}:listTransferableSkus`
- List TransferableSkus of a customer based on the Cloud Identity ID or Customer Name in the request. Use this method to list the entitlements information of an unowned customer. You should provide the customer's Cloud Identity ID or Customer Name. Possible error codes: \* PERMISSION_DENIED: \* The customer doesn't belong to the reseller and has no auth token. \* The supplied auth token is invalid. \* The reseller account making the request is different from the reseller account in the query. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: A list of the customer's TransferableSku.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1ListTransferableSkusRequest`; Response: `GoogleCloudChannelV1ListTransferableSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The reseller account's resource name. Parent uses the format: accounts/{account_id} |

### `cloudchannel.accounts.offers.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/offers`
- Lists the Offers the reseller can sell. Possible error codes: \* INVALID_ARGUMENT: Required request parameters are missing or invalid.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListOffersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the reseller account from which to list Offers. Parent uses the format: accounts/{account_id}. |
| `filter` | query | string | no | Optional. The expression to filter results by name (name of the Offer), sku.name (name of the SKU), or sku.product.name (name of the Product). Example 1: sku.product.name=products/p1 AND sku.name!=products/p1/skus/s1 Example 2: name=accounts/a1/offers/o1 |
| `languageCode` | query | string | no | Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 500 Offers. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | query | string | no | Optional. A token for a page of results other than the first page. |
| `showFutureOffers` | query | boolean | no | Optional. A boolean flag that determines if a response returns future offers 30 days from now. If the show_future_offers is true, the response will only contain offers that are scheduled to be available 30 days from now. |

### `cloudchannel.accounts.register`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+account}:register`
- Registers a service account with subscriber privileges on the Pub/Sub topic for this Channel Services account or integrator. After you create a subscriber, you get the events through SubscriberEvent Possible error codes: \* PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name with the registered service email address.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1RegisterSubscriberRequest`; Response: `GoogleCloudChannelV1RegisterSubscriberResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `account` | path | string | conditional | Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. |

### `cloudchannel.accounts.reportJobs.fetchReportResults`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+reportJob}:fetchReportResults`
- Retrieves data generated by CloudChannelReportsService.RunReportJob. Deprecated: Please use Export Channel Services data to BigQuery (https://cloud.google.com/channel/docs/rebilling/export-data-to-bigquery) instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/apps.reports.usage.readonly`
- Request: `GoogleCloudChannelV1FetchReportResultsRequest`; Response: `GoogleCloudChannelV1FetchReportResultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `reportJob` | path | string | yes | Required. The report job created by CloudChannelReportsService.RunReportJob. Report_job uses the format: accounts/{account_id}/reportJobs/{report_job_id} |

### `cloudchannel.accounts.reports.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/reports`
- Lists the reports that RunReportJob can run. These reports include an ID, a description, and the list of columns that will be in the result. Deprecated: Please use Export Channel Services data to BigQuery (https://cloud.google.com/channel/docs/rebilling/export-data-to-bigquery) instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/apps.reports.usage.readonly`
- Request: —; Response: `GoogleCloudChannelV1ListReportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the partner account to list available reports for. Parent uses the format: accounts/{account_id} |
| `languageCode` | query | string | no | Optional. The BCP-47 language code, such as "en-US". If specified, the response is localized to the corresponding language code if the original data sources support it. Default is "en-US". |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size of the report. The server might return fewer results than requested. If unspecified, returns 20 reports. The maximum value is 100. |
| `pageToken` | query | string | no | Optional. A token that specifies a page of results beyond the first page. Obtained through ListReportsResponse.next_page_token of the previous CloudChannelReportsService.ListReports call. |

### `cloudchannel.accounts.reports.run`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:run`
- Begins generation of data for a given report. The report identifier is a UID (for example, `613bf59q`). Possible error codes: \* PERMISSION_DENIED: The user doesn't have access to this report. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The report identifier was not found. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata contains an instance of OperationMetadata. To get the results of report generation, call CloudChannelReportsService.FetchReportResults with the RunReportJobResponse.report_job. Deprecated: Please use Export Channel Services data to BigQuery (https://cloud.google.com/channel/docs/rebilling/export-data-to-bigquery) instead.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/apps.reports.usage.readonly`
- Request: `GoogleCloudChannelV1RunReportJobRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The report's resource name. Specifies the account and report used to generate report data. The report_id identifier is a UID (for example, `613bf59q`). Name uses the format: accounts/{account_id}/reports/{report_id} |

### `cloudchannel.accounts.skuGroups.billableSkus.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/billableSkus`
- Lists the Billable SKUs in a given SKU group. Possible error codes: PERMISSION_DENIED: If the account making the request and the account being queried for are different, or the account doesn't exist. INVALID_ARGUMENT: Missing or invalid required parameters in the request. INTERNAL: Any non-user error related to technical issue in the backend. In this case, contact cloud channel support. Return Value: If successful, the BillableSku resources. The data for each resource is displayed in the ascending order of: \* BillableSku.service_display_name \* BillableSku.sku_display_name If unsuccessful, returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListSkuGroupBillableSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the SKU group. Format: accounts/{account}/skuGroups/{sku_group}. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of SKUs to return. The service may return fewer than this value. If unspecified, returns a maximum of 100000 SKUs. The maximum value is 100000; values above 100000 will be coerced to 100000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results beyond the first page. Obtained through ListSkuGroupBillableSkusResponse.next_page_token of the previous CloudChannelService.ListSkuGroupBillableSkus call. |

### `cloudchannel.accounts.skuGroups.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/skuGroups`
- Lists the Rebilling supported SKU groups the account is authorized to sell. Reference: https://cloud.google.com/skus/sku-groups Possible Error Codes: \* PERMISSION_DENIED: If the account making the request and the account being queried are different, or the account doesn't exist. \* INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the SkuGroup resources. The data for each resource is displayed in the alphabetical order of SKU group display name. The data for each resource is displayed in the ascending order of SkuGroup.display_name If unsuccessful, returns an error.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListSkuGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the account from which to list SKU groups. Parent uses the format: accounts/{account}. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of SKU groups to return. The service may return fewer than this value. If unspecified, returns a maximum of 1000 SKU groups. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results beyond the first page. Obtained through ListSkuGroupsResponse.next_page_token of the previous CloudChannelService.ListSkuGroups call. |

### `cloudchannel.accounts.unregister`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+account}:unregister`
- Unregisters a service account with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. If there are no service accounts left with subscriber privileges, this deletes the topic. You can call ListSubscribers to check for these accounts. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The topic resource doesn't exist. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name that unregistered the service email address. Returns a success response if the service email address wasn't registered with the topic.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1UnregisterSubscriberRequest`; Response: `GoogleCloudChannelV1UnregisterSubscriberResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `account` | path | string | conditional | Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. |

### `cloudchannel.integrators.listSubscribers`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+integrator}:listSubscribers`
- Lists service accounts with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The topic resource doesn't exist. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: A list of service email addresses.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListSubscribersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `integrator` | path | string | conditional | Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. |
| `account` | query | string | conditional | Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of service accounts to return. The service may return fewer than this value. If unspecified, returns at most 100 service accounts. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSubscribers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscribers` must match the call that provided the page token. |

### `cloudchannel.integrators.registerSubscriber`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+integrator}:registerSubscriber`
- Registers a service account with subscriber privileges on the Pub/Sub topic for this Channel Services account or integrator. After you create a subscriber, you get the events through SubscriberEvent Possible error codes: \* PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name with the registered service email address.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1RegisterSubscriberRequest`; Response: `GoogleCloudChannelV1RegisterSubscriberResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `integrator` | path | string | conditional | Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. |

### `cloudchannel.integrators.unregisterSubscriber`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+integrator}:unregisterSubscriber`
- Unregisters a service account with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. If there are no service accounts left with subscriber privileges, this deletes the topic. You can call ListSubscribers to check for these accounts. Possible error codes: \* PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. \* INVALID_ARGUMENT: Required request parameters are missing or invalid. \* NOT_FOUND: The topic resource doesn't exist. \* INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. \* UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name that unregistered the service email address. Returns a success response if the service email address wasn't registered with the topic.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleCloudChannelV1UnregisterSubscriberRequest`; Response: `GoogleCloudChannelV1UnregisterSubscriberResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `integrator` | path | string | conditional | Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. |

### `cloudchannel.operations.cancel`

- Versions: v1
- `POST https://cloudchannel.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `cloudchannel.operations.delete`

- Versions: v1
- `DELETE https://cloudchannel.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `cloudchannel.operations.get`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudchannel.operations.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `cloudchannel.products.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/products`
- Lists the Products the reseller is authorized to sell. Possible error codes: \* INVALID_ARGUMENT: Required request parameters are missing or invalid.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListProductsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `account` | query | string | yes | Required. The resource name of the reseller account. Format: accounts/{account_id}. |
| `languageCode` | query | string | no | Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 Products. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | query | string | no | Optional. A token for a page of results other than the first page. |

### `cloudchannel.products.skus.list`

- Versions: v1
- `GET https://cloudchannel.googleapis.com/v1/{+parent}/skus`
- Lists the SKUs for a product the reseller is authorized to sell. Possible error codes: \* INVALID_ARGUMENT: Required request parameters are missing or invalid.
- Scopes: `https://www.googleapis.com/auth/apps.order`
- Request: —; Response: `GoogleCloudChannelV1ListSkusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the Product to list SKUs for. Parent uses the format: products/{product_id}. Supports products/- to retrieve SKUs for all products. |
| `account` | query | string | yes | Required. Resource name of the reseller. Format: accounts/{account_id}. |
| `languageCode` | query | string | no | Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 SKUs. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | query | string | no | Optional. A token for a page of results other than the first page. Optional. |

### Example request skeleton

Generated from the Discovery entry of `cloudchannel.accounts.channelPartnerLinks.channelPartnerRepricingConfigs.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudchannel.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudchannel` (retrieved 2026-11-14). Resources on this page: accounts, integrators, operations, products.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when a path variable is described as optional (the method then also accepts the URL without that segment, as its description says).
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/cloudchannel/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `cloudchannel.accounts.reportJobs.fetchReportResults`, `cloudchannel.accounts.reports.list`, `cloudchannel.accounts.reports.run`. Avoid them in new code.
- Source: https://cloudchannel.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
