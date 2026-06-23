# Charges

Represents a single attempt to move money into your Stripe account. For new integrations, charges are typically created automatically by confirming a PaymentIntent rather than calling the Charges API directly.

## Signature / Usage

```bash
# Legacy direct charge creation (prefer PaymentIntent for new integrations)
curl https://api.stripe.com/v1/charges \
  -u "sk_test_YOUR_SECRET_KEY:" \
  -d amount=2000 \
  -d currency=usd \
  -d source=tok_visa \
  -d description="My First Test Charge (created for API docs)"
```

## Options / Props

### Create (`POST /v1/charges`)

| Name | Type | Description |
|------|------|-------------|
| `amount` | integer (required) | Amount in smallest currency unit (e.g., 2000 = $20.00 USD) |
| `currency` | string (required) | Lowercase ISO 4217 currency code |
| `payment_method` | string | ID of a PaymentMethod to charge |
| `customer` | string | Customer ID to associate the charge with |
| `description` | string | Arbitrary string for internal reference |
| `capture` | boolean | Whether to capture immediately. Default: `true` |
| `statement_descriptor` | string | Custom text on the customer's card statement |
| `receipt_email` | string | Email address to send the receipt to |
| `metadata` | object | Arbitrary key-value pairs |
| `on_behalf_of` | string | Connected account ID (Stripe Connect) |
| `application_fee_amount` | integer | Fee amount for Connect platforms |

### Object Attributes

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (e.g., `ch_...`) |
| `amount` | integer | Charged amount in smallest currency unit |
| `amount_captured` | integer | Amount actually captured (supports partial captures) |
| `amount_refunded` | integer | Total amount refunded so far |
| `currency` | enum | ISO currency code |
| `status` | string | `succeeded`, `pending`, or `failed` |
| `paid` | boolean | `true` if charge succeeded or was authorized |
| `captured` | boolean | Whether the charge was captured |
| `refunded` | boolean | Whether any refund was issued |
| `disputed` | boolean | Whether the charge has been disputed |
| `payment_method` | string | ID of the payment method used |
| `payment_method_details` | object | Snapshot of payment method details at transaction time |
| `billing_details` | object | Billing address, email, name, phone |
| `outcome` | object | Authorization result: `type`, `risk_level` (0–100), `network_status` |
| `failure_code` | string | Error code if charge failed |
| `failure_message` | string | Human-readable failure explanation |
| `balance_transaction` | string | ID of the balance transaction |
| `receipt_url` | string | URL to the charge receipt |
| `metadata` | object | Custom key-value pairs |

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/charges` | Create a charge |
| GET | `/v1/charges/:id` | Retrieve a charge |
| POST | `/v1/charges/:id` | Update description or metadata |
| GET | `/v1/charges` | List all charges |
| POST | `/v1/charges/:id/capture` | Capture a previously uncaptured charge |
| GET | `/v1/charges/search` | Search charges with advanced filters |

## Notes

- For new integrations, use **PaymentIntent** instead of creating Charges directly — it provides better handling of 3DS, SCA, and authentication flows.
- A PaymentIntent may have multiple Charge objects (one per attempt); only one can succeed.
- `outcome.risk_level` values: `normal`, `elevated`, `highest`, `not_assessed`, `unknown` (from Stripe Radar).
- `capture=false` authorizes the card but does not move funds; call `/capture` later (typically within 7 days).
- Webhook events: `charge.succeeded`, `charge.failed`, `charge.captured`, `charge.refunded`, `charge.updated`.

## Related

- [PaymentIntents](./payment-intents.md)
- [Refunds](./refunds.md)
- [Disputes](./disputes.md)
