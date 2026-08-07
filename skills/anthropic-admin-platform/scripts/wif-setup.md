<!-- source: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation, https://platform.claude.com/docs/en/manage-claude/wif-admin-api, https://platform.claude.com/docs/en/api/admin/federation_issuers, https://platform.claude.com/docs/en/api/admin/federation_rules / last verified: 2026-08-07 -->

# wif-setup

Copy-pasteable `curl` calls to provision Workload Identity Federation (WIF) resources via the Admin API and to exchange an IdP JWT for a short-lived Claude API token. All write calls require an **OAuth bearer token with `org:admin` scope** (`ANTHROPIC_OAUTH_TOKEN`) — Admin API keys (`x-api-key`) are not accepted on `federation_issuers` / `federation_rules` / `service_accounts` endpoints.

```bash
# Interactive OAuth login with org:admin scope
ant auth login --profile admin --scope "org:admin"
```

## Service Account の作成

```bash
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/service_accounts" \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
  -H "content-type: application/json" \
  -d '{"name": "inference-worker", "organization_role": "developer"}'
```

federated トークンが振る舞う非人間アイデンティティ。org レベルで作成し、Workspace membership で有効化する。

## Federation Issuer の登録

```bash
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/federation_issuers" \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
  -H "content-type: application/json" \
  -d '{"name": "github-actions", "issuer_url": "https://token.actions.githubusercontent.com", "jwks": {"type": "discovery"}}'
```

`name` は `^[a-z0-9-]+$` の 1〜255 文字、org 内でリソース種別ごとに一意。`jwks.type` は `discovery` / `explicit_url` / `inline`（省略時 `discovery`）。GitHub Actions / GitLab / Buildkite / Terraform Cloud / Google のような well-known な共有 issuer は、Federation Rule 側でテナント識別を絞る `match` が必須。

## Federation Rule の作成

```bash
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/federation_rules" \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
  -H "content-type: application/json" \
  -d '{
    "name": "gha-deploy",
    "issuer_id": "fdis_...",
    "match": {"subject_prefix": "repo:my-org/my-repo:ref:refs/heads/main"},
    "target": {"type": "service_account", "service_account_id": "svac_..."},
    "workspace_id": "wrkspc_...",
    "oauth_scope": "workspace:developer",
    "token_lifetime_seconds": 600
  }'
```

Issuer の検証済み JWT を Service Account に紐づける。OAuth 認証で呼び出す場合、作成・変更できるのは `oauth_scope` が `workspace:developer` / `workspace:inference` のルールのみ（`org:admin` など他スコープは Console 操作が必要）。`token_lifetime_seconds` は 60〜86400（デフォルト 3600）。

## Federation Issuer / Rule のアーカイブ

> **警告**: アーカイブはソフトデリートで冪等だが、参照中の Federation Rule が残っている issuer/service account のアーカイブは 400 で拒否される。Rule アーカイブ後も発行済みトークンは有効期限まで失効しない。

```bash
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/federation_issuers/$FEDERATION_ISSUER_ID/archive" \
  -X POST \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"

curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/federation_rules/$FEDERATION_RULE_ID/archive" \
  -X POST \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## JWT のトークン交換（ワークロードからの呼び出し）

```bash
# 1. IdP の JWT を取得する
JWT=$(cat /var/run/secrets/anthropic.com/token)

# 2. 短命な Anthropic アクセストークンに交換する
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

# 3. 取得したアクセストークンで Claude API を呼び出す
curl -sS https://api.anthropic.com/v1/messages \
  -H "authorization: Bearer $ACCESS_TOKEN" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5", "max_tokens": 1024, "messages": [{"role": "user", "content": "Hello, Claude"}]}'
```

発行されるトークンは `sk-ant-oat01-...` 形式。トークン寿命は Rule の `token_lifetime_seconds` と IdP JWT 残存寿命の 2 倍のうち短い方（最小 60 秒）。`ANTHROPIC_API_KEY` が設定されていると federation より優先されるため、移行時は unset する。
