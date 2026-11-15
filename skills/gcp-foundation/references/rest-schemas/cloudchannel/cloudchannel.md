---
source: https://cloudchannel.googleapis.com/$discovery/rest?version=v1
---

# Cloud Channel API message schemas (cloudchannel)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudchannel/`.

### `GoogleCloudChannelV1ActivateEntitlementRequest`

- Request message for CloudChannelService.ActivateEntitlement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1AdminUser`

- Information needed to create an Admin User for Google Workspace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Primary email of the admin user. |
| `familyName` | string | Family name of the admin user. |
| `givenName` | string | Given name of the admin user. |

### `GoogleCloudChannelV1AssociationInfo`

- Association links that an entitlement has to other entitlements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseEntitlement` | string | The name of the base entitlement, for which this entitlement is an add-on. |

### `GoogleCloudChannelV1BillableSku`

- Represents the Billable SKU information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `service` | string | Resource name of Service which contains Repricing SKU. Format: services/{service}. Example: "services/B7D9-FDCB-15D8". |
| `serviceDisplayName` | string | Unique human readable name for the Service. |
| `sku` | string | Resource name of Billable SKU. Format: billableSkus/{sku}. Example: billableSkus/6E1B-6634-470F". |
| `skuDisplayName` | string | Unique human readable name for the SKU. |

### `GoogleCloudChannelV1BillingAccount`

- Represents a billing account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when this billing account was created. |
| `currencyCode` | string | Output only. The 3-letter currency code defined in ISO 4217. |
| `displayName` | string | Display name of the billing account. |
| `name` | string | Output only. Resource name of the billing account. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. |
| `regionCode` | string | Output only. The CLDR region code. |

### `GoogleCloudChannelV1BillingAccountPurchaseInfo`

- Represents a billing account that can be used to make a purchase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccount` | GoogleCloudChannelV1BillingAccount | The billing account resource. |

### `GoogleCloudChannelV1CancelEntitlementRequest`

- Request message for CloudChannelService.CancelEntitlement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1ChangeOfferRequest`

- Request message for CloudChannelService.ChangeOffer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccount` | string | Optional. The billing account resource name that is used to pay for this entitlement when setting up billing on a trial subscription. This field is only relevant for multi-currency accounts. It should be left empty for single currency accounts. |
| `offer` | string | Required. New Offer. Format: accounts/{account_id}/offers/{offer_id}. |
| `parameters` | array<GoogleCloudChannelV1Parameter> | Optional. Parameters needed to purchase the Offer. To view the available Parameters refer to the Offer.parameter_definitions from the desired offer. |
| `priceReferenceId` | string | Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. |
| `purchaseOrderId` | string | Optional. Purchase order id provided by the reseller. |
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1ChangeParametersRequest`

- Request message for CloudChannelService.ChangeParameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | array<GoogleCloudChannelV1Parameter> | Required. Entitlement parameters to update. You can only change editable parameters. To view the available Parameters for a request, refer to the Offer.parameter_definitions from the desired offer. |
| `purchaseOrderId` | string | Optional. Purchase order ID provided by the reseller. |
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1ChangeRenewalSettingsRequest`

- Request message for CloudChannelService.ChangeRenewalSettings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `renewalSettings` | GoogleCloudChannelV1RenewalSettings | Required. New renewal settings. |
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1ChannelPartnerLink`

- Entity representing a link between distributors and their indirect resellers in an n-tier resale channel.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelPartnerCloudIdentityInfo` | GoogleCloudChannelV1CloudIdentityInfo | Output only. Cloud Identity info of the channel partner (IR). |
| `createTime` | string (google-datetime) | Output only. Timestamp of when the channel partner link is created. |
| `inviteLinkUri` | string | Output only. URI of the web page where partner accepts the link invitation. |
| `linkState` | string enum | Required. State of the channel partner link. Values: `CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED`, `INVITED`, `ACTIVE`, `REVOKED`, `SUSPENDED`. |
| `name` | string | Output only. Resource name for the channel partner link, in the format accounts/{account_id}/channelPartnerLinks/{id}. |
| `publicId` | string | Output only. Public identifier that a customer must use to generate a transfer token to move to this distributor-reseller combination. |
| `resellerCloudIdentityId` | string | Required. Cloud Identity ID of the linked reseller. |
| `updateTime` | string (google-datetime) | Output only. Timestamp of when the channel partner link is updated. |

### `GoogleCloudChannelV1ChannelPartnerRepricingConfig`

- Configuration for how a distributor will rebill a channel partner (also known as a distributor-authorized reseller).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Resource name of the ChannelPartnerRepricingConfig. Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}. |
| `repricingConfig` | GoogleCloudChannelV1RepricingConfig | Required. The configuration for bill modifications made by a reseller before sending it to ChannelPartner. |
| `updateTime` | string (google-datetime) | Output only. Timestamp of an update to the repricing rule. If `update_time` is after RepricingConfig.effective_invoice_month then it indicates this was set mid-month. |

### `GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest`

- Request message for CloudChannelService.CheckCloudIdentityAccountsExist.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | Required. Domain to fetch for Cloud Identity account customers, including domain and team customers. For team customers, please use the domain for their emails. |
| `primaryAdminEmail` | string | Optional. Primary admin email to fetch for Cloud Identity account team customer. |

### `GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse`

- Response message for CloudChannelService.CheckCloudIdentityAccountsExist.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudIdentityAccounts` | array<GoogleCloudChannelV1CloudIdentityCustomerAccount> | The Cloud Identity accounts associated with the domain. |

### `GoogleCloudChannelV1CloudIdentityCustomerAccount`

- Entity representing a Cloud Identity account that may be associated with a Channel Services API partner.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelPartnerCloudIdentityId` | string | If existing = true, and is 2-tier customer, the channel partner of the customer. |
| `customerCloudIdentityId` | string | If existing = true, the Cloud Identity ID of the customer. |
| `customerName` | string | If owned = true, the name of the customer that owns the Cloud Identity account. Customer_name uses the format: accounts/{account_id}/customers/{customer_id} |
| `customerType` | string enum | If existing = true, the type of the customer. Values: `CUSTOMER_TYPE_UNSPECIFIED`, `DOMAIN`, `TEAM`. |
| `existing` | boolean | Returns true if a Cloud Identity account exists for a specific domain. |
| `owned` | boolean | Returns true if the Cloud Identity account is associated with a customer of the Channel Services partner (with active subscriptions or purchase consents). |

### `GoogleCloudChannelV1CloudIdentityInfo`

- Cloud Identity information for the Cloud Channel Customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminConsoleUri` | string | Output only. URI of Customer's Admin console dashboard. |
| `alternateEmail` | string | The alternate email. |
| `customerType` | string enum | CustomerType indicates verification type needed for using services. Values: `CUSTOMER_TYPE_UNSPECIFIED`, `DOMAIN`, `TEAM`. |
| `eduData` | GoogleCloudChannelV1EduData | Edu information about the customer. |
| `isDomainVerified` | boolean | Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers. |
| `languageCode` | string | Language code. |
| `phoneNumber` | string | Phone number associated with the Cloud Identity. |
| `primaryDomain` | string | Output only. The primary domain name. |

### `GoogleCloudChannelV1Column`

- The definition of a report column. Specifies the data properties in the corresponding position of the report rows.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnId` | string | The unique name of the column (for example, customer_domain, channel_partner, customer_cost). You can use column IDs in RunReportJobRequest.filter. To see all reports and their columns, call CloudChannelReportsService.ListReports. |
| `dataType` | string enum | The type of the values for this column. Values: `DATA_TYPE_UNSPECIFIED`, `STRING`, `INT`, `DECIMAL`, `MONEY`, `DATE`, `DATE_TIME`. |
| `displayName` | string | The column's display name. |

### `GoogleCloudChannelV1CommitmentSettings`

- Commitment settings for commitment-based offers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. Commitment end timestamp. |
| `renewalSettings` | GoogleCloudChannelV1RenewalSettings | Optional. Renewal settings applicable for a commitment-based Offer. |
| `startTime` | string (google-datetime) | Output only. Commitment start timestamp. |

### `GoogleCloudChannelV1ConditionalOverride`

- Specifies the override to conditionally apply.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adjustment` | GoogleCloudChannelV1RepricingAdjustment | Required. Information about the applied override's adjustment. |
| `rebillingBasis` | string enum | Required. The RebillingBasis to use for the applied override. Shows the relative cost based on your repricing costs. Values: `REBILLING_BASIS_UNSPECIFIED`, `COST_AT_LIST`, `DIRECT_CUSTOMER_COST`. |
| `repricingCondition` | GoogleCloudChannelV1RepricingCondition | Required. Specifies the condition which, if met, will apply the override. |

### `GoogleCloudChannelV1Constraints`

