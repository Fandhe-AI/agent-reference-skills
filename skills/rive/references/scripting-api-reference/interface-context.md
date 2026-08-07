# Context (interfaces.Context)

Bridges a script and the Rive runtime: view model access, asset retrieval, rendering surfaces, and update scheduling. Passed as the second argument to `init(self, context)` and other lifecycle functions across all protocols.

## Signature / Usage

```lua
function init(self: MyNode, context: Context): boolean
  local vmi = context:viewModel()
  self.myImage = context:image('myImage')
  self.myBlob = context:blob('myBlob')
  return true
end

function update(self: MyNode, context: Context)
  context:markNeedsUpdate()
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `markNeedsUpdate()` | Flags the node for re-evaluation next frame; ignored if called from `update()` |
| `viewModel() -> ViewModel?` | ViewModel bound to the node's immediate data context |
| `rootViewModel() -> ViewModel?` | ViewModel attached to the root artboard |
| `dataContext() -> DataContext?` | DataContext for the node, for navigating parent contexts |
| `image(name) -> Image?` | Fetches a named image asset |
| `blob(name) -> Blob?` | Fetches a named raw binary data asset |
| `audio(name) -> AudioSource?` | Fetches a named audio asset |
| `canvas(desc?) -> Canvas` | Creates a 2D canvas for Renderer drawing |
| `gpuCanvas(desc?) -> GPUCanvas` | Creates a GPU presentation target for custom render passes / MSAA |
| `shader(name) -> Shader?` | Fetches a compiled shader asset for a `GPUPipeline` |
| `features() -> GPUFeatures` | Queries GPU capabilities/limits for the current backend |
| `decodeImage(data: buffer) -> Promise` | Decodes PNG/JPEG/WebP data into a `DecodedImage` |

## Related

- [data-binding.md](./data-binding.md)
- [interface-view-model.md](./interface-view-model.md)
- [gpu-core.md](./gpu-core.md)
- [interface-decoded-image.md](./interface-decoded-image.md)
