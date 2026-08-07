# Device Authorization

The Device Authorization plugin implements the RFC 8628 OAuth 2.0 Device Authorization Grant, enabling authentication on devices with limited input capabilities such as smart TVs, CLI applications, IoT devices, and game consoles.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { deviceAuthorization } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        deviceAuthorization({
            verificationUri: "/device",
        }),
    ],
})
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { deviceAuthorizationClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        deviceAuthorizationClient(),
    ],
})
```

### Request a device code

`POST /device/code`

```typescript
const { data, error } = await authClient.device.code({
    client_id,  // required
    scope,      // optional
})
```

Response: `user_code`, `device_code`, `verification_uri`, `verification_uri_complete`, `interval`, `expires_in`

### Token polling

`POST /device/token`

```typescript
const { data, error } = await authClient.device.token({
    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    device_code,  // required
    client_id,    // required
})
```

Returns an access token once authorization succeeds.

### User code verification

```typescript
const response = await authClient.device({
    query: { user_code: formattedCode },
})
```

### Approve device

`POST /device/approve`

```typescript
const { data, error } = await authClient.device.approve({
    userCode,  // required
})
```

### Deny device

`POST /device/deny`

```typescript
const { data, error } = await authClient.device.deny({
    userCode,  // required
})
```

### Custom code generation example

```typescript
deviceAuthorization({
    generateDeviceCode: async () => crypto.randomBytes(32).toString("hex"),
    generateUserCode: async () => {
        const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        let code = ""
        for (let i = 0; i < 8; i++) {
            code += charset[Math.floor(Math.random() * charset.length)]
        }
        return code
    },
})
```

### Client validation example

```typescript
deviceAuthorization({
    validateClient: async (clientId) => {
        const client = await db.oauth_clients.findOne({ id: clientId })
        return client && client.allowDeviceFlow
    },
})
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `verificationUri` | string | `/device` | URL where the user enters the code (absolute or relative) |
| `expiresIn` | string | `30m` | Expiration time for the device code |
| `interval` | string | `5s` | Minimum polling interval |
| `userCodeLength` | number | `8` | Length of the user-friendly code |
| `deviceCodeLength` | number | `40` | Length of the device verification code |
| `generateDeviceCode` | function | - | Custom device code generation |
| `generateUserCode` | function | - | Custom user code generation |
| `validateClient` | function | - | Client ID validation |
| `onDeviceAuthRequest` | function | - | Hook fired on authorization request |

## Notes

- Enforces a polling interval to prevent abuse
- Codes expire after the configured time (default 30 minutes)
- Always validate the client ID in production
- Use HTTPS for device authorization in production
- User codes use a limited character set that excludes similar-looking characters (0/O, 1/I)
- User authentication is required for approval/denial

### Error codes

| Code | Meaning |
|---|---|
| `authorization_pending` | User has not yet approved (continue polling) |
| `slow_down` | Polling too frequently (increase interval) |
| `expired_token` | Device code has expired |
| `access_denied` | User denied authorization |
| `invalid_grant` | Invalid device code or client ID |

### DB schema

deviceCode table:

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| deviceCode | string | - | Device verification code |
| userCode | string | - | User-friendly code |
| userId | string | - | User who approved/denied (nullable) |
| clientId | string | - | OAuth client identifier (nullable) |
| scope | string | - | Requested scope (nullable) |
| status | string | - | pending, approved, denied |
| expiresAt | Date | - | Expiration date |
| lastPolledAt | Date | - | Last polling timestamp (nullable) |
| pollingInterval | number | - | Polling interval in seconds (nullable) |

## Related

- [agent-auth.md](./agent-auth.md)
