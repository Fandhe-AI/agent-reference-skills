<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-providers/spiffe / last verified: 2026-08-07 -->

# Use WIF with SPIFFE

Authenticate SPIFFE workloads to the Claude API using JWT-SVIDs from SPIRE or any other SPIFFE-conformant issuer, via the SPIRE OIDC Discovery Provider bridging a trust domain to standard OIDC.

## Signature / Usage

```bash
# Fetch a JWT-SVID and decode it (verify step)
spire-agent api fetch jwt \
  -audience https://api.anthropic.com \
  -socketPath /run/spire/sockets/agent.sock \
  -output json \
  | jq -r '.[0].svids[0].svid' \
  | jq -rR 'split(".")[1] | gsub("-";"+") | gsub("_";"/") | @base64d | fromjson'
```

```text helper.conf
agent_address = "/run/spire/sockets/agent.sock"
cert_dir      = "/var/run/secrets/anthropic.com"
daemon_mode   = true

jwt_svids = [{
    jwt_audience       = "https://api.anthropic.com"
    jwt_svid_file_name = "token"
}]
```

## Options / Props

| Item | Value |
|------|-------|
| `sub` claim | Workload's SPIFFE ID, e.g. `spiffe://<trust-domain>/ns/<namespace>/sa/<service-account>` |
| `aud` claim | Supplied by the workload at fetch time; always `https://api.anthropic.com` for this integration |
| Required (Anthropic-specific) | `iss` and `iat`, neither mandated by the JWT-SVID spec — configure your issuer to populate both (SPIRE: `jwt_issuer` server setting; `iat` is automatic) |

## Notes

- Claude API WIF for SPIFFE/SPIRE; distinct from OpenAI's own `wif-spiffe.md` under `openai-platform-ops`.
- Only JWT-SVIDs are accepted, not X.509-SVIDs. The bridge to OIDC is the SPIRE OIDC Discovery Provider, which publishes `/.well-known/openid-configuration` and a JWKS for the trust domain.
- `spiffe-helper` is a sidecar that fetches and rotates a JWT-SVID to a file; in Kubernetes, share it via a memory-backed `emptyDir` between the helper sidecar and the app container so the SVID never touches disk.
- SPIRE's default JWT-SVID TTL is 5 minutes, requiring continuous rotation; the accepted token lifetime must stay at or below Anthropic's issuer-level max (1 hour by default).
- If the discovery provider is not publicly reachable, register `inline` JWKS instead and update it on every SPIRE key rotation (default rotation cadence = `ca_ttl`, 24 hours) — add new keys before use and remove superseded keys once tokens signed with them expire.
- Scoping warning: `subject_prefix` of `spiffe://<trust-domain>/*` matches every workload in the trust domain; without an `audience` matcher the rule also accepts SVIDs minted for other relying parties. Pin the full SPIFFE ID and always set `audience`.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-kubernetes.md](./wif-kubernetes.md)
- [wif-okta.md](./wif-okta.md)
