# MTLFunction

A public shader function in a Metal library. Represents a vertex, fragment, or compute kernel function that can be compiled into a pipeline state.

## Signature / Usage

```swift
let library = device.makeDefaultLibrary()!

// Non-specialized function
let vertexFn = library.makeFunction(name: "vertex_main")!

// Specialized function with function constants
let constants = MTLFunctionConstantValues()
var enableLighting = true
constants.setConstantValue(&enableLighting, type: .bool, index: 0)
let specializedFn = try library.makeFunction(name: "fragment_main",
                                             constantValues: constants)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `name` | `String` | The shader function's name as declared in MSL |
| `functionType` | `MTLFunctionType` | `.vertex`, `.fragment`, or `.kernel` |
| `device` | `MTLDevice` | The device that created the function |
| `label` | `String?` | Debug identifier |
| `vertexAttributes` | `[MTLVertexAttribute]?` | Input attributes declared in a vertex function |
| `stageInputAttributes` | `[MTLAttribute]?` | Input attributes for post-tessellation vertex or kernel functions |
| `functionConstantsDictionary` | `[String: MTLFunctionConstant]` | Function constants used by specialized functions |
| `options` | `MTLFunctionOptions` | Compilation options used when the function was created |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- Do not create `MTLFunction` instances directly; always use `MTLLibrary` factory methods.
- Release strong references to functions after building the pipeline state to reduce memory usage.
- Function specialization (constants) enables the compiler to generate more optimized code for specific configurations.

## Related

- [MTLLibrary](./mtllibrary.md)
- [MTLRenderPipelineDescriptor](./mtlrenderpipelinedescriptor.md)
- [MTLDevice](./mtldevice.md)
