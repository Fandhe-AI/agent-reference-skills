# createCookie

Creates a logical container for managing a browser cookie from the server. Returns a `Cookie` object with `parse` and `serialize` methods.

## Signature

```typescript
function createCookie(name: string, options?: CookieOptions): Cookie
```

`CookieOptions` (all optional):

| Name | Type | Description |
|------|------|-------------|
| `domain` | `string` | Cookie `Domain` attribute |
| `expires` | `Date` | Cookie `Expires` attribute |
| `httpOnly` | `boolean` | Cookie `HttpOnly` attribute |
| `maxAge` | `number` | Cookie `Max-Age` attribute (seconds) |
| `path` | `string` | Cookie `Path` attribute |
| `sameSite` | `"strict" \| "lax" \| "none"` | Cookie `SameSite` attribute |
| `secure` | `boolean` | Cookie `Secure` attribute |
| `secrets` | `string[]` | Secrets used to sign/verify the cookie value |

## Usage

```typescript
import { createCookie } from "react-router";

// app/cookies.server.ts
export const userPrefs = createCookie("user-prefs", {
  maxAge: 604_800, // one week
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});
```

Reading and writing the cookie in a route:

```typescript
import { userPrefs } from "~/cookies.server";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = (await userPrefs.parse(request.headers.get("Cookie"))) || {};
  return { showBanner: cookie.showBanner };
}

export async function action({ request }: Route.ActionArgs) {
  const cookie = (await userPrefs.parse(request.headers.get("Cookie"))) || {};
  cookie.showBanner = false;
  return redirect("/", {
    headers: { "Set-Cookie": await userPrefs.serialize(cookie) },
  });
}
```

Secret rotation (first secret signs new cookies; all secrets can verify old ones):

```typescript
export const cookie = createCookie("user-prefs", {
  secrets: ["n3wsecr3t", "olds3cret"],
});
```

## Notes

- Cookie attributes can also be overridden per-call in `cookie.serialize(value, overrides)`
- Signing cookies with `secrets` verifies integrity — recommended for auth-related cookies
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [createCookieSessionStorage](./createCookieSessionStorage.md)
- [createMemorySessionStorage](./createMemorySessionStorage.md)
- [sessions-and-cookies](./sessions-and-cookies.md)
