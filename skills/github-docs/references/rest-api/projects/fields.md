# Projects (v2) Fields API

Projects v2 のカスタムフィールドを取得・追加するエンドポイント。

## エンドポイント

### Organization 所有プロジェクト

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/projectsV2/{project_number}/fields` | フィールド一覧取得 |
| POST | `/orgs/{org}/projectsV2/{project_number}/fields` | フィールドの追加 |
| GET | `/orgs/{org}/projectsV2/{project_number}/fields/{field_id}` | 単一フィールドの取得 |

### ユーザー所有プロジェクト

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/users/{username}/projectsV2/{project_number}/fields` | フィールド一覧取得 |
| POST | `/users/{username}/projectsV2/{project_number}/fields` | フィールドの追加 |
| GET | `/users/{username}/projectsV2/{project_number}/fields/{field_id}` | 単一フィールドの取得 |

## Related

- [projects.md](./projects.md)
- [items.md](./items.md)
