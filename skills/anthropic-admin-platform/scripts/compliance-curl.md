<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-api, https://platform.claude.com/docs/en/manage-claude/compliance-api-access, https://platform.claude.com/docs/en/api/compliance/activities/list, https://platform.claude.com/docs/en/api/compliance/apps/chats/list, https://platform.claude.com/docs/en/api/compliance/apps/chats/delete, https://platform.claude.com/docs/en/api/compliance/apps/projects/list, https://platform.claude.com/docs/en/api/compliance/apps/projects/delete, https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/list, https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/delete, https://platform.claude.com/docs/en/api/compliance/organizations/list, https://platform.claude.com/docs/en/api/compliance/groups/list / last verified: 2026-08-07 -->

# compliance-curl

Copy-pasteable `curl` calls for the Compliance API (`/v1/compliance/*` on `https://api.anthropic.com`). All examples authenticate with a **Compliance Access Key** (`sk-ant-api01-...`, created in claude.ai → Organization settings → API) in the `x-api-key` header. An Admin API key also works, but only for the Activity Feed (`/v1/compliance/activities`).

```bash
export ANTHROPIC_COMPLIANCE_ACCESS_KEY="sk-ant-api01-..."
```

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

## Groups 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/groups" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

`read:compliance_user_data` スコープが必要（グループメタデータ自体は `read:compliance_org_data`、メンバー一覧は `read:compliance_user_data`）。

## Chats 一覧の取得

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/chats" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

`user_ids[]`（最大10件、省略で組織全体）、`organization_ids[]`、`created_at.gt/gte/lt/lte` でフィルタできる。

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
