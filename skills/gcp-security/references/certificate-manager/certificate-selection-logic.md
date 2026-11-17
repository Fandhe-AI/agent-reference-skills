---
source: https://docs.cloud.google.com/certificate-manager/docs/certificate-selection-logic
---

# How Certificate Manager works

Certificate Manager maps certificates to hostnames through certificate maps and map entries on a load balancer's target proxy. The load balancer selects a certificate during the TLS handshake based on the client's SNI hostname, certificate type, and certificate size.

## Signature / Usage

### Create a map entry that assigns a certificate to a hostname

```bash
gcloud certificate-manager maps entries create CERTIFICATE_MAP_ENTRY_NAME \
    --map="CERTIFICATE_MAP_NAME" \
    --certificates="CERTIFICATE_NAME" \
    --hostname="HOSTNAME"
```

## Options / Props

### Selection order

| Case | Result |
|---|---|
| Client hostname (SNI) exactly matches a hostname entry in the certificate map | The corresponding certificate is selected |
| No exact match, but it matches a wildcard entry (for example `*.myorg.example.com`) | The wildcard entry's certificate is selected |
| No exact or wildcard match | The primary certificate map entry is selected |
| No hostname provided and no primary entry configured | Handshake fails |

### Certificate priority

| Factor | Behavior |
|---|---|
| Certificate type | ECDSA certificates are preferred over RSA if the client supports ECDSA; otherwise RSA is served |
| Certificate size | Smaller certificates are preferred over larger ones (less bandwidth) |

### Wildcard rules

| Rule |
|---|
| Only Google-managed certificates with DNS authorization and Google-managed certificates with CA Service support wildcard names; load balancer authorization doesn't. |
| An exact match takes precedence over a wildcard (a request for `www.myorg.example.com` selects that entry even if `*.myorg.example.com` exists). |
| A wildcard matches only the first subdomain level (`host1.myorg.example.com` matches `*.myorg.example.com`, but `host1.hosts.myorg.example.com` doesn't). |

## Notes

- A Google-managed certificate must complete provisioning before the load balancer can serve it.
- Google-managed certificates renew automatically; self-managed certificates must be renewed manually. Cloud Logging alerts can be configured before expiry (see the Certificate Manager logs and metrics page).
- During the handshake the client sends its supported cryptographic algorithms and optionally the hostname (Server Name Indication).
- Snippet taken from https://docs.cloud.google.com/certificate-manager/docs/deploy-google-managed-dns-auth
- Source: https://docs.cloud.google.com/certificate-manager/docs/certificate-selection-logic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [core-components.md](./core-components.md)
- [domain-authorization.md](./domain-authorization.md)
- [deploy-google-managed-dns-auth.md](./deploy-google-managed-dns-auth.md)
