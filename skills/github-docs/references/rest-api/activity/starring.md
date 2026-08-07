# Starring API

リポジトリの Star（スター）を取得・付与・削除するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/stargazers` | リポジトリをスターしたユーザー一覧取得 |
| GET | `/user/starred` | 認証ユーザーがスターしたリポジトリ一覧取得 |
| GET | `/user/starred/{owner}/{repo}` | 認証ユーザーが特定リポジトリをスター済みか確認 |
| PUT | `/user/starred/{owner}/{repo}` | リポジトリにスターを付与 |
| DELETE | `/user/starred/{owner}/{repo}` | リポジトリのスターを解除 |
| GET | `/users/{username}/starred` | 指定ユーザーがスターしたリポジトリ一覧取得 |

## Related

- [watching.md](./watching.md)
