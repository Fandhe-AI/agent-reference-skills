# Email & Password

Built-in authenticator that does not require external provider credentials.

## Signature / Usage

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
});
```

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
    // Avoid logging PII such as email addresses
    console.log(`Password reset completed for user ${user.id}`);
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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `enabled` | boolean | Enable email/password authentication |
| `disableSignUp` | boolean | Disable user registration |
| `minPasswordLength` | number | Minimum password length (default: 8) |
| `maxPasswordLength` | number | Maximum password length (default: 128) |
| `sendResetPassword` | function | Email sending handler for password resets |
| `onPasswordReset` | function | Callback triggered after a user's password is reset. Runs after the new password is saved and, when `revokeSessionsOnPasswordReset` is enabled, after sessions are revoked |
| `onExistingUserSignUp` | function | Callback when signup attempted with existing email |
| `autoSignIn` | boolean | Auto sign-in after signup |
| `requireEmailVerification` | boolean | Require email verification before email/password login (does not gate social sign-in) |
| `revokeSessionsOnPasswordReset` | boolean | Revoke all of the user's sessions when resetting the password. For database sessions, revocation and the password change run in one transaction when transactions are enabled for the adapter; secondary-storage sessions are removed after commit, best-effort |
| `resetPasswordTokenExpiresIn` | number | Token expiration time |
| `password` | object | Custom hashing algorithm configuration |

## Notes

- Default password length: minimum 8, maximum 128 characters
- Avoid awaiting the email sending function to prevent timing attacks
- Email enumeration protection: returns identical responses whether email exists or not when verification is required
- No external OAuth credentials needed
- Use `customSyntheticUser` option when plugins add user fields (e.g. admin, two-factor, phone-number) so the synthetic sign-up response is indistinguishable from a real one
- `requireEmailVerification` applies only to email and password sign-in and requires `sendVerificationEmail`. Social sign-in is not gated by it; it has its own opt-in per-provider `requireEmailVerification`. With it enabled, signing up with an existing email returns a success response instead of an error (enumeration protection).
- `onPasswordReset` runs after the new password is saved (and after session revocation when enabled). If the callback throws, the request returns an error but the reset has already taken effect.
- Password reset order: Better Auth checks the new password before it spends the reset token, so a rejected password (for example one refused by Have I Been Pwned) always leaves the link usable. For database sessions, revocation and the password change succeed or fail together when adapter transactions are enabled (Drizzle and Prisma only with `transaction: true`; a standalone MongoDB server and Cloudflare D1 do not support them): the token is spent, sessions are revoked, and the password is saved in one transaction, so on failure the old password stays and the same link can be used again when verification values are stored in the database (the default without secondary storage; with secondary storage set `verification.storeInDatabase: true`). Otherwise the token is spent and the user needs a new link. The email OTP and phone number reset endpoints behave the same way.
- Weaker cases: without adapter transactions, the token is spent and sessions are revoked (including secondary-storage copies) before the password is saved, so a later save failure leaves the old password with revoked sessions and the user needs a new link or OTP. With secondary storage, sessions are removed from it only after the database work commits; a failure there is logged, the new password is kept, and those sessions can stay valid until they expire.

## Related

- [Social Providers Common](./social-providers-common.md)
