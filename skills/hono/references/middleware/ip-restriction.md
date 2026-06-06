# IP Restriction Middleware

Restricts access based on client IP addresses using allowlists and denylists. Supports CIDR notation.

## Signature / Usage

```ts
import { ipRestriction } from 'hono/ip-restriction'
import { getConnInfo } from 'hono/bun' // use the helper for your runtime

app.use('*', ipRestriction(getConnInfo, {
  denyList: ['192.168.2.0/24'],
  allowList: ['127.0.0.1', '::1'],
}))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `getConnInfo` | `(c: Context) => ConnInfo` | **Required.** Runtime-specific connection info helper |
| `options.denyList` | `string[]` | IP addresses or ranges to block |
| `options.allowList` | `string[]` | IP addresses or ranges to allow |
| `errorHandler` | `(remote, c) => Response \| Promise<Response>` | Optional custom error response when access is denied |

## Supported IP Formats

| Format | Example |
|--------|---------|
| IPv4 static | `192.168.2.0` |
| IPv4 CIDR | `192.168.2.0/24` |
| IPv6 static | `::1` |
| IPv6 CIDR | `::1/10` |
| Wildcard | `*` |

## Notes

- Use the `getConnInfo` helper matching your runtime: `hono/bun`, `hono/deno`, `hono/node-server`, etc.
- `allowList` takes precedence over `denyList` when an IP matches both.
- IPv6 addresses are compared in canonical compressed form. Addresses passed in expanded form (e.g. `0000:0000::1`) are automatically normalized. This canonicalization was added in v4.12.21 to prevent bypass via non-canonical representations.

## Related

- [Combine](./combine.md)
