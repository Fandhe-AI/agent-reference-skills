# Waku Integration

Integrates Better Auth with Waku: a catch-all API route, a React client, a cookie-collecting plugin, request middleware, a session interceptor, and per-request session caching. The examples use the APIs of Waku `1.0.0-rc.4`.

## Signature / Usage

Mount the handler at `src/pages/_api/api/auth/[...route].ts`:

```ts
// src/pages/_api/api/auth/[...route].ts
import { auth } from "../../../../auth" // Adjust the path as necessary

export default function handler(request: Request): Promise<Response> {
  return auth.handler(request)
}
```

Create a client with `better-auth/react`:

```ts
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()
```

Collect cookies from server code (plugin plus `getSession()` helper):

```ts
// src/auth.ts
import { betterAuth, type BetterAuthPlugin } from "better-auth"
import { createAuthMiddleware } from "better-auth/api"
import { applySetCookies } from "better-auth/cookies"
import { getContext } from "hono/context-storage"

export const auth = betterAuth({
  //...your config
  plugins: [wakuCookies()] // make sure this is the last plugin in the array // [!code highlight]
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

Write cookies to the response (Waku loads files in `src/middleware` automatically):

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

Resolve the session before rendering:

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

Read the session in a page (pages that read the session must use `render: "dynamic"`):

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

Sign in from the client (goes through the auth handler and its rate limiting):

```tsx
// src/components/sign-in-form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "waku"
import { authClient } from "../lib/auth-client"

export function SignInForm() {
  const router = useRouter()
  const [error, setError] = useState<string>()
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const { error } = await authClient.signIn.email({
          email: String(form.get("email")),
          password: String(form.get("password")),
        })
        if (error) return setError(error.message)
        router.push("/dashboard")
      }}
    >
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Sign in</button>
      {error && <p>{error}</p>}
    </form>
  )
}
```

Sign out from a server action (use as `<form action={signOut}>`):

```ts
// src/actions.ts
"use server"

import { getRequest, unstable_redirect as redirect } from "waku/router/server"
import { auth } from "./auth"

export async function signOut() {
  await auth.api.signOut({ headers: getRequest().headers })
  redirect("/sign-in")
}
```

Redirect optimistically in middleware:

```ts
// src/middleware/redirect.ts
import type { MiddlewareHandler } from "hono"
import { getSessionCookie } from "better-auth/cookies"
import {
  unstable_formatRouterRequest as formatRouterRequest,
  unstable_parseRouterRequest as parseRouterRequest,
} from "waku/router/server"

const redirectMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const route = parseRouterRequest(c.req.raw)
    const isProtected =
      route?.type === "route" &&
      (route.path === "/dashboard" || route.path.startsWith("/dashboard/"))
    // Only checks that the cookie exists. Pages still verify the session.
    if (isProtected && !getSessionCookie(c.req.raw)) {
      const location = formatRouterRequest(c.req.raw, "/sign-in")
      if (location) {
        // 303, so a form posted without JavaScript is not resent
        return c.redirect(location.pathname + location.search, 303)
      }
    }
    await next()
  }
}

export default redirectMiddleware
```

Custom cookie name or prefix:

```ts
const sessionCookie = getSessionCookie(request, {
  cookieName: "my_session_cookie",
  cookiePrefix: "my_prefix",
})
```

Show the session on a static page with a lazy dynamic slice (render with `<Slice id="account-menu" lazy fallback={<span />} />`):

```tsx
// src/pages/_slices/account-menu.tsx
import { getSession } from "../../auth"

export default async function AccountMenu() {
  const session = await getSession()
  if (!session) {
    return <a href="/sign-in">Sign in</a>
  }
  return <a href="/dashboard">{session.user.name}</a>
}

export const getConfig = async () => {
  return { render: "dynamic" } as const
}
```

## Notes

- If you change `basePath`, move the API route to match and update the `/api/` check in the session interceptor
- Server actions and server components cannot set cookies on Waku's response; the `wakuCookies()` plugin collects the cookies Better Auth sets and the middleware adds them once Waku's `Response` exists, so pages rendered later in the same request see the change. Keep the plugin last in the `plugins` array
- Waku streams server component responses, so headers are sent before components finish rendering. A cookie cache or expiry refresh inside a layout or page would lose its cookies; resolve the session in a handler interceptor before rendering starts
- Waku renders a route's layouts and its page independently, so a redirect in a layout does not stop the page beneath it from rendering. Check the session in each page, server action, and API route that returns protected data
- Calls through `auth.api` skip rate limiting, so keep sign-in and sign-up on the client (`authClient`)
- A client-side navigation requests `/RSC/R/dashboard.txt` instead of `/dashboard`, so the middleware matches the route with Waku's router helpers. In production, pages rendered as `static` are served before middleware runs, so protected pages must use `render: "dynamic"`
- `getSessionCookie` only checks that a cookie exists; it does not validate it and does not read your auth config, so pass the same `cookieName` / `cookiePrefix` if customized. Always re-validate the session per page/route
- Changed in the 1.7.23 docs: the page was restructured (the earlier `unstable_getContextData` / `unstable_getHeaders` approach and the sign-up / sign-in examples were replaced by the `hono/context-storage` based plugin, middleware, interceptor, and `getSession()` helper above)
- Source: https://www.better-auth.com/docs/integrations/waku (better-auth v1.7.23 docs)

## Related

- [next](./next.md)
- [tanstack](./tanstack.md)
