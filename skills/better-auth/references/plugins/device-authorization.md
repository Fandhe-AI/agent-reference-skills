# Device Authorization

The Device Authorization plugin implements the code issuance and approval flow from the RFC 8628 OAuth 2.0 Device Authorization Grant for limited-input devices such as smart TVs, CLI applications, IoT devices, and game consoles. Use it on its own for Better Auth session tokens, or compose it with the OAuth Provider to issue OAuth access tokens.

## Signature / Usage

### Production security requirements

RFC 8628 requires the device to make outbound HTTPS requests and the user to authenticate at the verification URI in a TLS-protected session. In production, serve the verification and approval UI, device-code requests, and token polling over HTTPS (HTTP only for explicitly local development). The approval UI is part of the security boundary. It must:

- ask the user to enter the `user_code`, or, when using `verification_uri_complete` such as a QR code, ask the user to confirm that the displayed code matches the code on the device;
- show what is being authorized: the client, requested scopes, and, with the OAuth Provider integration, the requested resource or resources;
- require an explicit approval or denial; and
- tell the user they are authorizing a device in their possession and warn them not to approve unexpected requests or codes supplied through phishing messages.

### Choose the token your device needs

| Use case | Token | Plugins | Token endpoint |
| --- | --- | --- | --- |
| Sign your own device into the same Better Auth application | Better Auth session token | `deviceAuthorization()` | `/device/token` |
| Let a registered CLI, TV app, or other public client call an OAuth-protected API | Scoped OAuth access token | `jwt()`, `oauthProvider()`, and `oauthDeviceAuthorization()` | `/oauth2/token` |

### Authorize a CLI to call an API

Add JWT, OAuth Provider, and the OAuth Device Authorization integration:

```typescript
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { oauthDeviceAuthorization, oauthProvider } from "@better-auth/oauth-provider";

export const auth = betterAuth({
  plugins: [
    jwt(),
    oauthProvider({
      loginPage: "/sign-in",
      consentPage: "/consent",
      scopes: ["openid", "profile", "offline_access", "api:read"],
      resources: ["https://api.example.com"],
    }),
    oauthDeviceAuthorization({ verificationUri: "/device" }),
  ],
});
```

Register the CLI as a public native client linked to the API resource (`token_endpoint_auth_method: "none"`):

Adapted (not in the official docs): the official v1.7.23 example passes `type: "native"`; 1.7 removed `type`, so this snippet uses `application_type: "native"`.

```typescript
import { DEVICE_CODE_GRANT_TYPE } from "@better-auth/oauth-provider";

await auth.api.adminCreateOAuthClient({
  headers,
  body: {
    token_endpoint_auth_method: "none",
    application_type: "native",
    grant_types: [DEVICE_CODE_GRANT_TYPE, "refresh_token"],
    scope: "openid profile offline_access api:read",
    resources: ["https://api.example.com"],
  },
});
```

Public clients must send `client_id`. A confidential client using `client_secret_basic` may authenticate at `/device/code` with an `Authorization: Basic ...` header and omit the body `client_id`; `client_secret_post` sends both in the form body. The CLI requests a device code for the API it intends to call, then polls `/oauth2/token`:

```typescript
import { createAuthClient } from "better-auth/client";
import { oauthDeviceAuthorizationClient } from "@better-auth/oauth-provider/client";

const authClient = createAuthClient({ baseURL: authBaseURL, plugins: [oauthDeviceAuthorizationClient()] });

const { data } = await authClient.device.code({
  client_id: clientId,
  scope: "openid profile offline_access api:read",
  resource: "https://api.example.com",
});

const response = await fetch(`${authBaseURL}/oauth2/token`, {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    device_code: data.device_code,
    client_id: clientId,
  }),
});
```

The access token is a signed JWT whose `aud` identifies the API; verify signature, issuer, audience, expiry, and scopes at the API. Do not call `authClient.device.token` for this OAuth flow (it polls `/device/token` and returns a Better Auth session token). Both token paths can coexist; `oauthDeviceAuthorization()` prevents OAuth clients' device codes from being redeemed for a Better Auth session token.

### First-party session flow

The rest of this page describes the first-party path, where `/device/token` returns a Better Auth session token.

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

### Polling for a Better Auth session token

