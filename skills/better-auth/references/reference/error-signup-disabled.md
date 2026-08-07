# signup_disabled

## Signature / Usage

```typescript
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";

export const auth = betterAuth({
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const isAllowedToSignUp = await isAllowedToSignUp(user, ctx);
          if (!isAllowedToSignUp) {
            throw new APIError("BAD_REQUEST", {
              message: "Signup is disabled",
            });
          }
        },
      },
    },
  }
});
```

This error occurs when a user attempts to register using an OAuth provider that has signup functionality disabled in the application's configuration.

## Notes

- The error is triggered when the `disableSignUp` option is enabled for an OAuth provider and a user tries to create a new account through that provider instead of just signing in
- The recommended approach is to replace the `disableSignUp` option with database hooks (as shown above) for better control
- If you're using the `disableSignUp` option with stateless mode, you will see this error. Consider using database hooks instead to handle this case
- This approach provides more flexibility for implementing custom signup validation logic rather than a simple on/off toggle

## Related

- [errors](./errors.md)
