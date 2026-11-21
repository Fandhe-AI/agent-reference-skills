---
source: https://docs.cloud.google.com/agent-registry/overview
---

# Agent Registry overview

Agent Registry lets you register, discover and govern agentic components (AI agents, Model Context Protocol (MCP) servers and tools, endpoints, and standalone skills) across your Google Cloud environment. Consolidating them in a single registry reduces fragmented tool access, isolated data and redundant integrations across your AI deployments.

## Signature / Usage

### Enable the Agent Registry API on the governance project

```bash
gcloud services enable agentregistry.googleapis.com \
    --project=PROJECT_ID
```

### Why use Agent Registry

- **Accelerate development:** discover and reuse existing agentic capabilities such as A2A skills, standalone skills and MCP tools across your organization. Query the registry instead of building custom integrations for each new process.
- **Simplify integration:** use the standardized MCP and Agent2Agent (A2A) protocols to locate and connect to functional endpoints and reduce infrastructure management overhead.
- **Support governance:** enforce security through network and access policies and management boundaries across your agentic fleet. Other services can use the identifiers of your agentic components to define permissions and control which agents can access your data, including centralizing agent metadata across multiple Google Cloud projects for governance with Agent Gateway.

## Options / Props

### Governance project configurations

| Configuration | Description |
|---|---|
| Single-project | You deploy your AI workloads and enable Agent Registry in the same Google Cloud project. Agent Registry automatically registers supported workloads deployed in that project, and you can manually register custom components or external endpoints in the same project. |
| Cross-project with a management boundary | You configure a management boundary on a folder or organization in Resource Manager; its associated management project is your central governance project. Agent Registry automatically aggregates supported agents and MCP servers discovered across all member projects in the boundary into the management project. You can also aggregate `Service` and `Binding` resources that you register directly in the management project. |
| Cross-project without a management boundary | You designate a standard Google Cloud project as the governance project where Agent Registry and shared governance services such as Agent Gateway are enabled. Workloads can run in separate projects, on-premises or external clouds; components hosted outside the governance project are *remote* components. Automatic registration only discovers supported workloads deployed in the governance project, so you manually register remote components with `Service` resources. |

## Notes

- A *governance project* is the Google Cloud project where you enable the Agent Registry API to centrally catalog, discover and govern agentic components; you run discovery queries, manage registry resources and configure access and egress policies there.
- In Agent Platform, Agent Registry keeps the authoritative registry of agents, MCP servers, tools, skills and external endpoints that you need to govern, and generates the identifiers and resource names that discovery clients and security policies reference. IAM access policies bind agent principals to the target resources registered in Agent Registry. Verifiable agent principals come from Agent Identity; credentials for external tools are managed through auth providers.
- Agent Gateway is the network enforcement point for agent traffic: "Before routing requests between agents, MCP servers, or external endpoints, Agent Gateway queries Agent Registry, evaluates your configured IAM policies, and applies Model Armor prompt and response inspection." The inspection runs only where you attach a Model Armor authorization policy to the gateway: for Client-to-Agent gateways a `CONTENT_AUTHZ` policy such as Model Armor "is optional, and inbound requests pass through if no authorization policy is attached" (Set up Agent Gateway), and Model Armor blocks requests only with `enforcement_type: "INSPECT_AND_BLOCK"`; `"INSPECT_ONLY"` logs findings "without blocking requests" (Govern; both in agent-gateway-governance).
- The management boundary (cross-project) configuration is Preview (see the concepts page).
- Snippet taken from https://docs.cloud.google.com/agent-registry/setup
- Source: https://docs.cloud.google.com/agent-registry/overview (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts.md](./concepts.md)
- [setup.md](./setup.md)
- [quickstart-register-agent.md](./quickstart-register-agent.md)
- [search-agents-and-tools.md](./search-agents-and-tools.md)
- [agent-identity-overview.md](./agent-identity-overview.md)
