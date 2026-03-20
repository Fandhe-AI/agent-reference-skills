# Self-Hosting API リファレンス概要

## 概要

自己ホスティング環境の API は Kong API ゲートウェイを通じて提供される。すべてのリクエストは Kong 経由でルーティングされる。

## API のベース URL

```
http://localhost:8000    # HTTP
https://api.example.com  # 本番（リバースプロキシ経由）
```

## Auth API エンドポイント

GoTrue が提供する認証 API。

### 主要エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | /auth/v1/signup | ユーザー登録 |
| POST | /auth/v1/token?grant_type=password | パスワードログイン |
| POST | /auth/v1/token?grant_type=refresh_token | トークンリフレッシュ |
| POST | /auth/v1/logout | ログアウト |
| GET | /auth/v1/user | 現在のユーザー情報取得 |
| PUT | /auth/v1/user | ユーザー情報更新 |
| POST | /auth/v1/recover | パスワードリセット |
| POST | /auth/v1/otp | OTP 送信 |
| GET | /auth/v1/authorize | OAuth ログイン開始 |
| POST | /auth/v1/verify | OTP / マジックリンク検証 |

### 管理者エンドポイント（Service Role Key 必要）

| メソッド | パス | 説明 |
|---------|------|------|
| GET | /auth/v1/admin/users | ユーザー一覧取得 |
| GET | /auth/v1/admin/users/:id | ユーザー詳細取得 |
| POST | /auth/v1/admin/users | ユーザー作成 |
| PUT | /auth/v1/admin/users/:id | ユーザー更新 |
| DELETE | /auth/v1/admin/users/:id | ユーザー削除 |
| POST | /auth/v1/admin/generate_link | 確認リンク生成 |

### リクエスト例

```bash
# ユーザー登録
curl -X POST "http://localhost:8000/auth/v1/signup" \
  -H "apikey: ${ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# ログイン
curl -X POST "http://localhost:8000/auth/v1/token?grant_type=password" \
  -H "apikey: ${ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# ユーザー情報取得
curl "http://localhost:8000/auth/v1/user" \
  -H "apikey: ${ANON_KEY}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}"
```

## Storage API エンドポイント

### バケット操作

| メソッド | パス | 説明 |
|---------|------|------|
| GET | /storage/v1/bucket | バケット一覧 |
| POST | /storage/v1/bucket | バケット作成 |
| GET | /storage/v1/bucket/:id | バケット詳細 |
| PUT | /storage/v1/bucket/:id | バケット更新 |
| DELETE | /storage/v1/bucket/:id | バケット削除 |
| POST | /storage/v1/bucket/:id/empty | バケットの中身を空にする |

### オブジェクト操作

| メソッド | パス | 説明 |
|---------|------|------|
| POST | /storage/v1/object/:bucket/:path | ファイルアップロード |
| PUT | /storage/v1/object/:bucket/:path | ファイル更新 |
| GET | /storage/v1/object/:bucket/:path | ファイルダウンロード |
| DELETE | /storage/v1/object/:bucket | ファイル削除（バッチ） |
| POST | /storage/v1/object/move | ファイル移動 |
| POST | /storage/v1/object/copy | ファイルコピー |
| POST | /storage/v1/object/list/:bucket | ファイル一覧 |

### 公開 URL

| メソッド | パス | 説明 |
|---------|------|------|
| GET | /storage/v1/object/public/:bucket/:path | 公開ファイルアクセス |
| POST | /storage/v1/object/sign/:bucket/:path | 署名付き URL 生成 |
| GET | /storage/v1/render/image/public/:bucket/:path | 画像変換 |

### リクエスト例

```bash
# ファイルアップロード
curl -X POST "http://localhost:8000/storage/v1/object/avatars/user1.png" \
  -H "apikey: ${ANON_KEY}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: image/png" \
  --data-binary @user1.png

# ファイル一覧
curl -X POST "http://localhost:8000/storage/v1/object/list/avatars" \
  -H "apikey: ${ANON_KEY}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"prefix": "", "limit": 100}'

# 署名付き URL の生成
curl -X POST "http://localhost:8000/storage/v1/object/sign/avatars/user1.png" \
  -H "apikey: ${ANON_KEY}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"expiresIn": 3600}'
```

## Analytics API エンドポイント

### ログクエリ

| メソッド | パス | 説明 |
|---------|------|------|
| GET | /analytics/v1/query | ログクエリ実行 |

### メトリクス

```bash
# ログクエリ
curl "http://localhost:8000/analytics/v1/query" \
  -H "apikey: ${SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
  -G \
  --data-urlencode "query=SELECT * FROM edge_logs LIMIT 10"
```

## 共通ヘッダー

すべてのリクエストに以下のヘッダーが必要。

| ヘッダー | 値 | 説明 |
|---------|-----|------|
| apikey | `${ANON_KEY}` または `${SERVICE_ROLE_KEY}` | API キー |
| Authorization | `Bearer ${TOKEN}` | JWT トークン |
| Content-Type | `application/json` | リクエストボディの形式 |

## Kong の設定

### ルーティング設定

```yaml
# volumes/api/kong.yml
_format_version: "2.1"

services:
  - name: auth-v1
    url: http://auth:9999/
    routes:
      - name: auth-v1-all
        strip_path: true
        paths:
          - /auth/v1/

  - name: rest-v1
    url: http://rest:3000/
    routes:
      - name: rest-v1-all
        strip_path: true
        paths:
          - /rest/v1/

  - name: storage-v1
    url: http://storage:5000/
    routes:
      - name: storage-v1-all
        strip_path: true
        paths:
          - /storage/v1/

  - name: realtime-v1
    url: http://realtime:4000/socket/
    routes:
      - name: realtime-v1-all
        strip_path: true
        paths:
          - /realtime/v1/
```

## ベストプラクティス

- Service Role Key は絶対にクライアント側に公開しない
- 本番環境では必ず HTTPS を使用する
- レート制限を Kong で設定する
- 不要な API エンドポイントは Kong で無効化する

## 関連

- [Management API 概要](../management-api/overview.md) — ホスティング版 API
- [Docker セットアップ](./docker.md) — Docker Compose 設定
