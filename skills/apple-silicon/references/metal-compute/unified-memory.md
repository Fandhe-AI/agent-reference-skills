# Unified Memory

Apple GPUs share physical system memory with the CPU. Choosing the right `MTLResourceOptions` storage mode for compute buffers/textures, and managing GPU-resident memory efficiently with `MTLResidencySet`, are the two levers this unified architecture exposes.

## Signature / Usage

```swift
// Shared: CPU and GPU both read/write the same system-memory allocation — good for small,
// frequently CPU-updated compute inputs (e.g. per-frame uniforms)
let uniformsBuffer = device.makeBuffer(length: MemoryLayout<Uniforms>.stride, options: .storageModeShared)!

// Private: GPU-only, fastest GPU access — good for large compute intermediates the CPU never reads
let scratchBuffer = device.makeBuffer(length: scratchSize, options: .storageModePrivate)!

// Memoryless: tile-only, never backed by system memory — textures only, e.g. transient compute scratch targets
let descriptor = MTLTextureDescriptor.texture2DDescriptor(pixelFormat: .rgba16Float, width: w, height: h, mipmapped: false)
descriptor.storageMode = .memoryless
descriptor.usage = [.shaderRead, .shaderWrite]
let scratchTexture = device.makeTexture(descriptor: descriptor)!
```

```swift
// Residency set: batch-declare resident resources instead of calling useResource per dispatch
let rsDescriptor = MTLResidencySetDescriptor()
let residencySet = try device.makeResidencySet(descriptor: rsDescriptor)
residencySet.addAllocations([scratchBuffer, scratchTexture])
residencySet.commit()
residencySet.requestResidency() // ahead of time, e.g. at launch

commandQueue.addResidencySet(residencySet) // resources resident for every command buffer on this queue
```

## Options / Props

| Storage mode | CPU access | GPU access | Typical compute use |
| --- | --- | --- | --- |
| `storageModeShared` | Yes | Yes (system memory) | Small buffers the CPU writes/reads every frame (uniforms, readback results) |
| `storageModePrivate` | No | Yes, fastest | Large intermediate compute buffers/textures the CPU never touches |
| `storageModeMemoryless` | No | Yes, tile memory only, textures only | Transient per-tile compute scratch space that never needs to persist to system memory |
| `storageModeManaged` (non-Apple-silicon GPUs) | Yes, separate copy | Yes, separate copy | Not covered by Apple's Apple-GPU storage-mode guidance — Apple silicon's unified memory model favors `shared`/`private`/`memoryless` instead |
| `MTLResidencySet` | — | — | A group of `MTLAllocation`-conforming resources (buffers, textures, heaps) made resident together, attached to a command buffer or queue |
| `MTLResidencySetDescriptor` | — | — | Configuration passed to `MTLDevice.makeResidencySet(descriptor:)` |
| `requestResidency()` | — | — | Asks Metal to do the CPU-side residency work ahead of the first command buffer that needs it (e.g. at launch), avoiding a stall at `commit()` |
| `addResidencySet(_:)` / `useResidencySet(_:)` | — | — | Attaches a residency set to a command queue (persists across its command buffers) or a single command buffer, respectively — up to 32 sets each |

## Notes

- Because Apple GPUs are unified-memory, `shared` already avoids an explicit CPU↔GPU copy; choosing `private` for compute-only intermediates is about letting the GPU use faster access paths and freeing the driver from CPU-visibility bookkeeping, not about avoiding a PCIe-style transfer.
- `memoryless` resources exist only in on-chip tile memory for the duration of a pass — they cannot be created as buffers, only textures, and cannot be read back by the CPU at all.
- Attaching an `MTLResidencySet` to a command queue is cheaper than calling `useResource`/`useHeap` per encoder per frame for resources that stay resident across many dispatches; call `requestResidency()` at a non-critical moment (app launch, state transition) to avoid delaying the first `commit()`.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill, which mentions `storageModeShared` briefly on its `MTLBuffer` page — this page is the dedicated storage-mode/residency reference.

## Related

- [Argument Buffers](./argument-buffers.md)
- [Compute Pass Encoding](./compute-pass-encoding.md)
