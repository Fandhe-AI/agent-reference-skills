---
source: https://docs.cloud.google.com/secure-web-proxy/docs/policies-and-rules-overview
---

# Policies and rules

Secure Web Proxy controls outbound agentic and non-agentic web traffic with three mechanisms: authorization policies, gateway security policies and rules, and service rate limiting policies. Authorization and gateway security policies are mutually exclusive on a single gateway.

## Signature / Usage

### Gateway security rule (YAML)

Snippet taken from https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules (the page has no code block).

```yaml
name: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1/rules/RULE_NAME
description: Allow wikipedia.org
enabled: true
priority: 1
basicProfile: ALLOW
sessionMatcher: host() == 'www.wikipedia.org'
```

## Options / Props

### Choosing the policy type

| Traffic | Policy to use |
|---------|---------------|
| Agentic AI traffic (Secure Web Proxy deployed as an Agent Gateway) | Authorization policies with extension bindings, configured on the `agentGateway` resource. Policies directly attached to the underlying `Gateway` resource are ignored |
| Standard web traffic, granular frontend mTLS, identity checks or custom authorization extensions | Authorization policy on the `Gateway` resource (recommended) |
| Standard web traffic filtered by service accounts, secure tags or URL lists | Gateway security policy on the `Gateway` resource |
| Throttling / cost control | Service rate limiting policy (optional, on top of either primary policy) |

### Authorization policies (`AuthzPolicy`)

- Allow, deny or delegate request authorization based on source, destination and other request attributes. Failed requests are rejected with `403 Forbidden`.
- Use the unified `AuthzPolicy` API shared with Application Load Balancer and Cloud Service Mesh; Service Extensions authorization extensions can delegate decisions (for example to IAP).
- Identity-centric: service accounts, tags or frontend mutual TLS, while still supporting IP-based rules.
- If a gateway security policy with rules exists, it need not be removed; Secure Web Proxy ignores those rules once an authorization policy is applied.

### Agent Gateway two-tier governance

| Tier | Role |
|------|------|
| Extension bindings (primary) | Attach Model Armor (payload inspection for sensitive data, jailbreaks, prompt injection) and IAP (identity verification before forwarding tool calls) to the `agentGateway` resource |
| Authorization policies | L4 rules to bypass TLS interception for trusted endpoints; L7 rules for MCP method and tool restrictions |

### Gateway security policies and rules

| Item | Behavior |
|------|----------|
| Default | `deny-all`: every HTTP and HTTPS request is blocked until a rule permits it |
| Reuse | One policy can be reused across multiple Secure Web Proxy instances |
| Evaluation | By priority, lowest number first; the first matching rule decides |
| Session Matcher | Source identity (service account or secure tag), destination hostname, destination port |
| Application Matcher | Full URL path, request method (for example block `DELETE`), HTTP headers; typically requires TLS inspection for encrypted traffic |

### Service rate limiting policies (Preview)

- Preview: subject to the "Pre-GA Offerings Terms"; available "as is" with possibly limited support.
- Enforced at the end of the request path, after gateway security rules, authorization checks and service extensions succeed.
- Applies only to Layer 7 traffic that matches a rule with an application attribute (`ApplicationMatcher`); traffic matching only a session attribute (`SessionMatcher`) isn't rate limited.

### Limitations

| Policy | Limitation |
|--------|------------|
| Gateway security policies | Don't support authorization extensions; custom logic or delegation to external services is available only through authorization policies |
| Authorization policies | Don't support URL lists or regular expression matching for URL strings |
| Service rate limiting | Applies only to Layer 7 traffic matching an `ApplicationMatcher` rule |

## Notes

- A dedicated Secure Web Proxy gateway connected to an Agent Gateway is recommended for AI agent traffic, rather than reusing a proxy configured for non-agentic workloads.
- To analyze request attributes such as HTTP methods or headers, enable TLS inspection; when active, authorization policies give finer control than standard gateway rules for decrypted traffic.
- Quotas and system limits for policies are in [quotas.md](./quotas.md).
- Snippet taken from https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules.
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/policies-and-rules-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [configure-rules.md](./configure-rules.md)
- [cel-matcher-language-reference.md](./cel-matcher-language-reference.md)
- [tls-inspection-overview.md](./tls-inspection-overview.md)
- [quotas.md](./quotas.md)
