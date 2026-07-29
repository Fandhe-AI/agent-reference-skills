# Argument Buffers

Grouping multiple shader resources (buffers, textures, samplers, pipeline states, acceleration structures, indirect command buffers) into a single `MTLBuffer` argument, encoded once and reused across dispatches instead of binding each resource individually.

## Signature / Usage

```metal
// Declare the argument buffer's layout as an MSL struct
struct ArgumentBufferExample {
    texture2d<float, access::write> outputTexture;
    device float4 *inputData;
    sampler linearSampler;
};

kernel void example(constant ArgumentBufferExample &args [[buffer(0)]],
                     uint id [[thread_position_in_grid]])
{
    float4 value = args.inputData[id];
    args.outputTexture.write(value, uint2(id, 0));
}
```

```swift
// Swift: encode resources into the buffer with MTLArgumentEncoder (Tier 1 / pre-Tier-2 devices)
let encoder = computeFunction.makeArgumentEncoder(bufferIndex: 0)
let argBuffer = device.makeBuffer(length: encoder.encodedLength, options: [])!
encoder.setArgumentBuffer(argBuffer, offset: 0)
encoder.setTexture(outputTexture, index: 0)
encoder.setBuffer(inputBuffer, offset: 0, index: 1)
encoder.setSamplerState(sampler, index: 2)

computeCommandEncoder.setBuffer(argBuffer, offset: 0, index: 0)
computeCommandEncoder.useResource(outputTexture, usage: .write) // residency: still required per resource
computeCommandEncoder.useResource(inputBuffer, usage: .read)
```

## Options / Props

| Type / Concept | Description |
| --- | --- |
| `MTLArgumentEncoder` | Encodes buffers/textures/samplers/pipeline-states/acceleration-structures/ICBs into an argument buffer at the destination set by `setArgumentBuffer(_:offset:)` |
| `MTLArgumentDescriptor` | Describes one flat (non-nested) argument-buffer slot (`dataType`, `index`, `access`, `arrayLength`, `textureType`) for dynamically constructed argument buffers built via `MTLDevice.makeArgumentEncoder(arguments:)` |
| `MTLDevice.argumentBuffersSupport` | Reports whether the device is Tier 1 or Tier 2 (Tier 2 has far higher resource-count limits and matches C-struct memory layout) |
| Tier 2 direct encoding | On iOS/tvOS 16+, macOS 13+, write a resource's `gpuAddress` (buffers) or `gpuResourceID` (textures/samplers/acceleration structures) directly into the matching struct member — no `MTLArgumentEncoder` needed |
| Tier 1 / pre-Tier-2 encoding | Must use `MTLArgumentEncoder` to write resource references into a private, GPU/OS-defined memory layout |
| `MTLPipelineBufferDescriptor.mutability` | Set `immutable` on the pipeline's buffer-mutability array when neither CPU nor GPU modifies the argument buffer's contents between bind and command-buffer completion, to let Metal optimize |

## Notes

- Encoding resources into an argument buffer doesn't remove the residency requirement: still call `useResource(_:usage:)` per resource (or `useHeap(_:)` if the resources come from a heap) before dispatching, or attach an `MTLResidencySet` (see `unified-memory.md`).
- Tier 1 argument buffers must be CPU-accessible (`shared`/`managed` storage), immutable from the GPU's perspective, and can't hold writable textures or pointer-index into other argument buffers from MSL; Tier 2 lifts these limits and allows pointer-indexed nested argument buffers.
- Argument buffers can be encoded from a compute kernel running on the GPU itself (not just the CPU) — see Apple's "Encoding argument buffers on the GPU" article — letting a compute pass build the resource list a later render or compute pass consumes.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Unified Memory](./unified-memory.md)
- [Indirect Command Buffers](./indirect-command-buffers.md)
- [Compute Pipeline Configuration](./compute-pipeline-configuration.md)
