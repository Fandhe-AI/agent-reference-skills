# Using Edge Config

Practical guide to connection strings, read access tokens, and backups.

## Connection String Format

```
https://edge-config.vercel.com/<edgeConfigId>?token=<read_access_token>
```

Stored as the `EDGE_CONFIG` environment variable. The SDK reads this by default.

**Store it as an env var — not hardcoded.** Vercel detects the variable and applies read optimizations only when it is an environment variable.

## Getting a Connection String

Three ways:

1. **Dashboard**: When creating a read access token, the dialog shows the full connection string
2. **Auto-created**: When connecting an Edge Config to a project from the dashboard, Vercel sets `EDGE_CONFIG` automatically
3. **Manual**: Combine `<edgeConfigId>` + plaintext token from the Create Token API response

Pull the variable locally:

```bash
vercel env pull
```

## Finding Your Edge Config ID

- Dashboard: **Storage** sidebar > select Edge Config > **Edge Config ID** near the top
- API: `GET https://api.vercel.com/v1/edge-config?teamId=<teamId>`

## Creating a Read Access Token

Auto-created when you connect an Edge Config to a project.

To create manually via API:

```bash
curl -X POST 'https://api.vercel.com/v1/edge-config/<id>/token' \
  -H 'Authorization: Bearer <vercel_api_token>' \
  -H 'Content-Type: application/json' \
  -d '{ "label": "my-token" }'
```

> The full token is returned only once. Copy it immediately.

## Reading Data

Recommended order of preference:

1. Use the `@vercel/edge-config` SDK (reads from `EDGE_CONFIG` env var)
2. Fetch from `edge-config.vercel.com` directly (optimized, no rate limits)
3. Fetch from `api.vercel.com` (management only, 20 reads/min, no CDN optimizations)

## Writing Data

Use the [Vercel REST API](./vercel-api.md). Edge Config is read-only from the SDK.

## Edge Config Backups

Backups are created automatically whenever you make any change (via dashboard or API). They do not count toward storage size.

- Restore a backup from the **Edge Config dashboard**
- Restoring immediately updates the live data
- Previous live data becomes a new backup after restore

Retention by plan:

| Plan | Retention |
|------|-----------|
| Hobby | 7 days |
| Pro | 90 days |
| Enterprise | 365 days |

## Middleware Example

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware() {
  const greeting = await get('greeting');
  return NextResponse.json(greeting);
}
```

## Notes

- Multiple Edge Configs per project: supported, use `createClient` with separate env vars for each
- Reads in local development go over the public internet (~100ms+); production reads are optimized
- Security: the token-in-URL connection string is safe because the SDK sends the token via `Authorization` header, not as a query parameter in actual requests

## Related

- [@vercel/edge-config SDK](./edge-config-sdk.md)
- [Vercel REST API](./vercel-api.md)
- [Limits](./limits.md)
