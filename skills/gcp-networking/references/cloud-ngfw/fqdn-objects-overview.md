---
source: https://docs.cloud.google.com/firewall/docs/fqdn-objects-overview
---

# Fully qualified domain name objects overview

Fully qualified domain name (FQDN) objects let firewall policy rules use domain names instead of IP addresses. Cloud NGFW periodically resolves them to IPs through Cloud DNS (response policies, VPC-scoped private zones, Compute Engine internal DNS names, public zones). FQDN objects are a Cloud NGFW Standard feature.

## Signature / Usage

### Create a rule in a global network firewall policy

The source page has no code block and the gcloud help has no FQDN example, so this is the help's generic rule-creation example. FQDN objects are set on a rule with `--src-fqdns` (only if DIRECTION is ingress) or `--dest-fqdns` (only if DIRECTION is egress), as the flag help describes; the help also says that either `--src-ip-ranges` or `--src-secure-tags` must be specified for INGRESS traffic.

Adapted (not in the official docs): `--layer4-configs=tcp:80` and `--src-ip-ranges=192.0.2.0/24` are added because gcloud 593.0.0 rejects the help example ("argument --layer4-configs: Must be specified") and an ingress rule needs a source range or secure tag; replace the documentation range with your own source range.

```bash
gcloud compute network-firewall-policies rules create 10 \
  --firewall-policy=my-policy --action=allow \
  --layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24 \
  --description="example rule" --global-firewall-policy
```

## Options / Props

### Resolution behavior and limits

| Item | Behavior |
|---|---|
| Resolution order | Follows Cloud DNS VPC name resolution order in the VPC network containing the rule's targets. |
| CNAME chasing | Supported. |
| IPs per FQDN object | Max 32 IPv4 and 32 IPv6 addresses; more than that are truncated to the first 32 of each. |
| Ignored when | `NXDOMAIN` answer; no IP address in the answer; Cloud DNS server unreachable. The rest of the rule is still programmed if possible. |
| VPC restriction | The network can't use an outbound server policy with an alternative name server. |
| TTL | Avoid DNS `A` records with TTL under 90 seconds. |

### Domain name format

| Rule | Detail |
|---|---|
| Labels | At least two labels, each 1-63 characters, joined by a dot. The source also gives a label regular expression, which is not usable as written (see Notes). |
| Not supported | Wildcards (`*.example.com.`) and top-level / root domains (`.org`). |
| IDNs | Supported in Unicode or Punycode; Unicode is converted to Punycode; the 1-63 limit applies after conversion. |
| Total length | Encoded FQDN can't exceed 255 bytes (octets). |
| Equivalents | Names differing only by a terminal dot are equivalent and not supported together in the same rule. |

## Notes

- If two FQDN objects resolve to the same IP, packets match the higher-priority rule. Example: rule 1 priority `100` allow ingress from `example1.com`, rule 2 priority `200` from `example2.com`; both resolve to the same IP, so traffic from both matches rule 1.
- DNS answers can vary by client location, be highly variable under DNS-based load balancing, or contain more than 32 IPv4 / IPv6 addresses. Cloud NGFW queries in each region containing the VM interface, so programmed IPs may not cover all addresses. Most Google domains such as `googleapis.com` are affected; use IP addresses or address groups instead.
- FQDNs can be combined with other source / destination parameters; see the rule-details page for permitted combinations.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/rules/create (gcloud 593.0.0 help). Full flags are in the `gcp-compute` skill. DNS resolution itself is Google Cloud DNS, not Cloudflare DNS.
- Adapted from the official docs: the help example for `network-firewall-policies rules create` omitted the required `--layer4-configs` and any source; `--layer4-configs=tcp:80` and `--src-ip-ranges=192.0.2.0/24` were added (the flag help: "Either --src-ip-ranges or --src-secure-tags must be specified for INGRESS traffic").
- Source inconsistency: the source says each label "must match a regular expression that includes only these characters: `[a-z]([-a-z0-9][a-z0-9])?.`" and also that each label "must have a length of 1-63 characters". As a regular expression this has no repetition, so it matches at most three characters plus one more (the trailing `.` matches any character), and it cannot match a label such as `example`. Read it as the allowed characters only (lowercase letters, digits and hyphens, starting with a letter), not as a validation pattern.
- Source: https://docs.cloud.google.com/firewall/docs/fqdn-objects-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [address-groups-firewall-policies.md](./address-groups-firewall-policies.md)
- [ngfw-tiers.md](./ngfw-tiers.md)
- [quotas.md](./quotas.md)
