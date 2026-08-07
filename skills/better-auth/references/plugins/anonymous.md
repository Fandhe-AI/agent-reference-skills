# Anonymous

The Anonymous plugin provides an authenticated experience without requiring personally identifiable information (PII). Users can establish an account anonymously and later link an authentication method.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { anonymous } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        anonymous()
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
import { anonymousClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        anonymousClient()
    ]
})
```

### Anonymous sign-in

```typescript
const user = await authClient.signIn.anonymous()
```

Authenticates a user without credentials or PII.

### Account linking

When an anonymous user signs in/up with another method, the `onLinkAccount` callback runs:

```typescript
export const auth = betterAuth({
    plugins: [
        anonymous({
            onLinkAccount: async ({ anonymousUser, newUser }) => {
                // Migrate cart, settings, etc. data
            }
        })
    ]
})
```

Trigger:

```typescript
const user = await authClient.signIn.email({ email })
```

The anonymous user is deleted by default after linking.

### Delete anonymous user

```typescript
// Client
await authClient.deleteAnonymousUser()

// Server
await auth.api.deleteAnonymousUser()
```

Requires anonymous user authentication. Follows the `disableDeleteAnonymousUser` setting.

### Custom email generation

```typescript
generateRandomEmail: () => {
    const id = crypto.randomUUID()
    return `guest-${id}@example.com`
}
```

Must return a unique, valid email.

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `emailDomainName` | string | Generated as `temp@{id}.com` | Custom domain for the temporary email address |
| `generateRandomEmail` | () => string \| Promise<string> | - | Custom email generation function. Overrides `emailDomainName` |
| `onLinkAccount` | async ({ anonymousUser, newUser }) => void | - | Callback fired on account linking |
| `disableDeleteAnonymousUser` | boolean | false | Disable the anonymous user deletion endpoint |
| `generateName` | () => string \| Promise<string> | - | Custom name generation for anonymous users |

## Notes

- Anonymous users are deleted by default when their account is linked
- `disableDeleteAnonymousUser` prevents endpoint access but does not affect automatic deletion on linking
- Ensuring uniqueness of custom email generation is the developer's responsibility
- No PII is required or stored during anonymous sign-up

### DB schema

Additional fields on the user table:

| Field | Type | Optional | Description |
|---|---|---|---|
| `isAnonymous` | boolean | Yes | Identifies anonymous user accounts |
