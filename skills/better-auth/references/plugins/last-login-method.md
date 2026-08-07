# Last Login Method

The Last Login Method plugin tracks and displays the most recent authentication method used by a user. It enables login indicators such as "Signed in with Google" and lets you prioritize authentication methods based on user preference.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { lastLoginMethod } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        lastLoginMethod()
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { lastLoginMethodClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        lastLoginMethodClient()
    ]
})
```

### Get the last used login method

```typescript
const lastMethod = authClient.getLastUsedLoginMethod()
// "google", "email", "github", etc.
```

### Check whether a specific method was last used

```typescript
const wasGoogle = authClient.isLastUsedLoginMethod("google")
```

### Clear the stored login method record

```typescript
authClient.clearLastUsedLoginMethod()
```

### Advanced implementation example

```typescript
lastLoginMethod({
    customResolveMethod: (ctx) => {
        if (ctx.path === "/saml/callback") return "saml"
        if (ctx.path === "/magic-link/verify") return "magic-link"
        if (ctx.path === "/sign-in/phone") return "phone"
        return null
    }
})
```

### UI integration example

```typescript
export function SignInPage() {
    const lastMethod = authClient.getLastUsedLoginMethod()

    return (
        <div>
            <Button variant={lastMethod === "email" ? "default" : "outline"}>
                Sign in with Email
                {lastMethod === "email" && <Badge>Last used</Badge>}
            </Button>
            <Button variant={lastMethod === "google" ? "default" : "outline"}>
                Continue with Google
                {lastMethod === "google" && <Badge>Last used</Badge>}
            </Button>
        </div>
    )
}
```

### Expo implementation

```typescript
import { lastLoginMethodClient } from "@better-auth/expo/plugins"

export const authClient = createAuthClient({
    plugins: [
        expoClient({ scheme: "myapp", storagePrefix: "myapp", storage: SecureStore }),
        lastLoginMethodClient({ storagePrefix: "myapp", storage: SecureStorage }),
    ]
})
```

For Expo-only applications, you can omit the server plugin and rely solely on the client plugin.

## Options / Props

### Server configuration

```typescript
lastLoginMethod({
    cookieName: "better-auth.last_used_login_method",
    maxAge: 60 * 60 * 24 * 30,  // 30 days (seconds)
    storeInDatabase: false,
    customResolveMethod: (ctx) => {
        if (ctx.path === "/oauth/callback/custom-provider") return "custom-provider"
        return null
    },
    schema: {
        user: { lastLoginMethod: "custom_field_name" }
    }
})
```

| Option | Type | Default | Description |
|---|---|---|---|
| `cookieName` | string | `"better-auth.last_used_login_method"` | Cookie identifier. `httpOnly: false` |
| `maxAge` | number | `2592000` (30 days) | Cookie expiration (seconds) |
| `storeInDatabase` | boolean | `false` | Persist the method to the DB |
| `customResolveMethod` | function | - | Custom logic to determine the login method from the request context |
| `schema` | object | - | DB field name mapping when `storeInDatabase` is enabled |

### Client configuration

```typescript
lastLoginMethodClient({
    cookieName: "better-auth.last_used_login_method"  // must match the server
})
```

### DB configuration

Enabling DB storage:

```typescript
lastLoginMethod({ storeInDatabase: true })
```

Migration:

```bash
npx auth@latest migrate
```

Additional field on the user table:

| Field | Type | Optional | Description |
|---|---|---|---|
| `lastLoginMethod` | string | Yes | The last authentication method used |

Accessing the DB field:

```typescript
// Server
const session = await auth.api.getSession({ headers })
console.log(session?.user.lastLoginMethod)

// Client
const { data: session } = authClient.useSession()
console.log(session?.user.lastLoginMethod)
```

## Notes

- Default method resolution: **Email** resolves to `"email"` (`/sign-in/email` and `/sign-up/email`), **OAuth providers** resolve to the provider ID (e.g. `"google"`, `"github"`), **OAuth callbacks** extract the provider ID from `/callback/:id` or `/oauth2/callback/:id`
- The cookie uses `httpOnly: false` so it is accessible from client-side JavaScript
- Automatically inherits Better Auth's `crossSubDomainCookies` and `crossOriginCookies` settings
