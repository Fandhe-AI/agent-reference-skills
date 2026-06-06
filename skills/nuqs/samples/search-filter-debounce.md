# Search Filter with Debounce

Debounce URL updates for search input so the URL only changes after the user stops typing.

```tsx
'use client'

import { useQueryState, parseAsString, debounce } from 'nuqs'

export function SearchFilter() {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ shallow: false })
  )

  return (
    <input
      type="search"
      value={search}
      placeholder="Search..."
      onChange={e =>
        setSearch(e.target.value, {
          limitUrlUpdates: e.target.value === '' ? undefined : debounce(500),
        })
      }
      onKeyDown={e => {
        if (e.key === 'Enter') {
          // Flush immediately on Enter
          setSearch((e.target as HTMLInputElement).value)
        }
      }}
    />
  )
}
```

## Notes

- The hook's state updates instantly for a responsive UI; only URL writes are debounced
- `shallow: false` triggers server-side re-fetch (RSC / loader) after the debounce settles
- Clearing the input (empty string) skips debounce so the URL clears immediately
- Use `throttle(ms)` instead of `debounce(ms)` for sliders that emit frequent events at a steady rate
