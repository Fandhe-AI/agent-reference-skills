# Refunds

Represents a refund of a previously created Charge or PaymentIntent. Funds are returned to the original payment method.

## Signature / Usage

```bash
# Full refund of a charge
curl https://api.stripe.com/v1/refunds \
  -u "sk_test_YOUR_SECRET_KEY:" \
  -d charge=ch_1NirD82eZvKYlo2CIvbtLWuY

# Partial refund with reason
curl https://api.stripe.com/v1/refunds \
  -u "sk_test_YOUR_SECRET_KEY:" \
  -d charge=ch_1NirD82eZvKYlo2CIvbtLWuY \
  -d amount=500 \
  -d reason=requested_by_customer
```

## Options / Props

### Create (`POST /v1/refunds`)

| Name | Type | Description |
|------|------|-------------|
| `charge` | string | ID of the Charge to refund (mutually exclusive with `payment_intent`) |
| `payment_intent` | string | ID of the PaymentIntent to refund (mutually exclusive with `charge`) |
| `amount` | integer | Amount to refund in smallest currency unit. Defaults to the full remaining amount |
| `reason` | enum | `duplicate`, `fraudulent`, or `requested_by_customer` |
| `metadata` | object | Arbitrary key-value pairs |
| `refund_application_fee` | boolean | Whether to also refund the application fee (Connect) |
| `reverse_transfer` | boolean | Whether to reverse the transfer when refunding (Connect) |

### Object Attributes

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (e.g., `re_...`) |
| `object` | string | Always `"refund"` |
| `amount` | integer | Refund amount in smallest currency unit |
| `currency` | enum | ISO 4217 currency code |
| `status` | enum | `pending`, `requires_action`, `succeeded`, `failed`, or `canceled` |
| `charge` | string | ID of the refunded Charge |
| `payment_intent` | string | ID of the refunded PaymentIntent |
| `reason` | enum | Reason for the refund (user-provided or Stripe-generated) |
| `failure_reason` | string | Reason for failure: `lost_or_stolen_card`, `expired_or_canceled_card`, `insufficient_funds`, `declined`, etc. |
| `balance_transaction` | string | Balance transaction describing account impact |
| `description` | string | Arbitrary string (non-card refunds only) |
| `metadata` | object | Custom key-value pairs |
| `created` | timestamp | Unix timestamp of creation |

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/refunds` | Create a refund |
| GET | `/v1/refunds/:id` | Retrieve a refund |
| POST | `/v1/refunds/:id` | Update metadata |
| GET | `/v1/refunds` | List all refunds |
| POST | `/v1/refunds/:id/cancel` | Cancel a pending refund |

## Notes

- Only charges that have not been fully refunded can be refunded; `amount` cannot exceed the remaining unrefunded balance.
- The Stripe-generated `reason` value `expired_uncaptured_charge` is set automatically and cannot be user-provided.
- Webhook events: `refund.created`, `refund.updated`, `refund.failed`. For payment-method-specific updates, listen to `charge.refund.updated` instead of `refund.updated`.
- Pending refunds (e.g., ACH) can be canceled via `POST /v1/refunds/:id/cancel`.

## Related

- [Charges](./charges.md)
- [PaymentIntents](./payment-intents.md)
- [Disputes](./disputes.md)
