# Basic Query State

Single URL query parameter synced with React state using `useQueryState`.

```tsx
'use client'

import { useQueryState } from 'nuqs'

export function Demo() {
  const [name, setName] = useQueryState('name')
  return (
    <>
      <input value={name || ''} onChange={e => setName(e.target.value)} />
      <button onClick={() => setName(null)}>Clear</button>
      <p>Hello, {name || 'anonymous visitor'}!</p>
    </>
  )
}
```

## Notes

- `useQueryState` returns `string | null` by default; `null` means the key is absent from the URL
- Calling `setValue(null)` removes the key from the URL entirely
- Drop-in replacement for `React.useState` — same tuple API
- In Next.js App Router, add `'use client'` directive since this is a client-side hook
