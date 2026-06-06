# reference

| Name | Description | Path |
|------|-------------|------|
| account_already_linked_to_different_user | OAuth プロバイダーアカウントが既に別のユーザーにリンクされている際のエラー。… | [error-account-already-linked.md](./error-account-already-linked.md) |
| account_not_linked | OAuth フロー中にプロバイダーアカウントを現在のユーザーにリンクできない際のエラー。… | [error-account-not-linked.md](./error-account-not-linked.md) |
| email_doesn't_match | OAuth アカウントリンク時のメールアドレス不一致エラー。… | [error-email-doesnt-match.md](./error-email-doesnt-match.md) |
| email_not_found | プロバイダーからメールアドレスが返されなかった際のエラー。… | [error-email-not-found.md](./error-email-not-found.md) |
| internal_server_error | 認証処理中に予期せぬエラーが発生した際の汎用エラー。… | [error-internal-server-error.md](./error-internal-server-error.md) |
| invalid_callback_request | OAuth コールバック処理時のリクエスト解析失敗エラー。… | [error-invalid-callback-request.md](./error-invalid-callback-request.md) |
| invalid_code | 提供された認証コードが無効または期限切れである際のエラー。… | [error-invalid-code.md](./error-invalid-code.md) |
| no_code | OAuth コールバックに認可コードが見つからない際のエラー。… | [error-no-code.md](./error-no-code.md) |
| no_callback_url | OAuth フロー中に state パラメータにコールバック URL が含まれていない際のエラー。… | [error-no-callback-url.md](./error-no-callback-url.md) |
| oauth_provider_not_found | Better Auth がコールバックリクエストの OAuth プロバイダーを識別できない。… | [error-oauth-provider-not-found.md](./error-oauth-provider-not-found.md) |
| signup_disabled | サインアップが無効化されているプロバイダーでの登録試行。… | [error-signup-disabled.md](./error-signup-disabled.md) |
| state_invalid | Cookie ベースの state ストレージ使用時にコード復号・解析に失敗した際のエラー。… | [error-state-invalid.md](./error-state-invalid.md) |
| state_mismatch | OAuth フロー中にリクエストの state パラメータがクッキーの state と一致しない。… | [error-state-mismatch.md](./error-state-mismatch.md) |
| state_not_found | OAuth コールバックリクエストで state パラメータが見つからない。… | [error-state-not-found.md](./error-state-not-found.md) |
| unable_to_create_session | 認証成功後にセッションの作成に失敗した際のエラー。… | [error-unable-to-create-session.md](./error-unable-to-create-session.md) |
| unable_to_create_user | 認証中にユーザーの作成に失敗した際のエラー。… | [error-unable-to-create-user.md](./error-unable-to-create-user.md) |
| unable_to_get_user_info | OAuth コールバック時にプロバイダーからユーザープロフィール取得に失敗。… | [error-unable-to-get-user-info.md](./error-unable-to-get-user-info.md) |
| unable_to_link_account | OAuth フロー時にプロバイダーアカウントをリンクできない際のエラー。… | [error-unable-to-link-account.md](./error-unable-to-link-account.md) |
| Unknown Error | 予期しないエラーが Better Auth システム内で発生した際の汎用エラーページ。… | [error-unknown.md](./error-unknown.md) |
| Errors | Better Auth のエラーコード一覧・概要。… | [errors.md](./errors.md) |
| FAQ | Better Auth に関するよくある質問と回答。… | [faq.md](./faq.md) |
| Instrumentation (Experimental) | OpenTelemetry ベースの分散トレーシングで Better Auth の認証操作を監視・デバッグ。… | [instrumentation.md](./instrumentation.md) |
| Configuration Options | betterAuth({...}) で利用可能なすべての設定オプションの完全リファレンス。… | [options.md](./options.md) |
| Security | Better Auth のセキュリティガイドライン・ベストプラクティスの包括的リファレンス。… | [security.md](./security.md) |
| Telemetry | Better Auth が収集するオプションの匿名使用状況データ。… | [telemetry.md](./telemetry.md) |
