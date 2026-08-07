# Email

Email is a required field for all Better Auth users regardless of the auth method. The framework provides email verification, password reset, and token-based workflows.

## Signature / Usage

Token-based email verification (OTP-based verification is available via the Email OTP plugin). Requires implementing the `sendVerificationEmail` function. Setting `emailAndPassword.requireEmailVerification` to `true` blocks unverified logins (returns HTTP 403).

### Server — basic verification setup

```typescript
export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // `url` is the pre-built verification link
      // `token` can be used to build a custom verification URL
      void sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: `Click to verify: ${url}`,
      });
      // Don't await this — avoids timing attacks
    },
    sendOnSignUp: true,
  },
});
```

### Server — require verification for login

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

### Server — auto sign-in + post-verification callback

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

### Client — handling 403 for unverified login

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

### Client — manually triggering verification

```typescript
await authClient.sendVerificationEmail({
  email: "user@email.com",
  callbackURL: "/",
});
```

### Client — custom token verification

```typescript
await authClient.verifyEmail({
  query: { token: "verification_token_value" },
});
```

### Password reset email

```typescript
// Server config
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

## Options / Props

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sendVerificationEmail` | `function` | — | Handler for sending the verification email (required) |
| `sendOnSignUp` | `boolean` | `false` | Automatically send a verification email on sign-up |
| `sendOnSignIn` | `boolean` | `false` | Resend the verification email on sign-in if unverified |
| `autoSignInAfterVerification` | `boolean` | `false` | Create a session immediately after email confirmation |
| `afterEmailVerification` | `async function` | — | Callback executed after successful verification |

### Feature summary

| Feature | Trigger | Use Case |
|---------|---------|----------|
| Auto verification | `sendOnSignUp: true` | New user registration flow |
| Required verification | `requireEmailVerification: true` | High-security applications |
| Manual trigger | `sendVerificationEmail()` | User-initiated re-verification |
| Auto sign-in | `autoSignInAfterVerification: true` | Seamless onboarding |
| Custom callback | `afterEmailVerification` | Post-verification workflow |

## Notes

- **Timing attack prevention**: do not await email sending inside verification/reset handlers
- **Serverless platforms**: use platform-specific mechanisms such as Vercel (`waitUntil`) or Firebase (`onFinish`) to ensure delivery without blocking the response
- If `requireEmailVerification` is enabled and an SSO user's email is unverified, a verification email is sent but SSO login is not blocked

### Security

- **Timing attacks**: do not await email sending in verification/reset handlers
- **Token security**: tokens are cryptographically generated. Never expose raw tokens in logs
- **Email ownership confirmation**: verification confirms actual control of the address, not merely format validity

## Related

- [Users & Accounts](./users-accounts.md)
