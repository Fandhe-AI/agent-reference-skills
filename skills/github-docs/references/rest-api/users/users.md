# Users API

GitHubユーザーの情報を取得・更新するAPI。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/user` | 認証ユーザーの情報を取得 |
| PATCH | `/user` | 認証ユーザーの情報を更新 |
| GET | `/users/{username}` | 指定ユーザーのパブリック情報を取得 |
| GET | `/users` | 全ユーザー一覧を取得 |
| GET | `/users/{username}/hovercard` | ユーザーのホバーカード情報を取得 |

## 認証ユーザーの取得

```
GET /user
```

認証されたユーザー自身の詳細情報を返す。OAuth認証の場合、スコープによって返されるフィールドが異なる。

## 認証ユーザーの更新

```
PATCH /user
```

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| name | string | 表示名 |
| email | string | 公開メールアドレス（`""` で削除可能） |
| blog | string | ブログURL |
| company | string | 所属企業 |
| location | string | 所在地 |
| bio | string | プロフィールの自己紹介文 |
| hireable | boolean | 雇用可能かどうか |
| twitter_username | string | TwitterユーザーID |

## 指定ユーザーの取得

```
GET /users/{username}
```

パブリックなプロフィール情報のみ返す。認証ユーザー自身の場合は `/user` を使用すると追加情報（`private_gists`, `total_private_repos` 等）が取得できる。

## ユーザー一覧の取得

```
GET /users
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| since | integer | このユーザーIDより後のユーザーを返す |
| per_page | integer | 1ページあたりの件数（デフォルト: 30） |

### ページネーションの注意事項

- `/users` は `page` パラメータを使用しない
- **`since` パラメータのみ**でページネーションを行う
- レスポンスの `Link` ヘッダーに次のページのURLが含まれる

## ホバーカードの取得

```
GET /users/{username}/hovercard
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| subject_type | string | コンテキストの種類（`organization`, `repository`, `issue`, `pull_request`） |
| subject_id | string | コンテキストのID |

OAuth認証の場合、`read:user` スコープが必要。
