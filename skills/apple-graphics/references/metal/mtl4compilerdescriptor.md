# MTL4CompilerDescriptor

Metal 4 API. Groups together properties for creating a compiler context.

## Signature / Usage

```swift
class MTL4CompilerDescriptor

let descriptor = MTL4CompilerDescriptor()
descriptor.label = "MyCompiler"
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `label` | `String?` | Assigns an optional descriptor label to the compiler for debugging purposes |
| `pipelineDataSetSerializer` | `(any MTL4PipelineDataSetSerializer)?` | Assigns a pipeline data set serializer into which this compiler stores data for all pipelines it creates |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Metal 4 API. Inherits from `NSObject`; conforms to `NSCopying`, `Equatable`, `Hashable`. Used to create an `MTL4Compiler`, the object responsible for building pipeline states asynchronously in the Metal 4 shader compilation model.

## Related

- [MTL4RenderPipelineDescriptor](./mtl4renderpipelinedescriptor.md)
- [MTLLibrary](./mtllibrary.md)
