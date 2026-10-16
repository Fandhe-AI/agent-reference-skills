# Troubleshooting

Common issues and solutions when using nuqs.

## Signature / Usage

Using different parsers on the same key propagates the last update to every hook bound to that key:

```ts
const [int] = useQueryState('foo', parseAsInteger)
const [float, setFloat] = useQueryState('foo', parseAsFloat)

setFloat(1.234)

// `int` is now 1.234, instead of 1
```

Recommended fix: abstract a key/parser pair into a dedicated hook and derive the desired state from the value:

```ts
function useIntFloat() {
  const [float, setFloat] = useQueryState('foo', parseAsFloat)
  const int = Math.floor(float)
  return [{int, float}, setFloat] as const
}
```

## Notes

- Known issues and solutions are tracked at https://github.com/47ng/nuqs/issues/423.
- Pages router: because the Next.js pages router is not available in an SSR context, the hook always returns `null` (or the default value if supplied) on SSR/SSG. This limitation does not apply to the app router.
- Hooks are synced on a per-key basis, so different parsers on the same key lead to unexpected states (see above).
- Next.js error "Missing Suspense boundary with useSearchParams": components using hooks like `useQueryState` should be wrapped in `<Suspense>` when rendered within a page component. Adding the `'use client'` directive to `page.tsx` is the immediate fix:

```tsx
'use client'

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  )
}

function Client() {
  const [foo, setFoo] = useQueryState('foo')
  // ...
}
```

- Recommended approach for better UX (pre-rendering the outer shell): keep `page.tsx` as a server component (no `'use client'` directive), move client-side features into a separate client file, and wrap the client component in a `<Suspense>` boundary.

## Related

- [useQueryState](../hooks/useQueryState.md)
- [Built-in parsers](../parsers/built-in.md)