- Represents the constraints for buying the Offer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerConstraints` | GoogleCloudChannelV1CustomerConstraints | Represents constraints required to purchase the Offer for a customer. |

### `GoogleCloudChannelV1ContactInfo`

- Contact information for a customer account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. The customer account contact's display name, formatted as a combination of the customer's first and last name. |
| `email` | string | The customer account's contact email. Required for entitlements that create admin.google.com accounts, and serves as the customer's username for those accounts. Use this email to invite Team customers. |
| `firstName` | string | The customer account contact's first name. Optional for Team customers. |
| `lastName` | string | The customer account contact's last name. Optional for Team customers. |
| `phone` | string | The customer account's contact phone number. |
| `title` | string | Optional. The customer account contact's job title. |

### `GoogleCloudChannelV1CreateEntitlementRequest`

- Request message for CloudChannelService.CreateEntitlement
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlement` | GoogleCloudChannelV1Entitlement | Required. The entitlement to create. |
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1Customer`

- Entity representing a customer of a reseller or distributor.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alternateEmail` | string | Secondary contact email. You need to provide an alternate email to create different domains if a primary contact email already exists. Users will receive a notification with credentials when you create an admin.google.com account. Secondary emails are also recovery email addresses. Alternate emails are optional when you create Team customers. |
| `channelPartnerId` | string | Cloud Identity ID of the customer's channel partner. Populated only if a channel partner exists for this customer. |
| `cloudIdentityId` | string | Output only. The customer's Cloud Identity ID if the customer has a Cloud Identity resource. |
| `cloudIdentityInfo` | GoogleCloudChannelV1CloudIdentityInfo | Output only. Cloud Identity information for the customer. Populated only if a Cloud Identity account exists for this customer. |
| `correlationId` | string | Optional. External CRM ID for the customer. Populated only if a CRM ID exists for this customer. |
| `createTime` | string (google-datetime) | Output only. Time when the customer was created. |
| `customerAttestationState` | string enum | Optional. Indicate if a customer is attesting about the correctness of provided information. Only required if creating a GCP Entitlement. NOTE: This field will be mandatory for all new GCP customers starting Aug 31st, 2026 and this field will also be required for all existing customers purchasing new GCP Entitlements. Values: `CUSTOMER_ATTESTATION_STATE_UNSPECIFIED`, `EXEMPT`, `NON_EXEMPT_AND_INFO_VERIFIED`. |
| `domain` | string | Required. The customer's primary domain. Must match the primary contact email's domain. |
| `languageCode` | string | Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. |
| `name` | string | Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} |
| `orgDisplayName` | string | Required. Name of the organization that the customer entity represents. |
| `orgPostalAddress` | GoogleTypePostalAddress | Required. The organization address for the customer. To enforce US laws and embargoes, we require a region, postal code, and address lines. You must provide valid addresses for every customer. To set the customer's language, use the Customer-level language code. |
| `primaryContactInfo` | GoogleCloudChannelV1ContactInfo | Primary contact info. |
| `updateTime` | string (google-datetime) | Output only. Time when the customer was updated. |

### `GoogleCloudChannelV1CustomerConstraints`

- Represents constraints required to purchase the Offer for a customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedCustomerTypes` | array<string> | Allowed Customer Type. Values: `CUSTOMER_TYPE_UNSPECIFIED`, `DOMAIN`, `TEAM`. |
| `allowedRegions` | array<string> | Allowed geographical regions of the customer. |
| `promotionalOrderTypes` | array<string> | Allowed Promotional Order Type. Present for Promotional offers. Values: `PROMOTIONAL_TYPE_UNSPECIFIED`, `NEW_UPGRADE`, `TRANSFER`, `PROMOTION_SWITCH`. |

### `GoogleCloudChannelV1CustomerEvent`

- Represents Pub/Sub message content describing customer update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} |
| `eventType` | string enum | Type of event which happened for the customer. Values: `TYPE_UNSPECIFIED`, `PRIMARY_DOMAIN_CHANGED`, `PRIMARY_DOMAIN_VERIFIED`. |

### `GoogleCloudChannelV1CustomerRepricingConfig`

- Configuration for how a reseller will reprice a Customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. |
| `repricingConfig` | GoogleCloudChannelV1RepricingConfig | Required. The configuration for bill modifications made by a reseller before sending it to customers. |
| `updateTime` | string (google-datetime) | Output only. Timestamp of an update to the repricing rule. If `update_time` is after RepricingConfig.effective_invoice_month then it indicates this was set mid-month. |

### `GoogleCloudChannelV1DateRange`

- A representation of usage or invoice date ranges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `invoiceEndDate` | GoogleTypeDate | The latest invoice date (inclusive). If this value is not the last day of a month, this will move it forward to the last day of the given month. |
| `invoiceStartDate` | GoogleTypeDate | The earliest invoice date (inclusive). If this value is not the first day of a month, this will move it back to the first day of the given month. |
| `usageEndDateTime` | GoogleTypeDateTime | The latest usage date time (exclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage end date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. |
| `usageStartDateTime` | GoogleTypeDateTime | The earliest usage date time (inclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage start date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. |

### `GoogleCloudChannelV1DiscountComponent`

- Represents a single component of the total discount applicable on a Price.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `discountAbsolute` | GoogleTypeMoney | Fixed value discount. |
| `discountPercentage` | number (double) | Discount percentage, represented as decimal. For example, a 20% discount will be represented as 0.2. |
| `discountType` | string enum | Type of the discount. Values: `DISCOUNT_TYPE_UNSPECIFIED`, `REGIONAL_DISCOUNT`, `PROMOTIONAL_DISCOUNT`, `SALES_DISCOUNT`, `RESELLER_MARGIN`, `DEAL_CODE`. |

### `GoogleCloudChannelV1EduData`

- Required Edu Attributes
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instituteSize` | string enum | Size of the institute. Values: `INSTITUTE_SIZE_UNSPECIFIED`, `SIZE_1_100`, `SIZE_101_500`, `SIZE_501_1000`, `SIZE_1001_2000`, `SIZE_2001_5000`, `SIZE_5001_10000`, `SIZE_10001_OR_MORE`. |
| `instituteType` | string enum | Designated institute type of customer. Values: `INSTITUTE_TYPE_UNSPECIFIED`, `K12`, `UNIVERSITY`. |
| `website` | string | Web address for the edu customer's institution. |

### `GoogleCloudChannelV1Entitlement`

- An entitlement is a representation of a customer's ability to use a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `associationInfo` | GoogleCloudChannelV1AssociationInfo | Association information to other entitlements. |
| `billingAccount` | string | Optional. The billing account resource name that is used to pay for this entitlement. |
| `commitmentSettings` | GoogleCloudChannelV1CommitmentSettings | Commitment settings for a commitment-based Offer. Required for commitment based offers. |
| `createTime` | string (google-datetime) | Output only. The time at which the entitlement is created. |
| `name` | string | Output only. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}. |
| `offer` | string | Required. The offer resource name for which the entitlement is to be created. Takes the form: accounts/{account_id}/offers/{offer_id}. |
| `parameters` | array<GoogleCloudChannelV1Parameter> | Extended entitlement parameters. When creating an entitlement, valid parameter names and values are defined in the Offer.parameter_definitions. For Google Workspace, the following Parameters may be accepted as input: - max_units: The maximum assignable units for a flexible offer OR - num_units: The total commitment for commitment-based offers The response may additionally include the following output-only Parameters: - assigned_units: The number of licenses assigned to users. For Google Cloud billing subaccounts, the following Parameter may be accepted as input: - display_name: The display name of the billing subaccount. |
| `priceReferenceId` | string | Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. |
| `provisionedService` | GoogleCloudChannelV1ProvisionedService | Output only. Service provisioning details for the entitlement. |
| `provisioningState` | string enum | Output only. Current provisioning state of the entitlement. Values: `PROVISIONING_STATE_UNSPECIFIED`, `ACTIVE`, `SUSPENDED`. |
| `purchaseOrderId` | string | Optional. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given, it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. This is only supported for Google Workspace entitlements. |
| `suspensionReasons` | array<string> | Output only. Enumerable of all current suspension reasons for an entitlement. Values: `SUSPENSION_REASON_UNSPECIFIED`, `RESELLER_INITIATED`, `TRIAL_ENDED`, `RENEWAL_WITH_TYPE_CANCEL`, `PENDING_TOS_ACCEPTANCE`, `OTHER`. |
| `trialSettings` | GoogleCloudChannelV1TrialSettings | Output only. Settings for trial offers. |
| `updateTime` | string (google-datetime) | Output only. The time at which the entitlement is updated. |

### `GoogleCloudChannelV1EntitlementChange`

