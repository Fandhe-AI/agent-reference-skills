# forbidden.js

Renders UI when the `forbidden()` function is invoked during authentication, and returns a `403` status code.

## Signature / Usage

```tsx filename="app/forbidden.tsx"
import Link from 'next/link'

export default function Forbidden() {
  return (
    <div>
      <h2>Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```

## Options / Props

`forbidden.js` components do not accept any props.

## Notes

- This feature is currently **experimental** and not recommended for production.
- Introduced in `v15.1.0`.

## Related

- [forbidden](../functions/forbidden.md)
