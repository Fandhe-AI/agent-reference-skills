# Tips and tricks

A collection of good practices to get the most out of nuqs.

## Signature / Usage

Reusing hooks: encapsulate parser configuration in a custom hook when the same hooks are used in multiple components.

```ts
// hooks/useCoordinates.ts
'use client'

import { useQueryStates, parseAsFloat } from 'nuqs'

export function useCoordinates() {
  return useQueryStates({
    lat: parseAsFloat.withDefault(0),
    lng: parseAsFloat.withDefault(0),
  })
}
```

```tsx
// components/Map.tsx
'use client'

import { useCoordinates } from '../hooks/useCoordinates'

function MapView() {
  const [{ lat, lng }] = useCoordinates() // Read-only
  return (
    <div>
      Latitude: {lat}
      Longitude: {lng}
    </div>
  )
}

function MapControls() {
  const [{ lat, lng }, setCoordinates] = useCoordinates()
  return (
    <div>
      <input
        type="number"
        value={lat}
        onChange={(e) => setCoordinates({ lat: e.target.valueAsNumber })}
      />
      <input
        type="number"
        value={lng}
        onChange={(e) => setCoordinates({ lng: e.target.valueAsNumber })}
      />
    </div>
  )
}
```

## Notes

- All query states bound to the same key are synchronized across components.

## Related

- [useQueryStates](../hooks/useQueryStates.md)
- [Built-in parsers](../parsers/built-in.md)
