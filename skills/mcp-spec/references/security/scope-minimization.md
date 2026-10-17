---
source: https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices#scope-minimization
---

# Scope Minimization

Poor scope design increases token compromise impact, elevates user friction, and obscures audit trails. Implement a progressive, least-privilege scope model.

## Signature / Usage

Incremental elevation uses a targeted `scope` parameter in the `WWW-Authenticate` challenge (parameter form from the source: `scope="..."`), starting from a minimal set such as `mcp:tools-basic`:

```text
WWW-Authenticate: Bearer scope="..."
```

## Options / Props

Server scope-inclusion approaches when issuing a challenge:

| Approach | Includes |
|----------|----------|
| Minimum | Only the scopes required for the specific operation that triggered the error |
| Recommended | Scopes for the current operation plus related scopes that commonly work together, to reduce step-up rounds |
| Extended | Current, related, and any other scopes the server anticipates the client may need soon |

Common mistakes:

- Publishing all possible scopes in `scopes_supported`
- Using wildcard or omnibus scopes (`*`, `all`, `full-access`)
- Bundling unrelated privileges to preempt future prompts
- Returning entire scope catalog in every challenge
- Silent scope semantic changes without versioning
- Treating claimed scopes in token as sufficient without server-side authorization logic

## Notes

- Attack: a token carrying broad scopes (`files:*`, `db:*`, `admin:*`) is obtained via log leakage, memory scraping, or local interception; it was granted up front because the server exposed every scope in `scopes_supported` and the client requested them all.
- Risks: expanded blast radius, higher revocation friction, audit noise, privilege chaining, consent abandonment, scope inflation blindness.
- Mitigation: minimal initial scope set with only low-risk discovery/read operations; incremental elevation via targeted `WWW-Authenticate` challenges; down-scoping tolerance (server should accept reduced scope tokens; auth server MAY issue a subset of requested scopes).
- Server guidance: emit precise scope challenges, avoid returning the full catalog; log elevation events (scope requested, granted subset) with correlation IDs.
- Client guidance: begin with only baseline scopes (or those in the initial `WWW-Authenticate`); cache recent failures to avoid repeated elevation loops for denied scopes.
- When the initial challenge carries no `scope` parameter, the Scope Selection Strategy directs clients to fall back to requesting all scopes in `scopes_supported`, since general-purpose clients lack domain knowledge to choose scopes.
- Scope accumulation across operations is a client-side responsibility: clients **SHOULD** compute the union of previously requested and newly challenged scopes on re-authorization (Step-Up Authorization Flow), keeping servers stateless with respect to client scope sets.
- Hierarchical scopes: a broader scope may imply narrower ones; clients need not deduplicate hierarchically; servers must account for hierarchy when deciding token sufficiency, which does not affect the scopes emitted in a challenge.

## Related

- [token-passthrough.md](./token-passthrough.md)
- [authorization-tutorial.md](./authorization-tutorial.md)
