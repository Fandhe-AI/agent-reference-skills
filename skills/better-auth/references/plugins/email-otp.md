# Email OTP

The Email OTP plugin enables authentication using one-time passwords sent to an email address. Supports sign-in, email verification, password reset, and email change.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { emailOTP } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                if (type === "sign-in") {
                    // Send OTP for sign-in
                } else if (type === "email-verification") {
                    // Send OTP for email verification
                } else {
                    // Send OTP for password reset
                }
            },
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        emailOTPClient()
    ]
})
```

### Send OTP

`POST /email-otp/send-verification-otp`

```typescript
// Client
const { data, error } = await authClient.emailOtp.sendVerificationOtp({
    email: "user@example.com",
    type: "sign-in",  // "sign-in" | "email-verification" | "forget-password"
})

// Server
const data = await auth.api.sendVerificationOTP({
    body: { email: "user@example.com", type: "sign-in" },
})
```

### Check OTP

`POST /email-otp/check-verification-otp`

```typescript
const { data, error } = await authClient.emailOtp.checkVerificationOtp({
    email: "user@example.com",
    type: "sign-in",
    otp: "123456",
})
```

### Sign in with OTP

`POST /sign-in/email-otp`

```typescript
// Client
const { data, error } = await authClient.signIn.emailOtp({
    email: "user@example.com",
    otp: "123456",
    name: "John Doe",
    image: "https://example.com/image.png",
})

// Server
const data = await auth.api.signInEmailOTP({
    body: {
        email: "user@example.com",
        otp: "123456",
        name: "John Doe",
        image: "https://example.com/image.png",
    },
})
```

Users who don't yet exist are registered automatically. Disable with `disableSignUp: true`.

### Email verification

`POST /email-otp/verify-email`

```typescript
const { data, error } = await authClient.emailOtp.verifyEmail({
    email: "user@example.com",
    otp: "123456",
})
```

### Request password reset

`POST /email-otp/request-password-reset`

```typescript
const { data, error } = await authClient.emailOtp.requestPasswordReset({
    email: "user@example.com",
})
```

### Reset password

`POST /email-otp/reset-password`

```typescript
const { data, error } = await authClient.emailOtp.resetPassword({
    email: "user@example.com",
    otp: "123456",
    password: "new-secure-password",
})
```

### Request email change

`POST /email-otp/request-email-change`

```typescript
const { data, error } = await authClient.emailOtp.requestEmailChange({
    newEmail: "user@example.com",
    otp: "123456",  // required when changeEmail.verifyCurrentEmail is enabled
})
```

Requires a session cookie.

### Change email

`POST /email-otp/change-email`

```typescript
const { data, error } = await authClient.emailOtp.changeEmail({
    newEmail: "user@example.com",
    otp: "123456",
})
```

### OTP storage configuration

```typescript
// Plaintext
emailOTP({ storeOTP: "plain" })

// Encrypted
emailOTP({ storeOTP: "encrypted" })

// Hashed
emailOTP({ storeOTP: "hashed" })

// Custom encryption
emailOTP({
    storeOTP: {
        encrypt: async (otp) => myCustomEncryptor(otp),
        decrypt: async (otp) => myCustomDecryptor(otp),
    }
})

// Custom hashing
emailOTP({
    storeOTP: {
        hash: async (otp) => myCustomHasher(otp),
    }
})
```

### Email change configuration

```typescript
emailOTP({
    changeEmail: {
        enabled: true,
        verifyCurrentEmail: true  // require confirmation from the current email
    }
})
```

### Custom OTP generation

```typescript
emailOTP({
    generateOTP: () => "custom-otp"
})
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `otpLength` | number | 6 | Number of digits in the OTP |
| `expiresIn` | number | 300 | Validity period (seconds) |
| `sendVerificationOnSignUp` | boolean | false | Automatically send an OTP on registration |
| `disableSignUp` | boolean | false | Prevent automatic sign-up during OTP sign-in |
| `allowedAttempts` | number | 3 | Maximum verification attempts before invalidation |
| `resendStrategy` | "rotate" \| "reuse" | "rotate" | "rotate"=new OTP, "reuse"=extend existing |
| `overrideDefaultEmailVerification` | boolean | false | Replace the default email verification with OTP |

## Notes

- To prevent timing attacks, don't `await` email sending. Use `waitUntil` in serverless environments
- The `changeEmail` endpoint requires a session cookie
- Exceeding the maximum attempts returns a `TOO_MANY_ATTEMPTS` error code
- The stored OTP method does not affect the OTP that is sent (it only affects persistence)

## Related

- [magic-link.md](./magic-link.md)
