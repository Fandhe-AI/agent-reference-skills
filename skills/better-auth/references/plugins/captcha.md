# Captcha

The Captcha plugin integrates bot protection by adding captcha verification to key endpoints. It ensures actions like sign-up, sign-in, and password reset can only be performed by human users.

Supported providers: Google reCAPTCHA, Cloudflare Turnstile, hCaptcha, CaptchaFox, Vercel BotID

Works out of the box with Email & Password authentication. Other authentication methods require configuring the `endpoints` array.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { captcha } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        captcha({
            provider: "cloudflare-turnstile",
            // "google-recaptcha" | "hcaptcha" | "captchafox"
            secretKey: process.env.TURNSTILE_SECRET_KEY!,
        }),
    ],
})
```

### Setup (client side)

```typescript
await authClient.signIn.email({
    email: "user@example.com",
    password: "secure-password",
    fetchOptions: {
        headers: {
            "x-captcha-response": turnstileToken,
        },
    },
})
```

The `x-captcha-user-remote-ip` header is unnecessary. IP detection happens automatically on the server side.

Recommended client libraries:

- **Cloudflare Turnstile**: `@marsidev/react-turnstile`
- **Google reCAPTCHA**: `react-google-recaptcha` (v2), `react-google-recaptcha-v3` (v3)
- **hCaptcha**: `@hcaptcha/react-hcaptcha`
- **CaptchaFox**: `@captchafox/react`

### Vercel BotID

BotID requires a Vercel deployment and client-side setup (install `botid`; follow Vercel's setup guide for rewrites and client integration). The plugin does not use a `secretKey` or an `x-captcha-response` header:

```typescript
import { checkBotId } from "botid/server";
import { betterAuth } from "better-auth";
import { captcha } from "better-auth/plugins";

export const auth = betterAuth({
    plugins: [
        captcha({
            provider: "vercel-botid",
            checkBotId,
        }),
    ],
});
```

With `initBotId`, protect Better Auth's routes at their actual request paths:

```typescript
import { initBotId } from "botid/client/core";

initBotId({
    protect: [
        { path: "/api/auth/sign-up/email", method: "POST" },
        { path: "/api/auth/sign-in/email", method: "POST" },
        { path: "/api/auth/request-password-reset", method: "POST" },
    ],
});
```

BotID uses the browser's full request path, while the plugin's `endpoints` option omits the Better Auth base path (`/sign-in/email`); keep both in sync if you change `basePath` or `endpoints`. Sign in normally without a captcha token header. BotID does not support native HTML form submissions. Local development allows requests by default, so verify the full flow on Vercel.

### How it works

1. Intercepts all POST requests to the configured endpoints
2. Verifies the token server-side against the provider's `/siteverify` endpoint (Vercel BotID instead uses the supplied `checkBotId` function)
3. Returns an error if the token is missing, rejected, or `/siteverify` is unavailable (BotID: rejected when `checkBotId` / `validateRequest` determines it is a bot)
4. Continues the request if the token is accepted

## Options / Props

| Option | Type | Required | Default | Description |
|---|---|---|---|---|
| `provider` | string | Yes | - | Captcha provider |
| `secretKey` | string | Yes (all providers except `vercel-botid`) | - | Provider secret key for server-side verification |
| `endpoints` | string[] | No | `["/sign-up/email", "/sign-in/email", "/request-password-reset"]` | Paths where captcha verification is enforced; replaces the defaults when set. Exact paths or wildcards (`/sign-in/*` one segment, `/sign-in/**` nested) |
| `checkBotId` | function | Yes (Vercel BotID) | - | Vercel's server-side check, imported from `botid/server` |
| `validateRequest` | function | No (Vercel BotID only) | allow `isBot: false` | Custom validation; return `true` to allow, `false` to reject |
| `minScore` | number | No | 0.5 | Minimum score threshold (Google reCAPTCHA v3 only) |
| `siteKey` | string | No | - | Prevents token reuse across site keys (hCaptcha, CaptchaFox only) |
| `siteVerifyURLOverride` | string | No | - | Custom URL for the captcha verification request |

## Notes

- Token verification only happens on the server
- The IP address is automatically detected server-side
- The request is aborted if the token is missing or rejected
- Changed in 1.7: captcha rules match full request paths or explicit wildcards, which closes a way to skip a rule through partial path matching. Replace a partial path like `/sign-in` with `/sign-in/*` or `/sign-in/**`. A wildcard such as `/sign-in/*` also matches `/sign-in/email-otp`; if that route should stay exempt, list the exact protected endpoints instead.
