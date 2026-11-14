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

```typescript
// Client only (needs the browser's WebAuthn API)
const { data, error } = await authClient.passkey.addPasskey({
    name: "example-passkey-name",
    authenticatorAttachment: "cross-platform",
})
```

Parameters:
- `name` (string, optional): label for the authenticator. Defaults to the user's email or ID if omitted
- `authenticatorAttachment` ("platform" | "cross-platform", optional): the authenticator type to register

`addPasskey` is client-only: there is no `auth.api.addPasskey` server call, because registration requires the browser's WebAuthn ceremony. `throw: true` has no effect.

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

### Passkey-first registration (pre-auth)

When `registration.requireSession` is `false` (default `true`), passkey registration can start without a session. Pass an opaque `context` to the registration options endpoint; it is forwarded to `registration.resolveUser` (required when `requireSession` is false and no session exists).

```typescript
passkey({
  registration: {
    requireSession: false,
    resolveUser: async ({ ctx, context }) => {
      // Validate context (e.g., a signed token), then create or load a user.
      return { id: "user-id", name: "user@example.com" }
    },
    extensions: { credProps: true }, // optional server-defined extensions
  },
  authentication: { extensions: { credProps: true } },
})

await auth.api.generatePasskeyRegistrationOptions({ context: "signed-registration-token" })

await authClient.passkey.addPasskey({
  name: "Primary passkey",
  context: "signed-registration-token",
  createSession: true,
})
```

`createSession` (boolean, optional): when `true`, successful verification sets the session cookie and returns the `session` and `user` with the registered passkey. To avoid creating a user before the WebAuthn ceremony succeeds, create or load the user in `registration.afterVerification` and return its `userId`. `registration.afterVerification` can also return a default `name` (e.g. `getAuthenticatorName(verification.registrationInfo?.aaguid)` from `@better-auth/passkey`); a client-supplied name always takes precedence.

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
    // isConditionalMediationAvailable() returns a Promise, so it must be awaited
    const run = async () => {
        if (!PublicKeyCredential.isConditionalMediationAvailable) return
        if (!(await PublicKeyCredential.isConditionalMediationAvailable())) return
        await authClient.signIn.passkey({ autoFill: true })
    }
    void run()
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
| `origin` | string \| string[] | No | The origin, or list of origins, where passkey registration and authentication run, without a trailing `/`. Defaults to the origin of `baseURL`, plus a frontend origin listed exactly in `trustedOrigins` |
| `authenticatorSelection` | object | No | Customizes WebAuthn authenticator selection criteria |
| `advanced.webAuthnChallengeCookie` | string | No | Challenge cookie name (default: `"better-auth-passkey"`) |

### authenticatorSelection options

- `authenticatorAttachment`: "platform" (device-bound) | "cross-platform" (security key) | unset (both allowed, platform preferred)
- `residentKey`: "required" (highest security) | "preferred" (recommended) | "discouraged" (fastest)
- `userVerification`: controls biometric/PIN verification during registration and authentication. "required" (highest security; responses without user verification are rejected) | "preferred" | "discouraged" (fastest)

### origin

```typescript
passkey({
  origin: ["https://app.example.com", "https://admin.example.com"],
});
```

When `rpID` is set and a wildcard in `baseURL.allowedHosts` covers it, the default changes. Every host under that wildcard can create passkey responses for the shared `rpID`, and the client picks the host it sends, so the plugin ignores the request host. It accepts the origin the passkey reports only when that exact origin is trusted:

- an exact entry in `baseURL.allowedHosts`, such as `example.com`
- the `baseURL.fallback` origin
- an origin listed exactly in `trustedOrigins`

A wildcard entry in either list does not count. For tenants created at runtime, pass a function as `trustedOrigins` and return the origin only for tenants your app knows:

```typescript
betterAuth({
  baseURL: { allowedHosts: ["example.com", "*.example.com"] },
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");
    if (!origin) return [];
    // Look the origin up in your own tenant records.
    return (await isKnownTenantOrigin(origin)) ? [origin] : [];
  },
  plugins: [passkey({ rpID: "example.com" })],
});
```

An origin that `trustedOrigins` returns is trusted beyond passkeys (for example CSRF checks and redirect URLs). Return only origins your app serves, never an origin copied from the request without a lookup, and compare the full origin including scheme and port. Better Auth calls this function on every request, so cache the lookup. If you call the passkey verify endpoints through `auth.api`, pass the browser request's headers, including `Host` and `Origin`; otherwise `request` is undefined and the tenant origin is not trusted.

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

- With `registration.requireSession: false`, a registration started with a session must be verified with that same active session; a registration started without a session uses `resolveUser`
- `origin` is optional in v1.7.23 docs (defaults to the origin of `baseURL`); the v1.7.10 docs described it as the Better Auth server's origin URL, localhost forms allowed
- Source: https://www.better-auth.com/docs/plugins/passkey (better-auth v1.7.23 docs)
- Use the "Emulated Authenticator" in Chrome DevTools' WebAuthn tab when debugging
- Some browsers require user interaction with the input field before the autofill prompt appears
- `addPasskey` is shown as client-only (the server `auth.api.addPasskey` snippet and endpoint line were removed) because registration needs the browser WebAuthn ceremony (Adapted from the official docs)
- The conditional-UI example awaits `PublicKeyCredential.isConditionalMediationAvailable()`, which returns a Promise; the official sample treated it as a boolean (Adapted from the official docs)
