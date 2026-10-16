---
source: https://modelcontextprotocol.io/extensions/auth/overview
---

# Authorization Extensions

The ext-auth repository contains official MCP extensions that add authorization capabilities beyond the core MCP specification, for scenarios where the standard OAuth 2.0 authorization code flow is not the right fit.

## Signature / Usage

Both extensions use standard extension negotiation: clients declare support in the `extensions` field of `io.modelcontextprotocol/clientCapabilities` in each request's `_meta`, and servers advertise theirs in `server/discover`.

```json
{
  "_meta": {
    "io.modelcontextprotocol/clientCapabilities": {
      "extensions": {
        "io.modelcontextprotocol/oauth-client-credentials": {}
      }
    }
  }
}
```

## Choosing the right extension

| Scenario | Recommended extension |
| --- | --- |
| Background service or daemon accessing an MCP server | OAuth Client Credentials |
| CI/CD pipeline calling MCP tools | OAuth Client Credentials |
| Server-to-server API integration | OAuth Client Credentials |
| Enterprise employees accessing MCP servers at work | Enterprise-Managed Authorization |
| Organization-wide MCP access policy enforcement | Enterprise-Managed Authorization |
| Standard interactive user authorization | Core MCP spec (no extension needed) |

## Notes

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path `/extensions/`).
- Why extensions: machine-to-machine integrations have no human in the loop for interactive consent; enterprise environments have centralized IdPs that enforce policy, and per-server user authorization creates friction and bypasses those controls.
- Both extensions require explicit client support and are never active by default; see the client matrix.
- Specifications live in the ext-auth repository (separate from the core spec).
- Spec requirements for core authorization are in the authorization category; concrete OAuth provider implementations are in better-auth and supabase.

## Related

- [OAuth Client Credentials](./oauth-client-credentials.md)
- [Enterprise-Managed Authorization](./enterprise-managed-authorization.md)
- [Extension Client Matrix](./client-matrix.md)
- [Extensions Overview](./extensions-overview.md)
