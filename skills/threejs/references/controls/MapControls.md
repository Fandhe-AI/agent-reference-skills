# MapControls

Subclass of OrbitControls optimized for top-down map-style navigation. Left mouse button pans, right mouse button rotates, and `screenSpacePanning` is `false` by default so panning stays in the ground plane.

## Signature / Usage

```js
import { MapControls } from 'three/addons/controls/MapControls.js';

const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
```

**Input Scheme:**
- Pan: Left mouse / arrow keys / one-finger touch
- Zoom: Middle mouse / mousewheel / two-finger pinch
- Orbit: Right mouse / left mouse + ctrl/meta/shift / two-finger rotate

## Constructor

```js
new MapControls(object: Object3D, domElement: HTMLElement)
```

Inherits the same constructor parameters as OrbitControls.

## Options / Props

MapControls inherits all properties from OrbitControls and overrides the following defaults:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `screenSpacePanning` | boolean | `false` | Pan orthogonal to `camera.up` (world plane), not screen space |
| `mouseButtons` | Object | See below | Mouse button → action mapping |
| `touches` | Object | See below | Touch gesture → action mapping |

```js
// Default mouse bindings (swapped from OrbitControls)
controls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE
};

// Default touch bindings
controls.touches = {
  ONE: THREE.TOUCH.PAN,
  TWO: THREE.TOUCH.DOLLY_ROTATE
};
```

All other OrbitControls properties (`enableDamping`, `autoRotate`, `minDistance`, etc.) are available.

## Notes

- MapControls is identical to OrbitControls except for the swapped mouse bindings and `screenSpacePanning` default
- Inherits all methods and events from OrbitControls
- `update()` must be called in the animation loop when `enableDamping` or `autoRotate` is enabled

## Related

- [OrbitControls](./OrbitControls.md)
