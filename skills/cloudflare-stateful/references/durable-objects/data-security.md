---
source: https://developers.cloudflare.com/durable-objects/reference/data-security/
---

# Data security

Data security properties of Durable Objects: encryption at rest, encryption in transit, and compliance.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/

```ts
const rows = this.ctx.storage.sql.exec("SELECT * FROM users").toArray();
```

## Notes

- Encryption at rest: all Durable Object data, including metadata, is encrypted automatically, with no configuration and no effective performance impact. Keys are managed by Cloudflare in the same key management systems it uses internally. Implementation uses the LUKS disk encryption specification and AES-256.
- Encryption in transit: transfer between Workers and/or nodes within the Cloudflare network and Durable Objects uses TLS/SSL. API access via the HTTP API or `wrangler` is also over HTTPS.
- Compliance certifications: see the Cloudflare Trust Hub, https://www.cloudflare.com/trust-hub/compliance-resources/.

## Related

- [Data location](./data-location.md)
- [SQLite-backed storage API](./sqlite-storage-api.md)
