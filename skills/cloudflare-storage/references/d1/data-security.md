---
source: https://developers.cloudflare.com/d1/reference/data-security/
---

# Data security

Data security properties of D1: encryption at rest, encryption in transit, and Cloudflare's compliance certifications (SOC 2, ISO 27001).

## Signature / Usage

```sh
# API access via wrangler and the HTTP API is over TLS/SSL (HTTPS)
npx wrangler d1 info <DATABASE_NAME>
```

## Notes

- Encryption at rest: all objects (metadata, live databases, inactive databases) are encrypted automatically with no configuration or performance impact. Keys are managed by Cloudflare. Encryption uses AES-256, preferring GCM mode.
- Encryption in transit: transfers between a Worker (and/or nodes within the Cloudflare network) and D1 use TLS/SSL; HTTP API and Wrangler access is HTTPS.
- Compliance: see the Cloudflare Trust Hub for certifications.

## Related

- [Overview](./overview.md)
- [Audit Logs](./audit-logs.md)
