# Users & Accounts

Better Auth は基本認証を超えた包括的なユーザーとアカウント管理機能を提供する。ユーザー情報更新、メール/パスワード変更、検証付きアカウント削除、トークン暗号化、マルチプロバイダーアカウントリンクが含まれる。

## ユーザー情報更新

```typescript
import { authClient } from "@/lib/auth-client";

await authClient.updateUser({
  image: "https://example.com/image.jpg",
  name: "John Doe",
});
```

## メール変更

### サーバーセットアップ

```typescript
export const auth = betterAuth({
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      void sendEmail({
        to: user.email,
      });
    },
  },
});
```

### 現在のメールによる確認（オプション）

新しいアドレスへの検証を送信する前に、現在のメールで確認を要求:

```typescript
user: {
  changeEmail: {
    enabled: true,
    sendChangeEmailConfirmation: async ({ user, newEmail, url, token }, request) => {
      void sendEmail({
        to: user.email, // 現在のメール
        subject: "Approve email change",
        text: `Click the link to approve the change to ${newEmail}: ${url}`,
      });
    },
  },
}
```

### 検証なしの更新

現在のメールが未検証の場合、即座に更新を許可:

```typescript
changeEmail: {
  enabled: true,
  updateEmailWithoutVerification: true,
}
```

### クライアント使用

```typescript
await authClient.changeEmail({
  newEmail: "new-email@email.com",
  callbackURL: "/dashboard",
});
```

## パスワード変更

```typescript
// クライアント
const { data, error } = await authClient.changePassword({
  newPassword: "newpassword1234",
  currentPassword: "oldpassword1234",
  revokeOtherSessions: true,
});

// サーバー
const data = await auth.api.changePassword({
  body: {
    newPassword: "newpassword1234",
    currentPassword: "oldpassword1234",
    revokeOtherSessions: true,
  },
  headers: await headers(),
});
```

## パスワード設定

パスワードなしの OAuth ユーザー用（サーバーのみ）:

```typescript
import { auth } from "@/lib/auth";

await auth.api.setPassword({
  body: {
    newPassword: "new-password",
  },
  headers: await headers(),
});
```

## パスワード検証

機密操作前のユーザー本人確認:

```typescript
import { auth } from "@/lib/auth";

await auth.api.verifyPassword({
  body: {
    password: "user-password",
  },
  headers: await headers(),
});
```

パスワードなしの OAuth ユーザーはメール検証またはフレッシュセッションチェックを代わりに使用すべき。

## ユーザー削除

### 削除の有効化

```typescript
export const auth = betterAuth({
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});
```

### 検証の追加

削除前のメール検証を実装:

```typescript
user: {
  deleteUser: {
    enabled: true,
    sendDeleteAccountVerification: async ({ user, url, token }, request) => {
      // 検証メールを送信
    },
  },
}
```

### クライアント使用

```typescript
await authClient.deleteUser({
  callbackURL: "/goodbye",
});

// または トークンで
await authClient.deleteUser({
  token,
});

// または パスワードで
await authClient.deleteUser({
  password: "password",
});
```

### 認証要件

ユーザーは以下のいずれかを満たす必要がある:
1. **有効なパスワード** — 削除時に提供
2. **フレッシュセッション** — 最近サインイン（デフォルト: 1 日の鮮度ウィンドウ）
3. **メール検証有効** — OAuth ユーザー向け
4. **有効な検証トークン** — メールコールバックから

### コールバック

**beforeDelete:**

```typescript
deleteUser: {
  enabled: true,
  beforeDelete: async (user) => {
    if (user.email.includes("admin")) {
      throw new APIError("BAD_REQUEST", {
        message: "Admin accounts can't be deleted",
      });
    }
  },
}
```

**afterDelete:**

```typescript
deleteUser: {
  enabled: true,
  afterDelete: async (user, request) => {
    // クリーンアップ処理
  },
}
```

## アカウント管理

各認証プロバイダーはプロバイダー固有のデータ（トークン、認証情報）を保存する「アカウント」を作成する。

### ユーザーアカウント一覧

```typescript
import { authClient } from "@/lib/auth-client";

const accounts = await authClient.listAccounts();
```

## トークン暗号化

Better Auth はデフォルトではトークンを暗号化しない。データベース Hook を使用して暗号化を実装:

```typescript
export const auth = betterAuth({
  databaseHooks: {
    account: {
      create: {
        before(account, context) {
          const withEncryptedTokens = { ...account };
          if (account.accessToken) {
            withEncryptedTokens.accessToken = encrypt(account.accessToken);
          }
          if (account.refreshToken) {
            withEncryptedTokens.refreshToken = encrypt(account.refreshToken);
          }
          return { data: withEncryptedTokens };
        },
      },
    },
  },
});
```

アカウント取得時にトークンを使用する前に復号化する。

## アカウントリンク

アカウントリンクはデフォルトで有効で、ユーザーが複数の認証方法を単一アカウントに関連付けられる。プロバイダーからのメール検証が通常必要。

### リンクの無効化

```typescript
account: {
  accountLinking: {
    enabled: false,
  },
}
```

### 強制リンク

検証に関係なく、信頼プロバイダーからのアカウントを自動リンク:

```typescript
account: {
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github"],
  },
}
```

### 手動ソーシャルアカウントリンク

```typescript
await authClient.linkSocial({
  provider: "google",
  callbackURL: "/callback",
});

// カスタムスコープ付き
await authClient.linkSocial({
  provider: "google",
  callbackURL: "/callback",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

// ID トークン付き（リダイレクトなし）
await authClient.linkSocial({
  provider: "google",
  idToken: {
    token: "id_token_from_provider",
    nonce: "nonce_used_for_token",
    accessToken: "access_token",
    refreshToken: "refresh_token",
  },
});
```

### リンクアカウントに異なるメールを許可

```typescript
accountLinking: {
  allowDifferentEmails: true,
}
```

### リンク時にユーザー情報を更新

```typescript
accountLinking: {
  updateUserInfoOnLink: true,
}
```

### 認証情報アカウントリンク

メール/パスワードリンクには `setPassword`（サーバー）または「パスワードリセット」フローを使用。

## アカウントリンク解除

```typescript
await authClient.unlinkAccount({
  providerId: "google",
});

// 特定アカウントのリンク解除
await authClient.unlinkAccount({
  providerId: "google",
  accountId: "123",
});
```

**セーフガード:** ユーザーがアカウントを 1 つしか持っていない場合、リンク解除は防止される（`allowUnlinkingAll: true` を設定しない限り）。

```typescript
account: {
  accountLinking: {
    allowUnlinkingAll: true,
  },
}
```

## 注意点

- タイミング攻撃を防ぐため、メール送信を await しないこと
- OAuth ユーザーでパスワードがない場合はメール検証またはフレッシュセッションチェックを使用
- アカウントリンクはデフォルトで有効
- トークン暗号化はデフォルトでは行われない — データベースフックで実装が必要
