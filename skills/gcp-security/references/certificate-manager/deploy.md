---
source: https://docs.cloud.google.com/certificate-manager/docs/deploy
---

# Deployment overview

Overview of the two configuration methods Certificate Manager offers for Application Load Balancers (target HTTPS proxies) and proxy Network Load Balancers (target SSL proxies), plus the certificate types and per-product deployment support.

## Signature / Usage

### Attach a certificate map to a new global target HTTPS proxy

```bash
gcloud compute target-https-proxies create PROXY_NAME \
    --certificate-map="CERTIFICATE_MAP_NAME" \
    --url-map="URL_MAP" \
    --global
```

## Options / Props

### Configuration methods

| Method | Load balancers | Capacity |
|---|---|---|
| Target proxy references one certificate map | Global external Application Load Balancer, Classic Application Load Balancer, Global external proxy Network Load Balancer, Classic proxy Network Load Balancer (Google Front End based) | Thousands of entries by default; scales to millions |
| Target proxy references certificates directly | Regional external, regional internal, and cross-region internal Application Load Balancers (managed Envoy based) | Up to 100 Certificate Manager certificates |

### Product support

| Product | Load balancer authorization | DNS authorization | CA Service | Self-managed |
|---|---|---|---|---|
| Global external Application / classic Application / global external proxy Network / classic proxy Network Load Balancers | Yes | Yes | Yes | Yes |
| Regional external and regional internal Application Load Balancers | No | Yes | Yes | Yes |
| Cross-region internal Application Load Balancers | No | Yes | Yes | Yes |
| Secure Web Proxy gateways | No | Yes | Yes | Yes |
| Media CDN edge cache services | Yes | Yes | Yes | Yes |

## Notes

- Deployment guides referenced by the source: load balancer authorization (`deploy-google-managed-lb-auth`), DNS authorization ([deploy-google-managed-dns-auth.md](./deploy-google-managed-dns-auth.md)), CA Service (`deploy-google-managed-cas`), self-managed (`deploy-self-managed`), plus `-regional` and `-cross-reg` variants of each. Only the global DNS authorization guide has a page in this skill; the other guides are on the official site.
- Other products that reference Certificate Manager certificates: Secure Web Proxy gateways (create one or more certificates before configuring the gateway) and Media CDN edge cache services (up to five Certificate Manager certificates).
- GKE: GKE Gateway supports Certificate Manager certificates; GKE Ingress does not. For Ingress with Google-managed certificates use the `ManagedCertificate` resource (see the `gcp-gke` skill).
- To migrate an existing load balancer certificate, follow the "Migrate a certificate to Certificate Manager" page; for mTLS see the Cloud Load Balancing mutual TLS documentation (`gcp-load-balancing` skill).
- Snippet taken from https://docs.cloud.google.com/certificate-manager/docs/deploy-google-managed-dns-auth
- Source: https://docs.cloud.google.com/certificate-manager/docs/deploy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [core-components.md](./core-components.md)
- [deploy-google-managed-dns-auth.md](./deploy-google-managed-dns-auth.md)
- [domain-authorization.md](./domain-authorization.md)
