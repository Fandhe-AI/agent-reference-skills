# FAQ

## Signature / Usage

```typescript
// Corporate proxy for server-side requests
import { ProxyAgent, setGlobalDispatcher } from "undici";
const proxyAgent = new ProxyAgent("http://your-proxy.example.com:8080");
setGlobalDispatcher(proxyAgent);
```

## Notes

- **Auth client not working**: `createAuthClient` errors occur due to incorrect import paths. Import paths vary by environment — React frontend: `import { createAuthClient } from "better-auth/react";`; Next.js server contexts (middleware, server actions, components): `import { createAuthClient } from "better-auth/client";`.
- **`getSession` not working**: `authClient.getSession` fails in server environments because it cannot access cookies. Use `auth.api.getSession` and pass `headers: await headers()`, or call `authClient.getSession` with `fetchOptions: { headers: await headers() }`.
- **Corporate proxy for server-side requests**: route Better Auth's outbound requests through a corporate proxy using undici's `ProxyAgent` to set a global fetch dispatcher (see Signature / Usage above).
- **Adding custom fields to the users table**: Better Auth provides a type-safe way to extend the user and session schemas through the extending core schema documentation.
- **`getSession` vs `useSession`**: `useSession` is a React hook that triggers re-renders when session data changes (use for UI updates, avoid in layout files); `getSession` returns a promise with data/error and is available on both server and client instances.
- **Common TypeScript errors**: enable strict TypeScript checking in `tsconfig.json` — set `"strict": true`, or `"strictNullChecks": true` if strict mode cannot be enabled.
- **Removing `name`, `image`, or `email` from the user table**: these fields cannot currently be removed, though future customizability is planned.
- **Dual module hazard**: multiple versions of `better-auth` or `@better-auth/core` in dependencies cause "No request state found" errors. Diagnose with `pnpm why @better-auth/core`, `npm ls better-auth`, or `yarn why better-call`. Fixes: clean reinstall (remove `node_modules` and lockfiles, then reinstall); on Yarn v1/pnpm v9 add `better-call` to both `dependencies` and `resolutions`; on Next.js add `better-auth` to `serverExternalPackages`; on Cloudflare Workers enable the `nodejs_compat` flag in `wrangler.toml`; ensure Better Auth packages are in `dependencies`, not `devDependencies`.
