# Projects (v2) Items API

Projects v2 のアイテム（Issue / Pull Request）を管理するエンドポイント。

## エンドポイント

### Organization 所有プロジェクト

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/projectsV2/{project_number}/items` | アイテム一覧取得 |
| POST | `/orgs/{org}/projectsV2/{project_number}/items` | Issue / PR をアイテムとして追加 |
| GET | `/orgs/{org}/projectsV2/{project_number}/items/{item_id}` | 単一アイテムの取得 |
| PATCH | `/orgs/{org}/projectsV2/{project_number}/items/{item_id}` | アイテムの更新 |
| DELETE | `/orgs/{org}/projectsV2/{project_number}/items/{item_id}` | アイテムの削除 |
| GET | `/orgs/{org}/projectsV2/{project_number}/views/{view_number}/items` | 保存済みビューのフィルタを適用したアイテム一覧取得 |

### ユーザー所有プロジェクト

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/users/{username}/projectsV2/{project_number}/items` | アイテム一覧取得 |
| POST | `/users/{username}/projectsV2/{project_number}/items` | Issue / PR をアイテムとして追加 |
| GET | `/users/{username}/projectsV2/{project_number}/items/{item_id}` | 単一アイテムの取得 |
| PATCH | `/users/{username}/projectsV2/{project_number}/items/{item_id}` | アイテムの更新 |
| DELETE | `/users/{username}/projectsV2/{project_number}/items/{item_id}` | アイテムの削除 |

## Related

- [projects.md](./projects.md)
- [fields.md](./fields.md)
