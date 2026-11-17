---
source: https://docs.cloud.google.com/dns/docs/dnssec
---

# DNS Security Extensions (DNSSEC) overview

DNSSEC authenticates responses to domain name lookups. It does not provide privacy protection, but prevents attackers from manipulating or poisoning DNS responses. With DNSSEC enabled on a Cloud DNS zone, Cloud DNS automatically manages DNSKEY creation and rotation and signs zone data with RRSIG records.

## Signature / Usage

### List DNSSEC keys and DS records

Snippet taken from the `gcloud dns dns-keys list` help EXAMPLES (see Notes). This command prints the DS records for every key-signing key in the zone.

```bash
gcloud dns dns-keys list --zone=my_zone \
    --filter='type=keySigning' --format='value(ds_record())'
```

## Options / Props

### DNSSEC must be configured in three places

| Place | What is required |
|---|---|
| DNS zone | Enable DNSSEC for the zone; Cloud DNS manages DNSKEY records and RRSIG signing. |
| TLD registry (for `example.com`, `.com`) | A DS record that authenticates a DNSKEY record in your zone, added by activating DNSSEC at your domain registrar. |
| DNS resolver | A resolver that validates DNSSEC signatures (for example Google Public DNS or Verisign Public DNS) for full protection. |

### Related record types and operations (details are on the linked source pages)

| Topic | Notes |
|---|---|
| CAA records | Control which public CAs can issue certificates for the domain. |
| IPSECKEY records | Enable opportunistic encryption through IPsec tunnels. |
| SSHFP records | Let SSH clients validate SSH servers. |
| Leaving the `Transfer` state | Change the zone DNSSEC state from `Transfer` to `On`. |
| Delegating DNSSEC-signed subdomains | Enable DNSSEC for delegated subdomains. |
| Migration | Zones with DNSSEC active at the registry can be migrated to or from other DNS operators that support migration without breaking the chain of trust. |

## Notes

- Both the registrar and the registry must support DNSSEC for the TLD. If you cannot add a DS record through your registrar, enabling DNSSEC in Cloud DNS has no effect.
- If the registrar does not support DNSSEC for your TLD, you may be able to transfer the domain to one that does, then activate DNSSEC. If your domain is hosted by your registrar, the source recommends migrating the name servers to Cloud DNS before transferring to another registrar.
- Ordering and DS record changes at the registrar affect resolution: follow the enabling, transfer-state, and migration steps on the linked source pages (dnssec-config, dnssec-migrate) exactly; this page does not cover disabling DNSSEC.
- Google Cloud DNS, not Cloudflare DNS.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dns/dns-keys/list (gcloud 593.0.0 help); the `$` prompt is removed.
- Source: https://docs.cloud.google.com/dns/docs/dnssec (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [records-overview.md](./records-overview.md)
- [overview.md](./overview.md)
