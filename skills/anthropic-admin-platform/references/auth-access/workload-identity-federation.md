<!-- source: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation / last verified: 2026-08-07 -->

# Workload Identity Federation

WIF lets your workloads authenticate to the Claude API with short-lived OIDC tokens instead of long-lived `sk-ant-...` API keys, exchanged from an identity provider (IdP) you already operate.

## Signature / Usage

```bash
# 1. Acquire your IdP's JWT.
JWT=$(cat /var/run/secrets/anthropic.com/token)

# 2. Exchange it for a short-lived Anthropic access token.
RESPONSE=$(curl -sS https://api.anthropic.com/v1/oauth/token \
  -H "content-type: application/json" \
  -d @- <<JSON
{
  "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "assertion": "$JWT",
  "federation_rule_id": "fdrl_...",
  "organization_id": "00000000-0000-0000-0000-000000000000",
  "service_account_id": "svac_...",
  "workspace_id": "wrkspc_..."
}
JSON
)
ACCESS_TOKEN=$(jq -r .access_token <<<"$RESPONSE")

# 3. Call the API with the access token.
curl -sS https://api.anthropic.com/v1/messages \
  -H "authorization: Bearer $ACCESS_TOKEN" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5", "max_tokens": 1024, "messages": [{"role": "user", "content": "Hello, Claude"}]}'
```

## Options / Props

| Concept | ID prefix | Description |
|---------|-----------|--------------|
| Service account | `svac_...` | Non-human identity a federated token acts as; org-level, becomes active in a workspace via membership |
| Federation issuer | `fdis_...` | Registers an OIDC IdP: `issuer_url` (exact `iss` claim) + `jwks` source (`discovery` / `explicit_url` / `inline`) |
| Federation rule | `fdrl_...` | Bridges issuer to service account: `match` (subject_prefix / audience / claims / CEL condition), `target`, `oauth_scope` (default `workspace:developer`), `token_lifetime_seconds` (60–86400, default 3600) |

## Notes

- This is the Claude API's own WIF surface (`POST /v1/oauth/token`, `sk-ant-oat01-...` tokens, `fdrl_`/`fdis_`/`svac_` resource IDs on `platform.claude.com`), distinct from OpenAI's separate Workload Identity Federation implementation under `openai-platform-ops`.
- How it works: (1) IdP issues JWT to workload, (2) SDK exchanges JWT at `POST /v1/oauth/token` (RFC 7523 jwt-bearer grant) for `sk-ant-oat01-...` token, (3) SDK sends token on every request and refreshes before expiry.
- Setup uses the **Connect workload** wizard in Claude Console (Settings → Workload identity): choose provider, fill guided fields, optionally verify issuer, then test the connection (15-minute window).
- Credential precedence (highest to lowest): constructor args → `ANTHROPIC_API_KEY`/`ANTHROPIC_AUTH_TOKEN` → `ANTHROPIC_PROFILE` → federation env vars → active profile. `ANTHROPIC_API_KEY` shadows federation entirely — unset it when migrating.
- Migration path: configure federation in parallel with the API key, confirm via `ant auth status` which credential wins, unset `ANTHROPIC_API_KEY` everywhere, then revoke the key.
- Token lifetime is the lesser of the rule's `token_lifetime_seconds` and twice the remaining IdP JWT lifetime (never less than 60s). SDKs refresh on a two-tier schedule: advisory refresh at expiry−120s, mandatory refresh at expiry−30s.
- Identity providers with dedicated guides: AWS, Google Cloud, Microsoft Entra ID, GitHub Actions, Kubernetes, SPIFFE, Okta.

## Related

- [authentication.md](./authentication.md)
- [wif-admin-api.md](./wif-admin-api.md)
- [wif-reference.md](./wif-reference.md)
- [wif-aws.md](./wif-aws.md)
- [wif-azure.md](./wif-azure.md)
- [wif-gcp.md](./wif-gcp.md)
- [wif-github-actions.md](./wif-github-actions.md)
- [wif-kubernetes.md](./wif-kubernetes.md)
- [wif-okta.md](./wif-okta.md)
- [wif-spiffe.md](./wif-spiffe.md)
