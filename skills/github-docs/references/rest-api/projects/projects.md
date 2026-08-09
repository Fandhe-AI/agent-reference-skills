# Projects (v2) API

Organization・ユーザー所有の Projects v2 を取得するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/projectsV2` | Organization 所有プロジェクトの一覧取得 |
| GET | `/orgs/{org}/projectsV2/{project_number}` | Organization 所有プロジェクトの取得 |
| GET | `/users/{username}/projectsV2` | ユーザー所有プロジェクトの一覧取得 |
| GET | `/users/{username}/projectsV2/{project_number}` | ユーザー所有プロジェクトの取得 |

## Notes

- Projects (classic) とは異なる Projects v2 の REST API
- **プロジェクト本体**（`/orgs/{org}/projectsV2` および `/orgs/{org}/projectsV2/{project_number}`）は読み取り専用。プロジェクトの作成・更新・削除に対応する REST エンドポイントはなく、GraphQL API（`createProjectV2` / `updateProjectV2` / `deleteProjectV2`）を使う
- 一方、**配下のリソースには書き込みエンドポイントがある**。フィールド追加は [fields.md](./fields.md)、アイテムの追加・更新・削除は [items.md](./items.md)、ビューとドラフトアイテムの作成は [Projects v2 REST API](../../projects/rest-api.md) を参照。「Projects v2 の REST API は全面的に読み取り専用」ではない

## Related

- [items.md](./items.md)
- [fields.md](./fields.md)
- [Projects v2 REST API（全エンドポイント一覧）](../../projects/rest-api.md)
- [Projects v2 GraphQL API](../../projects/graphql-api.md)
