# API Key Reference

Complete reference of the API Key plugin's options, database schema, and type definitions.

## Signature / Usage

### Permission system

```typescript
type Permissions = {
    [resourceType: string]: string[]
}
```

Setting default permissions (static):

```typescript
apiKey({
    permissions: {
        defaultPermissions: {
            files: ["read"],
            users: ["read"],
        },
    },
})
```

Setting default permissions (dynamic):

```typescript
apiKey({
    permissions: {
        defaultPermissions: async (referenceId, ctx) => {
            return { files: ["read"], users: ["read"] }
        },
    },
})
```

### Deferred update configuration

Defers non-critical updates (rate limit counters, timestamps, remaining count) to improve response time.

Requirement: `backgroundTasks.handler` must be set in the auth options.

Trade-off: introduces eventual consistency by returning optimistic data before the DB update completes.

### Migrating from earlier versions

The `userId` field was replaced with `referenceId`. API responses now return `referenceId` instead of `userId`.

SQL migration:

```sql
ALTER TABLE apikey ADD COLUMN config_id VARCHAR(255) NOT NULL DEFAULT 'default';
ALTER TABLE apikey ADD COLUMN reference_id VARCHAR(255);
UPDATE apikey SET reference_id = user_id WHERE reference_id IS NULL;
ALTER TABLE apikey ALTER COLUMN reference_id SET NOT NULL;
CREATE INDEX idx_apikey_reference_id ON apikey(reference_id);
CREATE INDEX idx_apikey_config_id ON apikey(config_id);
```

## Options / Props

### Core configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `configId` | string | `"default"` | Unique identifier for multi-config setups |
| `references` | `"user" \| "organization"` | `"user"` | Ownership type of the API key |
| `apiKeyHeaders` | `string \| string[]` | `"x-api-key"` | Header name(s) to check for the API key |
| `storage` | `"database" \| "secondary-storage"` | `"database"` | Storage backend |
| `disableKeyHashing` | boolean | `false` | Disable API key hashing (security risk) |
| `deferUpdates` | boolean | `false` | Defer non-critical updates for performance |
| `enableSessionForAPIKeys` | boolean | `false` | Allow session representation via API keys |
| `fallbackToDatabase` | boolean | `false` | DB fallback when using secondary storage |

### Custom functions

| Option | Signature |
|---|---|
| `customAPIKeyGetter` | `(ctx: GenericEndpointContext) => string \| null` |
| `customAPIKeyValidator` | `(options: { ctx; key: string }) => boolean \| Promise<boolean>` |
| `customKeyGenerator` | `(options: { length: number; prefix?: string }) => string \| Promise<string>` |
| `customStorage` | Methods `{ get, set, delete }` |

### Key generation configuration

| Option | Type | Description |
|---|---|---|
| `defaultKeyLength` | number | Length of the API key (default: 64, excluding prefix) |
| `defaultPrefix` | string | API key prefix (an underscore suffix is recommended) |
| `maximumPrefixLength` | number | Maximum prefix length |
| `minimumPrefixLength` | number | Minimum prefix length |
| `startingCharactersConfig` | `{ shouldStore?, charactersLength? }` | Configures prefix storage behavior |

### Name configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `requireName` | boolean | `false` | Require a key name on creation |
| `minimumNameLength` | number | - | Minimum name length |
| `maximumNameLength` | number | - | Maximum name length |

### Advanced features

| Option | Type | Description |
|---|---|---|
| `enableMetadata` | boolean | Enable storing custom metadata |
| `keyExpiration` | `{ defaultExpiresIn?, disableCustomExpiresTime?, minExpiresIn?, maxExpiresIn? }` | Expiration settings |
| `rateLimit` | `{ enabled?, timeWindow?, maxRequests? }` | Rate limit configuration |
| `permissions` | `{ defaultPermissions? }` | Configures default or dynamic permissions |
| `schema` | `InferOptionSchema<...>` | Custom schema override |

## Notes

- Storing API keys in plaintext is vulnerable in the event of a database breach. Hashing is enabled by default and strongly recommended
- Adding an underscore to prefixes is recommended (e.g. `hello_`)

### DB schema

apikey table:

| Field | Type | Key | Description |
|---|---|---|---|
| `id` | string | PK | API key identifier |
| `configId` | string | - | Config ID (default: 'default') |
| `name` | string | ? | API key name |
| `start` | string | ? | Leading characters for UI display |
| `prefix` | string | ? | Plaintext prefix |
| `key` | string | - | Hashed API key |
| `referenceId` | string | - | Owner ID (user or organization) |
| `refillInterval` | number | ? | Refill interval (milliseconds) |
| `refillAmount` | number | ? | Refill amount |
| `lastRefillAt` | Date | ? | Last refill timestamp |
| `enabled` | boolean | ? | Enabled status |
| `rateLimitEnabled` | boolean | ? | Rate limiting status |
| `rateLimitTimeWindow` | number | ? | Rate limit window (milliseconds) |
| `rateLimitMax` | number | ? | Max requests per window |
| `requestCount` | number | ? | Request count in the current window |
| `remaining` | number | ? | Remaining requests |
| `lastRequest` | Date | ? | Last request timestamp |
| `expiresAt` | Date | ? | Expiration date |
| `createdAt` | Date | - | Creation timestamp |
| `updatedAt` | Date | - | Last update timestamp |
| `permissions` | string | ? | Serialized permissions |
| `metadata` | string | ? | Custom metadata (JSON) |

Indexes:
- `idx_apikey_reference_id` on `referenceId`
- `idx_apikey_config_id` on `configId`

Secondary storage key patterns:
- `api-key:${hashedKey}` - primary lookup
- `api-key:by-id:${id}` - ID-based lookup
- `api-key:by-ref:${referenceId}` - list of keys for a reference

Keys with `expiresAt` automatically get a TTL for cleanup.

## Related

- [api-key.md](./api-key.md)
- [api-key-advanced.md](./api-key-advanced.md)
