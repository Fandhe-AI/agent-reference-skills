# Sessions and Cookies

Conceptual overview of how React Router manages sessions and cookies on the server, covering the `SessionStorage` interface, cookie attributes, signing, and common patterns.

Source: https://reactrouter.com/explanation/sessions-and-cookies

## Sessions Overview

Sessions identify requests from the same user across HTTP requests, primarily for server-side form validation and authentication. React Router manages sessions in `loader` and `action` functions via a `SessionStorage` object.

### Creating Session Storage

```typescript
// app/sessions.server.ts
import { createCookieSessionStorage } from "react-router";

type SessionData = { userId: string };
type SessionFlashData = { error: string };

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      domain: "reactrouter.com",
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

### Session Methods

| Method | Description |
|--------|-------------|
| `session.get(key)` | Read a value |
| `session.has(key)` | Check if a key exists |
| `session.set(key, value)` | Set a value |
| `session.flash(key, value)` | Set a one-time value (cleared after next read) |
| `session.unset(key)` | Remove a value |

### Login / Logout Pattern

```typescript
// Login action
export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const userId = await validateCredentials(
    form.get("username"),
    form.get("password"),
  );

  if (userId == null) {
    session.flash("error", "Invalid username/password");
    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  session.set("userId", userId);
  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

// Logout action
export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
```

### Custom Database Session Storage

```typescript
import { createSessionStorage } from "react-router";

function createDatabaseSessionStorage({ cookie, host, port }) {
  const db = createDatabaseClient(host, port);
  return createSessionStorage({
    cookie,
    async createData(data, expires) { return await db.insert(data); },
    async readData(id) { return (await db.select(id)) || null; },
    async updateData(id, data, expires) { await db.update(id, data); },
    async deleteData(id) { await db.delete(id); },
  });
}
```

## Cookies Overview

Cookies are the transport mechanism for session identifiers and other small pieces of data.

### Creating and Using Cookies

```typescript
// app/cookies.server.ts
import { createCookie } from "react-router";

export const userPrefs = createCookie("user-prefs", {
  maxAge: 604_800, // one week
});
```

Reading and writing in a route:

```typescript
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

### Cookie Attributes

```typescript
const cookie = createCookie("name", {
  path: "/",
  sameSite: "lax",   // "strict" | "lax" | "none"
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 60_000),
  maxAge: 60,
  domain: "example.com",
});
```

Attributes can also be overridden per `serialize()` call.

### Cookie Signing and Secret Rotation

```typescript
// Sign the cookie
const cookie = createCookie("user-prefs", { secrets: ["s3cret1"] });

// Rotate secrets: first entry signs new cookies; all entries verify old ones
export const cookie = createCookie("user-prefs", {
  secrets: ["n3wsecr3t", "olds3cret"],
});
```

## Notes

- Always use mutations (session writes) inside `action`, never inside `loader` — avoids CSRF vulnerabilities
- When multiple nested route loaders run in parallel, be careful with `session.flash()` and `session.unset()` to avoid race conditions where one loader clears data before another reads it
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [createCookie](./createCookie.md)
- [createCookieSessionStorage](./createCookieSessionStorage.md)
- [createMemorySessionStorage](./createMemorySessionStorage.md)
