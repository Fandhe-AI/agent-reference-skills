# Email OTP

Email OTP プラグインは、メールアドレスに送信されるワンタイムパスワードを使用した認証を可能にする。サインイン、メール検証、パスワードリセット、メール変更をサポートする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { emailOTP } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                if (type === "sign-in") {
                    // サインイン用 OTP 送信
                } else if (type === "email-verification") {
                    // メール検証用 OTP 送信
                } else {
                    // パスワードリセット用 OTP 送信
                }
            },
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        emailOTPClient()
    ]
})
```

## API メソッド

### OTP 送信

`POST /email-otp/send-verification-otp`

```typescript
// クライアント
const { data, error } = await authClient.emailOtp.sendVerificationOtp({
    email: "user@example.com",
    type: "sign-in",  // "sign-in" | "email-verification" | "forget-password"
})

// サーバー
const data = await auth.api.sendVerificationOTP({
    body: { email: "user@example.com", type: "sign-in" },
})
```

### OTP チェック

`POST /email-otp/check-verification-otp`

```typescript
const { data, error } = await authClient.emailOtp.checkVerificationOtp({
    email: "user@example.com",
    type: "sign-in",
    otp: "123456",
})
```

### OTP でサインイン

`POST /sign-in/email-otp`

```typescript
// クライアント
const { data, error } = await authClient.signIn.emailOtp({
    email: "user@example.com",
    otp: "123456",
    name: "John Doe",
    image: "https://example.com/image.png",
})

// サーバー
const data = await auth.api.signInEmailOTP({
    body: {
        email: "user@example.com",
        otp: "123456",
        name: "John Doe",
        image: "https://example.com/image.png",
    },
})
```

既存でないユーザーは自動登録される。`disableSignUp: true` で無効化可能。

### メール検証

`POST /email-otp/verify-email`

```typescript
const { data, error } = await authClient.emailOtp.verifyEmail({
    email: "user@example.com",
    otp: "123456",
})
```

### パスワードリセット要求

`POST /email-otp/request-password-reset`

```typescript
const { data, error } = await authClient.emailOtp.requestPasswordReset({
    email: "user@example.com",
})
```

### パスワードリセット

`POST /email-otp/reset-password`

```typescript
const { data, error } = await authClient.emailOtp.resetPassword({
    email: "user@example.com",
    otp: "123456",
    password: "new-secure-password",
})
```

### メール変更要求

`POST /email-otp/request-email-change`

```typescript
const { data, error } = await authClient.emailOtp.requestEmailChange({
    newEmail: "user@example.com",
    otp: "123456",  // changeEmail.verifyCurrentEmail 有効時に必要
})
```

セッション Cookie が必要。

### メール変更

`POST /email-otp/change-email`

```typescript
const { data, error } = await authClient.emailOtp.changeEmail({
    newEmail: "user@example.com",
    otp: "123456",
})
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `otpLength` | number | 6 | OTP の桁数 |
| `expiresIn` | number | 300 | 有効期間（秒） |
| `sendVerificationOnSignUp` | boolean | false | 登録時に自動で OTP を送信 |
| `disableSignUp` | boolean | false | OTP サインイン時の自動登録を防止 |
| `allowedAttempts` | number | 3 | 無効化前の最大検証試行数 |
| `resendStrategy` | "rotate" \| "reuse" | "rotate" | "rotate"=新OTP、"reuse"=既存を延長 |
| `overrideDefaultEmailVerification` | boolean | false | デフォルトのメール検証をOTPで置き換え |

### OTP 保存設定

```typescript
// プレーンテキスト
emailOTP({ storeOTP: "plain" })

// 暗号化
emailOTP({ storeOTP: "encrypted" })

// ハッシュ
emailOTP({ storeOTP: "hashed" })

// カスタム暗号化
emailOTP({
    storeOTP: {
        encrypt: async (otp) => myCustomEncryptor(otp),
        decrypt: async (otp) => myCustomDecryptor(otp),
    }
})

// カスタムハッシュ
emailOTP({
    storeOTP: {
        hash: async (otp) => myCustomHasher(otp),
    }
})
```

### メール変更設定

```typescript
emailOTP({
    changeEmail: {
        enabled: true,
        verifyCurrentEmail: true  // 現在のメールからの確認を要求
    }
})
```

### カスタム OTP 生成

```typescript
emailOTP({
    generateOTP: () => "custom-otp"
})
```

## 注意点

- タイミング攻撃を防ぐため、メール送信を await しないこと。サーバーレスでは `waitUntil` を使用
- `changeEmail` エンドポイントにはセッション Cookie が必要
- 最大試行回数超過時は `TOO_MANY_ATTEMPTS` エラーコードが返される
- 保存された OTP メソッドは送信される OTP に影響しない（永続化のみ）
