---
source: https://opencode.ai/docs/network/
---

# Network

Commands for configuring proxies and custom CA certificates.

## Signature / Usage

### Proxy (CLI shell)

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1,::1

opencode
```

### Proxy (background service)

```bash
opencode service set env HTTP_PROXY http://proxy.example.com:8080
opencode service set env HTTPS_PROXY http://proxy.example.com:8080
opencode service set env NO_PROXY localhost,127.0.0.1,::1
opencode service start
```

Remove a persisted variable:

```bash
opencode service unset env HTTPS_PROXY
```

### Proxy authentication

```bash
export HTTPS_PROXY='http://user:p%40ssword@proxy.example.com:8080'
```

```bash
opencode service set env HTTPS_PROXY 'http://user:p%40ssword@proxy.example.com:8080'
```

### Custom CA certificates

```bash
export NODE_EXTRA_CA_CERTS=/etc/company/ca.pem
opencode --standalone
```

```bash
opencode service set env NODE_EXTRA_CA_CERTS /etc/company/ca.pem
opencode service start
```

### Foreground processes

```bash
HTTP_PROXY=http://proxy.example.com:8080 \
HTTPS_PROXY=http://proxy.example.com:8080 \
NO_PROXY=localhost,127.0.0.1,::1 \
opencode --standalone
```

```bash
HTTPS_PROXY=http://proxy.example.com:8080 \
NO_PROXY=localhost,127.0.0.1,::1 \
opencode serve
```

### Verify

```bash
opencode api get /api/info
```

## Notes

- The loopback exclusion in `NO_PROXY` is required because OpenCode uses local HTTP connections between the CLI and its background service.
- Changing a managed environment variable stops the running service; `service start` starts it again.
- The proxy URL stored by `service set env` is shown by `opencode service get env`; do not share that output.
- `--standalone` and `serve` use the environment of their own process; `opencode service set env` does not configure them.

## Related

- server.md
- troubleshooting.md
- https://opencode.ai/docs/network/
