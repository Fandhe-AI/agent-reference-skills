# Phone Number

Phone Number プラグインは、電話番号を使用したユーザー認証を可能にする。OTP 検証機能を含み、SMS プロバイダーと連携した安全な電話ベースの認証を提供する。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { phoneNumber } from "better-auth/plugins"

const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // SMS で OTP コードを送信
            }
        })
    ]
})
```

マイグレーション:

```bash
npx auth migrate
# または
npx auth generate
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { phoneNumberClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
    plugins: [
        phoneNumberClient()
    ]
})
```

## API メソッド

### OTP 送信

`POST /phone-number/send-otp`

```typescript
// クライアント
const { data, error } = await authClient.phoneNumber.sendOtp({
    phoneNumber: "+1234567890",
})

// サーバー
const data = await auth.api.sendPhoneNumberOTP({
    body: { phoneNumber: "+1234567890" },
})
```

### 電話番号検証

`POST /phone-number/verify`

```typescript
// クライアント
const { data, error } = await authClient.phoneNumber.verify({
    phoneNumber: "+1234567890",
    code: "123456",
    disableSession: false,
    updatePhoneNumber: false,
})

// サーバー
const data = await auth.api.verifyPhoneNumber({
    body: {
        phoneNumber: "+1234567890",
        code: "123456",
        disableSession: false,
        updatePhoneNumber: false,
    },
})
```

パラメータ:
- `phoneNumber` (string, 必須): 検証する電話番号
- `code` (string, 必須): OTP コード
- `disableSession` (boolean, 任意): 検証後のセッション作成を無効化
- `updatePhoneNumber` (boolean, 任意): ログイン中のユーザーの電話番号を更新（アクティブセッション必要）

### 電話番号でサインイン

`POST /sign-in/phone-number`

```typescript
const { data, error } = await authClient.signIn.phoneNumber({
    phoneNumber: "+1234567890",
    password,
    rememberMe: true,
})
```

### パスワードリセット要求

`POST /phone-number/request-password-reset`

```typescript
const { data, error } = await authClient.phoneNumber.requestPasswordReset({
    phoneNumber: "+1234567890",
})
```

### パスワードリセット

`POST /phone-number/reset-password`

```typescript
const { data, error } = await authClient.phoneNumber.resetPassword({
    otp: "123456",
    phoneNumber: "+1234567890",
    newPassword: "new-and-secure-password",
})
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `otpLength` | number | 6 | OTP コードの長さ |
| `sendOTP` | function | 必須 | SMS 送信コールバック |
| `expiresIn` | number | 300 | OTP 有効期限（秒） |
| `callbackOnVerification` | function | - | 検証成功後のコールバック |
| `sendPasswordResetOTP` | function | - | パスワードリセット OTP 送信関数 |
| `phoneNumberValidator` | function | - | カスタムバリデーション関数 |
| `verifyOTP` | function | - | カスタム OTP 検証関数（内部ロジック上書き） |
| `requireVerification` | boolean | false | サインイン前に電話番号検証を要求 |
| `allowedAttempts` | number | 3 | ブルートフォース防止の試行制限 |

### カスタム OTP 検証（Twilio 連携例）

```typescript
verifyOTP: async ({ phoneNumber, code }, ctx) => {
    const isValid = await twilioClient.verify
        .services('YOUR_SERVICE_SID')
        .verificationChecks
        .create({ to: phoneNumber, code })
    return isValid.status === 'approved'
}
```

### 検証時自動サインアップ

```typescript
signUpOnVerification: {
    getTempEmail: (phoneNumber) => `${phoneNumber}@my-site.com`,
    getTempName: (phoneNumber) => phoneNumber,
}
```

## DB スキーマ

### user テーブル追加フィールド

| フィールド | 型 | 任意 | 説明 |
|---|---|---|---|
| `phoneNumber` | string | Yes | ユーザーの電話番号 |
| `phoneNumberVerified` | boolean | Yes | 検証状態 |

## 注意点

- `sendOTP` 関数はリクエスト処理中に await しないこと。サーバーレスでは `waitUntil` を使用
- `requireVerification` 有効時、未検証ユーザーのサインイン試行は 401 エラー（PHONE_NUMBER_NOT_VERIFIED）を返し、自動で OTP を送信
- 試行制限超過時は OTP コードが自動削除され、403 ステータスが返される
