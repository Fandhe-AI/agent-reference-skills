# Have I Been Pwned

The Have I Been Pwned plugin strengthens account security by preventing account creation or password updates with compromised credentials. It integrates with the Have I Been Pwned API to check whether a password has been exposed in a known data breach.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { haveIBeenPwned } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        haveIBeenPwned()
    ]
})
```

No client-side configuration is needed.

### Behavior

When attempting to create an account or update a password with a compromised password:

```json
{
    "code": "PASSWORD_COMPROMISED",
    "message": "Password is compromised"
}
```

### Custom message

```typescript
haveIBeenPwned({
    customPasswordCompromisedMessage: "Please choose a more secure password."
})
```

### Custom password flows

Use `isPasswordCompromised` to check passwords in server-side flows that do not use Better Auth endpoints.

```typescript
import { isPasswordCompromised } from "better-auth/plugins/haveibeenpwned"

const compromised = await isPasswordCompromised(password)
if (compromised) {
    throw new Error("Please choose a password that has not been compromised")
}
```

It sends only the first five characters of the password's SHA-1 hash to Have I Been Pwned and throws an `APIError` if the service cannot complete the check.

## Options / Props

| Option | Type | Description |
|---|---|---|
| `enabled` | boolean | Enable or disable password checks (default `true`); useful to skip checks outside production |
| `customPasswordCompromisedMessage` | string | Custom error message shown to the user |

## Notes

- Only the first 5 characters of the password hash are sent to the API (k-anonymity)
- The full password is never sent to an external service
- Provides an additional layer of account protection against credential exposure from data breaches
