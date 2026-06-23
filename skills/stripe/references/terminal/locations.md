# Terminal Locations

A Location represents a grouping of Terminal readers at a single physical site. Locations are used for fleet management and can scope connection tokens to a specific site.

## Signature / Usage

```bash
# Create a location
curl https://api.stripe.com/v1/terminal/locations \
  -u "sk_test_..." \
  -d "display_name=Main Street Store" \
  -d "address[line1]=1234 Main Street" \
  -d "address[city]=San Francisco" \
  -d "address[state]=CA" \
  -d "address[postal_code]=94111" \
  -d "address[country]=US"
```

## Options / Props

### Create (`POST /v1/terminal/locations`)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address.country` | string | Yes | Two-letter ISO 3166-1 alpha-2 country code |
| `address.line1` | string | Yes | Street address, PO Box, or company name |
| `display_name` | string | No | Location name (max 1000 chars) |
| `address.city` | string | Conditional | City — required for most countries |
| `address.state` | string | Conditional | State/province — required for some countries (ISO 3166-2) |
| `address.postal_code` | string | Conditional | ZIP or postal code — required for some countries |
| `address.line2` | string | No | Apartment, suite, unit, or building |
| `phone` | string | No | Phone number of the location |
| `configuration_overrides` | string | No | ID of a Configuration object to customize readers at this location |
| `metadata` | object | No | Arbitrary key-value pairs |

### Location Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`tml_...`) |
| `object` | string | Always `"terminal.location"` |
| `display_name` | string | Human-readable name |
| `address` | object | Full address (line1, line2, city, state, postal_code, country) |
| `livemode` | boolean | `true` in live mode, `false` in test mode |
| `metadata` | object | Arbitrary key-value pairs |
| `phone` | string \| null | Phone number |
| `configuration_overrides` | string \| null | ID of a Configuration overriding reader defaults |

## Notes

- Locations must be deleted with `DELETE /v1/terminal/locations/:id`; any readers assigned must first be reassigned or deleted
- `configuration_overrides` allows setting default tip amounts, splash screens, and receipt behavior per location
- Japan-specific fields `address_kana`, `address_kanji`, `display_name_kana`, `display_name_kanji` are accepted for Japanese addresses
- Scoping a connection token to a location restricts it to internet-connected readers at that location only

## Related

- [readers.md](./readers.md)
- [connection-tokens.md](./connection-tokens.md)
