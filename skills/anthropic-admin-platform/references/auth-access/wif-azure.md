<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-providers/azure / last verified: 2026-08-07 -->

# Use WIF with Microsoft Entra ID

Federate Azure managed identities and Entra Workload Identity with the Claude API so Azure workloads can call Claude without static API keys.

## Signature / Usage

```bash
# Register the token audience (one app registration per tenant)
APP_ID=$(az ad app create --display-name claude-api-federation --query appId -o tsv)
az ad app update --id "$APP_ID" \
  --identifier-uris "api://$APP_ID" \
  --set api.requestedAccessTokenVersion=2
az ad sp create --id "$APP_ID"
```

```bash
# Managed identity path: fetch token from IMDS, exchange for Anthropic token
ENTRA_TOKEN=$(curl -sS -H "Metadata: true" \
  "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=api://<APP_ID>" \
  | jq -r .access_token)

RESPONSE=$(curl -sS https://api.anthropic.com/v1/oauth/token \
  -H "content-type: application/json" \
  -d "{\"grant_type\": \"urn:ietf:params:oauth:grant-type:jwt-bearer\", \"assertion\": \"$ENTRA_TOKEN\", \"federation_rule_id\": \"$ANTHROPIC_FEDERATION_RULE_ID\", \"organization_id\": \"$ANTHROPIC_ORGANIZATION_ID\", \"service_account_id\": \"$ANTHROPIC_SERVICE_ACCOUNT_ID\", \"workspace_id\": \"$ANTHROPIC_WORKSPACE_ID\"}")
```

## Options / Props

| Platform | Token endpoint | Notes |
|----------|-----------------|-------|
| VMs, VM Scale Sets | IMDS `http://169.254.169.254/metadata/identity/oauth2/token` (`Metadata: true`, `api-version=2018-02-01`) | Managed identity token, up to 24h lifetime |
| App Service, Functions, Container Apps | `$IDENTITY_ENDPOINT` (`X-IDENTITY-HEADER`, `api-version=2019-08-01`) | IMDS not reachable here |
| AKS with Entra Workload Identity | Two-hop: `AZURE_FEDERATED_TOKEN_FILE` → `client_credentials` exchange at `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token` | `client_credentials` tokens default to 60–90 min lifetime |

| Claim (v2.0 token) | Meaning |
|---------------------|---------|
| `oid` / `sub` | Managed identity's object ID (identical values) |
| `azp` | Calling identity's client ID |
| `aud` | Audience app registration's client ID (`<APP_ID>`) |
| `tid` | Tenant ID |

## Notes

- Claude API WIF for Microsoft Entra ID; distinct from OpenAI's `wif-microsoft-azure.md` under `openai-platform-ops`.
- Prerequisite: Entra only issues tokens for an audience that exists as an app registration + service principal in the tenant — the "Register the token audience" step is mandatory (`api://<APP_ID>` identifier URI, not `https://`, since Entra restricts `https://` URIs to verified domains).
- Managed identity tokens carry up to 24h between `iat`/`exp` (Azure caches per-resource, no forced refresh); the federation issuer needs `max_jwt_lifetime_seconds: 86400` for this path (the Console wizard defaults to `7500`, edit it after creation). AKS `client_credentials` tokens need only `7500` (~2h) unless a tenant token-lifetime policy or CAE extends them.
- With multiple user-assigned identities on a resource, always pass `client_id=<IDENTITY_CLIENT_ID>` in the token request — omitting it silently falls back to a system-assigned identity if present, or fails outright otherwise.
- If the decoded token's `ver` claim is `1.0` (reused registration without `requestedAccessTokenVersion: 2`): issuer is `https://sts.windows.net/<TENANT_ID>/` instead of `.../v2.0`, `aud` is the identifier URI (not the client ID), and the client ID claim is `appid` instead of `azp`.
- Scoping warning: `audience` + `tid` alone do not identify a specific workload since every identity in the tenant can request a token for the registered audience. Always match `oid` (or `azp`/`appid`) as a full 36-character GUID with no wildcard/partial-GUID `subject_prefix`.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-kubernetes.md](./wif-kubernetes.md)
