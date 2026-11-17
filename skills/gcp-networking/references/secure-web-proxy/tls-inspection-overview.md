---
source: https://docs.cloud.google.com/secure-web-proxy/docs/tls-inspection-overview
---

# TLS inspection overview (Secure Web Proxy)

Secure Web Proxy can intercept and decrypt HTTPS traffic so that policies can apply to the plain-text request, such as URL filtering on the full path and header inspection. It works by establishing two separate encrypted connections with the proxy as an intermediary.

## Signature / Usage

The source page has no code. Snippet taken from https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules: a rule with TLS inspection enabled.

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

## Options / Props

### Certificate issuance modes (`certificateIssuanceMode`)

| Value | Behavior | Trade-off |
|-------|----------|-----------|
| `LOCAL_INTERMEDIATE_CA_SIGNING` | Requests a single intermediate CA certificate from the CA pool, caches it and signs leaf certificates locally | Lower CA Service costs (requests limited to the intermediate CA refresh cycle, typically once per day); reduced observability (locally signed leaf certificates aren't in CA Service audit logs) |
| `DIRECT_LEAF_PROVISIONING` | Requests a leaf certificate from the CA Service pool for each unique domain | Greater observability (every request is in CA Service audit logs); higher CA Service costs with many unique domains or proxy tasks |

### Certificate authority configuration methods

| Method | Description |
|--------|-------------|
| Subordinate CA in CA Service | An existing external root CA signs a subordinate CA stored in Google Cloud |
| External root CA | An external root CA signs certificates generated at runtime through subordinate CAs |
| Google-managed root CA | A new root certificate generated in CA Service signs your subordinate CAs |

### Flow

| Step | What happens |
|------|--------------|
| Client handshake | The proxy intercepts the client's request to the external site |
| Certificate generation | A temporary certificate for the site is generated in real time |
| Trust validation | The client receives the temporary certificate |
| Inspection point | Traffic is decrypted inside the instance and policies apply to plain-text HTTP |
| Server handshake | A second TLS connection to the destination re-encrypts the traffic |

### Selective decryption and bypass (`SessionMatcher`)

| Criteria | Examples |
|----------|----------|
| Destination | Website domain names (regular expressions and domain lists); specific FQDNs |
| Source | Source IP ranges or CIDR blocks such as `10.0.0.0/24`; secure tags; service accounts; IP addresses |
| Logic | Boolean expressions combining conditions, or excluding traffic from inspection |

## Notes

- If you use `ApplicationMatcher` in rules for HTTPS traffic, you must enable TLS inspection for the instance.
- Client trust: designed for environments where you control client devices. Clients trust the connection only if your private root CA is pre-installed; unmanaged devices typically show `Insecure connection` warnings.
- Containerized AI agents (Cloud Run, GKE): export the root CA certificate from your CA pool or private PKI and inject it into the container's trust store, for example via the `AGENT_GATEWAY_ROOT_CERTIFICATES` or `SSL_CERT_FILE` environment variable.
- Certificate pinning (for example Windows and macOS system updates, Chrome updates, some high-security mobile applications) prevents interception; bypass inspection with `SessionMatcher` for those destinations.
- Dedicated policies assign a unique TLS inspection policy and CA pool per Secure Web Proxy policy; shared policies reuse one TLS inspection configuration across several proxy policies. Full URI visibility (domain, path, query string) allows rules such as allow `www.example.com/documentation` but block `www.example.com/uploads`.
- The Certificate Authority Service API (`privateca.googleapis.com`) must be enabled for TLS inspection. Set `tlsInspectionEnabled: true` per rule that uses `applicationMatcher` for HTTPS.
- Snippet taken from https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules.
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/tls-inspection-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/configure-rules (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-rules.md](./configure-rules.md)
- [initial-setup-steps.md](./initial-setup-steps.md)
- [policies-and-rules-overview.md](./policies-and-rules-overview.md)
