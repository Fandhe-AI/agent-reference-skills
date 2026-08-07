# samples

| Name | Description | Path |
| --- | --- | --- |
| Astro Integration | Mount the Better Auth handler on an Astro catch-all API route and pick the matching frontend client. | [astro.md](./astro.md) |
| Client Setup | Create the auth client instance for use in browser/framework code. | [client-setup.md](./client-setup.md) |
| Convex Integration | Run Better Auth as a Convex component so `auth.api` executes inside Convex functions instead of a Node server. | [convex.md](./convex.md) |
| Electron Integration | Authenticate Electron apps by delegating sign-in to the system browser and bridging the result back over deep links. | [electron.md](./electron.md) |
| Elysia Integration | Mount the Better Auth handler on Elysia (Bun server) and expose `user`/`session` via `macro` + `resolve`. | [elysia.md](./elysia.md) |
| Email & Password Authentication | Sign up and sign in users with email and password credentials. | [email-password-auth.md](./email-password-auth.md) |
| Email Verification | Send and verify email confirmation links for new user accounts. | [email-verification.md](./email-verification.md) |
| Encore Integration | Mount Better Auth on an Encore.ts raw endpoint and validate sessions inside an Encore auth handler/gateway. | [encore.md](./encore.md) |
| Expo Integration | Add the Expo server plugin and the matching client plugin so React Native apps get secure-storage sessions and deep-link OAuth. | [expo.md](./expo.md) |
| Express Integration | Mount the handler with `toNodeHandler` on a catch-all route, and retrieve sessions with `fromNodeHeaders`. | [express.md](./express.md) |
| Fastify Integration | Bridge Fastify's request/reply to the Fetch API `Request`/`Response` that `auth.handler` expects. | [fastify.md](./fastify.md) |
| Hono Integration | Mount the handler on a Hono catch-all route and stash `user`/`session` in context via middleware. | [hono.md](./hono.md) |
| Hooks | Run custom logic before or after auth endpoints using server-side middleware hooks. | [hooks.md](./hooks.md) |
| Lynx Integration | Create a Lynx client with `better-auth/lynx` for cross-platform (Android/iOS/Web) apps built on the Lynx rendering framework. | [lynx.md](./lynx.md) |
| NestJS Integration | Wire Better Auth into NestJS with the community `@thallesp/nestjs-better-auth` module; routes are protected globally by default. | [nestjs.md](./nestjs.md) |
| Next.js Integration | Add the `nextCookies` plugin for server actions and protect routes with `getSessionCookie` in `proxy.ts` (Next.js 16) or `middleware.ts`. | [next.md](./next.md) |
| Nitro Integration | Mount the handler on a Nitro catch-all event handler and protect routes with an `onRequest` guard. | [nitro.md](./nitro.md) |
| Nuxt Integration | Mount the handler on a Nitro catch-all route, use `authClient.useSession(useFetch)` for SSR-hydrated session state, and gate pages with route middleware. | [nuxt.md](./nuxt.md) |
| Password Reset | Implement a forgot-password flow: request a reset link and apply the new password. | [password-reset.md](./password-reset.md) |
| React Router v7 Integration | Mount the handler on a resource route and call it from both `loader` and `action`. | [react-router.md](./react-router.md) |
| Server Setup | Create and configure the auth instance with a database and mount the API handler. | [server-setup.md](./server-setup.md) |
| Session Management | Read, cache, and revoke user sessions on both client and server. | [session-management.md](./session-management.md) |
| Sign Out | Terminate the current user session and optionally redirect after logout. | [sign-out.md](./sign-out.md) |
| Social Sign-In | Authenticate users via OAuth providers such as GitHub and Google. | [social-sign-in.md](./social-sign-in.md) |
| SolidStart Integration | Mount the handler with the dedicated SolidStart adapter. | [solid-start.md](./solid-start.md) |
| SvelteKit Integration | Mount the handler in `hooks.server.ts` via `svelteKitHandler`, populate `event.locals`, and add `sveltekitCookies` for server actions. | [svelte-kit.md](./svelte-kit.md) |
| TanStack Start Integration | Mount the handler on a TanStack server route and guard routes with `beforeLoad` + a server function. | [tanstack.md](./tanstack.md) |
| Two-Factor Authentication | Add TOTP-based 2FA using the `twoFactor` plugin. | [two-factor-auth.md](./two-factor-auth.md) |
| User Management | Update user profile, change email or password, and delete accounts. | [user-management.md](./user-management.md) |
| Waku Integration | Mount the handler on a Waku catch-all API route and read sessions via `waku/server` request headers in RSCs and server actions. | [waku.md](./waku.md) |
