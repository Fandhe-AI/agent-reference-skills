# Compute Pipeline Configuration

How to describe and build a compute pipeline state: descriptors for traditional and Metal 4 pipelines, stage-in vertex-style input for compute, buffer mutability hints, and function specialization to generate pipeline variants.

## Signature / Usage

```swift
// Traditional
let descriptor = MTLComputePipelineDescriptor()
descriptor.computeFunction = library.makeFunction(name: "myKernel")
descriptor.threadGroupSizeIsMultipleOfThreadExecutionWidth = true

let pipelineState = try device.makeComputePipelineState(descriptor: descriptor, options: [], reflection: nil)
```

```swift
// Metal 4
let mtl4Descriptor = MTL4ComputePipelineDescriptor()
mtl4Descriptor.computeFunctionDescriptor = MTL4LibraryFunctionDescriptor()
let mtl4PipelineState = try mtl4Compiler.makeComputePipelineState(descriptor: mtl4Descriptor)
```

```swift
// Function specialization: same source, per-pipeline constant values
let constants = MTLFunctionConstantValues()
var useFastPath = true
constants.setConstantValue(&useFastPath, type: .bool, index: 0)
let specializedFn = try library.makeFunction(name: "myKernel", constantValues: constants)
```

## Options / Props

| Type / Property | Description |
| --- | --- |
| `MTLComputePipelineDescriptor` | Describes the desired GPU state for a kernel call: compute function, buffer mutability, stage-in descriptor, thread execution alignment |
| `MTL4ComputePipelineDescriptor` | Metal 4 equivalent, built via a pipeline-state compiler instead of `MTLDevice` directly |
| `MTLComputePipelineState` | Compiled, immutable GPU pipeline configuration returned from a descriptor; exposes `threadExecutionWidth` and `maxTotalThreadsPerThreadgroup` |
| `MTLStageInputOutputDescriptor` | Declares per-thread vertex-style input layout (attributes, buffers, indexing) so a compute kernel can consume vertex-formatted data via `[[stage_in]]` |
| `MTLPipelineBufferDescriptor` | Per-buffer mutability hint (`mutable` / `immutable`) for a pipeline's argument-table buffers |
| `MTLPipelineBufferDescriptorArray` | Indexed collection of `MTLPipelineBufferDescriptor` attached to a pipeline descriptor's `buffers` property |
| `MTLPipelineOption` | Options controlling how Metal prepares the pipeline (e.g. request `argumentInfo`/`bufferTypeInfo` reflection) |
| `MTLFunctionConstantValues` | Runtime values bound to MSL function constants (`[[function_constant(index)]]`), used to compile specialized kernel variants from one shared source |

## Notes

- Marking a `MTLPipelineBufferDescriptor` as `immutable` (contents fixed between binding and command-buffer completion) lets Metal apply optimizations it can't otherwise safely make.
- `threadGroupSizeIsMultipleOfThreadExecutionWidth` on the descriptor lets Metal skip a bounds check when the caller guarantees threadgroup size is an exact multiple of `threadExecutionWidth`.
- Function specialization trades build-time shared source for runtime-compiled variants: precompile the common source once, then compile per-configuration variants by supplying different `MTLFunctionConstantValues` — avoids both hand-written per-branch duplicate functions and the performance cost of dynamic `if`/`else` branching inside a kernel.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Compute Pass Encoding](./compute-pass-encoding.md)
- [Threadgroup Sizing](./threadgroup-sizing.md)
- [Argument Buffers](./argument-buffers.md)
