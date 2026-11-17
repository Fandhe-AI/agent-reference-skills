---
source: https://docs.cloud.google.com/vpc/docs/byoip-planning
---

# Planning for bring your own IP addresses

Planning guidance for BYOIP deployments: who administers prefixes, how they are named, where they are provisioned, and how projects should be organized. Provisioning and deletion take multiple weeks, so plan ahead.

## Signature / Usage

The source page has no code. The example below is from the gcloud 593.0.0 help EXAMPLES; it follows the planning advice of using generic, stable names for each resource type.

```bash
gcloud compute public-advertised-prefixes create \
    my-public-advertised-prefix --range=120.120.10.0/24 \
    --dns-verification-ip=120.120.10.15
```

## Options / Props

### Example provisioning plan

| Prefix type | Prefix | Scope |
|---|---|---|
| Public advertised prefix | 203.0.113.0/24 | |
| Public delegated prefix | 203.0.113.0/28 | us-central1 |
| Public delegated prefix | 203.0.113.16/28 | us-east-4 |
| Public advertised prefix for global load balancers | 192.0.2.0/24 | |
| Public delegated prefix | 192.0.2.0/28 | global |

### Decisions to make

| Question | Guidance |
|----------|----------|
| Who administers BYOIP? | Typically a dedicated administrator or group, not the users who manage individual projects. Use IAM roles and permissions to distinguish who has privileges over PAPs and PDPs. |
| How are prefixes managed? | Manage centrally in a project of its own with its own Public IP Admin users and groups, separate from the projects that use the addresses. |
| How are prefixes named? | Every resource (PAP, PDP, sub-prefix) needs a name; names cannot be changed without deleting and recreating. Use generic names such as `pap-203-0-113-0-24`, `pdp-203-0-113-0-25`, `sub-203-0-113-0-28`. |
| Where are IPs provisioned? | Think of it as stocking IPs into regions or the global scope. Provisioning takes multiple weeks, so create PDPs long before they are needed. Moving a PDP requires complete deletion and recreation, which can take approximately eight weeks. Provision only the PDPs you are sure you need. |

### Project architecture

| Setup | How it works |
|-------|--------------|
| Organization | A dedicated `Public IP project` holds the PAP and PDPs; the organization's Public IP Admin creates the IP addresses in the project that needs them (for example `VPC project`). |
| Organization with Shared VPC | Create the addresses in the `Shared VPC host project`; host and service projects can use them. Creating addresses in a service project is not supported. |
| No organization | No separate administration project is possible; create the PAP and PDPs in the same project that needs the BYOIP addresses. |

## Notes

- Example provisioning plan: The remaining addresses are reserved for future use.
- Organizations are recommended for organization-level IAM and Shared VPC.
- This page says BYOIP provisions public IPv4 addresses; the BYOIP overview page also covers IPv6 prefixes.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/public-advertised-prefixes/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Source inconsistency: this page says provisioning and deletion take multiple weeks and moving a prefix can take approximately eight weeks, but the BYOIP overview (https://docs.cloud.google.com/vpc/docs/bring-your-own-ip, retrieved 2026-11-17) lists regional (v2) public delegated prefix and sub-prefix provisioning as "A few minutes" and regional internal (v2) provisioning as "Immediate". Safe reading: the multi-week figures describe the configurations that the overview also lists in weeks (public advertised prefix provisioning, and the v1 configurations).
- Source: https://docs.cloud.google.com/vpc/docs/byoip-planning (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bring-your-own-ip.md](./bring-your-own-ip.md)
- [move-ip-address-different-project.md](./move-ip-address-different-project.md)
