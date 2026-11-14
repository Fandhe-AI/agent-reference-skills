# Payout Intents (Global Payouts, API v2)

Send payouts from a Treasury financial account to a recipient's payout method with the API v2 Payout Intents resource. A PayoutIntent chooses the payout method, previews fees and FX, and can require confirmation before funds move; each attempt is tracked as an OutboundPayment.

## Signature / Usage

```bash
curl -X POST https://api.stripe.com/v2/money_management/payout_intents \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-10-28.endive" \
  --json '{
    "from": {
        "financial_account": "{{FINANCIALACCOUNTID_ID}}",
        "currency": "usd"
    },
    "to": {
        "recipient": "{{ACCOUNTIDGLOBALPAYOUTS_ID}}",
        "payout_method": "{{PAYOUTMETHODID_ID}}",
        "payout_method_options": {
            "bank_account": {
                "preferred_networks": [
                    "ach"
                ]
            }
        }
    },
    "amount": {
        "value": 1999,
        "currency": "usd"
    },
    "description": "Streamer earnings"
  }'
```

Confirm a PayoutIntent that is in `requires_action`:

```bash
curl -X POST https://api.stripe.com/v2/money_management/payout_intents/poi_1234/confirm \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-10-28.endive"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `from.financial_account` | string | Financial account ID to debit |
| `from.currency` | string | Currency debited |
| `to.recipient` | string | Recipient Account ID (Accounts v2) |
| `to.payout_method` | string | Optional payout method ID |
| `to.payout_method_options.bank_account.preferred_networks` | array | Optional network preference; Stripe selects from the list |
| `confirmation_method` | enum | `automatic` (default) or `manual`; cannot be changed after creation |
| `amount.value` / `amount.currency` | integer / string | Amount in minor units (for example, 100 = 1 USD) and currency |

Available `preferred_networks` by sender country:

| Sender country | Available networks |
| --- | --- |
| United States (domestic) | `ach`, `fedwire` |
| United Kingdom (domestic) | `fps` |
| Eurozone (domestic) | `sepa` |
| Cross-border | `ach`, `fps`, `sepa`, `swift` |

| Endpoint | Purpose |
| --- | --- |
| `POST /v2/money_management/payout_intents` | Create |
| `POST /v2/money_management/payout_intents/:id` | Update (while `pending` or `requires_action`) |
| `GET /v2/money_management/payout_intents/:id` | Retrieve and inspect `status` |
| `POST /v2/money_management/payout_intents/:id/confirm` | Confirm after review, or retry a failed payout |
| `POST /v2/money_management/payout_intents/:id/refresh_fx_quote` | Get a new exchange rate when the lock expired (`payout_intent_fx_quote_expired`) |
| `POST /v2/money_management/payout_intents/:id/refresh_recipient_verification` | Re-run the recipient name check |
| `POST /v2/money_management/payout_intents/:id/cancel` | Cancel |
| `POST /v2/money_management/recipient_verifications` | Create a Recipient Verification (Confirmation of Payee for UK domestic GBP, Verification of Payee for intra-EU payouts) |

Events (thin, API v2): `v2.money_management.payout_intent.requires_action`, `.posted`, `.canceled` (handle these), `.created` and `.processing` (optional), and `v2.money_management.outbound_payment.under_review`.

## Notes

- `requires_action` with `next_action.type` `confirm` appears when `confirmation_method` is `manual`, for UK cross-border payouts, and for UK domestic payouts whose Confirmation of Payee `match_result` is `close_match`, `no_match` or `unavailable` and not yet acknowledged. `next_action.confirm.fields_to_review` lists `estimated_fees`, `fx_quote` and `recipient_verification`. `next_action.type` `handle_failure` carries `failure_reason` (for example `insufficient_funds`, `payout_method_closed`); Stripe does not retry or reroute automatically.
- Set ACH payroll payouts with `to.payout_method_options.bank_account.preferred_network_options.ach.transaction_purpose` = `payroll` (with `preferred_networks` set to `ach`).
- The PayoutIntent, Outbound Payments and Recipient Verifications APIs were added in `2026-10-28.endive` (non-breaking). Outbound Payments are single payout attempts for integrations that handle retries and compliance checks themselves; most integrations use Payout Intents. `2026-10-28.preview` additionally removed `created_gt` / `created_gte` / `created_lt` / `created_lte` from list Outbound Payments in favor of a nested `created` parameter and changed the default ACH submission timing from same-day to next-day; these were not verified against the endive API reference.
- Treasury v1 `OutboundPayment` / `OutboundTransfer` (see `money-movement.md`) are separate resources from these v2 objects.
- Source: https://docs.stripe.com/global-payouts/send-money (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/outbound-flows-api-support (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/outbound-flows-api-updates (retrieved 2026-11-14)

## Related

- [Money management API v2](./money-management-v2.md)
- [Money Movement](./money-movement.md)
