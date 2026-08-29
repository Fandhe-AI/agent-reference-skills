---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/useLinkPropsHook.md
---

# useLinkProps

Accepts link options and returns a `React.AnchorHTMLAttributes<HTMLAnchorElement>` props object suitable for spreading onto an anchor element.

## Signature / Usage

```tsx
import { useLinkProps } from '@tanstack/react-router'

function CustomLink() {
  const anchorProps = useLinkProps({ to: '/posts/$postId', params: { postId: '123' } })
  return <a {...anchorProps}>Post</a>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...options` | `ActiveLinkOptions & React.AnchorHTMLAttributes<HTMLAnchorElement>` | Navigation options merged with standard anchor attributes |

## Related

- [Link](./link.md)
- [LinkOptions](./link-options.md)
