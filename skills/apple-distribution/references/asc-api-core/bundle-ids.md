# Bundle IDs

Register and manage unique app bundle identifiers used for provisioning profiles and capabilities.

## Signature / Usage

```bash
# Register a new bundle ID
POST https://api.appstoreconnect.apple.com/v1/bundleIds

# List all bundle IDs
GET https://api.appstoreconnect.apple.com/v1/bundleIds

# Read a specific bundle ID
GET https://api.appstoreconnect.apple.com/v1/bundleIds/{id}

# Modify a bundle ID
PATCH https://api.appstoreconnect.apple.com/v1/bundleIds/{id}

# Delete a bundle ID
DELETE https://api.appstoreconnect.apple.com/v1/bundleIds/{id}
```

## Options / Props

### `POST /v1/bundleIds` Request Body (`BundleIdCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"bundleIds"` | Resource type |
| `data.attributes.identifier` | string | Bundle identifier string (e.g., `"com.example.myapp"`) |
| `data.attributes.name` | string | Friendly name for the bundle ID |
| `data.attributes.platform` | `BundleIdPlatform` | `IOS` or `MAC_OS` |
| `data.attributes.seedId` | string | (Optional) 10-character Team ID prefix |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| Associated app | `GET /v1/bundleIds/{id}/app` |
| Provisioning profiles | `GET /v1/bundleIds/{id}/profiles` |
| Capabilities | `GET /v1/bundleIds/{id}/bundleIdCapabilities` |

## Notes

- Bundle IDs are prerequisites for creating provisioning profiles and assigning capabilities
- `BundleIdPlatform` enum values: `IOS`, `MAC_OS`
- Wildcard bundle IDs (e.g., `com.example.*`) are supported for some use cases

## Related

- [Certificates](./certificates.md)
- [Profiles](./profiles.md)
