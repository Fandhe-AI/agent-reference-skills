# Image / ImageSampler / ImageFilter / ImageWrap

`Image` is a drawable image resource (obtained via `context:image('name')`). `ImageSampler` configures the wrapping/filtering used when an `Image` is drawn or sampled.

## Signature / Usage

```lua
function init(self: DrawImage, context: Context): boolean
  self.myImage = context:image('myImage')
  self.sampler = ImageSampler('clamp', 'clamp', 'bilinear')
  return true
end

function draw(self: DrawImage, renderer: Renderer)
  renderer:drawImage(self.myImage, self.sampler, 'srcOver', 1)
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `Image.width` / `Image.height` | Image dimensions |
| `Image:view() -> GPUTextureView` | GPU texture view for sampling in WGSL shaders (GPU-canvas contexts only) |
| `ImageSampler(wrapX: ImageWrap, wrapY: ImageWrap, filter: ImageFilter)` | Constructor: sampling parameters for drawing an image |
| `ImageWrap` (enum) | `clamp`, `repeat`, `mirror` — texture coordinate handling outside `[0,1]` |
| `ImageFilter` (enum) | `bilinear`, `nearest` — sampling filter used on scale/transform |

## Related

- [renderer.md](./renderer.md)
- [interface-decoded-image.md](./interface-decoded-image.md)
- [gpu-textures.md](./gpu-textures.md)
