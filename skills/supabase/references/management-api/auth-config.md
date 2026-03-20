# Management API: Auth 設定管理

## エンドポイント一覧

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/v1/projects/{ref}/config/auth` | Auth 設定取得 |
| PATCH | `/v1/projects/{ref}/config/auth` | Auth 設定更新 |

## Auth 設定取得

```
GET /v1/projects/{ref}/config/auth
```

### パスパラメータ

| パラメータ | 説明 |
|-----------|------|
| `ref` | プロジェクト参照ID |

### レスポンス (200)

```json
{
  "site_url": "http://localhost:3000",
  "uri_allow_list": "https://example.com/**,https://staging.example.com/**",
  "disable_signup": false,
  "jwt_exp": 3600,
  "mailer_autoconfirm": false,
  "mailer_otp_exp": 86400,
  "sms_autoconfirm": false,
  "sms_max_frequency": 60,
  "sms_otp_exp": 60,
  "sms_otp_length": 6,
  "sms_provider": "twilio",
  "sms_twilio_account_sid": "",
  "sms_twilio_auth_token": "",
  "sms_twilio_message_service_sid": "",
  "security_captcha_enabled": false,
  "security_captcha_provider": "hcaptcha",
  "security_captcha_secret": "",
  "mfa_max_enrolled_factors": 10,
  "external_email_enabled": true,
  "external_phone_enabled": true,
  "external_apple_enabled": false,
  "external_apple_client_id": "",
  "external_apple_secret": "",
  "external_azure_enabled": false,
  "external_azure_client_id": "",
  "external_azure_secret": "",
  "external_azure_url": "",
  "external_bitbucket_enabled": false,
  "external_discord_enabled": false,
  "external_facebook_enabled": false,
  "external_github_enabled": false,
  "external_github_client_id": "",
  "external_github_secret": "",
  "external_gitlab_enabled": false,
  "external_google_enabled": false,
  "external_google_client_id": "",
  "external_google_secret": "",
  "external_kakao_enabled": false,
  "external_keycloak_enabled": false,
  "external_linkedin_oidc_enabled": false,
  "external_notion_enabled": false,
  "external_slack_oidc_enabled": false,
  "external_spotify_enabled": false,
  "external_twitch_enabled": false,
  "external_twitter_enabled": false,
  "external_workos_enabled": false,
  "external_zoom_enabled": false
}
```

## Auth 設定更新

```
PATCH /v1/projects/{ref}/config/auth
```

### 基本設定パラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `site_url` | string | サイトURL（リダイレクト先ベースURL） |
| `uri_allow_list` | string | 許可リダイレクトURL（カンマ区切り、ワイルドカード対応） |
| `disable_signup` | boolean | サインアップ無効化 |

### JWT 設定

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `jwt_exp` | integer | JWT 有効期限（秒）。デフォルト: 3600 |

### メール設定

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `mailer_autoconfirm` | boolean | メール自動確認（true: 確認メール不要） |
| `mailer_otp_exp` | integer | メールOTP 有効期限（秒） |
| `external_email_enabled` | boolean | メール認証の有効/無効 |

### SMS 設定

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `sms_autoconfirm` | boolean | SMS 自動確認 |
| `sms_max_frequency` | integer | SMS 送信頻度制限（秒） |
| `sms_otp_exp` | integer | SMS OTP 有効期限（秒） |
| `sms_otp_length` | integer | OTP 桁数 |
| `sms_provider` | string | SMS プロバイダ (`twilio`, `messagebird`, `vonage`) |
| `external_phone_enabled` | boolean | 電話認証の有効/無効 |

### セキュリティ設定

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| `security_captcha_enabled` | boolean | CAPTCHA 有効化 |
| `security_captcha_provider` | string | CAPTCHA プロバイダ (`hcaptcha`, `turnstile`) |
| `security_captcha_secret` | string | CAPTCHA シークレットキー |
| `mfa_max_enrolled_factors` | integer | MFA 最大登録ファクター数 |

## 外部プロバイダ設定

### Google

```bash
curl -X PATCH "https://api.supabase.com/v1/projects/<ref>/config/auth" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "external_google_enabled": true,
    "external_google_client_id": "your-google-client-id.apps.googleusercontent.com",
    "external_google_secret": "your-google-client-secret"
  }'
```

### GitHub

```bash
curl -X PATCH "https://api.supabase.com/v1/projects/<ref>/config/auth" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "external_github_enabled": true,
    "external_github_client_id": "your-github-client-id",
    "external_github_secret": "your-github-client-secret"
  }'
```

### Apple

```bash
curl -X PATCH "https://api.supabase.com/v1/projects/<ref>/config/auth" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "external_apple_enabled": true,
    "external_apple_client_id": "your-apple-client-id",
    "external_apple_secret": "your-apple-secret"
  }'
```

### 外部プロバイダ共通パラメータ

各プロバイダは以下のパターンのパラメータを持つ:

| パラメータパターン | 型 | 説明 |
|------------------|-----|------|
| `external_{provider}_enabled` | boolean | プロバイダ有効/無効 |
| `external_{provider}_client_id` | string | クライアントID |
| `external_{provider}_secret` | string | クライアントシークレット |
| `external_{provider}_url` | string | プロバイダURL（一部のみ） |

### 対応プロバイダ一覧

| プロバイダ | キー名 |
|-----------|--------|
| Apple | `apple` |
| Azure | `azure` |
| Bitbucket | `bitbucket` |
| Discord | `discord` |
| Facebook | `facebook` |
| GitHub | `github` |
| GitLab | `gitlab` |
| Google | `google` |
| Kakao | `kakao` |
| Keycloak | `keycloak` |
| LinkedIn (OIDC) | `linkedin_oidc` |
| Notion | `notion` |
| Slack (OIDC) | `slack_oidc` |
| Spotify | `spotify` |
| Twitch | `twitch` |
| Twitter | `twitter` |
| WorkOS | `workos` |
| Zoom | `zoom` |

## リダイレクトURL 設定

```bash
curl -X PATCH "https://api.supabase.com/v1/projects/<ref>/config/auth" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "site_url": "https://example.com",
    "uri_allow_list": "https://example.com/**,https://staging.example.com/**,myapp://login-callback"
  }'
```

ワイルドカード `**` を使用すると、そのパス配下の全てのURLが許可される。

## 関連

- [Auth 概要](../auth/overview.md) — 認証アーキテクチャ
- [ソーシャルログイン](../auth/social-login.md) — OAuth プロバイダ設定
