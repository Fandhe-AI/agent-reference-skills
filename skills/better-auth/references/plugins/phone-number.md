# Phone Number

The Phone Number plugin enables user authentication using phone numbers. It includes OTP verification and provides secure phone-based authentication integrated with SMS providers.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { phoneNumber } from "better-auth/plugins"

const auth = betterAuth({
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // Send the OTP code via SMS
            }
        })
    ]
})
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { phoneNumberClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
    plugins: [
        phoneNumberClient()
    ]
})
```

### Send OTP

`POST /phone-number/send-otp`

```typescript
// Client
const { data, error } = await authClient.phoneNumber.sendOtp({
    phoneNumber: "+1234567890",
})

// Server
const data = await auth.api.sendPhoneNumberOTP({
    body: { phoneNumber: "+1234567890" },
})
```

### Verify phone number

`POST /phone-number/verify`

```typescript
// Client
const { data, error } = await authClient.phoneNumber.verify({
    phoneNumber: "+1234567890",
    code: "123456",
    disableSession: false,
    updatePhoneNumber: false,
})

// Server
const data = await auth.api.verifyPhoneNumber({
    body: {
        phoneNumber: "+1234567890",
        code: "123456",
        disableSession: false,
        updatePhoneNumber: false,
    },
})
```

Parameters:
- `phoneNumber` (string, required): the phone number to verify
- `code` (string, required): the OTP code
- `disableSession` (boolean, optional): prevent session creation after verification
- `updatePhoneNumber` (boolean, optional): update the logged-in user's phone number (requires an active session)

### Sign in with phone number

`POST /sign-in/phone-number`

```typescript
const { data, error } = await authClient.signIn.phoneNumber({
    phoneNumber: "+1234567890",
    password,
    rememberMe: true,
})
```

### Request password reset

`POST /phone-number/request-password-reset`

```typescript
const { data, error } = await authClient.phoneNumber.requestPasswordReset({
    phoneNumber: "+1234567890",
})
```

### Reset password

`POST /phone-number/reset-password`

```typescript
const { data, error } = await authClient.phoneNumber.resetPassword({
    otp: "123456",
    phoneNumber: "+1234567890",
    newPassword: "new-and-secure-password",
})
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `otpLength` | number | 6 | Length of the OTP code |
| `sendOTP` | function | required | SMS-sending callback |
| `expiresIn` | number | 300 | OTP expiration (seconds) |
| `callbackOnVerification` | function | - | Callback fired after successful verification |
| `sendPasswordResetOTP` | function | - | Function to send the password-reset OTP |
| `phoneNumberValidator` | function | - | Custom validation function |
| `verifyOTP` | function | - | Custom OTP verification function (overrides internal logic) |
| `requireVerification` | boolean | false | Require phone verification before sign-in |
| `allowedAttempts` | number | 3 | Attempt limit for brute-force prevention |

### Custom OTP verification (Twilio integration example)

```typescript
verifyOTP: async ({ phoneNumber, code }, ctx) => {
    const isValid = await twilioClient.verify
        .services('YOUR_SERVICE_SID')
        .verificationChecks
        .create({ to: phoneNumber, code })
    return isValid.status === 'approved'
}
```

### Auto sign-up on verification

```typescript
signUpOnVerification: {
    getTempEmail: (phoneNumber) => `${phoneNumber}@my-site.com`,
    getTempName: (phoneNumber) => phoneNumber,
}
```

### DB schema (user table additional fields)

| Field | Type | Optional | Description |
|---|---|---|---|
| `phoneNumber` | string | Yes | The user's phone number |
| `phoneNumberVerified` | boolean | Yes | Verification state |

## Notes

- Do not `await` the `sendOTP` function during request processing. On serverless, use `waitUntil`
- When `requireVerification` is enabled, sign-in attempts by unverified users return a 401 error (PHONE_NUMBER_NOT_VERIFIED) and automatically send an OTP
- On exceeding the attempt limit, the OTP code is automatically deleted and a 403 status is returned
