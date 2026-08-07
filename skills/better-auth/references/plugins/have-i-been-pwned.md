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

## Options / Props

| Option | Type | Description |
|---|---|---|
| `customPasswordCompromisedMessage` | string | Custom error message shown to the user |

## Notes

- Only the first 5 characters of the password hash are sent to the API (k-anonymity)
- The full password is never sent to an external service
- Provides an additional layer of account protection against credential exposure from data breaches
