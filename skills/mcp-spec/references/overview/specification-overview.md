---
source: https://modelcontextprotocol.io/specification/2026-07-28
---

# Specification Overview

Top page of the MCP specification 2026-07-28: JSON-RPC 2.0 messages between hosts, clients and servers, feature groups, extensions, and security principles.

## Signature / Usage

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28"
    }
  }
}
```

(Request shape taken from the concepts walkthrough in `concepts-architecture.md`; this page itself contains no code.)

The specification defines the authoritative protocol requirements, based on the TypeScript schema in `schema.ts`. The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" are interpreted as described in BCP 14 (RFC 2119, RFC 8174) when, and only when, they appear in all capitals.

MCP provides a standardized way for applications to:

- Share contextual information with language models
- Expose tools and capabilities to AI systems
- Build composable integrations and workflows

The protocol uses JSON-RPC 2.0 messages to establish communication between:

- **Hosts**: LLM applications that initiate connections
- **Clients**: Connectors within the host application
- **Servers**: Services that provide context and capabilities

MCP takes some inspiration from the Language Server Protocol.

## Key Details

| Area | Contents |
|------|----------|
| Base Protocol | JSON-RPC message format; stateless, self-contained requests; per-request capability negotiation |
| Server features | **Resources** (context and data, for the user or the AI model), **Prompts** (templated messages and workflows for users), **Tools** (functions for the AI model to execute) |
| Client features | **Elicitation** (server-initiated requests for additional information from users) |
| Additional utilities | Configuration, progress tracking, cancellation, error reporting |

### Extensions

Beyond the core protocol, MCP defines optional extensions that add modular, specialized, or experimental functionality. Extensions are always opt-in and require explicit support from both client and server, negotiated during initialization. Notable extensions:

- **Tasks**: asynchronous execution of long-running operations, with polling, mid-flight input, and durable handles
- **Skills over MCP**: rich, structured instructions for agent workflows, discovered and consumed through MCP
- **MCP Apps**: interactive UI elements (charts, forms, video players) rendered inline within conversations

## Security and Trust & Safety

Key principles:

1. **User Consent and Control**: users must explicitly consent to and understand all data access and operations; users must retain control over what data is shared and what actions are taken; implementors should provide clear UIs for reviewing and authorizing activities.
2. **Data Privacy**: hosts must obtain explicit user consent before exposing user data to servers; hosts must not transmit resource data elsewhere without user consent; user data should be protected with appropriate access controls.
3. **Tool Safety**: tools represent arbitrary code execution and must be treated with appropriate caution; descriptions of tool behavior such as annotations should be considered untrusted, unless obtained from a trusted server; hosts must obtain explicit user consent before invoking any tool.

While MCP itself cannot enforce these principles at the protocol level, implementors **SHOULD**: build robust consent and authorization flows; provide clear documentation of security implications; implement appropriate access controls and data protections; follow security best practices; consider privacy implications in feature designs.

## Notes

- Target revision: 2026-07-28 (GitHub tag `2026-07-28`). The page text says "negotiated during initialization" for extensions, but `initialize` was removed in 2026-07-28 (see `key-changes.md`); extension negotiation is per-request.
- This skill covers the protocol itself; host-side configuration (for example `.mcp.json`, `mcp_servers`) lives in the anthropic-claude-code-extend, anthropic-api-tools-mcp, anthropic-agent-sdk, anthropic-managed-agents, openai-agents, openai-apps-sdk, windows-ai and hermes-agent skills.

## Related

- [Architecture](./architecture.md)
- [Key Changes (2026-07-28)](./key-changes.md)
- [Deprecated Features](./deprecated-features.md)
- [Architecture Overview (concepts)](./concepts-architecture.md)
