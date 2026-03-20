# 電話番号認証

SMS OTP による電話番号ベースの認証フロー。

## 概要

電話番号認証は、SMS で送信される OTP（ワンタイムパスワード）を使って認証を行う方式である。ユーザーは電話番号を入力し、受信した OTP コードを入力してログインする。

### SMS プロバイダ

Supabase Auth は以下の SMS プロバイダをサポートしている:

| プロバイダ | 設定項目 |
|-----------|---------|
| **Twilio** | Account SID, Auth Token, Message Service SID |
| **Twilio Verify** | Account SID, Auth Token, Verify Service SID |
| **MessageBird** | Access Key, Originator |
| **Vonage** | API Key, API Secret, From Number |
| **TextLocal** | API Key, Sender |

### 認証フロー

1. ユーザーが電話番号を入力
2. `signInWithOtp()` で SMS 送信をリクエスト
3. SMS で OTP コードが送信される
4. ユーザーが OTP コードを入力
5. `verifyOtp()` でコードを検証
6. セッションが作成される

## コード例

```typescript
// === 電話番号で OTP サインイン ===

// 1. SMS で OTP コードを送信
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+819012345678',
})

if (error) {
  console.error('SMS send error:', error.message)
}

// 2. ユーザーが入力した OTP コードで検証
const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
  phone: '+819012345678',
  token: '123456',
  type: 'sms',
})

if (verifyData.session) {
  console.log('Logged in:', verifyData.user)
}

// === 電話番号とパスワードでサインアップ ===

const { data, error } = await supabase.auth.signUp({
  phone: '+819012345678',
  password: 'securePassword123!',
})

// SMS で送信された OTP コードで確認
const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
  phone: '+819012345678',
  token: '123456',
  type: 'sms',
})

// === 電話番号とパスワードでサインイン ===

const { data, error } = await supabase.auth.signInWithPassword({
  phone: '+819012345678',
  password: 'securePassword123!',
})

// === 電話番号の変更 ===

// ログイン済みユーザーの電話番号を変更
const { data, error } = await supabase.auth.updateUser({
  phone: '+819087654321',
})

// 新しい番号に送信された OTP で確認
const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
  phone: '+819087654321',
  token: '123456',
  type: 'phone_change',
})

// === verifyOtp の type パラメータ ===
// 'sms'          - SMS OTP でのサインイン
// 'phone_change' - 電話番号変更の確認

// === Admin API でユーザー作成 ===

const { data, error } = await supabaseAdmin.auth.admin.createUser({
  phone: '+819012345678',
  phone_confirm: true, // 電話番号確認をスキップ
})
```

## 注意点

- 電話番号は国際形式（E.164）で指定する必要がある（例: `+819012345678`）
- SMS 送信にはレート制限がある（デフォルト: 1 通/60 秒）
- SMS プロバイダの設定はダッシュボードの Auth > Providers > Phone で行う
- SMS の送信コストはプロバイダの料金体系に依存する（Supabase とは別課金）
- OTP コードのデフォルト有効期限は 5 分間
- テスト環境では、Auth Hook の Send SMS Hook を使って実際の SMS 送信を回避できる
- Twilio Verify を使用する場合、OTP の生成と検証は Twilio 側で行われる

## 関連

- [パスワード認証](./passwords.md)
- [メール OTP / Magic Link](./email-passwordless.md)
- [Auth Hooks](./auth-hooks.md)
- [レート制限](./rate-limits.md)
