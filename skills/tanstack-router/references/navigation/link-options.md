---
source: https://tanstack.com/router/latest/docs/framework/react/guide/link-options
---

# linkOptions

`linkOptions` type-checks an object literal (or array of object literals) intended for `Link`, `navigate`, or `redirect`, and returns the input as-is, providing type safety before the object is spread into those APIs.

## Signature / Usage

```tsx
import { linkOptions } from '@tanstack/react-router'

const dashboardLinkOptions = linkOptions({
  to: '/dashboard',
  search: { search: '' },
})

function DashboardComponent() {
  const navigate = useNavigate()
  return (
    <>
      <button onClick={() => navigate(dashboardLinkOptions)} />
      <Link {...dashboardLinkOptions} />
    </>
  )
}
```

## Notes

- Without `linkOptions`, a plain object literal's `to` is inferred as `string`, resolving to every route and losing type safety until spread into `Link`.
- Also usable inside `redirect()` (e.g. `beforeLoad: () => { throw redirect(dashboardLinkOptions) }`).
- Accepts an array of object literals for building nav bars; extra properties (e.g. `label`) not present on `Link` props are preserved and inferred.

## Related

- [links.md](./links.md)
- [navigation.md](./navigation.md)
