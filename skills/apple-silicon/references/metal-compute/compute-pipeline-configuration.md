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

Adapted (not in the official docs): persistent-kernel pipeline (iOS / macOS 27.0+) assembled from the declared `optimizeForPersistentKernel`, `forwardProgressUsage`, and `recommendedPersistentThreadgroupsPerGrid(forThreadsPerThreadgroup:)` signatures; `device` and `library` are assumed to exist.

```swift
let descriptor = MTLComputePipelineDescriptor()
descriptor.computeFunction = library.makeFunction(name: "producerConsumerKernel")
descriptor.optimizeForPersistentKernel = true
descriptor.forwardProgressUsage = .automatic

let pipelineState = try device.makeComputePipelineState(descriptor: descriptor, options: [], reflection: nil)

let threadsPerThreadgroup = MTLSize(width: 256, height: 1, depth: 1)
let threadgroups = pipelineState.recommendedPersistentThreadgroupsPerGrid(forThreadsPerThreadgroup: threadsPerThreadgroup)
let threadgroupsPerGrid = MTLSize(width: threadgroups, height: 1, depth: 1)
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
| `MTLForwardProgressUsage` (27.0+) | Options for how a pipeline depends on blocking synchronization across SIMD groups: `automatic` (compiler decides by program analysis, conservative detection), `weak` (programs that infrequently impede forward progress, such as spin loops or locks), `simdGroupParallel` (programs that frequently impede forward progress) |
| `MTLContentionRelief` (27.0+) | Whether the compiler inserts contention relief: `automatic` (inserted when the kernel has no other mechanism, such as `metal::atomic_wait_*` or explicit `metal::yield_simdgroup`) or `none` |
| `forwardProgressUsage` / `contentionRelief` / `optimizeForPersistentKernel` (27.0+) | `MTLComputePipelineDescriptor` and `MTL4ComputePipelineDescriptor` properties. `optimizeForPersistentKernel` (default `false`) tunes for long-lived kernels with non-specific grid sizes, such as producer-consumer models |
| `MTLComputePipelineState.forwardProgressUsage` / `recommendedPersistentThreadgroupsPerGrid(forThreadsPerThreadgroup:)` (27.0+) | The resolved usage mode, and the threadgroup count with the best throughput for a pipeline created with `optimizeForPersistentKernel` equal to `true` |
| `MTLFunctionConstantValues` | Runtime values bound to MSL function constants (`[[function_constant(index)]]`), used to compile specialized kernel variants from one shared source |

## Notes

- Marking a `MTLPipelineBufferDescriptor` as `immutable` (contents fixed between binding and command-buffer completion) lets Metal apply optimizations it can't otherwise safely make.
- `threadGroupSizeIsMultipleOfThreadExecutionWidth` on the descriptor lets Metal skip a bounds check when the caller guarantees threadgroup size is an exact multiple of `threadExecutionWidth`.
- Function specialization trades build-time shared source for runtime-compiled variants: precompile the common source once, then compile per-configuration variants by supplying different `MTLFunctionConstantValues` — avoids both hand-written per-branch duplicate functions and the performance cost of dynamic `if`/`else` branching inside a kernel.
- `forwardProgressUsage` defaults to `automatic`: Metal resolves scheduling automatically when either the descriptor value or the kernel's `[[forward_progress_usage]]` attribute is `automatic`, and the descriptor property takes priority when both are explicit. `optimizeForPersistentKernel` can't be `true` together with `forwardProgressUsage` equal to `weak` (invalid configuration, unpredictable behavior or an error).
- `contentionRelief` defaults to `automatic` and applies only to functions whose `contention_relief` attribute is `default` (or unspecified); functions compiled separately keep the contention relief they were compiled with. The Metal Shading Language Specification 4.1 (2026-06-04, 383 pages) does not document the `[[forward_progress_usage]]` or `contention_relief` attributes, so their MSL syntax is not covered in `msl/`.
- `MTLCompileOptions` gained `floatingPointConversionRoundingMode` (27.0+; sets the rounding mode for narrowing floating-point conversions, default `MTLFloatingPointConversionRoundingModeToNearestEven`) and `MTLLanguageVersion.version4_1` (27.0+).
- Source (retrieved 2026-11-14; DocC JSON, `introducedAt` 27.0, no beta flag): https://developer.apple.com/documentation/metal/mtlforwardprogressusage, https://developer.apple.com/documentation/metal/mtlcontentionrelief, https://developer.apple.com/documentation/metal/mtlcomputepipelinedescriptor/forwardprogressusage, https://developer.apple.com/documentation/metal/mtlcomputepipelinedescriptor/contentionrelief, https://developer.apple.com/documentation/metal/mtlcomputepipelinedescriptor/optimizeforpersistentkernel, https://developer.apple.com/documentation/metal/mtlcomputepipelinestate/recommendedpersistentthreadgroupspergrid(forthreadsperthreadgroup:), https://developer.apple.com/documentation/metal/mtlcompileoptions/floatingpointconversionroundingmode, https://developer.apple.com/documentation/metal/mtllanguageversion/version4_1
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Compute Pass Encoding](./compute-pass-encoding.md)
- [Threadgroup Sizing](./threadgroup-sizing.md)
- [Argument Buffers](./argument-buffers.md)
