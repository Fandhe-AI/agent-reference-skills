# Docker Compose セットアップ

## 概要

Supabase はすべてのサービスを Docker Compose で自己ホスティングできる。公式リポジトリの Docker Compose ファイルを使用する。

## クイックスタート

```bash
# リポジトリのクローン
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker

# 環境変数ファイルをコピー
cp .env.example .env

# .env を編集して必須の値を設定
# 詳細は後述の「.env 設定」を参照

# 全サービスの起動
docker compose up -d

# ログの確認
docker compose logs -f

# 停止
docker compose down
```

## 必須サービス

| サービス | コンテナ名 | 説明 | ポート |
|---------|-----------|------|-------|
| Kong | supabase-kong | API ゲートウェイ | 8000 (HTTP), 8443 (HTTPS) |
| GoTrue | supabase-auth | 認証サーバー | 9999 |
| PostgREST | supabase-rest | RESTful API | 3000 |
| Realtime | supabase-realtime | リアルタイムサブスクリプション | 4000 |
| Storage | supabase-storage | ファイルストレージ | 5000 |
| Studio | supabase-studio | 管理ダッシュボード | 3000 |
| PostgreSQL | supabase-db | データベース | 5432 |
| Supavisor | supabase-pooler | 接続プーラー | 6543 |
| Meta | supabase-meta | メタデータ API | 8080 |
| Edge Functions | supabase-functions | Edge Functions ランタイム | 9000 |

## .env 設定

### 必須の環境変数

```bash
# ===== セキュリティ =====
# JWT シークレット（必ず変更すること！最低32文字）
JWT_SECRET=your-super-secret-jwt-token-with-at-least-32-characters

# Anon Key（JWT シークレットから生成）
ANON_KEY=<generated-anon-key>

# Service Role Key（JWT シークレットから生成）
SERVICE_ROLE_KEY=<generated-service-role-key>

# ===== データベース =====
POSTGRES_PASSWORD=your-super-secret-db-password
POSTGRES_HOST=db
POSTGRES_DB=postgres
POSTGRES_PORT=5432

# ===== API =====
SITE_URL=http://localhost:3000
API_EXTERNAL_URL=http://localhost:8000

# ===== Studio =====
STUDIO_DEFAULT_ORGANIZATION=Default Organization
STUDIO_DEFAULT_PROJECT=Default Project
STUDIO_PORT=3000
SUPABASE_PUBLIC_URL=http://localhost:8000

# ===== ダッシュボード認証 =====
DASHBOARD_USERNAME=supabase
DASHBOARD_PASSWORD=your-dashboard-password
```

### JWT キーの生成

```bash
# JWT シークレットから Anon Key と Service Role Key を生成
# https://supabase.com/docs/guides/self-hosting#api-keys のツールを使用

# または jwt.io で手動生成
# Payload (anon):
# {
#   "role": "anon",
#   "iss": "supabase",
#   "iat": 1700000000,
#   "exp": 1900000000
# }
```

## docker-compose.yml の構造

### 主要な設定

```yaml
version: "3.8"

services:
  db:
    image: supabase/postgres:15.1.1.78
    ports:
      - ${POSTGRES_PORT}:5432
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

  kong:
    image: kong:2.8.1
    ports:
      - ${API_PORT:-8000}:8000
      - ${API_SSL_PORT:-8443}:8443
    depends_on:
      - auth
      - rest
      - realtime
      - storage

  auth:
    image: supabase/gotrue:v2.x.x
    depends_on:
      - db
    environment:
      GOTRUE_JWT_SECRET: ${JWT_SECRET}
      # ... その他の設定

  rest:
    image: postgrest/postgrest:v12.x.x
    depends_on:
      - db
    environment:
      PGRST_JWT_SECRET: ${JWT_SECRET}
      PGRST_DB_URI: postgresql://authenticator:${POSTGRES_PASSWORD}@db:5432/postgres

  studio:
    image: supabase/studio:latest
    ports:
      - ${STUDIO_PORT}:3000

volumes:
  db-data:
```

## アップグレード

```bash
# 最新の Docker イメージをプル
docker compose pull

# サービスを再起動
docker compose up -d
```

## ベストプラクティス

- JWT_SECRET と POSTGRES_PASSWORD は必ずデフォルトから変更する
- 本番環境では Studio を外部に公開しない（VPN 経由でアクセス）
- データベースのボリュームは永続化する
- 定期的にバックアップを取得する
- Docker イメージのバージョンを固定する（latest は避ける）
- リバースプロキシ（Nginx, Caddy 等）を前段に配置して HTTPS を終端する

## 関連

- [Auth サーバー設定](./auth.md) — GoTrue 設定
- [Storage サーバー設定](./storage.md) — Storage 設定
- [Functions ランタイム](./functions.md) — Edge Functions 設定
- [アーキテクチャ](../getting-started/architecture.md) — サービス構成
