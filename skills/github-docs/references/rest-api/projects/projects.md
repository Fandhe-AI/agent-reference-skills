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

- Projects (classic) とは異なる Projects v2（GraphQL ベースの新プロジェクト機能）の REST API。読み取り専用のエンドポイントのみ提供
- 作成・更新・削除操作は GraphQL API 経由で行う

## Related

- [items.md](./items.md)
- [fields.md](./fields.md)
