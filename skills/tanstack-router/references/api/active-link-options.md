---
source: https://tanstack.com/router/latest/docs/api/router/ActiveLinkOptionsType
---

# ActiveLinkOptions

Extends `LinkOptions` with options describing how a link is styled when it is active or inactive.

## Signature / Usage

```tsx
type ActiveLinkOptions = LinkOptions & {
  activeProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
  inactiveProps?:
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `activeProps` | `React.AnchorHTMLAttributes<HTMLAnchorElement> \| (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)` | Optional. Props applied to the anchor element when the link is active |
| `inactiveProps` | `React.AnchorHTMLAttributes<HTMLAnchorElement> \| (() => React.AnchorHTMLAttributes<HTMLAnchorElement>)` | Optional. Props applied to the anchor element when the link is inactive |

## Related

- [LinkOptions](./link-options.md)
- [LinkProps](./link-props.md)
- [Link](./link.md)
