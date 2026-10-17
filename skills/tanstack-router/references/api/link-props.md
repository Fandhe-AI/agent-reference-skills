---
source: https://tanstack.com/router/latest/docs/api/router/LinkPropsType
---

# LinkProps

Extends `ActiveLinkOptions` and `React.AnchorHTMLAttributes<HTMLAnchorElement>` with props specific to the `Link` component.

## Signature / Usage

```tsx
type LinkProps = ActiveLinkOptions &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    children?:
      | React.ReactNode
      | ((state: { isActive: boolean }) => React.ReactNode)
  }
```

## Options / Props

- All of the props from `ActiveLinkOptions`
- All of the props from `React.AnchorHTMLAttributes<HTMLAnchorElement>`

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode \| ((state: { isActive: boolean }) => React.ReactNode)` | Optional. Rendered inside the anchor element. If a function is provided, it is called with an object containing the `isActive` boolean |

## Related

- [ActiveLinkOptions](./active-link-options.md)
- [Link](./link.md)
- [linkOptions (function)](./link-options-function.md)
