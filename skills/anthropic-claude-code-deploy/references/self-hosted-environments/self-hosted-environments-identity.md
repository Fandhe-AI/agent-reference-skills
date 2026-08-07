<!-- source: https://code.claude.com/docs/en/self-hosted-environments-identity.md / last verified: 2026-08-07 -->

# Verify session identity in self-hosted environments

How to cryptographically verify the `CLAUDE_CODE_SESSION_ACCESS_TOKEN` JWT that every self-hosted session receives, so internal services on your network can trust and identify requests originating from a session.

## Signature / Usage

```typescript
import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(
  new URL("https://api.anthropic.com/v1/code/.well-known/jwks.json")
);
const { payload } = await jwtVerify(raw.slice("sk-ant-cc-".length), JWKS, {
  issuer: "ccr",
  audience: "ccpool_...",     // your environment ID
  algorithms: ["ES256"],
});
// also check payload["ccr:role"] === "session_worker"
```

```bash
# Inside a wrapper script, no JWT library needed:
"$CLAUDE_RUNNER_CLAUDE_BIN" self-hosted-runner decode-token | jq -re '.act.sub'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN` | env var | `sk-ant-cc-<JWT>`; strip the prefix before passing to a JWT library. `sk-ant-si-` tokens are Anthropic-hosted sessions signed by a different key set — reject those |
| `https://api.anthropic.com/v1/code/.well-known/jwks.json` | JWKS endpoint | Public, unauthenticated; `Cache-Control: public, max-age=300` — safe to cache and refetch every 5 min |
| `iss` | claim | Must equal `ccr` |
| `aud` | claim (array) | Must contain your environment ID (`ccpool_...`); also always contains `anthropic-api` |
| `ccr:role` | claim | Must equal `session_worker` for session tokens |
| `exp` | claim | 4h default lifetime, 8h max; runner refreshes before expiry |
| `act.sub` | claim | Creating user's Anthropic ID, `user:<id>` form; absent (no `user:` prefix) for org-service-key sessions |
| `self-hosted-runner decode-token` | CLI subcommand | Verifies signature + expiry only (not `iss`/`aud`/`ccr:role`); reads token from arg, `CLAUDE_CODE_SESSION_ACCESS_TOKEN`, or stdin |

## Notes

- A valid token proves Anthropic issued it for a specific session/environment and how it was created — it does **not** prove which process presents it: anything the session runs (tools, MCP servers) can read and present it. Always check `aud` against your environment ID.
- The `act` claim is an RFC 8693 delegation chain: `act.sub`/`act.email`/`act.attested_by.sub` (creating user, prefer the SSO subject) → `act.act.sub` (runner) → `act.act.act.sub` (environment) → `act.act.act.act` (identity that created the environment secret).
- Scope anything you derive from the token to a single coding session, not the full user: limit capabilities, bound credential lifetime to `exp` or shorter, and audit by `ccr:session_id`/`jti`. There is no revocation feed — a verified token stays valid until `exp` regardless of what happens to the session.
- `CCR_SESSION_ACCOUNT_EMAIL` (wrapper env var) and the `spawn-runner` hook's `CLAUDE_RUNNER_ACCOUNT_EMAIL`/`CLAUDE_RUNNER_ACCOUNT_ID` are unverified plain variables — fine for labelling, not for auth decisions.

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
- [Self-hosted environments reference](./self-hosted-environments-reference.md)
