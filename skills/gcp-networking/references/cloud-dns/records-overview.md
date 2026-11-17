---
source: https://docs.cloud.google.com/dns/docs/records-overview
---

# DNS records overview

Lists the DNS record types Cloud DNS supports, including the Cloud DNS custom record type ALIAS (Preview). A record maps a DNS resource to a domain name and has a type, a time to live (TTL), and type-specific data.

## Signature / Usage

### ALIAS record export format

ALIAS records are exported to Cloud DNS-specific YAML files in this format, and can be imported from YAML in the same format. They are not supported in BIND files.

```yaml
kind: dns#resourceRecordSet
name: DNS Name
rrdatas: RR Data
ttl: TTL
type: ALIAS
```

### ALIAS TTL example

Records in a managed zone:

```text
example.com.    3600    SOA      ns.com.  admin.example.com. (...)
                86400   NS       ns.com.
                6000    ALIAS    test-cname.example.com.
test-cname      3000    CNAME    address.example.com.
address         5000    A        1.2.3.4
```

A query for the `A` record at `example.com` returns:

```text
QUESTION SECTION
example.com.                  A

ANSWER SECTION
example.com.        3000      A      1.2.3.4
```

The TTLs encountered are 6000 (ALIAS), 3000 (CNAME), and 5000 (A); the smallest, 3000, is returned.

## Options / Props

### ALIAS behavior

| Aspect | Behavior |
|---|---|
| Availability | Preview; Cloud DNS public zones only; configure with gcloud CLI or Cloud DNS API, not the console |
| Where allowed | Zone apex only; answers only `A` / `AAAA` queries; also called ANAME record or CNAME flattening |
| Resolution | Cloud DNS name servers resolve the target via Google's recursive resolvers and return synthesized `A` / `AAAA` records; multiple addresses are returned in randomized order; EDNS Client Subnet is not used |
| TTL | Smallest of the ALIAS TTL and the TTLs met while resolving; never greater than the configured TTL |
| Errors | Target resolution error (such as `NXDOMAIN`, `REFUSED`) returns `SERVFAIL`; `NODATA` returns `NODATA` |
| DNSSEC | Not compatible; you cannot enable DNSSEC on a zone with ALIAS records |
| Logging | Optional query-log field `alias_query_response_code` (`NoError` = success); `qtype` stays `A` / `AAAA` |

### Supported record types

| Type | Notes |
|---|---|
| `A` / `AAAA` | IPv4 dotted decimal / IPv6 hexadecimal address, for example `192.0.2.91`, `2001:db8::8bd:1002` |
| `ALIAS` | Preview; see above |
| `CAA` | Authorized certificate authorities; enabling DNSSEC is recommended in public zones (not enabled by default) |
| `CNAME` | Alias for another name; see CNAME chasing |
| `DNSKEY` | DNSSEC public key; can only be added in a public, DNSSEC-enabled zone in the `Transfer` state; ZSK and KSK are auto-generated when DNSSEC is enabled |
| `DS` | DNSSEC key fingerprint for a secure delegated zone; public zones only; does not activate DNSSEC unless DNSSEC is enabled and activated for the zone |
| `HTTPS` / `SVCB` | Service binding records; SvcPriority `0` for aliases, `1-65535` for service descriptions |
| `IPSECKEY` | IPsec gateway data and public keys (RFC 4025) |
| `MX` | Preference number plus mail server name; the name must end with a dot; `0` is the lowest preference |
| `NAPTR` | Name authority pointer rules (RFC 3403) |
| `NS` | Authoritative name servers; wildcard `NS` not supported; managed private zones don't support custom `NS` record sets |
| `PTR` | Canonical name for reverse lookups |
| `SOA` | Created with the zone; can be modified (for example the serial number) |
| `SPF` | Deprecated; use `TXT` records starting with `v=spf1` |
| `SRV` | Priority, weight, port, and host (RFC 2782) |
| `SSHFP` | SSH fingerprints for validating SSH server keys |
| `TLSA` | DANE certificate association; only use if DNSSEC is enabled for the zone |
| `TXT` | Each string is at most 255 characters (split longer data into 255-byte quoted strings); each `TXT` record has a 1000-character limit, contact Google Cloud support to raise it |

## Notes

- Supported record types: Wildcard records are supported for all types except `NS`.
- Starting January 5, 2027, Cloud DNS limits responses to queries for record type `ANY`: authoritative name servers return only one existing record set (such as `A` or `AAAA`) instead of all. Update monitoring scripts, health checks, and provisioning pipelines to query explicit types.
- ALIAS records are specific to Cloud DNS; clients see a standard `A` or `AAAA` record. An incorrect ALIAS target can break public records or return undesired IPs.
- Google Cloud DNS, not Cloudflare DNS.
- Source: https://docs.cloud.google.com/dns/docs/records-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- The source has no gcloud command; the record management commands are in https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/create.

## Related

- [dnssec.md](./dnssec.md)
- [routing-policies-overview.md](./routing-policies-overview.md)
- [overview.md](./overview.md)
