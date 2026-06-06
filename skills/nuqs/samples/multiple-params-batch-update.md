# Multiple Params Batch Update

Manage multiple query parameters atomically with `useQueryStates`; updates within the same event loop tick are batched into a single URL change.

```tsx
'use client'

import { useQueryStates, parseAsFloat } from 'nuqs'

export function CoordinatesPicker() {
  const [coordinates, setCoordinates] = useQueryStates(
    {
      lat: parseAsFloat.withDefault(45.18),
      lng: parseAsFloat.withDefault(5.72),
    },
    { history: 'push' }
  )

  const { lat, lng } = coordinates

  return (
    <>
      <p>Lat: {lat}, Lng: {lng}</p>
      <button
        onClick={() =>
          setCoordinates({
            lat: Math.random() * 180 - 90,
            lng: Math.random() * 360 - 180,
          })
        }
      >
        Randomize
      </button>
      <button onClick={() => setCoordinates(null)}>Reset</button>
    </>
  )
}
```

## Notes

- Both `lat` and `lng` update in a single history entry — no intermediate URL states
- `setCoordinates(null)` clears all managed keys without affecting other query params
- The setter returns `Promise<URLSearchParams>` — `await setCoordinates(...)` resolves after the URL is updated
- Partial updates are supported: `setCoordinates({ lat: 42 })` leaves `lng` unchanged
