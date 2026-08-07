# Watching API

リポジトリの Watch（購読）設定を取得・変更するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/subscribers` | リポジトリを Watch しているユーザー一覧取得 |
| GET | `/repos/{owner}/{repo}/subscription` | 認証ユーザーの購読状態取得 |
| PUT | `/repos/{owner}/{repo}/subscription` | 通知設定の変更（Watch / Ignore） |
| DELETE | `/repos/{owner}/{repo}/subscription` | 購読の解除 |
| GET | `/user/subscriptions` | 認証ユーザーが Watch しているリポジトリ一覧取得 |
| GET | `/users/{username}/subscriptions` | 指定ユーザーが Watch しているリポジトリ一覧取得 |

## Related

- [starring.md](./starring.md)
- [notifications.md](./notifications.md)
