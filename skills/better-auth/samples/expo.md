# Expo Integration

Add the Expo server plugin and the matching client plugin so React Native apps get secure-storage sessions and deep-link OAuth.

```ts
// lib/auth.ts — server
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
  plugins: [expo()],
  emailAndPassword: { enabled: true },
  trustedOrigins: ["myapp://"],
});
```

```ts
// lib/auth-client.ts — Expo app
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [
    expoClient({
      scheme: "myapp",
      storagePrefix: "myapp",
      storage: SecureStore,
    }),
  ],
});
```

```tsx
// app/social-sign-in.tsx — relative callbackURL becomes a deep link on native
import { authClient } from "@/lib/auth-client";

await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
```

## Notes

- The app's `scheme` from `app.json` must be listed in the server's `trustedOrigins`; during development also trust `exp://` wildcards, but never in production
- Requires Expo SDK 53+ for default Metro package-exports support; don't set `resolver.unstable_enablePackageExports = false`
- On native, `signIn.social` does not navigate automatically — call `router.replace(...)` yourself after it resolves
- Official example: github.com/better-auth/examples/tree/main/expo-example