- Change event entry for Entitlement order history
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activationReason` | string enum | The Entitlement's activation reason Values: `ACTIVATION_REASON_UNSPECIFIED`, `RESELLER_REVOKED_SUSPENSION`, `CUSTOMER_ACCEPTED_PENDING_TOS`, `RENEWAL_SETTINGS_CHANGED`, `OTHER_ACTIVATION_REASON`. |
| `cancellationReason` | string enum | Cancellation reason for the Entitlement. Values: `CANCELLATION_REASON_UNSPECIFIED`, `SERVICE_TERMINATED`, `RELATIONSHIP_ENDED`, `PARTIAL_TRANSFER`. |
| `changeType` | string enum | The change action type. Values: `CHANGE_TYPE_UNSPECIFIED`, `CREATED`, `PRICE_PLAN_SWITCHED`, `COMMITMENT_CHANGED`, `RENEWED`, `SUSPENDED`, `ACTIVATED`, `CANCELLED`, `SKU_CHANGED`, `RENEWAL_SETTING_CHANGED`, `PAID_SUBSCRIPTION_STARTED`, `LICENSE_CAP_CHANGED`, `SUSPENSION_DETAILS_CHANGED`, `TRIAL_END_DATE_EXTENDED`, `TRIAL_STARTED`. |
| `createTime` | string (google-datetime) | The submitted time of the change. |
| `entitlement` | string | Required. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |
| `offer` | string | Required. Resource name of the Offer at the time of change. Takes the form: accounts/{account_id}/offers/{offer_id}. |
| `operator` | string | Human-readable identifier that shows what operator made a change. When the operator_type is RESELLER, this is the user's email address. For all other operator types, this is empty. |
| `operatorType` | string enum | Operator type responsible for the change. Values: `OPERATOR_TYPE_UNSPECIFIED`, `CUSTOMER_SERVICE_REPRESENTATIVE`, `SYSTEM`, `CUSTOMER`, `RESELLER`. |
| `otherChangeReason` | string | e.g. purchase_number change reason, entered by CRS. |
| `parameters` | array<GoogleCloudChannelV1Parameter> | Extended parameters, such as: purchase_order_number, gcp_details; internal_correlation_id, long_running_operation_id, order_id; etc. |
| `provisionedService` | GoogleCloudChannelV1ProvisionedService | Service provisioned for an Entitlement. |
| `suspensionReason` | string enum | Suspension reason for the Entitlement. Values: `SUSPENSION_REASON_UNSPECIFIED`, `RESELLER_INITIATED`, `TRIAL_ENDED`, `RENEWAL_WITH_TYPE_CANCEL`, `PENDING_TOS_ACCEPTANCE`, `OTHER`. |

### `GoogleCloudChannelV1EntitlementEvent`

- Represents Pub/Sub message content describing entitlement update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlement` | string | Resource name of an entitlement of the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |
| `eventType` | string enum | Type of event which happened for the entitlement. Values: `TYPE_UNSPECIFIED`, `CREATED`, `PRICE_PLAN_SWITCHED`, `COMMITMENT_CHANGED`, `RENEWED`, `SUSPENDED`, `ACTIVATED`, `CANCELLED`, `SKU_CHANGED`, `RENEWAL_SETTING_CHANGED`, `PAID_SERVICE_STARTED`, `LICENSE_ASSIGNMENT_CHANGED`, `LICENSE_CAP_CHANGED`. |

### `GoogleCloudChannelV1FetchReportResultsRequest`

- Request message for CloudChannelReportsService.FetchReportResults.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | Optional. Requested page size of the report. The server may return fewer results than requested. If you don't specify a page size, the server uses a sensible default (may change over time). The maximum value is 30,000; the server will change larger values to 30,000. |
| `pageToken` | string | Optional. A token that specifies a page of results beyond the first page. Obtained through FetchReportResultsResponse.next_page_token of the previous CloudChannelReportsService.FetchReportResults call. |
| `partitionKeys` | array<string> | Optional. List of keys specifying which report partitions to return. If empty, returns all partitions. |

### `GoogleCloudChannelV1FetchReportResultsResponse`

- Response message for CloudChannelReportsService.FetchReportResults. Contains a tabular representation of the report results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pass this token to FetchReportResultsRequest.page_token to retrieve the next page of results. |
| `reportMetadata` | GoogleCloudChannelV1ReportResultsMetadata | The metadata for the report results (display name, columns, row count, and date ranges). |
| `rows` | array<GoogleCloudChannelV1Row> | The report's lists of values. Each row follows the settings and ordering of the columns from `report_metadata`. |

### `GoogleCloudChannelV1ImportCustomerRequest`

- Request message for CloudChannelService.ImportCustomer
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authToken` | string | Optional. The super admin of the resold customer generates this token to authorize a reseller to access their Cloud Identity and purchase entitlements on their behalf. You can omit this token after authorization. See https://support.google.com/a/answer/7643790 for more details. |
| `channelPartnerId` | string | Optional. Cloud Identity ID of a channel partner who will be the direct reseller for the customer's order. This field is required for 2-tier transfer scenarios and can be provided via the request Parent binding as well. |
| `cloudIdentityId` | string | Required. Customer's Cloud Identity ID |
| `customer` | string | Optional. Specifies the customer that will receive imported Cloud Identity information. Format: accounts/{account_id}/customers/{customer_id} |
| `domain` | string | Required. Customer domain. |
| `overwriteIfExists` | boolean | Required. Choose to overwrite an existing customer if found. This must be set to true if there is an existing customer with a conflicting region code or domain. |
| `primaryAdminEmail` | string | Required. Customer's primary admin email. |

### `GoogleCloudChannelV1ListChannelPartnerLinksResponse`

- Response message for CloudChannelService.ListChannelPartnerLinks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelPartnerLinks` | array<GoogleCloudChannelV1ChannelPartnerLink> | The Channel partner links for a reseller. |
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListChannelPartnerLinksRequest.page_token to obtain that page. |

### `GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse`

- Response message for CloudChannelService.ListChannelPartnerRepricingConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelPartnerRepricingConfigs` | array<GoogleCloudChannelV1ChannelPartnerRepricingConfig> | The repricing configs for this channel partner. |
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListChannelPartnerRepricingConfigsRequest.page_token to obtain that page. |

### `GoogleCloudChannelV1ListCustomerRepricingConfigsResponse`

- Response message for CloudChannelService.ListCustomerRepricingConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerRepricingConfigs` | array<GoogleCloudChannelV1CustomerRepricingConfig> | The repricing configs for this channel partner. |
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListCustomerRepricingConfigsRequest.page_token to obtain that page. |

### `GoogleCloudChannelV1ListCustomersResponse`

- Response message for CloudChannelService.ListCustomers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customers` | array<GoogleCloudChannelV1Customer> | The customers belonging to a reseller or distributor. |
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListCustomersRequest.page_token to obtain that page. |

### `GoogleCloudChannelV1ListEntitlementChangesResponse`

- Response message for CloudChannelService.ListEntitlementChanges
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlementChanges` | array<GoogleCloudChannelV1EntitlementChange> | The list of entitlement changes. |
| `nextPageToken` | string | A token to list the next page of results. |

### `GoogleCloudChannelV1ListEntitlementsResponse`

- Response message for CloudChannelService.ListEntitlements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlements` | array<GoogleCloudChannelV1Entitlement> | The reseller customer's entitlements. |
| `nextPageToken` | string | A token to list the next page of results. Pass to ListEntitlementsRequest.page_token to obtain that page. |

### `GoogleCloudChannelV1ListOffersResponse`

- Response message for ListOffers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. |
| `offers` | array<GoogleCloudChannelV1Offer> | The list of Offers requested. The pricing information for each Offer only includes the base price. Effective prices and discounts aren't populated. |

### `GoogleCloudChannelV1ListProductsResponse`

- Response message for ListProducts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. |
| `products` | array<GoogleCloudChannelV1Product> | List of Products requested. |

### `GoogleCloudChannelV1ListPurchasableOffersResponse`

- Response message for ListPurchasableOffers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. |
| `purchasableOffers` | array<GoogleCloudChannelV1PurchasableOffer> | The list of Offers requested. |

### `GoogleCloudChannelV1ListPurchasableSkusResponse`

- Response message for ListPurchasableSkus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. |
| `purchasableSkus` | array<GoogleCloudChannelV1PurchasableSku> | The list of SKUs requested. |

### `GoogleCloudChannelV1ListReportsResponse`

- Response message for CloudChannelReportsService.ListReports.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pass this token to FetchReportResultsRequest.page_token to retrieve the next page of results. |
| `reports` | array<GoogleCloudChannelV1Report> | The reports available to the partner. |

### `GoogleCloudChannelV1ListSkuGroupBillableSkusResponse`

- Response message for ListSkuGroupBillableSkus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billableSkus` | array<GoogleCloudChannelV1BillableSku> | The list of billable SKUs in the requested SKU group. |
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListSkuGroupBillableSkusRequest.page_token to obtain that page. |

### `GoogleCloudChannelV1ListSkuGroupsResponse`

- Response message for ListSkuGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListSkuGroupsRequest.page_token to obtain that page. |
| `skuGroups` | array<GoogleCloudChannelV1SkuGroup> | The list of SKU groups requested. |

### `GoogleCloudChannelV1ListSkusResponse`

- Response message for ListSkus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. |
| `skus` | array<GoogleCloudChannelV1Sku> | The list of SKUs requested. |

### `GoogleCloudChannelV1ListSubscribersResponse`

- Response Message for ListSubscribers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `serviceAccounts` | array<string> | List of service accounts which have subscriber access to the topic. |
| `topic` | string | Name of the topic registered with the reseller. |

### `GoogleCloudChannelV1ListTransferableOffersRequest`

