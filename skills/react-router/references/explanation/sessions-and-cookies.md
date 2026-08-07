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

## Related

- [State Management](./state-management.md)
- [Backend For Frontend](./backend-for-frontend.md)
- [Sessions and Cookies (API reference)](../utils/sessions-and-cookies.md)
