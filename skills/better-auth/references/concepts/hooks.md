# Hooks

Hooks intercept specific points in the auth lifecycle (before/after endpoint execution) to run custom logic, without needing to build a separate endpoint.

## Signature / Usage

### Setup

```typescript
export const auth = betterAuth({
  hooks: {
    before: createAuthMiddleware(async (ctx) => { /* ... */ }),
    after: createAuthMiddleware(async (ctx) => { /* ... */ }),
  },
});
```

### Before hook — restricting email domains

```typescript
export const auth = betterAuth({
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      if (!ctx.body?.email.endsWith("@example.com")) {
        throw new APIError("BAD_REQUEST", {
          message: "Email must end with @example.com",
        });
      }
    }),
  },
});
```

### After hook — notification on sign-up

```typescript
export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          sendMessage({
            type: "user-register",
            name: newSession.user.name,
          });
        }
      }
    }),
  },
});
```

### Response utilities

```typescript
// JSON response
return ctx.json({ message: "Hello World" });

// Redirect
throw ctx.redirect("/sign-up/name");

// Plain cookie
ctx.setCookies("my-cookie", "value");
const cookie = ctx.getCookies("my-cookie");

// Signed cookie
await ctx.setSignedCookie("my-signed-cookie", "value", ctx.context.secret, {
  maxAge: 1000,
});
const signedCookie = await ctx.getSignedCookie("my-signed-cookie");

// Throwing an error
throw new APIError("BAD_REQUEST", { message: "Invalid request" });
```

### Background tasks

```typescript
// Fire-and-forget
ctx.context.runInBackground(sendAnalyticsEvent(newSession.user.id));

// Must complete before the response
await ctx.context.runInBackgroundOrAwait(sendWelcomeEmail(newSession.user));
```

Configure the handler via `advanced.backgroundTasks`.

## Options / Props

### Hook types

| Type | Timing | Use Cases |
|------|--------|-----------|
| `before` | Before endpoint processing | Modifying the request, pre-validation, early return with a custom response |
| `after` | After endpoint completion | Modifying the response, triggering side effects (notifications, analytics) |

### Context (`ctx`) object

| Property | Description |
|----------|-------------|
| `ctx.path` | Current endpoint path (e.g. `/sign-up/email`) |
| `ctx.body` | Parsed POST request body |
| `ctx.headers` | Request headers |
| `ctx.request` | Request object (may not exist in server-only mode) |
| `ctx.query` | Query parameters |
| `ctx.context` | Auth-related context (see table below) |

### `ctx.context` properties

| Property | Description |
|----------|-------------|
| `newSession` | Newly created session — only available in `after` hooks |
| `returned` | Return value from the previous hook |
| `responseHeaders` | Headers from the previous hook |
| `authCookies` | BetterAuth cookie configuration |
| `secret` | Secret key of the auth instance |
| `password` | Password utilities: `hash`, `verify` |
| `adapter` | ORM-like database adapter methods |
| `internalAdapter` | Internal DB operation methods (e.g. `createSession()`) |
| `generateId` | ID generation utility |

## Notes

- Using hooks is recommended over building a separate endpoint for customizing auth behavior
- Consider writing a plugin for logic reused across multiple endpoints
- `ctx.request` may not exist in server-only (non-HTTP) calls
- `ctx.context.newSession` is only set in `after` hooks

## Related

- [Plugins](./plugins.md)
- [API](./api.md)
