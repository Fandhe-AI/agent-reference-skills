# PerspectiveCamera

Pre-built editable perspective camera component for Theatre.js + React Three Fiber. Wraps `@react-three/drei`'s `PerspectiveCamera` with Theatre.js animation support.

## Signature / Usage

```tsx
import { PerspectiveCamera } from '@theatre/r3f'

<PerspectiveCamera
  theatreKey="Camera"
  makeDefault
  position={[5, 5, -5]}
  fov={75}
/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `theatreKey` | `string` | **Required.** Unique identifier for the Theatre.js sheet object |
| `makeDefault` | `boolean` | Sets this camera as the active rendering camera |
| `position` | `[number, number, number]` | Initial camera position |
| `fov` | `number` | Field of view in degrees |
| `lookAt` | `React.RefObject<THREE.Object3D>` | Ref to a Three.js object the camera tracks automatically |

## Notes

- Must be inside a `<SheetProvider>`
- `lookAt` accepts a ref to any THREE.js Object3D; the camera updates its target each frame
- An `OrthographicCamera` variant with the same props (except `fov`) is also available from `@theatre/r3f`

## Related

- [SheetProvider.md](./SheetProvider.md)
- [editable.md](./editable.md)
