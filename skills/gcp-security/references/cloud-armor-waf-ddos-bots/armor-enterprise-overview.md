---
source: https://docs.cloud.google.com/armor/docs/armor-enterprise-overview
---

# Cloud Armor Enterprise overview

Cloud Armor is offered in two tiers: Standard (pay-as-you-go, always-on L3/L4 DDoS protection, WAF rules) and Enterprise (Paygo or Annual), which adds Adaptive Protection, advanced network DDoS protection, Google Threat Intelligence, hierarchical security policies, DDoS attack visibility and, for Annual only, DDoS bill protection and DDoS response support. Enterprise is enrolled per project on top of a billing account subscription (Annual) or directly per project (Paygo). Enrollment steps are on the "Using Cloud Armor Enterprise" page.

## Signature / Usage

### Frozen policy after downgrade

On a frozen policy you can only delete rules or update advanced rules (without changing their priority). Delete a rule from a security policy:

```bash
gcloud compute security-policies rules delete 1000 \
    --security-policy=my-policy
```

## Options / Props

### Tier comparison

| | Standard | Enterprise Paygo | Enterprise Annual |
|---|---|---|---|
| Billing | Pay-as-you-go | Pay-as-you-go | Subscription, 12-month commitment |
| Pricing model | Per policy, per rule, per request | Monthly fee per project, plus a monthly fee per protected resource after the first 2 resources | Monthly fee per billing account, plus a monthly fee per protected resource after the first 100 resources |
| DDoS protection endpoints | External Application Load Balancer, external proxy Network Load Balancer | Those plus regional external passthrough Network Load Balancer, protocol forwarding, VM public IPs | Same as Paygo |
| Managed rules | Optional add-on | Optional add-on | Optional add-on |
| Cloud Armor WAF | Per policy, rule, request | Included | Included |
| Resource limits | Up to quota limit | Up to quota limit | Up to quota limit |
| Adaptive Protection | Alerting only | Yes | Yes |
| Advanced network DDoS protection | No | Yes | Yes |
| Network edge security policies | No | Yes | Yes |
| Address Group | No | Yes | Yes |
| Google Threat Intelligence | No | Yes | Yes |
| Hierarchical security policies | No | Yes | Yes |
| DDoS attack visibility | No | Yes | Yes |
| DDoS response support | No | No | Eligibility requirements apply |
| DDoS bill protection | No | No | Yes |

### Standard protects (policies applied in real time with no latency impact)

| Infrastructure |
|----------------|
| Global external Application Load Balancer; Classic Application Load Balancer; Regional external Application Load Balancer |
| Regional external passthrough Network Load Balancer; Global external proxy Network Load Balancer (TCP/SSL) |
| Cloud CDN; Media CDN |

### Global Front End Enterprise (Preview) effect

| Resource type | Project tier Standard | Project tier Enterprise (Paygo or Annual) |
|---------------|-----------------------|-------------------------------------------|
| Global external Application Load Balancers | Enables preconfigured WAF rules, Adaptive Protection, Google Threat Intelligence, DDoS attack visibility and Address Groups with consolidated billing | Enables all Enterprise features with consolidated billing |
| All other resources (regional external or internal load balancers) | Unaffected | Unaffected |

### DDoS response support eligibility

| Requirement |
|-------------|
| Billing account has an active Cloud Armor Enterprise Annual subscription |
| Billing account has a Premium account for Cloud Customer Care |
| The project with the attacked workload is enrolled in Enterprise Annual (with cross-project service referencing, both frontend and backend projects) |
| Subscribed to Annual after September 3, 2024: the project must have had an annual DDoS posture review |

## Notes

- All projects with an external Application Load Balancer or external proxy Network Load Balancer are automatically enrolled in Standard. Enrollment of a project in Enterprise can take up to one hour; upgrading typically does not disrupt availability, but consider billing implications when changing policies. With cross-project service referencing, both frontend and backend projects must be under the billing account with the subscription and enrolled.
- Protected resources: after enrollment, forwarding rules are added, and backend services and backend buckets are metered as protected resources (aggregated across enrolled projects for Annual, within the project for Paygo). Regional internal Application Load Balancer backends count only if a security policy is attached. Passthrough Network Load Balancer backend services, target pools, target instances and VMs with public IPs are metered only when advanced network DDoS protection is enabled in their region. Always-on L3/L4 mitigation is included; L7 protection requires a user-created policy with mitigating rules.
- Hierarchical security policies: every inheriting project must be enrolled in Enterprise. Projects linked to a billing account with Annual are enrolled in Annual automatically; otherwise they are auto-enrolled in Paygo (not upgraded to Annual later, and not unenrolled when later excluded). A project with inherited hierarchical policies cannot be removed from Enterprise. Auto-enrollment can take up to the next business day, during which the policies are effective with no Enterprise cost, and happens only when at least one backend service for global external load balancers uses HTTP, HTTPS, HTTP2, H2C, or GRPC.
- Migrating a project between billing accounts: from September 3, 2024, if the new billing account has no Annual subscription the project reverts to Standard (or to Paygo if it has effective hierarchical policies). Subscribe the new billing account to Annual before migrating, or contact Cloud Billing support. Paygo projects are not affected.
- Downgrade: you cannot downgrade while hierarchical security policies exist. Removing a project makes policies with Enterprise-exclusive rules (advanced rules) frozen: traffic is still evaluated, they cannot be attached to new targets, and you can only delete rules or update advanced rules (without changing priority) to stop using Enterprise-only features. Re-enrolling restores access. Removing a project with an active advanced network DDoS policy still bills that feature; delete those rules before unenrolling. Downgrading and unenrolling change which protections apply, so try it on a test project first.
- Disabling Global Front End Enterprise: protections revert to the project-level tier; the console does not restore a tier, so immediately select Standard or Enterprise PayGo to avoid policy degradation or unexpected billing.
- DDoS posture review is for Annual subscribers with a Premium account for Cloud Customer Care. Customers who subscribed after September 3, 2024 are not eligible for response support until it is completed. Proactive support is available to all Enterprise customers.
- DDoS bill protection (Annual only) gives credits for future usage only (not to offset existing usage) for covered increases in Cloud Load Balancing, Cloud Armor, Cloud CDN, Media CDN and network egress charges after a verified DDoS attack. Terms: request to Cloud Billing Support within 30 days after the attack ends with evidence; credits have no cash value and expire 12 months after issue; load tests and security assessments are not qualified attacks. The source's per-endpoint table of covered usage lines is not reproduced here.
- Prices are not copied here; see https://cloud.google.com/armor/pricing.
- Deleting a rule changes which traffic the policy allows or blocks; try it on a disposable policy first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/rules/delete (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/armor/docs/armor-enterprise-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [advanced-network-ddos.md](./advanced-network-ddos.md)
- [adaptive-protection-overview.md](./adaptive-protection-overview.md)
- [threat-intelligence.md](./threat-intelligence.md)
