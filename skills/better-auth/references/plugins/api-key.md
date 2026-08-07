# API Key

The API Key plugin allows creating and managing API keys for an application, providing authentication and authorization for API requests. It supports rate limiting, metadata, organization-owned keys, and secondary storage.

## Signature / Usage

### Installation

```bash
npm install @better-auth/api-key
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { apiKey } from "@better-auth/api-key"

export const auth = betterAuth({
    plugins: [
        apiKey()
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
import { apiKeyClient } from "@better-auth/api-key/client"

export const authClient = createAuthClient({
    plugins: [
        apiKeyClient()
    ]
})
```

### Create API key

`POST /api-key/create`

```typescript
// Client
const { data, error } = await authClient.apiKey.create({
    configId,
    name: 'project-api-key',
    expiresIn: 60 * 60 * 24 * 7,
    organizationId: "org-id",
    prefix: 'project-api-key',
    metadata: { someKey: 'someValue' },
})

// Server (with extra parameters)
const data = await auth.api.createApiKey({
    body: {
        configId,
        name: 'project-api-key',
        expiresIn: 60 * 60 * 24 * 7,
        userId: "user-id",
        organizationId: "org-id",
        prefix: 'project-api-key',
        remaining: 100,
        metadata: { someKey: 'someValue' },
        refillAmount: 100,
        refillInterval: 1000,
        rateLimitTimeWindow: 1000,
        rateLimitMax: 100,
        rateLimitEnabled: true,
        permissions,
    },
})
```

### Verify API key

```typescript
// Client
const { data, error } = await authClient.apiKey.verify({
    configId,
    key: "your_api_key_here",
    permissions: { projects: ["read", "read-write"] },
})

// Server
const data = await auth.api.verifyApiKey({
    body: {
        configId,
        key: "your_api_key_here",
        permissions: { projects: ["read", "read-write"] },
    },
})
```

Response type: `{ valid: boolean, error: { message: string, code: string } | null, key: Omit<ApiKey, "key"> | null }`

### Get API key

`GET /api-key/get`

```typescript
const { data, error } = await authClient.apiKey.get({
    query: { configId, id: "some-api-key-id" },
})
```

### Update API key

`POST /api-key/update`

```typescript
// Client
const { data, error } = await authClient.apiKey.update({
    configId,
    keyId: "some-api-key-id",
    name: "some-api-key-name",
})

// Server (with extra parameters)
const data = await auth.api.updateApiKey({
    body: {
        configId,
        keyId: "some-api-key-id",
        userId: "some-user-id",
        name: "some-api-key-name",
        enabled: true,
        remaining: 100,
        refillAmount: 100,
        refillInterval: 1000,
        metadata: { "key": "value" },
        expiresIn: 60 * 60 * 24 * 7,
        rateLimitEnabled: true,
        rateLimitTimeWindow: 1000,
        rateLimitMax: 100,
        permissions,
    },
})
```

### Delete API key

`POST /api-key/delete`

```typescript
const { data, error } = await authClient.apiKey.delete({
    configId,
    keyId: "some-api-key-id",
})
```

Verifies user ownership before deleting.

### List API keys

`GET /api-key/list`

```typescript
const { data, error } = await authClient.apiKey.list({
    query: {
        configId,
        organizationId,
        limit,
        offset,
        sortBy,      // "createdAt" | "name" | "expiresAt"
        sortDirection, // "asc" | "desc"
    },
})
```

Response: `{ apiKeys: Omit<ApiKey, "key">[], total: number, limit?: number, offset?: number }`

### Delete all expired API keys

```typescript
const { data, error } = await authClient.apiKey.deleteAllExpiredApiKeys()
```

Expired keys are automatically deleted when API Key endpoints are called (with a 10-second cooldown).

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `configId` | string | `"default"` | Unique identifier for multi-config setups |
| `references` | `"user" \| "organization"` | `"user"` | Ownership type of the API key |
| `apiKeyHeaders` | `string \| string[]` | `"x-api-key"` | Header name(s) to check for the API key |
| `storage` | `"database" \| "secondary-storage"` | `"database"` | Storage backend |
| `disableKeyHashing` | boolean | `false` | Disable API key hashing (security risk) |
| `deferUpdates` | boolean | `false` | Defer updates for performance |
| `enableSessionForAPIKeys` | boolean | `false` | Allow representing a session via an API key |
| `fallbackToDatabase` | boolean | `false` | DB fallback when using secondary storage |
| `defaultKeyLength` | number | 64 | Length of the API key (excluding prefix) |
| `defaultPrefix` | string | - | API key prefix |
| `enableMetadata` | boolean | false | Enable storing custom metadata |
| `requireName` | boolean | false | Require a key name on creation |

## Notes

- Treat API keys as sensitive credentials; never expose them in client-side code
- Store keys securely and display them only once, at creation time
- Use rate limiting to prevent brute-force attacks
- API key hashing is enabled by default. Plaintext storage is vulnerable in the event of a database breach
- Adding an underscore to prefixes is recommended (e.g. `hello_`)

### DB schema

apikey table:

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | API key identifier |
| configId | string | - | Config ID (default: 'default') |
| name | string | ? | API key name |
| start | string | ? | Leading characters for UI display |
| prefix | string | ? | Plaintext prefix |
| key | string | - | Hashed API key |
| referenceId | string | - | Owner ID (user or organization) |
| refillInterval | number | ? | Refill interval (milliseconds) |
| refillAmount | number | ? | Refill amount |
| lastRefillAt | Date | ? | Last refill timestamp |
| enabled | boolean | ? | Enabled status |
| rateLimitEnabled | boolean | ? | Rate limiting status |
| rateLimitTimeWindow | number | ? | Rate limit window (milliseconds) |
| rateLimitMax | number | ? | Max requests per window |
| requestCount | number | ? | Request count in the current window |
| remaining | number | ? | Remaining requests |
| lastRequest | Date | ? | Last request timestamp |
| expiresAt | Date | ? | Expiration date |
| createdAt | Date | - | Creation timestamp |
| updatedAt | Date | - | Last update timestamp |
| permissions | string | ? | Serialized permissions |
| metadata | string | ? | Custom metadata (JSON) |

## Related

- [api-key-advanced.md](./api-key-advanced.md)
- [api-key-reference.md](./api-key-reference.md)
