# Email & Password

Built-in authenticator that does not require external provider credentials.

## サーバー設定

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
});
```

## 設定オプション

| Name | Type | Description |
|------|------|-------------|
| `enabled` | boolean | Enable email/password authentication |
| `disableSignUp` | boolean | Disable user registration |
| `minPasswordLength` | number | Minimum password length (default: 8) |
| `maxPasswordLength` | number | Maximum password length (default: 128) |
| `sendResetPassword` | function | Email sending handler for password resets |
| `onPasswordReset` | function | Callback after successful password reset |
| `onExistingUserSignUp` | function | Callback when signup attempted with existing email |
| `autoSignIn` | boolean | Auto sign-in after signup |
| `requireEmailVerification` | boolean | Require email verification before login |
| `revokeSessionsOnPasswordReset` | boolean | Invalidate all sessions on password change |
| `resetPasswordTokenExpiresIn` | number | Token expiration time |
| `password` | object | Custom hashing algorithm configuration |

## クライアント操作

### Sign Up

```typescript
const { data, error } = await authClient.signUp.email({
  name: "John Doe",
  email: "john.doe@example.com",
  password: "password1234",
  image: "https://example.com/image.png",
  callbackURL: "https://example.com/callback",
});
```

### Sign In

```typescript
const { data, error } = await authClient.signIn.email({
  email: "john.doe@example.com",
  password: "password1234",
  rememberMe: true,
  callbackURL: "https://example.com/callback",
});
```

### Sign Out

```typescript
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login");
    },
  },
});
```

### Change Password (authenticated users)

```typescript
const { data, error } = await authClient.changePassword({
  newPassword: "newpassword1234",
  currentPassword: "oldpassword1234",
  revokeOtherSessions: true,
});
```

### Request Password Reset

```typescript
const { data, error } = await authClient.requestPasswordReset({
  email: "john.doe@example.com",
  redirectTo: "https://example.com/reset-password",
});
```

### Complete Password Reset

```typescript
const { data, error } = await authClient.resetPassword({
  newPassword: "password1234",
  token, // from URL parameter
});
```

## コード例

### Email Verification Configuration

```typescript
export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  emailAndPassword: {
    requireEmailVerification: true,
  },
});
```

### Password Reset Configuration

```typescript
emailAndPassword: {
  enabled: true,
  sendResetPassword: async ({ user, url, token }, request) => {
    void sendEmail({
      to: user.email,
      subject: "Reset your password",
      text: `Click the link to reset your password: ${url}`,
    });
  },
  onPasswordReset: async ({ user }, request) => {
    console.log(`Password for user ${user.email} has been reset.`);
  },
}
```

### Custom Password Hashing

Better Auth uses scrypt by default. To use a custom algorithm (e.g., Argon2):

```typescript
import { hash, verify } from "@node-rs/argon2";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
});
```

## 注意点

- Default password length: minimum 8, maximum 128 characters
- Avoid awaiting the email sending function to prevent timing attacks
- Email enumeration protection: returns identical responses whether email exists or not when verification is required
- No external OAuth credentials needed
- Use `customSyntheticUser` option when plugins add user fields to maintain security
