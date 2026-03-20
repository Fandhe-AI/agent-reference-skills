# createMemorySessionStorage

Creates a `SessionStorage` implementation that stores session data **in application memory**. Intended for testing and development; not suitable for production use.

## Signature

```typescript
function createMemorySessionStorage<
  SessionData = Record<string, unknown>,
  FlashData = SessionData,
>(options?: { cookie?: CookieOptions & { name?: string } }): SessionStorage<SessionData, FlashData>
```

Returns an object with `{ getSession, commitSession, destroySession }`.

## Usage

```typescript
import { createMemorySessionStorage } from "react-router";

const { getSession, commitSession, destroySession } =
  createMemorySessionStorage({
    cookie: {
      name: "__session",
      secrets: ["s3cret"],
      sameSite: "lax",
    },
  });

export { getSession, commitSession, destroySession };
```

Using in a test:

```typescript
import { createMemorySessionStorage } from "react-router";

const { getSession, commitSession } = createMemorySessionStorage();

test("stores and retrieves userId", async () => {
  const session = await getSession();
  session.set("userId", "user-1");
  const cookie = await commitSession(session);
  const restored = await getSession(cookie);
  expect(restored.get("userId")).toBe("user-1");
});
```

## Notes

- Data lives in memory and is **lost on process restart** — not appropriate for production or multi-process deployments
- For production, use `createCookieSessionStorage` or a database-backed `createSessionStorage`
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [createCookieSessionStorage](./createCookieSessionStorage.md)
- [createCookie](./createCookie.md)
- [sessions-and-cookies](./sessions-and-cookies.md)
