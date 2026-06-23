# Issuing Cards

Represents a physical or virtual payment card issued to a Cardholder. Virtual cards are available immediately; physical cards are shipped to the cardholder's address.

## Signature / Usage

```bash
# Create a virtual card
curl https://api.stripe.com/v1/issuing/cards \
  -u "sk_test_YOUR_SECRET_KEY" \
  -d cardholder=ich_1MsKAB2eZvKYlo2C3eZ2BdvK \
  -d currency=usd \
  -d type=virtual \
  -d status=active \
  -d "spending_controls[spending_limits][0][amount]=5000" \
  -d "spending_controls[spending_limits][0][interval]=monthly"
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/issuing/cards` | Create a card |
| `GET` | `/v1/issuing/cards/:id` | Retrieve a card |
| `POST` | `/v1/issuing/cards/:id` | Update a card |
| `GET` | `/v1/issuing/cards` | List all cards |

## Options / Props

### Create Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cardholder` | string | Yes | ID of the Cardholder to associate the card with |
| `currency` | string | Yes | Three-letter ISO currency code (e.g., `usd`) |
| `type` | enum | Yes | `virtual` or `physical` |
| `status` | enum | No | `active` or `inactive` (default: `inactive`) |
| `spending_controls` | object | No | Spending limits and category/country restrictions |
| `shipping` | object | No | Shipping details (required for physical cards) |
| `exp_month` | integer | No | Desired expiration month (1–12) |
| `exp_year` | integer | No | Desired 4-digit expiration year |
| `replacement_for` | string | No | ID of card being replaced |
| `replacement_reason` | enum | No | `damaged`, `expired`, `lost`, or `stolen` |
| `pin` | object | No | Encrypted PIN for the card |
| `metadata` | object | No | Custom key-value pairs |

### spending_controls

| Name | Type | Description |
|------|------|-------------|
| `allowed_categories` | array | Merchant categories permitted (all others blocked) |
| `blocked_categories` | array | Merchant categories blocked (all others allowed) |
| `allowed_merchant_countries` | array | ISO 3166 alpha-2 codes of permitted countries |
| `blocked_merchant_countries` | array | ISO 3166 alpha-2 codes of blocked countries |
| `allowed_card_presences` | array | `present`, `not_present` |
| `spending_limits` | array | Amount-based limits per interval |
| `spending_limits[].amount` | integer | Maximum amount in smallest currency unit |
| `spending_limits[].interval` | enum | `all_time`, `daily`, `weekly`, `monthly`, `yearly`, `per_authorization` |
| `spending_limits[].categories` | array | Merchant categories the limit applies to (empty = all) |

### shipping (physical cards)

| Name | Type | Description |
|------|------|-------------|
| `shipping.name` | string | Recipient name |
| `shipping.address` | object | Delivery address |
| `shipping.service` | enum | `standard`, `express`, or `priority` |
| `shipping.type` | enum | `individual` (default) or `bulk` |
| `shipping.require_signature` | boolean | Require signature on delivery |

## Object Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (`ic_...`) |
| `brand` | string | Card brand (e.g., `Visa`) |
| `last4` | string | Last 4 digits of card number |
| `exp_month` | integer | Expiration month |
| `exp_year` | integer | Expiration year |
| `status` | enum | `active`, `inactive`, or `canceled` |
| `type` | enum | `virtual` or `physical` |
| `currency` | enum | Card currency |
| `cardholder` | object | Associated Cardholder object |
| `number` | string | Full card number (virtual only, expandable) |
| `cvc` | string | CVC (virtual only, expandable) |
| `cancellation_reason` | enum | `design_rejected`, `fulfillment_error`, `lost`, or `stolen` |
| `shipping.status` | enum | `pending`, `submitted`, `shipped`, `delivered`, `returned`, `failure`, `canceled` |

## Notes

- Virtual cards have `number` and `cvc` as expandable fields; they are not returned by default. Use `expand[]=number` to retrieve them.
- Physical cards include a `shipping` object; their `number` and `cvc` are never accessible via the API.
- Card-level `spending_controls` are intersected with cardholder-level controls — the more restrictive rule always wins.
- New cards default to `status: inactive`; set `status: active` at create time or update afterward.
- To replace a lost/stolen card, create a new card with `replacement_for` and `replacement_reason`; the original card is automatically canceled.

## Test Mode Helpers

| Endpoint | Description |
|----------|-------------|
| `POST /v1/test_helpers/issuing/cards/:id/shipping/ship` | Mark physical card as shipped |
| `POST /v1/test_helpers/issuing/cards/:id/shipping/deliver` | Mark physical card as delivered |
| `POST /v1/test_helpers/issuing/cards/:id/shipping/return` | Mark physical card as returned |
| `POST /v1/test_helpers/issuing/cards/:id/shipping/fail` | Mark physical card shipment as failed |

## Webhook Events

| Event | Description |
|-------|-------------|
| `issuing_card.created` | Fired when a card is created |
| `issuing_card.updated` | Fired when a card is updated |

## Related

- [cardholders.md](./cardholders.md)
- [authorizations.md](./authorizations.md)
