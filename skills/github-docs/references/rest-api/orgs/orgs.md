# Organizations API

GitHub Organizationの情報を取得・管理するAPI。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/orgs/{org}` | Organization情報を取得 |
| PATCH | `/orgs/{org}` | Organization情報を更新 |
| DELETE | `/orgs/{org}` | Organizationを削除（非同期） |
| GET | `/orgs/{org}/installations` | Orgにインストールされたアプリ一覧を取得 |
| GET | `/user/orgs` | 認証ユーザーの所属Organization一覧を取得 |
| GET | `/users/{username}/orgs` | 指定ユーザーのパブリックOrganization一覧を取得 |
| GET | `/organizations` | 全Organization一覧を取得 |

## Organization情報の取得

```
GET /orgs/{org}
```

Organizationのプロフィール情報を返す。認証ユーザーがメンバーの場合、追加の詳細情報が含まれる。

## Organization情報の更新

```
PATCH /orgs/{org}
```

Organization管理者権限が必要。

### リクエストボディ（主要フィールド）

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| billing_email | string | 請求先メールアドレス |
| company | string | 企業名 |
| email | string | 公開メールアドレス |
| location | string | 所在地 |
| name | string | 表示名 |
| description | string | 説明文 |
| default_repository_permission | string | デフォルトリポジトリ権限（`read`, `write`, `admin`, `none`） |
| members_can_create_repositories | boolean | メンバーによるリポジトリ作成を許可 |
| blog | string | ブログURL |

## Organizationの削除

```
DELETE /orgs/{org}
```

- **非同期処理**: レスポンスは `202 Accepted` を返す
- 削除はバックグラウンドで実行される
- Organization所有者権限が必要

## インストール一覧の取得

```
GET /orgs/{org}/installations
```

Organizationにインストールされたすべての GitHub Appの一覧を返す。

## 認証ユーザーの所属Organization一覧

```
GET /user/orgs
```

認証ユーザーが所属するすべてのOrganization（プライベート含む）を返す。OAuth認証の場合、`user` または `read:org` スコープが必要。

## 指定ユーザーのOrganization一覧

```
GET /users/{username}/orgs
```

指定ユーザーが所属する**パブリックOrganizationのみ**を返す。

## 全Organization一覧の取得

```
GET /organizations
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| since | integer | このOrganization IDより後のOrganizationを返す |
| per_page | integer | 1ページあたりの件数（デフォルト: 30） |

### ページネーションの注意事項

- `/organizations` は `page` パラメータを使用しない
- **`since` パラメータのみ**でページネーションを行う
- レスポンスの `Link` ヘッダーに次のページのURLが含まれる
