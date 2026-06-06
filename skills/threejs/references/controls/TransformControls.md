# TransformControls

Addon control for translating, rotating, and scaling 3D objects directly in the viewport using an interaction model similar to DCC tools (Blender, Maya). Unlike camera controls, TransformControls transforms the **attached object**, not the camera.

## Signature / Usage

```js
import { TransformControls } from 'three/addons/controls/TransformControls.js';

const controls = new TransformControls(camera, renderer.domElement);
scene.add(controls.getHelper()); // add visual gizmo to scene

controls.attach(mesh); // attach object to transform

// Switch modes with keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 't') controls.setMode('translate');
  if (e.key === 'r') controls.setMode('rotate');
  if (e.key === 's') controls.setMode('scale');
});

controls.addEventListener('dragging-changed', (e) => {
  orbitControls.enabled = !e.value; // disable orbit while dragging
});
```

## Constructor

```js
new TransformControls(camera: Camera, domElement: HTMLElement)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `camera` | Camera | Camera of the rendered scene |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `camera` | Camera | — | Camera of the rendered scene |
| `mode` | `'translate'` \| `'rotate'` \| `'scale'` | `'translate'` | Current transformation mode |
| `space` | `'world'` \| `'local'` | `'world'` | Coordinate space for transformations |
| `size` | number | `1` | Size of the helper gizmo UI |
| `axis` | string | — | Currently active transformation axis |
| `dragging` | boolean | `false` | (readonly) Whether dragging is in progress |
| `translationSnap` | number | `null` | Translation snap increment in world units |
| `rotationSnap` | number | `null` | Rotation snap increment in radians |
| `scaleSnap` | number | `null` | Scale snap increment |
| `minX` | number | `-Infinity` | Minimum allowed X position during translation |
| `maxX` | number | `Infinity` | Maximum allowed X position during translation |
| `minY` | number | `-Infinity` | Minimum allowed Y position during translation |
| `maxY` | number | `Infinity` | Maximum allowed Y position during translation |
| `minZ` | number | `-Infinity` | Minimum allowed Z position during translation |
| `maxZ` | number | `Infinity` | Maximum allowed Z position during translation |
| `showX` | boolean | `true` | Show X-axis gizmo |
| `showY` | boolean | `true` | Show Y-axis gizmo |
| `showZ` | boolean | `true` | Show Z-axis gizmo |
| `showXY` | boolean | `true` | Show XY-plane gizmo |
| `showXZ` | boolean | `true` | Show XZ-plane gizmo |
| `showYZ` | boolean | `true` | Show YZ-plane gizmo |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `attach` | `(object: Object3D): this` | Set the object to transform and show gizmo |
| `detach` | `(): this` | Remove the current object and hide gizmo |
| `getHelper` | `(): TransformControlsRoot` | Return the visual gizmo — **must be added to the scene** |
| `setMode` | `(mode: 'translate' \| 'rotate' \| 'scale'): void` | Set transformation mode |
| `getMode` | `(): string` | Get current transformation mode |
| `setSpace` | `(space: 'world' \| 'local'): void` | Set coordinate space |
| `setSize` | `(size: number): void` | Set gizmo UI size |
| `setTranslationSnap` | `(snap: number): void` | Set translation snap increment |
| `setRotationSnap` | `(snap: number): void` | Set rotation snap increment |
| `setScaleSnap` | `(snap: number): void` | Set scale snap increment |
| `setColors` | `(xAxis, yAxis, zAxis, active): void` | Set gizmo axis colors |
| `getRaycaster` | `(): Raycaster` | Return internal raycaster (shared across instances) |
| `reset` | `(): void` | Reset object to state at start of current transform |
| `dispose` | `(): void` | Remove event listeners |

## Events

| Event | Description |
|-------|-------------|
| `change` | Fires on any change to the controlled object or gizmo properties |
| `mouseDown` | Fires when a pointer becomes active |
| `mouseUp` | Fires when a pointer is released |
| `objectChange` | Fires when the controlled 3D object's transform changes |
| `dragging-changed` | Fires with `event.value` boolean when dragging starts/stops |

## Notes

- `getHelper()` returns the visual gizmo object — it **must be added to the scene** to be visible
- The attached object must be part of the scene graph
- Disable other controls (e.g., OrbitControls) during drag by listening to `dragging-changed`
- Property changes emit `"[propertyname]-changed"` events in addition to `change`
- The internal raycaster is shared across all TransformControls instances

## Related

- [DragControls](./DragControls.md)
