# createCookieSessionStorage

Creates a `SessionStorage` implementation that stores **all session data inside the cookie itself** (no server-side store required).

## Signature

```typescript
function createCookieSessionStorage<
  SessionData = Record<string, unknown>,
  FlashData = SessionData,
>(options: { cookie: CookieOptions & { name: string } }): SessionStorage<SessionData, FlashData>
```

Returns an object with `{ getSession, commitSession, destroySession }`.

## Usage

```typescript
// app/sessions.server.ts
import { createCookieSessionStorage } from "react-router";

type SessionData = { userId: string };
type SessionFlashData = { error: string };

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

export { getSession, commitSession, destroySession };
```

Using the session in a loader:

```typescript
import { getSession, commitSession } from "~/sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) return redirect("/");
  return data(
    { error: session.get("error") },
    { headers: { "Set-Cookie": await commitSession(session) } },
  );
}
```

## Notes

- All data is stored in the cookie — the serialized session data **must not exceed the browser's maximum cookie size** (~4 KB)
- No database or backend service is required, which simplifies load-balanced deployments
- Use `session.flash(key, value)` for one-time messages (e.g., form errors); the value is cleared after the next read
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [createCookie](./createCookie.md)
- [createMemorySessionStorage](./createMemorySessionStorage.md)
- [sessions-and-cookies](./sessions-and-cookies.md)
