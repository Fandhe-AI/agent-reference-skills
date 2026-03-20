# Username

Username プラグインは、メールとパスワードの認証に軽量なユーザー名サポートを追加する。ユーザーはメールアドレスの代わりにユーザー名で認証できる。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { username } from "better-auth/plugins"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        username()
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
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        usernameClient()
    ]
})
```

## API メソッド

### ユーザー名でサインアップ

```typescript
// クライアント
const { data, error } = await authClient.signUp.email({
    email: "email@domain.com",
    name: "Test User",
    password: "password1234",
    username: "test",
    displayUsername: "Test User123"
})

// サーバー
const data = await auth.api.signUpEmail({
    body: {
        email: "email@domain.com",
        name: "Test User",
        password: "password1234",
        username: "test",
        displayUsername: "Test User123"
    }
})
```

username のみ指定した場合、displayUsername は正規化前の username 値がデフォルトになる。

### ユーザー名でサインイン

```typescript
// クライアント
const { data, error } = await authClient.signIn.username({
    username: "test",
    password: "password1234"
})

// サーバー
const data = await auth.api.signInUsername({
    body: {
        username: "test",
        password: "password1234"
    }
})
```

### ユーザー名更新

```typescript
// クライアント
const { data, error } = await authClient.updateUser({
    username: "new-username"
})

// サーバー
const data = await auth.api.updateUser({
    body: { username: "new-username" }
})
```

### ユーザー名の利用可否チェック

```typescript
// クライアント
const { data: response, error } = await authClient.isUsernameAvailable({
    username: "new-username"
})

if (response?.available) {
    console.log("Username is available")
}

// サーバー
const response = await auth.api.isUsernameAvailable({
    body: { username: "new-username" }
})
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `minUsernameLength` | number | 3 | 最小ユーザー名文字数 |
| `maxUsernameLength` | number | 30 | 最大ユーザー名文字数 |
| `usernameValidator` | function | 英数字、アンダースコア、ドットのみ | カスタムバリデーション関数 |
| `displayUsernameValidator` | function | なし | 表示ユーザー名のバリデーション |
| `usernameNormalization` | function \| false | 小文字変換 | 正規化関数 |
| `displayUsernameNormalization` | function \| false | なし | 表示ユーザー名の正規化 |
| `validationOrder` | object | プレ正規化 | バリデーション順序 |

### カスタムバリデーション

```typescript
username({
    usernameValidator: (username) => {
        if (username === "admin") return false
        return true
    }
})
```

### カスタム正規化

```typescript
username({
    usernameNormalization: (username) => {
        return username.toLowerCase()
            .replaceAll("0", "o")
            .replaceAll("3", "e")
            .replaceAll("4", "a")
    }
})
```

### バリデーション順序

```typescript
username({
    validationOrder: {
        username: "post-normalization",
        displayUsername: "post-normalization"
    }
})
```

### ユーザー名利用可否チェックの無効化

```typescript
betterAuth({
    emailAndPassword: { enabled: true },
    disabledPaths: ["/is-username-available"],
    plugins: [username()]
})
```

## DB スキーマ

### user テーブル追加フィールド

| フィールド | 型 | 任意 | 説明 |
|---|---|---|---|
| `username` | string | Yes | 認証用の正規化されたユーザー名 |
| `displayUsername` | string | Yes | 正規化前の表示用ユーザー名 |

## 注意点

- ユーザー名はデフォルトで小文字に正規化され、大文字小文字を区別しないマッチングになる
- `displayUsername` は表示目的で元のケースを保持する
- サインアップ/更新時に username のみ指定すると、displayUsername は正規化前の username 値に自動的に設定される
- 利用可否チェックエンドポイントはセキュリティ/プライバシー上の理由で無効化可能
