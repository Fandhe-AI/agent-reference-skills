---
source: https://docs.cloud.google.com/certificate-manager/docs/overview
---

# Certificate Manager overview

Certificate Manager simplifies the acquisition, deployment, and management of Transport Layer Security (TLS) certificates. It deploys global and regional certificates on Google Cloud load balancers, regional certificates on Secure Web Proxy proxies, and global certificates on Media CDN.

## Signature / Usage

### Create a certificate map (global load balancers)

```bash
gcloud certificate-manager maps create CERTIFICATE_MAP_NAME
```

## Options / Props

### Supported load balancers

| Load balancer | Certificate map | Individual certificates |
|---|---|---|
| Global external Application Load Balancer | Yes (self-managed, Google-managed) | No |
| Classic Application Load Balancer | Yes (self-managed, Google-managed) | No |
| Regional external Application Load Balancer | No | Yes (self-managed, Google-managed) |
| Regional internal Application Load Balancer | No | Yes (self-managed, Google-managed) |
| Cross-region internal Application Load Balancer | No | Yes (self-managed, Google-managed) |
| Global external proxy Network Load Balancer | Yes (self-managed, Google-managed) | No |
| Classic proxy Network Load Balancer | Yes (self-managed, Google-managed) | No |

### Supported certificate types

| Type | Description |
|---|---|
| Google-managed | Google Cloud obtains, issues, and renews them. Can use a Certificate Authority Service CA pool as issuer instead of public CAs. |
| Self-managed | You obtain, upload, and renew them (third-party CAs, CAs you trust, or self-signed). |

### Limitations

| Limitation | Value |
|---|---|
| Public Google-managed issuers | Only the Public Certificate Authority and the Let's Encrypt CA |
| Private Google-managed issuer | Only Certificate Authority Service |
| SANs per Google-managed certificate | Maximum 100 with DNS authorization; maximum 5 with load balancer authorization |
| Scope `ALL_REGIONS` | Doesn't support load balancer authorization |
| Domain name length | Limits apply; see the Certificate Manager quotas page |

## Notes

- Benefits listed in the source: automated issue / renew of Google-managed certificates, advance provisioning for zero-downtime migrations, storage and deployment of millions of certificates, no private-key management with Google-managed certificates, mTLS on the load balancer, DNS-based or load-balancer-based domain authorization, ACME access to Public CA, unified management via console / gcloud CLI / API, and hostname-based certificate selection (more certificates than Compute Engine SSL certificates).
- Load balancers that refer to a target HTTPS proxy or a target SSL proxy (`TargetSslProxy`) use TLS certificates. The load balancer must be compatible with the corresponding Network Service Tier.
- With a global external Application Load Balancer or an SSL-based global external proxy Network Load Balancer, TLS handshake latency can be higher in some locations than with Compute Engine SSL certificates.
- Certificate Manager (2nd gen) is a separate, Preview product generation; see [v2-overview.md](./v2-overview.md).
- Load balancer setup and backend services are covered by the `gcp-load-balancing` skill; Certificate Authority Service CA pools are in this skill's Certificate Authority Service references.
- Snippet taken from https://docs.cloud.google.com/certificate-manager/docs/deploy-google-managed-dns-auth
- Source: https://docs.cloud.google.com/certificate-manager/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [core-components.md](./core-components.md)
- [certificate-selection-logic.md](./certificate-selection-logic.md)
- [deploy.md](./deploy.md)
- [public-ca.md](./public-ca.md)
- [v2-overview.md](./v2-overview.md)
