---
source: https://developers.cloudflare.com/r2/reference/data-security/
---

# Data security

R2 encrypts all objects (and metadata) at rest with AES-256 and in transit with TLS.

## Signature / Usage

```txt
At rest:    AES-256, GCM preferred mode, Cloudflare-managed keys, automatic
In transit: TLS/SSL as on all Cloudflare domains
```

## Notes

- Encryption and decryption are automatic, need no configuration, and do not affect effective performance.
- Plaintext HTTP access can be disabled by connecting a custom domain and enabling Always Use HTTPS.
- R2 custom domains use Cloudflare for SaaS certificates that cannot be customized; Advanced Certificate Manager certificates are not used due to certificate prioritization.
- For customer-provided keys see SSE-C (S3 API compatibility and Workers `ssecKey` option).
- Compliance certifications are listed on the Cloudflare Trust Hub.

## Related

- [Public buckets](./buckets-public-buckets.md)
- [S3 API compatibility](./s3-api-compatibility.md)
- [How R2 works](./how-r2-works.md)
