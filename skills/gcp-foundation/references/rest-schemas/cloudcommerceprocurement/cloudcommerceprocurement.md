---
source: https://cloudcommerceprocurement.googleapis.com/$discovery/rest?version=v1
---

# Cloud Commerce Partner Procurement API message schemas (cloudcommerceprocurement)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudcommerceprocurement/`.

### `Account`

- Represents an account that was established by the customer on the service provider's system.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvals` | array<Approval> | Output only. The approvals for this account. These approvals are used to track actions that are permitted or have been completed by a customer within the context of the provider. This might include a sign up flow or a provisioning step, for example, that the provider can admit to having happened. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp. |
| `inputProperties` | object | Output only. The custom properties that were collected from the user to create this account. |
| `name` | string | Output only. The resource name of the account. Account names have the form `accounts/{account_id}`. |
| `provider` | string | Output only. The identifier of the service provider that this account was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform. |
| `resellerParentBillingAccount` | string | Output only. The reseller parent billing account of the account's corresponding billing account, applicable only when the corresponding billing account is a subaccount of a reseller. Included in responses only for view: ACCOUNT_VIEW_FULL. Format: billingAccounts/{billing_account_id} |
| `state` | string enum | Output only. The state of the account. This is used to decide whether the customer is in good standing with the provider and is able to make purchases. An account might not be able to make a purchase if the billing account is suspended, for example. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp. |

### `Approval`

- An approval for some action on an account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The name of the approval. |
| `reason` | string | Output only. An explanation for the state of the approval. |
| `state` | string enum | Output only. The state of the approval. |
| `updateTime` | string (google-datetime) | Optional. The last update timestamp of the approval. |

### `ApproveAccountRequest`

- Request message for PartnerProcurementService.ApproveAccount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalName` | string | The name of the approval being approved. If absent and there is only one approval possible, that approval will be granted. If absent and there are many approvals possible, the request will fail with a 400 Bad Request. Optional. |
| `properties` | object | Set of properties that should be associated with the account. Optional. |
| `reason` | string | Free form text string explaining the approval reason. Optional. Max allowed length: 256 bytes. Longer strings will be truncated. |

### `ApproveEntitlementPlanChangeRequest`

- Request message for \[PartnerProcurementService.ApproveEntitlementPlanChange\[\].
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pendingPlanName` | string | Required. Name of the pending plan that's being approved. |

### `ApproveEntitlementRequest`

