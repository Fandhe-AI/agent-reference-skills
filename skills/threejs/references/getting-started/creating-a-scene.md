# Creating a Scene

Build a minimal three.js app with a spinning cube by combining a Scene, Camera, and Renderer.

## Signature / Usage

```js
import * as THREE from 'three';

// Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry + material → mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Render loop
function animate(time) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
```

## Options / Props

### `PerspectiveCamera(fov, aspect, near, far)`

| Name | Type | Description |
|------|------|-------------|
| fov | number | Field of view in degrees (e.g., 75) |
| aspect | number | Width / height ratio; use `window.innerWidth / window.innerHeight` |
| near | number | Near clipping plane; objects closer than this won't render |
| far | number | Far clipping plane; objects farther than this won't render |

### `renderer.setSize(width, height, updateStyle?)`

| Name | Type | Description |
|------|------|-------------|
| width | number | Render width in pixels |
| height | number | Render height in pixels |
| updateStyle | boolean | Pass `false` to render at lower resolution while keeping element size |

## Notes

- Three essential components: **Scene** (container), **Camera** (viewpoint), **Renderer** (draws to canvas).
- `renderer.domElement` is the `<canvas>` element; append it to the DOM yourself.
- `renderer.setAnimationLoop(fn)` uses `requestAnimationFrame` internally and pauses when the tab is hidden.
- The `time` parameter in the animation callback is elapsed milliseconds since the loop started.
- Move the camera away from the origin (e.g., `camera.position.z = 5`) to avoid rendering inside the geometry.

## Related

- [Installation](./installation.md)
- [Drawing Lines](./drawing-lines.md)
