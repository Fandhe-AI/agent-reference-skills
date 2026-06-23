# Issuing Cardholders

Represents an individual or business entity that is issued Stripe Issuing cards. A Cardholder must be created before any cards can be issued to them.

## Signature / Usage

```bash
# Create a cardholder
curl https://api.stripe.com/v1/issuing/cardholders \
  -u "sk_test_YOUR_SECRET_KEY" \
  -d type=individual \
  -d name="Jenny Rosen" \
  -d email="jenny.rosen@example.com" \
  -d phone_number="+18888675309" \
  -d "billing[address][line1]=1234 Main Street" \
  -d "billing[address][city]=San Francisco" \
  -d "billing[address][state]=CA" \
  -d "billing[address][country]=US" \
  -d "billing[address][postal_code]=94111" \
  -d "individual[first_name]=Jenny" \
  -d "individual[last_name]=Rosen"
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/issuing/cardholders` | Create a cardholder |
| `GET` | `/v1/issuing/cardholders/:id` | Retrieve a cardholder |
| `POST` | `/v1/issuing/cardholders/:id` | Update a cardholder |
| `GET` | `/v1/issuing/cardholders` | List all cardholders |

## Options / Props

### Create Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | Yes | Full name (max 24 chars, no special characters or numbers) |
| `billing` | object | Yes | Cardholder's billing address |
| `billing.address.line1` | string | Yes | Street address |
| `billing.address.city` | string | Yes | City |
| `billing.address.country` | string | Yes | ISO 3166-1 alpha-2 country code |
| `billing.address.postal_code` | string | Yes | ZIP or postal code |
| `type` | enum | No | `individual` (default) or `company` |
| `status` | enum | No | `active` (default) or `inactive` |
| `email` | string | No | Email address (max 800 chars) |
| `phone_number` | string | No | E.164 format; required for EU cardholders |
| `individual` | object | No | Individual-specific fields (first_name, last_name, dob, verification) |
| `company` | object | No | Company-specific fields (tax_id) |
| `spending_controls` | object | No | Spending limits and category/country restrictions |
| `metadata` | object | No | Custom key-value pairs |
| `preferred_locales` | array | No | Language preferences: `da`, `de`, `en`, `es`, `fr`, `it`, `pl`, `sv` |

### spending_controls

| Name | Type | Description |
|------|------|-------------|
| `allowed_categories` | array | Merchant categories permitted (all others blocked) |
| `blocked_categories` | array | Merchant categories blocked (all others allowed) |
| `allowed_merchant_countries` | array | ISO 3166 alpha-2 codes of permitted countries |
| `blocked_merchant_countries` | array | ISO 3166 alpha-2 codes of blocked countries |
| `allowed_card_presences` | array | `present`, `not_present` |
| `spending_limits` | array | Amount-based limits with `amount`, `interval`, `categories` |
| `spending_limits[].interval` | enum | `all_time`, `daily`, `weekly`, `monthly`, `yearly`, `per_authorization` |

## Object Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (`ich_...`) |
| `status` | enum | `active`, `inactive`, or `blocked` |
| `type` | enum | `individual` or `company` |
| `requirements.disabled_reason` | enum | Reason cards are disabled, if any |
| `requirements.past_due` | array | Fields still required for activation |

## Notes

- `individual.first_name` and `individual.last_name` must be set before cards on this cardholder can be activated.
- `status: blocked` is irreversible; cards decline with `cardholder_blocked`.
- `allowed_categories` and `blocked_categories` are mutually exclusive.
- `spending_controls` at the cardholder level apply to all cards issued to that cardholder; card-level controls further restrict but cannot expand cardholder-level limits.
- Sufficient issuing balance must be available, or authorizations are rejected without triggering the real-time webhook.

## Webhook Events

| Event | Description |
|-------|-------------|
| `issuing_cardholder.created` | Fired when a cardholder is created |
| `issuing_cardholder.updated` | Fired when a cardholder is updated |

## Related

- [cards.md](./cards.md)
- [authorizations.md](./authorizations.md)
