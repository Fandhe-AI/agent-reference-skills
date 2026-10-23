# signup_disabled

## Signature / Usage

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  user: {
    // Works in stateless setups as well; see concepts/users-accounts.md
    validateUserInfo: async ({ user, source }) => {
      if (source.action === "create-user" && !(await isAllowedToSignUp(user))) {
        return { error: "signup_disabled", errorDescription: "Signup is disabled" };
      }
    },
  },
});
```

This error occurs when a user attempts to register using an OAuth provider that has signup functionality disabled in the application's configuration.

## Notes

- The error is triggered when the `disableSignUp` option is enabled for an OAuth provider and a user tries to create a new account through that provider instead of just signing in
- For conditional sign-up, use the `user.validateUserInfo` gate shown above instead of toggling `disableSignUp`
- Keep sign-up disabled (`disableSignUp`) when you do not want conditional registration. If you need to allow sign-up only for some users, use `user.validateUserInfo` (see [users-accounts](../concepts/users-accounts.md) and [oauth](../concepts/oauth.md)); it also works in stateless setups
- This approach provides more flexibility for implementing custom signup validation logic rather than a simple on/off toggle
- The example uses `user.validateUserInfo` (works in stateless setups) instead of a `databaseHooks` before-create hook, and the advice to replace `disableSignUp` with database hooks was rewritten accordingly; the official hook example also shadowed `isAllowedToSignUp` with a local variable of the same name (Adapted from the official docs)

## Related

- [errors](./errors.md)
