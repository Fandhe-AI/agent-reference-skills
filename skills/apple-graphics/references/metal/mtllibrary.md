# MTLLibrary

A collection of compiled Metal shader functions. Loaded from the app bundle's precompiled `.metallib` or compiled at runtime from MSL source. Created via `MTLDevice` factory methods.

## Signature / Usage

```swift
// Load the default compiled library from the app bundle
let library = device.makeDefaultLibrary()!

// Get a shader function by name
let vertexFn   = library.makeFunction(name: "vertex_main")!
let fragmentFn = library.makeFunction(name: "fragment_main")!

// Compile from source at runtime
let source = """
#include <metal_stdlib>
using namespace metal;
kernel void add(device float* a [[buffer(0)]], uint id [[thread_position_in_grid]]) {
    a[id] += 1.0;
}
"""
let runtimeLibrary = try device.makeLibrary(source: source, options: nil)
```

## Options / Props

| Method / Property | Type | Description |
|-------------------|------|-------------|
| `makeFunction(name:)` | `MTLFunction?` | Returns a non-specialized function by name |
| `makeFunction(name:constantValues:)` | throws `MTLFunction` | Creates a specialized function with constant values |
| `makeFunction(descriptor:completionHandler:)` | `Void` | Asynchronously creates a function with a descriptor |
| `functionNames` | `[String]` | Names of all public functions in the library |
| `device` | `MTLDevice` | The GPU device that created the library |
| `label` | `String?` | Debug identifier |
| `type` | `MTLLibraryType` | `.default` or `.dynamic` |
| `installName` | `String?` | Installation name for dynamic libraries |

### Creation methods on `MTLDevice`

| Method | Description |
|--------|-------------|
| `makeDefaultLibrary()` | Loads the precompiled `.metallib` from the app bundle |
| `makeLibrary(filepath:)` | Loads from a file path |
| `makeLibrary(data:)` | Loads from precompiled binary `Data` |
| `makeLibrary(source:options:)` | Synchronously compiles MSL source |
| `makeLibrary(source:options:completionHandler:)` | Asynchronously compiles MSL source |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, tvOS, visionOS 1.0+, Mac Catalyst 13.1+.
- The default library (`makeDefaultLibrary`) is the preferred approach for shipping apps; runtime compilation is useful for developer tools or dynamically generated shaders.
- Release `MTLFunction` strong references after creating pipeline states to free memory.

## Related

- [MTLFunction](./mtlfunction.md)
- [MTLDevice](./mtldevice.md)
- [MTLRenderPipelineDescriptor](./mtlrenderpipelinedescriptor.md)
