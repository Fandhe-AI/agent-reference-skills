---
source: https://tanstack.com/router/latest/docs/framework/react/installation/migrate-from-react-router
---

# Migrate from React Router

Checklist for transitioning an application from `react-router` to TanStack Router.

## Signature / Usage

```tsx
// After uninstalling react-router-dom, TypeScript errors surface every call site
// that needs to change:
// - <Link> from react-router-dom -> TanStack Router's <Link> (with `to` / `params`)
// - useNavigate() -> TanStack Router's useNavigate()
// - <Outlet /> from react-router-dom -> TanStack Router's <Outlet />
// - useParams() -> add a `from` property specifying the route path
// - useSearchParams() -> route-level `validateSearch` + useSearch({ from })
```

## Notes

- "Uninstall `react-router-dom` and then you should get typescript errors in your files" — a deliberate strategy to surface every required change
- react-router and TanStack Router are separate libraries: `Link` / `Outlet` / `useNavigate` are named the same but are not interchangeable APIs
- Migration can happen incrementally over one or two sprints, but running multiple router providers simultaneously is discouraged
- Example migration repo referenced, including auth-library (Supertokens) configuration notes

## Related

- [Comparison](./comparison.md)
- [Migrate from React Location](./migrate-from-react-location.md)
