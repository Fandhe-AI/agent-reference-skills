# FramebufferTexture

Captures framebuffer contents into a texture using `renderer.copyFramebufferToTexture()`. Extends `Texture`.

## Signature / Usage

```js
const pixelRatio = window.devicePixelRatio;
const size = 128 * pixelRatio;
const texture = new THREE.FramebufferTexture(size, size);

const position = new THREE.Vector2(
  (window.innerWidth * pixelRatio / 2) - size / 2,
  (window.innerHeight * pixelRatio / 2) - size / 2
);

renderer.render(scene, camera);
renderer.copyFramebufferToTexture(texture, position);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `width` | number | Width of the texture in pixels |
| `height` | number | Height of the texture in pixels |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `generateMipmaps` | boolean | `false` | Mipmap generation (overrides Texture default) |
| `isFramebufferTexture` | boolean (readonly) | `true` | Type-testing flag |
| `magFilter` | number | `NearestFilter` | Magnification filter (overrides Texture default) |
| `minFilter` | number | `NearestFilter` | Minification filter (overrides Texture default) |

## Notes

- Must be used with `renderer.copyFramebufferToTexture()` to populate with data.
- Filters default to `NearestFilter` to avoid interpolation artifacts.

## Related

- [Texture](./Texture.md)
- [DepthTexture](./DepthTexture.md)
