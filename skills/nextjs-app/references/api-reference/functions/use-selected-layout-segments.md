# useSelectedLayoutSegments

`useSelectedLayoutSegments` is a Client Component hook that reads all active route segments below the Layout it's called from — useful for breadcrumbs.

## Signature / Usage

```tsx
'use client'

import { useSelectedLayoutSegments } from 'next/navigation'

export default function ExampleClientComponent() {
  const segments = useSelectedLayoutSegments()
  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  )
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `parallelRoutesKey` (optional) | `string` | Reads the active segments within a specific parallel routes slot. |

## Notes

- Returns an array of strings for all active segments beneath the calling layout, or `[]` if none exist.
- Includes Route Groups in the result — filter out segments starting with `(` if not wanted in UI.
- For catch-all routes (`[...slug]`), matched segments are joined as a single string within the array (e.g. `['blog', 'a/b/c']`, not `['blog', 'a', 'b', 'c']`).
- Since Layouts are Server Components by default, this hook is typically called in a Client Component imported into the Layout.
- Introduced in `v13.0.0`.

## Related

- [useSelectedLayoutSegment](./use-selected-layout-segment.md)
