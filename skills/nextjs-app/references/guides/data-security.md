# How to Think About Data Security

Guide to data security in Next.js given how Server Components shift where and how data is accessed, with recommended patterns and built-in Server Actions protections.

## Signature / Usage

```tsx filename="data/user-dto.tsx"
import 'server-only'
import { getCurrentUser } from './auth'

export async function getProfileDTO(slug: string) {
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`
  const userData = rows[0]
  const currentUser = await getCurrentUser()

  return {
    username: canSeeUsername(currentUser) ? userData.username : null,
    phonenumber: canSeePhoneNumber(currentUser, userData.team)
      ? userData.phonenumber
      : null,
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| External HTTP APIs | data fetching approach | Zero Trust model calling existing REST/GraphQL endpoints from Server Components |
| Data Access Layer (DAL) | data fetching approach | Server-only internal library performing authorization checks and returning safe DTOs |
| Component-level data access | data fetching approach | Direct database queries in Server Components; fastest to prototype, easiest to leak data |
| `experimental_taintObjectReference` / `experimental_taintUniqueValue` | React Taint APIs | Prevent tainted objects/values from being passed to the client; enabled via `experimental.taint` in `next.config.js` |
| `server-only` package | import marker | Causes a build error if a server-only module is imported into a Client Component |
| `serverActions.allowedOrigins` | `next.config.js` option | List of safe origins allowed to invoke Server Actions behind reverse proxies |

## Notes

- Server Components run only on the server and can access secrets/databases safely; Client Components must follow the same security assumptions as browser code, even during prerendering.
- Server Actions are reachable via direct `POST` requests even if not imported elsewhere; Next.js mitigates this with encrypted, non-deterministic action IDs and dead code elimination of unused actions.
- Always re-verify authentication and authorization **inside** each Server Action — a page-level check does not extend to the actions it defines.
- Check both authentication (is the user logged in) and authorization (can this user act on this specific resource) to avoid IDOR vulnerabilities.
- Closures in Server Actions send captured variables to the client and back; Next.js automatically encrypts closed-over variables per build, but this should not be relied on as the sole protection for sensitive values.
- Mutations must never be a side-effect of rendering; Next.js explicitly blocks setting cookies or triggering cache revalidation inside render.
- Self-hosting across multiple servers may produce different per-instance encryption keys for closures — override with `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.

## Related

- [Authentication](./authentication.md)
- [Content Security Policy](./content-security-policy.md)
- [Forms with Server Actions](./forms.md)
- [Server Actions and Mutations](./server-actions.md)
