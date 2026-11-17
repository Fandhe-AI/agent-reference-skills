---
source: https://docs.cloud.google.com/certificate-manager/docs/deploy-google-managed-dns-auth
---

# Deploy a global Google-managed certificate with DNS authorization

Create a Google-managed certificate issued by a publicly trusted CA with DNS authorization, then deploy it to a global load balancer through a certificate map and target HTTPS proxy. Supported: global external Application Load Balancer, Classic Application Load Balancer, global external proxy Network Load Balancer, and classic proxy Network Load Balancer.

## Signature / Usage

### 1. Create a DNS authorization

One authorization covers one domain. For a wildcard certificate such as `*.myorg.example.com`, create the authorization for the parent domain (`myorg.example.com`). Global Google-managed certificates default to `FIXED_RECORD`.

Adapted (not in the official docs): `--type=[FIXED_RECORD]` becomes `--type=fixed-record`, and `--type=PER_PROJECT_RECORD` becomes `--type=per-project-record` (the values listed in the gcloud help); gcloud rejects the bracketed value as an invalid choice and zsh treats it as a glob.

```bash
gcloud certificate-manager dns-authorizations create AUTHORIZATION_NAME \
    --domain="DOMAIN_NAME" \
    --type=fixed-record
```

```bash
gcloud certificate-manager dns-authorizations create AUTHORIZATION_NAME \
    --domain="DOMAIN_NAME" \
    --type=per-project-record
```

Adapted (not in the official docs): removed the `//optional` comment and trailing commas so the body is valid JSON.

```text
POST /v1/projects/PROJECT_ID/locations/global/dnsAuthorizations?dns_authorization_id=AUTHORIZATION_NAME
{
  "domain": "DOMAIN_NAME",
  "type": "PER_PROJECT_RECORD"
}
```

Describe it and copy the `dnsResourceRecord` (`data`, `name`, `type`) into your DNS configuration:

```bash
gcloud certificate-manager dns-authorizations describe AUTHORIZATION_NAME
```

```yaml
createTime: '2022-01-14T13:35:00.258409106Z'
dnsResourceRecord:
  data: 0e40fc77-a37d-4eb8-8fe1-eea2e18d12d9.4.authorize.certificatemanager.goog.
  name: _acme-challenge.myorg.example.com.
  type: CNAME
domain: myorg.example.com
name: projects/myProject/locations/global/dnsAuthorizations/myAuthorization
updateTime: '2022-01-14T13:35:01.571086137Z'
```

### 2. Create the certificate

```bash
gcloud certificate-manager certificates create CERTIFICATE_NAME \
    --domains="DOMAIN_NAME,*.DOMAIN_NAME" \
    --dns-authorizations="AUTHORIZATION_NAMES"
```

Adapted (not in the official docs): removed the trailing commas after the `dnsAuthorizations` entry and after its closing `]` so the body is valid JSON.

```text
POST /v1/projects/PROJECT_ID/locations/global/certificates?certificate_id=CERTIFICATE_NAME
{
 "managed": {
  "domains": ["DOMAIN_NAME"],
  "dnsAuthorizations": [
   "projects/PROJECT_ID/locations/global/dnsAuthorizations/AUTHORIZATION_NAME"
  ]
 }
}
```

### 3. Add the CNAME record (Cloud DNS)

```bash
gcloud dns record-sets transaction start --zone="DNS_ZONE_NAME"
```

```bash
gcloud dns record-sets transaction add CNAME_RECORD \
    --name="VALIDATION_SUBDOMAIN_NAME.DOMAIN_NAME." \
    --ttl="30" \
    --type="CNAME" \
    --zone="DNS_ZONE_NAME"
```

```bash
gcloud dns record-sets transaction execute --zone="DNS_ZONE_NAME"
```

### 4. Verify the certificate is `ACTIVE`

```bash
gcloud certificate-manager certificates describe CERTIFICATE_NAME
```

```text
createTime: '2021-10-20T12:19:53.370778666Z'
expireTime: '2022-05-07T05:03:49Z'
managed:
  authorizationAttemptInfo:
  - domain: myorg.example.com
    state: AUTHORIZED
  dnsAuthorizations:
    - projects/myProject/locations/global/dnsAuthorizations/myCert
  domains:
  - myorg.example.com
  state: ACTIVE
name: projects/myProject/locations/global/certificates/myCert
pemCertificate: |
  ---BEGIN CERTIFICATE---
  [...]
  ---END CERTIFICATE---
sanDnsnames:
  -   myorg.example.com
updateTime: '2021-10-20T12:19:55.083385630Z'
```

