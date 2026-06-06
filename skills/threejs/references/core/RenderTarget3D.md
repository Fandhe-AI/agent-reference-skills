# RenderTarget3D

A render target backed by a 3D texture (`Data3DTexture`). Use when rendering into a 3D volume texture.

Extends: `RenderTarget`

## Constructor

```js
new RenderTarget3D(width?, height?, depth?, options?)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | number | `1` | Width in pixels |
| `height` | number | `1` | Height in pixels |
| `depth` | number | `1` | Depth (number of slices) |
| `options` | Object | — | Same options as `RenderTarget` |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isRenderTarget3D` | boolean (readonly) | Type flag |
| `texture` | Data3DTexture | Overrides `RenderTarget.texture` with a `Data3DTexture` |

All other properties are inherited from `RenderTarget`.

## Notes

- Inherits all `RenderTarget` methods: `setSize()`, `clone()`, `copy()`, `dispose()`.

## Related

- [RenderTarget](./RenderTarget.md)
