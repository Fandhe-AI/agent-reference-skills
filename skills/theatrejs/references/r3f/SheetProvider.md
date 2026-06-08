# SheetProvider

Container component that connects a Theatre.js sheet to all descendant `editable` elements. Must wrap any r3f elements you want to animate with Theatre.js.

## Signature / Usage

```tsx
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'

const sheet = getProject('My Project').sheet('Scene')

<Canvas>
  <SheetProvider sheet={sheet}>
    <e.mesh theatreKey="Box">
      <boxGeometry />
      <meshStandardMaterial />
    </e.mesh>
  </SheetProvider>
</Canvas>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sheet` | `ISheet` | The Theatre.js sheet instance to bind descendants to |

## Notes

- All `editable` (e.*) elements must be descendants of a `SheetProvider`
- `theatreKey` values must be unique within a single `SheetProvider`
- Typically placed inside `<Canvas>` from `@react-three/fiber`

## Related

- [editable.md](./editable.md)
- [useCurrentSheet.md](./useCurrentSheet.md)
