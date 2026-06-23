# Charge Types

Stripe Connect supports three charge flows for multi-party payments, plus the `on_behalf_of` modifier. Choose based on who the customer transacts with and whether funds need to be split across multiple recipients.

## Signature / Usage

### Direct Charge (charge on connected account)

```bash
# Authenticate as the connected account using Stripe-Account header
curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_...:" \
  -H "Stripe-Account: acct_1ExampleId" \
  -d amount=1000 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]=true" \
  -d application_fee_amount=123
```

### Destination Charge (charge on platform, transfer to connected account)

```bash
curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_...:" \
  -d amount=1000 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]=true" \
  -d "transfer_data[destination]=acct_1ExampleId" \
  -d application_fee_amount=123
```

### Separate Charges and Transfers

```bash
# Step 1: Create charge on platform
curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_...:" \
  -d amount=1000 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]=true" \
  -d transfer_group=ORDER_95

# Step 2: Transfer to connected accounts
curl https://api.stripe.com/v1/transfers \
  -u "sk_test_...:" \
  -d amount=700 \
  -d currency=usd \
  -d destination=acct_1VendorId \
  -d transfer_group=ORDER_95
```

### on_behalf_of (with destination charge)

```bash
curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_...:" \
  -d amount=1000 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]=true" \
  -d on_behalf_of=acct_1ExampleId \
  -d "transfer_data[destination]=acct_1ExampleId" \
  -d application_fee_amount=123
```

## Options / Props

### Key Parameters

| Name | Used With | Description |
|------|-----------|-------------|
| `Stripe-Account` header | Direct charges | Authenticate as a connected account |
| `application_fee_amount` | Direct / Destination | Platform fee in smallest currency unit |
| `transfer_data.destination` | Destination charges | Connected account ID to receive funds |
| `transfer_data.amount` | Destination charges | Amount to transfer (remainder stays on platform if omitted) |
| `transfer_group` | Separate charges & transfers | Groups a charge with its associated transfers |
| `on_behalf_of` | Destination / Separate | Connected account ID — makes connected account the settlement entity |

## Notes

### Comparison

| | Direct | Destination | Separate Charges & Transfers |
|---|---|---|---|
| Charge created on | Connected account | Platform | Platform |
| Stripe fees paid by | Configurable (either) | Platform | Platform |
| Multiple recipients | No | No | Yes |
| Refunds / chargebacks | Connected account balance | Platform balance | Platform balance |
| Complexity | Low | Medium | High |
| Best for | SaaS / direct-seller platforms | Branded marketplace (single seller) | Multi-party splits, deferred distribution |

### on_behalf_of Effects

When `on_behalf_of` is set on a destination or separate charge:
- Payment is processed in the connected account's country (fewer declines, no currency conversion).
- Uses the connected account's fee rate and statement descriptor.
- Customer's bank statement shows the connected account's address/phone.
- Payout timing follows the connected account's `delay_days` setting.
- Enables cross-border fund flows in supported regions.

### Refund Handling

| Type | Refund deducted from |
|------|---------------------|
| Direct | Connected account balance |
| Destination | Platform balance (can reverse transfer to recover from connected account) |
| Separate | Platform balance (can reverse transfers to recover) |

### Capabilities Required

- **Direct charges**: `card_payments` capability must be active on the connected account.
- **Transfers**: `transfers` capability must be active on the connected account.

## Related

- [accounts.md](./accounts.md)
- [transfers-payouts.md](./transfers-payouts.md)
