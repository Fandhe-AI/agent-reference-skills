# Counter Sample Buffers

Storage (`MTLCounterSampleBuffer`) and workflow for retrieving GPU performance-counter data during a compute pass: attach sample points, resolve the raw data, cast to a result type, and convert GPU timestamps to CPU time.

## Signature / Usage

```swift
// Create a sample buffer that can hold N sample points
let sbDescriptor = MTLCounterSampleBufferDescriptor()
sbDescriptor.counterSet = timestampCounterSet
sbDescriptor.storageMode = .shared
sbDescriptor.sampleCount = 2
let sampleBuffer = try device.makeCounterSampleBuffer(descriptor: sbDescriptor)

// Attach it to a compute pass at stage boundaries
let passDescriptor = MTLComputePassDescriptor()
let attachment = passDescriptor.sampleBufferAttachments[0]
attachment.sampleBuffer = sampleBuffer
attachment.startOfEncoderSampleIndex = 0
attachment.endOfEncoderSampleIndex = 1

// Resolve on the CPU (shared storage) once the command buffer completes
commandBuffer.addCompletedHandler { _ in
    let data = try? sampleBuffer.resolveCounterRange(0..<2)
    let timestamps = data!.withUnsafeBytes {
        Array($0.bindMemory(to: MTLCounterResultTimestamp.self))
    }
}
```

## Options / Props

| Type / Property | Description |
| --- | --- |
| `MTLCounterSampleBufferDescriptor` | Configures a sample buffer to create: `counterSet`, `storageMode` (`shared` for CPU resolve, `private` for blit-pass resolve), `sampleCount`, `label` |
| `MTLCounterSampleBuffer` | The GPU-vendor-private memory storing sampled counter data; `resolveCounterRange(_:)` converts it to standard Metal result structs on the CPU |
| `MTLComputePassSampleBufferAttachmentDescriptor` | Attaches a sample buffer to a compute pass and specifies at which encoder-boundary indices to sample (`startOfEncoderSampleIndex`, `endOfEncoderSampleIndex`) |
| `MTLComputePassSampleBufferAttachmentDescriptorArray` | Indexed collection of attachments on `MTLComputePassDescriptor.sampleBufferAttachments` |
| `MTLCounterDontSample` | Sentinel index value that tells the encoder to skip sampling a particular counter slot |
| `resolveCounters(_:range:destinationBuffer:destinationOffset:)` | `MTLBlitCommandEncoder` method that resolves a private-storage sample buffer's data into an `MTLBuffer` on the GPU (required when CPU can't access the buffer directly) |
| `MTLCounterResultTimestamp` | Resolved result struct for a `timestamp` counter set sample |
| `MTLCounterResultStatistic` | Resolved result struct for a `statistic` counter set sample |
| `MTLCounterResultStageUtilization` | Resolved result struct for a `stageUtilization` counter set sample |
| `MTLCounterErrorValue` | Sentinel value a resolved sample holds when the GPU encountered a runtime error while sampling |
| `MTLTimestamp` | Nanosecond time value type used with `MTLDevice.sampleTimestamps(cpuTimestamp:gpuTimestamp:)` to establish a CPU/GPU time baseline |

## Notes

- Resolve with `resolveCounterRange(_:)` on the CPU only for `shared`-storage sample buffers; `private`-storage buffers on some GPUs can only be resolved via a blit pass's `resolveCounters(_:range:destinationBuffer:destinationOffset:)`.
- Cast resolved data to the result type matching the counter set (`MTLCounterResultTimestamp`, `…Statistic`, `…StageUtilization`) and check each element against `MTLCounterErrorValue` before using it.
- GPU timestamps use the GPU's internal clock and aren't directly comparable to CPU time; call `MTLDevice.sampleTimestamps(cpuTimestamp:gpuTimestamp:)` twice (once before, once after the pass, e.g. in a completion handler) to build a baseline, then linearly interpolate a GPU timestamp into CPU nanoseconds from that baseline. Call `sampleTimestamps` sparingly — it may trap to the kernel to read the GPU clock.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [GPU Counters](./gpu-counters.md)
- [Compute Pass Encoding](./compute-pass-encoding.md)
