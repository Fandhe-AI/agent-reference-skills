---
source: https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices#state-handle-hijacking
---

# State Handle Hijacking

MCP is stateless and has no protocol-level sessions. Servers that need state spanning multiple requests mint an explicit handle (such as a shopping cart ID or a workflow ID) and receive it back as an ordinary tool argument. State handle hijacking is an attack where an unauthorized party obtains or guesses such a handle and uses it to access or modify another user's state.

## Signature / Usage

Server-side binding recommended by the source: key stored state as `<user_id>:<handle>`, with the user ID derived from the verified token rather than supplied by the client.

```text
<user_id>:<handle>
```

## Notes

- Attack: (1) the server mints a handle for an authenticated user and returns it in a tool result; (2) the attacker obtains or guesses it; (3) the attacker calls tools with the handle as an argument; (4) the server does not check ownership and operates on the original user's state.
- MCP servers that implement authorization **MUST** verify all inbound requests. MCP servers **MUST NOT** treat possession of a state handle as authentication.
- MCP servers **SHOULD** use secure, non-deterministic handles from secure random number generators; avoid predictable or sequential identifiers; expiring handles can also reduce risk.
- MCP servers **SHOULD** bind handles server-side to the authenticated user and reject a handle presented by any other principal.
- Replaced in 2026-07-28: server-assigned `Mcp-Session-Id` session IDs (and the "Session Hijacking" section) are replaced by explicit state handles. Guidance for protocol version `2025-11-25` and earlier is in the 2025-11-25 version of this page under "Session Hijacking".

## Related

- [security-best-practices.md](./security-best-practices.md)
- [token-passthrough.md](./token-passthrough.md)
