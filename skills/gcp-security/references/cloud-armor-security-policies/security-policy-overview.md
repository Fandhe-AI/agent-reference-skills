---
source: https://docs.cloud.google.com/armor/docs/security-policy-overview
---

# Security policy overview

Cloud Armor security policies are collections of rules, each made of a match condition and an action, applied in priority order to requests destined for a protected resource. They filter on attributes from Layer 3 through Layer 7 (IP address, IP range, region code, request headers) before traffic reaches load-balanced backend services or backend buckets. Security policies come as service-level policies (backend, edge, network edge, internal service) and hierarchical policies.

## Signature / Usage

### Rule evaluation with a request body

Rules 1, 2, and 3 are evaluated in order for `IP` and `HTTP` header fields. If IP address 9.9.9.1 launches an XSS attack in the body, only the body is blocked (by rule 2); the `HTTP` header passes through to the backend (by rule 3).

Adapted (not in the official docs): `inIPRange` changed to `inIpRange`.

```text
Rule1
expr: inIpRange(origin.ip, '10.10.10.0/24')
action: deny(403)
priority: 1
Rule2
expr: evaluatePreconfiguredWaf('xss-v422-stable')
action: deny(403)
priority: 2
Rule3
expr: inIpRange(origin.ip, '9.9.9.0/24')
action: allow
priority: 3
Rule-default
action: deny(403)
priority: INT-MAX
```

### Allow a trusted IP without WAF scanning

The policy allows `IP 9.9.9.1` without scanning against XSS attacks.

Adapted (not in the official docs): `inIPRange` changed to `inIpRange`.

```text
Rule1
expr: inIpRange(origin.ip, '10.10.10.0/24')
action: deny(403)
priority: 1
Rule2
expr: inIpRange(origin.ip, '9.9.9.0/24')
action: allow
priority: 2
Rule3
expr: evaluatePreconfiguredWaf('xss-v422-stable')
action: deny(403)
priority: 3
Rule-default
action: allow
priority: INT-MAX
```

## Options / Props

### Supported load balancers and endpoints

| Type | Notes |
|---|---|
| All external Application Load Balancers (including classic) | Premium or Standard Tier |
| Regional internal Application Load Balancer | |
| Global external proxy Network Load Balancer (TCP/SSL) | |
| Classic proxy Network Load Balancer (TCP/SSL) | |
| Regional external passthrough Network Load Balancer (TCP/UDP) | |
| External protocol forwarding | |
| VMs with external IPv4 addresses or external IPv6 address ranges on a NIC | |

### Requirements

| Item | Allowed values |
|---|---|
| Backend service load balancing scheme | `EXTERNAL`, `EXTERNAL_MANAGED`, `INTERNAL_MANAGED` |
| Backend service protocol | `HTTP`, `HTTPS`, `HTTP/2`, `UDP`, `TCP`, `SSL`, `UNSPECIFIED` |

### Policy types

| Type | `type` flag | Attachment point | Rule actions | Frontends |
|---|---|---|---|---|
| Backend security policy (global) | `CLOUD_ARMOR` (default if unset) | Backend service | Allow, Deny, Redirect (`GOOGLE_RECAPTCHA` and `EXTERNAL_302`), Throttle, Rate-based ban | Global external Application Load Balancer, classic Application Load Balancer (global only) |
| Backend security policy (proxy NLB) | `CLOUD_ARMOR` | Backend service | Allow, Deny, Throttle, Rate-based ban | Global external proxy Network Load Balancer, classic proxy Network Load Balancer |
| Edge security policy | `CLOUD_ARMOR_EDGE` | Backend service, backend bucket | Allow, Deny | Global external Application Load Balancer, classic Application Load Balancer |
| Internal service security policy | — | Cloud Service Mesh endpoint policy | Fairshare | Cloud Service Mesh clients |
| Regional backend security policy | `CLOUD_ARMOR` | Backend service (regional) | Allow, Deny, Throttle, Rate-based ban | Regional external Application Load Balancer; regional internal Application Load Balancer |
| Network edge security policy | `CLOUD_ARMOR_NETWORK` | Target pool, target instance, backend service (regional), instance | Allow, Deny | Regional external passthrough NLB, external protocol forwarding, VMs with external-IP NICs |

### Features by policy type (global scope: backend / edge)

| Feature | Backend (global external ALB / classic ALB) | Edge |
|---|---|---|
| Client IP, geography, ASN | Yes | Yes |
| Rate limiting, bot management, body filtering, WAF, managed rules, Adaptive Protection | Yes | No |
| TLS fingerprinting (JA3 and JA4) | Yes | No |
| HTTP filtering | Yes | Yes |
| Address Group | Yes | No |
| Google Threat Intelligence, Security Command Center, Cloud Monitoring, request logging | Yes | Yes |

### Limits and constants

| Item | Value |
|---|---|
| Rule priority range | 0 to 2147483646 inclusive; no two rules with the same priority |
| Default rule priority | 2147483647 (`INT-MAX`); always present, cannot be deleted, can be modified |
| Default rule action | `deny` per the source (can be changed to `allow`); a policy created through the API or `gcloud compute security-policies create` without rules gets a default rule with action `allow` |
| Subexpressions per rule | Up to 5 |
| Request body inspection | First 64 kB, per the configured inspection limit |
| Deny rule status codes | `403 Unauthorized`, `404 Access Denied`, `502 Bad Gateway`; exceed action rules can return `429 Too Many Requests` |
| Service-level policies per backend service | Two at once, but not two backend or two edge policies |

## Notes

