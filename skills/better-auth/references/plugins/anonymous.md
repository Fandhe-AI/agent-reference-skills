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

### Sign In Anonymously

`POST /sign-in/anonymous` (no body)

```typescript
const user = await authClient.signIn.anonymous()
```

Creates a new user with a generated email and the configured or default name, then establishes a session, without credentials or PII. If the current session already belongs to an anonymous user, calling `signIn.anonymous()` again returns an error; link the current account using another authentication method, or sign out before starting a new anonymous session.

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
| `emailDomainName` | string | Generated as `{id}@anonymous.placeholder.invalid` | Custom domain for the generated email address |
| `generateRandomEmail` | () => string \| Promise<string> | - | Custom email generation function. Overrides `emailDomainName` |
| `onLinkAccount` | async ({ anonymousUser, newUser }) => void | - | Callback fired on account linking |
| `disableDeleteAnonymousUser` | boolean | false | Disable the anonymous user deletion endpoint |
| `generateName` | () => string \| Promise<string> | - | Custom name generation for anonymous users |

## Notes

- Anonymous users are deleted by default when their account is linked
- `disableDeleteAnonymousUser` prevents endpoint access but does not affect automatic deletion on linking
- Ensuring uniqueness of custom email generation is the developer's responsibility
- No PII is required or stored during anonymous sign-up
- Changed in 1.7 docs: with `emailDomainName` omitted the generated email is `{id}@anonymous.placeholder.invalid` (1.6 docs: `temp@{id}.com`).

### DB schema

Additional fields on the user table:

| Field | Type | Optional | Description |
|---|---|---|---|
| `isAnonymous` | boolean | Yes | Identifies anonymous user accounts |
