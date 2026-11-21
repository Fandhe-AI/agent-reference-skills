---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/iam-overview-uap
---

# IAM Unified Access Policies for Agent Gateway

IAM Unified Access Policies (UAPs) govern communication between agent principals and destination resources (agents, MCP servers, endpoints). They are bound to the project that contains your Agent Gateway instances and evaluated and enforced by Identity-Aware Proxy (IAP). Each rule can have an allow or deny effect and uses CEL conditions.

## Signature / Usage

### CEL condition on an unregistered destination

Adapted (not in the official docs): `destination.unregistered.path.startsWith('/v1/statements')` is replaced with `(destination.unregistered.path == '/v1/statements' || destination.unregistered.path.startsWith('/v1/statements/'))`, so the condition matches `/v1/statements` and the paths below it but not other routes that only start with the same characters (such as `/v1/statementsX`).

```text
destination.unregistered.host == 'finance.example.com' &&
(destination.unregistered.path == '/v1/statements' ||
destination.unregistered.path.startsWith('/v1/statements/'))
```

### Enforcement mode

Use dry-run (`iamEnforcementMode: "DRY_RUN"`, or **Audit-only** in the console) in staging. To enforce, select **Enforce policies** in the console (writes `iamEnforcementMode: "ENFORCED"` when creating a gateway, or removes `iamEnforcementMode` when updating) or remove `iamEnforcementMode` from the authorization extension metadata.

## Options / Props

### CEL attributes: Agent Registry

| Attribute | Value type | Supported values | Supported operations |
|---|---|---|---|
| `destination.is_registered` | Boolean | `true`, `false` | `==`, `!=` |
| `destination.agent_registry.resource_type` | String | `'AGENT'`, `'ENDPOINT'`, `'MCP_SERVER'`, `'SKILL'` | `==`, `!=`, `in` |
| `destination.agent_registry.location` | String | Google Cloud location ID (for example, `'global'`, `'us-central1'`) | `==`, `!=`, `in` |
| `destination.agent_registry.project_id` | String | Google Cloud project ID | `==`, `!=`, `in` |

### CEL attributes: Agent

| Attribute | Value type | Supported values | Supported operations |
|---|---|---|---|
| `destination.agent_registry.agent.name` | String | Agent resource name (`projects/PROJECT_ID/locations/LOCATION/agents/AGENT_NAME`) | `==`, `!=`, `in` |

### CEL attributes: MCP Server

| Attribute | Value type | Supported values | Supported operations |
|---|---|---|---|
| `destination.agent_registry.mcp_server.name` | String | MCP server resource name (`projects/PROJECT_ID/locations/LOCATION/mcpServers/MCP_SERVER_NAME`) | `==`, `!=`, `in` |
| `destination.agent_registry.mcp_server.method` | String | MCP method name (for example, `'tools'`, `'prompts'`, `'resources'`) | `==`, `!=`, `in` |
| `destination.agent_registry.mcp_server.tool.name` | String | Tool name (for example, `'search_code'`, `'execute'`) | `==`, `!=`, `in` |
| `destination.agent_registry.mcp_server.tool.annotations.read_only_hint` | Boolean | `true`, `false` | `==`, `!=` |
| `destination.agent_registry.mcp_server.tool.annotations.destructive_hint` | Boolean | `true`, `false` | `==`, `!=` |
| `destination.agent_registry.mcp_server.tool.annotations.idempotent_hint` | Boolean | `true`, `false` | `==`, `!=` |
| `destination.agent_registry.mcp_server.tool.annotations.open_world_hint` | Boolean | `true`, `false` | `==`, `!=` |
| `destination.agent_registry.mcp_server.prompt.name` | String | Prompt name | `==`, `!=`, `in` |
| `destination.agent_registry.mcp_server.resource.name` | String | Resource name | `==`, `!=`, `in` |

### CEL attributes: Endpoint

| Attribute | Value type | Supported values | Supported operations |
|---|---|---|---|
| `destination.agent_registry.endpoint.name` | String | Endpoint resource name (`projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_NAME`) | `==`, `!=`, `in` |

### CEL attributes: Unregistered destination

