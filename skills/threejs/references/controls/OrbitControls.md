# OrbitControls

Camera control that allows orbiting around a target point. Performs orbiting, dollying (zooming), and panning while maintaining the camera's `up` direction (+Y by default). The most commonly used camera control in Three.js.

## Signature / Usage

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  controls.update(); // required when enableDamping or autoRotate is true
  renderer.render(scene, camera);
}
```

**Control Scheme:**
- Orbit: Left mouse / one-finger touch
- Zoom: Middle mouse / mousewheel / two-finger pinch
- Pan: Right mouse / left mouse + ctrl/meta/shift / arrow keys / two-finger touch

## Constructor

```js
new OrbitControls(object: Object3D, domElement: HTMLElement)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `object` | Object3D | The camera managed by the controls |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |

## Options / Props

### Core

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `target` | Vector3 | `(0,0,0)` | Focus point the camera orbits around |
| `enabled` | boolean | `true` | Enable/disable all controls |

### Rotation

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableRotate` | boolean | `true` | Enable camera rotation |
| `rotateSpeed` | number | `1` | Rotation speed multiplier |
| `minPolarAngle` | number | `0` | Minimum vertical orbit angle (radians) |
| `maxPolarAngle` | number | `Math.PI` | Maximum vertical orbit angle (radians) |
| `minAzimuthAngle` | number | `-Infinity` | Minimum horizontal orbit angle (radians) |
| `maxAzimuthAngle` | number | `Infinity` | Maximum horizontal orbit angle (radians) |

### Zoom / Dolly

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableZoom` | boolean | `true` | Enable zooming/dollying |
| `zoomSpeed` | number | `1` | Zoom speed multiplier |
| `zoomToCursor` | boolean | `false` | Zoom toward cursor position instead of target |
| `minDistance` | number | `0` | Minimum dolly distance (PerspectiveCamera) |
| `maxDistance` | number | `Infinity` | Maximum dolly distance (PerspectiveCamera) |
| `minZoom` | number | `0` | Minimum zoom level (OrthographicCamera) |
| `maxZoom` | number | `Infinity` | Maximum zoom level (OrthographicCamera) |

### Pan

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enablePan` | boolean | `true` | Enable camera panning |
| `panSpeed` | number | `1` | Pan speed multiplier |
| `screenSpacePanning` | boolean | `true` | `true`: pan in screen space; `false`: pan in world plane orthogonal to `camera.up` |
| `keyPanSpeed` | number | `7` | Keyboard pan speed in pixels per keypress |
| `keyRotateSpeed` | number | `1` | Keyboard rotation speed |

### Damping / Auto-rotate

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableDamping` | boolean | `false` | Enable inertia/damping effect |
| `dampingFactor` | number | `0.05` | Damping inertia factor (requires `update()` in loop) |
| `autoRotate` | boolean | `false` | Automatically rotate around target |
| `autoRotateSpeed` | number | `2` | Auto-rotate speed (2 = 30 sec/orbit at 60fps) |

### Cursor / Target Constraints

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cursor` | Vector3 | — | Focus point for `minTargetRadius`/`maxTargetRadius` constraint |
| `cursorStyle` | `'auto'` \| `'grab'` | `'auto'` | CSS cursor style while interacting |
| `minTargetRadius` | number | `0` | Min distance of `target` from `cursor` |
| `maxTargetRadius` | number | `Infinity` | Max distance of `target` from `cursor` |

### Input Bindings

```js
controls.keys = {
  LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown'
};

controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN
};

controls.touches = {
  ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN
};
```

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `update` | `(deltaTime?: number): boolean` | Update the controls. **Must be called in the animation loop** when `enableDamping` or `autoRotate` is `true`. Returns `true` if the view changed |
| `saveState` | `(): void` | Save the current state; can be restored with `reset()` |
| `reset` | `(): void` | Reset to the last saved or initial state |
| `getDistance` | `(): number` | Return distance from camera to `target` |
| `getPolarAngle` | `(): number` | Return current vertical rotation angle (radians) |
| `getAzimuthalAngle` | `(): number` | Return current horizontal rotation angle (radians) |
| `listenToKeyEvents` | `(domElement: HTMLElement): void` | Add key event listeners to the given DOM element |
| `stopListenToKeyEvents` | `(): void` | Remove key event listeners |
| `rotateLeft` | `(angle: number): void` | Programmatically rotate left by angle (radians) |
| `rotateUp` | `(angle: number): void` | Programmatically rotate up by angle (radians) |
| `pan` | `(deltaX: number, deltaY: number): void` | Programmatically pan by pixel delta |
| `dollyIn` | `(dollyScale: number): void` | Programmatically dolly in (zoom in) |
| `dollyOut` | `(dollyScale: number): void` | Programmatically dolly out (zoom out) |
| `dispose` | `(): void` | Remove event listeners |

## Events

| Event | Description |
|-------|-------------|
| `change` | Fires when the camera has been transformed |
| `start` | Fires when an interaction begins |
| `end` | Fires when an interaction finishes |

```js
controls.addEventListener('change', () => renderer.render(scene, camera));
```

## Notes

- `update()` must be called each frame when `enableDamping` or `autoRotate` is enabled
- Call `controls.update()` after any manual changes to the camera's transform
- MapControls is a subclass of OrbitControls with mouse buttons swapped for map-style navigation
- To restrict polar angle and prevent flipping through the pole, set `maxPolarAngle` below `Math.PI`

## Related

- [MapControls](./MapControls.md)
- [TrackballControls](./TrackballControls.md)
- [ArcballControls](./ArcballControls.md)
