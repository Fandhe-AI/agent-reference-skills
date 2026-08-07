# Projects v2 REST API

GitHub Projects（v2）を操作する REST API。プロジェクト本体・フィールド・アイテム・ビュー・ドラフトアイテムをそれぞれ独立したエンドポイント群で管理する。組織所有（`/orgs/{org}/projectsV2/...`）とユーザー所有（`/users/{username}/projectsV2/...`）で対になっている。

## Signature / Usage

```
GET /orgs/{org}/projectsV2/{project_number}
```

## Options / Props

| リソース | メソッド | パス | 説明 |
|------|------|------|------|
| Projects | GET | `/orgs/{org}/projectsV2` | 組織が所有するプロジェクト一覧を取得 |
| Projects | GET | `/orgs/{org}/projectsV2/{project_number}` | 組織所有プロジェクトを取得 |
| Projects | GET | `/users/{username}/projectsV2` | ユーザーが所有するプロジェクト一覧を取得 |
| Projects | GET | `/users/{username}/projectsV2/{project_number}` | ユーザー所有プロジェクトを取得 |
| Fields | GET | `/orgs/{org}/projectsV2/{project_number}/fields` | 組織所有プロジェクトのフィールド一覧を取得 |
| Fields | POST | `/orgs/{org}/projectsV2/{project_number}/fields` | 組織所有プロジェクトにフィールドを追加 |
| Fields | GET | `/orgs/{org}/projectsV2/{project_number}/fields/{field_id}` | 組織所有プロジェクトの特定フィールドを取得 |
| Fields | GET | `/users/{username}/projectsV2/{project_number}/fields` | ユーザー所有プロジェクトのフィールド一覧を取得 |
| Fields | POST | `/users/{username}/projectsV2/{project_number}/fields` | ユーザー所有プロジェクトにフィールドを追加 |
| Fields | GET | `/users/{username}/projectsV2/{project_number}/fields/{field_id}` | ユーザー所有プロジェクトの特定フィールドを取得 |
| Items | GET | `/orgs/{org}/projectsV2/{project_number}/items` | 組織所有プロジェクトのアイテム一覧を取得 |
| Items | POST | `/orgs/{org}/projectsV2/{project_number}/items` | 組織所有プロジェクトに Issue / Pull Request を追加 |
| Items | GET | `/orgs/{org}/projectsV2/{project_number}/items/{item_id}` | 組織所有プロジェクトの特定アイテムを取得 |
| Items | PATCH | `/orgs/{org}/projectsV2/{project_number}/items/{item_id}` | 組織所有プロジェクトのアイテムを更新 |
| Items | DELETE | `/orgs/{org}/projectsV2/{project_number}/items/{item_id}` | 組織所有プロジェクトのアイテムを削除 |
| Items | GET | `/orgs/{org}/projectsV2/{project_number}/views/{view_number}/items` | 保存済みビューのフィルタを適用したアイテム一覧を取得（組織） |
| Items | GET | `/users/{username}/projectsV2/{project_number}/items` | ユーザー所有プロジェクトのアイテム一覧を取得 |
| Items | POST | `/users/{username}/projectsV2/{project_number}/items` | ユーザー所有プロジェクトに Issue / Pull Request を追加 |
| Items | GET | `/users/{username}/projectsV2/{project_number}/items/{item_id}` | ユーザー所有プロジェクトの特定アイテムを取得 |
| Items | PATCH | `/users/{username}/projectsV2/{project_number}/items/{item_id}` | ユーザー所有プロジェクトのアイテムを更新 |
| Items | DELETE | `/users/{username}/projectsV2/{project_number}/items/{item_id}` | ユーザー所有プロジェクトのアイテムを削除 |
| Views | POST | `/orgs/{org}/projectsV2/{project_number}/views` | 組織所有プロジェクトにビュー（table / board / roadmap）を作成 |
| Views | POST | `/users/{user_id}/projectsV2/{project_number}/views` | ユーザー所有プロジェクトにビュー（table / board / roadmap）を作成 |
| Draft items | POST | `/orgs/{org}/projectsV2/{project_number}/drafts` | 組織所有プロジェクトにドラフト Issue アイテムを作成 |
| Draft items | POST | `/user/{user_id}/projectsV2/{project_number}/drafts` | ユーザー所有プロジェクトにドラフト Issue アイテムを作成 |

## Notes

- 対象は **Projects v2**（すべてのパスに `projectsV2` を含む）。クラシック Projects（v1）の REST API エンドポイントは現行ドキュメントに記載がない
- Views の作成エンドポイントは `layout`（`table` / `board` / `roadmap`）、任意のフィルタ、表示フィールドを受け付け、成功時 201 を返す
- Draft items の作成エンドポイントは必須 `title` と任意 `body` を受け付け、成功時 201 を返す

## Related

- [Projects v2 GraphQL API](./graphql-api.md)
