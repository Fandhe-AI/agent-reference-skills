<!-- source: https://platform.claude.com/docs/en/manage-claude/admin-api, https://platform.claude.com/docs/en/api/admin/users, https://platform.claude.com/docs/en/api/admin/invites, https://platform.claude.com/docs/en/api/admin/workspaces, https://platform.claude.com/docs/en/api/admin/api_keys, https://platform.claude.com/docs/en/api/admin/usage_report, https://platform.claude.com/docs/en/api/admin/cost_report, https://platform.claude.com/docs/en/manage-claude/usage-cost-api, https://platform.claude.com/docs/en/manage-claude/spend-limits-api, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/list, https://platform.claude.com/docs/en/manage-claude/plugins-api, https://platform.claude.com/docs/en/manage-claude/opentelemetry/api, https://platform.claude.com/docs/en/api/beta/organization/telemetry_destinations / last verified: 2026-10-17 -->

# admin-curl

Copy-pasteable `curl` calls for the Admin API (`/v1/organizations/*`). All examples authenticate with an **Admin API key** (`sk-ant-admin...`) in the `x-api-key` header, exported as `ANTHROPIC_ADMIN_KEY`. Every request also requires `anthropic-version: 2023-06-01`.

```bash
export ANTHROPIC_ADMIN_KEY="sk-ant-admin01-..."
```

Admin API keys are created in Claude Console → Settings → Admin keys, by an organization admin/owner. New API keys (regular `sk-ant-api03-...` keys) cannot be created through the Admin API — only through Console.

Spend Limits API は主に Claude Enterprise 向け（List Spend Limits は Enterprise 専用）。Set Spend Limit は、Claude Console 組織でも organization / workspace の月次限度額を設定できる（早期アクセス preview、Anthropic のアカウントチームへ申請）。Plugins API は Claude Enterprise 専用。いずれもスコープ付き Admin API key（`read:spend_limits` / `write:spend_limits` / `read:plugins` / `write:plugins`）が必要。公式ガイドの例は環境変数名に `ANTHROPIC_API_KEY` を使うが、本ファイルでは `ANTHROPIC_ADMIN_KEY` に統一している。

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

> **警告**: アーカイブ後は多くのサブリソース操作が 400 を返す。不可逆性・復元手段は公式ドキュメントに明記がないため、復元できない前提で実施すること。

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

> **警告**: `status` の変更は API キーの利用可否に影響する破壊的操作。挙動の詳細は公式ドキュメントに明記がないため、対象キーを確認してから実施すること。

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

## Spend Limits: spend limit 一覧の取得

```bash
curl https://api.anthropic.com/v1/organizations/spend_limits \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: spend-limit-reads-2026-09-26' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

List Spend Limits は beta ヘッダー `anthropic-beta: spend-limit-reads-2026-09-26` が必須で、Claude Enterprise 専用（Claude Console 非対応）。公式 API リファレンスの例は環境変数名に `ANTHROPIC_API_KEY` を使うが、本ファイルでは `ANTHROPIC_ADMIN_KEY` に統一している。`scope_type[]` / `limit`（1〜1000）/ `page` で絞り込める。以降の Spend Limits 節は公式ガイドの例で、`anthropic-beta` ヘッダーを付けていない。

## Spend Limits: 各メンバーの effective spend limit 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/spend_limits/effective?limit=20" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01"
```

`read:spend_limits` スコープが必要。Claude Enterprise 専用。金額は課金通貨の minor unit（USD ならセント）の文字列で、`amount` が `null` なら unlimited。

## Spend Limits: 単一 spend limit の取得

```bash
curl "https://api.anthropic.com/v1/organizations/spend_limits/spl_01AbCdEfGhIjKlMnOpQrSt" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01"
```

## Spend Limits: per-user override の設定

