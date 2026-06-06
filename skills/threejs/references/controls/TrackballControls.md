# TrackballControls

Camera control similar to OrbitControls, but does **not** maintain a constant `up` direction. The camera can rotate freely through the poles without flipping, providing a true trackball-like experience. Requires `update()` every frame.

## Signature / Usage

```js
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 1;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

window.addEventListener('resize', () => controls.handleResize());

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
```

## Constructor

```js
new TrackballControls(object: Object3D, domElement: HTMLElement)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `object` | Object3D | Camera managed by the controls |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `target` | Vector3 | `(0,0,0)` | Focus point of the controls |
| `rotateSpeed` | number | `1` | Rotation speed |
| `zoomSpeed` | number | `1.2` | Zoom speed |
| `panSpeed` | number | `0.3` | Pan speed |
| `noRotate` | boolean | `false` | Disable rotation |
| `noZoom` | boolean | `false` | Disable zooming |
| `noPan` | boolean | `false` | Disable panning |
| `staticMoving` | boolean | `false` | Disable damping; instant stop when input ends |
| `dynamicDampingFactor` | number | `0.2` | Damping intensity when `staticMoving` is `false` |
| `minDistance` | number | `0` | Minimum dolly distance (PerspectiveCamera) |
| `maxDistance` | number | `Infinity` | Maximum dolly distance (PerspectiveCamera) |
| `minZoom` | number | `0` | Minimum zoom (OrthographicCamera) |
| `maxZoom` | number | `Infinity` | Maximum zoom (OrthographicCamera) |
| `keys` | string[] | `['KeyA','KeyS','KeyD']` | Keys for orbit, zoom, pan interactions |
| `mouseButtons` | Object | See below | Mouse button → action mapping |
| `screen` | Object | — | (readonly) Screen properties, auto-set by `handleResize()` |

```js
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.PAN
};
```

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `update` | `(): void` | Update controls; **must be called every frame** |
| `handleResize` | `(): void` | Update internal screen info; call on window/canvas resize |
| `reset` | `(): void` | Reset to initial state |

## Events

| Event | Description |
|-------|-------------|
| `change` | Fires when the camera has been transformed |
| `start` | Fires when interaction begins |
| `end` | Fires when interaction finishes |

## Notes

- Key difference from OrbitControls: camera `up` vector is **not** preserved — allows full-sphere rotation without flipping
- `update()` must be called every frame (not just when damping is enabled)
- Call `handleResize()` whenever the window or canvas is resized to keep interactions accurate

## Related

- [OrbitControls](./OrbitControls.md)
- [ArcballControls](./ArcballControls.md)
