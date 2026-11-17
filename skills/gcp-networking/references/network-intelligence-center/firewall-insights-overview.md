---
source: https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/overview
---

# Firewall Insights overview

Firewall Insights helps you understand and optimize firewall rules with insights, recommendations and metrics about rule usage, and uses machine learning to predict future usage. For firewall policies, insights cover the rules associated with a policy. Firewall Insights uses Recommender.

## Signature / Usage

Insights can be read through the Recommender API or the gcloud CLI.

```bash
gcloud recommender insights list --project=project-id \
    --location=global --insight-type=google.compute.firewall.Insight
```

Metrics require Firewall Rules Logging on the rule:

```bash
gcloud compute firewall-rules update RULE --enable-logging
```

## Options / Props

| Insight | Details |
|---|---|
| Shadowed firewall rule | Derived from configuration; a shadowed rule shares attributes (such as IP ranges) with rules of higher or equal priority |
| Overly permissive rule | `Allow` rules with no hits; obsolete based on adaptive analysis; with unused attributes; with overly permissive IP addresses or port ranges |
| `Deny` rule insights | `Deny` rules with hits during the observation period |

| Data cutoff | Applies to |
|---|---|
| After February 27, 2023 | Insights for rules in hierarchical firewall policies and global network firewall policies (based on firewall logging data gathered only after this date) |
| After June 17, 2022 | Insights for rules containing IPv6 address ranges |

## Notes

- Metrics are derived from Firewall Rules Logging, so they exist only for rules with logging enabled and only for traffic that Firewall Rules Logging covers (for example TCP and UDP only). Metrics are available in Cloud Monitoring and the Google Cloud console.
- Uses: verify rules are used as intended, verify allow/block of intended connections over periods, live-debug connections dropped by rules, and alert on significant changes in hit counts to find malicious access attempts.
- Where to view: Firewall Insights page, VPC firewall rule details page, VPC network interface details page, and Active Assist.
- Enabling logging changes log volume and cost; the command above changes an existing rule, so try it on a disposable rule first.
- Firewall rules and policies resources are in the `gcp-compute` skill (`gcloud compute firewall-rules`); firewall policies and Cloud NGFW are in other references of this skill.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/recommender/insights/list and https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/update (gcloud 593.0.0 help); the source page has no code.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-insights-categories-states.md](./firewall-insights-categories-states.md)
- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
