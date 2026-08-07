# Passkey

The Passkey plugin provides secure, passwordless authentication using WebAuthn/FIDO2 cryptographic key pairs. It uses SimpleWebAuthn internally and supports biometric, PIN, and security-key authentication.

## Signature / Usage

### Installation

```bash
npm install @better-auth/passkey
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { passkey } from "@better-auth/passkey"

export const auth = betterAuth({
    plugins: [
        passkey(),
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
import { passkeyClient } from "@better-auth/passkey/client"

export const authClient = createAuthClient({
    plugins: [
        passkeyClient()
    ]
})
```

### Add/register a passkey

`POST /passkey/add-passkey`

```typescript
// Client
const { data, error } = await authClient.passkey.addPasskey({
    name: "example-passkey-name",
    authenticatorAttachment: "cross-platform",
})

// Server
const data = await auth.api.addPasskey({
    body: {
        name: "example-passkey-name",
        authenticatorAttachment: "cross-platform",
    },
})
```

Parameters:
- `name` (string, optional): label for the authenticator. Defaults to the user's email or ID if omitted
- `authenticatorAttachment` ("platform" | "cross-platform", optional): the authenticator type to register

Client-only endpoint. `throw: true` has no effect.

### Sign in with passkey

`POST /sign-in/passkey`

```typescript
// Client
const { data, error } = await authClient.signIn.passkey({
    autoFill: true,
})

// With callbacks
await authClient.signIn.passkey({
    autoFill: true,
    fetchOptions: {
        onSuccess(context) {
            window.location.href = "/dashboard"
        },
        onError(context) {
            console.error("Authentication failed:", context.error.message)
        }
    }
})
```

Parameters:
- `autoFill` (boolean): enables browser autofill (Conditional UI)

### List passkeys

`GET /passkey/list-user-passkeys`

```typescript
// Client
const { data: passkeys, error } = await authClient.passkey.listUserPasskeys()

// Server
const passkeys = await auth.api.listPasskeys({
    headers: await headers(),
})
```

### Delete passkey

`POST /passkey/delete-passkey`

```typescript
// Client
const { data, error } = await authClient.passkey.deletePasskey({
    id: "some-passkey-id",
})

// Server
const data = await auth.api.deletePasskey({
    body: { id: "some-passkey-id" },
    headers: await headers(),
})
```

### Update passkey name

`POST /passkey/update-passkey`

```typescript
// Client
const { data, error } = await authClient.passkey.updatePasskey({
    id: "id of passkey",
    name: "my-new-passkey-name",
})

// Server
const data = await auth.api.updatePasskey({
    body: {
        id: "id of passkey",
        name: "my-new-passkey-name",
    },
    headers: await headers(),
})
```

### Conditional UI (browser autofill): update input fields

Add the `autocomplete="webauthn"` attribute (as the last value):

```html
<input type="text" name="name" autocomplete="username webauthn">
<input type="password" name="password" autocomplete="current-password webauthn">
```

### Conditional UI (browser autofill): preloading passkeys

```typescript
useEffect(() => {
    if (!PublicKeyCredential.isConditionalMediationAvailable ||
        !PublicKeyCredential.isConditionalMediationAvailable()) {
        return
    }
    void authClient.signIn.passkey({ autoFill: true })
}, [])
```

### Expo integration

When using Expo, set `cookiePrefix` so the challenge cookie is detected and stored correctly.

```typescript
// Server
passkey({
    advanced: {
        webAuthnChallengeCookie: "my-app-passkey"
    }
})

// Client
expoClient({
    storage: SecureStore,
    cookiePrefix: "my-app"
})

// Multiple prefixes
expoClient({
    storage: SecureStore,
    cookiePrefix: ["better-auth", "my-app", "custom-auth"]
})
```

If `cookiePrefix` doesn't match the `webAuthnChallengeCookie` prefix, passkey authentication will fail.

## Options / Props

| Option | Type | Required | Description |
|---|---|---|---|
| `rpID` | string | Yes | The website's unique identifier (domain-based) |
| `rpName` | string | Yes | Human-readable site name |
| `origin` | string | Yes | The Better Auth server's origin URL (no trailing slash) |
| `authenticatorSelection` | object | No | Customizes WebAuthn authenticator selection criteria |
| `advanced.webAuthnChallengeCookie` | string | No | Challenge cookie name (default: `"better-auth-passkey"`) |

### authenticatorSelection options

- `authenticatorAttachment`: "platform" (device-bound) | "cross-platform" (security key) | unset (both allowed, platform preferred)
- `residentKey`: "required" (highest security) | "preferred" (recommended) | "discouraged" (fastest)
- `userVerification`: "required" (highest security) | "preferred" | "discouraged" (fastest)

### DB schema (passkey table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique passkey identifier |
| name | string | ? | Passkey authenticator label (optional) |
| publicKey | string | - | Public key credential |
| userId | string | FK | Associated user ID |
| credentialID | string | - | Unique identifier for the registered credential |
| counter | number | - | Passkey counter value |
| deviceType | string | - | Authenticator device type |
| backedUp | boolean | - | Backup state |
| transports | string | ? | Transports used at registration (optional) |
| createdAt | Date | ? | Creation timestamp |
| aaguid | string | ? | Authenticator Attestation GUID |

## Notes

- Use the "Emulated Authenticator" in Chrome DevTools' WebAuthn tab when debugging
- Some browsers require user interaction with the input field before the autofill prompt appears
