# MTL4Compiler

Metal 4 API. An abstraction for a pipeline state and shader function compiler. It gives your app control over when, where, and how shaders are compiled.

## Signature / Usage

```swift
protocol MTL4Compiler : NSObjectProtocol, Sendable

// Render pipeline state, synchronous (throws) and asynchronous (async throws) overloads
func makeRenderPipelineState(descriptor: MTL4PipelineDescriptor, dynamicLinkingDescriptor: MTL4RenderPipelineDynamicLinkingDescriptor?, compilerTaskOptions: MTL4CompilerTaskOptions?) throws -> any MTLRenderPipelineState
func makeRenderPipelineState(descriptor: MTL4PipelineDescriptor, dynamicLinkingDescriptor: MTL4RenderPipelineDynamicLinkingDescriptor?, compilerTaskOptions: MTL4CompilerTaskOptions?) async throws -> any MTLRenderPipelineState

// Compute pipeline state
func makeComputePipelineState(descriptor: MTL4ComputePipelineDescriptor, dynamicLinkingDescriptor: MTL4PipelineStageDynamicLinkingDescriptor?, compilerTaskOptions: MTL4CompilerTaskOptions?) throws -> any MTLComputePipelineState
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `device` | `any MTLDevice` | The device that this compiler belongs to |
| `label` | `String?` | The optional label you specify at creation time |
| `pipelineDataSetSerializer` | `(any MTL4PipelineDataSetSerializer)?` | The serializer in which the compiler stores data for pipelines it creates (see `MTL4CompilerDescriptor`) |
| `makeLibrary(descriptor:)` | `throws -> any MTLLibrary` | Creates a new Metal library synchronously from an `MTL4LibraryDescriptor` |
| `makeDynamicLibrary(library:)` | `throws -> any MTLDynamicLibrary` | Creates a dynamic library from a library containing Metal IR code synchronously |
| `makeDynamicLibrary(url:)` | `throws -> any MTLDynamicLibrary` | Creates a dynamic library from the contents of a file at a URL synchronously |
| `makeRenderPipelineState(descriptor:dynamicLinkingDescriptor:compilerTaskOptions:)` | sync `throws` / `async throws` -> `any MTLRenderPipelineState` | Creates a new render pipeline state synchronously or asynchronously |
| `makeRenderPipelineStateBySpecialization(descriptor:pipeline:)` | sync `throws` / `async throws` -> `any MTLRenderPipelineState` | Creates a render pipeline state from another, previously unspecialized, pipeline state |
| `makeComputePipelineState(descriptor:dynamicLinkingDescriptor:compilerTaskOptions:)` | sync `throws` / `async throws` -> `any MTLComputePipelineState` | Creates a compute pipeline state synchronously or asynchronously |
| `makeBinaryFunction(descriptor:compilerTaskOptions:)` | sync `throws` / `async throws` -> `any MTL4BinaryFunction` | Creates a binary visible or intersection function from an `MTL4BinaryFunctionDescriptor` |
| `makeMachineLearningPipelineState(descriptor:)` | sync `throws` / `async throws` -> `any MTL4MachineLearningPipelineState` | Creates a machine learning pipeline state from an `MTL4MachineLearningPipelineDescriptor` |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Each method with the same name appears twice in the docs: the synchronous overload blocks the caller's thread until compilation finishes; the `async` overload returns immediately and finishes on a background thread or queue. Prototypes typically use synchronous calls; larger projects use asynchronous calls to avoid stalls.
- A dedicated compiler lets an app decide when to compile each shader, create a dispatch queue (optionally with a QoS), monitor each compilation task, and harvest compiled pipelines into binary archives or an `MTL4PipelineDataSetSerializer`. Compilation run on a dispatch queue runs at that queue's QoS; a direct call on the main thread runs at the calling thread's QoS.
- Create an unspecialized pipeline state once (for example at launch, using `MTLPixelFormat.unspecialized` for properties that vary) and derive task-specific pipeline states from it with `makeRenderPipelineStateBySpecialization(descriptor:pipeline:)`, avoiding recompilation of common code.
- Color-attachment mapping lets one render pipeline state inherit the logical-to-physical output mapping from each encoder it is used with.
- Objective-C also lists completion-handler variants (for example `newRenderPipelineStateWithDescriptor:...completionHandler:`) for the asynchronous forms.
- Source: https://developer.apple.com/documentation/metal/mtl4compiler

## Related

- [MTL4CompilerDescriptor](./mtl4compilerdescriptor.md)
- [MTL4RenderPipelineDescriptor](./mtl4renderpipelinedescriptor.md)
- [MTLLibrary](./mtllibrary.md)
- [MTLRenderPipelineState](./mtlrenderpipelinestate.md)
- [MTLComputePipelineState](./mtlcomputepipelinestate.md)
