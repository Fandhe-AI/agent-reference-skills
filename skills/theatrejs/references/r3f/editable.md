# editable (e)

Creates animatable versions of React Three Fiber elements, binding them to Theatre.js for keyframe animation. Typically imported as `e` for brevity.

## Signature / Usage

```tsx
import { editable as e } from '@theatre/r3f'

// As a JSX tag — built-in r3f element types
<e.mesh theatreKey="Cube">
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="orange" />
</e.mesh>

<e.pointLight theatreKey="Key light" position={[10, 10, 10]} />
<e.group theatreKey="Group" />
```

```tsx
// As a function — wraps a custom component
import { editable } from '@theatre/r3f'
import { PerspectiveCamera } from '@react-three/drei'

const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `theatreKey` | `string` | **Required.** Unique identifier for the backing Theatre.js sheet object |
| `visible` | `boolean \| 'editor'` | Visibility control; `'editor'` shows only in the snapshot editor |
| `additionalProps` | `object` | Extra Theatre.js properties beyond standard r3f props |
| `objRef` | `ref` | Ref that receives the backing `ISheetObject` instance |
| `editableType` | `string` | THREE.js type hint used with `editable.primitive` |

## Notes

- `theatreKey` must be unique within its enclosing `SheetProvider`
- `editable` as a function takes `(Component, editableType)` — `editableType` must match a valid THREE.js object type string (e.g., `'perspectiveCamera'`)
- `additionalProps` values are observable on the `ISheetObject` accessed via `objRef`
- All `editable` elements must be inside a `<SheetProvider>`

## Related

- [SheetProvider.md](./SheetProvider.md)
- [PerspectiveCamera.md](./PerspectiveCamera.md)