> **警告**: `(scope, period)` をキーとする upsert。同じユーザー・期間の既存 spend limit は上書きされる。`write:spend_limits` スコープが必要。

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/spend_limits" \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{"scope": {"type": "user", "user_id": "user_01AbCdEfGh"}, "amount": "75000"}'
```

Claude Enterprise 組織が指定できる `scope.type` は `user` のみ（seat tier・group・organization のデフォルトは claude.ai の設定画面で変更する）。Claude Console 組織は早期アクセスで `organization` / `workspace` を指定でき、それ以外の組み合わせは 400 になる。

## Spend Limits: per-user override の削除

> **警告**: メンバーは継承された seat tier / group / organization のデフォルトに戻る（なければ unlimited）。`write:spend_limits` スコープが必要。

```bash
curl -X DELETE "https://api.anthropic.com/v1/organizations/spend_limits/spl_01RsTuVwXyZaBcDeFgHiJk" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01"
```

## Spend Limits: increase request 一覧の取得

```bash
curl -g "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests?status[]=pending&limit=50" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01"
```

`-g` は `status[]` のブラケットを curl の glob 展開から守る。`status[]` は `pending` / `approved` / `denied`。

## Spend Limits: increase request の取得

```bash
curl "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests/slir_01AbCdEfGhIjKlMnOpQrSt" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01"
```

## Spend Limits: increase request の承認

> **警告**: 承認すると申請者の per-user spend limit が `amount` で書き込まれ、request は `approved`（終端状態）になる。`suppress_notification: true` を付けないとメンバーへ通知メールが送られる。

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests/slir_01AbCdEfGhIjKlMnOpQrSt/approve" \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{"amount": "75000", "suppress_notification": true}'
```

## Spend Limits: increase request の却下

> **警告**: request は `denied`（終端状態）になる。承認済みの request の却下は拒否される。

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/spend_limit_increase_requests/slir_01AbCdEfGhIjKlMnOpQrSt/deny" \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{"suppress_notification": true}'
```

## Plugins: プラグイン一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugins?owner_type=organization&limit=20" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

Plugins API は beta・Claude Enterprise 専用。全リクエストに `anthropic-beta: ce-plugins-2026-09-01` が必須で、欠落すると 404 が返る（エンドポイントが存在しない場合と同じ応答）。以降の Plugins 節も同じヘッダーを付ける。

## Plugins: プラグインのアップロード

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/plugins" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01" \
    -F "files[]=@dist/sales-toolkit.zip" \
    -F "release_notes=First release"
```

`write:plugins` スコープが必要。body は `multipart/form-data`。アップロード要件は公式ガイドの Upload requirements を参照。

## Plugins: プラグインの取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugins: served version の変更

> **警告**: プラグインが pin される。pin 済みプラグインは現時点で unpin できず（API・claude.ai とも）、以降のアップロードは自動配信されなくなる。変更は返却前にメンバーへ反映される。

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL" \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01" \
    -d '{"served_version_id": "pluginver_01Jd5sK2nQ8wE4rT6yU1iO3p"}'
```

## Plugins: プラグインの削除

> **警告**: プラグインと全 version を完全に削除し、取り消せない（version 単位の削除はない）。`write:plugins` スコープが必要。organization-owned プラグインを可逆的に止めるには、次の 2 点を行う。(1) 組織全体の installation setting を `not_available` にする。(2) `GET /v1/organizations/plugins/{plugin_id}/installation_settings` が返すグループ設定をすべて削除するか `not_available` にする（グループ設定はそのメンバーに対して組織全体の値を上書きするため）。これらの書き込みは並列にせず 1 件ずつ送る。member-owned プラグインは、この API では manual marketplace での削除以外に止める方法がない。

```bash
curl -X DELETE "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugins: version 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL/versions?limit=50" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugins: version の作成

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL/versions" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01" \
    -F "files[]=@dist/sales-toolkit.zip" \
    -F "release_notes=Adds the call-prep command."
```

manual marketplace の organization-owned プラグインのみ対象。アップロードする manifest の `name` はプラグインの `name` と一致する必要がある。

## Plugins: version の取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL/versions/latest" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugins: version のファイルのダウンロード

```bash
curl "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL/versions/pluginver_01Km7tL4pR9xF5sU2zV3jP6q/content" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01" \
    -o plugin_01Hq3vX8kZcN2mB7pR4tY9wL_pluginver_01Km7tL4pR9xF5sU2zV3jP6q.zip
```

URL の `versions/` 直後には version ID を指定する（`latest` は不可）。member-owned プラグインのダウンロードは Compliance API の Activity Feed に `claude_plugin_archive_accessed` として記録される。

## Plugins: installation settings 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL/installation_settings" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugins: installation setting の設定

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL/installation_settings/rbac_group_01F3xQqQzXyWvUtSrQpOnMlK" \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01" \
    -d '{"installation_preference": "available"}'
```

`installation_preference` は `required` / `auto_install` / `available` / `not_available`。URL 末尾の対象には `organization` または `rbac_group_...` の ID を指定する。同一プラグインへの書き込みは並列にせず 1 件ずつ送る（並列時は `503` + `x-should-retry: true` が返りうる）。

## Plugins: installation setting の削除

> **警告**: `organization` target を削除するとプラグインは marketplace のデフォルトを再び継承する。group target を削除するとその group のメンバーは組織全体の値などへフォールバックする。

