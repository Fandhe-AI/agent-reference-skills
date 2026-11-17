---
source: https://docs.cloud.google.com/firewall/docs/firewall-policies
---

# Hierarchical firewall policies

Hierarchical firewall policies let you create and enforce a consistent firewall policy across an organization. They are assigned to the organization or to individual folders. Rules can allow, deny, or delegate evaluation to lower levels with `goto_next`. Lower-level rules cannot override a rule from a higher place in the resource hierarchy.

## Signature / Usage

### Create a policy and associate it with a folder (examples)

```bash
gcloud compute firewall-policies create --short-name=my-policy \
    --folder=123456789
```

```bash
gcloud compute firewall-policies associations create \
    --firewall-policy=123456789 --folder=987654321
```

### Create a rule (example)

Adapted (not in the official docs): `--layer4-configs=tcp:80` and `--src-ip-ranges=192.0.2.0/24` are added because gcloud 593.0.0 rejects the help example ("argument --layer4-configs: Must be specified") and an ingress rule needs a source range or secure tag; replace the documentation range with your own source range.

```bash
gcloud compute firewall-policies rules create 10 \
    --firewall-policy=123456789 --action=allow \
    --layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24 \
    --description=example-rule
```

## Options / Props

### Specifications

| Item | Behavior |
|------|----------|
| Where created | Organization and folder level. Creating a policy does not apply it. |
| Association | A policy can be associated with any resources in the organization; one policy can be associated with multiple resources; only one firewall policy can be associated with a resource. Not enforced until associated. |
| Swap | Swapping policies for a resource atomically swaps all rules applied to VMs under it. |
| Evaluation | Hierarchical: organization rules first, then first-level folders, and so on down to the folder containing the project. |
| `goto_next` action | Delegates evaluation to lower levels of the hierarchy. |
| Layer 7 | `apply_security_profile_group` action with a security profile group forwards matched traffic to a firewall endpoint (URL filtering, intrusion prevention). |
| Targets | Target networks (target resources) and target service accounts. Instance tags are not supported. |
| RDMA | Not supported on VPC networks that use an RDMA network profile (for example `RDMA_ROCE_POLICY`). |
| IP version | A rule includes either IPv4 or IPv6 ranges, not both. |
| Projects | Policies cannot be assigned to projects, only to the organization or folders. |
| Consistency | Eventually consistent; after moving projects or folders it can take a few minutes to apply. |

### Differences from global network firewall policy rules

- Hierarchical policies support target networks; global network policies do not.
- Hierarchical policies are organization-level resources; global network policies are project-level.
- Rules support secure tag keys as source / target secure tags (organization purpose).

### Policy names

Google Cloud generates a policy ID and you specify a short name. With `gcloud` you can reference the system-generated ID or the short name plus organization ID; with the API you must use the system-generated ID.

### Predefined rules

Cloud NGFW adds predefined rules with the lowest priority to a new policy; connections that match no explicit rule are passed down to lower-level policies or network rules.

## Notes

- Modifying rules: there is no batch update. To apply many changes atomically, clone the policy to a temporary policy, assign it to the same resources, edit the original, then assign the original back (see https://docs.cloud.google.com/firewall/docs/using-firewall-policies#clone-rules).
- Moving a policy: policies are parented by a folder or the organization; policies owned by a folder are deleted if the folder is deleted.
- Changes to the resource hierarchy take time to propagate. Do not change policy associations and the hierarchy simultaneously: if the old folder loses its association before networks under it have updated ancestry, those networks are briefly unprotected.
- Shared VPC: a VM interface in a host project network is governed by the hierarchical policy rules of the host project, not the service project, even if service projects are under a different folder.
- VPC Network Peering: each VM interface inherits the policies of its own VPC network's hierarchy (peered networks may belong to different organizations).
- Associating, swapping, moving or deleting policies and associations can break connectivity or remove protection; try it on a disposable folder first.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/create , .../firewall-policies/associations/create and .../firewall-policies/rules/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Adapted from the official docs: the help example for `firewall-policies rules create` omitted the required `--layer4-configs` and, for an ingress rule, `--src-ip-ranges` / `--src-secure-tags`; `--layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24` was added.
- Source: https://docs.cloud.google.com/firewall/docs/firewall-policies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-policies-overview.md](./firewall-policies-overview.md)
- [firewall-policies-rule-details.md](./firewall-policies-rule-details.md)
- [firewall-policies-rule-eval-order.md](./firewall-policies-rule-eval-order.md)
- [network-firewall-policies.md](./network-firewall-policies.md)
