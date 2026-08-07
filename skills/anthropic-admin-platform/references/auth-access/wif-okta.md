<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-providers/okta / last verified: 2026-08-07 -->

# Use WIF with Okta

Federate Okta service application identities to the Claude API using the OAuth 2.0 `client_credentials` grant against an Okta **custom authorization server** (issuer form `https://<domain>.okta.com/oauth2/<auth-server-id>`, including the built-in `default` server).

## Signature / Usage

```bash
# 1. Request an access token from Okta (client_credentials with private_key_jwt)
OKTA_JWT=$(curl -sS "https://acme.okta.com/oauth2/aus1a2b3c4d5e6f7g8h9/v1/token" \
  -d grant_type=client_credentials \
  -d scope=anthropic.access \
  -d client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer \
  --data-urlencode client_assertion="$SIGNED_CLIENT_ASSERTION" \
  | jq -r .access_token)

# 2. Exchange the Okta JWT for an Anthropic access token
ACCESS_TOKEN=$(curl -sS https://api.anthropic.com/v1/oauth/token \
  -H "content-type: application/json" \
  -d "{\"grant_type\": \"urn:ietf:params:oauth:grant-type:jwt-bearer\", \"assertion\": \"$OKTA_JWT\", \"federation_rule_id\": \"$ANTHROPIC_FEDERATION_RULE_ID\", \"organization_id\": \"$ANTHROPIC_ORGANIZATION_ID\", \"service_account_id\": \"$ANTHROPIC_SERVICE_ACCOUNT_ID\", \"workspace_id\": \"$ANTHROPIC_WORKSPACE_ID\"}" \
  | jq -r .access_token)
```

## Options / Props

| Item | Value |
|------|-------|
| `sub` claim | Service app's Client ID (e.g. `0oa1b2c3d4e5f6g7h8i9`) |
| `iss` claim | Custom authorization server's issuer URL |
| Audience | `https://api.anthropic.com` (set on the custom authorization server) |

## Notes

- Okta federation is unique to the Claude API surface — `openai-platform-ops` covers Oracle Cloud instead of Okta among its WIF provider pages.
- Tokens issued directly by the Okta **org** authorization server (`/oauth2/v1/token` with no auth-server ID in the path) cannot be validated externally — a custom authorization server is required.
- Setup: create an API Services app integration, configure `private_key_jwt` client auth (register the workload's public JWK; keyless), set the audience to `https://api.anthropic.com`, grant a scope (e.g. `anthropic.access`), and create an access policy allowing the app to request it.
- Unlike platform-native providers (AWS/GCP/Kubernetes), Okta does not expose a token in the runtime; the workload must call Okta's `/v1/token` endpoint itself and pass the result as the identity token.
- Scoping warning: multiple service apps under the same authorization server share one issuer — a rule without `subject_prefix` matches every app on that server. Pin the exact Client ID with no trailing `*`.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-reference.md](./wif-reference.md)
