# Array Params

Store arrays in URL query parameters using `parseAsArrayOf` or `parseAsNativeArrayOf`.

```tsx
'use client'

import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsNativeArrayOf,
  parseAsInteger,
} from 'nuqs'

export function TagFilter() {
  // Comma-separated: ?tags=books,tech,science
  const [tags, setTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([])
  )

  // Repeated keys: ?page=1&page=3&page=5
  const [pages, setPages] = useQueryState(
    'page',
    parseAsNativeArrayOf(parseAsInteger).withDefault([])
  )

  const toggle = (tag: string) =>
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )

  return (
    <div>
      {['books', 'tech', 'science'].map(tag => (
        <label key={tag}>
          <input
            type="checkbox"
            checked={tags.includes(tag)}
            onChange={() => toggle(tag)}
          />
          {tag}
        </label>
      ))}
    </div>
  )
}
```

## Notes

- `parseAsArrayOf(parser)` serializes as a delimiter-separated string (default `,`); pass a custom separator as second argument: `parseAsArrayOf(parseAsString, '|')`
- `parseAsNativeArrayOf(parser)` uses repeated URL keys (`?tag=a&tag=b`), which is the standard URL array format
- All built-in parsers can be used as the element parser inside `parseAsArrayOf` / `parseAsNativeArrayOf`
- Empty array and `null` are distinct: empty array (`[]`) keeps the key in the URL (unless `clearOnDefault` removes it), while `null` always removes the key
