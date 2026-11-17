---
source: https://docs.cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs
---

# Use Google-managed SSL certificates

Compute Engine Google-managed SSL certificates automate acquisition, management and renewal of Domain Validation (DV) certificates for multiple hostnames. They are supported with the global external Application Load Balancer, the classic Application Load Balancer and the external proxy Network Load Balancer (target SSL proxy). They are not supported for regional external, regional internal or cross-region internal Application Load Balancers; use Compute Engine self-managed certificates or Certificate Manager there.

## Signature / Usage

### Step 1: create the certificate (global)

```bash
gcloud compute ssl-certificates create CERTIFICATE_NAME \
    --description=DESCRIPTION \
    --domains=DOMAIN_LIST \
    --global
```

REST equivalent (replace `PROJECT_ID`):

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/sslCertificates
{
  "name": "ssl-certificate-name",
  "managed": {
    "domains": [
      "www.example.com"
    ]
  },
  "type": "MANAGED"
}
```

### Check status

```bash
gcloud compute ssl-certificates list \
   --global
```

```bash
gcloud compute ssl-certificates describe CERTIFICATE_NAME \
   --global \
   --format="get(name,managed.status, managed.domainStatus)"
```

Right after creation the certificate status and domain status are `PROVISIONING`; they become `ACTIVE` once the certificate is attached to a target proxy and DNS is correct.

### Step 2: attach to the target proxy

```bash
gcloud compute target-https-proxies update TARGET_PROXY_NAME \
    --ssl-certificates SSL_CERTIFICATE_LIST \
    --global-ssl-certificates \
    --global
```

```bash
gcloud compute target-ssl-proxies update TARGET_PROXY_NAME \
    --ssl-certificates SSL_CERTIFICATE_LIST
```

### Step 3: verify the association

```bash
gcloud compute target-https-proxies describe TARGET_HTTPS_PROXY_NAME \
    --global \
    --format="get(sslCertificates)"
```

```bash
gcloud compute target-ssl-proxies describe TARGET_SSL_PROXY_NAME \
    --format="get(sslCertificates)"
```

### Step 4: DNS and domain status

```bash
dig www.example.com
```

```bash
gcloud compute ssl-certificates describe CERTIFICATE_NAME \
    --format="get(managed.domainStatus)"
```

### Step 5: test with OpenSSL

```text
echo | openssl s_client -showcerts -servername DOMAIN -connect IP_ADDRESS:443 -verify 99 -verify_return_error
```

The output should include the certificate chain and `Verify return code: 0 (ok)`.

### CAA records (authorize CAs)

```text
DOMAIN. CAA 0 issue "pki.goog"
DOMAIN. CAA 0 issue "letsencrypt.org"
```

### Delete (destructive)

```bash
gcloud compute ssl-certificates delete CERTIFICATE_NAME \
    --global
