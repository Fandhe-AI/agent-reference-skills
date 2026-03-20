# GitHub App 認証フロー

## 3 つの認証方式

GitHub App は用途に応じて 3 つの認証方式を使い分ける。

| 方式 | トークン種別 | 用途 |
|------|------------|------|
| **App として認証** | JWT（JSON Web Token） | App 管理タスク、インストールアクセストークンの生成 |
| **インストールとして認証** | IAT（Installation Access Token） | インストール先リソースへの自動操作 |
| **ユーザーとして認証** | UAT（User Access Token） | ユーザーの代理として操作 |

## 1. App として認証（JWT）

### 用途

- App がインストールされているアカウントの一覧取得
- インストールアクセストークンの生成
- App 自体の管理操作

### JWT の生成

JWT は以下の要素で構成される:

| 要素 | 値 |
|------|-----|
| **アルゴリズム** | RS256 |
| **有効期間** | 最大 **10 分** |
| **iss（発行者）** | App ID |
| **iat（発行日時）** | 現在時刻（UTC エポック秒） |
| **exp（有効期限）** | 発行日時 + 最大 600 秒 |

### JWT 生成例

```ruby
require 'openssl'
require 'jwt'

private_key = OpenSSL::PKey::RSA.new(File.read('private-key.pem'))

payload = {
  iat: Time.now.to_i - 60,        # 発行日時（60秒のクロックドリフト対策）
  exp: Time.now.to_i + (10 * 60), # 有効期限（10分後）
  iss: APP_ID                      # App ID
}

jwt = JWT.encode(payload, private_key, 'RS256')
```

### 使用方法

```
Authorization: Bearer JWT_TOKEN
```

## 2. インストールとして認証（IAT）

### 用途

- ユーザーの入力を伴わない自動化ワークフロー
- インストール先の Organization/ユーザーが所有するリソースへのアクセス
- Bot として操作を実行（例: `@app-name[bot]`）

### インストールアクセストークンの生成

1. JWT で認証する
2. REST API でインストールアクセストークンを要求する

```
POST /app/installations/{installation_id}/access_tokens
Authorization: Bearer JWT_TOKEN
```

### トークンの特徴

| 特徴 | 値 |
|------|-----|
| **有効期間** | 1 時間（自動失効） |
| **権限** | App に設定された権限、またはそのサブセット |
| **リポジトリスコープ** | 全リポジトリまたは指定リポジトリ |
| **更新** | 失効後は新しいトークンを生成する必要がある |

### 使用方法

```
Authorization: token INSTALLATION_ACCESS_TOKEN
```

### リポジトリ・権限の絞り込み

トークン生成時にリポジトリと権限を限定できる:

```json
{
  "repositories": ["repo-name"],
  "permissions": {
    "issues": "write",
    "contents": "read"
  }
}
```

## 3. ユーザーとして認証（UAT）

### 用途

- ユーザーの代理としてアクションを実行
- ユーザーの権限に基づいたアクセスの確保
- 操作をユーザーに帰属させる

### OAuth フロー（Web Application Flow）

1. ユーザーを GitHub の認証ページにリダイレクト

```
GET https://github.com/login/oauth/authorize
  ?client_id=CLIENT_ID
  &redirect_uri=CALLBACK_URL
  &state=RANDOM_STATE
```

2. ユーザーが認証を承認すると、`code` パラメータ付きでコールバック URL にリダイレクトされる

3. `code` をアクセストークンに交換

```
POST https://github.com/login/oauth/access_token
  client_id=CLIENT_ID
  &client_secret=CLIENT_SECRET
  &code=CODE
```

4. アクセストークンを使用して API を呼び出す

```
Authorization: token USER_ACCESS_TOKEN
```

### デバイスフロー

ブラウザアクセスが制限される環境（CLI、IoT など）で使用する。

1. デバイスコードをリクエスト

```
POST https://github.com/login/device/code
  client_id=CLIENT_ID
  scope=SCOPE
```

2. ユーザーに `user_code` を表示し、`verification_uri` にアクセスしてコードを入力するよう指示する

3. ポーリングでトークンを取得

```
POST https://github.com/login/oauth/access_token
  client_id=CLIENT_ID
  device_code=DEVICE_CODE
  grant_type=urn:ietf:params:oauth:grant-type:device_code
```

### トークンの有効期限

- GitHub はユーザーアクセストークンの有効期限設定を強く推奨
- 有効期限切れのトークンはリフレッシュトークンで更新可能

## 認証方式の選択ガイド

| シナリオ | 推奨方式 |
|---------|---------|
| App 管理操作、トークン生成 | JWT（App として認証） |
| CI/CD、自動化、Bot 操作 | IAT（インストールとして認証） |
| ユーザーの代理操作、UI 連携 | UAT（ユーザーとして認証） |

## 公式ドキュメント

- [About authentication with a GitHub App](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app)
