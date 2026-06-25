# Profiles

Create, download, and delete provisioning profiles for development and distribution.

## Signature / Usage

```bash
# Create a provisioning profile
POST https://api.appstoreconnect.apple.com/v1/profiles

# List and download profiles
GET https://api.appstoreconnect.apple.com/v1/profiles

# Read a specific profile
GET https://api.appstoreconnect.apple.com/v1/profiles/{id}

# Delete a profile
DELETE https://api.appstoreconnect.apple.com/v1/profiles/{id}
```

## Options / Props

### `POST /v1/profiles` Request Body (`ProfileCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"profiles"` | Resource type |
| `data.attributes.name` | string | Profile name |
| `data.attributes.profileType` | `ProfileType` | Type of profile |
| `data.relationships.bundleId.data.id` | string | Bundle ID resource ID |
| `data.relationships.certificates.data` | array | Certificate resource IDs |
| `data.relationships.devices.data` | array | Device resource IDs (development profiles only) |

### `ProfileType` Enum Values

| Value | Description |
|-------|-------------|
| `IOS_APP_DEVELOPMENT` | iOS app development |
| `IOS_APP_STORE` | iOS App Store distribution |
| `IOS_APP_ADHOC` | iOS ad hoc distribution |
| `IOS_APP_INHOUSE` | iOS in-house (enterprise) distribution |
| `MAC_APP_DEVELOPMENT` | macOS app development |
| `MAC_APP_STORE` | macOS App Store distribution |
| `MAC_APP_DIRECT` | macOS direct distribution |
| `TVOS_APP_DEVELOPMENT` | tvOS app development |
| `TVOS_APP_STORE` | tvOS App Store distribution |
| `TVOS_APP_ADHOC` | tvOS ad hoc distribution |

### `Profile` Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Profile name |
| `profileType` | `ProfileType` | Type of provisioning profile |
| `profileContent` | string | Base64-encoded profile data for download |
| `uuid` | string | Profile UUID |
| `createdDate` | date-time | Creation date |
| `expirationDate` | date-time | Expiry date |
| `platform` | string | Associated platform |
| `profileState` | string | `ACTIVE` or `INVALID` |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| Associated bundle ID | `GET /v1/profiles/{id}/bundleId` |
| Associated certificates | `GET /v1/profiles/{id}/certificates` |
| Associated devices | `GET /v1/profiles/{id}/devices` |

## Notes

- Download a profile by reading `profileContent` from the response and decoding from base64
- Profiles become `INVALID` when associated certificates expire or devices/capabilities change
- `PATCH` is not supported — delete and recreate to update a profile
- Individual API keys cannot access Provisioning endpoints

## Related

- [Bundle IDs](./bundle-ids.md)
- [Certificates](./certificates.md)
- [Devices](./devices.md)
