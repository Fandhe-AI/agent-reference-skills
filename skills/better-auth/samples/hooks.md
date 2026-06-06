# Hooks

Run custom logic before or after auth endpoints using server-side middleware hooks.

```typescript
import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    // Before hook: validate or reject a request
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      if (!ctx.body?.email?.endsWith("@example.com")) {
        throw new APIError("BAD_REQUEST", {
          message: "Email must end with @example.com",
        });
      }
    }),

    // After hook: react to a completed operation
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          await sendNotification({
            type: "user-register",
            name: newSession.user.name,
          });
        }
      }
    }),
  },
});
```

## Notes

- `ctx.path` identifies the endpoint (e.g., `"/sign-up/email"`, `"/sign-in/social"`)
- Throwing `APIError` in a `before` hook short-circuits the request and returns the error to the client
- `ctx.context.newSession` is only available in `after` hooks and only when a session was created
- Use `ctx.context.runInBackground(fn)` for fire-and-forget tasks (e.g., analytics) that should not block the response
