# Plugins

| Name | Description | Path |
|------|-------------|------|
| Admin | ユーザー管理のための管理機能を提供。ユーザーの作成、ロール管理、BAN/BAN解除、なりすまし… | [admin.md](./admin.md) |
| Agent Auth | Better Auth サーバーを Agent Auth Protocol 標準を実装した Agent Auth プロバイダーとして機能させる… | [agent-auth.md](./agent-auth.md) |
| Anonymous | 個人情報（PII）を要求せずに認証済みエクスペリエンスを提供する。ユーザーは匿名でアカウントを確立… | [anonymous.md](./anonymous.md) |
| API Key | API キーの作成・管理を可能にし、API リクエストの認証と認可を提供する。レート制限、メタデー… | [api-key.md](./api-key.md) |
| API Key Advanced | API Key プラグインの高度な機能: セッション生成、複数設定、組織所有キー、ストレージモード、レー… | [api-key-advanced.md](./api-key-advanced.md) |
| API Key Reference | API Key プラグインの完全なオプション、データベーススキーマ、型定義のリファレンス。 | [api-key-reference.md](./api-key-reference.md) |
| Autumn | オープンソースの SaaS 課金インフラ Autumn と Better Auth を統合するプラグイン。サブスクリプ… | [autumn.md](./autumn.md) |
| Bearer | ブラウザ Cookie の代替として Bearer トークンによる認証を提供する。リクエストをインターセプト… | [bearer.md](./bearer.md) |
| Captcha | キーエンドポイントに captcha 検証を追加することでボット保護を統合する。サインアップ、サインイン… | [captcha.md](./captcha.md) |
| Chargebee | Chargebee のサブスクリプション管理・決済を Better Auth に統合するプラグイン。Chargebee チーム… | [chargebee.md](./chargebee.md) |
| Commet | Commet（Merchant of Record）を Better Auth に統合するプラグイン。サブスクリプション・使用量課… | [commet.md](./commet.md) |
| Creem | Creem の金融 OS を Better Auth に統合するプラグイン。決済処理・サブスクリプション管理を認証レ… | [creem.md](./creem.md) |
| Device Authorization | RFC 8628 OAuth 2.0 Device Authorization Grant を実装し、スマート TV、CLI アプリケーション、IoT… | [device-authorization.md](./device-authorization.md) |
| Dodo Payments | グローバルな Merchant-of-Record プラットフォーム Dodo Payments を Better Auth に統合するプラグ… | [dodopayments.md](./dodopayments.md) |
| Dub | Dub のリンク管理プラットフォームと Better Auth を統合するプラグイン。Dub リンク経由でサインア… | [dub.md](./dub.md) |
| Email OTP | メールアドレスに送信されるワンタイムパスワードを使用した認証を可能にする。サインイン、メール検… | [email-otp.md](./email-otp.md) |
| Generic OAuth | 任意の OAuth プロバイダーとの柔軟な統合を提供し、OAuth 2.0 と OpenID Connect（OIDC）フローの… | [generic-oauth.md](./generic-oauth.md) |
| Have I Been Pwned | 侵害されたクレデンシャルでのアカウント作成やパスワード更新を防止することでアカウントセキュリティ… | [have-i-been-pwned.md](./have-i-been-pwned.md) |
| i18n | ユーザーのロケールに基づいて Better Auth が返すエラーメッセージの翻訳を可能にする。Better Auth… | [i18n.md](./i18n.md) |
| JWT | セッションを使用できないサービス向けに JWT トークンでのユーザー認証を可能にする。JWT トークン… | [jwt.md](./jwt.md) |
| Last Login Method | ユーザーが使用した最新の認証方法を追跡・表示する。「Google でログイン済み」などのログインインジ… | [last-login-method.md](./last-login-method.md) |
| Magic Link | 検証リンクを含むメールをユーザーに送信することでパスワードレス認証を実現する。リンクをクリック… | [magic-link.md](./magic-link.md) |
| MCP | Better Auth インスタンスを MCP クライアント用の OAuth プロバイダーとして機能させる。MCP アプ… | [mcp.md](./mcp.md) |
| Multi-Session | 同じブラウザ内で複数のアクティブセッションを維持し、ログアウトせずにアカウントを切り替えること… | [multi-session.md](./multi-session.md) |
| OAuth Provider | OAuth 2.1 Provider プラグインは、Better Auth サーバーを OAuth 2.1 準拠の認可プロバイダーに変… | [oauth-provider.md](./oauth-provider.md) |
| OAuth Proxy | 本番サーバーを通じて OAuth リクエストをプロキシすることを可能にする。リダイレクト URL が事前… | [oauth-proxy.md](./oauth-proxy.md) |
| OIDC Provider | 独自の OpenID Connect プロバイダーを構築・管理し、外部サービスに依存せずにユーザー認証を完全… | [oidc-provider.md](./oidc-provider.md) |
| One Tap | Google の One Tap API を使用した1回のインタラクションでの認証を可能にする。自動プロンプト表示… | [one-tap.md](./one-tap.md) |
| One-Time Token | 安全な使い捨てセッショントークンの生成と検証機能を提供する。主にクロスドメイン認証に使用される。 | [one-time-token.md](./one-time-token.md) |
| Open API | Better Auth の OpenAPI 3.0 リファレンスを提供する。プラグインとコアによって追加された全エンド… | [open-api.md](./open-api.md) |
| Organization | 組織メンバーとチームの管理を可能にし、ユーザーアクセスと権限管理を簡素化する。ロールと権限の割… | [organization.md](./organization.md) |
| Passkey | WebAuthn と FIDO2 標準を利用した暗号鍵ペアによる安全なパスワードレス認証を提供する。内部的に… | [passkey.md](./passkey.md) |
| Phone Number | 電話番号を使用したユーザー認証を可能にする。OTP 検証機能を含み、SMS プロバイダーと連携した安… | [phone-number.md](./phone-number.md) |
| Polar | Polar の決済インフラと Better Auth をシームレスに統合するプラグイン。チェックアウト・ポータル・… | [polar.md](./polar.md) |
| SCIM | Better Auth に SCIM 2.0 準拠サーバーを公開し、サードパーティ ID プロバイダーがサービスへの ID… | [scim.md](./scim.md) |
| Sign In With Ethereum (SIWE) | ERC-4361 標準に基づき、Ethereum ウォレットでユーザー認証を可能にするプラグイン。カスタムメッセ… | [siwe.md](./siwe.md) |
| SSO | OIDC、OAuth2、SAML 2.0 をサポートし、単一のクレデンシャルセットで複数のアプリケーションへの認… | [sso.md](./sso.md) |
| Stripe | Stripe の決済・サブスクリプション機能を Better Auth に統合するプラグイン。ユーザーサインアップ… | [stripe.md](./stripe.md) |
| Test Utils | Better Auth の統合テストおよび E2E テスト用の包括的なテストツールキットを提供する。テストデ… | [test-utils.md](./test-utils.md) |
| Two-Factor Authentication (2FA) | パスワードに加えて第2の認証手段を要求することでセキュリティを強化する。OTP（ワンタイムパスワ… | [two-factor.md](./two-factor.md) |
| Username | メールとパスワードの認証に軽量なユーザー名サポートを追加する。ユーザーはメールアドレスの代わり… | [username.md](./username.md) |
