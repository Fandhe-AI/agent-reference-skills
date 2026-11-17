---
source: https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules
---

# Security rules

Gateway security rules are `if-then` statements in a gateway security policy that match a web request by source identity, destination and attributes, and then allow or deny it. Includes host-matching behavior per deployment mode and TCP proxy rules for non-web traffic.

## Signature / Usage

### Create a rule

Complete the initial setup steps and create a policy first. `rule.yaml`:

```yaml
name: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1/rules/RULE_NAME
description: Allow wikipedia.org
enabled: true
priority: 1
basicProfile: ALLOW
sessionMatcher: host() == 'www.wikipedia.org'
```

With TLS inspection enabled:

```yaml
name: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1/rules/RULE_NAME
description: Allow wikipedia.org
enabled: true
priority: 1
basicProfile: ALLOW
sessionMatcher: host() == 'www.wikipedia.org'
applicationMatcher: request.path.contains('index.html')
tlsInspectionEnabled: true
```

```bash
gcloud network-security gateway-security-policies rules import allow-wikipedia-org \
    --source=rule.yaml \
    --location=REGION \
    --gateway-security-policy=policy1
```

### TCP proxy rule example

Allows all TCP traffic to port `22` from any source, as written in the source; narrow it with `source.ip` as shown below (see Notes).

```yaml
name: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/POLICY_NAME/rules/RULE_NAME
enabled: true
priority: 100 # Lower numbers have higher priority
description: "Allow TCP proxy traffic to port 22 - such as, for SSH"
basicProfile: ALLOW
sessionMatcher: "destination.port == 22"
```

A more specific matcher:

```text
        // Allow port 22 from only a specific source IP range
        sessionMatcher: "destination.port == 22 && inIpRange(source.ip, '10.0.0.0/24')"
```

## Options / Props

### Host matching by deployment mode

| Mode | Traffic | Matching mechanism | Rule configuration |
|------|---------|--------------------|--------------------|
| Explicit proxy | Unencrypted HTTP | Destination hostname checked against the `host` field in the standard `CONNECT` header | `sessionMatcher`: `host() == "example.com"` |
| Explicit proxy | HTTPS without TLS inspection | Host matching isn't possible at the application or session level (request details are encrypted and `destination.ip` isn't supported); use broader controls such as source identity or enable TLS inspection | Use source identity matching (service accounts) or enable TLS inspection |
| Explicit proxy | HTTPS with TLS inspection | Both Session Matcher and Application Matcher | `sessionMatcher` returns `true` or matches the host, e.g. `host() == "example.com"`; `applicationMatcher`: `request.host() == "example.com"` |
| Next hop | Unencrypted HTTP | Destination hostname checked against the `host` field in the standard HTTP request header | `sessionMatcher`: `host() == "example.com"` |
| Next hop | HTTPS without TLS inspection | Hostname checked against the SNI header, visible even on encrypted traffic | `sessionMatcher`: `host() == "example.com"` |
| Next hop | HTTPS with TLS inspection | Both matchers | Same as explicit proxy with TLS inspection |

### TCP proxy rule attributes (Session Matcher)

| Attribute | Type | Description |
|-----------|------|-------------|
| `source.ip` | string | IP address of the client that sent the request |
| `source.port` | string | Client port that sent the request |
| `destination.port` | string | Upstream port to which the instance sends the traffic |
| `source.matchTag(SECURE_TAG)` | boolean | `True` if the source is associated with the secure tag, e.g. `source.matchTag('tagValues/123456')` |
| `source.matchServiceAccount(SERVICE_ACCOUNT)` | boolean | `True` if the source is associated with the service account, e.g. `source.matchServiceAccount('x@my-project.iam.gserviceaccount.com')` |
| `inIpRange(IP_ADDRESS, IP_RANGE)` | boolean | `True` if the address is within the range, e.g. `inIpRange(source.ip, '1.2.3.0/24')`; IPv6 subnet masks can't be larger than `/64` |

### Limitations

| Limitations |
|---|
| If you create an authorization policy on the instance, the proxy ignores all existing gateway security policies and their rules. |
| UDP applications aren't supported; Secure Web Proxy blocks UDP-based traffic. |
| TCP proxy rules must have a higher priority (lower number) than HTTP/S rules; the `host` Session Matcher attribute isn't supported in TCP proxy rules because host information isn't available at the TCP layer. |

## Notes

- Host matching by deployment mode: In explicit proxy mode with Application Matcher attributes for TLS inspection, the proxy checks the hostname first at the connection level and then at the application level.
- TCP proxy rules filter only on destination port; the source recommends adding conditions with `&&` / `||` and attributes such as `source.ip`. The port 22 example above allows all sources; restrict it to a trusted range before use.
- Set `tlsInspectionEnabled: true` on each rule that uses `applicationMatcher` to match HTTPS traffic; TLS inspection for the rule is limited to traffic matching the rule's `sessionMatcher`. To analyze HTTP methods or headers, enable TLS inspection.
- Rule priority: lowest number is checked first; in the Console, `0` is the highest priority; the first matching rule decides.
- The source also shows Console steps.
- Source inconsistency: this page lists `source.port` and `destination.port` as `string`, but the CEL matcher language reference (https://docs.cloud.google.com/secure-web-proxy/docs/cel-matcher-language-reference, retrieved 2026-11-17) lists both as `integer`; the example `destination.port == 22` compares with an integer literal.
- Source inconsistency: the application matcher examples write `request.host() == "example.com"`, but the CEL matcher language reference (https://docs.cloud.google.com/secure-web-proxy/docs/cel-matcher-language-reference, retrieved 2026-11-17) defines `request.host` as a string attribute (and recommends the `host()` function); `request.host()` is not listed there as a function.
- Source inconsistency: the TCP proxy rule example uses `priority: 100`, while the same page requires TCP proxy rules to have a higher priority (lower number) than HTTP/S rules, and the HTTP/S rule examples (such as the quickstart) use `priority: 1`.
- Source inconsistency: this page says that for encrypted HTTPS without TLS inspection "host matching isn't possible either at the application level or at the session level", but the quickstart (https://docs.cloud.google.com/secure-web-proxy/docs/quickstart, retrieved 2026-11-17) tests an HTTPS request against a session matcher `host() == 'www.wikipedia.org'` without TLS inspection.
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [policies-and-rules-overview.md](./policies-and-rules-overview.md)
- [cel-matcher-language-reference.md](./cel-matcher-language-reference.md)
- [url-list-syntax-reference.md](./url-list-syntax-reference.md)
- [tls-inspection-overview.md](./tls-inspection-overview.md)
- [deploy-next-hop.md](./deploy-next-hop.md)
