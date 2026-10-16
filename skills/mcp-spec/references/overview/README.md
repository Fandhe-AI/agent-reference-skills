# overview

| Name | Description | Path |
|------|-------------|------|
| Architecture | Client-host-server architecture: each host runs multiple clients, each client talks to exactly one server. MCP is stateless; every request carries its own protocol version and capabilities. | [architecture.md](./architecture.md) |
| Architecture Overview (concepts) | Learning-guide overview of MCP scope, participants, layers (data and transport), primitives, notifications, and a worked discover / tools / subscription exchange. | [concepts-architecture.md](./concepts-architecture.md) |
| Understanding MCP Clients | Learning-guide explanation of client features offered to servers: elicitation, roots (deprecated) and sampling (deprecated), delivered via Multi Round-Trip Requests. | [concepts-client.md](./concepts-client.md) |
| Understanding MCP Servers | Learning-guide explanation of the three server building blocks (tools, resources, prompts), their protocol operations, and who controls each. | [concepts-server.md](./concepts-server.md) |
| Versioning (concepts) | Version identifiers (`YYYY-MM-DD`), revision states (Draft / Current / Final), feature states, and per-request version negotiation. | [concepts-versioning.md](./concepts-versioning.md) |
| Deprecated Features | Registry of specification features currently in the Deprecated state under the feature lifecycle and deprecation policy (SEP-2596). | [deprecated-features.md](./deprecated-features.md) |
| Feature Lifecycle | Policy for how individual MCP specification features move through Active, Deprecated, and Removed states (adopted via SEP-2596). | [feature-lifecycle.md](./feature-lifecycle.md) |
| Key Changes (2026-07-28) | Changes in the 2026-07-28 revision relative to the previous revision 2025-11-25. | [key-changes.md](./key-changes.md) |
| Specification Overview | Top page of the MCP specification 2026-07-28: JSON-RPC 2.0 messages between hosts, clients and servers, feature groups, extensions, and security principles. | [specification-overview.md](./specification-overview.md) |
