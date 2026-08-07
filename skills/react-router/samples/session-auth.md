# Session Auth

Implement cookie-based session authentication with `createCookieSessionStorage`.

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
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
```

```typescript
// app/routes/login.tsx
import { redirect } from "react-router";
import { getSession, commitSession, destroySession } from "~/sessions.server";
import type { Route } from "./+types/login";

// Login
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
  return redirect("/dashboard", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

// Logout
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}
```

## Notes

- Always write to sessions inside `action`, not `loader` — prevents CSRF vulnerabilities
- `session.flash(key, value)` stores a one-time value cleared after the next read
- Include `"Set-Cookie": await commitSession(session)` in every response that mutates the session
- `secrets` array supports rotation: first entry signs new cookies, all entries verify old ones
