<!-- source: https://platform.claude.com/docs/en/manage-claude/admin-api, https://platform.claude.com/docs/en/api/admin/users, https://platform.claude.com/docs/en/api/admin/invites, https://platform.claude.com/docs/en/api/admin/workspaces, https://platform.claude.com/docs/en/api/admin/api_keys, https://platform.claude.com/docs/en/api/admin/usage_report, https://platform.claude.com/docs/en/api/admin/cost_report, https://platform.claude.com/docs/en/manage-claude/usage-cost-api / last verified: 2026-08-07 -->

# admin-curl

Copy-pasteable `curl` calls for the Admin API (`/v1/organizations/*`). All examples authenticate with an **Admin API key** (`sk-ant-admin...`) in the `x-api-key` header, exported as `ANTHROPIC_ADMIN_KEY`. Every request also requires `anthropic-version: 2023-06-01`.

```bash
export ANTHROPIC_ADMIN_KEY="sk-ant-admin01-..."
```

Admin API keys are created in Claude Console → Settings → Admin keys, by an organization admin/owner. New API keys (regular `sk-ant-api03-...` keys) cannot be created through the Admin API — only through Console.

## 組織情報の取得

```bash
curl "https://api.anthropic.com/v1/organizations/me" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Users 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/users" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

`email` / `limit` / `after_id` / `before_id` クエリパラメータでフィルタ・ページネーションできる。

## User の role 更新

```bash
curl "https://api.anthropic.com/v1/organizations/users/$USER_ID" \
    -H "Content-Type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -d '{"role": "developer"}'
```

`role` は Console/API org では `user` / `developer` / `billing` / `claude_code_user`（`admin` は API 経由で付与不可）。

## User の削除

> **警告**: 削除は組織からのメンバー除外であり取り消せない。admin role を持つメンバーは API 経由で削除できない。

```bash
curl "https://api.anthropic.com/v1/organizations/users/$USER_ID" \
    -X DELETE \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Invite の作成

```bash
curl "https://api.anthropic.com/v1/organizations/invites" \
    -H "Content-Type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -d '{
          "email": "user@emaildomain.com",
          "role": "user"
        }'
```

Organization invite は作成から 21 日で失効し、期限は変更できない。

## Invite 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/invites" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Invite の削除

> **警告**: 削除は取り消せない。`pending` 状態の Invite に対して行う想定操作。

```bash
curl "https://api.anthropic.com/v1/organizations/invites/$INVITE_ID" \
    -X DELETE \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Workspace 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/workspaces" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

`include_archived=true` でアーカイブ済みも含める。

## Workspace の作成

```bash
curl "https://api.anthropic.com/v1/organizations/workspaces" \
    -H "Content-Type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -d '{"name": "x"}'
```

## Workspace の更新

```bash
curl "https://api.anthropic.com/v1/organizations/workspaces/$WORKSPACE_ID" \
    -H "Content-Type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -d '{"name": "renamed-workspace"}'
```

## Workspace のアーカイブ

> **警告**: アーカイブ後は多くのサブリソース操作が 400 を返す（不可逆性・復元手段について公式ドキュメントに明記なし。要確認）。

```bash
curl "https://api.anthropic.com/v1/organizations/workspaces/$WORKSPACE_ID/archive" \
    -X POST \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Workspace Member の追加

```bash
curl "https://api.anthropic.com/v1/organizations/workspaces/$WORKSPACE_ID/members" \
    -H "Content-Type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -d '{"user_id": "'"$USER_ID"'", "workspace_role": "workspace_developer"}'
```

`workspace_role` は `workspace_admin` / `workspace_developer` / `workspace_restricted_developer` / `workspace_user`（`workspace_billing` は create/update で指定不可）。

## API Keys 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/api_keys" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

`status`（`active` / `archived` / `expired` / `inactive`）・`workspace_id`・`created_by_user_id` でフィルタできる。API キーのシークレット値はどのレスポンスにも含まれない。

## API Key のステータス更新

> **警告**: `status` の変更は API キーの利用可否に影響する破壊的操作（挙動の詳細について公式ドキュメントに明記なし。要確認のうえ実施すること）。

```bash
curl "https://api.anthropic.com/v1/organizations/api_keys/$API_KEY_ID" \
    -H "Content-Type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -d '{"status": "archived"}'
```

## Usage Report の取得（Messages API）

```bash
curl "https://api.anthropic.com/v1/organizations/usage_report/messages?\
starting_at=2025-01-08T00:00:00Z&\
ending_at=2025-01-15T00:00:00Z&\
bucket_width=1d" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

`bucket_width` は `1m` / `1h` / `1d`。`group_by[]` に `model` / `workspace_id` / `service_tier` / `context_window` / `inference_geo` / `speed`（beta、`anthropic-beta: fast-mode-2026-02-01` 必須）を指定できる。

## Usage Report の取得（Claude Code）

```bash
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code?starting_at=2025-08-01" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

`starting_at` は `YYYY-MM-DD` の単日指定。

## Cost Report の取得

```bash
curl "https://api.anthropic.com/v1/organizations/cost_report?starting_at=2025-08-01T00:00:00Z" \
    -H "anthropic-version: 2023-06-01" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

`group_by[]` に `description` / `workspace_id` を指定できる。granularity は `1d` のみ。Priority Tier のコストはこのエンドポイントに含まれない（usage エンドポイントの `service_tier: priority` で追跡する）。
