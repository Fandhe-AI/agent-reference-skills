# Errors

Better Auth のエラーコード一覧・概要。エラーが発生すると、ユーザーは `/api/auth/error` ページにリダイレクトされます。

## エラーコード一覧

Better Auth は以下のエラーを定義しています:

| エラーコード | 説明 |
|-------------|------|
| `invalid_callback_request` | OAuth コールバックリクエストの解析に失敗 |
| `state_not_found` | OAuth コールバックに `state` パラメータが見つからない |
| `state_mismatch` | リクエストの `state` パラメータがクッキーの `state` と一致しない |
| `state_invalid` | Cookie 戦略使用時に OAuth state Cookie の復号・解析に失敗 |
| `no_code` | OAuth コールバックに認可コードが見つからない |
| `invalid_code` | 認証コードが無効または期限切れ |
| `no_callback_url` | `state` パラメータにコールバック URL が含まれていない |
| `oauth_provider_not_found` | コールバック URL にプロバイダーセグメントが見つからない |
| `email_not_found` | プロバイダーからメールアドレスが返されなかった |
| `email_doesn't_match` | プロバイダーのメールが認証済みユーザーのメールと一致しない |
| `unable_to_get_user_info` | プロバイダーからユーザー情報を取得できなかった |
| `unable_to_link_account` | プロバイダーアカウントをユーザーにリンクできなかった |
| `account_already_linked_to_different_user` | プロバイダーアカウントが既に別のユーザーにリンクされている |
| `account_not_linked` | OAuth プロバイダーアカウントが現在のユーザーにリンクされていない |
| `signup_disabled` | サインアップが無効化されているプロバイダーでの登録試行 |
| `unable_to_create_session` | 認証成功後のセッション作成に失敗 |
| `unable_to_create_user` | 認証中のユーザー作成に失敗 |
| `internal_server_error` | 認証処理中に予期せぬエラーが発生 |

## 個別エラーの詳細

各エラーの詳細については、個別のエラーリファレンスファイルを参照してください:

- [error-invalid-callback-request.md](./error-invalid-callback-request.md)
- [error-state-not-found.md](./error-state-not-found.md)
- [error-state-mismatch.md](./error-state-mismatch.md)
- [error-state-invalid.md](./error-state-invalid.md)
- [error-no-code.md](./error-no-code.md)
- [error-invalid-code.md](./error-invalid-code.md)
- [error-no-callback-url.md](./error-no-callback-url.md)
- [error-oauth-provider-not-found.md](./error-oauth-provider-not-found.md)
- [error-email-not-found.md](./error-email-not-found.md)
- [error-email-doesnt-match.md](./error-email-doesnt-match.md)
- [error-unable-to-get-user-info.md](./error-unable-to-get-user-info.md)
- [error-unable-to-link-account.md](./error-unable-to-link-account.md)
- [error-account-already-linked.md](./error-account-already-linked.md)
- [error-account-not-linked.md](./error-account-not-linked.md)
- [error-signup-disabled.md](./error-signup-disabled.md)
- [error-unable-to-create-session.md](./error-unable-to-create-session.md)
- [error-unable-to-create-user.md](./error-unable-to-create-user.md)
- [error-internal-server-error.md](./error-internal-server-error.md)
- [error-unknown.md](./error-unknown.md)

## エラーページのカスタマイズ

`onAPIError` オプションで、エラーページの外観やエラーハンドリングをカスタマイズできます:

```typescript
onAPIError: {
  errorURL: "/api/auth/error",     // エラーリダイレクト先 URL
  throw: false,                     // エラーを再スローするか
  onError: (error) => { ... },     // カスタムエラーハンドラー
  customizeDefaultErrorPage: { ... } // エラーページの外観カスタマイズ
}
```