- Request message for CloudChannelService.ListTransferableOffers
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccount` | string | Optional. The Billing Account to look up Offers for. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. This field is only relevant for multi-currency accounts. It should be left empty for single currency accounts. |
| `cloudIdentityId` | string | Customer's Cloud Identity ID |
| `customerName` | string | A reseller should create a customer and use the resource name of that customer here. |
| `languageCode` | string | Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". |
| `pageSize` | integer (int32) | Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 offers. The maximum value is 1000; the server will coerce values above 1000. |
| `pageToken` | string | A token for a page of results other than the first page. Obtained using ListTransferableOffersResponse.next_page_token of the previous CloudChannelService.ListTransferableOffers call. |
| `sku` | string | Required. The SKU to look up Offers for. |

### `GoogleCloudChannelV1ListTransferableOffersResponse`

- Response message for CloudChannelService.ListTransferableOffers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListTransferableOffersRequest.page_token to obtain that page. |
| `transferableOffers` | array<GoogleCloudChannelV1TransferableOffer> | Information about Offers for a customer that can be used for transfer. |

### `GoogleCloudChannelV1ListTransferableSkusRequest`

- Request message for CloudChannelService.ListTransferableSkus
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authToken` | string | Optional. The super admin of the resold customer generates this token to authorize a reseller to access their Cloud Identity and purchase entitlements on their behalf. You can omit this token after authorization. See https://support.google.com/a/answer/7643790 for more details. |
| `cloudIdentityId` | string | Customer's Cloud Identity ID |
| `customerName` | string | A reseller is required to create a customer and use the resource name of the created customer here. Customer_name uses the format: accounts/{account_id}/customers/{customer_id} |
| `languageCode` | string | The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". Optional. |
| `pageSize` | integer (int32) | The requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 SKUs. The maximum value is 1000; the server will coerce values above 1000. Optional. |
| `pageToken` | string | A token for a page of results other than the first page. Obtained using ListTransferableSkusResponse.next_page_token of the previous CloudChannelService.ListTransferableSkus call. Optional. |

### `GoogleCloudChannelV1ListTransferableSkusResponse`

- Response message for CloudChannelService.ListTransferableSkus.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results. Pass to ListTransferableSkusRequest.page_token to obtain that page. |
| `transferableSkus` | array<GoogleCloudChannelV1TransferableSku> | Information about existing SKUs for a customer that needs a transfer. |

### `GoogleCloudChannelV1MarketingInfo`

- Represents the marketing information for a Product, SKU or Offer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultLogo` | GoogleCloudChannelV1Media | Default logo. |
| `description` | string | Human readable description. Description can contain HTML. |
| `displayName` | string | Human readable name. |

### `GoogleCloudChannelV1Media`

- Represents media information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | URL of the media. |
| `title` | string | Title of the media. |
| `type` | string enum | Type of the media. Values: `MEDIA_TYPE_UNSPECIFIED`, `MEDIA_TYPE_IMAGE`. |

### `GoogleCloudChannelV1Offer`

- Represents an offer made to resellers for purchase. An offer is associated with a Sku, has a plan for payment, a price, and defines the constraints for buying.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraints` | GoogleCloudChannelV1Constraints | Constraints on transacting the Offer. |
| `dealCode` | string | The deal code of the offer to get a special promotion or discount. |
| `endTime` | string (google-datetime) | Output only. End of the Offer validity time. |
| `marketingInfo` | GoogleCloudChannelV1MarketingInfo | Marketing information for the Offer. |
| `name` | string | Resource Name of the Offer. Format: accounts/{account_id}/offers/{offer_id} |
| `parameterDefinitions` | array<GoogleCloudChannelV1ParameterDefinition> | Parameters required to use current Offer to purchase. |
| `plan` | GoogleCloudChannelV1Plan | Describes the payment plan for the Offer. |
| `priceByResources` | array<GoogleCloudChannelV1PriceByResource> | Price for each monetizable resource type. |
| `sku` | GoogleCloudChannelV1Sku | SKU the offer is associated with. |
| `startTime` | string (google-datetime) | Start of the Offer validity time. |

### `GoogleCloudChannelV1OperationMetadata`

- Provides contextual information about a google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operationType` | string enum | The RPC that initiated this Long Running Operation. Values: `OPERATION_TYPE_UNSPECIFIED`, `CREATE_ENTITLEMENT`, `CHANGE_RENEWAL_SETTINGS`, `START_PAID_SERVICE`, `ACTIVATE_ENTITLEMENT`, `SUSPEND_ENTITLEMENT`, `CANCEL_ENTITLEMENT`, `TRANSFER_ENTITLEMENTS`, `TRANSFER_ENTITLEMENTS_TO_GOOGLE`, `CHANGE_OFFER`, `CHANGE_PARAMETERS`, `PROVISION_CLOUD_IDENTITY`. |

### `GoogleCloudChannelV1Parameter`

- Definition for extended entitlement parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `editable` | boolean | Output only. Specifies whether this parameter is allowed to be changed. For example, for a Google Workspace Business Starter entitlement in commitment plan, num_units is editable when entitlement is active. |
| `name` | string | Name of the parameter. |
| `value` | GoogleCloudChannelV1Value | Value of the parameter. |

### `GoogleCloudChannelV1ParameterDefinition`

- Parameter's definition. Specifies what parameter is required to use the current Offer to purchase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedValues` | array<GoogleCloudChannelV1Value> | If not empty, parameter values must be drawn from this list. For example, \[us-west1, us-west2, ...\] Applicable to STRING parameter type. |
| `maxValue` | GoogleCloudChannelV1Value | Maximum value of the parameter, if applicable. Inclusive. For example, maximum seats when purchasing Google Workspace Business Standard. Applicable to INT64 and DOUBLE parameter types. |
| `minValue` | GoogleCloudChannelV1Value | Minimal value of the parameter, if applicable. Inclusive. For example, minimal commitment when purchasing Anthos is 0.01. Applicable to INT64 and DOUBLE parameter types. |
| `name` | string | Name of the parameter. |
| `optional` | boolean | If set to true, parameter is optional to purchase this Offer. |
| `parameterType` | string enum | Data type of the parameter. Minimal value, Maximum value and allowed values will use specified data type here. Values: `PARAMETER_TYPE_UNSPECIFIED`, `INT64`, `STRING`, `DOUBLE`, `BOOLEAN`. |

### `GoogleCloudChannelV1PercentageAdjustment`

- An adjustment that applies a flat markup or markdown to an entire bill.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `percentage` | GoogleTypeDecimal | The percentage of the bill to adjust. For example: Mark down by 1% => "-1.00" Mark up by 1% => "1.00" Pass-Through => "0.00" |

### `GoogleCloudChannelV1Period`

- Represents period in days/months/years.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | integer (int32) | Total duration of Period Type defined. |
| `periodType` | string enum | Period Type. Values: `PERIOD_TYPE_UNSPECIFIED`, `DAY`, `MONTH`, `YEAR`. |

### `GoogleCloudChannelV1Plan`

- The payment plan for the Offer. Describes how to make a payment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccount` | string | Reseller Billing account to charge after an offer transaction. Only present for Google Cloud offers. |
| `paymentCycle` | GoogleCloudChannelV1Period | Describes how frequently the reseller will be billed, such as once per month. |
| `paymentPlan` | string enum | Describes how a reseller will be billed. Values: `PAYMENT_PLAN_UNSPECIFIED`, `COMMITMENT`, `FLEXIBLE`, `FREE`, `TRIAL`, `OFFLINE`. |
| `paymentType` | string enum | Specifies when the payment needs to happen. Values: `PAYMENT_TYPE_UNSPECIFIED`, `PREPAY`, `POSTPAY`. |
| `trialPeriod` | GoogleCloudChannelV1Period | Present for Offers with a trial period. For trial-only Offers, a paid service needs to start before the trial period ends for continued service. For Regular Offers with a trial period, the regular pricing goes into effect when trial period ends, or if paid service is started before the end of the trial period. |

### `GoogleCloudChannelV1Price`

- Represents the price of the Offer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `basePrice` | GoogleTypeMoney | Base price. |
| `discount` | number (double) | Discount percentage, represented as decimal. For example, a 20% discount will be represent as 0.2. |
| `discountComponents` | array<GoogleCloudChannelV1DiscountComponent> | Breakdown of the discount into its components. This will be empty if there is no discount present. |
| `effectivePrice` | GoogleTypeMoney | Effective Price after applying the discounts. |
| `externalPriceUri` | string | Link to external price list, such as link to Google Voice rate card. |
| `pricePeriod` | GoogleCloudChannelV1Period | The time period with respect to which base and effective prices are defined. Example: 1 month, 6 months, 1 year, etc. |

### `GoogleCloudChannelV1PriceByResource`

- Represents price by resource type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `price` | GoogleCloudChannelV1Price | Price of the Offer. Present if there are no price phases. |
| `pricePhases` | array<GoogleCloudChannelV1PricePhase> | Specifies the price by time range. |
| `resourceType` | string enum | Resource Type. Example: SEAT Values: `RESOURCE_TYPE_UNSPECIFIED`, `SEAT`, `MAU`, `GB`, `LICENSED_USER`, `MINUTES`, `IAAS_USAGE`, `SUBSCRIPTION`, `AI_CREDITS`. |

### `GoogleCloudChannelV1PricePhase`

- Specifies the price by the duration of months. For example, a 20% discount for the first six months, then a 10% discount starting on the seventh month.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firstPeriod` | integer (int32) | Defines first period for the phase. |
| `lastPeriod` | integer (int32) | Defines first period for the phase. |
| `periodType` | string enum | Defines the phase period type. Values: `PERIOD_TYPE_UNSPECIFIED`, `DAY`, `MONTH`, `YEAR`. |
| `price` | GoogleCloudChannelV1Price | Price of the phase. Present if there are no price tiers. |
| `priceTiers` | array<GoogleCloudChannelV1PriceTier> | Price by the resource tiers. |

