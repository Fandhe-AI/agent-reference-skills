# Electron Integration

Authenticate Electron apps by delegating sign-in to the system browser and bridging the result back over deep links.

```ts
// web/lib/auth.ts — server: add the electron plugin
import { betterAuth } from "better-auth";
import { electron } from "@better-auth/electron";

export const auth = betterAuth({
  plugins: [electron()],
  trustedOrigins: ["com.example.app:/"],
  emailAndPassword: { enabled: true },
});
```

```ts
// electron/lib/auth-client.ts — the Electron app's client
import { createAuthClient } from "better-auth/client";
import { electronClient } from "@better-auth/electron/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [
    electronClient({
      signInURL: "https://app.example.com/sign-in",
      protocol: { scheme: "com.example.app" },
    }),
  ],
});
```

```ts
// electron/main.ts — wire up the main and preload processes before app ready
import { authClient } from "./lib/auth-client";
authClient.setupMain();
```

```ts
// electron/preload.ts
import { setupRenderer } from "@better-auth/electron/preload";
setupRenderer();
```

## Notes

- The web client also needs the `electronProxyClient` plugin (from `@better-auth/electron/proxy`) to handle the redirect back into the app
- The custom protocol scheme must match across the server `trustedOrigins`, the proxy client, and the Electron client, and must be registered in your packager config (electron-forge / electron-builder)
- `BrowserWindow` must be created with `nodeIntegration: false` and `contextIsolation: true`; never expose `authClient` directly to the renderer — bridge via `contextBridge`/`ipcMain` instead
- Renderer process listens via `window.onAuthenticated`, `window.requestAuth()`, and `window.signOut()` bridges installed by `setupRenderer()`
