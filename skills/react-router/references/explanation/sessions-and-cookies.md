# Sessions and Cookies

Sessions let the server identify requests coming from the same person; cookies are the underlying transport that makes sessions (and other persistent client state) possible.

**Availability**: Framework Mode and Data Mode. Not available with Declarative Mode.

## Signature / Usage

**Session storage** is managed per-route in `loader`/`action` via a `SessionStorage` object that knows how to parse/generate cookies and store session data:
```tsx
import { createCookieSessionStorage } from "react-router";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });
```

**Reading/writing a session in a loader/action:**
```tsx
export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  session.get("foo");
  session.has("bar");
  session.set("userId", "123");
  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
```

**Plain cookies (no session):**
```tsx
import { createCookie } from "react-router";

export const userPrefs = createCookie("user-prefs", {
  maxAge: 604_800, // one week
});
```

**Signing cookies** — provide `secrets` to protect cookie integrity; rotate by prepending a new secret (old secrets still decode, newest signs outgoing cookies):
```tsx
export const cookie = createCookie("user-prefs", {
  secrets: ["n3wsecr3t", "olds3cret"],
});
```

## Notes

- Perform mutations (like `destroySession`) in an **action**, not a `loader`, to avoid CSRF exposure
- Nested routes mean multiple loaders can run per page — using `session.flash()`/`session.unset()` from more than one loader risks race conditions; have a single loader read a given flash key
- Custom storage backends implement `createData` / `readData` / `updateData` / `deleteData` via `createSessionStorage()`, keyed by a session ID stored in the cookie
- Built-in storage helpers: `createCookieSessionStorage`, `createMemorySessionStorage` (dev/testing), `createFileSessionStorage` (node), `createWorkersKVSessionStorage` (Cloudflare Workers), `createArcTableSessionStorage` (Architect/DynamoDB)
- Session API (8.5.1 docs): `session.has(key)` returns `true` for a value or an unread flash value and does not consume flash values; `session.set(key, value)` sets a value for subsequent requests; `session.flash(key, value)` sets a value valid only until the next `session.get()` for that key; `session.get(key)` reads a value (reading a flash value removes it, so `commitSession()` is still required afterward); `session.unset(key)` removes a value but not pending flash values
- Every time you modify session data you must `commitSession()` or the changes are lost; with cookie session storage you must also send the returned `Set-Cookie` header. Avoid using the same key for both `session.set()` and `session.flash()`: `session.get()` returns the regular value first, so the flash value would never be read or removed
- 8.5.1 ([CHANGELOG](https://github.com/remix-run/react-router/blob/react-router@8.5.1/packages/react-router/CHANGELOG.md), PR #15639): `destroySession` skips `deleteData` when the session has no ID, avoiding failures on storage that rejects an empty key
- Source: https://reactrouter.com/explanation/sessions-and-cookies (docs/explanation/sessions-and-cookies.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/explanation/sessions-and-cookies.md)

## Related

- [State Management](./state-management.md)
- [Backend For Frontend](./backend-for-frontend.md)
- [Sessions and Cookies (API reference)](../utils/sessions-and-cookies.md)
