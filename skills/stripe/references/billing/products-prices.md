# Products & Prices

Products represent what you sell; Prices define how much and how often you charge for them. A single Product can have many Prices (e.g., monthly, annual, EUR variant).

## Signature / Usage

```bash
# Create a product then a recurring monthly price for it
curl https://api.stripe.com/v1/products \
  -u "sk_test_...:" \
  -d "name=Pro Plan"

curl https://api.stripe.com/v1/prices \
  -u "sk_test_...:" \
  -d "product=prod_xxx" \
  -d "currency=usd" \
  -d "unit_amount=1500" \
  -d "recurring[interval]=month"
```

## Options / Props

### Product Parameters

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Product name (required on create) |
| `description` | string | Shown on invoices and in the Dashboard |
| `active` | boolean | Set to `false` to archive; defaults to `true` |
| `metadata` | object | Arbitrary key-value pairs |
| `default_price` | string | Default Price ID attached to this product |

**Product Endpoints:** `POST /v1/products`, `GET /v1/products/:id`, `POST /v1/products/:id`, `DELETE /v1/products/:id`, `GET /v1/products`, `GET /v1/products/search`

### Price Parameters

| Name | Type | Description |
|------|------|-------------|
| `currency` | string | ISO 4217 lowercase (e.g., `usd`). Required |
| `unit_amount` | integer | Amount in smallest currency unit (e.g., cents). Required unless `billing_scheme=tiered` or `custom_unit_amount` |
| `product` | string | Existing Product ID. Either `product` or `product_data` required |
| `product_data` | object | Inline product creation: `{ name }` |
| `recurring` | object | Makes the price recurring (see below) |
| `billing_scheme` | enum | `per_unit` (default) or `tiered` |
| `tiers` | array | Required when `billing_scheme=tiered` |
| `tiers_mode` | enum | `graduated` or `volume`; required with `billing_scheme=tiered` |
| `active` | boolean | Whether available for new purchases; defaults to `true` |
| `nickname` | string | Internal label, hidden from customers |
| `lookup_key` | string | Retrievable key for dynamic price references (max 200 chars) |
| `metadata` | object | Arbitrary key-value pairs |

**Price Endpoints:** `POST /v1/prices`, `GET /v1/prices/:id`, `POST /v1/prices/:id`, `GET /v1/prices`, `GET /v1/prices/search`

### `recurring` Object

| Name | Type | Description |
|------|------|-------------|
| `interval` | enum | `day`, `week`, `month`, or `year`. Required |
| `interval_count` | integer | Number of intervals per billing cycle (e.g., `3` with `month` = quarterly) |
| `usage_type` | enum | `licensed` (default, fixed quantity) or `metered` (usage reported via Meter API) |
| `meter` | string | Meter ID; required when `usage_type=metered` |

### Tiered Pricing Tier Object

| Name | Type | Description |
|------|------|-------------|
| `up_to` | integer or `"inf"` | Upper bound of this tier (units) |
| `unit_amount` | integer | Per-unit charge for this tier |
| `flat_amount` | integer | Flat fee applied once per billing cycle for this tier |

### Pricing Models

| Model | Configuration |
|-------|---------------|
| Flat rate | `billing_scheme=per_unit`, fixed `unit_amount` |
| Per-seat | `billing_scheme=per_unit`; subscription item `quantity` set to seat count |
| Graduated tiered | `billing_scheme=tiered`, `tiers_mode=graduated` |
| Volume tiered | `billing_scheme=tiered`, `tiers_mode=volume` |
| Metered / usage-based | `recurring.usage_type=metered`; report usage via Meter API |

## Notes

- Prices are **immutable** after creation (except `active`, `nickname`, `lookup_key`, `metadata`). To change pricing, create a new Price and migrate subscriptions to it.
- Use `lookup_key` with `POST /v1/prices` `transfer_lookup_key=true` to atomically move a key to the new price — subscriptions can then always reference a stable key.
- Archiving a product (`active=false`) hides it but does not delete its history.
- `product_data` on Price creation creates a product inline; the resulting product ID is returned in the Price response.

### Webhook Events

| Event | When |
|-------|------|
| `product.created` / `product.updated` / `product.deleted` | Product lifecycle |
| `price.created` / `price.updated` / `price.deleted` | Price lifecycle |

## Related

- [Subscriptions](./subscriptions.md)
- [Invoices](./invoices.md)
- [Customer Portal](./customer-portal.md)
