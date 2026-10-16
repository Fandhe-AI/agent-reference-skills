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

Authenticated requests read the stored cookies asynchronously:

```typescript
const cookies = await authClient.getCookie();
const headers = { "Cookie": cookies };
```

(In tRPC `httpBatchLink`, make `headers()` `async` and `await authClient.getCookie()`.)

## Notes

- Define `scheme` in `app.json` for deep linking, matching `trustedOrigins`
- Metro bundler (SDK 53+) supports package exports by default — no extra config needed
- Session data caches in `SecureStore` automatically; disable via `disableCache: true`
- Social sign-in on native requires manual navigation handling after resolution
- `storage`: the SecureStore-compatible storage used to cache session data and cookies (`import * as SecureStore from "expo-secure-store"`); reuse the same storage instance across clients that access the same stored data.
- `exp://` trusts any host of the exp:// scheme (host-less entries trust every host of the scheme); `exp://**` and `exp://192.168.*.*:*/**` are wildcard patterns.
- When upgrading your auth backend to purpose-prefixed verification identifiers or purpose-specific state-cookie keys, restart pending redirect-based social sign-ins (see reference/options.md); this needs no new Expo client configuration and does not affect native ID-token sign-in.
- Changed in 1.7: secure storage access is asynchronous. The Expo client uses the asynchronous SecureStore APIs for cookie and session-cache access; `authClient.getCookie()` returns a promise, so await it (`const cookie = await authClient.getCookie();`) and make callbacks that read cookies asynchronous. Passing `expo-secure-store` directly continues to work without a wrapper. A custom storage implementation must provide `getItem`, `getItemAsync`, `setItem`, and `setItemAsync`. The exported `storageAdapter.setItem()` is synchronous; use `setItemAsync()` when the caller must wait for persistence.
- `cookiePrefix` prevents infinite refetching caused by third-party cookies
- Authenticated requests: retrieve cookies from `SecureStore` and pass in headers with `"credentials": "omit"` to avoid interference

## Related

- [electron](./electron.md)
- [lynx](./lynx.md)
