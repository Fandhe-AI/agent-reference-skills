# URL Key Remapping

Use descriptive variable names in code while keeping URL keys short with the `urlKeys` option.

```tsx
'use client'

import { useQueryStates, parseAsFloat } from 'nuqs'
import type { UrlKeys } from 'nuqs'

// Reusable parser definitions
export const coordinatesParsers = {
  latitude: parseAsFloat.withDefault(45.18),
  longitude: parseAsFloat.withDefault(5.72),
}

// Map readable names → short URL keys
export const coordinatesUrlKeys: UrlKeys<typeof coordinatesParsers> = {
  latitude: 'lat',
  longitude: 'lng',
}

export function CoordinatesDisplay() {
  const [{ latitude, longitude }, setCoordinates] = useQueryStates(
    coordinatesParsers,
    { urlKeys: coordinatesUrlKeys }
  )
  // URL: ?lat=45.18&lng=5.72
  // Code uses: latitude, longitude

  return (
    <p>
      Position: {latitude.toFixed(4)}, {longitude.toFixed(4)}
    </p>
  )
}
```

## Notes

- `urlKeys` separates internal naming from URL representation without changing runtime behavior
- Exporting `UrlKeys` alongside parsers makes the mapping reusable across components
- `urlKeys` is not supported when using TanStack Router's `validateSearch` integration
- Introduced in nuqs v1.20.0; the `UrlKeys` type helper was added in v2.3.0