| Attribute | Value type | Supported values | Supported operations |
|---|---|---|---|
| `destination.unregistered.host` | String | Hostname (for example, `'google.com'`, `'example.com'`) | `==`, `!=`, `in`, `.startsWith()`, `.endsWith()`, `.contains()` |
| `destination.unregistered.path` | String | Request path (for example, `'/admin'`, `'/api/v1'`) | `==`, `!=`, `in`, `.startsWith()`, `.endsWith()`, `.contains()` |
| `destination.unregistered.method` | String | HTTP method (for example, `'get'`, `'post'`, `'put'`, `'delete'`) | `==`, `!=`, `in` |

## Notes

- Rule components:
  - Agent principals: Agents identified by agent identity (SPIFFE-formatted principal identifiers, for example `principal://agents.global.org-...`; built-in form `principal://TRUST_DOMAIN/AGENT_UNIQUE_IDENTIFIER`); an array of identities or principal sets; Workload Identity Federation principal identifiers also allowed.
  - Rule effect: Allow or deny. Deny rules override allow rules.
  - Destination resources: Registered (registries, MCP servers, agents, endpoints in an Agent Registry registry) or unregistered (specified in CEL with host and path attributes).
  - Conditions: CEL expressions in `conditions` defining target resource scope and access criteria; the effect applies only when the whole expression is `true`.
  - Permissions: `iap.googleapis.com/resources.egressViaIAP` is the permission that UAP rules grant or deny ("to control egress, you add the permission `iap.googleapis.com/resources.egressViaIAP` to a UAP rule"); set it in `operation.permissions` in policy files. A call is allowed only when an allow rule whose condition matches grants it, and deny rules override allow rules (bullets below).
  - Source inconsistency: the source's Permissions section says the permission "is always granted on the destination resource", while the same page says connections are blocked unless an explicit IAM policy grants access. Both are kept here; do not read "always granted" as access without an allow rule.
- The CEL attribute tables are the source's attribute table (flattened in the Markdown twin), split by destination resource type under the same headings as the source.
- UAPs as a feature are in Preview; UAPs that include only the `iap.googleapis.com/resources.egressViaIAP` permission are in General Availability.
- By default all connections are blocked unless an explicit IAM policy grants access. A typical policy has at least one allow rule and one deny rule; deny rules override allow rules.
- The `startsWith()`, `endsWith()` and `contains()` functions (or `STARTS_WITH`, `ENDS_WITH`, `CONTAINS`) are supported only for `destination.unregistered.host` and `destination.unregistered.path`.
- Agent identifiers in URN format (`urn:agent:...`) are used only for inventory and catalog lookup, not in IAM policy bindings.
- In dry-run mode IAP logs disallowed communications to Cloud Audit Logs (`protoPayload.metadata.dryRun=true` and `protoPayload.authorizationInfo.granted=false`) but does not block them.
- If agent registries are regionalized and a rule manages registered resources, the UAP applies only to resources in the registry's region.
- IAP and Context-Aware Access provide default end-to-end authentication with mutual TLS (mTLS) and Demonstrating Proof of Possession (DPoP); agent identities are provisioned with an X.509 certificate and a certificate-bound token. A Principal Access Boundary (PAB) can also be created on the agent identity and enforced through IAP.
- Create only UAPs (IAM v3 policies); in gcloud and REST, UAPs are configured from a JSON-formatted file. The source shows no policy file example; the console offers a Condition builder and a Condition editor.
- Best practices: use dry-run first, least privilege (specific tool names or paths rather than wildcards), deny rules for guardrails, regular audits of Cloud Audit Logs.
- Corrected from the official docs: the example condition was `destination.unregistered.path.startsWith('/v1/statements')`, which also matches any path that begins with those characters (`/v1/statementsX`, `/v1/statements-admin`). The source uses the example to explain CEL sub-expressions; `==` and `.startsWith()` are both supported operations for `destination.unregistered.path` (attribute table below). Use exact matches or a prefix that ends with `/` for path conditions in allow rules.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/iam-overview-uap (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-agent-gateway.md](./set-up-agent-gateway.md)
- [agent-gateway-overview.md](./agent-gateway-overview.md)
- [semantic-governance-overview.md](./semantic-governance-overview.md)
