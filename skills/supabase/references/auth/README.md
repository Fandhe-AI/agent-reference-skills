# Auth

| Name | Description | Path |
|------|-------------|------|
| 匿名認証 | 匿名ユーザーの作成と、認証済みアカウントへの変換。 | [anonymous-auth.md](./anonymous-auth.md) |
| Auth Hooks | サーバーサイドで認証フローをカスタマイズする 6 種類のフック。 | [auth-hooks.md](./auth-hooks.md) |
| CAPTCHA 連携 | hCaptcha と Cloudflare Turnstile による bot 対策。 | [captcha.md](./captcha.md) |
| メール OTP / Magic Link | メールベースのパスワードレス認証（OTP コードとマジックリンク）。 | [email-passwordless.md](./email-passwordless.md) |
| Auth エラーコード一覧 | Supabase Auth が返すエラーコードの一覧と対処法。 | [error-codes.md](./error-codes.md) |
| ID 管理・アカウントリンク | auth.identities テーブルを使った複数プロバイダのアカウントリンク機能。 | [identities.md](./identities.md) |
| JWT 構造 | Supabase Auth が発行する JWT のクレーム構造と RLS での活用。 | [jwts.md](./jwts.md) |
| 多要素認証（MFA） | TOTP と Phone（SMS）を使った多要素認証の実装。 | [mfa.md](./mfa.md) |
| Supabase OAuth Server | Supabase プロジェクトを OAuth 2.0 プロバイダとして機能させる。 | [oauth-server.md](./oauth-server.md) |
| Auth アーキテクチャ概要 | Supabase Auth は GoTrue ベースの認証サーバーで、JWT によるセッション管理を提供する。 | [overview.md](./overview.md) |
| パスワード認証 | メールアドレスまたは電話番号とパスワードによるサインアップ・サインイン。 | [passwords.md](./passwords.md) |
| 電話番号認証 | SMS OTP による電話番号ベースの認証フロー。 | [phone-login.md](./phone-login.md) |
| Auth レート制限 | 認証エンドポイント別のレート制限と対策。 | [rate-limits.md](./rate-limits.md) |
| リダイレクト URL 設定 | 認証フロー後のリダイレクト先 URL の設定と管理。 | [redirect-urls.md](./redirect-urls.md) |
| サーバーサイド認証（SSR） | @supabase/ssr パッケージを使ったサーバーサイドでの認証管理。 | [server-side.md](./server-side.md) |
| セッション管理 | JWT ベースのセッション管理、PKCE フロー、リフレッシュトークン、認証状態の監視。 | [sessions.md](./sessions.md) |
| ソーシャルログイン（OAuth） | OAuth 2.0 / OIDC プロバイダを使ったソーシャルログイン。 | [social-login.md](./social-login.md) |
| Enterprise SSO / SAML | SAML 2.0 プロトコルを使ったエンタープライズ向けシングルサインオン。 | [sso-saml.md](./sso-saml.md) |
| サードパーティ Auth 連携 | 外部認証プロバイダとの統合と移行パス。 | [third-party-auth.md](./third-party-auth.md) |
| ユーザー管理 | auth.users テーブルの構造とユーザーの作成・更新・削除を行う方法。 | [users.md](./users.md) |
