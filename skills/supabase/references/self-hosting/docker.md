# Docker Compose セットアップ

## 概要

Supabase はすべてのサービスを Docker Compose で自己ホスティングできる。公式リポジトリの Docker Compose ファイルを使用する。

## クイックスタート

### Linux（自動スクリプト）

15 分以内にセットアップが完了する。Docker インストール、シークレット生成、URL 設定を自動化する。

### その他の OS（手動）

```bash
# リポジトリのクローン（shallow clone）
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

**セキュリティ注意**: デフォルト値のまま起動しないこと。本番環境ではシークレット管理システム（Doppler、HashiCorp Vault 等）の使用を推奨。

## システム要件

| 環境 | RAM | CPU | ストレージ |
|------|-----|-----|-----------|
| 最小構成 | 4GB | 2 コア | 40GB SSD |
| 本番推奨 | 8GB+ | 4+ コア | 80GB+ SSD |

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
| Supavisor | supabase-pooler | 接続プーラー（Session / Transaction モード） | 6543 |
| Meta | supabase-meta | メタデータ API | 8080 |
| Edge Functions | supabase-functions | Edge Functions ランタイム | 9000 |
| Analytics (Logflare) | supabase-analytics | ログ収集・分析（オプション） | 4000 |
| Vector | supabase-vector | ログ転送エージェント（オプション） | — |

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

## S3 ストレージバックエンド

Storage サーバーのバックエンドとして S3 互換ストレージを使用できる。

```bash
# .env の Storage 設定
STORAGE_BACKEND=s3
GLOBAL_S3_BUCKET=your-bucket-name
REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

AWS S3、MinIO、Cloudflare R2 に対応している。

## HTTPS 設定

本番環境ではリバースプロキシ（Nginx、Caddy 等）を前段に配置して HTTPS を終端する。

```bash
# SUPABASE_PUBLIC_URL は HTTPS で設定
SUPABASE_PUBLIC_URL=https://supabase.example.com
API_EXTERNAL_URL=https://supabase.example.com
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
- Supavisor を接続プーラーとして使用する（Session モード: ポート 5432 互換、Transaction モード: ポート 6543）

## 関連

- [Auth サーバー設定](./auth.md) — GoTrue 設定
- [Storage サーバー設定](./storage.md) — Storage 設定
- [Functions ランタイム](./functions.md) — Edge Functions 設定
- [アーキテクチャ](../getting-started/architecture.md) — サービス構成
