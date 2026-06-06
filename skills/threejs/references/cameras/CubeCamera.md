# CubeCamera

Renders the scene from a single point into a `WebGLCubeRenderTarget`, producing a cube map that can be used as a real-time reflection or environment map.

## Signature / Usage

```js
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});
const cubeCamera = new THREE.CubeCamera(1, 100000, cubeRenderTarget);
scene.add(cubeCamera);

// Use the cube map as an environment/reflection map
const material = new THREE.MeshLambertMaterial({
  envMap: cubeRenderTarget.texture,
});

// Each frame: hide the reflective object, update, then show again
object.visible = false;
cubeCamera.position.copy(object.position);
cubeCamera.update(renderer, scene);
object.visible = true;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `near` | `number` | — | Near clipping plane (constructor parameter) |
| `far` | `number` | — | Far clipping plane (constructor parameter) |
| `renderTarget` | `WebGLCubeRenderTarget` | — | The cube render target to render into |
| `activeMipmapLevel` | `number` | `0` | Active mipmap level to render to |
| `coordinateSystem` | `WebGLCoordinateSystem \| WebGPUCoordinateSystem \| null` | `null` | Current coordinate system |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `update(renderer, scene)` | `void` | Renders the scene into the cube render target from this camera's position |
| `updateCoordinateSystem()` | `void` | Must be called when the camera's coordinate system changes |

## Notes

- Inherits from `Object3D`, not from the `Camera` base class.
- Typically the reflective object should be hidden before calling `update()` to avoid self-reflection artifacts.

## Related

- [Camera](./Camera.md)
- [PerspectiveCamera](./PerspectiveCamera.md)
