---
source: https://docs.cloud.google.com/certificate-manager/docs/public-ca
---

# Public CA

Public CA lets you programmatically request publicly trusted X.509 TLS certificates over the ACME protocol (RFC 8555) after proving control of the domains. It is part of Certificate Manager and supports automated provisioning, renewal, and revocation, including for on-premises and cross-cloud workloads.

## Signature / Usage

### Create an external account key (for ACME external account binding)

```bash
gcloud publicca external-account-keys create \
  --key-output-file=./external_account_key.txt
```

## Options / Props

### Challenge types

| Challenge | How it proves control | Names allowed in the certificate |
|---|---|---|
| HTTP | File at a well-known location on an HTTP server (port 80) | Only the validated domain names |
| TLS-ALPN | Server presents a specific certificate during TLS negotiation on port 443 (RFC 8737) | Only the validated domain names |
| DNS | Specific DNS record at a defined location | The domain and its subdomains (a wildcard such as `*.myorg.example.com` validated via DNS covers `subdomain1.myorg.example.com`) |

### Challenge logic

| Step | Action |
|---|---|
| 1 | Public CA provides a random token |
| 2 | The client makes the token available at a well-defined location (depends on the challenge) |
| 3 | The client tells Public CA the challenge is prepared |
| 4 | Public CA checks that the token at that location matches the expected value |

## Notes

- Requirements: an ACME client that supports external account binding (EAB). Each ACME account must be bound to the target Google Cloud project with EAB, by registering the account with a secret linked to that project.
- The external account key is a secret: keep the key output file out of version control, shared terminals, and CI logs.
- Only one challenge per domain name needs to be solved. After the authorization period, the domain must be revalidated by solving one of the three challenge types. Wildcard names can't be validated with the HTTP or TLS-ALPN challenges.
- Public CA also provisions TLS certificates for Google Cloud services such as App Engine, Cloud Shell, GKE, and Cloud Load Balancing. Multi-perspective domain validation guards against BGP and DNS hijacking.
- The source recommends publicly trusted certificates only when business requirements allow no other option. For non-public certificates use Cloud Service Mesh certificates (mTLS for GKE Enterprise workloads) or Certificate Authority Service for custom private CAs.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/publicca/external-account-keys/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/certificate-manager/docs/public-ca (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [core-components.md](./core-components.md)
