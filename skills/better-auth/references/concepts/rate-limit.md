# Rate Limit

Better Auth includes a built-in rate limiter for traffic management and abuse prevention.

## Signature / Usage

**Production defaults:** a 10-second window with a maximum of 100 requests per window (changed in 1.7 docs: the default window was 60 seconds). Disabled by default in development mode. Requests made server-side via `auth.api` completely bypass rate limiting.

### Setup

Enable rate limiting in development:

```typescript
export const auth = betterAuth({
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
});
```

### IP address detection

Uses the `x-forwarded-for` header by default. Configure a custom header depending on your infrastructure:

```typescript
export const auth = betterAuth({
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"], // Cloudflare
    },
  },
  rateLimit: { enabled: true },
});
```

### IPv6 support

Better Auth normalizes IPv6 addresses to prevent bypass attacks using alternate representations. IPv4-mapped IPv6 addresses (e.g. `::ffff:192.0.2.1`) are automatically converted to IPv4 form.

Subnet-based limiting:

```typescript
export const auth = betterAuth({
  advanced: {
    ipAddress: {
      ipv6Subnet: 64, // Rate limit by /64 subnet
    },
  },
});
```

Common prefix lengths: 128 (individual), 64 (/64 subnet), 48 (/48 allocation), 32 (/32 ISP).

### Custom rate limit rules

Apply stricter limits to sensitive endpoints:

```typescript
export const auth = betterAuth({
  rateLimit: {
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 10, max: 3 },
      "/two-factor/*": async (request) => ({
        window: 10,
        max: 3,
      }),
      "/get-session": false, // Disable for a specific path
    },
  },
});
```

Preset custom rules: `/sign-in/email` (3 requests/10s); the `twoFactor` plugin adds `/two-factor/*` (3 requests/10s).

### Storage options

```typescript
// Database storage
rateLimit: {
  storage: "database",
  modelName: "rateLimit", // optional
}

// Secondary storage (Redis)
rateLimit: {
  storage: "secondary-storage",
}

// Custom implementation
rateLimit: {
  customStorage: {
    consume: async (key, rule) => {
      // atomically record one request for `key`
      // rule.window is in seconds, rule.max is the request limit
      return { allowed: true, retryAfter: null };
    },
  },
}
```

`customStorage.consume` must check and increment in one operation. Better Auth no longer accepts separate `get` and `set` methods (removed in 1.7) because that shape can let concurrent requests pass the same stale counter.

Run migration: `npx auth@latest migrate`

### Error handling

When the rate limit is exceeded, the response includes an `X-Retry-After` header indicating the wait time in seconds.

Global client handling:

```typescript
export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      if (context.response.status === 429) {
        const retryAfter = context.response.headers.get("X-Retry-After");
        console.log(`Retry after ${retryAfter} seconds`);
      }
    },
  },
});
```

Per-request handling:

```typescript
await authClient.signIn.email({
  fetchOptions: {
    onError: async (context) => {
      if (context.response.status === 429) {
        // Handle the 429 response
      }
    },
  },
});
```

## Options / Props

### Database schema

Table used for database-backed rate limiting:

| Field | Type | Purpose |
|-------|------|---------|
| id | string | Primary key |
| key | string | Unique rate limit identifier |
| count | integer | Number of requests within the window |
| lastRequest | bigint | Timestamp of the last request (epoch ms) |

## Notes

- Requests made server-side via `auth.api` bypass rate limiting
- Disabled by default in development mode
- IPv6 addresses are normalized to prevent bypass attacks

## Related

- [Database](./database.md)
