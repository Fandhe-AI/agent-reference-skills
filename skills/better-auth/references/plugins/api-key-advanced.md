# API Key Advanced

Advanced features of the API Key plugin: session generation, multi-config, organization-owned keys, storage modes, rate limiting, refill, and custom key generation.

## Signature / Usage

### Generating a session from an API key

Automatically creates a mock session when an API key is validated.

```typescript
export const auth = betterAuth({
    plugins: [
        apiKey({
            enableSessionForAPIKeys: true,
        }),
    ],
})
```

Only works for user-owned API keys (`references: "user"`). Sessions cannot be mocked for organization-owned keys.

When `enableSessionForAPIKeys` is enabled, the API key is validated once per request and rate limiting applies.

### Custom header configuration

```typescript
// Multiple headers
apiKey({ apiKeyHeaders: ["x-api-key", "xyz-api-key"] })

// Custom getter
apiKey({
    customAPIKeyGetter: (ctx) => {
        const has = ctx.request.headers.has("x-api-key")
        if (!has) return null
        return ctx.request.headers.get("x-api-key")
    },
})
```

### Multi-config

Define separate API key configurations with different prefixes, rate limits, and permissions.

```typescript
apiKey([
    {
        configId: "public",
        defaultPrefix: "pk_",
        rateLimit: {
            enabled: true,
            maxRequests: 100,
            timeWindow: 1000 * 60 * 60,
        },
    },
    {
        configId: "secret",
        defaultPrefix: "sk_",
        enableMetadata: true,
        rateLimit: {
            enabled: true,
            maxRequests: 1000,
            timeWindow: 1000 * 60 * 60,
        },
    },
])
```

Creating a key with a specific config:

```typescript
// Public key → pk_...
const publicKey = await auth.api.createApiKey({
    body: { configId: "public", userId: user.id },
})

// Secret key → sk_...
const secretKey = await auth.api.createApiKey({
    body: {
        configId: "secret",
        userId: user.id,
        metadata: { plan: "premium" },
    },
})
```

`configId` is required for all operations.

Global options:

```typescript
apiKey(
    [
        { configId: "public", defaultPrefix: "pk_" },
        { configId: "secret", defaultPrefix: "sk_" },
    ],
    { schema: { /* custom schema */ } }
)
```

### Organization-owned API keys

```typescript
apiKey([
    { configId: "user-keys", defaultPrefix: "user_", references: "user" },
    { configId: "org-keys", defaultPrefix: "org_", references: "organization" },
])
```

Creating an organization key:

```typescript
const orgKey = await auth.api.createApiKey({
    body: { configId: "org-keys", organizationId: "org_123" },
})
```

Role configuration:

```typescript
import { createAccessControl } from "better-auth/plugins/access"

const statements = { apiKey: ["create", "read", "update", "delete"] } as const
const ac = createAccessControl(statements)
const adminRole = ac.newRole({ apiKey: ["create", "read", "update", "delete"] })
const memberRole = ac.newRole({ apiKey: ["read"] })

export const auth = betterAuth({
    plugins: [
        organization({
            ac,
            roles: { admin: adminRole, member: memberRole },
            async sendInvitationEmail() {},
        }),
        apiKey([{ configId: "org-keys", defaultPrefix: "org_", references: "organization" }]),
    ],
})
```

Organization owners (`creatorRole`, default `"owner"`) automatically get full access to all API key operations.

### Storage modes

```typescript
// Database (default)
apiKey({ storage: "database" })
```

Secondary storage only:

```typescript
const redis = createClient()
await redis.connect()

export const auth = betterAuth({
    secondaryStorage: {
        get: async (key) => await redis.get(key),
        set: async (key, value, ttl) => {
            if (ttl) await redis.set(key, value, { EX: ttl })
            else await redis.set(key, value)
        },
        delete: async (key) => await redis.del(key),
    },
    plugins: [apiKey({ storage: "secondary-storage" })],
})
```

Secondary storage with DB fallback (secondary storage is checked first; if not found, the DB is queried and the result is automatically stored in secondary storage; writes go to both):

```typescript
apiKey({ storage: "secondary-storage", fallbackToDatabase: true })
```

Custom storage:

```typescript
apiKey({
    storage: "secondary-storage",
    customStorage: {
        get: async (key) => await customStorage.get(key),
        set: async (key, value, ttl) => await customStorage.set(key, value, ttl),
        delete: async (key) => await customStorage.delete(key),
    },
})
```

### Rate limiting

Applied every time an API key is verified (via the `/api-key/verify` endpoint and when used for session creation).

Default configuration:

```typescript
apiKey({
    rateLimit: {
        enabled: true,
        timeWindow: 1000 * 60 * 60 * 24, // 1 day
        maxRequests: 10,
    },
})
```

Per-key customization:

```typescript
const apiKey = await auth.api.createApiKey({
    body: {
        rateLimitEnabled: true,
        rateLimitTimeWindow: 1000 * 60 * 60 * 24,
        rateLimitMax: 10,
    },
    headers: await headers(),
})
```

Sliding window algorithm:

1. First request: allowed, `requestCount` set to 1
2. Within window: `requestCount` incremented. Once `rateLimitMax` is reached, rejected with a `RATE_LIMITED` error
3. Window reset: counter resets once the elapsed time since the last request exceeds `timeWindow`
4. Over-limit response: includes a `tryAgainIn` millisecond value

### Custom key generation and validation

```typescript
apiKey({
    customKeyGenerator: (options: { length: number, prefix: string | undefined }) => {
        return mySuperSecretApiKeyGenerator(options.length, options.prefix)
    },
    customAPIKeyValidator: async ({ ctx, key }) => {
        const res = await keyService.verify(key)
        return res.valid
    },
})
```

If `customKeyGenerator` does not use the `length` property, `defaultKeyLength` must be configured.

### Metadata

```typescript
// Enable
apiKey({ enableMetadata: true })

// Create with metadata
const apiKey = await auth.api.createApiKey({
    body: { metadata: { plan: "premium" } },
})
```

## Options / Props

### Access control and permissions for organization-owned keys

| Action | Permission | Description |
|---|---|---|
| Create | `apiKey: ["create"]` | Create an organization API key |
| Read/List | `apiKey: ["read"]` | View and list organization API keys |
| Update | `apiKey: ["update"]` | Modify an organization API key |
| Delete | `apiKey: ["delete"]` | Delete an organization API key |

Error codes:
- `USER_NOT_MEMBER_OF_ORGANIZATION`
- `INSUFFICIENT_API_KEY_PERMISSIONS`

### Remaining, Refill, Expiration

- **Remaining count**: the `remaining` count is updated each time the API key is used. `null` means no limit. Once it reaches 0, the key is disabled/deleted
- **Refill**: when an API key is used, if the elapsed time since the last refill exceeds `refillInterval`, `remaining` is reset to `refillAmount`
- **Expiration**: if `expiresIn` is not set, the API key never expires. If set, the key expires after that duration

## Notes

- Manually validating with `verifyApiKey()` and then using the same API key header with `getSession()` will increment the rate limit counter twice. Use `enableSessionForAPIKeys: true` or reuse the validation result
- Organization-owned keys cannot mock a user session

## Related

- [api-key.md](./api-key.md)
- [api-key-reference.md](./api-key-reference.md)
- [organization.md](./organization.md)