- Supported load balancers and endpoints: Backends: instance groups, all NEG types supported by the load balancer, and Cloud Storage buckets. Hybrid or multicloud backends must be internet NEGs or hybrid NEGs; serverless NEGs are protected when traffic is routed through a load balancer.
- Features by policy type (global scope: backend / edge): For regional policies: regional backend policies support JA3 only for TLS fingerprinting, no bot management, Adaptive Protection, Address Group, or Google Threat Intelligence, and no client geography / ASN for the regional internal Application Load Balancer; network edge policies support client IP, geography, ASN, and byte offset filtering only (no rate limiting, HTTP filtering, WAF, or request logging). Edge policies support filtering on only `origin.asn`, `origin.ip`, `origin.region_code`, `request.headers`, `request.method`, `request.path`, `request.query`, and `request.scheme`.
- Hierarchical policies attach at organization, folder, or project level and support only some policy types and features; service-level policies attach to one or more backend services.
- A security policy associated with any backend service cannot be deleted; a backend service can be deleted regardless. If multiple forwarding rules point to a backend service with a policy, rules are enforced for all forwarding rule IP addresses.
- When edge and backend policies are both attached to a backend service, backend policies are enforced only for cache-miss requests that passed the edge policy. Edge policies are evaluated before IAP; a request blocked at the edge never reaches IAP sign-in. Only edge policies can be applied to backend buckets.
- With global external proxy NLB or classic proxy NLB, `deny` is enforced only on new connection requests, terminates the TCP connection, and any status code supplied is ignored. Rate limiting there supports only key types `ALL` and `IP`; `HTTP-HEADER` / `HTTP-COOKIE` are interpreted as `ALL` and `XFF-IP` as `IP`.
- Network edge policies require advanced network DDoS protection to be configured first in the policy's region.
- Rule order uses the lowest number first. For requests with bodies, headers are evaluated first; `redirect` and custom-header actions work only in the header phase (a redirect matched in the body phase becomes `deny`; a custom header does not take effect). Lower-priority header allow rules can match before higher-priority body-blocking rules, so the header may reach the backend while the body is blocked. Only `evaluatePreconfiguredWaf()` and rules referencing `request.body` / `request.params` inspect the body. Default decoding is URL-query style; JSON (`Content-Type = "application/json"`) is also parsed; XML, Gzip, UTF-16, and multipart/form-data are not decoded and rules run on raw data. Content beyond the inspection limit is not inspected.
- Fingerprint: when updating a policy you must supply the current `fingerprint` (from `EXPORT` or `DESCRIBE`); a stale value means the policy changed since you read it. On create the value is ignored.
- Preview mode: individual rules or every rule can be previewed (`--preview` on `gcloud compute security-policies rules update`, `--no-preview` to disable). Preview actions are noted in Cloud Monitoring, evaluation continues to other rules, and you are charged the normal per-request fee. Use preview before enforcing.
- Geolocation mappings update about once per week with no guaranteed cadence and roll out over several days, so the same client IP may be handled inconsistently during rollout.
- Rule examples above: the second policy's `Rule-default` has `action: allow`, which permits every request not matched earlier; it is shown for that example only. Changing a default rule to `deny` or enabling rules without preview can block production traffic, so test on a disposable policy first.
- Logging: logs are generated for the first (highest priority) matching rule, in or out of preview mode. Request logging for new backend service resources is disabled by default and must be enabled per backend service. Logging for external proxy NLBs is configured only with gcloud, not the console. WebSocket: only the first request is evaluated. gRPC: the load balancer may still log `200 OK` after Cloud Armor blocks.
- Custom error responses are available with a global external Application Load Balancer for `4xx` / `5xx` codes used by Cloud Armor rules.
- Rule types: IP allowlist/denylist (IPv4 and IPv6), client geography (Unicode country code), preconfigured WAF (SQLi, XSS, LFI, RFI, RCE, method enforcement, scanner detection, protocol, PHP injection, session fixation, Java, NodeJS), managed rules (version pinning to `stable` or `canary`), bot management (reCAPTCHA redirect, token evaluation, `302` redirect, custom header insertion), preconfigured named IP address lists (third-party lists synced daily, not subject to per-rule IP limits), rate limiting (throttle and temporary ban).
- Source inconsistency: the globally scoped feature table lists the global external Application Load Balancer, the classic Application Load Balancer, and the global external / classic proxy Network Load Balancers as edge security policy frontends, while the edge security policy section lists only the global external Application Load Balancer and the classic Application Load Balancer as supported endpoints.
- gcloud commands for security policies are in the `gcp-compute` skill (`gcloud compute security-policies`).
- The snippets are pseudo-code rule listings from the source.
- Corrected from the official docs: the rule examples write the function as `inIPRange`; the Cloud Armor rules language function is `inIpRange` (see `rules-language-reference.md`).
- Source inconsistency: the source says the default action for the default rule is `deny`, while the Compute Engine API Discovery document (`SecurityPolicy.rules`) says "If no rules are provided when creating a security policy, a default rule with action \"allow\" will be added." Check the priority `2147483647` rule after creating a policy; to deny by default, update it, for example `gcloud compute security-policies rules update 2147483647 --security-policy=POLICY_NAME --action=deny-403` (see `network-edge-policies.md` for the risk of cutting off traffic).
- Source: https://docs.cloud.google.com/armor/docs/security-policy-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [rules-language-reference.md](./rules-language-reference.md)
- [configure-security-policies.md](./configure-security-policies.md)
- [hierarchical-policies-overview.md](./hierarchical-policies-overview.md)
- [network-edge-policies.md](./network-edge-policies.md)
- [best-practices.md](./best-practices.md)
