# Two-Factor Authentication (2FA)

2FA プラグインは、パスワードに加えて第2の認証手段を要求することでセキュリティを強化する。OTP（ワンタイムパスワード）、TOTP（時間ベースワンタイムパスワード）、バックアップコード、信頼済みデバイス管理をサポートする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { twoFactor } from "better-auth/plugins"

export const auth = betterAuth({
    appName: "My App",
    plugins: [
        twoFactor()
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
import { twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        twoFactorClient()
    ]
})
```

## API メソッド

### 2FA 有効化

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.enable({
    password: "secure-password",
    issuer: "my-app-name"
})

// サーバー
const data = await auth.api.enableTwoFactor({
    body: {
        password: "secure-password",
        issuer: "my-app-name"
    },
    headers: await headers()
})
```

パラメータ:
- `password` (string, 必須): ユーザーのパスワード
- `issuer` (string, 任意): TOTP URI のカスタム発行者名

`skipVerificationOnEnable: true` でない限り、TOTP 検証が成功するまで `twoFactorEnabled` は `false` のまま。

### 2FA 無効化

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.disable({ password })

// サーバー
const data = await auth.api.disableTwoFactor({
    body: { password },
    headers: await headers()
})
```

### TOTP URI 取得

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.getTotpUri({ password })

// サーバー
const data = await auth.api.getTOTPURI({
    body: { password },
    headers: await headers()
})
```

認証アプリ用の QR コード生成に使う `totpURI` を返す。

### TOTP 検証

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.verifyTotp({
    code: "012345",
    trustDevice: true
})

// サーバー
const data = await auth.api.verifyTOTP({
    body: {
        code: "012345",
        trustDevice: true
    },
    headers: await headers()
})
```

パラメータ:
- `code` (string, 必須): 認証アプリからの OTP コード
- `trustDevice` (boolean, 任意): デバイスを30日間記憶する。その期間内のログインで更新される

現在の時間ウィンドウの前後1期間のコードを受け入れる。

### OTP 送信

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.sendOtp({
    trustDevice: true
})

// サーバー
const data = await auth.api.sendTwoFactorOTP({
    body: { trustDevice: true },
    headers: await headers()
})
```

### OTP 検証

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.verifyOtp({
    code: "012345",
    trustDevice: true
})

// サーバー
const data = await auth.api.verifyTwoFactorOTP({
    body: {
        code: "012345",
        trustDevice: true
    },
    headers: await headers()
})
```

### バックアップコード生成

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.generateBackupCodes({ password })

// サーバー
const data = await auth.api.generateBackupCodes({
    body: { password },
    headers: await headers()
})
```

新しいコードを生成すると以前のコードは削除される。

### バックアップコード検証

```typescript
// クライアント
const { data, error } = await authClient.twoFactor.verifyBackupCode({
    code: "123456",
    disableSession: false,
    trustDevice: true
})

// サーバー
const data = await auth.api.verifyBackupCode({
    body: {
        code: "123456",
        disableSession: false,
        trustDevice: true
    },
    headers: await headers()
})
```

パラメータ:
- `code` (string, 必須): バックアップコード
- `disableSession` (boolean, 任意): セッション Cookie の設定を防ぐ
- `trustDevice` (boolean, 任意): デバイスを30日間信頼する

コードは一度だけ使用可能で、検証後に削除される。

### バックアップコード閲覧（サーバーのみ）

```typescript
const data = await auth.api.viewBackupCodes({
    body: { userId: "user-id" }
})
```

### 2FA 有効ユーザーのサインイン

2FA が有効なユーザーがサインインすると、レスポンスに `twoFactorRedirect: true` が含まれる。

```typescript
await authClient.signIn.email({
    email: "user@example.com",
    password: "password123"
}, {
    async onSuccess(context) {
        if (context.data.twoFactorRedirect) {
            // 2FA 検証フローを処理
        }
    }
})
```

代替設定:

```typescript
// グローバルコールバック
twoFactorClient({
    onTwoFactorRedirect(){
        // グローバルに検証を処理
    }
})

// ページにリダイレクト（フルリロードが発生）
twoFactorClient({
    twoFactorPage: "/two-factor"
})
```

## 設定オプション

### サーバーオプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `twoFactorTable` | string | `"twoFactor"` | 2FA データのテーブル名 |
| `skipVerificationOnEnable` | boolean | `false` | 有効化時の TOTP 検証をスキップ |
| `issuer` | string | アプリ名 or "Better Auth" | TOTP 発行者の表示名 |

### TOTP オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `digits` | number | 6 | 生成コードの桁数 |
| `period` | number | 30 | 時間ウィンドウ（秒） |

### OTP オプション

| オプション | 型 | 説明 |
|---|---|---|
| `sendOTP` | function | OTP をユーザーに送信するコールバック |
| `period` | number | コードの有効期間（秒） |
| `storeOTP` | string | ストレージ戦略識別子 |

### バックアップコードオプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `amount` | number | 10 | 生成するコード数 |
| `length` | number | 8 | コードあたりの文字数 |
| `customBackupCodesGenerate` | function | - | カスタム生成ロジック |
| `storeBackupCodes` | string | - | ストレージ識別子 |

### クライアントオプション

```typescript
twoFactorClient({
    onTwoFactorRedirect(){
        // ユーザーが 2FA を検証する必要があるときのコールバック
    }
})
```

## DB スキーマ

### user テーブル

| フィールド | 型 | 任意 | 説明 |
|---|---|---|---|
| `twoFactorEnabled` | boolean | Yes | 2FA の有効化状態 |

### twoFactor テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| `id` | string | PK | 認証レコード ID |
| `userId` | string | FK | 関連ユーザー |
| `secret` | string | - | コード生成用の TOTP シークレット |
| `backupCodes` | string | - | シリアライズされたリカバリーコード |

## 注意点

- 2FA は現時点ではクレデンシャルアカウントにのみ有効化可能。ソーシャルアカウントでは、プロバイダー側で既に 2FA を処理していると想定される
- サーバー側の auth メソッドを使用する場合、状態を維持するためにレスポンスヘッダー/Cookie を後続の 2FA 呼び出しに転送する必要がある
- OTP メソッドにはプラグイン設定で `sendOTP` コールバックの実装が必要
- 信頼済みデバイスは正確に30日間記憶され、そのウィンドウ内でのログイン成功時に期間が更新される
- `twoFactorPage` 設定を使用するとフルブラウザリロードが発生する。プログラム的な処理には `onTwoFactorRedirect` が推奨
