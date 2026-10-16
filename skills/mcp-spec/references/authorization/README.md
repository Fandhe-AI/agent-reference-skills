# authorization

| Name | Description | Path |
|------|-------------|------|
| Access Token Usage and Refresh Tokens | Requirements for presenting and validating access tokens on MCP requests, and guidance on refresh tokens. | [access-token-usage.md](./access-token-usage.md) |
| Authorization Error Handling and Scope Challenge | HTTP status codes for authorization errors, `insufficient_scope` challenges at runtime, and the client step-up authorization flow. | [authorization-errors.md](./authorization-errors.md) |
| Authorization Flow Steps | The complete authorization flow, plus the required validation of the authorization response (`iss`, RFC 9207). | [authorization-flow.md](./authorization-flow.md) |
| Authorization Overview | Transport-level authorization for HTTP-based MCP transports, built on an OAuth 2.1 profile. Authorization is **OPTIONAL**. | [authorization-overview.md](./authorization-overview.md) |
| Authorization Security Considerations | Security requirements implementers **MUST** consider when building MCP clients and servers, in addition to OAuth 2.1 security best practices (OAuth 2.1 Section 7). | [authorization-security.md](./authorization-security.md) |
| Authorization Server Discovery | How MCP servers advertise their authorization servers (Protected Resource Metadata, RFC9728) and how clients discover authorization server metadata (RFC 8414 / OpenID Connect Discovery). | [authorization-server-discovery.md](./authorization-server-discovery.md) |
| Client ID Metadata Documents | Client registration where the `client_id` is an HTTPS URL pointing at a JSON document of client metadata; suited to the common case where client and server have no prior relationship. | [client-id-metadata-documents.md](./client-id-metadata-documents.md) |
| Pre-registration and Dynamic Client Registration | The non-CIMD client registration mechanisms: static pre-registration, deprecated Dynamic Client Registration (RFC7591), and the authorization server binding rule. | [client-registration-fallbacks.md](./client-registration-fallbacks.md) |
| Resource Parameter Implementation | MCP clients implement Resource Indicators for OAuth 2.0 (RFC 8707) to name the target MCP server for the token. | [resource-parameter.md](./resource-parameter.md) |
| Scope Selection Strategy | How MCP servers advertise required scopes via `WWW-Authenticate` and how clients choose scopes during the initial authorization handshake. | [scope-selection.md](./scope-selection.md) |
