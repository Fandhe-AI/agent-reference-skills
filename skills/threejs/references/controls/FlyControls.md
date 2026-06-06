# FlyControls

Free-form 3D camera navigation similar to fly mode in DCC tools (e.g., Blender). Unlike OrbitControls, it has no target — the camera can move and rotate freely in all directions. Requires `update(delta)` each frame.

## Signature / Usage

```js
import { FlyControls } from 'three/addons/controls/FlyControls.js';

const clock = new THREE.Clock();
const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 10;
controls.rollSpeed = Math.PI / 24;
controls.dragToLook = true;

function animate() {
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(scene, camera);
}
```

## Constructor

```js
new FlyControls(object: Object3D, domElement: HTMLElement)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `object` | Object3D | Camera managed by the controls |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `movementSpeed` | number | `1` | Camera movement speed |
| `rollSpeed` | number | `0.005` | Camera rotation (roll) speed |
| `dragToLook` | boolean | `false` | Require mouse drag for rotation (vs. moving mouse anywhere) |
| `autoForward` | boolean | `false` | Continuously move forward after initial translation |

## Events

| Event | Description |
|-------|-------------|
| `change` | Fires when the camera has been transformed |

## Notes

- `update(delta)` must be called every frame
- No concept of a fixed target point — full 6-DOF movement
- `dragToLook = true` is recommended to avoid unintentional rotation

## Related

- [FirstPersonControls](./FirstPersonControls.md)
- [PointerLockControls](./PointerLockControls.md)