`POST /device/token` (the response's `access_token` field contains a Better Auth session token, not an RFC 8628 OAuth access token)

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

Check the ID against a list of known clients:

```typescript
import { deviceAuthorization } from "better-auth/plugins";

const knownClientIds = new Set(["my-cli", "my-tv-app"]);

deviceAuthorization({
  validateClient: (clientId) => knownClientIds.has(clientId),
});
```

### Example approval page

```tsx
// app/device/approve/page.tsx
// Client IDs you accept in `validateClient`, mapped to names your users recognize.
const knownClients = new Map([
  ["my-cli", "My CLI"],
  ["my-tv-app", "My TV App"],
]);

type DeviceRequest = {
  user_code: string;
  client_id?: string;
  scope?: string;
  resource?: string | string[];
};

export default function DeviceApprovalPage() {
  const { user } = useAuth(); // Must be authenticated
  const userCode = useSearchParams().get("user_code") ?? "";
  const [request, setRequest] = useState<DeviceRequest | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user || !userCode) return;
    authClient.device({ query: { user_code: userCode } }).then(({ data }) => {
      // Client details are missing when another session claimed the code.
      if (data?.client_id) setRequest(data);
    });
  }, [user, userCode]);

  // Ignore details that belong to an earlier code.
  const details = request?.user_code === userCode ? request : null;
  const clientName = details?.client_id
    ? knownClients.get(details.client_id)
    : undefined;

  const decide = async (action: "approve" | "deny") => {
    setIsProcessing(true);
    const { error } = await authClient.device[action]({ userCode });
    setIsProcessing(false);
    if (error) {
      alert(`Failed to ${action} device`);
      return;
    }
    window.location.href = "/";
  };

  if (!user) {
    const verificationPath = `/device?user_code=${encodeURIComponent(userCode)}`;
    window.location.href = `/login?redirect=${encodeURIComponent(verificationPath)}`;
    return null;
  }

  return (
    <div>
      <h2>Device Authorization Request</h2>
      <p>
        Client: {details?.client_id
          ? clientName ?? `Unrecognized client (${details.client_id})`
          : "Loading..."}
      </p>
      <p>Scopes: {details?.scope || "None"}</p>
      <p>
        Resources: {Array.isArray(details?.resource)
          ? details.resource.join(", ")
          : details?.resource || "None"}
      </p>
      <p>Code: {userCode}</p>
      <p>Approve only if this code is showing right now on a device you have.</p>

      <button onClick={() => decide("approve")} disabled={isProcessing || !clientName}>
        Approve
      </button>
      <button onClick={() => decide("deny")} disabled={isProcessing}>
        Deny
      </button>
    </div>
  );
}
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `verificationUri` | string | `/device` | URL where the user enters the code (absolute or relative) |
| `expiresIn` | string | `30m` | Expiration time for the device code |
| `interval` | string | `5s` | Minimum polling interval |
| `userCodeLength` | number | `8` | Length of the user-friendly code (max 191) |
| `deviceCodeLength` | number | `40` | Length of the device verification code (max 191) |
| `generateDeviceCode` | function | - | Custom device code generation (string, at most 191 characters) |
| `generateUserCode` | function | - | Custom user code generation (string, at most 191 characters) |
| `validateClient` | function | - | Optional `(clientId: string) => boolean \| Promise<boolean>` callback for custom client ID validation in the first-party session flow |
| `onDeviceAuthRequest` | function | - | Hook fired on authorization request |

## Notes

- Enforces a polling interval to prevent abuse
- Codes expire after the configured time (default 30 minutes)
- Always validate the client ID in production
- Use HTTPS for device authorization in production
- User codes use a limited character set that excludes similar-looking characters (0/O, 1/I)
- User authentication is required for approval/denial
- `/device` is limited to 5 requests over a window equal to the configured device-code lifetime; `/device/token` keeps its own polling interval and `slow_down` behavior.
- Default user codes are case-insensitive and accept inserted whitespace or punctuation; custom user codes containing characters outside `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` are matched exactly. Device-code issuance makes up to 3 attempts on unique-key collisions, then `/device/code` returns `server_error`.
- With the OAuth Provider integration, `GET /device` also returns the approved resource context to the owning authenticated user, and an unknown OAuth client ID reaches the standalone flow only when `validateClient` accepts it (otherwise `invalid_client`). Standalone Device Authorization does not expose the RFC 8707 `resource` parameter.
- Changed in 1.7: `deviceCode` and `userCode` have unique indexes and values are limited to 191 characters. Resolve duplicate values on every adapter before migrating; MySQL and SQL Server must also convert both columns to bounded strings and clean up values longer than 191 characters. Custom generators must stay within 191 characters.
- Changed in 1.7: the OAuth device grant is opt-in. `oauthDeviceAuthorization` is provided by `@better-auth/oauth-provider`; it adds nullable `oauthClientId` and `resources` fields to `deviceCode`, validates the OAuth client, scopes and resources at creation, advertises the device authorization endpoint in discovery, and exchanges approved codes at `/oauth2/token`. Existing 1.6 rows need no backfill and stay on the session-token path; let pending 1.6 clients finish polling `/device/token` or expire before moving them to the OAuth flow. The client type exposes the RFC 8707 `resource` field only with `oauthDeviceAuthorizationClient()` from `@better-auth/oauth-provider/client`.
- The official v1.7.23 device-authorization example still shows `type: "native"`; 1.7 removed `type` (see oauth-provider: removed `type` and `public` fields are not accepted), so the snippet here uses `application_type`.
- Verifying the OAuth access token at the API: verify its signature, issuer, audience, expiry, and required scopes (see the "Protect your API" section of the oauth-provider resource-server docs). Client IDs not registered with OAuth Provider can use the first-party flow without OAuth client credentials only when `validateClient` explicitly accepts them.
- Approval page: the `client_id` the approval UI receives is the identifier the device sent, not a verified name. Show a name from your own client registry, accept only registered IDs in `validateClient`, keep Approve disabled until `GET /device` returns the client and scopes, and enable Approve only when that `client_id` is also in your own list of known clients.
- `validateClient` runs on both `/device/code` and `/device/token` in the standalone session flow. Return `true` to accept the client ID or `false` to reject with `invalid_client`. If omitted, the standalone flow skips this custom validation.
- Source: https://www.better-auth.com/docs/plugins/device-authorization (better-auth v1.7.23 docs)

### Error codes

| Code | Meaning |
|---|---|
| `authorization_pending` | User has not yet approved (continue polling) |
| `slow_down` | Polling too frequently (increase interval) |
| `expired_token` | Device code has expired |
| `access_denied` | User denied authorization |
| `invalid_client` | Client ID is not accepted |
| `invalid_grant` | Device code is invalid or belongs to another client |

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
