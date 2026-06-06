# Custom Parser

Create a type-safe parser for a custom data format using `createParser`.

```tsx
import { createParser, useQueryState } from 'nuqs'

// Encodes sort state as "field:direction" in the URL (e.g., ?sort=name:asc)
const parseAsSort = createParser({
  parse(query: string) {
    const [key = '', direction = ''] = query.split(':')
    if (!key) return null
    return { id: key, desc: direction === 'desc' }
  },
  serialize(value: { id: string; desc: boolean }) {
    return `${value.id}:${value.desc ? 'desc' : 'asc'}`
  },
  eq(a, b) {
    return a.id === b.id && a.desc === b.desc
  },
})

export function SortControl() {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsSort.withDefault({ id: 'name', desc: false })
  )

  return (
    <button onClick={() => setSort({ id: sort.id, desc: !sort.desc })}>
      Sort by {sort.id} ({sort.desc ? 'desc' : 'asc'})
    </button>
  )
}
```

## Notes

- `parse` must return `null` for invalid input — never throw
- `eq` is required for non-primitive types so `clearOnDefault` can detect equality correctly
- The parser gains `.withDefault()` and `.withOptions()` builder methods automatically
- `createMultiParser` handles repeated URL keys (`?tag=a&tag=b`) where `parse` receives `string[]`
