# DragControls

Addon control that makes 3D objects draggable with mouse/pointer interaction. Fires events on drag start, drag, and drag end, as well as on hover.

## Signature / Usage

```js
import { DragControls } from 'three/addons/controls/DragControls.js';

const controls = new DragControls(objects, camera, renderer.domElement);

controls.addEventListener('dragstart', (event) => {
  event.object.material.emissive.set(0xaaaaaa);
});

controls.addEventListener('dragend', (event) => {
  event.object.material.emissive.set(0x000000);
});
```

## Constructor

```js
new DragControls(objects: Object3D[], camera: Camera, domElement: HTMLElement)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `objects` | Object3D[] | Array of draggable 3D objects |
| `camera` | Camera | Camera of the rendered scene |
| `domElement` | HTMLElement | HTML element for event listeners (default: `null`) |

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `objects` | Object3D[] | — | Array of draggable 3D objects |
| `raycaster` | Raycaster | — | Raycaster used for object detection |
| `recursive` | boolean | `true` | Allow children of draggable objects to be dragged independently |
| `rotateSpeed` | number | `1` | Rotation speed when dragging in `rotate` mode |
| `transformGroup` | boolean | `false` | Transform the whole group instead of individual objects (requires a single group in `objects`) |

## Events

| Event | Description |
|-------|-------------|
| `dragstart` | Fires when the user starts dragging an object; `event.object` is the target |
| `drag` | Fires while the user is dragging; `event.object` is the target |
| `dragend` | Fires when the user finishes dragging; `event.object` is the target |
| `hoveron` | Fires when pointer moves onto an object or its children |
| `hoveroff` | Fires when pointer moves off an object |

## Notes

- DragControls and OrbitControls can conflict; disable OrbitControls during drag by listening to `dragstart`/`dragend`
- Set `recursive = false` to prevent child meshes from being dragged independently

## Related

- [TransformControls](./TransformControls.md)
