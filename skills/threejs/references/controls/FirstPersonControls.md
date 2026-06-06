# FirstPersonControls

Alternative implementation of FlyControls providing first-person camera control with mouse-look and keyboard movement. Suitable for walk-through scenes. Requires `update(delta)` to be called every frame.

## Signature / Usage

```js
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

const clock = new THREE.Clock();
const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 10;
controls.lookSpeed = 0.1;

function animate() {
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(scene, camera);
}
```

## Constructor

```js
new FirstPersonControls(object: Object3D, domElement: HTMLElement)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `object` | Object3D | Camera managed by the controls |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `movementSpeed` | number | `1` | Camera movement speed |
| `lookSpeed` | number | `0.005` | Mouse-look speed |
| `lookVertical` | boolean | `true` | Allow vertical camera look |
| `autoForward` | boolean | `false` | Automatically move the camera forward |
| `constrainVertical` | boolean | `false` | Constrain vertical look to `verticalMin`/`verticalMax` |
| `verticalMin` | number | `0` | Lower vertical look limit (radians, 0 to π) |
| `verticalMax` | number | `0` | Upper vertical look limit (radians, 0 to π) |
| `heightSpeed` | boolean | `false` | Modulate forward speed by camera height |
| `heightCoef` | number | `1` | Speed multiplier when height is near `heightMax` |
| `heightMin` | number | `0` | Lower height boundary for speed adjustment |
| `heightMax` | number | `1` | Upper height boundary for speed adjustment |
| `mouseDragOn` | boolean | `false` | (readonly) Whether mouse button is held |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `update` | `(delta: number): void` | Advance controls by `delta` seconds; call every frame |
| `handleResize` | `(): void` | Update internal screen size; call on window resize |
| `lookAt` | `(x: number \| Vector3, y?: number, z?: number): this` | Point the camera at a position |

## Notes

- `update(delta)` is mandatory every frame; pass `clock.getDelta()` for frame-rate independence
- Call `handleResize()` when the canvas or window is resized
- For game-style first-person movement with pointer lock, consider PointerLockControls instead

## Related

- [FlyControls](./FlyControls.md)
- [PointerLockControls](./PointerLockControls.md)
