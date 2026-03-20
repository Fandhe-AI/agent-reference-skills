# Auth エラーコード一覧

Supabase Auth が返すエラーコードの一覧と対処法。

## 概要

Supabase Auth のエラーは、HTTP ステータスコードと Auth 固有のエラーコードで構成される。`supabase-js` ではエラーオブジェクトの `error.message`、`error.status`、`error.code` でアクセスできる。

### エラーオブジェクトの構造

```typescript
{
  message: string,  // 人間が読めるエラーメッセージ
  status: number,   // HTTP ステータスコード
  code: string,     // Auth エラーコード（例: 'invalid_credentials'）
}
```

## エラーコード一覧

### 400 Bad Request

| エラーコード | 説明 | 対処法 |
|-------------|------|--------|
| `invalid_credentials` | メールアドレスまたはパスワードが正しくない | 入力内容を確認。ユーザーが存在するか確認 |
| `user_already_exists` | メールアドレスが既に登録済み | ログインを促すか、パスワードリセットを案内 |
| `weak_password` | パスワードが要件を満たさない | パスワード要件（最小長、文字種等）を満たすよう案内 |
| `email_not_confirmed` | メールアドレスが未確認 | 確認メールの再送信を案内 |
| `phone_not_confirmed` | 電話番号が未確認 | SMS OTP の再送信を案内 |
| `same_password` | 新旧パスワードが同一 | 異なるパスワードを設定するよう案内 |
| `signup_disabled` | サインアップが無効化されている | ダッシュボードでサインアップを有効化 |
| `user_banned` | ユーザーが BAN されている | Admin API で BAN を解除 |
| `captcha_failed` | CAPTCHA 検証に失敗 | CAPTCHA トークンを再取得して再試行 |
| `flow_state_not_found` | PKCE フロー状態が見つからない | 認証フローを最初からやり直す |
| `flow_state_expired` | PKCE フロー状態が期限切れ | 認証フローを最初からやり直す |
| `otp_expired` | OTP コードが期限切れ | 新しい OTP を送信 |
| `otp_disabled` | OTP が無効化されている | ダッシュボードで OTP を有効化 |
| `email_provider_disabled` | メールプロバイダが無効 | ダッシュボードでメール認証を有効化 |
| `phone_provider_disabled` | 電話プロバイダが無効 | ダッシュボードで電話認証を有効化 |
| `provider_disabled` | 指定のプロバイダが無効 | ダッシュボードで該当プロバイダを有効化 |
| `validation_failed` | 入力バリデーションエラー | リクエストパラメータを確認 |
| `bad_json` | JSON パースエラー | リクエストボディの JSON 形式を確認 |
| `bad_jwt` | JWT の形式が不正 | 正しい JWT を使用 |
| `email_exists` | メールアドレスが既に使用されている | 別のメールアドレスを使用 |
| `phone_exists` | 電話番号が既に使用されている | 別の電話番号を使用 |
| `identity_already_exists` | ID が既にリンクされている | 既存のリンクを解除してから再リンク |
| `identity_not_found` | 指定の ID が見つからない | 正しい identity ID を指定 |
| `no_authorization` | 認証ヘッダーがない | Authorization ヘッダーを付与 |

### 401 Unauthorized

| エラーコード | 説明 | 対処法 |
|-------------|------|--------|
| `invalid_token` | トークンが無効または期限切れ | 再ログインまたはトークンリフレッシュ |
| `session_not_found` | セッションが見つからない | 再ログイン |
| `user_not_found` | ユーザーが見つからない | ユーザーが削除されていないか確認 |
| `invalid_grant` | リフレッシュトークンが無効 | 再ログイン |

### 403 Forbidden

| エラーコード | 説明 | 対処法 |
|-------------|------|--------|
| `insufficient_aal` | AAL レベルが不足（MFA 未完了） | MFA 検証を完了させる |
| `not_admin` | Admin 権限が必要 | service_role キーを使用 |

### 422 Unprocessable Entity

| エラーコード | 説明 | 対処法 |
|-------------|------|--------|
| `validation_failed` | 入力値のバリデーションエラー | エラーメッセージの詳細を確認して修正 |
| `email_address_invalid` | メールアドレスの形式が不正 | 正しいメール形式を使用 |
| `phone_number_invalid` | 電話番号の形式が不正 | E.164 形式（+819012345678）を使用 |