```bash
curl -X DELETE "https://api.anthropic.com/v1/organizations/plugins/plugin_01Hq3vX8kZcN2mB7pR4tY9wL/installation_settings/rbac_group_01F3xQqQzXyWvUtSrQpOnMlK" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugins: shares 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugins/plugin_01Mr2wP7sU3aJ8vX5cY6nS9t/shares" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugin Marketplaces: 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugin_marketplaces?owner_type=organization" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugin Marketplaces: 取得

```bash
curl "https://api.anthropic.com/v1/organizations/plugin_marketplaces/marketplace_01Lp8uM5qS1yG6tV3aW4kQ7r" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01"
```

## Plugin Marketplaces: デフォルト installation setting の設定

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/plugin_marketplaces/marketplace_01Lp8uM5qS1yG6tV3aW4kQ7r" \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01" \
    -d '{"default_installation_preference": "available"}'
```

marketplace の作成・リポジトリ接続・削除は claude.ai 側で行い、この API にはない。

## Plugin Marketplaces: リポジトリ内容の検証

```bash
curl -X POST "https://api.anthropic.com/v1/organizations/plugin_marketplaces/validate_repository" \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: ce-plugins-2026-09-01" \
    -d '{"repository_url": "https://github.com/example-org/claude-plugins", "ref": "release-candidate"}'
```

`validate_archive`（アーカイブのアップロード検証）の curl は公式ガイドの Validate marketplace content を参照。

## Telemetry Destinations: destination の作成

> **警告**: 作成すると組織の Claude Platform アクティビティのトレースが、指定した外部 OTLP/HTTP エンドポイントへ送信され、送信後のデータは送信先サービスの保持・アクセス制御下に置かれる。Content mode が Full content の場合はプロンプト・応答を含みうるため、例は `metadata_only` を使う。

```bash
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/telemetry_destinations" \
    -H "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: telemetry-destinations-2026-08-11" \
    -H "content-type: application/json" \
    -d '{
      "endpoint_url": "https://gateway.example.com/otlp",
      "headers": {"authorization": "Bearer YOUR_OBSERVABILITY_API_KEY"},
      "traces": {"content_mode": "metadata_only"},
      "workspaces": {"type": "all"}
    }'
```

beta ヘッダー `anthropic-beta: telemetry-destinations-2026-08-11` が必要。Admin API key（または admin としてサインインした CLI）で呼ぶ。`traces.content_mode` は `"metadata_only"`（既定。識別子・タイミング・ステータス・トークン数等のメタデータのみ）と `"content"`（Full content。メッセージ・ツール内容を含む）の 2 値。HIPAA 等のデータ取り扱い制限がある組織は `"content"` を選べず、メタデータのみが送信される。

## Telemetry Destinations: 一覧の取得

```bash
curl "https://api.anthropic.com/v1/organizations/telemetry_destinations" \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

## Telemetry Destinations: 取得

```bash
curl "https://api.anthropic.com/v1/organizations/telemetry_destinations/${DESTINATION_ID}" \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

## Telemetry Destinations: テストスパンの送信

```bash
curl "https://api.anthropic.com/v1/organizations/telemetry_destinations/${DESTINATION_ID}/test" \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

`anthropic.test` スパンが送信先の observability platform に届くことを確認する。

## Telemetry Destinations: 対象 workspace の一覧取得

```bash
curl "https://api.anthropic.com/v1/organizations/telemetry_destinations/${DESTINATION_ID}/workspaces" \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

## Telemetry Destinations: workspace の追加

```bash
curl "https://api.anthropic.com/v1/organizations/telemetry_destinations/${DESTINATION_ID}/workspaces/${WORKSPACE_ID}" \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

OpenTelemetry ガイドでは、個別 workspace の追加・削除は Workspaces が Selected の destination に対する操作として説明されている。

## Telemetry Destinations: workspace の削除

```bash
curl "https://api.anthropic.com/v1/organizations/telemetry_destinations/${DESTINATION_ID}/workspaces/${WORKSPACE_ID}" \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

## Telemetry Destinations: destination の削除

> **警告**: destination を削除するとスパンの送信が止まる。取り消せるかは公式ドキュメントに明記がないため、再作成が必要になる前提で実施すること。

```bash
curl "https://api.anthropic.com/v1/organizations/telemetry_destinations/${DESTINATION_ID}" \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_ADMIN_KEY"
```

destination の更新（`POST /v1/organizations/telemetry_destinations/{id}`）の curl は、公式 API リファレンスの例が空 body のため本ファイルには収録しない。
