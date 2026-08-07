# Copilot Spaces API

Organization・ユーザー所有の Copilot Spaces を CRUD 操作するエンドポイント。

## エンドポイント

### Organization 所有

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/copilot-spaces` | Copilot Spaces 一覧取得 |
| POST | `/orgs/{org}/copilot-spaces` | Copilot Space の作成 |
| GET | `/orgs/{org}/copilot-spaces/{space_number}` | 単一 Space の取得 |
| PUT | `/orgs/{org}/copilot-spaces/{space_number}` | Space の更新 |
| DELETE | `/orgs/{org}/copilot-spaces/{space_number}` | Space の削除 |

### ユーザー所有

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/users/{username}/copilot-spaces` | Copilot Spaces 一覧取得 |
| POST | `/users/{username}/copilot-spaces` | Copilot Space の作成 |
| GET | `/users/{username}/copilot-spaces/{space_number}` | 単一 Space の取得 |
| PUT | `/users/{username}/copilot-spaces/{space_number}` | Space の更新 |
| DELETE | `/users/{username}/copilot-spaces/{space_number}` | Space の削除 |

## Related

- [user-management.md](./user-management.md)
