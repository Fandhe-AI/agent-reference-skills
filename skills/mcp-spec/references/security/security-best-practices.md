---
source: https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices
---

# Security Best Practices

Security considerations, attack vectors, and best practices for MCP implementations. Complements the MCP Authorization specification and is meant to be read alongside OAuth 2.0 security best practices (RFC 9700).

## Signature / Usage

Purpose and scope (verbatim):

> This document provides security considerations for the Model Context Protocol (MCP), complementing the MCP Authorization specification. This document identifies security risks, attack vectors, and best practices specific to MCP implementations.
>
> The primary audience for this document includes developers implementing MCP authorization flows, MCP server operators, and security professionals evaluating MCP-based systems.

Attacks covered on this page, one reference page each unless noted:

| Attack | Page |
|--------|------|
| Confused Deputy Problem | [confused-deputy.md](./confused-deputy.md) |
| Token Passthrough | [token-passthrough.md](./token-passthrough.md) |
| Server-Side Request Forgery (SSRF) | [ssrf.md](./ssrf.md) |
| State Handle Hijacking | [state-handle-hijacking.md](./state-handle-hijacking.md) |
| Local MCP Server Compromise (+ stdio Transport Security in Proxy Scenarios) | [local-server-compromise.md](./local-server-compromise.md) |
| OAuth Authorization URL Validation, Mix-Up Attacks, Localhost Redirect URI Impersonation, CIMD Trust Policies | [oauth-redirect-attacks.md](./oauth-redirect-attacks.md) |
| Scope Minimization | [scope-minimization.md](./scope-minimization.md) |

Each attack section follows the pattern Attack Description, Risks, Mitigation.

Representative example from the page (malicious `WWW-Authenticate` challenge steering an MCP client to a cloud metadata endpoint):

```text
Client->>MCP: Connect to MCP server
MCP-->>Client: 401 + resource_metadata="http://169.254.169.254/..."
Client->>Internal: GET http://169.254.169.254/latest/meta-data/
```

## Notes

- Normative keywords (**MUST**, **SHOULD**) in the linked pages are kept as in the source.
- 2026-07-28: MCP is stateless with no protocol-level sessions, so the former "Session Hijacking" section was replaced by "State Handle Hijacking". The 2025-11-25 page keeps the `Mcp-Session-Id` guidance.
- This page is a tutorial-area document of the specification tag `2026-07-28` and is non-normative; the Authorization specification holds the normative requirements.

## Related

- [confused-deputy.md](./confused-deputy.md)
- [token-passthrough.md](./token-passthrough.md)
- [ssrf.md](./ssrf.md)
- [authorization-tutorial.md](./authorization-tutorial.md)
