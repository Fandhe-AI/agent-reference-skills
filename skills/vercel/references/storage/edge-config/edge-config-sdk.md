# @vercel/edge-config (renamed to @vercel/global-config)

Read-only SDK for Global Config (formerly Edge Config). Install: `npm i @vercel/global-config`.

Reads from `GLOBAL_CONFIG` environment variable by default (was `EDGE_CONFIG`). Use `createClient` for multiple configs or custom env var names.

## get()

Fetches a single value by key.

```ts
import { get } from '@vercel/global-config';

const value = await get('featureFlag');
```

## getAll()

Returns all items, or a subset by key array.

```ts
import { getAll } from '@vercel/global-config';

const all = await getAll();
const subset = await getAll(['keyA', 'keyB']);
```

> Use `getAll()` instead of multiple `get()` calls — it counts as a single read operation.

## has()

Checks if a key exists. Returns `boolean`.

```ts
import { has } from '@vercel/global-config';

const exists = await has('featureFlag'); // true | false
```

## digest()

Returns a hash string of the current Global Config version. Changes whenever the config is updated.

```ts
import { digest } from '@vercel/global-config';

const version = await digest();
```

Useful for cache invalidation and verifying update propagation.

## createClient()

Creates a client bound to a specific connection string. Use when reading from multiple Global Configs or a non-default env var.

```ts
import { createClient } from '@vercel/global-config';

const config = createClient(process.env.MY_OTHER_GLOBAL_CONFIG);

const value = await config.get('key');
const all = await config.getAll();
const exists = await config.has('key');
const ver = await config.digest();
```

## Error Handling

All methods throw errors when:

- Read access token is invalid
- Edge Config does not exist
- A network error occurs

## Notes

- Package renamed from `@vercel/edge-config` to `@vercel/global-config`; connection-string env var renamed from `EDGE_CONFIG` to `GLOBAL_CONFIG`. No documented alias/fallback was found for either old name — verify current behavior before relying on it
- The SDK cannot write to Global Config; use the [Vercel REST API](./vercel-api.md) for writes
- Writing requires Vercel Access Tokens; reading uses Global Config read tokens — these are separate
- For high write volumes, consider Upstash Redis from the Marketplace instead

## Related

- [Overview](./overview.md)
- [Vercel REST API](./vercel-api.md)
- [Using Edge Config](./using-edge-config.md)
- [Limits](./limits.md)
