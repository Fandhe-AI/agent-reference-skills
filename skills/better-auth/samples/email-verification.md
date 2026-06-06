# Email Verification

Send and verify email confirmation links for new user accounts.

```typescript
// Server: configure email verification
export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
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
