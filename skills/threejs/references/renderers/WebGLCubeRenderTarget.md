# WebGLCubeRenderTarget

A render target for rendering to a cube map texture. Used for dynamic environment maps and point light shadow maps.

## Signature / Usage

```js
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});

const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
scene.add(cubeCamera);

// In animation loop:
cubeCamera.update(renderer, scene);
mesh.material.envMap = cubeRenderTarget.texture;
```

## Constructor

```js
new THREE.WebGLCubeRenderTarget(size, options)
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number | `1` | Size (width and height) of each cube face. |
| `options` | RenderTarget~Options | — | Configuration for texture format, filtering, etc. |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `isWebGLCubeRenderTarget` | boolean (readonly) | Always `true`. Used for type testing. |
| `texture` | DataArrayTexture | The cube map texture. Overrides `WebGLRenderTarget#texture` type. |

Inherits properties from `WebGLRenderTarget` → `RenderTarget` → `EventDispatcher`.

## Methods

### `.fromEquirectangularTexture(renderer, texture)`

```js
cubeRenderTarget.fromEquirectangularTexture(renderer, equirectTexture): WebGLCubeRenderTarget
```

Converts an equirectangular (panoramic) texture to a cube map and stores the result in this target.

| Name | Type | Description |
|------|------|-------------|
| `renderer` | WebGLRenderer | The renderer. |
| `texture` | Texture | Source equirectangular texture. |

Returns `this` for chaining.

### `.clear(renderer, color, depth, stencil)`

Clears the cube render target's buffers.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `renderer` | WebGLRenderer | — | The renderer. |
| `color` | boolean | `true` | Clear color buffer. |
| `depth` | boolean | `true` | Clear depth buffer. |
| `stencil` | boolean | `true` | Clear stencil buffer. |

## Notes

- Typically used with `CubeCamera` for real-time environment reflections.
- Use `fromEquirectangularTexture` as an efficient way to bake HDR environment maps into a cube map at runtime.

## Related

- [WebGLRenderTarget](./WebGLRenderTarget.md)
- [WebGLRenderer](./WebGLRenderer.md)
