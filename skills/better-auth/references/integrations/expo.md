# Expo Integration

Enables authentication in Expo (React Native) cross-platform apps via the `@better-auth/expo` plugin. Targets Expo SDK 55 with React Native 0.83 and React 19.2, requiring the New Architecture.

## Signature / Usage

```bash
npm install better-auth @better-auth/expo
# client app
npm install better-auth @better-auth/expo expo-network expo-secure-store
# social providers
npm install expo-linking expo-web-browser expo-constants
```

```typescript
// server
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
    plugins: [expo()],
    emailAndPassword: { enabled: true },
});
```

```typescript
// client
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
        })
    ]
});
```

```typescript
// deep link trust
export const auth = betterAuth({
    trustedOrigins: [
        "myapp://",
        ...(process.env.NODE_ENV === "development" ? ["exp://", "exp://**"] : [])
    ]
})
```

## Notes

- Define `scheme` in `app.json` for deep linking, matching `trustedOrigins`
- Metro bundler (SDK 53+) supports package exports by default — no extra config needed
- Session data caches in `SecureStore` automatically; disable via `disableCache: true`
- Social sign-in on native requires manual navigation handling after resolution
- `cookiePrefix` prevents infinite refetching caused by third-party cookies
- Authenticated requests: retrieve cookies from `SecureStore` and pass in headers with `"credentials": "omit"` to avoid interference

## Related

- [electron](./electron.md)
- [lynx](./lynx.md)
