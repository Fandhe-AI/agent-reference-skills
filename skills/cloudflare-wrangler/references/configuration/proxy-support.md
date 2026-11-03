---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#proxy-support
---

# Proxy Support

Configure Wrangler for corporate network proxies using environment variables.

## Signature / Usage

```sh
$ HTTP_PROXY=http://localhost:8080 wrangler dev
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `https_proxy` | env var | Proxy for outgoing requests. |
| `HTTPS_PROXY` | env var | Proxy for outgoing requests. |
| `http_proxy` | env var | Proxy for outgoing requests. |
| `HTTP_PROXY` | env var | Proxy for outgoing requests. |

## Notes

- On macOS, add `HTTP_PROXY=http://<YOUR_PROXY_HOST>:<YOUR_PROXY_PORT>` before your Wrangler commands.
- The first non-empty variable in the list above is used. If both `https_proxy` and `http_proxy` are set, Wrangler only uses `https_proxy`.

## Related

- [system-environment-variables.md](./system-environment-variables.md)
