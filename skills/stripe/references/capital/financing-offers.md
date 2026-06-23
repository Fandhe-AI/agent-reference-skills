# Financing Offers

Represents a financing offer from Stripe Capital to a Connect subaccount. Platforms retrieve, deliver, and track these offers throughout the capital lifecycle.

## Signature / Usage

```bash
# List financing offers for connected accounts on your platform
curl https://api.stripe.com/v1/capital/financing_offers \
  -u "sk_live_YOUR_SECRET_KEY:" \
  -d limit=3

# Mark an offer as delivered after notifying the merchant
curl -X POST https://api.stripe.com/v1/capital/financing_offers/financingoffer_1NPvKg2eZvKYlo2CnEEmlCVh/mark_delivered \
  -u "sk_live_YOUR_SECRET_KEY:"
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/capital/financing_offers` | List all financing offers |
| `GET` | `/v1/capital/financing_offers/:id` | Retrieve a specific offer |
| `POST` | `/v1/capital/financing_offers/:id/mark_delivered` | Mark offer as delivered |

## Options / Props

### Financing Offer Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`financingoffer_...`) |
| `object` | string | Always `"capital.financing_offer"` |
| `account` | string | Associated Stripe account ID |
| `created` | integer | Unix timestamp of creation |
| `expires_after` | float | Unix timestamp when offer expires (typically 30 days) |
| `financing_type` | enum | `cash_advance`, `fixed_term_loan`, or `flex_loan` |
| `product_type` | enum | `standard` or `refill` |
| `status` | enum | Current status of the offer (see status values below) |
| `livemode` | boolean | `true` for live mode, `false` for test mode |
| `metadata` | object | Arbitrary key-value pairs |
| `replacement` | string | ID of the offer that replaced this one |
| `replacement_for` | string | ID of the offer this one replaces |
| `charged_off_at` | timestamp | When the offer was charged off (nullable) |

### `offered_terms` Object

| Field | Type | Description |
|-------|------|-------------|
| `advance_amount` | integer | Amount offered in minor currency units |
| `fee_amount` | integer | Fixed fee in minor currency units |
| `currency` | string | Currency code (e.g., `"usd"`) |
| `withhold_rate` | float | Per-transaction withholding rate (e.g., `0.05` = 5%) |
| `campaign_type` | enum | `newly_eligible_user`, `previously_eligible_user`, or `repeat_user` |
| `target_payback_days` | integer | Estimated days to full repayment (nullable) |
| `repayment_interval_configuration` | object | Interval settings for term loans (nullable) |
| `previous_financing_fee_discount_rate` | float | Discount rate on remaining fee for refill products (nullable) |

### `accepted_terms` Object

Same fields as `offered_terms`, plus:

| Field | Type | Description |
|-------|------|-------------|
| `previous_financing_fee_discount_amount` | integer | Discount amount on remaining fee for refill products (nullable) |

### `status_transitions` Object

| Field | Type | Description |
|-------|------|-------------|
| `accepted_at` | timestamp | When status changed to `accepted` |
| `canceled_at` | timestamp | When status changed to `canceled` |
| `fully_repaid_at` | timestamp | When status changed to `fully_repaid` |
| `paid_out_at` | timestamp | When status changed to `paid_out` |
| `rejected_at` | timestamp | When status changed to `rejected` |
| `replaced_at` | timestamp | When status changed to `replaced` |

### List Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `connected_account` | string | Filter by connected account ID |
| `status` | string | Filter by offer status |
| `created` | object | Filter by creation date (supports `.gt`, `.gte`, `.lt`, `.lte`) |
| `limit` | integer | Results per page (1–100, default 10) |
| `starting_after` | string | Pagination cursor (next page) |
| `ending_before` | string | Pagination cursor (previous page) |

### Status Values

| Status | Description |
|--------|-------------|
| `undelivered` | Initial state; not yet delivered to the connected account |
| `delivered` | Offer has been shown to the merchant |
| `accepted` | Merchant submitted the application |
| `paid_out` | Funds transferred to the connected account |
| `fully_repaid` | Financing fully repaid |
| `expired` | Offer expired (typically 30 days after creation) |
| `canceled` | Canceled within 48 hours of acceptance |
| `rejected` | Rejected by Capital's servicing team |
| `replaced` | Superseded by a new offer |

## Notes

- Capital webhooks must be configured on the **platform account**, not as Connect webhooks.
- Call `mark_delivered` after notifying the merchant and BCC `Capital-offers@stripe.com` on the notification email.
- Never embed Account Links directly in emails — they expire quickly. Send a stable platform URL instead, then generate a fresh Account Link on redirect.
- Generate Account Links with `type=capital_financing_offer` to present the application, and `type=capital_financing_reporting` to show repayment progress.
- `accepted_terms` is populated only after the merchant accepts the offer; `offered_terms` reflects what was originally presented.

## Webhook Events

| Event | Trigger |
|-------|---------|
| `capital.financing_offer.created` | New offer created |
| `capital.financing_offer.accepted` | Merchant submits application |
| `capital.financing_offer.paid_out` | Funds transferred |
| `capital.financing_offer.fully_repaid` | Full repayment complete |
| `capital.financing_offer.canceled` | Offer canceled |
| `capital.financing_offer.rejected` | Application rejected |
| `capital.financing_offer.expired` | Offer expired |
| `capital.financing_offer.replacement_created` | Offer replaced by new offer |

## Related

- [Financing Transactions](./financing-transactions.md)
- [Financing Summary](./financing-summary.md)
