# Attach Headers

`attachHeaders` injects HTTP headers into outbound HTTPS requests from a box without the secrets entering the container (API keys, bearer tokens, credentials for untrusted code).

## Signature / Usage

```typescript
const box = await Box.create({
  runtime: "node",
  attachHeaders: {
    "api.stripe.com": { Authorization: "Bearer sk_live_..." },
    "*.supabase.co": { apikey: "eyJ..." },
    "api.anthropic.com": { "x-api-key": "sk-ant-..." },
  },
})

const result = await box.exec.command("curl -s https://api.stripe.com/v1/charges?limit=1")
```

```python
box = Box.create(
    runtime="node",
    attach_headers={"api.stripe.com": {"Authorization": "Bearer sk_live_..."}},
)
```

## Options / Props

| Pattern | Matches |
|---|---|
| `api.stripe.com` | Exact match only |
| `*.supabase.co` | Any subdomain such as `xyz.supabase.co` |

| | Environment Variables | Attach Headers |
|---|---|---|
| Visibility | Visible to all code in the box | Never enters the container |
| Use case | Non-sensitive config, or fully trusted code | API keys, tokens, credentials for untrusted code |
| Setup | Pass in `env` | Pass in `attachHeaders` with host patterns |

## Notes

- A TLS-intercepting proxy on the host injects headers into matching HTTPS requests; non-matching hosts pass through untouched
- Global headers can be configured at user or team level in the console Settings tab under Attach Headers; they apply to new boxes. Per-box headers override global ones for the same host pattern; other global patterns are included as-is
- Patterns must be lowercase; only `*.` prefix wildcards; most-specific match wins
- Limitations: set at box creation (after merging) and not updated on a running box; only HTTPS on port `443` is intercepted; HTTP/2 through matched hosts is downgraded to HTTP/1.1; values are encrypted at rest and never returned by API responses
- Source: https://upstash.com/docs/box/overall/attach-headers (fetched 2026-10-17; no version pin on the site).

## Related

- [Network Policy](./network-policy.md)
- [Security](./security.md)
