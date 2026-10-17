---
source: https://tanstack.com/router/latest/docs/api/router/linkComponent
---

# Link

Creates a link that navigates to a new location, including changes to the pathname, search params, hash, and location state.

## Signature / Usage

```tsx
import { Link } from '@tanstack/react-router'

function Component() {
  return (
    <Link
      to="/somewhere/$somewhereId"
      params={{ somewhereId: 'baz' }}
      search={(prev) => ({ ...prev, foo: 'bar' })}
    >
      Click me
    </Link>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...props` | `LinkProps & React.RefAttributes<HTMLAnchorElement>` | Props from `LinkProps` (`ActiveLinkOptions` + anchor attributes + `children`) plus standard anchor ref attributes |

## Notes

- Special characters (e.g. `@`) in param values are URL-encoded by default (`@foo` becomes `/%40foo`).
- Which characters avoid encoding can be customized via the `pathParamsAllowedCharacters` router option. That option is set when the router is created and cannot be changed on an existing router instance.
- Not the same as React Router's `Link`; the props and options are TanStack Router's own.

## Related

- [LinkProps](./link-props.md)
- [LinkOptions](./link-options.md)
- [useNavigate](./use-navigate.md)
- [Navigate](./navigate.md)
