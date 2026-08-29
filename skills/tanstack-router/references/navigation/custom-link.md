---
source: https://tanstack.com/router/latest/docs/framework/react/guide/custom-link
---

# createLink

`createLink` creates a custom `Link` component with the same type parameters and type safety as the built-in `Link`, for cross-cutting styling or wrapping third-party link components.

## Signature / Usage

```tsx
import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => <a ref={ref} {...props} className="block px-3 py-2 text-blue-700" />,
)

const CreatedLinkComponent = createLink(BasicLinkComponent)

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />
}
```

```tsx
<CustomLink to="/dashboard/invoices/$invoiceId" params={{ invoiceId: 0 }} />
```

## Notes

- Commonly used to wrap third-party link components (React Aria Components, Chakra UI, MUI `Link`/`Button`, Mantine `Anchor`) so they gain `Link`'s type-safe `to`/`params`/`search`.
- For components exposing render props (`className`, `style`, `children` as functions), wrap in an intermediate component before passing to `createLink`.
- Resulting components can still be styled with `styled()` (e.g. MUI) as usual.

## Related

- [links.md](./links.md)
