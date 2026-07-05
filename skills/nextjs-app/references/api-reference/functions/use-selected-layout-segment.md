# useSelectedLayoutSegment

`useSelectedLayoutSegment` is a Client Component hook that reads the active route segment one level below the Layout it's called from — useful for nav UI like tabs.

## Signature / Usage

```tsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()
  return <p>Active segment: {segment}</p>
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `parallelRoutesKey` (optional) | `string` | Reads the active segment within a specific parallel routes slot. |

## Notes

- Returns a string of the active segment, or `null` if none exists.
- Only returns the segment one level down; use `useSelectedLayoutSegments` for all active segments.
- For catch-all routes (`[...slug]`), returns matched segments joined as a single string (e.g. `'a/b/c'`).
- Since Layouts are Server Components by default, this hook is typically called in a Client Component imported into the Layout.
- Introduced in `v13.0.0`.

## Related

- [useSelectedLayoutSegments](./use-selected-layout-segments.md)
