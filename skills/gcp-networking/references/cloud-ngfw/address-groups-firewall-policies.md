---
source: https://docs.cloud.google.com/firewall/docs/address-groups-firewall-policies
---

# Address groups for firewall policies

An address group holds multiple IP addresses and/or CIDR ranges and can be referenced by many rules in Cloud NGFW firewall policies (and Cloud Armor security policies). Updates to the group propagate automatically to every resource that references it.

## Signature / Usage

### Create an address group

Adapted (not in the official docs): `--location=global` is added because the help example omits the location and gcloud 593.0.0 then fails with "Failed to find attribute [location]" (use a region for a regional address group).

```bash
gcloud network-security address-groups create my-address-group \
    --type=IPV4 --capacity=100 --description="optional description" \
    --location=global
```

## Options / Props

### Specifications

| Item | Value |
|---|---|
| Identifier | `<containerType>/<containerId>/locations/<location>/addressGroups/<address-group-name>`, for example `projects/myproject/locations/global/addressGroups/example-address-group` |
| Container type | `organization` or `project` |
| Location | `global` or regional (such as `europe-west`) |
| Name | 1-63 characters, alphanumeric only, must not start with a number |
| Type | IPv4 or IPv6, not both; can't be changed later |
| Capacity | Required at creation; can't be changed later. Maximum varies by product. |
| `purpose` | Must be `CLOUD_ARMOR` when used with Cloud Armor |
| Max capacity (purpose not `CLOUD_ARMOR`) | 1,000 IP addresses |

### Scopes

| Scope | Use | Usable in |
|---|---|---|
| Project-scoped | Your own list of IPs for a project or network (container type always `project`) | Global and regional network firewall policies only |
| Organization-scoped | Central list for high-level rules (container type always `organization`) | Hierarchical, global network and regional network firewall policies |

### IAM

| Task | Role | Permissions |
|---|---|---|
| Create and manage address groups | Compute Network Admin (`roles/compute.networkAdmin`) | `networksecurity.addressGroups.*` |
| Discover and view address groups | Compute Network User (`roles/compute.networkUser`) | `networksecurity.addressGroups.list`, `networksecurity.addressGroups.get`, `networksecurity.addressGroups.use` |

## Notes

- Scopes: An address group is project-scoped or organization-scoped, not both.
- The capacity of an address group is added to the total attribute count of the firewall policy using it, so set capacity to a suitable value.
- If an address group referenced by a rule doesn't exist, the address group filter is removed from the rule.
- For both scopes, the address group location must match the firewall policy location.
- A custom role with equivalent permissions can replace Compute Network Admin.
- Address groups are Essentials-tier features of Cloud NGFW.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/address-groups/create (gcloud 593.0.0 help); the source page has no code block.
- Adapted from the official docs: the help example omitted `--location`, which gcloud 593.0.0 requires for address groups. The full `network-security` flag list is in the machine-generated gcloud pages of this skill.
- Source: https://docs.cloud.google.com/firewall/docs/address-groups-firewall-policies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [fqdn-objects-overview.md](./fqdn-objects-overview.md)
- [ngfw-tiers.md](./ngfw-tiers.md)
- [quotas.md](./quotas.md)
