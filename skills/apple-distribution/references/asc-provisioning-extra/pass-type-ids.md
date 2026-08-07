# Pass Type IDs

Create, download, and revoke pass type IDs for app development and distribution of Apple Wallet passes (boarding passes, coupons, loyalty cards).

## Signature / Usage

```bash
# Create a new pass type ID
POST https://api.appstoreconnect.apple.com/v1/passTypeIds

# List all pass type IDs
GET https://api.appstoreconnect.apple.com/v1/passTypeIds

# Read information for a pass type ID
GET https://api.appstoreconnect.apple.com/v1/passTypeIds/{id}

# Modify a pass type ID
PATCH https://api.appstoreconnect.apple.com/v1/passTypeIds/{id}

# Delete a pass type ID
DELETE https://api.appstoreconnect.apple.com/v1/passTypeIds/{id}

# List certificates for a pass type ID
GET https://api.appstoreconnect.apple.com/v1/passTypeIds/{id}/certificates
GET https://api.appstoreconnect.apple.com/v1/passTypeIds/{id}/relationships/certificates

# List pass type IDs for a certificate
GET https://api.appstoreconnect.apple.com/v1/certificates/{id}/passTypeId
GET https://api.appstoreconnect.apple.com/v1/certificates/{id}/relationships/passTypeId
```

## Options / Props

### `PassTypeId.Attributes`

| Field | Type | Description |
|-------|------|-------------|
| `identifier` | string | The pass type identifier string (e.g., `"pass.com.example.boardingpass"`) |
| `name` | string | Friendly name for the pass type ID |

### `POST /v1/passTypeIds` Request Body (`PassTypeIdCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"passTypeIds"` | Resource type |
| `data.attributes.identifier` | string | Pass type identifier string |
| `data.attributes.name` | string | Friendly name for the pass type ID |

## Notes

- A pass type ID must be paired with a Pass Type ID certificate (created via `/v1/certificates` using a certificate signing request) to sign Wallet passes
- Only the `name` attribute is modifiable via `PATCH`; the `identifier` is fixed at creation

## Related

- [Certificates](../asc-api-core/certificates.md)
