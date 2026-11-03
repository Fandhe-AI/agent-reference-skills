---
source: https://developers.cloudflare.com/kv/reference/data-security/
---

# Data security

Workers KV encryption at rest, encryption in transit, and compliance certifications.

## Signature / Usage

```plaintext
Encryption at rest:  AES-256, GCM mode (automatic, no configuration)
Encryption in transit: TLS/SSL (Workers, internal nodes, HTTP API, wrangler)
```

## Notes

- All values stored in KV are encrypted at rest automatically with no configuration and no effective performance impact. Values are decrypted only by the process executing your Worker code or responding to your API requests.
- Encryption keys are managed by Cloudflare and stored in the same key management systems used for Cloudflare's internal encrypted data.
- Data transfer between a Worker and/or nodes within the Cloudflare network and KV uses TLS/SSL. HTTP API and Wrangler access is also over HTTPS.
- For compliance certifications, see Cloudflare's Trust Hub.

## Related

- [how-kv-works.md](./how-kv-works.md)
- [data-location.md](./data-location.md)