### `GoogleCloudChannelV1PriceTier`

- Defines price at resource tier level. For example, an offer with following definition : \* Tier 1: Provide 25% discount for all seats between 1 and 25. \* Tier 2: Provide 10% discount for all seats between 26 and 100. \* Tier 3: Provide flat 15% discount for all seats above 100. Each of these tiers is represented as a PriceTier.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `firstResource` | integer (int32) | First resource for which the tier price applies. |
| `lastResource` | integer (int32) | Last resource for which the tier price applies. |
| `price` | GoogleCloudChannelV1Price | Price of the tier. |

### `GoogleCloudChannelV1Product`

- A Product is the entity a customer uses when placing an order. For example, Google Workspace, Google Voice, etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `marketingInfo` | GoogleCloudChannelV1MarketingInfo | Marketing information for the product. |
| `name` | string | Resource Name of the Product. Format: products/{product_id} |

### `GoogleCloudChannelV1ProvisionCloudIdentityRequest`

- Request message for CloudChannelService.ProvisionCloudIdentity
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudIdentityInfo` | GoogleCloudChannelV1CloudIdentityInfo | CloudIdentity-specific customer information. |
| `user` | GoogleCloudChannelV1AdminUser | Admin user information. |
| `validateOnly` | boolean | Validate the request and preview the review, but do not post it. |

### `GoogleCloudChannelV1ProvisionedService`

- Service provisioned for an entitlement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `productId` | string | Output only. The product pertaining to the provisioning resource as specified in the Offer. |
| `provisioningId` | string | Output only. Provisioning ID of the entitlement. For Google Workspace, this is the underlying Subscription ID. For Google Cloud, this is the Billing Account ID of the billing subaccount. |
| `skuId` | string | Output only. The SKU pertaining to the provisioning resource as specified in the Offer. |

### `GoogleCloudChannelV1PurchasableOffer`

- Offer that you can purchase for a customer. This is used in the ListPurchasableOffer API response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `offer` | GoogleCloudChannelV1Offer | Offer. |
| `priceReferenceId` | string | Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. |

### `GoogleCloudChannelV1PurchasableSku`

- SKU that you can purchase. This is used in ListPurchasableSku API response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sku` | GoogleCloudChannelV1Sku | SKU |

### `GoogleCloudChannelV1QueryEligibleBillingAccountsResponse`

- Response message for QueryEligibleBillingAccounts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skuPurchaseGroups` | array<GoogleCloudChannelV1SkuPurchaseGroup> | List of SKU purchase groups where each group represents a set of SKUs that must be purchased using the same billing account. Each SKU from \[QueryEligibleBillingAccountsRequest.skus\] will appear in exactly one SKU group. |

### `GoogleCloudChannelV1RegisterSubscriberRequest`

- Request Message for RegisterSubscriber.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `account` | string | Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. |
| `integrator` | string | Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. |
| `serviceAccount` | string | Required. Service account that provides subscriber access to the registered topic. |

### `GoogleCloudChannelV1RegisterSubscriberResponse`

- Response Message for RegisterSubscriber.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `topic` | string | Name of the topic the subscriber will listen to. |

### `GoogleCloudChannelV1RenewalSettings`

- Renewal settings for renewable Offers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableRenewal` | boolean | If false, the plan will be completed at the end date. |
| `paymentCycle` | GoogleCloudChannelV1Period | Describes how frequently the reseller will be billed, such as once per month. |
| `paymentPlan` | string enum | Describes how a reseller will be billed. Values: `PAYMENT_PLAN_UNSPECIFIED`, `COMMITMENT`, `FLEXIBLE`, `FREE`, `TRIAL`, `OFFLINE`. |
| `resizeUnitCount` | boolean | If true and enable_renewal = true, the unit (for example seats or licenses) will be set to the number of active units at renewal time. |

### `GoogleCloudChannelV1Report`

- The ID and description of a report that was used to generate report data. For example, "Google Cloud Daily Spend", "Google Workspace License Activity", etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<GoogleCloudChannelV1Column> | The list of columns included in the report. This defines the schema of the report results. |
| `description` | string | A description of other aspects of the report, such as the products it supports. |
| `displayName` | string | A human-readable name for this report. |
| `name` | string | Required. The report's resource name. Specifies the account and report used to generate report data. The report_id identifier is a UID (for example, `613bf59q`). Name uses the format: accounts/{account_id}/reports/{report_id} |

### `GoogleCloudChannelV1ReportJob`

- The result of a RunReportJob operation. Contains the name to use in FetchReportResultsRequest.report_job and the status of the operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The resource name of a report job. Name uses the format: `accounts/{account_id}/reportJobs/{report_job_id}` |
| `reportStatus` | GoogleCloudChannelV1ReportStatus | The current status of report generation. |

### `GoogleCloudChannelV1ReportResultsMetadata`

- The features describing the data. Returned by CloudChannelReportsService.RunReportJob and CloudChannelReportsService.FetchReportResults.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dateRange` | GoogleCloudChannelV1DateRange | The date range of reported usage. |
| `precedingDateRange` | GoogleCloudChannelV1DateRange | The usage dates immediately preceding `date_range` with the same duration. Use this to calculate trending usage and costs. This is only populated if you request trending data. For example, if `date_range` is July 1-15, `preceding_date_range` will be June 16-30. |
| `report` | GoogleCloudChannelV1Report | Details of the completed report. |
| `rowCount` | string (int64) | The total number of rows of data in the final report. |

### `GoogleCloudChannelV1ReportStatus`

- Status of a report generation process.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The report generation's completion time. |
| `startTime` | string (google-datetime) | The report generation's start time. |
| `state` | string enum | The current state of the report generation process. Values: `STATE_UNSPECIFIED`, `STARTED`, `WRITING`, `AVAILABLE`, `FAILED`. |

### `GoogleCloudChannelV1ReportValue`

- A single report value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dateTimeValue` | GoogleTypeDateTime | A value of type `google.type.DateTime` (year, month, day, hour, minute, second, and UTC offset or timezone.) |
| `dateValue` | GoogleTypeDate | A value of type `google.type.Date` (year, month, day). |
| `decimalValue` | GoogleTypeDecimal | A value of type `google.type.Decimal`, representing non-integer numeric values. |
| `intValue` | string (int64) | A value of type `int`. |
| `moneyValue` | GoogleTypeMoney | A value of type `google.type.Money` (currency code, whole units, decimal units). |
| `stringValue` | string | A value of type `string`. |

### `GoogleCloudChannelV1RepricingAdjustment`

- A type that represents the various adjustments you can apply to a bill.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `percentageAdjustment` | GoogleCloudChannelV1PercentageAdjustment | Flat markup or markdown on an entire bill. |

### `GoogleCloudChannelV1RepricingCondition`

- Represents the various repricing conditions you can use for a conditional override.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skuGroupCondition` | GoogleCloudChannelV1SkuGroupCondition | SKU Group condition for override. |

### `GoogleCloudChannelV1RepricingConfig`

- Configuration for repricing a Google bill over a period of time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adjustment` | GoogleCloudChannelV1RepricingAdjustment | Required. Information about the adjustment. |
| `channelPartnerGranularity` | GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity | Applies the repricing configuration at the channel partner level. Only ChannelPartnerRepricingConfig supports this value. Deprecated: This is no longer supported. Use RepricingConfig.entitlement_granularity instead. |
| `conditionalOverrides` | array<GoogleCloudChannelV1ConditionalOverride> | The conditional overrides to apply for this configuration. If you list multiple overrides, only the first valid override is used. If you don't list any overrides, the API uses the normal adjustment and rebilling basis. |
| `effectiveInvoiceMonth` | GoogleTypeDate | Required. The YearMonth when these adjustments activate. The Day field needs to be "0" since we only accept YearMonth repricing boundaries. |
| `entitlementGranularity` | GoogleCloudChannelV1RepricingConfigEntitlementGranularity | Required. Applies the repricing configuration at the entitlement level. Note: If a ChannelPartnerRepricingConfig using RepricingConfig.EntitlementGranularity becomes effective, then no existing or future RepricingConfig.ChannelPartnerGranularity will apply to the RepricingConfig.EntitlementGranularity.entitlement. This is the recommended value for both CustomerRepricingConfig and ChannelPartnerRepricingConfig. |
| `rebillingBasis` | string enum | Required. The RebillingBasis to use for this bill. Specifies the relative cost based on repricing costs you will apply. Values: `REBILLING_BASIS_UNSPECIFIED`, `COST_AT_LIST`, `DIRECT_CUSTOMER_COST`. |

