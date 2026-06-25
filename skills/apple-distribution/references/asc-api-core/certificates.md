# Certificates

Create, download, and revoke signing certificates for iOS and Mac app development and distribution.

## Signature / Usage

```bash
# Create a certificate
POST https://api.appstoreconnect.apple.com/v1/certificates

# List and download certificates
GET https://api.appstoreconnect.apple.com/v1/certificates

# Read a specific certificate
GET https://api.appstoreconnect.apple.com/v1/certificates/{id}

# Revoke (delete) a certificate
DELETE https://api.appstoreconnect.apple.com/v1/certificates/{id}
```

## Options / Props

### `POST /v1/certificates` Request Body (`CertificateCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"certificates"` | Resource type |
| `data.attributes.certificateType` | `CertificateType` | Type of certificate to create |
| `data.attributes.csrContent` | string | Base64-encoded Certificate Signing Request (CSR) |

### `CertificateType` Enum Values

| Value | Description |
|-------|-------------|
| `IOS_DEVELOPMENT` | iOS development |
| `IOS_DISTRIBUTION` | iOS distribution |
| `MAC_APP_DEVELOPMENT` | macOS app development |
| `MAC_APP_DISTRIBUTION` | macOS app distribution |
| `MAC_INSTALLER_DISTRIBUTION` | macOS installer distribution |
| `DEVELOPER_ID_APPLICATION` | Developer ID for macOS (via Apple Developer website only) |
| `DEVELOPER_ID_INSTALLER` | Developer ID installer (via Apple Developer website only) |
| `APPLE_DISTRIBUTION` | Apple distribution |
| `APPLE_DEVELOPMENT` | Apple development |

### Query Parameters — `GET /v1/certificates`

| Parameter | Description |
|-----------|-------------|
| `filter[certificateType]` | Filter by certificate type |
| `filter[displayName]` | Filter by display name |
| `filter[id]` | Filter by ID |
| `filter[serialNumber]` | Filter by serial number |
| `sort` | `certificateType`, `-certificateType`, `displayName`, `-displayName`, `id`, `-id`, `serialNumber`, `-serialNumber` |
| `limit` | Max per page (max: 200) |

### `Certificate` Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Certificate display name |
| `certificateType` | `CertificateType` | Certificate type |
| `certificateContent` | string | DER-encoded certificate (base64) for download |
| `displayName` | string | User-visible name |
| `expirationDate` | date-time | Certificate expiry date |
| `platform` | string | Associated platform |
| `serialNumber` | string | Certificate serial number |

## Notes

- `PATCH /v1/certificates/{id}` is available but typically unused; use `DELETE` to revoke
- Developer ID certificates must be created through the Apple Developer website or Xcode
- Download the certificate by reading `certificateContent` from the response and decoding from base64

## Related

- [Bundle IDs](./bundle-ids.md)
- [Profiles](./profiles.md)
- [Devices](./devices.md)
