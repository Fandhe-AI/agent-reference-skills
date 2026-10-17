<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-api, https://platform.claude.com/docs/en/manage-claude/compliance-api-access, https://platform.claude.com/docs/en/api/compliance/activities/list, https://platform.claude.com/docs/en/api/compliance/apps/chats/list, https://platform.claude.com/docs/en/api/compliance/apps/chats/delete, https://platform.claude.com/docs/en/api/compliance/apps/projects/list, https://platform.claude.com/docs/en/api/compliance/apps/projects/delete, https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/list, https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/delete, https://platform.claude.com/docs/en/api/compliance/organizations/list, https://platform.claude.com/docs/en/api/compliance/groups/list, https://platform.claude.com/docs/en/api/compliance/apps/sessions/local/list, https://platform.claude.com/docs/en/api/compliance/apps/sessions/remote/list, https://platform.claude.com/docs/en/api/compliance/organizations/settings/retrieve, https://platform.claude.com/docs/en/api/compliance/organizations/users/list, https://platform.claude.com/docs/en/api/compliance/organizations/roles/list / last verified: 2026-10-17 -->

# compliance-curl

Copy-pasteable `curl` calls for the Compliance API (`/v1/compliance/*` on `https://api.anthropic.com`). All examples authenticate with a **Compliance Access Key** (`sk-ant-api01-...`, created in claude.ai → Organization settings → API) in the `x-api-key` header. An Admin API key also works, but only for the Activity Feed (`/v1/compliance/activities`).

```bash
export ANTHROPIC_COMPLIANCE_ACCESS_KEY="sk-ant-api01-..."
```

2026-10 追記分（Sessions / Organization settings・users・roles）は、公式 API リファレンスの例が `anthropic-version: 2023-06-01` と `Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY` を使っている。本ファイルでは既存の節と揃えて `x-api-key` に `ANTHROPIC_COMPLIANCE_ACCESS_KEY` を渡す形にしている。両ヘッダー形式の差異は公式ドキュメントに説明がない。

## Activity Feed の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/activities?limit=10&order=desc&organization_ids=$ORG_UUID" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

`activity_types[]` / `exclude_activity_types[]`（併用不可）、`actor_ids[]`、`created_at.gt/gte/lt/lte`、`after_id`/`before_id` でフィルタ・ページネーションできる。漏洩キーの監査には `activity_types[]=compliance_api_accessed` で `actor.api_key_id` を確認する。

## Organizations 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

サブリソース（roles / settings / users / chats / projects の `organization_ids` フィルタ）を呼ぶ前に、まずここで `org_uuid` を列挙する。

## Organization settings の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations/${ORGANIZATION_ID}/settings" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Organization users 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations/${ORG_UUID}/users" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Organization roles 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations/${ORG_UUID}/roles" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Groups 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/groups" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

`read:compliance_org_data` スコープが必要（メンバー一覧 `/v1/compliance/groups/{group_id}/members` のみ `read:compliance_user_data`）。

## Chats 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/chats" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

`organization_ids[]` / `user_ids[]`（最大 10 件）/ `created_at.gt/gte/lt/lte` / `updated_at.*`（組織全体の照会では `order_by=updated_at` が必要）/ `limit`（既定 100、最大 1000）/ `after_id` / `before_id` でフィルタ・ページネーションできる。

## Chat メッセージ履歴の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/chats/$CLAUDE_CHAT_ID/messages" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Chat の削除

> **警告**: 破壊的かつ不可逆な操作。チャットと関連する全メッセージ・ファイルをハード削除する。`delete:compliance_user_data` スコープが必要。

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/chats/$CLAUDE_CHAT_ID" \
  -X DELETE \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Projects 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/projects" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Project の削除

> **警告**: 破壊的かつ不可逆な操作。プロジェクト配下のドキュメント・ロール・ナレッジベース・同期ソースを全てハード削除する。関連する chats が残っている場合は 409 を返す（先に apps/chats/delete で削除する）。

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/projects/$PROJECT_ID" \
  -X DELETE \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Code Artifacts 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/code/artifacts" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

チャット内 Artifact（`apps/artifacts`）とは別リソース。作成時刻ではなく識別子順にソートされる。

## Code Artifact の削除

> **警告**: 破壊的かつ不可逆な操作。Code Artifact とその全バージョンを永久に削除する。200 は削除開始を意味し、コンテンツ除去は非同期に完了する。

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/code/artifacts/$ARTIFACT_ID" \
  -X DELETE \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Local sessions 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/sessions/local" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

`created_at` 降順・forward-only のページネーション（`next_page` を `page` に渡す）。`created_at.gt/gte/lt/lte` と `updated_at.gte`（RFC 3339、UTC オフセット必須）、`limit`（既定 100、最大 500）で絞り込める。

## Remote sessions 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/sessions/remote" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

メタデータのみを新しい順に返す。`organization_ids[]`（最大 500）/ `user_ids[]`（最大 10）/ `created_at.*` / `limit`（既定 100、最大 500）/ `page` で絞り込める。
