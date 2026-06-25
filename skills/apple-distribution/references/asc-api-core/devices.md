# Devices

Register and manage Apple devices for development and TestFlight testing.

## Signature / Usage

```bash
# Register a new device
POST https://api.appstoreconnect.apple.com/v1/devices

# List all registered devices
GET https://api.appstoreconnect.apple.com/v1/devices

# Read a specific device
GET https://api.appstoreconnect.apple.com/v1/devices/{id}

# Modify device name or status
PATCH https://api.appstoreconnect.apple.com/v1/devices/{id}
```

## Options / Props

### `POST /v1/devices` Request Body (`DeviceCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"devices"` | Resource type |
| `data.attributes.udid` | string | Device UDID (Unique Device Identifier) |
| `data.attributes.name` | string | Friendly device name |
| `data.attributes.platform` | `BundleIdPlatform` | `IOS` or `MAC_OS` |

### `PATCH /v1/devices/{id}` Request Body (`DeviceUpdateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.attributes.name` | string | New device name |
| `data.attributes.status` | string | `ENABLED` or `DISABLED` |

### `Device` Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | Device name |
| `udid` | string | Unique Device Identifier |
| `deviceClass` | string | `APPLE_WATCH`, `IPAD`, `IPHONE`, `IPOD`, `APPLE_TV`, `MAC` |
| `model` | string | Device model string |
| `os` | string | OS name |
| `osVersion` | string | OS version |
| `platform` | string | `IOS` or `MAC_OS` |
| `status` | string | `ENABLED` or `DISABLED` |

### Query Parameters — `GET /v1/devices`

| Parameter | Description |
|-----------|-------------|
| `filter[name]` | Filter by device name |
| `filter[platform]` | Filter by platform |
| `filter[status]` | Filter by status (`ENABLED`, `DISABLED`) |
| `filter[udid]` | Filter by UDID |
| `sort` | `id`, `-id`, `name`, `-name`, `platform`, `-platform`, `status`, `-status`, `udid`, `-udid` |
| `limit` | Max per page (max: 200) |

## Notes

- Devices can only be **removed** through the Apple Developer website; the API does not support deletion
- Supports iOS, Apple TV, Apple Watch, iPad, and Mac devices
- Disabled devices are excluded from provisioning profiles

## Related

- [Profiles](./profiles.md)
- [Bundle IDs](./bundle-ids.md)
