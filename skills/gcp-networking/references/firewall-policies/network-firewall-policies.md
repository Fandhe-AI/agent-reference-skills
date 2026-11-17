---
source: https://docs.cloud.google.com/firewall/docs/network-firewall-policies
---

# Global network firewall policies

Global network firewall policies consolidate multiple rules into a single container object defined in a project and applied to VPC networks through associations.

## Signature / Usage

### Associate a policy with a network (example)

```bash
gcloud compute network-firewall-policies associations create \
    --firewall-policy=my-policy --network=my-network \
    --name=my-association --global-firewall-policy
```

### Add a rule (example)

Adapted (not in the official docs): `--layer4-configs=tcp:80` and `--src-ip-ranges=192.0.2.0/24` are added because gcloud 593.0.0 rejects the help example ("argument --layer4-configs: Must be specified") and an ingress rule needs a source range or secure tag; replace the documentation range with your own source range.

```bash
gcloud compute network-firewall-policies rules create 10 \
  --firewall-policy=my-policy --action=allow \
  --layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24 \
  --description="example rule" --global-firewall-policy
```

## Options / Props

### Specifications

| Specifications |
|---|
| Container resource for firewall rules, defined within a project; rules can be added, updated and deleted after creation. |
| To apply rules to a VPC network, associate the policy with it. One policy can be associated with multiple networks, but the policy and the networks must belong to the same project. |
| Each VPC network can be associated with only one global network firewall policy. |
| A policy not associated with any network has no effect (an unassociated policy). |
| Once associated, existing rules and any later changes are enforced against applicable resources in the associated networks. |
| Rules are enforced together with other firewall rules in the order described in [firewall-policies-rule-eval-order.md](./firewall-policies-rule-eval-order.md). |
| Layer 7 inspection (URL filtering, intrusion prevention): use the `apply_security_profile_group` action with the name of a security profile group; matched traffic is transparently forwarded to the firewall endpoint. |

### Global network policy rules vs VPC firewall rules

| | Global network firewall policy rules | VPC firewall rules |
|---|---|---|
| Priority number | Must be unique within a policy | Duplicate priorities allowed |
| Service accounts as targets | Yes | Yes |
| Service accounts as sources (ingress only) | No | Yes |
| Tag type | Secure tag | Network tag |
| Name and description | Policy name, policy and rule description | Rule name and description |
| Batch update | Yes (policy clone, edit, replace) | No |
| Reuse | Yes | No |
| Quota | Attribute count, based on total complexity of each rule in the policy | Rule count; complex and simple rules have the same quota impact |

## Notes

- Predefined rules: Cloud NGFW adds predefined rules with the lowest priority to a new policy; connections matching no explicit rule are passed down to lower-level policies or network rules.
- Disassociating or replacing a policy association changes which rules protect a network and can break connectivity; try it on a disposable network first.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/associations/create and .../network-firewall-policies/rules/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Regional network firewall policies are described at https://docs.cloud.google.com/firewall/docs/regional-firewall-policies.
- Adapted from the official docs: the help example for `network-firewall-policies rules create` omitted the required `--layer4-configs` and, for an ingress rule, `--src-ip-ranges` / `--src-secure-tags`; `--layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24` was added.
- Source: https://docs.cloud.google.com/firewall/docs/network-firewall-policies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-policies-overview.md](./firewall-policies-overview.md)
- [firewall-policies-rule-details.md](./firewall-policies-rule-details.md)
- [firewall-policies.md](./firewall-policies.md)
