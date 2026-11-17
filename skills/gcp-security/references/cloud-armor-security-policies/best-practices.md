---
source: https://docs.cloud.google.com/armor/docs/best-practices
---

# Best practices for Cloud Armor

Recommendations for creating and tuning Cloud Armor security policies, logging and monitoring, and general management. Policies consist of preconfigured and custom rules and attach to the backend services of load balancers. For organization-wide central management with project-specific rules, see "Managing Cloud Armor using custom constraints" in the Cloud Armor docs.

## Signature / Usage

### Test your logic: two rules

To block users from the `AU` region except traffic from `10.10.10.0/24`, `Rule1` allows that range first and bypasses `Rule2` for matching traffic.

```text
Rule1
expr: inIpRange(origin.ip, '10.10.10.0/24')
action: allow
priority: 1
Rule2
expr: origin.region_code == 'AU'
action: deny(403)
priority: 2
```

### Test your logic: single rule

A single rule that denies `AU` traffic unless it is from `10.10.10.0/24`. Traffic that does not match (including `10.10.10.0/24`) continues to be evaluated against lower-priority rules.

```text
expr: origin.region_code == 'AU' && !inIpRange(origin.ip, '10.10.10.0/24')
action: deny(403)
priority: 1
```

## Options / Props

### Recommended rule priority structure (greatest to least priority)

| Order | Rule group |
|---|---|
| 1 | Explicit deny rules (ASN, region, IP ranges) |
| 2 | Trusted explicit allow rules (scanners, trusted systems; use with extreme caution) |
| 3 | Security rules (OWASP, custom rules) |
| 4 | Explicit allow rules (ASN, presence of header value, IP range) |
| 5 | Default deny rules |

### Limits and recommended values

| Item | Value |
|---|---|
| Rule `description` field | Limited to 64 characters |
| Priority spacing | Leave an interval of at least 10 between rule priorities (for example 20 and 30) |
| Preconfigured WAF sensitivity | Start with sensitivity level 1 for most applications |
| Cloud Logging sampling rate | Keep at 1 while actively tuning and implementing |

## Notes

- Use rule descriptions for context; references to configuration management databases or repositories are the most efficient way given the 64-character limit.
- Use preview mode to evaluate whether a rule (including OWASP signatures) negatively affects production traffic. Validate rules against your application and address irrelevant findings before disabling preview mode in production.
- Enable Adaptive Protection and put an alerting policy in place; it is best suited for volumetric protection and non-volumetric attacks might not trigger it. Have an escalation path for its alerts. It requires an active Cloud Armor Enterprise subscription.
- Enable JSON parsing if the application sends JSON in request bodies; otherwise preconfigured WAF rules do not parse JSON and results can be noisy with false positives.
- Test rule logic with synthetic traffic; use preview mode to see which rule matches a request. An allow rule that bypasses subsequent rules is permissive for the matched traffic; trusted allow rules (such as scanner IPs) must be used with extreme caution.
- Bot management: Cloud Armor performs reCAPTCHA token assessment instead of reCAPTCHA, which reduces origin load and puts controls closer to end users.
- Rate limiting: start with enforcement in preview mode and adjust thresholds as you learn the traffic profile; a higher-priority rule can allow or deny traffic before it reaches the rate limiting rule.
- Higher sensitivity levels detect more exploit attempts at the cost of noise; workloads with strict requirements might use the highest level but must tune before production.
- Verbose logging shows the offending portion of a request but can write end-user content (PII) to Cloud Logging, so it is not recommended for long periods on production workloads.
- Stable and canary versions exist for preconfigured WAF rules and managed rules. With automatic updates, keep canary rules in preview mode at higher priority and stable rules enforced at lower priority.
- Security Command Center receives Cloud Armor findings "Allowed Traffic Spike" and "Increasing Deny Ratio"; make sure security staff examine them.
- Cloud Armor logs use the load balancer's logging and sampling rate. Neither the global external Application Load Balancer nor the classic Application Load Balancer enables logs by default, so enable logging manually. Adaptive Protection logs appear under the `network_security_policy` resource.
- IAM: Compute Security Admin is required to configure, modify, update, and delete policies; Compute Network Admin or the `compute.backendServices.setSecurityPolicy` permission is required to attach a policy to a backend service.
- Reuse one policy across multiple backend services and keep a consistent set of reusable policies. Terraform is recommended for rollback and reproduction across projects (full integration for GA features).
- GKE: configure Cloud Armor through `BackendConfig` parameters and avoid manually configuring a load balancer as ingress. With Kubernetes Gateway, create a Cloud Armor backend security policy before referencing it in a `GCPBackendPolicy`; a regional Gateway needs a regional policy.
- The rule listings are pseudo-code from the source.
- Source: https://docs.cloud.google.com/armor/docs/best-practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-policy-overview.md](./security-policy-overview.md)
- [rules-language-reference.md](./rules-language-reference.md)
- [configure-security-policies.md](./configure-security-policies.md)
