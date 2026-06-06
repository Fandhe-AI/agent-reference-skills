# ExternalTexture

Wraps a texture created externally with the same renderer context (e.g. from a protected media stream, device camera, or depth sensor). Extends `Texture`.

## Signature / Usage

```js
// WebGL usage
const glTexture = gl.createTexture();
// ... populate glTexture externally ...
const texture = new THREE.ExternalTexture(glTexture);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sourceTexture` | WebGLTexture \| GPUTexture | `null` | The externally created texture object |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isExternalTexture` | boolean (readonly) | `true` | Type-testing flag |
| `sourceTexture` | WebGLTexture \| GPUTexture | `null` | The external texture source |

## Notes

- Supported by both `WebGLRenderer` and `WebGPURenderer` (WebGPU backend).
- Typical use cases: protected media streams, device camera feeds, external depth sensors.

## Related

- [Texture](./Texture.md)
- [VideoTexture](./VideoTexture.md)
