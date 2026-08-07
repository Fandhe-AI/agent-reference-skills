# Projects v2 GraphQL API

GraphQL API を使った GitHub Projects（v2）の操作方法。プロジェクト・フィールド・アイテムの取得・作成・更新・削除を GraphQL のクエリ / ミューテーションで行う。

## Signature / Usage

```graphql
query {
  organization(login: "ORGANIZATION") {
    projectV2(number: NUMBER) {
      id
    }
  }
}
```

```graphql
mutation {
  addProjectV2ItemById(input: { projectId: "PROJECT_ID", contentId: "CONTENT_ID" }) {
    item { id }
  }
}
```

## 主なクエリ

| クエリ | 説明 |
|------|------|
| `organization(login).projectV2(number)` / `user(login).projectV2(number)` | 組織・ユーザーが所有するプロジェクトの node ID を取得 |
| `organization(login).projectsV2(first: N)` / `user(login).projectsV2(first: N)` | プロジェクト一覧（`nodes { id title }`）を取得 |
| `node(id: PROJECT_ID) { ... on ProjectV2 { fields(first: N) { nodes } } }` | プロジェクトのフィールド定義を取得。`ProjectV2Field`（通常フィールド）、`ProjectV2SingleSelectField`（`options` を持つ）、`ProjectV2IterationField`（`configuration.iterations` を持つ）を返す |
| `node(id: PROJECT_ID) { ... on ProjectV2 { items(first: N) { nodes } } }` | プロジェクトアイテム一覧を取得。各アイテムは `fieldValues`・`content`（`DraftIssue` / `Issue` / `PullRequest`）・`assignees` を持つ。権限がない場合 `REDACTED` を返す |

## 主なミューテーション

| ミューテーション | 説明 |
|------|------|
| `createProjectV2(input: { ownerId, title })` | 新規プロジェクトを作成。owner の node ID は REST API（例: `/users/{username}`）で取得する |
| `updateProjectV2(input: { projectId, title, public, readme })` | プロジェクトの設定（タイトル・公開設定・README・shortDescription 等）を更新 |
| `addProjectV2ItemById(input: { projectId, contentId })` | Issue / Pull Request をプロジェクトに追加 |
| `addProjectV2DraftIssue(input: { projectId, title, body })` | ドラフト Issue をプロジェクトに追加 |
| `updateProjectV2ItemFieldValue(input: { projectId, itemId, fieldId, value })` | アイテムのフィールド値を更新。`value` は `{ text }` / `{ number }` / `{ date }` / `{ singleSelectOptionId }` / `{ iterationId }` のいずれか |
| `deleteProjectV2Item(input: { projectId, itemId })` | プロジェクトからアイテムを削除 |

標準フィールド（Assignees・Labels・Milestone・Repository）は `updateProjectV2ItemFieldValue` ではなく `addAssigneesToAssignable` / `removeAssigneesFromAssignable` / `addLabelsToLabelable` などの専用ミューテーションで変更する。

## Notes

- 対象は **Projects v2**（`projectsV2` / `ProjectV2*` 型）。クラシック Projects（v1）の GraphQL API は現行ドキュメントに記載がない
- 認証トークンには読み取りのみなら `read:project`、読み書きには `project` スコープが必要。GitHub App が `repositoryId` を指定して `createProjectV2` を呼ぶ場合は `Contents` 権限も必要
- 同一呼び出しでアイテムの追加と更新は同時にできない（`addProjectV2ItemById` → `updateProjectV2ItemFieldValue` の2段階が必要）
- アイテムの変更は `projects_v2_item` webhook イベントでも検知できる

## Related

- [projects](./rest-api.md)
