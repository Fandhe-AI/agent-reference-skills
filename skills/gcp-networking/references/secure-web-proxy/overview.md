---
source: https://docs.cloud.google.com/secure-web-proxy/docs/overview
---

# Secure Web Proxy overview

Secure Web Proxy secures outbound agentic traffic and standard web traffic (HTTP and HTTPS) from an organization's internal network. Workloads and AI agents that use it as a gateway pass through a mandatory security checkpoint before reaching any website outside the organization.

## Signature / Usage

### Gateway resource (explicit routing mode)

A Secure Web Proxy instance is a `Gateway` of type `SECURE_WEB_GATEWAY`, created from a YAML file with `gcloud network-services gateways import`. See [quickstart.md](./quickstart.md) for the full procedure.

```yaml
name: projects/PROJECT_ID/locations/REGION/gateways/myswp
type: SECURE_WEB_GATEWAY
addresses: ["IP_ADDRESS"]
ports: [443]
gatewaySecurityPolicy: projects/PROJECT_ID/locations/REGION/gatewaySecurityPolicies/policy1
network: projects/PROJECT_ID/global/networks/NETWORK
subnetwork: projects/PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK
routingMode: EXPLICIT_ROUTING_MODE
```

## Options / Props

### Benefits and supported features

| Area | What it provides |
|------|------------------|
| AI agent governance | With Agent Gateway: centralized policies for agent-to-tool/endpoint/model access, agent identity verification, MCP tool-call inspection, Model Armor sanitization |
| Identity-aware access | Agentic identities (IAM, Identity-Aware Proxy through Service Extensions extension bindings); workload identities (service accounts, secure tags, client certificates with frontend mTLS) |
| Default security | Default `deny-all`: all outbound traffic is blocked until explicitly allowed |
| Centralized inspection | One inspection point for outbound web requests from cloud workloads and connected offices |
| Observability | Logging in Cloud Logging; integration with Cloud Trace and OpenTelemetry; Cloud Audit Logs record administrative actions and access requests |
| Autoscaling | Envoy proxy pool size and capacity adjusted automatically per region |
| Service rate limiting | Request-count and client-identity based limits on outbound traffic (for example mTLS principals or source IP addresses); see [policies-and-rules-overview.md](./policies-and-rules-overview.md) |
| End-to-end encryption | Client-proxy tunnels can use TLS; HTTP and HTTPS `CONNECT` supported for client-initiated end-to-end TLS |

### Policy models

| Policy | Use for |
|--------|---------|
| Authorization policy | Recommended when deploying as an Agent Gateway, or for non-agentic traffic that requires frontend mTLS or custom authorization extensions |
| Gateway security policy and rules | Standard non-agentic outbound web traffic; allow or deny by source identity (service account or secure tag), destination hostname and port |
| Service rate limiting policy | Optional; attachable to a gateway that uses either primary policy |

### Deployment modes

| Mode | Description |
|------|-------------|
| Explicit proxy routing mode | Clients are explicitly configured to point at the proxy; the proxy establishes new TCP connections for the client |
| Private Service Connect service attachment mode | Centralizes web proxy deployments across a multi-VPC architecture |
| Next hop mode | Network routing sends outbound traffic to the proxy automatically; no per-client configuration (see [deploy-next-hop.md](./deploy-next-hop.md)) |

### Limitations

| Item | Limitation |
|------|------------|
| IP versions | Only IPv4; IPv6 isn't supported |
| HTTP versions | HTTP/0.9, 1.0, 1.1 and 2.0; HTTP/3 isn't supported |
| Deployment scope | A Secure Web Proxy instance can be deployed only in a host project, not in a service project |

## Notes

- Policy models: You configure only one primary policy model on a single gateway; service rate limiting policies are optional on top of either.
- Request flow: workloads send outbound requests to the central instance; the proxy applies policies to allow or deny; allowed traffic is routed out through Google Cloud infrastructure, typically Cloud NAT, and Cloud DNS resolves external addresses.
- Agent Gateway: for agents running on GKE or Cloud Run, a Secure Web Proxy instance can be deployed as an Agent Gateway; a Secure Web Proxy instance can be associated with one Agent Gateway (see [quotas.md](./quotas.md)).
- Related Google Cloud tools named in the source: frontend mTLS, Certificate Manager (trust anchors and intermediate CAs for client certificate validation), VPC Service Controls (data exfiltration prevention), Cloud Trace.
- The source page has no code block. Snippet taken from https://docs.cloud.google.com/secure-web-proxy/docs/quickstart.
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/quickstart (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- This is Google Cloud Secure Web Proxy (an outbound forward proxy), not a load balancer; load balancing is in the `gcp-load-balancing` skill, and Service Extensions / Media CDN plugins are there as well.

## Related

- [policies-and-rules-overview.md](./policies-and-rules-overview.md)
- [initial-setup-steps.md](./initial-setup-steps.md)
- [quickstart.md](./quickstart.md)
- [tls-inspection-overview.md](./tls-inspection-overview.md)
- [deploy-next-hop.md](./deploy-next-hop.md)
- [quotas.md](./quotas.md)
