---
source: https://docs.cloud.google.com/load-balancing/docs/ssl-certificates/encryption-to-the-backends
---

# Encryption from the load balancer to the backends

All VM-to-VM traffic within a VPC network and peered VPC networks is encrypted in all Google Cloud regions. For some proxy load balancers Google also automatically encrypts traffic to backends in Google Cloud VPC networks (automatic network-level encryption), and secure backend service protocols add auditable encryption.

## Signature / Usage

Example of creating a backend authentication config, which validates backend certificates for HTTPS / HTTP/2 backend services (snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/backend-authentication-configs/create):

```bash
gcloud network-security backend-authentication-configs create \
    backend-authentication-config \
    --trust-config=projects/my-project/locations/global/\
trustConfigs/my-trust-config --location=global
```

## Options / Props

### Communications between load balancers and backends

| Proxy load balancer | Proxy (client to the backend) | Automatic network-level encryption | Backend service protocol options |
|---|---|---|---|
| Global external Application Load Balancer | GFE (with Envoy software for advanced routing features) | Yes | HTTP, HTTPS, HTTP/2. Choose HTTPS or HTTP/2 for auditable encryption in transit to the backends |
| Classic Application Load Balancer | GFE | Yes | HTTP, HTTPS, HTTP/2 (same advice) |
| Regional external Application Load Balancer | Envoy proxy | Yes | HTTP, HTTPS, HTTP/2 (same advice) |
| Regional internal Application Load Balancer | Envoy proxy | Yes | HTTP, HTTPS, HTTP/2 (same advice) |
| Cross-region internal Application Load Balancer | Envoy proxy | Yes | HTTP, HTTPS, HTTP/2 (same advice) |
| Global external proxy Network Load Balancer | GFE (with Envoy software for advanced routing features) | Yes | SSL or TCP. Choose SSL for auditable encryption in transit |
| Classic proxy Network Load Balancer | GFE | Yes | SSL or TCP (same advice) |
| Regional external proxy Network Load Balancer | Envoy proxy | Yes | TCP |
| Regional internal proxy Network Load Balancer | Envoy proxy | Yes | TCP |
| Cross-region internal proxy Network Load Balancer | Envoy proxy | Yes | TCP |
| Cloud Service Mesh | Client-side proxy | No | HTTPS and HTTP/2 |

## Notes

- Automatic network-level encryption applies only to instance group and zonal NEG (`GCE_VM_IP_PORT` endpoints) backends.
- All load balancers support the TLS 1.3 cipher suites of RFC 8446 section 9.1. For TLS 1.2 and earlier they support the cipher suites of the COMPATIBLE SSL policy profile.
- Use a secure backend protocol when you need an auditable encrypted connection, or when the backend is outside Google Cloud (internet NEG, traffic may transit the public internet); the public CA-signed certificate must meet the internet NEG validation requirements.
- Backends must serve the same protocol as the backend service protocol (for `HTTPS`, HTTPS servers). With `HTTP2` the backends must use TLS; for HTTP/2 without TLS use the `H2C` protocol. Private keys and certificates must be installed on backends; they need not match the frontend certificates.
- Except for HTTPS load balancers with internet NEG backends, the load balancer does not use SNI to backends.
- For backends inside Google Cloud the load balancer performs only minimum validation: certificates are accepted even if self-signed, signed by an unknown CA, expired or not yet valid, or if `CN` / `subjectAlternativeName` do not match the `Host` header or DNS PTR record. To validate backends, see `backend-authenticated-tls-backend-mtls.md`.
- For RSA certificates, starting April 28, 2025, the load balancer accepts only RSA certificates that have the X509v3 Key Usage extension with both Digital Signature and Key Encipherment (release note of January 24, 2025).
- Frontend crypto: external Application Load Balancers and external proxy Network Load Balancers use Google's BoringCrypto (FIPS 140-3 certificate #5244); internal Application Load Balancers use BoringSSL, with Envoy built in FIPS-compliant mode. Cloud Service Mesh supports Envoy proxies built in FIPS-compliant mode.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/backend-authentication-configs/create (gcloud 593.0.0 help). The source page has no code samples.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source: https://docs.cloud.google.com/load-balancing/docs/ssl-certificates/encryption-to-the-backends (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ssl-certificates.md](./ssl-certificates.md)
- [backend-authenticated-tls-backend-mtls.md](./backend-authenticated-tls-backend-mtls.md)
- [ssl-policies-concepts.md](./ssl-policies-concepts.md)
