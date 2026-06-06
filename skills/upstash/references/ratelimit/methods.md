# Methods

Instance methods on a `Ratelimit` (or `MultiRegionRatelimit`) object.

## Signature / Usage

### `limit()`

Core method. Checks whether a request should proceed.

```ts
ratelimit.limit(
  identifier: string,
  req?: {
    geo?: Geo;
    rate?: number;
    ip?: string;
    userAgent?: string;
    country?: string;
  }
): Promise<RatelimitResponse>
```

```ts
const { success, remaining, reset, pending } = await ratelimit.limit("user_123");
if (!success) return new Response("Too many requests", { status: 429 });
context.waitUntil(pending); // flush analytics / multi-region sync
```

### `blockUntilReady()`

Waits until the rate limit window resets before resolving, instead of immediately rejecting.

```ts
ratelimit.blockUntilReady(identifier: string, timeout: number): Promise<RatelimitResponse>
```

```ts
const { success } = await ratelimit.blockUntilReady("user_123", 30_000);
```

### `resetUsedTokens()`

Clears all algorithm state for a given identifier.

```ts
ratelimit.resetUsedTokens(identifier: string): Promise<void>
```

### `getRemaining()`

Returns the current token count and next reset time without consuming a request.

```ts
ratelimit.getRemaining(identifier: string): Promise<{ remaining: number; reset: number }>
```

### `setDynamicLimit()`

Overrides the default limit at runtime. Pass `false` to revert to the constructor-defined limit.

```ts
ratelimit.setDynamicLimit(options: { limit: number | false }): Promise<void>
```

### `getDynamicLimit()`

Retrieves the currently active dynamic limit, or `null` if none is set.

```ts
ratelimit.getDynamicLimit(): Promise<{ dynamicLimit: number | null }>
```

## Options / Props

### `limit()` — `req` parameter

| Name | Type | Description |
|------|------|-------------|
| `geo` | `Geo` | Geolocation data object (passed through to deny-list checks) |
| `rate` | `number` | Custom token consumption amount for this request (default: 1) |
| `ip` | `string` | Client IP address (used by traffic protection) |
| `userAgent` | `string` | Client user-agent string (used by traffic protection) |
| `country` | `string` | Two-letter country code (used by traffic protection) |

### `RatelimitResponse`

| Field | Type | Description |
|-------|------|-------------|
| `success` | `boolean` | Whether the request is allowed |
| `limit` | `number` | Configured maximum requests per window |
| `remaining` | `number` | Remaining allowed requests in current window |
| `reset` | `number` | Unix timestamp (ms) when the window resets |
| `pending` | `Promise<unknown>` | Background work (analytics write, multi-region sync) |
| `reason` | `"timeout" \| "cacheBlock" \| "denyList"` | Why a request was blocked (when `success` is `false`) |
| `deniedValue` | `string` | The specific value matched in the deny list |

## Notes

- Always await or pass `pending` to `context.waitUntil()` in serverless environments to avoid premature runtime shutdown
- `blockUntilReady()` accepts timeout in **milliseconds**; it retries on each window reset until success or timeout
- `setDynamicLimit()` / `getDynamicLimit()` require `dynamicLimits: true` in the constructor
- `getRemaining()` does **not** consume tokens; safe to call for informational headers

## Related

- [overview.md](./overview.md)
- [algorithms.md](./algorithms.md)
- [features.md](./features.md)
- [costs.md](./costs.md)
