# ArcballControls

Camera control based on a virtual trackball interface. Cursor/finger positions are mapped onto a virtual sphere (gizmo), producing intuitive rotation. Supports full touch input, focus animation, FOV manipulation, and state serialization. Unlike OrbitControls, it does **not** require `update()` in the animation loop when animations are enabled.

## Signature / Usage

```js
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

const controls = new ArcballControls(camera, renderer.domElement, scene);

controls.addEventListener('change', () => {
  renderer.render(scene, camera);
});

// No manual update() needed in animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

## Constructor

```js
new ArcballControls(camera: Camera, domElement: HTMLElement, scene?: Scene)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `camera` | Camera | Camera to control; must not be a child of another object unless it's the scene itself |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |
| `scene` | Scene | Scene rendered by camera; required to display gizmos (default: `null`) |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `target` | Vector3 | `(0,0,0)` | Focus point of the controls |
| `enableRotate` | boolean | `true` | Enable camera rotation |
| `enablePan` | boolean | `true` | Enable camera panning |
| `enableZoom` | boolean | `true` | Enable camera zoom |
| `enableAnimations` | boolean | `true` | Enable rotation/focus animations |
| `enableFocus` | boolean | `true` | Enable double-tap focus operations |
| `enableGizmos` | boolean | `true` | Show/hide the arcball gizmo |
| `enableGrid` | boolean | `false` | Show grid during pan (desktop only) |
| `dampingFactor` | number | `25` | Damping inertia for animations |
| `wMax` | number | `20` | Maximum angular velocity |
| `rotateSpeed` | number | `1` | Rotation speed multiplier |
| `scaleFactor` | number | `1.1` | Zoom scaling factor per step |
| `focusAnimationTime` | number | `500` | Focus animation duration (ms) |
| `cursorZoom` | boolean | `false` | Make zoom cursor-centered |
| `adjustNearFar` | boolean | `false` | Auto-adjust camera near/far on zoom (perspective only) |
| `radiusFactor` | number | `0.67` | Gizmo size relative to screen |
| `minDistance` | number | `0` | Minimum dolly distance (PerspectiveCamera) |
| `maxDistance` | number | `Infinity` | Maximum dolly distance (PerspectiveCamera) |
| `minZoom` | number | `0` | Minimum zoom (OrthographicCamera) |
| `maxZoom` | number | `Infinity` | Maximum zoom (OrthographicCamera) |
| `minFov` | number | `5` | Minimum FOV in degrees |
| `maxFov` | number | `90` | Maximum FOV in degrees |
| `mouseActions` | Array | — | Configured mouse actions array |
| `scene` | Scene | `null` | Scene for gizmo rendering |

## Methods

### Transform / State

| Method | Signature | Description |
|--------|-----------|-------------|
| `reset` | `(): void` | Reset to initial state |
| `saveState` | `(): void` | Save current state for later `reset()` |
| `copyState` | `(): void` | Copy current state to clipboard as JSON |
| `pasteState` | `(): void` | Restore state from clipboard JSON |

### Camera

| Method | Signature | Description |
|--------|-----------|-------------|
| `setCamera` | `(camera: Camera): void` | Set a new camera to control |

### Gizmo

| Method | Signature | Description |
|--------|-----------|-------------|
| `setGizmosVisible` | `(value: boolean): void` | Toggle gizmo visibility |
| `activateGizmos` | `(isActive: boolean): void` | Adjust gizmo visibility intensity |
| `setTbRadius` | `(value: number): void` | Set gizmo radius factor |
| `disposeGrid` | `(): void` | Remove grid from scene |
| `getRaycaster` | `(): Raycaster` | Get internal raycaster |

### Mouse Actions

```js
// Configure a mouse action
controls.setMouseAction(
  operation: 'PAN' | 'ROTATE' | 'ZOOM' | 'FOV',
  mouse: 0 | 1 | 2 | 'WHEEL',
  key?: 'CTRL' | 'SHIFT' | null
): boolean

// Remove a mouse action
controls.unsetMouseAction(
  mouse: 0 | 1 | 2 | 'WHEEL',
  key?: 'CTRL' | 'SHIFT' | null
): boolean
```

## Events

| Event | Description |
|-------|-------------|
| `change` | Fires when camera is transformed |
| `start` | Fires when interaction begins |
| `end` | Fires when interaction finishes |

## Notes

- Unlike OrbitControls, `update()` does not need to be called each frame; animations run internally
- The `scene` parameter is required to render the arcball gizmo
- State can be serialized to clipboard via `copyState()` / `pasteState()` (Ctrl+C/V by default)
- Camera must not be a child of another object (unless that object is the scene itself)

## Related

- [OrbitControls](./OrbitControls.md)
- [TrackballControls](./TrackballControls.md)
