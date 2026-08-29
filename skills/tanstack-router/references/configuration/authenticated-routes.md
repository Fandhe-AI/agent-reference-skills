---
source: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
---

# Authenticated Routes

Protects routes and manages auth flows using `route.beforeLoad`, which runs before route loading and acts as middleware for a route and its children.

## Signature / Usage

```tsx
// beforeLoad in a route definition
beforeLoad: ({ location }) => {
  if (!isAuthenticated()) {
    throw redirect({
      to: '/login',
      search: { redirect: location.href },
    })
  }
}
```

## Notes

- `beforeLoad` for a route is called before any of its child routes' `beforeLoad` functions, making it suitable for guarding an entire subtree.
- The primary auth pattern throws `redirect()` from `beforeLoad`, capturing the original location (e.g. `search: { redirect: location.href }`) to support post-login redirection.
- When an auth check itself might fail (network issues, token validation), wrap it in try/catch and use `isRedirect()` to distinguish an intentional redirect from a real error.
- Alternative to redirecting: conditionally render login UI on the same page by short-circuiting `<Outlet />` when the user is unauthenticated.
- For hook-based auth state, pass it through `router.context` rather than calling hooks directly inside `beforeLoad` (hooks cannot run outside React components).
- A route guard is not a data authorization boundary — server functions and endpoints must independently verify authorization.

## Related

- [Router Context](./router-context.md)
- [Not Found Errors](./not-found-errors.md)
