# Storage サーバー設定（Self-Hosting）

## 概要

Supabase Storage はファイルストレージサービスで、自己ホスティング環境ではローカルファイルシステムまたは S3 互換バックエンドにファイルを保存できる。

## Docker Compose での設定

```yaml
storage:
  image: supabase/storage-api:v1.x.x
  restart: unless-stopped
  depends_on:
    db:
      condition: service_healthy
  environment:
    ANON_KEY: ${ANON_KEY}
    SERVICE_KEY: ${SERVICE_ROLE_KEY}
    POSTGREST_URL: http://rest:3000
    PGRST_JWT_SECRET: ${JWT_SECRET}
    DATABASE_URL: postgresql://supabase_storage_admin:${POSTGRES_PASSWORD}@db:5432/postgres
    FILE_SIZE_LIMIT: 52428800  # 50MB
    STORAGE_BACKEND: file      # または s3
    FILE_STORAGE_BACKEND_PATH: /var/lib/storage
    TENANT_ID: stub
    REGION: us-east-1
    GLOBAL_S3_BUCKET: supabase-storage
    IS_MULTITENANT: false
  volumes:
    - storage-data:/var/lib/storage
```

## S3 バックエンド設定

### AWS S3

```bash
STORAGE_BACKEND=s3
GLOBAL_S3_BUCKET=your-s3-bucket-name
REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

### S3 互換サービス（MinIO, Cloudflare R2 等）

```bash
STORAGE_BACKEND=s3
GLOBAL_S3_BUCKET=your-bucket-name
REGION=auto
GLOBAL_S3_ENDPOINT=https://your-s3-endpoint.com
GLOBAL_S3_FORCE_PATH_STYLE=true
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

### MinIO の例

```yaml
# docker-compose.yml に MinIO を追加
minio:
  image: minio/minio:latest
  ports:
    - "9000:9000"
    - "9001:9001"  # Console
  environment:
    MINIO_ROOT_USER: minioadmin
    MINIO_ROOT_PASSWORD: minioadmin
  volumes:
    - minio-data:/data
  command: server /data --console-address ":9001"

storage:
  environment:
    STORAGE_BACKEND: s3
    GLOBAL_S3_BUCKET: supabase-storage
    GLOBAL_S3_ENDPOINT: http://minio:9000
    GLOBAL_S3_FORCE_PATH_STYLE: "true"
    REGION: us-east-1
    AWS_ACCESS_KEY_ID: minioadmin
    AWS_SECRET_ACCESS_KEY: minioadmin
```

## 環境変数一覧

| 変数 | 説明 | デフォルト |
|------|------|-----------|
| STORAGE_BACKEND | バックエンド種別（file / s3） | file |
| FILE_SIZE_LIMIT | 最大ファイルサイズ（バイト） | 52428800 (50MB) |
| FILE_STORAGE_BACKEND_PATH | ローカルストレージのパス | /var/lib/storage |
| GLOBAL_S3_BUCKET | S3 バケット名 | - |
| GLOBAL_S3_ENDPOINT | S3 エンドポイント URL | - |
| GLOBAL_S3_FORCE_PATH_STYLE | パススタイル URL を使用 | false |
| REGION | S3 リージョン | us-east-1 |
| IMAGE_TRANSFORMATION_ENABLED | 画像変換の有効/無効 | true |
| IMGPROXY_URL | imgproxy のURL | http://imgproxy:8080 |

## プロキシ設定（HTTPS）

本番環境では、Storage API の前段にリバースプロキシを配置して HTTPS を終端する。

### Nginx の例

```nginx
# /etc/nginx/conf.d/storage.conf
server {
    listen 443 ssl;
    server_name storage.example.com;

    ssl_certificate /etc/letsencrypt/live/storage.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/storage.example.com/privkey.pem;

    client_max_body_size 50M;  # FILE_SIZE_LIMIT に合わせる

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Caddy の例

```
# Caddyfile
storage.example.com {
    reverse_proxy localhost:8000 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }
}
```

## 画像変換（imgproxy）

画像のリサイズ、フォーマット変換を行う場合は imgproxy を設定する。

```yaml
imgproxy:
  image: darthsim/imgproxy:v3.x.x
  environment:
    IMGPROXY_BIND: ":8080"
    IMGPROXY_LOCAL_FILESYSTEM_ROOT: /
    IMGPROXY_USE_S3: "true"
    IMGPROXY_S3_REGION: ${REGION}
    AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
    AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
```

## ベストプラクティス

- 本番環境では S3 バックエンドを使用する（データの永続性と可用性）
- ファイルサイズ制限を適切に設定する
- HTTPS を必ず有効にする
- バケットのアクセスポリシーを適切に設定する
- 大きなファイルのアップロードにはマルチパートアップロードを使用する
- CDN（CloudFront, Cloudflare 等）を前段に配置してパフォーマンスを向上させる

## 関連

- [Storage 概要](../storage/overview.md) — Storage 機能
- [Docker セットアップ](./docker.md) — Docker Compose 設定
