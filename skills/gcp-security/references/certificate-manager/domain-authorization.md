---
source: https://docs.cloud.google.com/certificate-manager/docs/domain-authorization
---

# Domain authorization types for Google-managed certificates

Certificate Manager verifies domain ownership for Google-managed certificates with either load balancer authorization or DNS authorization. Domain authorization doesn't apply to Google-managed certificates issued by Certificate Authority Service.

## Signature / Usage

### Create a per-project DNS authorization

Adapted (not in the official docs): `--type=PER_PROJECT_RECORD` becomes `--type=per-project-record`, the value listed in the gcloud help.

```bash
gcloud certificate-manager dns-authorizations create AUTHORIZATION_NAME \
    --domain="DOMAIN_NAME" \
    --type=per-project-record
```

## Options / Props

| | Load balancer authorization | DNS authorization |
|---|---|---|
| Setup | No extra steps or DNS changes | Create a DNS authorization and add its CNAME record |
| Network | Load balancer must be fully reachable from the internet on port 443, including DNS for all domains on the certificate | Works with complex setups (ports other than 443, CDN in front of the target proxy) |
| Provisioning | Only after the load balancer is fully set up and serving traffic | In advance, before the target proxy serves traffic |
| Wildcard certificates | Not supported | Supported |
| Regional certificates | Not supported | Supported |

### Load balancer authorization requirements

| Requirement |
|---|
| The certificate must be accessible on port 443 from all IP addresses serving the target domain, or provisioning fails (assign the same certificate to separate IPv4 and IPv6 load balancers). |
| Specify the load balancer IP addresses explicitly in DNS to prevent multi-perspective domain validation failures; intermediate layers such as a CDN can cause unpredictable behavior. |
| The target domain must be openly resolvable from the internet; split-horizon or DNS firewall environments can interfere. |

## Notes

- A DNS authorization covers a single domain and its wildcard (for example `myorg.example.com` and `*.myorg.example.com`). A wildcard covers only the first subdomain level (`*.myorg.example.com` doesn't cover `sub.subdomain.myorg.example.com`).
- Authorizations must cover every domain on the certificate, or creation and renewal fail. One authorization can serve several certificates for the same domain.
- DNS authorization requires a `CNAME` record that points to a special Google Cloud domain; the record also grants Certificate Manager permission to provision and renew certificates for that domain in your project. Remove the CNAME record to revoke it.
- The validation sub-domain must be openly resolvable; split-horizon or DNS firewall environments can interfere.
- `PER_PROJECT_RECORD` DNS authorization manages certificates independently per project and returns a project-specific CNAME subdomain and target. Google uses a custom implementation of account-based DNS authorization because the IETF standard is still in progress.
- Snippet taken from https://docs.cloud.google.com/certificate-manager/docs/deploy-google-managed-dns-auth
- Adapted from the official docs: the CLI value is written as listed in the gcloud 593.0.0 help of `certificate-manager dns-authorizations create` (`fixed-record`, `per-project-record`); the REST `type` field uses `FIXED_RECORD` / `PER_PROJECT_RECORD`.
- Source: https://docs.cloud.google.com/certificate-manager/docs/domain-authorization (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-google-managed-dns-auth.md](./deploy-google-managed-dns-auth.md)
- [core-components.md](./core-components.md)
- [certificate-selection-logic.md](./certificate-selection-logic.md)
