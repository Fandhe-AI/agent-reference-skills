# FAQ

Better Auth に関するよくある質問と回答。

## 1. Auth Client Not Working

**Issue:** `createAuthClient` errors occur due to incorrect import paths.

**Solution:** Import paths vary by environment:
- **React frontend:** `import { createAuthClient } from "better-auth/react";`
- **Next.js server contexts** (middleware, server actions, components): `import { createAuthClient } from "better-auth/client";`

## 2. getSession Not Working

**Issue:** `authClient.getSession` fails in server environments because it cannot access cookies.

**Solutions:**
- Use `auth.api.getSession` and pass request headers: Pass `headers: await headers()` to access session data
- Alternative: Call `authClient.getSession` with `fetchOptions: { headers: await headers() }`

## 3. How to Configure a Corporate Proxy for Server-Side Requests

**Issue:** Need to route Better Auth's outbound requests through a corporate proxy.

**Solution:** Use undici's ProxyAgent to set a global fetch dispatcher:

```typescript
import { ProxyAgent, setGlobalDispatcher } from "undici";
const proxyAgent = new ProxyAgent("http://your-proxy.example.com:8080");
setGlobalDispatcher(proxyAgent);
```

## 4. Adding Custom Fields to the Users Table

Better Auth provides a type-safe way to extend the user and session schemas through the extending core schema documentation.

## 5. Difference Between getSession and useSession

- **`useSession`:** React hook that triggers re-renders when session data changes; use for UI updates. Avoid in layout files.
- **`getSession`:** Returns a promise with data/error; use for all other situations. Available on both server and client instances.

## 6. Common TypeScript Errors

**Solution:** Enable strict TypeScript checking in `tsconfig.json`:
- Set `"strict": true`, OR
- Set `"strictNullChecks": true` if strict mode cannot be enabled

## 7. Can I Remove `name`, `image`, or `email` Fields from the User Table?

These fields cannot currently be removed from the user table, though future customizability is planned.

## 8. Dual Module Hazard Issue

**Problem:** Multiple versions of `better-auth` or `@better-auth/core` exist in dependencies, causing "No request state found" errors.

**Diagnosis:** Run package manager commands to identify duplicate versions:

```bash
pnpm why @better-auth/core
npm ls better-auth
yarn why better-call
```

**Fixes:**
- Clean reinstall: Remove node_modules and lockfiles, then reinstall
- **Yarn v1/pnpm v9:** Add `better-call` to both `dependencies` and `resolutions`
- **Next.js:** Add `better-auth` to `serverExternalPackages`
- **Cloudflare Workers:** Enable `nodejs_compat` flag in wrangler.toml
- Ensure Better Auth packages are in dependencies, not devDependencies
