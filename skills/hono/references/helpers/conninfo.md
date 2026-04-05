# ConnInfo Helper

Retrieve TCP/UDP connection metadata (remote address, transport, port) from the current request.

## Signature / Usage

```ts
// Import path varies by platform:
import { getConnInfo } from 'hono/cloudflare-workers'   // Cloudflare Workers
import { getConnInfo } from 'hono/deno'                 // Deno
import { getConnInfo } from '@hono/node-server/conninfo' // Node.js
// Also available for Bun, Vercel, AWS Lambda, etc.

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

- The import path is platform-specific; use the adapter matching your runtime
- Node.js requires `@hono/node-server/conninfo` (separate package)

## Related

- [Adapter Helper](./adapter.md)
