# メール OTP / Magic Link

メールベースのパスワードレス認証（OTP コードとマジックリンク）。

## 概要

メールベースのパスワードレス認証は、パスワードを使わずにメールアドレスだけでログインする方式である。2 つの方式がある:

### OTP（ワンタイムパスワード）コード

- メールに 6 桁の数字コードが送信される
- ユーザーがコードを入力して認証
- `signInWithOtp()` + `verifyOtp()` の 2 ステップ
- モバイルアプリやリダイレクトが困難な環境に適している

### マジックリンク

- メールに認証リンクが送信される
- ユーザーがリンクをクリックして認証
- `signInWithOtp()` のみで、リンククリック後に自動的にセッションが作成される
- Web アプリに適している

### メールテンプレート

ダッシュボードの Auth > Email Templates でカスタマイズ可能:
- **Confirm signup**: サインアップ確認メール
- **Magic Link**: マジックリンクメール
- **Change Email Address**: メールアドレス変更確認
- **Reset Password**: パスワードリセットメール

テンプレートで使用可能な変数:
- `{{ .ConfirmationURL }}`: 確認 URL
- `{{ .Token }}`: OTP トークン
- `{{ .TokenHash }}`: トークンハッシュ
- `{{ .SiteURL }}`: サイト URL
- `{{ .RedirectTo }}`: リダイレクト先 URL

## コード例

```typescript
// === OTP コード方式 ===

// 1. OTP コードをメールで送信
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    shouldCreateUser: true, // 未登録ユーザーも自動作成（デフォルト: true）
  },
})

// 2. ユーザーが入力した OTP コードで検証
const { data, error } = await supabase.auth.verifyOtp({
  email: 'user@example.com',
  token: '123456',
  type: 'email',
})

if (data.session) {
  console.log('Logged in:', data.user)
}

// === マジックリンク方式 ===

// マジックリンクをメールで送信
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://example.com/dashboard',
    shouldCreateUser: true,
  },
})

// マジックリンクをクリック後、リダイレクト先で:
// PKCE フローの場合
const code = new URL(window.location.href).searchParams.get('code')
if (code) {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
}

// === サインアップ時の OTP 確認 ===

// サインアップ時に OTP で確認
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})

// 送信された OTP コードで確認
const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
  email: 'user@example.com',
  token: '123456',
  type: 'signup',
})

// === OTP の type パラメータ ===
// 'email'    - メール OTP でのサインイン
// 'signup'   - サインアップ確認
// 'recovery' - パスワードリカバリー
// 'invite'   - 招待メール
// 'email_change' - メールアドレス変更確認

// === メール送信の無効化（テスト用） ===

// Admin API で OTP を直接生成（メール送信なし）
const { data, error } = await supabaseAdmin.auth.admin.generateLink({
  type: 'magiclink',
  email: 'user@example.com',
})
// data.properties.hashed_token が OTP トークンハッシュ
```

## 注意点

- OTP コードのデフォルト有効期限は 5 分間
- マジックリンクはメール内のリンクが一度しか使えない
- `shouldCreateUser: false` に設定すると、未登録のメールアドレスでは OTP が送信されない
- メール送信にはレート制限がある（デフォルト: 1 通/60 秒）
- PKCE フロー使用時は、マジックリンクのリダイレクト先で `exchangeCodeForSession()` を呼ぶ必要がある
- カスタムメールテンプレートで `{{ .Token }}` を使用すると OTP コード方式、`{{ .ConfirmationURL }}` を使用するとマジックリンク方式になる
- Auth Hook の Send Email Hook を使うと、メール送信をカスタムの SMTP サービスに委譲できる

## 関連

- [パスワード認証](./passwords.md)
- [電話番号認証](./phone-login.md)
- [Auth Hooks](./auth-hooks.md)
- [レート制限](./rate-limits.md)
