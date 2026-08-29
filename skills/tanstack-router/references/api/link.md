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
| `...props` | `LinkOptions & React.RefAttributes<HTMLAnchorElement>` | All link navigation options plus standard anchor ref attributes |

## Notes

- Special characters (e.g. `@`) in param values are URL-encoded by default (`@foo` becomes `/%40foo`).
- Which characters avoid encoding can be customized via the `pathParamsAllowedCharacters` router option.

## Related

- [LinkOptions](./link-options.md)
- [useNavigate](./use-navigate.md)
- [Navigate](./navigate.md)
