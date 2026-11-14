# Waku Integration

Mount the handler on a Waku catch-all API route, collect cookies set by server-side `auth.api` calls with a `wakuCookies()` plugin plus middleware, and read the session through a per-request `getSession()` helper (Waku `1.0.0-rc.4` APIs).

```ts
// src/pages/_api/api/auth/[...route].ts
import { auth } from "../../../../auth" // Adjust the path as necessary

export default function handler(request: Request): Promise<Response> {
  return auth.handler(request)
}
```

```ts
// src/auth.ts
import { betterAuth, type BetterAuthPlugin } from "better-auth"
import { createAuthMiddleware } from "better-auth/api"
import { applySetCookies } from "better-auth/cookies"
import { getContext } from "hono/context-storage"
import { Pool } from "pg"

export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  plugins: [wakuCookies()], // make sure this is the last plugin in the array
})

type Session = typeof auth.$Infer.Session

export type AuthEnv = {
  Variables: {
    betterAuthSetCookie: string[]
    sessionPromise?: Promise<Session | null>
  }
}

function wakuCookies() {
  return {
    id: "waku-cookies",
    hooks: {
      after: [
        {
          matcher: () => true,
          handler: createAuthMiddleware(async (ctx) => {
            // Requests to the auth handler set cookies on their own response
            if ("_flag" in ctx && ctx._flag === "router") return
            const setCookies = ctx.context.responseHeaders?.getSetCookie() ?? []
            if (!setCookies.length) return
            const c = getContext<AuthEnv>()
            // A single request can make several auth calls
            c.set("betterAuthSetCookie", [...c.var.betterAuthSetCookie, ...setCookies])
            // The cookies changed, so the next read fetches the session again
            c.set("sessionPromise", undefined)
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin
}

/**
 * Returns the current session, fetched once per request until cookies change.
 * Cookies set earlier in the request take precedence over the incoming ones.
 */
export function getSession() {
  const c = getContext<AuthEnv>()
  if (c.var.sessionPromise) return c.var.sessionPromise
  const headers = new Headers(c.req.raw.headers)
  applySetCookies(headers, c.var.betterAuthSetCookie)
  const sessionPromise = auth.api.getSession({ headers })
  c.set("sessionPromise", sessionPromise)
  return sessionPromise
}
```

```ts
// src/middleware/auth.ts
import { every } from "hono/combine"
import { contextStorage } from "hono/context-storage"
import { createMiddleware } from "hono/factory"
import type { AuthEnv } from "../auth"

const authMiddleware = () =>
  every(
    contextStorage(),
    createMiddleware<AuthEnv>(async (c, next) => {
      c.set("betterAuthSetCookie", [])
      await next()
      for (const cookie of c.var.betterAuthSetCookie) {
        c.header("set-cookie", cookie, { append: true })
      }
    }),
  )

export default authMiddleware
```

```ts
// src/pages/_interceptors/session.ts
import { tryGetContext } from "hono/context-storage"
import { getRequest, type HandlerInterceptor } from "waku/router/server"
import { getSession } from "../../auth"

const sessionInterceptor: HandlerInterceptor = async (next) => {
  // Static renders at build time have no Hono context, and no session.
  if (!tryGetContext()) return next()
  // API routes are not streamed. Under `/api/auth`, a refreshed session
  // cookie would also override the one sign-out expires.
  const { pathname } = new URL(getRequest().url)
  if (pathname.startsWith("/api/")) return next()
  await getSession()
  return next()
}

export default sessionInterceptor
```

```tsx
// src/pages/dashboard.tsx
import { unstable_redirect as redirect } from "waku/router/server"
import { getSession } from "../auth"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  )
}

export const getConfig = async () => {
  return { render: "dynamic" } as const
}
```

## Notes

- Waku currently only supports file-level `"use server"`, so server actions live in dedicated files such as `src/actions.ts`
- Cookie-setting server-side calls (like `signOut`) need the `wakuCookies()` plugin paired with the `src/middleware/auth.ts` middleware, which writes the collected cookies once Waku's `Response` exists — Waku has no built-in cookie plugin like Next.js's `nextCookies`
- Resolve the session in the handler interceptor before rendering: Waku streams server component responses, so a cookie cache or expiry refresh inside a layout or page would lose its cookies. Pages that read the session must use `render: "dynamic"`
- A redirect in a layout does not stop the page beneath it from rendering; check the session in each page, server action, and API route that returns protected data
- Calls through `auth.api` skip rate limiting, so keep sign-in and sign-up on the client (`authClient`)
- Middleware should only check `getSessionCookie` existence for optimistic redirects, not full validation (see `references/integrations/waku.md` for the redirect middleware)
- Client setup uses `createAuthClient` from `better-auth/react` (see `samples/client-setup.md`)
- `database` is a `pg` `Pool`, matching the other adapter docs; the `{ provider, url }` object form is not a valid Better Auth database option (Adapted from the official docs)