### 429 Too Many Requests

| エラーコード | 説明 | 対処法 |
|-------------|------|--------|
| `rate_limit_exceeded` | レート制限超過 | 待機後に再試行。CAPTCHA の導入を検討 |
| `email_send_rate_limit` | メール送信レート制限超過 | 60 秒以上待機してから再試行 |
| `sms_send_rate_limit` | SMS 送信レート制限超過 | 60 秒以上待機してから再試行 |
| `over_request_rate_limit` | 全体的なリクエスト制限超過 | 待機後に再試行 |

### 500 Internal Server Error

| エラーコード | 説明 | 対処法 |
|-------------|------|--------|
| `unexpected_failure` | 予期しないサーバーエラー | Supabase のステータスページを確認。再試行 |

## コード例

```typescript
// === エラーハンドリングの実装 ===

async function handleSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    switch (error.code) {
      case 'invalid_credentials':
        return { error: 'メールアドレスまたはパスワードが正しくありません。' }

      case 'email_not_confirmed':
        return { error: 'メールアドレスが確認されていません。確認メールを確認してください。' }

      case 'user_banned':
        return { error: 'このアカウントは停止されています。' }

      case 'captcha_failed':
        return { error: 'CAPTCHA の検証に失敗しました。再試行してください。' }

      case 'rate_limit_exceeded':
      case 'over_request_rate_limit':
        return { error: 'リクエストが制限に達しました。しばらくしてから再試行してください。' }

      default:
        return { error: `ログインに失敗しました: ${error.message}` }
    }
  }

  return { data }
}

// === サインアップのエラーハンドリング ===

async function handleSignUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    switch (error.code) {
      case 'user_already_exists':
        return { error: 'このメールアドレスは既に登録されています。' }

      case 'weak_password':
        return { error: 'パスワードが弱すぎます。8 文字以上で、大文字・小文字・数字を含めてください。' }

      case 'signup_disabled':
        return { error: '現在、新規登録は受け付けていません。' }

      case 'email_provider_disabled':
        return { error: 'メールでの登録は無効になっています。' }

      case 'validation_failed':
        return { error: '入力内容に問題があります。確認してください。' }

      case 'email_send_rate_limit':
        return { error: 'メール送信の制限に達しました。しばらくしてから再試行してください。' }

      default:
        return { error: `登録に失敗しました: ${error.message}` }
    }
  }

  // identities が空の場合、既存ユーザー
  if (data.user?.identities?.length === 0) {
    return { error: 'このメールアドレスは既に登録されています。' }
  }

  return { data }
}

// === 共通エラーハンドラー ===

function getErrorMessage(error: { code?: string; message: string; status?: number }): string {
  const errorMessages: Record<string, string> = {
    invalid_credentials: 'ログイン情報が正しくありません。',
    user_already_exists: 'このアカウントは既に存在します。',
    weak_password: 'より強力なパスワードを設定してください。',
    email_not_confirmed: 'メールアドレスを確認してください。',
    rate_limit_exceeded: 'リクエスト制限に達しました。しばらくお待ちください。',
    session_not_found: 'セッションが期限切れです。再ログインしてください。',
    invalid_token: 'トークンが無効です。再ログインしてください。',
    otp_expired: 'コードの有効期限が切れました。再送信してください。',
    captcha_failed: 'CAPTCHA を完了してください。',
  }

  return errorMessages[error.code ?? ''] ?? error.message
}
```

## 注意点

- エラーコードはバージョンによって追加・変更される可能性がある。`error.code` が undefined の場合のフォールバック処理を実装すること
- `signUp` で既存メールアドレスを使用した場合、セキュリティ上エラーではなく `identities` が空のユーザーを返す（ユーザー列挙攻撃の防止）
- レート制限エラー（429）はクライアントサイドでリトライロジックを実装すること。ただし、指数バックオフを使用すること
- `error.message` はユーザー向けの表示に使用できるが、英語で返されるため、上記のような日本語マッピングを用意すると良い
- Admin API のエラーはクライアント API と異なるコードを返す場合がある
- 本番環境ではエラーの詳細をログに記録し、ユーザーには一般的なメッセージのみ表示すること

## 関連

- [Auth 概要](./overview.md)
- [パスワード認証](./passwords.md)
- [レート制限](./rate-limits.md)
- [CAPTCHA](./captcha.md)
