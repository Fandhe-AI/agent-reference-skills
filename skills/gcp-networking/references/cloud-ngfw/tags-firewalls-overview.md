---
source: https://docs.cloud.google.com/firewall/docs/tags-firewalls-overview
---

# Secure tags for firewalls

Cloud NGFW rules use tags to specify sources and targets without depending on IP addresses. Two kinds exist: IAM-governed secure tags (Resource Manager tag keys and values) and network tags (plain strings on VM instances).

## Signature / Usage

### Create a rule in a global network firewall policy

Secure tags are referenced in rules of hierarchical, global network and regional network firewall policies (source secure tags on ingress, target secure tags on ingress or egress). The source page has no code block; the gcloud help has no secure-tag example, so this is its generic rule-creation example extended with the `--src-secure-tags` and `--target-secure-tags` flags that its synopsis lists.

Adapted (not in the official docs): `--layer4-configs=tcp:80` is added because gcloud 593.0.0 rejects the help example without it; `--src-secure-tags` and `--target-secure-tags` (`tagValues/TAG_VALUE_ID` form, as described in the flag help) replace the missing source range so the example shows secure tags.

```bash
gcloud compute network-firewall-policies rules create 10 \
  --firewall-policy=my-policy --action=allow \
  --layer4-configs=tcp:80 \
  --src-secure-tags=tagValues/TAG_VALUE_ID \
  --target-secure-tags=tagValues/TARGET_TAG_VALUE_ID \
  --description="example rule" --global-firewall-policy
```

## Options / Props

### Secure tag specifications

| Item | Value |
|---|---|
| Parent resource | Tag keys can be created under a project or an organization. |
| `purpose` | Must be `GCE_FIREWALL` to use a tag key with Cloud NGFW. |
| `purpose-data` | `network` followed by a single VPC network (same project for a project-parent key, same organization for an organization-parent key), or `organization=auto` (all VPC networks in the organization). |
| Mutability | `purpose` and `purpose-data` can't be changed after the tag key is created. |
| Values per key | Up to 1,000 unique tag values per tag key. |
| Tag values per network interface | Limit of 10 tag values that apply to each VM network interface; additional binding is blocked if more than 10 apply. Each tag value can be bound to an unlimited number of VMs. |
| One value per key per VM | For each tag key, only one of its tag values can be bound to an instance. |

### IAM roles

| Role | Capability |
|---|---|
| Tag Administrator (`roles/resourcemanager.tagAdmin`) | Create tag keys and manage values. Granted on the organization: keys with the organization as parent. Granted on the organization, a folder or a project: keys with a project as parent. |
| Tag User (`roles/resourcemanager.tagUser`) | Bind tag values to VM instances and use tag values in firewall rules. Same scoping as above for organization-parent and project-parent keys. |
| Compute Security Admin (`roles/compute.securityAdmin`) | Not required for Tag User holders, so operations teams can steer which rules apply to their VMs' interfaces without modifying the rules. |

### Secure tags vs network tags

| Attribute | Secure tag (`purpose-data` = VPC network) | Secure tag (`purpose-data` = organization) | Network tag |
|---|---|---|---|
| Parent resource | Project or organization | Project or organization | Project |
| Structure | Tag key with up to 1,000 values | Tag key with up to 1,000 values | Simple string |
| Access control | IAM | IAM | None |
| Hierarchical firewall policies | No | Yes | No |
| Global and regional network firewall policies | Yes | Yes | No |
| VPC firewall rules | No | No | Yes |
| Ingress sources in peered VPC networks | Yes (footnote) | Yes (footnote) | No |
| Ingress sources in other NCC hub VPC spokes | Yes (footnote) | Yes (footnote) | No |

Footnote: a source secure tag can identify interfaces in another VPC network when the tag key `purpose-data` specifies that network (or its parent organization) and the two networks are connected by VPC Network Peering or are VPC spokes on the same Network Connectivity Center hub.

## Notes

- Secure tag rules map tags to network interfaces, not IP addresses: a source tag on an ingress rule matches packets sent from the interface; a target tag matches packets received (ingress) or sent (egress) by the interface.
- Network tags can be used only in VPC firewall rules (sources of ingress rules; targets of ingress or egress rules). Resource Manager tags attached directly to Cloud NGFW resources are for governance (IAM, Organization Policy) and are not evaluated by rules.
- Before moving a project between organizations, detach tag keys whose `purpose-data` specifies an organization; otherwise the move errors.
- Secure tags can be bound to GKE clusters and node pools for use in network firewall policies, and used across peered networks.
- Workflow: grant tag roles, create the tag key and values, create a hierarchical or network firewall policy, create a rule with source / target tag values, then bind the tag value to the VM.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/rules/create (gcloud 593.0.0 help). Tag key and value creation uses Resource Manager commands described on the "Create and manage secure tags" page (https://docs.cloud.google.com/firewall/docs/use-tags-for-firewalls); full compute flags are in the `gcp-compute` skill.
- Adapted from the official docs: the help example for `network-firewall-policies rules create` omitted the required `--layer4-configs` and any source; `--layer4-configs`, `--src-secure-tags` and `--target-secure-tags` were added (tag value IDs are placeholders).
- Source: https://docs.cloud.google.com/firewall/docs/tags-firewalls-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-firewalls.md](./about-firewalls.md)
- [ngfw-tiers.md](./ngfw-tiers.md)
- [quotas.md](./quotas.md)
