# Merchant ID

Manage your merchant ID for Apple Pay.

## Signature / Usage

```bash
# Register a new merchant ID
POST https://api.appstoreconnect.apple.com/v1/merchantIds

# List all merchant IDs
GET https://api.appstoreconnect.apple.com/v1/merchantIds

# Read details for a merchant ID
GET https://api.appstoreconnect.apple.com/v1/merchantIds/{id}

# Modify a merchant ID
PATCH https://api.appstoreconnect.apple.com/v1/merchantIds/{id}

# Delete a merchant ID
DELETE https://api.appstoreconnect.apple.com/v1/merchantIds/{id}

# List certificates for a merchant ID
GET https://api.appstoreconnect.apple.com/v1/merchantIds/{id}/certificates
GET https://api.appstoreconnect.apple.com/v1/merchantIds/{id}/relationships/certificates
```

## Options / Props

### `MerchantId.Attributes`

| Field | Type | Description |
|-------|------|-------------|
| `identifier` | string | Merchant identifier string (e.g., `"merchant.com.example.pay"`) |
| `name` | string | Friendly name for the merchant ID |

### `POST /v1/merchantIds` Request Body (`MerchantIdCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"merchantIds"` | Resource type |
| `data.attributes.identifier` | string | Merchant identifier string |
| `data.attributes.name` | string | Friendly name for the merchant ID |

## Notes

- Used to associate Apple Pay payment capabilities with an app's bundle ID
- Certificates for a merchant ID are managed via the relationship endpoints, not inline on the merchant ID resource

## Related

- [Bundle ID Capabilities](./bundle-id-capabilities.md)
- [Certificates](../asc-api-core/certificates.md)
