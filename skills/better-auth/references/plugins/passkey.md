# Passkey

Passkey プラグインは、WebAuthn と FIDO2 標準を利用した暗号鍵ペアによる安全なパスワードレス認証を提供する。内部的に SimpleWebAuthn を使用し、生体認証、PIN、セキュリティキーによる認証を可能にする。

## セットアップ

### インストール

```bash
npm install @better-auth/passkey
```

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { passkey } from "@better-auth/passkey"

export const auth = betterAuth({
    plugins: [
        passkey(),
    ],
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
import { passkeyClient } from "@better-auth/passkey/client"

export const authClient = createAuthClient({
    plugins: [
        passkeyClient()
    ]
})
```

## API メソッド

### パスキー追加/登録

`POST /passkey/add-passkey`

```typescript
// クライアント
const { data, error } = await authClient.passkey.addPasskey({
    name: "example-passkey-name",
    authenticatorAttachment: "cross-platform",
})

// サーバー
const data = await auth.api.addPasskey({
    body: {
        name: "example-passkey-name",
        authenticatorAttachment: "cross-platform",
    },
})
```

パラメータ:
- `name` (string, 任意): 認証器のラベル。省略時はユーザーメールまたは ID がデフォルト
- `authenticatorAttachment` ("platform" | "cross-platform", 任意): 登録する認証器タイプ

クライアント専用エンドポイント。`throw: true` は効果なし。

### パスキーでサインイン

`POST /sign-in/passkey`

```typescript
// クライアント
const { data, error } = await authClient.signIn.passkey({
    autoFill: true,
})

// コールバック付き
await authClient.signIn.passkey({
    autoFill: true,
    fetchOptions: {
        onSuccess(context) {
            window.location.href = "/dashboard"
        },
        onError(context) {
            console.error("Authentication failed:", context.error.message)
        }
    }
})
```

パラメータ:
- `autoFill` (boolean): ブラウザオートフィル（Conditional UI）を有効にする

### パスキー一覧

`GET /passkey/list-user-passkeys`

```typescript
// クライアント
const { data: passkeys, error } = await authClient.passkey.listUserPasskeys()

// サーバー
const passkeys = await auth.api.listPasskeys({
    headers: await headers(),
})
```

### パスキー削除

`POST /passkey/delete-passkey`

```typescript
// クライアント
const { data, error } = await authClient.passkey.deletePasskey({
    id: "some-passkey-id",
})

// サーバー
const data = await auth.api.deletePasskey({
    body: { id: "some-passkey-id" },
    headers: await headers(),
})
```

### パスキー名更新

`POST /passkey/update-passkey`

```typescript
// クライアント
const { data, error } = await authClient.passkey.updatePasskey({
    id: "id of passkey",
    name: "my-new-passkey-name",
})

// サーバー
const data = await auth.api.updatePasskey({
    body: {
        id: "id of passkey",
        name: "my-new-passkey-name",
    },
    headers: await headers(),
})
```

## Conditional UI（ブラウザオートフィル）

### 入力フィールドの更新

`autocomplete="webauthn"` 属性を追加（最後のエントリとして）:

```html
<input type="text" name="name" autocomplete="username webauthn">
<input type="password" name="password" autocomplete="current-password webauthn">
```

### パスキーのプリロード

```typescript
useEffect(() => {
    if (!PublicKeyCredential.isConditionalMediationAvailable ||
        !PublicKeyCredential.isConditionalMediationAvailable()) {
        return
    }
    void authClient.signIn.passkey({ autoFill: true })
}, [])
```

## 設定オプション

| オプション | 型 | 必須 | 説明 |
|---|---|---|---|
| `rpID` | string | Yes | ウェブサイトの一意識別子（ドメインベース） |
| `rpName` | string | Yes | 人間が読めるサイト名 |
| `origin` | string | Yes | Better Auth サーバーのオリジン URL（末尾スラッシュなし） |
| `authenticatorSelection` | object | No | WebAuthn 認証器選択条件のカスタマイズ |
| `advanced.webAuthnChallengeCookie` | string | No | チャレンジ Cookie 名（デフォルト: `"better-auth-passkey"`） |

### authenticatorSelection オプション

- `authenticatorAttachment`: "platform"（デバイス固定）| "cross-platform"（セキュリティキー）| 未設定（両方許可、platform 優先）
- `residentKey`: "required"（最高セキュリティ）| "preferred"（推奨）| "discouraged"（最速）
- `userVerification`: "required"（最高セキュリティ）| "preferred" | "discouraged"（最速）

## DB スキーマ

### passkey テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意のパスキー識別子 |
| name | string | ? | パスキー認証器ラベル（任意） |
| publicKey | string | - | 公開鍵クレデンシャル |
| userId | string | FK | 関連ユーザー ID |
| credentialID | string | - | 登録済みクレデンシャル一意識別子 |
| counter | number | - | パスキーカウンター値 |
| deviceType | string | - | 認証器デバイスタイプ |
| backedUp | boolean | - | バックアップ状態 |
| transports | string | ? | 登録時トランスポート（任意） |
| createdAt | Date | ? | 作成日時 |
| aaguid | string | ? | Authenticator Attestation GUID |

## Expo 連携

Expo で使用する場合、チャレンジ Cookie が適切に検出・保存されるよう `cookiePrefix` を設定する。

```typescript
// サーバー
passkey({
    advanced: {
        webAuthnChallengeCookie: "my-app-passkey"
    }
})

// クライアント
expoClient({
    storage: SecureStore,
    cookiePrefix: "my-app"
})

// 複数プレフィックス
expoClient({
    storage: SecureStore,
    cookiePrefix: ["better-auth", "my-app", "custom-auth"]
})
```

`cookiePrefix` が `webAuthnChallengeCookie` プレフィックスと一致しない場合、パスキー認証は失敗する。

## 注意点

- デバッグ時はChrome DevToolsのWebAuthnタブで「エミュレートされた認証器」を使用可能
- 一部のブラウザではオートフィルプロンプトの前に入力フィールドとのユーザーインタラクションが必要
