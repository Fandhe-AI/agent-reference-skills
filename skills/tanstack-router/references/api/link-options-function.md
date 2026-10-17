---
source: https://tanstack.com/router/latest/docs/api/router/linkOptions
---

# linkOptions (function)

Type checks an object literal with the intention of being used for `Link`, `navigate` or `redirect`. Returns an object literal with the exact type inferred from the input.

## Signature / Usage

```tsx
const userLinkOptions = linkOptions({
  to: '/dashboard/users/user',
  search: {
    usersView: {
      sortBy: 'email',
      filterBy: 'filter',
    },
    userId: 0,
  },
})

function DashboardComponent() {
  return <Link {...userLinkOptions} />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...props` | `LinkProps & React.RefAttributes<HTMLAnchorElement>` | The link options to type check |

## Related

- [LinkProps](./link-props.md)
- [Link](./link.md)
- [LinkOptions (type)](./link-options.md)
