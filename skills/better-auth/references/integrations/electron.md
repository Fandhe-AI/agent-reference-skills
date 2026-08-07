# Electron Integration

Integrates Better Auth into Electron desktop apps via the system browser, keeping security boundaries between main and renderer processes, using the `@better-auth/electron` package.

## Signature / Usage

```bash
npm install better-auth @better-auth/electron
```

```typescript
// server: Better Auth plugin
import { electron } from "@better-auth/electron";

export const auth = betterAuth({
  plugins: [electron()],
  emailAndPassword: { enabled: true },
  social: { google: { clientId: "...", clientSecret: "..." } }
});
```

```typescript
// web client: proxy plugin
import { electronProxyClient } from "@better-auth/electron/proxy";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [electronProxyClient({ protocol: { scheme: "com.example.app" } })]
});
```

```typescript
// electron app: client
import { electronClient } from "@better-auth/electron/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [electronClient({
    signInURL: "https://app.example.com/sign-in",
    protocol: { scheme: "com.example.app" },
    storage: { getItem: async (key) => {}, setItem: async (key, value) => {} }
  })]
});
```

```typescript
// main process (before app ready)
import { authClient } from "./lib/auth-client";
authClient.setupMain();
```

```typescript
// preload script
import { setupRenderer } from "@better-auth/electron/preload";
setupRenderer();
```

## Options / Props

| Option | Scope | Description |
| --- | --- | --- |
| `codeExpiresIn` | server plugin | Authorization code validity (default: 300s) |
| `cookiePrefix` | server plugin | Cookie name prefix (default: `better-auth`) |
| `clientID` | server plugin | Electron client identifier (default: `electron`) |
| `signInURL` | client plugin | Web authentication redirect URL |
| `protocol.scheme` | client plugin | Custom protocol scheme for deep linking |
| `storage` | client plugin | Persistent session storage implementation |
| `userImageProxy` | client plugin | Avatar image proxying (enabled by default) |
| `sanitizeUser` | client plugin | Strips sensitive user fields before renderer access |

## Notes

- Supports up to two major Electron versions behind the latest stable release
- Never expose `authClient` directly to the renderer process — create IPC bridges instead
- `nodeIntegration: false` and `contextIsolation: true` required on `BrowserWindow`
- Register the custom protocol scheme in build config (e.g. electron-forge) and add it to `trustedOrigins` (e.g. `"com.example.app:/"`)
- Fallback for failed deep links (some Linux/sandboxed browsers): manual 32-character authorization code exchange via `window.authenticate({ token: code })`
- Renderer flow: `window.requestAuth()` → system browser sign-in → deep link redirect → session established in main process; listen via `window.onAuthenticated`, `window.onAuthError`, `window.onUserUpdated`; sign out via `window.signOut()`

## Related

- [expo](./expo.md)