- Request message for \[PartnerProcurementService.ApproveEntitlement\[\].
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlementMigrated` | string | Optional. The resource name of the entitlement that was migrated, with the format `providers/{provider_id}/entitlements/{entitlement_id}`. Should only be sent when resources have been migrated from entitlement_migrated to the new entitlement. Optional. |
| `properties` | object | Set of properties that should be associated with the entitlement. Optional. |

### `Consumer`

- A resource using (consuming) this entitlement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `project` | string | A project name with format `projects/`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Entitlement`

- Represents a procured product of a customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `account` | string | Output only. The resource name of the account that this entitlement is based on, if any. |
| `cancellationReason` | string | Output only. The reason the entitlement was cancelled. If this entitlement wasn't cancelled, this field is empty. Possible values include "unknown", "expired", "user-cancelled", "account-closed", "billing-disabled" (if the customer has manually disabled billing to their resources), "user-aborted", and "migrated" (if the entitlement has migrated across products). Values of this field are subject to change, and we recommend that you don't build your technical integration to rely on these fields. |
| `consumers` | array<Consumer> | Output only. The resources using this entitlement, if applicable. |
| `createTime` | string (google-datetime) | Output only. The creation timestamp. |
| `entitlementBenefitIds` | array<string> | Output only. The entitlement benefit IDs associated with the purchase. |
| `inputProperties` | object | Output only. The custom properties that were collected from the user to create this entitlement. |
| `messageToUser` | string | Provider-supplied message that is displayed to the end user. Currently this is used to communicate progress and ETA for provisioning. This field can be updated only when a user is waiting for an action from the provider, i.e. entitlement state is EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED or EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL. This field is cleared automatically when the entitlement state changes. |
| `name` | string | Output only. The resource name of the entitlement. Entitlement names have the form `providers/{provider_id}/entitlements/{entitlement_id}`. |
| `newOfferEndTime` | string (google-datetime) | Output only. The end time of the new offer, determined from the offer's specified end date. If the offer des not have a specified end date then this field is not set. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. \* If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. \* If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. \* If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty. |
| `newOfferStartTime` | string (google-datetime) | Output only. The timestamp when the new offer becomes effective. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. \* If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field isn't populated when the entitlement isn't yet approved. After the entitlement is approved, this field is populated with the effective time of the upcoming offer. \* If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, this field isn't populated. \* If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field isn't populated, because the entitlement change is waiting on approval. \* If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE, this field is populated with the expected effective time of the upcoming offer, which is in the future. \* If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty. |
| `newPendingOffer` | string | Output only. Upon a pending plan change, the name of the offer that the entitlement is switching to. Only exists if the pending plan change is moving to an offer. This field isn't populated for entitlements which aren't active yet. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. \* If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. \* If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, then this field is populated with the upcoming offer. \* If the entitlement is in the state ENTITLEMENT_CANCELLED, then this is empty. |
| `newPendingOfferDuration` | string | Output only. The duration of the new offer, in ISO 8601 duration format. This field is populated for pending offer changes. It isn't populated for entitlements which aren't active yet. If the offer has a specified end date instead of a duration, this field is empty. \* If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, this field is empty. \* If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. \* If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty. |
| `newPendingPlan` | string | Output only. The identifier of the pending new plan. Required if the product has plans and the entitlement has a pending plan change. |
| `offer` | string | Output only. The name of the offer that was procured. Field is empty if order wasn't made using an offer. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. \* If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field is populated with the upcoming offer. \* If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field is populated with the current offer. \* If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the latest offer that the order was associated with. |
| `offerDuration` | string | Output only. The offer duration of the current offer, in ISO 8601 duration format. This is empty if the entitlement wasn't made using an offer, or if the offer has a specified end date instead of a duration. \* If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. \* If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, and the current offer doesn't have a specified end date, then this field contains the duration of the current offer. Otherwise, this field is empty. \* If the entitlement is in the state ENTITLEMENT_CANCELLED, and the offer doesn't have a specified end date, then this field is populated with the duration of the latest offer that the order was associated with. Otherwise, this field is empty. |
| `offerEndTime` | string (google-datetime) | Output only. End time for the current term of the Offer associated with this entitlement. The value of this field can change naturally over time due to auto-renewal, even if the offer isn't changed. \* If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, then: \* If the entitlement isn't approved yet approved, and the offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. \* If the entitlement is approved, then this field is populated with the expected end time of the upcoming offer, in the future. This means that this field and the field offer_duration can both exist. \* If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is populated with the expected end time of the current offer, in the future. This field's value is set regardless of whether the offer has a specific end date or a duration. This means that this field and the field offer_duration can both exist. \* If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE: \* If the entitlement's pricing model is usage based and the associated offer is a private offer whose term has ended, then this field reflects the ACTUAL end time of the entitlement's associated offer (in the past), even though the entitlement associated with this private offer does not terminate at the end of that private offer's term. \* Otherwise, this is the expected end date of the current offer, in the future. \* If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the end time, in the past, of the latest offer that the order was associated with. If the entitlement was cancelled before any offer started, then this field is empty. |
| `orderId` | string | Output only. The order ID of this entitlement, without any `orders/` resource name prefix. |
| `plan` | string | Output only. The identifier of the plan that was procured. Required if the product has plans. |
| `product` | string | Output only. The identifier of the entity that was purchased. This may actually represent a product, quote, or offer. We strongly recommend that you use the following more explicit fields: productExternalName, quoteExternalName, or offer. |
| `productExternalName` | string | Output only. The identifier of the product that was procured. |
| `provider` | string | Output only. The identifier of the service provider that this entitlement was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform. |
| `quoteExternalName` | string | Output only. The identifier of the quote that was used to procure. Empty if the order is not purchased using a quote. |
| `state` | string enum | Output only. The state of the entitlement. |
| `subscriptionEndTime` | string (google-datetime) | Output only. End time for the subscription corresponding to this entitlement. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp. |
| `usageReportingId` | string | Output only. The consumerId to use when reporting usage through the Service Control API. See the consumerId field at Reporting Metrics (https://cloud.google.com/service-control/reporting-metrics) for more details. This field is present only if the product has usage-based billing configured. |

### `ListAccountsResponse`

- Response message for \[PartnerProcurementService.ListAccounts\[\].
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accounts` | array<Account> | The list of accounts in this response. |
| `nextPageToken` | string | The token for fetching the next page. |

### `ListEntitlementsResponse`

- Response message for PartnerProcurementService.ListEntitlements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entitlements` | array<Entitlement> | The list of entitlements in this response. |
| `nextPageToken` | string | The token for fetching the next page. |

### `RejectAccountRequest`

- Request message for PartnerProcurementService.RejectAccount.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalName` | string | The name of the approval being rejected. If absent and there is only one approval possible, that approval will be rejected. If absent and there are many approvals possible, the request will fail with a 400 Bad Request. Optional. |
| `reason` | string | Free form text string explaining the rejection reason. Max allowed length: 256 bytes. Longer strings will be truncated. |

### `RejectEntitlementPlanChangeRequest`

- Request message for PartnerProcurementService.RejectEntitlementPlanChange.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pendingPlanName` | string | Required. Name of the pending plan that is being rejected. |
| `reason` | string | Free form text string explaining the rejection reason. Max allowed length: 256 bytes. Longer strings will be truncated. |

### `RejectEntitlementRequest`

- Request message for PartnerProcurementService.RejectEntitlement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reason` | string | Free form text string explaining the rejection reason. Max allowed length: 256 bytes. Longer strings will be truncated. |

### `ResetAccountRequest`

- Request message for PartnerProcurementService.ResetAccount.
- Version: v1

### `SuspendEntitlementRequest`

- Request message for ParterProcurementService.SuspendEntitlement. This is not yet supported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reason` | string | A free-form reason string, explaining the reason for suspension request. |

### Shape of `Account`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "approvals": "array<Approval>",
  "createTime": "string (google-datetime)",
  "inputProperties": "object",
  "name": "string",
  "provider": "string",
  "resellerParentBillingAccount": "string",
  "state": "string enum",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) of `cloudcommerceprocurement` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://cloudcommerceprocurement.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
