---
source: https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/insights-categories-states
---

# Firewall Insights categories and states

Firewall Insights analyzes firewall rule configuration and usage with the `google.compute.firewall.Insight` insight type. This page describes insight categories, states, shadowed rules, deny rules with hits, overly permissive rules, and the machine learning predictions.

## Signature / Usage

Adapted (not in the official docs): added the required `INSIGHT_ID` positional argument and replaced the shell variables with literal values and upper-case placeholders.

```bash
gcloud recommender insights describe INSIGHT_ID \
    --insight-type=google.compute.firewall.Insight --project=PROJECT_ID \
    --location=global
```

## Options / Props

### Categories

| Category | Description | Insights |
|---|---|---|
| Configuration-based | Generated from how you configured rules | Shadowed rules |
| Log-based | Generated from Firewall Rules Logging and configuration | Overly permissive rules (allow rules with no hits; obsolete by adaptive analysis; with unused attributes; with overly permissive IP addresses or port ranges); deny rules with hits |

Severity per subtype: `medium` for shadowed rule insights, `high` for overly permissive rule insights.

### States

| State | Description |
|---|---|
| `ACTIVE` | Google continues to update content based on the latest information |
| `DISMISSED` | No longer shown on any active insight list; can be restored to `ACTIVE` on the Dismissed History page |

### Overly permissive rule insights

| Insight | Behavior |
|---|---|
| Allow rules with no hits | `allow` rules with no hits during the observation period; includes a machine learning prediction and similar rules in the same project |
| Allow rules obsolete based on adaptive analysis | Machine learning on the average hit count in the last six weeks plus recent hit counts; can appear after the first week even for a 12-month observation period; a recently enabled insight might need a week |
| Allow rules with unused attributes | Attributes such as IP address and port ranges not hit; includes the probability of a future hit |
| Allow rules with overly permissive IP address or port ranges | Suggests an alternate combination of IP ranges and ports based on actual usage |

## Notes

- Shadowed rules share attributes with higher or equal priority rules ("shadowing rules"). For policies assigned to a VPC network, a policy rule can be shadowed by a VPC rule in the same or another policy; evaluation follows the policy and rule evaluation order. Multiple tags from other rules shadowing a rule's tags are not identified. Worked examples: rule B (`10.10.0.0/24`, tcp:80, priority 1000) shadowed by rule A (`10.10.0.0/16`, same); rule C (tcp:80 and tcp:443 allow, priority 1000) shadowed by deny rules D and E (priority 900) combined; cross-folder policy and global network firewall policy (`AFTER_CLASSIC_FIREWALL`) variants.
- Overly permissive insights are accurate only if Firewall Rules Logging was enabled for the entire observation period; otherwise more rules could be affected. They evaluate TCP and UDP traffic only; a rule that also allows other protocols (for example ICMP) is still analyzed but attributes tied to other traffic are not.
- Machine learning predictions (allow rules with no hits, unused attributes) train on rules in the same organization; the Insight details panel shows the three most similar rules.
- Do not remove ranges for load balancer health checks or other Google Cloud functionality just because they show as unused.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/recommender/insights/describe (gcloud 593.0.0 help); the source page has no code. Replace `INSIGHT_ID` (from `gcloud recommender insights list`) and `PROJECT_ID` with real values.
- Corrected from the official docs: the help example `gcloud recommender insights describe --insight-type=${INSIGHT_TYPE} --project=${PROJECT} --location=${LOCATION}` omits the required `INSIGHT` positional argument (the SYNOPSIS is `gcloud recommender insights describe INSIGHT --insight-type=INSIGHT_TYPE --location=LOCATION ...`).
- Corrected from the official docs: the source example writes the enforcement order as `AFTER_CLASSIC_FIREWALLS`; the firewall policy enforcement order values are `AFTER_CLASSIC_FIREWALL` and `BEFORE_CLASSIC_FIREWALL` (https://docs.cloud.google.com/firewall/docs/firewall-policies-rule-eval-order, retrieved 2026-11-17), so the singular form is used.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/insights-categories-states (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-insights-overview.md](./firewall-insights-overview.md)
