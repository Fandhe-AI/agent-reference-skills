---
source: https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices#token-passthrough
---

# Token Passthrough

"Token passthrough" is an anti-pattern where an MCP server accepts tokens from an MCP client without validating that the tokens were properly issued _to the MCP server_ and passes them through to the downstream API.

## Signature / Usage

The rule, verbatim:

```text
MCP servers MUST NOT accept any tokens that were not explicitly issued for the MCP server.
```

A server-side audience check (from the Keycloak tutorial token verifier, see authorization-tutorial) rejects tokens whose `aud` does not match this server:

```typescript
if (!data.aud) {
  throw new Error("Resource indicator (aud) missing");
}
```

## Options / Props

Two critical dimensions:

| Dimension | Description |
|-----------|-------------|
| Audience validation failures | Server does not verify tokens were intended for it (e.g. via the audience claim, RFC9068), so it accepts tokens issued for other services, breaking a fundamental OAuth security boundary |
| Token passthrough | Server also forwards unmodified tokens downstream, which can cause the "confused deputy" problem |

Risks:

| Risk | Detail |
|------|--------|
| Security control circumvention | Rate limiting, request validation, or traffic monitoring that depend on token audience are bypassed if clients use tokens directly with downstream APIs |
| Accountability and audit trail | The MCP server cannot distinguish MCP clients; downstream logs show a different identity; a stolen token can use the server as a proxy for data exfiltration |
| Trust boundary | Downstream trust assumptions about origin or client behavior are broken; a token accepted by multiple services lets one compromised service reach the others |
| Future compatibility | A "pure proxy" may later need security controls; audience separation makes evolution easier |

## Notes

- Token passthrough is explicitly forbidden in the authorization specification.
- Distance line: concrete OAuth provider and token validation implementations are in better-auth and supabase; this page states the spec requirement only.

## Related

- [confused-deputy.md](./confused-deputy.md)
- [authorization-tutorial.md](./authorization-tutorial.md)
- [scope-minimization.md](./scope-minimization.md)
