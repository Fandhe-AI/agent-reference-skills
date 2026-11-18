---
source: https://docs.cloud.google.com/armor/docs/cloud-armor-overview
---

# Cloud Armor overview

Google Cloud Armor helps protect Google Cloud deployments from DDoS attacks and application attacks such as XSS and SQLi. It combines built-in protections with options you configure manually: security policies, a custom rules language, preconfigured WAF rules, managed rules, and (with Cloud Armor Enterprise) Google Threat Intelligence, Adaptive Protection, and advanced network DDoS protection. Some features require global external Application Load Balancers or classic Application Load Balancers.

## Signature / Usage

### Threat intelligence match expression

Security policy rules match traffic against continuously updated feeds (for example Tor exit nodes or VPN providers) with `evaluateThreatIntelligence()`.

```text
evaluateThreatIntelligence('iplist-known-malicious-ips')
```

### Attach points

Security policies attach to the backend services of these load balancers:

- All external Application Load Balancers, including classic Application Load Balancers
- Regional internal Application Load Balancer
- Global external proxy Network Load Balancer (TCP/SSL)
- Classic proxy Network Load Balancer (TCP/SSL)
- Regional external passthrough Network Load Balancer (TCP/UDP)

## Options / Props

### Feature summary

| Feature | Description | Condition |
|---|---|---|
| Security policies | Ordered collections of rules (match condition + action) applied to requests for a protected resource. Also protect resources not behind a load balancer, such as VM instances with external IP addresses, on Google Cloud, hybrid, or multi-cloud. | Configured manually with match conditions and actions; preconfigured policies exist for several use cases |
| Rules language | Custom rules language for complex conditions; a rule takes effect when it is the highest priority rule that matches the request. | — |
| Preconfigured WAF rules | WAF rules with dozens of signatures compiled from open source standards (OWASP ModSecurity Core Rule Set). Cloud Armor supports CRS 4.22, 3.3, and 3.0; Google recommends not using a version lower than 4.22. Noisy signatures can be disabled by tuning. | XML body parsing is not supported by preconfigured WAF rules |
| Managed rules | Threat signatures that are automatically kept up to date for new CVEs and zero-day vulnerabilities. | — |
| Cloud Armor Enterprise | Managed application protection: always-on L3/L4 volumetric and protocol DDoS protection for the load balancer; access to L7 DDoS protection (for example HTTP floods) through user-configured security policies; DDoS attack visibility telemetry. | Subscription |
| Google Threat Intelligence | Allow or block traffic using threat intelligence feeds via `evaluateThreatIntelligence()`. | Global external Application Load Balancers and classic Application Load Balancers |
| Adaptive Protection | Analyzes traffic patterns to backend services, detects suspected L7 DDoS attacks, and can suggest or automatically apply mitigation rules. Enabled per security policy. | Active Cloud Armor Enterprise subscription required |
| Advanced network DDoS protection | Always-on attack monitoring and alerting, targeted attack mitigations, and mitigation telemetry. | Cloud Armor Enterprise subscribers using network load balancers, protocol forwarding, or VMs with public IP addresses |

## Notes

- DDoS protection is provided automatically, regardless of tier, for global external Application Load Balancers, classic Application Load Balancers, and external proxy Network Load Balancers. Cloud Armor supports HTTP, HTTPS, HTTP/2, and QUIC.
- Always-on L3/L4 protection applies to applications behind load balancers with automated inline mitigations and no latency impact. L7 protection (including HTTP floods) requires a user-configured security policy with proactive rules.
- Security policies allow or deny access at the Google Cloud edge, close to the traffic source, which keeps unwanted traffic from consuming resources or entering VPC networks.
- Global Front End Enterprise billing tier can be enabled per project; it consolidates pricing for Cloud Armor, global external Application Load Balancers, Service Extensions, and Cloud CDN. Prices are not copied here; see https://cloud.google.com/armor/pricing.
- Snippet taken from https://docs.cloud.google.com/armor/docs/create-security-policy-rules (the `evaluateThreatIntelligence` example).
- Source: https://docs.cloud.google.com/armor/docs/cloud-armor-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-policy-overview.md](./security-policy-overview.md)
- [rules-language-reference.md](./rules-language-reference.md)
- [best-practices.md](./best-practices.md)
