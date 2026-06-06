# @vercel/edge-config

Read-only SDK for Edge Config. Install: `npm i @vercel/edge-config`.

Reads from `EDGE_CONFIG` environment variable by default. Use `createClient` for multiple configs or custom env var names.

## get()

Fetches a single value by key.

```ts
import { get } from '@vercel/edge-config';

const value = await get('featureFlag');
```

## getAll()

Returns all items, or a subset by key array.

```ts
import { getAll } from '@vercel/edge-config';

const all = await getAll();
const subset = await getAll(['keyA', 'keyB']);
```

> Use `getAll()` instead of multiple `get()` calls — it counts as a single read operation.

## has()

Checks if a key exists. Returns `boolean`.

```ts
import { has } from '@vercel/edge-config';

const exists = await has('featureFlag'); // true | false
```

## digest()

Returns a hash string of the current Edge Config version. Changes whenever the config is updated.

```ts
import { digest } from '@vercel/edge-config';

const version = await digest();
```

Useful for cache invalidation and verifying update propagation.

## createClient()

Creates a client bound to a specific connection string. Use when reading from multiple Edge Configs or a non-default env var.

```ts
import { createClient } from '@vercel/edge-config';

const config = createClient(process.env.MY_OTHER_EDGE_CONFIG);

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

- The SDK cannot write to Edge Config; use the [Vercel REST API](./vercel-api.md) for writes
- Writing requires Vercel Access Tokens; reading uses Edge Config read tokens — these are separate
- For high write volumes, consider Upstash Redis from the Marketplace instead

## Related

- [Overview](./overview.md)
- [Vercel REST API](./vercel-api.md)
- [Using Edge Config](./using-edge-config.md)
- [Limits](./limits.md)
