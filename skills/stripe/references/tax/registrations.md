# Tax Registrations

Notifies Stripe that your business is registered to collect tax in a specific country or region. Required for Stripe Tax to calculate and collect tax on transactions in that jurisdiction.

## Signature / Usage

```bash
# Register for US California state sales tax
curl https://api.stripe.com/v1/tax/registrations \
  -u "sk_test_..." \
  -d country=US \
  -d "country_options[us][state]=CA" \
  -d "country_options[us][type]=state_sales_tax" \
  -d active_from=now
```

## Options / Props

### POST /v1/tax/registrations

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `country` | string | Yes | ISO 3166-1 alpha-2 country code (e.g., `US`, `DE`, `GB`) |
| `country_options` | object | Yes | Country-specific configuration; structure varies by country |
| `active_from` | string / integer | Yes | `"now"` or Unix timestamp when registration becomes active |
| `expires_at` | integer | No | Unix timestamp when registration expires; omit for indefinite |

### country_options by region

**United States (`us`)**

| Field | Type | Description |
|-------|------|-------------|
| `state` | string | Two-letter US state code |
| `type` | enum | Registration type: `state_sales_tax`, `admissions_tax`, `gross_receipts_tax`, `state_communications_tax`, etc. |

**Canada (`ca`)**

| Field | Type | Description |
|-------|------|-------------|
| `type` | enum | `standard`, `simplified`, or `province_standard` |
| `province_standard.province` | string | Two-letter province code (required for `province_standard`) |

**EU countries (e.g., `de`, `fr`, `ie`)**

| Field | Type | Description |
|-------|------|-------------|
| `type` | enum | `standard`, `ioss`, `oss_union`, or `oss_non_union` |
| `standard.place_of_supply_scheme` | enum | `standard`, `inbound_goods`, or `small_seller` |

### POST /v1/tax/registrations/:id (Update)

Accepts `expires_at` to schedule expiration. Cannot change `country` or `country_options`.

### GET /v1/tax/registrations/:id

Retrieves a single registration by ID.

### GET /v1/tax/registrations

Lists all registrations. Accepts optional `status` filter: `active`, `expired`, or `scheduled`.

## Response Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Registration ID (e.g., `taxreg_...`) |
| `object` | string | Always `"tax.registration"` |
| `country` | string | Two-letter country code |
| `country_options` | object | Country-specific configuration as provided |
| `active_from` | integer | Unix timestamp when registration is active |
| `expires_at` | integer / null | Expiration timestamp; `null` if indefinite |
| `status` | string | `active`, `expired`, or `scheduled` |
| `created` | integer | Creation timestamp |
| `livemode` | boolean | Test vs. live mode |

## Notes

- Creating a `tax.registration` does **not** register your business with tax authorities — you must handle that separately.
- Registration is a prerequisite: Stripe Tax only calculates and collects tax in regions where a registration exists.
- Set `active_from` to a future timestamp to schedule a registration before its effective date.
- EU `ioss` type is for non-EU sellers registering for the Import One-Stop Shop scheme.
- Use `oss_union` for EU sellers reporting VAT across EU member states via One-Stop Shop.
- Threshold monitoring in Stripe Tax is independent of registrations; it tracks whether you need to register.

## Related

- [Tax Calculations](./tax-calculations.md)
- [Tax Transactions](./tax-transactions.md)
