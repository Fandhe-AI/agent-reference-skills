# Email & Password Authentication

Sign up and sign in users with email and password credentials.

```typescript
// Server: enable email/password auth
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,       // sign in automatically after sign-up (default: true)
    minPasswordLength: 8,   // default: 8
  },
});
```

```typescript
// Client: sign up
const { data, error } = await authClient.signUp.email({
  email: "user@example.com",
  password: "password1234",
  name: "Jane Doe",
  callbackURL: "/dashboard",
}, {
  onSuccess: () => router.push("/dashboard"),
  onError: (ctx) => alert(ctx.error.message),
});
```

```typescript
// Client: sign in
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "password1234",
  callbackURL: "/dashboard",
  rememberMe: true,
});
```

```typescript
// Server-side sign in (e.g. in a server action)
const response = await auth.api.signInEmail({
  body: { email: "user@example.com", password: "password1234" },
  asResponse: true,
});
```

## Notes

- `callbackURL` is used only for redirect-based flows; omit it for SPA/fetch usage
- `rememberMe: false` creates a session-only cookie that expires on browser close
- `autoSignIn: false` can be used when email verification is required before first login
- Passwords are hashed server-side; plain-text passwords are never stored
