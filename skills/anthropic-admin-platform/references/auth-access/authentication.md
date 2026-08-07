<!-- source: https://platform.claude.com/docs/en/manage-claude/authentication / last verified: 2026-08-07 -->

# Authentication

The Claude API supports three ways to authenticate requests: API keys, Workload Identity Federation (WIF), and App Attest.

## Signature / Usage

```http
POST /v1/messages
x-api-key: YOUR_API_KEY
anthropic-version: 2023-06-01
content-type: application/json
```

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello, Claude"}]
  }'
```

## Options / Props

| Method | Credential | Best for |
|--------|------------|----------|
| API key | Static `sk-ant-api...` secret in the `x-api-key` header | Local development, prototyping, scripts, single-tenant servers |
| Workload Identity Federation | Short-lived bearer token exchanged from your IdP's identity token | Production workloads on AWS/Google Cloud/Azure, CI/CD, Kubernetes |
| App Attest | Short-lived access token issued to a genuine, attested iOS/macOS app install | iOS/macOS apps that call the Claude API directly with no back end |

## Notes

- API keys and WIF grant the same access to Claude API endpoints; App Attest tokens are scoped to a workspace, expire after one hour, and authorize only Messages API calls.
- Key expiration: choose a preset (3h/1d/7d/30d), a custom duration, or **Never** when creating a key at Settings → API keys. Organization max-expiration policy can limit or disable **Never**. Expiration is set at creation time and cannot be changed afterward.
- Anthropic emails the key creator before expiration (7 days before for keys with lifetime ≥14 days, 1 day before for lifetime ≥7 days); shorter-lived keys expire without a warning email.
- An expired key returns `401 authentication_error` on use; expired keys cannot be reactivated, only replaced.
- The Admin API reports each key's `expires_at` on List/Retrieve API Keys endpoints (`null` when no expiration is set).
- Store keys in a secrets manager and revoke any leaked key regardless of expiration.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-reference.md](./wif-reference.md)
