---
source: https://docs.cloud.google.com/vpc/docs/bring-your-own-ip
---

# Bring your own IP addresses

BYOIP lets you provision and use your own public IP addresses for Google Cloud resources. After import, Google Cloud manages them like Google-provided addresses, except they are available only to you and there are no charges for idle or in-use addresses.

## Signature / Usage

The workflow: create a public advertised prefix (PAP), create one or more public delegated prefixes (PDPs) from it (assigning addresses to a project and scope: one region or global), then use the addresses with supported resources. The source page has no code; the examples below are from the gcloud 593.0.0 help EXAMPLES.

```bash
gcloud compute public-advertised-prefixes create \
    my-v2-public-advertised-prefix --range=120.120.10.0/24 \
    --dns-verification-ip=120.120.10.15 --pdp-scope=REGIONAL
```

Adapted (not in the official docs): the PDP is created from the PAP of the previous command (`my-v2-public-advertised-prefix`, not the help example's `my-pap`) and is regional (`--region=REGION`, not `--global`), because that PAP was created with `--pdp-scope=REGIONAL`.

```bash
gcloud compute public-delegated-prefixes create \
    my-public-delegated-prefix --public-advertised-prefix=my-v2-public-advertised-prefix \
    --range=120.120.10.128/27 --region=REGION
```

## Options / Props

### Configurations

| Configuration | Regional (v2) | Regional internal (v2) | Regional (v1) | Global (v1) |
|---|---|---|---|---|
| Availability | Recommended regional configuration | Used for internal IPv6 addresses | Not recommended for new regional configurations | Project must be added to an allowlist |
| PAP provisioning | About 2 weeks | Immediate | About 4 weeks | About 4 weeks |
| PDP provisioning | A few minutes | Immediate | 4 weeks (can overlap with PAP) | 4 weeks (can overlap with PAP) |
| Sub-prefix provisioning | A few minutes | Immediate | A few minutes | A few minutes |
| BGP announcement | Not automatic; you announce or withdraw | Not announced | Automatic after provisioning | Automatic after provisioning |
| Access type | External | Internal | External | External |
| Network Service Tiers | Premium; Standard (Preview) | Premium | Premium | Premium |
| IP stack | Premium: IPv4, IPv6 (only external passthrough Network Load Balancers and subnets that exclusively host VMs); Standard: IPv4 | IPv6 | IPv4 | IPv4 |

### IPv4 prefix lengths

| Configuration | Regional (v2) Premium | Regional (v2) Standard (Preview) | Regional (v1) | Global (v1) |
|---|---|---|---|---|
| Public advertised prefix | `/16` to `/24` | `/16` to `/23` | `/16` to `/24` | `/16` to `/24` |
| Public delegated prefix (top-level) | `/16` to `/28`; same size or smaller than the PAP | `/17` to `/24`; must be smaller than the PAP | `/17` to `/28`; must be smaller than the PAP | `/17` to `/28`; must be smaller than the PAP |
| Sub-prefix | Same size or smaller than parent PDP; minimum size `/28` | Same | Same | Same |

### IPv6 prefixes

| Sub-prefix mode | Prefix length | Access type |
|---|---|---|
| Delegation (`--mode=DELEGATION`) | Same or longer than parent PDP; difference at most 24; valid `/32`, `/40`, `/48`, `/56` | External, Internal |
| External forwarding rules (`--mode=EXTERNAL_IPV6_FORWARDING_RULE_CREATION`) | Difference at most 24; valid `/32`, `/40`, `/48`, `/56`, `/64`, `/72` | External |
| External subnet ranges (`--mode=EXTERNAL_IPV6_SUBNETWORK_CREATION`) | Difference at most 24; valid `/32`, `/40`, `/48`, `/56` | External |
| Internal subnet ranges (`--mode=INTERNAL_IPV6_SUBNETWORK_CREATION`) | Difference at most 24; valid `/32`, `/40`, `/48`, `/56` | Internal |
| Setting: external forwarding rule allocatable prefix length | Must be smaller than the sub-prefix; difference at least 8 and at most 32; valid `/48`, `/56`, `/64`, `/72`, `/80`, `/88`, `/96`; default `/96` if the parent sub-prefix is `/64` or `/72`, otherwise `/64` | |

### Limitations

| Limitation |
|------------|
| Provisioning takes multiple weeks and cannot be accelerated. |
| A PDP can be sub-delegated up to three times from a PAP. |
| IPv4 addresses created from a PDP come as a group of `/17` to `/28`; no single `/32`. |
| BYOIP prefixes must not overlap privately used public IP ranges in your subnets; do not use any part as a subnet range. |
| No global IPv6 BYOIP addresses; IPv6 BYOIP prefixes support regional addresses only. |
| BYOIP addresses cannot be moved between projects. |
| The PDPs-per-PAP quota limits PDP count; create few large PDPs and sub-delegate. |
| Global PDPs require a PAP used only for global PDPs and a project on the allowlist (file a support case). |

### Resource support

| Case | Support |
|------|---------|
| Cloud VPN | IPv4 BYOIP as the peer IP of a Classic VPN tunnel: yes. As the peer of an HA VPN tunnel: no. As the external IP of Classic VPN or HA VPN gateways: no. |
| Shared VPC | Create in the host project and use in service projects; creating in service projects is not supported. |
| GKE | Usable for external forwarding rules with GKE ingress for external Application Load Balancers; GKE nodes and Pods do not support BYOIP. |
| Stateful MIGs | Support IPv4 BYOIP for static IPs on VM creation; MIGs that automatically allocate IPs do not. |
| IPv6, external sub-prefix | Mutually exclusive modes: forwarding rules for regional external passthrough Network Load Balancers / external protocol forwarding, or external subnet ranges (VMs only). |
| IPv6, internal sub-prefix | Assign internal GUA ranges to subnets. |

## Notes

- Warning (source): Google does not support overlapping BYOIP route announcements. For example, importing `203.0.112.0/23` is unsupported if that prefix or a subset such as `203.0.112.0/24` is advertised outside Google; matching or mismatched announcements can cause unexpected routing and packet loss.
- Ownership of IPv4 and external IPv6 prefixes is verified with ROA and reverse DNS validation; announcement then takes about two to four weeks. Internal access IPv6 prefixes are ready immediately after ROA validation.
- For IPv6, the top-level PDP must be in delegation mode and divided into non-delegation sub-prefixes before use. v2 PAPs set network tier (IPv4) or access type (IPv6); PDPs inherit them. IPv4 PDPs have no access type.
- Enhanced IP address allocation (individual addresses from a PDP) applies to v2 IPv4 PDPs and sub-prefixes created after December 13, 2025. PAPs created before July 10, 2023 can contain both regional and global PDPs; later ones only one kind.
- All addresses in a PDP are usable (no network or broadcast address); a `/28` yields 16 address resources. Use requires `compute.addresses.*` (regional) or `compute.globalAddresses.*` (global).
- Compute Public IP Admin (`roles/compute.publicIpAdmin`) can configure PAPs and PDPs in its own project, delegate and revoke sub-prefixes to projects in the organization, and delete PDPs.
- Port scans of a BYOIP address can show open ports because global BYOIP addresses are served by the Google Front End; traffic to those ports is dropped and not logged.
- Quotas: see VPC quotas and limits (https://docs.cloud.google.com/vpc/docs/quota). Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/public-advertised-prefixes/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/public-delegated-prefixes/create (gcloud 593.0.0 help); the full flag list is in the `gcp-compute` skill.
- Source inconsistency: the limitation "the group of addresses can have length /17 to /28" for IPv4 addresses created from a public delegated prefix conflicts with the enhanced IP address allocation described on this page (individual addresses from a public delegated prefix) and with the Regional v2 prefix lengths `/16` to `/28`. Safe reading: apply the `/17` to `/28` group rule to the allocation mode that does not use enhanced allocation.
- Corrected from the official docs: the gcloud help example for `public-delegated-prefixes create` is `--public-advertised-prefix=my-pap ... --global`, which does not follow from the `public-advertised-prefixes create ... --pdp-scope=REGIONAL` example above it. The gcloud help defines `--pdp-scope` as "how child public delegated prefix will be scoped" (`GLOBAL` or `REGIONAL`), and this page states that PAPs created after July 10, 2023 contain only regional or only global PDPs, so the PDP uses the PAP's name and a region.
- Source: https://docs.cloud.google.com/vpc/docs/bring-your-own-ip (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [byoip-planning.md](./byoip-planning.md)
- [ip-addresses.md](./ip-addresses.md)
- [move-ip-address-different-project.md](./move-ip-address-different-project.md)
