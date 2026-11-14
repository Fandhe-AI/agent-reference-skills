<!-- source: https://code.claude.com/docs/en/self-hosted-environments-identity.md / last verified: 2026-11-14 -->

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
| `act.sub` | claim | Creating user's Anthropic ID, `user:<id>` form; `agent:<id>` when the organization's service identity created the session (e.g. Claude Tag channel sessions). Treat a session as user-created only when it carries the `user:` prefix |
| `act.email` | claim | Creator's email, only when recorded at session creation (a session dispatched from the CLI can lack it). Don't require it; key on `act.sub` or `ccr:account_id` |
| `ccr:account_id` | claim | Creating user's account ID (`act.sub` without `user:`, a `user_...` ID); same value as the spawn-runner hook's `CLAUDE_RUNNER_ACCOUNT_ID` and `--lock-to-account`. Omitted for `agent:` sessions |
| `ccr:session_id` | claim | `cse_...` session ID; same as `CLAUDE_CODE_REMOTE_SESSION_ID`. Replace `cse_` with `session_` to match the lifecycle hooks' `CLAUDE_RUNNER_SESSION_ID` |
| `self-hosted-runner decode-token` | CLI subcommand | Verifies signature + expiry only (not `iss`/`aud`/`ccr:role`); reads token from arg, `CLAUDE_CODE_SESSION_ACCESS_TOKEN`, or stdin. On JWKS fetch/verify failure prints the reason to stderr and exits 1; `--no-verify` only for offline inspection |

## Notes

- A valid token proves Anthropic issued it for a specific session/environment and how it was created — it does **not** prove which process presents it: anything the session runs (tools, MCP servers) can read and present it. Always check `aud` against your environment ID.
- The `act` claim is an RFC 8693 delegation chain: `act.sub`/`act.email` (creating user or service identity) → `act.act.sub` (`ccr:runner:<runner_id>`) → `act.act.act.sub` (`ccr:pool:<pool_id>`) → `act.act.act.act` (identity that created the environment secret). `act.attested_by` is reserved and expected to be absent; don't depend on it.
- Verification checks, in order: `sk-ant-cc-` prefix; `ES256` signature (if the `kid` is not in the cached JWKS, refetch once before rejecting; keys rotate, so don't pin one); `iss` = `ccr`; `aud` contains your `ccpool_...` ID (shown on the Cloud environments admin page; also the `ccr:pool_id` claim); `ccr:role` = `session_worker` (environment secrets, runner tokens, and work orders share the key set but carry other roles); `exp`; then read identity from `act`.
- The runner refreshes the token before expiry and pushes the new value, so one session can present several distinct valid tokens.
- Read identity from `ccr:*` and `act`; the flat `account_email`, `organization_uuid`, `account_uuid` claims are backward-compatibility duplicates that may be removed. Ignore unrecognized claims.
- Self-hosted environments are in public beta on Team and Enterprise plans; an Owner enables them via **Allow self-hosted environments** on the Cloud environments admin page.
- In wrappers, use the runner binary path from `CLAUDE_RUNNER_CLAUDE_BIN` (not a PATH-resolved `claude`) and `jq -re` (not `-r`, which prints `null` and exits 0 on a missing claim). Official example: `"$CLAUDE_RUNNER_CLAUDE_BIN" self-hosted-runner decode-token | jq -re '.act.email // .act.sub'`.
- Source: https://code.claude.com/docs/en/self-hosted-environments-identity.md, fetched 2026-11-14
- Scope anything you derive from the token to a single coding session, not the full user: limit capabilities, bound credential lifetime to `exp` or shorter, and audit by `ccr:session_id`/`jti`. There is no revocation feed — a verified token stays valid until `exp` regardless of what happens to the session.
- `CCR_SESSION_ACCOUNT_EMAIL` (wrapper env var) and the `spawn-runner` hook's `CLAUDE_RUNNER_ACCOUNT_EMAIL`/`CLAUDE_RUNNER_ACCOUNT_ID` are unverified plain variables — fine for labelling, not for auth decisions.

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
- [Self-hosted environments reference](./self-hosted-environments-reference.md)
