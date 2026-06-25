# MTKView

A specialized `UIView` / `NSView` subclass that creates, configures, and displays Metal content. Manages `CAMetalLayer`, drawable textures, depth/stencil textures, and render pass descriptors automatically.

## Signature / Usage

```swift
// Setup
let view = MTKView(frame: frame, device: MTLCreateSystemDefaultDevice())
view.colorPixelFormat        = .bgra8Unorm
view.depthStencilPixelFormat = .depth32Float
view.clearColor              = MTLClearColor(red: 0.1, green: 0.1, blue: 0.1, alpha: 1)
view.delegate = renderer

// In MTKViewDelegate.draw(in:)
func draw(in view: MTKView) {
    guard let descriptor = view.currentRenderPassDescriptor,
          let drawable   = view.currentDrawable,
          let commandBuffer = commandQueue.makeCommandBuffer() else { return }

    let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: descriptor)!
    // ... draw calls ...
    encoder.endEncoding()

    commandBuffer.present(drawable)
    commandBuffer.commit()
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `device` | `MTLDevice?` | The Metal device used for rendering (must be set before first draw) |
| `colorPixelFormat` | `MTLPixelFormat` | Pixel format for the color drawable texture (default `.bgra8Unorm`) |
| `depthStencilPixelFormat` | `MTLPixelFormat` | Pixel format for the depth/stencil texture |
| `sampleCount` | `Int` | Number of samples for MSAA (default `1`) |
| `clearColor` | `MTLClearColor` | Color used to clear the color attachment |
| `clearDepth` | `Double` | Value used to clear the depth attachment (default `1.0`) |
| `framebufferOnly` | `Bool` | Whether the drawable texture is used only as a render target (default `true`) |
| `drawableSize` | `CGSize` | Current size of drawable textures |
| `autoResizeDrawable` | `Bool` | Whether drawable size tracks the view's bounds (default `true`) |
| `preferredFramesPerSecond` | `Int` | Target frames per second (default `60`) |
| `isPaused` | `Bool` | Pauses the draw loop when `true` |
| `enableSetNeedsDisplay` | `Bool` | Enables event-driven drawing via `setNeedsDisplay()` |
| `currentDrawable` | `CAMetalDrawable?` | The current drawable acquired for this frame |
| `currentRenderPassDescriptor` | `MTLRenderPassDescriptor?` | Preconfigured render pass descriptor for the current drawable |
| `depthStencilTexture` | `MTLTexture?` | Auto-created depth/stencil attachment texture |
| `multisampleColorTexture` | `MTLTexture?` | Auto-created MSAA color texture (when `sampleCount > 1`) |
| `delegate` | `MTKViewDelegate?` | Object that responds to draw and resize events |

### Drawing modes

| Mode | Settings | Use case |
|------|----------|----------|
| Timed (continuous) | `isPaused = false`, `enableSetNeedsDisplay = false` | Games, animations |
| Event-driven | `isPaused = true`, `enableSetNeedsDisplay = true` | UI-like rendering |
| Explicit | `isPaused = true`, `enableSetNeedsDisplay = false`, call `draw()` | Manual control |

## Notes

- iOS 9.0+, iPadOS 9.0+, macOS 10.11+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+.
- Acquire `currentDrawable` and `currentRenderPassDescriptor` as late as possible, immediately before encoding — the system has a limited pool of drawables.
- Call `releaseDrawables()` to free drawable resources when the app is backgrounded.
- Implement `MTKViewDelegate` (`mtkView(_:drawableSizeWillChange:)` and `draw(in:)`) rather than subclassing for the recommended pattern.

## Related

- [MTKTextureLoader](./mtktextureloader.md)
- [MTLDevice](./mtldevice.md)
- [MTLCommandBuffer](./mtlcommandbuffer.md)
- [MTLRenderPassDescriptor](./mtlrenderpassdescriptor.md)
