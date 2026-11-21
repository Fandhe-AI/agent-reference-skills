---
source: https://docs.cloud.google.com/agent-registry/concepts
---

# Agent Registry key concepts

Agent Registry uses standardized terminology to describe the components, resources and governance mechanisms of an AI ecosystem. The glossary below covers the terms used to register, discover, connect and govern agents, MCP servers, endpoints and skills.

## Signature / Usage

### A2A Agent Card (inline A2A skills)

An A2A skill is listed inline within an agent's `agent-card.json` Agent Card. This sample card carries two A2A skills:

```json
{
  "supportedInterfaces": [
    {
      "url": "https://example.com/mock-travel-agent",
      "protocolBinding": "HTTP+JSON",
      "protocolVersion": "1.0.0"
    }
  ],
  "name": "mock-travel-agent",
  "description": "A mock agent that plans travel itineraries.",
  "version": "1.0.0",
  "capabilities": {
    "streaming": false,
    "pushNotifications": false
  },
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/plain"],
  "skills": [
    {
      "id": "BookFlight",
      "name": "BookFlight",
      "description": "Books a flight to a destination.",
      "tags": ["travel", "booking"]
    },
    {
      "id": "SearchHotels",
      "name": "SearchHotels",
      "description": "Searches for hotels in a destination city.",
      "tags": ["travel", "accommodation"]
    }
  ]
}
```

## Options / Props

### Glossary

