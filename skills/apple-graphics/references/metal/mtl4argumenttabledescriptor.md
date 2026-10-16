# MTL4ArgumentTableDescriptor

Metal 4 API. Groups parameters for the creation of a Metal argument table. Argument tables provide resource bindings to your Metal pipeline states.

## Signature / Usage

```swift
class MTL4ArgumentTableDescriptor

// Passed to an MTLDevice factory method:
makeArgumentTable(descriptor:)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `label` | `String?` | Assigns an optional label with the argument table for debug purposes |
| `maxBufferBindCount` | `Int` | Determines the number of buffer-binding slots for the argument table |
| `maxTextureBindCount` | `Int` | Determines the number of texture-binding slots for the argument table |
| `maxSamplerStateBindCount` | `Int` | Determines the number of sampler state-binding slots for the argument table |
| `initializeBindings` | `Bool` | Configures whether Metal initializes the bindings to nil values upon creation of the argument table |
| `supportAttributeStrides` | `Bool` | Controls whether Metal should reserve memory for attribute strides in the argument table |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+. Inherits from `NSObject`; conforms to `NSCopying`.
- Workflow from the Metal 4 core API article: create or reuse a descriptor, set how many bindings of each type the table stores (for example `maxBufferBindCount` and `maxTextureBindCount`), create the table with `MTLDevice.makeArgumentTable(descriptor:)`, then add or update bindings with `MTL4ArgumentTable` methods such as `setResource(_:bufferIndex:)` and `setSamplerState(_:index:)`.
- Each table consumes only the memory it needs for its bindings, and one table can be assigned to the stages of multiple encoders.
- Source: https://developer.apple.com/documentation/metal/mtl4argumenttabledescriptor

## Related

- [MTL4ArgumentTable](./mtl4argumenttable.md)
- [MTL4RenderCommandEncoder](./mtl4rendercommandencoder.md)
- [MTL4CommandAllocator](./mtl4commandallocator.md)
