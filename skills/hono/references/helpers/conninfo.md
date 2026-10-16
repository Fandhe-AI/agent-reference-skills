# ConnInfo Helper

Retrieve TCP/UDP connection metadata (remote address, transport, port) from the current request.

## Signature / Usage

```ts
// Import path varies by platform:
import { getConnInfo } from '@hono/cloudflare-workers'  // Cloudflare Workers
import { getConnInfo } from '@hono/deno'                // Deno
import { getConnInfo } from '@hono/bun'                 // Bun
import { getConnInfo } from '@hono/vercel'              // Vercel
import { getConnInfo } from '@hono/aws-lambda'          // AWS Lambda
import { getConnInfo } from '@hono/netlify'             // Netlify
import { getConnInfo } from '@hono/lambda-edge'         // Lambda@Edge
import { getConnInfo } from '@hono/node-server/conninfo' // Node.js

app.get('/', (c) => {
  const info = getConnInfo(c)
  return c.text(`Your IP: ${info.remote.address}`)
})
```

## Options / Props

### `getConnInfo(c)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `c` | `Context` | Hono context |

Returns: `ConnInfo`

### `ConnInfo` structure

| Field | Type | Description |
|-------|------|-------------|
| `remote.address` | `string` | Client host name or IP address |
| `remote.addressType` | `'IPv4' \| 'IPv6' \| undefined` | IP version |
| `remote.transport` | `'tcp' \| 'udp' \| undefined` | Transport protocol |
| `remote.port` | `number \| undefined` | Remote port |

## Notes

- The import path is platform-specific; the adapter for each runtime is a separate package, so install the one for your runtime
- `hono/<adapter>` import paths are deprecated since v4.13.10 and will be removed in v5
- Node.js requires `@hono/node-server/conninfo` (separate package)

## Related

- [Adapter Helper](./adapter.md)
