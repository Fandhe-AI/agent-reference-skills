---
source: https://docs.cloud.google.com/firewall/docs/firewall-policies-rule-eval-order
---

# Evaluation order for firewall policies and rules

How Cloud NGFW orders evaluation of hierarchical, regional system, VPC, global network and regional network rules in a regular VPC network, controlled by the network firewall policy enforcement order.

## Signature / Usage

### Change the enforcement order

Use `networks.patch` and set `networkFirewallPolicyEnforcementOrder`, or:

```bash
gcloud compute networks update VPC_NETWORK_NAME \
    --network-firewall-policy-enforcement-order=ENFORCEMENT_ORDER
```

## Options / Props

### Enforcement orders

| Step | `AFTER_CLASSIC_FIREWALL` (default) | `BEFORE_CLASSIC_FIREWALL` |
|------|------------------------------------|---------------------------|
| 1 | Hierarchical firewall policies | Hierarchical firewall policies |
| 2 | Regional system firewall policies | Regional system firewall policies |
| 3 | VPC firewall rules | Global network firewall policies |
| 4 | Global network firewall policies | Regional network firewall policies |
| 5 | Regional network firewall policies | VPC firewall rules |
| 6 | Implied actions | Implied actions |

### Per-step behavior

| Per-step behavior |
|---|
| Ingress rules apply to new-connection packets received by a target (VM network interfaces; managed Envoy proxies of internal Application Load Balancers and internal proxy Network Load Balancers). Egress rules apply to new-connection packets a VM interface sends. |
| In each step: disregard rules whose targets do not match; disregard rules not matching direction; evaluate the rest from highest to lowest priority until a rule matches or none do. |
| Hierarchical: organization policy first, then folder policies from top-level folder down. Actions: `allow`, `deny`, `apply_security_profile_group` (decision depends on the security profile), `goto_next` (next folder policy or next step). No match = implied `goto_next`. |
| Regional system: actions `allow`, `deny`, `goto_next` (next system policy by association priority, or next step). |
| VPC firewall rules: one or two rules may match; if two, same priority but different actions, and `deny` is enforced. No match = implied `goto_next`. |
| Global network: `allow`, `deny`, `apply_security_profile_group`, `goto_next` (to regional network step). |
| Regional network: only those associated with the target's region and network; `allow`, `deny`, `goto_next`. |

### Implied actions (last step)

| Direction / target | Implied action |
|--------------------|----------------|
| Ingress, VM network interface | `deny` |
| Ingress, forwarding rule of internal Application Load Balancer or internal proxy Network Load Balancer | `allow` |
| Egress | `allow` |

## Notes

- Hierarchical and regional system policies are always evaluated before any other rules.
- Changing the enforcement order changes which rules win on a network and can break or open connectivity; try it on a disposable network first.
- Effective rules: view all rules applied to a network (hierarchical, VPC, global and regional) at https://docs.cloud.google.com/firewall/docs/manage-global-firewall-policies#effective-firewall-rules, or for a VM interface (ordered from organization down to network; only rules applying to that interface), and for a region at https://docs.cloud.google.com/firewall/docs/manage-regional-firewall-policies#effective-firewall-rules.
- The source also shows flow diagrams (omitted). The full flag list for `gcloud compute networks update` is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/update).
- Clarified from the official docs: managed Envoy proxies of internal Application Load Balancers and internal proxy Network Load Balancers are protected only by global and regional network firewall policies; the Cloud NGFW page (https://docs.cloud.google.com/firewall/docs/about-firewalls, retrieved 2026-11-17) lists hierarchical firewall policies and VPC firewall rules as "Not supported" for them, and Enterprise-tier regional network policies as not supported.
- Source: https://docs.cloud.google.com/firewall/docs/firewall-policies-rule-eval-order (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-policies-overview.md](./firewall-policies-overview.md)
- [firewall-policies-rule-details.md](./firewall-policies-rule-details.md)
- [firewalls.md](./firewalls.md)
