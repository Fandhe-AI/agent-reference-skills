---
source: https://docs.cloud.google.com/load-balancing/docs/ssl-certificates
---

# SSL certificates overview

An Application Load Balancer or proxy Network Load Balancer that uses SSL requires at least one private key and SSL certificate. This page covers SSL certificates and encryption in transit between such a load balancer and its clients. Google Cloud strongly recommends Certificate Manager (`certificatemanager.googleapis.com`) as the primary certificate management tool; Compute Engine SSL certificates (classic certificates) remain supported but have notable limitations, while Certificate Manager supports wildcards, seamless scaling and dynamic, non-disruptive updates.

## Signature / Usage

### Create a global Google-managed Compute Engine SSL certificate

```bash
gcloud compute ssl-certificates create CERTIFICATE_NAME \
    --description=DESCRIPTION \
    --domains=DOMAIN_LIST \
    --global
```

## Options / Props

### Certificate configuration methods

| Method | Limit |
|---|---|
| Target proxy references Compute Engine SSL certificates | Up to 15 Compute Engine SSL certificate resources (private key, certificate, optionally CA certificates) |
| Target proxy references a Certificate Manager certificate map | A single certificate map; supports thousands of entries by default, scales to millions |
| Target proxy references Certificate Manager certificates directly | Up to 100 Certificate Manager certificates |

### Load balancer support

| Load balancer | Compute Engine SSL certificates | Certificate Manager (certificate map) | Certificate Manager (individual certificates) |
|---|---|---|---|
| Global external Application Load Balancer | Yes | Yes | No |
| Classic Application Load Balancer | Yes | Yes | No |
| Regional external Application Load Balancer | Yes No | No | Yes |
| Regional internal Application Load Balancer | Yes No | No | Yes |
| Cross-region internal Application Load Balancer | No | No | Yes |
| Global external proxy Network Load Balancer (target SSL proxy) | Yes | Yes | No |
| Classic proxy Network Load Balancer (target SSL proxy) | Yes | Yes | No |

### Supported key types

| Key type | CE global self-managed | CE global publicly trusted Google-managed | CE regional self-managed | CM self-managed | CM publicly trusted Google-managed | CM privately trusted Google-managed |
|---|---|---|---|---|---|---|
| RSA-2048 | Yes | Yes | Yes | Yes | Yes | Yes |
| RSA-3072 | No | No | Yes | Yes | No | No |
| RSA-4096 | No | No | Yes | Yes | No | No |
| ECDSA P-256 | Yes | No | Yes | Yes | No | Yes |
| ECDSA P-384 | No | No | Yes | Yes | No | No |

### Certificate selection (multiple certificates on a target proxy)

| Situation | Result |
|---|---|
| One certificate referenced | That certificate is used; SNI is irrelevant |
| No SNI hostname in `ClientHello` | First certificate in the list |
| SNI matches no CN or SAN | First certificate in the list |
| Several certificates match | Exact CN/SAN match first, then wildcard match, then ECDSA over RSA, then smaller certificate chain size (bytes); if still tied, either may be selected |

## Notes

- Supported key types: CE = Compute Engine SSL certificates; CM = Certificate Manager SSL certificates (global and regional).
- Rules: a target proxy that supports both Compute Engine certificates and a certificate map can reference both, but then all Compute Engine SSL certificates are ignored and only the certificate map is used. A target proxy that supports both Compute Engine certificates and directly attached Certificate Manager certificates can reference up to 15 Compute Engine certificates or up to 100 Certificate Manager certificates, not a combination.
- Self-managed certificates can be DV, OV or EV. Google-managed certificates are always DV. Wildcard Google-managed certificates are supported only by Certificate Manager with DNS authorization.
- Only global Compute Engine `sslCertificates` support Google-managed certificates (publicly trusted only); `regionSslCertificates` do not. Certificate Manager (global and regional) supports publicly and privately trusted Google-managed certificates.
- You incur charges per TLS connection when you use RSA-3072 or RSA-4096 keys. See the Google Cloud network pricing page (prices are not copied here).
- ECDSA P-256 is the recommended key type for most certificates. A 256-bit ECDSA key gives a security level similar to RSA-3072; a 384-bit ECDSA key exceeds any widely supported RSA size. Keep RSA-2048 alongside ECDSA P-256 for legacy clients that do not support ECDSA.
- Using Certificate Manager is the best practice when multiple certificates are needed. The first referenced certificate is the default (primary) for Compute Engine and directly attached Certificate Manager certificates; for a certificate map you configure the primary entry.
- The selection process ignores `notValidBefore` and `notValidAfter`: the load balancer can serve an expired certificate if one is configured. Google-managed certificates avoid this.
- Matching uses CN and SAN, which must contain only lowercase characters; certificates with uppercase characters are returned only when set as the primary certificate. A wildcard (`*`) matches only the first-level subdomain (`*.pets.example.com` matches `cats.pets.example.com`, not `*.example.com`).
- The selected certificate is sent only if its public key algorithm (ECDSA or RSA) is compatible with a cipher in the client `ClientHello`; otherwise TLS negotiation fails.
- Certificate map selection logic differs; see the Certificate Manager documentation.
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs.
- Private keys of self-managed certificates must not be committed or shared, and key contents must not be put on a command line.
- Encryption between the load balancer and its backends is covered in `encryption-to-the-backends.md`. Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Certificate Manager is documented in the planned `gcp-security` skill.
- Clarified from the official docs: in the source table the Compute Engine SSL certificates cells carry two values (global rows read "Yes Yes", regional external and regional internal rows read "Yes No", the cross-region internal row reads "No") and the source does not label the two values; they are quoted as written. This page's Notes say regional Compute Engine certificates (`regionSslCertificates`) do not support Google-managed certificates.
- Source: https://docs.cloud.google.com/load-balancing/docs/ssl-certificates (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [google-managed-certs.md](./google-managed-certs.md)
- [encryption-to-the-backends.md](./encryption-to-the-backends.md)
- [ssl-policies-concepts.md](./ssl-policies-concepts.md)
