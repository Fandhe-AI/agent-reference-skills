# useCurrentSheet

Hook that returns the `ISheet` instance from the nearest ancestor `SheetProvider`. Useful for triggering playback or accessing the sheet inside a component tree without prop drilling.

## Signature / Usage

```tsx
import { useCurrentSheet } from '@theatre/r3f'
import { useEffect } from 'react'

function SceneController() {
  const sheet = useCurrentSheet()

  useEffect(() => {
    sheet?.project.ready.then(() => {
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] })
    })
  }, [sheet])

  return null
}
```

## Notes

- Returns `ISheet | undefined` if called outside a `SheetProvider`
- Imported from `@theatre/r3f`, not `@theatre/react`
- Gives access to `sheet.sequence` for controlling playback (`.play()`, `.pause()`, `.position`)

## Related

- [SheetProvider.md](./SheetProvider.md)
- [useVal.md](./useVal.md)
