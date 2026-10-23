# Password Reset

Implement a forgot-password flow: request a reset link and apply the new password.

```typescript
// Server: configure reset email handler
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      // Do not await delivery: waiting only for existing users makes response time
      // reveal whether the account exists (timing attack). Handle failures without
      // logging the address; on serverless, also pass the promise to `waitUntil`.
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      }).catch(() => console.error("Failed to send reset email"));
    },
  },
});
```

```typescript
// Client: step 1 — request reset link
await authClient.requestPasswordReset({
  email: "john.doe@example.com",
  redirectTo: "https://example.com/reset-password",
});
```

```typescript
// Client: step 2 — apply new password (on the reset page)
const token = new URLSearchParams(window.location.search).get("token");

const { data, error } = await authClient.resetPassword({
  newPassword: "newpassword1234",
  token,
});
```

## Notes

- `redirectTo` in step 1 is the URL of the reset form page; better-auth appends the `token` query param
- The token in step 2 must be extracted from the URL query string on the reset page
- Reset tokens expire; the default expiry is 1 hour
- `onPasswordReset` callback can be added to `emailAndPassword` to run logic after a successful reset
- The reset email is sent without `await` (with a `.catch()` that logs no PII) to avoid leaking account existence through response time, matching references/concepts/email.md; the official sample awaits delivery (Adapted from the official docs)
