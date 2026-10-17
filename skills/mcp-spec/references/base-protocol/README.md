# base-protocol

| Name | Description | Path |
|------|-------------|------|
| Backward Compatibility with Initialization-Based Versions | A server supporting both legacy clients (expecting an `initialize` handshake) and modern clients (per-request metadata) **MAY** implement both behaviors. A client interoperating with both kinds of servers detects the server's era with transport-specific mechanics. | [backward-compatibility.md](./backward-compatibility.md) |
| Extension Negotiation | Clients and servers can negotiate support for optional extensions beyond the core protocol. Extensions are advertised in the `extensions` field of capabilities, a map of extension identifiers to per-extension settings objects. | [extension-negotiation.md](./extension-negotiation.md) |
| icons | The `icons` property provides a standardized way for servers to expose visual identifiers for their resources, tools, prompts, and implementations. Icons are represented as an array of `Icon` objects. | [icons.md](./icons.md) |
| JSON Schema Usage | MCP uses JSON Schema for validation throughout the protocol. This page clarifies how JSON Schema is used within MCP messages. | [json-schema-usage.md](./json-schema-usage.md) |
| Messages | All messages between MCP clients and servers **MUST** follow the [JSON-RPC 2.0](https://www.jsonrpc.org/specification) specification. The protocol defines requests, responses (result and error), and notifications. | [messages.md](./messages.md) |
| _meta | The `_meta` property/parameter lets clients and servers attach additional metadata to their interactions. Certain key names are reserved by MCP for protocol-level metadata; implementations **MUST NOT** make assumptions about values at these keys. | [meta-field.md](./meta-field.md) |
| Protocol Version Negotiation | There is no negotiation handshake. Every request carries its protocol version, and the server accepts or rejects each request independently. | [protocol-version-negotiation.md](./protocol-version-negotiation.md) |
| Responses and Error Codes | Responses are sent in reply to requests, containing either the result or error of the operation. Every result carries a required `resultType`. | [responses-and-errors.md](./responses-and-errors.md) |
| Statelessness | MCP is a stateless protocol: all the information needed to process a request is contained in the request itself. A server processes each request independently; no state should be inferred from previous requests, even those on the same connection or stream. | [statelessness.md](./statelessness.md) |
