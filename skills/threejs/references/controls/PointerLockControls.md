# PointerLockControls

First-person camera control based on the browser Pointer Lock API. Captures the mouse cursor for full-screen first-person navigation, ideal for 3D games. Provides movement helpers that stay parallel to the xz-plane.

## Signature / Usage

```js
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const controls = new PointerLockControls(camera, document.body);
scene.add(controls.object);

// Lock pointer on click
document.addEventListener('click', () => controls.lock());

controls.addEventListener('lock', () => { menu.style.display = 'none'; });
controls.addEventListener('unlock', () => { menu.style.display = 'block'; });

// In animation loop — move with keyboard
function animate() {
  if (controls.isLocked) {
    if (moveForward) controls.moveForward(speed * delta);
    if (moveRight) controls.moveRight(speed * delta);
  }
  renderer.render(scene, camera);
}
```

## Constructor

```js
new PointerLockControls(camera: Camera, domElement: HTMLElement)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `camera` | Camera | Camera managed by the controls |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isLocked` | boolean | `false` | (readonly) Whether the pointer is currently locked |
| `pointerSpeed` | number | `1` | Multiplier for pointer movement influence on camera rotation |
| `minPolarAngle` | number | `0` | Minimum camera pitch (radians, 0 to π) |
| `maxPolarAngle` | number | `Math.PI` | Maximum camera pitch (radians, 0 to π) |

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `lock` | `(unadjustedMovement?: boolean): void` | Activate pointer lock. Pass `true` to disable OS mouse acceleration |
| `unlock` | `(): void` | Exit pointer lock |
| `getDirection` | `(v: Vector3): Vector3` | Store and return the normalized camera look direction in `v` |
| `moveForward` | `(distance: number): void` | Move camera forward/backward parallel to the xz-plane |
| `moveRight` | `(distance: number): void` | Move camera left/right parallel to the xz-plane |
| `dispose` | `(): void` | Remove event listeners |

## Events

| Event | Description |
|-------|-------------|
| `lock` | Fires when pointer lock is activated |
| `unlock` | Fires when pointer lock is deactivated |
| `change` | Fires when the user moves the mouse |

## Notes

- Pointer lock requires a user gesture (e.g., click) to activate; browsers block automatic locking
- `moveForward` and `moveRight` move parallel to the xz-plane, ignoring camera pitch (standard FPS behavior)
- Combine with keyboard events to implement WASD movement

## Related

- [FirstPersonControls](./FirstPersonControls.md)
- [FlyControls](./FlyControls.md)
