# Auth サーバー設定（Self-Hosting）

## 概要

Supabase Auth は GoTrue（Go 製の認証サーバー）で動作する。自己ホスティング環境では環境変数で設定する。

## GoTrue 環境変数

### 基本設定

```bash
# API 設定
GOTRUE_API_HOST=0.0.0.0
GOTRUE_API_PORT=9999
API_EXTERNAL_URL=https://auth.example.com

# サイト URL（リダイレクト先）
GOTRUE_SITE_URL=https://app.example.com
GOTRUE_URI_ALLOW_LIST=https://app.example.com,https://staging.example.com

# データベース接続
GOTRUE_DB_DRIVER=postgres
GOTRUE_DB_DATABASE_URL=postgresql://supabase_auth_admin:${POSTGRES_PASSWORD}@db:5432/postgres

# レート制限
GOTRUE_RATE_LIMIT_HEADER=X-Forwarded-For
GOTRUE_RATE_LIMIT_EMAIL_SENT=100
```

### メール設定

```bash
# SMTP 設定
GOTRUE_SMTP_HOST=smtp.example.com
GOTRUE_SMTP_PORT=587
GOTRUE_SMTP_USER=noreply@example.com
GOTRUE_SMTP_PASS=smtp-password
GOTRUE_SMTP_SENDER_NAME=MyApp
GOTRUE_SMTP_ADMIN_EMAIL=admin@example.com

# メール認証設定
GOTRUE_MAILER_AUTOCONFIRM=false
GOTRUE_MAILER_OTP_EXP=3600
GOTRUE_MAILER_OTP_LENGTH=6

# メールテンプレート URL
GOTRUE_MAILER_URLPATHS_INVITE=/auth/v1/verify
GOTRUE_MAILER_URLPATHS_CONFIRMATION=/auth/v1/verify
GOTRUE_MAILER_URLPATHS_RECOVERY=/auth/v1/verify
GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE=/auth/v1/verify
```

## JWT シークレット設定

```bash
# JWT 設定
GOTRUE_JWT_SECRET=your-super-secret-jwt-token-with-at-least-32-characters
GOTRUE_JWT_EXP=3600               # アクセストークンの有効期限（秒）
GOTRUE_JWT_DEFAULT_GROUP_NAME=authenticated

# リフレッシュトークン
GOTRUE_SECURITY_REFRESH_TOKEN_ROTATION_ENABLED=true
GOTRUE_SECURITY_REFRESH_TOKEN_REUSE_INTERVAL=10
```

### JWT キーの一貫性

すべてのサービス（GoTrue, PostgREST, Realtime, Storage）で同じ JWT_SECRET を使用する必要がある。

## 外部プロバイダ設定

### Google

```bash
GOTRUE_EXTERNAL_GOOGLE_ENABLED=true
GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID=your-google-client-id
GOTRUE_EXTERNAL_GOOGLE_SECRET=your-google-client-secret
GOTRUE_EXTERNAL_GOOGLE_REDIRECT_URI=https://auth.example.com/callback
```

### GitHub

```bash
GOTRUE_EXTERNAL_GITHUB_ENABLED=true
GOTRUE_EXTERNAL_GITHUB_CLIENT_ID=your-github-client-id
GOTRUE_EXTERNAL_GITHUB_SECRET=your-github-client-secret
GOTRUE_EXTERNAL_GITHUB_REDIRECT_URI=https://auth.example.com/callback
```

### Apple

```bash
GOTRUE_EXTERNAL_APPLE_ENABLED=true
GOTRUE_EXTERNAL_APPLE_CLIENT_ID=com.example.app
GOTRUE_EXTERNAL_APPLE_SECRET=your-apple-secret
GOTRUE_EXTERNAL_APPLE_REDIRECT_URI=https://auth.example.com/callback
```

### Azure AD

