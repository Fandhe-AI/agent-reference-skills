# Social Sign-In

Authenticate users via OAuth providers such as GitHub and Google.

```typescript
// Server: configure social providers
export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
```

```typescript
// Client: initiate OAuth flow
await authClient.signIn.social({
  provider: "github",           // "google" | "discord" | "apple" | ...
  callbackURL: "/dashboard",
  errorCallbackURL: "/error",
  newUserCallbackURL: "/welcome", // redirect only for first-time sign-ups
});
```

## Notes

- The OAuth redirect URI registered with the provider must match `{BETTER_AUTH_URL}/api/auth/callback/{provider}`
- Over 40 providers are supported (Apple, Discord, Google, LinkedIn, Twitter/X, Spotify, Slack, etc.)
- `disableRedirect: true` returns the authorization URL without navigating, for manual redirect control
- Multiple providers can be configured simultaneously in the `socialProviders` object