### `GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity`

- Applies the repricing configuration at the channel partner level. The channel partner value is derived from the resource name. Takes an empty json object. Deprecated: This is no longer supported. Use RepricingConfig.EntitlementGranularity instead.
- Version: v1

### `GoogleCloudChannelV1RepricingConfigEntitlementGranularity`

- Applies the repricing configuration at the entitlement level.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlement` | string | Resource name of the entitlement. Format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |

### `GoogleCloudChannelV1Row`

- A row of report values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionKey` | string | The key for the partition this row belongs to. This field is empty if the report is not partitioned. |
| `values` | array<GoogleCloudChannelV1ReportValue> | The list of values in the row. |

### `GoogleCloudChannelV1RunReportJobRequest`

- Request message for CloudChannelReportsService.RunReportJob.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dateRange` | GoogleCloudChannelV1DateRange | Optional. The range of usage or invoice dates to include in the result. |
| `filter` | string | Optional. A structured string that defines conditions on dimension columns to restrict the report output. Filters support logical operators (AND, OR, NOT) and conditional operators (=, !=, <, >, <=, and >=) using `column_id` as keys. For example: `(customer:"accounts/C123abc/customers/S456def" OR customer:"accounts/C123abc/customers/S789ghi") AND invoice_start_date.year >= 2022` |
| `languageCode` | string | Optional. The BCP-47 language code, such as "en-US". If specified, the response is localized to the corresponding language code if the original data sources support it. Default is "en-US". |

### `GoogleCloudChannelV1RunReportJobResponse`

- Response message for CloudChannelReportsService.RunReportJob.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reportJob` | GoogleCloudChannelV1ReportJob | Pass `report_job.name` to FetchReportResultsRequest.report_job to retrieve the report's results. |
| `reportMetadata` | GoogleCloudChannelV1ReportResultsMetadata | The metadata for the report's results (display name, columns, row count, and date range). If you view this before the operation finishes, you may see incomplete data. |

### `GoogleCloudChannelV1Sku`

- Represents a product's purchasable Stock Keeping Unit (SKU). SKUs represent the different variations of the product. For example, Google Workspace Business Standard and Google Workspace Business Plus are Google Workspace product SKUs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `marketingInfo` | GoogleCloudChannelV1MarketingInfo | Marketing information for the SKU. |
| `name` | string | Resource Name of the SKU. Format: products/{product_id}/skus/{sku_id} |
| `product` | GoogleCloudChannelV1Product | Product the SKU is associated with. |

### `GoogleCloudChannelV1SkuGroup`

- Represents the SKU group information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Unique human readable identifier for the SKU group. |
| `name` | string | Resource name of SKU group. Format: accounts/{account}/skuGroups/{sku_group}. Example: "accounts/C01234/skuGroups/3d50fd57-3157-4577-a5a9-a219b8490041". |

### `GoogleCloudChannelV1SkuGroupCondition`

- A condition that applies the override if a line item SKU is found in the SKU group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skuGroup` | string | Specifies a SKU group (https://cloud.google.com/skus/sku-groups). Resource name of SKU group. Format: accounts/{account}/skuGroups/{sku_group}. Example: "accounts/C01234/skuGroups/3d50fd57-3157-4577-a5a9-a219b8490041". |

### `GoogleCloudChannelV1SkuPurchaseGroup`

- Represents a set of SKUs that must be purchased using the same billing account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `billingAccountPurchaseInfos` | array<GoogleCloudChannelV1BillingAccountPurchaseInfo> | List of billing accounts that are eligible to purhcase these SKUs. |
| `skus` | array<string> | Resource names of the SKUs included in this group. Format: products/{product_id}/skus/{sku_id}. |

### `GoogleCloudChannelV1StartPaidServiceRequest`

- Request message for CloudChannelService.StartPaidService.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1SubscriberEvent`

- Represents information which resellers will get as part of notification from Pub/Sub.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerEvent` | GoogleCloudChannelV1CustomerEvent | Customer event sent as part of Pub/Sub event to partners. |
| `entitlementEvent` | GoogleCloudChannelV1EntitlementEvent | Entitlement event sent as part of Pub/Sub event to partners. |

### `GoogleCloudChannelV1SuspendEntitlementRequest`

- Request message for CloudChannelService.SuspendEntitlement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1TransferEligibility`

- Specifies transfer eligibility of a SKU.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Localized description if reseller is not eligible to transfer the SKU. |
| `ineligibilityReason` | string enum | Specified the reason for ineligibility. Values: `REASON_UNSPECIFIED`, `PENDING_TOS_ACCEPTANCE`, `SKU_NOT_ELIGIBLE`, `SKU_SUSPENDED`, `CHANNEL_PARTNER_NOT_AUTHORIZED_FOR_SKU`. |
| `isEligible` | boolean | Whether reseller is eligible to transfer the SKU. |

### `GoogleCloudChannelV1TransferEntitlementsRequest`

- Request message for CloudChannelService.TransferEntitlements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authToken` | string | The super admin of the resold customer generates this token to authorize a reseller to access their Cloud Identity and purchase entitlements on their behalf. You can omit this token after authorization. See https://support.google.com/a/answer/7643790 for more details. |
| `entitlements` | array<GoogleCloudChannelV1Entitlement> | Required. The new entitlements to create or transfer. |
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1TransferEntitlementsResponse`

