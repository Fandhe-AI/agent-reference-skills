# Two-Factor Authentication (2FA)

The 2FA plugin strengthens security by requiring a second authentication factor in addition to a password. It supports OTP (one-time password), TOTP (time-based one-time password), backup codes, and trusted device management.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { twoFactor } from "better-auth/plugins"

export const auth = betterAuth({
    appName: "My App",
    plugins: [
        twoFactor()
    ]
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
import { twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        twoFactorClient()
    ]
})
```

### Enable 2FA

```typescript
// Client
const { data, error } = await authClient.twoFactor.enable({
    password: "secure-password",
    issuer: "my-app-name"
})

// Server
const data = await auth.api.enableTwoFactor({
    body: {
        password: "secure-password",
        issuer: "my-app-name"
    },
    headers: await headers()
})
```

Parameters:
- `password` (string, required): the user's password
- `issuer` (string, optional): custom issuer name for the TOTP URI

Unless `skipVerificationOnEnable: true` is set, `twoFactorEnabled` stays `false` until TOTP verification succeeds.

### Disable 2FA

```typescript
// Client
const { data, error } = await authClient.twoFactor.disable({ password })

// Server
const data = await auth.api.disableTwoFactor({
    body: { password },
    headers: await headers()
})
```

### Get TOTP URI

```typescript
// Client
const { data, error } = await authClient.twoFactor.getTotpUri({ password })

// Server
const data = await auth.api.getTOTPURI({
    body: { password },
    headers: await headers()
})
```

Returns the `totpURI` used to generate a QR code for authenticator apps.

### Verify TOTP

```typescript
// Client
const { data, error } = await authClient.twoFactor.verifyTotp({
    code: "012345",
    trustDevice: true
})

// Server
const data = await auth.api.verifyTOTP({
    body: {
        code: "012345",
        trustDevice: true
    },
    headers: await headers()
})
```

Parameters:
- `code` (string, required): the OTP code from the authenticator app
- `trustDevice` (boolean, optional): remember the device for 30 days, refreshed on login within that window

Accepts codes from the current time window plus one period on either side.

### Send OTP

```typescript
// Client
const { data, error } = await authClient.twoFactor.sendOtp({
    trustDevice: true
})

// Server
const data = await auth.api.sendTwoFactorOTP({
    body: { trustDevice: true },
    headers: await headers()
})
```

### Verify OTP

```typescript
// Client
const { data, error } = await authClient.twoFactor.verifyOtp({
    code: "012345",
    trustDevice: true
})

// Server
const data = await auth.api.verifyTwoFactorOTP({
    body: {
        code: "012345",
        trustDevice: true
    },
    headers: await headers()
})
```

### Generate backup codes

```typescript
// Client
const { data, error } = await authClient.twoFactor.generateBackupCodes({ password })

// Server
const data = await auth.api.generateBackupCodes({
    body: { password },
    headers: await headers()
})
```

Generating new codes deletes the previous set.

### Verify backup code

```typescript
// Client
const { data, error } = await authClient.twoFactor.verifyBackupCode({
    code: "123456",
    disableSession: false,
    trustDevice: true
})

// Server
const data = await auth.api.verifyBackupCode({
    body: {
        code: "123456",
        disableSession: false,
        trustDevice: true
    },
    headers: await headers()
})
```

Parameters:
- `code` (string, required): the backup code
- `disableSession` (boolean, optional): prevents setting the session cookie
- `trustDevice` (boolean, optional): trust the device for 30 days

Codes are single-use and deleted after verification.

### View backup codes (server only)

```typescript
const data = await auth.api.viewBackupCodes({
    body: { userId: "user-id" }
})
```

### Sign-in for 2FA-enabled users

When a 2FA-enabled user signs in, the response includes `twoFactorRedirect: true`.

```typescript
await authClient.signIn.email({
    email: "user@example.com",
    password: "password123"
}, {
    async onSuccess(context) {
        if (context.data.twoFactorRedirect) {
            // Handle the 2FA verification flow
        }
    }
})
```

Alternative configuration:

```typescript
// Global callback
twoFactorClient({
    onTwoFactorRedirect(){
        // Handle verification globally
    }
})

// Redirect to a page (triggers a full reload)
twoFactorClient({
    twoFactorPage: "/two-factor"
})
```

## Options / Props

### Server options

| Option | Type | Default | Description |
|---|---|---|---|
| `twoFactorTable` | string | `"twoFactor"` | Table name for 2FA data |
| `skipVerificationOnEnable` | boolean | `false` | Skip TOTP verification at enable time |
| `issuer` | string | app name or "Better Auth" | Display name for the TOTP issuer |

### TOTP options

| Option | Type | Default | Description |
|---|---|---|---|
| `digits` | number | 6 | Number of digits in generated codes |
| `period` | number | 30 | Time window (seconds) |

### OTP options

| Option | Type | Description |
|---|---|---|
| `sendOTP` | function | Callback to send the OTP to the user |
| `period` | number | Code validity period (seconds) |
| `storeOTP` | string | Storage strategy identifier |

### Backup code options

| Option | Type | Default | Description |
|---|---|---|---|
| `amount` | number | 10 | Number of codes to generate |
| `length` | number | 8 | Characters per code |
| `customBackupCodesGenerate` | function | - | Custom generation logic |
| `storeBackupCodes` | string | - | Storage identifier |

### Client options

```typescript
twoFactorClient({
    onTwoFactorRedirect(){
        // Callback for when the user needs to verify 2FA
    }
})
```

### DB schema (user table)

| Field | Type | Optional | Description |
|---|---|---|---|
| `twoFactorEnabled` | boolean | Yes | Whether 2FA is enabled |

### DB schema (twoFactor table)

| Field | Type | Key | Description |
|---|---|---|---|
| `id` | string | PK | Authentication record ID |
| `userId` | string | FK | Associated user |
| `secret` | string | - | TOTP secret for code generation |
| `backupCodes` | string | - | Serialized recovery codes |

## Notes

- 2FA can currently only be enabled for credential accounts. For social accounts, 2FA is assumed to already be handled by the provider
- When using server-side auth methods, response headers/cookies must be forwarded to subsequent 2FA calls to maintain state
- OTP methods require implementing the `sendOTP` callback in the plugin configuration
- Trusted devices are remembered for exactly 30 days, and the window resets on each successful login within it
- Using the `twoFactorPage` setting triggers a full browser reload. `onTwoFactorRedirect` is recommended for programmatic handling
