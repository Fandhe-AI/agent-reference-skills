# Tax Calculations

Computes the tax owed on a transaction given customer location, product type, and pricing. Use this before processing payment to determine the exact tax amount to collect.

## Signature / Usage

```bash
# Create a calculation
curl https://api.stripe.com/v1/tax/calculations \
  -u "sk_test_..." \
  -d currency=usd \
  -d "customer_details[address][line1]=920 5th Ave" \
  -d "customer_details[address][city]=Seattle" \
  -d "customer_details[address][state]=WA" \
  -d "customer_details[address][postal_code]=98104" \
  -d "customer_details[address][country]=US" \
  -d "customer_details[address_source]=shipping" \
  -d "line_items[0][amount]=1499" \
  -d "line_items[0][reference]=item_1" \
  -d "line_items[0][tax_code]=txcd_10000000"
```

## Options / Props

### POST /v1/tax/calculations

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currency` | string | Yes | Three-letter ISO currency code (lowercase) |
| `line_items` | array | Yes | Items being purchased |
| `customer` | string | No* | Existing Stripe Customer ID |
| `customer_details` | object | No* | Customer address and tax details (required if no `customer`) |
| `shipping_cost` | object | No | Shipping charge with optional `tax_code` and `tax_behavior` |
| `ship_from_details` | object | No | Origin address for origin-based tax jurisdictions |
| `tax_date` | integer | No | Unix timestamp for applicable tax rules (default: now; ±48h) |

*Either `customer` or `customer_details` is required.

### line_items fields

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | integer | Yes | Amount in smallest currency unit |
| `reference` | string | Yes | Unique identifier within this calculation (max 500 chars) |
| `tax_code` | string | No | Product tax code; falls back to product or account default |
| `tax_behavior` | enum | No | `exclusive` (default) or `inclusive` |
| `quantity` | integer | No | Units sold; used to compute per-unit price |
| `product` | string | No | Stripe Product ID to inherit its `tax_code` |

### customer_details fields

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | object | Yes* | Customer address (`country` required; `postal_code` required for US) |
| `address_source` | enum | Yes* | `billing` or `shipping` |
| `ip_address` | string | No | IPv4/IPv6; used when address is unavailable |
| `tax_ids` | array | No | Customer tax IDs (e.g., `eu_vat`, `gb_vat`) for B2B determination |
| `taxability_override` | enum | No | `customer_exempt` or `reverse_charge` |

*Required unless `ip_address` is provided.

## Response Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Calculation ID (use to create a Transaction) |
| `amount_total` | integer | Total including tax |
| `tax_amount_exclusive` | integer | Tax added on top of exclusive-priced items |
| `tax_amount_inclusive` | integer | Tax embedded in inclusive-priced items |
| `tax_breakdown` | array | Per-jurisdiction breakdown with `percentage_decimal` and `tax_type` |
| `expires_at` | integer | Unix timestamp after which calculation cannot be used (90 days) |
| `line_items` | list | First 100 line items; each has `amount_tax` and `tax_code` |

### GET /v1/tax/calculations/:id/line_items

Returns a paginated list of `tax.calculation_line_item` objects for the given calculation.

## Notes

- A calculation does **not** record tax liability; create a `tax.transaction` after payment to record it.
- Calculations expire after **90 days** and cannot be used to create a transaction afterward.
- `tax_date` can be set up to 48 hours in the past or future to handle back-dating.
- Expand `line_items.data.tax_breakdown` to get jurisdiction-level rate details per line item.
- When `taxability_override=reverse_charge`, no tax is assessed (B2B EU scenario).

## Related

- [Tax Transactions](./tax-transactions.md)
- [Tax Registrations](./registrations.md)
