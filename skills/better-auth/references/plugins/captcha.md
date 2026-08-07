# Captcha

The Captcha plugin integrates bot protection by adding captcha verification to key endpoints. It ensures actions like sign-up, sign-in, and password reset can only be performed by human users.

Supported providers: Google reCAPTCHA, Cloudflare Turnstile, hCaptcha, CaptchaFox

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

### How it works

1. Intercepts all POST requests to the configured endpoints
2. Verifies the token server-side against the provider's `/siteverify` endpoint
3. Returns an error if the token is missing, rejected, or `/siteverify` is unavailable
4. Continues the request if the token is accepted

## Options / Props

| Option | Type | Required | Default | Description |
|---|---|---|---|---|
| `provider` | string | Yes | - | Captcha provider |
| `secretKey` | string | Yes | - | Provider secret key for server-side verification |
| `endpoints` | string[] | No | `["/sign-up/email", "/sign-in/email", "/request-password-reset"]` | Paths where captcha verification is enforced |
| `minScore` | number | No | 0.5 | Minimum score threshold (Google reCAPTCHA v3 only) |
| `siteKey` | string | No | - | Prevents token reuse across site keys (hCaptcha, CaptchaFox only) |
| `siteVerifyURLOverride` | string | No | - | Custom URL for the captcha verification request |

## Notes

- Token verification only happens on the server
- The IP address is automatically detected server-side
- The request is aborted if the token is missing or rejected
