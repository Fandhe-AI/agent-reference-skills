# Email Verification

Send and verify email confirmation links for new user accounts.

```typescript
// Server: configure email verification
export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // Do not await delivery: waiting only for existing users makes response time
      // reveal whether the account exists (timing attack). Handle failures without
      // logging the address; on serverless, also pass the promise to `waitUntil`.
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      }).catch(() => console.error("Failed to send verification email"));
    },
    autoSignInAfterVerification: true, // default: false
    sendOnSignUp: true,                // send automatically on sign-up
  },
});
```

```typescript
// Client: manually trigger verification email
await authClient.sendVerificationEmail({
  email: "user@example.com",
  callbackURL: "/dashboard",
});
```

## Notes

- `url` in the callback already contains the verification token; pass it directly in the email
- `requireEmailVerification: true` in `emailAndPassword` blocks sign-in until the email is verified
- `callbackURL` is where the user lands after clicking the verification link
- `sendOnSignUp: true` sends the email automatically without a manual client call
- The verification email is sent without `await` (with a `.catch()` that logs no PII) to avoid leaking account existence through response time, matching references/concepts/email.md; the official sample awaits delivery (Adapted from the official docs)
