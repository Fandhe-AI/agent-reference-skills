# Bearer

The Bearer plugin provides authentication via Bearer tokens as an alternative to browser cookies. It intercepts requests and forwards them to the API with a Bearer token added to the Authorization header.

**Security warning**: use this only for APIs that don't support cookies or that require a Bearer token. Improper implementation can lead to security vulnerabilities.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { bearer } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [bearer()]
})
```

### Setup (client side)

Step 1: obtain the Bearer token after sign-in

```typescript
const { data } = await authClient.signIn.email({
    email: "user@example.com",
    password: "securepassword"
}, {
    onSuccess: (ctx) => {
        const authToken = ctx.response.headers.get("set-auth-token")
        localStorage.setItem("bearer_token", authToken)
    }
})
```

Step 2: global configuration

```typescript
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    fetchOptions: {
        onSuccess: (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token")
            if (authToken) {
                localStorage.setItem("bearer_token", authToken)
            }
        }
    }
})
```

Step 3: configure automatic token injection

```typescript
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    fetchOptions: {
        auth: {
            type: "Bearer",
            token: () => localStorage.getItem("bearer_token") || ""
        }
    }
})
```

Step 4: send an authenticated request

```typescript
const { data } = await authClient.listSessions()
```

Step 5: per-request token override (optional)

```typescript
const { data } = await authClient.listSessions({
    fetchOptions: {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
})
```

### Usage outside the auth client

Client side:

```typescript
const token = localStorage.getItem("bearer_token")

const response = await fetch("https://api.example.com/data", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
```

Server-side session verification:

```typescript
import { auth } from "@/lib/auth"

export async function handler(req, res) {
    const session = await auth.api.getSession({
        headers: req.headers
    })
    if (!session) {
        return res.status(401).json({ error: "Unauthorized" })
    }
}
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `requireSignature` | boolean | `false` | Require the token to be signed |

## Notes

- Response header: the `set-auth-token` header is included in the response after a successful sign-in
- Token storage: localStorage is basic. Consider a more secure alternative for sensitive applications
- Always send tokens over HTTPS
- Only use this when cookies cannot be used due to API architecture, as it bypasses cookie protections
- Enable `requireSignature: true` in production for token integrity verification
- Implement a refresh mechanism to properly handle token expiration
