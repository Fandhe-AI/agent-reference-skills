---
source: https://docs.cloud.google.com/firewall/docs/firewall-policies-overview
---

# Firewall policies and rules

A firewall rule in Cloud Next Generation Firewall (Cloud NGFW) allows or denies traffic within a Virtual Private Cloud (VPC) network based on defined criteria. A Cloud NGFW firewall policy groups several firewall rules so they can be updated together, controlled by IAM roles. This page gives an overview of the policy types and of ingress / egress rules.

## Signature / Usage

### Create a hierarchical firewall policy (example)

```bash
gcloud compute firewall-policies create --short-name=my-policy \
    --folder=123456789
```

## Options / Props

### Firewall policy types

| Type | Scope | Details page |
|------|-------|--------------|
| Hierarchical firewall policies | Policy object that can apply to many VPC networks in one or more projects; associated with an entire organization or individual folders | [firewall-policies.md](./firewall-policies.md) |
| Global network firewall policies | Applies to all regions of a VPC network | [network-firewall-policies.md](./network-firewall-policies.md) |
| Regional network firewall policies | Applies to a specific region of a VPC network | https://docs.cloud.google.com/firewall/docs/regional-firewall-policies |
| Regional system firewall policies | Like regional network firewall policies but managed by Google | (below) |

### Regional system firewall policies

- Rules are evaluated immediately after hierarchical firewall policy rules (see [firewall-policies-rule-eval-order.md](./firewall-policies-rule-eval-order.md)).
- You cannot modify a rule, except to enable or disable firewall rule logging.
- Google Cloud creates one in a region of a VPC network when a Google service requires rules in that region. More than one can be associated with a region of a network.
- You are not charged for the evaluation of rules in regional system firewall policies.

### Rule direction

| Direction | Targets / behavior |
|-----------|--------------------|
| Ingress | Inbound packets arriving at network interfaces of VM instances, and managed Envoy proxies that power internal Application Load Balancers and internal proxy Network Load Balancers (including application layer inspection for cross-region internal Application Load Balancers). A `deny` ingress rule blocks incoming connections; a higher priority `allow` rule makes the firewall ignore lower priority `deny` rules for the same traffic. |
| Egress | Outbound traffic sent from a target resource such as a VM network interface to a destination. An `allow` egress rule lets an instance send traffic to the destinations in the rule; a high priority `deny` rule blocks it and takes precedence over lower priority `allow` rules. |

## Notes

- Regular VPC networks support firewall rules in hierarchical, global network and regional network firewall policies, and VPC firewall rules. All are programmed as part of the Andromeda network virtualization stack.
- VPC networks that use certain network profiles restrict the firewall policies and rule attributes you can use. For RoCE VPC networks see https://docs.cloud.google.com/firewall/docs/firewall-for-roce instead of this page.
- An automatically created default network includes pre-populated VPC firewall rules that allow ingress for certain traffic (see [firewalls.md](./firewalls.md)).
- Google Cloud also blocks or limits certain kinds of traffic regardless of rules (see [firewalls.md](./firewalls.md)).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/create (gcloud 593.0.0 help). The full flag list for `gcloud compute ...` is in the `gcp-compute` skill.
- Clarified from the official docs: managed Envoy proxies of internal Application Load Balancers and internal proxy Network Load Balancers are protected only by global and regional network firewall policies; the Cloud NGFW page (https://docs.cloud.google.com/firewall/docs/about-firewalls, retrieved 2026-11-17) lists hierarchical firewall policies and VPC firewall rules as "Not supported" for them, and Enterprise-tier regional network policies as not supported.
- Source: https://docs.cloud.google.com/firewall/docs/firewall-policies-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-policies.md](./firewall-policies.md)
- [network-firewall-policies.md](./network-firewall-policies.md)
- [firewall-policies-rule-details.md](./firewall-policies-rule-details.md)
- [firewall-policies-rule-eval-order.md](./firewall-policies-rule-eval-order.md)
- [firewalls.md](./firewalls.md)