```bash
GOTRUE_EXTERNAL_AZURE_ENABLED=true
GOTRUE_EXTERNAL_AZURE_CLIENT_ID=your-azure-client-id
GOTRUE_EXTERNAL_AZURE_SECRET=your-azure-client-secret
GOTRUE_EXTERNAL_AZURE_REDIRECT_URI=https://auth.example.com/callback
GOTRUE_EXTERNAL_AZURE_URL=https://login.microsoftonline.com/<tenant-id>
```

### その他の対応プロバイダ

- Discord, Slack, Spotify, Twitch, Twitter
- Facebook, LinkedIn
- Keycloak, GitLab, Bitbucket
- Notion, Zoom, Figma
- SAML 2.0（カスタム IdP）

## Phone MFA 設定

### SMS プロバイダ設定

```bash
# Twilio
GOTRUE_SMS_PROVIDER=twilio
GOTRUE_SMS_TWILIO_ACCOUNT_SID=your-account-sid
GOTRUE_SMS_TWILIO_AUTH_TOKEN=your-auth-token
GOTRUE_SMS_TWILIO_MESSAGE_SERVICE_SID=your-message-service-sid

# または MessageBird
GOTRUE_SMS_PROVIDER=messagebird
GOTRUE_SMS_MESSAGEBIRD_ACCESS_KEY=your-access-key
GOTRUE_SMS_MESSAGEBIRD_ORIGINATOR=+1234567890

# または Vonage
GOTRUE_SMS_PROVIDER=vonage
GOTRUE_SMS_VONAGE_API_KEY=your-api-key
GOTRUE_SMS_VONAGE_API_SECRET=your-api-secret
GOTRUE_SMS_VONAGE_FROM=MyApp
```

### MFA 設定

```bash
# MFA の有効化
GOTRUE_MFA_ENABLED=true

# TOTP（認証アプリ）
GOTRUE_MFA_TOTP_ENROLL_ENABLED=true
GOTRUE_MFA_TOTP_VERIFY_ENABLED=true

# Phone（SMS）
GOTRUE_MFA_PHONE_ENROLL_ENABLED=true
GOTRUE_MFA_PHONE_VERIFY_ENABLED=true
GOTRUE_MFA_PHONE_OTP_LENGTH=6

# 最大登録ファクター数
GOTRUE_MFA_MAX_ENROLLED_FACTORS=10
```

## Docker Compose での設定例

```yaml
auth:
  image: supabase/gotrue:v2.x.x
  restart: unless-stopped
  depends_on:
    db:
      condition: service_healthy
  environment:
    GOTRUE_API_HOST: 0.0.0.0
    GOTRUE_API_PORT: 9999
    API_EXTERNAL_URL: ${API_EXTERNAL_URL}
    GOTRUE_DB_DRIVER: postgres
    GOTRUE_DB_DATABASE_URL: postgresql://supabase_auth_admin:${POSTGRES_PASSWORD}@db:5432/postgres
    GOTRUE_SITE_URL: ${SITE_URL}
    GOTRUE_JWT_SECRET: ${JWT_SECRET}
    GOTRUE_JWT_EXP: 3600
    GOTRUE_EXTERNAL_GOOGLE_ENABLED: ${GOOGLE_AUTH_ENABLED:-false}
    GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID:-}
    GOTRUE_EXTERNAL_GOOGLE_SECRET: ${GOOGLE_CLIENT_SECRET:-}
```

## ベストプラクティス

- JWT_SECRET は最低 32 文字の強力なランダム文字列を使用する
- SMTP 設定は必ず設定する（メール認証に必要）
- 本番環境では GOTRUE_MAILER_AUTOCONFIRM を false にする
- 外部プロバイダのシークレットは環境変数で管理する
- レート制限を適切に設定する

## 関連

- [Auth 概要](../auth/overview.md) — Auth アーキテクチャ
- [Docker セットアップ](./docker.md) — Docker Compose 設定
