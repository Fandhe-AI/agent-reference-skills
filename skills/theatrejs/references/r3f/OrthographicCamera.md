# OrthographicCamera

Pre-built editable orthographic camera component for Theatre.js + React Three Fiber. Wraps `@react-three/drei`'s `OrthographicCamera` with Theatre.js animation support.

## Signature / Usage

```tsx
import { OrthographicCamera } from '@theatre/r3f'

<OrthographicCamera
  theatreKey="OrthoCamera"
  makeDefault
  position={[0, 5, 10]}
/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `theatreKey` | `string` | **Required.** Unique identifier for the Theatre.js sheet object |
| `makeDefault` | `boolean` | Sets this camera as the active rendering camera |
| `position` | `[number, number, number]` | Initial camera position |
| `lookAt` | `React.RefObject<THREE.Object3D>` | Ref to a Three.js object the camera tracks automatically |

## Notes

- Must be inside a `<SheetProvider>`
- Unlike `PerspectiveCamera`, there is no `fov` prop; use `zoom` instead (standard drei prop)
- See `PerspectiveCamera` for the perspective equivalent

## Related

- [PerspectiveCamera.md](./PerspectiveCamera.md)
- [SheetProvider.md](./SheetProvider.md)
