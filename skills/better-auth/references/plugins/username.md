# Username

The Username plugin adds lightweight username support to email and password authentication. Users can authenticate with a username instead of an email address.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { username } from "better-auth/plugins"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        username()
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
import { usernameClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        usernameClient()
    ]
})
```

### Sign up with a username

```typescript
// Client
const { data, error } = await authClient.signUp.email({
    email: "email@domain.com",
    name: "Test User",
    password: "password1234",
    username: "test",
    displayUsername: "Test User123"
})

// Server
const data = await auth.api.signUpEmail({
    body: {
        email: "email@domain.com",
        name: "Test User",
        password: "password1234",
        username: "test",
        displayUsername: "Test User123"
    }
})
```

When only `username` is provided, `displayUsername` defaults to the pre-normalization username value.

### Sign in with a username

```typescript
// Client
const { data, error } = await authClient.signIn.username({
    username: "test",
    password: "password1234"
})

// Server
const data = await auth.api.signInUsername({
    body: {
        username: "test",
        password: "password1234"
    }
})
```

### Update username

```typescript
// Client
const { data, error } = await authClient.updateUser({
    username: "new-username"
})

// Server
const data = await auth.api.updateUser({
    body: { username: "new-username" }
})
```

### Check username availability

```typescript
// Client
const { data: response, error } = await authClient.isUsernameAvailable({
    username: "new-username"
})

if (response?.available) {
    console.log("Username is available")
}

// Server
const response = await auth.api.isUsernameAvailable({
    body: { username: "new-username" }
})
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `minUsernameLength` | number | 3 | Minimum username length |
| `maxUsernameLength` | number | 30 | Maximum username length |
| `usernameValidator` | function | letters, digits, underscore, and dot only | Custom validation function |
| `displayUsernameValidator` | function | none | Validation for the display username |
| `usernameNormalization` | function \| false | lowercase | Normalization function |
| `displayUsernameNormalization` | function \| false | none | Normalization for the display username |
| `validationOrder` | object | pre-normalization | Validation order |

### Custom validation

```typescript
username({
    usernameValidator: (username) => {
        if (username === "admin") return false
        return true
    }
})
```

### Custom normalization

```typescript
username({
    usernameNormalization: (username) => {
        return username.toLowerCase()
            .replaceAll("0", "o")
            .replaceAll("3", "e")
            .replaceAll("4", "a")
    }
})
```

### Validation order

```typescript
username({
    validationOrder: {
        username: "post-normalization",
        displayUsername: "post-normalization"
    }
})
```

### Disabling the username availability check

```typescript
betterAuth({
    emailAndPassword: { enabled: true },
    disabledPaths: ["/is-username-available"],
    plugins: [username()]
})
```

### DB schema (user table additional fields)

| Field | Type | Optional | Description |
|---|---|---|---|
| `username` | string | Yes | The normalized username used for authentication |
| `displayUsername` | string | Yes | The pre-normalization username used for display |

## Notes

- Usernames are normalized to lowercase by default, making matching case-insensitive
- `displayUsername` preserves the original casing for display purposes
- If only `username` is provided at sign-up/update time, `displayUsername` is automatically set to the pre-normalization username value
- The availability-check endpoint can be disabled for security/privacy reasons
