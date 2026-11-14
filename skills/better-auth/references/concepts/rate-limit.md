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

Requests are counted per client IP address. By default the address is read from the `X-Forwarded-For` header, which clients can send themselves, so configure Better Auth for how requests reach your server:

| How requests reach your server | What to set |
| --- | --- |
| A proxy puts the client address in its own header | `ipAddressHeaders` with only that header |
| Proxies add addresses to `X-Forwarded-For` | `trustedProxies` with your proxies' addresses |
| Clients connect directly | `ipAddressHeaders: []`, or a header that your server code sets |

When you use a proxy, make sure clients can reach your server only through it.

#### A proxy sets the client address

List only the header that your proxy sets. Your proxy must replace any value that the client sent; a client could set any other header in the list.

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    advanced: {
        ipAddress: {
            // Replace this with the header your proxy sets.
            ipAddressHeaders: ["cf-connecting-ip"],
        },
    },
})
```

#### Proxies add to `X-Forwarded-For`

List the exact addresses of your proxies. Better Auth skips these addresses in the header and uses the client address. Do not use a wide range that also includes clients.

```typescript
export const auth = betterAuth({
    advanced: {
        ipAddress: {
            trustedProxies: ["192.0.2.10", "10.0.0.0/24"],
        },
    },
})
```

#### Clients connect directly

Better Auth cannot read the connection address. With `ipAddressHeaders: []`, all clients share one counter for each path. To count each client separately, set a header in your server code and list it in `ipAddressHeaders`; this is safe because your code replaces any value the client sent:

```typescript
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app = express();
const authHandler = toNodeHandler(auth);

// Express v4 route. For Express v5, use "/api/auth/*splat" instead.
app.all("/api/auth/*", (req, res) => {
    // Replace any value that the client sent.
    // Also set ipAddressHeaders: ["x-client-ip"] in your auth config.
    req.headers["x-client-ip"] = req.socket.remoteAddress ?? "";
    return authHandler(req, res);
});
```

#### When no address is found

Some requests have no valid address (for example `X-Forwarded-For` with several addresses while `trustedProxies` is not set). These share one counter for each path, and Better Auth logs a warning the first time. In development and test Better Auth uses `127.0.0.1` instead. `advanced.ipAddress.disableIpTracking: true` turns off the rate limiter for every HTTP request (not only for requests without an address) and stops recording the client address on new sessions.

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
- Changed since 1.7.10 docs: the connecting-IP guidance is a three-case table (`ipAddressHeaders` for a proxy-set header, `trustedProxies` for `X-Forwarded-For` chains, `ipAddressHeaders: []` or a server-set header for direct clients), plus behavior when no address is found and `disableIpTracking`
- Source: https://www.better-auth.com/docs/concepts/rate-limit (better-auth v1.7.23 docs)

## Related

- [Database](./database.md)
