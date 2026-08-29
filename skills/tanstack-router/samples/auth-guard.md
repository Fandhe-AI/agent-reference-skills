---
source: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
---

# Auth Guard with `beforeLoad` and `redirect`

Guard a route subtree by throwing `redirect()` from `beforeLoad`, capturing the original location for post-login redirection.

```tsx
// src/routes/_authenticated.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location, context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
})
```

```tsx
// src/routes/login.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: (search.redirect as string) || '/',
  }),
  component: LoginComponent,
})

function LoginComponent() {
  const { redirect: redirectTo } = Route.useSearch()
  const navigate = useNavigate()

  const onLoginSuccess = () => navigate({ to: redirectTo })

  return <button onClick={onLoginSuccess}>Log in</button>
}
```

## Notes

- `beforeLoad` on a pathless layout route (`_authenticated.tsx`) runs before any child route's `beforeLoad`, guarding the whole subtree.
- Pass hook-based auth state through `router.context` (via `<RouterProvider context={{ auth }} />`) rather than calling hooks inside `beforeLoad`.
- Wrap the auth check in try/catch and use `isRedirect(err)` to distinguish an intentional redirect from a real failure when the check itself can fail (network, token validation).
- A route guard is not a data authorization boundary — server functions/endpoints must independently re-verify authorization.