### 5. Create a certificate map and entry, verify, and attach

```bash
gcloud certificate-manager maps create CERTIFICATE_MAP_NAME
```

```bash
gcloud certificate-manager maps entries create CERTIFICATE_MAP_ENTRY_NAME \
    --map="CERTIFICATE_MAP_NAME" \
    --certificates="CERTIFICATE_NAME" \
    --hostname="HOSTNAME"
```

```bash
gcloud certificate-manager maps entries describe CERTIFICATE_MAP_ENTRY_NAME \
    --map="CERTIFICATE_MAP_NAME"
```

```bash
gcloud compute target-https-proxies create PROXY_NAME \
    --certificate-map="CERTIFICATE_MAP_NAME" \
    --url-map="URL_MAP" \
    --global
```

```bash
gcloud compute target-https-proxies update PROXY_NAME \
    --certificate-map="CERTIFICATE_MAP_NAME" \
    --global
```

### Detach the certificate map from a proxy

```bash
gcloud compute target-https-proxies update PROXY_NAME \
    --clear-certificate-map
```

## Options / Props

| Item | Detail |
|---|---|
| Required roles | Certificate Manager Owner (`roles/certificatemanager.owner`); Compute Load Balancer Admin (`roles/compute.loadBalancerAdmin`) or Compute Network Admin (`roles/compute.networkAdmin`) for the target proxy; DNS Administrator (`roles/dns.admin`) if using Cloud DNS |
| DNS authorization types | `FIXED_RECORD` (default for global Google-managed certificates), `PER_PROJECT_RECORD` |
| Prerequisite | A public DNS zone; FQDNs of domains you own; an existing load balancer (backends, health checks, backend service, URL map) |
| Certificate state | Can take several minutes to become `ACTIVE`; if not `ACTIVE` after several hours, recheck the CNAME record |

## Notes

- `gcloud compute target-https-proxies ...` flags are fully covered by the `gcp-compute` skill (reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-https-proxies/create).
- The `CNAME` must be the only resource record for that DNS name. A `TXT` record on the same name can block issuance or renewal; delete the `TXT` records or use per-project DNS authorization.
- Adding `@` in the Cloud DNS console DNS name field causes the record to fail. The `--name` value needs the trailing period. `PER_PROJECT_RECORD` and `FIXED_RECORD` differ only in the `--name` value of the record.
- `PER_PROJECT_RECORD` supports only certificates issued by Google Trust Services; Let's Encrypt CA is not supported.
- To cover both a root and wildcard domain, specify two certificate map entries (`example.com` and `*.example.com`). If certificates are attached both directly and through a certificate map, the proxy uses the map and ignores the direct ones.
- Detaching a certificate map: if SSL certificates are attached directly, the proxy resumes using them; if none are attached, the map cannot be detached until one is attached directly.
- The source clean-up also deletes the load balancer, the proxy (`gcloud compute target-https-proxies delete PROXY_NAME`), map entry, map, certificate, and DNS authorization. Those deletions are irreversible and deleting a proxy or certificate in use disrupts HTTPS traffic; try them on disposable resources first. Omitted forms: Console, Terraform, the `gcloud compute target-https-proxies list` command, the per-project describe output, and the concrete `transaction add` examples.
- The `certificates describe` output contains only the public certificate (`pemCertificate`), not a private key; Google-managed certificates need no private-key handling by you.
- Corrected from the official docs: `--type=[FIXED_RECORD]` (template brackets), `"type": "PER_PROJECT_RECORD" //optional` (comment in a JSON body) and the trailing commas in `"projects/PROJECT_ID/locations/global/dnsAuthorizations/AUTHORIZATION_NAME",` / `],`. The gcloud 593.0.0 help lists the `--type` values as `fixed-record, per-project-record, type-unspecified`.
- `gcloud dns record-sets transaction start` / `add` / `execute` share the transaction file given by `--transaction-file` (default `transaction.yaml`, per the gcloud 593.0.0 help), so run the three commands from the same directory.
- Source: https://docs.cloud.google.com/certificate-manager/docs/deploy-google-managed-dns-auth (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [domain-authorization.md](./domain-authorization.md)
- [deploy.md](./deploy.md)
- [core-components.md](./core-components.md)
- [certificate-selection-logic.md](./certificate-selection-logic.md)