- Response message for CloudChannelService.TransferEntitlements. This is put in the response field of google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlements` | array<GoogleCloudChannelV1Entitlement> | The transferred entitlements. |

### `GoogleCloudChannelV1TransferEntitlementsToGoogleRequest`

- Request message for CloudChannelService.TransferEntitlementsToGoogle.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlements` | array<GoogleCloudChannelV1Entitlement> | Required. The entitlements to transfer to Google. |
| `requestId` | string | Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid UUID (https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `GoogleCloudChannelV1TransferableOffer`

- TransferableOffer represents an Offer that can be used in Transfer. Read-only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `offer` | GoogleCloudChannelV1Offer | Offer with parameter constraints updated to allow the Transfer. |
| `priceReferenceId` | string | Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. |

### `GoogleCloudChannelV1TransferableSku`

- TransferableSku represents information a reseller needs to view existing provisioned services for a customer that they do not own. Read-only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `legacySku` | GoogleCloudChannelV1Sku | Optional. The customer to transfer has an entitlement with the populated legacy SKU. |
| `sku` | GoogleCloudChannelV1Sku | The SKU pertaining to the provisioning resource as specified in the Offer. |
| `transferEligibility` | GoogleCloudChannelV1TransferEligibility | Describes the transfer eligibility of a SKU. |

### `GoogleCloudChannelV1TrialSettings`

- Settings for trial offers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Date when the trial ends. The value is in milliseconds using the UNIX Epoch format. See an example Epoch converter (https://www.epochconverter.com). |
| `trial` | boolean | Determines if the entitlement is in a trial or not: \* `true` - The entitlement is in trial. \* `false` - The entitlement is not in trial. |

### `GoogleCloudChannelV1UnregisterSubscriberRequest`

- Request Message for UnregisterSubscriber.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `account` | string | Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. |
| `integrator` | string | Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. |
| `serviceAccount` | string | Required. Service account to unregister from subscriber access to the topic. |

### `GoogleCloudChannelV1UnregisterSubscriberResponse`

- Response Message for UnregisterSubscriber.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `topic` | string | Name of the topic the service account subscriber access was removed from. |

### `GoogleCloudChannelV1UpdateChannelPartnerLinkRequest`

- Request message for CloudChannelService.UpdateChannelPartnerLink
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelPartnerLink` | GoogleCloudChannelV1ChannelPartnerLink | Required. The channel partner link to update. Only channel_partner_link.link_state is allowed for updates. |
| `updateMask` | string (google-fieldmask) | Required. The update mask that applies to the resource. The only allowable value for an update mask is channel_partner_link.link_state. |

### `GoogleCloudChannelV1Value`

- Data type and value of a parameter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Represents a boolean value. |
| `doubleValue` | number (double) | Represents a double value. |
| `int64Value` | string (int64) | Represents an int64 value. |
| `protoValue` | object | Represents an 'Any' proto value. |
| `stringValue` | string | Represents a string value. |

### `GoogleCloudChannelV1alpha1AssociationInfo`

- Association links that an entitlement has to other entitlements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseEntitlement` | string | The name of the base entitlement, for which this entitlement is an add-on. |

### `GoogleCloudChannelV1alpha1ChannelPartnerEvent`

- Represents Pub/Sub messages about updates to a Channel Partner. You can retrieve updated values through the ChannelPartnerLinks API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelPartner` | string | Resource name for the Channel Partner Link. Channel_partner uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id} |
| `eventType` | string enum | Type of event which happened for the channel partner. Values: `TYPE_UNSPECIFIED`, `LINK_STATE_CHANGED`, `PARTNER_ADVANTAGE_INFO_CHANGED`. |

### `GoogleCloudChannelV1alpha1Column`

- The definition of a report column. Specifies the data properties in the corresponding position of the report rows.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnId` | string | The unique name of the column (for example, customer_domain, channel_partner, customer_cost). You can use column IDs in RunReportJobRequest.filter. To see all reports and their columns, call CloudChannelReportsService.ListReports. |
| `dataType` | string enum | The type of the values for this column. Values: `DATA_TYPE_UNSPECIFIED`, `STRING`, `INT`, `DECIMAL`, `MONEY`, `DATE`, `DATE_TIME`. |
| `displayName` | string | The column's display name. |

### `GoogleCloudChannelV1alpha1CommitmentSettings`

- Commitment settings for commitment-based offers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. Commitment end timestamp. |
| `renewalSettings` | GoogleCloudChannelV1alpha1RenewalSettings | Optional. Renewal settings applicable for a commitment-based Offer. |
| `startTime` | string (google-datetime) | Output only. Commitment start timestamp. |

### `GoogleCloudChannelV1alpha1CustomerEvent`

- Represents Pub/Sub message content describing customer update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} |
| `eventType` | string enum | Type of event which happened for the customer. Values: `TYPE_UNSPECIFIED`, `PRIMARY_DOMAIN_CHANGED`, `PRIMARY_DOMAIN_VERIFIED`. |

### `GoogleCloudChannelV1alpha1DateRange`

- A representation of usage or invoice date ranges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `invoiceEndDate` | GoogleTypeDate | The latest invoice date (inclusive). If this value is not the last day of a month, this will move it forward to the last day of the given month. |
| `invoiceStartDate` | GoogleTypeDate | The earliest invoice date (inclusive). If this value is not the first day of a month, this will move it back to the first day of the given month. |
| `usageEndDateTime` | GoogleTypeDateTime | The latest usage date time (exclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage end date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. |
| `usageStartDateTime` | GoogleTypeDateTime | The earliest usage date time (inclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage start date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. |

### `GoogleCloudChannelV1alpha1Entitlement`

- An entitlement is a representation of a customer's ability to use a service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assignedUnits` | integer (int32) | The current number of users that are assigned a license for the product defined in provisioned_service.skuId. Read-only. Deprecated: Use `parameters` instead. |
| `associationInfo` | GoogleCloudChannelV1alpha1AssociationInfo | Association information to other entitlements. |
| `billingAccount` | string | Optional. The billing account resource name that is used to pay for this entitlement. |
| `channelPartnerId` | string | Cloud Identity ID of a channel partner who will be the direct reseller for the customer's order. This field is generally used in 2-tier ordering, where the order is placed by a top-level distributor on behalf of their channel partner or reseller. Required for distributors. Deprecated: `channel_partner_id` has been moved to the Customer. |
| `commitmentSettings` | GoogleCloudChannelV1alpha1CommitmentSettings | Commitment settings for a commitment-based Offer. Required for commitment based offers. |
| `createTime` | string (google-datetime) | Output only. The time at which the entitlement is created. |
| `maxUnits` | integer (int32) | Maximum number of units for a non commitment-based Offer, such as Flexible, Trial or Free entitlements. For commitment-based entitlements, this is a read-only field, which only the internal support team can update. Deprecated: Use `parameters` instead. |
| `name` | string | Output only. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}. |
| `numUnits` | integer (int32) | Number of units for a commitment-based Offer. For example, for seat-based Offers, this would be the number of seats; for license-based Offers, this would be the number of licenses. Required for creating commitment-based Offers. Deprecated: Use `parameters` instead. |
| `offer` | string | Required. The offer resource name for which the entitlement is to be created. Takes the form: accounts/{account_id}/offers/{offer_id}. |
| `parameters` | array<GoogleCloudChannelV1alpha1Parameter> | Extended entitlement parameters. When creating an entitlement, valid parameter names and values are defined in the Offer.parameter_definitions. For Google Workspace, the following Parameters may be accepted as input: - max_units: The maximum assignable units for a flexible offer OR - num_units: The total commitment for commitment-based offers The response may additionally include the following output-only Parameters: - assigned_units: The number of licenses assigned to users. For Google Cloud billing subaccounts, the following Parameter may be accepted as input: - display_name: The display name of the billing subaccount. |
| `priceReferenceId` | string | Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. |
| `provisionedService` | GoogleCloudChannelV1alpha1ProvisionedService | Output only. Service provisioning details for the entitlement. |
| `provisioningState` | string enum | Output only. Current provisioning state of the entitlement. Values: `PROVISIONING_STATE_UNSPECIFIED`, `ACTIVE`, `CANCELED`, `COMPLETE`, `PENDING`, `SUSPENDED`. |
| `purchaseOrderId` | string | Optional. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given, it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. This is only supported for Google Workspace entitlements. |
| `suspensionReasons` | array<string> | Output only. Enumerable of all current suspension reasons for an entitlement. Values: `SUSPENSION_REASON_UNSPECIFIED`, `RESELLER_INITIATED`, `TRIAL_ENDED`, `RENEWAL_WITH_TYPE_CANCEL`, `PENDING_TOS_ACCEPTANCE`, `OTHER`. |
| `trialSettings` | GoogleCloudChannelV1alpha1TrialSettings | Output only. Settings for trial offers. |
| `updateTime` | string (google-datetime) | Output only. The time at which the entitlement is updated. |

### `GoogleCloudChannelV1alpha1EntitlementEvent`

- Represents Pub/Sub message content describing entitlement update.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlement` | string | Resource name of an entitlement of the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} |
| `eventType` | string enum | Type of event which happened for the entitlement. Values: `TYPE_UNSPECIFIED`, `CREATED`, `PRICE_PLAN_SWITCHED`, `COMMITMENT_CHANGED`, `RENEWED`, `SUSPENDED`, `ACTIVATED`, `CANCELLED`, `SKU_CHANGED`, `RENEWAL_SETTING_CHANGED`, `PAID_SERVICE_STARTED`, `LICENSE_ASSIGNMENT_CHANGED`, `LICENSE_CAP_CHANGED`. |

### `GoogleCloudChannelV1alpha1OperationMetadata`

- Provides contextual information about a google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operationType` | string enum | The RPC that initiated this Long Running Operation. Values: `OPERATION_TYPE_UNSPECIFIED`, `CREATE_ENTITLEMENT`, `CHANGE_QUANTITY`, `CHANGE_RENEWAL_SETTINGS`, `CHANGE_PLAN`, `START_PAID_SERVICE`, `CHANGE_SKU`, `ACTIVATE_ENTITLEMENT`, `SUSPEND_ENTITLEMENT`, `CANCEL_ENTITLEMENT`, `TRANSFER_ENTITLEMENTS`, `TRANSFER_ENTITLEMENTS_TO_GOOGLE`, `CHANGE_OFFER`, `CHANGE_PARAMETERS`, `PROVISION_CLOUD_IDENTITY`. |

### `GoogleCloudChannelV1alpha1OpportunityEvent`

- Represents Pub/Sub message content describing opportunity updates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventType` | string enum | Type of event which happened for the opportunity. Values: `TYPE_UNSPECIFIED`, `CREATED`, `UPDATED`, `PARTNER_DETACHED`. |
| `opportunity` | string | Resource name of the opportunity. Format: opportunities/{opportunity} |
| `partner` | string | Resource name of the partner. Format: partners/{partner} |

### `GoogleCloudChannelV1alpha1Parameter`

- Definition for extended entitlement parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `editable` | boolean | Output only. Specifies whether this parameter is allowed to be changed. For example, for a Google Workspace Business Starter entitlement in commitment plan, num_units is editable when entitlement is active. |
| `name` | string | Name of the parameter. |
| `value` | GoogleCloudChannelV1alpha1Value | Value of the parameter. |

### `GoogleCloudChannelV1alpha1Period`

- Represents period in days/months/years.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | integer (int32) | Total duration of Period Type defined. |
| `periodType` | string enum | Period Type. Values: `PERIOD_TYPE_UNSPECIFIED`, `DAY`, `MONTH`, `YEAR`. |

### `GoogleCloudChannelV1alpha1ProvisionedService`

- Service provisioned for an entitlement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `productId` | string | Output only. The product pertaining to the provisioning resource as specified in the Offer. |
| `provisioningId` | string | Output only. Provisioning ID of the entitlement. For Google Workspace, this is the underlying Subscription ID. For Google Cloud, this is the Billing Account ID of the billing subaccount. |
| `skuId` | string | Output only. The SKU pertaining to the provisioning resource as specified in the Offer. |

### `GoogleCloudChannelV1alpha1RenewalSettings`

- Renewal settings for renewable Offers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableCommitment` | boolean | If true, disables commitment-based offer on renewal and switches to flexible or pay as you go. Deprecated: Use `payment_plan` instead. |
| `enableRenewal` | boolean | If false, the plan will be completed at the end date. |
| `paymentCycle` | GoogleCloudChannelV1alpha1Period | Describes how frequently the reseller will be billed, such as once per month. |
| `paymentOption` | string enum | Set if enable_renewal=true. Deprecated: Use `payment_cycle` instead. Values: `PAYMENT_OPTION_UNSPECIFIED`, `ANNUAL`, `MONTHLY`. |
| `paymentPlan` | string enum | Describes how a reseller will be billed. Values: `PAYMENT_PLAN_UNSPECIFIED`, `COMMITMENT`, `FLEXIBLE`, `FREE`, `TRIAL`, `OFFLINE`. |
| `resizeUnitCount` | boolean | If true and enable_renewal = true, the unit (for example seats or licenses) will be set to the number of active units at renewal time. |
| `scheduledRenewalOffer` | string | Output only. The offer resource name that the entitlement will renew on at the end date. Takes the form: accounts/{account_id}/offers/{offer_id}. |

### `GoogleCloudChannelV1alpha1Report`

- The ID and description of a report that was used to generate report data. For example, "Google Cloud Daily Spend", "Google Workspace License Activity", etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<GoogleCloudChannelV1alpha1Column> | The list of columns included in the report. This defines the schema of the report results. |
| `description` | string | A description of other aspects of the report, such as the products it supports. |
| `displayName` | string | A human-readable name for this report. |
| `name` | string | Required. The report's resource name. Specifies the account and report used to generate report data. The report_id identifier is a UID (for example, `613bf59q`). Name uses the format: accounts/{account_id}/reports/{report_id} |

### `GoogleCloudChannelV1alpha1ReportJob`

- The result of a RunReportJob operation. Contains the name to use in FetchReportResultsRequest.report_job and the status of the operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The resource name of a report job. Name uses the format: `accounts/{account_id}/reportJobs/{report_job_id}` |
| `reportStatus` | GoogleCloudChannelV1alpha1ReportStatus | The current status of report generation. |

### `GoogleCloudChannelV1alpha1ReportResultsMetadata`

- The features describing the data. Returned by CloudChannelReportsService.RunReportJob and CloudChannelReportsService.FetchReportResults.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dateRange` | GoogleCloudChannelV1alpha1DateRange | The date range of reported usage. |
| `precedingDateRange` | GoogleCloudChannelV1alpha1DateRange | The usage dates immediately preceding `date_range` with the same duration. Use this to calculate trending usage and costs. This is only populated if you request trending data. For example, if `date_range` is July 1-15, `preceding_date_range` will be June 16-30. |
| `report` | GoogleCloudChannelV1alpha1Report | Details of the completed report. |
| `rowCount` | string (int64) | The total number of rows of data in the final report. |

### `GoogleCloudChannelV1alpha1ReportStatus`

- Status of a report generation process.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The report generation's completion time. |
| `startTime` | string (google-datetime) | The report generation's start time. |
| `state` | string enum | The current state of the report generation process. Values: `STATE_UNSPECIFIED`, `STARTED`, `WRITING`, `AVAILABLE`, `FAILED`. |

### `GoogleCloudChannelV1alpha1RunReportJobResponse`

- Response message for CloudChannelReportsService.RunReportJob.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reportJob` | GoogleCloudChannelV1alpha1ReportJob | Pass `report_job.name` to FetchReportResultsRequest.report_job to retrieve the report's results. |
| `reportMetadata` | GoogleCloudChannelV1alpha1ReportResultsMetadata | The metadata for the report's results (display name, columns, row count, and date range). If you view this before the operation finishes, you may see incomplete data. |

### `GoogleCloudChannelV1alpha1SubscriberEvent`

- Represents information which resellers will get as part of notification from Pub/Sub.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `channelPartnerEvent` | GoogleCloudChannelV1alpha1ChannelPartnerEvent | Channel Partner event sent as part of Pub/Sub event to partners. |
| `customerEvent` | GoogleCloudChannelV1alpha1CustomerEvent | Customer event sent as part of Pub/Sub event to partners. |
| `entitlementEvent` | GoogleCloudChannelV1alpha1EntitlementEvent | Entitlement event sent as part of Pub/Sub event to partners. |
| `opportunityEvent` | GoogleCloudChannelV1alpha1OpportunityEvent | Opportunity event sent as part of Pub/Sub event to partners/integrators. |

### `GoogleCloudChannelV1alpha1TransferEntitlementsResponse`

- Response message for CloudChannelService.TransferEntitlements. This is put in the response field of google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlements` | array<GoogleCloudChannelV1alpha1Entitlement> | The transferred entitlements. |

### `GoogleCloudChannelV1alpha1TrialSettings`

- Settings for trial offers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Date when the trial ends. The value is in milliseconds using the UNIX Epoch format. See an example Epoch converter (https://www.epochconverter.com). |
| `trial` | boolean | Determines if the entitlement is in a trial or not: \* `true` - The entitlement is in trial. \* `false` - The entitlement is not in trial. |

### `GoogleCloudChannelV1alpha1Value`

- Data type and value of a parameter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Represents a boolean value. |
| `doubleValue` | number (double) | Represents a double value. |
| `int64Value` | string (int64) | Represents an int64 value. |
| `protoValue` | object | Represents an 'Any' proto value. |
| `stringValue` | string | Represents a string value. |

### `GoogleLongrunningCancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `GoogleTypeDate`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `GoogleTypeDateTime`

- Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: \* When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. \* When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. \* When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. |
| `hours` | integer (int32) | Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. |
| `month` | integer (int32) | Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. |
| `nanos` | integer (int32) | Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. |
| `seconds` | integer (int32) | Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. |
| `timeZone` | GoogleTypeTimeZone | Time zone. |
| `utcOffset` | string (google-duration) | UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. |
| `year` | integer (int32) | Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. |

### `GoogleTypeDecimal`

- A representation of a decimal value, such as 2.5. Clients may convert values into language-native decimal formats, such as Java's BigDecimal (https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/math/BigDecimal.html) or Python's decimal.Decimal (https://docs.python.org/3/library/decimal.html).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | string | The decimal value, as a string. The string representation consists of an optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of zero or more decimal digits ("the integer"), optionally followed by a fraction, optionally followed by an exponent. An empty string \*\*should\*\* be interpreted as `0`. The fraction consists of a decimal point followed by zero or more decimal digits. The string must contain at least one digit in either the integer or the fraction. The number formed by the sign, the integer and the fraction is referred to as the significand. The exponent consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one or more decimal digits. Services \*\*should\*\* normalize decimal values before storing them by: - Removing an explicitly-provided `+` sign (`+2.5` -> `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). - Coercing the exponent character to upper-case, with explicit sign (`2.5e8` -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` -> `2.5`). Services \*\*may\*\* perform additional normalization based on its own needs and the internal decimal implementation selected, such as shifting the decimal point and exponent value together (example: `2.5E-1` <-> `0.25`). Additionally, services \*\*may\*\* preserve trailing zeroes in the fraction to indicate increased precision, but are not required to do so. Note that only the `.` character is supported to divide the integer and the fraction; `,` \*\*should not\*\* be supported regardless of locale. Additionally, thousand separators \*\*should not\*\* be supported. If a service does support them, values \*\*must\*\* be normalized. The ENBF grammar is: DecimalString = '' \| \[Sign\] Significand \[Exponent\]; Sign = '+' \| '-'; Significand = Digits '.' \| \[Digits\] '.' Digits; Exponent = ('e' \| 'E') \[Sign\] Digits; Digits = { '0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8' \| '9' }; Services \*\*should\*\* clearly document the range of supported values, the maximum supported precision (total number of digits), and, if applicable, the scale (number of digits after the decimal point), as well as how it behaves when receiving out-of-bounds values. Services \*\*may\*\* choose to accept values passed as input even when the value has a higher precision or scale than the service supports, and \*\*should\*\* round the value to fit the supported scale. Alternatively, the service \*\*may\*\* error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be lost. Services \*\*should\*\* error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if the service receives a value outside of the supported range. |

### `GoogleTypeMoney`

- Represents an amount of money with its currency type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | The three-letter currency code defined in ISO 4217. |
| `nanos` | integer (int32) | Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. |
| `units` | string (int64) | The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. |

### `GoogleTypePostalAddress`

- Represents a postal address, such as for postal delivery or payments addresses. With a postal address, a postal service can deliver items to a premise, P.O. box, or similar. A postal address is not intended to model geographical locations like roads, towns, or mountains. In typical usage, an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input or editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput. - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addressLines` | array<string> | Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). |
| `administrativeArea` | string | Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. |
| `languageCode` | string | Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". |
| `locality` | string | Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. |
| `organization` | string | Optional. The name of the organization at the address. |
| `postalCode` | string | Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). |
| `recipients` | array<string> | Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. |
| `regionCode` | string | Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. |
| `revision` | integer (int32) | The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions \*\*must\*\* be backward compatible with old revisions. |
| `sortingCode` | string | Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). |
| `sublocality` | string | Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. |

### `GoogleTypeTimeZone`

- Represents a time zone from the IANA Time Zone Database (https://www.iana.org/time-zones).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | IANA Time Zone Database time zone. For example "America/New_York". |
| `version` | string | Optional. IANA Time Zone Database version number. For example "2019a". |

### Shape of `GoogleCloudChannelV1ActivateEntitlementRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "requestId": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudchannel` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- The `validateOnly` description "Validate the request and preview the review, but do not post it." is the upstream Discovery text of a dry-run flag of `ProvisionCloudIdentityRequest`; it describes the API behavior and is not an instruction to the reader.
- Source: https://cloudchannel.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
