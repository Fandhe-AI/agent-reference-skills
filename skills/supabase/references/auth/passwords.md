# パスワード認証

メールアドレスまたは電話番号とパスワードによるサインアップ・サインイン。

## 概要

パスワード認証は、Supabase Auth の最も基本的な認証方式である。ユーザーはメールアドレス（または電話番号）とパスワードを使用してアカウントを作成し、ログインする。

### パスワード要件

ダッシュボードの Auth Settings で以下を設定可能:
- **最小パスワード長**: デフォルト 6 文字
- **文字種の要件**: 大文字、小文字、数字、特殊文字の必須化
- **Leaked Password Protection**: Have I Been Pwned データベースと照合し、漏洩済みパスワードを拒否

### メール確認

- **確認メール有効**: サインアップ後に確認メールが送信される。確認前はログイン不可（設定による）
- **確認メール無効**: サインアップ即座にログイン可能（開発環境向け）
- **Confirm email (Secure)**: 確認前のログインを完全にブロック

## コード例

```typescript
// === サインアップ ===

// メールとパスワードでサインアップ
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securePassword123!',
  options: {
    data: {
      display_name: 'John Doe',
      age: 30,
    },
    emailRedirectTo: 'https://example.com/welcome',
  },
})

if (error) {
  console.error('Sign up error:', error.message)
} else if (data.user?.identities?.length === 0) {
  // メールアドレスが既に登録済みの場合
  console.log('User already exists')
} else {
  console.log('User created:', data.user)
}

// 電話番号とパスワードでサインアップ
const { data, error } = await supabase.auth.signUp({
  phone: '+81901234567',
  password: 'securePassword123!',
})

// === サインイン ===

// メールとパスワードでサインイン
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword123!',
})

if (error) {
  console.error('Sign in error:', error.message)
  // error.message: 'Invalid login credentials'
} else {
  console.log('Logged in:', data.user)
  console.log('Session:', data.session)
}

// 電話番号とパスワードでサインイン
const { data, error } = await supabase.auth.signInWithPassword({
  phone: '+81901234567',
  password: 'securePassword123!',
})

// === パスワードリセット ===

// 1. パスワードリセットメールを送信
const { error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  {
    redirectTo: 'https://example.com/reset-password',
  }
)

// 2. リダイレクト先でパスワードを更新
// onAuthStateChange で PASSWORD_RECOVERY イベントを受け取る
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'PASSWORD_RECOVERY') {
    // パスワードリセットフォームを表示
    showResetForm()
  }
})

// 3. 新しいパスワードを設定
const { data, error } = await supabase.auth.updateUser({
  password: 'newSecurePassword456!',
})

// === パスワード変更（ログイン済みユーザー） ===

const { data, error } = await supabase.auth.updateUser({
  password: 'newPassword789!',
})

// === Admin API でユーザー作成（メール確認不要） ===

const { data, error } = await supabaseAdmin.auth.admin.createUser({
  email: 'admin-created@example.com',
  password: 'initialPassword123!',
  email_confirm: true, // メール確認をスキップ
})
```

## 注意点

- `signUp` で既存のメールアドレスを使用した場合、セキュリティ上の理由からエラーは返さず、`identities` が空配列のユーザーオブジェクトを返す
- パスワードリセットメールのリンクは一度しか使えない
- `resetPasswordForEmail` の `redirectTo` は、ダッシュボードの Redirect URLs に登録されている必要がある
- Leaked Password Protection を有効にすると、漏洩済みパスワードでのサインアップ・パスワード変更がブロックされる
- パスワードは bcrypt でハッシュ化されて保存される
- CAPTCHA を有効にしている場合、`signUp` / `signInWithPassword` に `captchaToken` を渡す必要がある

## 関連

- [メール OTP / Magic Link](./email-passwordless.md)
- [電話番号認証](./phone-login.md)
- [CAPTCHA](./captcha.md)
- [エラーコード](./error-codes.md)
