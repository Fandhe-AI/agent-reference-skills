# Typed State with Parsers

Use built-in parsers to get typed values (number, boolean, etc.) from URL query parameters.

```tsx
'use client'

import { useQueryState, parseAsInteger, parseAsBoolean, parseAsFloat } from 'nuqs'

export function TypedDemo() {
  const [count, setCount] = useQueryState('count', parseAsInteger.withDefault(0))
  // count: number (never null)

  const [enabled, setEnabled] = useQueryState('enabled', parseAsBoolean.withDefault(false))
  // enabled: boolean

  const [ratio, setRatio] = useQueryState('ratio', parseAsFloat.withDefault(1.0))
  // ratio: number

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <button onClick={() => setEnabled(v => !v)}>Enabled: {String(enabled)}</button>
      <input
        type="range"
        min={0}
        max={2}
        step={0.1}
        value={ratio}
        onChange={e => setRatio(parseFloat(e.target.value))}
      />
    </>
  )
}
```

## Notes

- `.withDefault(value)` eliminates `null` from the return type
- Invalid URL values (e.g., `?count=banana`) fall back to the default value silently
- Available built-in parsers: `parseAsInteger`, `parseAsFloat`, `parseAsBoolean`, `parseAsString`, `parseAsHex`, `parseAsIndex`, `parseAsIsoDateTime`, `parseAsIsoDate`, `parseAsTimestamp`
- `parseAsIndex` adds a `+1` offset for display (useful for 1-based pagination in URLs)