```

## Options / Props

| Item | Value |
|---|---|
| Permissions | project Owner/Editor (`roles/owner`, `roles/editor`); or both `compute.securityAdmin` and `compute.networkAdmin`; or a custom role with `compute.sslCertificates.*` plus `compute.targetHttpsProxies.*` and/or `compute.targetSslProxies.*` |
| `--domains` | single domain or comma-delimited list |
| Provisioning time | up to 60 minutes; up to 30 minutes more before the load balancer serves it |
| DNS propagation | typically a few hours, sometimes up to 72 hours worldwide |
| Validity / issuers | Public Certificate Authority (`pki.goog`): transitioning from 90-day to 45-day validity (existing 90-day certificates stay valid until next renewal); Let's Encrypt (`letsencrypt.org`): 90 days |
| Renewal start | when about one-third of validity remains: about 15 days before expiry (45-day) or about 30 days (90-day) |
| Domain status in the source | `PROVISIONING`, `ACTIVE`, `FAILED_NOT_VISIBLE` |
| Domains per certificate | maximum is on the load balancing quotas page; more domains require several certificates |

## Notes

- The forwarding rule must use TCP port 443 for the certificate to be provisioned and renewed.
- `gcloud compute target-ssl-proxies update ... --ssl-certificates` overrides the existing list: include all older valid certificates as well as the new one. The same `SSL_CERTIFICATE_LIST` placeholder is used for `target-https-proxies update --ssl-certificates`, which sets the proxy's certificate list ("References to at most 15 SSL certificate resources" in the gcloud help, first one is primary), so pass the existing certificates there too.
- DNS A (IPv4) and AAAA (IPv6) records for every domain must point only to the load balancer forwarding rule IP address. A CNAME to a domain that has an A/AAAA record pointing to the load balancer also works. Other addresses in the record, GeoDNS, location-based DNS policies, or intermediate CDNs/firewalls can make validation and renewal fail; then the load balancer serves an expired certificate. For load balancers behind a CDN, migrate to Certificate Manager and use DNS authorization.
- Renewal validation uses Multi-Perspective Issuance Corroboration (MPIC) from several vantage points. To verify DNS changes quickly, create a new certificate, attach it alongside the existing one, wait for `ACTIVE`, then remove the earlier certificate; this does not interrupt traffic.
- Domain validation backs off exponentially; for a planned cutover a day or more after deployment, create or recreate the certificates shortly before or during the maintenance window.
- Without a CAA record both `pki.goog` and `letsencrypt.org` are allowed. Specifying only one is not recommended. `letsencrypt.org` support is best-effort and it issues IDNs; `pki.goog` does not currently support IDNs. CAA changes can take time to propagate, so a renewal may fail first and then succeed.
- You cannot change the domain list of an existing certificate; create a new one and replace it. Replace: create the new certificate, add it to the target proxy next to the current ones, wait until `ACTIVE` (up to 60 minutes), wait 30 more minutes for Google Front Ends, remove the old certificate from the target proxy, wait 10 minutes and confirm, then remove and optionally delete the old resource. An undeleted old certificate stays `ACTIVE` until it expires.
- Migration from self-managed: create the Google-managed certificate, attach it while keeping the self-managed one, wait for `ACTIVE`, wait 30 minutes, then remove the self-managed one. Removing it too early leaves no valid certificate.
- Self-managed certificates need a private key: never commit or share key files and do not put key contents on a command line. The commands on this page need no private key.
- Deleting a certificate is destructive: first make sure no target proxy references it, and try it on a disposable resource first.
- External load balancers expose the service to the internet; this page does not configure Cloud Armor or IAP (planned `gcp-security`).
- The source also shows Console, Terraform and GKE (managed-certs) variants. The full `gcloud compute ssl-certificates` flag list is in the `gcp-compute` skill; reference URL: https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-certificates/create
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source inconsistency: the source says Compute Engine Google-managed certificates "aren't supported for regional external Application Load Balancers, regional internal Application Load Balancers, or cross-region internal Application Load Balancers. For these load balancers, you can use Compute Engine self-managed SSL certificates", but the certificate configuration method table (https://docs.cloud.google.com/load-balancing/docs/ssl-certificates, retrieved 2026-11-17) lists Compute Engine SSL certificates for the cross-region internal Application Load Balancer as "No". Use Certificate Manager for cross-region internal Application Load Balancers.
- Clarified from the official docs: the source states the override only for `target-ssl-proxies update`, but its `SSL_CERTIFICATE_LIST` placeholder ("includes all older valid SSL certificates as well as the new SSL certificate") is shared with the `target-https-proxies update` command, and the gcloud 593.0.0 help for `compute target-https-proxies update` defines `--ssl-certificates` as the list of certificates attached to the proxy.
- Source: https://docs.cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ssl-certificates.md](./ssl-certificates.md)
- [ssl-policies-concepts.md](./ssl-policies-concepts.md)
