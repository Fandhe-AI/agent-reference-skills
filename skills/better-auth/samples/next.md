# Next.js Integration

Add the `nextCookies` plugin for server actions and protect routes with `getSessionCookie` in `proxy.ts` (Next.js 16) or `middleware.ts`.

```ts
// lib/auth.ts — last plugin in the array sets Set-Cookie automatically in server actions
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  // ...your config
  plugins: [nextCookies()],
});
```

```ts
// pages/api/auth/[...all].ts — Pages Router only (App Router uses toNextJsHandler, see samples/server-setup.md)
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";

export const config = { api: { bodyParser: false } };
export default toNodeHandler(auth.handler);
```

```ts
// proxy.ts (Next.js 16+; use middleware.ts + matching name pre-16) — optimistic cookie check
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard"] };
```

## Notes

- App Router `route.ts` setup (`toNextJsHandler`) and the `createAuthClient` client are already covered in `samples/server-setup.md` and `samples/client-setup.md`
- `getSessionCookie` only checks cookie existence, it does not validate the session — always re-check with `auth.api.getSession` on protected pages/actions
- Next.js 16 renames `middleware.ts`/`middleware` to `proxy.ts`/`proxy`; run `npx @next/codemod@canary middleware-to-proxy .` to migrate
- RSCs cannot set cookies, so the cookie cache only refreshes after a client interaction (Server Action or Route Handler)
