# Basic Usage

Core authentication patterns: email/password authentication, social OAuth, session management, sign-out.

## Signature / Usage

### Email & Password — server setup

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,       // default: true
    minPasswordLength: 8,   // default: 8
  },
});
```

### Email & Password — sign up (client)

```typescript
const { data, error } = await authClient.signUp.email({
  email: "user@example.com",
  password: "password1234",
  name: "Jane Doe",
  image: "https://example.com/avatar.png",
  callbackURL: "/dashboard",
}, {
  onRequest: (ctx) => { /* show loading state */ },
  onSuccess: (ctx) => { /* redirect or update UI */ },
  onError: (ctx) => { alert(ctx.error.message); },
});
```

### Email & Password — sign in (client)

```typescript
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "password1234",
  callbackURL: "/dashboard",
  rememberMe: false,
});
```

### Email & Password — sign in (server)

```typescript
const response = await auth.api.signInEmail({
  body: { email: "user@example.com", password: "password1234" },
  asResponse: true,
});
```

### Social Sign-On (OAuth) — server setup

```typescript
export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### Social Sign-On (OAuth) — client

```typescript
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
  errorCallbackURL: "/error",
  newUserCallbackURL: "/welcome",
  disableRedirect: true,  // manual redirect
});
```

Supported providers: Apple, Google, GitHub, Discord, LinkedIn, Twitter/X, PayPal, Slack, Twitch, and 40+ more.

### Session management — client (hook)

```typescript
// React
const { data: session, isPending, error, refetch } = authClient.useSession();

// Vue
const session = authClient.useSession(); // { data, isPending, error, refetch }

// Svelte
const session = authClient.useSession(); // reactive store
```

### Session management — client (async)

```typescript
const { data: session, error } = await authClient.getSession();
```

### Session management — server

```typescript
// Next.js
import { headers } from "next/headers";
const session = await auth.api.getSession({
  headers: await headers(),
});

// Nuxt
const session = await auth.api.getSession({
  headers: event.headers,
});
```

### Sign out

```typescript
await authClient.signOut();

// With redirect
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => router.push("/login"),
  },
});
```

### Plugin example: two-factor authentication

```typescript
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [twoFactor()],
});
```

Run a migration after adding a plugin:

```bash
npx auth migrate
```

```typescript
import { createAuthClient } from "better-auth/client";
import { twoFactorClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  plugins: [
    twoFactorClient({ twoFactorPage: "/two-factor" }),
  ],
});
```

2FA methods:

```typescript
await authClient.twoFactor.enable({ password });
await authClient.twoFactor.disable({ password });
await authClient.twoFactor.verifyTOTP({ code: "123456", trustDevice: true });
```

## Options / Props

`emailAndPassword` configuration options:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | boolean | `false` | Enables email/password authentication |
| `autoSignIn` | boolean | `true` | Automatically signs in after sign-up |
| `minPasswordLength` | number | `8` | Minimum password length |

50+ plugins are available, including username, magic link, passkey, email-OTP, JWT, organization, SSO, SAML, and API keys.

## Notes

- Always call client methods from the client side (do not use them from the server)
- Set `autoSignIn: false` to disable automatic sign-in after sign-up
- Always run `npx auth migrate` to apply schema changes after adding a plugin
- Passwords require a minimum of 8 characters by default (configurable)
- Always use HTTPS in production
- Secure cookies are applied to session management
- Email verification can be required before sign-in

## Related

- [Installation](./installation.md)