| Term | Definition |
|---|---|
| A2A skill | A capability description listed inline within an agent's `agent-card.json` Agent Card. It describes the tasks an agent can perform and its communication interfaces so other agents know when and how to delegate work to it. Agent Registry supports versions `0.3` and `1.0` of the Agent2Agent (A2A) specification. Compare with skill. |
| Agent | An autonomous actor that plans, reasons, invokes tools and collaborates with other agents, defined by its agent identifier and each A2A skill or standalone skill it possesses. A registered agent is a read-only `Agent` discovery resource. |
| Agent principal | The unique IAM identity assigned to an agent (a verifiable Google Cloud service account or managed workload identity such as a SPIFFE ID, bound to the agent's compute runtime), letting it hold permissions, access downstream resources and generate audit logs. Principal strings incorporate the runtime reference path and support three scopes: the engine instance, project-wide principal sets and organization-wide principal sets. |
| Agentic component | A modular functional entity that Agent Registry lets you register, discover and govern. Four primary types: agent, MCP server, endpoint and skill. |
| Agentic workflow | A sequence of steps where an AI agent independently determines tool usage, reasoning and execution paths to accomplish a task. |
| Auth provider | A configuration within Agent Identity auth manager to store, acquire and manage credentials, such as API keys or OAuth tokens, for connecting your agent to external tools and downstream services. |
| Binding | A directed connection between a source agent and a target resource (another agent, an MCP server or an endpoint). Bindings establish explicit delegation pathways and associate an agent with an auth provider for delegated permissions. |
| Data resource | A specific data context or dataset exposed by an MCP server that an agent can access to ground its responses or inform its actions. |
| Discovery | Querying Agent Registry to find a registered agent, MCP tool, endpoint or skill using natural language search, tags or registry identifiers. It focuses on consumption discovery: the capabilities and components your orchestrator agents can invoke at runtime. |
| Endpoint | A target URL, typically a REST API, accessed by an agent. A registered endpoint is a read-only `Endpoint` discovery resource, letting you centrally govern which external services an agent can access. |
| Finding | A detected security issue, such as an instruction vulnerability or an exposed secret, associated with a skill revision, represented as a read-only `Finding` resource. It reports severity, finding class (`VULNERABILITY` or `SECRET`), affected files, line numbers and a description. |
| Governance project | The Google Cloud project where you enable the Agent Registry API to centrally catalog, discover and govern agentic components. In a cross-project management boundary, the management project is the central governance project. |
| Governance scope | The geographic and architectural boundary where Agent Registry resources are registered and governed. See the locations note below. |
| Management boundary (Preview) | The collection of one or more projects defining an administrative perimeter for your AI ecosystem, represented in Resource Manager by the `Boundary` resource and defined on an organization or folder. You can include all child projects or filter them by an optional tag. Agent Registry uses `BoundaryConfig`, `Boundary` and `CapabilityConfig` resources in Resource Manager. |
| Management project (Preview) | A project that serves as the central governance project for a management boundary, centralizing administrative tasks, API endpoints and metadata. You use it to set up Agent Registry, configure billing and quotas, and query aggregated agent and tool registries across member projects. |
| Model Context Protocol (MCP) | The open standard used to connect AI models to data sources and tools, replacing bespoke plugins. |
| MCP server | A program that implements MCP to expose standardized tool and data resource capabilities to an agent. A registered MCP server is a read-only `McpServer` discovery resource. |
| Publisher | An entity that creates and registers a skill, represented as a `Publisher` resource; it establishes the ownership and skill identifier syntax. Google-managed skills use service domains; manually created skills are automatically scoped to the `private` publisher with a `private-` prefix. |
| Registration | Adding an agentic component to Agent Registry. Two models: automatic registration (agents, MCP servers and Google-managed skills from supported runtimes such as Agent Runtime, in the governance project or aggregated across a management boundary) and manual registration (remote or custom agents, MCP servers, endpoints and private standalone skills, including components in separate projects without a boundary, on-premises, external clouds or unsupported runtimes). |
| Registry identifier | A globally unique, immutable Uniform Resource Name (URN) that Agent Registry assigns to a registered component; it stays constant regardless of infrastructure or code changes. |
| Runtime reference | The physical runtime location or compute infrastructure hosting an agent, MCP server or endpoint, represented by the `agentregistry.googleapis.com/system/RuntimeReference` attribute (for example an Agent Runtime reasoning engine, a GKE deployment or a Cloud Run service). It is embedded in the agent principal for IAM policy evaluation. |
| Service resource | The writable resource, with its own resource name, used when you manually register an agent, an MCP server or an endpoint. It stores the component's metadata (type, interface URL, description, protocol binding, capability specification). Create, update or delete it to register, update or unregister without touching the deployment; Agent Registry then creates or updates the corresponding `Agent`, `McpServer` or `Endpoint` discovery resource. Automatically registered components and standalone skills don't use a `Service` resource. |
| Skill | A standalone package registered as a top-level `Skill` resource that extends an agent by providing specific instructions and optional scripts. It contains a `SKILL.md` file, optional scripts and metadata assets, is identified by a skill identifier scoped by a publisher plus a resource name, keeps a default revision pointer and has one or more versioned snapshots. Compare with A2A skill. |
| Skill revision | An immutable versioned snapshot of a skill package, represented as a `SkillRevision` resource, so you can update instructions or scripts without changing the skill identifier or breaking agent dependencies. |
| Tool | A deterministic function provided by an MCP server that an agent can invoke. Each tool in an `McpServer` discovery resource includes an input schema, optional behavioral hints in `annotations` and optional protocol-level metadata in `_meta`; policy hints in `_meta` can mark a tool disabled and configure its human-in-the-loop (HITL) execution mode, which Agent Gateway and Identity-Aware Proxy (IAP) can evaluate. |

## Notes

- Governance scope: by default automatic registration discovers supported workloads deployed in the governance project; with a management boundary the management project aggregates workloads across member projects. Components hosted outside (separate projects without a boundary, on-premises, external clouds) are registered manually in the governance project's registry. When Agent Registry automatically registers a Google or Google Cloud remote MCP server, it creates the `McpServer` resource only in the `global` location, not in individual regions. You can manually register agents, MCP servers and endpoints, and create bindings, in a supported regional location or `global`. Regional gateways can govern and route traffic to both regional resources and `global` MCP servers.
- Management boundary and management project are Preview, subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- Skills here are Agent Registry `Skill` resources with a `SKILL.md` file. They are not Claude Code Agent Skills, and A2A skills are a separate concept (inline in an Agent Card); this is Google's registry, not Claude Code, the Agent SDK or OpenAI Agents.
- Snippet taken from https://docs.cloud.google.com/agent-registry/quickstart-register-agent
- Source: https://docs.cloud.google.com/agent-registry/concepts (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [search-agents-and-tools.md](./search-agents-and-tools.md)
- [quickstart-register-agent.md](./quickstart-register-agent.md)
- [agent-identity-overview.md](./agent-identity-overview.md)
