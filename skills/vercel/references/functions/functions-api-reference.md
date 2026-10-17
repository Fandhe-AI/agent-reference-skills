# @vercel/functions API Reference

Helper methods from the `@vercel/functions` package (Node.js) for Vercel Functions.

## Signature / Usage

```bash
npm i @vercel/functions
```

```ts
import { waitUntil } from '@vercel/functions';

async function getBlog() {
  const res = await fetch('https://my-analytics-service.example.com/blog/1');
  return res.json();
}

export default {
  fetch(request: Request) {
    waitUntil(getBlog().then((json) => console.log({ json })));
    return new Response(`Hello from ${request.url}, I'm a Vercel Function!`);
  },
};
```

## Methods

| Method | Signature / Params | Description |
|--------|--------------------|-------------|
| `waitUntil` | `promise: Promise` | Extends request handler lifetime for the promise. Same timeout as the function; cancelled on timeout. Node.js and Edge Runtime |
| `getEnv` | none | Gets Vercel System Environment Variables |
| `getDeadline` | returns `Date \| undefined` | Shared invocation deadline based on `maxDuration` (includes `waitUntil` tasks); `undefined` when unavailable |
| `metric` | `name: string, value: number, attributes?: Record<string, string>` | Records a custom metric data point |
| `geolocation` | `request: Request` | Location info (`city`, `country`, `flag`, `countryRegion`, `region`, `latitude`, `longitude`, `postalCode`) |
| `ipAddress` | `request: Request` | IP address from headers |
| `invalidateByTag` | `tag: string \| string[]` | Marks tag stale; revalidated in background on next request |
| `dangerouslyDeleteByTag` | `tag, options: { revalidationDeadlineSeconds: number }` | Marks tag deleted; revalidated in foreground. Cache stampede risk; prefer `invalidateByTag` |
| `invalidateBySrcImage` | `srcImage: string` | Marks all cached content for a source image stale. Must exactly match the app's reference, including query params |
| `dangerouslyDeleteBySrcImage` | `srcImage, options: { revalidationDeadlineSeconds: number }` | Foreground-revalidated delete; prefer `invalidateBySrcImage` |
| `addCacheTag` | `tag: string \| string[]` | Adds tags to a cached response for later `invalidateByTag()` |
| `getCache` | `{ keyHashFunction?, namespace?, namespaceSeparator? }` | Returns a `RuntimeCache` (separator defaults to `$`) |
| `upgradeWebSocket` | `handler: (ws: WebSocket) => void \| Promise<void>, options?: UpgradeWebSocketOptions` | Upgrades an HTTP GET to a WebSocket. Needs `@vercel/functions` 3.10.0+ and `ws` |
| `attachDatabasePool` | `dbPool: DbPool` | Call right after creating a DB pool so idle clients are released before functions suspend (Fluid compute) |

`RuntimeCache` methods:

| Method | Description |
|--------|-------------|
| `get(key: string)` | Resolves to `null` when missing or expired |
| `set(key: string, value: unknown, options?: { name?: string; tags?: string[]; ttl?: number })` | Store a value with optional TTL (seconds) / tags |
| `delete(key: string)` | Remove by key |
| `expireTag(tag: string \| string[])` | Expire entries by tag; propagated globally within 300ms |

`UpgradeWebSocketOptions`: `maxPayload: number` (default 262144, 256 KiB).

```ts
import { getCache } from '@vercel/functions';

export default {
  async fetch(request) {
    const cache = getCache();
    const value = await cache.get('somekey');
    if (value !== null) {
      return new Response(JSON.stringify(value));
    }
    const res = await fetch('https://api.vercel.app/blog');
    const originValue = await res.json();
    await cache.set('somekey', originValue, {
      ttl: 3600, // 1 hour in seconds
      tags: ['example-tag'],
    });
    return new Response(JSON.stringify(originValue));
  },
};
```

## OIDC methods

| Method | Package | Description |
|--------|---------|-------------|
| `awsCredentialsProvider` | `@vercel/oidc-aws-credentials-provider` (moved from `@vercel/functions/oidc`) | AWS credential provider via STS `AssumeRoleWithWebIdentity`; takes `roleArn`, `clientConfig`, `clientPlugins`, `roleAssumerWithWebIdentity`, `roleSessionName`, `providerId`, `policyArns`, `policy`, `durationSeconds` (default 3600) |
| `getVercelOidcToken` | `@vercel/oidc` (moved from `@vercel/functions/oidc`) | Returns the OIDC token from `VERCEL_OIDC_TOKEN` or request context headers |

```ts
import * as s3 from '@aws-sdk/client-s3';
import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';

const s3Client = new s3.S3Client({
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN,
  }),
});
```

## Notes

- Next.js 15.1+: prefer the built-in `after()` from `next/server` instead of `waitUntil()`; `after()` does not block the response and is not a Dynamic API
- `metric()`: names / attribute names / values must be non-empty, shorter than 64 bytes, and use `A-Z a-z 0-9 - _ . /` (others become `_`); up to 50 attributes per call and 100 calls per invocation; each call counts as one Observability event
- Cache tags: max 128 tags per cached response, max 256 bytes per tag, no commas. Alternatively set the `Vercel-Cache-Tag` response header
- Runtime Cache: isolated per environment (`preview` / `production`); per project on Pro and Enterprise, shared across the team on Hobby. Max item size 2 MB, 128 tags, 256-byte tags. No first-class ISR integration (tags and TTLs do not apply to ISR; `revalidatePath` / `revalidateTag` do not invalidate it). Usage is charged
- `upgradeWebSocket()`: with Next.js Cache Components, call `connection()` from `next/server` before it. Local dev for Next.js needs `vc dev` (Vercel CLI 54.14.2+) instead of `next dev`; no other framework supports local dev. Prefer native Node.js WebSocket handling when possible
- `attachDatabasePool` supports pg, MySQL2, MariaDB, MongoDB, ioredis, cassandra-driver, and other compatible pools
- Python equivalent is vercel.functions (see vercel-sdk-python.md)
- Source: https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package, https://vercel.com/docs/functions/functions-api-reference

## Related

- [vercel-sdk-python.md](./vercel-sdk-python.md)
- [websockets.md](./websockets.md)
- [fluid-compute.md](./fluid-compute.md)
- [max-duration.md](./max-duration.md)
