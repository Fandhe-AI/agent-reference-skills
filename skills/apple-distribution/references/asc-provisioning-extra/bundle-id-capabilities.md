# Bundle ID Capabilities

Enable, modify, or disable an entitlement or service (such as Push Notifications or In-App Purchases) for a registered bundle ID.

## Signature / Usage

```bash
# Enable a capability for a bundle ID
POST https://api.appstoreconnect.apple.com/v1/bundleIdCapabilities

# Modify a capability configuration
PATCH https://api.appstoreconnect.apple.com/v1/bundleIdCapabilities/{id}

# Disable a capability for a bundle ID
DELETE https://api.appstoreconnect.apple.com/v1/bundleIdCapabilities/{id}
```

## Options / Props

### `POST /v1/bundleIdCapabilities` Request Body (`BundleIdCapabilityCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"bundleIdCapabilities"` | Resource type |
| `data.attributes.capabilityType` | `CapabilityType` | The capability to enable (see below) |
| `data.relationships.bundleId` | relationship | The bundle ID to enable the capability for |

### `CapabilityType` enum (partial)

| Value | Capability |
|-------|-----------|
| `ICLOUD` | iCloud |
| `IN_APP_PURCHASE` | In-App Purchase |
| `GAME_CENTER` | Game Center |
| `PUSH_NOTIFICATIONS` | Push Notifications |
| `WALLET` | Wallet |
| `MAPS` | Maps |
| `ASSOCIATED_DOMAINS` | Associated Domains |
| `PERSONAL_VPN` | Personal VPN |
| `APP_GROUPS` | App Groups |
| `HEALTHKIT` | HealthKit |
| `HOMEKIT` | HomeKit |
| `WIRELESS_ACCESSORY_CONFIGURATION` | Wireless Accessory Configuration |
| `APPLE_PAY` | Apple Pay |
| `DATA_PROTECTION` | Data Protection |
| `SIRIKIT` | SiriKit |
| `NETWORK_EXTENSIONS` | Network Extensions |
| `MULTIPATH` | Multipath |
| `HOT_SPOT` | Hotspot |
| `NFC_TAG_READING` | NFC Tag Reading |
| `CLASSKIT` | ClassKit |
| `AUTOFILL_CREDENTIAL_PROVIDER` | AutoFill Credential Provider |
| `ACCESS_WIFI_INFORMATION` | Access WiFi Information |
| `NETWORK_CUSTOM_PROTOCOL` | Network Custom Protocol |
| `COREMEDIA_HLS_LOW_LATENCY` | HLS Low-Latency Streaming |
| `SYSTEM_EXTENSION_INSTALL` | System Extension |
| `USER_MANAGEMENT` | User Management |
| `APPLE_ID_AUTH` | Sign in with Apple |

## Notes

- `CapabilityType` was introduced in App Store Connect API 1.1
- `BundleIdCapability` represents an entitlement or service enabled for a bundle ID; capabilities requiring extra configuration use `CapabilitySetting` / `CapabilityOption` nested in `attributes`
- There is no list/read endpoint for a single capability by ID; capabilities are read via `GET /v1/bundleIds/{id}/bundleIdCapabilities`

## Related

- [Bundle IDs](../asc-api-core/bundle-ids.md)
