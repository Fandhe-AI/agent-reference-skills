# CAMetalDrawable

A Metal drawable associated with a Core Animation layer. Represents a drawable owned by a `CAMetalLayer` instance.

## Signature / Usage

```swift
protocol CAMetalDrawable : MTLDrawable

guard let drawable = metalLayer.nextDrawable() else { return }
let texture = drawable.texture
// render into texture, then:
commandBuffer.present(drawable)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `texture` | `any MTLTexture` | Metal texture object that contains the drawable's contents (required). |
| `layer` | `CAMetalLayer` | The layer that owns this drawable object (required). |

## Notes

- Do not implement this protocol yourself — request drawable objects through `CAMetalLayer.nextDrawable()`.
- Conforms to `MTLDrawable`, so it can be passed to `MTLCommandBuffer.present(_:)`.

## Related

- [CAMetalDisplayLink](./cametaldisplaylink.md)
