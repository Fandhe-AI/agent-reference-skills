---
source: https://tanstack.com/router/latest/docs/framework/react/guide/type-utilities
---

# Type Utilities

A subset of TanStack Router's exposed types intended for external use, providing the same type-safe experience as the router's runtime concepts with flexibility in where type checking is applied (most internal types are unstable and not meant for public use).

## Signature / Usage

```tsx
export interface HeaderLinkProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  title: string
  linkOptions: ValidateLinkOptions<TRouter, TOptions>
}

export function HeadingLink<TRouter extends RegisteredRouter, TOptions>(
  props: HeaderLinkProps<TRouter, TOptions>,
): React.ReactNode
export function HeadingLink(props: HeaderLinkProps): React.ReactNode {
  return (
    <>
      <h1>{props.title}</h1>
      <Link {...props.linkOptions} />
    </>
  )
}
```

```tsx
<HeadingLink title="Posts" linkOptions={{ to: '/posts' }} />
```

## Options / Props

| Name | Type parameters | Description |
| --- | --- | --- |
| `ValidateLinkOptions` | `<TRouter, TOptions>` | Type-checks an object literal against `Link` options at inference sites |
| `ValidateLinkOptionsArray` | `<TRouter, TItems, TFrom?>` | Array variant of `ValidateLinkOptions`; optionally fixes `from` for every item |
| `ValidateFromPath` | `<TRouter, TFrom>` | Additional type checking for a fixed `from` path used alongside `ValidateLinkOptionsArray` |
| `ValidateRedirectOptions` | `<TRouter, TOptions>` | Type-checks an object literal against redirect options at inference sites |
| `ValidateNavigateOptions` | `<TRouter, TOptions>` | Type-checks an object literal against navigate options at inference sites |

## Notes

- All type parameters are optional, but `TRouter` should always be specified on public-facing signatures for best TypeScript performance; `TOptions` should be used at inference sites to correctly narrow `params`/`search`.
- A looser overload without type parameters (as shown for `HeadingLink`) avoids type assertions in the implementation.
- `ValidateRedirectOptions` example: `fetchOrRedirect('http://example.com/', { to: '/login' })` where the function throws `redirect(redirectOptions)` internally.
- `ValidateNavigateOptions` example: build a `useConditionalNavigate` hook that gates `navigate(navigateOptions)` behind an enabled flag.

## Related

- [Type Safety](./type-safety.md)
- [Creating a Router](./creating-a-router.md)
