---
source: https://docs.cloud.google.com/firewall/docs/ngfw_tiers
---

# Cloud NGFW tiers

Cloud NGFW features are grouped into three billing tiers: Essentials, Standard and Enterprise. You don't choose or subscribe to a tier; you enable features in firewall rules and are charged for the tiers of features that evaluate traffic.

## Signature / Usage

### Create a rule in a global network firewall policy

Features of any tier are enabled per rule. The source page has no code block; the gcloud help shows the generic rule-creation command (the example sets no tiered feature).

Adapted (not in the official docs): `--layer4-configs=tcp:80` and `--src-ip-ranges=192.0.2.0/24` are added because gcloud 593.0.0 rejects the help example ("argument --layer4-configs: Must be specified") and an ingress rule needs a source range or secure tag; replace the documentation range with your own source range.

```bash
gcloud compute network-firewall-policies rules create 10 \
  --firewall-policy=my-policy --action=allow \
  --layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24 \
  --description="example rule" --global-firewall-policy
```

## Options / Props

### Features by tier

| Feature | Tier |
|---|---|
| Stateful inspection | Essentials |
| Secure tags | Essentials |
| Address groups | Essentials |
| VPC firewall rules | Essentials |
| FQDN objects | Standard |
| Geolocation objects | Standard |
| Threat intelligence (Google Threat Intelligence lists) | Standard |
| Intrusion detection and prevention service | Enterprise |
| Advanced malware sandbox | Enterprise |
| URL filtering service | Enterprise |
| TLS inspection | Enterprise |

### Charging

| Tier | What is charged |
|---|---|
| Essentials | Foundational features (see Pricing page). |
| Standard | Only north-south traffic (VM instances to internet) evaluated by Standard features. |
| Enterprise | North-south traffic, east-west traffic (within a VPC network) and traffic targeting supported internal load balancers. Plus an hourly charge per deployed firewall endpoint and a per-gigabyte charge for inspected traffic. |

## Notes

- This page says capabilities of any tier can be applied to hierarchical, global network and regional network firewall policies; the intrusion prevention and URL filtering pages name only hierarchical and global network firewall policies for Layer 7 inspection rules (see the Source inconsistency line below).
- Essentials: secure tags (centrally managed, unique IDs, strict IAM control); address groups (named set of IPs / ranges reusable in rules); VPC firewall rules can use network tags and service accounts.
- Standard: FQDN objects (domain names instead of IPs), geolocation objects, Google Threat Intelligence lists (Google-maintained IP collections of threat actors or systems).
- Enterprise: signature-based intrusion detection and prevention with TLS interception and decryption; Advanced malware sandbox (WildFire) with TLS interception (inline ML in the data plane, or upload to the sandbox cloud); URL filtering with TLS inspection (operates at the application layer, whereas FQDN filtering sees only the resolved IP at the network layer; the URL filters match the domain name and SNI, see the Source inconsistency line below).
- Enterprise Layer 7 inspection features don't support inspecting egress traffic from serverless workloads.
- Firewall rules logging is available for rules in all tiers.
- When one rule uses features from multiple tiers, traffic is billed at the highest tier used (for example Standard + Enterprise features are billed at the Enterprise rate). Traffic flows aren't charged twice even if evaluated by multiple rules; charges apply whether the rule allows or denies. Prices are not copied here; see https://cloud.google.com/firewall/pricing.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/rules/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Adapted from the official docs: the help example for `network-firewall-policies rules create` omitted the required `--layer4-configs` and, for an ingress rule, `--src-ip-ranges` / `--src-secure-tags`; `--layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24` was added.
- Source inconsistency: this tiers page says URL filtering inspects "the full URL path" and can block individual sub-pages, but the URL filtering overview (https://docs.cloud.google.com/firewall/docs/about-url-filtering, retrieved 2026-11-17) says the matcher strings are matched "against the domain name and SNI of the HTTP(S) message" (the HTTP host header and the TLS SNI). Do not rely on path-level blocking without checking the URL filtering pages.
- Source inconsistency: this tiers page says "You can apply firewall capabilities from any tier to hierarchical firewall policies, global network firewall policies, and regional network firewall policies", but the intrusion prevention overview (https://docs.cloud.google.com/firewall/docs/about-intrusion-prevention, retrieved 2026-11-17) and the URL filtering overview (https://docs.cloud.google.com/firewall/docs/about-url-filtering, retrieved 2026-11-17) say "You can use hierarchical firewall policies and global network firewall policies to configure firewall policy rules with Layer 7 inspection". Plan Enterprise Layer 7 rules in hierarchical or global network firewall policies.
- Source: https://docs.cloud.google.com/firewall/docs/ngfw_tiers (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-firewalls.md](./about-firewalls.md)
- [fqdn-objects-overview.md](./fqdn-objects-overview.md)
- [address-groups-firewall-policies.md](./address-groups-firewall-policies.md)
- [tags-firewalls-overview.md](./tags-firewalls-overview.md)
