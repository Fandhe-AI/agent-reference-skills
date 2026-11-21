---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview
---

# Agent Gateway overview

Agent Gateway is the governance and security enforcement layer for Google Cloud agent governance: the software-defined network entry and exit point for agentic interactions across managed runtimes, container platforms, IaaS VMs and cross-cloud environments. It enforces least-privilege postures for human-to-agent, agent-to-MCP-tool and agent-to-agent interactions.

## Signature / Usage

### Governed access path in the gateway resource

The access path is set in `googleManaged.governedAccessPath` (`AGENT_TO_ANYWHERE` for egress, `CLIENT_TO_AGENT` for ingress). Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway:

```yaml
name: AGENT_GATEWAY_NAME
protocols:
  - MCP
googleManaged:
  governedAccessPath: AGENT_TO_ANYWHERE
registries:
  - AGENT_REGISTRY_PATH
```

## Options / Props

### Summary of deployment models

| Agent host environment | Supported deployment model | Proxy infrastructure | Documentation |
|---|---|---|---|
| [Agent Runtime and Gemini Enterprise](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview#managed-agw) | Agent Gateway on Google Cloud (Google-managed) | Not applicable (Google-managed) | [Overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-managed-overview) [Set up](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway) |
| [GKE](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview#gke-agw) | Agent Gateway on Google Cloud (Self-managed) | Client-to-Agent: GKE Gateway API Agent-to-Anywhere for cross-cluster and external connectivity: Secure Web Proxy Agent-to-Anywhere for pod-to-pod connectivity: Ambient networking | [Overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/gke-overview) [Set up ingress governance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-gke-ingress) [Set up egress governance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-gke-egress) |
| [Cloud Run](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview#cloud-run-agw) | Agent Gateway on Google Cloud (Self-managed) | Client-to-Agent: Application Load Balancer Agent-to-Anywhere: Secure Web Proxy | [Overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/cloud-run-overview) [Set up](https://docs.cloud.google.com/run/docs/securing/agent-gateway-cloud-run) |
| [Cross-cloud environments](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview#cross-cloud-agw) (non-Google Cloud) | Agent Gateway for cross-cloud | Self-managed Envoy proxy in your environment | [Overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/governance/agent-gateway-cross-cloud/overview) [Set up](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/governance/agent-gateway-cross-cloud/setup) |

## Notes

- Governed access paths:
  - Client-to-Agent (ingress): Secures communications between clients (web apps, developer CLIs, external systems) and hosted agents or MCP tools. Frontend policy enforcement point that authenticates incoming user credentials and inspects prompts (only when a `CONTENT_AUTHZ` authorization policy is attached to the gateway; without one, inbound requests pass through uninspected, and the policy blocks only in enforcement mode, not audit (dry-run) mode).
  - Agent-to-Anywhere (egress): Governs outbound requests from agents to external tools, remote MCP servers, SaaS APIs or downstream agents. Enforces workload-bound identity, destination registry compliance, IAM access policies and payload sanitization.
- Deployment model details:
  - Agent Runtime and Gemini Enterprise: architecture: Google fully manages gateway management services and proxy infrastructure; no proxy setup or maintenance. Key capabilities: Built-in mTLS termination, IAP access policies, Model Armor prompt scanning and DLP, Semantic governance policies.
  - GKE: architecture: You run the proxy infrastructure in your own project. Client-to-Agent traffic enters through a GKE Gateway (a regional Application Load Balancer). Agent-to-Anywhere: GKE ambient networking redirects outbound traffic to Secure Web Proxy without sidecars; agent-to-agent traffic in the cluster is governed by Layer 7 ambient proxies that run per namespace. Key capabilities: Kubernetes-native policy configuration, identity-based access control using each agent's SPIFFE identity, Model Armor screening, TLS inspection of outbound traffic, custom policy engines through extension bindings.
  - Cloud Run: architecture: You run the proxy infrastructure in your own project. Client-to-Agent: regional Application Load Balancer (external or internal) with the gateway attached. Agent-to-Anywhere: Cloud Run ambient networking intercepts outbound traffic and forwards it over Direct VPC egress through an mTLS tunnel carrying the agent's identity to a Secure Web Proxy instance in your VPC network. Key capabilities: Identity-based access policies for outbound calls, IAP authentication and authorization of inbound callers, Model Armor screening in both directions, TLS inspection with a CA you control, one central policy set across many Cloud Run services, custom policy engines through extension bindings.
  - Cross-cloud: architecture: Google Cloud hosts the management plane; you deploy a lightweight Envoy-based Agent Gateway and supporting components into your Kubernetes cluster (for example Amazon EKS, Azure AKS, Red Hat OpenShift, own data centers) and route agent traffic to it. Only configured policy checks (such as Model Armor) call out to Google Cloud. Key capabilities: Agent-to-Anywhere governance, Kubernetes workload credentials exchanged for Agent Identity credentials through workload identity federation, centrally defined policies, Agent Registry and Agent Observability (access logs and traces) extended to outside agents.
- Supported protocols:
  - Model Context Protocol (MCP): Outbound and inbound MCP tool calls over Server-Sent Events (SSE) or HTTP POST requests.
  - Agent-to-Agent (A2A): Inter-agent delegation and task execution APIs.
  - REST and gRPC: HTTP/1.1 and HTTP/2 (gRPC) traffic across GKE, Cloud Run and cross-cloud deployments.
- Limits:
  - Resources governed per Agent Gateway instance: Up to 5,000 resources registered in Agent Registry
- Availability: Agent Gateway is available for agents running on Gemini Enterprise Agent Platform and GKE; Limited Preview for agents running on Cloud Run and on Kubernetes clusters outside Google Cloud (Agent Gateway for cross-cloud).
- For MCP traffic, the gateway inspects JSON-RPC requests to extract tool names and method attributes, enabling tool-level access policies across all deployment models.
- Agent Gateway integrates with the Agent Identity Auth Manager to handle OAuth 2.0 handshakes and Workload Identity Federation (WIF) transparently, terminates mTLS handshakes, and routes via private VPC network attachments to enforce VPC Service Controls perimeter rules.
- Telemetry: Layer 7 and Layer 8 OpenTelemetry traces and access logs go to Cloud Logging and Cloud Trace.
- Reference: gcloud `gcloud network-services agent-gateways` (https://docs.cloud.google.com/sdk/gcloud/reference/network-services/agent-gateways); REST `agentGateways` (https://docs.cloud.google.com/service-mesh/docs/reference/network-services/rest/v1/projects.locations.agentGateways).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway (retrieved 2026-11-21)

## Related

- [govern.md](./govern.md)
- [set-up-agent-gateway.md](./set-up-agent-gateway.md)
- [manage-agent-gateways.md](./manage-agent-gateways.md)
- [iam-overview-uap.md](./iam-overview-uap.md)
