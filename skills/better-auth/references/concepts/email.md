# Email

Email は認証方法に関係なく Better Auth のすべてのユーザーに必須のフィールド。フレームワークはメール検証、パスワードリセット、トークンベースのワークフローを提供する。

## メール検証

トークンベースのメール検証（OTP ベースは Email OTP プラグインで利用可能）。`sendVerificationEmail` 関数の実装が必要。

### 設定オプション

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sendVerificationEmail` | `function` | — | 検証メール送信ハンドラー（必須） |
| `sendOnSignUp` | `boolean` | `false` | 登録時に自動的に検証メールを送信 |
| `sendOnSignIn` | `boolean` | `false` | 未検証の場合、サインイン時に検証メールを再送 |
| `autoSignInAfterVerification` | `boolean` | `false` | メール確認直後にセッションを作成 |
| `afterEmailVerification` | `async function` | — | 検証成功後に実行されるコールバック |

`emailAndPassword.requireEmailVerification` を `true` に設定すると、未検証ログインをブロック（HTTP 403 を返す）。

## コード例

### サーバー — 基本検証セットアップ

```typescript
export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // `url` は構築済みの検証リンク
      // `token` はカスタム検証 URL 構築用
      void sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: `Click to verify: ${url}`,
      });
      // await しないこと — タイミング攻撃を回避
    },
    sendOnSignUp: true,
  },
});
```

### サーバー — ログインに検証を必須化

```typescript
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({ to: user.email, text: url });
    },
    sendOnSignIn: true,
  },
});
```

### サーバー — 自動サインイン + 検証後コールバック

```typescript
export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({ to: user.email, text: url });
    },
    autoSignInAfterVerification: true,
    async afterEmailVerification(user, request) {
      console.log(`${user.email} verified successfully`);
    },
  },
});
```

### クライアント — 未検証ログインの 403 処理

```typescript
authClient.signIn.email(
  { email: "user@example.com", password: "password" },
  {
    onError: (ctx) => {
      if (ctx.error.status === 403) {
        alert("Please verify your email address");
      }
    },
  }
);
```

### クライアント — 手動検証トリガー

```typescript
await authClient.sendVerificationEmail({
  email: "user@email.com",
  callbackURL: "/",
});
```

### クライアント — カスタムトークン検証

```typescript
await authClient.verifyEmail({
  query: { token: "verification_token_value" },
});
```

## パスワードリセットメール

```typescript
// サーバー設定
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Reset link: ${url}`,
      });
    },
  },
});
```

## 機能サマリー

| Feature | Trigger | Use Case |
|---------|---------|----------|
| 自動検証 | `sendOnSignUp: true` | 新規ユーザー登録フロー |
| 必須検証 | `requireEmailVerification: true` | 高セキュリティアプリケーション |
| 手動トリガー | `sendVerificationEmail()` | ユーザー主導の再検証 |
| 自動サインイン | `autoSignInAfterVerification: true` | シームレスなオンボーディング |
| カスタムコールバック | `afterEmailVerification` | 検証後ワークフロー |

## 注意点

- **タイミング攻撃防止**: 検証/リセットハンドラー内でメール送信を await しないこと
- **サーバーレスプラットフォーム**: Vercel (`waitUntil`)、Firebase (`onFinish`) 等のプラットフォーム固有メカニズムを使用し、レスポンスをブロックせずに配信を確保
- `requireEmailVerification` が有効で SSO ユーザーのメールが未検証の場合、検証メールは送信されるが SSO ログインはブロックされない

## セキュリティ考慮事項

- **タイミング攻撃**: 検証/リセットハンドラーでメール送信を await しない
- **トークンセキュリティ**: トークンは暗号的に生成される。ログに生トークンを露出させないこと
- **メール所有確認**: 検証はフォーマットの妥当性ではなく、アドレスの実際の管理権を確認する
